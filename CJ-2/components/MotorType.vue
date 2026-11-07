<script setup lang="ts">
import CodeTokens from '../../shared/components/CodeTokens.vue'

const props = defineProps<{ step: number }>()
const print = new URLSearchParams(location.search).has('print')
const visible = (n: number) => print || props.step >= n
const fields = ['speed', 'current', 'angle', 'temp', 'state']
const motors = [
  { name: 'm', wheel: '第三轮', step: 1 },
  { name: 'other', wheel: '第四轮', step: 2 },
]
</script>

<template>
  <div class="cj2-motor-type" :data-step="step">
    <div class="cj2-motor-commands">
      <div v-for="motor in motors" :key="motor.name" :class="{'cj2-unshown':!visible(motor.step)}">
        <code><CodeTokens :code="'struct Motor '+motor.name+' = {0};'" /></code>
      </div>
      <div :class="{'cj2-unshown':!visible(3)}"><code><CodeTokens code="m.speed = 9600;" /></code></div>
    </div>

    <div class="cj2-motor-board">
      <section class="cj2-motor-schema">
        <div class="label">类型 · 只规定有哪些格</div>
        <h2><code>struct Motor</code></h2>
        <dl>
          <div v-for="field in fields" :key="field"><dt>{{ field }}</dt><dd>{{ field==='angle' ? 'float' : 'int' }}</dd></div>
        </dl>
      </section>
      <div class="cj2-motor-arrow" :class="{'cj2-unshown':!visible(1)}" aria-hidden="true">→<small>按类型建变量</small></div>
      <section v-for="motor in motors" :key="motor.name" class="cj2-motor-record" :data-motor="motor.name"
        :class="{'cj2-unshown':!visible(motor.step), 'cj2-motor-enter':!print && step===motor.step}">
        <div class="label">变量 · {{ motor.wheel }}的数据</div>
        <h2><code>{{ motor.name }}</code></h2>
        <dl>
          <div v-for="field in fields" :key="field" :class="{'cj2-motor-changed':field==='speed' && motor.name==='m' && visible(3)}">
            <dt>{{ field }}</dt><dd :data-field="field">{{ field==='speed' && motor.name==='m' && visible(3) ? 9600 : 0 }}</dd>
          </div>
        </dl>
      </section>
    </div>

    <p v-if="print || step===3" class="cj2-motor-caption">两份数据都从 <code>{0}</code> 开始。点号选中 <code>m</code> 的 <code>speed</code>，只改这一格；<code>other.speed</code> 仍是 0。</p>
    <p v-else-if="step===2" class="cj2-motor-caption">现在有两份独立的数据。猜一猜：如果只给 <code>m.speed</code> 赋值，<code>other.speed</code> 会变吗？</p>
    <p v-else-if="step===1" class="cj2-motor-caption"><code>m</code> 是新建的变量，有自己的一组格子。<code>{0}</code> 让各格从 0 开始。</p>
    <p v-else class="cj2-motor-caption"><code>struct Motor</code> 规定格子的名字和类型。现在还没有哪一台电机的数据。</p>
  </div>
</template>
