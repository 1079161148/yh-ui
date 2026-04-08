<script setup>
import { useNamespace, useLocale } from "@yh-ui/hooks";
import { useComponentTheme } from "@yh-ui/theme";
import {
  computed,
  ref,
  onBeforeUnmount,
  watchEffect,
  shallowRef,
  watch,
  onMounted,
  nextTick
} from "vue";
import {
  aiBubbleProps
} from "./ai-bubble";
import { YhAvatar } from "../../avatar";
import { YhButton } from "../../button";
import { YhIcon } from "../../icon";
import { YhAiThoughtChain } from "../../ai-thought-chain";
import MarkdownIt from "../../markdown-it";
import hljs from "../../highlight";
import "highlight.js/styles/atom-one-dark.css";
defineOptions({
  name: "YhAiBubble"
});
const props = defineProps(aiBubbleProps);
const ns = useNamespace("ai-bubble");
const { t } = useLocale();
const { themeStyle } = useComponentTheme(
  "ai-bubble",
  computed(() => props.themeOverrides)
);
const playingAsset = ref(null);
let audioInstance = null;
const handleAudioToggle = (url) => {
  if (playingAsset.value === url) {
    audioInstance?.pause();
    playingAsset.value = null;
  } else {
    if (audioInstance) {
      audioInstance.pause();
    }
    playingAsset.value = url;
    audioInstance = new Audio(url);
    audioInstance.play().catch((err) => {
      console.warn("Audio playback failed:", err);
      playingAsset.value = null;
    });
    audioInstance.onended = () => {
      playingAsset.value = null;
    };
  }
};
const handleDownload = (url) => {
  window.open(url, "_blank");
};
const escapeHtml = (str) => {
  const htmlEntities = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  };
  return str.replace(/[&<>"']/g, (char) => htmlEntities[char]);
};
const getFileIcon = (url = "") => {
  const ext = url.split(".").pop()?.toLowerCase() || "";
  switch (ext) {
    case "pdf":
      return "file-pdf";
    case "xlsx":
    case "xls":
    case "csv":
      return "file-excel";
    case "doc":
    case "docx":
      return "file-word";
    case "mp4":
    case "webm":
    case "mov":
      return "file-video";
    case "mp3":
    case "wav":
    case "ogg":
      return "file-audio";
    case "txt":
    case "md":
      return "file-txt";
    default:
      return "document";
  }
};
const _mermaidContainer = ref(null);
const mermaidLoading = ref(false);
const mermaidError = ref(null);
let mermaidModule = null;
const initMermaid = async () => {
  if (mermaidModule) return mermaidModule;
  try {
    mermaidModule = await import("mermaid");
    mermaidModule.default.initialize({
      startOnLoad: false,
      theme: "default",
      securityLevel: "loose",
      flowchart: { curve: "basis", padding: 15 },
      sequence: { actorMargin: 50, boxMargin: 10 }
    });
    return mermaidModule;
  } catch (e) {
    console.warn("Mermaid not available:", e);
    return null;
  }
};
const _renderMermaid = async (code) => {
  if (!mermaidModule) {
    await initMermaid();
  }
  if (!mermaidModule) return `<pre class="mermaid-error">${code}</pre>`;
  mermaidLoading.value = true;
  mermaidError.value = null;
  try {
    const id = `mermaid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const { svg } = await mermaidModule.default.render(id, code);
    mermaidLoading.value = false;
    return svg;
  } catch (e) {
    mermaidLoading.value = false;
    mermaidError.value = e instanceof Error ? e.message : "Failed to render mermaid diagram";
    return `<pre class="mermaid-error">${code}</pre>`;
  }
};
const expandedCodeBlocks = ref(/* @__PURE__ */ new Set());
const copiedCodeBlocks = ref(/* @__PURE__ */ new Set());
const editingCodeBlock = ref(null);
const editCodeContent = ref("");
const runningCodeBlock = ref(null);
const codeOutput = ref({});
let webContainerInstance = null;
const monaco = shallowRef(null);
const monacoEditor = shallowRef(null);
const monacoContainer = ref(null);
const loadMonaco = async () => {
  if (monaco.value) return monaco.value;
  try {
    const m = await import("monaco-editor");
    monaco.value = m;
    return m;
  } catch (e) {
    console.warn("Monaco editor failed to load:", e);
    return null;
  }
};
const isWebContainerSupported = () => {
  if (typeof window === "undefined") return false;
  const isSecure = window.isSecureContext;
  const hasSharedArrayBuffer = typeof SharedArrayBuffer !== "undefined";
  const isCrossOriginIsolated = window.crossOriginIsolated;
  if (!isSecure || !hasSharedArrayBuffer || !isCrossOriginIsolated) {
    console.warn(
      "[YhAiBubble] WebContainer requires secure context, SharedArrayBuffer and crossOriginIsolated. Falling back to browser runtime."
    );
    return false;
  }
  return true;
};
const initWebContainer = async () => {
  if (webContainerInstance) return webContainerInstance;
  if (!isWebContainerSupported()) {
    return null;
  }
  try {
    const { WebContainer } = await import("@webcontainer/api");
    webContainerInstance = await WebContainer.boot();
    return webContainerInstance;
  } catch (e) {
    console.warn("WebContainer not available, fallback to browser runtime:", e);
    return null;
  }
};
const getCodeBlockId = (code, lang) => {
  const key = (code || "").slice(0, 50) + (lang || "");
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = hash * 31 + key.charCodeAt(i) >>> 0;
  }
  return `cb-${hash.toString(16)}`;
};
const toggleCodeBlock = (id) => {
  if (expandedCodeBlocks.value.has(id)) {
    expandedCodeBlocks.value.delete(id);
  } else {
    expandedCodeBlocks.value.add(id);
  }
};
const copyCode = async (code, id) => {
  try {
    await navigator.clipboard.writeText(code);
    copiedCodeBlocks.value.add(id);
    setTimeout(() => copiedCodeBlocks.value.delete(id), 2e3);
  } catch (e) {
    console.error("Copy failed:", e);
  }
};
const _editCode = (code, id) => {
  editingCodeBlock.value = id;
  editCodeContent.value = code;
};
const openCodeEditor = async (code, id, lang) => {
  editingCodeBlock.value = id;
  editCodeContent.value = code;
  await nextTick();
  const container = monacoContainer.value;
  const m = await loadMonaco();
  if (!container || !m) return;
  if (monacoEditor.value) {
    monacoEditor.value.dispose();
    monacoEditor.value = null;
  }
  monacoEditor.value = m.editor.create(container, {
    value: code,
    language: lang || "typescript",
    automaticLayout: true,
    minimap: { enabled: false },
    fontSize: 13,
    theme: "vs-dark"
  });
};
const saveEditCode = async (id) => {
  if (monacoEditor.value) {
    editCodeContent.value = monacoEditor.value.getValue();
  }
  try {
    await navigator.clipboard.writeText(editCodeContent.value);
    copiedCodeBlocks.value.add(id);
    setTimeout(() => copiedCodeBlocks.value.delete(id), 2e3);
  } catch (e) {
    console.error("Copy edited code failed:", e);
  }
  editingCodeBlock.value = null;
  editCodeContent.value = "";
};
const cancelEditCode = () => {
  editingCodeBlock.value = null;
  editCodeContent.value = "";
  if (monacoEditor.value) {
    monacoEditor.value.dispose();
    monacoEditor.value = null;
  }
};
const runCodeInBrowser = (code, id) => {
  codeOutput.value[id] = [];
  codeOutput.value[id].push("> Running...\n");
  try {
    const logs = [];
    const _customConsole = {
      log: (...args) => logs.push(args.map(String).join(" ")),
      error: (...args) => logs.push("Error: " + args.map(String).join(" ")),
      warn: (...args) => logs.push("Warn: " + args.map(String).join(" "))
    };
    const _originalConsole = { ...console };
    const streamLog = (type, ...args) => {
      const line = args.map(String).join(" ");
      const prefix = type === "error" ? "Error: " : type === "warn" ? "Warn: " : "";
      codeOutput.value[id].push(prefix + line);
    };
    const streamConsole = {
      log: (...args) => streamLog("log", ...args),
      error: (...args) => streamLog("error", ...args),
      warn: (...args) => streamLog("warn", ...args),
      info: (...args) => streamLog("log", ...args),
      debug: (...args) => streamLog("log", ...args)
    };
    const fn = new Function(
      "console",
      `
      return (function() {
        ${code}
      })()
    `
    );
    const result = fn(streamConsole);
    if (result !== void 0) {
      codeOutput.value[id].push(`\u2190 ${String(result)}`);
    }
    if (logs.length === 0) {
      codeOutput.value[id].push("\n\u2713 Executed successfully (no output)");
    } else {
      logs.forEach((log, index) => {
        setTimeout(() => {
          if (codeOutput.value[id]) {
            codeOutput.value[id].push(log);
          }
        }, index * 50);
      });
    }
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    codeOutput.value[id].push(`
\u2717 Error: ${message}`);
  }
};
const runPythonInBrowser = async (code, id) => {
  codeOutput.value[id].push("> Initializing Pyodide (Python in browser)...");
  try {
    const win = window;
    if (!win.loadPyodide) {
      await import(
        /* @vite-ignore */
        props.pyodideUrl
      );
    }
    if (!win.loadPyodide) {
      throw new Error("Pyodide failed to load.");
    }
    const pyodide = await win.loadPyodide({
      indexURL: props.pyodideUrl.substring(0, props.pyodideUrl.lastIndexOf("/"))
    });
    codeOutput.value[id].push("> Running Python code...\n");
    pyodide.setStdout({
      batched: (text) => {
        if (codeOutput.value[id]) {
          codeOutput.value[id].push(text);
        }
      }
    });
    const result = await pyodide.runPythonAsync(code);
    if (result !== void 0 && result !== null) {
      codeOutput.value[id].push(`
Result: ${result}`);
    }
    codeOutput.value[id].push("\n\u2713 Python execution complete");
  } catch (e) {
    const error = e instanceof Error ? e.message : String(e);
    codeOutput.value[id].push(`
Error: ${error}`);
  }
};
const runPythonRemote = async (code, id) => {
  codeOutput.value[id].push(`> Running Python via remote API: ${props.pythonApiUrl}...`);
  try {
    const response = await fetch(props.pythonApiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, language: "python" })
    });
    const result = await response.json();
    if (result.output) {
      codeOutput.value[id].push(`
${result.output}`);
    }
    if (result.error) {
      codeOutput.value[id].push(`
Error: ${result.error}`);
    }
    codeOutput.value[id].push("\n\u2713 Remote Python execution complete");
  } catch (e) {
    const error = e instanceof Error ? e.message : String(e);
    codeOutput.value[id].push(`
Remote Error: ${error}`);
  }
};
const runCode = async (code, lang, id) => {
  runningCodeBlock.value = id;
  codeOutput.value[id] = [];
  if (props.onRunCode) {
    try {
      codeOutput.value[id].push("> Running...\n");
      const result = await props.onRunCode(code, lang);
      if (result && Symbol.asyncIterator in result) {
        const asyncResult = result;
        for await (const chunk of asyncResult) {
          codeOutput.value[id].push(chunk.output || chunk.error || "");
        }
      } else {
        const finalResult = result;
        codeOutput.value[id] = finalResult.output ? finalResult.output.split("\n") : finalResult.error ? [`Error: ${finalResult.error}`] : [];
      }
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      codeOutput.value[id].push(`Error: ${message}`);
    }
  } else if (lang === "javascript" || lang === "js") {
    const mdOptions = getMarkdownOptions();
    const runtime = mdOptions.codeBlock?.runtime || "browser";
    if (runtime === "webcontainer") {
      try {
        const wc = await initWebContainer();
        if (!wc) {
          runCodeInBrowser(code, id);
        } else {
          codeOutput.value[id].push("> Running in WebContainer...\n");
          await wc.mount({
            "index.js": {
              file: {
                contents: code
              }
            }
          });
          const process = await wc.spawn("node", ["index.js"]);
          const reader = process.output.getReader();
          const decoder = new TextDecoder();
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value, { stream: true });
            if (chunk) {
              const lines = chunk.split("\n");
              lines.forEach((line, index) => {
                if (line || index < lines.length - 1) {
                  setTimeout(() => {
                    if (codeOutput.value[id]) {
                      codeOutput.value[id].push(line);
                    }
                  }, index * 30);
                }
              });
            }
          }
          codeOutput.value[id].push("\n\u2713 WebContainer execution complete");
        }
      } catch (e) {
        console.warn("WebContainer execution failed, fallback to browser runtime:", e);
        codeOutput.value[id].push("\n\u26A0 WebContainer not supported, falling back to browser...");
        runCodeInBrowser(code, id);
      }
    } else {
      runCodeInBrowser(code, id);
    }
  } else if (lang === "python" || lang === "py") {
    if (props.enablePythonRuntime) {
      if (props.pythonRuntime === "remote" && props.pythonApiUrl) {
        runPythonRemote(code, id);
      } else {
        runPythonInBrowser(code, id);
      }
    } else {
      codeOutput.value[id].push(
        'Python runtime is disabled. Please enable "enable-python-runtime" prop.'
      );
    }
  } else {
    codeOutput.value[id].push(`Language "${lang}" execution not supported in browser`);
  }
  const triggerRender = () => {
    if (props.markdown && mdi.value && props.content) {
      parsedContent.value = mdi.value.render(props.content);
    }
  };
  triggerRender();
  const renderInterval = setInterval(triggerRender, 100);
  setTimeout(() => {
    clearInterval(renderInterval);
    triggerRender();
    runningCodeBlock.value = null;
  }, 5e3);
};
const explainCode = async (code, lang) => {
  if (props.onExplainCode) {
    return await props.onExplainCode(code, lang);
  }
  return "";
};
const parsedContent = ref(props.content);
let renderRafId = null;
let streamTimer = null;
let streamPosition = 0;
let streamBuffer = "";
const streamingCodeBlocks = ref(/* @__PURE__ */ new Set());
const injectCodeStreamStyles = () => {
  if (typeof document === "undefined") return;
  const styleId = "yh-ai-code-stream-styles";
  if (document.getElementById(styleId)) return;
  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = `
    .code-block-wrapper.streaming .code-block-body code {
      display: block;
    }
    .code-block-wrapper.streaming .code-block-body code .line {
      display: block;
      opacity: 0;
      animation: code-line-fade-in 0.15s ease forwards;
    }
    .code-block-wrapper.streaming .code-block-body code .line:last-child {
      animation: none;
    }
    @keyframes code-line-fade-in {
      from { opacity: 0; transform: translateX(-8px); }
      to { opacity: 1; transform: translateX(0); }
    }
    /* \u5149\u6807\u95EA\u70C1\u6548\u679C */
    .code-block-wrapper.streaming .code-block-body code .line:last-child::after {
      content: '\u258B';
      animation: cursor-blink 0.8s infinite;
      margin-left: 2px;
      color: var(--yh-color-primary, #409eff);
    }
    @keyframes cursor-blink {
      0%, 50% { opacity: 1; }
      51%, 100% { opacity: 0; }
    }
  `;
  document.head.appendChild(style);
};
const _markCodeLinesForStreaming = (codeBlockId) => {
  streamingCodeBlocks.value.add(codeBlockId);
  injectCodeStreamStyles();
};
watch(
  () => parsedContent.value,
  (_newContent) => {
    if (props.streaming && props.typing) {
      setTimeout(() => {
        const codeBlocks = document.querySelectorAll(".code-block-wrapper");
        codeBlocks.forEach((block) => {
          const id = block.getAttribute("data-id");
          if (id && !streamingCodeBlocks.value.has(id)) {
            const code = block.querySelector("code");
            if (code) {
              const html = code.innerHTML;
              const lines = html.split("\n");
              code.innerHTML = lines.map(
                (line, i) => `<span class="line" style="animation-delay: ${i * 30}ms">${line}</span>`
              ).join("\n");
              block.classList.add("streaming");
              streamingCodeBlocks.value.add(id);
            }
          }
        });
      }, 100);
    }
  }
);
const _renderLatex = (text) => {
  text = text.replace(/\$\$([\s\S]+?)\$\$/g, (_, math) => {
    return `<div class="latex-block" data-latex="${encodeURIComponent(math.trim())}">${math.trim()}</div>`;
  });
  text = text.replace(/\$([^\$\n]+?)\$/g, (_, math) => {
    return `<span class="latex-inline" data-latex="${encodeURIComponent(math.trim())}">${math.trim()}</span>`;
  });
  return text;
};
const _structuredDataRef = ref(null);
const _renderStructuredData = computed(() => {
  if (!props.structuredData) return null;
  const { type, data, options } = props.structuredData;
  switch (type) {
    case "json":
      return { type: "json", data, options };
    case "table":
      return { type: "table", data, options };
    case "chart":
      return { type: "chart", data, options };
    case "mindmap":
      return { type: "mindmap", data, options };
    case "thought-chain":
      return { type: "thought-chain", data, options };
    default:
      return null;
  }
});
const jsonHtml = computed(() => {
  if (!props.structuredData || props.structuredData.type !== "json") return "";
  try {
    const rawData = props.structuredData.data;
    const jsonString = typeof rawData === "string" ? rawData : JSON.stringify(rawData, null, 2);
    if (hljs.getLanguage("json")) {
      return hljs.highlight(jsonString, {
        language: "json",
        ignoreIllegals: true
      }).value;
    }
    return jsonString;
  } catch (e) {
    console.warn("Failed to render JSON structured data:", e);
    return "";
  }
});
const hoveredCitation = ref(null);
const citationTooltipStyle = ref({
  top: "0px",
  left: "0px",
  position: "fixed",
  transform: "",
  zIndex: "9999"
});
let citationHoverTimer = null;
const handleCitationHover = (e) => {
  const target = e.target;
  if (target && target.classList && target.classList.contains("yh-ai-citation")) {
    const id = target.getAttribute("data-id");
    const citation = props.citations?.find(
      (c) => String(c.id) === id
    );
    if (citation) {
      if (citationHoverTimer) clearTimeout(citationHoverTimer);
      hoveredCitation.value = citation;
      const rect = target.getBoundingClientRect();
      citationTooltipStyle.value = {
        top: `${rect.top - 10}px`,
        left: `${rect.left + rect.width / 2}px`,
        transform: "translate(-50%, -100%)",
        position: "fixed",
        zIndex: "9999"
      };
    }
  }
};
const handleCitationLeave = (e) => {
  const target = e.target;
  if (target && target.classList && target.classList.contains("yh-ai-citation")) {
    citationHoverTimer = setTimeout(() => {
      hoveredCitation.value = null;
    }, 200);
  }
};
const handleCitationClick = (citation) => {
  if (props.onCitationClick) {
    props.onCitationClick(citation);
  } else if (citation.url) {
    window.open(citation.url, "_blank");
  }
};
const handleTooltipEnter = () => {
  if (citationHoverTimer) clearTimeout(citationHoverTimer);
};
const handleTooltipLeave = () => {
  citationHoverTimer = setTimeout(() => {
    hoveredCitation.value = null;
  }, 200);
};
const getMarkdownOptions = () => {
  return {
    mermaid: true,
    latex: true,
    filePreview: true,
    linkify: true,
    typographer: true,
    ...props.markdownOptions,
    codeBlock: {
      copyable: true,
      languageTag: true,
      lineNumbers: false,
      editable: false,
      runnable: true,
      explainable: true,
      collapsible: true,
      collapseLinesThreshold: 10,
      ...props.markdownOptions?.codeBlock || {}
    }
  };
};
const getMarkdownInstance = () => {
  const mdOptions = getMarkdownOptions();
  const md = new MarkdownIt({
    html: mdOptions.html ?? false,
    linkify: mdOptions.linkify ?? true,
    typographer: mdOptions.typographer ?? true,
    highlight: function(str, lang) {
      const codeBlockId = getCodeBlockId(str, lang);
      const codeBlockOptions = mdOptions.codeBlock;
      let result = "";
      const hlLang = lang === "vue" ? "xml" : lang;
      if (hlLang && hljs.getLanguage(hlLang)) {
        try {
          result = hljs.highlight(str, { language: hlLang, ignoreIllegals: true }).value;
        } catch {
        }
      } else {
        result = md.utils.escapeHtml(str);
      }
      if (codeBlockOptions?.lineNumbers) {
        const lines = result.split("\n");
        const numberedLines = lines.map((line, i) => `<span class="line-number">${i + 1}</span>${line}`).join("\n");
        result = numberedLines;
      }
      const lineCount = str.split("\n").length;
      const shouldCollapse = codeBlockOptions?.collapsible && lineCount > (codeBlockOptions?.collapseLinesThreshold ?? 10);
      const isExpanded = expandedCodeBlocks.value.has(codeBlockId);
      let wrapperStart = `<div class="code-block-wrapper" data-lang="${lang}" data-id="${codeBlockId}">`;
      wrapperStart += `<div class="code-block-header">`;
      if (codeBlockOptions?.languageTag) {
        wrapperStart += `<span class="code-lang">${lang || "text"}</span>`;
      }
      wrapperStart += `<div class="code-actions">`;
      if (codeBlockOptions?.copyable) {
        const copyText = copiedCodeBlocks.value.has(codeBlockId) ? "Copied!" : "Copy";
        wrapperStart += `<button class="code-action-btn copy-btn" data-code="${encodeURIComponent(str)}" data-id="${codeBlockId}">${copyText}</button>`;
      }
      if (codeBlockOptions?.editable) {
        wrapperStart += `<button class="code-action-btn edit-btn" data-id="${codeBlockId}">Edit</button>`;
      }
      const isRunnableLang = ["javascript", "js"].includes(lang) || props.enablePythonRuntime && ["python", "py"].includes(lang);
      if (codeBlockOptions?.runnable && isRunnableLang) {
        wrapperStart += `<button class="code-action-btn run-btn" data-code="${encodeURIComponent(str)}" data-lang="${lang}" data-id="${codeBlockId}">Run</button>`;
      }
      if (codeBlockOptions?.explainable) {
        wrapperStart += `<button class="code-action-btn explain-btn" data-code="${encodeURIComponent(str)}" data-lang="${lang}" data-id="${codeBlockId}">Explain</button>`;
      }
      if (shouldCollapse) {
        wrapperStart += `<button class="code-action-btn collapse-btn" data-id="${codeBlockId}">${isExpanded ? "Collapse" : "Expand"}</button>`;
      }
      wrapperStart += `</div></div>`;
      const _bodyClass = shouldCollapse ? isExpanded ? "code-block-body expanded" : "code-block-body collapsed" : "code-block-body";
      let wrapperEnd = `</div>`;
      if (codeOutput.value[codeBlockId]) {
        const outputLines = codeOutput.value[codeBlockId];
        const outputHtml = Array.isArray(outputLines) ? outputLines.map((line) => {
          if (line.startsWith("> "))
            return `<span class="output-prefix">${escapeHtml(line)}</span>`;
          if (line.startsWith("\u2190 "))
            return `<span class="output-return">${escapeHtml(line)}</span>`;
          if (line.startsWith("\u2713"))
            return `<span class="output-success">${escapeHtml(line)}</span>`;
          if (line.startsWith("\u2717"))
            return `<span class="output-error">${escapeHtml(line)}</span>`;
          if (line.startsWith("\u26A0"))
            return `<span class="output-warning">${escapeHtml(line)}</span>`;
          if (line.startsWith("Error:"))
            return `<span class="output-error">${escapeHtml(line)}</span>`;
          return escapeHtml(line);
        }).join("\n") : escapeHtml(outputLines);
        wrapperEnd += `<div class="code-output"><pre>${outputHtml}</pre></div>`;
      }
      wrapperEnd += `</div>`;
      return wrapperStart + `<pre class="hljs ${lang || ""}"><code>${result}</code></pre>` + wrapperEnd;
    }
  });
  md.block.ruler.before("code", "mermaid", (state, silent) => {
    const start = state.bMarks[state.line];
    const max = state.eMarks[state.line];
    const line = state.src.slice(start, max);
    if (!line.trim().startsWith("```mermaid")) return false;
    if (!silent) {
      state.line++;
      const lines = [];
      while (state.line < state.lineMax) {
        const lineContent = state.src.slice(state.bMarks[state.line], state.eMarks[state.line]);
        if (lineContent.trim().startsWith("```")) break;
        lines.push(lineContent);
        state.line++;
      }
      let token = state.push("mermaid_open", "div", 1);
      token.attrSet("class", "mermaid-block");
      token = state.push("mermaid_code", "", 0);
      token.content = lines.join("\n");
      token = state.push("mermaid_close", "div", -1);
    }
    return true;
  });
  md.renderer.rules.mermaid_open = () => '<div class="mermaid-block">';
  md.renderer.rules.mermaid_code = (tokens, idx) => {
    const code = tokens[idx].content;
    return `<pre class="mermaid">${md.utils.escapeHtml(code)}</pre>`;
  };
  md.renderer.rules.mermaid_close = () => "</div>";
  md.inline.ruler.after("text", "citation", (state, silent) => {
    const start = state.pos;
    if (state.src.charCodeAt(start) !== 91) return false;
    const match = state.src.slice(start).match(/^\[(\d+)\]/);
    if (!match) return false;
    if (!silent) {
      const id = match[1];
      let token = state.push("citation_open", "sup", 1);
      token.attrs = [
        ["class", "yh-ai-citation"],
        ["data-id", id]
      ];
      token = state.push("text", "", 0);
      token.content = id;
      state.push("citation_close", "sup", -1);
    }
    state.pos += match[0].length;
    return true;
  });
  return md;
};
const mdi = shallowRef(null);
watchEffect(() => {
  if (props.markdown && !mdi.value) {
    mdi.value = getMarkdownInstance();
  }
});
onBeforeUnmount(() => {
  if (audioInstance) {
    audioInstance.pause();
    audioInstance = null;
  }
  if (streamTimer) {
    clearInterval(streamTimer);
    streamTimer = null;
  }
  if (monacoEditor.value) {
    monacoEditor.value.dispose();
    monacoEditor.value = null;
  }
  mdi.value = null;
});
const streamRender = (fullContent, mode, speed, interval) => {
  if (!fullContent) {
    parsedContent.value = "";
    return;
  }
  if (streamTimer) {
    clearInterval(streamTimer);
    streamTimer = null;
  }
  streamPosition = 0;
  streamBuffer = "";
  const getChunks = () => {
    if (mode === "paragraph") {
      return fullContent.split(/(?:\r?\n){2,}/);
    } else if (mode === "sentence") {
      return fullContent.split(/(?<=[.!?。！？])\s+/);
    } else {
      const chunks2 = [];
      for (let i = 0; i < fullContent.length; i += speed) {
        chunks2.push(fullContent.slice(i, i + speed));
      }
      return chunks2;
    }
  };
  const chunks = getChunks();
  streamTimer = setInterval(() => {
    if (streamPosition < chunks.length) {
      streamBuffer += chunks[streamPosition];
      streamPosition++;
      parsedContent.value = props.markdown && mdi.value ? mdi.value.render(streamBuffer) : streamBuffer;
    } else {
      if (streamTimer) {
        clearInterval(streamTimer);
        streamTimer = null;
      }
      parsedContent.value = props.markdown && mdi.value ? mdi.value.render(fullContent) : fullContent;
      if (props.onStreamComplete) {
        props.onStreamComplete();
      }
    }
  }, interval);
};
watch(
  () => props.content,
  (newContent) => {
    if (streamTimer) {
      clearInterval(streamTimer);
      streamTimer = null;
    }
    if (!props.markdown || !props.typing) {
      if (renderRafId && typeof cancelAnimationFrame !== "undefined") {
        cancelAnimationFrame(renderRafId);
        renderRafId = null;
      }
      parsedContent.value = props.markdown && mdi.value ? mdi.value.render(newContent || "") : newContent;
      return;
    }
    if (props.streaming && props.typing) {
      streamRender(newContent, props.streamMode, props.streamSpeed, props.streamInterval);
      return;
    }
    if (typeof requestAnimationFrame === "undefined") {
      parsedContent.value = mdi.value ? mdi.value.render(newContent || "") : newContent;
      return;
    }
    if (renderRafId) return;
    renderRafId = requestAnimationFrame(() => {
      parsedContent.value = mdi.value ? mdi.value.render(newContent || "") : newContent;
      renderRafId = null;
    });
  },
  { immediate: true }
);
const computedPlacement = computed(() => {
  if (props.placement) return props.placement;
  return props.role === "user" ? "end" : "start";
});
const classes = computed(() => [
  ns.b(),
  ns.m(props.role),
  ns.m(`placement-${computedPlacement.value}`),
  ns.m(`shape-${props.shape}`),
  ns.m(`variant-${props.variant}`),
  ns.is("loading", props.loading),
  ns.is("typing", props.typing)
]);
const handleCodeBlockAction = async (e) => {
  const target = e.target;
  if (!target.classList.contains("code-action-btn")) return;
  const code = decodeURIComponent(target.getAttribute("data-code") || "");
  const lang = target.getAttribute("data-lang") || "";
  const id = target.getAttribute("data-id") || "";
  if (target.classList.contains("copy-btn")) {
    await copyCode(code, id);
  } else if (target.classList.contains("edit-btn")) {
    await openCodeEditor(code, id, lang);
  } else if (target.classList.contains("run-btn")) {
    await runCode(code, lang, id);
  } else if (target.classList.contains("explain-btn")) {
    const explanation = await explainCode(code, lang);
    if (explanation) {
      codeOutput.value[id] = explanation.split("\n");
    }
  } else if (target.classList.contains("collapse-btn")) {
    toggleCodeBlock(id);
  }
};
onMounted(() => {
  document.addEventListener("click", handleCodeBlockAction);
});
onBeforeUnmount(() => {
  document.removeEventListener("click", handleCodeBlockAction);
});
</script>

<template>
  <div :class="classes" :style="themeStyle">
    <!-- Avatar -->
    <div :class="ns.e('avatar')" v-if="role !== 'system'">
      <slot name="avatar">
        <YhAvatar v-if="avatar" :src="avatar" crossorigin="anonymous" />
        <YhAvatar v-else>
          <YhIcon :name="role === 'user' ? 'user' : 'robot'" />
        </YhAvatar>
      </slot>
    </div>

    <!-- Content Wrapper -->
    <div :class="ns.e('content-wrapper')">
      <!-- Header -->
      <div :class="ns.e('header')" v-if="$slots.header || time">
        <slot name="header">
          <span v-if="time" :class="ns.e('time')">{{ time }}</span>
        </slot>
      </div>

      <!-- Body -->
      <div :class="[ns.e('body'), ns.is('typing', loading)]">
        <template v-if="loading && !content">
          <span :class="ns.e('typing-indicator')"> <span></span><span></span><span></span> </span>
        </template>
        <template v-else>
          <!-- Multimodal: Images (Above text) -->
          <div
            v-if="multimodal && multimodal.some(m => m.type === 'image')"
            :class="ns.e('image-grid')"
          >
            <div
              v-for="(img, idx) in multimodal.filter(m => m.type === 'image')"
              :key="idx"
              :class="ns.e('image-item')"
            >
              <img :src="img.url" :alt="img.title" loading="lazy" crossorigin="anonymous" />
            </div>
          </div>

          <slot>
            <!-- eslint-disable vue/no-v-html -->
            <div
              v-if="markdown"
              :class="[ns.e('text'), ns.e('markdown')]"
              v-html="parsedContent"
              @mouseover="handleCitationHover"
              @mouseout="handleCitationLeave"
            ></div>
            <!-- eslint-enable vue/no-v-html -->
            <div v-else :class="ns.e('text')">{{ content }}</div>
          </slot>

          <!-- Structured Data Display (Below main text) -->
          <div v-if="structuredData" :class="ns.e('structured-data')">
            <!-- JSON pretty view -->
            <!-- eslint-disable vue/no-v-html -->
            <div v-if="structuredData.type === 'json'" :class="[ns.e('json-viewer')]">
              <pre class="hljs json"><code v-html="jsonHtml" /></pre>
            </div>
            <!-- eslint-enable vue/no-v-html -->

            <!-- Table view -->
            <div v-else-if="structuredData.type === 'table'" :class="[ns.e('table-viewer')]">
              <table>
                <thead>
                  <tr
                    v-if="structuredData.data && structuredData.data.headers"
                  >
                    <th
                      v-for="h in structuredData.data.headers"
                      :key="h"
                    >
                      {{ h }}
                    </th>
                  </tr>
                </thead>
                <tbody v-if="structuredData.data && typeof structuredData.data === 'object'">
                  <tr
                    v-for="(row, idx) in structuredData.data.rows"
                    :key="idx"
                  >
                    <td v-for="(cell, cIdx) in row" :key="cIdx">{{ cell }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Thought chain: delegate to AiThoughtChain for consistent style -->
            <YhAiThoughtChain
              v-else-if="structuredData.type === 'thought-chain' && structuredData.data"
              :items="structuredData.data"
              :title="content || void 0"
              status="none"
              dot-size="small"
              :auto-collapse="false"
              line-gradient
            />

            <!-- Fallback: raw JSON -->
            <div v-else :class="[ns.e('chart-viewer')]">
              <pre>{{ JSON.stringify(structuredData.data, null, 2) }}</pre>
            </div>
          </div>

          <!-- Multimodal: Audio/Files (Below text) -->
          <div
            v-if="multimodal && multimodal.some(m => m.type !== 'image')"
            :class="ns.e('multimodal-assets')"
          >
            <template v-for="(asset, idx) in multimodal" :key="idx">
              <!-- Audio Player -->
              <div
                v-if="asset.type === 'audio'"
                :class="[ns.e('audio-player'), {
  'is-active': playingAsset === asset.url
}]"
              >
                <YhButton
                  circle
                  size="small"
                  :type="role === 'user' ? 'default' : 'primary'"
                  @click="handleAudioToggle(asset.url)"
                >
                  <template #icon>
                    <YhIcon :name="playingAsset === asset.url ? 'video-pause' : 'video-play'" />
                  </template>
                </YhButton>
                <div :class="[ns.e('audio-waveform'), {
  'is-active': playingAsset === asset.url
}]">
                  <span v-for="i in 12" :key="i" :style="{
  '--delay': i * 0.1 + 's'
}"></span>
                </div>
                <span :class="ns.e('audio-duration')">{{ asset.extra?.duration || "0:00" }}</span>
              </div>

              <!-- File/Table Card -->
              <div v-else-if="asset.type === 'file'" :class="ns.e('file-card')">
                <div :class="ns.e('file-icon')">
                  <YhIcon :name="getFileIcon(asset.url)" />
                </div>
                <div :class="ns.e('file-info')">
                  <div :class="ns.e('file-name')">{{ asset.title }}</div>
                  <div :class="ns.e('file-meta')">{{ asset.size }}</div>
                </div>
                <YhButton text circle @click="handleDownload(asset.url)">
                  <template #icon>
                    <YhIcon name="download" />
                  </template>
                </YhButton>
              </div>
            </template>
          </div>

          <!-- Citations -->
          <div v-if="citations && citations.length > 0" :class="ns.e('citations')">
            <div :class="ns.e('citations-title')">
              <YhIcon name="document" />
              <span>{{ t("ai.bubble.citations") }}</span>
              <span :class="ns.e('citations-count')">{{ citations.length }}</span>
            </div>
            <div :class="ns.e('citations-list')">
              <a
                v-for="(cite, index) in citations"
                :key="index"
                :href="cite.url"
                target="_blank"
                :class="ns.e('citation-item')"
                :title="cite.title"
                @click.prevent="handleCitationClick(cite)"
              >
                <span :class="ns.e('citation-index')">{{ cite.id || index + 1 }}</span>
                <span :class="ns.e('citation-text')">{{ cite.title }}</span>
                <YhIcon v-if="cite.url" name="arrow-right" :class="ns.e('citation-link-icon')" />
              </a>
            </div>
          </div>
        </template>
      </div>

      <!-- Footer -->
      <div :class="ns.e('footer')" v-if="$slots.footer">
        <slot name="footer"></slot>
      </div>
    </div>

    <!-- Floating Citation Tooltip -->
    <Teleport to="body">
      <Transition name="yh-fade-in-scale-up">
        <div
          v-if="hoveredCitation"
          :class="ns.e('citation-tooltip-wrapper')"
          :style="citationTooltipStyle"
          @mouseenter="handleTooltipEnter"
          @mouseleave="handleTooltipLeave"
        >
          <div :class="ns.e('citation-tooltip')">
            <div :class="ns.e('citation-tooltip-header')">
              <YhIcon :name="hoveredCitation.icon || 'document'" />
              <span>{{ hoveredCitation.source || hoveredCitation.title }}</span>
            </div>
            <div :class="ns.e('citation-tooltip-body')">
              <h4>{{ hoveredCitation.title }}</h4>
              <p v-if="hoveredCitation.abstract">{{ hoveredCitation.abstract }}</p>
              <span v-if="hoveredCitation.publishTime" class="publish-time">{{
                hoveredCitation.publishTime
              }}</span>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Code Edit Modal -->
    <Teleport to="body">
      <Transition name="yh-fade-in">
        <div v-if="editingCodeBlock" class="code-edit-modal-overlay" @click.self="cancelEditCode">
          <div class="code-edit-modal">
            <div class="code-edit-header">
              <h3>Edit Code</h3>
              <YhButton text @click="cancelEditCode">
                <YhIcon name="close" />
              </YhButton>
            </div>
            <div class="code-edit-body">
              <div ref="monacoContainer" class="code-edit-monaco"></div>
              <textarea v-if="!monaco" v-model="editCodeContent" rows="20"></textarea>
            </div>
            <div class="code-edit-footer">
              <YhButton @click="cancelEditCode">Cancel</YhButton>
              <YhButton type="primary" @click="saveEditCode(editingCodeBlock)">Save</YhButton>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style>
@charset "UTF-8";
/**
 * YH-UI CSS Variables
 * 全局 CSS 变量定义 - 业内最佳主题系统
 */
:root {
  /* ==================== 密度/紧凑度系统 ==================== */
  --yh-density-factor: 1;
  --yh-component-size-default: 32px;
  --yh-component-size-small: 24px;
  --yh-component-size-large: 40px;
  --yh-padding-default: 12px 16px;
  --yh-padding-small: 8px 12px;
  --yh-padding-large: 16px 20px;
  --yh-spacing-unit: 8px;
  /* ==================== 基础颜色 ==================== */
  --yh-color-white: #ffffff;
  --yh-color-black: #000000;
  /* ==================== 颜色系统 ==================== */
  /* 主色 */
  --yh-color-primary: #409eff;
  --yh-color-primary-light-1: #53a8ff;
  --yh-color-primary-light-2: #66b1ff;
  --yh-color-primary-light-3: #79bbff;
  --yh-color-primary-light-4: #8cc5ff;
  --yh-color-primary-light-5: #a0cfff;
  --yh-color-primary-light-6: #b3d8ff;
  --yh-color-primary-light-7: #c6e2ff;
  --yh-color-primary-light-8: #d9ecff;
  --yh-color-primary-light-9: #ecf5ff;
  --yh-color-primary-dark-2: #337ecc;
  /* 成功色 */
  --yh-color-success: #67c23a;
  --yh-color-success-light-3: #95d475;
  --yh-color-success-light-5: #b3e19d;
  --yh-color-success-light-7: #d1edc4;
  --yh-color-success-light-9: #f0f9eb;
  --yh-color-success-dark-2: #529b2e;
  /* 警告色 */
  --yh-color-warning: #e6a23c;
  --yh-color-warning-light-3: #eebe77;
  --yh-color-warning-light-5: #f3d19e;
  --yh-color-warning-light-7: #f8e3c5;
  --yh-color-warning-light-9: #fdf6ec;
  --yh-color-warning-dark-2: #b88230;
  /* 危险色 */
  --yh-color-danger: #f56c6c;
  --yh-color-danger-light-3: #f89898;
  --yh-color-danger-light-5: #fab6b6;
  --yh-color-danger-light-7: #fcd3d3;
  --yh-color-danger-light-9: #fef0f0;
  --yh-color-danger-dark-2: #c45656;
  /* 信息色 */
  --yh-color-info: #909399;
  --yh-color-info-light-3: #b1b3b8;
  --yh-color-info-light-5: #c8c9cc;
  --yh-color-info-light-7: #dedfe0;
  --yh-color-info-light-9: #f4f4f5;
  --yh-color-info-dark-2: #73767a;
  /* 文字颜色 */
  --yh-text-color-primary: #303133;
  --yh-text-color-regular: #606266;
  --yh-text-color-secondary: #909399;
  --yh-text-color-placeholder: #a8abb2;
  --yh-text-color-disabled: #c0c4cc;
  /* 边框颜色 */
  --yh-border-color: #dcdfe6;
  --yh-border-color-hover: var(--yh-color-primary);
  --yh-border-color-light: #e4e7ed;
  --yh-border-color-lighter: #ebeef5;
  --yh-border-color-extra-light: #f2f6fc;
  --yh-border-color-dark: #d4d7de;
  --yh-border-color-darker: #cdd0d6;
  /* 填充颜色 */
  --yh-fill-color: #f0f2f5;
  --yh-fill-color-light: #f5f7fa;
  --yh-fill-color-lighter: #fafafa;
  --yh-fill-color-extra-light: #fafcff;
  --yh-fill-color-dark: #ebedf0;
  --yh-fill-color-darker: #e6e8eb;
  --yh-fill-color-blank: #ffffff;
  /* 背景颜色 */
  --yh-bg-color: #ffffff;
  --yh-bg-color-page: #f2f3f5;
  --yh-bg-color-overlay: #ffffff;
  /* ==================== 间距系统 ==================== */
  --yh-spacing-none: 0;
  --yh-spacing-xs: 4px;
  --yh-spacing-sm: 8px;
  --yh-spacing-md: 16px;
  --yh-spacing-lg: 24px;
  --yh-spacing-xl: 32px;
  --yh-spacing-xxl: 48px;
  /* ==================== 圆角系统 ==================== */
  --yh-radius-none: 0;
  --yh-radius-sm: 2px;
  --yh-radius-base: 4px;
  --yh-radius-md: 8px;
  --yh-radius-lg: 12px;
  --yh-radius-xl: 16px;
  --yh-radius-round: 20px;
  --yh-radius-circle: 50%;
  /* ==================== 字体系统 ==================== */
  --yh-font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans',
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  /* 字号 */
  --yh-font-size-xs: 12px;
  --yh-font-size-sm: 13px;
  --yh-font-size-base: 14px;
  --yh-font-size-md: 16px;
  --yh-font-size-lg: 18px;
  --yh-font-size-xl: 20px;
  --yh-font-size-xxl: 24px;
  /* 行高 */
  --yh-line-height-none: 1;
  --yh-line-height-tight: 1.25;
  --yh-line-height-snug: 1.375;
  --yh-line-height-normal: 1.5;
  --yh-line-height-relaxed: 1.625;
  --yh-line-height-loose: 2;
  /* 字重 */
  --yh-font-weight-light: 300;
  --yh-font-weight-normal: 400;
  --yh-font-weight-medium: 500;
  --yh-font-weight-semibold: 600;
  --yh-font-weight-bold: 700;
  /* ==================== 阴影系统 ==================== */
  --yh-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --yh-shadow-base: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
  --yh-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  --yh-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
  --yh-shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  /* ==================== 过渡动效 ==================== */
  --yh-duration-fast: 150ms;
  --yh-duration-base: 200ms;
  --yh-duration-slow: 300ms;
  --yh-timing-ease: ease;
  --yh-timing-ease-in: cubic-bezier(0.4, 0, 1, 1);
  --yh-timing-ease-out: cubic-bezier(0, 0, 0.2, 1);
  --yh-timing-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --yh-timing-linear: linear;
  --yh-transition-base: all var(--yh-duration-base) var(--yh-timing-ease-in-out);
  --yh-transition-fast: all var(--yh-duration-fast) var(--yh-timing-ease-in-out);
  --yh-transition-slow: all var(--yh-duration-slow) var(--yh-timing-ease-in-out);
  /* ==================== 层级系统 ==================== */
  --yh-z-index-normal: 1;
  --yh-z-index-top: 1000;
  --yh-z-index-popper: 2000;
  --yh-z-index-overlay: 2001;
  --yh-z-index-modal: 2002;
  --yh-z-index-popover: 2003;
  --yh-z-index-tooltip: 2004;
  --yh-z-index-loading: 2005;
  /* ==================== 组件尺寸 ==================== */
  /* Large */
  --yh-component-size-large: 40px;
  --yh-component-size-large-font: 14px;
  --yh-component-size-large-padding: 20px;
  /* Default */
  --yh-component-size-default: 32px;
  --yh-component-size-default-font: 14px;
  --yh-component-size-default-padding: 16px;
  /* Small */
  --yh-component-size-small: 24px;
  --yh-component-size-small-font: 12px;
  --yh-component-size-small-padding: 12px;
  /* ==================== 组件语义化变量 ==================== */
  --yh-border-radius-base: var(--yh-radius-base);
  --yh-border-radius-small: var(--yh-radius-sm);
  --yh-border-radius-round: var(--yh-radius-round);
  /* Message 消息提示 */
  --yh-message-bg-color: var(--yh-bg-color-overlay);
  --yh-message-border-color: var(--yh-border-color-lighter);
  --yh-message-shadow: var(--yh-shadow-lg);
  --yh-message-text-color: var(--yh-text-color-primary);
  --yh-message-close-color: var(--yh-text-color-secondary);
  --yh-message-close-hover-color: var(--yh-text-color-primary);
  /* Notification 通知 */
  --yh-notification-bg-color: var(--yh-bg-color-overlay);
  --yh-notification-border-color: var(--yh-border-color-lighter);
  --yh-notification-shadow: var(--yh-shadow-lg);
  --yh-notification-title-color: var(--yh-text-color-primary);
  --yh-notification-content-color: var(--yh-text-color-regular);
  /* Badge 徽标 */
  --yh-badge-bg-color: var(--yh-color-danger);
  --yh-badge-text-color: #ffffff;
  --yh-badge-border-color: var(--yh-bg-color);
  /* Card 卡片 */
  --yh-card-bg-color: var(--yh-bg-color-overlay);
  --yh-card-border-color: var(--yh-border-color-lighter);
  --yh-card-shadow: var(--yh-shadow-base);
  --yh-card-header-padding: 18px 20px;
  --yh-card-body-padding: 20px;
  /* Input 输入框 */
  --yh-input-bg-color: var(--yh-fill-color-blank);
  --yh-input-text-color: var(--yh-text-color-regular);
  --yh-input-border-color: var(--yh-border-color);
  --yh-input-hover-border-color: var(--yh-color-primary);
  --yh-input-focus-border-color: var(--yh-color-primary);
  --yh-input-placeholder-color: var(--yh-text-color-placeholder);
  --yh-input-icon-color: var(--yh-text-color-placeholder);
  --yh-input-disabled-bg-color: var(--yh-fill-color-light);
  --yh-input-disabled-text-color: var(--yh-text-color-disabled);
  --yh-input-disabled-border-color: var(--yh-border-color-light);
  /* Image 图片 */
  --yh-image-placeholder-bg-color: var(--yh-fill-color-light);
  --yh-image-placeholder-text-color: var(--yh-text-color-placeholder);
  --yh-image-error-bg-color: var(--yh-fill-color-extra-light);
  --yh-image-error-text-color: var(--yh-text-color-placeholder);
  /* Image Viewer 预览器 */
  --yh-image-viewer-mask-bg-color: rgba(0, 0, 0, 0.5);
  --yh-image-viewer-btn-bg-color: var(--yh-text-color-regular);
  --yh-image-viewer-btn-color: #ffffff;
  --yh-image-viewer-btn-hover-bg-color: var(--yh-color-primary);
  /* Calendar 日历 */
  --yh-calendar-bg: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  --yh-calendar-border-color: rgba(0, 0, 0, 0.06);
  --yh-calendar-border-radius: var(--yh-radius-xl);
  --yh-calendar-header-bg: rgba(255, 255, 255, 0.95);
  --yh-calendar-header-border: rgba(0, 0, 0, 0.04);
  --yh-calendar-header-padding: 18px 22px;
  --yh-calendar-body-padding: 14px 18px 18px;
  /* Calendar 尺寸 */
  --yh-calendar-cell-height: 85px;
  --yh-calendar-cell-height-small: 52px;
  --yh-calendar-cell-height-large: 110px;
  --yh-calendar-cell-radius: 10px;
  --yh-calendar-cell-radius-small: 6px;
  --yh-calendar-cell-radius-large: 12px;
  /* Calendar 颜色 */
  --yh-calendar-primary: var(--yh-color-primary);
  --yh-calendar-primary-light: rgba(59, 130, 246, 0.1);
  --yh-calendar-selected-bg: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  --yh-calendar-selected-border: rgba(59, 130, 246, 0.4);
  --yh-calendar-today-dot: var(--yh-color-primary);
  --yh-calendar-weekend-color: #f97316;
  --yh-calendar-disabled-color: var(--yh-text-color-disabled);
  --yh-calendar-other-month-opacity: 0.35;
  /* Calendar 假日 */
  --yh-calendar-holiday-color: var(--yh-color-success);
  --yh-calendar-holiday-bg: rgba(16, 185, 129, 0.12);
  --yh-calendar-holiday-border: rgba(16, 185, 129, 0.25);
  --yh-calendar-workday-color: var(--yh-color-warning);
  --yh-calendar-workday-bg: rgba(245, 158, 11, 0.12);
  --yh-calendar-workday-border: rgba(245, 158, 11, 0.25);
  /* Calendar 范围选择 */
  --yh-calendar-range-bg: rgba(59, 130, 246, 0.08);
  --yh-calendar-range-border: rgba(59, 130, 246, 0.2);
  /* Calendar 字体 */
  --yh-calendar-weekday-font-size: var(--yh-font-size-sm);
  --yh-calendar-weekday-color: var(--yh-text-color-secondary);
  --yh-calendar-day-font-size: 15px;
  --yh-calendar-day-color: var(--yh-text-color-primary);
  --yh-calendar-badge-font-size: 9px;
  /* Table 表格 */
  --yh-table-border-color: var(--yh-border-color-lighter);
  --yh-table-header-bg: var(--yh-fill-color-light);
  --yh-table-header-text-color: var(--yh-text-color-primary);
  --yh-table-header-font-weight: var(--yh-font-weight-semibold);
  --yh-table-row-bg: var(--yh-bg-color);
  --yh-table-row-hover-bg: var(--yh-fill-color-light);
  --yh-table-row-stripe-bg: var(--yh-fill-color-lighter);
  --yh-table-row-current-bg: var(--yh-color-primary-light-9);
  --yh-table-row-selected-bg: var(--yh-color-primary-light-8);
  --yh-table-row-success-bg: var(--yh-color-success-light-9);
  --yh-table-row-warning-bg: var(--yh-color-warning-light-9);
  --yh-table-text-color: var(--yh-text-color-regular);
  --yh-table-empty-text-color: var(--yh-text-color-secondary);
  --yh-table-font-size: var(--yh-font-size-base);
  --yh-table-cell-padding: 12px 0;
  --yh-table-cell-spacing: 12px;
  --yh-table-fixed-left-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, 0.15);
  --yh-table-fixed-right-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, 0.15);
  /* ==================== 边框基础 ==================== */
  --yh-border-width: 1px;
  --yh-border-style: solid;
  --yh-border: var(--yh-border-width) var(--yh-border-style) var(--yh-border-color);
  /* ==================== 断点系统 ==================== */
  --yh-breakpoint-xs: 0;
  --yh-breakpoint-sm: 576px;
  --yh-breakpoint-md: 768px;
  --yh-breakpoint-lg: 992px;
  --yh-breakpoint-xl: 1200px;
  --yh-breakpoint-xxl: 1400px;
  /* ==================== 字体系统扩展 ==================== */
  --yh-font-family-monospace:
    'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
  --yh-font-family-serif: Georgia, Cambria, 'Times New Roman', Times, serif;
  /* ==================== 无障碍/聚焦系统 ==================== */
  --yh-focus-ring-color: var(--yh-color-primary);
  --yh-focus-ring-width: 2px;
  --yh-focus-ring-offset: 2px;
  --yh-focus-ring-opacity: 0.2;
  --yh-focus-ring:
    0 0 0 var(--yh-focus-ring-offset) var(--yh-bg-color),
    0 0 0 calc(var(--yh-focus-ring-offset) + var(--yh-focus-ring-width)) var(--yh-focus-ring-color);
  /* 高对比度模式支持 */
  --yh-high-contrast-outline: 2px solid transparent;
  --yh-high-contrast-outline-offset: 2px;
  /* ==================== 滚动条样式 ==================== */
  --yh-scrollbar-width: 6px;
  --yh-scrollbar-thumb-color: var(--yh-text-color-disabled);
  --yh-scrollbar-thumb-hover-color: var(--yh-text-color-secondary);
  --yh-scrollbar-track-color: transparent;
  --yh-scrollbar-thumb-radius: 3px;
  /* ==================== 遮罩层 ==================== */
  --yh-mask-color: rgba(0, 0, 0, 0.5);
  --yh-mask-color-light: rgba(0, 0, 0, 0.3);
  --yh-mask-color-extra-light: rgba(0, 0, 0, 0.1);
}

/* ==================== 暗黑模式 ==================== */
html.dark {
  --yh-color-primary: #409eff;
  --yh-color-primary-light-3: #3375b9;
  --yh-color-primary-light-5: #2a598a;
  --yh-color-primary-light-7: #213d5b;
  --yh-color-primary-light-9: #18222c;
  --yh-color-primary-dark-2: #66b1ff;
  --yh-color-success: #67c23a;
  --yh-color-success-light-3: #4e8e2f;
  --yh-color-success-light-5: #3e6b27;
  --yh-color-success-light-7: #2d481f;
  --yh-color-success-light-9: #1d2518;
  --yh-color-warning: #e6a23c;
  --yh-color-warning-light-3: #a77730;
  --yh-color-warning-light-5: #7d5b28;
  --yh-color-warning-light-7: #533f20;
  --yh-color-warning-light-9: #292218;
  --yh-color-danger: #f56c6c;
  --yh-color-danger-light-3: #b25252;
  --yh-color-danger-light-5: #854040;
  --yh-color-danger-light-7: #582e2e;
  --yh-color-danger-light-9: #2b1d1d;
  --yh-color-info: #909399;
  --yh-color-info-light-3: #6b6d71;
  --yh-color-info-light-5: #525457;
  --yh-color-info-light-7: #393b3e;
  --yh-color-info-light-9: #202124;
  --yh-text-color-primary: #e5eaf3;
  --yh-text-color-regular: #cfd3dc;
  --yh-text-color-secondary: #a3a6ad;
  --yh-text-color-placeholder: #8d9095;
  --yh-text-color-disabled: #6c6e72;
  --yh-border-color: #4c4d4f;
  --yh-border-color-light: #414243;
  --yh-border-color-lighter: #363637;
  --yh-border-color-extra-light: #2b2b2c;
  --yh-border-color-dark: #58585b;
  --yh-border-color-darker: #636466;
  --yh-fill-color: #303030;
  --yh-fill-color-light: #262727;
  --yh-fill-color-lighter: #1d1d1d;
  --yh-fill-color-extra-light: #191919;
  --yh-fill-color-dark: #39393a;
  --yh-fill-color-darker: #424243;
  --yh-fill-color-blank: transparent;
  --yh-bg-color: #141414;
  --yh-bg-color-page: #0a0a0a;
  --yh-bg-color-overlay: #1d1e1f;
  /* 组件暗色模式覆盖 */
  --yh-message-bg-color: var(--yh-bg-color-overlay);
  --yh-message-border-color: var(--yh-border-color-lighter);
  --yh-notification-bg-color: var(--yh-bg-color-overlay);
  --yh-notification-border-color: var(--yh-border-color-lighter);
  --yh-badge-border-color: var(--yh-bg-color);
  --yh-card-bg-color: var(--yh-bg-color-overlay);
  --yh-card-border-color: var(--yh-border-color-lighter);
  /* Calendar 暗黑模式 */
  --yh-calendar-bg: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  --yh-calendar-border-color: rgba(255, 255, 255, 0.08);
  --yh-calendar-header-bg: rgba(30, 30, 30, 0.95);
  --yh-calendar-header-border: rgba(255, 255, 255, 0.06);
  --yh-calendar-day-color: var(--yh-text-color-primary);
  --yh-calendar-weekday-color: var(--yh-text-color-secondary);
  --yh-calendar-selected-bg: linear-gradient(
    135deg,
    rgba(59, 130, 246, 0.2) 0%,
    rgba(59, 130, 246, 0.1) 100%
  );
  /* Table 暗黑模式 */
  --yh-table-border-color: var(--yh-border-color-lighter);
  --yh-table-header-bg: var(--yh-fill-color-dark);
  --yh-table-header-text-color: var(--yh-text-color-primary);
  --yh-table-row-bg: var(--yh-bg-color);
  --yh-table-row-hover-bg: var(--yh-fill-color);
  --yh-table-row-stripe-bg: var(--yh-fill-color-light);
  --yh-table-row-current-bg: var(--yh-color-primary-light-9);
  --yh-table-row-selected-bg: var(--yh-color-primary-light-9);
  --yh-table-row-success-bg: var(--yh-color-success-light-9);
  --yh-table-row-warning-bg: var(--yh-color-warning-light-9);
  --yh-table-fixed-left-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, 0.3);
  --yh-table-fixed-right-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, 0.3);
  /* 遮罩层暗黑模式 */
  --yh-mask-color: rgba(0, 0, 0, 0.7);
  --yh-mask-color-light: rgba(0, 0, 0, 0.5);
  --yh-mask-color-extra-light: rgba(0, 0, 0, 0.3);
  /* 滚动条暗黑模式 */
  --yh-scrollbar-thumb-color: var(--yh-fill-color-darker);
  --yh-scrollbar-thumb-hover-color: var(--yh-text-color-placeholder);
}

/* ==================== 减少动画偏好支持 ==================== */
@media (prefers-reduced-motion: reduce) {
  :root,
  html.dark {
    --yh-duration-fast: 0ms;
    --yh-duration-base: 0ms;
    --yh-duration-slow: 0ms;
    --yh-transition-base: none;
    --yh-transition-fast: none;
    --yh-transition-slow: none;
  }
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
/* ==================== 高对比度模式支持 ==================== */
@media (prefers-contrast: high) {
  :root {
    --yh-border-color: #000000;
    --yh-border-color-light: #333333;
    --yh-text-color-primary: #000000;
    --yh-text-color-regular: #1a1a1a;
    --yh-focus-ring-width: 3px;
    --yh-focus-ring-color: #000000;
  }
  html.dark {
    --yh-border-color: #ffffff;
    --yh-border-color-light: #cccccc;
    --yh-text-color-primary: #ffffff;
    --yh-text-color-regular: #e5e5e5;
    --yh-focus-ring-color: #ffffff;
  }
}
/* ==================== 强制颜色模式支持 (Windows 高对比度) ==================== */
@media (forced-colors: active) {
  :root {
    --yh-color-primary: LinkText;
    --yh-border-color: ButtonBorder;
    --yh-bg-color: Canvas;
    --yh-text-color-primary: CanvasText;
    --yh-focus-ring-color: Highlight;
  }
}
.yh-ai-bubble {
  --yh-ai-bubble-user-bg: var(--yh-color-primary);
  --yh-ai-bubble-user-color: var(--yh-color-white);
  --yh-ai-bubble-assistant-bg: var(--yh-fill-color-light);
  --yh-ai-bubble-assistant-color: var(--yh-text-color-primary);
  --yh-ai-bubble-border-radius: 12px;
  display: flex;
  margin-bottom: var(--yh-spacing-lg);
  gap: var(--yh-spacing-md);
  animation: yh-fade-in-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  /* Placement */
}
.yh-ai-bubble--placement-start {
  flex-direction: row;
}
.yh-ai-bubble--placement-start .yh-ai-bubble__content-wrapper {
  align-items: flex-start;
}

.yh-ai-bubble--placement-end {
  flex-direction: row-reverse;
}
.yh-ai-bubble--placement-end .yh-ai-bubble__content-wrapper {
  align-items: flex-end;
}

.yh-ai-bubble__avatar {
  flex-shrink: 0;
}

.yh-ai-bubble__content-wrapper {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  max-width: 85%;
}

.yh-ai-bubble__header {
  font-size: 12px;
  color: var(--yh-text-color-placeholder);
  display: flex;
  align-items: center;
  gap: 8px;
}

.yh-ai-bubble__time {
  opacity: 0.8;
}

.yh-ai-bubble__body {
  line-height: 1.6;
  word-break: break-word;
  border-radius: var(--yh-ai-bubble-border-radius);
  transition: all 0.3s;
  overflow: hidden;
  padding: 12px 16px;
  position: relative;
  border: 1px solid transparent;
}
.yh-ai-bubble__body.is-typing .yh-ai-bubble__text {
  position: relative;
  display: inline-block;
}
.yh-ai-bubble__body.is-typing .yh-ai-bubble__text::after {
  content: "▋";
  margin-left: 2px;
  color: var(--yh-color-primary);
  animation: yh-cursor-blink 1s infinite;
}

.yh-ai-bubble__body.is-typing .yh-ai-bubble__markdown > p:last-child {
  position: relative;
  display: inline-block;
}
.yh-ai-bubble__body.is-typing .yh-ai-bubble__markdown > p:last-child::after {
  content: "▋";
  margin-left: 2px;
  color: var(--yh-color-primary);
  animation: yh-cursor-blink 1s infinite;
}
.yh-ai-bubble__body.is-typing::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(var(--yh-color-primary-rgb), 0.05), transparent);
  background-size: 200% 100%;
  animation: yh-ripple-light 2s infinite linear;
  pointer-events: none;
  z-index: 5;
  border-radius: inherit;
}

.yh-ai-bubble__body {
  /* Theme-specific adjustments for quality */
}
:html.dark .yh-ai-bubble__body {
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.05);
}

.yh-ai-bubble {
  /* Shape Modifiers */
}
.yh-ai-bubble--shape-corner.yh-ai-bubble--placement-start .yh-ai-bubble__body {
  border-top-left-radius: 2px;
}

.yh-ai-bubble--shape-corner.yh-ai-bubble--placement-end .yh-ai-bubble__body {
  border-top-right-radius: 2px;
}

.yh-ai-bubble--shape-round .yh-ai-bubble__body {
  border-radius: 24px;
  padding: 12px 20px;
}

.yh-ai-bubble {
  /* Variant Modifiers */
}
.yh-ai-bubble--variant-filled.yh-ai-bubble--user .yh-ai-bubble__body {
  background-color: var(--yh-ai-bubble-user-bg);
  color: var(--yh-ai-bubble-user-color);
}

.yh-ai-bubble--variant-filled.yh-ai-bubble--assistant .yh-ai-bubble__body {
  background-color: var(--yh-ai-bubble-assistant-bg);
  color: var(--yh-ai-bubble-assistant-color);
  border-color: var(--yh-border-color-extra-light);
}

.yh-ai-bubble--variant-outlined .yh-ai-bubble__body {
  background-color: transparent;
  border: 1px solid var(--yh-border-color);
  color: var(--yh-text-color-primary);
}

.yh-ai-bubble--variant-outlined.yh-ai-bubble--user .yh-ai-bubble__body {
  border-color: var(--yh-color-primary);
}

.yh-ai-bubble--variant-shadow .yh-ai-bubble__body {
  background-color: var(--yh-bg-color-overlay);
  color: var(--yh-text-color-primary);
  box-shadow: var(--yh-shadow-md);
}

.yh-ai-bubble__text {
  white-space: pre-wrap;
}

.yh-ai-bubble__markdown {
  white-space: normal;
}
.yh-ai-bubble__markdown p {
  margin: 0 0 8px 0;
}
.yh-ai-bubble__markdown p:last-child {
  margin-bottom: 0;
}
.yh-ai-bubble__markdown p:last-child {
  margin-bottom: 0;
}
.yh-ai-bubble__markdown {
  /* 学术脚注气泡角标样式 */
}
.yh-ai-bubble__markdown .yh-ai-citation {
  color: var(--yh-color-primary);
  background-color: var(--yh-color-primary-light-9);
  border: 1px solid var(--yh-color-primary-light-5);
  font-size: 11px;
  font-family: ui-monospace, SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
  padding: 0 4px;
  margin: 0 2px;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  transition: all var(--yh-transition-duration-fast) ease;
  vertical-align: super;
}
.yh-ai-bubble__markdown .yh-ai-citation:hover {
  background-color: var(--yh-color-primary);
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(var(--yh-color-primary-rgb), 0.3);
}
.yh-ai-bubble__markdown pre {
  background: #282c34;
  color: #abb2bf;
  padding: 12px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 12px 0;
}
.yh-ai-bubble__markdown code {
  background: rgba(127, 127, 127, 0.15);
  padding: 2px 4px;
  border-radius: 4px;
  font-size: 0.9em;
}

.yh-ai-bubble {
  /* Code Output - 流式输出样式 */
}
.yh-ai-bubble .code-output {
  background: #1e1e1e;
  border-top: 1px solid #3e3e3e;
  padding: 12px;
  border-radius: 0 0 8px 8px;
  margin-top: -8px;
  font-family: "SF Mono", "Fira Code", Consolas, monospace;
  font-size: 13px;
  line-height: 1.6;
  color: #d4d4d4;
  max-height: 300px;
  overflow-y: auto;
}
.yh-ai-bubble .code-output pre {
  margin: 0;
  padding: 0;
  background: transparent;
  color: inherit;
  white-space: pre-wrap;
  word-break: break-all;
}
.yh-ai-bubble .code-output .output-prefix {
  color: #569cd6;
  display: block;
  margin-bottom: 4px;
}
.yh-ai-bubble .code-output .output-return {
  color: #c586c0;
  display: block;
  margin-top: 8px;
  font-style: italic;
}
.yh-ai-bubble .code-output .output-success {
  color: #4ec9b0;
  display: block;
  margin-top: 8px;
}
.yh-ai-bubble .code-output .output-error {
  color: #f14c4c;
  display: block;
  margin-top: 8px;
}
.yh-ai-bubble .code-output .output-warning {
  color: #cca700;
  display: block;
}
.yh-ai-bubble {
  /* Multimodal: Image Grid */
}
.yh-ai-bubble__image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 8px;
  margin-bottom: 12px;
  width: 100%;
}

.yh-ai-bubble__image-item {
  aspect-ratio: 1;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--yh-border-color-lighter);
}
.yh-ai-bubble__image-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
  cursor: zoom-in;
}
.yh-ai-bubble__image-item img:hover {
  transform: scale(1.05);
}

.yh-ai-bubble {
  /* Multimodal: Assets (Audio, Files) */
}
.yh-ai-bubble__multimodal-assets {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.yh-ai-bubble__audio-player {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  background: rgba(0, 0, 0, 0.03);
  border-radius: 20px;
  width: fit-content;
  min-width: 200px;
  border: 1px solid var(--yh-border-color-extra-light);
}
:html.dark .yh-ai-bubble__audio-player {
  background: rgba(255, 255, 255, 0.05);
}

.yh-ai-bubble__audio-waveform {
  display: flex;
  align-items: center;
  gap: 2px;
  height: 16px;
  flex: 1;
}
.yh-ai-bubble__audio-waveform span {
  width: 2px;
  height: 60%;
  background: currentColor;
  border-radius: 1px;
  opacity: 0.4;
  animation: yh-waveform 1.2s ease-in-out infinite;
  animation-play-state: paused;
  animation-delay: var(--delay);
}
.is-active .yh-ai-bubble__audio-waveform span {
  animation-play-state: running;
  opacity: 0.8;
}

.yh-ai-bubble__audio-duration {
  font-size: 12px;
  opacity: 0.7;
  font-family: var(--yh-font-family-mono);
}

.yh-ai-bubble__file-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  background: var(--yh-bg-color-overlay);
  border: 1px solid var(--yh-border-color-lighter);
  border-radius: 10px;
  transition: all 0.2s;
}
.yh-ai-bubble__file-card:hover {
  border-color: var(--yh-color-primary);
  box-shadow: var(--yh-shadow-sm);
}

.yh-ai-bubble__file-icon {
  width: 36px;
  height: 36px;
  background: var(--yh-fill-color-light);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--yh-color-primary);
  font-size: 20px;
}

.yh-ai-bubble__file-info {
  flex: 1;
  min-width: 0;
}

.yh-ai-bubble__file-name {
  font-size: 13px;
  font-weight: 500;
  color: var(--yh-text-color-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.yh-ai-bubble__file-meta {
  font-size: 11px;
  color: var(--yh-text-color-placeholder);
  margin-top: 2px;
}

.yh-ai-bubble {
  /* Citations Section - Correctly placed */
}
.yh-ai-bubble__citations {
  margin-top: var(--yh-spacing-md);
  padding-top: var(--yh-spacing-sm);
  border-top: 1px solid var(--yh-border-color-lighter);
  display: flex;
  flex-direction: column;
  gap: var(--yh-spacing-xs);
}

.yh-ai-bubble__citations-title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--yh-text-color-secondary);
  font-weight: 500;
}

.yh-ai-bubble__citations-count {
  background: var(--yh-fill-color-light);
  padding: 0 6px;
  border-radius: 10px;
  font-size: 11px;
  margin-left: 4px;
}

.yh-ai-bubble__citations-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.yh-ai-bubble__citation-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px 4px 6px;
  background: var(--yh-bg-color-overlay);
  border: 1px solid var(--yh-border-color-lighter);
  border-radius: 6px;
  font-size: 12px;
  text-decoration: none;
  color: var(--yh-text-color-primary);
  max-width: 220px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.yh-ai-bubble__citation-item:hover {
  background: var(--yh-fill-color-light);
  border-color: var(--yh-color-primary-light-5);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
.yh-ai-bubble__citation-item:hover .yh-ai-bubble__citation-index {
  background: var(--yh-color-primary);
  color: white;
}

.yh-ai-bubble__citation-index {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 16px;
  height: 16px;
  background: var(--yh-fill-color-dark);
  border-radius: 4px;
  font-size: 10px;
  font-weight: bold;
  color: var(--yh-text-color-secondary);
}

.yh-ai-bubble__citation-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  opacity: 0.9;
}

.yh-ai-bubble__typing-indicator {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.yh-ai-bubble__typing-indicator span {
  width: 4px;
  height: 4px;
  background-color: currentColor;
  border-radius: 50%;
  animation: yh-typing-bounce 1.4s infinite ease-in-out both;
}
.yh-ai-bubble__typing-indicator span:nth-child(1) {
  animation-delay: -0.32s;
}
.yh-ai-bubble__typing-indicator span:nth-child(2) {
  animation-delay: -0.16s;
}

.yh-ai-bubble__footer {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
  font-size: 12px;
}

@keyframes yh-typing-bounce {
  0%, 80%, 100% {
    transform: scale(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}
@keyframes yh-waveform {
  0%, 100% {
    height: 40%;
  }
  50% {
    height: 100%;
  }
}
@keyframes yh-fade-in-up {
  0% {
    opacity: 0;
    transform: translateY(10px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
@keyframes yh-cursor-blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
@keyframes yh-ripple-light {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
/* 引用专属独立悬浮卡片 (Teleported 到 Body) */
.yh-ai-bubble__citation-tooltip-wrapper {
  position: fixed;
  padding-bottom: 10px;
  z-index: 9999;
  pointer-events: auto;
}
.yh-ai-bubble__citation-tooltip-wrapper .yh-ai-bubble__citation-tooltip {
  min-width: 260px;
  max-width: 380px;
  background: var(--yh-bg-color-overlay, #ffffff);
  border: 1px solid var(--yh-border-color-light, #ebeef5);
  border-radius: var(--yh-border-radius-large, 8px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  padding: 12px 16px;
  position: relative;
}
.yh-ai-bubble__citation-tooltip-wrapper .yh-ai-bubble__citation-tooltip::after {
  content: "";
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  width: 12px;
  height: 12px;
  background: inherit;
  border-right: 1px solid var(--yh-border-color-light, #ebeef5);
  border-bottom: 1px solid var(--yh-border-color-light, #ebeef5);
}
.yh-ai-bubble__citation-tooltip-wrapper .yh-ai-bubble__citation-tooltip-header {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;
  color: var(--yh-text-color-secondary, #909399);
  font-size: 12px;
  font-weight: 500;
}
.yh-ai-bubble__citation-tooltip-wrapper .yh-ai-bubble__citation-tooltip-body h4 {
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
  color: var(--yh-text-color-primary, #303133);
}

.yh-fade-in-scale-up-enter-active,
.yh-fade-in-scale-up-leave-active {
  transition: opacity 0.2s cubic-bezier(0.23, 1, 0.32, 1), transform 0.2s cubic-bezier(0.23, 1, 0.32, 1);
  transform-origin: bottom center;
}

.yh-fade-in-scale-up-enter-from,
.yh-fade-in-scale-up-leave-to {
  opacity: 0;
  transform: translate(-50%, -85%) scale(0.95) !important;
}

.code-block-wrapper {
  margin: 12px 0;
  border-radius: 8px;
  overflow: hidden;
  background: #282c34;
}
.code-block-wrapper .code-block-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: #21252b;
}
.code-block-wrapper .code-block-header .code-lang {
  font-size: 12px;
  color: #abb2bf;
  text-transform: uppercase;
}
.code-block-wrapper .code-block-header .code-actions {
  display: flex;
  gap: 8px;
}
.code-block-wrapper .code-block-header .code-actions .code-action-btn {
  padding: 4px 8px;
  font-size: 11px;
  color: #abb2bf;
  background: transparent;
  border: 1px solid #3e4451;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}
.code-block-wrapper .code-block-header .code-actions .code-action-btn:hover {
  background: #3e4451;
  color: #fff;
}
.code-block-wrapper .code-block-header .code-actions .code-action-btn.copy-btn.copied {
  color: #98c379;
  border-color: #98c379;
}
.code-block-wrapper .code-block-header .code-actions .code-action-btn.run-btn.running {
  color: #61afef;
  border-color: #61afef;
}
.code-block-wrapper .code-block-body {
  padding: 12px;
  overflow-x: auto;
}
.code-block-wrapper .code-block-body.collapsed {
  max-height: 200px;
  overflow: hidden;
  position: relative;
}
.code-block-wrapper .code-block-body.collapsed::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px;
  background: linear-gradient(transparent, #282c34);
}
.code-block-wrapper .code-block-body pre {
  margin: 0;
  font-family: "Fira Code", "Consolas", monospace;
  font-size: 13px;
  line-height: 1.5;
}
.code-block-wrapper .code-block-body code {
  font-family: inherit;
}
.code-block-wrapper .code-output {
  padding: 12px;
  background: #1e1e1e;
  border-top: 1px solid #3e4451;
}
.code-block-wrapper .code-output pre {
  margin: 0;
  color: #d4d4d4;
  font-size: 12px;
}

.mermaid-block {
  margin: 16px 0;
  padding: 16px;
  background: #fafafa;
  border-radius: 8px;
  text-align: center;
}
.mermaid-block .mermaid-rendered svg {
  max-width: 100%;
  height: auto;
}
.mermaid-block .mermaid-error {
  color: #e74c3c;
  text-align: left;
  font-size: 12px;
}

.structured-data {
  margin: 12px 0;
}
.structured-data .json-viewer {
  background: #282c34;
  border-radius: 8px;
  padding: 12px;
  overflow-x: auto;
}
.structured-data .json-viewer pre {
  margin: 0;
  color: #abb2bf;
  font-size: 13px;
  font-family: "Fira Code", monospace;
}
.structured-data .table-viewer {
  overflow-x: auto;
}
.structured-data .table-viewer table {
  width: 100%;
  border-collapse: collapse;
}
.structured-data .table-viewer table th,
.structured-data .table-viewer table td {
  padding: 8px 12px;
  border: 1px solid var(--yh-border-color-light);
  text-align: left;
}
.structured-data .table-viewer table th {
  background: var(--yh-bg-color-page);
  font-weight: 600;
}
.structured-data .thought-chain {
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
  padding-left: 8px;
}
.structured-data .thought-chain .thought-step {
  display: flex;
  gap: 12px;
  position: relative;
  padding-bottom: 12px;
}
.structured-data .thought-chain .thought-step:last-child {
  padding-bottom: 0;
}
.structured-data .thought-chain .thought-step .thought-index {
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--yh-color-primary);
  color: #fff;
  font-size: 11px;
  font-weight: 600;
  flex-shrink: 0;
  margin-top: 4px;
}
.structured-data .thought-chain .thought-step::before {
  content: "";
  position: absolute;
  left: 8px;
  top: 20px;
  bottom: 0;
  width: 2px;
  background: var(--yh-border-color-lighter);
}
.structured-data .thought-chain .thought-step:last-child::before {
  bottom: 18px;
}
.structured-data .thought-chain .thought-step .thought-content {
  flex: 1;
  background: var(--yh-fill-color-light);
  border-radius: 6px;
  padding: 8px 10px;
}
.structured-data .thought-chain .thought-step .thought-content .thought-title {
  font-weight: 600;
  margin-bottom: 4px;
  font-size: 13px;
}
.structured-data .thought-chain .thought-step .thought-content .thought-text {
  font-size: 13px;
  color: var(--yh-text-color-secondary);
  white-space: pre-wrap;
}

.citation-tooltip-wrapper .citation-tooltip {
  max-width: 320px;
  padding: 12px;
  background: var(--yh-bg-color);
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}
.citation-tooltip-wrapper .citation-tooltip .citation-tooltip-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 12px;
  color: var(--yh-text-color-secondary);
}
.citation-tooltip-wrapper .citation-tooltip .citation-tooltip-body h4 {
  margin: 0 0 8px;
  font-size: 14px;
  font-weight: 600;
}
.citation-tooltip-wrapper .citation-tooltip .citation-tooltip-body p {
  margin: 0;
  font-size: 13px;
  color: var(--yh-text-color-secondary);
  line-height: 1.5;
}
.citation-tooltip-wrapper .citation-tooltip .citation-tooltip-body .publish-time {
  display: block;
  margin-top: 8px;
  font-size: 11px;
  color: var(--yh-text-color-disabled);
}

.code-edit-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
}
.code-edit-modal-overlay .code-edit-modal {
  width: 80%;
  max-width: 800px;
  background: var(--yh-bg-color);
  border-radius: 12px;
  overflow: hidden;
}
.code-edit-modal-overlay .code-edit-modal .code-edit-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid var(--yh-border-color-light);
}
.code-edit-modal-overlay .code-edit-modal .code-edit-header h3 {
  margin: 0;
  font-size: 16px;
}
.code-edit-modal-overlay .code-edit-modal .code-edit-body {
  padding: 16px;
}
.code-edit-modal-overlay .code-edit-modal .code-edit-body textarea {
  width: 100%;
  padding: 12px;
  font-family: "Fira Code", monospace;
  font-size: 13px;
  border: 1px solid var(--yh-border-color);
  border-radius: 8px;
  resize: vertical;
  background: #282c34;
  color: #abb2bf;
}
.code-edit-modal-overlay .code-edit-modal .code-edit-body textarea:focus {
  outline: none;
  border-color: var(--yh-color-primary);
}
.code-edit-modal-overlay .code-edit-modal .code-edit-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 16px;
  border-top: 1px solid var(--yh-border-color-light);
}
</style>
