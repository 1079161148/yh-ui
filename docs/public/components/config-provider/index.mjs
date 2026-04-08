import { withInstall } from "@yh-ui/utils";
import ConfigProvider from "./src/config-provider.mjs";
export const YhConfigProvider = withInstall(ConfigProvider);
export default YhConfigProvider;
export * from "./src/config-provider.mjs";
export * from "./src/locale.mjs";
export { configProviderContextKey } from "@yh-ui/hooks";
