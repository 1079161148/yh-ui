import { withInstall } from "../../utils/index.js";
import Skeleton from "./src/skeleton.js";
import SkeletonItem from "./src/skeleton-item.js";
const YhSkeleton = withInstall(Skeleton);
const YhSkeletonItem = withInstall(SkeletonItem);
var stdin_default = YhSkeleton;
export * from "./src/skeleton-meta.js";
export {
  YhSkeleton,
  YhSkeletonItem,
  stdin_default as default
};
