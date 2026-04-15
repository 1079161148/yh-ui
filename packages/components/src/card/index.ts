import { withInstall } from '@yh-ui/utils'
import Card from './src/card.vue'

export const YhCard = withInstall(Card)
export default YhCard

export * from './src/card'

export type CardInstance = InstanceType<typeof Card>
export type YhCardInstance = CardInstance
export type YhCardProps = import('./src/card').CardProps
export type YhCardSlots = import('./src/card').CardSlots
export type YhCardShadow = import('./src/card').CardShadow
