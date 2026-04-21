import type { TransferPanelProps, TransferData, TransferKey } from './transfer';
declare var __VLS_1: {}, __VLS_3: {}, __VLS_5: {
    option: TransferData;
}, __VLS_7: {
    option: TransferData;
}, __VLS_9: {};
type __VLS_Slots = {} & {
    header?: (props: typeof __VLS_1) => any;
} & {
    empty?: (props: typeof __VLS_3) => any;
} & {
    default?: (props: typeof __VLS_5) => any;
} & {
    default?: (props: typeof __VLS_7) => any;
} & {
    footer?: (props: typeof __VLS_9) => any;
};
declare const __VLS_component: import("vue").DefineComponent<TransferPanelProps, {
    clearChecked: () => void;
    query: import("vue").Ref<string>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    "update:checked": (value: TransferKey[]) => any;
    "checked-change": (value: TransferKey[], movedKeys?: TransferKey[] | undefined) => any;
}, string, import("vue").PublicProps, Readonly<TransferPanelProps> & Readonly<{
    "onUpdate:checked"?: ((value: TransferKey[]) => any) | undefined;
    "onChecked-change"?: ((value: TransferKey[], movedKeys?: TransferKey[] | undefined) => any) | undefined;
}>, {
    data: TransferData[];
    title: string;
    size: import("./transfer").TransferSize;
    disabled: boolean;
    height: number;
    itemHeight: number;
    checked: TransferKey[];
    filterable: boolean;
    virtual: boolean;
    showAllCheckbox: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
