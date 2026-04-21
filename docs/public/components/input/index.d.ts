/**
 * Input Component
 * @description 输入框组件导出
 */
import Input from './src/input.vue';
export declare const YhInput: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("./index.js").InputProps> & Readonly<{
        onInput?: ((value: string | number) => any) | undefined;
        onClear?: (() => any) | undefined;
        onFocus?: ((event: FocusEvent) => any) | undefined;
        onChange?: ((value: string | number) => any) | undefined;
        onBlur?: ((event: FocusEvent) => any) | undefined;
        onCompositionend?: ((event: CompositionEvent) => any) | undefined;
        onCompositionstart?: ((event: CompositionEvent) => any) | undefined;
        onCompositionupdate?: ((event: CompositionEvent) => any) | undefined;
        onKeydown?: ((event: KeyboardEvent) => any) | undefined;
        onKeyup?: ((event: KeyboardEvent) => any) | undefined;
        "onUpdate:modelValue"?: ((value: string | number) => any) | undefined;
    }>, {
        ref: HTMLInputElement | HTMLTextAreaElement | undefined;
        wrapperRef: HTMLElement | undefined;
        focus: () => void;
        blur: () => void;
        select: () => void;
        clear: () => void;
        textLength: number;
    }, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
        input: (value: string | number) => any;
        clear: () => any;
        focus: (event: FocusEvent) => any;
        change: (value: string | number) => any;
        blur: (event: FocusEvent) => any;
        compositionend: (event: CompositionEvent) => any;
        compositionstart: (event: CompositionEvent) => any;
        compositionupdate: (event: CompositionEvent) => any;
        keydown: (event: KeyboardEvent) => any;
        keyup: (event: KeyboardEvent) => any;
        "update:modelValue": (value: string | number) => any;
    }, import("vue").PublicProps, {
        label: string;
        size: import("./index.js").InputSize;
        autocomplete: string;
        loading: boolean;
        showPassword: boolean;
        status: import("./index.js").InputStatus;
        readonly: boolean;
        type: import("./index.js").InputType;
        disabled: boolean;
        autofocus: boolean;
        variant: import("./index.js").InputVariant;
        clearable: boolean;
        clearOnEscape: boolean;
        selectOnFocus: boolean;
        showWordLimit: boolean;
        ariaLabel: string;
        inputmode: "text" | "none" | "tel" | "url" | "email" | "numeric" | "decimal" | "search";
        modelModifiers: Record<string, boolean>;
        validateEvent: boolean;
        rows: number;
    }, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("./index.js").InputProps> & Readonly<{
        onInput?: ((value: string | number) => any) | undefined;
        onClear?: (() => any) | undefined;
        onFocus?: ((event: FocusEvent) => any) | undefined;
        onChange?: ((value: string | number) => any) | undefined;
        onBlur?: ((event: FocusEvent) => any) | undefined;
        onCompositionend?: ((event: CompositionEvent) => any) | undefined;
        onCompositionstart?: ((event: CompositionEvent) => any) | undefined;
        onCompositionupdate?: ((event: CompositionEvent) => any) | undefined;
        onKeydown?: ((event: KeyboardEvent) => any) | undefined;
        onKeyup?: ((event: KeyboardEvent) => any) | undefined;
        "onUpdate:modelValue"?: ((value: string | number) => any) | undefined;
    }>, {
        ref: HTMLInputElement | HTMLTextAreaElement | undefined;
        wrapperRef: HTMLElement | undefined;
        focus: () => void;
        blur: () => void;
        select: () => void;
        clear: () => void;
        textLength: number;
    }, {}, {}, {}, {
        label: string;
        size: import("./index.js").InputSize;
        autocomplete: string;
        loading: boolean;
        showPassword: boolean;
        status: import("./index.js").InputStatus;
        readonly: boolean;
        type: import("./index.js").InputType;
        disabled: boolean;
        autofocus: boolean;
        variant: import("./index.js").InputVariant;
        clearable: boolean;
        clearOnEscape: boolean;
        selectOnFocus: boolean;
        showWordLimit: boolean;
        ariaLabel: string;
        inputmode: "text" | "none" | "tel" | "url" | "email" | "numeric" | "decimal" | "search";
        modelModifiers: Record<string, boolean>;
        validateEvent: boolean;
        rows: number;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("./index.js").InputProps> & Readonly<{
    onInput?: ((value: string | number) => any) | undefined;
    onClear?: (() => any) | undefined;
    onFocus?: ((event: FocusEvent) => any) | undefined;
    onChange?: ((value: string | number) => any) | undefined;
    onBlur?: ((event: FocusEvent) => any) | undefined;
    onCompositionend?: ((event: CompositionEvent) => any) | undefined;
    onCompositionstart?: ((event: CompositionEvent) => any) | undefined;
    onCompositionupdate?: ((event: CompositionEvent) => any) | undefined;
    onKeydown?: ((event: KeyboardEvent) => any) | undefined;
    onKeyup?: ((event: KeyboardEvent) => any) | undefined;
    "onUpdate:modelValue"?: ((value: string | number) => any) | undefined;
}>, {
    ref: HTMLInputElement | HTMLTextAreaElement | undefined;
    wrapperRef: HTMLElement | undefined;
    focus: () => void;
    blur: () => void;
    select: () => void;
    clear: () => void;
    textLength: number;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    input: (value: string | number) => any;
    clear: () => any;
    focus: (event: FocusEvent) => any;
    change: (value: string | number) => any;
    blur: (event: FocusEvent) => any;
    compositionend: (event: CompositionEvent) => any;
    compositionstart: (event: CompositionEvent) => any;
    compositionupdate: (event: CompositionEvent) => any;
    keydown: (event: KeyboardEvent) => any;
    keyup: (event: KeyboardEvent) => any;
    "update:modelValue": (value: string | number) => any;
}, string, {
    label: string;
    size: import("./index.js").InputSize;
    autocomplete: string;
    loading: boolean;
    showPassword: boolean;
    status: import("./index.js").InputStatus;
    readonly: boolean;
    type: import("./index.js").InputType;
    disabled: boolean;
    autofocus: boolean;
    variant: import("./index.js").InputVariant;
    clearable: boolean;
    clearOnEscape: boolean;
    selectOnFocus: boolean;
    showWordLimit: boolean;
    ariaLabel: string;
    inputmode: "text" | "none" | "tel" | "url" | "email" | "numeric" | "decimal" | "search";
    modelModifiers: Record<string, boolean>;
    validateEvent: boolean;
    rows: number;
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        prepend?: (props: {}) => any;
    } & {
        prefix?: (props: {}) => any;
    } & {
        loadingIcon?: (props: {}) => any;
    } & {
        clearIcon?: (props: {}) => any;
    } & {
        suffix?: (props: {}) => any;
    } & {
        append?: (props: {}) => any;
    };
})> & Record<string, unknown>;
export default YhInput;
export * from './src/input';
export type InputInstance = InstanceType<typeof Input>;
export type YhInputInstance = InputInstance;
export type YhInputProps = import('./src/input').InputProps;
export type YhInputEmits = import('./src/input').InputEmits;
export type YhInputSlots = import('./src/input').InputSlots;
export type YhInputExpose = import('./src/input').InputExpose;
export type YhInputType = import('./src/input').InputType;
export type YhInputSize = import('./src/input').InputSize;
export type YhInputVariant = import('./src/input').InputVariant;
export type YhInputStatus = import('./src/input').InputStatus;
export type YhInputCountConfig = import('./src/input').InputCountConfig;
