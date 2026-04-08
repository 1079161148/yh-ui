import { type StreamChunkParser } from './use-ai-stream';
export interface AiChatMessage {
    /** 唯一标识，避免使用 index 做 key */
    id: string;
    /** 消息发送方 */
    role: 'user' | 'assistant' | 'system';
    /** 消息内容 */
    content: string;
    /**
     * 消息状态
     * - loading: 初始加载中（占位）
     * - generating: 流式生成中
     * - success: 已成功完成
     * - error: 发生错误
     * - stopped: 被用户中途打断
     */
    status?: 'loading' | 'generating' | 'success' | 'error' | 'stopped';
    /** 消息时间戳（ms） */
    createAt: number;
    /** 用于展示的时间字符串（可选，不传则自动格式化） */
    time?: string;
    /** 扩展字段 */
    [key: string]: unknown;
}
export interface UseAiChatOptions {
    /** 初始化的消息列表 */
    initialMessages?: AiChatMessage[];
    /** 自定义生成 ID 的函数 */
    idGenerator?: () => string;
    /**
     * 请求适配器
     * 支持：
     * - AsyncGenerator<string>：最原始的字符流，每次 yield 一段字符
     * - Promise<string>：直接返回完整回复
     * - Promise<Response>：SSE 流式响应
     */
    request?: (message: string, history: AiChatMessage[], abortSignal: AbortSignal) => AsyncGenerator<string, void, unknown> | Promise<string | Response>;
    /**
     * SSE / 流式块的解析器（适配不同厂商格式）
     * 传入各厂商对应的 parser（来自 useAiStream 模块）
     * @default plainTextParser
     */
    parser?: StreamChunkParser;
    /**
     * 是否启用打字机平滑输出效果
     * @default true
     */
    typewriter?: boolean;
    /**
     * 打字机每帧输出字符数（越大越快）
     * @default 3
     */
    charsPerFrame?: number;
    /**
     * 系统 Prompt（会自动插入到历史的首位）
     */
    systemPrompt?: string;
    /** 出现错误时的回调 */
    onError?: (err: Error) => void;
    /** 消息发送完成回调 */
    onFinish?: (message: AiChatMessage) => void;
}
/**
 * useAiChat - 核心 AI 会话管理 Hook
 *
 * 特性：
 * - 消息列表 CRUD + 状态机管理
 * - 支持流式 / 非流式响应
 * - 内置多厂商适配器接口（通过 parser 选项传入）
 * - rAF 打字机平滑效果（可关闭）
 * - 完整的 AbortController 取消支持
 * - 系统 Prompt 自动注入
 */
export declare function useAiChat(options?: UseAiChatOptions): {
    /** 会话历史 */
    messages: import("vue").Ref<{
        [x: string]: unknown;
        id: string;
        role: "user" | "assistant" | "system";
        content: string;
        status?: "loading" | "generating" | "success" | "error" | "stopped"
        /** 消息时间戳（ms） */
         | undefined;
        createAt: number;
        time?: string
        /** 扩展字段 */
         | undefined;
    }[], AiChatMessage[] | {
        [x: string]: unknown;
        id: string;
        role: "user" | "assistant" | "system";
        content: string;
        status?: "loading" | "generating" | "success" | "error" | "stopped"
        /** 消息时间戳（ms） */
         | undefined;
        createAt: number;
        time?: string
        /** 扩展字段 */
         | undefined;
    }[]>;
    /** 是否正在生成（等同 isSending，别名友好） */
    isGenerating: import("vue").Ref<boolean, boolean>;
    /** 同 isGenerating，语义别名 */
    isSending: import("vue").ComputedRef<boolean>;
    /** 触发发送（自动处理流、打字机） */
    sendMessage: (content: string) => Promise<void>;
    /** 停止/中断当前生成 */
    stop: () => void;
    /** 移除单条消息 */
    removeMessage: (id: string) => void;
    /** 修改单条消息内容 */
    updateMessage: (id: string, patch: Partial<AiChatMessage>) => void;
    /** 重置清空所有会话 */
    clear: () => void;
};
