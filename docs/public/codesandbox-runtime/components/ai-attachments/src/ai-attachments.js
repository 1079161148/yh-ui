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
import { createCommentVNode as _createCommentVNode, renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, renderSlot as _renderSlot, toDisplayString as _toDisplayString, normalizeClass as _normalizeClass, createElementVNode as _createElementVNode, normalizeStyle as _normalizeStyle, createVNode as _createVNode, withModifiers as _withModifiers, withCtx as _withCtx } from "vue";
const _hoisted_1 = ["onClick"];
const _hoisted_2 = ["disabled"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock(), _createElementBlock(
    "div",
    {
      class: _normalizeClass([$setup.ns.b(), $setup.overflowClass]),
      style: _normalizeStyle([$setup.themeStyle, $setup.props.overflow === "scrollY" && $setup.props.scrollMaxHeight ? {
        maxHeight: $setup.props.scrollMaxHeight
      } : {}]),
      onDragenter: $setup.handleDragEnter,
      onDragleave: $setup.handleDragLeave,
      onDragover: $setup.handleDragOver,
      onDrop: $setup.handleDrop
    },
    [
      _createCommentVNode(" \u6587\u4EF6\u5217\u8868 "),
      $setup.internalItems.length > 0 ? (_openBlock(), _createElementBlock(
        "div",
        {
          key: 0,
          ref: "listContainerRef",
          class: _normalizeClass($setup.ns.e("list")),
          style: _normalizeStyle(_ctx.listStyle)
        },
        [
          (_openBlock(true), _createElementBlock(
            _Fragment,
            null,
            _renderList($setup.internalItems, (item, index) => {
              return _openBlock(), _createElementBlock(
                "div",
                {
                  key: item.uid || index,
                  class: _normalizeClass([$setup.ns.e("item"), $setup.ns.is("error", item.status === "error")])
                },
                [
                  _renderSlot(_ctx.$slots, "file-item", {
                    item,
                    index
                  }, () => [
                    _createVNode($setup["YhAiFileCard"], {
                      name: item.name,
                      byte: item.byte,
                      type: item.type,
                      icon: $setup.getItemIcon(item),
                      src: item.url || item.thumbUrl,
                      description: item.status === "error" ? item.error : item.description,
                      loading: item.status === "uploading",
                      size: "small"
                    }, {
                      default: _withCtx(() => {
                        var _a;
                        return [
                          _createCommentVNode(" \u4E0A\u4F20\u8FDB\u5EA6\uFF08\u8FDB\u5EA6\u6761 + \u767E\u5206\u6BD4\uFF09 "),
                          item.status === "uploading" ? (_openBlock(), _createElementBlock(
                            "div",
                            {
                              key: 0,
                              class: _normalizeClass($setup.ns.e("progress-wrap"))
                            },
                            [
                              _createElementVNode(
                                "span",
                                {
                                  class: _normalizeClass($setup.ns.e("progress-text"))
                                },
                                _toDisplayString((_a = item.percent) != null ? _a : 0) + "%",
                                3
                                /* TEXT, CLASS */
                              ),
                              _createElementVNode(
                                "div",
                                {
                                  class: _normalizeClass($setup.ns.e("progress"))
                                },
                                [
                                  _createElementVNode(
                                    "div",
                                    {
                                      class: _normalizeClass($setup.ns.e("progress-bar")),
                                      style: _normalizeStyle({
                                        width: `${item.percent || 0}%`
                                      })
                                    },
                                    null,
                                    6
                                    /* CLASS, STYLE */
                                  )
                                ],
                                2
                                /* CLASS */
                              )
                            ],
                            2
                            /* CLASS */
                          )) : _createCommentVNode("v-if", true),
                          _createCommentVNode(" \u5220\u9664\u6309\u94AE "),
                          item.status !== "uploading" ? (_openBlock(), _createElementBlock("button", {
                            key: 1,
                            class: _normalizeClass($setup.ns.e("delete-btn")),
                            onClick: _withModifiers(($event) => $setup.handleDelete(item, index), ["stop"])
                          }, [
                            _createVNode($setup["YhIcon"], { name: "close" })
                          ], 10, _hoisted_1)) : _createCommentVNode("v-if", true)
                        ];
                      }),
                      _: 2
                      /* DYNAMIC */
                    }, 1032, ["name", "byte", "type", "icon", "src", "description", "loading"])
                  ])
                ],
                2
                /* CLASS */
              );
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ],
        6
        /* CLASS, STYLE */
      )) : _createCommentVNode("v-if", true),
      _createCommentVNode(" \u4E0A\u4F20\u6309\u94AE / \u5360\u4F4D\u7B26 "),
      !_ctx.hideUpload && $setup.canUpload ? (_openBlock(), _createElementBlock(
        "div",
        {
          key: 1,
          class: _normalizeClass([$setup.ns.e("upload"), $setup.ns.is("dragging", $setup.isDragging)]),
          onClick: $setup.triggerUpload
        },
        [
          _renderSlot(_ctx.$slots, "upload-button", { canUpload: $setup.canUpload }, () => [
            _createElementVNode(
              "div",
              {
                class: _normalizeClass($setup.ns.e("upload-content"))
              },
              [
                _createVNode($setup["YhIcon"], {
                  name: $setup.computedPlaceholder.icon || "upload",
                  size: _ctx.uploadIconSize
                }, null, 8, ["name", "size"]),
                _createElementVNode(
                  "div",
                  {
                    class: _normalizeClass($setup.ns.e("upload-text"))
                  },
                  [
                    _createElementVNode(
                      "div",
                      {
                        class: _normalizeClass($setup.ns.e("upload-title"))
                      },
                      _toDisplayString($setup.isDragging ? $setup.computedDropPlaceholder.title : $setup.computedPlaceholder.title),
                      3
                      /* TEXT, CLASS */
                    ),
                    $setup.computedPlaceholder.description ? (_openBlock(), _createElementBlock(
                      "div",
                      {
                        key: 0,
                        class: _normalizeClass($setup.ns.e("upload-description"))
                      },
                      _toDisplayString($setup.computedPlaceholder.description),
                      3
                      /* TEXT, CLASS */
                    )) : _createCommentVNode("v-if", true)
                  ],
                  2
                  /* CLASS */
                )
              ],
              2
              /* CLASS */
            )
          ])
        ],
        2
        /* CLASS */
      )) : _createCommentVNode("v-if", true),
      _createCommentVNode(" \u62D6\u62FD\u906E\u7F69 "),
      $setup.isDragging ? (_openBlock(), _createElementBlock(
        "div",
        {
          key: 2,
          class: _normalizeClass($setup.ns.e("drop-mask"))
        },
        [
          _renderSlot(_ctx.$slots, "drop-area", {}, () => [
            _createElementVNode(
              "div",
              {
                class: _normalizeClass($setup.ns.e("drop-content"))
              },
              [
                _createVNode($setup["YhIcon"], {
                  name: $setup.computedDropPlaceholder.icon || "upload",
                  size: _ctx.uploadIconSize
                }, null, 8, ["name", "size"]),
                _createElementVNode(
                  "div",
                  {
                    class: _normalizeClass($setup.ns.e("drop-text"))
                  },
                  _toDisplayString($setup.computedDropPlaceholder.title || $setup.t("ai.attachments.dropTip")),
                  3
                  /* TEXT, CLASS */
                )
              ],
              2
              /* CLASS */
            )
          ])
        ],
        2
        /* CLASS */
      )) : _createCommentVNode("v-if", true),
      _createCommentVNode(" \u6EDA\u52A8\u6309\u94AE "),
      $setup.showScrollButtons ? (_openBlock(), _createElementBlock(
        "button",
        {
          key: 3,
          class: _normalizeClass([$setup.ns.e("scroll-btn"), $setup.ns.e("scroll-prev")]),
          onClick: $setup.scrollLeft
        },
        [
          _createVNode($setup["YhIcon"], { name: "arrow-left" })
        ],
        2
        /* CLASS */
      )) : _createCommentVNode("v-if", true),
      $setup.showScrollButtons ? (_openBlock(), _createElementBlock(
        "button",
        {
          key: 4,
          class: _normalizeClass([$setup.ns.e("scroll-btn"), $setup.ns.e("scroll-next")]),
          onClick: $setup.scrollRight
        },
        [
          _createVNode($setup["YhIcon"], { name: "arrow-right" })
        ],
        2
        /* CLASS */
      )) : _createCommentVNode("v-if", true),
      _createCommentVNode(" \u9690\u85CF\u7684\u6587\u4EF6\u8F93\u5165 "),
      _createElementVNode("input", {
        ref: "fileInputRef",
        type: "file",
        class: _normalizeClass($setup.ns.e("file-input")),
        multiple: "",
        disabled: _ctx.disabled,
        onChange: $setup.handleFileSelect
      }, null, 42, _hoisted_2)
    ],
    38
    /* CLASS, STYLE, NEED_HYDRATION */
  );
}
import { ref, computed, watch } from "vue";
import { useLocale } from "../../../hooks/index.js";
import { useNamespace } from "../../../hooks/use-namespace/index.js";
import { useComponentTheme } from "../../../theme/component-theme.js";
import {
  aiAttachmentsProps,
  aiAttachmentsEmits
} from "./ai-attachments-meta.js";
import { YhAiFileCard } from "../../ai-file-card/index.js";
import { YhIcon } from "../../icon/index.js";
const __sfc__ = /* @__PURE__ */ Object.assign({
  name: "YhAiAttachments"
}, {
  __name: "ai-attachments",
  props: aiAttachmentsProps,
  emits: aiAttachmentsEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("ai-attachments");
    const { t } = useLocale();
    const { themeStyle } = useComponentTheme(
      "ai-attachments",
      computed(() => props.themeOverrides)
    );
    const internalItems = ref([...props.items]);
    watch(
      () => props.items,
      (newItems) => {
        internalItems.value = [...newItems];
      },
      { deep: true }
    );
    const normalizePlaceholder = (raw) => {
      if (typeof raw === "function") {
        return raw("inline");
      }
      if (typeof raw === "string") {
        return { icon: "upload", title: raw };
      }
      return raw || {};
    };
    const computedPlaceholder = computed(() => {
      return normalizePlaceholder(props.placeholder);
    });
    const computedDropPlaceholder = computed(() => {
      const placeholder = props.placeholder;
      if (typeof placeholder === "function") {
        return placeholder("drop");
      }
      if (typeof placeholder === "string") {
        return { icon: "upload", title: placeholder };
      }
      return placeholder || {};
    });
    const canUpload = computed(() => {
      if (props.disabled) return false;
      if (props.maxCount !== void 0 && internalItems.value.length >= props.maxCount) {
        return false;
      }
      return true;
    });
    const overflowClass = computed(() => {
      return ns.m(`overflow-${props.overflow}`);
    });
    const extensionIconMap = {
      pdf: "pdf",
      xlsx: "excel",
      xls: "excel",
      doc: "word",
      docx: "word",
      ppt: "ppt",
      pptx: "ppt",
      png: "image",
      jpg: "image",
      jpeg: "image",
      gif: "image",
      webp: "image",
      svg: "image",
      mp4: "video",
      webm: "video",
      mp3: "audio",
      wav: "audio",
      zip: "zip",
      md: "markdown",
      txt: "txt",
      java: "java",
      js: "javascript",
      ts: "javascript",
      py: "python"
    };
    function getItemIcon(item) {
      var _a;
      if (item.icon) return item.icon;
      const ext = (_a = (item.name || "").split(".").pop()) == null ? void 0 : _a.toLowerCase();
      return ext ? extensionIconMap[ext] : void 0;
    }
    const fileInputRef = ref(null);
    const isDragging = ref(false);
    const dragCounter = ref(0);
    const handleFileSelect = async (event) => {
      const input = event.target;
      const files = Array.from(input.files || []);
      if (files.length > 0) {
        await processFiles(files);
      }
      if (fileInputRef.value) {
        fileInputRef.value.value = "";
      }
    };
    const handleDragEnter = (e) => {
      e.preventDefault();
      dragCounter.value += 1;
      isDragging.value = true;
    };
    const handleDragLeave = (e) => {
      e.preventDefault();
      dragCounter.value = Math.max(0, dragCounter.value - 1);
      if (dragCounter.value === 0) {
        isDragging.value = false;
      }
    };
    const handleDragOver = (e) => {
      e.preventDefault();
    };
    const handleDrop = async (e) => {
      var _a;
      e.preventDefault();
      dragCounter.value = 0;
      isDragging.value = false;
      const files = Array.from(((_a = e.dataTransfer) == null ? void 0 : _a.files) || []);
      if (files.length > 0) {
        emit("upload-drop", files);
        await processFiles(files);
      }
    };
    const processFiles = async (files) => {
      const validFiles = files.filter((f) => f.type !== "");
      if (validFiles.length === 0) return;
      for (const file of validFiles) {
        if (props.beforeUpload) {
          const result = await props.beforeUpload(file);
          if (!result) continue;
        }
        const fileItem = {
          uid: Date.now() + Math.random(),
          name: file.name,
          byte: file.size,
          type: file.type.split("/")[0] || "file",
          status: "uploading",
          percent: 0
        };
        internalItems.value.push(fileItem);
        emit("upload-change", file, internalItems.value);
        if (props.httpRequest) {
          try {
            await props.httpRequest({ file });
            const index = internalItems.value.findIndex((item) => item.uid === fileItem.uid);
            if (index !== -1) {
              internalItems.value[index] = __spreadProps(__spreadValues({}, internalItems.value[index]), {
                status: "done",
                percent: 100
              });
            }
            emit("upload-success", { success: true }, file, internalItems.value);
          } catch (error) {
            const index = internalItems.value.findIndex((item) => item.uid === fileItem.uid);
            if (index !== -1) {
              internalItems.value[index] = __spreadProps(__spreadValues({}, internalItems.value[index]), {
                status: "error",
                error: String(error)
              });
            }
            emit("upload-error", error, file, internalItems.value);
          }
        }
      }
      emit("update:items", internalItems.value);
    };
    const triggerUpload = () => {
      var _a;
      if (!canUpload.value) return;
      (_a = fileInputRef.value) == null ? void 0 : _a.click();
    };
    const handleDelete = (item, index) => {
      internalItems.value.splice(index, 1);
      emit("delete-card", item, index);
      emit("update:items", internalItems.value);
    };
    const listContainerRef = ref(null);
    const scrollLeft = () => {
      if (listContainerRef.value) {
        listContainerRef.value.scrollLeft -= 200;
      }
    };
    const scrollRight = () => {
      if (listContainerRef.value) {
        listContainerRef.value.scrollLeft += 200;
      }
    };
    const showScrollButtons = computed(() => {
      if (props.overflow !== "scrollX") {
        return false;
      }
      return internalItems.value.length > 3;
    });
    const __returned__ = { props, emit, ns, t, themeStyle, internalItems, normalizePlaceholder, computedPlaceholder, computedDropPlaceholder, canUpload, overflowClass, extensionIconMap, getItemIcon, fileInputRef, isDragging, dragCounter, handleFileSelect, handleDragEnter, handleDragLeave, handleDragOver, handleDrop, processFiles, triggerUpload, handleDelete, listContainerRef, scrollLeft, scrollRight, showScrollButtons, ref, computed, watch, get useNamespace() {
      return useNamespace;
    }, get useLocale() {
      return useLocale;
    }, get useComponentTheme() {
      return useComponentTheme;
    }, get aiAttachmentsProps() {
      return aiAttachmentsProps;
    }, get aiAttachmentsEmits() {
      return aiAttachmentsEmits;
    }, get YhAiFileCard() {
      return YhAiFileCard;
    }, get YhIcon() {
      return YhIcon;
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
