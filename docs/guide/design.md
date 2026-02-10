# 设计规范

YH-UI 遵循现代化的设计原则，提供一致、美观、易用的用户界面。

## 设计原则

### 1. 一致性 (Consistency)

保持视觉和交互的一致性：

- **视觉一致性**：相同功能的组件具有相同的外观
- **交互一致性**：相同操作具有相同的反馈
- **语言一致性**：使用统一的术语和措辞

### 2. 反馈 (Feedback)

用户的每个操作都应该有清晰的反馈：

- **即时反馈**：按钮点击有 hover/active 状态
- **过程反馈**：Loading 状态显示操作进行中
- **结果反馈**：Message/Notification 通知操作结果

### 3. 效率 (Efficiency)

减少用户的操作成本：

- **减少步骤**：简化流程，减少不必要的操作
- **提供默认值**：合理的默认配置
- **键盘友好**：支持 Tab 导航和快捷键

### 4. 可控性 (Controllability)

用户应该能够控制界面：

- **可撤销**：支持撤销操作
- **可配置**：提供自定义选项
- **可预测**：操作结果可预期

---

## 色彩系统

### 品牌色

| 颜色 | 变量名 | 用途 |
| --- | --- | --- |
| <span style="background:#409eff;color:white;padding:2px 8px;border-radius:4px">#409eff</span> | `--yh-color-primary` | 主要操作、链接、选中状态 |
| <span style="background:#67c23a;color:white;padding:2px 8px;border-radius:4px">#67c23a</span> | `--yh-color-success` | 成功、完成、正确 |
| <span style="background:#e6a23c;color:white;padding:2px 8px;border-radius:4px">#e6a23c</span> | `--yh-color-warning` | 警告、提醒 |
| <span style="background:#f56c6c;color:white;padding:2px 8px;border-radius:4px">#f56c6c</span> | `--yh-color-danger` | 错误、危险、删除 |
| <span style="background:#909399;color:white;padding:2px 8px;border-radius:4px">#909399</span> | `--yh-color-info` | 信息、说明 |

### 文字色

| 颜色 | 变量名 | 用途 |
| --- | --- | --- |
| <span style="background:#303133;color:white;padding:2px 8px;border-radius:4px">#303133</span> | `--yh-text-color-primary` | 标题、主要文字 |
| <span style="background:#606266;color:white;padding:2px 8px;border-radius:4px">#606266</span> | `--yh-text-color-regular` | 正文内容 |
| <span style="background:#909399;color:white;padding:2px 8px;border-radius:4px">#909399</span> | `--yh-text-color-secondary` | 次要信息 |
| <span style="background:#a8abb2;color:white;padding:2px 8px;border-radius:4px">#a8abb2</span> | `--yh-text-color-placeholder` | 占位文字 |
| <span style="background:#c0c4cc;color:black;padding:2px 8px;border-radius:4px">#c0c4cc</span> | `--yh-text-color-disabled` | 禁用状态 |

### 边框色

| 颜色 | 变量名 | 用途 |
| --- | --- | --- |
| <span style="background:#dcdfe6;padding:2px 8px;border-radius:4px">#dcdfe6</span> | `--yh-border-color` | 默认边框 |
| <span style="background:#e4e7ed;padding:2px 8px;border-radius:4px">#e4e7ed</span> | `--yh-border-color-light` | 浅色边框 |
| <span style="background:#ebeef5;padding:2px 8px;border-radius:4px">#ebeef5</span> | `--yh-border-color-lighter` | 更浅边框 |

---

## 字体系统

### 字体族

```css
--yh-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 
                  'Helvetica Neue', Arial, 'Noto Sans', sans-serif;

--yh-font-family-monospace: 'SFMono-Regular', Consolas, 'Liberation Mono', 
                            Menlo, Courier, monospace;
```

### 字号

| 变量 | 大小 | 用途 |
| --- | --- | --- |
| `--yh-font-size-extra-large` | 20px | 大标题 |
| `--yh-font-size-large` | 18px | 标题 |
| `--yh-font-size-medium` | 16px | 副标题 |
| `--yh-font-size-base` | 14px | 正文 (默认) |
| `--yh-font-size-small` | 13px | 辅助文字 |
| `--yh-font-size-extra-small` | 12px | 标签、说明 |

### 行高

| 变量 | 值 | 用途 |
| --- | --- | --- |
| `--yh-line-height-tight` | 1.3 | 紧凑文字 |
| `--yh-line-height-normal` | 1.5 | 正文 |
| `--yh-line-height-loose` | 1.7 | 多行文本 |

---

## 间距系统

基于 4px 的间距系统：

| 变量 | 值 | 用途 |
| --- | --- | --- |
| `--yh-spacing-xs` | 4px | 最小间距 |
| `--yh-spacing-sm` | 8px | 小间距 |
| `--yh-spacing-md` | 16px | 中等间距 |
| `--yh-spacing-lg` | 24px | 大间距 |
| `--yh-spacing-xl` | 32px | 超大间距 |

---

## 圆角

| 变量 | 值 | 用途 |
| --- | --- | --- |
| `--yh-radius-sm` | 2px | 小元素 |
| `--yh-radius-base` | 4px | 默认 |
| `--yh-radius-md` | 8px | 中等 |
| `--yh-radius-lg` | 12px | 大元素 |
| `--yh-radius-round` | 20px | 圆角按钮 |

---

## 阴影

| 变量 | 用途 |
| --- | --- |
| `--yh-shadow-sm` | 轻微阴影，如卡片 |
| `--yh-shadow-base` | 默认阴影，如下拉菜单 |
| `--yh-shadow-md` | 中等阴影，如弹窗 |
| `--yh-shadow-lg` | 大阴影，如模态框 |

---

## 动画

### 持续时间

| 变量 | 值 | 用途 |
| --- | --- | --- |
| `--yh-duration-fast` | 100ms | 快速反馈 |
| `--yh-duration-base` | 200ms | 默认动画 |
| `--yh-duration-slow` | 300ms | 复杂动画 |

### 缓动函数

| 变量 | 值 | 用途 |
| --- | --- | --- |
| `--yh-timing-ease` | ease | 默认 |
| `--yh-timing-ease-in` | ease-in | 进入 |
| `--yh-timing-ease-out` | ease-out | 退出 |
| `--yh-timing-ease-in-out` | ease-in-out | 平滑 |

---

## 层级 (z-index)

| 变量 | 值 | 用途 |
| --- | --- | --- |
| `--yh-z-index-normal` | 1 | 普通元素 |
| `--yh-z-index-top` | 1000 | 置顶元素 |
| `--yh-z-index-popper` | 2000 | 弹出层 |
| `--yh-z-index-overlay` | 2001 | 遮罩层 |
| `--yh-z-index-modal` | 2002 | 模态框 |
| `--yh-z-index-popover` | 2003 | 气泡 |
| `--yh-z-index-tooltip` | 2004 | 提示 |
| `--yh-z-index-loading` | 2005 | 加载层 |

---

## 响应式断点

| 变量 | 值 | 设备 |
| --- | --- | --- |
| `--yh-breakpoint-xs` | 0 | 超小屏 |
| `--yh-breakpoint-sm` | 576px | 手机横屏 |
| `--yh-breakpoint-md` | 768px | 平板 |
| `--yh-breakpoint-lg` | 992px | 小桌面 |
| `--yh-breakpoint-xl` | 1200px | 桌面 |
| `--yh-breakpoint-xxl` | 1400px | 大桌面 |

---

## 无障碍设计

YH-UI 遵循 WCAG 2.1 AA 标准：

- **颜色对比度**：文字与背景对比度 ≥ 4.5:1
- **焦点可见**：所有交互元素都有清晰的焦点样式
- **键盘导航**：支持完整的键盘操作
- **语义化**：使用正确的 ARIA 属性
- **减少动画**：支持 `prefers-reduced-motion`

---

## 更多资源

- [主题系统](/guide/theme) - 了解如何自定义主题
- [主题系统示例](/guide/theme-examples) - 查看交互式示例
- [主题定制](/guide/theming) - 详细的定制文档

