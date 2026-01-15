import { defineComponent, h, computed, provide, toRefs } from 'vue'
import type { PropType, ExtractPropTypes, InjectionKey, ComputedRef } from 'vue'
import { useNamespace } from '@yh-ui/hooks'

export const rowProps = {
  tag: {
    type: String,
    default: 'div'
  },
  gutter: {
    type: Number,
    default: 0
  },
  justify: {
    type: String as PropType<
      'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly'
    >,
    default: 'start'
  },
  align: {
    type: String as PropType<'top' | 'middle' | 'bottom'>,
    default: 'top'
  }
} as const

export type RowProps = ExtractPropTypes<typeof rowProps>

export interface RowContext {
  gutter: ComputedRef<number>
}

export const rowContextKey: InjectionKey<RowContext> = Symbol('rowContextKey')

export default defineComponent({
  name: 'YhRow',
  props: rowProps,
  setup(props, { slots }) {
    const ns = useNamespace('row')
    const gutter = computed(() => props.gutter)

    provide(rowContextKey, {
      gutter
    })

    const style = computed(() => {
      const styles: Record<string, string> = {}
      if (!props.gutter) {
        return styles
      }
      styles.marginRight = styles.marginLeft = `-${props.gutter / 2}px`
      return styles
    })

    const classes = computed(() => [
      ns.b(),
      ns.is(`justify-${props.justify}`, props.justify !== 'start'),
      ns.is(`align-${props.align}`, props.align !== 'top')
    ])

    return () =>
      h(
        props.tag,
        {
          class: classes.value,
          style: style.value
        },
        slots.default?.()
      )
  }
})
