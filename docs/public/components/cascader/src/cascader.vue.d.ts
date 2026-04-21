import type { CascaderProps, CascaderOption, CascaderValue } from './cascader';
declare var __VLS_9: {}, __VLS_19: {
    node: any;
    data: any;
};
type __VLS_Slots = {} & {
    empty?: (props: typeof __VLS_9) => any;
} & {
    default?: (props: typeof __VLS_19) => any;
};
declare const __VLS_component: import("vue").DefineComponent<CascaderProps, {
    focus: () => void;
    blur: () => void;
    getCheckedNodes: (leafOnly
    /**
     * YhCascader - 级联选择器组件
     * @description 从层级数据中选择一个或多个值，严格类型化
     */
    ?: boolean) => CascaderOption[];
    inputRef: import("vue").Ref<HTMLInputElement | undefined>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    clear: () => any;
    focus: (event: FocusEvent) => any;
    change: (value: CascaderValue | undefined) => any;
    blur: (event: FocusEvent) => any;
    "update:modelValue": (value: CascaderValue | undefined) => any;
    "visible-change": (visible: boolean) => any;
    "expand-change": (value: (string | number)[]) => any;
}, string, import("vue").PublicProps, Readonly<CascaderProps> & Readonly<{
    onClear?: (() => any) | undefined;
    onFocus?: ((event: FocusEvent) => any) | undefined;
    onChange?: ((value: CascaderValue | undefined) => any) | undefined;
    onBlur?: ((event: FocusEvent) => any) | undefined;
    "onUpdate:modelValue"?: ((value: CascaderValue | undefined) => any) | undefined;
    "onVisible-change"?: ((visible: boolean) => any) | undefined;
    "onExpand-change"?: ((value: (string | number)[]) => any) | undefined;
}>, {
    size: import("./cascader").CascaderSize;
    disabled: boolean;
    clearable: boolean;
    validateEvent: boolean;
    separator: string;
    multiple: boolean;
    collapseTags: boolean;
    collapseTagsTooltip: boolean;
    maxCollapseTags: number;
    teleported: boolean;
    filterable: boolean;
    tagType: import("./cascader").CascaderTagType;
    virtual: boolean;
    showAllLevels: boolean;
    checkStrictly: boolean;
    expandTrigger: import("./cascader").CascaderExpandTrigger;
    emitPath: boolean;
    virtualItemHeight: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
