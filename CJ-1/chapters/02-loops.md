<div class="eyebrow">02 · 循环结构 · 20–50 分钟</div>

# 重复 n 次，用 for 表达

```c
for (int i = 0; i < n; i++) {
    // 每次重复执行的内容
}
```

<v-clicks>

- `int i = 0`：初始化，只做一次。
- `i < n`：每次进入循环体前检查。
- `i++`：循环体结束后更新，再回到判断。

</v-clicks>

<div class="note">当 n = 4 时，循环体执行时的 i 依次为 <strong>0、1、2、3</strong>。</div>

<!--
约2分钟。0到n-1正好n次，1到n也可循环n次，别混搭起点与条件。用大括号明确循环体。
-->

---
clicks: 4
---

<div class="eyebrow">02 · 接上 P1424</div>

# 同一天的逻辑，重复四次

<TraceBoard scene="fish" :step="$clicks" />

<!--
约2分钟。自测x=5,n=4。分别跟踪i、day、total；轮次和星期不是同一件事。原题n<=10^6，int能容纳总里程。
题目：https://www.luogu.com.cn/problem/P1424
-->

---
clicks: 8
---

<div class="eyebrow">02 · 跟踪一次完整的 for</div>

# 循环体执行三次，判断四次

<TraceBoard scene="sum" :step="$clicks" />

<!--
约2分钟。点完最后一次退出判断，再看输出。本例i在for外声明，所以循环后仍能观察到i=4。
-->

---

<div class="eyebrow">02 · 随堂练习一 · P5719</div>

# 分类平均：先想需要记住什么

<div class="problem-link"><a href="https://www.luogu.com.cn/problem/P5719">打开 P5719 分类平均</a></div>

给定 n、k，把 1 到 n 的整数分成两类：

- A 类：能被 k 整除。
- B 类：不能被 k 整除。

分别输出两类的平均数，保留 **1 位小数**。

<div class="io-pair"><div><div class="label">输入</div><pre>6 2</pre></div><div><div class="label">输出</div><pre>4.0 3.0</pre></div></div>

<div class="note">1 ≤ n ≤ 10000，1 ≤ k ≤ 100。题目保证两类的个数都不为 0。</div>

<!--
约1分钟读题。先明确输入输出和分类条件。引导学生除了和还需要个数，不提前给出实现。
题目：https://www.luogu.com.cn/problem/P5719
-->

---

<div class="eyebrow">02 · 独立完成 · 5 分钟</div>

# 从变量开始，再写循环

<div class="large">完成 P5719，并解释每个变量的用途。</div>

<v-clicks>

1. 每一类分别记住 **和** 与 **个数**。
2. 从 1 遍历到 n，用 `%` 判断所属类别。
3. 计算平均数时，让除法按浮点数进行。

</v-clicks>

<div class="hint">先测 <code>6 2</code>，再测 <code>2 2</code>。只输出题目要求的两个平均数。</div>
<div class="exercise-time">05:00</div>

<!--
留出完整5分钟，按需要揭示提示。助教看初值、分类和精度。2 2应输出2.0 1.0。
-->

---
clicks: 7
---

<div class="eyebrow">02 · P5719 讲评</div>

# 读完一个数，就更新对应的一类

<TraceBoard scene="classify" :step="$clicks" />

<!--
约1分钟。n=6,k=2，A和12个数3，B和9个数3。本页为演示片段，完整通用实现见examples/p5719.c。
-->

---

<div class="eyebrow">02 · P5719 讲评</div>

# 最后一步，别让整数除法截掉小数

<div class="two-col"><div>

```c
double a = sa / ca;
```

<div v-click class="question">先按整数相除，<br>再存进 double。</div>

</div><div>

```c
printf("%.1f %.1f\n",
       1.0 * sa / ca,
       1.0 * sb / cb);
```

<div v-click class="answer">先引入浮点数，再做除法。</div>

</div></div>

<div class="note">例如 37 / 7 得到 5，而 37.0 / 7 保留小数部分。</div>

<!--
约1分钟，关联上一节9/5和9.0/5。37/7来自合法自测n=10,k=3的B类。赋给double不能补回已截去的小数。
-->

---
clicks: 4
---

<div class="eyebrow">02 · 按条件重复 · P5720</div>

# 长度到 1 时，就停止

<div class="problem-link"><a href="https://www.luogu.com.cn/problem/P5720">P5720 一尺之棰</a> · 从第二天起每天整除 2，问第几天变为 1。</div>

<TraceBoard scene="stick" :step="$clicks" />

<!--
约3分钟。范围1<=a<=10^9。本例20答案5；边界a=1答案1，不是0。for也可实现，重点在条件重复。
-->

---
clicks: 2
---

<div class="eyebrow">02 · while 与 do-while</div>

# 初始条件为假，会执行几次？

<div class="two-col"><div>

```c
int x = 0;
while (x > 0) {
    printf("A\n");
}
```

<div v-click="1" class="answer">先判断：执行 0 次。</div>

</div><div>

```c
int x = 0;
do {
    printf("B\n");
} while (x > 0);
```

<div v-click="2" class="answer">先执行：执行 1 次。</div>

</div></div>

<div class="note"><code>do-while</code> 至少执行一次。注意最后的 <strong>分号</strong>。</div>

<!--
约2分钟。两个代码块是独立片段，不能在同一作用域重复定义x。真实循环需要维护条件相关状态。
-->

---
clicks: 5
---

<div class="eyebrow">02 · continue</div>

# 跳过本轮，仍要完成更新

<TraceBoard scene="continue" :step="$clicks" />

<!--
约2分钟。for中continue走到更新表达式，再检查条件；while则回到条件判断。后者如果更新被跳过可能导致死循环。
-->

---
clicks: 2
---

<div class="eyebrow">02 · break</div>

# 找到后，结束所在的循环

<div class="two-col"><div>

```c
for (int i = 1; i <= 10; i++) {
    if (i % 7 == 0) {
        printf("%d\n", i);
        break;
    }
}
printf("done\n");
```

</div><div>

<div class="question">程序会输出什么？</div>
<div v-click="1" class="output spaced">7<br>done</div>
<p v-click="2" class="spaced">break 跳出循环，随后继续执行循环后面的语句。</p>

</div></div>

<div class="note">有多层循环时，break 只跳出它所在的最内层循环。</div>

<!--
约1分钟。与上一节switch的break关联，强调不等同于结束整个程序。
-->

---
clicks: 6
---

<div class="eyebrow">02 · 嵌套循环 · P5721</div>

# 一层控制行，一层控制本行数量

<div class="problem-link"><a href="https://www.luogu.com.cn/problem/P5721">P5721 数字直角三角形</a> · 每个数至少两位，不足补 0，行末换行。</div>

<TraceBoard scene="nested" :step="$clicks" />

<!--
约2分钟，导读后课后完成。n<=13；这里n=3输出010203/0405/06。先数每行数量，再对应row和col。
-->

---

<div class="eyebrow">02 · 循环检查</div>

# 出错时，先手动走两轮

<v-clicks>

- **初始值**：累加器是否清零？第一天是 0 还是 1？
- **结束条件**：用 `<` 还是 `<=`？是否多做或少做一次？
- **状态更新**：循环变量是否变化？continue 会不会绕过更新？
- **输出位置**：每轮输出，还是全部结束后输出？

</v-clicks>

<div class="note">嵌入式主循环 <code>while (1)</code> 会持续轮询与更新状态；本课 OJ 程序要按题意结束。</div>

<!--
约1分钟。关联传感器轮询和主循环，不演示忙等待延时控制硬件。
-->

---

<div class="section-break">
<div class="eyebrow">休息 · 50–60 分钟</div>
<h1>休息 10 分钟</h1>
<p>练习没有跑通、环境报错，现在可以找助教。</p>
<p>回来之后：把一组数据存进数组。</p>
</div>

<!--
完整休息10分钟，不继续讲新知识。助教处理输入格式、编译选项与运行问题。
-->
