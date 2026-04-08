import { Loading } from "./src/service.mjs";
import { vLoading } from "./src/directive.mjs";
export const YhLoading = {
  ...Loading,
  directive: vLoading,
  install(app) {
    app.config.globalProperties.$loading = Loading.service;
    app.directive("yh-loading", vLoading);
  }
};
export const vYhLoading = vLoading;
export default YhLoading;
export * from "./src/service.mjs";
export * from "./src/directive.mjs";
import "./src/loading.css";
