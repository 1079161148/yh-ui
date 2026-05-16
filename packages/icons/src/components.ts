import { defineComponent, h } from 'vue'
import type { PropType } from 'vue'
import { YhIcon } from './vue/icon'
import type { IconColor, IconRotate, IconSize } from './types'

export const iconComponentProps = {
  size: {
    type: [Number, String] as PropType<IconSize>,
    default: undefined
  },
  color: {
    type: String as PropType<IconColor>,
    default: undefined
  },
  spin: {
    type: Boolean,
    default: false
  },
  rotate: {
    type: Number as PropType<IconRotate>,
    default: 0
  }
} as const

export interface IconComponentMeta {
  name: string
  icon: string
  category: string
}

export function createIconComponent(componentName: string, icon: string) {
  return defineComponent({
    name: componentName,
    inheritAttrs: false,
    props: iconComponentProps,
    setup(props, { attrs }) {
      return () =>
        h(YhIcon, {
          ...attrs,
          icon,
          size: props.size,
          color: props.color,
          spin: props.spin,
          rotate: props.rotate
        })
    }
  })
}

export const iconComponentMeta = [
  { name: 'AddLocation', icon: 'ep:add-location', category: 'map' },
  { name: 'Aim', icon: 'ep:aim', category: 'system' },
  { name: 'AlarmClock', icon: 'ep:alarm-clock', category: 'time' },
  { name: 'Apple', icon: 'ep:apple', category: 'food' },
  { name: 'ArrowDown', icon: 'ep:arrow-down', category: 'arrow' },
  { name: 'ArrowDownBold', icon: 'ep:arrow-down-bold', category: 'arrow' },
  { name: 'ArrowLeft', icon: 'ep:arrow-left', category: 'arrow' },
  { name: 'ArrowLeftBold', icon: 'ep:arrow-left-bold', category: 'arrow' },
  { name: 'ArrowRight', icon: 'ep:arrow-right', category: 'arrow' },
  { name: 'ArrowRightBold', icon: 'ep:arrow-right-bold', category: 'arrow' },
  { name: 'ArrowUp', icon: 'ep:arrow-up', category: 'arrow' },
  { name: 'ArrowUpBold', icon: 'ep:arrow-up-bold', category: 'arrow' },
  { name: 'Avatar', icon: 'ep:avatar', category: 'user' },
  { name: 'Back', icon: 'ep:back', category: 'arrow' },
  { name: 'Basketball', icon: 'ep:basketball', category: 'object' },
  { name: 'Bell', icon: 'ep:bell', category: 'feedback' },
  { name: 'BellFilled', icon: 'ep:bell-filled', category: 'feedback' },
  { name: 'Bicycle', icon: 'ep:bicycle', category: 'object' },
  { name: 'Bottom', icon: 'ep:bottom', category: 'arrow' },
  { name: 'BottomLeft', icon: 'ep:bottom-left', category: 'arrow' },
  { name: 'BottomRight', icon: 'ep:bottom-right', category: 'arrow' },
  { name: 'Bowl', icon: 'ep:bowl', category: 'food' },
  { name: 'Box', icon: 'ep:box', category: 'object' },
  { name: 'Briefcase', icon: 'ep:briefcase', category: 'business' },
  { name: 'Brush', icon: 'ep:brush', category: 'edit' },
  { name: 'BrushFilled', icon: 'ep:brush-filled', category: 'edit' },
  { name: 'Burger', icon: 'ep:burger', category: 'food' },
  { name: 'Calendar', icon: 'ep:calendar', category: 'time' },
  { name: 'Camera', icon: 'ep:camera', category: 'media' },
  { name: 'CameraFilled', icon: 'ep:camera-filled', category: 'media' },
  { name: 'CaretBottom', icon: 'ep:caret-bottom', category: 'arrow' },
  { name: 'CaretLeft', icon: 'ep:caret-left', category: 'arrow' },
  { name: 'CaretRight', icon: 'ep:caret-right', category: 'arrow' },
  { name: 'CaretTop', icon: 'ep:caret-top', category: 'arrow' },
  { name: 'Cellphone', icon: 'ep:cellphone', category: 'device' },
  { name: 'ChatDotRound', icon: 'ep:chat-dot-round', category: 'communication' },
  { name: 'ChatDotSquare', icon: 'ep:chat-dot-square', category: 'communication' },
  { name: 'ChatLineRound', icon: 'ep:chat-line-round', category: 'communication' },
  { name: 'ChatLineSquare', icon: 'ep:chat-line-square', category: 'communication' },
  { name: 'ChatRound', icon: 'ep:chat-round', category: 'communication' },
  { name: 'ChatSquare', icon: 'ep:chat-square', category: 'communication' },
  { name: 'Check', icon: 'ep:check', category: 'system' },
  { name: 'Checked', icon: 'ep:checked', category: 'system' },
  { name: 'Cherry', icon: 'ep:cherry', category: 'food' },
  { name: 'Chicken', icon: 'ep:chicken', category: 'food' },
  { name: 'ChromeFilled', icon: 'ep:chrome-filled', category: 'brand' },
  { name: 'CircleCheck', icon: 'ep:circle-check', category: 'feedback' },
  { name: 'CircleCheckFilled', icon: 'ep:circle-check-filled', category: 'feedback' },
  { name: 'CircleClose', icon: 'ep:circle-close', category: 'feedback' },
  { name: 'CircleCloseFilled', icon: 'ep:circle-close-filled', category: 'feedback' },
  { name: 'CirclePlus', icon: 'ep:circle-plus', category: 'system' },
  { name: 'CirclePlusFilled', icon: 'ep:circle-plus-filled', category: 'system' },
  { name: 'Clock', icon: 'ep:clock', category: 'time' },
  { name: 'Close', icon: 'ep:close', category: 'system' },
  { name: 'CloseBold', icon: 'ep:close-bold', category: 'system' },
  { name: 'Cloudy', icon: 'ep:cloudy', category: 'weather' },
  { name: 'Coffee', icon: 'ep:coffee', category: 'food' },
  { name: 'CoffeeCup', icon: 'ep:coffee-cup', category: 'food' },
  { name: 'Coin', icon: 'ep:coin', category: 'business' },
  { name: 'ColdDrink', icon: 'ep:cold-drink', category: 'food' },
  { name: 'Collection', icon: 'ep:collection', category: 'object' },
  { name: 'CollectionTag', icon: 'ep:collection-tag', category: 'object' },
  { name: 'Comment', icon: 'ep:comment', category: 'communication' },
  { name: 'Compass', icon: 'ep:compass', category: 'map' },
  { name: 'Connection', icon: 'ep:connection', category: 'system' },
  { name: 'Coordinate', icon: 'ep:coordinate', category: 'map' },
  { name: 'CopyDocument', icon: 'ep:copy-document', category: 'file' },
  { name: 'Cpu', icon: 'ep:cpu', category: 'device' },
  { name: 'CreditCard', icon: 'ep:credit-card', category: 'business' },
  { name: 'Crop', icon: 'ep:crop', category: 'edit' },
  { name: 'DArrowLeft', icon: 'ep:d-arrow-left', category: 'arrow' },
  { name: 'DArrowRight', icon: 'ep:d-arrow-right', category: 'arrow' },
  { name: 'DCaret', icon: 'ep:d-caret', category: 'arrow' },
  { name: 'DataAnalysis', icon: 'ep:data-analysis', category: 'data' },
  { name: 'DataBoard', icon: 'ep:data-board', category: 'data' },
  { name: 'DataLine', icon: 'ep:data-line', category: 'data' },
  { name: 'Delete', icon: 'ep:delete', category: 'system' },
  { name: 'DeleteFilled', icon: 'ep:delete-filled', category: 'system' },
  { name: 'DeleteLocation', icon: 'ep:delete-location', category: 'map' },
  { name: 'Dessert', icon: 'ep:dessert', category: 'food' },
  { name: 'Discount', icon: 'ep:discount', category: 'business' },
  { name: 'Dish', icon: 'ep:dish', category: 'food' },
  { name: 'DishDot', icon: 'ep:dish-dot', category: 'food' },
  { name: 'Document', icon: 'ep:document', category: 'file' },
  { name: 'DocumentAdd', icon: 'ep:document-add', category: 'file' },
  { name: 'DocumentChecked', icon: 'ep:document-checked', category: 'file' },
  { name: 'DocumentCopy', icon: 'ep:document-copy', category: 'file' },
  { name: 'DocumentDelete', icon: 'ep:document-delete', category: 'file' },
  { name: 'DocumentRemove', icon: 'ep:document-remove', category: 'file' },
  { name: 'Download', icon: 'ep:download', category: 'system' },
  { name: 'Drizzling', icon: 'ep:drizzling', category: 'weather' },
  { name: 'Edit', icon: 'ep:edit', category: 'edit' },
  { name: 'EditPen', icon: 'ep:edit-pen', category: 'edit' },
  { name: 'Eleme', icon: 'ep:eleme', category: 'brand' },
  { name: 'ElemeFilled', icon: 'ep:eleme-filled', category: 'brand' },
  { name: 'ElementPlus', icon: 'ep:element-plus', category: 'brand' },
  { name: 'Expand', icon: 'ep:expand', category: 'system' },
  { name: 'Failed', icon: 'ep:failed', category: 'feedback' },
  { name: 'Female', icon: 'ep:female', category: 'user' },
  { name: 'Files', icon: 'ep:files', category: 'file' },
  { name: 'Film', icon: 'ep:film', category: 'media' },
  { name: 'Filter', icon: 'ep:filter', category: 'system' },
  { name: 'Finished', icon: 'ep:finished', category: 'feedback' },
  { name: 'FirstAidKit', icon: 'ep:first-aid-kit', category: 'object' },
  { name: 'Flag', icon: 'ep:flag', category: 'object' },
  { name: 'Fold', icon: 'ep:fold', category: 'system' },
  { name: 'Folder', icon: 'ep:folder', category: 'file' },
  { name: 'FolderAdd', icon: 'ep:folder-add', category: 'file' },
  { name: 'FolderChecked', icon: 'ep:folder-checked', category: 'file' },
  { name: 'FolderDelete', icon: 'ep:folder-delete', category: 'file' },
  { name: 'FolderOpened', icon: 'ep:folder-opened', category: 'file' },
  { name: 'FolderRemove', icon: 'ep:folder-remove', category: 'file' },
  { name: 'Food', icon: 'ep:food', category: 'food' },
  { name: 'Football', icon: 'ep:football', category: 'object' },
  { name: 'ForkSpoon', icon: 'ep:fork-spoon', category: 'food' },
  { name: 'Fries', icon: 'ep:fries', category: 'food' },
  { name: 'FullScreen', icon: 'ep:full-screen', category: 'system' },
  { name: 'Goblet', icon: 'ep:goblet', category: 'food' },
  { name: 'GobletFull', icon: 'ep:goblet-full', category: 'food' },
  { name: 'GobletSquare', icon: 'ep:goblet-square', category: 'food' },
  { name: 'GobletSquareFull', icon: 'ep:goblet-square-full', category: 'food' },
  { name: 'GoldMedal', icon: 'ep:gold-medal', category: 'object' },
  { name: 'Goods', icon: 'ep:goods', category: 'business' },
  { name: 'GoodsFilled', icon: 'ep:goods-filled', category: 'business' },
  { name: 'Grape', icon: 'ep:grape', category: 'food' },
  { name: 'Grid', icon: 'ep:grid', category: 'system' },
  { name: 'Guide', icon: 'ep:guide', category: 'map' },
  { name: 'Handbag', icon: 'ep:handbag', category: 'business' },
  { name: 'Headset', icon: 'ep:headset', category: 'communication' },
  { name: 'Help', icon: 'ep:help', category: 'feedback' },
  { name: 'HelpFilled', icon: 'ep:help-filled', category: 'feedback' },
  { name: 'Hide', icon: 'ep:hide', category: 'system' },
  { name: 'Histogram', icon: 'ep:histogram', category: 'data' },
  { name: 'HomeFilled', icon: 'ep:home-filled', category: 'system' },
  { name: 'HotWater', icon: 'ep:hot-water', category: 'food' },
  { name: 'House', icon: 'ep:house', category: 'system' },
  { name: 'IceCream', icon: 'ep:ice-cream', category: 'food' },
  { name: 'IceCreamRound', icon: 'ep:ice-cream-round', category: 'food' },
  { name: 'IceCreamSquare', icon: 'ep:ice-cream-square', category: 'food' },
  { name: 'IceDrink', icon: 'ep:ice-drink', category: 'food' },
  { name: 'IceTea', icon: 'ep:ice-tea', category: 'food' },
  { name: 'InfoFilled', icon: 'ep:info-filled', category: 'feedback' },
  { name: 'Iphone', icon: 'ep:iphone', category: 'device' },
  { name: 'Key', icon: 'ep:key', category: 'system' },
  { name: 'KnifeFork', icon: 'ep:knife-fork', category: 'food' },
  { name: 'Lightning', icon: 'ep:lightning', category: 'weather' },
  { name: 'Link', icon: 'ep:link', category: 'system' },
  { name: 'List', icon: 'ep:list', category: 'system' },
  { name: 'Loading', icon: 'ep:loading', category: 'feedback' },
  { name: 'Location', icon: 'ep:location', category: 'map' },
  { name: 'LocationFilled', icon: 'ep:location-filled', category: 'map' },
  { name: 'LocationInformation', icon: 'ep:location-information', category: 'map' },
  { name: 'Lock', icon: 'ep:lock', category: 'system' },
  { name: 'Lollipop', icon: 'ep:lollipop', category: 'food' },
  { name: 'MagicStick', icon: 'ep:magic-stick', category: 'edit' },
  { name: 'Magnet', icon: 'ep:magnet', category: 'object' },
  { name: 'Male', icon: 'ep:male', category: 'user' },
  { name: 'Management', icon: 'ep:management', category: 'business' },
  { name: 'MapLocation', icon: 'ep:map-location', category: 'map' },
  { name: 'Medal', icon: 'ep:medal', category: 'object' },
  { name: 'Memo', icon: 'ep:memo', category: 'file' },
  { name: 'Menu', icon: 'ep:menu', category: 'system' },
  { name: 'Message', icon: 'ep:message', category: 'communication' },
  { name: 'MessageBox', icon: 'ep:message-box', category: 'communication' },
  { name: 'Mic', icon: 'ep:mic', category: 'media' },
  { name: 'Microphone', icon: 'ep:microphone', category: 'media' },
  { name: 'MilkTea', icon: 'ep:milk-tea', category: 'food' },
  { name: 'Minus', icon: 'ep:minus', category: 'system' },
  { name: 'Money', icon: 'ep:money', category: 'business' },
  { name: 'Monitor', icon: 'ep:monitor', category: 'device' },
  { name: 'Moon', icon: 'ep:moon', category: 'weather' },
  { name: 'MoonNight', icon: 'ep:moon-night', category: 'weather' },
  { name: 'More', icon: 'ep:more', category: 'system' },
  { name: 'MoreFilled', icon: 'ep:more-filled', category: 'system' },
  { name: 'MostlyCloudy', icon: 'ep:mostly-cloudy', category: 'weather' },
  { name: 'Mouse', icon: 'ep:mouse', category: 'device' },
  { name: 'Mug', icon: 'ep:mug', category: 'food' },
  { name: 'Mute', icon: 'ep:mute', category: 'media' },
  { name: 'MuteNotification', icon: 'ep:mute-notification', category: 'feedback' },
  { name: 'NoSmoking', icon: 'ep:no-smoking', category: 'object' },
  { name: 'Notebook', icon: 'ep:notebook', category: 'file' },
  { name: 'Notification', icon: 'ep:notification', category: 'feedback' },
  { name: 'Odometer', icon: 'ep:odometer', category: 'device' },
  { name: 'OfficeBuilding', icon: 'ep:office-building', category: 'business' },
  { name: 'Open', icon: 'ep:open', category: 'system' },
  { name: 'Operation', icon: 'ep:operation', category: 'system' },
  { name: 'Opportunity', icon: 'ep:opportunity', category: 'business' },
  { name: 'Orange', icon: 'ep:orange', category: 'food' },
  { name: 'Paperclip', icon: 'ep:paperclip', category: 'file' },
  { name: 'PartlyCloudy', icon: 'ep:partly-cloudy', category: 'weather' },
  { name: 'Pear', icon: 'ep:pear', category: 'food' },
  { name: 'Phone', icon: 'ep:phone', category: 'communication' },
  { name: 'PhoneFilled', icon: 'ep:phone-filled', category: 'communication' },
  { name: 'Picture', icon: 'ep:picture', category: 'media' },
  { name: 'PictureFilled', icon: 'ep:picture-filled', category: 'media' },
  { name: 'PictureRounded', icon: 'ep:picture-rounded', category: 'media' },
  { name: 'PieChart', icon: 'ep:pie-chart', category: 'data' },
  { name: 'Place', icon: 'ep:place', category: 'map' },
  { name: 'Platform', icon: 'ep:platform', category: 'device' },
  { name: 'Plus', icon: 'ep:plus', category: 'system' },
  { name: 'Pointer', icon: 'ep:pointer', category: 'system' },
  { name: 'Position', icon: 'ep:position', category: 'map' },
  { name: 'Postcard', icon: 'ep:postcard', category: 'file' },
  { name: 'Pouring', icon: 'ep:pouring', category: 'weather' },
  { name: 'Present', icon: 'ep:present', category: 'object' },
  { name: 'PriceTag', icon: 'ep:price-tag', category: 'business' },
  { name: 'Printer', icon: 'ep:printer', category: 'device' },
  { name: 'Promotion', icon: 'ep:promotion', category: 'business' },
  { name: 'QuartzWatch', icon: 'ep:quartz-watch', category: 'time' },
  { name: 'QuestionFilled', icon: 'ep:question-filled', category: 'feedback' },
  { name: 'Rank', icon: 'ep:rank', category: 'system' },
  { name: 'Reading', icon: 'ep:reading', category: 'file' },
  { name: 'ReadingLamp', icon: 'ep:reading-lamp', category: 'object' },
  { name: 'Refresh', icon: 'ep:refresh', category: 'system' },
  { name: 'RefreshLeft', icon: 'ep:refresh-left', category: 'system' },
  { name: 'RefreshRight', icon: 'ep:refresh-right', category: 'system' },
  { name: 'Refrigerator', icon: 'ep:refrigerator', category: 'device' },
  { name: 'Remove', icon: 'ep:remove', category: 'system' },
  { name: 'RemoveFilled', icon: 'ep:remove-filled', category: 'system' },
  { name: 'Right', icon: 'ep:right', category: 'arrow' },
  { name: 'ScaleToOriginal', icon: 'ep:scale-to-original', category: 'system' },
  { name: 'School', icon: 'ep:school', category: 'business' },
  { name: 'Scissor', icon: 'ep:scissor', category: 'edit' },
  { name: 'Search', icon: 'ep:search', category: 'system' },
  { name: 'Select', icon: 'ep:select', category: 'system' },
  { name: 'Sell', icon: 'ep:sell', category: 'business' },
  { name: 'SemiSelect', icon: 'ep:semi-select', category: 'system' },
  { name: 'Service', icon: 'ep:service', category: 'communication' },
  { name: 'SetUp', icon: 'ep:set-up', category: 'system' },
  { name: 'Setting', icon: 'ep:setting', category: 'system' },
  { name: 'Share', icon: 'ep:share', category: 'system' },
  { name: 'Ship', icon: 'ep:ship', category: 'object' },
  { name: 'Shop', icon: 'ep:shop', category: 'business' },
  { name: 'ShoppingBag', icon: 'ep:shopping-bag', category: 'business' },
  { name: 'ShoppingCart', icon: 'ep:shopping-cart', category: 'business' },
  { name: 'ShoppingCartFull', icon: 'ep:shopping-cart-full', category: 'business' },
  { name: 'ShoppingTrolley', icon: 'ep:shopping-trolley', category: 'business' },
  { name: 'Smoking', icon: 'ep:smoking', category: 'object' },
  { name: 'Soccer', icon: 'ep:soccer', category: 'object' },
  { name: 'SoldOut', icon: 'ep:sold-out', category: 'business' },
  { name: 'Sort', icon: 'ep:sort', category: 'system' },
  { name: 'SortDown', icon: 'ep:sort-down', category: 'system' },
  { name: 'SortUp', icon: 'ep:sort-up', category: 'system' },
  { name: 'Stamp', icon: 'ep:stamp', category: 'object' },
  { name: 'Star', icon: 'ep:star', category: 'feedback' },
  { name: 'StarFilled', icon: 'ep:star-filled', category: 'feedback' },
  { name: 'Stopwatch', icon: 'ep:stopwatch', category: 'time' },
  { name: 'SuccessFilled', icon: 'ep:success-filled', category: 'feedback' },
  { name: 'Sugar', icon: 'ep:sugar', category: 'food' },
  { name: 'Suitcase', icon: 'ep:suitcase', category: 'business' },
  { name: 'SuitcaseLine', icon: 'ep:suitcase-line', category: 'business' },
  { name: 'Sunny', icon: 'ep:sunny', category: 'weather' },
  { name: 'Sunrise', icon: 'ep:sunrise', category: 'weather' },
  { name: 'Sunset', icon: 'ep:sunset', category: 'weather' },
  { name: 'Switch', icon: 'ep:switch', category: 'system' },
  { name: 'SwitchButton', icon: 'ep:switch-button', category: 'system' },
  { name: 'SwitchFilled', icon: 'ep:switch-filled', category: 'system' },
  { name: 'TakeawayBox', icon: 'ep:takeaway-box', category: 'business' },
  { name: 'Ticket', icon: 'ep:ticket', category: 'business' },
  { name: 'Tickets', icon: 'ep:tickets', category: 'business' },
  { name: 'Timer', icon: 'ep:timer', category: 'time' },
  { name: 'ToiletPaper', icon: 'ep:toilet-paper', category: 'object' },
  { name: 'Tools', icon: 'ep:tools', category: 'system' },
  { name: 'Top', icon: 'ep:top', category: 'arrow' },
  { name: 'TopLeft', icon: 'ep:top-left', category: 'arrow' },
  { name: 'TopRight', icon: 'ep:top-right', category: 'arrow' },
  { name: 'TrendCharts', icon: 'ep:trend-charts', category: 'data' },
  { name: 'Trophy', icon: 'ep:trophy', category: 'object' },
  { name: 'TrophyBase', icon: 'ep:trophy-base', category: 'object' },
  { name: 'TurnOff', icon: 'ep:turn-off', category: 'system' },
  { name: 'Umbrella', icon: 'ep:umbrella', category: 'weather' },
  { name: 'Unlock', icon: 'ep:unlock', category: 'system' },
  { name: 'Upload', icon: 'ep:upload', category: 'system' },
  { name: 'UploadFilled', icon: 'ep:upload-filled', category: 'system' },
  { name: 'User', icon: 'ep:user', category: 'user' },
  { name: 'UserFilled', icon: 'ep:user-filled', category: 'user' },
  { name: 'Van', icon: 'ep:van', category: 'object' },
  { name: 'VideoCamera', icon: 'ep:video-camera', category: 'media' },
  { name: 'VideoCameraFilled', icon: 'ep:video-camera-filled', category: 'media' },
  { name: 'VideoPause', icon: 'ep:video-pause', category: 'media' },
  { name: 'VideoPlay', icon: 'ep:video-play', category: 'media' },
  { name: 'View', icon: 'ep:view', category: 'system' },
  { name: 'Wallet', icon: 'ep:wallet', category: 'business' },
  { name: 'WalletFilled', icon: 'ep:wallet-filled', category: 'business' },
  { name: 'WarnTriangleFilled', icon: 'ep:warn-triangle-filled', category: 'feedback' },
  { name: 'Warning', icon: 'ep:warning', category: 'feedback' },
  { name: 'WarningFilled', icon: 'ep:warning-filled', category: 'feedback' },
  { name: 'Watch', icon: 'ep:watch', category: 'time' },
  { name: 'Watermelon', icon: 'ep:watermelon', category: 'food' },
  { name: 'WindPower', icon: 'ep:wind-power', category: 'weather' },
  { name: 'ZoomIn', icon: 'ep:zoom-in', category: 'system' },
  { name: 'ZoomOut', icon: 'ep:zoom-out', category: 'system' }
] as const satisfies readonly IconComponentMeta[]

export type IconComponentName = (typeof iconComponentMeta)[number]['name']

export const AddLocation = createIconComponent('AddLocation', 'ep:add-location')
export const Aim = createIconComponent('Aim', 'ep:aim')
export const AlarmClock = createIconComponent('AlarmClock', 'ep:alarm-clock')
export const Apple = createIconComponent('Apple', 'ep:apple')
export const ArrowDown = createIconComponent('ArrowDown', 'ep:arrow-down')
export const ArrowDownBold = createIconComponent('ArrowDownBold', 'ep:arrow-down-bold')
export const ArrowLeft = createIconComponent('ArrowLeft', 'ep:arrow-left')
export const ArrowLeftBold = createIconComponent('ArrowLeftBold', 'ep:arrow-left-bold')
export const ArrowRight = createIconComponent('ArrowRight', 'ep:arrow-right')
export const ArrowRightBold = createIconComponent('ArrowRightBold', 'ep:arrow-right-bold')
export const ArrowUp = createIconComponent('ArrowUp', 'ep:arrow-up')
export const ArrowUpBold = createIconComponent('ArrowUpBold', 'ep:arrow-up-bold')
export const Avatar = createIconComponent('Avatar', 'ep:avatar')
export const Back = createIconComponent('Back', 'ep:back')
export const Basketball = createIconComponent('Basketball', 'ep:basketball')
export const Bell = createIconComponent('Bell', 'ep:bell')
export const BellFilled = createIconComponent('BellFilled', 'ep:bell-filled')
export const Bicycle = createIconComponent('Bicycle', 'ep:bicycle')
export const Bottom = createIconComponent('Bottom', 'ep:bottom')
export const BottomLeft = createIconComponent('BottomLeft', 'ep:bottom-left')
export const BottomRight = createIconComponent('BottomRight', 'ep:bottom-right')
export const Bowl = createIconComponent('Bowl', 'ep:bowl')
export const Box = createIconComponent('Box', 'ep:box')
export const Briefcase = createIconComponent('Briefcase', 'ep:briefcase')
export const Brush = createIconComponent('Brush', 'ep:brush')
export const BrushFilled = createIconComponent('BrushFilled', 'ep:brush-filled')
export const Burger = createIconComponent('Burger', 'ep:burger')
export const Calendar = createIconComponent('Calendar', 'ep:calendar')
export const Camera = createIconComponent('Camera', 'ep:camera')
export const CameraFilled = createIconComponent('CameraFilled', 'ep:camera-filled')
export const CaretBottom = createIconComponent('CaretBottom', 'ep:caret-bottom')
export const CaretLeft = createIconComponent('CaretLeft', 'ep:caret-left')
export const CaretRight = createIconComponent('CaretRight', 'ep:caret-right')
export const CaretTop = createIconComponent('CaretTop', 'ep:caret-top')
export const Cellphone = createIconComponent('Cellphone', 'ep:cellphone')
export const ChatDotRound = createIconComponent('ChatDotRound', 'ep:chat-dot-round')
export const ChatDotSquare = createIconComponent('ChatDotSquare', 'ep:chat-dot-square')
export const ChatLineRound = createIconComponent('ChatLineRound', 'ep:chat-line-round')
export const ChatLineSquare = createIconComponent('ChatLineSquare', 'ep:chat-line-square')
export const ChatRound = createIconComponent('ChatRound', 'ep:chat-round')
export const ChatSquare = createIconComponent('ChatSquare', 'ep:chat-square')
export const Check = createIconComponent('Check', 'ep:check')
export const Checked = createIconComponent('Checked', 'ep:checked')
export const Cherry = createIconComponent('Cherry', 'ep:cherry')
export const Chicken = createIconComponent('Chicken', 'ep:chicken')
export const ChromeFilled = createIconComponent('ChromeFilled', 'ep:chrome-filled')
export const CircleCheck = createIconComponent('CircleCheck', 'ep:circle-check')
export const CircleCheckFilled = createIconComponent('CircleCheckFilled', 'ep:circle-check-filled')
export const CircleClose = createIconComponent('CircleClose', 'ep:circle-close')
export const CircleCloseFilled = createIconComponent('CircleCloseFilled', 'ep:circle-close-filled')
export const CirclePlus = createIconComponent('CirclePlus', 'ep:circle-plus')
export const CirclePlusFilled = createIconComponent('CirclePlusFilled', 'ep:circle-plus-filled')
export const Clock = createIconComponent('Clock', 'ep:clock')
export const Close = createIconComponent('Close', 'ep:close')
export const CloseBold = createIconComponent('CloseBold', 'ep:close-bold')
export const Cloudy = createIconComponent('Cloudy', 'ep:cloudy')
export const Coffee = createIconComponent('Coffee', 'ep:coffee')
export const CoffeeCup = createIconComponent('CoffeeCup', 'ep:coffee-cup')
export const Coin = createIconComponent('Coin', 'ep:coin')
export const ColdDrink = createIconComponent('ColdDrink', 'ep:cold-drink')
export const Collection = createIconComponent('Collection', 'ep:collection')
export const CollectionTag = createIconComponent('CollectionTag', 'ep:collection-tag')
export const Comment = createIconComponent('Comment', 'ep:comment')
export const Compass = createIconComponent('Compass', 'ep:compass')
export const Connection = createIconComponent('Connection', 'ep:connection')
export const Coordinate = createIconComponent('Coordinate', 'ep:coordinate')
export const CopyDocument = createIconComponent('CopyDocument', 'ep:copy-document')
export const Cpu = createIconComponent('Cpu', 'ep:cpu')
export const CreditCard = createIconComponent('CreditCard', 'ep:credit-card')
export const Crop = createIconComponent('Crop', 'ep:crop')
export const DArrowLeft = createIconComponent('DArrowLeft', 'ep:d-arrow-left')
export const DArrowRight = createIconComponent('DArrowRight', 'ep:d-arrow-right')
export const DCaret = createIconComponent('DCaret', 'ep:d-caret')
export const DataAnalysis = createIconComponent('DataAnalysis', 'ep:data-analysis')
export const DataBoard = createIconComponent('DataBoard', 'ep:data-board')
export const DataLine = createIconComponent('DataLine', 'ep:data-line')
export const Delete = createIconComponent('Delete', 'ep:delete')
export const DeleteFilled = createIconComponent('DeleteFilled', 'ep:delete-filled')
export const DeleteLocation = createIconComponent('DeleteLocation', 'ep:delete-location')
export const Dessert = createIconComponent('Dessert', 'ep:dessert')
export const Discount = createIconComponent('Discount', 'ep:discount')
export const Dish = createIconComponent('Dish', 'ep:dish')
export const DishDot = createIconComponent('DishDot', 'ep:dish-dot')
export const Document = createIconComponent('Document', 'ep:document')
export const DocumentAdd = createIconComponent('DocumentAdd', 'ep:document-add')
export const DocumentChecked = createIconComponent('DocumentChecked', 'ep:document-checked')
export const DocumentCopy = createIconComponent('DocumentCopy', 'ep:document-copy')
export const DocumentDelete = createIconComponent('DocumentDelete', 'ep:document-delete')
export const DocumentRemove = createIconComponent('DocumentRemove', 'ep:document-remove')
export const Download = createIconComponent('Download', 'ep:download')
export const Drizzling = createIconComponent('Drizzling', 'ep:drizzling')
export const Edit = createIconComponent('Edit', 'ep:edit')
export const EditPen = createIconComponent('EditPen', 'ep:edit-pen')
export const Eleme = createIconComponent('Eleme', 'ep:eleme')
export const ElemeFilled = createIconComponent('ElemeFilled', 'ep:eleme-filled')
export const ElementPlus = createIconComponent('ElementPlus', 'ep:element-plus')
export const Expand = createIconComponent('Expand', 'ep:expand')
export const Failed = createIconComponent('Failed', 'ep:failed')
export const Female = createIconComponent('Female', 'ep:female')
export const Files = createIconComponent('Files', 'ep:files')
export const Film = createIconComponent('Film', 'ep:film')
export const Filter = createIconComponent('Filter', 'ep:filter')
export const Finished = createIconComponent('Finished', 'ep:finished')
export const FirstAidKit = createIconComponent('FirstAidKit', 'ep:first-aid-kit')
export const Flag = createIconComponent('Flag', 'ep:flag')
export const Fold = createIconComponent('Fold', 'ep:fold')
export const Folder = createIconComponent('Folder', 'ep:folder')
export const FolderAdd = createIconComponent('FolderAdd', 'ep:folder-add')
export const FolderChecked = createIconComponent('FolderChecked', 'ep:folder-checked')
export const FolderDelete = createIconComponent('FolderDelete', 'ep:folder-delete')
export const FolderOpened = createIconComponent('FolderOpened', 'ep:folder-opened')
export const FolderRemove = createIconComponent('FolderRemove', 'ep:folder-remove')
export const Food = createIconComponent('Food', 'ep:food')
export const Football = createIconComponent('Football', 'ep:football')
export const ForkSpoon = createIconComponent('ForkSpoon', 'ep:fork-spoon')
export const Fries = createIconComponent('Fries', 'ep:fries')
export const FullScreen = createIconComponent('FullScreen', 'ep:full-screen')
export const Goblet = createIconComponent('Goblet', 'ep:goblet')
export const GobletFull = createIconComponent('GobletFull', 'ep:goblet-full')
export const GobletSquare = createIconComponent('GobletSquare', 'ep:goblet-square')
export const GobletSquareFull = createIconComponent('GobletSquareFull', 'ep:goblet-square-full')
export const GoldMedal = createIconComponent('GoldMedal', 'ep:gold-medal')
export const Goods = createIconComponent('Goods', 'ep:goods')
export const GoodsFilled = createIconComponent('GoodsFilled', 'ep:goods-filled')
export const Grape = createIconComponent('Grape', 'ep:grape')
export const Grid = createIconComponent('Grid', 'ep:grid')
export const Guide = createIconComponent('Guide', 'ep:guide')
export const Handbag = createIconComponent('Handbag', 'ep:handbag')
export const Headset = createIconComponent('Headset', 'ep:headset')
export const Help = createIconComponent('Help', 'ep:help')
export const HelpFilled = createIconComponent('HelpFilled', 'ep:help-filled')
export const Hide = createIconComponent('Hide', 'ep:hide')
export const Histogram = createIconComponent('Histogram', 'ep:histogram')
export const HomeFilled = createIconComponent('HomeFilled', 'ep:home-filled')
export const HotWater = createIconComponent('HotWater', 'ep:hot-water')
export const House = createIconComponent('House', 'ep:house')
export const IceCream = createIconComponent('IceCream', 'ep:ice-cream')
export const IceCreamRound = createIconComponent('IceCreamRound', 'ep:ice-cream-round')
export const IceCreamSquare = createIconComponent('IceCreamSquare', 'ep:ice-cream-square')
export const IceDrink = createIconComponent('IceDrink', 'ep:ice-drink')
export const IceTea = createIconComponent('IceTea', 'ep:ice-tea')
export const InfoFilled = createIconComponent('InfoFilled', 'ep:info-filled')
export const Iphone = createIconComponent('Iphone', 'ep:iphone')
export const Key = createIconComponent('Key', 'ep:key')
export const KnifeFork = createIconComponent('KnifeFork', 'ep:knife-fork')
export const Lightning = createIconComponent('Lightning', 'ep:lightning')
export const Link = createIconComponent('Link', 'ep:link')
export const List = createIconComponent('List', 'ep:list')
export const Loading = createIconComponent('Loading', 'ep:loading')
export const Location = createIconComponent('Location', 'ep:location')
export const LocationFilled = createIconComponent('LocationFilled', 'ep:location-filled')
export const LocationInformation = createIconComponent(
  'LocationInformation',
  'ep:location-information'
)
export const Lock = createIconComponent('Lock', 'ep:lock')
export const Lollipop = createIconComponent('Lollipop', 'ep:lollipop')
export const MagicStick = createIconComponent('MagicStick', 'ep:magic-stick')
export const Magnet = createIconComponent('Magnet', 'ep:magnet')
export const Male = createIconComponent('Male', 'ep:male')
export const Management = createIconComponent('Management', 'ep:management')
export const MapLocation = createIconComponent('MapLocation', 'ep:map-location')
export const Medal = createIconComponent('Medal', 'ep:medal')
export const Memo = createIconComponent('Memo', 'ep:memo')
export const Menu = createIconComponent('Menu', 'ep:menu')
export const Message = createIconComponent('Message', 'ep:message')
export const MessageBox = createIconComponent('MessageBox', 'ep:message-box')
export const Mic = createIconComponent('Mic', 'ep:mic')
export const Microphone = createIconComponent('Microphone', 'ep:microphone')
export const MilkTea = createIconComponent('MilkTea', 'ep:milk-tea')
export const Minus = createIconComponent('Minus', 'ep:minus')
export const Money = createIconComponent('Money', 'ep:money')
export const Monitor = createIconComponent('Monitor', 'ep:monitor')
export const Moon = createIconComponent('Moon', 'ep:moon')
export const MoonNight = createIconComponent('MoonNight', 'ep:moon-night')
export const More = createIconComponent('More', 'ep:more')
export const MoreFilled = createIconComponent('MoreFilled', 'ep:more-filled')
export const MostlyCloudy = createIconComponent('MostlyCloudy', 'ep:mostly-cloudy')
export const Mouse = createIconComponent('Mouse', 'ep:mouse')
export const Mug = createIconComponent('Mug', 'ep:mug')
export const Mute = createIconComponent('Mute', 'ep:mute')
export const MuteNotification = createIconComponent('MuteNotification', 'ep:mute-notification')
export const NoSmoking = createIconComponent('NoSmoking', 'ep:no-smoking')
export const Notebook = createIconComponent('Notebook', 'ep:notebook')
export const Notification = createIconComponent('Notification', 'ep:notification')
export const Odometer = createIconComponent('Odometer', 'ep:odometer')
export const OfficeBuilding = createIconComponent('OfficeBuilding', 'ep:office-building')
export const Open = createIconComponent('Open', 'ep:open')
export const Operation = createIconComponent('Operation', 'ep:operation')
export const Opportunity = createIconComponent('Opportunity', 'ep:opportunity')
export const Orange = createIconComponent('Orange', 'ep:orange')
export const Paperclip = createIconComponent('Paperclip', 'ep:paperclip')
export const PartlyCloudy = createIconComponent('PartlyCloudy', 'ep:partly-cloudy')
export const Pear = createIconComponent('Pear', 'ep:pear')
export const Phone = createIconComponent('Phone', 'ep:phone')
export const PhoneFilled = createIconComponent('PhoneFilled', 'ep:phone-filled')
export const Picture = createIconComponent('Picture', 'ep:picture')
export const PictureFilled = createIconComponent('PictureFilled', 'ep:picture-filled')
export const PictureRounded = createIconComponent('PictureRounded', 'ep:picture-rounded')
export const PieChart = createIconComponent('PieChart', 'ep:pie-chart')
export const Place = createIconComponent('Place', 'ep:place')
export const Platform = createIconComponent('Platform', 'ep:platform')
export const Plus = createIconComponent('Plus', 'ep:plus')
export const Pointer = createIconComponent('Pointer', 'ep:pointer')
export const Position = createIconComponent('Position', 'ep:position')
export const Postcard = createIconComponent('Postcard', 'ep:postcard')
export const Pouring = createIconComponent('Pouring', 'ep:pouring')
export const Present = createIconComponent('Present', 'ep:present')
export const PriceTag = createIconComponent('PriceTag', 'ep:price-tag')
export const Printer = createIconComponent('Printer', 'ep:printer')
export const Promotion = createIconComponent('Promotion', 'ep:promotion')
export const QuartzWatch = createIconComponent('QuartzWatch', 'ep:quartz-watch')
export const QuestionFilled = createIconComponent('QuestionFilled', 'ep:question-filled')
export const Rank = createIconComponent('Rank', 'ep:rank')
export const Reading = createIconComponent('Reading', 'ep:reading')
export const ReadingLamp = createIconComponent('ReadingLamp', 'ep:reading-lamp')
export const Refresh = createIconComponent('Refresh', 'ep:refresh')
export const RefreshLeft = createIconComponent('RefreshLeft', 'ep:refresh-left')
export const RefreshRight = createIconComponent('RefreshRight', 'ep:refresh-right')
export const Refrigerator = createIconComponent('Refrigerator', 'ep:refrigerator')
export const Remove = createIconComponent('Remove', 'ep:remove')
export const RemoveFilled = createIconComponent('RemoveFilled', 'ep:remove-filled')
export const Right = createIconComponent('Right', 'ep:right')
export const ScaleToOriginal = createIconComponent('ScaleToOriginal', 'ep:scale-to-original')
export const School = createIconComponent('School', 'ep:school')
export const Scissor = createIconComponent('Scissor', 'ep:scissor')
export const Search = createIconComponent('Search', 'ep:search')
export const Select = createIconComponent('Select', 'ep:select')
export const Sell = createIconComponent('Sell', 'ep:sell')
export const SemiSelect = createIconComponent('SemiSelect', 'ep:semi-select')
export const Service = createIconComponent('Service', 'ep:service')
export const SetUp = createIconComponent('SetUp', 'ep:set-up')
export const Setting = createIconComponent('Setting', 'ep:setting')
export const Share = createIconComponent('Share', 'ep:share')
export const Ship = createIconComponent('Ship', 'ep:ship')
export const Shop = createIconComponent('Shop', 'ep:shop')
export const ShoppingBag = createIconComponent('ShoppingBag', 'ep:shopping-bag')
export const ShoppingCart = createIconComponent('ShoppingCart', 'ep:shopping-cart')
export const ShoppingCartFull = createIconComponent('ShoppingCartFull', 'ep:shopping-cart-full')
export const ShoppingTrolley = createIconComponent('ShoppingTrolley', 'ep:shopping-trolley')
export const Smoking = createIconComponent('Smoking', 'ep:smoking')
export const Soccer = createIconComponent('Soccer', 'ep:soccer')
export const SoldOut = createIconComponent('SoldOut', 'ep:sold-out')
export const Sort = createIconComponent('Sort', 'ep:sort')
export const SortDown = createIconComponent('SortDown', 'ep:sort-down')
export const SortUp = createIconComponent('SortUp', 'ep:sort-up')
export const Stamp = createIconComponent('Stamp', 'ep:stamp')
export const Star = createIconComponent('Star', 'ep:star')
export const StarFilled = createIconComponent('StarFilled', 'ep:star-filled')
export const Stopwatch = createIconComponent('Stopwatch', 'ep:stopwatch')
export const SuccessFilled = createIconComponent('SuccessFilled', 'ep:success-filled')
export const Sugar = createIconComponent('Sugar', 'ep:sugar')
export const Suitcase = createIconComponent('Suitcase', 'ep:suitcase')
export const SuitcaseLine = createIconComponent('SuitcaseLine', 'ep:suitcase-line')
export const Sunny = createIconComponent('Sunny', 'ep:sunny')
export const Sunrise = createIconComponent('Sunrise', 'ep:sunrise')
export const Sunset = createIconComponent('Sunset', 'ep:sunset')
export const Switch = createIconComponent('Switch', 'ep:switch')
export const SwitchButton = createIconComponent('SwitchButton', 'ep:switch-button')
export const SwitchFilled = createIconComponent('SwitchFilled', 'ep:switch-filled')
export const TakeawayBox = createIconComponent('TakeawayBox', 'ep:takeaway-box')
export const Ticket = createIconComponent('Ticket', 'ep:ticket')
export const Tickets = createIconComponent('Tickets', 'ep:tickets')
export const Timer = createIconComponent('Timer', 'ep:timer')
export const ToiletPaper = createIconComponent('ToiletPaper', 'ep:toilet-paper')
export const Tools = createIconComponent('Tools', 'ep:tools')
export const Top = createIconComponent('Top', 'ep:top')
export const TopLeft = createIconComponent('TopLeft', 'ep:top-left')
export const TopRight = createIconComponent('TopRight', 'ep:top-right')
export const TrendCharts = createIconComponent('TrendCharts', 'ep:trend-charts')
export const Trophy = createIconComponent('Trophy', 'ep:trophy')
export const TrophyBase = createIconComponent('TrophyBase', 'ep:trophy-base')
export const TurnOff = createIconComponent('TurnOff', 'ep:turn-off')
export const Umbrella = createIconComponent('Umbrella', 'ep:umbrella')
export const Unlock = createIconComponent('Unlock', 'ep:unlock')
export const Upload = createIconComponent('Upload', 'ep:upload')
export const UploadFilled = createIconComponent('UploadFilled', 'ep:upload-filled')
export const User = createIconComponent('User', 'ep:user')
export const UserFilled = createIconComponent('UserFilled', 'ep:user-filled')
export const Van = createIconComponent('Van', 'ep:van')
export const VideoCamera = createIconComponent('VideoCamera', 'ep:video-camera')
export const VideoCameraFilled = createIconComponent('VideoCameraFilled', 'ep:video-camera-filled')
export const VideoPause = createIconComponent('VideoPause', 'ep:video-pause')
export const VideoPlay = createIconComponent('VideoPlay', 'ep:video-play')
export const View = createIconComponent('View', 'ep:view')
export const Wallet = createIconComponent('Wallet', 'ep:wallet')
export const WalletFilled = createIconComponent('WalletFilled', 'ep:wallet-filled')
export const WarnTriangleFilled = createIconComponent(
  'WarnTriangleFilled',
  'ep:warn-triangle-filled'
)
export const Warning = createIconComponent('Warning', 'ep:warning')
export const WarningFilled = createIconComponent('WarningFilled', 'ep:warning-filled')
export const Watch = createIconComponent('Watch', 'ep:watch')
export const Watermelon = createIconComponent('Watermelon', 'ep:watermelon')
export const WindPower = createIconComponent('WindPower', 'ep:wind-power')
export const ZoomIn = createIconComponent('ZoomIn', 'ep:zoom-in')
export const ZoomOut = createIconComponent('ZoomOut', 'ep:zoom-out')

export const iconComponents = {
  AddLocation,
  Aim,
  AlarmClock,
  Apple,
  ArrowDown,
  ArrowDownBold,
  ArrowLeft,
  ArrowLeftBold,
  ArrowRight,
  ArrowRightBold,
  ArrowUp,
  ArrowUpBold,
  Avatar,
  Back,
  Basketball,
  Bell,
  BellFilled,
  Bicycle,
  Bottom,
  BottomLeft,
  BottomRight,
  Bowl,
  Box,
  Briefcase,
  Brush,
  BrushFilled,
  Burger,
  Calendar,
  Camera,
  CameraFilled,
  CaretBottom,
  CaretLeft,
  CaretRight,
  CaretTop,
  Cellphone,
  ChatDotRound,
  ChatDotSquare,
  ChatLineRound,
  ChatLineSquare,
  ChatRound,
  ChatSquare,
  Check,
  Checked,
  Cherry,
  Chicken,
  ChromeFilled,
  CircleCheck,
  CircleCheckFilled,
  CircleClose,
  CircleCloseFilled,
  CirclePlus,
  CirclePlusFilled,
  Clock,
  Close,
  CloseBold,
  Cloudy,
  Coffee,
  CoffeeCup,
  Coin,
  ColdDrink,
  Collection,
  CollectionTag,
  Comment,
  Compass,
  Connection,
  Coordinate,
  CopyDocument,
  Cpu,
  CreditCard,
  Crop,
  DArrowLeft,
  DArrowRight,
  DCaret,
  DataAnalysis,
  DataBoard,
  DataLine,
  Delete,
  DeleteFilled,
  DeleteLocation,
  Dessert,
  Discount,
  Dish,
  DishDot,
  Document,
  DocumentAdd,
  DocumentChecked,
  DocumentCopy,
  DocumentDelete,
  DocumentRemove,
  Download,
  Drizzling,
  Edit,
  EditPen,
  Eleme,
  ElemeFilled,
  ElementPlus,
  Expand,
  Failed,
  Female,
  Files,
  Film,
  Filter,
  Finished,
  FirstAidKit,
  Flag,
  Fold,
  Folder,
  FolderAdd,
  FolderChecked,
  FolderDelete,
  FolderOpened,
  FolderRemove,
  Food,
  Football,
  ForkSpoon,
  Fries,
  FullScreen,
  Goblet,
  GobletFull,
  GobletSquare,
  GobletSquareFull,
  GoldMedal,
  Goods,
  GoodsFilled,
  Grape,
  Grid,
  Guide,
  Handbag,
  Headset,
  Help,
  HelpFilled,
  Hide,
  Histogram,
  HomeFilled,
  HotWater,
  House,
  IceCream,
  IceCreamRound,
  IceCreamSquare,
  IceDrink,
  IceTea,
  InfoFilled,
  Iphone,
  Key,
  KnifeFork,
  Lightning,
  Link,
  List,
  Loading,
  Location,
  LocationFilled,
  LocationInformation,
  Lock,
  Lollipop,
  MagicStick,
  Magnet,
  Male,
  Management,
  MapLocation,
  Medal,
  Memo,
  Menu,
  Message,
  MessageBox,
  Mic,
  Microphone,
  MilkTea,
  Minus,
  Money,
  Monitor,
  Moon,
  MoonNight,
  More,
  MoreFilled,
  MostlyCloudy,
  Mouse,
  Mug,
  Mute,
  MuteNotification,
  NoSmoking,
  Notebook,
  Notification,
  Odometer,
  OfficeBuilding,
  Open,
  Operation,
  Opportunity,
  Orange,
  Paperclip,
  PartlyCloudy,
  Pear,
  Phone,
  PhoneFilled,
  Picture,
  PictureFilled,
  PictureRounded,
  PieChart,
  Place,
  Platform,
  Plus,
  Pointer,
  Position,
  Postcard,
  Pouring,
  Present,
  PriceTag,
  Printer,
  Promotion,
  QuartzWatch,
  QuestionFilled,
  Rank,
  Reading,
  ReadingLamp,
  Refresh,
  RefreshLeft,
  RefreshRight,
  Refrigerator,
  Remove,
  RemoveFilled,
  Right,
  ScaleToOriginal,
  School,
  Scissor,
  Search,
  Select,
  Sell,
  SemiSelect,
  Service,
  SetUp,
  Setting,
  Share,
  Ship,
  Shop,
  ShoppingBag,
  ShoppingCart,
  ShoppingCartFull,
  ShoppingTrolley,
  Smoking,
  Soccer,
  SoldOut,
  Sort,
  SortDown,
  SortUp,
  Stamp,
  Star,
  StarFilled,
  Stopwatch,
  SuccessFilled,
  Sugar,
  Suitcase,
  SuitcaseLine,
  Sunny,
  Sunrise,
  Sunset,
  Switch,
  SwitchButton,
  SwitchFilled,
  TakeawayBox,
  Ticket,
  Tickets,
  Timer,
  ToiletPaper,
  Tools,
  Top,
  TopLeft,
  TopRight,
  TrendCharts,
  Trophy,
  TrophyBase,
  TurnOff,
  Umbrella,
  Unlock,
  Upload,
  UploadFilled,
  User,
  UserFilled,
  Van,
  VideoCamera,
  VideoCameraFilled,
  VideoPause,
  VideoPlay,
  View,
  Wallet,
  WalletFilled,
  WarnTriangleFilled,
  Warning,
  WarningFilled,
  Watch,
  Watermelon,
  WindPower,
  ZoomIn,
  ZoomOut
} as const
