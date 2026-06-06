# Tool Function Calling

## Overview

Tools allow models to call external functions during response generation, enabling capabilities like retrieval, computation, and API calls.

## createYHFunctionTool - Create Tools

Define tool functions that can be invoked by the model.

```typescript
import { generateText, createYHFunctionTool } from '@yh-ui/ai-sdk'
import { createOpenAI } from '@ai-sdk/openai'

// Define weather query tool
const weatherTool = createYHFunctionTool({
  name: 'get_weather',
  description: 'Get weather information for a specified city',
  parameters: {
    type: 'object',
    properties: {
      city: { type: 'string', description: 'City name, e.g., Beijing, Shanghai' },
      unit: {
        type: 'string',
        enum: ['celsius', 'fahrenheit'],
        description: 'Temperature unit, default celsius'
      }
    },
    required: ['city']
  },
  execute: async ({ city, unit = 'celsius' }) => {
    // Actually call weather API
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

## Using in generateText

```typescript
const openai = createOpenAI()

const result = await generateText({
  model: openai('gpt-4'),
  prompt: 'How is the weather in Beijing today?',
  tools: [weatherTool],
  maxToolCalls: 3 // Maximum 3 tool calls
})

// Access tool call results
console.log(result.toolCalls) // List of tool calls triggered by model
console.log(result.toolResults) // Tool execution results
```

## Using in streamText

```typescript
const result = streamText({
  model: openai('gpt-4'),
  prompt: 'How is the weather in Shanghai?',
  tools: [weatherTool]
})

for await (const chunk of result.textStream) {
  process.stdout.write(chunk)
}

// Tool calls can be accessed after stream ends via result
const finalResult = await result
console.log(finalResult.toolResults)
```

## Handling Tool Call Results

Tool call results returned by the model are typically JSON objects:

```typescript
// toolCalls structure
;[
  {
    id: 'call_abc123',
    name: 'get_weather',
    args: { city: 'Beijing', unit: 'celsius' }
  }
][
  // toolResults structure
  {
    toolCallId: 'call_abc123',
    toolName: 'get_weather',
    result: { city: 'Beijing', weather: 'Sunny', temperature: 25, unit: 'celsius' }
  }
]
```

## Sequential Tool Calls

Models can call multiple tools sequentially:

```typescript
const searchTool = createYHFunctionTool({
  name: 'search',
  description: 'Search for information',
  parameters: {
    type: 'object',
    properties: {
      query: { type: 'string' }
    },
    required: ['query']
  },
  execute: async ({ query }) => {
    // Search logic
    return `Search results for ${query}...`
  }
})

const result = await generateText({
  model: openai('gpt-4'),
  prompt: 'Search for the latest features of Vue 3 and then summarize',
  tools: [searchTool],
  maxToolCalls: 5
})
```

::: warning Important Notes

1. The tool's `description` is important; the model uses it to decide whether to call the tool
2. `parameters` should follow JSON Schema format
3. `execute` is an async function where you can call any external API
4. Handle exceptions properly to avoid the entire request failing due to tool execution failures
   :::
