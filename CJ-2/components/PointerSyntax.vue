<script setup lang="ts">
import CodeTokens from '../../shared/components/CodeTokens.vue'
import { highlightParts } from '../../shared/utils/highlight'

const props = defineProps<{ step: number }>()
const print = new URLSearchParams(location.search).has('print')
const lines = highlightParts<{ text: string; mark?: number }>([
  [{ text: 'int speed = 9600;' }],
  [{ text: 'int *p', mark: 1 }, { text: ' = ' }, { text: '&speed', mark: 2 }, { text: ';' }],
  [{ text: '' }],
  [{ text: '*p = 0', mark: 3 }, { text: ';' }],
])
const visible = (n: number) => print || props.step >= n
</script>

<template>
  <div class="two-col cj2-definition" data-definition="pointer" :data-step="step">
    <div>
      <pre class="cj2-compact"><code><span v-for="(line,i) in lines" :key="i" class="cj2-def-line"><span v-for="(part,j) in line" :key="j" :data-mark="part.mark" :class="{'cj2-syntax-mark':part.mark && visible(part.mark)}"><CodeTokens :tokens="part.tokens" /></span></span></code></pre>
      <p class="spaced" :class="{'cj2-unshown':!visible(3)}">如果把 <code>&amp;speed</code> 交给 <code>stop_motor</code>，函数也能找到这格吗？</p>
    </div>
    <div class="cj2-syntax-notes">
      <div class="cj2-syntax-note" :class="{'cj2-unshown':!visible(1)}">
        <strong>声明指针</strong><span><code>int *p</code> 声明一个指向 <code>int</code> 的指针。<code>p</code> 存的是地址，不是速度。</span>
      </div>
      <div class="cj2-syntax-note" :class="{'cj2-unshown':!visible(2)}">
        <strong>取地址</strong><span><code>&amp;speed</code> 取出 <code>speed</code> 的地址，用这个地址初始化 <code>p</code>。这时 <code>speed</code> 还是 9600。</span>
      </div>
      <div class="cj2-syntax-note" :class="{'cj2-unshown':!visible(3)}">
        <strong>修改原值</strong><span><code>*p</code> 沿地址找到 <code>speed</code> 那一格（解引用）。执行 <code>*p = 0</code>，<code>speed</code> 才变成 0。</span>
      </div>
      <p class="cj2-star-contrast" :class="{'cj2-unshown':!visible(3)}"><code>int <span class="cj2-syntax-mark">*p</span></code>：声明它是指针。<br><code><span class="cj2-syntax-mark">*p</span> = 0</code>：顺着指针去改原值。</p>
    </div>
  </div>
</template>
