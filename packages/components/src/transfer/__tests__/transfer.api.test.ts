import { h, ref } from 'vue'
import { describe, expect, it } from 'vitest'
import { transferPanelContextKey, transferSizes } from '../src/transfer'
import type {
  TransferData,
  TransferFilterMethod,
  TransferPanelContext,
  TransferRenderContent
} from '../src/transfer'

describe('transfer runtime API', () => {
  it('exposes supported sizes as a stable runtime tuple', () => {
    expect(transferSizes).toEqual(['large', 'default', 'small'])
  })

  it('uses a symbol injection key for panel context', () => {
    expect(typeof transferPanelContextKey).toBe('symbol')
    expect(String(transferPanelContextKey)).toContain('transferPanelContextKey')
  })

  it('supports custom filter and render callbacks against transfer data', () => {
    const item: TransferData = {
      key: 'a',
      label: 'Alpha',
      disabled: false,
      group: 'letters'
    }

    const filterMethod: TransferFilterMethod = (query, data) =>
      data.label.toLowerCase().includes(query.toLowerCase()) || data.group === query
    const renderContent: TransferRenderContent = (createElement, data) =>
      createElement('strong', data.label)

    expect(filterMethod('alp', item)).toBe(true)
    expect(filterMethod('letters', item)).toBe(true)
    expect(filterMethod('beta', item)).toBe(false)

    const vnode = renderContent(h, item)
    expect(vnode).toMatchObject({ type: 'strong' })
  })

  it('models the panel context contract used by transfer panels', () => {
    const checked: Array<string | number> = []
    const context: TransferPanelContext = {
      props: {
        data: [{ key: 1, label: 'One' }],
        checked,
        title: 'Source'
      },
      checked,
      handleCheck(key, isChecked) {
        if (isChecked) {
          checked.push(key)
        }
      }
    }

    context.handleCheck(1, true)

    expect(context.checked).toEqual([1])
    expect(ref(context.props.title).value).toBe('Source')
  })
})
