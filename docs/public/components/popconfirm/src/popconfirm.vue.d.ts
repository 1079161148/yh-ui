declare var __VLS_6: {}, __VLS_8: {}, __VLS_14: {}, __VLS_16: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_6) => any;
} & {
    icon?: (props: typeof __VLS_8) => any;
} & {
    title?: (props: typeof __VLS_14) => any;
} & {
    description?: (props: typeof __VLS_16) => any;
};
declare const __VLS_component: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly title: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly description: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly confirmButtonText: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly cancelButtonText: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly confirmButtonType: {
        readonly type: import("vue").PropType<"default" | "primary" | "success" | "warning" | "danger" | "info">;
        readonly default: "primary";
    };
    readonly cancelButtonType: {
        readonly type: import("vue").PropType<"default" | "primary" | "success" | "warning" | "danger" | "info">;
        readonly default: "default";
    };
    readonly icon: {
        readonly type: StringConstructor;
        readonly default: "warning";
    };
    readonly iconColor: {
        readonly type: StringConstructor;
        readonly default: "#faad14";
    };
    readonly hideIcon: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly hideCancel: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly offset: {
        readonly type: import("vue").PropType<[number, number]>;
        readonly default: () => number[];
    };
    readonly placement: {
        readonly type: import("vue").PropType<import("../..").TooltipPlacement>;
        readonly default: "top";
    };
    readonly visible: {
        readonly type: import("vue").PropType<boolean | null>;
        readonly default: null;
    };
    readonly width: {
        readonly type: import("vue").PropType<string | number>;
        readonly default: 180;
    };
    readonly disabled: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly zIndex: {
        readonly type: NumberConstructor;
        readonly default: 2000;
    };
    readonly showArrow: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly popperClass: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly popperStyle: {
        readonly type: import("vue").PropType<import("vue").StyleValue>;
        readonly default: () => {};
    };
    readonly teleported: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly showDontAskAgain: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly dontAskAgainText: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly swapButtons: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly beforeConfirm: {
        readonly type: import("vue").PropType<() => boolean | Promise<boolean>>;
        readonly default: null;
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>, {
    visible: import("vue").WritableComputedRef<boolean, boolean>;
    toggle: (val: boolean) => boolean;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    confirm: (_dontAskAgain?: boolean | undefined) => void;
    cancel: () => void;
    "update:visible": (visible: boolean) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly title: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly description: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly confirmButtonText: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly cancelButtonText: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly confirmButtonType: {
        readonly type: import("vue").PropType<"default" | "primary" | "success" | "warning" | "danger" | "info">;
        readonly default: "primary";
    };
    readonly cancelButtonType: {
        readonly type: import("vue").PropType<"default" | "primary" | "success" | "warning" | "danger" | "info">;
        readonly default: "default";
    };
    readonly icon: {
        readonly type: StringConstructor;
        readonly default: "warning";
    };
    readonly iconColor: {
        readonly type: StringConstructor;
        readonly default: "#faad14";
    };
    readonly hideIcon: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly hideCancel: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly offset: {
        readonly type: import("vue").PropType<[number, number]>;
        readonly default: () => number[];
    };
    readonly placement: {
        readonly type: import("vue").PropType<import("../..").TooltipPlacement>;
        readonly default: "top";
    };
    readonly visible: {
        readonly type: import("vue").PropType<boolean | null>;
        readonly default: null;
    };
    readonly width: {
        readonly type: import("vue").PropType<string | number>;
        readonly default: 180;
    };
    readonly disabled: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly zIndex: {
        readonly type: NumberConstructor;
        readonly default: 2000;
    };
    readonly showArrow: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly popperClass: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly popperStyle: {
        readonly type: import("vue").PropType<import("vue").StyleValue>;
        readonly default: () => {};
    };
    readonly teleported: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly showDontAskAgain: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly dontAskAgainText: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly swapButtons: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly beforeConfirm: {
        readonly type: import("vue").PropType<() => boolean | Promise<boolean>>;
        readonly default: null;
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>> & Readonly<{
    onConfirm?: ((_dontAskAgain?: boolean | undefined) => any) | undefined;
    onCancel?: (() => any) | undefined;
    "onUpdate:visible"?: ((visible: boolean) => any) | undefined;
}>, {
    readonly title: string;
    readonly description: string;
    readonly disabled: boolean;
    readonly width: string | number;
    readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
    readonly iconColor: string;
    readonly icon: string;
    readonly zIndex: number;
    readonly offset: [number, number];
    readonly visible: boolean | null;
    readonly placement: "top" | "left" | "right" | "bottom" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "left-start" | "left-end" | "right-start" | "right-end";
    readonly popperClass: string;
    readonly teleported: boolean;
    readonly popperStyle: import("vue").StyleValue;
    readonly showArrow: boolean;
    readonly confirmButtonText: string;
    readonly cancelButtonText: string;
    readonly confirmButtonType: "default" | "success" | "warning" | "info" | "primary" | "danger";
    readonly cancelButtonType: "default" | "success" | "warning" | "info" | "primary" | "danger";
    readonly hideIcon: boolean;
    readonly hideCancel: boolean;
    readonly showDontAskAgain: boolean;
    readonly dontAskAgainText: string;
    readonly swapButtons: boolean;
    readonly beforeConfirm: () => boolean | Promise<boolean>;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
