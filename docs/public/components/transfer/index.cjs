"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  YhTransfer: true,
  YhTransferPanel: true
};
module.exports = exports.YhTransferPanel = exports.YhTransfer = void 0;
var _transfer = _interopRequireDefault(require("./src/transfer.vue"));
var _transferPanel = _interopRequireDefault(require("./src/transfer-panel.vue"));
var _transfer2 = require("./src/transfer.cjs");
Object.keys(_transfer2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _transfer2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _transfer2[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const registerComponent = (app, component) => {
  const name = component.name;
  if (name && !app.component(name)) {
    app.component(name, component);
  }
};
_transfer.default.install = app => {
  registerComponent(app, _transfer.default);
  registerComponent(app, _transferPanel.default);
};
_transferPanel.default.install = app => {
  registerComponent(app, _transferPanel.default);
};
const YhTransfer = exports.YhTransfer = _transfer.default;
const YhTransferPanel = exports.YhTransferPanel = _transferPanel.default;
module.exports = YhTransfer;