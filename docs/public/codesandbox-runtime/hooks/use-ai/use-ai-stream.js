var __defProp = Object.defineProperty
var __knownSymbol = (name, symbol) =>
  (symbol = Symbol[name]) ? symbol : Symbol.for('Symbol.' + name)
var __defNormalProp = (obj, key, value) =>
  key in obj
    ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value })
    : (obj[key] = value)
var __publicField = (obj, key, value) =>
  __defNormalProp(obj, typeof key !== 'symbol' ? key + '' : key, value)
var __forAwait = (obj, it, method) =>
  (it = obj[__knownSymbol('asyncIterator')])
    ? it.call(obj)
    : ((obj = obj[__knownSymbol('iterator')]()),
      (it = {}),
      (method = (key, fn) =>
        (fn = obj[key]) &&
        (it[key] = (arg) =>
          new Promise(
            (yes, no, done) => (
              (arg = fn.call(obj, arg)),
              (done = arg.done),
              Promise.resolve(arg.value).then((value) => yes({ value, done }), no)
            )
          ))),
      method('next'),
      method('return'),
      it)
import { ref } from 'vue'
const openaiParser = (raw) => {
  var _a, _b, _c
  const lines = raw.split('\n')
  let text = ''
  for (const line of lines) {
    if (!line.startsWith('data: ')) continue
    const data = line.slice(6).trim()
    if (data === '[DONE]') break
    try {
      const json = JSON.parse(data)
      const delta =
        (_c =
          (_b = (_a = json == null ? void 0 : json.choices) == null ? void 0 : _a[0]) == null
            ? void 0
            : _b.delta) == null
          ? void 0
          : _c.content
      if (delta) text += delta
    } catch (e) {}
  }
  return text || null
}
const ernieParser = (raw) => {
  const lines = raw.split('\n')
  let text = ''
  for (const line of lines) {
    if (!line.startsWith('data: ')) continue
    const data = line.slice(6).trim()
    try {
      const json = JSON.parse(data)
      if (json == null ? void 0 : json.result) text += json.result
    } catch (e) {}
  }
  return text || null
}
const qwenParser = (raw) => {
  var _a
  const lines = raw.split('\n')
  let text = ''
  for (const line of lines) {
    if (!line.startsWith('data: ')) continue
    const data = line.slice(6).trim()
    try {
      const json = JSON.parse(data)
      const t = (_a = json == null ? void 0 : json.output) == null ? void 0 : _a.text
      if (t) text += t
    } catch (e) {}
  }
  return text || null
}
const claudeParser = (raw) => {
  var _a
  const lines = raw.split('\n')
  let text = ''
  for (const line of lines) {
    if (!line.startsWith('data: ')) continue
    const data = line.slice(6).trim()
    try {
      const json = JSON.parse(data)
      if (
        (json == null ? void 0 : json.type) === 'content_block_delta' &&
        ((_a = json == null ? void 0 : json.delta) == null ? void 0 : _a.text)
      ) {
        text += json.delta.text
      }
    } catch (e) {}
  }
  return text || null
}
const geminiParser = (raw) => {
  var _a, _b, _c, _d, _e
  const lines = raw.split('\n')
  let text = ''
  for (const line of lines) {
    const content = line.startsWith('data: ') ? line.slice(6).trim() : line.trim()
    if (!content) continue
    try {
      const json = JSON.parse(content)
      const part =
        (_e =
          (_d =
            (_c =
              (_b = (_a = json == null ? void 0 : json.candidates) == null ? void 0 : _a[0]) == null
                ? void 0
                : _b.content) == null
              ? void 0
              : _c.parts) == null
            ? void 0
            : _d[0]) == null
          ? void 0
          : _e.text
      if (part) text += part
    } catch (e) {}
  }
  return text || null
}
const plainTextParser = (raw) => raw || null
class TypewriterThrottle {
  constructor(onUpdate, charsPerFrame = 3) {
    __publicField(this, 'queue', [])
    __publicField(this, 'rafId', null)
    __publicField(this, 'onUpdate')
    __publicField(this, 'charsPerFrame')
    this.onUpdate = onUpdate
    this.charsPerFrame = charsPerFrame
  }
  push(text) {
    this.queue.push(...text.split(''))
    if (this.rafId === null) {
      this.schedule()
    }
  }
  schedule() {
    this.rafId = requestAnimationFrame(() => {
      this.rafId = null
      if (this.queue.length === 0) return
      const batch = this.queue.splice(0, this.charsPerFrame).join('')
      this.onUpdate(batch)
      if (this.queue.length > 0) {
        this.schedule()
      }
    })
  }
  flush() {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId)
      this.rafId = null
    }
    if (this.queue.length > 0) {
      const remaining = this.queue.splice(0).join('')
      this.onUpdate(remaining)
    }
  }
  cancel() {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId)
      this.rafId = null
    }
    this.queue = []
  }
}
function useAiStream(options) {
  var _a, _b
  const isStreaming = ref(false)
  const currentContent = ref('')
  let abortController = new AbortController()
  let typewriter = null
  const parser = (_a = options.parser) != null ? _a : plainTextParser
  const enableTypewriter = options.typewriter !== false
  const charsPerFrame = (_b = options.charsPerFrame) != null ? _b : 3
  const stop = () => {
    if (isStreaming.value) {
      abortController.abort()
      isStreaming.value = false
      typewriter == null ? void 0 : typewriter.flush()
    }
  }
  const fetchStream = async (query, ...args) => {
    var _a2, _b2
    isStreaming.value = true
    currentContent.value = ''
    abortController = new AbortController()
    if (enableTypewriter) {
      typewriter = new TypewriterThrottle((chunk) => {
        var _a3
        currentContent.value += chunk
        ;(_a3 = options.onUpdate) == null ? void 0 : _a3.call(options, chunk, currentContent.value)
      }, charsPerFrame)
    }
    const pushText = (text) => {
      var _a3
      if (!text) return
      if (enableTypewriter && typewriter) {
        typewriter.push(text)
      } else {
        currentContent.value += text
        ;(_a3 = options.onUpdate) == null ? void 0 : _a3.call(options, text, currentContent.value)
      }
    }
    try {
      const response = await options.request(query, ...args)
      if (typeof response === 'object' && response !== null && Symbol.asyncIterator in response) {
        try {
          for (
            var iter = __forAwait(response), more, temp, error;
            (more = !(temp = await iter.next()).done);
            more = false
          ) {
            const chunk = temp.value
            if (abortController.signal.aborted) break
            const parsed = parser(chunk)
            if (parsed !== null) pushText(parsed)
          }
        } catch (temp) {
          error = [temp]
        } finally {
          try {
            more && (temp = iter.return) && (await temp.call(iter))
          } finally {
            if (error) throw error[0]
          }
        }
      } else if (response instanceof Response && response.body) {
        const reader = response.body.getReader()
        const decoder = new TextDecoder('utf-8')
        while (true) {
          if (abortController.signal.aborted) {
            reader.cancel()
            break
          }
          const { done, value } = await reader.read()
          if (done) break
          const chunkStr = decoder.decode(value, { stream: true })
          const parsed = parser(chunkStr)
          if (parsed !== null) pushText(parsed)
        }
      }
      if (!abortController.signal.aborted) {
        if (enableTypewriter && typewriter) {
          typewriter.flush()
        }
        isStreaming.value = false
        ;(_a2 = options.onFinish) == null ? void 0 : _a2.call(options, currentContent.value)
      }
    } catch (e) {
      if (e.name !== 'AbortError') {
        ;(_b2 = options.onError) == null ? void 0 : _b2.call(options, e)
      }
      typewriter == null ? void 0 : typewriter.cancel()
      isStreaming.value = false
    }
  }
  return {
    isStreaming,
    currentContent,
    fetchStream,
    stop,
    // 暴露解析器供测试/自定义使用
    parsers: {
      openaiParser,
      ernieParser,
      qwenParser,
      claudeParser,
      geminiParser,
      plainTextParser
    }
  }
}
const __test__ = {
  TypewriterThrottle
}
export {
  __test__,
  claudeParser,
  ernieParser,
  geminiParser,
  openaiParser,
  plainTextParser,
  qwenParser,
  useAiStream
}
