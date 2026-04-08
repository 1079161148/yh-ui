import Tree from './src/tree.vue';
import TreeNode from './src/tree-node.vue';
export declare const YhTree: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("vue").ExtractPropTypes<{
        readonly data: {
            readonly type: import("vue").PropType<import("./index.js").TreeNodeData[]>;
            readonly default: () => never[];
        };
        readonly props: {
            readonly type: import("vue").PropType<{
                label?: string;
                children?: string;
                disabled?: string;
            }>;
            readonly default: () => {
                label: string;
                children: string;
                disabled: string;
            };
        };
        readonly nodeKey: {
            readonly type: StringConstructor;
            readonly default: "id";
        };
        readonly showCheckbox: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly checkboxPosition: {
            readonly type: import("vue").PropType<"left" | "right">;
            readonly default: "left";
        };
        readonly defaultExpandAll: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly defaultExpandedKeys: {
            readonly type: import("vue").PropType<(string | number)[]>;
            readonly default: () => never[];
        };
        readonly defaultCheckedKeys: {
            readonly type: import("vue").PropType<(string | number)[]>;
            readonly default: () => never[];
        };
        readonly currentNodeKey: {
            readonly type: import("vue").PropType<string | number>;
            readonly default: undefined;
        };
        readonly highlightCurrent: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly accordion: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly indent: {
            readonly type: NumberConstructor;
            readonly default: 18;
        };
        readonly checkStrictly: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly expandOnClickNode: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly checkOnClickNode: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly emptyText: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly filterMethod: {
            readonly type: import("vue").PropType<import("./index.js").FilterMethod>;
            readonly default: undefined;
        };
        readonly load: {
            readonly type: import("vue").PropType<import("./index.js").LoadMethod>;
            readonly default: undefined;
        };
        readonly lazy: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly draggable: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly showLine: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly virtual: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly height: {
            readonly type: NumberConstructor;
            readonly default: 400;
        };
        readonly itemHeight: {
            readonly type: NumberConstructor;
            readonly default: 30;
        };
        readonly themeOverrides: {
            readonly type: import("vue").PropType<import("@yh-ui/theme").TreeThemeVars>;
            readonly default: undefined;
        };
    }>> & Readonly<{
        onCheck?: ((_node: import("./index.js").TreeNode, _checked: boolean, _checkedKeys: (string | number)[]) => any) | undefined;
        "onNode-click"?: ((_node: import("./index.js").TreeNode, _e: MouseEvent) => any) | undefined;
        "onCurrent-change"?: ((_node: import("./index.js").TreeNode | null) => any) | undefined;
        "onNode-expand"?: ((_node: import("./index.js").TreeNode, _expanded: boolean) => any) | undefined;
        "onNode-drag-start"?: ((_node: import("./index.js").TreeNode, _e: DragEvent) => any) | undefined;
        "onNode-drag-end"?: ((_node: import("./index.js").TreeNode, _dropNode: import("./index.js").TreeNode | null, _position: "inner" | "after" | "before", _e: DragEvent) => any) | undefined;
        "onNode-drag-over"?: ((_node: import("./index.js").TreeNode, _e: DragEvent) => any) | undefined;
        "onNode-drag-enter"?: ((_node: import("./index.js").TreeNode, _e: DragEvent) => any) | undefined;
        "onNode-drag-leave"?: ((_node: import("./index.js").TreeNode, _e: DragEvent) => any) | undefined;
        "onNode-drop"?: ((_node: import("./index.js").TreeNode, _dropNode: import("./index.js").TreeNode, _position: "inner" | "after" | "before", _e: DragEvent) => any) | undefined;
        "onUpdate:currentNodeKey"?: ((_key: string | number | undefined) => any) | undefined;
    }>, {
        filter: (query: string) => void;
        getNode: (key: string | number) => import("./index.js").TreeNode | undefined;
        getCheckedNodes: () => import("./index.js").TreeNode[];
        getCheckedKeys: () => (string | number)[];
        getHalfCheckedNodes: () => import("./index.js").TreeNode[];
        getHalfCheckedKeys: () => (string | number)[];
        getCurrentKey: () => string | number | undefined;
        getCurrentNode: () => import("./index.js").TreeNode | undefined;
        setChecked: (key: string | number, checked: boolean, deep?: boolean) => void;
        setCheckedKeys: (keys: (string | number)[]) => void;
        setCheckedNodes: (nodes: import("./index.js").TreeNodeData[]) => void;
        setCurrentKey: (key: string | number | undefined) => void;
        setExpandedKeys: (keys: (string | number)[]) => void;
        setData: (data: import("./index.js").TreeNodeData[]) => void;
        expandNode: (key: string | number) => void;
        collapseNode: (key: string | number) => void;
        scrollTo: (options: number | ScrollToOptions) => void;
        scrollToNode: (key: string | number) => void;
        expandedKeys: import("vue").Ref<Set<string | number> & Omit<Set<string | number>, keyof Set<any>>, Set<string | number> | (Set<string | number> & Omit<Set<string | number>, keyof Set<any>>)>;
        checkedKeys: import("vue").Ref<Set<string | number> & Omit<Set<string | number>, keyof Set<any>>, Set<string | number> | (Set<string | number> & Omit<Set<string | number>, keyof Set<any>>)>;
    }, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        check: (_node: import("./index.js").TreeNode, _checked: boolean, _checkedKeys: (string | number)[]) => void;
        "node-click": (_node: import("./index.js").TreeNode, _e: MouseEvent) => void;
        "current-change": (_node: import("./index.js").TreeNode | null) => void;
        "node-expand": (_node: import("./index.js").TreeNode, _expanded: boolean) => void;
        "node-drag-start": (_node: import("./index.js").TreeNode, _e: DragEvent) => void;
        "node-drag-end": (_node: import("./index.js").TreeNode, _dropNode: import("./index.js").TreeNode | null, _position: "inner" | "after" | "before", _e: DragEvent) => void;
        "node-drag-over": (_node: import("./index.js").TreeNode, _e: DragEvent) => void;
        "node-drag-enter": (_node: import("./index.js").TreeNode, _e: DragEvent) => void;
        "node-drag-leave": (_node: import("./index.js").TreeNode, _e: DragEvent) => void;
        "node-drop": (_node: import("./index.js").TreeNode, _dropNode: import("./index.js").TreeNode, _position: "inner" | "after" | "before", _e: DragEvent) => void;
        "update:currentNodeKey": (_key: string | number | undefined) => void;
    }, import("vue").PublicProps, {
        readonly data: import("./index.js").TreeNodeData[];
        readonly props: {
            label?: string;
            children?: string;
            disabled?: string;
        };
        readonly emptyText: string;
        readonly load: import("./index.js").LoadMethod;
        readonly height: number;
        readonly themeOverrides: import("@yh-ui/theme").TreeThemeVars;
        readonly itemHeight: number;
        readonly draggable: boolean;
        readonly filterMethod: import("./index.js").FilterMethod;
        readonly virtual: boolean;
        readonly checkStrictly: boolean;
        readonly lazy: boolean;
        readonly nodeKey: string;
        readonly showCheckbox: boolean;
        readonly checkOnClickNode: boolean;
        readonly expandOnClickNode: boolean;
        readonly defaultExpandAll: boolean;
        readonly defaultExpandedKeys: (string | number)[];
        readonly defaultCheckedKeys: (string | number)[];
        readonly accordion: boolean;
        readonly indent: number;
        readonly checkboxPosition: "left" | "right";
        readonly currentNodeKey: string | number;
        readonly highlightCurrent: boolean;
        readonly showLine: boolean;
    }, true, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
        readonly data: {
            readonly type: import("vue").PropType<import("./index.js").TreeNodeData[]>;
            readonly default: () => never[];
        };
        readonly props: {
            readonly type: import("vue").PropType<{
                label?: string;
                children?: string;
                disabled?: string;
            }>;
            readonly default: () => {
                label: string;
                children: string;
                disabled: string;
            };
        };
        readonly nodeKey: {
            readonly type: StringConstructor;
            readonly default: "id";
        };
        readonly showCheckbox: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly checkboxPosition: {
            readonly type: import("vue").PropType<"left" | "right">;
            readonly default: "left";
        };
        readonly defaultExpandAll: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly defaultExpandedKeys: {
            readonly type: import("vue").PropType<(string | number)[]>;
            readonly default: () => never[];
        };
        readonly defaultCheckedKeys: {
            readonly type: import("vue").PropType<(string | number)[]>;
            readonly default: () => never[];
        };
        readonly currentNodeKey: {
            readonly type: import("vue").PropType<string | number>;
            readonly default: undefined;
        };
        readonly highlightCurrent: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly accordion: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly indent: {
            readonly type: NumberConstructor;
            readonly default: 18;
        };
        readonly checkStrictly: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly expandOnClickNode: {
            readonly type: BooleanConstructor;
            readonly default: true;
        };
        readonly checkOnClickNode: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly emptyText: {
            readonly type: StringConstructor;
            readonly default: "";
        };
        readonly filterMethod: {
            readonly type: import("vue").PropType<import("./index.js").FilterMethod>;
            readonly default: undefined;
        };
        readonly load: {
            readonly type: import("vue").PropType<import("./index.js").LoadMethod>;
            readonly default: undefined;
        };
        readonly lazy: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly draggable: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly showLine: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly virtual: {
            readonly type: BooleanConstructor;
            readonly default: false;
        };
        readonly height: {
            readonly type: NumberConstructor;
            readonly default: 400;
        };
        readonly itemHeight: {
            readonly type: NumberConstructor;
            readonly default: 30;
        };
        readonly themeOverrides: {
            readonly type: import("vue").PropType<import("@yh-ui/theme").TreeThemeVars>;
            readonly default: undefined;
        };
    }>> & Readonly<{
        onCheck?: ((_node: import("./index.js").TreeNode, _checked: boolean, _checkedKeys: (string | number)[]) => any) | undefined;
        "onNode-click"?: ((_node: import("./index.js").TreeNode, _e: MouseEvent) => any) | undefined;
        "onCurrent-change"?: ((_node: import("./index.js").TreeNode | null) => any) | undefined;
        "onNode-expand"?: ((_node: import("./index.js").TreeNode, _expanded: boolean) => any) | undefined;
        "onNode-drag-start"?: ((_node: import("./index.js").TreeNode, _e: DragEvent) => any) | undefined;
        "onNode-drag-end"?: ((_node: import("./index.js").TreeNode, _dropNode: import("./index.js").TreeNode | null, _position: "inner" | "after" | "before", _e: DragEvent) => any) | undefined;
        "onNode-drag-over"?: ((_node: import("./index.js").TreeNode, _e: DragEvent) => any) | undefined;
        "onNode-drag-enter"?: ((_node: import("./index.js").TreeNode, _e: DragEvent) => any) | undefined;
        "onNode-drag-leave"?: ((_node: import("./index.js").TreeNode, _e: DragEvent) => any) | undefined;
        "onNode-drop"?: ((_node: import("./index.js").TreeNode, _dropNode: import("./index.js").TreeNode, _position: "inner" | "after" | "before", _e: DragEvent) => any) | undefined;
        "onUpdate:currentNodeKey"?: ((_key: string | number | undefined) => any) | undefined;
    }>, {
        filter: (query: string) => void;
        getNode: (key: string | number) => import("./index.js").TreeNode | undefined;
        getCheckedNodes: () => import("./index.js").TreeNode[];
        getCheckedKeys: () => (string | number)[];
        getHalfCheckedNodes: () => import("./index.js").TreeNode[];
        getHalfCheckedKeys: () => (string | number)[];
        getCurrentKey: () => string | number | undefined;
        getCurrentNode: () => import("./index.js").TreeNode | undefined;
        setChecked: (key: string | number, checked: boolean, deep?: boolean) => void;
        setCheckedKeys: (keys: (string | number)[]) => void;
        setCheckedNodes: (nodes: import("./index.js").TreeNodeData[]) => void;
        setCurrentKey: (key: string | number | undefined) => void;
        setExpandedKeys: (keys: (string | number)[]) => void;
        setData: (data: import("./index.js").TreeNodeData[]) => void;
        expandNode: (key: string | number) => void;
        collapseNode: (key: string | number) => void;
        scrollTo: (options: number | ScrollToOptions) => void;
        scrollToNode: (key: string | number) => void;
        expandedKeys: import("vue").Ref<Set<string | number> & Omit<Set<string | number>, keyof Set<any>>, Set<string | number> | (Set<string | number> & Omit<Set<string | number>, keyof Set<any>>)>;
        checkedKeys: import("vue").Ref<Set<string | number> & Omit<Set<string | number>, keyof Set<any>>, Set<string | number> | (Set<string | number> & Omit<Set<string | number>, keyof Set<any>>)>;
    }, {}, {}, {}, {
        readonly data: import("./index.js").TreeNodeData[];
        readonly props: {
            label?: string;
            children?: string;
            disabled?: string;
        };
        readonly emptyText: string;
        readonly load: import("./index.js").LoadMethod;
        readonly height: number;
        readonly themeOverrides: import("@yh-ui/theme").TreeThemeVars;
        readonly itemHeight: number;
        readonly draggable: boolean;
        readonly filterMethod: import("./index.js").FilterMethod;
        readonly virtual: boolean;
        readonly checkStrictly: boolean;
        readonly lazy: boolean;
        readonly nodeKey: string;
        readonly showCheckbox: boolean;
        readonly checkOnClickNode: boolean;
        readonly expandOnClickNode: boolean;
        readonly defaultExpandAll: boolean;
        readonly defaultExpandedKeys: (string | number)[];
        readonly defaultCheckedKeys: (string | number)[];
        readonly accordion: boolean;
        readonly indent: number;
        readonly checkboxPosition: "left" | "right";
        readonly currentNodeKey: string | number;
        readonly highlightCurrent: boolean;
        readonly showLine: boolean;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
    readonly data: {
        readonly type: import("vue").PropType<import("./index.js").TreeNodeData[]>;
        readonly default: () => never[];
    };
    readonly props: {
        readonly type: import("vue").PropType<{
            label?: string;
            children?: string;
            disabled?: string;
        }>;
        readonly default: () => {
            label: string;
            children: string;
            disabled: string;
        };
    };
    readonly nodeKey: {
        readonly type: StringConstructor;
        readonly default: "id";
    };
    readonly showCheckbox: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly checkboxPosition: {
        readonly type: import("vue").PropType<"left" | "right">;
        readonly default: "left";
    };
    readonly defaultExpandAll: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly defaultExpandedKeys: {
        readonly type: import("vue").PropType<(string | number)[]>;
        readonly default: () => never[];
    };
    readonly defaultCheckedKeys: {
        readonly type: import("vue").PropType<(string | number)[]>;
        readonly default: () => never[];
    };
    readonly currentNodeKey: {
        readonly type: import("vue").PropType<string | number>;
        readonly default: undefined;
    };
    readonly highlightCurrent: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly accordion: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly indent: {
        readonly type: NumberConstructor;
        readonly default: 18;
    };
    readonly checkStrictly: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly expandOnClickNode: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly checkOnClickNode: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly emptyText: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly filterMethod: {
        readonly type: import("vue").PropType<import("./index.js").FilterMethod>;
        readonly default: undefined;
    };
    readonly load: {
        readonly type: import("vue").PropType<import("./index.js").LoadMethod>;
        readonly default: undefined;
    };
    readonly lazy: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly draggable: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly showLine: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly virtual: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly height: {
        readonly type: NumberConstructor;
        readonly default: 400;
    };
    readonly itemHeight: {
        readonly type: NumberConstructor;
        readonly default: 30;
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").TreeThemeVars>;
        readonly default: undefined;
    };
}>> & Readonly<{
    onCheck?: ((_node: import("./index.js").TreeNode, _checked: boolean, _checkedKeys: (string | number)[]) => any) | undefined;
    "onNode-click"?: ((_node: import("./index.js").TreeNode, _e: MouseEvent) => any) | undefined;
    "onCurrent-change"?: ((_node: import("./index.js").TreeNode | null) => any) | undefined;
    "onNode-expand"?: ((_node: import("./index.js").TreeNode, _expanded: boolean) => any) | undefined;
    "onNode-drag-start"?: ((_node: import("./index.js").TreeNode, _e: DragEvent) => any) | undefined;
    "onNode-drag-end"?: ((_node: import("./index.js").TreeNode, _dropNode: import("./index.js").TreeNode | null, _position: "inner" | "after" | "before", _e: DragEvent) => any) | undefined;
    "onNode-drag-over"?: ((_node: import("./index.js").TreeNode, _e: DragEvent) => any) | undefined;
    "onNode-drag-enter"?: ((_node: import("./index.js").TreeNode, _e: DragEvent) => any) | undefined;
    "onNode-drag-leave"?: ((_node: import("./index.js").TreeNode, _e: DragEvent) => any) | undefined;
    "onNode-drop"?: ((_node: import("./index.js").TreeNode, _dropNode: import("./index.js").TreeNode, _position: "inner" | "after" | "before", _e: DragEvent) => any) | undefined;
    "onUpdate:currentNodeKey"?: ((_key: string | number | undefined) => any) | undefined;
}>, {
    filter: (query: string) => void;
    getNode: (key: string | number) => import("./index.js").TreeNode | undefined;
    getCheckedNodes: () => import("./index.js").TreeNode[];
    getCheckedKeys: () => (string | number)[];
    getHalfCheckedNodes: () => import("./index.js").TreeNode[];
    getHalfCheckedKeys: () => (string | number)[];
    getCurrentKey: () => string | number | undefined;
    getCurrentNode: () => import("./index.js").TreeNode | undefined;
    setChecked: (key: string | number, checked: boolean, deep?: boolean) => void;
    setCheckedKeys: (keys: (string | number)[]) => void;
    setCheckedNodes: (nodes: import("./index.js").TreeNodeData[]) => void;
    setCurrentKey: (key: string | number | undefined) => void;
    setExpandedKeys: (keys: (string | number)[]) => void;
    setData: (data: import("./index.js").TreeNodeData[]) => void;
    expandNode: (key: string | number) => void;
    collapseNode: (key: string | number) => void;
    scrollTo: (options: number | ScrollToOptions) => void;
    scrollToNode: (key: string | number) => void;
    expandedKeys: import("vue").Ref<Set<string | number> & Omit<Set<string | number>, keyof Set<any>>, Set<string | number> | (Set<string | number> & Omit<Set<string | number>, keyof Set<any>>)>;
    checkedKeys: import("vue").Ref<Set<string | number> & Omit<Set<string | number>, keyof Set<any>>, Set<string | number> | (Set<string | number> & Omit<Set<string | number>, keyof Set<any>>)>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    check: (_node: import("./index.js").TreeNode, _checked: boolean, _checkedKeys: (string | number)[]) => void;
    "node-click": (_node: import("./index.js").TreeNode, _e: MouseEvent) => void;
    "current-change": (_node: import("./index.js").TreeNode | null) => void;
    "node-expand": (_node: import("./index.js").TreeNode, _expanded: boolean) => void;
    "node-drag-start": (_node: import("./index.js").TreeNode, _e: DragEvent) => void;
    "node-drag-end": (_node: import("./index.js").TreeNode, _dropNode: import("./index.js").TreeNode | null, _position: "inner" | "after" | "before", _e: DragEvent) => void;
    "node-drag-over": (_node: import("./index.js").TreeNode, _e: DragEvent) => void;
    "node-drag-enter": (_node: import("./index.js").TreeNode, _e: DragEvent) => void;
    "node-drag-leave": (_node: import("./index.js").TreeNode, _e: DragEvent) => void;
    "node-drop": (_node: import("./index.js").TreeNode, _dropNode: import("./index.js").TreeNode, _position: "inner" | "after" | "before", _e: DragEvent) => void;
    "update:currentNodeKey": (_key: string | number | undefined) => void;
}, string, {
    readonly data: import("./index.js").TreeNodeData[];
    readonly props: {
        label?: string;
        children?: string;
        disabled?: string;
    };
    readonly emptyText: string;
    readonly load: import("./index.js").LoadMethod;
    readonly height: number;
    readonly themeOverrides: import("@yh-ui/theme").TreeThemeVars;
    readonly itemHeight: number;
    readonly draggable: boolean;
    readonly filterMethod: import("./index.js").FilterMethod;
    readonly virtual: boolean;
    readonly checkStrictly: boolean;
    readonly lazy: boolean;
    readonly nodeKey: string;
    readonly showCheckbox: boolean;
    readonly checkOnClickNode: boolean;
    readonly expandOnClickNode: boolean;
    readonly defaultExpandAll: boolean;
    readonly defaultExpandedKeys: (string | number)[];
    readonly defaultCheckedKeys: (string | number)[];
    readonly accordion: boolean;
    readonly indent: number;
    readonly checkboxPosition: "left" | "right";
    readonly currentNodeKey: string | number;
    readonly highlightCurrent: boolean;
    readonly showLine: boolean;
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        default?: (props: {
            node: import("./index.js").TreeNode;
            data: import("./index.js").TreeNodeData;
        }) => any;
    } & {
        icon?: (props: {
            node: import("./index.js").TreeNode;
            data: import("./index.js").TreeNodeData;
        }) => any;
    } & {
        prefix?: (props: {
            node: import("./index.js").TreeNode;
            data: import("./index.js").TreeNodeData;
        }) => any;
    } & {
        suffix?: (props: {
            node: import("./index.js").TreeNode;
            data: import("./index.js").TreeNodeData;
        }) => any;
    } & {
        default?: (props: {
            node: import("./index.js").TreeNode;
            data: import("./index.js").TreeNodeData;
        }) => any;
    } & {
        icon?: (props: {
            node: import("./index.js").TreeNode;
            data: import("./index.js").TreeNodeData;
        }) => any;
    } & {
        prefix?: (props: {
            node: import("./index.js").TreeNode;
            data: import("./index.js").TreeNodeData;
        }) => any;
    } & {
        suffix?: (props: {
            node: import("./index.js").TreeNode;
            data: import("./index.js").TreeNodeData;
        }) => any;
    } & {
        empty?: (props: {}) => any;
    };
})> & Record<string, unknown>;
export declare const YhTreeNode: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<{
        node: import("./index.js").TreeNode;
    }> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<{
        node: import("./index.js").TreeNode;
    }> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<{
    node: import("./index.js").TreeNode;
}> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        default?: (props: import("./index.js").TreeNodeSlotData) => unknown;
        icon?: (props: import("./index.js").TreeNodeSlotData) => unknown;
        prefix?: (props: import("./index.js").TreeNodeSlotData) => unknown;
        suffix?: (props: import("./index.js").TreeNodeSlotData) => unknown;
    };
})> & Record<string, unknown>;
export default YhTree;
export * from './src/tree';
export type TreeInstance = InstanceType<typeof Tree>;
export type TreeNodeInstance = InstanceType<typeof TreeNode>;
