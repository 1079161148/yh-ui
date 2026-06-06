import type { WebContainer } from '@webcontainer/api'

interface WebContainerGlobal {
  __webcontainer_promise__?: Promise<WebContainer>
}

const getWebContainerInstance = async () => {
  const globalThisAny = globalThis as WebContainerGlobal
  if (
    typeof window !== 'undefined' &&
    typeof window.crossOriginIsolated === 'boolean' &&
    !window.crossOriginIsolated
  ) {
    throw new Error('WebContainer 需要在 crossOriginIsolated 环境下运行')
  }
  if (!globalThisAny.__webcontainer_promise__) {
    const { WebContainer: WC } = await import('@webcontainer/api')
    globalThisAny.__webcontainer_promise__ = WC.boot()
  }
  return globalThisAny.__webcontainer_promise__ as Promise<WebContainer>
}

export { getWebContainerInstance }
export type { WebContainer }
