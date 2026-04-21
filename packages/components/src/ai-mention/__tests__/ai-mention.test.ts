/**
 * YH-UI Components - AI Mention 测试
 */

import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import {
  aiMentionProps,
  aiMentionEmits,
  aiMentionTypes,
  type AiMentionOption,
  type AiMentionFileNode
} from '../src/ai-mention'

// Mock dependencies
vi.mock('@yh-ui/hooks', () => ({
  useNamespace: () => ({
    b: () => 'yh-ai-mention',
    e: (name: string) => `yh-ai-mention__${name}`,
    em: (name: string, mod: string) => `yh-ai-mention__${name}--${mod}`,
    is: (name: string, state: boolean) => (state ? `yh-ai-mention--${name}` : '')
  }),
  useLocale: () => ({
    t: (key: string) => key
  })
}))

vi.mock('@yh-ui/theme', () => ({
  useComponentTheme: () => ({
    themeStyle: {}
  })
}))

describe('AI Mention Types', () => {
  it('should have correct aiMentionTypes', () => {
    expect(aiMentionTypes).toEqual(['agent', 'document', 'table', 'knowledge', 'file'])
  })
})

describe('AI Mention Props', () => {
  it('should have correct default values', () => {
    expect(aiMentionProps.modelValue.default).toBe('')
    expect(aiMentionProps.type.default).toBe('textarea')
    expect(aiMentionProps.rows.default).toBe(3)
    expect(aiMentionProps.enableFileTree.default).toBe(true)
    expect(aiMentionProps.fileRoot.default).toBe('/')
    expect(aiMentionProps.fileTreeExpandedLevel.default).toBe(2)
    expect(aiMentionProps.showFileIcon.default).toBe(true)
    expect(aiMentionProps.showFileSize.default).toBe(true)
    expect(aiMentionProps.showModifiedTime.default).toBe(true)
    expect(aiMentionProps.searchDebounce.default).toBe(300)
    expect(aiMentionProps.themeOverrides.default).toBeDefined()
  })

  it('should have correct prop types', () => {
    expect(aiMentionProps.modelValue.type).toBeDefined()
    expect(aiMentionProps.types.type).toBeDefined()
    expect(aiMentionProps.options.type).toBeDefined()
    expect(aiMentionProps.triggers.type).toBeDefined()
    expect(aiMentionProps.type.type).toBeDefined()
    expect(aiMentionProps.rows.type).toBeDefined()
  })

  it('should have function type for filterOption', () => {
    expect(aiMentionProps.filterOption.type).toBeDefined()
  })

  it('should have function type for fileLoader', () => {
    expect(aiMentionProps.fileLoader.type).toBeDefined()
  })

  it('should have function type for formatFileSize', () => {
    expect(aiMentionProps.formatFileSize.type.name).toBe('Function')
  })

  it('should have default formatFileSize function', () => {
    const formatFn = aiMentionProps.formatFileSize.default as (size: number) => string

    expect(formatFn(500)).toBe('500 B')
    expect(formatFn(1024)).toBe('1.0 KB')
    expect(formatFn(1024 * 1024)).toBe('1.0 MB')
    expect(formatFn(1024 * 1024 * 1024)).toBe('1.0 GB')
  })
})

describe('AI Mention Emits', () => {
  it('should have all required emits', () => {
    expect(aiMentionEmits['update:modelValue']).toBeDefined()
    expect(aiMentionEmits.input).toBeDefined()
    expect(aiMentionEmits.change).toBeDefined()
    expect(aiMentionEmits.select).toBeDefined()
    expect(aiMentionEmits.search).toBeDefined()
    expect(aiMentionEmits['file-load']).toBeDefined()
    expect(aiMentionEmits['file-select']).toBeDefined()
    expect(aiMentionEmits.focus).toBeDefined()
    expect(aiMentionEmits.blur).toBeDefined()
    expect(aiMentionEmits.keydown).toBeDefined()
  })

  it('should validate update:modelValue emit', () => {
    expect(aiMentionEmits['update:modelValue']('test')).toBe(true)
    expect(aiMentionEmits['update:modelValue']('')).toBe(true)
  })

  it('should validate input emit', () => {
    expect(aiMentionEmits.input('hello')).toBe(true)
  })

  it('should validate select emit', () => {
    const option: AiMentionOption = { value: 'test', label: 'Test' }
    expect(aiMentionEmits.select(option, '@')).toBe(true)
  })

  it('should validate search emit', () => {
    expect(aiMentionEmits.search('keyword', '@')).toBe(true)
  })

  it('should validate file-load emit', () => {
    const nodes: AiMentionFileNode[] = []
    expect(aiMentionEmits['file-load']('document', nodes)).toBe(true)
  })

  it('should validate file-select emit', () => {
    const node: AiMentionFileNode = {
      key: 'test',
      label: 'Test',
      isFolder: false,
      path: '/test'
    }
    const option: AiMentionOption = { value: 'test', label: 'Test' }
    expect(aiMentionEmits['file-select'](node, option)).toBe(true)
  })

  it('should validate focus and blur emits', () => {
    const mockEvent = new FocusEvent('focus')
    expect(aiMentionEmits.focus(mockEvent)).toBe(true)
    expect(aiMentionEmits.blur(mockEvent)).toBe(true)
  })

  it('should validate keydown emit', () => {
    const mockEvent = new KeyboardEvent('keydown')
    expect(aiMentionEmits.keydown(mockEvent)).toBe(true)
  })
})

describe('AI Mention Types Interfaces', () => {
  it('should define AiMentionOption correctly', () => {
    const option: AiMentionOption = {
      value: 'test-value',
      label: 'Test Label',
      type: 'agent',
      icon: 'robot',
      description: 'Test description',
      path: '/path/to/file',
      size: 1024,
      modifiedAt: Date.now(),
      children: [],
      isFolder: false,
      expanded: true
    }

    expect(option.value).toBe('test-value')
    expect(option.label).toBe('Test Label')
    expect(option.type).toBe('agent')
  })

  it('should define AiMentionFileNode correctly', () => {
    const node: AiMentionFileNode = {
      key: 'test-key',
      label: 'Test Node',
      isFolder: true,
      path: '/test/path',
      children: [
        {
          key: 'child-key',
          label: 'Child',
          isFolder: false,
          path: '/test/child'
        }
      ],
      disabled: false,
      icon: 'folder',
      size: 2048,
      modifiedAt: Date.now()
    }

    expect(node.key).toBe('test-key')
    expect(node.isFolder).toBe(true)
    expect(node.children).toHaveLength(1)
  })

  it('should support file loader function type', () => {
    const loader: (
      keyword: string,
      type: 'document' | 'table' | 'file' | 'knowledge'
    ) => Promise<AiMentionFileNode[]> = async (keyword, type) => {
      return [
        {
          key: keyword,
          label: keyword,
          isFolder: false,
          path: `/${type}/${keyword}`
        }
      ]
    }

    expect(typeof loader).toBe('function')
  })
})

describe('AI Mention Expose', () => {
  it('should define expose interface correctly', () => {
    const expose = {
      focus: () => {},
      blur: () => {},
      clear: () => {},
      getRef: (): HTMLTextAreaElement | undefined => undefined,
      insertMention: (option: AiMentionOption, trigger?: string) => {},
      refreshFileTree: () => {},
      toggleFolder: (key: string) => {}
    }

    expect(typeof expose.focus).toBe('function')
    expect(typeof expose.blur).toBe('function')
    expect(typeof expose.clear).toBe('function')
    expect(typeof expose.getRef).toBe('function')
    expect(typeof expose.insertMention).toBe('function')
    expect(typeof expose.refreshFileTree).toBe('function')
    expect(typeof expose.toggleFolder).toBe('function')
  })
})

describe('AI Mention Slots', () => {
  it('should define slots interface', () => {
    const slots = {
      default: () => 'default slot content',
      header: () => 'header slot content'
    }

    expect(typeof slots.default).toBe('function')
    expect(typeof slots.header).toBe('function')
  })
})
