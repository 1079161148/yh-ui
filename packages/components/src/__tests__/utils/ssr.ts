/**
 * SSR 测试工具函数
 * @description 用于测试组件在 SSR 环境下的行为
 */
import { createSSRApp, h } from 'vue'
import { renderToString } from 'vue/server-renderer'
import type { Component } from 'vue'

/**
 * 渲染组件为 HTML 字符串（服务端）
 */
export async function renderSSR(
  component: Component,
  props: Record<string, any> = {},
  slots: Record<string, any> = {}
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
  const originalWindow = global.window as any
  const originalDocument = global.document as any

  delete (global as any).window
  delete (global as any).document

  return () => {
    ;(global as any).window = originalWindow
    ;(global as any).document = originalDocument
  }
}

/**
 * HTML 标准化，用于比较 SSR 和 CSR 结果
 */
export function normalizeHtml(html: string) {
  return (
    html
      .replace(/<!--[\s\S]*?-->/g, '') // 移除注释
      .replace(/\s+/g, ' ') // 标准化空格
      .replace(/>\s+</g, '><') // 移除标签间空格
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

          // 忽略 Vue 内部属性
          if (name.startsWith('data-v-')) continue

          // 标准化所有属性值：移除多余空格
          value = value.replace(/\s+/g, ' ').trim()

          // 忽略空属性 (如 style="") 和值为 "false" 的可选属性 (SSR 通常省略)
          if (value === '' || value === 'false') continue

          // 忽略 textarea 的 value 属性 (CSR 中可能存在)
          if (tag === 'textarea' && name === 'value') continue

          // 标准化 style 属性：去掉冒号后的空格，统一分号结尾
          if (name === 'style') {
            value = value.replace(/:\s+/g, ':').replace(/;\s+/g, ';').replace(/;$/, '') // 统一去掉末尾分号
          }

          // 标准化 class 属性：移除 Vue Transition 可能产生的过渡类名
          if (name === 'class') {
            value = value
              .split(' ')
              .filter((c) => !/-(enter|leave)-(from|active|to)$/.test(c))
              .sort()
              .join(' ')
            if (!value) continue
          }

          // 标准化 SVG path 的 d 属性
          if (tag === 'path' && name === 'd') {
            value = value
              .replace(/([A-Z])/gi, ' $1 ')
              .replace(/,/g, ' ')
              .replace(/\s+/g, ' ')
              .trim()
          }

          // 标准化 ID 相关属性：处理 Vue useId 或自定义生成 ID 的差异
          const isAriaValue = ['aria-valuenow', 'aria-valuemin', 'aria-valuemax'].includes(name)
          if (name === 'id' || name === 'for' || (name.startsWith('aria-') && !isAriaValue)) {
            value = '__ID__'
          }

          // 忽略 SVG 的 xmlns 相关属性
          if (name === 'xmlns' || name.startsWith('xmlns:')) continue

          // 标准化 boolean 属性
          if (value === 'true') {
            value = ''
          }

          foundAttrs.push(`${name}${value ? `="${value}"` : ''}`)
        }
        foundAttrs.sort()
        const sortedAttrs = foundAttrs.join(' ')

        //  void 元素不应该有闭合标签（HTML void elements only）
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
      // 统一处理 textarea 内容：SSR 会把内容放在标签内，CSR 可能不放
      // 为简单起见，如果 textarea 内容不匹配但结构一致，我们也认为匹配
      .replace(
        /<textarea([^>]*)>[\s\S]*?<\/textarea>/gi,
        '<textarea$1>__TEXTAREA_CONTENT__</textarea>'
      )
      .trim()
  )
}

/**
 * Hydration 测试辅助函数
 */
export async function testHydration(
  component: Component,
  props: Record<string, any> = {},
  slots: Record<string, any> = {}
) {
  // 1. SSR 渲染
  const ssrHtml = await renderSSR(component, props, slots)

  // 2. 客户端渲染
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
