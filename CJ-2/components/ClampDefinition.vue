<script setup lang="ts">
import { computed } from 'vue'
import CodeTokens from '../../shared/components/CodeTokens.vue'
import { highlightParts } from '../../shared/utils/highlight'

const props = defineProps<{ mode: 'syntax' | 'logic'; step: number }>()
const print = new URLSearchParams(location.search).has('print')
const parts = [
  { label: '返回类型', detail: '最前面的 int：函数交回一个整数。' },
  { label: '函数名', detail: 'clamp_speed：调用时用这个名字。' },
  { label: '圆括号', detail: '( )：括住形参列表；多个形参用逗号隔开。' },
  { label: '形参', detail: 'int speed 和 int limit：各自有类型和名字，接收调用时传入的值。' },
  { label: '函数体', detail: '{ } 里的语句是函数要做的事；return speed; 把 speed 的值交回并结束调用。' },
]
const header = [
  { text: 'int', mark: 1 }, { text: ' ' }, { text: 'clamp_speed', mark: 2 },
  { text: '(', mark: 3 }, { text: 'int speed', mark: 4 }, { text: ', ' },
  { text: 'int limit', mark: 4 }, { text: ')', mark: 3 }, { text: ' ' }, { text: '{', mark: 5 },
]
const guards = ['    if (speed > limit) return limit;', '    if (speed < -limit) return -limit;']
type Fragment = { text: string; mark?: number; insert?: number }
const lines = computed(() => highlightParts<Fragment>([
  header,
  ...(props.mode === 'logic' ? guards.map((text, i) => [{ text, insert: i + 1 }]) : []),
  [{ text: '    ' }, { text: 'return speed;', mark: 5 }],
  [{ text: '}', mark: 5 }],
]))
const visible = (n: number) => print || props.step >= n
</script>

<template>
  <div class="two-col cj2-definition" :data-definition="mode" :data-step="step">
    <div>
      <pre class="cj2-compact"><code><span v-for="(line,i) in lines" v-show="!line[0].insert || visible(line[0].insert)" :key="i" class="cj2-def-line"><span v-for="(part,j) in line" :key="j" :class="{
        'cj2-syntax-mark': mode==='syntax' && part.mark && visible(part.mark),
        'cj2-inserted': part.insert && visible(part.insert) && !print,
      }" :data-mark="part.mark" :data-insert="part.insert"><CodeTokens :tokens="part.tokens" /></span></span></code></pre>
      <p v-if="mode==='syntax'" class="spaced">先搭好函数的骨架：这一版只把 <code>speed</code> 原样交回去。</p>
      <p v-else class="spaced">函数头不变。把两条限幅判断放在原来的 <code>return speed;</code> 前面。</p>
    </div>
    <div v-if="mode==='syntax'" class="cj2-syntax-notes">
      <div v-for="(part,i) in parts" :key="part.label" class="cj2-syntax-note"
        :class="{'cj2-unshown':!visible(i+1)}">
        <strong>{{ part.label }}</strong><span>{{ part.detail }}</span>
      </div>
    </div>
    <div v-else>
      <p :class="{'cj2-unshown':!visible(1)}">超过正上限，就交回 <code>limit</code>。</p>
      <p :class="{'cj2-unshown':!visible(2)}">低于负上限，就交回 <code>-limit</code>。</p>
      <p :class="{'cj2-unshown':!visible(2)}">两次判断都没拦住，就原样交回 <code>speed</code>。</p>
      <p class="question" :class="{'cj2-unshown':!visible(3)}"><code>clamp_speed(-9600, 8000)</code> 会在哪一行返回？</p>
      <p class="answer" :class="{'cj2-unshown':!visible(4)}">第二个 <code>if</code> 成立，返回 <code>-8000</code>。</p>
    </div>
  </div>
</template>
