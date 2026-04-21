import type { FormRule } from './form'
import type { ValidateStatus } from './form-item'
import { type ComponentThemeVars } from '@yh-ui/theme'
declare var __VLS_1: {}, __VLS_3: {}
type __VLS_Slots = {} & {
  label?: (props: typeof __VLS_1) => any
} & {
  default?: (props: typeof __VLS_3) => any
}
declare const __VLS_component: import('vue').DefineComponent<
  import('vue').ExtractPropTypes<{
    readonly prop: {
      readonly type: StringConstructor
      readonly default: ''
    }
    readonly label: {
      readonly type: StringConstructor
      readonly default: ''
    }
    readonly labelWidth: {
      readonly type: import('vue').PropType<string | number>
      readonly default: ''
    }
    readonly required: {
      readonly type: BooleanConstructor
      readonly default: false
    }
    readonly rules: {
      readonly type: import('vue').PropType<FormRule | FormRule[]>
      readonly default: () => never[]
    }
    readonly showMessage: {
      readonly type: BooleanConstructor
      readonly default: true
    }
    readonly size: {
      readonly type: import('vue').PropType<'large' | 'default' | 'small'>
      readonly default: ''
    }
    readonly validateTrigger: {
      readonly type: import('vue').PropType<string | string[]>
      readonly default: ''
    }
    readonly errorPosition: {
      readonly type: import('vue').PropType<'left' | 'center' | 'right'>
      readonly default: 'left'
    }
    readonly disabled: {
      readonly type: BooleanConstructor
      readonly default: false
    }
    readonly validateStatus: {
      readonly type: import('vue').PropType<ValidateStatus>
      readonly default: ''
    }
    readonly error: {
      readonly type: StringConstructor
      readonly default: ''
    }
    readonly themeOverrides: {
      readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
      readonly default: undefined
    }
  }>,
  {
    validate: (trigger?: string, callback?: (isValid: boolean) => void) => Promise<boolean>
    resetField: () => void
    clearValidate: () => void
    validateStatus: import('vue').ComputedRef<ValidateStatus>
    validateMessage: import('vue').ComputedRef<string>
    size: import('vue').ComputedRef<'large' | 'default' | 'small'>
  },
  {},
  {},
  {},
  import('vue').ComponentOptionsMixin,
  import('vue').ComponentOptionsMixin,
  {},
  string,
  import('vue').PublicProps,
  Readonly<
    import('vue').ExtractPropTypes<{
      readonly prop: {
        readonly type: StringConstructor
        readonly default: ''
      }
      readonly label: {
        readonly type: StringConstructor
        readonly default: ''
      }
      readonly labelWidth: {
        readonly type: import('vue').PropType<string | number>
        readonly default: ''
      }
      readonly required: {
        readonly type: BooleanConstructor
        readonly default: false
      }
      readonly rules: {
        readonly type: import('vue').PropType<FormRule | FormRule[]>
        readonly default: () => never[]
      }
      readonly showMessage: {
        readonly type: BooleanConstructor
        readonly default: true
      }
      readonly size: {
        readonly type: import('vue').PropType<'large' | 'default' | 'small'>
        readonly default: ''
      }
      readonly validateTrigger: {
        readonly type: import('vue').PropType<string | string[]>
        readonly default: ''
      }
      readonly errorPosition: {
        readonly type: import('vue').PropType<'left' | 'center' | 'right'>
        readonly default: 'left'
      }
      readonly disabled: {
        readonly type: BooleanConstructor
        readonly default: false
      }
      readonly validateStatus: {
        readonly type: import('vue').PropType<ValidateStatus>
        readonly default: ''
      }
      readonly error: {
        readonly type: StringConstructor
        readonly default: ''
      }
      readonly themeOverrides: {
        readonly type: import('vue').PropType<import('@yh-ui/theme').ComponentThemeVars>
        readonly default: undefined
      }
    }>
  > &
    Readonly<{}>,
  {
    readonly label: string
    readonly size: 'large' | 'default' | 'small'
    readonly error: string
    readonly required: boolean
    readonly disabled: boolean
    readonly themeOverrides: ComponentThemeVars
    readonly labelWidth: string | number
    readonly validateStatus: ValidateStatus
    readonly rules: FormRule | FormRule[]
    readonly showMessage: boolean
    readonly prop: string
    readonly validateTrigger: string | string[]
    readonly errorPosition: 'center' | 'left' | 'right'
  },
  {},
  {},
  {},
  string,
  import('vue').ComponentProvideOptions,
  true,
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
