import type { ExtractPropTypes, PropType } from 'vue';
export type AiThinkingStatus = 'start' | 'thinking' | 'end' | 'error';
export declare const aiThinkingProps: {
    /**
     * @description 思考状态
     */
    readonly status: {
        readonly type: PropType<AiThinkingStatus>;
        readonly default: "thinking";
    };
    /**
     * @description 思考标题
     */
    readonly title: StringConstructor;
    /**
     * @description 思考详情内容
     */
    readonly content: StringConstructor;
    /**
     * @description 是否展开详情 (v-model)
     */
    readonly modelValue: BooleanConstructor;
    /**
     * @description 完成后是否自动收起
     */
    readonly autoCollapse: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    /**
     * @description 样式类名
     */
    readonly className: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    /**
     * @description 样式类名（语义化）
     */
    readonly classNames: {
        readonly type: PropType<Record<string, string>>;
        readonly default: () => {};
    };
    /**
     * @description 样式对象
     */
    readonly styles: {
        readonly type: PropType<Record<string, string>>;
        readonly default: () => {};
    };
    /**
     * @description 自定义样式
     */
    readonly style: {
        readonly type: PropType<Record<string, string>>;
        readonly default: () => {};
    };
    /**
     * @description 主题覆盖变量
     */
    readonly themeOverrides: {
        readonly type: PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
};
export type AiThinkingProps = ExtractPropTypes<typeof aiThinkingProps>;
export declare const aiThinkingEmits: {
    'update:modelValue': (value: boolean) => boolean;
};
export type AiThinkingEmits = typeof aiThinkingEmits;
export interface AiThinkingSlots {
    default?: () => unknown;
}
