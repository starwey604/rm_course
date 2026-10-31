<script setup lang="ts">
import {computed} from 'vue'
import CodeTokens from '../../shared/components/CodeTokens.vue'
import {highlightParts} from '../../shared/utils/highlight'
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
           [④] * sa / ca, [④] * sb / cb);
    return 0;
}`,
    hints:['① 从 1 到 n，应该从哪个数开始？','② 两端都要处理，什么时候继续循环？','③ 整除 k 时，余数是多少？','④ 除法前，怎样先变成浮点数？'],
    answers:['1','i <= n','i % k == 0','1.0'],
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
    answers:['x == 0','n','n - 1','i--'],
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
    answers:["s[i] != '\\0'","s[i] >= 'a' && s[i] <= 'z'","'a' - 'A'"],
    caption:'自测 abc、ABC、a1Z\n数字和大写字母都应保留。',
    time:'05:00'
  }
}
const d=computed(()=>exercises[props.kind as keyof typeof exercises])
const progress=computed(()=>Math.max(0,Math.min(props.step,d.value.answers.length*2)))
const shown=computed(()=>printMode?d.value.hints.length:Math.ceil(progress.value/2))
// Keep the printable exercise blank; answers are revealed only during teaching.
const filled=computed(()=>printMode?0:Math.floor(progress.value/2))
const active=computed(()=>printMode?-1:Math.ceil(progress.value/2)-1)
const markers=['[①]','[②]','[③]','[④]']
const lines=computed(()=>highlightParts(d.value.code.split('\n').map(line=>line.split(/(\[[①②③④]\])/g).map(text=>{
  const blank=markers.indexOf(text)+1
  return {text:blank>0&&filled.value>=blank?d.value.answers[blank-1]:text,blank}
}))))
</script>
<template>
  <div class="fill-grid">
    <pre class="fill-code"><code><span v-for="(parts,i) in lines" :key="i" class="fill-line"><span v-for="(part,j) in parts" :key="j" :class="{'fill-blank':part.blank>0&&filled<part.blank,'fill-answer':part.blank>0&&filled>=part.blank}" :data-blank="part.blank||undefined" :data-filled="part.blank>0?String(filled>=part.blank):undefined"><CodeTokens :tokens="part.tokens" /></span></span></code></pre>
    <div class="fill-side">
      <div class="label">只填编号处，其余代码已备好</div>
      <div v-if="!printMode" class="fill-sequence">单击看提示，再单击填入对应答案</div>
      <div class="fill-caption">{{d.caption}}</div>
      <div class="fill-hints">
        <div v-for="(hint,i) in d.hints" :key="i" class="fill-hint reveal" :class="{shown:shown>i,active:active===i}">{{hint}}</div>
      </div>
      <div class="fill-time">{{d.time}}</div>
    </div>
  </div>
</template>
