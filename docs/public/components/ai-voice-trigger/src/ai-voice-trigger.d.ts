import type { ExtractPropTypes, PropType } from 'vue';
export declare const aiVoiceTriggerProps: {
    /**
     * 是否正在录音
     */
    readonly recording: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /**
     * 录音脉冲音频大小/音量数组，用于渲染动画
     */
    readonly amplitudes: {
        readonly type: PropType<number[]>;
        readonly default: () => any[];
    };
    /**
     * 展示模式
     * - inline: 行内按钮
     * - floating: 悬浮按钮
     * - sphere: 拟物音量球
     */
    readonly variant: {
        readonly type: PropType<"inline" | "floating" | "sphere">;
        readonly default: "inline";
    };
    /**
     * 悬浮位置（仅在 floating/sphere 模式有效）
     */
    readonly position: {
        readonly type: PropType<"top-left" | "top-right" | "bottom-left" | "bottom-right">;
        readonly default: "bottom-right";
    };
    /**
     * 偏移量
     */
    readonly offset: {
        readonly type: PropType<[number, number]>;
        readonly default: () => number[];
    };
    /**
     * 是否挂载到 body (Teleport)
     * 仅在 floating/sphere 模式有效
     */
    readonly teleport: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    /**
     * 主题覆盖变量
     */
    readonly themeOverrides: {
        readonly type: PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
};
export type AiVoiceTriggerProps = ExtractPropTypes<typeof aiVoiceTriggerProps>;
export interface AiVoiceTriggerEmits {
    (e: 'update:recording', value: boolean): void;
    (e: 'start'): void;
    (e: 'stop'): void;
    (e: 'cancel'): void;
}
export declare const aiVoiceTriggerEmits: {
    'update:recording': (value: boolean) => boolean;
    start: () => boolean;
    stop: () => boolean;
    cancel: () => boolean;
};
export type AiVoiceTriggerEmitMap = typeof aiVoiceTriggerEmits;
export interface AiVoiceTriggerSlots {
    default?: () => unknown;
}
