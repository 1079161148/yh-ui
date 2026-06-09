type HighlightResult = {
  value: string
}

type HighlightOptions = {
  language?: string
  ignoreIllegals?: boolean
}

const KNOWN_LANGUAGES = new Set([
  'bash',
  'c',
  'cpp',
  'css',
  'go',
  'html',
  'java',
  'javascript',
  'json',
  'jsx',
  'markdown',
  'md',
  'plaintext',
  'python',
  'rust',
  'shell',
  'sql',
  'text',
  'ts',
  'tsx',
  'typescript',
  'vue',
  'xml',
  'yaml',
  'yml'
])

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')

const normalizeLanguage = (language?: string) => {
  if (!language) return ''

  const normalized = language.toLowerCase()
  if (normalized === 'vue') return 'html'
  if (normalized === 'ts') return 'typescript'
  if (normalized === 'js') return 'javascript'
  if (normalized === 'sh') return 'shell'
  if (normalized === 'md') return 'markdown'

  return normalized
}

const render = (code: string): HighlightResult => ({
  value: escapeHtml(code)
})

const hljs = {
  getLanguage(language?: string) {
    const normalized = normalizeLanguage(language)
    return normalized && KNOWN_LANGUAGES.has(normalized) ? normalized : undefined
  },
  highlight(code: string, _options?: HighlightOptions) {
    return render(code)
  },
  highlightAuto(code: string) {
    return render(code)
  }
}

export async function loadHighlightStyle() {
  if (typeof window !== 'undefined') {
    try {
      // @ts-ignore
      await import('highlight.js/styles/atom-one-dark.css')
    } catch (err) {
      console.warn('[YhUi] Failed to load highlight.js stylesheet', err)
    }
  }
}

export default hljs
