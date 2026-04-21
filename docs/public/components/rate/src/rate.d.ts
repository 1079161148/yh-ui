import type { ExtractPropTypes, PropType, Component } from 'vue';
export type RateSize = 'large' | 'default' | 'small';
export declare const rateProps: {
    readonly modelValue: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly max: {
        readonly type: NumberConstructor;
        readonly default: 5;
    };
    readonly disabled: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly allowHalf: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly icon: {
        readonly type: PropType<string | Component>;
        readonly default: "";
    };
    readonly voidIcon: {
        readonly type: PropType<string | Component>;
        readonly default: "";
    };
    readonly disabledVoidIcon: {
        readonly type: PropType<string | Component>;
        readonly default: "";
    };
    readonly colors: {
        readonly type: PropType<string[] | Record<number, string> | string>;
        readonly default: "#F7BA2A";
    };
    readonly voidColor: {
        readonly type: StringConstructor;
        readonly default: "#C6D1DE";
    };
    readonly disabledVoidColor: {
        readonly type: StringConstructor;
        readonly default: "#EFF2F7";
    };
    readonly showScore: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly showText: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly textColor: {
        readonly type: StringConstructor;
        readonly default: "#1f2d3d";
    };
    readonly texts: {
        readonly type: PropType<string[]>;
        readonly default: () => never[];
    };
    readonly scoreTemplate: {
        readonly type: StringConstructor;
        readonly default: "{value}";
    };
    readonly size: {
        readonly type: PropType<RateSize>;
        readonly default: "default";
    };
    readonly clearable: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /** 主题覆盖变量 */
    readonly themeOverrides: {
        readonly type: PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
};
export type RateProps = ExtractPropTypes<typeof rateProps>;
export declare const rateEmits: {
    'update:modelValue': (value: number) => boolean;
    change: (value: number) => boolean;
};
export type RateEmits = typeof rateEmits;
export interface RateSlots {
    icon?: (props: {
        index: number;
        width: string;
        activeColor: string;
        voidColor: string;
    }) => unknown;
}
