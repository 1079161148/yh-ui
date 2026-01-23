<script setup lang="ts">
/**
 * YhTransfer - 穿梭框组件
 * @description 双栏穿梭选择框，严谨类型化，已修复 BEM 类名导致布局坍塌的问题
 */
import { computed, ref, watch } from 'vue'
import { useNamespace } from '@yh-ui/hooks'
import { useConfig } from '../../hooks/use-config'
import TransferPanel from './transfer-panel.vue'
import type {
  TransferProps,
  TransferEmits,
  TransferExpose,
  TransferData,
  TransferKey,
  TransferPanelExpose
} from './transfer'

defineOptions({
  name: 'YhTransfer'
})

const props = withDefaults(defineProps<TransferProps>(), {
  modelValue: () => [],
  data: () => [],
  filterable: false,
  filterPlaceholder: '请输入关键词',
  targetOrder: 'original',
  titles: () => ['列表 1', '列表 2'],
  buttonTexts: () => [],
  leftDefaultChecked: () => [],
  rightDefaultChecked: () => [],
  disabled: false,
  size: 'default',
  validateEvent: true,
  virtual: false,
  itemHeight: 40,
  height: 280,
  showAllCheckbox: true,
  emptyText: '暂无数据'
})

const emit = defineEmits<TransferEmits>()
const ns = useNamespace('transfer')
const { globalSize } = useConfig()

// 面板引用
const leftPanelRef = ref<TransferPanelExpose>()
const rightPanelRef = ref<TransferPanelExpose>()

// 左右选中状态
const leftChecked = ref<TransferKey[]>([...props.leftDefaultChecked])
const rightChecked = ref<TransferKey[]>([...props.rightDefaultChecked])

// 获取字段别名
const keyProp = computed(() => props.props?.key || 'key')

// 获取数据项的 key
const getKey = (item: TransferData): TransferKey => {
  return (item[keyProp.value] as TransferKey) ?? ''
}

// 右侧数据（已选中的值）
const targetKeys = computed(() => new Set(props.modelValue))

// 左侧数据（未选中的值）
const leftData = computed<TransferData[]>(() => {
  return props.data.filter(item => !targetKeys.value.has(getKey(item)))
})

// 右侧数据
const rightData = computed<TransferData[]>(() => {
  if (props.targetOrder === 'original') {
    return props.data.filter(item => targetKeys.value.has(getKey(item)))
  }
  const dataMap = new Map(props.data.map(item => [getKey(item), item]))
  return (props.modelValue ?? [])
    .map(key => dataMap.get(key))
    .filter((item): item is TransferData => item !== undefined)
})

const leftTitle = computed(() => props.leftTitle || props.titles[0] || '列表 1')
const rightTitle = computed(() => props.rightTitle || props.titles[1] || '列表 2')
const leftEmptyText = computed(() => props.leftEmptyText || props.emptyText || '暂无数据')
const rightEmptyText = computed(() => props.rightEmptyText || props.emptyText || '暂无数据')

const canMoveToRight = computed(() => leftChecked.value.length > 0)
const canMoveToLeft = computed(() => rightChecked.value.length > 0)

const containerClasses = computed(() => [
  ns.b(),
  ns.m(props.size || globalSize.value || 'default'),
  ns.is('disabled', props.disabled)
])

// 向右移动
const moveToRight = () => {
  if (!canMoveToRight.value || props.disabled) return

  const movedKeys = [...leftChecked.value]
  let newValue: TransferKey[]

  if (props.targetOrder === 'unshift') {
    newValue = [...movedKeys, ...(props.modelValue ?? [])]
  } else {
    newValue = [...(props.modelValue ?? []), ...movedKeys]
  }

  if (props.targetOrder === 'original') {
    const keySet = new Set(newValue)
    newValue = props.data
      .filter(item => keySet.has(getKey(item)))
      .map(item => getKey(item))
  }

  emit('update:modelValue', newValue)
  emit('change', newValue, 'right', movedKeys)
  leftChecked.value = []
}

// 向左移动
const moveToLeft = () => {
  if (!canMoveToLeft.value || props.disabled) return

  const movedKeys = [...rightChecked.value]
  const movedKeysSet = new Set(movedKeys)
  const newValue = (props.modelValue ?? []).filter(key => !movedKeysSet.has(key))

  emit('update:modelValue', newValue)
  emit('change', newValue, 'left', movedKeys)
  rightChecked.value = []
}

const handleLeftCheckedChange = (value: TransferKey[], movedKeys?: TransferKey[]) => {
  leftChecked.value = value
  emit('left-check-change', value, movedKeys)
}

const handleRightCheckedChange = (value: TransferKey[], movedKeys?: TransferKey[]) => {
  rightChecked.value = value
  emit('right-check-change', value, movedKeys)
}

const clearLeftChecked = () => { leftChecked.value = [] }
const clearRightChecked = () => { rightChecked.value = [] }

// 监听 modelValue 变化
watch(
  () => props.modelValue,
  () => {
    const leftDataKeys = new Set(leftData.value.map(item => getKey(item)))
    leftChecked.value = leftChecked.value.filter(key => leftDataKeys.has(key))

    const rightDataKeys = new Set(rightData.value.map(item => getKey(item)))
    rightChecked.value = rightChecked.value.filter(key => rightDataKeys.has(key))
  },
  { deep: true }
)

defineExpose<TransferExpose>({
  clearLeftChecked,
  clearRightChecked,
  leftPanel: leftPanelRef.value,
  rightPanel: rightPanelRef.value
})
</script>

<template>
  <div :class="containerClasses">
    <TransferPanel ref="leftPanelRef" :data="leftData" :checked="leftChecked" :title="leftTitle"
      :filterable="filterable" :filter-placeholder="filterPlaceholder" :filter-method="filterMethod"
      :disabled="disabled" :size="size" :props="props.props" :render-content="renderContent" :virtual="virtual"
      :item-height="itemHeight" :height="height" :show-all-checkbox="showAllCheckbox" :empty-text="leftEmptyText"
      @update:checked="handleLeftCheckedChange" @checked-change="handleLeftCheckedChange">
      <template v-if="$slots['left-header']" #header>
        <slot name="left-header" />
      </template>
      <template v-if="$slots.default" #default="{ option }">
        <slot :option="option" />
      </template>
      <template v-if="$slots['left-empty']" #empty>
        <slot name="left-empty" />
      </template>
      <template v-if="$slots['left-footer']" #footer>
        <slot name="left-footer" />
      </template>
    </TransferPanel>

    <div :class="ns.e('buttons')">
      <slot name="buttons" :move-to-left="moveToLeft" :move-to-right="moveToRight" :left-checked="leftChecked"
        :right-checked="rightChecked">
        <button type="button" :class="[ns.e('button'), { 'is-disabled': !canMoveToRight || disabled }]"
          :disabled="!canMoveToRight || disabled" @click="moveToRight">
          <svg :class="ns.e('button__icon')" viewBox="0 0 1024 1024">
            <path fill="currentColor"
              d="M340.864 149.312a30.592 30.592 0 000 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0042.752 43.458l355.136-362.88a30.592 30.592 0 000-43.52L383.616 106.56a30.592 30.592 0 00-42.752 42.752z" />
          </svg>
          <span v-if="buttonTexts && buttonTexts[0]" :class="ns.e('button__text')">{{ buttonTexts[0] }}</span>
        </button>

        <button type="button" :class="[ns.e('button'), { 'is-disabled': !canMoveToLeft || disabled }]"
          :disabled="!canMoveToLeft || disabled" @click="moveToLeft">
          <svg :class="ns.e('button__icon')" viewBox="0 0 1024 1024">
            <path fill="currentColor"
              d="M685.248 104.256a30.592 30.592 0 010 42.752L373.376 512l311.872 364.992a30.592 30.592 0 11-42.752 43.458L287.38 555.52a30.592 30.592 0 010-43.52l355.136-364.93a30.592 30.592 0 0142.752 0z" />
          </svg>
          <span v-if="buttonTexts && buttonTexts[1]" :class="ns.e('button__text')">{{ buttonTexts[1] }}</span>
        </button>
      </slot>
    </div>

    <TransferPanel ref="rightPanelRef" :data="rightData" :checked="rightChecked" :title="rightTitle"
      :filterable="filterable" :filter-placeholder="filterPlaceholder" :filter-method="filterMethod"
      :disabled="disabled" :size="size" :props="props.props" :render-content="renderContent" :virtual="virtual"
      :item-height="itemHeight" :height="height" :show-all-checkbox="showAllCheckbox" :empty-text="rightEmptyText"
      @update:checked="handleRightCheckedChange" @checked-change="handleRightCheckedChange">
      <template v-if="$slots['right-header']" #header>
        <slot name="right-header" />
      </template>
      <template v-if="$slots.default" #default="{ option }">
        <slot :option="option" />
      </template>
      <template v-if="$slots['right-empty']" #empty>
        <slot name="right-empty" />
      </template>
      <template v-if="$slots['right-footer']" #footer>
        <slot name="right-footer" />
      </template>
    </TransferPanel>
  </div>
</template>
