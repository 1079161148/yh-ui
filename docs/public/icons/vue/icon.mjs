import { defineComponent as d, onMounted as y, computed as r, h as c } from "vue";
import { Icon as m } from "@iconify/vue";
import { COMMON_ICONS as s } from "../presets.mjs";
const a = "yh-icon-spin-style", v = `
@keyframes yh-icon-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.yh-icons--spin {
  animation: yh-icon-spin 1s linear infinite;
}
`;
function l() {
  if (typeof document > "u" || document.getElementById(a)) return;
  const e = document.createElement("style");
  e.id = a, e.textContent = v, document.head.appendChild(e);
}
function u(e) {
  return e ? e.includes(":") || e.includes("/") ? e.replace("/", ":") : e in s ? s[e] : `mdi:${e}` : "";
}
function f(e) {
  const t = {};
  if (e.size) {
    const n = typeof e.size == "number" ? `${e.size}px` : e.size;
    t.width = n, t.height = n, t.fontSize = n;
  }
  return e.color && (t.color = e.color), e.rotate && !e.spin && (t.transform = `rotate(${e.rotate}deg)`), Object.keys(t).length > 0 ? t : void 0;
}
const h = d({
  name: "YhIconIconify",
  inheritAttrs: !1,
  props: {
    /**
     * 图标名称
     * 支持格式：
     * - 简写名称（如：'home', 'search'）
     * - 带前缀的图标名（如：'mdi:home', 'ep:search'）
     */
    name: {
      type: String,
      default: ""
    },
    /**
     * 直接使用 Iconify 图标（优先级高于 name）
     */
    icon: {
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
    component: {
      type: [Object, Function],
      default: void 0
    },
    /**
     * 图标尺寸
     */
    size: {
      type: [Number, String],
      default: void 0
    },
    /**
     * 图标颜色
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
      default: !1
    },
    /**
     * 旋转角度（度数）
     */
    rotate: {
      type: Number,
      default: 0
    }
  },
  setup(e, { attrs: t }) {
    y(() => {
      e.spin && l();
    });
    const n = r(() => e.icon ? u(e.icon) : e.name ? u(e.name) : ""), i = r(
      () => f({
        size: e.size,
        color: e.color,
        rotate: e.rotate,
        spin: e.spin
      })
    ), o = r(() => e.spin ? "yh-icons--spin" : "");
    return () => (e.spin && l(), e.component ? c(e.component, {
      class: o.value,
      style: i.value,
      ...t
    }) : e.svg ? c("svg", {
      class: o.value,
      style: i.value,
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg",
      "aria-hidden": "true",
      innerHTML: e.svg,
      ...t
    }) : n.value ? c(m, {
      icon: n.value,
      class: o.value,
      style: i.value,
      ...t
    }) : c("span", {
      class: ["yh-icon", o.value],
      style: i.value,
      ...t
    }));
  }
}), z = h, C = {
  ensureSpinStyle: l,
  resolveIconName: u,
  createIconStyle: f
};
export {
  z as Icon,
  h as YhIcon,
  C as __test__
};
