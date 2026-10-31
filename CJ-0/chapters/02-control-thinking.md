<div class="section-break">
<div class="eyebrow">02 · 电控思维</div>
<h1>控制不是一行命令<br><span>而是一组明确约定</span></h1>
<p>定义输入、限制输出、检查结果，再考虑接入真实系统。</p>
</div>

---

<div class="eyebrow">02 · 一个抽象控制任务</div>

# 把“让电机转起来”改写成可验证的问题

<div class="task-contract">
<section v-click><span>输入</span><strong>目标命令 command</strong><p>本例约定为整数，正值与负值代表不同方向。</p></section>
<section v-click><span>处理</span><strong>限制到 −100 … 100</strong><p>超出范围的命令不能原样继续传递。</p></section>
<section v-click><span>输出</span><strong>安全范围内的 output</strong><p>先用打印结果验证，再讨论真实驱动接口。</p></section>
</div>

<div class="question" v-click>要求越具体，测试就越容易：给什么输入，应该得到什么输出？</div>

<!-- 约2分钟。数值范围只用于课堂示例，不是任何真实电机的推荐限幅。 -->

---

<div class="eyebrow">02 · 把规则写成代码</div>

# 限制，不是把异常输入“藏起来”

<div class="two-col wide-left"><div>

```c
int output = command;

if (output > 100) {
    output = 100;
}
else if (output < -100) {
    output = -100;
}
```

</div><div>
<div class="label">逐行跟踪</div>
<table><thead><tr><th>command</th><th>output</th></tr></thead><tbody>
<tr><td class="mono">35</td><td><span v-click="1">35</span></td></tr>
<tr><td class="mono">160</td><td><span v-click="2">100</span></td></tr>
<tr><td class="mono">-120</td><td><span v-click="3">-100</span></td></tr>
<tr><td class="mono">100</td><td><span v-click="4">100</span></td></tr>
</tbody></table>
</div></div>

<div class="hint" v-click="5">边界也要测试：−100、100 是允许值，不应被误改。</div>

<!-- 约3分钟。用手沿代码路径移动，说明为什么 else if 在这里适合表达另一侧范围。 -->

---

<div class="eyebrow">02 · 调试闭环</div>

# 不靠“看起来没问题”，靠证据定位

<div class="debug-loop">
<div v-click><span>1</span><strong>预测</strong><p>运行前写出预期结果</p></div>
<div v-click><span>2</span><strong>运行</strong><p>保留输入、输出和报错</p></div>
<div v-click><span>3</span><strong>比较</strong><p>找到第一处不一致</p></div>
<div v-click><span>4</span><strong>修改</strong><p>一次只改一个假设</p></div>
<div v-click><span>5</span><strong>复测</strong><p>普通值、边界值一起过</p></div>
</div>

<div class="answer" v-click>最小复现 + 明确预期，比无目的地反复改代码更快。</div>

<!-- 约2分钟。现场可故意把 > 写成 >=，让学生用 command=100 找到差异。 -->

---

<div class="eyebrow">02 · 随堂练习 · 3 分钟</div>

# 不运行，先完成这张表

<div class="two-col exercise-grid"><div>

```c
int command = 0;
scanf("%d", &command);

if (command > 60) {
    command = 60;
}
printf("output=%d\n", command);
```

</div><div>

<table><thead><tr><th>输入</th><th>你的预测</th><th>核对</th></tr></thead><tbody>
<tr><td class="mono">25</td><td>output=?</td><td><span v-click="1">25</span></td></tr>
<tr><td class="mono">60</td><td>output=?</td><td><span v-click="2">60</span></td></tr>
<tr><td class="mono">75</td><td>output=?</td><td><span v-click="3">60</span></td></tr>
<tr><td class="mono">-20</td><td>output=?</td><td><span v-click="4">-20</span></td></tr>
</tbody></table>

</div></div>

<div class="exercise-time">03:00</div>

<!-- 约3分钟。学生独立填写后与同桌解释 60 和 -20 两条路径，再逐行揭示。 -->

---

<div class="eyebrow">02 · 继续追问</div>

# 程序做对了，测试就足够了吗？

<v-clicks>

1. 输入恰好等于边界时，结果符合约定吗？
2. 输入超出预期范围时，程序如何处理？
3. 输入读取失败时，变量的初始值会不会被误用？
4. 接入真实设备前，是否先断开了危险执行机构？

</v-clicks>

<div class="question" v-click>能运行只是起点；知道它在哪些条件下可靠，才是工程。</div>

<!-- 约2分钟。第三问可提示检查 scanf 返回值，CJ-1 会进一步练习。硬件操作遵循战队现场安全规范，不在课堂示例中直接驱动电机。 -->
