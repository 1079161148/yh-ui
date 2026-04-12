import { createVNode as _createVNode, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, withCtx as _withCtx, openBlock as _openBlock, createBlock as _createBlock, createCommentVNode as _createCommentVNode, normalizeClass as _normalizeClass, createElementVNode as _createElementVNode, createElementBlock as _createElementBlock, renderList as _renderList, Fragment as _Fragment, normalizeStyle as _normalizeStyle } from "vue";
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock(), _createElementBlock(
    "div",
    {
      class: _normalizeClass($setup.ns.b()),
      style: _normalizeStyle($setup.themeStyle)
    },
    [
      _createElementVNode(
        "div",
        {
          class: _normalizeClass($setup.ns.e("toolbar"))
        },
        [
          !$setup.isRunning ? (_openBlock(), _createBlock($setup["YhButton"], {
            key: 0,
            type: "primary",
            size: "small",
            disabled: !_ctx.code,
            onClick: $setup.runCode
          }, {
            icon: _withCtx(() => [
              _createVNode($setup["YhIcon"], { name: "video-play" })
            ]),
            default: _withCtx(() => [
              _createTextVNode(
                " " + _toDisplayString($setup.t("ai.codeRunner.run")),
                1
                /* TEXT */
              )
            ]),
            _: 1
            /* STABLE */
          }, 8, ["disabled"])) : (_openBlock(), _createBlock($setup["YhButton"], {
            key: 1,
            type: "danger",
            size: "small",
            onClick: $setup.stopCode
          }, {
            icon: _withCtx(() => [
              _createVNode($setup["YhIcon"], { name: "video-pause" })
            ]),
            default: _withCtx(() => [
              _createTextVNode(
                " " + _toDisplayString($setup.t("ai.codeRunner.stop")),
                1
                /* TEXT */
              )
            ]),
            _: 1
            /* STABLE */
          })),
          _createVNode($setup["YhButton"], {
            size: "small",
            onClick: $setup.clearOutput
          }, {
            icon: _withCtx(() => [
              _createVNode($setup["YhIcon"], { name: "delete" })
            ]),
            default: _withCtx(() => [
              _createTextVNode(
                " " + _toDisplayString($setup.t("ai.codeRunner.clear")),
                1
                /* TEXT */
              )
            ]),
            _: 1
            /* STABLE */
          }),
          _createVNode($setup["YhButton"], {
            size: "small",
            onClick: $setup.reset
          }, {
            icon: _withCtx(() => [
              _createVNode($setup["YhIcon"], { name: "refresh" })
            ]),
            default: _withCtx(() => [
              _createTextVNode(
                " " + _toDisplayString($setup.t("ai.codeRunner.reset")),
                1
                /* TEXT */
              )
            ]),
            _: 1
            /* STABLE */
          })
        ],
        2
        /* CLASS */
      ),
      _createElementVNode(
        "div",
        {
          ref: "terminalRef",
          class: _normalizeClass($setup.ns.e("terminal")),
          style: _normalizeStyle({
            height: $setup.terminalHeight
          })
        },
        [
          $setup.output.length === 0 ? (_openBlock(), _createElementBlock(
            "div",
            {
              key: 0,
              class: _normalizeClass($setup.ns.e("placeholder"))
            },
            _toDisplayString($setup.t("ai.codeRunner.placeholder")),
            3
            /* TEXT, CLASS */
          )) : _createCommentVNode("v-if", true),
          (_openBlock(true), _createElementBlock(
            _Fragment,
            null,
            _renderList($setup.output, (line, index) => {
              return _openBlock(), _createElementBlock(
                "div",
                {
                  key: index,
                  class: _normalizeClass([$setup.ns.e("line"), line.includes("[error]") ? $setup.ns.m("error") : ""])
                },
                _toDisplayString(line),
                3
                /* TEXT, CLASS */
              );
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ],
        6
        /* CLASS, STYLE */
      )
    ],
    6
    /* CLASS, STYLE */
  );
}
import { useLocale } from "../../../hooks/index.js";
import { useNamespace } from "../../../hooks/use-namespace/index.js";
import { ref, onMounted, onBeforeUnmount, computed, watch, shallowRef, nextTick } from "vue";
import { YhButton } from "../../button/index.js";
import { YhIcon } from "../../icon/index.js";
import { aiCodeRunnerProps, aiCodeRunnerEmits } from "./ai-code-runner-meta.js";
import { useComponentTheme } from "../../../theme/component-theme.js";
import { getWebContainerInstance } from "./webcontainer.js";
const __sfc__ = /* @__PURE__ */ Object.assign({
  name: "YhAiCodeRunner"
}, {
  __name: "ai-code-runner",
  props: aiCodeRunnerProps,
  emits: aiCodeRunnerEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("ai-code-runner");
    const { t } = useLocale();
    const { themeStyle } = useComponentTheme("ai-code-runner", props.themeOverrides);
    const webcontainerInstance = shallowRef(
      null
    );
    const isRunning = ref(false);
    const output = ref([]);
    const terminalRef = ref();
    const terminalHeight = computed(() => {
      if (typeof props.height === "number") {
        return `${props.height}px`;
      }
      return props.height;
    });
    const addOutput = (data, type = "log") => {
      const timestamp = (/* @__PURE__ */ new Date()).toLocaleTimeString();
      const prefix = type === "error" ? "[error]" : ">";
      output.value.push(`[${timestamp}] ${prefix} ${data}`);
      nextTick(() => {
        if (terminalRef.value) {
          terminalRef.value.scrollTop = terminalRef.value.scrollHeight;
        }
      });
    };
    const initWebContainer = async () => {
      try {
        if (!webcontainerInstance.value) {
          webcontainerInstance.value = await getWebContainerInstance();
          emit("ready", webcontainerInstance.value);
          addOutput("WebContainer \u521D\u59CB\u5316\u5B8C\u6210", "log");
        }
      } catch (error) {
        const errMsg = error instanceof Error ? error.message : "Unknown error";
        addOutput(`WebContainer \u521D\u59CB\u5316\u5931\u8D25: ${errMsg}`, "error");
        emit("error", errMsg);
      }
    };
    const runCode = async () => {
      if (!props.code || isRunning.value) return;
      try {
        if (!webcontainerInstance.value) {
          await initWebContainer();
        }
        const container = webcontainerInstance.value;
        if (!container) {
          throw new Error("WebContainer \u672A\u5C31\u7EEA");
        }
        isRunning.value = true;
        output.value = [];
        addOutput("\u5F00\u59CB\u6267\u884C\u4EE3\u7801...", "log");
        emit("run", props.code);
        await container.mount({
          "index.js": {
            file: {
              contents: props.code
            }
          }
        });
        const shellProcess = await container.spawn("node", ["index.js"]);
        shellProcess.output.pipeTo(
          new WritableStream({
            write(data) {
              const cleanData = data.replace(/\x1b\[[0-9;]*m/g, "");
              cleanData.split("\n").filter(Boolean).forEach((line) => {
                addOutput(line, "log");
                emit("output", line);
              });
            }
          })
        );
        const exitCode = await shellProcess.exit;
        if (exitCode === 0) {
          addOutput("\u6267\u884C\u5B8C\u6210", "log");
        } else {
          addOutput(`\u6267\u884C\u5931\u8D25\uFF0C\u9000\u51FA\u7801: ${exitCode != null ? exitCode : "unknown"}`, "error");
        }
      } catch (error) {
        const errMsg = error instanceof Error ? error.message : String(error);
        addOutput(`\u6267\u884C\u51FA\u9519: ${errMsg}`, "error");
        emit("error", errMsg);
      } finally {
        isRunning.value = false;
      }
    };
    const stopCode = () => {
      isRunning.value = false;
      addOutput("\u6267\u884C\u5DF2\u505C\u6B62", "log");
      emit("stop");
    };
    const clearOutput = () => {
      output.value = [];
    };
    const reset = async () => {
      stopCode();
      output.value = [];
      if (webcontainerInstance.value) {
        webcontainerInstance.value = null;
        addOutput("WebContainer \u5DF2\u91CD\u7F6E", "log");
      }
    };
    onMounted(() => {
      initWebContainer();
      if (props.autorun && props.code) {
        runCode();
      }
    });
    onBeforeUnmount(() => {
      if (webcontainerInstance.value) {
        webcontainerInstance.value = null;
      }
    });
    watch(
      () => props.code,
      () => {
        if (props.autorun) {
          runCode();
        }
      }
    );
    __expose({
      run: runCode,
      stop: stopCode,
      reset,
      clear: clearOutput
    });
    const __returned__ = { props, emit, ns, t, themeStyle, webcontainerInstance, isRunning, output, terminalRef, terminalHeight, addOutput, initWebContainer, runCode, stopCode, clearOutput, reset, get useNamespace() {
      return useNamespace;
    }, get useLocale() {
      return useLocale;
    }, ref, onMounted, onBeforeUnmount, computed, watch, shallowRef, nextTick, get YhButton() {
      return YhButton;
    }, get YhIcon() {
      return YhIcon;
    }, get aiCodeRunnerProps() {
      return aiCodeRunnerProps;
    }, get aiCodeRunnerEmits() {
      return aiCodeRunnerEmits;
    }, get useComponentTheme() {
      return useComponentTheme;
    }, get getWebContainerInstance() {
      return getWebContainerInstance;
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
