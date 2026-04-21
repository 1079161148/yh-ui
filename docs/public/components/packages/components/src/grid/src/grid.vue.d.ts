import type { GridProps } from './grid'
declare var __VLS_1: {}
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_1) => any
}
declare const __VLS_component: import('vue').DefineComponent<
  GridProps,
  {},
  {},
  {},
  {},
  import('vue').ComponentOptionsMixin,
  import('vue').ComponentOptionsMixin,
  {},
  string,
  import('vue').PublicProps,
  Readonly<GridProps> & Readonly<{}>,
  {
    gap: number | string | [number | string, number | string]
    rowGap: number | string
    collapsed: boolean
    cols: number | string
    colGap: number | string
    collapsedRows: number
  },
  {},
  {},
  {},
  string,
  import('vue').ComponentProvideOptions,
  false,
  {},
  any
>
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>
export default _default
type __VLS_WithSlots<T, S> = T & {
  new (): {
    $slots: S
  }
}
