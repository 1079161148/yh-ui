import * as viewerModule from "viewerjs";
const Viewer = "default" in viewerModule ? viewerModule.default ?? viewerModule : viewerModule;
export default Viewer;
