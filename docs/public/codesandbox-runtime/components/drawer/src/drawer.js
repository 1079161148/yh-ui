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
import { createCommentVNode as _createCommentVNode, normalizeClass as _normalizeClass, openBlock as _openBlock, createElementBlock as _createElementBlock, renderSlot as _renderSlot, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, Fragment as _Fragment, resolveDynamicComponent as _resolveDynamicComponent, createBlock as _createBlock, createElementVNode as _createElementVNode, createVNode as _createVNode, normalizeStyle as _normalizeStyle, vShow as _vShow, withModifiers as _withModifiers, withDirectives as _withDirectives, Transition as _Transition, withCtx as _withCtx, Teleport as _Teleport } from "vue";
const _hoisted_1 = ["aria-label"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock(), _createBlock(_Teleport, {
    to: _ctx.teleportTo,
    disabled: !_ctx.teleportTo || _ctx.inner
  }, [
    _createVNode(_Transition, {
      name: "yh-drawer-fade",
      onAfterLeave: $setup.onAfterLeave
    }, {
      default: _withCtx(() => [
        $setup.rendered ? _withDirectives((_openBlock(), _createElementBlock(
          "div",
          {
            key: 0,
            class: _normalizeClass([$setup.ns.e("wrapper"), _ctx.modalClass, {
              [$setup.ns.is("active")]: _ctx.modelValue
            }, {
              [$setup.ns.is("with-modal")]: _ctx.modal
            }, {
              [$setup.ns.is("inner")]: _ctx.inner
            }]),
            style: _normalizeStyle({
              zIndex: $setup.drawerZIndex - 1
            }),
            onClick: _cache[2] || (_cache[2] = _withModifiers(($event) => $setup.handleClose(true), ["self"]))
          },
          [
            _withDirectives(_createElementVNode(
              "div",
              {
                ref: "drawerRef",
                class: _normalizeClass([$setup.ns.b(), $setup.ns.m(_ctx.placement), {
                  [$setup.ns.is("open")]: _ctx.modelValue
                }, {
                  [$setup.ns.m("glass")]: _ctx.glass
                }, {
                  [$setup.ns.is("round")]: _ctx.round
                }, {
                  [$setup.ns.is("inner")]: _ctx.inner
                }, _ctx.customClass]),
                style: _normalizeStyle([$setup.drawerStyles, {
                  zIndex: $setup.drawerZIndex
                }]),
                role: "dialog",
                "aria-modal": "true",
                "aria-labelledby": $setup.titleId,
                "aria-describedby": $setup.bodyId,
                onMousedown: _cache[1] || (_cache[1] = _withModifiers(() => {
                }, ["stop"]))
              },
              [
                _createCommentVNode(" Resizable Handle "),
                _ctx.resizable ? (_openBlock(), _createElementBlock(
                  "div",
                  {
                    key: 0,
                    class: _normalizeClass([$setup.ns.e("handle"), $setup.ns.em("handle", _ctx.placement)]),
                    onMousedown: $setup.handleResizeStart
                  },
                  null,
                  34
                  /* CLASS, NEED_HYDRATION */
                )) : _createCommentVNode("v-if", true),
                _ctx.showHeader ? (_openBlock(), _createElementBlock(
                  "div",
                  {
                    key: 1,
                    class: _normalizeClass($setup.ns.e("header")),
                    style: _normalizeStyle(_ctx.titleStyle)
                  },
                  [
                    _renderSlot(_ctx.$slots, "header", {}, () => [
                      _createElementVNode(
                        "span",
                        {
                          id: $setup.titleId,
                          class: _normalizeClass($setup.ns.e("title"))
                        },
                        [
                          typeof _ctx.title === "string" ? (_openBlock(), _createElementBlock(
                            _Fragment,
                            { key: 0 },
                            [
                              _createTextVNode(
                                _toDisplayString(_ctx.title),
                                1
                                /* TEXT */
                              )
                            ],
                            64
                            /* STABLE_FRAGMENT */
                          )) : _ctx.title ? (_openBlock(), _createBlock(_resolveDynamicComponent(_ctx.title), { key: 1 })) : _renderSlot(_ctx.$slots, "title", { key: 2 })
                        ],
                        2
                        /* CLASS */
                      )
                    ]),
                    _ctx.showClose ? (_openBlock(), _createElementBlock("button", {
                      key: 0,
                      type: "button",
                      class: _normalizeClass($setup.ns.e("close")),
                      "aria-label": $setup.t("dialog.close"),
                      onClick: _cache[0] || (_cache[0] = ($event) => $setup.handleClose())
                    }, [
                      _renderSlot(_ctx.$slots, "close-icon", {}, () => [
                        _createVNode($setup["YhIcon"], { name: _ctx.closeIcon }, null, 8, ["name"])
                      ])
                    ], 10, _hoisted_1)) : _createCommentVNode("v-if", true)
                  ],
                  6
                  /* CLASS, STYLE */
                )) : _createCommentVNode("v-if", true),
                _createElementVNode(
                  "div",
                  {
                    id: $setup.bodyId,
                    class: _normalizeClass($setup.ns.e("body")),
                    style: _normalizeStyle(_ctx.contentStyle)
                  },
                  [
                    _renderSlot(_ctx.$slots, "default")
                  ],
                  6
                  /* CLASS, STYLE */
                ),
                _ctx.showFooter ? (_openBlock(), _createElementBlock(
                  "div",
                  {
                    key: 2,
                    class: _normalizeClass($setup.ns.e("footer")),
                    style: _normalizeStyle(_ctx.footerStyle)
                  },
                  [
                    _renderSlot(_ctx.$slots, "footer")
                  ],
                  6
                  /* CLASS, STYLE */
                )) : _createCommentVNode("v-if", true)
              ],
              38
              /* CLASS, STYLE, NEED_HYDRATION */
            ), [
              [_vShow, _ctx.modelValue]
            ])
          ],
          6
          /* CLASS, STYLE */
        )), [
          [_vShow, _ctx.modelValue]
        ]) : _createCommentVNode("v-if", true)
      ]),
      _: 3
      /* FORWARDED */
    })
  ], 8, ["to", "disabled"]);
}
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from "vue";
import { drawerProps, drawerEmits } from "./drawer-meta.js";
import { YhIcon } from "../../icon/index.js";
import { useZIndex, useScrollLock, useLocale } from "../../../hooks/index.js";
import { useNamespace } from "../../../hooks/use-namespace/index.js";
import { useComponentTheme } from "../../../theme/component-theme.js";
const __sfc__ = /* @__PURE__ */ Object.assign({
  name: "YhDrawer"
}, {
  __name: "drawer",
  props: drawerProps,
  emits: drawerEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("drawer");
    const { t } = useLocale();
    const { nextZIndex } = useZIndex();
    const { themeStyle } = useComponentTheme(
      "drawer",
      computed(() => props.themeOverrides)
    );
    const drawerRef = ref(null);
    const rendered = ref(false);
    const drawerZIndex = ref(props.zIndex || nextZIndex());
    const currentSize = ref(props.size);
    const titleId = `yh-drawer-title-${Math.random().toString(36).slice(2, 9)}`;
    const bodyId = `yh-drawer-body-${Math.random().toString(36).slice(2, 9)}`;
    const isHorizontal = computed(() => ["left", "right"].includes(props.placement));
    const drawerStyles = computed(() => {
      const baseStyle = typeof props.drawerStyle === "object" ? props.drawerStyle : {};
      const styles = __spreadValues(__spreadValues({}, themeStyle.value), baseStyle);
      const sizeValue = typeof currentSize.value === "number" ? `${currentSize.value}px` : currentSize.value;
      if (isHorizontal.value) {
        styles.width = sizeValue;
      } else {
        styles.height = sizeValue;
      }
      return styles;
    });
    useScrollLock(computed(() => props.modelValue && props.lockScroll));
    watch(
      () => props.modelValue,
      (val) => {
        if (val) {
          rendered.value = true;
          drawerZIndex.value = props.zIndex || nextZIndex();
          emit("open");
          nextTick(() => {
            emit("opened");
          });
        } else {
          emit("close");
        }
      },
      { immediate: true }
    );
    const handleClose = (isClickModal = false) => {
      if (isClickModal && !props.closeOnClickModal) return;
      const done = () => {
        emit("update:modelValue", false);
      };
      if (props.beforeClose) {
        props.beforeClose(done);
      } else {
        done();
      }
    };
    const onAfterLeave = () => {
      emit("closed");
      if (props.destroyOnClose) {
        rendered.value = false;
      }
    };
    let startPos = 0;
    let startSize = 0;
    const handleResizeStart = (e) => {
      var _a;
      startPos = isHorizontal.value ? e.clientX : e.clientY;
      const rect = (_a = drawerRef.value) == null ? void 0 : _a.getBoundingClientRect();
      if (!rect) return;
      startSize = isHorizontal.value ? rect.width : rect.height;
      window.addEventListener("mousemove", handleResizeMove);
      window.addEventListener("mouseup", handleResizeEnd);
      document.body.style.cursor = isHorizontal.value ? "col-resize" : "row-resize";
      document.body.style.userSelect = "none";
    };
    const handleResizeMove = (e) => {
      const currentPos = isHorizontal.value ? e.clientX : e.clientY;
      let diff = currentPos - startPos;
      if (props.placement === "right" || props.placement === "bottom") {
        diff = -diff;
      }
      let newSize = startSize + diff;
      newSize = Math.max(props.minSize, Math.min(newSize, props.maxSize));
      currentSize.value = newSize;
      emit("resize", newSize);
    };
    const handleResizeEnd = () => {
      window.removeEventListener("mousemove", handleResizeMove);
      window.removeEventListener("mouseup", handleResizeEnd);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
    const handleKeyDown = (e) => {
      if (props.modelValue && props.closeOnPressEscape && e.key === "Escape") {
        handleClose();
      }
    };
    onMounted(() => {
      window.addEventListener("keydown", handleKeyDown);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("keydown", handleKeyDown);
    });
    __expose({
      drawerRef,
      handleClose
    });
    const __returned__ = { props, emit, ns, t, nextZIndex, themeStyle, drawerRef, rendered, drawerZIndex, currentSize, titleId, bodyId, isHorizontal, drawerStyles, handleClose, onAfterLeave, get startPos() {
      return startPos;
    }, set startPos(v) {
      startPos = v;
    }, get startSize() {
      return startSize;
    }, set startSize(v) {
      startSize = v;
    }, handleResizeStart, handleResizeMove, handleResizeEnd, handleKeyDown, ref, computed, watch, onMounted, onBeforeUnmount, nextTick, get drawerProps() {
      return drawerProps;
    }, get drawerEmits() {
      return drawerEmits;
    }, get YhIcon() {
      return YhIcon;
    }, get useNamespace() {
      return useNamespace;
    }, get useZIndex() {
      return useZIndex;
    }, get useScrollLock() {
      return useScrollLock;
    }, get useLocale() {
      return useLocale;
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
