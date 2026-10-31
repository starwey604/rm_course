---
clicks: 2
---

<div class="eyebrow">04 · 字符串 · 85–110 分钟</div>

# 字符串，是带结束标记的字符数组

<div class="read-code">char s[] = "RM";</div>

<MemoryDemo kind="string" :step="$clicks" />

<!-- 讲师补充：双引号初始化字符串时，编译器会自动补上 \0。 -->

<!--
约2分钟。一个char占一个字节；R、M、结束符共3个char。对比char s[]={'R','M'}没有结束符，不能当成完整字符串交给%s或strlen处理。
-->

---

<div class="eyebrow">04 · 内容长度与数组容量</div>

# 房间有 20 格，住进去了几个字符？

```c
char s[20] = "RM";
```

<div class="two-col string-size-comparison">
<div><div class="string-size-formula"><code>strlen(s)</code></div><div class="label">有效字符数，不含结束符</div><div v-click class="hero-number">2</div><p>R、M，两个有效字符。</p></div>
<div><div class="string-size-formula"><code>sizeof(s)</code></div><div class="label">整个数组占用的字节数</div><div v-click class="hero-number">20</div><p>剩下的空位也占空间。</p></div>
</div>

<!--
约2分钟。strlen需要<string.h>，返回size_t；直接printf这两个表达式时用%zu，避免在主页面先引入新类型名。不能对没有结束符的数组调用strlen。
char s[20]="RM"初始化时余下格子也补零。sizeof在此作用于数组本身，函数参数情形后续学习。
-->

---

<div class="eyebrow">04 · 字符串输入</div>

# 20 个格子，为什么只能读 19 个字符？

<div class="two-col"><div>

```c
char name[20];
scanf("%19s", name);
printf("%s\n", name);
```

<div class="teaching-anchor spaced">这里传 <code>name</code>，不写 <code>&amp;name</code>。<br>在这次调用里，<code>name</code> 已经给出<br><strong class="key-point">第 0 格 <code>name[0]</code> 的地址</strong>，<br>所以不用再取一次地址。</div>
</div><div>
<div class="capacity-bar"><span>最多 19 个输入字符</span><b>\0</b></div>
<p v-click class="spaced">最后一格留给结束符。<br>不限制宽度，超长输入可能写出数组边界，破坏其他数据。</p>
</div></div>

<div v-click class="question">输入 RM Studio，%s 会读到哪里？ <strong>RM</strong>，遇空白就停。</div>

<!--
约2分钟。scanf完整程序仍检查返回值。name在此提供首元素位置，不展开数组退化与指针类型。宽度限制按字节匹配，本页用英文字符；宽度19不会消费后续所有输入，只读最多19个字符。
%s跳过开头空白，遇后续空格、制表符或换行停止。原讲义提到gets，本课不用，含空格输入随后用扫描集讲解，附录另给fgets方法。越界写入后果不确定，不保证一定“撞碎旁边变量”。
-->

---
clicks: 2
class: scanf-line
---

<div class="eyebrow">04 · 让空格也成为内容</div>

# 用 %[^\n] 读到行末，保留中间的空格

<div class="teaching-anchor">从一个新程序开始，直接输入 <code>RM Studio</code> 并按回车。</div>

<div class="two-col code-small"><div>

```c
char line[20];
int matched =
    scanf("%19[^\n]", line);
if (matched == 1) {
    printf("[%s]\n", line);
}
```

<div v-click="1" class="output spaced">[RM Studio]</div>

</div><div class="scanf-explanation">
<div><strong>19</strong>：最多读 19 个字符，<br>剩 1 格存结束符 <code>\0</code>。</div>
<div><strong>[^\n]</strong>：读取“不是换行”的字符，<br>所以<strong class="key-point">空格也会保存</strong>。</div>
<div v-click="2">遇到换行或读满 19 个字符就停。<br>成功后补 <code>\0</code>，<strong class="key-point">换行不会被读走</strong>。</div>
</div></div>

<div class="teaching-anchor spaced">若一开始就遇到换行，<code>matched</code> 为 0，未读入字符串；<br>先检查成功项数，再使用数组里的内容。超过宽度的部分也会留在输入中。</div>

<!--
约1分钟。这个例子从新程序直接输入，先不混用数值输入，保留行首与行中空格。扫描集不自动跳过开头空白；第一字符为换行时匹配失败，返回0。若起始即EOF则返回EOF，不能笼统说所有失败都返回0。
19按字节计，本课示例均用ASCII字符。扫描集至少成功读入1个字符才会赋值并补结束符；读取达到宽度时，行的剩余内容也仍未消费，因此不能无条件说读完了任意长整行。
来源：https://learn.microsoft.com/en-us/cpp/c-runtime-library/scanf-width-specification
来源：https://learn.microsoft.com/en-us/cpp/c-runtime-library/format-specification-fields-scanf-and-wscanf-functions
-->

---
clicks: 2
class: scanf-newline
---

<div class="eyebrow">04 · 先读数字，再读文本</div>

# 刚读完数字，为什么文本还没输就失败了？

<div class="teaching-anchor">输入两行：<code>18↵</code>、<code>RM Studio↵</code>。这里 <code>↵</code> 表示回车产生的换行。</div>

<div class="two-col code-small"><div>
<div class="label">没有跳过空白：下一次先遇到剩下的换行</div>

```c
int age;
char name[20];
scanf("%d", &age);
int matched =
    scanf("%19[^\n]", name);
```

<div v-click="1" class="teaching-anchor spaced"><code>%d</code> 读走 18，换行还留着。<br><code>[^\n]</code> 立即遇到换行，<code>matched == 0</code>。</div>

</div><div>
<div class="label">只想读下一条非空文本：在格式串开头加空格</div>

```c
// 替换左边第二次 scanf
scanf(" %19[^\n]", name);
```

<div v-click="2" class="teaching-anchor spaced">格式串最前面的空格，会先跳过<br>连续的空格、Tab 和换行，<br>再读到 <code>RM Studio</code>。</div>
</div></div>

<div class="scanf-takeaway"><strong>按任务选择：</strong>这个空格也会丢掉行首空格、跨过空行。<br>需要保留这些内容时，先处理前一次输入留下的换行，再读取；附录有 <code>fgets</code> 的方法。</div>

<!--
约1分钟。演示代码按给出的合法两行输入说明读取位置，完整示例scanf_line_after_number.c检查两次返回值。格式串中的空白匹配任意个连续空白，不是只消费一个回车；不要教把空格加在所有格式串前。
前缀空白不适合要求保留行首缩进、空行的输入，也不适合读取作为数据的空格字符。不要在格式串末尾加换行来“清回车”；不要用fflush(stdin)。需保留整行结构时可先循环消费当前行余下内容到换行或EOF，再用fgets读取下一行，附录讲师备注已有此建议。
来源：https://learn.microsoft.com/en-us/cpp/c-runtime-library/format-specification-fields-scanf-and-wscanf-functions
-->

---
class: scanf-summary
---

<div class="eyebrow">04 · scanf 一页速查</div>

# 先看要读什么，再选格式串

<div class="scanf-summary-vars"><code>int n;　float f;　double x;　char ch, s[20];</code></div>

<table class="scanf-summary-table"><thead><tr><th>读取目标</th><th>调用示例</th><th>空白与停止规则</th></tr></thead><tbody>
<tr><td>整数 <code>%d</code></td><td><code>scanf("%d", &amp;n);</code></td><td>跳过开头空白，按整数格式读取。</td></tr>
<tr><td>float · <code>%f</code></td><td><code>scanf("%f", &amp;f);</code></td><td>跳过开头空白，读入 <code>float</code>。</td></tr>
<tr><td>double · <code>%lf</code></td><td><code>scanf("%lf", &amp;x);</code></td><td>跳过开头空白，读入 <code>double</code>。</td></tr>
<tr><td>一个字符 <code>%c</code></td><td><code>scanf("%c", &amp;ch);</code></td><td><strong class="key-point">不跳空白</strong>，空格、换行也会读入。</td></tr>
<tr><td>非空白字符</td><td><code>scanf(" %c", &amp;ch);</code></td><td>先跳过连续空白，再读一个字符。</td></tr>
<tr><td>一个词 <code>%s</code></td><td><code>scanf("%19s", s);</code></td><td>跳过开头空白；再遇空白或满 19 个就停。</td></tr>
<tr><td>含空格的文本</td><td><code>scanf("%19[^\n]", s);</code></td><td><strong class="key-point">不跳空白</strong>；遇换行或满 19 个就停。</td></tr>
</tbody></table>

<div class="scanf-summary-rules"><strong>传什么：</strong>数值、单个字符传 <code>&amp;变量</code>；字符数组传数组名。<br><strong>字符串：</strong><code>%s</code>、<code>%[...]</code> 成功时补 <code>\0</code>，宽度至多为容量 − 1；<code>%c</code> 不补。</div>
<div class="scanf-summary-literal">格式串里的 <code>-</code> 要原样匹配；开头的空格表示跳过空白。仍要检查 <code>scanf</code> 的返回值。</div>

<!--
约1分钟，作为前面例子的统一速查，不再逐个展开。空白包括空格、Tab、换行。表中%c按默认宽度1讲解；不引入多字符%c。数值转换在不符合该类型格式时也会停止或失败。
重申输入float用%f、double用%lf；printf输出这两种用%f。数组名在这些调用中提供首元素地址，并不等于“数组就是指针”。扫描集格式在C字符串中使用反斜杠n，运行时代表换行字符。
来源：https://learn.microsoft.com/en-us/cpp/c-runtime-library/scanf-type-field-characters
来源：https://learn.microsoft.com/en-us/cpp/c-runtime-library/scanf-width-specification
来源：https://learn.microsoft.com/en-us/cpp/c-runtime-library/format-specification-fields-scanf-and-wscanf-functions
-->

---

<div class="eyebrow">04 · 回访开头的 ISBN</div>

# 这次，把原文完整保存下来

<div class="two-col"><div>

```c
char isbn[14];
if (scanf("%13s", isbn) != 1) {
    return 1;
}
printf("%s\n", isbn);
```

</div><div>

<v-clicks>

- 连字符不是空白，`%s` 会把它一起读入。
- 13 个可见字符，加 1 个结束符。
- 分组中的前导零，保持原样。

</v-clicks>

</div></div>

<!-- 讲师补充：分段读取适合分别处理各字段；整串保存适合保留原文、逐字符检查。 -->

<!--
约1分钟。此处严格针对P1055保证格式的13字符输入，数组14格。书号作为文本保存不等于把整个书号当成整数。
题目：https://www.luogu.com.cn/problem/P1055
-->

---

<ProblemStatement pid="P5733" />

<!--
完整题面按洛谷原题转述，保留输入输出、全部判定规则、完整范围与官方样例。
来源：https://www.luogu.com.cn/problem/P5733
核对日期：2026-10-31。题面页可供学生独立阅读，避免只留下题名与链接。
-->

---
clicks: 3
---

<div class="eyebrow">04 · P5733 · 从三问搭出逐字符处理框架</div>

# 先找该改的字符，再决定怎样更新

<ReasoningModel kind="uppercase" :step="$clicks" />

<!--
约1分钟。保存文本与位置、判断结束和小写范围、修改当前字符再移动下标。代码片段的①～③与下一页完整程序一致，保持空白，不提前给出表达式。
先按自然语言确定代码各部分的任务；下一页保留完整5分钟独立填空。重点区分遍历结束条件与“是否需要转换”的分支条件。
-->

---
clicks: 6
---

<div class="eyebrow">04 · P5733 动手填空 · 5 分钟</div>

# 只改小写字母，三个空怎么填？

<FillExercise kind="uppercase" :step="$clicks" />

<!--
填空前追问：保存什么（字符串s与下标i）？判断什么（是否结束、是否小写字母）？更新什么（当前字符与下标）？
留完整5分钟。每空先单击给提示，再单击把答案填回左侧代码，共6次点击；回退时先恢复空白，再隐藏提示。PDF保持空白。①s[i] != '\0' ②s[i] >= 'a' && s[i] <= 'z' ③'a' - 'A'。
学生不必重新搭建main和输入输出。检查是否误用||、是否连数字和大写字母一起改。
自测abc→ABC；ABC→ABC；a1Z→A1Z。
-->

---

<div class="eyebrow">04 · P5733 讲评</div>

# 不用背 32，让字母自己告诉你差多少

<div class="two-col code-small"><div>

```c
char s[101];
scanf("%100s", s);
for (int i = 0; s[i] != '\0'; i++) {
    if (s[i] >= 'a' && s[i] <= 'z') {
        s[i] = s[i] - ('a' - 'A');
    }
}
printf("%s\n", s);
```

</div><div>
<div class="large mono">'a' − 'A'</div>
<p>算出小写与大写的距离，<br>不用死记编码差值。</p>
<div v-click class="question">Rm2026 逐个走一遍：<br>R 保留，m 改成 M，数字保留。</div>
</div></div>

<!--
约2分钟。使用常见ASCII兼容教学环境，字母连续且大小写差固定。只对小写范围内的字符使用该公式；不对所有字符直接减常数。字符串原地修改，结束符不变。
完整可运行文件包含输入检查，见examples/p5733.c。
-->

---

<div class="eyebrow">04 · &lt;string.h&gt; 的工具</div>

# 复制与比较，用不同的函数

<div class="two-col"><div>

```c
char src[] = "RM";
char dst[20];
strcpy(dst, src);
printf("%s\n", dst);
```

<div v-click="1" class="answer">R、M 和结束符一起复制过去。</div>

</div><div>

```c
if (strcmp(dst, "RM") == 0) {
    printf("same\n");
}
```

<div v-click="2" class="answer">strcmp 逐字比较内容；<br>返回 <strong>0</strong> 表示完全相同，<br>可以记成“0 差异”。</div>

</div></div>

<div class="teaching-anchor spaced"><strong>为什么不能用 <code>dst == "RM"</code> 比内容？</strong><br>这里的 <code>==</code> 比的是地址：是不是同一个“房间”；<br><code>strcmp</code> 比的是字符：房间里装的字是不是一样。</div>

<!-- 讲师补充：strcpy目标空间必须能容纳原文和结束符。本例dst20格，复制RM需3格。strcmp不相等时看返回值正负，不保证±1。 -->

<!--
约2分钟。strcpy会复制结束符。补充strcmp按首个不同字符比较，负数表示左边更小，正数表示更大；不把字符串==当成内容比较。
-->

---

<ProblemStatement pid="B2112" />

<!--
完整题面按洛谷原题转述，保留输入输出、全部判定规则、完整范围与官方样例。
来源：https://www.luogu.com.cn/problem/B2112
核对日期：2026-10-31。题面页可供学生独立阅读，避免只留下题名与链接。
-->

---

<div class="eyebrow">04 · strcmp 的应用 · B2112</div>

# 石头剪子布：先判断是否平局

<div class="problem-link"><a href="https://www.luogu.com.cn/problem/B2112">B2112 石头剪子布</a> · 每组输入为 Rock、Scissors 或 Paper，区分大小写。</div>

<div class="two-col"><div>

```c
char a[10], b[10];
scanf("%9s %9s", a, b);
if (strcmp(a, b) == 0) {
    printf("Tie\n");
}
```

</div><div>

<v-clicks>

- 平局之后，列出 Player1 获胜的三种组合。
- 其余情况由 Player2 获胜。
- 第一行给出组数 N，需要循环处理 N 组。

</v-clicks>

</div></div>

<!-- 讲师补充：输出严格使用 Player1、Player2 或 Tie，每组一行。 -->

<!--
约2分钟，完整实现留课后。规则Rock胜Scissors、Scissors胜Paper、Paper胜Rock。此页只展示平局判断片段。
题目：https://www.luogu.com.cn/problem/B2112
-->

---

<ProblemStatement pid="EX-PAL" />

---
clicks: 4
---

<div class="eyebrow">04 · 回文字符串</div>

# 从两端，向中间比较

<div class="read-code">char s[] = "level";</div>

<MemoryDemo kind="pal" :step="$clicks" />

<!-- 讲师补充：左右下标分别从 0 和 strlen(s) - 1 开始。 -->

<!--
约2分钟。只在left<right时比较。结束符不是最后一个待比较字符，最后有效下标是4。配合下一页的失败路径检查。
-->

---

<div class="eyebrow">04 · 回文判断的失败路径</div>

# robot 的第一对就不同，还要往里比吗？

<div class="two-col code-small"><div>

```c
int length = strlen(s);
int left = 0, right = length - 1;
int ok = 1;
while (left < right) {
    if (s[left] != s[right]) {
        ok = 0;
        break;
    }
    left++;
    right--;
}
```

</div><div>
<div class="large mono"><strong>r</strong> o b o <strong>t</strong></div>
<p v-click class="spaced">r 和 t 不同，已经能确定：<br>不是回文，直接 break。</p>
<div v-click class="question">只有一个字符呢？<br>left 和 right 一开始相等，<br>不进循环，ok 仍然是 1。</div>
</div></div>

<!--
约1分钟。字符串示例长度至多100，int可容纳strlen的结果。先赋给int length再减1，避免无符号减法，主页面不额外引入强制转换。对有结束符的空串length=0也不会进入循环。
level两对相同后相遇；abccba三对相同后交错；可口头追问。完整示例palindrome.c用if/else输出。
-->
