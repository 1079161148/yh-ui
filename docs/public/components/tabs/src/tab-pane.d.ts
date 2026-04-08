import type { ExtractPropTypes, PropType } from 'vue';
export declare const tabPaneProps: {
    /** 唯一标识 */
    readonly name: {
        readonly type: PropType<string | number>;
        readonly required: true;
    };
    /** 标签标题 */
    readonly label: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    /** 是否禁用 */
    readonly disabled: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /** 是否可关闭 */
    readonly closable: {
        readonly type: BooleanConstructor;
        readonly default: undefined;
    };
    /** 是否延迟渲染(首次激活后渲染) */
    readonly lazy: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /** 图标类名 */
    readonly icon: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    /** 主题覆盖变量 */
    readonly themeOverrides: {
        readonly type: PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
};
export type TabPaneProps = ExtractPropTypes<typeof tabPaneProps>;
