// Explicit roles avoid inherited, more-specific editor rules recoloring array
// names, format specifiers, or string delimiters unexpectedly.
export const codeTheme = {
  name: 'cone-paper',
  type: 'light' as const,
  colors: {
    'editor.background': '#EAF0F7',
    'editor.foreground': '#18283B',
  },
  tokenColors: [
    { settings: { foreground: '#18283B', background: '#EAF0F7' } },
    { scope: ['variable', 'entity.name.variable', 'punctuation'], settings: { foreground: '#18283B' } },
    { scope: ['keyword', 'storage'], settings: { foreground: '#2455A4' } },
    { scope: ['support.type', 'entity.name.type'], settings: { foreground: '#2455A4' } },
    { scope: ['keyword.operator'], settings: { foreground: '#43546A' } },
    { scope: ['string', 'punctuation.definition.string', 'constant.character', 'constant.other.placeholder'], settings: { foreground: '#28695B' } },
    { scope: ['constant.numeric', 'constant.language'], settings: { foreground: '#8A4B29' } },
    { scope: ['entity.name.function', 'support.function', 'entity.name.function.preprocessor', 'keyword.control.directive', 'punctuation.definition.directive'], settings: { foreground: '#72569D' } },
    { scope: ['comment', 'punctuation.definition.comment'], settings: { foreground: '#526477' } },
  ],
}
