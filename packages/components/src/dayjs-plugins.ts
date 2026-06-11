import type { PluginFunc } from 'dayjs'
import _advancedFormat from 'dayjs/plugin/advancedFormat'
import _customParseFormat from 'dayjs/plugin/customParseFormat'
import _isBetween from 'dayjs/plugin/isBetween'
import _isoWeek from 'dayjs/plugin/isoWeek'
import _quarterOfYear from 'dayjs/plugin/quarterOfYear'
import _weekOfYear from 'dayjs/plugin/weekOfYear'
import _weekYear from 'dayjs/plugin/weekYear'

// CJS/ESM interop: dayjs plugins ship as CJS, handle both .default and direct export
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const interop = (m: any): PluginFunc => m.default ?? m

const advancedFormatPlugin = interop(_advancedFormat)
const customParseFormatPlugin = interop(_customParseFormat)
const isBetweenPlugin = interop(_isBetween)
const isoWeekPlugin = interop(_isoWeek)
const quarterOfYearPlugin = interop(_quarterOfYear)
const weekOfYearPlugin = interop(_weekOfYear)
const weekYearPlugin = interop(_weekYear)

export {
  advancedFormatPlugin,
  customParseFormatPlugin,
  isBetweenPlugin,
  isoWeekPlugin,
  quarterOfYearPlugin,
  weekOfYearPlugin,
  weekYearPlugin
}
