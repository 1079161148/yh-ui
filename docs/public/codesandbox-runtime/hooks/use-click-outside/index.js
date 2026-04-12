import { unref } from "vue";
import { useEventListener } from "../use-event-listener/index.js";
function useClickOutside(target, handler) {
  if (typeof window === "undefined") return;
  const listener = (event) => {
    const el = unref(target);
    if (!el) return;
    const path = event.composedPath();
    if (path.includes(el)) return;
    handler(event);
  };
  useEventListener(window, "mousedown", listener, true);
  useEventListener(window, "touchstart", listener, true);
}
export {
  useClickOutside
};
