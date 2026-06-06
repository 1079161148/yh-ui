# AI SDK

`@yh-ui/ai-sdk` 是 YH-UI 官方提供的 AI 能力集成包，无缝对接 **Vercel AI SDK** 和 **LangChain**，开箱即用。

## 特性

- 🌐 **多厂商支持** - OpenAI / Anthropic / Google / DeepSeek / 通义 / 文心一言等
- 🔄 **流式输出** - 完整的流式文本/对象生成支持
- 🛠️ **函数调用** - 轻松定义和执行工具函数
- 🔗 **LangChain 集成** - 深度整合 LangChain.js 生态
- 🖥️ **Vue 3 原生** - 完整的 Composition API 支持
- 💾 **对话管理** - 内置历史记录持久化
- 🤖 **Agent 编排** - ReAct / ReWOO / Reflexion 等多种模式
- 📦 **向量存储** - 内存存储 + Pinecone/Weaviate/Qdrant 接口
- 💨 **缓存系统** - Memory / localStorage / sessionStorage / Redis
- 🚀 **限流中间件** - 令牌桶/滑动窗口限流
- 📊 **可观测性** - OTel / LangSmith 导出
- 🔌 **MCP 协议** - 完整的 Client + Server 支持
- 🎯 **SSR 支持** - 服务端渲染兼容

## 与市面主流 SDK 对比

| 功能           | Vercel AI SDK | LangChain | **YH AI-SDK**            |
| -------------- | ------------- | --------- | ------------------------ |
| **流式处理**   | ✅            | ✅        | ✅                       |
| **多Provider** | 40+           | 100+      | 10+ (预设) + 自定义      |
| **Agent框架**  | ToolLoopAgent | LangGraph | ✅ ReAct/ReWOO/Reflexion |
| **MCP支持**    | ✅            | ✅        | ✅ 完整实现              |
| **RAG**        | 基础          | 完整      | ✅ 生产级                |
| **向量存储**   | ❌            | ✅        | ✅ 抽象层+内存实现       |
| **缓存**       | ❌            | ✅        | ✅ 多级缓存              |
| **限流**       | ❌            | ❌        | ✅ 完整实现              |
| **可观测性**   | 基础          | ✅        | ✅ OTel + LangSmith      |
| **Vue/SSR**    | ❌            | ❌        | ✅ 深度支持              |

### YH AI-SDK 差异化优势

- 🔥 **Vue 深度集成** - 独有的 Vue Composable + SSR 支持
- 🔥 **多级缓存** - Memory + localStorage + sessionStorage + Redis 接口
- 🔥 **限流中间件** - 与 XRequest 无缝集成
- 🔥 **成本追踪** - 预算控制 + 使用量统计
- 🔥 **安全护栏** - 内容过滤 + 输入验证 + 输出过滤

## 文档导航

| 章节                                 | 说明                                           |
| ------------------------------------ | ---------------------------------------------- |
| [安装](./install)                    | 环境要求、安装方式、快速配置                   |
| [快速开始](./quickstart)             | 最小示例与完整 Demo                            |
| [Vercel AI SDK](./vercel)            | generateText、streamText、useChat              |
| [LangChain 集成](./langchain)        | useLangChainChat、useLangChainStream           |
| [工具函数](./tools)                  | createYHFunctionTool                           |
| [Vue Composables](./vue-composables) | useConversation、createStreamableValue         |
| [MCP 协议](./mcp)                    | MCP Client 与 Server                           |
| [Agent 编排](./agent)                | ReAct、Reflexion、ReWOO、createChain           |
| [向量存储与 RAG](./vector-rag)       | createInMemoryVectorStore、createProductionRAG |
| [缓存系统](./cache)                  | 多级缓存适配器                                 |
| [限流](./rate-limit)                 | createRateLimiter                              |
| [可观测性](./observability)          | OTel、LangSmith                                |
| [前瞻功能](./future)                 | 多模态、思维链，成本控制，安全护栏             |
| [API 参考](./api)                    | 类型与接口说明                                 |
| [注意事项](./caution)                | 常见问题与注意事项                             |
