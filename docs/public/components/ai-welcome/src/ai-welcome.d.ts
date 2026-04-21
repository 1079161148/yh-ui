import type { ExtractPropTypes, PropType } from 'vue';
export interface AiSuggestion {
    icon?: string;
    title: string;
    description?: string;
    prompt?: string;
}
export declare const aiWelcomeProps: {
    /**
     * 标题文本
     */
    readonly title: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    /**
     * 描述文本
     */
    readonly description: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    /**
     * 建议项列表
     */
    readonly suggestions: {
        readonly type: PropType<AiSuggestion[]>;
        readonly default: () => never[];
    };
    /**
     * 是否展示图标/Logo
     */
    readonly showIcon: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    /**
     * 自定义图标名称
     */
    readonly icon: {
        readonly type: StringConstructor;
        readonly default: "sparkles";
    };
    /**
     * 主题覆盖变量
     */
    readonly themeOverrides: {
        readonly type: PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
};
export type AiWelcomeProps = ExtractPropTypes<typeof aiWelcomeProps>;
export declare const aiWelcomeEmits: {
    /**
     * 点击建议项时触发
     */
    select: (suggestion: AiSuggestion) => boolean;
};
export type AiWelcomeEmits = typeof aiWelcomeEmits;
export interface AiWelcomeSlots {
    icon?: () => unknown;
    title?: () => unknown;
    description?: () => unknown;
    default?: () => unknown;
}
