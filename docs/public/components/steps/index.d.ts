/**
 * Steps Component
 * @description 步骤条组件导出
 */
import Steps from './src/steps.vue';
import Step from './src/step.vue';
export declare const YhSteps: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("vue").ExtractPropTypes<{
        readonly active: {
            readonly type: NumberConstructor;
            readonly default: 0;
        };
        readonly direction: {
            readonly type: import("vue").PropType<import("./index.js").StepsDirection>;
            readonly default: "horizontal";
        };
        readonly alignCenter: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly simple: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly progressDot: {
            readonly type: import("vue").PropType<boolean | import("./index.js").StepsProgressDot>;
            readonly default: false;
        };
        readonly finishStatus: {
            readonly type: import("vue").PropType<import("./index.js").StepsStatus>;
            readonly default: "finish";
        };
        readonly processStatus: {
            readonly type: import("vue").PropType<import("./index.js").StepsStatus>;
            readonly default: "process";
        };
        readonly space: {
            readonly type: import("vue").PropType<number | string>;
            readonly default: "";
        };
        readonly clickable: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly size: {
            readonly type: import("vue").PropType<import("./index.js").StepsSize>;
            readonly default: "default";
        };
        readonly responsive: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly responsiveBreakpoint: {
            readonly type: NumberConstructor;
            readonly default: 768;
        };
        readonly labelPlacement: {
            readonly type: import("vue").PropType<import("./index.js").StepsLabelPlacement>;
            readonly default: "horizontal";
        };
        readonly showProgress: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly showTimeline: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly themeOverrides: {
            readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
            readonly default: undefined;
        };
    }>> & Readonly<{
        onChange?: ((index: number) => any) | undefined;
    }>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        change: (index: number) => void;
    }, import("vue").PublicProps, {
        readonly size: "default" | "small";
        readonly active: number;
        readonly responsive: boolean;
        readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
        readonly direction: "vertical" | "horizontal";
        readonly space: string | number;
        readonly showProgress: boolean;
        readonly alignCenter: boolean;
        readonly simple: boolean;
        readonly progressDot: boolean | "default" | "dot" | "navigation";
        readonly finishStatus: "error" | "success" | "finish" | "process" | "wait";
        readonly processStatus: "error" | "success" | "finish" | "process" | "wait";
        readonly clickable: boolean;
        readonly responsiveBreakpoint: number;
        readonly labelPlacement: "vertical" | "horizontal";
        readonly showTimeline: boolean;
    }, true, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
        readonly active: {
            readonly type: NumberConstructor;
            readonly default: 0;
        };
        readonly direction: {
            readonly type: import("vue").PropType<import("./index.js").StepsDirection>;
            readonly default: "horizontal";
        };
        readonly alignCenter: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly simple: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly progressDot: {
            readonly type: import("vue").PropType<boolean | import("./index.js").StepsProgressDot>;
            readonly default: false;
        };
        readonly finishStatus: {
            readonly type: import("vue").PropType<import("./index.js").StepsStatus>;
            readonly default: "finish";
        };
        readonly processStatus: {
            readonly type: import("vue").PropType<import("./index.js").StepsStatus>;
            readonly default: "process";
        };
        readonly space: {
            readonly type: import("vue").PropType<number | string>;
            readonly default: "";
        };
        readonly clickable: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly size: {
            readonly type: import("vue").PropType<import("./index.js").StepsSize>;
            readonly default: "default";
        };
        readonly responsive: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly responsiveBreakpoint: {
            readonly type: NumberConstructor;
            readonly default: 768;
        };
        readonly labelPlacement: {
            readonly type: import("vue").PropType<import("./index.js").StepsLabelPlacement>;
            readonly default: "horizontal";
        };
        readonly showProgress: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly showTimeline: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly themeOverrides: {
            readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
            readonly default: undefined;
        };
    }>> & Readonly<{
        onChange?: ((index: number) => any) | undefined;
    }>, {}, {}, {}, {}, {
        readonly size: "default" | "small";
        readonly active: number;
        readonly responsive: boolean;
        readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
        readonly direction: "vertical" | "horizontal";
        readonly space: string | number;
        readonly showProgress: boolean;
        readonly alignCenter: boolean;
        readonly simple: boolean;
        readonly progressDot: boolean | "default" | "dot" | "navigation";
        readonly finishStatus: "error" | "success" | "finish" | "process" | "wait";
        readonly processStatus: "error" | "success" | "finish" | "process" | "wait";
        readonly clickable: boolean;
        readonly responsiveBreakpoint: number;
        readonly labelPlacement: "vertical" | "horizontal";
        readonly showTimeline: boolean;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
    readonly active: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly direction: {
        readonly type: import("vue").PropType<import("./index.js").StepsDirection>;
        readonly default: "horizontal";
    };
    readonly alignCenter: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly simple: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly progressDot: {
        readonly type: import("vue").PropType<boolean | import("./index.js").StepsProgressDot>;
        readonly default: false;
    };
    readonly finishStatus: {
        readonly type: import("vue").PropType<import("./index.js").StepsStatus>;
        readonly default: "finish";
    };
    readonly processStatus: {
        readonly type: import("vue").PropType<import("./index.js").StepsStatus>;
        readonly default: "process";
    };
    readonly space: {
        readonly type: import("vue").PropType<number | string>;
        readonly default: "";
    };
    readonly clickable: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly size: {
        readonly type: import("vue").PropType<import("./index.js").StepsSize>;
        readonly default: "default";
    };
    readonly responsive: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly responsiveBreakpoint: {
        readonly type: NumberConstructor;
        readonly default: 768;
    };
    readonly labelPlacement: {
        readonly type: import("vue").PropType<import("./index.js").StepsLabelPlacement>;
        readonly default: "horizontal";
    };
    readonly showProgress: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly showTimeline: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>> & Readonly<{
    onChange?: ((index: number) => any) | undefined;
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    change: (index: number) => void;
}, string, {
    readonly size: "default" | "small";
    readonly active: number;
    readonly responsive: boolean;
    readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
    readonly direction: "vertical" | "horizontal";
    readonly space: string | number;
    readonly showProgress: boolean;
    readonly alignCenter: boolean;
    readonly simple: boolean;
    readonly progressDot: boolean | "default" | "dot" | "navigation";
    readonly finishStatus: "error" | "success" | "finish" | "process" | "wait";
    readonly processStatus: "error" | "success" | "finish" | "process" | "wait";
    readonly clickable: boolean;
    readonly responsiveBreakpoint: number;
    readonly labelPlacement: "vertical" | "horizontal";
    readonly showTimeline: boolean;
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        default?: (props: {}) => any;
    };
})> & {
    Step: {
        new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("vue").ExtractPropTypes<{
            readonly title: {
                readonly type: StringConstructor;
                readonly default: "";
            };
            readonly description: {
                readonly type: StringConstructor;
                readonly default: "";
            };
            readonly icon: {
                readonly type: StringConstructor;
                readonly default: "";
            };
            readonly status: {
                readonly type: import("vue").PropType<import("./index.js").StepsStatus>;
                readonly default: "";
            };
            readonly disabled: {
                readonly type: BooleanConstructor;
                readonly default: false;
            };
            readonly time: {
                readonly type: StringConstructor;
                readonly default: "";
            };
            readonly progress: {
                readonly type: NumberConstructor;
                readonly default: 0;
            };
            readonly lazy: {
                readonly type: BooleanConstructor;
                readonly default: false;
            };
            readonly themeOverrides: {
                readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
                readonly default: undefined;
            };
        }>> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {
            readonly progress: number;
            readonly time: string;
            readonly title: string;
            readonly description: string;
            readonly status: "error" | "success" | "finish" | "process" | "wait";
            readonly disabled: boolean;
            readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
            readonly icon: string;
            readonly lazy: boolean;
        }, true, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
            P: {};
            B: {};
            D: {};
            C: {};
            M: {};
            Defaults: {};
        }, Readonly<import("vue").ExtractPropTypes<{
            readonly title: {
                readonly type: StringConstructor;
                readonly default: "";
            };
            readonly description: {
                readonly type: StringConstructor;
                readonly default: "";
            };
            readonly icon: {
                readonly type: StringConstructor;
                readonly default: "";
            };
            readonly status: {
                readonly type: import("vue").PropType<import("./index.js").StepsStatus>;
                readonly default: "";
            };
            readonly disabled: {
                readonly type: BooleanConstructor;
                readonly default: false;
            };
            readonly time: {
                readonly type: StringConstructor;
                readonly default: "";
            };
            readonly progress: {
                readonly type: NumberConstructor;
                readonly default: 0;
            };
            readonly lazy: {
                readonly type: BooleanConstructor;
                readonly default: false;
            };
            readonly themeOverrides: {
                readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
                readonly default: undefined;
            };
        }>> & Readonly<{}>, {}, {}, {}, {}, {
            readonly progress: number;
            readonly time: string;
            readonly title: string;
            readonly description: string;
            readonly status: "error" | "success" | "finish" | "process" | "wait";
            readonly disabled: boolean;
            readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
            readonly icon: string;
            readonly lazy: boolean;
        }>;
        __isFragment?: never;
        __isTeleport?: never;
        __isSuspense?: never;
    } & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
        readonly title: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly description: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly icon: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly status: {
            readonly type: import("vue").PropType<import("./index.js").StepsStatus>;
            readonly default: "";
        };
        readonly disabled: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly time: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly progress: {
            readonly type: NumberConstructor;
            readonly default: 0;
        };
        readonly lazy: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly themeOverrides: {
            readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
            readonly default: undefined;
        };
    }>> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {
        readonly progress: number;
        readonly time: string;
        readonly title: string;
        readonly description: string;
        readonly status: "error" | "success" | "finish" | "process" | "wait";
        readonly disabled: boolean;
        readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
        readonly icon: string;
        readonly lazy: boolean;
    }, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
        $slots: {
            time?: (props: {}) => any;
        } & {
            icon?: (props: {}) => any;
        } & {
            title?: (props: {}) => any;
        } & {
            description?: (props: {}) => any;
        } & {
            default?: (props: {}) => any;
        };
    });
};
export declare const YhStep: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("vue").ExtractPropTypes<{
        readonly title: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly description: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly icon: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly status: {
            readonly type: import("vue").PropType<import("./index.js").StepsStatus>;
            readonly default: "";
        };
        readonly disabled: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly time: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly progress: {
            readonly type: NumberConstructor;
            readonly default: 0;
        };
        readonly lazy: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly themeOverrides: {
            readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
            readonly default: undefined;
        };
    }>> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {
        readonly progress: number;
        readonly time: string;
        readonly title: string;
        readonly description: string;
        readonly status: "error" | "success" | "finish" | "process" | "wait";
        readonly disabled: boolean;
        readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
        readonly icon: string;
        readonly lazy: boolean;
    }, true, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
        readonly title: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly description: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly icon: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly status: {
            readonly type: import("vue").PropType<import("./index.js").StepsStatus>;
            readonly default: "";
        };
        readonly disabled: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly time: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly progress: {
            readonly type: NumberConstructor;
            readonly default: 0;
        };
        readonly lazy: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly themeOverrides: {
            readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
            readonly default: undefined;
        };
    }>> & Readonly<{}>, {}, {}, {}, {}, {
        readonly progress: number;
        readonly time: string;
        readonly title: string;
        readonly description: string;
        readonly status: "error" | "success" | "finish" | "process" | "wait";
        readonly disabled: boolean;
        readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
        readonly icon: string;
        readonly lazy: boolean;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
    readonly title: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly description: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly icon: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly status: {
        readonly type: import("vue").PropType<import("./index.js").StepsStatus>;
        readonly default: "";
    };
    readonly disabled: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly time: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly progress: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly lazy: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {
    readonly progress: number;
    readonly time: string;
    readonly title: string;
    readonly description: string;
    readonly status: "error" | "success" | "finish" | "process" | "wait";
    readonly disabled: boolean;
    readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
    readonly icon: string;
    readonly lazy: boolean;
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        time?: (props: {}) => any;
    } & {
        icon?: (props: {}) => any;
    } & {
        title?: (props: {}) => any;
    } & {
        description?: (props: {}) => any;
    } & {
        default?: (props: {}) => any;
    };
})>;
export default YhSteps;
export * from './src/steps';
export * from './src/step';
export type StepsInstance = InstanceType<typeof Steps>;
export type StepInstance = InstanceType<typeof Step>;
