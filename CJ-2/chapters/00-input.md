<div class="eyebrow">上节课回访 · 上台改错 1 / 3</div>

# 读一个字符，还是读一个单词？

<p class="cj2-input-stat">作业窗口内，三道字符串题的失败率是 <strong>59.3%</strong>，其余七题是 <strong>58.5%</strong>。但做过这三题的 35 人里，有 <strong>18 人</strong>写过有问题的输入行。</p>

<div class="two-col cj2-input-compare">
<div class="cj2-compact">
<div class="label">错误 · 请同学上台改</div>

```c
char a[501], b[501];
scanf("%c%c", a, b);
```

<p>要把两条序列都读完整。</p>

```c
char s[101];
scanf("%100s", &s);
```

<p>要读一个最多 100 个字符的单词。</p>
</div>
<div class="cj2-compact">
<div class="label">改完再揭晓</div>

<div v-click="1">

```c
char a[501], b[501];
scanf("%500s %500s", a, b);
```

<p><code>%c</code> 默认只读一个字符，不补 <code>\0</code>；<code>%s</code> 读到空白为止，并补上 <code>\0</code>。</p>
</div>

<div v-click="2">

```c
char s[101];
scanf("%100s", s);
```

<p>这里 <code>s</code> 给出首字符地址。<code>&amp;s</code> 是整个数组的地址，类型不对，能过也要改。</p>
</div>
</div>
</div>

<!-- 2 分钟。统计为用户提供的作业窗口汇总，18/35 按人去重，约 51%。不把失败率接近解释成失败原因相同，也不把 %s 配 & 说成一定会挂：通过的代码也可能有类型隐患。示例按提交中的错法匿名改写。C11 草案 N1570 §6.3.2.1、§7.21.6.2。 -->

---

<div class="eyebrow">上节课回访 · 上台改错 2 / 3</div>

# Scissors 有 8 个字母，为什么 8 格不够？

<div class="two-col cj2-input-compare">
<div class="cj2-compact">
<div class="label">错误 · 要完整读进 Scissors</div>

```c
char s[8];
scanf("%s", s);
```

<p>请上台改两处：数组开几格？<code>%s</code> 最多读几个字符？</p>
</div>
<div v-click="1" class="cj2-compact">
<div class="label">正确 · 留一格给结束符</div>

```c
char s[9];
scanf("%8s", s);
```

<p><code>%8s</code> 最多读 8 个字符。最后一格留给 <code>\0</code>。</p>
</div>
</div>

<div v-click="1" class="cj2-input-cells" aria-label="Scissors 占八格，结束符占第九格">
<code>S</code><code>c</code><code>i</code><code>s</code><code>s</code><code>o</code><code>r</code><code>s</code><code>\0</code>
</div>

<!-- 1 分钟。学生容易只改数组大小。让他同时补读入宽度；宽度不包含结束符。这里只处理题目给的单词。 -->

---

<div class="eyebrow">上节课回访 · 上台改错 3 / 3</div>

# 格式串要和变量类型对上

<div class="two-col cj2-input-compare">
<div class="cj2-compact">
<div class="label">错误 · 读 0.75 和局数 3</div>

```c
double threshold;
scanf("%d\n", &threshold);
```

<p>读的是 <code>double</code>，末尾还多了一个换行。</p>

```c
int n;
scanf("%s", n);
```

<p>这次只需要读一个整数。</p>
</div>
<div class="cj2-compact">
<div class="label">改完再揭晓</div>

<div v-click="1">

```c
double threshold;
scanf("%lf", &threshold);
```

<p><code>%lf</code> 配 <code>double</code> 的地址。末尾的 <code>\n</code> 会继续跳过空白，交互时可能还在等输入。</p>
</div>

<div v-click="2">

```c
int n;
scanf("%d", &n);
```

<p><code>%d</code> 配 <code>int</code> 的地址；<code>%s</code> 是用来读字符串的。</p>
</div>
</div>
</div>

<!-- 2 分钟。依次请同学改格式串和参数；scanf 格式串末尾的空白会一直读到下一个非空白字符（该字符留给下一次读入）或 EOF，并非多吃一个字符。讲的是这些题的分词读入；输入数值不写 %.2lf，那个精度写法属于 printf。C11 草案 N1570 §7.21.6.2。 -->
