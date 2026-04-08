type __VLS_Props = {
    date: Date;
    selectedDate?: Date | Date[] | null;
    rangeState?: {
        from: Date | null;
        to: Date | null;
        hovering: Date | null;
    };
    disabledDate?: (date: Date) => boolean;
    cellShape?: 'round' | 'square';
};
declare const _default: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    select: (month: number) => any;
    hover: (date: Date | null) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onSelect?: ((month: number) => any) | undefined;
    onHover?: ((date: Date | null) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
