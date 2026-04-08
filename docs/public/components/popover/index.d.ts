import Popover from './src/popover.vue';
export declare const YhPopover: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("vue").ExtractPropTypes<{
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
            readonly type: import("vue").PropType<import("./index.js").PopoverTrigger | import("./index.js").PopoverTrigger[]>;
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
        toggle: (val: boolean) => boolean;
        visible: import("vue").WritableComputedRef<boolean, boolean>;
    }, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        hide: () => void;
        show: () => void;
        "update:visible": (visible: boolean) => void;
    }, import("vue").PublicProps, {
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
    }, true, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
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
            readonly type: import("vue").PropType<import("./index.js").PopoverTrigger | import("./index.js").PopoverTrigger[]>;
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
        toggle: (val: boolean) => boolean;
        visible: import("vue").WritableComputedRef<boolean, boolean>;
    }, {}, {}, {}, {
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
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
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
        readonly type: import("vue").PropType<import("./index.js").PopoverTrigger | import("./index.js").PopoverTrigger[]>;
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
    toggle: (val: boolean) => boolean;
    visible: import("vue").WritableComputedRef<boolean, boolean>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    hide: () => void;
    show: () => void;
    "update:visible": (visible: boolean) => void;
}, string, {
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
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        default?: (props: {}) => any;
    } & {
        icon?: (props: {}) => any;
    } & {
        header?: (props: {}) => any;
    } & {
        content?: (props: {}) => any;
    } & {
        default?: (props: {}) => any;
    } & {
        footer?: (props: {}) => any;
    };
})> & Record<string, unknown>;
export default YhPopover;
export * from './src/popover';
export type PopoverInstance = InstanceType<typeof Popover>;
