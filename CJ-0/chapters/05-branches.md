---
class: l1-page
---

<div class="eyebrow">06  条件与逻辑</div>

# 比较产生结果，逻辑组合条件

<table><thead><tr><th>运算</th><th>示例</th><th>含义</th></tr></thead><tbody><tr><td>&gt;  &lt;  &gt;=  &lt;=</td><td>temperature &gt;= 60</td><td>阈值与区间判断</td></tr><tr><td>==  !=</td><td>mode == 1</td><td>判断相等或不等</td></tr><tr><td>&amp;&amp;</td><td>score &gt;= 0 &amp;&amp; score &lt;= 100</td><td>两个条件都为真</td></tr><tr><td>||  !</td><td>score &lt; 0 || score &gt; 100</td><td>至少一个条件为真，! 表示取反</td></tr></tbody></table><div class="l1-bottom">条件判断中，0 为假，非 0 为真；比较和逻辑运算结果为 0 或 1</div>

<!--
原 PPT 第 32 页；内容、表格及讲师说明取自 CONE_C语言_金石滩_L1.pptx。
【建议用时】2 分钟
【教学动作】不要写 0 <= score <= 100，它先计算左侧比较得到 0 或 1，再与 100 比较。可口头请同学找错。&& 与 || 短路求值有时间再补充。
【本页内容】比较产生结果，逻辑组合条件
【依据】https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1570.pdf
课程材料：1.Hello+World!.pdf；2.变量、数据类型与运算符.pdf；3.逻辑判断与分支结构.pdf；CONE-EC_2026_-_Lecture_1_-_C_Basis_V2.0.pdf。
-->

---
class: l1-page
---

<div class="eyebrow">06  分支结构</div>

# if 与 else 选择执行路径

<div class="l1-columns">
<div>



```c
if (temperature >= 60.0) {
    printf("COOLING\n");
} else {
    printf("NORMAL\n");
}
```



</div>
<div>

<dl class="l1-dl"><div><dt>59.9</dt><dd>走哪一个分支？</dd></div><div><dt>60.0</dt><dd>等号会改变边界结果</dd></div><div><dt>假设</dt><dd>60 仅为课堂演示阈值</dd></div></dl>

</div>
</div>
<div class="l1-bottom">同一条 if / else，执行其中一个分支</div>

<!--
原 PPT 第 33 页；内容、表格及讲师说明取自 CONE_C语言_金石滩_L1.pptx。
【建议用时】3 分钟
【教学动作】让同学用手指两边表示预测，不必每次请一人长答。温度保护阈值要依据具体设备要求，本页只演示控制逻辑，不表示 RM 硬件规范。
【本页内容】if 与 else 选择执行路径
if (temperature >= 60.0) {
    printf("COOLING\n");
} else {
    printf("NORMAL\n");
}
59.9：走哪一个分支？
60.0：等号会改变边界结果
假设：60 仅为课堂演示阈值
【依据】https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1570.pdf
课程材料：1.Hello+World!.pdf；2.变量、数据类型与运算符.pdf；3.逻辑判断与分支结构.pdf；CONE-EC_2026_-_Lecture_1_-_C_Basis_V2.0.pdf。
-->

---
class: l1-page
---

<div class="eyebrow">04  scanf 的另一个结果</div>

# 输入的数值与函数返回值是两回事



```c
double celsius = 0.0;
int matched = scanf("%lf", &celsius);
```

<table><thead><tr><th>本次输入</th><th>celsius 中的内容</th><th>matched 返回值</th></tr></thead><tbody><tr><td>25</td><td>变为 25.0</td><td>1：成功赋值 1 项</td></tr><tr><td>abc</td><td>保持原值 0.0</td><td>0：没有成功赋值</td></tr></tbody></table><div class="l1-bottom">matched 记录成功项数；输入结束等情况也可能返回 EOF</div>

<!--
原 PPT 第 34 页；内容、表格及讲师说明取自 CONE_C语言_金石滩_L1.pptx。
【建议用时】2 分钟
【教学动作与答案】显示 int matched = scanf("%lf", &celsius);。输入25则celsius=25且matched=1；输入abc则matched=0且celsius保留原值，故演示先初始化为0。输入结束且第一次转换前发生输入失败时可能返回EOF，一般为负值，放讲师补充，不把“失败总返回0”写为规则。只打印matched供课堂观察，此测试提示不放入OJ程序。
【本页题意或说明】
【代码或文件片段】
【依据】https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/scanf-scanf-l-wscanf-wscanf-l?view=msvc-170
https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1570.pdf
-->

---
class: l1-page
---

<div class="eyebrow">06  分支回访 / 输入检查</div>

# 这段 if 为什么能检查输入？

<div class="l1-lead">回到温度转换：必须先成功读到一个数，才能继续计算<br>scanf 返回成功赋值的项数；本次期望读到 1 项</div>
<div class="l1-columns">
<div>



```c
int matched = scanf("%lf", &celsius);
if (matched != 1) {
    return 1;
}
fahrenheit = celsius * (9.0 / 5.0) + 32;
```



</div>
<div>

<dl class="l1-dl"><div><dt>scanf(...)</dt><dd>尝试读取，并返回成功项数</dd></div><div><dt>matched != 1</dt><dd>项数不是 1，说明未读成功</dd></div><div><dt>return 1</dt><dd>提前结束 main<br>后面的计算不会执行</dd></div></dl>

</div>
</div>
<div class="l1-bottom">合并写法：if (scanf("%lf", &amp;celsius) != 1) { return 1; }</div>

<!--
原 PPT 第 35 页；内容、表格及讲师说明取自 CONE_C语言_金石滩_L1.pptx。
【建议用时】1.5 分钟
【教学动作与答案】先请学生拆出三步动作，再指出可直接把返回值放进if条件。return1是程序退出状态，不是scanf的返回值。成功读入一个数返回1，输入结束也属于 !=1，避免把“1表示成功”无条件推广到scanf所有格式：两项则期望2。此页先前已经讲过!=与if。
【本页题意或说明】回到温度转换：必须先成功读到一个数，才能继续计算
scanf 返回成功赋值的项数；本次期望读到 1 项
【代码或文件片段】
int matched = scanf("%lf", &celsius);
if (matched != 1) {
    return 1;
}
fahrenheit = celsius * (9.0 / 5.0) + 32;
【依据】https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/scanf-scanf-l-wscanf-wscanf-l?view=msvc-170
https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1570.pdf
-->

---
class: l1-page
---

<div class="eyebrow">06  预测实验 / Q5</div>

# 两个条件，输出与变量值会怎样？

<div class="l1-columns equal">
<div>

<div class="label">程序 A</div>

```c
int x = 0;
if (x = 5) {
    printf("A\n");
}
```



</div>
<div>

<div class="label">程序 B</div>

```c
int x = 0;
if (x == 5) {
    printf("B\n");
}
```



</div>
</div>
<div class="l1-bottom">分别预测：会不会输出？执行后 x 是多少？</div>

<!--
原 PPT 第 36 页；内容、表格及讲师说明取自 CONE_C语言_金石滩_L1.pptx。
【建议用时】2.5 分钟
【教学动作】两段是互相独立的程序片段。先不运行，给 20 秒预测。编译器可能警告赋值用作条件，但 C 语法允许。
【本页内容】两个条件，输出与变量值会怎样？
【依据】https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1570.pdf
课程材料：1.Hello+World!.pdf；2.变量、数据类型与运算符.pdf；3.逻辑判断与分支结构.pdf；CONE-EC_2026_-_Lecture_1_-_C_Basis_V2.0.pdf。
-->

---
class: l1-page
---

<div class="eyebrow">06  回答 Q5</div>

# 赋值会修改变量，比较会判断关系

<div class="l1-columns equal">
<div>

<h2>if (x = 5)</h2><div class="l1-lead">先把 5 写入 x<br>赋值表达式的值为 5<br>非零为真，输出 A<br>执行后 x 为 5</div>


</div>
<div>

<h2>if (x == 5)</h2><div class="l1-lead">比较 x 和 5<br>x 初始为 0，比较结果为 0<br>条件为假，不输出 B<br>执行后 x 仍为 0</div>


</div>
</div>
<div class="l1-bottom">迁移检查：if (x = 0) 又会发生什么？</div>

<!--
原 PPT 第 37 页；内容、表格及讲师说明取自 CONE_C语言_金石滩_L1.pptx。
【建议用时】2.5 分钟
【教学动作】迁移题答案：x 被写为 0，条件为假。请学生分清“修改了值”和“进入分支”可以分别成立或不成立。实际代码尽量避免赋值作为条件，启用编译警告。
【本页内容】赋值会修改变量，比较会判断关系
if (x = 5)：先把 5 写入 x
赋值表达式的值为 5
非零为真，输出 A
执行后 x 为 5
if (x == 5)：比较 x 和 5
x 初始为 0，比较结果为 0
条件为假，不输出 B
执行后 x 仍为 0
【依据】https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1570.pdf
课程材料：1.Hello+World!.pdf；2.变量、数据类型与运算符.pdf；3.逻辑判断与分支结构.pdf；CONE-EC_2026_-_Lecture_1_-_C_Basis_V2.0.pdf。
-->

---
class: l1-page
---

<div class="eyebrow">06  成绩分级 / 读题</div>

# 成绩分级：完整题目与测试

<div class="l1-lead">输入：一个整数成绩；输出：对应等级，独占一行</div>
<table><thead><tr><th>成绩区间</th><th>输出</th></tr></thead><tbody><tr><td>90～100 / 80～89 / 70～79</td><td>A / B / C</td></tr><tr><td>60～69 / 0～59</td><td>D / E</td></tr><tr><td>小于 0 或大于 100</td><td>INVALID</td></tr></tbody></table><div class="l1-lead">样例：输入 90，输出 A；输入 101，输出 INVALID</div>
<div class="l1-bottom">读清规则，下一页用 6 分钟填空；再测边界与非法成绩</div>

<!--
原 PPT 第 38 页；内容、表格及讲师说明取自 CONE_C语言_金石滩_L1.pptx。
【建议用时】1 分钟
【教学动作与答案】自编题。输入是一个可表示的整数成绩，输出A/B/C/D/E/INVALID之一，独占一行。分级从高到低或低到高均可，必须保证区间互斥和覆盖。学生练习时间保留7分钟。
【本页题意或说明】
【代码或文件片段】
【依据】https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1570.pdf
-->

---
class: l1-page l1-grade
clicks: 4
---

<div class="eyebrow">06  随堂练习 / 6 分钟</div>

# 成绩分级：关键条件填空

<div class="l1-lead">输入一个整数成绩；90～100 为 A，80～89 为 B，70～79 为 C<br>60～69 为 D，0～59 为 E，范围外输出 INVALID；每次只输出一行</div>
<LessonFill kind="grade" :step="$clicks" />
<!--
原 PPT 第 39 页；内容、表格及讲师说明取自 CONE_C语言_金石滩_L1.pptx。
【建议用时】6 分钟
【讲解与互动】输入score已成功读入。空①为||，因为只需低于0或高于100任一成立就非法。空②为score >= 90。先让学生自己填，再用59、60、89、90、100、101验证。到>=80前已经不满足>=90，所以不用再次写score<90。下一页是完整答案，不在题目页提前给答案。
【内容依据】C11 公开草案 https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1570.pdf
GCC 构建阶段 https://gcc.gnu.org/onlinedocs/gcc/Overall-Options.html
-->

---
class: l1-page l1-grade
---

<div class="eyebrow">06  成绩分级讲评</div>

# 分级条件与题目区间逐项对应

<div class="l1-lead">输入一个整数成绩；90～100 为 A，80～89 为 B，70～79 为 C<br>60～69 为 D，0～59 为 E，范围外输出 INVALID；每次只输出一行</div>
<div class="l1-dense">
<div class="l1-columns">
<div>



```c
if (score < 0 || score > 100) {
    printf("INVALID\n");
} else if (score >= 90) {
    printf("A\n");
} else if (score >= 80) {
    printf("B\n");
} else if (score >= 70) {
    printf("C\n");
} else if (score >= 60) {
    printf("D\n");
} else {
    printf("E\n");
}
```



</div>
<div>

<dl class="l1-dl"><div><dt>先排除非法范围</dt><dd>小于 0 或大于 100<br>输出 INVALID</dd></div><div><dt>再从高到低分类</dt><dd>进入 &gt;= 80 时<br>已经知道 score &lt; 90</dd></div><div><dt>边界验证</dt><dd>59 是 E，60 是 D<br>100 是 A，101 非法</dd></div></dl>

</div>
</div>
</div>

<!--
原 PPT 第 40 页；内容、表格及讲师说明取自 CONE_C语言_金石滩_L1.pptx。
【建议用时】3 分钟
【教学动作与答案】题意留在屏幕上方与右侧，完整代码见参考材料。score已读取成功。全页只使用已经学过的printf与\n。
【本页题意或说明】输入一个整数成绩；90～100 为 A，80～89 为 B，70～79 为 C
60～69 为 D，0～59 为 E，范围外输出 INVALID；每次只输出一行
【代码或文件片段】
if (score < 0 || score > 100) {
    puts("INVALID");
} else if (score >= 90) {
    puts("A");
} else if (score >= 80) {
    puts("B");
} else if (score >= 70) {
    puts("C");
} else if (score >= 60) {
    puts("D");
} else {
    puts("E");
}
【依据】https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1570.pdf
-->

---
class: l1-page
---

<div class="eyebrow">06  多个固定值</div>

# switch 根据整数值匹配分支

<div class="l1-dense">
<div class="l1-columns">
<div>



```c
switch (mode) {
    case 0:
        printf("STOP\n");
        break;
    case 1:
        printf("RUN\n");
        break;
    default:
        printf("UNKNOWN\n");
        break;
}
```



</div>
<div>

<dl class="l1-dl"><div><dt>适用</dt><dd>整数或字符的固定值</dd></div><div><dt>break</dt><dd>退出当前 switch</dd></div><div><dt>default</dt><dd>处理未匹配的值，可省略</dd></div></dl>

</div>
</div>
</div>
<div class="l1-bottom">case 是入口，break 负责离开；下一页看漏写 break 的结果</div>

<!--
原 PPT 第 41 页；内容、表格及讲师说明取自 CONE_C语言_金石滩_L1.pptx。
【建议用时】0.5 分钟
【教学动作】不能说每一个 case 语法上必须写 break，刻意贯穿有合法用途。本课采用每段结束 break 的清晰风格。表达式是整数类型，case 是整型常量表达式。
【本页内容】switch 根据整数值匹配分支
switch (mode) {
    case 0:
        puts("STOP");
        break;
    case 1:
        puts("RUN");
        break;
    default:
        puts("UNKNOWN");
        break;
}
适用：整数或字符的固定值
break：退出当前 switch
default：处理未匹配的值，可省略
【依据】https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1570.pdf
课程材料：1.Hello+World!.pdf；2.变量、数据类型与运算符.pdf；3.逻辑判断与分支结构.pdf；CONE-EC_2026_-_Lecture_1_-_C_Basis_V2.0.pdf。
-->

---
class: l1-page
---

<div class="eyebrow">06  switch 预测实验</div>

# case 是入口，break 才让程序离开

<div class="l1-lead">假设 mode = 0，下面故意省略 case 0 后的 break</div>
<div class="l1-columns">
<div>



```c
switch (mode) {
    case 0:
        printf("STOP\n");
    case 1:
        printf("RUN\n");
        break;
}
```



</div>
<div>

<dl class="l1-dl"><div><dt>先匹配 case 0</dt><dd>打印 STOP</dd></div><div><dt>缺少 break</dt><dd>顺着往下走<br>接着打印 RUN</dd></div><div><dt>遇到 break 才离开</dt><dd>所以输出两行<br>STOP 和 RUN</dd></div></dl>

</div>
</div>
<div class="l1-bottom">走到 case 1 时不会重新判断 mode；case 只是入口，不是围墙</div>

<!--
原 PPT 第 42 页；内容、表格及讲师说明取自 CONE_C语言_金石滩_L1.pptx。
【建议用时】1 分钟
【讲解与互动】假设mode=0。缺少case0结尾的break，程序先打印STOP再顺着执行case1打印RUN，直到break离开switch。它不会在走到case1时重新判断mode==1。原始示例有break所以只打印STOP。C允许有意贯穿，本课用此例解释为什么通常写break。
【内容依据】C11 公开草案 https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1570.pdf
GCC 构建阶段 https://gcc.gnu.org/onlinedocs/gcc/Overall-Options.html
-->

---
class: l1-page
---

<div class="eyebrow">06  电控中的分支</div>

# 判断条件需要对应硬件假设

<div class="l1-columns">
<div>



```c
if (button_state == 0) {
    led_on();
}
if (temperature >= limit) {
    start_cooling();
}
```



</div>
<div>

<dl class="l1-dl"><div><dt>按键例子</dt><dd>假设该电路低电平有效</dd></div><div><dt>温度例子</dt><dd>阈值取自设备要求</dd></div><div><dt>真实工程</dt><dd>还要考虑消抖、滞回等</dd></div></dl>

</div>
</div>
<div class="l1-bottom">这里只展示逻辑，硬件函数由具体工程提供</div>

<!--
原 PPT 第 43 页；内容、表格及讲师说明取自 CONE_C语言_金石滩_L1.pptx。
【建议用时】1 分钟
【教学动作】伪代码片段，不是完整可编译程序。低电平并非所有按键的通用有效电平。避免把一个 if 直接描述为完整安全控制方案。
【本页内容】判断条件需要对应硬件假设
if (button_state == 0) {
    led_on();
}
if (temperature >= limit) {
    start_cooling();
}
按键例子：假设该电路低电平有效
温度例子：阈值取自设备要求
真实工程：还要考虑消抖、滞回等
【依据】https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1570.pdf
课程材料：1.Hello+World!.pdf；2.变量、数据类型与运算符.pdf；3.逻辑判断与分支结构.pdf；CONE-EC_2026_-_Lecture_1_-_C_Basis_V2.0.pdf。
-->
