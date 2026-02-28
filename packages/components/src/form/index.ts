import { withInstall } from '@yh-ui/utils'
import Form from './src/form.vue'
import FormItem from './src/form-item.vue'
import FormSchema from './src/form-schema.vue'
import './src/form.scss'

export * from './src/form'
export * from './src/form-item'
export * from './src/form-schema'

export const YhForm = withInstall(Form)
export const YhFormItem = withInstall(FormItem)
export const YhFormSchema = withInstall(FormSchema)

export default YhForm

export type FormInstance = InstanceType<typeof Form>
export type FormItemInstance = InstanceType<typeof FormItem>
// FormSchemaInstance 现在统一从 ./src/form-schema 导出接口定义
