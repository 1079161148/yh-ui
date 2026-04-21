import Scrollbar from './src/scrollbar.vue';
export declare const YhScrollbar: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("vue").ExtractPropTypes<{
        readonly height: {
            readonly type: import("vue").PropType<string | number>;
            readonly default: "";
        };
        readonly maxHeight: {
            readonly type: import("vue").PropType<string | number>;
            readonly default: "";
        };
        readonly native: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly always: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly minSize: {
            readonly type: NumberConstructor;
            readonly default: 20;
        };
        readonly viewClass: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly viewStyle: {
            readonly type: import("vue").PropType<import("vue").StyleValue>;
            readonly default: "";
        };
        readonly noresize: BooleanConstructor;
        readonly tag: {
            readonly type: StringConstructor;
            readonly default: "div";
        };
        readonly themeOverrides: {
            readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
            readonly default: undefined;
        };
    }>> & Readonly<{
        onScroll?: ((args_0: import("./index.js").ScrollbarScrollPayload) => any) | undefined;
    }>, {
        wrap: import("vue").Ref<HTMLDivElement | undefined, HTMLDivElement | undefined>;
        update: () => void;
        scrollTo(options: ScrollToOptions | number, y?: number): void;
        setScrollTop(value: number): void;
        setScrollLeft(value: number): void;
    }, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        scroll: (args_0: import("./index.js").ScrollbarScrollPayload) => void;
    }, import("vue").PublicProps, {
        readonly tag: string;
        readonly height: string | number;
        readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
        readonly maxHeight: string | number;
        readonly always: boolean;
        readonly minSize: number;
        readonly native: boolean;
        readonly viewClass: string;
        readonly viewStyle: import("vue").StyleValue;
        readonly noresize: boolean;
    }, true, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
        readonly height: {
            readonly type: import("vue").PropType<string | number>;
            readonly default: "";
        };
        readonly maxHeight: {
            readonly type: import("vue").PropType<string | number>;
            readonly default: "";
        };
        readonly native: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly always: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly minSize: {
            readonly type: NumberConstructor;
            readonly default: 20;
        };
        readonly viewClass: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly viewStyle: {
            readonly type: import("vue").PropType<import("vue").StyleValue>;
            readonly default: "";
        };
        readonly noresize: BooleanConstructor;
        readonly tag: {
            readonly type: StringConstructor;
            readonly default: "div";
        };
        readonly themeOverrides: {
            readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
            readonly default: undefined;
        };
    }>> & Readonly<{
        onScroll?: ((args_0: import("./index.js").ScrollbarScrollPayload) => any) | undefined;
    }>, {
        wrap: import("vue").Ref<HTMLDivElement | undefined, HTMLDivElement | undefined>;
        update: () => void;
        scrollTo(options: ScrollToOptions | number, y?: number): void;
        setScrollTop(value: number): void;
        setScrollLeft(value: number): void;
    }, {}, {}, {}, {
        readonly tag: string;
        readonly height: string | number;
        readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
        readonly maxHeight: string | number;
        readonly always: boolean;
        readonly minSize: number;
        readonly native: boolean;
        readonly viewClass: string;
        readonly viewStyle: import("vue").StyleValue;
        readonly noresize: boolean;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
    readonly height: {
        readonly type: import("vue").PropType<string | number>;
        readonly default: "";
    };
    readonly maxHeight: {
        readonly type: import("vue").PropType<string | number>;
        readonly default: "";
    };
    readonly native: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly always: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly minSize: {
        readonly type: NumberConstructor;
        readonly default: 20;
    };
    readonly viewClass: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly viewStyle: {
        readonly type: import("vue").PropType<import("vue").StyleValue>;
        readonly default: "";
    };
    readonly noresize: BooleanConstructor;
    readonly tag: {
        readonly type: StringConstructor;
        readonly default: "div";
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>> & Readonly<{
    onScroll?: ((args_0: import("./index.js").ScrollbarScrollPayload) => any) | undefined;
}>, {
    wrap: import("vue").Ref<HTMLDivElement | undefined, HTMLDivElement | undefined>;
    update: () => void;
    scrollTo(options: ScrollToOptions | number, y?: number): void;
    setScrollTop(value: number): void;
    setScrollLeft(value: number): void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    scroll: (args_0: import("./index.js").ScrollbarScrollPayload) => void;
}, string, {
    readonly tag: string;
    readonly height: string | number;
    readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
    readonly maxHeight: string | number;
    readonly always: boolean;
    readonly minSize: number;
    readonly native: boolean;
    readonly viewClass: string;
    readonly viewStyle: import("vue").StyleValue;
    readonly noresize: boolean;
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        default?: (props: {}) => any;
    };
})> & Record<string, unknown>;
export default YhScrollbar;
export * from './src/scrollbar';
export type ScrollbarInstance = InstanceType<typeof Scrollbar>;
export type YhScrollbarInstance = ScrollbarInstance;
export type YhScrollbarProps = import('./src/scrollbar').ScrollbarProps;
export type YhScrollbarEmits = import('./src/scrollbar').ScrollbarEmits;
export type YhScrollbarSlots = import('./src/scrollbar').ScrollbarSlots;
export type YhScrollbarExpose = import('./src/scrollbar').ScrollbarExpose;
export type YhScrollbarScrollPayload = import('./src/scrollbar').ScrollbarScrollPayload;
export type YhScrollbarScrollToArg = import('./src/scrollbar').ScrollbarScrollToArg;
