<script setup lang="ts">
import { computed } from 'vue'
import FillCode from './FillCode.vue'

const props = defineProps<{ step: number }>()
const print = new URLSearchParams(location.search).has('print')
const code = `void swap(int *a, int *b) {
    int tmp = [①];
    [②] = *b;
    *b = [③];
}

// main 里：left = 8000, right = -8000
swap(&left, &right);`
const blanks = [
  { token: '[①]', answer: '*a', hint: '① 左边的旧值马上要被盖掉。怎么沿着 a 读出它？' },
  { token: '[②]', answer: '*a', hint: '② 右边的值已读出来了。赋值左边写什么，才会改到原来的左轮？' },
  { token: '[③]', answer: 'tmp', hint: '③ 左轮原先的 8000 存在哪？把它填进右轮。' },
]
const filled = computed(() => print ? 0 : Math.floor(props.step / 2))
const shown = computed(() => print ? blanks.length : Math.ceil(props.step / 2))
</script>

<template>
  <div class="two-col cj2-swap-fill" :data-step="step">
    <div>
      <FillCode :code="code" :blanks="blanks" :filled="filled" />
      <div v-if="!print" class="fill-sequence">每空先点出提示，再点一下填入答案。</div>
    </div>
    <div class="fill-side">
      <div class="eyebrow">动手 · 5 分钟</div>
      <p>画两个速度格。直接把右边盖到左边，哪个值会丢？</p>
      <div class="fill-hints">
        <div v-for="(blank,i) in blanks" :key="blank.token" class="fill-hint"
          :class="{'cj2-unshown':shown<=i}">{{ blank.hint }}</div>
      </div>
    </div>
  </div>
</template>
