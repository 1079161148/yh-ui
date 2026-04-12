import { withInstall } from '../../utils/index.js'
import Slider from './src/slider.js'
const YhSlider = withInstall(Slider)
var stdin_default = YhSlider
export * from './src/slider-meta.js'
export { YhSlider, stdin_default as default }
