import type { ExtractPropTypes, PropType } from 'vue';
export type ActionItem = string | {
    key: string;
    icon?: string;
    label?: string;
    disabled?: boolean;
    tooltip?: string;
    [key: string]: unknown;
};
export declare const aiActionGroupProps: {
    /**
     * 操作项列表
     * 可以传简单的 string 如 ['copy', 'refresh', 'thumb-up']
     */
    readonly items: {
        readonly type: PropType<ActionItem[]>;
        readonly default: () => never[];
    };
    /**
     * 尺寸: small | default | large
     */
    readonly size: {
        readonly type: PropType<"small" | "default" | "large">;
        readonly default: "small";
    };
    /**
     * 视觉变体: text | ghost | outlined
     */
    readonly variant: {
        readonly type: PropType<"text" | "ghost" | "outlined">;
        readonly default: "text";
    };
    /**
     * 布局: horizontal | vertical
     */
    readonly direction: {
        readonly type: PropType<"horizontal" | "vertical">;
        readonly default: "horizontal";
    };
    /**
     * 主题覆盖变量
     */
    readonly themeOverrides: {
        readonly type: PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
};
export type AiActionGroupProps = ExtractPropTypes<typeof aiActionGroupProps>;
export declare const aiActionGroupEmits: {
    /**
     * 点击操作项时触发
     */
    click: (key: string, _item: ActionItem) => boolean;
};
export type AiActionGroupEmits = typeof aiActionGroupEmits;
