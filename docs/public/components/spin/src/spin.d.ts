import type { ComputedRef, ExtractPropTypes, PropType } from 'vue';
export type LoadingSpinnerType = 'circle' | 'chaser' | 'gear' | 'dual-ring' | 'rect';
export declare const spinProps: {
    /** 是否开启加载状态 */
    readonly show: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    /** 描述文字 */
    readonly tip: StringConstructor;
    /** 尺寸: small, default, large 或自定义数字 px */
    readonly size: {
        readonly type: PropType<"small" | "default" | "large" | number>;
        readonly default: "default";
    };
    /** 是否垂直排列 */
    readonly vertical: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /** 延迟显示时间 (ms)，防闪烁 */
    readonly delay: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    /** 是否开启全屏 glass 遮罩模式 */
    readonly glass: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /** 是否使用点状动画逻辑 (灵感来自 Antd) */
    readonly dot: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /**
     * 加载样式类型
     * circle: 默认环形
     * chaser: 追逐点 (Image 0)
     * gear: 齿轮线 (Image 1)
     * dual-ring: 双环 (Image 2)
     * rect: 矩阵块 (Image 3)
     */
    readonly type: {
        readonly type: PropType<LoadingSpinnerType>;
        readonly default: "circle";
    };
    /** 自定义颜色 (支持十六进制、RGB、CSS 渐变字符串或渐变配置对象) */
    readonly color: {
        readonly type: PropType<string | string[] | Record<string, string>>;
    };
    /** 主题覆盖变量 */
    readonly themeOverrides: {
        readonly type: PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
};
export type SpinProps = ExtractPropTypes<typeof spinProps>;
export declare const spinEmits: {
    show: () => boolean;
    hide: () => boolean;
};
export type SpinEmits = typeof spinEmits;
export interface SpinSlots {
    default?: () => unknown;
    tip?: () => unknown;
}
export interface SpinExpose {
    visible: ComputedRef<boolean>;
}
