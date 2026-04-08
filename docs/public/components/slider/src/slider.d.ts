import type { CSSProperties, ExtractPropTypes, PropType } from 'vue';
import type { InputNumberSize } from '../../input-number';
export type { InputNumberSize };
export type SliderValueType = number | [number, number];
export declare const sliderProps: {
    /** 绑定值 */
    modelValue: {
        type: PropType<SliderValueType>;
        default: number;
    };
    /** 最小值 */
    min: {
        type: NumberConstructor;
        default: number;
    };
    /** 最大值 */
    max: {
        type: NumberConstructor;
        default: number;
    };
    /** 步长 */
    step: {
        type: NumberConstructor;
        default: number;
    };
    /** 是否显示输入框，仅在非范围选择时有效 */
    showInput: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 在显示输入框时，是否显示控制按钮 */
    showInputControls: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 滑块的大小 */
    size: {
        type: PropType<"" | "large" | "default" | "small">;
        default: string;
    };
    /** 输入框的大小 */
    inputSize: {
        type: PropType<"" | "large" | "default" | "small">;
        default: string;
    };
    /** 是否显示间断点 */
    showStops: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 是否显示提示 */
    showTooltip: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 格式化提示文字 */
    formatTooltip: {
        type: PropType<(val: number) => string | number>;
        default: undefined;
    };
    /** 是否禁用 */
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 是否为范围选择 */
    range: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 是否垂直模式 */
    vertical: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 垂直模式下的高度 */
    height: {
        type: StringConstructor;
        default: string;
    };
    /** 屏幕阅读器标签 */
    label: {
        type: StringConstructor;
        default: undefined;
    };
    /** 输入时的去抖延迟，单位为毫秒 */
    debounce: {
        type: NumberConstructor;
        default: number;
    };
    /** 提示的自定义类名 */
    tooltipClass: {
        type: StringConstructor;
        default: undefined;
    };
    /** 提示出现的位置 */
    placement: {
        type: PropType<"top" | "top-start" | "top-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end" | "right" | "right-start" | "right-end">;
        default: string;
    };
    /** 标记， key 的类型必须为 number ，且在 [min, max] 范围内，每个标记可以是一个对象或字符串 */
    marks: {
        type: PropType<Record<number, string | {
            style?: CSSProperties;
            label: string;
        }>>;
        default: undefined;
    };
    /** 改变滑块值时是否触发表单的校验 */
    validateEvent: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 自定义范围选择时的最小值属性名，用于 aria-label */
    rangeStartLabel: {
        type: StringConstructor;
        default: undefined;
    };
    /** 自定义范围选择时的最大值属性名，用于 aria-label */
    rangeEndLabel: {
        type: StringConstructor;
        default: undefined;
    };
    /** 自定义按钮类名 */
    buttonClass: {
        type: StringConstructor;
        default: undefined;
    };
    /** 自定义主题颜色 */
    color: {
        type: StringConstructor;
        default: undefined;
    };
    /** 主题覆盖变量 */
    themeOverrides: {
        type: PropType<import("@yh-ui/theme").ComponentThemeVars>;
        default: undefined;
    };
};
export type SliderProps = ExtractPropTypes<typeof sliderProps>;
export declare const sliderEmits: {
    'update:modelValue': (_val: SliderValueType) => boolean;
    change: (_val: SliderValueType) => boolean;
    input: (_val: SliderValueType) => boolean;
};
export type SliderEmits = typeof sliderEmits;
