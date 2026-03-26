import { withInstall } from '@yh-ui/utils'
import CouponCard from './src/coupon-card.vue'

export const YhCouponCard = withInstall(CouponCard)
export default YhCouponCard

export * from './src/coupon-card'
export type CouponCardInstance = InstanceType<typeof CouponCard>
