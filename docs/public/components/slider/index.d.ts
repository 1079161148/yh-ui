import Slider from './src/slider.vue';
export declare const YhSlider: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("vue").ExtractPropTypes<{
        modelValue: {
            type: import("vue").PropType<import("./index.js").SliderValueType>;
            default: number;
        };
        min: {
            type: NumberConstructor;
            default: number;
        };
        max: {
            type: NumberConstructor;
            default: number;
        };
        step: {
            type: NumberConstructor;
            default: number;
        };
        showInput: {
            type: BooleanConstructor;
            default: boolean;
        };
        showInputControls: {
            type: BooleanConstructor;
            default: boolean;
        };
        size: {
            type: import("vue").PropType<"" | "large" | "default" | "small">;
            default: string;
        };
        inputSize: {
            type: import("vue").PropType<"" | "large" | "default" | "small">;
            default: string;
        };
        showStops: {
            type: BooleanConstructor;
            default: boolean;
        };
        showTooltip: {
            type: BooleanConstructor;
            default: boolean;
        };
        formatTooltip: {
            type: import("vue").PropType<(val: number) => string | number>;
            default: undefined;
        };
        disabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        range: {
            type: BooleanConstructor;
            default: boolean;
        };
        vertical: {
            type: BooleanConstructor;
            default: boolean;
        };
        height: {
            type: StringConstructor;
            default: string;
        };
        label: {
            type: StringConstructor;
            default: undefined;
        };
        debounce: {
            type: NumberConstructor;
            default: number;
        };
        tooltipClass: {
            type: StringConstructor;
            default: undefined;
        };
        placement: {
            type: import("vue").PropType<"top" | "top-start" | "top-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end" | "right" | "right-start" | "right-end">;
            default: string;
        };
        marks: {
            type: import("vue").PropType<Record<number, string | {
                style?: import("vue").CSSProperties;
                label: string;
            }>>;
            default: undefined;
        };
        validateEvent: {
            type: BooleanConstructor;
            default: boolean;
        };
        rangeStartLabel: {
            type: StringConstructor;
            default: undefined;
        };
        rangeEndLabel: {
            type: StringConstructor;
            default: undefined;
        };
        buttonClass: {
            type: StringConstructor;
            default: undefined;
        };
        color: {
            type: StringConstructor;
            default: undefined;
        };
        themeOverrides: {
            type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
            default: undefined;
        };
    }>> & Readonly<{
        onInput?: ((_val: import("./index.js").SliderValueType) => any) | undefined;
        onChange?: ((_val: import("./index.js").SliderValueType) => any) | undefined;
        "onUpdate:modelValue"?: ((_val: import("./index.js").SliderValueType) => any) | undefined;
    }>, {
        sliderRef: import("vue").Ref<HTMLElement | undefined>;
        firstValue: import("vue").Ref<number>;
        secondValue: import("vue").Ref<number>;
    }, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        input: (_val: import("./index.js").SliderValueType) => void;
        change: (_val: import("./index.js").SliderValueType) => void;
        "update:modelValue": (_val: import("./index.js").SliderValueType) => void;
    }, import("vue").PublicProps, {
        label: string;
        size: "" | "large" | "default" | "small";
        disabled: boolean;
        height: string;
        themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
        color: string;
        vertical: boolean;
        modelValue: import("./index.js").SliderValueType;
        validateEvent: boolean;
        range: boolean;
        min: number;
        max: number;
        step: number;
        showTooltip: boolean;
        debounce: number;
        placement: "top" | "left" | "right" | "bottom" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "left-start" | "left-end" | "right-start" | "right-end";
        showInput: boolean;
        showInputControls: boolean;
        inputSize: "" | "large" | "default" | "small";
        showStops: boolean;
        formatTooltip: (val: number) => string | number;
        tooltipClass: string;
        marks: Record<number, string | {
            style?: import("vue").CSSProperties;
            label: string;
        }>;
        rangeStartLabel: string;
        rangeEndLabel: string;
        buttonClass: string;
    }, true, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
        modelValue: {
            type: import("vue").PropType<import("./index.js").SliderValueType>;
            default: number;
        };
        min: {
            type: NumberConstructor;
            default: number;
        };
        max: {
            type: NumberConstructor;
            default: number;
        };
        step: {
            type: NumberConstructor;
            default: number;
        };
        showInput: {
            type: BooleanConstructor;
            default: boolean;
        };
        showInputControls: {
            type: BooleanConstructor;
            default: boolean;
        };
        size: {
            type: import("vue").PropType<"" | "large" | "default" | "small">;
            default: string;
        };
        inputSize: {
            type: import("vue").PropType<"" | "large" | "default" | "small">;
            default: string;
        };
        showStops: {
            type: BooleanConstructor;
            default: boolean;
        };
        showTooltip: {
            type: BooleanConstructor;
            default: boolean;
        };
        formatTooltip: {
            type: import("vue").PropType<(val: number) => string | number>;
            default: undefined;
        };
        disabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        range: {
            type: BooleanConstructor;
            default: boolean;
        };
        vertical: {
            type: BooleanConstructor;
            default: boolean;
        };
        height: {
            type: StringConstructor;
            default: string;
        };
        label: {
            type: StringConstructor;
            default: undefined;
        };
        debounce: {
            type: NumberConstructor;
            default: number;
        };
        tooltipClass: {
            type: StringConstructor;
            default: undefined;
        };
        placement: {
            type: import("vue").PropType<"top" | "top-start" | "top-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end" | "right" | "right-start" | "right-end">;
            default: string;
        };
        marks: {
            type: import("vue").PropType<Record<number, string | {
                style?: import("vue").CSSProperties;
                label: string;
            }>>;
            default: undefined;
        };
        validateEvent: {
            type: BooleanConstructor;
            default: boolean;
        };
        rangeStartLabel: {
            type: StringConstructor;
            default: undefined;
        };
        rangeEndLabel: {
            type: StringConstructor;
            default: undefined;
        };
        buttonClass: {
            type: StringConstructor;
            default: undefined;
        };
        color: {
            type: StringConstructor;
            default: undefined;
        };
        themeOverrides: {
            type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
            default: undefined;
        };
    }>> & Readonly<{
        onInput?: ((_val: import("./index.js").SliderValueType) => any) | undefined;
        onChange?: ((_val: import("./index.js").SliderValueType) => any) | undefined;
        "onUpdate:modelValue"?: ((_val: import("./index.js").SliderValueType) => any) | undefined;
    }>, {
        sliderRef: import("vue").Ref<HTMLElement | undefined>;
        firstValue: import("vue").Ref<number>;
        secondValue: import("vue").Ref<number>;
    }, {}, {}, {}, {
        label: string;
        size: "" | "large" | "default" | "small";
        disabled: boolean;
        height: string;
        themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
        color: string;
        vertical: boolean;
        modelValue: import("./index.js").SliderValueType;
        validateEvent: boolean;
        range: boolean;
        min: number;
        max: number;
        step: number;
        showTooltip: boolean;
        debounce: number;
        placement: "top" | "left" | "right" | "bottom" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "left-start" | "left-end" | "right-start" | "right-end";
        showInput: boolean;
        showInputControls: boolean;
        inputSize: "" | "large" | "default" | "small";
        showStops: boolean;
        formatTooltip: (val: number) => string | number;
        tooltipClass: string;
        marks: Record<number, string | {
            style?: import("vue").CSSProperties;
            label: string;
        }>;
        rangeStartLabel: string;
        rangeEndLabel: string;
        buttonClass: string;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: import("vue").PropType<import("./index.js").SliderValueType>;
        default: number;
    };
    min: {
        type: NumberConstructor;
        default: number;
    };
    max: {
        type: NumberConstructor;
        default: number;
    };
    step: {
        type: NumberConstructor;
        default: number;
    };
    showInput: {
        type: BooleanConstructor;
        default: boolean;
    };
    showInputControls: {
        type: BooleanConstructor;
        default: boolean;
    };
    size: {
        type: import("vue").PropType<"" | "large" | "default" | "small">;
        default: string;
    };
    inputSize: {
        type: import("vue").PropType<"" | "large" | "default" | "small">;
        default: string;
    };
    showStops: {
        type: BooleanConstructor;
        default: boolean;
    };
    showTooltip: {
        type: BooleanConstructor;
        default: boolean;
    };
    formatTooltip: {
        type: import("vue").PropType<(val: number) => string | number>;
        default: undefined;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    range: {
        type: BooleanConstructor;
        default: boolean;
    };
    vertical: {
        type: BooleanConstructor;
        default: boolean;
    };
    height: {
        type: StringConstructor;
        default: string;
    };
    label: {
        type: StringConstructor;
        default: undefined;
    };
    debounce: {
        type: NumberConstructor;
        default: number;
    };
    tooltipClass: {
        type: StringConstructor;
        default: undefined;
    };
    placement: {
        type: import("vue").PropType<"top" | "top-start" | "top-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end" | "right" | "right-start" | "right-end">;
        default: string;
    };
    marks: {
        type: import("vue").PropType<Record<number, string | {
            style?: import("vue").CSSProperties;
            label: string;
        }>>;
        default: undefined;
    };
    validateEvent: {
        type: BooleanConstructor;
        default: boolean;
    };
    rangeStartLabel: {
        type: StringConstructor;
        default: undefined;
    };
    rangeEndLabel: {
        type: StringConstructor;
        default: undefined;
    };
    buttonClass: {
        type: StringConstructor;
        default: undefined;
    };
    color: {
        type: StringConstructor;
        default: undefined;
    };
    themeOverrides: {
        type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        default: undefined;
    };
}>> & Readonly<{
    onInput?: ((_val: import("./index.js").SliderValueType) => any) | undefined;
    onChange?: ((_val: import("./index.js").SliderValueType) => any) | undefined;
    "onUpdate:modelValue"?: ((_val: import("./index.js").SliderValueType) => any) | undefined;
}>, {
    sliderRef: import("vue").Ref<HTMLElement | undefined>;
    firstValue: import("vue").Ref<number>;
    secondValue: import("vue").Ref<number>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    input: (_val: import("./index.js").SliderValueType) => void;
    change: (_val: import("./index.js").SliderValueType) => void;
    "update:modelValue": (_val: import("./index.js").SliderValueType) => void;
}, string, {
    label: string;
    size: "" | "large" | "default" | "small";
    disabled: boolean;
    height: string;
    themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
    color: string;
    vertical: boolean;
    modelValue: import("./index.js").SliderValueType;
    validateEvent: boolean;
    range: boolean;
    min: number;
    max: number;
    step: number;
    showTooltip: boolean;
    debounce: number;
    placement: "top" | "left" | "right" | "bottom" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "left-start" | "left-end" | "right-start" | "right-end";
    showInput: boolean;
    showInputControls: boolean;
    inputSize: "" | "large" | "default" | "small";
    showStops: boolean;
    formatTooltip: (val: number) => string | number;
    tooltipClass: string;
    marks: Record<number, string | {
        style?: import("vue").CSSProperties;
        label: string;
    }>;
    rangeStartLabel: string;
    rangeEndLabel: string;
    buttonClass: string;
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        thumb?: (props: {
            value: number;
        }) => any;
    } & {
        thumb?: (props: {
            value: number;
        }) => any;
    } & {
        mark?: (props: {
            mark: string;
        }) => any;
    } & {
        default?: (props: {}) => any;
    };
})> & Record<string, unknown>;
export default YhSlider;
export * from './src/slider';
export type SliderInstance = InstanceType<typeof Slider>;
export type YhSliderInstance = SliderInstance;
export type YhSliderProps = import('./src/slider').SliderProps;
export type YhSliderEmits = import('./src/slider').SliderEmits;
export type YhSliderSlots = import('./src/slider').SliderSlots;
export type YhSliderExpose = import('./src/slider').SliderExpose;
