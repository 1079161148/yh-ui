import { renderSlot as _renderSlot } from 'vue'
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return _renderSlot(_ctx.$slots, 'default')
}
import { descriptionsItemProps } from './descriptions'
const __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhDescriptionsItem'
  },
  {
    __name: 'description-item',
    props: descriptionsItemProps,
    setup(__props, { expose: __expose }) {
      __expose()
      const __returned__ = {
        get descriptionsItemProps() {
          return descriptionsItemProps
        }
      }
      Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true })
      return __returned__
    }
  }
)
__sfc__.render = render
var stdin_default = __sfc__
export { stdin_default as default }
