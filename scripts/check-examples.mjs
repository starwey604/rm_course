import fs from 'node:fs/promises'
import {existsSync} from 'node:fs'
import path from 'node:path'
import {spawnSync} from 'node:child_process'
const root=path.resolve(import.meta.dirname,'..')
const out=path.join(root,'tmp','examples')
await fs.mkdir(out,{recursive:true})
const scoopBin=path.join(process.env.USERPROFILE||'', 'scoop/apps/gcc/current/bin')
const gcc=process.env.CC||(existsSync(path.join(scoopBin,'gcc.exe'))?path.join(scoopBin,'gcc.exe'):'gcc')
const gpp=process.env.CXX||(existsSync(path.join(scoopBin,'g++.exe'))?path.join(scoopBin,'g++.exe'):'g++')
const cases={
triangle_lower_left:[['','*   \n**  \n*** \n****']],
triangle_upper_left:[['','****\n*** \n**  \n*']],
triangle_upper_right:[['','****\n ***\n  **\n   *']],
triangle_lower_right:[['','   *\n  **\n ***\n****']],
scanf_line:[['RM Studio\n','[RM Studio]'],['  RM Studio\n','[  RM Studio]'],['\n','no text'],['','no text'],['   \n','[   ]'],['12345678901234567890\n','[1234567890123456789]']],
scanf_line_after_number:[['18\nRM Studio\n','18 [RM Studio]'],['18\n\n  RM Studio\n','18 [RM Studio]'],['18 RM Studio\n','18 [RM Studio]'],['18\n12345678901234567890\n','18 [1234567890123456789]']],
isbn_parts:[['0-670-82162-4\n','0-670-82162-4'],['0-001-00042-X\n','0-001-00042-X']],
p1424:[['5 4\n','500'],['6 2\n','0'],['7 2\n','250'],['1 7\n','1250']],
p5719:[['6 2\n','4.0 3.0'],['2 2\n','2.0 1.0'],['10 3\n','6.0 5.3']],
p5720:[['20\n','5'],['1\n','1'],['2\n','2'],['1000000000\n','30']],
p5721:[['3\n','010203\n0405\n06'],['1\n','01']],
p5724:[['5\n34 12 56 9 45\n','47'],['1\n7\n','0'],['3\n7 8 9\n','2']],
p1427:[['3 1 4 0\n','4 1 3'],['7 0\n','7'],['2 2 0\n','2 2'],['2147483647 1 0\n','1 2147483647']],
p1428:[['5\n4 3 0 5 1\n','0 0 0 3 1'],['3\n2 2 2\n','0 0 0'],['1\n0\n','0']],
p1047:[['10 2\n2 5\n4 7\n','5'],['1 1\n0 1\n','0'],['10 2\n2 5\n2 5\n','7']],
p5733:[['Rm2026\n','RM2026'],['abc\n','ABC'],['ABC\n','ABC'],['a1Z\n','A1Z']],
b2111:[['0.75\nACGT\nACGA\n','yes'],['0.8\nACGT\nACGA\n','no']],
b2112:[['4\nRock Scissors\nPaper Scissors\nPaper Paper\nPaper Rock\n','Player1\nPlayer2\nTie\nPlayer1']],
p1085:[['5 3\n6 2\n7 2\n5 3\n5 4\n0 4\n0 6\n','3'],['4 4\n4 4\n4 4\n4 4\n4 4\n0 0\n0 0\n','0'],['5 4\n5 4\n0 0\n0 0\n0 0\n0 0\n0 0\n','1']],
palindrome:[['level\n','yes'],['abccba\n','yes'],['robot\n','no'],['a\n','yes']],
p5015:[['a B2\n','3'],['     \n','0'],['A1\r\n','2']],
p1055:[['0-670-82162-4\n','Right'],['0-670-82162-0\n','0-670-82162-4'],['0-000-00006-0\n','0-000-00006-X']],
output_c:[['','sum=6, avg=2.00']],output_cout:[['','sum=6, avg=2.00']],output_println:[['','sum=6, avg=2.00']]
}
const problems=JSON.parse(await fs.readFile(path.join(root,'CJ-1/data/problems.json'),'utf8'))
for(const [pid,problem] of Object.entries(problems)){
 const name=pid.toLowerCase()
 if(cases[name])for(const [input,expected] of problem.samples)cases[name].push([input+'\n',expected.trim()])
}
const cj2Cases={
 chassis:[['','函数限幅：8000 -8000 8000 6000\n参数内：0\n值传后：9600\n传地址后：0\n交换后：-8000 8000\n副本内：0\n副本返回后：9600\n原件更新后：0，温度：30\n数组限幅：8000 -8000 8000 6000']],
 p5737:[['1999 2004\n','2\n2000 2004'],['1899 1904\n','1\n1904'],['2099 2101\n','0']],
 p5742:[['3\n101 95 45\n102 80 80\n103 79 80\n','Not excellent\nExcellent\nNot excellent'],['1\n100000 100 100\n','Excellent']],
}
let count=0
const env={...process.env,PATH:path.dirname(gcc)+path.delimiter+process.env.PATH}
const examples=Object.entries({'CJ-1':cases,'CJ-2':cj2Cases}).flatMap(([course,items])=>
 Object.entries(items).map(([name,tests])=>({course,name,tests})))
for(const {course,name,tests} of examples){
 const cpp=name.startsWith('output_')&&name!=='output_c'
 const source=path.join(root,course,'examples',name+(cpp?'.cpp':'.c'))
 const target=path.join(out,name+(process.platform==='win32'?'.exe':''))
 const link=name==='output_println'&&process.platform==='win32'&&/g\+\+(\.exe)?$/.test(gpp)?['-lstdc++exp']:[]
 const build=spawnSync(cpp?gpp:gcc,[cpp?'-std=c++23':'-std=c11','-Wall','-Wextra','-Werror',source,'-o',target,...link],{encoding:'utf8',env})
 if(build.status!==0)throw new Error(name+': '+(build.stderr||build.error))
 for(const [input,expected] of tests){
  const run=spawnSync(target,[],{input,encoding:'utf8',env,timeout:3000})
  const normalized=(run.stdout||'').replaceAll('\r\n','\n')
  const actual=name.startsWith('triangle_')?normalized.trimEnd():normalized.trim()
  if(run.status!==0||actual!==expected)throw new Error(name+': expected '+JSON.stringify(expected)+', got '+JSON.stringify(actual)+' / '+run.stderr)
  count++
 }
}
console.log(examples.length+' C/C++ examples, '+count+' cases passed.')
