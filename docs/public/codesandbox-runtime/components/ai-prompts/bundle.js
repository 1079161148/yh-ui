// public/codesandbox-runtime/components/ai-prompts/src/ai-prompts.js
import { createCommentVNode as _createCommentVNode, renderSlot as _renderSlot, toDisplayString as _toDisplayString, normalizeClass as _normalizeClass, createElementVNode as _createElementVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, renderList as _renderList, Fragment as _Fragment, normalizeStyle as _normalizeStyle } from "vue";

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

// public/codesandbox-runtime/components/ai-prompts/src/ai-prompts-meta.js
var aiPromptsProps = {
  /**
   * @description Data list for the prompts
   */
  items: {
    type: Array,
    default: () => []
  },
  /**
   * @description Layout style for the prompts
   */
  layout: {
    type: String,
    default: "horizontal"
  },
  /**
   * @description Title for the group
   */
  title: {
    type: String,
    default: ""
  },
  /**
   * @description Theme overrides for the component
   */
  themeOverrides: {
    type: Object,
    default: void 0
  }
};
var aiPromptsEmits = {
  /**
   * @description Emit when an item is clicked
   */
  click: (item) => typeof item === "object" || typeof item === "string"
};

// public/codesandbox-runtime/components/ai-prompts/src/ai-prompts.js
var _hoisted_1 = ["onClick"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock(), _createElementBlock(
    "div",
    {
      class: _normalizeClass([$setup.ns.b(), $setup.ns.m(_ctx.layout)]),
      style: _normalizeStyle($setup.themeStyle)
    },
    [
      _createCommentVNode(" Title Section "),
      _ctx.title || _ctx.$slots.title ? (_openBlock(), _createElementBlock(
        "div",
        {
          key: 0,
          class: _normalizeClass($setup.ns.e("header"))
        },
        [
          _renderSlot(_ctx.$slots, "title", {}, () => [
            _createElementVNode(
              "span",
              {
                class: _normalizeClass($setup.ns.e("title"))
              },
              _toDisplayString(_ctx.title),
              3
              /* TEXT, CLASS */
            )
          ])
        ],
        2
        /* CLASS */
      )) : _createCommentVNode("v-if", true),
      _createCommentVNode(" Prompts Grid/List "),
      _createElementVNode(
        "div",
        {
          class: _normalizeClass($setup.ns.e("list"))
        },
        [
          (_openBlock(true), _createElementBlock(
            _Fragment,
            null,
            _renderList(_ctx.items, (item, index) => {
              return _openBlock(), _createElementBlock("div", {
                key: typeof item === "string" ? index : item.id || index,
                class: _normalizeClass($setup.ns.e("item")),
                onClick: ($event) => $setup.handleClick(item)
              }, [
                _renderSlot(_ctx.$slots, "item", {
                  item,
                  index
                }, () => [
                  _createElementVNode(
                    "div",
                    {
                      class: _normalizeClass($setup.ns.e("item-inner"))
                    },
                    [
                      typeof item === "object" && item.icon ? (_openBlock(), _createElementBlock(
                        "span",
                        {
                          key: 0,
                          class: _normalizeClass($setup.ns.e("icon"))
                        },
                        [
                          _renderSlot(_ctx.$slots, "icon", {
                            icon: item.icon
                          }, () => [
                            _createElementVNode(
                              "i",
                              {
                                class: _normalizeClass(item.icon)
                              },
                              null,
                              2
                              /* CLASS */
                            )
                          ])
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
                          _createElementVNode(
                            "span",
                            {
                              class: _normalizeClass($setup.ns.e("text"))
                            },
                            _toDisplayString(typeof item === "string" ? item : item.content),
                            3
                            /* TEXT, CLASS */
                          ),
                          typeof item === "object" && item.description ? (_openBlock(), _createElementBlock(
                            "span",
                            {
                              key: 0,
                              class: _normalizeClass($setup.ns.e("description"))
                            },
                            _toDisplayString(item.description),
                            3
                            /* TEXT, CLASS */
                          )) : _createCommentVNode("v-if", true)
                        ],
                        2
                        /* CLASS */
                      ),
                      _createElementVNode(
                        "div",
                        {
                          class: _normalizeClass($setup.ns.e("arrow"))
                        },
                        [..._cache[0] || (_cache[0] = [
                          _createElementVNode(
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
                              _createElementVNode("path", { d: "M5 12h14" }),
                              _createElementVNode("path", { d: "m12 5 7 7-7 7" })
                            ],
                            -1
                            /* CACHED */
                          )
                        ])],
                        2
                        /* CLASS */
                      )
                    ],
                    2
                    /* CLASS */
                  )
                ])
              ], 10, _hoisted_1);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ],
        2
        /* CLASS */
      )
    ],
    6
    /* CLASS, STYLE */
  );
}
var __sfc__ = /* @__PURE__ */ Object.assign({
  name: "YhAiPrompts"
}, {
  __name: "ai-prompts",
  props: aiPromptsProps,
  emits: aiPromptsEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("ai-prompts");
    const { themeStyle } = useComponentTheme("ai-prompts", props.themeOverrides);
    const handleClick = (item) => {
      emit("click", item);
    };
    const __returned__ = { props, emit, ns, themeStyle, handleClick, get useNamespace() {
      return useNamespace;
    }, get useComponentTheme() {
      return useComponentTheme;
    }, get aiPromptsProps() {
      return aiPromptsProps;
    }, get aiPromptsEmits() {
      return aiPromptsEmits;
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
