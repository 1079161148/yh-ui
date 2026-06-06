/**
 * YH-UI AI SDK - 文档加载器测试
 */

import { describe, it, expect } from 'vitest'
import { loadMarkdown, chunkText, createFileLoader, createTextLoader } from '../src/loaders'

describe('DocumentLoaders', () => {
  describe('loadMarkdown', () => {
    it('should load markdown without splitting', () => {
      const md = '# Hello\n\nThis is content.'
      const docs = loadMarkdown(md, { split: false })
      expect(docs.length).toBe(1)
      expect(docs[0].content).toContain('Hello')
    })

    it('should split markdown by headings', () => {
      const md = `# Title\n\nParagraph one.\n\n## Section\n\nParagraph two.`
      const docs = loadMarkdown(md, { split: true, chunkSize: 50 })
      expect(docs.length).toBeGreaterThan(1)
    })
  })

  describe('chunkText', () => {
    it('should chunk text into smaller pieces', () => {
      const text = 'A'.repeat(2000)
      const chunks = chunkText(text, { chunkSize: 500, chunkOverlap: 50 })
      expect(chunks.length).toBeGreaterThan(1)
    })

    it('should preserve chunk metadata', () => {
      const chunks = chunkText('Short text', { chunkSize: 10 })
      expect(chunks[0].metadata?.index).toBe(0)
    })
  })

  describe('createTextLoader', () => {
    it('should create text document with metadata', () => {
      const doc = createTextLoader('Hello world', { source: 'test.txt' })
      expect(doc.content).toBe('Hello world')
      expect(doc.metadata?.source).toBe('test.txt')
    })
  })

  describe('createFileLoader', () => {
    it('should load text via chunkText', async () => {
      const loader = createFileLoader({ chunkSize: 100 })
      const docs = await loader.loadFromText('A'.repeat(500))
      expect(docs.length).toBeGreaterThan(1)
    })

    it('should load markdown', async () => {
      const loader = createFileLoader({ chunkSize: 100 })
      const docs = await loader.loadFromMarkdown('# Header\n\nContent')
      expect(docs.length).toBeGreaterThanOrEqual(1)
    })

    it('should throw when PDF loader not configured', async () => {
      const loader = createFileLoader({})
      await expect(loader.loadFromPDF('test')).rejects.toThrow('PDF loader not configured')
    })

    it('should throw when DOCX loader not configured', async () => {
      const loader = createFileLoader({})
      await expect(loader.loadFromDOCX('test')).rejects.toThrow('DOCX loader not configured')
    })
  })
})
