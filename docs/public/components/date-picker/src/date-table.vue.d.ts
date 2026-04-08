import type { CalendarCell } from './panel-utils';
type __VLS_Props = {
    date: Date;
    selectedDate?: Date | Date[] | null;
    selectionMode?: 'date' | 'week';
    rangeState?: {
        from: Date | null;
        to: Date | null;
        hovering: Date | null;
    };
    disabledDate?: (date: Date) => boolean;
    firstDayOfWeek?: number;
    cellShape?: 'round' | 'square';
    cellRender?: (date: Date) => string | {
        text: string;
        className?: string;
    };
};
declare var __VLS_1: {
    cell: CalendarCell;
};
type __VLS_Slots = {} & {
    'date-cell'?: (props: typeof __VLS_1) => any;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    select: (date: Date) => any;
    hover: (date: Date | null) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onSelect?: ((date: Date) => any) | undefined;
    onHover?: ((date: Date | null) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
