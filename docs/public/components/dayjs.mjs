import * as dayjsModule from "dayjs";
const dayjs = "default" in dayjsModule ? dayjsModule.default ?? dayjsModule : dayjsModule;
export default dayjs;
