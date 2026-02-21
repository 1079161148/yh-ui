/**
 * Transfer 组件单元测试
 * @description 测试 Transfer 穿梭框组件的核心功能
 */

import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, ref } from 'vue'
import Transfer from '../src/transfer.vue'
import TransferPanel from '../src/transfer-panel.vue'
import type { TransferData, TransferKey } from '../src/transfer'

// 生成测试数据
const generateData = (count: number = 15): TransferData[] => {
  const data: TransferData[] = []
  for (let i = 1; i <= count; i++) {
    data.push({
      key: i,
      label: `选项 ${i}`,
      disabled: i % 5 === 0
    })
  }
  return data
}

// 自定义字段测试数据
const generateCustomData = (): TransferData[] => {
  return [
    { id: 1, name: '北京', code: 'BJ' },
    { id: 2, name: '上海', code: 'SH' },
    { id: 3, name: '广州', code: 'GZ' },
    { id: 4, name: '深圳', code: 'SZ', disabled: true }
  ] as unknown as TransferData[]
}

describe('Transfer', () => {
  // 基础渲染
  describe('基础渲染', () => {
    it('应该正确渲染 Transfer 组件', () => {
      const wrapper = mount(Transfer, {
        props: {
          data: generateData(),
          modelValue: []
        }
      })

      expect(wrapper.find('.yh-transfer').exists()).toBe(true)
      expect(wrapper.findAll('.yh-transfer-panel').length).toBe(2)
      expect(wrapper.find('.yh-transfer__buttons').exists()).toBe(true)
    })

    it('应该正确显示标题', () => {
      const wrapper = mount(Transfer, {
        props: {
          data: generateData(),
          modelValue: [],
          titles: ['源列表', '目标列表']
        }
      })

      const panels = wrapper.findAll('.yh-transfer-panel__title')
      expect(panels[0].text()).toContain('源列表')
      expect(panels[1].text()).toContain('目标列表')
    })

    it('应该支持自定义标题 props', () => {
      const wrapper = mount(Transfer, {
        props: {
          data: generateData(),
          modelValue: [],
          leftTitle: '左侧列表',
          rightTitle: '右侧列表'
        }
      })

      const panels = wrapper.findAll('.yh-transfer-panel__title')
      expect(panels[0].text()).toContain('左侧列表')
      expect(panels[1].text()).toContain('右侧列表')
    })
  })

  // 数据绑定
  describe('数据绑定', () => {
    it('应该正确分配左右侧数据', () => {
      const data = generateData(10)
      const wrapper = mount(Transfer, {
        props: {
          data,
          modelValue: [1, 2, 3]
        }
      })

      const panels = wrapper.findAllComponents(TransferPanel)
      // 左侧应该有 7 项（10 - 3）
      expect(panels[0]?.props('data')?.length).toBe(7)
      // 右侧应该有 3 项
      expect(panels[1]?.props('data')?.length).toBe(3)
    })

    it('应该支持字段别名', () => {
      const customData = generateCustomData()
      const wrapper = mount(Transfer, {
        props: {
          data: customData,
          modelValue: [1, 2],
          props: {
            key: 'id',
            label: 'name',
            disabled: 'disabled'
          }
        }
      })

      const panels = wrapper.findAllComponents(TransferPanel)
      expect(panels[0]?.props('data')?.length).toBe(2) // 广州、深圳
      expect(panels[1]?.props('data')?.length).toBe(2) // 北京、上海
    })
  })

  // 穿梭操作
  describe('穿梭操作', () => {
    it('点击选项应该切换选中状态', async () => {
      const wrapper = mount(Transfer, {
        props: {
          data: generateData(5),
          modelValue: []
        }
      })

      // 点击左侧第一个选项
      const items = wrapper.findAll('.yh-transfer-panel__item')
      await items[0].trigger('click')

      // 应该被选中
      expect(items[0].classes()).toContain('is-checked')
    })

    it('应该正确触发穿梭事件', async () => {
      const onChange = vi.fn()
      const wrapper = mount(Transfer, {
        props: {
          data: generateData(5),
          modelValue: [],
          'onUpdate:modelValue': (val: TransferKey[]) => {
            wrapper.setProps({ modelValue: val })
          },
          onChange
        }
      })

      // 选中左侧第一项
      const leftItems = wrapper.findAll('.yh-transfer-panel__item')
      await leftItems[0].trigger('click')

      // 点击向右按钮
      const buttons = wrapper.findAll('.yh-transfer__button')
      await buttons[0].trigger('click')

      // 验证事件触发
      expect(onChange).toHaveBeenCalled()
    })

    it('禁用项不应该被选中', async () => {
      const data = generateData(5)
      data[0].disabled = true

      const wrapper = mount(Transfer, {
        props: {
          data,
          modelValue: []
        }
      })

      // 点击禁用项
      const items = wrapper.findAll('.yh-transfer-panel__item')
      await items[0].trigger('click')

      // 不应该被选中
      expect(items[0].classes()).not.toContain('is-checked')
    })
  })

  // 搜索过滤
  describe('搜索过滤', () => {
    it('应该正确渲染搜索框', () => {
      const wrapper = mount(Transfer, {
        props: {
          data: generateData(),
          modelValue: [],
          filterable: true
        }
      })

      const filterInputs = wrapper.findAll('.yh-transfer-panel__filter-input')
      expect(filterInputs.length).toBe(2)
    })

    it('应该正确过滤数据', async () => {
      const wrapper = mount(Transfer, {
        props: {
          data: generateData(15),
          modelValue: [],
          filterable: true
        }
      })

      // 输入搜索关键词
      const filterInput = wrapper.find('.yh-transfer-panel__filter-input')
      await filterInput.setValue('1')
      await nextTick()

      // 验证过滤结果（应该匹配 1, 10, 11, 12, 13, 14, 15）
      const leftPanel = wrapper.findAllComponents(TransferPanel)[0]
      const items = leftPanel.findAll('.yh-transfer-panel__item')
      expect(items.length).toBe(7)
    })

    it('应该支持自定义过滤方法', async () => {
      const customData = generateCustomData()
      const filterMethod = vi.fn((query: string, item: TransferData) => {
        return (item as unknown as { code: string }).code
          .toLowerCase()
          .includes(query.toLowerCase())
      })

      const wrapper = mount(Transfer, {
        props: {
          data: customData,
          modelValue: [],
          filterable: true,
          filterMethod,
          props: {
            key: 'id',
            label: 'name'
          }
        }
      })

      // 输入搜索关键词
      const filterInput = wrapper.find('.yh-transfer-panel__filter-input')
      await filterInput.setValue('BJ')
      await nextTick()

      expect(filterMethod).toHaveBeenCalled()
    })
  })

  // 尺寸
  describe('尺寸', () => {
    it.each(['large', 'default', 'small'] as const)('应该支持 %s 尺寸', (size) => {
      const wrapper = mount(Transfer, {
        props: {
          data: generateData(),
          modelValue: [],
          size
        }
      })

      expect(wrapper.find('.yh-transfer').classes()).toContain(`yh-transfer--${size}`)
    })
  })

  // 禁用状态
  describe('禁用状态', () => {
    it('应该正确应用禁用状态', () => {
      const wrapper = mount(Transfer, {
        props: {
          data: generateData(),
          modelValue: [],
          disabled: true
        }
      })

      expect(wrapper.find('.yh-transfer').classes()).toContain('is-disabled')
    })

    it('禁用状态下按钮应该不可点击', async () => {
      const onChange = vi.fn()
      const wrapper = mount(Transfer, {
        props: {
          data: generateData(),
          modelValue: [],
          disabled: true,
          onChange
        }
      })

      const buttons = wrapper.findAll('.yh-transfer__button')
      await buttons[0].trigger('click')

      expect(onChange).not.toHaveBeenCalled()
    })
  })

  // 目标顺序
  describe('目标顺序', () => {
    it('应该支持 original 顺序', async () => {
      const wrapper = mount(Transfer, {
        props: {
          data: generateData(10),
          modelValue: [5, 1, 3],
          targetOrder: 'original'
        }
      })

      const rightPanel = wrapper.findAllComponents(TransferPanel)[1]
      const rightData = rightPanel?.props('data') as TransferData[] | undefined

      // original 模式应该按原始数据顺序排列
      expect(rightData?.[0]?.key).toBe(1)
      expect(rightData?.[1]?.key).toBe(3)
      expect(rightData?.[2]?.key).toBe(5)
    })

    it('应该支持 push 顺序', async () => {
      const wrapper = mount(Transfer, {
        props: {
          data: generateData(10),
          modelValue: [5, 1, 3],
          targetOrder: 'push'
        }
      })

      const rightPanel = wrapper.findAllComponents(TransferPanel)[1]
      const rightData = rightPanel?.props('data') as TransferData[] | undefined

      // push 模式应该按 modelValue 顺序排列
      expect(rightData?.[0]?.key).toBe(5)
      expect(rightData?.[1]?.key).toBe(1)
      expect(rightData?.[2]?.key).toBe(3)
    })
  })

  // 空状态
  describe('空状态', () => {
    it('应该显示默认空状态文本', () => {
      const wrapper = mount(Transfer, {
        props: {
          data: [],
          modelValue: []
        }
      })

      const emptyTexts = wrapper.findAll('.yh-transfer-panel__empty-text')
      expect(emptyTexts.length).toBe(2)
      expect(emptyTexts[0].text()).toBe('无数据')
    })

    it('应该支持自定义空状态文本', () => {
      const wrapper = mount(Transfer, {
        props: {
          data: [],
          modelValue: [],
          leftEmptyText: '左侧无数据',
          rightEmptyText: '右侧无数据'
        }
      })

      const emptyTexts = wrapper.findAll('.yh-transfer-panel__empty-text')
      expect(emptyTexts[0].text()).toBe('左侧无数据')
      expect(emptyTexts[1].text()).toBe('右侧无数据')
    })
  })

  // 选中状态变化事件
  describe('选中状态变化事件', () => {
    it('应该触发 left-check-change 事件', async () => {
      const onLeftCheckChange = vi.fn()
      const wrapper = mount(Transfer, {
        props: {
          data: generateData(5),
          modelValue: [],
          'onLeft-check-change': onLeftCheckChange
        }
      })

      // 点击左侧第一项
      const items = wrapper.findAll('.yh-transfer-panel__item')
      await items[0].trigger('click')

      expect(onLeftCheckChange).toHaveBeenCalled()
    })

    it('应该触发 right-check-change 事件', async () => {
      const onRightCheckChange = vi.fn()
      const wrapper = mount(Transfer, {
        props: {
          data: generateData(5),
          modelValue: [1, 2],
          'onRight-check-change': onRightCheckChange
        }
      })

      // 找到右侧面板的第一项
      const panels = wrapper.findAllComponents(TransferPanel)
      const rightItems = panels[1].findAll('.yh-transfer-panel__item')
      await rightItems[0].trigger('click')

      expect(onRightCheckChange).toHaveBeenCalled()
    })
  })

  // 全选功能
  describe('全选功能', () => {
    it('点击全选应该选中所有可选项', async () => {
      const wrapper = mount(Transfer, {
        props: {
          data: generateData(5),
          modelValue: []
        }
      })

      // 点击左侧全选
      const checkAll = wrapper.find('.yh-transfer-panel__check-all')
      await checkAll.trigger('click')
      await nextTick()

      // 验证全选状态
      const leftItems = wrapper.findAll('.yh-transfer-panel__item')
      const checkedItems = leftItems.filter((item) => item.classes().includes('is-checked'))
      // 5 项中有 1 项禁用（第 5 项），所以应该有 4 项被选中
      expect(checkedItems.length).toBe(4)
    })
  })

  // 按钮文案
  describe('按钮文案', () => {
    it('应该正确显示自定义按钮文案', () => {
      const wrapper = mount(Transfer, {
        props: {
          data: generateData(),
          modelValue: [],
          buttonTexts: ['移到右边', '移到左边']
        }
      })

      const buttonTexts = wrapper.findAll('.yh-transfer__button__text')
      expect(buttonTexts[0].text()).toBe('移到右边')
      expect(buttonTexts[1].text()).toBe('移到左边')
    })
  })

  // 初始选中
  describe('初始选中', () => {
    it('应该支持左侧默认选中项', () => {
      const wrapper = mount(Transfer, {
        props: {
          data: generateData(10),
          modelValue: [],
          leftDefaultChecked: [1, 2]
        }
      })

      const leftItems = wrapper.findAll('.yh-transfer-panel__item')
      expect(leftItems[0].classes()).toContain('is-checked')
      expect(leftItems[1].classes()).toContain('is-checked')
    })

    it('应该支持右侧默认选中项', () => {
      const wrapper = mount(Transfer, {
        props: {
          data: generateData(10),
          modelValue: [1, 2, 3],
          rightDefaultChecked: [1]
        }
      })

      const panels = wrapper.findAllComponents(TransferPanel)
      const rightItems = panels[1].findAll('.yh-transfer-panel__item')
      expect(rightItems[0].classes()).toContain('is-checked')
    })
  })
})

// TransferPanel 组件测试
describe('TransferPanel', () => {
  it('应该正确渲染面板', () => {
    const wrapper = mount(TransferPanel, {
      props: {
        data: generateData(5),
        checked: [],
        title: '测试面板'
      }
    })

    expect(wrapper.find('.yh-transfer-panel').exists()).toBe(true)
    expect(wrapper.find('.yh-transfer-panel__title').text()).toContain('测试面板')
  })

  it('应该正确显示统计信息', () => {
    const wrapper = mount(TransferPanel, {
      props: {
        data: generateData(10),
        checked: [1, 2, 3]
      }
    })

    const count = wrapper.find('.yh-transfer-panel__count')
    expect(count.text()).toContain('3/10')
  })

  it('虚拟滚动应该正确渲染', () => {
    const wrapper = mount(TransferPanel, {
      props: {
        data: generateData(100),
        checked: [],
        virtual: true,
        itemHeight: 40,
        height: 280
      }
    })

    expect(wrapper.find('.yh-transfer-panel__virtual-wrapper').exists()).toBe(true)
    // 虚拟滚动应该只渲染部分项
    const items = wrapper.findAll('.yh-transfer-panel__item')
    expect(items.length).toBeLessThan(100)
  })
})
