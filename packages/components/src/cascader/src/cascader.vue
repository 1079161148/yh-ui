<script setup lang="ts">
/**
 * YhCascader - 级联选择器组件
 * @description 从层级数据中选择一个或多个值
 */
import { computed, ref, watch, nextTick, provide, onMounted, onBeforeUnmount } from 'vue'
import { useNamespace, useFormItem, useId } from '@yh-ui/hooks'
import type { CascaderProps, CascaderEmits, CascaderExpose, CascaderOption, CascaderContext } from './cascader'
import { CascaderContextKey, defaultCascaderConfig } from './cascader'
import CascaderPanel from './cascader-panel.vue'

defineOptions({
  name: 'YhCascader'
})

const props = withDefaults(defineProps<CascaderProps>(), {
  disabled: false,
  clearable: false,
  size: undefined,
  filterable: false,
  separator: ' / ',
  showAllLevels: true,
  collapseTags: false,
  collapseTagsTooltip: false,
  maxCollapseTags: 1,
  teleported: true,
  tagType: '',
  validateEvent: true,
  multiple: false,
  checkStrictly: false,
  expandTrigger: undefined,
  emitPath: true,
  virtual: false,
  virtualItemHeight: 34
})

const emit = defineEmits<CascaderEmits>()
const ns = useNamespace('cascader')
const inputId = useId()

// 表单集成
const { form, formItem, validate: triggerValidate } = useFormItem()
const cascaderSize = computed(() => props.size || formItem?.size || form?.size || 'default')

// 合并配置 - 直接属性优先于 props 配置
const config = computed(() => ({
  ...defaultCascaderConfig,
  ...props.props,
  // 直接属性覆盖
  multiple: props.multiple || props.props?.multiple || false,
  checkStrictly: props.checkStrictly || props.props?.checkStrictly || false,
  expandTrigger: props.expandTrigger || props.props?.expandTrigger || 'click',
  emitPath: props.emitPath ?? props.props?.emitPath ?? true
}))

// 元素引用
const wrapperRef = ref<HTMLElement>()
const inputRef = ref<HTMLInputElement>()
const dropdownRef = ref<HTMLElement>()

// 内部状态
const visible = ref(false)
const focused = ref(false)
const hovering = ref(false)
const query = ref('')
const expandedPath = ref<(string | number)[]>([])
const isClickingDropdown = ref(false)

// 下拉框位置
const dropdownStyle = ref<Record<string, string>>({})

// 更新下拉框位置
const updateDropdownPosition = () => {
  if (!wrapperRef.value || !props.teleported) return

  const rect = wrapperRef.value.getBoundingClientRect()
  dropdownStyle.value = {
    position: 'fixed',
    top: `${rect.bottom + 4}px`,
    left: `${rect.left}px`,
    minWidth: `${rect.width}px`
  }
}

// 监听 visible 变化更新位置
watch(visible, (val) => {
  if (val && props.teleported) {
    nextTick(updateDropdownPosition)
  }
})

// 监听窗口滚动和调整大小
onMounted(() => {
  if (props.teleported) {
    window.addEventListener('scroll', updateDropdownPosition, true)
    window.addEventListener('resize', updateDropdownPosition)
  }
})

onBeforeUnmount(() => {
  if (props.teleported) {
    window.removeEventListener('scroll', updateDropdownPosition, true)
    window.removeEventListener('resize', updateDropdownPosition)
  }
})

// 是否多选
const isMultiple = computed(() => config.value.multiple)

// 获取节点路径的标签
const getPathLabels = (path: (string | number)[]): string[] => {
  const labels: string[] = []
  let currentOptions = props.options || []

  for (const value of path) {
    const option = currentOptions.find(o => o[config.value.value] === value)
    if (option) {
      labels.push(option[config.value.label])
      currentOptions = option[config.value.children] || []
    }
  }

  return labels
}

// 根据值查找完整路径
const findPathByValue = (targetValue: string | number, options: CascaderOption[]): (string | number)[] | null => {
  for (const option of options) {
    const val = option[config.value.value]
    const children = option[config.value.children]
    if (val === targetValue) return [val]
    if (children && children.length > 0) {
      const path = findPathByValue(targetValue, children)
      if (path) return [val, ...path]
    }
  }
  return null
}

// 显示文本
const presentText = computed(() => {
  if (isMultiple.value) return ''

  const value = props.modelValue
  if (value === undefined || value === null) return ''

  let path: (string | number)[] = []
  if (Array.isArray(value)) {
    path = value as (string | number)[]
  } else {
    // 非路径模式，查找到完整路径
    path = findPathByValue(value as string | number, props.options || []) || []
  }

  if (path.length === 0) return ''

  const labels = getPathLabels(path)
  return props.showAllLevels ? labels.join(props.separator) : labels[labels.length - 1]
})

// 多选标签
const presentTags = computed(() => {
  if (!isMultiple.value) return []

  const values = props.modelValue
  if (!Array.isArray(values) || values.length === 0) return []

  return (values as any[]).map(v => {
    let path: (string | number)[] = []
    if (Array.isArray(v)) {
      path = v as (string | number)[]
    } else {
      path = findPathByValue(v as string | number, props.options || []) || []
    }
    const labels = getPathLabels(path)
    return {
      path,
      text: props.showAllLevels ? labels.join(props.separator) : labels[labels.length - 1]
    }
  })
})

// 显示的标签（折叠）
const displayTags = computed(() => {
  if (props.collapseTags) {
    return presentTags.value.slice(0, props.maxCollapseTags)
  }
  return presentTags.value
})

// 折叠的标签数量
const collapsedCount = computed(() => {
  if (!props.collapseTags) return 0
  return Math.max(0, presentTags.value.length - props.maxCollapseTags)
})

// 是否显示清空按钮
const showClear = computed(() => {
  if (!props.clearable || props.disabled || !hovering.value) return false

  if (isMultiple.value) {
    return Array.isArray(props.modelValue) && props.modelValue.length > 0
  } else {
    return props.modelValue !== undefined && props.modelValue !== null &&
      (Array.isArray(props.modelValue) ? props.modelValue.length > 0 : true)
  }
})

// 是否有值
const hasValue = computed(() => {
  if (isMultiple.value) {
    return Array.isArray(props.modelValue) && props.modelValue.length > 0
  }
  return props.modelValue !== undefined && props.modelValue !== null &&
    (Array.isArray(props.modelValue) ? props.modelValue.length > 0 : true)
})

// 过滤后的选项
const filteredSuggestions = computed(() => {
  if (!props.filterable || !query.value) return []

  const results: { path: (string | number)[]; labels: string[] }[] = []
  const keyword = query.value.toLowerCase()

  const traverse = (options: CascaderOption[], path: (string | number)[], labels: string[]) => {
    for (const option of options) {
      const value = option[config.value.value]
      const label = String(option[config.value.label] || '')
      const children = option[config.value.children]
      const currentPath = [...path, value]
      const currentLabels = [...labels, label]

      // 搜索项判断：匹配完整路径中的任何一段名称
      const fullPathLabel = currentLabels.join(props.separator).toLowerCase()
      const matches = props.filterMethod
        ? props.filterMethod(option, query.value)
        : fullPathLabel.includes(keyword)

      // 只有可以选中的节点（叶子节点或任意一级开启）才加入建议列表
      const isLeafNode = !children || children.length === 0
      if (matches && (isLeafNode || config.value.checkStrictly)) {
        results.push({ path: currentPath, labels: currentLabels })
      }

      if (children && children.length > 0) {
        traverse(children, currentPath, currentLabels)
      }
    }
  }

  traverse(props.options || [], [], [])
  return results
})

// 类名
const wrapperClasses = computed(() => [
  ns.b(),
  ns.m(cascaderSize.value),
  ns.is('disabled', props.disabled),
  ns.is('focused', focused.value || visible.value)
])

// 展开节点
const handleExpand = (option: CascaderOption, level: number) => {
  const value = option[config.value.value]
  expandedPath.value = [...expandedPath.value.slice(0, level), value]
  emit('expand-change', expandedPath.value)
}

// 选中节点
const handleCheck = (option: CascaderOption, path: (string | number)[]) => {
  if (option[config.value.disabled]) return

  if (isMultiple.value) {
    const values = (props.modelValue as (string | number)[][] || []).slice()
    const pathStr = path.join(',')
    const index = values.findIndex(v => v.join(',') === pathStr)

    if (index > -1) {
      values.splice(index, 1)
    } else {
      values.push(path)
    }

    emit('update:modelValue', values)
    emit('change', values)
  } else {
    const value = config.value.emitPath ? path : path[path.length - 1]
    emit('update:modelValue', value)
    emit('change', value)
    visible.value = false
  }

  if (props.validateEvent) {
    triggerValidate('change')
  }

  query.value = ''
}

// 判断是否选中
const isChecked = (path: (string | number)[]) => {
  if (isMultiple.value) {
    const values = props.modelValue as (string | number)[][] | undefined
    if (!values || !Array.isArray(values)) return false
    const pathStr = path.join(',')
    return values.some(v => Array.isArray(v) && v.join(',') === pathStr)
  }

  const value = props.modelValue
  if (value === undefined || value === null) return false

  if (config.value.emitPath) {
    if (!Array.isArray(value)) return false
    return value.join(',') === path.join(',')
  } else {
    // 非路径模式下，比较末尾值
    return value === path[path.length - 1]
  }
}

// 移除标签
const handleRemoveTag = (path: (string | number)[], event: Event) => {
  event.stopPropagation()
  if (props.disabled) return

  const values = (props.modelValue as (string | number)[][] || []).slice()
  const pathStr = path.join(',')
  const index = values.findIndex(v => v.join(',') === pathStr)

  if (index > -1) {
    values.splice(index, 1)
    emit('update:modelValue', values)
    emit('change', values)
    if (props.validateEvent) {
      triggerValidate('change')
    }
  }
}

// 清空
const handleClear = (event: Event) => {
  event.stopPropagation()
  const value = isMultiple.value ? [] : []
  emit('update:modelValue', value)
  emit('change', value)
  emit('clear')
  query.value = ''
  expandedPath.value = []
  if (props.validateEvent) {
    triggerValidate('change')
  }
}

// 切换下拉框
const toggleDropdown = () => {
  if (props.disabled) return
  visible.value = !visible.value
  emit('visible-change', visible.value)
  if (visible.value) {
    nextTick(() => {
      if (props.filterable) {
        inputRef.value?.focus()
      }
    })
  }
}

// 选择过滤建议
const handleSelectSuggestion = (suggestion: { path: (string | number)[]; labels: string[] }) => {
  if (isMultiple.value) {
    const values = (props.modelValue as (string | number)[][] || []).slice()
    const pathStr = suggestion.path.join(',')
    const index = values.findIndex(v => v.join(',') === pathStr)

    if (index === -1) {
      values.push(suggestion.path)
      emit('update:modelValue', values)
      emit('change', values)
    }
  } else {
    const value = config.value.emitPath ? suggestion.path : suggestion.path[suggestion.path.length - 1]
    emit('update:modelValue', value)
    emit('change', value)
    visible.value = false
  }

  query.value = ''
  if (props.validateEvent) {
    triggerValidate('change')
  }
}

// 输入处理
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  query.value = target.value
  // 输入时确保下拉框打开
  if (!visible.value && query.value) {
    visible.value = true
    emit('visible-change', true)
  }
}

// 焦点处理
const handleFocus = (event: FocusEvent) => {
  focused.value = true
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  // 如果正在点击下拉框，不处理 blur
  if (isClickingDropdown.value) {
    return
  }

  focused.value = false
  visible.value = false
  emit('blur', event)
  emit('visible-change', false)
  if (props.validateEvent) {
    triggerValidate('blur')
  }
}

// 下拉框 mousedown 处理
const handleDropdownMousedown = (event: MouseEvent) => {
  event.preventDefault()
  isClickingDropdown.value = true
}

// 下拉框 mouseup 处理
const handleDropdownMouseup = () => {
  setTimeout(() => {
    isClickingDropdown.value = false
  }, 0)
}

const handleMouseEnter = () => {
  hovering.value = true
}

const handleMouseLeave = () => {
  hovering.value = false
}

// 获取选中节点
const getCheckedNodes = (leafOnly = false): CascaderOption[] => {
  const nodes: CascaderOption[] = []

  const findNode = (options: CascaderOption[], path: (string | number)[], index: number): CascaderOption | null => {
    if (index >= path.length) return null
    const option = options.find(o => o[config.value.value] === path[index])
    if (!option) return null
    if (index === path.length - 1) return option
    return findNode(option[config.value.children] || [], path, index + 1)
  }

  if (isMultiple.value) {
    const values = props.modelValue as (string | number)[][] | undefined
    if (values) {
      for (const path of values) {
        const node = findNode(props.options || [], path, 0)
        if (node && (!leafOnly || !node[config.value.children]?.length)) {
          nodes.push(node)
        }
      }
    }
  } else {
    const value = props.modelValue as (string | number)[] | undefined
    if (value) {
      const node = findNode(props.options || [], value, 0)
      if (node && (!leafOnly || !node[config.value.children]?.length)) {
        nodes.push(node)
      }
    }
  }

  return nodes
}

// 暴露方法
const focus = () => {
  inputRef.value?.focus()
}

const blur = () => {
  inputRef.value?.blur()
}

// 提供上下文 - 保持响应式
provide<CascaderContext>(CascaderContextKey, {
  props,
  config: computed(() => config.value),
  expandedPath: computed(() => expandedPath.value),
  checkedValue: computed(() => props.modelValue),
  handleExpand,
  handleCheck,
  isChecked
})

defineExpose<CascaderExpose>({
  focus,
  blur,
  getCheckedNodes,
  inputRef: inputRef.value
})
</script>

<template>
  <div ref="wrapperRef" :class="wrapperClasses" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave"
    @click="toggleDropdown">
    <!-- 输入区域 -->
    <div :class="ns.e('wrapper')">
      <!-- 多选标签 -->
      <template v-if="isMultiple">
        <span v-for="tag in displayTags" :key="tag.path.join(',')"
          :class="[ns.e('tag'), tagType ? `yh-tag--${tagType}` : '']">
          <span :class="ns.e('tag-text')">{{ tag.text }}</span>
          <span :class="ns.e('tag-close')" @click="handleRemoveTag(tag.path, $event)">
            <svg viewBox="0 0 1024 1024" width="1em" height="1em">
              <path fill="currentColor"
                d="M764.288 214.592L512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z" />
            </svg>
          </span>
        </span>
        <span v-if="collapsedCount > 0" :class="ns.e('tag')">
          +{{ collapsedCount }}
        </span>
      </template>

      <!-- 输入框 -->
      <input ref="inputRef" :id="inputId" :class="ns.e('inner')" :value="filterable ? query : ''"
        :placeholder="hasValue ? '' : placeholder" :disabled="disabled" :readonly="!filterable" autocomplete="off"
        role="combobox" :aria-expanded="visible" @input="handleInput" @focus="handleFocus" @blur="handleBlur" />

      <!-- 单选显示值 -->
      <span v-if="!isMultiple && hasValue && !query" :class="ns.e('selected-value')">
        {{ presentText }}
      </span>

      <!-- 后缀图标 -->
      <span :class="ns.e('suffix')">
        <!-- 清空按钮 -->
        <span v-if="showClear" :class="[ns.e('icon'), ns.e('clear')]" @click.stop="handleClear">
          <svg viewBox="0 0 1024 1024" width="1em" height="1em">
            <path fill="currentColor"
              d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336L512 457.664z" />
          </svg>
        </span>

        <!-- 箭头图标 -->
        <span :class="[ns.e('icon'), ns.e('arrow'), { 'is-reverse': visible }]">
          <svg viewBox="0 0 1024 1024" width="1em" height="1em">
            <path fill="currentColor"
              d="M831.872 340.864L512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z" />
          </svg>
        </span>
      </span>
    </div>

    <!-- 下拉框 -->
    <Teleport to="body" :disabled="!teleported">
      <Transition :name="ns.b('dropdown')">
        <div v-show="visible" ref="dropdownRef" :class="[ns.e('dropdown'), popperClass]"
          :style="teleported ? dropdownStyle : {}" @mousedown="handleDropdownMousedown"
          @mouseup="handleDropdownMouseup">
          <!-- 过滤建议 -->
          <div v-if="filterable && query && filteredSuggestions.length > 0" :class="ns.e('suggestions')">
            <div v-for="suggestion in filteredSuggestions" :key="suggestion.path.join(',')"
              :class="[ns.e('suggestion'), ns.is('checked', isChecked(suggestion.path))]"
              @click.stop="handleSelectSuggestion(suggestion)">
              {{ suggestion.labels.join(separator) }}
            </div>
          </div>

          <!-- 无匹配数据 -->
          <div v-else-if="filterable && query && filteredSuggestions.length === 0" :class="ns.e('empty')">
            <slot name="empty">无匹配数据</slot>
          </div>

          <!-- 级联面板 -->
          <CascaderPanel v-else :options="options" :expanded-path="expandedPath" :config="config"
            :is-multiple="isMultiple" :virtual="virtual" :item-height="virtualItemHeight" @expand="handleExpand"
            @check="handleCheck" :is-checked="isChecked">
            <template #default="{ node, data }">
              <slot :node="node" :data="data"></slot>
            </template>
          </CascaderPanel>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style lang="scss">
@use './cascader.scss';
</style>
