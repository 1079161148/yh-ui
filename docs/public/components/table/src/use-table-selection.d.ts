/**
 * useTableSelection
 * @description 表格选择功能 Hook
 * 支持多选、单选、跨页保留、全选控制
 */
import { type Ref } from 'vue';
import type { TableSelectionConfig, RowKey, SelectionType } from './table';
export interface TableSelectionOptions<T = Record<string, unknown>> {
    data: Ref<T[]>;
    rowKey: RowKey;
    config: Ref<TableSelectionConfig<T> | undefined>;
}
export interface TableSelectionReturn<T = Record<string, unknown>> {
    /** 已选中的行 key 列表 */
    selectedRowKeys: Ref<Array<string | number>>;
    /** 已选中的行数据 */
    selectedRows: Ref<T[]>;
    /** 是否全选 */
    isAllSelected: Ref<boolean>;
    /** 是否半选 */
    isIndeterminate: Ref<boolean>;
    /** 选择类型 */
    selectionType: Ref<SelectionType>;
    /** 切换行选中状态 */
    toggleRowSelection: (row: T, selected?: boolean) => void;
    /** 切换全选 */
    toggleAllSelection: () => void;
    /** 清空选择 */
    clearSelection: () => void;
    /** 设置选中行 */
    setSelection: (rows: T[]) => void;
    /** 设置选中行 key */
    setSelectionByKeys: (keys: Array<string | number>) => void;
    /** 判断行是否选中 */
    isRowSelected: (row: T) => boolean;
    /** 判断行是否可选 */
    isRowSelectable: (row: T, rowIndex: number) => boolean;
    /** 获取可选行数量 */
    selectableCount: Ref<number>;
}
export declare const useTableSelection: <T extends Record<string, unknown>>(options: TableSelectionOptions<T>) => TableSelectionReturn<T>;
