const t = [
  {
    name: "Material Design Icons",
    prefix: "mdi",
    author: "Material Design Community",
    license: "MIT",
    total: 7e3
  },
  {
    name: "Element Plus",
    prefix: "ep",
    author: "Element Plus Team",
    license: "MIT",
    total: 200
  },
  {
    name: "Lucide",
    prefix: "lucide",
    author: "Lucide Contributors",
    license: "ISC",
    total: 1500
  },
  {
    name: "Tabler Icons",
    prefix: "tabler",
    author: "Tabler Team",
    license: "MIT",
    total: 4600
  },
  {
    name: "Remix Icon",
    prefix: "ri",
    author: "Remix Icon Team",
    license: "Apache 2.0",
    total: 2500
  },
  {
    name: "Heroicons",
    prefix: "heroicons",
    author: "Tailwind Labs",
    license: "MIT",
    total: 600
  },
  {
    name: "Bootstrap Icons",
    prefix: "bi",
    author: "Bootstrap Team",
    license: "MIT",
    total: 2600
  },
  {
    name: "Font Awesome 6 Free",
    prefix: "fa",
    author: "Font Awesome",
    license: "CC BY 4.0",
    total: 2e3
  },
  {
    name: "Carbon Icons",
    prefix: "carbon",
    author: "IBM",
    license: "Apache 2.0",
    total: 1600
  },
  {
    name: "Ant Design Icons",
    prefix: "antd",
    author: "Ant Financial",
    license: "MIT",
    total: 800
  }
];
function a(e) {
  return t.find((n) => n.prefix === e);
}
function o() {
  return t.map((e) => e.prefix);
}
export {
  t as ICON_COLLECTIONS,
  o as getAllPrefixes,
  a as getCollection
};
