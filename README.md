# RM 电控系列课程

使用 Slidev 制作的多课件站点。浏览器播放带点击动画，PDF 用于课后分发；网页站点包含课程首页、课件切换菜单、激光笔与课堂标注。

| 路径 | 课件 | 时长 | 页数 |
| --- | --- | --- | --- |
| `/cj-0/` | C语言培训-0：从第一段程序到电控思维 | 60 分钟 | 23 |
| `/cj-1/` | C语言培训-1：循环、数组与字符串 | 120 分钟 | 85 |

课程清单统一维护在 `decks.json`。构建时会据此生成首页、课件菜单、逐课件构建参数，以及 Cloudflare 的精确播放路由。

## 本地开发与预览

需要 Node.js 22.12 或更新版本和 pnpm：

```sh
pnpm install
pnpm dev:cj-0      # http://localhost:3030/cj-0/
pnpm dev:cj-1      # http://localhost:3031/cj-1/
```

在课件中点击正文、空格或方向键右推进，方向键左返回。页面底部的控制栏提供全屏、目录和讲师视图；左上角是课程目录，控制栏另提供返回课程首页。

### 讲授辅助

- **激光笔**：按 `L` 或点控制栏的圆点按钮。开启后系统鼠标隐藏，红色光点跟随指针；点击正文照常翻页。
- **标注**：按 `P` 或点控制栏的画笔按钮。支持画笔、直线、箭头、矩形、椭圆、橡皮、撤销重做、清空与 7 档颜色；绘制时不会误触发全局点击翻页，按 `Esc` 退出。
- 进入标注会自动关闭激光笔。标注不跨刷新保存，也不进入 PDF 和打印页。

## 静态课程站点

```sh
pnpm build
pnpm preview       # http://127.0.0.1:4173/
```

输出位于 `output/site/`：

- `index.html` / `home.css`：RM 电控课程首页。
- `cj-0/`、`cj-1/`：分别以 `/cj-0/`、`/cj-1/` 为 base 的独立课件。
- `_redirects`：由构建脚本根据每门课页数生成，只改写 Slidev 的已知播放路由，不会把静态资源请求错误地改写为 HTML。
- `_headers`：基础安全响应头和课件资源长缓存。
- `site.json`：站点课程摘要。

本地预览服务器支持 `/cj-0` → `/cj-0/` 重定向，以及 `/cj-0/12` 这类深层页面刷新。

### 验证

构建并完成 `pnpm preview` 后运行：

```sh
pnpm check:site
```

该检查会验证首页课程卡、两个课件的菜单交互、激光笔、深层路由、打印页隐藏、静态资源和控制台错误，并逐页检查 CJ-0 版式。

## Cloudflare Pages

仓库已经包含 `wrangler.toml`、`.node-version`、pnpm lockfile 和静态输出脚本。有两条部署路径，任选其一。

### 方式一：GitHub Actions 推送自动部署（默认推荐）

仓库自带 `.github/workflows/deploy.yml`：推送到 `main` 分支会自动安装依赖、构建站点，并用 Wrangler 把 `output/site` 直接上传到 Cloudflare Pages 项目 `rm-course`。

一次性配置：

1. **创建 Pages 项目**：在 Cloudflare Dashboard → Workers & Pages → Create → Pages → "Upload assets" 创建一个名为 `rm-course` 的项目（或本地运行 `pnpm exec wrangler pages project create rm-course --production-branch main`）。项目只需存在一次，之后的部署都由 CI 覆盖。
2. **创建 API Token**：打开 <https://dash.cloudflare.com/profile/api-tokens> → Create Token → 使用模板 **"Edit Cloudflare Pages"**（自动授予 Account / Cloudflare Pages: Edit 与 Account Settings: Read）。也可以建 Custom Token，至少包含这两项权限。复制生成的 token。
3. **获取 Account ID**：Dashboard 任意页面右侧栏（Workers & Pages → Overview 右下角）显示 32 位十六进制 Account ID；或从浏览器地址栏 `dash.cloudflare.com/<这段就是 Account ID>` 读取。
4. **配置仓库 Secrets**：GitHub 仓库 → Settings → Secrets and variables → Actions → New repository secret，添加两个 secret：
   - `CLOUDFLARE_API_TOKEN`：第 2 步的 token
   - `CLOUDFLARE_ACCOUNT_ID`：第 3 步的 Account ID
5. **绑定自定义域名**：Pages 项目 → Settings → Custom domains → 添加 `rm.course.silkenkite.ink`（域名已在 Cloudflare 托管时会自动验证）。

配置完成后推送任意 commit 到 `main` 即可触发部署；也可以在 Actions 页面手动 Run workflow。注意：这种方式**不需要**在 Cloudflare 里连接 Git 仓库，Pages 项目的构建命令留空即可（构建在 GitHub 完成，Cloudflare 只接收产物）。

### 方式二：Cloudflare Git 集成

1. 在 Cloudflare 创建 Pages 项目并连接仓库。
2. 构建命令填 `pnpm build`。
3. 构建输出目录填 `output/site`。
4. 项目根目录填仓库根目录（本目录即 Git 仓库根目录）。
5. 在 Pages 项目的 **Custom domains** 添加 `rm.course.silkenkite.ink`；域名已在 Cloudflare 托管时，Cloudflare 会处理验证与记录。

部署后的目标地址结构：

- 首页：`https://rm.course.silkenkite.ink/`
- CJ-0：`https://rm.course.silkenkite.ink/cj-0/`
- CJ-1：`https://rm.course.silkenkite.ink/cj-1/`
- 直达页码：`https://rm.course.silkenkite.ink/cj-0/12`

也可以使用本地 Wrangler 直接上传（需要登录 Cloudflare）：

```sh
pnpm dlx wrangler pages deploy output/site --project-name rm-course
```

## 单课件导出与离线包

首次导出需准备浏览器：

```sh
pnpm exec playwright install chromium
```

构建、导出和打包某个课件（默认 `cj-1`）：

```sh
pnpm build:deck -- cj-0
pnpm export -- cj-0
pnpm package -- cj-0
```

输出位于 `output/CJ-0/` 或 `output/CJ-1/`：

- `web/`：单课件离线网页。
- `C语言培训-0.pdf` / `C语言培训-1.pdf`：完整 PDF。
- `CONE-C-Language-0.zip` / `CONE-C-Language-1.zip`：网页、PDF 和可修改源码。Windows 解压后双击“打开课件.cmd”即可播放。

单课件的检查使用：

```sh
pnpm dev:cj-1
pnpm check:slides   # 默认连接 http://localhost:3031/cj-1
```

可用 `CJ1_URL` 连接其他站点或预览服务，例如 `CJ1_URL=http://127.0.0.1:4173/cj-1`。

## 新增课件

1. 复制一个现有课件目录，创建 `CJ-2/slides.md`、`chapters/`、`layouts/`、`setup/`、`data/` 和 `style.css`。
2. 在 `CJ-2/data/course.json` 写入标题、页数和文件名。
3. 在根目录 `decks.json` 增加一条 `slug: "cj-2"` 的课件配置。
4. 在 `package.json` 增加：

   ```sh
   "dev:cj-2": "slidev CJ-2/slides.md --port 3032 --base /cj-2/"
   ```

5. 运行 `pnpm build && pnpm preview && pnpm check:site`。

激光笔、标注、课程菜单、打印隐藏和 Cloudflare 路由都会由共享组件与构建脚本自动接入，不需要新增菜单代码。

## 工程结构

- `site/`：课程首页模板与首页样式。
- `shared/components/`：课件菜单、激光笔覆盖层和控制栏。
- `shared/setup/`：全局点击翻页与快捷键。
- `shared/styles/cone.css`：统一视觉、打印隐藏和 CJ-0 图示样式。
- `shared/assets/`：CONE 与 RoboMaster 标识。
- `scripts/build-site.mjs`：多课件静态站点、首页、`_redirects` 与 `_headers`。
- `scripts/serve-site.mjs`：本地多课件预览服务器。
- `scripts/check-site.mjs`：站点与 CJ-0 版式浏览器验证。
- `scripts/tasks.mjs`：单课件构建、PDF 导出和离线压缩包。

讲师备注保存在各页 HTML 注释中。`<v-click>` 用于标准点击揭示；自定义组件在普通播放时使用点击次数，导出时切换为完整内容及过程记录。修改组件后应同时检查播放版与 PDF。

## 检查与文件管理

```sh
pnpm check:examples
pnpm check:slides
pnpm check:site
```

`check:slides` 会逐页截图并检查 CJ-1 的 85 页、定制动画、无外部请求和版式溢出；结果保存在已忽略的 `tmp/`。源码、依赖锁和必要素材保留在 Git；`node_modules/`、`output/`、`tmp/`、PDF、ZIP 与构建缓存由 `.gitignore` 忽略。参考资料不会仅因 PDF / PPTX 扩展名被全局忽略。

## 来源与口径

CJ-1 课程范围依据《4.循环结构.pdf》《6.数组与字符串.pdf》，开场延续《CONE_C语言_金石滩_L1.pptx》；配色与 CONE / RoboMaster 标识来自《CONE-EC 2024 - Lecture 2 - C Arrays.pptx》，保持原始标识比例。洛谷题目链接、输入输出约定和标准库资料见课件及对应讲师备注。教学组件展示的是已核对的执行过程，不是通用 C 编译器。

CJ-0 是新增的零基础前置课：先认识机械 / 硬件 / 电控软件的分工，再讲最短 C 程序、输入输出、判断、循环直觉与验证闭环。课件中的电机限幅数值仅为课堂示例，不代表真实设备的推荐范围。
