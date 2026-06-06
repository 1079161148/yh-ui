<script setup lang="ts">
/**
 * YhDescriptions - 描述列表组件
 * 旗舰级修复版：解决尺寸无效与布局空隙问题
 */
import { computed, useSlots, Fragment, provide } from 'vue'
import type { VNode, CSSProperties } from 'vue'
import { useNamespace } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'
import { descriptionsProps, descriptionsKey } from './descriptions'

defineOptions({
  name: 'YhDescriptions'
})

const props = defineProps(descriptionsProps)
const slots = useSlots()
const ns = useNamespace('descriptions')

// 组件级 themeOverrides
const { themeStyle } = useComponentTheme('descriptions', computed(() => props.themeOverrides))

provide(descriptionsKey, { props })

// 自定义 VNode 项类型，用于存储额外的布局信息
interface DescriptionsItemData {
  props: Record<string, unknown>
  slots: Record<string, () => VNode | string>
  actualSpan: number
}

// 辅助函数：深度展平节点
const getFlattenChildren = (nodes: VNode[]): VNode[] => {
  const result: VNode[] = []
  nodes.forEach((node) => {
    if (node.type === Fragment && Array.isArray(node.children)) {
      result.push(...getFlattenChildren(node.children as VNode[]))
    } else if (node.type && typeof node.type === 'object' && 'name' in node.type && (node.type as { name?: string }).name === 'YhDescriptionsItem') {
      result.push(node)
    }
  })
  return result
}

// 核心：对标 EP 的高鲁棒性行分配算法
const rows = computed(() => {
  const children = slots.default ? getFlattenChildren(slots.default()) : []
  const rows: DescriptionsItemData[][] = []
  let tempRow: DescriptionsItemData[] = []
  let occupiedSpan = 0
  const totalColumn = Number(props.column)

  children.forEach((node, index) => {
    const itemProps = { ...(node.props || {}) }
    let span = Number(itemProps.span || 1)

    // 如果当前项放不下，则先结算当前行
    if (occupiedSpan + span > totalColumn) {
      if (tempRow.length > 0) {
        // 给上一行的最后一项补齐剩余 span
        const lastItem = tempRow[tempRow.length - 1]
        lastItem.actualSpan += totalColumn - occupiedSpan
        rows.push(tempRow)
      }
      tempRow = []
      occupiedSpan = 0
    }

    // 每一项自带 span 的数据引用，使用 actualSpan 避免修改 props
    const item: DescriptionsItemData = {
      props: itemProps,
      slots: (node.children as Record<string, () => VNode | string>) || {},
      actualSpan: span
    }

    tempRow.push(item)
    occupiedSpan += span

    // 最后一项强制填满本行
    if (index === children.length - 1) {
      item.actualSpan += totalColumn - occupiedSpan
      rows.push(tempRow)
    }
  })

  return rows
})

// 样式映射
const getStyle = (itemProps: Record<string, unknown>, type: 'label' | 'content'): CSSProperties => {
  const style: CSSProperties = { ...(type === 'label' ? props.labelStyle : props.contentStyle) }
  const itemStyle = type === 'label' ? itemProps.labelStyle : itemProps.contentStyle
  Object.assign(style, (itemStyle as CSSProperties) || {})

  if (type === 'label') {
    if (itemProps.width) style.width = typeof itemProps.width === 'number' ? `${itemProps.width}px` : itemProps.width as string
    if (itemProps.minWidth) style.minWidth = typeof itemProps.minWidth === 'number' ? `${itemProps.minWidth}px` : itemProps.minWidth as string
    style.textAlign = (itemProps.labelAlign || itemProps.align || 'left') as 'left' | 'center' | 'right'
  } else {
    style.textAlign = (itemProps.align || 'left') as 'left' | 'center' | 'right'
  }
  return style
}

// 类名映射
const getClassName = (itemProps: Record<string, unknown>, type: 'label' | 'content'): string[] => {
  const classes: string[] = []

  // 组件级别的类名
  if (type === 'label' && props.labelClassName) {
    classes.push(props.labelClassName)
  }
  if (type === 'content' && props.contentClassName) {
    classes.push(props.contentClassName)
  }

  // Item 级别的类名
  if (type === 'label' && itemProps.labelClassName) {
    classes.push(itemProps.labelClassName as string)
  }
  if (type === 'content' && itemProps.className) {
    classes.push(itemProps.className as string)
  }

  return classes
}

const descriptionsClasses = computed(() => [
  ns.b(),
  ns.m(props.size),
  ns.is('bordered', props.border),
  ns.is('vertical', props.direction === 'vertical')
])
</script>

<template>
  <div :class="descriptionsClasses" :style="themeStyle">
    <div v-if="title || extra || $slots.title || $slots.extra" :class="ns.e('header')">
      <div :class="ns.e('title')">
        <slot name="title">{{ title }}</slot>
      </div>
      <div :class="ns.e('extra')">
        <slot name="extra">{{ extra }}</slot>
      </div>
    </div>

    <div :class="ns.e('body')">
      <table :class="[ns.e('table'), ns.is('bordered', border)]">
        <tbody>
          <template v-for="(row, rowIndex) in rows" :key="rowIndex">
            <!-- 横向布局 -->
            <tr v-if="direction === 'horizontal'" :class="ns.e('row')">
              <template v-for="(item, cellIndex) in row" :key="cellIndex">
                <th :class="[ns.e('label'), ...getClassName(item.props, 'label')]"
                  :style="getStyle(item.props, 'label')">
                  <component :is="item.slots.label" v-if="item.slots.label" />
                  <template v-else>{{ item.props.label }}</template>
                  <span v-if="colon && !border && (item.props.label || item.slots.label)">:</span>
                </th>
                <td :class="[ns.e('content'), ...getClassName(item.props, 'content')]"
                  :style="getStyle(item.props, 'content')"
                  :colspan="item.actualSpan * 2 - 1 > 1 ? item.actualSpan * 2 - 1 : undefined">
                  <component :is="item.slots.default" v-if="item.slots.default" />
                </td>
              </template>
            </tr>
            <!-- 垂直布局 -->
            <template v-else>
              <tr :class="ns.e('row')">
                <th v-for="(item, cellIndex) in row" :key="cellIndex"
                  :class="[ns.e('label'), ...getClassName(item.props, 'label')]" :style="getStyle(item.props, 'label')"
                  :colspan="item.actualSpan">
                  <component :is="item.slots.label" v-if="item.slots.label" />
                  <template v-else>{{ item.props.label }}</template>
                </th>
              </tr>
              <tr :class="ns.e('row')">
                <td v-for="(item, cellIndex) in row" :key="cellIndex"
                  :class="[ns.e('content'), ...getClassName(item.props, 'content')]"
                  :style="getStyle(item.props, 'content')" :colspan="item.actualSpan">
                  <component :is="item.slots.default" v-if="item.slots.default" />
                </td>
              </tr>
            </template>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="scss">
@use './descriptions.scss';
</style>
