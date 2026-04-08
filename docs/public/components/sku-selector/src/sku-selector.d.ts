import type { ExtractPropTypes, PropType } from 'vue';
export interface SkuSpecValue {
    id: string | number;
    name: string;
    image?: string;
    disabled?: boolean;
    /** 自定义颜色（色块模式）*/
    color?: string;
    /** 附加标签，如 "热卖"、"新品" */
    tag?: string;
    /** 扩展自定义字段 */
    [key: string]: unknown;
}
export interface SkuSpec {
    id: string | number;
    name: string;
    values: SkuSpecValue[];
    /** 规格展示模式：text=文字(默认) | image=图片 | color=色块 */
    mode?: 'text' | 'image' | 'color';
}
export interface SkuItem {
    id: string | number;
    specValueIds: Array<string | number>;
    price: number;
    stock: number;
    marketPrice?: number;
    image?: string;
    skuNo?: string;
    [key: string]: unknown;
}
export declare const skuSelectorProps: {
    /** 规格列表 */
    specs: {
        type: PropType<SkuSpec[]>;
        default: () => never[];
    };
    /** SKU 列表 */
    skus: {
        type: PropType<SkuItem[]>;
        default: () => never[];
    };
    /** 当前选中的规格值 ID 列表（支持 v-model） */
    modelValue: {
        type: PropType<Array<string | number>>;
        default: () => never[];
    };
    /** 是否开启库存检查，库存为 0 的组合将自动置灰 */
    checkStock: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 整体是否禁用 */
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 是否允许点击已选中项来取消选中 */
    allowUnselect: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 规格选项的尺寸 */
    size: {
        type: PropType<"small" | "default" | "large">;
        default: string;
    };
    /** 图片规格的图片高度（px） */
    imageSize: {
        type: NumberConstructor;
        default: number;
    };
    /** 是否显示已选规格的汇总文本，如 "已选：红色/L" */
    showSelectedSummary: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 汇总文本前缀 */
    summaryPrefix: {
        type: StringConstructor;
        default: string;
    };
    /** 主题变量覆盖 */
    themeOverrides: {
        type: PropType<Record<string, string>>;
        default: () => {};
    };
};
export type SkuSelectorProps = ExtractPropTypes<typeof skuSelectorProps>;
export declare const skuSelectorEmits: {
    'update:modelValue': (value: Array<string | number>) => boolean;
    /** 每次选中结果变化时触发，sku 为 null 表示未完整选中 */
    change: (_sku: SkuItem | null, _selectedValues: Array<string | number>) => boolean;
    /** 点击某个规格值时触发（无论是否可选） */
    select: (_spec: SkuSpec, _value: SkuSpecValue) => boolean;
};
export type SkuSelectorEmits = typeof skuSelectorEmits;
