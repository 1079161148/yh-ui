import { normalizeStyle as _normalizeStyle, createElementVNode as _createElementVNode, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue";
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock(), _createElementBlock(
    "div",
    {
      ref: "sliderRef",
      class: "yh-color-hue-slider",
      onMousedown: $setup.handleMouseDown
    },
    [
      _createElementVNode(
        "div",
        {
          class: "yh-color-hue-slider__handle",
          style: _normalizeStyle($setup.handleStyle)
        },
        null,
        4
        /* STYLE */
      )
    ],
    544
    /* NEED_HYDRATION, NEED_PATCH */
  );
}
import { ref, computed } from "vue";
const __sfc__ = {
  __name: "hue-slider",
  props: {
    h: { type: Number, required: true }
  },
  emits: ["update"],
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const props = __props;
    const emit = __emit;
    const sliderRef = ref();
    const handleStyle = computed(() => ({
      left: `${props.h / 360 * 100}%`
    }));
    const handleDrag = (event) => {
      var _a;
      if (!sliderRef.value) return;
      const rect = sliderRef.value.getBoundingClientRect();
      const clientX = (_a = event.clientX) != null ? _a : event.touches[0].clientX;
      let left = (clientX - rect.left) / rect.width * 100;
      left = Math.max(0, Math.min(100, left));
      emit("update", Math.round(left / 100 * 360));
    };
    const handleMouseDown = (event) => {
      handleDrag(event);
      const onMouseMove = (e) => handleDrag(e);
      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    };
    const __returned__ = { props, emit, sliderRef, handleStyle, handleDrag, handleMouseDown, ref, computed };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
__sfc__.render = render;
var stdin_default = __sfc__;
export {
  stdin_default as default
};
