import { withInstall } from '@yh-ui/utils'
import Affix from './src/affix.vue'

export const YhAffix = withInstall(Affix)
export default YhAffix

export * from './src/affix'

export type AffixInstance = InstanceType<typeof Affix>
export type YhAffixInstance = AffixInstance
export type YhAffixProps = import('./src/affix').AffixProps
export type YhAffixEmits = import('./src/affix').AffixEmits
export type YhAffixSlots = import('./src/affix').AffixSlots
export type YhAffixExpose = import('./src/affix').AffixExpose
