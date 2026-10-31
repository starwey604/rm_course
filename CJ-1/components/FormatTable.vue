<script setup>
import {computed} from 'vue'
const props=defineProps({step:{type:Number,default:0}})
const n=computed(()=>location.search.includes('print=true')?5:props.step)
const rows=[['int','%d','%d'],['float','%f','%f'],['double','%lf','%f'],['char','%c','%c']]
</script>
<template>
<table class="format-table"><thead><tr><th>变量类型</th><th>scanf 输入</th><th>printf 输出</th></tr></thead><tbody>
<tr v-for="(r,i) in rows" :key="r[0]"><td class="mono">{{r[0]}}</td><td><span class="reveal" :class="{shown:n>i}">{{r[1]}}</span></td><td><span class="reveal" :class="{shown:n>i}">{{r[2]}}</span></td></tr>
</tbody></table>
<div class="question reveal" :class="{shown:n>=5}">输入要给出写入位置：<strong class="key-point">&amp;变量</strong>。<br>读取 double 用 <strong class="key-point">%lf</strong>，输出用 <strong>%f</strong>。</div>
</template>
