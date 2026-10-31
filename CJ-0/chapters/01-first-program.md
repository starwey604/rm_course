---
class: l1-page
---

<div class="eyebrow">01  HELLO WORLD</div>

# 第一段程序

<div class="l1-columns">
<div>



```c
#include <stdio.h>
int main(void) {
    printf("Hello, World!\n");
    return 0;
}
```



</div>
<div>

<dl class="l1-dl"><div><dt>stdio.h</dt><dd>提供 printf 的声明</dd></div><div><dt>main</dt><dd>本课 PC 程序的入口函数</dd></div><div><dt>return 0</dt><dd>向运行环境报告成功</dd></div></dl>

</div>
</div>
<div class="l1-bottom">CLion：main.c 编写代码，Build 构建，Run 运行</div>

<!--
原 PPT 第 4 页；内容、表格及讲师说明取自 CONE_C语言_金石滩_L1.pptx。
【建议用时】3 分钟
【教学动作】现场运行。逐行只讲本课需要的含义，不展开函数参数、返回值机制。头文件提供声明，库提供实现，避免说 printf 定义在 stdio.h。PC 启动代码先工作再调用 main。
【本页内容】第一段程序
#include <stdio.h>
int main(void) {
    printf("Hello, World!\n");
    return 0;
}
stdio.h：提供 printf 的声明
main：本课 PC 程序的入口函数
return 0：向运行环境报告成功
【依据】https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1570.pdf
课程材料：1.Hello+World!.pdf；2.变量、数据类型与运算符.pdf；3.逻辑判断与分支结构.pdf；CONE-EC_2026_-_Lecture_1_-_C_Basis_V2.0.pdf。
-->

---
class: l1-page
---

<div class="eyebrow">01  预测实验 / Q2</div>

# 三种写法，屏幕上会出现什么？

<div class="l1-columns">
<div>



```c
printf("A\nB\n");
printf("A\\nB\n");
printf("A/nB\n");
```



</div>
<div>

<dl class="l1-dl"><div><dt>先预测</dt><dd>哪一段输出两行？</dd></div><div><dt>再运行</dt><dd>哪一段真的打印出 \n？</dd></div><div><dt>再解释</dt><dd>反斜杠和斜杠一样吗？</dd></div></dl>

</div>
</div>

<!--
原 PPT 第 5 页；内容、表格及讲师说明取自 CONE_C语言_金石滩_L1.pptx。
【建议用时】1.5 分钟
【教学动作】不要先解释。让学生先写下三段输出。第一段 A、B 分两行，第二段一行 A\nB，第三段一行 A/nB。每段尾部有换行。
【本页内容】三种写法，屏幕上会出现什么？
printf("A\nB\n");
printf("A\\nB\n");
printf("A/nB\n");
先预测：哪一段输出两行？
再运行：哪一段真的打印出 \n？
再解释：反斜杠和斜杠一样吗？
【依据】https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1570.pdf
课程材料：1.Hello+World!.pdf；2.变量、数据类型与运算符.pdf；3.逻辑判断与分支结构.pdf；CONE-EC_2026_-_Lecture_1_-_C_Basis_V2.0.pdf。
-->

---
class: l1-page
---

<div class="eyebrow">01  回答 Q2</div>

# 转义序列表示特殊字符

<table><thead><tr><th>源代码中的写法</th><th>字符串表示的内容</th></tr></thead><tbody><tr><td>\n</td><td>一个换行字符</td></tr><tr><td>\\</td><td>一个反斜杠</td></tr><tr><td>\"</td><td>一个双引号</td></tr></tbody></table><div class="l1-bottom">编译时识别转义序列，运行时输出对应字符</div>

<!--
原 PPT 第 6 页；内容、表格及讲师说明取自 CONE_C语言_金石滩_L1.pptx。
【建议用时】1.5 分钟
【教学动作】强调源文件中看见的字符数不等于字符串包含的字符数。补充口头题：printf("\"RM\"\n"); 输出带双引号的 RM。终端决定换行如何显示，具体字节值属于执行字符集。
【本页内容】转义序列表示特殊字符
【依据】https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1570.pdf
课程材料：1.Hello+World!.pdf；2.变量、数据类型与运算符.pdf；3.逻辑判断与分支结构.pdf；CONE-EC_2026_-_Lecture_1_-_C_Basis_V2.0.pdf。
-->

---
class: l1-page
---

<div class="eyebrow">02  独立练习 / 4 分钟</div>

# 输出完全相同的两行内容

<div class="l1-columns">
<div>

<div class="label">目标输出</div>

```text
Hello, RoboMaster!
I can print "RM".
```



</div>
<div>

<dl class="l1-dl"><div><dt>任务</dt><dd>独立修改 main.c 并运行</dd></div><div><dt>要求</dt><dd>行数、大小写、双引号一致</dd></div><div><dt>选做</dt><dd>再打印一行字面量 \n</dd></div></dl>

</div>
</div>
<div class="l1-bottom">先自己写，再对照屏幕检查输出</div>

<!--
原 PPT 第 7 页；内容、表格及讲师说明取自 CONE_C语言_金石滩_L1.pptx。
【建议用时】4 分钟
【教学动作】此处左侧是目标输出，不是 C 源代码。助教优先帮助无法构建的同学。新建项目放到课前准备或有余力时完成，避免课堂时间花在环境配置。
【本页内容】输出完全相同的两行内容
Hello, RoboMaster!
I can print "RM".
任务：独立修改 main.c 并运行
要求：行数、大小写、双引号一致
选做：再打印一行字面量 \n
【依据】https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1570.pdf
课程材料：1.Hello+World!.pdf；2.变量、数据类型与运算符.pdf；3.逻辑判断与分支结构.pdf；CONE-EC_2026_-_Lecture_1_-_C_Basis_V2.0.pdf。
-->

---
class: l1-page
---

<div class="eyebrow">02  练习讲评</div>

# 输出写法与实际结果

<div class="l1-columns">
<div>



```c
printf("Hello, RoboMaster!\n");
printf("I can print \"RM\".\n");
printf("\\n\n");
```



</div>
<div>

<dl class="l1-dl"><div><dt>检查一</dt><dd>字符串用英文双引号</dd></div><div><dt>检查二</dt><dd>语句末尾有分号</dd></div><div><dt>检查三</dt><dd>\"、\\、\n 各有用途</dd></div></dl>

</div>
</div>

<!--
原 PPT 第 8 页；内容、表格及讲师说明取自 CONE_C语言_金石滩_L1.pptx。
【建议用时】1 分钟
【教学动作】将学生代码与目标输出比较。可以用两次 printf，也可以用一次 printf，中间写换行。不要因实现不同判为错误。第三行是选做答案。
【本页内容】输出写法与实际结果
printf("Hello, RoboMaster!\n");
printf("I can print \"RM\".\n");
printf("\\n\n");
检查一：字符串用英文双引号
检查二：语句末尾有分号
检查三：\"、\\、\n 各有用途
【依据】https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1570.pdf
课程材料：1.Hello+World!.pdf；2.变量、数据类型与运算符.pdf；3.逻辑判断与分支结构.pdf；CONE-EC_2026_-_Lecture_1_-_C_Basis_V2.0.pdf。
-->
