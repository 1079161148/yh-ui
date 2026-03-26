<script setup lang="ts">
import { useNamespace, useLocale } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'
import {
  computed,
  ref,
  onBeforeUnmount,
  watchEffect,
  shallowRef,
  watch,
  onMounted,
  nextTick
} from 'vue'
import {
  aiBubbleProps,
  type AiMarkdownOptions,
  type AiCodeBlockOptions,
  type AiStructuredTableData
} from './ai-bubble'
import { YhAvatar } from '../../avatar'
import { YhButton } from '../../button'
import { YhIcon } from '../../icon'
import { YhAiThoughtChain, type AiThoughtItem } from '../../ai-thought-chain'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

defineOptions({
  name: 'YhAiBubble'
})

const props = defineProps(aiBubbleProps)

const ns = useNamespace('ai-bubble')
const { t } = useLocale()

// 主题覆盖
const { themeStyle } = useComponentTheme(
  'ai-bubble',
  computed(() => props.themeOverrides)
)

// === Audio Playback Logic ===
const playingAsset = ref<string | null>(null)
let audioInstance: HTMLAudioElement | null = null

const handleAudioToggle = (url: string) => {
  if (playingAsset.value === url) {
    audioInstance?.pause()
    playingAsset.value = null
  } else {
    if (audioInstance) {
      audioInstance.pause()
    }
    playingAsset.value = url
    audioInstance = new Audio(url)
    audioInstance.play().catch((err) => {
      console.warn('Audio playback failed:', err)
      playingAsset.value = null
    })
    audioInstance.onended = () => {
      playingAsset.value = null
    }
  }
}

const handleDownload = (url: string) => {
  window.open(url, '_blank')
}

// === HTML Escape Utility ===
const escapeHtml = (str: string): string => {
  const htmlEntities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }
  return str.replace(/[&<>"']/g, (char) => htmlEntities[char])
}

const getFileIcon = (url: string = '') => {
  const ext = url.split('.').pop()?.toLowerCase() || ''
  switch (ext) {
    case 'pdf':
      return 'file-pdf'
    case 'xlsx':
    case 'xls':
    case 'csv':
      return 'file-excel'
    case 'doc':
    case 'docx':
      return 'file-word'
    case 'mp4':
    case 'webm':
    case 'mov':
      return 'file-video'
    case 'mp3':
    case 'wav':
    case 'ogg':
      return 'file-audio'
    case 'txt':
    case 'md':
      return 'file-txt'
    default:
      return 'document'
  }
}

// === Mermaid Rendering ===
const _mermaidContainer = ref<HTMLElement | null>(null)
const mermaidLoading = ref(false)
const mermaidError = ref<string | null>(null)
type MermaidModule = typeof import('mermaid')
let mermaidModule: MermaidModule | null = null

const initMermaid = async (): Promise<MermaidModule | null> => {
  if (mermaidModule) return mermaidModule
  try {
    mermaidModule = await import('mermaid')
    mermaidModule.default.initialize({
      startOnLoad: false,
      theme: 'default',
      securityLevel: 'loose',
      flowchart: { curve: 'basis', padding: 15 },
      sequence: { actorMargin: 50, boxMargin: 10 }
    })
    return mermaidModule
  } catch (e: unknown) {
    console.warn('Mermaid not available:', e)
    return null
  }
}

const _renderMermaid = async (code: string): Promise<string> => {
  if (!mermaidModule) {
    await initMermaid()
  }
  if (!mermaidModule) return `<pre class="mermaid-error">${code}</pre>`

  mermaidLoading.value = true
  mermaidError.value = null

  try {
    const id = `mermaid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const { svg } = await mermaidModule.default.render(id, code)
    mermaidLoading.value = false
    return svg
  } catch (e: unknown) {
    mermaidLoading.value = false
    mermaidError.value = e instanceof Error ? e.message : 'Failed to render mermaid diagram'
    return `<pre class="mermaid-error">${code}</pre>`
  }
}

// === Code Block Enhanced ===
const expandedCodeBlocks = ref<Set<string>>(new Set())
const copiedCodeBlocks = ref<Set<string>>(new Set())
const editingCodeBlock = ref<string | null>(null)
const editCodeContent = ref('')
const runningCodeBlock = ref<string | null>(null)
const codeOutput = ref<Record<string, string[]>>({})

// Monaco Editor & WebContainer
type MonacoModule = typeof import('monaco-editor')
let webContainerInstance: import('@webcontainer/api').WebContainer | null = null

const monaco = shallowRef<MonacoModule | null>(null)
const monacoEditor = shallowRef<import('monaco-editor').editor.IStandaloneCodeEditor | null>(null)
const monacoContainer = ref<HTMLElement | null>(null)

const loadMonaco = async (): Promise<MonacoModule | null> => {
  if (monaco.value) return monaco.value
  try {
    const m = await import('monaco-editor')
    monaco.value = m
    return m
  } catch (e) {
    console.warn('Monaco editor failed to load:', e)
    return null
  }
}

const isWebContainerSupported = (): boolean => {
  if (typeof window === 'undefined') return false

  const isSecure = window.isSecureContext
  const hasSharedArrayBuffer = typeof SharedArrayBuffer !== 'undefined'
  const isCrossOriginIsolated = (window as unknown as { crossOriginIsolated?: boolean })
    .crossOriginIsolated

  if (!isSecure || !hasSharedArrayBuffer || !isCrossOriginIsolated) {
    console.warn(
      '[YhAiBubble] WebContainer requires secure context, SharedArrayBuffer and crossOriginIsolated. Falling back to browser runtime.'
    )
    return false
  }

  return true
}

const initWebContainer = async () => {
  if (webContainerInstance) return webContainerInstance

  // 当前环境明显不支持 WebContainer 时，直接返回 null，避免 DataCloneError 等报错
  if (!isWebContainerSupported()) {
    return null
  }

  try {
    const { WebContainer } = await import('@webcontainer/api')
    webContainerInstance = await WebContainer.boot()
    return webContainerInstance
  } catch (e) {
    console.warn('WebContainer not available, fallback to browser runtime:', e)
    return null
  }
}

const getCodeBlockId = (code: string, lang: string): string => {
  const key = (code || '').slice(0, 50) + (lang || '')
  // 使用简单哈希避免 btoa 在非 Latin 字符集下抛错
  let hash = 0
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0
  }
  return `cb-${hash.toString(16)}`
}

const toggleCodeBlock = (id: string) => {
  if (expandedCodeBlocks.value.has(id)) {
    expandedCodeBlocks.value.delete(id)
  } else {
    expandedCodeBlocks.value.add(id)
  }
}

const copyCode = async (code: string, id: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(code)
    copiedCodeBlocks.value.add(id)
    setTimeout(() => copiedCodeBlocks.value.delete(id), 2000)
  } catch (e) {
    console.error('Copy failed:', e)
  }
}

const _editCode = (code: string, id: string): void => {
  editingCodeBlock.value = id
  editCodeContent.value = code
}

const openCodeEditor = async (code: string, id: string, lang: string): Promise<void> => {
  editingCodeBlock.value = id
  editCodeContent.value = code

  await nextTick()

  const container = monacoContainer.value
  const m = await loadMonaco()
  if (!container || !m) return

  if (monacoEditor.value) {
    monacoEditor.value.dispose()
    monacoEditor.value = null
  }

  monacoEditor.value = m.editor.create(container, {
    value: code,
    language: lang || 'typescript',
    automaticLayout: true,
    minimap: { enabled: false },
    fontSize: 13,
    theme: 'vs-dark'
  })
}

const saveEditCode = async (id: string): Promise<void> => {
  // 同步 Monaco 内容
  if (monacoEditor.value) {
    editCodeContent.value = monacoEditor.value.getValue()
  }
  // 将当前编辑内容复制到剪贴板，方便在外部粘贴/复用
  try {
    await navigator.clipboard.writeText(editCodeContent.value)
    copiedCodeBlocks.value.add(id)
    setTimeout(() => copiedCodeBlocks.value.delete(id), 2000)
  } catch (e) {
    console.error('Copy edited code failed:', e)
  }

  editingCodeBlock.value = null
  editCodeContent.value = ''
}

const cancelEditCode = (): void => {
  editingCodeBlock.value = null
  editCodeContent.value = ''

  if (monacoEditor.value) {
    monacoEditor.value.dispose()
    monacoEditor.value = null
  }
}

const runCodeInBrowser = (code: string, id: string) => {
  // 初始化流式输出数组
  codeOutput.value[id] = []
  codeOutput.value[id]!.push('> Running...\n')

  try {
    const logs: string[] = []
    const _customConsole = {
      log: (...args: unknown[]) => logs.push(args.map(String).join(' ')),
      error: (...args: unknown[]) => logs.push('Error: ' + args.map(String).join(' ')),
      warn: (...args: unknown[]) => logs.push('Warn: ' + args.map(String).join(' '))
    }

    // 劫持 console 方法实现流式输出
    const _originalConsole = { ...console }
    const streamLog = (type: 'log' | 'error' | 'warn', ...args: unknown[]) => {
      const line = args.map(String).join(' ')
      const prefix = type === 'error' ? 'Error: ' : type === 'warn' ? 'Warn: ' : ''
      codeOutput.value[id]!.push(prefix + line)
    }

    // 创建可流式输出的 console
    const streamConsole = {
      log: (...args: unknown[]) => streamLog('log', ...args),
      error: (...args: unknown[]) => streamLog('error', ...args),
      warn: (...args: unknown[]) => streamLog('warn', ...args),
      info: (...args: unknown[]) => streamLog('log', ...args),
      debug: (...args: unknown[]) => streamLog('log', ...args)
    }

    // 使用 setTimeout 分割执行，实现流式效果
    const fn = new Function(
      'console',
      `
      return (function() {
        ${code}
      })()
    `
    )

    const result = fn(streamConsole)

    // 如果有返回值，也输出
    if (result !== undefined) {
      codeOutput.value[id]!.push(`← ${String(result)}`)
    }

    if (logs.length === 0) {
      codeOutput.value[id]!.push('\n✓ Executed successfully (no output)')
    } else {
      // 逐行添加日志，实现流式效果
      logs.forEach((log, index) => {
        setTimeout(() => {
          if (codeOutput.value[id]) {
            codeOutput.value[id]!.push(log)
          }
        }, index * 50)
      })
    }
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e)
    codeOutput.value[id]!.push(`\n✗ Error: ${message}`)
  }
}

const runPythonInBrowser = async (code: string, id: string) => {
  codeOutput.value[id]!.push('> Initializing Pyodide (Python in browser)...')
  try {
    // 动态加载 Pyodide
    const win = window as unknown as {
      loadPyodide?: (config: { indexURL: string }) => Promise<{
        setStdout: (config: { batched: (text: string) => void }) => void
        runPythonAsync: (code: string) => Promise<unknown>
      }>
    }
    if (!win.loadPyodide) {
      await import(/* @vite-ignore */ props.pyodideUrl)
    }

    if (!win.loadPyodide) {
      throw new Error('Pyodide failed to load.')
    }

    const pyodide = await win.loadPyodide({
      indexURL: props.pyodideUrl.substring(0, props.pyodideUrl.lastIndexOf('/'))
    })
    codeOutput.value[id]!.push('> Running Python code...\n')

    // 重定向 stdout
    pyodide.setStdout({
      batched: (text: string) => {
        if (codeOutput.value[id]) {
          codeOutput.value[id]!.push(text)
        }
      }
    })

    const result = await pyodide.runPythonAsync(code)
    if (result !== undefined && result !== null) {
      codeOutput.value[id]!.push(`\nResult: ${result}`)
    }
    codeOutput.value[id]!.push('\n✓ Python execution complete')
  } catch (e: unknown) {
    const error = e instanceof Error ? e.message : String(e)
    codeOutput.value[id]!.push(`\nError: ${error}`)
  }
}

const runPythonRemote = async (code: string, id: string) => {
  codeOutput.value[id]!.push(`> Running Python via remote API: ${props.pythonApiUrl}...`)
  try {
    const response = await fetch(props.pythonApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, language: 'python' })
    })
    const result = (await response.json()) as { output?: string; error?: string }
    if (result.output) {
      codeOutput.value[id]!.push(`\n${result.output}`)
    }
    if (result.error) {
      codeOutput.value[id]!.push(`\nError: ${result.error}`)
    }
    codeOutput.value[id]!.push('\n✓ Remote Python execution complete')
  } catch (e: unknown) {
    const error = e instanceof Error ? e.message : String(e)
    codeOutput.value[id]!.push(`\nRemote Error: ${error}`)
  }
}

const runCode = async (code: string, lang: string, id: string): Promise<void> => {
  runningCodeBlock.value = id
  // 初始化流式输出数组
  codeOutput.value[id] = []

  if (props.onRunCode) {
    // 支持流式输出的自定义运行函数
    try {
      codeOutput.value[id]!.push('> Running...\n')
      const result = await props.onRunCode(code, lang)

      // 如果返回的是可迭代对象（流式），逐个处理
      if (result && Symbol.asyncIterator in (result as object)) {
        const asyncResult = result as unknown as AsyncIterable<{ output?: string; error?: string }>
        for await (const chunk of asyncResult) {
          codeOutput.value[id]!.push(chunk.output || chunk.error || '')
        }
      } else {
        // 一次性结果
        const finalResult = result as { output: string; error?: string }
        codeOutput.value[id] = finalResult.output
          ? finalResult.output.split('\n')
          : finalResult.error
            ? [`Error: ${finalResult.error}`]
            : []
      }
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e)
      codeOutput.value[id]!.push(`Error: ${message}`)
    }
  } else if (lang === 'javascript' || lang === 'js') {
    // 优先使用 WebContainer 沙箱运行
    const mdOptions = getMarkdownOptions()
    const runtime = (mdOptions.codeBlock as AiCodeBlockOptions | undefined)?.runtime || 'browser'

    if (runtime === 'webcontainer') {
      try {
        const wc = await initWebContainer()

        // 如果当前环境不支持 WebContainer，则自动降级为浏览器运行
        if (!wc) {
          runCodeInBrowser(code, id)
        } else {
          codeOutput.value[id]!.push('> Running in WebContainer...\n')

          await wc.mount({
            'index.js': {
              file: {
                contents: code
              }
            }
          })

          const process = await wc.spawn('node', ['index.js'])
          const reader = process.output.getReader()
          const decoder = new TextDecoder()

          // 真正的流式输出：逐块读取并实时更新 UI
          while (true) {
            const { done, value } = await reader.read()
            if (done) break
            const chunk = decoder.decode(value as unknown as Uint8Array, { stream: true })
            if (chunk) {
              // 按行分割，实现逐行流式输出
              const lines = chunk.split('\n')
              lines.forEach((line, index) => {
                if (line || index < lines.length - 1) {
                  setTimeout(() => {
                    if (codeOutput.value[id]) {
                      codeOutput.value[id]!.push(line)
                    }
                  }, index * 30)
                }
              })
            }
          }

          codeOutput.value[id]!.push('\n✓ WebContainer execution complete')
        }
      } catch (e: unknown) {
        // WebContainer 环境异常时，降级为浏览器内联执行，而不是直接报错
        console.warn('WebContainer execution failed, fallback to browser runtime:', e)
        codeOutput.value[id]!.push('\n⚠ WebContainer not supported, falling back to browser...')
        runCodeInBrowser(code, id)
      }
    } else {
      // 浏览器内联执行（原有逻辑）
      runCodeInBrowser(code, id)
    }
  } else if (lang === 'python' || lang === 'py') {
    if (props.enablePythonRuntime) {
      if (props.pythonRuntime === 'remote' && props.pythonApiUrl) {
        runPythonRemote(code, id)
      } else {
        runPythonInBrowser(code, id)
      }
    } else {
      codeOutput.value[id]!.push(
        'Python runtime is disabled. Please enable "enable-python-runtime" prop.'
      )
    }
  } else {
    codeOutput.value[id]!.push(`Language "${lang}" execution not supported in browser`)
  }

  // 运行完成后，强制重新渲染一次 Markdown，这样代码输出区域会立即更新
  // 对于流式输出，需要持续触发渲染
  const triggerRender = () => {
    if (props.markdown && mdi.value && props.content) {
      parsedContent.value = mdi.value.render(props.content)
    }
  }

  triggerRender()

  // 定期触发渲染以支持流式输出显示
  const renderInterval = setInterval(triggerRender, 100)

  // 等待一段时间后停止定期渲染
  setTimeout(() => {
    clearInterval(renderInterval)
    triggerRender()
    runningCodeBlock.value = null
  }, 5000) // 5秒后确保渲染完成
}

const explainCode = async (code: string, lang: string): Promise<string> => {
  if (props.onExplainCode) {
    return await props.onExplainCode(code, lang)
  }
  return ''
}

// === 流式代码块渲染 ===
// Markdown 渲染后的 HTML 内容（用于打字机 / 流式渲染）
const parsedContent = ref(props.content)
let renderRafId: number | null = null
let streamTimer: ReturnType<typeof setInterval> | null = null
let streamPosition = 0
let streamBuffer = ''

// 用于跟踪流式渲染中的代码块
const streamingCodeBlocks = ref<Set<string>>(new Set())

// 代码块逐行动画 CSS 注入
const injectCodeStreamStyles = () => {
  if (typeof document === 'undefined') return

  const styleId = 'yh-ai-code-stream-styles'
  if (document.getElementById(styleId)) return

  const style = document.createElement('style')
  style.id = styleId
  style.textContent = `
    .code-block-wrapper.streaming .code-block-body code {
      display: block;
    }
    .code-block-wrapper.streaming .code-block-body code .line {
      display: block;
      opacity: 0;
      animation: code-line-fade-in 0.15s ease forwards;
    }
    .code-block-wrapper.streaming .code-block-body code .line:last-child {
      animation: none;
    }
    @keyframes code-line-fade-in {
      from { opacity: 0; transform: translateX(-8px); }
      to { opacity: 1; transform: translateX(0); }
    }
    /* 光标闪烁效果 */
    .code-block-wrapper.streaming .code-block-body code .line:last-child::after {
      content: '▋';
      animation: cursor-blink 0.8s infinite;
      margin-left: 2px;
      color: var(--yh-color-primary, #409eff);
    }
    @keyframes cursor-blink {
      0%, 50% { opacity: 1; }
      51%, 100% { opacity: 0; }
    }
  `
  document.head.appendChild(style)
}

// 为代码块添加逐行标记（用于流式渲染）
const _markCodeLinesForStreaming = (codeBlockId: string) => {
  streamingCodeBlocks.value.add(codeBlockId)
  injectCodeStreamStyles()
}

// 监听流式渲染，当检测到代码块时添加动画
watch(
  () => parsedContent.value,
  (_newContent) => {
    if (props.streaming && props.typing) {
      // 延迟查找并标记代码块
      setTimeout(() => {
        const codeBlocks = document.querySelectorAll('.code-block-wrapper')
        codeBlocks.forEach((block) => {
          const id = block.getAttribute('data-id')
          if (id && !streamingCodeBlocks.value.has(id)) {
            const code = block.querySelector('code')
            if (code) {
              // 为每一行添加 span 包装
              const html = code.innerHTML
              const lines = html.split('\n')
              code.innerHTML = lines
                .map(
                  (line: string, i: number) =>
                    `<span class="line" style="animation-delay: ${i * 30}ms">${line}</span>`
                )
                .join('\n')
              block.classList.add('streaming')
              streamingCodeBlocks.value.add(id)
            }
          }
        })
      }, 100)
    }
  }
)

// === LaTeX Support ===
const _renderLatex = (text: string): string => {
  // Block math: $$...$$
  text = text.replace(/\$\$([\s\S]+?)\$\$/g, (_, math) => {
    return `<div class="latex-block" data-latex="${encodeURIComponent(math.trim())}">${math.trim()}</div>`
  })
  // Inline math: $...$
  text = text.replace(/\$([^\$\n]+?)\$/g, (_, math) => {
    return `<span class="latex-inline" data-latex="${encodeURIComponent(math.trim())}">${math.trim()}</span>`
  })
  return text
}

// === Structured Data Rendering ===
const _structuredDataRef = ref<HTMLElement | null>(null)

const _renderStructuredData = computed(() => {
  if (!props.structuredData) return null

  const { type, data, options } = props.structuredData

  switch (type) {
    case 'json':
      return { type: 'json', data, options }
    case 'table':
      return { type: 'table', data, options }
    case 'chart':
      return { type: 'chart', data, options }
    case 'mindmap':
      return { type: 'mindmap', data, options }
    case 'thought-chain':
      return { type: 'thought-chain', data, options }
    default:
      return null
  }
})

// Pretty JSON with highlight.js
const jsonHtml = computed(() => {
  if (!props.structuredData || props.structuredData.type !== 'json') return ''
  try {
    const rawData = props.structuredData.data as unknown
    const jsonString = typeof rawData === 'string' ? rawData : JSON.stringify(rawData, null, 2)

    if (hljs.getLanguage('json')) {
      return hljs.highlight(jsonString, {
        language: 'json',
        ignoreIllegals: true
      }).value
    }

    return jsonString
  } catch (e) {
    console.warn('Failed to render JSON structured data:', e)
    return ''
  }
})

// === Citation Enhancement ===
const hoveredCitation = ref<import('./ai-bubble').AiCitation | null>(null)
const citationTooltipStyle = ref({
  top: '0px',
  left: '0px',
  position: 'fixed' as const,
  transform: '',
  zIndex: '9999'
})
let citationHoverTimer: ReturnType<typeof setTimeout> | null = null

const handleCitationHover = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (target && target.classList && target.classList.contains('yh-ai-citation')) {
    const id = target.getAttribute('data-id')
    const citation = props.citations?.find(
      (c: import('./ai-bubble').AiCitation) => String(c.id) === id
    )
    if (citation) {
      if (citationHoverTimer) clearTimeout(citationHoverTimer)
      hoveredCitation.value = citation

      const rect = target.getBoundingClientRect()
      citationTooltipStyle.value = {
        top: `${rect.top - 10}px`,
        left: `${rect.left + rect.width / 2}px`,
        transform: 'translate(-50%, -100%)',
        position: 'fixed',
        zIndex: '9999'
      }
    }
  }
}

const handleCitationLeave = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (target && target.classList && target.classList.contains('yh-ai-citation')) {
    citationHoverTimer = setTimeout(() => {
      hoveredCitation.value = null
    }, 200)
  }
}

const handleCitationClick = (citation: import('./ai-bubble').AiCitation) => {
  if (props.onCitationClick) {
    props.onCitationClick(citation)
  } else if (citation.url) {
    window.open(citation.url, '_blank')
  }
}

const handleTooltipEnter = () => {
  if (citationHoverTimer) clearTimeout(citationHoverTimer)
}

const handleTooltipLeave = () => {
  citationHoverTimer = setTimeout(() => {
    hoveredCitation.value = null
  }, 200)
}

// === Markdown Configuration ===
const getMarkdownOptions = (): AiMarkdownOptions => {
  return {
    mermaid: true,
    latex: true,
    filePreview: true,
    linkify: true,
    typographer: true,
    ...props.markdownOptions,
    codeBlock: {
      copyable: true,
      languageTag: true,
      lineNumbers: false,
      editable: false,
      runnable: true,
      explainable: true,
      collapsible: true,
      collapseLinesThreshold: 10,
      ...(props.markdownOptions?.codeBlock || {})
    }
  }
}

const getMarkdownInstance = () => {
  const mdOptions = getMarkdownOptions()

  const md = new MarkdownIt({
    html: mdOptions.html ?? false,
    linkify: mdOptions.linkify ?? true,
    typographer: mdOptions.typographer ?? true,
    highlight: function (str: string, lang: string) {
      const codeBlockId = getCodeBlockId(str, lang)
      const codeBlockOptions = mdOptions.codeBlock as AiCodeBlockOptions

      let result = ''

      // Map unsupported languages to closest available ones
      const hlLang = lang === 'vue' ? 'xml' : lang

      if (hlLang && hljs.getLanguage(hlLang)) {
        try {
          result = hljs.highlight(str, { language: hlLang, ignoreIllegals: true }).value
        } catch {}
      } else {
        result = md.utils.escapeHtml(str)
      }

      // Wrap with line numbers if enabled
      if (codeBlockOptions?.lineNumbers) {
        const lines = result.split('\n')
        const numberedLines = lines
          .map((line, i) => `<span class="line-number">${i + 1}</span>${line}`)
          .join('\n')
        result = numberedLines
      }

      // Add collapsible wrapper
      const lineCount = str.split('\n').length
      const shouldCollapse =
        codeBlockOptions?.collapsible &&
        lineCount > (codeBlockOptions?.collapseLinesThreshold ?? 10)
      const isExpanded = expandedCodeBlocks.value.has(codeBlockId)

      let wrapperStart = `<div class="code-block-wrapper" data-lang="${lang}" data-id="${codeBlockId}">`

      // Header with actions
      wrapperStart += `<div class="code-block-header">`
      if (codeBlockOptions?.languageTag) {
        wrapperStart += `<span class="code-lang">${lang || 'text'}</span>`
      }
      wrapperStart += `<div class="code-actions">`

      // Copy button
      if (codeBlockOptions?.copyable) {
        const copyText = copiedCodeBlocks.value.has(codeBlockId) ? 'Copied!' : 'Copy'
        wrapperStart += `<button class="code-action-btn copy-btn" data-code="${encodeURIComponent(str)}" data-id="${codeBlockId}">${copyText}</button>`
      }

      // Edit button
      if (codeBlockOptions?.editable) {
        wrapperStart += `<button class="code-action-btn edit-btn" data-id="${codeBlockId}">Edit</button>`
      }

      // Run button
      const isRunnableLang =
        ['javascript', 'js'].includes(lang) ||
        (props.enablePythonRuntime && ['python', 'py'].includes(lang))

      if (codeBlockOptions?.runnable && isRunnableLang) {
        wrapperStart += `<button class="code-action-btn run-btn" data-code="${encodeURIComponent(str)}" data-lang="${lang}" data-id="${codeBlockId}">Run</button>`
      }

      // Explain button
      if (codeBlockOptions?.explainable) {
        wrapperStart += `<button class="code-action-btn explain-btn" data-code="${encodeURIComponent(str)}" data-lang="${lang}" data-id="${codeBlockId}">Explain</button>`
      }

      // Collapse toggle
      if (shouldCollapse) {
        wrapperStart += `<button class="code-action-btn collapse-btn" data-id="${codeBlockId}">${isExpanded ? 'Collapse' : 'Expand'}</button>`
      }

      wrapperStart += `</div></div>`

      // Body with code
      const _bodyClass = shouldCollapse
        ? isExpanded
          ? 'code-block-body expanded'
          : 'code-block-body collapsed'
        : 'code-block-body'
      let wrapperEnd = `</div>`

      // Code output - 支持流式数组输出
      if (codeOutput.value[codeBlockId]) {
        const outputLines = codeOutput.value[codeBlockId]
        const outputHtml = Array.isArray(outputLines)
          ? outputLines
              .map((line) => {
                // 处理特殊前缀
                if (line.startsWith('> '))
                  return `<span class="output-prefix">${escapeHtml(line)}</span>`
                if (line.startsWith('← '))
                  return `<span class="output-return">${escapeHtml(line)}</span>`
                if (line.startsWith('✓'))
                  return `<span class="output-success">${escapeHtml(line)}</span>`
                if (line.startsWith('✗'))
                  return `<span class="output-error">${escapeHtml(line)}</span>`
                if (line.startsWith('⚠'))
                  return `<span class="output-warning">${escapeHtml(line)}</span>`
                if (line.startsWith('Error:'))
                  return `<span class="output-error">${escapeHtml(line)}</span>`
                return escapeHtml(line)
              })
              .join('\n')
          : escapeHtml(outputLines)
        wrapperEnd += `<div class="code-output"><pre>${outputHtml}</pre></div>`
      }

      wrapperEnd += `</div>`

      return (
        wrapperStart + `<pre class="hljs ${lang || ''}"><code>${result}</code></pre>` + wrapperEnd
      )
    }
  })

  // Mermaid block: ```mermaid
  md.block.ruler.before('code', 'mermaid', (state, silent) => {
    const start = state.bMarks[state.line]
    const max = state.eMarks[state.line]
    const line = state.src.slice(start, max)
    if (!line.trim().startsWith('```mermaid')) return false

    if (!silent) {
      state.line++
      const lines: string[] = []
      while (state.line < state.lineMax) {
        const lineContent = state.src.slice(state.bMarks[state.line], state.eMarks[state.line])
        if (lineContent.trim().startsWith('```')) break
        lines.push(lineContent)
        state.line++
      }

      let token = state.push('mermaid_open', 'div', 1)
      token.attrSet('class', 'mermaid-block')

      token = state.push('mermaid_code', '', 0)
      token.content = lines.join('\n')

      token = state.push('mermaid_close', 'div', -1)
    }
    return true
  })

  // Custom renderer for mermaid
  // Custom renderer for mermaid - 必须同步
  md.renderer.rules.mermaid_open = () => '<div class="mermaid-block">'
  md.renderer.rules.mermaid_code = (tokens, idx) => {
    const code = tokens[idx].content
    return `<pre class="mermaid">${md.utils.escapeHtml(code)}</pre>`
  }
  md.renderer.rules.mermaid_close = () => '</div>'

  // 自研引用脚注拦截器插件
  md.inline.ruler.after('text', 'citation', (state, silent) => {
    const start = state.pos
    if (state.src.charCodeAt(start) !== 0x5b /* [ */) return false

    const match = state.src.slice(start).match(/^\[(\d+)\]/)
    if (!match) return false

    if (!silent) {
      const id = match[1]
      let token = state.push('citation_open', 'sup', 1)
      token.attrs = [
        ['class', 'yh-ai-citation'],
        ['data-id', id]
      ]

      token = state.push('text', '', 0)
      token.content = id

      state.push('citation_close', 'sup', -1)
    }

    state.pos += match[0].length
    return true
  })

  return md
}

const mdi = shallowRef<MarkdownIt | null>(null)

watchEffect(() => {
  if (props.markdown && !mdi.value) {
    mdi.value = getMarkdownInstance()
  }
})

onBeforeUnmount(() => {
  if (audioInstance) {
    audioInstance.pause()
    audioInstance = null
  }
  if (streamTimer) {
    clearInterval(streamTimer)
    streamTimer = null
  }
  if (monacoEditor.value) {
    monacoEditor.value.dispose()
    monacoEditor.value = null
  }
  mdi.value = null
})

// 流式增量渲染逻辑
const streamRender = (
  fullContent: string,
  mode: 'word' | 'sentence' | 'paragraph',
  speed: number,
  interval: number
) => {
  if (!fullContent) {
    parsedContent.value = ''
    return
  }

  // 清理之前的流式渲染
  if (streamTimer) {
    clearInterval(streamTimer)
    streamTimer = null
  }

  streamPosition = 0
  streamBuffer = ''

  // 根据模式分段
  const getChunks = (): string[] => {
    if (mode === 'paragraph') {
      // 按段落分割（双换行或空行）
      return fullContent.split(/(?:\r?\n){2,}/)
    } else if (mode === 'sentence') {
      // 按句子分割（句号、问号、感叹号 + 空格）
      return fullContent.split(/(?<=[.!?。！？])\s+/)
    } else {
      // word 模式：每次取 speed 个字符
      const chunks: string[] = []
      for (let i = 0; i < fullContent.length; i += speed) {
        chunks.push(fullContent.slice(i, i + speed))
      }
      return chunks
    }
  }

  const chunks = getChunks()

  streamTimer = setInterval(() => {
    if (streamPosition < chunks.length) {
      streamBuffer += chunks[streamPosition]
      streamPosition++

      // 对 buffer 进行 Markdown 渲染
      parsedContent.value =
        props.markdown && mdi.value ? mdi.value.render(streamBuffer) : streamBuffer
    } else {
      // 流式渲染完成
      if (streamTimer) {
        clearInterval(streamTimer)
        streamTimer = null
      }
      // 确保最终内容完整渲染
      parsedContent.value =
        props.markdown && mdi.value ? mdi.value.render(fullContent) : fullContent
      // 触发完成回调
      if (props.onStreamComplete) {
        props.onStreamComplete()
      }
    }
  }, interval)
}

watch(
  () => props.content,
  (newContent: string) => {
    // 清理任何正在进行的流式渲染
    if (streamTimer) {
      clearInterval(streamTimer)
      streamTimer = null
    }

    if (!props.markdown || !props.typing) {
      if (renderRafId && typeof cancelAnimationFrame !== 'undefined') {
        cancelAnimationFrame(renderRafId)
        renderRafId = null
      }
      parsedContent.value =
        props.markdown && mdi.value ? mdi.value.render(newContent || '') : newContent
      return
    }

    // 如果启用流式渲染
    if (props.streaming && props.typing) {
      streamRender(newContent, props.streamMode, props.streamSpeed, props.streamInterval)
      return
    }

    if (typeof requestAnimationFrame === 'undefined') {
      parsedContent.value = mdi.value ? mdi.value.render(newContent || '') : newContent
      return
    }

    if (renderRafId) return
    renderRafId = requestAnimationFrame(() => {
      parsedContent.value = mdi.value ? mdi.value.render(newContent || '') : newContent
      renderRafId = null
    })
  },
  { immediate: true }
)

const computedPlacement = computed(() => {
  if (props.placement) return props.placement
  return props.role === 'user' ? 'end' : 'start'
})

const classes = computed(() => [
  ns.b(),
  ns.m(props.role),
  ns.m(`placement-${computedPlacement.value}`),
  ns.m(`shape-${props.shape}`),
  ns.m(`variant-${props.variant}`),
  ns.is('loading', props.loading),
  ns.is('typing', props.typing)
])

// === Code Block Event Handling ===
const handleCodeBlockAction = async (e: Event) => {
  const target = e.target as HTMLElement
  if (!target.classList.contains('code-action-btn')) return

  const code = decodeURIComponent(target.getAttribute('data-code') || '')
  const lang = target.getAttribute('data-lang') || ''
  const id = target.getAttribute('data-id') || ''

  if (target.classList.contains('copy-btn')) {
    await copyCode(code, id)
  } else if (target.classList.contains('edit-btn')) {
    await openCodeEditor(code, id, lang)
  } else if (target.classList.contains('run-btn')) {
    await runCode(code, lang, id)
  } else if (target.classList.contains('explain-btn')) {
    const explanation = await explainCode(code, lang)
    if (explanation) {
      // 保持流式输出格式
      codeOutput.value[id] = explanation.split('\n')
    }
  } else if (target.classList.contains('collapse-btn')) {
    toggleCodeBlock(id)
  }
}

// Mount event listeners for code blocks
onMounted(() => {
  document.addEventListener('click', handleCodeBlockAction)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleCodeBlockAction)
})
</script>

<template>
  <div :class="classes" :style="themeStyle">
    <!-- Avatar -->
    <div :class="ns.e('avatar')" v-if="role !== 'system'">
      <slot name="avatar">
        <YhAvatar v-if="avatar" :src="avatar" crossorigin="anonymous" />
        <YhAvatar v-else>
          <YhIcon :name="role === 'user' ? 'user' : 'robot'" />
        </YhAvatar>
      </slot>
    </div>

    <!-- Content Wrapper -->
    <div :class="ns.e('content-wrapper')">
      <!-- Header -->
      <div :class="ns.e('header')" v-if="$slots.header || time">
        <slot name="header">
          <span v-if="time" :class="ns.e('time')">{{ time }}</span>
        </slot>
      </div>

      <!-- Body -->
      <div :class="[ns.e('body'), ns.is('typing', loading)]">
        <template v-if="loading && !content">
          <span :class="ns.e('typing-indicator')"> <span></span><span></span><span></span> </span>
        </template>
        <template v-else>
          <!-- Multimodal: Images (Above text) -->
          <div
            v-if="multimodal && multimodal.some((m) => m.type === 'image')"
            :class="ns.e('image-grid')"
          >
            <div
              v-for="(img, idx) in multimodal.filter((m) => m.type === 'image')"
              :key="idx"
              :class="ns.e('image-item')"
            >
              <img :src="img.url" :alt="img.title" loading="lazy" crossorigin="anonymous" />
            </div>
          </div>

          <slot>
            <!-- eslint-disable vue/no-v-html -->
            <div
              v-if="markdown"
              :class="[ns.e('text'), ns.e('markdown')]"
              v-html="parsedContent"
              @mouseover="handleCitationHover"
              @mouseout="handleCitationLeave"
            ></div>
            <!-- eslint-enable vue/no-v-html -->
            <div v-else :class="ns.e('text')">{{ content }}</div>
          </slot>

          <!-- Structured Data Display (Below main text) -->
          <div v-if="structuredData" :class="ns.e('structured-data')">
            <!-- JSON pretty view -->
            <!-- eslint-disable vue/no-v-html -->
            <div v-if="structuredData.type === 'json'" :class="[ns.e('json-viewer')]">
              <pre class="hljs json"><code v-html="jsonHtml" /></pre>
            </div>
            <!-- eslint-enable vue/no-v-html -->

            <!-- Table view -->
            <div v-else-if="structuredData.type === 'table'" :class="[ns.e('table-viewer')]">
              <table>
                <thead>
                  <tr
                    v-if="
                      structuredData.data && (structuredData.data as AiStructuredTableData).headers
                    "
                  >
                    <th
                      v-for="h in (structuredData.data as AiStructuredTableData).headers"
                      :key="h"
                    >
                      {{ h }}
                    </th>
                  </tr>
                </thead>
                <tbody v-if="structuredData.data && typeof structuredData.data === 'object'">
                  <tr
                    v-for="(row, idx) in (structuredData.data as AiStructuredTableData).rows"
                    :key="idx"
                  >
                    <td v-for="(cell, cIdx) in row" :key="cIdx">{{ cell }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Thought chain: delegate to AiThoughtChain for consistent style -->
            <YhAiThoughtChain
              v-else-if="structuredData.type === 'thought-chain' && structuredData.data"
              :items="structuredData.data as AiThoughtItem[]"
              :title="content || undefined"
              status="none"
              dot-size="small"
              :auto-collapse="false"
              line-gradient
            />

            <!-- Fallback: raw JSON -->
            <div v-else :class="[ns.e('chart-viewer')]">
              <pre>{{ JSON.stringify(structuredData.data, null, 2) }}</pre>
            </div>
          </div>

          <!-- Multimodal: Audio/Files (Below text) -->
          <div
            v-if="multimodal && multimodal.some((m) => m.type !== 'image')"
            :class="ns.e('multimodal-assets')"
          >
            <template v-for="(asset, idx) in multimodal" :key="idx">
              <!-- Audio Player -->
              <div
                v-if="asset.type === 'audio'"
                :class="[ns.e('audio-player'), { 'is-active': playingAsset === asset.url }]"
              >
                <YhButton
                  circle
                  size="small"
                  :type="role === 'user' ? 'default' : 'primary'"
                  @click="handleAudioToggle(asset.url)"
                >
                  <template #icon>
                    <YhIcon :name="playingAsset === asset.url ? 'video-pause' : 'video-play'" />
                  </template>
                </YhButton>
                <div :class="[ns.e('audio-waveform'), { 'is-active': playingAsset === asset.url }]">
                  <span v-for="i in 12" :key="i" :style="{ '--delay': i * 0.1 + 's' }"></span>
                </div>
                <span :class="ns.e('audio-duration')">{{ asset.extra?.duration || '0:00' }}</span>
              </div>

              <!-- File/Table Card -->
              <div v-else-if="asset.type === 'file'" :class="ns.e('file-card')">
                <div :class="ns.e('file-icon')">
                  <YhIcon :name="getFileIcon(asset.url)" />
                </div>
                <div :class="ns.e('file-info')">
                  <div :class="ns.e('file-name')">{{ asset.title }}</div>
                  <div :class="ns.e('file-meta')">{{ asset.size }}</div>
                </div>
                <YhButton text circle @click="handleDownload(asset.url)">
                  <template #icon>
                    <YhIcon name="download" />
                  </template>
                </YhButton>
              </div>
            </template>
          </div>

          <!-- Citations -->
          <div v-if="citations && citations.length > 0" :class="ns.e('citations')">
            <div :class="ns.e('citations-title')">
              <YhIcon name="document" />
              <span>{{ t('ai.bubble.citations') }}</span>
              <span :class="ns.e('citations-count')">{{ citations.length }}</span>
            </div>
            <div :class="ns.e('citations-list')">
              <a
                v-for="(cite, index) in citations"
                :key="index"
                :href="cite.url"
                target="_blank"
                :class="ns.e('citation-item')"
                :title="cite.title"
                @click.prevent="handleCitationClick(cite)"
              >
                <span :class="ns.e('citation-index')">{{ cite.id || index + 1 }}</span>
                <span :class="ns.e('citation-text')">{{ cite.title }}</span>
                <YhIcon v-if="cite.url" name="arrow-right" :class="ns.e('citation-link-icon')" />
              </a>
            </div>
          </div>
        </template>
      </div>

      <!-- Footer -->
      <div :class="ns.e('footer')" v-if="$slots.footer">
        <slot name="footer"></slot>
      </div>
    </div>

    <!-- Floating Citation Tooltip -->
    <Teleport to="body">
      <Transition name="yh-fade-in-scale-up">
        <div
          v-if="hoveredCitation"
          :class="ns.e('citation-tooltip-wrapper')"
          :style="citationTooltipStyle"
          @mouseenter="handleTooltipEnter"
          @mouseleave="handleTooltipLeave"
        >
          <div :class="ns.e('citation-tooltip')">
            <div :class="ns.e('citation-tooltip-header')">
              <YhIcon :name="hoveredCitation.icon || 'document'" />
              <span>{{ hoveredCitation.source || hoveredCitation.title }}</span>
            </div>
            <div :class="ns.e('citation-tooltip-body')">
              <h4>{{ hoveredCitation.title }}</h4>
              <p v-if="hoveredCitation.abstract">{{ hoveredCitation.abstract }}</p>
              <span v-if="hoveredCitation.publishTime" class="publish-time">{{
                hoveredCitation.publishTime
              }}</span>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Code Edit Modal -->
    <Teleport to="body">
      <Transition name="yh-fade-in">
        <div v-if="editingCodeBlock" class="code-edit-modal-overlay" @click.self="cancelEditCode">
          <div class="code-edit-modal">
            <div class="code-edit-header">
              <h3>Edit Code</h3>
              <YhButton text @click="cancelEditCode">
                <YhIcon name="close" />
              </YhButton>
            </div>
            <div class="code-edit-body">
              <div ref="monacoContainer" class="code-edit-monaco"></div>
              <textarea v-if="!monaco" v-model="editCodeContent" rows="20"></textarea>
            </div>
            <div class="code-edit-footer">
              <YhButton @click="cancelEditCode">Cancel</YhButton>
              <YhButton type="primary" @click="saveEditCode(editingCodeBlock!)">Save</YhButton>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style lang="scss">
@use './ai-bubble.scss';

// Code Block Enhanced Styles
.code-block-wrapper {
  margin: 12px 0;
  border-radius: 8px;
  overflow: hidden;
  background: #282c34;

  .code-block-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    background: #21252b;

    .code-lang {
      font-size: 12px;
      color: #abb2bf;
      text-transform: uppercase;
    }

    .code-actions {
      display: flex;
      gap: 8px;

      .code-action-btn {
        padding: 4px 8px;
        font-size: 11px;
        color: #abb2bf;
        background: transparent;
        border: 1px solid #3e4451;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
          background: #3e4451;
          color: #fff;
        }

        &.copy-btn.copied {
          color: #98c379;
          border-color: #98c379;
        }

        &.run-btn.running {
          color: #61afef;
          border-color: #61afef;
        }
      }
    }
  }

  .code-block-body {
    padding: 12px;
    overflow-x: auto;

    &.collapsed {
      max-height: 200px;
      overflow: hidden;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 40px;
        background: linear-gradient(transparent, #282c34);
      }
    }

    pre {
      margin: 0;
      font-family: 'Fira Code', 'Consolas', monospace;
      font-size: 13px;
      line-height: 1.5;
    }

    code {
      font-family: inherit;
    }
  }

  .code-output {
    padding: 12px;
    background: #1e1e1e;
    border-top: 1px solid #3e4451;

    pre {
      margin: 0;
      color: #d4d4d4;
      font-size: 12px;
    }
  }
}

// Mermaid Styles
.mermaid-block {
  margin: 16px 0;
  padding: 16px;
  background: #fafafa;
  border-radius: 8px;
  text-align: center;

  .mermaid-rendered {
    svg {
      max-width: 100%;
      height: auto;
    }
  }

  .mermaid-error {
    color: #e74c3c;
    text-align: left;
    font-size: 12px;
  }
}

// Structured Data Styles
.structured-data {
  margin: 12px 0;

  .json-viewer {
    background: #282c34;
    border-radius: 8px;
    padding: 12px;
    overflow-x: auto;

    pre {
      margin: 0;
      color: #abb2bf;
      font-size: 13px;
      font-family: 'Fira Code', monospace;
    }
  }

  .table-viewer {
    overflow-x: auto;

    table {
      width: 100%;
      border-collapse: collapse;

      th,
      td {
        padding: 8px 12px;
        border: 1px solid var(--yh-border-color-light);
        text-align: left;
      }

      th {
        background: var(--yh-bg-color-page);
        font-weight: 600;
      }
    }
  }

  // Thought Chain – visually aligned with AiThoughtChain timeline
  .thought-chain {
    display: flex;
    flex-direction: column;
    gap: 12px;
    position: relative;
    padding-left: 8px;

    .thought-step {
      display: flex;
      gap: 12px;
      position: relative;
      padding-bottom: 12px;

      &:last-child {
        padding-bottom: 0;
      }

      .thought-index {
        width: 18px;
        height: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: var(--yh-color-primary);
        color: #fff;
        font-size: 11px;
        font-weight: 600;
        flex-shrink: 0;
        margin-top: 4px;
      }

      // vertical connector line
      &::before {
        content: '';
        position: absolute;
        left: 8px;
        top: 20px;
        bottom: 0;
        width: 2px;
        background: var(--yh-border-color-lighter);
      }

      &:last-child::before {
        bottom: 18px;
      }

      .thought-content {
        flex: 1;
        background: var(--yh-fill-color-light);
        border-radius: 6px;
        padding: 8px 10px;

        .thought-title {
          font-weight: 600;
          margin-bottom: 4px;
          font-size: 13px;
        }

        .thought-text {
          font-size: 13px;
          color: var(--yh-text-color-secondary);
          white-space: pre-wrap;
        }
      }
    }
  }
}

// Citation Tooltip Enhancement
.citation-tooltip-wrapper {
  .citation-tooltip {
    max-width: 320px;
    padding: 12px;
    background: var(--yh-bg-color);
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);

    .citation-tooltip-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
      font-size: 12px;
      color: var(--yh-text-color-secondary);
    }

    .citation-tooltip-body {
      h4 {
        margin: 0 0 8px;
        font-size: 14px;
        font-weight: 600;
      }

      p {
        margin: 0;
        font-size: 13px;
        color: var(--yh-text-color-secondary);
        line-height: 1.5;
      }

      .publish-time {
        display: block;
        margin-top: 8px;
        font-size: 11px;
        color: var(--yh-text-color-disabled);
      }
    }
  }
}

// Code Edit Modal
.code-edit-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;

  .code-edit-modal {
    width: 80%;
    max-width: 800px;
    background: var(--yh-bg-color);
    border-radius: 12px;
    overflow: hidden;

    .code-edit-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      border-bottom: 1px solid var(--yh-border-color-light);

      h3 {
        margin: 0;
        font-size: 16px;
      }
    }

    .code-edit-body {
      padding: 16px;

      textarea {
        width: 100%;
        padding: 12px;
        font-family: 'Fira Code', monospace;
        font-size: 13px;
        border: 1px solid var(--yh-border-color);
        border-radius: 8px;
        resize: vertical;
        background: #282c34;
        color: #abb2bf;

        &:focus {
          outline: none;
          border-color: var(--yh-color-primary);
        }
      }
    }

    .code-edit-footer {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      padding: 16px;
      border-top: 1px solid var(--yh-border-color-light);
    }
  }
}
</style>
