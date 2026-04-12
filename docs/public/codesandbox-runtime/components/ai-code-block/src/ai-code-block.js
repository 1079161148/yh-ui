import { normalizeClass as _normalizeClass, openBlock as _openBlock, createBlock as _createBlock, createCommentVNode as _createCommentVNode, toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, renderSlot as _renderSlot, createVNode as _createVNode, createTextVNode as _createTextVNode, withCtx as _withCtx, withModifiers as _withModifiers, createElementBlock as _createElementBlock, renderList as _renderList, Fragment as _Fragment, vShow as _vShow, withDirectives as _withDirectives, normalizeStyle as _normalizeStyle } from "vue";
const _hoisted_1 = { key: 0 };
const _hoisted_2 = ["innerHTML"];
const _hoisted_3 = { key: 1 };
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock(), _createElementBlock(
    "div",
    {
      class: _normalizeClass([$setup.ns.b(), $setup.ns.is("collapsible", _ctx.collapsible), $setup.ns.is("collapsed", $setup.collapsed), $setup.ns.is("editing", $setup.isEditing)]),
      style: _normalizeStyle($setup.themeStyle)
    },
    [
      _createElementVNode(
        "div",
        {
          class: _normalizeClass($setup.ns.e("header")),
          onClick: $setup.toggleCollapse
        },
        [
          _createElementVNode(
            "div",
            {
              class: _normalizeClass($setup.ns.e("header-left"))
            },
            [
              _ctx.collapsible ? (_openBlock(), _createBlock($setup["YhIcon"], {
                key: 0,
                name: $setup.collapsed ? "arrow-right" : "arrow-down",
                class: _normalizeClass($setup.ns.e("collapse-icon"))
              }, null, 8, ["name", "class"])) : _createCommentVNode("v-if", true),
              _createElementVNode(
                "span",
                {
                  class: _normalizeClass($setup.ns.e("lang"))
                },
                _toDisplayString(_ctx.filename || _ctx.language),
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
              class: _normalizeClass($setup.ns.e("actions")),
              onClick: _cache[0] || (_cache[0] = _withModifiers(() => {
              }, ["stop"]))
            },
            [
              _renderSlot(_ctx.$slots, "actions"),
              _ctx.showEdit && !$setup.isEditing ? (_openBlock(), _createBlock($setup["YhButton"], {
                key: 0,
                size: "small",
                text: "",
                onClick: $setup.handleEdit,
                style: { "margin-right": "8px" }
              }, {
                icon: _withCtx(() => [
                  _createVNode($setup["YhIcon"], { name: "edit" })
                ]),
                default: _withCtx(() => [
                  _createTextVNode(
                    " " + _toDisplayString($setup.t("ai.codeBlock.edit")),
                    1
                    /* TEXT */
                  )
                ]),
                _: 1
                /* STABLE */
              })) : _createCommentVNode("v-if", true),
              _ctx.showRun ? (_openBlock(), _createBlock($setup["YhButton"], {
                key: 1,
                size: "small",
                text: "",
                onClick: $setup.handleRun,
                style: { "margin-right": "8px" }
              }, {
                icon: _withCtx(() => [
                  _createVNode($setup["YhIcon"], { name: "video-play" })
                ]),
                default: _withCtx(() => [
                  _createTextVNode(
                    " " + _toDisplayString($setup.t("ai.codeBlock.run")),
                    1
                    /* TEXT */
                  )
                ]),
                _: 1
                /* STABLE */
              })) : _createCommentVNode("v-if", true),
              _createVNode($setup["YhButton"], {
                size: "small",
                text: "",
                onClick: $setup.handleCopy
              }, {
                icon: _withCtx(() => [
                  _createVNode($setup["YhIcon"], {
                    name: $setup.copied ? "check" : "copy"
                  }, null, 8, ["name"])
                ]),
                default: _withCtx(() => [
                  _createTextVNode(
                    " " + _toDisplayString($setup.copied ? $setup.t("ai.codeBlock.copied") : $setup.t("ai.codeBlock.copyCode")),
                    1
                    /* TEXT */
                  )
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
      _withDirectives(_createElementVNode(
        "div",
        {
          class: _normalizeClass($setup.ns.e("body"))
        },
        [
          $setup.isEditing ? (_openBlock(), _createElementBlock(
            "div",
            {
              key: 0,
              class: _normalizeClass($setup.ns.e("editor-wrapper"))
            },
            [
              _createVNode($setup["YhAiCodeEditor"], {
                "initial-value": $setup.editCode,
                modelValue: $setup.editCode,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.editCode = $event),
                language: _ctx.language,
                height: 300
              }, null, 8, ["initial-value", "modelValue", "language"]),
              _createElementVNode(
                "div",
                {
                  class: _normalizeClass($setup.ns.e("editor-actions"))
                },
                [
                  _createVNode($setup["YhButton"], {
                    type: "primary",
                    size: "small",
                    onClick: $setup.handleSaveEdit
                  }, {
                    default: _withCtx(() => [
                      _createTextVNode(
                        _toDisplayString($setup.t("ai.codeBlock.save")),
                        1
                        /* TEXT */
                      )
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  _createVNode($setup["YhButton"], {
                    size: "small",
                    onClick: $setup.handleCancelEdit,
                    style: { "margin-left": "8px" }
                  }, {
                    default: _withCtx(() => [
                      _createTextVNode(
                        _toDisplayString($setup.t("ai.codeBlock.cancel")),
                        1
                        /* TEXT */
                      )
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
          )) : (_openBlock(), _createElementBlock(
            _Fragment,
            { key: 1 },
            [
              _ctx.showLineNumbers ? (_openBlock(), _createElementBlock(
                "div",
                {
                  key: 0,
                  class: _normalizeClass($setup.ns.e("line-numbers"))
                },
                [
                  (_openBlock(true), _createElementBlock(
                    _Fragment,
                    null,
                    _renderList($setup.lineCount, (n) => {
                      return _openBlock(), _createElementBlock(
                        "span",
                        {
                          key: n,
                          class: _normalizeClass([$setup.ns.e("line-number"), $setup.ns.is("active", _ctx.highlightLines.includes(n))])
                        },
                        _toDisplayString(n),
                        3
                        /* TEXT, CLASS */
                      );
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ],
                2
                /* CLASS */
              )) : _createCommentVNode("v-if", true),
              _createElementVNode(
                "div",
                {
                  class: _normalizeClass($setup.ns.e("content"))
                },
                [
                  !_ctx.$slots.default ? (_openBlock(), _createElementBlock("pre", _hoisted_1, [
                    _createCommentVNode(" eslint-disable-next-line vue/no-v-html "),
                    _createElementVNode("code", {
                      class: _normalizeClass(["hljs", _ctx.language ? "language-" + _ctx.language : ""]),
                      innerHTML: $setup.highlightedCodeLines.join("\n")
                    }, null, 10, _hoisted_2)
                  ])) : (_openBlock(), _createElementBlock("pre", _hoisted_3, [
                    _createElementVNode(
                      "code",
                      {
                        class: _normalizeClass(["hljs", _ctx.language ? "language-" + _ctx.language : ""])
                      },
                      [
                        _cache[2] || (_cache[2] = _createTextVNode(
                          "\n          ",
                          -1
                          /* CACHED */
                        )),
                        _renderSlot(_ctx.$slots, "default"),
                        _cache[3] || (_cache[3] = _createTextVNode(
                          "\n        ",
                          -1
                          /* CACHED */
                        ))
                      ],
                      2
                      /* CLASS */
                    )
                  ]))
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
      ), [
        [_vShow, !$setup.collapsed]
      ])
    ],
    6
    /* CLASS, STYLE */
  );
}
import { useLocale } from "../../../hooks/index.js";
import { useNamespace } from "../../../hooks/use-namespace/index.js";
import { ref, computed, watch, useSlots, Comment, Text } from "vue";
import { YhButton } from "../../button/index.js";
import { YhIcon } from "../../icon/index.js";
import hljs from "../../highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import { aiCodeBlockProps, aiCodeBlockEmits } from "./ai-code-block-meta.js";
import { useComponentTheme } from "../../../theme/component-theme.js";
import YhAiCodeEditor from "../../ai-code-editor/index.js";
const __sfc__ = /* @__PURE__ */ Object.assign({
  name: "YhAiCodeBlock"
}, {
  __name: "ai-code-block",
  props: aiCodeBlockProps,
  emits: aiCodeBlockEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("ai-code-block");
    const { t } = useLocale();
    const { themeStyle } = useComponentTheme("ai-code-block", props.themeOverrides);
    const slots = useSlots();
    function normalizeCodeLines(code) {
      if (!code) return "";
      return code.replace(/\\n/g, "\n").trim();
    }
    const copied = ref(false);
    const collapsed = ref(props.defaultCollapsed);
    const isEditing = ref(false);
    function getVNodeText(node) {
      if (node == null) return "";
      if (typeof node === "string" || typeof node === "number") return String(node);
      if (Array.isArray(node)) return node.map(getVNodeText).join("");
      const vnode = node;
      if (vnode.type === Comment) return "";
      if (vnode.type === Text) return typeof vnode.children === "string" ? vnode.children : "";
      const children = vnode.children;
      if (typeof children === "string" || typeof children === "number") return String(children);
      if (Array.isArray(children)) return children.map(getVNodeText).join("");
      return "";
    }
    const slotCode = computed(() => {
      var _a, _b;
      const vnodes = (_b = (_a = slots.default) == null ? void 0 : _a.call(slots)) != null ? _b : [];
      return normalizeCodeLines(vnodes.map(getVNodeText).join(""));
    });
    const normalizedCode = computed(() => {
      const fromProp = normalizeCodeLines(props.code);
      return fromProp || slotCode.value;
    });
    const editCode = ref(normalizedCode.value);
    const lineCount = computed(() => {
      return normalizedCode.value ? normalizedCode.value.split("\n").length : 0;
    });
    const highlightedCodeLines = computed(() => {
      if (!normalizedCode.value) return [];
      let html = normalizedCode.value;
      try {
        if (props.highlight) {
          if (props.language && hljs.getLanguage(props.language)) {
            html = hljs.highlight(normalizedCode.value, {
              language: props.language,
              ignoreIllegals: true
            }).value;
          } else {
            html = hljs.highlightAuto(normalizedCode.value).value;
          }
        }
      } catch (err) {
        console.error("Highlight error:", err);
      }
      return html.split("\n").map((line, idx) => {
        const isHighlighted = props.highlightLines.includes(idx + 1);
        return `<div class="${ns.e("line")} ${isHighlighted ? "is-active" : ""}">${line === "" ? " " : line}</div>`;
      });
    });
    const handleCopy = async () => {
      if (!normalizedCode.value) return;
      try {
        await navigator.clipboard.writeText(normalizedCode.value);
        copied.value = true;
        emit("copy", normalizedCode.value);
        setTimeout(() => {
          copied.value = false;
        }, 2e3);
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    };
    const handleRun = () => {
      emit("run", normalizedCode.value);
    };
    const handleEdit = () => {
      const code = normalizedCode.value;
      editCode.value = code;
      isEditing.value = true;
      emit("edit", code);
    };
    const handleSaveEdit = () => {
      emit("update", editCode.value);
      isEditing.value = false;
    };
    const handleCancelEdit = () => {
      editCode.value = normalizedCode.value;
      isEditing.value = false;
    };
    watch(normalizedCode, (val) => {
      if (!isEditing.value) {
        editCode.value = val;
      }
    });
    const toggleCollapse = () => {
      if (props.collapsible) {
        collapsed.value = !collapsed.value;
      }
    };
    const __returned__ = { props, emit, ns, t, themeStyle, slots, normalizeCodeLines, copied, collapsed, isEditing, getVNodeText, slotCode, normalizedCode, editCode, lineCount, highlightedCodeLines, handleCopy, handleRun, handleEdit, handleSaveEdit, handleCancelEdit, toggleCollapse, get useNamespace() {
      return useNamespace;
    }, get useLocale() {
      return useLocale;
    }, ref, computed, watch, useSlots, Comment, Text, get YhButton() {
      return YhButton;
    }, get YhIcon() {
      return YhIcon;
    }, get hljs() {
      return hljs;
    }, get aiCodeBlockProps() {
      return aiCodeBlockProps;
    }, get aiCodeBlockEmits() {
      return aiCodeBlockEmits;
    }, get useComponentTheme() {
      return useComponentTheme;
    }, get YhAiCodeEditor() {
      return YhAiCodeEditor;
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
