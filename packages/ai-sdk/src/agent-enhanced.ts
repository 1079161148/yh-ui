/**
 * YH-UI AI SDK - 增强版 Agent
 *
 * 支持多种推理模式：
 * - Reflexion: 自我反思，从错误中学习
 * - ReWOO: 分离推理与工具调用
 * - LCEL 风格链式编排
 */

import { ref, type Ref } from 'vue'
import type { AgentStep, AgentTool, AgentResult, StopCondition } from './future'

// ============================================
// 类型定义
// ============================================

/** Agent 推理模式 */
export type ReasoningMode = 'react' | 'reflexion' | 'rewoo' | 'plan-execute'

/** 增强版 Agent 配置 */
export interface EnhancedAgentConfig {
  /** 推理模式 */
  mode: ReasoningMode
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
  /** 反思次数（Reflexion 专用） */
  maxReflections?: number
  /** 错误处理 */
  onError?: (error: Error, step: AgentStep) => void | Promise<void>
}

/** LCEL 链步骤 */
export interface ChainStep {
  name: string
  handler: (input: unknown) => unknown | Promise<unknown>
  onError?: (error: Error) => void
}

/** LCEL 链 */
export interface Chain {
  pipe(step: ChainStep): Chain
  invoke(input: unknown): Promise<unknown>
}

// ============================================
// LCEL 风格链式编排
// ============================================

/**
 * 创建 LCEL 风格链
 *
 * @example
 * ```ts
 * const chain = createChain()
 *   .pipe({ name: 'parse', handler: async (input) => JSON.parse(input as string) })
 *   .pipe({ name: 'validate', handler: async (input) => { if (!input) throw new Error('Empty'); return input } })
 *   .pipe({ name: 'transform', handler: async (input) => ({ data: input }) })
 *
 * const result = await chain.invoke('{"a":1}')
 * ```
 */
export function createChain(
  initialHandler?: (input: unknown) => unknown | Promise<unknown>
): Chain {
  const steps: ChainStep[] = []

  if (initialHandler) {
    steps.push({ name: 'initial', handler: initialHandler })
  }

  return {
    pipe(step: ChainStep) {
      steps.push(step)
      return this
    },

    async invoke(input: unknown): Promise<unknown> {
      let current: unknown = input
      for (const step of steps) {
        try {
          current = await step.handler(current)
        } catch (err) {
          if (step.onError) {
            step.onError(err as Error)
          } else {
            throw err
          }
        }
      }
      return current
    }
  }
}

/**
 * 创建并行链（类似 LangChain RunnableParallel）
 */
export function createParallelChain(
  steps: Record<string, (input: unknown) => unknown | Promise<unknown>>
): Chain {
  return {
    pipe(step: ChainStep) {
      steps[step.name] = step.handler
      return this
    },

    async invoke(input: unknown): Promise<unknown> {
      const results: Record<string, unknown> = {}
      const promises = Object.entries(steps).map(async ([key, handler]) => {
        results[key] = await handler(input)
      })
      await Promise.all(promises)
      return results
    }
  }
}

// ============================================
// Reflexion Agent
// ============================================

/**
 * Reflexion Agent 配置
 */
export interface ReflexionConfig extends Omit<EnhancedAgentConfig, 'mode'> {
  mode: 'reflexion'
  /** 记忆上下文窗口大小 */
  memoryWindow?: number
}

/**
 * 创建 Reflexion Agent
 * 特点：执行后进行自我反思，从错误中学习并改进下一步
 */
export function createReflexionAgent(config: ReflexionConfig) {
  const {
    maxIterations = 5,
    returnReasoning = true,
    stopConditions = [],
    memoryWindow = 3,
    onError
  } = config

  const steps = ref<AgentStep[]>([])
  const reflections = ref<string[]>([])
  const isRunning = ref(false)

  async function run(
    input: string,
    executeFn: (prompt: string) => Promise<string>,
    toolFn?: (toolName: string, args: Record<string, unknown>) => Promise<string>
  ): Promise<AgentResult> {
    isRunning.value = true
    steps.value = []
    reflections.value = []

    let iteration = 0
    let currentInput = input
    let bestOutput = ''
    let bestScore = -Infinity

    try {
      while (iteration < maxIterations) {
        iteration++

        // 执行一步
        const prompt = buildPrompt(currentInput, reflections.value)
        const response = await executeFn(prompt)

        // 尝试提取工具调用
        let toolResult = ''
        const actionMatch = response.match(/Action:\s*(\w+)\s*[\n\r]Action Input:\s*(.+)/)
        if (actionMatch && toolFn) {
          const [, toolName, toolInputStr] = actionMatch
          try {
            const toolInput = JSON.parse(toolInputStr)
            toolResult = await toolFn(toolName, toolInput)
          } catch {
            toolResult = `Failed to parse: ${toolInputStr}`
          }
        }

        // 记录步骤
        steps.value.push({
          id: `step-${iteration}`,
          type: 'thought',
          content: response,
          timestamp: new Date()
        })

        if (toolResult) {
          steps.value.push({
            id: `step-${iteration}-obs`,
            type: 'observation',
            content: toolResult,
            timestamp: new Date()
          })
        }

        // 评估输出质量
        const score = await evaluateOutput(response + toolResult)

        if (score > bestScore) {
          bestScore = score
          bestOutput = response + (toolResult ? `\n\nObservation: ${toolResult}` : '')
        }

        // 自我反思
        if (iteration < maxIterations) {
          const reflection = await reflect(currentInput, response, toolResult, score)
          reflections.value.push(reflection)

          if (reflections.value.length > memoryWindow) {
            reflections.value.shift()
          }

          // 根据反思调整输入
          currentInput = `${input}\n\nPrevious attempts:\n${reflections.value.join('\n---\n')}`
        }

        // 检查停止条件
        if (checkStop('', bestOutput)) break
      }

      return {
        output: bestOutput,
        reasoning: returnReasoning ? steps.value : undefined,
        toolCalls: iteration,
        finished: iteration >= maxIterations
      }
    } catch (err) {
      if (onError) await onError(err as Error, steps.value[steps.value.length - 1])
      return {
        output: bestOutput,
        reasoning: returnReasoning ? steps.value : undefined,
        toolCalls: iteration,
        finished: false,
        error: err as Error
      }
    } finally {
      isRunning.value = false
    }
  }

  function buildPrompt(input: string, reflections: string[]): string {
    let prompt = `Task: ${input}\n`
    if (reflections.length > 0) {
      prompt += `\nPrevious reflections:\n${reflections.join('\n')}\n`
    }
    prompt +=
      '\nProvide your reasoning and any tool actions (Action: toolName\nAction Input: {...}).'
    return prompt
  }

  async function reflect(
    task: string,
    response: string,
    toolResult: string,
    score: number
  ): Promise<string> {
    // 简化：实际应调用 LLM
    return `Attempt ${steps.value.length}: ${score < 5 ? 'Need to try different approach' : 'Making progress'}`
  }

  async function evaluateOutput(output: string): Promise<number> {
    // 简化：实际应调用 LLM 或规则评估
    return output.length > 10 ? 5 + Math.random() * 5 : Math.random() * 5
  }

  function checkStop(iterationOutput: string, bestOutput: string): boolean {
    for (const cond of stopConditions) {
      if (cond.type === 'contains' && cond.value) {
        if (bestOutput.includes(cond.value as string)) return true
      }
      if (cond.type === 'custom' && cond.value) {
        if ((cond.value as (output: string) => boolean)(bestOutput)) return true
      }
    }
    return false
  }

  return {
    run,
    steps: steps as Ref<AgentStep[]>,
    reflections: reflections as Ref<string[]>,
    isRunning
  }
}

// ============================================
// ReWOO Agent (Reasoning Without Observation)
// ============================================

/**
 * ReWOO Agent 配置
 */
export interface ReWOOConfig extends Omit<EnhancedAgentConfig, 'mode'> {
  mode: 'rewoo'
  /** 计划生成器 */
  planner?: (
    task: string
  ) => Promise<{ steps: Array<{ id: string; description: string; dependentIds: string[] }> }>
}

/**
 * 创建 ReWOO Agent
 * 特点：先制定完整计划，再批量执行工具，最后基于所有结果生成答案
 */
export function createReWOOAgent(config: ReWOOConfig) {
  const { returnReasoning = true, onError } = config

  const steps = ref<AgentStep[]>([])
  const plan = ref<
    Array<{ id: string; description: string; result?: string; dependentIds: string[] }>
  >([])
  const isRunning = ref(false)

  const defaultPlanner = async (task: string) => {
    // 简化版计划生成：实际应调用 LLM
    return {
      steps: [
        { id: '1', description: `Analyze: ${task.slice(0, 50)}`, dependentIds: [] },
        { id: '2', description: `Gather info for: ${task.slice(0, 50)}`, dependentIds: ['1'] },
        { id: '3', description: `Answer: ${task.slice(0, 50)}`, dependentIds: ['1', '2'] }
      ]
    }
  }

  async function run(
    input: string,
    executeFn: (prompt: string) => Promise<string>
  ): Promise<AgentResult> {
    isRunning.value = true
    steps.value = []
    plan.value = []

    try {
      // 阶段 1: 生成计划
      const planner = config.planner || defaultPlanner
      const planResult = await planner(input)
      plan.value = planResult.steps

      steps.value.push({
        id: 'plan-thought',
        type: 'thought',
        content: `Generated plan with ${planResult.steps.length} steps`,
        timestamp: new Date()
      })

      // 阶段 2: 按依赖顺序执行
      const results: Record<string, string> = {}
      const executed = new Set<string>()

      while (executed.size < plan.value.length) {
        const readyStep = plan.value.find(
          (s) => !executed.has(s.id) && s.dependentIds.every((depId) => executed.has(depId))
        )

        if (!readyStep) break

        // 构建上下文
        const context = Object.entries(results)
          .filter(([id]) => readyStep.dependentIds.includes(id))
          .map(([, res]) => res)
          .join('\n\n')

        const stepPrompt = `Step: ${readyStep.description}
Context: ${context || 'No prior context'}
Execute this step and provide the result.`

        const stepResult = await executeFn(stepPrompt)
        results[readyStep.id] = stepResult
        executed.add(readyStep.id)

        steps.value.push({
          id: `step-${readyStep.id}`,
          type: 'action',
          content: readyStep.description,
          toolOutput: stepResult,
          timestamp: new Date()
        })
      }

      // 阶段 3: 生成最终答案
      const finalPrompt = `Original Task: ${input}

Execution Results:
${Object.entries(results)
  .map(([id, res]) => `Step ${id}: ${res}`)
  .join('\n\n')}

Based on the above results, provide the final answer to the original task.`

      const finalAnswer = await executeFn(finalPrompt)

      return {
        output: finalAnswer,
        reasoning: returnReasoning ? steps.value : undefined,
        toolCalls: executed.size,
        finished: true
      }
    } catch (err) {
      if (onError) {
        const lastStep = steps.value[steps.value.length - 1]
        if (lastStep) await onError(err as Error, lastStep)
      }
      return {
        output: '',
        reasoning: returnReasoning ? steps.value : undefined,
        toolCalls: 0,
        finished: false,
        error: err as Error
      }
    } finally {
      isRunning.value = false
    }
  }

  return {
    run,
    steps: steps as Ref<AgentStep[]>,
    plan: plan as Ref<Array<{ id: string; description: string; result?: string }>>,
    isRunning
  }
}

// ============================================
// 统一工厂函数
// ============================================

/**
 * 创建增强版 Agent（工厂函数）
 *
 * @example
 * ```ts
 * // Reflexion
 * const agent = createEnhancedAgent({
 *   mode: 'reflexion',
 *   maxIterations: 5,
 *   tools: [...]
 * })
 *
 * // ReWOO
 * const agent = createEnhancedAgent({
 *   mode: 'rewoo',
 *   maxIterations: 10,
 *   tools: [...]
 * })
 *
 * const result = await agent.run('任务描述', llmCall, toolCall)
 * ```
 */
export function createEnhancedAgent(config: EnhancedAgentConfig) {
  switch (config.mode) {
    case 'reflexion':
      return createReflexionAgent(config as ReflexionConfig)
    case 'rewoo':
      return createReWOOAgent(config as ReWOOConfig)
    case 'react':
    case 'plan-execute':
      // 复用 existing implementation via future.ts
      return createReWOOAgent({ ...config, mode: 'rewoo' })
    default:
      throw new Error(`Unsupported mode: ${config.mode}`)
  }
}
