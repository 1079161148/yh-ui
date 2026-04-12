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
import { createCommentVNode as _createCommentVNode, renderSlot as _renderSlot, normalizeClass as _normalizeClass, openBlock as _openBlock, createElementBlock as _createElementBlock, resolveDynamicComponent as _resolveDynamicComponent, createBlock as _createBlock, toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, withModifiers as _withModifiers, renderList as _renderList, Fragment as _Fragment, createTextVNode as _createTextVNode, vShow as _vShow, normalizeStyle as _normalizeStyle, withDirectives as _withDirectives, Transition as _Transition, withCtx as _withCtx, createVNode as _createVNode, Teleport as _Teleport } from "vue";
const _hoisted_1 = ["id", "value", "placeholder", "disabled", "name", "autocomplete", "autofocus", "aria-expanded", "aria-controls", "aria-activedescendant"];
const _hoisted_2 = ["id"];
const _hoisted_3 = ["id", "aria-selected", "onClick", "onMouseenter"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock(), _createElementBlock(
    "div",
    {
      ref: "wrapperRef",
      class: _normalizeClass($setup.wrapperClasses),
      style: _normalizeStyle($setup.themeStyle),
      onMouseenter: $setup.handleMouseEnter,
      onMouseleave: $setup.handleMouseLeave
    },
    [
      _createCommentVNode(" \u524D\u7F6E\u5143\u7D20 "),
      $setup.hasPrepend ? (_openBlock(), _createElementBlock(
        "div",
        {
          key: 0,
          class: _normalizeClass($setup.ns.e("prepend"))
        },
        [
          _renderSlot(_ctx.$slots, "prepend")
        ],
        2
        /* CLASS */
      )) : _createCommentVNode("v-if", true),
      _createCommentVNode(" \u8F93\u5165\u6846\u5305\u88C5\u5668 "),
      _createElementVNode(
        "div",
        {
          class: _normalizeClass($setup.ns.e("wrapper"))
        },
        [
          _createCommentVNode(" \u524D\u7F6E\u56FE\u6807 "),
          $setup.hasPrefix ? (_openBlock(), _createElementBlock(
            "span",
            {
              key: 0,
              class: _normalizeClass($setup.ns.e("prefix"))
            },
            [
              _renderSlot(_ctx.$slots, "prefix", {}, () => [
                $props.prefixIcon && typeof $props.prefixIcon !== "string" ? (_openBlock(), _createBlock(_resolveDynamicComponent($props.prefixIcon), {
                  key: 0,
                  class: _normalizeClass($setup.ns.e("icon"))
                }, null, 8, ["class"])) : $props.prefixIcon ? (_openBlock(), _createElementBlock(
                  "span",
                  {
                    key: 1,
                    class: _normalizeClass($setup.ns.e("icon"))
                  },
                  _toDisplayString($props.prefixIcon),
                  3
                  /* TEXT, CLASS */
                )) : _createCommentVNode("v-if", true)
              ])
            ],
            2
            /* CLASS */
          )) : _createCommentVNode("v-if", true),
          _createCommentVNode(" \u8F93\u5165\u6846 "),
          _createElementVNode("input", {
            ref: "inputRef",
            id: $setup.inputId,
            class: _normalizeClass($setup.ns.e("inner")),
            value: $props.modelValue,
            placeholder: $props.placeholder || $setup.t("autocomplete.placeholder"),
            disabled: $setup.autocompleteDisabled,
            name: $props.name,
            autocomplete: $props.autocomplete,
            autofocus: $props.autofocus,
            role: "combobox",
            "aria-expanded": $setup.visible,
            "aria-autocomplete": "list",
            "aria-controls": `${$setup.inputId}-listbox`,
            "aria-activedescendant": $setup.highlightedIndex >= 0 ? `${$setup.inputId}-option-${$setup.highlightedIndex}` : void 0,
            onInput: $setup.handleInput,
            onChange: $setup.handleChange,
            onFocus: $setup.handleFocus,
            onBlur: $setup.handleBlur,
            onKeydown: $setup.handleKeydown
          }, null, 42, _hoisted_1),
          _createCommentVNode(" \u540E\u7F6E\u56FE\u6807 "),
          $setup.hasSuffix ? (_openBlock(), _createElementBlock(
            "span",
            {
              key: 1,
              class: _normalizeClass($setup.ns.e("suffix"))
            },
            [
              _createCommentVNode(" \u6E05\u7A7A\u6309\u94AE "),
              $setup.showClear ? (_openBlock(), _createElementBlock(
                "span",
                {
                  key: 0,
                  class: _normalizeClass([$setup.ns.e("icon"), $setup.ns.e("clear")]),
                  onMousedown: _cache[0] || (_cache[0] = _withModifiers(() => {
                  }, ["prevent"])),
                  onClick: _withModifiers($setup.handleClear, ["stop"])
                },
                [..._cache[4] || (_cache[4] = [
                  _createElementVNode(
                    "svg",
                    {
                      viewBox: "0 0 1024 1024",
                      xmlns: "http://www.w3.org/2000/svg",
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
                34
                /* CLASS, NEED_HYDRATION */
              )) : _createCommentVNode("v-if", true),
              _createCommentVNode(" \u540E\u7F6E\u56FE\u6807\u63D2\u69FD "),
              _renderSlot(_ctx.$slots, "suffix", {}, () => [
                $props.suffixIcon && typeof $props.suffixIcon !== "string" ? (_openBlock(), _createBlock(_resolveDynamicComponent($props.suffixIcon), {
                  key: 0,
                  class: _normalizeClass($setup.ns.e("icon"))
                }, null, 8, ["class"])) : $props.suffixIcon ? (_openBlock(), _createElementBlock(
                  "span",
                  {
                    key: 1,
                    class: _normalizeClass($setup.ns.e("icon"))
                  },
                  _toDisplayString($props.suffixIcon),
                  3
                  /* TEXT, CLASS */
                )) : _createCommentVNode("v-if", true)
              ])
            ],
            2
            /* CLASS */
          )) : _createCommentVNode("v-if", true)
        ],
        2
        /* CLASS */
      ),
      _createCommentVNode(" \u540E\u7F6E\u5143\u7D20 "),
      $setup.hasAppend ? (_openBlock(), _createElementBlock(
        "div",
        {
          key: 1,
          class: _normalizeClass($setup.ns.e("append"))
        },
        [
          _renderSlot(_ctx.$slots, "append")
        ],
        2
        /* CLASS */
      )) : _createCommentVNode("v-if", true),
      _createCommentVNode(" \u4E0B\u62C9\u5EFA\u8BAE\u5217\u8868 "),
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
                ref: "dropdownRef",
                class: _normalizeClass([$setup.ns.e("dropdown"), $props.popperClass]),
                style: _normalizeStyle($props.teleported ? $setup.dropdownStyle : {}),
                onMousedown: _cache[2] || (_cache[2] = ($event) => $setup.isClickingDropdown = true),
                onMouseup: _cache[3] || (_cache[3] = ($event) => $setup.isClickingDropdown = false)
              },
              [
                _createCommentVNode(" \u52A0\u8F7D\u72B6\u6001 "),
                $setup.loading ? (_openBlock(), _createElementBlock(
                  "div",
                  {
                    key: 0,
                    class: _normalizeClass($setup.ns.e("loading"))
                  },
                  [
                    _renderSlot(_ctx.$slots, "loading", {}, () => [
                      (_openBlock(), _createElementBlock(
                        "svg",
                        {
                          class: _normalizeClass($setup.ns.e("loading-icon")),
                          viewBox: "0 0 1024 1024",
                          xmlns: "http://www.w3.org/2000/svg"
                        },
                        [..._cache[5] || (_cache[5] = [
                          _createElementVNode(
                            "path",
                            {
                              fill: "currentColor",
                              d: "M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32zm448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zm-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32zM195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0zm-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z"
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
                        _toDisplayString($setup.t("autocomplete.loading")),
                        1
                        /* TEXT */
                      )
                    ])
                  ],
                  2
                  /* CLASS */
                )) : $setup.suggestions.length > 0 ? (_openBlock(), _createElementBlock(
                  _Fragment,
                  { key: 1 },
                  [
                    _createCommentVNode(" \u5EFA\u8BAE\u5217\u8868 "),
                    _createElementVNode("ul", {
                      ref: "listRef",
                      id: `${$setup.inputId}-listbox`,
                      class: _normalizeClass($setup.ns.e("suggestions")),
                      role: "listbox"
                    }, [
                      (_openBlock(true), _createElementBlock(
                        _Fragment,
                        null,
                        _renderList($setup.suggestions, (item, index) => {
                          return _openBlock(), _createElementBlock("li", {
                            key: index,
                            id: `${$setup.inputId}-option-${index}`,
                            class: _normalizeClass([$setup.ns.e("suggestion"), $setup.ns.is("highlighted", $setup.highlightedIndex === index)]),
                            role: "option",
                            "aria-selected": $setup.highlightedIndex === index,
                            onMousedown: _cache[1] || (_cache[1] = _withModifiers(() => {
                            }, ["prevent"])),
                            onClick: ($event) => $setup.handleSelect(item),
                            onMouseenter: ($event) => $setup.highlightedIndex = index
                          }, [
                            _renderSlot(_ctx.$slots, "default", { item }, () => [
                              _createTextVNode(
                                _toDisplayString(item[$props.valueKey] || item.value),
                                1
                                /* TEXT */
                              )
                            ])
                          ], 42, _hoisted_3);
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ], 10, _hoisted_2)
                  ],
                  2112
                  /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                )) : $setup.slots.empty ? (_openBlock(), _createElementBlock(
                  _Fragment,
                  { key: 2 },
                  [
                    _createCommentVNode(" \u65E0\u6570\u636E "),
                    _createElementVNode(
                      "div",
                      {
                        class: _normalizeClass($setup.ns.e("empty"))
                      },
                      [
                        _renderSlot(_ctx.$slots, "empty")
                      ],
                      2
                      /* CLASS */
                    )
                  ],
                  2112
                  /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                )) : _createCommentVNode("v-if", true)
              ],
              38
              /* CLASS, STYLE, NEED_HYDRATION */
            ), [
              [_vShow, $setup.visible && ($setup.suggestions.length > 0 || $setup.loading || $setup.slots.empty)]
            ])
          ]),
          _: 3
          /* FORWARDED */
        }, 8, ["name"])
      ], 8, ["disabled"]))
    ],
    38
    /* CLASS, STYLE, NEED_HYDRATION */
  );
}
import { computed, ref, watch, nextTick, useSlots, onMounted, onBeforeUnmount } from "vue";
import { useFormItem, useId, useZIndex, useLocale } from "../../../hooks/index.js";
import { useNamespace } from "../../../hooks/use-namespace/index.js";
import { useConfig } from "../../../hooks/use-config/index.js";
import { useComponentTheme } from "../../../theme/component-theme.js";
const __sfc__ = /* @__PURE__ */ Object.assign({
  name: "YhAutocomplete"
}, {
  __name: "autocomplete",
  props: {
    modelValue: { type: String, required: false },
    placeholder: { type: String, required: false },
    disabled: { type: Boolean, required: false, default: false },
    clearable: { type: Boolean, required: false, default: false },
    size: { type: String, required: false, default: void 0 },
    fetchSuggestions: { type: Function, required: false },
    triggerOnFocus: { type: Boolean, required: false, default: true },
    debounce: { type: Number, required: false, default: 300 },
    placement: { type: String, required: false, default: "bottom-start" },
    valueKey: { type: String, required: false, default: "value" },
    popperClass: { type: String, required: false },
    teleported: { type: Boolean, required: false, default: true },
    fitInputWidth: { type: Boolean, required: false, default: true },
    highlightFirstItem: { type: Boolean, required: false, default: false },
    prefixIcon: { type: null, required: false },
    suffixIcon: { type: null, required: false },
    validateEvent: { type: Boolean, required: false, default: true },
    autofocus: { type: Boolean, required: false, default: false },
    name: { type: String, required: false },
    autocomplete: { type: String, required: false, default: "off" },
    themeOverrides: { type: null, required: false }
  },
  emits: ["update:modelValue", "input", "change", "focus", "blur", "clear", "select"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const slots = useSlots();
    const ns = useNamespace("autocomplete");
    const inputId = useId();
    const { t } = useLocale();
    const { nextZIndex } = useZIndex();
    const { themeStyle } = useComponentTheme(
      "autocomplete",
      computed(() => props.themeOverrides)
    );
    const { form, formItem, validate: triggerValidate } = useFormItem();
    const { globalSize } = useConfig();
    const autocompleteSize = computed(
      () => props.size || (formItem == null ? void 0 : formItem.size) || (form == null ? void 0 : form.size) || globalSize.value || "default"
    );
    const autocompleteDisabled = computed(() => props.disabled || (form == null ? void 0 : form.disabled) || false);
    const inputRef = ref();
    const wrapperRef = ref();
    const dropdownRef = ref();
    const listRef = ref();
    const focused = ref(false);
    const hovering = ref(false);
    const visible = ref(false);
    const loading = ref(false);
    const suggestions = ref([]);
    const highlightedIndex = ref(-1);
    const isClickingDropdown = ref(false);
    const dropdownZIndex = ref(nextZIndex());
    const dropdownStyle = ref({});
    let debounceTimer = null;
    const showClear = computed(
      () => props.clearable && !autocompleteDisabled.value && !!props.modelValue && (focused.value || hovering.value)
    );
    const hasPrefix = computed(() => !!slots.prefix || !!props.prefixIcon);
    const hasSuffix = computed(() => !!slots.suffix || !!props.suffixIcon || showClear.value);
    const hasPrepend = computed(() => !!slots.prepend);
    const hasAppend = computed(() => !!slots.append);
    const wrapperClasses = computed(() => [
      ns.b(),
      ns.m(autocompleteSize.value),
      ns.is("disabled", autocompleteDisabled.value),
      ns.is("focused", focused.value),
      {
        [ns.b("group")]: hasPrepend.value || hasAppend.value,
        [ns.bem("group", "", "prepend")]: hasPrepend.value,
        [ns.bem("group", "", "append")]: hasAppend.value
      }
    ]);
    const updateDropdownPosition = () => {
      if (!wrapperRef.value || !props.teleported) return;
      const rect = wrapperRef.value.getBoundingClientRect();
      const styles = window.getComputedStyle(wrapperRef.value);
      const primary = styles.getPropertyValue("--yh-color-primary").trim();
      const primaryRgb = styles.getPropertyValue("--yh-color-primary-rgb").trim();
      const style = __spreadProps(__spreadValues({}, themeStyle.value), {
        position: "fixed",
        zIndex: String(dropdownZIndex.value),
        minWidth: props.fitInputWidth ? `${rect.width}px` : "auto",
        "--yh-color-primary": primary,
        "--yh-color-primary-rgb": primaryRgb
      });
      if (props.placement.startsWith("top")) {
        style.bottom = `${window.innerHeight - rect.top + 4}px`;
      } else {
        style.top = `${rect.bottom + 4}px`;
      }
      if (props.placement.endsWith("start")) {
        style.left = `${rect.left}px`;
      } else if (props.placement.endsWith("end")) {
        style.right = `${window.innerWidth - rect.right}px`;
      } else {
        style.left = `${rect.left}px`;
      }
      dropdownStyle.value = style;
    };
    watch(visible, (val) => {
      if (val) {
        dropdownZIndex.value = nextZIndex();
        if (props.teleported) {
          nextTick(updateDropdownPosition);
        }
      }
    });
    const handleResize = () => {
      if (visible.value) {
        updateDropdownPosition();
      }
    };
    const handleScroll = () => {
      if (visible.value) {
        updateDropdownPosition();
      }
    };
    const handleOutsideClick = (e) => {
      var _a, _b;
      const target = e.target;
      if (((_a = wrapperRef.value) == null ? void 0 : _a.contains(target)) || ((_b = dropdownRef.value) == null ? void 0 : _b.contains(target))) {
        return;
      }
      visible.value = false;
    };
    onMounted(() => {
      if (props.teleported) {
        window.addEventListener("resize", handleResize);
        window.addEventListener("scroll", handleScroll, true);
      }
      window.addEventListener("click", handleOutsideClick);
    });
    onBeforeUnmount(() => {
      if (props.teleported) {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("scroll", handleScroll, true);
      }
      window.removeEventListener("click", handleOutsideClick);
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    });
    const fetchSuggestions = (query) => {
      if (!props.fetchSuggestions) {
        suggestions.value = [];
        return;
      }
      loading.value = true;
      if (focused.value) {
        visible.value = true;
      }
      props.fetchSuggestions(query, (results) => {
        loading.value = false;
        suggestions.value = results || [];
        if (props.highlightFirstItem && suggestions.value.length > 0) {
          highlightedIndex.value = 0;
        } else {
          highlightedIndex.value = -1;
        }
        if (focused.value) {
          visible.value = true;
        }
      });
    };
    const debouncedFetch = (query) => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
      debounceTimer = setTimeout(() => {
        fetchSuggestions(query);
      }, props.debounce);
    };
    const handleInput = (event) => {
      const target = event.target;
      const value = target.value;
      emit("update:modelValue", value);
      emit("input", value);
      if (value) {
        debouncedFetch(value);
      } else {
        suggestions.value = [];
        visible.value = false;
      }
    };
    const handleChange = (event) => {
      const target = event.target;
      emit("change", target.value);
    };
    const handleFocus = (event) => {
      focused.value = true;
      emit("focus", event);
      if (props.triggerOnFocus) {
        fetchSuggestions(props.modelValue || "");
      }
    };
    const handleBlur = (event) => {
      setTimeout(() => {
        if (!isClickingDropdown.value) {
          focused.value = false;
          visible.value = false;
          emit("blur", event);
          if (props.validateEvent) {
            triggerValidate("blur");
          }
        }
      }, 150);
    };
    const handleMouseEnter = () => {
      hovering.value = true;
    };
    const handleMouseLeave = () => {
      hovering.value = false;
    };
    const handleClear = () => {
      emit("update:modelValue", "");
      emit("change", "");
      emit("clear");
      suggestions.value = [];
      visible.value = false;
      nextTick(() => {
        focus();
      });
    };
    const handleSelect = (item) => {
      const value = String(item[props.valueKey] || item.value);
      emit("update:modelValue", value);
      emit("select", item);
      emit("change", value);
      visible.value = false;
      highlightedIndex.value = -1;
      if (props.validateEvent) {
        triggerValidate("change");
      }
    };
    const handleKeydown = (event) => {
      if (autocompleteDisabled.value) return;
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          if (!visible.value) {
            if (props.triggerOnFocus || props.modelValue) {
              visible.value = true;
              fetchSuggestions(props.modelValue || "");
            }
          } else {
            highlightedIndex.value = (highlightedIndex.value + 1) % suggestions.value.length;
            scrollToHighlighted();
          }
          break;
        case "ArrowUp":
          event.preventDefault();
          if (visible.value) {
            highlightedIndex.value = (highlightedIndex.value - 1 + suggestions.value.length) % suggestions.value.length;
            scrollToHighlighted();
          }
          break;
        case "Enter":
          if (visible.value && highlightedIndex.value >= 0) {
            event.preventDefault();
            handleSelect(suggestions.value[highlightedIndex.value]);
          }
          break;
        case "Escape":
          if (visible.value) {
            event.preventDefault();
            visible.value = false;
          }
          break;
        case "Tab":
          visible.value = false;
          break;
      }
    };
    const scrollToHighlighted = () => {
      nextTick(() => {
        if (listRef.value && highlightedIndex.value >= 0) {
          const items = listRef.value.querySelectorAll(`.${ns.e("suggestion")}`);
          const item = items[highlightedIndex.value];
          if (item) {
            const list = listRef.value;
            const scrollTop = list.scrollTop;
            const offsetTop = item.offsetTop;
            const height = list.offsetHeight;
            const itemHeight = item.offsetHeight;
            if (offsetTop < scrollTop) {
              list.scrollTop = offsetTop;
            } else if (offsetTop + itemHeight > scrollTop + height) {
              list.scrollTop = offsetTop + itemHeight - height;
            }
          }
        }
      });
    };
    const focus = () => {
      var _a;
      (_a = inputRef.value) == null ? void 0 : _a.focus();
    };
    const blur = () => {
      var _a;
      (_a = inputRef.value) == null ? void 0 : _a.blur();
    };
    const close = () => {
      visible.value = false;
    };
    const highlight = (index) => {
      highlightedIndex.value = Math.max(0, Math.min(index, suggestions.value.length - 1));
    };
    __expose({
      focus,
      blur,
      close,
      highlight,
      inputRef: inputRef.value
    });
    const __returned__ = { props, emit, slots, ns, inputId, t, nextZIndex, themeStyle, form, formItem, triggerValidate, globalSize, autocompleteSize, autocompleteDisabled, inputRef, wrapperRef, dropdownRef, listRef, focused, hovering, visible, loading, suggestions, highlightedIndex, isClickingDropdown, dropdownZIndex, dropdownStyle, get debounceTimer() {
      return debounceTimer;
    }, set debounceTimer(v) {
      debounceTimer = v;
    }, showClear, hasPrefix, hasSuffix, hasPrepend, hasAppend, wrapperClasses, updateDropdownPosition, handleResize, handleScroll, handleOutsideClick, fetchSuggestions, debouncedFetch, handleInput, handleChange, handleFocus, handleBlur, handleMouseEnter, handleMouseLeave, handleClear, handleSelect, handleKeydown, scrollToHighlighted, focus, blur, close, highlight, computed, ref, watch, nextTick, useSlots, onMounted, onBeforeUnmount, get useNamespace() {
      return useNamespace;
    }, get useFormItem() {
      return useFormItem;
    }, get useId() {
      return useId;
    }, get useZIndex() {
      return useZIndex;
    }, get useLocale() {
      return useLocale;
    }, get useConfig() {
      return useConfig;
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
