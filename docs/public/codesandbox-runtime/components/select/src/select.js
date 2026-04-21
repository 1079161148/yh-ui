var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
import { createCommentVNode as _createCommentVNode, renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, toDisplayString as _toDisplayString, normalizeClass as _normalizeClass, createElementVNode as _createElementVNode, withModifiers as _withModifiers, renderSlot as _renderSlot, createTextVNode as _createTextVNode, normalizeStyle as _normalizeStyle, vShow as _vShow, withDirectives as _withDirectives, Transition as _Transition, withCtx as _withCtx, createVNode as _createVNode, Teleport as _Teleport, createBlock as _createBlock } from "vue";
const _hoisted_1 = ["onClick"];
const _hoisted_2 = ["id", "value", "placeholder", "disabled", "readonly", "aria-expanded", "aria-controls"];
const _hoisted_3 = ["id"];
const _hoisted_4 = ["aria-selected", "onClick", "onMouseenter"];
const _hoisted_5 = ["aria-selected", "onClick", "onMouseenter"];
const _hoisted_6 = { key: 0 };
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock(), _createElementBlock(
    "div",
    {
      ref: "wrapperRef",
      class: _normalizeClass($setup.wrapperClasses),
      style: _normalizeStyle($setup.themeStyle),
      onMouseenter: $setup.handleMouseEnter,
      onMouseleave: $setup.handleMouseLeave,
      onClick: $setup.toggleDropdown
    },
    [
      _createCommentVNode(" \u8F93\u5165\u533A\u57DF "),
      _createElementVNode(
        "div",
        {
          class: _normalizeClass($setup.ns.e("wrapper"))
        },
        [
          _createCommentVNode(" \u591A\u9009\u6807\u7B7E "),
          $props.multiple ? (_openBlock(), _createElementBlock(
            _Fragment,
            { key: 0 },
            [
              (_openBlock(true), _createElementBlock(
                _Fragment,
                null,
                _renderList($setup.displayTags, (label, index) => {
                  return _openBlock(), _createElementBlock(
                    "span",
                    {
                      key: index,
                      class: _normalizeClass([$setup.ns.e("tag"), $props.tagType ? `yh-tag--${$props.tagType}` : ""])
                    },
                    [
                      _createElementVNode(
                        "span",
                        {
                          class: _normalizeClass($setup.ns.e("tag-text"))
                        },
                        _toDisplayString(label),
                        3
                        /* TEXT, CLASS */
                      ),
                      _createElementVNode("span", {
                        class: _normalizeClass($setup.ns.e("tag-close")),
                        onClick: ($event) => $setup.handleRemoveTag(Array.isArray($props.modelValue) ? $props.modelValue[index] : $props.modelValue, $event)
                      }, [..._cache[3] || (_cache[3] = [
                        _createElementVNode(
                          "svg",
                          {
                            viewBox: "0 0 1024 1024",
                            width: "1em",
                            height: "1em"
                          },
                          [
                            _createElementVNode("path", {
                              fill: "currentColor",
                              d: "M764.288 214.592L512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
                            })
                          ],
                          -1
                          /* CACHED */
                        )
                      ])], 10, _hoisted_1)
                    ],
                    2
                    /* CLASS */
                  );
                }),
                128
                /* KEYED_FRAGMENT */
              )),
              $setup.collapsedCount > 0 ? (_openBlock(), _createElementBlock(
                "span",
                {
                  key: 0,
                  class: _normalizeClass($setup.ns.e("tag"))
                },
                " +" + _toDisplayString($setup.collapsedCount),
                3
                /* TEXT, CLASS */
              )) : _createCommentVNode("v-if", true)
            ],
            64
            /* STABLE_FRAGMENT */
          )) : _createCommentVNode("v-if", true),
          _createCommentVNode(" \u8F93\u5165\u6846 "),
          _createElementVNode("input", {
            ref: "inputRef",
            id: $setup.inputId,
            class: _normalizeClass($setup.ns.e("inner")),
            value: $props.filterable ? $setup.query : "",
            placeholder: $setup.hasValue ? "" : $props.placeholder || $setup.t("select.placeholder"),
            disabled: $props.disabled,
            readonly: !$props.filterable,
            autocomplete: "off",
            role: "combobox",
            "aria-expanded": $setup.visible,
            "aria-controls": `${$setup.inputId}-listbox`,
            onInput: $setup.handleInput,
            onFocus: $setup.handleFocus,
            onBlur: $setup.handleBlur,
            onKeydown: $setup.handleKeydown
          }, null, 42, _hoisted_2),
          _createCommentVNode(" \u5355\u9009\u663E\u793A\u503C "),
          !$props.multiple && $setup.hasValue && !$setup.query ? (_openBlock(), _createElementBlock(
            "span",
            {
              key: 1,
              class: _normalizeClass($setup.ns.e("selected-value"))
            },
            _toDisplayString($setup.selectedLabels),
            3
            /* TEXT, CLASS */
          )) : _createCommentVNode("v-if", true),
          _createCommentVNode(" \u540E\u7F00\u56FE\u6807 "),
          _createElementVNode(
            "span",
            {
              class: _normalizeClass($setup.ns.e("suffix"))
            },
            [
              _createCommentVNode(" \u6E05\u7A7A\u6309\u94AE "),
              $setup.showClear ? (_openBlock(), _createElementBlock(
                "span",
                {
                  key: 0,
                  class: _normalizeClass([$setup.ns.e("icon"), $setup.ns.e("clear")]),
                  onClick: _withModifiers($setup.handleClear, ["stop"])
                },
                [..._cache[4] || (_cache[4] = [
                  _createElementVNode(
                    "svg",
                    {
                      viewBox: "0 0 1024 1024",
                      width: "1em",
                      height: "1em"
                    },
                    [
                      _createElementVNode("path", {
                        fill: "currentColor",
                        d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336L512 457.664z"
                      })
                    ],
                    -1
                    /* CACHED */
                  )
                ])],
                2
                /* CLASS */
              )) : _createCommentVNode("v-if", true),
              _createCommentVNode(" \u7BAD\u5934\u56FE\u6807 "),
              _createElementVNode(
                "span",
                {
                  class: _normalizeClass([$setup.ns.e("icon"), $setup.ns.e("arrow"), {
                    "is-reverse": $setup.visible
                  }])
                },
                [..._cache[5] || (_cache[5] = [
                  _createElementVNode(
                    "svg",
                    {
                      viewBox: "0 0 1024 1024",
                      width: "1em",
                      height: "1em"
                    },
                    [
                      _createElementVNode("path", {
                        fill: "currentColor",
                        d: "M831.872 340.864L512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z"
                      })
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
        ],
        2
        /* CLASS */
      ),
      _createCommentVNode(" \u4E0B\u62C9\u6846 "),
      (_openBlock(), _createBlock(_Teleport, {
        to: "body",
        disabled: !$props.teleported
      }, [
        _createVNode(_Transition, {
          name: $setup.ns.b("dropdown"),
          persisted: ""
        }, {
          default: _withCtx(() => [
            _withDirectives(_createElementVNode(
              "div",
              {
                class: _normalizeClass([$setup.ns.e("dropdown"), $props.popperClass]),
                style: _normalizeStyle($props.teleported ? $setup.dropdownStyle : {
                  minWidth: $props.fitInputWidth && $setup.wrapperRef ? `${$setup.wrapperRef.offsetWidth}px` : void 0
                }),
                onMousedown: $setup.handleDropdownMousedown,
                onMouseup: $setup.handleDropdownMouseup
              },
              [
                _createCommentVNode(" \u52A0\u8F7D\u72B6\u6001 "),
                $props.loading ? (_openBlock(), _createElementBlock(
                  "div",
                  {
                    key: 0,
                    class: _normalizeClass($setup.ns.e("loading"))
                  },
                  [
                    (_openBlock(), _createElementBlock(
                      "svg",
                      {
                        class: _normalizeClass($setup.ns.e("loading-icon")),
                        viewBox: "0 0 1024 1024"
                      },
                      [..._cache[6] || (_cache[6] = [
                        _createElementVNode(
                          "path",
                          {
                            fill: "currentColor",
                            d: "M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32zm448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zm-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32z"
                          },
                          null,
                          -1
                          /* CACHED */
                        )
                      ])],
                      2
                      /* CLASS */
                    )),
                    _createElementVNode(
                      "span",
                      null,
                      _toDisplayString($setup.translatedLoadingText),
                      1
                      /* TEXT */
                    )
                  ],
                  2
                  /* CLASS */
                )) : $setup.filteredOptions.length === 0 ? (_openBlock(), _createElementBlock(
                  _Fragment,
                  { key: 1 },
                  [
                    _createCommentVNode(" \u65E0\u6570\u636E "),
                    _createElementVNode(
                      "div",
                      {
                        class: _normalizeClass($setup.ns.e("empty"))
                      },
                      [
                        _renderSlot(_ctx.$slots, "empty", {}, () => [
                          _createTextVNode(
                            _toDisplayString($setup.query ? $setup.translatedNoMatchText : $setup.translatedNoDataText),
                            1
                            /* TEXT */
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
                    _createCommentVNode(" \u9009\u9879\u5217\u8868 "),
                    _createElementVNode("div", {
                      id: `${$setup.inputId}-listbox`,
                      class: _normalizeClass($setup.ns.e("options")),
                      role: "listbox",
                      style: _normalizeStyle($props.virtualScroll ? {
                        height: `${$props.height}px`,
                        overflow: "auto"
                      } : {}),
                      onScroll: _cache[2] || (_cache[2] = ($event) => $props.virtualScroll ? $setup.handleVirtualScroll($event) : void 0)
                    }, [
                      _createCommentVNode(" \u865A\u62DF\u6EDA\u52A8\u5360\u4F4D "),
                      $props.virtualScroll ? (_openBlock(), _createElementBlock(
                        "div",
                        {
                          key: 0,
                          style: _normalizeStyle({
                            height: `${$setup.totalHeight}px`,
                            position: "relative"
                          })
                        },
                        [
                          _createElementVNode(
                            "div",
                            {
                              style: _normalizeStyle({
                                transform: `translateY(${$setup.offsetY}px)`
                              })
                            },
                            [
                              (_openBlock(true), _createElementBlock(
                                _Fragment,
                                null,
                                _renderList($setup.displayOptions, (option, index) => {
                                  return _openBlock(), _createElementBlock("div", {
                                    key: String(option[$props.valueKey || "value"]),
                                    class: _normalizeClass([$setup.ns.e("option"), $setup.ns.is("selected", $setup.isSelected(option[$props.valueKey || "value"])), $setup.ns.is("disabled", option.disabled), $setup.ns.is("hovering", $setup.hoveredIndex === index)]),
                                    role: "option",
                                    "aria-selected": $setup.isSelected(option[$props.valueKey || "value"]),
                                    onMousedown: _cache[0] || (_cache[0] = _withModifiers(() => {
                                    }, ["prevent"])),
                                    onClick: ($event) => $setup.handleOptionClick(option, $event),
                                    onMouseenter: ($event) => $setup.hoveredIndex = $setup.startIndex + index
                                  }, [
                                    _renderSlot(_ctx.$slots, "option", { option }, () => [
                                      _createTextVNode(
                                        _toDisplayString(option[$props.labelKey || "label"] || option.label),
                                        1
                                        /* TEXT */
                                      )
                                    ]),
                                    $props.multiple && $setup.isSelected(option[$props.valueKey || "value"]) ? (_openBlock(), _createElementBlock(
                                      "span",
                                      {
                                        key: 0,
                                        class: _normalizeClass($setup.ns.e("option-check"))
                                      },
                                      [..._cache[7] || (_cache[7] = [
                                        _createElementVNode(
                                          "svg",
                                          {
                                            viewBox: "0 0 1024 1024",
                                            width: "1em",
                                            height: "1em"
                                          },
                                          [
                                            _createElementVNode("path", {
                                              fill: "currentColor",
                                              d: "M406.656 706.944L195.84 496.256a32 32 0 1 0-45.248 45.248l256 256 512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z"
                                            })
                                          ],
                                          -1
                                          /* CACHED */
                                        )
                                      ])],
                                      2
                                      /* CLASS */
                                    )) : _createCommentVNode("v-if", true)
                                  ], 42, _hoisted_4);
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
                      )) : (_openBlock(), _createElementBlock(
                        _Fragment,
                        { key: 1 },
                        [
                          _createCommentVNode(" \u666E\u901A\u5217\u8868 "),
                          (_openBlock(true), _createElementBlock(
                            _Fragment,
                            null,
                            _renderList($setup.displayOptions, (option, index) => {
                              return _openBlock(), _createElementBlock("div", {
                                key: String(option[$props.valueKey || "value"]),
                                class: _normalizeClass([$setup.ns.e("option"), $setup.ns.is("selected", $setup.isSelected(option[$props.valueKey || "value"])), $setup.ns.is("disabled", option.disabled), $setup.ns.is("hovering", $setup.hoveredIndex === index)]),
                                role: "option",
                                "aria-selected": $setup.isSelected(option[$props.valueKey || "value"]),
                                onMousedown: _cache[1] || (_cache[1] = _withModifiers(() => {
                                }, ["prevent"])),
                                onClick: ($event) => $setup.handleOptionClick(option, $event),
                                onMouseenter: ($event) => $setup.hoveredIndex = index
                              }, [
                                _renderSlot(_ctx.$slots, "option", { option }, () => [
                                  _createTextVNode(
                                    _toDisplayString(option[$props.labelKey || "label"] || option.label),
                                    1
                                    /* TEXT */
                                  )
                                ]),
                                $props.multiple && $setup.isSelected(option[$props.valueKey || "value"]) ? (_openBlock(), _createElementBlock(
                                  "span",
                                  {
                                    key: 0,
                                    class: _normalizeClass($setup.ns.e("option-check"))
                                  },
                                  [..._cache[8] || (_cache[8] = [
                                    _createElementVNode(
                                      "svg",
                                      {
                                        viewBox: "0 0 1024 1024",
                                        width: "1em",
                                        height: "1em"
                                      },
                                      [
                                        _createElementVNode("path", {
                                          fill: "currentColor",
                                          d: "M406.656 706.944L195.84 496.256a32 32 0 1 0-45.248 45.248l256 256 512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z"
                                        })
                                      ],
                                      -1
                                      /* CACHED */
                                    )
                                  ])],
                                  2
                                  /* CLASS */
                                )) : _createCommentVNode("v-if", true)
                              ], 42, _hoisted_5);
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ],
                        64
                        /* STABLE_FRAGMENT */
                      ))
                    ], 46, _hoisted_3)
                  ],
                  2112
                  /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                ))
              ],
              38
              /* CLASS, STYLE, NEED_HYDRATION */
            ), [
              [_vShow, $setup.visible]
            ])
          ]),
          _: 3
          /* FORWARDED */
        }, 8, ["name"])
      ], 8, ["disabled"])),
      _createCommentVNode(" \u9690\u85CF\u63D2\u69FD\uFF0C\u7528\u4E8E\u6CE8\u518C Option "),
      _ctx.$slots.default ? _withDirectives((_openBlock(), _createElementBlock(
        "div",
        _hoisted_6,
        [
          _renderSlot(_ctx.$slots, "default")
        ],
        512
        /* NEED_PATCH */
      )), [
        [_vShow, false]
      ]) : _createCommentVNode("v-if", true)
    ],
    38
    /* CLASS, STYLE, NEED_HYDRATION */
  );
}
import { computed, ref, nextTick, provide, watch, onMounted, onBeforeUnmount } from "vue";
import { useFormItem, useId, useLocale } from "../../../hooks/index.js";
import { useNamespace } from "../../../hooks/use-namespace/index.js";
import { useConfig } from "../../../hooks/use-config/index.js";
import { useComponentTheme } from "../../../theme/component-theme.js";
import { SelectContextKey } from "./select-meta.js";
const __sfc__ = /* @__PURE__ */ Object.assign({
  name: "YhSelect"
}, {
  __name: "select",
  props: {
    modelValue: { type: [String, Number, Boolean, Array], required: false },
    options: { type: Array, required: false },
    placeholder: { type: String, required: false },
    disabled: { type: Boolean, required: false, default: false },
    clearable: { type: Boolean, required: false, default: false },
    size: { type: String, required: false, default: void 0 },
    multiple: { type: Boolean, required: false, default: false },
    multipleLimit: { type: Number, required: false, default: 0 },
    filterable: { type: Boolean, required: false, default: false },
    filterMethod: { type: Function, required: false },
    remote: { type: Boolean, required: false, default: false },
    remoteMethod: { type: Function, required: false },
    loading: { type: Boolean, required: false, default: false },
    loadingText: { type: String, required: false, default: "" },
    noMatchText: { type: String, required: false, default: "" },
    noDataText: { type: String, required: false, default: "" },
    allowCreate: { type: Boolean, required: false, default: false },
    collapseTags: { type: Boolean, required: false, default: false },
    collapseTagsTooltip: { type: Boolean, required: false, default: false },
    maxCollapseTags: { type: Number, required: false, default: 1 },
    popperClass: { type: String, required: false },
    teleported: { type: Boolean, required: false, default: true },
    fitInputWidth: { type: Boolean, required: false, default: true },
    tagType: { type: String, required: false, default: "" },
    virtualScroll: { type: Boolean, required: false, default: false },
    itemHeight: { type: Number, required: false, default: 34 },
    height: { type: Number, required: false, default: 274 },
    validateEvent: { type: Boolean, required: false, default: true },
    valueKey: { type: String, required: false, default: "value" },
    labelKey: { type: String, required: false, default: "label" },
    themeOverrides: { type: null, required: false }
  },
  emits: ["update:modelValue", "change", "focus", "blur", "clear", "visible-change", "remove-tag"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("select");
    const { t } = useLocale();
    const inputId = useId();
    const { themeStyle } = useComponentTheme(
      "select",
      computed(() => props.themeOverrides)
    );
    const { form, formItem, validate: triggerValidate } = useFormItem();
    const { globalSize } = useConfig();
    const selectSize = computed(
      () => props.size || (formItem == null ? void 0 : formItem.size) || (form == null ? void 0 : form.size) || globalSize.value || "default"
    );
    const translatedLoadingText = computed(() => props.loadingText || t("select.loading"));
    const translatedNoMatchText = computed(() => props.noMatchText || t("select.noMatch"));
    const translatedNoDataText = computed(() => props.noDataText || t("select.noData"));
    const wrapperRef = ref();
    const inputRef = ref();
    const visible = ref(false);
    const focused = ref(false);
    const hovering = ref(false);
    const query = ref("");
    const hoveredIndex = ref(-1);
    const createdOptions = ref([]);
    const slotOptions = ref([]);
    const onOptionCreate = (option) => {
      const index = slotOptions.value.findIndex((o) => o.value === option.value);
      if (index > -1) {
        slotOptions.value.splice(index, 1, option);
      } else {
        slotOptions.value.push(option);
      }
    };
    const onOptionDestroy = (value) => {
      const index = slotOptions.value.findIndex((o) => o.value === value);
      if (index > -1) {
        slotOptions.value.splice(index, 1);
      }
    };
    const dropdownStyle = ref({});
    const updateDropdownPosition = () => {
      if (!wrapperRef.value || !props.teleported) return;
      const rect = wrapperRef.value.getBoundingClientRect();
      const styles = window.getComputedStyle(wrapperRef.value);
      const primary = styles.getPropertyValue("--yh-color-primary").trim();
      const primaryRgb = styles.getPropertyValue("--yh-color-primary-rgb").trim();
      const primaryLight9 = styles.getPropertyValue("--yh-color-primary-light-9").trim();
      dropdownStyle.value = __spreadProps(__spreadValues({}, themeStyle.value), {
        position: "fixed",
        top: `${rect.bottom + 4}px`,
        left: `${rect.left}px`,
        minWidth: props.fitInputWidth ? `${rect.width}px` : void 0,
        zIndex: "2000",
        "--yh-color-primary": primary,
        "--yh-color-primary-rgb": primaryRgb,
        "--yh-color-primary-light-9": primaryLight9
      });
    };
    watch(visible, (val) => {
      if (val && props.teleported) {
        nextTick(updateDropdownPosition);
      }
    });
    onMounted(() => {
      if (props.teleported) {
        window.addEventListener("scroll", updateDropdownPosition, true);
        window.addEventListener("resize", updateDropdownPosition);
      }
    });
    onBeforeUnmount(() => {
      if (props.teleported) {
        window.removeEventListener("scroll", updateDropdownPosition, true);
        window.removeEventListener("resize", updateDropdownPosition);
      }
    });
    const allOptions = computed(() => {
      return [...createdOptions.value, ...slotOptions.value, ...props.options || []];
    });
    const filteredOptions = computed(() => {
      if (!props.filterable || !query.value) {
        return allOptions.value;
      }
      const q = query.value.toLowerCase();
      return allOptions.value.filter((opt) => {
        const label = String(opt[props.labelKey || "label"] || opt.label || "");
        return label.toLowerCase().includes(q);
      });
    });
    const scrollTop = ref(0);
    const virtualConfig = computed(() => {
      const itemHeight = props.itemHeight || 34;
      const containerHeight = props.height || 274;
      const overscan = 3;
      const items = filteredOptions.value;
      if (!props.virtualScroll || items.length === 0) {
        return {
          visibleItems: items,
          totalHeight: items.length * itemHeight,
          offsetY: 0,
          startIndex: 0,
          endIndex: items.length
        };
      }
      const visibleCount = Math.ceil(containerHeight / itemHeight);
      const start = Math.floor(scrollTop.value / itemHeight);
      const startIndex2 = Math.max(0, start - overscan);
      const endIndex = Math.min(items.length, start + visibleCount + overscan);
      return {
        visibleItems: items.slice(startIndex2, endIndex),
        totalHeight: items.length * itemHeight,
        offsetY: startIndex2 * itemHeight,
        startIndex: startIndex2,
        endIndex
      };
    });
    const handleVirtualScroll = (event) => {
      const target = event.target;
      scrollTop.value = target.scrollTop;
    };
    const displayOptions = computed(() => {
      return props.virtualScroll ? virtualConfig.value.visibleItems : filteredOptions.value;
    });
    const totalHeight = computed(() => virtualConfig.value.totalHeight);
    const offsetY = computed(() => virtualConfig.value.offsetY);
    const startIndex = computed(() => virtualConfig.value.startIndex);
    const selectedLabels = computed(() => {
      var _a;
      if (props.multiple) {
        const values = Array.isArray(props.modelValue) ? props.modelValue : [];
        return values.map((v) => {
          const opt2 = allOptions.value.find((o) => o[props.valueKey || "value"] === v);
          return opt2 ? opt2[props.labelKey || "label"] || opt2.label : String(v);
        });
      }
      const opt = allOptions.value.find((o) => o[props.valueKey || "value"] === props.modelValue);
      return opt ? opt[props.labelKey || "label"] || opt.label : String((_a = props.modelValue) != null ? _a : "");
    });
    const displayTags = computed(() => {
      if (!props.multiple || !Array.isArray(selectedLabels.value)) return [];
      if (props.collapseTags) {
        return selectedLabels.value.slice(0, props.maxCollapseTags);
      }
      return selectedLabels.value;
    });
    const collapsedCount = computed(() => {
      if (!props.multiple || !props.collapseTags || !Array.isArray(selectedLabels.value)) return 0;
      return Math.max(0, selectedLabels.value.length - (props.maxCollapseTags || 1));
    });
    const showClear = computed(
      () => props.clearable && !props.disabled && (props.multiple ? Array.isArray(props.modelValue) && props.modelValue.length > 0 : props.modelValue !== void 0 && props.modelValue !== "") && (focused.value || hovering.value)
    );
    const hasValue = computed(() => {
      if (props.multiple) {
        return Array.isArray(props.modelValue) && props.modelValue.length > 0;
      }
      return props.modelValue !== void 0 && props.modelValue !== "";
    });
    const wrapperClasses = computed(() => [
      ns.b(),
      ns.m(selectSize.value),
      ns.is("disabled", props.disabled),
      ns.is("focused", focused.value || visible.value),
      ns.is("multiple", props.multiple)
    ]);
    const isSelected = (value) => {
      if (props.multiple) {
        return Array.isArray(props.modelValue) && props.modelValue.includes(value);
      }
      return props.modelValue === value;
    };
    const handleOptionSelect = (option, event) => {
      if (option.disabled) return;
      if (event) {
        event.stopPropagation();
      }
      const value = option[props.valueKey || "value"];
      if (props.multiple) {
        const values = Array.isArray(props.modelValue) ? [...props.modelValue] : [];
        const index = values.indexOf(value);
        if (index > -1) {
          values.splice(index, 1);
        } else {
          if (props.multipleLimit && props.multipleLimit > 0 && values.length >= props.multipleLimit) {
            return;
          }
          values.push(value);
        }
        emit("update:modelValue", values);
        emit("change", values);
      } else {
        emit("update:modelValue", value);
        emit("change", value);
        visible.value = false;
      }
      if (props.validateEvent) {
        triggerValidate("change");
      }
      query.value = "";
    };
    const handleRemoveTag = (value, event) => {
      event.stopPropagation();
      if (props.disabled) return;
      const values = Array.isArray(props.modelValue) ? [...props.modelValue] : [];
      const index = values.indexOf(value);
      if (index > -1) {
        values.splice(index, 1);
        emit("update:modelValue", values);
        emit("change", values);
        emit("remove-tag", value);
        if (props.validateEvent) {
          triggerValidate("change");
        }
      }
    };
    const handleClear = (event) => {
      event.stopPropagation();
      const value = props.multiple ? [] : void 0;
      emit("update:modelValue", value);
      emit("change", value);
      emit("clear");
      query.value = "";
      if (props.validateEvent) {
        triggerValidate("change");
      }
    };
    const toggleDropdown = () => {
      if (props.disabled) return;
      visible.value = !visible.value;
      emit("visible-change", visible.value);
      if (visible.value) {
        nextTick(() => {
          var _a;
          if (props.filterable) {
            (_a = inputRef.value) == null ? void 0 : _a.focus();
          }
        });
      }
    };
    const handleInput = (event) => {
      const target = event.target;
      query.value = target.value;
      if (props.remote && props.remoteMethod) {
        props.remoteMethod(query.value);
      } else if (props.filterMethod) {
        props.filterMethod(query.value);
      }
    };
    const handleKeydown = (event) => {
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          if (!visible.value) {
            visible.value = true;
            emit("visible-change", true);
          } else {
            hoveredIndex.value = Math.min(hoveredIndex.value + 1, filteredOptions.value.length - 1);
          }
          break;
        case "ArrowUp":
          event.preventDefault();
          hoveredIndex.value = Math.max(hoveredIndex.value - 1, 0);
          break;
        case "Enter":
          event.preventDefault();
          if (visible.value && hoveredIndex.value >= 0 && filteredOptions.value[hoveredIndex.value]) {
            handleOptionSelect(filteredOptions.value[hoveredIndex.value]);
          } else if (props.allowCreate && query.value) {
            const newOption = {
              value: query.value,
              label: query.value,
              [props.valueKey || "value"]: query.value,
              [props.labelKey || "label"]: query.value
            };
            createdOptions.value.push(newOption);
            handleOptionSelect(newOption);
          }
          break;
        case "Escape":
          visible.value = false;
          emit("visible-change", false);
          break;
        case "Backspace":
          if (props.multiple && !query.value && Array.isArray(props.modelValue) && props.modelValue.length > 0) {
            const values = [...props.modelValue];
            const removed = values.pop();
            if (removed !== void 0) {
              emit("update:modelValue", values);
              emit("change", values);
              emit("remove-tag", removed);
            }
          }
          break;
      }
    };
    const isClickingDropdown = ref(false);
    const handleFocus = (event) => {
      focused.value = true;
      emit("focus", event);
    };
    const handleBlur = (event) => {
      if (isClickingDropdown.value) {
        return;
      }
      focused.value = false;
      visible.value = false;
      emit("visible-change", false);
      emit("blur", event);
      if (props.validateEvent) {
        triggerValidate("blur");
      }
    };
    const handleDropdownMousedown = (event) => {
      event.preventDefault();
      isClickingDropdown.value = true;
    };
    const handleDropdownMouseup = () => {
      setTimeout(() => {
        isClickingDropdown.value = false;
      }, 0);
    };
    const handleOptionClick = (option, event) => {
      event.stopPropagation();
      handleOptionSelect(option, event);
      if (!props.multiple) {
        nextTick(() => {
          var _a;
          (_a = inputRef.value) == null ? void 0 : _a.focus();
        });
      }
    };
    const handleMouseEnter = () => {
      hovering.value = true;
    };
    const handleMouseLeave = () => {
      hovering.value = false;
    };
    const focus = () => {
      var _a;
      (_a = inputRef.value) == null ? void 0 : _a.focus();
    };
    const blur = () => {
      var _a;
      (_a = inputRef.value) == null ? void 0 : _a.blur();
    };
    provide(SelectContextKey, {
      props,
      selectValue: computed(() => props.modelValue),
      hoveredIndex,
      handleOptionSelect: (option, event) => handleOptionSelect(option, event),
      isSelected,
      onOptionCreate,
      onOptionDestroy
    });
    __expose({
      focus,
      blur,
      inputRef
    });
    const __returned__ = { props, emit, ns, t, inputId, themeStyle, form, formItem, triggerValidate, globalSize, selectSize, translatedLoadingText, translatedNoMatchText, translatedNoDataText, wrapperRef, inputRef, visible, focused, hovering, query, hoveredIndex, createdOptions, slotOptions, onOptionCreate, onOptionDestroy, dropdownStyle, updateDropdownPosition, allOptions, filteredOptions, scrollTop, virtualConfig, handleVirtualScroll, displayOptions, totalHeight, offsetY, startIndex, selectedLabels, displayTags, collapsedCount, showClear, hasValue, wrapperClasses, isSelected, handleOptionSelect, handleRemoveTag, handleClear, toggleDropdown, handleInput, handleKeydown, isClickingDropdown, handleFocus, handleBlur, handleDropdownMousedown, handleDropdownMouseup, handleOptionClick, handleMouseEnter, handleMouseLeave, focus, blur, computed, ref, nextTick, provide, watch, onMounted, onBeforeUnmount, get useNamespace() {
      return useNamespace;
    }, get useFormItem() {
      return useFormItem;
    }, get useId() {
      return useId;
    }, get useLocale() {
      return useLocale;
    }, get useConfig() {
      return useConfig;
    }, get useComponentTheme() {
      return useComponentTheme;
    }, get SelectContextKey() {
      return SelectContextKey;
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
