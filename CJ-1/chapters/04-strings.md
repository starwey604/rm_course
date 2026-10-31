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

<div class="two-col">
<div><div class="label">strlen(s)：数到结束符前为止</div><div v-click class="hero-number">2</div><p>R、M，两个有效字符。</p></div>
<div><div class="label">sizeof(s)：整个数组占多少字节</div><div v-click class="hero-number">20</div><p>剩下的空位也占空间。</p></div>
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

<div class="teaching-anchor spaced">这里传 <code>name</code>，不写 <code>&amp;name</code>。<br>在这次调用里，<code>name</code> 已经给出<br><strong>第 0 格 <code>name[0]</code> 的地址</strong>，<br>所以不用再取一次地址。</div>
</div><div>
<div class="capacity-bar"><span>最多 19 个输入字符</span><b>\0</b></div>
<p v-click class="spaced">最后一格留给结束符。<br>不限制宽度，超长输入可能写出数组边界，破坏其他数据。</p>
</div></div>

<div v-click class="question">输入 RM Studio，%s 会读到哪里？ <strong>RM</strong>，遇空白就停。</div>

<!--
约2分钟。scanf完整程序仍检查返回值。name在此提供首元素位置，不展开数组退化与指针类型。宽度限制按字节匹配，本页用英文字符；宽度19不会消费后续所有输入，只读最多19个字符。
%s跳过开头空白，遇后续空格、制表符或换行停止。原讲义提到gets，本课不用，含空格输入在附录fgets讲解。越界写入后果不确定，不保证一定“撞碎旁边变量”。
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

<div class="eyebrow">04 · P5733 动手填空 · 5 分钟</div>

# 只改小写字母，三个空怎么填？

<FillExercise kind="uppercase" :step="$clicks" />

<!--
填空前追问：保存什么（字符串s与下标i）？判断什么（是否结束、是否小写字母）？更新什么（当前字符与下标）？
留完整5分钟，卡住时再给提示。①s[i] != '\0' ②s[i] >= 'a' && s[i] <= 'z' ③'a' - 'A'。
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
