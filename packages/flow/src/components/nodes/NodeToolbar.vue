<template>
  <Teleport :to="teleportTarget">
    <div
      v-if="isVisible"
      ref="toolbarRef"
      class="yh-flow-node-toolbar"
      :style="toolbarStyle"
      @mousedown.stop
      @click.stop
    >
      <slot>
        <!-- 默认工具栏内容 -->
        <div class="default-toolbar">
          <button @click="emit('delete')">Delete</button>
          <button @click="emit('copy')">Copy</button>
        </div>
      </slot>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount, watch } from 'vue'
import type { Position } from '../../types'

const props = withDefaults(
  defineProps<{
    nodeId: string
    selected?: boolean
    position?: Position
    offset?: number
    teleportTo?: string
  }>(),
  {
    position: 'top',
    offset: 10,
    teleportTo: 'body'
  }
)

const emit = defineEmits<{
  (e: 'delete'): void
  (e: 'copy'): void
}>()

const toolbarRef = ref<HTMLElement>()
const isVisible = computed(() => props.selected)

// 动态计算工具栏位置，让其始终贴合节点
const toolbarStyle = ref({
  position: 'absolute' as const,
  top: '0px',
  left: '0px',
  zIndex: 99999,
  transform: ''
})

const teleportTarget = computed(() => props.teleportTo)

let rafId = 0

const updatePosition = () => {
  if (!isVisible.value) return

  const nodeEl = document.getElementById(`node-${props.nodeId}`)
  if (!nodeEl) return

  const rect = nodeEl.getBoundingClientRect()
  const scrollX = window.scrollX
  const scrollY = window.scrollY

  let top = 0
  let left = 0

  // 依据设定方向计算偏移
  if (props.position === 'top') {
    top = rect.top + scrollY - props.offset - 40 // 40 为工具栏预估高度
    left = rect.left + scrollX + rect.width / 2
  } else if (props.position === 'bottom') {
    top = rect.bottom + scrollY + props.offset
    left = rect.left + scrollX + rect.width / 2
  } else if (props.position === 'left') {
    top = rect.top + scrollY + rect.height / 2
    left = rect.left + scrollX - props.offset - 60 // 预估宽度
  } else if (props.position === 'right') {
    top = rect.top + scrollY + rect.height / 2
    left = rect.right + scrollX + props.offset
  }

  toolbarStyle.value = {
    ...toolbarStyle.value,
    top: `${top}px`,
    left: `${left}px`,
    transform:
      props.position === 'top' || props.position === 'bottom'
        ? 'translateX(-50%)'
        : 'translateY(-50%)'
  }

  rafId = requestAnimationFrame(updatePosition)
}

watch(isVisible, (val: boolean) => {
  if (val) {
    updatePosition()
  }
})

onMounted(() => {
  if (isVisible.value) {
    updatePosition()
  }
})

onBeforeUnmount(() => {
  if (rafId) cancelAnimationFrame(rafId)
})
</script>

<style scoped>
.yh-flow-node-toolbar {
  pointer-events: auto;
  border-radius: 6px;
  background: white;
  box-shadow:
    0 10px 15px -3px rgb(0 0 0 / 0.1),
    0 4px 6px -4px rgb(0 0 0 / 0.1);
  border: 1px solid #e2e8f0;
  padding: 4px;
}

.default-toolbar {
  display: flex;
  gap: 4px;
}

.default-toolbar button {
  padding: 4px 8px;
  font-size: 11px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: #475569;
  border-radius: 4px;
}

.default-toolbar button:hover {
  background: #f1f5f9;
  color: #3b82f6;
}
</style>
