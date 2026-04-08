"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhMessageBox: true
};
module.exports = exports.YhMessageBox = void 0;
var _utils = require("@yh-ui/utils");
var _method = _interopRequireDefault(require("./src/method.cjs"));
require("./src/message-box.css");
var _messageBox2 = require("./src/message-box.cjs");
Object.keys(_messageBox2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _messageBox2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _messageBox2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YhMessageBox = exports.YhMessageBox = (0, _utils.withInstallFunction)(_method.default, "$msgbox");
const installExtra = app => {
  app.config.globalProperties.$alert = _method.default.alert;
  app.config.globalProperties.$confirm = _method.default.confirm;
  app.config.globalProperties.$prompt = _method.default.prompt;
};
YhMessageBox.install = app => {
  app.config.globalProperties.$msgbox = YhMessageBox;
  installExtra(app);
};
module.exports = YhMessageBox;