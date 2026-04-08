import type { CSSProperties } from 'vue';
declare var __VLS_20: {}, __VLS_34: {}, __VLS_40: {}, __VLS_54: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_20) => any;
} & {
    default?: (props: typeof __VLS_34) => any;
} & {
    dropdown?: (props: typeof __VLS_40) => any;
} & {
    empty?: (props: typeof __VLS_54) => any;
};
declare const __VLS_component: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly trigger: {
        readonly type: import("vue").PropType<import("./dropdown").DropdownTrigger>;
        readonly default: "hover";
    };
    readonly placement: {
        readonly type: import("vue").PropType<import("@floating-ui/utils").Placement>;
        readonly default: "bottom";
    };
    readonly visible: {
        readonly type: import("vue").PropType<boolean | null>;
        readonly default: null;
    };
    readonly disabled: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly showAfter: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly hideAfter: {
        readonly type: NumberConstructor;
        readonly default: 150;
    };
    readonly zIndex: {
        readonly type: NumberConstructor;
        readonly default: 2000;
    };
    readonly hideOnClick: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly items: {
        readonly type: import("vue").PropType<import("./dropdown").DropdownItemData[]>;
        readonly default: () => never[];
    };
    readonly loading: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly emptyText: {
        readonly type: StringConstructor;
        readonly default: undefined;
    };
    readonly checkable: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly maxHeight: {
        readonly type: import("vue").PropType<string | number>;
        readonly default: "";
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
        readonly type: import("vue").PropType<CSSProperties>;
        readonly default: () => {};
    };
    readonly splitButton: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly type: {
        readonly type: import("vue").PropType<"primary" | "success" | "warning" | "danger" | "info" | "">;
        readonly default: "";
    };
    readonly size: {
        readonly type: import("vue").PropType<"large" | "default" | "small">;
        readonly default: "default";
    };
    readonly plain: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly showArrow: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly popperArrow: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly offset: {
        readonly type: import("vue").PropType<[number, number]>;
        readonly default: () => number[];
    };
    readonly loop: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly tabindex: {
        readonly type: import("vue").PropType<number | string>;
        readonly default: 0;
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>, {
    /** 手动显示下拉菜单 */
    show: () => void;
    /** 手动隐藏下拉菜单 */
    hide: () => void;
    /** 当前可见状态 */
    visible: import("vue").WritableComputedRef<boolean, boolean>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    click: (event: MouseEvent) => void;
    hide: () => void;
    show: () => void;
    "update:visible": (visible: boolean) => void;
    command: (_command: string | number | object) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly trigger: {
        readonly type: import("vue").PropType<import("./dropdown").DropdownTrigger>;
        readonly default: "hover";
    };
    readonly placement: {
        readonly type: import("vue").PropType<import("@floating-ui/utils").Placement>;
        readonly default: "bottom";
    };
    readonly visible: {
        readonly type: import("vue").PropType<boolean | null>;
        readonly default: null;
    };
    readonly disabled: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly showAfter: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly hideAfter: {
        readonly type: NumberConstructor;
        readonly default: 150;
    };
    readonly zIndex: {
        readonly type: NumberConstructor;
        readonly default: 2000;
    };
    readonly hideOnClick: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly items: {
        readonly type: import("vue").PropType<import("./dropdown").DropdownItemData[]>;
        readonly default: () => never[];
    };
    readonly loading: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly emptyText: {
        readonly type: StringConstructor;
        readonly default: undefined;
    };
    readonly checkable: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly maxHeight: {
        readonly type: import("vue").PropType<string | number>;
        readonly default: "";
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
        readonly type: import("vue").PropType<CSSProperties>;
        readonly default: () => {};
    };
    readonly splitButton: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly type: {
        readonly type: import("vue").PropType<"primary" | "success" | "warning" | "danger" | "info" | "">;
        readonly default: "";
    };
    readonly size: {
        readonly type: import("vue").PropType<"large" | "default" | "small">;
        readonly default: "default";
    };
    readonly plain: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly showArrow: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly popperArrow: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly offset: {
        readonly type: import("vue").PropType<[number, number]>;
        readonly default: () => number[];
    };
    readonly loop: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly tabindex: {
        readonly type: import("vue").PropType<number | string>;
        readonly default: 0;
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>> & Readonly<{
    onClick?: ((event: MouseEvent) => any) | undefined;
    onHide?: (() => any) | undefined;
    onShow?: (() => any) | undefined;
    "onUpdate:visible"?: ((visible: boolean) => any) | undefined;
    onCommand?: ((_command: string | number | object) => any) | undefined;
}>, {
    readonly size: "large" | "default" | "small";
    readonly loading: boolean;
    readonly emptyText: string;
    readonly trigger: import("./dropdown").DropdownTrigger;
    readonly type: "" | "success" | "warning" | "info" | "primary" | "danger";
    readonly disabled: boolean;
    readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
    readonly plain: boolean;
    readonly tabindex: string | number;
    readonly maxHeight: string | number;
    readonly zIndex: number;
    readonly offset: [number, number];
    readonly visible: boolean | null;
    readonly checkable: boolean;
    readonly items: import("./dropdown").DropdownItemData[];
    readonly placement: import("@floating-ui/utils").Placement;
    readonly popperClass: string;
    readonly teleported: boolean;
    readonly popperStyle: CSSProperties;
    readonly showAfter: number;
    readonly hideAfter: number;
    readonly showArrow: boolean;
    readonly loop: boolean;
    readonly hideOnClick: boolean;
    readonly splitButton: boolean;
    readonly popperArrow: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
