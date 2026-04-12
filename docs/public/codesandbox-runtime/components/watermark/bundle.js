// public/codesandbox-runtime/components/watermark/src/watermark.js
import { renderSlot as _renderSlot, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue";
import { ref as ref2, computed as computed2, onMounted, onBeforeUnmount, watch, nextTick } from "vue";

// public/codesandbox-runtime/components/watermark/src/watermark-meta.js
var watermarkProps = {
  /** 宽度 */
  width: {
    type: Number,
    default: 120
  },
  /** 高度 */
  height: {
    type: Number,
    default: 64
  },
  /** 旋转角度 */
  rotate: {
    type: Number,
    default: -22
  },
  /** z-index */
  zIndex: {
    type: Number,
    default: 9
  },
  /** 图片源 */
  image: String,
  /** 文字内容 */
  content: {
    type: [String, Array],
    default: "YH-UI"
  },
  /** 字体设置 */
  font: {
    type: Object,
    default: () => ({
      color: "rgba(0,0,0,0.15)",
      fontSize: 16,
      fontWeight: "normal",
      fontFamily: "sans-serif",
      fontStyle: "normal",
      textAlign: "center",
      lineHeight: 22
    })
  },
  /** 整体旋转角度 */
  globalRotate: {
    type: Number,
    default: 0
  },
  /** 间距 */
  gap: {
    type: Array,
    default: () => [100, 100]
  },
  /** 偏移 */
  offset: {
    type: Array,
    default: () => [0, 0]
  },
  /** 是否全屏 */
  fullScreen: {
    type: Boolean,
    default: false
  },
  /** 防篡改 */
  antiTamper: {
    type: Boolean,
    default: true
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
};

// public/codesandbox-runtime/hooks/use-namespace/index.js
import { inject, ref, unref } from "vue";
var defaultNamespace = "yh";
var statePrefix = "is-";
var namespaceContextKey = Symbol("namespaceContextKey");
var useGlobalNamespace = () => {
  return inject(namespaceContextKey, ref(defaultNamespace));
};
var useNamespace = (block) => {
  const namespace = useGlobalNamespace();
  const b = (blockSuffix = "") => {
    const ns = unref(namespace);
    return blockSuffix ? `${ns}-${block}-${blockSuffix}` : `${ns}-${block}`;
  };
  const e = (element) => {
    return element ? `${b()}__${element}` : "";
  };
  const m = (modifier) => {
    return modifier ? `${b()}--${modifier}` : "";
  };
  const bem = (blockSuffix, element, modifier) => {
    let cls = b(blockSuffix);
    if (element) cls += `__${element}`;
    if (modifier) cls += `--${modifier}`;
    return cls;
  };
  const em = (element, modifier) => {
    return element && modifier ? `${b()}__${element}--${modifier}` : "";
  };
  function is(state, value) {
    if (arguments.length === 1) {
      return `${statePrefix}${state}`;
    }
    return value ? `${statePrefix}${state}` : "";
  }
  const cssVar = (name) => {
    return `--${unref(namespace)}-${block}-${name}`;
  };
  const cssVarObj = (vars) => {
    const obj = {};
    Object.entries(vars).forEach(([key, value]) => {
      obj[cssVar(key)] = value;
    });
    return obj;
  };
  const cssVarBlock = (name) => {
    return `--${unref(namespace)}-${name}`;
  };
  const cssVarBlockObj = (vars) => {
    const obj = {};
    Object.entries(vars).forEach(([key, value]) => {
      obj[cssVarBlock(key)] = value;
    });
    return obj;
  };
  return {
    namespace,
    b,
    e,
    m,
    bem,
    em,
    is,
    cssVar,
    cssVarObj,
    cssVarBlock,
    cssVarBlockObj
  };
};

// public/codesandbox-runtime/theme/component-theme.js
import { inject as inject2, provide, computed, unref as unref2 } from "vue";
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
var COMPONENT_THEME_KEY = Symbol("component-theme");
function useComponentTheme(componentName, localOverrides) {
  const globalThemes = inject2(COMPONENT_THEME_KEY, {});
  const mergedVars = computed(() => {
    const globalVars = globalThemes[componentName] || {};
    const local = unref2(localOverrides) || {};
    return __spreadValues(__spreadValues({}, globalVars), local);
  });
  const themeStyle = computed(() => {
    const vars = mergedVars.value;
    const style = {};
    Object.entries(vars).forEach(([key, value]) => {
      if (value !== void 0) {
        const cssVarName = `--yh-${componentName}-${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
        style[cssVarName] = value;
      }
    });
    return style;
  });
  const hasCustomTheme = computed(() => {
    return Object.keys(mergedVars.value).length > 0;
  });
  return {
    themeVars: mergedVars,
    themeStyle,
    hasCustomTheme
  };
}

// public/codesandbox-runtime/components/watermark/src/watermark.js
var __defProp2 = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols2 = Object.getOwnPropertySymbols;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __propIsEnum2 = Object.prototype.propertyIsEnumerable;
var __defNormalProp2 = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues2 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp2.call(b, prop))
      __defNormalProp2(a, prop, b[prop]);
  if (__getOwnPropSymbols2)
    for (var prop of __getOwnPropSymbols2(b)) {
      if (__propIsEnum2.call(b, prop))
        __defNormalProp2(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock(), _createElementBlock(
    "div",
    {
      ref: "containerRef",
      class: _normalizeClass([$setup.ns.b(), { [$setup.ns.m("fullscreen")]: _ctx.fullScreen }]),
      style: _normalizeStyle($setup.containerStyle)
    },
    [
      _renderSlot(_ctx.$slots, "default")
    ],
    6
    /* CLASS, STYLE */
  );
}
var __sfc__ = /* @__PURE__ */ Object.assign({
  name: "YhWatermark"
}, {
  __name: "watermark",
  props: watermarkProps,
  setup(__props, { expose: __expose }) {
    const props = __props;
    const ns = useNamespace("watermark");
    const { themeStyle } = useComponentTheme("watermark", computed2(() => props.themeOverrides));
    const containerRef = ref2(null);
    let watermarkRef = null;
    const watermarkUrl = ref2("");
    const containerStyle = computed2(() => {
      if (props.fullScreen) return {};
      return __spreadProps(__spreadValues2({}, themeStyle.value), {
        position: "relative",
        overflow: "hidden"
      });
    });
    const watermarkInnerStyle = computed2(() => {
      const isGlobalRotated = props.globalRotate !== 0;
      const size = isGlobalRotated ? "150%" : "100%";
      const offset = isGlobalRotated ? "-25%" : "0";
      return {
        position: props.fullScreen ? "fixed" : "absolute",
        top: offset,
        left: offset,
        width: size,
        height: size,
        zIndex: props.zIndex,
        pointerEvents: "none",
        backgroundRepeat: "repeat",
        backgroundImage: `url(${watermarkUrl.value})`,
        backgroundSize: `${props.gap[0] + props.width}px ${props.gap[1] + props.height}px`,
        visibility: "visible",
        opacity: 1,
        display: "block",
        transform: `rotate(${props.globalRotate}deg)`,
        transformOrigin: "center center"
      };
    });
    const renderWatermark = () => {
      const canvas = document.createElement("canvas");
      const ratio = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
      const canvasWidth = props.width + props.gap[0];
      const canvasHeight = props.height + props.gap[1];
      canvas.width = canvasWidth * ratio;
      canvas.height = canvasHeight * ratio;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.scale(ratio, ratio);
      ctx.translate(canvasWidth / 2, canvasHeight / 2);
      ctx.rotate(props.rotate * Math.PI / 180);
      if (props.image) {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.referrerPolicy = "no-referrer";
        img.src = props.image;
        img.onload = () => {
          ctx.drawImage(img, -props.width / 2, -props.height / 2, props.width, props.height);
          watermarkUrl.value = canvas.toDataURL();
          createOrUpdateWatermark();
        };
      } else {
        const { color, fontSize, fontWeight, fontFamily, fontStyle, textAlign, lineHeight } = props.font;
        ctx.fillStyle = color || "rgba(0,0,0,0.15)";
        ctx.font = `${fontStyle} ${fontWeight} ${typeof fontSize === "number" ? fontSize + "px" : fontSize} ${fontFamily}`;
        ctx.textAlign = textAlign || "center";
        ctx.textBaseline = "middle";
        const contents = Array.isArray(props.content) ? props.content : typeof props.content === "string" ? props.content.split("\n") : [props.content];
        const lH = lineHeight || 22;
        contents.forEach((text, index) => {
          const yOffset = (index - (contents.length - 1) / 2) * lH;
          ctx.fillText(text, 0, yOffset);
        });
        watermarkUrl.value = canvas.toDataURL();
        createOrUpdateWatermark();
      }
    };
    const createOrUpdateWatermark = () => {
      if (!containerRef.value) return;
      if (watermarkRef && watermarkRef.parentNode) {
        watermarkRef.parentNode.removeChild(watermarkRef);
      }
      const div = document.createElement("div");
      const style = watermarkInnerStyle.value;
      Object.assign(div.style, style);
      if (style.zIndex !== void 0) {
        div.style.zIndex = style.zIndex.toString();
      }
      div.className = `yh-wm-${Math.random().toString(36).slice(2, 9)}`;
      watermarkRef = div;
      containerRef.value.appendChild(div);
    };
    let observer = null;
    let checkTimer = null;
    const initGuard = () => {
      if (!props.antiTamper || !containerRef.value) return;
      if (observer) observer.disconnect();
      observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (mutation.type === "childList") {
            const removed = Array.from(mutation.removedNodes);
            if (removed.includes(watermarkRef)) {
              createOrUpdateWatermark();
            }
          } else if (mutation.type === "attributes" && mutation.target === watermarkRef) {
            createOrUpdateWatermark();
          }
        }
      });
      observer.observe(containerRef.value, {
        attributes: true,
        childList: true,
        subtree: true,
        attributeFilter: ["style", "class", "hidden"]
      });
      if (checkTimer) clearInterval(checkTimer);
      checkTimer = setInterval(() => {
        if (!watermarkRef || !watermarkRef.parentNode || watermarkRef.style.display === "none") {
          createOrUpdateWatermark();
        }
      }, 3e3);
    };
    watch(() => [props.content, props.image, props.width, props.height, props.gap, props.rotate, props.globalRotate, props.zIndex, props.fullScreen, props.font], () => {
      renderWatermark();
    }, { deep: true });
    onMounted(() => {
      renderWatermark();
      nextTick(() => {
        initGuard();
      });
    });
    onBeforeUnmount(() => {
      if (observer) observer.disconnect();
      if (checkTimer) clearInterval(checkTimer);
      if (watermarkRef && watermarkRef.parentNode) {
        watermarkRef.parentNode.removeChild(watermarkRef);
      }
    });
    __expose({
      renderWatermark
    });
    const __returned__ = { props, ns, themeStyle, containerRef, get watermarkRef() {
      return watermarkRef;
    }, set watermarkRef(v) {
      watermarkRef = v;
    }, watermarkUrl, containerStyle, watermarkInnerStyle, renderWatermark, createOrUpdateWatermark, get observer() {
      return observer;
    }, set observer(v) {
      observer = v;
    }, get checkTimer() {
      return checkTimer;
    }, set checkTimer(v) {
      checkTimer = v;
    }, initGuard, ref: ref2, computed: computed2, onMounted, onBeforeUnmount, watch, nextTick, get watermarkProps() {
      return watermarkProps;
    }, get useNamespace() {
      return useNamespace;
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
