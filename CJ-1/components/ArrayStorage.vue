<script setup lang="ts">
import {computed} from 'vue'
const props=defineProps<{step:number}>()
const printMode=location.search.includes('print=true')
const n=computed(()=>printMode?3:Math.min(props.step,3))
const values=[3,1,4]
const captions=[
  '依次读入 3、1、4，比较两种保存方法：每次都写进 x，或分别放进数组的三个元素。',
  '读到 3：x 保存 3；数组的第一个元素也保存 3。',
  '读到 1：x 中的 3 被覆盖；数组另用一个元素保存 1，原来的 3 还在。',
  '读到 4：x 最后只剩 4；数组仍然同时保留 3、1、4。'
]
</script>
<template>
  <div class="array-task">任务：依次读入 <strong>3、1、4</strong>，等全部读完，再倒序输出 <strong>4、1、3</strong>。</div>
  <div class="storage-grid">
    <section>
      <h2>一个变量：只能保存当前的一个数</h2>
      <div class="storage-code">scanf("%d", &amp;x);</div>
      <div class="storage-single"><span class="label">x 当前的值</span><b>{{n?values[n-1]:'—'}}</b></div>
      <div class="storage-detail">{{n>1?'再次读入会覆盖 x，之前的数没有被保存。':'每读到一个数，都写进同一个 x。'}}</div>
    </section>
    <section>
      <h2>一个数组：能同时保存多个同类型的数</h2>
      <div class="storage-code">把每次读到的数放在不同元素里</div>
      <div class="storage-cells">
        <div v-for="(v,i) in values" :key="i"><span class="label">第 {{i+1}} 个元素</span><b :class="{filled:n>i}">{{n>i?v:'—'}}</b></div>
      </div>
      <div class="storage-detail">数组可以理解为一组连续的存储位置，每个位置保存一个数。</div>
    </section>
  </div>
  <div class="storage-caption">{{printMode?'x 依次变成 3 → 1 → 4，最后只剩 4；数组的三个元素分别保留 3、1、4。':captions[n]}}</div>
  <div class="storage-conclusion"><strong class="key-point">先用数组存下整组数据，再从后往前取出</strong>，就能得到 4、1、3。</div>
</template>
