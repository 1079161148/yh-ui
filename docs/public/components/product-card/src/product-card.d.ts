import type { ExtractPropTypes, PropType } from 'vue';
export type ProductCardLayout = 'vertical' | 'horizontal' | 'compact' | 'grid';
export interface ProductBadge {
    text?: string;
    image?: string;
    type?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
    color?: string;
}
export declare const productCardProps: {
    /** 商品图片 */
    image: {
        type: StringConstructor;
        default: string;
    };
    /** 鼠标悬浮切换图 */
    hoverImage: {
        type: StringConstructor;
        default: string;
    };
    /** 视频预览地址 */
    videoSrc: {
        type: StringConstructor;
        default: string;
    };
    /** 商品标题 */
    title: {
        type: StringConstructor;
        default: string;
    };
    /** 副标题/属性简述 */
    description: {
        type: StringConstructor;
        default: string;
    };
    /** 当前售价 */
    price: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    /** 会员价/到手价 */
    vipPrice: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    /** 会员价标签文本 (默认 "会员价") */
    vipLabel: {
        type: StringConstructor;
        default: string;
    };
    /** 划线价/参考价 */
    marketPrice: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    /** 货币符号 */
    currency: {
        type: StringConstructor;
        default: string;
    };
    /** 价格后置单位 (如: /件, /kg) */
    unit: {
        type: StringConstructor;
        default: string;
    };
    /** 营销丝带文本 (推荐) */
    ribbon: {
        type: StringConstructor;
        default: string;
    };
    /** 丝带背景颜色 */
    ribbonColor: {
        type: StringConstructor;
        default: string;
    };
    /** 兼容性：标题标签文本 (不推荐，建议使用 ribbons 或 badges) */
    tag: {
        type: StringConstructor;
        default: string;
    };
    /** 兼容性：标签颜色类型 */
    tagType: {
        type: PropType<"primary" | "success" | "warning" | "danger" | "info">;
        default: string;
    };
    /** 标签组 (支持图片 or 文本标签) */
    badges: {
        type: PropType<ProductBadge[]>;
        default: () => never[];
    };
    /** 布局模式 */
    layout: {
        type: PropType<ProductCardLayout>;
        default: string;
    };
    /** 是否开启图片懒加载 */
    lazy: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 库存进度（0-100） */
    stockProgress: {
        type: NumberConstructor;
        default: number;
    };
    /** 库存进度条颜色 (支持渐变色) */
    stockColor: {
        type: StringConstructor;
        default: string;
    };
    /** 库存文字提示 */
    stockText: {
        type: StringConstructor;
        default: string;
    };
    /** 是否显示边框 */
    border: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 是否开启悬浮阴影 */
    shadow: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 是否只读 (隐藏所有操作按钮) */
    readonly: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 操作按钮文本 */
    actionText: {
        type: StringConstructor;
        default: string;
    };
    /** 按钮加载态 */
    actionLoading: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 是否已售罄/禁用 */
    soldOut: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 是否开启曝光监听 */
    exposure: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 曝光上报阈值 (0-1) */
    exposureThreshold: {
        type: NumberConstructor;
        default: number;
    };
    /** 曝光成功后是否只上报一次 */
    exposureOnce: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 标题显示行数限制 (多行截断) */
    titleLines: {
        type: NumberConstructor;
        default: number;
    };
    /** 描述显示行数限制 (多行截断) */
    descriptionLines: {
        type: NumberConstructor;
        default: number;
    };
    /** 标签显示位置 */
    badgePosition: {
        type: PropType<"top" | "inline">;
        default: string;
    };
    /** 主题覆盖 */
    themeOverrides: {
        type: PropType<Record<string, string>>;
        default: () => {};
    };
};
export type ProductCardProps = ExtractPropTypes<typeof productCardProps>;
export declare const productCardEmits: {
    click: (e: MouseEvent) => boolean;
    action: (e: MouseEvent) => boolean;
    /** 曝光上报事件 */
    expose: () => boolean;
};
export type ProductCardEmits = typeof productCardEmits;
