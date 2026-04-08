"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useScrollLock = void 0;
var _vue = require("vue");
const useScrollLock = trigger => {
  const isLocked = (0, _vue.ref)(false);
  let initialHtmlStyle = {
    overflow: "",
    paddingRight: ""
  };
  let initialBodyStyle = {
    overflow: "",
    paddingRight: ""
  };
  const getScrollbarWidth = () => {
    return window.innerWidth - document.documentElement.clientWidth;
  };
  const lock = () => {
    if (isLocked.value) return;
    const width = getScrollbarWidth();
    const html = document.documentElement;
    const body = document.body;
    initialHtmlStyle = {
      overflow: html.style.overflow,
      paddingRight: html.style.paddingRight
    };
    initialBodyStyle = {
      overflow: body.style.overflow,
      paddingRight: body.style.paddingRight
    };
    if (width > 0) {
      const scrollbarWidth = `${width}px`;
      html.style.setProperty("--yh-scrollbar-width", scrollbarWidth);
      const computedBodyPadding = window.getComputedStyle(body).paddingRight;
      body.style.paddingRight = `calc(${computedBodyPadding} + ${scrollbarWidth})`;
    }
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    html.classList.add("yh-popup-parent--hidden");
    isLocked.value = true;
  };
  const unlock = () => {
    if (!isLocked.value) return;
    const html = document.documentElement;
    const body = document.body;
    html.style.overflow = initialHtmlStyle.overflow;
    html.style.paddingRight = initialHtmlStyle.paddingRight;
    body.style.overflow = initialBodyStyle.overflow;
    body.style.paddingRight = initialBodyStyle.paddingRight;
    html.classList.remove("yh-popup-parent--hidden");
    setTimeout(() => {
      if (!html.classList.contains("yh-popup-parent--hidden")) {
        html.style.removeProperty("--yh-scrollbar-width");
      }
    }, 400);
    isLocked.value = false;
  };
  (0, _vue.watch)(trigger, val => {
    if (val) {
      lock();
    } else {
      unlock();
    }
  });
  (0, _vue.onUnmounted)(unlock);
  return {
    isLocked
  };
};
exports.useScrollLock = useScrollLock;