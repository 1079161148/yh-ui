import { describe, it, expect } from 'vitest'
import { resolve } from 'path'
import { existsSync } from 'fs'
import { createRequire } from 'module'

const requireFn = createRequire(import.meta.url)

// These tests verify that built dist artifacts can be loaded in Node.js.
// They are intentionally skipped when the dist has not been built yet
// (e.g. in the validate-tests CI job which runs before build).
// They run automatically when dist/ exists (i.e. after `pnpm build`).

const componentsNodeMjsPath = resolve(__dirname, '../../components/dist/index.node.mjs')
const componentsNodeCjsPath = resolve(__dirname, '../../components/dist/index.node.cjs')
const mainMjsPath = resolve(__dirname, '../dist/index.mjs')

const distExists = existsSync(componentsNodeMjsPath)

describe.skipIf(!distExists)('@yh-ui/yh-ui Node ESM/SSR runtime entry points', () => {
  it('should successfully import the built components Node ESM entry without syntax/file-extension errors', async () => {
    const mod = await import(componentsNodeMjsPath)
    expect(mod).toBeTruthy()
    expect(typeof mod).toBe('object')
  }, 20000)

  it('should successfully require the built components Node CommonJS entry', () => {
    const mod = requireFn(componentsNodeCjsPath)
    expect(mod).toBeTruthy()
    expect(typeof mod).toBe('object')
  })

  it('should successfully import the built main entry which aggregates the packages', async () => {
    const mod = await import(mainMjsPath)
    expect(mod).toBeTruthy()
    expect(typeof mod).toBe('object')
    expect(mod.createYhUI).toBeTruthy()
  }, 20000)
})
