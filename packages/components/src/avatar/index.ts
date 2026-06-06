import { withInstall } from '@yh-ui/utils'
import Avatar from './src/avatar.vue'

export const YhAvatar = withInstall(Avatar)
export default YhAvatar
export * from './src/avatar'
export type { AvatarProps, AvatarEmits, AvatarSlots } from './src/avatar'
export type AvatarInstance = InstanceType<typeof Avatar>
export type YhAvatarInstance = AvatarInstance
export type YhAvatarProps = import('./src/avatar').AvatarProps
export type YhAvatarEmits = import('./src/avatar').AvatarEmits
export type YhAvatarSlots = import('./src/avatar').AvatarSlots
export type YhAvatarShape = import('./src/avatar').AvatarShape
export type YhAvatarSize = import('./src/avatar').AvatarSize
export type YhAvatarFit = import('./src/avatar').AvatarFit
