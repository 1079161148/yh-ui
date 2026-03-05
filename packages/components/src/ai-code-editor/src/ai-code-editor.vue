<script setup lang="ts">
import { useNamespace } from '@yh-ui/hooks'
import { ref, onMounted, onBeforeUnmount, watch, computed, nextTick } from 'vue'

import { aiCodeEditorProps, aiCodeEditorEmits, type AiCodeEditorExpose } from './ai-code-editor'
import { useComponentTheme } from '@yh-ui/theme'

defineOptions({ name: 'YhAiCodeEditor' })

const props = defineProps(aiCodeEditorProps)
const emit = defineEmits(aiCodeEditorEmits)

const ns = useNamespace('ai-code-editor')
const { themeStyle } = useComponentTheme('ai-code-editor', props.themeOverrides)

let monaco: typeof import('monaco-editor') | null = null

const editorRef = ref<HTMLElement>()
let editor: import('monaco-editor').editor.IStandaloneCodeEditor | null = null
/** 程序化 setValue 期间为 true，防止 onDidChangeModelContent 回流 */
let isApplyingValue = false

const editorHeight = computed(() => {
  if (typeof props.height === 'number') return `${props.height}px`
  return props.height
})

/** 安全地设置编辑器内容，自动管理 isApplyingValue 标志 */
const safeSetValue = (value: string) => {
  if (!editor) return
  isApplyingValue = true
  editor.setValue(value)
  // 使用 nextTick 延迟重置，确保 onDidChangeModelContent 同步回调被完整拦截
  nextTick(() => {
    isApplyingValue = false
  })
}

/** 获取期望的初始值 */
const getTargetValue = () => {
  return (
    (props.initialValue !== undefined && props.initialValue !== null
      ? props.initialValue
      : props.modelValue) ?? ''
  )
}

const createEditor = () => {
  if (!editorRef.value) return

  const container = editorRef.value
  const targetValue = getTargetValue()
  // 显式读取容器尺寸传给 Monaco，避免 Monaco 内部次序测量到 0
  const containerWidth = container.clientWidth || container.offsetWidth || 800
  const containerHeight =
    container.clientHeight ||
    container.offsetHeight ||
    (typeof props.height === 'number' ? props.height : 300)

  if (!monaco) return

  editor = monaco.editor.create(container, {
    value: targetValue,
    language: props.language,
    theme: props.theme,
    readOnly: props.readonly,
    minimap: { enabled: props.minimap },
    wordWrap: props.wordWrap as 'on' | 'off' | 'wordWrapColumn' | 'bounded',
    fontSize: props.fontSize,
    tabSize: props.tabSize,
    // 禁用 automaticLayout，改由我们显式控制，避免 Monaco 自身定时读到 0
    automaticLayout: false,
    scrollBeyondLastLine: false,
    lineNumbers: 'on',
    renderLineHighlight: 'line',
    selectOnLineNumbers: true,
    folding: true,
    lineDecorationsWidth: 10,
    lineNumbersMinChars: 3,
    padding: { top: 12, bottom: 12 },
    scrollbar: {
      vertical: 'auto',
      horizontal: 'auto',
      useShadows: false,
      verticalScrollbarSize: 10,
      horizontalScrollbarSize: 10
    },
    overviewRulerBorder: false,
    hideCursorInOverviewRuler: true,
    renderWhitespace: 'selection'
  })

  // 立即显式设置尺寸
  editor.layout({ width: containerWidth, height: containerHeight })

  // 监听用户编辑，同步 v-model
  editor.onDidChangeModelContent(() => {
    if (isApplyingValue) return
    const value = editor?.getValue() ?? ''
    emit('update:modelValue', value)
    emit('change', value)
  })

  if (props.autofocus) {
    editor.focus()
  }

  emit('mount')
}

/**
 * 显式传入尺寸刷新 Monaco 布局
 */
const forceLayout = () => {
  if (!editor || !editorRef.value) return
  const w = editorRef.value.clientWidth || editorRef.value.offsetWidth || 800
  const h =
    editorRef.value.clientHeight ||
    editorRef.value.offsetHeight ||
    (typeof props.height === 'number' ? props.height : 300)
  editor.layout({ width: w, height: h })
  editor.render(true)
}

let resizeObserver: ResizeObserver | null = null

onMounted(async () => {
  if (typeof window !== 'undefined') {
    monaco = await import('monaco-editor')
    await import('monaco-editor/min/vs/editor/editor.main.css')

    if (!self.MonacoEnvironment) {
      const [
        { default: EditorWorker },
        { default: JsonWorker },
        { default: CssWorker },
        { default: HtmlWorker },
        { default: TsWorker }
      ] = await Promise.all([
        import('monaco-editor/esm/vs/editor/editor.worker?worker'),
        import('monaco-editor/esm/vs/language/json/json.worker?worker'),
        import('monaco-editor/esm/vs/language/css/css.worker?worker'),
        import('monaco-editor/esm/vs/language/html/html.worker?worker'),
        import('monaco-editor/esm/vs/language/typescript/ts.worker?worker')
      ])

      self.MonacoEnvironment = {
        getWorker(_workerId: string, label: string) {
          if (label === 'json') return new JsonWorker()
          if (label === 'css' || label === 'scss' || label === 'less') return new CssWorker()
          if (label === 'html' || label === 'handlebars' || label === 'razor')
            return new HtmlWorker()
          if (label === 'typescript' || label === 'javascript') return new TsWorker()
          return new EditorWorker()
        }
      }
    }
  }

  nextTick(() => {
    requestAnimationFrame(() => {
      createEditor()
      // 初始化后立即 layout
      forceLayout()

      requestAnimationFrame(() => {
        // 再次 layout，应对浏览器第二帧才计算完毕的场景
        forceLayout()

        // 用 ResizeObserver 替代 automaticLayout: true，确保容器尺寸变化时 Monaco 能响应
        if (editorRef.value && typeof ResizeObserver !== 'undefined') {
          resizeObserver = new ResizeObserver(() => {
            forceLayout()
          })
          resizeObserver.observe(editorRef.value)
        }
      })
    })
  })
})

onBeforeUnmount(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
  if (editor) {
    emit('dispose')
    editor.dispose()
    editor = null
  }
})

// 外部 v-model 变化时同步到编辑器
watch(
  () => props.modelValue,
  (newValue) => {
    if (editor && newValue !== editor.getValue()) {
      safeSetValue(newValue ?? '')
    }
  }
)

watch(
  () => props.language,
  (newLanguage) => {
    if (editor && monaco) {
      const model = editor.getModel()
      if (model) monaco.editor.setModelLanguage(model, newLanguage)
    }
  }
)

watch(
  () => props.theme,
  (newTheme) => {
    if (monaco) {
      monaco.editor.setTheme(newTheme)
    }
  }
)

watch(
  () => props.readonly,
  (newReadonly) => {
    if (editor) {
      editor.updateOptions({ readOnly: newReadonly })
    }
  }
)

const getEditor = () => editor
const focus = () => editor?.focus()
const setValue = (value: string) => {
  if (editor) safeSetValue(value)
}
const getValue = () => editor?.getValue() || ''

defineExpose<AiCodeEditorExpose>({
  getEditor,
  focus,
  setValue,
  getValue
})
</script>

<template>
  <div :class="ns.b()" :style="themeStyle">
    <div ref="editorRef" :class="ns.e('container')" :style="{ height: editorHeight }" />
  </div>
</template>

<style lang="scss">
@use './ai-code-editor.scss';
</style>
