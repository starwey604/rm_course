---
clicks: 4
---

<div class="eyebrow">快问快答 · 117–119 分钟 · 1 / 2</div>

# 函数与指针：每题补一处

<QuickFill topic="function" :step="$clicks" />

<!-- 约 1 分钟。每题留几秒口答，点一下填回答案并显示解释。① return，② speed，③ &speed，④ *p。根据学生回答选择追问：② 函数调用后为什么还要赋值；④ 改的是地址还是它指向的值。左右方向键可以逐题回退。打印讲义显示全部答案与解释，供课后自查。 -->

---
clicks: 4
---

<div class="eyebrow">快问快答 · 117–119 分钟 · 2 / 2</div>

# 数组与结构体：找对要改的原格

<QuickFill topic="struct" :step="$clicks" />

<!-- 约 1 分钟。每次点击揭晓一题：① speeds，② .，③ ->，④ &motors[2]。clamp_all 接收起点和个数；点号对应变量，箭头对应指针；第三轮对应下标 2，取它的地址交给 control_motor。题中沿用前面已定义的 Motor、clamp_all 与 control_motor，不要求重新写函数。 -->

---
class: cj2-homework
---

<div class="eyebrow">课后任务 · 洛谷题单</div>

# 八道题，练熟函数、指针与结构体

<p class="cj2-homework-intro">六道课内题，加两道新题。先独立重写 P5737、P5742，再按分组练习。</p>

<table class="compact homework-table cj2-homework-table"><thead><tr><th>分组</th><th>题目</th><th>练什么</th></tr></thead><tbody>
<tr><td>函数基础</td><td><a href="https://www.luogu.com.cn/problem/P5735">P5735 距离函数</a>（新增）<br><a href="https://www.luogu.com.cn/problem/P5737">P5737 闰年展示</a><br><a href="https://www.luogu.com.cn/problem/P1980">P1980 计数问题</a></td><td>把计算、判断、计数抽成函数<br>调用处接住并使用返回值</td></tr>
<tr><td>字符串判断</td><td><a href="https://www.luogu.com.cn/problem/B2111">B2111 基因相关性</a><br><a href="https://www.luogu.com.cn/problem/B2112">B2112 石头剪子布</a></td><td>字符串作参数<br>函数返回结果，调用处输出</td></tr>
<tr><td>修改原数据</td><td><a href="https://www.luogu.com.cn/problem/P5733">P5733 自动修正</a></td><td><code>void uppercase(char s[])</code><br>通过数组参数修改原字符串</td></tr>
<tr><td>结构体</td><td><a href="https://www.luogu.com.cn/problem/P5742">P5742 评等级</a><br><a href="https://www.luogu.com.cn/problem/P5744">P5744 培训</a>（新增）</td><td>用结构体保存完整记录<br>比较传地址与返回结构体的写法</td></tr>
</tbody></table>

<div class="cj2-homework-requirement">旧题改写成函数版。每题提交代码、AC 记录和两组自测，并说明：<strong>参数是什么？返回什么？会修改原数据吗？</strong></div>

<!-- 约 20 秒，从后面的回顾和结语各匀出约 10 秒。先指出 P5735、P5744 为新增，四道开场回访题本次按函数版验收，不是原样重交。洛谷主要检查输入输出，函数、指针与结构体的课堂要求需结合代码检查。两组自测分别覆盖普通情况和边界；逐题接口、易错点和自测数据见 CJ-2/HOMEWORK.md，可直接发给学生。P5744 按题意先写结构体按值传入并返回的版本，在调用处接住返回记录；指针原地修改为选做对照。已熟练的学生可用 P5740、P5741 替换一至两道回访题，不计入本页八题。全部题号链接已列在表格中。 -->

---
clicks: 3
---

<div class="eyebrow">回顾 · 119–120 分钟</div>

# 三句话，回顾今天的三个概念

<LessonSummary mode="recall" :step="$clicks" />

<!-- 约 20 秒。三问一开始都可见，每问留 3 秒让学生组织一句话，再点击揭晓对应答案。函数是可调用的步骤，不只用于消除重复；纯函数还要求相同输入得到相同结果，不依赖可变的外部状态。数据指针既可用于只读访问，也可在允许时写回原件，别把“有指针参数”等同于“会改外部状态”。结构体与函数指针可以组织数据和动作，是前面对象式设计的基础，但结构体本身不会自动带来封装或所有面向对象特性。这里沿用电机数据与驱动替换的已讲例子，不加新语法。打印时三条答案全部显示。 -->

---
clicks: 3
class: cj2-closing
---

<div class="eyebrow">CONE · C语言培训-2</div>

# 从写出一段代码，到组织一个程序

<LessonSummary mode="closing" :step="$clicks" />

<!-- 约 20 秒。依次点击点亮结构体、函数、指针，最后留在整页结语。第一下：每个设备都有自己的数据和历史；第二下：计算与更新分别写成职责明确的函数；第三下：用地址找到数据，也能通过函数指针选择实现。回扣刚看过的 Zephyr 驱动接口：这些基础能帮助继续读工程，但操作系统还涉及调度、并发和硬件等后续知识。底部结语从一开始就在屏幕上，最后读给学生听即可。打印时三行全部点亮。 -->
