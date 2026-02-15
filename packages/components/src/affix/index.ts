import { withInstall } from '@yh-ui/utils'
import Affix from './src/affix.vue'

export const YhAffix = withInstall(Affix)
export default YhAffix

export * from './src/affix'

export type AffixInstance = InstanceType<typeof Affix>
