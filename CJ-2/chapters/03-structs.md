<div class="eyebrow">03 · 结构体 · 75–105 分钟</div>

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

<!-- 2 分钟。让学生试着口述五个参数的更新函数；再问把第三台传进去时抄错一个编号会怎样。这里是教学数据模型。 -->

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

# 同一种类型，两份电机数据

<MotorType :step="$clicks" />

<!-- 3 分钟。先只展示类型；点击两次分别创建第三轮和第四轮的记录。让学生预测给 m.speed 赋值会不会影响另一台，再点一次核对。最后指着 m 追问：把这一整份数据交给函数，函数改的是哪一份？ -->

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

<!-- 3 分钟。请学生复用前面的两房间图：现在每边是一个 Motor，而不是一个 int。 -->

---
clicks: 3
---

# 拿到整台电机的地址，只改其中一格

<MemoryRooms mode="struct" :step="$clicks" />

<!-- 5 分钟。点击依次交出 &m、改 speed、结束调用。对比 int *p 和 struct Motor *p 指向的东西。示例初始化只写首成员，其余为零；配套 chassis.c 用逐字段赋值便于检查温度保持不变。 -->

---

# 有箱子用点，有地址用箭头

<div class="two-col">
<div class="cj2-card">
<div class="label">手里是电机 m</div>
<p><code>m.speed = 0;</code></p>
<div class="label">手里是地址 p</div>
<p><code>(*p).speed = 0;</code></p>
<p><code>p-&gt;speed = 0;</code></p>
</div>
<div>
<p class="statement">箭头做两件事：<br>先沿着地址找到电机，再选 <code>speed</code>。</p>
<div v-click class="question">第三台是 <code>motors[2]</code>。把它交给 <code>control_motor</code>，括号里写什么？</div>
<div v-click class="answer"><code>control_motor(&amp;motors[2]);</code></div>
</div>
</div>

<!-- 3 分钟。等价式保留括号；不展开运算符优先级表。说明 motors 声明为 struct Motor motors[4]。 -->

---

<div class="eyebrow">随堂 · 把同一个人的成绩放在一起</div>

# P5742 · 评等级

读入 `N` 条记录：学号、学业分和素质拓展分。两科**总分大于 140**，并且 **70% 学业分 + 30% 素拓分不低于 80**，才输出 `Excellent`；否则输出 `Not excellent`。每人一行。

<div class="io-pair"><div><div class="label">课堂样例 · 输入</div><pre>2
101 95 45
102 80 80</pre></div><div><div class="label">输出</div><pre>Not excellent
Excellent</pre></div></div>

[洛谷 P5742 原题](https://www.luogu.com.cn/problem/P5742) · `1 ≤ N ≤ 1000`，学号不超过 `100000`，两科成绩不超过 `100`。

<!-- 3 分钟。题面用 C++ 成员函数描述；C 版用普通函数接收学生地址。示例刻意让两人的加权分都为 80。 -->

---

# 补完 is_excellent：指针进来，判断出去

<div class="two-col wide-left">
<div class="cj2-compact">

```c
struct Student {
    int id, academic, activity;
    double weighted;  // 综合分，读入后算好
};

int is_excellent(const struct Student *s) {
    int a = [①];
    int b = s->activity;
    return [②] && [③];
}
```

</div>
<div class="cj2-compact">
<div class="label">动手 · 5 分钟</div>

```c
// main 里，读入当前的 student 后：
if (is_excellent([④]))
    puts("Excellent");
else
    puts("Not excellent");
```

<p class="spaced">函数只看分数，不改记录。参数里的 <code>const</code> 表示不通过 <code>s</code> 修改记录。</p>

<div v-click class="hint">加权分的式子和阈值一起乘 10，就能用整数比大小。</div>
</div>
</div>

<!-- 5 分钟。给 examples/p5742_fill.txt，复制为 .c，替换四处占位值后即可编译。让学生先圈出实参是整份记录还是它的地址。 -->

---

# 同样是 80 分，为什么一个没过？

<div class="two-col">
<div>

```c
int is_excellent(const struct Student *s) {
    int a = s->academic;
    int b = s->activity;
    return a + b > 140 &&
           7 * a + 3 * b >= 800;
}
```

<p class="spaced">④ 传 <code>&amp;student</code>，判断函数用箭头读出两科成绩。</p>

</div>
<div>

| 学业 / 素拓 | 总分 | 加权 × 10 | 结果 |
| --- | --- | --- | --- |
| 95 / 45 | 140 | 800 | 未过 |
| 80 / 80 | 160 | 800 | 优秀 |
| 79 / 80 | 159 | 793 | 未过 |

</div>
</div>

<!-- 4 分钟。学生解释哪一列挡住了每个未过样例。对照 > 与 >=；不给浮点精度另开支线。 -->
