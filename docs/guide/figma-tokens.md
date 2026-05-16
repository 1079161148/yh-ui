# Figma 与 Token 体系

YH-UI 的设计资产应以 Token 为中心：Figma 负责设计表达，代码中的 CSS 变量负责运行时落地，两者通过命名和语义保持一致。

## Token 分层

| 层级         | 示例                              | 说明                           |
| ------------ | --------------------------------- | ------------------------------ |
| 基础 Token   | `blue-500`、`gray-100`            | 原始色阶、字号、间距           |
| 语义 Token   | `color-primary`、`text-secondary` | 面向业务语义，避免直接引用色阶 |
| 组件 Token   | `button-border-radius`            | 组件专属差异，数量应受控       |
| 运行时 Token | `--yh-color-primary`              | CSS 变量，应用最终消费         |

## 命名规则

- Figma Token 使用语义命名，例如 `color/primary/default`。
- CSS 变量使用 `--yh-` 前缀，例如 `--yh-color-primary`。
- 组件 Token 使用组件名作为命名空间，例如 `--yh-button-border-radius`。
- 避免用视觉结果命名业务语义，例如不要把危险色命名为 `red-button`。

## Figma 文件建议

正式开源版本建议至少包含：

- Color styles：品牌色、语义色、文本色、边框色、背景色。
- Text styles：标题、正文、辅助文本、代码字体。
- Effect styles：基础阴影、弹层阴影、聚焦环。
- Component variants：尺寸、类型、状态、禁用、加载、暗色。
- Token reference page：列出 Token 名称、用途和代码变量。

## 设计到代码流程

1. 设计侧提出 Token 变更，说明业务原因和影响范围。
2. 维护者评估是否已有 Token 可复用。
3. 在 Figma 和代码中同步命名。
4. 更新 `@yh-ui/theme`、文档和 Demo。
5. 跑亮色、暗色、SSR、docs playground、consumer smoke。

## 变更规范

- 新增 Token 是 minor 变更。
- 修改 Token 默认值通常是 minor；如果影响视觉兼容性，需在 changelog 标注。
- 删除或重命名公开 Token 是 breaking change，只能进入 major。
- 组件内部私有变量不承诺兼容，公开文档列出的变量才进入稳定契约。

## 与代码对应

```css
:root {
  --yh-color-primary: #409eff;
  --yh-text-color-primary: #303133;
  --yh-border-color: #dcdfe6;
  --yh-radius-base: 4px;
}
```

## 交付清单

- Figma Token 与 CSS 变量命名一致。
- 每个新增 Token 有语义说明和默认值。
- 暗色模式有对应值或明确继承策略。
- 文档页展示使用方式和注意事项。
- 组件测试或视觉 smoke 覆盖关键状态。
