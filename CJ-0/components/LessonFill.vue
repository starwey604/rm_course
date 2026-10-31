<script setup lang="ts">
import {computed} from 'vue'
import CodeTokens from '../../shared/components/CodeTokens.vue'
import {highlightParts} from '../../shared/utils/highlight'
const props=defineProps<{kind:'temperature'|'grade',step:number}>()
const printMode=location.search.includes('print=true')
const data={
 temperature:{
  code:'double celsius, fahrenheit;\nscanf("[①]", [②]);\nfahrenheit = celsius * ([③]) + 32;\nprintf("[④]\\n", fahrenheit);',
  hints:['① 输入的是 double，使用哪个格式？','② 要告诉 scanf：把数写到哪个地址？','③ 先计算比值，怎样避免整数除法？','④ 怎样输出两位小数？'],
  answers:['%lf','&celsius','9.0 / 5.0','%.2f'],
 },
 grade:{
  code:'if (score < 0 [①] score > 100) {\n    printf("INVALID\\n");\n} else if ([②]) {\n    printf("A\\n");\n} else if (score >= 80) {\n    printf("B\\n");\n} else if (score >= 70) {\n    printf("C\\n");\n} else if (score >= 60) {\n    printf("D\\n");\n} else {\n    printf("E\\n");\n}',
  hints:['① 超出下限，或者超出上限：用 && 还是 ||？','② 前面已排除非法成绩，90～100 的条件是什么？'],
  answers:['||','score >= 90'],
 }
}
const d=computed(()=>data[props.kind])
const shown=computed(()=>printMode?d.value.hints.length:Math.ceil(Math.min(props.step,d.value.answers.length*2)/2))
const filled=computed(()=>printMode?0:Math.floor(Math.min(props.step,d.value.answers.length*2)/2))
const marks=['[①]','[②]','[③]','[④]']
const lines=computed(()=>highlightParts(d.value.code.split('\n').map(line=>line.split(/(\[[①②③④]\])/g).map(text=>{
 const blank=marks.indexOf(text)+1
 return {text:blank>0&&filled.value>=blank?d.value.answers[blank-1]:text,blank}
}))))
</script>
<template>
 <div class="l1-fill" :class="kind" :data-kind="kind">
  <pre><code><span v-for="(parts,i) in lines" :key="i" class="fill-line"><span v-for="(part,j) in parts" :key="j" :class="{'fill-blank':part.blank>filled,'fill-answer':part.blank>0&&part.blank<=filled}" :data-blank="part.blank||undefined" :data-filled="part.blank?String(part.blank<=filled):undefined"><CodeTokens :tokens="part.tokens" /></span></span></code></pre>
  <div><div class="label">{{kind==='grade'?'score 已成功读入；这里只填条件':'本题假定输入有效'}}</div><div v-if="!printMode" class="tiny-note">单击看提示，再单击填入答案</div>
   <div v-for="(hint,i) in d.hints" :key="i" class="l1-fill-hint reveal" :class="{shown:shown>i}">{{hint}}</div>
   <div v-if="kind==='grade'" class="l1-followup">再想一步：为什么进入 >= 80 后，不用再写 score &lt; 90？</div>
  </div>
 </div>
</template>
