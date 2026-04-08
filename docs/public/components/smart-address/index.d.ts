import SmartAddress from './src/smart-address.vue';
export declare const YhSmartAddress: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("vue").ExtractPropTypes<{
        modelValue: {
            type: import("vue").PropType<import("./index.js").AddressValue>;
            default: () => import("./index.js").AddressValue;
        };
        showName: {
            type: BooleanConstructor;
            default: boolean;
        };
        showPhone: {
            type: BooleanConstructor;
            default: boolean;
        };
        showStreet: {
            type: BooleanConstructor;
            default: boolean;
        };
        parsePlaceholder: {
            type: StringConstructor;
            default: string;
        };
        required: {
            type: BooleanConstructor;
            default: boolean;
        };
        disabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        parseButtonText: {
            type: StringConstructor;
            default: string;
        };
        showParser: {
            type: BooleanConstructor;
            default: boolean;
        };
        regionType: {
            type: import("vue").PropType<"input" | "select" | "cascader">;
            default: string;
        };
        regionOptions: {
            type: import("vue").PropType<import("./index.js").RegionOption[]>;
            default: () => never[];
        };
        labelField: {
            type: StringConstructor;
            default: string;
        };
        valueField: {
            type: StringConstructor;
            default: string;
        };
        childrenField: {
            type: StringConstructor;
            default: string;
        };
        labelPlacement: {
            type: import("vue").PropType<"left" | "top">;
            default: string;
        };
        parser: {
            type: import("vue").PropType<(raw: string) => import("./index.js").ParsedAddress>;
            default: null;
        };
        themeOverrides: {
            type: import("vue").PropType<Record<string, string>>;
            default: () => {};
        };
    }>> & Readonly<{
        onChange?: ((val: import("./index.js").AddressValue) => any) | undefined;
        "onUpdate:modelValue"?: ((val: import("./index.js").AddressValue) => any) | undefined;
        onParsed?: ((val: import("./index.js").ParsedAddress) => any) | undefined;
    }>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        change: (val: import("./index.js").AddressValue) => void;
        "update:modelValue": (val: import("./index.js").AddressValue) => void;
        parsed: (val: import("./index.js").ParsedAddress) => void;
    }, import("vue").PublicProps, {
        required: boolean;
        parser: (raw: string) => import("./index.js").ParsedAddress;
        disabled: boolean;
        themeOverrides: Record<string, string>;
        modelValue: import("./index.js").AddressValue;
        labelPlacement: "top" | "left";
        labelField: string;
        showName: boolean;
        showPhone: boolean;
        showStreet: boolean;
        parsePlaceholder: string;
        parseButtonText: string;
        showParser: boolean;
        regionType: "input" | "select" | "cascader";
        regionOptions: import("./index.js").RegionOption[];
        valueField: string;
        childrenField: string;
    }, true, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
        modelValue: {
            type: import("vue").PropType<import("./index.js").AddressValue>;
            default: () => import("./index.js").AddressValue;
        };
        showName: {
            type: BooleanConstructor;
            default: boolean;
        };
        showPhone: {
            type: BooleanConstructor;
            default: boolean;
        };
        showStreet: {
            type: BooleanConstructor;
            default: boolean;
        };
        parsePlaceholder: {
            type: StringConstructor;
            default: string;
        };
        required: {
            type: BooleanConstructor;
            default: boolean;
        };
        disabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        parseButtonText: {
            type: StringConstructor;
            default: string;
        };
        showParser: {
            type: BooleanConstructor;
            default: boolean;
        };
        regionType: {
            type: import("vue").PropType<"input" | "select" | "cascader">;
            default: string;
        };
        regionOptions: {
            type: import("vue").PropType<import("./index.js").RegionOption[]>;
            default: () => never[];
        };
        labelField: {
            type: StringConstructor;
            default: string;
        };
        valueField: {
            type: StringConstructor;
            default: string;
        };
        childrenField: {
            type: StringConstructor;
            default: string;
        };
        labelPlacement: {
            type: import("vue").PropType<"left" | "top">;
            default: string;
        };
        parser: {
            type: import("vue").PropType<(raw: string) => import("./index.js").ParsedAddress>;
            default: null;
        };
        themeOverrides: {
            type: import("vue").PropType<Record<string, string>>;
            default: () => {};
        };
    }>> & Readonly<{
        onChange?: ((val: import("./index.js").AddressValue) => any) | undefined;
        "onUpdate:modelValue"?: ((val: import("./index.js").AddressValue) => any) | undefined;
        onParsed?: ((val: import("./index.js").ParsedAddress) => any) | undefined;
    }>, {}, {}, {}, {}, {
        required: boolean;
        parser: (raw: string) => import("./index.js").ParsedAddress;
        disabled: boolean;
        themeOverrides: Record<string, string>;
        modelValue: import("./index.js").AddressValue;
        labelPlacement: "top" | "left";
        labelField: string;
        showName: boolean;
        showPhone: boolean;
        showStreet: boolean;
        parsePlaceholder: string;
        parseButtonText: string;
        showParser: boolean;
        regionType: "input" | "select" | "cascader";
        regionOptions: import("./index.js").RegionOption[];
        valueField: string;
        childrenField: string;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: import("vue").PropType<import("./index.js").AddressValue>;
        default: () => import("./index.js").AddressValue;
    };
    showName: {
        type: BooleanConstructor;
        default: boolean;
    };
    showPhone: {
        type: BooleanConstructor;
        default: boolean;
    };
    showStreet: {
        type: BooleanConstructor;
        default: boolean;
    };
    parsePlaceholder: {
        type: StringConstructor;
        default: string;
    };
    required: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    parseButtonText: {
        type: StringConstructor;
        default: string;
    };
    showParser: {
        type: BooleanConstructor;
        default: boolean;
    };
    regionType: {
        type: import("vue").PropType<"input" | "select" | "cascader">;
        default: string;
    };
    regionOptions: {
        type: import("vue").PropType<import("./index.js").RegionOption[]>;
        default: () => never[];
    };
    labelField: {
        type: StringConstructor;
        default: string;
    };
    valueField: {
        type: StringConstructor;
        default: string;
    };
    childrenField: {
        type: StringConstructor;
        default: string;
    };
    labelPlacement: {
        type: import("vue").PropType<"left" | "top">;
        default: string;
    };
    parser: {
        type: import("vue").PropType<(raw: string) => import("./index.js").ParsedAddress>;
        default: null;
    };
    themeOverrides: {
        type: import("vue").PropType<Record<string, string>>;
        default: () => {};
    };
}>> & Readonly<{
    onChange?: ((val: import("./index.js").AddressValue) => any) | undefined;
    "onUpdate:modelValue"?: ((val: import("./index.js").AddressValue) => any) | undefined;
    onParsed?: ((val: import("./index.js").ParsedAddress) => any) | undefined;
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    change: (val: import("./index.js").AddressValue) => void;
    "update:modelValue": (val: import("./index.js").AddressValue) => void;
    parsed: (val: import("./index.js").ParsedAddress) => void;
}, string, {
    required: boolean;
    parser: (raw: string) => import("./index.js").ParsedAddress;
    disabled: boolean;
    themeOverrides: Record<string, string>;
    modelValue: import("./index.js").AddressValue;
    labelPlacement: "top" | "left";
    labelField: string;
    showName: boolean;
    showPhone: boolean;
    showStreet: boolean;
    parsePlaceholder: string;
    parseButtonText: string;
    showParser: boolean;
    regionType: "input" | "select" | "cascader";
    regionOptions: import("./index.js").RegionOption[];
    valueField: string;
    childrenField: string;
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        'parse-icon'?: (props: {}) => any;
    } & {
        region?: (props: {
            value: {
                name: string;
                phone: string;
                province: string;
                city: string;
                district: string;
                street: string;
                detail: string;
            };
            update: (field: keyof import("./index.js").AddressValue, value: string) => void;
        }) => any;
    } & {
        extra?: (props: {
            value: {
                name: string;
                phone: string;
                province: string;
                city: string;
                district: string;
                street: string;
                detail: string;
            };
            update: (field: keyof import("./index.js").AddressValue, value: string) => void;
        }) => any;
    };
})> & Record<string, unknown>;
export default YhSmartAddress;
export * from './src/smart-address';
export * from './src/use-address-parser';
export type SmartAddressInstance = InstanceType<typeof SmartAddress>;
export type YhSmartAddressInstance = SmartAddressInstance;
export type YhSmartAddressProps = import('./src/smart-address').SmartAddressProps;
