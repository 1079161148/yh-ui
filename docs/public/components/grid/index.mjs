import { withInstall } from "@yh-ui/utils";
import Grid from "./src/grid.vue";
import GridItem from "./src/grid-item.vue";
export const YhGrid = withInstall(Grid);
export const YhGridItem = withInstall(GridItem);
export default YhGrid;
export * from "./src/grid.mjs";
