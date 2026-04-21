import AiConversations from './src/ai-conversations.vue';
export declare const YhAiConversations: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("vue").ExtractPropTypes<{
        data: {
            type: import("vue").PropType<import("@yh-ui/hooks").AiConversation[]>;
            default: () => never[];
        };
        activeId: {
            type: StringConstructor;
            default: string;
        };
        loading: {
            type: BooleanConstructor;
            default: boolean;
        };
        themeOverrides: {
            type: import("vue").PropType<import("@yh-ui/theme").AiConversationsThemeVars>;
            default: undefined;
        };
        grouped: {
            type: BooleanConstructor;
            default: boolean;
        };
        virtualScroll: {
            type: BooleanConstructor;
            default: boolean;
        };
        virtualScrollHeight: {
            type: NumberConstructor;
            default: number;
        };
        virtualScrollItemHeight: {
            type: NumberConstructor;
            default: number;
        };
        virtualScrollOverscan: {
            type: NumberConstructor;
            default: number;
        };
    }>> & Readonly<{
        onDelete?: ((conversation: import("@yh-ui/hooks").AiConversation) => any) | undefined;
        onEdit?: ((conversation: import("@yh-ui/hooks").AiConversation, newTitle: string) => any) | undefined;
        onPin?: ((conversation: import("@yh-ui/hooks").AiConversation, pinned: boolean) => any) | undefined;
        onClick?: ((conversation: import("@yh-ui/hooks").AiConversation) => any) | undefined;
        "onUpdate:activeId"?: ((id: string) => any) | undefined;
        onCreate?: (() => any) | undefined;
    }>, {
        scrollToItem: (id: string) => void;
        scrollToIndex: (index: number) => void;
    }, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        delete: (conversation: import("@yh-ui/hooks").AiConversation) => void;
        edit: (conversation: import("@yh-ui/hooks").AiConversation, newTitle: string) => void;
        pin: (conversation: import("@yh-ui/hooks").AiConversation, pinned: boolean) => void;
        click: (conversation: import("@yh-ui/hooks").AiConversation) => void;
        "update:activeId": (id: string) => void;
        create: () => void;
    }, import("vue").PublicProps, {
        data: import("@yh-ui/hooks").AiConversation[];
        loading: boolean;
        themeOverrides: import("@yh-ui/theme").AiConversationsThemeVars;
        virtualScroll: boolean;
        activeId: string;
        grouped: boolean;
        virtualScrollHeight: number;
        virtualScrollItemHeight: number;
        virtualScrollOverscan: number;
    }, true, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
        data: {
            type: import("vue").PropType<import("@yh-ui/hooks").AiConversation[]>;
            default: () => never[];
        };
        activeId: {
            type: StringConstructor;
            default: string;
        };
        loading: {
            type: BooleanConstructor;
            default: boolean;
        };
        themeOverrides: {
            type: import("vue").PropType<import("@yh-ui/theme").AiConversationsThemeVars>;
            default: undefined;
        };
        grouped: {
            type: BooleanConstructor;
            default: boolean;
        };
        virtualScroll: {
            type: BooleanConstructor;
            default: boolean;
        };
        virtualScrollHeight: {
            type: NumberConstructor;
            default: number;
        };
        virtualScrollItemHeight: {
            type: NumberConstructor;
            default: number;
        };
        virtualScrollOverscan: {
            type: NumberConstructor;
            default: number;
        };
    }>> & Readonly<{
        onDelete?: ((conversation: import("@yh-ui/hooks").AiConversation) => any) | undefined;
        onEdit?: ((conversation: import("@yh-ui/hooks").AiConversation, newTitle: string) => any) | undefined;
        onPin?: ((conversation: import("@yh-ui/hooks").AiConversation, pinned: boolean) => any) | undefined;
        onClick?: ((conversation: import("@yh-ui/hooks").AiConversation) => any) | undefined;
        "onUpdate:activeId"?: ((id: string) => any) | undefined;
        onCreate?: (() => any) | undefined;
    }>, {
        scrollToItem: (id: string) => void;
        scrollToIndex: (index: number) => void;
    }, {}, {}, {}, {
        data: import("@yh-ui/hooks").AiConversation[];
        loading: boolean;
        themeOverrides: import("@yh-ui/theme").AiConversationsThemeVars;
        virtualScroll: boolean;
        activeId: string;
        grouped: boolean;
        virtualScrollHeight: number;
        virtualScrollItemHeight: number;
        virtualScrollOverscan: number;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
    data: {
        type: import("vue").PropType<import("@yh-ui/hooks").AiConversation[]>;
        default: () => never[];
    };
    activeId: {
        type: StringConstructor;
        default: string;
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    themeOverrides: {
        type: import("vue").PropType<import("@yh-ui/theme").AiConversationsThemeVars>;
        default: undefined;
    };
    grouped: {
        type: BooleanConstructor;
        default: boolean;
    };
    virtualScroll: {
        type: BooleanConstructor;
        default: boolean;
    };
    virtualScrollHeight: {
        type: NumberConstructor;
        default: number;
    };
    virtualScrollItemHeight: {
        type: NumberConstructor;
        default: number;
    };
    virtualScrollOverscan: {
        type: NumberConstructor;
        default: number;
    };
}>> & Readonly<{
    onDelete?: ((conversation: import("@yh-ui/hooks").AiConversation) => any) | undefined;
    onEdit?: ((conversation: import("@yh-ui/hooks").AiConversation, newTitle: string) => any) | undefined;
    onPin?: ((conversation: import("@yh-ui/hooks").AiConversation, pinned: boolean) => any) | undefined;
    onClick?: ((conversation: import("@yh-ui/hooks").AiConversation) => any) | undefined;
    "onUpdate:activeId"?: ((id: string) => any) | undefined;
    onCreate?: (() => any) | undefined;
}>, {
    scrollToItem: (id: string) => void;
    scrollToIndex: (index: number) => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    delete: (conversation: import("@yh-ui/hooks").AiConversation) => void;
    edit: (conversation: import("@yh-ui/hooks").AiConversation, newTitle: string) => void;
    pin: (conversation: import("@yh-ui/hooks").AiConversation, pinned: boolean) => void;
    click: (conversation: import("@yh-ui/hooks").AiConversation) => void;
    "update:activeId": (id: string) => void;
    create: () => void;
}, string, {
    data: import("@yh-ui/hooks").AiConversation[];
    loading: boolean;
    themeOverrides: import("@yh-ui/theme").AiConversationsThemeVars;
    virtualScroll: boolean;
    activeId: string;
    grouped: boolean;
    virtualScrollHeight: number;
    virtualScrollItemHeight: number;
    virtualScrollOverscan: number;
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        'add-icon'?: (props: {}) => any;
    } & {
        'add-text'?: (props: {}) => any;
    } & {
        'group-label'?: (props: {
            label: "today" | "last7Days" | "last30Days" | "earlier" | "pinned";
        }) => any;
    } & {
        'edit-icon'?: (props: {}) => any;
    } & {
        'delete-icon'?: (props: {}) => any;
    } & {
        empty?: (props: {}) => any;
    };
})> & Record<string, unknown>;
export default YhAiConversations;
export * from './src/ai-conversations';
export type AiConversationsInstance = InstanceType<typeof AiConversations>;
export type YhAiConversationsInstance = AiConversationsInstance;
export type YhAiConversationsProps = import('./src/ai-conversations').AiConversationsProps;
export type YhAiConversationsEmits = import('./src/ai-conversations').AiConversationsEmits;
export type YhAiConversationsSlots = import('./src/ai-conversations').AiConversationsSlots;
export type YhAiConversationsExpose = import('./src/ai-conversations').AiConversationsExpose;
