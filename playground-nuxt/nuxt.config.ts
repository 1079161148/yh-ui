import crypto from 'node:crypto'

// Polyfill crypto.hash for Node.js < 18.20 / 20.12 / 21.7
if (typeof (crypto as unknown as { hash: unknown }).hash !== 'function') {
  ;(
    crypto as unknown as {
      hash: (
        algorithm: string,
        data: string | Buffer,
        outputEncoding?: crypto.BinaryToTextEncoding
      ) => string | Buffer
    }
  ).hash = (
    algorithm: string,
    data: string | Buffer,
    outputEncoding: crypto.BinaryToTextEncoding = 'hex'
  ) => {
    return crypto.createHash(algorithm).update(data).digest(outputEncoding)
  }
}

import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: ['@yh-ui/nuxt'],

  yhUI: {
    importStyle: true
  },

  devtools: {
    enabled: true
  },

  compatibilityDate: '2024-01-23'
})
