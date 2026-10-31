# CONE 电控培训课件

使用 Slidev 制作，浏览器播放点击动画，PDF 用于课后分发。

## C语言培训-1：循环、数组与字符串

课程时长 120 分钟（含 10 分钟休息）。正文 59 页，附录 18 页。题面完整保留在演示与 PDF 中，附录供按需选讲和课后查阅。题面页可让学生自行阅读，备选题不要求课上逐题讲解。

- 先复习 printf / scanf 与 ISBN 风格输入，再用 P1424 衔接循环。
- 用一页介绍 printf、cout、C++23 std::println 的格式化输出。
- 循环：for、while、do-while、break、continue、嵌套循环。
- 数组：下标、遍历、有效长度、最值、倒序与状态标记。
- 字符串：结束符、输入、strlen、strcpy、strcmp、回文比较。
- 随堂练习：P5719、P1427、P5733。提供完整 C 代码骨架，关键位置挖空；提示逐次点击揭示，随后单独讲评。

## 本地播放

需要 Node.js 22.12 或更新版本和 pnpm。先在仓库根目录执行：

```sh
pnpm install
pnpm dev
```

打开终端显示的本地地址，默认端口 3031。点击幻灯片正文、空格、方向键右推进，方向键左返回。按 F11 可以使用浏览器全屏；Slidev 左下方控制栏也提供全屏、目录和讲师视图。

## 构建与导出

首次导出需准备浏览器：

```sh
pnpm exec playwright install chromium
pnpm build
pnpm export
pnpm package
```

输出位于 `output/CJ-1/`：

- `web/`：已构建的网页演示，需要通过本地 HTTP 服务播放。
- `C语言培训-1.pdf`：完整内容 PDF，保留关键执行记录。
- `CONE-C-Language-1.zip`：演示、PDF 和可修改源码。Windows 下解压后双击“打开课件.cmd”，无需安装 Node；播放完双击“停止课件.cmd”。

可通过 `SLIDEV_BROWSER` 指定现有 Chromium 浏览器路径。设置 `CJ1_URL` 可让页面检查连接到其他本地端口。

## 修改课件

入口为 `CJ-1/slides.md`，章节内容位于 `CJ-1/chapters/`；教学组件和预先核对的执行状态分别位于 `components/` 与 `data/`。统一字体、颜色、代码排版在 `shared/styles/cone.css`，原始标识位于 `shared/assets/`。

讲师备注保存在各页的 HTML 注释中，包括建议时长、提问和资料来源。`<v-click>` 用于标准点击揭示；自定义组件在普通播放时使用点击次数，导出时切换为完整内容及过程记录。修改组件后应同时检查播放版与 PDF。

`CJ-1/PLAN.md` 保留教学方案。实现后的页数与课程结构以入口和章节源文件为准。

## 示例程序与检查

`CJ-1/examples/` 包含 19 个完整 C/C++ 示例。C 示例使用 C11；C++ 输出扩展使用 C++23。

```sh
pnpm check:examples
pnpm check:slides
```

示例检查默认查找 gcc / g++，Windows 上也会查找 Scoop 的 GCC。可以通过 `CC` 和 `CXX` 指定编译器。Windows GCC 的 `<print>` 示例额外链接 `-lstdc++exp`，详见 [GCC 文档](https://gcc.gnu.org/onlinedocs/libstdc%2B%2B/manual/using.html)。学生完成课堂 C 练习不需要 C++23。

页面检查需先运行演示服务，会逐页截图、检查布局，并检查自定义动画的推进与回退。结果保存在已忽略的 `tmp/`。

## 文件管理

源码、依赖锁、讲师备注和必要素材保留在 Git 中。依赖、构建文件、生成的 PDF / ZIP、检查截图、编译出的示例程序、缓存和本机环境文件由 `.gitignore` 忽略。参考资料不会因扩展名为 PDF / PPTX 而被全局忽略。

## 来源

课程范围依据用户提供的两份讲义《4.循环结构.pdf》《6.数组与字符串.pdf》，开场延续《CONE_C语言_金石滩_L1.pptx》。配色与 CONE / RoboMaster 标识来自《CONE-EC 2024 - Lecture 2 - C Arrays.pptx》，保持原始标识比例；未采用其中的 Harvard / edX / CS50 标识。

洛谷题目链接、输入输出约定和标准库资料见课件及对应讲师备注。教学组件展示的是已核对的执行过程，不是通用 C 编译器。


本轮修订：按最新要求，P5719、P5720 的三问引导页恢复为左侧说明、右侧代码逐步出现的形式。数组正文正式讲解全零初始化与 sizeof 容量计算；字符串部分解释首元素地址和内容比较。所有 20 道洛谷题均有独立完整题面（题意转述、输入输出、数据范围与官方样例），包括附录备选题。源码目录暂保留 CJ-1，课程显示名称统一为“C语言培训-1”。
