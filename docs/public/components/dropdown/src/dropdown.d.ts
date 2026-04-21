import type { ExtractPropTypes, PropType, CSSProperties, InjectionKey, Ref } from 'vue';
import type { Placement } from '@floating-ui/dom';
export type DropdownTrigger = 'hover' | 'click' | 'contextmenu';
export interface DropdownItemData {
    /** 唯一标识 */
    key: string | number;
    /** 显示文本 */
    label: string;
    /** 图标 */
    icon?: string;
    /** 是否禁用 */
    disabled?: boolean;
    /** 是否显示分割线 */
    divided?: boolean;
    /** 自定义类名 */
    class?: string;
    /** 子菜单 */
    children?: DropdownItemData[];
    /** 是否为危险项（红色样式） */
    danger?: boolean;
    /** 是否选中（checkable 模式） */
    checked?: boolean;
}
export declare const dropdownProps: {
    /** 触发方式 */
    readonly trigger: {
        readonly type: PropType<DropdownTrigger>;
        readonly default: "hover";
    };
    /** 弹出位置 */
    readonly placement: {
        readonly type: PropType<Placement>;
        readonly default: "bottom";
    };
    /** 是否显示 */
    readonly visible: {
        readonly type: PropType<boolean | null>;
        readonly default: null;
    };
    /** 是否禁用 */
    readonly disabled: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /** 延迟显示时间 (ms) */
    readonly showAfter: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    /** 延迟隐藏时间 (ms) */
    readonly hideAfter: {
        readonly type: NumberConstructor;
        readonly default: 150;
    };
    /** 弹出层层级 */
    readonly zIndex: {
        readonly type: NumberConstructor;
        readonly default: 2000;
    };
    /** 是否在点击菜单项后隐藏 */
    readonly hideOnClick: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    /** 菜单项数据（快捷配置模式） */
    readonly items: {
        readonly type: PropType<DropdownItemData[]>;
        readonly default: () => never[];
    };
    /** 是否加载中 */
    readonly loading: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /** 空状态文本 */
    readonly emptyText: {
        readonly type: StringConstructor;
        readonly default: undefined;
    };
    /** 是否可勾选 */
    readonly checkable: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /** 触发元素的最大宽度 */
    readonly maxHeight: {
        readonly type: PropType<string | number>;
        readonly default: "";
    };
    /** 是否挂载至 body */
    readonly teleported: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    /** 弹出层自定义类名 */
    readonly popperClass: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    /** 弹出层自定义样式 */
    readonly popperStyle: {
        readonly type: PropType<CSSProperties>;
        readonly default: () => {};
    };
    /** 分割按钮模式 */
    readonly splitButton: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /** 按钮类型（splitButton 模式） */
    readonly type: {
        readonly type: PropType<"primary" | "success" | "warning" | "danger" | "info" | "">;
        readonly default: "";
    };
    /** 按钮尺寸 */
    readonly size: {
        readonly type: PropType<"large" | "default" | "small">;
        readonly default: "default";
    };
    /** 按钮是否为朴素样式（splitButton 模式） */
    readonly plain: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /** 是否显示箭头图标 */
    readonly showArrow: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    /** 是否显示弹出框小三角 */
    readonly popperArrow: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    /** 偏移量 */
    readonly offset: {
        readonly type: PropType<[number, number]>;
        readonly default: () => number[];
    };
    /** Tab 键循环导航 */
    readonly loop: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    /** Tab 索引 */
    readonly tabindex: {
        readonly type: PropType<number | string>;
        readonly default: 0;
    };
    /** 主题覆盖变量 */
    readonly themeOverrides: {
        readonly type: PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
};
export declare const dropdownEmits: {
    'update:visible': (visible: boolean) => boolean;
    /** 点击菜单项 */
    command: (_command: string | number | object) => boolean;
    /** 菜单显示 */
    show: () => boolean;
    /** 菜单隐藏 */
    hide: () => boolean;
    /** 点击触发器（splitButton 模式） */
    click: (event: MouseEvent) => boolean;
};
export type DropdownProps = ExtractPropTypes<typeof dropdownProps>;
export type DropdownEmits = typeof dropdownEmits;
export interface DropdownSlots {
    default?: () => unknown;
    dropdown?: () => unknown;
}
export declare const dropdownItemProps: {
    /** 指令/命令值 */
    readonly command: {
        readonly type: PropType<string | number | object>;
        readonly default: "";
    };
    /** 是否禁用 */
    readonly disabled: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /** 是否显示分割线 */
    readonly divided: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /** 图标 */
    readonly icon: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    /** 是否为危险项 */
    readonly danger: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /** 是否选中 */
    readonly checked: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /** 主题覆盖变量 */
    readonly themeOverrides: {
        readonly type: PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
};
export type DropdownItemProps = ExtractPropTypes<typeof dropdownItemProps>;
export declare const dropdownMenuProps: {
    /** 主题覆盖变量 */
    readonly themeOverrides: {
        readonly type: PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
};
export type DropdownMenuProps = ExtractPropTypes<typeof dropdownMenuProps>;
export interface DropdownContext {
    hideOnClick: Ref<boolean>;
    checkable: Ref<boolean>;
    handleItemClick: (command: string | number | object) => void;
}
export declare const DROPDOWN_INJECTION_KEY: InjectionKey<DropdownContext>;
export interface DropdownExpose {
    show: () => void;
    hide: () => void;
    visible: Ref<boolean>;
}
