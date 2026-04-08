import type { FormInstance } from './form';
import type { FormSchemaItem } from './form-schema';
declare var __VLS_17: `label-${string}`, __VLS_18: {
    model: Record<string, unknown>;
    item: FormSchemaItem;
}, __VLS_25: `field-${string}`, __VLS_26: {
    model: Record<string, unknown>;
    item: FormSchemaItem;
    handleUpdate: (field: string, val: unknown) => void;
}, __VLS_62: `field-${string}-${string}`, __VLS_63: {
    row: Record<string, unknown>;
    index: number;
    item: FormSchemaItem;
}, __VLS_80: `list-footer-${string}`, __VLS_81: {
    model: Record<string, unknown>;
    item: FormSchemaItem;
}, __VLS_87: `label-${string}`, __VLS_88: {
    model: Record<string, unknown>;
    item: FormSchemaItem;
}, __VLS_95: `field-${string}`, __VLS_96: {
    model: Record<string, unknown>;
    item: FormSchemaItem;
    handleUpdate: (field: string, val: unknown) => void;
}, __VLS_114: {
    model: Record<string, unknown>;
    formRef: {
        validate: (props?: string | string[] | ((isValid: boolean, invalidFields?: Record<string, unknown>) => void) | undefined, callback?: ((isValid: boolean, invalidFields?: Record<string, unknown>) => void) | undefined) => Promise<boolean> | undefined;
        resetFields: (props?: string | string[] | undefined) => void | undefined;
        clearValidate: (props?: string | string[] | undefined) => void | undefined;
        scrollToField: (field: string) => void | undefined;
    };
};
type __VLS_Slots = {} & {
    [K in NonNullable<typeof __VLS_17>]?: (props: typeof __VLS_18) => any;
} & {
    [K in NonNullable<typeof __VLS_25>]?: (props: typeof __VLS_26) => any;
} & {
    [K in NonNullable<typeof __VLS_62>]?: (props: typeof __VLS_63) => any;
} & {
    [K in NonNullable<typeof __VLS_80>]?: (props: typeof __VLS_81) => any;
} & {
    [K in NonNullable<typeof __VLS_87>]?: (props: typeof __VLS_88) => any;
} & {
    [K in NonNullable<typeof __VLS_95>]?: (props: typeof __VLS_96) => any;
} & {
    footer?: (props: typeof __VLS_114) => any;
};
declare const __VLS_component: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly modelValue: {
        readonly type: import("vue").PropType<Record<string, unknown>>;
        readonly required: true;
    };
    readonly schema: {
        readonly type: import("vue").PropType<import("./form-schema").FormSchema>;
        readonly required: true;
        readonly default: () => never[];
    };
    readonly formProps: {
        readonly type: import("vue").PropType<Partial<import("./form").FormProps>>;
        readonly default: () => {};
    };
    readonly gutter: {
        readonly type: NumberConstructor;
        readonly default: 20;
    };
}>, {
    /** 触发校验，支持指定字段 */
    validate: (fields?: string | string[], callback?: (isValid: boolean) => void) => Promise<boolean> | undefined;
    /** 重置字段（恢复初始值并清除校验），支持指定字段 */
    resetFields: (fields?: string | string[]) => void | undefined;
    /** 清除指定字段校验结果 */
    clearValidate: (fields?: string | string[]) => void | undefined;
    /** 滚动到指定字段 */
    scrollToField: (field: string) => void | undefined;
    /** 获取当前表单数据快照 */
    getModel: () => {
        [x: string]: unknown;
    };
    /** 动态更新单个字段值 */
    setFieldValue: (field: string, val: unknown) => void;
    /** 底层 form 实例 */
    formRef: import("vue").Ref<FormInstance | undefined, FormInstance | undefined>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    submit: (val: Record<string, unknown>) => any;
    change: (field: string, val: unknown, model: Record<string, unknown>) => any;
    "update:modelValue": (val: Record<string, unknown>) => any;
    validate: (isValid: boolean, invalidFields?: Record<string, unknown> | undefined) => any;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly modelValue: {
        readonly type: import("vue").PropType<Record<string, unknown>>;
        readonly required: true;
    };
    readonly schema: {
        readonly type: import("vue").PropType<import("./form-schema").FormSchema>;
        readonly required: true;
        readonly default: () => never[];
    };
    readonly formProps: {
        readonly type: import("vue").PropType<Partial<import("./form").FormProps>>;
        readonly default: () => {};
    };
    readonly gutter: {
        readonly type: NumberConstructor;
        readonly default: 20;
    };
}>> & Readonly<{
    onSubmit?: ((val: Record<string, unknown>) => any) | undefined;
    onChange?: ((field: string, val: unknown, model: Record<string, unknown>) => any) | undefined;
    "onUpdate:modelValue"?: ((val: Record<string, unknown>) => any) | undefined;
    onValidate?: ((isValid: boolean, invalidFields?: Record<string, unknown> | undefined) => any) | undefined;
}>, {
    readonly schema: import("./form-schema").FormSchema;
    readonly formProps: Partial<import("./form").FormProps>;
    readonly gutter: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
