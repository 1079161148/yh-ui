var __knownSymbol = (name, symbol) =>
  (symbol = Symbol[name]) ? symbol : Symbol.for('Symbol.' + name)
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
import { ref, computed } from 'vue'
import { plainTextParser } from './use-ai-stream.js'
function createTypewriter(onChar, charsPerFrame) {
  const queue = []
  let rafId = null
  const schedule = () => {
    rafId = requestAnimationFrame(() => {
      rafId = null
      if (queue.length === 0) return
      const batch = queue.splice(0, charsPerFrame).join('')
      onChar(batch)
      if (queue.length > 0) schedule()
    })
  }
  return {
    push(text) {
      queue.push(...text.split(''))
      if (rafId === null) schedule()
    },
    flush() {
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
        rafId = null
      }
      if (queue.length > 0) {
        onChar(queue.splice(0).join(''))
      }
    },
    cancel() {
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
        rafId = null
      }
      queue.length = 0
    }
  }
}
function useAiChat(options = {}) {
  var _a
  const {
    idGenerator = () => Math.random().toString(36).substring(2, 9),
    parser = plainTextParser,
    typewriter: enableTypewriter = true,
    charsPerFrame = 3,
    systemPrompt
  } = options
  const messages = ref((_a = options.initialMessages) != null ? _a : [])
  const isGenerating = ref(false)
  const isSending = computed(() => isGenerating.value)
  let abortController = null
  const stop = () => {
    if (abortController && isGenerating.value) {
      abortController.abort()
      isGenerating.value = false
      const lastMsg = messages.value[messages.value.length - 1]
      if (
        (lastMsg == null ? void 0 : lastMsg.role) === 'assistant' &&
        lastMsg.status === 'generating'
      ) {
        lastMsg.status = 'stopped'
      }
    }
  }
  const clear = () => {
    stop()
    messages.value = []
  }
  const removeMessage = (id) => {
    const idx = messages.value.findIndex((m) => m.id === id)
    if (idx !== -1) messages.value.splice(idx, 1)
  }
  const updateMessage = (id, patch) => {
    const msg = messages.value.find((m) => m.id === id)
    if (msg) Object.assign(msg, patch)
  }
  const sendMessage = async (content) => {
    var _a2, _b
    if (!content.trim() || isGenerating.value) return
    messages.value.push({
      id: idGenerator(),
      role: 'user',
      content,
      createAt: Date.now(),
      status: 'success'
    })
    if (!options.request) return
    const assId = idGenerator()
    const assistantMsg = {
      id: assId,
      role: 'assistant',
      content: '',
      createAt: Date.now(),
      status: 'loading'
    }
    messages.value.push(assistantMsg)
    isGenerating.value = true
    abortController = new AbortController()
    const history = []
    if (systemPrompt) {
      history.push({
        id: 'system',
        role: 'system',
        content: systemPrompt,
        createAt: 0,
        status: 'success'
      })
    }
    history.push(...messages.value.slice(0, -2))
    try {
      const response = await options.request(content, history, abortController.signal)
      const targetMsg = messages.value.find((m) => m.id === assId)
      targetMsg.status = 'generating'
      let typewriterInstance = null
      if (enableTypewriter && typeof requestAnimationFrame !== 'undefined') {
        typewriterInstance = createTypewriter((chars) => {
          targetMsg.content += chars
        }, charsPerFrame)
      }
      const pushChunk = (text) => {
        if (!text) return
        if (typewriterInstance) {
          typewriterInstance.push(text)
        } else {
          targetMsg.content += text
        }
      }
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
            if (parsed) pushChunk(parsed)
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
          if (parsed) pushChunk(parsed)
        }
      } else if (typeof response === 'string') {
        pushChunk(response)
      }
      if (typewriterInstance) {
        typewriterInstance.flush()
      }
      if (!abortController.signal.aborted) {
        targetMsg.status = 'success'
        ;(_a2 = options.onFinish) == null ? void 0 : _a2.call(options, targetMsg)
      }
    } catch (e) {
      if (e.name !== 'AbortError') {
        const targetMsg = messages.value.find((m) => m.id === assId)
        if (targetMsg) targetMsg.status = 'error'
        ;(_b = options.onError) == null ? void 0 : _b.call(options, e)
      }
    } finally {
      if (isGenerating.value) {
        isGenerating.value = false
      }
    }
  }
  return {
    /** 会话历史 */
    messages,
    /** 是否正在生成（等同 isSending，别名友好） */
    isGenerating,
    /** 同 isGenerating，语义别名 */
    isSending,
    /** 触发发送（自动处理流、打字机） */
    sendMessage,
    /** 停止/中断当前生成 */
    stop,
    /** 移除单条消息 */
    removeMessage,
    /** 修改单条消息内容 */
    updateMessage,
    /** 重置清空所有会话 */
    clear
  }
}
export { useAiChat }
