/**
 * Pagination Component
 * @description 分页组件导出
 */
import Pagination from './src/pagination.vue';
export declare const YhPagination: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("vue").ExtractPropTypes<{
        readonly currentPage: {
            readonly type: NumberConstructor;
            readonly default: 1;
        };
        readonly total: {
            readonly type: NumberConstructor;
            readonly default: 0;
        };
        readonly pageSize: {
            readonly type: NumberConstructor;
            readonly default: 10;
        };
        readonly pageSizes: {
            readonly type: import("vue").PropType<number[]>;
            readonly default: () => number[];
        };
        readonly layout: {
            readonly type: StringConstructor;
            readonly default: "prev, pager, next";
        };
        readonly pagerCount: {
            readonly type: NumberConstructor;
            readonly default: 7;
        };
        readonly background: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly small: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly disabled: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly hideOnSinglePage: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly circle: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly prevText: StringConstructor;
        readonly nextText: StringConstructor;
        readonly themeOverrides: {
            readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
            readonly default: undefined;
        };
    }>> & Readonly<{
        "onUpdate:currentPage"?: ((val: number) => any) | undefined;
        "onUpdate:pageSize"?: ((val: number) => any) | undefined;
        "onCurrent-change"?: ((val: number) => any) | undefined;
        "onSize-change"?: ((val: number) => any) | undefined;
        "onPrev-click"?: ((val: number) => any) | undefined;
        "onNext-click"?: ((val: number) => any) | undefined;
    }>, {
        currentPage: number;
        pageSize: number;
        pageCount: number;
    }, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
        "update:currentPage": (val: number) => any;
        "update:pageSize": (val: number) => any;
        "current-change": (val: number) => any;
        "size-change": (val: number) => any;
        "prev-click": (val: number) => any;
        "next-click": (val: number) => any;
    }, import("vue").PublicProps, {
        readonly small: boolean;
        readonly total: number;
        readonly pageSize: number;
        readonly disabled: boolean;
        readonly circle: boolean;
        readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
        readonly background: boolean;
        readonly layout: string;
        readonly currentPage: number;
        readonly pageSizes: number[];
        readonly pagerCount: number;
        readonly hideOnSinglePage: boolean;
    }, true, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
        readonly currentPage: {
            readonly type: NumberConstructor;
            readonly default: 1;
        };
        readonly total: {
            readonly type: NumberConstructor;
            readonly default: 0;
        };
        readonly pageSize: {
            readonly type: NumberConstructor;
            readonly default: 10;
        };
        readonly pageSizes: {
            readonly type: import("vue").PropType<number[]>;
            readonly default: () => number[];
        };
        readonly layout: {
            readonly type: StringConstructor;
            readonly default: "prev, pager, next";
        };
        readonly pagerCount: {
            readonly type: NumberConstructor;
            readonly default: 7;
        };
        readonly background: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly small: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly disabled: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly hideOnSinglePage: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly circle: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly prevText: StringConstructor;
        readonly nextText: StringConstructor;
        readonly themeOverrides: {
            readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
            readonly default: undefined;
        };
    }>> & Readonly<{
        "onUpdate:currentPage"?: ((val: number) => any) | undefined;
        "onUpdate:pageSize"?: ((val: number) => any) | undefined;
        "onCurrent-change"?: ((val: number) => any) | undefined;
        "onSize-change"?: ((val: number) => any) | undefined;
        "onPrev-click"?: ((val: number) => any) | undefined;
        "onNext-click"?: ((val: number) => any) | undefined;
    }>, {
        currentPage: number;
        pageSize: number;
        pageCount: number;
    }, {}, {}, {}, {
        readonly small: boolean;
        readonly total: number;
        readonly pageSize: number;
        readonly disabled: boolean;
        readonly circle: boolean;
        readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
        readonly background: boolean;
        readonly layout: string;
        readonly currentPage: number;
        readonly pageSizes: number[];
        readonly pagerCount: number;
        readonly hideOnSinglePage: boolean;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
    readonly currentPage: {
        readonly type: NumberConstructor;
        readonly default: 1;
    };
    readonly total: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly pageSize: {
        readonly type: NumberConstructor;
        readonly default: 10;
    };
    readonly pageSizes: {
        readonly type: import("vue").PropType<number[]>;
        readonly default: () => number[];
    };
    readonly layout: {
        readonly type: StringConstructor;
        readonly default: "prev, pager, next";
    };
    readonly pagerCount: {
        readonly type: NumberConstructor;
        readonly default: 7;
    };
    readonly background: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly small: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly disabled: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly hideOnSinglePage: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly circle: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly prevText: StringConstructor;
    readonly nextText: StringConstructor;
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>> & Readonly<{
    "onUpdate:currentPage"?: ((val: number) => any) | undefined;
    "onUpdate:pageSize"?: ((val: number) => any) | undefined;
    "onCurrent-change"?: ((val: number) => any) | undefined;
    "onSize-change"?: ((val: number) => any) | undefined;
    "onPrev-click"?: ((val: number) => any) | undefined;
    "onNext-click"?: ((val: number) => any) | undefined;
}>, {
    currentPage: number;
    pageSize: number;
    pageCount: number;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    "update:currentPage": (val: number) => any;
    "update:pageSize": (val: number) => any;
    "current-change": (val: number) => any;
    "size-change": (val: number) => any;
    "prev-click": (val: number) => any;
    "next-click": (val: number) => any;
}, string, {
    readonly small: boolean;
    readonly total: number;
    readonly pageSize: number;
    readonly disabled: boolean;
    readonly circle: boolean;
    readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
    readonly background: boolean;
    readonly layout: string;
    readonly currentPage: number;
    readonly pageSizes: number[];
    readonly pagerCount: number;
    readonly hideOnSinglePage: boolean;
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        'prev-icon'?: (props: {}) => any;
    } & {
        'next-icon'?: (props: {}) => any;
    } & {
        default?: (props: {}) => any;
    };
})> & Record<string, unknown>;
export default YhPagination;
export * from './src/pagination';
export type PaginationInstance = InstanceType<typeof Pagination>;
