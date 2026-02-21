# Changelog

All notable changes to YH-UI will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- 完整的 GitHub Actions CI/CD 流水线（代码质量、测试覆盖率、构建验证、自动发布）
- 单元测试覆盖所有核心组件（Button、Input、Form、Select、Dialog、Table 等）

---

## [0.1.0] - 2026-02-21

### ✨ 初始正式发布

这是 YH-UI 的第一个公开版本。经过深度设计与开发，本版本包含：

### 🧩 组件（61 个）

#### 基础组件
- **Button** - 按钮，支持 6 种类型、3 种尺寸、plain/round/circle/text/link/block 等变体
- **Icon** - 图标，基于 SVG 的图标系统

#### 表单组件
- **Input** - 输入框，支持视觉变体（default/filled/borderless/underlined）、加载状态、状态反馈、聚焦自选、Esc清空、datalist、字数统计自定义
- **InputNumber** - 数字输入框
- **InputTag** - 标签输入框，支持动态标签创建
- **Select** - 选择器，支持单选/多选/远程搜索/分组/虚拟化
- **Cascader** - 级联选择器
- **Checkbox** - 复选框 & 组
- **Radio** - 单选框 & 组
- **Switch** - 开关
- **Slider** - 滑块
- **Rate** - 评分
- **ColorPicker** - 颜色选择器
- **DatePicker** - 日期选择器（支持 date/daterange/month/year 等多种 type）
- **TimePicker** - 时间选择器
- **TimeSelect** - 时间选择（步进式）
- **Form** + **FormItem** - 表单 & 校验，集成 async-validator
- **Upload** - 上传，支持拖拽/多文件/自定义请求

#### 数据展示
- **Table** - 表格，媲美 vxe-table 的功能密度：
  - 虚拟滚动（万行性能保障）
  - 行/列拖拽排序（原生拖拽 API）
  - 列宽调整
  - 分组表头
  - 合并单元格（spanMethod）
  - 汇总行
  - 右键菜单
  - 工具栏（导出/打印/列设置/全屏）
  - CSV、XLSX、PDF 导出
  - 打印功能
  - 行内编辑
  - 树形数据（懒加载）
  - 表单校验集成
- **Tree** - 树形控件，支持懒加载/虚拟滚动
- **TreeSelect** - 树形选择器
- **Pagination** - 分页
- **Badge** - 徽标
- **Tag** - 标签
- **Avatar** - （规划中）
- **Image** - 图片，支持懒加载/预览/图片组
- **Descriptions** - 描述列表
- **Calendar** - 日历
- **Progress** - 进度条
- **Skeleton** - 骨架屏
- **Countdown** - 倒计时
- **InfiniteScroll** - 无限滚动指令
- **Waterfall** - 瀑布流布局（特色组件）
- **Watermark** - 水印

#### 反馈组件
- **Alert** - 警告提示
- **Dialog** - 对话框
- **Drawer** - 抽屉
- **Message** - 消息提示
- **MessageBox** - 消息弹框（Alert/Confirm/Prompt）
- **Notification** - 通知
- **Popconfirm** - 气泡确认框
- **Loading** - 加载（指令和服务调用）
- **Spin** - 加载旋转

#### 导航组件
- **Menu** - 导航菜单（水平/垂直/折叠）
- **Tabs** - 标签页
- **Breadcrumb** - 面包屑
- **Dropdown** - 下拉菜单
- **Steps** - 步骤条
- **Affix** - 固钉
- **BackTop** - 返回顶部

#### 布局组件
- **Row** + **Col** - 栅格布局（24列系统，响应式断点）
- **Divider** - 分割线
- **Marquee** - 滚动公告（特色组件）

#### 配置提供
- **ConfigProvider** - 全局配置提供（locale/size/zIndex/theme）

### 🎨 主题系统（行业领先）
- 12 种预设主题（default/dark/blue/green/purple/orange/rose/amber/teal/indigo/slate/zinc）
- 色盲友好模式（protanopia/deuteranopia/tritanopia/achromatopsia）
- WCAG 2.1 对比度自动校验
- 3 种密度配置（comfortable/compact/dense）
- 4 种颜色算法（default/vibrant/muted/pastel）
- 主题快照与历史回滚
- 响应式断点主题
- 主题切换动画
- 从主色自动推导完整调色板

### 🌍 国际化（67 种语言）
超越 Element Plus(43种)、Naive UI(25种)，与 Ant Design 持平。

### 🔌 Nuxt 3 原生支持
提供 `@yh-ui/nuxt` 模块，零配置支持 SSR。

### 🛠️ Hooks
- `useNamespace` - BEM 命名工具
- `useLocale` - 国际化
- `useFormItem` - 表单集成
- `useConfig` - 全局配置
- `useZIndex` - 层级管理
- `useId` - 唯一ID生成
- `useScrollLock` - 滚动锁定
- `useEventListener` - 事件监听
- `useClickOutside` - 点击外部
- `useVirtualScroll` - 虚拟滚动
- `useCache` - 缓存工具

---

[Unreleased]: https://github.com/1079161148/yh-ui/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/1079161148/yh-ui/releases/tag/v0.1.0
