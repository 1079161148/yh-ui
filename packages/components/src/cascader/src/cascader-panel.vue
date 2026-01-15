<script setup lang="ts">
/**
 * CascaderPanel - 级联面板组件
 * @description 级联选择器的面板部分，支持虚拟滚动和任意级选择
 */
import { computed, ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useNamespace } from '@yh-ui/hooks'
import type { CascaderOption, CascaderConfig } from './cascader'

defineOptions({
  name: 'YhCascaderPanel'
})

const props = withDefaults(defineProps<{
  options?: CascaderOption[]
  expandedPath: (string | number)[]
  config: CascaderConfig
  isMultiple: boolean
  isChecked: (path: (string | number)[]) => boolean
  /** 是否启用虚拟滚动 */
  virtual?: boolean
  /** 虚拟滚动每项高度 */
  itemHeight?: number
}>(), {
  options: () => [],
  expandedPath: () => [],
  isMultiple: false,
  virtual: false,
  itemHeight: 34
})

const emit = defineEmits<{
  (e: 'expand', option: CascaderOption, level: number): void
  (e: 'check', option: CascaderOption, path: (string | number)[]): void
}>()

const ns = useNamespace('cascader')

// 虚拟滚动状态
const menuRefs = ref<HTMLElement[]>([])
const scrollTops = ref<number[]>([])

// 计算各级菜单
const menus = computed(() => {
  const result: CascaderOption[][] = [props.options || []]
  let currentOptions = props.options || []

  for (const value of props.expandedPath) {
    const option = currentOptions.find(o => o[props.config.value] === value)
    if (option && option[props.config.children]?.length) {
      result.push(option[props.config.children])
      currentOptions = option[props.config.children]
    } else {
      break
    }
  }

  return result
})

// 判断是否需要虚拟滚动
const needVirtualScroll = () => {
  return props.virtual
}

// 计算可视区域的选项
const getVisibleOptions = (menu: CascaderOption[], level: number) => {
  if (!needVirtualScroll()) {
    return { options: menu, startIndex: 0, paddingTop: 0, paddingBottom: 0 }
  }

  const scrollTop = scrollTops.value[level] || 0
  const containerHeight = 204 // 菜单高度
  const visibleCount = Math.ceil(containerHeight / props.itemHeight) + 2
  const startIndex = Math.max(0, Math.floor(scrollTop / props.itemHeight) - 1)
  const endIndex = Math.min(menu.length, startIndex + visibleCount + 2)

  return {
    options: menu.slice(startIndex, endIndex),
    startIndex,
    paddingTop: startIndex * props.itemHeight,
    paddingBottom: Math.max(0, (menu.length - endIndex) * props.itemHeight)
  }
}

// 处理滚动
const handleScroll = (event: Event, level: number) => {
  const target = event.target as HTMLElement
  scrollTops.value[level] = target.scrollTop
}

// 判断是否展开
const isExpanded = (option: CascaderOption, level: number) => {
  return props.expandedPath[level] === option[props.config.value]
}

// 判断是否有子节点
const hasChildren = (option: CascaderOption) => {
  const children = option[props.config.children]
  return children && children.length > 0
}

// 判断是否是叶子节点
const isLeaf = (option: CascaderOption) => {
  if (option[props.config.leaf] !== undefined) {
    return option[props.config.leaf]
  }
  return !hasChildren(option)
}

// 判断节点是否可选择
// checkStrictly 模式下，所有节点都可以选择
// 非 checkStrictly 模式下，只有叶子节点可以选择
const isSelectable = (option: CascaderOption) => {
  if (props.config.checkStrictly) {
    return true
  }
  return isLeaf(option)
}

// 获取路径
const getPath = (option: CascaderOption, level: number) => {
  return [...props.expandedPath.slice(0, level), option[props.config.value]]
}

// 处理复选框点击（仅多选模式）
const handleCheckboxClick = (option: CascaderOption, level: number, event: MouseEvent) => {
  event.stopPropagation()
  if (option[props.config.disabled]) return
  if (!isSelectable(option)) return

  const path = getPath(option, level)
  emit('check', option, path)
}

// 处理节点点击
const handleClick = (option: CascaderOption, level: number, event: MouseEvent) => {
  event.stopPropagation()
  if (option[props.config.disabled]) return

  const path = getPath(option, level)

  // 展开子级
  if (hasChildren(option)) {
    emit('expand', option, level)
  }

  // 单选模式：选中（叶子节点或 checkStrictly 模式）
  if (!props.isMultiple && isSelectable(option)) {
    emit('check', option, path)
  }

  // 多选模式且 checkStrictly：点击节点也触发选中
  if (props.isMultiple && props.config.checkStrictly && !hasChildren(option)) {
    emit('check', option, path)
  }
}

// 处理悬停展开
const handleMouseEnter = (option: CascaderOption, level: number) => {
  if (props.config.expandTrigger !== 'hover') return
  if (option[props.config.disabled]) return
  if (hasChildren(option)) {
    emit('expand', option, level)
  }
}

// 重置滚动位置
watch(() => props.expandedPath, () => {
  nextTick(() => {
    scrollTops.value = []
  })
})
</script>

<template>
  <div :class="ns.e('panel')">
    <div 
      v-for="(menu, level) in menus" 
      :key="level" 
      :class="[ns.e('menu'), needVirtualScroll() && ns.is('virtual')]"
      @scroll="(e) => handleScroll(e, level)"
    >
      <!-- 虚拟滚动容器 -->
      <template v-if="needVirtualScroll()">
        <div 
          :style="{ 
            height: `${menu.length * itemHeight}px`,
            position: 'relative'
          }"
        >
          <div
            v-for="(option, idx) in getVisibleOptions(menu, level).options"
            :key="option[config.value]"
            :class="[
              ns.e('node'),
              ns.is('expanded', isExpanded(option, level)),
              ns.is('checked', isChecked(getPath(option, level))),
              ns.is('disabled', option[config.disabled]),
              ns.is('selectable', isSelectable(option))
            ]"
            :style="{
              position: 'absolute',
              top: `${(getVisibleOptions(menu, level).startIndex + idx) * itemHeight}px`,
              left: 0,
              right: 0,
              height: `${itemHeight}px`
            }"
            @mousedown.prevent
            @click="handleClick(option, level, $event)"
            @mouseenter="handleMouseEnter(option, level)"
          >
            <!-- 多选复选框 -->
            <span 
              v-if="isMultiple && isSelectable(option)" 
              :class="ns.e('checkbox')"
              @click.stop="handleCheckboxClick(option, level, $event)"
            >
              <span :class="[
                ns.e('checkbox-inner'),
                ns.is('checked', isChecked(getPath(option, level)))
              ]">
                <svg v-if="isChecked(getPath(option, level))" viewBox="0 0 1024 1024" width="1em" height="1em">
                  <path fill="currentColor"
                    d="M406.656 706.944L195.84 496.256a32 32 0 1 0-45.248 45.248l256 256 512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z" />
                </svg>
              </span>
            </span>

            <!-- 标签 -->
            <span :class="ns.e('label')">
              <slot :node="option" :data="option">
                {{ option[config.label] }}
              </slot>
            </span>

            <!-- 展开箭头 -->
            <span v-if="hasChildren(option)" :class="ns.e('expand-icon')">
              <svg viewBox="0 0 1024 1024" width="1em" height="1em">
                <path fill="currentColor"
                  d="M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z" />
              </svg>
            </span>
          </div>
        </div>
      </template>

      <!-- 普通渲染 -->
      <template v-else>
        <div 
          v-for="option in menu" 
          :key="option[config.value]" 
          :class="[
            ns.e('node'),
            ns.is('expanded', isExpanded(option, level)),
            ns.is('checked', isChecked(getPath(option, level))),
            ns.is('disabled', option[config.disabled]),
            ns.is('selectable', isSelectable(option))
          ]" 
          @mousedown.prevent 
          @click="handleClick(option, level, $event)" 
          @mouseenter="handleMouseEnter(option, level)"
        >
          <!-- 多选复选框 -->
          <span 
            v-if="isMultiple && isSelectable(option)" 
            :class="ns.e('checkbox')"
            @click.stop="handleCheckboxClick(option, level, $event)"
          >
            <span :class="[
              ns.e('checkbox-inner'),
              ns.is('checked', isChecked(getPath(option, level)))
            ]">
              <svg v-if="isChecked(getPath(option, level))" viewBox="0 0 1024 1024" width="1em" height="1em">
                <path fill="currentColor"
                  d="M406.656 706.944L195.84 496.256a32 32 0 1 0-45.248 45.248l256 256 512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z" />
              </svg>
            </span>
          </span>

          <!-- 标签 -->
          <span :class="ns.e('label')">
            <slot :node="option" :data="option">
              {{ option[config.label] }}
            </slot>
          </span>

          <!-- 展开箭头 -->
          <span v-if="hasChildren(option)" :class="ns.e('expand-icon')">
            <svg viewBox="0 0 1024 1024" width="1em" height="1em">
              <path fill="currentColor"
                d="M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z" />
            </svg>
          </span>
        </div>
      </template>

      <!-- 空状态 -->
      <div v-if="menu.length === 0" :class="ns.e('empty')">
        无数据
      </div>
    </div>
  </div>
</template>
