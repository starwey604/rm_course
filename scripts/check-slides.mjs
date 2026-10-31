import {chromium} from 'playwright-chromium'
import fs from 'node:fs/promises'
import path from 'node:path'
const root=path.resolve(import.meta.dirname,'..')
const out=path.join(root,'tmp','slide-qa')
await fs.mkdir(out,{recursive:true})
const base=process.env.CJ1_URL||'http://localhost:3031/cj-1'
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
 // P5719 keeps the explanation format while preserving the next exercise's blanks.
 await page.goto(base+'/16?print=true',{waitUntil:'networkidle'})
 const classifyGuide=page.locator('[data-slidev-no="16"] .slidev-layout')
 const classifyCode=await classifyGuide.locator('.reasoning-code').innerText()
 if(!classifyCode.includes('for (int i = [①]; [②]; i++)')||!classifyCode.includes('if ([③])')||!classifyCode.includes('[④] * sa / ca, [④] * sb / cb')||classifyCode.includes('i % k == 0')||classifyCode.includes('1.0 *'))throw new Error('P5719 explanation must retain all exercise blanks')
 await page.goto(base+'/21?print=true',{waitUntil:'networkidle'})
 const stickCode=await page.locator('[data-slidev-no="21"] .reasoning-code').innerText()
 if(!stickCode.includes('while (a > 1)')||!stickCode.includes('a /= 2')||stickCode.includes('[①]'))throw new Error('P5720 code explanation not restored')
 const capacity=results.findIndex(x=>x.title==='用 sizeof 计算数组的元素个数')
 const traverse=results.findIndex(x=>x.title==='只处理前 n 个元素，循环条件写 i < n')
 const stringSize=results.findIndex(x=>x.title==='房间有 20 格，住进去了几个字符？')
 if(!(capacity===traverse+1&&capacity<stringSize))throw new Error('sizeof must be taught after array traversal')
 const inputPage=results.findIndex(x=>x.title==='20 个格子，为什么只能读 19 个字符？')
 const newlinePage=results.findIndex(x=>x.title==='刚读完数字，为什么文本还没输就失败了？')
 const summaryPage=results.findIndex(x=>x.title==='先看要读什么，再选格式串')
 if(newlinePage!==inputPage+2||summaryPage!==inputPage+3)throw new Error('Whole-line input must follow the string-input example')
 const zero=results.findIndex(x=>x.title==='局部数组不会自动清零，先给它一个起点')
 const offset=results.findIndex(x=>x.title==='用下标访问元素：第 1 个元素是 a[0]')
 if(zero!==offset+1||zero>=traverse)throw new Error('Initialization must be a dedicated page before traversal')
 for(const title of ['P1428 · 小鱼比可爱','每条鱼，只看它左边的鱼','P1047 · 校门外的树','数组也可以记录“还在不在”']){
  const r=results.find(x=>x.title===title)
  if(!r||r.page<=course.main||r.page<course.total-7)throw new Error('Optional array lesson must be at the end: '+title)
 }
 for(const [title,next] of [
  ['保存两个候选值，再逐个比较','用第一个元素，初始化当前最大值'],
  ['先存到哪里，再从哪里倒着走？','0 不存，最后一格从哪里找？'],
  ['先找该改的字符，再决定怎样更新','只改小写字母，三个空怎么填？']
 ]){
  const index=results.findIndex(x=>x.title===title)
  if(index<0||results[index+1]?.title!==next)throw new Error('Framework must precede its exercise or trace: '+title)
 }
 await page.goto(base+'/'+results[stringSize].page+'?print=true',{waitUntil:'networkidle'})
 const formulaSize=await page.locator('[data-slidev-no="'+results[stringSize].page+'"] .string-size-formula').first().evaluate(el=>parseFloat(getComputedStyle(el).fontSize))
 if(formulaSize<30)throw new Error('strlen/sizeof expressions too small')
 // Test each custom animation, every forward step, and backwards restoration.
 const specs=[
  ['格式串，也有一条读取路线',7,'.trace-desc'],
  ['同一天的逻辑，重复四次',4,'.trace-desc'],
  ['循环体执行三次，判断四次',8,'.trace-desc'],
  ['读完一个数，就更新对应的一类',7,'.trace-desc'],
  ['长度到 1 时，就停止',4,'.trace-desc'],
  ['跳过本轮，仍要完成更新',5,'.trace-desc'],
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
  ,['i 选一行，j 从这一行的开头走起',10,'.nested-map-caption']
  ,['只改两层 for，三角形就换一个方向',4,'.triangle-lesson-caption']
  ,['保存两个候选值，再逐个比较',4,'.reasoning-caption']
  ,['先存到哪里，再从哪里倒着走？',4,'.reasoning-caption']
  ,['先找该改的字符，再决定怎样更新',3,'.reasoning-caption']
 ]
 let steps=0
 for(const [title,max,selector] of specs){
  const r=results.find(x=>x.title===title)
  if(!r)throw new Error('Missing animated page: '+title)
  await page.goto(base+'/'+r.page+'?clicks=0',{waitUntil:'networkidle'})
  const scope=page.locator('[data-slidev-no="'+r.page+'"]')
  const before=await scope.locator(selector).first().innerText()
  if(selector==='.triangle-lesson-caption')await checkTriangles(scope,0)
  if(selector==='.reasoning-caption'&&await scope.locator('.reasoning-answer').evaluateAll(els=>els.some(x=>Number(getComputedStyle(x).opacity)!==0)))throw new Error('Reasoning answers visible before clicking')
  for(let c=0;c<max;c++){
   await page.keyboard.press('ArrowRight');await page.waitForTimeout(70);steps++
   if(selector==='.nested-map-caption'){
    const expected=[[0,0,1],[0,1,2],[0,2,3],[0,3,3],[1,0,4],[1,1,5],[1,2,5],[2,0,6],[2,1,6],[3,-1,6]][c]
    const actual=await scope.locator('.nested-map-grid').evaluate(el=>[Number(el.dataset.row),Number(el.dataset.col),el.querySelectorAll('.nested-map-cell.used').length])
    if(JSON.stringify(actual)!==JSON.stringify(expected))throw new Error('Nested row/column state mismatch at '+(c+1))
   }
   if(selector==='.triangle-lesson-caption')await checkTriangles(scope,c+1)
  }
  const final=await scope.locator(selector).first().innerText()
  if(final===before)throw new Error('Animation did not change: '+title)
  for(let c=0;c<max;c++){await page.keyboard.press('ArrowLeft');await page.waitForTimeout(70)}
  if((await scope.locator(selector).first().innerText())!==before)throw new Error('Backwards restoration failed: '+title)
  if(selector==='.nested-map-caption'&&await scope.locator('.nested-map-cell.used').count())throw new Error('Nested output did not rewind')
  if(selector==='.triangle-lesson-caption')await checkTriangles(scope,0)
 }
 const problemPages=results.filter(x=>Object.entries(problems).some(([pid,d])=>x.title===(d.url?pid+' · ':'')+d.title))
 if(problemPages.length!==Object.keys(problems).length)throw new Error('Missing full problem statements')
 const io=results.findIndex(x=>x.title==='同一个结果，三种写法')
 const bridge=results.findIndex(x=>x.title==='一天会处理了，n 天怎么办？')
 const loops=results.findIndex(x=>x.title==='重复 n 次，用 for 表达')
 if(!(io<bridge&&bridge<loops))throw new Error('Wrong I/O-to-loop order')
 for(const [title,answers] of [
  ['补上四处，让两类各算各的',['1','i <= n','i % k == 0','1.0']],
  ['0 不存，最后一格从哪里找？',['x == 0','n','n - 1','i--']],
  ['只改小写字母，三个空怎么填？',["s[i] != '\\0'","s[i] >= 'a' && s[i] <= 'z'","'a' - 'A'"]]
 ]){
  const max=answers.length*2
  const r=results.find(x=>x.title===title)
  if(!r)throw new Error('Missing fill exercise: '+title)
  await page.goto(base+'/'+r.page+'?clicks=0',{waitUntil:'networkidle'})
  const scope=page.locator('[data-slidev-no="'+r.page+'"]')
  async function checkFill(c){
   if(await scope.locator('.fill-hint.shown').count()!==Math.ceil(c/2))throw new Error('Hint phase mismatch: '+title+' click '+c)
   const slots=await scope.locator('[data-blank]').evaluateAll(es=>es.map(el=>({index:Number(el.dataset.blank),filled:el.dataset.filled==='true',text:el.textContent})))
   for(const slot of slots){
    const filled=slot.index<=Math.floor(c/2)
    if(slot.filled!==filled||slot.text!==(filled?answers[slot.index-1]:['[①]','[②]','[③]','[④]'][slot.index-1]))throw new Error('Answer phase mismatch: '+title+' click '+c+' blank '+slot.index)
   }
   const bad=await scope.locator('.fill-grid').evaluate(el=>{
    const slide=el.closest('.slidev-layout'),rect=slide.getBoundingClientRect(),scale=rect.width/slide.clientWidth
    return [...el.querySelectorAll('pre')].some(x=>x.scrollWidth>x.clientWidth+3)||(el.getBoundingClientRect().bottom-rect.top)/scale>625
   })
   if(bad)throw new Error('Filled code or hints overflow: '+title+' click '+c)
  }
  await checkFill(0)
  for(let c=1;c<=max;c++){
   await page.keyboard.press('ArrowRight');await page.waitForTimeout(80);steps++
   await checkFill(c)
   if(c===1||c===2||c===max)await scope.screenshot({path:path.join(out,'fill-'+r.page+'-click-'+c+'.png')})
  }
  for(let c=max-1;c>=0;c--){await page.keyboard.press('ArrowLeft');await page.waitForTimeout(80);await checkFill(c)}
  await page.goto(base+'/'+r.page+'?print=true',{waitUntil:'networkidle'})
  if(await scope.locator('[data-filled="true"]').count()!==0||await scope.locator('.fill-hint.shown').count()!==answers.length)throw new Error('Printable exercise should preserve blanks and hints: '+title)
 }
 // Verify both new input examples reveal their result and explanation in two steps.
 for(const r of results.filter(x=>x.title.startsWith('用 %[')||x.title==='刚读完数字，为什么文本还没输就失败了？')){
  await page.goto(base+'/'+r.page+'?clicks=0',{waitUntil:'networkidle'})
  const scope=page.locator('[data-slidev-no="'+r.page+'"]')
  if(await scope.locator('.slidev-vclick-hidden').count()!==2)throw new Error('Input explanation visible before clicking')
  for(let c=1;c<=2;c++){
   await page.keyboard.press('ArrowRight');await page.waitForTimeout(100);steps++
   if(await scope.locator('.slidev-vclick-hidden').count()!==2-c)throw new Error('Input explanation reveal failed')
  }
  for(let c=0;c<2;c++){await page.keyboard.press('ArrowLeft');await page.waitForTimeout(100)}
  if(await scope.locator('.slidev-vclick-hidden').count()!==2)throw new Error('Input explanation restore failed')
 }
 // Check actual opacity: hidden paragraph classes alone do not catch CSS overrides.
 for(const title of ['数字交给 %d，连字符原样匹配','找到后，结束所在的循环','20 个格子，为什么只能读 19 个字符？','robot 的第一对就不同，还要往里比吗？']){
  const r=results.find(x=>x.title===title)
  if(!r)throw new Error('Missing paragraph-click page: '+title)
  await page.goto(base+'/'+r.page+'?clicks=0',{waitUntil:'networkidle'})
  const scope=page.locator('[data-slidev-no="'+r.page+'"]')
  for(let c=0;c<=2;c++){
   await page.waitForTimeout(550)
   const native=await scope.locator('.slidev-vclick-target').evaluateAll(els=>els.map(x=>({hidden:x.classList.contains('slidev-vclick-hidden'),opacity:Number(getComputedStyle(x).opacity)})))
   if(native.length!==2||native.filter(x=>x.hidden).length!==2-c||native.some(x=>x.hidden?x.opacity>.05:x.opacity<.95))throw new Error('Paragraph opacity override: '+title+' click '+c+' '+JSON.stringify(native))
   if(c<2){await page.keyboard.press('ArrowRight');steps++}
  }
  for(let c=0;c<2;c++){await page.keyboard.press('ArrowLeft');await page.waitForTimeout(80)}
  await page.waitForTimeout(550)
  if(await scope.locator('.slidev-vclick-hidden').count()!==2||await scope.locator('.slidev-vclick-hidden').evaluateAll(es=>es.some(x=>Number(getComputedStyle(x).opacity)>.05)))throw new Error('Paragraph reveal failed to rewind')
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

async function checkTriangles(scope,phase){
 const expected=[
  {i:'int i = 1; i <= 4; i++',j:'int j = 1; j <= 4; j++',rows:['*   ','**  ','*** ','****']},
  {i:'int i = 4; i >= 1; i--',j:'int j = 1; j <= 4; j++',rows:['****','*** ','**  ','*   ']},
  {i:'int i = 4; i >= 1; i--',j:'int j = 4; j >= 1; j--',rows:['****',' ***','  **','   *']},
  {i:'int i = 1; i <= 4; i++',j:'int j = 4; j >= 1; j--',rows:['   *','  **',' ***','****']}
 ]
 const code=await scope.locator('.triangle-code').innerText()
 if(phase<4){
  const rowText=await scope.locator('.triangle-live .triangle-output-row').evaluateAll(es=>es.map(x=>x.dataset.text))
  if(!code.includes(expected[phase].i)||!code.includes(expected[phase].j)||JSON.stringify(rowText)!==JSON.stringify(expected[phase].rows))throw new Error('Triangle code/output mismatch at phase '+phase)
  if(await scope.locator('.triangle-code-line.changed').count()!==(phase===0?2:1))throw new Error('Changed loop not highlighted')
 }else{
  const rowText=await scope.locator('.triangle-overview .triangle-output-row').evaluateAll(es=>es.map(x=>x.dataset.text))
  const params=await scope.locator('.triangle-mini-params').allTextContents()
  if(!code.includes('[外层参数]')||JSON.stringify(rowText)!==JSON.stringify(expected.flatMap(x=>x.rows))||JSON.stringify(params)!==JSON.stringify(expected.flatMap(x=>[x.i,x.j])))throw new Error('Triangle summary is incomplete')
 }
}
