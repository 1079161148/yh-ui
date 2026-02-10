import { defineConfig } from 'vitepress'
import { resolve } from 'node:path'

export default defineConfig({
  title: 'YH-UI',
  description: '一个现代化的 Vue 3 组件库',

  lang: 'zh-CN',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#409eff' }]
  ],

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/introduction', activeMatch: '/guide/' },
      { text: '组件', link: '/components/button', activeMatch: '/components/' },
      { text: 'Table 表格', link: '/table/basic', activeMatch: '/table/' },
      {
        text: '0.0.1',
        items: [
          { text: '更新日志', link: '/changelog' },
          { text: 'GitHub', link: 'https://github.com/1079161148/yh-ui' }
        ]
      }
    ],

    sidebar: {
      '/guide/': [
        {
          text: '开始',
          items: [
            { text: '简介', link: '/guide/introduction' },
            { text: '安装', link: '/guide/installation' },
            { text: '快速开始', link: '/guide/quickstart' },
            { text: '在 Nuxt 中使用', link: '/guide/nuxt' },
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

      '/components/': [
        {
          text: '基础组件',
          items: [
            { text: 'Layout 布局', link: '/components/layout' },
            { text: 'Button 按钮', link: '/components/button' },
            { text: 'Icon 图标', link: '/components/icon' },
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
            { text: 'Upload 上传', link: '/components/upload' }
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
    },

    outline: {
      label: '页面导航',
      level: [2, 3]
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short'
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
        '@yh-ui/theme': resolve(__dirname, '../../packages/theme/src'),
        '@yh-ui/locale': resolve(__dirname, '../../packages/locale/src')
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
