<script setup lang="ts">
const props=defineProps<{kind:'char'|'int'|'padding'|'endian'|'bits'}>()
const bytes=props.kind==='char'?['41']:props.kind==='int'?['01001000','00000000','00000000','00000000']:['78','56','34','12']
const padding=[false,true,true,true,false,false,false,false,false,true,true,true]
</script>
<template>
 <div v-if="kind==='padding'" class="l1-padding" aria-label="结构体布局：flag 位于偏移 0，value 位于 4 到 7，mode 位于 8，其余是填充">
  <div class="l1-padding-cells"><div v-for="(pad,i) in padding" :key="i" :class="{pad}"><small>{{i}}</small><span>{{pad?'填充':i===0?'flag':i===8?'mode':'value'}}</span></div></div>
  <div class="l1-padding-labels"><span>flag</span><span>填充</span><span>value（4 字节）</span><span>mode</span><span>填充</span></div>
 </div>
 <div v-else-if="kind==='bits'" class="l1-bit-strip" aria-label="8 个 bit 组成 1 字节"><span v-for="(b,i) in ['0','1','0','0','1','0','0','0']" :key="i">{{b}}</span></div>
 <div v-else class="l1-byte-strip" :class="{single:kind==='char'}"><div v-for="(value,i) in bytes" :key="i"><small>0x{{(0x1000+i).toString(16)}}{{kind==='int'&&i===0?'（起始）':''}}</small><span>{{value}}</span></div></div>
</template>
