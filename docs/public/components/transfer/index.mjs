import Transfer from "./src/transfer.vue";
import TransferPanel from "./src/transfer-panel.vue";
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
export const YhTransfer = Transfer;
export const YhTransferPanel = TransferPanel;
export * from "./src/transfer.mjs";
export default YhTransfer;
