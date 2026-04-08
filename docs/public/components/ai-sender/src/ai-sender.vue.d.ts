import { type AiCommand, type AiAttachment } from './ai-sender';
declare var __VLS_17: {}, __VLS_44: {}, __VLS_58: {
    disabled: boolean;
    loading: boolean;
    submit: () => void;
};
type __VLS_Slots = {} & {
    prefix?: (props: typeof __VLS_17) => any;
} & {
    actions?: (props: typeof __VLS_44) => any;
} & {
    submit?: (props: typeof __VLS_58) => any;
};
declare const __VLS_component: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly modelValue: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly placeholder: {
        readonly type: StringConstructor;
        readonly default: "Send a message...";
    };
    readonly disabled: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly loading: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly clearable: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly maxLength: NumberConstructor;
    readonly showWordLimit: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly commands: {
        readonly type: import("vue").PropType<AiCommand[]>;
        readonly default: () => never[];
    };
    readonly mentionOptions: {
        readonly type: import("vue").PropType<import("../..").AiMentionOption[]>;
        readonly default: () => never[];
    };
    readonly attachments: {
        readonly type: import("vue").PropType<AiAttachment[]>;
        readonly default: () => never[];
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    clear: () => void;
    upload: (_files: File[]) => void;
    focus: (_e: FocusEvent) => void;
    change: (_val: string) => void;
    blur: (_e: FocusEvent) => void;
    "update:modelValue": (_val: string) => void;
    send: (_val: string) => void;
    command: (_command: AiCommand) => void;
    "remove-attachment": (_attachment: AiAttachment) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly modelValue: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly placeholder: {
        readonly type: StringConstructor;
        readonly default: "Send a message...";
    };
    readonly disabled: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly loading: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly clearable: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly maxLength: NumberConstructor;
    readonly showWordLimit: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    readonly commands: {
        readonly type: import("vue").PropType<AiCommand[]>;
        readonly default: () => never[];
    };
    readonly mentionOptions: {
        readonly type: import("vue").PropType<import("../..").AiMentionOption[]>;
        readonly default: () => never[];
    };
    readonly attachments: {
        readonly type: import("vue").PropType<AiAttachment[]>;
        readonly default: () => never[];
    };
    readonly themeOverrides: {
        readonly type: import("vue").PropType<import("@yh-ui/theme").ComponentThemeVars>;
        readonly default: undefined;
    };
}>> & Readonly<{
    onClear?: (() => any) | undefined;
    onUpload?: ((_files: File[]) => any) | undefined;
    onFocus?: ((_e: FocusEvent) => any) | undefined;
    onChange?: ((_val: string) => any) | undefined;
    onBlur?: ((_e: FocusEvent) => any) | undefined;
    "onUpdate:modelValue"?: ((_val: string) => any) | undefined;
    onSend?: ((_val: string) => any) | undefined;
    onCommand?: ((_command: AiCommand) => any) | undefined;
    "onRemove-attachment"?: ((_attachment: AiAttachment) => any) | undefined;
}>, {
    readonly loading: boolean;
    readonly placeholder: string;
    readonly disabled: boolean;
    readonly themeOverrides: import("@yh-ui/theme").ComponentThemeVars;
    readonly modelValue: string;
    readonly clearable: boolean;
    readonly showWordLimit: boolean;
    readonly commands: AiCommand[];
    readonly mentionOptions: import("../..").AiMentionOption[];
    readonly attachments: AiAttachment[];
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
