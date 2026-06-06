<template>
  <div
    :class="[ns.b(), ns.is('disabled', disabled), ns.is('multiple', multiple)]"
    :style="themeStyle"
    ref="selectRef"
  >
    <div
      :class="[ns.e('trigger'), ns.is('active', visible)]"
      @click="handleTriggerClick"
      @mouseenter="showClear = true"
      @mouseleave="showClear = false"
    >
      <div :class="ns.e('tags')">
        <template v-if="multiple && Array.isArray(modelValue)">
          <!-- 如果开启折叠，仅渲染 maxCollapseTags 数量的标签 -->
          <div
            v-for="item in collapseTags ? selectedLabels.slice(0, maxCollapseTags) : selectedLabels"
            :key="item.value"
            :class="ns.e('tag')"
          >
            <span>{{ item.label }}</span>
            <span :class="ns.e('tag-close')" @click.stop="removeTag(item.value)">
              <svg viewBox="0 0 1024 1024" width="1em" height="1em">
                <path
                  fill="currentColor"
                  d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336L512 457.664z"
                />
              </svg>
            </span>
          </div>
          <!-- 折叠占位符 -->
          <div
            v-if="collapseTags && selectedLabels.length > maxCollapseTags"
            :class="[ns.e('tag'), ns.m('info')]"
          >
            <span>+ {{ selectedLabels.length - maxCollapseTags }}</span>
          </div>
        </template>

        <input
          ref="inputRef"
          v-model="query"
          :placeholder="inputPlaceholder"
          :disabled="disabled"
          :readonly="!filterable"
          :class="[ns.e('inner'), ns.is('invisible', !multiple && hasValue && !visible && !query)]"
          autocomplete="off"
          @input="handleInput"
          @focus="handleInputFocus"
        />

        <span :class="ns.e('suffix')">
          <span
            v-if="showClear && clearable && hasValue"
            :class="ns.e('clear')"
            @click.stop="handleClear"
          >
            <svg viewBox="0 0 1024 1024" width="1em" height="1em">
              <path
                fill="currentColor"
                d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336L512 457.664z"
              />
            </svg>
          </span>
          <span :class="[ns.e('caret'), ns.is('reverse', visible)]">
            <svg viewBox="0 0 1024 1024" width="1em" height="1em">
              <path
                fill="currentColor"
                d="M831.872 340.864L512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z"
              />
            </svg>
          </span>
        </span>
      </div>

      <div v-if="!multiple && hasValue && !visible && !query" :class="ns.e('selected-label')">
        {{ singleLabel }}
      </div>
    </div>

    <!-- Dropdown -->
    <Teleport to="body" :disabled="!teleported">
      <Transition name="yh-zoom-in-top">
        <div
          v-if="visible"
          ref="popperRef"
          :class="[ns.e('popper'), popperClass]"
          :style="dropdownStyle"
        >
          <div :class="ns.e('dropdown')">
            <div
              ref="virtualWrapperRef"
              :class="ns.e('options-wrapper')"
              :style="{ maxHeight: heightNumber + 'px', overflow: 'auto' }"
              @scroll="handleScroll"
            >
              <!-- 列表区域 -->
              <div v-if="flatData.length > 0" :style="listContainerStyle">
                <div :style="listShiftStyle">
                  <div
                    v-for="node in renderedNodes"
                    :key="node.key"
                    :class="[
                      ns.e('node'),
                      ns.is('selected', node.checked),
                      ns.is('disabled', node.disabled)
                    ]"
                    :style="{
                      paddingLeft: `${node.level * indent + 8}px`,
                      height: itemSize + 'px'
                    }"
                    @click.stop="handleNodeClick(node, $event)"
                  >
                    <div :class="ns.e('node-content')">
                      <!-- 展开图标 -->
                      <span
                        :class="[
                          ns.e('expand-icon'),
                          ns.is('leaf', node.isLeaf),
                          ns.is('expanded', node.expanded)
                        ]"
                        @click.stop="toggleExpand(node)"
                      >
                        <svg v-if="!node.loading" viewBox="0 0 1024 1024" width="1em" height="1em">
                          <path
                            fill="currentColor"
                            d="M340.864 149.312l470.4 362.688-470.4 362.688c-26.432 20.416-64 1.6-64-32V181.312c0-33.6 37.568-52.416 64-32z"
                          />
                        </svg>
                        <svg
                          v-else
                          :class="ns.is('loading')"
                          viewBox="0 0 1024 1024"
                          width="1em"
                          height="1em"
                        >
                          <path
                            fill="currentColor"
                            d="M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32zm448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zm-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32z"
                          />
                        </svg>
                      </span>

                      <!-- 复选框 -->
                      <span
                        v-if="showCheckbox"
                        :class="[
                          ns.e('checkbox'),
                          ns.is('checked', node.checked),
                          ns.is('indeterminate', node.indeterminate),
                          ns.is('disabled', node.disabled)
                        ]"
                      >
                        <span :class="ns.e('checkbox-inner')">
                          <svg
                            v-if="node.checked && !node.indeterminate"
                            viewBox="0 0 1024 1024"
                            width="1em"
                            height="1em"
                          >
                            <path
                              fill="currentColor"
                              d="M406.656 706.944L195.84 496.256a32 32 0 1 0-45.248 45.248l256 256 512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z"
                            />
                          </svg>
                          <svg
                            v-else-if="node.indeterminate"
                            viewBox="0 0 1024 1024"
                            width="1em"
                            height="1em"
                          >
                            <path fill="currentColor" d="M192 448h640v128H192z" />
                          </svg>
                        </span>
                      </span>

                      <!-- 文本 -->
                      <span :class="ns.e('node-label')">
                        <slot name="default" :node="node" :data="node.raw">
                          {{ node.label }}
                        </slot>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div v-else :class="ns.e('empty')">{{ emptyText || t('treeselect.emptyText') }}</div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
/**
 * YhTreeSelect - 树形选择器组件
 * @description 集成树形结构与下拉选择，已实现严格类型化并杜绝 any
 */
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { useNamespace, useLocale } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'
import { treeSelectProps, treeSelectEmits, type TreeSelectNode, type TreeKey } from './tree-select'
import { useTree } from './use-tree'

defineOptions({ name: 'YhTreeSelect' })

const props = defineProps(treeSelectProps)
const emit = defineEmits(treeSelectEmits)

const ns = useNamespace('tree-select')
const { t } = useLocale()

// 组件级 themeOverrides
const { themeStyle } = useComponentTheme(
  'tree-select',
  computed(() => props.themeOverrides)
)
const visible = ref(false)
const query = ref('')
const dropdownStyle = ref<Record<string, string>>({})
const inputRef = ref<HTMLInputElement | null>(null)
const selectRef = ref<HTMLElement | null>(null)
const popperRef = ref<HTMLElement | null>(null)
const virtualWrapperRef = ref<HTMLElement | null>(null)
const scrollTop = ref(0)
const showClear = ref(false)

const { flatData, nodeMap, mapVersion, checkNode, toggleExpand, filter, getNode } = useTree(
  props,
  emit
)

const heightNumber = computed(() => {
  if (typeof props.height === 'number') return props.height
  const parsed = parseInt(String(props.height))
  return isNaN(parsed) ? 274 : parsed
})

// --- 渲染逻辑切换 (虚拟滚动 vs 普通渲染) ---
const renderedNodes = computed(() => {
  if (!props.virtual) return flatData.value
  const start = Math.max(0, Math.floor(scrollTop.value / props.itemSize) - 5)
  const end = Math.min(
    flatData.value.length,
    start + Math.ceil(heightNumber.value / props.itemSize) + 10
  )
  return flatData.value.slice(start, end)
})

const listContainerStyle = computed(() => {
  if (!props.virtual) return {}
  return {
    height: `${flatData.value.length * props.itemSize}px`,
    position: 'relative' as const
  }
})

const listShiftStyle = computed(() => {
  if (!props.virtual) return {}
  const start = Math.max(0, Math.floor(scrollTop.value / props.itemSize) - 5)
  return {
    transform: `translateY(${start * props.itemSize}px)`,
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0
  }
})

const handleScroll = (e: Event) => {
  if (props.virtual) {
    scrollTop.value = (e.target as HTMLElement).scrollTop
  }
}

const hasValue = computed(() => {
  if (props.multiple) return Array.isArray(props.modelValue) && props.modelValue.length > 0
  return props.modelValue !== undefined && props.modelValue !== null && props.modelValue !== ''
})

const singleLabel = computed(() => {
  void mapVersion.value
  if (props.multiple || !hasValue.value) return ''
  const node = getNode(props.modelValue as TreeKey)
  return node ? node.label : String(props.modelValue ?? '')
})

const inputPlaceholder = computed(() => {
  if (props.multiple) return hasValue.value ? '' : props.placeholder || t('treeselect.placeholder')
  if (hasValue.value && props.filterable && visible.value) return singleLabel.value
  return props.placeholder || t('treeselect.placeholder')
})

const selectedLabels = computed(() => {
  void mapVersion.value
  const value = props.modelValue
  const keys = Array.isArray(value)
    ? value
    : value !== undefined && value !== null && value !== ''
      ? [value]
      : []
  return keys.map((k) => {
    const node = getNode(k)
    return { value: k, label: node ? node.label : String(k) }
  })
})

const handleTriggerClick = () => {
  if (props.disabled) return
  visible.value = !visible.value
}

const closeMenu = () => {
  visible.value = false
  query.value = ''
  filter('')
}

const handleOutsideClick = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (
    visible.value &&
    selectRef.value &&
    !selectRef.value.contains(target) &&
    popperRef.value &&
    !popperRef.value.contains(target)
  ) {
    closeMenu()
  }
}

const handleNodeClick = (node: TreeSelectNode, e?: MouseEvent) => {
  if (node.disabled) return

  // 抛出节点点击事件 (对标 市面组件库，透出事件对象)
  emit('node-click', node.raw, node, e as MouseEvent)

  // 1. 如果是懒加载且尚未加载，点击行即触发加载并展开
  if (props.lazy && !node.loaded && !node.isLeaf) {
    toggleExpand(node)
    return
  }
  if (props.showCheckbox || props.checkStrictly || props.checkOnClickNode) {
    checkNode(node, !node.checked)
    if (!props.multiple && !props.showCheckbox) {
      nextTick(() => closeMenu())
    }
  } else {
    if (node.isLeaf) {
      checkNode(node, !node.checked)
      if (!props.multiple) {
        nextTick(() => closeMenu())
      }
    } else if (props.expandOnClickNode) {
      toggleExpand(node)
    }
  }
}

const removeTag = (key: TreeKey) => {
  const node = getNode(key)
  if (node) checkNode(node, false)
  else if (Array.isArray(props.modelValue)) {
    emit(
      'update:modelValue',
      props.modelValue.filter((v) => v !== key)
    )
  }
}

const handleClear = () => {
  emit('update:modelValue', props.multiple ? [] : undefined)
  emit('clear')
  nextTick(() => {
    nodeMap.value.forEach((n) => {
      n.checked = false
      n.indeterminate = false
    })
    mapVersion.value++
  })
}

const handleInput = () => {
  if (!visible.value) visible.value = true
  filter(query.value)
}

const handleInputFocus = () => {
  if (!props.disabled && props.filterable) visible.value = true
}

const updatePopper = () => {
  nextTick(() => {
    if (selectRef.value) {
      const rect = selectRef.value.getBoundingClientRect()

      // 提取主题变量
      const styles = window.getComputedStyle(selectRef.value)
      const primary = styles.getPropertyValue('--yh-color-primary').trim()
      const primaryRgb = styles.getPropertyValue('--yh-color-primary-rgb').trim()

      dropdownStyle.value = {
        width: `${rect.width}px`,
        position: 'fixed',
        top: `${rect.bottom + 4}px`,
        left: `${rect.left}px`,
        zIndex: '2000',
        '--yh-color-primary': primary,
        '--yh-color-primary-rgb': primaryRgb
      }
    }
  })
}

watch(visible, (val: boolean) => {
  emit('visible-change', val)
  if (val) {
    scrollTop.value = 0
    updatePopper()
    window.addEventListener('click', handleOutsideClick, true)
    window.addEventListener('scroll', updatePopper, true)
    window.addEventListener('resize', updatePopper)
    nextTick(() => {
      if (virtualWrapperRef.value) virtualWrapperRef.value.scrollTop = 0
    })
  } else {
    window.removeEventListener('click', handleOutsideClick, true)
    window.removeEventListener('scroll', updatePopper, true)
    window.removeEventListener('resize', updatePopper)
  }
})

onMounted(() => {
  if (visible.value) updatePopper()
})
onBeforeUnmount(() => {
  window.removeEventListener('click', handleOutsideClick, true)
  window.removeEventListener('scroll', updatePopper, true)
  window.removeEventListener('resize', updatePopper)
})
</script>

<style lang="scss">
@use './tree-select.scss';
</style>
