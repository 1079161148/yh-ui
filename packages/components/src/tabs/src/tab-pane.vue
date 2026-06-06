<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted, ref, watch } from 'vue'
import { useNamespace } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'
import { tabPaneProps } from './tab-pane'
import { TABS_INJECTION_KEY } from './tabs'

defineOptions({
  name: 'YhTabPane'
})

const props = defineProps(tabPaneProps)
const ns = useNamespace('tab-pane')

// 组件级 themeOverrides
const { themeStyle } = useComponentTheme('tab-pane', computed(() => props.themeOverrides))

const tabsContext = inject(TABS_INJECTION_KEY)
const hasRendered = ref(false)

// 判断是否激活
const isActive = computed(() => {
  return tabsContext?.activeTab.value === props.name
})

// 是否应该渲染内容 (lazy 模式)
const shouldRender = computed(() => {
  if (!props.lazy) return true
  return hasRendered.value || isActive.value
})

// 监听激活状态
watch(isActive, (val: boolean) => {
  if (val && !hasRendered.value) {
    hasRendered.value = true
  }
})

// 注册面板
onMounted(() => {
  tabsContext?.registerPane({
    name: String(props.name),
    label: props.label,
    disabled: props.disabled,
    closable: props.closable,
    lazy: props.lazy,
    icon: props.icon
  })
})

// 注销面板
onUnmounted(() => {
  tabsContext?.unregisterPane(String(props.name))
})

// 同步更新面板配置
watch(
  () => ({
    name: props.name,
    label: props.label,
    disabled: props.disabled,
    closable: props.closable,
    lazy: props.lazy,
    icon: props.icon
  }),
  (config) => {
    tabsContext?.registerPane({
      name: String(config.name),
      label: config.label,
      disabled: config.disabled,
      closable: config.closable,
      lazy: config.lazy,
      icon: config.icon
    })
  }
)
</script>

<template>
  <div v-if="shouldRender" v-show="isActive" :class="[ns.b(), ns.is('active', isActive)]" :style="themeStyle"
    role="tabpanel">
    <slot></slot>
  </div>
</template>

<style lang="scss">
@use '@yh-ui/theme/styles/mixins/mixins' as *;

@include b(tab-pane) {
  outline: none;
}
</style>
