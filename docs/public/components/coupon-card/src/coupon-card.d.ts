import type { ExtractPropTypes, PropType } from 'vue';
export type CouponStatus = 'available' | 'used' | 'expired' | 'locked';
export declare const couponCardProps: {
    /** 标题 */
    title: {
        type: StringConstructor;
        default: string;
    };
    /** 副标题/描述 */
    description: {
        type: StringConstructor;
        default: string;
    };
    /** 优惠金额/文本 */
    amount: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    /** 货币符号 */
    symbol: {
        type: StringConstructor;
        default: string;
    };
    /** 门槛描述/金额 */
    threshold: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    /** 有效期描述 */
    validPeriod: {
        type: StringConstructor;
        default: string;
    };
    /** 状态 */
    status: {
        type: PropType<CouponStatus>;
        default: string;
    };
    /** 按钮文本 */
    actionText: {
        type: StringConstructor;
        default: string;
    };
    /** 角标文本（如：即将过期、神券） */
    badge: {
        type: StringConstructor;
        default: string;
    };
    /** 角标类型（danger/warning/primary/success） */
    badgeType: {
        type: PropType<"danger" | "warning" | "primary" | "success">;
        default: string;
    };
    /** 疯抢进度百分比 (0-100) */
    percent: {
        type: NumberConstructor;
        default: undefined;
    };
    /** 进度提示文案（如：已抢 80%） */
    percentText: {
        type: StringConstructor;
        default: string;
    };
    /** 底部使用规则说明（支持折叠面板展开） */
    rules: {
        type: StringConstructor;
        default: string;
    };
    /** 底部使用规则展示的标题 */
    ruleTitle: {
        type: StringConstructor;
        default: string;
    };
    /** 是否显示选择框（多选场景） */
    selectable: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 是否选中 */
    selected: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 背景镂空样式：circle (半圆), indent (下凹), scallop (扇形) */
    variant: {
        type: PropType<"circle" | "indent" | "scallop">;
        default: string;
    };
    /** 是否禁用过期的显示效果 */
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 主题覆盖 */
    themeOverrides: {
        type: PropType<Record<string, string>>;
        default: () => {};
    };
};
export type CouponCardProps = ExtractPropTypes<typeof couponCardProps>;
export declare const couponCardEmits: {
    click: (e: MouseEvent) => boolean;
    action: (e: MouseEvent) => boolean;
    'update:selected': (val: boolean) => boolean;
};
export type CouponCardEmits = typeof couponCardEmits;
