<div class="eyebrow">03 · 课后即可重复的开发流程</div>

# 每次修改，都走完这六步

<div class="workflow-list">
<div v-click><span>01</span><strong>明确任务</strong><p>写下输入、输出和限制条件。</p></div>
<div v-click><span>02</span><strong>预测结果</strong><p>先选一组普通输入和一组边界输入。</p></div>
<div v-click><span>03</span><strong>编写最小程序</strong><p>暂时删去与本问题无关的逻辑。</p></div>
<div v-click><span>04</span><strong>编译并阅读诊断</strong><p>先看第一条错误，也重视警告。</p></div>
<div v-click><span>05</span><strong>运行并保存证据</strong><p>记录实际输入、输出与预期差异。</p></div>
<div v-click><span>06</span><strong>复测再接入下一层</strong><p>逻辑稳定后，再接入通信或硬件。</p></div>
</div>

<!-- 约2分钟。建议学生把这六步作为后续练习的检查清单。 -->

---

<div class="eyebrow">03 · 回访</div>

# 离开教室前，回答这四个问题

<table><thead><tr><th>问题</th><th>答案</th></tr></thead><tbody>
<tr><td>电控信号链的三个主要环节？</td><td><span v-click="1">输入 → 计算 → 输出</span></td></tr>
<tr><td>C 程序通常从哪个函数开始？</td><td><span v-click="2">main</span></td></tr>
<tr><td>scanf 写入 int 变量时为什么要 &？</td><td><span v-click="3">需要知道写入的位置</span></td></tr>
<tr><td>编译失败与运行结果不对，是同一种问题吗？</td><td><span v-click="4">不是，先分类再排查</span></td></tr>
</tbody></table>

<div class="question">如果有一个问题还说不清，就把它带进下一次练习。</div>

<!-- 约3分钟。逐行揭示，让学生先完整回答再核对。 -->

---

<div class="eyebrow">03 · 下一站</div>

# 把一行逻辑，扩展到一组数据

<div class="next-lesson">
<div>
<span>CJ-1</span>
<h2>循环、数组与字符串</h2>
<p>当数据不再只有一个，程序需要重复处理、顺序保存和逐个检查。</p>
</div>
<div class="next-topics">
<div v-click><strong>循环</strong><span>重复执行与嵌套</span></div>
<div v-click><strong>数组</strong><span>下标、遍历与状态</span></div>
<div v-click><strong>字符串</strong><span>字符、结束符与比较</span></div>
</div>
</div>

<a class="next-link" href="/cj-1/">进入 C语言培训-1 →</a>

<!-- 约2分钟。链接在网页放映中可直接打开 CJ-1；PDF 中用于说明课程衔接。 -->

---

<div class="section-break closing-slide">
<div class="eyebrow">CONE · RM 电控系列课程</div>
<h1>先预测，再运行<br><span>让每一次修改都有证据</span></h1>
<p>CJ-0 完成 · 下一课见</p>
<a href="/">返回课程首页</a>
</div>

<!-- 约1分钟。布置任务：独立修改一次限幅边界，并为普通值、正负边界和超范围输入各写一组测试。 -->
