<script setup lang="ts">
import { computed } from 'vue'
import FillCode from './FillCode.vue'

const props = defineProps<{ problem: 'B2111' | 'B2112' | 'P5733' | 'P1980'; step: number }>()
const print = new URLSearchParams(location.search).has('print')

const problems = {
  B2111: {
    input: `double threshold;
char a[501], b[501];
scanf([①], [②]);`,
    code: `int same = 0;
int len = strlen(a);
for (int i = 0; i < len; i++) {
    if ([③]) same++;
}
double ratio = [④];
if (ratio [⑤] threshold)
    printf("yes\\n");
else
    printf("no\\n");`,
    blanks: [
      { token: '[①]', answer: '"%lf %500s %500s"', hint: '一个 double，两个最多 500 字符的单词。' },
      { token: '[②]', answer: '&threshold, a, b', hint: '阈值和字符数组，哪些实参需要 &？' },
      { token: '[③]', answer: 'a[i] == b[i]', hint: '同一位置各取一个字符，怎么比较？' },
      { token: '[④]', answer: '1.0 * same / len', hint: '3 除以 4 要得到 0.75，不能先做整数除法。' },
      { token: '[⑤]', answer: '>=', hint: '刚好达到阈值，算不算相关？' },
    ],
  },
  B2112: {
    input: `char a[9], b[9];
scanf([①], [②]);`,
    code: `if (strcmp(a, b) [③])
    printf("Tie\\n");
else if ((strcmp(a, "Rock") == 0 &&
          strcmp(b, "Scissors") == 0) ||
         ([④] &&
          strcmp(b, "Paper") == 0) ||
         (strcmp(a, "Paper") == 0 &&
          [⑤]))
    printf("Player1\\n");
else
    printf("Player2\\n");`,
    blanks: [
      { token: '[①]', answer: '"%8s %8s"', hint: '最长手势有 8 个字母，输入宽度写多少？' },
      { token: '[②]', answer: 'a, b', hint: '这两处要交出首字符的地址。' },
      { token: '[③]', answer: '== 0', hint: 'strcmp 返回什么值，才表示两个单词一样？' },
      { token: '[④]', answer: 'strcmp(a, "Scissors") == 0', hint: '第二位出了布，第一位出什么才赢？' },
      { token: '[⑤]', answer: 'strcmp(b, "Rock") == 0', hint: '第一位出布，第二位出什么时第一位会赢？' },
    ],
  },
  P5733: {
    input: `char s[101];
scanf([①], [②]);`,
    code: `for (int i = 0; s[i] != '\\0'; i++) {
    if (s[i] >= 'a' && s[i] <= 'z')
        s[i] = s[i] - ('a' - 'A');
}
printf("%s\\n", s);`,
    blanks: [
      { token: '[①]', answer: '"%100s"', hint: '输入最多 100 个字符，数组多留一格。' },
      { token: '[②]', answer: 's', hint: '要交出的是首字符地址，不是整个数组的地址。' },
    ],
  },
  P1980: {
    input: `int n, x;
scanf([①], [②]);`,
    code: `int count = 0;
for (int i = 1; i <= n; i++) {
    int num = i;
    while ([③]) {
        if ([④] == x) count++;
        [⑤];
    }
}
printf("%d\\n", count);`,
    blanks: [
      { token: '[①]', answer: '"%d %d"', hint: 'n 和 x 都是 int。' },
      { token: '[②]', answer: '&n, &x', hint: '分别把两个整数变量的地址交出去。' },
      { token: '[③]', answer: 'num > 0', hint: '数已经拆完时，不要再数出一个不存在的 0。' },
      { token: '[④]', answer: 'num % 10', hint: '10 的个位是 0，哪个运算能取出它？' },
      { token: '[⑤]', answer: 'num = num / 10', hint: '比完个位，怎么删掉它再看下一位？' },
    ],
  },
}
const exercise = computed(() => problems[props.problem])
const filled = computed(() => print ? 0 : Math.floor(props.step / 2))
const shown = computed(() => print ? exercise.value.blanks.length : Math.ceil(props.step / 2))
</script>

<template>
  <div class="two-col cj2-review" :data-review="problem" :data-step="step">
    <div>
      <div class="cj2-review-input">
        <div class="label">输入 · 先填 ①②</div>
        <FillCode :code="exercise.input" :blanks="exercise.blanks" :filled="filled" />
      </div>
      <FillCode :code="exercise.code" :blanks="exercise.blanks" :filled="filled" />
      <div v-if="!print && (!$slots.trace || step <= exercise.blanks.length * 2)" class="fill-sequence">{{ $slots.trace && filled === exercise.blanks.length ? '下一步：跟着循环拆位。' : '每空先点出提示，再点一下填入答案。' }}</div>
      <div v-if="print && $slots.trace" class="cj2-review-trace-print">
        <slot />
        <div class="fill-hint"><span v-for="blank in exercise.blanks.slice(0, 2)" :key="blank.token">{{ blank.token.slice(1, -1) }} {{ blank.hint }} </span></div>
      </div>
    </div>
    <div v-if="!$slots.trace || (!print && step <= exercise.blanks.length * 2)" class="cj2-review-side">
      <slot />
      <div class="fill-hints">
        <div v-for="(blank,i) in exercise.blanks" :key="blank.token" class="fill-hint"
          :class="{'cj2-unshown':shown<=i}">{{ blank.token.slice(1, -1) }} {{ blank.hint }}</div>
      </div>
    </div>
    <slot v-else name="trace" />
  </div>
</template>
