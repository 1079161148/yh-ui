import type { GanttChartProps, GanttTask, FlattenedGanttTask } from './gantt-chart';
declare var __VLS_25: {
    row: FlattenedGanttTask;
    column: import("./gantt-chart").GanttColumn;
    index: number;
}, __VLS_39: {
    task: GanttTask;
};
type __VLS_Slots = {} & {
    'table-cell'?: (props: typeof __VLS_25) => any;
} & {
    'task-content'?: (props: typeof __VLS_39) => any;
};
declare const __VLS_component: import("vue").DefineComponent<GanttChartProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    "update:data": (data: GanttTask[]) => any;
    "update:viewMode": (value: import("./gantt-chart").GanttViewMode) => any;
    "task-click": (task: GanttTask, event: MouseEvent) => any;
    "task-dblclick": (task: GanttTask, event: MouseEvent) => any;
    "task-drag-end": (task: GanttTask) => any;
    "progress-drag-end": (task: GanttTask) => any;
    "dependency-click": (from: GanttTask, to: GanttTask, event: MouseEvent) => any;
}, string, import("vue").PublicProps, Readonly<GanttChartProps> & Readonly<{
    "onUpdate:data"?: ((data: GanttTask[]) => any) | undefined;
    "onUpdate:viewMode"?: ((value: import("./gantt-chart").GanttViewMode) => any) | undefined;
    "onTask-click"?: ((task: GanttTask, event: MouseEvent) => any) | undefined;
    "onTask-dblclick"?: ((task: GanttTask, event: MouseEvent) => any) | undefined;
    "onTask-drag-end"?: ((task: GanttTask) => any) | undefined;
    "onProgress-drag-end"?: ((task: GanttTask) => any) | undefined;
    "onDependency-click"?: ((from: GanttTask, to: GanttTask, event: MouseEvent) => any) | undefined;
}>, {
    data: GanttTask[];
    loading: boolean;
    columns: import("./gantt-chart").GanttColumn[];
    draggable: boolean;
    bordered: boolean;
    virtual: boolean;
    rowHeight: number;
    viewMode: import("./gantt-chart").GanttViewMode;
    showDependencies: boolean;
    progressDraggable: boolean;
    autoSchedule: boolean;
    showResourceLoad: boolean;
    headerHeight: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
