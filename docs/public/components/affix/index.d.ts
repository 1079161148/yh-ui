import Affix from './src/affix.vue';
export declare const YhAffix: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("vue").ExtractPropTypes<{
        readonly offset: {
            readonly type: NumberConstructor;
            readonly default: 0;
        };
        readonly position: {
            readonly type: import("vue").PropType<import("./index.js").AffixPosition>;
            readonly default: "top";
        };
        readonly target: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly zIndex: {
            readonly type: NumberConstructor;
            readonly default: 100;
        };
        readonly teleported: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly appendTo: {
            readonly type: import("vue").PropType<string | HTMLElement>;
            readonly default: "body";
        };
        readonly affixStyle: {
            readonly type: import("vue").PropType<import("vue").CSSProperties>;
            readonly default: () => {};
        };
        readonly disabled: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly themeOverrides: {
            readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
            readonly default: undefined;
        };
    }>> & Readonly<{
        onScroll?: ((payload: {
            scrollTop: number;
            fixed: boolean;
        }) => any) | undefined;
        onChange?: ((fixed: boolean) => any) | undefined;
    }>, {
        update: () => void;
        fixed: import("vue").Ref<boolean, boolean>;
        scrollTop: import("vue").Ref<number, number>;
    }, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        scroll: (payload: {
            scrollTop: number;
            fixed: boolean;
        }) => void;
        change: (fixed: boolean) => void;
    }, import("vue").PublicProps, {
        readonly disabled: boolean;
        readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
        readonly position: import("./index.js").AffixPosition;
        readonly zIndex: number;
        readonly offset: number;
        readonly target: string;
        readonly teleported: boolean;
        readonly appendTo: string | HTMLElement;
        readonly affixStyle: import("vue").CSSProperties;
    }, true, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
        readonly offset: {
            readonly type: NumberConstructor;
            readonly default: 0;
        };
        readonly position: {
            readonly type: import("vue").PropType<import("./index.js").AffixPosition>;
            readonly default: "top";
        };
        readonly target: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly zIndex: {
            readonly type: NumberConstructor;
            readonly default: 100;
        };
        readonly teleported: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly appendTo: {
            readonly type: import("vue").PropType<string | HTMLElement>;
            readonly default: "body";
        };
        readonly affixStyle: {
            readonly type: import("vue").PropType<import("vue").CSSProperties>;
            readonly default: () => {};
        };
        readonly disabled: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly themeOverrides: {
            readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
            readonly default: undefined;
        };
    }>> & Readonly<{
        onScroll?: ((payload: {
            scrollTop: number;
            fixed: boolean;
        }) => any) | undefined;
        onChange?: ((fixed: boolean) => any) | undefined;
    }>, {
        update: () => void;
        fixed: import("vue").Ref<boolean, boolean>;
        scrollTop: import("vue").Ref<number, number>;
    }, {}, {}, {}, {
        readonly disabled: boolean;
        readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
        readonly position: import("./index.js").AffixPosition;
        readonly zIndex: number;
        readonly offset: number;
        readonly target: string;
        readonly teleported: boolean;
        readonly appendTo: string | HTMLElement;
        readonly affixStyle: import("vue").CSSProperties;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
    readonly offset: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly position: {
        readonly type: import("vue").PropType<import("./index.js").AffixPosition>;
        readonly default: "top";
    };
    readonly target: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly zIndex: {
        readonly type: NumberConstructor;
        readonly default: 100;
    };
    readonly teleported: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly appendTo: {
        readonly type: import("vue").PropType<string | HTMLElement>;
        readonly default: "body";
    };
    readonly affixStyle: {
        readonly type: import("vue").PropType<import("vue").CSSProperties>;
        readonly default: () => {};
    };
    readonly disabled: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>> & Readonly<{
    onScroll?: ((payload: {
        scrollTop: number;
        fixed: boolean;
    }) => any) | undefined;
    onChange?: ((fixed: boolean) => any) | undefined;
}>, {
    update: () => void;
    fixed: import("vue").Ref<boolean, boolean>;
    scrollTop: import("vue").Ref<number, number>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    scroll: (payload: {
        scrollTop: number;
        fixed: boolean;
    }) => void;
    change: (fixed: boolean) => void;
}, string, {
    readonly disabled: boolean;
    readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
    readonly position: import("./index.js").AffixPosition;
    readonly zIndex: number;
    readonly offset: number;
    readonly target: string;
    readonly teleported: boolean;
    readonly appendTo: string | HTMLElement;
    readonly affixStyle: import("vue").CSSProperties;
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        default?: (props: {
            fixed: boolean;
        }) => any;
    };
})> & Record<string, unknown>;
export default YhAffix;
export * from './src/affix';
export type AffixInstance = InstanceType<typeof Affix>;
