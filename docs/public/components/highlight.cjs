"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const KNOWN_LANGUAGES = /* @__PURE__ */new Set(["bash", "c", "cpp", "css", "go", "html", "java", "javascript", "json", "jsx", "markdown", "md", "plaintext", "python", "rust", "shell", "sql", "text", "ts", "tsx", "typescript", "vue", "xml", "yaml", "yml"]);
const escapeHtml = value => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
const normalizeLanguage = language => {
  if (!language) return "";
  const normalized = language.toLowerCase();
  if (normalized === "vue") return "html";
  if (normalized === "ts") return "typescript";
  if (normalized === "js") return "javascript";
  if (normalized === "sh") return "shell";
  if (normalized === "md") return "markdown";
  return normalized;
};
const render = code => ({
  value: escapeHtml(code)
});
const hljs = {
  getLanguage(language) {
    const normalized = normalizeLanguage(language);
    return normalized && KNOWN_LANGUAGES.has(normalized) ? normalized : void 0;
  },
  highlight(code, _options) {
    return render(code);
  },
  highlightAuto(code) {
    return render(code);
  }
};
module.exports = hljs;