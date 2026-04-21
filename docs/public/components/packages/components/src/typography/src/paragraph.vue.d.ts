import type { TypographyParagraphProps } from './typography'
declare var __VLS_1: {}, __VLS_3: {}
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_1) => any
} & {
  default?: (props: typeof __VLS_3) => any
}
declare const __VLS_component: import('vue').DefineComponent<
  TypographyParagraphProps,
  {},
  {},
  {},
  {},
  import('vue').ComponentOptionsMixin,
  import('vue').ComponentOptionsMixin,
  {},
  string,
  import('vue').PublicProps,
  Readonly<TypographyParagraphProps> & Readonly<{}>,
  {
    mark: boolean
    delete: boolean
    bold: boolean
    italic: boolean
    ellipsis: boolean | number
    spacing: 'compact' | 'default' | 'loose'
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
