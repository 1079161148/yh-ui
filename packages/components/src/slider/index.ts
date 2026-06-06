import { withInstall } from '@yh-ui/utils'
import Slider from './src/slider.vue'

export const YhSlider = withInstall(Slider)
export default YhSlider

export * from './src/slider'

export type SliderInstance = InstanceType<typeof Slider>
export type YhSliderInstance = SliderInstance
export type YhSliderProps = import('./src/slider').SliderProps
export type YhSliderEmits = import('./src/slider').SliderEmits
export type YhSliderSlots = import('./src/slider').SliderSlots
export type YhSliderExpose = import('./src/slider').SliderExpose
