/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AiMention from '../src/ai-mention.vue'
import type { AiMentionOption } from '../src/ai-mention'

const options: AiMentionOption[] = [
  { label: 'DeepSeek', value: 'deepseek', type: 'agent' },
  { label: 'GPT-4', value: 'gpt4', type: 'agent' },
  { label: 'PRD.docx', value: 'prd', type: 'document' },
  { label: 'Sales.xlsx', value: 'sales', type: 'table' },
  { label: 'Design System', value: 'design', type: 'knowledge' }
]

describe('YhAiMention', () => {
  it('should render correctly', () => {
    const wrapper = mount(AiMention, {
      props: {
        modelValue: '',
        options: options as AiMentionOption[]
      }
    })
    expect(wrapper.classes()).toContain('yh-ai-mention')
    expect(wrapper.findComponent({ name: 'YhMention' }).exists()).toBe(true)
  })

  it('should apply placeholder correctly', () => {
    const placeholder = 'Test Placeholder'
    const wrapper = mount(AiMention, {
      props: {
        modelValue: '',
        options: options as AiMentionOption[],
        placeholder
      }
    })
    const mention = wrapper.findComponent({ name: 'YhMention' })
    expect(mention.props('placeholder')).toBe(placeholder)
  })

  it('should filter options based on types prop', () => {
    const wrapper = mount(AiMention, {
      props: {
        modelValue: '',
        options: options as AiMentionOption[],
        types: ['agent']
      }
    })

    const mention = wrapper.findComponent({ name: 'YhMention' })
    const passedOptions = mention.props('options')

    expect(passedOptions).toHaveLength(2)
    expect(passedOptions.every((opt: AiMentionOption) => opt.type === 'agent')).toBe(true)
  })

  it('should filter multiple types', () => {
    const wrapper = mount(AiMention, {
      props: {
        modelValue: '',
        options: options as AiMentionOption[],
        types: ['document', 'table']
      }
    })

    const mention = wrapper.findComponent({ name: 'YhMention' })
    const passedOptions = mention.props('options')

    expect(passedOptions).toHaveLength(2)
    expect(passedOptions.some((opt: AiMentionOption) => opt.type === 'document')).toBe(true)
    expect(passedOptions.some((opt: AiMentionOption) => opt.type === 'table')).toBe(true)
  })

  it('should show all styles when no types specified (default)', () => {
    const wrapper = mount(AiMention, {
      props: {
        modelValue: '',
        options: options as AiMentionOption[]
      }
    })

    const mention = wrapper.findComponent({ name: 'YhMention' })
    const passedOptions = mention.props('options')

    expect(passedOptions).toHaveLength(5)
  })

  it('should emit update:modelValue when changed', async () => {
    const wrapper = mount(AiMention, {
      props: {
        modelValue: '',
        options: options as AiMentionOption[]
      }
    })

    const mention = wrapper.findComponent({ name: 'YhMention' })
    await mention.vm.$emit('update:modelValue', 'new value')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['new value'])
  })
})
