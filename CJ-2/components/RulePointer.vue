<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ step: number }>()
const print = new URLSearchParams(location.search).has('print')
const active = computed(() => props.step >= 2 ? 'ICM42688' : 'BMI088')
const drivers = [
  { chip: 'BMI088', name: 'bmi088_read_gyro' },
  { chip: 'ICM42688', name: 'icm42688_read_gyro' },
]
</script>

<template>
  <div class="cj2-gyro-switch" :class="{'cj2-unshown': !print && step === 0}" :data-step="step">
    <div class="cj2-card cj2-gyro-code">
      <div class="label">绑定时选实现 · 两个函数签名一样</div>
      <code>int <span class="cj2-syntax-mark">(*read_gyro)</span>(float *out);</code>
      <p class="cj2-gyro-reading">先看 <code>(*read_gyro)</code>：它是指针，指向一个接收 <code>float *</code>、返回 <code>int</code> 的函数。</p>
      <div v-if="print" class="cj2-case-lines">
        <div v-for="driver in drivers" :key="driver.chip"><small>{{ driver.chip }}</small> <code>read_gyro = {{ driver.name }};</code></div>
      </div>
      <div v-else class="cj2-case-lines" aria-live="polite">
        <code>read_gyro = {{ drivers[step >= 2 ? 1 : 0].name }};</code>
      </div>
    </div>
    <div class="cj2-branches">
      <div class="cj2-card">
        <div class="label">控制代码 · 调用不变</div>
        <code>read_gyro(&amp;gyro);</code>
      </div>
      <div class="cj2-card cj2-fp-calculate">
        <div class="label">{{ print ? '不同绑定执行不同实现' : '这次实际运行' }}</div>
        <code v-if="print">BMI088 或 ICM42688</code>
        <code v-else aria-live="polite">{{ active }}</code>
      </div>
    </div>
  </div>
  <p :class="{'cj2-unshown': !print && step < 2}" class="cj2-takeaway">把另一个函数名赋给 <code>read_gyro</code>，调用那一行不用改。</p>
</template>
