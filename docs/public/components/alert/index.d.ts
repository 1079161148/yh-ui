import Alert from './src/alert.vue';
export declare const YhAlert: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("vue").ExtractPropTypes<{
        readonly title: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly description: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly type: {
            readonly type: import("vue").PropType<import("./index.js").AlertType>;
            readonly default: "info";
            readonly validator: (val: string) => boolean;
        };
        readonly effect: {
            readonly type: import("vue").PropType<import("./index.js").AlertEffect>;
            readonly default: "light";
            readonly validator: (val: string) => boolean;
        };
        readonly closable: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly closeText: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly closeIcon: {
            readonly type: import("vue").PropType<string | import("vue").Component>;
            readonly default: "";
        };
        readonly showIcon: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly icon: {
            readonly type: import("vue").PropType<string | import("vue").Component>;
            readonly default: "";
        };
        readonly center: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly scrollable: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly scrollSpeed: {
            readonly type: NumberConstructor;
            readonly default: 15;
        };
        readonly pauseOnHover: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly duration: {
            readonly type: NumberConstructor;
            readonly default: 0;
        };
        readonly showProgress: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly themeOverrides: {
            readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
            readonly default: undefined;
        };
    }>> & Readonly<{
        onClose?: ((evt: MouseEvent) => any) | undefined;
    }>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        close: (evt: MouseEvent) => void;
    }, import("vue").PublicProps, {
        readonly title: string;
        readonly description: string;
        readonly effect: "dark" | "light" | "outline" | "glass";
        readonly type: "error" | "success" | "warning" | "info";
        readonly center: boolean;
        readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
        readonly icon: string | import("vue").Component;
        readonly closable: boolean;
        readonly duration: number;
        readonly showProgress: boolean;
        readonly closeText: string;
        readonly closeIcon: string | import("vue").Component;
        readonly showIcon: boolean;
        readonly scrollable: boolean;
        readonly scrollSpeed: number;
        readonly pauseOnHover: boolean;
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
        readonly type: {
            readonly type: import("vue").PropType<import("./index.js").AlertType>;
            readonly default: "info";
            readonly validator: (val: string) => boolean;
        };
        readonly effect: {
            readonly type: import("vue").PropType<import("./index.js").AlertEffect>;
            readonly default: "light";
            readonly validator: (val: string) => boolean;
        };
        readonly closable: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly closeText: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly closeIcon: {
            readonly type: import("vue").PropType<string | import("vue").Component>;
            readonly default: "";
        };
        readonly showIcon: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly icon: {
            readonly type: import("vue").PropType<string | import("vue").Component>;
            readonly default: "";
        };
        readonly center: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly scrollable: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly scrollSpeed: {
            readonly type: NumberConstructor;
            readonly default: 15;
        };
        readonly pauseOnHover: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly duration: {
            readonly type: NumberConstructor;
            readonly default: 0;
        };
        readonly showProgress: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly themeOverrides: {
            readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
            readonly default: undefined;
        };
    }>> & Readonly<{
        onClose?: ((evt: MouseEvent) => any) | undefined;
    }>, {}, {}, {}, {}, {
        readonly title: string;
        readonly description: string;
        readonly effect: "dark" | "light" | "outline" | "glass";
        readonly type: "error" | "success" | "warning" | "info";
        readonly center: boolean;
        readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
        readonly icon: string | import("vue").Component;
        readonly closable: boolean;
        readonly duration: number;
        readonly showProgress: boolean;
        readonly closeText: string;
        readonly closeIcon: string | import("vue").Component;
        readonly showIcon: boolean;
        readonly scrollable: boolean;
        readonly scrollSpeed: number;
        readonly pauseOnHover: boolean;
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
    readonly type: {
        readonly type: import("vue").PropType<import("./index.js").AlertType>;
        readonly default: "info";
        readonly validator: (val: string) => boolean;
    };
    readonly effect: {
        readonly type: import("vue").PropType<import("./index.js").AlertEffect>;
        readonly default: "light";
        readonly validator: (val: string) => boolean;
    };
    readonly closable: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly closeText: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly closeIcon: {
        readonly type: import("vue").PropType<string | import("vue").Component>;
        readonly default: "";
    };
    readonly showIcon: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly icon: {
        readonly type: import("vue").PropType<string | import("vue").Component>;
        readonly default: "";
    };
    readonly center: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly scrollable: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly scrollSpeed: {
        readonly type: NumberConstructor;
        readonly default: 15;
    };
    readonly pauseOnHover: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly duration: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly showProgress: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>> & Readonly<{
    onClose?: ((evt: MouseEvent) => any) | undefined;
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    close: (evt: MouseEvent) => void;
}, string, {
    readonly title: string;
    readonly description: string;
    readonly effect: "dark" | "light" | "outline" | "glass";
    readonly type: "error" | "success" | "warning" | "info";
    readonly center: boolean;
    readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
    readonly icon: string | import("vue").Component;
    readonly closable: boolean;
    readonly duration: number;
    readonly showProgress: boolean;
    readonly closeText: string;
    readonly closeIcon: string | import("vue").Component;
    readonly showIcon: boolean;
    readonly scrollable: boolean;
    readonly scrollSpeed: number;
    readonly pauseOnHover: boolean;
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        icon?: (props: {}) => any;
    } & {
        title?: (props: {}) => any;
    } & {
        default?: (props: {}) => any;
    } & {
        default?: (props: {}) => any;
    } & {
        action?: (props: {}) => any;
    } & {
        close?: (props: {}) => any;
    };
})> & Record<string, unknown>;
export default YhAlert;
export * from './src/alert';
export type AlertInstance = InstanceType<typeof Alert>;
export type YhAlertInstance = AlertInstance;
export type YhAlertProps = import('./src/alert').AlertProps;
export type YhAlertEmits = import('./src/alert').AlertEmits;
export type YhAlertSlots = import('./src/alert').AlertSlots;
export type YhAlertType = import('./src/alert').AlertType;
export type YhAlertEffect = import('./src/alert').AlertEffect;
