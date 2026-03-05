import { WebContainer } from '@webcontainer/api'

interface WebContainerGlobal {
  __webcontainer_promise__?: Promise<WebContainer>
}

const getWebContainerInstance = async () => {
  const globalThisAny = globalThis as WebContainerGlobal
  if (!globalThisAny.__webcontainer_promise__) {
    globalThisAny.__webcontainer_promise__ = WebContainer.boot()
  }
  return globalThisAny.__webcontainer_promise__ as Promise<WebContainer>
}

export { getWebContainerInstance }
export { WebContainer }
