import type { FilterSort, FilterValue, FilterItem, FilterOption } from './filter-bar';
declare function toggleOption(item: FilterItem, option: FilterOption): void;
declare var __VLS_1: {}, __VLS_3: {
    viewType: "list" | "grid";
}, __VLS_5: {}, __VLS_11: {
    filter: {
        [x: string]: unknown;
        key: string;
        label: string;
        type?: import("./filter-bar").FilterType | undefined;
        options?: {
            label: string;
            value: string | number;
        }[] | undefined;
        min?: number | undefined;
        max?: number | undefined;
    };
    value: FilterValue;
    toggle: typeof toggleOption;
};
type __VLS_Slots = {} & {
    'filter-icon'?: (props: typeof __VLS_1) => any;
} & {
    'view-icon'?: (props: typeof __VLS_3) => any;
} & {
    extra?: (props: typeof __VLS_5) => any;
} & {
    'panel-content'?: (props: typeof __VLS_11) => any;
};
declare const __VLS_component: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    sorts: {
        type: import("vue").PropType<import("./filter-bar").FilterSortItem[]>;
        default: () => never[];
    };
    filters: {
        type: import("vue").PropType<FilterItem[]>;
        default: () => never[];
    };
    sort: {
        type: import("vue").PropType<FilterSort>;
        default: () => FilterSort;
    };
    filterValue: {
        type: import("vue").PropType<FilterValue>;
        default: () => {};
    };
    showAll: {
        type: BooleanConstructor;
        default: boolean;
    };
    sticky: {
        type: BooleanConstructor;
        default: boolean;
    };
    stickyOffset: {
        type: NumberConstructor;
        default: number;
    };
    filterInPanel: {
        type: BooleanConstructor;
        default: boolean;
    };
    themeOverrides: {
        type: import("vue").PropType<Record<string, string>>;
        default: () => {};
    };
    showGlobalFilter: {
        type: BooleanConstructor;
        default: boolean;
    };
    showViewToggle: {
        type: BooleanConstructor;
        default: boolean;
    };
    viewType: {
        type: import("vue").PropType<"list" | "grid">;
        default: string;
    };
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    confirm: (val: FilterValue) => void;
    reset: () => void;
    "update:sort": (sort: FilterSort) => void;
    "update:filterValue": (val: FilterValue) => void;
    "update:viewType": (val: "list" | "grid") => void;
    sortChange: (sort: FilterSort) => void;
    filterChange: (val: FilterValue) => void;
    viewChange: (val: "list" | "grid") => void;
    resetPanel: (filter: FilterItem, _currentValues: FilterValue) => void;
    openFilter: () => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    sorts: {
        type: import("vue").PropType<import("./filter-bar").FilterSortItem[]>;
        default: () => never[];
    };
    filters: {
        type: import("vue").PropType<FilterItem[]>;
        default: () => never[];
    };
    sort: {
        type: import("vue").PropType<FilterSort>;
        default: () => FilterSort;
    };
    filterValue: {
        type: import("vue").PropType<FilterValue>;
        default: () => {};
    };
    showAll: {
        type: BooleanConstructor;
        default: boolean;
    };
    sticky: {
        type: BooleanConstructor;
        default: boolean;
    };
    stickyOffset: {
        type: NumberConstructor;
        default: number;
    };
    filterInPanel: {
        type: BooleanConstructor;
        default: boolean;
    };
    themeOverrides: {
        type: import("vue").PropType<Record<string, string>>;
        default: () => {};
    };
    showGlobalFilter: {
        type: BooleanConstructor;
        default: boolean;
    };
    showViewToggle: {
        type: BooleanConstructor;
        default: boolean;
    };
    viewType: {
        type: import("vue").PropType<"list" | "grid">;
        default: string;
    };
}>> & Readonly<{
    onConfirm?: ((val: FilterValue) => any) | undefined;
    onReset?: (() => any) | undefined;
    "onUpdate:sort"?: ((sort: FilterSort) => any) | undefined;
    "onUpdate:filterValue"?: ((val: FilterValue) => any) | undefined;
    "onUpdate:viewType"?: ((val: "list" | "grid") => any) | undefined;
    onSortChange?: ((sort: FilterSort) => any) | undefined;
    onFilterChange?: ((val: FilterValue) => any) | undefined;
    onViewChange?: ((val: "list" | "grid") => any) | undefined;
    onResetPanel?: ((filter: FilterItem, _currentValues: FilterValue) => any) | undefined;
    onOpenFilter?: (() => any) | undefined;
}>, {
    filters: FilterItem[];
    sort: FilterSort;
    showAll: boolean;
    themeOverrides: Record<string, string>;
    sticky: boolean;
    sorts: import("./filter-bar").FilterSortItem[];
    filterValue: FilterValue;
    stickyOffset: number;
    filterInPanel: boolean;
    showGlobalFilter: boolean;
    showViewToggle: boolean;
    viewType: "list" | "grid";
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
