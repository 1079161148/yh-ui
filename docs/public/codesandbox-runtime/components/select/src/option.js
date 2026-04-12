import {
  createCommentVNode as _createCommentVNode,
  renderSlot as _renderSlot,
  vShow as _vShow,
  createElementVNode as _createElementVNode,
  withDirectives as _withDirectives,
  Fragment as _Fragment,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock
} from 'vue'
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      _Fragment,
      null,
      [
        _createCommentVNode(
          ' \u8FD9\u4E2A\u7EC4\u4EF6\u5728 Select \u5185\u90E8\u662F\u4EE5\u6570\u636E\u5F62\u5F0F\u5B58\u5728\u7684\uFF0C\u5176 template \u4EC5\u4F5C\u4E3A slot \u5185\u5BB9\u5BB9\u5668 '
        ),
        _withDirectives(
          _createElementVNode(
            'div',
            null,
            [_renderSlot(_ctx.$slots, 'default')],
            512
            /* NEED_PATCH */
          ),
          [[_vShow, false]]
        )
      ],
      2112
      /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
    )
  )
}
import { computed, inject, onMounted, onBeforeUnmount, useSlots } from 'vue'
import { SelectContextKey } from './select-meta.js'
const __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhOption'
  },
  {
    __name: 'option',
    props: {
      value: { type: [String, Number, Boolean], required: true },
      label: { type: String, required: false },
      disabled: { type: Boolean, required: false, default: false }
    },
    setup(__props, { expose: __expose }) {
      __expose()
      const props = __props
      const select = inject(SelectContextKey, null)
      const slots = useSlots()
      const optionData = computed(() => ({
        value: props.value,
        // 逻辑修正：优先使用 label 属性
        label: props.label || (slots.default ? ' ' : String(props.value)),
        disabled: props.disabled
      }))
      onMounted(() => {
        if (select) {
          select.onOptionCreate(optionData.value)
        }
      })
      onBeforeUnmount(() => {
        if (select) {
          select.onOptionDestroy(props.value)
        }
      })
      const __returned__ = {
        props,
        select,
        slots,
        optionData,
        computed,
        inject,
        onMounted,
        onBeforeUnmount,
        useSlots,
        get SelectContextKey() {
          return SelectContextKey
        }
      }
      Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true })
      return __returned__
    }
  }
)
__sfc__.render = render
var stdin_default = __sfc__
export { stdin_default as default }
