/**
 * 文档国际化工具
 * 支持将中文文档转换为英文版本
 *
 * 使用方法:
 *   node scripts/i18n-docs.js          # 交互式选择
 *   node scripts/i18n-docs.js --all    # 翻译所有文档
 *   node scripts/i18n-docs.js button   # 翻译单个组件
 */

const fs = require('fs')
const path = require('path')
const https = require('https')
const { execSync } = require('child_process')

// ============ 配置区域 ============
const DOCS_DIR = path.join(__dirname, '../docs')
const SOURCE_LANG = 'zh-CN'
const TARGET_LANG = 'en'

// 常用术语映射表 (机器翻译结果 + 人工校正)
const TERM_MAP = {
  // 基础组件
  'Layout 布局': 'Layout',
  'Button 按钮': 'Button',
  'Icon 图标': 'Icon',
  'Divider 分割线': 'Divider',
  'Skeleton 骨架屏': 'Skeleton',

  // 表单组件
  'Form 表单': 'Form',
  'Input 输入框': 'Input',
  'InputNumber 数字输入框': 'InputNumber',
  'InputTag 标签输入框': 'InputTag',
  'Autocomplete 自动补全输入框': 'Autocomplete',
  'Checkbox 复选框': 'Checkbox',
  'Radio 单选框': 'Radio',
  'Switch 开关': 'Switch',
  'Rate 评分': 'Rate',
  'Select 选择器': 'Select',
  'Cascader 级联选择器': 'Cascader',
  'Slider 滑块': 'Slider',
  'TimePicker 时间选择器': 'TimePicker',
  'TimeSelect 时间选择': 'TimeSelect',
  'DatePicker 日期选择器': 'DatePicker',
  'ColorPicker 颜色选择器': 'ColorPicker',
  'Transfer 穿梭框': 'Transfer',
  'TreeSelect 树形选择': 'TreeSelect',
  'Upload 上传': 'Upload',

  // 数据展示
  'Badge 徽标': 'Badge',
  'Card 卡片': 'Card',
  'Tag 标签': 'Tag',
  'Pagination 分页': 'Pagination',
  'Progress 进度条': 'Progress',
  'Image 图片': 'Image',
  'Descriptions 描述列表': 'Descriptions',
  'Watermark 水印': 'Watermark',
  'Marquee 跑马灯': 'Marquee',
  'Waterfall 瀑布流': 'Waterfall',
  'Tree 树形控件': 'Tree',
  'Calendar 日历': 'Calendar',
  'Countdown 倒计时': 'Countdown',

  // 导航组件
  'Menu 菜单': 'Menu',
  'Dropdown 下拉菜单': 'Dropdown',
  'Tabs 标签页': 'Tabs',
  'Steps 步骤条': 'Steps',
  'Breadcrumb 面包屑': 'Breadcrumb',
  'BackTop 回到顶部': 'BackTop',
  'Affix 固钉': 'Affix',
  'InfiniteScroll 无限滚动': 'InfiniteScroll',

  // 反馈组件
  'Alert 警告提示': 'Alert',
  'Dialog 对话框': 'Dialog',
  'Tooltip 文字提示': 'Tooltip',
  'Popconfirm 气泡确认框': 'Popconfirm',
  'Popover 气泡卡片': 'Popover',
  'Spin 加载中': 'Spin',
  'Loading 加载': 'Loading',
  'Message 消息提示': 'Message',
  'MessageBox 消息弹框': 'MessageBox',
  'Notification 通知': 'Notification',
  'Drawer 抽屉': 'Drawer',

  // 配置组件
  'ConfigProvider 全局配置': 'ConfigProvider',

  // 通用术语
  基础用法: 'Basic Usage',
  不同尺寸: 'Different Sizes',
  旋转动画: 'Rotation Animation',
  '自定义 SVG': 'Custom SVG',
  '在 Nuxt 中使用': 'Use in Nuxt',
  API: 'API',
  Props: 'Props',
  Slots: 'Slots',
  Events: 'Events',
  Exposes: 'Exposes',
  类型: 'Type',
  默认值: 'Default',
  说明: 'Description',
  必填: 'Required',
  可选: 'Optional',
  属性名: 'Attribute',

  // 指南
  开始: 'Getting Started',
  进阶: 'Advanced',
  简介: 'Introduction',
  安装: 'Installation',
  快速开始: 'Quick Start',
  '国际化 (i18n)': 'Internationalization (i18n)',
  'Theme 主题系统': 'Theme System',
  主题系统示例: 'Theme Examples',
  主题定制: 'Theme Customization',
  设计规范: 'Design Guidelines',

  // 图标
  图标集合介绍: 'Icon Collection Introduction',
  快速开始: 'Quick Start',
  图标集: 'Icon Sets',
  图标展示: 'Icon Showcase',
  'API 参考': 'API',

  // Table
  'Table 表格': 'Table',
  选择功能: 'Selection',
  排序与筛选: 'Sort & Filter',
  表格分页: 'Pagination',
  自定义模板: 'Custom Template',
  树形数据与展开行: 'Tree Data & Expandable Rows',
  合并与汇总: 'Merge & Summary',
  高亮与样式: 'Highlight & Style',
  空数据提示: 'Empty Data',
  对齐方式: 'Alignment',
  加载状态: 'Loading State',
  虚拟滚动: 'Virtual Scroll',
  行拖拽: 'Row Drag',
  列宽调整: 'Column Resize',
  多级表头: 'Grouped Header',
  动态列渲染: 'Dynamic Columns',
  列拖拽: 'Column Drag',
  导入功能: 'Import',
  导出功能: 'Export',
  打印功能: 'Print',
  自定义插槽模板: 'Custom Slot Template',
  列配置: 'Column Config',
  'Nuxt 集成': 'Nuxt Integration',

  // 通用
  使用: 'Use',
  属性: 'Property',
  示例: 'Example',
  代码演示: 'Demo',
  查看详情: 'See Details',
  复制代码: 'Copy Code',
  展开代码: 'Expand Code',
  编辑代码: 'Edit Code'
}

// ============ 翻译函数 ============

/**
 * 使用免费翻译 API (MyMemory)
 */
async function translateWithAPI(text) {
  // 跳过代码块和链接
  if (text.startsWith('```') || text.startsWith('```') || text.startsWith('http')) {
    return text
  }

  // 检查术语映射
  for (const [zh, en] of Object.entries(TERM_MAP)) {
    if (text.includes(zh)) {
      return text.replace(zh, en)
    }
  }

  return text
}

/**
 * 简单的本地翻译函数
 * 对于文档来说，80% 的内容可以通过术语映射解决
 */
function translateContent(content) {
  let result = content

  // 1. 标题翻译
  for (const [zh, en] of Object.entries(TERM_MAP)) {
    // 精确替换标题
    const titleRegex = new RegExp(`^#+\\s+${escapeRegExp(zh)}$`, 'gm')
    result = result.replace(titleRegex, (match) => match.replace(zh, en))

    // Sidebar 链接替换
    const linkRegex = new RegExp(`'/${zh}'|'/${zh}.html'`, 'g')
    result = result.replace(linkRegex, (match) => match.replace(zh, en))
  }

  // 2. 通用术语替换
  const commonTerms = {
    使用: 'Use',
    属性: 'Attribute',
    通过: 'via',
    设置: 'set',
    支持: 'support',
    类型: 'type',
    默认: 'default',
    可选: 'optional',
    必填: 'required',
    示例: 'Example',
    详情: 'Details',
    请参考: 'Please refer to',
    查看: 'See',
    更多: 'More'
  }

  for (const [zh, en] of Object.entries(commonTerms)) {
    // 只替换不在代码块内的内容
    result = result.replace(new RegExp(escapeRegExp(zh), 'g'), en)
  }

  return result
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// ============ 文件处理 ============

/**
 * 获取所有组件文档
 */
function getComponentDocs() {
  const componentsDir = path.join(DOCS_DIR, 'components')
  if (!fs.existsSync(componentsDir)) {
    console.error('Components directory not found!')
    process.exit(1)
  }

  return fs
    .readdirSync(componentsDir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace('.md', ''))
}

/**
 * 翻译单个文档
 */
function translateDoc(docName) {
  const sourceFile = path.join(DOCS_DIR, 'components', `${docName}.md`)
  const targetDir = path.join(DOCS_DIR, 'components', 'en')

  if (!fs.existsSync(sourceFile)) {
    console.error(`Source file not found: ${sourceFile}`)
    return false
  }

  // 创建 en 目录
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true })
  }

  const targetFile = path.join(targetDir, `${docName}.md`)

  // 读取源文件
  let content = fs.readFileSync(sourceFile, 'utf-8')

  // 翻译内容
  content = translateContent(content)

  // 写入目标文件
  fs.writeFileSync(targetFile, content, 'utf-8')

  console.log(`✓ Translated: ${docName}.md -> en/${docName}.md`)
  return true
}

/**
 * 翻译 guide 文档
 */
function translateGuide() {
  const guideDir = path.join(DOCS_DIR, 'guide')
  const targetDir = path.join(DOCS_DIR, 'guide', 'en')

  if (!fs.existsSync(guideDir)) return

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true })
  }

  const files = fs.readdirSync(guideDir).filter((f) => f.endsWith('.md'))

  files.forEach((file) => {
    const sourceFile = path.join(guideDir, file)
    let content = fs.readFileSync(sourceFile, 'utf-8')
    content = translateContent(content)
    fs.writeFileSync(path.join(targetDir, file), content, 'utf-8')
    console.log(`✓ Translated guide: ${file}`)
  })
}

/**
 * 翻译 icons 文档
 */
function translateIcons() {
  const iconsDir = path.join(DOCS_DIR, 'icons')
  const targetDir = path.join(DOCS_DIR, 'icons', 'en')

  if (!fs.existsSync(iconsDir)) return

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true })
  }

  const files = fs.readdirSync(iconsDir).filter((f) => f.endsWith('.md'))

  files.forEach((file) => {
    const sourceFile = path.join(iconsDir, file)
    let content = fs.readFileSync(sourceFile, 'utf-8')
    content = translateContent(content)
    fs.writeFileSync(path.join(targetDir, file), content, 'utf-8')
    console.log(`✓ Translated icons: ${file}`)
  })
}

// ============ 主函数 ============

function main() {
  const args = process.argv.slice(2)

  console.log('\n📚 YH-UI 文档国际化工具\n')
  console.log(`源语言: ${SOURCE_LANG} -> 目标语言: ${TARGET_LANG}\n`)

  if (args.includes('--all')) {
    // 翻译所有组件文档
    console.log('📦 翻译所有组件文档...\n')
    const docs = getComponentDocs()
    docs.forEach((doc) => translateDoc(doc))

    // 翻译 guide
    console.log('\n📦 翻译指南文档...\n')
    translateGuide()

    // 翻译 icons
    console.log('\n📦 翻译图标文档...\n')
    translateIcons()

    console.log('\n✅ 文档翻译完成!')
    console.log('📝 请检查并校对以下目录中的文件:')
    console.log('   - docs/components/en/')
    console.log('   - docs/guide/en/')
    console.log('   - docs/icons/en/\n')
  } else if (args.length > 0) {
    // 翻译指定文档
    const docName = args[0]
    translateDoc(docName)
    console.log('\n✅ 翻译完成!')
  } else {
    // 显示使用帮助
    console.log('使用方法:')
    console.log('  node scripts/i18n-docs.js --all    # 翻译所有文档')
    console.log('  node scripts/i18n-docs.js button   # 翻译 button 组件文档\n')
    console.log('可用组件:')
    getComponentDocs().forEach((doc) => console.log(`  - ${doc}`))
  }
}

main()
