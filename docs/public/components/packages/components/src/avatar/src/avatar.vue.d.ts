import type { AvatarProps } from './avatar'
declare var __VLS_5: {}
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_5) => any
}
declare const __VLS_component: import('vue').DefineComponent<
  AvatarProps,
  {},
  {},
  {},
  {},
  import('vue').ComponentOptionsMixin,
  import('vue').ComponentOptionsMixin,
  {} & {
    error: (event: Event) => any
  },
  string,
  import('vue').PublicProps,
  Readonly<AvatarProps> &
    Readonly<{
      onError?: ((event: Event) => any) | undefined
    }>,
  {
    size: import('./avatar').AvatarSize
    crossorigin: '' | 'anonymous' | 'use-credentials'
    fit: import('./avatar').AvatarFit
    shape: import('./avatar').AvatarShape
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
