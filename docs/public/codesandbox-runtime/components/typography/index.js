import { withInstall } from "../../utils/index.js";
import Title from "./src/title.js";
import Text from "./src/text.js";
import Paragraph from "./src/paragraph.js";
import Link from "./src/link.js";
const YhTypographyTitle = withInstall(Title);
const YhTypographyText = withInstall(Text);
const YhTypographyParagraph = withInstall(Paragraph);
const YhTypographyLink = withInstall(Link);
var stdin_default = YhTypographyTitle;
export * from "./src/typography.js";
export {
  YhTypographyLink,
  YhTypographyParagraph,
  YhTypographyText,
  YhTypographyTitle,
  stdin_default as default
};
