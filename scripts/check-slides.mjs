import {chromium} from 'playwright-chromium'
import fs from 'node:fs/promises'
import path from 'node:path'
const root=path.resolve(import.meta.dirname,'..')
const out=path.join(root,'tmp','slide-qa')
await fs.mkdir(out,{recursive:true})
const base=process.env.CJ1_URL||'http://localhost:3031'
const course=JSON.parse(await fs.readFile(path.join(root,'CJ-1/data/course.json'),'utf8'))
const problems=JSON.parse(await fs.readFile(path.join(root,'CJ-1/data/problems.json'),'utf8'))
const browser=await chromium.launch({headless:true})
const page=await browser.newPage({viewport:{width:1600,height:900}})
const errors=[],outside=[],results=[]
page.on('pageerror',e=>errors.push(e.message))
page.on('console',m=>{if(m.type()==='error')errors.push(m.text())})
await page.route('**/*',route=>{
 const u=new URL(route.request().url())
 if(!['localhost','127.0.0.1'].includes(u.hostname)&&u.protocol!=='data:'){outside.push(u.href);return route.abort()}
 return route.continue()
})
try{
 await page.goto(base+'/1',{waitUntil:'networkidle'})
 const text=await page.locator('body').innerText()
 const total=Number(text.match(/1\s*\/\s*(\d+)/)?.[1])
 if(!total)throw new Error('Cannot determine slide count')
 if(total!==course.total)throw new Error('Wrong slide count: '+total+' vs '+course.total)
 for(let i=1;i<=total;i++){
  await page.goto(base+'/'+i+'?print=true',{waitUntil:'networkidle'})
  await page.waitForTimeout(250)
  const wrapper=page.locator('[data-slidev-no="'+i+'"]')
  const slide=wrapper.locator('.slidev-layout').first()
  await slide.waitFor()
  if(await slide.locator('.brand-strip img').count()!==2)throw new Error('Missing page branding: '+i)
  const info=await slide.evaluate(el=>{
   const rect=el.getBoundingClientRect(),scale=rect.width/el.clientWidth
   const note=el.querySelector(':scope>.note'),noteTop=note?.getBoundingClientRect().top||rect.bottom-32*scale
   const blocks=[...el.children].filter(x=>!x.matches('.note,.exercise-time'))
   const contentBottom=Math.max(...blocks.map(x=>x.getBoundingClientRect().bottom))
   const wide=[...el.querySelectorAll('pre,.read-code,.trace-code,.memory-comment,.isbn-track')].filter(x=>x.scrollWidth>x.clientWidth+3).map(x=>x.className||x.tagName)
   const footerOverlap=Math.max(0,Math.round((contentBottom-rect.top)/scale-625))
   return {title:el.querySelector('h1')?.textContent?.trim(),overflowX:el.scrollWidth-el.clientWidth,overflowY:el.scrollHeight-el.clientHeight,footerOverlap,noteOverlap:note?Math.max(0,Math.round((contentBottom-noteTop)/scale)):0,wide}
  })
  await wrapper.screenshot({path:path.join(out,String(i).padStart(2,'0')+'.png')})
  results.push({page:i,...info})
  if(i%10===0)console.log('Checked '+i+' / '+total+' slides')
 }
 await fs.writeFile(path.join(out,'layout.json'),JSON.stringify(results,null,2))
 // Test each custom animation, every forward step, and backwards restoration.
 const specs=[
  ['格式串，也有一条读取路线',7,'.trace-desc'],
  ['同一天的逻辑，重复四次',4,'.trace-desc'],
  ['循环体执行三次，判断四次',8,'.trace-desc'],
  ['读完一个数，就更新对应的一类',7,'.trace-desc'],
  ['长度到 1 时，就停止',4,'.trace-desc'],
  ['跳过本轮，仍要完成更新',5,'.trace-desc'],
  ['一层控制行，一层控制本行数量',6,'.trace-desc'],
  ['用第一个元素，初始化当前最大值',6,'.memory-comment'],
  ['有效个数决定倒序的起点',7,'.memory-comment'],
  ['数组也可以记录“还在不在”',3,'.memory-comment'],
  ['字符串，是带结束标记的字符数组',2,'.memory-comment'],
  ['从两端，向中间比较',4,'.memory-comment']
  ,['用下标访问元素：第 1 个元素是 a[0]',3,'.offset-explain']
  ,['倒序输出前，先用数组保存整组数据',3,'.storage-caption']
  ,['只处理前 n 个元素，循环条件写 i < n',4,'.traversal-caption']
  ,['保存什么，判断什么，更新什么？',5,'.reasoning-caption']
  ,['这次不用先知道，要锯多少次',4,'.reasoning-caption']
 ]
 let steps=0
 for(const [title,max,selector] of specs){
  const r=results.find(x=>x.title===title)
  if(!r)throw new Error('Missing animated page: '+title)
  await page.goto(base+'/'+r.page+'?clicks=0',{waitUntil:'networkidle'})
  const scope=page.locator('[data-slidev-no="'+r.page+'"]')
  const before=await scope.locator(selector).first().innerText()
  if(selector==='.reasoning-caption'&&await scope.locator('.reasoning-answer').evaluateAll(els=>els.some(x=>Number(getComputedStyle(x).opacity)!==0)))throw new Error('Reasoning answers visible before clicking')
  for(let c=0;c<max;c++){await page.keyboard.press('ArrowRight');await page.waitForTimeout(70);steps++}
  const final=await scope.locator(selector).first().innerText()
  if(final===before)throw new Error('Animation did not change: '+title)
  for(let c=0;c<max;c++){await page.keyboard.press('ArrowLeft');await page.waitForTimeout(70)}
  if((await scope.locator(selector).first().innerText())!==before)throw new Error('Backwards restoration failed: '+title)
 }
 const problemPages=results.filter(x=>Object.entries(problems).some(([pid,d])=>x.title===(d.url?pid+' · ':'')+d.title))
 if(problemPages.length!==Object.keys(problems).length)throw new Error('Missing full problem statements')
 const io=results.findIndex(x=>x.title==='同一个结果，三种写法')
 const bridge=results.findIndex(x=>x.title==='一天会处理了，n 天怎么办？')
 const loops=results.findIndex(x=>x.title==='重复 n 次，用 for 表达')
 if(!(io<bridge&&bridge<loops))throw new Error('Wrong I/O-to-loop order')
 for(const [title,max] of [
  ['补上四处，让两类各算各的',4],
  ['0 不存，最后一格从哪里找？',4],
  ['只改小写字母，三个空怎么填？',3]
 ]){
  const r=results.find(x=>x.title===title)
  if(!r)throw new Error('Missing fill exercise: '+title)
  await page.goto(base+'/'+r.page+'?clicks=0',{waitUntil:'networkidle'})
  const scope=page.locator('[data-slidev-no="'+r.page+'"]')
  if(await scope.locator('.fill-hint.shown').count()!==0)throw new Error('Hints visible before clicking')
  for(let c=1;c<=max;c++){
   await page.keyboard.press('ArrowRight');await page.waitForTimeout(80);steps++
   if(await scope.locator('.fill-hint.shown').count()!==c)throw new Error('Hint reveal failed: '+title)
  }
  for(let c=0;c<max;c++){await page.keyboard.press('ArrowLeft');await page.waitForTimeout(80)}
  if(await scope.locator('.fill-hint.shown').count()!==0)throw new Error('Hint restore failed: '+title)
 }
 // Verify the mouse shortcut advances the initial format table once.
 const format=results.find(x=>x.title==='输入和输出，格式要对上')
 await page.goto(base+'/'+format.page+'?clicks=0',{waitUntil:'networkidle'})
 await page.locator('.format-table th').first().click()
 await page.waitForTimeout(300)
 if(await page.locator('.format-table .shown').count()!==2)throw new Error('Mouse advance failed')
 const report={total,steps,errors,outside,results}
 await fs.writeFile(path.join(out,'report.json'),JSON.stringify(report,null,2))
 console.log(JSON.stringify({total,steps,errors,outside,layout:results.filter(x=>x.overflowX>2||x.overflowY>2||x.noteOverlap>0||x.footerOverlap>0||x.wide.length)},null,2))
 if(errors.length||outside.length||results.some(x=>x.overflowX>2||x.overflowY>2||x.noteOverlap>0||x.footerOverlap>0||x.wide.length))process.exitCode=1
}finally{await browser.close()}
