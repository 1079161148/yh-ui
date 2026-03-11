# Agent 编排

YH-UI 提供多种 Agent 编排模式，满足不同复杂度的 AI 应用需求。

## createEnhancedAgent - 增强版 Agent 工厂

创建支持多种推理模式的增强版 Agent。

```typescript
import { createEnhancedAgent } from '@yh-ui/ai-sdk'
```

### Reflexion Agent - 自我反思模式

适合需要从错误中学习的复杂任务。每次执行后进行自我反思，逐步改进。

```typescript
const reflexionAgent = createEnhancedAgent({
  mode: 'reflexion',
  maxIterations: 5, // 最大迭代次数
  maxReflections: 3, // 最大反思次数
  memoryWindow: 3, // 记忆上下文窗口
  returnReasoning: true, // 返回推理过程
  tools: [
    /* 工具列表 */
  ]
})

const result = await reflexionAgent.run(
  '任务描述',
  executeFn, // LLM 执行函数
  toolFn // 工具调用函数（可选）
)
```

### ReWOO Agent - 计划与执行分离

适合需要先规划再执行的多步骤任务。先制定完整计划，再批量执行工具，最后生成答案。

```typescript
const rewooAgent = createEnhancedAgent({
  mode: 'rewoo',
  maxIterations: 10,
  maxToolCalls: 15,
  returnReasoning: true,
  tools: [
    /* 工具列表 */
  ]
})

const result = await rewooAgent.run('任务描述', executeFn, toolFn)
```

## createChain - LCEL 风格链式编排

类似 LangChain LCEL 的链式调用模式。

```typescript
import { createChain } from '@yh-ui/ai-sdk'

const chain = createChain()
  .pipe({
    name: 'parse',
    handler: async (input) => JSON.parse(input as string)
  })
  .pipe({
    name: 'validate',
    handler: async (input) => {
      if (!input) throw new Error('Empty input')
      return input
    }
  })
  .pipe({
    name: 'transform',
    handler: async (input) => ({ data: input })
  })
  .pipe({
    name: 'format',
    handler: async (input) => JSON.stringify(input, null, 2)
  })

const result = await chain.invoke('{"a":1}')
```

### createParallelChain - 并行链

并行执行多个步骤，收集结果。

```typescript
import { createParallelChain } from '@yh-ui/ai-sdk'

const parallelChain = createParallelChain({
  fetchWeather: async (city) => {
    /* 获取天气 */
  },
  fetchNews: async (city) => {
    /* 获取新闻 */
  }
})

const results = await parallelChain.invoke('北京')
// { fetchWeather: {...}, fetchNews: {...} }
```

## useReActAgent - ReAct 推理模式

标准的 ReAct（Reasoning + Acting）模式。

```typescript
import { useReActAgent } from '@yh-ui/ai-sdk'

const { run, steps, isRunning, currentOutput, toolCallCount } = useReActAgent({
  type: 'react',
  maxIterations: 10,
  maxToolCalls: 20,
  returnReasoning: true,
  tools: [
    {
      name: 'search',
      description: '搜索信息',
      parameters: {
        type: 'object',
        properties: {
          query: { type: 'string' }
        }
      },
      execute: async ({ query }) => `搜索结果: ${query}`
    }
  ],
  stopConditions: [{ type: 'contains', value: '最终答案' }]
})

const result = await run('北京的人口是多少？')
console.log(result.output)
console.log(result.reasoning) // 推理步骤
```

## Agent 模式选择指南

| 模式          | 适用场景         | 特点                 |
| ------------- | ---------------- | -------------------- |
| **ReAct**     | 简单的推理+行动  | 边想边做，灵活       |
| **Reflexion** | 需要从错误中学习 | 自我反思，逐步改进   |
| **ReWOO**     | 多步骤复杂任务   | 先规划再执行，效率高 |
| **Chain**     | 数据转换流水线   | 管道式处理           |

::: tip
所有 Agent 都支持：

- `tools`: 工具列表
- `returnReasoning`: 是否返回推理过程
- `onError`: 错误处理回调
- `stopConditions`: 停止条件
  :::
