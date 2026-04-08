/**
 * YH-UI Theme Configuration
 * 主题配置系统 - 业内领先级别
 * @description 提供主题切换、自定义主题色、持久化、响应式主题等功能
 */
import type { App, InjectionKey } from 'vue';
/** 主题色配置 */
export interface ThemeColors {
    primary?: string;
    success?: string;
    warning?: string;
    danger?: string;
    info?: string;
}
/** 预设主题 */
export type PresetTheme = 'default' | 'dark' | 'blue' | 'green' | 'purple' | 'orange' | 'rose' | 'amber' | 'teal' | 'indigo' | 'slate' | 'zinc';
/** 响应式断点 */
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
/** 响应式主题配置 */
export type ResponsiveTheme = Partial<Record<Breakpoint, Partial<ThemeOptions>>>;
/** 主题配置选项 */
export interface ThemeOptions {
    /** 预设主题 */
    preset?: PresetTheme;
    /** 自定义颜色 */
    colors?: ThemeColors;
    /** 是否暗色模式 */
    dark?: boolean;
    /** CSS 变量作用域（默认 :root） */
    scope?: string | HTMLElement;
    /** 是否持久化到 localStorage */
    persist?: boolean;
    /** 持久化 key */
    persistKey?: string;
    /** 响应式主题配置 */
    responsive?: ResponsiveTheme;
    /** 圆角配置 */
    radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
    /** 是否启用系统主题跟随 */
    followSystem?: boolean;
    /** 颜色算法 */
    algorithm?: 'default' | 'vibrant' | 'muted' | 'pastel';
}
/** 主题状态快照 */
export interface ThemeSnapshot {
    preset: PresetTheme;
    colors: ThemeColors;
    dark: boolean;
    radius: string;
    algorithm: string;
    density: ThemeDensity;
    timestamp: number;
    version: string;
    name?: string;
    author?: string;
}
/** 颜色算法类型 */
export type ColorAlgorithm = 'default' | 'vibrant' | 'muted' | 'pastel';
/** 紧凑度/密度类型 */
export type ThemeDensity = 'comfortable' | 'compact' | 'dense';
/** 组件级主题覆盖 */
export interface ComponentThemeOverride {
    [componentName: string]: Record<string, string>;
}
/** 色盲友好模式 */
export type ColorBlindMode = 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia';
/** 完整主题配置 */
export interface FullThemeConfig extends ThemeOptions {
    /** 主题名称 */
    name?: string;
    /** 主题作者 */
    author?: string;
    /** 紧凑度 */
    density?: ThemeDensity;
    /** 色盲模式 */
    colorBlindMode?: ColorBlindMode;
    /** 组件级覆盖 */
    components?: ComponentThemeOverride;
    /** 主题切换动画 */
    transition?: boolean | {
        duration?: number;
        timing?: string;
    };
    /** 继承的主题 */
    extends?: PresetTheme | FullThemeConfig;
}
declare const presetThemes: Record<PresetTheme, ThemeColors>;
/** HEX 转 RGB */
declare function hexToRgb(hex: string): {
    r: number;
    g: number;
    b: number;
} | null;
/** RGB 转 HEX */
declare function rgbToHex(r: number, g: number, b: number): string;
/** RGB 转 HSL */
declare function rgbToHsl(r: number, g: number, b: number): {
    h: number;
    s: number;
    l: number;
};
/** HSL 转 RGB */
declare function hslToRgb(h: number, s: number, l: number): {
    r: number;
    g: number;
    b: number;
};
/** 计算相对亮度 (WCAG 2.1) */
declare function getRelativeLuminance(r: number, g: number, b: number): number;
/** 计算对比度 (WCAG 2.1) */
declare function getContrastRatio(color1: string, color2: string): number;
/** 确保颜色对比度达到 WCAG AA 标准 (4.5:1) */
declare function ensureContrast(foreground: string, background: string, minRatio?: number): string;
/** 混合两种颜色 */
declare function mixColor(color1: string, color2: string, weight: number): string;
/** 调整颜色饱和度 */
declare function adjustSaturation(color: string, amount: number): string;
/** 调整颜色亮度 */
declare function adjustLightness(color: string, amount: number): string;
declare const breakpoints: Record<Breakpoint, number>;
declare const densityConfig: Record<ThemeDensity, Record<string, string>>;
declare const colorBlindPalettes: Record<ColorBlindMode, Record<string, string>>;
/** 获取互补色 */
declare function getComplementaryColor(hex: string): string;
/** 获取类似色 (三等分) */
declare function getAnalogousColors(hex: string): [string, string];
/** 获取三角色 */
declare function getTriadicColors(hex: string): [string, string];
/** 从主色自动生成完整调色板 */
declare function generatePaletteFromPrimary(primaryColor: string): ThemeColors;
export declare class ThemeManager {
    private currentTheme;
    private customColors;
    private isDark;
    private targetEl;
    private persistKey;
    private algorithm;
    private responsiveConfig;
    private currentBreakpoint;
    private resizeHandler;
    private systemDarkQuery;
    private systemDarkHandler;
    private followSystem;
    private currentDensity;
    private colorBlindMode;
    private componentOverrides;
    private transitionEnabled;
    private transitionConfig;
    private themeHistory;
    private maxHistoryLength;
    readonly state: {
        theme: PresetTheme;
        dark: boolean;
        colors: {
            primary?: string | undefined;
            success?: string | undefined;
            warning?: string | undefined;
            danger?: string | undefined;
            info?: string | undefined;
        };
        breakpoint: Breakpoint;
        density: ThemeDensity;
        colorBlindMode: ColorBlindMode;
    };
    constructor(options?: ThemeOptions);
    /** 初始化主题 */
    initTheme(options?: ThemeOptions): void;
    /** 应用主题 */
    apply(options: ThemeOptions): void;
    /** 设置预设主题 */
    setPreset(preset: PresetTheme): void;
    /** 设置自定义颜色 */
    setColors(colors: ThemeColors): void;
    /** 设置主色 */
    setPrimaryColor(color: string): void;
    /** 设置主题色 (别名) */
    setThemeColor(color: string): void;
    /** 设置预设主题 (别名) */
    setThemePreset(preset: PresetTheme): void;
    /** 设置颜色算法 */
    setAlgorithm(algorithm: ColorAlgorithm): void;
    /** 设置暗色模式 */
    setDarkMode(dark: boolean): void;
    /** 切换暗色模式 */
    toggleDarkMode(): boolean;
    /** 启用系统主题跟随 */
    enableSystemFollow(): void;
    /** 禁用系统主题跟随 */
    disableSystemFollow(): void;
    /** 设置响应式主题 */
    setResponsiveTheme(config: ResponsiveTheme): void;
    /** 应用响应式主题 */
    private applyResponsiveTheme;
    /** 获取当前是否暗色模式 */
    get dark(): boolean;
    /** 获取当前主题 */
    get theme(): PresetTheme;
    /** 获取所有可用预设 */
    get presets(): PresetTheme[];
    /** 获取当前断点 */
    get breakpoint(): Breakpoint;
    /** 应用颜色到 CSS 变量 */
    private applyColors;
    /** 获取当前主题的 CSS 变量对象 */
    getThemeStyles(colors?: ThemeColors): Record<string, string>;
    /** 获取 CSS 变量值 */
    getCssVar(name: string): string;
    /** 设置 CSS 变量值 */
    setCssVar(name: string, value: string): void;
    /** 应用所有设计令牌 */
    private applyTokens;
    /** 保存到存储 */
    private saveToStorage;
    /** 从存储恢复 */
    private restoreFromStorage;
    /** 导出主题配置 */
    exportTheme(options?: {
        name?: string;
        author?: string;
    }): string;
    /** 导入主题配置 */
    importTheme(json: string): boolean;
    /** 导出为纯 CSS */
    exportAsCss(): string;
    /** 重置为默认主题 */
    reset(): void;
    /** 设置密度 */
    setDensity(density: ThemeDensity): void;
    /** 获取当前密度 */
    get density(): ThemeDensity;
    /** 设置色盲友好模式 */
    setColorBlindMode(mode: ColorBlindMode): void;
    /** 获取当前色盲模式 */
    get colorBlind(): ColorBlindMode;
    /** 设置组件级主题覆盖 */
    setComponentTheme(componentName: string, overrides: Record<string, string>): void;
    /** 获取组件主题覆盖 */
    getComponentTheme(componentName: string): Record<string, string>;
    /** 清除组件级覆盖 */
    clearComponentTheme(componentName: string): void;
    /** 启用主题切换动画 */
    enableTransition(config?: {
        duration?: number;
        timing?: string;
    }): void;
    /** 禁用主题切换动画 */
    disableTransition(): void;
    /** 创建继承主题 */
    createTheme(config: FullThemeConfig): ThemeSnapshot;
    /** 应用完整主题配置 */
    applyFullConfig(config: FullThemeConfig): void;
    /** 保存当前状态到历史 */
    private pushHistory;
    /** 撤销到上一个主题状态 */
    undo(): boolean;
    /** 获取主题历史 */
    getHistory(): ThemeSnapshot[];
    /** 清除主题历史 */
    clearHistory(): void;
    /** 从主色生成完整调色板 */
    generateFromPrimary(primaryColor: string): ThemeColors;
    /** 应用从主色生成的调色板 */
    applyFromPrimary(primaryColor: string): void;
    /** 获取互补色 */
    getComplementary(hex: string): string;
    /** 获取类似色 */
    getAnalogous(hex: string): [string, string];
    /** 获取三角色 */
    getTriadic(hex: string): [string, string];
    /** 设置响应式变量 (根据断点自动切换) */
    setResponsiveVar(name: string, values: Partial<Record<Breakpoint, string>>): void;
    /** 销毁 */
    destroy(): void;
}
export declare function useTheme(): ThemeManager;
export declare function setThemeColor(color: string): void;
export declare function toggleDarkMode(): boolean;
export declare function setThemePreset(preset: PresetTheme): void;
export declare function initTheme(options?: ThemeOptions): ThemeManager;
/** Vue Composition API Hook - 获取主题变量 */
export declare function useThemeVars(): {
    getCssVar: (name: string) => string;
    setCssVar: (name: string, value: string) => void;
    theme: import("vue").Ref<PresetTheme, PresetTheme>;
    dark: import("vue").Ref<boolean, boolean>;
    colors: import("vue").Ref<{
        primary?: string | undefined;
        success?: string | undefined;
        warning?: string | undefined;
        danger?: string | undefined;
        info?: string | undefined;
    }, {
        primary?: string | undefined;
        success?: string | undefined;
        warning?: string | undefined;
        danger?: string | undefined;
        info?: string | undefined;
    }>;
    breakpoint: import("vue").Ref<Breakpoint, Breakpoint>;
    density: import("vue").Ref<ThemeDensity, ThemeDensity>;
    colorBlindMode: import("vue").Ref<ColorBlindMode, ColorBlindMode>;
};
/** 检查颜色对比度是否符合 WCAG 标准 */
export declare function checkContrast(foreground: string, background: string, level?: 'AA' | 'AAA'): boolean;
/** 获取合适的文字颜色 */
export declare function getTextColorForBackground(background: string): string;
export declare const THEME_INJECTION_KEY: InjectionKey<ThemeManager>;
export declare const ThemePlugin: {
    install(app: App, options?: ThemeOptions): void;
};
export default ThemePlugin;
export { hexToRgb, rgbToHex, rgbToHsl, hslToRgb, mixColor, adjustSaturation, adjustLightness, getContrastRatio, ensureContrast, getRelativeLuminance, getComplementaryColor, getAnalogousColors, getTriadicColors, generatePaletteFromPrimary };
export { presetThemes, breakpoints, densityConfig, colorBlindPalettes };
