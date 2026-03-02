<script setup lang="ts">
import { useNamespace, useLocale } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'
import { computed, ref, onBeforeUnmount, watch } from 'vue'
import { aiVoiceTriggerProps, aiVoiceTriggerEmits } from './ai-voice-trigger'
import { YhIcon } from '../../icon'

defineOptions({
  name: 'YhAiVoiceTrigger'
})

const props = defineProps(aiVoiceTriggerProps)
const emit = defineEmits(aiVoiceTriggerEmits)

const ns = useNamespace('ai-voice-trigger')
const { t } = useLocale()

const { themeStyle } = useComponentTheme(
  'ai-voice-trigger',
  computed(() => props.themeOverrides)
)

const localRecording = ref(props.recording)
let visualizerTimer: ReturnType<typeof setInterval> | null = null
const simulatedAmplitudes = ref<number[]>(Array(20).fill(5))

/**
 * 核心逻辑升级：通过监听 props.amplitudes 实现真正的 60fps 同步
 * 不再依赖低频的 setInterval 轮询
 */
watch(
  () => props.amplitudes,
  (newAmps) => {
    if (newAmps && newAmps.length > 0) {
      // 检查是否有真实分贝数据（非全默认初始值或 0）
      const hasData = newAmps.some((a) => a > 6 || (a > 0 && a !== 5))
      if (hasData) {
        simulatedAmplitudes.value = [...newAmps]
      }
    }
  },
  { immediate: true, deep: true }
)

const syncAmplitudes = () => {
  // 如果没有外部数据，且处于录音中，则进行自然的随机模拟（保持动感）
  if (props.recording || localRecording.value) {
    const hasData = props.amplitudes && props.amplitudes.some((a) => a > 6 || (a > 0 && a !== 5))
    if (!hasData) {
      simulatedAmplitudes.value = Array.from({ length: 20 }, () => 10 + Math.random() * 40)
    }
  }
}

const toggleRecording = () => {
  if (props.recording === undefined || props.recording === null) {
    localRecording.value = !localRecording.value
    if (localRecording.value) startVisualizer()
    else stopVisualizer()
    return
  }

  const newStatus = !props.recording
  emit('update:recording', newStatus)

  if (newStatus) {
    emit('start')
    startVisualizer()
  } else {
    emit('stop')
    stopVisualizer()
  }
}

const handleCancel = (e: Event) => {
  e.stopPropagation()
  emit('update:recording', false)
  emit('cancel')
  stopVisualizer()
}

const startVisualizer = () => {
  if (visualizerTimer) clearInterval(visualizerTimer)
  // 模拟计时器仅作为无声音输入时的兜底呼吸感动画，频率可以不用太高
  visualizerTimer = setInterval(syncAmplitudes, 150)
}

const stopVisualizer = () => {
  if (visualizerTimer) clearInterval(visualizerTimer)
  simulatedAmplitudes.value = Array(20).fill(5)
}

// Ensure cleanup
onBeforeUnmount(() => {
  if (visualizerTimer) clearInterval(visualizerTimer)
})
</script>

<template>
  <Teleport to="body" :disabled="props.variant === 'inline' || !props.teleport">
    <div
      :class="[
        ns.b(),
        ns.m(props.variant),
        ns.m(props.position),
        ns.is('recording', props.recording || localRecording)
      ]"
      :style="[
        props.variant !== 'inline'
          ? {
              position: props.teleport ? 'fixed' : 'relative',
              [props.position.split('-')[0]]: props.teleport ? props.offset[0] + 'px' : 'auto',
              [props.position.split('-')[1]]: props.teleport ? props.offset[1] + 'px' : 'auto'
            }
          : {},
        themeStyle
      ]"
    >
      <div :class="ns.e('body')">
        <!-- Waveform Visualizer -->
        <Transition name="yh-voice-expand">
          <div v-if="props.recording || localRecording" :class="ns.e('visualizer')">
            <!-- Sphere Visualizer (Pulsing Ball) -->
            <template v-if="props.variant === 'sphere'">
              <div :class="ns.e('sphere-glow')"></div>
              <div
                v-for="i in 3"
                :key="i"
                :class="ns.e('sphere-pulse')"
                :style="{
                  animationDelay: i * 0.5 + 's',
                  transform: `scale(${1 + (simulatedAmplitudes[i] || 0) / 100})`
                }"
              ></div>
            </template>

            <!-- Standard Wave Visualizer -->
            <div v-else :class="ns.e('bars')">
              <span
                v-for="(amp, i) in simulatedAmplitudes"
                :key="i"
                :style="{ height: amp + 'px' }"
                :class="ns.e('bar')"
              ></span>
            </div>

            <span v-if="props.variant !== 'sphere'" :class="ns.e('hint')">{{
              t('ai.voice.listening') || 'Listening...'
            }}</span>

            <!-- Cancel Button -->
            <button :class="ns.e('cancel')" @click="handleCancel" title="Cancel">
              <YhIcon name="close" />
            </button>
          </div>
        </Transition>

        <!-- Main Trigger Button -->
        <button
          :class="[ns.e('trigger'), { 'is-active': props.recording || localRecording }]"
          @click="toggleRecording"
        >
          <span :class="ns.e('mic')">
            <template v-if="props.variant === 'sphere' && (props.recording || localRecording)">
              <div :class="ns.e('sphere-inner')"></div>
            </template>
            <YhIcon
              v-else
              :name="props.recording || localRecording ? 'video-pause' : 'microphone'"
            />
          </span>
          <span
            v-if="!(props.recording || localRecording) && props.variant === 'inline'"
            :class="ns.e('label')"
          >
            <slot>{{ t('ai.voice.trigger') || '' }}</slot>
          </span>
        </button>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss">
@use './ai-voice-trigger.scss';
</style>
