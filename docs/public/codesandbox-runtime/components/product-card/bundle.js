// public/codesandbox-runtime/components/product-card/src/product-card.js
import { createCommentVNode as _createCommentVNode, toDisplayString as _toDisplayString, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, openBlock as _openBlock, createElementBlock as _createElementBlock, createElementVNode as _createElementVNode, Transition as _Transition, withCtx as _withCtx, createVNode as _createVNode, renderList as _renderList, Fragment as _Fragment, renderSlot as _renderSlot, createTextVNode as _createTextVNode, withModifiers as _withModifiers } from "vue";
import { ref as ref2, computed as computed2, onMounted, onUnmounted, watch } from "vue";

// public/codesandbox-runtime/hooks/use-namespace/index.js
import { inject, ref, unref } from "vue";
var defaultNamespace = "yh";
var statePrefix = "is-";
var namespaceContextKey = Symbol("namespaceContextKey");
var useGlobalNamespace = () => {
  return inject(namespaceContextKey, ref(defaultNamespace));
};
var useNamespace = (block) => {
  const namespace = useGlobalNamespace();
  const b = (blockSuffix = "") => {
    const ns = unref(namespace);
    return blockSuffix ? `${ns}-${block}-${blockSuffix}` : `${ns}-${block}`;
  };
  const e = (element) => {
    return element ? `${b()}__${element}` : "";
  };
  const m = (modifier) => {
    return modifier ? `${b()}--${modifier}` : "";
  };
  const bem = (blockSuffix, element, modifier) => {
    let cls = b(blockSuffix);
    if (element) cls += `__${element}`;
    if (modifier) cls += `--${modifier}`;
    return cls;
  };
  const em = (element, modifier) => {
    return element && modifier ? `${b()}__${element}--${modifier}` : "";
  };
  function is(state, value) {
    if (arguments.length === 1) {
      return `${statePrefix}${state}`;
    }
    return value ? `${statePrefix}${state}` : "";
  }
  const cssVar = (name) => {
    return `--${unref(namespace)}-${block}-${name}`;
  };
  const cssVarObj = (vars) => {
    const obj = {};
    Object.entries(vars).forEach(([key, value]) => {
      obj[cssVar(key)] = value;
    });
    return obj;
  };
  const cssVarBlock = (name) => {
    return `--${unref(namespace)}-${name}`;
  };
  const cssVarBlockObj = (vars) => {
    const obj = {};
    Object.entries(vars).forEach(([key, value]) => {
      obj[cssVarBlock(key)] = value;
    });
    return obj;
  };
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
  };
};

// public/codesandbox-runtime/theme/component-theme.js
import { inject as inject2, provide, computed, unref as unref2 } from "vue";
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var COMPONENT_THEME_KEY = Symbol("component-theme");
function useComponentTheme(componentName, localOverrides) {
  const globalThemes = inject2(COMPONENT_THEME_KEY, {});
  const mergedVars = computed(() => {
    const globalVars = globalThemes[componentName] || {};
    const local = unref2(localOverrides) || {};
    return __spreadValues(__spreadValues({}, globalVars), local);
  });
  const themeStyle = computed(() => {
    const vars = mergedVars.value;
    const style = {};
    Object.entries(vars).forEach(([key, value]) => {
      if (value !== void 0) {
        const cssVarName = `--yh-${componentName}-${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
        style[cssVarName] = value;
      }
    });
    return style;
  });
  const hasCustomTheme = computed(() => {
    return Object.keys(mergedVars.value).length > 0;
  });
  return {
    themeVars: mergedVars,
    themeStyle,
    hasCustomTheme
  };
}

// public/codesandbox-runtime/components/product-card/src/product-card-meta.js
var productCardProps = {
  /** 商品图片 */
  image: {
    type: String,
    default: ""
  },
  /** 鼠标悬浮切换图 */
  hoverImage: {
    type: String,
    default: ""
  },
  /** 视频预览地址 */
  videoSrc: {
    type: String,
    default: ""
  },
  /** 商品标题 */
  title: {
    type: String,
    default: ""
  },
  /** 副标题/属性简述 */
  description: {
    type: String,
    default: ""
  },
  /** 当前售价 */
  price: {
    type: [Number, String],
    default: 0
  },
  /** 会员价/到手价 */
  vipPrice: {
    type: [Number, String],
    default: ""
  },
  /** 会员价标签文本 (默认 "会员价") */
  vipLabel: {
    type: String,
    default: "\u4F1A\u5458"
  },
  /** 划线价/参考价 */
  marketPrice: {
    type: [Number, String],
    default: ""
  },
  /** 货币符号 */
  currency: {
    type: String,
    default: "\xA5"
  },
  /** 价格后置单位 (如: /件, /kg) */
  unit: {
    type: String,
    default: ""
  },
  /** 营销丝带文本 (推荐) */
  ribbon: {
    type: String,
    default: ""
  },
  /** 丝带背景颜色 */
  ribbonColor: {
    type: String,
    default: ""
  },
  /** 兼容性：标题标签文本 (不推荐，建议使用 ribbons 或 badges) */
  tag: {
    type: String,
    default: ""
  },
  /** 兼容性：标签颜色类型 */
  tagType: {
    type: String,
    default: "danger"
  },
  /** 标签组 (支持图片 or 文本标签) */
  badges: {
    type: Array,
    default: () => []
  },
  /** 布局模式 */
  layout: {
    type: String,
    default: "vertical"
  },
  /** 是否开启图片懒加载 */
  lazy: {
    type: Boolean,
    default: true
  },
  /** 库存进度（0-100） */
  stockProgress: {
    type: Number,
    default: 0
  },
  /** 库存进度条颜色 (支持渐变色) */
  stockColor: {
    type: String,
    default: ""
  },
  /** 库存文字提示 */
  stockText: {
    type: String,
    default: ""
  },
  /** 是否显示边框 */
  border: {
    type: Boolean,
    default: true
  },
  /** 是否开启悬浮阴影 */
  shadow: {
    type: Boolean,
    default: true
  },
  /** 是否只读 (隐藏所有操作按钮) */
  readonly: {
    type: Boolean,
    default: false
  },
  /** 操作按钮文本 */
  actionText: {
    type: String,
    default: ""
  },
  /** 按钮加载态 */
  actionLoading: {
    type: Boolean,
    default: false
  },
  /** 是否已售罄/禁用 */
  soldOut: {
    type: Boolean,
    default: false
  },
  /** 是否开启曝光监听 */
  exposure: {
    type: Boolean,
    default: false
  },
  /** 曝光上报阈值 (0-1) */
  exposureThreshold: {
    type: Number,
    default: 0.5
  },
  /** 曝光成功后是否只上报一次 */
  exposureOnce: {
    type: Boolean,
    default: true
  },
  /** 标题显示行数限制 (多行截断) */
  titleLines: {
    type: Number,
    default: 2
  },
  /** 描述显示行数限制 (多行截断) */
  descriptionLines: {
    type: Number,
    default: 1
  },
  /** 标签显示位置 */
  badgePosition: {
    type: String,
    default: "top"
  },
  /** 主题覆盖 */
  themeOverrides: {
    type: Object,
    default: () => ({})
  }
};
var productCardEmits = {
  click: (e) => e instanceof MouseEvent,
  action: (e) => e instanceof MouseEvent,
  /** 曝光上报事件 */
  expose: () => true
};

// public/codesandbox-runtime/components/product-card/src/product-card.js
var _hoisted_1 = ["src", "alt", "loading"];
var _hoisted_2 = ["src"];
var _hoisted_3 = ["src", "onError"];
var _hoisted_4 = ["title"];
var _hoisted_5 = ["src", "onError"];
var _hoisted_6 = ["title"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock(), _createElementBlock(
    "div",
    {
      ref: "cardRef",
      class: _normalizeClass([$setup.ns.b(), $setup.ns.m($setup.props.layout), $setup.ns.is("border", $setup.props.border), $setup.ns.is("shadow", $setup.props.shadow), $setup.ns.is("sold-out", $setup.props.soldOut)]),
      style: _normalizeStyle([$setup.themeStyle, {
        "--yh-product-card-title-lines": $setup.props.titleLines,
        "--yh-product-card-desc-lines": $setup.props.descriptionLines
      }]),
      onClick: $setup.handleClick,
      onMouseenter: $setup.handleMouseEnter,
      onMouseleave: $setup.handleMouseLeave
    },
    [
      _createCommentVNode(" 1. Ribbon System (Feature 1) "),
      $setup.props.ribbon ? (_openBlock(), _createElementBlock(
        "div",
        {
          key: 0,
          class: _normalizeClass($setup.ns.e("ribbon")),
          style: _normalizeStyle({
            backgroundColor: $setup.props.ribbonColor
          })
        },
        _toDisplayString($setup.props.ribbon),
        7
        /* TEXT, CLASS, STYLE */
      )) : _createCommentVNode("v-if", true),
      _createCommentVNode(" Media Area (Feature 3) "),
      _createElementVNode(
        "div",
        {
          class: _normalizeClass($setup.ns.e("image-wrapper"))
        },
        [
          _createElementVNode("img", {
            src: $setup.currentImage,
            alt: $setup.props.title,
            class: _normalizeClass($setup.ns.e("image")),
            loading: $setup.props.lazy ? "lazy" : "eager"
          }, null, 10, _hoisted_1),
          _createCommentVNode(" Video Preview Overlay "),
          _createVNode(_Transition, { name: "yh-fade" }, {
            default: _withCtx(() => [
              $setup.videoActive && $setup.props.videoSrc ? (_openBlock(), _createElementBlock(
                "div",
                {
                  key: 0,
                  class: _normalizeClass($setup.ns.e("video-overlay"))
                },
                [
                  _createElementVNode("video", {
                    src: $setup.props.videoSrc,
                    autoplay: "",
                    muted: "",
                    loop: "",
                    playsinline: "",
                    class: _normalizeClass($setup.ns.e("video"))
                  }, null, 10, _hoisted_2)
                ],
                2
                /* CLASS */
              )) : _createCommentVNode("v-if", true)
            ]),
            _: 1
            /* STABLE */
          }),
          _createCommentVNode(" Sold Out Mask (Feature 4) "),
          $setup.props.soldOut ? (_openBlock(), _createElementBlock(
            "div",
            {
              key: 0,
              class: _normalizeClass($setup.ns.e("sold-out-mask"))
            },
            [
              _createElementVNode(
                "span",
                {
                  class: _normalizeClass($setup.ns.e("sold-out-text"))
                },
                "\u552E\u7F44",
                2
                /* CLASS */
              )
            ],
            2
            /* CLASS */
          )) : _createCommentVNode("v-if", true)
        ],
        2
        /* CLASS */
      ),
      _createCommentVNode(" Content Area "),
      _createElementVNode(
        "div",
        {
          class: _normalizeClass($setup.ns.e("content"))
        },
        [
          _createCommentVNode(" 1. Badges System (Row Style: Above Title) "),
          ($setup.props.tag || $setup.props.badges.length) && $setup.props.badgePosition === "top" ? (_openBlock(), _createElementBlock(
            "div",
            {
              key: 0,
              class: _normalizeClass($setup.ns.e("badges"))
            },
            [
              $setup.props.tag ? (_openBlock(), _createElementBlock(
                "span",
                {
                  key: 0,
                  class: _normalizeClass([$setup.ns.e("badge-tag"), $setup.ns.is($setup.props.tagType)])
                },
                _toDisplayString($setup.props.tag),
                3
                /* TEXT, CLASS */
              )) : _createCommentVNode("v-if", true),
              (_openBlock(true), _createElementBlock(
                _Fragment,
                null,
                _renderList($setup.props.badges, (badge, idx) => {
                  return _openBlock(), _createElementBlock(
                    _Fragment,
                    { key: idx },
                    [
                      badge.image && !$setup.badgeImageErrors[idx] ? (_openBlock(), _createElementBlock(
                        "span",
                        {
                          key: 0,
                          class: _normalizeClass($setup.ns.e("badge-img-wrap"))
                        },
                        [
                          _createElementVNode("img", {
                            src: badge.image,
                            class: _normalizeClass($setup.ns.e("badge-img")),
                            alt: "badge",
                            onError: ($event) => $setup.handleBadgeImageError(idx)
                          }, null, 42, _hoisted_3)
                        ],
                        2
                        /* CLASS */
                      )) : _createCommentVNode("v-if", true),
                      badge.text ? (_openBlock(), _createElementBlock(
                        "span",
                        {
                          key: 1,
                          class: _normalizeClass([$setup.ns.e("badge-tag"), $setup.ns.is(badge.type || "primary")]),
                          style: _normalizeStyle({
                            backgroundColor: badge.color
                          })
                        },
                        _toDisplayString(badge.text),
                        7
                        /* TEXT, CLASS, STYLE */
                      )) : _createCommentVNode("v-if", true)
                    ],
                    64
                    /* STABLE_FRAGMENT */
                  );
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ],
            2
            /* CLASS */
          )) : _createCommentVNode("v-if", true),
          _createElementVNode("h3", {
            class: _normalizeClass($setup.ns.e("title")),
            title: $setup.props.title
          }, [
            _createCommentVNode(" 2. Badges System (Inline Style: Prefix) "),
            ($setup.props.tag || $setup.props.badges.length) && $setup.props.badgePosition === "inline" ? (_openBlock(), _createElementBlock(
              "span",
              {
                key: 0,
                class: _normalizeClass([$setup.ns.e("badges"), $setup.ns.is("inline")])
              },
              [
                $setup.props.tag ? (_openBlock(), _createElementBlock(
                  "span",
                  {
                    key: 0,
                    class: _normalizeClass([$setup.ns.e("badge-tag"), $setup.ns.is($setup.props.tagType)])
                  },
                  _toDisplayString($setup.props.tag),
                  3
                  /* TEXT, CLASS */
                )) : _createCommentVNode("v-if", true),
                (_openBlock(true), _createElementBlock(
                  _Fragment,
                  null,
                  _renderList($setup.props.badges, (badge, idx) => {
                    return _openBlock(), _createElementBlock(
                      _Fragment,
                      { key: idx },
                      [
                        badge.image && !$setup.badgeImageErrors[idx] ? (_openBlock(), _createElementBlock(
                          "span",
                          {
                            key: 0,
                            class: _normalizeClass($setup.ns.e("badge-img-wrap"))
                          },
                          [
                            _createElementVNode("img", {
                              src: badge.image,
                              class: _normalizeClass($setup.ns.e("badge-img")),
                              alt: "badge",
                              onError: ($event) => $setup.handleBadgeImageError(idx)
                            }, null, 42, _hoisted_5)
                          ],
                          2
                          /* CLASS */
                        )) : _createCommentVNode("v-if", true),
                        badge.text ? (_openBlock(), _createElementBlock(
                          "span",
                          {
                            key: 1,
                            class: _normalizeClass([$setup.ns.e("badge-tag"), $setup.ns.is(badge.type || "primary")]),
                            style: _normalizeStyle({
                              backgroundColor: badge.color
                            })
                          },
                          _toDisplayString(badge.text),
                          7
                          /* TEXT, CLASS, STYLE */
                        )) : _createCommentVNode("v-if", true)
                      ],
                      64
                      /* STABLE_FRAGMENT */
                    );
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ],
              2
              /* CLASS */
            )) : _createCommentVNode("v-if", true),
            _renderSlot(_ctx.$slots, "title", {}, () => [
              _createTextVNode(
                _toDisplayString($setup.props.title),
                1
                /* TEXT */
              )
            ])
          ], 10, _hoisted_4),
          $setup.props.description || _ctx.$slots.description ? (_openBlock(), _createElementBlock("div", {
            key: 1,
            class: _normalizeClass($setup.ns.e("description")),
            title: $setup.props.description
          }, [
            _renderSlot(_ctx.$slots, "description", {}, () => [
              _createTextVNode(
                _toDisplayString($setup.props.description),
                1
                /* TEXT */
              )
            ])
          ], 10, _hoisted_6)) : _createCommentVNode("v-if", true),
          _createCommentVNode(" Price Area (Feature 2) "),
          _createElementVNode(
            "div",
            {
              class: _normalizeClass($setup.ns.e("price-row"))
            },
            [
              _createElementVNode(
                "div",
                {
                  class: _normalizeClass($setup.ns.e("main-price"))
                },
                [
                  _createElementVNode(
                    "span",
                    {
                      class: _normalizeClass($setup.ns.e("currency"))
                    },
                    _toDisplayString($setup.props.currency),
                    3
                    /* TEXT, CLASS */
                  ),
                  _createElementVNode(
                    "span",
                    {
                      class: _normalizeClass($setup.ns.e("price-val"))
                    },
                    _toDisplayString($setup.displayPrice),
                    3
                    /* TEXT, CLASS */
                  ),
                  $setup.props.unit ? (_openBlock(), _createElementBlock(
                    "span",
                    {
                      key: 0,
                      class: _normalizeClass($setup.ns.e("unit"))
                    },
                    _toDisplayString($setup.props.unit),
                    3
                    /* TEXT, CLASS */
                  )) : _createCommentVNode("v-if", true)
                ],
                2
                /* CLASS */
              ),
              $setup.props.vipPrice ? (_openBlock(), _createElementBlock(
                "div",
                {
                  key: 0,
                  class: _normalizeClass($setup.ns.e("vip-row"))
                },
                [
                  _createElementVNode(
                    "span",
                    {
                      class: _normalizeClass($setup.ns.e("vip-label"))
                    },
                    _toDisplayString($setup.props.vipLabel),
                    3
                    /* TEXT, CLASS */
                  ),
                  _createElementVNode(
                    "span",
                    {
                      class: _normalizeClass($setup.ns.e("currency"))
                    },
                    _toDisplayString($setup.props.currency),
                    3
                    /* TEXT, CLASS */
                  ),
                  _createElementVNode(
                    "span",
                    {
                      class: _normalizeClass($setup.ns.e("vip-price"))
                    },
                    _toDisplayString($setup.displayVipPrice),
                    3
                    /* TEXT, CLASS */
                  )
                ],
                2
                /* CLASS */
              )) : _createCommentVNode("v-if", true),
              $setup.props.marketPrice ? (_openBlock(), _createElementBlock(
                "div",
                {
                  key: 1,
                  class: _normalizeClass($setup.ns.e("market-price"))
                },
                _toDisplayString($setup.props.currency) + _toDisplayString($setup.displayMarketPrice),
                3
                /* TEXT, CLASS */
              )) : _createCommentVNode("v-if", true)
            ],
            2
            /* CLASS */
          ),
          _createCommentVNode(" Stock Progress (Feature 2 & \u4FA7\u8FB9\u680F\u9700\u6C42) "),
          $setup.props.stockProgress ? (_openBlock(), _createElementBlock(
            "div",
            {
              key: 2,
              class: _normalizeClass($setup.ns.e("stock-area"))
            },
            [
              _createElementVNode(
                "div",
                {
                  class: _normalizeClass($setup.ns.e("stock-bar-bg"))
                },
                [
                  _createElementVNode(
                    "div",
                    {
                      class: _normalizeClass($setup.ns.e("stock-bar-inner")),
                      style: _normalizeStyle($setup.stockStyle)
                    },
                    null,
                    6
                    /* CLASS, STYLE */
                  )
                ],
                2
                /* CLASS */
              ),
              $setup.props.stockText ? (_openBlock(), _createElementBlock(
                "span",
                {
                  key: 0,
                  class: _normalizeClass($setup.ns.e("stock-text"))
                },
                _toDisplayString($setup.props.stockText),
                3
                /* TEXT, CLASS */
              )) : _createCommentVNode("v-if", true)
            ],
            2
            /* CLASS */
          )) : _createCommentVNode("v-if", true),
          _createCommentVNode(" Footer Actions (Feature 4) "),
          !$setup.props.readonly ? (_openBlock(), _createElementBlock(
            "div",
            {
              key: 3,
              class: _normalizeClass($setup.ns.e("footer"))
            },
            [
              _renderSlot(_ctx.$slots, "footer", {}, () => [
                _createElementVNode(
                  "button",
                  {
                    class: _normalizeClass([$setup.ns.e("action-btn"), $setup.ns.is("loading", $setup.props.actionLoading), $setup.ns.is("disabled", $setup.props.soldOut)]),
                    onClick: _withModifiers($setup.handleAction, ["stop"])
                  },
                  [
                    $setup.props.actionLoading ? (_openBlock(), _createElementBlock(
                      "span",
                      {
                        key: 0,
                        class: _normalizeClass($setup.ns.e("loading-spinner"))
                      },
                      null,
                      2
                      /* CLASS */
                    )) : _createCommentVNode("v-if", true),
                    _createTextVNode(
                      " " + _toDisplayString($setup.props.actionText || "\u7ACB\u5373\u8D2D\u4E70"),
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
          )) : _createCommentVNode("v-if", true)
        ],
        2
        /* CLASS */
      )
    ],
    38
    /* CLASS, STYLE, NEED_HYDRATION */
  );
}
var __sfc__ = /* @__PURE__ */ Object.assign({ name: "YhProductCard" }, {
  __name: "product-card",
  props: productCardProps,
  emits: productCardEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("product-card");
    const { themeStyle } = useComponentTheme(
      "product-card",
      computed2(() => props.themeOverrides)
    );
    const cardRef = ref2(null);
    let observer = null;
    const hasExposed = ref2(false);
    const setupObserver = () => {
      if (!props.exposure || hasExposed.value) return;
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= props.exposureThreshold) {
              emit("expose");
              hasExposed.value = true;
              if (props.exposureOnce) observer == null ? void 0 : observer.disconnect();
            }
          });
        },
        { threshold: [props.exposureThreshold] }
      );
      if (cardRef.value) observer.observe(cardRef.value);
    };
    onMounted(setupObserver);
    onUnmounted(() => observer == null ? void 0 : observer.disconnect());
    const currentImage = ref2(props.image);
    const isHovering = ref2(false);
    const videoActive = ref2(false);
    watch(
      () => props.image,
      (val) => {
        currentImage.value = val;
      }
    );
    const handleMouseEnter = () => {
      isHovering.value = true;
      if (props.hoverImage) currentImage.value = props.hoverImage;
      if (props.videoSrc) videoActive.value = true;
    };
    const handleMouseLeave = () => {
      isHovering.value = false;
      currentImage.value = props.image;
      if (props.videoSrc) videoActive.value = false;
    };
    const displayPrice = computed2(() => {
      const p = Number(props.price);
      return isNaN(p) ? props.price : p.toFixed(2);
    });
    const displayMarketPrice = computed2(() => {
      const p = Number(props.marketPrice);
      return isNaN(p) ? props.marketPrice : p.toFixed(2);
    });
    const displayVipPrice = computed2(() => {
      const p = Number(props.vipPrice);
      return isNaN(p) ? props.vipPrice : p.toFixed(2);
    });
    const stockStyle = computed2(() => ({
      width: `${Math.min(100, Math.max(0, props.stockProgress))}%`,
      background: props.stockColor || "var(--yh-color-primary)"
    }));
    const handleAction = (e) => {
      if (props.soldOut || props.actionLoading) return;
      emit("action", e);
    };
    const handleClick = (e) => {
      emit("click", e);
    };
    const badgeImageErrors = ref2({});
    const handleBadgeImageError = (idx) => {
      badgeImageErrors.value[idx] = true;
    };
    const __returned__ = { props, emit, ns, themeStyle, cardRef, get observer() {
      return observer;
    }, set observer(v) {
      observer = v;
    }, hasExposed, setupObserver, currentImage, isHovering, videoActive, handleMouseEnter, handleMouseLeave, displayPrice, displayMarketPrice, displayVipPrice, stockStyle, handleAction, handleClick, badgeImageErrors, handleBadgeImageError, ref: ref2, computed: computed2, onMounted, onUnmounted, watch, get useNamespace() {
      return useNamespace;
    }, get useComponentTheme() {
      return useComponentTheme;
    }, get productCardProps() {
      return productCardProps;
    }, get productCardEmits() {
      return productCardEmits;
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
