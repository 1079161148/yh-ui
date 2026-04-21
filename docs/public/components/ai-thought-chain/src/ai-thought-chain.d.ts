import type { ExtractPropTypes, PropType } from 'vue';
/** 思考状态类型 */
export type AiThoughtStatus = 'thinking' | 'loading' | 'success' | 'complete' | 'error' | 'none';
/** 每一个思考节点的详情数据 */
export interface AiThoughtItem {
    /** 节点标题 */
    title: string;
    /** 详细内容 */
    content?: string;
    /** 当前节点状态 */
    status?: AiThoughtStatus;
    /** 是否展开内容（如果未指定，默认只有最后一个展开） */
    expanded?: boolean;
    /** 覆盖默认图标名称 */
    icon?: string;
    /** 详细内容的别名 */
    description?: string;
    /** 节点 ID（用于拖拽和操作） */
    id?: string;
    /** 额外数据（可用于自定义渲染） */
    extra?: Record<string, unknown>;
    /** 进度百分比（0-100） */
    progress?: number;
    /** 是否可点击 */
    clickable?: boolean;
}
export declare const aiThoughtChainProps: {
    /**
     * @description 思考标题 (单节点模式)
     */
    readonly title: StringConstructor;
    /**
     * @description 是否正在思考 (兼容旧版，新版推荐 status)
     */
    readonly thinking: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /**
     * @description 显示内容 (单节点模式)
     */
    readonly content: StringConstructor;
    /**
     * @description 当前总状态
     */
    readonly status: {
        readonly type: PropType<AiThoughtStatus>;
        readonly default: "none";
    };
    /**
     * @description 推理链节点列表，如果提供了 items，将启用多节点时间轴模式
     */
    readonly items: {
        readonly type: PropType<AiThoughtItem[]>;
        readonly default: () => never[];
    };
    /**
     * @description 当状态变为已完成时是否自动收起
     */
    readonly autoCollapse: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    /**
     * @description 节点圆点大小
     */
    readonly dotSize: {
        readonly type: PropType<"small" | "default" | "large">;
        readonly default: "default";
    };
    /**
     * @description 节点连接线是否显示渐变
     */
    readonly lineGradient: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /**
     * @description 是否显示进度百分比
     */
    readonly showProgress: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /**
     * @description 是否启用拖拽排序
     */
    readonly draggable: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /**
     * @description 是否启用节点操作（添加/删除）
     */
    readonly editable: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /**
     * @description 是否支持 Markdown 渲染节点内容
     */
    readonly markdown: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    /**
     * @description 样式类名
     */
    readonly className: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    /**
     * @description 样式类名（语义化）
     */
    readonly classNames: {
        readonly type: PropType<Record<string, string>>;
        readonly default: () => {};
    };
    /**
     * @description 样式对象
     */
    readonly styles: {
        readonly type: PropType<Record<string, string>>;
        readonly default: () => {};
    };
    /**
     * @description 自定义样式
     */
    readonly style: {
        readonly type: PropType<Record<string, string>>;
        readonly default: () => {};
    };
    /**
     * @description 主题覆盖变量
     */
    readonly themeOverrides: {
        readonly type: PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
};
export type AiThoughtChainProps = ExtractPropTypes<typeof aiThoughtChainProps>;
export declare const aiThoughtChainEmits: {
    'update:items': (items: AiThoughtItem[]) => boolean;
    'node-click': (item: AiThoughtItem, index: number) => boolean;
    'node-delete': (item: AiThoughtItem, index: number) => boolean;
    'node-add': (index: number) => boolean;
    reorder: (items: AiThoughtItem[]) => boolean;
};
export type AiThoughtChainEmits = typeof aiThoughtChainEmits;
export interface AiThoughtChainSlots {
    default?: () => unknown;
}
