<script setup lang="ts">
/**
 * YhDropdown - 下拉菜单组件
 * @description 将动作或菜单折叠到下拉菜单中
 * @features
 *   - 多种触发方式
 *   - 支持分割按钮
 *   - 支持快捷数据配置
 *   - 键盘导航支持
 *   - 完美支持 SSR
 */
import { ref, computed, provide, toRef, watch } from 'vue'
import { useNamespace, useLocale } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'
import { YhTooltip } from '../../tooltip'
import { YhButton } from '../../button'
import { YhIcon } from '../../icon'
import {
  dropdownProps,
  dropdownEmits,
  DROPDOWN_INJECTION_KEY
} from './dropdown'
import type { DropdownContext } from './dropdown'

defineOptions({
  name: 'YhDropdown'
})
const props = defineProps(dropdownProps)
const emit = defineEmits(dropdownEmits)

const ns = useNamespace('dropdown')
const { t } = useLocale()

// 组件级 themeOverrides
const { themeStyle } = useComponentTheme('dropdown', computed(() => props.themeOverrides))

// 内部可见性状态
const internalVisible = ref(false)
const visible = computed({
  get: () => (props.visible !== null ? props.visible : internalVisible.value),
  set: (val) => {
    internalVisible.value = val
    emit('update:visible', val)
  }
})

const tooltipRef = ref<InstanceType<typeof YhTooltip> | null>(null)

// 弹出层样式
const popperStyle = computed(() => {
  const styles: Record<string, string | number> = {
    ...themeStyle.value as any
  }
  // 安全复制 popperStyle
  if (props.popperStyle) {
    Object.entries(props.popperStyle).forEach(([key, value]) => {
      if (value !== undefined) {
        styles[key] = value as string | number
      }
    })
  }
  if (props.maxHeight) {
    styles.maxHeight = typeof props.maxHeight === 'number' ? `${props.maxHeight}px` : props.maxHeight
    styles.overflowY = 'auto'
  }
  return styles
})

// 处理菜单项点击
const handleItemClick = (command: string | number | object) => {
  emit('command', command)
  if (props.hideOnClick) {
    visible.value = false
  }
}

// 处理显示/隐藏事件
const handleShow = () => {
  emit('show')
  emit('update:visible', true)
}

const handleHide = () => {
  emit('hide')
  emit('update:visible', false)
}

// 处理按钮点击（分割模式）
const handleButtonClick = (event: MouseEvent) => {
  emit('click', event)
}

// 处理下拉按钮点击
const handleDropdownClick = () => {
  visible.value = !visible.value
}

// 提供上下文给子组件
provide<DropdownContext>(DROPDOWN_INJECTION_KEY, {
  hideOnClick: toRef(props, 'hideOnClick'),
  checkable: toRef(props, 'checkable'),
  handleItemClick
})

// 键盘导航
const handleKeydown = (event: KeyboardEvent) => {
  const { key } = event

  if (key === 'Enter' || key === ' ' || key === 'ArrowDown') {
    event.preventDefault()
    visible.value = true
  } else if (key === 'Escape') {
    visible.value = false
  }
}

// Expose
defineExpose({
  /** 手动显示下拉菜单 */
  show: () => {
    visible.value = true
  },
  /** 手动隐藏下拉菜单 */
  hide: () => {
    visible.value = false
  },
  /** 当前可见状态 */
  visible
})
</script>

<template>
  <div :class="[ns.b(), ns.is('disabled', disabled)]" :style="themeStyle" @keydown="handleKeydown">
    <YhTooltip ref="tooltipRef" v-model:visible="visible" :trigger="trigger" :placement="placement" :disabled="disabled"
      :show-after="showAfter" :hide-after="hideAfter" :z-index="zIndex" :teleported="teleported"
      :popper-class="`${ns.e('popper')} ${popperClass}`" :popper-style="popperStyle" :offset="offset"
      :show-arrow="popperArrow" effect="light" @show="handleShow" @hide="handleHide">
      <template v-if="splitButton">
        <YhButton :type="type || undefined" :size="size" :plain="plain" @click="handleButtonClick">
          <slot />
        </YhButton>
        <YhButton :type="type || undefined" :size="size" :plain="plain" :class="ns.e('caret-button')"
          @click.stop="handleDropdownClick">
          <YhIcon name="arrow-down" :class="[ns.e('icon'), { [ns.is('active')]: visible }]" />
        </YhButton>
      </template>
      <template v-else>
        <div :class="ns.e('trigger')" :tabindex="disabled ? undefined : tabindex">
          <slot />
          <YhIcon v-if="showArrow" name="arrow-down" :class="[ns.e('icon'), { [ns.is('active')]: visible }]" />
        </div>
      </template>

      <!-- 下拉内容 -->
      <template #content>
        <div :class="ns.e('menu')">
          <slot name="dropdown">
            <!-- 加载状态 -->
            <div v-if="loading" :class="ns.e('loading')">
              <YhIcon name="loading" spin />
              <span>{{ t('dropdown.loading') || t('select.loading') || 'Loading...' }}</span>
            </div>

            <!-- 快捷数据模式 -->
            <template v-else-if="items && items.length > 0">
              <template v-for="item in items" :key="item.key">
                <div v-if="item.divided" :class="ns.e('divider')" />
                <div :class="[
                  ns.e('item'),
                  item.class,
                  {
                    [ns.is('disabled')]: item.disabled,
                    [ns.is('danger')]: item.danger,
                    [ns.is('checked')]: checkable && item.checked
                  }
                ]" @click="!item.disabled && handleItemClick(item.key)">
                  <YhIcon v-if="checkable" :name="item.checked ? 'check' : ''" :class="ns.e('check-icon')" />
                  <YhIcon v-if="item.icon" :name="item.icon" :class="ns.e('item-icon')" />
                  <span>{{ item.label }}</span>
                </div>
              </template>
            </template>

            <!-- 空状态 - 当既没有插槽又没有数据时显示 -->
            <div v-else :class="ns.e('empty')">
              <slot name="empty">{{ emptyText || t('select.noData') }}</slot>
            </div>
          </slot>
        </div>
      </template>
    </YhTooltip>
  </div>
</template>

<style lang="scss">
@use './dropdown.scss';
</style>
