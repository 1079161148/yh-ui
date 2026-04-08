import type { ExtractPropTypes, PropType } from 'vue';
import type { StepsStatus } from './steps';
export declare const stepProps: {
    /** 标题 */
    readonly title: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    /** 描述 */
    readonly description: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    /** 图标类名或自定义 */
    readonly icon: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    /** 设置当前步骤的状态，会覆盖 Steps 中的状态 */
    readonly status: {
        readonly type: PropType<StepsStatus>;
        readonly default: "";
    };
    /** 是否禁用该步骤 */
    readonly disabled: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /** 时间信息（用于时间线模式） */
    readonly time: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    /** 进度百分比（0-100，用于进度条模式） */
    readonly progress: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    /** 是否延迟渲染内容 */
    readonly lazy: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /** 主题覆盖变量 */
    readonly themeOverrides: {
        readonly type: PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
};
export type StepProps = ExtractPropTypes<typeof stepProps>;
