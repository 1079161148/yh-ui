import type { ExtractPropTypes, PropType, InjectionKey, Ref, StyleValue } from 'vue';
export interface ScrollbarContext {
    wrapElement: Ref<HTMLDivElement | undefined>;
}
export declare const SCROLLBAR_INJECTION_KEY: InjectionKey<ScrollbarContext>;
export declare const scrollbarProps: {
    /**
     * @description 滚动条高度
     */
    readonly height: {
        readonly type: PropType<string | number>;
        readonly default: "";
    };
    /**
     * @description 滚动条最大高度
     */
    readonly maxHeight: {
        readonly type: PropType<string | number>;
        readonly default: "";
    };
    /**
     * @description 是否使用原生滚动条
     */
    readonly native: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /**
     * @description 滚动条是否总是显示
     */
    readonly always: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /**
     * @description 滚动块的最小尺寸
     */
    readonly minSize: {
        readonly type: NumberConstructor;
        readonly default: 20;
    };
    /**
     * @description 视图的自定义类名
     */
    readonly viewClass: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    /**
     * @description 视图的自定义样式
     */
    readonly viewStyle: {
        readonly type: PropType<StyleValue>;
        readonly default: "";
    };
    /**
     * @description 是否不检查容器尺寸变化
     */
    readonly noresize: BooleanConstructor;
    /**
     * @description 标签定义
     */
    readonly tag: {
        readonly type: StringConstructor;
        readonly default: "div";
    };
    /**
     * @description 主题覆盖变量
     */
    readonly themeOverrides: {
        readonly type: PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
};
export type ScrollbarProps = ExtractPropTypes<typeof scrollbarProps>;
export declare const scrollbarEmits: {
    scroll: ({ scrollLeft, scrollTop }: {
        scrollLeft: number;
        scrollTop: number;
    }) => boolean;
};
export type ScrollbarEmits = typeof scrollbarEmits;
