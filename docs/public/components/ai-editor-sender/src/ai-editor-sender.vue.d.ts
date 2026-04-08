import { type AiEditorAttachmentItem, type AiCommandItem } from './ai-editor-sender';
declare var __VLS_1: {}, __VLS_15: {}, __VLS_17: {}, __VLS_19: {
    submit: () => void;
    disabled: boolean;
    loading: boolean;
};
type __VLS_Slots = {} & {
    header?: (props: typeof __VLS_1) => any;
} & {
    toolbar?: (props: typeof __VLS_15) => any;
} & {
    actions?: (props: typeof __VLS_17) => any;
} & {
    submit?: (props: typeof __VLS_19) => any;
};
declare const __VLS_component: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
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
        type: import("vue").PropType<AiEditorAttachmentItem[]>;
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
        type: import("vue").PropType<AiCommandItem[]>;
        default: () => never[];
    };
    commandPanelPosition: {
        type: import("vue").PropType<import("./ai-editor-sender").CommandPanelPosition>;
        default: string;
    };
    commandPanelAlign: {
        type: import("vue").PropType<import("./ai-editor-sender").CommandPanelAlign>;
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
}>, {
    focus: () => void | undefined;
    blur: () => void | undefined;
    clear: () => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    clear: () => void;
    change: (_value: string) => void;
    "update:modelValue": (_value: string) => void;
    send: (value: string) => void;
    "remove-attachment": (_index: number, _item: AiEditorAttachmentItem) => void;
    "command-select": (_command: AiCommandItem, _parentCommand?: AiCommandItem | undefined) => void;
    "command-search": (_keyword: string) => void;
    "command-panel-show": () => void;
    "command-panel-hide": () => void;
    "command-cascade": (_command: AiCommandItem, _parentCommand: AiCommandItem) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
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
        type: import("vue").PropType<AiEditorAttachmentItem[]>;
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
        type: import("vue").PropType<AiCommandItem[]>;
        default: () => never[];
    };
    commandPanelPosition: {
        type: import("vue").PropType<import("./ai-editor-sender").CommandPanelPosition>;
        default: string;
    };
    commandPanelAlign: {
        type: import("vue").PropType<import("./ai-editor-sender").CommandPanelAlign>;
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
    "onRemove-attachment"?: ((_index: number, _item: AiEditorAttachmentItem) => any) | undefined;
    "onCommand-select"?: ((_command: AiCommandItem, _parentCommand?: AiCommandItem | undefined) => any) | undefined;
    "onCommand-search"?: ((_keyword: string) => any) | undefined;
    "onCommand-panel-show"?: (() => any) | undefined;
    "onCommand-panel-hide"?: (() => any) | undefined;
    "onCommand-cascade"?: ((_command: AiCommandItem, _parentCommand: AiCommandItem) => any) | undefined;
}>, {
    loading: boolean;
    placeholder: string;
    disabled: boolean;
    themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
    modelValue: string;
    showWordLimit: boolean;
    rows: number;
    maxLength: number;
    commands: AiCommandItem[];
    attachments: AiEditorAttachmentItem[];
    enableCommands: boolean;
    commandTrigger: string;
    commandPanelPosition: import("./ai-editor-sender").CommandPanelPosition;
    commandPanelAlign: import("./ai-editor-sender").CommandPanelAlign;
    commandPanelWidth: string | number;
    commandPanelMaxHeight: number;
    showCommandDescription: boolean;
    showCommandIcon: boolean;
    commandSearchDelay: number;
    enableCommandCascade: boolean;
    cascadeOffset: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
