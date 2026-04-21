import type { TypographyTitleProps } from './typography'
declare var __VLS_6: {}, __VLS_8: {}, __VLS_10: {}
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_6) => any
} & {
  default?: (props: typeof __VLS_8) => any
} & {
  default?: (props: typeof __VLS_10) => any
}
declare const __VLS_component: import('vue').DefineComponent<
  TypographyTitleProps,
  {},
  {},
  {},
  {},
  import('vue').ComponentOptionsMixin,
  import('vue').ComponentOptionsMixin,
  {},
  string,
  import('vue').PublicProps,
  Readonly<TypographyTitleProps> & Readonly<{}>,
  {
    code: boolean
    mark: boolean
    delete: boolean
    bold: boolean
    italic: boolean
    underline: boolean
    ellipsis: boolean
    level: import('./typography').TypographyTitleLevel
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
