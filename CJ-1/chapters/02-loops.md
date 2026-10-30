<div class="eyebrow">02 · 循环结构 · 20–50 分钟</div>

# 重复 n 次，用 for 表达

```c
for (int i = 0; i < n; i++) {
    // 每次重复执行的内容
}
```

<v-clicks>

- `int i = 0`：初始化，只做一次。
- `i < n`：每次进入循环体前检查。
- `i++`：循环体结束后更新，再回到判断。

</v-clicks>

<!-- 讲师补充：当 n = 4 时，循环体执行时的 i 依次为 0、1、2、3。 -->

<!--
约2分钟。0到n-1正好n次，1到n也可循环n次，别混搭起点与条件。用大括号明确循环体。
-->

---
clicks: 4
---

<div class="eyebrow">02 · 接上 P1424</div>

# 同一天的逻辑，重复四次

<TraceBoard scene="fish" :step="$clicks" />

<!--
约2分钟。自测x=5,n=4。分别跟踪i、day、total；轮次和星期不是同一件事。原题n<=10^6，int能容纳总里程。
题目：https://www.luogu.com.cn/problem/P1424
-->

---
clicks: 8
---

<div class="eyebrow">02 · 跟踪一次完整的 for</div>

# 循环体执行三次，判断四次

<TraceBoard scene="sum" :step="$clicks" />

<!--
约2分钟。点完最后一次退出判断，再看输出。本例i在for外声明，所以循环后仍能观察到i=4。
-->

---

<ProblemStatement pid="P5719" />

<!--
完整题面按洛谷原题转述，保留输入输出、全部判定规则、完整范围与官方样例。
来源：https://www.luogu.com.cn/problem/P5719
核对日期：2026-10-31。题面页可供学生独立阅读，避免只留下题名与链接。
-->

---
clicks: 5
---

<div class="eyebrow">02 · P5719 · 从问题到代码</div>

# 保存什么，判断什么，更新什么？

<ReasoningModel kind="classify" :step="$clicks" />

<!--
约2分钟。先问再点，保留学生思考时间。按“和与个数→遍历范围→分类条件→更新→平均数输出”依次搭起框架。不要刚进入页面就把完整答案展示出来。
这里仅推导片段，不包含main与输入。下一页学生把推导出的内容填进完整骨架。
-->

---
clicks: 4
---

<div class="eyebrow">02 · P5719 动手填空 · 5 分钟</div>

# 补上四处，让两类各算各的

<FillExercise kind="classify" :step="$clicks" />

<!--
留完整5分钟，初始只展示骨架，学生卡住时逐次给提示，答案留到讲评。
①1 ②i <= n ③i % k == 0 ④1.0。四个累加器都从0开始。
本页为题目输入约定下的填空骨架；完整示例包含输入成功检查。题目保证两类非空。
自测6 2得4.0 3.0；2 2得2.0 1.0。
-->

---
clicks: 7
---

<div class="eyebrow">02 · P5719 讲评</div>

# 读完一个数，就更新对应的一类

<TraceBoard scene="classify" :step="$clicks" />

<!--
约1分钟。n=6,k=2，A和12个数3，B和9个数3。本页为演示片段，完整通用实现见examples/p5719.c。
-->

---

<div class="eyebrow">02 · P5719 讲评</div>

# 最后一步，别让整数除法截掉小数

<div class="two-col"><div>

```c
double a = sa / ca;
```

<div v-click class="question">先按整数相除，<br>再存进 double。</div>

</div><div>

```c
printf("%.1f %.1f\n",
       1.0 * sa / ca,
       1.0 * sb / cb);
```

<div v-click class="answer">先引入浮点数，再做除法。</div>

</div></div>

<!-- 讲师补充：例如 37 / 7 得到 5，而 37.0 / 7 保留小数部分。 -->

<!--
约1分钟，关联上一节9/5和9.0/5。37/7来自合法自测n=10,k=3的B类。赋给double不能补回已截去的小数。
-->

---

<ProblemStatement pid="P5720" />

<!--
完整题面按洛谷原题转述，保留输入输出、全部判定规则、完整范围与官方样例。
来源：https://www.luogu.com.cn/problem/P5720
核对日期：2026-10-31。题面页可供学生独立阅读，避免只留下题名与链接。
-->

---
clicks: 4
---

<div class="eyebrow">02 · P5720 · 同样用三个问题</div>

# 这次不用先知道，要锯多少次

<ReasoningModel kind="stick" :step="$clicks" />

<!--
约2分钟。学生先回答第一天day是多少、什么条件下继续、一次循环更新什么。第4步用初始a=1反查，不把次数和天数混淆。然后进入原有20→10→5→2→1的执行演示。
-->

---
clicks: 4
---

<div class="eyebrow">02 · 按条件重复 · P5720</div>

# 长度到 1 时，就停止

<div class="problem-link"><a href="https://www.luogu.com.cn/problem/P5720">P5720 一尺之棰</a> · 从第二天起每天整除 2，问第几天变为 1。</div>

<TraceBoard scene="stick" :step="$clicks" />

<!--
约3分钟。范围1<=a<=10^9。本例20答案5；边界a=1答案1，不是0。for也可实现，重点在条件重复。
-->

---

<div class="eyebrow">02 · while 与 do-while</div>

# 初始条件为假，会执行几次？

<div class="two-col"><div>

```c
int x = 0;
while (x > 0) {
    printf("A\n");
}
```

<div v-click="1" class="answer">先判断：执行 0 次。</div>

</div><div>

```c
int x = 0;
do {
    printf("B\n");
} while (x > 0);
```

<div v-click="2" class="answer">先执行：执行 1 次。</div>

</div></div>

<!-- 讲师补充：do-while 至少执行一次。注意最后的 分号。 -->

<!--
约2分钟。两个代码块是独立片段，不能在同一作用域重复定义x。真实循环需要维护条件相关状态。
-->

---
clicks: 5
---

<div class="eyebrow">02 · continue</div>

# 跳过本轮，仍要完成更新

<TraceBoard scene="continue" :step="$clicks" />

<!--
约2分钟。for中continue走到更新表达式，再检查条件；while则回到条件判断。后者如果更新被跳过可能导致死循环。
-->

---

<div class="eyebrow">02 · break</div>

# 找到后，结束所在的循环

<div class="two-col"><div>

```c
for (int i = 1; i <= 10; i++) {
    if (i % 7 == 0) {
        printf("%d\n", i);
        break;
    }
}
printf("done\n");
```

</div><div>

<div class="question">程序会输出什么？</div>
<div v-click="1" class="output spaced">7<br>done</div>
<p v-click="2" class="spaced">break 跳出循环，随后继续执行循环后面的语句。</p>

</div></div>

<!-- 讲师补充：有多层循环时，break 只跳出它所在的最内层循环。 -->

<!--
约1分钟。与上一节switch的break关联，强调不等同于结束整个程序。
-->

---

<ProblemStatement pid="P5721" />

<!--
完整题面按洛谷原题转述，保留输入输出、全部判定规则、完整范围与官方样例。
来源：https://www.luogu.com.cn/problem/P5721
核对日期：2026-10-31。题面页可供学生独立阅读，避免只留下题名与链接。
-->

---
clicks: 6
---

<div class="eyebrow">02 · 嵌套循环 · P5721</div>

# 一层控制行，一层控制本行数量

<div class="problem-link"><a href="https://www.luogu.com.cn/problem/P5721">P5721 数字直角三角形</a> · 每个数至少两位，不足补 0，行末换行。</div>

<TraceBoard scene="nested" :step="$clicks" />

<!--
约2分钟，导读后课后完成。n<=13；这里n=3输出010203/0405/06。先数每行数量，再对应row和col。
-->

---

<div class="eyebrow">02 · RM 电控里的循环</div>

# 都是循环，为什么有的要停，有的一直跑？

<div class="two-col"><div>
<div class="label">洛谷：这一组数据算完，就交卷</div>

```c
while (a > 1) {
    a /= 2;
    day++;
}
printf("%d\n", day);
```

<p v-click class="spaced">如果 a 一直没变，<br>程序就等不到输出，可能超时。</p>
</div><div>
<div class="label">车上的控制任务：下一刻，还得再看一次</div>
<div class="control-cycle">
<span>读取传感器</span><b>↓</b><span>计算当前控制量</span><b>↓</b><span>更新输出 → 等待下一周期 ↺</span>
</div>
<p v-click>车还在动，状态就会变。<br>控制任务要按需要的周期持续更新。</p>
</div></div>

<!--
约1分钟。强调终止与持续更新由任务决定，“一直循环”本身不等于错误。实际主循环或RTOS周期任务都可组织控制，周期由系统设计决定，不声称所有RM主控都以1000Hz裸机while(1)运行。
调试可让学生手走两轮：初值是什么、条件何时变假、状态在哪更新、输出放在哪。continue绕过while中的更新尤其容易卡住。
-->

---

<div class="section-break">
<div class="eyebrow">休息 · 50–60 分钟</div>
<h1>休息 10 分钟</h1>
<p>练习没有跑通、环境报错，现在可以找助教。</p>
<p>回来之后：把一组数据存进数组。</p>
</div>

<!--
完整休息10分钟，不继续讲新知识。助教处理输入格式、编译选项与运行问题。
-->
