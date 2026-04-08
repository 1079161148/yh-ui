/**
 * YhTable - 高性能表格组件
 * 融合 vxe-table、Element Plus、Naive UI、Ant Design 各家之长
 * 支持虚拟滚动、树形数据、拖拽、固定列/行、汇总行等高级功能
 */
import { type CSSProperties } from 'vue';
import { type TableColumn, type SortOrder, type TablePaginationConfig } from './table';
declare var __VLS_1: {}, __VLS_3: {}, __VLS_5: {}, __VLS_7: {}, __VLS_9: {}, __VLS_11: {}, __VLS_13: {}, __VLS_20: string, __VLS_21: {
    column: TableColumn<Record<string, unknown>>;
    columnIndex: number;
}, __VLS_36: string, __VLS_37: {
    column: TableColumn<Record<string, unknown>>;
    columnIndex: number;
}, __VLS_47: {}, __VLS_54: string, __VLS_55: {
    row: Record<string, unknown>;
    column: TableColumn<Record<string, unknown>>;
    rowIndex: number;
    cellValue: unknown;
}, __VLS_65: {
    row: Record<string, unknown>;
    rowIndex: number;
}, __VLS_71: {}, __VLS_74: `summary-${string}`, __VLS_75: {
    column: TableColumn<Record<string, unknown>>;
    columnIndex: number;
    data: Record<string, unknown>[];
}, __VLS_77: {}, __VLS_88: {};
type __VLS_Slots = {} & {
    [K in NonNullable<typeof __VLS_20>]?: (props: typeof __VLS_21) => any;
} & {
    [K in NonNullable<typeof __VLS_36>]?: (props: typeof __VLS_37) => any;
} & {
    [K in NonNullable<typeof __VLS_54>]?: (props: typeof __VLS_55) => any;
} & {
    [K in NonNullable<typeof __VLS_74>]?: (props: typeof __VLS_75) => any;
} & {
    toolbar?: (props: typeof __VLS_1) => any;
} & {
    'toolbar-left-prefix'?: (props: typeof __VLS_3) => any;
} & {
    'toolbar-left'?: (props: typeof __VLS_5) => any;
} & {
    'toolbar-left-suffix'?: (props: typeof __VLS_7) => any;
} & {
    'toolbar-right-prefix'?: (props: typeof __VLS_9) => any;
} & {
    'toolbar-right'?: (props: typeof __VLS_11) => any;
} & {
    'toolbar-right-suffix'?: (props: typeof __VLS_13) => any;
} & {
    empty?: (props: typeof __VLS_47) => any;
} & {
    expand?: (props: typeof __VLS_65) => any;
} & {
    summary?: (props: typeof __VLS_71) => any;
} & {
    loading?: (props: typeof __VLS_77) => any;
} & {
    default?: (props: typeof __VLS_88) => any;
};
declare const __VLS_component: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly data: {
        readonly type: import("vue").PropType<Record<string, unknown>[]>;
        readonly default: () => never[];
    };
    readonly columns: {
        readonly type: import("vue").PropType<TableColumn[]>;
        readonly default: () => never[];
    };
    readonly rowKey: {
        readonly type: import("vue").PropType<import("./table").RowKey>;
        readonly default: "id";
    };
    readonly size: {
        readonly type: import("vue").PropType<import("./table").TableSize>;
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
        readonly type: import("vue").PropType<import("./table").TableSortConfig>;
    };
    readonly filterConfig: {
        readonly type: import("vue").PropType<import("./table").TableFilterConfig>;
    };
    readonly pagination: {
        readonly type: import("vue").PropType<boolean | TablePaginationConfig>;
        readonly default: false;
    };
    readonly selectionConfig: {
        readonly type: import("vue").PropType<import("./table").TableSelectionConfig>;
    };
    readonly expandConfig: {
        readonly type: import("vue").PropType<import("./table").TableExpandConfig>;
    };
    readonly treeConfig: {
        readonly type: import("vue").PropType<import("./table").TableTreeConfig>;
    };
    readonly virtualConfig: {
        readonly type: import("vue").PropType<import("./table").TableVirtualConfig>;
    };
    readonly dragConfig: {
        readonly type: import("vue").PropType<import("./table").TableDragConfig>;
    };
    readonly summaryConfig: {
        readonly type: import("vue").PropType<import("./table").TableSummaryConfig>;
    };
    readonly toolbarConfig: {
        readonly type: import("vue").PropType<import("./table").TableToolbarConfig>;
    };
    readonly emptyConfig: {
        readonly type: import("vue").PropType<import("./table").TableEmptyConfig>;
    };
    readonly loading: {
        readonly type: import("vue").PropType<boolean | import("./table").TableLoadingConfig>;
        readonly default: false;
    };
    readonly rowConfig: {
        readonly type: import("vue").PropType<import("./table").TableRowConfig>;
    };
    readonly headerConfig: {
        readonly type: import("vue").PropType<import("./table").TableHeaderConfig>;
    };
    readonly contextMenuConfig: {
        readonly type: import("vue").PropType<import("./table").TableContextMenuConfig>;
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
            column: TableColumn;
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
        readonly type: import("vue").PropType<CSSProperties | ((params: {
            row: Record<string, unknown>;
            rowIndex: number;
        }) => CSSProperties)>;
    };
    readonly cellClassName: {
        readonly type: import("vue").PropType<string | ((params: {
            row: Record<string, unknown>;
            column: TableColumn;
            rowIndex: number;
            columnIndex: number;
        }) => string)>;
    };
    readonly cellStyle: {
        readonly type: import("vue").PropType<CSSProperties | ((params: {
            row: Record<string, unknown>;
            column: TableColumn;
            rowIndex: number;
            columnIndex: number;
        }) => CSSProperties)>;
    };
    readonly headerRowClassName: {
        readonly type: import("vue").PropType<string | ((params: {
            rowIndex: number;
        }) => string)>;
    };
    readonly headerRowStyle: {
        readonly type: import("vue").PropType<CSSProperties | ((params: {
            rowIndex: number;
        }) => CSSProperties)>;
    };
    readonly headerCellClassName: {
        readonly type: import("vue").PropType<string | ((params: {
            column: TableColumn;
            columnIndex: number;
        }) => string)>;
    };
    readonly headerCellStyle: {
        readonly type: import("vue").PropType<CSSProperties | ((params: {
            column: TableColumn;
            columnIndex: number;
        }) => CSSProperties)>;
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
            label
            /**
             * YhTable - 高性能表格组件
             * 融合 vxe-table、Element Plus、Naive UI、Ant Design 各家之长
             * 支持虚拟滚动、树形数据、拖拽、固定列/行、汇总行等高级功能
             */
            ?: string;
            width
            /**
             * YhTable - 高性能表格组件
             * 融合 vxe-table、Element Plus、Naive UI、Ant Design 各家之长
             * 支持虚拟滚动、树形数据、拖拽、固定列/行、汇总行等高级功能
             */
            ?: number | string;
            fixed
            /**
             * YhTable - 高性能表格组件
             * 融合 vxe-table、Element Plus、Naive UI、Ant Design 各家之长
             * 支持虚拟滚动、树形数据、拖拽、固定列/行、汇总行等高级功能
             */
            ?: import("./table").FixedPosition;
            method
            /**
             * YhTable - 高性能表格组件
             * 融合 vxe-table、Element Plus、Naive UI、Ant Design 各家之长
             * 支持虚拟滚动、树形数据、拖拽、固定列/行、汇总行等高级功能
             */
            ?: (rowIndex: number) => number | string;
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
}>, {
    getSelectionRows: () => Record<string, unknown>[];
    getSelectionRowKeys: () => Array<string | number>;
    toggleRowSelection: (row: Record<string, unknown>, selected
    /**
     * YhTable - 高性能表格组件
     * 融合 vxe-table、Element Plus、Naive UI、Ant Design 各家之长
     * 支持虚拟滚动、树形数据、拖拽、固定列/行、汇总行等高级功能
     */
    ?: boolean) => void;
    toggleAllSelection: () => void;
    clearSelection: () => void;
    setCurrentRow: (row: Record<string, unknown> | null) => void;
    toggleRowExpansion: (row: Record<string, unknown>, expanded
    /**
     * YhTable - 高性能表格组件
     * 融合 vxe-table、Element Plus、Naive UI、Ant Design 各家之长
     * 支持虚拟滚动、树形数据、拖拽、固定列/行、汇总行等高级功能
     */
    ?: boolean) => void;
    setExpandedRowKeys: (keys: Array<string | number>) => void;
    getExpandedRowKeys: () => Array<string | number>;
    sort: (prop: string, order: SortOrder) => void;
    clearSort: () => void;
    filter: (prop: string, values: unknown[]) => void;
    clearFilter: (props
    /**
     * YhTable - 高性能表格组件
     * 融合 vxe-table、Element Plus、Naive UI、Ant Design 各家之长
     * 支持虚拟滚动、树形数据、拖拽、固定列/行、汇总行等高级功能
     */
    ?: string | string[]) => void;
    doLayout: () => void;
    refresh: () => void;
    scrollTo: (options: {
        left
        /**
         * YhTable - 高性能表格组件
         * 融合 vxe-table、Element Plus、Naive UI、Ant Design 各家之长
         * 支持虚拟滚动、树形数据、拖拽、固定列/行、汇总行等高级功能
         */
        ?: number;
        top
        /**
         * YhTable - 高性能表格组件
         * 融合 vxe-table、Element Plus、Naive UI、Ant Design 各家之长
         * 支持虚拟滚动、树形数据、拖拽、固定列/行、汇总行等高级功能
         */
        ?: number;
        row
        /**
         * YhTable - 高性能表格组件
         * 融合 vxe-table、Element Plus、Naive UI、Ant Design 各家之长
         * 支持虚拟滚动、树形数据、拖拽、固定列/行、汇总行等高级功能
         */
        ?: Record<string, unknown>;
        rowIndex
        /**
         * YhTable - 高性能表格组件
         * 融合 vxe-table、Element Plus、Naive UI、Ant Design 各家之长
         * 支持虚拟滚动、树形数据、拖拽、固定列/行、汇总行等高级功能
         */
        ?: number;
        column
        /**
         * YhTable - 高性能表格组件
         * 融合 vxe-table、Element Plus、Naive UI、Ant Design 各家之长
         * 支持虚拟滚动、树形数据、拖拽、固定列/行、汇总行等高级功能
         */
        ?: TableColumn;
        columnIndex
        /**
         * YhTable - 高性能表格组件
         * 融合 vxe-table、Element Plus、Naive UI、Ant Design 各家之长
         * 支持虚拟滚动、树形数据、拖拽、固定列/行、汇总行等高级功能
         */
        ?: number;
    }) => void;
    getTableData: () => {
        fullData: Record<string, unknown>[];
        tableData: Record<string, unknown>[];
    };
    exportData: (config
    /**
     * YhTable - 高性能表格组件
     * 融合 vxe-table、Element Plus、Naive UI、Ant Design 各家之长
     * 支持虚拟滚动、树形数据、拖拽、固定列/行、汇总行等高级功能
     */
    ?: Record<string, unknown>) => Promise<string | void>;
    print: (config
    /**
     * YhTable - 高性能表格组件
     * 融合 vxe-table、Element Plus、Naive UI、Ant Design 各家之长
     * 支持虚拟滚动、树形数据、拖拽、固定列/行、汇总行等高级功能
     */
    ?: Record<string, unknown>) => Promise<void>;
    openImport: (config
    /**
     * YhTable - 高性能表格组件
     * 融合 vxe-table、Element Plus、Naive UI、Ant Design 各家之长
     * 支持虚拟滚动、树形数据、拖拽、固定列/行、汇总行等高级功能
     */
    ?: Record<string, unknown>) => Promise<Record<string, unknown>[]>;
    importFile: (file: File, config
    /**
     * YhTable - 高性能表格组件
     * 融合 vxe-table、Element Plus、Naive UI、Ant Design 各家之长
     * 支持虚拟滚动、树形数据、拖拽、固定列/行、汇总行等高级功能
     */
    ?: Record<string, unknown>) => Promise<Record<string, unknown>[]>;
    importData: (content: string | Record<string, unknown>[], config
    /**
     * YhTable - 高性能表格组件
     * 融合 vxe-table、Element Plus、Naive UI、Ant Design 各家之长
     * 支持虚拟滚动、树形数据、拖拽、固定列/行、汇总行等高级功能
     */
    ?: Record<string, unknown>) => Promise<Record<string, unknown>[]>;
    printMultiple: (tables: Array<{
        title
        /**
         * YhTable - 高性能表格组件
         * 融合 vxe-table、Element Plus、Naive UI、Ant Design 各家之长
         * 支持虚拟滚动、树形数据、拖拽、固定列/行、汇总行等高级功能
         */
        ?: string;
        data: Record<string, unknown>[];
        columns
        /**
         * YhTable - 高性能表格组件
         * 融合 vxe-table、Element Plus、Naive UI、Ant Design 各家之长
         * 支持虚拟滚动、树形数据、拖拽、固定列/行、汇总行等高级功能
         */
        ?: TableColumn[];
        config
        /**
         * YhTable - 高性能表格组件
         * 融合 vxe-table、Element Plus、Naive UI、Ant Design 各家之长
         * 支持虚拟滚动、树形数据、拖拽、固定列/行、汇总行等高级功能
         */
        ?: Record<string, unknown>;
    }>, config
    /**
     * YhTable - 高性能表格组件
     * 融合 vxe-table、Element Plus、Naive UI、Ant Design 各家之长
     * 支持虚拟滚动、树形数据、拖拽、固定列/行、汇总行等高级功能
     */
    ?: Record<string, unknown>) => Promise<void>;
    printTemplate: (templateHtml: string, config
    /**
     * YhTable - 高性能表格组件
     * 融合 vxe-table、Element Plus、Naive UI、Ant Design 各家之长
     * 支持虚拟滚动、树形数据、拖拽、固定列/行、汇总行等高级功能
     */
    ?: Record<string, unknown>) => Promise<void>;
    toggleFullscreen: () => void;
    getColumns: () => TableColumn[];
    setColumnVisible: (prop: string, visible: boolean) => void;
    resetColumns: () => void;
    insertRow: (row: Record<string, unknown>, index
    /**
     * YhTable - 高性能表格组件
     * 融合 vxe-table、Element Plus、Naive UI、Ant Design 各家之长
     * 支持虚拟滚动、树形数据、拖拽、固定列/行、汇总行等高级功能
     */
    ?: number) => void;
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
    "column-resize": (_column: TableColumn<Record<string, unknown>>, _width: number) => void;
    "sort-change": (_params: {
        column: TableColumn;
        prop: string;
        order: SortOrder;
    }) => void;
    "filter-change": (_filters: Record<string, unknown[]>) => void;
    "page-change": (_params: {
        currentPage: number;
        pageSize: number;
    }) => void;
    "selection-change": (_selectedRows: Record<string, unknown>[], _selectedRowKeys: (string | number)[]) => void;
    "row-click": (_row: Record<string, unknown>, _column: TableColumn<Record<string, unknown>>, _event: MouseEvent) => void;
    "row-dblclick": (_row: Record<string, unknown>, _column: TableColumn<Record<string, unknown>>, _event: MouseEvent) => void;
    "row-contextmenu": (_row: Record<string, unknown>, _column: TableColumn<Record<string, unknown>>, _event: MouseEvent) => void;
    "cell-click": (_row: Record<string, unknown>, _column: TableColumn<Record<string, unknown>>, _cell: HTMLElement, _event: MouseEvent) => void;
    "cell-dblclick": (_row: Record<string, unknown>, _column: TableColumn<Record<string, unknown>>, _cell: HTMLElement, _event: MouseEvent) => void;
    "header-click": (_column: TableColumn<Record<string, unknown>>, _event: MouseEvent) => void;
    "header-contextmenu": (_column: TableColumn<Record<string, unknown>>, _event: MouseEvent) => void;
    "column-visible-change": (_columns: TableColumn<Record<string, unknown>>[]) => void;
    "update:currentRowKey": (_key: string | number | undefined) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly data: {
        readonly type: import("vue").PropType<Record<string, unknown>[]>;
        readonly default: () => never[];
    };
    readonly columns: {
        readonly type: import("vue").PropType<TableColumn[]>;
        readonly default: () => never[];
    };
    readonly rowKey: {
        readonly type: import("vue").PropType<import("./table").RowKey>;
        readonly default: "id";
    };
    readonly size: {
        readonly type: import("vue").PropType<import("./table").TableSize>;
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
        readonly type: import("vue").PropType<import("./table").TableSortConfig>;
    };
    readonly filterConfig: {
        readonly type: import("vue").PropType<import("./table").TableFilterConfig>;
    };
    readonly pagination: {
        readonly type: import("vue").PropType<boolean | TablePaginationConfig>;
        readonly default: false;
    };
    readonly selectionConfig: {
        readonly type: import("vue").PropType<import("./table").TableSelectionConfig>;
    };
    readonly expandConfig: {
        readonly type: import("vue").PropType<import("./table").TableExpandConfig>;
    };
    readonly treeConfig: {
        readonly type: import("vue").PropType<import("./table").TableTreeConfig>;
    };
    readonly virtualConfig: {
        readonly type: import("vue").PropType<import("./table").TableVirtualConfig>;
    };
    readonly dragConfig: {
        readonly type: import("vue").PropType<import("./table").TableDragConfig>;
    };
    readonly summaryConfig: {
        readonly type: import("vue").PropType<import("./table").TableSummaryConfig>;
    };
    readonly toolbarConfig: {
        readonly type: import("vue").PropType<import("./table").TableToolbarConfig>;
    };
    readonly emptyConfig: {
        readonly type: import("vue").PropType<import("./table").TableEmptyConfig>;
    };
    readonly loading: {
        readonly type: import("vue").PropType<boolean | import("./table").TableLoadingConfig>;
        readonly default: false;
    };
    readonly rowConfig: {
        readonly type: import("vue").PropType<import("./table").TableRowConfig>;
    };
    readonly headerConfig: {
        readonly type: import("vue").PropType<import("./table").TableHeaderConfig>;
    };
    readonly contextMenuConfig: {
        readonly type: import("vue").PropType<import("./table").TableContextMenuConfig>;
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
            column: TableColumn;
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
        readonly type: import("vue").PropType<CSSProperties | ((params: {
            row: Record<string, unknown>;
            rowIndex: number;
        }) => CSSProperties)>;
    };
    readonly cellClassName: {
        readonly type: import("vue").PropType<string | ((params: {
            row: Record<string, unknown>;
            column: TableColumn;
            rowIndex: number;
            columnIndex: number;
        }) => string)>;
    };
    readonly cellStyle: {
        readonly type: import("vue").PropType<CSSProperties | ((params: {
            row: Record<string, unknown>;
            column: TableColumn;
            rowIndex: number;
            columnIndex: number;
        }) => CSSProperties)>;
    };
    readonly headerRowClassName: {
        readonly type: import("vue").PropType<string | ((params: {
            rowIndex: number;
        }) => string)>;
    };
    readonly headerRowStyle: {
        readonly type: import("vue").PropType<CSSProperties | ((params: {
            rowIndex: number;
        }) => CSSProperties)>;
    };
    readonly headerCellClassName: {
        readonly type: import("vue").PropType<string | ((params: {
            column: TableColumn;
            columnIndex: number;
        }) => string)>;
    };
    readonly headerCellStyle: {
        readonly type: import("vue").PropType<CSSProperties | ((params: {
            column: TableColumn;
            columnIndex: number;
        }) => CSSProperties)>;
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
            label
            /**
             * YhTable - 高性能表格组件
             * 融合 vxe-table、Element Plus、Naive UI、Ant Design 各家之长
             * 支持虚拟滚动、树形数据、拖拽、固定列/行、汇总行等高级功能
             */
            ?: string;
            width
            /**
             * YhTable - 高性能表格组件
             * 融合 vxe-table、Element Plus、Naive UI、Ant Design 各家之长
             * 支持虚拟滚动、树形数据、拖拽、固定列/行、汇总行等高级功能
             */
            ?: number | string;
            fixed
            /**
             * YhTable - 高性能表格组件
             * 融合 vxe-table、Element Plus、Naive UI、Ant Design 各家之长
             * 支持虚拟滚动、树形数据、拖拽、固定列/行、汇总行等高级功能
             */
            ?: import("./table").FixedPosition;
            method
            /**
             * YhTable - 高性能表格组件
             * 融合 vxe-table、Element Plus、Naive UI、Ant Design 各家之长
             * 支持虚拟滚动、树形数据、拖拽、固定列/行、汇总行等高级功能
             */
            ?: (rowIndex: number) => number | string;
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
    "onColumn-resize"?: ((_column: TableColumn<Record<string, unknown>>, _width: number) => any) | undefined;
    "onSort-change"?: ((_params: {
        column: TableColumn;
        prop: string;
        order: SortOrder;
    }) => any) | undefined;
    "onFilter-change"?: ((_filters: Record<string, unknown[]>) => any) | undefined;
    "onPage-change"?: ((_params: {
        currentPage: number;
        pageSize: number;
    }) => any) | undefined;
    "onSelection-change"?: ((_selectedRows: Record<string, unknown>[], _selectedRowKeys: (string | number)[]) => any) | undefined;
    "onRow-click"?: ((_row: Record<string, unknown>, _column: TableColumn<Record<string, unknown>>, _event: MouseEvent) => any) | undefined;
    "onRow-dblclick"?: ((_row: Record<string, unknown>, _column: TableColumn<Record<string, unknown>>, _event: MouseEvent) => any) | undefined;
    "onRow-contextmenu"?: ((_row: Record<string, unknown>, _column: TableColumn<Record<string, unknown>>, _event: MouseEvent) => any) | undefined;
    "onCell-click"?: ((_row: Record<string, unknown>, _column: TableColumn<Record<string, unknown>>, _cell: HTMLElement, _event: MouseEvent) => any) | undefined;
    "onCell-dblclick"?: ((_row: Record<string, unknown>, _column: TableColumn<Record<string, unknown>>, _cell: HTMLElement, _event: MouseEvent) => any) | undefined;
    "onHeader-click"?: ((_column: TableColumn<Record<string, unknown>>, _event: MouseEvent) => any) | undefined;
    "onHeader-contextmenu"?: ((_column: TableColumn<Record<string, unknown>>, _event: MouseEvent) => any) | undefined;
    "onColumn-visible-change"?: ((_columns: TableColumn<Record<string, unknown>>[]) => any) | undefined;
    "onUpdate:currentRowKey"?: ((_key: string | number | undefined) => any) | undefined;
}>, {
    readonly data: Record<string, unknown>[];
    readonly size: import("./table").TableSize;
    readonly pagination: boolean | TablePaginationConfig;
    readonly loading: boolean | import("./table").TableLoadingConfig;
    readonly emptyText: string;
    readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
    readonly tableLayout: "fixed" | "auto";
    readonly border: boolean | "none" | "full" | "inner" | "outer";
    readonly columns: TableColumn<Record<string, unknown>>[];
    readonly lazy: boolean;
    readonly showHeader: boolean;
    readonly resizable: boolean;
    readonly fit: boolean;
    readonly rowKey: import("./table").RowKey;
    readonly stripe: boolean;
    readonly highlightCurrentRow: boolean;
    readonly tooltipEffect: "dark" | "light";
    readonly showIndex: boolean;
    readonly autoHeight: boolean;
    readonly keepScroll: boolean;
    readonly syncScroll: boolean;
    readonly scrollOptimize: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
