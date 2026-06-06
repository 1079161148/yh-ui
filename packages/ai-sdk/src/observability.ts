/**
 * YH-UI AI SDK - 可观测性导出
 *
 * 支持 OpenTelemetry JSON 导出与 LangSmith 风格遥测。
 */

import type { TraceSpan, TraceEvent } from './future'

/** OpenTelemetry Span 类型（兼容 OTLP） */
export interface OTelSpan {
  traceId: string
  spanId: string
  parentSpanId?: string
  name: string
  kind: 'INTERNAL' | 'SERVER' | 'CLIENT' | 'PRODUCER' | 'CONSUMER'
  startTimeUnixNano: number
  endTimeUnixNano?: number
  status?: { code: 0 | 1 | 2; message?: string }
  attributes: Array<{
    key: string
    value: { stringValue?: string; intValue?: number; boolValue?: boolean }
  }>
  events?: Array<{
    timeUnixNano: number
    name: string
    attributes?: Array<{ key: string; value: { stringValue?: string } }>
  }>
}

/** OpenTelemetry Resource */
export interface OTelResource {
  attributes: Array<{ key: string; value: { stringValue?: string } }>
}

/** OpenTelemetry Export Payload */
export interface OTelExportPayload {
  resourceSpans: Array<{
    resource: OTelResource
    scopeSpans: Array<{ spans: OTelSpan[] }>
  }>
}

/** LangSmith run 类型 */
export type LangSmithRunType = 'llm' | 'chain' | 'tool' | 'retriever'

/** LangSmith 遥测数据 */
export interface LangSmithRun {
  id: string
  name: string
  run_type: LangSmithRunType
  start_time: number
  end_time?: number
  inputs: Record<string, unknown>
  outputs?: Record<string, unknown>
  error?: string
  parent_run_id?: string
  tags?: string[]
  metadata?: Record<string, unknown>
}

/** LangSmith 客户端配置 */
export interface LangSmithClientConfig {
  apiUrl?: string
  apiKey?: string
  projectName?: string
}

/** 导出器接口 */
export interface TraceExporter {
  /** 导出 spans */
  exportSpans(spans: OTelSpan[]): Promise<void>
  /** 导出事件 */
  exportEvents?(events: TraceEvent[]): Promise<void>
}

/**
 * OpenTelemetry JSON Console Exporter（开发调试用）
 */
export function createOTelConsoleExporter(): TraceExporter {
  return {
    async exportSpans(spans: OTelSpan[]) {
      const payload: OTelExportPayload = {
        resourceSpans: [
          {
            resource: {
              attributes: [{ key: 'service.name', value: { stringValue: 'yh-ai-sdk' } }]
            },
            scopeSpans: [{ spans }]
          }
        ]
      }
      console.log('[OTel Export]', JSON.stringify(payload, null, 2))
    }
  }
}

/**
 * LangSmith Exporter（可对接官方 API）
 */
export function createLangSmithExporter(config: LangSmithClientConfig): TraceExporter {
  const { apiUrl = 'https://api.langsmith.com/v1/runs', apiKey, projectName = 'yh-ai-sdk' } = config

  return {
    async exportSpans(spans: OTelSpan[]) {
      if (!apiKey) {
        console.warn('[LangSmith] No API key configured, skipping export')
        return
      }

      const runs: LangSmithRun[] = spans.map((span) => {
        const inputs: Record<string, unknown> = {}
        const outputs: Record<string, unknown> = {}
        let runType: LangSmithRunType = 'chain'

        for (const attr of span.attributes) {
          const key = attr.key
          const val = attr.value.stringValue ?? attr.value.intValue ?? attr.value.boolValue
          if (key.startsWith('input.')) {
            inputs[key.slice(6)] = val
          } else if (key.startsWith('output.')) {
            outputs[key.slice(7)] = val
          } else if (key === 'run_type') {
            runType = val as LangSmithRunType
          }
        }

        return {
          id: span.spanId,
          name: span.name,
          run_type: runType,
          start_time: span.startTimeUnixNano / 1e6,
          end_time: span.endTimeUnixNano ? span.endTimeUnixNano / 1e6 : Date.now(),
          inputs,
          outputs: Object.keys(outputs).length ? outputs : undefined,
          error: span.status?.code === 2 ? span.status.message : undefined,
          parent_run_id: span.parentSpanId,
          metadata: { project: projectName }
        }
      })

      try {
        await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`
          },
          body: JSON.stringify({ runs })
        })
      } catch (err) {
        console.error('[LangSmith] Export failed:', err)
      }
    }
  }
}

/**
 * 将 internal TraceSpan 转换为 OTelSpan
 */
export function toOTelSpan(span: TraceSpan, traceId: string): OTelSpan {
  const startNs = span.startTime.getTime() * 1e6
  const endNs = span.endTime ? span.endTime.getTime() * 1e6 : Date.now() * 1e6

  const attrs = Object.entries(span.attributes).map(([key, value]) => ({
    key,
    value:
      typeof value === 'string'
        ? { stringValue: value }
        : typeof value === 'number'
          ? { intValue: value }
          : { boolValue: Boolean(value) }
  }))

  const events = span.events.map((e) => ({
    timeUnixNano: e.timestamp.getTime() * 1e6,
    name: e.type,
    attributes: Object.entries(e.data).map(([k, v]) => ({
      key: k,
      value: { stringValue: String(v) }
    }))
  }))

  return {
    traceId,
    spanId: span.id,
    name: span.name,
    kind: 'INTERNAL',
    startTimeUnixNano: startNs,
    endTimeUnixNano: endNs,
    status: span.events.some((e) => e.type === 'error')
      ? { code: 2, message: 'Error occurred' }
      : { code: 0 },
    attributes: attrs,
    events
  }
}

/**
 * 创建可观测性管理器（整合 tracer + exporter）
 */
export interface ObservabilityManager {
  /** 添加导出器 */
  addExporter(exporter: TraceExporter): void
  /** 刷新所有导出器 */
  flush(): Promise<void>
  /** 收集并导出当前 trace */
  export(tracerSpans: TraceSpan[]): Promise<void>
}

export function createObservabilityManager(config?: {
  exporters?: TraceExporter[]
  traceId?: string
}): ObservabilityManager {
  const exporters: TraceExporter[] = config?.exporters || []
  const traceId = config?.traceId || Math.random().toString(16).slice(2).padStart(32, '0')

  return {
    addExporter(exporter: TraceExporter) {
      exporters.push(exporter)
    },

    async flush() {
      await Promise.all(
        exporters.map(async (ex) => {
          if (
            'flush' in ex &&
            typeof (ex as { flush?: () => Promise<void> }).flush === 'function'
          ) {
            await (ex as { flush: () => Promise<void> }).flush()
          }
        })
      )
    },

    async export(tracerSpans: TraceSpan[]) {
      const otelSpans = tracerSpans.map((s) => toOTelSpan(s, traceId))
      await Promise.all(exporters.map((ex) => ex.exportSpans(otelSpans)))
    }
  }
}
