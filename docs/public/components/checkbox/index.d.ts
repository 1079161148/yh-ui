/**
 * Checkbox Component
 * @description 复选框组件导出
 */
import Checkbox from './src/checkbox.vue';
import CheckboxGroup from './src/checkbox-group.vue';
export declare const YhCheckbox: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("./index.js").CheckboxProps> & Readonly<{
        onChange?: ((value: import("./index.js").CheckboxValueType) => any) | undefined;
        "onUpdate:modelValue"?: ((value: import("./index.js").CheckboxValueType) => any) | undefined;
    }>, {
        ref: HTMLInputElement | undefined;
        checked: boolean;
        focus: () => void;
        blur: () => void;
    }, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
        change: (value: import("./index.js").CheckboxValueType) => any;
        "update:modelValue": (value: import("./index.js").CheckboxValueType) => any;
    }, import("vue").PublicProps, {
        size: import("./index.js").CheckboxSize;
        disabled: boolean;
        validateEvent: boolean;
        border: boolean;
        trueValue: import("./index.js").CheckboxValueType;
        falseValue: import("./index.js").CheckboxValueType;
        indeterminate: boolean;
    }, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("./index.js").CheckboxProps> & Readonly<{
        onChange?: ((value: import("./index.js").CheckboxValueType) => any) | undefined;
        "onUpdate:modelValue"?: ((value: import("./index.js").CheckboxValueType) => any) | undefined;
    }>, {
        ref: HTMLInputElement | undefined;
        checked: boolean;
        focus: () => void;
        blur: () => void;
    }, {}, {}, {}, {
        size: import("./index.js").CheckboxSize;
        disabled: boolean;
        validateEvent: boolean;
        border: boolean;
        trueValue: import("./index.js").CheckboxValueType;
        falseValue: import("./index.js").CheckboxValueType;
        indeterminate: boolean;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("./index.js").CheckboxProps> & Readonly<{
    onChange?: ((value: import("./index.js").CheckboxValueType) => any) | undefined;
    "onUpdate:modelValue"?: ((value: import("./index.js").CheckboxValueType) => any) | undefined;
}>, {
    ref: HTMLInputElement | undefined;
    checked: boolean;
    focus: () => void;
    blur: () => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    change: (value: import("./index.js").CheckboxValueType) => any;
    "update:modelValue": (value: import("./index.js").CheckboxValueType) => any;
}, string, {
    size: import("./index.js").CheckboxSize;
    disabled: boolean;
    validateEvent: boolean;
    border: boolean;
    trueValue: import("./index.js").CheckboxValueType;
    falseValue: import("./index.js").CheckboxValueType;
    indeterminate: boolean;
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        default?: (props: {}) => any;
    };
})> & Record<string, unknown>;
export declare const YhCheckboxGroup: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("./index.js").CheckboxGroupProps> & Readonly<{
        onChange?: ((value: import("./index.js").CheckboxValueType[]) => any) | undefined;
        "onUpdate:modelValue"?: ((value: import("./index.js").CheckboxValueType[]) => any) | undefined;
    }>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
        change: (value: import("./index.js").CheckboxValueType[]) => any;
        "update:modelValue": (value: import("./index.js").CheckboxValueType[]) => any;
    }, import("vue").PublicProps, {
        tag: string | import("vue").Component;
        disabled: boolean;
        modelValue: import("./index.js").CheckboxValueType[];
        validateEvent: boolean;
    }, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("./index.js").CheckboxGroupProps> & Readonly<{
        onChange?: ((value: import("./index.js").CheckboxValueType[]) => any) | undefined;
        "onUpdate:modelValue"?: ((value: import("./index.js").CheckboxValueType[]) => any) | undefined;
    }>, {}, {}, {}, {}, {
        tag: string | import("vue").Component;
        disabled: boolean;
        modelValue: import("./index.js").CheckboxValueType[];
        validateEvent: boolean;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("./index.js").CheckboxGroupProps> & Readonly<{
    onChange?: ((value: import("./index.js").CheckboxValueType[]) => any) | undefined;
    "onUpdate:modelValue"?: ((value: import("./index.js").CheckboxValueType[]) => any) | undefined;
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    change: (value: import("./index.js").CheckboxValueType[]) => any;
    "update:modelValue": (value: import("./index.js").CheckboxValueType[]) => any;
}, string, {
    tag: string | import("vue").Component;
    disabled: boolean;
    modelValue: import("./index.js").CheckboxValueType[];
    validateEvent: boolean;
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        default?: (props: {}) => any;
    };
})> & Record<string, unknown>;
export default YhCheckbox;
export * from './src/checkbox';
export type CheckboxInstance = InstanceType<typeof Checkbox>;
export type CheckboxGroupInstance = InstanceType<typeof CheckboxGroup>;
export type YhCheckboxInstance = CheckboxInstance;
export type YhCheckboxGroupInstance = CheckboxGroupInstance;
export type YhCheckboxProps = import('./src/checkbox').CheckboxProps;
export type YhCheckboxEmits = import('./src/checkbox').CheckboxEmits;
export type YhCheckboxSlots = import('./src/checkbox').CheckboxSlots;
export type YhCheckboxExpose = import('./src/checkbox').CheckboxExpose;
export type YhCheckboxGroupProps = import('./src/checkbox').CheckboxGroupProps;
export type YhCheckboxGroupEmits = import('./src/checkbox').CheckboxGroupEmits;
export type YhCheckboxGroupOption = import('./src/checkbox').CheckboxGroupOption;
export type YhCheckboxValueType = import('./src/checkbox').CheckboxValueType;
