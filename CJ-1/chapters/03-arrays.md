---
clicks: 3
---

<div class="eyebrow">03 · 一维数组 · 60–85 分钟 · 为什么要用数组</div>

# 倒序输出前，先用数组保存整组数据

<ArrayStorage :step="$clicks" />

<!--
约2分钟。先明确任务：读完所有数据以后，再倒序输出。为后面P1427做铺垫，完整题面仍在原位置。
并排比较同一输入写入一个变量与依次写入数组的结果，每次点击读入一个数。任务与结论始终可见，不依赖讲师口头补齐为什么需要数组。
-->

---
clicks: 3
---

<div class="eyebrow">03 · 数组的定义、下标与读写</div>

# 用下标访问元素：第 1 个元素是 a[0]

<ArrayOffset :step="$clicks" />

<!--
约2分钟。先读清元素类型、数组名、容量，再把“第几个”与下标对应起来。依次读取a[0]、读取a[2]、写入a[1]。
跨过几个元素可帮助理解下标从0开始；步数以元素计，不是字节数，不引入指针运算。初始化未列出的元素补0，但未初始化的局部数组没有可靠初值。a[5]越界，不演示固定越界结果。
-->

---
clicks: 4
---

<div class="eyebrow">03 · 数组容量、有效个数与遍历</div>

# 只处理前 n 个元素，循环条件写 i < n

<ArrayTraversal :step="$clicks" />

<!--
约2分钟。n由程序记录，数组不会自动记录输入数量。本例明确约定前3格是本次数据；其余97格即使初始化为0，也不因此变成本次有效数据。
依次核对i=0、1、2、3的判断、访问与停止，联系保存什么、判断什么、更新什么。下一页用sizeof计算容量，进一步区分容量与有效数据个数。
-->

---

<div class="eyebrow">03 · sizeof 与数组容量</div>

# 用 sizeof 计算数组的元素个数

<div class="two-col"><div>

```c
int a[] = {34, 12, 56, 9, 45};
int capacity =
    sizeof(a) / sizeof(a[0]);
```

<div class="answer">capacity 的结果是 5。</div>

</div><div>

<div class="sizeof-guide"><strong>sizeof(a)</strong><br>整个数组占用的字节数<br><br><strong>sizeof(a[0])</strong><br>一个元素占用的字节数</div>

</div></div>

<div class="question">总字节数 ÷ 一个元素的字节数 = 数组的元素总数。<br>它算的是<strong>容量</strong>；只处理前 n 个数据时，循环仍然用 <code>i &lt; n</code>。</div>

<!--
正文约2分钟，先讲容量计算，为后面的sizeof(s)与strlen(s)作准备。此式直接作用于当前定义的数组，不推广到指针或数组形参。sizeof以字节计，不依赖int固定为4字节。
-->

---

<ProblemStatement pid="P5724" />

<!--
完整题面按洛谷原题转述，保留输入输出、全部判定规则、完整范围与官方样例。
来源：https://www.luogu.com.cn/problem/P5724
核对日期：2026-10-31。题面页可供学生独立阅读，避免只留下题名与链接。
-->

---
clicks: 6
---

<div class="eyebrow">03 · 最值演示 · P5724</div>

# 用第一个元素，初始化当前最大值

<div class="read-code">int a[5] = {34, 12, 56, 9, 45};</div>

<MemoryDemo kind="max" :step="$clicks" />

<!-- 讲师补充：P5724 求极差：同样维护最小值，最终输出 最大值 − 最小值。打开题目 -->

<!--
约3分钟。示例最小值9、最大值56，极差47。题目1<=n<=100，0<=ai<=1000。讲义固定数组换成题目读入时同样可用首元素初始化。
-->

---

<div class="eyebrow">03 · P5724 的关键代码</div>

# 不要凭空假设最小值是 0

<div class="two-col"><div>

```c
int min_val = a[0];
int max_val = a[0];
for (int i = 1; i < n; i++) {
    if (a[i] < min_val)
        min_val = a[i];
    if (a[i] > max_val)
        max_val = a[i];
}
```

</div><div>

<div class="question">输入只有 7、8、9，<br>最小值应该是多少？</div>

<div v-click class="answer">7。若从 0 开始取最小值，<br>就会错误地一直保留 0。</div>

<p class="spaced">P5724 要的极差 = 最大值 − 最小值：</p>

```c
printf("%d\n", max_val - min_val);
```

</div></div>

<!-- 讲师补充：当 n = 1 时，最大值和最小值相同，极差为 0。 -->

<!--
约1分钟。用题目范围内的正数反例检查初始化。完整代码见examples/p5724.c。
-->

---

<ProblemStatement pid="P1427" />

<!--
完整题面按洛谷原题转述，保留输入输出、全部判定规则、完整范围与官方样例。
来源：https://www.luogu.com.cn/problem/P1427
核对日期：2026-10-31。题面页可供学生独立阅读，避免只留下题名与链接。
-->

---
clicks: 4
---

<div class="eyebrow">03 · P1427 动手填空 · 6 分钟</div>

# 0 不存，最后一格从哪里找？

<FillExercise kind="reverse" :step="$clicks" />

<!--
填空前追问：保存什么（数组a与有效个数n）？判断什么（x是不是0、下标是否仍>=0）？更新什么（存入a[n]后n++、倒序时i--）？
留完整6分钟，先让学生写，再按需揭示提示。①x == 0 ②n ③n - 1 ④i--。
完整骨架先读再判断，结束标记不存入数组。scanf的失败检查留在完整示例；本页按题目保证的以0结尾输入练习。
自测7 0输出7；2 2 0输出2 2。不要提前切到下一页。
-->

---
clicks: 7
---

<div class="eyebrow">03 · P1427 讲评</div>

# 有效个数决定倒序的起点

<MemoryDemo kind="reverse" :step="$clicks" />

<!-- 讲师补充：最后一个有效元素是 a[n - 1]，不是 a[n]。 -->

<!--
约2分钟。前四步存储并遇0停止，后三步倒序读取。0没有存入数组。
-->

---

<ProblemStatement pid="P1428" />

<!--
完整题面按洛谷原题转述，保留输入输出、全部判定规则、完整范围与官方样例。
来源：https://www.luogu.com.cn/problem/P1428
核对日期：2026-10-31。题面页可供学生独立阅读，避免只留下题名与链接。
-->

---

<div class="eyebrow">03 · 课后导读 · P1428</div>

# 每条鱼，只看它左边的鱼

<div class="problem-link"><a href="https://www.luogu.com.cn/problem/P1428">P1428 小鱼比可爱</a></div>

<div class="large mono">4　3　0　<strong>5</strong>　1</div>

<div class="question">对于值为 5 的这条鱼，应该比较哪些位置？</div>

<v-clicks>

- 只检查它前面的 4、3、0，共 3 条比它小。
- 外层选当前鱼，内层遍历它前面的鱼。
- 相同可爱程度不计入“比自己小”。

</v-clicks>

<!-- 讲师补充：n ≤ 100，可以直接比较。每换一条鱼，都重新把本条鱼的计数置为 0。 -->

<!--
约1分钟导读，完整提示在附录。此组数据输出0 0 0 3 1。不要通过排序破坏位置关系。
题目：https://www.luogu.com.cn/problem/P1428
-->

---

<ProblemStatement pid="P1047" />

<!--
完整题面按洛谷原题转述，保留输入输出、全部判定规则、完整范围与官方样例。
来源：https://www.luogu.com.cn/problem/P1047
核对日期：2026-10-31。题面页可供学生独立阅读，避免只留下题名与链接。
-->

---
clicks: 3
---

<div class="eyebrow">03 · 课后导读 · P1047</div>

# 数组也可以记录“还在不在”

<div class="problem-link"><a href="https://www.luogu.com.cn/problem/P1047">P1047 校门外的树</a> · 区间可能重叠，两端的树都要移走。</div>

<MemoryDemo kind="trees" :step="$clicks" />

<!-- 讲师补充：为什么不能直接把每段树的数量依次减掉？想一想重叠的 4、5。 -->

<!--
约1分钟导读，完整实现放附录。课堂例l=10，两段[2,5]、[4,7]，剩5棵。原题l<=10000,m<=100，直接标记即可。
题目：https://www.luogu.com.cn/problem/P1047
-->
