const getWebContainerInstance = async () => {
  const globalThisAny = globalThis;
  if (!globalThisAny.__webcontainer_promise__) {
    const { WebContainer: WC } = await import("@webcontainer/api");
    globalThisAny.__webcontainer_promise__ = WC.boot();
  }
  return globalThisAny.__webcontainer_promise__;
};
export { getWebContainerInstance };
