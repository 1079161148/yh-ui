import { withInstall, withNoopInstall } from "@yh-ui/utils";
import Table from "./src/table.vue";
import TableColumn from "./src/table-column.vue";
export const YhTable = withInstall(Table, {
  TableColumn
});
export const YhTableColumn = withNoopInstall(TableColumn);
export default YhTable;
export * from "./src/table.mjs";
