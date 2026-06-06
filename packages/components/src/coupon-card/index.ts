import { withInstall } from '@yh-ui/utils'
import CouponCard from './src/coupon-card.vue'

export const YhCouponCard = withInstall(CouponCard)
export default YhCouponCard

export * from './src/coupon-card'

export type CouponCardInstance = InstanceType<typeof CouponCard>
export type YhCouponCardInstance = CouponCardInstance

export type YhCouponCardProps = import('./src/coupon-card').CouponCardProps
export type YhCouponCardEmits = import('./src/coupon-card').CouponCardEmits
export type YhCouponCardSlots = import('./src/coupon-card').CouponCardSlots
export type YhCouponStatus = import('./src/coupon-card').CouponStatus
