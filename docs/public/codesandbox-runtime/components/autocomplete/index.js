import { withInstall } from '../../utils/index.js'
import Autocomplete from './src/autocomplete.js'
const YhAutocomplete = withInstall(Autocomplete)
var stdin_default = YhAutocomplete
export * from './src/autocomplete.js'
export { YhAutocomplete, stdin_default as default }
