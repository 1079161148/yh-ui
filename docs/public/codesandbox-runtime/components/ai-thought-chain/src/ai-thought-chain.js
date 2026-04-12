import { createCommentVNode as _createCommentVNode, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, createElementVNode as _createElementVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, renderList as _renderList, Fragment as _Fragment, createVNode as _createVNode, createBlock as _createBlock, toDisplayString as _toDisplayString, withModifiers as _withModifiers, Transition as _Transition, withCtx as _withCtx, renderSlot as _renderSlot } from "vue";
const _hoisted_1 = ["draggable", "onDragstart", "onDragover", "onDrop"];
const _hoisted_2 = ["onClick"];
const _hoisted_3 = ["onClick"];
const _hoisted_4 = ["innerHTML"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock(), _createElementBlock(
    "div",
    {
      class: _normalizeClass([$setup.ns.b(), $setup.ns.is("expanded", $setup.isExpanded), $setup.ns.is("thinking", $setup.currentStatus === "thinking" || $setup.currentStatus === "loading"), $setup.ns.is("timeline", $setup.itemsToUse && $setup.itemsToUse.length > 0), $setup.ns.is("draggable", _ctx.draggable), _ctx.className]),
      style: _normalizeStyle([$setup.themeStyle, _ctx.style])
    },
    [
      _createCommentVNode(" \u8FDB\u5EA6\u6761 "),
      _ctx.showProgress && $setup.itemsToUse && $setup.itemsToUse.length > 0 ? (_openBlock(), _createElementBlock(
        "div",
        {
          key: 0,
          class: _normalizeClass($setup.ns.e("progress-bar"))
        },
        [
          _createElementVNode(
            "div",
            {
              class: _normalizeClass($setup.ns.e("progress-fill")),
              style: _normalizeStyle({
                width: $setup.currentProgress + "%"
              })
            },
            null,
            6
            /* CLASS, STYLE */
          )
        ],
        2
        /* CLASS */
      )) : _createCommentVNode("v-if", true),
      _createCommentVNode(" \u591A\u8282\u70B9\u65F6\u95F4\u8F74\u6A21\u5F0F "),
      $setup.itemsToUse && $setup.itemsToUse.length > 0 ? (_openBlock(), _createElementBlock(
        _Fragment,
        { key: 1 },
        [
          (_openBlock(true), _createElementBlock(
            _Fragment,
            null,
            _renderList($setup.itemsToUse, (item, index) => {
              return _openBlock(), _createElementBlock("div", {
                key: item.id || index,
                class: _normalizeClass([$setup.ns.e("item"), $setup.ns.is("last", index === _ctx.items.length - 1), $setup.ns.is("active", item.status === "thinking" || item.status === "loading"), $setup.ns.is("drag-over", $setup.dragOverIndex === index), $setup.ns.is("dragging", $setup.draggedIndex === index)]),
                draggable: _ctx.draggable,
                onDragstart: ($event) => $setup.handleDragStart($event, index),
                onDragover: ($event) => $setup.handleDragOver($event, index),
                onDragleave: $setup.handleDragLeave,
                onDrop: ($event) => $setup.handleDrop($event, index),
                onDragend: $setup.handleDragEnd
              }, [
                _createElementVNode(
                  "div",
                  {
                    class: _normalizeClass($setup.ns.e("item-dot-wrapper"))
                  },
                  [
                    _createElementVNode(
                      "div",
                      {
                        class: _normalizeClass([$setup.ns.e("item-dot"), $setup.ns.m(_ctx.dotSize), $setup.ns.m(item.status || "none")])
                      },
                      [
                        _createVNode($setup["YhIcon"], {
                          name: item.icon || $setup.getStatusIcon(item.status),
                          class: _normalizeClass({
                            "is-loading": item.status === "thinking" || item.status === "loading"
                          })
                        }, null, 8, ["name", "class"])
                      ],
                      2
                      /* CLASS */
                    ),
                    index < _ctx.items.length - 1 ? (_openBlock(), _createElementBlock(
                      "div",
                      {
                        key: 0,
                        class: _normalizeClass([$setup.ns.e("item-line"), {
                          "is-gradient": _ctx.lineGradient
                        }])
                      },
                      null,
                      2
                      /* CLASS */
                    )) : _createCommentVNode("v-if", true)
                  ],
                  2
                  /* CLASS */
                ),
                _createElementVNode(
                  "div",
                  {
                    class: _normalizeClass($setup.ns.e("item-main"))
                  },
                  [
                    _createElementVNode("div", {
                      class: _normalizeClass($setup.ns.e("item-header")),
                      onClick: ($event) => $setup.toggleItemExpand(index)
                    }, [
                      _createCommentVNode(" \u62D6\u62FD\u624B\u67C4 "),
                      _ctx.draggable ? (_openBlock(), _createBlock($setup["YhIcon"], {
                        key: 0,
                        name: "rank",
                        class: _normalizeClass($setup.ns.e("drag-handle"))
                      }, null, 8, ["class"])) : _createCommentVNode("v-if", true),
                      _createElementVNode(
                        "span",
                        {
                          class: _normalizeClass($setup.ns.e("item-title"))
                        },
                        _toDisplayString(item.title),
                        3
                        /* TEXT, CLASS */
                      ),
                      _createCommentVNode(" \u8282\u70B9\u8FDB\u5EA6 "),
                      item.progress !== void 0 ? (_openBlock(), _createElementBlock(
                        "span",
                        {
                          key: 1,
                          class: _normalizeClass($setup.ns.e("item-progress"))
                        },
                        _toDisplayString(item.progress) + "% ",
                        3
                        /* TEXT, CLASS */
                      )) : _createCommentVNode("v-if", true),
                      _createCommentVNode(" \u64CD\u4F5C\u6309\u94AE "),
                      _ctx.editable ? (_openBlock(), _createElementBlock(
                        "div",
                        {
                          key: 2,
                          class: _normalizeClass($setup.ns.e("item-actions")),
                          onClick: _cache[0] || (_cache[0] = _withModifiers(() => {
                          }, ["stop"]))
                        },
                        [
                          _createVNode($setup["YhIcon"], {
                            name: "delete",
                            class: _normalizeClass($setup.ns.e("action-icon")),
                            onClick: ($event) => $setup.handleDeleteNode(item, index)
                          }, null, 8, ["class", "onClick"]),
                          _createVNode($setup["YhIcon"], {
                            name: "plus",
                            class: _normalizeClass($setup.ns.e("action-icon")),
                            onClick: ($event) => $setup.handleAddNode(index)
                          }, null, 8, ["class", "onClick"])
                        ],
                        2
                        /* CLASS */
                      )) : _createCommentVNode("v-if", true),
                      item.content || item.description ? (_openBlock(), _createBlock($setup["YhIcon"], {
                        key: 3,
                        name: "arrow-down",
                        class: _normalizeClass([$setup.ns.e("item-arrow"), {
                          "is-expanded": $setup.itemExpandedStates[index]
                        }])
                      }, null, 8, ["class"])) : _createCommentVNode("v-if", true)
                    ], 10, _hoisted_2),
                    _createCommentVNode(" \u5185\u5BB9\u533A\u57DF "),
                    _createVNode(
                      _Transition,
                      { name: "yh-ai-thought-collapse" },
                      {
                        default: _withCtx(() => [
                          $setup.itemExpandedStates[index] && (item.content || item.description) ? (_openBlock(), _createElementBlock("div", {
                            key: 0,
                            class: _normalizeClass($setup.ns.e("item-content")),
                            onClick: ($event) => $setup.handleItemClick(item, index)
                          }, [
                            _createCommentVNode(" \u652F\u6301 Markdown\uFF1A\u5185\u5BB9\u6765\u81EA renderMarkdown\uFF0C\u4EC5\u7528\u4E8E\u53D7\u63A7\u7684\u601D\u7EF4\u94FE\u8282\u70B9 "),
                            _createCommentVNode(" eslint-disable vue/no-v-html "),
                            _ctx.markdown ? (_openBlock(), _createElementBlock("div", {
                              key: 0,
                              class: _normalizeClass($setup.ns.e("item-text")),
                              innerHTML: $setup.renderMarkdown(item.content || item.description || "")
                            }, null, 10, _hoisted_4)) : (_openBlock(), _createElementBlock(
                              _Fragment,
                              { key: 1 },
                              [
                                _createCommentVNode(" eslint-enable vue/no-v-html "),
                                _createCommentVNode(" \u7EAF\u6587\u672C "),
                                _createElementVNode(
                                  "div",
                                  {
                                    class: _normalizeClass($setup.ns.e("item-text"))
                                  },
                                  _toDisplayString(item.content || item.description),
                                  3
                                  /* TEXT, CLASS */
                                )
                              ],
                              2112
                              /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                            ))
                          ], 10, _hoisted_3)) : _createCommentVNode("v-if", true)
                        ]),
                        _: 2
                        /* DYNAMIC */
                      },
                      1024
                      /* DYNAMIC_SLOTS */
                    )
                  ],
                  2
                  /* CLASS */
                )
              ], 42, _hoisted_1);
            }),
            128
            /* KEYED_FRAGMENT */
          )),
          _createCommentVNode(" \u6DFB\u52A0\u8282\u70B9\u6309\u94AE "),
          _ctx.editable ? (_openBlock(), _createElementBlock(
            "div",
            {
              key: 0,
              class: _normalizeClass($setup.ns.e("add-node")),
              onClick: _cache[1] || (_cache[1] = ($event) => $setup.handleAddNode(_ctx.items.length))
            },
            [
              _createVNode($setup["YhIcon"], { name: "plus" }),
              _createElementVNode(
                "span",
                null,
                _toDisplayString($setup.t("ai.thoughtChain.addNode")),
                1
                /* TEXT */
              )
            ],
            2
            /* CLASS */
          )) : _createCommentVNode("v-if", true)
        ],
        64
        /* STABLE_FRAGMENT */
      )) : (_openBlock(), _createElementBlock(
        _Fragment,
        { key: 2 },
        [
          _createCommentVNode(" \u5355\u8282\u70B9/\u4F20\u7EDF\u6A21\u5F0F "),
          _createElementVNode(
            "div",
            {
              class: _normalizeClass($setup.ns.e("header")),
              onClick: $setup.toggleExpand
            },
            [
              _createElementVNode(
                "div",
                {
                  class: _normalizeClass($setup.ns.e("icon"))
                },
                [
                  _createVNode($setup["YhIcon"], {
                    name: $setup.getStatusIcon($setup.currentStatus),
                    class: _normalizeClass([$setup.ns.e("status-icon"), {
                      "is-loading": $setup.currentStatus === "thinking" || $setup.currentStatus === "loading"
                    }])
                  }, null, 8, ["name", "class"])
                ],
                2
                /* CLASS */
              ),
              _createElementVNode(
                "div",
                {
                  class: _normalizeClass($setup.ns.e("title"))
                },
                _toDisplayString($setup.displayTitle),
                3
                /* TEXT, CLASS */
              ),
              _createVNode($setup["YhIcon"], {
                name: "arrow-down",
                class: _normalizeClass([$setup.ns.e("arrow"), {
                  "is-expanded": $setup.isExpanded
                }])
              }, null, 8, ["class"])
            ],
            2
            /* CLASS */
          ),
          _createVNode(_Transition, { name: "yh-ai-thought-collapse" }, {
            default: _withCtx(() => [
              $setup.isExpanded ? (_openBlock(), _createElementBlock(
                "div",
                {
                  key: 0,
                  class: _normalizeClass($setup.ns.e("content"))
                },
                [
                  _renderSlot(_ctx.$slots, "default", {}, () => [
                    _createElementVNode(
                      "div",
                      {
                        class: _normalizeClass($setup.ns.e("text"))
                      },
                      _toDisplayString(_ctx.content),
                      3
                      /* TEXT, CLASS */
                    )
                  ])
                ],
                2
                /* CLASS */
              )) : _createCommentVNode("v-if", true)
            ]),
            _: 3
            /* FORWARDED */
          })
        ],
        64
        /* STABLE_FRAGMENT */
      ))
    ],
    6
    /* CLASS, STYLE */
  );
}
import { useLocale } from "../../../hooks/index.js";
import { useNamespace } from "../../../hooks/use-namespace/index.js";
import { ref, computed, watch } from "vue";
import { YhIcon } from "../../icon/index.js";
import MarkdownIt from "../../markdown-it.js";
import { aiThoughtChainProps, aiThoughtChainEmits } from "./ai-thought-chain-meta.js";
import { useComponentTheme } from "../../../theme/component-theme.js";
const __sfc__ = /* @__PURE__ */ Object.assign({
  name: "YhAiThoughtChain"
}, {
  __name: "ai-thought-chain",
  props: aiThoughtChainProps,
  emits: aiThoughtChainEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("ai-thought-chain");
    const { t } = useLocale();
    const { themeStyle } = useComponentTheme("ai-thought-chain", props.themeOverrides);
    const isExpanded = ref(false);
    const md = new MarkdownIt({
      html: false,
      linkify: true,
      typographer: true
    });
    const itemExpandedStates = ref([]);
    const internalItems = ref([]);
    const draggedIndex = ref(null);
    const dragOverIndex = ref(null);
    const itemsToUse = computed(() => {
      if (props.editable || props.draggable) {
        return internalItems.value.length > 0 ? internalItems.value : props.items;
      }
      return props.items;
    });
    watch(
      () => props.items,
      (newItems) => {
        if (Array.isArray(newItems)) {
          internalItems.value = [...newItems];
        } else {
          internalItems.value = [];
        }
      },
      { immediate: true, deep: true }
    );
    const ensureInternalItems = () => {
      if (!internalItems.value.length && props.items && props.items.length) {
        internalItems.value = [...props.items];
      }
    };
    const currentProgress = computed(() => {
      if (!itemsToUse.value || itemsToUse.value.length === 0) return 0;
      const completedCount = itemsToUse.value.filter(
        (item) => item.status === "success" || item.status === "complete"
      ).length;
      return Math.round(completedCount / itemsToUse.value.length * 100);
    });
    const currentStatus = computed(() => {
      if (props.status !== "none") return props.status;
      if (props.thinking === true) return "thinking";
      if (props.thinking === false) return "complete";
      return "none";
    });
    const displayTitle = computed(() => {
      if (props.title) return props.title;
      return currentStatus.value === "thinking" || currentStatus.value === "loading" ? t("ai.thoughtChain.thinking") : t("ai.thoughtChain.thoughtProcess");
    });
    const renderMarkdown = (content) => {
      if (!props.markdown || !content) return content;
      return md.render(content);
    };
    const getStatusIcon = (status = "none") => {
      switch (status) {
        case "thinking":
        case "loading":
          return "loading";
        case "success":
        case "complete":
          return "check-circle";
        case "error":
          return "circle-close";
        default:
          return "check-circle";
      }
    };
    watch(
      () => currentStatus.value,
      (newStatus) => {
        if (props.autoCollapse && (newStatus === "complete" || newStatus === "success")) {
          isExpanded.value = false;
        }
      }
    );
    watch(
      () => itemsToUse.value,
      (newItems) => {
        if (newItems && newItems.length > 0) {
          itemExpandedStates.value = newItems.map((item, index) => {
            if (item.expanded !== void 0) return item.expanded;
            return index === newItems.length - 1;
          });
        }
      },
      { immediate: true, deep: true }
    );
    const toggleExpand = () => {
      isExpanded.value = !isExpanded.value;
    };
    const toggleItemExpand = (index) => {
      itemExpandedStates.value[index] = !itemExpandedStates.value[index];
    };
    const handleItemClick = (item, index) => {
      if (item.clickable !== false) {
        emit("node-click", item, index);
      }
    };
    const handleDeleteNode = (item, index) => {
      emit("node-delete", item, index);
      if (!props.editable) return;
      ensureInternalItems();
      const newItems = [...internalItems.value];
      newItems.splice(index, 1);
      internalItems.value = newItems;
      emit("update:items", newItems);
      emit("reorder", newItems);
    };
    const handleAddNode = (index) => {
      emit("node-add", index);
      if (!props.editable) return;
      ensureInternalItems();
      const newItems = [...internalItems.value];
      newItems.splice(index + 1, 0, {
        title: t("ai.thoughtChain.defaultTitle"),
        status: "none"
      });
      internalItems.value = newItems;
      emit("update:items", newItems);
      emit("reorder", newItems);
    };
    const handleDragStart = (e, index) => {
      if (!props.draggable) return;
      draggedIndex.value = index;
      if (e.dataTransfer) {
        e.dataTransfer.effectAllowed = "move";
      }
    };
    const handleDragOver = (e, index) => {
      if (!props.draggable || draggedIndex.value === null) return;
      e.preventDefault();
      dragOverIndex.value = index;
    };
    const handleDragLeave = () => {
      dragOverIndex.value = null;
    };
    const handleDrop = (e, targetIndex) => {
      if (!props.draggable || draggedIndex.value === null) return;
      e.preventDefault();
      if (draggedIndex.value !== null) {
        ensureInternalItems();
        const newItems = [...internalItems.value];
        const [removed] = newItems.splice(draggedIndex.value, 1);
        newItems.splice(targetIndex, 0, removed);
        internalItems.value = newItems;
        emit("update:items", newItems);
        emit("reorder", newItems);
      }
      draggedIndex.value = null;
      dragOverIndex.value = null;
    };
    const handleDragEnd = () => {
      draggedIndex.value = null;
      dragOverIndex.value = null;
    };
    const __returned__ = { props, emit, ns, t, themeStyle, isExpanded, md, itemExpandedStates, internalItems, draggedIndex, dragOverIndex, itemsToUse, ensureInternalItems, currentProgress, currentStatus, displayTitle, renderMarkdown, getStatusIcon, toggleExpand, toggleItemExpand, handleItemClick, handleDeleteNode, handleAddNode, handleDragStart, handleDragOver, handleDragLeave, handleDrop, handleDragEnd, get useNamespace() {
      return useNamespace;
    }, get useLocale() {
      return useLocale;
    }, ref, computed, watch, get YhIcon() {
      return YhIcon;
    }, get MarkdownIt() {
      return MarkdownIt;
    }, get aiThoughtChainProps() {
      return aiThoughtChainProps;
    }, get aiThoughtChainEmits() {
      return aiThoughtChainEmits;
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
