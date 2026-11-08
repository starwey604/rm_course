<script setup lang="ts">
import { computed } from 'vue'
import CodeTokens from '../../shared/components/CodeTokens.vue'
import { highlightC } from '../../shared/utils/highlight'

const props = defineProps<{ step: number }>()
const print = new URLSearchParams(location.search).has('print')

const lines = highlightC(`void stop_motor(int speed) {
    speed = 0;
}

int main(void) {
    int speed = 9600;
    stop_motor(speed);
    return 0;
}`)
const groups = [
  { frame: 'motor', lines: lines.slice(0, 3) },
  { frame: 'main', lines: lines.slice(4) },
]
const inside = computed(() => print || props.step === 1)
const notes = [
  '调用前：栈顶是 main。它自己的 speed 是 9600。',
  '调用时：新栈帧压到栈顶。stop_motor 的参数收到 9600 的副本。',
  '返回时：后压入的 stop_motor 先弹出，再回到 main 接着执行。',
]
</script>

<template>
  <div class="two-col cj2-stack-demo" :data-step="step">
    <pre class="cj2-compact"><code><span v-for="group in groups" :key="group.frame" class="cj2-stack-code" :data-frame="group.frame"><span v-for="(line,i) in group.lines" :key="i" class="cj2-def-line"><CodeTokens :tokens="line" /></span></span></code></pre>
    <div>
      <div class="label">调用栈 · 栈顶在上</div>
      <div class="cj2-stack-frames">
        <div v-if="inside" class="cj2-stack-frame" data-frame="motor">
          <div><code>stop_motor</code><span>栈顶</span></div>
          <code>参数 speed = 9600</code>
        </div>
        <div class="cj2-stack-frame" data-frame="main">
          <div><code>main</code><span>{{ inside ? '等待返回' : '栈顶' }}</span></div>
          <code>局部变量 speed = 9600</code>
        </div>
      </div>
      <p v-if="print" class="cj2-stack-note">调用时把新栈帧压到栈顶；返回时先弹出它，再回到 <code>main</code>。</p>
      <p v-else class="cj2-stack-note" aria-live="polite">{{ notes[Math.min(step, 2)] }}</p>
    </div>
  </div>
</template>
