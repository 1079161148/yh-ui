import { createCommentVNode as _createCommentVNode, renderSlot as _renderSlot, toDisplayString as _toDisplayString, normalizeClass as _normalizeClass, openBlock as _openBlock, createElementBlock as _createElementBlock, resolveDynamicComponent as _resolveDynamicComponent, createBlock as _createBlock, renderList as _renderList, Fragment as _Fragment, createElementVNode as _createElementVNode, withModifiers as _withModifiers, createTextVNode as _createTextVNode, Transition as _Transition, withCtx as _withCtx, createVNode as _createVNode, normalizeStyle as _normalizeStyle } from "vue";
const _hoisted_1 = ["draggable", "onDragstart", "onDragover", "onDrop"];
const _hoisted_2 = ["onClick"];
const _hoisted_3 = ["value", "placeholder", "disabled", "readonly"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock(), _createElementBlock(
    "div",
    {
      ref: "wrapperRef",
      class: _normalizeClass($setup.inputTagClasses),
      style: _normalizeStyle($setup.themeStyle),
      onClick: $setup.handleWrapperClick,
      onMouseenter: $setup.handleMouseenter,
      onMouseleave: $setup.handleMouseleave
    },
    [
      _createCommentVNode(" \u524D\u7F00 "),
      $setup.hasPrefix ? (_openBlock(), _createElementBlock(
        "span",
        {
          key: 0,
          class: _normalizeClass($setup.ns.e("prefix"))
        },
        [
          _renderSlot(_ctx.$slots, "prefix", {}, () => [
            $props.prefix ? (_openBlock(), _createElementBlock(
              "span",
              {
                key: 0,
                class: _normalizeClass($setup.ns.e("prefix-text"))
              },
              _toDisplayString($props.prefix),
              3
              /* TEXT, CLASS */
            )) : _createCommentVNode("v-if", true),
            $props.prefixIcon && typeof $props.prefixIcon !== "string" ? (_openBlock(), _createBlock(_resolveDynamicComponent($props.prefixIcon), { key: 1 })) : _createCommentVNode("v-if", true)
          ])
        ],
        2
        /* CLASS */
      )) : _createCommentVNode("v-if", true),
      _createCommentVNode(" \u6807\u7B7E\u533A\u57DF "),
      _createElementVNode(
        "div",
        {
          class: _normalizeClass($setup.ns.e("wrapper"))
        },
        [
          _createCommentVNode(" \u5DF2\u6709\u6807\u7B7E "),
          (_openBlock(true), _createElementBlock(
            _Fragment,
            null,
            _renderList($setup.displayTags, (tag, index) => {
              return _renderSlot(_ctx.$slots, "tag", {
                key: index,
                tag,
                index,
                close: () => $setup.removeTag(index)
              }, () => [
                _createElementVNode("span", {
                  class: _normalizeClass($setup.getTagClasses(index)),
                  draggable: $props.draggable && !$props.disabled && !$props.readonly,
                  onDragstart: ($event) => $setup.handleDragStart($event, index),
                  onDragover: ($event) => $setup.handleDragOver($event, index),
                  onDragleave: $setup.handleDragLeave,
                  onDrop: ($event) => $setup.handleDrop($event, index),
                  onDragend: $setup.handleDragEnd
                }, [
                  _createElementVNode(
                    "span",
                    {
                      class: _normalizeClass($setup.ns.e("tag-content"))
                    },
                    _toDisplayString(tag),
                    3
                    /* TEXT, CLASS */
                  ),
                  $props.closable && !$props.disabled && !$props.readonly ? (_openBlock(), _createElementBlock("span", {
                    key: 0,
                    class: _normalizeClass($setup.ns.e("tag-close")),
                    onClick: _withModifiers(($event) => $setup.removeTag(index), ["stop"])
                  }, [..._cache[0] || (_cache[0] = [
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
                          d: "M576 512l277.333333 277.333333-64 64-277.333333-277.333333L234.666667 853.333333 170.666667 789.333333l277.333333-277.333333L170.666667 234.666667 234.666667 170.666667l277.333333 277.333333L789.333333 170.666667 853.333333 234.666667 576 512z"
                        })
                      ],
                      -1
                      /* CACHED */
                    )
                  ])], 10, _hoisted_2)) : _createCommentVNode("v-if", true)
                ], 42, _hoisted_1)
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          )),
          _createCommentVNode(" \u6298\u53E0\u6807\u7B7E "),
          $props.collapseTags && $setup.collapsedCount > 0 ? (_openBlock(), _createElementBlock(
            "span",
            {
              key: 0,
              class: _normalizeClass([$setup.ns.e("collapsed"), `is-${$props.type}`, `is-${$props.tagEffect}`]),
              onMouseenter: $setup.handleCollapseMouseenter,
              onMouseleave: $setup.handleCollapseMouseleave
            },
            [
              _renderSlot(_ctx.$slots, "collapseTag", {
                count: $setup.collapsedCount,
                tags: $setup.collapsedTags
              }, () => [
                _createTextVNode(
                  " + " + _toDisplayString($setup.collapsedCount),
                  1
                  /* TEXT */
                )
              ]),
              _createCommentVNode(" Tooltip "),
              _createVNode(_Transition, { name: "yh-fade" }, {
                default: _withCtx(() => [
                  $setup.showTooltip && $props.collapseTagsTooltip ? (_openBlock(), _createElementBlock(
                    "div",
                    {
                      key: 0,
                      class: _normalizeClass($setup.ns.e("tooltip"))
                    },
                    [
                      (_openBlock(true), _createElementBlock(
                        _Fragment,
                        null,
                        _renderList($setup.collapsedTags, (tag, index) => {
                          return _openBlock(), _createElementBlock(
                            "span",
                            {
                              key: index,
                              class: _normalizeClass([$setup.ns.e("tooltip-tag"), `is-${$props.type}`, `is-${$props.tagEffect}`])
                            },
                            _toDisplayString(tag),
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
                  )) : _createCommentVNode("v-if", true)
                ]),
                _: 1
                /* STABLE */
              })
            ],
            34
            /* CLASS, NEED_HYDRATION */
          )) : _createCommentVNode("v-if", true),
          _createCommentVNode(" \u8F93\u5165\u6846 "),
          _createElementVNode("input", {
            ref: "inputRef",
            type: "text",
            class: _normalizeClass($setup.ns.e("inner")),
            value: $setup.inputValue,
            placeholder: $setup.tags.length === 0 ? $props.placeholder || $setup.t("inputtag.placeholder") : "",
            disabled: $props.disabled,
            readonly: $props.readonly || $setup.isMaxReached,
            onInput: $setup.handleInput,
            onKeydown: $setup.handleKeydown,
            onFocus: $setup.handleFocus,
            onBlur: $setup.handleBlur
          }, null, 42, _hoisted_3)
        ],
        2
        /* CLASS */
      ),
      _createCommentVNode(" \u540E\u7F00/\u6E05\u7A7A\u6309\u94AE "),
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
              class: _normalizeClass($setup.ns.e("clear")),
              onClick: _withModifiers($setup.clearTags, ["stop"])
            },
            [
              _renderSlot(_ctx.$slots, "clearIcon", {}, () => [
                _cache[1] || (_cache[1] = _createElementVNode(
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
                      d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 832a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm-160-448l128 128-128 128 45.248 45.248L525.248 621.248l128 128L698.496 704l-128-128 128-128L653.248 402.752 525.248 530.752l-128-128z"
                    })
                  ],
                  -1
                  /* CACHED */
                ))
              ])
            ],
            2
            /* CLASS */
          )) : _createCommentVNode("v-if", true),
          _renderSlot(_ctx.$slots, "suffix", {}, () => [
            $props.suffix ? (_openBlock(), _createElementBlock(
              "span",
              {
                key: 0,
                class: _normalizeClass($setup.ns.e("suffix-text"))
              },
              _toDisplayString($props.suffix),
              3
              /* TEXT, CLASS */
            )) : _createCommentVNode("v-if", true),
            $props.suffixIcon && typeof $props.suffixIcon !== "string" ? (_openBlock(), _createBlock(_resolveDynamicComponent($props.suffixIcon), { key: 1 })) : _createCommentVNode("v-if", true)
          ])
        ],
        2
        /* CLASS */
      )) : _createCommentVNode("v-if", true)
    ],
    38
    /* CLASS, STYLE, NEED_HYDRATION */
  );
}
import { computed, ref, useSlots } from "vue";
import { useFormItem, useLocale } from "../../../hooks/index.js";
import { useNamespace } from "../../../hooks/use-namespace/index.js";
import { useComponentTheme } from "../../../theme/component-theme.js";
import { useConfig } from "../../../hooks/use-config/index.js";
const __sfc__ = /* @__PURE__ */ Object.assign({
  name: "YhInputTag"
}, {
  __name: "input-tag",
  props: {
    modelValue: { type: Array, required: false, default: () => [] },
    type: { type: null, required: false, default: "info" },
    size: { type: null, required: false, default: "default" },
    disabled: { type: Boolean, required: false, default: false },
    readonly: { type: Boolean, required: false, default: false },
    max: { type: Number, required: false },
    separator: { type: [String, Array], required: false, default: () => [",", "Enter"] },
    placeholder: { type: String, required: false, default: "" },
    clearable: { type: Boolean, required: false, default: false },
    addOnBlur: { type: Boolean, required: false, default: true },
    prefix: { type: String, required: false },
    suffix: { type: String, required: false },
    prefixIcon: { type: null, required: false },
    suffixIcon: { type: null, required: false },
    closable: { type: Boolean, required: false, default: true },
    validateTag: { type: Function, required: false },
    trim: { type: Boolean, required: false, default: true },
    allowDuplicate: { type: Boolean, required: false, default: false },
    collapseTags: { type: Boolean, required: false, default: false },
    collapseTagsTooltip: { type: Boolean, required: false, default: false },
    maxCollapseTags: { type: Number, required: false, default: 1 },
    draggable: { type: Boolean, required: false, default: false },
    tagEffect: { type: String, required: false, default: "light" },
    validateEvent: { type: Boolean, required: false, default: true },
    themeOverrides: { type: null, required: false }
  },
  emits: ["update:modelValue", "change", "input", "add", "remove", "focus", "blur", "clear", "drag-end"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const slots = useSlots();
    const ns = useNamespace("input-tag");
    const { t } = useLocale();
    const { themeStyle } = useComponentTheme(
      "input-tag",
      computed(() => props.themeOverrides)
    );
    const { globalSize } = useConfig();
    const inputRef = ref();
    const wrapperRef = ref();
    const { validate: triggerValidate } = useFormItem();
    const inputValue = ref("");
    const focused = ref(false);
    const hovering = ref(false);
    const showTooltip = ref(false);
    const dragIndex = ref(null);
    const dragOverIndex = ref(null);
    const tags = computed(() => props.modelValue || []);
    const displayTags = computed(() => {
      if (!props.collapseTags) {
        return tags.value;
      }
      return tags.value.slice(0, props.maxCollapseTags);
    });
    const collapsedTags = computed(() => {
      if (!props.collapseTags) {
        return [];
      }
      return tags.value.slice(props.maxCollapseTags);
    });
    const collapsedCount = computed(() => collapsedTags.value.length);
    const isMaxReached = computed(() => {
      return props.max !== void 0 && tags.value.length >= props.max;
    });
    const showClear = computed(() => {
      return props.clearable && !props.disabled && !props.readonly && tags.value.length > 0 && (focused.value || hovering.value);
    });
    const hasPrefix = computed(() => {
      return !!props.prefix || !!props.prefixIcon || !!slots.prefix;
    });
    const hasSuffix = computed(() => {
      return !!props.suffix || !!props.suffixIcon || !!slots.suffix || showClear.value;
    });
    const separators = computed(() => {
      if (Array.isArray(props.separator)) {
        return props.separator;
      }
      return [props.separator];
    });
    const inputTagClasses = computed(() => [
      ns.b(),
      ns.m(props.size || globalSize.value || "default"),
      ns.is("disabled", props.disabled),
      ns.is("focused", focused.value),
      ns.is("has-prefix", hasPrefix.value),
      ns.is("has-suffix", hasSuffix.value)
    ]);
    const getTagClasses = (index) => [
      ns.e("tag"),
      `is-${props.type}`,
      `is-${props.tagEffect}`,
      {
        "is-dragging": dragIndex.value === index,
        "is-drag-over": dragOverIndex.value === index
      }
    ];
    const addTag = (value) => {
      let tagValue = value;
      if (props.trim) {
        tagValue = tagValue.trim();
      }
      if (!tagValue) {
        return false;
      }
      if (isMaxReached.value) {
        return false;
      }
      if (!props.allowDuplicate && tags.value.includes(tagValue)) {
        return false;
      }
      if (props.validateTag && !props.validateTag(tagValue)) {
        return false;
      }
      const newTags = [...tags.value, tagValue];
      emit("update:modelValue", newTags);
      emit("change", newTags);
      emit("add", tagValue);
      if (props.validateEvent) {
        triggerValidate("change");
      }
      return true;
    };
    const removeTag = (index) => {
      if (props.disabled || props.readonly) {
        return;
      }
      const removedTag = tags.value[index];
      const newTags = tags.value.filter((_, i) => i !== index);
      emit("update:modelValue", newTags);
      emit("change", newTags);
      emit("remove", removedTag, index);
      if (props.validateEvent) {
        triggerValidate("change");
      }
    };
    const clearTags = () => {
      if (props.disabled || props.readonly) {
        return;
      }
      emit("update:modelValue", []);
      emit("change", []);
      emit("clear");
      inputValue.value = "";
    };
    const handleInput = (event) => {
      const target = event.target;
      inputValue.value = target.value;
      emit("input", target.value);
    };
    const handleKeydown = (event) => {
      if (props.disabled || props.readonly) {
        return;
      }
      const value = inputValue.value;
      if (separators.value.includes(event.key)) {
        event.preventDefault();
        if (addTag(value)) {
          inputValue.value = "";
        }
        return;
      }
      if (event.key === "Backspace" && !value && tags.value.length > 0) {
        removeTag(tags.value.length - 1);
      }
    };
    const handleFocus = (event) => {
      focused.value = true;
      emit("focus", event);
    };
    const handleBlur = (event) => {
      focused.value = false;
      if (props.addOnBlur && inputValue.value) {
        if (addTag(inputValue.value)) {
          inputValue.value = "";
        }
      }
      emit("blur", event);
      if (props.validateEvent) {
        triggerValidate("blur");
      }
    };
    const handleWrapperClick = () => {
      var _a;
      if (!props.disabled && !props.readonly) {
        (_a = inputRef.value) == null ? void 0 : _a.focus();
      }
    };
    const handleMouseenter = () => {
      hovering.value = true;
    };
    const handleMouseleave = () => {
      hovering.value = false;
    };
    const handleCollapseMouseenter = () => {
      if (props.collapseTagsTooltip && collapsedCount.value > 0) {
        showTooltip.value = true;
      }
    };
    const handleCollapseMouseleave = () => {
      showTooltip.value = false;
    };
    const handleDragStart = (event, index) => {
      if (!props.draggable || props.disabled || props.readonly) {
        event.preventDefault();
        return;
      }
      dragIndex.value = index;
      if (event.dataTransfer) {
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", String(index));
      }
    };
    const handleDragOver = (event, index) => {
      if (!props.draggable) return;
      event.preventDefault();
      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = "move";
      }
      dragOverIndex.value = index;
    };
    const handleDragLeave = () => {
      dragOverIndex.value = null;
    };
    const handleDrop = (event, targetIndex) => {
      if (!props.draggable) return;
      event.preventDefault();
      const sourceIndex = dragIndex.value;
      if (sourceIndex === null || sourceIndex === targetIndex) {
        dragIndex.value = null;
        dragOverIndex.value = null;
        return;
      }
      const newTags = [...tags.value];
      const [removed] = newTags.splice(sourceIndex, 1);
      newTags.splice(targetIndex, 0, removed);
      emit("update:modelValue", newTags);
      emit("change", newTags);
      emit("drag-end", newTags);
      dragIndex.value = null;
      dragOverIndex.value = null;
    };
    const handleDragEnd = () => {
      dragIndex.value = null;
      dragOverIndex.value = null;
    };
    const focus = () => {
      var _a;
      (_a = inputRef.value) == null ? void 0 : _a.focus();
    };
    const blur = () => {
      var _a;
      (_a = inputRef.value) == null ? void 0 : _a.blur();
    };
    const clear = () => {
      clearTags();
    };
    __expose({
      focus,
      blur,
      clear
    });
    const __returned__ = { props, emit, slots, ns, t, themeStyle, globalSize, inputRef, wrapperRef, triggerValidate, inputValue, focused, hovering, showTooltip, dragIndex, dragOverIndex, tags, displayTags, collapsedTags, collapsedCount, isMaxReached, showClear, hasPrefix, hasSuffix, separators, inputTagClasses, getTagClasses, addTag, removeTag, clearTags, handleInput, handleKeydown, handleFocus, handleBlur, handleWrapperClick, handleMouseenter, handleMouseleave, handleCollapseMouseenter, handleCollapseMouseleave, handleDragStart, handleDragOver, handleDragLeave, handleDrop, handleDragEnd, focus, blur, clear, computed, ref, useSlots, get useNamespace() {
      return useNamespace;
    }, get useFormItem() {
      return useFormItem;
    }, get useLocale() {
      return useLocale;
    }, get useComponentTheme() {
      return useComponentTheme;
    }, get useConfig() {
      return useConfig;
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
