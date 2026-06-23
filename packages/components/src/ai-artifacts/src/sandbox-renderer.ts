/**
 * Generates self-contained HTML for the Vue SFC sandbox iframe.
 *
 * Key design decisions:
 * - All yh-ui deps (icons, dayjs, floating-ui, etc.) are resolved automatically
 *   by esm.sh when loading @yh-ui/yh-ui with ?external=vue, so the importmap
 *   only needs a `vue` entry.  This avoids manually chasing every transitive
 *   external as the library grows.
 * - The HTML is turned into a Blob URL by the component, so there is no
 *   dependency on any server-side path (works in consumer apps too).
 * - The yhUiUrl can be overridden so docs / consumer apps can point to a
 *   locally-hosted bundle instead of the CDN version.
 */

export const DEFAULT_SANDBOX_YH_UI_URL = 'https://esm.sh/@yh-ui/yh-ui?external=vue'

export const DEFAULT_SANDBOX_YH_UI_CSS_URL = 'https://unpkg.com/@yh-ui/yh-ui/dist/style.css'

/** CDN urls – kept as constants so they're easy to pin / upgrade */
const VUE_CDN = 'https://unpkg.com/vue@3.5.27/dist/vue.esm-browser.js'
const SFC_LOADER_CDN = 'https://unpkg.com/vue3-sfc-loader@0.9.5/dist/vue3-sfc-loader.js'

export function createSandboxHtml(options: { yhUiUrl: string; yhUiCssUrl: string }): string {
  const { yhUiUrl, yhUiCssUrl } = options

  // NOTE: This is a plain .ts file – no SFC parsing, so literal </script>
  // tags inside string values are perfectly safe here.
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script>
    const pathSegments = window.parent.location.pathname.split('/');
    const baseIndex = pathSegments.indexOf('yh-ui');
    const subpath = baseIndex !== -1 ? '/' + pathSegments.slice(1, baseIndex + 1).join('/') + '/' : '/';
    document.write('<base href="' + window.parent.location.origin + subpath + '">');
  </script>
  <link rel="stylesheet" href="${yhUiCssUrl}">
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      background-color: var(--yh-ai-artifacts-bg-color, #ffffff);
      color: var(--yh-text-color-primary, #303133);
      min-height: 100vh;
      overflow-x: hidden;
    }
    #app { padding: 20px; box-sizing: border-box; }
    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      color: #909399;
      font-size: 14px;
    }
    .loading-spinner {
      width: 28px;
      height: 28px;
      border: 3px solid #ebeef5;
      border-top-color: #409eff;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      margin-bottom: 12px;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
  </style>

  <!-- importmap: only vue needs to be listed; esm.sh bundles all other deps -->
  <script type="importmap">
  {
    "imports": {
      "vue": "${VUE_CDN}"
    }
  }
  </script>

  <!-- vue3-sfc-loader provides runtime SFC compilation (UMD, global) -->
  <script src="${SFC_LOADER_CDN}"></script>
</head>
<body>
  <div id="app">
    <div class="loading-container">
      <div class="loading-spinner"></div>
      <p>正在编译并渲染组件...</p>
    </div>
  </div>

  <script>
    // Polyfill process for libraries checking process.env.NODE_ENV
    window.process = { env: { NODE_ENV: 'development' } };
  </script>

  <script type="module">
    import * as Vue from 'vue';
    window.Vue = Vue;

    // yhUiUrl is baked in at Blob-creation time; esm.sh auto-bundles all
    // transitive deps (@yh-ui/icons, dayjs, @floating-ui/dom, etc.)
    // Use dynamic import and handle both default export (CDN) and named exports (local bundle)
    const yhUiModule = await import('${yhUiUrl}');
    const YhUi = yhUiModule.default || { install: yhUiModule.install };

    let currentApp = null;

    window.addEventListener('message', async (event) => {
      const { type, code } = event.data || {};
      if (type !== 'render-vue' || !code) return;

      try {
        if (currentApp) {
          currentApp.unmount();
          currentApp = null;
        }

        const { loadModule } = window['vue3-sfc-loader'];
        const loaderOptions = {
          moduleCache: { vue: Vue },
          async getFile(url) {
            if (url === 'App.vue') return code;
            return '';
          },
          addStyle(styleStr) {
            const el = document.createElement('style');
            el.textContent = styleStr;
            document.head.appendChild(el);
          }
        };

        const component = await loadModule('App.vue', loaderOptions);
        const app = Vue.createApp(component);
        app.use(YhUi);

        // Replace loading indicator
        document.getElementById('app').innerHTML = '';
        app.mount('#app');
        currentApp = app;
      } catch (err) {
        document.getElementById('app').innerHTML =
          '<div style="padding:20px;color:#f56c6c;border:1px solid #fde2e2;' +
          'background:#fef0f0;border-radius:8px;font-family:monospace;' +
          'white-space:pre-wrap;font-size:13px;line-height:1.6;">' +
          '<h3 style="margin-top:0;margin-bottom:10px;">编译/渲染失败:</h3>' +
          '<div>' + (err.stack || err.message || String(err)) + '</div></div>';
      }
    });

    // Tell the parent that we are ready to receive code
    window.parent.postMessage({ type: 'renderer-ready' }, '*');
  </script>
</body>
</html>`
}
