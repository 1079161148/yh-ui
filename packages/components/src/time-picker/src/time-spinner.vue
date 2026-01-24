<script setup lang="ts">
/**
 * YhTimeSpinner - 时间滚轮组件
 * @description 用于显示时/分/秒滚轮选择器
 */
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import { useNamespace } from '@yh-ui/hooks'
import { generateNumberList } from './time-picker'
import type { TimeState, DisabledTimeConfig } from './time-picker'

defineOptions({
  name: 'YhTimeSpinner'
})

const props = withDefaults(defineProps<{
  /** 当前时间状态 */
  modelValue: TimeState
  /** 是否显示秒 */
  showSeconds?: boolean
  /** 是否使用箭头控制 */
  arrowControl?: boolean
  /** 小时步长 */
  hourStep?: number
  /** 分钟步长 */
  minuteStep?: number
  /** 秒步长 */
  secondStep?: number
  /** 禁用时间配置 */
  disabledTime?: DisabledTimeConfig
  /** 是否使用 12 小时制 */
  use12Hours?: boolean
  /** 自定义小时选项 */
  hourOptions?: number[]
  /** 自定义分钟选项 */
  minuteOptions?: number[]
  /** 自定义秒选项 */
  secondOptions?: number[]
}>(), {
  showSeconds: true,
  arrowControl: false,
  hourStep: 1,
  minuteStep: 1,
  secondStep: 1,
  use12Hours: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: TimeState): void
  (e: 'change', value: TimeState): void
}>()

const ns = useNamespace('time-spinner')

// 滚轮容器引用
const hoursRef = ref<HTMLElement>()
const minutesRef = ref<HTMLElement>()
const secondsRef = ref<HTMLElement>()
const ampmRef = ref<HTMLElement>()

// 每个选项的高度
const ITEM_HEIGHT = 32

// 禁用的时间列表
const disabledHours = computed(() => {
  return props.disabledTime?.disabledHours?.() || []
})

const disabledMinutes = computed(() => {
  return props.disabledTime?.disabledMinutes?.(props.modelValue.hours) || []
})

const disabledSeconds = computed(() => {
  return props.disabledTime?.disabledSeconds?.(props.modelValue.hours, props.modelValue.minutes) || []
})

// 生成选项列表
const hoursList = computed(() => {
  const max = props.use12Hours ? 12 : 23
  const list = generateNumberList(max, props.hourStep, disabledHours.value, props.hourOptions)
  if (props.use12Hours) {
    // 12 小时制：显示 12, 1, 2, ... 11
    return list.map(item => ({
      ...item,
      value: item.value === 0 ? 12 : item.value
    }))
  }
  return list
})

const minutesList = computed(() => {
  return generateNumberList(59, props.minuteStep, disabledMinutes.value, props.minuteOptions)
})

const secondsList = computed(() => {
  return generateNumberList(59, props.secondStep, disabledSeconds.value, props.secondOptions)
})

const ampmList = computed(() => [
  { value: 'AM', label: 'AM', disabled: false },
  { value: 'PM', label: 'PM', disabled: false }
])

// 当前 AM/PM
const currentAmpm = computed(() => props.modelValue.hours >= 12 ? 'PM' : 'AM')

// 格式化显示数字
const formatNumber = (n: number): string => String(n).padStart(2, '0')

// 滚动到指定位置
const scrollToItem = (container: HTMLElement | undefined, index: number, smooth = false) => {
  if (!container) return
  const scrollTop = index * ITEM_HEIGHT
  if (smooth && typeof container.scrollTo === 'function') {
    container.scrollTo({ top: scrollTop, behavior: 'smooth' })
  } else {
    container.scrollTop = scrollTop
  }
}

// 调整滚动位置到最近的选项
const adjustScrollPosition = (container: HTMLElement | undefined) => {
  if (!container) return
  const scrollTop = container.scrollTop
  const index = Math.round(scrollTop / ITEM_HEIGHT)
  scrollToItem(container, index, true)
}

// 处理滚动结束
const handleScrollEnd = (type: 'hours' | 'minutes' | 'seconds' | 'ampm', container: HTMLElement | undefined) => {
  if (!container) return

  const scrollTop = container.scrollTop
  const index = Math.round(scrollTop / ITEM_HEIGHT)

  if (type === 'ampm') {
    const isAM = index === 0
    const newHours = isAM
      ? (props.modelValue.hours >= 12 ? props.modelValue.hours - 12 : props.modelValue.hours)
      : (props.modelValue.hours < 12 ? props.modelValue.hours + 12 : props.modelValue.hours)

    if (newHours !== props.modelValue.hours) {
      const newState = { ...props.modelValue, hours: newHours }
      emit('update:modelValue', newState)
      emit('change', newState)
    }
  } else {
    const list = type === 'hours' ? hoursList.value : type === 'minutes' ? minutesList.value : secondsList.value
    if (index >= 0 && index < list.length) {
      const item = list[index]
      if (item && !item.disabled) {
        let value = item.value

        // 12 小时制转换
        if (type === 'hours' && props.use12Hours) {
          const isPM = props.modelValue.hours >= 12
          value = value === 12 ? (isPM ? 12 : 0) : (isPM ? value + 12 : value)
        }

        if (props.modelValue[type] !== value) {
          const newState = { ...props.modelValue, [type]: value }
          emit('update:modelValue', newState)
          emit('change', newState)
        }
      }
    }
  }
}

// 滚动定时器
let scrollTimer: ReturnType<typeof setTimeout> | null = null

// 处理滚动
const handleScroll = (type: 'hours' | 'minutes' | 'seconds' | 'ampm', event: Event) => {
  const container = event.target as HTMLElement

  if (scrollTimer) {
    clearTimeout(scrollTimer)
  }

  scrollTimer = setTimeout(() => {
    adjustScrollPosition(container)
    handleScrollEnd(type, container)
  }, 100)
}

// 箭头控制
const handleArrowClick = (type: 'hours' | 'minutes' | 'seconds', direction: 'up' | 'down') => {
  const list = type === 'hours' ? hoursList.value : type === 'minutes' ? minutesList.value : secondsList.value
  const currentValue = props.modelValue[type]
  const currentIndex = list.findIndex(item => item.value === currentValue)

  let newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1

  // 循环
  if (newIndex < 0) newIndex = list.length - 1
  if (newIndex >= list.length) newIndex = 0

  // 跳过禁用项
  let attempts = 0
  while (list[newIndex]?.disabled && attempts < list.length) {
    newIndex = direction === 'up' ? newIndex - 1 : newIndex + 1
    if (newIndex < 0) newIndex = list.length - 1
    if (newIndex >= list.length) newIndex = 0
    attempts++
  }

  if (!list[newIndex]?.disabled) {
    let value = list[newIndex].value

    // 12 小时制转换
    if (type === 'hours' && props.use12Hours) {
      const isPM = props.modelValue.hours >= 12
      value = value === 12 ? (isPM ? 12 : 0) : (isPM ? value + 12 : value)
    }

    const newState = { ...props.modelValue, [type]: value }
    emit('update:modelValue', newState)
    emit('change', newState)
  }
}

// 点击选择
const handleItemClick = (type: 'hours' | 'minutes' | 'seconds' | 'ampm', value: number | string, disabled: boolean) => {
  if (disabled) return

  if (type === 'ampm') {
    const isAM = value === 'AM'
    const currentHours = props.modelValue.hours
    let newHours = currentHours

    if (isAM && currentHours >= 12) {
      newHours = currentHours - 12
    } else if (!isAM && currentHours < 12) {
      newHours = currentHours + 12
    }

    if (newHours !== currentHours) {
      const newState = { ...props.modelValue, hours: newHours }
      emit('update:modelValue', newState)
      emit('change', newState)
    }
  } else {
    let numValue = value as number

    // 12 小时制转换
    if (type === 'hours' && props.use12Hours) {
      const isPM = props.modelValue.hours >= 12
      numValue = numValue === 12 ? (isPM ? 12 : 0) : (isPM ? numValue + 12 : numValue)
    }

    if (props.modelValue[type] !== numValue) {
      const newState = { ...props.modelValue, [type]: numValue }
      emit('update:modelValue', newState)
      emit('change', newState)
    }
  }
}

// 获取当前值在列表中的索引
const getCurrentIndex = (type: 'hours' | 'minutes' | 'seconds'): number => {
  const list = type === 'hours' ? hoursList.value : type === 'minutes' ? minutesList.value : secondsList.value
  let value = props.modelValue[type]

  // 12 小时制转换
  if (type === 'hours' && props.use12Hours) {
    value = value % 12 || 12
  }

  return list.findIndex(item => item.value === value)
}

// 滚动到当前选中值
const scrollToCurrentValues = (smooth = false) => {
  nextTick(() => {
    scrollToItem(hoursRef.value, getCurrentIndex('hours'), smooth)
    scrollToItem(minutesRef.value, getCurrentIndex('minutes'), smooth)
    if (props.showSeconds) {
      scrollToItem(secondsRef.value, getCurrentIndex('seconds'), smooth)
    }
    if (props.use12Hours) {
      scrollToItem(ampmRef.value, props.modelValue.hours >= 12 ? 1 : 0, smooth)
    }
  })
}

// 监听值变化，自动滚动
watch(() => props.modelValue, () => {
  scrollToCurrentValues(true)
}, { deep: true })

// 初始化滚动位置
onMounted(() => {
  scrollToCurrentValues(false)
})

// 暴露方法
defineExpose({
  scrollToCurrentValues
})
</script>

<template>
  <div :class="ns.b()">
    <!-- 小时列 -->
    <div :class="ns.e('column')">
      <template v-if="arrowControl">
        <button :class="ns.e('arrow')" type="button" @click="handleArrowClick('hours', 'up')">
          <svg viewBox="0 0 1024 1024" width="1em" height="1em">
            <path fill="currentColor"
              d="M831.872 683.136L512 371.328 192.128 683.136a30.592 30.592 0 0 1-42.752 0 29.12 29.12 0 0 1 0-41.6l340.288-331.712a32 32 0 0 1 44.672 0l340.288 331.776a29.12 29.12 0 0 1 0 41.6 30.592 30.592 0 0 1-42.752 0z" />
          </svg>
        </button>
        <div :class="ns.e('value')">{{ formatNumber(use12Hours ? (modelValue.hours % 12 || 12) : modelValue.hours) }}
        </div>
        <button :class="ns.e('arrow')" type="button" @click="handleArrowClick('hours', 'down')">
          <svg viewBox="0 0 1024 1024" width="1em" height="1em">
            <path fill="currentColor"
              d="M831.872 340.864L512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z" />
          </svg>
        </button>
      </template>
      <template v-else>
        <div ref="hoursRef" :class="ns.e('list')" @scroll="handleScroll('hours', $event)">
          <div :class="ns.e('list-inner')">
            <div v-for="item in hoursList" :key="item.value" :class="[
              ns.e('item'),
              ns.is('selected', use12Hours ? (modelValue.hours % 12 || 12) === item.value : modelValue.hours === item.value),
              ns.is('disabled', item.disabled)
            ]" @click="handleItemClick('hours', item.value, item.disabled)">
              {{ formatNumber(item.value) }}
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- 分隔符 -->
    <div :class="ns.e('separator')">:</div>

    <!-- 分钟列 -->
    <div :class="ns.e('column')">
      <template v-if="arrowControl">
        <button :class="ns.e('arrow')" type="button" @click="handleArrowClick('minutes', 'up')">
          <svg viewBox="0 0 1024 1024" width="1em" height="1em">
            <path fill="currentColor"
              d="M831.872 683.136L512 371.328 192.128 683.136a30.592 30.592 0 0 1-42.752 0 29.12 29.12 0 0 1 0-41.6l340.288-331.712a32 32 0 0 1 44.672 0l340.288 331.776a29.12 29.12 0 0 1 0 41.6 30.592 30.592 0 0 1-42.752 0z" />
          </svg>
        </button>
        <div :class="ns.e('value')">{{ formatNumber(modelValue.minutes) }}</div>
        <button :class="ns.e('arrow')" type="button" @click="handleArrowClick('minutes', 'down')">
          <svg viewBox="0 0 1024 1024" width="1em" height="1em">
            <path fill="currentColor"
              d="M831.872 340.864L512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z" />
          </svg>
        </button>
      </template>
      <template v-else>
        <div ref="minutesRef" :class="ns.e('list')" @scroll="handleScroll('minutes', $event)">
          <div :class="ns.e('list-inner')">
            <div v-for="item in minutesList" :key="item.value" :class="[
              ns.e('item'),
              ns.is('selected', modelValue.minutes === item.value),
              ns.is('disabled', item.disabled)
            ]" @click="handleItemClick('minutes', item.value, item.disabled)">
              {{ formatNumber(item.value) }}
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- 秒分隔符 -->
    <template v-if="showSeconds">
      <div :class="ns.e('separator')">:</div>

      <!-- 秒列 -->
      <div :class="ns.e('column')">
        <template v-if="arrowControl">
          <button :class="ns.e('arrow')" type="button" @click="handleArrowClick('seconds', 'up')">
            <svg viewBox="0 0 1024 1024" width="1em" height="1em">
              <path fill="currentColor"
                d="M831.872 683.136L512 371.328 192.128 683.136a30.592 30.592 0 0 1-42.752 0 29.12 29.12 0 0 1 0-41.6l340.288-331.712a32 32 0 0 1 44.672 0l340.288 331.776a29.12 29.12 0 0 1 0 41.6 30.592 30.592 0 0 1-42.752 0z" />
            </svg>
          </button>
          <div :class="ns.e('value')">{{ formatNumber(modelValue.seconds) }}</div>
          <button :class="ns.e('arrow')" type="button" @click="handleArrowClick('seconds', 'down')">
            <svg viewBox="0 0 1024 1024" width="1em" height="1em">
              <path fill="currentColor"
                d="M831.872 340.864L512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z" />
            </svg>
          </button>
        </template>
        <template v-else>
          <div ref="secondsRef" :class="ns.e('list')" @scroll="handleScroll('seconds', $event)">
            <div :class="ns.e('list-inner')">
              <div v-for="item in secondsList" :key="item.value" :class="[
                ns.e('item'),
                ns.is('selected', modelValue.seconds === item.value),
                ns.is('disabled', item.disabled)
              ]" @click="handleItemClick('seconds', item.value, item.disabled)">
                {{ formatNumber(item.value) }}
              </div>
            </div>
          </div>
        </template>
      </div>
    </template>

    <!-- AM/PM 列 (12小时制) -->
    <template v-if="use12Hours && !arrowControl">
      <div :class="ns.e('column')">
        <div ref="ampmRef" :class="ns.e('list')" @scroll="handleScroll('ampm', $event)">
          <div :class="ns.e('list-inner')">
            <div v-for="item in ampmList" :key="item.value" :class="[
              ns.e('item'),
              ns.is('selected', currentAmpm === item.value),
              ns.is('disabled', item.disabled)
            ]" @click="handleItemClick('ampm', item.value, item.disabled)">
              {{ item.label }}
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss">
// TimePinner styles
$spinner-height: 192px;
$item-height: 32px;

.yh-time-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 0;

  &__column {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 60px; // 固定列宽度，防止抖动
    flex-shrink: 0;
  }

  &__list {
    height: $spinner-height;
    width: 100%; // 填满父容器
    overflow-y: auto;
    scroll-snap-type: y mandatory;

    // 隐藏滚动条
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__list-inner {
    padding: calc(($spinner-height - $item-height) / 2) 0;
  }

  &__item {
    box-sizing: border-box;
    height: $item-height;
    width: 100%; // 固定宽度填满父容器
    line-height: $item-height;
    text-align: center;
    font-size: 14px;
    font-variant-numeric: tabular-nums;
    font-feature-settings: "tnum";
    color: var(--yh-text-color-regular);
    cursor: pointer;
    scroll-snap-align: center;
    border-radius: 4px;
    margin: 0 auto;
    transition: background-color 0.15s ease, color 0.15s ease;

    &:hover:not(.is-disabled):not(.is-selected) {
      background-color: var(--yh-time-picker-hover-bg);
    }

    &.is-selected {
      color: var(--yh-time-picker-active-color);
      background-color: var(--yh-time-picker-active-bg);
    }

    &.is-disabled {
      color: var(--yh-text-color-disabled);
      cursor: not-allowed;
    }
  }

  &__separator {
    color: var(--yh-text-color-secondary);
    font-size: 16px;
    font-weight: 600;
    padding: 0 4px;
  }

  &__arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: none;
    background: transparent;
    cursor: pointer;
    color: var(--yh-text-color-regular);
    border-radius: 4px;
    transition: all 0.2s;

    &:hover {
      background-color: var(--yh-fill-color-light);
      color: var(--yh-color-primary);
    }

    svg {
      width: 14px;
      height: 14px;
    }
  }

  &__value {
    font-size: 20px;
    font-weight: 600;
    color: var(--yh-text-color-primary);
    line-height: 40px;
    min-width: 40px;
    text-align: center;
  }
}
</style>
