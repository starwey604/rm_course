import assert from 'node:assert/strict'
import {highlightC,highlightParts} from '../shared/utils/highlight.ts'

const sample='#include <stdio.h>\nint main(void) {\n    int count[5] = {0};\n    printf("%02d\\n", count[0]);\n    /* A comment starts here\n       and continues here. */\n    return 0;\n}'
const lines=highlightC(sample)
assert.equal(lines.map(line=>line.map(t=>t.content).join('')).join('\n'),sample)
function colorAt(line,needle){
 const text=lines[line].map(t=>t.content).join(''),start=text.indexOf(needle)
 assert.ok(start>=0,needle)
 let offset=0
 return lines[line].filter(t=>{const hit=offset<start+needle.length&&offset+t.content.length>start;offset+=t.content.length;return hit}).map(t=>t.color)
}
assert.deepEqual([...new Set(colorAt(2,'count'))],['#18283B'])
assert.deepEqual([...new Set(colorAt(2,'int'))],['#2455A4'])
assert.deepEqual([...new Set(colorAt(2,'5'))],['#8A4B29'])
assert.deepEqual([...new Set(colorAt(3,'printf'))],['#72569D'])
assert.deepEqual([...new Set(colorAt(3,'"%02d\\n"'))],['#28695B'])
assert.deepEqual([...new Set(colorAt(5,'and continues here.'))],['#526477'])
const parts=highlightParts([[{text:'printf("prefix '},{text:'%d',blank:1},{text:' suffix", count);'}]])[0]
assert.equal(parts.map(p=>p.tokens.map(t=>t.content).join('')).join(''),'printf("prefix %d suffix", count);')
assert.ok(parts[1].tokens.every(t=>t.color==='#28695B'),'Fragment must retain its string context')
function luminance(hex){return hex.slice(1).match(/../g).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0)}
for(const ink of ['#18283B','#2455A4','#43546A','#28695B','#8A4B29','#72569D','#526477','#245F63']){
 for(const bg of ['#EAF0F7','#DBEAFE']){
  const a=luminance(ink),b=luminance(bg)
  assert.ok((Math.max(a,b)+.05)/(Math.min(a,b)+.05)>=4.5,`${ink} on ${bg}`)
 }
}
console.log('Syntax roles, full-block context, fragment boundaries, exact source text and contrast checks passed.')
