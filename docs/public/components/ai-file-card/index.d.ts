import AiFileCard from './src/ai-file-card.vue';
export declare const YhAiFileCard: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("vue").ExtractPropTypes<{
        readonly name: {
            readonly type: StringConstructor;
            readonly required: true;
        };
        readonly byte: {
            readonly type: NumberConstructor;
            readonly default: undefined;
        };
        readonly size: {
            readonly type: import("vue").PropType<import("./index.js").FileCardSize>;
            readonly default: "default";
        };
        readonly description: {
            readonly type: StringConstructor;
            readonly default: undefined;
        };
        readonly loading: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly type: {
            readonly type: import("vue").PropType<import("./index.js").FileCardType>;
            readonly default: "file";
        };
        readonly src: {
            readonly type: StringConstructor;
            readonly default: undefined;
        };
        readonly mask: {
            readonly type: StringConstructor;
            readonly default: undefined;
        };
        readonly icon: {
            readonly type: import("vue").PropType<import("./index.js").PresetFileIcons>;
            readonly default: "default";
        };
        readonly imageProps: {
            readonly type: import("vue").PropType<Record<string, unknown>>;
            readonly default: () => {};
        };
        readonly videoProps: {
            readonly type: import("vue").PropType<Record<string, unknown>>;
            readonly default: () => {};
        };
        readonly audioProps: {
            readonly type: import("vue").PropType<Record<string, unknown>>;
            readonly default: () => {};
        };
        readonly themeOverrides: {
            readonly type: import("vue").PropType<Record<string, unknown>>;
            readonly default: undefined;
        };
    }>> & Readonly<{
        onClick?: (() => any) | undefined;
    }>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        click: () => void;
    }, import("vue").PublicProps, {
        readonly size: import("./index.js").FileCardSize;
        readonly loading: boolean;
        readonly description: string;
        readonly type: string;
        readonly mask: string;
        readonly themeOverrides: Record<string, unknown>;
        readonly icon: import("./index.js").PresetFileIcons;
        readonly src: string;
        readonly byte: number;
        readonly imageProps: Record<string, unknown>;
        readonly videoProps: Record<string, unknown>;
        readonly audioProps: Record<string, unknown>;
    }, true, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
        readonly name: {
            readonly type: StringConstructor;
            readonly required: true;
        };
        readonly byte: {
            readonly type: NumberConstructor;
            readonly default: undefined;
        };
        readonly size: {
            readonly type: import("vue").PropType<import("./index.js").FileCardSize>;
            readonly default: "default";
        };
        readonly description: {
            readonly type: StringConstructor;
            readonly default: undefined;
        };
        readonly loading: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly type: {
            readonly type: import("vue").PropType<import("./index.js").FileCardType>;
            readonly default: "file";
        };
        readonly src: {
            readonly type: StringConstructor;
            readonly default: undefined;
        };
        readonly mask: {
            readonly type: StringConstructor;
            readonly default: undefined;
        };
        readonly icon: {
            readonly type: import("vue").PropType<import("./index.js").PresetFileIcons>;
            readonly default: "default";
        };
        readonly imageProps: {
            readonly type: import("vue").PropType<Record<string, unknown>>;
            readonly default: () => {};
        };
        readonly videoProps: {
            readonly type: import("vue").PropType<Record<string, unknown>>;
            readonly default: () => {};
        };
        readonly audioProps: {
            readonly type: import("vue").PropType<Record<string, unknown>>;
            readonly default: () => {};
        };
        readonly themeOverrides: {
            readonly type: import("vue").PropType<Record<string, unknown>>;
            readonly default: undefined;
        };
    }>> & Readonly<{
        onClick?: (() => any) | undefined;
    }>, {}, {}, {}, {}, {
        readonly size: import("./index.js").FileCardSize;
        readonly loading: boolean;
        readonly description: string;
        readonly type: string;
        readonly mask: string;
        readonly themeOverrides: Record<string, unknown>;
        readonly icon: import("./index.js").PresetFileIcons;
        readonly src: string;
        readonly byte: number;
        readonly imageProps: Record<string, unknown>;
        readonly videoProps: Record<string, unknown>;
        readonly audioProps: Record<string, unknown>;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
    readonly name: {
        readonly type: StringConstructor;
        readonly required: true;
    };
    readonly byte: {
        readonly type: NumberConstructor;
        readonly default: undefined;
    };
    readonly size: {
        readonly type: import("vue").PropType<import("./index.js").FileCardSize>;
        readonly default: "default";
    };
    readonly description: {
        readonly type: StringConstructor;
        readonly default: undefined;
    };
    readonly loading: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly type: {
        readonly type: import("vue").PropType<import("./index.js").FileCardType>;
        readonly default: "file";
    };
    readonly src: {
        readonly type: StringConstructor;
        readonly default: undefined;
    };
    readonly mask: {
        readonly type: StringConstructor;
        readonly default: undefined;
    };
    readonly icon: {
        readonly type: import("vue").PropType<import("./index.js").PresetFileIcons>;
        readonly default: "default";
    };
    readonly imageProps: {
        readonly type: import("vue").PropType<Record<string, unknown>>;
        readonly default: () => {};
    };
    readonly videoProps: {
        readonly type: import("vue").PropType<Record<string, unknown>>;
        readonly default: () => {};
    };
    readonly audioProps: {
        readonly type: import("vue").PropType<Record<string, unknown>>;
        readonly default: () => {};
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<Record<string, unknown>>;
        readonly default: undefined;
    };
}>> & Readonly<{
    onClick?: (() => any) | undefined;
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    click: () => void;
}, string, {
    readonly size: import("./index.js").FileCardSize;
    readonly loading: boolean;
    readonly description: string;
    readonly type: string;
    readonly mask: string;
    readonly themeOverrides: Record<string, unknown>;
    readonly icon: import("./index.js").PresetFileIcons;
    readonly src: string;
    readonly byte: number;
    readonly imageProps: Record<string, unknown>;
    readonly videoProps: Record<string, unknown>;
    readonly audioProps: Record<string, unknown>;
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        default?: (props: {}) => any;
    };
})> & Record<string, unknown>;
export default YhAiFileCard;
export * from './src/ai-file-card';
export type AiFileCardInstance = InstanceType<typeof AiFileCard>;
export type YhAiFileCardInstance = AiFileCardInstance;
export type YhAiFileCardProps = import('./src/ai-file-card').AiFileCardProps;
export type YhAiFileCardEmits = import('./src/ai-file-card').AiFileCardEmits;
export type YhAiFileCardSlots = import('./src/ai-file-card').AiFileCardSlots;
export type YhPresetFileIcons = import('./src/ai-file-card').PresetFileIcons;
export type YhFileCardType = import('./src/ai-file-card').FileCardType;
export type YhFileCardSize = import('./src/ai-file-card').FileCardSize;
export type YhFileCardProps = import('./src/ai-file-card').FileCardProps;
export type YhFileCardListItem = import('./src/ai-file-card').FileCardListItem;
export type YhFileCardListProps = import('./src/ai-file-card').FileCardListProps;
