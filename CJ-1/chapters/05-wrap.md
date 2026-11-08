<div class="eyebrow">回访 · 110–120 分钟</div>

# 不运行，先给出你的判断

<table><thead><tr><th>问题</th><th>答案</th></tr></thead><tbody>
<tr><td>初始条件为假，while / do-while 各执行几次？</td><td><span v-click="1">0 次 / 1 次</span></td></tr>
<tr><td>int a[5] 的最后一个有效下标？</td><td><span v-click="2">4</span></td></tr>
<tr><td>char s[] = "RM" 的 strlen / sizeof？</td><td><span v-click="3">2 / 3</span></td></tr>
<tr><td>strcmp(a, b) 返回什么表示相等？</td><td><span v-click="4">0</span></td></tr>
</tbody></table>

<!-- 讲师补充：再追问：for 遇到 continue 后，更新表达式还执行吗？会。 -->

<!--
约4分钟。先独立回答，按行揭示；请学生用自己的话解释，而不只报数字。复查结束符和有效下标。
-->

---

<div class="eyebrow">回访 · 把三个问题带走</div>

# 写下一道题时，先问这三句

<div class="model-recap">
<div v-click><strong>保存什么？</strong><span>P5719 的和与个数；P5720 的长度与天数。</span></div>
<div v-click><strong>判断什么？</strong><span>还要继续吗？当前这个数，应该走哪一条分支？</span></div>
<div v-click><strong>更新什么？</strong><span>这一轮处理完，哪些值变了？下一轮从哪里开始？</span></div>
</div>

<div class="question">选一道课堂题，用这三句话把代码讲给同桌听。</div>

<!--
约3分钟。学生先说变量含义、条件和一次操作，再看代码。最后再问终止时输出什么，用一个元素或一开始就满足终止条件的情况反查。
-->

---

<div class="eyebrow">课后任务 · 洛谷题单</div>

# 十道题，练完这一节

<table class="compact homework-table"><thead><tr><th>分组</th><th>题目</th><th>练什么</th></tr></thead><tbody>
<tr><td>循环基础</td><td>P5719、P5720、P5721</td><td>分类累加、条件循环、嵌套输出</td></tr>
<tr><td>数组</td><td>P1427、P1428、P1047</td><td>存整组数据、比较范围、状态标记</td></tr>
<tr><td>字符与字符串</td><td>P5733、B2111、B2112</td><td>遍历修改、逐位统计、整串比较</td></tr>
<tr><td>拆位计数</td><td>P1980</td><td>% 10 与 / 10</td></tr>
</tbody></table>

<div class="hint">题单已在洛谷建好，十题全为入门难度；课堂练过的 P5719、P1427、P5733 先独立重写。</div>
<!-- 讲师补充：附录提供题目链接与思路提示；参考实现也在配套源码中，先自己写再对照。逐题的要点与易错点见 CJ-1/HOMEWORK.md，可直接发给学生。 -->

<!--
约3分钟，按实际课程日期另行安排截止时间。本节不默认一次交完全部题。
题单已按循环、数组、字符与字符串、拆位计数分组，括号里的分组只是便于复习，学生按题单顺序提交即可。
拆位计数的 P1980 是本节没有讲过的题型，题面与提示在附录，先给学生看题面再动笔。
-->
