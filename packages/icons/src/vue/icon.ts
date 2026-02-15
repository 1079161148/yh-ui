/**
 * YhIcon Vue 组件
 *
 * 继承自 @yh-ui/components 的 YhIcon 组件
 * 添加 Iconify 图标支持
 *
 * @example
 * ```vue
 * <script setup>
 * import { Icon } from '@yh-ui/icons'
 * </script>
 *
 * <template>
 *   <!-- 使用前缀:图标名格式 -->
 *   <Icon icon="mdi:home" />
 *
 *   <!-- 使用简写名称（需要配置默认图标集） -->
 *   <Icon name="home" />
 *
 *   <!-- 使用自定义尺寸和颜色 -->
 *   <Icon icon="mdi:home" :size="24" color="#ff0000" />
 *
 *   <!-- 旋转图标 -->
 *   <Icon icon="mdi:loading" :rotate="90" />
 *
 *   <!-- 旋转动画 -->
 *   <Icon icon="mdi:loading" spin />
 * </template>
 */
import { h, defineComponent, computed, onMounted } from 'vue'
import type { PropType } from 'vue'
import { Icon as IconifyIcon } from '@iconify/vue'
import { COMMON_ICONS } from '../presets'
import type { IconName, IconSize, IconColor, IconRotate } from '../types'

// spin 动画样式 CSS 字符串
const SPIN_STYLE_ID = 'yh-icon-spin-style'
const spinStyleContent = `
@keyframes yh-icon-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.yh-icons--spin {
  animation: yh-icon-spin 1s linear infinite;
}
`

/**
 * 注入 spin 动画样式到 head（仅注入一次）
 */
function ensureSpinStyle(): void {
  if (typeof document === 'undefined') return
  if (document.getElementById(SPIN_STYLE_ID)) return

  const style = document.createElement('style')
  style.id = SPIN_STYLE_ID
  style.textContent = spinStyleContent
  document.head.appendChild(style)
}

/**
 * 解析图标名称为 Iconify 格式
 */
function resolveIconName(name: string): string {
  if (!name) return ''

  // 如果是带前缀的格式，直接返回
  if (name.includes(':') || name.includes('/')) {
    return name.replace('/', ':')
  }

  // 检查是否是常用图标别名
  if (name in COMMON_ICONS) {
    return COMMON_ICONS[name as keyof typeof COMMON_ICONS]
  }

  // 默认使用 mdi 前缀
  return `mdi:${name}`
}

/**
 * 创建图标样式
 */
function createIconStyle(props: {
  size?: IconSize
  color?: IconColor
  rotate?: IconRotate
  spin?: boolean
}): Record<string, string> | undefined {
  const style: Record<string, string> = {}

  if (props.size) {
    const size = typeof props.size === 'number' ? `${props.size}px` : props.size
    style.width = size
    style.height = size
    style.fontSize = size
  }

  if (props.color) {
    style.color = props.color
  }

  // 只有非 spin 状态下才应用静态 rotate
  // spin 状态下 CSS animation 控制旋转
  if (props.rotate && !props.spin) {
    style.transform = `rotate(${props.rotate}deg)`
  }

  return Object.keys(style).length > 0 ? style : undefined
}

/**
 * YhIcon Vue 组件
 * 保持与 @yh-ui/components 的 YhIcon 组件完全兼容
 */
export const YhIcon = defineComponent({
  name: 'YhIconIconify',
  inheritAttrs: false,
  props: {
    /**
     * 图标名称
     * 支持格式：
     * - 简写名称（如：'home', 'search'）
     * - 带前缀的图标名（如：'mdi:home', 'ep:search'）
     */
    name: {
      type: String as PropType<IconName>,
      default: ''
    },
    /**
     * 直接使用 Iconify 图标（优先级高于 name）
     */
    icon: {
      type: String as PropType<IconName>,
      default: ''
    },
    /**
     * SVG 字符串（直接渲染 SVG）
     */
    svg: {
      type: String,
      default: ''
    },
    /**
     * 图标组件（传入 Vue 组件）
     */
    component: {
      type: [Object, Function] as PropType<object | Function>,
      default: undefined
    },
    /**
     * 图标尺寸
     */
    size: {
      type: [Number, String] as PropType<IconSize>,
      default: undefined
    },
    /**
     * 图标颜色
     */
    color: {
      type: String as PropType<IconColor>,
      default: undefined
    },
    /**
     * 是否启用旋转动画
     */
    spin: {
      type: Boolean,
      default: false
    },
    /**
     * 旋转角度（度数）
     */
    rotate: {
      type: Number as PropType<IconRotate>,
      default: 0
    }
  },
  setup(props, { attrs }) {
    // 确保 spin 样式已注入
    onMounted(() => {
      if (props.spin) {
        ensureSpinStyle()
      }
    })

    // 计算最终的图标名称
    const iconName = computed(() => {
      // 优先使用 icon prop
      if (props.icon) return resolveIconName(props.icon)
      // 然后使用 name prop
      if (props.name) return resolveIconName(props.name)
      return ''
    })

    // 计算样式
    const iconStyle = computed(() =>
      createIconStyle({
        size: props.size,
        color: props.color,
        rotate: props.rotate,
        spin: props.spin
      })
    )

    // 计算类名
    const iconClass = computed(() => (props.spin ? 'yh-icons--spin' : ''))

    return () => {
      // 首次渲染时也确保注入样式
      if (props.spin) {
        ensureSpinStyle()
      }

      // 1. 如果有自定义组件，使用组件
      if (props.component) {
        return h(props.component as object, {
          class: iconClass.value,
          style: iconStyle.value,
          ...attrs
        })
      }

      // 2. 如果有 SVG 字符串，渲染 SVG
      if (props.svg) {
        return h('svg', {
          class: iconClass.value,
          style: iconStyle.value,
          viewBox: '0 0 24 24',
          xmlns: 'http://www.w3.org/2000/svg',
          'aria-hidden': 'true',
          innerHTML: props.svg,
          ...attrs
        })
      }

      // 3. 使用 Iconify 渲染图标
      if (iconName.value) {
        return h(IconifyIcon, {
          icon: iconName.value,
          class: iconClass.value,
          style: iconStyle.value,
          ...attrs
        })
      }

      // 4. 默认渲染空图标
      return h('span', {
        class: ['yh-icon', iconClass.value],
        style: iconStyle.value,
        ...attrs
      })
    }
  }
})

/**
 * Icon 组件 - YhIcon 的别名
 */
export const Icon = YhIcon

/**
 * YhIcon Props 类型
 */
export type YhIconProps = InstanceType<typeof YhIcon>['$props']
