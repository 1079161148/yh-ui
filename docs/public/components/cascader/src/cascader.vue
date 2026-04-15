<script setup>
import { computed, ref, watch, nextTick, provide, onMounted, onBeforeUnmount } from 'vue'
import { useNamespace, useFormItem, useId, useLocale } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'
import { useConfig } from '@yh-ui/hooks'
import { CascaderContextKey, defaultCascaderConfig } from './cascader'
import CascaderPanel from './cascader-panel.vue'
defineOptions({
  name: 'YhCascader'
})
const props = defineProps({
  modelValue: { type: [String, Number, Array], required: false },
  options: { type: Array, required: false },
  placeholder: { type: String, required: false },
  disabled: { type: Boolean, required: false, default: false },
  clearable: { type: Boolean, required: false, default: false },
  size: { type: String, required: false, default: void 0 },
  filterable: { type: Boolean, required: false, default: false },
  filterMethod: { type: Function, required: false },
  separator: { type: String, required: false, default: ' / ' },
  showAllLevels: { type: Boolean, required: false, default: true },
  collapseTags: { type: Boolean, required: false, default: false },
  collapseTagsTooltip: { type: Boolean, required: false, default: false },
  maxCollapseTags: { type: Number, required: false, default: 1 },
  multiple: { type: Boolean, required: false, default: false },
  checkStrictly: { type: Boolean, required: false, default: false },
  expandTrigger: { type: String, required: false, default: void 0 },
  emitPath: { type: Boolean, required: false, default: true },
  virtual: { type: Boolean, required: false, default: false },
  virtualItemHeight: { type: Number, required: false, default: 34 },
  props: { type: Object, required: false },
  popperClass: { type: String, required: false },
  teleported: { type: Boolean, required: false, default: true },
  tagType: { type: String, required: false, default: '' },
  validateEvent: { type: Boolean, required: false, default: true },
  themeOverrides: { type: null, required: false }
})
const emit = defineEmits([
  'update:modelValue',
  'change',
  'focus',
  'blur',
  'clear',
  'expand-change',
  'visible-change'
])
const ns = useNamespace('cascader')
const { t } = useLocale()
const inputId = useId()
const { themeStyle } = useComponentTheme(
  'cascader',
  computed(() => props.themeOverrides)
)
const { form, formItem, validate: triggerValidate } = useFormItem()
const { globalSize } = useConfig()
const cascaderSize = computed(
  () => props.size || formItem?.size || form?.size || globalSize.value || 'default'
)
const config = computed(() => ({
  ...defaultCascaderConfig,
  ...props.props,
  // 直接属性覆盖
  multiple: props.multiple || props.props?.multiple || false,
  checkStrictly: props.checkStrictly || props.props?.checkStrictly || false,
  expandTrigger: props.expandTrigger || props.props?.expandTrigger || 'click',
  emitPath: props.emitPath ?? props.props?.emitPath ?? true
}))
const wrapperRef = ref()
const inputRef = ref()
const dropdownRef = ref()
const visible = ref(false)
const focused = ref(false)
const hovering = ref(false)
const query = ref('')
const expandedPath = ref([])
const isClickingDropdown = ref(false)
const dropdownStyle = ref({})
const updateDropdownPosition = () => {
  if (!wrapperRef.value || !props.teleported) return
  const rect = wrapperRef.value.getBoundingClientRect()
  const styles = window.getComputedStyle(wrapperRef.value)
  const primary = styles.getPropertyValue('--yh-color-primary').trim()
  const primaryRgb = styles.getPropertyValue('--yh-color-primary-rgb').trim()
  const primaryLight9 = styles.getPropertyValue('--yh-color-primary-light-9').trim()
  dropdownStyle.value = {
    position: 'fixed',
    top: `${rect.bottom + 4}px`,
    left: `${rect.left}px`,
    minWidth: `${rect.width}px`,
    zIndex: '2000',
    '--yh-color-primary': primary,
    '--yh-color-primary-rgb': primaryRgb,
    '--yh-color-primary-light-9': primaryLight9
  }
}
watch(visible, (val) => {
  if (val && props.teleported) {
    nextTick(updateDropdownPosition)
  }
})
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
const isMultiple = computed(() => config.value.multiple)
const getPathLabels = (path) => {
  const labels = []
  let currentOptions = props.options || []
  for (const value of path) {
    const valKey = config.value.value
    const labelKey = config.value.label
    const childrenKey = config.value.children
    const option = currentOptions.find((o) => o[valKey] === value)
    if (option) {
      labels.push(String(option[labelKey] || ''))
      currentOptions = option[childrenKey] || []
    }
  }
  return labels
}
const findPathByValue = (targetValue, options) => {
  const valKey = config.value.value
  const childrenKey = config.value.children
  for (const option of options) {
    const val = option[valKey]
    const children = option[childrenKey]
    if (val === targetValue) return [val]
    if (children && children.length > 0) {
      const path = findPathByValue(targetValue, children)
      if (path) return [val, ...path]
    }
  }
  return null
}
const presentText = computed(() => {
  if (isMultiple.value) return ''
  const value = props.modelValue
  if (value === void 0 || value === null) return ''
  let path = []
  if (Array.isArray(value)) {
    path = value
  } else {
    path = findPathByValue(value, props.options || []) || []
  }
  if (path.length === 0) return ''
  const labels = getPathLabels(path)
  return props.showAllLevels ? labels.join(props.separator) : labels[labels.length - 1]
})
const presentTags = computed(() => {
  if (!isMultiple.value) return []
  const values = props.modelValue
  if (!Array.isArray(values) || values.length === 0) return []
  return values.map((v) => {
    let path = []
    if (Array.isArray(v)) {
      path = v
    } else {
      path = findPathByValue(v, props.options || []) || []
    }
    const labels = getPathLabels(path)
    return {
      path,
      text: props.showAllLevels ? labels.join(props.separator) : labels[labels.length - 1]
    }
  })
})
const displayTags = computed(() => {
  if (props.collapseTags) {
    return presentTags.value.slice(0, props.maxCollapseTags)
  }
  return presentTags.value
})
const collapsedCount = computed(() => {
  if (!isMultiple.value || !props.collapseTags) return 0
  return Math.max(0, presentTags.value.length - props.maxCollapseTags)
})
const showClear = computed(() => {
  if (!props.clearable || props.disabled || !hovering.value) return false
  if (isMultiple.value) {
    return Array.isArray(props.modelValue) && props.modelValue.length > 0
  } else {
    return (
      props.modelValue !== void 0 &&
      props.modelValue !== null &&
      (Array.isArray(props.modelValue) ? props.modelValue.length > 0 : true)
    )
  }
})
const hasValue = computed(() => {
  if (isMultiple.value) {
    return Array.isArray(props.modelValue) && props.modelValue.length > 0
  }
  return (
    props.modelValue !== void 0 &&
    props.modelValue !== null &&
    (Array.isArray(props.modelValue) ? props.modelValue.length > 0 : true)
  )
})
const filteredSuggestions = computed(() => {
  if (!props.filterable || !query.value) return []
  const results = []
  const keyword = query.value.toLowerCase()
  const traverse = (options, path, labels) => {
    const valKey = config.value.value
    const labelKey = config.value.label
    const childrenKey = config.value.children
    for (const option of options) {
      const value = option[valKey]
      const label = String(option[labelKey] || '')
      const children = option[childrenKey]
      const currentPath = [...path, value]
      const currentLabels = [...labels, label]
      const fullPathLabel = currentLabels.join(props.separator || ' / ').toLowerCase()
      const matches = props.filterMethod
        ? props.filterMethod(option, query.value)
        : fullPathLabel.includes(keyword)
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
const wrapperClasses = computed(() => [
  ns.b(),
  ns.m(cascaderSize.value),
  ns.is('disabled', props.disabled),
  ns.is('focused', focused.value || visible.value)
])
const handleExpand = (option, level) => {
  const value = option[config.value.value]
  expandedPath.value = [...expandedPath.value.slice(0, level), value]
  emit('expand-change', expandedPath.value)
}
const handleCheck = (option, path) => {
  const disabledKey = config.value.disabled
  if (option[disabledKey]) return
  if (isMultiple.value) {
    const values = (props.modelValue || []).slice()
    const pathStr = path.join(',')
    const index = values.findIndex((v) => v.join(',') === pathStr)
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
const isChecked = (path) => {
  if (isMultiple.value) {
    const values = props.modelValue
    if (!values || !Array.isArray(values)) return false
    const pathStr = path.join(',')
    return values.some((v) => Array.isArray(v) && v.join(',') === pathStr)
  }
  const value = props.modelValue
  if (value === void 0 || value === null) return false
  if (config.value.emitPath) {
    if (!Array.isArray(value)) return false
    return value.join(',') === path.join(',')
  } else {
    return value === path[path.length - 1]
  }
}
const handleRemoveTag = (path, event) => {
  event.stopPropagation()
  if (props.disabled) return
  const values = (props.modelValue || []).slice()
  const pathStr = path.join(',')
  const index = values.findIndex((v) => v.join(',') === pathStr)
  if (index > -1) {
    values.splice(index, 1)
    emit('update:modelValue', values)
    emit('change', values)
    if (props.validateEvent) {
      triggerValidate('change')
    }
  }
}
const handleClear = (event) => {
  event.stopPropagation()
  const value = isMultiple.value || config.value.emitPath ? [] : void 0
  emit('update:modelValue', value)
  emit('change', value)
  emit('clear')
  query.value = ''
  expandedPath.value = []
  if (props.validateEvent) {
    triggerValidate('change')
  }
}
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
const handleSelectSuggestion = (suggestion) => {
  if (isMultiple.value) {
    const values = (props.modelValue || []).slice()
    const pathStr = suggestion.path.join(',')
    const index = values.findIndex((v) => v.join(',') === pathStr)
    if (index === -1) {
      values.push(suggestion.path)
      emit('update:modelValue', values)
      emit('change', values)
    }
  } else {
    const value = config.value.emitPath
      ? suggestion.path
      : suggestion.path[suggestion.path.length - 1]
    emit('update:modelValue', value)
    emit('change', value)
    visible.value = false
  }
  query.value = ''
  if (props.validateEvent) {
    triggerValidate('change')
  }
}
const handleInput = (event) => {
  const target = event.target
  query.value = target.value
  if (!visible.value && query.value) {
    visible.value = true
    emit('visible-change', true)
  }
}
const handleFocus = (event) => {
  focused.value = true
  emit('focus', event)
}
const handleBlur = (event) => {
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
const handleDropdownMousedown = (event) => {
  event.preventDefault()
  isClickingDropdown.value = true
}
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
const getCheckedNodes = (leafOnly = false) => {
  const nodes = []
  const findNode = (options, path, index) => {
    if (index >= path.length) return null
    const valKey = config.value.value
    const childrenKey = config.value.children
    const option = options.find((o) => o[valKey] === path[index])
    if (!option) return null
    if (index === path.length - 1) return option
    return findNode(option[childrenKey] || [], path, index + 1)
  }
  if (isMultiple.value) {
    const values = props.modelValue
    if (values && Array.isArray(values)) {
      for (const path of values) {
        const node = findNode(props.options || [], path, 0)
        if (node && (!leafOnly || !node[config.value.children]?.length)) {
          nodes.push(node)
        }
      }
    }
  } else {
    const value = props.modelValue
    if (value) {
      const path = Array.isArray(value) ? value : findPathByValue(value, props.options || [])
      if (path) {
        const node = findNode(props.options || [], path, 0)
        if (node && (!leafOnly || !node[config.value.children]?.length)) {
          nodes.push(node)
        }
      }
    }
  }
  return nodes
}
const focus = () => {
  inputRef.value?.focus()
}
const blur = () => {
  inputRef.value?.blur()
}
provide(CascaderContextKey, {
  props,
  config: computed(() => config.value),
  expandedPath: computed(() => expandedPath.value),
  checkedValue: computed(() => props.modelValue),
  handleExpand,
  handleCheck,
  isChecked
})
defineExpose({
  focus,
  blur,
  getCheckedNodes,
  inputRef
})
</script>

<template>
  <div
    ref="wrapperRef"
    :class="wrapperClasses"
    :style="themeStyle"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click="toggleDropdown"
  >
    <!-- 输入区域 -->
    <div :class="ns.e('wrapper')">
      <!-- 多选标签 -->
      <template v-if="isMultiple">
        <span
          v-for="tag in displayTags"
          :key="tag.path.join(',')"
          :class="[ns.e('tag'), tagType ? `yh-tag--${tagType}` : '']"
        >
          <span :class="ns.e('tag-text')">{{ tag.text }}</span>
          <span :class="ns.e('tag-close')" @click="handleRemoveTag(tag.path, $event)">
            <svg viewBox="0 0 1024 1024" width="1em" height="1em">
              <path
                fill="currentColor"
                d="M764.288 214.592L512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
              />
            </svg>
          </span>
        </span>
        <span v-if="collapsedCount > 0" :class="ns.e('tag')"> +{{ collapsedCount }} </span>
      </template>

      <!-- 输入框 -->
      <input
        ref="inputRef"
        :id="inputId"
        :class="ns.e('inner')"
        :value="filterable ? query : ''"
        :placeholder="hasValue ? '' : placeholder || t('cascader.placeholder')"
        :disabled="disabled"
        :readonly="!filterable"
        autocomplete="off"
        role="combobox"
        :aria-expanded="visible"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      />

      <!-- 单选显示值 -->
      <span v-if="!isMultiple && hasValue && !query" :class="ns.e('selected-value')">
        {{ presentText }}
      </span>

      <!-- 后缀图标 -->
      <span :class="ns.e('suffix')">
        <!-- 清空按钮 -->
        <span v-if="showClear" :class="[ns.e('icon'), ns.e('clear')]" @click.stop="handleClear">
          <svg viewBox="0 0 1024 1024" width="1em" height="1em">
            <path
              fill="currentColor"
              d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336L512 457.664z"
            />
          </svg>
        </span>

        <!-- 箭头图标 -->
        <span
          :class="[
            ns.e('icon'),
            ns.e('arrow'),
            {
              'is-reverse': visible
            }
          ]"
        >
          <svg viewBox="0 0 1024 1024" width="1em" height="1em">
            <path
              fill="currentColor"
              d="M831.872 340.864L512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z"
            />
          </svg>
        </span>
      </span>
    </div>

    <!-- 下拉框 -->
    <Teleport to="body" :disabled="!teleported">
      <Transition :name="ns.b('dropdown')">
        <div
          v-show="visible"
          ref="dropdownRef"
          :class="[ns.e('dropdown'), popperClass]"
          :style="teleported ? dropdownStyle : {}"
          @mousedown="handleDropdownMousedown"
          @mouseup="handleDropdownMouseup"
        >
          <!-- 过滤建议 -->
          <div
            v-if="filterable && query && filteredSuggestions.length > 0"
            :class="ns.e('suggestions')"
          >
            <div
              v-for="suggestion in filteredSuggestions"
              :key="suggestion.path.join(',')"
              :class="[ns.e('suggestion'), ns.is('checked', isChecked(suggestion.path))]"
              @click.stop="handleSelectSuggestion(suggestion)"
            >
              {{ suggestion.labels.join(separator) }}
            </div>
          </div>

          <!-- 无匹配数据 -->
          <div
            v-else-if="filterable && query && filteredSuggestions.length === 0"
            :class="ns.e('empty')"
          >
            <slot name="empty">{{ t('cascader.noMatch') }}</slot>
          </div>

          <!-- 级联面板 -->
          <CascaderPanel
            v-else
            :options="options"
            :expanded-path="expandedPath"
            :config="config"
            :is-multiple="isMultiple"
            :virtual="virtual"
            :item-height="virtualItemHeight"
            @expand="handleExpand"
            @check="handleCheck"
            :is-checked="isChecked"
          >
            <template #default="{ node, data }">
              <slot :node="node" :data="data"></slot>
            </template>
          </CascaderPanel>
        </div>
      </Transition>
    </Teleport>
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
.yh-cascader {
  --yh-cascader-height: 32px;
  --yh-cascader-height-large: 40px;
  --yh-cascader-height-small: 24px;
  --yh-cascader-bg-color: var(--yh-fill-color-blank, #fff);
  --yh-cascader-border-color: var(--yh-border-color, #dcdfe6);
  --yh-cascader-border-color-hover: var(--yh-border-color-hover, #c0c4cc);
  --yh-cascader-border-color-focus: var(--yh-color-primary, #409eff);
  --yh-cascader-border-radius: var(--yh-border-radius-base, 4px);
  --yh-cascader-text-color: var(--yh-text-color-regular, #606266);
  --yh-cascader-placeholder-color: var(--yh-text-color-placeholder, #a8abb2);
  --yh-cascader-disabled-bg-color: var(--yh-fill-color-light, #f5f7fa);
  --yh-cascader-disabled-text-color: var(--yh-text-color-placeholder, #a8abb2);
  --yh-cascader-node-height: 34px;
  --yh-cascader-node-bg-color-hover: var(--yh-fill-color-light, #f5f7fa);
  --yh-cascader-node-text-color-hover: var(--yh-text-color-regular, #606266);
  --yh-cascader-node-bg-color-active: var(--yh-fill-color-light, #f5f7fa);
  --yh-cascader-node-text-color-active: var(--yh-color-primary, #409eff);
  --yh-cascader-dropdown-bg-color: var(--yh-bg-color-overlay, #fff);
  --yh-cascader-dropdown-border-color: var(--yh-border-color-light, #e4e7ed);
  --yh-cascader-dropdown-shadow: var(--yh-box-shadow-light, 0 2px 12px 0 rgba(0, 0, 0, 0.1));
  --yh-cascader-menu-min-width: 180px;
  --yh-cascader-menu-max-height: 274px;
  --yh-cascader-menu-border-color: var(--yh-border-color-light, #e4e7ed);
  position: relative;
  display: inline-flex;
  width: 100%;
  font-size: 14px;
  cursor: pointer;
}
.yh-cascader__wrapper {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
  position: relative;
  width: 100%;
  min-height: var(--yh-cascader-height);
  padding: 2px 30px 2px 11px;
  background-color: var(--yh-cascader-bg-color);
  border: 1px solid var(--yh-cascader-border-color);
  border-radius: var(--yh-cascader-border-radius);
  box-sizing: border-box;
  transition: border-color 0.2s;
}
.yh-cascader__wrapper:hover {
  border-color: var(--yh-cascader-border-color-hover);
}

.yh-cascader__inner {
  flex: 1;
  min-width: 50px;
  height: calc(var(--yh-cascader-height) - 6px);
  padding: 0;
  color: var(--yh-cascader-text-color);
  font-size: inherit;
  line-height: calc(var(--yh-cascader-height) - 6px);
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
}
.yh-cascader__inner::placeholder {
  color: var(--yh-cascader-placeholder-color);
}
.yh-cascader__inner:disabled {
  cursor: not-allowed;
}

.yh-cascader__selected-value {
  position: absolute;
  left: 11px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--yh-cascader-text-color);
  pointer-events: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: calc(100% - 50px);
}

.yh-cascader__suffix {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: var(--yh-cascader-placeholder-color);
}

.yh-cascader__icon {
  width: 14px;
  height: 14px;
  line-height: 1;
}

.yh-cascader__clear {
  cursor: pointer;
  transition: color 0.2s;
}
.yh-cascader__clear:hover {
  color: var(--yh-text-color-secondary, #909399);
}

.yh-cascader__arrow {
  transition: transform 0.3s;
}
.yh-cascader__arrow.is-reverse {
  transform: rotate(180deg);
}

.yh-cascader__tag {
  display: inline-flex;
  align-items: center;
  max-width: 100%;
  height: 22px;
  padding: 0 8px;
  font-size: 12px;
  color: var(--yh-text-color-regular, #606266);
  background-color: var(--yh-fill-color, #f0f2f5);
  border-radius: var(--yh-border-radius-small, 2px);
}

.yh-cascader__tag-text {
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.yh-cascader__tag-close {
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
  cursor: pointer;
  transition: color 0.2s;
}
.yh-cascader__tag-close:hover {
  color: var(--yh-color-danger, #f56c6c);
}
.yh-cascader__tag-close svg {
  width: 12px;
  height: 12px;
}

.yh-cascader__dropdown {
  --yh-cascader-dropdown-bg-color: var(--yh-bg-color-overlay, #fff);
  --yh-cascader-dropdown-border-color: var(--yh-border-color-light, #e4e7ed);
  --yh-cascader-dropdown-shadow: var(--yh-box-shadow-light, 0 2px 12px 0 rgba(0, 0, 0, 0.1));
  --yh-cascader-border-radius: var(--yh-border-radius-base, 4px);
  --yh-cascader-menu-border-color: var(--yh-border-color-light, #e4e7ed);
  --yh-cascader-text-color: var(--yh-text-color-regular, #606266);
  --yh-cascader-node-height: 34px;
  --yh-cascader-node-bg-color-hover: var(--yh-fill-color-light, #f5f7fa);
  --yh-cascader-node-text-color-active: var(--yh-color-primary, #409eff);
  --yh-cascader-menu-min-width: 180px;
  --yh-cascader-menu-max-height: 274px;
  position: absolute;
  z-index: 2000;
  margin-top: 4px;
  background-color: var(--yh-cascader-dropdown-bg-color, #fff);
  border: 1px solid var(--yh-cascader-dropdown-border-color, #e4e7ed);
  border-radius: var(--yh-border-radius-base, 4px);
  box-shadow: var(--yh-cascader-dropdown-shadow, 0 2px 12px 0 rgba(0, 0, 0, 0.1));
}

.yh-cascader__panel {
  display: flex;
  background-color: var(--yh-cascader-dropdown-bg-color, #fff);
  border-radius: var(--yh-cascader-border-radius, 4px);
  overflow: hidden;
}

.yh-cascader__menu {
  min-width: var(--yh-cascader-menu-min-width);
  max-height: var(--yh-cascader-menu-max-height);
  padding: 6px 0;
  overflow-y: auto;
  border-right: 1px solid var(--yh-cascader-menu-border-color);
}
.yh-cascader__menu:last-child {
  border-right: none;
}

.yh-cascader__node {
  display: flex;
  align-items: center;
  padding: 0 30px 0 20px;
  height: var(--yh-cascader-node-height);
  line-height: var(--yh-cascader-node-height);
  font-size: 14px;
  color: var(--yh-cascader-text-color);
  cursor: pointer;
  position: relative;
}
.yh-cascader__node:hover {
  background-color: var(--yh-cascader-node-bg-color-hover);
  color: var(--yh-cascader-node-text-color-hover);
}
.yh-cascader__node.is-expanded {
  background-color: var(--yh-cascader-node-bg-color-active);
  color: var(--yh-cascader-node-text-color-active);
}
.yh-cascader__node.is-checked {
  color: var(--yh-color-primary, #409eff);
  background-color: var(--yh-color-primary-light-9, #ecf5ff);
  font-weight: 600;
}
.yh-cascader__node.is-checked.is-expanded {
  background-color: var(--yh-color-primary-light-9, #ecf5ff);
}
.yh-cascader__node.is-disabled {
  color: var(--yh-cascader-disabled-text-color);
  cursor: not-allowed;
}
.yh-cascader__node.is-disabled:hover {
  background-color: transparent;
}

.yh-cascader__checkbox {
  margin-right: 8px;
}

.yh-cascader__checkbox-inner {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  border: 1px solid var(--yh-border-color, #dcdfe6);
  border-radius: 2px;
  background-color: #fff;
  transition: all 0.2s;
}
.yh-cascader__checkbox-inner.is-checked {
  background-color: var(--yh-color-primary, #409eff);
  border-color: var(--yh-color-primary, #409eff);
}
.yh-cascader__checkbox-inner svg {
  width: 10px;
  height: 10px;
  color: #fff;
}

.yh-cascader__label {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.yh-cascader__expand-icon {
  position: absolute;
  right: 10px;
  color: var(--yh-cascader-placeholder-color);
}
.yh-cascader__expand-icon svg {
  width: 12px;
  height: 12px;
}

.yh-cascader__suggestions {
  max-height: var(--yh-cascader-menu-max-height);
  padding: 6px 0;
  overflow-y: auto;
}

.yh-cascader__suggestion {
  padding: 0 20px;
  height: var(--yh-cascader-node-height);
  line-height: var(--yh-cascader-node-height);
  font-size: 14px;
  color: var(--yh-cascader-text-color);
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.yh-cascader__suggestion:hover {
  background-color: var(--yh-cascader-node-bg-color-hover);
}
.yh-cascader__suggestion.is-checked {
  color: var(--yh-color-primary, #409eff);
  background-color: var(--yh-color-primary-light-9, #ecf5ff);
  font-weight: 600;
}

.yh-cascader__empty {
  padding: 10px 0;
  text-align: center;
  color: var(--yh-text-color-secondary, #909399);
  font-size: 14px;
}

.yh-cascader.is-focused .yh-cascader__wrapper {
  border-color: var(--yh-cascader-border-color-focus);
}

.yh-cascader.is-disabled {
  cursor: not-allowed;
}
.yh-cascader.is-disabled .yh-cascader__wrapper {
  background-color: var(--yh-cascader-disabled-bg-color);
  border-color: var(--yh-cascader-dropdown-border-color);
  cursor: not-allowed;
}

.yh-cascader.is-disabled .yh-cascader__inner {
  color: var(--yh-cascader-disabled-text-color);
}

.yh-cascader--large {
  font-size: 14px;
}
.yh-cascader--large .yh-cascader__wrapper {
  min-height: var(--yh-cascader-height-large);
}

.yh-cascader--large .yh-cascader__inner {
  height: calc(var(--yh-cascader-height-large) - 6px);
  line-height: calc(var(--yh-cascader-height-large) - 6px);
}

.yh-cascader--large .yh-cascader__tag {
  height: 26px;
}

.yh-cascader--small {
  font-size: 12px;
}
.yh-cascader--small .yh-cascader__wrapper {
  min-height: var(--yh-cascader-height-small);
}

.yh-cascader--small .yh-cascader__inner {
  height: calc(var(--yh-cascader-height-small) - 6px);
  line-height: calc(var(--yh-cascader-height-small) - 6px);
}

.yh-cascader--small .yh-cascader__tag {
  height: 18px;
  font-size: 10px;
}

.yh-cascader-dropdown-enter-active,
.yh-cascader-dropdown-leave-active {
  transition:
    opacity 0.2s,
    transform 0.2s;
}

.yh-cascader-dropdown-enter-from,
.yh-cascader-dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
