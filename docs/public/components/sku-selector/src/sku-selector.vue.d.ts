import type { SkuSpec, SkuSpecValue } from './sku-selector';
declare var __VLS_1: {
    summary: string;
    sku: import("@yh-ui/hooks").SkuItem | null;
}, __VLS_3: {
    spec: SkuSpec;
}, __VLS_5: {
    value: SkuSpecValue;
    spec: SkuSpec;
    active: boolean;
    disabled: boolean;
};
type __VLS_Slots = {} & {
    summary?: (props: typeof __VLS_1) => any;
} & {
    label?: (props: typeof __VLS_3) => any;
} & {
    value?: (props: typeof __VLS_5) => any;
};
declare const __VLS_component: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    specs: {
        type: import("vue").PropType<SkuSpec[]>;
        default: () => never[];
    };
    skus: {
        type: import("vue").PropType<import("./sku-selector").SkuItem[]>;
        default: () => never[];
    };
    modelValue: {
        type: import("vue").PropType<Array<string | number>>;
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
        type: import("vue").PropType<"small" | "default" | "large">;
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
        type: import("vue").PropType<Record<string, string>>;
        default: () => {};
    };
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    select: (_spec: SkuSpec, _value: SkuSpecValue) => void;
    change: (_sku: import("./sku-selector").SkuItem | null, _selectedValues: (string | number)[]) => void;
    "update:modelValue": (value: (string | number)[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    specs: {
        type: import("vue").PropType<SkuSpec[]>;
        default: () => never[];
    };
    skus: {
        type: import("vue").PropType<import("./sku-selector").SkuItem[]>;
        default: () => never[];
    };
    modelValue: {
        type: import("vue").PropType<Array<string | number>>;
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
        type: import("vue").PropType<"small" | "default" | "large">;
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
        type: import("vue").PropType<Record<string, string>>;
        default: () => {};
    };
}>> & Readonly<{
    onSelect?: ((_spec: SkuSpec, _value: SkuSpecValue) => any) | undefined;
    onChange?: ((_sku: import("./sku-selector").SkuItem | null, _selectedValues: (string | number)[]) => any) | undefined;
    "onUpdate:modelValue"?: ((value: (string | number)[]) => any) | undefined;
}>, {
    size: "large" | "default" | "small";
    disabled: boolean;
    themeOverrides: Record<string, string>;
    modelValue: (string | number)[];
    imageSize: number;
    specs: SkuSpec[];
    skus: import("./sku-selector").SkuItem[];
    checkStock: boolean;
    allowUnselect: boolean;
    showSelectedSummary: boolean;
    summaryPrefix: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
