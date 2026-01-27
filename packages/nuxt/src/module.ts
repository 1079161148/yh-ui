import crypto from 'node:crypto'
import { defineNuxtModule, addComponent, addImports, addPlugin, createResolver } from '@nuxt/kit'

// Polyfill crypto.hash for Node.js < 18.20 / 20.12 / 21.7
if (typeof (crypto as any).hash !== 'function') {
  ;(crypto as any).hash = (
    algorithm: string,
    data: string | Buffer,
    outputEncoding: any = 'hex'
  ) => {
    return crypto.createHash(algorithm).update(data).digest(outputEncoding)
  }
}

import type { NuxtModule } from '@nuxt/schema'

export interface ModuleOptions {
  /**
   * 是否自动导入样式
   * @default true
   */
  importStyle?: boolean
  /**
   * 是否转译依赖
   * @default true
   */
  buildTranspile?: boolean
  /**
   * SSR 优化配置
   */
  ssrOptimization?: {
    /**
     * 是否启用组件缓存提示
     * @default true
     */
    componentCache?: boolean
  }
}

const yhNuxtModule = defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@yh-ui/nuxt',
    configKey: 'yhUI',
    compatibility: {
      nuxt: '^3.0.0 || ^4.0.0-rc.1'
    }
  },
  defaults: {
    importStyle: true,
    buildTranspile: true,
    ssrOptimization: {
      componentCache: true
    }
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    // 0. 注册运行时插件（SSR 状态隔离）
    addPlugin(resolve('./runtime/plugin'))

    // 1. 注入 CSS 样式
    if (options.importStyle) {
      nuxt.options.css.push('@yh-ui/theme/src/styles/index.scss')
    }

    // 1.5 确保依赖被正确转译
    nuxt.options.build.transpile = nuxt.options.build.transpile || []
    nuxt.options.build.transpile.push(
      '@yh-ui/components',
      '@yh-ui/hooks',
      '@yh-ui/utils',
      '@yh-ui/theme'
    )

    // 2. 自动注册组件
    const components = [
      'YhButton',
      'YhInput',
      'YhInputNumber',
      'YhInputTag',
      'YhAutocomplete',
      'YhCheckbox',
      'YhCheckboxGroup',
      'YhRadio',
      'YhRadioGroup',
      'YhRadioButton',
      'YhSwitch',
      'YhRate',
      'YhSelect',
      'YhOption',
      'YhCascader',
      'YhCascaderPanel',
      'YhSlider',
      'YhTimePicker',
      'YhTimeSelect',
      'YhDatePicker',
      'YhTransfer',
      'YhTransferPanel',
      'YhTreeSelect',
      'YhDivider',
      'YhBadge',
      'YhCard',
      'YhMarquee',
      'YhRow',
      'YhCol',
      'YhConfigProvider',
      'YhForm',
      'YhFormItem',
      'YhFormSchema',
      'YhTag',
      'YhIcon',
      'YhColorPicker',
      'YhBreadcrumb',
      'YhBreadcrumbItem',
      'YhBackTop',
      'YhAlert',
      'YhSkeleton',
      'YhSkeletonItem',
      'YhProgress',
      'YhTooltip',
      'YhPopconfirm',
      'YhPopover',
      'YhDialog',
      'YhSpin',
      'YhLoading',
      'YhMessageBox'
    ]

    components.forEach((name) => {
      addComponent({
        name,
        export: name,
        filePath: '@yh-ui/components'
      })
    })

    // 3. 自动注册 Composables (Hooks)
    const hooks = [
      'useNamespace',
      'useZIndex',
      'useLocale',
      'useFormItem',
      'createZIndexCounter',
      'zIndexCounterKey',
      'useGlobalNamespace'
    ]

    hooks.forEach((name) => {
      addImports({
        name,
        as: name,
        from: '@yh-ui/hooks'
      })
    })

    // 4. 自动注册指令或全局方法 (如 Message, Notification)
    const globalMethods = ['YhMessage', 'YhNotification']
    globalMethods.forEach((name) => {
      addImports({
        name,
        as: name,
        from: '@yh-ui/components'
      })
    })
  }
})

declare module '@nuxt/schema' {
  interface NuxtConfig {
    yhUI?: ModuleOptions
  }
  interface NuxtOptions {
    yhUI?: ModuleOptions
  }
  interface RuntimeConfig {
    yhUI: ModuleOptions
  }
  interface PublicRuntimeConfig {
    yhUI: ModuleOptions
  }
}

declare module 'nuxt/schema' {
  interface NuxtConfig {
    yhUI?: ModuleOptions
  }
  interface NuxtOptions {
    yhUI?: ModuleOptions
  }
  interface RuntimeConfig {
    yhUI: ModuleOptions
  }
  interface PublicRuntimeConfig {
    yhUI: ModuleOptions
  }
}

export default yhNuxtModule
