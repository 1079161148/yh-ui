import type { AiThoughtStatus, AiThoughtItem } from './ai-thought-chain';
declare var __VLS_49: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_49) => any;
};
declare const __VLS_component: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly title: StringConstructor;
    readonly thinking: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly content: StringConstructor;
    readonly status: {
        readonly type: import("vue").PropType<AiThoughtStatus>;
        readonly default: "none";
    };
    readonly items: {
        readonly type: import("vue").PropType<AiThoughtItem[]>;
        readonly default: () => never[];
    };
    readonly autoCollapse: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly dotSize: {
        readonly type: import("vue").PropType<"small" | "default" | "large">;
        readonly default: "default";
    };
    readonly lineGradient: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly showProgress: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly draggable: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly editable: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly markdown: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly className: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly classNames: {
        readonly type: import("vue").PropType<Record<string, string>>;
        readonly default: () => {};
    };
    readonly styles: {
        readonly type: import("vue").PropType<Record<string, string>>;
        readonly default: () => {};
    };
    readonly style: {
        readonly type: import("vue").PropType<Record<string, string>>;
        readonly default: () => {};
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "node-click": (item: AiThoughtItem, index: number) => void;
    "update:items": (items: AiThoughtItem[]) => void;
    "node-delete": (item: AiThoughtItem, index: number) => void;
    "node-add": (index: number) => void;
    reorder: (items: AiThoughtItem[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly title: StringConstructor;
    readonly thinking: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly content: StringConstructor;
    readonly status: {
        readonly type: import("vue").PropType<AiThoughtStatus>;
        readonly default: "none";
    };
    readonly items: {
        readonly type: import("vue").PropType<AiThoughtItem[]>;
        readonly default: () => never[];
    };
    readonly autoCollapse: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly dotSize: {
        readonly type: import("vue").PropType<"small" | "default" | "large">;
        readonly default: "default";
    };
    readonly lineGradient: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly showProgress: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly draggable: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly editable: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly markdown: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly className: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly classNames: {
        readonly type: import("vue").PropType<Record<string, string>>;
        readonly default: () => {};
    };
    readonly styles: {
        readonly type: import("vue").PropType<Record<string, string>>;
        readonly default: () => {};
    };
    readonly style: {
        readonly type: import("vue").PropType<Record<string, string>>;
        readonly default: () => {};
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>> & Readonly<{
    "onNode-click"?: ((item: AiThoughtItem, index: number) => any) | undefined;
    "onUpdate:items"?: ((items: AiThoughtItem[]) => any) | undefined;
    "onNode-delete"?: ((item: AiThoughtItem, index: number) => any) | undefined;
    "onNode-add"?: ((index: number) => any) | undefined;
    onReorder?: ((items: AiThoughtItem[]) => any) | undefined;
}>, {
    readonly style: Record<string, string>;
    readonly thinking: boolean;
    readonly status: AiThoughtStatus;
    readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
    readonly dotSize: "large" | "default" | "small";
    readonly draggable: boolean;
    readonly editable: boolean;
    readonly items: AiThoughtItem[];
    readonly showProgress: boolean;
    readonly className: string;
    readonly markdown: boolean;
    readonly autoCollapse: boolean;
    readonly lineGradient: boolean;
    readonly classNames: Record<string, string>;
    readonly styles: Record<string, string>;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
