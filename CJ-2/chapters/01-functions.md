<div class="eyebrow">01 · 函数 · 00–30 分钟</div>

# 只改了三个轮子，会发生什么？

队长把目标转速上限从 **10000** 改到 **8000**。四个轮子的输入依次是 9600、−9600、9600、6000。

<div v-click class="cj2-wheels" aria-label="四轮限幅结果">
  <div class="cj2-wheel"><span>① 左前</span><code>8000</code></div>
  <div class="cj2-wheel"><span>② 右前</span><code>-8000</code></div>
  <div class="cj2-chassis">模拟底盘 · 限幅后的目标值</div>
  <div class="cj2-wheel stale"><span>③ 左后</span><code>9600</code></div>
  <div class="cj2-wheel"><span>④ 右后</span><code>6000</code></div>
</div>

<div v-click class="question">第三轮还是 9600。为什么只有它没被压到 8000？</div>

<!-- 3 分钟。先让学生猜漏改第三轮的结果，再点击揭晓。这里只模拟命令，目标值不等于实际转速。 -->

---

# 找到重复的代码

<div class="cj2-compact">

```c
if (s1 > 8000) s1 = 8000;
if (s1 < -8000) s1 = -8000;

if (s2 > 8000) s2 = 8000;
if (s2 < -8000) s2 = -8000;

if (s3 > 10000) s3 = 10000;
if (s3 < -10000) s3 = -10000;

if (s4 > 8000) s4 = 8000;
if (s4 < -8000) s4 = -8000;
```

</div>

<div v-click class="question">四段代码做的是同一件事：给一个速度和上限，算出限幅结果。<br>既然算法相同，能不能让四个轮子都从同一个地方拿规则？</div>

<!-- 3 分钟。指明第三段是从原先四份 10000 代码改漏后的版本。问负值是否也要改。 -->

---
clicks: 5
---

# 定义函数：先搭好 clamp_speed 的骨架

<ClampDefinition mode="syntax" :step="$clicks" />

<!-- 3 分钟。按顺序标出返回类型、函数名、括号、形参和函数体。让学生区分最前面的 int 和形参前的 int。这个骨架现在只原样返回 speed；下一页再加限幅。 -->

---
clicks: 4
---

# 把限幅判断放进函数体

<ClampDefinition mode="logic" :step="$clicks" />

<!-- 3 分钟。依次插入正、负两条限幅判断，再用 -9600 和 8000 追踪返回路径。问 6000 会走到哪里；return 是把值交回调用处，不是打印。 -->

---

# 四个轮子共用同一条规则

<div class="two-col">
<div>

```c
int limit = 8000;
s1 = clamp_speed(s1, limit);
s2 = clamp_speed(s2, limit);
s3 = clamp_speed(s3, limit);
s4 = clamp_speed(s4, limit);
```

</div>
<div>

函数算出新值，调用处用 **`=`** 把它存回去。

<div v-click class="question">如果只写 <code>clamp_speed(s3, limit);</code>，第三轮的 <code>s3</code> 会变吗？</div>
<div v-click class="answer">不会。算出了结果，但没接住。</div>

</div>
</div>

<!-- 3 分钟。后续用数组收掉四次调用，现在先留四行突出返回值与赋值。可以现场运行 chassis.c 的第一行结果。 -->

---

# 为什么示例总把函数放在 main 前面？

<div class="two-col">
<div>

```c
int clamp_speed(int speed, int limit);

int main(void) {
    int speed = 9600;
    speed = clamp_speed(speed, 8000);
}
```

</div>
<div>

编译器读到调用时，要先知道**参数和返回值的类型**。

把定义放在 `main` 前面就行。定义想放后面？先用左边第一行声明，函数体再写在 `main` 后。

</div>
</div>

<!-- 3 分钟。只区分声明、定义、调用；后续题目都把定义放在 main 前。不展开头文件拆分。 -->

---

<div class="eyebrow">随堂 · 把判断抽成函数</div>

# P5737 · 闰年展示

给出两个年份 `x, y`（`1582 ≤ x < y ≤ 3000`）。先输出闭区间内的闰年个数，再按升序输出所有闰年，用空格隔开。

<div class="io-pair"><div><div class="label">课堂样例 · 输入</div><pre>1999 2004</pre></div><div><div class="label">输出</div><pre>2
2000 2004</pre></div></div>

<p class="spaced">能被 400 整除，或能被 4 整除但不能被 100 整除，就是闰年。</p>

[洛谷 P5737 原题](https://www.luogu.com.cn/problem/P5737)

<!-- 2 分钟。指出两端都算；例子里 2004 恰好在右端点。 -->

---
clicks: 6
---

# 补完 is_leap：给一个年份，交回判断

<LeapFill :step="$clicks" />

<!-- 5 分钟。发 examples/p5737_fill.txt，留出独立时间。随后每空点击两次：先提示，再把答案填回对应位置。最后一空填在右栏；讲评页再核对 1900 和 2000。 -->

---

# 1900 和 2000，不能走同一条路

<div class="two-col">
<div>

```c
int is_leap(int year) {
    if (year % 400 == 0) return 1;
    if (year % 4 == 0 &&
        year % 100 != 0) return 1;
    return 0;
}
```

<p class="spaced">③ 写 <code>is_leap(year)</code>。循环管年份，函数管判断。</p>

</div>
<div>

| 年份 | 返回 | 为什么 |
| --- | --- | --- |
| 1900 | 0 | 整百，不能被 400 整除 |
| 2000 | 1 | 能被 400 整除 |
| 2004 | 1 | 能被 4 整除，不是整百 |

</div>
</div>

<!-- 4 分钟。用 1999 2004 核对两行输出；补测 1899 1904，不能把 1900 加进去。最后问：如果不接返回值，怎样让函数直接把速度改成 0？ -->
