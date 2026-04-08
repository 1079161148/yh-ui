"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.vInfiniteScroll = void 0;
var _vue = require("vue");
const SCOPE_KEY = Symbol("InfiniteScroll");
const vInfiniteScroll = exports.vInfiniteScroll = {
  mounted(el, binding) {
    const {
      value
    } = binding;
    if (typeof value !== "function") {
      throw new Error("v-infinite-scroll value must be a function");
    }
    const distance = Number(el.getAttribute("infinite-scroll-distance")) || 0;
    const disabledAttr = el.getAttribute("infinite-scroll-disabled");
    const immediateAttr = el.getAttribute("infinite-scroll-immediate");
    const sentinel = document.createElement("div");
    sentinel.className = "yh-infinite-scroll-sentinel";
    sentinel.style.height = "1px";
    sentinel.style.width = "100%";
    sentinel.style.marginTop = "-1px";
    sentinel.style.pointerEvents = "none";
    el.appendChild(sentinel);
    const scope = {
      cb: value,
      observer: null,
      disabled: disabledAttr === "true" || disabledAttr === "",
      distance,
      immediate: immediateAttr !== "false",
      sentinel
    };
    el[SCOPE_KEY] = scope;
    const observer = new IntersectionObserver(entries => {
      const entry = entries[0];
      if (entry.isIntersecting && !scope.disabled) {
        scope.cb();
      }
    }, {
      root: el.style.overflow === "auto" || el.style.overflow === "scroll" || el === document.documentElement ? null : el,
      rootMargin: `0px 0px ${scope.distance}px 0px`
    });
    observer.observe(sentinel);
    scope.observer = observer;
    if (scope.immediate) {
      (0, _vue.nextTick)(() => {});
    }
  },
  updated(el, binding) {
    const scope = el[SCOPE_KEY];
    if (!scope) return;
    const disabledAttr = el.getAttribute("infinite-scroll-disabled");
    scope.disabled = disabledAttr === "true" || disabledAttr === "";
    scope.cb = binding.value;
    const distance = Number(el.getAttribute("infinite-scroll-distance")) || 0;
    if (distance !== scope.distance) {
      scope.distance = distance;
      if (scope.observer) {
        scope.observer.disconnect();
        scope.observer = new IntersectionObserver(entries => {
          const entry = entries[0];
          if (entry.isIntersecting && !scope.disabled) {
            scope.cb();
          }
        }, {
          rootMargin: `0px 0px ${scope.distance}px 0px`
        });
        scope.observer.observe(scope.sentinel);
      }
    }
  },
  unmounted(el) {
    const scope = el[SCOPE_KEY];
    if (scope) {
      if (scope.observer) {
        scope.observer.disconnect();
      }
      if (scope.sentinel && scope.sentinel.parentNode === el) {
        el.removeChild(scope.sentinel);
      }
    }
  }
};