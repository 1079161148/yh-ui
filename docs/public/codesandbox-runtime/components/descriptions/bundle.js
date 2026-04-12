// public/codesandbox-runtime/components/descriptions/src/descriptions.js
import { renderSlot as _renderSlot, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, normalizeClass as _normalizeClass, createElementVNode as _createElementVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, renderList as _renderList, Fragment as _Fragment, resolveDynamicComponent as _resolveDynamicComponent, createBlock as _createBlock, normalizeStyle as _normalizeStyle } from "vue";
import { computed as computed2, useSlots, Fragment, provide as provide2 } from "vue";

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

// public/codesandbox-runtime/components/descriptions/src/descriptions-meta.js
var descriptionsProps = {
  title: String,
  extra: String,
  column: {
    type: Number,
    default: 3
  },
  direction: {
    type: String,
    default: "horizontal"
  },
  size: {
    type: String,
    default: "default"
  },
  border: {
    type: Boolean,
    default: false
  },
  colon: {
    type: Boolean,
    default: true
  },
  labelStyle: {
    type: Object
  },
  contentStyle: {
    type: Object
  },
  labelClassName: {
    type: String,
    default: ""
  },
  contentClassName: {
    type: String,
    default: ""
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
};
var descriptionsKey = Symbol("descriptionsKey");

// public/codesandbox-runtime/components/descriptions/src/descriptions.js
var __defProp2 = Object.defineProperty;
var __getOwnPropSymbols2 = Object.getOwnPropertySymbols;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __propIsEnum2 = Object.prototype.propertyIsEnumerable;
var __defNormalProp2 = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues2 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp2.call(b, prop))
      __defNormalProp2(a, prop, b[prop]);
  if (__getOwnPropSymbols2)
    for (var prop of __getOwnPropSymbols2(b)) {
      if (__propIsEnum2.call(b, prop))
        __defNormalProp2(a, prop, b[prop]);
    }
  return a;
};
var _hoisted_1 = { key: 2 };
var _hoisted_2 = ["colspan"];
var _hoisted_3 = ["colspan"];
var _hoisted_4 = ["colspan"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock(), _createElementBlock(
    "div",
    {
      class: _normalizeClass($setup.descriptionsClasses),
      style: _normalizeStyle($setup.themeStyle)
    },
    [
      _ctx.title || _ctx.extra || _ctx.$slots.title || _ctx.$slots.extra ? (_openBlock(), _createElementBlock(
        "div",
        {
          key: 0,
          class: _normalizeClass($setup.ns.e("header"))
        },
        [
          _createElementVNode(
            "div",
            {
              class: _normalizeClass($setup.ns.e("title"))
            },
            [
              _renderSlot(_ctx.$slots, "title", {}, () => [
                _createTextVNode(
                  _toDisplayString(_ctx.title),
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
              _renderSlot(_ctx.$slots, "extra", {}, () => [
                _createTextVNode(
                  _toDisplayString(_ctx.extra),
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
      )) : _createCommentVNode("v-if", true),
      _createElementVNode(
        "div",
        {
          class: _normalizeClass($setup.ns.e("body"))
        },
        [
          _createElementVNode(
            "table",
            {
              class: _normalizeClass([$setup.ns.e("table"), $setup.ns.is("bordered", _ctx.border)])
            },
            [
              _createElementVNode("tbody", null, [
                (_openBlock(true), _createElementBlock(
                  _Fragment,
                  null,
                  _renderList($setup.rows, (row, rowIndex) => {
                    return _openBlock(), _createElementBlock(
                      _Fragment,
                      { key: rowIndex },
                      [
                        _createCommentVNode(" \u6A2A\u5411\u5E03\u5C40 "),
                        _ctx.direction === "horizontal" ? (_openBlock(), _createElementBlock(
                          "tr",
                          {
                            key: 0,
                            class: _normalizeClass($setup.ns.e("row"))
                          },
                          [
                            (_openBlock(true), _createElementBlock(
                              _Fragment,
                              null,
                              _renderList(row, (item, cellIndex) => {
                                return _openBlock(), _createElementBlock(
                                  _Fragment,
                                  { key: cellIndex },
                                  [
                                    _createElementVNode(
                                      "th",
                                      {
                                        class: _normalizeClass([$setup.ns.e("label"), ...$setup.getClassName(item.props, "label")]),
                                        style: _normalizeStyle($setup.getStyle(item.props, "label"))
                                      },
                                      [
                                        item.slots.label ? (_openBlock(), _createBlock(_resolveDynamicComponent(item.slots.label), { key: 0 })) : (_openBlock(), _createElementBlock(
                                          _Fragment,
                                          { key: 1 },
                                          [
                                            _createTextVNode(
                                              _toDisplayString(item.props.label),
                                              1
                                              /* TEXT */
                                            )
                                          ],
                                          64
                                          /* STABLE_FRAGMENT */
                                        )),
                                        _ctx.colon && !_ctx.border && (item.props.label || item.slots.label) ? (_openBlock(), _createElementBlock("span", _hoisted_1, ":")) : _createCommentVNode("v-if", true)
                                      ],
                                      6
                                      /* CLASS, STYLE */
                                    ),
                                    _createElementVNode("td", {
                                      class: _normalizeClass([$setup.ns.e("content"), ...$setup.getClassName(item.props, "content")]),
                                      style: _normalizeStyle($setup.getStyle(item.props, "content")),
                                      colspan: item.actualSpan * 2 - 1 > 1 ? item.actualSpan * 2 - 1 : void 0
                                    }, [
                                      item.slots.default ? (_openBlock(), _createBlock(_resolveDynamicComponent(item.slots.default), { key: 0 })) : _createCommentVNode("v-if", true)
                                    ], 14, _hoisted_2)
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
                        )) : (_openBlock(), _createElementBlock(
                          _Fragment,
                          { key: 1 },
                          [
                            _createCommentVNode(" \u5782\u76F4\u5E03\u5C40 "),
                            _createElementVNode(
                              "tr",
                              {
                                class: _normalizeClass($setup.ns.e("row"))
                              },
                              [
                                (_openBlock(true), _createElementBlock(
                                  _Fragment,
                                  null,
                                  _renderList(row, (item, cellIndex) => {
                                    return _openBlock(), _createElementBlock("th", {
                                      key: cellIndex,
                                      class: _normalizeClass([$setup.ns.e("label"), ...$setup.getClassName(item.props, "label")]),
                                      style: _normalizeStyle($setup.getStyle(item.props, "label")),
                                      colspan: item.actualSpan
                                    }, [
                                      item.slots.label ? (_openBlock(), _createBlock(_resolveDynamicComponent(item.slots.label), { key: 0 })) : (_openBlock(), _createElementBlock(
                                        _Fragment,
                                        { key: 1 },
                                        [
                                          _createTextVNode(
                                            _toDisplayString(item.props.label),
                                            1
                                            /* TEXT */
                                          )
                                        ],
                                        64
                                        /* STABLE_FRAGMENT */
                                      ))
                                    ], 14, _hoisted_3);
                                  }),
                                  128
                                  /* KEYED_FRAGMENT */
                                ))
                              ],
                              2
                              /* CLASS */
                            ),
                            _createElementVNode(
                              "tr",
                              {
                                class: _normalizeClass($setup.ns.e("row"))
                              },
                              [
                                (_openBlock(true), _createElementBlock(
                                  _Fragment,
                                  null,
                                  _renderList(row, (item, cellIndex) => {
                                    return _openBlock(), _createElementBlock("td", {
                                      key: cellIndex,
                                      class: _normalizeClass([$setup.ns.e("content"), ...$setup.getClassName(item.props, "content")]),
                                      style: _normalizeStyle($setup.getStyle(item.props, "content")),
                                      colspan: item.actualSpan
                                    }, [
                                      item.slots.default ? (_openBlock(), _createBlock(_resolveDynamicComponent(item.slots.default), { key: 0 })) : _createCommentVNode("v-if", true)
                                    ], 14, _hoisted_4);
                                  }),
                                  128
                                  /* KEYED_FRAGMENT */
                                ))
                              ],
                              2
                              /* CLASS */
                            )
                          ],
                          64
                          /* STABLE_FRAGMENT */
                        ))
                      ],
                      64
                      /* STABLE_FRAGMENT */
                    );
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
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
    6
    /* CLASS, STYLE */
  );
}
var __sfc__ = /* @__PURE__ */ Object.assign({
  name: "YhDescriptions"
}, {
  __name: "descriptions",
  props: descriptionsProps,
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const slots = useSlots();
    const ns = useNamespace("descriptions");
    const { themeStyle } = useComponentTheme("descriptions", computed2(() => props.themeOverrides));
    provide2(descriptionsKey, { props });
    const getFlattenChildren = (nodes) => {
      const result = [];
      nodes.forEach((node) => {
        if (node.type === Fragment && Array.isArray(node.children)) {
          result.push(...getFlattenChildren(node.children));
        } else if (node.type && typeof node.type === "object" && "name" in node.type && node.type.name === "YhDescriptionsItem") {
          result.push(node);
        }
      });
      return result;
    };
    const rows = computed2(() => {
      const children = slots.default ? getFlattenChildren(slots.default()) : [];
      const rows2 = [];
      let tempRow = [];
      let occupiedSpan = 0;
      const totalColumn = Number(props.column);
      children.forEach((node, index) => {
        const itemProps = __spreadValues2({}, node.props || {});
        let span = Number(itemProps.span || 1);
        if (occupiedSpan + span > totalColumn) {
          if (tempRow.length > 0) {
            const lastItem = tempRow[tempRow.length - 1];
            lastItem.actualSpan += totalColumn - occupiedSpan;
            rows2.push(tempRow);
          }
          tempRow = [];
          occupiedSpan = 0;
        }
        const item = {
          props: itemProps,
          slots: node.children || {},
          actualSpan: span
        };
        tempRow.push(item);
        occupiedSpan += span;
        if (index === children.length - 1) {
          item.actualSpan += totalColumn - occupiedSpan;
          rows2.push(tempRow);
        }
      });
      return rows2;
    });
    const getStyle = (itemProps, type) => {
      const style = __spreadValues2({}, type === "label" ? props.labelStyle : props.contentStyle);
      const itemStyle = type === "label" ? itemProps.labelStyle : itemProps.contentStyle;
      Object.assign(style, itemStyle || {});
      if (type === "label") {
        if (itemProps.width) style.width = typeof itemProps.width === "number" ? `${itemProps.width}px` : itemProps.width;
        if (itemProps.minWidth) style.minWidth = typeof itemProps.minWidth === "number" ? `${itemProps.minWidth}px` : itemProps.minWidth;
        style.textAlign = itemProps.labelAlign || itemProps.align || "left";
      } else {
        style.textAlign = itemProps.align || "left";
      }
      return style;
    };
    const getClassName = (itemProps, type) => {
      const classes = [];
      if (type === "label" && props.labelClassName) {
        classes.push(props.labelClassName);
      }
      if (type === "content" && props.contentClassName) {
        classes.push(props.contentClassName);
      }
      if (type === "label" && itemProps.labelClassName) {
        classes.push(itemProps.labelClassName);
      }
      if (type === "content" && itemProps.className) {
        classes.push(itemProps.className);
      }
      return classes;
    };
    const descriptionsClasses = computed2(() => [
      ns.b(),
      ns.m(props.size),
      ns.is("bordered", props.border),
      ns.is("vertical", props.direction === "vertical")
    ]);
    const __returned__ = { props, slots, ns, themeStyle, getFlattenChildren, rows, getStyle, getClassName, descriptionsClasses, computed: computed2, useSlots, Fragment, provide: provide2, get useNamespace() {
      return useNamespace;
    }, get useComponentTheme() {
      return useComponentTheme;
    }, get descriptionsProps() {
      return descriptionsProps;
    }, get descriptionsKey() {
      return descriptionsKey;
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
