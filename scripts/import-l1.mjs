import fs from 'node:fs/promises'
import path from 'node:path'

// One-time import. The resulting Markdown is the editable teaching source.
// Rerun only when intentionally regenerating it from the archived extraction.
const root=path.resolve(import.meta.dirname,'..')
const deck=path.join(root,'CJ-0')
const source=JSON.parse(await fs.readFile(path.join(deck,'source/l1-content.json'),'utf8'))
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;')
const html=s=>esc(s).replaceAll('\n','<br>')
const code=(lines,lang='c')=>'\n\n```'+lang+'\n'+lines.join('\n')+'\n```\n\n'
const lead=s=>'<div class="l1-lead">'+html(s)+'</div>\n'
const bottom=s=>'<div class="l1-bottom">'+html(s)+'</div>\n'
function pairs(values,cls='l1-dl'){
 if(values.length%2)throw Error('Unpaired labels: '+JSON.stringify(values))
 return '<dl class="'+cls+'">'+Array.from({length:values.length/2},(_,i)=>'<div><dt>'+html(values[i*2])+'</dt><dd>'+html(values[i*2+1])+'</dd></div>').join('')+'</dl>'
}
function table(rows){return '<table><thead><tr>'+rows[0].map(s=>'<th>'+html(s)+'</th>').join('')+'</tr></thead><tbody>'+rows.slice(1).map(row=>'<tr>'+row.map(s=>'<td>'+html(s)+'</td>').join('')+'</tr>').join('')+'</tbody></table>'}
const col=(left,right,equal=false)=>'<div class="l1-columns'+(equal?' equal':'')+'">\n<div>\n\n'+left+'\n\n</div>\n<div>\n\n'+right+'\n\n</div>\n</div>\n'
function triples(values){return '<div class="l1-three">'+Array.from({length:values.length/2},(_,i)=>'<section><h2>'+html(values[i*2])+'</h2><p>'+html(values[i*2+1])+'</p></section>').join('')+'</div>'}
const body={}
function codePage(n,start,end,asideEnd,{intro,label,foot,lang='c',dense=false}={}){
 const t=source[n-1].text
 body[n]=(intro?lead(t[intro]):'')+(dense?'<div class="l1-dense">\n':'')+col((label?'<div class="label">'+html(t[label])+'</div>':'')+code(t.slice(start,end),lang),pairs(t.slice(end,asideEnd)))+(dense?'</div>\n':'')+(foot?bottom(t[foot]):'')
}
codePage(4,4,9,15,{foot:15})
codePage(5,4,7,13)
codePage(8,4,7,13)
codePage(11,5,12,18,{label:4,foot:18})
codePage(12,5,11,17,{label:4,foot:17})
codePage(13,5,13,19,{label:4,foot:19,lang:'text'})
codePage(14,5,7,13,{label:4,foot:13,lang:'text'})
{
 const t=source[13].text
 const bytes='<pre><code>'+esc(t[5]).replace('00 00 00 00','<mark class="l1-byte-mark">00 00 00 00</mark>')+'\n'+esc(t[6])+'</code></pre>'
 body[14]=col('<div class="label">'+html(t[4].replace('黄色框','强调框'))+'</div>'+bytes,pairs(t.slice(7,13)))+bottom(t[13])
}
codePage(17,4,8,14,{foot:14})
codePage(22,4,8,14,{foot:14})
codePage(33,4,9,15,{foot:15})
codePage(35,5,10,16,{intro:4,foot:16})
codePage(40,5,18,24,{intro:4,dense:true})
codePage(41,4,15,21,{foot:21,dense:true})
codePage(42,5,12,18,{intro:4,foot:18})
codePage(43,4,10,16,{foot:16})
codePage(49,5,14,20,{intro:4})
codePage(52,5,13,19,{intro:4,foot:19})
codePage(56,5,11,17,{intro:4,foot:17})
for(const n of [2,3]){
 const t=source[n-1].text
 body[n]='<div class="l1-questions">'+[4,6,8].map(i=>'<div class="l1-question"><b>'+html(t[i])+'</b><span>'+html(t[i+1])+'</span></div>').join('')+'</div>'+bottom(t[10])
}
body[6]=table(source[5].tables[0])+bottom(source[5].text[4])
{
 const t=source[6].text
 body[7]=col('<div class="label">'+html(t[4])+'</div>'+code(t.slice(5,7),'text'),pairs(t.slice(7,13)))+bottom(t[13])
}
{
 const t=source[8].text
 body[9]='<div class="l1-questions">'+[4,6,8].map(i=>'<div class="l1-question"><b>'+html(t[i])+'</b><span>'+html(t[i+1])+'</span></div>').join('')+'</div>'+bottom(t[10])
}
{
 const t=source[9].text
 body[10]='<div class="l1-lead mono">'+html(t[4])+'</div><div class="l1-stage-track">'+[5,9,13,17].map(i=>'<div><small>'+t[i]+'</small><h2>'+t[i+1]+'</h2><code>'+t[i+2]+'</code><p>'+t[i+3]+'</p></div>').join('')+'</div>'+bottom(t[21])
}
{
 const t=source[14].text
 body[15]=lead(t[4])+code(t.slice(5,7),'text')+'<div class="spaced">'+lead(t[7])+code([t[8]],'text')+'</div>'+lead(t[9])+lead(t[10])+bottom(t[11])
}
body[16]=triples(source[15].text.slice(4,10))+bottom(source[15].text[10])
{
 const t=source[17].text
 body[18]='<div class="large key-point">'+html(t[4])+'</div>'+lead(t[5])+'<MemoryBytes kind="bits" />'+lead(t[14])+lead(t[15])+lead(t[16])+bottom(t[17])
}
for(const n of [19,20,32])body[n]=table(source[n-1].tables[0])+bottom(source[n-1].text[4])
{
 const t=source[20].text
 body[21]=col('<div class="label">'+html(t[4])+'</div>'+code([t[6]])+lead(t[8]),'<div class="label">'+html(t[5])+'</div>'+code([t[7]])+lead(t[9]),true)+bottom(t[10])
}
for(const n of [23,51,54]){const t=source[n-1].text;body[n]=pairs(t.slice(4,14),'l1-spec')+bottom(t[14])}
body[24]=lead(source[23].text[4])+'<LessonFill kind="temperature" :step="$clicks" />'+bottom(source[23].text[15])
{
 const t=source[24].text
 body[25]=lead(t[4])+col(code(t.slice(5,9)),table([['摄氏温度 C','华氏温度 F'],[t[9],t[10]],[t[11],t[12]],[t[13],t[14]]]))+bottom(t[15])
}
{
 const t=source[25].text
 body[26]=code([t[4]])+'<MemoryBytes kind="char" />'+lead('示意地址 0x1000；格内的 41 是十六进制。')+'<div class="large key-point">'+html(t[9])+'</div>'+bottom(t[10])
}
{
 const t=source[26].text
 body[27]=code([t[4]])+lead('72（十进制）；'+t[8])+'<MemoryBytes kind="int" />'+lead(t[17])+lead(t[18])+bottom(t[19])
}
{
 const t=source[27].text
 body[28]=lead(t[4])+col(code(t.slice(5,10)),lead(t[10])+lead(t[11]))+'<MemoryBytes kind="padding" />'+bottom(t[33])
}
{
 const t=source[28].text
 body[29]=col(code(t.slice(4,9))+'<div class="label spaced">'+html(t[16])+'</div>'+code([t[17]],'text'),pairs(t.slice(9,15))+lead(t[15])+'<div class="tiny-note">'+html(t[18])+'</div>')
}
{
 const t=source[29].text
 body[30]=col(code(t.slice(4,8))+'<div class="spaced">'+lead(t[14])+'<div class="large mono">'+html(t[15])+'</div></div>',pairs(t.slice(8,14)))+bottom(t[16])
}
{
 const t=source[30].text
 body[31]='<div class="hero-number">10 <span style="font-size:32px">分钟</span></div>'+lead(t[6])+bottom(t[7])
}
{
 const t=source[33].text
 body[34]=code(t.slice(4,6))+table(source[33].tables[0])+bottom(t[6])
}
{
 const t=source[35].text
 body[36]=col('<div class="label">程序 A</div>'+code(t.slice(6,10)),'<div class="label">程序 B</div>'+code(t.slice(10,14)),true)+bottom(t[14])
}
{
 const t=source[36].text
 body[37]=col('<h2>'+html(t[4])+'</h2>'+lead(t[5]),'<h2>'+html(t[6])+'</h2>'+lead(t[7]),true)+bottom(t[8])
}
body[38]=lead(source[37].text[4])+table(source[37].tables[0])+lead(source[37].text[5])+bottom(source[37].text[6])
body[39]=lead(source[38].text[4])+'<LessonFill kind="grade" :step="$clicks" />'
body[44]=lead(source[43].text[4])+table(source[43].tables[0])+bottom(source[43].text[5])
{
 const t=source[44].text
 body[45]=lead(t[4])+col('<div class="label">程序 A</div>'+code(t.slice(7,9)),'<div class="label">程序 B</div>'+code(t.slice(9,11)),true)+lead(t[11])+bottom(t[12])
}
body[46]=table(source[45].tables[0])
{
 const t=source[46].text
 body[47]=lead(t[4])+'<div class="l1-numbers"><div><span>'+t[5]+'</span><b>'+t[6]+'</b></div><div><span>'+t[7]+'</span><b>'+t[8]+'</b></div></div>'+lead(t[9])+lead(t[10])+bottom(t[11])
}
body[48]=lead(source[47].text[4])+pairs(source[47].text.slice(5,13),'l1-spec')
body[50]=pairs(source[49].text.slice(4,12),'l1-spec')+bottom(source[49].text[12])
{
 const t=source[52].text
 body[53]='<div class="l1-review">'+[4,6,8,10,12,14].map(i=>'<div><b>'+html(t[i])+'</b><p>'+html(t[i+1])+'</p></div>').join('')+'</div>'
}
body[55]=triples(source[54].text.slice(4,10))+bottom(source[54].text[10])
body[57]=lead(source[56].text[4])+'<div class="l1-dense">\n'+code(source[56].text.slice(5,15))+'</div>\n'+bottom(source[56].text[15])
{
 const t=source[57].text
 body[58]=code([t[4]])+lead(t[5])+'<MemoryBytes kind="endian" />'+lead(t[14])+bottom(t[15])
}
body[59]=code(source[58].text.slice(4,8),'bash')+bottom(source[58].text[8])
{
 const t=source[59].text
 body[60]=lead(t[4])+code([t[5]],'text')+lead(t[6])+code(t.slice(7,9),'text')+bottom(t[9])
}
const groups=[['00-opening',2,3],['01-first-program',4,8],['02-build',9,16],['03-data',17,25],['04-memory',26,31],['05-branches',32,43],['06-oj',44,52],['07-wrap',53,55],['08-appendix',56,60]]
const mapping=[]
function page(n){
 const slide=source[n-1],t=slide.text
 if(!body[n])throw Error('Missing body '+n)
 const clicks=n===24?8:n===39?4:0
 const note=['原 PPT 第 '+n+' 页；内容、表格及讲师说明取自 CONE_C语言_金石滩_L1.pptx。',...slide.notes].join('\n').replaceAll('-->','-- >')
 return '---\nclass: l1-page'+([39,40].includes(n)?' l1-grade':'')+'\n'+(clicks?'clicks: '+clicks+'\n':'')+'---\n\n<div class="eyebrow">'+html(t[0])+'</div>\n\n# '+t[1]+'\n\n'+body[n]+'\n<!--\n'+note+'\n-->\n'
}
const map='---\nclass: l1-page\n---\n\n<div class="eyebrow">课程地图 · 先理解程序，再处理重复与数据</div>\n\n# RM 电控系列课程\n\n<div class="roadmap"><a href="/cj-0/" class="current"><span>CJ-0 · 本课</span><strong>C 语言基础与程序运行</strong><p>构建过程 · 变量与内存<br>输入输出 · 判断与分支<br>120 分钟，含 10 分钟休息</p></a><a href="/cj-1/"><span>CJ-1 · 下一课</span><strong>循环、数组与字符串</strong><p>重复处理 · 批量数据<br>字符与文本 · 洛谷练习<br>120 分钟，含 10 分钟休息</p></a><div><span>后续方向</span><strong>把基础放进真实任务</strong><p>状态机 · 通信协议<br>控制任务 · 调试与验证<br>以实际开课安排为准</p></div></div>\n\n<div class="l1-bottom">本课用六个问题串联：代码怎样成为程序？数据怎样存放？怎样判断、输入与验证？</div>\n'
await fs.mkdir(path.join(deck,'chapters'),{recursive:true})
for(const [name,start,end]of groups){
 const pages=[]
 for(let n=start;n<=end;n++){
  pages.push(page(n));mapping.push({source:n,target:n>=4?n+1:n,chapter:'chapters/'+name+'.md',title:source[n-1].text[1]})
 }
 if(name==='00-opening')pages.push(map)
 // Each page carries its own frontmatter; adjacent delimiters are intentional.
 await fs.writeFile(path.join(deck,'chapters',name+'.md'),pages.join('\n'))
}
mapping.unshift({source:1,target:1,chapter:'slides.md',title:'C 语言基础与程序的运行方式'})
await fs.writeFile(path.join(deck,'source/page-map.json'),JSON.stringify({source:'../../CONE_C语言_金石滩_L1.pptx',originalPages:60,addedPages:[{target:4,title:'RM 电控系列课程'}],pages:mapping},null,2)+'\n')
console.log('Imported all 60 source slides and lecturer notes; added one course map.')
