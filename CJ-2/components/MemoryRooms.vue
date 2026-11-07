<script setup lang="ts">
import { computed } from 'vue'
import CodeTokens from '../../shared/components/CodeTokens.vue'
import { highlightC } from '../../shared/utils/highlight'

type Stage = { line: number; main: string; local: string; note: string; arrow?: 'copy' | 'link' | 'write'; changed?: 'main' | 'local' }
const props = defineProps<{ mode: 'value' | 'pointer' | 'struct'; step: number }>()
const print = new URLSearchParams(location.search).has('print')
const demos = {
  value: {
    fn: 'stop_motor', target: 'speed', param: 'int speed',
    code: 'void stop_motor(int speed) {\n    speed = 0;\n}\n\n// main 里\nint speed = 9600;\nstop_motor(speed);',
    stages: [
      { line: 6, main: '9600', local: '—', note: '调用前，只有 main 保存着 9600。' },
      { line: 7, main: '9600', local: '9600', arrow: 'copy', note: '调用时，把 9600 复制到参数 speed。两个格子恰好同名。' },
      { line: 2, main: '9600', local: '0', changed: 'local', note: '赋值只改了参数 speed。main 的速度格没动。' },
      { line: 3, main: '9600', local: '—', note: '参数名只在自己的函数里有效。返回后，main 里仍是 9600。' },
    ],
  },
  pointer: {
    fn: 'stop_motor', target: 'speed', param: 'int *p',
    code: 'void stop_motor(int *p) {\n    *p = 0;\n}\n\n// main 里\nint speed = 9600;\nstop_motor(&speed);',
    stages: [
      { line: 6, main: '9600', local: '—', note: '假设 main 的 speed 格位于 0x1000。' },
      { line: 7, main: '9600', local: '0x1000', arrow: 'link', note: '调用时，p 收到 &speed 的值：0x1000。' },
      { line: 2, main: '0', local: '0x1000', arrow: 'write', changed: 'main', note: '*p 沿地址找到 main 的 speed；赋值改的是原件。' },
      { line: 3, main: '0', local: '—', note: 'p 随调用结束而消失；main 的 speed 仍然是 0。' },
    ],
  },
  struct: {
    fn: 'control_motor', target: 'm.speed', param: 'struct Motor *p',
    code: 'void control_motor(struct Motor *p) {\n    p->speed = 0;\n}\n\n// main 里\nstruct Motor m = {9600};\ncontrol_motor(&m);',
    stages: [
      { line: 6, main: '9600', local: '—', note: 'main 中有一整台 Motor；图中只展开这次要改的 speed。' },
      { line: 7, main: '9600', local: '0x1000', arrow: 'link', note: 'p 收到整个 m 的地址，还没有读写任何成员。' },
      { line: 2, main: '0', local: '0x1000', arrow: 'write', changed: 'main', note: 'p->speed 找到 m，再选 speed；其他成员保持原值。' },
      { line: 3, main: '0', local: '—', note: '函数返回后，m.speed 仍然是 0。' },
    ],
  },
} satisfies Record<string, { fn: string; target: string; param: string; code: string; stages: Stage[] }>
const demo = computed(() => demos[props.mode])
const index = computed(() => Math.min(props.step, demo.value.stages.length - 1))
const state = computed<Stage>(() => demo.value.stages[index.value])
const lines = computed(() => highlightC(demo.value.code))
</script>

<template>
  <div class="cj2-demo" :data-demo="mode" :data-step="index">
    <pre class="cj2-compact"><code><span v-for="(line,i) in lines" :key="i" class="trace-line" :class="{active:!print && i+1===state.line}"><CodeTokens :tokens="line" /></span></code></pre>
    <table v-if="print" class="cj2-print-table">
      <thead><tr><th>{{ demo.target }}</th><th>{{ demo.param }}</th><th>发生了什么</th></tr></thead>
      <tbody><tr v-for="s in demo.stages" :key="s.line"><td>{{ s.main }}</td><td>{{ s.local }}</td><td>{{ s.note }}</td></tr></tbody>
    </table>
    <div v-else>
      <div class="cj2-rooms">
        <section class="cj2-room">
          <h2>main</h2>
          <div class="cj2-room-label"><code>{{ demo.target }}</code></div>
          <div class="memory-cell" :class="{changed:state.changed==='main'}" data-room="main">{{ state.main }}</div>
          <small v-if="mode==='pointer'">speed 的示意地址：0x1000</small>
          <small v-if="mode==='struct'">m 的示意地址：0x1000</small>
          <div v-if="mode==='struct'" class="cj2-members"><code>current · angle · temp · state</code><br>四个成员未改动</div>
        </section>
        <div class="cj2-arrow" :class="{write:state.arrow==='write'}" aria-hidden="true">
          <template v-if="state.arrow==='copy'">→<small>复制</small></template>
          <template v-if="state.arrow==='link'">←<small>指向</small></template>
          <template v-if="state.arrow==='write'">←<small>写入</small></template>
        </div>
        <section class="cj2-room" :class="{inactive:state.local==='—'}">
          <h2>{{ demo.fn }}</h2>
          <div class="cj2-room-label"><code>{{ demo.param }}</code></div>
          <div class="memory-cell" :class="{changed:state.changed==='local'}" data-room="param">{{ state.local }}</div>
          <small v-if="state.local==='—'">本次调用的参数不在使用中</small>
        </section>
      </div>
      <div class="cj2-step">步骤 {{ index+1 }} / {{ demo.stages.length }}</div>
      <p class="cj2-state" aria-live="polite">{{ state.note }}</p>
    </div>
  </div>
</template>
