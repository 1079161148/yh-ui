declare var __VLS_13: {}, __VLS_15: {}, __VLS_26: {};
type __VLS_Slots = {} & {
    'prev-icon'?: (props: typeof __VLS_13) => any;
} & {
    'next-icon'?: (props: typeof __VLS_15) => any;
} & {
    default?: (props: typeof __VLS_26) => any;
};
declare const __VLS_component: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
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
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
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
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
