import { withInstall } from '@yh-ui/utils'
import SmartAddress from './src/smart-address.vue'

export const YhSmartAddress = withInstall(SmartAddress)
export default YhSmartAddress

export * from './src/smart-address'
export * from './src/use-address-parser'

export type SmartAddressInstance = InstanceType<typeof SmartAddress>
export type YhSmartAddressInstance = SmartAddressInstance
export type YhSmartAddressProps = import('./src/smart-address').SmartAddressProps
export type YhSmartAddressEmits = import('./src/smart-address').SmartAddressEmits
export type YhSmartAddressSlots = import('./src/smart-address').SmartAddressSlots
export type YhAddressValue = import('./src/smart-address').AddressValue
export type YhRegionOption = import('./src/smart-address').RegionOption
export type YhParsedAddress = import('./src/use-address-parser').ParsedAddress
