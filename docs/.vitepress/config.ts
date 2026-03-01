import { defineConfig } from 'vitepress'
import { resolve } from 'node:path'

export default defineConfig({
  title: 'YH-UI',
  description: '一个现代化的 Vue 3 组件库',
  base: '/yh-ui/',

  lang: 'zh-CN',

  // 多语言配置
  locales: {
    root: {
      label: '中文',
      lang: 'zh-CN',
      title: 'YH-UI',
      description: '一个现代化的 Vue 3 组件库',
      link: '/',
      themeConfig: {
        nav: [
          { text: '首页', link: '/', activeMatch: '^/$' },
          { text: '指南', link: '/guide/introduction', activeMatch: '/guide/' },
          { text: 'AI 组件', link: '/ai-components/ai-chat', activeMatch: '/ai-components/' },
          { text: '组件', link: '/components/button', activeMatch: '/components/' },
          { text: '图标集合', link: '/icons/', activeMatch: '/icons/' },
          { text: 'Table 表格', link: '/table/basic', activeMatch: '/table/' }
        ],
        outline: {
          label: '页面导航',
          level: [2, 3]
        },
        docFooter: {
          prev: '上一页',
          next: '下一页'
        },
        lastUpdated: {
          text: '最后更新于'
        }
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      title: 'YH-UI',
      description: 'A modern Vue 3 UI Library',
      link: '/en/',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/', activeMatch: '^/en/$' },
          { text: 'Guide', link: '/en/guide/introduction', activeMatch: '/en/guide/' },
          {
            text: 'AI Components',
            link: '/en/ai-components/ai-chat',
            activeMatch: '/en/ai-components/'
          },
          { text: 'Components', link: '/en/components/button', activeMatch: '/en/components/' },
          { text: 'Icons', link: '/en/icons/', activeMatch: '/en/icons/' },
          { text: 'Table', link: '/en/table/basic', activeMatch: '/en/table/' }
        ],
        outline: {
          label: 'On this page',
          level: [2, 3]
        },
        docFooter: {
          prev: 'Previous page',
          next: 'Next page'
        },
        lastUpdated: {
          text: 'Last updated at'
        }
      }
    }
  },

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#409eff' }]
  ],

  themeConfig: {
    logo: '/logo.svg',

    sidebar: {
      // 中文侧边栏
      '/guide/': [
        {
          text: '开始',
          items: [
            { text: '简介', link: '/guide/introduction' },
            { text: '快速开始', link: '/guide/quickstart' },
            { text: '安装', link: '/guide/installation' },
            { text: '在 Nuxt 中使用', link: '/guide/nuxt' },
            { text: '更新日志', link: '/guide/changelog' },
            { text: '构建指南', link: '/guide/build' },
            { text: '表单设计优势', link: '/guide/form-best-practices' },
            { text: '国际化 (i18n)', link: '/guide/i18n' }
          ]
        },
        {
          text: '进阶',
          items: [
            { text: 'Theme 主题系统', link: '/guide/theme' },
            { text: '主题系统示例', link: '/guide/theme-examples' },
            { text: '主题定制', link: '/guide/theming' },
            { text: '设计规范', link: '/guide/design' }
          ]
        }
      ],
      // 英文侧边栏
      '/en/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/en/guide/introduction' },
            { text: 'Quick Start', link: '/en/guide/quickstart' },
            { text: 'Installation', link: '/en/guide/installation' },
            { text: 'Use in Nuxt', link: '/en/guide/nuxt' },
            { text: 'Changelog', link: '/en/guide/changelog' },
            { text: 'Build Guide', link: '/en/guide/build' },
            { text: 'Form Design Advantages', link: '/en/guide/form-best-practices' },
            { text: 'Internationalization', link: '/en/guide/i18n' }
          ]
        },
        {
          text: 'Advanced',
          items: [
            { text: 'Theme System', link: '/en/guide/theme' },
            { text: 'Theme Examples', link: '/en/guide/theme-examples' },
            { text: 'Theming', link: '/en/guide/theming' },
            { text: 'Design Guidelines', link: '/en/guide/design' }
          ]
        }
      ],
      '/table/': [
        {
          text: 'Table 表格',
          items: [
            { text: '基础用法', link: '/table/basic' },
            { text: '选择功能', link: '/table/selection' },
            { text: '排序与筛选', link: '/table/sort-filter' },
            { text: '表格分页', link: '/table/pagination' },
            { text: '自定义模板', link: '/table/custom' },
            { text: '树形数据与展开行', link: '/table/tree-expand' },
            { text: '合并与汇总', link: '/table/merge-summary' },
            { text: '高亮与样式', link: '/table/highlight-style' },
            { text: '空数据提示', link: '/table/empty' },
            { text: '对齐方式', link: '/table/alignment' },
            { text: '加载状态', link: '/table/loading' },
            { text: '虚拟滚动', link: '/table/virtual-scroll' },
            { text: '⚡ 性能基准压测', link: '/table/benchmark' },
            { text: '行拖拽', link: '/table/row-drag' },
            { text: '列宽调整', link: '/table/column-resize' },
            { text: '多级表头', link: '/table/grouped-header' },
            { text: '动态列渲染', link: '/table/dynamic-column' },
            { text: '列拖拽', link: '/table/column-drag' },
            { text: '导入功能', link: '/table/import' },
            { text: '导出功能', link: '/table/export' },
            { text: '打印功能', link: '/table/print' },
            { text: '自定义插槽模板', link: '/table/custom-slots' },
            { text: '列配置', link: '/table/column-config' },
            { text: 'Nuxt 集成', link: '/table/nuxt' },
            { text: 'API 参考', link: '/table/api' }
          ]
        }
      ],
      // 英文 Table 侧边栏
      '/en/table/': [
        {
          text: 'Table',
          items: [
            { text: 'Basic Usage', link: '/en/table/basic' },
            { text: 'Selection', link: '/en/table/selection' },
            { text: 'Sort & Filter', link: '/en/table/sort-filter' },
            { text: 'Pagination', link: '/en/table/pagination' },
            { text: 'Custom Template', link: '/en/table/custom' },
            { text: 'Tree Data & Expand', link: '/en/table/tree-expand' },
            { text: 'Merge & Summary', link: '/en/table/merge-summary' },
            { text: 'Highlight & Style', link: '/en/table/highlight-style' },
            { text: 'Empty Data', link: '/en/table/empty' },
            { text: 'Alignment', link: '/en/table/alignment' },
            { text: 'Loading State', link: '/en/table/loading' },
            { text: 'Virtual Scroll', link: '/en/table/virtual-scroll' },
            { text: '⚡ Performance Benchmark', link: '/en/table/benchmark' },
            { text: 'Row Drag', link: '/en/table/row-drag' },
            { text: 'Column Resize', link: '/en/table/column-resize' },
            { text: 'Grouped Header', link: '/en/table/grouped-header' },
            { text: 'Dynamic Column', link: '/en/table/dynamic-column' },
            { text: 'Column Drag', link: '/en/table/column-drag' },
            { text: 'Import', link: '/en/table/import' },
            { text: 'Export', link: '/en/table/export' },
            { text: 'Print', link: '/en/table/print' },
            { text: 'Custom Slots', link: '/en/table/custom-slots' },
            { text: 'Column Config', link: '/en/table/column-config' },
            { text: 'Nuxt', link: '/en/table/nuxt' },
            { text: 'API', link: '/en/table/api' }
          ]
        }
      ],
      // 英文 AI 组件侧边栏
      '/en/ai-components/': [
        {
          text: 'AI Components',
          items: [
            { text: 'AiChat', link: '/en/ai-components/ai-chat' },
            { text: 'AiBubble', link: '/en/ai-components/ai-bubble' },
            { text: 'AiSender', link: '/en/ai-components/ai-sender' },
            { text: 'AiThinking', link: '/en/ai-components/ai-thinking' },
            { text: 'AiThoughtChain', link: '/en/ai-components/ai-thought-chain' },
            { text: 'AiCodeBlock', link: '/en/ai-components/ai-code-block' },
            { text: 'AiWelcome', link: '/en/ai-components/ai-welcome' },
            { text: 'AiActionGroup', link: '/en/ai-components/ai-action-group' },
            { text: 'AiArtifacts', link: '/en/ai-components/ai-artifacts' },
            { text: 'AiEditorSender', link: '/en/ai-components/ai-editor-sender' },
            { text: 'AiConversations', link: '/en/ai-components/ai-conversations' },
            { text: 'AiPrompts', link: '/en/ai-components/ai-prompts' },
            { text: 'AiVoiceTrigger', link: '/en/ai-components/ai-voice-trigger' }
          ]
        },
        {
          text: 'Tools',
          items: [{ text: 'useAiChat (Hooks) 🌳', link: '/en/ai-components/use-ai-chat' }]
        }
      ],
      // 英文组件侧边栏
      '/en/components/': [
        {
          text: 'Basic',
          items: [
            { text: 'Layout', link: '/en/components/layout' },
            { text: 'Container', link: '/en/components/container' },
            { text: 'Grid', link: '/en/components/grid' },
            { text: 'Button', link: '/en/components/button' },
            { text: 'Icon', link: '/en/components/icon' },
            { text: 'Typography', link: '/en/components/typography' },
            { text: 'Space', link: '/en/components/space' },
            { text: 'Avatar', link: '/en/components/avatar' },
            { text: 'Empty', link: '/en/components/empty' },
            { text: 'Divider', link: '/en/components/divider' },
            { text: 'Skeleton', link: '/en/components/skeleton' }
          ]
        },
        {
          text: 'Form',
          items: [
            { text: 'Form', link: '/en/components/form' },
            { text: 'Input', link: '/en/components/input' },
            { text: 'InputNumber', link: '/en/components/input-number' },
            { text: 'InputTag', link: '/en/components/input-tag' },
            { text: 'Autocomplete', link: '/en/components/autocomplete' },
            { text: 'Checkbox', link: '/en/components/checkbox' },
            { text: 'Radio', link: '/en/components/radio' },
            { text: 'Switch', link: '/en/components/switch' },
            { text: 'Rate', link: '/en/components/rate' },
            { text: 'Select', link: '/en/components/select' },
            { text: 'Cascader', link: '/en/components/cascader' },
            { text: 'Slider', link: '/en/components/slider' },
            { text: 'TimePicker', link: '/en/components/time-picker' },
            { text: 'TimeSelect', link: '/en/components/time-select' },
            { text: 'DatePicker', link: '/en/components/date-picker' },
            { text: 'ColorPicker', link: '/en/components/color-picker' },
            { text: 'Transfer', link: '/en/components/transfer' },
            { text: 'TreeSelect', link: '/en/components/tree-select' },
            { text: 'Upload', link: '/en/components/upload' },
            { text: 'Mention', link: '/en/components/mention' }
          ]
        },
        {
          text: 'Data Display',
          items: [
            { text: 'Badge', link: '/en/components/badge' },
            { text: 'Card', link: '/en/components/card' },
            { text: 'Tag', link: '/en/components/tag' },
            { text: 'Pagination', link: '/en/components/pagination' },
            { text: 'Progress', link: '/en/components/progress' },
            { text: 'Image', link: '/en/components/image' },
            { text: 'Descriptions', link: '/en/components/descriptions' },
            { text: 'Watermark', link: '/en/components/watermark' },
            { text: 'Marquee', link: '/en/components/marquee' },
            { text: 'Waterfall', link: '/en/components/waterfall' },
            { text: 'Tree', link: '/en/components/tree' },
            { text: 'Calendar', link: '/en/components/calendar' },
            { text: 'Countdown', link: '/en/components/countdown' }
          ]
        },
        {
          text: 'Navigation',
          items: [
            { text: 'Menu', link: '/en/components/menu' },
            { text: 'Dropdown', link: '/en/components/dropdown' },
            { text: 'Tabs', link: '/en/components/tabs' },
            { text: 'Steps', link: '/en/components/steps' },
            { text: 'Breadcrumb', link: '/en/components/breadcrumb' },
            { text: 'BackTop', link: '/en/components/back-top' },
            { text: 'Affix', link: '/en/components/affix' },
            { text: 'InfiniteScroll', link: '/en/components/infinite-scroll' }
          ]
        },
        {
          text: 'Feedback',
          items: [
            { text: 'Alert', link: '/en/components/alert' },
            { text: 'Result', link: '/en/components/result' },
            { text: 'Dialog', link: '/en/components/dialog' },
            { text: 'Tooltip', link: '/en/components/tooltip' },
            { text: 'Popconfirm', link: '/en/components/popconfirm' },
            { text: 'Popover', link: '/en/components/popover' },
            { text: 'Spin', link: '/en/components/spin' },
            { text: 'Loading', link: '/en/components/loading' },
            { text: 'Message', link: '/en/components/message' },
            { text: 'MessageBox', link: '/en/components/message-box' },
            { text: 'Notification', link: '/en/components/notification' },
            { text: 'Drawer', link: '/en/components/drawer' }
          ]
        },
        {
          text: 'Config',
          items: [{ text: 'ConfigProvider', link: '/en/components/config-provider' }]
        }
      ],

      // AI 组件侧边栏
      '/ai-components/': [
        {
          text: 'AI 组件',
          items: [
            { text: 'AiChat 智能对话', link: '/ai-components/ai-chat' },
            { text: 'AiBubble 对话气泡', link: '/ai-components/ai-bubble' },
            { text: 'AiSender 智能输入', link: '/ai-components/ai-sender' },
            { text: 'AiEditorSender 面板输入', link: '/ai-components/ai-editor-sender' },
            { text: 'AiThinking 思考中', link: '/ai-components/ai-thinking' },
            { text: 'AiThoughtChain 思维链', link: '/ai-components/ai-thought-chain' },
            { text: 'AiCodeBlock 智能代码块', link: '/ai-components/ai-code-block' },
            { text: 'AiWelcome 欢迎页面', link: '/ai-components/ai-welcome' },
            { text: 'AiArtifacts 智能组件', link: '/ai-components/ai-artifacts' },
            { text: 'AiActionGroup 操作组', link: '/ai-components/ai-action-group' },
            { text: 'AiConversations 会话记录', link: '/ai-components/ai-conversations' },
            { text: 'AiPrompts 提示词推荐', link: '/ai-components/ai-prompts' },
            { text: 'AiVoiceTrigger 语音触发', link: '/ai-components/ai-voice-trigger' }
          ]
        },
        {
          text: '工具',
          items: [{ text: 'useAiChat 数据响应流 🌳', link: '/ai-components/use-ai-chat' }]
        }
      ],
      '/components/': [
        {
          text: '基础组件',
          items: [
            { text: 'Layout 布局', link: '/components/layout' },
            { text: 'Container 布局容器', link: '/components/container' },
            { text: 'Grid 网格布局', link: '/components/grid' },
            { text: 'Button 按钮', link: '/components/button' },
            { text: 'Icon 图标', link: '/components/icon' },
            { text: 'Typography 排版', link: '/components/typography' },
            { text: 'Space 间距', link: '/components/space' },
            { text: 'Avatar 头像', link: '/components/avatar' },
            { text: 'Empty 空状态', link: '/components/empty' },
            { text: 'Divider 分割线', link: '/components/divider' },
            { text: 'Skeleton 骨架屏', link: '/components/skeleton' }
          ]
        },
        {
          text: '表单组件',
          items: [
            { text: 'Form 表单', link: '/components/form' },
            { text: 'Input 输入框', link: '/components/input' },
            { text: 'InputNumber 数字输入框', link: '/components/input-number' },
            { text: 'InputTag 标签输入框', link: '/components/input-tag' },
            { text: 'Autocomplete 自动补全输入框', link: '/components/autocomplete' },
            { text: 'Checkbox 复选框', link: '/components/checkbox' },
            { text: 'Radio 单选框', link: '/components/radio' },
            { text: 'Switch 开关', link: '/components/switch' },
            { text: 'Rate 评分', link: '/components/rate' },
            { text: 'Select 选择器', link: '/components/select' },
            { text: 'Cascader 级联选择器', link: '/components/cascader' },
            { text: 'Slider 滑块', link: '/components/slider' },
            { text: 'TimePicker 时间选择器', link: '/components/time-picker' },
            { text: 'TimeSelect 时间选择', link: '/components/time-select' },
            { text: 'DatePicker 日期选择器', link: '/components/date-picker' },
            { text: 'ColorPicker 颜色选择器', link: '/components/color-picker' },
            { text: 'Transfer 穿梭框', link: '/components/transfer' },
            { text: 'TreeSelect 树形选择', link: '/components/tree-select' },
            { text: 'Upload 上传', link: '/components/upload' },
            { text: 'Mention 提及', link: '/components/mention' }
          ]
        },
        {
          text: '数据展示',
          items: [
            { text: 'Badge 徽标', link: '/components/badge' },
            { text: 'Card 卡片', link: '/components/card' },
            { text: 'Tag 标签', link: '/components/tag' },
            { text: 'Pagination 分页', link: '/components/pagination' },
            { text: 'Progress 进度条', link: '/components/progress' },
            { text: 'Image 图片', link: '/components/image' },
            { text: 'Descriptions 描述列表', link: '/components/descriptions' },
            { text: 'Watermark 水印', link: '/components/watermark' },
            { text: 'Marquee 跑马灯', link: '/components/marquee' },
            { text: 'Waterfall 瀑布流', link: '/components/waterfall' },
            { text: 'Tree 树形控件', link: '/components/tree' },
            { text: 'Calendar 日历', link: '/components/calendar' },
            { text: 'Countdown 倒计时', link: '/components/countdown' }
          ]
        },
        {
          text: 'Navigation 导航组件',
          items: [
            { text: 'Menu 菜单', link: '/components/menu' },
            { text: 'Dropdown 下拉菜单', link: '/components/dropdown' },
            { text: 'Tabs 标签页', link: '/components/tabs' },
            { text: 'Steps 步骤条', link: '/components/steps' },
            { text: 'Breadcrumb 面包屑', link: '/components/breadcrumb' },
            { text: 'BackTop 回到顶部', link: '/components/back-top' },
            { text: 'Affix 固钉', link: '/components/affix' },
            { text: 'InfiniteScroll 无限滚动', link: '/components/infinite-scroll' }
          ]
        },
        {
          text: '反馈组件',
          items: [
            { text: 'Alert 警告提示', link: '/components/alert' },
            { text: 'Result 结果', link: '/components/result' },
            { text: 'Dialog 对话框', link: '/components/dialog' },
            { text: 'Tooltip 文字提示', link: '/components/tooltip' },
            { text: 'Popconfirm 气泡确认框', link: '/components/popconfirm' },
            { text: 'Popover 气泡卡片', link: '/components/popover' },
            { text: 'Spin 加载中', link: '/components/spin' },
            { text: 'Loading 加载', link: '/components/loading' },
            { text: 'Message 消息提示', link: '/components/message' },
            { text: 'MessageBox 消息弹框', link: '/components/message-box' },
            { text: 'Notification 通知', link: '/components/notification' },
            { text: 'Drawer 抽屉', link: '/components/drawer' }
          ]
        },
        {
          text: '配置组件',
          items: [{ text: 'ConfigProvider 全局配置', link: '/components/config-provider' }]
        }
      ],

      '/icons/': [
        {
          text: '图标集合',
          items: [
            { text: '图标集合介绍', link: '/icons/' },
            { text: '快速开始', link: '/icons/getting-started' },
            { text: '图标集', link: '/icons/collections' },
            { text: '图标展示', link: '/icons/showcase' },
            { text: 'API 参考', link: '/icons/api' }
          ]
        }
      ],
      // 英文图标侧边栏
      '/en/icons/': [
        {
          text: 'Icon Collection',
          items: [
            { text: 'Introduction', link: '/en/icons/' },
            { text: 'Getting Started', link: '/en/icons/getting-started' },
            { text: 'Collections', link: '/en/icons/collections' },
            { text: 'Showcase', link: '/en/icons/showcase' },
            { text: 'API', link: '/en/icons/api' }
          ]
        }
      ]
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/1079161148/yh-ui' }],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present YH-UI Team'
    },

    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换'
                }
              }
            }
          }
        }
      }
    }
  },

  markdown: {
    lineNumbers: true
  },

  vite: {
    resolve: {
      alias: {
        '@yh-ui/components': resolve(__dirname, '../../packages/components/src'),
        '@yh-ui/hooks': resolve(__dirname, '../../packages/hooks/src'),
        '@yh-ui/utils': resolve(__dirname, '../../packages/utils/src'),
        '@yh-ui/theme/styles': resolve(__dirname, '../../packages/theme/src/styles'),
        '@yh-ui/theme': resolve(__dirname, '../../packages/theme/src'),
        '@yh-ui/locale': resolve(__dirname, '../../packages/locale/src'),
        '@yh-ui/icons': resolve(__dirname, '../../packages/icons/src')
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler'
        }
      }
    }
  }
})
