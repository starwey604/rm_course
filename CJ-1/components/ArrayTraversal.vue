<script setup lang="ts">
import {computed} from 'vue'
const props=defineProps<{step:number}>()
const printMode=location.search.includes('print=true')
const n=computed(()=>printMode?4:Math.min(props.step,4))
const values=[3,1,4]
const captions=[
  '从 i = 0 开始，每轮读取 data[i] 后执行 i++。',
  'i = 0，读取 data[0]，输出 3。',
  'i = 1，读取 data[1]，输出 1。',
  'i = 2，读取 data[2]，输出 4。',
  '输出 3 1 4；i = 3 时停止，不访问 data[3]。'
]
</script>
<template>
  <div class="traversal-intro"><strong>容量</strong>是数组能放多少个数；<strong>有效个数 n</strong>是这一次实际要处理多少个数。</div>
  <div class="traversal-declaration"><code>int data[100] = {3, 1, 4};<br>int n = 3;  // 本例只把前 3 个元素当作需要处理的数据</code></div>
  <div class="traversal-memory">
    <div v-for="(v,i) in values" :key="i" class="traversal-used" :class="{current:n===i+1}"><span>data[{{i}}]</span><b>{{v}}</b></div>
    <div class="traversal-unused"><span>data[3] … data[99]</span><div>其余 97 个元素，本次不处理</div></div>
    <div class="traversal-counts">数组容量 <strong>100</strong><br>本次有效个数 <strong>n = 3</strong></div>
  </div>
  <div class="traversal-work">
    <div class="traversal-loop"><div class="label">遍历：按下标依次访问这些元素</div><pre><code><span :class="{active:n===4}">for (int i = 0; i &lt; n; i++) {</span><span :class="{active:n>0&&n<4}">    printf("%d ", data[i]);</span><span>}</span></code></pre><div class="traversal-caption">{{captions[n]}}</div></div>
    <table class="traversal-table"><thead><tr><th>i</th><th>i &lt; n</th><th>这一轮做什么</th></tr></thead><tbody>
      <tr v-for="i in 4" :key="i" :class="{current:n===i}"><td>{{i-1}}</td><td><span class="reveal" :class="{shown:n>=i}">{{i<4?'成立':'不成立'}}</span></td><td><span class="reveal" :class="{shown:n>=i}">{{i<4?'输出 '+values[i-1]:'退出循环'}}</span></td></tr>
    </tbody></table>
  </div>
</template>
