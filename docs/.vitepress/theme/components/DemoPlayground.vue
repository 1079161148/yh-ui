<script setup lang="ts">
import { computed, markRaw, onMounted, ref, shallowRef } from 'vue'
import { useData, withBase } from 'vitepress'
import { createPlaygroundProject, decodePlaygroundPayload } from '../utils/demo-sandbox'

const { isDark } = useData()
const siteBase = withBase('/')
const vueRuntimeUrl = new URL('../playground/vue-runtime.js', import.meta.url).toString()
const vueServerRendererUrl = new URL(
  '../playground/vue-server-renderer.js',
  import.meta.url
).toString()

// 从 URL 解析 demo payload
const payload = computed(() => {
  if (typeof window === 'undefined') return null
  const query = new URLSearchParams(window.location.search)
  return decodePlaygroundPayload(query.get('demo') || '')
})

const title = ref('YH-UI Playground')
const loading = ref(true)
const errorMessage = ref('')

// 使用 shallowRef 避免对 @vue/repl 组件进行深层响应式代理（性能最佳实践）
const replComponent = shallowRef<object>()
const editorComponent = shallowRef<object>()
const store = shallowRef<object>()

const previewOptions = ref<{
  headHTML?: string
  customCode?: { importCode?: string; useCode?: string }
  showRuntimeError?: boolean
  showRuntimeWarning?: boolean
}>({})

onMounted(async () => {
  const value = payload.value
  if (!value) {
    errorMessage.value = '参数缺失或无效，请通过文档页面上的"打开 Playground"按钮进入。'
    loading.value = false
    return
  }

  try {
    // 动态导入 @vue/repl 以避免 SSR 构建错误
    const [replModule, editorModule] = await Promise.all([
      import('@vue/repl'),
      import('@vue/repl/codemirror-editor')
    ])

    const { Repl, useStore, useVueImportMap, mergeImportMap } = replModule

    replComponent.value = markRaw(Repl as object)
    editorComponent.value = markRaw(editorModule.default as object)

    // 构建 playground 项目（ImportMap + 代码 + headHTML + customCode）
    const project = createPlaygroundProject(value.title, value.code, value.context, siteBase)
    title.value = project.title

    // 使用 jsdelivr cdn 的稳定 Vue 运行时（避免受 esm.sh 不稳定影响）
    const { importMap: vueImportMap } = useVueImportMap({
      runtimeDev: vueRuntimeUrl,
      serverRenderer: vueServerRendererUrl
    })

    // 合并 import map：Vue 内置 + 项目依赖
    const mergedImportMap = mergeImportMap(vueImportMap.value, project.importMap)

    // 初始化 store（@vue/repl v4 API：useStore 接受 Partial<StoreState>）
    const playgroundStore = useStore({
      builtinImportMap: vueImportMap
    })

    // 设置文件
    await playgroundStore.setFiles(
      {
        ...playgroundStore.getFiles(),
        'App.vue': project.code,
        'import-map.json': JSON.stringify(mergedImportMap, null, 2)
      },
      'App.vue'
    )

    // 不再手动指定 vueVersion，避免 @vue/repl 尝试从 esm.sh 加载编译器而产生冲突

    // 配置预览选项
    previewOptions.value = {
      headHTML: project.headHTML,
      customCode: {
        importCode: project.importCode,
        useCode: project.useCode
      },
      showRuntimeError: true,
      showRuntimeWarning: true
    }

    store.value = playgroundStore
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    errorMessage.value = `初始化 Playground 失败：${message}`
    console.error('[DemoPlayground] Error:', err)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section class="demo-playground">
    <header class="demo-playground__header">
      <div>
        <p class="demo-playground__eyebrow">YH-UI Playground</p>
        <h1 class="demo-playground__title">{{ title }}</h1>
      </div>
    </header>

    <!-- 错误状态 -->
    <div
      v-if="errorMessage"
      class="demo-playground__state demo-playground__state--error"
      role="alert"
    >
      <svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        aria-hidden="true"
        style="margin-right: 8px; flex-shrink: 0"
      >
        <path
          fill="currentColor"
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
        />
      </svg>
      {{ errorMessage }}
    </div>

    <!-- 加载状态 -->
    <div
      v-else-if="loading"
      class="demo-playground__state"
      role="status"
      aria-label="Loading playground"
    >
      <span class="demo-playground__spinner" aria-hidden="true" />
      <span>正在加载 Playground...</span>
    </div>

    <!-- Playground 主体 -->
    <component
      :is="replComponent"
      v-else-if="replComponent && editorComponent && store"
      :store="store"
      :editor="editorComponent"
      :theme="isDark ? 'dark' : 'light'"
      :preview-options="previewOptions"
      :show-compile-output="false"
      :show-import-map="true"
      :show-ts-config="false"
      :clear-console="false"
      :auto-resize="true"
    />

    <!-- 兜底占位 -->
    <div v-else class="demo-playground__state">准备中...</div>
  </section>
</template>

<style scoped lang="scss">
.demo-playground {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: calc(100vh - 140px);
}

.demo-playground__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.demo-playground__eyebrow {
  margin: 0 0 6px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--vp-c-brand-1);
}

.demo-playground__title {
  margin: 0;
  font-size: 28px;
  line-height: 1.1;
}

.demo-playground__state {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 280px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  color: var(--vp-c-text-2);
  font-size: 14px;
  gap: 8px;
  background:
    radial-gradient(circle at top left, rgba(64, 158, 255, 0.12), transparent 35%),
    var(--vp-c-bg-soft);

  &--error {
    color: var(--vp-c-danger-1, #f53b57);
    border-color: var(--vp-c-danger-2, rgba(245, 59, 87, 0.3));
    background:
      radial-gradient(circle at top left, rgba(245, 59, 87, 0.08), transparent 35%),
      var(--vp-c-bg-soft);
  }
}

.demo-playground__spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid var(--vp-c-divider);
  border-top-color: var(--vp-c-brand-1);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  flex-shrink: 0;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

:deep(.vue-repl) {
  height: calc(100vh - 220px);
  min-height: 720px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 18px;
  overflow: hidden;
}

@media (max-width: 768px) {
  :deep(.vue-repl) {
    height: calc(100vh - 180px);
    min-height: 560px;
  }

  .demo-playground__title {
    font-size: 22px;
  }
}
</style>
