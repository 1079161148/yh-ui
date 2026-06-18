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
const { t, lang } = useLocale()
const { themeStyle } = useComponentTheme('ai-code-runner', props.themeOverrides)

const webcontainerInstance = shallowRef<Awaited<ReturnType<typeof getWebContainerInstance>> | null>(
  null
)
const isRunning = ref(false)
const output = ref<string[]>([])
const terminalRef = ref<HTMLElement>()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const activeProcess = shallowRef<any>(null)

/** Map language prop to { filename, command, args } */
const getLanguageRunConfig = (
  lang: string
): { filename: string; command: string; args: string[] } => {
  switch (lang.toLowerCase()) {
    case 'typescript':
    case 'ts':
      return { filename: 'index.ts', command: 'npx', args: ['tsx', 'index.ts'] }
    case 'python':
    case 'py':
    case 'python3':
      return { filename: 'index.py', command: 'python3', args: ['index.py'] }
    case 'ruby':
    case 'rb':
      return { filename: 'index.rb', command: 'ruby', args: ['index.rb'] }
    case 'php':
      return { filename: 'index.php', command: 'php', args: ['index.php'] }
    case 'deno':
      return { filename: 'index.ts', command: 'deno', args: ['run', 'index.ts'] }
    case 'javascript':
    case 'js':
    default:
      return { filename: 'index.js', command: 'node', args: ['index.js'] }
  }
}

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
      addOutput(
        lang.value.startsWith('zh')
          ? 'WebContainer 初始化完成'
          : 'WebContainer initialization completed',
        'log'
      )
    }
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : 'Unknown error'
    addOutput(
      lang.value.startsWith('zh')
        ? `WebContainer 初始化失败: ${errMsg}`
        : `WebContainer initialization failed: ${errMsg}`,
      'error'
    )
    emit('error', errMsg)
  }
}

const runCode = async () => {
  if (!props.code || isRunning.value) return

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let shellProcess: any = null
  try {
    if (!webcontainerInstance.value) {
      await initWebContainer()
    }

    const container = webcontainerInstance.value
    if (!container) {
      throw new Error(
        lang.value.startsWith('zh') ? 'WebContainer 未就绪' : 'WebContainer not ready'
      )
    }

    isRunning.value = true
    output.value = []
    addOutput(lang.value.startsWith('zh') ? '开始执行代码...' : 'Starting code execution...', 'log')
    emit('run', props.code)

    // 1. 挂载文件系统
    const runConfig = getLanguageRunConfig(props.language)
    await container.mount({
      [runConfig.filename]: {
        file: {
          contents: props.code
        }
      }
    })

    // 2. 启动进程
    shellProcess = await container.spawn(runConfig.command, runConfig.args)
    activeProcess.value = shellProcess

    // 监听输出流
    shellProcess.output.pipeTo(
      new WritableStream({
        write(data) {
          if (activeProcess.value !== shellProcess) return
          // 去除 ANSI 颜色字符
          const cleanData = data.replace(/\x1b\[[0-9;]*m/g, '')
          // 分词并入栈
          cleanData
            .split('\n')
            .filter(Boolean)
            .forEach((line: string) => {
              if (activeProcess.value !== shellProcess) return
              addOutput(line, 'log')
              emit('output', line)
            })
        }
      })
    )

    // 3. 等待进程结束
    const exitCode = await shellProcess.exit

    if (activeProcess.value === shellProcess) {
      if (exitCode === 0) {
        addOutput(lang.value.startsWith('zh') ? '执行完成' : 'Execution completed', 'log')
      } else {
        addOutput(
          lang.value.startsWith('zh')
            ? `执行失败，退出码: ${exitCode ?? 'unknown'}`
            : `Execution failed, exit code: ${exitCode ?? 'unknown'}`,
          'error'
        )
      }
    }
  } catch (error) {
    if (activeProcess.value === shellProcess || (!shellProcess && isRunning.value)) {
      const errMsg = error instanceof Error ? error.message : String(error)
      addOutput(
        lang.value.startsWith('zh') ? `执行出错: ${errMsg}` : `Execution error: ${errMsg}`,
        'error'
      )
      emit('error', errMsg)
    }
  } finally {
    if (activeProcess.value === shellProcess || (!shellProcess && isRunning.value)) {
      isRunning.value = false
      if (activeProcess.value === shellProcess) {
        activeProcess.value = null
      }
    }
  }
}

const stopCode = () => {
  if (activeProcess.value) {
    try {
      activeProcess.value.kill()
    } catch {
      // ignore
    }
    activeProcess.value = null
  }
  isRunning.value = false
  addOutput(lang.value.startsWith('zh') ? '执行已停止' : 'Execution stopped', 'log')
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
    addOutput(lang.value.startsWith('zh') ? 'WebContainer 已重置' : 'WebContainer reset', 'log')
  }
}

onMounted(() => {
  if (props.autorun && props.code) {
    runCode()
  }
})

onBeforeUnmount(() => {
  if (activeProcess.value) {
    try {
      activeProcess.value.kill()
    } catch {
      // ignore
    }
    activeProcess.value = null
  }
  if (webcontainerInstance.value) {
    webcontainerInstance.value = null
  }
})

watch(
  () => props.code,
  () => {
    if (props.autorun) {
      // Stop any running process before starting a new autorun
      if (isRunning.value) stopCode()
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
