<div class="eyebrow">01 · 函数 · 00–34 分钟</div>

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

<!-- 1 分钟。点出调用前要有声明；接下来的练习把函数定义放在 main 前就行。 -->

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

<!-- 4 分钟。用 1999 2004 核对两行输出；补测 1899 1904，不能把 1900 加进去。 -->

---

<div class="eyebrow">拓展 01 · 函数式思想</div>

# 同样调用两次，为什么读数越来越小？

<div class="two-col cj2-even cj2-purity">
<div class="cj2-compact">
<div class="label">直接改外面的读数</div>

```c
float gyro_data = 1400.0f;
void process_gyro(void) {
    gyro_data = gyro_data * 0.5f;
}
```

<div v-click="1" class="answer"><code>1400 → 700 → 350</code>：第二次从 700 开始。</div>
</div>
<div v-click="2" class="cj2-compact">
<div class="label">把每一步的结果交给下一步</div>

```c
float out = clamp(
    deadband(low_pass(raw, prev), 5.0f),
    -1000.0f, 1000.0f);
```

</div>
</div>

<div class="cj2-chain" v-click="2" aria-label="从最里层到最外层处理读数">
  <div><small>原始值和上次滤波值</small><code>1400, 1000</code></div>
  <div v-click="3"><small>低通 · 取平均</small><code>1200</code></div>
  <div v-click="4"><small>死区 · 幅值小于 5 归零</small><code>1200</code></div>
  <div v-click="5"><small>限幅 · 压到 ±1000 内</small><code>1000</code></div>
</div>

<p v-click="5" class="cj2-takeaway">纯函数像公式 <code>f(x) = 2x + 1</code>：同样的输入得到同样的输出，不改外面的数据。<br>要查死区，单测 <code>deadband(3.0f, 5.0f)</code> 就行，不用接陀螺仪。</p>

<!--
2 分钟。先问连续调用两次 process_gyro，gyro_data 各是多少。左边用折半示意写回造成的依赖，右边演示另一条滤波流水线，不比较两个算法的输出。右边从内到外读；三次点击依次揭示低通、死区和限幅。单测死区时让学生猜 3 的输出是 0。数值为课堂设定，低通的一步使用显式给出的 prev。用 f(x)=2x+1 类比；Church 的 λ 演算是历史线索。来源：https://www.cis.upenn.edu/~cis5110/Church-UnsolvableProblemElementary-1936.pdf
-->

---

# PID 的积分项，为什么每次都从零开始？

<div class="two-col cj2-even">
<div class="cj2-compact">
<div class="label">只看比例和积分，系数都取 1</div>

```c
float pid_calculate(float error) {
    float integral = 0;
    integral += error;
    return error + integral;
}
```

<p v-click="2" class="spaced">每次调用都重新初始化这个局部变量。上次的累计值不在里面。</p>
</div>
<div>
<p>两个轮子这一拍的误差都是 <code>4</code>。它们的积分项都该是 <code>4</code> 吗？</p>

| 轮子 | 上一拍累计 | 本拍应累计 |
| --- | --- | --- |
| A · 刚偏离 | 0 | <span v-click="1">4</span> |
| B · 已偏了一阵 | 20 | <span v-click="1">24</span> |

<p v-click="2" class="answer">这段代码却把两台的积分项都算成了 <code>4</code>。</p>
</div>
</div>

<div v-click="2" class="question">要记住历史，得给<strong>每台电机留一份状态</strong>，让它在调用结束后还在。</div>

<!-- 2 分钟。假设周期固定，误差累计按每拍加一次演示；这里的 4/24 是积分项，不是控制量。先预测两个轮子的本拍累计，再追踪每次进入函数都执行 integral = 0。需要做微分时，上一次误差也是要保留的状态。本页聚焦状态放在哪，不展开 PID 公式。 -->

---

# 四个轮子的目标转速，怎么一起交回来？

<div class="two-col cj2-even">
<div>
<div class="label">一条底盘运动指令 → 四个目标值</div>
<div class="cj2-wheel-return" aria-label="麦轮解算输出的四个轮速">
  <span>左前</span><span>右前</span><span>左后</span><span>右后</span>
</div>
<p>一条 <code>return</code> 只交回<strong>一个值</strong>。<br>如果返回类型是 <code>int</code>，它就只装得下一个转速。</p>
</div>
<div v-click="1" class="cj2-card">
<div class="label">两条路</div>
<p><strong>打包再返回</strong>：用结构体把四个数装成一份记录，这份记录就是一个返回值。</p>
<p><strong>写到指定位置</strong>：调用者给地址，函数往原来的格子里填值。</p>
</div>
</div>

<div v-click="2" class="question">先试写一个格子：<code>stop_motor(speed)</code> 收到的是速度值的副本。<br>要让它写到 <code>main</code> 里的原格，得传什么？</div>

<!-- 2 分钟。先让同学想怎样把麦轮解算的四个结果交回来。区分一个返回值和一个数字：结构体仍是一个值。然后把第二条路缩到清零一个 speed，引出下一页的值传递实验。 -->
