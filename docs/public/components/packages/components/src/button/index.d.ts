/**
 * Button Component
 * @description 按钮组件导出
 */
import Button from './src/button.vue'
export declare const YhButton: import('@yh-ui/utils').SFCWithInstall<
  {
    new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<
      Readonly<import('./index.js').ButtonProps> &
        Readonly<{
          onClick?: ((event: MouseEvent) => any) | undefined
        }>,
      {
        ref: HTMLElement | undefined
        size: import('./index.js').ButtonSize
        type: import('./index.js').ButtonType
        disabled: boolean
      },
      {},
      {},
      {},
      import('vue').ComponentOptionsMixin,
      import('vue').ComponentOptionsMixin,
      {} & {
        click: (event: MouseEvent) => any
      },
      import('vue').PublicProps,
      {
        link: boolean
        loading: boolean
        tag: string | import('vue').Component
        text: boolean
        type: import('./index.js').ButtonType
        disabled: boolean
        circle: boolean
        round: boolean
        plain: boolean
        nativeType: import('./index.js').ButtonNativeType
        autofocus: boolean
        iconPosition: import('./index.js').IconPosition
        block: boolean
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
      Readonly<import('./index.js').ButtonProps> &
        Readonly<{
          onClick?: ((event: MouseEvent) => any) | undefined
        }>,
      {
        ref: HTMLElement | undefined
        size: import('./index.js').ButtonSize
        type: import('./index.js').ButtonType
        disabled: boolean
      },
      {},
      {},
      {},
      {
        link: boolean
        loading: boolean
        tag: string | import('vue').Component
        text: boolean
        type: import('./index.js').ButtonType
        disabled: boolean
        circle: boolean
        round: boolean
        plain: boolean
        nativeType: import('./index.js').ButtonNativeType
        autofocus: boolean
        iconPosition: import('./index.js').IconPosition
        block: boolean
      }
    >
    __isFragment?: never
    __isTeleport?: never
    __isSuspense?: never
  } & import('vue').ComponentOptionsBase<
    Readonly<import('./index.js').ButtonProps> &
      Readonly<{
        onClick?: ((event: MouseEvent) => any) | undefined
      }>,
    {
      ref: HTMLElement | undefined
      size: import('./index.js').ButtonSize
      type: import('./index.js').ButtonType
      disabled: boolean
    },
    {},
    {},
    {},
    import('vue').ComponentOptionsMixin,
    import('vue').ComponentOptionsMixin,
    {} & {
      click: (event: MouseEvent) => any
    },
    string,
    {
      link: boolean
      loading: boolean
      tag: string | import('vue').Component
      text: boolean
      type: import('./index.js').ButtonType
      disabled: boolean
      circle: boolean
      round: boolean
      plain: boolean
      nativeType: import('./index.js').ButtonNativeType
      autofocus: boolean
      iconPosition: import('./index.js').IconPosition
      block: boolean
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
        loading?: (props: {}) => any
      } & {
        icon?: (props: {}) => any
      } & {
        default?: (props: {}) => any
      } & {
        icon?: (props: {}) => any
      } & {
        suffixIcon?: (props: {}) => any
      }
    })
> &
  Record<string, unknown>
export default YhButton
export * from './src/button'
export type ButtonInstance = InstanceType<typeof Button>
export type YhButtonInstance = ButtonInstance
export type YhButtonProps = import('./src/button').ButtonProps
export type YhButtonEmits = import('./src/button').ButtonEmits
export type YhButtonSlots = import('./src/button').ButtonSlots
export type YhButtonExpose = import('./src/button').ButtonExpose
export type YhButtonType = import('./src/button').ButtonType
export type YhButtonSize = import('./src/button').ButtonSize
export type YhButtonNativeType = import('./src/button').ButtonNativeType
export type YhButtonIconPosition = import('./src/button').IconPosition
