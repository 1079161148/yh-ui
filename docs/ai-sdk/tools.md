# 工具函数调用

## 概述

工具函数（Tools）允许模型在生成回复时调用外部函数，实现检索、计算、调用 API 等能力。

## createYHFunctionTool - 创建工具

定义可供模型调用的工具函数。

```typescript
import { generateText, createYHFunctionTool } from '@yh-ui/ai-sdk'
import { createOpenAI } from '@ai-sdk/openai'

// 定义天气查询工具
const weatherTool = createYHFunctionTool({
  name: 'get_weather',
  description: '获取指定城市的天气信息',
  parameters: {
    type: 'object',
    properties: {
      city: { type: 'string', description: '城市名称，如北京、上海' },
      unit: {
        type: 'string',
        enum: ['celsius', 'fahrenheit'],
        description: '温度单位，默认 celsius'
      }
    },
    required: ['city']
  },
  execute: async ({ city, unit = 'celsius' }) => {
    // 实际调用天气 API
    const response = await fetch(`https://api.weather.com?city=${city}`)
    const data = await response.json()

    return {
      city,
      weather: data.weather,
      temperature: unit === 'celsius' ? data.temp_c : data.temp_f,
      unit
    }
  }
})
```

## 在 generateText 中使用

```typescript
const openai = createOpenAI()

const result = await generateText({
  model: openai('gpt-4'),
  prompt: '北京今天的天气怎么样？',
  tools: [weatherTool],
  maxToolCalls: 3 // 最多调用 3 次工具
})

// 访问工具调用结果
console.log(result.toolCalls) // 模型触发的工具调用列表
console.log(result.toolResults) // 工具执行结果
```

## 在 streamText 中使用

```typescript
const result = streamText({
  model: openai('gpt-4'),
  prompt: '上海天气如何？',
  tools: [weatherTool]
})

for await (const chunk of result.textStream) {
  process.stdout.write(chunk)
}

// 工具调用在流结束后可通过 result 获取
const finalResult = await result
console.log(finalResult.toolResults)
```

## 处理工具调用结果

模型返回的工具调用结果通常是 JSON 对象：

```typescript
// toolCalls 结构
;[
  {
    id: 'call_abc123',
    name: 'get_weather',
    args: { city: '北京', unit: 'celsius' }
  }
][
  // toolResults 结构
  {
    toolCallId: 'call_abc123',
    toolName: 'get_weather',
    result: { city: '北京', weather: '晴', temperature: 25, unit: 'celsius' }
  }
]
```

## 连续工具调用

模型可以连续调用多个工具：

```typescript
const searchTool = createYHFunctionTool({
  name: 'search',
  description: '搜索信息',
  parameters: {
    type: 'object',
    properties: {
      query: { type: 'string' }
    },
    required: ['query']
  },
  execute: async ({ query }) => {
    // 搜索逻辑
    return `关于 ${query} 的搜索结果...`
  }
})

const result = await generateText({
  model: openai('gpt-4'),
  prompt: '搜索 Vue 3 的最新特性，然后总结',
  tools: [searchTool],
  maxToolCalls: 5
})
```

::: warning 注意事项

1. 工具的 `description` 很重要，模型会依据它决定是否调用
2. `parameters` 应遵循 JSON Schema 格式
3. `execute` 是异步函数，可在其中调用任何外部 API
4. 妥善处理异常，避免工具执行失败导致整个请求失败
   :::
