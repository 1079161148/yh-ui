import { renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, toDisplayString as _toDisplayString, normalizeClass as _normalizeClass, resolveComponent as _resolveComponent, createBlock as _createBlock, withCtx as _withCtx, createVNode as _createVNode, renderSlot as _renderSlot, createElementVNode as _createElementVNode, withKeys as _withKeys, createTextVNode as _createTextVNode, normalizeStyle as _normalizeStyle } from "vue";
const _hoisted_1 = ["disabled"];
const _hoisted_2 = { key: 0 };
const _hoisted_3 = {
  key: 1,
  viewBox: "0 0 1024 1024",
  width: "1em",
  height: "1em"
};
const _hoisted_4 = ["onClick"];
const _hoisted_5 = ["disabled"];
const _hoisted_6 = { key: 0 };
const _hoisted_7 = {
  key: 1,
  viewBox: "0 0 1024 1024",
  width: "1em",
  height: "1em"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_yh_option = _resolveComponent("yh-option");
  const _component_yh_select = _resolveComponent("yh-select");
  const _component_yh_input = _resolveComponent("yh-input");
  return !_ctx.hideOnSinglePage || $setup.pageCount > 1 ? (_openBlock(), _createElementBlock(
    "nav",
    {
      key: 0,
      class: _normalizeClass($setup.paginationClasses),
      style: _normalizeStyle($setup.themeStyle)
    },
    [
      (_openBlock(true), _createElementBlock(
        _Fragment,
        null,
        _renderList($setup.layoutComponents, (item) => {
          return _openBlock(), _createElementBlock(
            _Fragment,
            { key: item },
            [
              _createCommentVNode(" Total "),
              item === "total" ? (_openBlock(), _createElementBlock(
                "span",
                {
                  key: 0,
                  class: _normalizeClass($setup.ns.e("total"))
                },
                _toDisplayString($setup.t("pagination.total", { total: _ctx.total })),
                3
                /* TEXT, CLASS */
              )) : _createCommentVNode("v-if", true),
              _createCommentVNode(" Sizes "),
              item === "sizes" ? (_openBlock(), _createElementBlock(
                "div",
                {
                  key: 1,
                  class: _normalizeClass($setup.ns.e("sizes"))
                },
                [
                  _createVNode(_component_yh_select, {
                    "model-value": _ctx.pageSize,
                    disabled: _ctx.disabled,
                    size: _ctx.small ? "small" : "default",
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = (val) => $setup.handleSizeChange(Number(val)))
                  }, {
                    default: _withCtx(() => [
                      (_openBlock(true), _createElementBlock(
                        _Fragment,
                        null,
                        _renderList(_ctx.pageSizes, (size) => {
                          return _openBlock(), _createBlock(_component_yh_option, {
                            key: size,
                            label: `${size}${$setup.t("pagination.pageSize")}`,
                            value: size
                          }, null, 8, ["label", "value"]);
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["model-value", "disabled", "size"])
                ],
                2
                /* CLASS */
              )) : _createCommentVNode("v-if", true),
              _createCommentVNode(" Prev "),
              item === "prev" ? (_openBlock(), _createElementBlock("button", {
                key: 2,
                class: _normalizeClass($setup.ns.e("prev")),
                disabled: _ctx.disabled || $setup.internalCurrentPage <= 1,
                onClick: $setup.handlePrev
              }, [
                _renderSlot(_ctx.$slots, "prev-icon", {}, () => [
                  _ctx.prevText ? (_openBlock(), _createElementBlock(
                    "span",
                    _hoisted_2,
                    _toDisplayString(_ctx.prevText),
                    1
                    /* TEXT */
                  )) : (_openBlock(), _createElementBlock("svg", _hoisted_3, [..._cache[6] || (_cache[6] = [
                    _createElementVNode(
                      "path",
                      {
                        fill: "currentColor",
                        d: "M609.4 824.6L296.8 512l312.6-312.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L228.9 489.4c-12.5 12.5-12.5 32.8 0 45.3l335.2 335.2c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3z"
                      },
                      null,
                      -1
                      /* CACHED */
                    )
                  ])]))
                ])
              ], 10, _hoisted_1)) : _createCommentVNode("v-if", true),
              _createCommentVNode(" Pager "),
              item === "pager" ? (_openBlock(), _createElementBlock(
                "ul",
                {
                  key: 3,
                  class: _normalizeClass($setup.ns.e("pager"))
                },
                [
                  _createElementVNode(
                    "li",
                    {
                      class: _normalizeClass([$setup.ns.e("item"), $setup.ns.is("active", $setup.internalCurrentPage === 1)]),
                      onClick: _cache[1] || (_cache[1] = ($event) => $setup.handleCurrentChange(1))
                    },
                    " 1 ",
                    2
                    /* CLASS */
                  ),
                  $setup.pagers.showPrevMore ? (_openBlock(), _createElementBlock(
                    "li",
                    {
                      key: 0,
                      class: _normalizeClass([$setup.ns.e("item"), $setup.ns.e("more")]),
                      onClick: _cache[2] || (_cache[2] = ($event) => $setup.handleCurrentChange(Math.max(1, $setup.internalCurrentPage - 5)))
                    },
                    [
                      _createElementVNode(
                        "span",
                        {
                          class: _normalizeClass($setup.ns.e("more-icon"))
                        },
                        "...",
                        2
                        /* CLASS */
                      )
                    ],
                    2
                    /* CLASS */
                  )) : _createCommentVNode("v-if", true),
                  (_openBlock(true), _createElementBlock(
                    _Fragment,
                    null,
                    _renderList($setup.pagers.array, (page) => {
                      return _openBlock(), _createElementBlock("li", {
                        key: page,
                        class: _normalizeClass([$setup.ns.e("item"), $setup.ns.is("active", $setup.internalCurrentPage === page)]),
                        onClick: ($event) => $setup.handleCurrentChange(page)
                      }, _toDisplayString(page), 11, _hoisted_4);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  )),
                  $setup.pagers.showNextMore ? (_openBlock(), _createElementBlock(
                    "li",
                    {
                      key: 1,
                      class: _normalizeClass([$setup.ns.e("item"), $setup.ns.e("more")]),
                      onClick: _cache[3] || (_cache[3] = ($event) => $setup.handleCurrentChange(Math.min($setup.pageCount, $setup.internalCurrentPage + 5)))
                    },
                    [
                      _createElementVNode(
                        "span",
                        {
                          class: _normalizeClass($setup.ns.e("more-icon"))
                        },
                        "...",
                        2
                        /* CLASS */
                      )
                    ],
                    2
                    /* CLASS */
                  )) : _createCommentVNode("v-if", true),
                  $setup.pageCount > 1 ? (_openBlock(), _createElementBlock(
                    "li",
                    {
                      key: 2,
                      class: _normalizeClass([$setup.ns.e("item"), $setup.ns.is("active", $setup.internalCurrentPage === $setup.pageCount)]),
                      onClick: _cache[4] || (_cache[4] = ($event) => $setup.handleCurrentChange($setup.pageCount))
                    },
                    _toDisplayString($setup.pageCount),
                    3
                    /* TEXT, CLASS */
                  )) : _createCommentVNode("v-if", true)
                ],
                2
                /* CLASS */
              )) : _createCommentVNode("v-if", true),
              _createCommentVNode(" Next "),
              item === "next" ? (_openBlock(), _createElementBlock("button", {
                key: 4,
                class: _normalizeClass($setup.ns.e("next")),
                disabled: _ctx.disabled || $setup.internalCurrentPage >= $setup.pageCount,
                onClick: $setup.handleNext
              }, [
                _renderSlot(_ctx.$slots, "next-icon", {}, () => [
                  _ctx.nextText ? (_openBlock(), _createElementBlock(
                    "span",
                    _hoisted_6,
                    _toDisplayString(_ctx.nextText),
                    1
                    /* TEXT */
                  )) : (_openBlock(), _createElementBlock("svg", _hoisted_7, [..._cache[7] || (_cache[7] = [
                    _createElementVNode(
                      "path",
                      {
                        fill: "currentColor",
                        d: "M341.3 824.6l312.6-312.6L341.3 199.4c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L721.8 489.4c12.5 12.5 12.5 32.8 0 45.3L386.6 869.9c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3z"
                      },
                      null,
                      -1
                      /* CACHED */
                    )
                  ])]))
                ])
              ], 10, _hoisted_5)) : _createCommentVNode("v-if", true),
              _createCommentVNode(" Jumper "),
              item === "jumper" ? (_openBlock(), _createElementBlock(
                "div",
                {
                  key: 5,
                  class: _normalizeClass($setup.ns.e("jumper"))
                },
                [
                  _createTextVNode(
                    _toDisplayString($setup.t("pagination.goto")) + " ",
                    1
                    /* TEXT */
                  ),
                  _createVNode(_component_yh_input, {
                    modelValue: $setup.jumpValue,
                    "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $setup.jumpValue = $event),
                    size: _ctx.small ? "small" : "default",
                    disabled: _ctx.disabled,
                    onBlur: $setup.handleJump,
                    onKeyup: _withKeys($setup.handleJump, ["enter"])
                  }, null, 8, ["modelValue", "size", "disabled"]),
                  _createTextVNode(
                    " " + _toDisplayString($setup.t("pagination.page")),
                    1
                    /* TEXT */
                  )
                ],
                2
                /* CLASS */
              )) : _createCommentVNode("v-if", true),
              _createCommentVNode(" Slot "),
              item === "slot" ? _renderSlot(_ctx.$slots, "default", { key: 6 }) : _createCommentVNode("v-if", true)
            ],
            64
            /* STABLE_FRAGMENT */
          );
        }),
        128
        /* KEYED_FRAGMENT */
      ))
    ],
    6
    /* CLASS, STYLE */
  )) : _createCommentVNode("v-if", true);
}
import { computed, ref, watch } from "vue";
import { useLocale } from "../../../hooks/index.js";
import { useNamespace } from "../../../hooks/use-namespace/index.js";
import { useComponentTheme } from "../../../theme/component-theme.js";
import { paginationProps } from "./pagination-meta.js";
const __sfc__ = /* @__PURE__ */ Object.assign({
  name: "YhPagination"
}, {
  __name: "pagination",
  props: paginationProps,
  emits: ["update:currentPage", "update:pageSize", "current-change", "size-change", "prev-click", "next-click"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("pagination");
    const { t } = useLocale();
    const { themeStyle } = useComponentTheme("pagination", computed(() => props.themeOverrides));
    const pageCount = computed(() => {
      if (props.total > 0) {
        return Math.max(1, Math.ceil(props.total / props.pageSize));
      }
      return 1;
    });
    const internalCurrentPage = ref(props.currentPage);
    watch(() => props.currentPage, (val) => {
      internalCurrentPage.value = val;
    });
    const pagers = computed(() => {
      const count = props.pagerCount;
      const currentPage = internalCurrentPage.value;
      const totalPages = pageCount.value;
      const showPrevMore = totalPages > count && currentPage > count - (count - 1) / 2;
      const showNextMore = totalPages > count && currentPage < totalPages - (count - 1) / 2;
      const array = [];
      if (showPrevMore && !showNextMore) {
        const startPage = totalPages - (count - 2);
        for (let i = startPage; i < totalPages; i++) {
          array.push(i);
        }
      } else if (!showPrevMore && showNextMore) {
        for (let i = 2; i < count; i++) {
          array.push(i);
        }
      } else if (showPrevMore && showNextMore) {
        const offset = Math.floor(count / 2) - 1;
        for (let i = currentPage - offset; i <= currentPage + offset; i++) {
          array.push(i);
        }
      } else {
        for (let i = 2; i < totalPages; i++) {
          array.push(i);
        }
      }
      return {
        showPrevMore,
        showNextMore,
        array
      };
    });
    const handleCurrentChange = (val) => {
      if (props.disabled || val < 1 || val > pageCount.value || val === internalCurrentPage.value) return;
      internalCurrentPage.value = val;
      emit("update:currentPage", val);
      emit("current-change", val);
    };
    const handlePrev = () => {
      if (internalCurrentPage.value <= 1) return;
      const val = internalCurrentPage.value - 1;
      handleCurrentChange(val);
      emit("prev-click", val);
    };
    const handleNext = () => {
      if (internalCurrentPage.value >= pageCount.value) return;
      const val = internalCurrentPage.value + 1;
      handleCurrentChange(val);
      emit("next-click", val);
    };
    const handleSizeChange = (val) => {
      emit("update:pageSize", val);
      emit("size-change", val);
    };
    const jumpValue = ref(internalCurrentPage.value);
    watch(internalCurrentPage, (val) => {
      jumpValue.value = val;
    });
    const handleJump = () => {
      let val = Number(jumpValue.value);
      if (isNaN(val)) val = internalCurrentPage.value;
      val = Math.max(1, Math.min(pageCount.value, Math.floor(val)));
      handleCurrentChange(val);
      jumpValue.value = val;
    };
    const paginationClasses = computed(() => [
      ns.b(),
      ns.is("background", props.background),
      ns.is("small", props.small),
      ns.is("circle", props.circle),
      ns.is("disabled", props.disabled)
    ]);
    const layoutComponents = computed(() => {
      return props.layout.split(",").map((item) => item.trim());
    });
    __expose({
      currentPage: internalCurrentPage.value,
      pageSize: props.pageSize,
      pageCount: pageCount.value
    });
    const __returned__ = { props, emit, ns, t, themeStyle, pageCount, internalCurrentPage, pagers, handleCurrentChange, handlePrev, handleNext, handleSizeChange, jumpValue, handleJump, paginationClasses, layoutComponents, computed, ref, watch, get useNamespace() {
      return useNamespace;
    }, get useLocale() {
      return useLocale;
    }, get useComponentTheme() {
      return useComponentTheme;
    }, get paginationProps() {
      return paginationProps;
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
