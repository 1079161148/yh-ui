/**
 * YhAiMention 组件交互与分支覆盖（不使用顶层 mock，真实渲染 YhMention / Teleport）
 */
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import AiMention from '../src/ai-mention.vue'
import { YhConfigProvider } from '../../config-provider'
import { zhCn } from '@yh-ui/locale'
import type { AiMentionFileNode, AiMentionOption } from '../src/ai-mention'

const agents: AiMentionOption[] = [
  { value: 'a1', label: 'Agent1', type: 'agent', description: 'desc', icon: 'robot' }
]

function mountAi(props: Record<string, unknown> = {}) {
  return mount(YhConfigProvider, {
    props: { locale: zhCn },
    slots: {
      default: () =>
        h(AiMention, {
          modelValue: '',
          options: agents,
          searchDebounce: 0,
          debounce: 0,
          ...props
        })
    },
    attachTo: document.body,
    global: {
      stubs: false
    }
  })
}

describe('YhAiMention 交互', () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['setTimeout'] })
  })
  afterEach(() => {
    vi.useRealTimers()
    document.body.innerHTML = ''
  })

  it('输入 @文档 前缀时加载模拟文件树并展示面板', async () => {
    const onSearch = vi.fn()
    const onFileLoad = vi.fn()
    const wrap = mountAi({
      enableFileTree: true,
      onSearch,
      onFileLoad
    })
    const inner = wrap.findComponent(AiMention)
    const ta = inner.find('textarea')
    expect(ta.exists()).toBe(true)
    await ta.setValue('@文档')
    await ta.trigger('input')
    await vi.advanceTimersByTimeAsync(120)
    await flushPromises()
    await nextTick()

    expect(onSearch).toHaveBeenCalled()
    expect(onFileLoad).toHaveBeenCalled()
    const panel = document.body.querySelector('.yh-ai-mention__file-tree-panel')
    expect(panel).toBeTruthy()
    expect(panel?.textContent).toContain('文档')
    wrap.unmount()
  })

  it('@文件 / @表格 / @知识库 均触发对应类型的 file-load', async () => {
    const onFileLoad = vi.fn()
    const wrap = mountAi({ onFileLoad })
    const inner = wrap.findComponent(AiMention)
    const ta = inner.find('textarea')

    for (const prefix of ['@文件', '@表格', '@知识库']) {
      onFileLoad.mockClear()
      await ta.setValue(prefix)
      await ta.trigger('input')
      await vi.advanceTimersByTimeAsync(120)
      await flushPromises()
      await nextTick()
      expect(onFileLoad).toHaveBeenCalled()
    }
    wrap.unmount()
  })

  it('enableFileTree 为 false 时不应打开文件树加载分支', async () => {
    const onFileLoad = vi.fn()
    const wrap = mountAi({ enableFileTree: false, onFileLoad })
    const inner = wrap.findComponent(AiMention)
    const ta = inner.find('textarea')
    await ta.setValue('@文档readme')
    await ta.trigger('input')
    await vi.advanceTimersByTimeAsync(120)
    await flushPromises()
    await nextTick()
    expect(onFileLoad).not.toHaveBeenCalled()
    wrap.unmount()
  })

  it('自定义 fileLoader：覆盖成功与抛错分支', async () => {
    const okNodes: AiMentionFileNode[] = [
      {
        key: 'f1',
        label: 'only.txt',
        isFolder: false,
        path: '/only.txt',
        size: 100,
        modifiedAt: Date.now()
      }
    ]
    const loaderOk = vi.fn(async () => okNodes)
    const onFileLoad = vi.fn()
    const wrap = mountAi({ fileLoader: loaderOk, onFileLoad })
    const inner = wrap.findComponent(AiMention)
    const ta = inner.find('textarea')
    await ta.setValue('@文档')
    await ta.trigger('input')
    await vi.advanceTimersByTimeAsync(120)
    await flushPromises()
    await nextTick()
    expect(loaderOk).toHaveBeenCalled()
    expect(onFileLoad).toHaveBeenCalledWith('document', okNodes)
    wrap.unmount()

    const loaderFail = vi.fn(async () => {
      throw new Error('net')
    })
    const wrap2 = mountAi({ fileLoader: loaderFail })
    const inner2 = wrap2.findComponent(AiMention)
    const ta2 = inner2.find('textarea')
    const errSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    await ta2.setValue('@文档')
    await ta2.trigger('input')
    await vi.advanceTimersByTimeAsync(120)
    await flushPromises()
    await nextTick()
    errSpy.mockRestore()
    wrap2.unmount()
  })

  it('types 过滤：仅保留列入 types 的选项', async () => {
    const wrap = mountAi({
      types: ['agent'],
      options: [
        { value: 'ag', label: 'A', type: 'agent' },
        { value: 'doc', label: 'D', type: 'document' }
      ]
    })
    const inner = wrap.findComponent(AiMention)
    const mention = inner.findComponent({ name: 'YhMention' })
    const opts = mention.props('options') as AiMentionOption[]
    expect(opts.map((o) => o.value)).toEqual(['ag'])
    wrap.unmount()
  })

  it('types 为空数组时不过滤 options', async () => {
    const wrap = mountAi({
      types: [],
      options: agents
    })
    const inner = wrap.findComponent(AiMention)
    const mention = inner.findComponent({ name: 'YhMention' })
    const opts = mention.props('options') as AiMentionOption[]
    expect(opts.length).toBe(agents.length)
    wrap.unmount()
  })

  it('点击文件夹与叶子节点：toggle + select / file-select', async () => {
    const onSelect = vi.fn()
    const onFileSelect = vi.fn()
    const wrap = mountAi({ onSelect, onFileSelect })
    const inner = wrap.findComponent(AiMention)
    const ta = inner.find('textarea')
    await ta.setValue('@文档')
    await ta.trigger('input')
    await vi.advanceTimersByTimeAsync(120)
    await flushPromises()
    await nextTick()

    const folder = document.body.querySelector('.yh-ai-mention__file-tree-node')
    expect(folder).toBeTruthy()
    ;(folder as HTMLElement).click()
    await nextTick()
    const toggles = document.body.querySelectorAll('.yh-ai-mention__folder-toggle')
    if (toggles[0]) {
      ;(toggles[0] as HTMLElement).click()
      await nextTick()
    }
    const leaves = document.body.querySelectorAll('.yh-ai-mention__file-tree-node')
    const last = leaves[leaves.length - 1] as HTMLElement | undefined
    if (last) last.click()
    await nextTick()
    expect(onSelect.mock.calls.length + onFileSelect.mock.calls.length).toBeGreaterThan(0)
    wrap.unmount()
  })

  it('expose：refreshFileTree 与 toggleFolder', async () => {
    const wrap = mountAi({})
    const inner = wrap.findComponent(AiMention)
    const ta = inner.find('textarea')
    await ta.setValue('@表格')
    await ta.trigger('input')
    await vi.advanceTimersByTimeAsync(120)
    await flushPromises()
    await nextTick()
    const exposed = inner.vm as {
      refreshFileTree: () => void
      toggleFolder: (k: string) => void
    }
    exposed.refreshFileTree()
    exposed.toggleFolder('excel')
    exposed.toggleFolder('excel')
    wrap.unmount()
  })

  it('文件树面板应根据 mention 容器位置动态计算 top 和 left 坐标，并在 scroll 和 resize 时更新', async () => {
    const wrap = mountAi({
      enableFileTree: true
    })
    const inner = wrap.findComponent(AiMention)
    const ta = inner.find('textarea')

    const rectSpy = vi.spyOn(inner.element, 'getBoundingClientRect').mockReturnValue({
      left: 150,
      right: 450,
      top: 300,
      bottom: 350,
      width: 300,
      height: 50,
      x: 150,
      y: 300
    } as DOMRect)

    await ta.setValue('@文档')
    await ta.trigger('input')
    await vi.advanceTimersByTimeAsync(120)
    await flushPromises()
    await nextTick()

    const panel = document.body.querySelector('.yh-ai-mention__file-tree-panel') as HTMLElement
    expect(panel).toBeTruthy()
    expect(panel.style.left).toBe('150px')
    expect(panel.style.top).toBe('354px')

    rectSpy.mockReturnValue({
      left: 180,
      right: 480,
      top: 280,
      bottom: 330,
      width: 300,
      height: 50,
      x: 180,
      y: 280
    } as DOMRect)

    window.dispatchEvent(new Event('scroll'))
    await nextTick()

    expect(panel.style.left).toBe('180px')
    expect(panel.style.top).toBe('334px')

    rectSpy.mockReturnValue({
      left: 200,
      right: 500,
      top: 200,
      bottom: 250,
      width: 300,
      height: 50,
      x: 200,
      y: 200
    } as DOMRect)
    window.dispatchEvent(new Event('resize'))
    await nextTick()

    expect(panel.style.left).toBe('200px')
    expect(panel.style.top).toBe('254px')

    rectSpy.mockRestore()
    wrap.unmount()
  })

  it('应支持深度嵌套的多级文件夹展开与文件选择', async () => {
    const onFileSelect = vi.fn()
    const wrap = mountAi({
      enableFileTree: true,
      fileTreeExpandedLevel: 0,
      onFileSelect,
      fileLoader: async () => [
        {
          key: 'level-1',
          label: 'Folder 1',
          isFolder: true,
          path: '/lvl1',
          children: [
            {
              key: 'level-2',
              label: 'Folder 2',
              isFolder: true,
              path: '/lvl1/lvl2',
              children: [
                {
                  key: 'deep-file',
                  label: 'deep.txt',
                  isFolder: false,
                  path: '/lvl1/lvl2/deep.txt',
                  size: 42,
                  modifiedAt: Date.now()
                }
              ]
            }
          ]
        }
      ]
    })
    const inner = wrap.findComponent(AiMention)
    const ta = inner.find('textarea')
    await ta.setValue('@文档')
    await ta.trigger('input')
    await vi.advanceTimersByTimeAsync(120)
    await flushPromises()
    await nextTick()

    // Initially we should see Folder 1
    let nodes = document.body.querySelectorAll('.yh-ai-mention__file-tree-node')
    expect(nodes).toHaveLength(1)
    expect(nodes[0].textContent).toContain('Folder 1')

    // Click to expand Folder 1
    const folderToggle1 = document.body.querySelector(
      '.yh-ai-mention__folder-toggle'
    ) as HTMLElement
    expect(folderToggle1).toBeTruthy()
    folderToggle1.click()
    await nextTick()

    // Now we should see Folder 1 and Folder 2
    nodes = document.body.querySelectorAll('.yh-ai-mention__file-tree-node')
    expect(nodes).toHaveLength(2)
    expect(nodes[1].textContent).toContain('Folder 2')

    // Click to expand Folder 2
    const folderToggle2 = document.body.querySelectorAll(
      '.yh-ai-mention__folder-toggle'
    )[1] as HTMLElement
    expect(folderToggle2).toBeTruthy()
    folderToggle2.click()
    await nextTick()

    // Now we should see Folder 1, Folder 2, and deep.txt
    nodes = document.body.querySelectorAll('.yh-ai-mention__file-tree-node')
    expect(nodes).toHaveLength(3)
    expect(nodes[2].textContent).toContain('deep.txt')

    // Click deep.txt
    const deepFileNode = nodes[2] as HTMLElement
    deepFileNode.click()
    await nextTick()

    expect(onFileSelect).toHaveBeenCalled()
    expect(onFileSelect.mock.calls[0][0].key).toBe('deep-file')

    wrap.unmount()
  })

  it('should emit change event when YhMention changes', async () => {
    const onChange = vi.fn()
    const wrap = mountAi({ onChange })
    const inner = wrap.findComponent(AiMention)
    const mention = inner.findComponent({ name: 'YhMention' })
    await mention.vm.$emit('change', 'new value')
    expect(onChange).toHaveBeenCalledWith('new value')
    wrap.unmount()
  })

  it('should prefix paths correctly when fileRoot is set', async () => {
    const onFileLoad = vi.fn()
    const wrap = mountAi({
      fileRoot: '/my-root',
      onFileLoad
    })
    const inner = wrap.findComponent(AiMention)
    const ta = inner.find('textarea')
    await ta.setValue('@文档')
    await ta.trigger('input')
    await vi.advanceTimersByTimeAsync(120)
    await flushPromises()
    await nextTick()

    expect(onFileLoad).toHaveBeenCalled()
    const loadedNodes = onFileLoad.mock.calls[0][1] as AiMentionFileNode[]
    expect(loadedNodes[0].path).toBe('/my-root/docs')
    expect(loadedNodes[0].children?.[0].path).toBe('/my-root/docs/README.md')
    wrap.unmount()
  })
})
