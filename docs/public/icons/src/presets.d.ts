import { IconPreset } from './types';
/**
 * 预设图标集列表
 */
export declare const PRESETS: IconPreset[];
/**
 * 获取预设配置
 * @param prefix - 图标集前缀
 * @returns 预设配置
 */
export declare function getPreset(prefix: string): IconPreset | undefined;
/**
 * 默认启用的图标集
 * 这些图标集会被默认加载
 */
export declare const DEFAULT_ENABLED_PRESETS: string[];
/**
 * 图标集前缀映射
 * 用于简写转换
 */
export declare const PREFIX_ALIAS: Record<string, string>;
/**
 * 常用图标快捷方式
 * 用于快速访问常用图标
 */
export declare const COMMON_ICONS: {
    readonly 'arrow-up': "mdi:arrow-up";
    readonly 'arrow-down': "mdi:arrow-down";
    readonly 'arrow-left': "mdi:arrow-left";
    readonly 'arrow-right': "mdi:arrow-right";
    readonly close: "mdi:close";
    readonly check: "mdi:check";
    readonly plus: "mdi:plus";
    readonly minus: "mdi:minus";
    readonly delete: "mdi:delete";
    readonly edit: "mdi:pencil";
    readonly search: "mdi:magnify";
    readonly upload: "mdi:upload";
    readonly download: "mdi:download";
    readonly refresh: "mdi:refresh";
    readonly settings: "mdi:cog";
    readonly menu: "mdi:menu";
    readonly loading: "mdi:loading";
    readonly success: "mdi:check-circle";
    readonly warning: "mdi:alert";
    readonly error: "mdi:alert-circle";
    readonly info: "mdi:information";
    readonly user: "mdi:user";
    readonly users: "mdi:account-group";
    readonly file: "mdi:file";
    readonly folder: "mdi:folder";
    readonly image: "mdi:image";
};
//# sourceMappingURL=presets.d.ts.map