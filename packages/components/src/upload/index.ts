import { withInstall } from '@yh-ui/utils'
import Upload from './src/upload.vue'

export const YhUpload = withInstall(Upload)
export default YhUpload

export * from './src/upload'
export type UploadInstance = InstanceType<typeof Upload>
