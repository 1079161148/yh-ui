# YH-UI 文档国际化 (i18n) 解决方案

## 📋 当前状态

- ✅ 已有中文文档: `docs/components/*.md` (57个组件)
- ✅ 已有指南文档: `docs/guide/*.md`
- ✅ 已有图标文档: `docs/icons/*.md`

## 🚀 快速开始

### 方法一：使用翻译脚本（推荐）

```bash
# 翻译所有文档
node scripts/i18n-docs.js --all

# 翻译单个组件
node scripts/i18n-docs.js button
```

### 方法二：使用 AI 翻译工具

推荐工具：

1. **DeepL API** (付费，但质量最高)
   - 注册获取 API Key
   - 使用 `deepl-node` 包

2. **Google Translate** (免费有限制)
   - 使用 `google-translate-api`

3. **ChatGPT/GPT-4** (质量好，成本适中)
   - 批量处理文档

### 方法三：社区协作

在 GitHub 上创建 `docs-en` 分支，邀请社区贡献翻译。

## 📁 目录结构

翻译后的目录结构：

```
docs/
├── components/
│   ├── button.md      # 中文
│   ├── en/
│   │   └── button.md  # 英文
│   └── ...
├── guide/
│   ├── introduction.md
│   └── en/
│       └── introduction.md
└── icons/
    ├── index.md
    └── en/
        └── index.md
```

## ⚙️ VitePress i18n 配置

创建 `docs/.vitepress/config.en.ts`:

```typescript
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'YH-UI',
  description: 'A modern Vue 3 UI Library',

  lang: 'en-US',

  themeConfig: {
    // 英文导航
    nav: [
      { text: 'Home', link: '/en/' },
      { text: 'Guide', link: '/en/guide/introduction' },
      { text: 'Components', link: '/en/components/button' }
    ],

    // 英文侧边栏
    sidebar: {
      '/en/components/': [
        {
          text: 'Basic Components',
          items: [
            { text: 'Button', link: '/en/components/button' },
            { text: 'Icon', link: '/en/components/icon' }
          ]
        }
      ]
    }
  }
})
```

## 🔧 最佳实践

### 1. 术语一致性

在 `scripts/i18n-docs.js` 中维护术语映射表：

```javascript
const TERM_MAP = {
  'Button 按钮': 'Button',
  'Input 输入框': 'Input',
  'Switch 开关': 'Switch'
  // ...
}
```

### 2. 代码示例保留

翻译时保留代码块不变：

```markdown
## Button 按钮

### 基础用法

<YhButton>按钮</YhButton>

\`\`\`vue
<YhButton>按钮</YhButton>
\`\`\`
```

### 3. 人工校对

机器翻译后必须人工校对，重点检查：

- [ ] 术语翻译准确性
- [ ] 代码示例完整性
- [ ] 链接跳转正确性
- [ ] 中文标点符号替换为英文

## 📝 常用术语表

| 中文       | 英文            |
| ---------- | --------------- |
| 基础用法   | Basic Usage     |
| 不同尺寸   | Different Sizes |
| 禁用状态   | Disabled State  |
| 加载状态   | Loading State   |
| 自定义内容 | Custom Content  |
| API        | API             |
| Props      | Props           |
| Slots      | Slots           |
| Events     | Events          |
| 类型       | Type            |
| 默认值     | Default         |
| 说明       | Description     |

## 🚢 发布时

1. 确保英文文档完整
2. 配置域名或子路径:
   - 中文: `yhui.example.com/` 或 `yhui.example.com/zh/`
   - 英文: `yhui.example.com/en/`

3. 更新 `package.json` 中的 `publishConfig`
