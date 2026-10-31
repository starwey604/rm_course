---
class: l1-page
---

<div class="eyebrow">04  变量与运算</div>

# 初始化、赋值与读取

<div class="l1-columns">
<div>



```c
int count = 3;
count = count + 1;
printf("%d\n", count);
const double PI = 3.1415926;
```



</div>
<div>

<dl class="l1-dl"><div><dt>初始化</dt><dd>定义变量时给出初值</dd></div><div><dt>赋值</dt><dd>计算右侧，再写入左侧</dd></div><div><dt>const</dt><dd>给变量加上“只读”限制<br>初始化后不再修改它</dd></div></dl>

</div>
</div>
<div class="l1-bottom">在 main 里写 int a; 不等于 a = 0<br>没有可靠初值时，先赋值，再读取或计算</div>

<!--
原 PPT 第 17 页；内容、表格及讲师说明取自 CONE_C语言_金石滩_L1.pptx。
【建议用时】2 分钟
【教学动作】预测输出 4，解释 count = count + 1 为什么成立。const 变量不等于所有 C 场景下的编译期常量，不把这一点作为本节考点。不要说声明的盒子“空着等于 0”。
【本页内容】初始化、赋值与读取
int count = 3;
count = count + 1;
printf("%d\n", count);
const double PI = 3.1415926;
初始化：定义变量时给出初值
赋值：计算右侧，再写入左侧
const：通过该变量禁止修改值
【依据】https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1570.pdf
课程材料：1.Hello+World!.pdf；2.变量、数据类型与运算符.pdf；3.逻辑判断与分支结构.pdf；CONE-EC_2026_-_Lecture_1_-_C_Basis_V2.0.pdf。
课堂只讨论main里普通局部变量。未初始化值不能解释成可靠的随机数，也不能保证只算出一个怪结果。不要将此规则推广到所有存储期变量。
-->

---
class: l1-page
---

<div class="eyebrow">04  变量与类型 / 存储单位</div>

# 存储单位：bit 与字节

<div class="large key-point">1 字节（Byte，B） = 8 比特（bit，b）</div><div class="l1-lead">每个 bit 就是一个二进制位，只能是 0 或 1</div>
<MemoryBytes kind="bits" /><div class="l1-lead">8 个二进制位合在一起，就是 1 字节</div>
<div class="l1-lead">后面讨论变量大小、内存容量时，默认用字节（B）作单位</div>
<div class="l1-lead">例如：int 占 4 字节（4 B），就是 32 bit</div>
<div class="l1-bottom">记法：大写 B 是字节，小写 b 是比特</div>

<!--
原 PPT 第 18 页；内容、表格及讲师说明取自 CONE_C语言_金石滩_L1.pptx。
【建议用时】1 分钟
【讲解与互动】先指出每个格子是一位bit，每位只能取0或1；八格合成一个Byte，即字节。后面变量大小、内存容量、sizeof结果都以字节计量，看到4字节应理解为32bit。本页采用本课电脑和STM32常见的8bit字节。通信速率等若明确标bit或bit/s，应按位解释，不能把所有物理量都默认换成字节。
【内容依据】本课PC平台CHAR_BIT=8；C11公开草案的sizeof与CHAR_BIT定义 https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1570.pdf
-->

---
class: l1-page
---

<div class="eyebrow">04  数据类型</div>

# 类型影响表示范围、精度和运算

<table><thead><tr><th>类型</th><th>常见占用</th><th>示例</th><th>本课用途</th></tr></thead><tbody><tr><td>char</td><td>1 字节</td><td>'A'</td><td>单个字符</td></tr><tr><td>int</td><td>4 字节</td><td>72</td><td>整数计数</td></tr><tr><td>float</td><td>4 字节</td><td>3.5f</td><td>单精度浮点数</td></tr><tr><td>double</td><td>8 字节</td><td>3.5</td><td>双精度浮点数</td></tr></tbody></table><div class="l1-bottom">表中大小采用常见 PC 环境，实际用 sizeof 验证</div>

<!--
原 PPT 第 19 页；内容、表格及讲师说明取自 CONE_C语言_金石滩_L1.pptx。
【建议用时】1 分钟
【教学动作】C 保证 sizeof(char) 为 1，一个字节的位数由实现决定，本课 PC 与目标 MCU 按 8 位字节。int 4、float 4、double 8 是常见情况而非所有实现的统一承诺。char 的字符编码也依赖执行环境。
【本页内容】类型影响表示范围、精度和运算
【依据】https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1570.pdf
课程材料：1.Hello+World!.pdf；2.变量、数据类型与运算符.pdf；3.逻辑判断与分支结构.pdf；CONE-EC_2026_-_Lecture_1_-_C_Basis_V2.0.pdf。
-->

---
class: l1-page
---

<div class="eyebrow">04  输入与输出</div>

# 格式说明符要与参数类型匹配

<table><thead><tr><th>变量类型</th><th>scanf 输入</th><th>printf 输出</th></tr></thead><tbody><tr><td>int</td><td>%d，传入 &amp;变量</td><td>%d，传入变量值</td></tr><tr><td>float</td><td>%f，传入 &amp;变量</td><td>%f，传入变量值</td></tr><tr><td>double</td><td>%lf，传入 &amp;变量</td><td>%f，传入变量值</td></tr><tr><td>char</td><td>%c，传入 &amp;变量</td><td>%c，传入变量值</td></tr></tbody></table><div class="l1-bottom">printf 打印 float 和 double 都用 %f<br>scanf 读取 float 用 %f，读取 double 用 %lf；%.2f 控制输出精度</div>

<!--
原 PPT 第 20 页；内容、表格及讲师说明取自 CONE_C语言_金石滩_L1.pptx。
【建议用时】2 分钟
【教学动作】本表限本课的标量变量例子，不推广为 scanf 所有参数都加 &。讲清输入 float 和 double 的格式区别。printf 的 %lf 在现代 C 也可用于 double，但课堂统一 %f。
【本页内容】格式说明符要与参数类型匹配
【依据】https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1570.pdf
课程材料：1.Hello+World!.pdf；2.变量、数据类型与运算符.pdf；3.逻辑判断与分支结构.pdf；CONE-EC_2026_-_Lecture_1_-_C_Basis_V2.0.pdf。
-->

---
class: l1-page
---

<div class="eyebrow">04  初步回答 Q4</div>

# printf 拿内容，scanf 要地址

<div class="l1-columns equal">
<div>

<div class="label">printf：拿到数字就能打印</div>

```c
printf("%d\n", age);
```

<div class="l1-lead">把盒子里的数字递给它<br>它拿到 18，就能打印 18<br>不用知道盒子放在哪里</div>


</div>
<div>

<div class="label">scanf：像快递员送货上门</div>

```c
scanf("%d", &age);
```

<div class="l1-lead">它要把输入的数字放进盒子<br>必须告诉它盒子的“门牌号”<br>&amp;age 就是这个内存地址</div>


</div>
</div>
<div class="l1-bottom">age 是盒子里的值，&amp;age 是盒子的地址；取地址符就是 &amp;</div>

<!--
原 PPT 第 21 页；内容、表格及讲师说明取自 CONE_C语言_金石滩_L1.pptx。
【建议用时】2 分钟
【讲解与互动】比喻：变量像盒子，地址像门牌号。printf参数age提供当前整数值；scanf需要指向age的地址才能写入。漏写&会使参数类型不匹配，可能写入无效位置，属于未定义行为，不能保证当场崩溃。比喻只用于本课标量例子，不推广到scanf读取数组或字符串。
【内容依据】C11 公开草案 https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1570.pdf
GCC 构建阶段 https://gcc.gnu.org/onlinedocs/gcc/Overall-Options.html
-->

---
class: l1-page
---

<div class="eyebrow">04  预测实验</div>

# 运算的类型会改变结果

<div class="l1-columns">
<div>



```c
printf("%d\n", 9 / 5);
printf("%.1f\n", 9.0 / 5.0);
printf("%d\n", 10 % 3);
double ratio = 9 / 5;
```



</div>
<div>

<dl class="l1-dl"><div><dt>预测</dt><dd>前三行分别输出什么？</dd></div><div><dt>追问</dt><dd>ratio 最后等于 1 还是 1.8？</dd></div><div><dt>解释</dt><dd>先计算右边，再转换与赋值</dd></div></dl>

</div>
</div>
<div class="l1-bottom">把整数除法的结果放进 double，也无法补回小数部分</div>

<!--
原 PPT 第 22 页；内容、表格及讲师说明取自 CONE_C语言_金石滩_L1.pptx。
【建议用时】2 分钟
【教学动作】前三行是 1、1.8、1。ratio 为 1.0。整数除法向零截断，此处正数可直观理解为去掉小数部分。顺带认识 +、-、*、/、% 的用途，% 只用于整数。
【本页内容】运算的类型会改变结果
printf("%d\n", 9 / 5);
printf("%.1f\n", 9.0 / 5.0);
printf("%d\n", 10 % 3);
double ratio = 9 / 5;
预测：前三行分别输出什么？
追问：ratio 最后等于 1 还是 1.8？
解释：先计算右边，再转换与赋值
【依据】https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1570.pdf
课程材料：1.Hello+World!.pdf；2.变量、数据类型与运算符.pdf；3.逻辑判断与分支结构.pdf；CONE-EC_2026_-_Lecture_1_-_C_Basis_V2.0.pdf。
-->

---
class: l1-page
---

<div class="eyebrow">04  随堂练习 / 温度转换</div>

# 摄氏温度转换器：完整题目

<dl class="l1-spec"><div><dt>任务</dt><dd>给定摄氏温度 C，计算对应华氏温度 F</dd></div><div><dt>公式</dt><dd>F = C × 9 / 5 + 32</dd></div><div><dt>输入</dt><dd>一个有效实数 C，可为负数或含小数</dd></div><div><dt>输出</dt><dd>一行，仅输出 F，保留两位小数</dd></div><div><dt>样例</dt><dd>输入 25    输出 77.00</dd></div></dl><div class="l1-bottom">先手算，再写程序；另测 0、100、−40</div>

<!--
原 PPT 第 23 页；内容、表格及讲师说明取自 CONE_C语言_金石滩_L1.pptx。
【建议用时】1 分钟
【教学动作与答案】课堂自编练习，不编造洛谷题号。没有额外数值范围要求，只使用能被本课double正常表示的普通温度数据。题目保证输入合法，输入失败的处理稍后在分支章节讲解。
【本页题意或说明】
【代码或文件片段】
【依据】https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1570.pdf
-->

---
class: l1-page
clicks: 8
---

<div class="eyebrow">04  随堂练习 / 7 分钟</div>

# 摄氏温度转换器：代码填空

<div class="l1-lead">任务：输入一个摄氏温度 C，计算 F = C × 9 / 5 + 32<br>输出：仅输出华氏温度，保留两位小数并换行；本题假定输入有效</div>
<LessonFill kind="temperature" :step="$clicks" /><div class="l1-bottom">样例：25 得到 77.00；完成后测试 0、100、−40</div>

<!--
原 PPT 第 24 页；内容、表格及讲师说明取自 CONE_C语言_金石滩_L1.pptx。
【建议用时】7 分钟
【教学动作与答案】四空：%lf、&celsius、9.0 / 5.0、%.2f。这里不提前使用if。完整程序外壳沿用HelloWorld。快的同学说明为什么仅测0发现不了整数除法错误。
【本页题意或说明】任务：输入一个摄氏温度 C，计算 F = C × 9 / 5 + 32
输出：仅输出华氏温度，保留两位小数并换行；本题假定输入有效
【代码或文件片段】
double celsius, fahrenheit;
scanf("[①]", [②]);
fahrenheit = celsius * ([③]) + 32;
printf("[④]\n", fahrenheit);
【依据】https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1570.pdf
-->

---
class: l1-page
---

<div class="eyebrow">04  温度转换讲评</div>

# 温度转换：类型、公式与精度

<div class="l1-lead">任务：输入一个摄氏温度 C，计算 F = C × 9 / 5 + 32<br>输出：仅输出华氏温度，保留两位小数并换行；本题假定输入有效</div>
<div class="l1-columns">
<div>



```c
double celsius, fahrenheit;
scanf("%lf", &celsius);
fahrenheit = celsius * (9.0 / 5.0) + 32;
printf("%.2f\n", fahrenheit);
```



</div>
<div>

<table><thead><tr><th>摄氏温度 C</th><th>华氏温度 F</th></tr></thead><tbody><tr><td>0</td><td>32.00</td></tr><tr><td>100</td><td>212.00</td></tr><tr><td>−40</td><td>-40.00</td></tr></tbody></table>

</div>
</div>
<div class="l1-bottom">C = 0 时，0 × 1.8 + 32 与 0 × 1 + 32 都得到 32.00<br>所以只测 0 会漏错，另测 100 才能区分</div>

<!--
原 PPT 第 25 页；内容、表格及讲师说明取自 CONE_C语言_金石滩_L1.pptx。
【建议用时】3 分钟
【教学动作与答案】题目保证有效输入，基础版只保留scanf核心。0乘任意系数仍为0，所以错误9/5也可能输出32。输入检查在分支部分专页补齐。
【本页题意或说明】任务：输入一个摄氏温度 C，计算 F = C × 9 / 5 + 32
输出：仅输出华氏温度，保留两位小数并换行；本题假定输入有效
【代码或文件片段】
double celsius, fahrenheit;
scanf("%lf", &celsius);
fahrenheit = celsius * (9.0 / 5.0) + 32;
printf("%.2f\n", fahrenheit);
【依据】https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1570.pdf
-->
