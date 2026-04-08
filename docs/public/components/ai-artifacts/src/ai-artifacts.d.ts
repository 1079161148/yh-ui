import type { ExtractPropTypes, PropType } from 'vue';
import type { ComponentThemeVars } from '@yh-ui/theme';
export type ArtifactType = 'code' | 'html' | 'markdown' | 'react' | 'vue' | 'diagram' | 'chart' | 'sandbox' | 'canvas'
/** 交互式图表 - 使用 ECharts */
 | 'echarts';
export interface ArtifactVersion {
    /**
     * 版本号或标识
     */
    version: number | string;
    /**
     * 内容源码
     */
    content: string;
    /**
     * 该版本的更新说明
     */
    description?: string;
    /**
     * 时间戳
     */
    timestamp?: string | number;
}
/** ECharts 图表配置 */
export interface ArtifactEChartsOption {
    /** 图表类型 */
    chartType: 'line' | 'bar' | 'pie' | 'scatter' | 'gauge' | 'radar' | 'funnel' | 'treemap' | 'sunburst' | 'heatmap' | 'candlestick' | 'boxplot' | 'sankey' | 'themeRiver' | 'graph' | 'custom';
    /** ECharts 配置项 */
    option: Record<string, unknown>;
    /** 主题 */
    theme?: 'light' | 'dark' | 'default';
    /** 是否启用数据缩放 */
    dataZoom?: boolean;
    /** 是否显示工具栏 */
    toolbox?: boolean;
    /** 是否可交互 */
    interactive?: boolean;
}
export interface ArtifactData {
    /**
     * 唯一标识
     */
    id: string;
    /**
     * 文件名或标题
     */
    title: string;
    /**
     * 类型
     */
    type: ArtifactType;
    /**
     * 当前选中的版本号
     */
    currentVersion?: number | string;
    /**
     * 版本历史
     */
    versions: ArtifactVersion[];
    /**
     * ECharts 配置（仅 chart/echarts 类型使用）
     */
    echartsOption?: ArtifactEChartsOption;
}
export declare const aiArtifactsProps: {
    /**
     * 是否显示侧边栏
     */
    visible: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * 正在展示的 Artifact 数据
     */
    data: {
        type: PropType<ArtifactData>;
    };
    /**
     * 侧边栏宽度
     */
    width: {
        type: PropType<string | number>;
        default: string;
    };
    /**
     * 是否全屏展示
     */
    fullscreen: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * 渲染模式：preview (预览) | code (源码) | inline (行内/嵌入)
     */
    mode: {
        type: PropType<"preview" | "code" | "inline">;
        default: string;
    };
    /**
     * 主题覆盖变量
     */
    themeOverrides: {
        type: PropType<ComponentThemeVars>;
        default: undefined;
    };
    /**
     * ECharts 图表配置（用于 chart/echarts 类型）
     */
    echartsOption: {
        type: PropType<ArtifactEChartsOption>;
        default: undefined;
    };
    /**
     * 是否自动加载 ECharts 库
     */
    autoLoadECharts: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * ECharts 主题
     */
    echartsTheme: {
        type: PropType<"light" | "dark" | "default">;
        default: string;
    };
    /**
     * 是否启用数据缩放
     */
    echartsDataZoom: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * 是否显示工具栏
     */
    echartsToolbox: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * 图表高度
     */
    chartHeight: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    /**
     * 是否响应式宽度
     */
    responsiveWidth: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * 加载时显示的占位符
     */
    chartLoadingText: {
        type: StringConstructor;
        default: string;
    };
};
export type AiArtifactsProps = ExtractPropTypes<typeof aiArtifactsProps>;
export declare const aiArtifactsEmits: {
    'update:visible': (_val: boolean) => boolean;
    'update:mode': (_val: "preview" | "code" | "inline") => boolean;
    'version-change': (_version: ArtifactVersion) => boolean;
    'chart-click': (_params: unknown) => boolean;
    'chart-ready': (_chart: unknown) => boolean;
    'chart-error': (_error: Error) => boolean;
    close: () => boolean;
};
export type AiArtifactsEmits = typeof aiArtifactsEmits;
