import type { SpaceProps } from './space'
declare var __VLS_5: {}, __VLS_7: {}
type __VLS_Slots = {} & {
  spacer?: (props: typeof __VLS_5) => any
} & {
  default?: (props: typeof __VLS_7) => any
}
declare const __VLS_component: import('vue').DefineComponent<
  SpaceProps,
  {},
  {},
  {},
  {},
  import('vue').ComponentOptionsMixin,
  import('vue').ComponentOptionsMixin,
  {},
  string,
  import('vue').PublicProps,
  Readonly<SpaceProps> & Readonly<{}>,
  {
    size: import('./space').SpaceSize | [import('./space').SpaceSize, import('./space').SpaceSize]
    fill: boolean
    direction: import('./space').SpaceDirection
    wrap: boolean
    justify: import('./space').SpaceJustify
    align: import('./space').SpaceAlign
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
