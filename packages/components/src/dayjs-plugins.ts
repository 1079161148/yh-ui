import type { PluginFunc } from 'dayjs'
import * as advancedFormatModule from 'dayjs/plugin/advancedFormat.js'
import * as customParseFormatModule from 'dayjs/plugin/customParseFormat.js'
import * as isBetweenModule from 'dayjs/plugin/isBetween.js'
import * as isoWeekModule from 'dayjs/plugin/isoWeek.js'
import * as quarterOfYearModule from 'dayjs/plugin/quarterOfYear.js'
import * as weekOfYearModule from 'dayjs/plugin/weekOfYear.js'

type MaybeDefaultPlugin = PluginFunc | { default: PluginFunc }

function unwrapPlugin(module: MaybeDefaultPlugin): PluginFunc {
  return (typeof module === 'function' ? module : module.default) as PluginFunc
}

export const advancedFormatPlugin = unwrapPlugin(advancedFormatModule as MaybeDefaultPlugin)
export const customParseFormatPlugin = unwrapPlugin(customParseFormatModule as MaybeDefaultPlugin)
export const isBetweenPlugin = unwrapPlugin(isBetweenModule as MaybeDefaultPlugin)
export const isoWeekPlugin = unwrapPlugin(isoWeekModule as MaybeDefaultPlugin)
export const quarterOfYearPlugin = unwrapPlugin(quarterOfYearModule as MaybeDefaultPlugin)
export const weekOfYearPlugin = unwrapPlugin(weekOfYearModule as MaybeDefaultPlugin)
