import crypto from 'node:crypto'
import { createRequire } from 'node:module'
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
   * Control how styles are imported:
   * - `true` (default): Automatically inject styles on demand.
   * - `'all'`: Inject the entire published style.css.
   * - `false`: Disable automatic style injection.
   * @default true
   */
  importStyle?: boolean | 'all'
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

const PUBLISHED_CSS_ENTRY = '@yh-ui/components/style.css'

function getStylePathForComponent(componentName: string): string | null {
  const name = componentName.replace(/^Yh/, '')

  const subComponentMap: Record<string, string> = {
    Option: 'select',
    BreadcrumbItem: 'breadcrumb',
    DropdownItem: 'dropdown',
    DropdownMenu: 'dropdown',
    FormItem: 'form',
    FormSchema: 'form',
    GridItem: 'grid',
    Step: 'steps',
    TableColumn: 'table',
    TabPane: 'tabs',
    TreeNode: 'tree',
    CarouselItem: 'carousel',
    Header: 'container',
    Aside: 'container',
    Main: 'container',
    Footer: 'container'
  }

  if (name.startsWith('Typography') && name !== 'Typography') {
    return '@yh-ui/components/dist/typography/src/typography.css'
  }

  const targetName = subComponentMap[name] || name
  const kebabName = targetName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()

  return `@yh-ui/components/dist/${kebabName}/src/${kebabName}.css`
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
    addPlugin(resolve('./runtime/plugin.mjs'))

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
      // 鏂板缁勪欢
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
      'AiCodeEditor',
      'AiCodeRunner',
      'AiThinking',
      'AiWelcome',
      'AiActionGroup',
      'AiEditorSender',
      'AiArtifacts',
      'AiVoiceTrigger',
      'AiConversations',
      'AiPrompts',
      // New AI Components (Phase 2-5)
      'AiAgentCard',
      'AiSources',
      'AiProvider',
      'AiMention',
      'AiBubbleList',
      // New AI Components (Phase 6)
      'AiFileCard',
      'AiAttachments',
      'AiMermaid',
      'Carousel',
      'CarouselItem',
      'Scrollbar',
      'GanttChart',
      'SkuSelector',
      'Price',
      'ProductCard',
      'ImageMagnifier',
      'CouponCard',
      'LuckyDraw',
      'FilterBar',
      'SubmitBar',
      'CategoryNav',
      'SmartAddress'
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
      'useVirtualScroll',
      'useCache',
      'useEventListener',
      'useScrollLock',
      'useClickOutside',
      'useConfig',
      'useAiChat',
      'useAiStream',
      'useAiConversations',
      'useAiRequest',
      'useAiVoice',
      'useAiPersistence',
      // Adapters / parsers
      'openaiParser',
      'claudeParser',
      'geminiParser',
      'ernieParser',
      'qwenParser',
      'plainTextParser',
      'useSKU',
      'useCountdown',
      // Utils and Keys
      'getNextZIndex',
      'resetZIndex',
      'useIdInjection',
      'getDayjsLocale',
      'setDayjsLocale',
      'setDayjsLocaleSync',
      'updateDayjsMonths',
      'namespaceContextKey',
      'configProviderContextKey',
      'idInjectionKey',
      'zIndexContextKey',
      'zIndexCounterKey'
    ]

    hooks.forEach((name) => {
      addImports({
        name,
        as: name,
        from: '@yh-ui/hooks'
      })
    })

    // `useId` is already auto-imported by Nuxt/Vue and overriding it causes real consumer conflicts.
    addImports({
      name: 'useId',
      as: 'useYhId',
      from: '@yh-ui/hooks'
    })

    // 4. Auto-register global methods and utilities
    const globalMethods = [
      'YhMessage',
      'YhNotification',
      'YhMessageBox',
      'YhDialogMethod',
      'YhLoading',
      'useAddressParser'
    ]
    globalMethods.forEach((name) => {
      addImports({
        name,
        as: name,
        from: '@yh-ui/components'
      })
    })

    // 4.5. Inject CSS styles (On-demand or All)
    if (options.importStyle === 'all') {
      if (!nuxt.options.css.includes(PUBLISHED_CSS_ENTRY)) {
        nuxt.options.css.push(PUBLISHED_CSS_ENTRY)
      }
    } else if (options.importStyle === true) {
      const existingStyles = new Set<string>()
      try {
        const _require = createRequire(import.meta.url)
        const fs = _require('node:fs')
        const path = _require('node:path')
        const pkgPath = _require.resolve('@yh-ui/components/package.json', {
          paths: [nuxt.options.rootDir]
        })

        components.forEach((name) => {
          const cssPath = getStylePathForComponent(`Yh${name}`)
          if (cssPath) {
            const localPath = cssPath.replace('@yh-ui/components', path.dirname(pkgPath))
            if (fs.existsSync(localPath)) {
              existingStyles.add(cssPath)
            }
          }
        })
      } catch (e) {
        // Fallback: resolution failure, let Vite dynamic imports resolve normally
      }

      extendViteConfig((config) => {
        config.plugins = config.plugins || []
        config.plugins.push({
          name: 'yh-ui:style-import',
          enforce: 'post',
          transform(code, id) {
            if (!id || !/\.(js|ts|vue|mjs|cjs)$/.test(id) || id.includes('node_modules')) {
              return
            }

            const importsMatch = code.match(
              /import\s*\{([^}]+)\}\s*from\s*['"]@yh-ui\/components['"]/g
            )
            if (!importsMatch) {
              return
            }

            const componentsToInject = new Set<string>()
            for (const matchStr of importsMatch) {
              const innerMatch = matchStr.match(/\{([^}]+)\}/)
              if (innerMatch) {
                const specifiers = innerMatch[1].split(',')
                for (const spec of specifiers) {
                  const name = spec
                    .trim()
                    .split(/\s+as\s+/)[0]
                    .trim()
                  if (name.startsWith('Yh')) {
                    componentsToInject.add(name)
                  }
                }
              }
            }

            if (componentsToInject.size === 0) {
              return
            }

            const styleImports: string[] = []
            for (const comp of componentsToInject) {
              const cssFile = getStylePathForComponent(comp)
              if (cssFile) {
                if (existingStyles.size === 0 || existingStyles.has(cssFile)) {
                  styleImports.push(`import '${cssFile}';`)
                }
              }
            }

            if (styleImports.length > 0) {
              return {
                code: code + '\n' + styleImports.join('\n'),
                map: null
              }
            }
          }
        })
      })
    }

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
