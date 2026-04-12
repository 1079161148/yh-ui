import { renderSlot as _renderSlot, normalizeClass as _normalizeClass, createElementVNode as _createElementVNode, toDisplayString as _toDisplayString, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, Transition as _Transition, withCtx as _withCtx, createVNode as _createVNode, normalizeStyle as _normalizeStyle } from "vue";
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock(), _createElementBlock(
    "div",
    {
      ref: "button",
      class: _normalizeClass([$setup.ns.e("button-wrapper"), $setup.ns.is("dragging", $setup.dragging)]),
      style: _normalizeStyle($setup.wrapperStyle),
      onMouseenter: $setup.handleMouseEnter,
      onMouseleave: $setup.handleMouseLeave,
      onMousedown: $setup.onButtonDown,
      onTouchstart: $setup.onButtonDown
    },
    [
      _renderSlot(_ctx.$slots, "thumb", { value: $props.modelValue }, () => [
        _createElementVNode(
          "div",
          {
            class: _normalizeClass([$setup.ns.e("button"), $setup.ns.is("hover", $setup.hovering), $setup.ns.is("dragging", $setup.dragging)])
          },
          null,
          2
          /* CLASS */
        )
      ]),
      _createVNode(_Transition, { name: "yh-fade" }, {
        default: _withCtx(() => [
          $setup.tooltipVisible ? (_openBlock(), _createElementBlock(
            "div",
            {
              key: 0,
              class: _normalizeClass([$setup.ns.e("tooltip"), $props.tooltipClass])
            },
            [
              _createElementVNode(
                "div",
                {
                  class: _normalizeClass($setup.ns.e("tooltip-content"))
                },
                _toDisplayString($setup.displayValue),
                3
                /* TEXT, CLASS */
              ),
              _createElementVNode(
                "div",
                {
                  class: _normalizeClass($setup.ns.e("tooltip-arrow"))
                },
                null,
                2
                /* CLASS */
              )
            ],
            2
            /* CLASS */
          )) : _createCommentVNode("v-if", true)
        ]),
        _: 1
        /* STABLE */
      })
    ],
    38
    /* CLASS, STYLE, NEED_HYDRATION */
  );
}
import { ref, computed, onBeforeUnmount, inject } from "vue";
import { useNamespace } from "../../../hooks/use-namespace/index.js";
const __sfc__ = {
  __name: "slider-button",
  props: {
    modelValue: { type: Number, required: true },
    vertical: { type: Boolean, required: true, default: false },
    disabled: { type: Boolean, required: true, default: false },
    min: { type: Number, required: true },
    max: { type: Number, required: true },
    step: { type: Number, required: true },
    showTooltip: { type: Boolean, required: true, default: true },
    formatTooltip: { type: Function, required: false, default: void 0 },
    tooltipClass: { type: String, required: false, default: void 0 },
    placement: { type: String, required: false, default: "top" }
  },
  emits: ["update:modelValue", "input", "change"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("slider");
    const slider = inject("slider");
    const dragging = ref(false);
    const hovering = ref(false);
    const isClick = ref(false);
    const startX = ref(0);
    const startY = ref(0);
    const startPosition = ref(0);
    const newPosition = ref(0);
    const tooltipVisible = computed(() => props.showTooltip && (dragging.value || hovering.value));
    const currentPosition = computed(() => {
      return `${(props.modelValue - props.min) / (props.max - props.min) * 100}%`;
    });
    const wrapperStyle = computed(() => {
      return props.vertical ? { bottom: currentPosition.value, top: "auto" } : { left: currentPosition.value, top: "50%" };
    });
    const displayValue = computed(() => {
      if (props.formatTooltip) {
        return props.formatTooltip(props.modelValue);
      }
      return props.modelValue;
    });
    const handleMouseEnter = () => {
      hovering.value = true;
    };
    const handleMouseLeave = () => {
      hovering.value = false;
    };
    const onButtonDown = (event) => {
      if (props.disabled) return;
      event.preventDefault();
      onDragStart(event);
      window.addEventListener("mousemove", onDragging);
      window.addEventListener("touchmove", onDragging);
      window.addEventListener("mouseup", onDragEnd);
      window.addEventListener("touchend", onDragEnd);
      window.addEventListener("contextmenu", onDragEnd);
    };
    const onDragStart = (event) => {
      dragging.value = true;
      isClick.value = true;
      if (event instanceof MouseEvent) {
        startX.value = event.clientX;
        startY.value = event.clientY;
      } else {
        startX.value = event.touches[0].clientX;
        startY.value = event.touches[0].clientY;
      }
      startPosition.value = parseFloat(currentPosition.value);
      newPosition.value = startPosition.value;
    };
    const onDragging = (event) => {
      if (dragging.value) {
        isClick.value = false;
        let diff = 0;
        const sliderSize = getSliderSize();
        if (sliderSize > 0) {
          if (event instanceof MouseEvent) {
            if (props.vertical) {
              diff = (startY.value - event.clientY) / sliderSize * 100;
            } else {
              diff = (event.clientX - startX.value) / sliderSize * 100;
            }
          } else {
            if (props.vertical) {
              diff = (startY.value - event.touches[0].clientY) / sliderSize * 100;
            } else {
              diff = (event.touches[0].clientX - startX.value) / sliderSize * 100;
            }
          }
          newPosition.value = startPosition.value + diff;
          setPosition(newPosition.value);
        }
      }
    };
    const onDragEnd = () => {
      if (dragging.value) {
        setTimeout(() => {
          dragging.value = false;
          if (!isClick.value) {
            setPosition(newPosition.value);
          }
          emit("change", props.modelValue);
        }, 0);
        window.removeEventListener("mousemove", onDragging);
        window.removeEventListener("touchmove", onDragging);
        window.removeEventListener("mouseup", onDragEnd);
        window.removeEventListener("touchend", onDragEnd);
        window.removeEventListener("contextmenu", onDragEnd);
      }
    };
    const getSliderSize = () => {
      var _a;
      if (!((_a = slider == null ? void 0 : slider.sliderRef) == null ? void 0 : _a.value)) return 0;
      return props.vertical ? slider.sliderRef.value.offsetHeight : slider.sliderRef.value.offsetWidth;
    };
    const setPosition = (percent) => {
      if (percent < 0) percent = 0;
      if (percent > 100) percent = 100;
      const lengthPerStep = 100 / ((props.max - props.min) / props.step);
      const steps = Math.round(percent / lengthPerStep);
      let value = steps * lengthPerStep * (props.max - props.min) * 0.01 + props.min;
      value = parseFloat(value.toFixed(getPrecision(props.step)));
      if (value !== props.modelValue) {
        emit("update:modelValue", value);
        emit("input", value);
      }
    };
    const getPrecision = (step) => {
      const stepStr = step.toString();
      const dotIndex = stepStr.indexOf(".");
      return dotIndex > -1 ? stepStr.length - dotIndex - 1 : 0;
    };
    onBeforeUnmount(() => {
      window.removeEventListener("mousemove", onDragging);
      window.removeEventListener("touchmove", onDragging);
      window.removeEventListener("mouseup", onDragEnd);
      window.removeEventListener("touchend", onDragEnd);
      window.removeEventListener("contextmenu", onDragEnd);
    });
    __expose({
      onButtonDown
    });
    const __returned__ = { props, emit, ns, slider, dragging, hovering, isClick, startX, startY, startPosition, newPosition, tooltipVisible, currentPosition, wrapperStyle, displayValue, handleMouseEnter, handleMouseLeave, onButtonDown, onDragStart, onDragging, onDragEnd, getSliderSize, setPosition, getPrecision, ref, computed, onBeforeUnmount, inject, get useNamespace() {
      return useNamespace;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
__sfc__.render = render;
var stdin_default = __sfc__;
export {
  stdin_default as default
};
