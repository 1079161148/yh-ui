import yhUiBundleJs from '../../../public/playground/yh-ui-bundle.js?raw'
import yhFlowRuntimeJs from '../../../public/playground/yh-flow-runtime.js?raw'
import cssWorkerJs from '../../../public/playground/assets/css.worker-C7FogG4G.js?raw'
import editorWorkerJs from '../../../public/playground/assets/editor.worker-iXcRX1Tq.js?raw'
import htmlWorkerJs from '../../../public/playground/assets/html.worker-C8VxctEJ.js?raw'
import jsonWorkerJs from '../../../public/playground/assets/json.worker-CMC9kgPL.js?raw'
import tsWorkerJs from '../../../public/playground/assets/ts.worker-CtTJ3hNN.js?raw'

export const sandboxRuntimeAssets = {
  yhUiBundleJs,
  yhFlowRuntimeJs,
  workerAssets: {
    'public/assets/css.worker-C7FogG4G.js': cssWorkerJs,
    'public/assets/editor.worker-iXcRX1Tq.js': editorWorkerJs,
    'public/assets/html.worker-C8VxctEJ.js': htmlWorkerJs,
    'public/assets/json.worker-CMC9kgPL.js': jsonWorkerJs,
    'public/assets/ts.worker-CtTJ3hNN.js': tsWorkerJs
  }
}
