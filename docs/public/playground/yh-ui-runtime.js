import YhUI from '@yh-ui/yh-ui'
import {
  Flow as YhFlow,
  NodeResizer as YhNodeResizer,
  NodeToolbar as YhNodeToolbar
} from '@yh-ui/flow'
import { Icon as YhIconify } from '@iconify/vue'

export * from '@yh-ui/yh-ui'

const PlaygroundYhUI = {
  install(app) {
    app.use(YhUI)
    app.component('YhFlow', YhFlow)
    app.component('YhNodeResizer', YhNodeResizer)
    app.component('YhNodeToolbar', YhNodeToolbar)
    // eslint-disable-next-line vue/multi-word-component-names
    app.component('Icon', YhIconify)
    app.component('YhIconifyIcon', YhIconify)
  }
}

export default PlaygroundYhUI
