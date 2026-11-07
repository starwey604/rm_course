<div class="eyebrow">02 · 指针 · 30–65 分钟</div>

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

<!-- 4 分钟。让学生先投票，编译运行 chassis.c 的“值传”一行，再揭晓。void 表示这个函数不交回结果。清零的是目标值。 -->

---
clicks: 3
---

# 同名的 speed，是两格数据

<MemoryRooms mode="value" :step="$clicks" />

<!-- 6 分钟。依次点击：复制值、改参数、结束调用。往回点一次让学生指出改的是哪一格。局部名字只在各自函数中使用；名字相同也不会合并。 -->

---

# 把门牌号交给函数

<div class="two-col">
<div>

```c
int speed = 9600;
int *p = &speed;

*p = 0;
```

</div>
<div>

<p><code>&amp;speed</code>：取 <code>speed</code> 的地址。</p>
<p v-click><code>int *p</code>：声明 <code>p</code>，它能保存 <code>int</code> 的地址。</p>
<p v-click><code>*p = 0</code>：顺着 <code>p</code> 的地址找到那一格，写入 0。</p>

</div>
</div>

<div v-click class="question">声明里的 <code>*</code> 说「是什么」；赋值里的 <code>*</code> 说「去哪一格」。</div>

<!-- 6 分钟。现场问 p 和 *p 哪个是地址。强调先让 p 指向一个仍可用的 int，再解引用；没存地址的 p 不能用来写。 -->

---
clicks: 3
---

# 传过去的还是副本，这次复制的是地址

<MemoryRooms mode="pointer" :step="$clicks" />

<!-- 6 分钟。第一下看 0x1000 进 p；第二下对照左边语句，只改 main 的值，p 里的地址没动；第三下退出。用同一初值对比上一页的按值版本。 -->

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

<div class="question">两个调用都要往外面的格子写。左边地址怎么拿到？右边先猜，最后 15 分钟揭晓。</div>

<!-- 3 分钟。让学生指出左边传的是 int 的地址；别在这里开讲数组形参。 -->

---

# 两个轮子的目标值写反了，怎么换回来？

<div class="two-col">
<div>

```c
void swap(int *a, int *b) {
    int tmp = [①];
    [②] = *b;
    *b = [③];
}

// main 里：left = 8000, right = -8000
swap(&left, &right);
```

</div>
<div>

<div class="eyebrow">动手 · 5 分钟</div>

先在纸上画两个速度格。直接把右边盖到左边，哪个值会丢？

<p v-click class="hint">先把左边旧值保存在 <code>tmp</code>，再改原件。</p>

</div>
</div>

<!-- 5 分钟。先让同桌核对三个空，再翻页；不要用地址本身参与交换。 -->

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

<p v-click class="question">地址传一个就能改一个速度。要同时更新转速、电流、角度、温度和状态，难道要传五个地址？</p>

<!-- 5 分钟。请一位同学指出中间那行为什么两格一样，另一位解释 tmp 保存了什么。用正负两个值检查是否真的交换。 -->

---

<div class="section-break">
<div class="eyebrow">65–75 分钟</div>
<h1>休息 10 分钟</h1>
<p>还绕在 <code>speed</code>、<code>&amp;speed</code>、<code>*p</code> 之间？<br>把那两个格子画给助教看，一起指认哪个是地址、哪个是值。</p>
</div>
