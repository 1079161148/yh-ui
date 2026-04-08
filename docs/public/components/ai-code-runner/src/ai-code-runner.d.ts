import type { ExtractPropTypes, PropType } from 'vue';
import type { ComponentThemeVars } from '@yh-ui/theme';
import type { WebContainer } from '@webcontainer/api';
export declare const aiCodeRunnerProps: {
    /**
     * @description 代码语言
     */
    readonly language: {
        readonly type: StringConstructor;
        readonly default: "javascript";
    };
    /**
     * @description 代码内容
     */
    readonly code: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    /**
     * @description 终端高度
     */
    readonly height: {
        readonly type: PropType<string | number>;
        readonly default: 200;
    };
    /**
     * @description 是否自动运行
     */
    readonly autorun: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /**
     * @description 主题覆盖变量
     */
    readonly themeOverrides: {
        readonly type: PropType<ComponentThemeVars>;
        readonly default: undefined;
    };
};
export type AiCodeRunnerProps = ExtractPropTypes<typeof aiCodeRunnerProps>;
export declare const aiCodeRunnerEmits: {
    run: (code: string) => boolean;
    stop: () => boolean;
    output: (data: string) => boolean;
    error: (error: string) => boolean;
    ready: (instance: WebContainer) => boolean;
};
export type AiCodeRunnerEmits = typeof aiCodeRunnerEmits;
export interface AiCodeRunnerExpose {
    run: () => Promise<void>;
    stop: () => void;
    reset: () => Promise<void>;
    clear: () => void;
}
