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
          { text: 'Table 表格', link: '/table/basic', activeMatch: '/table/' },
          { text: 'Request 请求', link: '/request/', activeMatch: '/request/' },
          { text: 'AI SDK', link: '/ai-sdk/', activeMatch: '/ai-sdk/' },
          { text: 'Flow 流程图', link: '/flow/basic', activeMatch: '/flow/' }
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
          { text: 'Table', link: '/en/table/basic', activeMatch: '/en/table/' },
          { text: 'Request', link: '/en/request/', activeMatch: '/en/request/' },
          { text: 'AI SDK', link: '/en/ai-sdk/', activeMatch: '/en/ai-sdk/' },
          { text: 'Flow', link: '/en/flow/basic', activeMatch: '/en/flow/' }
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
          text: 'Global Configuration',
          items: [{ text: 'AiProvider 🌍', link: '/en/ai-components/ai-provider' }]
        },
        {
          text: 'Basic AI Components',
          items: [
            { text: 'AiChat', link: '/en/ai-components/ai-chat' },
            { text: 'AiBubble', link: '/en/ai-components/ai-bubble' },
            { text: 'AiSender', link: '/en/ai-components/ai-sender' },
            { text: 'AiThinking', link: '/en/ai-components/ai-thinking' },
            { text: 'AiThoughtChain', link: '/en/ai-components/ai-thought-chain' },
            { text: 'AiCodeBlock', link: '/en/ai-components/ai-code-block' },
            { text: 'AiCodeEditor', link: '/en/ai-components/ai-code-editor' },
            { text: 'AiCodeRunner', link: '/en/ai-components/ai-code-runner' },
            { text: 'AiWelcome', link: '/en/ai-components/ai-welcome' },
            { text: 'AiActionGroup', link: '/en/ai-components/ai-action-group' },
            { text: 'AiArtifacts', link: '/en/ai-components/ai-artifacts' },
            { text: 'AiEditorSender', link: '/en/ai-components/ai-editor-sender' },
            { text: 'AiConversations', link: '/en/ai-components/ai-conversations' },
            { text: 'AiPrompts', link: '/en/ai-components/ai-prompts' },
            { text: 'AiVoiceTrigger', link: '/en/ai-components/ai-voice-trigger' },
            { text: 'AiAgentCard 🤖', link: '/en/ai-components/ai-agent-card' },
            { text: 'AiSources 🔗', link: '/en/ai-components/ai-sources' },
            { text: 'AiMention 🏷️', link: '/en/ai-components/ai-mention' },
            { text: 'AiAttachments', link: '/en/ai-components/ai-attachments' },
            { text: 'AiFileCard', link: '/en/ai-components/ai-file-card' },
            { text: 'AiMermaid', link: '/en/ai-components/ai-mermaid' }
          ]
        },
        {
          text: 'Tools',
          items: [
            { text: 'useAiChat 🌳', link: '/en/ai-components/use-ai-chat' },
            { text: 'useAiStream 🌊', link: '/en/ai-components/use-ai-stream' },
            { text: 'useAiConversations 💾', link: '/en/ai-components/use-ai-conversations' },
            { text: 'useAiVoice 🎙️', link: '/en/ai-components/use-ai-voice' }
          ]
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
            { text: 'Countdown', link: '/en/components/countdown' },
            { text: 'Carousel', link: '/en/components/carousel' },
            { text: 'Scrollbar', link: '/en/components/scrollbar' },
            { text: 'GanttChart', link: '/en/components/gantt-chart' }
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
        },
        {
          text: 'Ecommerce 🎁',
          items: [
            { text: 'FilterBar', link: '/en/components/filter-bar' },
            { text: 'SubmitBar', link: '/en/components/submit-bar' },
            { text: 'SmartAddress', link: '/en/components/smart-address' },
            { text: 'SkuSelector', link: '/en/components/sku-selector' },
            { text: 'ProductCard', link: '/en/components/product-card' },
            { text: 'ImageMagnifier', link: '/en/components/image-magnifier' },
            { text: 'Price', link: '/en/components/price' },
            { text: 'CouponCard', link: '/en/components/coupon-card' },
            { text: 'LuckyDraw', link: '/en/components/lucky-draw' },
            { text: 'CategoryNav', link: '/en/components/category-nav' }
          ]
        }
      ],

      // AI 组件侧边栏
      '/ai-components/': [
        {
          text: '全局配置组件',
          items: [{ text: 'AiProvider 全局配置 🌍', link: '/ai-components/ai-provider' }]
        },
        {
          text: '基础 AI 组件',
          items: [
            { text: 'AiChat 智能对话', link: '/ai-components/ai-chat' },
            { text: 'AiBubble 对话气泡', link: '/ai-components/ai-bubble' },
            { text: 'AiSender 智能输入', link: '/ai-components/ai-sender' },
            { text: 'AiEditorSender 面板输入', link: '/ai-components/ai-editor-sender' },
            { text: 'AiThinking 思考中', link: '/ai-components/ai-thinking' },
            { text: 'AiThoughtChain 思维链', link: '/ai-components/ai-thought-chain' },
            { text: 'AiCodeBlock 智能代码块', link: '/ai-components/ai-code-block' },
            { text: 'AiCodeEditor 智能代码编辑器', link: '/ai-components/ai-code-editor' },
            { text: 'AiCodeRunner 智能代码运行器', link: '/ai-components/ai-code-runner' },
            { text: 'AiWelcome 欢迎页面', link: '/ai-components/ai-welcome' },
            { text: 'AiArtifacts 智能组件', link: '/ai-components/ai-artifacts' },
            { text: 'AiActionGroup 操作组', link: '/ai-components/ai-action-group' },
            { text: 'AiConversations 会话记录', link: '/ai-components/ai-conversations' },
            { text: 'AiPrompts 提示词推荐', link: '/ai-components/ai-prompts' },
            { text: 'AiVoiceTrigger 语音触发', link: '/ai-components/ai-voice-trigger' },
            { text: 'AiAgentCard 智能体名片 🤖', link: '/ai-components/ai-agent-card' },
            { text: 'AiSources 知识库溯源 🔗', link: '/ai-components/ai-sources' },
            { text: 'AiMention AI 提及 🏷️', link: '/ai-components/ai-mention' },
            { text: 'AiAttachments 附件', link: '/ai-components/ai-attachments' },
            { text: 'AiFileCard 文件卡片', link: '/ai-components/ai-file-card' },
            { text: 'AiMermaid 流程图', link: '/ai-components/ai-mermaid' }
          ]
        },
        {
          text: '工具',
          items: [
            { text: 'useAiChat 会话管理 🌳', link: '/ai-components/use-ai-chat' },
            { text: 'useAiStream 流式引擎 🌊', link: '/ai-components/use-ai-stream' },
            {
              text: 'useAiConversations 历史持久化 💾',
              link: '/ai-components/use-ai-conversations'
            },
            { text: 'useAiVoice 语音交互 🎙️', link: '/ai-components/use-ai-voice' }
          ]
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
            { text: 'Countdown 倒计时', link: '/components/countdown' },
            { text: 'Carousel 轮播', link: '/components/carousel' },
            { text: 'Scrollbar 滚动条', link: '/components/scrollbar' },
            { text: 'GanttChart 甘特图', link: '/components/gantt-chart' }
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
        },
        {
          text: 'Ecommerce 电商组件',
          items: [
            { text: 'FilterBar 筛选栏', link: '/components/filter-bar' },
            { text: 'SubmitBar 提交栏', link: '/components/submit-bar' },
            { text: 'SmartAddress 智能地址解析', link: '/components/smart-address' },
            { text: 'SkuSelector SKU 选择器', link: '/components/sku-selector' },
            { text: 'ProductCard 商品卡片', link: '/components/product-card' },
            { text: 'ImageMagnifier 商品放大镜', link: '/components/image-magnifier' },
            { text: 'Price 价格展示', link: '/components/price' },
            { text: 'CouponCard 优惠券卡片', link: '/components/coupon-card' },
            { text: 'LuckyDraw 幸运抽奖', link: '/components/lucky-draw' },
            { text: 'CategoryNav 品类导航', link: '/components/category-nav' }
          ]
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
      ],
      // Request 侧边栏
      '/request/': [
        {
          text: '快速开始',
          items: [
            { text: '简介', link: '/request/' },
            { text: '安装', link: '/request/install' },
            { text: '基础用法', link: '/request/basic' }
          ]
        },
        {
          text: '核心功能',
          items: [
            { text: '请求配置', link: '/request/config' },
            { text: '响应处理', link: '/request/response' },
            { text: '拦截器', link: '/request/interceptors' },
            { text: '缓存策略', link: '/request/cache' },
            { text: 'HTTP 缓存协议', link: '/request/http-cache' },
            { text: '安全特性', link: '/request/security' },
            { text: '上传与下载', link: '/request/upload-download' }
          ]
        },
        {
          text: 'Vue Hooks',
          items: [
            { text: 'useRequest', link: '/request/use-request' },
            { text: 'useRequestSWR', link: '/request/use-swr' },
            { text: 'useSSE', link: '/request/use-sse' },
            { text: 'useAIStream', link: '/request/use-ai-stream' },
            { text: 'usePagination', link: '/request/use-pagination' },
            { text: 'useLoadMore', link: '/request/use-load-more' },
            { text: 'useQueue', link: '/request/use-queue' },
            { text: 'useRequestQueue', link: '/request/use-request-queue' }
          ]
        },
        {
          text: '进阶功能',
          items: [
            { text: '适配器', link: '/request/adapter' },
            { text: 'GraphQL', link: '/request/graphql' },
            { text: 'WebSocket', link: '/request/websocket' },
            { text: '插件系统', link: '/request/plugin' },
            { text: '错误处理', link: '/request/error' },
            { text: '调试模式', link: '/request/debug' }
          ]
        },
        {
          text: '最佳实践',
          items: [
            { text: '与 UI 组件集成', link: '/request/integration' },
            { text: '实战案例', link: '/request/practical' },
            { text: 'SSR 使用', link: '/request/ssr' },
            { text: 'TypeScript 指南', link: '/request/typescript' },
            { text: '常见问题 FAQ', link: '/request/faq' }
          ]
        }
      ],
      // AI SDK 侧边栏
      '/ai-sdk/': [
        {
          text: '快速开始',
          items: [
            { text: '简介', link: '/ai-sdk/' },
            { text: '安装', link: '/ai-sdk/install' },
            { text: '快速开始', link: '/ai-sdk/quickstart' }
          ]
        },
        {
          text: '核心功能',
          items: [
            { text: 'Vercel AI SDK', link: '/ai-sdk/vercel' },
            { text: 'LangChain 集成', link: '/ai-sdk/langchain' },
            { text: '工具函数', link: '/ai-sdk/tools' },
            { text: 'Vue Composables', link: '/ai-sdk/vue-composables' }
          ]
        },
        {
          text: '进阶功能',
          items: [
            { text: 'MCP 协议', link: '/ai-sdk/mcp' },
            { text: 'Agent 编排', link: '/ai-sdk/agent' },
            { text: '向量存储与 RAG', link: '/ai-sdk/vector-rag' },
            { text: '缓存系统', link: '/ai-sdk/cache' },
            { text: '限流', link: '/ai-sdk/rate-limit' },
            { text: '可观测性', link: '/ai-sdk/observability' }
          ]
        },
        {
          text: '其他',
          items: [
            { text: '前瞻功能', link: '/ai-sdk/future' },
            { text: 'API 参考', link: '/ai-sdk/api' },
            { text: '注意事项', link: '/ai-sdk/caution' }
          ]
        }
      ],
      // 英文 Request 侧边栏
      '/en/request/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/en/request/' },
            { text: 'Installation', link: '/en/request/install' },
            { text: 'Basic Usage', link: '/en/request/basic' }
          ]
        },
        {
          text: 'Core Features',
          items: [
            { text: 'Request Config', link: '/en/request/config' },
            { text: 'Response Handling', link: '/en/request/response' },
            { text: 'Interceptors', link: '/en/request/interceptors' },
            { text: 'Cache Strategy', link: '/en/request/cache' },
            { text: 'HTTP Cache Protocol', link: '/en/request/http-cache' },
            { text: 'Security', link: '/en/request/security' },
            { text: 'Upload & Download', link: '/en/request/upload-download' }
          ]
        },
        {
          text: 'Vue Hooks',
          items: [
            { text: 'useRequest', link: '/en/request/use-request' },
            { text: 'useRequestSWR', link: '/en/request/use-swr' },
            { text: 'useSSE', link: '/en/request/use-sse' },
            { text: 'useAIStream', link: '/en/request/use-ai-stream' },
            { text: 'usePagination', link: '/en/request/use-pagination' },
            { text: 'useLoadMore', link: '/en/request/use-load-more' },
            { text: 'useQueue', link: '/en/request/use-queue' },
            { text: 'useRequestQueue', link: '/en/request/use-request-queue' }
          ]
        },
        {
          text: 'Advanced',
          items: [
            { text: 'Adapters', link: '/en/request/adapter' },
            { text: 'GraphQL', link: '/en/request/graphql' },
            { text: 'WebSocket', link: '/en/request/websocket' },
            { text: 'Plugins', link: '/en/request/plugin' },
            { text: 'Error Handling', link: '/en/request/error' },
            { text: 'Debug Mode', link: '/en/request/debug' }
          ]
        },
        {
          text: 'Best Practices',
          items: [
            { text: 'UI Integration', link: '/en/request/integration' },
            { text: 'Practical Examples', link: '/en/request/practical' },
            { text: 'SSR Usage', link: '/en/request/ssr' },
            { text: 'TypeScript Guide', link: '/en/request/typescript' },
            { text: 'FAQ', link: '/en/request/faq' }
          ]
        }
      ],
      // 英文 AI SDK 侧边栏
      '/en/ai-sdk/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/en/ai-sdk/' },
            { text: 'Installation', link: '/en/ai-sdk/install' },
            { text: 'Quick Start', link: '/en/ai-sdk/quickstart' }
          ]
        },
        {
          text: 'Core Features',
          items: [
            { text: 'Vercel AI SDK', link: '/en/ai-sdk/vercel' },
            { text: 'LangChain Integration', link: '/en/ai-sdk/langchain' },
            { text: 'Tools', link: '/en/ai-sdk/tools' },
            { text: 'Vue Composables', link: '/en/ai-sdk/vue-composables' }
          ]
        },
        {
          text: 'Advanced',
          items: [
            { text: 'MCP Protocol', link: '/en/ai-sdk/mcp' },
            { text: 'Agent Orchestration', link: '/en/ai-sdk/agent' },
            { text: 'Vector Storage & RAG', link: '/en/ai-sdk/vector-rag' },
            { text: 'Caching', link: '/en/ai-sdk/cache' },
            { text: 'Rate Limiting', link: '/en/ai-sdk/rate-limit' },
            { text: 'Observability', link: '/en/ai-sdk/observability' }
          ]
        },
        {
          text: 'More',
          items: [
            { text: 'Future Features', link: '/en/ai-sdk/future' },
            { text: 'API Reference', link: '/en/ai-sdk/api' },
            { text: 'Notes & FAQ', link: '/en/ai-sdk/caution' }
          ]
        }
      ],
      // Flow 流程图侧边栏
      '/flow/': [
        {
          text: '开始',
          items: [
            { text: '快速开始', link: '/flow/basic' },
            { text: '更新日志', link: '/flow/changelog' },
            { text: 'API 参考', link: '/flow/api' }
          ]
        },
        {
          text: '核心概念',
          items: [
            { text: '内置节点', link: '/flow/nodes' },
            { text: '边缘（连线）', link: '/flow/edges' },
            { text: '插件系统', link: '/flow/plugins' }
          ]
        },
        {
          text: '交互与功能',
          items: [
            { text: '基础交互', link: '/flow/interaction' },
            { text: '拖拽式创建', link: '/flow/drag-drop' },
            { text: '可见性控制', link: '/flow/hidden' },
            { text: '智能辅助线', link: '/flow/alignment' },
            { text: '导出截图', link: '/flow/screenshot' },
            { text: '确认删除拦截', link: '/flow/confirm-delete' },
            { text: '视口平滑过渡', link: '/flow/viewport-transition' },
            { text: '跨层传送 (Teleport)', link: '/flow/teleport' },
            { text: '持久化 (Save/Restore)', link: '/flow/save-restore' },
            { text: '数学流程示例', link: '/flow/math' }
          ]
        },
        {
          text: '进阶扩展',
          items: [
            { text: '自定义节点渲染', link: '/flow/custom-node' },
            { text: '响应式更新节点', link: '/flow/update-node' },
            { text: '碰撞/位置检测', link: '/flow/intersections' },
            { text: '嵌套与分组', link: '/flow/nested' },
            { text: '节点缩放器 (Resizer)', link: '/flow/node-resizer' },
            { text: '节点工具栏 (Toolbar)', link: '/flow/node-toolbar' },
            { text: '自定义连线渲染', link: '/flow/custom-edge' },
            { text: '可更新连线', link: '/flow/updatable-edge' },
            { text: '节点和连线编辑', link: '/flow/node-edge-edit' }
          ]
        },
        {
          text: '新增专题',
          items: [
            { text: '行业应用场景大赏', link: '/flow/use-cases' },
            { text: 'AI 工作流节点', link: '/flow/ai-workflow' },
            { text: '自定义节点模板', link: '/flow/custom-node-templates' },
            { text: '节点嵌套布局', link: '/flow/nested-layout' },
            { text: '交互式小地图', link: '/flow/minimap' },
            { text: '导出功能', link: '/flow/exports' },
            { text: '自定义边类型', link: '/flow/custom-edges' },
            { text: 'BPMN XML 导入导出', link: '/flow/bpmn' },
            { text: 'BPMN 流程执行引擎', link: '/flow/bpmn-engine' },
            { text: 'CSS 变量主题系统', link: '/flow/theme-system' },
            { text: '实时协作', link: '/flow/collaboration' }
          ]
        },
        {
          text: '🚀 超车功能',
          items: [
            { text: '✨ 数据流光效边', link: '/flow/data-flow-edge' },
            { text: '📦 节点成组与子流程', link: '/flow/node-group' },
            { text: '↩ 历史撤销/重做', link: '/flow/history' }
          ]
        },
        {
          text: '性能与架构',
          items: [
            { text: '🔧 自动布局 (Dagre/ELK/Force)', link: '/flow/layout' },
            { text: '布局动画', link: '/flow/layout-animation' },
            { text: 'Pinia 状态管理', link: '/flow/pinia' },
            { text: '多实例协作', link: '/flow/multi-flow' },
            { text: '性能压力测试', link: '/flow/benchmark' }
          ]
        }
      ],
      // 英文 Flow 侧边栏
      '/en/flow/': [
        {
          text: 'Essentials',
          items: [
            { text: 'Quick Start', link: '/en/flow/basic' },
            { text: 'Changelog', link: '/en/flow/changelog' },
            { text: 'API Reference', link: '/en/flow/api' }
          ]
        },
        {
          text: 'Core Concepts',
          items: [
            { text: 'Built-in Nodes', link: '/en/flow/nodes' },
            { text: 'Edges & Connections', link: '/en/flow/edges' },
            { text: 'Plugin System', link: '/en/flow/plugins' }
          ]
        },
        {
          text: 'Interaction & Features',
          items: [
            { text: 'Interaction Logic', link: '/en/flow/interaction' },
            { text: 'Drag & Drop Tool', link: '/en/flow/drag-drop' },
            { text: 'Visibility Control', link: '/en/flow/hidden' },
            { text: 'Smart Snap-line', link: '/en/flow/alignment' },
            { text: 'Export Screenshot', link: '/en/flow/screenshot' },
            { text: 'Confirm Deletion', link: '/en/flow/confirm-delete' },
            { text: 'Viewport Animation', link: '/en/flow/viewport-transition' },
            { text: 'Teleport UI', link: '/en/flow/teleport' },
            { text: 'Persistence (Save)', link: '/en/flow/save-restore' },
            { text: 'Math Flow Project', link: '/en/flow/math' }
          ]
        },
        {
          text: 'Advanced Extension',
          items: [
            { text: 'Custom Node UI', link: '/en/flow/custom-node' },
            { text: 'Reactive Updates', link: '/en/flow/update-node' },
            { text: 'Intersection Logic', link: '/en/flow/intersections' },
            { text: 'Nested & Groups', link: '/en/flow/nested' },
            { text: 'Node Resizer', link: '/en/flow/node-resizer' },
            { text: 'Node Toolbar', link: '/en/flow/node-toolbar' },
            { text: 'Custom Edge UI', link: '/en/flow/custom-edge' },
            { text: 'Updatable Edges', link: '/en/flow/updatable-edge' },
            { text: 'Node & Edge Editing', link: '/en/flow/node-edge-edit' }
          ]
        },
        {
          text: 'New Features',
          items: [
            { text: 'Practical Use Cases', link: '/en/flow/use-cases' },
            { text: 'AI Workflow Nodes', link: '/en/flow/ai-workflow' },
            { text: 'Custom Node Templates', link: '/en/flow/custom-node-templates' },
            { text: 'Nested Node Layout', link: '/en/flow/nested-layout' },
            { text: 'Interactive Minimap', link: '/en/flow/minimap' },
            { text: 'Export', link: '/en/flow/exports' },
            { text: 'Custom Edge Types', link: '/en/flow/custom-edges' },
            { text: 'BPMN XML Import/Export', link: '/en/flow/bpmn' },
            { text: 'BPMN Process Engine', link: '/en/flow/bpmn-engine' },
            { text: 'CSS Variable Themes', link: '/en/flow/theme-system' },
            { text: 'Real-time Collaboration', link: '/en/flow/collaboration' }
          ]
        },
        {
          text: '🚀 Competitive Features',
          items: [
            { text: '✨ Data Flow Edge', link: '/en/flow/data-flow-edge' },
            { text: '📦 Node Grouping & Subflow', link: '/en/flow/node-group' },
            { text: '↩ History Undo/Redo', link: '/en/flow/history' }
          ]
        },
        {
          text: 'Scaling & Architecture',
          items: [
            { text: '🔧 Auto Layout (Dagre/ELK/Force)', link: '/en/flow/layout' },
            { text: 'Layout Animation', link: '/en/flow/layout-animation' },
            { text: 'Pinia Integration', link: '/en/flow/pinia' },
            { text: 'Concurrent Flows', link: '/en/flow/multi-flow' },
            { text: 'Benchmark Performance', link: '/en/flow/benchmark' }
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
    lineNumbers: true,
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    }
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
        '@yh-ui/icons': resolve(__dirname, '../../packages/icons/src'),
        '@yh-ui/request': resolve(__dirname, '../../packages/request/src'),
        '@yh-ui/flow': resolve(__dirname, '../../packages/flow/src')
      }
    },
    optimizeDeps: {
      include: ['monaco-editor'],
      esbuildOptions: {
        // 避免 entities 等包的缺失 sourcemap 警告
        sourcemap: false
      }
    },
    build: {
      rollupOptions: {
        onwarn(warning, warn) {
          // 忽略来自 node_modules 的缺失 sourcemap 警告（如 entities 包）
          if (
            warning.code === 'SOURCEMAP_ERROR' ||
            (warning.code === 'MISSING_EXPORT' && warning.message.includes('entities')) ||
            (warning.message && warning.message.includes('points to missing source files'))
          ) {
            return
          }
          warn(warning)
        }
      }
    },
    server: {
      headers: {
        'Cross-Origin-Opener-Policy': 'same-origin',
        'Cross-Origin-Embedder-Policy': 'credentialless'
      },
      // Ensure headers are applied via middleware as well
      proxy: {}
    },
    plugins: [
      {
        name: 'set-coop-coep',
        configureServer(server) {
          server.middlewares.use((_req, res, next) => {
            res.setHeader('Cross-Origin-Opener-Policy', 'same-origin')
            res.setHeader('Cross-Origin-Embedder-Policy', 'credentialless')
            next()
          })
        }
      }
    ],
    preview: {
      headers: {
        'Cross-Origin-Opener-Policy': 'same-origin',
        'Cross-Origin-Embedder-Policy': 'credentialless'
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler'
        }
      }
    },
    ssr: {
      noExternal: ['monaco-editor']
    }
  }
})
