/**
 * TimeSelect Component
 * @description 时间选择器组件导出
 */
import TimeSelect from './src/time-select.vue';
export declare const YhTimeSelect: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("./index.js").TimeSelectProps> & Readonly<{
        onClear?: (() => any) | undefined;
        onFocus?: ((event: FocusEvent) => any) | undefined;
        onChange?: ((value: string | undefined) => any) | undefined;
        onBlur?: ((event: FocusEvent) => any) | undefined;
        "onUpdate:modelValue"?: ((value: string | undefined) => any) | undefined;
        "onVisible-change"?: ((visible: boolean) => any) | undefined;
    }>, {
        focus: () => void;
        blur: () => void;
        inputRef: import("vue").Ref<HTMLInputElement | undefined>;
    }, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
        clear: () => any;
        focus: (event: FocusEvent) => any;
        change: (value: string | undefined) => any;
        blur: (event: FocusEvent) => any;
        "update:modelValue": (value: string | undefined) => any;
        "visible-change": (visible: boolean) => any;
    }, import("vue").PublicProps, {
        size: import("./index.js").TimeSelectSize;
        placeholder: string;
        start: string;
        end: string;
        effect: "dark" | "light";
        disabled: boolean;
        clearable: boolean;
        validateEvent: boolean;
        step: string;
        editable: boolean;
        format: string;
        teleported: boolean;
        includeEndTime: boolean;
    }, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("./index.js").TimeSelectProps> & Readonly<{
        onClear?: (() => any) | undefined;
        onFocus?: ((event: FocusEvent) => any) | undefined;
        onChange?: ((value: string | undefined) => any) | undefined;
        onBlur?: ((event: FocusEvent) => any) | undefined;
        "onUpdate:modelValue"?: ((value: string | undefined) => any) | undefined;
        "onVisible-change"?: ((visible: boolean) => any) | undefined;
    }>, {
        focus: () => void;
        blur: () => void;
        inputRef: import("vue").Ref<HTMLInputElement | undefined>;
    }, {}, {}, {}, {
        size: import("./index.js").TimeSelectSize;
        placeholder: string;
        start: string;
        end: string;
        effect: "dark" | "light";
        disabled: boolean;
        clearable: boolean;
        validateEvent: boolean;
        step: string;
        editable: boolean;
        format: string;
        teleported: boolean;
        includeEndTime: boolean;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("./index.js").TimeSelectProps> & Readonly<{
    onClear?: (() => any) | undefined;
    onFocus?: ((event: FocusEvent) => any) | undefined;
    onChange?: ((value: string | undefined) => any) | undefined;
    onBlur?: ((event: FocusEvent) => any) | undefined;
    "onUpdate:modelValue"?: ((value: string | undefined) => any) | undefined;
    "onVisible-change"?: ((visible: boolean) => any) | undefined;
}>, {
    focus: () => void;
    blur: () => void;
    inputRef: import("vue").Ref<HTMLInputElement | undefined>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    clear: () => any;
    focus: (event: FocusEvent) => any;
    change: (value: string | undefined) => any;
    blur: (event: FocusEvent) => any;
    "update:modelValue": (value: string | undefined) => any;
    "visible-change": (visible: boolean) => any;
}, string, {
    size: import("./index.js").TimeSelectSize;
    placeholder: string;
    start: string;
    end: string;
    effect: "dark" | "light";
    disabled: boolean;
    clearable: boolean;
    validateEvent: boolean;
    step: string;
    editable: boolean;
    format: string;
    teleported: boolean;
    includeEndTime: boolean;
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        prefix?: (props: {}) => any;
    } & {
        empty?: (props: {}) => any;
    } & {
        option?: (props: {
            option: import("./index.js").TimeOption;
        }) => any;
    };
})> & Record<string, unknown>;
export default YhTimeSelect;
export * from './src/time-select';
export type TimeSelectInstance = InstanceType<typeof TimeSelect>;
export type YhTimeSelectInstance = TimeSelectInstance;
export type YhTimeSelectProps = import('./src/time-select').TimeSelectProps;
export type YhTimeSelectEmits = import('./src/time-select').TimeSelectEmits;
export type YhTimeSelectSlots = import('./src/time-select').TimeSelectSlots;
export type YhTimeSelectExpose = import('./src/time-select').TimeSelectExpose;
export type YhTimeSelectSize = import('./src/time-select').TimeSelectSize;
export type YhTimeSelectOption = import('./src/time-select').TimeOption;
