/**
 * Descriptions Component
 * @description 描述列表组件导出
 */
import Descriptions from './src/descriptions.vue';
import DescriptionsItem from './src/description-item.vue';
export declare const YhDescriptions: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("vue").ExtractPropTypes<{
        readonly title: StringConstructor;
        readonly extra: StringConstructor;
        readonly column: {
            readonly type: NumberConstructor;
            readonly default: 3;
        };
        readonly direction: {
            readonly type: import("vue").PropType<"horizontal" | "vertical">;
            readonly default: "horizontal";
        };
        readonly size: {
            readonly type: import("vue").PropType<"large" | "default" | "small">;
            readonly default: "default";
        };
        readonly border: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly colon: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly labelStyle: {
            readonly type: import("vue").PropType<import("vue").CSSProperties>;
        };
        readonly contentStyle: {
            readonly type: import("vue").PropType<import("vue").CSSProperties>;
        };
        readonly labelClassName: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly contentClassName: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly themeOverrides: {
            readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
            readonly default: undefined;
        };
    }>> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {
        readonly size: "large" | "default" | "small";
        readonly colon: boolean;
        readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
        readonly direction: "vertical" | "horizontal";
        readonly border: boolean;
        readonly column: number;
        readonly labelClassName: string;
        readonly contentClassName: string;
    }, true, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
        readonly title: StringConstructor;
        readonly extra: StringConstructor;
        readonly column: {
            readonly type: NumberConstructor;
            readonly default: 3;
        };
        readonly direction: {
            readonly type: import("vue").PropType<"horizontal" | "vertical">;
            readonly default: "horizontal";
        };
        readonly size: {
            readonly type: import("vue").PropType<"large" | "default" | "small">;
            readonly default: "default";
        };
        readonly border: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly colon: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly labelStyle: {
            readonly type: import("vue").PropType<import("vue").CSSProperties>;
        };
        readonly contentStyle: {
            readonly type: import("vue").PropType<import("vue").CSSProperties>;
        };
        readonly labelClassName: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly contentClassName: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly themeOverrides: {
            readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
            readonly default: undefined;
        };
    }>> & Readonly<{}>, {}, {}, {}, {}, {
        readonly size: "large" | "default" | "small";
        readonly colon: boolean;
        readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
        readonly direction: "vertical" | "horizontal";
        readonly border: boolean;
        readonly column: number;
        readonly labelClassName: string;
        readonly contentClassName: string;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
    readonly title: StringConstructor;
    readonly extra: StringConstructor;
    readonly column: {
        readonly type: NumberConstructor;
        readonly default: 3;
    };
    readonly direction: {
        readonly type: import("vue").PropType<"horizontal" | "vertical">;
        readonly default: "horizontal";
    };
    readonly size: {
        readonly type: import("vue").PropType<"large" | "default" | "small">;
        readonly default: "default";
    };
    readonly border: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly colon: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly labelStyle: {
        readonly type: import("vue").PropType<import("vue").CSSProperties>;
    };
    readonly contentStyle: {
        readonly type: import("vue").PropType<import("vue").CSSProperties>;
    };
    readonly labelClassName: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly contentClassName: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {
    readonly size: "large" | "default" | "small";
    readonly colon: boolean;
    readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
    readonly direction: "vertical" | "horizontal";
    readonly border: boolean;
    readonly column: number;
    readonly labelClassName: string;
    readonly contentClassName: string;
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        title?: (props: {}) => any;
    } & {
        extra?: (props: {}) => any;
    };
})> & {
    DescriptionsItem: {
        new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("vue").ExtractPropTypes<{
            readonly label: {
                readonly type: StringConstructor;
                readonly default: "";
            };
            readonly span: {
                readonly type: NumberConstructor;
                readonly default: 1;
            };
            readonly width: {
                readonly type: import("vue").PropType<string | number>;
                readonly default: "";
            };
            readonly minWidth: {
                readonly type: import("vue").PropType<string | number>;
                readonly default: "";
            };
            readonly align: {
                readonly type: import("vue").PropType<"left" | "center" | "right">;
                readonly default: "left";
            };
            readonly labelAlign: {
                readonly type: import("vue").PropType<"left" | "center" | "right">;
                readonly default: "left";
            };
            readonly className: {
                readonly type: StringConstructor;
                readonly default: "";
            };
            readonly labelClassName: {
                readonly type: StringConstructor;
                readonly default: "";
            };
            readonly labelStyle: {
                readonly type: import("vue").PropType<import("vue").CSSProperties>;
            };
            readonly contentStyle: {
                readonly type: import("vue").PropType<import("vue").CSSProperties>;
            };
        }>> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {
            readonly label: string;
            readonly span: number;
            readonly width: string | number;
            readonly minWidth: string | number;
            readonly align: "center" | "left" | "right";
            readonly labelClassName: string;
            readonly labelAlign: "center" | "left" | "right";
            readonly className: string;
        }, true, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
            P: {};
            B: {};
            D: {};
            C: {};
            M: {};
            Defaults: {};
        }, Readonly<import("vue").ExtractPropTypes<{
            readonly label: {
                readonly type: StringConstructor;
                readonly default: "";
            };
            readonly span: {
                readonly type: NumberConstructor;
                readonly default: 1;
            };
            readonly width: {
                readonly type: import("vue").PropType<string | number>;
                readonly default: "";
            };
            readonly minWidth: {
                readonly type: import("vue").PropType<string | number>;
                readonly default: "";
            };
            readonly align: {
                readonly type: import("vue").PropType<"left" | "center" | "right">;
                readonly default: "left";
            };
            readonly labelAlign: {
                readonly type: import("vue").PropType<"left" | "center" | "right">;
                readonly default: "left";
            };
            readonly className: {
                readonly type: StringConstructor;
                readonly default: "";
            };
            readonly labelClassName: {
                readonly type: StringConstructor;
                readonly default: "";
            };
            readonly labelStyle: {
                readonly type: import("vue").PropType<import("vue").CSSProperties>;
            };
            readonly contentStyle: {
                readonly type: import("vue").PropType<import("vue").CSSProperties>;
            };
        }>> & Readonly<{}>, {}, {}, {}, {}, {
            readonly label: string;
            readonly span: number;
            readonly width: string | number;
            readonly minWidth: string | number;
            readonly align: "center" | "left" | "right";
            readonly labelClassName: string;
            readonly labelAlign: "center" | "left" | "right";
            readonly className: string;
        }>;
        __isFragment?: never;
        __isTeleport?: never;
        __isSuspense?: never;
    } & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
        readonly label: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly span: {
            readonly type: NumberConstructor;
            readonly default: 1;
        };
        readonly width: {
            readonly type: import("vue").PropType<string | number>;
            readonly default: "";
        };
        readonly minWidth: {
            readonly type: import("vue").PropType<string | number>;
            readonly default: "";
        };
        readonly align: {
            readonly type: import("vue").PropType<"left" | "center" | "right">;
            readonly default: "left";
        };
        readonly labelAlign: {
            readonly type: import("vue").PropType<"left" | "center" | "right">;
            readonly default: "left";
        };
        readonly className: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly labelClassName: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly labelStyle: {
            readonly type: import("vue").PropType<import("vue").CSSProperties>;
        };
        readonly contentStyle: {
            readonly type: import("vue").PropType<import("vue").CSSProperties>;
        };
    }>> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {
        readonly label: string;
        readonly span: number;
        readonly width: string | number;
        readonly minWidth: string | number;
        readonly align: "center" | "left" | "right";
        readonly labelClassName: string;
        readonly labelAlign: "center" | "left" | "right";
        readonly className: string;
    }, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
        $slots: {
            default?: (props: {}) => any;
        };
    });
};
export declare const YhDescriptionsItem: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("vue").ExtractPropTypes<{
        readonly label: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly span: {
            readonly type: NumberConstructor;
            readonly default: 1;
        };
        readonly width: {
            readonly type: import("vue").PropType<string | number>;
            readonly default: "";
        };
        readonly minWidth: {
            readonly type: import("vue").PropType<string | number>;
            readonly default: "";
        };
        readonly align: {
            readonly type: import("vue").PropType<"left" | "center" | "right">;
            readonly default: "left";
        };
        readonly labelAlign: {
            readonly type: import("vue").PropType<"left" | "center" | "right">;
            readonly default: "left";
        };
        readonly className: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly labelClassName: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly labelStyle: {
            readonly type: import("vue").PropType<import("vue").CSSProperties>;
        };
        readonly contentStyle: {
            readonly type: import("vue").PropType<import("vue").CSSProperties>;
        };
    }>> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {
        readonly label: string;
        readonly span: number;
        readonly width: string | number;
        readonly minWidth: string | number;
        readonly align: "center" | "left" | "right";
        readonly labelClassName: string;
        readonly labelAlign: "center" | "left" | "right";
        readonly className: string;
    }, true, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
        readonly label: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly span: {
            readonly type: NumberConstructor;
            readonly default: 1;
        };
        readonly width: {
            readonly type: import("vue").PropType<string | number>;
            readonly default: "";
        };
        readonly minWidth: {
            readonly type: import("vue").PropType<string | number>;
            readonly default: "";
        };
        readonly align: {
            readonly type: import("vue").PropType<"left" | "center" | "right">;
            readonly default: "left";
        };
        readonly labelAlign: {
            readonly type: import("vue").PropType<"left" | "center" | "right">;
            readonly default: "left";
        };
        readonly className: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly labelClassName: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly labelStyle: {
            readonly type: import("vue").PropType<import("vue").CSSProperties>;
        };
        readonly contentStyle: {
            readonly type: import("vue").PropType<import("vue").CSSProperties>;
        };
    }>> & Readonly<{}>, {}, {}, {}, {}, {
        readonly label: string;
        readonly span: number;
        readonly width: string | number;
        readonly minWidth: string | number;
        readonly align: "center" | "left" | "right";
        readonly labelClassName: string;
        readonly labelAlign: "center" | "left" | "right";
        readonly className: string;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
    readonly label: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly span: {
        readonly type: NumberConstructor;
        readonly default: 1;
    };
    readonly width: {
        readonly type: import("vue").PropType<string | number>;
        readonly default: "";
    };
    readonly minWidth: {
        readonly type: import("vue").PropType<string | number>;
        readonly default: "";
    };
    readonly align: {
        readonly type: import("vue").PropType<"left" | "center" | "right">;
        readonly default: "left";
    };
    readonly labelAlign: {
        readonly type: import("vue").PropType<"left" | "center" | "right">;
        readonly default: "left";
    };
    readonly className: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly labelClassName: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly labelStyle: {
        readonly type: import("vue").PropType<import("vue").CSSProperties>;
    };
    readonly contentStyle: {
        readonly type: import("vue").PropType<import("vue").CSSProperties>;
    };
}>> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {
    readonly label: string;
    readonly span: number;
    readonly width: string | number;
    readonly minWidth: string | number;
    readonly align: "center" | "left" | "right";
    readonly labelClassName: string;
    readonly labelAlign: "center" | "left" | "right";
    readonly className: string;
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        default?: (props: {}) => any;
    };
})>;
export default YhDescriptions;
export * from './src/descriptions';
export type DescriptionsInstance = InstanceType<typeof Descriptions>;
export type DescriptionsItemInstance = InstanceType<typeof DescriptionsItem>;
