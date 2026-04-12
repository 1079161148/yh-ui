import {
  normalizeClass as _normalizeClass,
  normalizeStyle as _normalizeStyle,
  createElementVNode as _createElementVNode,
  vShow as _vShow,
  withDirectives as _withDirectives,
  Transition as _Transition,
  withCtx as _withCtx,
  openBlock as _openBlock,
  createBlock as _createBlock
} from 'vue'
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createBlock(
      _Transition,
      {
        name: $setup.ns.b('fade'),
        persisted: ''
      },
      {
        default: _withCtx(() => [
          _withDirectives(
            _createElementVNode(
              'div',
              {
                ref: 'instance',
                class: _normalizeClass([$setup.ns.e('bar'), $setup.ns.is($setup.bar.key)]),
                onMousedown: $setup.clickTrackHandler
              },
              [
                _createElementVNode(
                  'div',
                  {
                    ref: 'thumb',
                    class: _normalizeClass($setup.ns.e('thumb')),
                    style: _normalizeStyle($setup.thumbStyle),
                    onMousedown: $setup.clickThumbHandler
                  },
                  null,
                  38
                  /* CLASS, STYLE, NEED_HYDRATION */
                )
              ],
              34
              /* CLASS, NEED_HYDRATION */
            ),
            [[_vShow, $props.always || $setup.visible]]
          )
        ]),
        _: 1
        /* STABLE */
      },
      8,
      ['name']
    )
  )
}
import { computed, inject, onBeforeUnmount, ref } from 'vue'
import { BAR_MAP, renderThumbStyle } from './util.js'
import { SCROLLBAR_INJECTION_KEY } from './scrollbar-meta.js'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
const __sfc__ = {
  __name: 'thumb',
  props: {
    vertical: { type: Boolean, required: false, default: false },
    size: { type: String, required: true, default: '' },
    move: { type: Number, required: true, default: 0 },
    ratio: { type: Number, required: true },
    always: { type: Boolean, required: false, default: false }
  },
  setup(__props, { expose: __expose }) {
    const props = __props
    const ns = useNamespace('scrollbar')
    const scrollbar = inject(SCROLLBAR_INJECTION_KEY)
    if (!scrollbar) {
      throw new Error('YhThumb must be used within a YhScrollbar component')
    }
    const instance = ref()
    const thumb = ref()
    const thumbState = ref({})
    const visible = ref(false)
    let cursorDown = false
    let cursorLeave = false
    const bar = computed(() => BAR_MAP[props.vertical ? 'vertical' : 'horizontal'])
    const thumbStyle = computed(() =>
      renderThumbStyle({
        size: props.size,
        move: props.move,
        bar: bar.value
      })
    )
    const clickTrackHandler = (e) => {
      var _a
      if (
        !thumb.value ||
        !instance.value ||
        !((_a = scrollbar.wrapElement) == null ? void 0 : _a.value)
      )
        return
      const offset = Math.abs(
        e.target.getBoundingClientRect()[bar.value.direction] - e[bar.value.client]
      )
      const thumbHalf = thumb.value[bar.value.offset] / 2
      const thumbPositionPercentage =
        ((offset - thumbHalf) * 100 * props.ratio) / instance.value[bar.value.offset]
      scrollbar.wrapElement.value[bar.value.scroll] =
        (thumbPositionPercentage * scrollbar.wrapElement.value[bar.value.scrollSize]) / 100
    }
    const clickThumbHandler = (e) => {
      var _a
      e.stopPropagation()
      if (e.ctrlKey || [1, 2].includes(e.button)) return
      ;(_a = window.getSelection()) == null ? void 0 : _a.removeAllRanges()
      startDrag(e)
      const el = e.currentTarget
      if (!el) return
      thumbState.value[bar.value.axis] =
        el[bar.value.offset] -
        (e[bar.value.client] - el.getBoundingClientRect()[bar.value.direction])
    }
    const startDrag = (e) => {
      e.stopImmediatePropagation()
      cursorDown = true
      document.addEventListener('mousemove', mouseMoveDocumentHandler)
      document.addEventListener('mouseup', mouseUpDocumentHandler)
      document.onselectstart = () => false
    }
    const mouseMoveDocumentHandler = (e) => {
      var _a
      if (
        !instance.value ||
        !thumb.value ||
        !((_a = scrollbar.wrapElement) == null ? void 0 : _a.value)
      )
        return
      if (cursorDown === false) return
      const prevPage = thumbState.value[bar.value.axis]
      if (!prevPage) return
      const offset =
        (instance.value.getBoundingClientRect()[bar.value.direction] - e[bar.value.client]) * -1
      const thumbClickPosition = thumb.value[bar.value.offset] - prevPage
      const thumbPositionPercentage =
        ((offset - thumbClickPosition) * 100 * props.ratio) / instance.value[bar.value.offset]
      scrollbar.wrapElement.value[bar.value.scroll] =
        (thumbPositionPercentage * scrollbar.wrapElement.value[bar.value.scrollSize]) / 100
    }
    const mouseUpDocumentHandler = () => {
      cursorDown = false
      thumbState.value[bar.value.axis] = 0
      document.removeEventListener('mousemove', mouseMoveDocumentHandler)
      document.removeEventListener('mouseup', mouseUpDocumentHandler)
      document.onselectstart = null
      if (cursorLeave) visible.value = false
    }
    const mouseMoveScrollbarHandler = () => {
      cursorLeave = false
      visible.value = !!props.size
    }
    let timeout = null
    __expose({
      handleScrollbarAppearance: () => {
        if (timeout) clearTimeout(timeout)
        mouseMoveScrollbarHandler()
        timeout = setTimeout(() => {
          if (!cursorDown) visible.value = false
          timeout = null
        }, 1e3)
      }
    })
    onBeforeUnmount(() => {
      document.removeEventListener('mousemove', mouseMoveDocumentHandler)
      document.removeEventListener('mouseup', mouseUpDocumentHandler)
    })
    const __returned__ = {
      props,
      ns,
      scrollbar,
      instance,
      thumb,
      thumbState,
      visible,
      get cursorDown() {
        return cursorDown
      },
      set cursorDown(v) {
        cursorDown = v
      },
      get cursorLeave() {
        return cursorLeave
      },
      set cursorLeave(v) {
        cursorLeave = v
      },
      bar,
      thumbStyle,
      clickTrackHandler,
      clickThumbHandler,
      startDrag,
      mouseMoveDocumentHandler,
      mouseUpDocumentHandler,
      mouseMoveScrollbarHandler,
      get timeout() {
        return timeout
      },
      set timeout(v) {
        timeout = v
      },
      computed,
      inject,
      onBeforeUnmount,
      ref,
      get BAR_MAP() {
        return BAR_MAP
      },
      get renderThumbStyle() {
        return renderThumbStyle
      },
      get SCROLLBAR_INJECTION_KEY() {
        return SCROLLBAR_INJECTION_KEY
      },
      get useNamespace() {
        return useNamespace
      }
    }
    Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true })
    return __returned__
  }
}
__sfc__.render = render
var stdin_default = __sfc__
export { stdin_default as default }
