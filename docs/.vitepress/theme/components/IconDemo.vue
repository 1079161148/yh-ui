<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@yh-ui/icons'

interface IconItem {
  /** 图标名称 */
  icon: string
  /** 尺寸 */
  size?: number | string
  /** 颜色 */
  color?: string
  /** 是否旋转 */
  spin?: boolean
  /** 旋转角度 */
  rotate?: number
}

interface Props {
  /** 图标列表 */
  icons?: IconItem[]
  /** 单独图标（简化用法） */
  icon?: string
  /** 尺寸 */
  size?: number | string
  /** 颜色 */
  color?: string
  /** 是否旋转 */
  spin?: boolean
  /** 旋转角度 */
  rotate?: number
  /** 标题 */
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  icons: () => [],
  icon: '',
  size: 24,
  color: '',
  spin: false,
  rotate: 0,
  title: '示例'
})

// 生成 TypeScript 代码
const tsCode = computed(() => {
  if (props.icon) {
    // 单独图标用法
    const parts = ['<icon']
    parts.push(`icon="${props.icon}"`)
    if (props.size !== 24) parts.push(`:size="${props.size}"`)
    if (props.color) parts.push(`color="${props.color}"`)
    if (props.spin) parts.push('spin')
    if (props.rotate) parts.push(`:rotate="${props.rotate}"`)
    parts.push('/>')
    return `<template>\n  ${parts.join(' ')}\n</template>`
  } else if (props.icons.length > 0) {
    // 图标列表用法
    const lines = props.icons.map((item) => {
      const parts = ['<icon']
      parts.push(`icon="${item.icon}"`)
      if (item.size) parts.push(`:size="${item.size}"`)
      if (item.color) parts.push(`color="${item.color}"`)
      if (item.spin) parts.push('spin')
      if (item.rotate) parts.push(`:rotate="${item.rotate}"`)
      parts.push('/>')
      return parts.join(' ')
    })
    return `<template>\n  ${lines.join('\n  ')}\n</template>`
  }
  return ''
})

// 生成 JavaScript 代码（与 TS 相同，因为 Vue 3 的 script setup 语法类似）
const jsCode = computed(() => tsCode.value)

// 获取图标列表
const iconList = computed(() => {
  if (props.icon) {
    return [
      {
        icon: props.icon,
        size: props.size,
        color: props.color,
        spin: props.spin,
        rotate: props.rotate
      }
    ]
  }
  return props.icons
})
</script>

<template>
  <DemoBlock :title="title" :ts-code="tsCode" :js-code="jsCode">
    <div class="icon-demo">
      <Icon
        v-for="(item, index) in iconList"
        :key="index"
        :icon="item.icon"
        :size="item.size"
        :color="item.color"
        :spin="item.spin"
        :rotate="item.rotate"
      />
    </div>
  </DemoBlock>
</template>

<style scoped>
.icon-demo {
  display: flex;
  gap: 20px;
  font-size: 24px;
  color: var(--yh-text-color-primary);
}
</style>
