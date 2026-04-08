/**
 * Table Component
 * @description 高性能表格组件导出
 */
import Table from './src/table.vue';
import TableColumn from './src/table-column.vue';
export declare const YhTable: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("vue").ExtractPropTypes<{
        readonly data: {
            readonly type: import("vue").PropType<Record<string, unknown>[]>;
            readonly default: () => never[];
        };
        readonly columns: {
            readonly type: import("vue").PropType<import("./index.js").TableColumn[]>;
            readonly default: () => never[];
        };
        readonly rowKey: {
            readonly type: import("vue").PropType<import("./index.js").RowKey>;
            readonly default: "id";
        };
        readonly size: {
            readonly type: import("vue").PropType<import("./index.js").TableSize>;
            readonly default: "default";
        };
        readonly height: {
            readonly type: import("vue").PropType<number | string>;
        };
        readonly maxHeight: {
            readonly type: import("vue").PropType<number | string>;
        };
        readonly width: {
            readonly type: import("vue").PropType<number | string>;
        };
        readonly border: {
            readonly type: import("vue").PropType<boolean | "full" | "outer" | "inner" | "none">;
            readonly default: false;
        };
        readonly stripe: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly highlightCurrentRow: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly currentRowKey: {
            readonly type: import("vue").PropType<string | number>;
        };
        readonly showHeader: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly emptyText: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly fit: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly sortConfig: {
            readonly type: import("vue").PropType<import("./index.js").TableSortConfig>;
        };
        readonly filterConfig: {
            readonly type: import("vue").PropType<import("./index.js").TableFilterConfig>;
        };
        readonly pagination: {
            readonly type: import("vue").PropType<boolean | import("./index.js").TablePaginationConfig>;
            readonly default: false;
        };
        readonly selectionConfig: {
            readonly type: import("vue").PropType<import("./index.js").TableSelectionConfig>;
        };
        readonly expandConfig: {
            readonly type: import("vue").PropType<import("./index.js").TableExpandConfig>;
        };
        readonly treeConfig: {
            readonly type: import("vue").PropType<import("./index.js").TableTreeConfig>;
        };
        readonly virtualConfig: {
            readonly type: import("vue").PropType<import("./index.js").TableVirtualConfig>;
        };
        readonly dragConfig: {
            readonly type: import("vue").PropType<import("./index.js").TableDragConfig>;
        };
        readonly summaryConfig: {
            readonly type: import("vue").PropType<import("./index.js").TableSummaryConfig>;
        };
        readonly toolbarConfig: {
            readonly type: import("vue").PropType<import("./index.js").TableToolbarConfig>;
        };
        readonly emptyConfig: {
            readonly type: import("vue").PropType<import("./index.js").TableEmptyConfig>;
        };
        readonly loading: {
            readonly type: import("vue").PropType<boolean | import("./index.js").TableLoadingConfig>;
            readonly default: false;
        };
        readonly rowConfig: {
            readonly type: import("vue").PropType<import("./index.js").TableRowConfig>;
        };
        readonly headerConfig: {
            readonly type: import("vue").PropType<import("./index.js").TableHeaderConfig>;
        };
        readonly contextMenuConfig: {
            readonly type: import("vue").PropType<import("./index.js").TableContextMenuConfig>;
        };
        readonly tableLayout: {
            readonly type: import("vue").PropType<"auto" | "fixed">;
            readonly default: "fixed";
        };
        readonly tooltipEffect: {
            readonly type: import("vue").PropType<"dark" | "light">;
            readonly default: "dark";
        };
        readonly spanMethod: {
            readonly type: import("vue").PropType<(params: {
                row: Record<string, unknown>;
                column: import("./index.js").TableColumn;
                rowIndex: number;
                columnIndex: number;
            }) => {
                rowspan: number;
                colspan: number;
            } | [number, number] | void>;
        };
        readonly rowClassName: {
            readonly type: import("vue").PropType<string | ((params: {
                row: Record<string, unknown>;
                rowIndex: number;
            }) => string)>;
        };
        readonly rowStyle: {
            readonly type: import("vue").PropType<import("vue").CSSProperties | ((params: {
                row: Record<string, unknown>;
                rowIndex: number;
            }) => import("vue").CSSProperties)>;
        };
        readonly cellClassName: {
            readonly type: import("vue").PropType<string | ((params: {
                row: Record<string, unknown>;
                column: import("./index.js").TableColumn;
                rowIndex: number;
                columnIndex: number;
            }) => string)>;
        };
        readonly cellStyle: {
            readonly type: import("vue").PropType<import("vue").CSSProperties | ((params: {
                row: Record<string, unknown>;
                column: import("./index.js").TableColumn;
                rowIndex: number;
                columnIndex: number;
            }) => import("vue").CSSProperties)>;
        };
        readonly headerRowClassName: {
            readonly type: import("vue").PropType<string | ((params: {
                rowIndex: number;
            }) => string)>;
        };
        readonly headerRowStyle: {
            readonly type: import("vue").PropType<import("vue").CSSProperties | ((params: {
                rowIndex: number;
            }) => import("vue").CSSProperties)>;
        };
        readonly headerCellClassName: {
            readonly type: import("vue").PropType<string | ((params: {
                column: import("./index.js").TableColumn;
                columnIndex: number;
            }) => string)>;
        };
        readonly headerCellStyle: {
            readonly type: import("vue").PropType<import("vue").CSSProperties | ((params: {
                column: import("./index.js").TableColumn;
                columnIndex: number;
            }) => import("vue").CSSProperties)>;
        };
        readonly lazy: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly loadMethod: {
            readonly type: import("vue").PropType<(row: Record<string, unknown>) => Promise<Record<string, unknown>[]>>;
        };
        readonly resizable: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly showIndex: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly indexConfig: {
            readonly type: import("vue").PropType<{
                label?: string;
                width?: number | string;
                fixed?: import("./index.js").FixedPosition;
                method?: (rowIndex: number) => number | string;
            }>;
        };
        readonly autoHeight: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly keepScroll: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly syncScroll: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly scrollOptimize: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly themeOverrides: {
            readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
            readonly default: undefined;
        };
    }>> & Readonly<{
        onSelect?: ((_selection: Record<string, unknown>[], _row: Record<string, unknown>) => any) | undefined;
        onScroll?: ((_params: {
            scrollTop: number;
            scrollLeft: number;
            isEnd: boolean;
        }) => any) | undefined;
        "onSelect-all"?: ((_selection: Record<string, unknown>[]) => any) | undefined;
        "onDrag-end"?: ((_params: {
            type: "row" | "column";
            oldIndex: number;
            newIndex: number;
            data: unknown[];
        }) => any) | undefined;
        "onExpand-change"?: ((_row: Record<string, unknown>, _expandedRows: Record<string, unknown>[]) => any) | undefined;
        "onCurrent-change"?: ((_currentRow: Record<string, unknown> | null, _oldRow: Record<string, unknown> | null) => any) | undefined;
        "onUpdate:data"?: ((_data: Record<string, unknown>[]) => any) | undefined;
        "onColumn-resize"?: ((_column: import("./index.js").TableColumn<Record<string, unknown>>, _width: number) => any) | undefined;
        "onSort-change"?: ((_params: {
            column: import("./index.js").TableColumn;
            prop: string;
            order: import("./index.js").SortOrder;
        }) => any) | undefined;
        "onFilter-change"?: ((_filters: Record<string, unknown[]>) => any) | undefined;
        "onPage-change"?: ((_params: {
            currentPage: number;
            pageSize: number;
        }) => any) | undefined;
        "onSelection-change"?: ((_selectedRows: Record<string, unknown>[], _selectedRowKeys: (string | number)[]) => any) | undefined;
        "onRow-click"?: ((_row: Record<string, unknown>, _column: import("./index.js").TableColumn<Record<string, unknown>>, _event: MouseEvent) => any) | undefined;
        "onRow-dblclick"?: ((_row: Record<string, unknown>, _column: import("./index.js").TableColumn<Record<string, unknown>>, _event: MouseEvent) => any) | undefined;
        "onRow-contextmenu"?: ((_row: Record<string, unknown>, _column: import("./index.js").TableColumn<Record<string, unknown>>, _event: MouseEvent) => any) | undefined;
        "onCell-click"?: ((_row: Record<string, unknown>, _column: import("./index.js").TableColumn<Record<string, unknown>>, _cell: HTMLElement, _event: MouseEvent) => any) | undefined;
        "onCell-dblclick"?: ((_row: Record<string, unknown>, _column: import("./index.js").TableColumn<Record<string, unknown>>, _cell: HTMLElement, _event: MouseEvent) => any) | undefined;
        "onHeader-click"?: ((_column: import("./index.js").TableColumn<Record<string, unknown>>, _event: MouseEvent) => any) | undefined;
        "onHeader-contextmenu"?: ((_column: import("./index.js").TableColumn<Record<string, unknown>>, _event: MouseEvent) => any) | undefined;
        "onColumn-visible-change"?: ((_columns: import("./index.js").TableColumn<Record<string, unknown>>[]) => any) | undefined;
        "onUpdate:currentRowKey"?: ((_key: string | number | undefined) => any) | undefined;
    }>, {
        getSelectionRows: () => Record<string, unknown>[];
        getSelectionRowKeys: () => Array<string | number>;
        toggleRowSelection: (row: Record<string, unknown>, selected?: boolean) => void;
        toggleAllSelection: () => void;
        clearSelection: () => void;
        setCurrentRow: (row: Record<string, unknown> | null) => void;
        toggleRowExpansion: (row: Record<string, unknown>, expanded?: boolean) => void;
        setExpandedRowKeys: (keys: Array<string | number>) => void;
        getExpandedRowKeys: () => Array<string | number>;
        sort: (prop: string, order: import("./index.js").SortOrder) => void;
        clearSort: () => void;
        filter: (prop: string, values: unknown[]) => void;
        clearFilter: (props?: string | string[]) => void;
        doLayout: () => void;
        refresh: () => void;
        scrollTo: (options: {
            left?: number;
            top?: number;
            row?: Record<string, unknown>;
            rowIndex?: number;
            column?: import("./index.js").TableColumn;
            columnIndex?: number;
        }) => void;
        getTableData: () => {
            fullData: Record<string, unknown>[];
            tableData: Record<string, unknown>[];
        };
        exportData: (config?: Record<string, unknown>) => Promise<string | void>;
        print: (config?: Record<string, unknown>) => Promise<void>;
        openImport: (config?: Record<string, unknown>) => Promise<Record<string, unknown>[]>;
        importFile: (file: File, config?: Record<string, unknown>) => Promise<Record<string, unknown>[]>;
        importData: (content: string | Record<string, unknown>[], config?: Record<string, unknown>) => Promise<Record<string, unknown>[]>;
        printMultiple: (tables: Array<{
            title?: string;
            data: Record<string, unknown>[];
            columns?: import("./index.js").TableColumn[];
            config?: Record<string, unknown>;
        }>, config?: Record<string, unknown>) => Promise<void>;
        printTemplate: (templateHtml: string, config?: Record<string, unknown>) => Promise<void>;
        toggleFullscreen: () => void;
        getColumns: () => import("./index.js").TableColumn[];
        setColumnVisible: (prop: string, visible: boolean) => void;
        resetColumns: () => void;
        insertRow: (row: Record<string, unknown>, index?: number) => void;
        removeRow: (row: Record<string, unknown> | Record<string, unknown>[]) => void;
        updateRow: (row: Record<string, unknown>, newRow: Record<string, unknown>) => void;
    }, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        select: (_selection: Record<string, unknown>[], _row: Record<string, unknown>) => void;
        scroll: (_params: {
            scrollTop: number;
            scrollLeft: number;
            isEnd: boolean;
        }) => void;
        "select-all": (_selection: Record<string, unknown>[]) => void;
        "drag-end": (_params: {
            type: "row" | "column";
            oldIndex: number;
            newIndex: number;
            data: unknown[];
        }) => void;
        "expand-change": (_row: Record<string, unknown>, _expandedRows: Record<string, unknown>[]) => void;
        "current-change": (_currentRow: Record<string, unknown> | null, _oldRow: Record<string, unknown> | null) => void;
        "update:data": (_data: Record<string, unknown>[]) => void;
        "column-resize": (_column: import("./index.js").TableColumn<Record<string, unknown>>, _width: number) => void;
        "sort-change": (_params: {
            column: import("./index.js").TableColumn;
            prop: string;
            order: import("./index.js").SortOrder;
        }) => void;
        "filter-change": (_filters: Record<string, unknown[]>) => void;
        "page-change": (_params: {
            currentPage: number;
            pageSize: number;
        }) => void;
        "selection-change": (_selectedRows: Record<string, unknown>[], _selectedRowKeys: (string | number)[]) => void;
        "row-click": (_row: Record<string, unknown>, _column: import("./index.js").TableColumn<Record<string, unknown>>, _event: MouseEvent) => void;
        "row-dblclick": (_row: Record<string, unknown>, _column: import("./index.js").TableColumn<Record<string, unknown>>, _event: MouseEvent) => void;
        "row-contextmenu": (_row: Record<string, unknown>, _column: import("./index.js").TableColumn<Record<string, unknown>>, _event: MouseEvent) => void;
        "cell-click": (_row: Record<string, unknown>, _column: import("./index.js").TableColumn<Record<string, unknown>>, _cell: HTMLElement, _event: MouseEvent) => void;
        "cell-dblclick": (_row: Record<string, unknown>, _column: import("./index.js").TableColumn<Record<string, unknown>>, _cell: HTMLElement, _event: MouseEvent) => void;
        "header-click": (_column: import("./index.js").TableColumn<Record<string, unknown>>, _event: MouseEvent) => void;
        "header-contextmenu": (_column: import("./index.js").TableColumn<Record<string, unknown>>, _event: MouseEvent) => void;
        "column-visible-change": (_columns: import("./index.js").TableColumn<Record<string, unknown>>[]) => void;
        "update:currentRowKey": (_key: string | number | undefined) => void;
    }, import("vue").PublicProps, {
        readonly data: Record<string, unknown>[];
        readonly size: import("./index.js").TableSize;
        readonly pagination: boolean | import("./index.js").TablePaginationConfig;
        readonly loading: boolean | import("./index.js").TableLoadingConfig;
        readonly emptyText: string;
        readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
        readonly tableLayout: "fixed" | "auto";
        readonly border: boolean | "none" | "full" | "inner" | "outer";
        readonly columns: import("./index.js").TableColumn<Record<string, unknown>>[];
        readonly lazy: boolean;
        readonly showHeader: boolean;
        readonly resizable: boolean;
        readonly fit: boolean;
        readonly rowKey: import("./index.js").RowKey;
        readonly stripe: boolean;
        readonly highlightCurrentRow: boolean;
        readonly tooltipEffect: "dark" | "light";
        readonly showIndex: boolean;
        readonly autoHeight: boolean;
        readonly keepScroll: boolean;
        readonly syncScroll: boolean;
        readonly scrollOptimize: boolean;
    }, true, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
        readonly data: {
            readonly type: import("vue").PropType<Record<string, unknown>[]>;
            readonly default: () => never[];
        };
        readonly columns: {
            readonly type: import("vue").PropType<import("./index.js").TableColumn[]>;
            readonly default: () => never[];
        };
        readonly rowKey: {
            readonly type: import("vue").PropType<import("./index.js").RowKey>;
            readonly default: "id";
        };
        readonly size: {
            readonly type: import("vue").PropType<import("./index.js").TableSize>;
            readonly default: "default";
        };
        readonly height: {
            readonly type: import("vue").PropType<number | string>;
        };
        readonly maxHeight: {
            readonly type: import("vue").PropType<number | string>;
        };
        readonly width: {
            readonly type: import("vue").PropType<number | string>;
        };
        readonly border: {
            readonly type: import("vue").PropType<boolean | "full" | "outer" | "inner" | "none">;
            readonly default: false;
        };
        readonly stripe: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly highlightCurrentRow: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly currentRowKey: {
            readonly type: import("vue").PropType<string | number>;
        };
        readonly showHeader: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly emptyText: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly fit: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly sortConfig: {
            readonly type: import("vue").PropType<import("./index.js").TableSortConfig>;
        };
        readonly filterConfig: {
            readonly type: import("vue").PropType<import("./index.js").TableFilterConfig>;
        };
        readonly pagination: {
            readonly type: import("vue").PropType<boolean | import("./index.js").TablePaginationConfig>;
            readonly default: false;
        };
        readonly selectionConfig: {
            readonly type: import("vue").PropType<import("./index.js").TableSelectionConfig>;
        };
        readonly expandConfig: {
            readonly type: import("vue").PropType<import("./index.js").TableExpandConfig>;
        };
        readonly treeConfig: {
            readonly type: import("vue").PropType<import("./index.js").TableTreeConfig>;
        };
        readonly virtualConfig: {
            readonly type: import("vue").PropType<import("./index.js").TableVirtualConfig>;
        };
        readonly dragConfig: {
            readonly type: import("vue").PropType<import("./index.js").TableDragConfig>;
        };
        readonly summaryConfig: {
            readonly type: import("vue").PropType<import("./index.js").TableSummaryConfig>;
        };
        readonly toolbarConfig: {
            readonly type: import("vue").PropType<import("./index.js").TableToolbarConfig>;
        };
        readonly emptyConfig: {
            readonly type: import("vue").PropType<import("./index.js").TableEmptyConfig>;
        };
        readonly loading: {
            readonly type: import("vue").PropType<boolean | import("./index.js").TableLoadingConfig>;
            readonly default: false;
        };
        readonly rowConfig: {
            readonly type: import("vue").PropType<import("./index.js").TableRowConfig>;
        };
        readonly headerConfig: {
            readonly type: import("vue").PropType<import("./index.js").TableHeaderConfig>;
        };
        readonly contextMenuConfig: {
            readonly type: import("vue").PropType<import("./index.js").TableContextMenuConfig>;
        };
        readonly tableLayout: {
            readonly type: import("vue").PropType<"auto" | "fixed">;
            readonly default: "fixed";
        };
        readonly tooltipEffect: {
            readonly type: import("vue").PropType<"dark" | "light">;
            readonly default: "dark";
        };
        readonly spanMethod: {
            readonly type: import("vue").PropType<(params: {
                row: Record<string, unknown>;
                column: import("./index.js").TableColumn;
                rowIndex: number;
                columnIndex: number;
            }) => {
                rowspan: number;
                colspan: number;
            } | [number, number] | void>;
        };
        readonly rowClassName: {
            readonly type: import("vue").PropType<string | ((params: {
                row: Record<string, unknown>;
                rowIndex: number;
            }) => string)>;
        };
        readonly rowStyle: {
            readonly type: import("vue").PropType<import("vue").CSSProperties | ((params: {
                row: Record<string, unknown>;
                rowIndex: number;
            }) => import("vue").CSSProperties)>;
        };
        readonly cellClassName: {
            readonly type: import("vue").PropType<string | ((params: {
                row: Record<string, unknown>;
                column: import("./index.js").TableColumn;
                rowIndex: number;
                columnIndex: number;
            }) => string)>;
        };
        readonly cellStyle: {
            readonly type: import("vue").PropType<import("vue").CSSProperties | ((params: {
                row: Record<string, unknown>;
                column: import("./index.js").TableColumn;
                rowIndex: number;
                columnIndex: number;
            }) => import("vue").CSSProperties)>;
        };
        readonly headerRowClassName: {
            readonly type: import("vue").PropType<string | ((params: {
                rowIndex: number;
            }) => string)>;
        };
        readonly headerRowStyle: {
            readonly type: import("vue").PropType<import("vue").CSSProperties | ((params: {
                rowIndex: number;
            }) => import("vue").CSSProperties)>;
        };
        readonly headerCellClassName: {
            readonly type: import("vue").PropType<string | ((params: {
                column: import("./index.js").TableColumn;
                columnIndex: number;
            }) => string)>;
        };
        readonly headerCellStyle: {
            readonly type: import("vue").PropType<import("vue").CSSProperties | ((params: {
                column: import("./index.js").TableColumn;
                columnIndex: number;
            }) => import("vue").CSSProperties)>;
        };
        readonly lazy: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly loadMethod: {
            readonly type: import("vue").PropType<(row: Record<string, unknown>) => Promise<Record<string, unknown>[]>>;
        };
        readonly resizable: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly showIndex: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly indexConfig: {
            readonly type: import("vue").PropType<{
                label?: string;
                width?: number | string;
                fixed?: import("./index.js").FixedPosition;
                method?: (rowIndex: number) => number | string;
            }>;
        };
        readonly autoHeight: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly keepScroll: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly syncScroll: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly scrollOptimize: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly themeOverrides: {
            readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
            readonly default: undefined;
        };
    }>> & Readonly<{
        onSelect?: ((_selection: Record<string, unknown>[], _row: Record<string, unknown>) => any) | undefined;
        onScroll?: ((_params: {
            scrollTop: number;
            scrollLeft: number;
            isEnd: boolean;
        }) => any) | undefined;
        "onSelect-all"?: ((_selection: Record<string, unknown>[]) => any) | undefined;
        "onDrag-end"?: ((_params: {
            type: "row" | "column";
            oldIndex: number;
            newIndex: number;
            data: unknown[];
        }) => any) | undefined;
        "onExpand-change"?: ((_row: Record<string, unknown>, _expandedRows: Record<string, unknown>[]) => any) | undefined;
        "onCurrent-change"?: ((_currentRow: Record<string, unknown> | null, _oldRow: Record<string, unknown> | null) => any) | undefined;
        "onUpdate:data"?: ((_data: Record<string, unknown>[]) => any) | undefined;
        "onColumn-resize"?: ((_column: import("./index.js").TableColumn<Record<string, unknown>>, _width: number) => any) | undefined;
        "onSort-change"?: ((_params: {
            column: import("./index.js").TableColumn;
            prop: string;
            order: import("./index.js").SortOrder;
        }) => any) | undefined;
        "onFilter-change"?: ((_filters: Record<string, unknown[]>) => any) | undefined;
        "onPage-change"?: ((_params: {
            currentPage: number;
            pageSize: number;
        }) => any) | undefined;
        "onSelection-change"?: ((_selectedRows: Record<string, unknown>[], _selectedRowKeys: (string | number)[]) => any) | undefined;
        "onRow-click"?: ((_row: Record<string, unknown>, _column: import("./index.js").TableColumn<Record<string, unknown>>, _event: MouseEvent) => any) | undefined;
        "onRow-dblclick"?: ((_row: Record<string, unknown>, _column: import("./index.js").TableColumn<Record<string, unknown>>, _event: MouseEvent) => any) | undefined;
        "onRow-contextmenu"?: ((_row: Record<string, unknown>, _column: import("./index.js").TableColumn<Record<string, unknown>>, _event: MouseEvent) => any) | undefined;
        "onCell-click"?: ((_row: Record<string, unknown>, _column: import("./index.js").TableColumn<Record<string, unknown>>, _cell: HTMLElement, _event: MouseEvent) => any) | undefined;
        "onCell-dblclick"?: ((_row: Record<string, unknown>, _column: import("./index.js").TableColumn<Record<string, unknown>>, _cell: HTMLElement, _event: MouseEvent) => any) | undefined;
        "onHeader-click"?: ((_column: import("./index.js").TableColumn<Record<string, unknown>>, _event: MouseEvent) => any) | undefined;
        "onHeader-contextmenu"?: ((_column: import("./index.js").TableColumn<Record<string, unknown>>, _event: MouseEvent) => any) | undefined;
        "onColumn-visible-change"?: ((_columns: import("./index.js").TableColumn<Record<string, unknown>>[]) => any) | undefined;
        "onUpdate:currentRowKey"?: ((_key: string | number | undefined) => any) | undefined;
    }>, {
        getSelectionRows: () => Record<string, unknown>[];
        getSelectionRowKeys: () => Array<string | number>;
        toggleRowSelection: (row: Record<string, unknown>, selected?: boolean) => void;
        toggleAllSelection: () => void;
        clearSelection: () => void;
        setCurrentRow: (row: Record<string, unknown> | null) => void;
        toggleRowExpansion: (row: Record<string, unknown>, expanded?: boolean) => void;
        setExpandedRowKeys: (keys: Array<string | number>) => void;
        getExpandedRowKeys: () => Array<string | number>;
        sort: (prop: string, order: import("./index.js").SortOrder) => void;
        clearSort: () => void;
        filter: (prop: string, values: unknown[]) => void;
        clearFilter: (props?: string | string[]) => void;
        doLayout: () => void;
        refresh: () => void;
        scrollTo: (options: {
            left?: number;
            top?: number;
            row?: Record<string, unknown>;
            rowIndex?: number;
            column?: import("./index.js").TableColumn;
            columnIndex?: number;
        }) => void;
        getTableData: () => {
            fullData: Record<string, unknown>[];
            tableData: Record<string, unknown>[];
        };
        exportData: (config?: Record<string, unknown>) => Promise<string | void>;
        print: (config?: Record<string, unknown>) => Promise<void>;
        openImport: (config?: Record<string, unknown>) => Promise<Record<string, unknown>[]>;
        importFile: (file: File, config?: Record<string, unknown>) => Promise<Record<string, unknown>[]>;
        importData: (content: string | Record<string, unknown>[], config?: Record<string, unknown>) => Promise<Record<string, unknown>[]>;
        printMultiple: (tables: Array<{
            title?: string;
            data: Record<string, unknown>[];
            columns?: import("./index.js").TableColumn[];
            config?: Record<string, unknown>;
        }>, config?: Record<string, unknown>) => Promise<void>;
        printTemplate: (templateHtml: string, config?: Record<string, unknown>) => Promise<void>;
        toggleFullscreen: () => void;
        getColumns: () => import("./index.js").TableColumn[];
        setColumnVisible: (prop: string, visible: boolean) => void;
        resetColumns: () => void;
        insertRow: (row: Record<string, unknown>, index?: number) => void;
        removeRow: (row: Record<string, unknown> | Record<string, unknown>[]) => void;
        updateRow: (row: Record<string, unknown>, newRow: Record<string, unknown>) => void;
    }, {}, {}, {}, {
        readonly data: Record<string, unknown>[];
        readonly size: import("./index.js").TableSize;
        readonly pagination: boolean | import("./index.js").TablePaginationConfig;
        readonly loading: boolean | import("./index.js").TableLoadingConfig;
        readonly emptyText: string;
        readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
        readonly tableLayout: "fixed" | "auto";
        readonly border: boolean | "none" | "full" | "inner" | "outer";
        readonly columns: import("./index.js").TableColumn<Record<string, unknown>>[];
        readonly lazy: boolean;
        readonly showHeader: boolean;
        readonly resizable: boolean;
        readonly fit: boolean;
        readonly rowKey: import("./index.js").RowKey;
        readonly stripe: boolean;
        readonly highlightCurrentRow: boolean;
        readonly tooltipEffect: "dark" | "light";
        readonly showIndex: boolean;
        readonly autoHeight: boolean;
        readonly keepScroll: boolean;
        readonly syncScroll: boolean;
        readonly scrollOptimize: boolean;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
    readonly data: {
        readonly type: import("vue").PropType<Record<string, unknown>[]>;
        readonly default: () => never[];
    };
    readonly columns: {
        readonly type: import("vue").PropType<import("./index.js").TableColumn[]>;
        readonly default: () => never[];
    };
    readonly rowKey: {
        readonly type: import("vue").PropType<import("./index.js").RowKey>;
        readonly default: "id";
    };
    readonly size: {
        readonly type: import("vue").PropType<import("./index.js").TableSize>;
        readonly default: "default";
    };
    readonly height: {
        readonly type: import("vue").PropType<number | string>;
    };
    readonly maxHeight: {
        readonly type: import("vue").PropType<number | string>;
    };
    readonly width: {
        readonly type: import("vue").PropType<number | string>;
    };
    readonly border: {
        readonly type: import("vue").PropType<boolean | "full" | "outer" | "inner" | "none">;
        readonly default: false;
    };
    readonly stripe: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly highlightCurrentRow: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly currentRowKey: {
        readonly type: import("vue").PropType<string | number>;
    };
    readonly showHeader: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly emptyText: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly fit: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly sortConfig: {
        readonly type: import("vue").PropType<import("./index.js").TableSortConfig>;
    };
    readonly filterConfig: {
        readonly type: import("vue").PropType<import("./index.js").TableFilterConfig>;
    };
    readonly pagination: {
        readonly type: import("vue").PropType<boolean | import("./index.js").TablePaginationConfig>;
        readonly default: false;
    };
    readonly selectionConfig: {
        readonly type: import("vue").PropType<import("./index.js").TableSelectionConfig>;
    };
    readonly expandConfig: {
        readonly type: import("vue").PropType<import("./index.js").TableExpandConfig>;
    };
    readonly treeConfig: {
        readonly type: import("vue").PropType<import("./index.js").TableTreeConfig>;
    };
    readonly virtualConfig: {
        readonly type: import("vue").PropType<import("./index.js").TableVirtualConfig>;
    };
    readonly dragConfig: {
        readonly type: import("vue").PropType<import("./index.js").TableDragConfig>;
    };
    readonly summaryConfig: {
        readonly type: import("vue").PropType<import("./index.js").TableSummaryConfig>;
    };
    readonly toolbarConfig: {
        readonly type: import("vue").PropType<import("./index.js").TableToolbarConfig>;
    };
    readonly emptyConfig: {
        readonly type: import("vue").PropType<import("./index.js").TableEmptyConfig>;
    };
    readonly loading: {
        readonly type: import("vue").PropType<boolean | import("./index.js").TableLoadingConfig>;
        readonly default: false;
    };
    readonly rowConfig: {
        readonly type: import("vue").PropType<import("./index.js").TableRowConfig>;
    };
    readonly headerConfig: {
        readonly type: import("vue").PropType<import("./index.js").TableHeaderConfig>;
    };
    readonly contextMenuConfig: {
        readonly type: import("vue").PropType<import("./index.js").TableContextMenuConfig>;
    };
    readonly tableLayout: {
        readonly type: import("vue").PropType<"auto" | "fixed">;
        readonly default: "fixed";
    };
    readonly tooltipEffect: {
        readonly type: import("vue").PropType<"dark" | "light">;
        readonly default: "dark";
    };
    readonly spanMethod: {
        readonly type: import("vue").PropType<(params: {
            row: Record<string, unknown>;
            column: import("./index.js").TableColumn;
            rowIndex: number;
            columnIndex: number;
        }) => {
            rowspan: number;
            colspan: number;
        } | [number, number] | void>;
    };
    readonly rowClassName: {
        readonly type: import("vue").PropType<string | ((params: {
            row: Record<string, unknown>;
            rowIndex: number;
        }) => string)>;
    };
    readonly rowStyle: {
        readonly type: import("vue").PropType<import("vue").CSSProperties | ((params: {
            row: Record<string, unknown>;
            rowIndex: number;
        }) => import("vue").CSSProperties)>;
    };
    readonly cellClassName: {
        readonly type: import("vue").PropType<string | ((params: {
            row: Record<string, unknown>;
            column: import("./index.js").TableColumn;
            rowIndex: number;
            columnIndex: number;
        }) => string)>;
    };
    readonly cellStyle: {
        readonly type: import("vue").PropType<import("vue").CSSProperties | ((params: {
            row: Record<string, unknown>;
            column: import("./index.js").TableColumn;
            rowIndex: number;
            columnIndex: number;
        }) => import("vue").CSSProperties)>;
    };
    readonly headerRowClassName: {
        readonly type: import("vue").PropType<string | ((params: {
            rowIndex: number;
        }) => string)>;
    };
    readonly headerRowStyle: {
        readonly type: import("vue").PropType<import("vue").CSSProperties | ((params: {
            rowIndex: number;
        }) => import("vue").CSSProperties)>;
    };
    readonly headerCellClassName: {
        readonly type: import("vue").PropType<string | ((params: {
            column: import("./index.js").TableColumn;
            columnIndex: number;
        }) => string)>;
    };
    readonly headerCellStyle: {
        readonly type: import("vue").PropType<import("vue").CSSProperties | ((params: {
            column: import("./index.js").TableColumn;
            columnIndex: number;
        }) => import("vue").CSSProperties)>;
    };
    readonly lazy: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly loadMethod: {
        readonly type: import("vue").PropType<(row: Record<string, unknown>) => Promise<Record<string, unknown>[]>>;
    };
    readonly resizable: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly showIndex: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly indexConfig: {
        readonly type: import("vue").PropType<{
            label?: string;
            width?: number | string;
            fixed?: import("./index.js").FixedPosition;
            method?: (rowIndex: number) => number | string;
        }>;
    };
    readonly autoHeight: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly keepScroll: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly syncScroll: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly scrollOptimize: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>> & Readonly<{
    onSelect?: ((_selection: Record<string, unknown>[], _row: Record<string, unknown>) => any) | undefined;
    onScroll?: ((_params: {
        scrollTop: number;
        scrollLeft: number;
        isEnd: boolean;
    }) => any) | undefined;
    "onSelect-all"?: ((_selection: Record<string, unknown>[]) => any) | undefined;
    "onDrag-end"?: ((_params: {
        type: "row" | "column";
        oldIndex: number;
        newIndex: number;
        data: unknown[];
    }) => any) | undefined;
    "onExpand-change"?: ((_row: Record<string, unknown>, _expandedRows: Record<string, unknown>[]) => any) | undefined;
    "onCurrent-change"?: ((_currentRow: Record<string, unknown> | null, _oldRow: Record<string, unknown> | null) => any) | undefined;
    "onUpdate:data"?: ((_data: Record<string, unknown>[]) => any) | undefined;
    "onColumn-resize"?: ((_column: import("./index.js").TableColumn<Record<string, unknown>>, _width: number) => any) | undefined;
    "onSort-change"?: ((_params: {
        column: import("./index.js").TableColumn;
        prop: string;
        order: import("./index.js").SortOrder;
    }) => any) | undefined;
    "onFilter-change"?: ((_filters: Record<string, unknown[]>) => any) | undefined;
    "onPage-change"?: ((_params: {
        currentPage: number;
        pageSize: number;
    }) => any) | undefined;
    "onSelection-change"?: ((_selectedRows: Record<string, unknown>[], _selectedRowKeys: (string | number)[]) => any) | undefined;
    "onRow-click"?: ((_row: Record<string, unknown>, _column: import("./index.js").TableColumn<Record<string, unknown>>, _event: MouseEvent) => any) | undefined;
    "onRow-dblclick"?: ((_row: Record<string, unknown>, _column: import("./index.js").TableColumn<Record<string, unknown>>, _event: MouseEvent) => any) | undefined;
    "onRow-contextmenu"?: ((_row: Record<string, unknown>, _column: import("./index.js").TableColumn<Record<string, unknown>>, _event: MouseEvent) => any) | undefined;
    "onCell-click"?: ((_row: Record<string, unknown>, _column: import("./index.js").TableColumn<Record<string, unknown>>, _cell: HTMLElement, _event: MouseEvent) => any) | undefined;
    "onCell-dblclick"?: ((_row: Record<string, unknown>, _column: import("./index.js").TableColumn<Record<string, unknown>>, _cell: HTMLElement, _event: MouseEvent) => any) | undefined;
    "onHeader-click"?: ((_column: import("./index.js").TableColumn<Record<string, unknown>>, _event: MouseEvent) => any) | undefined;
    "onHeader-contextmenu"?: ((_column: import("./index.js").TableColumn<Record<string, unknown>>, _event: MouseEvent) => any) | undefined;
    "onColumn-visible-change"?: ((_columns: import("./index.js").TableColumn<Record<string, unknown>>[]) => any) | undefined;
    "onUpdate:currentRowKey"?: ((_key: string | number | undefined) => any) | undefined;
}>, {
    getSelectionRows: () => Record<string, unknown>[];
    getSelectionRowKeys: () => Array<string | number>;
    toggleRowSelection: (row: Record<string, unknown>, selected?: boolean) => void;
    toggleAllSelection: () => void;
    clearSelection: () => void;
    setCurrentRow: (row: Record<string, unknown> | null) => void;
    toggleRowExpansion: (row: Record<string, unknown>, expanded?: boolean) => void;
    setExpandedRowKeys: (keys: Array<string | number>) => void;
    getExpandedRowKeys: () => Array<string | number>;
    sort: (prop: string, order: import("./index.js").SortOrder) => void;
    clearSort: () => void;
    filter: (prop: string, values: unknown[]) => void;
    clearFilter: (props?: string | string[]) => void;
    doLayout: () => void;
    refresh: () => void;
    scrollTo: (options: {
        left?: number;
        top?: number;
        row?: Record<string, unknown>;
        rowIndex?: number;
        column?: import("./index.js").TableColumn;
        columnIndex?: number;
    }) => void;
    getTableData: () => {
        fullData: Record<string, unknown>[];
        tableData: Record<string, unknown>[];
    };
    exportData: (config?: Record<string, unknown>) => Promise<string | void>;
    print: (config?: Record<string, unknown>) => Promise<void>;
    openImport: (config?: Record<string, unknown>) => Promise<Record<string, unknown>[]>;
    importFile: (file: File, config?: Record<string, unknown>) => Promise<Record<string, unknown>[]>;
    importData: (content: string | Record<string, unknown>[], config?: Record<string, unknown>) => Promise<Record<string, unknown>[]>;
    printMultiple: (tables: Array<{
        title?: string;
        data: Record<string, unknown>[];
        columns?: import("./index.js").TableColumn[];
        config?: Record<string, unknown>;
    }>, config?: Record<string, unknown>) => Promise<void>;
    printTemplate: (templateHtml: string, config?: Record<string, unknown>) => Promise<void>;
    toggleFullscreen: () => void;
    getColumns: () => import("./index.js").TableColumn[];
    setColumnVisible: (prop: string, visible: boolean) => void;
    resetColumns: () => void;
    insertRow: (row: Record<string, unknown>, index?: number) => void;
    removeRow: (row: Record<string, unknown> | Record<string, unknown>[]) => void;
    updateRow: (row: Record<string, unknown>, newRow: Record<string, unknown>) => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    select: (_selection: Record<string, unknown>[], _row: Record<string, unknown>) => void;
    scroll: (_params: {
        scrollTop: number;
        scrollLeft: number;
        isEnd: boolean;
    }) => void;
    "select-all": (_selection: Record<string, unknown>[]) => void;
    "drag-end": (_params: {
        type: "row" | "column";
        oldIndex: number;
        newIndex: number;
        data: unknown[];
    }) => void;
    "expand-change": (_row: Record<string, unknown>, _expandedRows: Record<string, unknown>[]) => void;
    "current-change": (_currentRow: Record<string, unknown> | null, _oldRow: Record<string, unknown> | null) => void;
    "update:data": (_data: Record<string, unknown>[]) => void;
    "column-resize": (_column: import("./index.js").TableColumn<Record<string, unknown>>, _width: number) => void;
    "sort-change": (_params: {
        column: import("./index.js").TableColumn;
        prop: string;
        order: import("./index.js").SortOrder;
    }) => void;
    "filter-change": (_filters: Record<string, unknown[]>) => void;
    "page-change": (_params: {
        currentPage: number;
        pageSize: number;
    }) => void;
    "selection-change": (_selectedRows: Record<string, unknown>[], _selectedRowKeys: (string | number)[]) => void;
    "row-click": (_row: Record<string, unknown>, _column: import("./index.js").TableColumn<Record<string, unknown>>, _event: MouseEvent) => void;
    "row-dblclick": (_row: Record<string, unknown>, _column: import("./index.js").TableColumn<Record<string, unknown>>, _event: MouseEvent) => void;
    "row-contextmenu": (_row: Record<string, unknown>, _column: import("./index.js").TableColumn<Record<string, unknown>>, _event: MouseEvent) => void;
    "cell-click": (_row: Record<string, unknown>, _column: import("./index.js").TableColumn<Record<string, unknown>>, _cell: HTMLElement, _event: MouseEvent) => void;
    "cell-dblclick": (_row: Record<string, unknown>, _column: import("./index.js").TableColumn<Record<string, unknown>>, _cell: HTMLElement, _event: MouseEvent) => void;
    "header-click": (_column: import("./index.js").TableColumn<Record<string, unknown>>, _event: MouseEvent) => void;
    "header-contextmenu": (_column: import("./index.js").TableColumn<Record<string, unknown>>, _event: MouseEvent) => void;
    "column-visible-change": (_columns: import("./index.js").TableColumn<Record<string, unknown>>[]) => void;
    "update:currentRowKey": (_key: string | number | undefined) => void;
}, string, {
    readonly data: Record<string, unknown>[];
    readonly size: import("./index.js").TableSize;
    readonly pagination: boolean | import("./index.js").TablePaginationConfig;
    readonly loading: boolean | import("./index.js").TableLoadingConfig;
    readonly emptyText: string;
    readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
    readonly tableLayout: "fixed" | "auto";
    readonly border: boolean | "none" | "full" | "inner" | "outer";
    readonly columns: import("./index.js").TableColumn<Record<string, unknown>>[];
    readonly lazy: boolean;
    readonly showHeader: boolean;
    readonly resizable: boolean;
    readonly fit: boolean;
    readonly rowKey: import("./index.js").RowKey;
    readonly stripe: boolean;
    readonly highlightCurrentRow: boolean;
    readonly tooltipEffect: "dark" | "light";
    readonly showIndex: boolean;
    readonly autoHeight: boolean;
    readonly keepScroll: boolean;
    readonly syncScroll: boolean;
    readonly scrollOptimize: boolean;
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        [x: string]: ((props: {
            column: import("./index.js").TableColumn<Record<string, unknown>>;
            columnIndex: number;
        }) => any) | undefined;
    } & {
        [x: string]: ((props: {
            column: import("./index.js").TableColumn<Record<string, unknown>>;
            columnIndex: number;
        }) => any) | undefined;
    } & {
        [x: string]: ((props: {
            row: Record<string, unknown>;
            column: import("./index.js").TableColumn<Record<string, unknown>>;
            rowIndex: number;
            cellValue: unknown;
        }) => any) | undefined;
    } & {
        [x: `summary-${string}`]: ((props: {
            column: import("./index.js").TableColumn<Record<string, unknown>>;
            columnIndex: number;
            data: Record<string, unknown>[];
        }) => any) | undefined;
    } & {
        toolbar?: (props: {}) => any;
    } & {
        'toolbar-left-prefix'?: (props: {}) => any;
    } & {
        'toolbar-left'?: (props: {}) => any;
    } & {
        'toolbar-left-suffix'?: (props: {}) => any;
    } & {
        'toolbar-right-prefix'?: (props: {}) => any;
    } & {
        'toolbar-right'?: (props: {}) => any;
    } & {
        'toolbar-right-suffix'?: (props: {}) => any;
    } & {
        empty?: (props: {}) => any;
    } & {
        expand?: (props: {
            row: Record<string, unknown>;
            rowIndex: number;
        }) => any;
    } & {
        summary?: (props: {}) => any;
    } & {
        loading?: (props: {}) => any;
    } & {
        default?: (props: {}) => any;
    };
})> & {
    TableColumn: import("vue").DefineComponent<{
        columnKey?: string;
        prop?: string;
        label?: string;
        width?: number | string;
        minWidth?: number | string;
        maxWidth?: number | string;
        align?: "left" | "center" | "right";
        headerAlign?: "left" | "center" | "right";
        fixed?: "left" | "right" | boolean;
        sortable?: boolean | "custom";
        filterable?: boolean;
        filters?: Array<{
            text: string;
            value: unknown;
        }>;
        filterMultiple?: boolean;
        resizable?: boolean;
        showOverflowTooltip?: boolean;
        className?: string;
        headerClassName?: string;
        type?: "selection" | "index" | "expand" | "radio";
        visible?: boolean;
        treeNode?: boolean;
    }, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<{
        columnKey?: string;
        prop?: string;
        label?: string;
        width?: number | string;
        minWidth?: number | string;
        maxWidth?: number | string;
        align?: "left" | "center" | "right";
        headerAlign?: "left" | "center" | "right";
        fixed?: "left" | "right" | boolean;
        sortable?: boolean | "custom";
        filterable?: boolean;
        filters?: Array<{
            text: string;
            value: unknown;
        }>;
        filterMultiple?: boolean;
        resizable?: boolean;
        showOverflowTooltip?: boolean;
        className?: string;
        headerClassName?: string;
        type?: "selection" | "index" | "expand" | "radio";
        visible?: boolean;
        treeNode?: boolean;
    }> & Readonly<{}>, {
        label: string;
        filters: Array<{
            text: string;
            value: unknown;
        }>;
        fixed: "left" | "right" | boolean;
        type: "selection" | "index" | "expand" | "radio";
        width: number | string;
        maxWidth: number | string;
        minWidth: number | string;
        visible: boolean;
        prop: string;
        align: "left" | "center" | "right";
        filterable: boolean;
        headerAlign: "left" | "center" | "right";
        resizable: boolean;
        className: string;
        filterMultiple: boolean;
        sortable: boolean | "custom";
        showOverflowTooltip: boolean;
        headerClassName: string;
        treeNode: boolean;
        columnKey: string;
    }, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
};
export declare const YhTableColumn: import("@yh-ui/utils").SFCWithInstall<import("vue").DefineComponent<{
    columnKey?: string;
    prop?: string;
    label?: string;
    width?: number | string;
    minWidth?: number | string;
    maxWidth?: number | string;
    align?: "left" | "center" | "right";
    headerAlign?: "left" | "center" | "right";
    fixed?: "left" | "right" | boolean;
    sortable?: boolean | "custom";
    filterable?: boolean;
    filters?: Array<{
        text: string;
        value: unknown;
    }>;
    filterMultiple?: boolean;
    resizable?: boolean;
    showOverflowTooltip?: boolean;
    className?: string;
    headerClassName?: string;
    type?: "selection" | "index" | "expand" | "radio";
    visible?: boolean;
    treeNode?: boolean;
}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<{
    columnKey?: string;
    prop?: string;
    label?: string;
    width?: number | string;
    minWidth?: number | string;
    maxWidth?: number | string;
    align?: "left" | "center" | "right";
    headerAlign?: "left" | "center" | "right";
    fixed?: "left" | "right" | boolean;
    sortable?: boolean | "custom";
    filterable?: boolean;
    filters?: Array<{
        text: string;
        value: unknown;
    }>;
    filterMultiple?: boolean;
    resizable?: boolean;
    showOverflowTooltip?: boolean;
    className?: string;
    headerClassName?: string;
    type?: "selection" | "index" | "expand" | "radio";
    visible?: boolean;
    treeNode?: boolean;
}> & Readonly<{}>, {
    label: string;
    filters: Array<{
        text: string;
        value: unknown;
    }>;
    fixed: "left" | "right" | boolean;
    type: "selection" | "index" | "expand" | "radio";
    width: number | string;
    maxWidth: number | string;
    minWidth: number | string;
    visible: boolean;
    prop: string;
    align: "left" | "center" | "right";
    filterable: boolean;
    headerAlign: "left" | "center" | "right";
    resizable: boolean;
    className: string;
    filterMultiple: boolean;
    sortable: boolean | "custom";
    showOverflowTooltip: boolean;
    headerClassName: string;
    treeNode: boolean;
    columnKey: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>>;
export default YhTable;
export * from './src/table';
export type TableInstance = InstanceType<typeof Table>;
export type TableColumnInstance = InstanceType<typeof TableColumn>;
