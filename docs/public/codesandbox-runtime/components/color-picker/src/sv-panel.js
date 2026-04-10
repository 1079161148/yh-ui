import {
  createElementVNode as _createElementVNode,
  normalizeStyle as _normalizeStyle,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock
} from 'vue'
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      'div',
      {
        ref: 'panelRef',
        class: 'yh-color-sv-panel',
        style: _normalizeStyle($setup.backgroundStyle),
        onMousedown: $setup.handleMouseDown
      },
      [
        _cache[0] ||
          (_cache[0] = _createElementVNode(
            'div',
            { class: 'yh-color-sv-panel__white' },
            null,
            -1
            /* CACHED */
          )),
        _cache[1] ||
          (_cache[1] = _createElementVNode(
            'div',
            { class: 'yh-color-sv-panel__black' },
            null,
            -1
            /* CACHED */
          )),
        _createElementVNode(
          'div',
          {
            class: 'yh-color-sv-panel__cursor',
            style: _normalizeStyle($setup.cursorStyle)
          },
          null,
          4
          /* STYLE */
        )
      ],
      36
      /* STYLE, NEED_HYDRATION */
    )
  )
}
import { ref, computed } from 'vue'
const __sfc__ = {
  __name: 'sv-panel',
  props: {
    h: { type: Number, required: true },
    s: { type: Number, required: true },
    v: { type: Number, required: true }
  },
  emits: ['update'],
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose()
    const props = __props
    const emit = __emit
    const panelRef = ref()
    const cursorStyle = computed(() => ({
      left: `${props.s}%`,
      top: `${100 - props.v}%`
    }))
    const backgroundStyle = computed(() => ({
      backgroundColor: `hsl(${props.h}, 100%, 50%)`
    }))
    const handleDrag = (event) => {
      var _a, _b
      if (!panelRef.value) return
      const rect = panelRef.value.getBoundingClientRect()
      const clientX = (_a = event.clientX) != null ? _a : event.touches[0].clientX
      const clientY = (_b = event.clientY) != null ? _b : event.touches[0].clientY
      let left = ((clientX - rect.left) / rect.width) * 100
      let top = ((clientY - rect.top) / rect.height) * 100
      left = Math.max(0, Math.min(100, left))
      top = Math.max(0, Math.min(100, top))
      emit('update', Math.round(left), Math.round(100 - top))
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
      panelRef,
      cursorStyle,
      backgroundStyle,
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
