import { describe, it, expect } from 'vitest'
import { resolve } from 'path'
import { createRequire } from 'module'

const requireFn = createRequire(import.meta.url)

describe('@yh-ui/yh-ui Node ESM/SSR runtime entry points', () => {
  it('should successfully import the built components Node ESM entry without syntax/file-extension errors', async () => {
    const componentsNodeMjsPath = resolve(__dirname, '../../components/dist/index.node.mjs')
    const mod = await import(componentsNodeMjsPath)
    expect(mod).toBeTruthy()
    expect(typeof mod).toBe('object')
  })

  it('should successfully require the built components Node CommonJS entry', () => {
    const componentsNodeCjsPath = resolve(__dirname, '../../components/dist/index.node.cjs')
    const mod = requireFn(componentsNodeCjsPath)
    expect(mod).toBeTruthy()
    expect(typeof mod).toBe('object')
  })

  it('should successfully import the built main entry which aggregates the packages', async () => {
    const mainMjsPath = resolve(__dirname, '../dist/index.mjs')
    const mod = await import(mainMjsPath)
    expect(mod).toBeTruthy()
    expect(typeof mod).toBe('object')
    expect(mod.createYhUI).toBeTruthy()
  }, 20000)
})
