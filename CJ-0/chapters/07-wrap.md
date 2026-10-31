---
class: l1-page
---

<div class="eyebrow">08  六个问题的回访</div>

# 现在，用自己的话回答

<div class="l1-review"><div><b>Q1  .c 与 .exe</b><p>构建生成目标平台程序，运行时再加载执行</p></div><div><b>Q2  转义序列</b><p>源代码中的特殊写法表示对应字符</p></div><div><b>Q3  变量与内存</b><p>区分名字、值、地址，用 sizeof 查看大小</p></div><div><b>Q4  scanf 的 &amp;</b><p>输入函数需要写入目标变量的位置</p></div><div><b>Q5  = 与 ==</b><p>一个修改变量，一个判断关系</p></div><div><b>Q6  样例与评测</b><p>还要检查范围、边界与输出约定</p></div></div>
<!--
原 PPT 第 53 页；内容、表格及讲师说明取自 CONE_C语言_金石滩_L1.pptx。
【建议用时】2 分钟
【教学动作】请六位同学各用一句话解释，也可两人互问。若 Q3/Q4 仍卡住，回到“用 sizeof 和取地址观察变量”页。避免只读屏幕，让学生加一个例子。
【本页内容】现在，用自己的话回答
Q1  .c 与 .exe：构建生成目标平台程序，运行时再加载执行
Q2  转义序列：源代码中的特殊写法表示对应字符
Q3  变量与内存：区分名字、值、地址，用 sizeof 查看大小
Q4  scanf 的 &：输入函数需要写入目标变量的位置
Q5  = 与 ==：一个修改变量，一个判断关系
Q6  样例与评测：还要检查范围、边界与输出约定
【依据】https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1570.pdf
课程材料：1.Hello+World!.pdf；2.变量、数据类型与运算符.pdf；3.逻辑判断与分支结构.pdf；CONE-EC_2026_-_Lecture_1_-_C_Basis_V2.0.pdf。
-->

---
class: l1-page
---

<div class="eyebrow">08  课后必做 / 圆的计算</div>

# 圆的面积与周长：完整题目

<dl class="l1-spec"><div><dt>任务</dt><dd>给定半径 r，计算圆的面积与周长</dd></div><div><dt>约定</dt><dd>π 取 3.1415926；面积 = πr²，周长 = 2πr</dd></div><div><dt>输入</dt><dd>一个有效实数 r；若 r &lt; 0，输出 INVALID</dd></div><div><dt>输出</dt><dd>否则同一行先输出面积、再输出周长，各保留两位小数</dd></div><div><dt>样例</dt><dd>输入 1    输出 3.14 6.28（以一个空格分隔）</dd></div></dl><div class="l1-bottom">至少测试 −1、0、1；说明为什么选择 double</div>

<!--
原 PPT 第 54 页；内容、表格及讲师说明取自 CONE_C语言_金石滩_L1.pptx。
【建议用时】1 分钟
【教学动作与答案】课堂自编题，保持与已给circle.c一致。输出只有一行，负半径特殊情况不计算。0给0.00 0.00，不添加额外提示。
【本页题意或说明】
【代码或文件片段】
【依据】https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1570.pdf
-->

---
class: l1-page
---

<div class="eyebrow">08  课后任务</div>

# 把“会写”变成“能解释”

<div class="l1-three"><section><h2>必做</h2><p>独立完成圆的面积与周长<br>完成成绩分级与洛谷 P1001</p></section><section><h2>每题附上</h2><p>一组普通测试、一组边界测试<br>一句话解释变量类型和输入输出</p></section><section><h2>选做</h2><p>简易计算器<br>GCC 中间文件与结构体布局观察</p></section></div><div class="l1-bottom">下节课：循环，以及如何让一段逻辑重复执行</div>

<!--
原 PPT 第 55 页；内容、表格及讲师说明取自 CONE_C语言_金石滩_L1.pptx。
【建议用时】2 分钟
【教学动作】主课到此结束。后面四页为讲师可选拓展，放映中设为隐藏，不计入 120 分钟。附件有学生版任务、参考实现及观察程序。洛谷入门题单与团队由讲师课前提供，不编造团队链接。
【本页内容】把“会写”变成“能解释”
必做：独立完成圆的面积与周长
完成成绩分级与洛谷 P1001
每题附上：一组普通测试、一组边界测试
一句话解释变量类型和输入输出
选做：简易计算器
GCC 中间文件与结构体布局观察
【依据】https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1570.pdf
课程材料：1.Hello+World!.pdf；2.变量、数据类型与运算符.pdf；3.逻辑判断与分支结构.pdf；CONE-EC_2026_-_Lecture_1_-_C_Basis_V2.0.pdf。
-->
