import { defineComponent, h, computed } from 'vue'
import type { PropType, ExtractPropTypes } from 'vue'
import { useNamespace } from '@yh-ui/hooks'

export const dividerProps = {
  direction: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'horizontal'
  },
  contentPosition: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: 'center'
  },
  borderStyle: {
    type: String as PropType<'solid' | 'dashed' | 'dotted' | 'double'>,
    default: 'solid'
  },
  borderWidth: {
    type: [String, Number] as PropType<string | number>,
    default: ''
  },
  color: {
    type: String,
    default: ''
  }
} as const

export type DividerProps = ExtractPropTypes<typeof dividerProps>

export default defineComponent({
  name: 'YhDivider',
  props: dividerProps,
  setup(props, { slots }) {
    const ns = useNamespace('divider')
    const dividerStyle = computed(() => {
      return {
        '--yh-border-style': props.borderStyle
      }
    })

    return () =>
      h(
        'div',
        {
          class: [
            ns.b(),
            ns.m(props.direction),
            props.contentPosition !== 'center' ? ns.m(props.contentPosition) : '' // Element plus behavior
          ],
          style: dividerStyle.value
        },
        slots.default && props.direction !== 'vertical'
          ? h('div', { class: [ns.e('text'), ns.is(props.contentPosition)] }, slots.default())
          : null
      )
  }
})
