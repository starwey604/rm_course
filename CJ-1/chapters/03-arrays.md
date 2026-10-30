<div class="eyebrow">03 · 一维数组 · 60–85 分钟</div>

# 最后一个先输出，可它还没读进来

<div class="two-col"><div>
<div class="label">输入顺序</div>
<div class="large mono">3 → 1 → 4</div>
<div class="label spaced">希望输出</div>
<div class="large mono">4 → 1 → 3</div>
<div class="question">只用一个变量 x，<br>读到 4 时，3 还在哪儿？</div>
</div><div>

```c
scanf("%d", &x);  // x 是 3
scanf("%d", &x);  // x 被改成 1
scanf("%d", &x);  // x 又被改成 4
```

<div v-click class="answer">给每个数留一个位置。<br>存好之后，再决定先看哪个。</div>
</div></div>

<!--
约2分钟。先让学生说出“覆盖”，再引出数组。数组把同类型数据连续存放，可以用下标取出任何一个有效元素。
-->

---
clicks: 3
---

<div class="eyebrow">03 · 接上上节课的内存地址</div>

# 第一个元素，为什么叫 a[0]？

```c
int a[5] = {34, 12, 56, 9, 45};
```

<ArrayOffset :step="$clicks" />

<!--
约2分钟。下标可理解为从首元素向后跨过多少个元素：不是字节数。这里每一步跨一个int，不需要先引入指针运算。
声明中的5表示容量；访问a[5]已越界，不演示所谓固定越界结果。补充int b[5]={0}可全清零，int b[5]局部数组无可靠初值。
-->

---

<div class="eyebrow">03 · 遍历与有效长度</div>

# 总共几格，和用了几格，是两回事

<div class="two-col"><div>

```c
int a[] = {34, 12, 56, 9, 45};
int length =
    sizeof(a) / sizeof(a[0]);
for (int i = 0; i < length; i++) {
    printf("%d ", a[i]);
}
```

<div v-click class="answer">总字节数 ÷ 一格的字节数 = 5 格</div>
</div><div>

```c
int data[100] = {3, 1, 4};
int n = 3;  // 只使用前 3 格
```

<p class="spaced">没列出的格子会补 0；<br><code>int zeros[100] = {0};</code> 则全清零。</p>
<div class="question">开了 100 格，就输出 100 个数吗？</div>
<p v-click class="spaced">只遍历用过的格子：<br><code>i = 0; i &lt; n; i++</code></p>
</div></div>

<!--
约2分钟。sizeof相除的写法直接作用于此处定义的数组，返回元素数量5；数组作为函数形参后不能这样算，留在讲师备注中。
sizeof以字节计，不要求所有平台int都是4字节。初始化：int b[5]={0}五格全零；未初始化的局部数组没有可靠初值，可在此口头补充。
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
