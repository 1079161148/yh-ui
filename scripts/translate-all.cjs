// 完整翻译脚本 - 翻译所有文档
const fs = require('fs');
const path = require('path');

const docsEnDir = path.join(__dirname, '../docs/en');
const docsZhDir = path.join(__dirname, '../docs');

// 完整术语映射表
const TERM_MAP = {
  // 组件名称
  'Button 按钮': 'Button',
  'Icon 图标': 'Icon',
  'Input 输入框': 'Input',
  'InputNumber 数字输入框': 'InputNumber',
  'InputTag 标签输入框': 'InputTag',
  'Autocomplete 自动补全输入框': 'Autocomplete',
  'Select 选择器': 'Select',
  'Cascader 级联选择器': 'Cascader',
  'TreeSelect 树形选择': 'TreeSelect',
  'Transfer 穿梭框': 'Transfer',
  'Dialog 对话框': 'Dialog',
  'Drawer 抽屉': 'Drawer',
  'Table 表格': 'Table',
  'Form 表单': 'Form',
  'Card 卡片': 'Card',
  'Menu 菜单': 'Menu',
  'Dropdown 下拉菜单': 'Dropdown',
  'Tabs 标签页': 'Tabs',
  'Steps 步骤条': 'Steps',
  'Breadcrumb 面包屑': 'Breadcrumb',
  'Pagination 分页': 'Pagination',
  'Alert 警告提示': 'Alert',
  'Loading 加载': 'Loading',
  'Spin 加载中': 'Spin',
  'Message 消息提示': 'Message',
  'MessageBox 消息弹框': 'MessageBox',
  'Notification 通知': 'Notification',
  'Tooltip 文字提示': 'Tooltip',
  'Popconfirm 气泡确认框': 'Popconfirm',
  'Popover 气泡卡片': 'Popover',
  'Modal 对话框': 'Modal',
  'Badge 徽标': 'Badge',
  'Tag 标签': 'Tag',
  'Progress 进度条': 'Progress',
  'Image 图片': 'Image',
  'Watermark 水印': 'Watermark',
  'Marquee 跑马灯': 'Marquee',
  'Waterfall 瀑布流': 'Waterfall',
  'Tree 树形控件': 'Tree',
  'Calendar 日历': 'Calendar',
  'Countdown 倒计时': 'Countdown',
  'BackTop 回到顶部': 'BackTop',
  'Affix 固钉': 'Affix',
  'InfiniteScroll 无限滚动': 'InfiniteScroll',
  'Divider 分割线': 'Divider',
  'Skeleton 骨架屏': 'Skeleton',
  'Switch 开关': 'Switch',
  'Rate 评分': 'Rate',
  'Slider 滑块': 'Slider',
  'TimePicker 时间选择器': 'TimePicker',
  'TimeSelect 时间选择': 'TimeSelect',
  'DatePicker 日期选择器': 'DatePicker',
  'ColorPicker 颜色选择器': 'ColorPicker',
  'Checkbox 复选框': 'Checkbox',
  'Radio 单选框': 'Radio',
  'Upload 上传': 'Upload',
  'Descriptions 描述列表': 'Descriptions',
  'ConfigProvider 全局配置': 'ConfigProvider',
  'Layout 布局': 'Layout',
  
  // 常用词汇
  '基础用法': 'Basic Usage',
  '不同尺寸': 'Different Sizes',
  '旋转动画': 'Spin Animation',
  '自定义': 'Custom',
  '禁用': 'Disabled',
  '加载': 'Loading',
  '尺寸': 'Size',
  '类型': 'Type',
  '颜色': 'Color',
  '图标': 'Icon',
  '插槽': 'Slots',
  '属性': 'Props',
  '事件': 'Events',
  '方法': 'Methods',
  '默认值': 'Default',
  '说明': 'Description',
  '类型': 'Type',
  '可选值': 'Optional Values',
  '安装': 'Installation',
  '快速开始': 'Quick Start',
  '在 Nuxt 中使用': 'Use in Nuxt',
  '国际化': 'Internationalization',
  '主题系统': 'Theme System',
  '主题定制': 'Theming',
  '设计规范': 'Design Guidelines',
  
  // Table 专用
  '选择功能': 'Selection',
  '排序与筛选': 'Sort & Filter',
  '表格分页': 'Pagination',
  '自定义模板': 'Custom Template',
  '树形数据与展开行': 'Tree Data & Expand',
  '合并与汇总': 'Merge & Summary',
  '高亮与样式': 'Highlight & Style',
  '空数据提示': 'Empty Data',
  '对齐方式': 'Alignment',
  '加载状态': 'Loading State',
  '虚拟滚动': 'Virtual Scroll',
  '行拖拽': 'Row Drag',
  '列宽调整': 'Column Resize',
  '多级表头': 'Grouped Header',
  '动态列渲染': 'Dynamic Column',
  '列拖拽': 'Column Drag',
  '导入功能': 'Import',
  '导出功能': 'Export',
  '打印功能': 'Print',
  '自定义插槽模板': 'Custom Slots',
  '列配置': 'Column Config',
  'Nuxt 集成': 'Nuxt',
  'API 参考': 'API',
  
  // 常用描述
  '使用': 'Use',
  '支持': 'Support',
  '设置': 'Set',
  '配置': 'Configure',
  '显示': 'Show',
  '隐藏': 'Hide',
  '启用': 'Enable',
  '关闭': 'Close',
  '打开': 'Open',
  '点击': 'Click',
  
  // 按钮类型
  '主要按钮': 'Primary Button',
  '成功按钮': 'Success Button',
  '警告按钮': 'Warning Button',
  '危险按钮': 'Danger Button',
  '信息按钮': 'Info Button',
  '默认按钮': 'Default Button',
  '朴素按钮': 'Plain Button',
  '圆角按钮': 'Round Button',
  '禁用按钮': 'Disabled Button',
  '加载中': 'Loading',
  
  // 标题
  '## ': '## ',
  '### ': '### ',
  '#### ': '#### ',
};

// 简单的翻译函数
function translateContent(content) {
  let result = content;
  
  // 翻译文档标题 (第一行 # xxx)
  result = result.replace(/^# ([^\n]+)/, (match, title) => {
    let translated = title;
    // 查找组件名翻译
    for (const [zh, en] of Object.entries(TERM_MAP)) {
      if (title.includes(zh)) {
        translated = title.replace(zh, en);
        break;
      }
    }
    return `# ${translated}`;
  });
  
  // 翻译二级标题
  for (const [zh, en] of Object.entries(TERM_MAP)) {
    if (zh.length > 2) { // 只翻译较长的短语
      result = result.replace(new RegExp(`## ${zh}`, 'g'), `## ${en}`);
      result = result.replace(new RegExp(`### ${zh}`, 'g'), `### ${en}`);
    }
  }
  
  // 翻译表格标题
  result = result.replace(/\| 属性名 \|/g, '| Prop Name |');
  result = result.replace(/\| 说明 \|/g, '| Description |');
  result = result.replace(/\| 类型 \|/g, '| Type |');
  result = result.replace(/\| 默认值 \|/g, '| Default |');
  result = result.replace(/\| 插槽名 \|/g, '| Slot Name |');
  result = result.replace(/\| 事件名 \|/g, '| Event Name |');
  result = result.replace(/\| 方法名 \|/g, '| Method Name |');
  result = result.replace(/\| 参数 \|/g, '| Parameter |');
  result = result.replace(/\| 返回值 \|/g, '| Returns |');
  
  return result;
}

// 翻译单个文件
function translateFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const translated = translateContent(content);
  fs.writeFileSync(filePath, translated, 'utf-8');
  console.log(`Translated: ${filePath}`);
}

// 主函数
function main() {
  // 翻译 guide 目录下的文档
  const guideDir = path.join(docsEnDir, 'guide');
  if (fs.existsSync(guideDir)) {
    fs.readdirSync(guideDir).forEach(file => {
      if (file.endsWith('.md')) {
        translateFile(path.join(guideDir, file));
      }
    });
  }
  
  // 翻译 components 目录下的文档
  const componentsDir = path.join(docsEnDir, 'components');
  if (fs.existsSync(componentsDir)) {
    fs.readdirSync(componentsDir).forEach(file => {
      if (file.endsWith('.md')) {
        translateFile(path.join(componentsDir, file));
      }
    });
  }
  
  // 翻译 table 目录下的文档
  const tableDir = path.join(docsEnDir, 'table');
  if (fs.existsSync(tableDir)) {
    fs.readdirSync(tableDir).forEach(file => {
      if (file.endsWith('.md')) {
        translateFile(path.join(tableDir, file));
      }
    });
  }
  
  // 翻译 icons 目录下的文档
  const iconsDir = path.join(docsEnDir, 'icons');
  if (fs.existsSync(iconsDir)) {
    fs.readdirSync(iconsDir).forEach(file => {
      if (file.endsWith('.md')) {
        translateFile(path.join(iconsDir, file));
      }
    });
  }
  
  console.log('All translations completed!');
}

main();
