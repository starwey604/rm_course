<div class="eyebrow">备用 · CJ-1 旧题回访</div>

# 旧题换写法：P5733 会改原来的字符串吗？

<div class="two-col">
<div class="cj2-compact">

```c
void uppercase(char s[]) {
    for (int i = 0; s[i] != '\0'; i++) {
        if (s[i] >= 'a' && s[i] <= 'z')
            s[i] = s[i] - ('a' - 'A');
    }
}

// main 里
char name[] = "Rm2026";
uppercase(name);
```

</div>
<div>
<p>循环已经在 CJ-1 写过。今天把它移进函数，<code>main</code> 里的 <code>name</code> 会变吗？</p>
<p v-click class="answer">会。<code>name</code> 现在是 <code>RM2026</code>，原来的字符格被写入了。</p>

[洛谷 P5733 原题](https://www.luogu.com.cn/problem/P5733)
</div>
</div>

<!-- 备用，不计入 120 分钟。先预测再解释，不另起一道限时 OJ。追问传的是数组首元素地址，还是整串字符的副本。 -->

