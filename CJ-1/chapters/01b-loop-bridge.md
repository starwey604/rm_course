<ProblemStatement pid="P1424" />

<!--
完整题面按洛谷原题转述，保留输入输出、全部判定规则、完整范围与官方样例。
来源：https://www.luogu.com.cn/problem/P1424
核对日期：2026-10-31。题面页可供学生独立阅读，避免只留下题名与链接。
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
