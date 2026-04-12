import { createCommentVNode as _createCommentVNode, renderSlot as _renderSlot, createElementVNode as _createElementVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, normalizeClass as _normalizeClass, renderList as _renderList, Fragment as _Fragment, vModelText as _vModelText, withKeys as _withKeys, withModifiers as _withModifiers, withDirectives as _withDirectives, TransitionGroup as _TransitionGroup, withCtx as _withCtx, createVNode as _createVNode, normalizeStyle as _normalizeStyle } from "vue";
const _hoisted_1 = ["onClick"];
const _hoisted_2 = ["title"];
const _hoisted_3 = ["onBlur", "onKeydown"];
const _hoisted_4 = ["title", "onClick"];
const _hoisted_5 = ["onClick"];
const _hoisted_6 = ["onClick"];
const _hoisted_7 = ["onClick"];
const _hoisted_8 = ["title"];
const _hoisted_9 = ["onClick"];
const _hoisted_10 = ["onClick"];
const _hoisted_11 = ["onClick"];
const _hoisted_12 = ["title"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock(), _createElementBlock(
    "div",
    {
      class: _normalizeClass([$setup.ns.b(), $setup.ns.is("loading", _ctx.loading)]),
      style: _normalizeStyle($setup.themeStyle)
    },
    [
      _createElementVNode(
        "div",
        {
          class: _normalizeClass($setup.ns.e("header"))
        },
        [
          _createCommentVNode(" Create New Button "),
          _createElementVNode(
            "button",
            {
              class: _normalizeClass($setup.ns.e("add-btn")),
              onClick: $setup.handleCreate
            },
            [
              _renderSlot(_ctx.$slots, "add-icon", {}, () => [
                _cache[5] || (_cache[5] = _createElementVNode(
                  "svg",
                  {
                    viewBox: "0 0 24 24",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg"
                  },
                  [
                    _createElementVNode("path", {
                      d: "M12 5V19M5 12H19",
                      stroke: "currentColor",
                      "stroke-width": "2",
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round"
                    })
                  ],
                  -1
                  /* CACHED */
                ))
              ]),
              _createElementVNode(
                "span",
                {
                  class: _normalizeClass($setup.ns.e("add-text"))
                },
                [
                  _renderSlot(_ctx.$slots, "add-text", {}, () => [
                    _createTextVNode(
                      _toDisplayString($setup.t("ai.conversations.newConversation")),
                      1
                      /* TEXT */
                    )
                  ])
                ],
                2
                /* CLASS */
              )
            ],
            2
            /* CLASS */
          )
        ],
        2
        /* CLASS */
      ),
      _createCommentVNode(" Loading Skeleton "),
      _ctx.loading && _ctx.data.length === 0 ? (_openBlock(), _createElementBlock(
        "div",
        {
          key: 0,
          class: _normalizeClass($setup.ns.e("loading-placer"))
        },
        [
          (_openBlock(), _createElementBlock(
            _Fragment,
            null,
            _renderList(5, (i) => {
              return _createElementVNode(
                "div",
                {
                  key: i,
                  class: _normalizeClass($setup.ns.e("skeleton-item"))
                },
                [
                  _createElementVNode(
                    "div",
                    {
                      class: _normalizeClass($setup.ns.e("skeleton-line"))
                    },
                    null,
                    2
                    /* CLASS */
                  ),
                  _createElementVNode(
                    "div",
                    {
                      class: _normalizeClass($setup.ns.e("skeleton-line")),
                      style: { "width": "60%" }
                    },
                    null,
                    2
                    /* CLASS */
                  )
                ],
                2
                /* CLASS */
              );
            }),
            64
            /* STABLE_FRAGMENT */
          ))
        ],
        2
        /* CLASS */
      )) : (_openBlock(), _createElementBlock(
        _Fragment,
        { key: 1 },
        [
          _createCommentVNode(" Conversation List with groups "),
          _createElementVNode(
            "div",
            {
              ref: "virtualScrollContainerRef",
              class: _normalizeClass([$setup.ns.e("list"), $setup.ns.is("virtual", _ctx.virtualScroll)]),
              style: _normalizeStyle($setup.listStyle),
              onScrollPassive: _cache[4] || (_cache[4] = ($event) => _ctx.virtualScroll ? $setup.handleVirtualScroll($event) : void 0)
            },
            [
              _createCommentVNode(" \u65F6\u95F4\u5206\u7EC4\u6E32\u67D3 "),
              $setup.groupedData.length > 0 ? (_openBlock(true), _createElementBlock(
                _Fragment,
                { key: 0 },
                _renderList($setup.groupedData, (group) => {
                  return _openBlock(), _createElementBlock(
                    _Fragment,
                    {
                      key: group.label
                    },
                    [
                      _createCommentVNode(" \u5206\u7EC4\u6807\u9898 "),
                      _createElementVNode(
                        "div",
                        {
                          class: _normalizeClass($setup.ns.e("group-label"))
                        },
                        [
                          _renderSlot(_ctx.$slots, "group-label", {
                            label: group.label
                          }, () => [
                            _createTextVNode(
                              _toDisplayString($setup.t(`ai.conversations.${group.label}`)),
                              1
                              /* TEXT */
                            )
                          ])
                        ],
                        2
                        /* CLASS */
                      ),
                      _createCommentVNode(" \u5206\u7EC4\u5185\u7684\u5BF9\u8BDD\u9879 "),
                      _createVNode(
                        _TransitionGroup,
                        {
                          name: "yh-conversation-item",
                          tag: "div"
                        },
                        {
                          default: _withCtx(() => [
                            (_openBlock(true), _createElementBlock(
                              _Fragment,
                              null,
                              _renderList(group.items, (item) => {
                                return _openBlock(), _createElementBlock("div", {
                                  key: item.id,
                                  class: _normalizeClass([$setup.ns.e("item"), $setup.ns.is("active", _ctx.activeId === item.id), $setup.ns.is("pinned", !!item.pinned)]),
                                  onClick: ($event) => $setup.handleClick(item)
                                }, [
                                  _createCommentVNode(" \u7F6E\u9876\u56FE\u6807 "),
                                  item.pinned ? (_openBlock(), _createElementBlock(
                                    "span",
                                    {
                                      key: 0,
                                      class: _normalizeClass($setup.ns.e("pin-icon"))
                                    },
                                    [..._cache[6] || (_cache[6] = [
                                      _createElementVNode(
                                        "svg",
                                        {
                                          viewBox: "0 0 24 24",
                                          width: "12",
                                          height: "12",
                                          fill: "currentColor"
                                        },
                                        [
                                          _createElementVNode("path", { d: "M16 12V4h1a1 1 0 0 0 0-2H7a1 1 0 0 0 0 2h1v8l-2 2v2h5v5l1 1 1-1v-5h5v-2l-2-2z" })
                                        ],
                                        -1
                                        /* CACHED */
                                      )
                                    ])],
                                    2
                                    /* CLASS */
                                  )) : _createCommentVNode("v-if", true),
                                  _createCommentVNode(" Item Info "),
                                  _createElementVNode(
                                    "div",
                                    {
                                      class: _normalizeClass($setup.ns.e("item-content"))
                                    },
                                    [
                                      !$setup.editingId || $setup.editingId !== item.id ? (_openBlock(), _createElementBlock("span", {
                                        key: 0,
                                        class: _normalizeClass($setup.ns.e("title")),
                                        title: item.title
                                      }, _toDisplayString(item.title), 11, _hoisted_2)) : _withDirectives((_openBlock(), _createElementBlock("input", {
                                        key: 1,
                                        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.editTitle = $event),
                                        class: _normalizeClass($setup.ns.e("input")),
                                        onBlur: ($event) => $setup.confirmEdit(item),
                                        onKeydown: [
                                          _withKeys(($event) => $setup.confirmEdit(item), ["enter"]),
                                          _withKeys($setup.cancelEdit, ["esc"])
                                        ],
                                        onClick: _cache[1] || (_cache[1] = _withModifiers(() => {
                                        }, ["stop"])),
                                        ref_for: true,
                                        ref: "inputRef"
                                      }, null, 42, _hoisted_3)), [
                                        [_vModelText, $setup.editTitle]
                                      ]),
                                      item.updatedAt ? (_openBlock(), _createElementBlock(
                                        "span",
                                        {
                                          key: 2,
                                          class: _normalizeClass($setup.ns.e("time"))
                                        },
                                        _toDisplayString($setup.formatTime(item.updatedAt)),
                                        3
                                        /* TEXT, CLASS */
                                      )) : _createCommentVNode("v-if", true),
                                      item.excerpt ? (_openBlock(), _createElementBlock(
                                        "span",
                                        {
                                          key: 3,
                                          class: _normalizeClass($setup.ns.e("excerpt"))
                                        },
                                        _toDisplayString(item.excerpt),
                                        3
                                        /* TEXT, CLASS */
                                      )) : _createCommentVNode("v-if", true)
                                    ],
                                    2
                                    /* CLASS */
                                  ),
                                  _createCommentVNode(" Actions "),
                                  !$setup.editingId || $setup.editingId !== item.id ? (_openBlock(), _createElementBlock(
                                    "div",
                                    {
                                      key: 1,
                                      class: _normalizeClass($setup.ns.e("actions")),
                                      onClick: _cache[2] || (_cache[2] = _withModifiers(() => {
                                      }, ["stop"]))
                                    },
                                    [
                                      _createCommentVNode(" \u7F6E\u9876/\u53D6\u6D88\u7F6E\u9876 "),
                                      _createElementVNode("span", {
                                        class: _normalizeClass([$setup.ns.e("action-btn"), $setup.ns.is("active", !!item.pinned)]),
                                        title: item.pinned ? $setup.t("ai.conversations.unpin") : $setup.t("ai.conversations.pin"),
                                        onClick: _withModifiers(($event) => $setup.handlePin(item), ["stop"])
                                      }, [..._cache[7] || (_cache[7] = [
                                        _createElementVNode(
                                          "svg",
                                          {
                                            viewBox: "0 0 24 24",
                                            width: "13",
                                            height: "13",
                                            fill: "none",
                                            stroke: "currentColor",
                                            "stroke-width": "2"
                                          },
                                          [
                                            _createElementVNode("path", { d: "M16 12V4h1a1 1 0 0 0 0-2H7a1 1 0 0 0 0 2h1v8l-2 2v2h5v5l1 1 1-1v-5h5v-2l-2-2z" })
                                          ],
                                          -1
                                          /* CACHED */
                                        )
                                      ])], 10, _hoisted_4),
                                      _createCommentVNode(" Edit Icon "),
                                      _createElementVNode("span", {
                                        class: _normalizeClass($setup.ns.e("action-btn")),
                                        onClick: _withModifiers(($event) => $setup.startEdit(item), ["stop"])
                                      }, [
                                        _renderSlot(_ctx.$slots, "edit-icon", {}, () => [
                                          _cache[8] || (_cache[8] = _createElementVNode(
                                            "svg",
                                            {
                                              viewBox: "0 0 24 24",
                                              fill: "none",
                                              stroke: "currentColor",
                                              "stroke-width": "2",
                                              "stroke-linecap": "round",
                                              "stroke-linejoin": "round"
                                            },
                                            [
                                              _createElementVNode("path", { d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" }),
                                              _createElementVNode("path", { d: "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" })
                                            ],
                                            -1
                                            /* CACHED */
                                          ))
                                        ])
                                      ], 10, _hoisted_5),
                                      _createCommentVNode(" Delete Icon "),
                                      _createElementVNode("span", {
                                        class: _normalizeClass($setup.ns.e("action-btn")),
                                        onClick: _withModifiers(($event) => $setup.handleDelete(item), ["stop"])
                                      }, [
                                        _renderSlot(_ctx.$slots, "delete-icon", {}, () => [
                                          _cache[9] || (_cache[9] = _createElementVNode(
                                            "svg",
                                            {
                                              viewBox: "0 0 24 24",
                                              fill: "none",
                                              stroke: "currentColor",
                                              "stroke-width": "2",
                                              "stroke-linecap": "round",
                                              "stroke-linejoin": "round"
                                            },
                                            [
                                              _createElementVNode("polyline", { points: "3 6 5 6 21 6" }),
                                              _createElementVNode("path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" }),
                                              _createElementVNode("line", {
                                                x1: "10",
                                                y1: "11",
                                                x2: "10",
                                                y2: "17"
                                              }),
                                              _createElementVNode("line", {
                                                x1: "14",
                                                y1: "11",
                                                x2: "14",
                                                y2: "17"
                                              })
                                            ],
                                            -1
                                            /* CACHED */
                                          ))
                                        ])
                                      ], 10, _hoisted_6)
                                    ],
                                    2
                                    /* CLASS */
                                  )) : _createCommentVNode("v-if", true)
                                ], 10, _hoisted_1);
                              }),
                              128
                              /* KEYED_FRAGMENT */
                            ))
                          ]),
                          _: 2
                          /* DYNAMIC */
                        },
                        1024
                        /* DYNAMIC_SLOTS */
                      )
                    ],
                    64
                    /* STABLE_FRAGMENT */
                  );
                }),
                128
                /* KEYED_FRAGMENT */
              )) : _ctx.data.length > 0 && !$setup.showGroups ? (_openBlock(), _createElementBlock(
                _Fragment,
                { key: 1 },
                [
                  _createCommentVNode(" Flat \u6A21\u5F0F\uFF08\u672A\u5206\u7EC4\uFF09"),
                  _createCommentVNode(" \u865A\u62DF\u6EDA\u52A8\u6A21\u5F0F "),
                  _ctx.virtualScroll ? (_openBlock(), _createElementBlock(
                    _Fragment,
                    { key: 0 },
                    [
                      _createCommentVNode(" \u5916\u5C42\uFF1Aposition:relative + \u603B\u9AD8\u5EA6\uFF0C\u4EA7\u751F\u771F\u5B9E\u6EDA\u52A8\u6761 "),
                      _createElementVNode(
                        "div",
                        {
                          style: _normalizeStyle({
                            position: "relative",
                            height: $setup.totalHeight + "px"
                          })
                        },
                        [
                          _createCommentVNode(" \u5185\u5C42\uFF1Aposition:absolute + top:offsetY\uFF0C\u5B9A\u4F4D\u5230\u5F53\u524D\u53EF\u89C1\u533A\u57DF "),
                          _createElementVNode(
                            "div",
                            {
                              style: _normalizeStyle({
                                position: "absolute",
                                top: $setup.offsetY + "px",
                                left: 0,
                                right: 0
                              })
                            },
                            [
                              (_openBlock(true), _createElementBlock(
                                _Fragment,
                                null,
                                _renderList($setup.visibleItems, (item) => {
                                  return _openBlock(), _createElementBlock("div", {
                                    key: item.id,
                                    class: _normalizeClass([$setup.ns.e("item"), $setup.ns.is("active", _ctx.activeId === item.id), $setup.ns.is("pinned", !!item.pinned)]),
                                    style: _normalizeStyle({
                                      height: _ctx.virtualScrollItemHeight + "px"
                                    }),
                                    onClick: ($event) => $setup.handleClick(item)
                                  }, [
                                    item.pinned ? (_openBlock(), _createElementBlock(
                                      "span",
                                      {
                                        key: 0,
                                        class: _normalizeClass($setup.ns.e("pin-icon"))
                                      },
                                      [..._cache[10] || (_cache[10] = [
                                        _createElementVNode(
                                          "svg",
                                          {
                                            viewBox: "0 0 24 24",
                                            width: "12",
                                            height: "12",
                                            fill: "currentColor"
                                          },
                                          [
                                            _createElementVNode("path", { d: "M16 12V4h1a1 1 0 0 0 0-2H7a1 1 0 0 0 0 2h1v8l-2 2v2h5v5l1 1 1-1v-5h5v-2l-2-2z" })
                                          ],
                                          -1
                                          /* CACHED */
                                        )
                                      ])],
                                      2
                                      /* CLASS */
                                    )) : _createCommentVNode("v-if", true),
                                    _createElementVNode(
                                      "div",
                                      {
                                        class: _normalizeClass($setup.ns.e("item-content"))
                                      },
                                      [
                                        _createElementVNode("span", {
                                          class: _normalizeClass($setup.ns.e("title")),
                                          title: item.title
                                        }, _toDisplayString(item.title), 11, _hoisted_8),
                                        item.updatedAt ? (_openBlock(), _createElementBlock(
                                          "span",
                                          {
                                            key: 0,
                                            class: _normalizeClass($setup.ns.e("time"))
                                          },
                                          _toDisplayString($setup.formatTime(item.updatedAt)),
                                          3
                                          /* TEXT, CLASS */
                                        )) : _createCommentVNode("v-if", true)
                                      ],
                                      2
                                      /* CLASS */
                                    ),
                                    !$setup.editingId || $setup.editingId !== item.id ? (_openBlock(), _createElementBlock(
                                      "div",
                                      {
                                        key: 1,
                                        class: _normalizeClass($setup.ns.e("actions")),
                                        onClick: _cache[3] || (_cache[3] = _withModifiers(() => {
                                        }, ["stop"]))
                                      },
                                      [
                                        _createElementVNode("span", {
                                          class: _normalizeClass([$setup.ns.e("action-btn"), $setup.ns.is("active", !!item.pinned)]),
                                          onClick: _withModifiers(($event) => $setup.handlePin(item), ["stop"])
                                        }, [..._cache[11] || (_cache[11] = [
                                          _createElementVNode(
                                            "svg",
                                            {
                                              viewBox: "0 0 24 24",
                                              width: "13",
                                              height: "13",
                                              fill: "none",
                                              stroke: "currentColor",
                                              "stroke-width": "2"
                                            },
                                            [
                                              _createElementVNode("path", { d: "M16 12V4h1a1 1 0 0 0 0-2H7a1 1 0 0 0 0 2h1v8l-2 2v2h5v5l1 1 1-1v-5h5v-2l-2-2z" })
                                            ],
                                            -1
                                            /* CACHED */
                                          )
                                        ])], 10, _hoisted_9),
                                        _createElementVNode("span", {
                                          class: _normalizeClass($setup.ns.e("action-btn")),
                                          onClick: _withModifiers(($event) => $setup.handleDelete(item), ["stop"])
                                        }, [..._cache[12] || (_cache[12] = [
                                          _createElementVNode(
                                            "svg",
                                            {
                                              viewBox: "0 0 24 24",
                                              fill: "none",
                                              stroke: "currentColor",
                                              "stroke-width": "2"
                                            },
                                            [
                                              _createElementVNode("polyline", { points: "3 6 5 6 21 6" }),
                                              _createElementVNode("path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" })
                                            ],
                                            -1
                                            /* CACHED */
                                          )
                                        ])], 10, _hoisted_10)
                                      ],
                                      2
                                      /* CLASS */
                                    )) : _createCommentVNode("v-if", true)
                                  ], 14, _hoisted_7);
                                }),
                                128
                                /* KEYED_FRAGMENT */
                              ))
                            ],
                            4
                            /* STYLE */
                          )
                        ],
                        4
                        /* STYLE */
                      )
                    ],
                    64
                    /* STABLE_FRAGMENT */
                  )) : (_openBlock(), _createElementBlock(
                    _Fragment,
                    { key: 1 },
                    [
                      _createCommentVNode(" \u666E\u901A\u6A21\u5F0F "),
                      (_openBlock(true), _createElementBlock(
                        _Fragment,
                        null,
                        _renderList(_ctx.data, (item) => {
                          return _openBlock(), _createElementBlock("div", {
                            key: item.id,
                            class: _normalizeClass([$setup.ns.e("item"), $setup.ns.is("active", _ctx.activeId === item.id)]),
                            onClick: ($event) => $setup.handleClick(item)
                          }, [
                            _createElementVNode(
                              "div",
                              {
                                class: _normalizeClass($setup.ns.e("item-content"))
                              },
                              [
                                _createElementVNode("span", {
                                  class: _normalizeClass($setup.ns.e("title")),
                                  title: item.title
                                }, _toDisplayString(item.title), 11, _hoisted_12)
                              ],
                              2
                              /* CLASS */
                            )
                          ], 10, _hoisted_11);
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ],
                    64
                    /* STABLE_FRAGMENT */
                  ))
                ],
                64
                /* STABLE_FRAGMENT */
              )) : _createCommentVNode("v-if", true),
              _createCommentVNode(" Empty State "),
              !_ctx.loading && _ctx.data.length === 0 ? (_openBlock(), _createElementBlock(
                "div",
                {
                  key: 2,
                  class: _normalizeClass($setup.ns.e("empty"))
                },
                [
                  _renderSlot(_ctx.$slots, "empty", {}, () => [
                    _createTextVNode(
                      _toDisplayString($setup.t("ai.conversations.noData")),
                      1
                      /* TEXT */
                    )
                  ])
                ],
                2
                /* CLASS */
              )) : _createCommentVNode("v-if", true)
            ],
            38
            /* CLASS, STYLE, NEED_HYDRATION */
          )
        ],
        2112
        /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
      ))
    ],
    6
    /* CLASS, STYLE */
  );
}
import { ref, computed, nextTick } from "vue";
import { useLocale, useVirtualScroll } from "../../../hooks/index.js";
import { useNamespace } from "../../../hooks/use-namespace/index.js";
import { useComponentTheme } from "../../../theme/component-theme.js";
import { aiConversationsProps, aiConversationsEmits } from "./ai-conversations-meta.js";
const __sfc__ = /* @__PURE__ */ Object.assign({
  name: "YhAiConversations"
}, {
  __name: "ai-conversations",
  props: aiConversationsProps,
  emits: aiConversationsEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("ai-conversations");
    const { t } = useLocale();
    const { themeStyle } = useComponentTheme("ai-conversations", props.themeOverrides);
    const editingId = ref(null);
    const editTitle = ref("");
    const inputRef = ref();
    const showGroups = computed(() => props.grouped !== false && !props.virtualScroll);
    const {
      visibleItems,
      totalHeight,
      offsetY,
      onScroll: handleVirtualScroll,
      scrollToIndex
    } = useVirtualScroll({
      itemHeight: computed(() => props.virtualScrollItemHeight),
      containerHeight: computed(() => props.virtualScrollHeight),
      overscan: computed(() => props.virtualScrollOverscan),
      items: computed(() => props.data)
    });
    const listStyle = computed(() => {
      if (!props.virtualScroll) return {};
      return {
        height: `${props.virtualScrollHeight}px`,
        maxHeight: `${props.virtualScrollHeight}px`,
        overflowY: "auto",
        position: "relative"
      };
    });
    const getGroupKey = (item) => {
      if (item.pinned) return "pinned";
      const diff = Date.now() - item.updatedAt;
      const oneDay = 864e5;
      if (diff < oneDay) return "today";
      if (diff < 7 * oneDay) return "last7Days";
      if (diff < 30 * oneDay) return "last30Days";
      return "earlier";
    };
    const groupedData = computed(() => {
      if (!showGroups.value) return [];
      const groups = {
        pinned: [],
        today: [],
        last7Days: [],
        last30Days: [],
        earlier: []
      };
      for (const item of props.data) {
        groups[getGroupKey(item)].push(item);
      }
      const order = ["pinned", "today", "last7Days", "last30Days", "earlier"];
      return order.filter((k) => groups[k].length > 0).map((k) => ({ label: k, items: groups[k] }));
    });
    const handleCreate = () => emit("create");
    const handleClick = (item) => {
      if (editingId.value === item.id) return;
      emit("update:activeId", item.id);
      emit("click", item);
    };
    const handleDelete = (item) => emit("delete", item);
    const handlePin = (item) => emit("pin", item, !item.pinned);
    const startEdit = (item) => {
      editingId.value = item.id;
      editTitle.value = item.title;
      nextTick(() => {
        var _a;
        if ((_a = inputRef.value) == null ? void 0 : _a[0]) inputRef.value[0].focus();
      });
    };
    const confirmEdit = (item) => {
      if (!editingId.value) return;
      const title = editTitle.value.trim();
      if (title && title !== item.title) emit("edit", item, title);
      editingId.value = null;
    };
    const cancelEdit = () => {
      editingId.value = null;
    };
    const formatTime = (ts) => {
      const d = new Date(ts);
      const now = /* @__PURE__ */ new Date();
      const isToday = d.toDateString() === now.toDateString();
      const pad = (n) => n.toString().padStart(2, "0");
      if (isToday) {
        return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
      }
      return `${d.getMonth() + 1}/${d.getDate()}`;
    };
    const scrollToItem = (id) => {
      const index = props.data.findIndex((item) => item.id === id);
      if (index !== -1) {
        scrollToIndex(index);
      }
    };
    __expose({
      scrollToItem,
      scrollToIndex
    });
    const __returned__ = { props, emit, ns, t, themeStyle, editingId, editTitle, inputRef, showGroups, visibleItems, totalHeight, offsetY, handleVirtualScroll, scrollToIndex, listStyle, getGroupKey, groupedData, handleCreate, handleClick, handleDelete, handlePin, startEdit, confirmEdit, cancelEdit, formatTime, scrollToItem, ref, computed, nextTick, get useNamespace() {
      return useNamespace;
    }, get useLocale() {
      return useLocale;
    }, get useVirtualScroll() {
      return useVirtualScroll;
    }, get useComponentTheme() {
      return useComponentTheme;
    }, get aiConversationsProps() {
      return aiConversationsProps;
    }, get aiConversationsEmits() {
      return aiConversationsEmits;
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
