import components__default from '@yh-ui/components';
export * from '@yh-ui/components';
export * from '@yh-ui/hooks';
export * from '@yh-ui/utils';
export { hexToRgb, rgbToHex } from '@yh-ui/utils';
export * from '@yh-ui/theme';
export * from '@yh-ui/locale';
export { en, zhCn } from '@yh-ui/locale';

const createYhUI = (options = {}) => {
  return {
    install(app) {
      app.use(components__default);
      app.provide("yh-ui-options", options);
    }
  };
};
const install = (app, options) => {
  app.use(createYhUI(options));
};
const index = {
  install,
  createYhUI
};
const version = "0.1.10";

export { createYhUI, index as default, install, version };
