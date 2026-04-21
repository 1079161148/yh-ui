import { ref } from "vue";
export const openaiParser = (raw) => {
  const lines = raw.split("\n");
  let text = "";
  for (const line of lines) {
    if (!line.startsWith("data: ")) continue;
    const data = line.slice(6).trim();
    if (data === "[DONE]") break;
    try {
      const json = JSON.parse(data);
      const delta = json?.choices?.[0]?.delta?.content;
      if (delta) text += delta;
    } catch {
    }
  }
  return text || null;
};
export const ernieParser = (raw) => {
  const lines = raw.split("\n");
  let text = "";
  for (const line of lines) {
    if (!line.startsWith("data: ")) continue;
    const data = line.slice(6).trim();
    try {
      const json = JSON.parse(data);
      if (json?.result) text += json.result;
    } catch {
    }
  }
  return text || null;
};
export const qwenParser = (raw) => {
  const lines = raw.split("\n");
  let text = "";
  for (const line of lines) {
    if (!line.startsWith("data: ")) continue;
    const data = line.slice(6).trim();
    try {
      const json = JSON.parse(data);
      const t = json?.output?.text;
      if (t) text += t;
    } catch {
    }
  }
  return text || null;
};
export const claudeParser = (raw) => {
  const lines = raw.split("\n");
  let text = "";
  for (const line of lines) {
    if (!line.startsWith("data: ")) continue;
    const data = line.slice(6).trim();
    try {
      const json = JSON.parse(data);
      if (json?.type === "content_block_delta" && json?.delta?.text) {
        text += json.delta.text;
      }
    } catch {
    }
  }
  return text || null;
};
export const geminiParser = (raw) => {
  const lines = raw.split("\n");
  let text = "";
  for (const line of lines) {
    const content = line.startsWith("data: ") ? line.slice(6).trim() : line.trim();
    if (!content) continue;
    try {
      const json = JSON.parse(content);
      const part = json?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (part) text += part;
    } catch {
    }
  }
  return text || null;
};
export const plainTextParser = (raw) => raw || null;
class TypewriterThrottle {
  queue = [];
  rafId = null;
  onUpdate;
  charsPerFrame;
  constructor(onUpdate, charsPerFrame = 3) {
    this.onUpdate = onUpdate;
    this.charsPerFrame = charsPerFrame;
  }
  push(text) {
    this.queue.push(...text.split(""));
    if (this.rafId === null) {
      this.schedule();
    }
  }
  schedule() {
    this.rafId = requestAnimationFrame(() => {
      this.rafId = null;
      if (this.queue.length === 0) return;
      const batch = this.queue.splice(0, this.charsPerFrame).join("");
      this.onUpdate(batch);
      if (this.queue.length > 0) {
        this.schedule();
      }
    });
  }
  flush() {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    if (this.queue.length > 0) {
      const remaining = this.queue.splice(0).join("");
      this.onUpdate(remaining);
    }
  }
  cancel() {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.queue = [];
  }
}
export function useAiStream(options) {
  const isStreaming = ref(false);
  const currentContent = ref("");
  let abortController = new AbortController();
  let typewriter = null;
  const parser = options.parser ?? plainTextParser;
  const enableTypewriter = options.typewriter !== false;
  const charsPerFrame = options.charsPerFrame ?? 3;
  const stop = () => {
    if (isStreaming.value) {
      abortController.abort();
      isStreaming.value = false;
      typewriter?.flush();
    }
  };
  const fetchStream = async (query, ...args) => {
    isStreaming.value = true;
    currentContent.value = "";
    abortController = new AbortController();
    if (enableTypewriter) {
      typewriter = new TypewriterThrottle((chunk) => {
        currentContent.value += chunk;
        options.onUpdate?.(chunk, currentContent.value);
      }, charsPerFrame);
    }
    const pushText = (text) => {
      if (!text) return;
      if (enableTypewriter && typewriter) {
        typewriter.push(text);
      } else {
        currentContent.value += text;
        options.onUpdate?.(text, currentContent.value);
      }
    };
    try {
      const response = await options.request(query, ...args);
      if (typeof response === "object" && response !== null && Symbol.asyncIterator in response) {
        for await (const chunk of response) {
          if (abortController.signal.aborted) break;
          const parsed = parser(chunk);
          if (parsed !== null) pushText(parsed);
        }
      } else if (response instanceof Response && response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
        while (true) {
          if (abortController.signal.aborted) {
            reader.cancel();
            break;
          }
          const { done, value } = await reader.read();
          if (done) break;
          const chunkStr = decoder.decode(value, { stream: true });
          const parsed = parser(chunkStr);
          if (parsed !== null) pushText(parsed);
        }
      }
      if (!abortController.signal.aborted) {
        if (enableTypewriter && typewriter) {
          typewriter.flush();
        }
        isStreaming.value = false;
        options.onFinish?.(currentContent.value);
      }
    } catch (e) {
      if (e.name !== "AbortError") {
        options.onError?.(e);
      }
      typewriter?.cancel();
      isStreaming.value = false;
    }
  };
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
  };
}
export const __test__ = {
  TypewriterThrottle
};
