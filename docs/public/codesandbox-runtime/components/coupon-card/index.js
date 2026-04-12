import { withInstall } from "../../utils/index.js";
import CouponCard from "./src/coupon-card.js";
const YhCouponCard = withInstall(CouponCard);
var stdin_default = YhCouponCard;
export * from "./src/coupon-card-meta.js";
export {
  YhCouponCard,
  stdin_default as default
};
