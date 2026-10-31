---
class: l1-page
---

<div class="eyebrow">05  内存观察 / Q3</div>

# 一个字节也是一段存储空间



```c
char grade = 'A';
```

<MemoryBytes kind="char" /><div class="l1-lead">示意地址 0x1000；格内的 41 是十六进制。</div>
<div class="large key-point">65（十进制） = 01000001（二进制）</div><div class="l1-bottom">本例：8 位字节，ASCII 兼容字符集；地址为示意</div>

<!--
原 PPT 第 26 页；内容、表格及讲师说明取自 CONE_C语言_金石滩_L1.pptx。
【建议用时】1 分钟
【教学动作】本课按 8 位字节、ASCII 兼容字符集。示意地址 0x1000 不是实测地址。char grade 的一个字节值为 0x41，即十进制 65，按二进制写是 01000001。强调地址和值是两件事。
【本页内容】一个字节也是一段存储空间
【依据】https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1570.pdf
课程材料：1.Hello+World!.pdf；2.变量、数据类型与运算符.pdf；3.逻辑判断与分支结构.pdf；CONE-EC_2026_-_Lecture_1_-_C_Basis_V2.0.pdf。
-->

---
class: l1-page
---

<div class="eyebrow">05  内存观察 / Q3</div>

# 一个 int 会占用连续的几个字节



```c
int count = 72;
```

<div class="l1-lead">72（十进制）；每格 1 字节 = 8 位；本课 sizeof(int) = 4，共 32 位</div>
<MemoryBytes kind="int" /><div class="l1-lead">72 = 64 + 8，对应二进制 01001000；其余三个字节为 0</div>
<div class="l1-lead">本机按小端序存放：低位字节 01001000 放在最低地址</div>
<div class="l1-bottom">&amp;count 拿到第一格的地址 0x1000</div>

<!--
原 PPT 第 27 页；内容、表格及讲师说明取自 CONE_C语言_金石滩_L1.pptx。
【建议用时】3 分钟
【讲解与互动】本课PC测得sizeof(int)=4、CHAR_BIT=8。四个格子表示一个int的整体存储，不声称某一个字节直接保存十进制72。值72的大字覆盖整个四格，以便先理解占用空间与起始地址。0x1000是示意地址。字节内部如何表示72与字节序放选讲。
【内容依据】C11 公开草案 https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1570.pdf
GCC 构建阶段 https://gcc.gnu.org/onlinedocs/gcc/Overall-Options.html
【二进制示意】先展示十进制72，再沿向下箭头看四个字节。72=64+8，所以低位字节是01001000（从左往右位权128、64、32、16、8、4、2、1）。正数72在本课32位int中的其余三个字节均为0。地址是示意地址。本机使用小端序，因此低位字节放在低地址；每个字节内部仍按通常书写顺序显示二进制位。此处只说明这一格为什么放01001000，完整字节序例子留在选讲。
-->

---
class: l1-page
---

<div class="eyebrow">05  相关数据放在一起 / 结构体</div>

# 1 + 4 + 1 个字节，为什么可能占 12？

<div class="l1-lead">结构体：把几个相关的变量打包放在一起</div>
<div class="l1-columns">
<div>



```c
struct Sample {
    char flag;
    int value;
    char mode;
};
```



</div>
<div>

<div class="l1-lead">三个成员本身：1 + 4 + 1 = 6 字节</div>
<div class="l1-lead">本例 int 从 4 的倍数位置开始<br>中间需要留空，末尾也可能补空<br>灰色格子叫“填充”（Padding）</div>


</div>
</div>
<MemoryBytes kind="padding" /><div class="l1-bottom">本例总大小是 12 字节；结果以当前电脑的 sizeof 为准</div>

<!--
原 PPT 第 28 页；内容、表格及讲师说明取自 CONE_C语言_金石滩_L1.pptx。
【建议用时】3 分钟
【讲解与互动】先解释结构体是将相关变量打包的一种写法，成员就是包里的变量。不要求当堂掌握语法。按本机char1字节、int4字节且4字节对齐示例，flag偏移0，value偏移4，mode偏移8，总12。灰格是填充，不是程序可以依赖的有效数据。对齐是平台的存放规则；无需说所有CPU必须这样才能读。不要将三个独立变量也画成这个固定布局。依据本地struct_layout.c实际结果。
【内容依据】C11 公开草案 https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1570.pdf
GCC 构建阶段 https://gcc.gnu.org/onlinedocs/gcc/Overall-Options.html
-->

---
class: l1-page
---

<div class="eyebrow">05  回答 Q3、Q4</div>

# 用 sizeof 和取地址观察变量

<div class="l1-columns">
<div>



```c
int age = 18;
printf("value = %d\n", age);
printf("size = %zu\n", sizeof age);
printf("address = %p\n", (void *)&age);
scanf("%d", &age);
```

<div class="label spaced">实际运行输出（scanf 读入前）</div>

```text
value = 18
size = 4
address = 0000009755FFF83C
```



</div>
<div>

<dl class="l1-dl"><div><dt>变量名</dt><dd>变量名像盒子的标签</dd></div><div><dt>变量值</dt><dd>变量值是盒子里的内容</dd></div><div><dt>变量地址</dt><dd>&amp;age 是盒子的地址<br>scanf 按这个地址写入</dd></div></dl><div class="l1-lead">sizeof 查看占几字节，%p 显示地址</div>
<div class="tiny-note">地址为本机一次运行示例，每次运行可能不同</div>

</div>
</div>

<!--
原 PPT 第 29 页；内容、表格及讲师说明取自 CONE_C语言_金石滩_L1.pptx。
【建议用时】3 分钟
【教学动作】现场运行附件 memory_observe.c，地址每次可能不同，不要求与图一致。scanf 最后一行在幻灯片仅回顾核心接口，完整附件检查返回值。取地址不是 C++ 的引用语法。
【本页内容】用 sizeof 和取地址观察变量
int age = 18;
printf("value = %d\n", age);
printf("size = %zu\n", sizeof age);
printf("address = %p\n", (void *)&age);
scanf("%d", &age);
变量名：源代码里标识变量
变量值：变量当前存储的内容
变量地址：定位变量，供函数写入
【依据】https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1570.pdf
课程材料：1.Hello+World!.pdf；2.变量、数据类型与运算符.pdf；3.逻辑判断与分支结构.pdf；CONE-EC_2026_-_Lecture_1_-_C_Basis_V2.0.pdf。
【运行输出】value = 18
size = 4
address = 0000009755FFF83C
这些结果来自本机GCC编译后的实际运行，均为scanf执行前的输出。%p的格式由实现决定，本次输出不带0x前缀。地址每次运行可能不同，不能要求所有同学看到同一个地址。红色输出是一个名为demo-output的独立文本框，可选中后添加“出现/单击时”动画；标签和说明保持可见。
-->

---
class: l1-page
---

<div class="eyebrow">05  嵌入式联系</div>

# 通信序号：从 255 回到 0

<div class="l1-columns">
<div>



```c
#include <stdint.h>
uint8_t seq = 255;
seq = seq + 1;
uint32_t tick = 1000;
```

<div class="spaced"><div class="l1-lead">通信序号的一种常见做法：0～255 循环编号</div>
<div class="large mono">254 → 255 → 0 → 1 → …</div></div>

</div>
<div>

<dl class="l1-dl"><div><dt>uint8_t</dt><dd>占 1 字节（8 bit）<br>可表示 0～255</dd></div><div><dt>序号回绕</dt><dd>255 加 1 得到 256<br>存回 uint8_t 后变成 0</dd></div><div><dt>通信帧编号</dt><dd>给每一帧数据编号<br>序号按协议约定循环使用</dd></div></dl>

</div>
</div>
<div class="l1-bottom">seq 是序号；到达上限后，从 0 继续编号</div>

<!--
原 PPT 第 30 页；内容、表格及讲师说明取自 CONE_C语言_金石滩_L1.pptx。
【建议用时】2 分钟
【教学动作】seq + 1 先经整数提升运算，再转换回 uint8_t，结果模 256 为 0。不要说所有整数溢出都绕回，有符号整数溢出是未定义行为。精确宽度类型是可选类型，目标环境存在时宽度确定。小类型独立变量或结构体不保证恰好节省同样比例的总内存。
【本页内容】类型选择关系到范围和通信格式
#include <stdint.h>
uint8_t seq = 255;
seq = seq + 1;
uint32_t tick = 1000;
uint8_t：若实现提供，恰好 8 位
可表示 0～255
本例结果：seq 转换回 uint8_t 后为 0
电控场景：状态字节、计数、通信字段
【依据】https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1570.pdf
课程材料：1.Hello+World!.pdf；2.变量、数据类型与运算符.pdf；3.逻辑判断与分支结构.pdf；CONE-EC_2026_-_Lecture_1_-_C_Basis_V2.0.pdf。
【通信序号】seq是sequence（序号）的缩写。通信协议可约定序号按0到255循环编号，这是利用无符号类型回绕的一种常见做法。本例seq+1先得到整数256，赋值回uint8_t时按256取模得到0。不能将本例推广为有符号int溢出也这样处理。接收方按协议约定处理回绕，不能只根据新序号小于旧序号就断言乱序。
-->

---
class: l1-page
---

<div class="eyebrow">课间休息</div>

# 休息 10 分钟

<div class="hero-number">10 <span style="font-size:32px">分钟</span></div><div class="l1-lead">环境报错、练习未跑通，现在可以找助教</div>
<div class="l1-bottom">下半场：条件判断、分支结构与洛谷做题</div>

<!--
原 PPT 第 31 页；内容、表格及讲师说明取自 CONE_C语言_金石滩_L1.pptx。
【建议用时】10 分钟
【教学动作】助教帮助仍有环境或输入输出问题的同学。课前自行设置计时器，本页不含自动倒计时。
【本页内容】休息 10 分钟
现在可以检查：固定输出与温度转换是否都能运行
回来继续：让程序根据条件选择执行路径
【依据】https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1570.pdf
课程材料：1.Hello+World!.pdf；2.变量、数据类型与运算符.pdf；3.逻辑判断与分支结构.pdf；CONE-EC_2026_-_Lecture_1_-_C_Basis_V2.0.pdf。
-->
