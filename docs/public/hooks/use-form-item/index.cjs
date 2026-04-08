"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useFormItem = exports.FormItemContextKey = exports.FormContextKey = void 0;
var _vue = require("vue");
const FormContextKey = exports.FormContextKey = Symbol("FormContextKey");
const FormItemContextKey = exports.FormItemContextKey = Symbol("FormItemContextKey");
const useFormItem = () => {
  const form = (0, _vue.inject)(FormContextKey, void 0);
  const formItem = (0, _vue.inject)(FormItemContextKey, void 0);
  return {
    form,
    formItem,
    // 触发校验
    validate: trigger => {
      if (formItem) {
        return formItem.validate(trigger).catch(() => {
          return false;
        });
      }
      return Promise.resolve(true);
    }
  };
};
exports.useFormItem = useFormItem;