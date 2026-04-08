import type { ExtractPropTypes, PropType, InjectionKey, Ref } from 'vue';
export declare const tabsTypes: readonly ["line", "card", "border-card", "segment"];
export type TabsType = (typeof tabsTypes)[number];
export declare const tabsPositions: readonly ["top", "right", "bottom", "left"];
export type TabsPosition = (typeof tabsPositions)[number];
export interface TabPaneConfig {
    name: string;
    label: string;
    disabled?: boolean;
    closable?: boolean;
    lazy?: boolean;
    icon?: string;
}
export declare const tabsProps: {
    /** 当前激活的标签名 */
    readonly modelValue: {
        readonly type: PropType<string | number>;
        readonly default: "";
    };
    /** 标签类型 */
    readonly type: {
        readonly type: PropType<TabsType>;
        readonly default: "line";
    };
    /** 标签位置 */
    readonly tabPosition: {
        readonly type: PropType<TabsPosition>;
        readonly default: "top";
    };
    /** 是否可拖拽排序 (Premium) */
    readonly draggable: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /** 是否可关闭标签 */
    readonly closable: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /** 是否可新增标签 */
    readonly addable: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /** 同时可编辑（可关闭+可新增） */
    readonly editable: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /** 切换前钩子，返回 false 或 Promise.reject 可阻止切换 */
    readonly beforeLeave: {
        readonly type: PropType<(newName: string | number, oldName: string | number) => boolean | Promise<boolean>>;
    };
    /** 是否撑满容器 */
    readonly stretch: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /** 标签栏自定义类名 */
    readonly navClass: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    /** 内容区自定义类名 */
    readonly contentClass: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    /** 指示器宽度（水平方向时为长度，垂直方向时为粗细），如 '50%'、'80px'、'auto' */
    readonly indicatorWidth: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    /** 指示器高度（垂直方向时为长度，水平方向时为粗细），如 '50%'、'80px'、'auto' */
    readonly indicatorHeight: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    /** 选中态颜色 */
    readonly activeColor: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    /** 未选中态颜色 */
    readonly inactiveColor: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    /** 触发方式 */
    readonly trigger: {
        readonly type: PropType<"click" | "hover">;
        readonly default: "click";
    };
    /** 主题覆盖变量 */
    readonly themeOverrides: {
        readonly type: PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
};
export type TabsProps = ExtractPropTypes<typeof tabsProps>;
export declare const tabsEmits: {
    'update:modelValue': (name: string | number) => boolean;
    'tab-click': (pane: TabPaneConfig, _ev: Event) => boolean;
    'tab-change': (name: string | number) => boolean;
    'tab-remove': (name: string | number) => boolean;
    'tab-add': () => boolean;
    'tab-drag-end': (names: (string | number)[]) => boolean;
};
export type TabsEmits = typeof tabsEmits;
export interface TabsContext {
    activeTab: Ref<string | number>;
    registerPane: (pane: TabPaneConfig) => void;
    unregisterPane: (name: string) => void;
    activateTab: (name: string | number) => void;
}
export declare const TABS_INJECTION_KEY: InjectionKey<TabsContext>;
