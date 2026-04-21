import type { ExtractPropTypes, PropType, InjectionKey, Ref, Component, VNodeChild, StyleValue } from 'vue';
export type MenuMode = 'horizontal' | 'vertical';
export type MenuTrigger = 'hover' | 'click';
export interface MenuItemData {
    /** 唯一标识 */
    key?: string;
    /** 索引 (别名) */
    index?: string;
    /** 显示文本 */
    label: string;
    /** 图标 */
    icon?: string;
    /** 是否禁用 */
    disabled?: boolean;
    /** 子菜单 */
    children?: MenuItemData[];
    /** 分组标题（仅用于分组） */
    group?: boolean;
    /** 允许自定义扩展属性 - 使用 unknown 以支持动态属性访问 */
    [key: string]: unknown;
}
export declare const menuProps: {
    /** 菜单模式 */
    readonly mode: {
        readonly type: PropType<MenuMode>;
        readonly default: "vertical";
    };
    /** 当前激活菜单的 index */
    readonly defaultActive: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    /** 当前打开的 sub-menu 的 index 数组 */
    readonly defaultOpeneds: {
        readonly type: PropType<string[]>;
        readonly default: () => never[];
    };
    /** 是否只保持一个子菜单展开 */
    readonly uniqueOpened: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /** 子菜单打开触发方式 */
    readonly menuTrigger: {
        readonly type: PropType<MenuTrigger>;
        readonly default: "hover";
    };
    /** 是否开启折叠模式（仅 vertical 模式） */
    readonly collapse: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /** 折叠动画是否开启 */
    readonly collapseTransition: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    /** 是否启用 vue-router 模式 */
    readonly router: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /** 背景色 */
    readonly backgroundColor: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    /** 文字颜色 */
    readonly textColor: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    /** 激活项文字颜色 */
    readonly activeTextColor: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    /** 是否开启省略模式 (水平模式下) */
    readonly ellipsis: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    /** 子菜单弹出层层级 */
    readonly popperZIndex: {
        readonly type: NumberConstructor;
        readonly default: 2000;
    };
    /** 是否将弹出菜单挂载至 body */
    readonly teleported: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    /** 菜单项间距 */
    readonly gap: {
        readonly type: NumberConstructor;
        readonly default: 4;
    };
    /** 自定义省略图标 */
    readonly ellipsisIcon: {
        readonly type: PropType<string | Component>;
        readonly default: "";
    };
    /** 弹出层的偏移量 (对所有子菜单有效) */
    readonly popperOffset: {
        readonly type: NumberConstructor;
        readonly default: 6;
    };
    /** Tooltip 主题，当垂直折叠或水平模式时生效 */
    readonly popperEffect: {
        readonly type: PropType<"dark" | "light">;
        readonly default: "light";
    };
    /** 单击外部时是否折叠菜单 */
    readonly closeOnClickOutside: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    /** 所有弹出菜单的自定义类名 */
    readonly popperClass: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    /** 所有弹出菜单的自定义样式 */
    readonly popperStyle: {
        readonly type: PropType<StyleValue>;
        readonly default: "";
    };
    /** 菜单出现前的延迟 */
    readonly showTimeout: {
        readonly type: NumberConstructor;
        readonly default: 300;
    };
    /** 菜单消失前的延迟 */
    readonly hideTimeout: {
        readonly type: NumberConstructor;
        readonly default: 300;
    };
    /** 当菜单处于非活动状态时，子菜单是否将被销毁 */
    readonly persistent: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    /** 菜单未折叠时图标的大小 */
    readonly iconSize: {
        readonly type: NumberConstructor;
        readonly default: 20;
    };
    /** 菜单每级的缩进 */
    readonly indent: {
        readonly type: NumberConstructor;
        readonly default: 32;
    };
    /** 菜单第一级的缩进，如果没有设定，使用 indent 代替 */
    readonly rootIndent: {
        readonly type: NumberConstructor;
        readonly default: undefined;
    };
    /** 是否展开全部菜单 */
    readonly expandAll: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /** 批量处理菜单额外部分渲染 */
    readonly renderExtra: {
        readonly type: PropType<(option: MenuItemData) => VNodeChild>;
        readonly default: undefined;
    };
    /** 批量处理菜单图标渲染 */
    readonly renderIcon: {
        readonly type: PropType<(option: MenuItemData) => VNodeChild>;
        readonly default: undefined;
    };
    /** 批量处理菜单标签渲染 */
    readonly renderLabel: {
        readonly type: PropType<(option: MenuItemData) => VNodeChild>;
        readonly default: undefined;
    };
    /** 是否收起溢出的菜单，仅对 mode='horizontal' 的菜单生效 */
    readonly responsive: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /** 菜单当前的选中值 */
    readonly value: {
        readonly type: PropType<string | null>;
        readonly default: undefined;
    };
    /** 菜单配置项，支持从数据驱动生成菜单 */
    readonly options: {
        readonly type: PropType<MenuItemData[]>;
        readonly default: () => never[];
    };
    /** 是否使用反转样式 */
    readonly inverted: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /** key 的字段名 */
    readonly keyField: {
        readonly type: StringConstructor;
        readonly default: "key";
    };
    /** label 的字段名 */
    readonly labelField: {
        readonly type: StringConstructor;
        readonly default: "label";
    };
    /** 主题覆盖变量 */
    readonly themeOverrides: {
        readonly type: PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
};
export declare const menuEmits: {
    /** v-model:value */
    'update:value': (_value: string) => boolean;
    /** 菜单激活回调 */
    select: (_index: string, _indexPath: string[], _item: MenuItemData | undefined, _routeResult?: Promise<void>) => boolean;
    /** 子菜单展开回调 */
    open: (_index: string, _indexPath: string[]) => boolean;
    /** 子菜单收起回调 */
    close: (_index: string, _indexPath: string[]) => boolean;
};
export type MenuProps = ExtractPropTypes<typeof menuProps>;
export type MenuEmits = typeof menuEmits;
export interface MenuSlots {
    default?: () => unknown;
}
export declare const menuItemProps: {
    /** 唯一标识 */
    readonly index: {
        readonly type: StringConstructor;
        readonly required: true;
    };
    /** vue-router 路由对象 */
    readonly route: {
        readonly type: PropType<string | object>;
        readonly default: "";
    };
    /** 是否禁用 */
    readonly disabled: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /** 显示文本 */
    readonly label: {
        readonly type: StringConstructor;
        readonly default: "";
    };
};
export type MenuItemProps = ExtractPropTypes<typeof menuItemProps>;
export declare const menuItemGroupProps: {
    /** 分组标题 */
    readonly title: {
        readonly type: StringConstructor;
        readonly default: "";
    };
};
export type MenuItemGroupProps = ExtractPropTypes<typeof menuItemGroupProps>;
export declare const subMenuProps: {
    /** 唯一标识 */
    readonly index: {
        readonly type: StringConstructor;
        readonly required: true;
    };
    /** 弹出菜单的自定义类名 */
    readonly popperClass: {
        readonly type: StringConstructor;
        readonly default: undefined;
    };
    /** 是否禁用 */
    readonly disabled: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /** 展开收起的延时 */
    readonly showTimeout: {
        readonly type: NumberConstructor;
        readonly default: undefined;
    };
    /** 收起的延时 */
    readonly hideTimeout: {
        readonly type: NumberConstructor;
        readonly default: undefined;
    };
    /** 弹出层偏移量 */
    readonly popperOffset: {
        readonly type: NumberConstructor;
        readonly default: undefined;
    };
    /** 显示文本 */
    readonly label: {
        readonly type: StringConstructor;
        readonly default: "";
    };
};
export type SubMenuProps = ExtractPropTypes<typeof subMenuProps>;
export interface MenuExpose {
    open: (index: string) => void;
    close: (index: string) => void;
    activeIndex: Ref<string>;
    openedMenus: Ref<string[]>;
}
export interface MenuContext {
    mode: Ref<MenuMode>;
    activeIndex: Ref<string>;
    openedMenus: Ref<string[]>;
    collapse: Ref<boolean>;
    backgroundColor: Ref<string>;
    textColor: Ref<string>;
    activeTextColor: Ref<string>;
    uniqueOpened: Ref<boolean>;
    menuTrigger: Ref<MenuTrigger>;
    popperZIndex: Ref<number>;
    teleported: Ref<boolean>;
    gap: Ref<number>;
    iconSize: Ref<number>;
    indent: Ref<number>;
    inverted: Ref<boolean>;
    keyField: Ref<string>;
    labelField: Ref<string>;
    popperOffset: Ref<number>;
    popperEffect: Ref<'dark' | 'light'>;
    popperClass: Ref<string>;
    popperStyle: Ref<StyleValue | undefined>;
    showTimeout: Ref<number>;
    hideTimeout: Ref<number>;
    persistent: Ref<boolean>;
    ellipsisIcon: Ref<string | Component>;
    closeOnClickOutside: Ref<boolean>;
    expandAll: Ref<boolean>;
    rootIndent: Ref<number | undefined>;
    renderExtra: Ref<((option: MenuItemData) => VNodeChild) | undefined>;
    renderIcon: Ref<((option: MenuItemData) => VNodeChild) | undefined>;
    renderLabel: Ref<((option: MenuItemData) => VNodeChild) | undefined>;
    responsive: Ref<boolean>;
    value: Ref<string | null | undefined>;
    options: Ref<MenuItemData[]>;
    handleSelect: (index: string, indexPath: string[]) => void;
    handleOpen: (index: string, indexPath: string[]) => void;
    handleClose: (index: string, indexPath: string[]) => void;
}
export declare const MENU_INJECTION_KEY: InjectionKey<MenuContext>;
export interface SubMenuContext {
    level: number;
    indexPath: string[];
}
export declare const SUB_MENU_INJECTION_KEY: InjectionKey<SubMenuContext>;
