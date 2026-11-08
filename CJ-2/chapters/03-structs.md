<div class="eyebrow">03 · 结构体 · 91–117 分钟</div>

# 四台电机，难道要起二十个变量名？

<div class="two-col">
<div class="cj2-card">
<div class="label">散装 · 每台五个变量</div>
<p><code>speed1</code>、<code>current1</code>、<code>angle1</code>、<code>temp1</code>、<code>state1</code></p>
<p>再来一套 <code>...2</code>、<code>...3</code>、<code>...4</code>。</p>
</div>
<div v-click class="cj2-card">
<div class="label">打包 · 每台一份 Motor</div>
<p>目标转速、电流、角度、温度、状态放在一起。</p>
<p>要找第三台？先找到那台电机，再拿它的转速。</p>
</div>
</div>

<!-- 1 分钟。让学生试着口述五个参数的更新函数；再问把第三台传进去时抄错一个编号会怎样。这里是教学数据模型。 -->

---

# 先定义电机要记录哪些数据

<div class="two-col">
<div>

```c
struct Motor {
    int speed;       // 目标转速
    int current;     // 电流读数
    float angle;     // 角度
    int temp;        // 温度
    int state;       // 状态码
};
```

</div>
<div>

每一行定义一个**成员**：比如 `int speed;` 表示「有一格叫 speed，里面放整数」。

这五格合起来是一种新类型，叫 `struct Motor`。

</div>
</div>

<!-- 2 分钟。让学生指出每个成员的类型和名字，再圈出类型定义末尾的分号。先不讨论实际数据。 -->

---
clicks: 3
---

# 新建一台电机的数据，再用点号给成员赋值

<MotorType mode="member" :step="$clicks" />

<!-- 2 分钟。先看类型名和变量名。第一次点击：在 main 里建 m，{0} 把这五个成员都初始化为 0。第二次点击：先找 m，再用点号选 speed，等号右边的 9600 只写进这格。第三次点击用 temp 再走一次。 -->

---
clicks: 3
---

# 同一种类型，两份电机数据

<MotorType :step="$clicks" />

<!-- 1 分钟。点击两次分别创建第三轮和第四轮的记录。让学生预测给 m.speed 赋值会不会影响另一台，再点一次核对。最后指着 m 追问：把这一整份数据交给函数，函数改的是哪一份？ -->

---

# 整箱按值传，改的还是副本

<div class="two-col">
<div>

```c
void stop_copy(struct Motor m) {
    m.speed = 0;
}

// main 里
struct Motor m = {0};
m.speed = 9600;
stop_copy(m);
```

</div>
<div>

<div class="question"><code>main</code> 的 <code>m.speed</code> 变了吗？</div>
<div v-click class="answer">没变。函数拿到一份自己的 <code>Motor</code>，改的是副本里的 <code>speed</code>。</div>

</div>
</div>

<!-- 2 分钟。请学生复用前面的两房间图：现在每边是一个 Motor，而不是一个 int。 -->

---
clicks: 3
---

# 拿到整台电机的地址，只改其中一格

<MemoryRooms mode="struct" :step="$clicks" />

<!-- 4 分钟。点击依次交出 &m、改 speed、结束调用。对比 int *p 和 struct Motor *p 指向的东西。示例初始化只写首成员，其余为零；配套 chassis.c 用逐字段赋值便于检查温度保持不变。动画最后对照点和箭头，再口头问：第三台是 motors[2]，调用 control_motor 要传什么？ -->

---

<div class="eyebrow">随堂 · 把同一个人的成绩放在一起</div>

# P5742 · 评等级

读入 `N` 名学生的学号、学业分和素拓分，算出综合分并存入结构体。两科**总分大于 140**，并且 **70% 学业分 + 30% 素拓分不低于 80**，才输出 `Excellent`；否则输出 `Not excellent`。每人一行。

<div class="io-pair"><div><div class="label">课堂样例 · 输入</div><pre>2
101 95 45
102 80 80</pre></div><div><div class="label">输出</div><pre>Not excellent
Excellent</pre></div></div>

[洛谷 P5742 原题](https://www.luogu.com.cn/problem/P5742) · `1 ≤ N ≤ 1000`，学号不超过 `100000`，两科成绩不超过 `100`。

<!-- 2 分钟。题面要求一个成员函数计算两科总分；课堂用 C 的普通函数 total_score 接收学生地址，节末再对照 C++ 成员函数。示例刻意让两人的加权分都为 80。 -->

---
clicks: 6
---

# 补完 P5742：沿地址取分，再判断

<StudentFill :step="$clicks" />

<!-- 5 分钟。给 examples/p5742_fill.txt，复制为 .c，替换三处占位值后即可编译。先独立思考，再逐空两次点击：第 1/3/5 次分别给出学业分、素拓分、调用实参的提示，第 2/4/6 次将对应答案填回代码。读完就把综合分乘 10 存好，比较时用 800；不把算式挖空。让学生先圈出实参是整份记录还是它的地址。打印时保留三个空并展示所有提示，下一页讲评完整答案。 -->

---

# 同样是 80 分，为什么一个没过？

<div class="two-col">
<div class="cj2-compact">

```c
int total_score(const struct Student *s) {
    return s->academic + s->activity;
}

int is_excellent(const struct Student *s) {
    return total_score(s) > 140 &&
           s->weighted10 >= 800;
}
```

<p class="spaced">③ 传 <code>&amp;student</code>。用箭头读取成员；综合分用读入时存好的 <code>weighted10</code>。</p>

</div>
<div>

| 学业 / 素拓 | 总分 | 加权 × 10 | 结果 |
| --- | --- | --- | --- |
| 95 / 45 | 140 | 800 | 未过 |
| 80 / 80 | 160 | 800 | 优秀 |
| 79 / 80 | 159 | 793 | 未过 |

</div>
</div>

<!-- 3 分钟。学生解释哪一列挡住了每个未过样例。对照 > 与 >=；不给浮点精度另开支线。 -->

---

<div class="eyebrow">拓展 03 · 面向对象</div>

# 让电机记录也带上自己的动作

<div class="two-col cj2-motor-method">
<div class="cj2-compact">

```c
struct Motor {
    int speed;           // 目标转速
    float target_angle;  // 目标角度

    void (*set_current)(struct Motor *self,
                        int16_t cur);
    void (*stop)(struct Motor *self);
};
```

</div>
<div class="cj2-compact">
<div class="label">函数体 · 沿 self 找到要改的电机</div>

```c
void motor_stop(struct Motor *self) {
    self->speed = 0;
}
```

<div v-click="1" class="cj2-method-call">
<div class="label">给 m1 绑定动作，再调用</div>
<pre><code>m1.stop = motor_stop;
m1.stop(&amp;m1);</code></pre>
<p>点号找到函数；<code>&amp;m1</code> 作为 <code>self</code>，告诉函数该改哪一台。</p>
</div>
</div>
</div>

<p v-click="2" class="cj2-takeaway"><strong>第三轮</strong> <code>m1.speed</code>：<code>9600 → 0</code>；<strong>第四轮</strong> <code>m2.speed</code>：<code>6000</code> 不变。</p>

<!-- 2 分钟。只展开速度、角度和两个动作，int16_t 来自 stdint.h。先看 motor_stop 只认 self，问它怎么知道是哪一台。第一下展示绑定和调用，点号只取出函数指针，并不自动传入电机地址；第二下核对只有 m1 的目标值改变。这里只改软件目标，不代表车轮已经停住。 -->

---

# C++ 把“操作哪一台”写进了调用

<div class="two-col cj2-even">
<div class="cj2-compact">
<div class="label">C · 调用时手动传地址</div>

```c
struct Motor m1;
motor_init(&m1);
m1.stop(&m1);
```

<p>初始化填好状态和函数指针。调用时，再把 <code>&amp;m1</code> 交给函数。</p>
</div>
<div v-click="1" class="cj2-compact">
<div class="label">C++ · 调用成员函数</div>

```cpp
class Motor {
    int speed = 0;
    float integral = 0;  // PID 累计值
public:
    void stop() { this->speed = 0; }
};

Motor m1;
m1.stop();
```

<p class="cj2-this-note">不用手写 <code>&amp;m1</code>，这次调用里 <code>this</code> 就指向 <code>m1</code>。</p>
</div>
</div>

<p v-click="2" class="cj2-takeaway"><strong>封装</strong>：外部可以调用 <code>m1.stop()</code>，但不能直接改 <code>m1.integral</code>。</p>

<!-- 1 分钟。对照两段的初始化和调用：C 手动传 self；C++ 用隐式的对象信息让 this 指向 m1；这说的是语言语义，不规定机器代码怎么传参。再请学生试想从外面给 integral 赋值，指出 class 的这两格默认是私有的，控制器可以只公开 update、stop 等操作。用 C 的函数指针来模拟对象式调用是一种设计办法；C++ 的普通成员函数不是每个对象里各存一份函数指针。历史上 C++ 的类思想来自 Simula，见 https://stroustrup.com/hopl2.pdf 。 -->

---

# 都叫 stop，怎么停由设备决定

<div class="cj2-compact">

```c
void request_stop(struct Motor *m) {
    m->stop(m);
}
```

</div>

<div class="cj2-branches">
  <div class="cj2-card"><div class="label">3508 · 示例绑定</div><code>request_stop(&amp;drive);</code><div v-click="1" class="cj2-case-lines">→ 请求零电流</div></div>
  <div class="cj2-card"><div class="label">位置舵机 · 示例绑定</div><code>request_stop(&amp;servo);</code><div v-click="1" class="cj2-case-lines">→ 保持当前位置</div></div>
</div>

<p v-click="1" class="cj2-takeaway"><strong>多态</strong>：上层用同一个动作名，具体实现由对象的绑定决定。和刚才的 Zephyr 取样一样。</p>

<div v-click="2" class="cj2-fleet">
  <div><strong>4</strong> 底盘</div><div><strong>2</strong> 云台</div><div><strong>3</strong> 拨弹</div>
  <p>共用一种 <code>Motor</code> 类型，建 9 份独立状态；每份按设备选自己的动作。</p>
</div>

<!-- 1 分钟。先让学生预测两个 stop 是否必须做同一件事。这里的 stop 约定是退出当前运动指令，两种动作是教学示意，不是安全急停方案；真实接口应约定各设备都能满足的行为。第二下给 4+2+3 的对象数。同类型复用数据布局，不同对象各自保存目标和控制历史。回扣指针一节：四台底盘电机也可以放进数组，但每台仍有自己的状态。 -->
