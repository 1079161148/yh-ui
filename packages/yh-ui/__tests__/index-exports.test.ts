import { describe, expect, expectTypeOf, it } from 'vitest'
import {
  Grid,
  Loading,
  LoadingIcon,
  YhIcon,
  IconifyYhIcon,
  type AiChatMessage,
  type HookAiChatMessage,
  type HookSkuItem,
  type HookSkuSpec,
  type HookSkuSpecValue,
  type SkuItem,
  type SkuSpec,
  type SkuSpecValue
} from '../src/index'

describe('@yh-ui/yh-ui aggregate exports', () => {
  it('re-exports icon components from the main entry', () => {
    expect(Grid).toBeTruthy()
    expect(typeof Grid).toBe('object')
    expect(LoadingIcon).toBeTruthy()
    expect(Loading).toBeTruthy()
    expect(YhIcon).not.toBe(IconifyYhIcon)
  })

  it('keeps component types and hook aliases available without conflicts', () => {
    const hookMessage: HookAiChatMessage = {
      id: '1',
      role: 'assistant',
      content: 'hello',
      createAt: Date.now()
    }
    const componentMessage: AiChatMessage = hookMessage

    const hookSpecValue: HookSkuSpecValue = {
      id: 'red',
      name: 'Red'
    }
    const hookSpec: HookSkuSpec = {
      id: 'color',
      name: 'Color',
      values: [hookSpecValue]
    }
    const hookSku: HookSkuItem = {
      id: 'sku-1',
      specValueIds: ['red'],
      price: 99,
      stock: 10
    }

    const componentSpecValue: SkuSpecValue = hookSpecValue
    const componentSpec: SkuSpec = hookSpec
    const componentSku: SkuItem = hookSku

    expect(componentMessage.content).toBe('hello')
    expect(componentSpec.values[0]).toBe(componentSpecValue)
    expect(componentSku.stock).toBe(10)

    expectTypeOf<HookAiChatMessage>().toMatchTypeOf<AiChatMessage>()
    expectTypeOf<HookSkuSpecValue>().toMatchTypeOf<SkuSpecValue>()
    expectTypeOf<HookSkuSpec>().toMatchTypeOf<SkuSpec>()
    expectTypeOf<HookSkuItem>().toMatchTypeOf<SkuItem>()
  })
})
