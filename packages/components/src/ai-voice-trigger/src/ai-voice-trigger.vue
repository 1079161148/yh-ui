<script setup lang="ts">
import { useNamespace, useLocale } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'
import { computed, ref, onBeforeUnmount } from 'vue'
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
const simulatedAmplitudes = ref<number[]>([])

const syncAmplitudes = () => {
  // If not providing real amplitudes, we can simulate them randomly to look cool
  if (props.amplitudes && props.amplitudes.length > 0 && props.amplitudes.some((a) => a !== 5)) {
    simulatedAmplitudes.value = [...props.amplitudes]
  } else {
    // Generate organic-looking waves
    simulatedAmplitudes.value = Array.from({ length: 20 }, () => 10 + Math.random() * 40)
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
  <div :class="[ns.b(), ns.is('recording', props.recording || localRecording)]" :style="themeStyle">
    <div :class="ns.e('body')">
      <!-- Waveform Visualizer -->
      <Transition name="yh-voice-expand">
        <div v-if="props.recording || localRecording" :class="ns.e('visualizer')">
          <div :class="ns.e('bars')">
            <span
              v-for="(amp, i) in simulatedAmplitudes"
              :key="i"
              :style="{ height: amp + 'px' }"
              :class="ns.e('bar')"
            ></span>
          </div>
          <span :class="ns.e('hint')">{{ t('ai.voice.listening') || 'Listening...' }}</span>
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
          <YhIcon :name="props.recording || localRecording ? 'video-pause' : 'microphone'" />
        </span>
        <span v-if="!(props.recording || localRecording)" :class="ns.e('label')">
          <slot>{{ t('ai.voice.trigger') || '' }}</slot>
        </span>
      </button>
    </div>
  </div>
</template>

<style lang="scss">
@use './ai-voice-trigger.scss';
</style>
