import components__default from '@yh-ui/components';
export * from '@yh-ui/components';
export * from '@yh-ui/hooks';
export * from '@yh-ui/utils';
export { hexToRgb, rgbToHex } from '@yh-ui/utils';
export * from '@yh-ui/theme';
export * from '@yh-ui/locale';
export { en, zhCn } from '@yh-ui/locale';

const version$1 = "0.1.53";
const packageJson = {
	version: version$1};

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
const version = packageJson.version;

export { createYhUI, index as default, install, version };
