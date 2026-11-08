<div class="eyebrow">快问快答 · 117–120 分钟</div>

# 填一空：把第三轮的目标转速清零

<div class="two-col">
<div>

```c
void control_motor(struct Motor *p) {
    p->speed = 0;
}

// main 里：首成员 speed 为 9600，其余补 0
struct Motor m = {9600};
control_motor([①]);
```

</div>
<div class="question">只补 <code>①</code>。让 <code>main</code> 里的 <code>m.speed</code> 从 <code>9600</code> 变成 <code>0</code>，其他成员不变。</div>
</div>

<p class="spaced">课后：补交 P5737、P5742。选做 <a href="https://www.luogu.com.cn/problem/P5741">P5741 旗鼓相当的对手（加强版）</a>，先用结构体数组存下每个人，再两两比较。</p>

<!-- 3 分钟。答案是 &m。请学生口头说明：函数拿到的是地址的副本，p->speed 沿地址找到原来的 m，只写 speed。 -->
