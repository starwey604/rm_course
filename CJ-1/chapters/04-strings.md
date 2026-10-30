---
clicks: 2
---

<div class="eyebrow">04 · 字符串 · 85–110 分钟</div>

# 字符串，是带结束标记的字符数组

<div class="read-code">char s[] = "RM";</div>

<MemoryDemo kind="string" :step="$clicks" />

<div class="note">双引号初始化字符串时，编译器会自动补上 <strong>\0</strong>。</div>

<!--
约2分钟。一个char占一个字节；R、M、结束符共3个char。对比char s[]={'R','M'}没有结束符，不能当成完整字符串交给%s或strlen处理。
-->

---

<div class="eyebrow">04 · 长度、容量与结束符</div>

# strlen 和 sizeof，回答不同的问题

<div class="two-col"><div>

```c
#include <string.h>

char s[20] = "RM";
printf("%zu\n", strlen(s));
printf("%zu\n", sizeof(s));
```

</div><div>

<v-clicks>

- `strlen(s)` 是 **2**，不包含结束符。
- `sizeof(s)` 是 **20**，这是整个数组的存储空间。
- `'\0'` 是空字符；`'0'` 是可见数字字符，两者不同。

</v-clicks>

</div></div>

<div class="note">这两个表达式返回 size_t，示例用 <code>%zu</code> 输出。</div>

<!--
约2分钟。不对未正确终止的数组调用strlen。数组传入函数之后sizeof的含义留待后续。%zu只作返回类型对应的格式说明。
-->

---

<div class="eyebrow">04 · 字符串输入</div>

# 读入前，先留好结束符的位置

```c
char name[20];
if (scanf("%19s", name) != 1) {
    return 1;
}
printf("%s\n", name);
```

<v-clicks>

- 最多读入 **19 个字符**，再补 1 个结束符。
- 这里传 `name`，不写 `&name`。
- `%s` 在空格、制表符、换行处停止。

</v-clicks>

<div class="note">字符数组空间不足时，不能继续向后写入。</div>

<!--
约2分钟。说明name在此会给出首元素位置，不在本节深入数组退化和指针类型。原讲义提到gets，本课不使用；含空格输入放附录fgets。
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

<div class="note">分段读取适合分别处理各字段；整串保存适合保留原文、逐字符检查。</div>

<!--
约1分钟。此处严格针对P1055保证格式的13字符输入，数组14格。书号作为文本保存不等于把整个书号当成整数。
题目：https://www.luogu.com.cn/problem/P1055
-->

---

<div class="eyebrow">04 · 随堂练习三 · P5733</div>

# 自动修正：只改小写字母

<div class="problem-link"><a href="https://www.luogu.com.cn/problem/P5733">打开 P5733 自动修正</a></div>

输入长度不超过 100、没有空格的字符串。把所有小写字母转换成大写，其他字符保持原样。

<div class="io-pair"><div><div class="label">输入</div><pre>Rm2026</pre></div><div><div class="label">输出</div><pre>RM2026</pre></div></div>

<div class="question">怎么判断当前字符需要修改？数字要不要改？</div>

<!--
约1分钟。例子为课堂自测。讲解基于ASCII兼容环境，大小写字母的编码差一致。不要对所有字符无条件减32，优先写'a'与'A'的差。
题目：https://www.luogu.com.cn/problem/P5733
-->

---

<div class="eyebrow">04 · 独立完成 · 5 分钟</div>

# 遍历字符数组，修改当前字符

<v-clicks>

1. 数组至少留出 101 格，读入宽度最多 100。
2. 从 `s[0]` 遍历，遇到 `'\0'` 停止。
3. 只有满足 `'a' <= s[i] && s[i] <= 'z'` 才转换。

</v-clicks>

<div class="hint">自测：<code>abc</code>、<code>ABC</code>、<code>a1Z</code>。确认大写字母和数字保持不变。</div>
<div class="exercise-time">05:00</div>

<!--
留完整5分钟。提示按需要出现。助教检查条件中是否用&&、数组容量是否多留结束符、是否只转换小写字母。
-->

---

<div class="eyebrow">04 · P5733 讲评</div>

# 判断范围，再修改字符

```c
char s[101];
if (scanf("%100s", s) != 1) return 1;
for (int i = 0; s[i] != '\0'; i++) {
    if (s[i] >= 'a' && s[i] <= 'z')
        s[i] = s[i] - ('a' - 'A');
}
printf("%s\n", s);
```

<div v-click class="answer">Rm2026：R 保留，m 改成 M，数字保留。</div>

<div class="note">本例使用常见的 ASCII 兼容环境；不要对所有字符直接减去固定数值。</div>

<!--
约2分钟讲评。新字符串仍然用原数组保存，结束符没有被修改。字符类型可参与整型运算。完整可运行文件见examples/p5733.c。
-->

---
clicks: 2
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

<div v-click="1" class="answer">复制后，dst 是 "RM"。</div>

</div><div>

```c
if (strcmp(dst, "RM") == 0) {
    printf("same\n");
}
```

<div v-click="2" class="answer">返回 0，表示内容相同。</div>

</div></div>

<div class="note">strcpy 的目标空间必须足够；strcmp 不相等时看正负，不假设只返回 ±1。</div>

<!--
约2分钟。strcpy会复制结束符。补充strcmp按首个不同字符比较，负数表示左边更小，正数表示更大；不把字符串==当成内容比较。
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

<div class="note">输出严格使用 <code>Player1</code>、<code>Player2</code> 或 <code>Tie</code>，每组一行。</div>

<!--
约2分钟，完整实现留课后。规则Rock胜Scissors、Scissors胜Paper、Paper胜Rock。此页只展示平局判断片段。
题目：https://www.luogu.com.cn/problem/B2112
-->

---
clicks: 4
---

<div class="eyebrow">04 · 回文字符串</div>

# 从两端，向中间比较

<div class="read-code">char s[] = "level";</div>

<MemoryDemo kind="pal" :step="$clicks" />

<div class="note">左右下标分别从 <code>0</code> 和 <code>strlen(s) - 1</code> 开始。</div>

<!--
约2分钟。只在left<right时比较。结束符不是最后一个待比较字符，最后有效下标是4。配合下一页的失败路径检查。
-->

---

<div class="eyebrow">04 · 回文判断的失败路径</div>

# 一对不同，就可以结束

<div class="two-col code-small"><div>

```c
int left = 0;
int right = (int)strlen(s) - 1;
int ok = 1;
while (left < right) {
    if (s[left] != s[right]) {
        ok = 0; break;
    }
    left++; right--;
}
```

</div><div>

<v-clicks>

- `level`：两对相同，在中间相遇。
- `abccba`：三对相同，随后交错。
- `robot`：首尾 `r` 与 `t` 不同，立即结束。

</v-clicks>

</div></div>

<div class="note">字符串来自有效输入；单个字符自然是回文。完整程序见配套示例。</div>

<!--
约1分钟。采用有符号right，先把长度转换再减1，避免无符号下溢。单字符不进入循环也保留ok=1。不扩大到忽略标点、大小写的回文定义。
-->
