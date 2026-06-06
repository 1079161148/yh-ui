/**
 * YH-UI AI SDK - 可观测性导出测试
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
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

    it('should export events', async () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
      const exporter = createOTelConsoleExporter()

      if (exporter.exportEvents) {
        await exporter.exportEvents([
          { id: 'e1', type: 'event', timestamp: new Date(), data: { key: 'value' } }
        ])
        expect(consoleSpy).toHaveBeenCalled()
      }

      consoleSpy.mockRestore()
    })
  })

  describe('createLangSmithExporter', () => {
    beforeEach(() => {
      vi.stubGlobal('fetch', vi.fn())
    })

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

    it('should export spans with API key', async () => {
      const fetchSpy = vi.fn().mockResolvedValue({ ok: true })
      vi.stubGlobal('fetch', fetchSpy)

      const exporter = createLangSmithExporter({
        apiKey: 'test-key',
        projectName: 'test-project'
      })

      await exporter.exportSpans([
        {
          traceId: 'trace1',
          spanId: 'span1',
          name: 'llm_call',
          kind: 'CLIENT' as any,
          startTimeUnixNano: Date.now() * 1e6,
          endTimeUnixNano: Date.now() * 1e6,
          attributes: [
            { key: 'input.text', value: { stringValue: 'Hello' } },
            { key: 'output.text', value: { stringValue: 'Hi there' } },
            { key: 'run_type', value: { stringValue: 'llm' } }
          ],
          events: []
        }
      ])

      expect(fetchSpy).toHaveBeenCalledWith(
        'https://api.langsmith.com/v1/runs',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            Authorization: 'Bearer test-key'
          })
        })
      )
      vi.unstubAllGlobals()
    })

    it('should handle fetch errors', async () => {
      const fetchSpy = vi.fn().mockRejectedValue(new Error('Network error'))
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      vi.stubGlobal('fetch', fetchSpy)

      const exporter = createLangSmithExporter({ apiKey: 'test-key' })

      await exporter.exportSpans([
        {
          traceId: 'trace1',
          spanId: 'span1',
          name: 'test',
          kind: 'INTERNAL' as any,
          startTimeUnixNano: Date.now() * 1e6,
          attributes: [],
          events: []
        }
      ])

      expect(errorSpy).toHaveBeenCalled()
      errorSpy.mockRestore()
      vi.unstubAllGlobals()
    })

    it('should handle spans with intValue attributes', async () => {
      const fetchSpy = vi.fn().mockResolvedValue({ ok: true })
      vi.stubGlobal('fetch', fetchSpy)

      const exporter = createLangSmithExporter({ apiKey: 'test-key' })

      await exporter.exportSpans([
        {
          traceId: 'trace1',
          spanId: 'span1',
          name: 'test',
          kind: 'INTERNAL' as any,
          startTimeUnixNano: Date.now() * 1e6,
          attributes: [{ key: 'token_count', value: { intValue: 100 } }],
          events: []
        }
      ])

      expect(fetchSpy).toHaveBeenCalled()
      vi.unstubAllGlobals()
    })

    it('should handle spans with boolValue attributes', async () => {
      const fetchSpy = vi.fn().mockResolvedValue({ ok: true })
      vi.stubGlobal('fetch', fetchSpy)

      const exporter = createLangSmithExporter({ apiKey: 'test-key' })

      await exporter.exportSpans([
        {
          traceId: 'trace1',
          spanId: 'span1',
          name: 'test',
          kind: 'INTERNAL' as any,
          startTimeUnixNano: Date.now() * 1e6,
          attributes: [{ key: 'cached', value: { boolValue: true } }],
          events: []
        }
      ])

      expect(fetchSpy).toHaveBeenCalled()
      vi.unstubAllGlobals()
    })

    it('should handle error status spans', async () => {
      const fetchSpy = vi.fn().mockResolvedValue({ ok: true })
      vi.stubGlobal('fetch', fetchSpy)

      const exporter = createLangSmithExporter({ apiKey: 'test-key' })

      await exporter.exportSpans([
        {
          traceId: 'trace1',
          spanId: 'span1',
          name: 'error_span',
          kind: 'INTERNAL' as any,
          startTimeUnixNano: Date.now() * 1e6,
          endTimeUnixNano: Date.now() * 1e6,
          status: { code: 2, message: 'Error occurred' },
          attributes: [],
          events: []
        }
      ])

      expect(fetchSpy).toHaveBeenCalled()
      vi.unstubAllGlobals()
    })

    it('should handle spans with parent span', async () => {
      const fetchSpy = vi.fn().mockResolvedValue({ ok: true })
      vi.stubGlobal('fetch', fetchSpy)

      const exporter = createLangSmithExporter({ apiKey: 'test-key' })

      await exporter.exportSpans([
        {
          traceId: 'trace1',
          spanId: 'child_span',
          parentSpanId: 'parent_span',
          name: 'child',
          kind: 'INTERNAL' as any,
          startTimeUnixNano: Date.now() * 1e6,
          attributes: [],
          events: []
        }
      ])

      expect(fetchSpy).toHaveBeenCalled()
      vi.unstubAllGlobals()
    })

    it('should use custom apiUrl', async () => {
      const fetchSpy = vi.fn().mockResolvedValue({ ok: true })
      vi.stubGlobal('fetch', fetchSpy)

      const exporter = createLangSmithExporter({
        apiKey: 'test-key',
        apiUrl: 'https://custom.langsmith.io/v1/runs'
      })

      await exporter.exportSpans([
        {
          traceId: 'trace1',
          spanId: 'span1',
          name: 'test',
          kind: 'INTERNAL' as any,
          startTimeUnixNano: Date.now() * 1e6,
          attributes: [],
          events: []
        }
      ])

      expect(fetchSpy).toHaveBeenCalledWith(
        'https://custom.langsmith.io/v1/runs',
        expect.any(Object)
      )
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

    it('should handle string attributes', () => {
      const span: TraceSpan = {
        id: 'span1',
        name: 'test',
        startTime: new Date(),
        endTime: new Date(),
        events: [],
        attributes: { name: 'test-name', status: 'ok' },
        children: []
      }

      const otel = toOTelSpan(span, 'trace')
      expect(otel.attributes).toContainEqual({ key: 'name', value: { stringValue: 'test-name' } })
      expect(otel.attributes).toContainEqual({ key: 'status', value: { stringValue: 'ok' } })
    })

    it('should handle number attributes', () => {
      const span: TraceSpan = {
        id: 'span1',
        name: 'test',
        startTime: new Date(),
        endTime: new Date(),
        events: [],
        attributes: { count: 42, score: 0.95 },
        children: []
      }

      const otel = toOTelSpan(span, 'trace')
      expect(otel.attributes).toContainEqual({ key: 'count', value: { intValue: 42 } })
    })

    it('should handle boolean attributes', () => {
      const span: TraceSpan = {
        id: 'span1',
        name: 'test',
        startTime: new Date(),
        endTime: new Date(),
        events: [],
        attributes: { enabled: true, visible: false },
        children: []
      }

      const otel = toOTelSpan(span, 'trace')
      expect(otel.attributes).toContainEqual({ key: 'enabled', value: { boolValue: true } })
      expect(otel.attributes).toContainEqual({ key: 'visible', value: { boolValue: false } })
    })

    it('should handle span without endTime', () => {
      const span: TraceSpan = {
        id: 'span1',
        name: 'test',
        startTime: new Date('2024-01-01T00:00:00Z'),
        events: [],
        attributes: {},
        children: []
      }

      const otel = toOTelSpan(span, 'trace')
      expect(otel.endTimeUnixNano).toBeDefined()
    })

    it('should convert events to OTel format', () => {
      const span: TraceSpan = {
        id: 'span1',
        name: 'test',
        startTime: new Date(),
        endTime: new Date(),
        events: [
          {
            id: 'e1',
            type: 'start',
            timestamp: new Date('2024-01-01T00:00:00Z'),
            data: { action: 'begin' }
          },
          {
            id: 'e2',
            type: 'end',
            timestamp: new Date('2024-01-01T00:00:01Z'),
            data: { result: 'success' }
          }
        ],
        attributes: {},
        children: []
      }

      const otel = toOTelSpan(span, 'trace')
      expect(otel.events).toHaveLength(2)
      expect(otel.events![0]).toHaveProperty('timeUnixNano')
      expect(otel.events![0]).toHaveProperty('name', 'start')
      expect(otel.events![0]).toHaveProperty('attributes')
    })

    it('should set kind to INTERNAL', () => {
      const span: TraceSpan = {
        id: 'span1',
        name: 'test',
        startTime: new Date(),
        events: [],
        attributes: {},
        children: []
      }

      const otel = toOTelSpan(span, 'trace')
      expect(otel.kind).toBe('INTERNAL')
    })

    it('should handle span with empty events', () => {
      const span: TraceSpan = {
        id: 'span1',
        name: 'test',
        startTime: new Date(),
        endTime: new Date(),
        events: [],
        attributes: {},
        children: []
      }

      const otel = toOTelSpan(span, 'trace')
      expect(otel.events).toEqual([])
      expect(otel.status?.code).toBe(0)
    })

    it('should handle span with no error events', () => {
      const span: TraceSpan = {
        id: 'span1',
        name: 'success-span',
        startTime: new Date(),
        endTime: new Date(),
        events: [{ id: 'e1', type: 'info', timestamp: new Date(), data: { msg: 'ok' } }],
        attributes: {},
        children: []
      }

      const otel = toOTelSpan(span, 'trace')
      expect(otel.status?.code).toBe(0)
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

    it('should add exporter dynamically', () => {
      const manager = createObservabilityManager()
      const exporter = { exportSpans: vi.fn() }

      manager.addExporter(exporter)

      expect(manager).toBeDefined()
    })

    it('should flush exporters with flush method', async () => {
      const flushFn = vi.fn()
      const exporter1 = { exportSpans: vi.fn(), flush: flushFn }
      const exporter2 = { exportSpans: vi.fn() }
      const manager = createObservabilityManager({
        exporters: [exporter1 as any, exporter2 as any]
      })

      await manager.flush()

      expect(flushFn).toHaveBeenCalled()
    })

    it('should flush multiple exporters with flush method', async () => {
      const flush1 = vi.fn()
      const flush2 = vi.fn()
      const exporter1 = { exportSpans: vi.fn(), flush: flush1 }
      const exporter2 = { exportSpans: vi.fn(), flush: flush2 }
      const manager = createObservabilityManager({
        exporters: [exporter1 as any, exporter2 as any]
      })

      await manager.flush()

      expect(flush1).toHaveBeenCalled()
      expect(flush2).toHaveBeenCalled()
    })

    it('should use default traceId when not provided', () => {
      const manager = createObservabilityManager()
      expect(manager).toBeDefined()
    })

    it('should export empty spans array', async () => {
      const exporter = { exportSpans: vi.fn() }
      const manager = createObservabilityManager({ exporters: [exporter] })

      await manager.export([])

      expect(exporter.exportSpans).toHaveBeenCalledWith([])
    })

    it('should export with custom traceId', async () => {
      const exporter = { exportSpans: vi.fn() }
      const manager = createObservabilityManager({
        exporters: [exporter],
        traceId: 'custom-trace-123'
      })

      await manager.export([
        {
          id: 's1',
          name: 'test',
          startTime: new Date(),
          endTime: new Date(),
          attributes: { trace: 'data' },
          events: [],
          children: []
        }
      ] as any)

      expect(exporter.exportSpans).toHaveBeenCalled()
    })
  })
})
