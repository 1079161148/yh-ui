import 'highlight.js/styles/atom-one-dark.css';
declare var __VLS_5: {}, __VLS_63: {};
type __VLS_Slots = {} & {
    actions?: (props: typeof __VLS_5) => any;
} & {
    default?: (props: typeof __VLS_63) => any;
};
declare const __VLS_component: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly language: {
        readonly type: StringConstructor;
        readonly default: "text";
    };
    readonly code: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly filename: StringConstructor;
    readonly showLineNumbers: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly highlightLines: {
        readonly type: import("vue").PropType<number[]>;
        readonly default: () => never[];
    };
    readonly collapsible: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly defaultCollapsed: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly showRun: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly showEdit: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly highlight: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly editable: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    edit: (code: string) => void;
    copy: (code: string) => void;
    run: (code: string) => void;
    update: (code: string) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly language: {
        readonly type: StringConstructor;
        readonly default: "text";
    };
    readonly code: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly filename: StringConstructor;
    readonly showLineNumbers: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly highlightLines: {
        readonly type: import("vue").PropType<number[]>;
        readonly default: () => never[];
    };
    readonly collapsible: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly defaultCollapsed: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly showRun: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly showEdit: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly highlight: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly editable: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>> & Readonly<{
    onEdit?: ((code: string) => any) | undefined;
    onCopy?: ((code: string) => any) | undefined;
    onRun?: ((code: string) => any) | undefined;
    onUpdate?: ((code: string) => any) | undefined;
}>, {
    readonly code: string;
    readonly language: string;
    readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
    readonly editable: boolean;
    readonly highlight: boolean;
    readonly collapsible: boolean;
    readonly showLineNumbers: boolean;
    readonly highlightLines: number[];
    readonly defaultCollapsed: boolean;
    readonly showRun: boolean;
    readonly showEdit: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
