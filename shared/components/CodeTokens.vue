<script setup lang="ts">
import { computed } from 'vue'
import { highlightC, type CodeToken } from '../utils/highlight'

const props = defineProps<{ code?: string, tokens?: CodeToken[] }>()
const tokens = computed(() => props.tokens ?? highlightC(props.code ?? '').flatMap((line, i) => [
  ...(i ? [{ content: '\n', color: undefined }] : []),
  ...line,
]))
</script>
<template><span class="syntax-code"><span v-for="(token,i) in tokens" :key="i" class="syntax-token" :style="{color:token.color}">{{token.content}}</span></span></template>
