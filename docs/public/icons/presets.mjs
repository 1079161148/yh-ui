const n = [
  {
    name: "Material Design Icons",
    prefix: "mdi",
    count: 7e3,
    description: "最流行的开源图标库，Material Design 风格"
  },
  {
    name: "Element Plus",
    prefix: "ep",
    count: 200,
    description: "Element Plus 官方图标库"
  },
  {
    name: "Lucide",
    prefix: "lucide",
    count: 1500,
    description: "现代、简洁风格的图标库"
  },
  {
    name: "Tabler Icons",
    prefix: "tabler",
    count: 4600,
    description: "高质量的 SVG 图标库"
  },
  {
    name: "Remix Icon",
    prefix: "ri",
    count: 2500,
    description: "精心设计的图标库"
  },
  {
    name: "Heroicons",
    prefix: "heroicons",
    count: 600,
    description: "Tailwind CSS 官方图标库"
  },
  {
    name: "Bootstrap Icons",
    prefix: "bi",
    count: 2600,
    description: "Bootstrap 官方图标库"
  },
  {
    name: "Font Awesome 6",
    prefix: "fa",
    count: 2e3,
    description: "最流行的图标字体库"
  },
  {
    name: "Carbon Icons",
    prefix: "carbon",
    count: 1600,
    description: "IBM Carbon 设计系统图标"
  },
  {
    name: "Ant Design Icons",
    prefix: "antd",
    count: 800,
    description: "Ant Design 官方图标库"
  }
];
function r(e) {
  return n.find((i) => i.prefix === e);
}
const o = ["mdi", "ep", "lucide", "tabler", "ri"], d = {
  // Material Design Icons
  mdi: "mdi",
  // Element Plus
  ep: "ep",
  "element-plus": "ep",
  // Lucide
  lucide: "lucide",
  // Tabler
  tabler: "tabler",
  // Remix Icon
  ri: "ri",
  remix: "ri",
  // Heroicons
  heroicons: "heroicons",
  hero: "heroicons",
  // Bootstrap
  bi: "bi",
  bootstrap: "bi",
  // Font Awesome
  fa: "fa",
  "font-awesome": "fa",
  // Carbon
  carbon: "carbon",
  // Ant Design
  antd: "antd",
  "ant-design": "antd"
}, t = {
  // 箭头
  "arrow-up": "mdi:arrow-up",
  "arrow-down": "mdi:arrow-down",
  "arrow-left": "mdi:arrow-left",
  "arrow-right": "mdi:arrow-right",
  // 操作
  close: "mdi:close",
  check: "mdi:check",
  plus: "mdi:plus",
  minus: "mdi:minus",
  delete: "mdi:delete",
  edit: "mdi:pencil",
  search: "mdi:magnify",
  upload: "mdi:upload",
  download: "mdi:download",
  refresh: "mdi:refresh",
  settings: "mdi:cog",
  menu: "mdi:menu",
  // 状态
  loading: "mdi:loading",
  success: "mdi:check-circle",
  warning: "mdi:alert",
  error: "mdi:alert-circle",
  info: "mdi:information",
  // 用户
  user: "mdi:user",
  users: "mdi:account-group",
  // 文件
  file: "mdi:file",
  folder: "mdi:folder",
  image: "mdi:image"
};
export {
  t as COMMON_ICONS,
  o as DEFAULT_ENABLED_PRESETS,
  d as PREFIX_ALIAS,
  n as PRESETS,
  r as getPreset
};
