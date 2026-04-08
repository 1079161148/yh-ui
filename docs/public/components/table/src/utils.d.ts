/**
 * Table Utils
 * @description 表格工具函数
 */
import type { TableColumn, RowKey, SortOrder } from './table';
/**
 * 获取行唯一标识
 */
export declare const getRowKey: (row: Record<string, unknown>, rowKey: RowKey) => string | number;
/**
 * 获取列唯一标识
 */
export declare const getColumnKey: (column: TableColumn) => string;
/**
 * 展平嵌套列
 */
export declare const flattenColumns: (columns: TableColumn[]) => TableColumn[];
/**
 * 获取列层级深度
 */
export declare const getColumnDepth: (columns: TableColumn[]) => number;
/**
 * 表头单元格信息
 */
export interface HeaderCell {
    column: TableColumn;
    colspan: number;
    rowspan: number;
}
/**
 * 构建多级表头行数据
 * 将嵌套的 columns 结构转换为 HeaderCell[][] 二维数组（每行对应 <tr>）
 */
export declare const buildHeaderRows: (columns: TableColumn[]) => HeaderCell[][];
/**
 * 计算列宽度
 */
export declare const calculateColumnWidth: (column: TableColumn, containerWidth: number, columns: TableColumn[]) => number;
/**
 * 默认排序比较方法
 */
export declare const defaultSortMethod: <T>(a: T, b: T, prop: string, order: SortOrder) => number;
/**
 * 多列排序
 */
export declare const multiColumnSort: <T extends Record<string, unknown>>(data: T[], sortStates: Array<{
    prop: string;
    order: SortOrder;
    sortMethod?: (a: T, b: T, order: SortOrder) => number;
}>) => T[];
/**
 * 默认筛选方法
 */
export declare const defaultFilterMethod: <T>(value: unknown, row: T, column: TableColumn<T>) => boolean;
/**
 * 多值筛选
 */
export declare const multiValueFilter: <T extends Record<string, unknown>>(data: T[], filters: Record<string, unknown[]>, columns: TableColumn<T>[], filterMultiple?: boolean) => T[];
/**
 * 树形数据展平
 */
export declare const flattenTreeData: <T extends Record<string, unknown>>(data: T[], childrenKey: string | undefined, expandedKeys: Set<string | number>, rowKey: RowKey, level?: number) => Array<T & {
    _level: number;
    _isExpanded: boolean;
    _hasChildren: boolean;
    _isLeaf: boolean;
}>;
/**
 * 获取所有树节点 key
 */
export declare const getAllTreeKeys: <T extends Record<string, unknown>>(data: T[], childrenKey: string | undefined, rowKey: RowKey) => Array<string | number>;
/**
 * 格式化尺寸值
 */
export declare const formatSize: (value: string | number | undefined) => string;
/**
 * 合并单元格计算
 */
export declare const calculateSpan: (row: Record<string, unknown>, column: TableColumn, rowIndex: number, columnIndex: number, spanMethod?: (params: {
    row: Record<string, unknown>;
    column: TableColumn;
    rowIndex: number;
    columnIndex: number;
}) => {
    rowspan: number;
    colspan: number;
} | [number, number] | void) => {
    rowspan: number;
    colspan: number;
};
/**
 * 节流函数
 */
export declare const throttle: <T extends (...args: Parameters<T>) => void>(fn: T, delay: number) => ((...args: Parameters<T>) => void);
/**
 * 防抖函数
 */
export declare const debounce: <T extends (...args: Parameters<T>) => void>(fn: T, delay: number) => ((...args: Parameters<T>) => void);
/**
 * 深拷贝
 */
export declare const deepClone: <T>(obj: T) => T;
/**
 * 检查是否为空值
 */
export declare const isEmpty: (value: unknown) => boolean;
/**
 * 生成唯一 ID
 */
export declare const generateId: () => string;
/**
 * 格式化单元格内容
 */
export declare const formatCellValue: <T extends Record<string, unknown>>(row: T, column: TableColumn<T>, rowIndex: number) => string;
/**
 * 计算固定列样式
 */
export declare const getFixedStyle: (column: TableColumn, columns: TableColumn[], direction: "left" | "right") => {
    left?: string;
    right?: string;
};
/**
 * 导出为 CSV
 */
export declare const exportToCSV: (data: Record<string, unknown>[], columns: TableColumn[], filename?: string) => void;
