import type { ExtractPropTypes, PropType } from 'vue';
export interface AiCommand {
    /**
     * 命令关键字，如 'summary'
     */
    key: string;
    /**
     * 显示名称
     */
    label: string;
    /**
     * 图标
     */
    icon?: string;
    /**
     * 提示文本
     */
    description?: string;
    /**
     * 命令执行时填充的文本，如果不传则使用 /key
     */
    prompt?: string;
}
export interface AiAttachment {
    /**
     * 唯一标识
     */
    id: string;
    /**
     * 文件名
     */
    name: string;
    /**
     * 文件类型
     */
    type: string;
    /**
     * 预览图或 URL
     */
    url?: string;
    /**
     * 文件大小（字节）
     */
    size?: number;
    /**
     * 状态：上传中、成功、失败
     */
    status?: 'uploading' | 'success' | 'error';
    /**
     * 上传进度 (0-100)
     */
    progress?: number;
}
export declare const aiSenderProps: {
    /**
     * 绑定值
     */
    readonly modelValue: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    /**
     * 占位符
     */
    readonly placeholder: {
        readonly type: StringConstructor;
        readonly default: "Send a message...";
    };
    /**
     * 是否禁用
     */
    readonly disabled: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /**
     * 是否加载中
     */
    readonly loading: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /**
     * 是否显示清空按钮
     */
    readonly clearable: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /**
     * 最大长度
     */
    readonly maxLength: NumberConstructor;
    /**
     * 是否显示字数限制
     */
    readonly showWordLimit: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /**
     * 快捷命令列表
     */
    readonly commands: {
        readonly type: PropType<AiCommand[]>;
        readonly default: () => never[];
    };
    /**
     * AI 提及配置
     */
    readonly mentionOptions: {
        readonly type: PropType<import("../../ai-mention").AiMentionOption[]>;
        readonly default: () => never[];
    };
    /**
     * 已选附件列表
     */
    readonly attachments: {
        readonly type: PropType<AiAttachment[]>;
        readonly default: () => never[];
    };
    /**
     * 主题覆盖变量
     */
    readonly themeOverrides: {
        readonly type: PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
};
export type AiSenderProps = ExtractPropTypes<typeof aiSenderProps>;
export declare const aiSenderEmits: {
    'update:modelValue': (_val: string) => boolean;
    send: (_val: string) => boolean;
    change: (_val: string) => boolean;
    clear: () => boolean;
    focus: (_e: FocusEvent) => boolean;
    blur: (_e: FocusEvent) => boolean;
    /**
     * 快捷命令选中时触发
     */
    command: (_command: AiCommand) => boolean;
    /**
     * 附件移除时触发
     */
    'remove-attachment': (_attachment: AiAttachment) => boolean;
    /**
     * 文件上传/拖入时触发
     */
    upload: (_files: File[]) => boolean;
};
export type AiSenderEmits = typeof aiSenderEmits;
