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
  <div :class="['flow-diamond-node', { selected, dragging }]" :style="nodeStyle">
    <!-- Decision Node (Diamond shape using CSS transform) -->
    <div class="yh-flow-node-diamond__content">
      <div class="yh-flow-node-diamond__shape" :style="data?.style">
        <span class="yh-flow-node-diamond__label">{{ label || data?.label }}</span>
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
        data-handle-type="source"
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
.flow-diamond-node {
  position: relative;
  display: inline-block;
  user-select: none;
  cursor: pointer;
}

.flow-diamond-node.dragging {
  cursor: grabbing;
}

.yh-flow-node-diamond__content {
  position: relative;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.yh-flow-node-diamond__shape {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  border: 1px solid #1a192b;
  border-radius: 4px;
  transform: rotate(45deg);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.yh-flow-node-diamond__label {
  position: relative;
  z-index: 10;
  font-size: 12px;
  color: #222;
  text-align: center;
  max-width: 70px;
  transform: rotate(0deg);
  /* keep text straight */
}

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
