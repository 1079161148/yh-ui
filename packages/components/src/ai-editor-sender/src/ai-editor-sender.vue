<script setup lang="ts">
import { useNamespace } from '@yh-ui/hooks'
import { ref, computed, watch, nextTick } from 'vue'
import {
  aiEditorSenderProps,
  aiEditorSenderEmits,
  type AttachmentItem,
  type AiCommandItem
} from './ai-editor-sender'
import { YhButton } from '../../button'
import { YhIcon } from '../../icon'
import { useComponentTheme } from '@yh-ui/theme'

defineOptions({
  name: 'YhAiEditorSender'
})

const props = defineProps(aiEditorSenderProps)
const emit = defineEmits(aiEditorSenderEmits)

const ns = useNamespace('ai-editor-sender')
const { themeStyle } = useComponentTheme('ai-editor-sender', props.themeOverrides)

const textareaRef = ref<HTMLTextAreaElement>()
const localValue = ref(props.modelValue)
const isFocused = ref(false)

// 命令菜单相关状态
const showCommandPanel = ref(false)
const commandSearchText = ref('')
const filteredCommands = ref<AiCommandItem[]>([])
const selectedCommandIndex = ref(0)
const cascadeCommands = ref<AiCommandItem[]>([])
const currentCascadeParent = ref<AiCommandItem | null>(null)
const showCascadePanel = ref(false)
const cascadePosition = ref({ top: 0, left: 0 })

// 监听 modelValue 变化
watch(
  () => props.modelValue,
  (val) => {
    localValue.value = val
  }
)

// 计算属性
const innerValue = computed({
  get: () => localValue.value,
  set: (val: string) => {
    localValue.value = val
    emit('update:modelValue', val)
    emit('change', val)
    // 检测命令触发
    checkCommandTrigger(val)
  }
})

// 自动调整高度
const autoResize = () => {
  const el = textareaRef.value
  if (!el) return
  el.style.height = 'auto'
  el.style.height = `${Math.min(el.scrollHeight, 200)}px`
}

const handleInput = (e: Event) => {
  innerValue.value = (e.target as HTMLTextAreaElement).value
  nextTick(autoResize)
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    if (!innerValue.value.trim() || props.loading || props.disabled) {
      e.preventDefault()
    } else if (showCommandPanel.value) {
      e.preventDefault()
      // 选择当前高亮的命令
      const commands = getAllVisibleCommands()
      if (commands.length > 0 && selectedCommandIndex.value >= 0) {
        selectCommand(commands[selectedCommandIndex.value])
      }
    } else {
      e.preventDefault()
      handleSend()
    }
  } else if (e.key === 'ArrowDown' && showCommandPanel.value) {
    e.preventDefault()
    navigateCommands(1)
  } else if (e.key === 'ArrowUp' && showCommandPanel.value) {
    e.preventDefault()
    navigateCommands(-1)
  } else if (e.key === 'ArrowRight' && showCommandPanel.value && currentCascadeParent.value) {
    // 打开级联面板
    openCascadePanel(currentCascadeParent.value)
  } else if (e.key === 'Escape') {
    hideCommandPanel()
  } else if (e.key === 'Backspace' && !commandSearchText.value) {
    hideCommandPanel()
  }
}

// 检测命令触发
const checkCommandTrigger = (value: string) => {
  if (!props.enableCommands) return

  const _cursorPos = value.length
  const lastSlashIndex = value.lastIndexOf(props.commandTrigger)

  if (lastSlashIndex !== -1) {
    const afterTrigger = value.slice(lastSlashIndex + 1)
    // 检查触发符后是否有空格（如果有空格则不显示命令面板）
    if (afterTrigger.includes(' ')) {
      hideCommandPanel()
      return
    }

    // 显示命令面板
    commandSearchText.value = afterTrigger
    filterCommands(afterTrigger)
    showCommandPanel.value = true
    emit('command-panel-show')
    selectedCommandIndex.value = 0
  } else {
    hideCommandPanel()
  }
}

// 过滤命令
const filterCommands = (keyword: string) => {
  if (!keyword) {
    filteredCommands.value = props.commands.filter((cmd: AiCommandItem) => !cmd.disabled)
    return
  }

  const lowerKeyword = keyword.toLowerCase()
  filteredCommands.value = props.commands.filter((cmd: AiCommandItem) => {
    if (cmd.disabled) return false
    // 匹配标签或关键词
    if (cmd.label.toLowerCase().includes(lowerKeyword)) return true
    if (cmd.keywords?.some((k: string) => k.toLowerCase().includes(lowerKeyword))) return true
    return false
  })
}

// 获取所有可见命令（包含级联子命令）
const getAllVisibleCommands = (): AiCommandItem[] => {
  const commands: AiCommandItem[] = [...filteredCommands.value]
  // 如果有选中的父命令，添加其子命令
  if (currentCascadeParent.value?.children?.length) {
    commands.push(...currentCascadeParent.value.children)
  }
  return commands
}

// 导航命令
const navigateCommands = (direction: number) => {
  const commands = getAllVisibleCommands()
  if (commands.length === 0) return

  selectedCommandIndex.value =
    (selectedCommandIndex.value + direction + commands.length) % commands.length
}

// 选择命令
const selectCommand = (command: AiCommandItem) => {
  if (command.disabled) return

  // 如果有子命令且启用了级联
  if (command.children?.length && props.enableCommandCascade) {
    openCascadePanel(command)
    emit('command-cascade', command, currentCascadeParent.value!)
    return
  }

  // 插入命令到文本
  insertCommandToText(command)
  emit('command-select', command, currentCascadeParent.value || undefined)
  hideCommandPanel()
}

// 打开级联面板
const openCascadePanel = (parent: AiCommandItem) => {
  currentCascadeParent.value = parent
  cascadeCommands.value = parent.children || []
  showCascadePanel.value = true

  // 计算级联面板位置
  nextTick(() => {
    const panel = document.querySelector(`.${ns.b()}-command-panel`)
    if (panel) {
      const rect = panel.getBoundingClientRect()
      cascadePosition.value = {
        left: rect.width + props.cascadeOffset,
        top: 0
      }
    }
  })
}

// 将命令插入文本
const insertCommandToText = (command: AiCommandItem) => {
  const cursorPos = localValue.value.lastIndexOf(props.commandTrigger)
  if (cursorPos !== -1) {
    // 替换触发符及后面的内容为命令标签
    const before = localValue.value.slice(0, cursorPos)
    const after = localValue.value
      .slice(cursorPos)
      .replace(props.commandTrigger + commandSearchText.value, '')
    localValue.value = before + command.label + after
    innerValue.value = localValue.value
  }
}

// 隐藏命令面板
const hideCommandPanel = () => {
  showCommandPanel.value = false
  showCascadePanel.value = false
  commandSearchText.value = ''
  filteredCommands.value = []
  currentCascadeParent.value = null
  emit('command-panel-hide')
}

const handleSend = () => {
  if (!innerValue.value.trim() || props.loading || props.disabled) return
  emit('send', innerValue.value)
  innerValue.value = ''
  nextTick(() => {
    if (textareaRef.value) {
      textareaRef.value.style.height = 'auto'
    }
    hideCommandPanel()
  })
}

const handleRemoveAttachment = (index: number, item: AttachmentItem) => {
  emit('remove-attachment', index, item)
}

// 命令面板位置
const commandPanelStyle = computed(() => ({
  width:
    typeof props.commandPanelWidth === 'number'
      ? props.commandPanelWidth + 'px'
      : props.commandPanelWidth,
  maxHeight: props.commandPanelMaxHeight + 'px'
}))

// 获取命令图标
const getCommandIcon = (command: AiCommandItem): string => {
  if (command.icon) return command.icon
  return 'command'
}

// 暴露方法
defineExpose({
  focus: () => textareaRef.value?.focus(),
  blur: () => textareaRef.value?.blur(),
  clear: () => {
    localValue.value = ''
    hideCommandPanel()
  }
})
</script>

<template>
  <div
    :class="[
      ns.b(),
      ns.is('disabled', disabled),
      ns.is('loading', loading),
      ns.is('focused', isFocused)
    ]"
    :style="themeStyle"
  >
    <!-- Header (Attachments bar) -->
    <div
      v-if="attachments.length > 0 || $slots.header"
      :class="[ns.e('header'), ns.is('empty', attachments.length === 0 && !$slots.header)]"
    >
      <slot name="header">
        <div v-for="(item, index) in attachments" :key="index" :class="ns.e('attachment')">
          <YhIcon :name="item.url ? 'image' : 'document'" :class="ns.e('attachment-icon')" />
          <span>{{ item.name }}</span>
          <YhIcon
            name="close"
            :class="ns.e('attachment-remove')"
            @click="handleRemoveAttachment(index, item)"
          />
        </div>
      </slot>
    </div>

    <!-- Body (Textarea) -->
    <div :class="ns.e('body')">
      <textarea
        ref="textareaRef"
        v-model="innerValue"
        :class="ns.e('textarea')"
        :placeholder="placeholder"
        :disabled="disabled || loading"
        :maxlength="maxLength"
        :rows="rows"
        @focus="isFocused = true"
        @blur="isFocused = false"
        @input="handleInput"
        @keydown="handleKeyDown"
      ></textarea>
    </div>

    <!-- Footer (Toolbar & Actions) -->
    <div :class="ns.e('footer')">
      <!-- Toolbar (Shortcuts) -->
      <div :class="ns.e('toolbar')">
        <slot name="toolbar"></slot>
      </div>

      <!-- Actions -->
      <div :class="ns.e('actions')">
        <span v-if="showWordLimit && maxLength" :class="ns.e('word-limit')">
          {{ innerValue.length }} / {{ maxLength }}
        </span>

        <slot name="actions"></slot>

        <slot
          name="submit"
          :submit="handleSend"
          :disabled="!innerValue.trim() || disabled || loading"
          :loading="loading"
        >
          <YhButton
            :type="innerValue.trim() && !disabled && !loading ? 'primary' : 'default'"
            :class="ns.e('send-btn')"
            :disabled="!innerValue.trim() || disabled"
            :loading="loading"
            circle
            @click="handleSend"
          >
            <template #icon>
              <YhIcon name="send" />
            </template>
          </YhButton>
        </slot>
      </div>
    </div>

    <!-- Command Panel -->
    <Teleport to="body">
      <Transition name="yh-fade-in-scale-up">
        <div v-if="showCommandPanel && enableCommands" :class="ns.e('command-panel-wrapper')">
          <div :class="ns.e('command-panel')" :style="commandPanelStyle">
            <div v-if="commandSearchText" :class="ns.e('command-search')">
              <YhIcon name="search" />
              <span>{{ commandSearchText }}</span>
            </div>

            <div :class="ns.e('command-list')">
              <!-- 主命令列表 -->
              <template v-for="(command, index) in filteredCommands" :key="command.id">
                <div
                  :class="[
                    ns.e('command-item'),
                    ns.is('selected', selectedCommandIndex === index),
                    ns.is('disabled', command.disabled),
                    ns.is('parent', !!command.children?.length)
                  ]"
                  @click="selectCommand(command)"
                  @mouseenter="selectedCommandIndex = index"
                >
                  <YhIcon
                    v-if="showCommandIcon"
                    :name="getCommandIcon(command)"
                    :class="ns.e('command-icon')"
                  />
                  <div :class="ns.e('command-content')">
                    <span :class="ns.e('command-label')">{{ command.label }}</span>
                    <span
                      v-if="showCommandDescription && command.description"
                      :class="ns.e('command-desc')"
                    >
                      {{ command.description }}
                    </span>
                  </div>
                  <YhIcon
                    v-if="command.children?.length"
                    name="chevron-right"
                    :class="ns.e('command-arrow')"
                  />
                </div>

                <!-- 嵌套子命令 -->
                <template v-if="showCascadePanel && currentCascadeParent?.id === command.id">
                  <div
                    v-for="(child, childIndex) in cascadeCommands"
                    :key="`${command.id}-${child.id}`"
                    :class="[
                      ns.e('command-item'),
                      ns.e('command-cascade-item'),
                      ns.is(
                        'selected',
                        selectedCommandIndex === filteredCommands.length + childIndex
                      ),
                      ns.is('disabled', child.disabled)
                    ]"
                    @click="selectCommand(child)"
                    @mouseenter="selectedCommandIndex = filteredCommands.length + childIndex"
                  >
                    <YhIcon
                      v-if="showCommandIcon"
                      :name="getCommandIcon(child)"
                      :class="ns.e('command-icon')"
                    />
                    <div :class="ns.e('command-content')">
                      <span :class="ns.e('command-label')">{{ child.label }}</span>
                      <span
                        v-if="showCommandDescription && child.description"
                        :class="ns.e('command-desc')"
                      >
                        {{ child.description }}
                      </span>
                    </div>
                  </div>
                </template>
              </template>

              <div v-if="filteredCommands.length === 0" :class="ns.e('command-empty')">
                <YhIcon name="search" />
                <span>没有找到匹配的命令</span>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style lang="scss">
@use './ai-editor-sender.scss';
</style>
