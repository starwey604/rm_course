import {chromium} from 'playwright-chromium'
import fs from 'node:fs/promises'
import path from 'node:path'
const root=path.resolve(import.meta.dirname,'..')
const out=path.join(root,'tmp','slide-qa')
await fs.mkdir(out,{recursive:true})
const base=process.env.CJ1_URL||'http://localhost:3031'
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
 for(let i=1;i<=total;i++){
  await page.goto(base+'/'+i+'?print=true',{waitUntil:'networkidle'})
  await page.waitForTimeout(250)
  const wrapper=page.locator('[data-slidev-no="'+i+'"]')
  const slide=wrapper.locator('.slidev-layout').first()
  await slide.waitFor()
  const info=await slide.evaluate(el=>{
   const rect=el.getBoundingClientRect(),scale=rect.width/el.clientWidth
   const note=el.querySelector(':scope>.note'),noteTop=note?.getBoundingClientRect().top||rect.bottom-32*scale
   const blocks=[...el.children].filter(x=>!x.matches('.note,.exercise-time'))
   const contentBottom=Math.max(...blocks.map(x=>x.getBoundingClientRect().bottom))
   const wide=[...el.querySelectorAll('pre,.read-code,.trace-code,.memory-comment,.isbn-track')].filter(x=>x.scrollWidth>x.clientWidth+3).map(x=>x.className||x.tagName)
   return {title:el.querySelector('h1')?.textContent?.trim(),overflowX:el.scrollWidth-el.clientWidth,overflowY:el.scrollHeight-el.clientHeight,noteOverlap:note?Math.max(0,Math.round((contentBottom-noteTop)/scale)):0,wide}
  })
  await wrapper.screenshot({path:path.join(out,String(i).padStart(2,'0')+'.png')})
  results.push({page:i,...info})
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
 ]
 let steps=0
 for(const [title,max,selector] of specs){
  const r=results.find(x=>x.title===title)
  if(!r)throw new Error('Missing animated page: '+title)
  await page.goto(base+'/'+r.page+'?clicks=0',{waitUntil:'networkidle'})
  const scope=page.locator('[data-slidev-no="'+r.page+'"]')
  const before=await scope.locator(selector).first().innerText()
  for(let c=0;c<max;c++){await page.keyboard.press('ArrowRight');await page.waitForTimeout(70);steps++}
  const final=await scope.locator(selector).first().innerText()
  if(final===before)throw new Error('Animation did not change: '+title)
  for(let c=0;c<max;c++){await page.keyboard.press('ArrowLeft');await page.waitForTimeout(70)}
  if((await scope.locator(selector).first().innerText())!==before)throw new Error('Backwards restoration failed: '+title)
 }
 // Verify the mouse shortcut advances the initial format table once.
 const format=results.find(x=>x.title==='输入和输出，格式要对上')
 await page.goto(base+'/'+format.page+'?clicks=0',{waitUntil:'networkidle'})
 await page.locator('.format-table th').first().click()
 await page.waitForTimeout(300)
 if(await page.locator('.format-table .shown').count()!==2)throw new Error('Mouse advance failed')
 const report={total,steps,errors,outside,results}
 await fs.writeFile(path.join(out,'report.json'),JSON.stringify(report,null,2))
 console.log(JSON.stringify({total,steps,errors,outside,layout:results.filter(x=>x.overflowX>2||x.overflowY>2||x.noteOverlap>0||x.wide.length)},null,2))
 if(errors.length||outside.length||results.some(x=>x.overflowX>2||x.overflowY>2||x.noteOverlap>0||x.wide.length))process.exitCode=1
}finally{await browser.close()}
