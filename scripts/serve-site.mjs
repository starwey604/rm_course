import fs from 'node:fs'
import path from 'node:path'
import http from 'node:http'

const root = path.resolve(import.meta.dirname, '..')
const webRoot = path.join(root, 'output', 'site')
const portArg = process.argv.indexOf('--port')
const port = Number(portArg >= 0 ? process.argv[portArg + 1] : process.env.PORT || 4173)
const decks = JSON.parse(fs.readFileSync(path.join(root, 'decks.json'), 'utf8'))
const slugs = new Set(decks.map(deck => deck.slug))
const mime = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.ico': 'image/x-icon',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.pdf': 'application/pdf',
}

if (!fs.existsSync(path.join(webRoot, 'index.html'))) throw new Error('Missing output/site/index.html. Run pnpm build first.')

const server = http.createServer((request, response) => {
  try {
    const url = new URL(request.url || '/', 'http://localhost')
    const pathname = decodeURIComponent(url.pathname)
    const first = pathname.split('/').filter(Boolean)[0]
    if (slugs.has(first) && pathname === `/${first}`) {
      response.writeHead(308, { Location: `/${first}/${url.search}` })
      response.end()
      return
    }

    const relative = pathname.replace(/^\/+/, '')
    let file = path.resolve(webRoot, relative || 'index.html')
    if (file !== webRoot && !file.startsWith(webRoot + path.sep)) {
      response.writeHead(403).end('Forbidden')
      return
    }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html')
    if (!fs.existsSync(file) && !path.extname(pathname) && slugs.has(first)) file = path.join(webRoot, first, 'index.html')
    if (!fs.existsSync(file) || !fs.statSync(file).isFile()) {
      response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Not Found')
      return
    }
    response.writeHead(200, {
      'Content-Type': mime[path.extname(file).toLowerCase()] || 'application/octet-stream',
      'Content-Length': fs.statSync(file).size,
      'Cache-Control': 'no-cache',
    })
    if (request.method === 'HEAD') response.end()
    else fs.createReadStream(file).pipe(response)
  }
  catch (error) {
    response.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' }).end(error.message)
  }
})
server.listen(port, '127.0.0.1', () => {
  console.log(`RM course site: http://127.0.0.1:${port}/`)
  console.log(`Decks: ${decks.map(deck => `/${deck.slug}/`).join(', ')}`)
})
