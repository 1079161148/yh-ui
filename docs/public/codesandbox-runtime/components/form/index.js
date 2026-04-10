import { withInstall } from '../../utils/index.js'
import Form from './src/form.js'
import FormItem from './src/form-item.js'
import FormSchema from './src/form-schema.js'
import './src/form.css'
export * from './src/form.js'
export * from './src/form-item.js'
export * from './src/form-schema.js'
const YhForm = withInstall(Form)
const YhFormItem = withInstall(FormItem)
const YhFormSchema = withInstall(FormSchema)
var stdin_default = YhForm
export { YhForm, YhFormItem, YhFormSchema, stdin_default as default }
