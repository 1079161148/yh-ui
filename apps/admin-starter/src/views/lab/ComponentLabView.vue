<script setup lang="ts">
import { computed, defineComponent, h, onBeforeUnmount, ref, withDirectives } from 'vue'
import * as YhUI from '@yh-ui/yh-ui'
import { useAiVoice } from '@yh-ui/hooks'
import { useAppStore } from '@/stores/app'

interface YhUIModule {
  [key: string]: unknown
  YhMessage?: {
    success?: (message: string) => void
    warning?: (message: string) => void
  }
  YhNotification?: {
    success?: (title: string, message: string) => void
  }
  YhMessageBox?: {
    alert: (
      message: string,
      title: string,
      options?: Record<string, unknown>
    ) => Promise<{ value: string; action: string }>
    confirm: (message: string, title: string, options?: Record<string, unknown>) => Promise<string>
    prompt: (
      message: string,
      title: string,
      options?: Record<string, unknown>
    ) => Promise<{ value: string; action: string }>
  }
  YhDialogMethod?: {
    show: (options: Record<string, unknown>) => Promise<{ action: string }>
    success: (options: Record<string, unknown>) => Promise<{ action: string }>
    warning: (options: Record<string, unknown>) => Promise<{ action: string }>
    error: (options: Record<string, unknown>) => Promise<{ action: string }>
    info: (options: Record<string, unknown>) => Promise<{ action: string }>
  }
  YhLoading?: {
    service: (options?: Record<string, unknown>) => { close: () => void }
  }
}

interface WaterfallItem {
  id: number
  title: string
  description: string
  height: number
  tag: string
}

const runtimeExports = YhUI as unknown as YhUIModule
const SERVICE_EXPORTS = new Set([
  'YhMessage',
  'YhNotification',
  'YhMessageBox',
  'YhDialogMethod',
  'YhLoading'
])
const SERVICE_METHOD_SUMMARY =
  'MessageBox(alert/confirm/prompt) · DialogMethod(show/success/warning/error/info) · Loading(service/directive)'
const SERVICE_METHOD_LABELS: Record<string, string> = {
  YhMessage: '已覆盖：success',
  YhNotification: '已覆盖：success(title, message)',
  YhMessageBox: '已覆盖：alert / confirm / prompt',
  YhDialogMethod: '已覆盖：show / success / warning / error / info',
  YhLoading: '已覆盖：service / directive'
}
const WIDE_DEMO_COMPONENTS = new Set([
  'YhTransfer',
  'YhCalendar',
  'YhWatermark',
  'YhGanttChart',
  'YhContainer',
  'YhGrid',
  'YhGridItem',
  'YhCol',
  'YhMessageBox',
  'YhDialogMethod',
  'YhLoading',
  'YhSmartAddress'
])

const componentNames = computed(() =>
  Object.keys(runtimeExports)
    .filter((name) => /^Yh[A-Z]/.test(name))
    .filter((name) => {
      const value = runtimeExports[name]
      return value && (typeof value === 'object' || typeof value === 'function')
    })
    .sort((left, right) => left.localeCompare(right))
)

function createTextSlot(text: string) {
  return { default: () => text }
}

const ComponentDemoRenderer = defineComponent({
  name: 'ComponentDemoRenderer',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const appStore = useAppStore()
    const dialogVisible = ref(false)
    const drawerVisible = ref(false)
    const imageViewerVisible = ref(false)
    const buttonClickCount = ref(0)
    const sliderValue = ref(42)
    const switchValue = ref(true)
    const rateValue = ref(3)
    const inputValue = ref('YH-UI consumer smoke')
    const inputNumberValue = ref(8)
    const inputTagValue = ref(['workspace', 'consumer'])
    const tagVisible = ref(true)
    const alertVisible = ref(true)
    const checkboxGroupValue = ref(['A'])
    const radioValue = ref('A')
    const selectValue = ref('beijing')
    const cascaderValue = ref<string[]>(['zhejiang', 'hangzhou'])
    const transferValue = ref(['2', '6'])
    const treeSelectValue = ref('node-1')
    const colorValue = ref('#1677ff')
    const loadingVisible = ref(false)
    const loadingDirectiveActive = ref(false)
    const formSchemaValue = ref({ keyword: 'YH-UI' })
    const luckyDrawTargetId = ref<string | number>('')
    const calendarValue = ref(new Date('2026-05-24'))
    const progressValue = ref(68)
    const activeTabName = ref('overview')
    const stepsActive = ref(1)
    const paginationPage = ref(2)
    const infiniteScrollTargetId = `yh-infinite-scroll-target-${props.name.toLowerCase()}`
    const infiniteScrollItems = ref(Array.from({ length: 8 }, (_, index) => `条目 ${index + 1}`))
    const infiniteScrollLoading = ref(false)
    const infiniteScrollFinished = ref(false)
    const skuSelectedValueIds = ref<Array<string | number>>([102, 202])
    const selectedSkuText = ref('当前已选：星际蓝 / M，库存 8，价格 ¥219')
    const smartAddressValue = ref({
      name: '张三',
      phone: '13800000000',
      province: '浙江省',
      city: '杭州市',
      district: '西湖区',
      street: '',
      detail: '文三路 1 号'
    })
    const {
      isRecording: voiceRecording,
      transcript: voiceTranscript,
      interimTranscript: voiceInterimTranscript,
      amplitudes: voiceAmplitudes,
      audioBlob: voiceAudioBlob,
      start: startVoiceRecording,
      stop: stopVoiceRecording,
      cancel: cancelVoiceRecording,
      sttSupported: voiceSttSupported
    } = useAiVoice({
      language: 'zh-CN',
      vad: true,
      onError: () => {
        runtimeExports.YhMessage?.warning?.(
          '请允许麦克风权限，建议使用 Chrome 获得更稳定的语音识别体验'
        )
      }
    })

    const treeData = [
      {
        label: '一级节点',
        value: 'node-1',
        children: [
          { label: '子节点 A', value: 'node-1-1' },
          { label: '子节点 B', value: 'node-1-2' }
        ]
      }
    ]

    const cascaderOptions = [
      {
        label: '浙江',
        value: 'zhejiang',
        children: [{ label: '杭州', value: 'hangzhou' }]
      }
    ]

    const transferData = [
      { key: '1', label: '研发工作台' },
      { key: '2', label: '组件主题中心' },
      { key: '3', label: '实验室监控面板' },
      { key: '4', label: '消费端联调页' },
      { key: '5', label: '发布审批流' },
      { key: '6', label: '回归任务清单' }
    ]

    const tableData = [
      { name: 'YH-UI', version: '1.0.26', status: 'stable' },
      { name: 'Admin Starter', version: 'workspace', status: 'linked' }
    ]

    const ganttDemoData = [
      {
        id: 'task-1',
        name: '需求分析',
        startDate: '2026-05-20',
        endDate: '2026-05-24',
        progress: 80
      },
      {
        id: 'task-2',
        name: '消费端联调',
        startDate: '2026-05-24',
        endDate: '2026-05-28',
        progress: 40
      }
    ]

    const luckyDrawPrizes = [
      { id: '1', name: '谢谢参与', color: '#fff4eb' },
      { id: '2', name: 'YH-UI 周边', color: '#ffffff' },
      { id: '3', name: '组件皮肤券', color: '#fff4eb' },
      { id: '4', name: '定制图标包', color: '#ffffff' },
      { id: '5', name: '主题模板', color: '#fff4eb' },
      { id: '6', name: '演示源码', color: '#ffffff' }
    ]

    const categoryNavItems = [
      {
        id: 'components',
        name: '组件',
        children: [
          { id: 'button', name: '按钮', count: 18 },
          { id: 'table', name: '表格', count: 12 },
          { id: 'form', name: '表单', count: 9 }
        ]
      },
      {
        id: 'hooks',
        name: 'Hook',
        children: [
          { id: 'request', name: '请求管理', count: 6 },
          { id: 'storage', name: '本地存储', count: 4 },
          { id: 'sku', name: '规格逻辑', count: 3 }
        ]
      }
    ]

    const smartAddressRegionOptions = [
      {
        label: '浙江省',
        value: '浙江省',
        children: [
          {
            label: '杭州市',
            value: '杭州市',
            children: [
              { label: '西湖区', value: '西湖区' },
              { label: '余杭区', value: '余杭区' }
            ]
          },
          {
            label: '宁波市',
            value: '宁波市',
            children: [
              { label: '鄞州区', value: '鄞州区' },
              { label: '海曙区', value: '海曙区' }
            ]
          }
        ]
      },
      {
        label: '广东省',
        value: '广东省',
        children: [
          {
            label: '深圳市',
            value: '深圳市',
            children: [
              { label: '南山区', value: '南山区' },
              { label: '福田区', value: '福田区' }
            ]
          }
        ]
      }
    ]

    const waterfallDemoItems = [
      {
        id: 1,
        title: '组件规范',
        description: '统一主入口导出与别名解析',
        height: 220,
        tag: '规范'
      },
      {
        id: 2,
        title: '主题联动',
        description: '同步驱动 CSS 变量与组件主题',
        height: 180,
        tag: '主题'
      },
      {
        id: 3,
        title: '消费端联调',
        description: 'workspace 模式实时验证组件改动',
        height: 240,
        tag: '联调'
      },
      {
        id: 4,
        title: '实验室回归',
        description: '集中对照 props 与可视化表现',
        height: 200,
        tag: '验证'
      }
    ]

    const aiArtifactHtml = `
      <article style="padding: 20px; font-family: Arial, sans-serif; color: #1f2937; line-height: 1.6;">
        <h3 style="margin: 0 0 12px; font-size: 18px;">部署报告</h3>
        <p style="margin: 0 0 12px;">admin-starter 已通过 workspace 模式接入本地组件源码。</p>
        <ul style="margin: 0; padding-left: 18px;">
          <li>主入口导出可用</li>
          <li>实验室 demo 已对齐真实 props</li>
          <li>消费端渲染链路正常</li>
        </ul>
      </article>
    `

    const skuSpecs = [
      {
        id: 1,
        name: '颜色',
        mode: 'text',
        values: [
          { id: 101, name: '深空灰' },
          { id: 102, name: '星际蓝', tag: '推荐' }
        ]
      },
      {
        id: 2,
        name: '尺寸',
        mode: 'text',
        values: [
          { id: 201, name: 'S' },
          { id: 202, name: 'M' },
          { id: 203, name: 'L' }
        ]
      }
    ]

    const skuData = [
      {
        id: 'sku-gray-s',
        specValueIds: [101, 201],
        price: 199,
        stock: 12
      },
      {
        id: 'sku-gray-m',
        specValueIds: [101, 202],
        price: 209,
        stock: 10
      },
      {
        id: 'sku-blue-m',
        specValueIds: [102, 202],
        price: 219,
        stock: 8
      },
      {
        id: 'sku-blue-l',
        specValueIds: [102, 203],
        price: 229,
        stock: 0
      }
    ]

    const aiConversationItems = ref([
      {
        id: 'conv-1',
        title: '组件实验室排查',
        excerpt: '优先处理 demo 与 props 不匹配问题',
        updatedAt: new Date('2026-05-24T09:30:00').getTime(),
        pinned: true
      },
      {
        id: 'conv-2',
        title: '主题联动回归',
        excerpt: '检查 Teleport 场景下的按钮主题色',
        updatedAt: new Date('2026-05-24T12:45:00').getTime()
      }
    ])
    const activeConversationId = ref('conv-1')

    const aiPromptItems = [
      {
        id: 'prompt-1',
        content: '继续排查实验室 demo 与真实 props 的差异',
        description: '聚焦消费端渲染问题'
      },
      {
        id: 'prompt-2',
        content: '生成本轮组件实验室修复摘要',
        description: '输出回归清单'
      }
    ]
    let infiniteScrollTimer: number | null = null
    const serviceFeedback = ref<Record<string, string>>({
      YhMessage: '已覆盖 `success` 快捷调用',
      YhNotification: '已覆盖 `success(title, message)` 调用',
      YhMessageBox: '已覆盖 `alert / confirm / prompt` 入口',
      YhDialogMethod: '已覆盖 `show / success / warning / error / info`',
      YhLoading: '已覆盖 `service()` 与 `vYhLoading` 指令'
    })

    function setServiceFeedback(name: string, text: string) {
      serviceFeedback.value = {
        ...serviceFeedback.value,
        [name]: text
      }
    }

    function handlePrimaryButtonClick() {
      buttonClickCount.value += 1
      runtimeExports.YhMessage?.success?.(`主按钮已触发 ${buttonClickCount.value} 次`)
    }

    function openMessage() {
      runtimeExports.YhMessage?.success?.('组件实验室消息调用成功')
      setServiceFeedback('YhMessage', '最近调用：`YhMessage.success()`')
    }

    function openNotification() {
      runtimeExports.YhNotification?.success?.('组件实验室', '通知调用成功')
      setServiceFeedback('YhNotification', '最近调用：`YhNotification.success(title, message)`')
    }

    async function openMessageBoxMethod(
      method: 'alert' | 'confirm' | 'prompt',
      hostSelector = '#component-lab-page-host'
    ) {
      const messageBox = runtimeExports.YhMessageBox
      if (!messageBox) return

      try {
        if (method === 'alert') {
          await messageBox.alert('MessageBox.alert 调用成功', '组件实验室', {
            appendTo: hostSelector
          })
          setServiceFeedback('YhMessageBox', '最近调用：`alert` 已完成确认')
          return
        }

        if (method === 'confirm') {
          const action = await messageBox.confirm('确认覆盖 `confirm` 分支吗？', '组件实验室', {
            appendTo: hostSelector
          })
          setServiceFeedback('YhMessageBox', `最近调用：\`confirm\` -> ${action}`)
          return
        }

        const result = await messageBox.prompt('请输入当前消费页标识', '组件实验室', {
          appendTo: hostSelector,
          inputValue: 'component-lab',
          inputPlaceholder: '请输入标识'
        })
        setServiceFeedback('YhMessageBox', `最近调用：\`prompt\` -> ${result.value || '(空值)'}`)
      } catch (action) {
        setServiceFeedback('YhMessageBox', `最近调用：\`${method}\` -> ${String(action)}`)
      }
    }

    async function openDialogMethod(
      method: 'show' | 'success' | 'warning' | 'error' | 'info',
      hostSelector = '#component-lab-page-host'
    ) {
      const dialogMethod = runtimeExports.YhDialogMethod
      if (!dialogMethod) return

      const titleMap = {
        show: 'DialogMethod.show',
        success: 'DialogMethod.success',
        warning: 'DialogMethod.warning',
        error: 'DialogMethod.error',
        info: 'DialogMethod.info'
      } as const

      const options = {
        title: '组件实验室',
        content: `${titleMap[method]} 调用成功`,
        teleportTo: hostSelector
      }

      const result =
        method === 'show' ? await dialogMethod.show(options) : await dialogMethod[method](options)

      setServiceFeedback('YhDialogMethod', `最近调用：\`${method}\` -> ${result.action}`)
    }

    function openLoading() {
      if (loadingVisible.value) return
      loadingVisible.value = true
      const instance = runtimeExports.YhLoading?.service?.({
        text: '正在验证 Loading 服务',
        fullscreen: false,
        target: '#yh-loading-demo-target'
      })
      window.setTimeout(() => {
        instance?.close?.()
        loadingVisible.value = false
      }, 1200)
      setServiceFeedback('YhLoading', '最近调用：`service()` 已触发并自动关闭')
    }

    function toggleLoadingDirective() {
      loadingDirectiveActive.value = !loadingDirectiveActive.value
      setServiceFeedback(
        'YhLoading',
        `最近调用：\`vYhLoading\` -> ${loadingDirectiveActive.value ? '开启' : '关闭'}`
      )
    }

    function startLuckyDraw() {
      const targetPrize = luckyDrawPrizes[Math.floor(Math.random() * luckyDrawPrizes.length)]
      luckyDrawTargetId.value = ''
      window.setTimeout(() => {
        luckyDrawTargetId.value = targetPrize.id
      }, 16)
    }

    function handleTagClose() {
      tagVisible.value = false
    }

    function restoreTag() {
      tagVisible.value = true
    }

    function restoreAlert() {
      alertVisible.value = true
    }

    function handleInfiniteScrollLoad() {
      if (infiniteScrollLoading.value || infiniteScrollFinished.value) return

      infiniteScrollLoading.value = true
      infiniteScrollTimer = window.setTimeout(() => {
        const startIndex = infiniteScrollItems.value.length
        const nextItems = Array.from({ length: 6 }, (_, index) => `条目 ${startIndex + index + 1}`)
        infiniteScrollItems.value = [...infiniteScrollItems.value, ...nextItems]
        infiniteScrollLoading.value = false
        if (infiniteScrollItems.value.length >= 20) {
          infiniteScrollFinished.value = true
        }
      }, 320)
    }

    function updateProgress(delta: number) {
      progressValue.value = Math.min(100, Math.max(0, progressValue.value + delta))
    }

    function updateSteps(delta: number) {
      stepsActive.value = Math.min(2, Math.max(0, stepsActive.value + delta))
    }

    function createConversation() {
      const nextId = `conv-${Date.now()}`
      aiConversationItems.value = [
        {
          id: nextId,
          title: `新建会话 ${aiConversationItems.value.length + 1}`,
          excerpt: '来自组件实验室的本地新建动作',
          updatedAt: Date.now()
        },
        ...aiConversationItems.value
      ]
      activeConversationId.value = nextId
    }

    function updateConversationTitle(targetId: string, title: string) {
      aiConversationItems.value = aiConversationItems.value.map((item) =>
        item.id === targetId ? { ...item, title, updatedAt: Date.now() } : item
      )
    }

    function deleteConversation(targetId: string) {
      const nextItems = aiConversationItems.value.filter((item) => item.id !== targetId)
      aiConversationItems.value = nextItems
      if (activeConversationId.value === targetId) {
        activeConversationId.value = nextItems[0]?.id || ''
      }
    }

    function pinConversation(targetId: string, pinned: boolean) {
      aiConversationItems.value = aiConversationItems.value.map((item) =>
        item.id === targetId ? { ...item, pinned, updatedAt: Date.now() } : item
      )
    }

    function handleSkuChange(
      sku: { price: number; stock: number } | null,
      values: Array<string | number>
    ) {
      const selectedNames = skuSpecs
        .map((spec) => spec.values.find((value) => values.includes(value.id))?.name || '')
        .filter(Boolean)

      selectedSkuText.value = sku
        ? `当前已选：${selectedNames.join(' / ')}，库存 ${sku.stock}，价格 ¥${sku.price}`
        : selectedNames.length
          ? `已选：${selectedNames.join(' / ')}，请选择完整规格`
          : '请选择规格'
    }

    function formatSmartAddress() {
      return [
        smartAddressValue.value.province,
        smartAddressValue.value.city,
        smartAddressValue.value.district,
        smartAddressValue.value.street,
        smartAddressValue.value.detail
      ]
        .filter(Boolean)
        .join(' ')
    }

    onBeforeUnmount(() => {
      if (infiniteScrollTimer !== null) {
        window.clearTimeout(infiniteScrollTimer)
      }
    })

    function renderServiceCase(name: string) {
      const hostSelector = `#yh-service-host-${name}`

      if (name === 'YhMessageBox') {
        return h('div', { class: 'demo-stack' }, [
          h('div', { class: 'service-methods' }, SERVICE_METHOD_LABELS[name]),
          h('div', { class: 'service-action-row' }, [
            h(
              runtimeExports.YhButton,
              { type: 'primary', onClick: () => void openMessageBoxMethod('alert', hostSelector) },
              () => 'alert'
            ),
            h(
              runtimeExports.YhButton,
              {
                plain: true,
                color: appStore.primaryColor,
                onClick: () => void openMessageBoxMethod('confirm', hostSelector)
              },
              () => 'confirm'
            ),
            h(
              runtimeExports.YhButton,
              { plain: true, onClick: () => void openMessageBoxMethod('prompt', hostSelector) },
              () => 'prompt'
            )
          ]),
          h('div', { id: `yh-service-host-${name}`, class: 'service-host' }),
          h('div', { class: 'demo-note' }, serviceFeedback.value[name])
        ])
      }

      if (name === 'YhDialogMethod') {
        return h('div', { class: 'demo-stack' }, [
          h('div', { class: 'service-methods' }, SERVICE_METHOD_LABELS[name]),
          h('div', { class: 'service-action-row' }, [
            h(
              runtimeExports.YhButton,
              { type: 'primary', onClick: () => void openDialogMethod('show', hostSelector) },
              () => 'show'
            ),
            h(
              runtimeExports.YhButton,
              {
                plain: true,
                color: appStore.primaryColor,
                onClick: () => void openDialogMethod('success', hostSelector)
              },
              () => 'success'
            ),
            h(
              runtimeExports.YhButton,
              { plain: true, onClick: () => void openDialogMethod('warning', hostSelector) },
              () => 'warning'
            ),
            h(
              runtimeExports.YhButton,
              { plain: true, onClick: () => void openDialogMethod('error', hostSelector) },
              () => 'error'
            ),
            h(
              runtimeExports.YhButton,
              { plain: true, onClick: () => void openDialogMethod('info', hostSelector) },
              () => 'info'
            )
          ]),
          h('div', { id: `yh-service-host-${name}`, class: 'service-host' }),
          h('div', { class: 'demo-note' }, serviceFeedback.value[name])
        ])
      }

      if (name === 'YhLoading') {
        const directiveDemo = h(
          'div',
          {
            class: ['loading-target', 'loading-target--directive'],
            'yh-loading-text': '正在验证指令态 Loading',
            'yh-loading-background': 'rgba(255, 255, 255, 0.72)',
            'yh-loading-glass': 'true'
          },
          loadingDirectiveActive.value ? 'vYhLoading 激活中' : '点击按钮切换 vYhLoading'
        )

        return h('div', { class: 'demo-stack' }, [
          h('div', { class: 'service-methods' }, SERVICE_METHOD_LABELS[name]),
          h('div', { class: 'service-action-row' }, [
            h(runtimeExports.YhButton, { type: 'primary', onClick: openLoading }, () => 'service'),
            h(
              runtimeExports.YhButton,
              { plain: true, color: appStore.primaryColor, onClick: toggleLoadingDirective },
              () => (loadingDirectiveActive.value ? '关闭 directive' : '开启 directive')
            )
          ]),
          h('div', { id: `yh-service-host-${name}`, class: 'service-host' }),
          h(
            'div',
            { id: 'yh-loading-demo-target', class: 'loading-target' },
            'Loading 服务挂载区域'
          ),
          runtimeExports.vYhLoading
            ? withDirectives(directiveDemo, [
                [runtimeExports.vYhLoading, loadingDirectiveActive.value]
              ])
            : directiveDemo,
          h('div', { class: 'demo-note' }, serviceFeedback.value[name])
        ])
      }

      const actions: Record<string, () => void> = {
        YhMessage: openMessage,
        YhNotification: openNotification
      }

      return h('div', { class: 'demo-stack' }, [
        h('div', { class: 'service-methods' }, SERVICE_METHOD_LABELS[name]),
        h(
          runtimeExports.YhButton,
          { type: 'primary', onClick: actions[name] },
          () => `触发 ${name}`
        ),
        h('div', { class: 'demo-note' }, serviceFeedback.value[name])
      ])
    }

    function renderComponent(name: string) {
      if (SERVICE_EXPORTS.has(name)) {
        return renderServiceCase(name)
      }

      const component = runtimeExports[name] as import('vue').Component

      switch (name) {
        case 'YhButton':
          return h('div', { class: 'demo-stack' }, [
            h(
              component,
              {
                type: 'primary',
                onClick: handlePrimaryButtonClick
              },
              () => `主按钮触发 ${buttonClickCount.value}`
            ),
            h('div', { class: 'demo-note' }, '点击会直接触发消息提示，并累计当前按钮交互次数')
          ])
        case 'YhInput':
          return h(component, {
            modelValue: inputValue.value,
            placeholder: '请输入内容',
            'onUpdate:modelValue': (value: string) => {
              inputValue.value = value
            }
          })
        case 'YhCheckbox':
          return h(component, { modelValue: true }, () => '复选框')
        case 'YhCheckboxGroup':
          return h(
            component,
            {
              modelValue: checkboxGroupValue.value,
              'onUpdate:modelValue': (value: string[]) => {
                checkboxGroupValue.value = value
              }
            },
            () => [
              h(runtimeExports.YhCheckbox, { value: 'A', label: 'A' }, () => 'A'),
              h(runtimeExports.YhCheckbox, { value: 'B', label: 'B' }, () => 'B')
            ]
          )
        case 'YhRadio':
          return h(
            component,
            {
              modelValue: radioValue.value,
              value: 'A',
              label: 'A',
              'onUpdate:modelValue': (value: string) => {
                radioValue.value = value
              }
            },
            () => '单选项'
          )
        case 'YhRadioGroup':
          return h(
            component,
            {
              modelValue: radioValue.value,
              'onUpdate:modelValue': (value: string) => {
                radioValue.value = value
              }
            },
            () => [
              h(runtimeExports.YhRadio, { value: 'A', label: 'A' }, () => 'A'),
              h(runtimeExports.YhRadio, { value: 'B', label: 'B' }, () => 'B')
            ]
          )
        case 'YhRadioButton':
          return h(
            runtimeExports.YhRadioGroup,
            {
              modelValue: radioValue.value,
              'onUpdate:modelValue': (value: string) => {
                radioValue.value = value
              }
            },
            () => [
              h(component, { value: 'A', label: 'A' }, () => 'A'),
              h(component, { value: 'B', label: 'B' }, () => 'B')
            ]
          )
        case 'YhInputNumber':
          return h(component, {
            modelValue: inputNumberValue.value,
            'onUpdate:modelValue': (value: number) => {
              inputNumberValue.value = value
            }
          })
        case 'YhInputTag':
          return h(component, {
            modelValue: inputTagValue.value,
            'onUpdate:modelValue': (value: string[]) => {
              inputTagValue.value = value
            }
          })
        case 'YhIcon':
          return h(component, { name: 'home', size: 22, color: '#1677ff' })
        case 'YhTag':
          return h('div', { class: 'demo-stack' }, [
            tagVisible.value
              ? h(
                  component,
                  { type: 'success', closable: true, onClose: handleTagClose },
                  () => '联调通过'
                )
              : h(
                  runtimeExports.YhButton,
                  { plain: true, color: appStore.primaryColor, onClick: restoreTag },
                  () => '恢复标签'
                ),
            h('div', { class: 'demo-note' }, '关闭标签后可重新恢复，验证 closable 与状态切换')
          ])
        case 'YhForm':
          return h(
            component,
            {
              model: { name: 'YH-UI' },
              labelWidth: 80
            },
            () => [
              h(
                runtimeExports.YhFormItem,
                {
                  label: '名称',
                  prop: 'name'
                },
                () => h(runtimeExports.YhInput, { modelValue: 'YH-UI' })
              )
            ]
          )
        case 'YhFormItem':
          return h(
            runtimeExports.YhForm,
            {
              model: { field: '实验页' },
              labelWidth: 80
            },
            () =>
              h(
                component,
                {
                  label: '字段',
                  prop: 'field'
                },
                () => h(runtimeExports.YhInput, { modelValue: '实验页' })
              )
          )
        case 'YhFormSchema':
          return h('div', { class: 'form-schema-demo-wrap' }, [
            h(component, {
              modelValue: formSchemaValue.value,
              formProps: {
                labelWidth: '72px'
              },
              schema: [
                {
                  field: 'keyword',
                  label: '关键词',
                  component: runtimeExports.YhInput,
                  required: true,
                  props: {
                    placeholder: '请输入关键词'
                  }
                }
              ],
              'onUpdate:modelValue': (value: { keyword: string }) => {
                formSchemaValue.value = value
              }
            })
          ])
        case 'YhRow':
          return h(component, { gutter: 12 }, () => [
            h(runtimeExports.YhCol, { span: 12 }, () => h('div', { class: 'layout-block' }, '12')),
            h(runtimeExports.YhCol, { span: 12 }, () => h('div', { class: 'layout-block' }, '12'))
          ])
        case 'YhCol':
          return h('div', { class: 'demo-stack' }, [
            h(runtimeExports.YhRow, { gutter: 12 }, () => [
              h(component, { span: 8 }, () =>
                h('div', { class: 'layout-block layout-block--primary' }, 'span 8')
              ),
              h(component, { span: 8 }, () =>
                h('div', { class: 'layout-block layout-block--secondary' }, 'span 8')
              ),
              h(component, { span: 8 }, () =>
                h('div', { class: 'layout-block layout-block--muted' }, 'span 8')
              )
            ]),
            h('div', { class: 'demo-note' }, '在 Row 中观察列宽分配与 gutter 效果')
          ])
        case 'YhDivider':
          return h(component, null, () => '分割线')
        case 'YhRate':
          return h(component, {
            modelValue: rateValue.value,
            'onUpdate:modelValue': (value: number) => {
              rateValue.value = value
            }
          })
        case 'YhSwitch':
          return h(component, {
            modelValue: switchValue.value,
            'onUpdate:modelValue': (value: boolean) => {
              switchValue.value = value
            }
          })
        case 'YhAutocomplete':
          return h(component, {
            modelValue: 'YH',
            fetchSuggestions: (
              query: string,
              callback: (items: Array<{ value: string }>) => void
            ) => {
              callback(
                ['YH-UI', 'YH Admin', 'YH Starter']
                  .filter((item) => item.toLowerCase().includes(query.toLowerCase()))
                  .map((value) => ({ value }))
              )
            }
          })
        case 'YhSelect':
          return h(
            component,
            {
              modelValue: selectValue.value,
              style: { width: '220px' },
              'onUpdate:modelValue': (value: string) => {
                selectValue.value = value
              }
            },
            () => [
              h(runtimeExports.YhOption, { label: '北京', value: 'beijing' }),
              h(runtimeExports.YhOption, { label: '上海', value: 'shanghai' })
            ]
          )
        case 'YhOption':
          return h(
            runtimeExports.YhSelect,
            {
              modelValue: selectValue.value,
              style: { width: '220px' }
            },
            () => [
              h(component, { label: '北京', value: 'beijing' }),
              h(component, { label: '上海', value: 'shanghai' })
            ]
          )
        case 'YhCascader':
          return h(component, {
            options: cascaderOptions,
            modelValue: cascaderValue.value,
            'onUpdate:modelValue': (value: string[]) => {
              cascaderValue.value = value
            }
          })
        case 'YhCascaderPanel':
          return h(component, {
            options: cascaderOptions,
            expandedPath: [],
            config: {
              expandTrigger: 'click',
              multiple: false,
              checkStrictly: false,
              emitPath: true,
              lazy: false,
              value: 'value',
              label: 'label',
              children: 'children',
              disabled: 'disabled',
              leaf: 'leaf'
            },
            isMultiple: false,
            isChecked: () => false
          })
        case 'YhSlider':
          return h(component, {
            modelValue: sliderValue.value,
            'onUpdate:modelValue': (value: number) => {
              sliderValue.value = value
            }
          })
        case 'YhTimeSelect':
          return h(component, { modelValue: '09:00', start: '09:00', end: '18:00', step: '01:00' })
        case 'YhTimePicker':
          return h(component, { modelValue: '10:30:00' })
        case 'YhDatePicker':
          return h(component, { modelValue: '2026-05-23' })
        case 'YhTransfer':
          return h('div', { class: 'transfer-demo-wrap demo-fit-wrap' }, [
            h(component, {
              data: transferData,
              modelValue: transferValue.value,
              filterable: true,
              titles: ['可分配模块', '已启用模块'],
              buttonTexts: ['启用', '移除'],
              'onUpdate:modelValue': (value: string[]) => {
                transferValue.value = value
              }
            }),
            h('div', { class: 'demo-note' }, `当前已启用：${transferValue.value.length} 项`)
          ])
        case 'YhTransferPanel':
          return h(component, {
            data: transferData,
            checked: transferValue.value,
            title: '待选项',
            'onUpdate:checked': (value: string[]) => {
              transferValue.value = value
            }
          })
        case 'YhTreeSelect':
          return h(component, {
            data: treeData,
            modelValue: treeSelectValue.value,
            'onUpdate:modelValue': (value: string) => {
              treeSelectValue.value = value
            }
          })
        case 'YhBadge':
          return h(component, { value: 8 }, () => h(runtimeExports.YhButton, null, () => '消息'))
        case 'YhCard':
          return h(component, { header: '卡片标题' }, () => '卡片内容')
        case 'YhColorPicker':
          return h(component, {
            modelValue: colorValue.value,
            'onUpdate:modelValue': (value: string) => {
              colorValue.value = value
            }
          })
        case 'YhSpin':
          return h(component, { show: true, tip: '加载中' })
        case 'YhBreadcrumb':
          return h(component, null, () => [
            h(runtimeExports.YhBreadcrumbItem, null, () => '首页'),
            h(runtimeExports.YhBreadcrumbItem, null, () => '组件实验室')
          ])
        case 'YhBreadcrumbItem':
          return h(runtimeExports.YhBreadcrumb, null, () => [
            h(component, null, () => '首页'),
            h(component, null, () => '明细')
          ])
        case 'YhAlert':
          return h('div', { class: 'demo-stack' }, [
            alertVisible.value
              ? h(component, {
                  title: '配置已同步',
                  description: '主题变量、组件 token 和实验室回归结果已完成联动校验。',
                  type: 'success',
                  closable: true,
                  onClose: () => {
                    alertVisible.value = false
                  }
                })
              : h(
                  runtimeExports.YhButton,
                  { plain: true, color: appStore.primaryColor, onClick: restoreAlert },
                  () => '重新显示 Alert'
                )
          ])
        case 'YhSkeleton':
          return h(component, { loading: true, rows: 3 }, () => '加载骨架')
        case 'YhSkeletonItem':
          return h(component, { variant: 'text' })
        case 'YhProgress':
          return h('div', { class: 'demo-stack' }, [
            h(component, { percentage: progressValue.value }),
            h(runtimeExports.YhSpace, null, () => [
              h(
                runtimeExports.YhButton,
                { plain: true, onClick: () => updateProgress(-10) },
                () => '-10%'
              ),
              h(
                runtimeExports.YhButton,
                { type: 'primary', onClick: () => updateProgress(10) },
                () => '+10%'
              )
            ]),
            h('div', { class: 'demo-note' }, `当前进度：${progressValue.value}%`)
          ])
        case 'YhTooltip':
          return h(component, { content: 'Tooltip 内容' }, () =>
            h(runtimeExports.YhButton, null, () => '悬浮提示')
          )
        case 'YhPopconfirm':
          return h(component, { title: '确认执行该操作吗？', teleported: false }, () =>
            h(runtimeExports.YhButton, { type: 'danger' }, () => '删除')
          )
        case 'YhPopover':
          return h(component, { content: 'Popover 内容', title: '提示' }, () =>
            h(runtimeExports.YhButton, null, () => '气泡弹层')
          )
        case 'YhDialog':
          return h('div', { class: 'demo-stack' }, [
            h(
              runtimeExports.YhButton,
              { type: 'primary', onClick: () => (dialogVisible.value = true) },
              () => '打开 Dialog'
            ),
            h(
              component,
              {
                modelValue: dialogVisible.value,
                title: 'Dialog 示例',
                width: '420px',
                'onUpdate:modelValue': (value: boolean) => {
                  dialogVisible.value = value
                }
              },
              {
                default: () => 'Dialog 内容',
                footer: () => [
                  h(
                    runtimeExports.YhButton,
                    {
                      plain: true,
                      color: appStore.primaryColor,
                      onClick: () => (dialogVisible.value = false)
                    },
                    () => '取消'
                  ),
                  h(
                    runtimeExports.YhButton,
                    {
                      color: appStore.primaryColor,
                      onClick: () => (dialogVisible.value = false)
                    },
                    () => '确认'
                  )
                ]
              }
            )
          ])
        case 'YhDrawer':
          return h('div', { class: 'demo-stack' }, [
            h(
              runtimeExports.YhButton,
              { onClick: () => (drawerVisible.value = true) },
              () => '打开 Drawer'
            ),
            h(
              component,
              {
                modelValue: drawerVisible.value,
                title: 'Drawer 示例',
                size: 320,
                'onUpdate:modelValue': (value: boolean) => {
                  drawerVisible.value = value
                }
              },
              createTextSlot('Drawer 内容')
            )
          ])
        case 'YhWatermark':
          return h(
            component,
            {
              content: ['YH-UI INTERNAL', 'COMPONENT LAB'],
              width: 220,
              height: 110,
              gap: [72, 56],
              rotate: -22,
              zIndex: 0,
              font: {
                color: 'rgba(22, 119, 255, 0.16)',
                fontSize: 20,
                fontWeight: 700
              }
            },
            () =>
              h('div', { class: 'watermark-box watermark-box--showcase' }, [
                h('div', { class: 'watermark-showcase' }, [
                  h('div', { class: 'watermark-showcase__header' }, [
                    h('strong', null, '组件回归报告'),
                    h('span', null, '2026-05-24')
                  ]),
                  h('div', { class: 'watermark-showcase__metrics' }, [
                    h('div', { class: 'watermark-showcase__metric' }, [
                      h('span', null, '校验组件'),
                      h('strong', null, '118')
                    ]),
                    h('div', { class: 'watermark-showcase__metric' }, [
                      h('span', null, '已修复项'),
                      h('strong', null, '5')
                    ]),
                    h('div', { class: 'watermark-showcase__metric' }, [
                      h('span', null, '当前状态'),
                      h('strong', null, '进行中')
                    ])
                  ]),
                  h('div', { class: 'watermark-showcase__content' }, [
                    h('p', null, '该区域用于验证水印是否真实覆盖容器内容，而非仅展示背景图层。'),
                    h('p', null, '预期表现为内容区可见、交互不受阻塞，并且出现连续平铺的品牌水印。')
                  ])
                ])
              ])
          )
        case 'YhUpload':
          return h(component, { autoUpload: false }, () =>
            h(runtimeExports.YhButton, null, () => '选择文件')
          )
        case 'YhMarquee':
          return h(component, { speed: 40 }, () => 'YH-UI Consumer Smoke Marquee')
        case 'YhPagination':
          return h('div', { class: 'demo-stack' }, [
            h(component, {
              total: 100,
              currentPage: paginationPage.value,
              pageSize: 10,
              layout: 'prev, pager, next, jumper',
              'onUpdate:currentPage': (value: number) => {
                paginationPage.value = value
              }
            }),
            h('div', { class: 'demo-note' }, `当前页码：第 ${paginationPage.value} 页`)
          ])
        case 'YhImage':
          return h(component, {
            src: 'https://dummyimage.com/160x100/1677ff/ffffff&text=YH-UI',
            previewSrcList: ['https://dummyimage.com/640x360/1677ff/ffffff&text=YH-UI']
          })
        case 'YhImageViewer':
          return h('div', { class: 'demo-stack' }, [
            h(
              runtimeExports.YhButton,
              { onClick: () => (imageViewerVisible.value = true) },
              () => '打开 ImageViewer'
            ),
            imageViewerVisible.value
              ? h(component, {
                  urlList: ['https://dummyimage.com/640x360/1677ff/ffffff&text=YH-UI'],
                  onClose: () => {
                    imageViewerVisible.value = false
                  }
                })
              : null
          ])
        case 'YhDescriptions':
          return h('div', { class: 'demo-stack' }, [
            h(
              component,
              {
                column: 1,
                border: true,
                title: '发布信息',
                extra: 'workspace',
                labelStyle: { width: '88px' }
              },
              () => [
                h(runtimeExports.YhDescriptionsItem, { label: '组件库' }, () => 'YH-UI'),
                h(runtimeExports.YhDescriptionsItem, { label: '版本' }, () => '1.0.26'),
                h(runtimeExports.YhDescriptionsItem, { label: '状态' }, () => '已接入消费端')
              ]
            ),
            h('div', { class: 'demo-note' }, '窄卡片内使用单列更容易看清标签和值的对齐关系')
          ])
        case 'YhDescriptionsItem':
          return h(runtimeExports.YhDescriptions, { column: 1, border: true }, () =>
            h(component, { label: '组件' }, () => 'DescriptionsItem')
          )
        case 'YhTabs':
          return h(
            component,
            {
              modelValue: activeTabName.value,
              'onUpdate:modelValue': (value: string) => {
                activeTabName.value = value
              }
            },
            () => [
              h(runtimeExports.YhTabPane, { label: '概览', name: 'overview' }, () => '概览内容'),
              h(runtimeExports.YhTabPane, { label: '明细', name: 'detail' }, () => '明细内容'),
              h(runtimeExports.YhTabPane, { label: '日志', name: 'logs' }, () => '最近一次回归日志')
            ]
          )
        case 'YhTabPane':
          return h(runtimeExports.YhTabs, { modelValue: 'pane-a' }, () => [
            h(component, { label: 'Pane A', name: 'pane-a' }, () => 'Pane A'),
            h(component, { label: 'Pane B', name: 'pane-b' }, () => 'Pane B')
          ])
        case 'YhSteps':
          return h('div', { class: 'demo-stack' }, [
            h(component, { active: stepsActive.value }, () => [
              h(runtimeExports.YhStep, { title: '收集上下文' }),
              h(runtimeExports.YhStep, { title: '修改组件' }),
              h(runtimeExports.YhStep, { title: '消费端验证' })
            ]),
            h(runtimeExports.YhSpace, null, () => [
              h(
                runtimeExports.YhButton,
                { plain: true, onClick: () => updateSteps(-1) },
                () => '上一步'
              ),
              h(
                runtimeExports.YhButton,
                { type: 'primary', onClick: () => updateSteps(1) },
                () => '下一步'
              )
            ])
          ])
        case 'YhStep':
          return h(runtimeExports.YhSteps, { active: stepsActive.value }, () => [
            h(component, { title: '步骤一' }),
            h(component, { title: '步骤二' }),
            h(component, { title: '步骤三' })
          ])
        case 'YhConfigProvider':
          return h(component, { size: 'small' }, () =>
            h(runtimeExports.YhButton, { type: 'primary' }, () => 'ConfigProvider')
          )
        case 'YhAffix':
          return h(component, { offset: 0 }, () => h(runtimeExports.YhButton, null, () => 'Affix'))
        case 'YhInfiniteScroll':
          return h('div', { id: infiniteScrollTargetId, class: 'infinite-scroll-box' }, [
            h(
              component,
              {
                target: `#${infiniteScrollTargetId}`,
                threshold: 24,
                loading: infiniteScrollLoading.value,
                finished: infiniteScrollFinished.value,
                onLoad: handleInfiniteScrollLoad
              },
              () =>
                infiniteScrollItems.value.map((item) =>
                  h('div', { key: item, class: 'scroll-item' }, item)
                )
            )
          ])
        case 'YhDropdown':
          return h(
            component,
            { trigger: 'click' },
            {
              default: () => h(runtimeExports.YhButton, null, () => '下拉菜单'),
              dropdown: () =>
                h(runtimeExports.YhDropdownMenu, null, () => [
                  h(runtimeExports.YhDropdownItem, { command: 'a' }, () => '操作 A'),
                  h(runtimeExports.YhDropdownItem, { command: 'b' }, () => '操作 B')
                ])
            }
          )
        case 'YhDropdownMenu':
          return h('div', { class: 'dropdown-static-demo' }, [
            h('div', { class: 'dropdown-static-demo__title' }, '快捷操作菜单'),
            h(component, null, () => [
              h(runtimeExports.YhDropdownItem, { command: 'menu-copy' }, () => '复制链接'),
              h(runtimeExports.YhDropdownItem, { command: 'menu-refresh' }, () => '刷新缓存'),
              h(
                runtimeExports.YhDropdownItem,
                { command: 'menu-delete', divided: true, danger: true },
                () => '删除记录'
              )
            ])
          ])
        case 'YhDropdownItem':
          return h('div', { class: 'dropdown-static-demo' }, [
            h('div', { class: 'dropdown-static-demo__title' }, '单项状态示例'),
            h(runtimeExports.YhDropdownMenu, null, () => [
              h(component, { command: 'preview' }, () => '预览详情'),
              h(component, { command: 'pin', divided: true }, () => '置顶到首页'),
              h(component, { command: 'archive', danger: true }, () => '归档数据')
            ])
          ])
        case 'YhMenu':
          return h(component, { defaultActive: 'dashboard' }, () => [
            h(runtimeExports.YhMenuItem, { index: 'dashboard' }, () => '工作台'),
            h(
              runtimeExports.YhSubMenu,
              { index: 'system' },
              {
                title: () => '系统管理',
                default: () => [
                  h(runtimeExports.YhMenuItem, { index: 'user' }, () => '用户管理'),
                  h(runtimeExports.YhMenuItemGroup, { title: '更多操作' }, () =>
                    h(runtimeExports.YhMenuItem, { index: 'role' }, () => '角色管理')
                  )
                ]
              }
            )
          ])
        case 'YhMenuItem':
          return h(runtimeExports.YhMenu, { defaultActive: 'menu-item' }, () =>
            h(component, { index: 'menu-item' }, () => '菜单项')
          )
        case 'YhMenuItemGroup':
          return h(runtimeExports.YhMenu, null, () =>
            h(component, { title: '分组' }, () =>
              h(runtimeExports.YhMenuItem, { index: 'group-item' }, () => '分组项')
            )
          )
        case 'YhSubMenu':
          return h(runtimeExports.YhMenu, null, () =>
            h(
              component,
              { index: 'sub-menu' },
              {
                title: () => '子菜单',
                default: () =>
                  h(runtimeExports.YhMenuItem, { index: 'sub-menu-item' }, () => '子项')
              }
            )
          )
        case 'YhCalendar':
          return h('div', { class: 'calendar-demo-wrap demo-fit-wrap' }, [
            h(component, {
              modelValue: calendarValue.value,
              showHoliday: true,
              showWeekNumber: true,
              'onUpdate:modelValue': (value: Date) => {
                calendarValue.value = value
              }
            }),
            h(
              'div',
              { class: 'demo-note' },
              `当前选中日期：${calendarValue.value.toLocaleDateString('zh-CN')}`
            )
          ])
        case 'YhWaterfall':
          return h(
            component,
            {
              items: waterfallDemoItems,
              cols: 2,
              gap: 12
            },
            {
              default: ({ item }: { item: WaterfallItem }) =>
                h(
                  'div',
                  {
                    class: 'waterfall-demo-card',
                    style: { minHeight: `${item.height}px` }
                  },
                  [
                    h('span', { class: 'waterfall-demo-tag' }, item.tag),
                    h('strong', { class: 'waterfall-demo-title' }, item.title),
                    h('p', { class: 'waterfall-demo-text' }, item.description)
                  ]
                )
            }
          )
        case 'YhTree':
          return h(component, { data: treeData, nodeKey: 'value', defaultExpandAll: true })
        case 'YhTreeNode':
          return h(runtimeExports.YhTree, {
            data: treeData,
            nodeKey: 'value',
            defaultExpandAll: true
          })
        case 'YhCountdown':
          return h(component, { value: Date.now() + 1000 * 60 * 10, format: 'HH:mm:ss' })
        case 'YhTable':
          return h(component, { data: tableData, border: true, style: { width: '100%' } }, () => [
            h(runtimeExports.YhTableColumn, { prop: 'name', label: '名称' }),
            h(runtimeExports.YhTableColumn, { prop: 'version', label: '版本' }),
            h(runtimeExports.YhTableColumn, { prop: 'status', label: '状态' })
          ])
        case 'YhTableColumn':
          return h(
            runtimeExports.YhTable,
            { data: tableData, border: true, style: { width: '100%' } },
            () => h(component, { prop: 'name', label: '名称' })
          )
        case 'YhSpace':
          return h(component, null, () => [
            h(runtimeExports.YhButton, null, () => '按钮 A'),
            h(runtimeExports.YhButton, null, () => '按钮 B')
          ])
        case 'YhAvatar':
          return h(component, null, () => 'YH')
        case 'YhEmpty':
          return h(component, { description: '暂无数据' })
        case 'YhTypographyTitle':
          return h(component, { level: 4 }, () => 'Typography Title')
        case 'YhTypographyText':
          return h(component, null, () => 'Typography Text')
        case 'YhTypographyParagraph':
          return h(component, null, () => 'Typography Paragraph')
        case 'YhTypographyLink':
          return h(component, { href: 'https://example.com' }, () => 'Typography Link')
        case 'YhContainer':
          return h('div', { class: 'demo-stack' }, [
            h(component, { class: 'container-demo', direction: 'vertical' }, () => [
              h(
                runtimeExports.YhHeader,
                {
                  height: '56px',
                  class: 'container-box container-box--header'
                },
                () =>
                  h('div', { class: 'container-toolbar' }, [
                    h('div', { class: 'container-toolbar__brand' }, [
                      h('span', { class: 'container-toolbar__logo' }, 'YH'),
                      h('div', { class: 'container-toolbar__meta' }, [
                        h('strong', null, '运营工作台'),
                        h('span', null, 'Container / Header')
                      ])
                    ]),
                    h('div', { class: 'container-toolbar__actions' }, [
                      h('span', { class: 'container-chip' }, 'workspace'),
                      h('span', { class: 'container-chip container-chip--strong' }, '在线')
                    ])
                  ])
              ),
              h(runtimeExports.YhContainer, { class: 'container-middle' }, () => [
                h(
                  runtimeExports.YhAside,
                  {
                    width: '112px',
                    class: 'container-box container-box--aside'
                  },
                  () =>
                    h('div', { class: 'container-nav' }, [
                      h('div', { class: 'container-nav__title' }, '导航'),
                      h('div', { class: 'container-nav__item is-active' }, '概览'),
                      h('div', { class: 'container-nav__item' }, '工单'),
                      h('div', { class: 'container-nav__item' }, '告警'),
                      h('div', { class: 'container-nav__item' }, '报表')
                    ])
                ),
                h(
                  runtimeExports.YhMain,
                  {
                    class: 'container-box container-box--main'
                  },
                  () =>
                    h('div', { class: 'container-main' }, [
                      h('div', { class: 'container-main__hero' }, [
                        h('div', { class: 'container-main__hero-title' }, 'Main / 数据概览'),
                        h(
                          'div',
                          { class: 'container-main__hero-desc' },
                          '展示主内容区如何承载卡片、列表与操作区'
                        )
                      ]),
                      h('div', { class: 'container-main__stats' }, [
                        h('div', { class: 'container-stat-card' }, [
                          h('span', null, '今日构建'),
                          h('strong', null, '18')
                        ]),
                        h('div', { class: 'container-stat-card' }, [
                          h('span', null, '待处理'),
                          h('strong', null, '6')
                        ]),
                        h('div', { class: 'container-stat-card' }, [
                          h('span', null, '通过率'),
                          h('strong', null, '98%')
                        ])
                      ]),
                      h('div', { class: 'container-main__panel' }, [
                        h('div', { class: 'container-main__panel-header' }, [
                          h('strong', null, '最近任务'),
                          h('span', null, '同步消费端验证结果')
                        ]),
                        h('div', { class: 'container-task-list' }, [
                          h('div', { class: 'container-task-item' }, [
                            h('span', { class: 'container-task-dot is-success' }),
                            h('span', null, 'MessageBox 视觉态已回归')
                          ]),
                          h('div', { class: 'container-task-item' }, [
                            h('span', { class: 'container-task-dot is-warning' }),
                            h('span', null, 'SmartAddress 样式待确认')
                          ])
                        ])
                      ])
                    ])
                )
              ]),
              h(
                runtimeExports.YhFooter,
                {
                  height: '52px',
                  class: 'container-box container-box--footer'
                },
                () =>
                  h('div', { class: 'container-footer' }, [
                    h('span', null, 'Footer / 状态栏'),
                    h('span', { class: 'container-footer__status' }, '最后同步：2 分钟前')
                  ])
              )
            ]),
            h('div', { class: 'demo-note' }, '展示后台常见的 Header / Aside / Main / Footer 组合')
          ])
        case 'YhHeader':
        case 'YhAside':
        case 'YhMain':
        case 'YhFooter':
          return h(component, { class: 'container-box' }, () => name.replace('Yh', ''))
        case 'YhResult':
          return h(component, {
            icon: 'success',
            title: '验证通过',
            subTitle: '消费端结果页渲染正常'
          })
        case 'YhGrid':
          return h('div', { class: 'demo-stack' }, [
            h(component, { cols: 4, gap: 12 }, () => [
              h(runtimeExports.YhGridItem, { span: 2 }, () =>
                h('div', { class: 'grid-demo-box grid-demo-box--primary' }, '筛选区')
              ),
              h(runtimeExports.YhGridItem, null, () =>
                h('div', { class: 'grid-demo-box grid-demo-box--secondary' }, '概览')
              ),
              h(runtimeExports.YhGridItem, null, () =>
                h('div', { class: 'grid-demo-box grid-demo-box--muted' }, '告警')
              ),
              h(runtimeExports.YhGridItem, { span: 4 }, () =>
                h(
                  'div',
                  { class: 'grid-item-demo-box grid-demo-box--primary' },
                  '趋势图面板（跨 4 列）'
                )
              )
            ]),
            h('div', { class: 'demo-note' }, '使用 CSS Grid 展示跨列布局，比纯字母更容易观察排布')
          ])
        case 'YhGridItem':
          return h('div', { class: 'demo-stack' }, [
            h(runtimeExports.YhGrid, { cols: 4, gap: 12 }, () => [
              h(component, { span: 2 }, () =>
                h('div', { class: 'grid-item-demo-box grid-demo-box--primary' }, 'span 2')
              ),
              h(component, null, () =>
                h('div', { class: 'grid-demo-box grid-demo-box--secondary' }, 'span 1')
              ),
              h(component, { suffix: true }, () =>
                h('div', { class: 'grid-demo-box grid-demo-box--muted' }, 'suffix')
              )
            ]),
            h('div', { class: 'demo-note' }, '示例同时展示 `span` 与 `suffix` 的定位效果')
          ])
        case 'YhMention':
          return h(component, {
            modelValue: '@yh-ui',
            options: [
              { value: 'yh-ui', label: 'YH-UI' },
              { value: 'admin', label: 'Admin Starter' }
            ]
          })
        case 'YhCarousel':
          return h('div', { class: 'carousel-demo-wrap' }, [
            h(component, { showArrow: 'always' }, () => [
              h(runtimeExports.YhCarouselItem, null, () =>
                h('div', { class: 'carousel-item-box' }, '轮播 1')
              ),
              h(runtimeExports.YhCarouselItem, null, () =>
                h('div', { class: 'carousel-item-box' }, '轮播 2')
              )
            ])
          ])
        case 'YhCarouselItem':
          return h('div', { class: 'carousel-demo-wrap' }, [
            h(runtimeExports.YhCarousel, { showArrow: 'always' }, () =>
              h(component, null, () => h('div', { class: 'carousel-item-box' }, '单项'))
            )
          ])
        case 'YhScrollbar':
          return h(component, { height: 120, always: true }, () =>
            Array.from({ length: 18 }, (_, index) =>
              h('div', { class: 'scroll-item' }, `滚动内容 ${index + 1}`)
            )
          )
        case 'YhGanttChart':
          return h('div', { class: 'gantt-demo-wrap' }, [
            h(component, {
              data: ganttDemoData,
              columns: [{ prop: 'name', label: '任务', width: 140 }],
              viewMode: 'week',
              startDate: '2026-05-19',
              endDate: '2026-05-30',
              showDependencies: false
            })
          ])
        case 'YhSkuSelector':
          return h('div', { class: 'demo-stack' }, [
            h(component, {
              specs: skuSpecs,
              skus: skuData,
              modelValue: skuSelectedValueIds.value,
              showSelectedSummary: true,
              summaryPrefix: '已选规格',
              'onUpdate:modelValue': (value: Array<string | number>) => {
                skuSelectedValueIds.value = value
              },
              onChange: handleSkuChange
            }),
            h('div', { class: 'demo-note' }, selectedSkuText.value)
          ])
        case 'YhPrice':
          return h(component, { value: 199.99, currency: 'CNY' })
        case 'YhProductCard':
          return h(component, {
            title: 'YH-UI Pro 套件',
            description: '消费端产品卡片示例',
            image: 'https://dummyimage.com/320x180/1677ff/ffffff&text=YH-UI',
            price: 299
          })
        case 'YhImageMagnifier':
          return h(component, {
            src: 'https://dummyimage.com/260x180/1677ff/ffffff&text=Zoom',
            scale: 2,
            width: '100%',
            height: 180,
            position: 'inside',
            title: '移动查看细节',
            showMinimap: true
          })
        case 'YhCouponCard':
          return h(component, {
            title: '新人优惠券',
            amount: 50,
            condition: '满 199 可用',
            expireText: '有效期至 2026-12-31'
          })
        case 'YhLuckyDraw':
          return h(component, {
            prizes: luckyDrawPrizes,
            targetId: luckyDrawTargetId.value,
            actionText: '开始抽奖',
            onStart: startLuckyDraw,
            onFinish: (prize: { name: string }) => {
              runtimeExports.YhMessage?.success?.(`抽中：${prize.name}`)
            }
          })
        case 'YhFilterBar':
          return h(component, {
            filters: [
              {
                key: 'status',
                label: '状态',
                options: [
                  { label: '全部', value: 'all' },
                  { label: '启用', value: 'active' }
                ]
              }
            ]
          })
        case 'YhSubmitBar':
          return h(component, { price: 19900, buttonText: '立即提交' })
        case 'YhCategoryNav':
          return h('div', { class: 'category-nav-demo-wrap' }, [
            h(component, {
              categories: categoryNavItems,
              modelValue: 'components',
              subValue: 'button',
              anchor: false
            })
          ])
        case 'YhSmartAddress':
          return h('div', { class: 'demo-stack smart-address-demo-wrap' }, [
            h('div', { class: 'smart-address-demo-shell' }, [
              h('div', { class: 'smart-address-demo-header' }, [
                h('div', { class: 'smart-address-demo-title' }, [
                  h('strong', null, '智能收件信息'),
                  h('span', null, '支持粘贴解析、省市区联动与街道补全')
                ]),
                h('div', { class: 'smart-address-demo-tags' }, [
                  h('span', { class: 'smart-address-demo-tag' }, 'AI 解析'),
                  h('span', { class: 'smart-address-demo-tag' }, '地区联动'),
                  h('span', { class: 'smart-address-demo-tag' }, '街道补全')
                ])
              ]),
              h(
                component,
                {
                  modelValue: smartAddressValue.value,
                  'onUpdate:modelValue': (value: typeof smartAddressValue.value) => {
                    smartAddressValue.value = value
                  },
                  showStreet: true,
                  required: true,
                  labelPlacement: 'top',
                  regionType: 'select',
                  regionOptions: smartAddressRegionOptions,
                  parsePlaceholder:
                    '粘贴收件信息，例如：张三 13800000000 浙江省杭州市西湖区文三路 1 号'
                },
                {
                  'parse-icon': () => h('span', { class: 'smart-address-parse-icon' }, 'AI'),
                  extra: ({ value }: { value: typeof smartAddressValue.value }) =>
                    h('div', { class: 'smart-address-preview' }, [
                      h('div', { class: 'smart-address-preview__label' }, '地址摘要'),
                      h(
                        'div',
                        { class: 'smart-address-preview__value' },
                        `${value.name || '未填写收件人'} / ${value.phone || '未填写手机号'}`
                      ),
                      h(
                        'div',
                        { class: 'smart-address-preview__address' },
                        formatSmartAddress() || '省 / 市 / 区 / 街道 / 详细地址将在这里汇总展示'
                      )
                    ])
                }
              )
            ]),
            h(
              'div',
              { class: 'demo-note' },
              `当前收件人：${smartAddressValue.value.name} / ${smartAddressValue.value.phone} / ${formatSmartAddress()}`
            )
          ])
        case 'YhAiProvider':
          return h(component, null, () => h(runtimeExports.YhAiWelcome, { title: 'AI Provider' }))
        case 'YhAiChat':
          return h(component, {
            messages: [
              { id: '1', role: 'assistant', content: '这是来自消费端的 AI 对话烟雾验证。' }
            ],
            suggestions: ['检查组件导出', '验证主题联动']
          })
        case 'YhAiBubble':
          return h(component, { content: 'AI Bubble 示例', role: 'assistant' })
        case 'YhAiBubbleList':
          return h(component, {
            items: [
              { id: '1', role: 'user', content: '用户消息' },
              { id: '2', role: 'assistant', content: '助手消息' }
            ]
          })
        case 'YhAiSender':
          return h(component, { modelValue: '请检查消费端渲染' })
        case 'YhAiThoughtChain':
          return h(component, {
            steps: [
              { id: '1', title: '收集上下文', status: 'finished' },
              { id: '2', title: '生成结论', status: 'process' }
            ]
          })
        case 'YhAiCodeBlock':
          return h(component, { code: 'console.log("YH-UI")', language: 'ts' })
        case 'YhAiCodeEditor':
          return h(component, { modelValue: 'const mode = "workspace"' })
        case 'YhAiCodeRunner':
          return h(component, { code: 'console.log("consumer smoke")', language: 'javascript' })
        case 'YhAiThinking':
          return h(component, { loading: true, typing: true })
        case 'YhAiWelcome':
          return h(component, {
            title: '欢迎来到组件实验室',
            description: '集中验证消费端渲染能力'
          })
        case 'YhAiActionGroup':
          return h(component, {
            items: [
              { key: 'copy', label: '复制' },
              { key: 'refresh', label: '重试' }
            ]
          })
        case 'YhAiEditorSender':
          return h(component, { modelValue: '请生成消费端验证报告' })
        case 'YhAiArtifacts':
          return h(component, {
            visible: true,
            mode: 'inline',
            data: {
              id: 'artifact-1',
              title: '部署报告',
              type: 'html',
              currentVersion: '1.0.0',
              versions: [
                {
                  version: '1.0.0',
                  content: aiArtifactHtml,
                  description: '消费端产物展示'
                }
              ]
            }
          })
        case 'YhAiVoiceTrigger':
          return h('div', { class: 'voice-demo-wrap' }, [
            h('div', { class: 'voice-transcript' }, [
              h(
                'div',
                { class: 'voice-label' },
                voiceRecording.value ? '正在录音，松开或再次点击结束' : '点击麦克风开始录音说话'
              ),
              h(
                'div',
                { class: 'voice-text' },
                voiceTranscript.value ||
                  voiceInterimTranscript.value ||
                  (voiceSttSupported
                    ? '已接入真实麦克风录音与实时波形，开始说话后这里会显示转写内容。'
                    : '浏览器不支持实时语音转写，但仍可录制音频。')
              )
            ]),
            h(component, {
              recording: voiceRecording.value,
              amplitudes: voiceAmplitudes.value,
              'onUpdate:recording': (value: boolean) => {
                voiceRecording.value = value
              },
              onStart: () => {
                void startVoiceRecording()
              },
              onStop: () => {
                stopVoiceRecording()
              },
              onCancel: () => {
                cancelVoiceRecording()
              }
            }),
            voiceAudioBlob.value
              ? h(runtimeExports.YhTag, { type: 'success' }, () => '录音文件已生成')
              : h('div', { class: 'demo-note' }, '支持浏览器麦克风权限后可直接录音')
          ])
        case 'YhAiConversations':
          return h(component, {
            data: aiConversationItems.value,
            activeId: activeConversationId.value,
            'onUpdate:activeId': (value: string) => {
              activeConversationId.value = value
            },
            onCreate: createConversation,
            onEdit: (conversation: { id: string }, title: string) => {
              updateConversationTitle(conversation.id, title)
            },
            onDelete: (conversation: { id: string }) => {
              deleteConversation(conversation.id)
            },
            onPin: (conversation: { id: string }, pinned: boolean) => {
              pinConversation(conversation.id, pinned)
            }
          })
        case 'YhAiPrompts':
          return h(component, {
            title: '推荐提示词',
            layout: 'vertical',
            items: aiPromptItems
          })
        case 'YhAiAgentCard':
          return h(component, {
            data: {
              id: 'agent-1',
              name: 'YH-UI Agent',
              avatar: 'robot',
              model: 'YH-Agent-Pro',
              description: '多组件消费端检查助手',
              verified: true,
              favorited: true,
              status: 'online',
              capabilities: [
                { label: '回归校验', icon: 'checkmark-circle', type: 'success' },
                { label: '消费端联调', icon: 'link', type: 'primary' }
              ],
              stats: {
                uses: 1280,
                rating: 4.8,
                reviewCount: 128,
                responseTime: 320
              }
            }
          })
        case 'YhAiSources':
          return h(component, {
            sources: [{ id: '1', title: 'packages/components', href: '#' }]
          })
        case 'YhAiMention':
          return h(component, {
            modelValue: '@yh-ui',
            options: [{ value: 'yh-ui', label: 'YH-UI' }]
          })
        case 'YhAiFileCard':
          return h(component, { name: 'release-notes.md', byte: 10240, type: 'md' })
        case 'YhAiAttachments':
          return h(component, {
            items: [{ id: '1', name: 'screenshot.png', size: 20480 }]
          })
        case 'YhAiMermaid':
          return h(component, { code: 'graph TD; A[Consumer]-->B[YH-UI];' })
        default:
          return h(component, {}, createTextSlot(`${name} consumer demo`))
      }
    }

    return () => renderComponent(props.name)
  }
})
</script>

<template>
  <div class="component-lab-page">
    <div id="component-lab-page-host" class="service-host"></div>
    <div class="component-lab-header">
      <h1>YH-UI 消费端组件实验室</h1>
      <p>
        当前页面基于 `@yh-ui/yh-ui` 主入口动态扫描导出，用于集中验证消费端渲染与函数式 API 能力。
      </p>
      <div class="component-lab-stats">
        <span>总导出覆盖：{{ componentNames.length }}</span>
        <span>服务入口：{{ SERVICE_EXPORTS.size }} 个</span>
        <span>子方法覆盖：{{ SERVICE_METHOD_SUMMARY }}</span>
      </div>
    </div>

    <div class="component-lab-grid">
      <section
        v-for="compName in componentNames"
        :key="compName"
        :class="['component-card', { 'component-card--wide': WIDE_DEMO_COMPONENTS.has(compName) }]"
        :data-component-name="compName"
      >
        <header class="component-card-header">
          <h2>{{ compName }}</h2>
          <span class="component-card-type">{{
            SERVICE_EXPORTS.has(compName) ? 'service' : 'component'
          }}</span>
        </header>
        <div class="component-card-body">
          <ComponentDemoRenderer :name="compName" />
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.component-lab-page {
  min-height: 100vh;
  padding: 24px;
  background: var(--admin-bg);
  color: var(--admin-text);
  overflow-x: hidden;
}

.component-lab-header {
  margin-bottom: 24px;
  padding: 20px;
  border-radius: 12px;
  background: var(--admin-panel);
  border: 1px solid var(--admin-border);
}

.component-lab-header h1 {
  margin: 0 0 8px;
  font-size: 24px;
}

.component-lab-header p {
  margin: 0;
  color: var(--admin-text-secondary);
  line-height: 1.6;
}

.component-lab-stats {
  display: flex;
  gap: 16px;
  margin-top: 12px;
  color: var(--admin-primary);
  font-size: 13px;
  flex-wrap: wrap;
}

.component-lab-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 16px;
  min-width: 0;
}

.component-card {
  display: flex;
  flex-direction: column;
  min-width: 0;
  border-radius: 12px;
  border: 1px solid var(--admin-border);
  background: var(--admin-panel);
  overflow: hidden;
}

.component-card--wide {
  grid-column: 1 / -1;
}

.component-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 16px;
  border-bottom: 1px solid var(--admin-border);
}

.component-card-header h2 {
  margin: 0;
  font-size: 15px;
  min-width: 0;
  word-break: break-word;
}

.component-card-type {
  flex-shrink: 0;
  color: var(--admin-primary);
  font-size: 12px;
  text-transform: uppercase;
}

.component-card-body {
  padding: 16px;
  min-width: 0;
  overflow-x: hidden;
}

.demo-stack {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
}

.demo-note {
  font-size: 13px;
  color: var(--admin-text-secondary);
}

.service-action-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  min-width: 0;
}

.service-methods {
  padding: 8px 10px;
  border: 1px dashed rgba(var(--admin-primary-rgb), 0.2);
  border-radius: 10px;
  background: rgba(var(--admin-primary-rgb), 0.04);
  color: var(--admin-primary);
  font-size: 12px;
  line-height: 1.6;
}

.dropdown-static-demo {
  border: 1px solid var(--admin-border);
  border-radius: 10px;
  padding: 10px;
  background: rgba(var(--admin-primary-rgb), 0.03);
}

.dropdown-static-demo__title {
  margin-bottom: 8px;
  color: var(--admin-text-secondary);
  font-size: 12px;
  font-weight: 700;
}

.service-host {
  position: relative;
  min-height: 0;
}

.loading-target,
.watermark-box,
.layout-block,
.container-box,
.carousel-item-box,
.scroll-item,
.waterfall-demo-card {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  border-radius: 8px;
  background: rgba(var(--admin-primary-rgb), 0.08);
  color: var(--admin-text);
}

.layout-block,
.grid-demo-box,
.grid-item-demo-box {
  border: 1px solid rgba(var(--admin-primary-rgb), 0.14);
  font-weight: 600;
}

.layout-block--primary,
.grid-demo-box--primary {
  background: linear-gradient(135deg, rgba(22, 119, 255, 0.18), rgba(22, 119, 255, 0.08));
}

.layout-block--secondary,
.grid-demo-box--secondary {
  background: linear-gradient(135deg, rgba(82, 196, 26, 0.16), rgba(82, 196, 26, 0.08));
}

.layout-block--muted,
.grid-demo-box--muted {
  background: linear-gradient(135deg, rgba(250, 173, 20, 0.18), rgba(250, 173, 20, 0.08));
}

.loading-target {
  min-height: 96px;
  position: relative;
}

.loading-target--directive {
  border: 1px dashed rgba(var(--admin-primary-rgb), 0.2);
  background: rgba(var(--admin-primary-rgb), 0.04);
}

.watermark-box {
  position: relative;
  min-height: 100px;
}

.watermark-box--strong {
  min-height: 132px;
  padding: 16px;
  border: 1px dashed rgba(var(--admin-primary-rgb), 0.18);
  background:
    linear-gradient(
      135deg,
      rgba(var(--admin-primary-rgb), 0.06),
      rgba(var(--admin-primary-rgb), 0.02)
    ),
    repeating-linear-gradient(
      -45deg,
      rgba(var(--admin-primary-rgb), 0.05),
      rgba(var(--admin-primary-rgb), 0.05) 10px,
      rgba(255, 255, 255, 0) 10px,
      rgba(255, 255, 255, 0) 20px
    );
}

.watermark-box--showcase {
  display: block;
  min-height: 236px;
  padding: 20px;
  border: 1px solid rgba(var(--admin-primary-rgb), 0.12);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.94), rgba(248, 250, 252, 0.96));
}

.watermark-content {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 108px;
  min-height: 44px;
  padding: 0 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(8px);
  color: var(--admin-primary);
  font-weight: 700;
}

.watermark-showcase,
.watermark-showcase__header,
.watermark-showcase__metrics,
.watermark-showcase__metric,
.watermark-showcase__content {
  position: relative;
  z-index: 1;
}

.watermark-showcase {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.watermark-showcase__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  color: var(--admin-text);
}

.watermark-showcase__header span {
  color: var(--admin-text-secondary);
  font-size: 13px;
}

.watermark-showcase__metrics {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.watermark-showcase__metric {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 14px;
  border-radius: 12px;
  background: rgba(var(--admin-primary-rgb), 0.06);
  border: 1px solid rgba(var(--admin-primary-rgb), 0.08);
}

.watermark-showcase__metric span {
  color: var(--admin-text-secondary);
  font-size: 12px;
}

.watermark-showcase__metric strong {
  color: var(--admin-primary);
  font-size: 18px;
}

.watermark-showcase__content {
  display: grid;
  gap: 12px;
}

.watermark-showcase__content p {
  margin: 0;
  line-height: 1.7;
  color: var(--admin-text-secondary);
}

.calendar-demo-wrap {
  width: 100%;
  min-width: 0;
}

.calendar-demo-wrap :deep(.yh-calendar) {
  width: 100%;
  min-width: 0;
  --yh-calendar-cell-height: clamp(72px, 8vw, 100px);
  --yh-calendar-title-size: clamp(18px, 2vw, 22px);
}

.calendar-demo-wrap :deep(.yh-calendar__header) {
  padding: 16px 20px 18px;
}

.calendar-demo-wrap :deep(.yh-calendar__body) {
  padding: 18px 20px 22px;
}

.calendar-demo-wrap :deep(.yh-calendar__table) {
  border-spacing: 8px 8px;
}

.transfer-demo-wrap {
  width: 100%;
  min-width: 0;
}

.transfer-demo-wrap :deep(.yh-transfer) {
  display: flex;
  align-items: stretch;
  width: 100%;
  min-width: 0;
}

.transfer-demo-wrap :deep(.yh-transfer-panel) {
  flex: 1 1 0;
  width: auto;
  min-width: 0;
  height: 320px;
}

.transfer-demo-wrap :deep(.yh-transfer__buttons) {
  flex: 0 0 auto;
  justify-content: center;
}

.demo-fit-wrap {
  display: grid;
  gap: 12px;
}

.form-schema-demo-wrap {
  min-width: 0;
}

.form-schema-demo-wrap :deep(.yh-form-item) {
  margin-bottom: 0;
}

.grid-demo-box,
.grid-item-demo-box {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 56px;
  border-radius: 10px;
  color: var(--admin-text);
}

.grid-item-demo-box {
  min-height: 72px;
}

.carousel-demo-wrap {
  height: 140px;
  min-width: 0;
}

.carousel-demo-wrap :deep(.yh-carousel) {
  height: 100%;
  border-radius: 8px;
  background: linear-gradient(135deg, rgba(22, 119, 255, 0.92), rgba(105, 177, 255, 0.92));
}

.carousel-item-box {
  min-height: 100%;
  color: #fff;
  background: transparent;
}

.category-nav-demo-wrap {
  height: 260px;
  min-width: 0;
  overflow: hidden;
  border: 1px solid var(--admin-border);
  border-radius: 8px;
}

.smart-address-demo-wrap {
  min-width: 0;
}

.smart-address-demo-shell {
  display: grid;
  gap: 14px;
  padding: 16px;
  border: 1px solid rgba(var(--admin-primary-rgb), 0.12);
  border-radius: 16px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(248, 250, 252, 0.98)),
    linear-gradient(
      135deg,
      rgba(var(--admin-primary-rgb), 0.06),
      rgba(var(--admin-primary-rgb), 0.02)
    );
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.06);
  min-width: 0;
}

.smart-address-demo-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  min-width: 0;
}

.smart-address-demo-title {
  display: grid;
  gap: 6px;
  min-width: 0;
}

.smart-address-demo-title strong {
  font-size: 16px;
  line-height: 1.4;
  color: var(--admin-text);
}

.smart-address-demo-title span {
  color: var(--admin-text-secondary);
  font-size: 13px;
  line-height: 1.6;
}

.smart-address-demo-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
}

.smart-address-demo-tag {
  display: inline-flex;
  align-items: center;
  height: 24px;
  padding: 0 10px;
  border-radius: 999px;
  background: rgba(var(--admin-primary-rgb), 0.08);
  border: 1px solid rgba(var(--admin-primary-rgb), 0.14);
  color: var(--admin-primary);
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}

.smart-address-parse-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 22px;
  height: 22px;
  padding: 0 6px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.18);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.smart-address-preview {
  display: grid;
  gap: 8px;
  padding: 12px 14px;
  border: 1px solid rgba(var(--admin-primary-rgb), 0.12);
  border-radius: 12px;
  background: rgba(var(--admin-primary-rgb), 0.04);
}

.smart-address-preview__label {
  color: var(--admin-primary);
  font-size: 12px;
  font-weight: 700;
}

.smart-address-preview__value {
  color: var(--admin-text);
  font-size: 14px;
  font-weight: 600;
  line-height: 1.5;
}

.smart-address-preview__address {
  color: var(--admin-text-secondary);
  font-size: 13px;
  line-height: 1.6;
  word-break: break-word;
}

.smart-address-demo-wrap :deep(.yh-smart-address__parser) {
  margin-bottom: 0;
  border-radius: 14px;
  background: linear-gradient(
    135deg,
    rgba(var(--admin-primary-rgb), 0.08),
    rgba(var(--admin-primary-rgb), 0.03)
  );
  border-color: rgba(var(--admin-primary-rgb), 0.14);
}

.smart-address-demo-wrap :deep(.yh-smart-address__parser-actions) {
  justify-content: space-between;
  flex-wrap: wrap;
}

.smart-address-demo-wrap :deep(.yh-smart-address__fields) {
  gap: 14px;
}

.smart-address-demo-wrap :deep(.yh-smart-address__label) {
  color: var(--admin-text);
  font-weight: 600;
}

.smart-address-demo-wrap :deep(.yh-smart-address__input),
.smart-address-demo-wrap :deep(.yh-smart-address .yh-select) {
  border-radius: 10px;
}

.smart-address-demo-wrap :deep(.yh-smart-address__parse-btn) {
  min-width: 108px;
  justify-content: center;
  border-radius: 999px;
  box-shadow: 0 8px 20px rgba(var(--admin-primary-rgb), 0.2);
}

@media (max-width: 768px) {
  .smart-address-demo-header {
    flex-direction: column;
  }

  .smart-address-demo-tags {
    justify-content: flex-start;
  }
}

.waterfall-demo-card {
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 14px;
  min-width: 0;
  background: linear-gradient(180deg, rgba(22, 119, 255, 0.08), rgba(22, 119, 255, 0.02));
}

.waterfall-demo-tag {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 999px;
  background: rgba(var(--admin-primary-rgb), 0.12);
  color: var(--admin-primary);
  font-size: 12px;
}

.waterfall-demo-title {
  font-size: 16px;
  line-height: 1.4;
}

.waterfall-demo-text {
  margin: 0;
  color: var(--admin-text-secondary);
  line-height: 1.5;
}

.container-demo {
  min-height: 220px;
  border: 1px dashed var(--admin-border);
  border-radius: 12px;
  overflow: hidden;
  background: linear-gradient(180deg, rgba(245, 247, 250, 0.98), rgba(238, 243, 248, 0.98));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.65);
}

.container-middle {
  flex: 1;
  min-height: 132px;
  background: linear-gradient(180deg, rgba(232, 240, 252, 0.45), rgba(240, 246, 255, 0.8));
}

.container-box {
  min-width: 0;
  padding: 0 12px;
}

.container-box--header,
.container-box--footer {
  border-bottom: 1px solid rgba(var(--admin-primary-rgb), 0.08);
}

.container-box--aside {
  background: linear-gradient(180deg, rgba(229, 246, 255, 0.96), rgba(219, 240, 252, 0.94));
  border-right: 1px solid rgba(var(--admin-primary-rgb), 0.08);
}

.container-box--main {
  background: linear-gradient(180deg, rgba(247, 250, 255, 0.98), rgba(241, 246, 255, 0.96));
}

.container-box--header {
  background: linear-gradient(135deg, rgba(22, 119, 255, 0.22), rgba(105, 177, 255, 0.14));
}

.container-box--footer {
  background: linear-gradient(135deg, rgba(250, 173, 20, 0.16), rgba(255, 236, 179, 0.22));
}

.container-toolbar,
.container-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
}

.container-toolbar__brand {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.container-toolbar__logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 10px;
  background: linear-gradient(
    135deg,
    rgba(var(--admin-primary-rgb), 0.95),
    rgba(105, 177, 255, 0.92)
  );
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  box-shadow: 0 8px 18px rgba(var(--admin-primary-rgb), 0.24);
}

.container-toolbar__meta {
  display: grid;
  gap: 2px;
  min-width: 0;
}

.container-toolbar__meta strong {
  color: var(--admin-text);
  font-size: 14px;
  line-height: 1.3;
}

.container-toolbar__meta span,
.container-footer,
.container-footer__status {
  color: var(--admin-text-secondary);
  font-size: 12px;
}

.container-toolbar__actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.container-chip {
  display: inline-flex;
  align-items: center;
  height: 24px;
  padding: 0 10px;
  border-radius: 999px;
  border: 1px solid rgba(var(--admin-primary-rgb), 0.14);
  background: rgba(255, 255, 255, 0.62);
  color: var(--admin-primary);
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}

.container-chip--strong {
  background: rgba(82, 196, 26, 0.14);
  border-color: rgba(82, 196, 26, 0.24);
  color: #389e0d;
}

.container-nav {
  display: grid;
  gap: 8px;
  width: 100%;
}

.container-nav__title {
  color: var(--admin-text-secondary);
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.container-nav__item {
  display: flex;
  align-items: center;
  height: 34px;
  padding: 0 12px;
  border-radius: 10px;
  color: var(--admin-text-secondary);
  font-size: 13px;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.62);
}

.container-nav__item.is-active {
  background: linear-gradient(135deg, rgba(22, 119, 255, 0.22), rgba(105, 177, 255, 0.14));
  color: var(--admin-primary);
}

.container-main {
  display: grid;
  gap: 12px;
  width: 100%;
}

.container-main__hero {
  display: grid;
  gap: 4px;
  padding: 14px 16px;
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(22, 119, 255, 0.2), rgba(105, 177, 255, 0.1));
  border: 1px solid rgba(22, 119, 255, 0.14);
}

.container-main__hero-title {
  color: var(--admin-text);
  font-size: 15px;
  font-weight: 700;
}

.container-main__hero-desc,
.container-main__panel-header span {
  color: var(--admin-text-secondary);
  font-size: 12px;
  line-height: 1.5;
}

.container-main__stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.container-stat-card {
  display: grid;
  gap: 6px;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid rgba(var(--admin-primary-rgb), 0.08);
}

.container-stat-card:nth-child(1) {
  background: linear-gradient(180deg, rgba(230, 244, 255, 0.96), rgba(219, 236, 255, 0.92));
}

.container-stat-card:nth-child(2) {
  background: linear-gradient(180deg, rgba(255, 247, 230, 0.96), rgba(255, 238, 204, 0.92));
}

.container-stat-card:nth-child(3) {
  background: linear-gradient(180deg, rgba(246, 255, 237, 0.96), rgba(229, 247, 214, 0.92));
}

.container-stat-card span {
  color: var(--admin-text-secondary);
  font-size: 12px;
}

.container-stat-card strong {
  color: var(--admin-primary);
  font-size: 20px;
  line-height: 1;
}

.container-main__panel {
  display: grid;
  gap: 10px;
  padding: 14px 16px;
  border-radius: 14px;
  background: linear-gradient(180deg, rgba(245, 240, 255, 0.96), rgba(237, 233, 254, 0.9));
  border: 1px solid rgba(114, 46, 209, 0.08);
}

.container-main__panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.container-main__panel-header strong {
  color: var(--admin-text);
  font-size: 14px;
}

.container-task-list {
  display: grid;
  gap: 8px;
}

.container-task-item {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  color: var(--admin-text-secondary);
  font-size: 13px;
  padding: 8px 10px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.56);
}

.container-task-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  background: rgba(var(--admin-primary-rgb), 0.32);
}

.container-task-dot.is-success {
  background: #52c41a;
}

.container-task-dot.is-warning {
  background: #faad14;
}

.container-footer__status {
  font-weight: 600;
}

@media (max-width: 768px) {
  .container-toolbar,
  .container-footer,
  .container-main__panel-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .container-toolbar__actions {
    justify-content: flex-start;
  }

  .container-main__stats {
    grid-template-columns: 1fr;
  }
}

.voice-demo-wrap {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
}

.voice-transcript {
  width: 100%;
  min-height: 92px;
  padding: 12px 14px;
  border: 1px solid var(--admin-border);
  border-radius: 10px;
  background: rgba(var(--admin-primary-rgb), 0.04);
}

.voice-label {
  margin-bottom: 8px;
  color: var(--admin-primary);
  font-size: 13px;
  font-weight: 700;
}

.voice-text {
  line-height: 1.6;
  color: var(--admin-text);
}

.infinite-scroll-box {
  max-height: 160px;
  overflow: auto;
  min-width: 0;
}

.gantt-demo-wrap {
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
}

.gantt-demo-wrap :deep(.yh-gantt-chart) {
  min-width: 640px;
}
</style>
