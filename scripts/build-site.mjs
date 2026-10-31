import fs from 'node:fs/promises'
import path from 'node:path'
import { spawnSync } from 'node:child_process'

const root = path.resolve(import.meta.dirname, '..')
const out = path.join(root, 'output', 'site')
const cli = path.join(root, 'node_modules', '@slidev', 'cli', 'bin', 'slidev.mjs')
const decks = JSON.parse(await fs.readFile(path.join(root, 'decks.json'), 'utf8'))

if (path.resolve(out) !== path.join(path.resolve(root), 'output', 'site')) throw new Error('Unexpected site output path')

// 直接清空已验证的路径。逐项 unlink/rmdir 不依赖环境提供的回收站，Windows 批量构建也更稳定。
async function removeTree(target) {
  let stat
  try { stat = await fs.lstat(target) }
  catch { return }
  if (stat.isDirectory()) {
    for (const name of await fs.readdir(target)) await removeTree(path.join(target, name))
    await fs.rmdir(target)
  }
  else await fs.unlink(target)
}
await removeTree(out)
await fs.mkdir(out, { recursive: true })

function run(args) {
  const result = spawnSync(process.execPath, args, { cwd: root, stdio: 'inherit' })
  if (result.status !== 0) process.exit(result.status || 1)
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char])
}

for (const deck of decks) {
  if (!/^[-a-z0-9]+$/.test(deck.slug)) throw new Error(`Invalid deck slug: ${deck.slug}`)
  const entry = path.join(root, deck.entry)
  const course = JSON.parse(await fs.readFile(path.join(path.dirname(entry), 'data', 'course.json'), 'utf8'))
  if (course.total !== deck.total) throw new Error(`${deck.code}: decks.json total ${deck.total} does not match course.json total ${course.total}`)
  console.log(`\n=== Building ${deck.code} → /${deck.slug}/ ===`)
  run([cli, 'build', entry, '--out', path.join(out, deck.slug), '--base', `/${deck.slug}/`])
}

const cards = decks.map((deck, index) => `        <a class="course-card" href="/${deck.slug}/">
          <div class="course-card-top"><span class="course-code">${escapeHtml(deck.code)}</span><span class="course-meta">${escapeHtml(deck.level)} · ${escapeHtml(deck.duration)}</span></div>
          <h3>${escapeHtml(deck.subtitle)}</h3>
          <p>${escapeHtml(deck.description)}</p>
          <div class="course-topics">${deck.topics.map(topic => `<span>${escapeHtml(topic)}</span>`).join('')}</div>
          <div class="course-card-bottom"><span class="course-path">/${escapeHtml(deck.slug)}/ · ${deck.total} 页</span><span class="course-enter">${index === 0 ? '开始学习' : '进入课件'} →</span></div>
        </a>`).join('\n')

const template = await fs.readFile(path.join(root, 'site', 'index.html'), 'utf8')
if (!template.includes('<!-- COURSE_CARDS -->')) throw new Error('Homepage course card placeholder is missing')
await fs.writeFile(path.join(out, 'index.html'), template.replace('<!-- COURSE_CARDS -->', cards))
await fs.copyFile(path.join(root, 'site', 'home.css'), path.join(out, 'home.css'))
await fs.mkdir(path.join(out, 'assets'), { recursive: true })
for (const name of ['cone.png', 'rm.png']) await fs.copyFile(path.join(root, 'shared', 'assets', name), path.join(out, 'assets', name))

// Cloudflare 会优先执行命中的重写，因此不使用会覆盖 assets 的 /* 通配规则。
// 只改写已知的播放路由；真实静态文件与带扩展名的请求不受影响。
//
// 重写目标必须写成目录路径 `/{slug}/`，不能写成 `/{slug}/index.html`：
// Cloudflare 的 html_handling（默认 auto-trailing-slash）会把
// `/<dir>/index.html` 307 规范化到 `/<dir>/`，这样重写结果会被二次跳转，
// Slidev 的深层路由（如 /cj-1/37）就会被压回课件首页。
const redirects = ['# RM course static site: canonical deck URLs and exact Slidev route rewrites']
for (const deck of decks) {
  const deckRoot = `/${deck.slug}/`
  redirects.push(`/${deck.slug} ${deckRoot} 301`)
  for (const route of ['overview', 'presenter', 'print', 'notes', 'export']) redirects.push(`/${deck.slug}/${route} ${deckRoot} 200`)
  for (let page = 1; page <= deck.total; page++) {
    redirects.push(`/${deck.slug}/${page} ${deckRoot} 200`)
    redirects.push(`/${deck.slug}/presenter/${page} ${deckRoot} 200`)
  }
}
await fs.writeFile(path.join(out, '_redirects'), redirects.join('\n') + '\n')

const headers = [
  '/*',
  '  X-Content-Type-Options: nosniff',
  '  Referrer-Policy: strict-origin-when-cross-origin',
  ...decks.map(deck => `/${deck.slug}/assets/*\n  Cache-Control: public, max-age=31536000, immutable`),
]
await fs.writeFile(path.join(out, '_headers'), headers.join('\n') + '\n')
await fs.writeFile(path.join(out, 'site.json'), JSON.stringify({ title: 'RM 电控系列课程', decks: decks.map(({ slug, code, title, subtitle, total }) => ({ slug, code, title, subtitle, total })) }, null, 2) + '\n')

console.log(`\nStatic course site ready: ${out}`)
console.log(`Homepage: / · Decks: ${decks.map(deck => `/${deck.slug}/`).join(', ')}`)
