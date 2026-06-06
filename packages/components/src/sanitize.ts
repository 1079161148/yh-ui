import createDOMPurify from 'dompurify'

type MarkupProfile = 'html' | 'svg'

export interface SanitizeMarkupOptions {
  allowedTags?: string[]
  allowedAttributes?: string[]
  allowedSchemes?: string[]
  allowDataAttributes?: boolean
  profile?: MarkupProfile
  sanitizer?: ((html: string) => string) | undefined
}

const DEFAULT_ALLOWED_SCHEMES = ['http', 'https', 'mailto', 'tel']

const DEFAULT_HTML_TAGS = [
  'a',
  'blockquote',
  'br',
  'button',
  'code',
  'div',
  'em',
  'figcaption',
  'figure',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'hr',
  'img',
  'li',
  'ol',
  'p',
  'pre',
  'span',
  'strong',
  'sup',
  'sub',
  'table',
  'tbody',
  'td',
  'th',
  'thead',
  'tr',
  'ul'
] as const

const DEFAULT_HTML_ATTRIBUTES = [
  'alt',
  'aria-label',
  'class',
  'data-code',
  'data-id',
  'data-lang',
  'data-latex',
  'height',
  'href',
  'id',
  'rel',
  'role',
  'src',
  'style',
  'tabindex',
  'target',
  'title',
  'width'
] as const

function withLowercaseAliases<T extends readonly string[]>(values: T) {
  return [...new Set([...values, ...values.map((value) => value.toLowerCase())])]
}

const DEFAULT_SVG_TAGS = [
  'a',
  'br',
  'circle',
  'clipPath',
  'defs',
  'div',
  'ellipse',
  'foreignObject',
  'g',
  'line',
  'marker',
  'mask',
  'path',
  'pattern',
  'polygon',
  'polyline',
  'rect',
  'span',
  'stop',
  'style',
  'svg',
  'symbol',
  'text',
  'tspan',
  'use'
]

const DEFAULT_SVG_ATTRIBUTES = [
  ...DEFAULT_HTML_ATTRIBUTES,
  'clip-path',
  'cx',
  'cy',
  'd',
  'dominant-baseline',
  'fill',
  'fill-opacity',
  'filter',
  'font-family',
  'font-size',
  'font-weight',
  'gradientTransform',
  'gradientUnits',
  'letter-spacing',
  'marker-end',
  'marker-mid',
  'marker-start',
  'mask',
  'offset',
  'opacity',
  'patternContentUnits',
  'patternTransform',
  'patternUnits',
  'points',
  'preserveAspectRatio',
  'r',
  'rx',
  'ry',
  'stroke',
  'stroke-dasharray',
  'stroke-linecap',
  'stroke-linejoin',
  'stroke-opacity',
  'stroke-width',
  'text-anchor',
  'transform',
  'viewBox',
  'x',
  'x1',
  'x2',
  'xlink:href',
  'xmlns',
  'xmlns:xlink',
  'xml:space',
  'y',
  'y1',
  'y2'
]

const NORMALIZED_SVG_TAGS = withLowercaseAliases(DEFAULT_SVG_TAGS)
const NORMALIZED_SVG_ATTRIBUTES = withLowercaseAliases(DEFAULT_SVG_ATTRIBUTES)

let purifier: ReturnType<typeof createDOMPurify> | null = null
let purifierWindow: Window | null = null

function getPurifier() {
  if (typeof window === 'undefined') {
    return null
  }

  if (!purifier || purifierWindow !== window) {
    purifier = createDOMPurify(window)
    purifierWindow = window
  }

  return purifier
}

function normalizeSchemes(allowedSchemes?: string[]) {
  return (allowedSchemes?.length ? allowedSchemes : DEFAULT_ALLOWED_SCHEMES).map((scheme) =>
    scheme.toLowerCase()
  )
}

function isAllowedUrl(value: string, allowedSchemes: string[]) {
  const normalized = value.trim()

  if (!normalized) {
    return true
  }

  if (
    normalized.startsWith('#') ||
    normalized.startsWith('/') ||
    normalized.startsWith('./') ||
    normalized.startsWith('../')
  ) {
    return true
  }

  if (normalized.startsWith('//')) {
    return false
  }

  const schemeMatch = normalized.match(/^([a-z][a-z0-9+.-]*):/i)
  if (!schemeMatch) {
    return true
  }

  return allowedSchemes.includes(schemeMatch[1].toLowerCase())
}

function postProcessSanitizedMarkup(html: string, allowedSchemes: string[]) {
  if (typeof document === 'undefined') {
    return html
  }

  const template = document.createElement('template')
  template.innerHTML = html

  for (const el of template.content.querySelectorAll<HTMLElement | SVGElement>(
    '[href], [src], [xlink\\:href]'
  )) {
    for (const attributeName of ['href', 'src', 'xlink:href']) {
      const rawValue = el.getAttribute(attributeName)
      if (!rawValue) {
        continue
      }

      if (!isAllowedUrl(rawValue, allowedSchemes)) {
        el.removeAttribute(attributeName)
      }
    }

    if (el instanceof HTMLAnchorElement && el.getAttribute('target') === '_blank') {
      const relTokens = new Set((el.getAttribute('rel') || '').split(/\s+/).filter(Boolean))
      relTokens.add('noopener')
      relTokens.add('noreferrer')
      el.setAttribute('rel', [...relTokens].join(' '))
    }
  }

  return template.innerHTML
}

function serverSideSanitize(html: string, allowedSchemes: string[]) {
  let output = html
    // 移除危险标签
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/<iframe[\s\S]*?>[\s\S]*?<\/iframe>/gi, '')
    .replace(/<object[\s\S]*?>[\s\S]*?<\/object>/gi, '')
    .replace(/<embed[\s\S]*?>/gi, '')
    // 移除事件处理程序
    .replace(/\son[a-z-]+\s*=\s*(['"]).*?\1/gi, '')
    .replace(/\son[a-z-]+\s*=\s*[^\s>]+/gi, '')

  // 清理 URL 属性
  const urlAttrs = ['href', 'src', 'xlink:href', 'xlink\\:href']
  for (const attr of urlAttrs) {
    const regex = new RegExp(`\\s(${attr})\\s*=\\s*(['"])(.*?)\\2`, 'gi')
    output = output.replace(regex, (full, attrName: string, quote: string, rawValue: string) => {
      // 特殊处理 javascript: 协议
      if (rawValue.toLowerCase().startsWith('javascript:')) {
        return ` ${attrName}=${quote}${quote}`
      }
      return isAllowedUrl(rawValue, allowedSchemes) ? full : ` ${attrName}=${quote}${quote}`
    })
  }

  // 再次确保移除所有 javascript: URL（不区分大小写）
  output = output.replace(/javascript:/gi, '')

  return output
}

function shouldFallbackToServerSvgSanitizer(source: string, sanitized: string) {
  const normalizedSource = source.toLowerCase()
  const normalizedSanitized = sanitized.toLowerCase()

  return (
    normalizedSource.includes('foreignobject') && !normalizedSanitized.includes('foreignobject')
  )
}

export function sanitizeMarkup(html: string, options: SanitizeMarkupOptions = {}) {
  const allowedSchemes = normalizeSchemes(options.allowedSchemes)
  const source = options.sanitizer ? options.sanitizer(html) : html

  if (!source) {
    return ''
  }

  const allowedTags = options.allowedTags ?? [
    ...(options.profile === 'svg' ? NORMALIZED_SVG_TAGS : DEFAULT_HTML_TAGS)
  ]
  const allowedAttributes = options.allowedAttributes ?? [
    ...(options.profile === 'svg' ? NORMALIZED_SVG_ATTRIBUTES : DEFAULT_HTML_ATTRIBUTES)
  ]
  const purifierInstance = getPurifier()

  // 始终先进行服务端清理，确保安全
  let sanitized = serverSideSanitize(source, allowedSchemes)

  if (purifierInstance) {
    try {
      const domSanitized = purifierInstance.sanitize(sanitized, {
        ALLOWED_TAGS: allowedTags,
        ALLOWED_ATTR: allowedAttributes,
        ALLOW_DATA_ATTR: options.allowDataAttributes ?? true,
        USE_PROFILES:
          options.profile === 'svg' ? { html: true, svg: true, svgFilters: true } : { html: true }
      })

      if (
        options.profile === 'svg' &&
        shouldFallbackToServerSvgSanitizer(source, String(domSanitized))
      ) {
        // 使用服务端清理结果
      } else {
        sanitized = String(domSanitized)
      }
    } catch {
      // 如果 DOMPurify 失败，继续使用服务端清理结果
    }
  }

  return postProcessSanitizedMarkup(sanitized, allowedSchemes)
}

export function sanitizeHighlightedHtml(html: string) {
  // 专门为高亮代码的简单清理 - 只移除危险内容，保留样式类
  return html
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/<iframe[\s\S]*?>[\s\S]*?<\/iframe>/gi, '')
    .replace(/<object[\s\S]*?>[\s\S]*?<\/object>/gi, '')
    .replace(/<embed[\s\S]*?>/gi, '')
    .replace(/<img[\s\S]*?>/gi, '')
    .replace(/\son[a-z-]+\s*=\s*(['"]).*?\1/gi, '')
    .replace(/\son[a-z-]+\s*=\s*[^\s>]+/gi, '')
    .replace(/javascript:/gi, '')
}

export function sanitizeSvgMarkup(
  svg: string,
  options: Omit<SanitizeMarkupOptions, 'profile'> = {}
) {
  return sanitizeMarkup(svg, {
    ...options,
    profile: 'svg'
  })
}
