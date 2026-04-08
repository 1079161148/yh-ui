import { withInstall } from "@yh-ui/utils";
import Image from "./src/image.vue";
import ImageViewer from "./src/image-viewer.vue";
export const YhImage = withInstall(Image);
export const YhImageViewer = withInstall(ImageViewer);
export default YhImage;
export * from "./src/image.mjs";
export * from "./src/image-viewer.mjs";
