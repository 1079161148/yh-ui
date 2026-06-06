/**
 * AI Workflow Node Components SSR Tests
 */
import { describe, it, expect } from 'vitest'
import AiLlmNode from '../components/nodes/ai-workflow/AiLlmNode.vue'
import AiPromptNode from '../components/nodes/ai-workflow/AiPromptNode.vue'
import AiAgentNode from '../components/nodes/ai-workflow/AiAgentNode.vue'
import AiToolNode from '../components/nodes/ai-workflow/AiToolNode.vue'
import AiConditionNode from '../components/nodes/ai-workflow/AiConditionNode.vue'
import AiStartNode from '../components/nodes/ai-workflow/AiStartNode.vue'
import AiEndNode from '../components/nodes/ai-workflow/AiEndNode.vue'
import AiMemoryNode from '../components/nodes/ai-workflow/AiMemoryNode.vue'
import { renderSSR, expectSSRContains, testHydration } from './utils/ssr'

describe('AI Workflow Nodes SSR', () => {
  describe('AiLlmNode', () => {
    it('should render LLM node in SSR', async () => {
      const html = await renderSSR(AiLlmNode, {
        id: 'llm-1',
        type: 'ai-llm',
        data: { label: 'GPT-4', model: 'gpt-4' },
        selected: false,
        dragging: false,
        connectable: true
      })
      // The component renders the model from data
      expectSSRContains(html, 'gpt-4')
    })

    it('should render with model info in SSR', async () => {
      const html = await renderSSR(AiLlmNode, {
        id: 'llm-1',
        type: 'ai-llm',
        data: { label: 'LLM', model: 'gpt-4', temperature: 0.7 },
        selected: false,
        dragging: false,
        connectable: true
      })
      expectSSRContains(html, 'gpt-4')
    })

    it('should hydrate without mismatch', async () => {
      const result = await testHydration(AiLlmNode, {
        id: 'llm-1',
        type: 'ai-llm',
        data: { label: 'GPT-4', model: 'gpt-4' },
        selected: false,
        dragging: false,
        connectable: true
      })
      expect(result.isMatch).toBe(true)
    })
  })

  describe('AiPromptNode', () => {
    it('should render prompt node in SSR', async () => {
      const html = await renderSSR(AiPromptNode, {
        id: 'prompt-1',
        type: 'ai-prompt',
        data: { label: 'Prompt', prompt: 'Hello world' },
        selected: false,
        dragging: false,
        connectable: true
      })
      // Default title is "提示词" in Chinese
      expectSSRContains(html, '提示词')
    })

    it('should render with prompt content in SSR', async () => {
      const html = await renderSSR(AiPromptNode, {
        id: 'prompt-1',
        type: 'ai-prompt',
        data: { label: 'Prompt', prompt: 'Summarize this text' },
        selected: false,
        dragging: false,
        connectable: true
      })
      expectSSRContains(html, 'Summarize')
    })

    it('should hydrate without mismatch', async () => {
      const result = await testHydration(AiPromptNode, {
        id: 'prompt-1',
        type: 'ai-prompt',
        data: { label: 'Prompt', prompt: 'Test prompt' },
        selected: false,
        dragging: false,
        connectable: true
      })
      expect(result.isMatch).toBe(true)
    })
  })

  describe('AiAgentNode', () => {
    it('should render agent node in SSR', async () => {
      const html = await renderSSR(AiAgentNode, {
        id: 'agent-1',
        type: 'ai-agent',
        data: { label: 'Agent', tools: ['tool1', 'tool2'] },
        selected: false,
        dragging: false,
        connectable: true
      })
      // Title is "Agent" as passed in data.label
      expectSSRContains(html, 'Agent')
    })

    it('should render tools count in SSR', async () => {
      const html = await renderSSR(AiAgentNode, {
        id: 'agent-1',
        type: 'ai-agent',
        data: { label: 'Agent', tools: ['search', 'calculator'] },
        selected: false,
        dragging: false,
        connectable: true
      })
      expectSSRContains(html, '2')
    })

    it('should hydrate without mismatch', async () => {
      const result = await testHydration(AiAgentNode, {
        id: 'agent-1',
        type: 'ai-agent',
        data: { label: 'Agent', tools: ['tool1'] },
        selected: false,
        dragging: false,
        connectable: true
      })
      expect(result.isMatch).toBe(true)
    })
  })

  describe('AiToolNode', () => {
    it('should render tool node in SSR', async () => {
      const html = await renderSSR(AiToolNode, {
        id: 'tool-1',
        type: 'ai-tool',
        data: { label: 'Search Tool', toolName: 'search' },
        selected: false,
        dragging: false,
        connectable: true
      })
      // Default title is "工具"
      expectSSRContains(html, '工具')
      expectSSRContains(html, 'search')
    })

    it('should render with tool name in SSR', async () => {
      const html = await renderSSR(AiToolNode, {
        id: 'tool-1',
        type: 'ai-tool',
        data: { label: 'Tool', toolName: 'calculator' },
        selected: false,
        dragging: false,
        connectable: true
      })
      expectSSRContains(html, 'calculator')
    })

    it('should hydrate without mismatch', async () => {
      const result = await testHydration(AiToolNode, {
        id: 'tool-1',
        type: 'ai-tool',
        data: { label: 'Search', toolName: 'search' },
        selected: false,
        dragging: false,
        connectable: true
      })
      expect(result.isMatch).toBe(true)
    })
  })

  describe('AiConditionNode', () => {
    it('should render condition node in SSR', async () => {
      const html = await renderSSR(AiConditionNode, {
        id: 'cond-1',
        type: 'ai-condition',
        data: { label: 'Condition', condition: 'if' },
        selected: false,
        dragging: false,
        connectable: true
      })
      // Default title is "条件分支"
      expectSSRContains(html, '条件分支')
    })

    it('should render with condition text in SSR', async () => {
      const html = await renderSSR(AiConditionNode, {
        id: 'cond-1',
        type: 'ai-condition',
        data: { label: 'Check', condition: 'score > 60' },
        selected: false,
        dragging: false,
        connectable: true
      })
      expectSSRContains(html, 'score')
    })

    it('should hydrate without mismatch', async () => {
      const result = await testHydration(AiConditionNode, {
        id: 'cond-1',
        type: 'ai-condition',
        data: { label: 'Condition', condition: 'if' },
        selected: false,
        dragging: false,
        connectable: true
      })
      expect(result.isMatch).toBe(true)
    })
  })

  describe('AiStartNode', () => {
    it('should render start node in SSR', async () => {
      const html = await renderSSR(AiStartNode, {
        id: 'start-1',
        type: 'ai-start',
        data: { label: 'Start' },
        selected: false,
        dragging: false,
        connectable: true
      })
      // Start node renders a play icon
      expectSSRContains(html, '▶')
    })

    it('should hydrate without mismatch', async () => {
      const result = await testHydration(AiStartNode, {
        id: 'start-1',
        type: 'ai-start',
        data: { label: 'Start' },
        selected: false,
        dragging: false,
        connectable: true
      })
      expect(result.isMatch).toBe(true)
    })
  })

  describe('AiEndNode', () => {
    it('should render end node in SSR', async () => {
      const html = await renderSSR(AiEndNode, {
        id: 'end-1',
        type: 'ai-end',
        data: { label: 'End' },
        selected: false,
        dragging: false,
        connectable: true
      })
      // End node renders a stop icon
      expectSSRContains(html, '■')
    })

    it('should render with status in SSR', async () => {
      const html = await renderSSR(AiEndNode, {
        id: 'end-1',
        type: 'ai-end',
        data: { label: 'End', status: 'success' },
        selected: false,
        dragging: false,
        connectable: true
      })
      // Status changes border color, not class
      expectSSRContains(html, '■')
    })

    it('should hydrate without mismatch', async () => {
      const result = await testHydration(AiEndNode, {
        id: 'end-1',
        type: 'ai-end',
        data: { label: 'End' },
        selected: false,
        dragging: false,
        connectable: true
      })
      expect(result.isMatch).toBe(true)
    })
  })

  describe('AiMemoryNode', () => {
    it('should render memory node in SSR', async () => {
      const html = await renderSSR(AiMemoryNode, {
        id: 'mem-1',
        type: 'ai-memory',
        data: { label: 'Memory', memoryType: 'buffer' },
        selected: false,
        dragging: false,
        connectable: true
      })
      // Default title is "记忆"
      expectSSRContains(html, '记忆')
      expectSSRContains(html, 'buffer')
    })

    it('should render with memory type in SSR', async () => {
      const html = await renderSSR(AiMemoryNode, {
        id: 'mem-1',
        type: 'ai-memory',
        data: { label: 'Memory', memoryType: 'vector' },
        selected: false,
        dragging: false,
        connectable: true
      })
      expectSSRContains(html, 'vector')
    })

    it('should hydrate without mismatch', async () => {
      const result = await testHydration(AiMemoryNode, {
        id: 'mem-1',
        type: 'ai-memory',
        data: { label: 'Memory', memoryType: 'buffer' },
        selected: false,
        dragging: false,
        connectable: true
      })
      expect(result.isMatch).toBe(true)
    })
  })
})
