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
export type YhAutocompleteSize = import('./src/autocomplete').AutocompleteSize
export type YhAutocompletePlacement = import('./src/autocomplete').AutocompletePlacement
export type YhAutocompleteSuggestion = import('./src/autocomplete').AutocompleteSuggestion
export type YhAutocompleteProps = import('./src/autocomplete').AutocompleteProps
export type YhAutocompleteEmits = import('./src/autocomplete').AutocompleteEmits
export type YhAutocompleteSlots = import('./src/autocomplete').AutocompleteSlots
export type YhAutocompleteExpose = import('./src/autocomplete').AutocompleteExpose
export type YhAutocompleteInstance = AutocompleteInstance
