import ColorPicker from './src/color-picker.vue';
export declare const YhColorPicker: import("@yh-ui/utils").SFCWithInstall<import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly modelValue: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly showAlpha: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly colorFormat: {
        readonly type: import("vue").PropType<"hex" | "rgb" | "hsl" | "hsv">;
        readonly default: "hex";
    };
    readonly size: {
        readonly type: import("vue").PropType<"large" | "default" | "small">;
        readonly default: "default";
    };
    readonly disabled: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly predefine: {
        readonly type: import("vue").PropType<string[]>;
        readonly default: () => never[];
    };
    readonly popperClass: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>, {
    visible: import("vue").Ref<boolean>;
    togglePopper: () => void;
    handleClear: () => void;
    handleConfirm: () => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    change: (val: string) => void;
    "update:modelValue": (val: string) => void;
    activeChange: (val: string) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly modelValue: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly showAlpha: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly colorFormat: {
        readonly type: import("vue").PropType<"hex" | "rgb" | "hsl" | "hsv">;
        readonly default: "hex";
    };
    readonly size: {
        readonly type: import("vue").PropType<"large" | "default" | "small">;
        readonly default: "default";
    };
    readonly disabled: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly predefine: {
        readonly type: import("vue").PropType<string[]>;
        readonly default: () => never[];
    };
    readonly popperClass: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>> & Readonly<{
    onChange?: ((val: string) => any) | undefined;
    "onUpdate:modelValue"?: ((val: string) => any) | undefined;
    onActiveChange?: ((val: string) => any) | undefined;
}>, {
    readonly size: "large" | "default" | "small";
    readonly disabled: boolean;
    readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
    readonly modelValue: string;
    readonly popperClass: string;
    readonly showAlpha: boolean;
    readonly colorFormat: "rgb" | "hex" | "hsl" | "hsv";
    readonly predefine: string[];
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>> & Record<string, unknown>;
export default YhColorPicker;
export * from './src/color-picker';
export type ColorPickerInstance = InstanceType<typeof ColorPicker>;
export type YhColorPickerInstance = ColorPickerInstance;
export type YhColorPickerProps = import('./src/color-picker').ColorPickerProps;
export type YhColorPickerEmits = import('./src/color-picker').ColorPickerEmits;
export type YhColorPickerSlots = import('./src/color-picker').ColorPickerSlots;
export type YhColorPickerExpose = import('./src/color-picker').ColorPickerExpose;
