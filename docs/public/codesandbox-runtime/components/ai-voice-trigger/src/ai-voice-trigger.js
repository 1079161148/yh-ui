import { createCommentVNode as _createCommentVNode, normalizeClass as _normalizeClass, createElementVNode as _createElementVNode, renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, normalizeStyle as _normalizeStyle, toDisplayString as _toDisplayString, createVNode as _createVNode, Transition as _Transition, withCtx as _withCtx, createBlock as _createBlock, renderSlot as _renderSlot, createTextVNode as _createTextVNode, Teleport as _Teleport } from "vue";
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock(), _createBlock(_Teleport, {
    to: "body",
    disabled: $setup.props.variant === "inline" || !$setup.props.teleport
  }, [
    _createElementVNode(
      "div",
      {
        class: _normalizeClass([$setup.ns.b(), $setup.ns.m($setup.props.variant), $setup.ns.m($setup.props.position), $setup.ns.is("recording", $setup.props.recording || $setup.localRecording)]),
        style: _normalizeStyle([$setup.props.variant !== "inline" ? {
          position: $setup.props.teleport ? "fixed" : "relative",
          [$setup.props.position.split("-")[0]]: $setup.props.teleport ? $setup.props.offset[0] + "px" : "auto",
          [$setup.props.position.split("-")[1]]: $setup.props.teleport ? $setup.props.offset[1] + "px" : "auto"
        } : {}, $setup.themeStyle])
      },
      [
        _createElementVNode(
          "div",
          {
            class: _normalizeClass($setup.ns.e("body"))
          },
          [
            _createCommentVNode(" Waveform Visualizer "),
            _createVNode(_Transition, { name: "yh-voice-expand" }, {
              default: _withCtx(() => [
                $setup.props.recording || $setup.localRecording ? (_openBlock(), _createElementBlock(
                  "div",
                  {
                    key: 0,
                    class: _normalizeClass($setup.ns.e("visualizer"))
                  },
                  [
                    _createCommentVNode(" Sphere Visualizer (Pulsing Ball) "),
                    $setup.props.variant === "sphere" ? (_openBlock(), _createElementBlock(
                      _Fragment,
                      { key: 0 },
                      [
                        _createElementVNode(
                          "div",
                          {
                            class: _normalizeClass($setup.ns.e("sphere-glow"))
                          },
                          null,
                          2
                          /* CLASS */
                        ),
                        (_openBlock(), _createElementBlock(
                          _Fragment,
                          null,
                          _renderList(3, (i) => {
                            return _createElementVNode(
                              "div",
                              {
                                key: i,
                                class: _normalizeClass($setup.ns.e("sphere-pulse")),
                                style: _normalizeStyle({
                                  animationDelay: i * 0.5 + "s",
                                  transform: `scale(${1 + ($setup.simulatedAmplitudes[i] || 0) / 100})`
                                })
                              },
                              null,
                              6
                              /* CLASS, STYLE */
                            );
                          }),
                          64
                          /* STABLE_FRAGMENT */
                        ))
                      ],
                      64
                      /* STABLE_FRAGMENT */
                    )) : (_openBlock(), _createElementBlock(
                      _Fragment,
                      { key: 1 },
                      [
                        _createCommentVNode(" Standard Wave Visualizer "),
                        _createElementVNode(
                          "div",
                          {
                            class: _normalizeClass($setup.ns.e("bars"))
                          },
                          [
                            (_openBlock(true), _createElementBlock(
                              _Fragment,
                              null,
                              _renderList($setup.simulatedAmplitudes, (amp, i) => {
                                return _openBlock(), _createElementBlock(
                                  "span",
                                  {
                                    key: i,
                                    style: _normalizeStyle({
                                      height: amp + "px"
                                    }),
                                    class: _normalizeClass($setup.ns.e("bar"))
                                  },
                                  null,
                                  6
                                  /* CLASS, STYLE */
                                );
                              }),
                              128
                              /* KEYED_FRAGMENT */
                            ))
                          ],
                          2
                          /* CLASS */
                        )
                      ],
                      2112
                      /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                    )),
                    $setup.props.variant !== "sphere" ? (_openBlock(), _createElementBlock(
                      "span",
                      {
                        key: 2,
                        class: _normalizeClass($setup.ns.e("hint"))
                      },
                      _toDisplayString($setup.t("ai.voice.listening")),
                      3
                      /* TEXT, CLASS */
                    )) : _createCommentVNode("v-if", true),
                    _createCommentVNode(" Cancel Button "),
                    _createElementVNode(
                      "button",
                      {
                        class: _normalizeClass($setup.ns.e("cancel")),
                        onClick: $setup.handleCancel,
                        title: "Cancel"
                      },
                      [
                        _createVNode($setup["YhIcon"], { name: "close" })
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
            _createCommentVNode(" Main Trigger Button "),
            _createElementVNode(
              "button",
              {
                class: _normalizeClass([$setup.ns.e("trigger"), {
                  "is-active": $setup.props.recording || $setup.localRecording
                }]),
                onClick: $setup.toggleRecording
              },
              [
                _createElementVNode(
                  "span",
                  {
                    class: _normalizeClass($setup.ns.e("mic"))
                  },
                  [
                    $setup.props.variant === "sphere" && ($setup.props.recording || $setup.localRecording) ? (_openBlock(), _createElementBlock(
                      "div",
                      {
                        key: 0,
                        class: _normalizeClass($setup.ns.e("sphere-inner"))
                      },
                      null,
                      2
                      /* CLASS */
                    )) : (_openBlock(), _createBlock($setup["YhIcon"], {
                      key: 1,
                      name: $setup.props.recording || $setup.localRecording ? "video-pause" : "microphone"
                    }, null, 8, ["name"]))
                  ],
                  2
                  /* CLASS */
                ),
                !($setup.props.recording || $setup.localRecording) && $setup.props.variant === "inline" ? (_openBlock(), _createElementBlock(
                  "span",
                  {
                    key: 0,
                    class: _normalizeClass($setup.ns.e("label"))
                  },
                  [
                    _renderSlot(_ctx.$slots, "default", {}, () => [
                      _createTextVNode(
                        _toDisplayString($setup.t("ai.voice.trigger")),
                        1
                        /* TEXT */
                      )
                    ])
                  ],
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
        )
      ],
      6
      /* CLASS, STYLE */
    )
  ], 8, ["disabled"]);
}
import { useLocale } from "../../../hooks/index.js";
import { useNamespace } from "../../../hooks/use-namespace/index.js";
import { useComponentTheme } from "../../../theme/component-theme.js";
import { computed, ref, onBeforeUnmount, watch } from "vue";
import { aiVoiceTriggerProps, aiVoiceTriggerEmits } from "./ai-voice-trigger-meta.js";
import { YhIcon } from "../../icon/index.js";
const __sfc__ = /* @__PURE__ */ Object.assign({
  name: "YhAiVoiceTrigger"
}, {
  __name: "ai-voice-trigger",
  props: aiVoiceTriggerProps,
  emits: aiVoiceTriggerEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("ai-voice-trigger");
    const { t } = useLocale();
    const { themeStyle } = useComponentTheme(
      "ai-voice-trigger",
      computed(() => props.themeOverrides)
    );
    const localRecording = ref(props.recording);
    let visualizerTimer = null;
    const simulatedAmplitudes = ref(Array(20).fill(5));
    watch(
      () => props.amplitudes,
      (newAmps) => {
        if (newAmps && newAmps.length > 0) {
          const hasData = newAmps.some((a) => a > 6 || a > 0 && a !== 5);
          if (hasData) {
            simulatedAmplitudes.value = [...newAmps];
          }
        }
      },
      { immediate: true, deep: true }
    );
    const syncAmplitudes = () => {
      if (props.recording || localRecording.value) {
        const hasData = props.amplitudes && props.amplitudes.some((a) => a > 6 || a > 0 && a !== 5);
        if (!hasData) {
          simulatedAmplitudes.value = Array.from({ length: 20 }, () => 10 + Math.random() * 40);
        }
      }
    };
    const toggleRecording = () => {
      if (props.recording === void 0 || props.recording === null) {
        localRecording.value = !localRecording.value;
        if (localRecording.value) startVisualizer();
        else stopVisualizer();
        return;
      }
      const newStatus = !props.recording;
      emit("update:recording", newStatus);
      if (newStatus) {
        emit("start");
        startVisualizer();
      } else {
        emit("stop");
        stopVisualizer();
      }
    };
    const handleCancel = (e) => {
      e.stopPropagation();
      emit("update:recording", false);
      emit("cancel");
      stopVisualizer();
    };
    const startVisualizer = () => {
      if (visualizerTimer) clearInterval(visualizerTimer);
      visualizerTimer = setInterval(syncAmplitudes, 150);
    };
    const stopVisualizer = () => {
      if (visualizerTimer) clearInterval(visualizerTimer);
      simulatedAmplitudes.value = Array(20).fill(5);
    };
    onBeforeUnmount(() => {
      if (visualizerTimer) clearInterval(visualizerTimer);
    });
    const __returned__ = { props, emit, ns, t, themeStyle, localRecording, get visualizerTimer() {
      return visualizerTimer;
    }, set visualizerTimer(v) {
      visualizerTimer = v;
    }, simulatedAmplitudes, syncAmplitudes, toggleRecording, handleCancel, startVisualizer, stopVisualizer, get useNamespace() {
      return useNamespace;
    }, get useLocale() {
      return useLocale;
    }, get useComponentTheme() {
      return useComponentTheme;
    }, computed, ref, onBeforeUnmount, watch, get aiVoiceTriggerProps() {
      return aiVoiceTriggerProps;
    }, get aiVoiceTriggerEmits() {
      return aiVoiceTriggerEmits;
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
