import { createCommentVNode as _createCommentVNode, createVNode as _createVNode, toDisplayString as _toDisplayString, normalizeClass as _normalizeClass, createElementVNode as _createElementVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, withCtx as _withCtx, renderList as _renderList, Fragment as _Fragment, createBlock as _createBlock, vShow as _vShow, normalizeStyle as _normalizeStyle, withDirectives as _withDirectives, renderSlot as _renderSlot, Transition as _Transition } from "vue";
const _hoisted_1 = ["onClick"];
const _hoisted_2 = ["src"];
const _hoisted_3 = ["innerHTML"];
const _hoisted_4 = { key: 0 };
const _hoisted_5 = { key: 1 };
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock(), _createBlock(_Transition, { name: "yh-slide-right" }, {
    default: _withCtx(() => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m;
      return [
        _ctx.visible ? (_openBlock(), _createElementBlock(
          "div",
          {
            key: 0,
            class: _normalizeClass([$setup.ns.b(), $setup.ns.m($setup.internalMode)]),
            style: _normalizeStyle([{
              width: typeof _ctx.width === "number" ? _ctx.width + "px" : _ctx.width
            }, $setup.themeStyle])
          },
          [
            _createCommentVNode(" Header "),
            _createElementVNode(
              "div",
              {
                class: _normalizeClass($setup.ns.e("header"))
              },
              [
                _createElementVNode(
                  "div",
                  {
                    class: _normalizeClass($setup.ns.e("title-area"))
                  },
                  [
                    _createVNode($setup["YhIcon"], {
                      name: $setup.getIcon((_a = _ctx.data) == null ? void 0 : _a.type)
                    }, null, 8, ["name"]),
                    _createElementVNode(
                      "span",
                      {
                        class: _normalizeClass($setup.ns.e("title"))
                      },
                      _toDisplayString(((_b = _ctx.data) == null ? void 0 : _b.title) || "Artifact"),
                      3
                      /* TEXT, CLASS */
                    )
                  ],
                  2
                  /* CLASS */
                ),
                _createElementVNode(
                  "div",
                  {
                    class: _normalizeClass($setup.ns.e("actions"))
                  },
                  [
                    _createElementVNode(
                      "div",
                      {
                        class: _normalizeClass($setup.ns.e("tabs"))
                      },
                      [
                        _createElementVNode(
                          "button",
                          {
                            class: _normalizeClass([$setup.ns.e("tab"), $setup.ns.is("active", $setup.internalMode === "preview")]),
                            onClick: _cache[0] || (_cache[0] = ($event) => $setup.toggleMode("preview"))
                          },
                          _toDisplayString($setup.t("ai.artifacts.preview")),
                          3
                          /* TEXT, CLASS */
                        ),
                        ((_c = _ctx.data) == null ? void 0 : _c.type) === "html" ? (_openBlock(), _createElementBlock(
                          "button",
                          {
                            key: 0,
                            class: _normalizeClass([$setup.ns.e("tab"), $setup.ns.is("active", $setup.internalMode === "inline")]),
                            onClick: _cache[1] || (_cache[1] = ($event) => $setup.toggleMode("inline"))
                          },
                          _toDisplayString($setup.t("ai.artifacts.inline")),
                          3
                          /* TEXT, CLASS */
                        )) : _createCommentVNode("v-if", true),
                        _createElementVNode(
                          "button",
                          {
                            class: _normalizeClass([$setup.ns.e("tab"), $setup.ns.is("active", $setup.internalMode === "code")]),
                            onClick: _cache[2] || (_cache[2] = ($event) => $setup.toggleMode("code"))
                          },
                          _toDisplayString($setup.t("ai.artifacts.code")),
                          3
                          /* TEXT, CLASS */
                        )
                      ],
                      2
                      /* CLASS */
                    ),
                    _createVNode($setup["YhButton"], {
                      text: "",
                      circle: "",
                      onClick: $setup.handleClose
                    }, {
                      icon: _withCtx(() => [
                        _createVNode($setup["YhIcon"], { name: "close" })
                      ]),
                      _: 1
                      /* STABLE */
                    })
                  ],
                  2
                  /* CLASS */
                )
              ],
              2
              /* CLASS */
            ),
            _createCommentVNode(" Version Bar "),
            _ctx.data && _ctx.data.versions.length > 1 ? (_openBlock(), _createElementBlock(
              "div",
              {
                key: 0,
                class: _normalizeClass($setup.ns.e("version-bar"))
              },
              [
                _createElementVNode(
                  "div",
                  {
                    class: _normalizeClass($setup.ns.e("version-label"))
                  },
                  [
                    _createVNode($setup["YhIcon"], { name: "history" }),
                    _createElementVNode(
                      "span",
                      null,
                      _toDisplayString($setup.t("ai.artifacts.versions")),
                      1
                      /* TEXT */
                    )
                  ],
                  2
                  /* CLASS */
                ),
                _createElementVNode(
                  "div",
                  {
                    class: _normalizeClass($setup.ns.e("version-list"))
                  },
                  [
                    (_openBlock(true), _createElementBlock(
                      _Fragment,
                      null,
                      _renderList(_ctx.data.versions, (v) => {
                        return _openBlock(), _createElementBlock("div", {
                          key: v.version,
                          class: _normalizeClass([$setup.ns.e("version-item"), $setup.ns.is("active", v.version === $setup.currentVersionState)]),
                          onClick: ($event) => $setup.selectVersion(v)
                        }, " v" + _toDisplayString(v.version), 11, _hoisted_1);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ],
                  2
                  /* CLASS */
                )
              ],
              2
              /* CLASS */
            )) : _createCommentVNode("v-if", true),
            _createCommentVNode(" Content area "),
            _createElementVNode(
              "div",
              {
                class: _normalizeClass($setup.ns.e("content"))
              },
              [
                $setup.internalMode === "preview" || $setup.internalMode === "inline" ? (_openBlock(), _createElementBlock(
                  _Fragment,
                  { key: 0 },
                  [
                    ((_d = _ctx.data) == null ? void 0 : _d.type) === "html" || ((_e = _ctx.data) == null ? void 0 : _e.type) === "sandbox" ? (_openBlock(), _createElementBlock("iframe", {
                      key: 0,
                      src: $setup.sandboxSrc,
                      class: _normalizeClass($setup.ns.e("sandbox"))
                    }, null, 10, _hoisted_2)) : _createCommentVNode("v-if", true),
                    _createCommentVNode(" ECharts \u56FE\u8868 (\u4F7F\u7528 v-show \u4FDD\u6301 DOM) "),
                    _withDirectives(_createElementVNode(
                      "div",
                      {
                        class: _normalizeClass($setup.ns.e("echarts-wrapper")),
                        style: _normalizeStyle([$setup.chartContainerStyle, { "position": "relative" }])
                      },
                      [
                        _createElementVNode(
                          "div",
                          {
                            ref: "echartsRef",
                            class: _normalizeClass($setup.ns.e("echarts-container")),
                            style: { "width": "100%", "height": "100%" }
                          },
                          null,
                          2
                          /* CLASS */
                        ),
                        $setup.echartsLoading ? (_openBlock(), _createBlock($setup["YhSpin"], {
                          key: 0,
                          class: _normalizeClass($setup.ns.e("chart-loading")),
                          style: { "position": "absolute", "top": "50%", "left": "50%", "transform": "translate(-50%, -50%)" }
                        }, {
                          default: _withCtx(() => [
                            _createElementVNode(
                              "span",
                              null,
                              _toDisplayString(_ctx.chartLoadingText),
                              1
                              /* TEXT */
                            )
                          ]),
                          _: 1
                          /* STABLE */
                        }, 8, ["class"])) : $setup.echartsError ? (_openBlock(), _createElementBlock(
                          "div",
                          {
                            key: 1,
                            class: _normalizeClass($setup.ns.e("chart-error")),
                            style: { "position": "absolute", "top": "50%", "left": "50%", "transform": "translate(-50%, -50%)", "display": "flex", "flex-direction": "column", "align-items": "center" }
                          },
                          [
                            _createVNode($setup["YhIcon"], { name: "warning" }),
                            _createElementVNode(
                              "span",
                              null,
                              "\u56FE\u8868\u52A0\u8F7D\u5931\u8D25: " + _toDisplayString($setup.echartsError.message),
                              1
                              /* TEXT */
                            )
                          ],
                          2
                          /* CLASS */
                        )) : _createCommentVNode("v-if", true)
                      ],
                      6
                      /* CLASS, STYLE */
                    ), [
                      [_vShow, ((_f = _ctx.data) == null ? void 0 : _f.type) === "echarts"]
                    ]),
                    _createCommentVNode(" \u5176\u4ED6\u7C7B\u578B "),
                    ((_g = _ctx.data) == null ? void 0 : _g.type) !== "html" && ((_h = _ctx.data) == null ? void 0 : _h.type) !== "sandbox" && ((_i = _ctx.data) == null ? void 0 : _i.type) !== "echarts" ? (_openBlock(), _createElementBlock(
                      _Fragment,
                      { key: 1 },
                      [
                        _createCommentVNode(" \u901A\u7528\u56FE\u8868 "),
                        ((_j = _ctx.data) == null ? void 0 : _j.type) === "chart" ? (_openBlock(), _createElementBlock(
                          "div",
                          {
                            key: 0,
                            class: _normalizeClass($setup.ns.e("chart-container")),
                            style: _normalizeStyle($setup.chartContainerStyle)
                          },
                          [
                            _renderSlot(_ctx.$slots, "chart", {
                              data: $setup.currentVersionData,
                              title: _ctx.data.title
                            }, () => [
                              _createElementVNode(
                                "div",
                                {
                                  class: _normalizeClass($setup.ns.e("placeholder"))
                                },
                                [
                                  _createVNode($setup["YhIcon"], { name: "chart-bar" }),
                                  _createElementVNode(
                                    "p",
                                    null,
                                    _toDisplayString($setup.t("ai.artifacts.renderingChart")),
                                    1
                                    /* TEXT */
                                  )
                                ],
                                2
                                /* CLASS */
                              )
                            ])
                          ],
                          6
                          /* CLASS, STYLE */
                        )) : ((_k = _ctx.data) == null ? void 0 : _k.type) === "canvas" ? (_openBlock(), _createElementBlock(
                          _Fragment,
                          { key: 1 },
                          [
                            _createCommentVNode(" \u753B\u5E03 "),
                            _createElementVNode(
                              "div",
                              {
                                class: _normalizeClass($setup.ns.e("canvas-container"))
                              },
                              [
                                _renderSlot(_ctx.$slots, "canvas", { data: $setup.currentVersionData }, () => [
                                  _createElementVNode(
                                    "div",
                                    {
                                      class: _normalizeClass($setup.ns.e("placeholder"))
                                    },
                                    [
                                      _createVNode($setup["YhIcon"], { name: "edit" }),
                                      _createElementVNode(
                                        "p",
                                        null,
                                        _toDisplayString($setup.t("ai.artifacts.renderingCanvas")),
                                        1
                                        /* TEXT */
                                      )
                                    ],
                                    2
                                    /* CLASS */
                                  )
                                ])
                              ],
                              2
                              /* CLASS */
                            )
                          ],
                          2112
                          /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                        )) : (_openBlock(), _createElementBlock(
                          _Fragment,
                          { key: 2 },
                          [
                            _createCommentVNode(" \u5360\u4F4D "),
                            _createElementVNode(
                              "div",
                              {
                                class: _normalizeClass($setup.ns.e("placeholder"))
                              },
                              [
                                _createVNode($setup["YhIcon"], { name: "sparkles" }),
                                _createElementVNode(
                                  "p",
                                  null,
                                  _toDisplayString($setup.t("ai.artifacts.rendering")),
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
                        ))
                      ],
                      64
                      /* STABLE_FRAGMENT */
                    )) : _createCommentVNode("v-if", true)
                  ],
                  64
                  /* STABLE_FRAGMENT */
                )) : (_openBlock(), _createElementBlock(
                  _Fragment,
                  { key: 1 },
                  [
                    _createCommentVNode(" eslint-disable-next-line vue/no-v-html "),
                    _createElementVNode(
                      "pre",
                      {
                        class: _normalizeClass($setup.ns.e("code-viewer"))
                      },
                      [
                        _createElementVNode("code", { innerHTML: $setup.highlightedCode }, null, 8, _hoisted_3)
                      ],
                      2
                      /* CLASS */
                    )
                  ],
                  64
                  /* STABLE_FRAGMENT */
                ))
              ],
              2
              /* CLASS */
            ),
            _createCommentVNode(" Footer Info "),
            _createElementVNode(
              "div",
              {
                class: _normalizeClass($setup.ns.e("footer"))
              },
              [
                ((_l = $setup.currentVersionData) == null ? void 0 : _l.timestamp) ? (_openBlock(), _createElementBlock(
                  "span",
                  _hoisted_4,
                  _toDisplayString($setup.currentVersionData.timestamp),
                  1
                  /* TEXT */
                )) : _createCommentVNode("v-if", true),
                ((_m = $setup.currentVersionData) == null ? void 0 : _m.description) ? (_openBlock(), _createElementBlock(
                  "span",
                  _hoisted_5,
                  _toDisplayString($setup.currentVersionData.description),
                  1
                  /* TEXT */
                )) : _createCommentVNode("v-if", true)
              ],
              2
              /* CLASS */
            )
          ],
          6
          /* CLASS, STYLE */
        )) : _createCommentVNode("v-if", true)
      ];
    }),
    _: 3
    /* FORWARDED */
  });
}
import { useLocale } from "../../../hooks/index.js";
import { useNamespace } from "../../../hooks/use-namespace/index.js";
import { ref, computed, watch, onBeforeUnmount, nextTick, shallowRef } from "vue";
import {
  aiArtifactsProps,
  aiArtifactsEmits
} from "./ai-artifacts-meta.js";
import { YhIcon } from "../../icon/index.js";
import { YhButton } from "../../button/index.js";
import { YhSpin } from "../../spin/index.js";
import { useComponentTheme } from "../../../theme/component-theme.js";
import hljs from "../../highlight.js";
import "highlight.js/styles/atom-one-dark.css";
const __sfc__ = /* @__PURE__ */ Object.assign({
  name: "YhAiArtifacts"
}, {
  __name: "ai-artifacts",
  props: aiArtifactsProps,
  emits: aiArtifactsEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    var _a;
    __expose();
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("ai-artifacts");
    const { t } = useLocale();
    const { themeStyle } = useComponentTheme(
      "ai-artifacts",
      computed(() => props.themeOverrides)
    );
    const internalMode = ref(props.mode);
    const currentVersionState = ref(((_a = props.data) == null ? void 0 : _a.currentVersion) || "");
    const echartsRef = ref(null);
    const echartsInstance = shallowRef(null);
    const echartsLoading = ref(false);
    const echartsError = ref(null);
    watch(
      () => props.mode,
      (val) => {
        internalMode.value = val;
      }
    );
    watch(
      () => {
        var _a2;
        return (_a2 = props.data) == null ? void 0 : _a2.currentVersion;
      },
      (val) => {
        if (val) currentVersionState.value = val;
      }
    );
    const getIcon = (type) => {
      if (type === "code") return "code";
      if (type === "chart" || type === "echarts") return "chart-bar";
      if (type === "canvas") return "edit";
      if (type === "sandbox") return "play";
      if (type === "diagram") return "connection";
      return "document";
    };
    const currentVersionData = computed(() => {
      if (!props.data || props.data.versions.length === 0) return null;
      return props.data.versions.find((v) => v.version === currentVersionState.value) || props.data.versions[0];
    });
    const getEchartsOption = computed(() => {
      var _a2;
      if ((_a2 = props.data) == null ? void 0 : _a2.echartsOption) return props.data.echartsOption;
      return props.echartsOption;
    });
    const handleClose = () => {
      emit("update:visible", false);
      emit("close");
    };
    const toggleMode = (mode) => {
      internalMode.value = mode;
      emit("update:mode", mode);
    };
    const selectVersion = (v) => {
      currentVersionState.value = v.version;
      emit("version-change", v);
    };
    const sandboxSrc = computed(() => {
      var _a2;
      if (!currentVersionData.value || internalMode.value !== "preview" && internalMode.value !== "inline")
        return "";
      const content = currentVersionData.value.content;
      if (((_a2 = props.data) == null ? void 0 : _a2.type) === "html" && typeof window !== "undefined") {
        const blob = new Blob([content], { type: "text/html" });
        return URL.createObjectURL(blob);
      }
      return "";
    });
    const highlightedCode = computed(() => {
      var _a2, _b;
      let content = ((_a2 = currentVersionData.value) == null ? void 0 : _a2.content) || "";
      const type = ((_b = props.data) == null ? void 0 : _b.type) || "code";
      if (type === "echarts" && !content) {
        const opt = getEchartsOption.value;
        if (opt) {
          content = JSON.stringify(opt, null, 2);
        }
      }
      let lang = "typescript";
      if (type === "html") lang = "xml";
      if (type === "markdown") lang = "markdown";
      if (type === "react" || type === "vue") lang = "javascript";
      if (type === "echarts") lang = "json";
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(content, { language: lang, ignoreIllegals: true }).value;
        } catch (e) {
          return content;
        }
      }
      return hljs.highlightAuto(content).value;
    });
    const initECharts = async () => {
      var _a2;
      const chartType = (_a2 = props.data) == null ? void 0 : _a2.type;
      if (chartType !== "chart" && chartType !== "echarts") return;
      const chartOption = getEchartsOption.value;
      if (!chartOption) return;
      echartsLoading.value = true;
      echartsError.value = null;
      try {
        if (echartsInstance.value) {
          echartsInstance.value.dispose();
          echartsInstance.value = null;
        }
        let echarts;
        if (props.autoLoadECharts) {
          echarts = await import("echarts");
        } else {
          echarts = window.echarts;
        }
        if (!echarts || !echartsRef.value) return;
        echartsInstance.value = echarts.init(echartsRef.value, chartOption.theme || props.echartsTheme);
        if (chartOption.option) {
          if (chartOption.dataZoom !== false && props.echartsDataZoom) {
            chartOption.option.dataZoom = chartOption.option.dataZoom || [
              { type: "inside" },
              { type: "slider" }
            ];
          }
          if (chartOption.toolbox !== false && props.echartsToolbox) {
            chartOption.option.toolbox = chartOption.option.toolbox || {
              feature: {
                dataZoom: { yAxisIndex: "none" },
                restore: {},
                saveAsImage: {}
              }
            };
          }
          echartsInstance.value.setOption(chartOption.option);
        }
        echartsInstance.value.on("click", (params) => {
          emit("chart-click", params);
        });
        emit("chart-ready", echartsInstance.value);
        if (props.responsiveWidth) {
          const resizeObserver = new ResizeObserver(() => {
            var _a3;
            (_a3 = echartsInstance.value) == null ? void 0 : _a3.resize();
          });
          resizeObserver.observe(echartsRef.value);
        }
      } catch (error) {
        echartsError.value = error;
        emit("chart-error", error);
      } finally {
        echartsLoading.value = false;
      }
    };
    watch(
      () => {
        var _a2;
        return [props.visible, (_a2 = props.data) == null ? void 0 : _a2.type, getEchartsOption.value, internalMode.value];
      },
      ([newVisible, , , mode]) => {
        var _a2, _b;
        const isChart = ((_a2 = props.data) == null ? void 0 : _a2.type) === "chart" || ((_b = props.data) == null ? void 0 : _b.type) === "echarts";
        if (newVisible && isChart && (mode === "preview" || mode === "inline")) {
          nextTick(() => {
            initECharts();
          });
        }
      },
      { immediate: true }
    );
    onBeforeUnmount(() => {
      if (echartsInstance.value) {
        echartsInstance.value.dispose();
        echartsInstance.value = null;
      }
    });
    const chartContainerStyle = computed(() => ({
      height: typeof props.chartHeight === "number" ? props.chartHeight + "px" : props.chartHeight
    }));
    const __returned__ = { props, emit, ns, t, themeStyle, internalMode, currentVersionState, echartsRef, echartsInstance, echartsLoading, echartsError, getIcon, currentVersionData, getEchartsOption, handleClose, toggleMode, selectVersion, sandboxSrc, highlightedCode, initECharts, chartContainerStyle, get useNamespace() {
      return useNamespace;
    }, get useLocale() {
      return useLocale;
    }, ref, computed, watch, onBeforeUnmount, nextTick, shallowRef, get aiArtifactsProps() {
      return aiArtifactsProps;
    }, get aiArtifactsEmits() {
      return aiArtifactsEmits;
    }, get YhIcon() {
      return YhIcon;
    }, get YhButton() {
      return YhButton;
    }, get YhSpin() {
      return YhSpin;
    }, get useComponentTheme() {
      return useComponentTheme;
    }, get hljs() {
      return hljs;
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
