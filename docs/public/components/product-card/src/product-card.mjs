export const productCardProps = {
  image: {
    type: String,
    default: ""
  },
  hoverImage: {
    type: String,
    default: ""
  },
  videoSrc: {
    type: String,
    default: ""
  },
  title: {
    type: String,
    default: ""
  },
  description: {
    type: String,
    default: ""
  },
  price: {
    type: [Number, String],
    default: 0
  },
  vipPrice: {
    type: [Number, String],
    default: ""
  },
  vipLabel: {
    type: String,
    default: ""
  },
  marketPrice: {
    type: [Number, String],
    default: ""
  },
  currency: {
    type: String,
    default: "\xA5"
  },
  unit: {
    type: String,
    default: ""
  },
  ribbon: {
    type: String,
    default: ""
  },
  ribbonColor: {
    type: String,
    default: ""
  },
  tag: {
    type: String,
    default: ""
  },
  tagType: {
    type: String,
    default: "danger"
  },
  badges: {
    type: Array,
    default: () => []
  },
  layout: {
    type: String,
    default: "vertical"
  },
  lazy: {
    type: Boolean,
    default: true
  },
  stockProgress: {
    type: Number,
    default: 0
  },
  stockColor: {
    type: String,
    default: ""
  },
  stockText: {
    type: String,
    default: ""
  },
  border: {
    type: Boolean,
    default: true
  },
  shadow: {
    type: Boolean,
    default: true
  },
  readonly: {
    type: Boolean,
    default: false
  },
  actionText: {
    type: String,
    default: ""
  },
  actionLoading: {
    type: Boolean,
    default: false
  },
  soldOut: {
    type: Boolean,
    default: false
  },
  exposure: {
    type: Boolean,
    default: false
  },
  exposureThreshold: {
    type: Number,
    default: 0.5
  },
  exposureOnce: {
    type: Boolean,
    default: true
  },
  titleLines: {
    type: Number,
    default: 2
  },
  descriptionLines: {
    type: Number,
    default: 1
  },
  badgePosition: {
    type: String,
    default: "top"
  },
  themeOverrides: {
    type: Object,
    default: () => ({})
  }
};
export const productCardEmits = {
  click: (e) => e instanceof MouseEvent,
  action: (e) => e instanceof MouseEvent,
  expose: () => true
};
