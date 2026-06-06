import { describe, it, expect } from 'vitest'

describe('components entrypoints coverage', () => {
  it('should eagerly import every component entry index.ts', () => {
    const modules = import.meta.glob('../*/index.ts', { eager: true })

    // Sanity: this suite exists to prevent "index.ts = 0% coverage" regressions.
    expect(Object.keys(modules).length).toBeGreaterThan(20)

    for (const mod of Object.values(modules)) {
      expect(mod).toBeDefined()
    }
  })
})

