"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhForm: true,
  YhFormItem: true,
  YhFormSchema: true
};
module.exports = exports.YhFormSchema = exports.YhFormItem = exports.YhForm = void 0;
var _utils = require("@yh-ui/utils");
var _form = _interopRequireDefault(require("./src/form.vue"));
var _formItem = _interopRequireDefault(require("./src/form-item.vue"));
var _formSchema = _interopRequireDefault(require("./src/form-schema.vue"));
require("./src/form.css");
var _form3 = require("./src/form.cjs");
Object.keys(_form3).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _form3[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _form3[key];
    }
  });
});
var _formItem2 = require("./src/form-item.cjs");
Object.keys(_formItem2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _formItem2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _formItem2[key];
    }
  });
});
var _formSchema2 = require("./src/form-schema.cjs");
Object.keys(_formSchema2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _formSchema2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _formSchema2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhForm = exports.YhForm = (0, _utils.withInstall)(_form.default);
const YhFormItem = exports.YhFormItem = (0, _utils.withInstall)(_formItem.default);
const YhFormSchema = exports.YhFormSchema = (0, _utils.withInstall)(_formSchema.default);
module.exports = YhForm;