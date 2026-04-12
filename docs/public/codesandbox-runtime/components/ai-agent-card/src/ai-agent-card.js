import { createCommentVNode as _createCommentVNode, normalizeClass as _normalizeClass, createElementVNode as _createElementVNode, normalizeStyle as _normalizeStyle, openBlock as _openBlock, createElementBlock as _createElementBlock, createVNode as _createVNode, withCtx as _withCtx, createBlock as _createBlock, renderSlot as _renderSlot, toDisplayString as _toDisplayString, renderList as _renderList, Fragment as _Fragment, createTextVNode as _createTextVNode } from "vue";
const _hoisted_1 = ["src", "alt"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock(), _createElementBlock(
    _Fragment,
    null,
    [
      _createCommentVNode(" Skeleton \u52A0\u8F7D\u6001 "),
      _ctx.loading ? (_openBlock(), _createElementBlock(
        "div",
        {
          key: 0,
          class: _normalizeClass([$setup.ns.b(), $setup.ns.m(_ctx.layout), $setup.ns.is("loading", true)]),
          style: _normalizeStyle($setup.themeStyle)
        },
        [
          _createElementVNode(
            "div",
            {
              class: _normalizeClass($setup.ns.e("skeleton-avatar"))
            },
            null,
            2
            /* CLASS */
          ),
          _createElementVNode(
            "div",
            {
              class: _normalizeClass($setup.ns.e("skeleton-lines"))
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
                  style: { "width": "70%" }
                },
                null,
                2
                /* CLASS */
              ),
              _createElementVNode(
                "div",
                {
                  class: _normalizeClass($setup.ns.e("skeleton-line")),
                  style: { "width": "50%" }
                },
                null,
                2
                /* CLASS */
              )
            ],
            2
            /* CLASS */
          )
        ],
        6
        /* CLASS, STYLE */
      )) : (_openBlock(), _createElementBlock(
        _Fragment,
        { key: 1 },
        [
          _createCommentVNode(" \u6B63\u5E38\u5361\u7247 "),
          _createElementVNode(
            "div",
            {
              class: _normalizeClass([$setup.ns.b(), $setup.ns.m(_ctx.layout), $setup.ns.is("selected", _ctx.selected)]),
              style: _normalizeStyle($setup.themeStyle),
              onClick: $setup.handleClick
            },
            [
              _createCommentVNode(" \u6536\u85CF & \u5206\u4EAB\u64CD\u4F5C\uFF08\u53F3\u4E0A\u89D2\u6D6E\u5C42\uFF09 "),
              _createElementVNode(
                "div",
                {
                  class: _normalizeClass($setup.ns.e("overlay-actions"))
                },
                [
                  _ctx.favoritable ? (_openBlock(), _createBlock($setup["YhTooltip"], {
                    key: 0,
                    content: $setup.localFavorited ? $setup.t("ai.agent.unfavorite") : $setup.t("ai.agent.favorite"),
                    placement: "top"
                  }, {
                    default: _withCtx(() => [
                      _createElementVNode(
                        "button",
                        {
                          class: _normalizeClass([$setup.ns.e("fav-btn"), $setup.ns.is("active", $setup.localFavorited)]),
                          onClick: $setup.handleFavorite
                        },
                        [
                          _createVNode($setup["YhIcon"], {
                            name: $setup.localFavorited ? "star-filled" : "star"
                          }, null, 8, ["name"])
                        ],
                        2
                        /* CLASS */
                      )
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["content"])) : _createCommentVNode("v-if", true),
                  _createVNode($setup["YhTooltip"], {
                    content: $setup.t("ai.agent.share"),
                    placement: "top"
                  }, {
                    default: _withCtx(() => [
                      _createElementVNode(
                        "button",
                        {
                          class: _normalizeClass($setup.ns.e("share-btn")),
                          onClick: $setup.handleShare
                        },
                        [
                          _createVNode($setup["YhIcon"], { name: "share" })
                        ],
                        2
                        /* CLASS */
                      )
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["content"])
                ],
                2
                /* CLASS */
              ),
              _createCommentVNode(" \u5934\u50CF\u533A\u57DF "),
              _createElementVNode(
                "div",
                {
                  class: _normalizeClass($setup.ns.e("avatar-wrapper"))
                },
                [
                  _createElementVNode(
                    "div",
                    {
                      class: _normalizeClass($setup.ns.e("avatar"))
                    },
                    [
                      _renderSlot(_ctx.$slots, "avatar", {}, () => {
                        var _a;
                        return [
                          ((_a = _ctx.data.avatar) == null ? void 0 : _a.startsWith("http")) ? (_openBlock(), _createElementBlock("img", {
                            key: 0,
                            src: _ctx.data.avatar,
                            alt: _ctx.data.name
                          }, null, 8, _hoisted_1)) : (_openBlock(), _createBlock($setup["YhIcon"], {
                            key: 1,
                            name: _ctx.data.avatar || "robot"
                          }, null, 8, ["name"]))
                        ];
                      })
                    ],
                    2
                    /* CLASS */
                  ),
                  _createCommentVNode(" \u72B6\u6001\u6307\u793A\u5668 "),
                  _ctx.data.status ? (_openBlock(), _createElementBlock(
                    "span",
                    {
                      key: 0,
                      class: _normalizeClass([$setup.ns.e("status-dot"), $setup.statusClass])
                    },
                    null,
                    2
                    /* CLASS */
                  )) : _createCommentVNode("v-if", true)
                ],
                2
                /* CLASS */
              ),
              _createCommentVNode(" \u5185\u5BB9\u4E3B\u533A\u57DF "),
              _createElementVNode(
                "div",
                {
                  class: _normalizeClass($setup.ns.e("body"))
                },
                [
                  _createElementVNode(
                    "div",
                    {
                      class: _normalizeClass($setup.ns.e("header"))
                    },
                    [
                      _createElementVNode(
                        "div",
                        {
                          class: _normalizeClass($setup.ns.e("name-row"))
                        },
                        [
                          _createElementVNode(
                            "span",
                            {
                              class: _normalizeClass($setup.ns.e("name"))
                            },
                            _toDisplayString(_ctx.data.name),
                            3
                            /* TEXT, CLASS */
                          ),
                          _ctx.data.verified ? (_openBlock(), _createBlock($setup["YhIcon"], {
                            key: 0,
                            name: "checkmark-circle",
                            class: _normalizeClass($setup.ns.e("verified-icon"))
                          }, null, 8, ["class"])) : _createCommentVNode("v-if", true)
                        ],
                        2
                        /* CLASS */
                      ),
                      _ctx.data.model ? (_openBlock(), _createElementBlock(
                        "span",
                        {
                          key: 0,
                          class: _normalizeClass($setup.ns.e("model"))
                        },
                        _toDisplayString(_ctx.data.model),
                        3
                        /* TEXT, CLASS */
                      )) : _createCommentVNode("v-if", true)
                    ],
                    2
                    /* CLASS */
                  ),
                  _ctx.data.description ? (_openBlock(), _createElementBlock(
                    "p",
                    {
                      key: 0,
                      class: _normalizeClass($setup.ns.e("description"))
                    },
                    _toDisplayString(_ctx.data.description),
                    3
                    /* TEXT, CLASS */
                  )) : _createCommentVNode("v-if", true),
                  _createCommentVNode(" \u80FD\u529B\u6807\u7B7E "),
                  _ctx.data.capabilities && _ctx.data.capabilities.length > 0 ? (_openBlock(), _createElementBlock(
                    "div",
                    {
                      key: 1,
                      class: _normalizeClass($setup.ns.e("capabilities"))
                    },
                    [
                      (_openBlock(true), _createElementBlock(
                        _Fragment,
                        null,
                        _renderList(_ctx.data.capabilities.slice(0, 4), (cap, idx) => {
                          return _openBlock(), _createElementBlock(
                            "span",
                            {
                              key: idx,
                              class: _normalizeClass([$setup.ns.e("capability-tag"), cap.type ? $setup.ns.m(cap.type) : ""])
                            },
                            [
                              cap.icon ? (_openBlock(), _createBlock($setup["YhIcon"], {
                                key: 0,
                                name: cap.icon
                              }, null, 8, ["name"])) : _createCommentVNode("v-if", true),
                              _createTextVNode(
                                " " + _toDisplayString(cap.label),
                                1
                                /* TEXT */
                              )
                            ],
                            2
                            /* CLASS */
                          );
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      )),
                      _ctx.data.capabilities.length > 4 ? (_openBlock(), _createElementBlock(
                        "span",
                        {
                          key: 0,
                          class: _normalizeClass($setup.ns.e("capability-more"))
                        },
                        " +" + _toDisplayString(_ctx.data.capabilities.length - 4),
                        3
                        /* TEXT, CLASS */
                      )) : _createCommentVNode("v-if", true)
                    ],
                    2
                    /* CLASS */
                  )) : _createCommentVNode("v-if", true),
                  _createCommentVNode(" \u7EDF\u8BA1\u4FE1\u606F "),
                  _ctx.showStats && _ctx.data.stats ? (_openBlock(), _createElementBlock(
                    "div",
                    {
                      key: 2,
                      class: _normalizeClass($setup.ns.e("stats"))
                    },
                    [
                      _ctx.data.stats.uses !== void 0 ? (_openBlock(), _createElementBlock(
                        "span",
                        {
                          key: 0,
                          class: _normalizeClass($setup.ns.e("stat-item"))
                        },
                        [
                          _createVNode($setup["YhIcon"], { name: "chart-bar" }),
                          _createTextVNode(
                            " " + _toDisplayString($setup.formattedUses) + " " + _toDisplayString($setup.t("ai.agent.uses")),
                            1
                            /* TEXT */
                          )
                        ],
                        2
                        /* CLASS */
                      )) : _createCommentVNode("v-if", true),
                      _ctx.data.stats.rating !== void 0 ? (_openBlock(), _createElementBlock(
                        "span",
                        {
                          key: 1,
                          class: _normalizeClass($setup.ns.e("stat-item"))
                        },
                        [
                          _createElementVNode(
                            "span",
                            {
                              class: _normalizeClass($setup.ns.e("stars"))
                            },
                            [
                              (_openBlock(true), _createElementBlock(
                                _Fragment,
                                null,
                                _renderList($setup.ratingStars, (full, i) => {
                                  return _openBlock(), _createBlock($setup["YhIcon"], {
                                    key: i,
                                    name: full ? "star-filled" : "star",
                                    class: _normalizeClass($setup.ns.is("filled", full))
                                  }, null, 8, ["name", "class"]);
                                }),
                                128
                                /* KEYED_FRAGMENT */
                              ))
                            ],
                            2
                            /* CLASS */
                          ),
                          _createElementVNode(
                            "span",
                            null,
                            _toDisplayString(_ctx.data.stats.rating.toFixed(1)),
                            1
                            /* TEXT */
                          ),
                          _ctx.data.stats.reviewCount ? (_openBlock(), _createElementBlock(
                            "span",
                            {
                              key: 0,
                              class: _normalizeClass($setup.ns.e("review-count"))
                            },
                            "(" + _toDisplayString(_ctx.data.stats.reviewCount) + ")",
                            3
                            /* TEXT, CLASS */
                          )) : _createCommentVNode("v-if", true)
                        ],
                        2
                        /* CLASS */
                      )) : _createCommentVNode("v-if", true),
                      _ctx.data.stats.responseTime !== void 0 ? (_openBlock(), _createElementBlock(
                        "span",
                        {
                          key: 2,
                          class: _normalizeClass($setup.ns.e("stat-item"))
                        },
                        [
                          _createVNode($setup["YhIcon"], { name: "time" }),
                          _createTextVNode(
                            " " + _toDisplayString(_ctx.data.stats.responseTime) + "ms ",
                            1
                            /* TEXT */
                          )
                        ],
                        2
                        /* CLASS */
                      )) : _createCommentVNode("v-if", true)
                    ],
                    2
                    /* CLASS */
                  )) : _createCommentVNode("v-if", true)
                ],
                2
                /* CLASS */
              ),
              _createCommentVNode(" \u64CD\u4F5C\u6309\u94AE "),
              _ctx.showActions ? (_openBlock(), _createElementBlock(
                "div",
                {
                  key: 0,
                  class: _normalizeClass($setup.ns.e("actions"))
                },
                [
                  _renderSlot(_ctx.$slots, "actions", {
                    data: _ctx.data,
                    use: $setup.handleUse
                  }, () => [
                    _createElementVNode(
                      "button",
                      {
                        class: _normalizeClass($setup.ns.e("use-btn")),
                        onClick: $setup.handleUse
                      },
                      [
                        _createVNode($setup["YhIcon"], { name: "sparkles" }),
                        _createTextVNode(
                          " " + _toDisplayString($setup.t("ai.agent.use")),
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
              )) : _createCommentVNode("v-if", true),
              _createCommentVNode(" \u9ED8\u8BA4\u63D2\u69FD\uFF1A\u989D\u5916\u5185\u5BB9 "),
              _renderSlot(_ctx.$slots, "default", { data: _ctx.data })
            ],
            6
            /* CLASS, STYLE */
          )
        ],
        2112
        /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
      ))
    ],
    2112
    /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
  );
}
import { useLocale } from "../../../hooks/index.js";
import { useNamespace } from "../../../hooks/use-namespace/index.js";
import { computed, ref } from "vue";
import { aiAgentCardProps, aiAgentCardEmits } from "./ai-agent-card-meta.js";
import { YhIcon } from "../../icon/index.js";
import { YhTooltip } from "../../tooltip/index.js";
import { useComponentTheme } from "../../../theme/component-theme.js";
const __sfc__ = /* @__PURE__ */ Object.assign({
  name: "YhAiAgentCard"
}, {
  __name: "ai-agent-card",
  props: aiAgentCardProps,
  emits: aiAgentCardEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    var _a, _b;
    __expose();
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("ai-agent-card");
    const { t } = useLocale();
    const { themeStyle } = useComponentTheme("ai-agent-card", props.themeOverrides);
    const localFavorited = ref((_b = (_a = props.data) == null ? void 0 : _a.favorited) != null ? _b : false);
    const statusClass = computed(() => {
      var _a2;
      const s = (_a2 = props.data) == null ? void 0 : _a2.status;
      if (s === "online") return "is-online";
      if (s === "busy") return "is-busy";
      return "is-offline";
    });
    const ratingStars = computed(() => {
      var _a2, _b2, _c;
      const r = (_c = (_b2 = (_a2 = props.data) == null ? void 0 : _a2.stats) == null ? void 0 : _b2.rating) != null ? _c : 0;
      return Array.from({ length: 5 }, (_, i) => i < Math.floor(r));
    });
    const formattedUses = computed(() => {
      var _a2, _b2, _c;
      const u = (_c = (_b2 = (_a2 = props.data) == null ? void 0 : _a2.stats) == null ? void 0 : _b2.uses) != null ? _c : 0;
      if (u >= 1e4) return `${(u / 1e4).toFixed(1)}w`;
      if (u >= 1e3) return `${(u / 1e3).toFixed(1)}k`;
      return String(u);
    });
    const handleClick = () => {
      if (!props.loading) emit("click", props.data);
    };
    const handleUse = (e) => {
      e.stopPropagation();
      emit("use", props.data);
    };
    const handleFavorite = (e) => {
      e.stopPropagation();
      localFavorited.value = !localFavorited.value;
      emit("favorite", props.data, localFavorited.value);
    };
    const handleShare = (e) => {
      e.stopPropagation();
      emit("share", props.data);
    };
    const __returned__ = { props, emit, ns, t, themeStyle, localFavorited, statusClass, ratingStars, formattedUses, handleClick, handleUse, handleFavorite, handleShare, get useNamespace() {
      return useNamespace;
    }, get useLocale() {
      return useLocale;
    }, computed, ref, get aiAgentCardProps() {
      return aiAgentCardProps;
    }, get aiAgentCardEmits() {
      return aiAgentCardEmits;
    }, get YhIcon() {
      return YhIcon;
    }, get YhTooltip() {
      return YhTooltip;
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
