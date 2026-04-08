/**
 * Descriptions Types & Props
 * @description 描述列表组件类型定义，对标 市面组件库
 */
import type { ExtractPropTypes, PropType, InjectionKey, CSSProperties } from 'vue';
export declare const descriptionsProps: {
    readonly title: StringConstructor;
    readonly extra: StringConstructor;
    readonly column: {
        readonly type: NumberConstructor;
        readonly default: 3;
    };
    readonly direction: {
        readonly type: PropType<"horizontal" | "vertical">;
        readonly default: "horizontal";
    };
    readonly size: {
        readonly type: PropType<"large" | "default" | "small">;
        readonly default: "default";
    };
    readonly border: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly colon: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly labelStyle: {
        readonly type: PropType<CSSProperties>;
    };
    readonly contentStyle: {
        readonly type: PropType<CSSProperties>;
    };
    readonly labelClassName: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly contentClassName: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    /** 主题覆盖变量 */
    readonly themeOverrides: {
        readonly type: PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
};
export type DescriptionsProps = ExtractPropTypes<typeof descriptionsProps>;
export declare const descriptionsItemProps: {
    readonly label: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly span: {
        readonly type: NumberConstructor;
        readonly default: 1;
    };
    readonly width: {
        readonly type: PropType<string | number>;
        readonly default: "";
    };
    readonly minWidth: {
        readonly type: PropType<string | number>;
        readonly default: "";
    };
    readonly align: {
        readonly type: PropType<"left" | "center" | "right">;
        readonly default: "left";
    };
    readonly labelAlign: {
        readonly type: PropType<"left" | "center" | "right">;
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
        readonly type: PropType<CSSProperties>;
    };
    readonly contentStyle: {
        readonly type: PropType<CSSProperties>;
    };
};
export type DescriptionsItemProps = ExtractPropTypes<typeof descriptionsItemProps>;
export interface DescriptionsContext {
    props: DescriptionsProps;
}
export declare const descriptionsKey: InjectionKey<DescriptionsContext>;
