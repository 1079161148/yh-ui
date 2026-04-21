<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import dayjs from '../../dayjs'
import type { PluginFunc } from '../../dayjs'
import isBetweenPluginModule from 'dayjs/plugin/isBetween.js'
import isoWeekPluginModule from 'dayjs/plugin/isoWeek.js'
import quarterOfYearPluginModule from 'dayjs/plugin/quarterOfYear.js'
import { useNamespace, useLocale } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'
import type {
  GanttChartProps,
  GanttChartEmits,
  GanttTask,
  GanttDependencyLink,
  GanttTaskStyle,
  FlattenedGanttTask
} from './gantt-chart'
import { YhTooltip } from '../../tooltip'
import { YhInput } from '../../input'
import { YhRadioGroup, YhRadioButton } from '../../radio'

type ExtendedDayjs = ReturnType<typeof dayjs> & {
  isoWeek: () => number
  quarter: () => number
  add: (value: number, unit: 'quarter') => ReturnType<typeof dayjs>
}

dayjs.extend(isBetweenPluginModule as PluginFunc)
dayjs.extend(isoWeekPluginModule as PluginFunc)
dayjs.extend(quarterOfYearPluginModule as PluginFunc)

defineOptions({ name: 'YhGanttChart' })

const props = withDefaults(defineProps<GanttChartProps>(), {
  data: () => [],
  columns: () => [],
  viewMode: 'day',
  showDependencies: true,
  draggable: false,
  progressDraggable: false,
  autoSchedule: true,
  virtual: false,
  showResourceLoad: true,
  rowHeight: 40,
  headerHeight: 60,
  bordered: true,
  loading: false
})

const emit = defineEmits<GanttChartEmits>()

const ns = useNamespace('gantt-chart')
const { t } = useLocale()
const { themeStyle } = useComponentTheme(
  'gantt',
  computed(() => props.themeOverrides)
)
const resolvedColumns = computed(() => {
  const isDefaultNameColumn =
    props.columns.length === 1 &&
    props.columns[0]?.prop === 'name' &&
    props.columns[0]?.width === 200

  return isDefaultNameColumn
    ? [{ ...props.columns[0], label: t('ganttchart.taskName') }]
    : props.columns
})
const ganttSearchPlaceholder = computed(() => t('ganttchart.searchPlaceholder'))
const ganttZoomText = computed(() => t('ganttchart.zoom'))
const ganttMilestoneText = computed(() => t('ganttchart.milestone'))

const ganttRef = ref<HTMLElement | null>(null)
const timelineBodyRef = ref<HTMLElement | null>(null)
const sidebarBodyRef = ref<HTMLElement | null>(null)
const sidebarHeaderRef = ref<HTMLElement | null>(null)

// --- View Scale & Configuration ---
const PIXELS_PER_DAY = ref(40)
const internalViewModeState = ref(props.viewMode || 'day')

const internalViewMode = computed({
  get: () => internalViewModeState.value,
  set: (val) => {
    internalViewModeState.value = val
    emit('update:viewMode', val)
  }
})

watch(
  () => props.viewMode,
  (val) => {
    if (val) internalViewModeState.value = val
  }
)

const minPixelsPerDay = computed(() => {
  if (internalViewMode.value === 'day') return 20
  if (internalViewMode.value === 'week') return 6
  if (internalViewMode.value === 'month') return 2
  return 0.5
})

watch(
  internalViewMode,
  (val) => {
    if (val === 'day') PIXELS_PER_DAY.value = Math.max(PIXELS_PER_DAY.value, 40)
    else if (val === 'week') PIXELS_PER_DAY.value = Math.max(PIXELS_PER_DAY.value, 10)
    else if (val === 'month') PIXELS_PER_DAY.value = Math.max(PIXELS_PER_DAY.value, 4)
    else if (val === 'year') PIXELS_PER_DAY.value = Math.max(PIXELS_PER_DAY.value, 1)
  },
  { immediate: true }
)

// --- Calculate Global Start & End Date ---
const minMaxDates = computed(() => {
  let minDate = dayjs('2099-12-31')
  let maxDate = dayjs('1970-01-01')

  if (props.data.length === 0) {
    minDate = dayjs().subtract(7, 'day')
    maxDate = dayjs().add(23, 'day')
  } else {
    const checkTasks = (tasks: GanttTask[]) => {
      tasks.forEach((task) => {
        const start = dayjs(task.startDate)
        const end = dayjs(task.endDate)
        if (start.isBefore(minDate)) minDate = start
        if (end.isAfter(maxDate)) maxDate = end
        if (task.children) checkTasks(task.children)
      })
    }
    checkTasks(props.data)
    minDate = minDate.subtract(7, 'day')
    maxDate = maxDate.add(7, 'day')
  }

  return {
    start: props.startDate ? dayjs(props.startDate) : minDate,
    end: props.endDate ? dayjs(props.endDate) : maxDate
  }
})

const timelineStart = computed(() =>
  minMaxDates.value.start.startOf(internalViewMode.value === 'day' ? 'day' : internalViewMode.value)
)
const timelineEnd = computed(() =>
  minMaxDates.value.end.endOf(internalViewMode.value === 'day' ? 'day' : internalViewMode.value)
)

// --- Tree & Search ---
const expandedTasks = ref<Set<string | number>>(new Set())
const searchKeyword = ref('')

const toggleExpand = (task: GanttTask) => {
  if (expandedTasks.value.has(task.id)) {
    expandedTasks.value.delete(task.id)
  } else {
    expandedTasks.value.add(task.id)
  }
}

const getFlattenedTasks = (
  tasks: GanttTask[],
  parentId: string | number | null = null,
  level = 0,
  ancestorHasNext: boolean[] = []
): FlattenedGanttTask[] => {
  let result: FlattenedGanttTask[] = []
  tasks.forEach((task, index) => {
    const matchesSearch =
      !searchKeyword.value || task.name.toLowerCase().includes(searchKeyword.value.toLowerCase())

    let start = dayjs(task.startDate),
      end = dayjs(task.endDate)
    const isMilestone = start.isSame(end, 'day')
    if (task.children?.length) {
      task.children.forEach((c) => {
        const cs = dayjs(c.startDate),
          ce = dayjs(c.endDate)
        if (cs.isBefore(start)) start = cs
        if (ce.isAfter(end)) end = ce
      })
    }

    const isLast = index === tasks.length - 1
    const flatTask = {
      ...task,
      _original: task, // 保持对原始对象的引用
      _level: level,
      _parentId: parentId,
      _isLast: isLast,
      _ancestorHasNext: [...ancestorHasNext],
      _hasChildren: !!task.children?.length,
      _startDate: start.format('YYYY-MM-DD HH:mm:ss'),
      _endDate: end.format('YYYY-MM-DD HH:mm:ss'),
      _isMilestone: isMilestone,
      _matchesSearch: matchesSearch
    }

    result.push(flatTask)

    if (task.children?.length && (expandedTasks.value.has(task.id) || searchKeyword.value)) {
      result = result.concat(
        getFlattenedTasks(task.children, task.id, level + 1, [...ancestorHasNext, !isLast])
      )
    }
  })
  return result
}

const visibleAllTasks = computed(() => {
  let list = getFlattenedTasks(props.data)
  if (searchKeyword.value) {
    return list.filter((t) => t._matchesSearch)
  }
  return list
})

// --- Virtual Scroll ---
const scrollTop = ref(0)
const viewportHeight = ref(600)

const virtualState = computed(() => {
  if (!props.virtual) return { start: 0, end: visibleAllTasks.value.length, offsetTop: 0 }
  const start = Math.floor(scrollTop.value / props.rowHeight)
  const end = Math.min(
    start + Math.ceil(viewportHeight.value / props.rowHeight) + 2,
    visibleAllTasks.value.length
  )
  return { start, end, offsetTop: start * props.rowHeight }
})

const renderTasks = computed(() =>
  visibleAllTasks.value.slice(virtualState.value.start, virtualState.value.end)
)
const totalHeight = computed(() => visibleAllTasks.value.length * props.rowHeight)

// --- Resource Overload ---
const resourceLoadMap = computed(() => {
  const loadMap: Record<string, Record<string, number>> = {}
  visibleAllTasks.value.forEach((t) => {
    if (!t.assignees) return
    let current = dayjs(t._startDate || t.startDate)
    const end = dayjs(t._endDate || t.endDate)
    while (current.isBefore(end) || current.isSame(end, 'day')) {
      const dateStr = current.format('YYYY-MM-DD')
      t.assignees.forEach((resId: string) => {
        if (!loadMap[resId]) loadMap[resId] = {}
        loadMap[resId][dateStr] = (loadMap[resId][dateStr] || 0) + 1
      })
      current = current.add(1, 'day')
    }
  })
  return loadMap
})

const totalDays = computed(() =>
  Math.max(1, timelineEnd.value.diff(timelineStart.value, 'day') + 1)
)
const timelineWidth = computed(() => totalDays.value * PIXELS_PER_DAY.value)

// --- Headers ---
const topHeaders = computed(() => {
  const headers = []
  let current = timelineStart.value.clone()
  while (current.isBefore(timelineEnd.value) || current.isSame(timelineEnd.value, 'day')) {
    const nextCurrent =
      internalViewMode.value === 'day' || internalViewMode.value === 'week'
        ? current.add(1, 'month').startOf('month')
        : current.add(1, 'year').startOf('year')
    const actualEnd = nextCurrent.isAfter(timelineEnd.value) ? timelineEnd.value : nextCurrent
    const days = actualEnd.diff(current, 'day')
    if (days > 0) {
      headers.push({
        label:
          internalViewMode.value === 'year' ? current.format('YYYY') : current.format('YYYY-MM'),
        width: days * PIXELS_PER_DAY.value
      })
    }
    current = nextCurrent
  }
  return headers
})

const bottomHeaders = computed(() => {
  const headers = []
  let current = timelineStart.value.clone()
  while (current.isBefore(timelineEnd.value) || current.isSame(timelineEnd.value, 'day')) {
    let label = '',
      days = 1
    if (internalViewMode.value === 'day') {
      label = current.format('DD')
      days = 1
      current = current.add(1, 'day')
    } else if (internalViewMode.value === 'week') {
      label = `W${(current as ExtendedDayjs).isoWeek()}`
      days = 7
      current = current.add(1, 'week')
    } else if (internalViewMode.value === 'month') {
      label = current.format('MMM')
      days = current.daysInMonth()
      current = current.add(1, 'month')
    } else if (internalViewMode.value === 'year') {
      label = `Q${(current as ExtendedDayjs).quarter()}`
      days = (current as ExtendedDayjs).add(1, 'quarter').diff(current, 'day')
      current = (current as ExtendedDayjs).add(1, 'quarter')
    }
    headers.push({
      label,
      width: days * PIXELS_PER_DAY.value,
      isToday: current.subtract(1, 'day').isSame(dayjs(), 'day')
    })
  }
  return headers
})

// --- Task Style ---
const getTaskPosition = (task: FlattenedGanttTask, index: number) => {
  const start = dayjs(task.startDate)
  const end = dayjs(task.endDate)
  const isMilestone = task._isMilestone || start.isSame(end, 'day')
  const daysFromStart = start.diff(timelineStart.value, 'day', true)
  let duration = Math.max(0.1, end.diff(start, 'day') + 1)
  let width = duration * PIXELS_PER_DAY.value
  let left = daysFromStart * PIXELS_PER_DAY.value
  if (isMilestone) width = 0
  return { left, width, top: index * props.rowHeight, isMilestone }
}

const taskStyles = computed<GanttTaskStyle[]>(() => {
  return renderTasks.value.map((task, index) => {
    const realIndex = virtualState.value.start + index
    const pos = getTaskPosition(task, realIndex)
    let hasConflict = false
    if (props.showResourceLoad && task.assignees) {
      let current = dayjs(task.startDate)
      const end = dayjs(task.endDate)
      while (current.isBefore(end) || current.isSame(end, 'day')) {
        const ds = current.format('YYYY-MM-DD')
        if (task.assignees.some((rid: string) => (resourceLoadMap.value[rid]?.[ds] || 0) > 1)) {
          hasConflict = true
          break
        }
        current = current.add(1, 'day')
      }
    }
    const isSummary = task._hasChildren
    return {
      ...pos,
      task,
      index: realIndex,
      hasConflict,
      isSummary,
      style: {
        left: `${pos.isMilestone ? pos.left + PIXELS_PER_DAY.value / 2 - 8 : pos.left}px`,
        width: `${pos.isMilestone ? 16 : pos.width}px`,
        top: `${pos.top + (isSummary ? 12 : 4)}px`,
        height: `${pos.isMilestone ? 16 : isSummary ? 8 : props.rowHeight - 8}px`,
        backgroundColor:
          pos.isMilestone || isSummary
            ? 'transparent'
            : hasConflict
              ? 'var(--yh-color-danger)'
              : task.color,
        color: task.textColor,
        margin: pos.isMilestone ? '4px 0' : '0'
      }
    }
  })
})

const dependenciesLinks = computed<GanttDependencyLink[]>(() => {
  if (!props.showDependencies) return []
  const links: GanttDependencyLink[] = []
  const idToPos = new Map<string | number, GanttTaskStyle>()
  taskStyles.value.forEach((t) => idToPos.set(t.task.id, t))
  taskStyles.value.forEach((t) => {
    if (!t.task.dependencies) return
    t.task.dependencies.forEach((depId) => {
      const from = idToPos.get(depId)
      if (from) {
        const x1 = from.left + from.width,
          y1 = from.top + props.rowHeight / 2
        const x2 = t.left,
          y2 = t.top + props.rowHeight / 2
        links.push({
          id: `${depId}-${t.task.id}`,
          from: from.task,
          to: t.task,
          path: `M ${x1} ${y1} L ${x2} ${y2}`
        })
      }
    })
  })
  return links
})

// --- Scroll ---
const handleBodyScroll = (e: Event) => {
  const target = e.target as HTMLElement
  scrollTop.value = target.scrollTop
  if (sidebarBodyRef.value && target === timelineBodyRef.value) {
    sidebarBodyRef.value.scrollTop = target.scrollTop
  } else if (timelineBodyRef.value && target === sidebarBodyRef.value) {
    timelineBodyRef.value.scrollTop = target.scrollTop
  }
  if (sidebarHeaderRef.value && target === sidebarBodyRef.value) {
    sidebarHeaderRef.value.scrollLeft = target.scrollLeft
  }
}

const updateSuccessors = (taskId: string | number) => {
  const findTask = (id: string | number, list: GanttTask[]): GanttTask | undefined => {
    for (const t of list) {
      if (t.id === id) return t
      if (t.children) {
        const found = findTask(id, t.children)
        if (found) return found
      }
    }
  }
  const findAffected = (predId: string | number, list: GanttTask[]): GanttTask[] => {
    let affected: GanttTask[] = []
    list.forEach((t) => {
      if (t.dependencies?.includes(predId)) affected.push(t)
      if (t.children) affected = affected.concat(findAffected(predId, t.children))
    })
    return affected
  }
  const pred = findTask(taskId, props.data)
  if (!pred) return
  const affected = findAffected(taskId, props.data)
  affected.forEach((task) => {
    const start = dayjs(task.startDate),
      end = dayjs(pred.endDate)
    if (start.isBefore(end)) {
      const dur = dayjs(task.endDate).diff(dayjs(task.startDate), 'day')
      const ns = end.add(1, 'day')
      task.startDate = ns.format('YYYY-MM-DD HH:mm:ss')
      task.endDate = ns.add(dur, 'day').format('YYYY-MM-DD HH:mm:ss')
      updateSuccessors(task.id)
    }
  })
}

// --- Interaction ---
const activeDragTask = ref<GanttTask | null>(null)
let dragType: string | null = null,
  dragStartX = 0,
  dragInitS = dayjs(),
  dragInitE = dayjs(),
  dragInitP = 0
const onDragStart = (e: MouseEvent, task: GanttTask, type: string) => {
  if (type === 'progress' && !props.progressDraggable) return
  if (type !== 'progress' && !props.draggable) return
  e.preventDefault()
  e.stopPropagation()
  activeDragTask.value = task
  dragType = type
  dragStartX = e.clientX
  dragInitS = dayjs(task.startDate)
  dragInitE = dayjs(task.endDate)
  dragInitP = task.progress || 0
  document.addEventListener('mousemove', onDragMove)
  document.addEventListener('mouseup', onDragEnd)
}
const onDragMove = (e: MouseEvent) => {
  if (!activeDragTask.value) return
  const dx = e.clientX - dragStartX
  // 使用毫秒级精度进行计算，避免不足一天时被 Rounding 掉导致“拖不动”
  const msPerDay = 86400000
  const msOffset = (dx / PIXELS_PER_DAY.value) * msPerDay

  const currentTask = activeDragTask.value as FlattenedGanttTask
  const originalTask = currentTask._original || currentTask

  if (dragType === 'move') {
    const newStart = dragInitS.add(msOffset, 'ms').format('YYYY-MM-DD HH:mm:ss')
    const newEnd = dragInitE.add(msOffset, 'ms').format('YYYY-MM-DD HH:mm:ss')
    currentTask.startDate = newStart
    currentTask.endDate = newEnd
    originalTask.startDate = newStart
    originalTask.endDate = newEnd
  } else if (dragType === 'left') {
    const ns = dragInitS.add(msOffset, 'ms')
    if (ns.isBefore(dragInitE)) {
      const newStart = ns.format('YYYY-MM-DD HH:mm:ss')
      currentTask.startDate = newStart
      originalTask.startDate = newStart
    }
  } else if (dragType === 'right') {
    const ne = dragInitE.add(msOffset, 'ms')
    if (ne.isAfter(dragInitS)) {
      const newEnd = ne.format('YYYY-MM-DD HH:mm:ss')
      currentTask.endDate = newEnd
      originalTask.endDate = newEnd
    }
  } else if (dragType === 'progress') {
    const pos = getTaskPosition(currentTask, 0)
    const newProgress = Math.round(Math.max(0, Math.min(100, dragInitP + (dx / pos.width) * 100)))
    currentTask.progress = newProgress
    originalTask.progress = newProgress
  }
}
const onDragEnd = () => {
  const draggedTask = activeDragTask.value
  if (draggedTask && props.autoSchedule) updateSuccessors(draggedTask.id)
  if (draggedTask) {
    if (dragType === 'progress') {
      emit('progress-drag-end', draggedTask)
    } else {
      emit('task-drag-end', draggedTask)
    }
  }
  emit('update:data', [...props.data])
  activeDragTask.value = null
  dragType = null
  document.removeEventListener('mousemove', onDragMove)
  document.removeEventListener('mouseup', onDragEnd)
}

const handleTaskClick = (e: MouseEvent, task: GanttTask) => {
  if (dragType) return // 忽略拖拽时的点击
  emit('task-click', task, e)
}

const handleTaskDblClick = (e: MouseEvent, task: GanttTask) => {
  emit('task-dblclick', task, e)
}

const truncatedTasks = ref<Record<string | number, boolean>>({})
const handleMouseEnter = (e: MouseEvent, task: GanttTask) => {
  const label = (e.currentTarget as HTMLElement).querySelector(
    `.${ns.e('task-label')}`
  ) as HTMLElement
  if (label) truncatedTasks.value[task.id] = label.scrollWidth > label.clientWidth
}
</script>

<template>
  <div
    ref="ganttRef"
    :class="[ns.b(), ns.is('bordered', bordered), ns.is('loading', loading)]"
    :style="themeStyle"
  >
    <div :class="ns.e('toolbar')">
      <div :class="ns.e('toolbar-left')">
        <YhInput
          id="gantt-search-input"
          v-model="searchKeyword"
          :placeholder="ganttSearchPlaceholder"
          prefix-icon="search"
          size="small"
          style="width: 200px"
        />
      </div>
      <div :class="ns.e('toolbar-right')">
        <span style="font-size: 12px; color: var(--yh-text-color-secondary)">{{
          ganttZoomText
        }}</span>
        <input
          type="range"
          v-model.number="PIXELS_PER_DAY"
          :min="minPixelsPerDay"
          max="100"
          step="0.5"
          style="width: 80px"
        />
        <YhRadioGroup
          v-model="internalViewMode"
          size="small"
          type="button"
          name="gantt-view-switcher"
        >
          <YhRadioButton value="day">{{ t('ganttchart.day') }}</YhRadioButton>
          <YhRadioButton value="week">{{ t('ganttchart.week') }}</YhRadioButton>
          <YhRadioButton value="month">{{ t('ganttchart.month') }}</YhRadioButton>
          <YhRadioButton value="year">{{ t('ganttchart.year') }}</YhRadioButton>
        </YhRadioGroup>
      </div>
    </div>

    <div :class="ns.e('main')">
      <div :class="ns.e('sidebar')">
        <div
          ref="sidebarHeaderRef"
          :class="ns.e('sidebar-header-wrapper')"
          :style="{ height: `${headerHeight}px` }"
        >
          <div :class="ns.e('sidebar-header')">
            <div
              v-for="col in resolvedColumns"
              :key="col.prop"
              :class="ns.e('sidebar-header-cell')"
              :style="{ width: typeof col.width === 'number' ? `${col.width}px` : col.width }"
            >
              {{ col.label }}
            </div>
          </div>
        </div>
        <div ref="sidebarBodyRef" :class="ns.e('sidebar-body')" @scroll="handleBodyScroll">
          <div v-if="virtual" :style="{ height: `${virtualState.offsetTop}px` }"></div>
          <div
            v-for="(task, index) in renderTasks"
            :key="task.id"
            :class="ns.e('row')"
            :style="{ height: `${rowHeight}px` }"
          >
            <div
              v-for="col in resolvedColumns"
              :key="col.prop"
              :class="ns.e('cell')"
              :style="{ width: typeof col.width === 'number' ? `${col.width}px` : col.width }"
            >
              <slot name="table-cell" :row="task" :column="col" :index="index">
                <template v-if="col.prop === resolvedColumns[0].prop">
                  <span :class="ns.e('tree-node')">
                    <span
                      v-for="(hasNext, i) in task._ancestorHasNext"
                      :key="i"
                      :class="[ns.e('tree-indent'), ns.is('last', !hasNext)]"
                    />
                    <span :class="[ns.e('tree-indent'), ns.is('last', task._isLast)]">
                      <span :class="ns.e('tree-content')">
                        <span
                          v-if="task._hasChildren"
                          :class="[ns.e('tree-arrow'), expandedTasks.has(task.id) && 'is-expanded']"
                          @click.stop="toggleExpand(task)"
                        >
                          <svg viewBox="0 0 1024 1024" width="12" height="12">
                            <path
                              d="M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.936a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 533.376a30.592 30.592 0 0 0 0-42.752L382.592 149.312a29.12 29.12 0 0 0-41.728 0z"
                            ></path>
                          </svg>
                        </span>
                        <span v-else style="display: inline-block; width: 14px"></span>
                        <span :class="ns.e('tree-line')" />
                      </span>
                    </span>
                  </span>
                </template>
                <YhTooltip :content="String(task[col.prop])" placement="top">
                  <span :class="ns.e('cell-text')">{{ task[col.prop] }}</span>
                </YhTooltip>
              </slot>
            </div>
          </div>
          <div
            v-if="virtual"
            :style="{
              height: `${totalHeight - (virtualState.offsetTop + renderTasks.length * rowHeight)}px`
            }"
          >
          </div>
        </div>
      </div>

      <div :class="ns.e('timeline')">
        <div :class="ns.e('timeline-header')" :style="{ height: `${headerHeight}px` }">
          <div
            :class="ns.e('timeline-header-top')"
            :style="{ height: `${headerHeight / 2}px`, width: `${timelineWidth}px` }"
          >
            <div
              v-for="(th, i) in topHeaders"
              :key="i"
              :class="ns.e('timeline-unit')"
              :style="{ width: `${th.width}px` }"
            >
              {{ th.label }}
            </div>
          </div>
          <div
            :class="ns.e('timeline-header-bottom')"
            :style="{ height: `${headerHeight / 2}px`, width: `${timelineWidth}px` }"
          >
            <div
              v-for="(th, i) in bottomHeaders"
              :key="i"
              :class="[ns.e('timeline-unit'), th.isToday ? ns.em('timeline-unit', 'today') : '']"
              :style="{ width: `${th.width}px` }"
            >
              <span
                v-if="th.width > 20"
                style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap"
                >{{ th.label }}</span
              >
            </div>
          </div>
        </div>
        <div ref="timelineBodyRef" :class="ns.e('timeline-body')" @scroll="handleBodyScroll">
          <div
            :style="{
              width: `${timelineWidth}px`,
              height: `${totalHeight}px`,
              position: 'relative'
            }"
          >
            <div v-if="virtual" :style="{ height: `${virtualState.offsetTop}px` }"></div>
            <div
              :class="ns.e('grid')"
              :style="{ width: `${timelineWidth}px`, height: `${totalHeight}px` }"
            >
              <div
                v-for="(th, i) in bottomHeaders"
                :key="i"
                :class="ns.e('grid-column')"
                :style="{ width: `${th.width}px` }"
              >
              </div>
            </div>
            <div
              v-for="(_, index) in renderTasks"
              :key="index"
              :class="ns.e('timeline-row')"
              :style="{ height: `${rowHeight}px`, width: `${timelineWidth}px` }"
            />
            <svg
              v-if="showDependencies"
              :class="ns.e('dependency-svg')"
              :style="{ width: `${timelineWidth}px`, height: `${totalHeight}px` }"
            >
              <path
                v-for="link in dependenciesLinks"
                :key="link.id"
                :d="link.path"
                :class="ns.e('dependency-path')"
              />
            </svg>
            <YhTooltip
              v-for="ts in taskStyles"
              :key="ts.task.id"
              :content="ts.isMilestone ? `${ts.task.name} (${ganttMilestoneText})` : ts.task.name"
              placement="top"
              :class="[
                ns.e('task-wrapper'),
                ns.is('milestone', ts.isMilestone),
                ns.is('summary', ts.isSummary),
                ts.task.status ? ns.e(`task-${ts.task.status}`) : ''
              ]"
              :style="ts.style"
              @mouseenter="handleMouseEnter($event, ts.task)"
            >
              <div
                :class="ns.e('task-inner')"
                style="width: 100%; height: 100%; display: flex; align-items: center"
                @click="handleTaskClick($event, ts.task)"
                @dblclick="handleTaskDblClick($event, ts.task)"
                @mousedown="onDragStart($event, ts.task, 'move')"
              >
                <div v-if="ts.isSummary" :class="ns.e('summary-bar')">
                  <div :class="ns.e('summary-left')" />
                  <div :class="ns.e('summary-right')" />
                </div>
                <div
                  v-else-if="ts.isMilestone"
                  :class="ns.e('milestone-diamond')"
                  :style="{ backgroundColor: ts.task.color || 'var(--yh-color-primary)' }"
                />
                <template v-else>
                  <div
                    v-if="ts.task.progress"
                    :class="ns.e('task-progress')"
                    :style="{ width: `${ts.task.progress}%` }"
                  />
                  <slot name="task-content" :task="ts.task">
                    <span :class="ns.e('task-label')">{{ ts.task.name }}</span>
                  </slot>
                </template>
                <template v-if="!ts.isMilestone && draggable">
                  <div
                    :class="ns.e('resizer-left')"
                    @mousedown.stop="onDragStart($event, ts.task, 'left')"
                  />
                  <div
                    :class="ns.e('resizer-right')"
                    @mousedown.stop="onDragStart($event, ts.task, 'right')"
                  />
                </template>
              </div>
            </YhTooltip>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use './gantt-chart.scss';
</style>
