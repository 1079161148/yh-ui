import type { ResultProps } from './result'
declare var __VLS_1: {}, __VLS_3: {}, __VLS_5: {}, __VLS_7: {}, __VLS_9: {}
type __VLS_Slots = {} & {
  icon?: (props: typeof __VLS_1) => any
} & {
  title?: (props: typeof __VLS_3) => any
} & {
  'sub-title'?: (props: typeof __VLS_5) => any
} & {
  extra?: (props: typeof __VLS_7) => any
} & {
  default?: (props: typeof __VLS_9) => any
}
declare const __VLS_component: import('vue').DefineComponent<
  ResultProps,
  {},
  {},
  {},
  {},
  import('vue').ComponentOptionsMixin,
  import('vue').ComponentOptionsMixin,
  {},
  string,
  import('vue').PublicProps,
  Readonly<ResultProps> & Readonly<{}>,
  {
    icon: import('./result').ResultIconType
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
