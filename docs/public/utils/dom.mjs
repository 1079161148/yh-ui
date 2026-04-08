export const isClient = typeof window !== "undefined";
export const isServer = !isClient;
export const getStyle = (element, styleName) => {
  if (!isClient || !element || !styleName) return "";
  try {
    const style = element.style[styleName];
    if (style) return style;
    const computed = document.defaultView?.getComputedStyle(element, "");
    return computed ? computed[styleName] : "";
  } catch {
    return element.style[styleName];
  }
};
export const setStyle = (element, styleName, value) => {
  if (!element || !styleName) return;
  if (typeof styleName === "object") {
    Object.entries(styleName).forEach(([key, val]) => {
      setStyle(element, key, val);
    });
  } else {
    ;
    element.style[styleName] = value ?? "";
  }
};
export const hasClass = (el, cls) => {
  if (!el || !cls) return false;
  if (cls.includes(" ")) throw new Error("className should not contain space.");
  return el.classList.contains(cls);
};
export const addClass = (el, cls) => {
  if (!el || !cls.trim()) return;
  el.classList.add(...cls.split(" ").filter(Boolean));
};
export const removeClass = (el, cls) => {
  if (!el || !cls.trim()) return;
  el.classList.remove(...cls.split(" ").filter(Boolean));
};
export const toggleClass = (el, cls, force) => {
  if (!el || !cls.trim()) return;
  el.classList.toggle(cls, force);
};
export const getScrollContainer = (el, isVertical) => {
  if (!isClient) return void 0;
  let parent = el;
  while (parent) {
    if ([document.documentElement, document.body].includes(parent)) {
      return window;
    }
    const overflow = isVertical ? getStyle(parent, "overflowY") : getStyle(parent, "overflow");
    if (/(scroll|auto)/.test(overflow)) {
      return parent;
    }
    parent = parent.parentNode;
  }
  return void 0;
};
export const isInViewport = (el) => {
  if (!isClient || !el) return false;
  const rect = el.getBoundingClientRect();
  return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
};
let scrollBarWidth;
export const getScrollbarWidth = () => {
  if (!isClient) return 0;
  if (scrollBarWidth !== void 0) return scrollBarWidth;
  const outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.width = "100px";
  outer.style.position = "absolute";
  outer.style.top = "-9999px";
  document.body.appendChild(outer);
  const widthNoScroll = outer.offsetWidth;
  outer.style.overflow = "scroll";
  const inner = document.createElement("div");
  inner.style.width = "100%";
  outer.appendChild(inner);
  const widthWithScroll = inner.offsetWidth;
  outer.parentNode?.removeChild(outer);
  scrollBarWidth = widthNoScroll - widthWithScroll;
  return scrollBarWidth;
};
