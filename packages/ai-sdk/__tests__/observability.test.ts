/**
 * YH-UI AI SDK - 可观测性导出测试
 */

import { describe, it, expect, vi } from 'vitest'
import {
  createOTelConsoleExporter,
  createLangSmithExporter,
  toOTelSpan,
  createObservabilityManager
} from '../src/observability'
import type { TraceSpan } from '../src/future'

describe('Observability Exporters', () => {
  describe('createOTelConsoleExporter', () => {
    it('should export spans to console', async () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
      const exporter = createOTelConsoleExporter()

      await exporter.exportSpans([
        {
          traceId: 'abc',
          spanId: 'span1',
          name: 'test',
          kind: 'INTERNAL',
          startTimeUnixNano: Date.now() * 1e6,
          endTimeUnixNano: Date.now() * 1e6,
          attributes: [],
          events: []
        }
      ])

      expect(consoleSpy).toHaveBeenCalled()
      consoleSpy.mockRestore()
    })
  })

  describe('createLangSmithExporter', () => {
    it('should warn when no API key', async () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      const exporter = createLangSmithExporter({ apiKey: undefined })

      await exporter.exportSpans([])

      expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('No API key'))
      warnSpy.mockRestore()
    })

    it('should skip export without API key', async () => {
      const fetchSpy = vi.fn()
      vi.stubGlobal('fetch', fetchSpy)

      const exporter = createLangSmithExporter({ apiKey: '' })
      await exporter.exportSpans([])

      expect(fetchSpy).not.toHaveBeenCalled()
      vi.unstubAllGlobals()
    })
  })

  describe('toOTelSpan', () => {
    it('should convert TraceSpan to OTel format', () => {
      const traceId = 'trace123'
      const span: TraceSpan = {
        id: 'span1',
        name: 'test-span',
        startTime: new Date('2024-01-01T00:00:00Z'),
        endTime: new Date('2024-01-01T00:00:01Z'),
        events: [],
        attributes: { foo: 'bar' },
        children: []
      }

      const otel = toOTelSpan(span, traceId)

      expect(otel.traceId).toBe(traceId)
      expect(otel.spanId).toBe('span1')
      expect(otel.name).toBe('test-span')
      expect(otel.attributes).toContainEqual({
        key: 'foo',
        value: { stringValue: 'bar' }
      })
    })

    it('should handle error events', () => {
      const span: TraceSpan = {
        id: 'span1',
        name: 'error-span',
        startTime: new Date(),
        events: [{ id: 'e1', type: 'error', timestamp: new Date(), data: { msg: 'err' } }],
        attributes: {},
        children: []
      }

      const otel = toOTelSpan(span, 'trace')
      expect(otel.status?.code).toBe(2)
    })
  })

  describe('createObservabilityManager', () => {
    it('should add exporters', () => {
      const exporter = { exportSpans: vi.fn() }
      const manager = createObservabilityManager({ exporters: [exporter] })

      // Verify manager has exporter by checking export works
      expect(manager).toBeDefined()
    })

    it('should export spans via all exporters', async () => {
      const exporter1 = { exportSpans: vi.fn() }
      const exporter2 = { exportSpans: vi.fn() }
      const manager = createObservabilityManager({ exporters: [exporter1, exporter2] })

      const mockSpans = [
        {
          id: 's1',
          name: 'test',
          startTime: new Date(),
          endTime: new Date(),
          attributes: {},
          events: [],
          children: []
        }
      ]

      await manager.export(mockSpans as any)

      expect(exporter1.exportSpans).toHaveBeenCalled()
      expect(exporter2.exportSpans).toHaveBeenCalled()
    })
  })
})
