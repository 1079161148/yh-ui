import crypto from 'node:crypto'

// Polyfill crypto.hash for Node.js < 18.20 / 20.12 / 21.7
if (typeof (crypto as any).hash !== 'function') {
  ;(crypto as any).hash = (
    algorithm: string,
    data: string | Buffer,
    outputEncoding: any = 'hex'
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
