import type { PluginFunc } from 'dayjs'
import _advancedFormat from 'dayjs/esm/plugin/advancedFormat/index.js'
import _customParseFormat from 'dayjs/esm/plugin/customParseFormat/index.js'
import _isBetween from 'dayjs/esm/plugin/isBetween/index.js'
import _isoWeek from 'dayjs/esm/plugin/isoWeek/index.js'
import _quarterOfYear from 'dayjs/esm/plugin/quarterOfYear/index.js'
import _weekOfYear from 'dayjs/esm/plugin/weekOfYear/index.js'

// CJS/ESM interop: dayjs plugins ship as CJS, handle both .default and direct export
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const interop = (m: any): PluginFunc => m.default ?? m

const advancedFormatPlugin = interop(_advancedFormat)
const customParseFormatPlugin = interop(_customParseFormat)
const isBetweenPlugin = interop(_isBetween)
const isoWeekPlugin = interop(_isoWeek)
const quarterOfYearPlugin = interop(_quarterOfYear)
const weekOfYearPlugin = interop(_weekOfYear)

export {
  advancedFormatPlugin,
  customParseFormatPlugin,
  isBetweenPlugin,
  isoWeekPlugin,
  quarterOfYearPlugin,
  weekOfYearPlugin
}
