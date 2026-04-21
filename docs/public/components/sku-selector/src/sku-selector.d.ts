import type { ExtractPropTypes, PropType } from 'vue';
export interface SkuSpecValue {
    id: string | number;
    name: string;
    image?: string;
    disabled?: boolean;
    color?: string;
    tag?: string;
    [key: string]: unknown;
}
export interface SkuSpec {
    id: string | number;
    name: string;
    values: SkuSpecValue[];
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
    specs: {
        type: PropType<SkuSpec[]>;
        default: () => never[];
    };
    skus: {
        type: PropType<SkuItem[]>;
        default: () => never[];
    };
    modelValue: {
        type: PropType<Array<string | number>>;
        default: () => never[];
    };
    checkStock: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    allowUnselect: {
        type: BooleanConstructor;
        default: boolean;
    };
    size: {
        type: PropType<"small" | "default" | "large">;
        default: string;
    };
    imageSize: {
        type: NumberConstructor;
        default: number;
    };
    showSelectedSummary: {
        type: BooleanConstructor;
        default: boolean;
    };
    summaryPrefix: {
        type: StringConstructor;
        default: string;
    };
    themeOverrides: {
        type: PropType<Record<string, string>>;
        default: () => {};
    };
};
export type SkuSelectorProps = ExtractPropTypes<typeof skuSelectorProps>;
export declare const skuSelectorEmits: {
    'update:modelValue': (value: Array<string | number>) => boolean;
    change: (_sku: SkuItem | null, _selectedValues: Array<string | number>) => boolean;
    select: (_spec: SkuSpec, _value: SkuSpecValue) => boolean;
};
export type SkuSelectorEmits = typeof skuSelectorEmits;
export interface SkuSelectorSlots {
    summary?: (props: {
        summary: string;
        sku: SkuItem | null;
    }) => unknown;
    label?: (props: {
        spec: SkuSpec;
    }) => unknown;
    value?: (props: {
        value: SkuSpecValue;
        spec: SkuSpec;
        active: boolean;
        disabled: boolean;
    }) => unknown;
}
