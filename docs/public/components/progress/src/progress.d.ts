import type { ExtractPropTypes, PropType } from 'vue';
export declare const progressTypes: readonly ["line", "circle", "dashboard"];
export type ProgressType = (typeof progressTypes)[number];
export declare const progressStatus: readonly ["success", "exception", "warning", "info"];
export type ProgressStatus = (typeof progressStatus)[number];
export declare const progressProps: {
    /** 进度类型 */
    readonly type: {
        readonly type: PropType<ProgressType>;
        readonly default: "line";
    };
    /** 百分比（0-100），支持数组实现多环嵌套 */
    readonly percentage: {
        readonly type: PropType<number | number[]>;
        readonly default: 0;
    };
    /** 二级百分比（用于缓冲等场景） */
    readonly secondaryPercentage: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    /** 进度条状态 */
    readonly status: {
        readonly type: PropType<ProgressStatus>;
    };
    /** 进度条宽度 */
    readonly strokeWidth: {
        readonly type: NumberConstructor;
        readonly default: 6;
    };
    /** 是否文字内显 */
    readonly textInside: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /** 环形进度条画布宽度 */
    readonly width: {
        readonly type: NumberConstructor;
        readonly default: 126;
    };
    /** 是否显示进度文字/图标 */
    readonly showText: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    /** 进度条背景色（支持颜色、函数、渐变数组、或对象形式的 SVG 渐变） */
    readonly color: {
        readonly type: PropType<string | ((p: number) => string) | string[] | Record<string, string>>;
        readonly default: "";
    };
    /** 状态图标 */
    readonly icon: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    /** 环形是否开启旋转/呼吸动画 */
    readonly animated: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /** 进度条背景轨道颜色 */
    readonly defineBackgroundColor: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    /** 文字定制化 */
    readonly format: {
        readonly type: PropType<(percentage: number) => string>;
    };
    /** 进度条末端形状 */
    readonly strokeLinecap: {
        readonly type: PropType<"butt" | "round" | "square">;
        readonly default: "round";
    };
    /** 是否开启条纹 */
    readonly striped: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /** 条纹是否流动 */
    readonly stripedFlow: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /** 是否开启未确定状态 */
    readonly indeterminate: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /** 动画持续时间（s） */
    readonly duration: {
        readonly type: NumberConstructor;
        readonly default: 3;
    };
    /** 分段进度条数量 */
    readonly steps: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    /** 主题覆盖变量 */
    readonly themeOverrides: {
        readonly type: PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
};
export type ProgressProps = ExtractPropTypes<typeof progressProps>;
export interface ProgressSlots {
    default?: (props: {
        percentage: number;
    }) => unknown;
}
