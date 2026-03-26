import { withInstall } from '@yh-ui/utils'
import SmartAddress from './src/smart-address.vue'

export const YhSmartAddress = withInstall(SmartAddress)
export default YhSmartAddress

export * from './src/smart-address'
export * from './src/use-address-parser'

export type SmartAddressInstance = InstanceType<typeof SmartAddress>
export type YhSmartAddressInstance = SmartAddressInstance

export type YhSmartAddressProps = import('./src/smart-address').SmartAddressProps
