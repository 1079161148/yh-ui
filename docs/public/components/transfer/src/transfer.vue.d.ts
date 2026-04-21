import type { TransferProps, TransferData, TransferKey, TransferPanelExpose } from './transfer';
declare var __VLS_11: {}, __VLS_13: {
    option: TransferData;
}, __VLS_15: {}, __VLS_17: {}, __VLS_19: {
    moveToLeft: () => void;
    moveToRight: () => void;
    leftChecked: TransferKey[];
    rightChecked: TransferKey[];
}, __VLS_31: {}, __VLS_33: {
    option: TransferData;
}, __VLS_35: {}, __VLS_37: {};
type __VLS_Slots = {} & {
    'left-header'?: (props: typeof __VLS_11) => any;
} & {
    default?: (props: typeof __VLS_13) => any;
} & {
    'left-empty'?: (props: typeof __VLS_15) => any;
} & {
    'left-footer'?: (props: typeof __VLS_17) => any;
} & {
    buttons?: (props: typeof __VLS_19) => any;
} & {
    'right-header'?: (props: typeof __VLS_31) => any;
} & {
    default?: (props: typeof __VLS_33) => any;
} & {
    'right-empty'?: (props: typeof __VLS_35) => any;
} & {
    'right-footer'?: (props: typeof __VLS_37) => any;
};
declare const __VLS_component: import("vue").DefineComponent<TransferProps, {
    clearLeftChecked: () => void;
    clearRightChecked: () => void;
    leftPanel: import("vue").Ref<TransferPanelExpose | undefined>;
    rightPanel: import("vue").Ref<TransferPanelExpose | undefined>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    change: (value: TransferKey[], direction: import("./transfer").TransferDirection, movedKeys: TransferKey[]) => any;
    "update:modelValue": (value: TransferKey[]) => any;
    "left-check-change": (value: TransferKey[], movedKeys?: TransferKey[] | undefined) => any;
    "right-check-change": (value: TransferKey[], movedKeys?: TransferKey[] | undefined) => any;
}, string, import("vue").PublicProps, Readonly<TransferProps> & Readonly<{
    onChange?: ((value: TransferKey[], direction: import("./transfer").TransferDirection, movedKeys: TransferKey[]) => any) | undefined;
    "onUpdate:modelValue"?: ((value: TransferKey[]) => any) | undefined;
    "onLeft-check-change"?: ((value: TransferKey[], movedKeys?: TransferKey[] | undefined) => any) | undefined;
    "onRight-check-change"?: ((value: TransferKey[], movedKeys?: TransferKey[] | undefined) => any) | undefined;
}>, {
    data: TransferData[];
    size: import("./transfer").TransferSize;
    disabled: boolean;
    height: number;
    itemHeight: number;
    modelValue: TransferKey[];
    validateEvent: boolean;
    filterable: boolean;
    virtual: boolean;
    showAllCheckbox: boolean;
    targetOrder: import("./transfer").TargetOrder;
    buttonTexts: string[];
    leftDefaultChecked: TransferKey[];
    rightDefaultChecked: TransferKey[];
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
