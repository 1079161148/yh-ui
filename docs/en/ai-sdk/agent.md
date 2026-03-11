# Agent Orchestration

YH-UI provides multiple agent orchestration patterns to meet AI application needs of different complexity levels.

## createEnhancedAgent - Enhanced Agent Factory

Create enhanced agents supporting multiple reasoning modes.

```typescript
import { createEnhancedAgent } from '@yh-ui/ai-sdk'
```

### Reflexion Agent - Self-Reflection Mode

Suitable for complex tasks that need to learn from errors. Self-reflect after each execution and gradually improve.

```typescript
const reflexionAgent = createEnhancedAgent({
  mode: 'reflexion',
  maxIterations: 5, // Maximum iterations
  maxReflections: 3, // Maximum reflections
  memoryWindow: 3, // Memory context window
  returnReasoning: true, // Return reasoning process
  tools: [
    /* tool list */
  ]
})

const result = await reflexionAgent.run(
  'Task description',
  executeFn, // LLM execution function
  toolFn // Tool call function (optional)
)
```

### ReWOO Agent - Plan and Execute Separation

Suitable for multi-step tasks that need planning first. Create a complete plan first, then execute tools in batch, and finally generate the answer.

```typescript
const rewooAgent = createEnhancedAgent({
  mode: 'rewoo',
  maxIterations: 10,
  maxToolCalls: 15,
  returnReasoning: true,
  tools: [
    /* tool list */
  ]
})

const result = await rewooAgent.run('Task description', executeFn, toolFn)
```

## createChain - LCEL-Style Chaining

Similar to LangChain LCEL chaining pattern.

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

### createParallelChain - Parallel Chain

Execute multiple steps in parallel and collect results.

```typescript
import { createParallelChain } from '@yh-ui/ai-sdk'

const parallelChain = createParallelChain({
  fetchWeather: async (city) => {
    /* Get weather */
  },
  fetchNews: async (city) => {
    /* Get news */
  }
})

const results = await parallelChain.invoke('Beijing')
// { fetchWeather: {...}, fetchNews: {...} }
```

## useReActAgent - ReAct Reasoning Mode

Standard ReAct (Reasoning + Acting) pattern.

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
      description: 'Search for information',
      parameters: {
        type: 'object',
        properties: {
          query: { type: 'string' }
        }
      },
      execute: async ({ query }) => `Search results: ${query}`
    }
  ],
  stopConditions: [{ type: 'contains', value: 'Final Answer' }]
})

const result = await run('What is the population of Beijing?')
console.log(result.output)
console.log(result.reasoning) // Reasoning steps
```

## Agent Pattern Selection Guide

| Pattern       | Use Cases                    | Characteristics                      |
| ------------- | ---------------------------- | ------------------------------------ |
| **ReAct**     | Simple reasoning + action    | Think while doing, flexible          |
| **Reflexion** | Learning from errors         | Self-reflection, gradual improvement |
| **ReWOO**     | Multi-step complex tasks     | Plan first then execute, efficient   |
| **Chain**     | Data transformation pipeline | Pipeline processing                  |

::: tip
All agents support:

- `tools`: Tool list
- `returnReasoning`: Whether to return reasoning process
- `onError`: Error handling callback
- `stopConditions`: Stop conditions
  :::
