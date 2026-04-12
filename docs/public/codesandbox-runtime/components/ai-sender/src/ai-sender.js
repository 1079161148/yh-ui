import { createCommentVNode as _createCommentVNode, createVNode as _createVNode, toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, normalizeClass as _normalizeClass, openBlock as _openBlock, createElementBlock as _createElementBlock, Transition as _Transition, withCtx as _withCtx, renderList as _renderList, Fragment as _Fragment, renderSlot as _renderSlot, createBlock as _createBlock, normalizeStyle as _normalizeStyle } from "vue";
const _hoisted_1 = ["onClick"];
const _hoisted_2 = ["title"];
const _hoisted_3 = ["onClick"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a;
  return _openBlock(), _createElementBlock(
    "div",
    {
      class: _normalizeClass([$setup.ns.b(), $setup.ns.is("disabled", _ctx.disabled), $setup.ns.is("loading", _ctx.loading), $setup.ns.is("focused", $setup.isFocused)]),
      style: _normalizeStyle($setup.themeStyle),
      onDragenter: $setup.handleDragEnter,
      onDragover: $setup.handleDragOver,
      onDragleave: $setup.handleDragLeave,
      onDrop: $setup.handleDrop
    },
    [
      _createCommentVNode(" Drag Overlay "),
      _createVNode(_Transition, { name: "yh-fade-in" }, {
        default: _withCtx(() => [
          $setup.isDragging ? (_openBlock(), _createElementBlock(
            "div",
            {
              key: 0,
              class: _normalizeClass($setup.ns.e("drag-overlay"))
            },
            [
              _createElementVNode(
                "div",
                {
                  class: _normalizeClass($setup.ns.e("drag-message"))
                },
                [
                  _createVNode($setup["YhIcon"], { name: "upload" }),
                  _createElementVNode(
                    "span",
                    null,
                    _toDisplayString($setup.t("ai.sender.dragTip")),
                    1
                    /* TEXT */
                  )
                ],
                2
                /* CLASS */
              )
            ],
            2
            /* CLASS */
          )) : _createCommentVNode("v-if", true)
        ]),
        _: 1
        /* STABLE */
      }),
      _createCommentVNode(" Slash Commands Panel "),
      _createVNode(_Transition, { name: "yh-zoom-in-bottom" }, {
        default: _withCtx(() => [
          $setup.showCommands && $setup.filteredCommands.length > 0 ? (_openBlock(), _createElementBlock(
            "div",
            {
              key: 0,
              ref: "commandPanelRef",
              class: _normalizeClass($setup.ns.e("command-panel"))
            },
            [
              (_openBlock(true), _createElementBlock(
                _Fragment,
                null,
                _renderList($setup.filteredCommands, (cmd, index) => {
                  return _openBlock(), _createElementBlock("div", {
                    key: cmd.key,
                    class: _normalizeClass([$setup.ns.e("command-item"), $setup.ns.is("active", index === $setup.selectedCommandIndex)]),
                    onClick: ($event) => $setup.handleSelectCommand(cmd)
                  }, [
                    _createElementVNode(
                      "div",
                      {
                        class: _normalizeClass($setup.ns.e("command-icon"))
                      },
                      [
                        _createVNode($setup["YhIcon"], {
                          name: cmd.icon || "sparkles"
                        }, null, 8, ["name"])
                      ],
                      2
                      /* CLASS */
                    ),
                    _createElementVNode(
                      "div",
                      {
                        class: _normalizeClass($setup.ns.e("command-info"))
                      },
                      [
                        _createElementVNode(
                          "div",
                          {
                            class: _normalizeClass($setup.ns.e("command-label"))
                          },
                          "/" + _toDisplayString(cmd.key),
                          3
                          /* TEXT, CLASS */
                        ),
                        cmd.description ? (_openBlock(), _createElementBlock(
                          "div",
                          {
                            key: 0,
                            class: _normalizeClass($setup.ns.e("command-desc"))
                          },
                          _toDisplayString(cmd.description),
                          3
                          /* TEXT, CLASS */
                        )) : _createCommentVNode("v-if", true)
                      ],
                      2
                      /* CLASS */
                    )
                  ], 10, _hoisted_1);
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
      }),
      _createElementVNode(
        "div",
        {
          class: _normalizeClass($setup.ns.e("input-wrapper"))
        },
        [
          _ctx.$slots.prefix ? (_openBlock(), _createElementBlock(
            "div",
            {
              key: 0,
              class: _normalizeClass($setup.ns.e("prefix"))
            },
            [
              _renderSlot(_ctx.$slots, "prefix")
            ],
            2
            /* CLASS */
          )) : _createCommentVNode("v-if", true),
          _createCommentVNode(" Attachments Area "),
          _ctx.attachments && _ctx.attachments.length > 0 ? (_openBlock(), _createElementBlock(
            "div",
            {
              key: 1,
              class: _normalizeClass($setup.ns.e("attachments"))
            },
            [
              (_openBlock(true), _createElementBlock(
                _Fragment,
                null,
                _renderList(_ctx.attachments, (file) => {
                  return _openBlock(), _createElementBlock(
                    "div",
                    {
                      key: file.id,
                      class: _normalizeClass([$setup.ns.e("attachment-item"), $setup.ns.is(file.status || "success")])
                    },
                    [
                      _createElementVNode(
                        "div",
                        {
                          class: _normalizeClass($setup.ns.e("attachment-preview"))
                        },
                        [
                          file.type.startsWith("image/") ? (_openBlock(), _createBlock($setup["YhImage"], {
                            key: 0,
                            src: file.url,
                            alt: file.name,
                            "preview-src-list": file.url ? [file.url] : [],
                            "preview-teleported": "",
                            fit: "cover"
                          }, null, 8, ["src", "alt", "preview-src-list"])) : (_openBlock(), _createBlock($setup["YhIcon"], {
                            key: 1,
                            name: "document"
                          }))
                        ],
                        2
                        /* CLASS */
                      ),
                      _createElementVNode(
                        "div",
                        {
                          class: _normalizeClass($setup.ns.e("attachment-info"))
                        },
                        [
                          _createElementVNode("div", {
                            class: _normalizeClass($setup.ns.e("attachment-name")),
                            title: file.name
                          }, _toDisplayString(file.name), 11, _hoisted_2),
                          file.status === "uploading" ? (_openBlock(), _createElementBlock(
                            "div",
                            {
                              key: 0,
                              class: _normalizeClass($setup.ns.e("attachment-progress"))
                            },
                            [
                              _createElementVNode(
                                "div",
                                {
                                  class: _normalizeClass($setup.ns.e("progress-bar")),
                                  style: _normalizeStyle({
                                    width: (file.progress || 0) + "%"
                                  })
                                },
                                null,
                                6
                                /* CLASS, STYLE */
                              )
                            ],
                            2
                            /* CLASS */
                          )) : _createCommentVNode("v-if", true)
                        ],
                        2
                        /* CLASS */
                      ),
                      _createElementVNode("button", {
                        class: _normalizeClass($setup.ns.e("attachment-remove")),
                        onClick: ($event) => $setup.handleRemoveAttachment(file)
                      }, [
                        _createVNode($setup["YhIcon"], { name: "close" })
                      ], 10, _hoisted_3)
                    ],
                    2
                    /* CLASS */
                  );
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ],
            2
            /* CLASS */
          )) : _createCommentVNode("v-if", true),
          _createElementVNode(
            "div",
            {
              class: _normalizeClass($setup.ns.e("textarea-container"))
            },
            [
              _createVNode($setup["YhAiMention"], {
                ref: "textareaRef",
                modelValue: $setup.innerValue,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.innerValue = $event),
                type: "textarea",
                class: _normalizeClass($setup.ns.e("textarea")),
                placeholder: _ctx.placeholder === "Send a message..." ? $setup.t("ai.sender.placeholder") : _ctx.placeholder,
                disabled: _ctx.disabled || _ctx.loading,
                "max-length": _ctx.maxLength,
                rows: 1,
                options: _ctx.mentionOptions,
                trigger: ["@", "#"],
                onFocus: $setup.handleFocus,
                onBlur: $setup.handleBlur,
                onInput: $setup.handleInput,
                onKeydown: $setup.handleKeyDown
              }, null, 8, ["modelValue", "class", "placeholder", "disabled", "max-length", "options"])
            ],
            2
            /* CLASS */
          ),
          _createElementVNode(
            "div",
            {
              class: _normalizeClass($setup.ns.e("suffix"))
            },
            [
              _ctx.showWordLimit && _ctx.maxLength ? (_openBlock(), _createElementBlock(
                "span",
                {
                  key: 0,
                  class: _normalizeClass($setup.ns.e("word-limit"))
                },
                _toDisplayString($setup.innerValue.length) + " / " + _toDisplayString(_ctx.maxLength),
                3
                /* TEXT, CLASS */
              )) : _createCommentVNode("v-if", true)
            ],
            2
            /* CLASS */
          ),
          _createElementVNode(
            "div",
            {
              class: _normalizeClass($setup.ns.e("actions"))
            },
            [
              _renderSlot(_ctx.$slots, "actions"),
              _ctx.clearable && $setup.innerValue.length > 0 ? (_openBlock(), _createBlock($setup["YhButton"], {
                key: 0,
                class: _normalizeClass($setup.ns.e("clear-btn")),
                circle: "",
                onClick: $setup.handleClear,
                disabled: _ctx.loading
              }, {
                icon: _withCtx(() => [
                  _createVNode($setup["YhIcon"], { name: "clean" })
                ]),
                _: 1
                /* STABLE */
              }, 8, ["class", "disabled"])) : _createCommentVNode("v-if", true),
              _renderSlot(_ctx.$slots, "submit", {
                disabled: !((_a = $setup.innerValue) == null ? void 0 : _a.trim()) || _ctx.disabled,
                loading: _ctx.loading,
                submit: $setup.handleSend
              }, () => {
                var _a2, _b;
                return [
                  _createVNode($setup["YhButton"], {
                    type: ((_a2 = $setup.innerValue) == null ? void 0 : _a2.trim()) && !_ctx.disabled && !_ctx.loading ? "primary" : "default",
                    class: _normalizeClass($setup.ns.e("send-btn")),
                    disabled: !((_b = $setup.innerValue) == null ? void 0 : _b.trim()) || _ctx.disabled,
                    loading: _ctx.loading,
                    onClick: $setup.handleSend,
                    circle: ""
                  }, {
                    icon: _withCtx(() => [
                      _createVNode($setup["YhIcon"], { name: "send-arrow" })
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["type", "class", "disabled", "loading"])
                ];
              })
            ],
            2
            /* CLASS */
          )
        ],
        2
        /* CLASS */
      )
    ],
    38
    /* CLASS, STYLE, NEED_HYDRATION */
  );
}
import { useLocale } from "../../../hooks/index.js";
import { useNamespace } from "../../../hooks/use-namespace/index.js";
import { ref, computed, nextTick, watch } from "vue";
import { aiSenderProps, aiSenderEmits } from "./ai-sender-meta.js";
import { YhButton } from "../../button/index.js";
import { YhIcon } from "../../icon/index.js";
import { YhImage } from "../../image/index.js";
import { YhAiMention } from "../../ai-mention/index.js";
import { useComponentTheme } from "../../../theme/component-theme.js";
const __sfc__ = /* @__PURE__ */ Object.assign({
  name: "YhAiSender"
}, {
  __name: "ai-sender",
  props: aiSenderProps,
  emits: aiSenderEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    var _a;
    __expose();
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("ai-sender");
    const { t } = useLocale();
    const { themeStyle } = useComponentTheme(
      "ai-sender",
      computed(() => props.themeOverrides)
    );
    const textareaRef = ref(null);
    const localValue = ref((_a = props.modelValue) != null ? _a : "");
    const isFocused = ref(false);
    const commandPanelRef = ref();
    const isDragging = ref(false);
    const showCommands = ref(false);
    const commandSearch = ref("");
    const selectedCommandIndex = ref(0);
    const handleDragEnter = (e) => {
      if (props.disabled || props.loading) return;
      e.preventDefault();
      isDragging.value = true;
    };
    const handleDragOver = (e) => {
      if (props.disabled || props.loading) return;
      e.preventDefault();
      isDragging.value = true;
    };
    const handleDragLeave = (e) => {
      e.preventDefault();
      const rect = e.currentTarget.getBoundingClientRect();
      if (e.clientX <= rect.left || e.clientX >= rect.right || e.clientY <= rect.top || e.clientY >= rect.bottom) {
        isDragging.value = false;
      }
    };
    const handleDrop = (e) => {
      var _a2;
      if (props.disabled || props.loading) return;
      e.preventDefault();
      isDragging.value = false;
      const files = (_a2 = e.dataTransfer) == null ? void 0 : _a2.files;
      if (files && files.length > 0) {
        handleFiles(Array.from(files));
      }
    };
    const handleFiles = (files) => {
      emit("upload", files);
    };
    const handleRemoveAttachment = (attachment) => {
      emit("remove-attachment", attachment);
    };
    watch(
      () => props.modelValue,
      (val) => {
        localValue.value = val;
      }
    );
    const innerValue = computed({
      get: () => localValue.value,
      set: (val) => {
        localValue.value = val;
        emit("update:modelValue", val);
        emit("change", val);
      }
    });
    const filteredCommands = computed(() => {
      if (!commandSearch.value) return props.commands;
      const search = commandSearch.value.toLowerCase();
      return props.commands.filter(
        (cmd) => cmd.key.toLowerCase().includes(search) || cmd.label.toLowerCase().includes(search)
      );
    });
    const autoResize = () => {
      var _a2;
      const el = (_a2 = textareaRef.value) == null ? void 0 : _a2.getRef();
      if (!el) return;
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    };
    const handleInput = (val) => {
      var _a2;
      innerValue.value = val;
      const el = (_a2 = textareaRef.value) == null ? void 0 : _a2.getRef();
      if (!el) return;
      const cursorPosition = el.selectionStart || 0;
      const textBeforeCursor = val.slice(0, cursorPosition);
      const lastSlashIndex = textBeforeCursor.lastIndexOf("/");
      if (lastSlashIndex !== -1) {
        const textAfterSlash = textBeforeCursor.slice(lastSlashIndex + 1);
        if (lastSlashIndex === 0 || textBeforeCursor[lastSlashIndex - 1] === " " || textBeforeCursor[lastSlashIndex - 1] === "\n") {
          if (!textAfterSlash.includes(" ")) {
            showCommands.value = true;
            commandSearch.value = textAfterSlash;
            selectedCommandIndex.value = 0;
          } else {
            showCommands.value = false;
          }
        } else {
          showCommands.value = false;
        }
      } else {
        showCommands.value = false;
      }
      nextTick(autoResize);
    };
    const handleSelectCommand = (command) => {
      var _a2;
      const val = innerValue.value;
      const el = (_a2 = textareaRef.value) == null ? void 0 : _a2.getRef();
      const cursorPosition = (el == null ? void 0 : el.selectionStart) || 0;
      const textBeforeCursor = val.slice(0, cursorPosition);
      const lastSlashIndex = textBeforeCursor.lastIndexOf("/");
      const textAfterCursor = val.slice(cursorPosition);
      const replacement = command.prompt || `/${command.key} `;
      innerValue.value = textBeforeCursor.slice(0, lastSlashIndex) + replacement + textAfterCursor;
      showCommands.value = false;
      emit("command", command);
      nextTick(() => {
        var _a3;
        (_a3 = textareaRef.value) == null ? void 0 : _a3.focus();
        autoResize();
      });
    };
    const handleKeyDown = (e) => {
      var _a2;
      if (showCommands.value && filteredCommands.value.length > 0) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          selectedCommandIndex.value = (selectedCommandIndex.value + 1) % filteredCommands.value.length;
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          selectedCommandIndex.value = (selectedCommandIndex.value - 1 + filteredCommands.value.length) % filteredCommands.value.length;
        } else if (e.key === "Enter" || e.key === "Tab") {
          e.preventDefault();
          handleSelectCommand(filteredCommands.value[selectedCommandIndex.value]);
        } else if (e.key === "Escape") {
          showCommands.value = false;
        }
        return;
      }
      if (e.key === "Enter" && !e.shiftKey) {
        if (!((_a2 = innerValue.value) == null ? void 0 : _a2.trim()) || props.loading || props.disabled) {
          e.preventDefault();
        } else {
          e.preventDefault();
          handleSend();
        }
      }
    };
    const handleSend = () => {
      var _a2;
      if (!((_a2 = innerValue.value) == null ? void 0 : _a2.trim()) || props.loading || props.disabled) return;
      emit("send", innerValue.value);
      innerValue.value = "";
      nextTick(() => {
        var _a3;
        const el = (_a3 = textareaRef.value) == null ? void 0 : _a3.getRef();
        if (el) {
          el.style.height = "auto";
        }
      });
    };
    const handleClear = () => {
      innerValue.value = "";
      emit("clear");
      nextTick(autoResize);
    };
    const handleBlur = (e) => {
      isFocused.value = false;
      setTimeout(() => {
        showCommands.value = false;
      }, 200);
      emit("blur", e);
    };
    const handleFocus = (e) => {
      isFocused.value = true;
      emit("focus", e);
    };
    const __returned__ = { props, emit, ns, t, themeStyle, textareaRef, localValue, isFocused, commandPanelRef, isDragging, showCommands, commandSearch, selectedCommandIndex, handleDragEnter, handleDragOver, handleDragLeave, handleDrop, handleFiles, handleRemoveAttachment, innerValue, filteredCommands, autoResize, handleInput, handleSelectCommand, handleKeyDown, handleSend, handleClear, handleBlur, handleFocus, get useNamespace() {
      return useNamespace;
    }, get useLocale() {
      return useLocale;
    }, ref, computed, nextTick, watch, get aiSenderProps() {
      return aiSenderProps;
    }, get aiSenderEmits() {
      return aiSenderEmits;
    }, get YhButton() {
      return YhButton;
    }, get YhIcon() {
      return YhIcon;
    }, get YhImage() {
      return YhImage;
    }, get YhAiMention() {
      return YhAiMention;
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
