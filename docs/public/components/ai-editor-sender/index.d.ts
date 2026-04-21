import AiEditorSender from './src/ai-editor-sender.vue';
export declare const YhAiEditorSender: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("vue").ExtractPropTypes<{
        modelValue: {
            type: StringConstructor;
            default: string;
        };
        placeholder: {
            type: StringConstructor;
            default: string;
        };
        disabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        loading: {
            type: BooleanConstructor;
            default: boolean;
        };
        attachments: {
            type: import("vue").PropType<import("./index.js").AiEditorAttachmentItem[]>;
            default: () => never[];
        };
        showWordLimit: {
            type: BooleanConstructor;
            default: boolean;
        };
        maxLength: {
            type: NumberConstructor;
            default: undefined;
        };
        rows: {
            type: NumberConstructor;
            default: number;
        };
        themeOverrides: {
            type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
            default: undefined;
        };
        enableCommands: {
            type: BooleanConstructor;
            default: boolean;
        };
        commandTrigger: {
            type: StringConstructor;
            default: string;
        };
        commands: {
            type: import("vue").PropType<import("./index.js").AiCommandItem[]>;
            default: () => never[];
        };
        commandPanelPosition: {
            type: import("vue").PropType<import("./index.js").CommandPanelPosition>;
            default: string;
        };
        commandPanelAlign: {
            type: import("vue").PropType<import("./index.js").CommandPanelAlign>;
            default: string;
        };
        commandPanelWidth: {
            type: (StringConstructor | NumberConstructor)[];
            default: number;
        };
        commandPanelMaxHeight: {
            type: NumberConstructor;
            default: number;
        };
        showCommandDescription: {
            type: BooleanConstructor;
            default: boolean;
        };
        showCommandIcon: {
            type: BooleanConstructor;
            default: boolean;
        };
        commandSearchDelay: {
            type: NumberConstructor;
            default: number;
        };
        enableCommandCascade: {
            type: BooleanConstructor;
            default: boolean;
        };
        cascadeOffset: {
            type: NumberConstructor;
            default: number;
        };
    }>> & Readonly<{
        onClear?: (() => any) | undefined;
        onChange?: ((_value: string) => any) | undefined;
        "onUpdate:modelValue"?: ((_value: string) => any) | undefined;
        onSend?: ((value: string) => any) | undefined;
        "onRemove-attachment"?: ((_index: number, _item: import("./index.js").AiEditorAttachmentItem) => any) | undefined;
        "onCommand-select"?: ((_command: import("./index.js").AiCommandItem, _parentCommand?: import("./index.js").AiCommandItem | undefined) => any) | undefined;
        "onCommand-search"?: ((_keyword: string) => any) | undefined;
        "onCommand-panel-show"?: (() => any) | undefined;
        "onCommand-panel-hide"?: (() => any) | undefined;
        "onCommand-cascade"?: ((_command: import("./index.js").AiCommandItem, _parentCommand: import("./index.js").AiCommandItem) => any) | undefined;
    }>, {
        focus: () => void | undefined;
        blur: () => void | undefined;
        clear: () => void;
    }, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        clear: () => void;
        change: (_value: string) => void;
        "update:modelValue": (_value: string) => void;
        send: (value: string) => void;
        "remove-attachment": (_index: number, _item: import("./index.js").AiEditorAttachmentItem) => void;
        "command-select": (_command: import("./index.js").AiCommandItem, _parentCommand?: import("./index.js").AiCommandItem | undefined) => void;
        "command-search": (_keyword: string) => void;
        "command-panel-show": () => void;
        "command-panel-hide": () => void;
        "command-cascade": (_command: import("./index.js").AiCommandItem, _parentCommand: import("./index.js").AiCommandItem) => void;
    }, import("vue").PublicProps, {
        loading: boolean;
        placeholder: string;
        disabled: boolean;
        themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
        modelValue: string;
        showWordLimit: boolean;
        rows: number;
        maxLength: number;
        commands: import("./index.js").AiCommandItem[];
        attachments: import("./index.js").AiEditorAttachmentItem[];
        enableCommands: boolean;
        commandTrigger: string;
        commandPanelPosition: import("./index.js").CommandPanelPosition;
        commandPanelAlign: import("./index.js").CommandPanelAlign;
        commandPanelWidth: string | number;
        commandPanelMaxHeight: number;
        showCommandDescription: boolean;
        showCommandIcon: boolean;
        commandSearchDelay: number;
        enableCommandCascade: boolean;
        cascadeOffset: number;
    }, true, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
        modelValue: {
            type: StringConstructor;
            default: string;
        };
        placeholder: {
            type: StringConstructor;
            default: string;
        };
        disabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        loading: {
            type: BooleanConstructor;
            default: boolean;
        };
        attachments: {
            type: import("vue").PropType<import("./index.js").AiEditorAttachmentItem[]>;
            default: () => never[];
        };
        showWordLimit: {
            type: BooleanConstructor;
            default: boolean;
        };
        maxLength: {
            type: NumberConstructor;
            default: undefined;
        };
        rows: {
            type: NumberConstructor;
            default: number;
        };
        themeOverrides: {
            type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
            default: undefined;
        };
        enableCommands: {
            type: BooleanConstructor;
            default: boolean;
        };
        commandTrigger: {
            type: StringConstructor;
            default: string;
        };
        commands: {
            type: import("vue").PropType<import("./index.js").AiCommandItem[]>;
            default: () => never[];
        };
        commandPanelPosition: {
            type: import("vue").PropType<import("./index.js").CommandPanelPosition>;
            default: string;
        };
        commandPanelAlign: {
            type: import("vue").PropType<import("./index.js").CommandPanelAlign>;
            default: string;
        };
        commandPanelWidth: {
            type: (StringConstructor | NumberConstructor)[];
            default: number;
        };
        commandPanelMaxHeight: {
            type: NumberConstructor;
            default: number;
        };
        showCommandDescription: {
            type: BooleanConstructor;
            default: boolean;
        };
        showCommandIcon: {
            type: BooleanConstructor;
            default: boolean;
        };
        commandSearchDelay: {
            type: NumberConstructor;
            default: number;
        };
        enableCommandCascade: {
            type: BooleanConstructor;
            default: boolean;
        };
        cascadeOffset: {
            type: NumberConstructor;
            default: number;
        };
    }>> & Readonly<{
        onClear?: (() => any) | undefined;
        onChange?: ((_value: string) => any) | undefined;
        "onUpdate:modelValue"?: ((_value: string) => any) | undefined;
        onSend?: ((value: string) => any) | undefined;
        "onRemove-attachment"?: ((_index: number, _item: import("./index.js").AiEditorAttachmentItem) => any) | undefined;
        "onCommand-select"?: ((_command: import("./index.js").AiCommandItem, _parentCommand?: import("./index.js").AiCommandItem | undefined) => any) | undefined;
        "onCommand-search"?: ((_keyword: string) => any) | undefined;
        "onCommand-panel-show"?: (() => any) | undefined;
        "onCommand-panel-hide"?: (() => any) | undefined;
        "onCommand-cascade"?: ((_command: import("./index.js").AiCommandItem, _parentCommand: import("./index.js").AiCommandItem) => any) | undefined;
    }>, {
        focus: () => void | undefined;
        blur: () => void | undefined;
        clear: () => void;
    }, {}, {}, {}, {
        loading: boolean;
        placeholder: string;
        disabled: boolean;
        themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
        modelValue: string;
        showWordLimit: boolean;
        rows: number;
        maxLength: number;
        commands: import("./index.js").AiCommandItem[];
        attachments: import("./index.js").AiEditorAttachmentItem[];
        enableCommands: boolean;
        commandTrigger: string;
        commandPanelPosition: import("./index.js").CommandPanelPosition;
        commandPanelAlign: import("./index.js").CommandPanelAlign;
        commandPanelWidth: string | number;
        commandPanelMaxHeight: number;
        showCommandDescription: boolean;
        showCommandIcon: boolean;
        commandSearchDelay: number;
        enableCommandCascade: boolean;
        cascadeOffset: number;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: StringConstructor;
        default: string;
    };
    placeholder: {
        type: StringConstructor;
        default: string;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    attachments: {
        type: import("vue").PropType<import("./index.js").AiEditorAttachmentItem[]>;
        default: () => never[];
    };
    showWordLimit: {
        type: BooleanConstructor;
        default: boolean;
    };
    maxLength: {
        type: NumberConstructor;
        default: undefined;
    };
    rows: {
        type: NumberConstructor;
        default: number;
    };
    themeOverrides: {
        type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        default: undefined;
    };
    enableCommands: {
        type: BooleanConstructor;
        default: boolean;
    };
    commandTrigger: {
        type: StringConstructor;
        default: string;
    };
    commands: {
        type: import("vue").PropType<import("./index.js").AiCommandItem[]>;
        default: () => never[];
    };
    commandPanelPosition: {
        type: import("vue").PropType<import("./index.js").CommandPanelPosition>;
        default: string;
    };
    commandPanelAlign: {
        type: import("vue").PropType<import("./index.js").CommandPanelAlign>;
        default: string;
    };
    commandPanelWidth: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    commandPanelMaxHeight: {
        type: NumberConstructor;
        default: number;
    };
    showCommandDescription: {
        type: BooleanConstructor;
        default: boolean;
    };
    showCommandIcon: {
        type: BooleanConstructor;
        default: boolean;
    };
    commandSearchDelay: {
        type: NumberConstructor;
        default: number;
    };
    enableCommandCascade: {
        type: BooleanConstructor;
        default: boolean;
    };
    cascadeOffset: {
        type: NumberConstructor;
        default: number;
    };
}>> & Readonly<{
    onClear?: (() => any) | undefined;
    onChange?: ((_value: string) => any) | undefined;
    "onUpdate:modelValue"?: ((_value: string) => any) | undefined;
    onSend?: ((value: string) => any) | undefined;
    "onRemove-attachment"?: ((_index: number, _item: import("./index.js").AiEditorAttachmentItem) => any) | undefined;
    "onCommand-select"?: ((_command: import("./index.js").AiCommandItem, _parentCommand?: import("./index.js").AiCommandItem | undefined) => any) | undefined;
    "onCommand-search"?: ((_keyword: string) => any) | undefined;
    "onCommand-panel-show"?: (() => any) | undefined;
    "onCommand-panel-hide"?: (() => any) | undefined;
    "onCommand-cascade"?: ((_command: import("./index.js").AiCommandItem, _parentCommand: import("./index.js").AiCommandItem) => any) | undefined;
}>, {
    focus: () => void | undefined;
    blur: () => void | undefined;
    clear: () => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    clear: () => void;
    change: (_value: string) => void;
    "update:modelValue": (_value: string) => void;
    send: (value: string) => void;
    "remove-attachment": (_index: number, _item: import("./index.js").AiEditorAttachmentItem) => void;
    "command-select": (_command: import("./index.js").AiCommandItem, _parentCommand?: import("./index.js").AiCommandItem | undefined) => void;
    "command-search": (_keyword: string) => void;
    "command-panel-show": () => void;
    "command-panel-hide": () => void;
    "command-cascade": (_command: import("./index.js").AiCommandItem, _parentCommand: import("./index.js").AiCommandItem) => void;
}, string, {
    loading: boolean;
    placeholder: string;
    disabled: boolean;
    themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
    modelValue: string;
    showWordLimit: boolean;
    rows: number;
    maxLength: number;
    commands: import("./index.js").AiCommandItem[];
    attachments: import("./index.js").AiEditorAttachmentItem[];
    enableCommands: boolean;
    commandTrigger: string;
    commandPanelPosition: import("./index.js").CommandPanelPosition;
    commandPanelAlign: import("./index.js").CommandPanelAlign;
    commandPanelWidth: string | number;
    commandPanelMaxHeight: number;
    showCommandDescription: boolean;
    showCommandIcon: boolean;
    commandSearchDelay: number;
    enableCommandCascade: boolean;
    cascadeOffset: number;
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        header?: (props: {}) => any;
    } & {
        toolbar?: (props: {}) => any;
    } & {
        actions?: (props: {}) => any;
    } & {
        submit?: (props: {
            submit: () => void;
            disabled: boolean;
            loading: boolean;
        }) => any;
    };
})> & Record<string, unknown>;
export default YhAiEditorSender;
export * from './src/ai-editor-sender';
export type AiEditorSenderInstance = InstanceType<typeof AiEditorSender>;
export type YhAiEditorSenderInstance = AiEditorSenderInstance;
export type YhAiEditorSenderProps = import('./src/ai-editor-sender').AiEditorSenderProps;
export type YhAiEditorSenderEmits = import('./src/ai-editor-sender').AiEditorSenderEmits;
export type YhAiEditorSenderSlots = import('./src/ai-editor-sender').AiEditorSenderSlots;
export type YhAiEditorSenderExpose = import('./src/ai-editor-sender').AiEditorSenderExpose;
export type YhAiEditorAttachmentItem = import('./src/ai-editor-sender').AiEditorAttachmentItem;
export type YhAiCommandItem = import('./src/ai-editor-sender').AiCommandItem;
export type YhCommandPanelPosition = import('./src/ai-editor-sender').CommandPanelPosition;
export type YhCommandPanelAlign = import('./src/ai-editor-sender').CommandPanelAlign;
