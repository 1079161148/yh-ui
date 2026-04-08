import type { CategoryItem, CategorySubItem } from './category-nav';
declare var __VLS_1: {}, __VLS_3: {}, __VLS_5: {
    category: CategoryItem;
}, __VLS_7: {
    category: CategoryItem;
}, __VLS_9: {
    sub: CategorySubItem;
    parent: CategoryItem;
}, __VLS_11: {
    category: CategoryItem;
}, __VLS_13: {};
type __VLS_Slots = {} & {
    'all-icon'?: (props: typeof __VLS_1) => any;
} & {
    header?: (props: typeof __VLS_3) => any;
} & {
    'section-header'?: (props: typeof __VLS_5) => any;
} & {
    'section-header'?: (props: typeof __VLS_7) => any;
} & {
    'sub-item'?: (props: typeof __VLS_9) => any;
} & {
    'section-footer'?: (props: typeof __VLS_11) => any;
} & {
    footer?: (props: typeof __VLS_13) => any;
};
declare const __VLS_component: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    categories: {
        type: import("vue").PropType<CategoryItem[]>;
        default: () => never[];
    };
    modelValue: {
        type: import("vue").PropType<string | number | null>;
        default: null;
    };
    subValue: {
        type: import("vue").PropType<string | number | null>;
        default: null;
    };
    sideWidth: {
        type: StringConstructor;
        default: string;
    };
    showAll: {
        type: BooleanConstructor;
        default: boolean;
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    columns: {
        type: NumberConstructor;
        default: number;
    };
    subImageSize: {
        type: NumberConstructor;
        default: number;
    };
    anchor: {
        type: BooleanConstructor;
        default: boolean;
    };
    themeOverrides: {
        type: import("vue").PropType<Record<string, string>>;
        default: () => {};
    };
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (id: string | number | null) => void;
    "update:subValue": (id: string | number | null) => void;
    categoryClick: (item: CategoryItem) => void;
    subCategoryClick: (item: CategorySubItem, _parent: CategoryItem) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    categories: {
        type: import("vue").PropType<CategoryItem[]>;
        default: () => never[];
    };
    modelValue: {
        type: import("vue").PropType<string | number | null>;
        default: null;
    };
    subValue: {
        type: import("vue").PropType<string | number | null>;
        default: null;
    };
    sideWidth: {
        type: StringConstructor;
        default: string;
    };
    showAll: {
        type: BooleanConstructor;
        default: boolean;
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    columns: {
        type: NumberConstructor;
        default: number;
    };
    subImageSize: {
        type: NumberConstructor;
        default: number;
    };
    anchor: {
        type: BooleanConstructor;
        default: boolean;
    };
    themeOverrides: {
        type: import("vue").PropType<Record<string, string>>;
        default: () => {};
    };
}>> & Readonly<{
    "onUpdate:modelValue"?: ((id: string | number | null) => any) | undefined;
    "onUpdate:subValue"?: ((id: string | number | null) => any) | undefined;
    onCategoryClick?: ((item: CategoryItem) => any) | undefined;
    onSubCategoryClick?: ((item: CategorySubItem, _parent: CategoryItem) => any) | undefined;
}>, {
    anchor: boolean;
    loading: boolean;
    showAll: boolean;
    themeOverrides: Record<string, string>;
    modelValue: string | number | null;
    columns: number;
    categories: CategoryItem[];
    subValue: string | number | null;
    sideWidth: string;
    subImageSize: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
