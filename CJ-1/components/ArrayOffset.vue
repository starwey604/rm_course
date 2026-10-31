<script setup lang="ts">
import {computed} from 'vue'
const props=defineProps<{step:number}>()
const printMode=location.search.includes('print=true')
const n=computed(()=>printMode?3:props.step)
const values=computed(()=>[3,n.value>=3?9:1,4,0,0])
const selected=computed(()=>[-1,0,2,1][n.value])
const code=[
  'a[下标]：指定数组 a 中要访问的那个元素',
  'printf("%d\\n", a[0]);  // 输出 3',
  'printf("%d\\n", a[2]);  // 输出 4',
  'a[1] = 9;             // 第 2 个元素变成 9'
]
</script>
<template>
  <div class="index-intro">数组里的每个值叫<strong>元素</strong>；访问写作<strong>数组名[下标]</strong>，下标从 <strong>0</strong> 开始。</div>
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
    <div class="index-operation">{{printMode?'读取 a[0] 得到 3、a[2] 得到 4；a[1] = 9 修改第 2 个元素。':code[n]}}</div>
  </div>
  <div class="index-boundary">5 是元素总数；合法下标为 <strong>0～4</strong>，<code>a[5]</code> 已越界。</div>
</template>
