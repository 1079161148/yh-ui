import type { CascaderOption, CascaderConfig } from './cascader'
type __VLS_Props = {
  options?: CascaderOption[]
  expandedPath: (string | number)[]
  config: CascaderConfig
  isMultiple: boolean
  isChecked: (path: (string | number)[]) => boolean
  /** 是否启用虚拟滚动 */
  virtual?: boolean
  /** 虚拟滚动每项高度 */
  itemHeight?: number
}
declare var __VLS_5: {
  node: any
  data: any
}
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_5) => any
}
declare const __VLS_component: import('vue').DefineComponent<
  __VLS_Props,
  {},
  {},
  {},
  {},
  import('vue').ComponentOptionsMixin,
  import('vue').ComponentOptionsMixin,
  {} & {
    expand: (option: CascaderOption, level: number) => any
    check: (option: CascaderOption, path: (string | number)[]) => any
  },
  string,
  import('vue').PublicProps,
  Readonly<__VLS_Props> &
    Readonly<{
      onExpand?: ((option: CascaderOption, level: number) => any) | undefined
      onCheck?: ((option: CascaderOption, path: (string | number)[]) => any) | undefined
    }>,
  {
    itemHeight: number
    options: CascaderOption[]
    expandedPath: (string | number)[]
    isMultiple: boolean
    virtual: boolean
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
