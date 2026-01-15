import { withInstall } from '@yh-ui/utils'
import Form from './src/form.vue'
import FormItem from './src/form-item.vue'
import FormSchema from './src/form-schema.vue'
import './src/form.scss'

export * from './src/form'
export * from './src/form-item'

export const YhForm = withInstall(Form)
export const YhFormItem = withInstall(FormItem)
export const YhFormSchema = withInstall(FormSchema)

export default YhForm

declare module 'vue' {
  export interface GlobalComponents {
    YhForm: typeof YhForm
    YhFormItem: typeof YhFormItem
    YhFormSchema: typeof YhFormSchema
  }
}
