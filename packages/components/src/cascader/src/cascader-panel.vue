<script setup lang="ts">
/**
 * CascaderPanel - 级联面板组件
 * @description 级联选择器的面板部分，支持虚拟滚动和任意级选择
 */
import { computed, ref, watch, defineComponent, h } from 'vue'
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

/**
 * 局部子组件：处理单列菜单及其虚拟滚动逻辑
 * 封装此组件是为了让每一列拥有独立的响应式 scrollTop 状态
 */
const CascaderMenu = defineComponent({
  name: 'CascaderMenu',
  props: {
    menu: { type: Array as () => CascaderOption[], required: true },
    level: { type: Number, required: true },
    virtual: Boolean,
    itemHeight: { type: Number, default: 34 }
  },
  setup(menuProps, { slots }) {
    const scrollTop = ref(0)

    // 计算可见区域
    const visibleInfo = computed(() => {
      if (!menuProps.virtual) return { options: menuProps.menu, startIndex: 0 }

      const containerHeight = 274 // 对应 SCSS 中的 max-height
      const visibleCount = Math.ceil(containerHeight / menuProps.itemHeight) + 2
      const st = scrollTop.value

      // 核心修复：确保 startIndex 不会因为旧的、过大的 scrollTop 而导致切片为空
      // 当切换父级菜单导致子菜单变短时，旧的 scrollTop 可能会溢出
      const maxStartIndex = Math.max(0, menuProps.menu.length - visibleCount)
      const startIndex = Math.min(
        Math.max(0, Math.floor(st / menuProps.itemHeight) - 1),
        maxStartIndex
      )

      return {
        options: menuProps.menu.slice(startIndex, startIndex + visibleCount + 2),
        startIndex
      }
    })

    const handleScroll = (e: Event) => {
      scrollTop.value = (e.target as HTMLElement).scrollTop
    }

    // 当菜单内容变化（即切换了父级节点）时，尝试重置滚动位置
    watch(() => menuProps.menu, () => {
      scrollTop.value = 0
    })

    return () => h('div', {
      class: [ns.e('menu'), menuProps.virtual && ns.is('virtual')],
      onScroll: handleScroll
    }, [
      menuProps.virtual
        ? h('div', {
          style: {
            height: `${menuProps.menu.length * menuProps.itemHeight}px`,
            position: 'relative'
          }
        }, visibleInfo.value.options.map((option, idx) => {
          return slots.default?.({
            option,
            level: menuProps.level,
            startIndex: visibleInfo.value.startIndex,
            idx
          })
        }))
        : menuProps.menu.map((option) => slots.default?.({
          option,
          level: menuProps.level
        })),
      // 空状态处理
      menuProps.menu.length === 0 ? h('div', { class: ns.e('empty') }, '无数据') : null
    ])
  }
})

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

// 工具方法保持 setup 作用域
const isExpanded = (option: CascaderOption, level: number) =>
  props.expandedPath[level] === option[props.config.value]

const hasChildren = (option: CascaderOption) => {
  const children = option[props.config.children]
  return children && children.length > 0
}

const isLeaf = (option: CascaderOption) => {
  if (option[props.config.leaf] !== undefined) return option[props.config.leaf]
  return !hasChildren(option)
}

const isSelectable = (option: CascaderOption) =>
  props.config.checkStrictly ? true : isLeaf(option)

const getPath = (option: CascaderOption, level: number) =>
  [...props.expandedPath.slice(0, level), option[props.config.value]]

const handleCheckboxClick = (option: CascaderOption, level: number, event: MouseEvent) => {
  event.stopPropagation()
  if (option[props.config.disabled] || !isSelectable(option)) return
  emit('check', option, getPath(option, level))
}

const handleClick = (option: CascaderOption, level: number, event: MouseEvent) => {
  event.stopPropagation()
  if (option[props.config.disabled]) return

  const path = getPath(option, level)
  if (hasChildren(option)) emit('expand', option, level)

  if (!props.isMultiple && isSelectable(option)) {
    emit('check', option, path)
  } else if (props.isMultiple && props.config.checkStrictly && !hasChildren(option)) {
    emit('check', option, path)
  }
}

const handleMouseEnter = (option: CascaderOption, level: number) => {
  if (props.config.expandTrigger !== 'hover' || option[props.config.disabled]) return
  if (hasChildren(option)) emit('expand', option, level)
}
</script>

<template>
  <div :class="ns.e('panel')">
    <CascaderMenu v-for="(menu, level) in menus" :key="level" :menu="menu" :level="level" :virtual="virtual"
      :item-height="itemHeight">
      <template #default="{ option, level: menuLevel, startIndex, idx }">
        <div :key="option[config.value]" :class="[
          ns.e('node'),
          ns.is('expanded', isExpanded(option, menuLevel)),
          ns.is('checked', isChecked(getPath(option, menuLevel))),
          ns.is('disabled', option[config.disabled]),
          ns.is('selectable', isSelectable(option))
        ]" :style="virtual ? {
            position: 'absolute',
            top: `${(startIndex + idx) * itemHeight}px`,
            left: 0, right: 0, height: `${itemHeight}px`
          } : {}" @mousedown.prevent @click="handleClick(option, menuLevel, $event)"
          @mouseenter="handleMouseEnter(option, menuLevel)">
          <!-- 多选复选框 -->
          <span v-if="isMultiple && isSelectable(option)" :class="ns.e('checkbox')"
            @click.stop="handleCheckboxClick(option, menuLevel, $event)">
            <span :class="[ns.e('checkbox-inner'), ns.is('checked', isChecked(getPath(option, menuLevel)))]">
              <svg v-if="isChecked(getPath(option, menuLevel))" viewBox="0 0 1024 1024" width="1em" height="1em">
                <path fill="currentColor"
                  d="M406.656 706.944L195.84 496.256a32 32 0 1 0-45.248 45.248l256 256 512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z" />
              </svg>
            </span>
          </span>

          <!-- 标签内容 -->
          <span :class="ns.e('label')">
            <slot :node="option" :data="option">{{ option[config.label] }}</slot>
          </span>

          <!-- 展开图标 -->
          <span v-if="hasChildren(option)" :class="ns.e('expand-icon')">
            <svg viewBox="0 0 1024 1024" width="1em" height="1em">
              <path fill="currentColor"
                d="M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z" />
            </svg>
          </span>
        </div>
      </template>
    </CascaderMenu>
  </div>
</template>
