import { chromium } from 'playwright-chromium'
import fs from 'node:fs/promises'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const base = process.env.SITE_URL || 'http://127.0.0.1:4173'
const decks = JSON.parse(await fs.readFile(path.join(root, 'decks.json'), 'utf8'))
const out = path.join(root, 'tmp', 'site-qa')
await fs.mkdir(out, { recursive: true })
const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 1600, height: 900 } })
const errors = []
const failures = []
const results = []
page.on('pageerror', error => errors.push(error.message))
page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
page.on('response', response => { if (response.status() >= 400) failures.push(`${response.status()} ${response.url()}`) })
await page.route('**/*', route => {
  const url = new URL(route.request().url())
  if (!['localhost', '127.0.0.1'].includes(url.hostname) && url.protocol !== 'data:') {
    failures.push(`External request: ${url.href}`)
    return route.abort()
  }
  return route.continue()
})

function check(condition, message) {
  if (!condition) throw new Error(message)
}

try {
  await page.goto(`${base}/`, { waitUntil: 'networkidle' })
  check((await page.locator('h1').innerText()).replace(/\s+/g, '') === '从第一行代码，到可靠的机器人控制。', 'Homepage hero is missing')
  check(await page.locator('.course-card').count() === decks.length, 'Homepage course cards do not match decks.json')
  for (const deck of decks) check(await page.locator(`.course-card[href="/${deck.slug}/"]`).count() === 1, `Missing homepage card: ${deck.slug}`)
  await page.screenshot({ path: path.join(out, 'homepage.png'), fullPage: true })

  for (const deck of decks) {
    await page.goto(`${base}/${deck.slug}/1`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(300)
    const text = await page.locator('body').innerText()
    const total = Number(text.match(/1\s*\/\s*(\d+)/)?.[1])
    check(total === deck.total, `${deck.code}: wrong slide count ${total} vs ${deck.total}`)
    check(await page.locator('.course-switcher-trigger').isVisible(), `${deck.code}: course menu trigger missing`)
    await page.locator('.course-switcher-trigger').click()
    check(await page.locator('.course-menu-item').count() === decks.length, `${deck.code}: menu entries missing`)
    check(await page.locator('.course-menu-item.current').getAttribute('href') === `/${deck.slug}/`, `${deck.code}: current menu entry is wrong`)
    await page.keyboard.press('Escape')
    await page.locator('.course-menu-panel').waitFor({ state: 'detached' })
    check(!(await page.locator('.course-menu-panel').count()), `${deck.code}: Escape did not close menu`)

    await page.mouse.move(800, 450)
    await page.keyboard.press('l')
    await page.waitForTimeout(200)
    check(await page.locator('.cone-laser-dot').count() === 1, `${deck.code}: laser layer missing after shared refactor`)
    await page.keyboard.press('l')

    const deepPage = Math.min(2, deck.total)
    await page.goto(`${base}/${deck.slug}/${deepPage}`, { waitUntil: 'networkidle' })
    check(await page.locator(`[data-slidev-no="${deepPage}"] .slidev-layout`).count() === 1, `${deck.code}: deep route did not render slide ${deepPage}`)
    await page.goto(`${base}/${deck.slug}/1?print=true`, { waitUntil: 'networkidle' })
    check(!(await page.locator('.course-switcher').count()), `${deck.code}: menu leaked into print/PDF page`)
    check(await page.locator('[data-slidev-no="1"] .brand-strip img').count() === 2, `${deck.code}: branding missing`)
    results.push({ deck: deck.slug, total, menu: true, deepRoute: true, printClean: true })
  }

  // CJ-0 是新课件，逐页检查品牌、画布尺寸和横向溢出；CJ-1 继续由 check:slides 做完整专项回归。
  const cj0 = decks.find(deck => deck.slug === 'cj-0')
  const sourceMap = JSON.parse(await fs.readFile(path.join(root, 'CJ-0/source/page-map.json'), 'utf8'))
  check(sourceMap.pages.length === 60 && new Set(sourceMap.pages.map(item => item.source)).size === 60, 'CJ-0 source map must cover all 60 original slides')
  const titles = new Map([...sourceMap.pages, ...sourceMap.addedPages].map(item => [item.target, item.title]))
  const layouts = []
  for (let number = 1; number <= cj0.total; number++) {
    await page.goto(`${base}/cj-0/${number}?print=true`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(150)
    const slide = page.locator(`[data-slidev-no="${number}"] .slidev-layout`).first()
    await slide.waitFor()
    const info = await slide.evaluate(element => {
      const rect = element.getBoundingClientRect(), scale = rect.width / element.clientWidth
      const bottom = Math.max(...[...element.children].filter(child => !child.matches('.brand-strip')).map(child => (child.getBoundingClientRect().bottom - rect.top) / scale))
      return {
        title: element.querySelector('h1')?.textContent?.trim() || '',
        overflowX: element.scrollWidth - element.clientWidth,
        overflowY: element.scrollHeight - element.clientHeight,
        contentBottom: Math.round(bottom),
        wideCode: [...element.querySelectorAll('pre')].some(code => code.scrollWidth > code.clientWidth + 3),
      }
    })
    check(info.overflowX <= 3 && info.overflowY <= 3 && info.contentBottom <= 628 && !info.wideCode, `CJ-0 page ${number} overflow: ${JSON.stringify(info)}`)
    check(info.title.replace(/\s+/g, '') === titles.get(number)?.replace(/\s+/g, ''), `CJ-0 page ${number} does not match its original slide`)
    check(await slide.locator('.brand-strip img').count() === 2, `CJ-0 page ${number} branding missing`)
    layouts.push({ page: number, ...info })
    if ([1, 4, 11, 15, 25, 28, 29, 30, 31, 40, 50, 58, 59].includes(number)) await slide.screenshot({ path: path.join(out, `cj0-${String(number).padStart(2, '0')}.png`) })
    if ([25, 40].includes(number)) {
      check(await slide.locator('[data-filled="true"]').count() === 0, `CJ-0 print page ${number} leaked exercise answers`)
      check(await slide.locator('.l1-fill-hint:not(.shown)').count() === 0, `CJ-0 print page ${number} hid exercise hints`)
    }
    if (number % 10 === 0) console.log(`Checked ${number} / ${cj0.total} CJ-0 slides`)
  }

  // Every blank takes two clicks: first its hint, then its answer; backwards must restore both.
  let fillSteps = 0
  for (const [number, blanks] of [[25, 4], [40, 2]]) {
    await page.goto(`${base}/cj-0/${number}?clicks=0`, { waitUntil: 'networkidle' })
    const scope = page.locator(`[data-slidev-no="${number}"] .l1-fill`)
    async function checkFill(step) {
      check(await scope.locator('[data-filled="true"]').count() === Math.floor(step / 2), `CJ-0 page ${number}: answer order at click ${step}`)
      check(await scope.locator('.l1-fill-hint.shown').count() === Math.ceil(step / 2), `CJ-0 page ${number}: hint order at click ${step}`)
    }
    await checkFill(0)
    for (let step = 1; step <= blanks * 2; step++) {
      await page.keyboard.press('ArrowRight')
      await page.waitForTimeout(100)
      await checkFill(step)
      fillSteps++
    }
    for (let step = blanks * 2 - 1; step >= 0; step--) {
      await page.keyboard.press('ArrowLeft')
      await page.waitForTimeout(100)
      await checkFill(step)
      fillSteps++
    }
  }

  await fs.writeFile(path.join(out, 'report.json'), JSON.stringify({ results, layouts, errors, failures }, null, 2))
  check(errors.length === 0, `Browser errors: ${errors.join(' | ')}`)
  check(failures.length === 0, `Request failures: ${failures.join(' | ')}`)
  console.log(JSON.stringify({ ok: true, homepageCards: decks.length, decks: results, cj0Pages: layouts.length, fillSteps, errors, failures }, null, 2))
}
finally {
  await browser.close()
}
