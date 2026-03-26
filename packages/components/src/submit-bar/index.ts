import { withInstall } from '@yh-ui/utils'
import SubmitBar from './src/submit-bar.vue'

export const YhSubmitBar = withInstall(SubmitBar)
export default YhSubmitBar

export * from './src/submit-bar'

export type SubmitBarInstance = InstanceType<typeof SubmitBar>
export type YhSubmitBarInstance = SubmitBarInstance

export type YhSubmitBarProps = import('./src/submit-bar').SubmitBarProps
