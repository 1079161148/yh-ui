import GanttChart from './src/gantt-chart.vue';
import type { GanttChartProps } from './src/gantt-chart';
export declare const YhGanttChart: import("@yh-ui/utils").SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<GanttChartProps> & Readonly<{
        "onUpdate:data"?: ((data: import("./index.js").GanttTask[]) => any) | undefined;
        "onUpdate:viewMode"?: ((value: import("./index.js").GanttViewMode) => any) | undefined;
        "onTask-click"?: ((task: import("./index.js").GanttTask, event: MouseEvent) => any) | undefined;
        "onTask-dblclick"?: ((task: import("./index.js").GanttTask, event: MouseEvent) => any) | undefined;
        "onTask-drag-end"?: ((task: import("./index.js").GanttTask) => any) | undefined;
        "onProgress-drag-end"?: ((task: import("./index.js").GanttTask) => any) | undefined;
        "onDependency-click"?: ((from: import("./index.js").GanttTask, to: import("./index.js").GanttTask, event: MouseEvent) => any) | undefined;
    }>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
        "update:data": (data: import("./index.js").GanttTask[]) => any;
        "update:viewMode": (value: import("./index.js").GanttViewMode) => any;
        "task-click": (task: import("./index.js").GanttTask, event: MouseEvent) => any;
        "task-dblclick": (task: import("./index.js").GanttTask, event: MouseEvent) => any;
        "task-drag-end": (task: import("./index.js").GanttTask) => any;
        "progress-drag-end": (task: import("./index.js").GanttTask) => any;
        "dependency-click": (from: import("./index.js").GanttTask, to: import("./index.js").GanttTask, event: MouseEvent) => any;
    }, import("vue").PublicProps, {
        data: import("./index.js").GanttTask[];
        loading: boolean;
        columns: import("./index.js").GanttColumn[];
        draggable: boolean;
        bordered: boolean;
        virtual: boolean;
        rowHeight: number;
        viewMode: import("./index.js").GanttViewMode;
        showDependencies: boolean;
        progressDraggable: boolean;
        autoSchedule: boolean;
        showResourceLoad: boolean;
        headerHeight: number;
    }, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<GanttChartProps> & Readonly<{
        "onUpdate:data"?: ((data: import("./index.js").GanttTask[]) => any) | undefined;
        "onUpdate:viewMode"?: ((value: import("./index.js").GanttViewMode) => any) | undefined;
        "onTask-click"?: ((task: import("./index.js").GanttTask, event: MouseEvent) => any) | undefined;
        "onTask-dblclick"?: ((task: import("./index.js").GanttTask, event: MouseEvent) => any) | undefined;
        "onTask-drag-end"?: ((task: import("./index.js").GanttTask) => any) | undefined;
        "onProgress-drag-end"?: ((task: import("./index.js").GanttTask) => any) | undefined;
        "onDependency-click"?: ((from: import("./index.js").GanttTask, to: import("./index.js").GanttTask, event: MouseEvent) => any) | undefined;
    }>, {}, {}, {}, {}, {
        data: import("./index.js").GanttTask[];
        loading: boolean;
        columns: import("./index.js").GanttColumn[];
        draggable: boolean;
        bordered: boolean;
        virtual: boolean;
        rowHeight: number;
        viewMode: import("./index.js").GanttViewMode;
        showDependencies: boolean;
        progressDraggable: boolean;
        autoSchedule: boolean;
        showResourceLoad: boolean;
        headerHeight: number;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<GanttChartProps> & Readonly<{
    "onUpdate:data"?: ((data: import("./index.js").GanttTask[]) => any) | undefined;
    "onUpdate:viewMode"?: ((value: import("./index.js").GanttViewMode) => any) | undefined;
    "onTask-click"?: ((task: import("./index.js").GanttTask, event: MouseEvent) => any) | undefined;
    "onTask-dblclick"?: ((task: import("./index.js").GanttTask, event: MouseEvent) => any) | undefined;
    "onTask-drag-end"?: ((task: import("./index.js").GanttTask) => any) | undefined;
    "onProgress-drag-end"?: ((task: import("./index.js").GanttTask) => any) | undefined;
    "onDependency-click"?: ((from: import("./index.js").GanttTask, to: import("./index.js").GanttTask, event: MouseEvent) => any) | undefined;
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    "update:data": (data: import("./index.js").GanttTask[]) => any;
    "update:viewMode": (value: import("./index.js").GanttViewMode) => any;
    "task-click": (task: import("./index.js").GanttTask, event: MouseEvent) => any;
    "task-dblclick": (task: import("./index.js").GanttTask, event: MouseEvent) => any;
    "task-drag-end": (task: import("./index.js").GanttTask) => any;
    "progress-drag-end": (task: import("./index.js").GanttTask) => any;
    "dependency-click": (from: import("./index.js").GanttTask, to: import("./index.js").GanttTask, event: MouseEvent) => any;
}, string, {
    data: import("./index.js").GanttTask[];
    loading: boolean;
    columns: import("./index.js").GanttColumn[];
    draggable: boolean;
    bordered: boolean;
    virtual: boolean;
    rowHeight: number;
    viewMode: import("./index.js").GanttViewMode;
    showDependencies: boolean;
    progressDraggable: boolean;
    autoSchedule: boolean;
    showResourceLoad: boolean;
    headerHeight: number;
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        'table-cell'?: (props: {
            row: import("./index.js").FlattenedGanttTask;
            column: import("./index.js").GanttColumn;
            index: number;
        }) => any;
    } & {
        'task-content'?: (props: {
            task: import("./index.js").GanttTask;
        }) => any;
    };
})> & Record<string, unknown>;
export default YhGanttChart;
export * from './src/gantt-chart';
export type { GanttChartProps };
export type GanttChartInstance = InstanceType<typeof GanttChart>;
export type YhGanttChartInstance = GanttChartInstance;
export type YhGanttChartProps = GanttChartProps;
