import { withInstall } from '../../utils/index.js'
import Container from './src/container.js'
import Header from './src/header.js'
import Aside from './src/aside.js'
import Main from './src/main.js'
import Footer from './src/footer.js'
const YhContainer = withInstall(Container)
const YhHeader = withInstall(Header)
const YhAside = withInstall(Aside)
const YhMain = withInstall(Main)
const YhFooter = withInstall(Footer)
var stdin_default = YhContainer
export * from './src/container-meta.js'
export { YhAside, YhContainer, YhFooter, YhHeader, YhMain, stdin_default as default }
