/**
 * YH-UI AI SDK - 前瞻性功能模块
 *
 * 面向 AI 发展未来的能力集成：
 * - Agent 编排框架 (Plan-Execute, ReAct)
 * - 多模态支持 (视觉/语音/视频理解)
 * - RAG 检索增强生成
 * - 思维链 CoT 推理
 * - 智能上下文压缩
 * - 成本控制
 * - 可观测性
 * - AI 安全护栏
 */

import { ref } from 'vue'

// ============================================
// 类型定义
// ============================================

// -------- Agent 相关 --------
export interface AgentStep {
  id: string
  type: 'thought' | 'action' | 'observation' | 'result'
  content: string
  toolName?: string
  toolInput?: Record<string, unknown>
  toolOutput?: unknown
  timestamp: Date
}

export interface AgentConfig {
  /** Agent 类型 */
  type: 'react' | 'plan-execute' | 'chat'
  /** 最大迭代次数 */
  maxIterations?: number
  /** 最大工具调用次数 */
  maxToolCalls?: number
  /** 是否返回推理过程 */
  returnReasoning?: boolean
  /** 工具列表 */
  tools?: AgentTool[]
  /** 停止条件 */
  stopConditions?: StopCondition[]
  /** 错误处理 */
  onError?: (error: Error, step: AgentStep) => void | Promise<void>
}

export interface AgentTool {
  name: string
  description: string
  parameters: Record<string, unknown>
  execute: (args: Record<string, unknown>) => Promise<unknown>
}

export interface StopCondition {
  type: 'max_iterations' | 'max_tool_calls' | 'contains' | 'custom'
  value?: string | number | ((output: string) => boolean)
}

export interface AgentResult {
  output: string
  reasoning?: AgentStep[]
  toolCalls: number
  finished: boolean
  error?: Error
}

// -------- 多模态相关 --------
export interface MultiModalContent {
  type: 'text' | 'image' | 'audio' | 'video' | 'image_url'
  text?: string
  url?: string
  base64?: string
  mimeType?: string
}

export interface MultiModalMessage {
  role: 'user' | 'assistant'
  content: MultiModalContent[]
}

export interface VisionAnalysisOptions {
  /** 图像描述 */
  detail?: 'low' | 'high' | 'auto'
  /** 额外提示 */
  prompt?: string
}

// -------- RAG 相关 --------
export interface DocumentChunk {
  id: string
  content: string
  embedding?: number[]
  metadata: Record<string, unknown>
  score?: number
}

export interface RAGConfig {
  /** 知识库 ID */
  knowledgeBaseId?: string
  /** 检索文档数量 */
  topK?: number
  /** 相似度阈值 */
  similarityThreshold?: number
  /** 是否包含源信息 */
  includeSources?: boolean
  /** 检索策略 */
  strategy?: 'similarity' | 'mmr' | 'hybrid'
}

export interface RAGResult {
  answer: string
  sources: Array<{
    content: string
    metadata: Record<string, unknown>
    score: number
  }>
  contextUsed: string
}

// -------- 思维链 CoT --------
export interface ReasoningStep {
  id: string
  content: string
  type: 'analysis' | 'reflection' | 'conclusion' | 'action'
  children?: ReasoningStep[]
}

export interface CoTConfig {
  /** 推理模式 */
  mode: 'standard' | 'chain' | 'tree' | 'tabular'
  /** 最大深度 */
  maxDepth?: number
  /** 是否显示置信度 */
  showConfidence?: boolean
}

// -------- 上下文压缩 --------
export interface CompressionConfig {
  /** 压缩策略 */
  strategy: 'summary' | 'extract' | 'prune'
  /** 目标 token 数 */
  targetTokens?: number
  /** 保留关键信息 */
  preserveKeyInfo?: string[]
}

export interface CompressionResult {
  compressedContent: string
  originalTokens: number
  compressedTokens: number
  compressionRatio: number
  extractedKeyInfo?: string[]
}

// -------- 成本控制 --------
export interface TokenUsage {
  prompt: number
  completion: number
  total: number
  cached?: number
}

export interface CostConfig {
  /** 每月预算 (美元) */
  monthlyBudget?: number
  /** 单次请求最大 token */
  maxTokensPerRequest?: number
  /** 警告阈值 */
  warningThreshold?: number
}

export interface CostTracking {
  totalCost: number
  dailyCost: Record<string, number>
  usage: TokenUsage
  budget: CostConfig
  remaining: number
}

// -------- 可观测性 --------
export interface TraceEvent {
  id: string
  type: 'request' | 'response' | 'tool_call' | 'tool_result' | 'error' | 'custom'
  timestamp: Date
  data: Record<string, unknown>
  duration?: number
  parentId?: string
}

export interface TraceSpan {
  id: string
  name: string
  startTime: Date
  endTime?: Date
  events: TraceEvent[]
  attributes: Record<string, unknown>
  children: TraceSpan[]
}

// -------- AI 安全护栏 --------
export interface SafetyRule {
  id: string
  name: string
  type: 'content_filter' | 'input_validation' | 'output_filter' | 'tool_permission'
  pattern?: string | RegExp
  customCheck?: (content: string) => boolean | Promise<boolean>
  action: 'block' | 'warn' | 'replace'
  replacement?: string
}

export interface SafetyResult {
  passed: boolean
  violations: Array<{
    rule: SafetyRule
    content: string
    action: 'blocked' | 'warned' | 'replaced'
    replacedContent?: string
  }>
}

// -------- 结构化输出 --------
export interface SchemaDefinition {
  type: 'object' | 'array' | 'union'
  properties?: Record<string, SchemaProperty>
  required?: string[]
  description?: string
}

export interface SchemaProperty {
  type: string
  description?: string
  enum?: string[]
  items?: SchemaProperty
  properties?: Record<string, SchemaProperty>
}

// ============================================
// Agent 编排框架
// ============================================

/**
 * ReAct Agent - 推理 + 行动
 *
 * @example
 * ```ts
 * const { run, steps, isRunning } = useReActAgent({
 *   tools: [searchTool, calculatorTool],
 *   maxIterations: 10,
 *   returnReasoning: true
 * })
 *
 * const result = await run('北京的人口是多少？用中文回答')
 * ```
 */
export function useReActAgent(config: AgentConfig) {
  const {
    type: _type = 'react',
    maxIterations = 10,
    maxToolCalls = 20,
    returnReasoning = false,
    tools = [],
    stopConditions = [],
    onError
  } = config

  const steps = ref<AgentStep[]>([])
  const isRunning = ref(false)
  const currentOutput = ref('')
  const toolCallCount = ref(0)

  const addStep = (step: Omit<AgentStep, 'id' | 'timestamp'>) => {
    steps.value.push({
      ...step,
      id: `step-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      timestamp: new Date()
    })
  }

  const checkStopConditions = (output: string): boolean => {
    for (const condition of stopConditions) {
      switch (condition.type) {
        case 'contains':
          if (condition.value && output.includes(condition.value as string)) {
            return true
          }
          break
        case 'custom':
          if (condition.value && (condition.value as (output: string) => boolean)(output)) {
            return true
          }
          break
      }
    }
    return false
  }

  const executeTool = async (toolName: string, args: Record<string, unknown>): Promise<string> => {
    const tool = tools.find((t) => t.name === toolName)
    if (!tool) {
      throw new Error(`Tool not found: ${toolName}`)
    }

    addStep({
      type: 'action',
      content: `Executing tool: ${toolName}`,
      toolName,
      toolInput: args
    })

    try {
      const result = await tool.execute(args)
      const resultStr = typeof result === 'string' ? result : JSON.stringify(result)

      addStep({
        type: 'observation',
        content: resultStr,
        toolName,
        toolOutput: result
      })

      toolCallCount.value++
      return resultStr
    } catch (error) {
      addStep({
        type: 'observation',
        content: `Error: ${error instanceof Error ? error.message : String(error)}`,
        toolName,
        toolOutput: error
      })
      throw error
    }
  }

  const parseResponse = (
    response: string
  ): { thought: string; action?: string; actionInput?: string } => {
    // 简单的 ReAct 解析
    const thoughtMatch = response.match(/Thought:?\s*(.+)/i)
    const actionMatch = response.match(/Action:?\s*(.+)/i)
    const actionInputMatch = response.match(/Action Input:?\s*(.+)/i)

    return {
      thought: thoughtMatch ? thoughtMatch[1].trim() : response,
      action: actionMatch ? actionMatch[1].trim() : undefined,
      actionInput: actionInputMatch ? actionInputMatch[1].trim() : undefined
    }
  }

  const run = async (
    input: string,
    executeFn: (prompt: string) => Promise<string>
  ): Promise<AgentResult> => {
    if (isRunning.value) {
      throw new Error('Agent is already running')
    }

    isRunning.value = true
    steps.value = []
    currentOutput.value = ''
    toolCallCount.value = 0

    let iteration = 0
    let context = `Task: ${input}\n\n`

    try {
      while (iteration < maxIterations && toolCallCount.value < maxToolCalls) {
        iteration++

        // 检查停止条件
        if (checkStopConditions(currentOutput.value)) {
          break
        }

        // 添加思考步骤
        addStep({
          type: 'thought',
          content: `Iteration ${iteration}: Thinking about how to proceed...`
        })

        // 执行推理
        const response = await executeFn(context)

        // 解析响应
        const parsed = parseResponse(response)
        currentOutput.value = parsed.thought

        // 如果有动作，执行它
        if (parsed.action && parsed.actionInput) {
          try {
            const observation = await executeTool(parsed.action, JSON.parse(parsed.actionInput))
            context += `Thought: ${parsed.thought}\nAction: ${parsed.action}\nAction Input: ${parsed.actionInput}\nObservation: ${observation}\n\n`
          } catch (error) {
            context += `Thought: ${parsed.thought}\nAction: ${parsed.action}\nAction Input: ${parsed.actionInput}\nObservation: Error - ${error instanceof Error ? error.message : String(error)}\n\n`

            if (onError) {
              await onError(error as Error, steps.value[steps.value.length - 1])
            }
          }
        } else {
          // 没有更多动作，任务完成
          addStep({
            type: 'result',
            content: parsed.thought
          })
          break
        }
      }

      return {
        output: currentOutput.value,
        reasoning: returnReasoning ? steps.value : undefined,
        toolCalls: toolCallCount.value,
        finished: iteration >= maxIterations
      }
    } catch (error) {
      return {
        output: currentOutput.value,
        reasoning: returnReasoning ? steps.value : undefined,
        toolCalls: toolCallCount.value,
        finished: false,
        error: error instanceof Error ? error : new Error(String(error))
      }
    } finally {
      isRunning.value = false
    }
  }

  return {
    steps,
    isRunning,
    currentOutput,
    toolCallCount,
    run
  }
}

/**
 * Plan-Execute Agent - 计划 + 执行
 *
 * @example
 * ```ts
 * const agent = createPlanExecuteAgent({
 *   tools: [searchTool, calculatorTool]
 * })
 *
 * const result = await agent.execute('帮我查北京人口，然后计算增长')
 * ```
 */
export function createPlanExecuteAgent(config: { tools?: AgentTool[]; maxSteps?: number }) {
  const { tools = [] } = config

  const plans = ref<
    Array<{ id: string; description: string; status: 'pending' | 'completed' | 'failed' }>
  >([])
  const currentPlan = ref<string | null>(null)
  const results = ref<Record<string, unknown>>({})

  const executeTool = async (toolName: string, args: Record<string, unknown>): Promise<unknown> => {
    const tool = tools.find((t) => t.name === toolName)
    if (!tool) {
      throw new Error(`Tool not found: ${toolName}`)
    }
    return tool.execute(args)
  }

  const execute = async (
    task: string,
    llm: (prompt: string) => Promise<string>
  ): Promise<{
    result: string
    plan: typeof plans.value
    results: typeof results.value
  }> => {
    // 1. 分解任务
    const planPrompt = `分解以下任务为多个可执行的步骤，返回 JSON 数组格式：
    [{"step": "步骤描述", "tool": "工具名", "input": {"参数": "值"}}]
    
    任务: ${task}
    
    可用工具: ${tools.map((t) => t.name).join(', ')}`

    const planResponse = await llm(planPrompt)

    // 解析计划
    try {
      const parsed = JSON.parse(planResponse.replace(/```json|```/g, '').trim())
      plans.value = parsed.map(
        (p: { step: string; tool?: string; input?: Record<string, unknown> }, i: number) => ({
          id: `plan-${i}`,
          description: p.step,
          status: 'pending' as const
        })
      )
    } catch {
      plans.value = [{ id: 'plan-0', description: planResponse, status: 'pending' as const }]
    }

    // 2. 执行计划
    for (const plan of plans.value) {
      currentPlan.value = plan.id
      plan.status = 'pending'

      try {
        // 生成工具调用
        const execPrompt = `根据当前步骤生成工具调用：
        
        步骤: ${plan.description}
        上下文: ${JSON.stringify(results.value)}
        
        返回格式: {"tool": "工具名", "input": {"参数": "值"}}`

        const execResponse = await llm(execPrompt)
        const exec = JSON.parse(execResponse.replace(/```json|```/g, '').trim())

        // 执行工具
        if (exec.tool) {
          const result = await executeTool(exec.tool, exec.input || {})
          results.value[plan.id] = result
          plan.status = 'completed'
        } else {
          results.value[plan.id] = execResponse
          plan.status = 'completed'
        }
      } catch (error) {
        plan.status = 'failed'
        results.value[plan.id] = { error: error instanceof Error ? error.message : String(error) }
      }
    }

    // 3. 汇总结果
    const summaryPrompt = `根据以下执行结果，用自然语言总结回答用户：
    
    任务: ${task}
    执行结果: ${JSON.stringify(results.value)}
    
    请用中文回答：`

    const finalResult = await llm(summaryPrompt)

    return {
      result: finalResult,
      plan: plans.value,
      results: results.value
    }
  }

  return {
    plans,
    currentPlan,
    results,
    execute
  }
}

// ============================================
// 多模态支持
// ============================================

/**
 * 创建多模态消息
 */
export function createMultiModalMessage(
  role: 'user' | 'assistant',
  contents: MultiModalContent[]
): MultiModalMessage {
  return { role, content: contents }
}

/**
 * 从文件创建图像内容
 */
export function createImageContent(
  source: 'url' | 'base64',
  value: string,
  mimeType?: string
): MultiModalContent {
  return {
    type: 'image',
    ...(source === 'url' ? { url: value } : { base64: value }),
    mimeType: mimeType || (source === 'base64' ? 'image/png' : undefined)
  }
}

/**
 * 图像 URL 内容
 */
export function createImageUrlContent(
  url: string,
  detail?: 'low' | 'high' | 'auto'
): MultiModalContent {
  return {
    type: 'image_url',
    url,
    mimeType: detail
  }
}

/**
 * 音频内容
 */
export function createAudioContent(base64: string, mimeType = 'audio/m4a'): MultiModalContent {
  return {
    type: 'audio',
    base64,
    mimeType
  }
}

/**
 * 视频内容
 */
export function createVideoContent(base64: string, mimeType = 'video/mp4'): MultiModalContent {
  return {
    type: 'video',
    base64,
    mimeType
  }
}

// ============================================
// RAG 检索增强生成
// ============================================

/**
 * 创建 RAG 系统
 *
 * @example
 * ```ts
 * const rag = createRAGSystem({
 *   knowledgeBaseId: 'my-kb',
 *   topK: 5,
 *   similarityThreshold: 0.7
 * })
 *
 * const result = await rag.query('什么是 TypeScript？')
 * ```
 */
export function createRAGSystem(config: RAGConfig) {
  const {
    knowledgeBaseId,
    topK = 3,
    similarityThreshold = 0.5,
    includeSources = true,
    strategy = 'similarity'
  } = config

  // 模拟向量存储
  const vectorStore = new Map<string, DocumentChunk[]>()

  /**
   * 添加文档
   */
  const addDocuments = async (
    documents: Array<{ content: string; metadata?: Record<string, unknown> }>
  ) => {
    const chunks: DocumentChunk[] = documents.map((doc, i) => ({
      id: `chunk-${Date.now()}-${i}`,
      content: doc.content,
      metadata: doc.metadata || {},
      // 简化：实际应该调用 embedding API
      score: Math.random()
    }))

    if (knowledgeBaseId) {
      const existing = vectorStore.get(knowledgeBaseId) || []
      vectorStore.set(knowledgeBaseId, [...existing, ...chunks])
    }

    return chunks
  }

  /**
   * 检索相关文档
   */
  const retrieve = async (query: string, k: number = topK): Promise<DocumentChunk[]> => {
    if (!knowledgeBaseId) return []

    const chunks = vectorStore.get(knowledgeBaseId) || []

    // 简化：按 score 排序
    const sorted = [...chunks].sort((a, b) => (b.score || 0) - (a.score || 0)).slice(0, k)

    return sorted.filter((c) => (c.score || 0) >= similarityThreshold)
  }

  /**
   * 查询
   */
  const query = async (
    question: string,
    llm: (prompt: string) => Promise<string>
  ): Promise<RAGResult> => {
    // 1. 检索相关文档
    const relevantDocs = await retrieve(question)

    if (relevantDocs.length === 0) {
      return {
        answer: '抱歉，知识库中没有找到相关信息。',
        sources: [],
        contextUsed: ''
      }
    }

    // 2. 构建上下文
    const context = relevantDocs.map((doc, i) => `[文档 ${i + 1}]\n${doc.content}`).join('\n\n')

    // 3. 生成回答
    const prompt = `基于以下知识库内容，用中文回答用户的问题。如果知识库中的信息不能回答问题，请说明。

知识库内容:
${context}

用户问题: ${question}

请给出回答：`

    const answer = await llm(prompt)

    return {
      answer,
      sources: includeSources
        ? relevantDocs.map((doc) => ({
            content: doc.content.slice(0, 200) + '...',
            metadata: doc.metadata,
            score: doc.score || 0
          }))
        : [],
      contextUsed: context.slice(0, 500)
    }
  }

  /**
   * 清空知识库
   */
  const clear = () => {
    if (knowledgeBaseId) {
      vectorStore.delete(knowledgeBaseId)
    }
  }

  return {
    addDocuments,
    retrieve,
    query,
    clear,
    config: { topK, similarityThreshold, strategy }
  }
}

// ============================================
// 思维链 CoT
// ============================================

/**
 * 创建思维链推理器
 *
 * @example
 * ```ts
 * const cot = createChainOfThought({
 *   mode: 'chain',
 *   showConfidence: true
 * })
 *
 * const result = await cot.think('分析这个问题的解决步骤')
 * ```
 */
export function createChainOfThought(config: CoTConfig = { mode: 'standard' }) {
  const { mode = 'standard', maxDepth = 5, showConfidence = false } = config

  const reasoningSteps = ref<ReasoningStep[]>([])

  /**
   * 思考
   */
  const think = async (
    problem: string,
    llm: (prompt: string) => Promise<string>
  ): Promise<{ result: string; reasoning: ReasoningStep[] }> => {
    reasoningSteps.value = []

    const prompt =
      mode === 'standard'
        ? `逐步思考并给出答案：${problem}`
        : mode === 'chain'
          ? `按步骤分析：${problem}`
          : mode === 'tree'
            ? `用树状结构分析：${problem}`
            : `用表格形式分析：${problem}`

    const response = await llm(prompt)

    // 解析推理步骤
    const lines = response.split('\n').filter((l) => l.trim())
    reasoningSteps.value = lines.map((line, i) => ({
      id: `reason-${i}`,
      content: line.replace(/^\d+[.)：:、]\s*/, ''),
      type: i === lines.length - 1 ? 'conclusion' : 'analysis'
    }))

    return {
      result: response,
      reasoning: reasoningSteps.value
    }
  }

  /**
   * 添加推理步骤
   */
  const addStep = (step: Omit<ReasoningStep, 'id'>) => {
    reasoningSteps.value.push({
      ...step,
      id: `reason-${Date.now()}-${Math.random().toString(36).slice(2)}`
    })
  }

  /**
   * 清除推理
   */
  const clear = () => {
    reasoningSteps.value = []
  }

  return {
    think,
    addStep,
    clear,
    reasoningSteps,
    config: { mode, maxDepth, showConfidence }
  }
}

// ============================================
// 智能上下文压缩
// ============================================

/**
 * 创建上下文压缩器
 *
 * @example
 * ```ts
 * const compressor = createContextCompressor({
 *   strategy: 'summary',
 *   targetTokens: 2000
 * })
 *
 * const result = await compressor.compress(messages)
 * ```
 */
export function createContextCompressor(config: CompressionConfig) {
  const { strategy = 'summary', targetTokens = 2000, preserveKeyInfo = [] } = config

  // 估算 token (简化: 1 token ≈ 4 字符)
  const estimateTokens = (text: string): number => Math.ceil(text.length / 4)

  /**
   * 压缩
   */
  const compress = async (
    content: string | Array<{ role: string; content: string }>,
    llm?: (prompt: string) => Promise<string>
  ): Promise<CompressionResult> => {
    const isArray = Array.isArray(content)
    const text = isArray ? content.map((m) => `${m.role}: ${m.content}`).join('\n') : content

    const originalTokens = estimateTokens(text)

    if (originalTokens <= targetTokens) {
      return {
        compressedContent: text,
        originalTokens,
        compressedTokens: originalTokens,
        compressionRatio: 1,
        extractedKeyInfo: preserveKeyInfo
      }
    }

    let compressed: string

    switch (strategy) {
      case 'summary': {
        if (!llm) {
          // 简单截断
          const ratio = targetTokens / originalTokens
          compressed = text.slice(0, Math.floor(text.length * ratio))
        } else {
          // LLM 摘要
          const summaryPrompt = `将以下内容压缩到约 ${targetTokens} 字符，保留关键信息：
          
          ${text}`
          compressed = await llm(summaryPrompt)
        }
        break
      }

      case 'extract': {
        // 提取关键句子
        const sentences = text.split(/[。！？\n]/).filter((s) => s.trim())
        const keySentences = sentences.slice(
          0,
          Math.floor(sentences.length * (targetTokens / originalTokens))
        )
        compressed = keySentences.join('。') + '。'
        break
      }

      case 'prune': {
        // 修剪重复内容
        const lines = text.split('\n')
        const seen = new Set<string>()
        const pruned = lines.filter((line) => {
          const key = line.slice(0, 50)
          if (seen.has(key)) return false
          seen.add(key)
          return true
        })
        compressed = pruned.join('\n').slice(0, targetTokens * 4)
        break
      }

      default:
        compressed = text.slice(0, targetTokens * 4)
    }

    const compressedTokens = estimateTokens(compressed)

    return {
      compressedContent: compressed,
      originalTokens,
      compressedTokens,
      compressionRatio: compressedTokens / originalTokens,
      extractedKeyInfo: preserveKeyInfo
    }
  }

  return {
    compress,
    estimateTokens,
    config: { strategy, targetTokens, preserveKeyInfo }
  }
}

// ============================================
// 成本控制
// ============================================

/**
 * 创建成本追踪器
 *
 * @example
 * ```ts
 * const costTracker = createCostTracker({
 *   monthlyBudget: 100,
 *   warningThreshold: 0.8
 * })
 *
 * costTracker.track({ prompt: 1000, completion: 500 })
 * console.log(costTracker.getStatus())
 * ```
 */
export function createCostTracker(config: CostConfig = {}) {
  const { monthlyBudget = 100, maxTokensPerRequest = 100000, warningThreshold = 0.8 } = config

  // 使用普通对象代替 Vue reactive
  const dailyUsage: Record<string, { prompt: number; completion: number }> = {}
  const totalUsage: TokenUsage = { prompt: 0, completion: 0, total: 0 }

  // 价格配置 (每 1M tokens，美元)
  const PRICING: Record<string, { prompt: number; completion: number }> = {
    'gpt-4': { prompt: 30, completion: 60 },
    'gpt-4-turbo': { prompt: 10, completion: 30 },
    'gpt-3.5-turbo': { prompt: 0.5, completion: 1.5 },
    'claude-3-opus': { prompt: 15, completion: 75 },
    'claude-3-sonnet': { prompt: 3, completion: 15 },
    'gemini-pro': { prompt: 0.5, completion: 1.5 }
  }

  /**
   * 追踪使用
   */
  const track = (usage: TokenUsage, _model: string = 'gpt-4') => {
    const today = new Date().toISOString().split('T')[0]

    if (!dailyUsage[today]) {
      dailyUsage[today] = { prompt: 0, completion: 0 }
    }

    dailyUsage[today].prompt += usage.prompt
    dailyUsage[today].completion += usage.completion
    totalUsage.prompt += usage.prompt
    totalUsage.completion += usage.completion
    totalUsage.total += usage.prompt + usage.completion
  }

  /**
   * 计算成本
   */
  const calculateCost = (usage: TokenUsage, model: string): number => {
    const pricing = PRICING[model] || PRICING['gpt-4']
    return (
      (pricing.prompt * usage.prompt) / 1000000 + (pricing.completion * usage.completion) / 1000000
    )
  }

  /**
   * 获取状态
   */
  const getStatus = (): CostTracking => {
    const totalCost = calculateCost(totalUsage, 'gpt-4')
    const budgetRemaining = monthlyBudget - totalCost

    return {
      totalCost,
      dailyCost: Object.fromEntries(
        Object.entries(dailyUsage).map(([date, usage]) => [
          date,
          calculateCost({ prompt: usage.prompt, completion: usage.completion, total: 0 }, 'gpt-4')
        ])
      ),
      usage: { ...totalUsage },
      budget: { monthlyBudget, warningThreshold },
      remaining: budgetRemaining
    }
  }

  /**
   * 检查是否超过预算
   */
  const isOverBudget = (): boolean => {
    const status = getStatus()
    return status.remaining < 0
  }

  /**
   * 检查是否需要警告
   */
  const shouldWarn = (): boolean => {
    const status = getStatus()
    return status.totalCost >= monthlyBudget * warningThreshold
  }

  /**
   * 检查请求是否超出限制
   */
  const checkRequestLimit = (tokens: number): { allowed: boolean; reason?: string } => {
    if (tokens > maxTokensPerRequest) {
      return { allowed: false, reason: `请求 token 数 ${tokens} 超过限制 ${maxTokensPerRequest}` }
    }

    const status = getStatus()
    const estimatedCost = (tokens / 1000000) * 30 // 估算

    if (status.remaining - estimatedCost < 0) {
      return { allowed: false, reason: '预算不足' }
    }

    return { allowed: true }
  }

  /**
   * 重置
   */
  const reset = () => {
    Object.keys(dailyUsage).forEach((key) => delete dailyUsage[key])
    totalUsage.prompt = 0
    totalUsage.completion = 0
    totalUsage.total = 0
  }

  return {
    track,
    calculateCost,
    getStatus,
    isOverBudget,
    shouldWarn,
    checkRequestLimit,
    reset,
    pricing: PRICING,
    config: { monthlyBudget, maxTokensPerRequest, warningThreshold }
  }
}

// ============================================
// 可观测性
// ============================================

/**
 * 创建追踪器
 *
 * @example
 * ```ts
 * const tracer = createTracer()
 *
 * const span = tracer.startSpan('chat')
 * // ... do something
 * tracer.endSpan(span)
 *
 * const events = tracer.getEvents()
 * ```
 */
export function createTracer() {
  const spans = ref<TraceSpan[]>([])
  const events = ref<TraceEvent[]>([])
  const activeSpans = new Map<string, TraceSpan>()

  /**
   * 开始 span
   */
  const startSpan = (name: string, attributes: Record<string, unknown> = {}): string => {
    const id = `span-${Date.now()}-${Math.random().toString(36).slice(2)}`
    const span: TraceSpan = {
      id,
      name,
      startTime: new Date(),
      events: [],
      attributes,
      children: []
    }

    spans.value.push(span)
    activeSpans.set(id, span)

    addEvent({
      type: 'custom',
      data: { action: 'span_start', name }
    })

    return id
  }

  /**
   * 结束 span
   */
  const endSpan = (id: string, attributes: Record<string, unknown> = {}) => {
    const span = activeSpans.get(id)
    if (span) {
      span.endTime = new Date()
      span.attributes = { ...span.attributes, ...attributes }
      activeSpans.delete(id)

      addEvent({
        type: 'custom',
        data: {
          action: 'span_end',
          name: span.name,
          duration: span.endTime.getTime() - span.startTime.getTime()
        }
      })
    }
  }

  /**
   * 添加事件
   */
  const addEvent = (event: Omit<TraceEvent, 'id' | 'timestamp'>) => {
    events.value.push({
      ...event,
      id: `event-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      timestamp: new Date()
    })
  }

  /**
   * 记录请求
   */
  const recordRequest = (config: Record<string, unknown>, spanId?: string) => {
    const event: TraceEvent = {
      id: `req-${Date.now()}`,
      type: 'request',
      timestamp: new Date(),
      data: config,
      parentId: spanId
    }
    events.value.push(event)
  }

  /**
   * 记录响应
   */
  const recordResponse = (response: unknown, duration?: number, spanId?: string) => {
    const event: TraceEvent = {
      id: `res-${Date.now()}`,
      type: 'response',
      timestamp: new Date(),
      data: { response, duration },
      parentId: spanId
    }
    events.value.push(event)
  }

  /**
   * 记录错误
   */
  const recordError = (error: Error, context?: Record<string, unknown>, spanId?: string) => {
    const event: TraceEvent = {
      id: `err-${Date.now()}`,
      type: 'error',
      timestamp: new Date(),
      data: { message: error.message, stack: error.stack, ...context },
      parentId: spanId
    }
    events.value.push(event)
  }

  /**
   * 获取所有事件
   */
  const getEvents = () => events.value

  /**
   * 获取所有 span
   */
  const getSpans = () => spans.value

  /**
   * 清空
   */
  const clear = () => {
    spans.value = []
    events.value = []
    activeSpans.clear()
  }

  /**
   * 导出为 JSON
   */
  const exportJSON = () => JSON.stringify({ spans: spans.value, events: events.value }, null, 2)

  return {
    startSpan,
    endSpan,
    addEvent,
    recordRequest,
    recordResponse,
    recordError,
    getEvents,
    getSpans,
    clear,
    exportJSON
  }
}

// ============================================
// AI 安全护栏
// ============================================

/**
 * 创建安全过滤器
 *
 * @example
 * ```ts
 * const safety = createSafetyFilter({
 *   rules: [
 *     { id: '1', name: '敏感词', type: 'content_filter', pattern: '暴力|赌博', action: 'block' }
 *   ]
 * })
 *
 * const result = await safety.check('这是一条正常消息')
 * ```
 */
export function createSafetyFilter(config: { rules: SafetyRule[] }) {
  const { rules = [] } = config

  /**
   * 检查内容
   */
  const check = async (content: string): Promise<SafetyResult> => {
    const violations: SafetyResult['violations'] = []

    for (const rule of rules) {
      let passed = true
      let replacedContent = content

      // 模式匹配
      if (rule.pattern) {
        const regex =
          typeof rule.pattern === 'string' ? new RegExp(rule.pattern, 'gi') : rule.pattern
        passed = !regex.test(content)
        replacedContent = content.replace(regex, '***')
      }

      // 自定义检查
      if (rule.customCheck && passed) {
        passed = !(await rule.customCheck(content))
      }

      if (!passed) {
        violations.push({
          rule,
          content,
          action:
            rule.action === 'replace' && replacedContent !== content
              ? 'replaced'
              : rule.action === 'block'
                ? 'blocked'
                : 'warned',
          replacedContent: rule.action === 'replace' ? replacedContent : undefined
        })

        if (rule.action === 'block') {
          break
        }
      }
    }

    return {
      passed: violations.length === 0 || violations.every((v) => v.action !== 'blocked'),
      violations
    }
  }

  /**
   * 添加规则
   */
  const addRule = (rule: SafetyRule) => {
    rules.push(rule)
  }

  /**
   * 移除规则
   */
  const removeRule = (ruleId: string) => {
    const index = rules.findIndex((r) => r.id === ruleId)
    if (index > -1) {
      rules.splice(index, 1)
    }
  }

  /**
   * 创建预设规则
   */
  const createPresetRules = (type: 'strict' | 'moderate' | 'lenient') => {
    const presets: Record<string, SafetyRule[]> = {
      strict: [
        {
          id: 's1',
          name: '政治敏感',
          type: 'content_filter',
          pattern: '政治|领导人',
          action: 'block'
        },
        {
          id: 's2',
          name: '暴力内容',
          type: 'content_filter',
          pattern: '暴力|血腥',
          action: 'block'
        },
        {
          id: 's3',
          name: '恶意软件',
          type: 'content_filter',
          pattern: '病毒|木马',
          action: 'block'
        }
      ],
      moderate: [
        {
          id: 'm1',
          name: '政治敏感',
          type: 'content_filter',
          pattern: '政治|领导人',
          action: 'warn'
        },
        { id: 'm2', name: '暴力内容', type: 'content_filter', pattern: '暴力|血腥', action: 'warn' }
      ],
      lenient: [
        {
          id: 'l1',
          name: '恶意内容',
          type: 'content_filter',
          pattern: '病毒|木马',
          action: 'block'
        }
      ]
    }

    rules.push(...presets[type])
  }

  return {
    check,
    addRule,
    removeRule,
    createPresetRules,
    rules
  }
}

// ============================================
// 结构化输出
// ============================================

/**
 * 从 Zod schema 创建结构化输出
 */
export function fromZodSchema<_T>(schema: unknown) {
  // 简化版：实际应该解析 Zod schema
  return {
    type: 'object',
    schema,
    toJSONSchema: () => schema
  }
}

/**
 * 创建 JSON Schema 定义
 */
export function createJSONSchema(definition: SchemaDefinition): SchemaDefinition {
  return definition
}

/**
 * 常用 Schema 构建器
 */
export const schema = {
  string: (description?: string): SchemaProperty => ({
    type: 'string',
    description
  }),

  number: (description?: string): SchemaProperty => ({
    type: 'number',
    description
  }),

  boolean: (description?: string): SchemaProperty => ({
    type: 'boolean',
    description
  }),

  enum: <T extends string>(values: T[], description?: string): SchemaProperty => ({
    type: 'string',
    enum: values,
    description
  }),

  array: (items: SchemaProperty): SchemaProperty => ({
    type: 'array',
    items
  }),

  object: (
    properties: Record<string, SchemaProperty>,
    required: string[] = []
  ): SchemaDefinition => ({
    type: 'object',
    properties,
    required
  })
}

/**
 * 解析结构化输出
 */
export function parseStructuredOutput<T>(output: string, _schema: SchemaDefinition): T | null {
  try {
    // 尝试提取 JSON
    const jsonMatch = output.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]) as T
    }
  } catch {
    return null
  }
  return null
}
