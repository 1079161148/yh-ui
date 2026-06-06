<script setup lang="ts">
import { computed } from 'vue'
import type { Node, NodeStyle } from '../../types'

interface Props {
  id: string
  type: string
  data: Node['data']
  selected?: boolean
  dragging?: boolean
  connectable?: boolean
  style?: NodeStyle
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  selected: false,
  dragging: false,
  connectable: true,
  style: () => ({}),
  label: ''
})

const nodeStyle = computed(() => {
  return { ...props.style }
})
</script>

<template>
  <div :class="['flow-database-node', { selected, dragging }]" :style="nodeStyle">
    <div class="yh-flow-node-database__content" :style="data?.style">
      <div class="yh-flow-node-database__top"></div>
      <div class="yh-flow-node-database__body">
        <span class="yh-flow-node-database__label">{{ label || data?.label }}</span>
      </div>
      <!-- Handles -->
      <div
        v-if="connectable"
        class="flow-handle position-top"
        data-handle-type="target"
        data-handle-position="top"
      >
      </div>
      <div
        v-if="connectable"
        class="flow-handle position-bottom"
        data-handle-type="source"
        data-handle-position="bottom"
      ></div>
      <div
        v-if="connectable"
        class="flow-handle position-left"
        data-handle-type="target"
        data-handle-position="left"
      >
      </div>
      <div
        v-if="connectable"
        class="flow-handle position-right"
        data-handle-type="source"
        data-handle-position="right"
      >
      </div>
    </div>
  </div>
</template>

<style scoped>
.flow-database-node {
  position: relative;
  display: inline-block;
  user-select: none;
  cursor: pointer;
}

.flow-database-node.dragging {
  cursor: grabbing;
}

.yh-flow-node-database__content {
  width: 120px;
  height: 80px;
  position: relative;
}

.yh-flow-node-database__top {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 24px;
  background: white;
  border: 1px solid #1a192b;
  border-radius: 50%;
  z-index: 2;
}

.yh-flow-node-database__body {
  position: absolute;
  top: 12px;
  left: 0;
  width: 100%;
  height: calc(100% - 12px);
  background: white;
  border: 1px solid #1a192b;
  border-top: none;
  /* Combine with the ellipse top */
  border-bottom-left-radius: 50% 12px;
  border-bottom-right-radius: 50% 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.yh-flow-node-database__label {
  font-size: 12px;
  color: #222;
  text-align: center;
  padding: 0 10px;
  margin-top: 10px;
  /* Offset the ellipse top */
}

/* Handles */
.flow-handle {
  position: absolute;
  width: 10px;
  height: 10px;
  background: white;
  border: 1px solid #1a192b;
  border-radius: 50%;
  z-index: 20;
}

.flow-handle.position-top {
  top: 0px;
  left: 50%;
  transform: translate(-50%, -50%);
}

.flow-handle.position-bottom {
  bottom: 0px;
  left: 50%;
  transform: translate(-50%, 50%);
}

.flow-handle.position-left {
  left: 0px;
  top: 50%;
  transform: translate(-50%, -50%);
}

.flow-handle.position-right {
  right: 0px;
  top: 50%;
  transform: translate(50%, -50%);
}
</style>
