<script setup lang="ts">
import {computed} from 'vue'
const props=defineProps<{kind:string,step:number}>()
const printMode=location.search.includes('print=true')
const classify={
  max:5,
  questions:[
    {label:'保存什么？',at:1,text:'平均数需要“和”与“个数”。两类各记一份，都从 0 开始。'},
    {label:'判断什么？',at:2,text:'先问是否遍历完 1～n，再问当前数能否被 k 整除。'},
    {label:'更新什么？',at:4,text:'所属那类的和加上当前数、个数加 1，随后 i++。'}
  ],
  lines:[
    {at:1,text:'int sa = 0, sb = 0;'},
    {at:1,text:'int ca = 0, cb = 0;'},
    {at:2,text:'for (int i = 1; i <= n; i++) {'},
    {at:3,text:'    if (i % k == 0) {'},
    {at:4,text:'        sa += i; ca++;'},
    {at:3,text:'    } else {'},
    {at:4,text:'        sb += i; cb++;'},
    {at:3,text:'    }'},
    {at:2,text:'}'},
    {at:5,text:'printf("%.1f %.1f\\n",'},
    {at:5,text:'       1.0 * sa / ca, 1.0 * sb / cb);'}
  ],
  captions:['先别急着写 for。平均数由什么算出来？','先把需要的四个量准备好。','用 i 从 1 走到 n；这决定循环的范围。','余数是 0 进入 A 类，否则进入 B 类。','和加上当前数，个数加 1；i++ 进入下一轮。','遍历全部完成后，分别用和除以个数。']
}
const stick={
  max:4,
  questions:[
    {label:'保存什么？',at:1,text:'当前长度 a、天数 day。第 1 天已计入，day 从 1 开始。'},
    {label:'判断什么？',at:2,text:'长度还大于 1，就再过一天；到 1 时停止。'},
    {label:'更新什么？',at:3,text:'长度整除 2，天数加 1；每次模拟一天。'}
  ],
  lines:[
    {at:1,text:'// a 已从输入读入'},
    {at:1,text:'int day = 1;'},
    {at:2,text:'while (a > 1) {'},
    {at:3,text:'    a /= 2;'},
    {at:3,text:'    day++;'},
    {at:2,text:'}'},
    {at:4,text:'printf("%d\\n", day);'}
  ],
  captions:['不知道会锯几次，先想清楚什么时候不再锯。','记录当前状态：长度 a、天数 day。','条件写“还需要继续”的情况：a > 1。','每次只模拟一天：先改长度，再把日期向后推。','反查 a = 1：一次都不锯，仍然是第 1 天。']
}
const d=computed(()=>props.kind==='classify'?classify:stick)
const n=computed(()=>printMode?d.value.max:Math.min(props.step,d.value.max))
</script>
<template>
  <div class="reasoning-grid">
    <div class="reasoning-questions">
      <section v-for="q in d.questions" :key="q.label" :class="{answered:n>=q.at}">
        <h2>{{q.label}}</h2>
        <div class="reasoning-answer reveal" :class="{shown:n>=q.at}">{{q.text}}</div>
      </section>
    </div>
    <div class="reasoning-code-area">
      <div class="label">让每一个回答，落到相应代码里</div>
      <pre class="reasoning-code"><code><span v-for="(line,i) in d.lines" :key="i" class="reasoning-line" :class="{revealed:n>=line.at,active:!printMode&&n===line.at}">{{line.text}}</span></code></pre>
    </div>
  </div>
  <div class="reasoning-caption">{{d.captions[n]}}</div>
</template>
