---
class: l1-page
---

<div class="eyebrow">拓展 A  /  简易计算器</div>

# 简易计算器：题目与输入读取

<div class="l1-lead">输入两个数和运算符（如 1 + 2），支持 +、-、*、/，结果保留两位小数<br>除数为零输出 DIV_ZERO，其他运算符输出 INVALID_OP；每次输出一行</div>
<div class="l1-columns">
<div>



```c
double a, b;
char op;
if (scanf("%lf %c %lf",
          &a, &op, &b) != 3) {
    return 1;
}
```



</div>
<div>

<dl class="l1-dl"><div><dt>样例</dt><dd>1 + 2 得到 3.00</dd></div><div><dt>输入检查</dt><dd>成功读入 3 项</dd></div><div><dt>字符输入</dt><dd>格式中的空格<br>会跳过前面的空白</dd></div></dl>

</div>
</div>
<div class="l1-bottom">本练习假定两个操作数及运算符可以正常读入</div>

<!--
原 PPT 第 56 页；内容、表格及讲师说明取自 CONE_C语言_金石滩_L1.pptx。
【建议用时】0 分钟
【教学动作与答案】补齐题干，并保留scanf返回值!=3的输入检查。格式中%c前空格是有意跳过空白，非所有%c场景都必须加。
【本页题意或说明】输入两个数和运算符（如 1 + 2），支持 +、-、*、/，结果保留两位小数
除数为零输出 DIV_ZERO，其他运算符输出 INVALID_OP；每次输出一行
【代码或文件片段】
double a, b;
char op;
if (scanf("%lf %c %lf",
          &a, &op, &b) != 3) {
    return 1;
}
【依据】https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1570.pdf
-->

---
class: l1-page
---

<div class="eyebrow">拓展 A  /  简易计算器</div>

# 简易计算器：运算与异常处理

<div class="l1-lead">输入两个数和运算符（如 1 + 2），支持 +、-、*、/，结果保留两位小数<br>除数为零输出 DIV_ZERO，其他运算符输出 INVALID_OP；每次输出一行</div>
<div class="l1-dense">


```c
switch (op) {
    case '+': printf("%.2f\n", a+b); break;
    case '-': printf("%.2f\n", a-b); break;
    case '*': printf("%.2f\n", a*b); break;
    case '/':
        if (b == 0.0) printf("DIV_ZERO\n");
        else printf("%.2f\n", a/b);
        break;
    default: printf("INVALID_OP\n");
}
```

</div>
<div class="l1-bottom">样例：5 / 2 得到 2.50；1 / 0 得到 DIV_ZERO</div>

<!--
原 PPT 第 57 页；内容、表格及讲师说明取自 CONE_C语言_金石滩_L1.pptx。
【建议用时】0 分钟
【教学动作与答案】完整题干保持在上方，代码片段假定a、op、b已成功读入。检查除数是否为输入的0.0适用于本例，不推广为所有浮点比较问题。
【本页题意或说明】输入两个数和运算符（如 1 + 2），支持 +、-、*、/，结果保留两位小数
除数为零输出 DIV_ZERO，其他运算符输出 INVALID_OP；每次输出一行
【代码或文件片段】
switch (op) {
    case '+': printf("%.2f\n", a+b); break;
    case '-': printf("%.2f\n", a-b); break;
    case '*': printf("%.2f\n", a*b); break;
    case '/':
        if (b == 0.0) puts("DIV_ZERO");
        else printf("%.2f\n", a/b);
        break;
    default: puts("INVALID_OP");
}
【依据】https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1570.pdf
-->

---
class: l1-page
---

<div class="eyebrow">选讲 / 字节先后顺序</div>

# 为什么 12 34 56 78 会按 78 56 34 12 存放？



```c
uint32_t count = 0x12345678;
```

<div class="l1-lead">按字节看这个数：12 是高位字节，78 是低位字节</div>
<MemoryBytes kind="endian" /><div class="l1-lead">小端序：低位字节 78 放在最低地址 0x1000</div>
<div class="l1-bottom">&amp;count 指向第一格；这是本例采用的存放规则，不是把每个字节的位倒转</div>

<!--
原 PPT 第 58 页；内容、表格及讲师说明取自 CONE_C语言_金石滩_L1.pptx。
【建议用时】0 分钟
【讲解与互动】本页假设8位字节与小端序。十六进制12345678按字节从高到低是12、34、56、78，78是最低有效字节，小端序将它放最低地址。并非倒转每个字节中的二进制位，也不是C保证所有电脑或STM32都采用相同端序。uint32_t已在前面介绍。用于课后追问，不要求第一课记忆。
【内容依据】C11 公开草案 https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1570.pdf
GCC 构建阶段 https://gcc.gnu.org/onlinedocs/gcc/Overall-Options.html
-->

---
class: l1-page
---

<div class="eyebrow">拓展 C  /  观察构建产物</div>

# 用 GCC 分别保留中间文件



```bash
gcc -E main.c -o main.i
gcc -S main.i -o main.s
gcc -c main.s -o main.o
gcc main.o -o main.exe
```

<div class="l1-bottom">命令在终端中执行，需先进入 main.c 所在目录</div>

<!--
原 PPT 第 59 页；内容、表格及讲师说明取自 CONE_C语言_金石滩_L1.pptx。
【建议用时】0 分钟
【教学动作】以上是 Windows GCC 示例。-E 只预处理，-S 到汇编，-c 到目标文件，最后链接。main.i 文件较长是因为包含头文件。用 objdump 或 nm 进一步查看时属于课后观察。资料：GCC 官方 Overall Options；C11 草案 6.4.4.4、6.4.5、6.5.3.2、6.5.16、6.7.2.1、7.21.6.2。
【本页内容】用 GCC 分别保留中间文件
gcc -E main.c -o main.i
gcc -S main.i -o main.s
gcc -c main.s -o main.o
gcc main.o -o main.exe
【依据】https://gcc.gnu.org/onlinedocs/gcc/Overall-Options.html
https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1570.pdf
https://learn.microsoft.com/en-us/windows/win32/debug/pe-format
https://www.luogu.com.cn/problem/P1001
https://www.luogu.com.cn/problem/P1424
课程材料：1.Hello+World!.pdf；2.变量、数据类型与运算符.pdf；3.逻辑判断与分支结构.pdf；CONE-EC_2026_-_Lecture_1_-_C_Basis_V2.0.pdf。
-->

---
class: l1-page
---

<div class="eyebrow">选讲 / 链接与加载的分工</div>

# 可执行文件还可能调用动态库

<div class="l1-lead">本次 main.exe 中可以看到 printf 的代码</div>


```text
00000001400030f0 <printf>:
```

<div class="l1-lead">导入表还记录了它依赖的外部服务</div>


```text
DLL Name: api-ms-win-crt-stdio-l1-1-0.dll
__stdio_common_vfprintf
```

<div class="l1-bottom">链接建立调用路径；加载时还需解析动态库中的实际地址</div>

<!--
原 PPT 第 60 页；内容、表格及讲师说明取自 CONE_C语言_金石滩_L1.pptx。
【建议用时】0 分钟
【教学动作与答案】本次exe里有printf代码，printf内部经运行库辅助函数最终依赖UCRT动态库服务。objdump -p 的导入表在api-ms-win-crt-stdio-l1-1-0.dll组包含__stdio_common_vfprintf。本页保留真实DLL名和函数名，课堂无需记名字。链接阶段建立导入关系/调用路径，加载器在装载时解析导入并填写地址，不能说所有DLL函数实际运行地址都在链接时固定。
【本页题意或说明】
【代码或文件片段】
【依据】https://learn.microsoft.com/en-us/windows/win32/debug/pe-format
https://gcc.gnu.org/onlinedocs/gcc/Overall-Options.html
实际构建：Windows x86-64，GCC 16.1.0 MinGW-w64 UCRT，-O0 -fno-builtin；预处理指定 -D__USE_MINGW_ANSI_STDIO=0 以便观察 printf 直接符号。本页仅节选关注部分，地址、指令及中间文件内容因环境而异。本页文件片段均来自本次实际构建。
-->
