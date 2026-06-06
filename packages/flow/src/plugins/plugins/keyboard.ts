import type { FlowInstance, FlowPlugin } from '../plugin'

export interface KeyboardOptions {
  enabled?: boolean
  delete?: boolean
  backspace?: boolean
  ctrlZ?: boolean
  ctrlY?: boolean
  escape?: boolean
}

const defaultOptions: Required<KeyboardOptions> = {
  enabled: true,
  delete: true,
  backspace: true,
  ctrlZ: true,
  ctrlY: true,
  escape: true
}

export function createKeyboardPlugin(options: KeyboardOptions = {}): FlowPlugin {
  const mergedOptions = { ...defaultOptions, ...options }

  return {
    id: 'keyboard',
    name: 'Keyboard',
    install(_flow: FlowInstance) {
      console.log('Keyboard plugin installed', mergedOptions)
    }
  }
}
