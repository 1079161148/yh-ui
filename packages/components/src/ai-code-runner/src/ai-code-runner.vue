<script setup lang="ts">
import { useNamespace, useLocale } from '@yh-ui/hooks'
import { ref, onMounted, onBeforeUnmount, computed, watch, shallowRef, nextTick } from 'vue'
import { YhButton } from '../../button'
import { YhIcon } from '../../icon'
import { aiCodeRunnerProps, aiCodeRunnerEmits, type AiCodeRunnerExpose } from './ai-code-runner'
import { useComponentTheme } from '@yh-ui/theme'
import { getWebContainerInstance } from './webcontainer'

defineOptions({
  name: 'YhAiCodeRunner'
})

const props = defineProps(aiCodeRunnerProps)
const emit = defineEmits(aiCodeRunnerEmits)

const ns = useNamespace('ai-code-runner')
const { t } = useLocale()
const { themeStyle } = useComponentTheme('ai-code-runner', props.themeOverrides)

const webcontainerInstance = shallowRef<Awaited<ReturnType<typeof getWebContainerInstance>> | null>(
  null
)
const isRunning = ref(false)
const output = ref<string[]>([])
const terminalRef = ref<HTMLElement>()

const terminalHeight = computed(() => {
  if (typeof props.height === 'number') {
    return `${props.height}px`
  }
  return props.height
})

const addOutput = (data: string, type: 'log' | 'error' = 'log') => {
  const timestamp = new Date().toLocaleTimeString()
  const prefix = type === 'error' ? '[error]' : '>'
  output.value.push(`[${timestamp}] ${prefix} ${data}`)
  nextTick(() => {
    if (terminalRef.value) {
      terminalRef.value.scrollTop = terminalRef.value.scrollHeight
    }
  })
}

const initWebContainer = async () => {
  try {
    if (!webcontainerInstance.value) {
      webcontainerInstance.value = await getWebContainerInstance()
      emit('ready', webcontainerInstance.value)
      addOutput('WebContainer 初始化完成', 'log')
    }
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : 'Unknown error'
    addOutput(`WebContainer 初始化失败: ${errMsg}`, 'error')
    emit('error', errMsg)
  }
}

const runCode = async () => {
  if (!props.code || isRunning.value) return

  try {
    if (!webcontainerInstance.value) {
      await initWebContainer()
    }

    const container = webcontainerInstance.value
    if (!container) {
      throw new Error('WebContainer 未就绪')
    }

    isRunning.value = true
    output.value = []
    addOutput('开始执行代码...', 'log')
    emit('run', props.code)

    // 1. 挂载文件系统
    await container.mount({
      'index.js': {
        file: {
          contents: props.code
        }
      }
    })

    // 2. 启动进程
    const shellProcess = await container.spawn('node', ['index.js'])

    // 监听输出流
    shellProcess.output.pipeTo(
      new WritableStream({
        write(data) {
          // 去除 ANSI 颜色字符
          const cleanData = data.replace(/\x1b\[[0-9;]*m/g, '')
          // 分词并入栈
          cleanData
            .split('\n')
            .filter(Boolean)
            .forEach((line: string) => {
              addOutput(line, 'log')
              emit('output', line)
            })
        }
      })
    )

    // 3. 等待进程结束
    const exitCode = await shellProcess.exit

    if (exitCode === 0) {
      addOutput('执行完成', 'log')
    } else {
      addOutput(`执行失败，退出码: ${exitCode ?? 'unknown'}`, 'error')
    }
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error)
    addOutput(`执行出错: ${errMsg}`, 'error')
    emit('error', errMsg)
  } finally {
    isRunning.value = false
  }
}

const stopCode = () => {
  isRunning.value = false
  addOutput('执行已停止', 'log')
  emit('stop')
}

const clearOutput = () => {
  output.value = []
}

const reset = async () => {
  stopCode()
  output.value = []
  if (webcontainerInstance.value) {
    webcontainerInstance.value = null
    addOutput('WebContainer 已重置', 'log')
  }
}

onMounted(() => {
  initWebContainer()
  if (props.autorun && props.code) {
    runCode()
  }
})

onBeforeUnmount(() => {
  if (webcontainerInstance.value) {
    webcontainerInstance.value = null
  }
})

watch(
  () => props.code,
  () => {
    if (props.autorun) {
      runCode()
    }
  }
)

defineExpose<AiCodeRunnerExpose>({
  run: runCode,
  stop: stopCode,
  reset,
  clear: clearOutput
})
</script>

<template>
  <div :class="ns.b()" :style="themeStyle">
    <div :class="ns.e('toolbar')">
      <YhButton v-if="!isRunning" type="primary" size="small" :disabled="!code" @click="runCode">
        <template #icon>
          <YhIcon name="video-play" />
        </template>
        {{ t('ai.codeRunner.run') }}
      </YhButton>
      <YhButton v-else type="danger" size="small" @click="stopCode">
        <template #icon>
          <YhIcon name="video-pause" />
        </template>
        {{ t('ai.codeRunner.stop') }}
      </YhButton>
      <YhButton size="small" @click="clearOutput">
        <template #icon>
          <YhIcon name="delete" />
        </template>
        {{ t('ai.codeRunner.clear') }}
      </YhButton>
      <YhButton size="small" @click="reset">
        <template #icon>
          <YhIcon name="refresh" />
        </template>
        {{ t('ai.codeRunner.reset') }}
      </YhButton>
    </div>
    <div ref="terminalRef" :class="ns.e('terminal')" :style="{ height: terminalHeight }">
      <div v-if="output.length === 0" :class="ns.e('placeholder')">
        {{ t('ai.codeRunner.placeholder') }}
      </div>
      <div
        v-for="(line, index) in output"
        :key="index"
        :class="[ns.e('line'), line.includes('[error]') ? ns.m('error') : '']"
      >
        {{ line }}
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use './ai-code-runner.scss';
</style>
