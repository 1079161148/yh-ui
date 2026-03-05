import { describe, it, expect } from 'vitest'
import { ref, nextTick } from 'vue'
import { useVirtualScroll } from '../index'

describe('useVirtualScroll', () => {
  const defaultOptions = {
    itemHeight: 50,
    containerHeight: 300,
    items: Array.from({ length: 100 }, (_, i) => ({ id: i, name: `Item ${i}` })),
    overscan: 2
  }

  it('should initialize correctly', () => {
    const { totalHeight, visibleItems, startIndex, endIndex } = useVirtualScroll(defaultOptions)

    expect(totalHeight.value).toBe(5000) // 100 * 50
    // visible = ceil(300 / 50) = 6. start = 0 - 2 = 0. end = 0 + 6 + 2 = 8
    expect(startIndex.value).toBe(0)
    expect(endIndex.value).toBe(8)
    expect(visibleItems.value.length).toBe(8)
  })

  it('should update on scroll', async () => {
    const { onScroll, startIndex, endIndex, visibleItems, offsetY } =
      useVirtualScroll(defaultOptions)

    // Mock scroll event
    const scrollEvent = {
      target: {
        scrollTop: 500
      }
    } as unknown as Event

    onScroll(scrollEvent)

    // scrollTop = 500. start = floor(500/50) = 10. with overscan 2 -> 8
    // visible = 6. end = 10 + 6 + 2 = 18
    expect(startIndex.value).toBe(8)
    expect(endIndex.value).toBe(18)
    expect(offsetY.value).toBe(8 * 50) // 400
    expect(visibleItems.value[0]).toEqual({ id: 8, name: 'Item 8' })
  })

  it('should handle scrollToIndex', async () => {
    const { scrollToIndex, startIndex, containerRef } = useVirtualScroll(defaultOptions)

    const mockContainer = {
      scrollTop: 0
    } as HTMLElement
    containerRef.value = mockContainer

    scrollToIndex(20)

    expect(mockContainer.scrollTop).toBe(1000) // 20 * 50
    // start = floor(1000/50) = 20. with overscan 2 -> 18
    expect(startIndex.value).toBe(18)
  })

  it('should handle empty items', () => {
    const { visibleItems, totalHeight } = useVirtualScroll({
      ...defaultOptions,
      items: []
    })

    expect(totalHeight.value).toBe(0)
    expect(visibleItems.value).toEqual([])
  })

  it('should support reactive items', async () => {
    const items = ref([{ id: 1 }])
    const { totalHeight } = useVirtualScroll({
      ...defaultOptions,
      items
    })

    expect(totalHeight.value).toBe(50)
    items.value = [{ id: 1 }, { id: 2 }]
    await nextTick()
    expect(totalHeight.value).toBe(100)
  })
})
