<div class="section-break">
<div class="eyebrow">01 · 第一段程序</div>
<h1>源代码不是结果<br><span>运行之后才是</span></h1>
<p>从人能读懂的文本，到机器可以执行的程序。</p>
</div>

---

<div class="eyebrow">01 · 最短闭环</div>

# 先读懂，再运行

<div class="two-col wide-left"><div>

```c
#include <stdio.h>

int main(void) {
    printf("Hello, RM!\n");
    return 0;
}
```

</div><div>
<v-clicks>

<p><strong>#include</strong><br>引入标准输入输出声明。</p>
<p><strong>main</strong><br>程序从这里开始执行。</p>
<p><strong>printf</strong><br>把文本送到标准输出。</p>
<p><strong>return 0</strong><br>向运行环境报告正常结束。</p>

</v-clicks>
</div></div>

<!-- 约3分钟。逐行指读，不要求立即背写。强调 \n 是换行转义，不是两个普通字符被原样显示。 -->

---

<div class="eyebrow">01 · 从文本到可执行程序</div>

# 编译器会检查你说的话

<div class="build-flow">
<div v-click><small>你编写</small><strong>main.c</strong><span>源代码</span></div>
<b>→</b>
<div v-click><small>工具转换与检查</small><strong>编译 / 链接</strong><span>报告错误与警告</span></div>
<b>→</b>
<div v-click><small>机器执行</small><strong>程序</strong><span>产生输出</span></div>
</div>

<div class="two-col spaced">
<div v-click class="question">编译失败：程序还没有运行，先读第一条错误的位置与原因。</div>
<div v-click class="question">运行结果不对：程序能执行，但逻辑与预期不一致。</div>
</div>

<!-- 约2分钟。区分“语法没通过”和“逻辑不符合预期”，避免学生把所有问题都叫 bug 后盲目修改。 -->

---

<div class="eyebrow">01 · 变量</div>

# 给数据一个名字，也给它一种类型

<div class="two-col"><div>

```c
int target = 90;
double speed = 2.5;
char mode = 'A';
```

</div><div>
<table><tbody>
<tr><td><code>int</code></td><td>整数，例如计数与编号</td></tr>
<tr><td><code>double</code></td><td>带小数的数值</td></tr>
<tr><td><code>char</code></td><td>单个字符</td></tr>
</tbody></table>
</div></div>

<div class="model-recap compact-recap">
<div v-click><strong>名字</strong><span>这段数据在程序里叫什么？</span></div>
<div v-click><strong>类型</strong><span>它能表示什么，能参与什么运算？</span></div>
<div v-click><strong>当前值</strong><span>执行到这一行时，它究竟是多少？</span></div>
</div>

<!-- 约3分钟。变量示例只是概念数据，不表示真实电机速度单位。追问修改 target 后哪一处输出会变化。 -->

---

<div class="eyebrow">01 · 输入与输出</div>

# 格式符，是程序和外部数据之间的约定

<div class="two-col"><div>

```c
int target = 0;
scanf("%d", &target);
printf("target=%d\n", target);
```

</div><div>
<v-clicks>

<p><code>%d</code>：按整数读取或打印。</p>
<p><code>&target</code>：告诉 scanf 要写入的位置。</p>
<p><code>target</code>：printf 读取当前保存的值。</p>

</v-clicks>
</div></div>

<div class="io-pair"><div><div class="label">输入</div><div class="output">90</div></div><div><div class="label">输出</div><div class="output">target=90</div></div></div>

<!-- 约3分钟。先让学生预测输入 90 的结果，再指出 scanf 与 printf 中 target 写法不同的原因。 -->

---

<div class="eyebrow">01 · 判断</div>

# 不同条件，走不同路径

<div class="two-col wide-left"><div>

```c
if (target > 180) {
    printf("too large\n");
}
else if (target < -180) {
    printf("too small\n");
}
else {
    printf("accepted\n");
}
```

</div><div>
<div class="label">先预测，再核对</div>
<table><thead><tr><th>target</th><th>输出</th></tr></thead><tbody>
<tr><td class="mono">200</td><td><span v-click="1">too large</span></td></tr>
<tr><td class="mono">-180</td><td><span v-click="2">accepted</span></td></tr>
<tr><td class="mono">0</td><td><span v-click="3">accepted</span></td></tr>
</tbody></table>
</div></div>

<!-- 约3分钟。重点看 -180：条件使用严格小于，因此落入 else。这里仅演示范围判断，不定义真实云台角度限制。 -->

---

<div class="eyebrow">01 · 重复</div>

# 同一段逻辑，不必复制很多遍

<div class="two-col"><div>

```c
for (int i = 0; i < 3; i++) {
    printf("check %d\n", i);
}
```

</div><div>
<div class="label">输出</div>
<div class="output">check 0
check 1
check 2</div>
</div></div>

<div class="model-recap">
<div v-click><strong>保存什么？</strong><span>当前轮次 <code>i</code>。</span></div>
<div v-click><strong>判断什么？</strong><span><code>i &lt; 3</code> 是否仍然成立？</span></div>
<div v-click><strong>更新什么？</strong><span>每轮结束执行 <code>i++</code>。</span></div>
</div>

<!-- 约2分钟。只建立循环直觉，CJ-1 会完整讲解循环条件、执行次数和嵌套循环。 -->
