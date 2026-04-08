import type { ExtractPropTypes, PropType, Component } from 'vue';
export declare const breadcrumbProps: {
    /** 分割符，默认为 / */
    readonly separator: {
        readonly type: StringConstructor;
        readonly default: "/";
    };
    /** 分割符图标，优先级高于 separator */
    readonly separatorIcon: {
        readonly type: PropType<string | Component>;
        readonly default: "";
    };
    /** 最大展示数量，超过则折叠中间项 */
    readonly maxItems: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    /** 主题覆盖变量 */
    readonly themeOverrides: {
        readonly type: PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
};
export type BreadcrumbProps = ExtractPropTypes<typeof breadcrumbProps>;
export declare const breadcrumbItemProps: {
    /** 路由跳转目标样式 */
    readonly to: {
        readonly type: PropType<string | Record<string, unknown>>;
        readonly default: "";
    };
    /** 是否替换路由 */
    readonly replace: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /** 主题覆盖变量 */
    readonly themeOverrides: {
        readonly type: PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
};
export type BreadcrumbItemProps = ExtractPropTypes<typeof breadcrumbItemProps>;
