<script setup>
import {computed} from 'vue'
const props=defineProps({step:{type:Number,default:0}})
const n=computed(()=>location.search.includes('print=true')?7:Math.min(props.step,7))
const tokens=['0','-','670','-','82162','-','4']
const instructions=['%d','-','%d','-','%d','-','%c']
const notes=['先观察：哪些字符需要存进变量？','%d 读到整数 0，写入 group。','字面字符 - 匹配并消费连字符，不存入变量。','%d 读到 670，写入 publisher。','再次匹配连字符，继续向右读取。','%d 读到 82162，写入 book。','匹配最后一个连字符。','%c 读到字符 4，写入 check；成功赋值 4 项。']
const names=['group','publisher','book','check']
const vals=['0','670','82162',"'4'"]
const at=[1,3,5,7]
</script>
<template>
<div class="read-code">scanf("%d-%d-%d-%c", &amp;group, &amp;publisher, &amp;book, &amp;check);</div>
<div class="isbn-track"><div v-for="(t,i) in tokens" :key="i" class="isbn-token" :class="{sep:t==='-',active:n===i+1,done:n>i+1}">{{t}}<div class="isbn-format">{{instructions[i]}}</div></div></div>
<div class="trace-vars"><div v-for="(name,i) in names" :key="name" class="trace-var"><div class="label">{{name}}</div><div class="trace-val">{{n>=at[i]?vals[i]:'—'}}</div></div></div>
<div class="trace-desc">{{notes[n]}}</div>
</template>
