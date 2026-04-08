import type { TreeNode, TreeNodeData } from './tree';
declare var __VLS_4: {
    node: TreeNode;
    data: TreeNodeData;
}, __VLS_6: {
    node: TreeNode;
    data: TreeNodeData;
}, __VLS_8: {
    node: TreeNode;
    data: TreeNodeData;
}, __VLS_10: {
    node: TreeNode;
    data: TreeNodeData;
}, __VLS_15: {
    node: TreeNode;
    data: TreeNodeData;
}, __VLS_17: {
    node: TreeNode;
    data: TreeNodeData;
}, __VLS_19: {
    node: TreeNode;
    data: TreeNodeData;
}, __VLS_21: {
    node: TreeNode;
    data: TreeNodeData;
}, __VLS_23: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_4) => any;
} & {
    icon?: (props: typeof __VLS_6) => any;
} & {
    prefix?: (props: typeof __VLS_8) => any;
} & {
    suffix?: (props: typeof __VLS_10) => any;
} & {
    default?: (props: typeof __VLS_15) => any;
} & {
    icon?: (props: typeof __VLS_17) => any;
} & {
    prefix?: (props: typeof __VLS_19) => any;
} & {
    suffix?: (props: typeof __VLS_21) => any;
} & {
    empty?: (props: typeof __VLS_23) => any;
};
declare const __VLS_component: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly data: {
        readonly type: import("vue").PropType<TreeNodeData[]>;
        readonly default: () => never[];
    };
    readonly props: {
        readonly type: import("vue").PropType<{
            label
            /**
             * YhTree - 树形控件
             * @description 高性能树形组件，支持虚拟滚动、懒加载、拖拽等特性
             */
            ?: string;
            children
            /**
             * YhTree - 树形控件
             * @description 高性能树形组件，支持虚拟滚动、懒加载、拖拽等特性
             */
            ?: string;
            disabled
            /**
             * YhTree - 树形控件
             * @description 高性能树形组件，支持虚拟滚动、懒加载、拖拽等特性
             */
            ?: string;
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
        readonly type: import("vue").PropType<import("./tree").FilterMethod>;
        readonly default: undefined;
    };
    readonly load: {
        readonly type: import("vue").PropType<import("./tree").LoadMethod>;
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
}>, {
    filter: (query: string) => void;
    getNode: (key: string | number) => TreeNode | undefined;
    getCheckedNodes: () => TreeNode[];
    getCheckedKeys: () => (string | number)[];
    getHalfCheckedNodes: () => TreeNode[];
    getHalfCheckedKeys: () => (string | number)[];
    getCurrentKey: () => string | number | undefined;
    getCurrentNode: () => TreeNode | undefined;
    setChecked: (key: string | number, checked: boolean, deep?: boolean) => void;
    setCheckedKeys: (keys: (string | number)[]) => void;
    setCheckedNodes: (nodes: TreeNodeData[]) => void;
    setCurrentKey: (key: string | number | undefined) => void;
    setExpandedKeys: (keys: (string | number)[]) => void;
    setData: (data: TreeNodeData[]) => void;
    expandNode: (key: string | number) => void;
    collapseNode: (key: string | number) => void;
    scrollTo: (options: number | ScrollToOptions) => void;
    scrollToNode: (key: string | number) => void;
    expandedKeys: import("vue").Ref<Set<string | number> & Omit<Set<string | number>, keyof Set<any>>, Set<string | number> | (Set<string | number> & Omit<Set<string | number>, keyof Set<any>>)>;
    checkedKeys: import("vue").Ref<Set<string | number> & Omit<Set<string | number>, keyof Set<any>>, Set<string | number> | (Set<string | number> & Omit<Set<string | number>, keyof Set<any>>)>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    check: (_node: TreeNode, _checked: boolean, _checkedKeys: (string | number)[]) => void;
    "node-click": (_node: TreeNode, _e: MouseEvent) => void;
    "current-change": (_node: TreeNode | null) => void;
    "node-expand": (_node: TreeNode, _expanded: boolean) => void;
    "node-drag-start": (_node: TreeNode, _e: DragEvent) => void;
    "node-drag-end": (_node: TreeNode, _dropNode: TreeNode | null, _position: "inner" | "after" | "before", _e: DragEvent) => void;
    "node-drag-over": (_node: TreeNode, _e: DragEvent) => void;
    "node-drag-enter": (_node: TreeNode, _e: DragEvent) => void;
    "node-drag-leave": (_node: TreeNode, _e: DragEvent) => void;
    "node-drop": (_node: TreeNode, _dropNode: TreeNode, _position: "inner" | "after" | "before", _e: DragEvent) => void;
    "update:currentNodeKey": (_key: string | number | undefined) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly data: {
        readonly type: import("vue").PropType<TreeNodeData[]>;
        readonly default: () => never[];
    };
    readonly props: {
        readonly type: import("vue").PropType<{
            label
            /**
             * YhTree - 树形控件
             * @description 高性能树形组件，支持虚拟滚动、懒加载、拖拽等特性
             */
            ?: string;
            children
            /**
             * YhTree - 树形控件
             * @description 高性能树形组件，支持虚拟滚动、懒加载、拖拽等特性
             */
            ?: string;
            disabled
            /**
             * YhTree - 树形控件
             * @description 高性能树形组件，支持虚拟滚动、懒加载、拖拽等特性
             */
            ?: string;
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
        readonly type: import("vue").PropType<import("./tree").FilterMethod>;
        readonly default: undefined;
    };
    readonly load: {
        readonly type: import("vue").PropType<import("./tree").LoadMethod>;
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
    onCheck?: ((_node: TreeNode, _checked: boolean, _checkedKeys: (string | number)[]) => any) | undefined;
    "onNode-click"?: ((_node: TreeNode, _e: MouseEvent) => any) | undefined;
    "onCurrent-change"?: ((_node: TreeNode | null) => any) | undefined;
    "onNode-expand"?: ((_node: TreeNode, _expanded: boolean) => any) | undefined;
    "onNode-drag-start"?: ((_node: TreeNode, _e: DragEvent) => any) | undefined;
    "onNode-drag-end"?: ((_node: TreeNode, _dropNode: TreeNode | null, _position: "inner" | "after" | "before", _e: DragEvent) => any) | undefined;
    "onNode-drag-over"?: ((_node: TreeNode, _e: DragEvent) => any) | undefined;
    "onNode-drag-enter"?: ((_node: TreeNode, _e: DragEvent) => any) | undefined;
    "onNode-drag-leave"?: ((_node: TreeNode, _e: DragEvent) => any) | undefined;
    "onNode-drop"?: ((_node: TreeNode, _dropNode: TreeNode, _position: "inner" | "after" | "before", _e: DragEvent) => any) | undefined;
    "onUpdate:currentNodeKey"?: ((_key: string | number | undefined) => any) | undefined;
}>, {
    readonly data: TreeNodeData[];
    readonly props: {
        label?: string;
        children?: string;
        disabled?: string;
    };
    readonly emptyText: string;
    readonly load: import("./tree").LoadMethod;
    readonly height: number;
    readonly themeOverrides: import("@yh-ui/theme").TreeThemeVars;
    readonly itemHeight: number;
    readonly draggable: boolean;
    readonly filterMethod: import("./tree").FilterMethod;
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
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
