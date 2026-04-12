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
import { createCommentVNode as _createCommentVNode, renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, normalizeClass as _normalizeClass, renderSlot as _renderSlot, toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, withModifiers as _withModifiers, withKeys as _withKeys, normalizeStyle as _normalizeStyle } from "vue";
const _hoisted_1 = ["tabindex", "aria-selected", "onClick", "onKeydown", "onMouseenter"];
const _hoisted_2 = ["onClick"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock(), _createElementBlock(
    "div",
    {
      class: _normalizeClass($setup.tabsClass),
      style: _normalizeStyle($setup.tabsStyle)
    },
    [
      _createCommentVNode(" \u6807\u7B7E\u680F "),
      _createElementVNode(
        "div",
        {
          ref: "navRef",
          class: _normalizeClass([$setup.ns.e("nav"), _ctx.navClass])
        },
        [
          _createElementVNode(
            "div",
            {
              class: _normalizeClass($setup.ns.e("nav-wrap"))
            },
            [
              _createElementVNode(
                "div",
                {
                  class: _normalizeClass($setup.ns.e("nav-list"))
                },
                [
                  (_openBlock(true), _createElementBlock(
                    _Fragment,
                    null,
                    _renderList($setup.panes, (pane) => {
                      return _openBlock(), _createElementBlock("div", {
                        key: pane.name,
                        class: _normalizeClass([$setup.ns.e("item"), $setup.ns.is("active", $setup.activeTab === pane.name), $setup.ns.is("disabled", pane.disabled), $setup.ns.is("closable", pane.closable !== false && $setup.isClosable)]),
                        role: "tab",
                        tabindex: pane.disabled ? -1 : 0,
                        "aria-selected": $setup.activeTab === pane.name,
                        onClick: ($event) => $setup.handleTabClick(pane, $event),
                        onKeydown: _withKeys(($event) => $setup.handleTabClick(pane, $event), ["enter"]),
                        onMouseenter: ($event) => $setup.handleTabHover(pane)
                      }, [
                        _createCommentVNode(" \u56FE\u6807 "),
                        pane.icon ? (_openBlock(), _createElementBlock(
                          "span",
                          {
                            key: 0,
                            class: _normalizeClass([$setup.ns.e("icon"), pane.icon])
                          },
                          null,
                          2
                          /* CLASS */
                        )) : _createCommentVNode("v-if", true),
                        _createCommentVNode(" \u6807\u7B7E\u63D2\u69FD "),
                        _renderSlot(_ctx.$slots, "label", { pane }, () => [
                          _createElementVNode(
                            "span",
                            {
                              class: _normalizeClass($setup.ns.e("label"))
                            },
                            _toDisplayString(pane.label),
                            3
                            /* TEXT, CLASS */
                          )
                        ]),
                        _createCommentVNode(" \u5173\u95ED\u6309\u94AE "),
                        pane.closable !== false && $setup.isClosable && !pane.disabled ? (_openBlock(), _createElementBlock("span", {
                          key: 1,
                          class: _normalizeClass($setup.ns.e("close")),
                          onClick: _withModifiers(($event) => $setup.handleTabRemove(pane, $event), ["stop"])
                        }, [..._cache[0] || (_cache[0] = [
                          _createElementVNode(
                            "svg",
                            {
                              viewBox: "0 0 1024 1024",
                              width: "14",
                              height: "14"
                            },
                            [
                              _createElementVNode("path", {
                                fill: "currentColor",
                                d: "M764.3 260.3a32 32 0 0 0-45.3 0L512 467.2 305 260.3a32 32 0 0 0-45.3 45.2L466.8 512 259.7 718.5a32 32 0 0 0 45.3 45.3L512 556.7l207 207a32 32 0 0 0 45.3-45.2L557.2 512l207-206.5a32 32 0 0 0 0-45.2z"
                              })
                            ],
                            -1
                            /* CACHED */
                          )
                        ])], 10, _hoisted_2)) : _createCommentVNode("v-if", true)
                      ], 42, _hoisted_1);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  )),
                  _createCommentVNode(" \u65B0\u589E\u6309\u94AE "),
                  $setup.isAddable ? (_openBlock(), _createElementBlock(
                    "div",
                    {
                      key: 0,
                      class: _normalizeClass($setup.ns.e("add")),
                      onClick: $setup.handleTabAdd
                    },
                    [
                      _renderSlot(_ctx.$slots, "add-icon", {}, () => [
                        _cache[1] || (_cache[1] = _createElementVNode(
                          "svg",
                          {
                            viewBox: "0 0 1024 1024",
                            width: "16",
                            height: "16"
                          },
                          [
                            _createElementVNode("path", {
                              fill: "currentColor",
                              d: "M544 480V256a32 32 0 0 0-64 0v224H256a32 32 0 0 0 0 64h224v224a32 32 0 0 0 64 0V544h224a32 32 0 0 0 0-64H544z"
                            })
                          ],
                          -1
                          /* CACHED */
                        ))
                      ])
                    ],
                    2
                    /* CLASS */
                  )) : _createCommentVNode("v-if", true)
                ],
                2
                /* CLASS */
              ),
              _createCommentVNode(" Line \u7C7B\u578B\u6307\u793A\u5668 "),
              _ctx.type === "line" ? (_openBlock(), _createElementBlock(
                "div",
                {
                  key: 0,
                  ref: "indicatorRef",
                  class: _normalizeClass($setup.ns.e("indicator"))
                },
                null,
                2
                /* CLASS */
              )) : _createCommentVNode("v-if", true)
            ],
            2
            /* CLASS */
          )
        ],
        2
        /* CLASS */
      ),
      _createCommentVNode(" \u5185\u5BB9\u533A "),
      _createElementVNode(
        "div",
        {
          class: _normalizeClass([$setup.ns.e("content"), _ctx.contentClass])
        },
        [
          _renderSlot(_ctx.$slots, "default")
        ],
        2
        /* CLASS */
      )
    ],
    6
    /* CLASS, STYLE */
  );
}
import { ref, computed, provide, watch, onMounted, nextTick } from "vue";
import { useNamespace } from "../../../hooks/use-namespace/index.js";
import { useComponentTheme } from "../../../theme/component-theme.js";
import { tabsProps, tabsEmits, TABS_INJECTION_KEY } from "./tabs-meta.js";
const __sfc__ = /* @__PURE__ */ Object.assign({
  name: "YhTabs"
}, {
  __name: "tabs",
  props: tabsProps,
  emits: tabsEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("tabs");
    const { themeStyle } = useComponentTheme(
      "tabs",
      computed(() => props.themeOverrides)
    );
    const panes = ref([]);
    const activeTab = ref(props.modelValue);
    const navRef = ref();
    const indicatorRef = ref();
    watch(
      () => props.modelValue,
      (val) => {
        activeTab.value = val;
      }
    );
    const registerPane = (pane) => {
      const index = panes.value.findIndex((p) => p.name === pane.name);
      if (index === -1) {
        panes.value.push(pane);
      } else {
        panes.value[index] = pane;
      }
    };
    const unregisterPane = (name) => {
      const index = panes.value.findIndex((p) => p.name === name);
      if (index > -1) {
        panes.value.splice(index, 1);
      }
    };
    const activateTab = async (name) => {
      if (name === activeTab.value) return;
      if (props.beforeLeave) {
        try {
          const result = await props.beforeLeave(name, activeTab.value);
          if (result === false) return;
        } catch (e) {
          return;
        }
      }
      activeTab.value = name;
      emit("update:modelValue", name);
      emit("tab-change", name);
      nextTick(updateIndicator);
    };
    let hoverTimer = null;
    const handleTabClick = (pane, ev) => {
      if (pane.disabled) return;
      emit("tab-click", pane, ev);
      if (props.trigger === "click") {
        activateTab(pane.name);
      }
    };
    const handleTabHover = (pane) => {
      if (pane.disabled || props.trigger !== "hover") return;
      if (hoverTimer) {
        clearTimeout(hoverTimer);
      }
      hoverTimer = setTimeout(() => {
        activateTab(pane.name);
      }, 100);
    };
    const handleTabRemove = (pane, ev) => {
      ev.stopPropagation();
      emit("tab-remove", pane.name);
    };
    const handleTabAdd = () => {
      emit("tab-add");
    };
    const updateIndicator = () => {
      if (!navRef.value || !indicatorRef.value || props.type !== "line") return;
      const activeEl = navRef.value.querySelector(
        `.${ns.e("item")}.${ns.is("active", true)}`
      );
      if (!activeEl) return;
      const isVertical = props.tabPosition === "left" || props.tabPosition === "right";
      indicatorRef.value.style.width = "";
      indicatorRef.value.style.height = "";
      indicatorRef.value.style.transform = "";
      const computedStyle = getComputedStyle(navRef.value.closest(`.${ns.b()}`));
      const defaultIndicatorWidth = computedStyle.getPropertyValue("--yh-tabs-indicator-width").trim() || "40px";
      const defaultIndicatorHeight = computedStyle.getPropertyValue("--yh-tabs-indicator-height").trim() || "20px";
      const navRect = navRef.value.getBoundingClientRect();
      const activeRect = activeEl.getBoundingClientRect();
      if (isVertical) {
        const indicatorHeight = props.indicatorHeight || defaultIndicatorHeight;
        const indicatorWidth = props.indicatorWidth || "2px";
        indicatorRef.value.style.width = indicatorWidth;
        indicatorRef.value.style.height = indicatorHeight === "auto" ? `${activeRect.height}px` : indicatorHeight;
        indicatorRef.value.offsetHeight;
        const indicatorActualHeight = indicatorRef.value.offsetHeight;
        const relativeTop = activeRect.top - navRect.top;
        const offset = indicatorHeight === "auto" ? relativeTop : relativeTop + (activeRect.height - indicatorActualHeight) / 2;
        indicatorRef.value.style.transform = `translateY(${offset}px)`;
      } else {
        const indicatorWidth = props.indicatorWidth || defaultIndicatorWidth;
        const indicatorHeight = props.indicatorHeight || "2px";
        indicatorRef.value.style.height = indicatorHeight;
        indicatorRef.value.style.width = indicatorWidth === "auto" ? `${activeRect.width}px` : indicatorWidth;
        indicatorRef.value.offsetWidth;
        const indicatorActualWidth = indicatorRef.value.offsetWidth;
        const relativeLeft = activeRect.left - navRect.left;
        const offset = indicatorWidth === "auto" ? relativeLeft : relativeLeft + (activeRect.width - indicatorActualWidth) / 2;
        indicatorRef.value.style.transform = `translateX(${offset}px)`;
      }
    };
    onMounted(() => {
      if (!activeTab.value && panes.value.length > 0) {
        const firstEnabled = panes.value.find((p) => !p.disabled);
        if (firstEnabled) {
          activeTab.value = firstEnabled.name;
          emit("update:modelValue", firstEnabled.name);
        }
      }
      nextTick(updateIndicator);
    });
    watch(panes, () => nextTick(updateIndicator), { deep: true });
    watch(
      () => props.tabPosition,
      () => {
        nextTick(() => {
          requestAnimationFrame(() => {
            updateIndicator();
          });
        });
      }
    );
    watch(
      () => [props.indicatorWidth, props.indicatorHeight],
      () => nextTick(updateIndicator)
    );
    provide(TABS_INJECTION_KEY, {
      activeTab,
      registerPane,
      unregisterPane,
      activateTab
    });
    const isClosable = computed(() => props.closable || props.editable);
    const isAddable = computed(() => props.addable || props.editable);
    const tabsClass = computed(() => [
      ns.b(),
      ns.m(props.type),
      ns.m(`${props.tabPosition}`),
      ns.is("stretch", props.stretch)
    ]);
    const tabsStyle = computed(() => {
      const style = __spreadValues({}, themeStyle.value);
      if (props.activeColor) {
        style["--yh-tabs-active-color"] = props.activeColor;
      }
      if (props.inactiveColor) {
        style["--yh-tabs-text-color"] = props.inactiveColor;
      }
      return style;
    });
    __expose({
      /** 触发添加标签页事件 */
      addTab: handleTabAdd,
      /** 激活指定标签 */
      setActiveTab: activateTab,
      /** 当前激活的标签名 */
      activeTab
    });
    const __returned__ = { props, emit, ns, themeStyle, panes, activeTab, navRef, indicatorRef, registerPane, unregisterPane, activateTab, get hoverTimer() {
      return hoverTimer;
    }, set hoverTimer(v) {
      hoverTimer = v;
    }, handleTabClick, handleTabHover, handleTabRemove, handleTabAdd, updateIndicator, isClosable, isAddable, tabsClass, tabsStyle, ref, computed, provide, watch, onMounted, nextTick, get useNamespace() {
      return useNamespace;
    }, get useComponentTheme() {
      return useComponentTheme;
    }, get tabsProps() {
      return tabsProps;
    }, get tabsEmits() {
      return tabsEmits;
    }, get TABS_INJECTION_KEY() {
      return TABS_INJECTION_KEY;
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
