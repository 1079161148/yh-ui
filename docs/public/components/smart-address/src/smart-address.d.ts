import type { ExtractPropTypes, PropType } from 'vue';
import type { ParsedAddress } from './use-address-parser';
export type { ParsedAddress };
export interface AddressValue {
    name: string;
    phone: string;
    province: string;
    city: string;
    district: string;
    street: string;
    detail: string;
}
export interface RegionOption {
    label?: string;
    value?: string | number;
    children?: RegionOption[];
    [key: string]: unknown;
}
export declare const smartAddressProps: {
    /** 当前地址值（支持 v-model） */
    modelValue: {
        type: PropType<AddressValue>;
        default: () => AddressValue;
    };
    /** 是否显示姓名字段 */
    showName: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 是否显示电话字段 */
    showPhone: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 是否显示街道字段 */
    showStreet: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 智能识别输入框的 placeholder */
    parsePlaceholder: {
        type: StringConstructor;
        default: string;
    };
    /** 是否必填（显示星号） */
    required: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 是否禁用 */
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 识别按钮文案 */
    parseButtonText: {
        type: StringConstructor;
        default: string;
    };
    /** 是否显示智能识别区域 */
    showParser: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 省市区输入模式 */
    regionType: {
        type: PropType<"input" | "select" | "cascader">;
        default: string;
    };
    /** 省市区选项数据源（树形） */
    regionOptions: {
        type: PropType<RegionOption[]>;
        default: () => never[];
    };
    /** 自定义选项的标签字段 */
    labelField: {
        type: StringConstructor;
        default: string;
    };
    /** 自定义选项的值字段 */
    valueField: {
        type: StringConstructor;
        default: string;
    };
    /** 自定义选项的子级字段 */
    childrenField: {
        type: StringConstructor;
        default: string;
    };
    /** 标签位置 */
    labelPlacement: {
        type: PropType<"left" | "top">;
        default: string;
    };
    /** 自定义解析函数 (用于替代内置解析逻辑) */
    parser: {
        type: PropType<(raw: string) => ParsedAddress>;
        default: null;
    };
    /** 主题变量覆盖 */
    themeOverrides: {
        type: PropType<Record<string, string>>;
        default: () => {};
    };
};
export type SmartAddressProps = ExtractPropTypes<typeof smartAddressProps>;
export declare const smartAddressEmits: {
    'update:modelValue': (val: AddressValue) => boolean;
    /** 智能识别完成 */
    parsed: (val: ParsedAddress) => boolean;
    /** 任意字段变化 */
    change: (val: AddressValue) => boolean;
};
export type SmartAddressEmits = typeof smartAddressEmits;
