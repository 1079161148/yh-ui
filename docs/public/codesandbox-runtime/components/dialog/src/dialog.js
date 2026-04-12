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
import { createCommentVNode as _createCommentVNode, renderSlot as _renderSlot, normalizeClass as _normalizeClass, openBlock as _openBlock, createBlock as _createBlock, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, Fragment as _Fragment, createElementBlock as _createElementBlock, resolveDynamicComponent as _resolveDynamicComponent, normalizeStyle as _normalizeStyle, createElementVNode as _createElementVNode, createVNode as _createVNode, withCtx as _withCtx, vShow as _vShow, withModifiers as _withModifiers, withDirectives as _withDirectives, Transition as _Transition, Teleport as _Teleport } from "vue";
const _hoisted_1 = ["aria-labelledby"];
const _hoisted_2 = ["id"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock(), _createBlock(_Teleport, { to: _ctx.teleportTo }, [
    _createVNode(_Transition, {
      name: $setup.ns.b("fade"),
      onAfterLeave: $setup.afterLeave
    }, {
      default: _withCtx(() => [
        $setup.rendered ? _withDirectives((_openBlock(), _createElementBlock(
          "div",
          {
            key: 0,
            class: _normalizeClass($setup.ns.e("wrapper")),
            style: _normalizeStyle({
              zIndex: _ctx.zIndex
            }),
            onMousedown: $setup.handleWrapperMouseDown,
            onClick: _withModifiers($setup.handleWrapperClick, ["self"])
          },
          [
            _createElementVNode("div", {
              ref: "dialogRef",
              role: "dialog",
              "aria-modal": true,
              "aria-labelledby": $setup.dialogId,
              class: _normalizeClass($setup.dialogClasses),
              style: _normalizeStyle($setup.style),
              tabindex: "-1"
            }, [
              _createCommentVNode(" \u5934\u90E8 "),
              _createElementVNode(
                "div",
                {
                  ref: "headerRef",
                  class: _normalizeClass($setup.headerClasses),
                  style: _normalizeStyle($setup.headerStyle),
                  onMousedown: $setup.handleMouseDown
                },
                [
                  _renderSlot(_ctx.$slots, "header", {}, () => [
                    _createElementVNode("div", {
                      id: $setup.dialogId,
                      class: _normalizeClass([$setup.ns.e("title"), _ctx.titleClass]),
                      style: _normalizeStyle(_ctx.titleStyle)
                    }, [
                      _ctx.showIcon && $setup.typeIcon ? (_openBlock(), _createBlock($setup["YhIcon"], {
                        key: 0,
                        name: $setup.typeIcon,
                        class: _normalizeClass([$setup.ns.e("type-icon"), $setup.ns.em("type-icon", _ctx.type)])
                      }, null, 8, ["name", "class"])) : _createCommentVNode("v-if", true),
                      typeof _ctx.title === "string" ? (_openBlock(), _createElementBlock(
                        _Fragment,
                        { key: 1 },
                        [
                          _createTextVNode(
                            _toDisplayString(_ctx.title),
                            1
                            /* TEXT */
                          )
                        ],
                        64
                        /* STABLE_FRAGMENT */
                      )) : _ctx.title ? (_openBlock(), _createBlock(_resolveDynamicComponent(_ctx.title), { key: 2 })) : _createCommentVNode("v-if", true)
                    ], 14, _hoisted_2)
                  ]),
                  _ctx.showClose ? (_openBlock(), _createElementBlock(
                    "button",
                    {
                      key: 0,
                      class: _normalizeClass($setup.ns.e("headerbtn")),
                      type: "button",
                      onClick: $setup.handleClose
                    },
                    [
                      _createVNode($setup["YhIcon"], { name: _ctx.closeIcon }, null, 8, ["name"])
                    ],
                    2
                    /* CLASS */
                  )) : _createCommentVNode("v-if", true)
                ],
                38
                /* CLASS, STYLE, NEED_HYDRATION */
              ),
              _createCommentVNode(" \u4E3B\u4F53 "),
              _createElementVNode(
                "div",
                {
                  class: _normalizeClass([$setup.ns.e("body"), _ctx.contentClass]),
                  style: _normalizeStyle([_ctx.contentStyle, $setup.contentBodyStyle])
                },
                [
                  _ctx.loading ? (_openBlock(), _createElementBlock(
                    "div",
                    {
                      key: 0,
                      class: _normalizeClass($setup.ns.e("loading"))
                    },
                    [
                      _createVNode($setup["YhSpin"], {
                        show: true,
                        size: "small"
                      })
                    ],
                    2
                    /* CLASS */
                  )) : _createCommentVNode("v-if", true),
                  !_ctx.destroyOnClose || !$setup.closed ? _renderSlot(_ctx.$slots, "default", { key: 1 }, () => [
                    _ctx.content ? (_openBlock(), _createElementBlock(
                      _Fragment,
                      { key: 0 },
                      [
                        typeof _ctx.content === "string" ? (_openBlock(), _createElementBlock(
                          _Fragment,
                          { key: 0 },
                          [
                            _createTextVNode(
                              _toDisplayString(_ctx.content),
                              1
                              /* TEXT */
                            )
                          ],
                          64
                          /* STABLE_FRAGMENT */
                        )) : (_openBlock(), _createBlock(_resolveDynamicComponent(_ctx.content), { key: 1 }))
                      ],
                      64
                      /* STABLE_FRAGMENT */
                    )) : _createCommentVNode("v-if", true)
                  ]) : _createCommentVNode("v-if", true)
                ],
                6
                /* CLASS, STYLE */
              ),
              _createCommentVNode(" \u5E95\u90E8 "),
              _ctx.$slots.footer || _ctx.action || _ctx.showFooter ? (_openBlock(), _createElementBlock(
                "div",
                {
                  key: 0,
                  class: _normalizeClass([$setup.footerClasses, _ctx.actionClass]),
                  style: _normalizeStyle([_ctx.actionStyle, $setup.footerStyle])
                },
                [
                  _renderSlot(_ctx.$slots, "footer", {}, () => [
                    _ctx.action ? (_openBlock(), _createBlock(_resolveDynamicComponent(_ctx.action), { key: 0 })) : _ctx.showFooter ? (_openBlock(), _createElementBlock(
                      _Fragment,
                      { key: 1 },
                      [
                        _createVNode($setup["YhButton"], { onClick: $setup.handleCancel }, {
                          default: _withCtx(() => [
                            _createTextVNode(
                              _toDisplayString(_ctx.cancelText || $setup.t("dialog.cancel")),
                              1
                              /* TEXT */
                            )
                          ]),
                          _: 1
                          /* STABLE */
                        }),
                        _createVNode($setup["YhButton"], {
                          type: "primary",
                          onClick: $setup.handleConfirm
                        }, {
                          default: _withCtx(() => [
                            _createTextVNode(
                              _toDisplayString(_ctx.confirmText || $setup.t("dialog.confirm")),
                              1
                              /* TEXT */
                            )
                          ]),
                          _: 1
                          /* STABLE */
                        })
                      ],
                      64
                      /* STABLE_FRAGMENT */
                    )) : _createCommentVNode("v-if", true)
                  ])
                ],
                6
                /* CLASS, STYLE */
              )) : _createCommentVNode("v-if", true)
            ], 14, _hoisted_1)
          ],
          38
          /* CLASS, STYLE, NEED_HYDRATION */
        )), [
          [_vShow, _ctx.modelValue]
        ]) : _createCommentVNode("v-if", true)
      ]),
      _: 3
      /* FORWARDED */
    }, 8, ["name"])
  ], 8, ["to"]);
}
import { ref, watch, computed, nextTick } from "vue";
import { useEventListener, useId, useScrollLock, useLocale } from "../../../hooks/index.js";
import { useNamespace } from "../../../hooks/use-namespace/index.js";
import { useComponentTheme } from "../../../theme/component-theme.js";
import { YhIcon } from "../../icon/index.js";
import { YhSpin } from "../../spin/index.js";
import { YhButton } from "../../button/index.js";
import { dialogProps, dialogEmits } from "./dialog-meta.js";
const __sfc__ = /* @__PURE__ */ Object.assign({
  name: "YhDialog",
  inheritAttrs: false
}, {
  __name: "dialog",
  props: dialogProps,
  emits: dialogEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    let lastClickPos = null;
    if (typeof window !== "undefined") {
      document.addEventListener(
        "click",
        (e) => {
          lastClickPos = { x: e.clientX, y: e.clientY };
        },
        true
      );
    }
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("dialog");
    const { t } = useLocale();
    const dialogId = useId();
    const { themeStyle: themeVars } = useComponentTheme(
      "dialog",
      computed(() => props.themeOverrides)
    );
    const visible = ref(false);
    const closed = ref(true);
    const dialogRef = ref(null);
    const headerRef = ref(null);
    const rendered = ref(false);
    useScrollLock(computed(() => props.modelValue && props.lockScroll));
    const offset = ref({ x: 0, y: 0 });
    const isDragging = ref(false);
    const handleMouseDown = (e) => {
      if (!props.draggable || props.fullscreen) return;
      if (e.button !== 0) return;
      if (headerRef.value && !headerRef.value.contains(e.target)) return;
      isDragging.value = true;
      emit("dragStart", e);
      const { clientX: startX, clientY: startY } = e;
      const { x: initialX, y: initialY } = offset.value;
      const onMouseMove = (moveEvent) => {
        if (!isDragging.value || !dialogRef.value) return;
        let nextX = initialX + (moveEvent.clientX - startX);
        let nextY = initialY + (moveEvent.clientY - startY);
        if (!props.overflow) {
          const rect = dialogRef.value.getBoundingClientRect();
          const { clientWidth, clientHeight } = document.documentElement;
          const minX = -rect.left + offset.value.x;
          const maxX = clientWidth - rect.right + offset.value.x;
          const minY = -rect.top + offset.value.y;
          const maxY = clientHeight - rect.bottom + offset.value.y;
          nextX = Math.min(Math.max(nextX, minX), maxX);
          nextY = Math.min(Math.max(nextY, minY), maxY);
        }
        offset.value = {
          x: nextX,
          y: nextY
        };
        emit("dragMove", moveEvent);
      };
      const onMouseUp = (upEvent) => {
        isDragging.value = false;
        emit("dragEnd", upEvent);
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    };
    let prevFocusedElement = null;
    const trapFocus = (e) => {
      if (e.key !== "Tab" || !dialogRef.value) return;
      const focusableEls = dialogRef.value.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstFocusableEl = focusableEls[0];
      const lastFocusableEl = focusableEls[focusableEls.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === firstFocusableEl) {
          lastFocusableEl.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusableEl) {
          firstFocusableEl.focus();
          e.preventDefault();
        }
      }
    };
    const style = computed(() => {
      const styles = {
        zIndex: props.zIndex
      };
      if (!props.fullscreen) {
        styles.width = typeof props.width === "number" ? `${props.width}px` : props.width;
        if (!props.alignCenter) {
          styles.marginTop = props.top;
        }
        if (props.transformOrigin === "mouse" && lastClickPos && dialogRef.value) {
          const rect = dialogRef.value.getBoundingClientRect();
          const originX = lastClickPos.x - rect.left;
          const originY = lastClickPos.y - rect.top;
          styles.transformOrigin = `${originX}px ${originY}px`;
        } else if (props.transformOrigin === "center") {
          styles.transformOrigin = "center";
        }
        if (offset.value.x !== 0 || offset.value.y !== 0) {
          styles.transform = `translate(${offset.value.x}px, ${offset.value.y}px)`;
        }
      }
      return __spreadValues(__spreadValues(__spreadValues({}, themeVars.value), styles), typeof props.style === "string" ? parseStyle(props.style) : props.style);
    });
    const parseStyle = (str) => {
      const obj = {};
      str.split(";").forEach((item) => {
        if (!item) return;
        const [key, val] = item.split(":");
        obj[key.trim()] = val.trim();
      });
      return obj;
    };
    const typeIconMap = {
      success: "success",
      warning: "warning",
      error: "error",
      info: "info"
    };
    const typeIcon = computed(() => typeIconMap[props.type] || "");
    const dialogClasses = computed(() => [
      ns.b(),
      props.customClass,
      {
        [ns.m(props.type)]: props.type && props.type !== "default",
        [ns.m("fullscreen")]: props.fullscreen,
        [ns.m("align-center")]: props.alignCenter,
        [ns.m("center")]: props.center,
        [ns.m("glass")]: props.glass,
        [ns.is("draggable")]: props.draggable
      }
    ]);
    const headerClasses = computed(() => [
      ns.e("header"),
      {
        [ns.em("header", "center")]: props.headerAlignCenter || props.center
      }
    ]);
    const headerStyle = computed(() => {
      const align = props.center || props.headerAlignCenter ? "center" : props.headerAlign;
      if (align === "center") return { justifyContent: "center" };
      if (align === "right") return { justifyContent: "flex-end", paddingRight: "72px" };
      return { justifyContent: "flex-start" };
    });
    const contentBodyStyle = computed(() => {
      const styles = {};
      const align = props.center ? "center" : props.contentAlign;
      if (align === "center") styles.textAlign = "center";
      else if (align === "right") styles.textAlign = "right";
      else styles.textAlign = "left";
      return styles;
    });
    const footerClasses = computed(() => [
      ns.e("footer"),
      {
        [ns.em("footer", "center")]: props.footerAlignCenter || props.center
      }
    ]);
    const footerStyle = computed(() => {
      const styles = {};
      const align = props.center || props.footerAlignCenter ? "center" : props.footerAlign;
      if (props.swapFooterButtons) {
        styles.flexDirection = "row-reverse";
        if (align === "right") styles.justifyContent = "flex-start";
        else if (align === "left") styles.justifyContent = "flex-end";
        else styles.justifyContent = "center";
      } else {
        if (align === "right") styles.justifyContent = "flex-end";
        else if (align === "left") styles.justifyContent = "flex-start";
        else styles.justifyContent = "center";
      }
      return styles;
    });
    const doClose = () => {
      emit("update:modelValue", false);
    };
    const handleClose = () => {
      emit("close");
      if (props.beforeClose) {
        props.beforeClose(doClose);
      } else {
        doClose();
      }
    };
    const handleCancel = () => {
      emit("cancel");
      handleClose();
    };
    const handleConfirm = () => {
      emit("confirm");
      handleClose();
    };
    let mouseDownTargetAtWrapper = false;
    const handleWrapperMouseDown = (e) => {
      mouseDownTargetAtWrapper = e.target === e.currentTarget;
    };
    const handleWrapperClick = (e) => {
      if (props.closeOnClickModal && mouseDownTargetAtWrapper && e.target === e.currentTarget) {
        handleClose();
      }
    };
    watch(
      () => props.modelValue,
      async (val) => {
        var _a;
        if (val) {
          rendered.value = true;
          closed.value = false;
          visible.value = true;
          emit("open");
          offset.value = { x: 0, y: 0 };
          if (typeof window === "undefined") return;
          prevFocusedElement = document.activeElement;
          await nextTick();
          if (props.autoFocus && dialogRef.value) {
            const focusableEls = dialogRef.value.querySelectorAll(
              'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            if (focusableEls.length > 0) {
              ;
              focusableEls[0].focus();
            } else {
              dialogRef.value.focus();
            }
          } else {
            (_a = dialogRef.value) == null ? void 0 : _a.focus();
          }
          emit("opened");
        } else {
          visible.value = false;
          if (typeof window !== "undefined" && prevFocusedElement) {
            prevFocusedElement.focus();
          }
        }
      },
      { immediate: true }
    );
    const afterLeave = () => {
      closed.value = true;
      emit("closed");
    };
    useEventListener(
      () => window,
      "keydown",
      (e) => {
        const ke = e;
        if (!props.modelValue) return;
        if (props.closeOnPressEscape && ke.key === "Escape") {
          handleClose();
        }
        trapFocus(ke);
      }
    );
    __expose({
      visible,
      dialogRef,
      handleClose,
      handleCancel,
      handleConfirm
    });
    const __returned__ = { get lastClickPos() {
      return lastClickPos;
    }, set lastClickPos(v) {
      lastClickPos = v;
    }, props, emit, ns, t, dialogId, themeVars, visible, closed, dialogRef, headerRef, rendered, offset, isDragging, handleMouseDown, get prevFocusedElement() {
      return prevFocusedElement;
    }, set prevFocusedElement(v) {
      prevFocusedElement = v;
    }, trapFocus, style, parseStyle, typeIconMap, typeIcon, dialogClasses, headerClasses, headerStyle, contentBodyStyle, footerClasses, footerStyle, doClose, handleClose, handleCancel, handleConfirm, get mouseDownTargetAtWrapper() {
      return mouseDownTargetAtWrapper;
    }, set mouseDownTargetAtWrapper(v) {
      mouseDownTargetAtWrapper = v;
    }, handleWrapperMouseDown, handleWrapperClick, afterLeave, ref, watch, computed, nextTick, get useNamespace() {
      return useNamespace;
    }, get useEventListener() {
      return useEventListener;
    }, get useId() {
      return useId;
    }, get useScrollLock() {
      return useScrollLock;
    }, get useLocale() {
      return useLocale;
    }, get useComponentTheme() {
      return useComponentTheme;
    }, get YhIcon() {
      return YhIcon;
    }, get YhSpin() {
      return YhSpin;
    }, get YhButton() {
      return YhButton;
    }, get dialogProps() {
      return dialogProps;
    }, get dialogEmits() {
      return dialogEmits;
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
