<script setup lang="ts">
import { ref, reactive } from 'vue'
import { YhMessage } from '@yh-ui/yh-ui'
import type { AiChatMessage } from '@yh-ui/components'
import dayjs from 'dayjs'

// --- 状态定义 ---
const activeTab = ref('assistant')
const loading = ref(false)

// AI 运行的参数表单状态
const configForm = reactive({
  assistantName: 'YH-智能运维专家',
  model: 'YH-AI-Large',
  dateRange: [new Date(), new Date()] as [Date, Date],
  systemPrompt:
    '你是一个顶级的 DevOps 与云原生架构专家，负责实时监控、排查并预测 YH-UI 分布式系统的健康度与性能瓶颈。',
  streamOutput: true,
  thoughtChain: true,
  includeContext: true
})

// AI 接口调用历史数据记录
interface ApiLog {
  id: string
  time: string
  model: string
  tokens: number
  latency: string
  status: 'success' | 'warning' | 'error'
}

const apiLogs = ref<ApiLog[]>([
  {
    id: 'req-001',
    time: '11:05:12',
    model: 'YH-AI-Large',
    tokens: 412,
    latency: '1.2s',
    status: 'success'
  },
  {
    id: 'req-002',
    time: '11:10:45',
    model: 'YH-AI-Large',
    tokens: 820,
    latency: '2.5s',
    status: 'success'
  },
  {
    id: 'req-003',
    time: '11:12:01',
    model: 'YH-AI-Lite',
    tokens: 154,
    latency: '0.4s',
    status: 'success'
  }
])

// 聊天历史纪录
const messages = ref<AiChatMessage[]>([])

const suggestions = ref([
  '分析今天 CPU 使用率异常',
  '查询系统是否有高风险报警',
  '生成微服务架构流程图',
  '优化数据库查询慢日志'
])

// 思考链的状态
const showThoughtChain = ref(false)
const thoughtSteps = ref<
  { title: string; status: 'wait' | 'process' | 'success' | 'error'; content?: string }[]
>([])

// --- 发送会话与模拟 AI 流式回复 ---
const handleSend = (text: string) => {
  if (!text.trim() || loading.value) return

  // 1. 用户输入入队
  messages.value.push({
    id: `msg-user-${Date.now()}`,
    role: 'user',
    content: text,
    time: dayjs().format('HH:mm:ss')
  })

  loading.value = true

  // 判定是否展示思考链
  const useThought = configForm.thoughtChain

  if (useThought) {
    showThoughtChain.value = true
    thoughtSteps.value = [
      {
        title: '解析输入指令与环境上下文',
        status: 'process',
        content: `分析用户问题: "${text}"。已绑定日期分析范围: [${dayjs(configForm.dateRange[0]).format('YYYY-MM-DD')} 至 ${dayjs(configForm.dateRange[1]).format('YYYY-MM-DD')}]。当前运行模型: ${configForm.model}。`
      },
      { title: '提取系统核心遥测指标 (Metrics)', status: 'wait' },
      { title: '比对高风险报警规则 (Alerts)', status: 'wait' },
      { title: '生成架构拓扑与诊断结论', status: 'wait' }
    ]
  }

  // 模拟思考和流式生成
  setTimeout(() => {
    if (useThought) {
      thoughtSteps.value[0].status = 'success'
      thoughtSteps.value[1].status = 'process'
      thoughtSteps.value[1].content =
        '检索 Prometheus 与 InfluxDB 监控：微服务 pod-auth-6fdc CPU 使用率在 10:20:15 达到 94.2%，内存使用率稳定，JVM 垃圾回收耗时 120ms。'
    }

    setTimeout(() => {
      if (useThought) {
        thoughtSteps.value[1].status = 'success'
        thoughtSteps.value[2].status = 'process'
        thoughtSteps.value[2].content =
          '匹配报警数据库：在 10:22:00 触发 ALERT_CPU_CRITICAL。关联事件：用户管理微服务响应耗时（P99）陡增至 1.8 秒。'
      }

      setTimeout(() => {
        if (useThought) {
          thoughtSteps.value[2].status = 'success'
          thoughtSteps.value[3].status = 'process'
          thoughtSteps.value[3].content =
            '结论确认：CPU 异常暴涨是由于昨日发布的用户列表排序算法未做分页限制，在十万级并发下拉取了全量数据，导致 CPU 被排序计算占满。'
        }

        setTimeout(() => {
          if (useThought) {
            thoughtSteps.value[3].status = 'success'
            showThoughtChain.value = false
          }

          // 3. 开始模拟生成答复
          const aiResponseId = `msg-ai-${Date.now()}`
          let fullReply = ''

          if (text.includes('警报') || text.includes('报警') || text.includes('异常')) {
            fullReply = `### 🚨 诊断报告：微服务 CPU 异常暴涨及慢查询响应

根据您选定的分析范围（**${dayjs(configForm.dateRange[0]).format('YYYY-MM-DD')}**），AI 引擎已为您抓取并提取出最新的遥测诊断数据：

#### 📈 实时状态列表
| 微服务名称 | CPU 使用率 | 内存负载 | 当前活动报警数 | 诊断状态 |
| :--- | :--- | :--- | :---: | :--- |
| \`pod-user-auth\` | **94.2%** | 62.1% | 2 | ⚠️ 严重超载 |
| \`pod-payment-gw\`| 12.8% | 45.4% | 0 | ✅ 健康 |
| \`pod-order-service\`| 34.5% | 78.2% | 1 | ℹ️ 内存偏高 |

---

#### 💡 诊断结论与优化建议
1. **根本原因**：昨日在 \`UserManage.vue\` 中更新的拉取函数，在十万级测试用户（**12,846**个用户账号）并发访问时没有实施分批（Pagination）截断，触发了内存排序算法性能危机。
2. **紧急修复**：立即在 API 端点引入 \`limit=50\` 强限制，并部署分布式限流熔断，保障主服务安全。
`
          } else if (text.includes('图') || text.includes('架构') || text.includes('流程')) {
            fullReply = `### 🌐 系统分布式微服务调用拓扑图

这里是通过 AI 自动绘制的系统运行时服务链路依赖流转图：

\`\`\`mermaid
graph TD
  User([用户请求]) -->|Ingress| Gateway[API 网关 pod-gateway]
  Gateway -->|路由转发| AuthService[鉴权服务 pod-auth]
  Gateway -->|拉取列表| UserService[用户服务 pod-user]
  UserService -->|慢查询 JVM 阻塞| DB[(主 MySQL 数据库)]
  UserService -->|会话缓存| Redis[(Redis 哨兵集群)]

  style AuthService fill:#f9f,stroke:#333,stroke-width:2px
  style DB fill:#ffcccb,stroke:#f00,stroke-width:3px
  style UserService fill:#ffb366,stroke:#333,stroke-width:2px
\`\`\`

已经为您把诊断分析图表生成在右侧 **「生成物陈列室」** 选项卡中，您可以切换至该 Tab 查看高宽大图渲染！
`
          } else {
            fullReply = `我已经接收到您的提问：\n> "${text}"\n\n当前模型（**${configForm.model}**）在加载了系统提示词 \`System Prompt\`（包含限制、诊断知识库）后，已针对所选分析时段进行了解析。结论如下：\n- **系统分析指标**：目前处于完全平稳阶段。\n- **数据时间切片**：数据采集起止于 **${dayjs(configForm.dateRange[0]).format('YYYY-MM-DD')}**。\n- **下一步操作建议**：若想测试深度故障排查，建议在输入框发送 **「分析今天 CPU 使用率异常」** 或 **「生成微服务架构流程图」**，可立即调起 AI 的核心深度思考与结构化渲染卡片。`
          }

          // 模拟流式打字输出
          messages.value.push({
            id: aiResponseId,
            role: 'assistant',
            content: '',
            status: 'generating',
            time: dayjs().format('HH:mm:ss')
          })

          const aiMsg = messages.value[messages.value.length - 1]
          let currIndex = 0
          const timer = setInterval(() => {
            if (currIndex < fullReply.length) {
              const stepLength = configForm.streamOutput
                ? Math.floor(Math.random() * 5) + 3
                : fullReply.length
              currIndex = Math.min(currIndex + stepLength, fullReply.length)
              aiMsg.content = fullReply.slice(0, currIndex)
            } else {
              clearInterval(timer)
              aiMsg.status = 'success'
              loading.value = false

              // 模拟记录本次 AI 消费日志
              apiLogs.value.unshift({
                id: `req-${Date.now().toString().slice(-3)}`,
                time: dayjs().format('HH:mm:ss'),
                model: configForm.model,
                tokens: Math.floor(Math.random() * 600) + 200,
                latency: `${(Math.random() * 2 + 0.5).toFixed(1)}s`,
                status: 'success'
              })

              YhMessage.success('AI 响应生成完毕！')

              // 如果包含流程图，自动帮用户切换到生成物 Tab 提升体验
              if (text.includes('图') || text.includes('架构') || text.includes('流程')) {
                activeTab.value = 'artifacts'
              }
            }
          }, 35)
        }, 1200)
      }, 800)
    }, 800)
  }, 1000)
}

const handleClear = () => {
  messages.value = [
    {
      id: 'msg-init-2',
      role: 'assistant',
      content: '会话已清空。请输入您需要排查的系统运维问题！',
      time: dayjs().format('HH:mm:ss')
    }
  ]
  YhMessage.info('对话历史已重置')
}

const clearLogs = () => {
  apiLogs.value = []
  YhMessage.success('API 调用消费日志已清空')
}

const resetConfig = () => {
  configForm.assistantName = 'YH-智能运维专家'
  configForm.model = 'YH-AI-Large'
  configForm.dateRange = [new Date(), new Date()]
  configForm.systemPrompt =
    '你是一个顶级的 DevOps 与云原生架构专家，负责实时监控、排查并预测 YH-UI 分布式系统的健康度与性能瓶颈。'
  configForm.streamOutput = true
  configForm.thoughtChain = true
  configForm.includeContext = true
  YhMessage.info('助手配置已重置为默认值')
}
</script>

<template>
  <div class="ai-dashboard-container">
    <div class="dashboard-grid">
      <!-- ================== 左侧：AI 运维参数配置区 ================== -->
      <div class="control-panel-column">
        <YhCard class="premium-card">
          <template #header>
            <div class="card-header-wrapper">
              <span class="card-header-title">⚙️ AI 智能助手配置中心</span>
              <YhButton size="small" @click="resetConfig">重置配置</YhButton>
            </div>
          </template>

          <YhForm :model="configForm" label-position="top" size="default">
            <YhFormItem label="🤖 助手名称">
              <YhInput
                v-model="configForm.assistantName"
                placeholder="请输入 AI 助手名称"
                maxlength="20"
                show-word-limit
              />
            </YhFormItem>

            <YhFormItem label="🧠 推理模型选择">
              <YhSelect
                v-model="configForm.model"
                placeholder="请选择大语言模型"
                style="width: 100%"
              >
                <YhOption label="YH-AI-Large (深度思维增强版)" value="YH-AI-Large" />
                <YhOption label="YH-AI-Medium (多模态分析版)" value="YH-AI-Medium" />
                <YhOption label="YH-AI-Lite (极速响应版)" value="YH-AI-Lite" />
              </YhSelect>
            </YhFormItem>

            <YhFormItem label="📅 分析日志时间范围">
              <!-- 使用我们完美修复的 YhDatePicker 组件，测试包含 teleport/position 逻辑 -->
              <YhDatePicker
                v-model="configForm.dateRange"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                style="width: 100%"
              />
            </YhFormItem>

            <YhFormItem label="📝 系统提示词 (System Prompt)">
              <YhInput
                v-model="configForm.systemPrompt"
                type="textarea"
                :rows="4"
                placeholder="请输入 System Prompt 对模型做角色约束..."
                style="width: 100%"
              />
            </YhFormItem>

            <div class="switch-grid">
              <div class="switch-item">
                <span class="switch-item__label">流式输出</span>
                <YhSwitch
                  v-model="configForm.streamOutput"
                  active-text="开启"
                  inactive-text="关闭"
                />
              </div>

              <div class="switch-item">
                <span class="switch-item__label">深度思考链</span>
                <YhSwitch
                  v-model="configForm.thoughtChain"
                  active-text="开启"
                  inactive-text="关闭"
                />
              </div>

              <div class="switch-item">
                <span class="switch-item__label">附带系统日志</span>
                <YhSwitch
                  v-model="configForm.includeContext"
                  active-text="注入"
                  inactive-text="忽略"
                />
              </div>
            </div>
          </YhForm>
        </YhCard>

        <!-- ================== 左下方：AI 调用与 Token 消费日志表 ================== -->
        <YhCard class="premium-card log-card">
          <template #header>
            <div class="card-header-wrapper">
              <span class="card-header-title">📊 实时 API 消费调用记录</span>
              <YhButton
                size="small"
                type="danger"
                plain
                @click="clearLogs"
                :disabled="apiLogs.length === 0"
              >
                清空记录
              </YhButton>
            </div>
          </template>

          <YhTable :data="apiLogs" style="width: 100%" max-height="200px" size="small">
            <YhTableColumn prop="id" label="请求ID" width="90" />
            <YhTableColumn prop="time" label="请求时间" width="80" />
            <YhTableColumn prop="model" label="使用模型" width="100" />
            <YhTableColumn prop="tokens" label="消耗Tokens" width="100" />
            <YhTableColumn prop="latency" label="响应时延" width="80" />
          </YhTable>
        </YhCard>
      </div>

      <!-- ================== 右侧：AI 智能会话与渲染沙盒 ================== -->
      <div class="playground-column">
        <YhTabs v-model="activeTab" class="premium-tabs">
          <!-- TAB 1: 智能运维会话助手 -->
          <YhTabPane label="🤖 智能会话沙盒" name="assistant">
            <div class="chat-container-box">
              <!-- 嵌入 AI 迎新欢迎组件 -->
              <div v-if="messages.length <= 1" class="welcome-box-wrapper">
                <YhAiWelcome
                  title="欢迎使用 YH-UI 智能运维中心"
                  description="基于最顶尖的函数式编程组件库与 AI 大模型，为您提供秒级的分布式系统全链路监控、JVM 慢日志诊断、及微服务架构自动生成能力。"
                />
              </div>

              <!-- 深度推理思考链动态显示 (YhAiThoughtChain / YhAiThinking) -->
              <div v-if="showThoughtChain" class="thought-chain-wrapper">
                <div class="thought-title">🧠 AI 正在检索核心遥测系统进行深度思维推理中...</div>
                <YhAiThoughtChain :steps="thoughtSteps" />
                <div style="margin-top: 12px">
                  <YhAiThinking loading typing variant="borderless" />
                </div>
              </div>

              <!-- AI 主聊聊天对话框组件 -->
              <YhAiChat
                :messages="messages"
                :suggestions="suggestions"
                :loading="loading"
                @send="handleSend"
                @clear="handleClear"
                class="main-chat-widget"
              />
            </div>
          </YhTabPane>

          <!-- TAB 2: AI 生成物陈列室 (Artifacts Room) -->
          <YhTabPane label="📂 生成物陈列室" name="artifacts">
            <div class="artifacts-container">
              <h3
                style="
                  margin-top: 0;
                  color: var(--admin-text);
                  display: flex;
                  align-items: center;
                  gap: 8px;
                "
              >
                <span>📁 架构资产与附件卡片</span>
                <span class="badge-tag">AI 自动生成</span>
              </h3>

              <div class="artifacts-grid">
                <!-- AI 文件卡片消费展示 -->
                <div style="cursor: pointer">
                  <YhAiFileCard
                    name="microservice-alert-report.pdf"
                    :byte="2.4 * 1024 * 1024"
                    type="pdf"
                    description="关于 pod-auth-6fdc 节点 CPU 占用突发 94.2% 的全链路慢调用深度审计日志与 JVM 线程栈堆栈分析报告。"
                  />
                </div>

                <div style="cursor: pointer">
                  <YhAiFileCard
                    name="gateway-cluster-topology.json"
                    :byte="18.5 * 1024"
                    type="json"
                    description="API Gateway 网关及负载均衡分发链路配置文件结构树拓扑数据。"
                  />
                </div>
              </div>

              <!-- 复杂的微服务流转展示 -->
              <div class="mermaid-preview-box">
                <h4 style="margin: 0 0 12px 0; color: var(--admin-text-secondary)">
                  ⚡ 微服务网关负载调用拓扑：
                </h4>
                <!-- 消费 AI Mermaid 渲染组件 -->
                <YhAiMermaid
                  code="graph TD
  User([用户请求]) -->|Ingress| Gateway[API 网关 pod-gateway]
  Gateway -->|路由转发| AuthService[鉴权服务 pod-auth]
  Gateway -->|拉取列表| UserService[用户服务 pod-user]
  UserService -->|慢查询 JVM 阻塞| DB[(主 MySQL 数据库)]
  UserService -->|会话缓存| Redis[(Redis 哨兵集群)]

  style AuthService fill:#f9f,stroke:#333,stroke-width:2px
  style DB fill:#ffcccb,stroke:#f00,stroke-width:3px
  style UserService fill:#ffb366,stroke:#333,stroke-width:2px"
                />
              </div>
            </div>
          </YhTabPane>
        </YhTabs>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ai-dashboard-container {
  padding: 24px;
  background: var(--admin-bg);
  min-height: calc(100vh - var(--admin-header-height));
  box-sizing: border-box;
  width: 100%;
  overflow-x: hidden;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: minmax(320px, 380px) minmax(0, 1fr);
  gap: 24px;
  align-items: start;
}

@media (max-width: 1024px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}

.control-panel-column {
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 0;
}

.premium-card {
  border-radius: 16px;
  border: 1px solid var(--admin-border);
  background: var(--admin-panel);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  overflow: hidden;
}

.card-header-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 12px;
}

.card-header-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--admin-text);
}

.switch-grid {
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-top: 1px dashed var(--admin-border);
  padding-top: 16px;
  margin-top: 16px;
}

.switch-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  padding: 12px 14px;
  border: 1px solid var(--admin-border);
  border-radius: 12px;
  background: color-mix(in srgb, var(--admin-panel) 92%, var(--admin-bg) 8%);
  box-sizing: border-box;
  min-width: 0;
}

.switch-item__label {
  display: inline-flex;
  align-items: center;
  font-size: 13px;
  font-weight: 600;
  color: var(--admin-text-secondary);
  line-height: 1.2;
  min-width: 0;
}

.switch-grid :deep(.yh-switch) {
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  height: auto;
  line-height: 1.2;
  max-width: 100%;
  flex: 0 1 auto;
  min-width: 0;
}

.switch-grid :deep(.yh-switch__label) {
  height: auto;
  line-height: 1.2;
  white-space: nowrap;
}

.switch-grid :deep(.yh-switch__label--left) {
  margin-right: 8px;
}

.switch-grid :deep(.yh-switch__label--right) {
  margin-left: 8px;
}

@media (max-width: 768px) {
  .ai-dashboard-container {
    padding: 16px;
  }

  .card-header-wrapper {
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .switch-item {
    align-items: flex-start;
    flex-direction: column;
    gap: 10px;
  }

  .switch-item__label {
    width: 100%;
  }

  .switch-grid :deep(.yh-switch) {
    justify-content: space-between;
    width: 100%;
    flex-wrap: wrap;
  }
}

.log-card :deep(.yh-table) {
  border-radius: 8px;
}

.playground-column {
  background: var(--admin-panel);
  border: 1px solid var(--admin-border);
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  padding: 20px;
  box-sizing: border-box;
  min-height: 700px;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.premium-tabs {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.premium-tabs :deep(.yh-tabs__content) {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: 16px;
}

.premium-tabs :deep(.yh-tab-pane) {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.chat-container-box {
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
  min-width: 0;
}

.welcome-box-wrapper {
  margin-bottom: 20px;
}

.thought-chain-wrapper {
  background: rgba(22, 119, 255, 0.04);
  border: 1px solid rgba(22, 119, 255, 0.15);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 20px;
}

.thought-title {
  font-size: 13px;
  font-weight: 700;
  color: #1677ff;
  margin-bottom: 12px;
}

.main-chat-widget {
  flex: 1;
  border-radius: 12px;
  border: 1px solid var(--admin-border);
  background: var(--admin-bg);
  min-height: 480px;
  display: flex;
  flex-direction: column;
}

.main-chat-widget :deep(.yh-ai-chat__content) {
  height: 380px !important;
}

.artifacts-container {
  padding: 12px 4px;
}

.badge-tag {
  font-size: 10px;
  font-weight: 700;
  color: #1677ff;
  background: rgba(22, 119, 255, 0.1);
  padding: 2px 8px;
  border-radius: 20px;
}

.artifacts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.mermaid-preview-box {
  border: 1px solid var(--admin-border);
  background: var(--admin-bg);
  border-radius: 12px;
  padding: 20px;
  min-width: 0;
}
</style>
