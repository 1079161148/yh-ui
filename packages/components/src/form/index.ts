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
export type FormSchemaInstance = import('./src/form-schema').FormSchemaInstance
export type YhFormInstance = FormInstance
export type YhFormItemInstance = FormItemInstance
export type YhFormSchemaInstance = FormSchemaInstance
export type YhFormProps = import('./src/form').FormProps
export type YhFormItemProps = import('./src/form-item').FormItemProps
export type YhFormSchemaProps = import('./src/form-schema').FormSchemaProps
export type YhFormSchemaItem = import('./src/form-schema').FormSchemaItem
export type YhFormSchemaGroup = import('./src/form-schema').FormSchemaGroup
export type YhFormRule = import('./src/form').FormRule
export type YhFormRules = import('./src/form').FormRules
