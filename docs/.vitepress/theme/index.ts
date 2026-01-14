/**
 * VitePress Theme Configuration
 *
 * Features:
 * - Custom glassmorphism theme
 * - Language switcher (zh-CN / en-US)
 * - Collapsible sidebar
 * - Back to top button
 * - Micro-animations
 */
import { App, h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'

// 导入组件库样式
import '@yh-ui/theme/styles/index.scss'

// 自定义样式
import './styles/index.scss'
import './styles/animations.scss'

// 导入组件
import {
  YhButton,
  YhInput,
  YhCheckbox,
  YhCheckboxGroup,
  YhRadio,
  YhRadioGroup,
  YhRadioButton,
  YhTag,
  YhInputNumber,
  YhInputTag
} from '@yh-ui/components'

// 导入文档组件
import DemoBlock from './components/DemoBlock.vue'
import CustomLayout from './components/CustomLayout.vue'

export default {
  extends: DefaultTheme,
  // 使用自定义布局
  Layout: CustomLayout,
  enhanceApp({ app }: { app: App }) {
    // 注册全局组件用于文档演示
    app.component('YhButton', YhButton)
    app.component('YhInput', YhInput)
    app.component('YhCheckbox', YhCheckbox)
    app.component('YhCheckboxGroup', YhCheckboxGroup)
    app.component('YhRadio', YhRadio)
    app.component('YhRadioGroup', YhRadioGroup)
    app.component('YhRadioButton', YhRadioButton)
    app.component('YhTag', YhTag)
    app.component('YhInputNumber', YhInputNumber)
    app.component('YhInputTag', YhInputTag)

    // 注册文档组件
    app.component('DemoBlock', DemoBlock)
  }
} satisfies Theme
