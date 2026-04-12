import { defineComponent as f, onMounted as d, computed as r, h as c } from "vue";
import { Icon as y } from "@iconify/vue";
import { COMMON_ICONS as l } from "../presets.mjs";
const u = "yh-icon-spin-style", m = `
@keyframes yh-icon-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.yh-icons--spin {
  animation: yh-icon-spin 1s linear infinite;
}
`;
function s() {
  if (typeof document > "u" || document.getElementById(u)) return;
  const e = document.createElement("style");
  e.id = u, e.textContent = m, document.head.appendChild(e);
}
function a(e) {
  return e ? e.includes(":") || e.includes("/") ? e.replace("/", ":") : e in l ? l[e] : `mdi:${e}` : "";
}
function v(e) {
  const t = {};
  if (e.size) {
    const n = typeof e.size == "number" ? `${e.size}px` : e.size;
    t.width = n, t.height = n, t.fontSize = n;
  }
  return e.color && (t.color = e.color), e.rotate && !e.spin && (t.transform = `rotate(${e.rotate}deg)`), Object.keys(t).length > 0 ? t : void 0;
}
const h = f({
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
    d(() => {
      e.spin && s();
    });
    const n = r(() => e.icon ? a(e.icon) : e.name ? a(e.name) : ""), i = r(
      () => v({
        size: e.size,
        color: e.color,
        rotate: e.rotate,
        spin: e.spin
      })
    ), o = r(() => e.spin ? "yh-icons--spin" : "");
    return () => (e.spin && s(), e.component ? c(e.component, {
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
    }) : n.value ? c(y, {
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
}), z = h;
export {
  z as Icon,
  h as YhIcon
};
