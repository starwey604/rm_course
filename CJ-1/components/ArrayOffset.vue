<script setup lang="ts">
import {computed} from 'vue'
const props=defineProps<{step:number}>()
const printMode=location.search.includes('print=true')
const n=computed(()=>printMode?3:props.step)
const values=computed(()=>[3,n.value>=3?9:1,4,0,0])
const selected=computed(()=>[-1,0,2,1][n.value])
const explanations=[
  '下标比“第几个”少 1：第 1 个元素用 0，第 3 个元素用 2。下面分别演示读取和修改。',
  '读取第 1 个元素：从首元素出发，不跨过任何元素，所以下标是 0。',
  '读取第 3 个元素：跨过前面的两个元素，所以下标是 2。',
  '修改第 2 个元素：使用下标 1，把这个位置原来的 1 改成 9。'
]
const code=[
  'a[下标]：指定数组 a 中要访问的那个元素',
  'printf("%d\\n", a[0]);  // 输出 3',
  'printf("%d\\n", a[2]);  // 输出 4',
  'a[1] = 9;             // 第 2 个元素变成 9'
]
</script>
<template>
  <div class="index-intro">数组里的每个数叫一个<strong>元素</strong>。用<strong>数组名 + 下标</strong>指定其中一个元素，下标从 <strong>0</strong> 开始。</div>
  <div class="index-declaration"><code>int a[5] = {3, 1, 4};</code><span><strong>int</strong>：元素是整数；<strong>a</strong>：数组名；<strong>5</strong>：元素总数。<br>这行初始化把未列出的两个元素补为 0。</span></div>
  <div class="index-track">
    <div v-for="(v,i) in values" :key="i" class="index-item" :class="{selected:selected===i}">
      <div class="index-ordinal">第 {{i+1}} 个元素</div>
      <div class="index-name">a[{{i}}]</div>
      <div class="index-value">{{v}}</div>
      <div class="index-marker">{{selected===i?(n===3?'↑ 修改这个元素':'↑ 读取这个元素'):''}}</div>
    </div>
  </div>
  <div class="offset-explain index-explain">
    <div>{{printMode?'读取：a[0] 得到 3，a[2] 得到 4。修改：a[1] = 9，把第 2 个元素从 1 改成 9。':explanations[n]}}</div>
    <div class="index-operation">{{code[n]}}</div>
  </div>
  <div class="index-boundary">5 个元素的合法下标是 <strong>0～4</strong>；<code>a[5]</code> 已越界。<strong>声明中的 5 是元素总数，不是最后一个下标。</strong></div>
</template>
