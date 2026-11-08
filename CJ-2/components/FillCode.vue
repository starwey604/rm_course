<script setup lang="ts">
import { computed } from 'vue'
import CodeTokens from '../../shared/components/CodeTokens.vue'
import { highlightParts } from '../../shared/utils/highlight'

const props = defineProps<{
  code: string
  blanks: { token: string; answer: string }[]
  filled: number
}>()

const lines = computed(() => highlightParts(
  props.code.split('\n').map(line => line.split(/(\[[①②③④⑤]\])/).map(text => {
    const i = props.blanks.findIndex(blank => blank.token === text)
    return { text: i >= 0 && i < props.filled ? props.blanks[i].answer : text, blank: i + 1 }
  })),
))
</script>

<template>
  <pre class="fill-code"><code><span v-for="(line,i) in lines" :key="i" class="fill-line"><span v-for="(part,j) in line" :key="j" :data-blank="part.blank || undefined" :data-filled="part.blank ? String(filled >= part.blank) : undefined" :class="{'fill-blank':part.blank>filled,'fill-answer':part.blank && part.blank<=filled}"><CodeTokens :tokens="part.tokens" /></span></span></code></pre>
</template>
