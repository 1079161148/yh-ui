<script setup lang="ts">
/**
 * DemoBlock - 代码演示组件
 * @description 用于展示组件示例，支持 TypeScript/JavaScript 切换，代码语法高亮
 */
import { ref, computed, watch, nextTick } from 'vue'
import { useData } from 'vitepress'

interface Props {
  title?: string
  description?: string
  tsCode?: string
  jsCode?: string
  rawCode?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  description: '',
  tsCode: '',
  jsCode: '',
  rawCode: ''
})

// 状态
const showCode = ref(false)
const codeType = ref<'ts' | 'js'>('ts')
const copied = ref(false)
const highlightedCode = ref('')

const { lang } = useData()
const isEn = computed(() => lang.value === 'en-US')

// 当前显示的代码
const currentCode = computed(() => {
  if (codeType.value === 'ts') {
    return props.tsCode || props.rawCode
  }
  return props.jsCode || props.rawCode
})

// 是否有两种代码类型
const hasBothTypes = computed(() => {
  return !!props.tsCode && !!props.jsCode
})

// Token 类型定义
type TokenType =
  | 'comment'
  | 'tag'
  | 'component'
  | 'attr-name'
  | 'attr-value'
  | 'string'
  | 'keyword'
  | 'function'
  | 'number'
  | 'punctuation'
  | 'text'

interface Token {
  type: TokenType
  value: string
}

// 改进的 Vue 代码 Tokenizer - 状态机模式，确保完整处理
const tokenizeVueCode = (code: string): Token[] => {
  const tokens: Token[] = []
  let i = 0
  const len = code.length
  let inStyleBlock = false
  let inTag = false

  // 辅助函数：跳过空白字符
  const skipWhitespace = (): string => {
    const start = i
    while (i < len && /\s/.test(code[i])) {
      i++
    }
    return code.slice(start, i)
  }

  while (i < len) {
    // 保存空白字符
    const whitespace = skipWhitespace()
    if (whitespace) {
      tokens.push({ type: 'text', value: whitespace })
      if (i >= len) break
    }

    // HTML 注释
    if (code.slice(i, i + 4) === '<!--') {
      const end = code.indexOf('-->', i + 4)
      const endPos = end === -1 ? len : end + 3
      tokens.push({ type: 'comment', value: code.slice(i, endPos) })
      i = endPos
      continue
    }

    // 单行注释 //
    if (code[i] === '/' && code[i + 1] === '/') {
      const end = code.indexOf('\n', i + 2)
      const endPos = end === -1 ? len : end
      tokens.push({ type: 'comment', value: code.slice(i, endPos) })
      i = endPos
      continue
    }

    // 多行注释 /* */
    if (code[i] === '/' && code[i + 1] === '*') {
      const end = code.indexOf('*/', i + 2)
      const endPos = end === -1 ? len : end + 2
      tokens.push({ type: 'comment', value: code.slice(i, endPos) })
      i = endPos
      continue
    }

    // 模板字符串（反引号）
    if (code[i] === '`') {
      let j = i + 1
      while (j < len && code[j] !== '`') {
        if (code[j] === '\\') j++
        j++
      }
      tokens.push({ type: 'string', value: code.slice(i, j + 1) })
      i = j + 1
      continue
    }

    // 字符串（双引号 / 单引号）
    if (code[i] === '"' || code[i] === "'") {
      const quote = code[i]
      let j = i + 1
      while (j < len && code[j] !== quote) {
        if (code[j] === '\\') j++
        j++
      }
      tokens.push({ type: 'string', value: code.slice(i, j + 1) })
      i = j + 1
      continue
    }

    // 标签开始 <tag 或 </tag 或 <!
    if (code[i] === '<') {
      const nextChar = code[i + 1]

      // 处理结束标签 </
      if (nextChar === '/') {
        inTag = false
        let tagEnd = code.indexOf('>', i)
        if (tagEnd !== -1) {
          const tagContent = code
            .slice(i + 2, tagEnd)
            .replace(/\/>$/, '')
            .trim()
          if (tagContent === 'style') inStyleBlock = false
        }

        tokens.push({ type: 'punctuation', value: '</' })
        i += 2

        // 读取标签名
        let tagName = ''
        while (i < len && /[\w-]/.test(code[i])) {
          tagName += code[i]
          i++
        }

        if (tagName) {
          if (['template', 'script', 'style'].includes(tagName)) {
            tokens.push({ type: 'keyword', value: tagName })
          } else if (tagName.includes('-') || /^[A-Z]/.test(tagName)) {
            tokens.push({ type: 'component', value: tagName })
          } else {
            tokens.push({ type: 'tag', value: tagName })
          }
        }
        continue
      }

      // 处理开始标签 <
      if (/[a-zA-Z]/.test(nextChar)) {
        inTag = true
        tokens.push({ type: 'punctuation', value: '<' })
        i++

        // 读取标签名
        let tagName = ''
        while (i < len && /[\w-]/.test(code[i])) {
          tagName += code[i]
          i++
        }

        if (tagName) {
          if (tagName === 'style') inStyleBlock = true
          if (['template', 'script', 'style'].includes(tagName)) {
            tokens.push({ type: 'keyword', value: tagName })
          } else if (tagName.includes('-') || /^[A-Z]/.test(tagName)) {
            tokens.push({ type: 'component', value: tagName })
          } else {
            tokens.push({ type: 'tag', value: tagName })
          }
        }
        continue
      }
    }

    // 处理 CSS
    if (
      inStyleBlock &&
      !inTag &&
      (code[i] === '.' || code[i] === '#' || (code[i] === ':' && !/\s/.test(code[i - 1] || '')))
    ) {
      let start = i
      i++
      while (i < len && /[\w-]/.test(code[i])) {
        i++
      }
      tokens.push({ type: 'keyword', value: code.slice(start, i) })
      continue
    }

    // 标签结束 > 或 />
    if (code[i] === '>') {
      inTag = false
      tokens.push({ type: 'punctuation', value: '>' })
      i++
      continue
    }

    if (code[i] === '/' && code[i + 1] === '>') {
      inTag = false
      tokens.push({ type: 'punctuation', value: '/>' })
      i += 2
      continue
    }

    // 标点符号
    if (/[(){}[\];,.:|&<>=!@?]/.test(code[i])) {
      tokens.push({ type: 'punctuation', value: code[i] })
      i++
      continue
    }

    // 标识符（变量、属性、函数、关键字）
    if (/[a-zA-Z_$]/.test(code[i])) {
      let j = i
      while (j < len && /[\w-:@.$]/.test(code[j])) {
        j++
      }
      const word = code.slice(i, j)

      const keywords = [
        'import',
        'export',
        'from',
        'const',
        'let',
        'var',
        'function',
        'return',
        'if',
        'else',
        'for',
        'while',
        'switch',
        'case',
        'break',
        'continue',
        'new',
        'this',
        'class',
        'extends',
        'async',
        'await',
        'try',
        'catch',
        'throw',
        'typeof',
        'instanceof',
        'true',
        'false',
        'null',
        'undefined',
        'interface',
        'type',
        'as',
        'satisfies',
        'in',
        'of',
        'any',
        'unknown',
        'never'
      ]

      const reactiveFunctions = [
        'ref',
        'computed',
        'watch',
        'watchEffect',
        'reactive',
        'toRefs',
        'toRef',
        'onMounted',
        'onUnmounted',
        'defineProps',
        'defineEmits',
        'withDefaults'
      ]

      if (
        inTag &&
        (word.startsWith('v-') ||
          word.startsWith('@') ||
          word.startsWith(':') ||
          ['setup', 'lang', 'scoped'].includes(word))
      ) {
        tokens.push({ type: 'attr-name', value: word })
      } else if (keywords.includes(word)) {
        tokens.push({ type: 'keyword', value: word })
      } else if (reactiveFunctions.includes(word)) {
        tokens.push({ type: 'function', value: word })
      } else if (inTag && code[j] === '=') {
        tokens.push({ type: 'attr-name', value: word })
      } else if (code[j] === '(') {
        tokens.push({ type: 'function', value: word })
      } else if (/^[A-Z]/.test(word)) {
        tokens.push({ type: 'component', value: word })
      } else {
        tokens.push({ type: 'text', value: word })
      }
      i = j
      continue
    }

    // 数字
    if (/[0-9]/.test(code[i])) {
      let j = i
      while (j < len && /[0-9.]/.test(code[j])) j++
      if (inStyleBlock) while (j < len && /[a-z%]/.test(code[j])) j++
      tokens.push({ type: 'number', value: code.slice(i, j) })
      i = j
      continue
    }

    tokens.push({ type: 'text', value: code[i] })
    i++
  }
  return tokens
}

// 渲染高亮代码
const renderHighlightedCode = (code: string): string => {
  if (!code) return ''
  const tokens = tokenizeVueCode(code)
  return tokens
    .map((token) => {
      const escaped = token.value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      if (token.type === 'text') return escaped
      return `<span class="token ${token.type}">${escaped}</span>`
    })
    .join('')
}

// 更新高亮代码
const updateHighlight = () => {
  highlightedCode.value = renderHighlightedCode(currentCode.value)
}

// 监听代码变化
watch(
  [currentCode, showCode],
  () => {
    if (showCode.value) {
      nextTick(() => {
        updateHighlight()
      })
    }
  },
  { immediate: true }
)

// 切换代码显示
const toggleCode = () => {
  showCode.value = !showCode.value
}

// 切换代码类型
const switchCodeType = (type: 'ts' | 'js') => {
  codeType.value = type
}

// 复制代码
const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(currentCode.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

// 在 CodeSandbox 中打开
const openInCodeSandbox = () => {
  console.log('Open in CodeSandbox')
}

// 在 StackBlitz 中打开
const openInStackBlitz = () => {
  console.log('Open in StackBlitz')
}

// 刷新演示
const demoKey = ref(0)
const refreshDemo = () => {
  demoKey.value++
}

// 复制锚点
const copyAnchor = async () => {
  try {
    const url = new URL(window.location.href)
    url.hash = props.title || ''
    await navigator.clipboard.writeText(url.toString())
  } catch (err) {
    console.error('Failed to copy anchor:', err)
  }
}
</script>

<template>
  <div class="demo-box">
    <!-- 演示区域 -->
    <div :key="demoKey" class="demo-box__preview">
      <slot />
    </div>

    <!-- 操作栏 -->
    <div :class="['demo-box__actions', { 'is-open': showCode }]">
      <div class="demo-box__actions-left">
        <button
          class="demo-box__action-btn"
          :title="isEn ? 'Copy link' : '复制锚点'"
          @click="copyAnchor"
        >
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path
              fill="currentColor"
              d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"
            />
          </svg>
        </button>
        <button
          class="demo-box__action-btn"
          :title="isEn ? 'Refresh' : '重置演示'"
          @click="refreshDemo"
        >
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path
              fill="currentColor"
              d="M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"
            />
          </svg>
        </button>
        <span v-if="title" class="demo-box__title">{{ title }}</span>
      </div>
      <div class="demo-box__actions-right">
        <!-- 在线编辑 -->
        <button class="demo-box__action-btn" title="Edit in StackBlitz" @click="openInStackBlitz">
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path
              fill="currentColor"
              d="M10.797 14.182H3.635L16.728 0l-3.525 9.818h7.162L7.272 24l3.525-9.818z"
            />
          </svg>
        </button>

        <!-- 在 CodeSandbox 中打开 -->
        <button class="demo-box__action-btn" title="Edit in CodeSandbox" @click="openInCodeSandbox">
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path
              fill="currentColor"
              d="M2 6l10.455-6L22.91 6 22.9 18 12.455 24 2 18zm2.088 2.481v4.757l3.345 1.86v3.516l3.972 2.296v-8.272zm16.739 0l-7.317 4.157v8.272l3.972-2.296V15.1l3.345-1.861zM5.134 6.957l7.321 4.12 7.321-4.12-3.792-2.161-3.529 1.995-3.529-1.995z"
            />
          </svg>
        </button>

        <!-- 复制代码 -->
        <button
          class="demo-box__action-btn"
          :title="copied ? (isEn ? 'Copied!' : '已复制!') : isEn ? 'Copy Code' : '复制代码'"
          @click="copyCode"
        >
          <svg v-if="!copied" viewBox="0 0 24 24" width="16" height="16">
            <path
              fill="currentColor"
              d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
            />
          </svg>
          <svg v-else viewBox="0 0 24 24" width="16" height="16">
            <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        </button>

        <!-- 展开/收起代码 -->
        <button
          class="demo-box__action-btn"
          :title="
            showCode ? (isEn ? 'Collapse Code' : '收起代码') : isEn ? 'Expand Code' : '展开代码'
          "
          @click="toggleCode"
        >
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path
              fill="currentColor"
              d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- 代码区域 -->
    <Transition name="slide-fade">
      <div v-show="showCode" class="demo-box__code">
        <!-- TypeScript/JavaScript 切换 -->
        <div v-if="hasBothTypes" class="demo-box__code-tabs">
          <button
            :class="['demo-box__code-tab', { active: codeType === 'ts' }]"
            @click="switchCodeType('ts')"
          >
            TypeScript
          </button>
          <button
            :class="['demo-box__code-tab', { active: codeType === 'js' }]"
            @click="switchCodeType('js')"
          >
            JavaScript
          </button>
        </div>

        <!-- 代码内容（高亮显示） -->
        <div class="demo-box__code-content">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <pre><code class="language-vue" v-html="highlightedCode"></code></pre>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss">
.demo-box {
  margin: 16px 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  /* 移除 overflow: hidden 以允许弹窗溢出 */

  &__preview {
    padding: 24px;
    background: var(--vp-c-bg);
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
  }

  &__actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 16px;
    border-top: 1px solid var(--vp-c-divider);
    background: var(--vp-c-bg-soft);
    border-bottom-left-radius: 7px;
    border-bottom-right-radius: 7px;
    transition: border-radius 0.2s;

    &.is-open {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

  &__actions-left {
    display: flex;
    align-items: center;
  }

  &__actions-right {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  &__title {
    font-size: 14px;
    font-weight: 500;
    color: var(--vp-c-text-1);
  }

  &__action-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    padding: 0;
    border: none;
    border-radius: 4px;
    background: transparent;
    color: var(--vp-c-text-2);
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background: var(--vp-c-bg-mute);
      color: var(--vp-c-text-1);
    }

    svg {
      width: 16px;
      height: 16px;
    }
  }

  &__code {
    border-top: 1px solid var(--vp-c-divider);
    background: #1e1e1e;
    border-bottom-left-radius: 7px;
    border-bottom-right-radius: 7px;
  }

  &__code-tabs {
    display: flex;
    gap: 0;
    padding: 0 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    background: #252526;
  }

  &__code-tab {
    padding: 8px 16px;
    font-size: 13px;
    font-weight: 500;
    color: #888;
    background: transparent;
    border: none;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      color: #ccc;
    }

    &.active {
      color: #fff;
      border-bottom-color: #0078d4;
    }
  }

  &__code-content {
    padding: 16px;
    overflow-x: auto;

    pre {
      margin: 0;
      padding: 0;
      background: transparent;
    }

    code {
      font-family:
        'Fira Code', 'JetBrains Mono', 'Cascadia Code', Consolas, Monaco, 'Andale Mono', monospace;
      font-size: 13px;
      line-height: 1.6;
      white-space: pre;
      color: #d4d4d4;
    }

    /* VS Code Dark+ 风格语法高亮 */
    .token {
      &.comment {
        color: #6a9955;
        font-style: italic;
      }

      &.tag {
        color: #569cd6;
      }

      &.component {
        color: #4ec9b0;
      }

      &.attr-name {
        color: #9cdcfe;
      }

      &.attr-value {
        color: #ce9178;
      }

      &.string {
        color: #ce9178;
      }

      &.keyword {
        color: #c586c0;
      }

      &.function {
        color: #dcdcaa;
      }

      &.number {
        color: #b5cea8;
      }

      &.punctuation {
        color: #808080;
      }
    }
  }
}

/* 动画 */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  max-height: 0;
}

.slide-fade-enter-to,
.slide-fade-leave-from {
  opacity: 1;
  max-height: 800px;
}
</style>
