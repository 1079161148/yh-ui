declare var __VLS_53: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_53) => any;
};
declare const __VLS_component: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly name: {
        readonly type: StringConstructor;
        readonly required: true;
    };
    readonly byte: {
        readonly type: NumberConstructor;
        readonly default: undefined;
    };
    readonly size: {
        readonly type: import("vue").PropType<import("./ai-file-card").FileCardSize>;
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
        readonly type: import("vue").PropType<import("./ai-file-card").FileCardType>;
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
        readonly type: import("vue").PropType<import("./ai-file-card").PresetFileIcons>;
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
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    click: () => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly name: {
        readonly type: StringConstructor;
        readonly required: true;
    };
    readonly byte: {
        readonly type: NumberConstructor;
        readonly default: undefined;
    };
    readonly size: {
        readonly type: import("vue").PropType<import("./ai-file-card").FileCardSize>;
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
        readonly type: import("vue").PropType<import("./ai-file-card").FileCardType>;
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
        readonly type: import("vue").PropType<import("./ai-file-card").PresetFileIcons>;
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
}>, {
    readonly size: import("./ai-file-card").FileCardSize;
    readonly loading: boolean;
    readonly description: string;
    readonly type: string;
    readonly mask: string;
    readonly themeOverrides: Record<string, unknown>;
    readonly icon: import("./ai-file-card").PresetFileIcons;
    readonly src: string;
    readonly byte: number;
    readonly imageProps: Record<string, unknown>;
    readonly videoProps: Record<string, unknown>;
    readonly audioProps: Record<string, unknown>;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
