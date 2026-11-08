<script setup lang="ts">
defineProps<{ mode: 'recall' | 'closing'; step: number }>()
const print = new URLSearchParams(location.search).has('print')
const recall = [
  {
    question: '函数解决什么问题？',
    answer: '把一段动作封装成可重复调用的步骤。',
    detail: '同一套限幅逻辑写一份。纯函数只按输入计算结果，不改外部状态。',
  },
  {
    question: '指针为什么能帮上忙？',
    answer: '保存地址，让代码找到数据或函数。',
    detail: '传数据地址，可以访问原件。传函数地址，可以替换调用的实现。',
  },
  {
    question: '结构体怎样组织设备数据？',
    answer: '把属于同一个设备的数据放在一起。',
    detail: '每台电机各存一份速度、温度和控制历史。再配合函数与指针，把数据和动作联系起来。',
  },
]
const closing = [
  { name: '结构体', action: '存状态', detail: '每台电机，各有自己的目标值和控制历史。' },
  { name: '函数', action: '写动作', detail: '限幅、滤波、PID，各自完成明确的一步。' },
  { name: '指针', action: '连起来', detail: '找到要访问的数据，也能选定要调用的函数。' },
]
</script>

<template>
  <div v-if="mode==='recall'" class="cj2-summary-recall" :data-step="step">
    <p class="cj2-summary-instruction">先想 3 秒，再用自己的话回答。</p>
    <section v-for="(item,i) in recall" :key="item.question" class="cj2-summary-row">
      <div class="cj2-summary-question"><span>0{{ i+1 }}</span>{{ item.question }}</div>
      <div class="cj2-summary-answer" :class="{'revealed':print || step>i}" :data-summary-answer="i+1">
        <h2>{{ item.answer }}</h2>
        <p>{{ item.detail }}</p>
      </div>
    </section>
  </div>
  <div v-else class="cj2-summary-closing" :data-step="step">
    <div class="cj2-closing-steps">
      <section v-for="(item,i) in closing" :key="item.name" class="cj2-closing-line"
        :class="{'lit':print || step>i}" :data-closing-line="i+1">
        <h2><span>{{ item.name }}</span>{{ item.action }}</h2>
        <p>{{ item.detail }}</p>
      </section>
    </div>
    <p class="cj2-closing-quote">把数据放在哪、由谁处理、怎样连接想清楚，<br>程序就开始有了结构。</p>
    <p class="cj2-closing-next">今天的基础，会继续出现在你们的驱动、控制任务和工程代码里。</p>
  </div>
</template>
