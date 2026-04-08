import type { TimeState, DisabledTimeConfig } from './time-picker';
type __VLS_Props = {
    /** 当前时间状态 */
    modelValue: TimeState;
    /** 是否显示秒 */
    showSeconds?: boolean;
    /** 是否使用箭头控制 */
    arrowControl?: boolean;
    /** 小时步长 */
    hourStep?: number;
    /** 分钟步长 */
    minuteStep?: number;
    /** 秒步长 */
    secondStep?: number;
    /** 禁用时间配置 */
    disabledTime?: DisabledTimeConfig;
    /** 是否使用 12 小时制 */
    use12Hours?: boolean;
    /** 自定义小时选项 */
    hourOptions?: number[];
    /** 自定义分钟选项 */
    minuteOptions?: number[];
    /** 自定义秒选项 */
    secondOptions?: number[];
};
declare const _default: import("vue").DefineComponent<__VLS_Props, {
    scrollToCurrentValues: (smooth?: boolean) => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    change: (value: TimeState) => any;
    "update:modelValue": (value: TimeState) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onChange?: ((value: TimeState) => any) | undefined;
    "onUpdate:modelValue"?: ((value: TimeState) => any) | undefined;
}>, {
    showSeconds: boolean;
    arrowControl: boolean;
    hourStep: number;
    minuteStep: number;
    secondStep: number;
    disabledTime: DisabledTimeConfig;
    use12Hours: boolean;
    hourOptions: number[];
    minuteOptions: number[];
    secondOptions: number[];
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
