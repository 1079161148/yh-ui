import * as dayjsModule from 'dayjs'
import type dayjsType from 'dayjs'

const dayjs = (
  'default' in dayjsModule ? (dayjsModule.default ?? dayjsModule) : dayjsModule
) as typeof dayjsType

export default dayjs
