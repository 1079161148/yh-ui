import type { ExtractPropTypes, PropType } from 'vue';
export interface AiCitation {
    /**
     * 引用索引，对应文本中的 [1], [2] 等
     */
    id: string | number;
    /**
     * 标题
     */
    title: string;
    /**
     * 链接 URL
     */
    url?: string;
    /**
     * 来源站点名称或域名
     */
    source?: string;
    /**
     * 来源图标
     */
    icon?: string;
    /**
     * 摘要内容
     */
    abstract?: string;
    /**
     * 发布时间
     */
    publishTime?: string;
}
export interface AiMultimodal {
    /**
     * 类型：图片、语音、文件（表格/PDF等）
     */
    type: 'image' | 'audio' | 'file' | 'video';
    /**
     * 资源标题或名称
     */
    title?: string;
    /**
     * 资源链接
     */
    url: string;
    /**
     * 资源大小描述
     */
    size?: string;
    /**
     * 额外属性（如语音时长等）
     */
    extra?: Record<string, unknown>;
    /**
     * 图片预览配置
     */
    preview?: {
        enable?: boolean;
        lazy?: boolean;
        fallback?: string;
    };
}
/**
 * 代码块操作配置
 */
export interface AiCodeBlockOptions {
    /**
     * 启用复制按钮
     */
    copyable?: boolean;
    /**
     * 启用语言标签
     */
    languageTag?: boolean;
    /**
     * 启用行号
     */
    lineNumbers?: boolean;
    /**
     * 启用代码编辑（弹窗）
     */
    editable?: boolean;
    /**
     * 启用代码运行（JavaScript）
     */
    runnable?: boolean;
    /**
     * 启用 AI 解释
     */
    explainable?: boolean;
    /**
     * 运行时环境：浏览器内联 or WebContainer 沙箱
     */
    runtime?: 'browser' | 'webcontainer';
    /**
     * 折叠代码块
     */
    collapsible?: boolean;
    /**
     * 折叠行数阈值
     */
    collapseLinesThreshold?: number;
}
/**
 * Mermaid 图表配置
 */
export interface AiMermaidConfig {
    /**
     * 主题
     */
    theme?: 'default' | 'dark' | 'neutral' | 'base';
    /**
     * 主题变量
     */
    themeVariables?: Record<string, string>;
    /**
     *  flowchart 方向
     */
    flowchart?: {
        curve?: 'basis' | 'linear' | 'cardinal';
        padding?: number;
    };
    /**
     * 序列图配置
     */
    sequence?: {
        actorMargin?: number;
        boxMargin?: number;
        boxTextMargin?: number;
        noteMargin?: number;
        messageMargin?: number;
    };
}
/**
 * 结构化表格数据
 */
export interface AiStructuredTableData {
    headers: string[];
    rows: string[][];
}
/**
 * LaTeX 公式配置
 */
export interface AiLatexOptions {
    /**
     * 启用 LaTeX 渲染
     */
    enabled?: boolean;
    /**
     * 行内公式分隔符
     */
    inlineDelimiters?: [string, string];
    /**
     * 块级公式分隔符
     */
    blockDelimiters?: [string, string];
    /**
     * KaTeX 配置
     */
    katexOptions?: Record<string, unknown>;
}
/**
 * 文件预览配置
 */
export interface AiFilePreviewOptions {
    /**
     * PDF 预览配置
     */
    pdf?: {
        enable?: boolean;
        pageScale?: 'auto' | 'actual' | 'page-fit' | 'page-width';
        showToolbar?: boolean;
        showNavigation?: boolean;
    };
    /**
     * Excel 预览配置
     */
    excel?: {
        enable?: boolean;
        sheetName?: string;
        maxRows?: number;
    };
    /**
     * 图片预览配置
     */
    image?: {
        enable?: boolean;
        lazy?: boolean;
        previewable?: boolean;
        zoomable?: boolean;
    };
    /**
     * 视频预览配置
     */
    video?: {
        enable?: boolean;
        autoplay?: boolean;
        controls?: boolean;
    };
}
/**
 * 结构化数据配置
 */
export interface AiStructuredData {
    /**
     * 数据类型
     */
    type: 'json' | 'table' | 'chart' | 'mindmap' | 'thought-chain';
    /**
     * 数据内容
     */
    data: unknown;
    /**
     * 配置选项
     */
    options?: Record<string, unknown>;
}
/**
 * Markdown 配置
 */
export interface AiMarkdownOptions {
    /**
     * 代码块配置
     */
    codeBlock?: AiCodeBlockOptions;
    /**
     * Mermaid 配置
     */
    mermaid?: AiMermaidConfig | boolean;
    /**
     * LaTeX 配置
     */
    latex?: AiLatexOptions | boolean;
    /**
     * 文件预览配置
     */
    filePreview?: AiFilePreviewOptions | boolean;
    /**
     * 自动链接
     */
    linkify?: boolean;
    /**
     * HTML 标签
     */
    html?: boolean;
    /**
     * 排版美化
     */
    typographer?: boolean;
    /**
     * 允许的协议
     */
    allowedProtocols?: string[];
}
export declare const aiBubbleProps: {
    /**
     * 气泡内容，支持 Markdown
     */
    content: {
        type: StringConstructor;
        default: string;
    };
    /**
     * 是否开启 Markdown 解析
     */
    markdown: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * 角色：用户、助手或系统
     */
    role: {
        type: PropType<"user" | "assistant" | "system">;
        default: string;
    };
    /**
     * 气泡位置
     */
    placement: {
        type: PropType<"start" | "end">;
    };
    /**
     * 气泡形状
     */
    shape: {
        type: PropType<"round" | "corner">;
        default: string;
    };
    /**
     * 视觉变体
     */
    variant: {
        type: PropType<"filled" | "outlined" | "borderless" | "shadow">;
        default: string;
    };
    /**
     * 显示时间
     */
    time: StringConstructor;
    /**
     * 头像地址
     */
    avatar: StringConstructor;
    /**
     * 是否在加载中
     */
    loading: BooleanConstructor;
    /**
     * 打字机特效
     */
    typing: BooleanConstructor;
    /**
     * 启用流式增量渲染（逐字/逐句/逐段显示）
     */
    streaming: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * 流式渲染模式：逐词 | 逐句 | 逐段
     */
    streamMode: {
        type: PropType<"word" | "sentence" | "paragraph">;
        default: string;
    };
    /**
     * 流式渲染速度（每次渲染的字符数，仅 word 模式有效）
     */
    streamSpeed: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * 流式渲染间隔（毫秒）
     */
    streamInterval: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * 流式渲染完成回调
     */
    onStreamComplete: {
        type: PropType<() => void>;
    };
    /**
     * 引用来源列表 (Citations)
     */
    citations: {
        type: PropType<AiCitation[]>;
        default: () => never[];
    };
    /**
     * 多模态内容 (图片、音频、文件等)
     */
    multimodal: {
        type: PropType<AiMultimodal[]>;
        default: () => never[];
    };
    /**
     * Markdown 配置选项
     */
    markdownOptions: {
        type: PropType<AiMarkdownOptions>;
        default: () => {};
    };
    /**
     * 结构化数据（JSON/表格/图表）
     */
    structuredData: {
        type: PropType<AiStructuredData>;
    };
    /**
     * 代码解释回调（用于 AI 解释功能）
     */
    onExplainCode: {
        type: PropType<(code: string, language: string) => Promise<string>>;
    };
    /**
     * 代码运行回调
     */
    onRunCode: {
        type: PropType<(code: string, language: string) => Promise<{
            output: string;
            error?: string;
        }>>;
    };
    /**
     * 引用点击回调
     */
    onCitationClick: {
        type: PropType<(citation: AiCitation) => void>;
    };
    /**
     * 主题覆盖变量
     */
    themeOverrides: {
        type: PropType<import("@yh-ui/theme").ComponentThemeVars>;
        default: undefined;
    };
    /**
     * 是否启用 Python 代码运行支持
     */
    enablePythonRuntime: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * Python 运行时类型：'browser' (Pyodide) | 'remote' (远程 API)
     */
    pythonRuntime: {
        type: PropType<"browser" | "remote">;
        default: string;
    };
    /**
     * 远程 Python API 地址（当 pythonRuntime 为 remote 时使用）
     */
    pythonApiUrl: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Pyodide CDN 地址
     */
    pyodideUrl: {
        type: StringConstructor;
        default: string;
    };
    /**
     * 是否启用内置 XSS 防护
     */
    enableSanitizer: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * 自定义 HTML 清理函数
     */
    sanitizer: {
        type: PropType<(html: string) => string>;
        default: undefined;
    };
    /**
     * 允许的标签白名单
     */
    allowedTags: {
        type: PropType<string[]>;
        default: () => string[];
    };
    /**
     * 允许的属性白名单
     */
    allowedAttributes: {
        type: PropType<string[]>;
        default: () => string[];
    };
    /**
     * 允许的协议白名单
     */
    allowedSchemes: {
        type: PropType<string[]>;
        default: () => string[];
    };
};
export type AiBubbleProps = ExtractPropTypes<typeof aiBubbleProps>;
