<script setup lang="ts">
import { computed } from 'vue'
import FillCode from './FillCode.vue'

const props = defineProps<{ step: number }>()
const print = new URLSearchParams(location.search).has('print')
const blanks = [
  { token: '[①]', answer: 's->academic', hint: '① s 是地址，怎样取出学业分？' },
  { token: '[②]', answer: 's->activity', hint: '② 沿同一个地址，怎样取出素拓分？' },
  { token: '[③]', answer: '&student', hint: '③ 函数要地址，student 怎样取地址？' },
]
const snippets = [
  `struct Student {
    int id, academic, activity;
    int weighted10;  // 综合分 × 10
};

int total_score(const struct Student *s) {
    return [①] + [②];
}

int is_excellent(const struct Student *s) {
    return total_score(s) > 140 &&
           s->weighted10 >= 800;
}`,
  `// main 里，读入 student 后：
student.weighted10 =
    7 * student.academic
    + 3 * student.activity;
if (is_excellent([③]))
    printf("Excellent\\n");
else
    printf("Not excellent\\n");`,
]
const filled = computed(() => print ? 0 : Math.floor(props.step / 2))
const shown = computed(() => print ? blanks.length : Math.ceil(props.step / 2))
</script>

<template>
  <div class="two-col wide-left cj2-student-fill" :data-step="step">
    <div class="cj2-compact">
      <FillCode :code="snippets[0]" :blanks="blanks" :filled="filled" />
      <div v-if="!print" class="fill-sequence">每空先点出提示，再点一下填入答案。</div>
    </div>
    <div class="cj2-compact">
      <div class="label">动手 · 5 分钟</div>
      <FillCode :code="snippets[1]" :blanks="blanks" :filled="filled" />
      <p><code>const</code>：只读分数，不通过 <code>s</code> 改记录。</p>
      <div class="fill-hints">
        <div v-for="(blank,i) in blanks" :key="blank.token" class="fill-hint"
          :class="{'cj2-unshown':shown<=i}" :data-hint="i+1">{{ blank.hint }}</div>
      </div>
    </div>
  </div>
</template>
