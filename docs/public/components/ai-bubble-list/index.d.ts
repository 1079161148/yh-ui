import AiBubbleList from './src/ai-bubble-list.vue';
export declare const YhAiBubbleList: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("vue").ExtractPropTypes<{
        items: {
            type: import("vue").PropType<import("./index.js").AiBubbleListItem[]>;
            default: () => never[];
        };
        virtualScroll: {
            type: BooleanConstructor;
            default: boolean;
        };
        height: {
            type: import("vue").PropType<number | string>;
            default: number;
        };
        itemHeight: {
            type: NumberConstructor;
            default: number;
        };
        autoScroll: {
            type: BooleanConstructor;
            default: boolean;
        };
        loading: {
            type: BooleanConstructor;
            default: boolean;
        };
        themeOverrides: {
            type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
            default: undefined;
        };
    }>> & Readonly<{}>, {
        scrollToBottom: () => void;
        scrollToIndex: (index: number) => void;
        scrollRef: import("vue").Ref<HTMLElement | null, HTMLElement | null>;
    }, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {
        loading: boolean;
        height: string | number;
        themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
        itemHeight: number;
        items: import("./index.js").AiBubbleListItem[];
        virtualScroll: boolean;
        autoScroll: boolean;
    }, true, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
        items: {
            type: import("vue").PropType<import("./index.js").AiBubbleListItem[]>;
            default: () => never[];
        };
        virtualScroll: {
            type: BooleanConstructor;
            default: boolean;
        };
        height: {
            type: import("vue").PropType<number | string>;
            default: number;
        };
        itemHeight: {
            type: NumberConstructor;
            default: number;
        };
        autoScroll: {
            type: BooleanConstructor;
            default: boolean;
        };
        loading: {
            type: BooleanConstructor;
            default: boolean;
        };
        themeOverrides: {
            type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
            default: undefined;
        };
    }>> & Readonly<{}>, {
        scrollToBottom: () => void;
        scrollToIndex: (index: number) => void;
        scrollRef: import("vue").Ref<HTMLElement | null, HTMLElement | null>;
    }, {}, {}, {}, {
        loading: boolean;
        height: string | number;
        themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
        itemHeight: number;
        items: import("./index.js").AiBubbleListItem[];
        virtualScroll: boolean;
        autoScroll: boolean;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
    items: {
        type: import("vue").PropType<import("./index.js").AiBubbleListItem[]>;
        default: () => never[];
    };
    virtualScroll: {
        type: BooleanConstructor;
        default: boolean;
    };
    height: {
        type: import("vue").PropType<number | string>;
        default: number;
    };
    itemHeight: {
        type: NumberConstructor;
        default: number;
    };
    autoScroll: {
        type: BooleanConstructor;
        default: boolean;
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    themeOverrides: {
        type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        default: undefined;
    };
}>> & Readonly<{}>, {
    scrollToBottom: () => void;
    scrollToIndex: (index: number) => void;
    scrollRef: import("vue").Ref<HTMLElement | null, HTMLElement | null>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {
    loading: boolean;
    height: string | number;
    themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
    itemHeight: number;
    items: import("./index.js").AiBubbleListItem[];
    virtualScroll: boolean;
    autoScroll: boolean;
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        bubble?: (props: {
            item: import("./index.js").AiBubbleListItem;
            index: number;
        }) => any;
    } & {
        bubble?: (props: {
            item: import("./index.js").AiBubbleListItem;
            index: number;
        }) => any;
    } & {
        loading?: (props: {}) => any;
    };
})> & Record<string, unknown>;
export default YhAiBubbleList;
export * from './src/ai-bubble-list';
export type AiBubbleListInstance = InstanceType<typeof AiBubbleList>;
export type YhAiBubbleListInstance = AiBubbleListInstance;
export type YhAiBubbleListProps = import('./src/ai-bubble-list').AiBubbleListProps;
export type YhAiBubbleListSlots = import('./src/ai-bubble-list').AiBubbleListSlots;
export type YhAiBubbleListExpose = import('./src/ai-bubble-list').AiBubbleListExpose;
export type YhAiBubbleListItem = import('./src/ai-bubble-list').AiBubbleListItem;
