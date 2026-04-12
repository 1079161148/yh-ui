import { normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, createElementVNode as _createElementVNode, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue";
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock(), _createElementBlock(
    "div",
    {
      class: _normalizeClass($setup.ns.b()),
      style: _normalizeStyle($setup.themeStyle)
    },
    [
      _createElementVNode(
        "div",
        {
          ref: "editorRef",
          class: _normalizeClass($setup.ns.e("container")),
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
  );
}
import { useNamespace } from "../../../hooks/use-namespace/index.js";
import { ref, onMounted, onBeforeUnmount, watch, computed, nextTick } from "vue";
import { aiCodeEditorProps, aiCodeEditorEmits } from "./ai-code-editor-meta.js";
import { useComponentTheme } from "../../../theme/component-theme.js";
const __sfc__ = /* @__PURE__ */ Object.assign({ name: "YhAiCodeEditor" }, {
  __name: "ai-code-editor",
  props: aiCodeEditorProps,
  emits: aiCodeEditorEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("ai-code-editor");
    const { themeStyle } = useComponentTheme("ai-code-editor", props.themeOverrides);
    let monaco = null;
    const editorRef = ref();
    let editor = null;
    let isApplyingValue = false;
    const editorHeight = computed(() => {
      if (typeof props.height === "number") return `${props.height}px`;
      return props.height;
    });
    const safeSetValue = (value) => {
      if (!editor) return;
      isApplyingValue = true;
      editor.setValue(value);
      nextTick(() => {
        isApplyingValue = false;
      });
    };
    const getTargetValue = () => {
      var _a;
      return (_a = props.initialValue !== void 0 && props.initialValue !== null ? props.initialValue : props.modelValue) != null ? _a : "";
    };
    const createEditor = () => {
      if (!editorRef.value) return;
      const container = editorRef.value;
      const targetValue = getTargetValue();
      const containerWidth = container.clientWidth || container.offsetWidth || 800;
      const containerHeight = container.clientHeight || container.offsetHeight || (typeof props.height === "number" ? props.height : 300);
      if (!monaco) return;
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
        lineNumbers: "on",
        renderLineHighlight: "line",
        selectOnLineNumbers: true,
        folding: true,
        lineDecorationsWidth: 10,
        lineNumbersMinChars: 3,
        padding: { top: 12, bottom: 12 },
        scrollbar: {
          vertical: "auto",
          horizontal: "auto",
          useShadows: false,
          verticalScrollbarSize: 10,
          horizontalScrollbarSize: 10
        },
        overviewRulerBorder: false,
        hideCursorInOverviewRuler: true,
        renderWhitespace: "selection"
      });
      editor.layout({ width: containerWidth, height: containerHeight });
      editor.onDidChangeModelContent(() => {
        var _a;
        if (isApplyingValue) return;
        const value = (_a = editor == null ? void 0 : editor.getValue()) != null ? _a : "";
        emit("update:modelValue", value);
        emit("change", value);
      });
      if (props.autofocus) {
        editor.focus();
      }
      emit("mount");
    };
    const forceLayout = () => {
      if (!editor || !editorRef.value) return;
      const w = editorRef.value.clientWidth || editorRef.value.offsetWidth || 800;
      const h = editorRef.value.clientHeight || editorRef.value.offsetHeight || (typeof props.height === "number" ? props.height : 300);
      editor.layout({ width: w, height: h });
      editor.render(true);
    };
    let resizeObserver = null;
    onMounted(async () => {
      if (typeof window !== "undefined") {
        monaco = await import("monaco-editor");
        await import("monaco-editor/min/vs/editor/editor.main.css");
        if (!self.MonacoEnvironment) {
          const [
            { default: EditorWorker },
            { default: JsonWorker },
            { default: CssWorker },
            { default: HtmlWorker },
            { default: TsWorker }
          ] = await Promise.all([
            import("monaco-editor/esm/vs/editor/editor.worker?worker"),
            import("monaco-editor/esm/vs/language/json/json.worker?worker"),
            import("monaco-editor/esm/vs/language/css/css.worker?worker"),
            import("monaco-editor/esm/vs/language/html/html.worker?worker"),
            import("monaco-editor/esm/vs/language/typescript/ts.worker?worker")
          ]);
          self.MonacoEnvironment = {
            getWorker(_workerId, label) {
              if (label === "json") return new JsonWorker();
              if (label === "css" || label === "scss" || label === "less") return new CssWorker();
              if (label === "html" || label === "handlebars" || label === "razor")
                return new HtmlWorker();
              if (label === "typescript" || label === "javascript") return new TsWorker();
              return new EditorWorker();
            }
          };
        }
      }
      nextTick(() => {
        requestAnimationFrame(() => {
          createEditor();
          forceLayout();
          requestAnimationFrame(() => {
            forceLayout();
            if (editorRef.value && typeof ResizeObserver !== "undefined") {
              resizeObserver = new ResizeObserver(() => {
                forceLayout();
              });
              resizeObserver.observe(editorRef.value);
            }
          });
        });
      });
    });
    onBeforeUnmount(() => {
      if (resizeObserver) {
        resizeObserver.disconnect();
        resizeObserver = null;
      }
      if (editor) {
        emit("dispose");
        editor.dispose();
        editor = null;
      }
    });
    watch(
      () => props.modelValue,
      (newValue) => {
        if (editor && newValue !== editor.getValue()) {
          safeSetValue(newValue != null ? newValue : "");
        }
      }
    );
    watch(
      () => props.language,
      (newLanguage) => {
        if (editor && monaco) {
          const model = editor.getModel();
          if (model) monaco.editor.setModelLanguage(model, newLanguage);
        }
      }
    );
    watch(
      () => props.theme,
      (newTheme) => {
        if (monaco) {
          monaco.editor.setTheme(newTheme);
        }
      }
    );
    watch(
      () => props.readonly,
      (newReadonly) => {
        if (editor) {
          editor.updateOptions({ readOnly: newReadonly });
        }
      }
    );
    const getEditor = () => editor;
    const focus = () => editor == null ? void 0 : editor.focus();
    const setValue = (value) => {
      if (editor) safeSetValue(value);
    };
    const getValue = () => (editor == null ? void 0 : editor.getValue()) || "";
    __expose({
      getEditor,
      focus,
      setValue,
      getValue
    });
    const __returned__ = { props, emit, ns, themeStyle, get monaco() {
      return monaco;
    }, set monaco(v) {
      monaco = v;
    }, editorRef, get editor() {
      return editor;
    }, set editor(v) {
      editor = v;
    }, get isApplyingValue() {
      return isApplyingValue;
    }, set isApplyingValue(v) {
      isApplyingValue = v;
    }, editorHeight, safeSetValue, getTargetValue, createEditor, forceLayout, get resizeObserver() {
      return resizeObserver;
    }, set resizeObserver(v) {
      resizeObserver = v;
    }, getEditor, focus, setValue, getValue, get useNamespace() {
      return useNamespace;
    }, ref, onMounted, onBeforeUnmount, watch, computed, nextTick, get aiCodeEditorProps() {
      return aiCodeEditorProps;
    }, get aiCodeEditorEmits() {
      return aiCodeEditorEmits;
    }, get useComponentTheme() {
      return useComponentTheme;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
__sfc__.render = render;
var stdin_default = __sfc__;
export {
  stdin_default as default
};
