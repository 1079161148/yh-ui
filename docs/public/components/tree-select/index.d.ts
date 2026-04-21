import TreeSelect from './src/tree-select.vue';
export declare const YhTreeSelect: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("vue").ExtractPropTypes<{
        readonly modelValue: {
            readonly type: import("vue").PropType<import("./index.js").TreeKey | import("./index.js").TreeKey[]>;
            readonly default: undefined;
        };
        readonly data: {
            readonly type: import("vue").PropType<import("./index.js").TreeOption[]>;
            readonly default: () => never[];
        };
        readonly props: {
            readonly type: import("vue").PropType<import("./index.js").TreePropsAlias>;
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
        readonly filterNodeMethod: import("vue").PropType<(value: string, data: import("./index.js").TreeOption, node: import("./index.js").TreeSelectNode) => boolean>;
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
            readonly type: import("vue").PropType<import("./index.js").TreeKey[]>;
            readonly default: () => never[];
        };
        readonly defaultCheckedKeys: {
            readonly type: import("vue").PropType<import("./index.js").TreeKey[]>;
            readonly default: () => never[];
        };
        readonly accordion: BooleanConstructor;
        readonly indent: {
            readonly type: NumberConstructor;
            readonly default: 16;
        };
        readonly lazy: BooleanConstructor;
        readonly load: import("vue").PropType<(node: import("./index.js").TreeOption, resolve: (data: import("./index.js").TreeOption[]) => void) => void>;
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
        onChange?: ((_value: import("./index.js").TreeKey | import("./index.js").TreeKey[] | undefined) => any) | undefined;
        "onUpdate:modelValue"?: ((_value: import("./index.js").TreeKey | import("./index.js").TreeKey[] | undefined) => any) | undefined;
        onCheck?: ((_data: import("./index.js").TreeOption, _info: import("./index.js").TreeCheckedInfo) => any) | undefined;
        "onVisible-change"?: ((_visible: boolean) => any) | undefined;
        "onNode-click"?: ((_data: import("./index.js").TreeOption, _node: import("./index.js").TreeSelectNode, _e: MouseEvent) => any) | undefined;
        "onCheck-change"?: ((_data: import("./index.js").TreeOption, _checked: boolean, _indeterminate: boolean) => any) | undefined;
    }>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        clear: () => void;
        change: (_value: import("./index.js").TreeKey | import("./index.js").TreeKey[] | undefined) => void;
        "update:modelValue": (_value: import("./index.js").TreeKey | import("./index.js").TreeKey[] | undefined) => void;
        check: (_data: import("./index.js").TreeOption, _info: import("./index.js").TreeCheckedInfo) => void;
        "visible-change": (_visible: boolean) => void;
        "node-click": (_data: import("./index.js").TreeOption, _node: import("./index.js").TreeSelectNode, _e: MouseEvent) => void;
        "check-change": (_data: import("./index.js").TreeOption, _checked: boolean, _indeterminate: boolean) => void;
    }, import("vue").PublicProps, {
        readonly data: import("./index.js").TreeOption[];
        readonly size: "large" | "default" | "small";
        readonly props: import("./index.js").TreePropsAlias;
        readonly placeholder: string;
        readonly emptyText: string;
        readonly disabled: boolean;
        readonly height: string | number;
        readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
        readonly modelValue: import("./index.js").TreeKey | import("./index.js").TreeKey[];
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
        readonly defaultExpandedKeys: import("./index.js").TreeKey[];
        readonly defaultCheckedKeys: import("./index.js").TreeKey[];
        readonly accordion: boolean;
        readonly indent: number;
    }, true, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
        readonly modelValue: {
            readonly type: import("vue").PropType<import("./index.js").TreeKey | import("./index.js").TreeKey[]>;
            readonly default: undefined;
        };
        readonly data: {
            readonly type: import("vue").PropType<import("./index.js").TreeOption[]>;
            readonly default: () => never[];
        };
        readonly props: {
            readonly type: import("vue").PropType<import("./index.js").TreePropsAlias>;
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
        readonly filterNodeMethod: import("vue").PropType<(value: string, data: import("./index.js").TreeOption, node: import("./index.js").TreeSelectNode) => boolean>;
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
            readonly type: import("vue").PropType<import("./index.js").TreeKey[]>;
            readonly default: () => never[];
        };
        readonly defaultCheckedKeys: {
            readonly type: import("vue").PropType<import("./index.js").TreeKey[]>;
            readonly default: () => never[];
        };
        readonly accordion: BooleanConstructor;
        readonly indent: {
            readonly type: NumberConstructor;
            readonly default: 16;
        };
        readonly lazy: BooleanConstructor;
        readonly load: import("vue").PropType<(node: import("./index.js").TreeOption, resolve: (data: import("./index.js").TreeOption[]) => void) => void>;
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
        onChange?: ((_value: import("./index.js").TreeKey | import("./index.js").TreeKey[] | undefined) => any) | undefined;
        "onUpdate:modelValue"?: ((_value: import("./index.js").TreeKey | import("./index.js").TreeKey[] | undefined) => any) | undefined;
        onCheck?: ((_data: import("./index.js").TreeOption, _info: import("./index.js").TreeCheckedInfo) => any) | undefined;
        "onVisible-change"?: ((_visible: boolean) => any) | undefined;
        "onNode-click"?: ((_data: import("./index.js").TreeOption, _node: import("./index.js").TreeSelectNode, _e: MouseEvent) => any) | undefined;
        "onCheck-change"?: ((_data: import("./index.js").TreeOption, _checked: boolean, _indeterminate: boolean) => any) | undefined;
    }>, {}, {}, {}, {}, {
        readonly data: import("./index.js").TreeOption[];
        readonly size: "large" | "default" | "small";
        readonly props: import("./index.js").TreePropsAlias;
        readonly placeholder: string;
        readonly emptyText: string;
        readonly disabled: boolean;
        readonly height: string | number;
        readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
        readonly modelValue: import("./index.js").TreeKey | import("./index.js").TreeKey[];
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
        readonly defaultExpandedKeys: import("./index.js").TreeKey[];
        readonly defaultCheckedKeys: import("./index.js").TreeKey[];
        readonly accordion: boolean;
        readonly indent: number;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
    readonly modelValue: {
        readonly type: import("vue").PropType<import("./index.js").TreeKey | import("./index.js").TreeKey[]>;
        readonly default: undefined;
    };
    readonly data: {
        readonly type: import("vue").PropType<import("./index.js").TreeOption[]>;
        readonly default: () => never[];
    };
    readonly props: {
        readonly type: import("vue").PropType<import("./index.js").TreePropsAlias>;
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
    readonly filterNodeMethod: import("vue").PropType<(value: string, data: import("./index.js").TreeOption, node: import("./index.js").TreeSelectNode) => boolean>;
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
        readonly type: import("vue").PropType<import("./index.js").TreeKey[]>;
        readonly default: () => never[];
    };
    readonly defaultCheckedKeys: {
        readonly type: import("vue").PropType<import("./index.js").TreeKey[]>;
        readonly default: () => never[];
    };
    readonly accordion: BooleanConstructor;
    readonly indent: {
        readonly type: NumberConstructor;
        readonly default: 16;
    };
    readonly lazy: BooleanConstructor;
    readonly load: import("vue").PropType<(node: import("./index.js").TreeOption, resolve: (data: import("./index.js").TreeOption[]) => void) => void>;
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
    onChange?: ((_value: import("./index.js").TreeKey | import("./index.js").TreeKey[] | undefined) => any) | undefined;
    "onUpdate:modelValue"?: ((_value: import("./index.js").TreeKey | import("./index.js").TreeKey[] | undefined) => any) | undefined;
    onCheck?: ((_data: import("./index.js").TreeOption, _info: import("./index.js").TreeCheckedInfo) => any) | undefined;
    "onVisible-change"?: ((_visible: boolean) => any) | undefined;
    "onNode-click"?: ((_data: import("./index.js").TreeOption, _node: import("./index.js").TreeSelectNode, _e: MouseEvent) => any) | undefined;
    "onCheck-change"?: ((_data: import("./index.js").TreeOption, _checked: boolean, _indeterminate: boolean) => any) | undefined;
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    clear: () => void;
    change: (_value: import("./index.js").TreeKey | import("./index.js").TreeKey[] | undefined) => void;
    "update:modelValue": (_value: import("./index.js").TreeKey | import("./index.js").TreeKey[] | undefined) => void;
    check: (_data: import("./index.js").TreeOption, _info: import("./index.js").TreeCheckedInfo) => void;
    "visible-change": (_visible: boolean) => void;
    "node-click": (_data: import("./index.js").TreeOption, _node: import("./index.js").TreeSelectNode, _e: MouseEvent) => void;
    "check-change": (_data: import("./index.js").TreeOption, _checked: boolean, _indeterminate: boolean) => void;
}, string, {
    readonly data: import("./index.js").TreeOption[];
    readonly size: "large" | "default" | "small";
    readonly props: import("./index.js").TreePropsAlias;
    readonly placeholder: string;
    readonly emptyText: string;
    readonly disabled: boolean;
    readonly height: string | number;
    readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
    readonly modelValue: import("./index.js").TreeKey | import("./index.js").TreeKey[];
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
    readonly defaultExpandedKeys: import("./index.js").TreeKey[];
    readonly defaultCheckedKeys: import("./index.js").TreeKey[];
    readonly accordion: boolean;
    readonly indent: number;
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        default?: (props: {
            node: import("./index.js").TreeSelectNode;
            data: import("./index.js").TreeOption;
        }) => any;
    };
})> & Record<string, unknown>;
export default YhTreeSelect;
export * from './src/tree-select';
export type TreeSelectInstance = InstanceType<typeof TreeSelect>;
export type YhTreeSelectInstance = TreeSelectInstance;
export type YhTreeSelectProps = import('./src/tree-select').TreeSelectProps;
export type YhTreeSelectEmits = import('./src/tree-select').TreeSelectEmits;
export type YhTreeSelectNode = import('./src/tree-select').TreeSelectNode;
export type YhTreeOption = import('./src/tree-select').TreeOption;
export type YhTreeKey = import('./src/tree-select').TreeKey;
export type YhTreeCheckedInfo = import('./src/tree-select').TreeCheckedInfo;
export type YhTreePropsAlias = import('./src/tree-select').TreePropsAlias;
