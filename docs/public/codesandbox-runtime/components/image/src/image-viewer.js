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
import { normalizeClass as _normalizeClass, createElementVNode as _createElementVNode, createCommentVNode as _createCommentVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, Fragment as _Fragment, normalizeStyle as _normalizeStyle, Teleport as _Teleport, createBlock as _createBlock } from "vue";
const _hoisted_1 = ["title", "aria-label"];
const _hoisted_2 = ["title", "aria-label"];
const _hoisted_3 = ["title", "aria-label"];
const _hoisted_4 = ["title", "aria-label"];
const _hoisted_5 = ["title", "aria-label"];
const _hoisted_6 = ["title", "aria-label"];
const _hoisted_7 = ["title", "aria-label"];
const _hoisted_8 = ["title", "aria-label"];
const _hoisted_9 = ["src"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock(), _createBlock(_Teleport, {
    to: "body",
    disabled: !_ctx.teleported
  }, [
    _ctx.viewerMode !== "viewerjs" ? (_openBlock(), _createElementBlock(
      "div",
      {
        key: 0,
        class: _normalizeClass($setup.ns.b()),
        style: _normalizeStyle({
          zIndex: _ctx.zIndex
        })
      },
      [
        _createElementVNode(
          "div",
          {
            class: _normalizeClass($setup.ns.e("mask")),
            onClick: _cache[0] || (_cache[0] = ($event) => _ctx.hideOnClickModal && $setup.handleClose())
          },
          null,
          2
          /* CLASS */
        ),
        _createCommentVNode(" Close "),
        _createElementVNode("span", {
          class: _normalizeClass([$setup.ns.e("btn"), $setup.ns.e("close")]),
          title: $setup.t("imageviewer.close"),
          "aria-label": $setup.t("imageviewer.close"),
          onClick: $setup.handleClose
        }, [..._cache[1] || (_cache[1] = [
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
                d: "M512 456.2L794.8 173.4l55.8 55.8L567.8 512l282.8 282.8-55.8 55.8L512 567.8 229.2 850.6l-55.8-55.8L456.2 512 173.4 229.2l55.8-55.8L512 456.2z"
              })
            ],
            -1
            /* CACHED */
          )
        ])], 10, _hoisted_1),
        _createCommentVNode(" Arrows "),
        _ctx.urlList.length > 1 ? (_openBlock(), _createElementBlock(
          _Fragment,
          { key: 0 },
          [
            _createElementVNode("span", {
              class: _normalizeClass([$setup.ns.e("btn"), $setup.ns.e("prev")]),
              title: $setup.t("imageviewer.prev"),
              "aria-label": $setup.t("imageviewer.prev"),
              onClick: $setup.handlePrev
            }, [..._cache[2] || (_cache[2] = [
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
                    d: "M609.4 824.6L296.8 512l312.6-312.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L228.9 489.4c-12.5 12.5-12.5 32.8 0 45.3l335.2 335.2c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3z"
                  })
                ],
                -1
                /* CACHED */
              )
            ])], 10, _hoisted_2),
            _createElementVNode("span", {
              class: _normalizeClass([$setup.ns.e("btn"), $setup.ns.e("next")]),
              title: $setup.t("imageviewer.next"),
              "aria-label": $setup.t("imageviewer.next"),
              onClick: $setup.handleNext
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
                    d: "M414.6 824.6l312.6-312.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L346.7 802.1c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L727.2 512 414.6 199.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l335.2 335.2c12.5 12.5 12.5 32.8 0 45.3L369.3 915.1c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"
                  })
                ],
                -1
                /* CACHED */
              )
            ])], 10, _hoisted_3)
          ],
          64
          /* STABLE_FRAGMENT */
        )) : _createCommentVNode("v-if", true),
        _createCommentVNode(" Actions "),
        _ctx.showProgress ? (_openBlock(), _createElementBlock(
          "div",
          {
            key: 1,
            class: _normalizeClass($setup.ns.e("actions"))
          },
          [
            _createElementVNode(
              "div",
              {
                class: _normalizeClass($setup.ns.e("actions-inner"))
              },
              [
                _createElementVNode("i", {
                  class: _normalizeClass($setup.ns.e("zoom-out")),
                  title: $setup.t("imageviewer.zoomOut"),
                  "aria-label": $setup.t("imageviewer.zoomOut"),
                  onClick: $setup.handleZoomOut
                }, [..._cache[4] || (_cache[4] = [
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
                        d: "M192 480h640v64H192z"
                      })
                    ],
                    -1
                    /* CACHED */
                  )
                ])], 10, _hoisted_4),
                _createElementVNode("i", {
                  class: _normalizeClass($setup.ns.e("zoom-in")),
                  title: $setup.t("imageviewer.zoomIn"),
                  "aria-label": $setup.t("imageviewer.zoomIn"),
                  onClick: $setup.handleZoomIn
                }, [..._cache[5] || (_cache[5] = [
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
                        d: "M480 480V224h64v256h256v64H544v256h-64V544H224v-64h256z"
                      })
                    ],
                    -1
                    /* CACHED */
                  )
                ])], 10, _hoisted_5),
                _createElementVNode("i", {
                  class: _normalizeClass($setup.ns.e("reset")),
                  title: $setup.t("imageviewer.reset"),
                  "aria-label": $setup.t("imageviewer.reset"),
                  onClick: $setup.reset
                }, [..._cache[6] || (_cache[6] = [
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
                        d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 64a384 384 0 1 0 0 768 384 384 0 0 0 0-768zm0 128a256 256 0 1 1 0 512 256 256 0 0 1 0-512z"
                      })
                    ],
                    -1
                    /* CACHED */
                  )
                ])], 10, _hoisted_6),
                _createElementVNode("i", {
                  class: _normalizeClass($setup.ns.e("rotate-left")),
                  title: $setup.t("imageviewer.rotateLeft"),
                  "aria-label": $setup.t("imageviewer.rotateLeft"),
                  onClick: $setup.handleRotateLeft
                }, [..._cache[7] || (_cache[7] = [
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
                        d: "M512 128c-212.1 0-384 171.9-384 384s171.9 384 384 384 384-171.9 384-384h-64c0 176.7-143.3 320-320 320s-320-143.3-320-320 143.3-320 320-320v64l192-128-192-128v64z"
                      })
                    ],
                    -1
                    /* CACHED */
                  )
                ])], 10, _hoisted_7),
                _createElementVNode("i", {
                  class: _normalizeClass($setup.ns.e("rotate-right")),
                  title: $setup.t("imageviewer.rotateRight"),
                  "aria-label": $setup.t("imageviewer.rotateRight"),
                  onClick: $setup.handleRotateRight
                }, [..._cache[8] || (_cache[8] = [
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
                        d: "M512 128V64L320 192l192 128v-64c176.7 0 320 143.3 320 320s-143.3 320-320 320-320-143.3-320-320h-64c0 212.1 171.9 384 384 384s384-171.9 384-384-171.9-384-384-384z"
                      })
                    ],
                    -1
                    /* CACHED */
                  )
                ])], 10, _hoisted_8)
              ],
              2
              /* CLASS */
            )
          ],
          2
          /* CLASS */
        )) : _createCommentVNode("v-if", true),
        _createCommentVNode(" Canvas "),
        _createElementVNode(
          "div",
          {
            class: _normalizeClass($setup.ns.e("canvas"))
          },
          [
            _createElementVNode("img", {
              src: _ctx.urlList[$setup.index],
              class: _normalizeClass($setup.ns.e("img")),
              style: _normalizeStyle({
                transform: $setup.transform
              })
            }, null, 14, _hoisted_9)
          ],
          2
          /* CLASS */
        )
      ],
      6
      /* CLASS, STYLE */
    )) : _createCommentVNode("v-if", true)
  ], 8, ["disabled"]);
}
import { computed, ref, onMounted, onUnmounted, watch } from "vue";
import { useLocale } from "../../../hooks/index.js";
import { useNamespace } from "../../../hooks/use-namespace/index.js";
import { imageViewerProps, imageViewerEmits } from "./image-viewer-meta.js";
import Viewer from "../../viewerjs.js";
import "viewerjs/dist/viewer.css";
const __sfc__ = /* @__PURE__ */ Object.assign({
  name: "YhImageViewer"
}, {
  __name: "image-viewer",
  props: imageViewerProps,
  emits: imageViewerEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("viewer");
    const { t } = useLocale();
    const index = ref(props.initialIndex);
    const scale = ref(1);
    const rotate = ref(0);
    let viewer = null;
    let viewerList = null;
    const transform = computed(() => {
      return `scale(${scale.value}) rotate(${rotate.value}deg)`;
    });
    const handleClose = () => {
      emit("close");
    };
    const initViewerJS = () => {
      const list = document.createElement("div");
      list.style.display = "none";
      props.urlList.forEach((src) => {
        const img = document.createElement("img");
        img.src = src;
        list.appendChild(img);
      });
      document.body.appendChild(list);
      viewerList = list;
      const nextViewer = new Viewer(list, __spreadProps(__spreadValues({}, props.viewerOptions), {
        initialViewIndex: props.initialIndex,
        hidden: () => {
          if (viewerList) {
            document.body.removeChild(viewerList);
            viewerList = null;
          }
          viewer == null ? void 0 : viewer.destroy();
          viewer = null;
          emit("close");
        }
      }));
      viewer = nextViewer;
      nextViewer.show();
    };
    const handlePrev = () => {
      const len = props.urlList.length;
      if (len <= 1) return;
      if (index.value > 0) {
        index.value--;
      } else if (props.infinite) {
        index.value = len - 1;
      }
    };
    const handleNext = () => {
      const len = props.urlList.length;
      if (len <= 1) return;
      if (index.value < len - 1) {
        index.value++;
      } else if (props.infinite) {
        index.value = 0;
      }
    };
    const handleZoomIn = () => {
      scale.value *= props.zoomRate;
    };
    const handleZoomOut = () => {
      scale.value /= props.zoomRate;
    };
    const handleRotateLeft = () => {
      rotate.value -= 90;
    };
    const handleRotateRight = () => {
      rotate.value += 90;
    };
    const reset = () => {
      scale.value = 1;
      rotate.value = 0;
    };
    watch(index, (val) => {
      reset();
      emit("switch", val);
    });
    watch(
      () => props.initialIndex,
      (val) => {
        index.value = val;
      }
    );
    const handleKeyDown = (e) => {
      if (props.viewerMode === "viewerjs") return;
      if (e.key === "Escape" && props.closeOnPressEscape) {
        handleClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowUp") {
        handleZoomIn();
      } else if (e.key === "ArrowDown") {
        handleZoomOut();
      }
    };
    onMounted(() => {
      if (props.viewerMode === "viewerjs") {
        initViewerJS();
      } else {
        window.addEventListener("keydown", handleKeyDown);
      }
    });
    onUnmounted(() => {
      window.removeEventListener("keydown", handleKeyDown);
      if (viewer) {
        viewer.destroy();
        viewer = null;
      }
      if (viewerList) {
        document.body.removeChild(viewerList);
        viewerList = null;
      }
    });
    __expose({
      prev: handlePrev,
      next: handleNext,
      zoomIn: handleZoomIn,
      zoomOut: handleZoomOut,
      rotateLeft: handleRotateLeft,
      rotateRight: handleRotateRight,
      reset
    });
    const __returned__ = { props, emit, ns, t, index, scale, rotate, get viewer() {
      return viewer;
    }, set viewer(v) {
      viewer = v;
    }, get viewerList() {
      return viewerList;
    }, set viewerList(v) {
      viewerList = v;
    }, transform, handleClose, initViewerJS, handlePrev, handleNext, handleZoomIn, handleZoomOut, handleRotateLeft, handleRotateRight, reset, handleKeyDown, computed, ref, onMounted, onUnmounted, watch, get useNamespace() {
      return useNamespace;
    }, get useLocale() {
      return useLocale;
    }, get imageViewerProps() {
      return imageViewerProps;
    }, get imageViewerEmits() {
      return imageViewerEmits;
    }, get Viewer() {
      return Viewer;
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
