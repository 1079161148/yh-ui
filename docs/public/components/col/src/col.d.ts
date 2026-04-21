import type { ExtractPropTypes, PropType } from 'vue';
export interface ColResponsiveValue {
    span?: number;
    offset?: number;
    push?: number;
    pull?: number;
}
export declare const colProps: {
    readonly tag: {
        readonly type: StringConstructor;
        readonly default: "div";
    };
    readonly span: {
        readonly type: NumberConstructor;
        readonly default: 24;
    };
    readonly offset: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly push: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly pull: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly xs: {
        readonly type: PropType<number | ColResponsiveValue>;
        readonly default: () => {};
    };
    readonly sm: {
        readonly type: PropType<number | ColResponsiveValue>;
        readonly default: () => {};
    };
    readonly md: {
        readonly type: PropType<number | ColResponsiveValue>;
        readonly default: () => {};
    };
    readonly lg: {
        readonly type: PropType<number | ColResponsiveValue>;
        readonly default: () => {};
    };
    readonly xl: {
        readonly type: PropType<number | ColResponsiveValue>;
        readonly default: () => {};
    };
    /** 主题覆盖变量 */
    readonly themeOverrides: {
        readonly type: PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
};
export type ColProps = ExtractPropTypes<typeof colProps>;
export interface ColSlots {
    default?: () => unknown;
}
