declare var __VLS_12: {}, __VLS_14: {}, __VLS_20: {}, __VLS_22: {}, __VLS_24: {}, __VLS_26: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_12) => any;
} & {
    icon?: (props: typeof __VLS_14) => any;
} & {
    header?: (props: typeof __VLS_20) => any;
} & {
    content?: (props: typeof __VLS_22) => any;
} & {
    default?: (props: typeof __VLS_24) => any;
} & {
    footer?: (props: typeof __VLS_26) => any;
};
declare const __VLS_component: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly title: StringConstructor;
    readonly description: StringConstructor;
    readonly icon: StringConstructor;
    readonly iconColor: StringConstructor;
    readonly content: StringConstructor;
    readonly placement: {
        readonly type: import("vue").PropType<import("@floating-ui/utils").Placement>;
        readonly default: "bottom";
    };
    readonly trigger: {
        readonly type: import("vue").PropType<import("./popover").PopoverTrigger | import("./popover").PopoverTrigger[]>;
        readonly default: "click";
    };
    readonly visible: {
        readonly type: import("vue").PropType<boolean | null>;
        readonly default: null;
    };
    readonly effect: {
        readonly type: import("vue").PropType<"light" | "dark" | string>;
        readonly default: "light";
    };
    readonly disabled: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly showArrow: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly showAfter: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly hideAfter: {
        readonly type: NumberConstructor;
        readonly default: 100;
    };
    readonly offset: {
        readonly type: import("vue").PropType<[number, number]>;
        readonly default: () => number[];
    };
    readonly width: {
        readonly type: import("vue").PropType<string | number>;
        readonly default: "auto";
    };
    readonly maxHeight: {
        readonly type: import("vue").PropType<string | number>;
        readonly default: "none";
    };
    readonly scrollable: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly interactive: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly matchTriggerWidth: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly zIndex: {
        readonly type: NumberConstructor;
        readonly default: 2003;
    };
    readonly teleported: {
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
    readonly transition: {
        readonly type: StringConstructor;
        readonly default: "yh-popover-fade";
    };
    readonly persistent: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>, {
    /** 手动控制可见性 */
    toggle: (val: boolean) => boolean;
    /** 弹出状态 */
    visible: import("vue").WritableComputedRef<boolean, boolean>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    hide: () => void;
    show: () => void;
    "update:visible": (visible: boolean) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly title: StringConstructor;
    readonly description: StringConstructor;
    readonly icon: StringConstructor;
    readonly iconColor: StringConstructor;
    readonly content: StringConstructor;
    readonly placement: {
        readonly type: import("vue").PropType<import("@floating-ui/utils").Placement>;
        readonly default: "bottom";
    };
    readonly trigger: {
        readonly type: import("vue").PropType<import("./popover").PopoverTrigger | import("./popover").PopoverTrigger[]>;
        readonly default: "click";
    };
    readonly visible: {
        readonly type: import("vue").PropType<boolean | null>;
        readonly default: null;
    };
    readonly effect: {
        readonly type: import("vue").PropType<"light" | "dark" | string>;
        readonly default: "light";
    };
    readonly disabled: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly showArrow: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly showAfter: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly hideAfter: {
        readonly type: NumberConstructor;
        readonly default: 100;
    };
    readonly offset: {
        readonly type: import("vue").PropType<[number, number]>;
        readonly default: () => number[];
    };
    readonly width: {
        readonly type: import("vue").PropType<string | number>;
        readonly default: "auto";
    };
    readonly maxHeight: {
        readonly type: import("vue").PropType<string | number>;
        readonly default: "none";
    };
    readonly scrollable: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly interactive: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly matchTriggerWidth: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly zIndex: {
        readonly type: NumberConstructor;
        readonly default: 2003;
    };
    readonly teleported: {
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
    readonly transition: {
        readonly type: StringConstructor;
        readonly default: "yh-popover-fade";
    };
    readonly persistent: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>> & Readonly<{
    onHide?: (() => any) | undefined;
    onShow?: (() => any) | undefined;
    "onUpdate:visible"?: ((visible: boolean) => any) | undefined;
}>, {
    readonly trigger: "hover" | "focus" | "click" | "contextmenu" | ("hover" | "focus" | "click" | "contextmenu")[];
    readonly effect: string;
    readonly transition: string;
    readonly disabled: boolean;
    readonly width: string | number;
    readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
    readonly maxHeight: string | number;
    readonly zIndex: number;
    readonly offset: [number, number];
    readonly visible: boolean | null;
    readonly placement: import("@floating-ui/utils").Placement;
    readonly popperClass: string;
    readonly teleported: boolean;
    readonly popperStyle: import("vue").StyleValue;
    readonly scrollable: boolean;
    readonly showAfter: number;
    readonly hideAfter: number;
    readonly showArrow: boolean;
    readonly interactive: boolean;
    readonly persistent: boolean;
    readonly matchTriggerWidth: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
