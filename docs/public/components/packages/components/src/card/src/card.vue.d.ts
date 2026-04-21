import type { CardProps } from './card'
declare var __VLS_1: {}, __VLS_3: {}, __VLS_5: {}, __VLS_7: {}
type __VLS_Slots = {} & {
  header?: (props: typeof __VLS_1) => any
} & {
  extra?: (props: typeof __VLS_3) => any
} & {
  default?: (props: typeof __VLS_5) => any
} & {
  footer?: (props: typeof __VLS_7) => any
}
declare const __VLS_component: import('vue').DefineComponent<
  CardProps,
  {},
  {},
  {},
  {},
  import('vue').ComponentOptionsMixin,
  import('vue').ComponentOptionsMixin,
  {},
  string,
  import('vue').PublicProps,
  Readonly<CardProps> & Readonly<{}>,
  {
    size: 'small' | 'default' | 'large'
    loading: boolean
    bodyPadding: boolean
    bordered: boolean
    shadow: import('./card').CardShadow
    hoverable: boolean
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
