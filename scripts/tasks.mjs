import fs from 'node:fs/promises'
import {existsSync} from 'node:fs'
import path from 'node:path'
import {spawnSync} from 'node:child_process'
import {chromium} from 'playwright-chromium'
const root=path.resolve(import.meta.dirname,'..')
const out=path.join(root,'output','CJ-1')
const cli=path.join(root,'node_modules','@slidev','cli','bin','slidev.mjs')
const entry=path.join(root,'CJ-1','slides.md')
const course=JSON.parse(await fs.readFile(path.join(root,'CJ-1','data','course.json'),'utf8'))
await fs.mkdir(out,{recursive:true})
function run(args){
 const r=spawnSync(process.execPath,[cli,...args],{cwd:root,stdio:'inherit'})
 if(r.status!==0)process.exit(r.status||1)
}
const task=process.argv[2]
if(task==='build')run(['build',entry,'--out',path.join(out,'web'),'--base','./'])
else if(task==='export'){
 const executable=process.env.SLIDEV_BROWSER||chromium.executablePath()
 if(!existsSync(executable))throw new Error('Install export browser first: pnpm exec playwright install chromium')
 run(['export',entry,'--output',path.join(out,course.pdfName),'--executable-path',executable,'--wait','600','--timeout','60000'])
}
else if(task==='package'){
 if(!existsSync(path.join(out,course.pdfName))||!existsSync(path.join(out,'web','index.html')))throw new Error('Run pnpm build and pnpm export before packaging')
 const pack=path.join(out,course.packageName)
 // Rebuild only this generated package, so removed source files cannot linger.
 if(path.dirname(path.resolve(pack))!==path.resolve(out)||path.basename(pack)!=='CONE-C-Language-1')throw new Error('Unexpected package cleanup path')
 await fs.rm(pack,{recursive:true,force:true})
 await fs.mkdir(pack,{recursive:true})
 await fs.cp(path.join(out,'web'),path.join(pack,'web'),{recursive:true,force:true})
 await fs.copyFile(path.join(out,course.pdfName),path.join(pack,course.pdfName))
 for(const name of ['offline-server.ps1','打开课件.cmd','停止课件.cmd'])await fs.copyFile(path.join(root,'scripts',name),path.join(pack,name))
 const source=path.join(pack,'source')
 await fs.mkdir(source,{recursive:true})
 for(const name of ['CJ-1','shared','scripts'])await fs.cp(path.join(root,name),path.join(source,name),{
  recursive:true,force:true,
  filter:src=>!path.relative(root,src).split(path.sep).some(part=>['node_modules','.slidev','.vite'].includes(part))
 })
 for(const name of ['package.json','pnpm-lock.yaml','pnpm-workspace.yaml','README.md','.gitignore'])await fs.copyFile(path.join(root,name),path.join(source,name))
 await fs.writeFile(path.join(pack,'使用说明.txt'),'\uFEFF'+course.title+'：循环、数组与字符串\n\n解压整个文件夹，双击“打开课件.cmd”。点击正文、按空格或方向键右推进，方向键左返回。\n播放完双击“停止课件.cmd”。Windows 离线播放无需安装 Node。\n\n'+course.pdfName+' 为完整内容讲义，不播放动画。前'+course.main+'页为正文，后'+course.appendix+'页为按需选讲的附录。\nsource 内含可修改的 Slidev 课件和完整 C/C++ 示例，修改方式见 source/README.md。\n', 'utf8')
 const archive=path.join(out,course.packageName+'.zip')
 const esc=s=>s.replaceAll("'","''")
 const r=spawnSync('powershell.exe',['-NoProfile','-Command',"Compress-Archive -LiteralPath '"+esc(pack)+"' -DestinationPath '"+esc(archive)+"' -Force"],{stdio:'inherit'})
 if(r.status!==0)process.exit(r.status||1)
 console.log(archive)
}else throw new Error('Unknown task')

