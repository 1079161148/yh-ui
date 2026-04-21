declare var __VLS_5: {}, __VLS_7: {}, __VLS_9: {};
type __VLS_Slots = {} & {
    title?: (props: typeof __VLS_5) => any;
} & {
    description?: (props: typeof __VLS_7) => any;
} & {
    footer?: (props: typeof __VLS_9) => any;
};
declare const __VLS_component: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    image: {
        type: StringConstructor;
        default: string;
    };
    hoverImage: {
        type: StringConstructor;
        default: string;
    };
    videoSrc: {
        type: StringConstructor;
        default: string;
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    description: {
        type: StringConstructor;
        default: string;
    };
    price: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    vipPrice: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    vipLabel: {
        type: StringConstructor;
        default: string;
    };
    marketPrice: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    currency: {
        type: StringConstructor;
        default: string;
    };
    unit: {
        type: StringConstructor;
        default: string;
    };
    ribbon: {
        type: StringConstructor;
        default: string;
    };
    ribbonColor: {
        type: StringConstructor;
        default: string;
    };
    tag: {
        type: StringConstructor;
        default: string;
    };
    tagType: {
        type: import("vue").PropType<"primary" | "success" | "warning" | "danger" | "info">;
        default: string;
    };
    badges: {
        type: import("vue").PropType<import("./product-card").ProductBadge[]>;
        default: () => never[];
    };
    layout: {
        type: import("vue").PropType<import("./product-card").ProductCardLayout>;
        default: string;
    };
    lazy: {
        type: BooleanConstructor;
        default: boolean;
    };
    stockProgress: {
        type: NumberConstructor;
        default: number;
    };
    stockColor: {
        type: StringConstructor;
        default: string;
    };
    stockText: {
        type: StringConstructor;
        default: string;
    };
    border: {
        type: BooleanConstructor;
        default: boolean;
    };
    shadow: {
        type: BooleanConstructor;
        default: boolean;
    };
    readonly: {
        type: BooleanConstructor;
        default: boolean;
    };
    actionText: {
        type: StringConstructor;
        default: string;
    };
    actionLoading: {
        type: BooleanConstructor;
        default: boolean;
    };
    soldOut: {
        type: BooleanConstructor;
        default: boolean;
    };
    exposure: {
        type: BooleanConstructor;
        default: boolean;
    };
    exposureThreshold: {
        type: NumberConstructor;
        default: number;
    };
    exposureOnce: {
        type: BooleanConstructor;
        default: boolean;
    };
    titleLines: {
        type: NumberConstructor;
        default: number;
    };
    descriptionLines: {
        type: NumberConstructor;
        default: number;
    };
    badgePosition: {
        type: import("vue").PropType<"top" | "inline">;
        default: string;
    };
    themeOverrides: {
        type: import("vue").PropType<Record<string, string>>;
        default: () => {};
    };
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    expose: () => void;
    click: (e: MouseEvent) => void;
    action: (e: MouseEvent) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    image: {
        type: StringConstructor;
        default: string;
    };
    hoverImage: {
        type: StringConstructor;
        default: string;
    };
    videoSrc: {
        type: StringConstructor;
        default: string;
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    description: {
        type: StringConstructor;
        default: string;
    };
    price: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    vipPrice: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    vipLabel: {
        type: StringConstructor;
        default: string;
    };
    marketPrice: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    currency: {
        type: StringConstructor;
        default: string;
    };
    unit: {
        type: StringConstructor;
        default: string;
    };
    ribbon: {
        type: StringConstructor;
        default: string;
    };
    ribbonColor: {
        type: StringConstructor;
        default: string;
    };
    tag: {
        type: StringConstructor;
        default: string;
    };
    tagType: {
        type: import("vue").PropType<"primary" | "success" | "warning" | "danger" | "info">;
        default: string;
    };
    badges: {
        type: import("vue").PropType<import("./product-card").ProductBadge[]>;
        default: () => never[];
    };
    layout: {
        type: import("vue").PropType<import("./product-card").ProductCardLayout>;
        default: string;
    };
    lazy: {
        type: BooleanConstructor;
        default: boolean;
    };
    stockProgress: {
        type: NumberConstructor;
        default: number;
    };
    stockColor: {
        type: StringConstructor;
        default: string;
    };
    stockText: {
        type: StringConstructor;
        default: string;
    };
    border: {
        type: BooleanConstructor;
        default: boolean;
    };
    shadow: {
        type: BooleanConstructor;
        default: boolean;
    };
    readonly: {
        type: BooleanConstructor;
        default: boolean;
    };
    actionText: {
        type: StringConstructor;
        default: string;
    };
    actionLoading: {
        type: BooleanConstructor;
        default: boolean;
    };
    soldOut: {
        type: BooleanConstructor;
        default: boolean;
    };
    exposure: {
        type: BooleanConstructor;
        default: boolean;
    };
    exposureThreshold: {
        type: NumberConstructor;
        default: number;
    };
    exposureOnce: {
        type: BooleanConstructor;
        default: boolean;
    };
    titleLines: {
        type: NumberConstructor;
        default: number;
    };
    descriptionLines: {
        type: NumberConstructor;
        default: number;
    };
    badgePosition: {
        type: import("vue").PropType<"top" | "inline">;
        default: string;
    };
    themeOverrides: {
        type: import("vue").PropType<Record<string, string>>;
        default: () => {};
    };
}>> & Readonly<{
    onExpose?: (() => any) | undefined;
    onClick?: ((e: MouseEvent) => any) | undefined;
    onAction?: ((e: MouseEvent) => any) | undefined;
}>, {
    title: string;
    price: string | number;
    image: string;
    tag: string;
    description: string;
    soldOut: boolean;
    readonly: boolean;
    themeOverrides: Record<string, string>;
    border: boolean;
    layout: import("./product-card").ProductCardLayout;
    tagType: "success" | "warning" | "info" | "primary" | "danger";
    lazy: boolean;
    shadow: boolean;
    marketPrice: string | number;
    unit: string;
    hoverImage: string;
    videoSrc: string;
    vipPrice: string | number;
    vipLabel: string;
    currency: string;
    ribbon: string;
    ribbonColor: string;
    badges: import("./product-card").ProductBadge[];
    stockProgress: number;
    stockColor: string;
    stockText: string;
    actionText: string;
    actionLoading: boolean;
    exposure: boolean;
    exposureThreshold: number;
    exposureOnce: boolean;
    titleLines: number;
    descriptionLines: number;
    badgePosition: "inline" | "top";
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
