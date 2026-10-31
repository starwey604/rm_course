<div class="eyebrow">开场 · 00–05 分钟</div>

# 这一课结束时，你应该能做到

<v-clicks>

1. **说清楚电控在做什么**：感知状态，计算决策，驱动执行机构。
2. **读懂第一段 C 程序**：找到入口、输入、处理与输出。
3. **跑通一次最小闭环**：修改代码，编译运行，用结果验证预测。
4. **知道下一步学什么**：带着问题进入循环、数组与字符串。

</v-clicks>

<div class="question">今天不追求“背下语法”，先建立一张能继续生长的地图。</div>

<!-- 约2分钟。请学生说出自己最陌生的一项，讲师据此调整演示速度。 -->

---

<div class="eyebrow">认识系统 · 机器人不是只有机械结构</div>

# 同一个动作，需要三类角色配合

<div class="role-grid">
<div v-click><span>01</span><strong>机械</strong><p>提供结构与运动能力<br>轮子、云台、连杆</p></div>
<div v-click><span>02</span><strong>硬件</strong><p>连接真实世界与数字世界<br>电源、传感器、驱动器</p></div>
<div v-click><span>03</span><strong>电控软件</strong><p>读取状态，计算命令<br>让机构按预期工作</p></div>
</div>

<div class="answer" v-click>电控不是“给电机随便一个数”，而是让行为可解释、可验证。</div>

<!-- 约2分钟。用机器人云台转向举例：机械决定能否转，硬件负责测量和驱动，软件决定何时转、转多少、何时停。 -->

---

<div class="eyebrow">认识系统 · 一条信号链</div>

# 从“发生了什么”到“下一步做什么”

<div class="signal-flow">
<div v-click><small>INPUT</small><strong>传感器 / 操作手</strong><span>位置、速度、按键</span></div>
<b>→</b>
<div v-click><small>COMPUTE</small><strong>控制程序</strong><span>滤波、判断、计算</span></div>
<b>→</b>
<div v-click><small>OUTPUT</small><strong>执行机构</strong><span>电机、灯、蜂鸣器</span></div>
</div>

<div class="feedback-line" v-click><span>执行后的新状态再次被读取</span><b>────────── 反馈 ──────────</b></div>

<div class="question" v-click>写控制代码时，先问：输入是什么？输出应该是什么？怎样知道它做对了？</div>

<!-- 约2分钟。强调这是概念模型，不对应某一款板卡的具体 API。反馈让程序能根据新状态修正下一步。 -->

---

<div class="eyebrow">课程地图 · 从程序基础到控制任务</div>

# RM 电控系列课程

<div class="roadmap">
<a href="/cj-0/" class="current"><span>CJ-0</span><strong>从第一段程序到电控思维</strong><p>认识系统 · C 程序结构 · 验证习惯</p></a>
<a href="/cj-1/"><span>CJ-1</span><strong>循环、数组与字符串</strong><p>重复处理 · 批量数据 · 文本与协议基础</p></a>
<div><span>NEXT</span><strong>把基础放进真实任务</strong><p>状态机 · 通信 · 控制与调试</p></div>
</div>

<div class="hint">每一课只增加一层复杂度：先能读懂，再能修改，最后能独立拆解任务。</div>

<!-- 约1分钟。明确 CJ-0 不要求预先掌握 CJ-1；后续课程名称以实际上线内容为准。 -->

---

<div class="section-break">
<div class="eyebrow">工程习惯 · 在接硬件之前</div>
<h1>先让代码在电脑上<br><span>说得通、跑得对</span></h1>
<p>屏幕上的确定输入与输出，是排查真实系统问题的起点。</p>
</div>

<!-- 约1分钟。第一节先用普通 C 程序建立验证习惯，不直接连接执行机构。 -->
