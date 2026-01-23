import { defineNuxtModule, addComponent, addImports, addPlugin, createResolver } from '@nuxt/kit'

export interface ModuleOptions {
  /**
   * 是否自动导入样式
   * @default true
   */
  importStyle?: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@yh-ui/nuxt',
    configKey: 'yhUI',
    compatibility: {
      nuxt: '^3.0.0 || ^4.0.0-rc.1'
    }
  },
  defaults: {
    importStyle: true
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
      'YhTimeSelect',
      'YhTransfer',
      'YhTransferPanel',
      'YhTreeSelect',
      'YhDivider',
      'YhBadge',
      'YhCard',
      'YhRow',
      'YhCol',
      'YhConfigProvider',
      'YhForm',
      'YhFormItem',
      'YhFormSchema',
      'YhTag',
      'YhIcon'
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
      'useId',
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
    // 对于这类需要手动调用的方法，可以通过注入插件或 addImports 解决
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
