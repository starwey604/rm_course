<script setup lang="ts">
import FillCode from './FillCode.vue'

const props = defineProps<{ topic: 'function' | 'struct'; step: number }>()
const print = new URLSearchParams(location.search).has('print')
const questions = {
  function: [
    { prompt: '① 把两倍的结果交回调用处', code: 'int twice(int x) { [①] x * 2; }', token: '[①]', answer: 'return', reason: 'return 把表达式的结果交给调用处。' },
    { prompt: '② 已有 int speed；接住限幅后的结果', code: '[②] = clamp_speed(9600, 8000);', token: '[②]', answer: 'speed', reason: '返回 8000，再赋给 speed。只调用不会自动写回变量。' },
    { prompt: '③ 让指针保存 speed 的地址', code: 'int speed = 9600;\nint *p = [③];', token: '[③]', answer: '&speed', reason: '&speed 取地址，p 保存这份地址值。' },
    { prompt: '④ 接上题：沿 p 把 speed 清零', code: '[④] = 0;', token: '[④]', answer: '*p', reason: '*p 找到 speed 原格；p 里存的地址保持不变。' },
  ],
  struct: [
    { prompt: '① speeds[4] 已读入四轮转速，传入数组起点', code: 'clamp_all([①], 4, 8000);', token: '[①]', answer: 'speeds', reason: '这里数组名给出首元素地址，4 单独告诉函数有几格。' },
    { prompt: '② 已有 struct Motor m，用点号写目标转速', code: 'm[②]speed = 9600;', token: '[②]', answer: '.', reason: 'm 是这份结构体变量，点号选出它的成员。' },
    { prompt: '③ 已有 struct Motor *p = &m，沿地址清零', code: 'p[③]speed = 0;', token: '[③]', answer: '->', reason: 'p 是结构体指针，箭头先找原件，再选 speed。' },
    { prompt: '④ 已有 struct Motor motors[4]，清零第三轮', code: 'control_motor([④]);', token: '[④]', answer: '&motors[2]', reason: '第三轮下标是 2；control_motor 要的是这一轮的地址。' },
  ],
}
</script>

<template>
  <div class="cj2-quick-fill" :data-topic="topic" :data-step="step">
    <div v-for="(item,i) in questions[props.topic]" :key="item.token" class="cj2-quick-row">
      <div>
        <div class="cj2-quick-prompt">{{ item.prompt }}</div>
        <FillCode :code="item.code" :blanks="[{token:item.token, answer:item.answer}]" :filled="print || step>i ? 1 : 0" />
      </div>
      <div class="cj2-quick-reason" :class="{'cj2-unshown':!print && step<=i}" :data-explanation="i+1">{{ item.reason }}</div>
    </div>
  </div>
</template>
