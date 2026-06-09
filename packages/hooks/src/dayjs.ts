import * as dayjsObject from 'dayjs'
import type dayjsType from 'dayjs'

const dayjs = (
  typeof dayjsObject === 'function'
    ? dayjsObject
    : // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (dayjsObject as any).default || dayjsObject
) as typeof dayjsType

export default dayjs
