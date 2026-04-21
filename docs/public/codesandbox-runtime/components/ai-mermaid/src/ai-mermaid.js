import { createCommentVNode as _createCommentVNode, renderSlot as _renderSlot, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, normalizeClass as _normalizeClass, createElementVNode as _createElementVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, createVNode as _createVNode, renderList as _renderList, Fragment as _Fragment, normalizeStyle as _normalizeStyle } from "vue";
const _hoisted_1 = ["title", "onClick"];
const _hoisted_2 = ["innerHTML"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock(), _createElementBlock(
    "div",
    {
      class: _normalizeClass([$setup.ns.b(), _ctx.className]),
      style: _normalizeStyle([$setup.themeStyle, _ctx.style])
    },
    [
      _createCommentVNode(" \u5934\u90E8\u533A\u57DF "),
      _ctx.header || _ctx.$slots.header ? (_openBlock(), _createElementBlock(
        "div",
        {
          key: 0,
          class: _normalizeClass($setup.ns.e("header"))
        },
        [
          _createElementVNode(
            "div",
            {
              class: _normalizeClass($setup.ns.e("header-content"))
            },
            [
              _renderSlot(_ctx.$slots, "header", {}, () => [
                _createTextVNode(
                  _toDisplayString(_ctx.header),
                  1
                  /* TEXT */
                )
              ])
            ],
            2
            /* CLASS */
          ),
          _createElementVNode(
            "div",
            {
              class: _normalizeClass($setup.ns.e("extra"))
            },
            [
              _renderSlot(_ctx.$slots, "extra")
            ],
            2
            /* CLASS */
          )
        ],
        2
        /* CLASS */
      )) : _createCommentVNode("v-if", true),
      _createCommentVNode(" \u64CD\u4F5C\u680F "),
      _createElementVNode(
        "div",
        {
          class: _normalizeClass($setup.ns.e("actions"))
        },
        [
          _createElementVNode(
            "div",
            {
              class: _normalizeClass($setup.ns.e("render-tabs"))
            },
            [
              _createElementVNode(
                "button",
                {
                  class: _normalizeClass([$setup.ns.e("render-tab"), $setup.renderType === "image" && $setup.ns.is("active")]),
                  onClick: _cache[0] || (_cache[0] = ($event) => $setup.handleRenderTypeChange("image"))
                },
                [
                  _createVNode($setup["YhIcon"], { name: "image" }),
                  _createElementVNode(
                    "span",
                    null,
                    _toDisplayString($setup.t("ai.mermaid.image")),
                    1
                    /* TEXT */
                  )
                ],
                2
                /* CLASS */
              ),
              _createElementVNode(
                "button",
                {
                  class: _normalizeClass([$setup.ns.e("render-tab"), $setup.renderType === "code" && $setup.ns.is("active")]),
                  onClick: _cache[1] || (_cache[1] = ($event) => $setup.handleRenderTypeChange("code"))
                },
                [
                  _createVNode($setup["YhIcon"], { name: "code" }),
                  _createElementVNode(
                    "span",
                    null,
                    _toDisplayString($setup.t("ai.mermaid.code")),
                    1
                    /* TEXT */
                  )
                ],
                2
                /* CLASS */
              )
            ],
            2
            /* CLASS */
          ),
          $setup.actionButtons.length > 0 ? (_openBlock(), _createElementBlock(
            "div",
            {
              key: 0,
              class: _normalizeClass($setup.ns.e("action-buttons"))
            },
            [
              (_openBlock(true), _createElementBlock(
                _Fragment,
                null,
                _renderList($setup.actionButtons, (btn) => {
                  return _openBlock(), _createElementBlock("button", {
                    key: btn.key,
                    class: _normalizeClass($setup.ns.e("action-btn")),
                    title: btn.label,
                    onClick: btn.onClick
                  }, [
                    _createVNode($setup["YhIcon"], {
                      name: btn.icon || "document"
                    }, null, 8, ["name"])
                  ], 10, _hoisted_1);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ],
            2
            /* CLASS */
          )) : _createCommentVNode("v-if", true)
        ],
        2
        /* CLASS */
      ),
      _createCommentVNode(" \u5185\u5BB9\u533A\u57DF "),
      _createElementVNode(
        "div",
        {
          class: _normalizeClass($setup.ns.e("content"))
        },
        [
          _createCommentVNode(" \u52A0\u8F7D\u72B6\u6001 "),
          $setup.isLoading ? (_openBlock(), _createElementBlock(
            "div",
            {
              key: 0,
              class: _normalizeClass($setup.ns.e("loading"))
            },
            [
              _createVNode($setup["YhSpin"])
            ],
            2
            /* CLASS */
          )) : $setup.errorMessage ? (_openBlock(), _createElementBlock(
            _Fragment,
            { key: 1 },
            [
              _createCommentVNode(" \u9519\u8BEF\u72B6\u6001 "),
              _createElementVNode(
                "div",
                {
                  class: _normalizeClass($setup.ns.e("error"))
                },
                [
                  _createVNode($setup["YhIcon"], { name: "warning" }),
                  _createElementVNode(
                    "span",
                    null,
                    _toDisplayString($setup.errorMessage),
                    1
                    /* TEXT */
                  ),
                  _createElementVNode(
                    "button",
                    { onClick: $setup.renderGraph },
                    _toDisplayString($setup.t("ai.mermaid.retry")),
                    1
                    /* TEXT */
                  )
                ],
                2
                /* CLASS */
              )
            ],
            2112
            /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
          )) : _createCommentVNode("v-if", true),
          _createCommentVNode(" \u4EE3\u7801\u6A21\u5F0F "),
          $setup.renderType === "code" ? (_openBlock(), _createElementBlock(
            "div",
            {
              key: 2,
              class: _normalizeClass($setup.ns.e("code"))
            },
            [
              _createElementVNode("pre", null, [
                _createElementVNode(
                  "code",
                  null,
                  _toDisplayString(_ctx.code),
                  1
                  /* TEXT */
                )
              ])
            ],
            2
            /* CLASS */
          )) : $setup.renderType === "image" ? (_openBlock(), _createElementBlock(
            _Fragment,
            { key: 3 },
            [
              _createCommentVNode(" \u56FE\u7247\u6A21\u5F0F "),
              _createCommentVNode(" eslint-disable vue/no-v-html "),
              _createElementVNode("div", {
                ref: "graphContainerRef",
                class: _normalizeClass($setup.ns.e("graph")),
                style: _normalizeStyle($setup.transformStyle),
                innerHTML: $setup.svgContent
              }, null, 14, _hoisted_2)
            ],
            2112
            /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
          )) : _createCommentVNode("v-if", true),
          _createCommentVNode(" eslint-enable vue/no-v-html ")
        ],
        2
        /* CLASS */
      )
    ],
    6
    /* CLASS, STYLE */
  );
}
import { ref, computed, watch, shallowRef } from "vue";
import { useLocale } from "../../../hooks/index.js";
import { useNamespace } from "../../../hooks/use-namespace/index.js";
import { useComponentTheme } from "../../../theme/component-theme.js";
import { aiMermaidProps, aiMermaidEmits } from "./ai-mermaid-meta.js";
import { YhIcon } from "../../icon/index.js";
import { YhSpin } from "../../spin/index.js";
const __sfc__ = /* @__PURE__ */ Object.assign({
  name: "YhAiMermaid"
}, {
  __name: "ai-mermaid",
  props: aiMermaidProps,
  emits: aiMermaidEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("ai-mermaid");
    const { t } = useLocale();
    const { themeStyle } = useComponentTheme(
      "ai-mermaid",
      computed(() => props.themeOverrides)
    );
    const mermaidModule = shallowRef(null);
    const svgContent = ref("");
    const errorMessage = ref(null);
    const isLoading = ref(false);
    const renderType = ref("image");
    const zoomLevel = ref(1);
    const graphContainerRef = ref(null);
    const canUseDom = typeof window !== "undefined" && typeof document !== "undefined";
    const loadMermaid = async () => {
      if (mermaidModule.value) return mermaidModule.value;
      try {
        const module = await import("mermaid");
        const mermaid = module.default || module;
        mermaidModule.value = mermaid;
        return mermaidModule.value;
      } catch (error) {
        console.error("Failed to load mermaid:", error);
        errorMessage.value = "Failed to load mermaid library";
        return null;
      }
    };
    const renderGraph = async () => {
      if (!props.code) {
        svgContent.value = "";
        return;
      }
      if (!canUseDom) {
        svgContent.value = "";
        errorMessage.value = null;
        return;
      }
      isLoading.value = true;
      errorMessage.value = null;
      try {
        const module = await loadMermaid();
        if (!module) {
          isLoading.value = false;
          return;
        }
        module.initialize({
          startOnLoad: false,
          securityLevel: "loose"
        });
        let processedCode = props.code;
        if (props.config && Object.keys(props.config).length > 0) {
          const configStr = JSON.stringify(props.config);
          processedCode = `%%{init: ${configStr}}%%
${processedCode}`;
        }
        const id = `mermaid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const { svg } = await module.render(id, processedCode);
        svgContent.value = svg;
        emit("ready");
      } catch (error) {
        console.error("Failed to render mermaid:", error);
        errorMessage.value = error instanceof Error ? error.message : "Failed to render diagram";
        emit("error", error instanceof Error ? error : new Error(String(error)));
      } finally {
        isLoading.value = false;
      }
    };
    watch(
      [() => props.code, () => props.config],
      () => {
        if (canUseDom && renderType.value === "image") {
          renderGraph();
        }
      },
      { immediate: true, deep: true }
    );
    const handleRenderTypeChange = (type) => {
      renderType.value = type;
      emit("render-type-change", type);
      if (props.onRenderTypeChange) {
        props.onRenderTypeChange(type);
      }
      if (canUseDom && type === "image") {
        renderGraph();
      }
    };
    const handleZoomIn = () => {
      if (zoomLevel.value < 3) {
        zoomLevel.value = Number((zoomLevel.value + 0.1).toFixed(1));
      }
    };
    const handleZoomOut = () => {
      if (zoomLevel.value > 0.5) {
        zoomLevel.value = Number((zoomLevel.value - 0.1).toFixed(1));
      }
    };
    const handleReset = () => {
      zoomLevel.value = 1;
    };
    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(props.code);
      } catch (error) {
        console.error("Failed to copy code:", error);
      }
    };
    const handleDownload = () => {
      var _a;
      const el = (_a = graphContainerRef.value) == null ? void 0 : _a.querySelector("svg");
      if (!el) return;
      try {
        const svgData = new XMLSerializer().serializeToString(el);
        const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(svgBlob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `mermaid-chart-${Date.now()}.svg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Failed to download SVG:", error);
      }
    };
    const transformStyle = computed(() => ({
      transform: `scale(${zoomLevel.value})`,
      transformOrigin: "top left"
    }));
    const actionButtons = computed(() => {
      const { enableZoom, enableDownload, enableCopy, customActions } = props.actions;
      const buttons = [];
      if (enableZoom) {
        buttons.push(
          { key: "zoom-in", label: t("ai.mermaid.zoomIn"), icon: "zoom-in", onClick: handleZoomIn },
          { key: "zoom-out", label: t("ai.mermaid.zoomOut"), icon: "zoom-out", onClick: handleZoomOut },
          { key: "reset", label: t("ai.mermaid.reset"), icon: "refresh", onClick: handleReset }
        );
      }
      if (enableDownload) {
        buttons.push({
          key: "download",
          label: t("ai.mermaid.download"),
          icon: "download",
          onClick: handleDownload
        });
      }
      if (enableCopy) {
        buttons.push({
          key: "copy",
          label: t("ai.mermaid.copyCode"),
          icon: "copy",
          onClick: handleCopy
        });
      }
      if (customActions) {
        buttons.push(...customActions);
      }
      return buttons;
    });
    const __returned__ = { props, emit, ns, t, themeStyle, mermaidModule, svgContent, errorMessage, isLoading, renderType, zoomLevel, graphContainerRef, canUseDom, loadMermaid, renderGraph, handleRenderTypeChange, handleZoomIn, handleZoomOut, handleReset, handleCopy, handleDownload, transformStyle, actionButtons, ref, computed, watch, shallowRef, get useNamespace() {
      return useNamespace;
    }, get useLocale() {
      return useLocale;
    }, get useComponentTheme() {
      return useComponentTheme;
    }, get aiMermaidProps() {
      return aiMermaidProps;
    }, get aiMermaidEmits() {
      return aiMermaidEmits;
    }, get YhIcon() {
      return YhIcon;
    }, get YhSpin() {
      return YhSpin;
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
