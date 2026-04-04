import dayjsRuntime from 'dayjs/esm/index.js'
import type dayjsType from 'dayjs'

const dayjs = dayjsRuntime as typeof dayjsType

export default dayjs
export type { Dayjs, PluginFunc } from 'dayjs'
