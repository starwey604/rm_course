<div class="eyebrow">02 · 指针与数组 · 46–81 分钟</div>

# 不接返回值，能让原来的速度清零吗？

<div class="two-col">
<div>

```c
void stop_motor(int speed) {
    speed = 0;
}

// main 里
int speed = 9600;
stop_motor(speed);
printf("%d\n", speed);
```

</div>
<div>

<div class="question">猜一下：屏幕会打印 <code>0</code>，还是 <code>9600</code>？</div>

<div v-click class="answer"><code>9600</code>。赋值确实执行了，改的却不是 <code>main</code> 里的那一格。</div>

</div>
</div>

<!-- 2 分钟。让学生先投票，编译运行 chassis.c 的“值传”一行，再揭晓。void 表示这个函数不交回结果。清零的是目标值。 -->

---
clicks: 3
---

# 同名的 speed，是两格数据

<MemoryRooms mode="value" :step="$clicks" />

<!-- 3 分钟。依次点击：复制值、改参数、结束调用。往回点一次让学生指出改的是哪一格。局部名字只在各自函数中使用；名字相同也不会合并。 -->

---
clicks: 3
---

# 函数调用与返回：调用栈怎么变？

<p><code>main</code> 要等 <code>stop_motor</code> 返回才继续。<strong>调用栈</strong>记录尚未返回的调用，每层叫一个<strong>栈帧</strong>。</p>

<CallStack :step="$clicks" />

<div v-click="3" class="question">传进去的 <code>9600</code> 只是副本。要让 <code>stop_motor</code> 改到 <code>main</code> 的原格，该传什么？</div>

<!-- 2 分钟。从上一页同名的两个 speed 接过来：蓝色对应 main，绿色对应 stop_motor。第 1 次点击压栈，画面定格在刚进入 stop_motor；第 2 次点击弹栈，回到 main。用先叠上、先拿走栈顶说明后进先出。第 3 次点击提问，把答案留到下一页。图是调用过程示意，不讨论编译后的寄存器或内存布局。 -->

---
clicks: 3
---

# 指针：存下地址，再找到原来的变量

<PointerSyntax :step="$clicks" />

<!-- 5 分钟。先让学生猜 speed 在哪一行变成 0。三次点击依次标出声明、取地址并把地址存进 p、沿地址写原值。问 p 和 *p 哪个是地址。最后带着左边的问题切到双房间图：让函数收到地址，而不是收到 9600。 -->

---
clicks: 3
---

# 传过去的还是副本，这次复制的是地址

<MemoryRooms mode="pointer" :step="$clicks" />

<!-- 4 分钟。第一下看 0x1000 进 p；第二下对照左边语句，只改 main 的值，p 里的地址没动；第三下退出。用同一初值对比前面的按值版本。 -->

---

# 原来 scanf 早就在用这个办法

<div class="two-col">
<div>

```c
int speed;
scanf("%d", &speed);
```

</div>
<div>

```c
char name[20];
scanf("%19s", name);
```

</div>
</div>

<div class="question">两个调用都要往外面的格子写。左边地址怎么拿到？右边先猜，做完交换练习再回来。</div>

<!-- 1 分钟。让学生指出左边传的是 int 的地址；别在这里开讲数组形参。 -->

---
clicks: 6
---

# 两个轮子的目标值写反了，怎么换回来？

<SwapFill :step="$clicks" />

<!-- 5 分钟。先让学生独立填三个空，再每空点击两次：先提示，再把答案填回代码。① 读左轮旧值，② 往左轮原格写入，③ 用暂存值补右轮。下一页沿速度格讲评。 -->

---

# 换的是两个地址指向的值

<div class="two-col">
<div>

```c
void swap(int *a, int *b) {
    int tmp = *a;
    *a = *b;
    *b = tmp;
}
```

</div>
<div>

| 执行到 | left | right |
| --- | --- | --- |
| 调用前 | 8000 | -8000 |
| `*a = *b` | -8000 | -8000 |
| `*b = tmp` | -8000 | 8000 |

</div>
</div>

<!-- 3 分钟。请一位同学指出中间那行为什么两格一样，另一位解释 tmp 保存了什么。用正负两个值检查是否真的交换。 -->

---

<div class="eyebrow">指针 · 数组回访</div>

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

<!-- 2 分钟。与第一幕四次调用对照。这里的 speeds 只保存目标值。与 swap 对照：前者要传两个独立的地址，这里有连续的四格，传起点和个数。 -->

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

<!-- 2 分钟。main 里 speeds 是整个数组；调用表达式里它才给出首元素地址。提醒不要在 clamp_all 里用 sizeof(a) 算元素个数。 -->

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
clicks: 2
---

<div class="eyebrow">拓展 02 · 函数指针</div>

# 陀螺仪一换，要改 50 处调用吗？

<p>假如到处都写 <code>bmi088_read_gyro()</code>，换成 ICM42688，怎么让调用不认芯片名？</p>

<RulePointer :step="$clicks" />

<!-- 2 分钟。两种 read 函数是课堂假设的封装，不是 Zephyr 接口。这里约定两者接收 float *，向它指向的格子写一个轴的读数，用 int 返回状态。第一下把函数的入口交给 read_gyro，第二下换绑定。和 int *p 对比：p 指向数据，read_gyro 指向可调用的函数；签名要对得上。 -->

---

# Zephyr：同一个取样入口，两种驱动

<div class="two-col cj2-zephyr">
<div class="cj2-compact">
<div class="label">应用层 · 只认传感器接口</div>

```c
if (sensor_sample_fetch(imu_dev) == 0) {
    sensor_channel_get(imu_dev,
        SENSOR_CHAN_GYRO_XYZ, gyro);
}
```

<p>先取样，再读三个轴。取样时，Zephyr 找到设备的函数表，调用：<br><code>api-&gt;sample_fetch(dev, SENSOR_CHAN_ALL)</code></p>
</div>
<div v-click="1" class="cj2-compact">
<div class="label">Zephyr 4.3 · 节选，已展开 typedef</div>

```c
struct sensor_driver_api {
    int (*sample_fetch)(const struct device *,
                        enum sensor_channel);
    int (*channel_get)(const struct device *,
                       enum sensor_channel,
                       struct sensor_value *);
};
```

</div>
</div>

<div v-click="2" class="cj2-branches">
  <div class="cj2-card"><div class="label">BMI088 陀螺仪</div><code>bmi08x_sample_fetch</code></div>
  <div class="cj2-card"><div class="label">ICM42688</div><code>icm4268x_sample_fetch</code></div>
</div>

<p v-click="2" class="cj2-takeaway"><strong>硬件抽象</strong>：设备配置换了，表里的实现随设备变；只用共同接口的控制代码不用改调用。</p>

<!--
2 分钟。应用层拿到已配置、就绪的 imu_dev；gyro 是能容纳三个轴的 struct sensor_value 数组，取样成功后再取通道，完整程序两次都查返回值。第一下找两个被括号括起来的名字；源码用 typedef 为它们起了别名，这里展开。sample_fetch 接收设备和通道，channel_get 还接收输出地址。第二下亮出 v4.3 两个真实驱动的 .sample_fetch 绑定。换芯片仍需改设备配置并核对轴向、采样率和量程。问：设备自己的配置、数据和动作，怎么放在一起？
源码（Zephyr v4.3.0）：https://github.com/zephyrproject-rtos/zephyr/blob/v4.3.0/include/zephyr/drivers/sensor.h
BMI088：https://github.com/zephyrproject-rtos/zephyr/blob/v4.3.0/drivers/sensor/bosch/bmi08x/bmi08x_gyro.c
ICM42688：https://github.com/zephyrproject-rtos/zephyr/blob/v4.3.0/drivers/sensor/tdk/icm4268x/icm4268x.c
-->

---

<div class="eyebrow">81–91 分钟 · 课间</div>

# 休息 10 分钟：在真实内存里找 speed

<p class="cj2-memory-origin"><code>p</code> 是 <code>stop_motor</code> 的形参。调用时，<code>&amp;speed</code> 的地址值复制给 <code>p</code>。</p>

<div class="cj2-memory-lesson">
<div class="cj2-memory-source cj2-compact">

```c
void stop_motor(int *p) {
    *p = 0;
}

int main(void) {
    int speed = 9600;
    stop_motor(&speed);
    return 0;
}
```

</div>
<div class="cj2-live-memory">
  <div class="cj2-pointer-cell">
    <h2>stop_motor 的形参 <code>p</code> · 8 字节</h2>
    <div class="cj2-address-value"><span>存的地址</span><code>0x7fffffffd3d0</code></div>
  </div>
  <div class="cj2-memory-link" aria-label="执行 *p = 0，沿 p 保存的地址找到 speed"><span aria-hidden="true">↓</span><span><code>*p = 0</code>：沿地址写入</span></div>
  <div class="cj2-speed-cell">
    <h2>main 的变量 <code>speed</code> · 4 字节</h2>
    <small>原格的地址 <code>&amp;speed</code>：<code>0x7fffffffd3d0</code></small>
    <div class="cj2-byte-row"><span>写入前</span><code>9600</code><code>80 25 00 00</code></div>
    <div class="cj2-byte-row"><span>写入后</span><code>0</code><code>00 00 00 00</code></div>
  </div>
</div>
</div>

<p class="cj2-memory-result"><code>speed</code> 从 9600 变为 0，<code>p</code> 里保存的地址不变。</p>
<p class="cj2-memory-capture">Linux x86-64 调试实测，地址来自同一次运行。右侧字节以十六进制显示。</p>

<!-- 10 分钟。整张图一开始就展示，课间供学生对照。先在左边找到 main 的 speed、调用实参 &speed、函数形参 int *p，再用手指沿右图从 p 保存的地址找到 speed，最后对照 *p = 0 前后的字节。p 是函数的参数名，不是另一个函数；&p 是存放这个参数的格子自己的地址，这次实测为 0x7fffffffd3a8，学生追问时再补充。左侧摘出完整的相关函数供阅读；右图保留原 examples/chassis.c 的一次调试实测地址，不表示重编译这段精简代码仍能得到相同地址。右栏字节按内存地址从低到高列出；实测平台为小端，9600 = 0x2580。实测：cc -g -O0 examples/chassis.c；GDB 在 stop_motor 的 *p = 0; 行暂停，查看 p/x &p、p/x p、p sizeof p、p sizeof *p、x/4bx p；再切 main 帧查看 p/x &speed，回到 stop_motor 单步重读 x/4bx p。 -->
