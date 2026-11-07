<script setup lang="ts">
import { computed } from 'vue'
import CodeTokens from '../../shared/components/CodeTokens.vue'
import { highlightParts } from '../../shared/utils/highlight'

const props = defineProps<{ step: number }>()
const print = new URLSearchParams(location.search).has('print')
const blanks = [
  { token: '[①]', answer: 'year % 400 == 0', hint: '① 2000 是闰年，1900 不是。整百年份要能被多少整除？' },
  { token: '[②]', answer: 'year % 4 == 0 && year % 100 != 0', hint: '② 能被 4 整除，还得排除哪一类年份？' },
  { token: '[③]', answer: 'is_leap(year)', hint: '③ 把当前年份交给哪个函数？什么时候把它存进数组？' },
]
const snippets = [
  'int is_leap(int year) {\n    if ([①]) return 1;\n    if ([②])\n        return 1;\n    return 0;\n}',
  'void collect(int x, int y) {\n    int years[1500], n = 0;\n    for (int year = x; year <= y; year++) {\n        if ([③]) {\n            years[n] = year;\n            n++;\n        }\n    }\n    print_years(years, n);  // 已给定\n}',
]
const filled = computed(() => print ? 0 : Math.floor(props.step / 2))
const shown = computed(() => print ? blanks.length : Math.ceil(props.step / 2))
const blocks = computed(() => snippets.map(code => highlightParts(
  code.split('\n').map(line => line.split(/(\[[①②③]\])/).map(text => {
    const i = blanks.findIndex(b => b.token === text)
    return { text: i >= 0 && i < filled.value ? blanks[i].answer : text, blank: i + 1 }
  })),
)))
</script>

<template>
  <div class="two-col cj2-leap-fill" :data-step="step">
    <div v-for="(block,b) in blocks" :key="b">
      <div class="label">{{ b === 0 ? '①–② · 判断闰年' : '③ · 在循环里调用' }}</div>
      <pre class="fill-code"><code><span v-for="(line,i) in block" :key="i" class="fill-line"><span v-for="(part,j) in line" :key="j" :data-blank="part.blank || undefined" :data-filled="part.blank ? String(filled >= part.blank) : undefined" :class="{'fill-blank':part.blank>filled,'fill-answer':part.blank && part.blank<=filled}"><CodeTokens :tokens="part.tokens" /></span></span></code></pre>
      <template v-if="b===0">
        <p class="spaced">动手 5 分钟。读入和输出已备好，只填编号处。</p>
        <div v-if="!print" class="fill-sequence">每空先点出提示，再点一下填入答案。</div>
      </template>
    </div>
    <div class="cj2-leap-hints">
      <div v-for="(blank,i) in blanks" :key="blank.token" class="fill-hint"
        :class="{'cj2-unshown':shown<=i}">{{ blank.hint }}</div>
    </div>
  </div>
</template>
