import type { ExtractPropTypes, PropType } from 'vue';
import type { MentionOption } from '../../mention';
import type { ComponentThemeVars } from '@yh-ui/theme';
export declare const aiMentionTypes: readonly ["agent", "document", "table", "knowledge", "file"];
export type AiMentionType = (typeof aiMentionTypes)[number];
export interface AiMentionOption extends MentionOption {
    type?: AiMentionType;
    icon?: string;
    description?: string;
    /** 文件/文档路径 */
    path?: string;
    /** 文件大小 */
    size?: number;
    /** 最后修改时间 */
    modifiedAt?: number;
    /** 子节点（用于文件树） */
    children?: AiMentionOption[];
    /** 是否为文件夹 */
    isFolder?: boolean;
    /** 是否展开 */
    expanded?: boolean;
}
/** 文件树节点 */
export interface AiMentionFileNode {
    key: string;
    label: string;
    isFolder: boolean;
    path: string;
    children?: AiMentionFileNode[];
    disabled?: boolean;
    icon?: string;
    size?: number;
    modifiedAt?: number;
}
/** 文件树加载函数 */
export type AiMentionFileLoader = (keyword: string, type: 'document' | 'table' | 'file' | 'knowledge') => Promise<AiMentionFileNode[]>;
export declare const aiMentionProps: {
    /**
     * 绑定值
     */
    readonly modelValue: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    /**
     * AI 提及类型，支持多种类型过滤
     */
    readonly types: {
        readonly type: PropType<AiMentionType[]>;
        readonly default: () => string[];
    };
    /**
     * 选项列表
     */
    readonly options: {
        readonly type: PropType<AiMentionOption[]>;
        readonly default: () => never[];
    };
    /**
     * 触发字符
     */
    readonly triggers: {
        readonly type: PropType<string[]>;
        readonly default: () => string[];
    };
    /**
     * 是否在输入框中
     */
    readonly type: {
        readonly type: PropType<"input" | "textarea">;
        readonly default: "textarea";
    };
    /**
     * 占位符
     */
    readonly placeholder: StringConstructor;
    /**
     * 是否禁用
     */
    readonly disabled: BooleanConstructor;
    /**
     * 尺寸
     */
    readonly size: PropType<"large" | "default" | "small">;
    /**
     * 最大长度
     */
    readonly maxLength: NumberConstructor;
    /**
     * 文本域行数
     */
    readonly rows: {
        readonly type: NumberConstructor;
        readonly default: 3;
    };
    /**
     * 是否正在加载
     */
    readonly loading: BooleanConstructor;
    /**
     * 主题覆盖
     */
    readonly themeOverrides: {
        readonly type: PropType<ComponentThemeVars>;
        readonly default: () => {};
    };
    /**
     * 选项过滤
     */
    readonly filterOption: {
        readonly type: PropType<((keyword: string, option: MentionOption) => boolean) | false>;
        readonly default: undefined;
    };
    /**
     * 是否启用文件树选择器（@文档/@表格/@文件）
     */
    readonly enableFileTree: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    /**
     * 文件树数据加载函数
     * 当用户触发 @文档/@表格/@文件 时调用
     */
    readonly fileLoader: {
        readonly type: PropType<AiMentionFileLoader>;
        readonly default: undefined;
    };
    /**
     * 文件树根路径
     */
    readonly fileRoot: {
        readonly type: StringConstructor;
        readonly default: "/";
    };
    /**
     * 文件树展开层级
     */
    readonly fileTreeExpandedLevel: {
        readonly type: NumberConstructor;
        readonly default: 2;
    };
    /**
     * 是否显示文件图标
     */
    readonly showFileIcon: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    /**
     * 是否显示文件大小
     */
    readonly showFileSize: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    /**
     * 是否显示最后修改时间
     */
    readonly showModifiedTime: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    /**
     * 文件大小格式化函数
     */
    readonly formatFileSize: {
        readonly type: PropType<(size: number) => string>;
        readonly default: (size: number) => string;
    };
    /**
     * 搜索防抖延迟（毫秒）
     */
    readonly searchDebounce: {
        readonly type: NumberConstructor;
        readonly default: 300;
    };
};
export type AiMentionProps = ExtractPropTypes<typeof aiMentionProps>;
export declare const aiMentionEmits: {
    'update:modelValue': (value: string) => boolean;
    input: (value: string) => boolean;
    change: (value: string) => boolean;
    select: (option: AiMentionOption, trigger: string) => boolean;
    search: (keyword: string, trigger: string) => boolean;
    'file-load': (_type: "document" | "table" | "file" | "knowledge", _nodes: AiMentionFileNode[]) => boolean;
    'file-select': (node: AiMentionFileNode, option: AiMentionOption) => boolean;
    focus: (event: FocusEvent) => boolean;
    blur: (event: FocusEvent) => boolean;
    keydown: (event: KeyboardEvent) => boolean;
};
export type AiMentionEmits = typeof aiMentionEmits;
export interface AiMentionSlots {
    [name: string]: ((props?: Record<string, unknown>) => unknown) | undefined;
}
export interface AiMentionExpose {
    focus: () => void;
    blur: () => void;
    clear: () => void;
    getRef: () => HTMLTextAreaElement | HTMLInputElement | undefined | null;
    insertMention: (option: AiMentionOption, trigger?: string) => void;
    /** 刷新文件树 */
    refreshFileTree: () => void;
    /** 展开/折叠文件夹 */
    toggleFolder: (key: string) => void;
}
