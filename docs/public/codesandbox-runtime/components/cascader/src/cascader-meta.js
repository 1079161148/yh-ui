const CascaderContextKey = Symbol('CascaderContextKey')
const defaultCascaderConfig = {
  expandTrigger: 'click',
  multiple: false,
  checkStrictly: false,
  emitPath: true,
  lazy: false,
  lazyLoad: void 0,
  value: 'value',
  label: 'label',
  children: 'children',
  disabled: 'disabled',
  leaf: 'leaf'
}
export { CascaderContextKey, defaultCascaderConfig }
