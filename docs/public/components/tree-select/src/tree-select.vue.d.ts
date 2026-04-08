import { type TreeSelectNode, type TreeKey } from './tree-select';
declare var __VLS_9: {
    node: TreeSelectNode;
    data: import("./tree-select").TreeOption;
};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_9) => any;
};
declare const __VLS_component: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly modelValue: {
        readonly type: import("vue").PropType<TreeKey | TreeKey[]>;
        readonly default: undefined;
    };
    readonly data: {
        readonly type: import("vue").PropType<import("./tree-select").TreeOption[]>;
        readonly default: () => never[];
    };
    readonly props: {
        readonly type: import("vue").PropType<import("./tree-select").TreePropsAlias>;
        readonly default: () => {
            label: string;
            value: string;
            children: string;
            disabled: string;
            isLeaf: string;
        };
    };
    readonly placeholder: {
        readonly type: StringConstructor;
        readonly default: undefined;
    };
    readonly multiple: BooleanConstructor;
    readonly clearable: BooleanConstructor;
    readonly disabled: BooleanConstructor;
    readonly size: {
        readonly type: import("vue").PropType<"large" | "default" | "small">;
        readonly default: "default";
    };
    readonly filterable: BooleanConstructor;
    readonly filterNodeMethod: import("vue").PropType<(value: string, data: import("./tree-select").TreeOption, node: TreeSelectNode) => boolean>;
    readonly collapseTags: BooleanConstructor;
    readonly collapseTagsTooltip: BooleanConstructor;
    readonly maxCollapseTags: {
        readonly type: NumberConstructor;
        readonly default: 1;
    };
    readonly teleported: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly popperClass: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly status: import("vue").PropType<"success" | "warning" | "error" | "">;
    readonly nodeKey: {
        readonly type: StringConstructor;
        readonly default: undefined;
    };
    readonly showCheckbox: BooleanConstructor;
    readonly checkStrictly: BooleanConstructor;
    readonly checkOnClickNode: BooleanConstructor;
    readonly expandOnClickNode: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly defaultExpandAll: BooleanConstructor;
    readonly defaultExpandedKeys: {
        readonly type: import("vue").PropType<TreeKey[]>;
        readonly default: () => never[];
    };
    readonly defaultCheckedKeys: {
        readonly type: import("vue").PropType<TreeKey[]>;
        readonly default: () => never[];
    };
    readonly accordion: BooleanConstructor;
    readonly indent: {
        readonly type: NumberConstructor;
        readonly default: 16;
    };
    readonly lazy: BooleanConstructor;
    readonly load: import("vue").PropType<(node: import("./tree-select").TreeOption, resolve: (data: import("./tree-select").TreeOption[]) => void) => void>;
    readonly virtual: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly height: {
        readonly type: import("vue").PropType<string | number>;
        readonly default: 274;
    };
    readonly itemSize: {
        readonly type: NumberConstructor;
        readonly default: 34;
    };
    readonly emptyText: {
        readonly type: StringConstructor;
        readonly default: undefined;
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    clear: () => void;
    change: (_value: TreeKey | TreeKey[] | undefined) => void;
    "update:modelValue": (_value: TreeKey | TreeKey[] | undefined) => void;
    check: (_data: import("./tree-select").TreeOption, _info: import("./tree-select").TreeCheckedInfo) => void;
    "visible-change": (_visible: boolean) => void;
    "node-click": (_data: import("./tree-select").TreeOption, _node: TreeSelectNode, _e: MouseEvent) => void;
    "check-change": (_data: import("./tree-select").TreeOption, _checked: boolean, _indeterminate: boolean) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly modelValue: {
        readonly type: import("vue").PropType<TreeKey | TreeKey[]>;
        readonly default: undefined;
    };
    readonly data: {
        readonly type: import("vue").PropType<import("./tree-select").TreeOption[]>;
        readonly default: () => never[];
    };
    readonly props: {
        readonly type: import("vue").PropType<import("./tree-select").TreePropsAlias>;
        readonly default: () => {
            label: string;
            value: string;
            children: string;
            disabled: string;
            isLeaf: string;
        };
    };
    readonly placeholder: {
        readonly type: StringConstructor;
        readonly default: undefined;
    };
    readonly multiple: BooleanConstructor;
    readonly clearable: BooleanConstructor;
    readonly disabled: BooleanConstructor;
    readonly size: {
        readonly type: import("vue").PropType<"large" | "default" | "small">;
        readonly default: "default";
    };
    readonly filterable: BooleanConstructor;
    readonly filterNodeMethod: import("vue").PropType<(value: string, data: import("./tree-select").TreeOption, node: TreeSelectNode) => boolean>;
    readonly collapseTags: BooleanConstructor;
    readonly collapseTagsTooltip: BooleanConstructor;
    readonly maxCollapseTags: {
        readonly type: NumberConstructor;
        readonly default: 1;
    };
    readonly teleported: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly popperClass: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly status: import("vue").PropType<"success" | "warning" | "error" | "">;
    readonly nodeKey: {
        readonly type: StringConstructor;
        readonly default: undefined;
    };
    readonly showCheckbox: BooleanConstructor;
    readonly checkStrictly: BooleanConstructor;
    readonly checkOnClickNode: BooleanConstructor;
    readonly expandOnClickNode: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly defaultExpandAll: BooleanConstructor;
    readonly defaultExpandedKeys: {
        readonly type: import("vue").PropType<TreeKey[]>;
        readonly default: () => never[];
    };
    readonly defaultCheckedKeys: {
        readonly type: import("vue").PropType<TreeKey[]>;
        readonly default: () => never[];
    };
    readonly accordion: BooleanConstructor;
    readonly indent: {
        readonly type: NumberConstructor;
        readonly default: 16;
    };
    readonly lazy: BooleanConstructor;
    readonly load: import("vue").PropType<(node: import("./tree-select").TreeOption, resolve: (data: import("./tree-select").TreeOption[]) => void) => void>;
    readonly virtual: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly height: {
        readonly type: import("vue").PropType<string | number>;
        readonly default: 274;
    };
    readonly itemSize: {
        readonly type: NumberConstructor;
        readonly default: 34;
    };
    readonly emptyText: {
        readonly type: StringConstructor;
        readonly default: undefined;
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>> & Readonly<{
    onClear?: (() => any) | undefined;
    onChange?: ((_value: TreeKey | TreeKey[] | undefined) => any) | undefined;
    "onUpdate:modelValue"?: ((_value: TreeKey | TreeKey[] | undefined) => any) | undefined;
    onCheck?: ((_data: import("./tree-select").TreeOption, _info: import("./tree-select").TreeCheckedInfo) => any) | undefined;
    "onVisible-change"?: ((_visible: boolean) => any) | undefined;
    "onNode-click"?: ((_data: import("./tree-select").TreeOption, _node: TreeSelectNode, _e: MouseEvent) => any) | undefined;
    "onCheck-change"?: ((_data: import("./tree-select").TreeOption, _checked: boolean, _indeterminate: boolean) => any) | undefined;
}>, {
    readonly data: import("./tree-select").TreeOption[];
    readonly size: "large" | "default" | "small";
    readonly props: import("./tree-select").TreePropsAlias;
    readonly placeholder: string;
    readonly emptyText: string;
    readonly disabled: boolean;
    readonly height: string | number;
    readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
    readonly modelValue: TreeKey | TreeKey[];
    readonly clearable: boolean;
    readonly multiple: boolean;
    readonly collapseTags: boolean;
    readonly collapseTagsTooltip: boolean;
    readonly maxCollapseTags: number;
    readonly itemSize: number;
    readonly popperClass: string;
    readonly teleported: boolean;
    readonly filterable: boolean;
    readonly virtual: boolean;
    readonly checkStrictly: boolean;
    readonly lazy: boolean;
    readonly nodeKey: string;
    readonly showCheckbox: boolean;
    readonly checkOnClickNode: boolean;
    readonly expandOnClickNode: boolean;
    readonly defaultExpandAll: boolean;
    readonly defaultExpandedKeys: TreeKey[];
    readonly defaultCheckedKeys: TreeKey[];
    readonly accordion: boolean;
    readonly indent: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
