var _a
import * as viewerModule from 'viewerjs'
const Viewer =
  'default' in viewerModule
    ? (_a = viewerModule.default) != null
      ? _a
      : viewerModule
    : viewerModule
var stdin_default = Viewer
export { stdin_default as default }
