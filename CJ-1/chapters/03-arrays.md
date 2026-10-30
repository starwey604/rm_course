<div class="eyebrow">03 · 一维数组 · 60–85 分钟</div>

# 要倒着输出，得先记住输入

<div class="two-col"><div>

<div class="label">先读到的数</div>
<div class="large mono">3　1　4</div>
<div class="label spaced">期望输出</div>
<div class="large mono">4　1　3</div>

</div><div>

<v-clicks>

- 只保存当前一个数，后面会覆盖前面的数。
- 数组让一组同类型数据放在一起。
- 通过下标，访问其中任意一个有效元素。

</v-clicks>

</div></div>

<div class="note">先存下来，之后才能按不同顺序再次使用。</div>

<!--
约2分钟。数组的动机使用P1427，避免一上来背定义。问只用一个变量还记得第一个数吗。
-->

---

<div class="eyebrow">03 · 定义、初始化与下标</div>

# 5 个元素，下标是 0 到 4

```c
int a[5] = {34, 12, 56, 9, 45};
a[1] = 20;             // 修改第二个元素
printf("%d\n", a[0]);   // 读取第一个元素
```

<v-clicks>

- `a[5]` 是第六个位置，已经超出这个数组。
- `int b[5] = {0};` 把五个元素都初始化为 0。
- 局部数组 `int b[5];` 里的元素没有可靠初值。

</v-clicks>

<div class="note">数组声明里的 5 是容量；访问时的方括号里放下标。</div>

<!--
约2分钟。不要把未初始化局部数组说成默认全0。声明容量和访问下标用法不同。不给学生演示越界后的所谓固定结果。
-->

---

<div class="eyebrow">03 · 遍历与有效长度</div>

# 每次访问一个元素

<div class="two-col"><div>

```c
int a[] = {34, 12, 56, 9, 45};
int length =
    sizeof(a) / sizeof(a[0]);

for (int i = 0; i < length; i++) {
    printf("%d ", a[i]);
}
```

</div><div>

<v-clicks>

- 数组元素在内存中连续存放。
- 此处 `sizeof(a)` 是整个数组的大小。
- 对 `int data[100];`，容量是 100；实际读入几个数，要另记 `n`。

</v-clicks>

</div></div>

<div class="note">这里直接对当前数组对象使用 sizeof；传入函数后的情况留待后续学习。</div>

<!--
约2分钟。sizeof返回字节数，这里相除才得到元素数量。不要泛化到指针或函数形参。此处length是5，常见PC上sizeof(a)为20，但不要求int在所有平台都为4字节。
-->

---
clicks: 6
---

<div class="eyebrow">03 · 最值演示 · P5724</div>

# 用第一个元素，初始化当前最大值

<div class="read-code">int a[5] = {34, 12, 56, 9, 45};</div>

<MemoryDemo kind="max" :step="$clicks" />

<div class="note">P5724 求极差：同样维护最小值，最终输出 <strong>最大值 − 最小值</strong>。<a href="https://www.luogu.com.cn/problem/P5724">打开题目</a></div>

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

</div></div>

<div class="note">当 n = 1 时，最大值和最小值相同，极差为 0。</div>

<!--
约1分钟。用题目范围内的正数反例检查初始化。完整代码见examples/p5724.c。
-->

---

<div class="eyebrow">03 · 随堂练习二 · P1427</div>

# 小鱼的数字游戏：倒着念出来

<div class="problem-link"><a href="https://www.luogu.com.cn/problem/P1427">打开 P1427 小鱼的数字游戏</a></div>

输入一串整数，以 **0** 结束。把此前读到的数倒序输出，结束标记 0 不输出。

<div class="io-pair"><div><div class="label">输入</div><pre>3 1 4 0</pre></div><div><div class="label">输出</div><pre>4 1 3</pre></div></div>

<div class="question">数组开了 100 个位置，怎么知道最后一个有效数在哪里？</div>

<div class="note">输入总数不超过 100，只有末尾的一个数是 0；数值不超过 2³¹ − 1。</div>

<!--
约1分钟。0是结束标记，不计入有效数据。数组可开105个int；既要检查scanf成功，也要检查非0。
题目：https://www.luogu.com.cn/problem/P1427
-->

---

<div class="eyebrow">03 · 独立完成 · 6 分钟</div>

# 先完成输入，再倒序输出

<v-clicks>

1. 声明一个足够大的整数数组，令有效个数 `n = 0`。
2. 每读到一个非 0 的数，存入 `a[n]`，然后 `n++`。
3. 从 `n - 1` 遍历到 `0`，输出数组元素。

</v-clicks>

<div class="hint">自测：<code>7 0</code>、<code>2 2 0</code>。别让结束标记 0 混进答案。</div>
<div class="exercise-time">06:00</div>

<!--
留完整6分钟，不提前展示讲评。输出分别为7与2 2。助教检查n含义、读取条件、倒序的有符号下标。
-->

---
clicks: 7
---

<div class="eyebrow">03 · P1427 讲评</div>

# 有效个数决定倒序的起点

<MemoryDemo kind="reverse" :step="$clicks" />

<div class="note">最后一个有效元素是 <code>a[n - 1]</code>，不是 <code>a[n]</code>。</div>

<!--
约2分钟。前四步存储并遇0停止，后三步倒序读取。0没有存入数组。
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

<div class="note">n ≤ 100，可以直接比较。每换一条鱼，都重新把本条鱼的计数置为 0。</div>

<!--
约1分钟导读，完整提示在附录。此组数据输出0 0 0 3 1。不要通过排序破坏位置关系。
题目：https://www.luogu.com.cn/problem/P1428
-->

---
clicks: 3
---

<div class="eyebrow">03 · 课后导读 · P1047</div>

# 数组也可以记录“还在不在”

<div class="problem-link"><a href="https://www.luogu.com.cn/problem/P1047">P1047 校门外的树</a> · 区间可能重叠，两端的树都要移走。</div>

<MemoryDemo kind="trees" :step="$clicks" />

<div class="note">为什么不能直接把每段树的数量依次减掉？想一想重叠的 4、5。</div>

<!--
约1分钟导读，完整实现放附录。课堂例l=10，两段[2,5]、[4,7]，剩5棵。原题l<=10000,m<=100，直接标记即可。
题目：https://www.luogu.com.cn/problem/P1047
-->
