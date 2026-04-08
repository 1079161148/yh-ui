declare var __VLS_1: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_1) => any;
};
declare const __VLS_component: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly label: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly span: {
        readonly type: NumberConstructor;
        readonly default: 1;
    };
    readonly width: {
        readonly type: import("vue").PropType<string | number>;
        readonly default: "";
    };
    readonly minWidth: {
        readonly type: import("vue").PropType<string | number>;
        readonly default: "";
    };
    readonly align: {
        readonly type: import("vue").PropType<"left" | "center" | "right">;
        readonly default: "left";
    };
    readonly labelAlign: {
        readonly type: import("vue").PropType<"left" | "center" | "right">;
        readonly default: "left";
    };
    readonly className: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly labelClassName: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly labelStyle: {
        readonly type: import("vue").PropType<import("vue").CSSProperties>;
    };
    readonly contentStyle: {
        readonly type: import("vue").PropType<import("vue").CSSProperties>;
    };
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly label: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly span: {
        readonly type: NumberConstructor;
        readonly default: 1;
    };
    readonly width: {
        readonly type: import("vue").PropType<string | number>;
        readonly default: "";
    };
    readonly minWidth: {
        readonly type: import("vue").PropType<string | number>;
        readonly default: "";
    };
    readonly align: {
        readonly type: import("vue").PropType<"left" | "center" | "right">;
        readonly default: "left";
    };
    readonly labelAlign: {
        readonly type: import("vue").PropType<"left" | "center" | "right">;
        readonly default: "left";
    };
    readonly className: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly labelClassName: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly labelStyle: {
        readonly type: import("vue").PropType<import("vue").CSSProperties>;
    };
    readonly contentStyle: {
        readonly type: import("vue").PropType<import("vue").CSSProperties>;
    };
}>> & Readonly<{}>, {
    readonly label: string;
    readonly span: number;
    readonly width: string | number;
    readonly minWidth: string | number;
    readonly align: "center" | "left" | "right";
    readonly labelClassName: string;
    readonly labelAlign: "center" | "left" | "right";
    readonly className: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
