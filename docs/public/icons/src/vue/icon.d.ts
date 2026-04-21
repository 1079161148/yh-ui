import { PropType } from 'vue'
import { IconName, IconSize, IconColor, IconRotate } from '../types'
/**
 * 注入 spin 动画样式到 head（仅注入一次）
 */
declare function ensureSpinStyle(): void
/**
 * 解析图标名称为 Iconify 格式
 */
declare function resolveIconName(name: string): string
/**
 * 创建图标样式
 */
declare function createIconStyle(props: {
  size?: IconSize
  color?: IconColor
  rotate?: IconRotate
  spin?: boolean
}): Record<string, string> | undefined
/**
 * YhIcon Vue 组件
 * 保持与 @yh-ui/components 的 YhIcon 组件完全兼容
 */
export declare const YhIcon: import('vue').DefineComponent<
  import('vue').ExtractPropTypes<{
    /**
     * 图标名称
     * 支持格式：
     * - 简写名称（如：'home', 'search'）
     * - 带前缀的图标名（如：'mdi:home', 'ep:search'）
     */
    name: {
      type: PropType<IconName>
      default: string
    }
    /**
     * 直接使用 Iconify 图标（优先级高于 name）
     */
    icon: {
      type: PropType<IconName>
      default: string
    }
    /**
     * SVG 字符串（直接渲染 SVG）
     */
    svg: {
      type: StringConstructor
      default: string
    }
    /**
     * 图标组件（传入 Vue 组件）
     */
    component: {
      type: PropType<object | ((...args: unknown[]) => unknown)>
      default: undefined
    }
    /**
     * 图标尺寸
     */
    size: {
      type: PropType<IconSize>
      default: undefined
    }
    /**
     * 图标颜色
     */
    color: {
      type: PropType<IconColor>
      default: undefined
    }
    /**
     * 是否启用旋转动画
     */
    spin: {
      type: BooleanConstructor
      default: boolean
    }
    /**
     * 旋转角度（度数）
     */
    rotate: {
      type: PropType<IconRotate>
      default: number
    }
  }>,
  () => import('vue').VNode<
    import('vue').RendererNode,
    import('vue').RendererElement,
    {
      [key: string]: any
    }
  >,
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
      /**
       * 图标名称
       * 支持格式：
       * - 简写名称（如：'home', 'search'）
       * - 带前缀的图标名（如：'mdi:home', 'ep:search'）
       */
      name: {
        type: PropType<IconName>
        default: string
      }
      /**
       * 直接使用 Iconify 图标（优先级高于 name）
       */
      icon: {
        type: PropType<IconName>
        default: string
      }
      /**
       * SVG 字符串（直接渲染 SVG）
       */
      svg: {
        type: StringConstructor
        default: string
      }
      /**
       * 图标组件（传入 Vue 组件）
       */
      component: {
        type: PropType<object | ((...args: unknown[]) => unknown)>
        default: undefined
      }
      /**
       * 图标尺寸
       */
      size: {
        type: PropType<IconSize>
        default: undefined
      }
      /**
       * 图标颜色
       */
      color: {
        type: PropType<IconColor>
        default: undefined
      }
      /**
       * 是否启用旋转动画
       */
      spin: {
        type: BooleanConstructor
        default: boolean
      }
      /**
       * 旋转角度（度数）
       */
      rotate: {
        type: PropType<IconRotate>
        default: number
      }
    }>
  > &
    Readonly<{}>,
  {
    icon: string
    size: IconSize
    color: string
    spin: boolean
    rotate: number
    svg: string
    name: string
    component: object | ((...args: unknown[]) => unknown)
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
/**
 * Icon 组件 - YhIcon 的别名
 */
export declare const Icon: import('vue').DefineComponent<
  import('vue').ExtractPropTypes<{
    /**
     * 图标名称
     * 支持格式：
     * - 简写名称（如：'home', 'search'）
     * - 带前缀的图标名（如：'mdi:home', 'ep:search'）
     */
    name: {
      type: PropType<IconName>
      default: string
    }
    /**
     * 直接使用 Iconify 图标（优先级高于 name）
     */
    icon: {
      type: PropType<IconName>
      default: string
    }
    /**
     * SVG 字符串（直接渲染 SVG）
     */
    svg: {
      type: StringConstructor
      default: string
    }
    /**
     * 图标组件（传入 Vue 组件）
     */
    component: {
      type: PropType<object | ((...args: unknown[]) => unknown)>
      default: undefined
    }
    /**
     * 图标尺寸
     */
    size: {
      type: PropType<IconSize>
      default: undefined
    }
    /**
     * 图标颜色
     */
    color: {
      type: PropType<IconColor>
      default: undefined
    }
    /**
     * 是否启用旋转动画
     */
    spin: {
      type: BooleanConstructor
      default: boolean
    }
    /**
     * 旋转角度（度数）
     */
    rotate: {
      type: PropType<IconRotate>
      default: number
    }
  }>,
  () => import('vue').VNode<
    import('vue').RendererNode,
    import('vue').RendererElement,
    {
      [key: string]: any
    }
  >,
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
      /**
       * 图标名称
       * 支持格式：
       * - 简写名称（如：'home', 'search'）
       * - 带前缀的图标名（如：'mdi:home', 'ep:search'）
       */
      name: {
        type: PropType<IconName>
        default: string
      }
      /**
       * 直接使用 Iconify 图标（优先级高于 name）
       */
      icon: {
        type: PropType<IconName>
        default: string
      }
      /**
       * SVG 字符串（直接渲染 SVG）
       */
      svg: {
        type: StringConstructor
        default: string
      }
      /**
       * 图标组件（传入 Vue 组件）
       */
      component: {
        type: PropType<object | ((...args: unknown[]) => unknown)>
        default: undefined
      }
      /**
       * 图标尺寸
       */
      size: {
        type: PropType<IconSize>
        default: undefined
      }
      /**
       * 图标颜色
       */
      color: {
        type: PropType<IconColor>
        default: undefined
      }
      /**
       * 是否启用旋转动画
       */
      spin: {
        type: BooleanConstructor
        default: boolean
      }
      /**
       * 旋转角度（度数）
       */
      rotate: {
        type: PropType<IconRotate>
        default: number
      }
    }>
  > &
    Readonly<{}>,
  {
    icon: string
    size: IconSize
    color: string
    spin: boolean
    rotate: number
    svg: string
    name: string
    component: object | ((...args: unknown[]) => unknown)
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
/**
 * YhIcon Props 类型
 */
export type YhIconProps = InstanceType<typeof YhIcon>['$props']
/**
 * Internal helpers for unit tests only.
 * Keep runtime behavior unchanged while allowing precise branch tests.
 */
export declare const __test__: {
  ensureSpinStyle: typeof ensureSpinStyle
  resolveIconName: typeof resolveIconName
  createIconStyle: typeof createIconStyle
}
export {}
//# sourceMappingURL=icon.d.ts.map
