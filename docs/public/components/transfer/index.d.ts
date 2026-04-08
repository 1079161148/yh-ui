/**
 * @yh-ui/transfer
 * @description Transfer 穿梭框组件
 */
import type { Plugin } from 'vue';
import Transfer from './src/transfer.vue';
import TransferPanel from './src/transfer-panel.vue';
export declare const YhTransfer: typeof Transfer & Plugin;
export declare const YhTransferPanel: typeof TransferPanel & Plugin;
export * from './src/transfer';
export default YhTransfer;
export type TransferInstance = InstanceType<typeof Transfer>;
export type TransferPanelInstance = InstanceType<typeof TransferPanel>;
