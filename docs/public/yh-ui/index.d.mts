import { Plugin, App } from 'vue';
import { Language } from '@yh-ui/locale';
export * from '@yh-ui/locale';
export { Language, en, zhCn } from '@yh-ui/locale';
export * from '@yh-ui/components';
export * from '@yh-ui/hooks';
export * from '@yh-ui/utils';
export { ComponentSize, hexToRgb, rgbToHex } from '@yh-ui/utils';
export * from '@yh-ui/theme';

/**
 * YH-UI - Vue 3 Component Library
 * @description 集众家之长的高性能 Vue 3 组件库
 */

/**
 * 创建 YH-UI 实例
 */
interface YhUIOptions {
    /**
     * 组件尺寸
     */
    size?: 'large' | 'default' | 'small';
    /**
     * 层级基数
     */
    zIndex?: number;
    /**
     * 命名空间
     */
    namespace?: string;
    /**
     * 国际化配置
     */
    locale?: Language;
}
/**
 * 创建 YH-UI 插件
 */
declare const createYhUI: (options?: YhUIOptions) => Plugin;
/**
 * 默认安装函数
 */
declare const install: (app: App, options?: YhUIOptions) => void;
/**
 * 默认导出
 */
declare const _default: {
    install: (app: App, options?: YhUIOptions) => void;
    createYhUI: (options?: YhUIOptions) => Plugin;
};

declare const version: string;

export { createYhUI, _default as default, install, version };
export type { YhUIOptions };
