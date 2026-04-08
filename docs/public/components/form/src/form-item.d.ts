import type { ExtractPropTypes, PropType } from 'vue';
import type { FormRule } from './form';
import { FormItemContextKey } from '@yh-ui/hooks';
export type { FormItemContext } from '@yh-ui/hooks';
export { FormItemContextKey };
/**
 * 校验状态
 */
export type ValidateStatus = 'success' | 'error' | 'validating' | '';
/**
 * FormItem Props 定义
 */
export declare const formItemProps: {
    /**
     * 对应 model 里的字段名
     */
    readonly prop: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    /**
     * 标签文本
     */
    readonly label: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    /**
     * 标签宽度，覆盖 Form 的设置
     */
    readonly labelWidth: {
        readonly type: PropType<string | number>;
        readonly default: "";
    };
    /**
     * 是否必填
     */
    readonly required: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /**
     * 校验规则，覆盖 Form 的设置
     */
    readonly rules: {
        readonly type: PropType<FormRule | FormRule[]>;
        readonly default: () => never[];
    };
    /**
     * 是否显示校验错误信息
     */
    readonly showMessage: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    /**
     * 尺寸，覆盖 Form 的设置
     */
    readonly size: {
        readonly type: PropType<"large" | "default" | "small">;
        readonly default: "";
    };
    /**
     * 校验触发时机
     */
    readonly validateTrigger: {
        readonly type: PropType<string | string[]>;
        readonly default: "";
    };
    /**
     * 错误信息对齐方式
     */
    readonly errorPosition: {
        readonly type: PropType<"left" | "center" | "right">;
        readonly default: "left";
    };
    /**
     * 是否禁用
     */
    readonly disabled: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /**
     * 表单项校验状态
     */
    readonly validateStatus: {
        readonly type: PropType<ValidateStatus>;
        readonly default: "";
    };
    /**
     * 自定义错误信息
     */
    readonly error: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    /** 主题覆盖变量 */
    readonly themeOverrides: {
        readonly type: PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
};
export type FormItemProps = ExtractPropTypes<typeof formItemProps>;
