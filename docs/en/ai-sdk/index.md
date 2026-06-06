# AI SDK

`@yh-ui/ai-sdk` is the official AI capability integration package from YH-UI, seamlessly integrating **Vercel AI SDK** and **LangChain** for out-of-the-box usage.

## Features

- 🌐 **Multi-Provider Support** - OpenAI / Anthropic / Google / DeepSeek / Tongyi / Wenxin Yiyan, etc.
- 🔄 **Streaming Output** - Complete streaming text/object generation support
- 🛠️ **Function Calling** - Easily define and execute tool functions
- 🔗 **LangChain Integration** - Deep integration with LangChain.js ecosystem
- 🖥️ **Native Vue 3** - Full Composition API support
- 💾 **Conversation Management** - Built-in history persistence
- 🤖 **Agent Orchestration** - ReAct / ReWOO / Reflexion modes
- 📦 **Vector Storage** - In-memory + Pinecone/Weaviate/Qdrant interfaces
- 💨 **Caching System** - Memory / localStorage / sessionStorage / Redis
- 🚀 **Rate Limiting** - Token bucket / sliding window rate limiter
- 📊 **Observability** - OTel / LangSmith export
- 🔌 **MCP Protocol** - Complete Client + Server support
- 🎯 **SSR Support** - Server-side rendering compatible

## Comparison with Mainstream SDKs

| Feature             | Vercel AI SDK | LangChain | **YH AI-SDK**            |
| ------------------- | ------------- | --------- | ------------------------ |
| **Streaming**       | ✅            | ✅        | ✅                       |
| **Multi-Provider**  | 40+           | 100+      | 10+ (presets) + custom   |
| **Agent Framework** | ToolLoopAgent | LangGraph | ✅ ReAct/ReWOO/Reflexion |
| **MCP Support**     | ✅            | ✅        | ✅ Complete              |
| **RAG**             | Basic         | Complete  | ✅ Production-ready      |
| **Vector Storage**  | ❌            | ✅        | ✅ Abstraction + memory  |
| **Caching**         | ❌            | ✅        | ✅ Multi-level           |
| **Rate Limiting**   | ❌            | ❌        | ✅ Complete              |
| **Observability**   | Basic         | ✅        | ✅ OTel + LangSmith      |
| **Vue/SSR**         | ❌            | ❌        | ✅ Deep support          |

### YH AI-SDK Differentiated Advantages

- 🔥 **Deep Vue Integration** - Unique Vue Composable + SSR support
- 🔥 **Multi-level Caching** - Memory + localStorage + sessionStorage + Redis interface
- 🔥 **Rate Limiting Middleware** - Seamless integration with XRequest
- 🔥 **Cost Tracking** - Budget control + usage statistics
- 🔥 **Safety Guardrails** - Content filtering + input validation + output filtering

## Documentation

| Chapter                              | Description                                    |
| ------------------------------------ | ---------------------------------------------- |
| [Installation](./install)            | Requirements, installation, quick setup        |
| [Quick Start](./quickstart)          | Minimal examples and complete demos            |
| [Vercel AI SDK](./vercel)            | generateText, streamText, useChat              |
| [LangChain Integration](./langchain) | useLangChainChat, useLangChainStream           |
| [Tools](./tools)                     | createYHFunctionTool                           |
| [Vue Composables](./vue-composables) | useConversation, createStreamableValue         |
| [MCP Protocol](./mcp)                | MCP Client & Server                            |
| [Agent Orchestration](./agent)       | ReAct, Reflexion, ReWOO, createChain           |
| [Vector Storage & RAG](./vector-rag) | createInMemoryVectorStore, createProductionRAG |
| [Caching](./cache)                   | Multi-level cache adapters                     |
| [Rate Limiting](./rate-limit)        | createRateLimiter                              |
| [Observability](./observability)     | OTel, LangSmith                                |
| [Future Features](./future)          | Multimodal, CoT, cost control, safety          |
| [API Reference](./api)               | Types and interfaces                           |
| [Notes & FAQ](./caution)             | Common issues and considerations               |
