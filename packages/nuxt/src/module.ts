import crypto from 'node:crypto'
import {
  defineNuxtModule,
  addComponent,
  addImports,
  addPlugin,
  createResolver,
  extendViteConfig
} from '@nuxt/kit'

// Polyfill crypto.hash for Node.js < 18.20 / 20.12 / 21.7
if (typeof (crypto as unknown as { hash: unknown }).hash !== 'function') {
  ;(
    crypto as unknown as {
      hash: (
        algorithm: string,
        data: string | Buffer,
        outputEncoding?: crypto.BinaryToTextEncoding
      ) => string | Buffer
    }
  ).hash = (
    algorithm: string,
    data: string | Buffer,
    outputEncoding: crypto.BinaryToTextEncoding = 'hex'
  ) => {
    return crypto.createHash(algorithm).update(data).digest(outputEncoding)
  }
}

export interface ModuleOptions {
  /**
   * Whether to automatically import styles.
   * If true, it will import `@yh-ui/theme/src/styles/index.scss`.
   * @default true
   */
  importStyle?: boolean
  /**
   * Whether to transpile dependencies.
   * @default true
   */
  buildTranspile?: boolean
  /**
   * Prefix for components.
   * @default 'Yh'
   */
  prefix?: string
  /**
   * SSR optimization configurations.
   */
  ssrOptimization?: {
    /**
     * Whether to enable component cache hints.
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
      nuxt: '^3.11.0 || ^4.0.0-rc.1'
    }
  },
  defaults: {
    importStyle: true,
    buildTranspile: true,
    prefix: 'Yh',
    ssrOptimization: {
      componentCache: true
    }
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    // 0. Register runtime plugin (SSR isolation)
    addPlugin(resolve('./runtime/plugin'))

    // 1. Inject CSS styles
    if (options.importStyle) {
      // Use resolved path for reliability
      nuxt.options.css.push('@yh-ui/theme/src/styles/index.scss')
    }

    // 1.5 Ensure dependencies are correctly transpiled
    if (options.buildTranspile) {
      nuxt.options.build.transpile = nuxt.options.build.transpile || []
      const transpileList = ['@yh-ui/components', '@yh-ui/hooks', '@yh-ui/utils', '@yh-ui/theme']
      transpileList.forEach((pkg) => {
        if (!nuxt.options.build.transpile.includes(pkg)) {
          nuxt.options.build.transpile.push(pkg)
        }
      })
    }

    // 2. Auto-register components
    const components = [
      'Button',
      'Input',
      'InputNumber',
      'InputTag',
      'Autocomplete',
      'Checkbox',
      'CheckboxGroup',
      'Radio',
      'RadioGroup',
      'RadioButton',
      'Switch',
      'Rate',
      'Select',
      'Option',
      'Cascader',
      'CascaderPanel',
      'Slider',
      'TimePicker',
      'TimeSelect',
      'DatePicker',
      'Transfer',
      'TransferPanel',
      'TreeSelect',
      'Divider',
      'Badge',
      'Card',
      'Marquee',
      'Row',
      'Col',
      'ConfigProvider',
      'Form',
      'FormItem',
      'FormSchema',
      'Tag',
      'Icon',
      'ColorPicker',
      'Breadcrumb',
      'BreadcrumbItem',
      'BackTop',
      'Alert',
      'Skeleton',
      'SkeletonItem',
      'Progress',
      'Tooltip',
      'Popconfirm',
      'Popover',
      'Dialog',
      'Drawer',
      'Watermark',
      'Upload',
      'Spin',
      'Pagination',
      'Image',
      'ImageViewer',
      'Descriptions',
      'DescriptionsItem',
      'Tabs',
      'TabPane',
      'Steps',
      'Step',
      'Affix',
      'InfiniteScroll',
      'Dropdown',
      'DropdownItem',
      'DropdownMenu',
      'Menu',
      'MenuItem',
      'MenuItemGroup',
      'SubMenu',
      'Waterfall',
      'Tree',
      'TreeNode',
      'Calendar',
      'Countdown',
      'Table',
      'TableColumn',
      // 新增组件
      'Space',
      'Avatar',
      'Empty',
      // Typography
      'TypographyTitle',
      'TypographyText',
      'TypographyParagraph',
      'TypographyLink',
      // Container
      'Container',
      'Header',
      'Aside',
      'Main',
      'Footer',
      // Result
      'Result',
      // Grid
      'Grid',
      'GridItem',
      // Mention
      'Mention',
      // AI Components
      'AiChat',
      'AiBubble',
      'AiSender',
      'AiThoughtChain',
      'AiCodeBlock',
      'AiThinking',
      'AiWelcome',
      'AiActionGroup',
      'AiEditorSender',
      'AiArtifacts',
      'AiVoiceTrigger'
    ]

    components.forEach((name) => {
      addComponent({
        name: `${options.prefix}${name}`,
        export: `Yh${name}`,
        filePath: '@yh-ui/components'
      })
    })

    // 3. Auto-register Composables (Hooks)
    const hooks = [
      'useNamespace',
      'useZIndex',
      'useLocale',
      'useFormItem',
      'createZIndexCounter',
      'useGlobalNamespace',
      'useId',
      'useVirtualScroll',
      'useCache',
      'useEventListener',
      'useScrollLock',
      'useClickOutside',
      'useConfig'
    ]

    hooks.forEach((name) => {
      addImports({
        name,
        as: name,
        from: '@yh-ui/hooks'
      })
    })

    // 4. Auto-register global methods and utilities
    const globalMethods = [
      'YhMessage',
      'YhNotification',
      'YhMessageBox',
      'YhDialogMethod',
      'YhLoading'
    ]
    globalMethods.forEach((name) => {
      addImports({
        name,
        as: name,
        from: '@yh-ui/components'
      })
    })

    // 5. Add Vite config for better alias handling if needed
    extendViteConfig((config) => {
      config.optimizeDeps ||= {}
      config.optimizeDeps.include ||= []
      const include = config.optimizeDeps.include as string[]
      const dependencies = ['@yh-ui/components', '@yh-ui/hooks', '@yh-ui/utils', 'dayjs']
      dependencies.forEach((dep) => {
        if (!include.includes(dep)) {
          include.push(dep)
        }
      })
    })
  }
})

// Module augmentation for type safety
declare module '@nuxt/schema' {
  interface NuxtConfig {
    yhUI?: ModuleOptions
  }
  interface NuxtOptions {
    yhUI?: ModuleOptions
  }
}

declare module 'nuxt/schema' {
  interface NuxtConfig {
    yhUI?: ModuleOptions
  }
  interface NuxtOptions {
    yhUI?: ModuleOptions
  }
}

export default yhNuxtModule
