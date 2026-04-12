import Transfer from "./src/transfer.js";
import TransferPanel from "./src/transfer-panel.js";
const registerComponent = (app, component) => {
  const name = component.name;
  if (name && !app.component(name)) {
    app.component(name, component);
  }
};
Transfer.install = (app) => {
  registerComponent(app, Transfer);
  registerComponent(app, TransferPanel);
};
TransferPanel.install = (app) => {
  registerComponent(app, TransferPanel);
};
const YhTransfer = Transfer;
const YhTransferPanel = TransferPanel;
export * from "./src/transfer-meta.js";
var stdin_default = YhTransfer;
export {
  YhTransfer,
  YhTransferPanel,
  stdin_default as default
};
