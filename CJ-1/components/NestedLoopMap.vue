<script setup lang="ts">
import {computed} from 'vue'
import CodeTokens from '../../shared/components/CodeTokens.vue'
import {highlightC} from '../../shared/utils/highlight'
const props=defineProps<{step:number}>()
const printMode=location.search.includes('print=true')
const states=[
 {i:-1,j:-1,count:0,lines:[0],note:'先看约定：i 是行下标，j 是列下标。一次内层循环，只输出一个数。'},
 {i:0,j:0,count:1,lines:[1,2,3,4],note:'第 1 行第 1 列：i = 0，j = 0，输出 01。'},
 {i:0,j:1,count:2,lines:[2,3,4],note:'i 保持 0，只有 j++：沿同一行向右，输出 02。'},
 {i:0,j:2,count:3,lines:[2,3,4],note:'i 仍是 0，j 走到 2，输出本行最后一个数 03。'},
 {i:0,j:3,count:3,lines:[2,6],note:'j = 3 时，3 < 3 为假，内层结束并换行。此时 i 仍为 0。'},
 {i:1,j:0,count:4,lines:[1,2,3,4],note:'外层 i++ 进入第 2 行；内层重新从 j = 0 开始，输出 04。'},
 {i:1,j:1,count:5,lines:[2,3,4],note:'这一行只有 3 − i = 2 个数；j = 1 时输出 05。'},
 {i:1,j:2,count:5,lines:[2,6],note:'j = 2 时，2 < 2 为假。第 2 行结束，先换行，再轮到外层更新。'},
 {i:2,j:0,count:6,lines:[1,2,3,4],note:'外层 i 变成 2，内层再次从 j = 0 开始；第 3 行只输出 06。'},
 {i:2,j:1,count:6,lines:[2,6],note:'j = 1 时，1 < 1 为假。最后一行也要执行内层之后的换行语句。'},
 {i:3,j:-1,count:6,lines:[1],note:'i = 3 时，外层条件为假，全部结束。i 按行走，j 在每一行里从头走。'}
]
const code=[
 'int value = 0;',
 'for (int i = 0; i < 3; i++) {',
 '    for (int j = 0; j < 3 - i; j++) {',
 '        value++;',
 '        printf("%02d", value);',
 '    }',
 '    printf("\\n");',
 '}'
]
const highlighted=highlightC(code.join('\n'))
const n=computed(()=>printMode?10:Math.min(props.step,10))
const s=computed(()=>states[n.value])
const cells=[
 [{value:1,col:0},{value:2,col:1},{value:3,col:2}],
 [{value:4,col:0},{value:5,col:1},{value:0,col:2}],
 [{value:6,col:0},{value:0,col:1},{value:0,col:2}]
]
const shown=(value:number)=>value>0&&s.value.count>=value
const active=(row:number,col:number,value:number)=>!printMode&&n.value>0&&row===s.value.i&&col===s.value.j&&value>0
</script>
<template>
 <div class="nested-map-intro">以 n = 3 为例：<strong class="key-point">i 选行，j 选本行的位置</strong>；第 i + 1 行要输出 <strong>3 − i</strong> 个数。</div>
 <div class="nested-map-grid" :data-step="n" :data-row="s.i" :data-col="s.j">
  <div>
   <div class="label">同一段代码：内层走完，才轮到外层更新</div>
   <pre class="nested-map-code"><code><span v-for="(line,k) in code" :key="k" class="nested-map-code-line" :class="{active:!printMode&&s.lines.includes(k)}"><CodeTokens :tokens="highlighted[k]" /></span></code></pre>
   <div class="nested-map-vars"><span>i = <b>{{s.i<0?'—':s.i}}</b></span><span>j = <b>{{s.j<0?'—':s.j}}</b></span><span>value = <b>{{s.count}}</b></span></div>
  </div>
  <div>
   <div class="label">屏幕上的输出位置：j 向右，i 向下</div>
   <div class="nested-map-columns"><span></span><div v-for="j in 3" :key="j">第 {{j}} 列<code>j = {{j-1}}</code></div></div>
   <div v-for="(row,i) in cells" :key="i" class="nested-map-row" :class="{current:!printMode&&s.i===i}">
    <div class="nested-map-row-label">第 {{i+1}} 行<code>i = {{i}}</code></div>
    <div v-for="cell in row" :key="cell.col" class="nested-map-cell" :class="{used:shown(cell.value),current:active(i,cell.col,cell.value),unused:cell.value===0}" :data-value="cell.value">
     {{cell.value===0?'—':shown(cell.value)?String(cell.value).padStart(2,'0'):'·'}}
    </div>
   </div>
   <div class="nested-map-paths">
    <div :class="{current:!printMode&&s.i===0}"><code>i = 0</code>：j 走 0 → 1 → 2</div>
    <div :class="{current:!printMode&&s.i===1}"><code>i = 1</code>：j 重新从 0 开始，走到 1</div>
    <div :class="{current:!printMode&&s.i===2}"><code>i = 2</code>：j 再从 0 开始，只走 0</div>
   </div>
  </div>
 </div>
 <div class="nested-map-caption">{{printMode?'每进入一行，j 都重新从 0 开始。内层结束后先换行，再更新 i；value 跨行继续累加。':s.note}}</div>
</template>
