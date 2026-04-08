import type { ExtractPropTypes, PropType, CSSProperties } from 'vue';
export type AffixPosition = 'top' | 'bottom';
export declare const affixProps: {
    /** 距离窗口顶部/底部达到指定偏移量后触发固定 */
    readonly offset: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    /** 固定位置 */
    readonly position: {
        readonly type: PropType<AffixPosition>;
        readonly default: "top";
    };
    /** 指定容器选择器（默认为 window） */
    readonly target: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    /** 固定时层级 */
    readonly zIndex: {
        readonly type: NumberConstructor;
        readonly default: 100;
    };
    /** 是否将固定元素 Teleport 到 body，解决父级 transform 导致的定位失效问题 */
    readonly teleported: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /** Affix 元素将被挂载至哪个元素 */
    readonly appendTo: {
        readonly type: PropType<string | HTMLElement>;
        readonly default: "body";
    };
    /** 自定义固定状态样式 */
    readonly affixStyle: {
        readonly type: PropType<CSSProperties>;
        readonly default: () => {};
    };
    /** 是否禁用固钉 */
    readonly disabled: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /** 主题覆盖变量 */
    readonly themeOverrides: {
        readonly type: PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
};
export declare const affixEmits: {
    /** 固定状态改变时触发 */
    change: (fixed: boolean) => boolean;
    /** 滚动时触发 */
    scroll: (payload: {
        scrollTop: number;
        fixed: boolean;
    }) => boolean;
};
export type AffixProps = ExtractPropTypes<typeof affixProps>;
export type AffixEmits = typeof affixEmits;
