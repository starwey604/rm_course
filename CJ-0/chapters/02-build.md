---
class: l1-page
---

<div class="eyebrow">03  预测实验 / Q1</div>

# 源代码改了，旧程序会跟着变吗？

<div class="l1-questions"><div class="l1-question"><b>1</b><span>先构建并运行，输出 Hello</span></div><div class="l1-question"><b>2</b><span>把源文件里的 Hello 改成 RM，保存</span></div><div class="l1-question"><b>3</b><span>不重新构建，直接启动先前的 .exe</span></div></div><div class="l1-bottom">先预测旧程序的输出，再重新构建对照</div>

<!--
原 PPT 第 9 页；内容、表格及讲师说明取自 CONE_C语言_金石滩_L1.pptx。
【建议用时】2 分钟
【教学动作】用文件夹或终端明确运行旧 exe。CLion 的 Run 往往会自动构建，所以不能只点 Run 来演示“没有构建”。正确结论：编辑保存源文件不自动改变磁盘上的旧 exe。
【本页内容】源代码改了，旧程序会跟着变吗？
1：先构建并运行，输出 Hello
2：把源文件里的 Hello 改成 RM，保存
3：不重新构建，直接启动先前的 .exe
【依据】https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1570.pdf
课程材料：1.Hello+World!.pdf；2.变量、数据类型与运算符.pdf；3.逻辑判断与分支结构.pdf；CONE-EC_2026_-_Lecture_1_-_C_Basis_V2.0.pdf。
-->

---
class: l1-page
---

<div class="eyebrow">03  构建过程</div>

# GCC 构建程序的四个阶段

<div class="l1-lead mono">main.c</div><div class="l1-stage-track"><div><small>01</small><h2>预处理</h2><code>main.i</code><p>展开头文件、宏等</p></div><div><small>02</small><h2>编译</h2><code>main.s</code><p>生成汇编代码</p></div><div><small>03</small><h2>汇编</h2><code>main.o</code><p>生成目标文件</p></div><div><small>04</small><h2>链接</h2><code>main.exe</code><p>解析引用、组织程序</p></div></div><div class="l1-bottom">IDE 通常替你调用工具链，中间文件不一定会保留</div>

<!--
原 PPT 第 10 页；内容、表格及讲师说明取自 CONE_C语言_金石滩_L1.pptx。
【建议用时】1 分钟
【教学动作】从学生的 main.c 出发按顺序展示。中间文件是概念与命令行可观察的产物，IDE 不一定保留。广义“编译”常指整个构建过程，狭义编译只指其中一个阶段。后面附录有命令可实测。
【本页内容】GCC 构建程序的四个阶段
【依据】https://gcc.gnu.org/onlinedocs/gcc/Overall-Options.html
课程材料：1.Hello+World!.pdf；2.变量、数据类型与运算符.pdf；3.逻辑判断与分支结构.pdf；CONE-EC_2026_-_Lecture_1_-_C_Basis_V2.0.pdf。
-->

---
class: l1-page
---

<div class="eyebrow">03  同一个程序 / main.c</div>

# 接下来跟踪这八行源代码

<div class="l1-columns">
<div>

<div class="label">实际文件节选（未展示其余部分）</div>

```c
#include <stdio.h>
#define SCORE 72
int main(void) {
    int score = SCORE;
    printf("score = %d\n", score);
    return 0;
}
```



</div>
<div>

<dl class="l1-dl"><div><dt>头文件</dt><dd>stdio.h 提供相关声明</dd></div><div><dt>宏</dt><dd>此处用 SCORE 代表 72</dd></div><div><dt>最终输出</dt><dd>score = 72</dd></div></dl>

</div>
</div>
<div class="l1-bottom">后面的 .i、.s、.o、.exe 都来自这一个程序</div>

<!--
原 PPT 第 11 页；内容、表格及讲师说明取自 CONE_C语言_金石滩_L1.pptx。
【建议用时】1 分钟
【教学动作与答案】先让学生看全程序，不要求掌握宏语法。SCORE 是预处理宏，用名字代表一段替换文本。后续每页只跟踪 printf 和 72。
【本页题意或说明】
【代码或文件片段】
#include <stdio.h>
#define SCORE 72
int main(void) {
    int score = SCORE;
    printf("score = %d\n", score);
    return 0;
}
【依据】https://gcc.gnu.org/onlinedocs/gcc/Overall-Options.html
https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1570.pdf
实际构建：Windows x86-64，GCC 16.1.0 MinGW-w64 UCRT，-O0 -fno-builtin；预处理指定 -D__USE_MINGW_ANSI_STDIO=0 以便观察 printf 直接符号。本页仅节选关注部分，地址、指令及中间文件内容因环境而异。本页文件片段均来自本次实际构建。
-->

---
class: l1-page
---

<div class="eyebrow">03  第一步 / main.i</div>

# 预处理：展开头文件，替换宏

<div class="l1-columns">
<div>

<div class="label">main.i （已省略编译器属性和其他头文件内容）</div>

```c
int printf(const char *format, ...);
int main(void) {
    int score = 72;
    printf("score = %d\n", score);
    return 0;
}
```



</div>
<div>

<dl class="l1-dl"><div><dt>像复制说明书</dt><dd>把头文件内容展开进来<br>现在能看到 printf 的声明</dd></div><div><dt>像替换文本</dt><dd>本例把 SCORE 换成 72<br>实际文件仍然是 C 文本</dd></div><div><dt>只关注这两处变化</dt><dd>函数声明的参数暂不展开<br>先认出 printf 这个名字</dd></div></dl>

</div>
</div>
<div class="l1-bottom">预处理后能看到函数“怎么用”，还没有得到它的机器指令</div>

<!--
原 PPT 第 12 页；内容、表格及讲师说明取自 CONE_C语言_金石滩_L1.pptx。
【建议用时】2 分钟
【讲解与互动】代码是main.i的教学简化节选：将实际函数声明中的__attribute__、__cdecl__、__restrict__等实现细节省略，参数名改为format，不伪称逐字原文。真实文件1533行，主函数片段未改逻辑。只看printf说明书出现、SCORE变72两个变化。头文件并非在所有情形下都只有声明，本例只选printf声明来解释接口。
【内容依据】C11 公开草案 https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1570.pdf
GCC 构建阶段 https://gcc.gnu.org/onlinedocs/gcc/Overall-Options.html
-->

---
class: l1-page
---

<div class="eyebrow">03  第二步 / 编译后的 main.s</div>

# C 语句变成了汇编操作

<div class="l1-columns">
<div>

<div class="label">实际文件节选（未展示其余部分）</div>

```text
.LC0:
    .ascii "score = %d\12\0"
main:
    movl $72, -4(%rbp)
    movl -4(%rbp), %eax
    leaq .LC0(%rip), %rcx
    movl %eax, %edx
    call printf
```



</div>
<div>

<dl class="l1-dl"><div><dt>字符串数据</dt><dd>格式字符串位于 .LC0<br>\12 是本次汇编的换行写法</dd></div><div><dt>数值与参数</dt><dd>存入 72，准备函数参数<br>寄存器名无需背诵</dd></div><div><dt>调用</dt><dd>call printf<br>此时仍使用符号名字</dd></div></dl>

</div>
</div>
<div class="l1-bottom">编译器按目标平台生成汇编，并检查 C 语义；此处关闭优化便于观察</div>

<!--
原 PPT 第 13 页；内容、表格及讲师说明取自 CONE_C语言_金石滩_L1.pptx。
【建议用时】2 分钟
【教学动作与答案】真实 main.s 节选，省略栈帧准备、__main 启动辅助调用、返回与汇编指示。%rcx 是本例 Windows x64 首参数，%edx 携带第二参数，本课无需讲 ABI。\12 是八进制 012，对应此环境换行字节；\0 是字符串结尾。不要让学生误以为每句 C 永远对应固定数量指令。
【本页题意或说明】
【代码或文件片段】
.LC0:
    .ascii "score = %d\12\0"
main:
    movl $72, -4(%rbp)
    movl -4(%rbp), %eax
    leaq .LC0(%rip), %rcx
    movl %eax, %edx
    call printf
【依据】https://gcc.gnu.org/onlinedocs/gcc/Overall-Options.html
实际构建：Windows x86-64，GCC 16.1.0 MinGW-w64 UCRT，-O0 -fno-builtin；预处理指定 -D__USE_MINGW_ANSI_STDIO=0 以便观察 printf 直接符号。本页仅节选关注部分，地址、指令及中间文件内容因环境而异。本页文件片段均来自本次实际构建。
-->

---
class: l1-page
---

<div class="eyebrow">03  第三步 / main.o</div>

# 为什么调用位置先留下四个 00？

<div class="l1-columns">
<div>

<div class="label">下面是工具读出的 main.o 内容，只看强调框里的四个 00</div><pre><code>20: e8 <mark class="l1-byte-mark">00 00 00 00</mark>  call 25 &lt;main+0x25&gt;
21: IMAGE_REL_AMD64_REL32  printf</code></pre>

</div>
<div>

<dl class="l1-dl"><div><dt>e8</dt><dd>表示发起一次函数调用</dd></div><div><dt>后面四个字节</dt><dd>记录从调用结束后的位置到目标函数的相对距离</dd></div><div><dt>现在先留 00</dt><dd>printf 最后放在哪里还没决定，距离暂时算不出来</dd></div></dl>

</div>
</div>
<div class="l1-bottom">再留一张“待办单”：这里要找 printf，等链接器来补距离</div>

<!--
原 PPT 第 14 页；内容、表格及讲师说明取自 CONE_C语言_金石滩_L1.pptx。
【建议用时】3 分钟
【讲解与互动】实际Win64目标文件节选。e8是call相对调用指令的操作码，后四字节是待链接修正的32位相对位移，不是printf绝对地址。本次为0占位，并附重定位记录。不要让学生把反汇编call25理解成最终目标。课堂可用空着的导航距离与待办便签类比。
【内容依据】C11 公开草案 https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1570.pdf
GCC 构建阶段 https://gcc.gnu.org/onlinedocs/gcc/Overall-Options.html
本次实际构建证据：main.o 的 call printf 与 IMAGE_REL_AMD64_REL32 printf。
-->

---
class: l1-page
---

<div class="eyebrow">03  第四步 / 链接</div>

# 链接器找到 printf，再补上调用距离

<div class="l1-lead">链接前：先留空，再记下“这里要调用 printf”</div>


```text
e8 00 00 00 00
IMAGE_REL_AMD64_REL32  printf
```

<div class="spaced"><div class="l1-lead">链接后：找到目标，算出距离，填回原来的位置</div>


```text
140001780: e8 6b 19 00 00  call 1400030f0 <printf>
```

</div><div class="l1-lead">本次 printf 放在 1400030f0，四个空位补为 6b 19 00 00</div>
<div class="l1-lead">这四个字节存的是相对距离，程序据此到达目标函数</div>
<div class="l1-bottom">无需记住这些地址，重点是：先留待办，再找到目标并补齐调用</div>

<!--
原 PPT 第 15 页；内容、表格及讲师说明取自 CONE_C语言_金石滩_L1.pptx。
【建议用时】2 分钟
【讲解与互动】实际Windows GCC示例。链接将printf相关库代码纳入exe，并按位置写入本次call的相对位移。下一条指令140001785加0x196B等于1400030F0；6B190000是小端字节表示。不把这四字节说成绝对地址。不说所有运行库功能都已静态打包：动态依赖留讲师备注/附录，不打断主线。
【内容依据】C11 公开草案 https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1570.pdf
GCC 构建阶段 https://gcc.gnu.org/onlinedocs/gcc/Overall-Options.html
-->

---
class: l1-page
---

<div class="eyebrow">03  回答 Q1</div>

# 构建生成程序，运行开始执行

<div class="l1-three"><section><h2>源代码</h2><p>供工具处理的文本</p></section><section><h2>可执行文件</h2><p>面向特定平台的代码、数据及装载信息</p></section><section><h2>运行</h2><p>系统加载程序，启动代码准备环境后调用 main</p></section></div><div class="l1-bottom">PC 的 .exe 通常不能直接在 STM32 上运行</div>

<!--
原 PPT 第 16 页；内容、表格及讲师说明取自 CONE_C语言_金石滩_L1.pptx。
【建议用时】2 分钟
【教学动作】让学生先用一句话回答 Q1。追问把 main.c 改名成 main.exe 是否可运行。嵌入式使用目标工具链与启动代码，固件烧录后由芯片复位流程启动，不照搬 PC 操作系统模型。
【本页内容】构建生成程序，运行开始执行
源代码：供工具处理的文本
可执行文件：面向特定平台的代码、数据及装载信息
运行：系统加载程序，启动代码准备环境后调用 main
【依据】https://gcc.gnu.org/onlinedocs/gcc/Overall-Options.html
https://learn.microsoft.com/en-us/windows/win32/debug/pe-format
https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1570.pdf
课程材料：1.Hello+World!.pdf；2.变量、数据类型与运算符.pdf；3.逻辑判断与分支结构.pdf；CONE-EC_2026_-_Lecture_1_-_C_Basis_V2.0.pdf。
-->
