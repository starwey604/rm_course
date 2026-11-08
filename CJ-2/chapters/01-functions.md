<div class="eyebrow">01 · 函数 · 19–46 分钟</div>

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

<!-- 1 分钟。先让学生猜漏改第三轮的结果，再点击揭晓。这里只模拟命令，目标值不等于实际转速。 -->

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

<!-- 1 分钟。指明第三段是从原先四份 10000 代码改漏后的版本。问负值是否也要改。 -->

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

<!-- 2 分钟。依次插入正、负两条限幅判断，再用 -9600 和 8000 追踪返回路径。问 6000 会走到哪里；return 是把值交回调用处，不是打印。 -->

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

<!-- 1 分钟。后续用数组收掉四次调用，现在先留四行突出返回值与赋值。可以现场运行 chassis.c 的第一行结果。 -->

---

# 用 void 定义不返回值的函数

<div class="two-col cj2-even">
<div>

```c
int target_speed = 9600;  // 写在函数外

void set_target(int speed) {
    target_speed = speed;
}

// main 里
set_target(0);
```

</div>
<div>

<div class="question">这次没有用 <code>=</code> 接结果，<code>target_speed</code> 会变吗？</div>

<div v-click="1" class="answer">会。<code>target_speed</code> 是全局变量，函数体直接把它改成了 <code>0</code>。</div>

<p v-click="1">函数名前的 <code><span class="cj2-syntax-mark">void</span></code> 表示<strong>不返回值</strong>，不能用 <code>=</code> 接它的结果。</p>

<p v-click="2">想改调用者自己的变量，也可以<strong>传它的地址</strong>。只传一个整数，改不到原来的那格。</p>

</div>
</div>

<!-- 1 分钟。先问没有接返回值，函数还能不能做事。第一次点击后指着函数内的赋值：写的是全局变量，不是形参 speed；走到右花括号就返回，提前结束可用 return;。第二次点击只留地址伏笔，不提前教指针语法。void 只说明没有返回值，不决定会改哪里。 -->

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

<!-- 3 分钟。用 1999 2004 核对两行输出；补测 1899 1904，不能把 1900 加进去。 -->

---

<div class="eyebrow">拓展 01 · 函数式思想</div>

# 同样传 9000，为什么上限越算越低？

<div class="two-col cj2-even cj2-purity">
<div class="cj2-compact">
<div class="label">左边 · 看全局变量 target_speed</div>

```c
int limit = 8000, target_speed = 0;  // 全局变量

void clamp_and_store(int speed) {
    limit = limit - 1000;
    target_speed = clamp_speed(speed, limit);
}
```

<p class="cj2-clamp-call">连调三次 <code>clamp_and_store(9000)</code></p>
<div class="cj2-call-results cj2-call-results-bad" aria-label="三次调用后全局 target_speed 的值">
  <code v-click="1">7000</code><code v-click="2">6000</code><code v-click="3">5000</code>
</div>
</div>
<div class="cj2-compact">
<div class="label">右边 · 上限由调用者传入（纯函数）</div>

```c
int clamp_speed(int speed, int limit) {
    if (speed > limit) return limit;
    if (speed < -limit) return -limit;
    return speed;
}
```

<p class="cj2-clamp-call">连调三次 <code>clamp_speed(9000, 8000)</code></p>
<div class="cj2-call-results" aria-label="三次调用的返回值">
  <code v-click="1">8000</code><code v-click="2">8000</code><code v-click="3">8000</code>
</div>
</div>
</div>

<p v-click="4" class="cj2-takeaway">左边写了两个全局变量，这些改动叫<strong>副作用</strong>。下一次还会用到被改过的上限。<br>右边像数学公式：同样的输入总得到同样的输出，也不改外面的变量。</p>

<!-- 2 分钟。三次都调用 clamp_and_store(9000)，它内部用的是右边已定义的 clamp_speed。先猜，再逐次揭示：左边观察全局变量，右边观察返回值。请学生圈出写全局变量的两行，区分“有没有返回值”和“有没有改外面”：这里的副作用来自赋值，不来自 void。 -->

---

# 摇杆回中，怎么把 2 和 -3 都当成 0？

<p>松手后，摇杆读数可能在 <code>2</code>、<code>-3</code> 附近抖动。<strong>死区</strong>：绝对值小于 <code>5</code> 的读数都当成 <code>0</code>。</p>

<div class="two-col cj2-even">
<div class="cj2-compact">
<div class="label">写法 A · 用临时变量接住每一步</div>

```c
int step1 = deadband(raw_stick, 5);
int step2 = scale_up(step1, 10);
int out = clamp_speed(step2, 8000);
```

</div>
<div v-click="1" class="cj2-compact">
<div class="label">写法 B · 把结果直接传给下一步</div>

```c
int out = clamp_speed(
    scale_up(deadband(raw_stick, 5), 10),
    8000);
```

</div>
</div>

<div v-click="2" class="cj2-chain" aria-label="两种写法都按死区、放大、限幅的顺序处理摇杆读数">
  <div><small>摇杆读数</small><code>900</code></div>
  <div><small>死区 · 幅值小于 5 归零</small><code>900</code></div>
  <div><small>放大 · 乘 10</small><code>9000</code></div>
  <div><small>限幅 · 压到 ±8000 内</small><code>8000</code></div>
</div>

<p v-click="3" class="cj2-takeaway">怀疑死区写错了？单跑 <code>printf("%d", deadband(3, 5));</code>，应该打印 <code>0</code>。</p>

<div v-click="4" class="cj2-source-links">
  <strong>打开工程源码</strong>
  <a href="https://github.com/sharkdp/bat/blob/v0.26.1/src/bin/bat/main.rs#L105-L110" target="_blank" rel="noopener noreferrer">Rust · bat ↗</a>
  <a href="https://github.com/bnjbvr/cargo-machete/blob/v0.9.2/src/search_unused.rs#L133-L146" target="_blank" rel="noopener noreferrer">Rust · cargo-machete ↗</a>
  <a href="https://github.com/git/git/blob/v2.51.0/builtin/describe.c#L310-L314" target="_blank" rel="noopener noreferrer">C · Git ↗</a>
</div>

<!-- 3 分钟。先读分步版，再亮出嵌套版，指着最里层说计算顺序；用 900 追踪三步，再用 3 单测死区。打开 bat 做主讲：筛掉隐藏项和没有扩展名的项，复制留下的项，收成列表。Rust 这段顺着点号从上往下读。另两条按需打开：cargo-machete 合并几个目标列表，从 .rs 路径提取父目录，再收成集合；C 的 Git 把算出的短提交号交给外层函数，写入输出缓冲区。组合写法本身不保证纯，Git 这一行就会写数据。课堂摇杆数值只用于追踪，不代表实机量程。 -->

---

# 函数算完以后，数据怎么办？

<div class="cj2-data-questions">
  <div><strong>历史要留在哪？</strong><span>PID 要用上一拍的积分项 <code>integral</code>。如果每次进函数都把它初始化为 <code>0</code>，就得另找地方保存每台电机的历史。</span></div>
  <div v-click="1"><strong>四个结果怎么带回？</strong><span>底盘解算得到左前、右前、左后、右后四个目标转速。<code>return</code> 一次交回一个值；可以用<strong>结构体</strong>把四个数打包成一个值。</span></div>
  <div v-click="2"><strong>谁能改原来的格子？</strong><span><code>stop_motor(speed)</code> 只拿到速度值的副本。想改 <code>main</code> 里的原格，得用<strong>指针</strong>告诉函数原格在哪。</span></div>
</div>

<div v-click="3" class="question">先看清零实验：函数里的 <code>speed</code> 和 <code>main</code> 里的 <code>speed</code>，究竟是不是同一格？</div>

<!-- 2 分钟。用三个问题收束：保存历史（每台电机一份状态；游戏中也要保存角色血量）、打包结果、沿地址写回。区分纯函数不改外部状态、C 按值传递和返回值的类型。下一页让学生先预测清零结果，再看原值与副本。 -->
