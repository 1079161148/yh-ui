/**
 * Tag Component
 * @description 标签组件导出
 */
import Tag from './src/tag.vue'
export declare const YhTag: import('@yh-ui/utils').SFCWithInstall<
  {
    new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<
      Readonly<import('./index.js').TagProps> &
        Readonly<{
          onClose?: ((event: MouseEvent) => any) | undefined
          onEdit?: ((value: string) => any) | undefined
          onChange?: ((checked: boolean) => any) | undefined
          onClick?: ((event: MouseEvent) => any) | undefined
          'onUpdate:checked'?: ((checked: boolean) => any) | undefined
        }>,
      {},
      {},
      {},
      {},
      import('vue').ComponentOptionsMixin,
      import('vue').ComponentOptionsMixin,
      {} & {
        close: (event: MouseEvent) => any
        edit: (value: string) => any
        change: (checked: boolean) => any
        click: (event: MouseEvent) => any
        'update:checked': (checked: boolean) => any
      },
      import('vue').PublicProps,
      {
        size: import('./index.js').TagSize
        effect: import('./index.js').TagEffect
        type: import('./index.js').TagType
        round: boolean
        closable: boolean
        checked: boolean
        disableTransitions: boolean
        hit: boolean
        checkable: boolean
        editable: boolean
      },
      false,
      {},
      {},
      import('vue').GlobalComponents,
      import('vue').GlobalDirectives,
      string,
      {},
      any,
      import('vue').ComponentProvideOptions,
      {
        P: {}
        B: {}
        D: {}
        C: {}
        M: {}
        Defaults: {}
      },
      Readonly<import('./index.js').TagProps> &
        Readonly<{
          onClose?: ((event: MouseEvent) => any) | undefined
          onEdit?: ((value: string) => any) | undefined
          onChange?: ((checked: boolean) => any) | undefined
          onClick?: ((event: MouseEvent) => any) | undefined
          'onUpdate:checked'?: ((checked: boolean) => any) | undefined
        }>,
      {},
      {},
      {},
      {},
      {
        size: import('./index.js').TagSize
        effect: import('./index.js').TagEffect
        type: import('./index.js').TagType
        round: boolean
        closable: boolean
        checked: boolean
        disableTransitions: boolean
        hit: boolean
        checkable: boolean
        editable: boolean
      }
    >
    __isFragment?: never
    __isTeleport?: never
    __isSuspense?: never
  } & import('vue').ComponentOptionsBase<
    Readonly<import('./index.js').TagProps> &
      Readonly<{
        onClose?: ((event: MouseEvent) => any) | undefined
        onEdit?: ((value: string) => any) | undefined
        onChange?: ((checked: boolean) => any) | undefined
        onClick?: ((event: MouseEvent) => any) | undefined
        'onUpdate:checked'?: ((checked: boolean) => any) | undefined
      }>,
    {},
    {},
    {},
    {},
    import('vue').ComponentOptionsMixin,
    import('vue').ComponentOptionsMixin,
    {} & {
      close: (event: MouseEvent) => any
      edit: (value: string) => any
      change: (checked: boolean) => any
      click: (event: MouseEvent) => any
      'update:checked': (checked: boolean) => any
    },
    string,
    {
      size: import('./index.js').TagSize
      effect: import('./index.js').TagEffect
      type: import('./index.js').TagType
      round: boolean
      closable: boolean
      checked: boolean
      disableTransitions: boolean
      hit: boolean
      checkable: boolean
      editable: boolean
    },
    {},
    string,
    {},
    import('vue').GlobalComponents,
    import('vue').GlobalDirectives,
    string,
    import('vue').ComponentProvideOptions
  > &
    import('vue').VNodeProps &
    import('vue').AllowedComponentProps &
    import('vue').ComponentCustomProps &
    (new () => {
      $slots: {
        icon?: (props: {}) => any
      } & {
        default?: (props: {}) => any
      } & {
        suffixIcon?: (props: {}) => any
      } & {
        closeIcon?: (props: {}) => any
      }
    })
> &
  Record<string, unknown>
export default YhTag
export * from './src/tag'
export type TagInstance = InstanceType<typeof Tag>
export type YhTagInstance = TagInstance
export type YhTagProps = import('./src/tag').TagProps
export type YhTagEmits = import('./src/tag').TagEmits
export type YhTagSlots = import('./src/tag').TagSlots
export type YhTagType = import('./src/tag').TagType
export type YhTagSize = import('./src/tag').TagSize
export type YhTagEffect = import('./src/tag').TagEffect
