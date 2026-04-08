type __VLS_Props = {
    /** 列唯一标识 */
    columnKey?: string;
    /** 列字段名 */
    prop?: string;
    /** 列标题 */
    label?: string;
    /** 列宽 */
    width?: number | string;
    /** 最小列宽 */
    minWidth?: number | string;
    /** 最大列宽 */
    maxWidth?: number | string;
    /** 内容对齐方式 */
    align?: 'left' | 'center' | 'right';
    /** 表头对齐方式 */
    headerAlign?: 'left' | 'center' | 'right';
    /** 固定列 */
    fixed?: 'left' | 'right' | boolean;
    /** 是否可排序 */
    sortable?: boolean | 'custom';
    /** 是否可筛选 */
    filterable?: boolean;
    /** 筛选选项 */
    filters?: Array<{
        text: string;
        value: unknown;
    }>;
    /** 是否支持多选筛选 */
    filterMultiple?: boolean;
    /** 是否可调整列宽 */
    resizable?: boolean;
    /** 是否显示溢出提示 */
    showOverflowTooltip?: boolean;
    /** 列类名 */
    className?: string;
    /** 表头类名 */
    headerClassName?: string;
    /** 列类型 */
    type?: 'selection' | 'index' | 'expand' | 'radio';
    /** 是否可见 */
    visible?: boolean;
    /** 是否为树形展开列 */
    treeNode?: boolean;
};
declare const _default: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
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
export default _default;
