/**
 * Autocomplete Component
 * @description 自动补全输入框组件导出
 */

import { withInstall } from '@yh-ui/utils'
import Autocomplete from './src/autocomplete.vue'

export const YhAutocomplete = withInstall(Autocomplete)

export default YhAutocomplete

export * from './src/autocomplete'

export type AutocompleteInstance = InstanceType<typeof Autocomplete>
