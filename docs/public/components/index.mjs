import { YhButton } from "./button/index.mjs";
import { YhInput } from "./input/index.mjs";
import { YhCheckbox, YhCheckboxGroup } from "./checkbox/index.mjs";
import { YhRadio, YhRadioGroup, YhRadioButton } from "./radio/index.mjs";
import { YhTag } from "./tag/index.mjs";
import { YhInputNumber } from "./input-number/index.mjs";
import { YhInputTag } from "./input-tag/index.mjs";
import { YhIcon } from "./icon/index.mjs";
import { YhForm, YhFormItem, YhFormSchema } from "./form/index.mjs";
import { YhRow } from "./row/index.mjs";
import { YhCol } from "./col/index.mjs";
import { YhDivider } from "./divider/index.mjs";
import { YhRate } from "./rate/index.mjs";
import { YhSwitch } from "./switch/index.mjs";
import { YhAutocomplete } from "./autocomplete/index.mjs";
import { YhSelect, YhOption } from "./select/index.mjs";
import { YhCascader, YhCascaderPanel } from "./cascader/index.mjs";
import { YhSlider } from "./slider/index.mjs";
import { YhTimeSelect } from "./time-select/index.mjs";
import { YhTimePicker } from "./time-picker/index.mjs";
import { YhDatePicker } from "./date-picker/index.mjs";
import { YhTransfer, YhTransferPanel } from "./transfer/index.mjs";
import { YhTreeSelect } from "./tree-select/index.mjs";
import { YhBadge } from "./badge/index.mjs";
import { YhCard } from "./card/index.mjs";
import { YhMessage } from "./message/index.mjs";
import { YhNotification } from "./notification/index.mjs";
import { YhColorPicker } from "./color-picker/index.mjs";
import { YhSpin } from "./spin/index.mjs";
import { YhLoading } from "./loading/index.mjs";
import { YhMessageBox } from "./message-box/index.mjs";
import { YhBreadcrumb, YhBreadcrumbItem } from "./breadcrumb/index.mjs";
import { YhBackTop } from "./back-top/index.mjs";
import { YhAlert } from "./alert/index.mjs";
import { YhSkeleton, YhSkeletonItem } from "./skeleton/index.mjs";
import { YhProgress } from "./progress/index.mjs";
import { YhTooltip } from "./tooltip/index.mjs";
import { YhPopconfirm } from "./popconfirm/index.mjs";
import { YhPopover } from "./popover/index.mjs";
import { YhDialog, YhDialogMethod } from "./dialog/index.mjs";
import { YhDrawer } from "./drawer/index.mjs";
import { YhWatermark } from "./watermark/index.mjs";
import { YhUpload } from "./upload/index.mjs";
import { YhMarquee } from "./marquee/index.mjs";
import { YhPagination } from "./pagination/index.mjs";
import { YhImage, YhImageViewer } from "./image/index.mjs";
import { YhDescriptions, YhDescriptionsItem } from "./descriptions/index.mjs";
import { YhTabs, YhTabPane } from "./tabs/index.mjs";
import { YhSteps, YhStep } from "./steps/index.mjs";
import { YhConfigProvider } from "./config-provider/index.mjs";
import { YhAffix } from "./affix/index.mjs";
import { YhInfiniteScroll } from "./infinite-scroll/index.mjs";
import { YhDropdown, YhDropdownItem, YhDropdownMenu } from "./dropdown/index.mjs";
import { YhMenu, YhMenuItem, YhMenuItemGroup, YhSubMenu } from "./menu/index.mjs";
import { YhCalendar } from "./calendar/index.mjs";
import { YhWaterfall } from "./waterfall/index.mjs";
import { YhTree, YhTreeNode } from "./tree/index.mjs";
import { YhCountdown } from "./countdown/index.mjs";
import { YhTable, YhTableColumn } from "./table/index.mjs";
import { YhSpace } from "./space/index.mjs";
import { YhAvatar } from "./avatar/index.mjs";
import { YhEmpty } from "./empty/index.mjs";
import {
  YhTypographyTitle,
  YhTypographyText,
  YhTypographyParagraph,
  YhTypographyLink
} from "./typography/index.mjs";
import { YhContainer, YhHeader, YhAside, YhMain, YhFooter } from "./container/index.mjs";
import { YhResult } from "./result/index.mjs";
import { YhGrid, YhGridItem } from "./grid/index.mjs";
import { YhMention } from "./mention/index.mjs";
import { YhAiChat } from "./ai-chat/index.mjs";
import { YhAiBubble } from "./ai-bubble/index.mjs";
import { YhAiSender } from "./ai-sender/index.mjs";
import { YhAiThoughtChain } from "./ai-thought-chain/index.mjs";
import { YhAiCodeBlock } from "./ai-code-block/index.mjs";
import { YhAiCodeEditor } from "./ai-code-editor/index.mjs";
import { YhAiCodeRunner } from "./ai-code-runner/index.mjs";
import { YhAiThinking } from "./ai-thinking/index.mjs";
import { YhAiWelcome } from "./ai-welcome/index.mjs";
import { YhAiActionGroup } from "./ai-action-group/index.mjs";
import { YhAiEditorSender } from "./ai-editor-sender/index.mjs";
import { YhAiArtifacts } from "./ai-artifacts/index.mjs";
import { YhAiVoiceTrigger } from "./ai-voice-trigger/index.mjs";
import { YhAiConversations } from "./ai-conversations/index.mjs";
import { YhAiPrompts } from "./ai-prompts/index.mjs";
import { YhAiAgentCard } from "./ai-agent-card/index.mjs";
import { YhAiSources } from "./ai-sources/index.mjs";
import { YhAiProvider } from "./ai-provider/index.mjs";
import { YhAiMention } from "./ai-mention/index.mjs";
import { YhAiBubbleList } from "./ai-bubble-list/index.mjs";
import { YhAiFileCard } from "./ai-file-card/index.mjs";
import { YhAiAttachments } from "./ai-attachments/index.mjs";
import { YhAiMermaid } from "./ai-mermaid/index.mjs";
import { YhCarousel, YhCarouselItem } from "./carousel/index.mjs";
import { YhScrollbar } from "./scrollbar/index.mjs";
import { YhGanttChart } from "./gantt-chart/index.mjs";
import { YhSkuSelector } from "./sku-selector/index.mjs";
import { YhPrice } from "./price/index.mjs";
import { YhProductCard } from "./product-card/index.mjs";
import { YhImageMagnifier } from "./image-magnifier/index.mjs";
import { YhCouponCard } from "./coupon-card/index.mjs";
import { YhLuckyDraw } from "./lucky-draw/index.mjs";
import { YhFilterBar } from "./filter-bar/index.mjs";
import { YhSubmitBar } from "./submit-bar/index.mjs";
import { YhCategoryNav } from "./category-nav/index.mjs";
import { YhSmartAddress } from "./smart-address/index.mjs";
export * from "./button/index.mjs";
export * from "./input/index.mjs";
export * from "./checkbox/index.mjs";
export * from "./radio/index.mjs";
export * from "./tag/index.mjs";
export * from "./input-number/index.mjs";
export * from "./input-tag/index.mjs";
export * from "./icon/index.mjs";
export * from "./form/index.mjs";
export * from "./row/index.mjs";
export * from "./col/index.mjs";
export * from "./divider/index.mjs";
export * from "./rate/index.mjs";
export * from "./switch/index.mjs";
export * from "./autocomplete/index.mjs";
export * from "./select/index.mjs";
export * from "./cascader/index.mjs";
export * from "./slider/index.mjs";
export * from "./time-select/index.mjs";
export * from "./time-picker/index.mjs";
export * from "./date-picker/index.mjs";
export * from "./transfer/index.mjs";
export * from "./tree-select/index.mjs";
export * from "./badge/index.mjs";
export * from "./card/index.mjs";
export * from "./message/index.mjs";
export * from "./notification/index.mjs";
export * from "./color-picker/index.mjs";
export * from "./spin/index.mjs";
export * from "./loading/index.mjs";
export * from "./message-box/index.mjs";
export * from "./breadcrumb/index.mjs";
export * from "./back-top/index.mjs";
export * from "./alert/index.mjs";
export * from "./skeleton/index.mjs";
export * from "./progress/index.mjs";
export * from "./tooltip/index.mjs";
export * from "./popconfirm/index.mjs";
export * from "./popover/index.mjs";
export * from "./dialog/index.mjs";
export * from "./drawer/index.mjs";
export * from "./watermark/index.mjs";
export * from "./upload/index.mjs";
export * from "./marquee/index.mjs";
export * from "./pagination/index.mjs";
export * from "./image/index.mjs";
export * from "./descriptions/index.mjs";
export * from "./tabs/index.mjs";
export * from "./steps/index.mjs";
export * from "./config-provider/index.mjs";
export * from "./affix/index.mjs";
export * from "./infinite-scroll/index.mjs";
export * from "./dropdown/index.mjs";
export * from "./menu/index.mjs";
export * from "./calendar/index.mjs";
export * from "./waterfall/index.mjs";
export * from "./tree/index.mjs";
export * from "./countdown/index.mjs";
export * from "./table/index.mjs";
export * from "./space/index.mjs";
export * from "./avatar/index.mjs";
export * from "./empty/index.mjs";
export * from "./typography/index.mjs";
export * from "./container/index.mjs";
export * from "./result/index.mjs";
export * from "./grid/index.mjs";
export * from "./mention/index.mjs";
export * from "./ai-chat/index.mjs";
export * from "./ai-bubble/index.mjs";
export * from "./ai-sender/index.mjs";
export * from "./ai-thought-chain/index.mjs";
export * from "./ai-code-block/index.mjs";
export * from "./ai-code-editor/index.mjs";
export * from "./ai-code-runner/index.mjs";
export * from "./ai-thinking/index.mjs";
export * from "./ai-welcome/index.mjs";
export * from "./ai-action-group/index.mjs";
export * from "./ai-editor-sender/index.mjs";
export * from "./ai-artifacts/index.mjs";
export * from "./ai-voice-trigger/index.mjs";
export * from "./ai-conversations/index.mjs";
export * from "./ai-prompts/index.mjs";
export * from "./ai-agent-card/index.mjs";
export * from "./ai-sources/index.mjs";
export * from "./ai-provider/index.mjs";
export * from "./ai-mention/index.mjs";
export * from "./ai-bubble-list/index.mjs";
export * from "./ai-file-card/index.mjs";
export * from "./ai-attachments/index.mjs";
export * from "./ai-mermaid/index.mjs";
export * from "./carousel/index.mjs";
export * from "./scrollbar/index.mjs";
export * from "./gantt-chart/index.mjs";
export * from "./sku-selector/index.mjs";
export * from "./price/index.mjs";
export * from "./product-card/index.mjs";
export * from "./image-magnifier/index.mjs";
export * from "./coupon-card/index.mjs";
export * from "./lucky-draw/index.mjs";
export * from "./filter-bar/index.mjs";
export * from "./submit-bar/index.mjs";
export * from "./category-nav/index.mjs";
export * from "./smart-address/index.mjs";
const components = [
  YhButton,
  YhInput,
  YhCheckbox,
  YhCheckboxGroup,
  YhRadio,
  YhRadioGroup,
  YhRadioButton,
  YhTag,
  YhInputNumber,
  YhInputTag,
  YhIcon,
  YhForm,
  YhFormItem,
  YhFormSchema,
  YhRow,
  YhCol,
  YhDivider,
  YhRate,
  YhSwitch,
  YhAutocomplete,
  YhSelect,
  YhOption,
  YhCascader,
  YhCascaderPanel,
  YhSlider,
  YhTimeSelect,
  YhTimePicker,
  YhDatePicker,
  YhTransfer,
  YhTransferPanel,
  YhTreeSelect,
  YhBadge,
  YhCard,
  YhColorPicker,
  YhSpin,
  YhLoading,
  YhMessageBox,
  YhBreadcrumb,
  YhBreadcrumbItem,
  YhBackTop,
  YhAlert,
  YhSkeleton,
  YhSkeletonItem,
  YhProgress,
  YhTooltip,
  YhPopconfirm,
  YhPopover,
  YhDialog,
  YhDialogMethod,
  YhDrawer,
  YhWatermark,
  YhUpload,
  YhMarquee,
  YhPagination,
  YhImage,
  YhImageViewer,
  YhDescriptions,
  YhDescriptionsItem,
  YhTabs,
  YhTabPane,
  YhSteps,
  YhStep,
  YhConfigProvider,
  YhAffix,
  YhInfiniteScroll,
  YhDropdown,
  YhDropdownItem,
  YhDropdownMenu,
  YhMenu,
  YhMenuItem,
  YhMenuItemGroup,
  YhSubMenu,
  YhCalendar,
  YhWaterfall,
  YhTree,
  YhTreeNode,
  YhCountdown,
  YhTable,
  YhTableColumn,
  YhSpace,
  YhAvatar,
  YhEmpty,
  YhTypographyTitle,
  YhTypographyText,
  YhTypographyParagraph,
  YhTypographyLink,
  YhContainer,
  YhHeader,
  YhAside,
  YhMain,
  YhFooter,
  YhResult,
  YhGrid,
  YhGridItem,
  YhMention,
  YhAiChat,
  YhAiBubble,
  YhAiSender,
  YhAiThoughtChain,
  YhAiCodeBlock,
  YhAiCodeEditor,
  YhAiCodeRunner,
  YhAiThinking,
  YhAiWelcome,
  YhAiActionGroup,
  YhAiEditorSender,
  YhAiArtifacts,
  YhAiVoiceTrigger,
  YhAiConversations,
  YhAiPrompts,
  YhAiAgentCard,
  YhAiSources,
  YhAiProvider,
  YhAiMention,
  YhAiBubbleList,
  YhAiFileCard,
  YhAiAttachments,
  YhAiMermaid,
  YhCarousel,
  YhCarouselItem,
  YhScrollbar,
  YhGanttChart,
  YhSkuSelector,
  YhPrice,
  YhProductCard,
  YhImageMagnifier,
  YhCouponCard,
  YhLuckyDraw,
  YhFilterBar,
  YhSubmitBar,
  YhCategoryNav,
  YhSmartAddress
];
export const install = (app) => {
  components.forEach((component) => {
    app.use(component);
  });
  app.config.globalProperties.$message = YhMessage;
  app.config.globalProperties.$notify = YhNotification;
  app.config.globalProperties.$dialog = YhDialogMethod;
  app.config.globalProperties.$msgbox = YhMessageBox;
  app.config.globalProperties.$alert = YhMessageBox.alert;
  app.config.globalProperties.$confirm = YhMessageBox.confirm;
  app.config.globalProperties.$prompt = YhMessageBox.prompt;
};
export default {
  install,
  // 导出函数式 API，便于具名导入
  YhMessage,
  YhNotification,
  YhDialogMethod
};
