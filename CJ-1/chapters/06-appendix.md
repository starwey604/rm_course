<div class="eyebrow">附录 A · P1428 进一步提示</div>

# 外层选位置，内层只看前面

<div class="problem-link"><a href="https://www.luogu.com.cn/problem/P1428">P1428 小鱼比可爱</a> · n ≤ 100，0 ≤ a[i] ≤ 10。</div>

<div class="two-col"><div>

```c
for (int i = 0; i < n; i++) {
    int count = 0;
    for (int j = 0; j < i; j++) {
        if (a[j] < a[i]) count++;
    }
    printf("%d ", count);
}
```

</div><div>

- 内层范围是 `0 ≤ j < i`。
- 不比较自己，也不看右侧。
- 每处理一条鱼，计数重新从 0 开始。
- 第一条鱼前面没有鱼，答案为 0。

</div></div>

<!--
选讲。每个答案后输出一个空格，外层循环结束后可输出换行。完整源程序见p1428.c。所有值相等时输出全0。
-->

---

<div class="eyebrow">附录 B · P1047 状态数组</div>

# 重复标记，不会重复移除

<div class="problem-link"><a href="https://www.luogu.com.cn/problem/P1047">P1047 校门外的树</a> · L ≤ 10000，m ≤ 100。</div>

<div class="two-col code-small"><div>

```c
int removed[10005] = {0};
int u, v, answer = 0;
for (int k = 0; k < m; k++) {
    scanf("%d %d", &u, &v);
    for (int i = u; i <= v; i++)
        removed[i] = 1;
}
for (int i = 0; i <= L; i++)
    if (removed[i] == 0) answer++;
printf("%d\n", answer);
```

</div><div>

- `0`：这棵树仍在。
- `1`：这棵树已经移走。
- 区间两端都包含，所以用 `<=`。
- 总共 L + 1 个位置，从 0 数到 L。

</div></div>

<!--
选讲。输入l和m在片段之前完成。用赋值1表示集合标记，不按区间长度多次扣减。完整程序p1047.c。
-->

---

<div class="eyebrow">附录 C · 含空格的整行输入</div>

# %s 读一个词，fgets 读一行

<div class="two-col"><div>

```c
char s[100];
if (fgets(s, sizeof(s), stdin)) {
    printf("%s", s);
}
```

</div><div>

<v-clicks>

- 能读入行中的空格。
- 最多读入容量减 1 个字符，再补结束符。
- 如果读到了换行符，换行也会保存在数组里。

</v-clicks>

</div></div>

<div class="hint">刚用 <code>scanf("%d", &amp;n)</code> 读完数字？回车可能还留着。<br>紧接着的 <code>fgets</code> 会先读走这个换行，得到的这一行就只有 <code>\n</code>。</div>

<!--
选讲，不占主讲必需时间。可以从新程序直接读一行。若必须衔接scanf，用循环读取到换行或EOF来消费当前行，而不是盲目只getchar一次。不使用fflush(stdin)。
-->

---

<ProblemStatement pid="P5015" />

<!--
完整题面按洛谷原题转述，保留输入输出、全部判定规则、完整范围与官方样例。
来源：https://www.luogu.com.cn/problem/P5015
核对日期：2026-10-31。题面页可供学生独立阅读，避免只留下题名与链接。
-->

---

<div class="eyebrow">附录 D · P5015 标题统计</div>

# 统计有效字符，跳过空白

<div class="problem-link"><a href="https://www.luogu.com.cn/problem/P5015">P5015 标题统计</a> · 标题可能含英文字母、数字、空格和行末换行。</div>

<div class="two-col"><div>

```c
char s[100];
int count = 0;
if (!fgets(s, sizeof(s), stdin))
    return 1;
for (int i = 0; s[i] != '\0'; i++)
    if (s[i] != ' ' && s[i] != '\n'
        && s[i] != '\r') count++;
printf("%d\n", count);
```

</div><div>

输入：`a B2`<br>输出：`3`

<div class="question">直接用 %s 读取，<br>会遗漏后面的什么内容？</div>

</div></div>

<!--
选讲。题目可见标题长度<=5，因此数组100足够。按题目字符范围排除空格和行末符即可。\\r用于兼容不同换行表示。
-->

---

<ProblemStatement pid="P1085" />

<!--
完整题面按洛谷原题转述，保留输入输出、全部判定规则、完整范围与官方样例。
来源：https://www.luogu.com.cn/problem/P1085
核对日期：2026-10-31。题面页可供学生独立阅读，避免只留下题名与链接。
-->

---

<ProblemStatement pid="B2111" />

<!--
完整题面按洛谷原题转述，保留输入输出、全部判定规则、完整范围与官方样例。
来源：https://www.luogu.com.cn/problem/B2111
核对日期：2026-10-31。题面页可供学生独立阅读，避免只留下题名与链接。
-->

---

<div class="eyebrow">附录 E · 两道基础巩固题</div>

# 从“记录位置”和“统计比例”开始

<div class="two-col"><div>

## P1085 不高兴的津津

[打开题目](https://www.luogu.com.cn/problem/P1085)

- 读入 7 天的两项上课时长。
- 超过 8 小时才计入不高兴。
- 记录最大总时长，以及它的日期。
- 相同取最早，只在 **严格更大** 时更新。

</div><div>

## B2111 基因相关性

[打开题目](https://www.luogu.com.cn/problem/B2111)

- 两个等长字符串，同位置比较。
- 相同位置的个数除以总长度。
- 比例 **大于等于** 阈值，输出 `yes`。
- 记得按浮点数相除。

</div></div>

<!--
选讲。P1085若都不超过8小时输出0；B2111长度<=500且输出yes/no。用strcmp不能替代逐位置统计相同比例。
-->

---

<ProblemStatement pid="P1055" />

<!--
完整题面按洛谷原题转述，保留输入输出、全部判定规则、完整范围与官方样例。
来源：https://www.luogu.com.cn/problem/P1055
核对日期：2026-10-31。题面页可供学生独立阅读，避免只留下题名与链接。
-->

---

<div class="eyebrow">附录 F · ISBN 综合选做</div>

# 读取之后，再做逐字符校验

<div class="problem-link"><a href="https://www.luogu.com.cn/problem/P1055">P1055 ISBN 号码</a></div>

<v-clicks>

1. 整串读入，遍历校验位之前的字符。
2. 跳过 `-`；用 `s[i] - '0'` 取得数字值。
3. 按第 1～9 个数字，分别乘以 1～9 后求和。
4. 对 11 取模，结果为 10 时用 **X** 表示。
5. 相同输出 `Right`；不同则替换校验位，输出正确号码。

</v-clicks>

<!-- 讲师补充：这是循环、字符数组和分支的综合选做，先完成本节基础练习。 -->

<!--
选讲。仅按题目保证的格式处理。0-670-82162-4正确；末位换成0时应改回4。完整实现配套提供p1055.c。
-->

---

<div class="eyebrow">附录 G · 备选练习</div>

# 按自己还不熟的地方，选题练习

<table class="compact"><thead><tr><th>方向</th><th>题目</th><th>练习重点</th></tr></thead><tbody>
<tr><td>循环热身</td><td><a href="https://www.luogu.com.cn/problem/P5722">P5722 数列求和</a></td><td>初始化与累加</td></tr>
<tr><td>条件循环</td><td><a href="https://www.luogu.com.cn/problem/P1035">P1035 级数求和</a></td><td>停止条件、浮点数</td></tr>
<tr><td>拆位计数</td><td><a href="https://www.luogu.com.cn/problem/P1980">P1980 计数问题</a></td><td>% 10 与 / 10</td></tr>
<tr><td>循环＋数组</td><td><a href="https://www.luogu.com.cn/problem/P5727">P5727 冰雹猜想</a></td><td>保存过程、倒序输出</td></tr>
<tr><td>连续状态</td><td><a href="https://www.luogu.com.cn/problem/P1567">P1567 统计天数</a></td><td>相邻比较、连续计数</td></tr>
<tr><td>字符运算</td><td><a href="https://www.luogu.com.cn/problem/P1914">P1914 凯撒密码</a></td><td>字母移位、取模回绕</td></tr>
</tbody></table>

<!--
不要求全部完成。P1567数据量大，若保存所有数据应注意数组容量和存储位置；也可以边读边处理。P5727要保留初始值和最终1。
-->

---

<ProblemStatement pid="P5722" />

<!--
完整题面按洛谷原题转述，保留输入输出、全部判定规则、完整范围与官方样例。
来源：https://www.luogu.com.cn/problem/P5722
核对日期：2026-10-31。题面页可供学生独立阅读，避免只留下题名与链接。
-->

---

<ProblemStatement pid="P1035" />

<!--
完整题面按洛谷原题转述，保留输入输出、全部判定规则、完整范围与官方样例。
来源：https://www.luogu.com.cn/problem/P1035
核对日期：2026-10-31。题面页可供学生独立阅读，避免只留下题名与链接。
-->

---

<ProblemStatement pid="P1980" />

<!--
完整题面按洛谷原题转述，保留输入输出、全部判定规则、完整范围与官方样例。
来源：https://www.luogu.com.cn/problem/P1980
核对日期：2026-10-31。题面页可供学生独立阅读，避免只留下题名与链接。
-->

---

<ProblemStatement pid="P5727" />

<!--
完整题面按洛谷原题转述，保留输入输出、全部判定规则、完整范围与官方样例。
来源：https://www.luogu.com.cn/problem/P5727
核对日期：2026-10-31。题面页可供学生独立阅读，避免只留下题名与链接。
-->

---

<ProblemStatement pid="P1567" />

<!--
完整题面按洛谷原题转述，保留输入输出、全部判定规则、完整范围与官方样例。
来源：https://www.luogu.com.cn/problem/P1567
核对日期：2026-10-31。题面页可供学生独立阅读，避免只留下题名与链接。
-->

---

<ProblemStatement pid="P1914" />

<!--
完整题面按洛谷原题转述，保留输入输出、全部判定规则、完整范围与官方样例。
来源：https://www.luogu.com.cn/problem/P1914
核对日期：2026-10-31。题面页可供学生独立阅读，避免只留下题名与链接。
-->

---

<div class="eyebrow">附录 · sizeof 与数组容量</div>

# 用 sizeof 计算数组的元素个数

<div class="two-col"><div>

```c
int a[] = {34, 12, 56, 9, 45};
int capacity =
    sizeof(a) / sizeof(a[0]);
```

<div class="answer">capacity 的结果是 5。</div>

</div><div>

<div class="sizeof-guide"><strong>sizeof(a)</strong><br>整个数组占用的字节数<br><br><strong>sizeof(a[0])</strong><br>一个元素占用的字节数</div>

</div></div>

<div class="question">总字节数 ÷ 一个元素的字节数 = 数组的元素总数。<br>它算的是<strong>容量</strong>；只处理前 n 个数据时，循环仍然用 <code>i &lt; n</code>。</div>

<!--
选讲或课后阅读。此式直接作用于当前定义的数组，不推广到指针或数组形参。sizeof以字节计，不依赖int固定为4字节。
-->

---

<div class="eyebrow">附录 H · 内容与素材来源</div>

# 继续阅读

- 课程知识范围：`4.循环结构.pdf`、`6.数组与字符串.pdf`。
- 开场衔接：`CONE_C语言_金石滩_L1.pptx`。
- CONE / RM 标识及配色：`CONE-EC 2024 - Lecture 2 - C Arrays.pptx`。
- [scanf 格式串规则](https://learn.microsoft.com/en-us/cpp/c-runtime-library/format-specification-fields-scanf-and-wscanf-functions) 与 [类型说明](https://learn.microsoft.com/en-us/cpp/c-runtime-library/scanf-type-field-characters)。
- [C++ print / println 标准草案](https://eel.is/c++draft/print.fun)。
- 题目链接随题目给出；讲师备注中保留时间与补充说明。

<!--
原始CONE/RM标识保持原比例。页面上的执行示意为教学组件，代码有对应的可运行源文件。本课不使用原课件中的Harvard、edX、CS50标识。
-->
