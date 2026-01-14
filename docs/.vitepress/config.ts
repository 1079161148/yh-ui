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
      { text: '指南', link: '/guide/introduction', activeMatch: '/guide/' },
      { text: '组件', link: '/components/button', activeMatch: '/components/' },
      {
        text: '0.0.1',
        items: [
          { text: '更新日志', link: '/changelog' },
          { text: 'GitHub', link: 'https://github.com/xxx/yh-ui' }
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
            { text: '快速开始', link: '/guide/quickstart' }
          ]
        },
        {
          text: '进阶',
          items: [
            { text: '主题定制', link: '/guide/theming' },
            { text: '国际化', link: '/guide/i18n' },
            { text: '设计规范', link: '/guide/design' }
          ]
        }
      ],
      '/components/': [
        {
          text: '基础组件',
          items: [
            { text: 'Button 按钮', link: '/components/button' },
            { text: 'Tag 标签', link: '/components/tag' }
          ]
        },
        {
          text: '表单组件',
          items: [
            { text: 'Input 输入框', link: '/components/input' },
            { text: 'InputNumber 数字输入框', link: '/components/input-number' },
            { text: 'InputTag 标签输入框', link: '/components/input-tag' },
            { text: 'Checkbox 复选框', link: '/components/checkbox' },
            { text: 'Radio 单选框', link: '/components/radio' },
            { text: 'Select 选择器', link: '/components/select' }
          ]
        },
        {
          text: '数据展示',
          items: [{ text: 'Table 表格', link: '/components/table' }]
        },
        {
          text: '反馈组件',
          items: [
            { text: 'Dialog 对话框', link: '/components/dialog' },
            { text: 'Message 消息', link: '/components/message' }
          ]
        }
      ]
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/xxx/yh-ui' }],

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
        '@yh-ui/theme': resolve(__dirname, '../../packages/theme/src')
      }
    }
  }
})
