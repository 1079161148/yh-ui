// public/codesandbox-runtime/components/menu/src/menu.js
import { renderSlot as _renderSlot6, renderList as _renderList2, Fragment as _Fragment5, openBlock as _openBlock7, createElementBlock as _createElementBlock7, createBlock as _createBlock6, normalizeClass as _normalizeClass5, normalizeStyle as _normalizeStyle4 } from "vue";
import { ref as ref15, computed as computed15, provide as provide3, toRef, watch as watch5 } from "vue";

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

// public/codesandbox-runtime/components/menu/src/menu-meta.js
var menuProps = {
  /** 菜单模式 */
  mode: {
    type: String,
    default: "vertical"
  },
  /** 当前激活菜单的 index */
  defaultActive: {
    type: String,
    default: ""
  },
  /** 当前打开的 sub-menu 的 index 数组 */
  defaultOpeneds: {
    type: Array,
    default: () => []
  },
  /** 是否只保持一个子菜单展开 */
  uniqueOpened: {
    type: Boolean,
    default: false
  },
  /** 子菜单打开触发方式 */
  menuTrigger: {
    type: String,
    default: "hover"
  },
  /** 是否开启折叠模式（仅 vertical 模式） */
  collapse: {
    type: Boolean,
    default: false
  },
  /** 折叠动画是否开启 */
  collapseTransition: {
    type: Boolean,
    default: true
  },
  /** 是否启用 vue-router 模式 */
  router: {
    type: Boolean,
    default: false
  },
  /** 背景色 */
  backgroundColor: {
    type: String,
    default: ""
  },
  /** 文字颜色 */
  textColor: {
    type: String,
    default: ""
  },
  /** 激活项文字颜色 */
  activeTextColor: {
    type: String,
    default: ""
  },
  /** 是否开启省略模式 (水平模式下) */
  ellipsis: {
    type: Boolean,
    default: true
  },
  /** 子菜单弹出层层级 */
  popperZIndex: {
    type: Number,
    default: 2e3
  },
  /** 是否将弹出菜单挂载至 body */
  teleported: {
    type: Boolean,
    default: true
  },
  /** 菜单项间距 */
  gap: {
    type: Number,
    default: 4
  },
  /** 自定义省略图标 */
  ellipsisIcon: {
    type: [String, Object],
    default: ""
  },
  /** 弹出层的偏移量 (对所有子菜单有效) */
  popperOffset: {
    type: Number,
    default: 6
  },
  /** Tooltip 主题，当垂直折叠或水平模式时生效 */
  popperEffect: {
    type: String,
    default: "light"
  },
  /** 单击外部时是否折叠菜单 */
  closeOnClickOutside: {
    type: Boolean,
    default: true
  },
  /** 所有弹出菜单的自定义类名 */
  popperClass: {
    type: String,
    default: ""
  },
  /** 所有弹出菜单的自定义样式 */
  popperStyle: {
    type: [Object, String, Array],
    default: ""
  },
  /** 菜单出现前的延迟 */
  showTimeout: {
    type: Number,
    default: 300
  },
  /** 菜单消失前的延迟 */
  hideTimeout: {
    type: Number,
    default: 300
  },
  /** 当菜单处于非活动状态时，子菜单是否将被销毁 */
  persistent: {
    type: Boolean,
    default: true
  },
  /** 菜单未折叠时图标的大小 */
  iconSize: {
    type: Number,
    default: 20
  },
  /** 菜单每级的缩进 */
  indent: {
    type: Number,
    default: 32
  },
  /** 菜单第一级的缩进，如果没有设定，使用 indent 代替 */
  rootIndent: {
    type: Number,
    default: void 0
  },
  /** 是否展开全部菜单 */
  expandAll: {
    type: Boolean,
    default: false
  },
  /** 批量处理菜单额外部分渲染 */
  renderExtra: {
    type: Function,
    default: void 0
  },
  /** 批量处理菜单图标渲染 */
  renderIcon: {
    type: Function,
    default: void 0
  },
  /** 批量处理菜单标签渲染 */
  renderLabel: {
    type: Function,
    default: void 0
  },
  /** 是否收起溢出的菜单，仅对 mode='horizontal' 的菜单生效 */
  responsive: {
    type: Boolean,
    default: false
  },
  /** 菜单当前的选中值 */
  value: {
    type: [String, null],
    default: void 0
  },
  /** 菜单配置项，支持从数据驱动生成菜单 */
  options: {
    type: Array,
    default: () => []
  },
  /** 是否使用反转样式 */
  inverted: {
    type: Boolean,
    default: false
  },
  /** key 的字段名 */
  keyField: {
    type: String,
    default: "key"
  },
  /** label 的字段名 */
  labelField: {
    type: String,
    default: "label"
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
};
var menuEmits = {
  /** v-model:value */
  "update:value": (_value) => true,
  /** 菜单激活回调 */
  select: (_index, _indexPath, _item, _routeResult) => true,
  /** 子菜单展开回调 */
  open: (_index, _indexPath) => true,
  /** 子菜单收起回调 */
  close: (_index, _indexPath) => true
};
var menuItemProps = {
  /** 唯一标识 */
  index: {
    type: String,
    required: true
  },
  /** vue-router 路由对象 */
  route: {
    type: [String, Object],
    default: ""
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false
  },
  /** 显示文本 */
  label: {
    type: String,
    default: ""
  }
};
var menuItemGroupProps = {
  /** 分组标题 */
  title: {
    type: String,
    default: ""
  }
};
var subMenuProps = {
  /** 唯一标识 */
  index: {
    type: String,
    required: true
  },
  /** 弹出菜单的自定义类名 */
  popperClass: {
    type: String,
    default: void 0
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false
  },
  /** 展开收起的延时 */
  showTimeout: {
    type: Number,
    default: void 0
  },
  /** 收起的延时 */
  hideTimeout: {
    type: Number,
    default: void 0
  },
  /** 弹出层偏移量 */
  popperOffset: {
    type: Number,
    default: void 0
  },
  /** 显示文本 */
  label: {
    type: String,
    default: ""
  }
};
var MENU_INJECTION_KEY = Symbol("menu");
var SUB_MENU_INJECTION_KEY = Symbol("subMenu");

// public/codesandbox-runtime/components/menu/src/menu-recursive-item.js
import { createCommentVNode as _createCommentVNode5, renderList as _renderList, Fragment as _Fragment4, openBlock as _openBlock6, createElementBlock as _createElementBlock6, resolveComponent as _resolveComponent, createBlock as _createBlock5, withCtx as _withCtx4, createVNode as _createVNode4, toDisplayString as _toDisplayString5, createElementVNode as _createElementVNode5, createSlots as _createSlots } from "vue";
import { inject as inject9, unref as unref11 } from "vue";

// public/codesandbox-runtime/utils/vue.js
var withInstall = (main, extra) => {
  ;
  main.install = (app) => {
    for (const comp of [main, ...Object.values(extra != null ? extra : {})]) {
      const name = comp.name || comp.__name;
      if (name) {
        app.component(name, comp);
      }
    }
  };
  if (extra) {
    for (const [key, comp] of Object.entries(extra)) {
      ;
      main[key] = comp;
    }
  }
  return main;
};

// public/codesandbox-runtime/components/icon/src/icon.js
import { createCommentVNode as _createCommentVNode, resolveDynamicComponent as _resolveDynamicComponent, openBlock as _openBlock, createBlock as _createBlock, createElementBlock as _createElementBlock, Fragment as _Fragment, renderSlot as _renderSlot, mergeProps as _mergeProps } from "vue";
import { computed as computed2, useSlots } from "vue";

// public/codesandbox-runtime/components/icon/src/icon-meta.js
var iconProps = {
  /**
   * 图标名称（使用内置图标时）
   */
  name: {
    type: String,
    default: ""
  },
  /**
   * SVG 字符串（直接渲染 SVG）
   */
  svg: {
    type: String,
    default: ""
  },
  /**
   * 图标组件（传入 Vue 组件）
   */
  icon: {
    type: Object,
    default: void 0
  },
  /**
   * 图标尺寸
   * - number: 像素值
   * - string: CSS 尺寸值（如 '1em', '24px'）
   */
  size: {
    type: [Number, String],
    default: void 0
  },
  /**
   * 图标颜色
   * - 默认继承父元素的 color
   */
  color: {
    type: String,
    default: void 0
  },
  /**
   * 是否启用旋转动画
   */
  spin: {
    type: Boolean,
    default: false
  },
  /**
   * 旋转角度（度数）
   */
  rotate: {
    type: Number,
    default: 0
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
};
var iconRegistry = /* @__PURE__ */ new Map();
function registerIcon(icon) {
  iconRegistry.set(icon.name, icon);
}
function registerIcons(icons) {
  icons.forEach((icon) => registerIcon(icon));
}
function getIcon(name) {
  return iconRegistry.get(name);
}

// public/codesandbox-runtime/components/icon/src/icon.js
var __defProp2 = Object.defineProperty;
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
var _hoisted_1 = ["viewBox", "innerHTML"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock(), _createElementBlock(
    "i",
    _mergeProps({
      class: $setup.iconClass,
      style: $setup.iconStyle
    }, _ctx.$attrs),
    [
      _createCommentVNode(" \u4F7F\u7528\u4F20\u5165\u7684\u56FE\u6807\u7EC4\u4EF6 "),
      $setup.useIconComponent ? (_openBlock(), _createBlock(_resolveDynamicComponent(_ctx.icon), {
        key: 0,
        class: "yh-icon__inner"
      })) : $setup.svgContent && !$setup.hasSlot ? (_openBlock(), _createElementBlock(
        _Fragment,
        { key: 1 },
        [
          _createCommentVNode(" \u4F7F\u7528 SVG \u5B57\u7B26\u4E32\u6E32\u67D3 "),
          _createCommentVNode(" eslint-disable vue/no-v-html "),
          (_openBlock(), _createElementBlock("svg", {
            class: "yh-icon__svg",
            viewBox: $setup.viewBox,
            xmlns: "http://www.w3.org/2000/svg",
            "aria-hidden": "true",
            innerHTML: $setup.svgContent
          }, null, 8, _hoisted_1))
        ],
        2112
        /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
      )) : $setup.hasSlot ? (_openBlock(), _createElementBlock(
        _Fragment,
        { key: 2 },
        [
          _createCommentVNode(" eslint-enable vue/no-v-html "),
          _createCommentVNode(" \u4F7F\u7528\u63D2\u69FD\u81EA\u5B9A\u4E49\u5185\u5BB9 "),
          _renderSlot(_ctx.$slots, "default")
        ],
        64
        /* STABLE_FRAGMENT */
      )) : _createCommentVNode("v-if", true)
    ],
    16
    /* FULL_PROPS */
  );
}
var __sfc__ = /* @__PURE__ */ Object.assign({
  name: "YhIcon",
  inheritAttrs: false
}, {
  __name: "icon",
  props: iconProps,
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const slots = useSlots();
    const ns = useNamespace("icon");
    const { themeStyle } = useComponentTheme(
      "icon",
      computed2(() => props.themeOverrides)
    );
    const iconStyle = computed2(() => {
      const style = __spreadValues2({}, themeStyle.value);
      if (props.size) {
        const size = typeof props.size === "number" ? `${props.size}px` : props.size;
        style.fontSize = size;
        style.width = size;
        style.height = size;
      }
      if (props.color) {
        style.color = props.color;
      }
      if (props.rotate) {
        style.transform = `rotate(${props.rotate}deg)`;
      }
      return style;
    });
    const iconClass = computed2(() => [
      ns.b(),
      {
        [ns.m("spin")]: props.spin
      }
    ]);
    const svgContent = computed2(() => {
      if (props.svg) {
        return props.svg;
      }
      if (props.name) {
        const icon = getIcon(props.name);
        if (icon) {
          return icon.svg;
        }
      }
      if (props.icon && "__svg" in props.icon) {
        return props.icon.__svg;
      }
      return "";
    });
    const viewBox = computed2(() => {
      if (props.name) {
        const icon = getIcon(props.name);
        if (icon == null ? void 0 : icon.viewBox) {
          return icon.viewBox;
        }
      }
      if (props.icon && "__viewBox" in props.icon) {
        return props.icon.__viewBox;
      }
      return "0 0 24 24";
    });
    const hasSlot = computed2(() => !!slots.default);
    const useIconComponent = computed2(() => {
      return props.icon && !("__svg" in props.icon);
    });
    const __returned__ = { props, slots, ns, themeStyle, iconStyle, iconClass, svgContent, viewBox, hasSlot, useIconComponent, computed: computed2, useSlots, get iconProps() {
      return iconProps;
    }, get getIcon() {
      return getIcon;
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

// public/codesandbox-runtime/components/icon/src/icons/index.js
var IconClose = {
  name: "close",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>'
};
var IconCheck = {
  name: "check",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>'
};
var IconArrowUp = {
  name: "arrow-up",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>'
};
var IconArrowDown = {
  name: "arrow-down",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/>'
};
var IconArrowLeft = {
  name: "arrow-left",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>'
};
var IconArrowRight = {
  name: "arrow-right",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>'
};
var IconLoading = {
  name: "loading",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M12 4V2A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8z"/>'
};
var IconSearch = {
  name: "search",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>'
};
var IconPlus = {
  name: "plus",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>'
};
var IconMinus = {
  name: "minus",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M19 13H5v-2h14v2z"/>'
};
var IconInfo = {
  name: "info",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>'
};
var IconWarning = {
  name: "warning",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>'
};
var IconError = {
  name: "error",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>'
};
var IconSuccess = {
  name: "success",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>'
};
var IconEye = {
  name: "eye",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>'
};
var IconEyeOff = {
  name: "eye-off",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46A11.804 11.804 0 0 0 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>'
};
var IconCalendar = {
  name: "calendar",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/>'
};
var IconTime = {
  name: "time",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>'
};
var IconUser = {
  name: "user",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>'
};
var IconSettings = {
  name: "settings",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>'
};
var IconSetting = {
  name: "setting",
  viewBox: "0 0 24 24",
  svg: IconSettings.svg
};
var IconHome = {
  name: "home",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>'
};
var IconImage = {
  name: "image",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>'
};
var IconDocument = {
  name: "document",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>'
};
var IconRefresh = {
  name: "refresh",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>'
};
var IconZoomIn = {
  name: "zoom-in",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" fill-rule="evenodd" d="M17.414 16l4.293 4.293-1.414 1.414L16 17.414A8.96 8.96 0 0111 19c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 01-1.586 5zM11 17c3.86 0 7-3.14 7-7s-3.14-7-7-7-7 3.14-7 7 3.14 7 7 7zm-1-8V7h2v2h2v2h-2v2h-2v-2H8v-2h2z" clip-rule="evenodd" />'
};
var IconZoomOut = {
  name: "zoom-out",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" fill-rule="evenodd" d="M17.414 16l4.293 4.293-1.414 1.414L16 17.414A8.96 8.96 0 0111 19c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 01-1.586 5zM11 17c3.86 0 7-3.14 7-7s-3.14-7-7-7-7 3.14-7 7 3.14 7 7 7zm-3-8h6v2H8v-2z" clip-rule="evenodd" />'
};
var IconDelete = {
  name: "delete",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/>'
};
var IconUpload = {
  name: "upload",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96M14 13v4h-4v-4H7l5-5 5 5h-3z"/>'
};
var IconDownload = {
  name: "download",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>'
};
var IconFilePdf = {
  name: "file-pdf",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3.5h-1.5v1.5h-1V7h2.5v1zm-6.5 3.5h1v-3h-1v3zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6z"/>'
};
var IconFileExcel = {
  name: "file-excel",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M21.17 3.25Q21.5 3.25 21.76 3.5 22 3.74 22 4.08V19.92Q22 20.26 21.76 20.5 21.5 20.75 21.17 20.75H7.83Q7.5 20.75 7.24 20.5 7 20.26 7 19.92V17H2.83Q2.5 17 2.24 16.76 2 16.5 2 16.17V7.83Q2 7.5 2.24 7.24 2.5 7 2.83 7H7V4.08Q7 3.74 7.24 3.5 7.5 3.25 7.83 3.25H21.17M7 13.06L8.18 15.28L10.14 15.28L8.59 12.19L10.11 9.22L8.12 9.22L7 11.24L5.87 9.22L3.89 9.22L5.41 12.19L3.86 15.28L5.82 15.28L7 13.06M20.5 19.25V4.75H8.5V7H9.17Q9.5 7 9.76 7.24 10 7.5 10 7.83V16.17Q10 16.5 9.76 16.76 9.5 17 9.17 17H8.5V19.25H20.5Z"/>'
};
var IconFileWord = {
  name: "file-word",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M21.17 3.25Q21.5 3.25 21.76 3.5 22 3.74 22 4.08V19.92Q22 20.26 21.76 20.5 21.5 20.75 21.17 20.75H7.83Q7.5 20.75 7.24 20.5 7 20.26 7 19.92V17H2.83Q2.5 17 2.24 16.76 2 16.5 2 16.17V7.83Q2 7.5 2.24 7.24 2.5 7 2.83 7H7V4.08Q7 3.74 7.24 3.5 7.5 3.25 7.83 3.25H21.17M7 13.06L8.18 15.28L10.14 15.28L8.59 12.19L10.11 9.22L8.12 9.22L7 11.24L5.87 9.22L3.89 9.22L5.41 12.19L3.86 15.28L5.82 15.28L7 13.06M20.5 19.25V4.75H8.5V7H9.17Q9.5 7 9.76 7.24 10 7.5 10 7.83V16.17Q10 16.5 9.76 16.76 9.5 17 9.17 17H8.5V19.25H20.5Z"/>'
};
var IconFileVideo = {
  name: "file-video",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/>'
};
var IconFileAudio = {
  name: "file-audio",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M12 3V13.55C11.41 13.21 10.73 13 10 13C7.79 13 6 14.79 6 17S7.79 21 10 21 14 19.21 14 17V7H18V3H12Z"/>'
};
var IconFileTxt = {
  name: "file-txt",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>'
};
var IconAttachment = {
  name: "attachment",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M16.5 6V17.5C16.5 19.71 14.71 21.5 12.5 21.5C10.29 21.5 8.5 19.71 8.5 17.5V5C8.5 3.34 9.84 2 11.5 2C13.16 2 14.5 3.34 14.5 5V15.5C14.5 16.05 14.05 16.5 13.5 16.5C12.95 16.5 12.5 16.05 12.5 15.5V6H11V15.5C11 16.88 12.12 18 13.5 18C14.88 18 16 16.88 16 15.5V5C16 2.51 13.99 0.5 11.5 0.5C9.01 0.5 7 2.51 7 5V17.5C7 20.54 9.46 23 12.5 23C15.54 23 18 20.54 18 17.5V6H16.5Z"/>'
};
var IconEdit = {
  name: "edit",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>'
};
var IconCopy = {
  name: "copy",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>'
};
var IconStar = {
  name: "star",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>'
};
var IconFolder = {
  name: "folder",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>'
};
var IconFolderOpened = {
  name: "folder-opened",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"/>'
};
var IconRobot = {
  name: "robot",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M22,10h-2V7c0-1.66-1.34-3-3-3H7C5.34,4,4,5.34,4,7v3H2C1.45,10,1,10.45,1,11v4c0,0.55,0.45,1,1,1h2v3c0,1.66,1.34,3,3,3h10c1.66,0,3-1.34,3-3v-3h2c0.55,0,1-0.45,1-1v-4C23,10.45,22.55,10,22,10z M8,11c0.55,0,1,0.45,1,1c0,0.55-0.45,1-1,1S7,12.55,7,12C7,11.45,7.45,11,8,11z M16,11c0.55,0,1,0.45,1,1c0,0.55-0.45,1-1,1s-1-0.45-1-1C15,11.45,15.45,11,16,11z M16,18H8v-2h8V18z"/>'
};
var IconCloseCircle = {
  name: "close-circle",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>'
};
var IconCheckCircle = {
  name: "check-circle",
  viewBox: "0 0 24 24",
  svg: IconSuccess.svg
};
var IconSend = {
  name: "send",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>'
};
var IconSendArrow = {
  name: "send-arrow",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M11 4.586V20h2V4.586l6.29 6.294 1.414-1.414L12 0.758 3.293 9.466l1.414 1.414z"/>'
};
var IconClean = {
  name: "clean",
  viewBox: "0 0 1024 1024",
  svg: '<path fill="currentColor" d="M899.1 869.6l-53-305.6H864c14.4 0 26-11.6 26-26V342c0-14.4-11.6-26-26-26H611.8l-4.8-27.4c-9.6-55.6-58.4-96.6-114.7-96.6s-105.1 41-114.7 96.6l-4.8 27.4H160c-14.4 0-26 11.6-26 26v196c0 14.4 11.6 26 26 26h17.9l-53 305.6c-.3 1.5-.4 3-.4 4.4 0 14.4 11.6 26 26 26h723c1.5 0 3-.1 4.4-.4 14.2-2.4 23.7-15.9 21.2-30.4zM492.2 263.3c3.2-18.4 19.2-31.3 37.8-31.3s34.6 12.9 37.8 31.3l2.8 52.7h-81.2l2.8-52.7zm321 563.3H210.7l41.5-238h519.5l41.5 238zM206 518v-84h612v84H206z"></path>'
};
var IconPaperclip = {
  name: "paperclip",
  viewBox: "0 0 24 24",
  svg: IconAttachment.svg
};
var IconMicrophone = {
  name: "microphone",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z"/>'
};
var IconThumbUp = {
  name: "thumb-up",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/>'
};
var IconThumbDown = {
  name: "thumb-down",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.37-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"/>'
};
var IconSparkles = {
  name: "sparkles",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M11,1L12.5,4L15.5,5.5L12.5,7L11,10L9.5,7L6.5,5.5L9.5,4L11,1M5,10L6.5,13L9.5,14.5L6.5,16L5,19L3.5,16L0.5,14.5L3.5,13L5,10M17.5,12L19,15L22,16.5L19,18L17.5,21L16,18L13,16.5L16,15L17.5,12Z"/>'
};
var IconShare = {
  name: "share",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>'
};
var IconChat = {
  name: "chat",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>'
};
var IconVideoPlay = {
  name: "video-play",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M8 5v14l11-7L8 5z"/>'
};
var IconGlobe = {
  name: "globe",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>'
};
var IconTable = {
  name: "table",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M10 10.02h5V21h-5V10.02zM17 21h3c1.1 0 2-.9 2-2v-9h-5v11zm3-18H5c-1.1 0-2 .9-2 2v3h19V5c0-1.1-.9-2-2-2zM3 19c0 1.1.9 2 2 2h3V10H3v9zm12-11H9V3h6v5zm2 0h5V3h-5v5zM7 3H4c-1.1 0-2 .9-2 2v3h5V3z"/>'
};
var IconChartBar = {
  name: "chart-bar",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M5 9.2h3V19H5V9.2zM10.6 5h2.8v14h-2.8V5zm5.6 8h2.8v6h-2.8v-6z"/>'
};
var IconLaunch = {
  name: "launch",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>'
};
var IconCode = {
  name: "code",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>'
};
var IconStarFilled = {
  name: "star-filled",
  viewBox: "0 0 24 24",
  svg: IconStar.svg
};
var IconCheckmarkCircle = {
  name: "checkmark-circle",
  viewBox: "0 0 24 24",
  svg: IconCheckCircle.svg
};
var IconPresentation = {
  name: "presentation",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM21 17H3V5h18v12zM10 7l6 4-6 4V7z"/>'
};
var IconDocumentText = {
  name: "document-text",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>'
};
var IconVideoPause = {
  name: "video-pause",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>'
};
var IconBook = {
  name: "book",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12zM10 9h8v2h-8V9zm0 3h4v2h-4v-2zm0-6h8v2h-8V6z"/>'
};
var IconLink = {
  name: "link",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>'
};
var IconBold = {
  name: "bold",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"/>'
};
var IconItalic = {
  name: "italic",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4h-8z"/>'
};
var IconHeading = {
  name: "heading",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M5 4v3h5.5v12h3V7H19V4z"/>'
};
var IconFormat = {
  name: "format",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M3 10h11v2H3v-2zm0-4h11v2H3V6zm0 8h7v2H3v-2zm13-1v8l-4-4 4-4z"/>'
};
var builtInIcons = [
  IconClose,
  IconCheck,
  IconArrowUp,
  IconArrowDown,
  IconArrowLeft,
  IconArrowRight,
  IconLoading,
  IconSearch,
  IconPlus,
  IconMinus,
  IconInfo,
  IconWarning,
  IconError,
  IconSuccess,
  IconEye,
  IconEyeOff,
  IconCalendar,
  IconTime,
  IconUser,
  IconSettings,
  IconSetting,
  IconHome,
  IconImage,
  IconDocument,
  IconRefresh,
  IconDelete,
  IconUpload,
  IconDownload,
  IconFilePdf,
  IconFileExcel,
  IconFileWord,
  IconFileVideo,
  IconFileAudio,
  IconFileTxt,
  IconAttachment,
  IconEdit,
  IconCopy,
  IconStar,
  IconFolder,
  IconFolderOpened,
  IconRobot,
  IconCloseCircle,
  IconCheckCircle,
  IconSend,
  IconSendArrow,
  IconClean,
  IconPaperclip,
  IconMicrophone,
  IconThumbUp,
  IconThumbDown,
  IconSparkles,
  IconShare,
  IconChat,
  IconVideoPlay,
  IconVideoPause,
  IconGlobe,
  IconTable,
  IconChartBar,
  IconLaunch,
  IconCode,
  IconZoomIn,
  IconZoomOut,
  IconStarFilled,
  IconCheckmarkCircle,
  IconPresentation,
  IconDocumentText,
  IconBook,
  // 命令菜单相关图标
  IconLink,
  IconBold,
  IconItalic,
  IconHeading,
  IconFormat
];
registerIcons(builtInIcons);

// public/codesandbox-runtime/components/icon/index.js
var YhIcon = withInstall(stdin_default);

// public/codesandbox-runtime/components/menu/src/menu-item.js
import { toDisplayString as _toDisplayString2, createTextVNode as _createTextVNode, Fragment as _Fragment2, openBlock as _openBlock3, createElementBlock as _createElementBlock3, createCommentVNode as _createCommentVNode3, resolveDynamicComponent as _resolveDynamicComponent2, createBlock as _createBlock3, renderSlot as _renderSlot3, createElementVNode as _createElementVNode2, normalizeClass as _normalizeClass2, withCtx as _withCtx2, createVNode as _createVNode2, withKeys as _withKeys, normalizeStyle as _normalizeStyle2 } from "vue";
import { inject as inject7, computed as computed13, ref as ref13, onMounted as onMounted4 } from "vue";

// public/codesandbox-runtime/components/tooltip/src/tooltip.js
import { renderSlot as _renderSlot2, createCommentVNode as _createCommentVNode2, openBlock as _openBlock2, createElementBlock as _createElementBlock2, toDisplayString as _toDisplayString, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, createElementVNode as _createElementVNode, vShow as _vShow, withDirectives as _withDirectives, Transition as _Transition, withCtx as _withCtx, createVNode as _createVNode, Teleport as _Teleport, createBlock as _createBlock2 } from "vue";
import { ref as ref12, computed as computed12, watch as watch4, onMounted as onMounted3, onUnmounted as onUnmounted4, nextTick } from "vue";
import { computePosition, offset, flip, shift, arrow, autoUpdate } from "@floating-ui/dom";

// public/codesandbox-runtime/hooks/use-z-index/index.js
import { computed as computed3, inject as inject3, unref as unref3 } from "vue";
var zIndexContextKey = Symbol("zIndexContextKey");
var zIndexCounterKey = Symbol("zIndexCounterKey");

// public/codesandbox-runtime/hooks/use-sku/index.js
import { ref as ref2, computed as computed4 } from "vue";

// public/codesandbox-runtime/hooks/use-countdown/index.js
import { ref as ref3, computed as computed5, onUnmounted } from "vue";

// public/codesandbox-runtime/hooks/use-locale/index.js
import { computed as computed7, unref as unref5, watch } from "vue";

// public/codesandbox-runtime/hooks/use-config/index.js
import { inject as inject4, computed as computed6, unref as unref4 } from "vue";
var configProviderContextKey = Symbol(
  "configProviderContextKey"
);

// public/codesandbox-runtime/hooks/dayjs.js
import * as dayjsModule from "dayjs";
var _a;
var dayjs = "default" in dayjsModule ? (_a = dayjsModule.default) != null ? _a : dayjsModule : dayjsModule;

// public/codesandbox-runtime/hooks/use-locale/dayjs-locale.js
import "dayjs/locale/en";

// public/codesandbox-runtime/hooks/use-id/index.js
import { computed as computed8, inject as inject5, unref as unref6, useId as useVueId } from "vue";
var idInjectionKey = Symbol("idInjectionKey");
var useId = (idOverrides) => {
  const injectedId = inject5(idInjectionKey, void 0);
  const nativeId = useVueId();
  const id = computed8(() => {
    const override = unref6(idOverrides);
    if (override) return override;
    const injected = unref6(injectedId);
    if (injected) return injected;
    return nativeId;
  });
  return id;
};

// public/codesandbox-runtime/hooks/use-form-item/index.js
import { inject as inject6 } from "vue";
var FormContextKey = Symbol("FormContextKey");
var FormItemContextKey = Symbol("FormItemContextKey");

// public/codesandbox-runtime/hooks/use-virtual-scroll/index.js
import { ref as ref4, computed as computed9, unref as unref7 } from "vue";

// public/codesandbox-runtime/hooks/use-cache/index.js
import { shallowRef } from "vue";

// public/codesandbox-runtime/hooks/use-event-listener/index.js
import { onMounted, onBeforeUnmount, isRef, watch as watch2, unref as unref8 } from "vue";
function useEventListener(target, event, handler, options) {
  if (typeof window === "undefined") return;
  const getTarget = () => {
    if (typeof target === "function") {
      return target();
    }
    return unref8(target);
  };
  const add = () => {
    const el = getTarget();
    if (el) {
      el.addEventListener(event, handler, options);
    }
  };
  const remove = () => {
    const el = getTarget();
    if (el) {
      el.removeEventListener(event, handler, options);
    }
  };
  onMounted(add);
  onBeforeUnmount(remove);
  if (isRef(target)) {
    watch2(target, (newVal, oldVal) => {
      if (oldVal) {
        oldVal.removeEventListener(event, handler, options);
      }
      if (newVal) {
        newVal.addEventListener(event, handler, options);
      }
    });
  }
}

// public/codesandbox-runtime/hooks/use-scroll-lock/index.js
import { ref as ref5, watch as watch3, onUnmounted as onUnmounted2 } from "vue";

// public/codesandbox-runtime/hooks/use-click-outside/index.js
import { unref as unref9 } from "vue";

// public/codesandbox-runtime/hooks/use-ai/use-ai-chat.js
import { ref as ref7, computed as computed10 } from "vue";

// public/codesandbox-runtime/hooks/use-ai/use-ai-stream.js
import { ref as ref6 } from "vue";

// public/codesandbox-runtime/hooks/use-ai/use-ai-conversations.js
import { ref as ref8, computed as computed11 } from "vue";

// public/codesandbox-runtime/hooks/use-ai/use-ai-request.js
import { ref as ref9 } from "vue";

// public/codesandbox-runtime/hooks/use-ai/use-ai-voice.js
import { ref as ref10, onUnmounted as onUnmounted3, shallowRef as shallowRef2 } from "vue";

// public/codesandbox-runtime/hooks/use-ai/use-ai-persistence.js
import { ref as ref11, onMounted as onMounted2 } from "vue";

// public/codesandbox-runtime/components/tooltip/src/tooltip-meta.js
var tooltipProps = {
  /** 显示内容 */
  content: {
    type: String,
    default: ""
  },
  /** 出现位置 */
  placement: {
    type: String,
    default: "top"
  },
  /** 触发方式 */
  trigger: {
    type: [String, Array],
    default: "hover"
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false
  },
  /** 出现延迟 (ms) */
  showAfter: {
    type: Number,
    default: 0
  },
  /** 消失延迟 (ms) */
  hideAfter: {
    type: Number,
    default: 200
  },
  /** 偏移量 [skidding, distance] */
  offset: {
    type: Array,
    default: () => [0, 8]
  },
  /** 是否显示小三角 */
  showArrow: {
    type: Boolean,
    default: true
  },
  /** 是否允许鼠标进入提示框 */
  interactive: {
    type: Boolean,
    default: true
  },
  /** 手动控制显示隐藏 */
  visible: {
    type: Boolean,
    default: null
  },
  /** 提示框的主题：dark / light 或自定义名称 */
  effect: {
    type: String,
    default: "dark"
  },
  /** 是否跟随鼠标移动 (高级功能) */
  followCursor: {
    type: Boolean,
    default: false
  },
  /** 弹出层的自定义类名 */
  popperClass: {
    type: String,
    default: ""
  },
  /** 挂载节点 */
  teleported: {
    type: Boolean,
    default: true
  },
  /** z-index */
  zIndex: {
    type: Number,
    default: 2e3
  },
  /** 手动控制动画名称 */
  transition: {
    type: String,
    default: "yh-tooltip-fade"
  },
  /** 是否在隐藏时销毁 DOM 节点 */
  persistent: {
    type: Boolean,
    default: true
  },
  /** 是否作为 HTML 字符串渲染 content 属性 */
  rawContent: {
    type: Boolean,
    default: false
  },
  /** 弹出层宽度 */
  width: {
    type: [String, Number],
    default: "auto"
  },
  /** 弹出层最大高度 */
  maxHeight: {
    type: [String, Number],
    default: "none"
  },
  /** 内容是否可滚动 */
  scrollable: {
    type: Boolean,
    default: false
  },
  /** 弹出内容自定义类名 */
  contentClass: {
    type: String,
    default: ""
  },
  /** 弹出内容自定义样式 */
  contentStyle: {
    type: [Object, String, Array],
    default: () => ({})
  },
  /** 箭头自定义类名 */
  arrowClass: {
    type: String,
    default: ""
  },
  /** 箭头自定义样式 */
  arrowStyle: {
    type: [Object, String, Array],
    default: () => ({})
  },
  /** 弹出层自定义样式 */
  popperStyle: {
    type: [Object, String, Array],
    default: () => ({})
  },
  /** 箭头容器自定义类名 */
  arrowWrapperClass: {
    type: String,
    default: ""
  },
  /** 箭头容器自定义样式 */
  arrowWrapperStyle: {
    type: [Object, String, Array],
    default: () => ({})
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
};
var tooltipEmits = {
  "update:visible": (visible) => typeof visible === "boolean",
  show: () => true,
  hide: () => true
};

// public/codesandbox-runtime/components/tooltip/src/tooltip.js
var __defProp3 = Object.defineProperty;
var __getOwnPropSymbols3 = Object.getOwnPropertySymbols;
var __hasOwnProp3 = Object.prototype.hasOwnProperty;
var __propIsEnum3 = Object.prototype.propertyIsEnumerable;
var __defNormalProp3 = (obj, key, value) => key in obj ? __defProp3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues3 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp3.call(b, prop))
      __defNormalProp3(a, prop, b[prop]);
  if (__getOwnPropSymbols3)
    for (var prop of __getOwnPropSymbols3(b)) {
      if (__propIsEnum3.call(b, prop))
        __defNormalProp3(a, prop, b[prop]);
    }
  return a;
};
var _hoisted_12 = ["id", "data-placement"];
var _hoisted_2 = ["innerHTML"];
var _hoisted_3 = { key: 1 };
function render2(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock2(), _createElementBlock2(
    "div",
    {
      class: _normalizeClass($setup.ns.b()),
      ref: "triggerRef",
      onMouseenter: _cache[2] || (_cache[2] = ($event) => $setup.handleTrigger($event, "hover")),
      onMouseleave: _cache[3] || (_cache[3] = ($event) => $setup.triggers.has("hover") && $setup.toggleVisible(false)),
      onClick: _cache[4] || (_cache[4] = ($event) => $setup.handleTrigger($event, "click")),
      onContextmenu: _cache[5] || (_cache[5] = ($event) => $setup.handleTrigger($event, "contextmenu")),
      onFocusin: _cache[6] || (_cache[6] = ($event) => $setup.handleTrigger($event, "focus")),
      onFocusout: _cache[7] || (_cache[7] = ($event) => $setup.triggers.has("focus") && $setup.toggleVisible(false))
    },
    [
      _renderSlot2(_ctx.$slots, "default"),
      (_openBlock2(), _createBlock2(_Teleport, {
        to: "body",
        disabled: !_ctx.teleported
      }, [
        _createVNode(_Transition, { name: _ctx.transition }, {
          default: _withCtx(() => [
            $setup.shouldRender ? _withDirectives((_openBlock2(), _createElementBlock2("div", {
              key: 0,
              id: $setup.tooltipId,
              ref: "popperRef",
              class: _normalizeClass($setup.popperClasses),
              style: _normalizeStyle($setup.computedPopperStyle),
              "data-placement": $setup.actualPlacement,
              onMouseenter: _cache[0] || (_cache[0] = ($event) => _ctx.interactive && $setup.toggleVisible(true)),
              onMouseleave: _cache[1] || (_cache[1] = ($event) => _ctx.interactive && $setup.triggers.has("hover") && $setup.toggleVisible(false))
            }, [
              _createElementVNode(
                "div",
                {
                  class: _normalizeClass([$setup.ns.e("content"), $setup.props.contentClass]),
                  style: _normalizeStyle($setup.computedContentStyle)
                },
                [
                  _renderSlot2(_ctx.$slots, "content", {}, () => [
                    _createCommentVNode2(" eslint-disable-next-line vue/no-v-html "),
                    _ctx.rawContent ? (_openBlock2(), _createElementBlock2("span", {
                      key: 0,
                      innerHTML: _ctx.content
                    }, null, 8, _hoisted_2)) : (_openBlock2(), _createElementBlock2(
                      "span",
                      _hoisted_3,
                      _toDisplayString(_ctx.content),
                      1
                      /* TEXT */
                    ))
                  ])
                ],
                6
                /* CLASS, STYLE */
              ),
              _createCommentVNode2(" \u5C0F\u4E09\u89D2 - \u4F7F\u7528 Floating UI \u5B98\u65B9\u63A8\u8350\u7684 SVG \u8DEF\u5F84\u65B9\u6848 "),
              _ctx.showArrow ? (_openBlock2(), _createElementBlock2(
                "div",
                {
                  key: 0,
                  ref: "arrowRef",
                  class: _normalizeClass($setup.ns.e("arrow-wrapper")),
                  style: _normalizeStyle($setup.arrowStyle)
                },
                [
                  (_openBlock2(), _createElementBlock2(
                    "svg",
                    {
                      class: _normalizeClass($setup.ns.e("arrow")),
                      width: "12",
                      height: "12",
                      viewBox: "0 0 12 12",
                      xmlns: "http://www.w3.org/2000/svg"
                    },
                    [..._cache[8] || (_cache[8] = [
                      _createElementVNode(
                        "path",
                        { d: "M0,0 L6,6 L12,0" },
                        null,
                        -1
                        /* CACHED */
                      )
                    ])],
                    2
                    /* CLASS */
                  ))
                ],
                6
                /* CLASS, STYLE */
              )) : _createCommentVNode2("v-if", true)
            ], 46, _hoisted_12)), [
              [_vShow, $setup.showPopper]
            ]) : _createCommentVNode2("v-if", true)
          ]),
          _: 3
          /* FORWARDED */
        }, 8, ["name"])
      ], 8, ["disabled"]))
    ],
    34
    /* CLASS, NEED_HYDRATION */
  );
}
var __sfc__2 = /* @__PURE__ */ Object.assign({
  name: "YhTooltip"
}, {
  __name: "tooltip",
  props: tooltipProps,
  emits: tooltipEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("tooltip");
    const tooltipId = useId();
    const { themeStyle } = useComponentTheme(
      "tooltip",
      computed12(() => props.themeOverrides)
    );
    const triggerRef = ref12(null);
    const popperRef = ref12(null);
    const arrowRef = ref12(null);
    const visible = ref12(false);
    const popperStyle = ref12({});
    const arrowStyle = ref12({});
    const computedPopperStyle = computed12(() => {
      const styles = __spreadValues3(__spreadValues3({}, themeStyle.value), popperStyle.value);
      if (typeof props.popperStyle === "object") {
        Object.assign(styles, props.popperStyle);
      }
      return styles;
    });
    const computedContentStyle = computed12(() => {
      const styles = {
        width: typeof props.width === "number" ? `${props.width}px` : props.width,
        maxHeight: typeof props.maxHeight === "number" ? `${props.maxHeight}px` : props.maxHeight,
        overflowY: props.scrollable ? "auto" : "visible"
      };
      if (typeof props.contentStyle === "object") {
        Object.assign(styles, props.contentStyle);
      }
      return styles;
    });
    const actualPlacement = ref12(props.placement);
    let cleanup = null;
    let showTimer = null;
    let hideTimer = null;
    const showPopper = computed12(() => {
      if (props.disabled) return false;
      return props.visible !== null ? props.visible : visible.value;
    });
    const shouldRender = computed12(() => props.persistent || showPopper.value);
    const popperClasses = computed12(() => [
      ns.e("popper"),
      ns.is(props.effect, true),
      // 使用 is-dark / is-light 更加稳定
      ns.em("popper", props.effect),
      ns.is("interactive", props.interactive),
      props.popperClass
    ]);
    const updatePosition = async () => {
      if (!triggerRef.value || !popperRef.value || typeof window === "undefined") return;
      const { x, y, placement, middlewareData } = await computePosition(
        triggerRef.value,
        popperRef.value,
        {
          placement: props.placement,
          middleware: [
            offset(props.offset[1]),
            flip(),
            shift({ padding: 5 }),
            props.showArrow ? arrow({ element: arrowRef.value }) : null
          ].filter((item) => item !== null)
        }
      );
      popperStyle.value = {
        left: `${x}px`,
        top: `${y}px`,
        zIndex: String(props.zIndex)
      };
      actualPlacement.value = placement;
      if (middlewareData.arrow && arrowRef.value) {
        const { x: ax, y: ay } = middlewareData.arrow;
        const side = placement.split("-")[0];
        const staticSide = {
          top: "bottom",
          right: "left",
          bottom: "top",
          left: "right"
        }[side];
        arrowStyle.value = {
          left: ax != null ? `${ax}px` : "",
          top: ay != null ? `${ay}px` : "",
          [staticSide]: "-12px"
        };
      }
    };
    const handleMouseMove = async (e) => {
      if (!props.followCursor || !visible.value || typeof window === "undefined") return;
      const virtualElement = {
        getBoundingClientRect: () => {
          const rect = {
            width: 0,
            height: 0,
            x: e.clientX,
            y: e.clientY,
            top: e.clientY,
            left: e.clientX,
            right: e.clientX,
            bottom: e.clientY,
            toJSON: () => ({})
          };
          return rect;
        }
      };
      const { x, y } = await computePosition(virtualElement, popperRef.value, {
        placement: props.placement,
        middleware: [offset(10), flip(), shift()]
      });
      popperStyle.value = {
        left: `${x}px`,
        top: `${y}px`,
        zIndex: String(props.zIndex)
      };
    };
    const toggleVisible = (value) => {
      if (props.disabled) return;
      if (showTimer) {
        clearTimeout(showTimer);
        showTimer = null;
      }
      if (hideTimer) {
        clearTimeout(hideTimer);
        hideTimer = null;
      }
      if (value) {
        const delay = props.showAfter;
        if (delay <= 0) {
          visible.value = true;
          emit("update:visible", true);
          emit("show");
          nextTick(startAutoUpdate);
        } else {
          showTimer = setTimeout(() => {
            visible.value = true;
            emit("update:visible", true);
            emit("show");
            nextTick(startAutoUpdate);
          }, delay);
        }
      } else {
        const delay = props.hideAfter;
        if (delay <= 0) {
          visible.value = false;
          emit("update:visible", false);
          emit("hide");
          stopAutoUpdate();
        } else {
          hideTimer = setTimeout(() => {
            visible.value = false;
            emit("update:visible", false);
            emit("hide");
            stopAutoUpdate();
          }, delay);
        }
      }
    };
    const startAutoUpdate = async () => {
      if (cleanup) cleanup();
      if (triggerRef.value && popperRef.value && !props.followCursor && typeof window !== "undefined") {
        cleanup = autoUpdate(triggerRef.value, popperRef.value, updatePosition);
      }
    };
    const stopAutoUpdate = () => {
      if (cleanup) {
        cleanup();
        cleanup = null;
      }
    };
    const triggers = computed12(() => {
      const t = Array.isArray(props.trigger) ? props.trigger : [props.trigger];
      return new Set(t);
    });
    const handleTrigger = (e, type) => {
      if (!triggers.value.has(type)) return;
      if (type === "hover") {
        toggleVisible(true);
      } else if (type === "click") {
        const isShowing = visible.value && !hideTimer || showTimer;
        toggleVisible(!isShowing);
      } else if (type === "contextmenu") {
        e.preventDefault();
        toggleVisible(true);
      } else if (type === "focus") {
        toggleVisible(true);
      }
    };
    useEventListener(
      () => window,
      "click",
      (e) => {
        var _a2, _b;
        const me = e;
        if (!visible.value) return;
        const needsClose = triggers.value.has("click") || triggers.value.has("contextmenu");
        if (!needsClose) return;
        const target = me.target;
        if (!((_a2 = triggerRef.value) == null ? void 0 : _a2.contains(target)) && !((_b = popperRef.value) == null ? void 0 : _b.contains(target))) {
          toggleVisible(false);
        }
      }
    );
    watch4(
      () => props.visible,
      (val) => {
        if (val !== null && val !== visible.value) {
          visible.value = val;
          if (val) nextTick(startAutoUpdate);
          else stopAutoUpdate();
        }
      },
      { immediate: true }
    );
    watch4(
      () => props.followCursor,
      (val) => {
        if (typeof window === "undefined") return;
        if (val) {
          window.addEventListener("mousemove", handleMouseMove);
        } else {
          window.removeEventListener("mousemove", handleMouseMove);
        }
      }
    );
    onMounted3(() => {
      if (props.followCursor && typeof window !== "undefined") {
        window.addEventListener("mousemove", handleMouseMove);
      }
    });
    onUnmounted4(() => {
      stopAutoUpdate();
      if (typeof window !== "undefined") {
        window.removeEventListener("mousemove", handleMouseMove);
      }
    });
    __expose({
      updatePosition,
      visible,
      triggerRef,
      popperRef
    });
    const __returned__ = { props, emit, ns, tooltipId, themeStyle, triggerRef, popperRef, arrowRef, visible, popperStyle, arrowStyle, computedPopperStyle, computedContentStyle, actualPlacement, get cleanup() {
      return cleanup;
    }, set cleanup(v) {
      cleanup = v;
    }, get showTimer() {
      return showTimer;
    }, set showTimer(v) {
      showTimer = v;
    }, get hideTimer() {
      return hideTimer;
    }, set hideTimer(v) {
      hideTimer = v;
    }, showPopper, shouldRender, popperClasses, updatePosition, handleMouseMove, toggleVisible, startAutoUpdate, stopAutoUpdate, triggers, handleTrigger, ref: ref12, computed: computed12, watch: watch4, onMounted: onMounted3, onUnmounted: onUnmounted4, nextTick, get computePosition() {
      return computePosition;
    }, get offset() {
      return offset;
    }, get flip() {
      return flip;
    }, get shift() {
      return shift;
    }, get arrow() {
      return arrow;
    }, get autoUpdate() {
      return autoUpdate;
    }, get useNamespace() {
      return useNamespace;
    }, get useId() {
      return useId;
    }, get useEventListener() {
      return useEventListener;
    }, get useComponentTheme() {
      return useComponentTheme;
    }, get tooltipProps() {
      return tooltipProps;
    }, get tooltipEmits() {
      return tooltipEmits;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
__sfc__2.render = render2;
var stdin_default3 = __sfc__2;

// public/codesandbox-runtime/components/tooltip/index.js
var YhTooltip = withInstall(stdin_default3);

// public/codesandbox-runtime/components/menu/src/menu-item.js
import { onBeforeUnmount as onBeforeUnmount2 } from "vue";
var _hoisted_13 = ["tabindex"];
var _hoisted_22 = { style: { "max-width": "300px", "word-break": "break-all" } };
function render3(_ctx, _cache, $props, $setup, $data, $options) {
  var _a2, _b;
  return _openBlock3(), _createElementBlock3("li", {
    class: _normalizeClass2([$setup.ns.b(), {
      [$setup.ns.is("active")]: $setup.isActive,
      [$setup.ns.is("disabled")]: _ctx.disabled
    }]),
    style: _normalizeStyle2($setup.itemStyle),
    role: "menuitem",
    tabindex: _ctx.disabled ? -1 : 0,
    onClick: $setup.handleClick,
    onMouseenter: $setup.handleMouseEnter,
    onKeydown: _withKeys($setup.handleClick, ["enter"])
  }, [
    _createVNode2($setup["YhTooltip"], {
      content: $setup.props.label || "",
      disabled: ((_a2 = $setup.menu) == null ? void 0 : _a2.collapse.value) ? false : !$setup.isOverflow,
      placement: ((_b = $setup.menu) == null ? void 0 : _b.collapse.value) ? "right" : "top",
      effect: "dark",
      "show-after": 200,
      "show-arrow": true,
      style: { "flex": "1", "min-width": "0", "overflow": "hidden" }
    }, {
      content: _withCtx2(() => [
        _createElementVNode2("div", _hoisted_22, [
          $setup.renderLabelContent ? (_openBlock3(), _createElementBlock3(
            _Fragment2,
            { key: 0 },
            [
              typeof $setup.renderLabelContent === "string" ? (_openBlock3(), _createElementBlock3(
                _Fragment2,
                { key: 0 },
                [
                  _createTextVNode(
                    _toDisplayString2($setup.renderLabelContent),
                    1
                    /* TEXT */
                  )
                ],
                64
                /* STABLE_FRAGMENT */
              )) : (_openBlock3(), _createBlock3(_resolveDynamicComponent2($setup.renderLabelContent), { key: 1 }))
            ],
            64
            /* STABLE_FRAGMENT */
          )) : _renderSlot3(_ctx.$slots, "default", { key: 1 }, () => [
            _createTextVNode(
              _toDisplayString2($setup.props.label),
              1
              /* TEXT */
            )
          ])
        ])
      ]),
      default: _withCtx2(() => [
        _createElementVNode2(
          "div",
          {
            class: _normalizeClass2($setup.ns.e("content"))
          },
          [
            $setup.renderLabelContent ? (_openBlock3(), _createElementBlock3(
              "div",
              {
                key: 0,
                ref: "contentRef",
                class: _normalizeClass2($setup.ns.e("label"))
              },
              [
                typeof $setup.renderLabelContent === "string" ? (_openBlock3(), _createElementBlock3(
                  _Fragment2,
                  { key: 0 },
                  [
                    _createTextVNode(
                      _toDisplayString2($setup.renderLabelContent),
                      1
                      /* TEXT */
                    )
                  ],
                  64
                  /* STABLE_FRAGMENT */
                )) : (_openBlock3(), _createBlock3(_resolveDynamicComponent2($setup.renderLabelContent), { key: 1 }))
              ],
              2
              /* CLASS */
            )) : (_openBlock3(), _createElementBlock3(
              "div",
              {
                key: 1,
                ref: "contentRef",
                class: _normalizeClass2($setup.ns.e("label"))
              },
              [
                _renderSlot3(_ctx.$slots, "default", {}, () => [
                  _createTextVNode(
                    _toDisplayString2($setup.props.label),
                    1
                    /* TEXT */
                  )
                ])
              ],
              2
              /* CLASS */
            ))
          ],
          2
          /* CLASS */
        )
      ]),
      _: 3
      /* FORWARDED */
    }, 8, ["content", "disabled", "placement"])
  ], 46, _hoisted_13);
}
var __sfc__3 = /* @__PURE__ */ Object.assign({
  name: "YhMenuItem"
}, {
  __name: "menu-item",
  props: menuItemProps,
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const ns = useNamespace("menu-item");
    const menu = inject7(MENU_INJECTION_KEY, null);
    const subMenu = inject7(SUB_MENU_INJECTION_KEY, null);
    const indexPath = computed13(() => {
      if (subMenu) {
        return [...subMenu.indexPath, props.index];
      }
      return [props.index];
    });
    const isActive = computed13(() => (menu == null ? void 0 : menu.activeIndex.value) === props.index);
    const itemStyle = computed13(() => {
      var _a2, _b, _c;
      const styles = {};
      if ((menu == null ? void 0 : menu.mode.value) === "vertical" && !menu.collapse.value) {
        const level = subMenu ? subMenu.level + 1 : 0;
        const isRoot = level === 0;
        const indent = isRoot ? (_b = (_a2 = menu.rootIndent.value) != null ? _a2 : menu.indent.value) != null ? _b : 32 : (_c = menu.indent.value) != null ? _c : 32;
        styles.paddingLeft = `${20 + level * indent}px`;
      }
      return styles;
    });
    const handleClick = () => {
      if (props.disabled) return;
      menu == null ? void 0 : menu.handleSelect(props.index, indexPath.value);
    };
    const contentRef = ref13(null);
    const isOverflow = ref13(false);
    const checkOverflow = () => {
      if (contentRef.value) {
        const el = contentRef.value;
        isOverflow.value = el.scrollWidth > el.offsetWidth;
      }
    };
    let observer = null;
    onMounted4(() => {
      checkOverflow();
      if (contentRef.value) {
        observer = new ResizeObserver(checkOverflow);
        observer.observe(contentRef.value);
      }
    });
    onBeforeUnmount2(() => {
      observer == null ? void 0 : observer.disconnect();
    });
    const handleMouseEnter = () => {
      checkOverflow();
    };
    const renderLabelContent = computed13(() => {
      var _a2;
      if ((_a2 = menu == null ? void 0 : menu.renderLabel) == null ? void 0 : _a2.value) {
        return menu.renderLabel.value({
          index: props.index,
          label: props.label
        });
      }
      return null;
    });
    const __returned__ = { props, ns, menu, subMenu, indexPath, isActive, itemStyle, handleClick, contentRef, isOverflow, checkOverflow, get observer() {
      return observer;
    }, set observer(v) {
      observer = v;
    }, handleMouseEnter, renderLabelContent, inject: inject7, computed: computed13, ref: ref13, onMounted: onMounted4, get useNamespace() {
      return useNamespace;
    }, get YhTooltip() {
      return YhTooltip;
    }, get menuItemProps() {
      return menuItemProps;
    }, get MENU_INJECTION_KEY() {
      return MENU_INJECTION_KEY;
    }, get SUB_MENU_INJECTION_KEY() {
      return SUB_MENU_INJECTION_KEY;
    }, onBeforeUnmount: onBeforeUnmount2 };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
__sfc__3.render = render3;
var stdin_default4 = __sfc__3;

// public/codesandbox-runtime/components/menu/src/sub-menu.js
import { createCommentVNode as _createCommentVNode4, toDisplayString as _toDisplayString3, createTextVNode as _createTextVNode2, Fragment as _Fragment3, openBlock as _openBlock4, createElementBlock as _createElementBlock4, resolveDynamicComponent as _resolveDynamicComponent3, createBlock as _createBlock4, renderSlot as _renderSlot4, createElementVNode as _createElementVNode3, normalizeClass as _normalizeClass3, withCtx as _withCtx3, createVNode as _createVNode3, normalizeStyle as _normalizeStyle3, vShow as _vShow2, withDirectives as _withDirectives2, Transition as _Transition2 } from "vue";
import {
  ref as ref14,
  inject as inject8,
  computed as computed14,
  unref as unref10,
  provide as provide2,
  onMounted as onMounted5,
  onBeforeUnmount as onBeforeUnmount3
} from "vue";
var _hoisted_14 = { style: { "max-width": "300px", "word-break": "break-all" } };
var _hoisted_23 = { style: { "max-width": "300px", "word-break": "break-all" } };
function render4(_ctx, _cache, $props, $setup, $data, $options) {
  var _a2, _b, _c, _d;
  return _openBlock4(), _createElementBlock4(
    "li",
    {
      class: _normalizeClass3([$setup.ns.b(), $setup.ns.is("opened", $setup.isOpened), $setup.ns.is("active", $setup.isActive), $setup.ns.is("disabled", _ctx.disabled), $setup.ns.is("popup", $setup.isPopup)]),
      role: "menuitem",
      onMouseenter: $setup.handleMouseEnter,
      onMouseleave: $setup.handleMouseLeave
    },
    [
      _createCommentVNode4(" \u5F39\u51FA\u6A21\u5F0F "),
      $setup.isPopup ? (_openBlock4(), _createBlock4($setup["YhTooltip"], {
        key: 0,
        visible: $setup.isOpened,
        placement: $setup.popperPlacement,
        "z-index": (_a2 = $setup.menu) == null ? void 0 : _a2.popperZIndex.value,
        teleported: (_b = $setup.menu) == null ? void 0 : _b.teleported.value,
        "popper-class": $setup.mergedPopperClass,
        "popper-style": $setup.mergedPopperStyle,
        offset: [0, $setup.mergedPopperOffset],
        "show-arrow": false,
        effect: $setup.mergedPopperEffect,
        trigger: "click",
        persistent: (_c = $setup.menu) == null ? void 0 : _c.persistent.value
      }, {
        content: _withCtx3(() => [
          _createElementVNode3(
            "ul",
            {
              class: _normalizeClass3($setup.ns.e("menu")),
              onMouseenter: $setup.handleMouseEnter,
              onMouseleave: $setup.handleMouseLeave
            },
            [
              _renderSlot4(_ctx.$slots, "default")
            ],
            34
            /* CLASS, NEED_HYDRATION */
          )
        ]),
        default: _withCtx3(() => {
          var _a22;
          return [
            _createElementVNode3(
              "div",
              {
                class: _normalizeClass3($setup.ns.e("title")),
                style: _normalizeStyle3($setup.titleStyle),
                onClick: $setup.handleTitleClick,
                onMouseenter: $setup.handleMouseEnterHeader
              },
              [
                _createVNode3($setup["YhTooltip"], {
                  disabled: ((_a22 = $setup.menu) == null ? void 0 : _a22.collapse.value) || !$setup.isTitleOverflow,
                  placement: "top",
                  effect: "dark",
                  "show-after": 200,
                  "show-arrow": true,
                  style: { "flex": "1", "min-width": "0", "overflow": "hidden" }
                }, {
                  content: _withCtx3(() => [
                    _createElementVNode3("div", _hoisted_14, [
                      $setup.renderLabelContent ? (_openBlock4(), _createElementBlock4(
                        _Fragment3,
                        { key: 0 },
                        [
                          typeof $setup.renderLabelContent === "string" ? (_openBlock4(), _createElementBlock4(
                            _Fragment3,
                            { key: 0 },
                            [
                              _createTextVNode2(
                                _toDisplayString3($setup.renderLabelContent),
                                1
                                /* TEXT */
                              )
                            ],
                            64
                            /* STABLE_FRAGMENT */
                          )) : (_openBlock4(), _createBlock4(_resolveDynamicComponent3($setup.renderLabelContent), { key: 1 }))
                        ],
                        64
                        /* STABLE_FRAGMENT */
                      )) : _renderSlot4(_ctx.$slots, "title", { key: 1 }, () => [
                        _createTextVNode2(
                          _toDisplayString3($setup.props.label),
                          1
                          /* TEXT */
                        )
                      ])
                    ])
                  ]),
                  default: _withCtx3(() => [
                    _createElementVNode3(
                      "div",
                      {
                        class: _normalizeClass3($setup.ns.e("title-content"))
                      },
                      [
                        $setup.renderLabelContent ? (_openBlock4(), _createElementBlock4(
                          "div",
                          {
                            key: 0,
                            ref: "titleContentRef",
                            class: _normalizeClass3($setup.ns.e("label"))
                          },
                          [
                            typeof $setup.renderLabelContent === "string" ? (_openBlock4(), _createElementBlock4(
                              _Fragment3,
                              { key: 0 },
                              [
                                _createTextVNode2(
                                  _toDisplayString3($setup.renderLabelContent),
                                  1
                                  /* TEXT */
                                )
                              ],
                              64
                              /* STABLE_FRAGMENT */
                            )) : (_openBlock4(), _createBlock4(_resolveDynamicComponent3($setup.renderLabelContent), { key: 1 }))
                          ],
                          2
                          /* CLASS */
                        )) : (_openBlock4(), _createElementBlock4(
                          "div",
                          {
                            key: 1,
                            ref: "titleContentRef",
                            class: _normalizeClass3($setup.ns.e("label"))
                          },
                          [
                            _renderSlot4(_ctx.$slots, "title", {}, () => [
                              _createTextVNode2(
                                _toDisplayString3($setup.props.label),
                                1
                                /* TEXT */
                              )
                            ])
                          ],
                          2
                          /* CLASS */
                        ))
                      ],
                      2
                      /* CLASS */
                    )
                  ]),
                  _: 3
                  /* FORWARDED */
                }, 8, ["disabled"]),
                _createVNode3($setup["YhIcon"], {
                  name: $setup.arrowIcon,
                  class: _normalizeClass3([$setup.ns.e("icon-arrow"), {
                    [$setup.ns.is("opened")]: $setup.isOpened && $setup.shouldIconRotate
                  }])
                }, null, 8, ["name", "class"])
              ],
              38
              /* CLASS, STYLE, NEED_HYDRATION */
            )
          ];
        }),
        _: 3
        /* FORWARDED */
      }, 8, ["visible", "placement", "z-index", "teleported", "popper-class", "popper-style", "offset", "effect", "persistent"])) : (_openBlock4(), _createElementBlock4(
        _Fragment3,
        { key: 1 },
        [
          _createCommentVNode4(" \u5185\u8054\u6A21\u5F0F "),
          _createElementVNode3(
            "div",
            {
              class: _normalizeClass3($setup.ns.e("title")),
              style: _normalizeStyle3($setup.titleStyle),
              onClick: $setup.handleTitleClick,
              onMouseenter: $setup.handleMouseEnterHeader
            },
            [
              _createVNode3($setup["YhTooltip"], {
                disabled: ((_d = $setup.menu) == null ? void 0 : _d.collapse.value) || !$setup.isTitleOverflow,
                placement: "top",
                effect: "dark",
                "show-after": 200,
                "show-arrow": true,
                style: { "flex": "1", "min-width": "0", "overflow": "hidden" }
              }, {
                content: _withCtx3(() => [
                  _createElementVNode3("div", _hoisted_23, [
                    $setup.renderLabelContent ? (_openBlock4(), _createElementBlock4(
                      _Fragment3,
                      { key: 0 },
                      [
                        typeof $setup.renderLabelContent === "string" ? (_openBlock4(), _createElementBlock4(
                          _Fragment3,
                          { key: 0 },
                          [
                            _createTextVNode2(
                              _toDisplayString3($setup.renderLabelContent),
                              1
                              /* TEXT */
                            )
                          ],
                          64
                          /* STABLE_FRAGMENT */
                        )) : (_openBlock4(), _createBlock4(_resolveDynamicComponent3($setup.renderLabelContent), { key: 1 }))
                      ],
                      64
                      /* STABLE_FRAGMENT */
                    )) : _renderSlot4(_ctx.$slots, "title", { key: 1 }, () => [
                      _createTextVNode2(
                        _toDisplayString3($setup.props.label),
                        1
                        /* TEXT */
                      )
                    ])
                  ])
                ]),
                default: _withCtx3(() => [
                  _createElementVNode3(
                    "div",
                    {
                      class: _normalizeClass3($setup.ns.e("title-content"))
                    },
                    [
                      $setup.renderLabelContent ? (_openBlock4(), _createElementBlock4(
                        "div",
                        {
                          key: 0,
                          ref: "titleContentRef",
                          class: _normalizeClass3($setup.ns.e("label"))
                        },
                        [
                          typeof $setup.renderLabelContent === "string" ? (_openBlock4(), _createElementBlock4(
                            _Fragment3,
                            { key: 0 },
                            [
                              _createTextVNode2(
                                _toDisplayString3($setup.renderLabelContent),
                                1
                                /* TEXT */
                              )
                            ],
                            64
                            /* STABLE_FRAGMENT */
                          )) : (_openBlock4(), _createBlock4(_resolveDynamicComponent3($setup.renderLabelContent), { key: 1 }))
                        ],
                        2
                        /* CLASS */
                      )) : (_openBlock4(), _createElementBlock4(
                        "div",
                        {
                          key: 1,
                          ref: "titleContentRef",
                          class: _normalizeClass3($setup.ns.e("label"))
                        },
                        [
                          _renderSlot4(_ctx.$slots, "title", {}, () => [
                            _createTextVNode2(
                              _toDisplayString3($setup.props.label),
                              1
                              /* TEXT */
                            )
                          ])
                        ],
                        2
                        /* CLASS */
                      ))
                    ],
                    2
                    /* CLASS */
                  )
                ]),
                _: 3
                /* FORWARDED */
              }, 8, ["disabled"]),
              _createVNode3($setup["YhIcon"], {
                name: $setup.arrowIcon,
                class: _normalizeClass3([$setup.ns.e("icon-arrow"), {
                  [$setup.ns.is("opened")]: $setup.isOpened && $setup.shouldIconRotate
                }])
              }, null, 8, ["name", "class"])
            ],
            38
            /* CLASS, STYLE, NEED_HYDRATION */
          ),
          _createVNode3(_Transition2, {
            name: "yh-collapse",
            persisted: ""
          }, {
            default: _withCtx3(() => [
              _withDirectives2(_createElementVNode3(
                "ul",
                {
                  class: _normalizeClass3($setup.ns.e("menu"))
                },
                [
                  _renderSlot4(_ctx.$slots, "default")
                ],
                2
                /* CLASS */
              ), [
                [_vShow2, $setup.isOpened]
              ])
            ]),
            _: 3
            /* FORWARDED */
          })
        ],
        64
        /* STABLE_FRAGMENT */
      ))
    ],
    34
    /* CLASS, NEED_HYDRATION */
  );
}
var __sfc__4 = /* @__PURE__ */ Object.assign({
  name: "YhSubMenu"
}, {
  __name: "sub-menu",
  props: subMenuProps,
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const ns = useNamespace("sub-menu");
    const menu = inject8(MENU_INJECTION_KEY, null);
    const parentSubMenu = inject8(SUB_MENU_INJECTION_KEY, null);
    const level = computed14(() => parentSubMenu ? parentSubMenu.level + 1 : 0);
    const indexPath = computed14(() => {
      if (parentSubMenu) {
        return [...parentSubMenu.indexPath, props.index];
      }
      return [props.index];
    });
    const opened = ref14(false);
    const isOpened = computed14(() => {
      if (menu) {
        if (menu.expandAll.value && menu.mode.value === "vertical" && !menu.collapse.value) {
          return true;
        }
        return menu.openedMenus.value.includes(props.index);
      }
      return opened.value;
    });
    const isPopup = computed14(() => {
      if (!menu) return false;
      return menu.mode.value === "horizontal" || menu.mode.value === "vertical" && menu.collapse.value;
    });
    const titleStyle = computed14(() => {
      var _a2, _b, _c;
      const styles = {};
      if (menu == null ? void 0 : menu.textColor.value) {
        styles.color = menu.textColor.value;
      }
      if ((menu == null ? void 0 : menu.mode.value) === "vertical" && !menu.collapse.value) {
        const isRoot = level.value === 0;
        const indent = isRoot ? (_b = (_a2 = menu.rootIndent.value) != null ? _a2 : menu.indent.value) != null ? _b : 32 : (_c = menu.indent.value) != null ? _c : 32;
        styles.paddingLeft = `${20 + level.value * indent}px`;
      }
      return styles;
    });
    const popperPlacement = computed14(() => {
      if (!menu) return "right-start";
      if (menu.mode.value === "horizontal") {
        return level.value === 0 ? "bottom-start" : "right-start";
      }
      return "right-start";
    });
    let showTimer = null;
    let hideTimer = null;
    const mergedShowTimeout = computed14(() => {
      var _a2, _b;
      return (_b = (_a2 = props.showTimeout) != null ? _a2 : menu == null ? void 0 : menu.showTimeout.value) != null ? _b : 300;
    });
    const mergedHideTimeout = computed14(() => {
      var _a2, _b;
      return (_b = (_a2 = props.hideTimeout) != null ? _a2 : menu == null ? void 0 : menu.hideTimeout.value) != null ? _b : 300;
    });
    const mergedPopperOffset = computed14(() => {
      var _a2, _b;
      return (_b = (_a2 = props.popperOffset) != null ? _a2 : menu == null ? void 0 : menu.popperOffset.value) != null ? _b : 6;
    });
    const mergedPopperClass = computed14(() => {
      const classes = [ns.e("popper")];
      if (menu == null ? void 0 : menu.popperClass.value) classes.push(menu.popperClass.value);
      if (props.popperClass) classes.push(props.popperClass);
      return classes.join(" ");
    });
    const mergedPopperStyle = computed14(() => {
      return unref10(menu == null ? void 0 : menu.popperStyle) || {};
    });
    const mergedPopperEffect = computed14(() => {
      var _a2;
      return (_a2 = menu == null ? void 0 : menu.popperEffect.value) != null ? _a2 : "light";
    });
    const clearTimers = () => {
      if (showTimer) {
        clearTimeout(showTimer);
        showTimer = null;
      }
      if (hideTimer) {
        clearTimeout(hideTimer);
        hideTimer = null;
      }
    };
    const handleMouseEnter = () => {
      if (props.disabled || !isPopup.value) return;
      if ((menu == null ? void 0 : menu.menuTrigger.value) !== "hover") return;
      clearTimers();
      showTimer = setTimeout(() => {
        if (!isOpened.value) {
          menu == null ? void 0 : menu.handleOpen(props.index, indexPath.value);
        }
      }, mergedShowTimeout.value);
    };
    const handleMouseLeave = () => {
      if (props.disabled || !isPopup.value) return;
      if ((menu == null ? void 0 : menu.menuTrigger.value) !== "hover") return;
      clearTimers();
      hideTimer = setTimeout(() => {
        if (isOpened.value) {
          menu == null ? void 0 : menu.handleClose(props.index, indexPath.value);
        }
      }, mergedHideTimeout.value);
    };
    const handleTitleClick = () => {
      if (props.disabled) return;
      if (isPopup.value && (menu == null ? void 0 : menu.menuTrigger.value) === "hover") {
        return;
      }
      if (isOpened.value) {
        menu == null ? void 0 : menu.handleClose(props.index, indexPath.value);
      } else {
        menu == null ? void 0 : menu.handleOpen(props.index, indexPath.value);
      }
    };
    const isActive = computed14(() => {
      if (!menu || !menu.activeIndex.value) return false;
      const activeIndex = menu.activeIndex.value;
      const selfIndex = props.index;
      return activeIndex === selfIndex || activeIndex.startsWith(`${selfIndex}-`);
    });
    const arrowIcon = computed14(() => {
      if ((menu == null ? void 0 : menu.mode.value) === "horizontal") {
        return level.value === 0 ? "arrow-down" : "arrow-right";
      }
      if ((menu == null ? void 0 : menu.mode.value) === "vertical" && menu.collapse.value) {
        return "arrow-right";
      }
      return "arrow-down";
    });
    const shouldIconRotate = computed14(() => arrowIcon.value === "arrow-down");
    provide2(SUB_MENU_INJECTION_KEY, {
      level: level.value,
      indexPath: indexPath.value
    });
    const titleContentRef = ref14(null);
    const isTitleOverflow = ref14(false);
    const checkTitleOverflow = () => {
      if (titleContentRef.value) {
        const el = titleContentRef.value;
        isTitleOverflow.value = el.scrollWidth > el.offsetWidth;
      }
    };
    let observer = null;
    onMounted5(() => {
      checkTitleOverflow();
      if (titleContentRef.value) {
        observer = new ResizeObserver(checkTitleOverflow);
        observer.observe(titleContentRef.value);
      }
    });
    const handleMouseEnterHeader = () => {
      checkTitleOverflow();
    };
    const renderLabelContent = computed14(() => {
      var _a2;
      if ((_a2 = menu == null ? void 0 : menu.renderLabel) == null ? void 0 : _a2.value) {
        return menu.renderLabel.value({
          index: props.index,
          label: props.label
        });
      }
      return null;
    });
    onBeforeUnmount3(() => {
      clearTimers();
      observer == null ? void 0 : observer.disconnect();
    });
    const __returned__ = { props, ns, menu, parentSubMenu, level, indexPath, opened, isOpened, isPopup, titleStyle, popperPlacement, get showTimer() {
      return showTimer;
    }, set showTimer(v) {
      showTimer = v;
    }, get hideTimer() {
      return hideTimer;
    }, set hideTimer(v) {
      hideTimer = v;
    }, mergedShowTimeout, mergedHideTimeout, mergedPopperOffset, mergedPopperClass, mergedPopperStyle, mergedPopperEffect, clearTimers, handleMouseEnter, handleMouseLeave, handleTitleClick, isActive, arrowIcon, shouldIconRotate, titleContentRef, isTitleOverflow, checkTitleOverflow, get observer() {
      return observer;
    }, set observer(v) {
      observer = v;
    }, handleMouseEnterHeader, renderLabelContent, ref: ref14, inject: inject8, computed: computed14, unref: unref10, provide: provide2, onMounted: onMounted5, onBeforeUnmount: onBeforeUnmount3, get useNamespace() {
      return useNamespace;
    }, get YhIcon() {
      return YhIcon;
    }, get YhTooltip() {
      return YhTooltip;
    }, get subMenuProps() {
      return subMenuProps;
    }, get MENU_INJECTION_KEY() {
      return MENU_INJECTION_KEY;
    }, get SUB_MENU_INJECTION_KEY() {
      return SUB_MENU_INJECTION_KEY;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
__sfc__4.render = render4;
var stdin_default5 = __sfc__4;

// public/codesandbox-runtime/components/menu/src/menu-item-group.js
import { renderSlot as _renderSlot5, toDisplayString as _toDisplayString4, createTextVNode as _createTextVNode3, normalizeClass as _normalizeClass4, createElementVNode as _createElementVNode4, openBlock as _openBlock5, createElementBlock as _createElementBlock5 } from "vue";
function render5(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock5(), _createElementBlock5(
    "li",
    {
      class: _normalizeClass4($setup.ns.b()),
      role: "group"
    },
    [
      _createElementVNode4(
        "div",
        {
          class: _normalizeClass4($setup.ns.e("title"))
        },
        [
          _renderSlot5(_ctx.$slots, "title", {}, () => [
            _createTextVNode3(
              _toDisplayString4(_ctx.title),
              1
              /* TEXT */
            )
          ])
        ],
        2
        /* CLASS */
      ),
      _createElementVNode4(
        "ul",
        {
          class: _normalizeClass4($setup.ns.e("list"))
        },
        [
          _renderSlot5(_ctx.$slots, "default")
        ],
        2
        /* CLASS */
      )
    ],
    2
    /* CLASS */
  );
}
var __sfc__5 = /* @__PURE__ */ Object.assign({
  name: "YhMenuItemGroup"
}, {
  __name: "menu-item-group",
  props: menuItemGroupProps,
  setup(__props, { expose: __expose }) {
    __expose();
    const ns = useNamespace("menu-item-group");
    const __returned__ = { ns, get useNamespace() {
      return useNamespace;
    }, get menuItemGroupProps() {
      return menuItemGroupProps;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
__sfc__5.render = render5;
var stdin_default6 = __sfc__5;

// public/codesandbox-runtime/components/menu/src/menu-recursive-item.js
function render6(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_yh_menu_recursive_item = _resolveComponent("yh-menu-recursive-item");
  return _openBlock6(), _createElementBlock6(
    _Fragment4,
    null,
    [
      _createCommentVNode5(" \u5206\u7EC4\u6A21\u5F0F "),
      $props.item.group ? (_openBlock6(), _createBlock5($setup["YhMenuItemGroup"], {
        key: 0,
        title: $props.item[$setup.labelField] || $props.item.label || ""
      }, {
        default: _withCtx4(() => [
          (_openBlock6(true), _createElementBlock6(
            _Fragment4,
            null,
            _renderList($props.item.children, (child, idx) => {
              return _openBlock6(), _createBlock5(_component_yh_menu_recursive_item, {
                key: child[$setup.keyField] || child.index || idx || "",
                item: child
              }, null, 8, ["item"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]),
        _: 1
        /* STABLE */
      }, 8, ["title"])) : $props.item.children && $props.item.children.length > 0 ? (_openBlock6(), _createElementBlock6(
        _Fragment4,
        { key: 1 },
        [
          _createCommentVNode5(" \u5B50\u83DC\u5355\u6A21\u5F0F "),
          _createVNode4($setup["YhSubMenu"], {
            index: $props.item[$setup.keyField] || $props.item.index || "",
            label: $props.item[$setup.labelField] || $props.item.label || "",
            disabled: $props.item.disabled
          }, _createSlots({
            default: _withCtx4(() => [
              (_openBlock6(true), _createElementBlock6(
                _Fragment4,
                null,
                _renderList($props.item.children, (child, idx) => {
                  return _openBlock6(), _createBlock5(_component_yh_menu_recursive_item, {
                    key: child[$setup.keyField] || child.index || idx || "",
                    item: child
                  }, null, 8, ["item"]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ]),
            _: 2
            /* DYNAMIC */
          }, [
            $props.item.icon ? {
              name: "title",
              fn: _withCtx4(() => [
                _createVNode4($setup["YhIcon"], {
                  name: $props.item.icon
                }, null, 8, ["name"]),
                _createElementVNode5(
                  "span",
                  null,
                  _toDisplayString5($props.item[$setup.labelField] || $props.item.label),
                  1
                  /* TEXT */
                )
              ]),
              key: "0"
            } : void 0
          ]), 1032, ["index", "label", "disabled"])
        ],
        2112
        /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
      )) : (_openBlock6(), _createElementBlock6(
        _Fragment4,
        { key: 2 },
        [
          _createCommentVNode5(" \u666E\u901A\u83DC\u5355\u9879 "),
          _createVNode4($setup["YhMenuItem"], {
            index: $props.item[$setup.keyField] || $props.item.index || "",
            label: $props.item[$setup.labelField] || $props.item.label || "",
            disabled: $props.item.disabled
          }, _createSlots({
            _: 2
            /* DYNAMIC */
          }, [
            $props.item.icon ? {
              name: "default",
              fn: _withCtx4(() => [
                _createVNode4($setup["YhIcon"], {
                  name: $props.item.icon
                }, null, 8, ["name"]),
                _createElementVNode5(
                  "span",
                  null,
                  _toDisplayString5($props.item[$setup.labelField] || $props.item.label),
                  1
                  /* TEXT */
                )
              ]),
              key: "0"
            } : void 0
          ]), 1032, ["index", "label", "disabled"])
        ],
        2112
        /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
      ))
    ],
    2112
    /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
  );
}
var __sfc__6 = /* @__PURE__ */ Object.assign({
  name: "YhMenuRecursiveItem"
}, {
  __name: "menu-recursive-item",
  props: {
    item: { type: Object, required: true }
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const menu = inject9(MENU_INJECTION_KEY);
    const keyField = unref11(menu == null ? void 0 : menu.keyField) || "key";
    const labelField = unref11(menu == null ? void 0 : menu.labelField) || "label";
    const __returned__ = { menu, keyField, labelField, inject: inject9, unref: unref11, get YhIcon() {
      return YhIcon;
    }, YhMenuItem: stdin_default4, YhSubMenu: stdin_default5, YhMenuItemGroup: stdin_default6, get MENU_INJECTION_KEY() {
      return MENU_INJECTION_KEY;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
__sfc__6.render = render6;
var stdin_default7 = __sfc__6;

// public/codesandbox-runtime/components/menu/src/menu.js
var __defProp4 = Object.defineProperty;
var __getOwnPropSymbols4 = Object.getOwnPropertySymbols;
var __hasOwnProp4 = Object.prototype.hasOwnProperty;
var __propIsEnum4 = Object.prototype.propertyIsEnumerable;
var __defNormalProp4 = (obj, key, value) => key in obj ? __defProp4(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues4 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp4.call(b, prop))
      __defNormalProp4(a, prop, b[prop]);
  if (__getOwnPropSymbols4)
    for (var prop of __getOwnPropSymbols4(b)) {
      if (__propIsEnum4.call(b, prop))
        __defNormalProp4(a, prop, b[prop]);
    }
  return a;
};
function render7(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock7(), _createElementBlock7(
    "ul",
    {
      class: _normalizeClass5($setup.menuClass),
      style: _normalizeStyle4($setup.menuStyle),
      role: "menu"
    },
    [
      _renderSlot6(_ctx.$slots, "default", {}, () => [
        (_openBlock7(true), _createElementBlock7(
          _Fragment5,
          null,
          _renderList2(_ctx.options, (item) => {
            return _openBlock7(), _createBlock6($setup["YhMenuRecursiveItem"], {
              key: $setup.getMenuItemKey(item),
              item
            }, null, 8, ["item"]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ])
    ],
    6
    /* CLASS, STYLE */
  );
}
var __sfc__7 = /* @__PURE__ */ Object.assign({
  name: "YhMenu"
}, {
  __name: "menu",
  props: menuProps,
  emits: menuEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    var _a2;
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("menu");
    const { themeStyle } = useComponentTheme(
      "menu",
      computed15(() => props.themeOverrides)
    );
    const activeIndex = ref15((_a2 = props.value) != null ? _a2 : props.defaultActive);
    const openedMenus = ref15([...props.defaultOpeneds || []]);
    const menuStyle = computed15(() => {
      const styles = {};
      if (props.backgroundColor) {
        styles["--yh-menu-bg-color"] = props.backgroundColor;
      }
      if (props.textColor) {
        styles["--yh-menu-text-color"] = props.textColor;
      }
      if (props.activeTextColor) {
        styles["--yh-menu-active-text-color"] = props.activeTextColor;
      }
      if (props.iconSize) {
        styles["--yh-menu-icon-size"] = typeof props.iconSize === "number" ? `${props.iconSize}px` : props.iconSize;
      }
      return __spreadValues4(__spreadValues4({}, styles), themeStyle.value);
    });
    const getMenuItemKey = (item) => {
      var _a22, _b;
      const value = (_b = (_a22 = item[props.keyField || "key"]) != null ? _a22 : item.index) != null ? _b : item.key;
      return value == null ? "" : String(value);
    };
    const menuClass = computed15(() => [
      ns.b(),
      ns.m(props.mode),
      {
        [ns.m("collapse")]: props.collapse && props.mode === "vertical",
        [ns.is("ellipsis")]: props.ellipsis && props.mode === "horizontal",
        [ns.m("inverted")]: props.inverted
      }
    ]);
    const handleSelect = (index, indexPath) => {
      activeIndex.value = index;
      emit("update:value", index);
      emit("select", index, indexPath, void 0);
    };
    const handleOpen = (index, indexPath) => {
      if (props.uniqueOpened) {
        openedMenus.value = openedMenus.value.filter(
          (openedIndex) => indexPath.includes(openedIndex) || openedMenus.value.indexOf(openedIndex) === -1
        );
      }
      if (!openedMenus.value.includes(index)) {
        openedMenus.value.push(index);
      }
      emit("open", index, indexPath);
    };
    const handleClose = (index, indexPath) => {
      const i = openedMenus.value.indexOf(index);
      if (i !== -1) {
        openedMenus.value.splice(i, 1);
      }
      emit("close", index, indexPath);
    };
    provide3(MENU_INJECTION_KEY, {
      mode: toRef(props, "mode"),
      activeIndex,
      openedMenus,
      collapse: toRef(props, "collapse"),
      backgroundColor: toRef(props, "backgroundColor"),
      textColor: toRef(props, "textColor"),
      activeTextColor: toRef(props, "activeTextColor"),
      uniqueOpened: toRef(props, "uniqueOpened"),
      menuTrigger: toRef(props, "menuTrigger"),
      popperZIndex: toRef(props, "popperZIndex"),
      teleported: toRef(props, "teleported"),
      gap: toRef(props, "gap"),
      iconSize: toRef(props, "iconSize"),
      indent: toRef(props, "indent"),
      inverted: toRef(props, "inverted"),
      keyField: toRef(props, "keyField"),
      labelField: toRef(props, "labelField"),
      popperOffset: toRef(props, "popperOffset"),
      popperEffect: toRef(props, "popperEffect"),
      popperClass: toRef(props, "popperClass"),
      popperStyle: toRef(props, "popperStyle"),
      showTimeout: toRef(props, "showTimeout"),
      hideTimeout: toRef(props, "hideTimeout"),
      persistent: toRef(props, "persistent"),
      ellipsisIcon: toRef(props, "ellipsisIcon"),
      closeOnClickOutside: toRef(props, "closeOnClickOutside"),
      expandAll: toRef(props, "expandAll"),
      rootIndent: toRef(props, "rootIndent"),
      renderExtra: toRef(props, "renderExtra"),
      renderIcon: toRef(props, "renderIcon"),
      renderLabel: toRef(props, "renderLabel"),
      responsive: toRef(props, "responsive"),
      value: toRef(props, "value"),
      options: toRef(props, "options"),
      handleSelect,
      handleOpen,
      handleClose
    });
    watch5(
      () => props.value,
      (val) => {
        if (val !== void 0) {
          activeIndex.value = val != null ? val : "";
        }
      }
    );
    watch5(
      () => props.defaultActive,
      (val) => {
        activeIndex.value = val;
      }
    );
    __expose({
      open: (index) => handleOpen(index, [index]),
      close: (index) => handleClose(index, [index]),
      activeIndex,
      openedMenus
    });
    const __returned__ = { props, emit, ns, themeStyle, activeIndex, openedMenus, menuStyle, getMenuItemKey, menuClass, handleSelect, handleOpen, handleClose, ref: ref15, computed: computed15, provide: provide3, toRef, watch: watch5, get useNamespace() {
      return useNamespace;
    }, get useComponentTheme() {
      return useComponentTheme;
    }, get menuProps() {
      return menuProps;
    }, get menuEmits() {
      return menuEmits;
    }, get MENU_INJECTION_KEY() {
      return MENU_INJECTION_KEY;
    }, YhMenuRecursiveItem: stdin_default7 };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
__sfc__7.render = render7;
var stdin_default8 = __sfc__7;
export {
  stdin_default8 as default
};
