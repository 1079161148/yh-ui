/**
 * InputNumber Component
 * @description 数字输入框组件导出
 */
import InputNumber from './src/input-number.vue';
export declare const YhInputNumber: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("./index.js").InputNumberProps> & Readonly<{
        onInput?: ((value: number | undefined) => any) | undefined;
        onClear?: (() => any) | undefined;
        onFocus?: ((event: FocusEvent) => any) | undefined;
        onChange?: ((currentValue: number | undefined, oldValue: number | undefined) => any) | undefined;
        onBlur?: ((event: FocusEvent) => any) | undefined;
        "onUpdate:modelValue"?: ((value: number | undefined) => any) | undefined;
    }>, {
        focus: () => void | undefined;
        blur: () => void | undefined;
        clear: () => void;
    }, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
        input: (value: number | undefined) => any;
        clear: () => any;
        focus: (event: FocusEvent) => any;
        change: (currentValue: number | undefined, oldValue: number | undefined) => any;
        blur: (event: FocusEvent) => any;
        "update:modelValue": (value: number | undefined) => any;
    }, import("vue").PublicProps, {
        size: import("./index.js").InputNumberSize;
        readonly: boolean;
        disabled: boolean;
        clearable: boolean;
        validateEvent: boolean;
        min: number;
        max: number;
        step: number;
        stepStrictly: boolean;
        controlsPosition: import("./index.js").ControlsPosition;
        controls: boolean;
        valueOnClear: number | null | "min" | "max";
    }, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("./index.js").InputNumberProps> & Readonly<{
        onInput?: ((value: number | undefined) => any) | undefined;
        onClear?: (() => any) | undefined;
        onFocus?: ((event: FocusEvent) => any) | undefined;
        onChange?: ((currentValue: number | undefined, oldValue: number | undefined) => any) | undefined;
        onBlur?: ((event: FocusEvent) => any) | undefined;
        "onUpdate:modelValue"?: ((value: number | undefined) => any) | undefined;
    }>, {
        focus: () => void | undefined;
        blur: () => void | undefined;
        clear: () => void;
    }, {}, {}, {}, {
        size: import("./index.js").InputNumberSize;
        readonly: boolean;
        disabled: boolean;
        clearable: boolean;
        validateEvent: boolean;
        min: number;
        max: number;
        step: number;
        stepStrictly: boolean;
        controlsPosition: import("./index.js").ControlsPosition;
        controls: boolean;
        valueOnClear: number | null | "min" | "max";
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("./index.js").InputNumberProps> & Readonly<{
    onInput?: ((value: number | undefined) => any) | undefined;
    onClear?: (() => any) | undefined;
    onFocus?: ((event: FocusEvent) => any) | undefined;
    onChange?: ((currentValue: number | undefined, oldValue: number | undefined) => any) | undefined;
    onBlur?: ((event: FocusEvent) => any) | undefined;
    "onUpdate:modelValue"?: ((value: number | undefined) => any) | undefined;
}>, {
    focus: () => void | undefined;
    blur: () => void | undefined;
    clear: () => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    input: (value: number | undefined) => any;
    clear: () => any;
    focus: (event: FocusEvent) => any;
    change: (currentValue: number | undefined, oldValue: number | undefined) => any;
    blur: (event: FocusEvent) => any;
    "update:modelValue": (value: number | undefined) => any;
}, string, {
    size: import("./index.js").InputNumberSize;
    readonly: boolean;
    disabled: boolean;
    clearable: boolean;
    validateEvent: boolean;
    min: number;
    max: number;
    step: number;
    stepStrictly: boolean;
    controlsPosition: import("./index.js").ControlsPosition;
    controls: boolean;
    valueOnClear: number | null | "min" | "max";
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        decreaseIcon?: (props: {}) => any;
    } & {
        prefix?: (props: {}) => any;
    } & {
        suffix?: (props: {}) => any;
    } & {
        increaseIcon?: (props: {}) => any;
    };
})> & Record<string, unknown>;
export default YhInputNumber;
export * from './src/input-number';
export type InputNumberInstance = InstanceType<typeof InputNumber>;
export type YhInputNumberInstance = InputNumberInstance;
export type YhInputNumberProps = import('./src/input-number').InputNumberProps;
export type YhInputNumberEmits = import('./src/input-number').InputNumberEmits;
export type YhInputNumberSlots = import('./src/input-number').InputNumberSlots;
export type YhInputNumberExpose = import('./src/input-number').InputNumberExpose;
export type YhInputNumberSize = import('./src/input-number').InputNumberSize;
export type YhInputNumberControlsPosition = import('./src/input-number').ControlsPosition;
