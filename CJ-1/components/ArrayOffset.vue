<script setup lang="ts">
import {computed} from 'vue'
const props=defineProps<{step:number}>()
const printMode=location.search.includes('print=true')
const n=computed(()=>printMode?3:props.step)
const values=[34,12,56,9,45]
</script>
<template>
  <div class="offset-entry">起点 a <span>↓</span></div>
  <div class="offset-track">
    <div v-for="(v,i) in values" :key="i" class="offset-cell" :class="{selected:n===1&&i===0||n>=2&&i===4}">
      <div class="memory-index">a[{{i}}]</div><div class="memory-cell">{{v}}</div>
      <div class="offset-steps">{{i}} 步</div>
    </div>
  </div>
  <div class="offset-explain">
    <p v-if="n===0">方括号里的下标：从起点往后跨过几个元素？</p>
    <p v-else-if="n===1">一步都不走，拿到第一个元素：<strong>a[0] = 34</strong>。</p>
    <p v-else-if="n===2">向后走 4 步，拿到第五个元素：<strong>a[4] = 45</strong>。</p>
    <p v-else>从起点走 0 步 → <strong>a[0]</strong>；走 4 步 → <strong>a[4]</strong>。<br>走 5 步就出了这 5 格，<strong>a[5] 越界</strong>。</p>
  </div>
</template>
