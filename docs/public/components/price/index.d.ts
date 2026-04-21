import Price from './src/price.vue';
export declare const YhPrice: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("vue").ExtractPropTypes<{
        value: {
            type: (StringConstructor | NumberConstructor)[];
            default: number;
        };
        maxValue: {
            type: (StringConstructor | NumberConstructor)[];
            default: undefined;
        };
        symbol: {
            type: StringConstructor;
            default: string;
        };
        symbolPosition: {
            type: import("vue").PropType<"before" | "after">;
            default: string;
        };
        precision: {
            type: NumberConstructor;
            default: number;
        };
        lineThrough: {
            type: BooleanConstructor;
            default: boolean;
        };
        size: {
            type: import("vue").PropType<"small" | "default" | "large" | string>;
            default: string;
        };
        split: {
            type: BooleanConstructor;
            default: boolean;
        };
        decimalScale: {
            type: NumberConstructor;
            default: number;
        };
        thousandth: {
            type: BooleanConstructor;
            default: boolean;
        };
        bold: {
            type: BooleanConstructor;
            default: boolean;
        };
        prefix: {
            type: StringConstructor;
            default: string;
        };
        suffix: {
            type: StringConstructor;
            default: string;
        };
        unit: {
            type: StringConstructor;
            default: string;
        };
        deleteValue: {
            type: (StringConstructor | NumberConstructor)[];
            default: undefined;
        };
        deleteLabel: {
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
        approx: {
            type: BooleanConstructor;
            default: boolean;
        };
        animated: {
            type: BooleanConstructor;
            default: boolean;
        };
        gradient: {
            type: import("vue").PropType<boolean | string[]>;
            default: boolean;
        };
        themeOverrides: {
            type: import("vue").PropType<Record<string, string>>;
            default: () => {};
        };
    }>> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {
        symbol: string;
        size: string;
        split: boolean;
        bold: boolean;
        value: string | number;
        tag: string;
        suffix: string;
        themeOverrides: Record<string, string>;
        prefix: string;
        precision: number;
        tagType: "success" | "warning" | "info" | "primary" | "danger";
        gradient: boolean | string[];
        animated: boolean;
        maxValue: string | number;
        symbolPosition: "after" | "before";
        lineThrough: boolean;
        decimalScale: number;
        thousandth: boolean;
        unit: string;
        deleteValue: string | number;
        deleteLabel: string;
        approx: boolean;
    }, true, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
        value: {
            type: (StringConstructor | NumberConstructor)[];
            default: number;
        };
        maxValue: {
            type: (StringConstructor | NumberConstructor)[];
            default: undefined;
        };
        symbol: {
            type: StringConstructor;
            default: string;
        };
        symbolPosition: {
            type: import("vue").PropType<"before" | "after">;
            default: string;
        };
        precision: {
            type: NumberConstructor;
            default: number;
        };
        lineThrough: {
            type: BooleanConstructor;
            default: boolean;
        };
        size: {
            type: import("vue").PropType<"small" | "default" | "large" | string>;
            default: string;
        };
        split: {
            type: BooleanConstructor;
            default: boolean;
        };
        decimalScale: {
            type: NumberConstructor;
            default: number;
        };
        thousandth: {
            type: BooleanConstructor;
            default: boolean;
        };
        bold: {
            type: BooleanConstructor;
            default: boolean;
        };
        prefix: {
            type: StringConstructor;
            default: string;
        };
        suffix: {
            type: StringConstructor;
            default: string;
        };
        unit: {
            type: StringConstructor;
            default: string;
        };
        deleteValue: {
            type: (StringConstructor | NumberConstructor)[];
            default: undefined;
        };
        deleteLabel: {
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
        approx: {
            type: BooleanConstructor;
            default: boolean;
        };
        animated: {
            type: BooleanConstructor;
            default: boolean;
        };
        gradient: {
            type: import("vue").PropType<boolean | string[]>;
            default: boolean;
        };
        themeOverrides: {
            type: import("vue").PropType<Record<string, string>>;
            default: () => {};
        };
    }>> & Readonly<{}>, {}, {}, {}, {}, {
        symbol: string;
        size: string;
        split: boolean;
        bold: boolean;
        value: string | number;
        tag: string;
        suffix: string;
        themeOverrides: Record<string, string>;
        prefix: string;
        precision: number;
        tagType: "success" | "warning" | "info" | "primary" | "danger";
        gradient: boolean | string[];
        animated: boolean;
        maxValue: string | number;
        symbolPosition: "after" | "before";
        lineThrough: boolean;
        decimalScale: number;
        thousandth: boolean;
        unit: string;
        deleteValue: string | number;
        deleteLabel: string;
        approx: boolean;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
    value: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    maxValue: {
        type: (StringConstructor | NumberConstructor)[];
        default: undefined;
    };
    symbol: {
        type: StringConstructor;
        default: string;
    };
    symbolPosition: {
        type: import("vue").PropType<"before" | "after">;
        default: string;
    };
    precision: {
        type: NumberConstructor;
        default: number;
    };
    lineThrough: {
        type: BooleanConstructor;
        default: boolean;
    };
    size: {
        type: import("vue").PropType<"small" | "default" | "large" | string>;
        default: string;
    };
    split: {
        type: BooleanConstructor;
        default: boolean;
    };
    decimalScale: {
        type: NumberConstructor;
        default: number;
    };
    thousandth: {
        type: BooleanConstructor;
        default: boolean;
    };
    bold: {
        type: BooleanConstructor;
        default: boolean;
    };
    prefix: {
        type: StringConstructor;
        default: string;
    };
    suffix: {
        type: StringConstructor;
        default: string;
    };
    unit: {
        type: StringConstructor;
        default: string;
    };
    deleteValue: {
        type: (StringConstructor | NumberConstructor)[];
        default: undefined;
    };
    deleteLabel: {
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
    approx: {
        type: BooleanConstructor;
        default: boolean;
    };
    animated: {
        type: BooleanConstructor;
        default: boolean;
    };
    gradient: {
        type: import("vue").PropType<boolean | string[]>;
        default: boolean;
    };
    themeOverrides: {
        type: import("vue").PropType<Record<string, string>>;
        default: () => {};
    };
}>> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {
    symbol: string;
    size: string;
    split: boolean;
    bold: boolean;
    value: string | number;
    tag: string;
    suffix: string;
    themeOverrides: Record<string, string>;
    prefix: string;
    precision: number;
    tagType: "success" | "warning" | "info" | "primary" | "danger";
    gradient: boolean | string[];
    animated: boolean;
    maxValue: string | number;
    symbolPosition: "after" | "before";
    lineThrough: boolean;
    decimalScale: number;
    thousandth: boolean;
    unit: string;
    deleteValue: string | number;
    deleteLabel: string;
    approx: boolean;
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        tag?: (props: {}) => any;
    } & {
        prefix?: (props: {}) => any;
    } & {
        symbol?: (props: {}) => any;
    } & {
        symbol?: (props: {}) => any;
    } & {
        unit?: (props: {}) => any;
    } & {
        suffix?: (props: {}) => any;
    };
})> & Record<string, unknown>;
export default YhPrice;
export * from './src/price';
export type PriceInstance = InstanceType<typeof Price>;
export type YhPriceInstance = PriceInstance;
export type YhPriceProps = import('./src/price').PriceProps;
export type YhPriceSlots = import('./src/price').PriceSlots;
