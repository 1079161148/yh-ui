// 批量翻译脚本 - 翻译更多组件文档
const fs = require('fs');
const path = require('path');

const docsEnDir = path.join(__dirname, '../docs/en');
const docsZhDir = path.join(__dirname, '../docs');

// 术语映射表
const TERM_MAP = {
  // 组件名称
  'Button 按钮': 'Button',
  'Icon 图标': 'Icon',
  'Input 输入框': 'Input',
  'Select 选择器': 'Select',
  'Dialog 对话框': 'Dialog',
  'Table 表格': 'Table',
  'Form 表单': 'Form',
  'Card 卡片': 'Card',
  'Menu 菜单': 'Menu',
  'Tabs 标签页': 'Tabs',
  'Pagination 分页': 'Pagination',
  'Modal 对话框': 'Modal',
  
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
    const files = fs.readdirSync(componentsDir);
    files.forEach(file => {
      if (file.endsWith('.md')) {
        translateFile(path.join(componentsDir, file));
      }
    });
  }
  
  console.log('Translation completed!');
}

main();
