<script setup>
import { ref, computed, watch } from 'vue'
import dayjs from '../../dayjs'
import isBetweenPluginModule from 'dayjs/plugin/isBetween.js'
import isoWeekPluginModule from 'dayjs/plugin/isoWeek.js'
import quarterOfYearPluginModule from 'dayjs/plugin/quarterOfYear.js'
import { useNamespace, useLocale } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'
import { YhTooltip } from '../../tooltip'
import { YhInput } from '../../input'
import { YhRadioGroup, YhRadioButton } from '../../radio'
dayjs.extend(isBetweenPluginModule)
dayjs.extend(isoWeekPluginModule)
dayjs.extend(quarterOfYearPluginModule)
defineOptions({ name: 'YhGanttChart' })
const props = defineProps({
  data: { type: Array, required: true, default: () => [] },
  columns: { type: Array, required: false, default: () => [] },
  startDate: { type: [String, Number, Date], required: false },
  endDate: { type: [String, Number, Date], required: false },
  viewMode: { type: String, required: false, default: 'day' },
  showDependencies: { type: Boolean, required: false, default: true },
  draggable: { type: Boolean, required: false, default: false },
  progressDraggable: { type: Boolean, required: false, default: false },
  autoSchedule: { type: Boolean, required: false, default: true },
  virtual: { type: Boolean, required: false, default: false },
  showResourceLoad: { type: Boolean, required: false, default: true },
  rowHeight: { type: Number, required: false, default: 40 },
  headerHeight: { type: Number, required: false, default: 60 },
  bordered: { type: Boolean, required: false, default: true },
  loading: { type: Boolean, required: false, default: false },
  teleported: { type: Boolean, required: false },
  themeOverrides: { type: Object, required: false }
})
const emit = defineEmits([
  'update:data',
  'update:viewMode',
  'task-click',
  'task-dblclick',
  'task-drag-end',
  'progress-drag-end',
  'dependency-click'
])
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
const ganttRef = ref(null)
const timelineBodyRef = ref(null)
const sidebarBodyRef = ref(null)
const sidebarHeaderRef = ref(null)
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
const minMaxDates = computed(() => {
  let minDate = dayjs('2099-12-31')
  let maxDate = dayjs('1970-01-01')
  if (props.data.length === 0) {
    minDate = dayjs().subtract(7, 'day')
    maxDate = dayjs().add(23, 'day')
  } else {
    const checkTasks = (tasks) => {
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
const expandedTasks = ref(/* @__PURE__ */ new Set())
const searchKeyword = ref('')
const toggleExpand = (task) => {
  if (expandedTasks.value.has(task.id)) {
    expandedTasks.value.delete(task.id)
  } else {
    expandedTasks.value.add(task.id)
  }
}
const getFlattenedTasks = (tasks, parentId = null, level = 0, ancestorHasNext = []) => {
  let result = []
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
      _original: task,
      // 保持对原始对象的引用
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
    return list.filter((t2) => t2._matchesSearch)
  }
  return list
})
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
const resourceLoadMap = computed(() => {
  const loadMap = {}
  visibleAllTasks.value.forEach((t2) => {
    if (!t2.assignees) return
    let current = dayjs(t2._startDate || t2.startDate)
    const end = dayjs(t2._endDate || t2.endDate)
    while (current.isBefore(end) || current.isSame(end, 'day')) {
      const dateStr = current.format('YYYY-MM-DD')
      t2.assignees.forEach((resId) => {
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
      label = `W${current.isoWeek()}`
      days = 7
      current = current.add(1, 'week')
    } else if (internalViewMode.value === 'month') {
      label = current.format('MMM')
      days = current.daysInMonth()
      current = current.add(1, 'month')
    } else if (internalViewMode.value === 'year') {
      label = `Q${current.quarter()}`
      days = current.add(1, 'quarter').diff(current, 'day')
      current = current.add(1, 'quarter')
    }
    headers.push({
      label,
      width: days * PIXELS_PER_DAY.value,
      isToday: current.subtract(1, 'day').isSame(dayjs(), 'day')
    })
  }
  return headers
})
const getTaskPosition = (task, index) => {
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
const taskStyles = computed(() => {
  return renderTasks.value.map((task, index) => {
    const realIndex = virtualState.value.start + index
    const pos = getTaskPosition(task, realIndex)
    let hasConflict = false
    if (props.showResourceLoad && task.assignees) {
      let current = dayjs(task.startDate)
      const end = dayjs(task.endDate)
      while (current.isBefore(end) || current.isSame(end, 'day')) {
        const ds = current.format('YYYY-MM-DD')
        if (task.assignees.some((rid) => (resourceLoadMap.value[rid]?.[ds] || 0) > 1)) {
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
const dependenciesLinks = computed(() => {
  if (!props.showDependencies) return []
  const links = []
  const idToPos = /* @__PURE__ */ new Map()
  taskStyles.value.forEach((t2) => idToPos.set(t2.task.id, t2))
  taskStyles.value.forEach((t2) => {
    if (!t2.task.dependencies) return
    t2.task.dependencies.forEach((depId) => {
      const from = idToPos.get(depId)
      if (from) {
        const x1 = from.left + from.width,
          y1 = from.top + props.rowHeight / 2
        const x2 = t2.left,
          y2 = t2.top + props.rowHeight / 2
        links.push({
          id: `${depId}-${t2.task.id}`,
          from: from.task,
          to: t2.task,
          path: `M ${x1} ${y1} L ${x2} ${y2}`
        })
      }
    })
  })
  return links
})
const handleBodyScroll = (e) => {
  const target = e.target
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
const updateSuccessors = (taskId) => {
  const findTask = (id, list) => {
    for (const t2 of list) {
      if (t2.id === id) return t2
      if (t2.children) {
        const found = findTask(id, t2.children)
        if (found) return found
      }
    }
  }
  const findAffected = (predId, list) => {
    let affected2 = []
    list.forEach((t2) => {
      if (t2.dependencies?.includes(predId)) affected2.push(t2)
      if (t2.children) affected2 = affected2.concat(findAffected(predId, t2.children))
    })
    return affected2
  }
  const pred = findTask(taskId, props.data)
  if (!pred) return
  const affected = findAffected(taskId, props.data)
  affected.forEach((task) => {
    const start = dayjs(task.startDate),
      end = dayjs(pred.endDate)
    if (start.isBefore(end)) {
      const dur = dayjs(task.endDate).diff(dayjs(task.startDate), 'day')
      const ns2 = end.add(1, 'day')
      task.startDate = ns2.format('YYYY-MM-DD HH:mm:ss')
      task.endDate = ns2.add(dur, 'day').format('YYYY-MM-DD HH:mm:ss')
      updateSuccessors(task.id)
    }
  })
}
const activeDragTask = ref(null)
let dragType = null,
  dragStartX = 0,
  dragInitS = dayjs(),
  dragInitE = dayjs(),
  dragInitP = 0
const onDragStart = (e, task, type) => {
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
const onDragMove = (e) => {
  if (!activeDragTask.value) return
  const dx = e.clientX - dragStartX
  const msPerDay = 864e5
  const msOffset = (dx / PIXELS_PER_DAY.value) * msPerDay
  const currentTask = activeDragTask.value
  const originalTask = currentTask._original || currentTask
  if (dragType === 'move') {
    const newStart = dragInitS.add(msOffset, 'ms').format('YYYY-MM-DD HH:mm:ss')
    const newEnd = dragInitE.add(msOffset, 'ms').format('YYYY-MM-DD HH:mm:ss')
    currentTask.startDate = newStart
    currentTask.endDate = newEnd
    originalTask.startDate = newStart
    originalTask.endDate = newEnd
  } else if (dragType === 'left') {
    const ns2 = dragInitS.add(msOffset, 'ms')
    if (ns2.isBefore(dragInitE)) {
      const newStart = ns2.format('YYYY-MM-DD HH:mm:ss')
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
const handleTaskClick = (e, task) => {
  if (dragType) return
  emit('task-click', task, e)
}
const handleTaskDblClick = (e, task) => {
  emit('task-dblclick', task, e)
}
const truncatedTasks = ref({})
const handleMouseEnter = (e, task) => {
  const label = e.currentTarget.querySelector(`.${ns.e('task-label')}`)
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
          :style="{
            height: `${headerHeight}px`
          }"
        >
          <div :class="ns.e('sidebar-header')">
            <div
              v-for="col in resolvedColumns"
              :key="col.prop"
              :class="ns.e('sidebar-header-cell')"
              :style="{
                width: typeof col.width === 'number' ? `${col.width}px` : col.width
              }"
            >
              {{ col.label }}
            </div>
          </div>
        </div>
        <div ref="sidebarBodyRef" :class="ns.e('sidebar-body')" @scroll="handleBodyScroll">
          <div
            v-if="virtual"
            :style="{
              height: `${virtualState.offsetTop}px`
            }"
          ></div>
          <div
            v-for="(task, index) in renderTasks"
            :key="task.id"
            :class="ns.e('row')"
            :style="{
              height: `${rowHeight}px`
            }"
          >
            <div
              v-for="col in resolvedColumns"
              :key="col.prop"
              :class="ns.e('cell')"
              :style="{
                width: typeof col.width === 'number' ? `${col.width}px` : col.width
              }"
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
        <div
          :class="ns.e('timeline-header')"
          :style="{
            height: `${headerHeight}px`
          }"
        >
          <div
            :class="ns.e('timeline-header-top')"
            :style="{
              height: `${headerHeight / 2}px`,
              width: `${timelineWidth}px`
            }"
          >
            <div
              v-for="(th, i) in topHeaders"
              :key="i"
              :class="ns.e('timeline-unit')"
              :style="{
                width: `${th.width}px`
              }"
            >
              {{ th.label }}
            </div>
          </div>
          <div
            :class="ns.e('timeline-header-bottom')"
            :style="{
              height: `${headerHeight / 2}px`,
              width: `${timelineWidth}px`
            }"
          >
            <div
              v-for="(th, i) in bottomHeaders"
              :key="i"
              :class="[ns.e('timeline-unit'), th.isToday ? ns.em('timeline-unit', 'today') : '']"
              :style="{
                width: `${th.width}px`
              }"
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
            <div
              v-if="virtual"
              :style="{
                height: `${virtualState.offsetTop}px`
              }"
            ></div>
            <div
              :class="ns.e('grid')"
              :style="{
                width: `${timelineWidth}px`,
                height: `${totalHeight}px`
              }"
            >
              <div
                v-for="(th, i) in bottomHeaders"
                :key="i"
                :class="ns.e('grid-column')"
                :style="{
                  width: `${th.width}px`
                }"
              >
              </div>
            </div>
            <div
              v-for="(_, index) in renderTasks"
              :key="index"
              :class="ns.e('timeline-row')"
              :style="{
                height: `${rowHeight}px`,
                width: `${timelineWidth}px`
              }"
            />
            <svg
              v-if="showDependencies"
              :class="ns.e('dependency-svg')"
              :style="{
                width: `${timelineWidth}px`,
                height: `${totalHeight}px`
              }"
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
                  :style="{
                    backgroundColor: ts.task.color || 'var(--yh-color-primary)'
                  }"
                />
                <template v-else>
                  <div
                    v-if="ts.task.progress"
                    :class="ns.e('task-progress')"
                    :style="{
                      width: `${ts.task.progress}%`
                    }"
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

<style>
@charset "UTF-8";
/**
 * YH-UI CSS Variables
 * 全局 CSS 变量定义 - 业内最佳主题系统
 */
:root {
  /* ==================== 密度/紧凑度系统 ==================== */
  --yh-density-factor: 1;
  --yh-component-size-default: 32px;
  --yh-component-size-small: 24px;
  --yh-component-size-large: 40px;
  --yh-padding-default: 12px 16px;
  --yh-padding-small: 8px 12px;
  --yh-padding-large: 16px 20px;
  --yh-spacing-unit: 8px;
  /* ==================== 基础颜色 ==================== */
  --yh-color-white: #ffffff;
  --yh-color-black: #000000;
  /* ==================== 颜色系统 ==================== */
  /* 主色 */
  --yh-color-primary: #409eff;
  --yh-color-primary-light-1: #53a8ff;
  --yh-color-primary-light-2: #66b1ff;
  --yh-color-primary-light-3: #79bbff;
  --yh-color-primary-light-4: #8cc5ff;
  --yh-color-primary-light-5: #a0cfff;
  --yh-color-primary-light-6: #b3d8ff;
  --yh-color-primary-light-7: #c6e2ff;
  --yh-color-primary-light-8: #d9ecff;
  --yh-color-primary-light-9: #ecf5ff;
  --yh-color-primary-dark-2: #337ecc;
  /* 成功色 */
  --yh-color-success: #67c23a;
  --yh-color-success-light-3: #95d475;
  --yh-color-success-light-5: #b3e19d;
  --yh-color-success-light-7: #d1edc4;
  --yh-color-success-light-9: #f0f9eb;
  --yh-color-success-dark-2: #529b2e;
  /* 警告色 */
  --yh-color-warning: #e6a23c;
  --yh-color-warning-light-3: #eebe77;
  --yh-color-warning-light-5: #f3d19e;
  --yh-color-warning-light-7: #f8e3c5;
  --yh-color-warning-light-9: #fdf6ec;
  --yh-color-warning-dark-2: #b88230;
  /* 危险色 */
  --yh-color-danger: #f56c6c;
  --yh-color-danger-light-3: #f89898;
  --yh-color-danger-light-5: #fab6b6;
  --yh-color-danger-light-7: #fcd3d3;
  --yh-color-danger-light-9: #fef0f0;
  --yh-color-danger-dark-2: #c45656;
  /* 信息色 */
  --yh-color-info: #909399;
  --yh-color-info-light-3: #b1b3b8;
  --yh-color-info-light-5: #c8c9cc;
  --yh-color-info-light-7: #dedfe0;
  --yh-color-info-light-9: #f4f4f5;
  --yh-color-info-dark-2: #73767a;
  /* 文字颜色 */
  --yh-text-color-primary: #303133;
  --yh-text-color-regular: #606266;
  --yh-text-color-secondary: #909399;
  --yh-text-color-placeholder: #a8abb2;
  --yh-text-color-disabled: #c0c4cc;
  /* 边框颜色 */
  --yh-border-color: #dcdfe6;
  --yh-border-color-hover: var(--yh-color-primary);
  --yh-border-color-light: #e4e7ed;
  --yh-border-color-lighter: #ebeef5;
  --yh-border-color-extra-light: #f2f6fc;
  --yh-border-color-dark: #d4d7de;
  --yh-border-color-darker: #cdd0d6;
  /* 填充颜色 */
  --yh-fill-color: #f0f2f5;
  --yh-fill-color-light: #f5f7fa;
  --yh-fill-color-lighter: #fafafa;
  --yh-fill-color-extra-light: #fafcff;
  --yh-fill-color-dark: #ebedf0;
  --yh-fill-color-darker: #e6e8eb;
  --yh-fill-color-blank: #ffffff;
  /* 背景颜色 */
  --yh-bg-color: #ffffff;
  --yh-bg-color-page: #f2f3f5;
  --yh-bg-color-overlay: #ffffff;
  /* ==================== 间距系统 ==================== */
  --yh-spacing-none: 0;
  --yh-spacing-xs: 4px;
  --yh-spacing-sm: 8px;
  --yh-spacing-md: 16px;
  --yh-spacing-lg: 24px;
  --yh-spacing-xl: 32px;
  --yh-spacing-xxl: 48px;
  /* ==================== 圆角系统 ==================== */
  --yh-radius-none: 0;
  --yh-radius-sm: 2px;
  --yh-radius-base: 4px;
  --yh-radius-md: 8px;
  --yh-radius-lg: 12px;
  --yh-radius-xl: 16px;
  --yh-radius-round: 20px;
  --yh-radius-circle: 50%;
  /* ==================== 字体系统 ==================== */
  --yh-font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans',
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  /* 字号 */
  --yh-font-size-xs: 12px;
  --yh-font-size-sm: 13px;
  --yh-font-size-base: 14px;
  --yh-font-size-md: 16px;
  --yh-font-size-lg: 18px;
  --yh-font-size-xl: 20px;
  --yh-font-size-xxl: 24px;
  /* 行高 */
  --yh-line-height-none: 1;
  --yh-line-height-tight: 1.25;
  --yh-line-height-snug: 1.375;
  --yh-line-height-normal: 1.5;
  --yh-line-height-relaxed: 1.625;
  --yh-line-height-loose: 2;
  /* 字重 */
  --yh-font-weight-light: 300;
  --yh-font-weight-normal: 400;
  --yh-font-weight-medium: 500;
  --yh-font-weight-semibold: 600;
  --yh-font-weight-bold: 700;
  /* ==================== 阴影系统 ==================== */
  --yh-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --yh-shadow-base: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
  --yh-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  --yh-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
  --yh-shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  /* ==================== 过渡动效 ==================== */
  --yh-duration-fast: 150ms;
  --yh-duration-base: 200ms;
  --yh-duration-slow: 300ms;
  --yh-timing-ease: ease;
  --yh-timing-ease-in: cubic-bezier(0.4, 0, 1, 1);
  --yh-timing-ease-out: cubic-bezier(0, 0, 0.2, 1);
  --yh-timing-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --yh-timing-linear: linear;
  --yh-transition-base: all var(--yh-duration-base) var(--yh-timing-ease-in-out);
  --yh-transition-fast: all var(--yh-duration-fast) var(--yh-timing-ease-in-out);
  --yh-transition-slow: all var(--yh-duration-slow) var(--yh-timing-ease-in-out);
  /* ==================== 层级系统 ==================== */
  --yh-z-index-normal: 1;
  --yh-z-index-top: 1000;
  --yh-z-index-popper: 2000;
  --yh-z-index-overlay: 2001;
  --yh-z-index-modal: 2002;
  --yh-z-index-popover: 2003;
  --yh-z-index-tooltip: 2004;
  --yh-z-index-loading: 2005;
  /* ==================== 组件尺寸 ==================== */
  /* Large */
  --yh-component-size-large: 40px;
  --yh-component-size-large-font: 14px;
  --yh-component-size-large-padding: 20px;
  /* Default */
  --yh-component-size-default: 32px;
  --yh-component-size-default-font: 14px;
  --yh-component-size-default-padding: 16px;
  /* Small */
  --yh-component-size-small: 24px;
  --yh-component-size-small-font: 12px;
  --yh-component-size-small-padding: 12px;
  /* ==================== 组件语义化变量 ==================== */
  --yh-border-radius-base: var(--yh-radius-base);
  --yh-border-radius-small: var(--yh-radius-sm);
  --yh-border-radius-round: var(--yh-radius-round);
  /* Message 消息提示 */
  --yh-message-bg-color: var(--yh-bg-color-overlay);
  --yh-message-border-color: var(--yh-border-color-lighter);
  --yh-message-shadow: var(--yh-shadow-lg);
  --yh-message-text-color: var(--yh-text-color-primary);
  --yh-message-close-color: var(--yh-text-color-secondary);
  --yh-message-close-hover-color: var(--yh-text-color-primary);
  /* Notification 通知 */
  --yh-notification-bg-color: var(--yh-bg-color-overlay);
  --yh-notification-border-color: var(--yh-border-color-lighter);
  --yh-notification-shadow: var(--yh-shadow-lg);
  --yh-notification-title-color: var(--yh-text-color-primary);
  --yh-notification-content-color: var(--yh-text-color-regular);
  /* Badge 徽标 */
  --yh-badge-bg-color: var(--yh-color-danger);
  --yh-badge-text-color: #ffffff;
  --yh-badge-border-color: var(--yh-bg-color);
  /* Card 卡片 */
  --yh-card-bg-color: var(--yh-bg-color-overlay);
  --yh-card-border-color: var(--yh-border-color-lighter);
  --yh-card-shadow: var(--yh-shadow-base);
  --yh-card-header-padding: 18px 20px;
  --yh-card-body-padding: 20px;
  /* Input 输入框 */
  --yh-input-bg-color: var(--yh-fill-color-blank);
  --yh-input-text-color: var(--yh-text-color-regular);
  --yh-input-border-color: var(--yh-border-color);
  --yh-input-hover-border-color: var(--yh-color-primary);
  --yh-input-focus-border-color: var(--yh-color-primary);
  --yh-input-placeholder-color: var(--yh-text-color-placeholder);
  --yh-input-icon-color: var(--yh-text-color-placeholder);
  --yh-input-disabled-bg-color: var(--yh-fill-color-light);
  --yh-input-disabled-text-color: var(--yh-text-color-disabled);
  --yh-input-disabled-border-color: var(--yh-border-color-light);
  /* Image 图片 */
  --yh-image-placeholder-bg-color: var(--yh-fill-color-light);
  --yh-image-placeholder-text-color: var(--yh-text-color-placeholder);
  --yh-image-error-bg-color: var(--yh-fill-color-extra-light);
  --yh-image-error-text-color: var(--yh-text-color-placeholder);
  /* Image Viewer 预览器 */
  --yh-image-viewer-mask-bg-color: rgba(0, 0, 0, 0.5);
  --yh-image-viewer-btn-bg-color: var(--yh-text-color-regular);
  --yh-image-viewer-btn-color: #ffffff;
  --yh-image-viewer-btn-hover-bg-color: var(--yh-color-primary);
  /* Calendar 日历 */
  --yh-calendar-bg: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  --yh-calendar-border-color: rgba(0, 0, 0, 0.06);
  --yh-calendar-border-radius: var(--yh-radius-xl);
  --yh-calendar-header-bg: rgba(255, 255, 255, 0.95);
  --yh-calendar-header-border: rgba(0, 0, 0, 0.04);
  --yh-calendar-header-padding: 18px 22px;
  --yh-calendar-body-padding: 14px 18px 18px;
  /* Calendar 尺寸 */
  --yh-calendar-cell-height: 85px;
  --yh-calendar-cell-height-small: 52px;
  --yh-calendar-cell-height-large: 110px;
  --yh-calendar-cell-radius: 10px;
  --yh-calendar-cell-radius-small: 6px;
  --yh-calendar-cell-radius-large: 12px;
  /* Calendar 颜色 */
  --yh-calendar-primary: var(--yh-color-primary);
  --yh-calendar-primary-light: rgba(59, 130, 246, 0.1);
  --yh-calendar-selected-bg: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  --yh-calendar-selected-border: rgba(59, 130, 246, 0.4);
  --yh-calendar-today-dot: var(--yh-color-primary);
  --yh-calendar-weekend-color: #f97316;
  --yh-calendar-disabled-color: var(--yh-text-color-disabled);
  --yh-calendar-other-month-opacity: 0.35;
  /* Calendar 假日 */
  --yh-calendar-holiday-color: var(--yh-color-success);
  --yh-calendar-holiday-bg: rgba(16, 185, 129, 0.12);
  --yh-calendar-holiday-border: rgba(16, 185, 129, 0.25);
  --yh-calendar-workday-color: var(--yh-color-warning);
  --yh-calendar-workday-bg: rgba(245, 158, 11, 0.12);
  --yh-calendar-workday-border: rgba(245, 158, 11, 0.25);
  /* Calendar 范围选择 */
  --yh-calendar-range-bg: rgba(59, 130, 246, 0.08);
  --yh-calendar-range-border: rgba(59, 130, 246, 0.2);
  /* Calendar 字体 */
  --yh-calendar-weekday-font-size: var(--yh-font-size-sm);
  --yh-calendar-weekday-color: var(--yh-text-color-secondary);
  --yh-calendar-day-font-size: 15px;
  --yh-calendar-day-color: var(--yh-text-color-primary);
  --yh-calendar-badge-font-size: 9px;
  /* Table 表格 */
  --yh-table-border-color: var(--yh-border-color-lighter);
  --yh-table-header-bg: var(--yh-fill-color-light);
  --yh-table-header-text-color: var(--yh-text-color-primary);
  --yh-table-header-font-weight: var(--yh-font-weight-semibold);
  --yh-table-row-bg: var(--yh-bg-color);
  --yh-table-row-hover-bg: var(--yh-fill-color-light);
  --yh-table-row-stripe-bg: var(--yh-fill-color-lighter);
  --yh-table-row-current-bg: var(--yh-color-primary-light-9);
  --yh-table-row-selected-bg: var(--yh-color-primary-light-8);
  --yh-table-row-success-bg: var(--yh-color-success-light-9);
  --yh-table-row-warning-bg: var(--yh-color-warning-light-9);
  --yh-table-text-color: var(--yh-text-color-regular);
  --yh-table-empty-text-color: var(--yh-text-color-secondary);
  --yh-table-font-size: var(--yh-font-size-base);
  --yh-table-cell-padding: 12px 0;
  --yh-table-cell-spacing: 12px;
  --yh-table-fixed-left-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, 0.15);
  --yh-table-fixed-right-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, 0.15);
  /* ==================== 边框基础 ==================== */
  --yh-border-width: 1px;
  --yh-border-style: solid;
  --yh-border: var(--yh-border-width) var(--yh-border-style) var(--yh-border-color);
  /* ==================== 断点系统 ==================== */
  --yh-breakpoint-xs: 0;
  --yh-breakpoint-sm: 576px;
  --yh-breakpoint-md: 768px;
  --yh-breakpoint-lg: 992px;
  --yh-breakpoint-xl: 1200px;
  --yh-breakpoint-xxl: 1400px;
  /* ==================== 字体系统扩展 ==================== */
  --yh-font-family-monospace:
    'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
  --yh-font-family-serif: Georgia, Cambria, 'Times New Roman', Times, serif;
  /* ==================== 无障碍/聚焦系统 ==================== */
  --yh-focus-ring-color: var(--yh-color-primary);
  --yh-focus-ring-width: 2px;
  --yh-focus-ring-offset: 2px;
  --yh-focus-ring-opacity: 0.2;
  --yh-focus-ring:
    0 0 0 var(--yh-focus-ring-offset) var(--yh-bg-color),
    0 0 0 calc(var(--yh-focus-ring-offset) + var(--yh-focus-ring-width)) var(--yh-focus-ring-color);
  /* 高对比度模式支持 */
  --yh-high-contrast-outline: 2px solid transparent;
  --yh-high-contrast-outline-offset: 2px;
  /* ==================== 滚动条样式 ==================== */
  --yh-scrollbar-width: 6px;
  --yh-scrollbar-thumb-color: var(--yh-text-color-disabled);
  --yh-scrollbar-thumb-hover-color: var(--yh-text-color-secondary);
  --yh-scrollbar-track-color: transparent;
  --yh-scrollbar-thumb-radius: 3px;
  /* ==================== 遮罩层 ==================== */
  --yh-mask-color: rgba(0, 0, 0, 0.5);
  --yh-mask-color-light: rgba(0, 0, 0, 0.3);
  --yh-mask-color-extra-light: rgba(0, 0, 0, 0.1);
}

/* ==================== 暗黑模式 ==================== */
html.dark {
  --yh-color-primary: #409eff;
  --yh-color-primary-light-3: #3375b9;
  --yh-color-primary-light-5: #2a598a;
  --yh-color-primary-light-7: #213d5b;
  --yh-color-primary-light-9: #18222c;
  --yh-color-primary-dark-2: #66b1ff;
  --yh-color-success: #67c23a;
  --yh-color-success-light-3: #4e8e2f;
  --yh-color-success-light-5: #3e6b27;
  --yh-color-success-light-7: #2d481f;
  --yh-color-success-light-9: #1d2518;
  --yh-color-warning: #e6a23c;
  --yh-color-warning-light-3: #a77730;
  --yh-color-warning-light-5: #7d5b28;
  --yh-color-warning-light-7: #533f20;
  --yh-color-warning-light-9: #292218;
  --yh-color-danger: #f56c6c;
  --yh-color-danger-light-3: #b25252;
  --yh-color-danger-light-5: #854040;
  --yh-color-danger-light-7: #582e2e;
  --yh-color-danger-light-9: #2b1d1d;
  --yh-color-info: #909399;
  --yh-color-info-light-3: #6b6d71;
  --yh-color-info-light-5: #525457;
  --yh-color-info-light-7: #393b3e;
  --yh-color-info-light-9: #202124;
  --yh-text-color-primary: #e5eaf3;
  --yh-text-color-regular: #cfd3dc;
  --yh-text-color-secondary: #a3a6ad;
  --yh-text-color-placeholder: #8d9095;
  --yh-text-color-disabled: #6c6e72;
  --yh-border-color: #4c4d4f;
  --yh-border-color-light: #414243;
  --yh-border-color-lighter: #363637;
  --yh-border-color-extra-light: #2b2b2c;
  --yh-border-color-dark: #58585b;
  --yh-border-color-darker: #636466;
  --yh-fill-color: #303030;
  --yh-fill-color-light: #262727;
  --yh-fill-color-lighter: #1d1d1d;
  --yh-fill-color-extra-light: #191919;
  --yh-fill-color-dark: #39393a;
  --yh-fill-color-darker: #424243;
  --yh-fill-color-blank: transparent;
  --yh-bg-color: #141414;
  --yh-bg-color-page: #0a0a0a;
  --yh-bg-color-overlay: #1d1e1f;
  /* 组件暗色模式覆盖 */
  --yh-message-bg-color: var(--yh-bg-color-overlay);
  --yh-message-border-color: var(--yh-border-color-lighter);
  --yh-notification-bg-color: var(--yh-bg-color-overlay);
  --yh-notification-border-color: var(--yh-border-color-lighter);
  --yh-badge-border-color: var(--yh-bg-color);
  --yh-card-bg-color: var(--yh-bg-color-overlay);
  --yh-card-border-color: var(--yh-border-color-lighter);
  /* Calendar 暗黑模式 */
  --yh-calendar-bg: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  --yh-calendar-border-color: rgba(255, 255, 255, 0.08);
  --yh-calendar-header-bg: rgba(30, 30, 30, 0.95);
  --yh-calendar-header-border: rgba(255, 255, 255, 0.06);
  --yh-calendar-day-color: var(--yh-text-color-primary);
  --yh-calendar-weekday-color: var(--yh-text-color-secondary);
  --yh-calendar-selected-bg: linear-gradient(
    135deg,
    rgba(59, 130, 246, 0.2) 0%,
    rgba(59, 130, 246, 0.1) 100%
  );
  /* Table 暗黑模式 */
  --yh-table-border-color: var(--yh-border-color-lighter);
  --yh-table-header-bg: var(--yh-fill-color-dark);
  --yh-table-header-text-color: var(--yh-text-color-primary);
  --yh-table-row-bg: var(--yh-bg-color);
  --yh-table-row-hover-bg: var(--yh-fill-color);
  --yh-table-row-stripe-bg: var(--yh-fill-color-light);
  --yh-table-row-current-bg: var(--yh-color-primary-light-9);
  --yh-table-row-selected-bg: var(--yh-color-primary-light-9);
  --yh-table-row-success-bg: var(--yh-color-success-light-9);
  --yh-table-row-warning-bg: var(--yh-color-warning-light-9);
  --yh-table-fixed-left-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, 0.3);
  --yh-table-fixed-right-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, 0.3);
  /* 遮罩层暗黑模式 */
  --yh-mask-color: rgba(0, 0, 0, 0.7);
  --yh-mask-color-light: rgba(0, 0, 0, 0.5);
  --yh-mask-color-extra-light: rgba(0, 0, 0, 0.3);
  /* 滚动条暗黑模式 */
  --yh-scrollbar-thumb-color: var(--yh-fill-color-darker);
  --yh-scrollbar-thumb-hover-color: var(--yh-text-color-placeholder);
}

/* ==================== 减少动画偏好支持 ==================== */
@media (prefers-reduced-motion: reduce) {
  :root,
  html.dark {
    --yh-duration-fast: 0ms;
    --yh-duration-base: 0ms;
    --yh-duration-slow: 0ms;
    --yh-transition-base: none;
    --yh-transition-fast: none;
    --yh-transition-slow: none;
  }
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
/* ==================== 高对比度模式支持 ==================== */
@media (prefers-contrast: high) {
  :root {
    --yh-border-color: #000000;
    --yh-border-color-light: #333333;
    --yh-text-color-primary: #000000;
    --yh-text-color-regular: #1a1a1a;
    --yh-focus-ring-width: 3px;
    --yh-focus-ring-color: #000000;
  }
  html.dark {
    --yh-border-color: #ffffff;
    --yh-border-color-light: #cccccc;
    --yh-text-color-primary: #ffffff;
    --yh-text-color-regular: #e5e5e5;
    --yh-focus-ring-color: #ffffff;
  }
}
/* ==================== 强制颜色模式支持 (Windows 高对比度) ==================== */
@media (forced-colors: active) {
  :root {
    --yh-color-primary: LinkText;
    --yh-border-color: ButtonBorder;
    --yh-bg-color: Canvas;
    --yh-text-color-primary: CanvasText;
    --yh-focus-ring-color: Highlight;
  }
}
.yh-gantt-chart {
  --yh-gantt-border-color: #dcdfe6;
  --yh-gantt-bg-color: #ffffff;
  --yh-gantt-header-bg-color: #f5f7fa;
  --yh-gantt-task-color: #409eff;
  --yh-gantt-text-color: #303133;
  --yh-gantt-row-hover-bg: #f5f7fa;
  --yh-gantt-line-color: #e4e7ed;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: var(--yh-gantt-bg-color);
  color: var(--yh-gantt-text-color);
  border: 1px solid var(--yh-gantt-border-color);
  border-radius: 4px;
  overflow: hidden;
  box-sizing: border-box;
}
.yh-gantt-chart__toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  background: #fff;
  border-bottom: 1px solid var(--yh-gantt-border-color);
  gap: 12px;
  z-index: 100;
}

.yh-gantt-chart__toolbar-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.yh-gantt-chart__main {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.yh-gantt-chart {
  /* Sidebar */
}
.yh-gantt-chart__sidebar {
  width: 480px;
  border-right: 1px solid var(--yh-gantt-border-color);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  z-index: 10;
}

.yh-gantt-chart__sidebar-header-wrapper {
  width: 100%;
  overflow: hidden;
  background: var(--yh-gantt-header-bg-color);
  border-bottom: 1px solid var(--yh-gantt-border-color);
  box-sizing: border-box;
}

.yh-gantt-chart__sidebar-header {
  display: flex;
  white-space: nowrap;
  height: 100%;
}

.yh-gantt-chart__sidebar-header-cell {
  height: 100%;
  padding: 0 12px;
  font-weight: 600;
  font-size: 13px;
  display: flex;
  align-items: center;
  border-right: 1px solid var(--yh-gantt-line-color);
  overflow: hidden;
  flex-shrink: 0;
  box-sizing: border-box;
  color: #606266;
}

.yh-gantt-chart__sidebar-body {
  flex: 1;
  overflow: auto;
}

.yh-gantt-chart__row {
  display: flex;
  border-bottom: 1px solid var(--yh-gantt-line-color);
  width: fit-content;
  min-width: 100%;
}
.yh-gantt-chart__row:hover {
  background: var(--yh-gantt-row-hover-bg);
}

.yh-gantt-chart__cell {
  padding: 0 12px;
  display: flex;
  align-items: center;
  border-right: 1px solid var(--yh-gantt-line-color);
  white-space: nowrap;
  overflow: hidden;
  flex-shrink: 0;
  box-sizing: border-box;
}
.yh-gantt-chart__cell.is-editing {
  padding: 0;
}
.yh-gantt-chart__cell.is-editing .yh-input {
  height: 100%;
  --yh-input-border-color: transparent;
  --yh-input-hover-border-color: transparent;
  --yh-input-focus-border-color: var(--yh-color-primary);
}
.yh-gantt-chart__cell.is-editing .yh-input :deep(.yh-input__wrapper) {
  box-shadow: none !important;
  border-radius: 0;
  padding: 0 12px;
  height: 100%;
  background: transparent;
}

.yh-gantt-chart__cell .yh-input {
  width: 100%;
}

.yh-gantt-chart__cell-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-left: 4px;
  flex: 1;
}

.yh-gantt-chart {
  /* Tree Nodes & Lines */
}
.yh-gantt-chart__tree-node {
  display: inline-flex;
  align-items: center;
  height: 100%;
  position: relative;
}

.yh-gantt-chart__tree-indent {
  display: inline-block;
  width: 16px;
  height: 100%;
  position: relative;
  flex-shrink: 0;
}
.yh-gantt-chart__tree-indent::before {
  content: '';
  position: absolute;
  left: 8px;
  top: 0;
  bottom: 0;
  border-left: 1px dotted #ccc;
}
.yh-gantt-chart__tree-indent.is-last::before {
  bottom: 50%;
}

.yh-gantt-chart__tree-content {
  display: inline-flex;
  align-items: center;
  width: 16px;
  height: 100%;
  position: relative;
}

.yh-gantt-chart__tree-line {
  position: absolute;
  left: 0;
  top: 50%;
  width: 8px;
  border-top: 1px dotted #ccc;
}

.yh-gantt-chart__tree-arrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  cursor: pointer;
  transition: transform 0.2s;
  color: #909399;
  z-index: 5;
}
.yh-gantt-chart__tree-arrow:hover {
  color: var(--yh-color-primary);
}
.yh-gantt-chart__tree-arrow.is-expanded {
  transform: rotate(90deg);
}
.yh-gantt-chart__tree-arrow svg {
  fill: currentColor;
}

.yh-gantt-chart {
  /* Timeline */
}
.yh-gantt-chart__timeline {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}

.yh-gantt-chart__timeline-header {
  display: flex;
  flex-direction: column;
  background: var(--yh-gantt-header-bg-color);
  border-bottom: 1px solid var(--yh-gantt-border-color);
  box-sizing: border-box;
}

.yh-gantt-chart__timeline-header-top {
  display: flex;
  border-bottom: 1px solid var(--yh-gantt-line-color);
  box-sizing: border-box;
}

.yh-gantt-chart__timeline-header-bottom {
  display: flex;
}

.yh-gantt-chart__timeline-unit {
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid var(--yh-gantt-line-color);
  font-size: 11px;
  color: #909399;
  flex-shrink: 0;
  box-sizing: border-box;
  overflow: hidden;
  padding: 0 4px;
}
.yh-gantt-chart__timeline-unit--today {
  color: var(--yh-color-primary);
  font-weight: bold;
}

.yh-gantt-chart__timeline-body {
  flex: 1;
  overflow: auto;
  position: relative;
  background: #fff;
  box-sizing: border-box;
}

.yh-gantt-chart__grid {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
}

.yh-gantt-chart__grid-column {
  height: 100%;
  border-right: 1px solid var(--yh-gantt-line-color);
  box-sizing: border-box;
}

.yh-gantt-chart__timeline-row {
  border-bottom: 1px solid var(--yh-gantt-line-color);
}
.yh-gantt-chart__timeline-row:hover {
  background: var(--yh-gantt-row-hover-bg);
}

.yh-gantt-chart {
  /* Tasks */
}
.yh-gantt-chart__task-wrapper {
  position: absolute;
  background: var(--yh-gantt-task-color);
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding: 0 8px;
  cursor: pointer;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  color: #fff;
  font-size: 12px;
  z-index: 20;
  min-width: 4px;
  box-sizing: border-box;
}
.yh-gantt-chart__task-wrapper.is-milestone {
  background: transparent !important;
  box-shadow: none !important;
  padding: 0;
  overflow: visible;
}

.yh-gantt-chart__task-wrapper.is-summary {
  background: transparent !important;
  box-shadow: none !important;
  padding: 0;
}

.yh-gantt-chart__summary-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 8px;
  background: #5e626d;
  border-radius: 2px;
  pointer-events: none;
}
.yh-gantt-chart__summary-bar::before,
.yh-gantt-chart__summary-bar::after {
  content: '';
  position: absolute;
  top: 0;
  width: 0;
  height: 0;
  border-top: 10px solid #5e626d;
}
.yh-gantt-chart__summary-bar::before {
  left: 0;
  border-right: 8px solid transparent;
}
.yh-gantt-chart__summary-bar::after {
  right: 0;
  border-left: 8px solid transparent;
}

.yh-gantt-chart__milestone-diamond {
  width: 14px;
  height: 14px;
  transform: rotate(45deg);
  border: 2px solid #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.yh-gantt-chart__task-progress {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px 0 0 4px;
}

.yh-gantt-chart__dependency-svg {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 5;
}

.yh-gantt-chart__dependency-path {
  fill: none;
  stroke: var(--yh-color-primary);
  stroke-width: 1.5;
  opacity: 0.6;
}

.yh-gantt-chart__resizer-left {
  position: absolute;
  width: 8px;
  top: 0;
  bottom: 0;
  cursor: ew-resize;
  z-index: 30;
  left: 0;
}

.yh-gantt-chart__resizer-right {
  position: absolute;
  width: 8px;
  top: 0;
  bottom: 0;
  cursor: ew-resize;
  z-index: 30;
  right: 0;
}

.yh-gantt-chart__task-success {
  background: var(--yh-color-success);
}

.yh-gantt-chart__task-warning {
  background: var(--yh-color-warning);
}

.yh-gantt-chart__task-danger {
  background: var(--yh-color-danger);
}

.yh-gantt-chart__task-info {
  background: var(--yh-color-info);
}
</style>
