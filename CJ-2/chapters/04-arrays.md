<div class="eyebrow">04 · 数组回访 · 105–120 分钟</div>

# 一次处理四个轮子的目标转速

<div class="two-col">
<div>

```c
void clamp_all(int a[], int n, int limit) {
    for (int i = 0; i < n; i++) {
        a[i] = clamp_speed(a[i], limit);
    }
}

// main 里
int speeds[4] = {9600, -9600, 9600, 6000};
clamp_all(speeds, 4, 8000);
```

</div>
<div>

传入四个目标值的起点和个数，循环逐个限幅。

<div v-click class="question">函数结束后，<code>main</code> 的四格分别是多少？</div>
<div v-click class="answer"><code>8000, -8000, 8000, 6000</code></div>

</div>
</div>

<!-- 4 分钟。与第一幕四次调用对照。这里 speeds 是目标值数组；第三幕 motors 是电机记录数组，按任务选用。 -->

---

# 数组没搬走，只交了第一格的地址

<div class="cj2-card">
<p>调用 <code>clamp_all(speeds, 4, 8000)</code> 时，<code>speeds</code> 转换为指向 <code>speeds[0]</code> 的指针。</p>
<p>函数参数里的 <code>int a[]</code> 等同于 <code>int *a</code>。它能找到原来的格子，但不能告诉你有几格，所以还要传 <code>n</code>。</p>
</div>

<div class="memory-track" aria-label="数组四格">
  <div class="memory-item current"><div class="memory-index">a[0] · 起点</div><div class="memory-cell">8000</div></div>
  <div class="memory-item"><div class="memory-index">a[1]</div><div class="memory-cell">-8000</div></div>
  <div class="memory-item"><div class="memory-index">a[2]</div><div class="memory-cell">8000</div></div>
  <div class="memory-item"><div class="memory-index">a[3]</div><div class="memory-cell">6000</div></div>
</div>

<!-- 3 分钟。main 里 speeds 是整个数组；调用表达式里它才给出首元素地址。提醒不要在 clamp_all 里用 sizeof(a) 算元素个数。 -->

---

# 回到那两行 scanf

<div class="two-col">
<div class="cj2-card">
<p><code>scanf("%d", &amp;speed);</code></p>
<div v-click>要写一个 <code>int</code>，用 <code>&amp;speed</code> 取它的地址。</div>
</div>
<div class="cj2-card">
<p><code>scanf("%19s", name);</code></p>
<div v-click>从 <code>name[0]</code> 开始写。传 <code>name</code> 已经给出了起点，最多读 19 个字符，留一格给 <code>\0</code>。</div>
</div>
</div>

<!-- 2 分钟。让学生先给两行分别配一个地址箭头，再逐条点出答案。name 在这里是 char name[20]。 -->

---

# 旧题换写法：P5733 会改原来的字符串吗？

<div class="two-col">
<div class="cj2-compact">

```c
void uppercase(char s[]) {
    for (int i = 0; s[i] != '\0'; i++) {
        if (s[i] >= 'a' && s[i] <= 'z')
            s[i] = s[i] - ('a' - 'A');
    }
}

// main 里
char name[] = "Rm2026";
uppercase(name);
```

</div>
<div>
<p>循环已经在 CJ-1 写过。今天把它移进函数，<code>main</code> 里的 <code>name</code> 会变吗？</p>
<p v-click class="answer">会。<code>name</code> 现在是 <code>RM2026</code>，原来的字符格被写入了。</p>

[洛谷 P5733 原题](https://www.luogu.com.cn/problem/P5733)
</div>
</div>

<!-- 3 分钟。先预测再解释，不另起一道限时 OJ。追问传的是数组首元素地址，还是整串字符的副本。 -->

---

# 离场题：不运行，指出哪一格会变

假设 `speed = 9600`，`m.speed = 9600`。每行独立判断。

| 调用 | 谁变了？ |
| --- | --- |
| `clamp_speed(speed, 8000);` | <span v-click>原值不变；返回结果没接住。</span> |
| `stop_motor(&speed);` | <span v-click><code>speed</code> 变成 0。</span> |
| `control_motor(&m);` | <span v-click><code>m.speed</code> 变成 0，其他成员不变。</span> |

<p class="spaced">课后：补交 P5737、P5742。选做 <a href="https://www.luogu.com.cn/problem/P5741">P5741 旗鼓相当的对手（加强版）</a>，先用结构体数组存下每个人，再两两比较。</p>

<!-- 3 分钟。同桌互讲，答案要带原因：值没存回去、沿地址写入、沿地址再选成员。 -->
