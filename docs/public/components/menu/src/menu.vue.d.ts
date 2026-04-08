declare var __VLS_1: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_1) => any;
};
declare const __VLS_component: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly mode: {
        readonly type: import("vue").PropType<import("./menu").MenuMode>;
        readonly default: "vertical";
    };
    readonly defaultActive: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly defaultOpeneds: {
        readonly type: import("vue").PropType<string[]>;
        readonly default: () => never[];
    };
    readonly uniqueOpened: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly menuTrigger: {
        readonly type: import("vue").PropType<import("./menu").MenuTrigger>;
        readonly default: "hover";
    };
    readonly collapse: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly collapseTransition: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly router: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly backgroundColor: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly textColor: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly activeTextColor: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly ellipsis: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly popperZIndex: {
        readonly type: NumberConstructor;
        readonly default: 2000;
    };
    readonly teleported: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly gap: {
        readonly type: NumberConstructor;
        readonly default: 4;
    };
    readonly ellipsisIcon: {
        readonly type: import("vue").PropType<string | import("vue").Component>;
        readonly default: "";
    };
    readonly popperOffset: {
        readonly type: NumberConstructor;
        readonly default: 6;
    };
    readonly popperEffect: {
        readonly type: import("vue").PropType<"dark" | "light">;
        readonly default: "light";
    };
    readonly closeOnClickOutside: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly popperClass: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly popperStyle: {
        readonly type: import("vue").PropType<import("vue").StyleValue>;
        readonly default: "";
    };
    readonly showTimeout: {
        readonly type: NumberConstructor;
        readonly default: 300;
    };
    readonly hideTimeout: {
        readonly type: NumberConstructor;
        readonly default: 300;
    };
    readonly persistent: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly iconSize: {
        readonly type: NumberConstructor;
        readonly default: 20;
    };
    readonly indent: {
        readonly type: NumberConstructor;
        readonly default: 32;
    };
    readonly rootIndent: {
        readonly type: NumberConstructor;
        readonly default: undefined;
    };
    readonly expandAll: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly renderExtra: {
        readonly type: import("vue").PropType<(option: import("./menu").MenuItemData) => import("vue").VNodeChild>;
        readonly default: undefined;
    };
    readonly renderIcon: {
        readonly type: import("vue").PropType<(option: import("./menu").MenuItemData) => import("vue").VNodeChild>;
        readonly default: undefined;
    };
    readonly renderLabel: {
        readonly type: import("vue").PropType<(option: import("./menu").MenuItemData) => import("vue").VNodeChild>;
        readonly default: undefined;
    };
    readonly responsive: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly value: {
        readonly type: import("vue").PropType<string | null>;
        readonly default: undefined;
    };
    readonly options: {
        readonly type: import("vue").PropType<import("./menu").MenuItemData[]>;
        readonly default: () => never[];
    };
    readonly inverted: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly keyField: {
        readonly type: StringConstructor;
        readonly default: "key";
    };
    readonly labelField: {
        readonly type: StringConstructor;
        readonly default: "label";
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>, {
    open: (index: string) => void;
    close: (index: string) => void;
    activeIndex: import("vue").Ref<string, string>;
    openedMenus: import("vue").Ref<string[], string[]>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    select: (_index: string, _indexPath: string[], _item: import("./menu").MenuItemData | undefined, _routeResult?: Promise<void> | undefined) => void;
    close: (_index: string, _indexPath: string[]) => void;
    open: (_index: string, _indexPath: string[]) => void;
    "update:value": (_value: string) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly mode: {
        readonly type: import("vue").PropType<import("./menu").MenuMode>;
        readonly default: "vertical";
    };
    readonly defaultActive: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly defaultOpeneds: {
        readonly type: import("vue").PropType<string[]>;
        readonly default: () => never[];
    };
    readonly uniqueOpened: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly menuTrigger: {
        readonly type: import("vue").PropType<import("./menu").MenuTrigger>;
        readonly default: "hover";
    };
    readonly collapse: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly collapseTransition: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly router: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly backgroundColor: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly textColor: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly activeTextColor: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly ellipsis: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly popperZIndex: {
        readonly type: NumberConstructor;
        readonly default: 2000;
    };
    readonly teleported: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly gap: {
        readonly type: NumberConstructor;
        readonly default: 4;
    };
    readonly ellipsisIcon: {
        readonly type: import("vue").PropType<string | import("vue").Component>;
        readonly default: "";
    };
    readonly popperOffset: {
        readonly type: NumberConstructor;
        readonly default: 6;
    };
    readonly popperEffect: {
        readonly type: import("vue").PropType<"dark" | "light">;
        readonly default: "light";
    };
    readonly closeOnClickOutside: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly popperClass: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly popperStyle: {
        readonly type: import("vue").PropType<import("vue").StyleValue>;
        readonly default: "";
    };
    readonly showTimeout: {
        readonly type: NumberConstructor;
        readonly default: 300;
    };
    readonly hideTimeout: {
        readonly type: NumberConstructor;
        readonly default: 300;
    };
    readonly persistent: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly iconSize: {
        readonly type: NumberConstructor;
        readonly default: 20;
    };
    readonly indent: {
        readonly type: NumberConstructor;
        readonly default: 32;
    };
    readonly rootIndent: {
        readonly type: NumberConstructor;
        readonly default: undefined;
    };
    readonly expandAll: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly renderExtra: {
        readonly type: import("vue").PropType<(option: import("./menu").MenuItemData) => import("vue").VNodeChild>;
        readonly default: undefined;
    };
    readonly renderIcon: {
        readonly type: import("vue").PropType<(option: import("./menu").MenuItemData) => import("vue").VNodeChild>;
        readonly default: undefined;
    };
    readonly renderLabel: {
        readonly type: import("vue").PropType<(option: import("./menu").MenuItemData) => import("vue").VNodeChild>;
        readonly default: undefined;
    };
    readonly responsive: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly value: {
        readonly type: import("vue").PropType<string | null>;
        readonly default: undefined;
    };
    readonly options: {
        readonly type: import("vue").PropType<import("./menu").MenuItemData[]>;
        readonly default: () => never[];
    };
    readonly inverted: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly keyField: {
        readonly type: StringConstructor;
        readonly default: "key";
    };
    readonly labelField: {
        readonly type: StringConstructor;
        readonly default: "label";
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>> & Readonly<{
    onSelect?: ((_index: string, _indexPath: string[], _item: import("./menu").MenuItemData | undefined, _routeResult?: Promise<void> | undefined) => any) | undefined;
    onClose?: ((_index: string, _indexPath: string[]) => any) | undefined;
    onOpen?: ((_index: string, _indexPath: string[]) => any) | undefined;
    "onUpdate:value"?: ((_value: string) => any) | undefined;
}>, {
    readonly mode: import("./menu").MenuMode;
    readonly value: string | null;
    readonly collapse: boolean;
    readonly expandAll: boolean;
    readonly responsive: boolean;
    readonly textColor: string;
    readonly activeTextColor: string;
    readonly gap: number;
    readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
    readonly iconSize: number;
    readonly backgroundColor: string;
    readonly ellipsis: boolean;
    readonly options: import("./menu").MenuItemData[];
    readonly popperClass: string;
    readonly teleported: boolean;
    readonly popperStyle: import("vue").StyleValue;
    readonly popperOffset: number;
    readonly indent: number;
    readonly persistent: boolean;
    readonly defaultActive: string;
    readonly defaultOpeneds: string[];
    readonly uniqueOpened: boolean;
    readonly menuTrigger: import("./menu").MenuTrigger;
    readonly collapseTransition: boolean;
    readonly router: boolean;
    readonly popperZIndex: number;
    readonly ellipsisIcon: string | import("vue").Component;
    readonly popperEffect: "dark" | "light";
    readonly closeOnClickOutside: boolean;
    readonly showTimeout: number;
    readonly hideTimeout: number;
    readonly rootIndent: number;
    readonly renderExtra: (option: import("./menu").MenuItemData) => import("vue").VNodeChild;
    readonly renderIcon: (option: import("./menu").MenuItemData) => import("vue").VNodeChild;
    readonly renderLabel: (option: import("./menu").MenuItemData) => import("vue").VNodeChild;
    readonly inverted: boolean;
    readonly keyField: string;
    readonly labelField: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
