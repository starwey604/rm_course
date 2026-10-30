<div class="eyebrow">开场 · 00–05 分钟</div>

# 今天，把三件事连起来

<v-clicks>

1. **重复执行**：把处理一天的逻辑，重复处理 n 天。
2. **保存数据**：先读入一组数，再倒着输出。
3. **处理字符**：逐个检查、修改和比较字符串。

</v-clicks>

<div class="question">每一步先想清楚：保存什么？判断什么？更新什么？</div>

<!--
约1分钟。学校已有语法基础，本课侧重把语法组织成程序。三个问题分别对应循环、数组、字符串。
-->

---

<div class="eyebrow">上节回访 · P1424</div>

# 一天会处理了，n 天怎么办？

<div class="two-col">
<div>

```c
if (day <= 5) {
    total += 250;
}
if (day == 7) {
    day = 1;
} else {
    day++;
}
```

</div>
<div class="statement">

周一到周五，每天游 250 公里。<br>周末休息，星期仍要前进。

<div class="question">从周五开始，经过 4 天，<br>一共游多少公里？</div>

<div v-click class="answer">250 + 0 + 0 + 250 = 500</div>

</div>
</div>

<!--
约3分钟。回访上一节第51–52页。只复习一天的逻辑，问能否复制四次，以及n很大时怎么办。day是当前星期，total从0开始。本例为课堂自测5 4，不冒称官方样例。
题目：https://www.luogu.com.cn/problem/P1424
-->
