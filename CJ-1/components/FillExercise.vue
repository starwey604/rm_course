<script setup lang="ts">
import {computed} from 'vue'
const props=defineProps<{kind:string,step:number}>()
const printMode=location.search.includes('print=true')
const exercises={
  classify:{
    code:`#include <stdio.h>
int main(void) {
    int n, k, sa = 0, sb = 0, ca = 0, cb = 0;
    scanf("%d %d", &n, &k);
    for (int i = [①]; [②]; i++) {
        if ([③]) {
            sa += i; ca++;
        } else {
            sb += i; cb++;
        }
    }
    printf("%.1f %.1f\\n",
           [④] * sa / ca, 1.0 * sb / cb);
    return 0;
}`,
    hints:['①② 从 1 到 n，两端都要处理。','③ 整除 k 时，余数是多少？','④ 除法前，怎样先变成浮点数？','用 6 2 测试：应得到 4.0 3.0。'],
    caption:'sa / ca：A 类的和 / 个数\nsb / cb：B 类的和 / 个数',
    time:'05:00'
  },
  reverse:{
    code:`#include <stdio.h>
int main(void) {
    int a[100], n = 0, x;
    while (1) {
        scanf("%d", &x);
        if ([①]) break;
        a[[②]] = x;
        n++;
    }
    for (int i = [③]; i >= 0; [④]) {
        printf("%d ", a[i]);
    }
    printf("\\n");
    return 0;
}`,
    hints:['① 0 是结束标记，不存进数组。','② n 既是有效个数，也是下一个空位。','③ 存了 3 个数，最后一个下标是几？','④ 这次要向左走，直到下标 0。'],
    caption:'输入 3 1 4 0\n输出 4 1 3',
    time:'06:00'
  },
  uppercase:{
    code:`#include <stdio.h>
int main(void) {
    char s[101];
    scanf("%100s", s);
    for (int i = 0; [①]; i++) {
        if ([②]) {
            s[i] = s[i] - ([③]);
        }
    }
    printf("%s\\n", s);
    return 0;
}`,
    hints:["① 遇到 '\\0'，就该停止。","② 字符要同时不小于 'a'、不大于 'z'。","③ 用 'a' 和 'A' 算出大小写的距离。"],
    caption:'自测 abc、ABC、a1Z\n数字和大写字母都应保留。',
    time:'05:00'
  }
}
const d=computed(()=>exercises[props.kind as keyof typeof exercises])
const shown=computed(()=>printMode?d.value.hints.length:props.step)
const lines=computed(()=>d.value.code.split('\n').map(line=>line.split(/(\[[①②③④]\])/g)))
</script>
<template>
  <div class="fill-grid">
    <pre class="fill-code"><code><span v-for="(parts,i) in lines" :key="i" class="fill-line"><span v-for="(part,j) in parts" :key="j" :class="{'fill-blank':/^\[[①②③④]\]$/.test(part)}">{{part}}</span></span></code></pre>
    <div class="fill-side">
      <div class="label">只填编号处，其余代码已备好</div>
      <div class="fill-caption">{{d.caption}}</div>
      <div class="fill-hints">
        <div v-for="(hint,i) in d.hints" :key="i" class="fill-hint reveal" :class="{shown:shown>i}">{{hint}}</div>
      </div>
      <div class="fill-time">{{d.time}}</div>
    </div>
  </div>
</template>
