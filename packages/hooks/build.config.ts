import { defineBuildConfig } from 'unbuild'
import { resolve } from 'path'
import { build as esbuild } from 'esbuild'

export default defineBuildConfig({
  entries: [
    {
      builder: 'mkdist',
      input: './src',
      outDir: './dist',
      format: 'esm',
      ext: 'mjs',
      declaration: true,
      // 排除测试目录
      pattern: ['**/*.ts', '!**/__tests__/**']
    },
    {
      builder: 'mkdist',
      input: './src',
      outDir: './dist',
      format: 'cjs',
      ext: 'cjs',
      declaration: false,
      pattern: ['**/*.ts', '!**/__tests__/**']
    }
  ],
  declaration: true,
  clean: true,
  // 构建无警告则失败，保证产物质量
  failOnWarn: false, // 改为 false 以允许 build:done 钩子中 esbuild 的警告
  rollup: {
    emitCJS: true,
    cjsBridge: true,
    output: {
      exports: 'named'
    }
  },
  externals: ['vue', '@yh-ui/utils', '@yh-ui/locale', 'dayjs'],
  alias: {
    '@yh-ui/utils': resolve(__dirname, '../utils/src'),
    '@yh-ui/locale': resolve(__dirname, '../locale/src')
  },
  hooks: {
    /**
     * 在整个构建完成后，用 esbuild 将 dist/dayjs.mjs 和 dist/dayjs.cjs 重新打包，
     * 把 dayjs (CJS/UMD, 无 ESM default export) 内联进去，产物完全自包含。
     *
     * 根因：dayjs 只有 "main": "dayjs.min.js"，没有 ESM 入口。
     * mkdist 转译后 dayjs.mjs 里保留 `import dayjsObject from "dayjs"`，
     * 在未配置 optimizeDeps 的消费端 Vite 中浏览器直接加载 dayjs.min.js（CJS），
     * 报 "does not provide an export named 'default'"。
     * 内联后消费方零配置，彻底消除此报错。
     */
    async 'build:done'(_ctx) {
      const src = resolve(__dirname, 'src/dayjs.ts')
      await Promise.all([
        esbuild({
          entryPoints: [src],
          bundle: true, // 将 dayjs 内联，不保留裸 import
          format: 'esm',
          outfile: resolve(__dirname, 'dist/dayjs.mjs'),
          platform: 'neutral', // 兼容 SSR / Node
          mainFields: ['module', 'main'], // platform:neutral 不自动读 main 字段，须显式指定
          target: 'es2018',
          allowOverwrite: true,
          legalComments: 'eof' // 保留 dayjs MIT 许可证注释
        }),
        esbuild({
          entryPoints: [src],
          bundle: true,
          format: 'cjs',
          outfile: resolve(__dirname, 'dist/dayjs.cjs'),
          platform: 'neutral',
          mainFields: ['module', 'main'],
          target: 'es2018',
          allowOverwrite: true,
          legalComments: 'eof'
        })
      ])

      // Post-process CJS dayjs-locale files to replace `import.meta` with `undefined`
      const fs = await import('fs/promises')
      const targetCjs = resolve(__dirname, 'dist/use-locale/dayjs-locale.cjs')
      try {
        let content = await fs.readFile(targetCjs, 'utf8')
        if (content.includes('import.meta')) {
          content = content.replace(/typeof\s+import\.meta\.glob/g, 'typeof undefined')
          content = content.replace(/import\.meta\.glob/g, 'undefined')
          content = content.replace(/import\.meta/g, 'undefined')
          await fs.writeFile(targetCjs, content, 'utf8')
        }
      } catch {
        // Ignore if file doesn't exist
      }
    }
  }
})
