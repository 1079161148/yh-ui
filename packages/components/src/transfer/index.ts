/**
 * @yh-ui/transfer
 * @description Transfer 穿梭框组件
 */

import type { App, Plugin } from 'vue'
import Transfer from './src/transfer.vue'
import TransferPanel from './src/transfer-panel.vue'

// 定义 install 方法
Transfer.install = (app: App): void => {
  app.component(Transfer.name!, Transfer)
  app.component(TransferPanel.name!, TransferPanel)
}

TransferPanel.install = (app: App): void => {
  app.component(TransferPanel.name!, TransferPanel)
}

// 命名导出
export const YhTransfer = Transfer as typeof Transfer & Plugin
export const YhTransferPanel = TransferPanel as typeof TransferPanel & Plugin

// 类型导出
export * from './src/transfer'

// 默认导出
export default YhTransfer

export type TransferInstance = InstanceType<typeof Transfer>
export type TransferPanelInstance = InstanceType<typeof TransferPanel>
