---
clicks: 10
---

<div class="eyebrow">上节课回访 · 先填输入，再做处理</div>

# B2111 基因相关性：一格一格比

<ReviewFill problem="B2111" :step="$clicks">
  <p>先读入阈值 <code>threshold</code> 和两条等长序列 <code>a</code>、<code>b</code>（最多 500 个字符）。相同位置的字符占比达到阈值，输出 <code>yes</code>；否则输出 <code>no</code>。</p>
  <div class="cj2-review-sample"><code>ACGT</code> 与 <code>ACGA</code>，阈值 <code>0.75</code> → <code>yes</code></div>
</ReviewFill>

<!-- 3 分钟。先让学生指出相同的三个位置，再逐空揭示。边界：同样两串，阈值改成 0.8 就输出 no。读入时用 %lf 和 %500s，strlen 来自 string.h。输入先读阈值，再读两串。原题：https://www.luogu.com.cn/problem/B2111 -->

---
clicks: 10
---

# B2112 石头剪子布：先平局，再找谁赢

<ReviewFill problem="B2112" :step="$clicks">
  <p>先读局数 <code>N</code>（1–100），每局读两个单词 <code>a</code>、<code>b</code>。这段代码放在每局的循环里。</p>
  <p><code>Rock</code> 胜 <code>Scissors</code>，<code>Scissors</code> 胜 <code>Paper</code>，<code>Paper</code> 胜 <code>Rock</code>。</p>
  <div class="cj2-review-sample"><code>Paper Scissors</code> → <code>Player2</code></div>
</ReviewFill>

<!-- 3 分钟。只比较题目给的三种区分大小写的单词。先问 strcmp 相等时返回什么，再补两个获胜组合。最后用 Rock Scissors、Paper Paper、Paper Scissors 对应三个分支，每局输出一行。strcmp 来自 string.h。原题：https://www.luogu.com.cn/problem/B2112 -->

---
clicks: 4
---

# P5733 自动修正：先把整串读进来

<ReviewFill problem="P5733" :step="$clicks">
  <p>输入一串不含空格的字符（最多 100 个）。只把小写字母改成大写，其余字符保留。</p>
  <div class="cj2-review-sample"><code>Rm2026</code> → <code>RM2026</code></div>
  <p>转换已经写好，只填输入行。</p>
</ReviewFill>

<!-- 2 分钟。先填宽度，再确认参数是 s。用长度正好 100 的串追问结束符放在哪。原题：https://www.luogu.com.cn/problem/P5733 -->

---
clicks: 16
---

# P1980 计数问题：每次取一位

<ReviewFill problem="P1980" :step="$clicks">
  <p>先读入 <code>n</code>（1 到 10⁶）和一位数字 <code>x</code>（0–9）。数一数 <code>1</code> 到 <code>n</code> 的十进制写法里，<code>x</code> 总共出现几次。</p>
  <div class="cj2-review-sample">输入 <code>11 1</code> → <code>4</code><br><code>11</code> 本身就贡献两次。</div>
  <template #trace>
    <DigitTrace :step="$clicks - 10" />
  </template>
</ReviewFill>

<!-- 4 分钟。先逐空填好代码，再点六次跟踪拆位。输入 11 1 时，拆到 11 前，1 和 10 各贡献一次，因此 count 从 2 开始；看 11 → 1 → 0。输入 10 0 时，个位的 0 计一次；最后 num 为 0，while 条件不成立，不再取位。用 num 拆位，不改外层的 i。NOIP 2013 普及组原题：https://www.luogu.com.cn/problem/P1980 -->

---

# 核对四道题的输入和处理

<div class="two-col cj2-input-key">
<div>

<div class="label">①② · 四题的输入答案</div>

| 题目 | 填好的输入行 |
| --- | --- |
| [B2111](https://www.luogu.com.cn/problem/B2111) | `scanf("%lf %500s %500s",`<br>`      &threshold, a, b);` |
| [B2112](https://www.luogu.com.cn/problem/B2112) | `scanf("%8s %8s", a, b);` |
| [P5733](https://www.luogu.com.cn/problem/P5733) | `scanf("%100s", s);` |
| [P1980](https://www.luogu.com.cn/problem/P1980) | `scanf("%d %d", &n, &x);` |

</div>
<div>

<div class="label">③④⑤ · 核对处理代码</div>

- **B2111**：`a[i] == b[i]`；`1.0 * same / len`；`>=`。
- **B2112**：`== 0`；`strcmp(a, "Scissors") == 0`；`strcmp(b, "Rock") == 0`。
- **P1980**：`num > 0`；`num % 10`；`num = num / 10`。

</div>
</div>

<div class="question">比较、判胜负、数位，各有一条规则。下一页看一个底盘例子：同一条限幅规则，复制四遍会怎样？</div>

<!-- 1 分钟。用边界输入快速核对：B2111 的 ACGT、ACGA 与阈值 0.8 得 no；B2112 的 Paper Paper 得 Tie；P1980 的 10 0 得 1。备课参考：回访记录给出 B2111 54.1、B2112 53.3，P1980 完成情况也偏低；不把记录值放到学生页。 -->
