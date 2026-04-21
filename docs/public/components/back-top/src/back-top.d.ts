import type { ExtractPropTypes, PropType } from 'vue';
export declare const backTopProps: {
    /** 滚动距离达到此值时才显示，单位 px */
    readonly visibilityHeight: {
        readonly type: NumberConstructor;
        readonly default: 200;
    };
    /** 绑定的滚动容器选择器，不传则为最近的滚动父级或 window */
    readonly target: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    /** 距离右侧的距离 */
    readonly right: {
        readonly type: NumberConstructor;
        readonly default: 40;
    };
    /** 距离底部的距离 */
    readonly bottom: {
        readonly type: NumberConstructor;
        readonly default: 40;
    };
    /** 是否显示进度环 */
    readonly showProgress: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    /** 进度环颜色 */
    readonly progressColor: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    /** 持续时间，毫秒 */
    readonly duration: {
        readonly type: NumberConstructor;
        readonly default: 400;
    };
    /** 主题覆盖变量 */
    readonly themeOverrides: {
        readonly type: PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
};
export type BackTopProps = ExtractPropTypes<typeof backTopProps>;
export declare const backTopEmits: {
    click: (evt: MouseEvent) => boolean;
};
export type BackTopEmits = typeof backTopEmits;
export interface BackTopSlots {
    default?: () => unknown;
}
