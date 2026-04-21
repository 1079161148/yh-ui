/**
 * Radio Component
 * @description 单选框组件导出
 */
import Radio from './src/radio.vue';
import RadioGroup from './src/radio-group.vue';
import RadioButton from './src/radio-button.vue';
export declare const YhRadio: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("./index.js").RadioProps> & Readonly<{
        onChange?: ((value: import("./index.js").RadioValueType) => any) | undefined;
        "onUpdate:modelValue"?: ((value: import("./index.js").RadioValueType) => any) | undefined;
    }>, {
        ref: HTMLInputElement | undefined;
        focus: () => void;
        blur: () => void;
    }, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
        change: (value: import("./index.js").RadioValueType) => any;
        "update:modelValue": (value: import("./index.js").RadioValueType) => any;
    }, import("vue").PublicProps, {
        disabled: boolean;
        border: boolean;
    }, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("./index.js").RadioProps> & Readonly<{
        onChange?: ((value: import("./index.js").RadioValueType) => any) | undefined;
        "onUpdate:modelValue"?: ((value: import("./index.js").RadioValueType) => any) | undefined;
    }>, {
        ref: HTMLInputElement | undefined;
        focus: () => void;
        blur: () => void;
    }, {}, {}, {}, {
        disabled: boolean;
        border: boolean;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("./index.js").RadioProps> & Readonly<{
    onChange?: ((value: import("./index.js").RadioValueType) => any) | undefined;
    "onUpdate:modelValue"?: ((value: import("./index.js").RadioValueType) => any) | undefined;
}>, {
    ref: HTMLInputElement | undefined;
    focus: () => void;
    blur: () => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    change: (value: import("./index.js").RadioValueType) => any;
    "update:modelValue": (value: import("./index.js").RadioValueType) => any;
}, string, {
    disabled: boolean;
    border: boolean;
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        default?: (props: {}) => any;
    };
})> & Record<string, unknown>;
export declare const YhRadioGroup: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("./index.js").RadioGroupProps> & Readonly<{
        onChange?: ((value: import("./index.js").RadioValueType) => any) | undefined;
        "onUpdate:modelValue"?: ((value: import("./index.js").RadioValueType) => any) | undefined;
    }>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
        change: (value: import("./index.js").RadioValueType) => any;
        "update:modelValue": (value: import("./index.js").RadioValueType) => any;
    }, import("vue").PublicProps, {
        tag: string | import("vue").Component;
        disabled: boolean;
        validateEvent: boolean;
    }, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("./index.js").RadioGroupProps> & Readonly<{
        onChange?: ((value: import("./index.js").RadioValueType) => any) | undefined;
        "onUpdate:modelValue"?: ((value: import("./index.js").RadioValueType) => any) | undefined;
    }>, {}, {}, {}, {}, {
        tag: string | import("vue").Component;
        disabled: boolean;
        validateEvent: boolean;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("./index.js").RadioGroupProps> & Readonly<{
    onChange?: ((value: import("./index.js").RadioValueType) => any) | undefined;
    "onUpdate:modelValue"?: ((value: import("./index.js").RadioValueType) => any) | undefined;
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    change: (value: import("./index.js").RadioValueType) => any;
    "update:modelValue": (value: import("./index.js").RadioValueType) => any;
}, string, {
    tag: string | import("vue").Component;
    disabled: boolean;
    validateEvent: boolean;
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        default?: (props: {}) => any;
    };
})> & Record<string, unknown>;
export declare const YhRadioButton: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("./index.js").RadioButtonProps> & Readonly<{
        onChange?: ((value: import("./index.js").RadioValueType) => any) | undefined;
        "onUpdate:modelValue"?: ((value: import("./index.js").RadioValueType) => any) | undefined;
    }>, {
        ref: HTMLInputElement | undefined;
        focus: () => void;
        blur: () => void;
    }, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
        change: (value: import("./index.js").RadioValueType) => any;
        "update:modelValue": (value: import("./index.js").RadioValueType) => any;
    }, import("vue").PublicProps, {
        disabled: boolean;
    }, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("./index.js").RadioButtonProps> & Readonly<{
        onChange?: ((value: import("./index.js").RadioValueType) => any) | undefined;
        "onUpdate:modelValue"?: ((value: import("./index.js").RadioValueType) => any) | undefined;
    }>, {
        ref: HTMLInputElement | undefined;
        focus: () => void;
        blur: () => void;
    }, {}, {}, {}, {
        disabled: boolean;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("./index.js").RadioButtonProps> & Readonly<{
    onChange?: ((value: import("./index.js").RadioValueType) => any) | undefined;
    "onUpdate:modelValue"?: ((value: import("./index.js").RadioValueType) => any) | undefined;
}>, {
    ref: HTMLInputElement | undefined;
    focus: () => void;
    blur: () => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    change: (value: import("./index.js").RadioValueType) => any;
    "update:modelValue": (value: import("./index.js").RadioValueType) => any;
}, string, {
    disabled: boolean;
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        default?: (props: {}) => any;
    };
})> & Record<string, unknown>;
export default YhRadio;
export * from './src/radio';
export type RadioInstance = InstanceType<typeof Radio>;
export type RadioGroupInstance = InstanceType<typeof RadioGroup>;
export type RadioButtonInstance = InstanceType<typeof RadioButton>;
export type YhRadioInstance = RadioInstance;
export type YhRadioGroupInstance = RadioGroupInstance;
export type YhRadioButtonInstance = RadioButtonInstance;
export type YhRadioProps = import('./src/radio').RadioProps;
export type YhRadioEmits = import('./src/radio').RadioEmits;
export type YhRadioSlots = import('./src/radio').RadioSlots;
export type YhRadioExpose = import('./src/radio').RadioExpose;
export type YhRadioGroupProps = import('./src/radio').RadioGroupProps;
export type YhRadioGroupEmits = import('./src/radio').RadioGroupEmits;
export type YhRadioGroupOption = import('./src/radio').RadioGroupOption;
export type YhRadioButtonProps = import('./src/radio').RadioButtonProps;
export type YhRadioButtonEmits = import('./src/radio').RadioButtonEmits;
export type YhRadioButtonExpose = import('./src/radio').RadioButtonExpose;
export type YhRadioValueType = import('./src/radio').RadioValueType;
