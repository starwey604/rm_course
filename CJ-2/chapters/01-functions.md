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

<div v-click class="question">第三轮还在用旧上限。怎样让四个轮子都从同一个地方拿规则？</div>

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

<div v-click class="question">每段都在做同一件事：<strong>给我一个速度和上限，交回限幅结果。</strong></div>

<!-- 3 分钟。指明第三段是从原先四份 10000 代码改漏后的版本。问负值是否也要改。 -->

---

# 把限幅交给一个函数

<div class="two-col">
<div>

```c
int clamp_speed(int speed, int limit) {
    if (speed > limit) return limit;
    if (speed < -limit) return -limit;
    return speed;
}
```

</div>
<div>

调用时给出 **速度** 和 **正的上限**。  
`return` 把结果交回去，函数就在这一行结束。

<p v-click class="question"><code>clamp_speed(-9600, 8000)</code> 会在哪一行返回？</p>

</div>
</div>

<div v-click class="answer">第二个 <code>if</code> 成立，返回 <code>-8000</code>。</div>

<!-- 5 分钟。带学生读函数头：第一个 int 是结果类型，括号里是参数。分别跑 9600、-9600、6000；不要把 return 讲成打印。 -->

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

<!-- 4 分钟。后续用数组收掉四次调用，现在先留四行突出返回值与赋值。可以现场运行 chassis.c 的第一行结果。 -->

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

# 补完 is_leap：给一个年份，交回判断

<div class="two-col">
<div class="cj2-compact">

```c
int is_leap(int year) {
    if ([①]) return 1;  // 整百闰年
    if ([②]) return 1;  // 其余闰年
    return 0;
}
```

<p class="spaced">补两个判断，再把函数用到循环里。读入和输出已备好。</p>

<div v-click class="hint">先试 <code>1900</code> 和 <code>2000</code>。两者都能被 100 整除，哪个应该返回 1？</div>

</div>
<div class="cj2-compact">
<div class="label">动手 · 5 分钟</div>

```c
void collect(int x, int y) {
    int years[1500], n = 0;
    for (int year = x; year <= y; year++) {
        if ([③]) {
            years[n] = year;
            n++;
        }
    }
    print_years(years, n);  // 已给定
}
```

</div>
</div>

<!-- 5 分钟。给学生 examples/p5737_fill.txt，复制为 .c，替换编号处的占位值后即可编译。先留出独立时间，再点击显示提示。print_years 的数组形参不在此处展开。 -->

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
