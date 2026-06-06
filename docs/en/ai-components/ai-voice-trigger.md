---
title: AiVoiceTrigger
description: AiVoiceTrigger is a smart voice wake-up component featuring engaging microphone interactions and responsive waveform animations to simulate real-time AI listening feedback.
---

# AiVoiceTrigger

An intelligent voice interaction component that provides a sleek, float-over experience and supports custom audio waveform tracking to showcase multi-modal feedback.

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils';

const isRecordingBasic = ref(false);

const isRecordingAmplitudes = ref(false);
const amplitudes = ref<number[]>([10, 25, 15, 30, 20, 35, 10, 20, 15, 25, 15, 20]);

let ampsTimer: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
  ampsTimer = setInterval(() => {
    if(isRecordingAmplitudes.value) {
       amplitudes.value = Array.from({length: 12}, () => 10 + Math.random() * 25);
    }
  }, 100);
});

onUnmounted(() => {
  if (ampsTimer) clearInterval(ampsTimer);
});

const isRecordingEvent = ref(false)

const onStart = () => {
  console.log('Voice recording started...');
};

const onStop = () => {
  console.log('Voice recording stopped.');
};

const onCancel = () => {
  console.log('Voice recording cancelled.');
};

const tsBasic = `<${_T}>
  <div style="height: 120px; display: flex; align-items: center; justify-content: center; background: var(--yh-bg-color-page); border-radius: 8px;">
    <yh-ai-voice-trigger v-model:recording="isRecording" />
  </div>
  <div style="text-align: center; margin-top: 10px; font-size: 13px; color: var(--yh-text-color-secondary);">
    State: {{ isRecording ? 'Recording' : 'Idle' }}
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue';

const isRecording = ref(false);
</${_S}>`;

const tsAmplitudes = `<${_T}>
  <div style="height: 120px; display: flex; align-items: center; justify-content: center; background: var(--yh-bg-color-page); border-radius: 8px;">
    <yh-ai-voice-trigger v-model:recording="isRecording" :amplitudes="amplitudes" />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const isRecording = ref(false);
const amplitudes = ref<number[]>([10, 25, 15, 30, 20, 35, 10, 20, 15, 25, 15, 20]);

let timer: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
  // Simulating real-time waveform feed
  timer = setInterval(() => {
    if(isRecording.value) {
       amplitudes.value = Array.from({length: 12}, () => 10 + Math.random() * 25);
    }
  }, 100);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</${_S}>`;

const tsEvent = `<${_T}>
  <div style="height: 120px; display: flex; align-items: center; justify-content: center; background: var(--yh-bg-color-page); border-radius: 8px;">
    <yh-ai-voice-trigger 
      v-model:recording="isRecording" 
      @start="onStart"
      @stop="onStop"
      @cancel="onCancel"
    >
      Click to Speak
    </yh-ai-voice-trigger>
  </div>
  <div style="text-align: center; margin-top: 10px; font-size: 13px; color: var(--yh-text-color-secondary);">
    Please open Developer Tool (F12) to inspect the logs
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue';

const isRecording = ref(false);

const onStart = () => {
  console.log('Voice recording started...');
};

const onStop = () => {
  console.log('Voice recording stopped.');
};

const onCancel = () => {
  console.log('Voice recording cancelled.');
};
</${_S}>`;

const jsBasic = toJs(tsBasic);
const jsAmplitudes = toJs(tsAmplitudes);
const jsEvent = toJs(tsEvent);

const isRecordingChat = ref(false);
const isProcessing = ref(false);
const chatAmplitudes = ref<number[]>([]);
const userMessage = ref('');
const assistantMessage = ref('');

let chatTimer: ReturnType<typeof setInterval> | null = null;
let chatReplyTimer: ReturnType<typeof setTimeout> | null = null;

const onVoiceStart = () => {
  userMessage.value = '';
  assistantMessage.value = '';
  isProcessing.value = false;
  
  if (chatTimer) clearInterval(chatTimer);
  chatTimer = setInterval(() => {
    if(isRecordingChat.value) {
      chatAmplitudes.value = Array.from({length: 12}, () => 10 + Math.random() * 25);
    }
  }, 100);
};

const onVoiceStop = () => {
  if (chatTimer) clearInterval(chatTimer);
  
  userMessage.value = 'What is the weather like today?';
  isProcessing.value = true;
  assistantMessage.value = '';
  
  if (chatReplyTimer) clearTimeout(chatReplyTimer);
  chatReplyTimer = setTimeout(() => {
    isProcessing.value = false;
    assistantMessage.value = 'It is sunny today, with temperature around 22°C - 28°C. Perfect for outdoor activities!';
  }, 1500);
};

const onVoiceCancel = () => {
  if (chatTimer) clearInterval(chatTimer);
};

const tsChat = `<${_T}>
  <div style="height: 400px; display: flex; flex-direction: column; background: var(--yh-bg-color-page); border-radius: 8px; overflow: hidden; border: 1px solid var(--yh-border-color-light);">
    <div style="flex: 1; padding: 16px; overflow-y: auto; display: flex; flex-direction: column; gap: 16px;">
      <yh-ai-bubble role="assistant" content="Hello! I am your voice assistant. Click the microphone below to talk to me." />
      <yh-ai-bubble v-if="userMessage" role="user" :content="userMessage" />
      <yh-ai-bubble v-if="isProcessing || assistantMessage" role="assistant" :loading="isProcessing" :content="assistantMessage" />
    </div>
    
    <div style="padding: 16px; border-top: 1px solid var(--yh-border-color-light); background: var(--yh-bg-color);">
      <div style="display: flex; justify-content: center;">
        <yh-ai-voice-trigger 
          v-model:recording="isRecordingChat"
          :amplitudes="chatAmplitudes"
          @start="onVoiceStart"
          @stop="onVoiceStop"
          @cancel="onVoiceCancel"
        >
          Click to Speak
        </yh-ai-voice-trigger>
      </div>
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue';

const isRecordingChat = ref(false);
const isProcessing = ref(false);
const chatAmplitudes = ref<number[]>([]);
const userMessage = ref('');
const assistantMessage = ref('');

let timer: ReturnType<typeof setInterval> | null = null;
let replyTimer: ReturnType<typeof setTimeout> | null = null;

const onVoiceStart = () => {
  userMessage.value = '';
  assistantMessage.value = '';
  isProcessing.value = false;
  
  if (timer) clearInterval(timer);
  timer = setInterval(() => {
    if(isRecordingChat.value) {
      chatAmplitudes.value = Array.from({length: 12}, () => 10 + Math.random() * 25);
    }
  }, 100);
};

const onVoiceStop = () => {
  if (timer) clearInterval(timer);
  
  userMessage.value = 'What is the weather like today?';
  isProcessing.value = true;
  assistantMessage.value = '';
  
  if (replyTimer) clearTimeout(replyTimer);
  replyTimer = setTimeout(() => {
    isProcessing.value = false;
    assistantMessage.value = 'It is sunny today, with temperature around 22°C - 28°C. Perfect for outdoor activities!';
  }, 1500);
};

const onVoiceCancel = () => {
  if (timer) clearInterval(timer);
};
</${_S}>`;

const jsChat = toJs(tsChat);
</script>

## Basic Usage

The simplest way is using `v-model:recording` to directly bind the recording state. Clicking on the mic triggers the visualizer panel.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="height: 120px; display: flex; align-items: center; justify-content: center; background: var(--yh-bg-color-page); border-radius: 8px;">
    <yh-ai-voice-trigger v-model:recording="isRecordingBasic" />
  </div>
  <div style="text-align: center; margin-top: 10px; font-size: 13px; color: var(--yh-text-color-secondary);">
    State: {{ isRecordingBasic ? 'Recording' : 'Idle' }}
  </div>
</DemoBlock>

## Dynamic Amplitudes Bar

Pass an array to `amplitudes` property dynamically during recording loop to visualize biometric traits or simulated multi-modal input. (Ideally bound to Web Audio API outputs)

<DemoBlock title="Real-time Audio Simulation" :ts-code="tsAmplitudes" :js-code="jsAmplitudes">
  <div style="height: 120px; display: flex; align-items: center; justify-content: center; background: var(--yh-bg-color-page); border-radius: 8px;">
    <yh-ai-voice-trigger v-model:recording="isRecordingAmplitudes" :amplitudes="amplitudes" />
  </div>
</DemoBlock>

## Capturing Events

Listening to `@start`, `@stop` and `@cancel` can help you bridge the component exactly to your core WebSocket streaming API without data leakages. Text inside default slot will also append directly.

<DemoBlock title="Trigger Callbacks" :ts-code="tsEvent" :js-code="jsEvent">
  <div style="height: 120px; display: flex; align-items: center; justify-content: center; background: var(--yh-bg-color-page); border-radius: 8px;">
    <yh-ai-voice-trigger 
      v-model:recording="isRecordingEvent"
      @start="onStart"
      @stop="onStop"
      @cancel="onCancel"
    >
      Click to Speak
    </yh-ai-voice-trigger>
  </div>
  <div style="text-align: center; margin-top: 10px; font-size: 13px; color: var(--yh-text-color-secondary);">
    Please open Developer Tool (F12) to inspect the logs
  </div>
</DemoBlock>

## Practical Scenario: Voice Assistant

By combining the `AiVoiceTrigger` and `AiBubble` components, we can easily build a smart voice assistant interface featuring voice input, loading states, and responsive chat bubbles.

<DemoBlock title="Application Scenario" :ts-code="tsChat" :js-code="jsChat">
  <div style="height: 400px; display: flex; flex-direction: column; background: var(--yh-bg-color-page); border-radius: 8px; overflow: hidden; border: 1px solid var(--yh-border-color-light);">
    <div style="flex: 1; padding: 16px; overflow-y: auto; display: flex; flex-direction: column; gap: 16px;">
      <yh-ai-bubble role="assistant" content="Hello! I am your voice assistant. Click the microphone below to talk to me." />
      <yh-ai-bubble v-if="userMessage" role="user" :content="userMessage" />
      <yh-ai-bubble v-if="isProcessing || assistantMessage" role="assistant" :loading="isProcessing" :content="assistantMessage" />
    </div>
    <div style="padding: 16px; border-top: 1px solid var(--yh-border-color-light); background: var(--yh-bg-color);">
      <div style="display: flex; justify-content: center;">
        <yh-ai-voice-trigger 
          v-model:recording="isRecordingChat"
          :amplitudes="chatAmplitudes"
          @start="onVoiceStart"
          @stop="onVoiceStop"
          @cancel="onVoiceCancel"
        >
          Click to Speak
        </yh-ai-voice-trigger>
      </div>
    </div>
  </div>
</DemoBlock>

## API

### Props

| Attribute                     | Description                                      | Type                 | Default       |
| ----------------------------- | ------------------------------------------------ | -------------------- | ------------- |
| recording / v-model:recording | Whether the voice trigger is active.             | `boolean`            | `false`       |
| amplitudes                    | Real-time array determining the visualizer bars. | `number[]`           | `[5,5,5,...]` |
| theme-overrides               | Fine-grained theme overrides                     | `ComponentThemeVars` | —             |

### Events

| Event Name       | Description                                                      | Parameters         |
| ---------------- | ---------------------------------------------------------------- | ------------------ |
| update:recording | Emits state update back to model.                                | `(value: boolean)` |
| start            | Triggered when active recording initiated.                       | —                  |
| stop             | Triggered when users press the recording button again to submit. | —                  |
| cancel           | Users explicitly hit the dismiss key to discard audio chunk.     | —                  |

### Slots

| Slot Name | Description                                             | Parameters |
| --------- | ------------------------------------------------------- | ---------- |
| default   | Placeholder label text accompanying the minimal mic dot | —          |

## Use in Nuxt

This component fully supports Nuxt 3/4. In Nuxt projects, the component will be automatically imported.

For detailed configuration, please see [Nuxt Integration](/guide/nuxt).

## Theme Variables

| Variable Name                        | Description                   | Default Value                |
| ------------------------------------ | ----------------------------- | ---------------------------- |
| `--yh-ai-voice-trigger-btn-size`     | Trigger button size           | `32px`                       |
| `--yh-ai-voice-trigger-active-color` | Active color during recording | `var(--yh-color-danger)`     |
| `--yh-ai-voice-trigger-wave-color`   | Waveform color                | `var(--yh-color-danger)`     |
| `--yh-ai-voice-trigger-bg`           | Panel background color        | `var(--yh-bg-color-overlay)` |
