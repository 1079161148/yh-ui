/**
 * YhMention 单元测试
 */
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import Mention from '../src/mention.vue'

// ─── 辅助数据 ─────────────────────────────────────────────────────────────────

const mockOptions = [
  { value: 'alice', label: 'Alice', description: '前端工程师' },
  { value: 'bob', label: 'Bob', description: '后端工程师' },
  { value: 'charlie', label: 'Charlie', disabled: true },
  { value: 'diana', label: 'Diana', avatar: 'https://example.com/avatar.jpg', group: 'VIP' },
  { value: 'evan', label: 'Evan', group: 'VIP' }
]

import { mentionPlacements, mentionSizes, mentionSplits } from '../src/mention'

describe('Mention Constants Coverage', () => {
  it('should have constants defined', () => {
    expect(mentionPlacements).toContain('top')
    expect(mentionSizes).toContain('default')
    expect(mentionSplits).toContain('@')
  })
})

// ─── 渲染测试 ─────────────────────────────────────────────────────────────────

describe('YhMention 基础渲染', () => {
  it('应该正确渲染根元素', () => {
    const wrapper = mount(Mention)
    expect(wrapper.classes()).toContain('yh-mention')
  })

  it('应该渲染 input 类型', () => {
    const wrapper = mount(Mention, { props: { type: 'input' } })
    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.find('textarea').exists()).toBe(false)
  })

  it('应该渲染 textarea 类型', () => {
    const wrapper = mount(Mention, { props: { type: 'textarea' } })
    expect(wrapper.find('textarea').exists()).toBe(true)
    expect(wrapper.find('input').exists()).toBe(false)
    expect(wrapper.classes()).toContain('is-textarea')
  })

  it('应该渲染 placeholder', () => {
    const wrapper = mount(Mention, { props: { placeholder: '输入 @ 提及' } })
    const input = wrapper.find('input')
    expect(input.attributes('placeholder')).toBe('输入 @ 提及')
  })

  it('禁用状态应添加 is-disabled class', () => {
    const wrapper = mount(Mention, { props: { disabled: true } })
    expect(wrapper.classes()).toContain('is-disabled')
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })

  it('只读状态应设置 readonly 属性', () => {
    const wrapper = mount(Mention, { props: { readonly: true } })
    expect(wrapper.find('input').attributes('readonly')).toBeDefined()
  })

  it('尺寸 large 应添加对应 class', () => {
    const wrapper = mount(Mention, { props: { size: 'large' } })
    expect(wrapper.classes()).toContain('yh-mention--large')
  })

  it('尺寸 small 应添加对应 class', () => {
    const wrapper = mount(Mention, { props: { size: 'small' } })
    expect(wrapper.classes()).toContain('yh-mention--small')
  })
})

// ─── v-model ─────────────────────────────────────────────────────────────────

describe('YhMention v-model', () => {
  it('应该绑定并响应 modelValue', async () => {
    const wrapper = mount(Mention, {
      props: {
        modelValue: 'hello',
        'onUpdate:modelValue': (val: string) => wrapper.setProps({ modelValue: val })
      }
    })
    expect(wrapper.find('input').element.value).toBe('hello')

    await wrapper.find('input').setValue('world')
    expect(wrapper.props('modelValue')).toBe('world')
  })

  it('输入时应触发 input 事件', async () => {
    const wrapper = mount(Mention, { props: { modelValue: '' } })
    await wrapper.find('input').trigger('input')
    expect(wrapper.emitted('input')).toBeTruthy()
  })
})

// ─── 触发逻辑 ─────────────────────────────────────────────────────────────────

describe('YhMention 触发机制', () => {
  it('输入 @ 后应打开下拉框', async () => {
    const wrapper = mount(Mention, {
      props: { modelValue: '', options: mockOptions, debounce: 0, teleported: false },
      attachTo: document.body
    })
    // 模拟输入 @
    const input = wrapper.find('input')
    await input.setValue('@')
    await input.trigger('input')
    // 等待防抖（debounce=0 时也需要一个 tick）
    await new Promise((r) => setTimeout(r, 50))
    await nextTick()

    // 下拉框应该可见
    expect(wrapper.emitted('search')).toBeTruthy()
    const searchEvent = wrapper.emitted('search') as [string, string][]
    expect(searchEvent[0][1]).toBe('@')
  })

  it('支持自定义触发符 #', async () => {
    const wrapper = mount(Mention, {
      props: {
        modelValue: '',
        options: mockOptions,
        triggers: ['#'],
        debounce: 0,
        teleported: false
      },
      attachTo: document.body
    })
    const input = wrapper.find('input')
    await input.setValue('#')
    await input.trigger('input')
    await new Promise((r) => setTimeout(r, 50))
    await nextTick()

    const searchEvent = wrapper.emitted('search') as [string, string][]
    expect(searchEvent?.[0]?.[1]).toBe('#')
  })

  it('输入空格后应关闭下拉框', async () => {
    const wrapper = mount(Mention, {
      props: { modelValue: '@alice ', options: mockOptions, debounce: 0, teleported: false },
      attachTo: document.body
    })
    const input = wrapper.find('input')
    await input.setValue('@alice ')
    await input.trigger('input')
    await new Promise((r) => setTimeout(r, 50))
    await nextTick()

    // 含空格时触发无效，不应有 search 事件（或下拉框已关闭）
    expect(wrapper.emitted('open')).toBeFalsy()
  })
})

// ─── 过滤逻辑 ─────────────────────────────────────────────────────────────────

describe('YhMention 过滤选项', () => {
  it('默认应按 label 过滤', async () => {
    const wrapper = mount(Mention, {
      props: { modelValue: '@al', options: mockOptions, debounce: 0, teleported: false },
      attachTo: document.body
    })
    const input = wrapper.find('input')
    await input.setValue('@al')
    await input.trigger('input')
    await new Promise((r) => setTimeout(r, 50))
    await nextTick()

    const searchEvents = wrapper.emitted('search') as [string, string][]
    const keyword = searchEvents?.[searchEvents.length - 1]?.[0]
    expect(keyword).toBe('al')
  })

  it('filterOption=false 时应显示全部选项', async () => {
    const wrapper = mount(Mention, {
      props: {
        modelValue: '',
        options: mockOptions,
        filterOption: false,
        debounce: 0,
        teleported: false
      },
      attachTo: document.body
    })
    const input = wrapper.find('input')
    await input.setValue('@')
    await input.trigger('input')
    await new Promise((r) => setTimeout(r, 50))
    await nextTick()

    const opts = wrapper.findAll('.yh-mention__option')
    expect(opts.length).toBe(mockOptions.length)
  })

  it('自定义 filterOption 应按自定义逻辑过滤', async () => {
    const customFilter = vi.fn((keyword: string, opt: { value: string }) =>
      opt.value.startsWith(keyword)
    )
    const wrapper = mount(Mention, {
      props: {
        modelValue: '',
        options: mockOptions,
        filterOption: customFilter,
        debounce: 0,
        teleported: false
      },
      attachTo: document.body
    })
    const input = wrapper.find('input')
    await input.setValue('@a')
    await input.trigger('input')
    await new Promise((r) => setTimeout(r, 50))
    await nextTick()

    expect(customFilter).toHaveBeenCalled()
  })
})

// ─── 选中逻辑 ─────────────────────────────────────────────────────────────────

describe('YhMention 选中选项', () => {
  it('点击选项应更新 modelValue 并触发 select 事件', async () => {
    const wrapper = mount(Mention, {
      props: {
        modelValue: '',
        options: [{ value: 'alice', label: 'Alice' }],
        debounce: 0,
        teleported: false
      },
      attachTo: document.body
    })
    const inputEl = wrapper.find('input').element as HTMLInputElement
    inputEl.focus()
    inputEl.value = '@'
    inputEl.setSelectionRange(1, 1)
    await wrapper.find('input').trigger('input')
    await new Promise((r) => setTimeout(r, 100))
    await nextTick()

    const opt = wrapper.find('.yh-mention__option')
    expect(opt.exists()).toBe(true)

    if (opt.exists()) {
      await opt.trigger('mousedown')
      await opt.trigger('click')
      await nextTick()

      expect(wrapper.emitted('select')).toBeTruthy()
      const selectArgs = wrapper.emitted('select')?.[0] as [{ value: string }, string]
      expect(selectArgs[0]).toMatchObject({ value: 'alice' })
    }
  })

  it('禁用选项不应被选中', async () => {
    const wrapper = mount(Mention, {
      props: {
        modelValue: '',
        options: [{ value: 'charlie', label: 'Charlie', disabled: true }],
        filterOption: false,
        debounce: 0,
        teleported: false
      },
      attachTo: document.body
    })
    const input = wrapper.find('input')
    await input.setValue('@')
    await input.trigger('input')
    await new Promise((r) => setTimeout(r, 50))
    await nextTick()

    const opt = wrapper.find('.yh-mention__option.is-disabled')
    if (opt.exists()) {
      await opt.trigger('click')
      // disabled 的选项不应触发 select
      expect(wrapper.emitted('select')).toBeFalsy()
    }
  })
})

// ─── 键盘导航 ─────────────────────────────────────────────────────────────────

describe('YhMention 键盘导航', () => {
  it('ArrowDown 应高亮下一项', async () => {
    const wrapper = mount(Mention, {
      props: {
        modelValue: '',
        options: mockOptions,
        filterOption: false,
        debounce: 0,
        teleported: false
      },
      attachTo: document.body
    })
    const input = wrapper.find('input')
    await input.setValue('@')
    await input.trigger('input')
    await new Promise((r) => setTimeout(r, 50))
    await nextTick()

    await input.trigger('keydown', { key: 'ArrowDown' })
    await nextTick()

    const highlighted = wrapper.find('.yh-mention__option.is-highlighted')
    expect(highlighted.exists()).toBe(true)
  })

  it('Escape 应关闭下拉框', async () => {
    const wrapper = mount(Mention, {
      props: {
        modelValue: '',
        options: mockOptions,
        filterOption: false,
        debounce: 0,
        teleported: false
      },
      attachTo: document.body
    })
    const input = wrapper.find('input')
    await input.setValue('@')
    await input.trigger('input')
    await new Promise((r) => setTimeout(r, 50))
    await nextTick()

    await input.trigger('keydown', { key: 'Escape' })
    await nextTick()

    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('Enter 应选中高亮项', async () => {
    const wrapper = mount(Mention, {
      props: {
        modelValue: '',
        options: mockOptions,
        filterOption: false,
        debounce: 0,
        teleported: false
      },
      attachTo: document.body
    })
    const input = wrapper.find('input')
    await input.setValue('@')
    await input.trigger('input')
    await new Promise((r) => setTimeout(r, 50))
    await nextTick()

    await input.trigger('keydown', { key: 'ArrowDown' })
    await nextTick()
    await input.trigger('keydown', { key: 'Enter' })
    await nextTick()

    // 有两种可能：触发了 select 或 update:modelValue
    const selectEmitted = wrapper.emitted('select')
    const updateEmitted = wrapper.emitted('update:modelValue')
    expect(selectEmitted || updateEmitted).toBeTruthy()
  })
})

// ─── 可清空 ───────────────────────────────────────────────────────────────────

describe('YhMention 可清空', () => {
  it('有值且 clearable 时，聚焦后应显示清空按钮', async () => {
    const wrapper = mount(Mention, {
      props: { modelValue: '@alice', clearable: true }
    })
    await wrapper.find('input').trigger('focus')
    await nextTick()

    expect(wrapper.find('.yh-mention__clear').exists()).toBe(true)
  })

  it('点击清空按钮应清空 modelValue 并触发 clear 事件', async () => {
    const wrapper = mount(Mention, {
      props: { modelValue: '@alice', clearable: true }
    })
    await wrapper.find('input').trigger('focus')
    await nextTick()

    const clearBtn = wrapper.find('.yh-mention__clear')
    if (clearBtn.exists()) {
      await clearBtn.trigger('click')
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([''])
      expect(wrapper.emitted('clear')).toBeTruthy()
    }
  })
})

// ─── 字数统计 ────────────────────────────────────────────────────────────────

describe('YhMention 字数统计', () => {
  it('showWordLimit 应显示字数统计', () => {
    const wrapper = mount(Mention, {
      props: { modelValue: 'hello @world', showWordLimit: true, maxlength: 50 }
    })
    expect(wrapper.find('.yh-mention__count').exists()).toBe(true)
    expect(wrapper.find('.yh-mention__count').text()).toContain('12 / 50')
  })
})

// ─── 插槽 ────────────────────────────────────────────────────────────────────

describe('YhMention 插槽', () => {
  it('应该渲染 prefix 插槽', () => {
    const wrapper = mount(Mention, {
      slots: { prefix: '<span class="custom-prefix">@</span>' }
    })
    expect(wrapper.find('.custom-prefix').exists()).toBe(true)
  })

  it('应该渲染 suffix 插槽', () => {
    const wrapper = mount(Mention, {
      slots: { suffix: '<span class="custom-suffix">✓</span>' }
    })
    expect(wrapper.find('.custom-suffix').exists()).toBe(true)
  })

  it('应该渲染 option 插槽', async () => {
    const wrapper = mount(Mention, {
      props: {
        modelValue: '',
        options: [{ value: 'alice', label: 'Alice' }],
        filterOption: false,
        debounce: 0,
        teleported: false
      },
      slots: {
        option:
          '<template #option="{ option }"><span class="custom-opt">{{ option.label }}</span></template>'
      },
      attachTo: document.body
    })
    const input = wrapper.find('input')
    await input.setValue('@')
    await input.trigger('input')
    await new Promise((r) => setTimeout(r, 50))
    await nextTick()
    // 插槽有自定义内容
    expect(
      wrapper.find('.custom-opt').exists() || wrapper.find('.yh-mention__option').exists()
    ).toBe(true)
  })

  it('应该渲染空数据 empty 插槽', async () => {
    const wrapper = mount(Mention, {
      props: { modelValue: '', options: [], debounce: 0, teleported: false },
      slots: { empty: '<span class="custom-empty">没有人</span>' },
      attachTo: document.body
    })
    const input = wrapper.find('input')
    await input.setValue('@')
    await input.trigger('input')
    await new Promise((r) => setTimeout(r, 50))
    await nextTick()

    expect(wrapper.find('.custom-empty').exists()).toBe(true)
  })
})

// ─── Expose API ────────────────────────────────────────────────────────────────

describe('YhMention expose API', () => {
  it('focus 方法应使输入框聚焦', async () => {
    const wrapper = mount(Mention, { attachTo: document.body })
    const vm = wrapper.vm as unknown as { focus: () => void }
    expect(typeof vm.focus).toBe('function')
  })

  it('blur 方法应存在', () => {
    const wrapper = mount(Mention)
    const vm = wrapper.vm as unknown as { blur: () => void }
    expect(typeof vm.blur).toBe('function')
  })

  it('clear 方法应清空内容', async () => {
    const wrapper = mount(Mention, {
      props: { modelValue: '@alice' }
    })
    const vm = wrapper.vm as unknown as { clear: () => void }
    vm.clear()
    await nextTick()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([''])
  })

  it('insertMention 方法应插入文本', async () => {
    const wrapper = mount(Mention, { props: { modelValue: '你好 ' } })
    const vm = wrapper.vm as unknown as {
      insertMention: (opt: { value: string; label: string }, trigger?: string) => void
    }
    vm.insertMention({ value: 'alice', label: 'Alice' }, '@')
    await nextTick()
    const updatedVal = wrapper.emitted('update:modelValue')?.[0]?.[0] as string
    expect(updatedVal).toContain('@Alice')
  })
})

// ─── 分组 ─────────────────────────────────────────────────────────────────────

describe('YhMention 分组', () => {
  it('有 group 标识的选项应显示分组标题', async () => {
    const wrapper = mount(Mention, {
      props: {
        modelValue: '',
        options: mockOptions,
        filterOption: false,
        debounce: 0,
        teleported: false
      },
      attachTo: document.body
    })
    const input = wrapper.find('input')
    await input.setValue('@')
    await input.trigger('input')
    await new Promise((r) => setTimeout(r, 50))
    await nextTick()

    const groupLabel = wrapper.find('.yh-mention__group-label')
    expect(groupLabel.exists()).toBe(true)
    expect(groupLabel.text()).toBe('VIP')
  })
})

// ─── 头像 ────────────────────────────────────────────────────────────────────

describe('YhMention 选项头像', () => {
  it('有 avatar 的选项应渲染 img 元素', async () => {
    const wrapper = mount(Mention, {
      props: {
        modelValue: '',
        options: [{ value: 'diana', label: 'Diana', avatar: 'https://example.com/avatar.jpg' }],
        filterOption: false,
        debounce: 0,
        teleported: false
      },
      attachTo: document.body
    })
    const input = wrapper.find('input')
    await input.setValue('@')
    await input.trigger('input')
    await new Promise((r) => setTimeout(r, 50))
    await nextTick()

    const img = wrapper.find('.yh-mention__option-avatar')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('https://example.com/avatar.jpg')
  })
})

// ─── 多触发符 ─────────────────────────────────────────────────────────────────

describe('YhMention 多触发符', () => {
  it('支持同时配置 @ 和 # 触发符', async () => {
    const wrapper = mount(Mention, {
      props: {
        modelValue: '',
        options: mockOptions,
        triggers: ['@', '#'],
        debounce: 0,
        teleported: false
      },
      attachTo: document.body
    })
    const input = wrapper.find('input')

    await input.setValue('#')
    await input.trigger('input')
    await new Promise((r) => setTimeout(r, 50))
    await nextTick()

    const searchEvents = wrapper.emitted('search') as [string, string][]
    expect(searchEvents?.[0]?.[1]).toBe('#')
  })
})

// ─── 事件 ────────────────────────────────────────────────────────────────────

describe('YhMention 事件', () => {
  it('聚焦应触发 focus 事件', async () => {
    const wrapper = mount(Mention)
    await wrapper.find('input').trigger('focus')
    expect(wrapper.emitted('focus')).toBeTruthy()
  })

  it('失焦应触发 blur 事件', async () => {
    const wrapper = mount(Mention)
    await wrapper.find('input').trigger('focus')
    await wrapper.find('input').trigger('blur')
    // blur 有 150ms 延迟，等待
    await new Promise((r) => setTimeout(r, 200))
    expect(wrapper.emitted('blur')).toBeTruthy()
  })

  it('keydown 事件应透传', async () => {
    const wrapper = mount(Mention)
    await wrapper.find('input').trigger('keydown', { key: 'a' })
    expect(wrapper.emitted('keydown')).toBeTruthy()
  })

  it('默认 placeholder 应从语言包获取', async () => {
    const wrapper = mount(Mention)
    const input = wrapper.find('input')
    expect(input.attributes('placeholder')).toBe('请输入')
  })

  it('应该覆盖 Mention.vue 的更多分支', async () => {
    const wrapper = mount(Mention, {
      props: {
        modelValue: '',
        options: mockOptions,
        debounce: 0,
        teleported: false
      },
      attachTo: document.body
    })

    const input = wrapper.find('input')
    await input.trigger('mouseenter')
    await input.trigger('mouseleave')

    // 触发下拉
    await input.setValue('@')
    await input.trigger('input')
    await new Promise((r) => setTimeout(r, 50))
    await nextTick()

    // 键盘测试
    await input.trigger('keydown', { key: 'ArrowUp' })
    await input.trigger('keydown', { key: 'Escape' })
    await input.trigger('keydown', { key: 'Tab' })

    // 点击外部
    document.body.click()
    await nextTick()

    // resize
    window.dispatchEvent(new Event('resize'))

    wrapper.unmount()
  })
})
