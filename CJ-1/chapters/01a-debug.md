<div class="eyebrow">01 · 调试流程</div>

# 程序不对，就让它停下来

<div class="lead">调试不是把代码再读一遍，而是把程序停在你想看的那一行，核对那里的值。</div>

<div class="debug-steps">
<div><span>01</span><strong>下断点</strong><p>在想检查的那一行左侧点行号，出现红点</p></div>
<div><span>02</span><strong>调试启动</strong><p>选 Debug 而不是 Run，程序停在红点处</p></div>
<div><span>03</span><strong>单步执行</strong><p>一次只前进一行，看高亮停在哪一句</p></div>
<div><span>04</span><strong>看变量</strong><p>在变量窗口里逐个核对，和预测比一比</p></div>
<div><span>05</span><strong>改完重来</strong><p>停止 → 改代码 → 重新构建 → 再走一遍</p></div>
</div>

<div class="debug-keys">
<div><b>F9</b><span>加 / 删断点</span></div>
<div><b>F5</b><span>开始 · 继续</span></div>
<div><b>F10</b><span>跳过整行</span></div>
<div><b>F11</b><span>进入函数</span></div>
<div><b>Shift+F11</b><span>跳出函数</span></div>
<div><b>Shift+F5</b><span>停止调试</span></div>
</div>

<div class="debug-anchor"><span class="key-point">停下的那一刻，先说出预测的值，再看变量窗口。</span><br>对不上，问题就在刚走完的几行里；对上了，就继续往下走。</div>

<!--
约2分钟，只给步骤，方法现场演示。用本节的 scanf 例子：在读取语句下一行下断点，F5 启动，F10 逐行，看 age、height 与 matched；故意输入 18 abc，让 matched 变成 1。
按键按 VS Code / Visual Studio 的默认值给出；Dev-C++、CLion 让学生按菜单里的同名命令找，不要求背快捷键。
强调两件事：一是必须用调试（Debug）启动，直接运行不会停在断点；二是改了代码要重新构建再调，否则调的还是旧程序。
不展开条件断点、调用栈、内存视图，也不讲“断点行必须是可执行语句”这类细节，学生提问时再答。
-->
