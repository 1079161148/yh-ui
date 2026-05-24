<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

const BUTTON_SIZE = 44
const BUTTON_OFFSET_RIGHT = 24
const BUTTON_OFFSET_BOTTOM = 24

const visible = ref(false)
const dragging = ref(false)
const dragStart = reactive({ x: 0, y: 0 })
const position = reactive({ x: 0, y: 0 })
const hasDragged = ref(false)
const hasCustomPosition = ref(false)

function getDefaultPosition() {
  return clampPosition(
    window.innerWidth - BUTTON_SIZE - BUTTON_OFFSET_RIGHT,
    window.innerHeight - BUTTON_SIZE - BUTTON_OFFSET_BOTTOM
  )
}

function clampPosition(x: number, y: number) {
  return {
    x: Math.max(
      BUTTON_OFFSET_RIGHT,
      Math.min(x, window.innerWidth - BUTTON_SIZE - BUTTON_OFFSET_RIGHT)
    ),
    y: Math.max(
      BUTTON_OFFSET_BOTTOM,
      Math.min(y, window.innerHeight - BUTTON_SIZE - BUTTON_OFFSET_BOTTOM)
    )
  }
}

function syncDefaultPosition() {
  const next = getDefaultPosition()
  syncPosition(next.x, next.y)
}

function syncPosition(x: number, y: number) {
  const next = clampPosition(x, y)
  position.x = next.x
  position.y = next.y
}

function handleWindowResize() {
  if (!hasCustomPosition.value) {
    syncDefaultPosition()
    return
  }

  syncPosition(position.x, position.y)
}

onMounted(() => {
  syncDefaultPosition()
  window.addEventListener('resize', handleWindowResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleWindowResize)
})

function onMouseDown(e: MouseEvent) {
  if (e.button !== 0) return
  dragging.value = true
  hasDragged.value = false
  dragStart.x = e.clientX - position.x
  dragStart.y = e.clientY - position.y
  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
}

function onMouseMove(e: MouseEvent) {
  if (!dragging.value) return
  const dx = e.clientX - dragStart.x
  const dy = e.clientY - dragStart.y
  if (Math.abs(dx - position.x) > 3 || Math.abs(dy - position.y) > 3) {
    hasDragged.value = true
    hasCustomPosition.value = true
  }
  syncPosition(dx, dy)
}

function onMouseUp() {
  dragging.value = false
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseup', onMouseUp)
}

function onButtonClick() {
  if (hasDragged.value) return
  visible.value = true
}

const presetColors = [
  '#1677ff',
  '#52c41a',
  '#faad14',
  '#eb2f96',
  '#722ed1',
  '#13c2c2',
  '#f5222d',
  '#fa8c16'
]

const layoutIcons: Record<'side' | 'top', string> = {
  side: '\u2502\u2502\u2502',
  top: '\u2550\u2550\u2550'
}
</script>

<template>
  <Teleport to="body">
    <div
      :class="['global-config-btn', { dragging }]"
      :style="{ left: position.x + 'px', top: position.y + 'px' }"
      @mousedown="onMouseDown"
      @click="onButtonClick"
    >
      <YhIcon name="setting" class="config-icon" :size="18" />
    </div>

    <YhDrawer v-model:model-value="visible" title="系统配置" placement="right" :size="320">
      <div class="config-panel">
        <div class="config-block">
          <div class="config-block-title">整体风格</div>
          <div class="config-row">
            <span class="config-label">主题模式</span>
            <YhSwitch
              :model-value="appStore.isDark"
              active-text="暗色"
              inactive-text="亮色"
              @change="appStore.toggleTheme()"
            />
          </div>
          <div class="config-row">
            <span class="config-label">主题色</span>
            <YhColorPicker
              :model-value="appStore.primaryColor"
              @change="appStore.setPrimaryColor($event as string)"
            />
          </div>
          <div class="color-palette">
            <div
              v-for="color in presetColors"
              :key="color"
              :class="['color-item', { active: appStore.primaryColor === color }]"
              :style="{ backgroundColor: color }"
              @click="appStore.setPrimaryColor(color)"
            />
          </div>
        </div>

        <YhDivider />

        <div class="config-block">
          <div class="config-block-title">布局设置</div>
          <div class="config-row">
            <span class="config-label">导航模式</span>
            <div class="layout-options">
              <div
                v-for="(icon, mode) in layoutIcons"
                :key="mode"
                :class="['layout-option', { active: appStore.layout === mode }]"
                @click="appStore.setLayout(mode)"
              >
                <span class="layout-icon">{{ icon }}</span>
                <span class="layout-text">{{ { side: '侧边', top: '顶部' }[mode] }}</span>
              </div>
            </div>
          </div>
          <div class="config-row">
            <span class="config-label">内容区域宽度</span>
            <YhRadioGroup
              :model-value="appStore.contentWidth"
              @update:model-value="appStore.contentWidth = $event as any"
            >
              <YhRadioButton value="fluid">自适应</YhRadioButton>
              <YhRadioButton value="fixed">定宽</YhRadioButton>
            </YhRadioGroup>
          </div>
          <div class="config-row">
            <span class="config-label">菜单手风琴</span>
            <YhSwitch
              :model-value="appStore.accordionMenu"
              @change="appStore.accordionMenu = $event as boolean"
            />
          </div>
        </div>

        <YhDivider />

        <div class="config-block">
          <div class="config-block-title">界面显示</div>
          <div class="config-row">
            <span class="config-label">显示顶栏</span>
            <YhSwitch
              :model-value="appStore.showHeader"
              @change="appStore.showHeader = $event as boolean"
            />
          </div>
          <div class="config-row">
            <span class="config-label">固定页头</span>
            <YhSwitch
              :model-value="appStore.fixedHeader"
              @change="appStore.fixedHeader = $event as boolean"
            />
          </div>
          <div class="config-row">
            <span class="config-label">显示页脚</span>
            <YhSwitch
              :model-value="appStore.showFooter"
              @change="appStore.showFooter = $event as boolean"
            />
          </div>
          <div class="config-row">
            <span class="config-label">显示 Logo</span>
            <YhSwitch
              :model-value="appStore.showLogo"
              @change="appStore.showLogo = $event as boolean"
            />
          </div>
          <div class="config-row">
            <span class="config-label">显示多标签</span>
            <YhSwitch
              :model-value="appStore.showTabs"
              @change="appStore.showTabs = $event as boolean"
            />
          </div>
        </div>

        <YhDivider />

        <div class="config-block">
          <div class="config-block-title">其他设置</div>
          <div class="config-row">
            <span class="config-label">组件尺寸</span>
            <YhRadioGroup
              :model-value="appStore.size"
              @update:model-value="appStore.setSize($event as any)"
            >
              <YhRadioButton value="large">大</YhRadioButton>
              <YhRadioButton value="default">中</YhRadioButton>
              <YhRadioButton value="small">小</YhRadioButton>
            </YhRadioGroup>
          </div>
          <div class="config-row">
            <span class="config-label">灰色模式</span>
            <YhSwitch
              :model-value="appStore.grayMode"
              @change="appStore.setGrayMode($event as boolean)"
            />
          </div>
          <div class="config-row">
            <span class="config-label">色弱模式</span>
            <YhSwitch
              :model-value="appStore.colorWeak"
              @change="appStore.setColorWeak($event as boolean)"
            />
          </div>
        </div>

        <YhDivider />

        <div style="text-align: center; padding-top: 8px">
          <YhButton @click="appStore.resetAll()">
            <YhIcon name="refresh" :size="14" style="margin-right: 4px" />
            重置配置
          </YhButton>
        </div>
      </div>
    </YhDrawer>
  </Teleport>
</template>

<style scoped>
.global-config-btn {
  position: fixed;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--admin-primary);
  color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  cursor: grab;
  z-index: 999;
  user-select: none;
  transition:
    box-shadow 0.2s ease,
    transform 0.1s ease;
}

.global-config-btn:hover {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
  transform: scale(1.08);
}

.global-config-btn.dragging {
  cursor: grabbing;
  transform: scale(1.08);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
}

.config-icon {
  width: 18px;
  height: 18px;
  color: inherit;
  flex: 0 0 auto;
  line-height: 1;
}

.config-panel {
  padding-bottom: 16px;
  overflow-x: hidden;
}

.config-block {
  padding: 4px 0;
  min-width: 0;
}

.config-block-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--admin-text);
  margin-bottom: 12px;
  padding-left: 4px;
  border-left: 3px solid var(--admin-primary);
  line-height: 1.4;
}

.config-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 0;
  gap: 12px;
  flex-wrap: nowrap;
  min-width: 0;
}

.config-label {
  font-size: 13px;
  color: var(--admin-text-secondary);
  flex: 0 0 90px;
  white-space: nowrap;
}

.config-row > :not(.config-label) {
  margin-left: auto;
  flex: 0 1 auto;
  min-width: 0;
  max-width: calc(100% - 102px);
}

.config-row :deep(.yh-radio-group) {
  display: inline-flex;
  flex-wrap: nowrap;
  white-space: nowrap;
  max-width: 100%;
  overflow: hidden;
}

.config-row :deep(.yh-radio-button) {
  flex: 0 0 auto;
}

.config-row :deep(.yh-radio-button__inner) {
  padding: 0 10px;
  font-size: 12px;
}

.color-palette {
  display: flex;
  gap: 8px;
  margin-top: 8px;
  flex-wrap: wrap;
}

.color-item {
  width: 26px;
  height: 26px;
  border-radius: 6px;
  cursor: pointer;
  border: 2px solid transparent;
  transition:
    border-color 0.2s ease,
    transform 0.15s ease;
}

.color-item:hover {
  transform: scale(1.2);
}

.color-item.active {
  border-color: var(--admin-text);
  box-shadow: 0 0 0 2px var(--admin-primary-light);
}

.layout-options {
  display: flex;
  gap: 6px;
  flex-wrap: nowrap;
  max-width: 100%;
}

.layout-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 6px 8px;
  border: 1.5px solid var(--admin-border);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 0 0 auto;
  min-width: 0;
}

.layout-option:hover {
  border-color: var(--admin-primary);
}

.layout-option.active {
  border-color: var(--admin-primary);
  background: var(--admin-primary-light);
  color: var(--admin-primary);
}

.layout-icon {
  font-size: 16px;
  line-height: 1;
}

.layout-text {
  font-size: 11px;
}
</style>
