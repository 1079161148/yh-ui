import type { ExtractPropTypes, PropType } from 'vue';
import type { ComponentThemeVars } from '@yh-ui/theme';
export declare const aiCodeBlockProps: {
    /**
     * @description 代码语言
     */
    readonly language: {
        readonly type: StringConstructor;
        readonly default: "text";
    };
    /**
     * @description 代码内容
     */
    readonly code: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    /**
     * @description 文件名称
     */
    readonly filename: StringConstructor;
    /**
     * @description 是否显示行号
     */
    readonly showLineNumbers: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /**
     * @description 高亮行号列表
     */
    readonly highlightLines: {
        readonly type: PropType<number[]>;
        readonly default: () => never[];
    };
    /**
     * @description 是否可折叠
     */
    readonly collapsible: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /**
     * @description 默认是否折叠
     */
    readonly defaultCollapsed: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /**
     * @description 是否显示运行按钮
     */
    readonly showRun: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /**
     * @description 是否显示编辑按钮
     */
    readonly showEdit: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /**
     * @description 是否高亮语法
     */
    readonly highlight: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    /**
     * @description 是否可编辑
     */
    readonly editable: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /**
     * @description 主题覆盖变量
     */
    readonly themeOverrides: {
        readonly type: PropType<ComponentThemeVars>;
        readonly default: undefined;
    };
};
export type AiCodeBlockProps = ExtractPropTypes<typeof aiCodeBlockProps>;
export declare const aiCodeBlockEmits: {
    copy: (code: string) => boolean;
    run: (code: string) => boolean;
    edit: (code: string) => boolean;
    update: (code: string) => boolean;
};
export type AiCodeBlockEmits = typeof aiCodeBlockEmits;
