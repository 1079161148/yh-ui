import Rate from './src/rate.vue';
export declare const YhRate: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("vue").ExtractPropTypes<{
        readonly modelValue: {
            readonly type: NumberConstructor;
            readonly default: 0;
        };
        readonly max: {
            readonly type: NumberConstructor;
            readonly default: 5;
        };
        readonly disabled: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly allowHalf: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly icon: {
            readonly type: import("vue").PropType<string | import("vue").Component>;
            readonly default: "";
        };
        readonly voidIcon: {
            readonly type: import("vue").PropType<string | import("vue").Component>;
            readonly default: "";
        };
        readonly disabledVoidIcon: {
            readonly type: import("vue").PropType<string | import("vue").Component>;
            readonly default: "";
        };
        readonly colors: {
            readonly type: import("vue").PropType<string[] | Record<number, string> | string>;
            readonly default: "#F7BA2A";
        };
        readonly voidColor: {
            readonly type: StringConstructor;
            readonly default: "#C6D1DE";
        };
        readonly disabledVoidColor: {
            readonly type: StringConstructor;
            readonly default: "#EFF2F7";
        };
        readonly showScore: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly showText: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly textColor: {
            readonly type: StringConstructor;
            readonly default: "#1f2d3d";
        };
        readonly texts: {
            readonly type: import("vue").PropType<string[]>;
            readonly default: () => never[];
        };
        readonly scoreTemplate: {
            readonly type: StringConstructor;
            readonly default: "{value}";
        };
        readonly size: {
            readonly type: import("vue").PropType<"large" | "default" | "small">;
            readonly default: "default";
        };
        readonly clearable: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly themeOverrides: {
            readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
            readonly default: undefined;
        };
    }>> & Readonly<{
        onChange?: ((value: number) => any) | undefined;
        "onUpdate:modelValue"?: ((value: number) => any) | undefined;
    }>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        change: (value: number) => void;
        "update:modelValue": (value: number) => void;
    }, import("vue").PublicProps, {
        readonly size: "large" | "default" | "small";
        readonly disabled: boolean;
        readonly colors: string | string[] | Record<number, string>;
        readonly textColor: string;
        readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
        readonly icon: string | import("vue").Component;
        readonly modelValue: number;
        readonly clearable: boolean;
        readonly max: number;
        readonly allowHalf: boolean;
        readonly voidIcon: string | import("vue").Component;
        readonly disabledVoidIcon: string | import("vue").Component;
        readonly voidColor: string;
        readonly disabledVoidColor: string;
        readonly showScore: boolean;
        readonly showText: boolean;
        readonly texts: string[];
        readonly scoreTemplate: string;
    }, true, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
        readonly modelValue: {
            readonly type: NumberConstructor;
            readonly default: 0;
        };
        readonly max: {
            readonly type: NumberConstructor;
            readonly default: 5;
        };
        readonly disabled: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly allowHalf: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly icon: {
            readonly type: import("vue").PropType<string | import("vue").Component>;
            readonly default: "";
        };
        readonly voidIcon: {
            readonly type: import("vue").PropType<string | import("vue").Component>;
            readonly default: "";
        };
        readonly disabledVoidIcon: {
            readonly type: import("vue").PropType<string | import("vue").Component>;
            readonly default: "";
        };
        readonly colors: {
            readonly type: import("vue").PropType<string[] | Record<number, string> | string>;
            readonly default: "#F7BA2A";
        };
        readonly voidColor: {
            readonly type: StringConstructor;
            readonly default: "#C6D1DE";
        };
        readonly disabledVoidColor: {
            readonly type: StringConstructor;
            readonly default: "#EFF2F7";
        };
        readonly showScore: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly showText: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly textColor: {
            readonly type: StringConstructor;
            readonly default: "#1f2d3d";
        };
        readonly texts: {
            readonly type: import("vue").PropType<string[]>;
            readonly default: () => never[];
        };
        readonly scoreTemplate: {
            readonly type: StringConstructor;
            readonly default: "{value}";
        };
        readonly size: {
            readonly type: import("vue").PropType<"large" | "default" | "small">;
            readonly default: "default";
        };
        readonly clearable: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly themeOverrides: {
            readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
            readonly default: undefined;
        };
    }>> & Readonly<{
        onChange?: ((value: number) => any) | undefined;
        "onUpdate:modelValue"?: ((value: number) => any) | undefined;
    }>, {}, {}, {}, {}, {
        readonly size: "large" | "default" | "small";
        readonly disabled: boolean;
        readonly colors: string | string[] | Record<number, string>;
        readonly textColor: string;
        readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
        readonly icon: string | import("vue").Component;
        readonly modelValue: number;
        readonly clearable: boolean;
        readonly max: number;
        readonly allowHalf: boolean;
        readonly voidIcon: string | import("vue").Component;
        readonly disabledVoidIcon: string | import("vue").Component;
        readonly voidColor: string;
        readonly disabledVoidColor: string;
        readonly showScore: boolean;
        readonly showText: boolean;
        readonly texts: string[];
        readonly scoreTemplate: string;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
    readonly modelValue: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly max: {
        readonly type: NumberConstructor;
        readonly default: 5;
    };
    readonly disabled: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly allowHalf: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly icon: {
        readonly type: import("vue").PropType<string | import("vue").Component>;
        readonly default: "";
    };
    readonly voidIcon: {
        readonly type: import("vue").PropType<string | import("vue").Component>;
        readonly default: "";
    };
    readonly disabledVoidIcon: {
        readonly type: import("vue").PropType<string | import("vue").Component>;
        readonly default: "";
    };
    readonly colors: {
        readonly type: import("vue").PropType<string[] | Record<number, string> | string>;
        readonly default: "#F7BA2A";
    };
    readonly voidColor: {
        readonly type: StringConstructor;
        readonly default: "#C6D1DE";
    };
    readonly disabledVoidColor: {
        readonly type: StringConstructor;
        readonly default: "#EFF2F7";
    };
    readonly showScore: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly showText: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly textColor: {
        readonly type: StringConstructor;
        readonly default: "#1f2d3d";
    };
    readonly texts: {
        readonly type: import("vue").PropType<string[]>;
        readonly default: () => never[];
    };
    readonly scoreTemplate: {
        readonly type: StringConstructor;
        readonly default: "{value}";
    };
    readonly size: {
        readonly type: import("vue").PropType<"large" | "default" | "small">;
        readonly default: "default";
    };
    readonly clearable: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>> & Readonly<{
    onChange?: ((value: number) => any) | undefined;
    "onUpdate:modelValue"?: ((value: number) => any) | undefined;
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    change: (value: number) => void;
    "update:modelValue": (value: number) => void;
}, string, {
    readonly size: "large" | "default" | "small";
    readonly disabled: boolean;
    readonly colors: string | string[] | Record<number, string>;
    readonly textColor: string;
    readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
    readonly icon: string | import("vue").Component;
    readonly modelValue: number;
    readonly clearable: boolean;
    readonly max: number;
    readonly allowHalf: boolean;
    readonly voidIcon: string | import("vue").Component;
    readonly disabledVoidIcon: string | import("vue").Component;
    readonly voidColor: string;
    readonly disabledVoidColor: string;
    readonly showScore: boolean;
    readonly showText: boolean;
    readonly texts: string[];
    readonly scoreTemplate: string;
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        icon?: (props: {
            index: number;
            width: string;
            activeColor: string;
            voidColor: string;
        }) => any;
    };
})> & Record<string, unknown>;
export default YhRate;
export * from './src/rate';
export type RateInstance = InstanceType<typeof Rate>;
