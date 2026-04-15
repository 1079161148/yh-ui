import { withInstall } from '@yh-ui/utils'
import Upload from './src/upload.vue'

export const YhUpload = withInstall(Upload)
export default YhUpload

export * from './src/upload'
export type UploadInstance = InstanceType<typeof Upload>
export type YhUploadInstance = UploadInstance
export type YhUploadProps = import('./src/upload').UploadProps
export type YhUploadEmits = import('./src/upload').UploadEmits
export type YhUploadSlots = import('./src/upload').UploadSlots
export type YhUploadExpose = import('./src/upload').UploadExpose
export type YhUploadFile = import('./src/upload').UploadFile
export type YhUploadRawFile = import('./src/upload').UploadRawFile
export type YhUploadProgressEvent = import('./src/upload').UploadProgressEvent
export type YhUploadRequestOptions = import('./src/upload').UploadRequestOptions
export type YhUploadStatus = import('./src/upload').UploadStatus
