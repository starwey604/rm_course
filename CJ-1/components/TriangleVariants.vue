<script setup lang="ts">
import {computed} from 'vue'
import {triangleVariants,triangleRows} from '../data/triangles'
const props=defineProps<{step:number}>()
const printMode=location.search.includes('print=true')
const n=computed(()=>printMode?4:Math.min(props.step,4))
const summary=computed(()=>n.value===4)
const variant=computed(()=>triangleVariants[Math.min(n.value,3)])
const rows=computed(()=>triangleRows(variant.value))
const summaryLines=[
 'for ([外层参数]) {',
 '    for ([内层参数]) {',
 '        if (j <= i) printf("*");',
 '        else printf(" ");',
 '    }',
 '    printf("\\n");',
 '}'
]
const commonLines=[
 '        if (j <= i) printf("*");',
 '        else printf(" ");',
 '    }',
 '    printf("\\n");',
 '}'
]
</script>
<template>
 <div v-if="!summary" class="triangle-lesson-intro">本页用 <strong>i 表示本行星号数</strong>：<code>j &lt;= i</code> 时打印 <strong>*</strong>，否则打印空格。</div>
 <div class="triangle-lesson-grid" :data-phase="n">
  <div>
   <div class="label">{{summary?'共同框架：用右侧各组参数，替换两处括号内容':'黄色标出这次改变的循环；循环体保持相同'}}</div>
   <pre class="triangle-code"><code v-if="summary"><span v-for="(line,k) in summaryLines" :key="k" class="triangle-code-line" :class="{changed:k<2}">{{line}}</span></code><code v-else><span class="triangle-code-line" :class="{changed:variant.changed!=='inner'}">for (<b>{{variant.iParams}}</b>) {</span><span class="triangle-code-line" :class="{changed:variant.changed!=='outer'}">    for (<b>{{variant.jParams}}</b>) {</span><span v-for="(line,k) in commonLines" :key="k" class="triangle-code-line">{{line}}</span></code></pre>
   <div v-if="summary" class="triangle-shared-note">i 表示本行星号数，灰点表示空格。<br>只改两行 for 的参数，判断语句不变。</div>
   <div v-else class="triangle-sequences"><div><strong>外层 i：</strong>{{variant.iValues.join(' → ')}}</div><div><strong>内层 j：</strong>{{variant.jValues.join(' → ')}}，每行重新开始。</div></div>
  </div>
  <div v-if="!summary" class="triangle-live">
   <div class="triangle-live-title">{{n+1}} / 4 · {{variant.name}}</div>
   <div class="label">右侧按真实输出排列；灰点表示一个空格</div>
   <div class="triangle-live-output" :key="n">
    <div v-for="(row,k) in rows" :key="k" class="triangle-output-row" :data-text="row.text"><span class="triangle-i-label">i = {{row.i}}</span><span v-for="(char,j) in row.text" :key="j" class="triangle-character" :class="{blank:char===' '}">{{char===' '?'·':char}}</span></div>
   </div>
  </div>
  <div v-else class="triangle-overview">
   <section v-for="(item,k) in triangleVariants" :key="item.name" class="triangle-mini">
    <div class="triangle-mini-title">{{k+1}} · {{item.name}}</div>
    <div class="triangle-mini-params">{{item.iParams}}</div>
    <div class="triangle-mini-params">{{item.jParams}}</div>
    <div class="triangle-mini-output"><div v-for="(row,r) in triangleRows(item)" :key="r" class="triangle-output-row" :data-text="row.text"><span v-for="(char,c) in row.text" :key="c" class="triangle-character" :class="{blank:char===' '}">{{char===' '?'·':char}}</span></div></div>
   </section>
  </div>
 </div>
 <div class="triangle-lesson-caption">{{summary?'总结：外层 i 的方向决定数量增减；内层 j 的方向决定先输出星号还是空格。初值、条件、更新要配套修改；右对齐来自先打印空格。':variant.note}}</div>
</template>
