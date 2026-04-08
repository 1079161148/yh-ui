import type { ExtractPropTypes, PropType, StyleValue } from 'vue';
import type { TooltipPlacement } from '../../tooltip/src/tooltip';
export declare const popconfirmProps: {
    /** 标题 */
    readonly title: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    /** 描述内容 */
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
    /** 确认按钮类型 */
    readonly confirmButtonType: {
        readonly type: PropType<"default" | "primary" | "success" | "warning" | "danger" | "info">;
        readonly default: "primary";
    };
    /** 取消按钮类型 */
    readonly cancelButtonType: {
        readonly type: PropType<"default" | "primary" | "success" | "warning" | "danger" | "info">;
        readonly default: "default";
    };
    /** 图标 */
    readonly icon: {
        readonly type: StringConstructor;
        readonly default: "warning";
    };
    /** 图标颜色 */
    readonly iconColor: {
        readonly type: StringConstructor;
        readonly default: "#faad14";
    };
    /** 是否隐藏图标 */
    readonly hideIcon: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /** 是否隐藏取消按钮 */
    readonly hideCancel: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /** 偏移量 [skidding, distance] */
    readonly offset: {
        readonly type: PropType<[number, number]>;
        readonly default: () => number[];
    };
    /** 出现位置 */
    readonly placement: {
        readonly type: PropType<TooltipPlacement>;
        readonly default: "top";
    };
    /** 手动控制可见性 */
    readonly visible: {
        readonly type: PropType<boolean | null>;
        readonly default: null;
    };
    /** 宽度 */
    readonly width: {
        readonly type: PropType<string | number>;
        readonly default: 180;
    };
    /** 是否禁用 */
    readonly disabled: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /** z-index */
    readonly zIndex: {
        readonly type: NumberConstructor;
        readonly default: 2000;
    };
    /** 是否显示小三角 */
    readonly showArrow: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    /** 弹出层的自定义类名 */
    readonly popperClass: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    /** 弹出层自定义样式 */
    readonly popperStyle: {
        readonly type: PropType<StyleValue>;
        readonly default: () => {};
    };
    /** 挂载节点 */
    readonly teleported: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    /** 是否显示“不再提示”勾选框 (高级自创功能) */
    readonly showDontAskAgain: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly dontAskAgainText: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    /** 是否反置确认和取消按钮位置 (高级自创功能) */
    readonly swapButtons: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /** 确认前执行的异步逻辑 */
    readonly beforeConfirm: {
        readonly type: PropType<() => boolean | Promise<boolean>>;
        readonly default: null;
    };
    /** 主题覆盖变量 */
    readonly themeOverrides: {
        readonly type: PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
};
export declare const popconfirmEmits: {
    confirm: (_dontAskAgain?: boolean) => boolean;
    cancel: () => boolean;
    'update:visible': (visible: boolean) => boolean;
};
export type PopconfirmProps = ExtractPropTypes<typeof popconfirmProps>;
export type PopconfirmEmits = typeof popconfirmEmits;
