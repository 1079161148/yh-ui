import type { WebContainer } from '@webcontainer/api'

interface WebContainerGlobal {
  __webcontainer_promise__?: Promise<WebContainer>
}

const getWebContainerInstance = async () => {
  const globalThisAny = globalThis as WebContainerGlobal
  if (!globalThisAny.__webcontainer_promise__) {
    const { WebContainer: WC } = await import('@webcontainer/api')
    globalThisAny.__webcontainer_promise__ = WC.boot()
  }
  return globalThisAny.__webcontainer_promise__ as Promise<WebContainer>
}

export { getWebContainerInstance }
export type { WebContainer }
