import Cascader from './src/cascader.vue'
import CascaderPanel from './src/cascader-panel.vue'
export declare const YhCascader: import('@yh-ui/utils').SFCWithInstall<
  {
    new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<
      Readonly<import('./index.js').CascaderProps> &
        Readonly<{
          onClear?: (() => any) | undefined
          onFocus?: ((event: FocusEvent) => any) | undefined
          onChange?: ((value: import('./index.js').CascaderValue | undefined) => any) | undefined
          onBlur?: ((event: FocusEvent) => any) | undefined
          'onUpdate:modelValue'?:
            | ((value: import('./index.js').CascaderValue | undefined) => any)
            | undefined
          'onVisible-change'?: ((visible: boolean) => any) | undefined
          'onExpand-change'?: ((value: (string | number)[]) => any) | undefined
        }>,
      {
        focus: () => void
        blur: () => void
        getCheckedNodes: (leafOnly?: boolean) => import('./index.js').CascaderOption[]
        inputRef: import('vue').Ref<HTMLInputElement | undefined>
      },
      {},
      {},
      {},
      import('vue').ComponentOptionsMixin,
      import('vue').ComponentOptionsMixin,
      {} & {
        clear: () => any
        focus: (event: FocusEvent) => any
        change: (value: import('./index.js').CascaderValue | undefined) => any
        blur: (event: FocusEvent) => any
        'update:modelValue': (value: import('./index.js').CascaderValue | undefined) => any
        'visible-change': (visible: boolean) => any
        'expand-change': (value: (string | number)[]) => any
      },
      import('vue').PublicProps,
      {
        size: import('./index.js').CascaderSize
        disabled: boolean
        clearable: boolean
        validateEvent: boolean
        separator: string
        multiple: boolean
        collapseTags: boolean
        collapseTagsTooltip: boolean
        maxCollapseTags: number
        teleported: boolean
        filterable: boolean
        tagType: import('./index.js').CascaderTagType
        virtual: boolean
        showAllLevels: boolean
        checkStrictly: boolean
        expandTrigger: import('./index.js').CascaderExpandTrigger
        emitPath: boolean
        virtualItemHeight: number
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
      Readonly<import('./index.js').CascaderProps> &
        Readonly<{
          onClear?: (() => any) | undefined
          onFocus?: ((event: FocusEvent) => any) | undefined
          onChange?: ((value: import('./index.js').CascaderValue | undefined) => any) | undefined
          onBlur?: ((event: FocusEvent) => any) | undefined
          'onUpdate:modelValue'?:
            | ((value: import('./index.js').CascaderValue | undefined) => any)
            | undefined
          'onVisible-change'?: ((visible: boolean) => any) | undefined
          'onExpand-change'?: ((value: (string | number)[]) => any) | undefined
        }>,
      {
        focus: () => void
        blur: () => void
        getCheckedNodes: (leafOnly?: boolean) => import('./index.js').CascaderOption[]
        inputRef: import('vue').Ref<HTMLInputElement | undefined>
      },
      {},
      {},
      {},
      {
        size: import('./index.js').CascaderSize
        disabled: boolean
        clearable: boolean
        validateEvent: boolean
        separator: string
        multiple: boolean
        collapseTags: boolean
        collapseTagsTooltip: boolean
        maxCollapseTags: number
        teleported: boolean
        filterable: boolean
        tagType: import('./index.js').CascaderTagType
        virtual: boolean
        showAllLevels: boolean
        checkStrictly: boolean
        expandTrigger: import('./index.js').CascaderExpandTrigger
        emitPath: boolean
        virtualItemHeight: number
      }
    >
    __isFragment?: never
    __isTeleport?: never
    __isSuspense?: never
  } & import('vue').ComponentOptionsBase<
    Readonly<import('./index.js').CascaderProps> &
      Readonly<{
        onClear?: (() => any) | undefined
        onFocus?: ((event: FocusEvent) => any) | undefined
        onChange?: ((value: import('./index.js').CascaderValue | undefined) => any) | undefined
        onBlur?: ((event: FocusEvent) => any) | undefined
        'onUpdate:modelValue'?:
          | ((value: import('./index.js').CascaderValue | undefined) => any)
          | undefined
        'onVisible-change'?: ((visible: boolean) => any) | undefined
        'onExpand-change'?: ((value: (string | number)[]) => any) | undefined
      }>,
    {
      focus: () => void
      blur: () => void
      getCheckedNodes: (leafOnly?: boolean) => import('./index.js').CascaderOption[]
      inputRef: import('vue').Ref<HTMLInputElement | undefined>
    },
    {},
    {},
    {},
    import('vue').ComponentOptionsMixin,
    import('vue').ComponentOptionsMixin,
    {} & {
      clear: () => any
      focus: (event: FocusEvent) => any
      change: (value: import('./index.js').CascaderValue | undefined) => any
      blur: (event: FocusEvent) => any
      'update:modelValue': (value: import('./index.js').CascaderValue | undefined) => any
      'visible-change': (visible: boolean) => any
      'expand-change': (value: (string | number)[]) => any
    },
    string,
    {
      size: import('./index.js').CascaderSize
      disabled: boolean
      clearable: boolean
      validateEvent: boolean
      separator: string
      multiple: boolean
      collapseTags: boolean
      collapseTagsTooltip: boolean
      maxCollapseTags: number
      teleported: boolean
      filterable: boolean
      tagType: import('./index.js').CascaderTagType
      virtual: boolean
      showAllLevels: boolean
      checkStrictly: boolean
      expandTrigger: import('./index.js').CascaderExpandTrigger
      emitPath: boolean
      virtualItemHeight: number
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
        empty?: (props: {}) => any
      } & {
        default?: (props: { node: any; data: any }) => any
      }
    })
> &
  Record<string, unknown>
export declare const YhCascaderPanel: import('@yh-ui/utils').SFCWithInstall<
  {
    new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<
      Readonly<{
        options?: import('./index.js').CascaderOption[]
        expandedPath: (string | number)[]
        config: import('./index.js').CascaderConfig
        isMultiple: boolean
        isChecked: (path: (string | number)[]) => boolean
        virtual?: boolean
        itemHeight?: number
      }> &
        Readonly<{
          onExpand?:
            | ((option: import('./index.js').CascaderOption, level: number) => any)
            | undefined
          onCheck?:
            | ((option: import('./index.js').CascaderOption, path: (string | number)[]) => any)
            | undefined
        }>,
      {},
      {},
      {},
      {},
      import('vue').ComponentOptionsMixin,
      import('vue').ComponentOptionsMixin,
      {} & {
        expand: (option: import('./index.js').CascaderOption, level: number) => any
        check: (option: import('./index.js').CascaderOption, path: (string | number)[]) => any
      },
      import('vue').PublicProps,
      {
        itemHeight: number
        options: import('./index.js').CascaderOption[]
        expandedPath: (string | number)[]
        isMultiple: boolean
        virtual: boolean
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
      Readonly<{
        options?: import('./index.js').CascaderOption[]
        expandedPath: (string | number)[]
        config: import('./index.js').CascaderConfig
        isMultiple: boolean
        isChecked: (path: (string | number)[]) => boolean
        virtual?: boolean
        itemHeight?: number
      }> &
        Readonly<{
          onExpand?:
            | ((option: import('./index.js').CascaderOption, level: number) => any)
            | undefined
          onCheck?:
            | ((option: import('./index.js').CascaderOption, path: (string | number)[]) => any)
            | undefined
        }>,
      {},
      {},
      {},
      {},
      {
        itemHeight: number
        options: import('./index.js').CascaderOption[]
        expandedPath: (string | number)[]
        isMultiple: boolean
        virtual: boolean
      }
    >
    __isFragment?: never
    __isTeleport?: never
    __isSuspense?: never
  } & import('vue').ComponentOptionsBase<
    Readonly<{
      options?: import('./index.js').CascaderOption[]
      expandedPath: (string | number)[]
      config: import('./index.js').CascaderConfig
      isMultiple: boolean
      isChecked: (path: (string | number)[]) => boolean
      virtual?: boolean
      itemHeight?: number
    }> &
      Readonly<{
        onExpand?: ((option: import('./index.js').CascaderOption, level: number) => any) | undefined
        onCheck?:
          | ((option: import('./index.js').CascaderOption, path: (string | number)[]) => any)
          | undefined
      }>,
    {},
    {},
    {},
    {},
    import('vue').ComponentOptionsMixin,
    import('vue').ComponentOptionsMixin,
    {} & {
      expand: (option: import('./index.js').CascaderOption, level: number) => any
      check: (option: import('./index.js').CascaderOption, path: (string | number)[]) => any
    },
    string,
    {
      itemHeight: number
      options: import('./index.js').CascaderOption[]
      expandedPath: (string | number)[]
      isMultiple: boolean
      virtual: boolean
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
        default?: (props: { node: any; data: any }) => any
      }
    })
> &
  Record<string, unknown>
export default YhCascader
export * from './src/cascader'
export type CascaderInstance = InstanceType<typeof Cascader>
export type CascaderPanelInstance = InstanceType<typeof CascaderPanel>
export type YhCascaderInstance = CascaderInstance
export type YhCascaderPanelInstance = CascaderPanelInstance
export type YhCascaderProps = import('./src/cascader').CascaderProps
export type YhCascaderEmits = import('./src/cascader').CascaderEmits
export type YhCascaderExpose = import('./src/cascader').CascaderExpose
export type YhCascaderOption = import('./src/cascader').CascaderOption
