import {
  normalizeStyle as _normalizeStyle,
  createElementVNode as _createElementVNode,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock
} from 'vue'
const _hoisted_1 = { class: 'yh-color-alpha-slider' }
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock('div', _hoisted_1, [
      _createElementVNode(
        'div',
        {
          ref: 'sliderRef',
          class: 'yh-color-alpha-slider__bar',
          style: _normalizeStyle($setup.backgroundStyle),
          onMousedown: $setup.handleMouseDown
        },
        null,
        36
        /* STYLE, NEED_HYDRATION */
      ),
      _createElementVNode(
        'div',
        {
          class: 'yh-color-alpha-slider__handle',
          style: _normalizeStyle($setup.handleStyle)
        },
        null,
        4
        /* STYLE */
      )
    ])
  )
}
import { ref, computed } from 'vue'
const __sfc__ = {
  __name: 'alpha-slider',
  props: {
    a: { type: Number, required: true },
    color: { type: String, required: true }
  },
  emits: ['update'],
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose()
    const props = __props
    const emit = __emit
    const sliderRef = ref()
    const backgroundStyle = computed(() => ({
      background: `linear-gradient(to right, rgba(255,255,255,0) 0%, ${props.color} 100%)`
    }))
    const handleStyle = computed(() => ({
      left: `${props.a * 100}%`
    }))
    const handleDrag = (event) => {
      var _a
      if (!sliderRef.value) return
      const rect = sliderRef.value.getBoundingClientRect()
      const clientX = (_a = event.clientX) != null ? _a : event.touches[0].clientX
      let left = (clientX - rect.left) / rect.width
      left = Math.max(0, Math.min(1, left))
      emit('update', Number(left.toFixed(2)))
    }
    const handleMouseDown = (event) => {
      handleDrag(event)
      const onMouseMove = (e) => handleDrag(e)
      const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)
      }
      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)
    }
    const __returned__ = {
      props,
      emit,
      sliderRef,
      backgroundStyle,
      handleStyle,
      handleDrag,
      handleMouseDown,
      ref,
      computed
    }
    Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true })
    return __returned__
  }
}
__sfc__.render = render
var stdin_default = __sfc__
export { stdin_default as default }
