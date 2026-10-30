<script setup lang="ts">
import problems from '../data/problems.json'
const props=defineProps<{pid:string}>()
const d=problems[props.pid as keyof typeof problems]
</script>
<template>
  <div class="problem-card">
    <div class="eyebrow">完整题面 · <a v-if="d.url" :href="d.url">洛谷 {{pid}} ↗</a><span v-else>课堂小题</span></div>
    <h1>{{d.url?pid+' · ':''}}{{d.title}}</h1>
    <div class="problem-columns">
      <div class="problem-description">
        <p class="problem-task">{{d.task}}</p>
        <section><h2>输入</h2><p>{{d.input}}</p></section>
        <section><h2>输出</h2><p>{{d.output}}</p></section>
        <section class="problem-bounds"><h2>数据范围</h2><p>{{d.bounds}}</p></section>
      </div>
      <div class="problem-samples">
        <section v-for="(sample,i) in d.samples" :key="i">
          <div class="label">官方样例{{d.samples.length>1?' '+(i+1):''}} · 输入</div>
          <pre>{{sample[0]}}</pre>
          <div class="label sample-output-label">输出</div>
          <pre>{{sample[1]}}</pre>
        </section>
      </div>
    </div>
  </div>
</template>
