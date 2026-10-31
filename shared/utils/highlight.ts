import { createHighlighterCoreSync } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'
import c from 'shiki/langs/c.mjs'
import { codeTheme } from '../theme/code-theme.ts'

export type CodeToken = { content: string, color?: string }

// Synchronous, local grammars: the first frame and PDF export have colors too.
const highlighter = createHighlighterCoreSync({
  themes: [codeTheme],
  langs: [c],
  engine: createJavaScriptRegexEngine(),
})
const cache = new Map<string, ReturnType<typeof highlighter.codeToTokensBase>>()

export function highlightC(code: string) {
  let tokens = cache.get(code)
  if (!tokens) {
    tokens = highlighter.codeToTokensBase(code, { lang: 'c', theme: codeTheme.name })
    cache.set(code, tokens)
  }
  return tokens
}

// Parse the complete program first, then partition tokens around teaching blanks.
// Each fragment retains its surrounding string/comment/function context.
export function highlightParts<T extends {text: string}>(rows: T[][]) {
  const highlighted = highlightC(rows.map(parts => parts.map(p => p.text).join('')).join('\n'))
  return rows.map((parts, line) => {
    let start = 0
    return parts.map(part => {
      const end = start + part.text.length
      let position = 0
      const tokens: CodeToken[] = []
      for (const token of highlighted[line]) {
        const tokenEnd = position + token.content.length
        const from = Math.max(start, position), to = Math.min(end, tokenEnd)
        if (from < to) tokens.push({...token, content:token.content.slice(from-position,to-position)})
        position = tokenEnd
      }
      start = end
      return {...part, tokens}
    })
  })
}
