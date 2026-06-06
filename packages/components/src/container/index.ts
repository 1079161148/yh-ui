import { withInstall } from '@yh-ui/utils'
import Container from './src/container.vue'
import Header from './src/header.vue'
import Aside from './src/aside.vue'
import Main from './src/main.vue'
import Footer from './src/footer.vue'

export const YhContainer = withInstall(Container)
export const YhHeader = withInstall(Header)
export const YhAside = withInstall(Aside)
export const YhMain = withInstall(Main)
export const YhFooter = withInstall(Footer)

export default YhContainer

export * from './src/container'

export type ContainerInstance = InstanceType<typeof Container>
export type HeaderInstance = InstanceType<typeof Header>
export type AsideInstance = InstanceType<typeof Aside>
export type MainInstance = InstanceType<typeof Main>
export type FooterInstance = InstanceType<typeof Footer>
export type YhContainerInstance = ContainerInstance
export type YhHeaderInstance = HeaderInstance
export type YhAsideInstance = AsideInstance
export type YhMainInstance = MainInstance
export type YhFooterInstance = FooterInstance
export type YhContainerProps = import('./src/container').ContainerProps
export type YhHeaderProps = import('./src/container').HeaderProps
export type YhAsideProps = import('./src/container').AsideProps
export type YhMainProps = import('./src/container').MainProps
export type YhFooterProps = import('./src/container').FooterProps
export type YhContainerSlots = import('./src/container').ContainerSlots
export type YhHeaderSlots = import('./src/container').HeaderSlots
export type YhAsideSlots = import('./src/container').AsideSlots
export type YhMainSlots = import('./src/container').MainSlots
export type YhFooterSlots = import('./src/container').FooterSlots
