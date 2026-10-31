---
clicks: 3
---

<div class="eyebrow">03 · 一维数组 · 60–85 分钟 · 为什么要用数组</div>

# 倒序输出前，先用数组保存整组数据

<ArrayStorage :step="$clicks" />

<!--
约2分钟。先明确任务：读完所有数据以后，再倒序输出。为后面P1427做铺垫，完整题面仍在原位置。
并排比较同一输入写入一个变量与依次写入数组的结果，每次点击读入一个数。任务与结论始终可见，不依赖讲师口头补齐为什么需要数组。
-->

---
clicks: 3
---

<div class="eyebrow">03 · 数组的定义、下标与读写</div>

# 用下标访问元素：第 1 个元素是 a[0]

<ArrayOffset :step="$clicks" />

<!--
约2分钟。先读清元素类型、数组名、容量，再把“第几个”与下标对应起来。依次读取a[0]、读取a[2]、写入a[1]。
跨过几个元素可帮助理解下标从0开始；步数以元素计，不是字节数，不引入指针运算。初始化未列出的元素补0，但未初始化的局部数组没有可靠初值。a[5]越界，不演示固定越界结果。
-->

---

<div class="eyebrow">03 · 数组初始化 · 先给程序一个确定的起点</div>

# 局部数组不会自动清零，先给它一个起点

<div class="zero-lead">main 中的普通局部数组通常使用栈空间；仅声明，不会自动把每格清成 0。</div>

<div class="zero-grid"><div>
<div class="label">没有给初值：不能依赖里面原来的内容</div>

```c
int count[5];
```

<div class="zero-cells"><span v-for="i in 5" :key="i">?</span></div>
<div class="zero-explanation">可能保留旧位模式，不能假定为 0。<br><code>count[0]++</code> 会先读这个旧值。</div>
</div><div>
<div class="label">先全部清零：计数从确定的 0 开始</div>

```c
int count[5] = {0};
```

<div class="zero-cells ready"><span v-for="i in 5" :key="i">0</span></div>
<div class="zero-explanation">初始化后，五个元素都是 0。<br>再做 <code>count[0]++</code>，才是 0 加 1。</div>
</div></div>

<div class="zero-shortcut"><div><strong>1000 格也一样：</strong><code>int a[1000] = {0};</code></div><span>第 1 格明确指定 0，其余 999 格自动补 0。</span></div>

<div class="zero-warning">使用未初始化的值，编译器可能警告 <code>used uninitialized</code>。<br>启用 <code>-Werror</code> 可把警告变成编译错误，但检查不一定覆盖所有路径。<br><strong>养成习惯：声明时给合理初值，或者保证每个元素先赋值、再读取。</strong></div>

<!--
约2分钟。此页指main中普通的自动存储期局部int数组，不推广到全局数组和static局部数组；后两类有零初始化规则。栈是常见实现的存储模型，不是C语言要求必须采用的内存布局。
左侧问号是“没有可依赖初值”的示意，不能展示成保证每次改变的随机数。环境可能碰巧呈现0、调试填充值或旧位模式；C程序仍不可依赖未初始化读取，不能把未定义行为简化成“总能读到一个垃圾数”。问题示例只编译看告警，不运行并声称某个输出可靠。
GCC 15.2实测：main内int count[5]; count[0]++; 使用-std=c11 -O2 -Wall -Wextra -Wuninitialized编译，得到warning: 'count' is used uninitialized [-Wuninitialized]。另一个先逐格赋值再读取的未带初始化器数组在-Werror下通过；所以不是声明时没写={0}就必定告警。诊断覆盖取决于编译器版本、选项、优化和路径分析。
初值应符合用途：计数/标记常用0；最值应从已有数据选择起点，下一题进一步解释。输入数组也可先成功读入再使用，不需要为了消警告盲目改变算法。
C++26拓展仅供讲师：P2795R5引入未初始化读取的erroneous behaviour；当前工作草案[basic.indet]对通常的自动存储期对象使用erroneous values规则，而动态存储期、[[indeterminate]]和特定字节类型另有规定。它没有规定所有数组统一默认清零，也不等于要求每处都发出编译警告；这不是C11规则变化。正文不展开高级术语。
来源：https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1570.pdf §6.7.9
来源：https://gcc.gnu.org/onlinedocs/gcc/Warning-Options.html#index-Wuninitialized
来源：https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2795r5.html
来源：https://eel.is/c++draft/basic.indet
-->

---
clicks: 4
---

<div class="eyebrow">03 · 数组容量、有效个数与遍历</div>

# 只处理前 n 个元素，循环条件写 i < n

<ArrayTraversal :step="$clicks" />

<!--
约2分钟。n由程序记录，数组不会自动记录输入数量。本例明确约定前3格是本次数据；其余97格即使初始化为0，也不因此变成本次有效数据。
依次核对i=0、1、2、3的判断、访问与停止，联系保存什么、判断什么、更新什么。下一页用sizeof计算容量，进一步区分容量与有效数据个数。
-->

---

<div class="eyebrow">03 · sizeof 与数组容量</div>

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
正文约2分钟，先讲容量计算，为后面的sizeof(s)与strlen(s)作准备。此式直接作用于当前定义的数组，不推广到指针或数组形参。sizeof以字节计，不依赖int固定为4字节。
-->

---

<ProblemStatement pid="P5724" />

<!--
完整题面按洛谷原题转述，保留输入输出、全部判定规则、完整范围与官方样例。
来源：https://www.luogu.com.cn/problem/P5724
核对日期：2026-10-31。题面页可供学生独立阅读，避免只留下题名与链接。
-->

---
clicks: 4
---

<div class="eyebrow">03 · P5724 · 从三问搭出最值框架</div>

# 保存两个候选值，再逐个比较

<ReasoningModel kind="range" :step="$clicks" />

<!--
约1分钟。紧接完整题面，输入已读入a且n>=1。先想保存什么、判断什么、更新什么，再把回答对应到代码。①min/max起点来自已有数据，②③为更小/更大的比较；本页保持挖空，下一页用执行过程核对，随后有完整代码。
与前页清零衔接：初始化不是一律设0，最值候选应有实际数据依据。配合next MemoryDemo约2分钟，总量与原有最值演示约3分钟相同。
-->

---
clicks: 6
---

<div class="eyebrow">03 · 最值演示 · P5724</div>

# 用第一个元素，初始化当前最大值

<div class="read-code">int a[5] = {34, 12, 56, 9, 45};</div>

<MemoryDemo kind="max" :step="$clicks" />

<!-- 讲师补充：P5724 求极差：同样维护最小值，最终输出 最大值 − 最小值。打开题目 -->

<!--
约2分钟。示例最小值9、最大值56，极差47。题目1<=n<=100，0<=ai<=1000。讲义固定数组换成题目读入时同样可用首元素初始化。
-->

---

<div class="eyebrow">03 · P5724 的关键代码</div>

# 不要凭空假设最小值是 0

<div class="two-col"><div>

```c
int min_val = a[0];
int max_val = a[0];
for (int i = 1; i < n; i++) {
    if (a[i] < min_val)
        min_val = a[i];
    if (a[i] > max_val)
        max_val = a[i];
}
```

</div><div>

<div class="question">输入只有 7、8、9，<br>最小值应该是多少？</div>

<div v-click class="answer">7。若从 0 开始取最小值，<br>就会错误地一直保留 0。</div>

<p class="spaced">P5724 要的极差 = 最大值 − 最小值：</p>

```c
printf("%d\n", max_val - min_val);
```

</div></div>

<!-- 讲师补充：当 n = 1 时，最大值和最小值相同，极差为 0。 -->

<!--
约1分钟。用题目范围内的正数反例检查初始化。完整代码见examples/p5724.c。
-->

---

<ProblemStatement pid="P1427" />

<!--
完整题面按洛谷原题转述，保留输入输出、全部判定规则、完整范围与官方样例。
来源：https://www.luogu.com.cn/problem/P1427
核对日期：2026-10-31。题面页可供学生独立阅读，避免只留下题名与链接。
-->

---
clicks: 4
---

<div class="eyebrow">03 · P1427 · 从三问搭出读入与倒序框架</div>

# 先存到哪里，再从哪里倒着走？

<ReasoningModel kind="reverse" :step="$clicks" />

<!--
约1分钟。先分读入存储与倒序输出两个阶段，再回答保存/判断/更新。这里是main内的片段，①～④与下一页完整程序一致，本页不公布具体表达式。
输入按题目保证以0结束；0先被检查，不存入数组。有效个数n与容量的含义要分开。下一页仍留完整6分钟独立填写，不直接跳到讲评。
-->

---
clicks: 8
---

<div class="eyebrow">03 · P1427 动手填空 · 6 分钟</div>

# 0 不存，最后一格从哪里找？

<FillExercise kind="reverse" :step="$clicks" />

<!--
填空前追问：保存什么（数组a与有效个数n）？判断什么（x是不是0、下标是否仍>=0）？更新什么（存入a[n]后n++、倒序时i--）？
留完整6分钟，先让学生写。每空先单击给提示，再单击把答案填回左侧代码，共8次点击；回退时先恢复空白，再隐藏提示。PDF保持空白。①x == 0 ②n ③n - 1 ④i--。
完整骨架先读再判断，结束标记不存入数组。scanf的失败检查留在完整示例；本页按题目保证的以0结尾输入练习。
自测7 0输出7；2 2 0输出2 2。不要提前切到下一页。
-->

---
clicks: 7
---

<div class="eyebrow">03 · P1427 讲评</div>

# 有效个数决定倒序的起点

<MemoryDemo kind="reverse" :step="$clicks" />

<!-- 讲师补充：最后一个有效元素是 a[n - 1]，不是 a[n]。 -->

<!--
约2分钟。前四步存储并遇0停止，后三步倒序读取。0没有存入数组。
-->
