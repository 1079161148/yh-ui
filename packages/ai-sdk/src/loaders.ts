/**
 * YH-UI AI SDK - 文档加载器
 *
 * 支持 Markdown / 纯文本 / 结构化拆分。
 * PDF、DOCX 通过接口预留，可由可选依赖或用户实现。
 */

export interface LoadedDocument {
  content: string
  metadata?: Record<string, unknown>
  source?: string
}

export interface DocumentLoaderOptions {
  /** 是否按段落/块拆分 */
  split?: boolean
  /** 块大小（字符数） */
  chunkSize?: number
  /** 块重叠（字符数） */
  chunkOverlap?: number
}

/**
 * 文本加载器：直接使用字符串
 */
export function createTextLoader(
  content: string,
  metadata?: Record<string, unknown>
): LoadedDocument {
  return { content: content.trim(), metadata }
}

/**
 * Markdown 加载器：按标题或段落拆分
 */
export function loadMarkdown(
  markdown: string,
  options: DocumentLoaderOptions = {}
): LoadedDocument[] {
  const chunkSize = options.chunkSize ?? 1000
  const chunkOverlap = Math.min(options.chunkOverlap ?? 200, Math.floor(chunkSize * 0.5))
  const { split = true } = options

  if (!split) {
    return [{ content: markdown.trim(), metadata: { type: 'markdown' } }]
  }

  const blocks: string[] = []
  const lines = markdown.split(/\r?\n/)
  let current = ''

  for (const line of lines) {
    const isHeading = /^#{1,6}\s/.test(line)
    if (isHeading && current.length >= chunkSize) {
      if (current.trim()) blocks.push(current.trim())
      current = line + '\n'
    } else {
      current += line + '\n'
      if (current.length >= chunkSize) {
        if (current.trim()) blocks.push(current.trim())
        current = current.slice(-chunkOverlap)
      }
    }
  }
  if (current.trim()) blocks.push(current.trim())

  return blocks.map((content, i) => ({
    content,
    metadata: { type: 'markdown', index: i }
  }))
}

/**
 * 通用分块：按固定大小拆分，带重叠
 */
export function chunkText(
  text: string,
  options: { chunkSize?: number; chunkOverlap?: number } = {}
): LoadedDocument[] {
  const chunkSize = options.chunkSize ?? 800
  const chunkOverlap = Math.min(options.chunkOverlap ?? 100, Math.floor(chunkSize * 0.5))
  const chunks: LoadedDocument[] = []
  let start = 0

  while (start < text.length) {
    const end = Math.min(start + chunkSize, text.length)
    let slice = text.slice(start, end)
    if (end < text.length) {
      const lastSpace = slice.lastIndexOf(' ')
      if (lastSpace > chunkSize / 2) slice = slice.slice(0, lastSpace + 1)
    }
    if (slice.trim()) {
      chunks.push({ content: slice.trim(), metadata: { index: chunks.length } })
    }
    const nextStart = start + slice.length - chunkOverlap
    start = nextStart > start ? nextStart : start + slice.length
    if (start >= text.length) break
  }

  return chunks
}

/**
 * PDF 加载器接口（由用户或可选包实现）
 * 可选依赖：pdf-parse / pdfjs-dist 等
 */
export type PDFLoader = (input: string | ArrayBuffer | Buffer) => Promise<LoadedDocument[]>

/**
 * DOCX 加载器接口（由用户或可选包实现）
 * 可选依赖：mammoth 等
 */
export type DOCXLoader = (input: string | ArrayBuffer | Buffer) => Promise<LoadedDocument[]>

/**
 * 创建复合加载器：根据扩展名选择策略
 */
export function createFileLoader(options: {
  pdf?: PDFLoader
  docx?: DOCXLoader
  chunkSize?: number
  chunkOverlap?: number
}) {
  const { pdf, docx, chunkSize = 800, chunkOverlap = 100 } = options

  return {
    async loadFromText(content: string): Promise<LoadedDocument[]> {
      return chunkText(content, { chunkSize, chunkOverlap })
    },
    async loadFromMarkdown(content: string): Promise<LoadedDocument[]> {
      return loadMarkdown(content, { chunkSize, chunkOverlap })
    },
    async loadFromPDF(input: string | ArrayBuffer | Buffer): Promise<LoadedDocument[]> {
      if (!pdf)
        throw new Error('PDF loader not configured. Provide options.pdf or install a PDF library.')
      return pdf(input)
    },
    async loadFromDOCX(input: string | ArrayBuffer | Buffer): Promise<LoadedDocument[]> {
      if (!docx)
        throw new Error(
          'DOCX loader not configured. Provide options.docx or install a DOCX library.'
        )
      return docx(input)
    }
  }
}
