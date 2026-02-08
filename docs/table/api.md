# Table 表格 - API 参考

## Table 属性

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 表格数据 | `Array<Record<string, unknown>>` | `[]` |
| columns | 列配置 | `TableColumn[]` | `[]` |
| row-key | 行唯一标识 | `string \| ((row) => string \| number)` | `'id'` |
| size | 表格尺寸 | `'large' \| 'default' \| 'small'` | `'default'` |
| width | 表格宽度 | `number \| string` | — |
| height | 表格高度 | `number \| string` | — |
| max-height | 表格最大高度 | `number \| string` | — |
| border | 是否显示边框 | `boolean \| 'full' \| 'outer' \| 'inner' \| 'none'` | `false` |
| stripe | 是否显示斑马纹 | `boolean` | `false` |
| fit | 是否自适应父容器宽度 | `boolean` | `true` |
| show-header | 是否显示表头 | `boolean` | `true` |
| show-index | 是否显示序号列 | `boolean` | `false` |
| highlight-current-row | 是否高亮当前行 | `boolean` | `false` |
| current-row-key | 当前选中行的 key (v-model) | `string \| number` | — |
| table-layout | 表格布局 | `'fixed' \| 'auto'` | `'fixed'` |
| empty-text | 空数据显示文本 | `string` | `'暂无数据'` |
| loading | 是否显示加载状态 | `boolean \| LoadingConfig` | `false` |
| resizable | 是否可调整列宽 | `boolean` | `false` |
| lazy | 是否懒加载子节点 | `boolean` | `false` |
| load-method | 懒加载方法 | `(row) => Promise<unknown[]>` | — |
| auto-height | 自适应内容高度 | `boolean` | `false` |
| keep-scroll | 数据更新后保持滚动位置 | `boolean` | `false` |
| scroll-optimize | 启用滚动优化 | `boolean` | `true` |
| tooltip-effect | 溢出提示主题 | `'dark' \| 'light'` | `'dark'` |
| row-class-name | 行的 className | `string \| ((params) => string)` | — |
| row-style | 行的 style | `CSSProperties \| ((params) => CSSProperties)` | — |
| cell-class-name | 单元格的 className | `string \| ((params) => string)` | — |
| cell-style | 单元格的 style | `CSSProperties \| ((params) => CSSProperties)` | — |
| header-row-class-name | 表头行的 className | `string \| ((params) => string)` | — |
| header-row-style | 表头行的 style | `CSSProperties \| ((params) => CSSProperties)` | — |
| header-cell-class-name | 表头单元格的 className | `string \| ((params) => string)` | — |
| header-cell-style | 表头单元格的 style | `CSSProperties \| ((params) => CSSProperties)` | — |
| span-method | 合并单元格方法 | `(params) => { rowspan, colspan } \| [rowspan, colspan]` | — |
| selection-config | 选择配置 | `SelectionConfig` | — |
| sort-config | 排序配置 | `SortConfig` | — |
| filter-config | 筛选配置 | `FilterConfig` | — |
| tree-config | 树形配置 | `TreeConfig` | — |
| expand-config | 展开配置 | `ExpandConfig` | — |
| virtual-config | 虚拟滚动配置 | `VirtualConfig` | — |
| pagination | 分页配置 | `boolean \| PaginationConfig` | `false` |
| summary-config | 汇总行配置 | `SummaryConfig` | — |
| toolbar-config | 工具栏配置 | `ToolbarConfig` | — |
| drag-config | 拖拽配置 | `DragConfig` | — |
| row-config | 行配置 | `RowConfig` | — |
| header-config | 表头配置 | `HeaderConfig` | — |
| context-menu-config | 右键菜单配置 | `ContextMenuConfig` | — |
| empty-config | 空状态配置 | `EmptyConfig` | — |
| index-config | 序号列配置 | `IndexConfig` | — |
| sync-scroll | 是否同步滚动表头表尾 | `boolean` | `true` |

## Table 事件

| 事件名 | 说明 | 类型 |
| --- | --- | --- |
| row-click | 行点击时触发 | `(row, column, event) => void` |
| row-dblclick | 行双击时触发 | `(row, column, event) => void` |
| row-contextmenu | 行右键时触发 | `(row, column, event) => void` |
| cell-click | 单元格点击时触发 | `(row, column, cell, event) => void` |
| cell-dblclick | 单元格双击时触发 | `(row, column, cell, event) => void` |
| header-click | 表头点击时触发 | `(column, event) => void` |
| header-contextmenu | 表头右键时触发 | `(column, event) => void` |
| sort-change | 排序状态改变时触发 | `(params: { column, prop, order }) => void` |
| filter-change | 筛选条件改变时触发 | `(filters: Record<string, unknown[]>) => void` |
| page-change | 分页改变时触发 | `(params: { currentPage, pageSize }) => void` |
| selection-change | 选择状态改变时触发 | `(rows, keys) => void` |
| select | 选中某一行时触发 | `(selection, row) => void` |
| select-all | 全选/取消全选时触发 | `(selection) => void` |
| current-change | 当前行改变时触发 | `(currentRow, oldRow) => void` |
| expand-change | 展开状态改变时触发 | `(row, expandedRows) => void` |
| scroll | 表格滚动时触发 | `(params: { scrollTop, scrollLeft, isEnd }) => void` |
| drag-end | 拖拽结束时触发 | `(params: { type, oldIndex, newIndex, data }) => void` |
| column-resize | 列宽调整时触发 | `(column, width) => void` |
| column-visible-change | 列可见性改变时触发 | `(columns: TableColumn[]) => void` |
| update:data | 数据更新时触发 | `(data: unknown[]) => void` |
| update:currentRowKey | 当前行 key 更新时触发 | `(key: string \| number) => void` |

## Table 方法

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| getSelectionRows | 获取选中的行数据 | — | `unknown[]` |
| getSelectionRowKeys | 获取选中的行 key | — | `(string \| number)[]` |
| toggleRowSelection | 切换行选中状态 | `(row, selected?)` | — |
| toggleAllSelection | 切换全选状态 | — | — |
| clearSelection | 清空选择 | — | — |
| setCurrentRow | 设置当前行 | `(row: unknown \| null)` | — |
| toggleRowExpansion | 切换行展开状态 | `(row, expanded?)` | — |
| setExpandedRowKeys | 设置展开的行 | `(keys: (string \| number)[])` | — |
| getExpandedRowKeys | 获取展开的行 key | — | `(string \| number)[]` |
| sort | 手动排序 | `(prop: string, order: 'asc' \| 'desc' \| null)` | — |
| clearSort | 清空排序 | — | — |
| filter | 手动筛选 | `(prop: string, values: unknown[])` | — |
| clearFilter | 清空筛选 | `(prop?: string \| string[])` | — |
| doLayout | 重新计算布局 | — | — |
| refresh | 刷新表格 | — | — |
| scrollTo | 滚动到指定位置 | `(options: { left?, top?, row?, rowIndex?, column?, columnIndex? })` | — |
| getTableData | 获取表格数据 | — | `{ fullData, tableData }` |
| exportData | 导出数据 | `(config?: ExportConfig)` | `Promise<string \| void>` |
| openImport | 打开文件选择器导入 | `(config?: ImportConfig)` | `Promise<unknown[]>` |
| importFile | 从 File 对象导入 | `(file: File, config?: ImportConfig)` | `Promise<unknown[]>` |
| importData | 从文本/数组导入 | `(content: string \| unknown[], config?: ImportConfig)` | `Promise<unknown[]>` |
| print | 打印表格 | `(config?: PrintConfig)` | `Promise<void>` |
| printMultiple | 打印多张表格 | `(tables: Array<{ title?, data, columns?, config? }>, config?)` | `Promise<void>` |
| printTemplate | 打印自定义模板 | `(templateHtml: string, config?: PrintConfig)` | `Promise<void>` |
| toggleFullscreen | 切换全屏 | — | — |
| getColumns | 获取列配置 | — | `TableColumn[]` |
| setColumnVisible | 设置列可见性 | `(prop: string, visible: boolean)` | — |
| resetColumns | 重置列配置 | — | — |
| insertRow | 插入行 | `(row, index?)` | — |
| removeRow | 删除行 | `(row \| rows)` | — |
| updateRow | 更新行 | `(row, newRow)` | — |

## Table 插槽

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| toolbar | 工具栏内容 | — |
| toolbar-left | 工具栏左侧内容 | — |
| toolbar-right | 工具栏右侧内容 | — |
| empty | 空数据时显示的内容 | — |
| loading | 加载状态时显示的内容 | — |
| expand | 展开行内容 | `{ row, rowIndex }` |
| summary | 汇总行内容 | — |
| [prop] | 自定义列内容 | `{ row, column, rowIndex, cellValue }` |
| header-[prop] | 自定义表头内容 | `{ column, columnIndex }` |
| summary-[prop] | 自定义汇总列内容 | `{ column, columnIndex, data }` |

## TableColumn 配置

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| key | 列唯一标识 | `string` | — |
| prop | 列字段名 | `string` | — |
| label | 列标题 | `string` | — |
| width | 列宽 | `number \| string` | — |
| minWidth | 最小列宽 | `number \| string` | `80` |
| maxWidth | 最大列宽 | `number \| string` | — |
| align | 内容对齐方式 | `'left' \| 'center' \| 'right'` | `'left'` |
| headerAlign | 表头对齐方式 | `'left' \| 'center' \| 'right'` | `'left'` |
| fixed | 列固定位置 | `'left' \| 'right' \| true` | — |
| sortable | 是否可排序 | `boolean \| 'custom'` | `false` |
| filterable | 是否可筛选 | `boolean` | `false` |
| filters | 筛选选项 | `Array<{ text, value }>` | — |
| filterMultiple | 是否多选筛选 | `boolean` | `true` |
| filterMethod | 筛选方法 | `(value, row, column) => boolean` | — |
| resizable | 是否可调整宽度 | `boolean` | `true` |
| draggable | 是否可拖拽排序 | `boolean` | — |
| showOverflowTooltip | 是否显示溢出提示 | `boolean \| { effect?, placement?, offset? }` | `false` |
| ellipsis | 省略号配置 | `boolean \| { tooltip?: boolean, lineClamp?: number }` | — |
| className | 列类名 | `string` | — |
| headerClassName | 表头类名 | `string` | — |
| style | 列样式 | `CSSProperties` | — |
| headerStyle | 表头样式 | `CSSProperties` | — |
| visible | 是否可见 | `boolean` | `true` |
| type | 列类型 | `'selection' \| 'index' \| 'expand' \| 'radio'` | — |
| formatter | 格式化函数 | `(row, column, cellValue, rowIndex) => string` | — |
| displayMap | 值到显示文案的映射 | `Record<string, string>` | — |
| render | 自定义渲染函数 | `(params) => VNode` | — |
| headerRender | 自定义表头渲染函数 | `(params) => VNode` | — |
| headerPrefixIcon | 表头前缀图标 | `string \| Component` | — |
| headerSuffixIcon | 表头后缀图标 | `string \| Component` | — |
| children | 子列（多级表头） | `TableColumn[]` | — |
| treeNode | 是否为树形展开列 | `boolean` | `false` |
| colSpan | 列合并数量 | `number` | — |
| sortMethod | 自定义排序方法 | `(a, b, order) => number` | — |
| sortBy | 自定义排序字段 | `string \| ((row) => unknown)` | — |
| defaultSort | 默认排序 | `'asc' \| 'desc' \| null` | — |

## SelectionConfig 配置

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 选择类型 | `'checkbox' \| 'radio'` | `'checkbox'` |
| selectedRowKeys | 已选中的行 key | `(string \| number)[]` | — |
| reserve | 是否保留跨页选中项 | `boolean` | `true` |
| checkable | 判断行是否可选函数 | `(row, rowIndex) => boolean` | — |
| selectAllMode | 全选模式 | `'all' \| 'currentPage'` | `'currentPage'` |
| columnWidth | 选择列宽度 | `number \| string` | `50` |
| showSelectAll | 是否显示全选 | `boolean` | `true` |
| onChange | 选择变化回调 | `(keys, rows) => void` | — |

## VirtualConfig 配置

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| enabled | 是否启用虚拟滚动 | `boolean` | `false` |
| rowHeight | 行高 | `number \| ((row, index) => number)` | `48` |
| buffer | 缓冲区行数 | `number` | `5` |
| overscan | 预渲染行数 | `number` | `3` |
| columnVirtual | 是否启用列虚拟滚动 | `boolean` | `false` |
| columnBuffer | 列缓冲区数量 | `number` | `3` |

## TreeConfig 配置

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| childrenKey | 子节点字段名 | `string` | `'children'` |
| indent | 缩进像素 | `number` | `16` |
| accordion | 是否手风琴模式 | `boolean` | `false` |
| expandAll | 是否默认全部展开 | `boolean` | `false` |
| defaultExpandLevel | 默认展开层级 | `number` | — |
| defaultExpandedKeys | 默认展开的节点 | `(string \| number)[]` | — |
| lazy | 是否懒加载 | `boolean` | `false` |
| loadMethod | 懒加载方法 | `(row) => Promise<unknown[]>` | — |
| trigger | 展开触发方式 | `'default' \| 'row' \| 'cell'` | `'default'` |
| expandIcon | 展开图标 | `string \| Component` | — |
| collapseIcon | 折叠图标 | `string \| Component` | — |
| leafIcon | 叶子节点图标 | `string \| Component` | — |
| showLine | 是否显示连接线 | `boolean` | `false` |
| lineStyle | 连接线样式 | `'solid' \| 'dashed' \| 'dotted'` | `'solid'` |

## ExpandConfig 配置

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultExpandedRowKeys | 默认展开行的 key | `(string \| number)[]` | — |
| expandAll | 是否展开所有行 | `boolean` | `false` |
| accordion | 是否手风琴模式 | `boolean` | `false` |
| iconPosition | 展开图标位置 | `'left' \| 'right'` | `'left'` |
| columnWidth | 展开列宽度 | `number \| string` | `50` |
| expandable | 行是否可展开判断函数 | `(row, rowIndex) => boolean` | — |
| render | 自定义渲染函数 | `(params: { row, rowIndex }) => VNode` | — |
| lazy | 是否懒加载 | `boolean` | `false` |
| loadMethod | 懒加载方法 | `(row) => Promise<VNode>` | — |
| showIcon | 是否显示展开图标 | `boolean` | `true` |
| onChange | 展开行变化回调 | `(expandedRowKeys) => void` | — |

## SortConfig 配置

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultSort | 默认排序列 | `{ prop: string, order: 'asc' \| 'desc' \| null }` | — |
| multiple | 是否多列排序 | `boolean` | `false` |
| trigger | 排序触发方式 | `'cell' \| 'header'` | `'header'` |
| remote | 是否远程排序 | `boolean` | `false` |
| iconPosition | 排序图标位置 | `'left' \| 'right'` | `'right'` |
| sortMethods | 自定义排序方法合集 | `Record<string, (a, b, order) => number>` | — |

## SummaryConfig 配置

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| position | 汇总行位置 | `'top' \| 'bottom'` | `'bottom'` |
| fixed | 是否固定汇总行 | `boolean` | `false` |
| text | 汇总文本 | `string` | `'合计'` |
| className | 汇总行类名 | `string` | — |
| style | 汇总行样式 | `CSSProperties` | — |
| method | 汇总计算方法 | `(params: { columns, data }) => Array<string \| number \| VNode>` | — |

## DragConfig 配置

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| row | 是否可拖拽行 | `boolean` | `false` |
| column | 是否可拖拽列 | `boolean` | `false` |
| handle | 拖拽手柄选择器 | `string` | — |
| animation | 动画时长（毫秒） | `number` | `150` |
| onDragStart | 拖拽开始回调 | `(params) => void` | — |
| onDragEnd | 拖拽结束回调 | `(params) => void` | — |
| crossTable | 是否跨表格拖拽 | `boolean` | `false` |
| dragClass | 拖拽时的样式类 | `string` | — |
| ghostClass | 幽灵元素样式类 | `string` | — |

## FilterConfig 配置

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| remote | 是否远程筛选 | `boolean` | `false` |
| icon | 筛选图标 | `string \| Component` | — |
| maxHeight | 筛选面板最大高度 | `number \| string` | — |
| width | 筛选面板宽度 | `number \| string` | — |

## PaginationConfig 配置

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| currentPage | 当前页码 | `number` | `1` |
| pageSize | 每页条数 | `number` | `10` |
| total | 总条数 | `number` | — |
| pageSizes | 每页条数选项 | `number[]` | `[10, 20, 50, 100]` |
| layout | 分页布局 | `string` | `'total, sizes, prev, pager, next, jumper'` |
| position | 分页位置 | `'top' \| 'bottom' \| 'both'` | `'bottom'` |
| remote | 是否后台分页 | `boolean` | `false` |
| align | **对齐方式** | `'left' \| 'center' \| 'right'` | `'left'` |
| small | 是否小型分页 | `boolean` | `false` |
| background | 是否显示背景 | `boolean` | `false` |
| hideOnSinglePage | 单页时隐藏分页 | `boolean` | `false` |

## LoadingConfig 配置

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| visible | 是否加载中 | `boolean` | `false` |
| text | 加载文本 | `string` | — |
| icon | 加载图标 | `string \| Component` | — |
| background | 加载背景色 | `string` | — |
| render | 自定义渲染 | `() => VNode` | — |

## EmptyConfig 配置

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| image | 空状态图片 | `string` | — |
| description | 空状态描述 | `string` | `'暂无数据'` |
| render | 自定义渲染 | `() => VNode` | — |

## IndexConfig 配置

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 序号列标题 | `string` | `'序号'` |
| width | 序号列宽度 | `number \| string` | `60` |
| fixed | 序号列固定位置 | `'left' \| 'right' \| true` | — |
| method | 自定义序号方法 | `(rowIndex) => number \| string` | — |

## ToolbarConfig 配置

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| visible | 是否显示工具栏 | `boolean` | `true` |
| refresh | 是否显示刷新按钮 | `boolean` | `false` |
| columnSetting | 是否显示列设置 | `boolean` | `false` |
| density | 是否显示密度设置 | `boolean` | `false` |
| fullscreen | 是否显示全屏按钮 | `boolean` | `false` |
| export | 是否显示导出按钮 | `boolean \| ExportConfig` | `false` |
| print | 是否显示打印按钮 | `boolean` | `false` |
| search | 是否显示搜索框 | `boolean \| { placeholder?, width? }` | `false` |
| custom | 自定义按钮 | `Array<{ icon?, text?, onClick?, disabled? }>` | — |

## RowConfig 配置

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| height | 行高 | `number \| string` | — |
| className | 行类名 | `string \| ((params) => string)` | — |
| style | 行样式 | `CSSProperties \| ((params) => CSSProperties)` | — |
| highlightCurrent | 是否高亮当前行 | `boolean` | `false` |
| stripe | 是否显示斑马纹 | `boolean` | `false` |
| hover | 是否悬浮高亮 | `boolean` | `true` |

## HeaderConfig 配置

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| height | 表头高度 | `number \| string` | — |
| className | 表头类名 | `string` | — |
| style | 表头样式 | `CSSProperties` | — |
| visible | 是否显示表头 | `boolean` | `true` |
| background | 表头背景色 | `string` | — |

## ContextMenuConfig 配置

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| enabled | 是否启用右键菜单 | `boolean` | `false` |
| items | 菜单项配置 | `Array<{ key, label, icon?, disabled?, onClick?, divider?, children? }>` | — |
| render | 自定义渲染 | `(params: { row, column, rowIndex }) => VNode` | — |

## 主题变量

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| --yh-table-border-color | 边框颜色 | `var(--yh-border-color-lighter)` |
| --yh-table-header-bg | 表头背景色 | `var(--yh-fill-color-light)` |
| --yh-table-header-text-color | 表头文字颜色 | `var(--yh-text-color-primary)` |
| --yh-table-header-font-weight | 表头字重 | `var(--yh-font-weight-semibold)` |
| --yh-table-row-bg | 行背景色 | `var(--yh-bg-color)` |
| --yh-table-row-hover-bg | 行悬停背景色 | `var(--yh-fill-color-light)` |
| --yh-table-row-stripe-bg | 斑马纹背景色 | `var(--yh-fill-color-lighter)` |
| --yh-table-row-current-bg | 当前行背景色 | `var(--yh-color-primary-light-9)` |
| --yh-table-row-selected-bg | 选中行背景色 | `var(--yh-color-primary-light-8)` |
| --yh-table-row-success-bg | 成功行背景色 | `var(--yh-color-success-light-9)` |
| --yh-table-row-warning-bg | 警告行背景色 | `var(--yh-color-warning-light-9)` |
| --yh-table-text-color | 文字颜色 | `var(--yh-text-color-regular)` |
| --yh-table-empty-text-color | 空状态文字颜色 | `var(--yh-text-color-secondary)` |
| --yh-table-font-size | 字体大小 | `var(--yh-font-size-base)` |
| --yh-table-cell-padding | 单元格内边距 | `12px 0` |
| --yh-table-cell-spacing | 单元格内容间距 | `12px` |
| --yh-table-fixed-left-shadow | 左固定列阴影 | `inset 10px 0 8px -8px rgba(0,0,0,0.15)` |
| --yh-table-fixed-right-shadow | 右固定列阴影 | `inset -10px 0 8px -8px rgba(0,0,0,0.15)` |
