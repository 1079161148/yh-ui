import { withInstall } from '@yh-ui/utils'
import Title from './src/title.vue'
import Text from './src/text.vue'
import Paragraph from './src/paragraph.vue'
import Link from './src/link.vue'

export const YhTypographyTitle = withInstall(Title)
export const YhTypographyText = withInstall(Text)
export const YhTypographyParagraph = withInstall(Paragraph)
export const YhTypographyLink = withInstall(Link)

export default YhTypographyTitle

export * from './src/typography'

export type TypographyTitleInstance = InstanceType<typeof Title>
export type TypographyTextInstance = InstanceType<typeof Text>
export type TypographyParagraphInstance = InstanceType<typeof Paragraph>
export type TypographyLinkInstance = InstanceType<typeof Link>
