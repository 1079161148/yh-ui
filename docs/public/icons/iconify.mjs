import { Icon as f, getIcon as u, loadIcon as p } from "@iconify/vue";
import { h as d } from "vue";
function l(t) {
  const { icon: o, size: r, color: e, spin: a, rotate: i } = t, n = {};
  if (r) {
    const c = typeof r == "number" ? `${r}px` : r;
    n.width = c, n.height = c, n.fontSize = c;
  }
  return e && (n.color = e), i && (n.transform = `rotate(${i}deg)`), a && (n.animation = "spin 1s linear infinite"), {
    icon: o,
    style: Object.keys(n).length > 0 ? n : void 0
  };
}
function g() {
  return (t) => {
    const o = l(t);
    return d(f, o);
  };
}
function s(t) {
  return t.includes(":") ? t : t.includes("/") ? t.replace("/", ":") : `mdi:${t}`;
}
async function m(t) {
  try {
    return !!s(t);
  } catch {
    return !1;
  }
}
async function I(t) {
  const o = s(t), r = u(o);
  if (r) return r;
  try {
    const e = await p(o);
    if (!e)
      throw new Error(`Icon not found: ${t}`);
    return e;
  } catch {
    throw new Error(`Failed to load icon: ${t}`);
  }
}
export {
  g as createIconifyComponent,
  I as getIconData,
  m as iconExists,
  s as parseIconName
};
