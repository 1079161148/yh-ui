/**
 * Flow Package SSR 测试工具函数
 * @description 用于测试 Flow 组件在 SSR 环境下的行为
 */
import { createSSRApp, h, type Component } from 'vue'
import { renderToString } from 'vue/server-renderer'

/**
 * 渲染组件为 HTML 字符串（服务端）
 */
export async function renderSSR(
  component: Component,
  props: Record<string, unknown> = {},
  slots: Record<string, unknown> = {}
) {
  const app = createSSRApp({
    render() {
      return h(component, props, slots)
    }
  })

  return await renderToString(app)
}

/**
 * 检查 SSR 渲染结果中是否包含特定文本
 */
export function expectSSRContains(html: string, text: string) {
  if (!html.includes(text)) {
    throw new Error(`Expected SSR output to contain "${text}", but got:\n${html}`)
  }
}

/**
 * 检查 SSR 渲染结果是否包含特定 class
 */
export function expectSSRHasClass(html: string, className: string) {
  const classRegex = new RegExp(`class="[^"]*${className}[^"]*"`)
  if (!classRegex.test(html)) {
    throw new Error(`Expected SSR output to have class "${className}", but got:\n${html}`)
  }
}

/**
 * 模拟 SSR 环境
 */
export function mockSSREnvironment() {
  const originalWindow = global.window as unknown as Record<string, unknown>
  const originalDocument = global.document as unknown as Record<string, unknown>

  delete (global as unknown as Record<string, unknown>).window
  delete (global as unknown as Record<string, unknown>).document

  return () => {
    ;(global as unknown as Record<string, unknown>).window = originalWindow
    ;(global as unknown as Record<string, unknown>).document = originalDocument
  }
}

/**
 * HTML 标准化，用于比较 SSR 和 CSR 结果
 */
export function normalizeHtml(html: string) {
  return html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\s+/g, ' ')
    .replace(/>\s+</g, '><')
    .replace(/<(\/?)([a-z0-9-]+)([^>]*?)(\/?)>/gi, (match, close, tag, attrs, selfClosing) => {
      tag = tag.toLowerCase()
      if (close) {
        return `</${tag}>`
      }

      const attrRegex = /([^\s>=/]+)(?:="([^"]*)")?/gi
      const foundAttrs: string[] = []
      let m: RegExpExecArray | null
      while ((m = attrRegex.exec(attrs)) !== null) {
        const name = m[1].toLowerCase()
        let value = m[2] || ''

        if (name.startsWith('data-v-')) continue

        value = value.replace(/\s+/g, ' ').trim()

        if (value === '' || value === 'false') continue

        if (name === 'style') {
          value = value
            .split(';')
            .map((s) => s.trim())
            .filter(Boolean)
            .map((s) => {
              const parts = s.split(':')
              if (parts.length < 2) return null
              const prop = parts[0].trim().toLowerCase()
              let val = parts.slice(1).join(':').trim()

              val = val.replace(/^0(?:px|em|rem|%)$/, '0')

              if (val === 'rgba(0,0,0,0)' || val === 'rgba(0, 0, 0, 0)') val = 'transparent'

              if (
                prop.startsWith('-webkit-') ||
                prop.startsWith('-ms-') ||
                prop.startsWith('-moz-') ||
                prop.startsWith('webkit-') ||
                prop.startsWith('ms-') ||
                prop.startsWith('moz-') ||
                prop === 'mstransform'
              ) {
                return null
              }

              return `${prop}:${val}`
            })
            .filter(Boolean)
            .sort()
            .join(';')
        }

        if (name === 'class') {
          value = value
            .split(' ')
            .filter((c) => !/-(enter|leave)-(from|active|to)$/.test(c))
            .sort()
            .join(' ')
          if (!value) continue
        }

        if (tag === 'path' && name === 'd') {
          value = value
            .replace(/([A-Z])/gi, ' $1 ')
            .replace(/,/g, ' ')
            .replace(/\s+/g, ' ')
            .trim()
        }

        const isAriaValue = ['aria-valuenow', 'aria-valuemin', 'aria-valuemax'].includes(name)
        if (name === 'id' || name === 'for' || (name.startsWith('aria-') && !isAriaValue)) {
          value = '__ID__'
        }

        if (name === 'xmlns' || name.startsWith('xmlns:')) continue

        if (value === 'true') {
          value = ''
        }

        foundAttrs.push(`${name}${value ? `="${value}"` : ''}`)
      }
      foundAttrs.sort()
      const sortedAttrs = foundAttrs.join(' ')

      const voidElements = [
        'area',
        'base',
        'br',
        'col',
        'embed',
        'hr',
        'img',
        'input',
        'link',
        'meta',
        'param',
        'source',
        'track',
        'wbr'
      ]
      const isVoid = voidElements.includes(tag)

      const normalizedTag = `<${tag}${sortedAttrs ? ' ' + sortedAttrs : ''}>`
      return isVoid ? normalizedTag : selfClosing ? `${normalizedTag}</${tag}>` : normalizedTag
    })
    .replace(
      /<textarea([^>]*)>[\s\S]*?<\/textarea>/gi,
      '<textarea$1>__TEXTAREA_CONTENT__</textarea>'
    )
    .trim()
}

/**
 * Hydration 测试辅助函数
 */
export async function testHydration(
  component: Component,
  props: Record<string, unknown> = {},
  slots: Record<string, unknown> = {}
) {
  const ssrHtml = await renderSSR(component, props, slots)

  const { mount } = await import('@vue/test-utils')
  const wrapper = mount(component, {
    props,
    slots,
    global: {
      stubs: {
        transition: false,
        'transition-group': false
      }
    }
  })
  const csrHtml = wrapper.html()

  const ssrNormalized = normalizeHtml(ssrHtml)
  const csrNormalized = normalizeHtml(csrHtml)
  const isMatch = ssrNormalized === csrNormalized

  return {
    ssrHtml: ssrNormalized,
    csrHtml: csrNormalized,
    isMatch
  }
}
