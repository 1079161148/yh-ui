import type { ExtractPropTypes, PropType, InjectionKey, Ref } from 'vue';
export declare const stepsDirections: readonly ["horizontal", "vertical"];
export type StepsDirection = (typeof stepsDirections)[number];
export declare const stepsStatus: readonly ["wait", "process", "finish", "error", "success"];
export type StepsStatus = (typeof stepsStatus)[number];
export declare const stepsProgressDot: readonly ["default", "dot", "navigation"];
export type StepsProgressDot = (typeof stepsProgressDot)[number];
export declare const stepsSizes: readonly ["default", "small"];
export type StepsSize = (typeof stepsSizes)[number];
export declare const stepsLabelPlacements: readonly ["horizontal", "vertical"];
export type StepsLabelPlacement = (typeof stepsLabelPlacements)[number];
export interface StepConfig {
    uid: number;
    title: string;
    description: string;
    icon: string;
    status: StepsStatus;
    disabled: boolean;
    time: string;
    progress: number;
}
export declare const stepsProps: {
    /** 当前激活步骤 */
    readonly active: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    /** 布局方向 */
    readonly direction: {
        readonly type: PropType<StepsDirection>;
        readonly default: "horizontal";
    };
    /** 居中显示 */
    readonly alignCenter: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /** 简洁风格 */
    readonly simple: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /** 点状进度 */
    readonly progressDot: {
        readonly type: PropType<boolean | StepsProgressDot>;
        readonly default: false;
    };
    /** 设置结束步骤的状态 */
    readonly finishStatus: {
        readonly type: PropType<StepsStatus>;
        readonly default: "finish";
    };
    /** 设置当前步骤的状态 */
    readonly processStatus: {
        readonly type: PropType<StepsStatus>;
        readonly default: "process";
    };
    /** 每个 step 的间距 */
    readonly space: {
        readonly type: PropType<number | string>;
        readonly default: "";
    };
    /** 可点击切换步骤 */
    readonly clickable: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /** 尺寸 */
    readonly size: {
        readonly type: PropType<StepsSize>;
        readonly default: "default";
    };
    /** 响应式布局 - 小屏幕自动切换为垂直 */
    readonly responsive: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /** 响应式断点（px） */
    readonly responsiveBreakpoint: {
        readonly type: NumberConstructor;
        readonly default: 768;
    };
    /** 描述标签位置 */
    readonly labelPlacement: {
        readonly type: PropType<StepsLabelPlacement>;
        readonly default: "horizontal";
    };
    /** 显示进度条连接线 */
    readonly showProgress: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /** 显示时间线 */
    readonly showTimeline: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /** 主题覆盖变量 */
    readonly themeOverrides: {
        readonly type: PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
};
export type StepsProps = ExtractPropTypes<typeof stepsProps>;
export declare const stepsEmits: {
    change: (index: number) => boolean;
};
export type StepsEmits = typeof stepsEmits;
export interface StepsSlots {
    default?: () => unknown;
}
export interface StepsContext {
    props: StepsProps;
    steps: Ref<StepConfig[]>;
    isResponsiveVertical: Ref<boolean>;
    registerStep: (step: StepConfig) => void;
    unregisterStep: (uid: number) => void;
    handleStepClick: (index: number, disabled: boolean) => void;
}
export declare const STEPS_INJECTION_KEY: InjectionKey<StepsContext>;
