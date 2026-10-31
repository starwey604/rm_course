<script setup>
import {computed} from 'vue'
import CodeTokens from '../../shared/components/CodeTokens.vue'
import {highlightC} from '../../shared/utils/highlight'
import {scenes} from '../data/traces'
const props=defineProps({scene:{type:String,required:true},step:{type:Number,default:0}})
const scene=computed(()=>scenes[props.scene])
const n=computed(()=>location.search.includes('print=true')?scene.value.states.length-1:Math.min(props.step,scene.value.states.length-1))
const s=computed(()=>scene.value.states[n.value])
const highlighted=computed(()=>highlightC(scene.value.code.join('\n')))
</script>
<template>
<div class="trace-grid">
<div><div class="label">{{scene.caption||'main 函数中的代码片段'}}</div><div class="trace-code"><span v-for="(line,i) in scene.code" :key="i" class="trace-line" :class="{active:(s.lines||[]).includes(i+1)}"><CodeTokens :tokens="highlighted[i]" /></span></div><div class="trace-desc">{{s.note}}</div></div>
<div><div class="trace-vars"><div v-for="(v,i) in s.values" :key="i" class="trace-var"><div class="label">{{scene.labels[i]}}</div><div class="trace-val">{{v}}</div></div></div>
<table v-if="scene.rows"><thead><tr><th v-for="c in scene.cols" :key="c">{{c}}</th></tr></thead><tbody><tr v-for="(r,i) in scene.rows" :key="i" :class="{latest:n===r.at}"><td v-for="(cell,j) in r.cells" :key="j"><span class="reveal" :class="{shown:n>=r.at}">{{cell}}</span></td></tr></tbody></table>
<div v-if="s.result" class="trace-result mono">{{s.result}}</div><div v-if="scene.summary" class="trace-summary">{{scene.summary}}</div></div>
</div>
</template>
