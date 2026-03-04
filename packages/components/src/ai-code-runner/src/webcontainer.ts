import { WebContainer } from '@webcontainer/api'

const getWebContainerInstance = async () => {
  if (!(globalThis as any).__webcontainer_promise__) {
    ;(globalThis as any).__webcontainer_promise__ = WebContainer.boot()
  }
  return (globalThis as any).__webcontainer_promise__ as Promise<WebContainer>
}

export { getWebContainerInstance }
export { WebContainer }
