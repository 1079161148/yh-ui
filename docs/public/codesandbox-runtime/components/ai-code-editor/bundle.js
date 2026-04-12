// docs/public/codesandbox-runtime/components/ai-code-editor/src/ai-code-editor.js
import {
  normalizeClass as _normalizeClass,
  normalizeStyle as _normalizeStyle,
  createElementVNode as _createElementVNode,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock
} from 'vue'

// docs/public/codesandbox-runtime/hooks/use-namespace/index.js
import { inject, ref, unref } from 'vue'
var defaultNamespace = 'yh'
var statePrefix = 'is-'
var namespaceContextKey = Symbol('namespaceContextKey')
var useGlobalNamespace = () => {
  return inject(namespaceContextKey, ref(defaultNamespace))
}
var useNamespace = (block) => {
  const namespace = useGlobalNamespace()
  const b = (blockSuffix = '') => {
    const ns = unref(namespace)
    return blockSuffix ? `${ns}-${block}-${blockSuffix}` : `${ns}-${block}`
  }
  const e = (element) => {
    return element ? `${b()}__${element}` : ''
  }
  const m = (modifier) => {
    return modifier ? `${b()}--${modifier}` : ''
  }
  const bem = (blockSuffix, element, modifier) => {
    let cls = b(blockSuffix)
    if (element) cls += `__${element}`
    if (modifier) cls += `--${modifier}`
    return cls
  }
  const em = (element, modifier) => {
    return element && modifier ? `${b()}__${element}--${modifier}` : ''
  }
  function is(state, value) {
    if (arguments.length === 1) {
      return `${statePrefix}${state}`
    }
    return value ? `${statePrefix}${state}` : ''
  }
  const cssVar = (name) => {
    return `--${unref(namespace)}-${block}-${name}`
  }
  const cssVarObj = (vars) => {
    const obj = {}
    Object.entries(vars).forEach(([key, value]) => {
      obj[cssVar(key)] = value
    })
    return obj
  }
  const cssVarBlock = (name) => {
    return `--${unref(namespace)}-${name}`
  }
  const cssVarBlockObj = (vars) => {
    const obj = {}
    Object.entries(vars).forEach(([key, value]) => {
      obj[cssVarBlock(key)] = value
    })
    return obj
  }
  return {
    namespace,
    b,
    e,
    m,
    bem,
    em,
    is,
    cssVar,
    cssVarObj,
    cssVarBlock,
    cssVarBlockObj
  }
}

// docs/public/codesandbox-runtime/components/ai-code-editor/src/ai-code-editor.js
import {
  ref as ref2,
  onMounted,
  onBeforeUnmount,
  watch,
  computed as computed2,
  nextTick
} from 'vue'

// docs/public/codesandbox-runtime/components/ai-code-editor/src/ai-code-editor-meta.js
var aiCodeEditorProps = {
  /**
   * @description 代码语言
   */
  language: {
    type: String,
    default: 'javascript'
  },
  /**
   * @description 代码内容
   */
  modelValue: {
    type: String,
    default: ''
  },
  /**
   * @description 打开时显示的初始代码（优先于 modelValue 用于首屏，避免 v-if 下首帧未到位导致空白）
   */
  initialValue: {
    type: String,
    default: void 0
  },
  /**
   * @description 是否只读
   */
  readonly: {
    type: Boolean,
    default: false
  },
  /**
   * @description 编辑器主题
   */
  theme: {
    type: String,
    default: 'vs-dark',
    validator: (value) => ['vs', 'vs-dark', 'hc-black'].includes(value)
  },
  /**
   * @description 编辑器高度
   */
  height: {
    type: [String, Number],
    default: 300
  },
  /**
   * @description 是否显示 Minimap
   */
  minimap: {
    type: Boolean,
    default: false
  },
  /**
   * @description 自动换行
   */
  wordWrap: {
    type: String,
    default: 'on',
    validator: (value) => ['on', 'off', 'wordWrapColumn', 'bounded'].includes(value)
  },
  /**
   * @description 字体大小
   */
  fontSize: {
    type: Number,
    default: 14
  },
  /**
   * @description 制表符宽度
   */
  tabSize: {
    type: Number,
    default: 2
  },
  /**
   * @description 是否自动聚焦
   */
  autofocus: {
    type: Boolean,
    default: true
  },
  /**
   * @description 主题覆盖变量
   */
  themeOverrides: {
    type: Object,
    default: void 0
  }
}
var aiCodeEditorEmits = {
  'update:modelValue': (value) => typeof value === 'string',
  change: (value) => typeof value === 'string',
  mount: () => true,
  dispose: () => true
}

// docs/public/codesandbox-runtime/theme/component-theme.js
import { inject as inject2, provide, computed, unref as unref2 } from 'vue'
var __defProp = Object.defineProperty
var __getOwnPropSymbols = Object.getOwnPropertySymbols
var __hasOwnProp = Object.prototype.hasOwnProperty
var __propIsEnum = Object.prototype.propertyIsEnumerable
var __defNormalProp = (obj, key, value) =>
  key in obj
    ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value })
    : (obj[key] = value)
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {})) if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop])
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop])
    }
  return a
}
var COMPONENT_THEME_KEY = Symbol('component-theme')
function useComponentTheme(componentName, localOverrides) {
  const globalThemes = inject2(COMPONENT_THEME_KEY, {})
  const mergedVars = computed(() => {
    const globalVars = globalThemes[componentName] || {}
    const local = unref2(localOverrides) || {}
    return __spreadValues(__spreadValues({}, globalVars), local)
  })
  const themeStyle = computed(() => {
    const vars = mergedVars.value
    const style = {}
    Object.entries(vars).forEach(([key, value]) => {
      if (value !== void 0) {
        const cssVarName = `--yh-${componentName}-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`
        style[cssVarName] = value
      }
    })
    return style
  })
  const hasCustomTheme = computed(() => {
    return Object.keys(mergedVars.value).length > 0
  })
  return {
    themeVars: mergedVars,
    themeStyle,
    hasCustomTheme
  }
}

// docs/public/codesandbox-runtime/components/ai-code-editor/src/ai-code-editor.js
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      'div',
      {
        class: _normalizeClass($setup.ns.b()),
        style: _normalizeStyle($setup.themeStyle)
      },
      [
        _createElementVNode(
          'div',
          {
            ref: 'editorRef',
            class: _normalizeClass($setup.ns.e('container')),
            style: _normalizeStyle({
              height: $setup.editorHeight
            })
          },
          null,
          6
          /* CLASS, STYLE */
        )
      ],
      6
      /* CLASS, STYLE */
    )
  )
}
var __sfc__ = /* @__PURE__ */ Object.assign(
  { name: 'YhAiCodeEditor' },
  {
    __name: 'ai-code-editor',
    props: aiCodeEditorProps,
    emits: aiCodeEditorEmits,
    setup(__props, { expose: __expose, emit: __emit }) {
      const props = __props
      const emit = __emit
      const ns = useNamespace('ai-code-editor')
      const { themeStyle } = useComponentTheme('ai-code-editor', props.themeOverrides)
      let monaco = null
      const editorRef = ref2()
      let editor = null
      let isApplyingValue = false
      const editorHeight = computed2(() => {
        if (typeof props.height === 'number') return `${props.height}px`
        return props.height
      })
      const safeSetValue = (value) => {
        if (!editor) return
        isApplyingValue = true
        editor.setValue(value)
        nextTick(() => {
          isApplyingValue = false
        })
      }
      const getTargetValue = () => {
        var _a
        return (_a =
          props.initialValue !== void 0 && props.initialValue !== null
            ? props.initialValue
            : props.modelValue) != null
          ? _a
          : ''
      }
      const createEditor = () => {
        if (!editorRef.value) return
        const container = editorRef.value
        const targetValue = getTargetValue()
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
          wordWrap: props.wordWrap,
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
        editor.layout({ width: containerWidth, height: containerHeight })
        editor.onDidChangeModelContent(() => {
          var _a
          if (isApplyingValue) return
          const value = (_a = editor == null ? void 0 : editor.getValue()) != null ? _a : ''
          emit('update:modelValue', value)
          emit('change', value)
        })
        if (props.autofocus) {
          editor.focus()
        }
        emit('mount')
      }
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
      let resizeObserver = null
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
              getWorker(_workerId, label) {
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
            forceLayout()
            requestAnimationFrame(() => {
              forceLayout()
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
      watch(
        () => props.modelValue,
        (newValue) => {
          if (editor && newValue !== editor.getValue()) {
            safeSetValue(newValue != null ? newValue : '')
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
      const focus = () => (editor == null ? void 0 : editor.focus())
      const setValue = (value) => {
        if (editor) safeSetValue(value)
      }
      const getValue = () => (editor == null ? void 0 : editor.getValue()) || ''
      __expose({
        getEditor,
        focus,
        setValue,
        getValue
      })
      const __returned__ = {
        props,
        emit,
        ns,
        themeStyle,
        get monaco() {
          return monaco
        },
        set monaco(v) {
          monaco = v
        },
        editorRef,
        get editor() {
          return editor
        },
        set editor(v) {
          editor = v
        },
        get isApplyingValue() {
          return isApplyingValue
        },
        set isApplyingValue(v) {
          isApplyingValue = v
        },
        editorHeight,
        safeSetValue,
        getTargetValue,
        createEditor,
        forceLayout,
        get resizeObserver() {
          return resizeObserver
        },
        set resizeObserver(v) {
          resizeObserver = v
        },
        getEditor,
        focus,
        setValue,
        getValue,
        get useNamespace() {
          return useNamespace
        },
        ref: ref2,
        onMounted,
        onBeforeUnmount,
        watch,
        computed: computed2,
        nextTick,
        get aiCodeEditorProps() {
          return aiCodeEditorProps
        },
        get aiCodeEditorEmits() {
          return aiCodeEditorEmits
        },
        get useComponentTheme() {
          return useComponentTheme
        }
      }
      Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true })
      return __returned__
    }
  }
)
__sfc__.render = render
var stdin_default = __sfc__
export { stdin_default as default }
