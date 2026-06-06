import type { App, Plugin } from 'vue'
import Transfer from './src/transfer.vue'
import TransferPanel from './src/transfer-panel.vue'

const registerComponent = (app: App, component: { name?: string }) => {
  const name = component.name
  if (name && !app.component(name)) {
    app.component(name, component as never)
  }
}

Transfer.install = (app: App): void => {
  registerComponent(app, Transfer)
  registerComponent(app, TransferPanel)
}

TransferPanel.install = (app: App): void => {
  registerComponent(app, TransferPanel)
}

export const YhTransfer = Transfer as typeof Transfer & Plugin
export const YhTransferPanel = TransferPanel as typeof TransferPanel & Plugin

export * from './src/transfer'

export default YhTransfer

export type TransferInstance = InstanceType<typeof Transfer>
export type TransferPanelInstance = InstanceType<typeof TransferPanel>
export type YhTransferInstance = TransferInstance
export type YhTransferPanelInstance = TransferPanelInstance
export type YhTransferProps = import('./src/transfer').TransferProps
export type YhTransferEmits = import('./src/transfer').TransferEmits
export type YhTransferExpose = import('./src/transfer').TransferExpose
export type YhTransferPanelExpose = import('./src/transfer').TransferPanelExpose
