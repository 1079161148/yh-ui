# Table - API

## Table Props

| Property               | Description                                | Type                                                     | Default     |
| ---------------------- | ------------------------------------------ | -------------------------------------------------------- | ----------- |
| data                   | Table data                                 | `Array<Record<string, unknown>>`                         | `[]`        |
| columns                | Column configuration                       | `TableColumn[]`                                          | `[]`        |
| row-key                | Unique row identifier                      | `string \| ((row) => string \| number)`                  | `'id'`      |
| size                   | Table size                                 | `'large' \| 'default' \| 'small'`                        | `'default'` |
| width                  | Table width                                | `number \| string`                                       | —           |
| height                 | Table height                               | `number \| string`                                       | —           |
| max-height             | Table max height                           | `number \| string`                                       | —           |
| border                 | Whether to show border                     | `boolean \| 'full' \| 'outer' \| 'inner' \| 'none'`      | `false`     |
| stripe                 | Whether to show stripe                     | `boolean`                                                | `false`     |
| fit                    | Whether to auto-fit parent container width | `boolean`                                                | `true`      |
| show-header            | Whether to show header                     | `boolean`                                                | `true`      |
| show-index             | Whether to show index column               | `boolean`                                                | `false`     |
| highlight-current-row  | Whether to highlight current row           | `boolean`                                                | `false`     |
| current-row-key        | Current selected row key (v-model)         | `string \| number`                                       | —           |
| table-layout           | Table layout                               | `'fixed' \| 'auto'`                                      | `'fixed'`   |
| empty-text             | Text displayed when data is empty          | `string`                                                 | `'No Data'` |
| loading                | Whether to show loading state              | `boolean \| LoadingConfig`                               | `false`     |
| resizable              | Whether columns are resizable              | `boolean`                                                | `false`     |
| lazy                   | Whether to lazy load child nodes           | `boolean`                                                | `false`     |
| load-method            | Lazy load method                           | `(row) => Promise<unknown[]>`                            | —           |
| auto-height            | Auto-fit content height                    | `boolean`                                                | `false`     |
| keep-scroll            | Keep scroll position after data update     | `boolean`                                                | `false`     |
| scroll-optimize        | Enable scroll optimization                 | `boolean`                                                | `true`      |
| tooltip-effect         | Overflow tooltip theme                     | `'dark' \| 'light'`                                      | `'dark'`    |
| row-class-name         | Row className                              | `string \| ((params) => string)`                         | —           |
| row-style              | Row style                                  | `CSSProperties \| ((params) => CSSProperties)`           | —           |
| cell-class-name        | Cell className                             | `string \| ((params) => string)`                         | —           |
| cell-style             | Cell style                                 | `CSSProperties \| ((params) => CSSProperties)`           | —           |
| header-row-class-name  | Header row className                       | `string \| ((params) => string)`                         | —           |
| header-row-style       | Header row style                           | `CSSProperties \| ((params) => CSSProperties)`           | —           |
| header-cell-class-name | Header cell className                      | `string \| ((params) => string)`                         | —           |
| header-cell-style      | Header cell style                          | `CSSProperties \| ((params) => CSSProperties)`           | —           |
| span-method            | Cell merge method                          | `(params) => { rowspan, colspan } \| [rowspan, colspan]` | —           |
| selection-config       | Selection configuration                    | `SelectionConfig`                                        | —           |
| sort-config            | Sort configuration                         | `SortConfig`                                             | —           |
| filter-config          | Filter configuration                       | `FilterConfig`                                           | —           |
| tree-config            | Tree configuration                         | `TreeConfig`                                             | —           |
| expand-config          | Expand configuration                       | `ExpandConfig`                                           | —           |
| virtual-config         | Virtual scroll configuration               | `VirtualConfig`                                          | —           |
| pagination             | Pagination configuration                   | `boolean \| PaginationConfig`                            | `false`     |
| summary-config         | Summary row configuration                  | `SummaryConfig`                                          | —           |
| toolbar-config         | Toolbar configuration                      | `ToolbarConfig`                                          | —           |
| drag-config            | Drag configuration                         | `DragConfig`                                             | —           |
| row-config             | Row configuration                          | `RowConfig`                                              | —           |
| header-config          | Header configuration                       | `HeaderConfig`                                           | —           |
| context-menu-config    | Context menu configuration                 | `ContextMenuConfig`                                      | —           |
| empty-config           | Empty state configuration                  | `EmptyConfig`                                            | —           |
| index-config           | Index column configuration                 | `IndexConfig`                                            | —           |
| sync-scroll            | Whether to sync scroll header and footer   | `boolean`                                                | `true`      |

## Table Events

| Event                 | Description                               | Type                                                   |
| --------------------- | ----------------------------------------- | ------------------------------------------------------ |
| row-click             | Triggered when a row is clicked           | `(row, column, event) => void`                         |
| row-dblclick          | Triggered when a row is double-clicked    | `(row, column, event) => void`                         |
| row-contextmenu       | Triggered when a row is right-clicked     | `(row, column, event) => void`                         |
| cell-click            | Triggered when a cell is clicked          | `(row, column, cell, event) => void`                   |
| cell-dblclick         | Triggered when a cell is double-clicked   | `(row, column, cell, event) => void`                   |
| header-click          | Triggered when a header is clicked        | `(column, event) => void`                              |
| header-contextmenu    | Triggered when a header is right-clicked  | `(column, event) => void`                              |
| sort-change           | Triggered when sort state changes         | `(params: { column, prop, order }) => void`            |
| filter-change         | Triggered when filter conditions change   | `(filters: Record<string, unknown[]>) => void`         |
| page-change           | Triggered when pagination changes         | `(params: { currentPage, pageSize }) => void`          |
| selection-change      | Triggered when selection state changes    | `(rows, keys) => void`                                 |
| select                | Triggered when a row is selected          | `(selection, row) => void`                             |
| select-all            | Triggered when select all / deselect all  | `(selection) => void`                                  |
| current-change        | Triggered when current row changes        | `(currentRow, oldRow) => void`                         |
| expand-change         | Triggered when expand state changes       | `(row, expandedRows) => void`                          |
| scroll                | Triggered when table scrolls              | `(params: { scrollTop, scrollLeft, isEnd }) => void`   |
| drag-end              | Triggered when drag ends                  | `(params: { type, oldIndex, newIndex, data }) => void` |
| column-resize         | Triggered when column width is resized    | `(column, width) => void`                              |
| column-visible-change | Triggered when column visibility changes  | `(columns: TableColumn[]) => void`                     |
| update:data           | Triggered when data is updated            | `(data: unknown[]) => void`                            |
| update:currentRowKey  | Triggered when current row key is updated | `(key: string \| number) => void`                      |

## Table Methods

| Method              | Description                  | Parameters                                                           | Return                    |
| ------------------- | ---------------------------- | -------------------------------------------------------------------- | ------------------------- |
| getSelectionRows    | Get selected row data        | —                                                                    | `unknown[]`               |
| getSelectionRowKeys | Get selected row keys        | —                                                                    | `(string \| number)[]`    |
| toggleRowSelection  | Toggle row selection state   | `(row, selected?)`                                                   | —                         |
| toggleAllSelection  | Toggle select all state      | —                                                                    | —                         |
| clearSelection      | Clear selection              | —                                                                    | —                         |
| setCurrentRow       | Set current row              | `(row: unknown \| null)`                                             | —                         |
| toggleRowExpansion  | Toggle row expansion state   | `(row, expanded?)`                                                   | —                         |
| setExpandedRowKeys  | Set expanded rows            | `(keys: (string \| number)[])`                                       | —                         |
| getExpandedRowKeys  | Get expanded row keys        | —                                                                    | `(string \| number)[]`    |
| sort                | Manual sort                  | `(prop: string, order: 'asc' \| 'desc' \| null)`                     | —                         |
| clearSort           | Clear sort                   | —                                                                    | —                         |
| filter              | Manual filter                | `(prop: string, values: unknown[])`                                  | —                         |
| clearFilter         | Clear filter                 | `(prop?: string \| string[])`                                        | —                         |
| doLayout            | Recalculate layout           | —                                                                    | —                         |
| refresh             | Refresh table                | —                                                                    | —                         |
| scrollTo            | Scroll to specified position | `(options: { left?, top?, row?, rowIndex?, column?, columnIndex? })` | —                         |
| getTableData        | Get table data               | —                                                                    | `{ fullData, tableData }` |
| exportData          | Export data                  | `(config?: ExportConfig)`                                            | `Promise<string \| void>` |
| openImport          | Open file picker for import  | `(config?: ImportConfig)`                                            | `Promise<unknown[]>`      |
| importFile          | Import from File object      | `(file: File, config?: ImportConfig)`                                | `Promise<unknown[]>`      |
| importData          | Import from text/array       | `(content: string \| unknown[], config?: ImportConfig)`              | `Promise<unknown[]>`      |
| print               | Print table                  | `(config?: PrintConfig)`                                             | `Promise<void>`           |
| printMultiple       | Print multiple tables        | `(tables: Array<{ title?, data, columns?, config? }>, config?)`      | `Promise<void>`           |
| printTemplate       | Print custom template        | `(templateHtml: string, config?: PrintConfig)`                       | `Promise<void>`           |
| toggleFullscreen    | Toggle fullscreen            | —                                                                    | —                         |
| getColumns          | Get column configuration     | —                                                                    | `TableColumn[]`           |
| setColumnVisible    | Set column visibility        | `(prop: string, visible: boolean)`                                   | —                         |
| resetColumns        | Reset column configuration   | —                                                                    | —                         |
| insertRow           | Insert row                   | `(row, index?)`                                                      | —                         |
| removeRow           | Remove row                   | `(row \| rows)`                                                      | —                         |
| updateRow           | Update row                   | `(row, newRow)`                                                      | —                         |

## Table Slots

| Slot           | Description                          | Parameters                             |
| -------------- | ------------------------------------ | -------------------------------------- |
| toolbar        | Toolbar content                      | —                                      |
| toolbar-left   | Toolbar left content                 | —                                      |
| toolbar-right  | Toolbar right content                | —                                      |
| empty          | Content displayed when data is empty | —                                      |
| loading        | Content displayed when loading       | —                                      |
| expand         | Expand row content                   | `{ row, rowIndex }`                    |
| summary        | Summary row content                  | —                                      |
| [prop]         | Custom column content                | `{ row, column, rowIndex, cellValue }` |
| header-[prop]  | Custom header content                | `{ column, columnIndex }`              |
| summary-[prop] | Custom summary column content        | `{ column, columnIndex, data }`        |

## TableColumn Configuration

| Property            | Description                      | Type                                                   | Default  |
| ------------------- | -------------------------------- | ------------------------------------------------------ | -------- |
| key                 | Column unique identifier         | `string`                                               | —        |
| prop                | Column field name                | `string`                                               | —        |
| label               | Column title                     | `string`                                               | —        |
| width               | Column width                     | `number \| string`                                     | —        |
| minWidth            | Minimum column width             | `number \| string`                                     | `80`     |
| maxWidth            | Maximum column width             | `number \| string`                                     | —        |
| align               | Content alignment                | `'left' \| 'center' \| 'right'`                        | `'left'` |
| headerAlign         | Header alignment                 | `'left' \| 'center' \| 'right'`                        | `'left'` |
| fixed               | Column fixed position            | `'left' \| 'right' \| true`                            | —        |
| sortable            | Whether sortable                 | `boolean \| 'custom'`                                  | `false`  |
| filterable          | Whether filterable               | `boolean`                                              | `false`  |
| filters             | Filter options                   | `Array<{ text, value }>`                               | —        |
| filterMultiple      | Whether multi-select filter      | `boolean`                                              | `true`   |
| filterMethod        | Filter method                    | `(value, row, column) => boolean`                      | —        |
| resizable           | Whether resizable                | `boolean`                                              | `true`   |
| draggable           | Whether draggable                | `boolean`                                              | —        |
| showOverflowTooltip | Whether to show overflow tooltip | `boolean \| { effect?, placement?, offset? }`          | `false`  |
| ellipsis            | Ellipsis configuration           | `boolean \| { tooltip?: boolean, lineClamp?: number }` | —        |
| className           | Column class name                | `string`                                               | —        |
| headerClassName     | Header class name                | `string`                                               | —        |
| style               | Column style                     | `CSSProperties`                                        | —        |
| headerStyle         | Header style                     | `CSSProperties`                                        | —        |
| visible             | Whether visible                  | `boolean`                                              | `true`   |
| type                | Column type                      | `'selection' \| 'index' \| 'expand' \| 'radio'`        | —        |
| formatter           | Formatter function               | `(row, column, cellValue, rowIndex) => string`         | —        |
| displayMap          | Value to display text mapping    | `Record<string, string>`                               | —        |
| render              | Custom render function           | `(params) => VNode`                                    | —        |
| headerRender        | Custom header render function    | `(params) => VNode`                                    | —        |
| headerPrefixIcon    | Header prefix icon               | `string \| Component`                                  | —        |
| headerSuffixIcon    | Header suffix icon               | `string \| Component`                                  | —        |
| children            | Sub-columns (multi-level header) | `TableColumn[]`                                        | —        |
| treeNode            | Whether tree expand column       | `boolean`                                              | `false`  |
| colSpan             | Column span count                | `number`                                               | —        |
| sortMethod          | Custom sort method               | `(a, b, order) => number`                              | —        |
| sortBy              | Custom sort field                | `string \| ((row) => unknown)`                         | —        |
| defaultSort         | Default sort                     | `'asc' \| 'desc' \| null`                              | —        |

## SelectionConfig

| Property        | Description                                | Type                         | Default         |
| --------------- | ------------------------------------------ | ---------------------------- | --------------- |
| type            | Selection type                             | `'checkbox' \| 'radio'`      | `'checkbox'`    |
| selectedRowKeys | Selected row keys                          | `(string \| number)[]`       | —               |
| reserve         | Whether to preserve cross-page selections  | `boolean`                    | `true`          |
| checkable       | Function to determine if row is selectable | `(row, rowIndex) => boolean` | —               |
| selectAllMode   | Select all mode                            | `'all' \| 'currentPage'`     | `'currentPage'` |
| columnWidth     | Selection column width                     | `number \| string`           | `50`            |
| showSelectAll   | Whether to show select all                 | `boolean`                    | `true`          |
| onChange        | Selection change callback                  | `(keys, rows) => void`       | —               |

## VirtualConfig

| Property      | Description                             | Type                                 | Default |
| ------------- | --------------------------------------- | ------------------------------------ | ------- |
| enabled       | Whether to enable virtual scroll        | `boolean`                            | `false` |
| rowHeight     | Row height                              | `number \| ((row, index) => number)` | `48`    |
| buffer        | Buffer row count                        | `number`                             | `5`     |
| overscan      | Pre-render row count                    | `number`                             | `3`     |
| columnVirtual | Whether to enable column virtual scroll | `boolean`                            | `false` |
| columnBuffer  | Column buffer count                     | `number`                             | `3`     |

## TreeConfig

| Property            | Description                      | Type                              | Default      |
| ------------------- | -------------------------------- | --------------------------------- | ------------ |
| childrenKey         | Children field name              | `string`                          | `'children'` |
| indent              | Indent pixels                    | `number`                          | `16`         |
| accordion           | Whether accordion mode           | `boolean`                         | `false`      |
| expandAll           | Whether to expand all by default | `boolean`                         | `false`      |
| defaultExpandLevel  | Default expand level             | `number`                          | —            |
| defaultExpandedKeys | Default expanded nodes           | `(string \| number)[]`            | —            |
| lazy                | Whether lazy load                | `boolean`                         | `false`      |
| loadMethod          | Lazy load method                 | `(row) => Promise<unknown[]>`     | —            |
| trigger             | Expand trigger method            | `'default' \| 'row' \| 'cell'`    | `'default'`  |
| expandIcon          | Expand icon                      | `string \| Component`             | —            |
| collapseIcon        | Collapse icon                    | `string \| Component`             | —            |
| leafIcon            | Leaf node icon                   | `string \| Component`             | —            |
| showLine            | Whether to show connecting lines | `boolean`                         | `false`      |
| lineStyle           | Connecting line style            | `'solid' \| 'dashed' \| 'dotted'` | `'solid'`    |

## ExpandConfig

| Property               | Description                                | Type                                   | Default  |
| ---------------------- | ------------------------------------------ | -------------------------------------- | -------- |
| defaultExpandedRowKeys | Default expanded row keys                  | `(string \| number)[]`                 | —        |
| expandAll              | Whether to expand all rows                 | `boolean`                              | `false`  |
| accordion              | Whether accordion mode                     | `boolean`                              | `false`  |
| iconPosition           | Expand icon position                       | `'left' \| 'right'`                    | `'left'` |
| columnWidth            | Expand column width                        | `number \| string`                     | `50`     |
| expandable             | Function to determine if row is expandable | `(row, rowIndex) => boolean`           | —        |
| render                 | Custom render function                     | `(params: { row, rowIndex }) => VNode` | —        |
| lazy                   | Whether lazy load                          | `boolean`                              | `false`  |
| loadMethod             | Lazy load method                           | `(row) => Promise<VNode>`              | —        |
| showIcon               | Whether to show expand icon                | `boolean`                              | `true`   |
| onChange               | Expanded rows change callback              | `(expandedRowKeys) => void`            | —        |

## SortConfig

| Property     | Description                    | Type                                               | Default    |
| ------------ | ------------------------------ | -------------------------------------------------- | ---------- |
| defaultSort  | Default sort column            | `{ prop: string, order: 'asc' \| 'desc' \| null }` | —          |
| multiple     | Whether multi-column sort      | `boolean`                                          | `false`    |
| trigger      | Sort trigger method            | `'cell' \| 'header'`                               | `'header'` |
| remote       | Whether remote sort            | `boolean`                                          | `false`    |
| iconPosition | Sort icon position             | `'left' \| 'right'`                                | `'right'`  |
| sortMethods  | Custom sort methods collection | `Record<string, (a, b, order) => number>`          | —          |

## SummaryConfig

| Property  | Description                | Type                                                              | Default    |
| --------- | -------------------------- | ----------------------------------------------------------------- | ---------- |
| position  | Summary row position       | `'top' \| 'bottom'`                                               | `'bottom'` |
| fixed     | Whether to fix summary row | `boolean`                                                         | `false`    |
| text      | Summary text               | `string`                                                          | `'Total'`  |
| className | Summary row class name     | `string`                                                          | —          |
| style     | Summary row style          | `CSSProperties`                                                   | —          |
| method    | Summary calculation method | `(params: { columns, data }) => Array<string \| number \| VNode>` | —          |

## DragConfig

| Property    | Description                   | Type               | Default |
| ----------- | ----------------------------- | ------------------ | ------- |
| row         | Whether rows are draggable    | `boolean`          | `false` |
| column      | Whether columns are draggable | `boolean`          | `false` |
| handle      | Drag handle selector          | `string`           | —       |
| animation   | Animation duration (ms)       | `number`           | `150`   |
| onDragStart | Drag start callback           | `(params) => void` | —       |
| onDragEnd   | Drag end callback             | `(params) => void` | —       |
| crossTable  | Whether cross-table drag      | `boolean`          | `false` |
| dragClass   | Drag style class              | `string`           | —       |
| ghostClass  | Ghost element style class     | `string`           | —       |

## FilterConfig

| Property  | Description             | Type                  | Default |
| --------- | ----------------------- | --------------------- | ------- |
| remote    | Whether remote filter   | `boolean`             | `false` |
| icon      | Filter icon             | `string \| Component` | —       |
| maxHeight | Filter panel max height | `number \| string`    | —       |
| width     | Filter panel width      | `number \| string`    | —       |

## PaginationConfig

| Property         | Description                    | Type                            | Default                                     |
| ---------------- | ------------------------------ | ------------------------------- | ------------------------------------------- |
| currentPage      | Current page number            | `number`                        | `1`                                         |
| pageSize         | Items per page                 | `number`                        | `10`                                        |
| total            | Total items                    | `number`                        | —                                           |
| pageSizes        | Items per page options         | `number[]`                      | `[10, 20, 50, 100]`                         |
| layout           | Pagination layout              | `string`                        | `'total, sizes, prev, pager, next, jumper'` |
| position         | Pagination position            | `'top' \| 'bottom' \| 'both'`   | `'bottom'`                                  |
| remote           | Whether server-side pagination | `boolean`                       | `false`                                     |
| align            | Alignment                      | `'left' \| 'center' \| 'right'` | `'left'`                                    |
| small            | Whether small pagination       | `boolean`                       | `false`                                     |
| background       | Whether to show background     | `boolean`                       | `false`                                     |
| hideOnSinglePage | Hide when single page          | `boolean`                       | `false`                                     |

## LoadingConfig

| Property   | Description              | Type                  | Default |
| ---------- | ------------------------ | --------------------- | ------- |
| visible    | Whether loading          | `boolean`             | `false` |
| text       | Loading text             | `string`              | —       |
| icon       | Loading icon             | `string \| Component` | —       |
| background | Loading background color | `string`              | —       |
| render     | Custom render            | `() => VNode`         | —       |

## EmptyConfig

| Property    | Description             | Type          | Default     |
| ----------- | ----------------------- | ------------- | ----------- |
| image       | Empty state image       | `string`      | —           |
| description | Empty state description | `string`      | `'No Data'` |
| render      | Custom render           | `() => VNode` | —           |

## IndexConfig

| Property | Description                 | Type                             | Default |
| -------- | --------------------------- | -------------------------------- | ------- |
| label    | Index column title          | `string`                         | `'#'`   |
| width    | Index column width          | `number \| string`               | `60`    |
| fixed    | Index column fixed position | `'left' \| 'right' \| true`      | —       |
| method   | Custom index method         | `(rowIndex) => number \| string` | —       |

## ToolbarConfig

| Property      | Description                       | Type                                           | Default |
| ------------- | --------------------------------- | ---------------------------------------------- | ------- |
| visible       | Whether to show toolbar           | `boolean`                                      | `true`  |
| refresh       | Whether to show refresh button    | `boolean`                                      | `false` |
| columnSetting | Whether to show column settings   | `boolean`                                      | `false` |
| density       | Whether to show density settings  | `boolean`                                      | `false` |
| fullscreen    | Whether to show fullscreen button | `boolean`                                      | `false` |
| export        | Whether to show export button     | `boolean \| ExportConfig`                      | `false` |
| print         | Whether to show print button      | `boolean`                                      | `false` |
| search        | Whether to show search box        | `boolean \| { placeholder?, width? }`          | `false` |
| custom        | Custom buttons                    | `Array<{ icon?, text?, onClick?, disabled? }>` | —       |

## RowConfig

| Property         | Description                      | Type                                           | Default |
| ---------------- | -------------------------------- | ---------------------------------------------- | ------- |
| height           | Row height                       | `number \| string`                             | —       |
| className        | Row class name                   | `string \| ((params) => string)`               | —       |
| style            | Row style                        | `CSSProperties \| ((params) => CSSProperties)` | —       |
| highlightCurrent | Whether to highlight current row | `boolean`                                      | `false` |
| stripe           | Whether to show stripe           | `boolean`                                      | `false` |
| hover            | Whether to highlight on hover    | `boolean`                                      | `true`  |

## HeaderConfig

| Property   | Description             | Type               | Default |
| ---------- | ----------------------- | ------------------ | ------- |
| height     | Header height           | `number \| string` | —       |
| className  | Header class name       | `string`           | —       |
| style      | Header style            | `CSSProperties`    | —       |
| visible    | Whether to show header  | `boolean`          | `true`  |
| background | Header background color | `string`           | —       |

## ContextMenuConfig

| Property | Description                    | Type                                                                     | Default |
| -------- | ------------------------------ | ------------------------------------------------------------------------ | ------- |
| enabled  | Whether to enable context menu | `boolean`                                                                | `false` |
| items    | Menu item configuration        | `Array<{ key, label, icon?, disabled?, onClick?, divider?, children? }>` | —       |
| render   | Custom render                  | `(params: { row, column, rowIndex }) => VNode`                           | —       |

## Theme Variables

| Variable                      | Description               | Default                                   |
| ----------------------------- | ------------------------- | ----------------------------------------- |
| --yh-table-border-color       | Border color              | `var(--yh-border-color-lighter)`          |
| --yh-table-header-bg          | Header background         | `var(--yh-fill-color-light)`              |
| --yh-table-header-text-color  | Header text color         | `var(--yh-text-color-primary)`            |
| --yh-table-header-font-weight | Header font weight        | `var(--yh-font-weight-semibold)`          |
| --yh-table-row-bg             | Row background            | `var(--yh-bg-color)`                      |
| --yh-table-row-hover-bg       | Row hover background      | `var(--yh-fill-color-light)`              |
| --yh-table-row-stripe-bg      | Stripe background         | `var(--yh-fill-color-lighter)`            |
| --yh-table-row-current-bg     | Current row background    | `var(--yh-color-primary-light-9)`         |
| --yh-table-row-selected-bg    | Selected row background   | `var(--yh-color-primary-light-8)`         |
| --yh-table-row-success-bg     | Success row background    | `var(--yh-color-success-light-9)`         |
| --yh-table-row-warning-bg     | Warning row background    | `var(--yh-color-warning-light-9)`         |
| --yh-table-text-color         | Text color                | `var(--yh-text-color-regular)`            |
| --yh-table-empty-text-color   | Empty state text color    | `var(--yh-text-color-secondary)`          |
| --yh-table-font-size          | Font size                 | `var(--yh-font-size-base)`                |
| --yh-table-cell-padding       | Cell padding              | `12px 0`                                  |
| --yh-table-cell-spacing       | Cell content spacing      | `12px`                                    |
| --yh-table-fixed-left-shadow  | Left fixed column shadow  | `inset 10px 0 8px -8px rgba(0,0,0,0.15)`  |
| --yh-table-fixed-right-shadow | Right fixed column shadow | `inset -10px 0 8px -8px rgba(0,0,0,0.15)` |
