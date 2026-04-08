import {
  createVNode,
  render,
  reactive,
  h,
  isVNode,
  Transition,
  computed
} from "vue";
import { useComponentTheme } from "@yh-ui/theme";
import { YhSpin } from "../../spin/index.mjs";
const createLoading = (options = {}, appContext) => {
  const resolvedOptions = {
    target: document.body,
    body: false,
    fullscreen: true,
    lock: false,
    glass: false,
    ...options
  };
  const state = reactive({
    visible: true
  });
  const component = {
    setup() {
      const { themeStyle } = useComponentTheme(
        "loading",
        computed(() => resolvedOptions.themeOverrides)
      );
      return () => h(
        Transition,
        { name: "yh-loading-fade", appear: true },
        {
          default: () => state.visible ? h(
            "div",
            {
              class: [
                "yh-loading-mask",
                resolvedOptions.customClass,
                {
                  "is-fullscreen": resolvedOptions.fullscreen,
                  "is-glass": resolvedOptions.glass
                }
              ],
              style: [{ backgroundColor: resolvedOptions.background }, themeStyle.value]
            },
            [
              h("div", { class: "yh-loading-spinner" }, [
                resolvedOptions.spinner ? typeof resolvedOptions.spinner === "string" ? h("i", { class: resolvedOptions.spinner }) : isVNode(resolvedOptions.spinner) ? resolvedOptions.spinner : h(resolvedOptions.spinner) : h(YhSpin, {
                  tip: resolvedOptions.text,
                  size: resolvedOptions.fullscreen ? "large" : "default",
                  vertical: true,
                  color: resolvedOptions.color,
                  dot: resolvedOptions.dot,
                  type: resolvedOptions.spinnerType || "circle",
                  show: true
                })
              ])
            ]
          ) : null
        }
      );
    }
  };
  const container = document.createElement("div");
  container.style.display = "contents";
  const vnode = createVNode(component);
  if (appContext) {
    vnode.appContext = appContext;
  }
  render(vnode, container);
  let target = document.body;
  if (resolvedOptions.fullscreen) {
    target = document.body;
  } else if (resolvedOptions.target) {
    target = typeof resolvedOptions.target === "string" ? document.querySelector(resolvedOptions.target) : resolvedOptions.target;
  }
  if (!target) target = document.body;
  const isRelative = target.style.position === "relative" || target.classList.contains("yh-loading-parent--relative");
  if (!resolvedOptions.fullscreen && !isRelative) {
    target.classList.add("yh-loading-parent--relative");
  }
  target.appendChild(container);
  if (resolvedOptions.lock) {
    target.style.overflow = "hidden";
  }
  const instance = {
    close: () => {
      state.visible = false;
      setTimeout(() => {
        render(null, container);
        container.remove();
        if (!resolvedOptions.fullscreen) {
          target.classList.remove("yh-loading-parent--relative");
        }
        if (resolvedOptions.lock) {
          target.style.overflow = "";
        }
      }, 400);
    },
    get visible() {
      return state.visible;
    }
  };
  return instance;
};
export const Loading = {
  service: createLoading
};
