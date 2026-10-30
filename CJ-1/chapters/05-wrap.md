---
clicks: 4
---

<div class="eyebrow">回访 · 110–120 分钟</div>

# 不运行，先给出你的判断

<table><thead><tr><th>问题</th><th>答案</th></tr></thead><tbody>
<tr><td>初始条件为假，while / do-while 各执行几次？</td><td><span v-click="1">0 次 / 1 次</span></td></tr>
<tr><td>int a[5] 的最后一个有效下标？</td><td><span v-click="2">4</span></td></tr>
<tr><td>char s[] = "RM" 的 strlen / sizeof？</td><td><span v-click="3">2 / 3</span></td></tr>
<tr><td>strcmp(a, b) 返回什么表示相等？</td><td><span v-click="4">0</span></td></tr>
</tbody></table>

<div class="note">再追问：for 遇到 continue 后，更新表达式还执行吗？<strong>会。</strong></div>

<!--
约4分钟。先独立回答，按行揭示；请学生用自己的话解释，而不只报数字。复查结束符和有效下标。
-->

---

<div class="eyebrow">回访 · 解题过程</div>

# 把思路，落实到每一次更新

<v-clicks>

1. **确定输入输出**：读什么？保存什么？最后输出什么？
2. **明确变量含义**：循环次数、当前下标、有效个数、累计结果。
3. **描述一次操作**：读入、判断、修改，再进入下一次。
4. **检查停止与边界**：一个元素、相等情况、结束标记、最后一次判断。

</v-clicks>

<div class="question">能解释每个变量为什么存在，再让代码跑起来。</div>

<!--
约3分钟。让学生任选P5719、P1427、P5733说明四步。不要将“通过样例”当作已经覆盖边界。
-->

---

<div class="eyebrow">课后任务 · 分批完成</div>

# 先补齐课堂题，再逐步巩固

<table class="compact"><thead><tr><th>阶段</th><th>题目</th><th>目标</th></tr></thead><tbody>
<tr><td>课堂三题</td><td>P5719、P1427、P5733</td><td>独立重写，并解释关键变量</td></tr>
<tr><td>第一批</td><td>P5720、P1085、P5721</td><td>条件循环、记录位置、嵌套输出</td></tr>
<tr><td>第一批</td><td>B2111、B2112</td><td>字符比较、统计、分支组合</td></tr>
<tr><td>第二批</td><td>P1428、P1047</td><td>比较范围、状态标记</td></tr>
</tbody></table>

<div class="hint">每题附上：一组普通测试、一组边界测试、一句话思路。</div>
<div class="note">附录提供题目链接与思路提示；参考实现也在配套源码中，先自己写再对照。</div>

<!--
约3分钟，按实际课程日期另行安排截止时间。本节不默认一次交完全部题。第一批包含课堂已经示范过的题，第二批给更多思考时间。
-->
