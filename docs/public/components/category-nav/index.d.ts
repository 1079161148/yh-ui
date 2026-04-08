import CategoryNav from './src/category-nav.vue';
export declare const YhCategoryNav: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("vue").ExtractPropTypes<{
        categories: {
            type: import("vue").PropType<import("./index.js").CategoryItem[]>;
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
        onCategoryClick?: ((item: import("./index.js").CategoryItem) => any) | undefined;
        onSubCategoryClick?: ((item: import("./index.js").CategorySubItem, _parent: import("./index.js").CategoryItem) => any) | undefined;
    }>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        "update:modelValue": (id: string | number | null) => void;
        "update:subValue": (id: string | number | null) => void;
        categoryClick: (item: import("./index.js").CategoryItem) => void;
        subCategoryClick: (item: import("./index.js").CategorySubItem, _parent: import("./index.js").CategoryItem) => void;
    }, import("vue").PublicProps, {
        anchor: boolean;
        loading: boolean;
        showAll: boolean;
        themeOverrides: Record<string, string>;
        modelValue: string | number | null;
        columns: number;
        categories: import("./index.js").CategoryItem[];
        subValue: string | number | null;
        sideWidth: string;
        subImageSize: number;
    }, true, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
        categories: {
            type: import("vue").PropType<import("./index.js").CategoryItem[]>;
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
        onCategoryClick?: ((item: import("./index.js").CategoryItem) => any) | undefined;
        onSubCategoryClick?: ((item: import("./index.js").CategorySubItem, _parent: import("./index.js").CategoryItem) => any) | undefined;
    }>, {}, {}, {}, {}, {
        anchor: boolean;
        loading: boolean;
        showAll: boolean;
        themeOverrides: Record<string, string>;
        modelValue: string | number | null;
        columns: number;
        categories: import("./index.js").CategoryItem[];
        subValue: string | number | null;
        sideWidth: string;
        subImageSize: number;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
    categories: {
        type: import("vue").PropType<import("./index.js").CategoryItem[]>;
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
    onCategoryClick?: ((item: import("./index.js").CategoryItem) => any) | undefined;
    onSubCategoryClick?: ((item: import("./index.js").CategorySubItem, _parent: import("./index.js").CategoryItem) => any) | undefined;
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (id: string | number | null) => void;
    "update:subValue": (id: string | number | null) => void;
    categoryClick: (item: import("./index.js").CategoryItem) => void;
    subCategoryClick: (item: import("./index.js").CategorySubItem, _parent: import("./index.js").CategoryItem) => void;
}, string, {
    anchor: boolean;
    loading: boolean;
    showAll: boolean;
    themeOverrides: Record<string, string>;
    modelValue: string | number | null;
    columns: number;
    categories: import("./index.js").CategoryItem[];
    subValue: string | number | null;
    sideWidth: string;
    subImageSize: number;
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        'all-icon'?: (props: {}) => any;
    } & {
        header?: (props: {}) => any;
    } & {
        'section-header'?: (props: {
            category: import("./index.js").CategoryItem;
        }) => any;
    } & {
        'section-header'?: (props: {
            category: import("./index.js").CategoryItem;
        }) => any;
    } & {
        'sub-item'?: (props: {
            sub: import("./index.js").CategorySubItem;
            parent: import("./index.js").CategoryItem;
        }) => any;
    } & {
        'section-footer'?: (props: {
            category: import("./index.js").CategoryItem;
        }) => any;
    } & {
        footer?: (props: {}) => any;
    };
})> & Record<string, unknown>;
export default YhCategoryNav;
export * from './src/category-nav';
export type CategoryNavInstance = InstanceType<typeof CategoryNav>;
export type YhCategoryNavInstance = CategoryNavInstance;
export type YhCategoryNavProps = import('./src/category-nav').CategoryNavProps;
