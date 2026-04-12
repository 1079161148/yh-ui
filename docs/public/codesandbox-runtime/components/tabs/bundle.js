// docs/public/codesandbox-runtime/components/tabs/src/tabs.js
import {
  createCommentVNode as _createCommentVNode,
  renderList as _renderList,
  Fragment as _Fragment,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  normalizeClass as _normalizeClass,
  renderSlot as _renderSlot,
  toDisplayString as _toDisplayString,
  createElementVNode as _createElementVNode,
  withModifiers as _withModifiers,
  withKeys as _withKeys,
  normalizeStyle as _normalizeStyle
} from 'vue'
import {
  ref as ref2,
  computed as computed2,
  provide as provide2,
  watch,
  onMounted,
  nextTick
} from 'vue'

// docs/public/codesandbox-runtime/hooks/use-namespace/index.js
import { inject, ref, unref } from 'vue'
var defaultNamespace = 'yh'
var statePrefix = 'is-'
var namespaceContextKey = Symbol('namespaceContextKey')
var useGlobalNamespace = () => {
  return inject(namespaceContextKey, ref(defaultNamespace))
}
var useNamespace = (block) => {
  const namespace = useGlobalNamespace()
  const b = (blockSuffix = '') => {
    const ns = unref(namespace)
    return blockSuffix ? `${ns}-${block}-${blockSuffix}` : `${ns}-${block}`
  }
  const e = (element) => {
    return element ? `${b()}__${element}` : ''
  }
  const m = (modifier) => {
    return modifier ? `${b()}--${modifier}` : ''
  }
  const bem = (blockSuffix, element, modifier) => {
    let cls = b(blockSuffix)
    if (element) cls += `__${element}`
    if (modifier) cls += `--${modifier}`
    return cls
  }
  const em = (element, modifier) => {
    return element && modifier ? `${b()}__${element}--${modifier}` : ''
  }
  function is(state, value) {
    if (arguments.length === 1) {
      return `${statePrefix}${state}`
    }
    return value ? `${statePrefix}${state}` : ''
  }
  const cssVar = (name) => {
    return `--${unref(namespace)}-${block}-${name}`
  }
  const cssVarObj = (vars) => {
    const obj = {}
    Object.entries(vars).forEach(([key, value]) => {
      obj[cssVar(key)] = value
    })
    return obj
  }
  const cssVarBlock = (name) => {
    return `--${unref(namespace)}-${name}`
  }
  const cssVarBlockObj = (vars) => {
    const obj = {}
    Object.entries(vars).forEach(([key, value]) => {
      obj[cssVarBlock(key)] = value
    })
    return obj
  }
  return {
    namespace,
    b,
    e,
    m,
    bem,
    em,
    is,
    cssVar,
    cssVarObj,
    cssVarBlock,
    cssVarBlockObj
  }
}

// docs/public/codesandbox-runtime/theme/component-theme.js
import { inject as inject2, provide, computed, unref as unref2 } from 'vue'
var __defProp = Object.defineProperty
var __getOwnPropSymbols = Object.getOwnPropertySymbols
var __hasOwnProp = Object.prototype.hasOwnProperty
var __propIsEnum = Object.prototype.propertyIsEnumerable
var __defNormalProp = (obj, key, value) =>
  key in obj
    ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value })
    : (obj[key] = value)
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {})) if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop])
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop])
    }
  return a
}
var COMPONENT_THEME_KEY = Symbol('component-theme')
function useComponentTheme(componentName, localOverrides) {
  const globalThemes = inject2(COMPONENT_THEME_KEY, {})
  const mergedVars = computed(() => {
    const globalVars = globalThemes[componentName] || {}
    const local = unref2(localOverrides) || {}
    return __spreadValues(__spreadValues({}, globalVars), local)
  })
  const themeStyle = computed(() => {
    const vars = mergedVars.value
    const style = {}
    Object.entries(vars).forEach(([key, value]) => {
      if (value !== void 0) {
        const cssVarName = `--yh-${componentName}-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`
        style[cssVarName] = value
      }
    })
    return style
  })
  const hasCustomTheme = computed(() => {
    return Object.keys(mergedVars.value).length > 0
  })
  return {
    themeVars: mergedVars,
    themeStyle,
    hasCustomTheme
  }
}

// docs/public/codesandbox-runtime/components/tabs/src/tabs-meta.js
var tabsProps = {
  /** 当前激活的标签名 */
  modelValue: {
    type: [String, Number],
    default: ''
  },
  /** 标签类型 */
  type: {
    type: String,
    default: 'line'
  },
  /** 标签位置 */
  tabPosition: {
    type: String,
    default: 'top'
  },
  /** 是否可拖拽排序 (Premium) */
  draggable: {
    type: Boolean,
    default: false
  },
  /** 是否可关闭标签 */
  closable: {
    type: Boolean,
    default: false
  },
  /** 是否可新增标签 */
  addable: {
    type: Boolean,
    default: false
  },
  /** 同时可编辑（可关闭+可新增） */
  editable: {
    type: Boolean,
    default: false
  },
  /** 切换前钩子，返回 false 或 Promise.reject 可阻止切换 */
  beforeLeave: {
    type: Function
  },
  /** 是否撑满容器 */
  stretch: {
    type: Boolean,
    default: false
  },
  /** 标签栏自定义类名 */
  navClass: {
    type: String,
    default: ''
  },
  /** 内容区自定义类名 */
  contentClass: {
    type: String,
    default: ''
  },
  /** 指示器宽度（水平方向时为长度，垂直方向时为粗细），如 '50%'、'80px'、'auto' */
  indicatorWidth: {
    type: String,
    default: ''
  },
  /** 指示器高度（垂直方向时为长度，水平方向时为粗细），如 '50%'、'80px'、'auto' */
  indicatorHeight: {
    type: String,
    default: ''
  },
  /** 选中态颜色 */
  activeColor: {
    type: String,
    default: ''
  },
  /** 未选中态颜色 */
  inactiveColor: {
    type: String,
    default: ''
  },
  /** 触发方式 */
  trigger: {
    type: String,
    default: 'click'
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
}
var tabsEmits = {
  'update:modelValue': (name) => typeof name === 'string' || typeof name === 'number',
  'tab-click': (pane, _ev) => pane !== void 0,
  'tab-change': (name) => typeof name === 'string' || typeof name === 'number',
  'tab-remove': (name) => typeof name === 'string' || typeof name === 'number',
  'tab-add': () => true,
  'tab-drag-end': (names) => Array.isArray(names)
}
var TABS_INJECTION_KEY = Symbol('yhTabs')

// docs/public/codesandbox-runtime/components/tabs/src/tabs.js
var __defProp2 = Object.defineProperty
var __getOwnPropSymbols2 = Object.getOwnPropertySymbols
var __hasOwnProp2 = Object.prototype.hasOwnProperty
var __propIsEnum2 = Object.prototype.propertyIsEnumerable
var __defNormalProp2 = (obj, key, value) =>
  key in obj
    ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value })
    : (obj[key] = value)
var __spreadValues2 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp2.call(b, prop)) __defNormalProp2(a, prop, b[prop])
  if (__getOwnPropSymbols2)
    for (var prop of __getOwnPropSymbols2(b)) {
      if (__propIsEnum2.call(b, prop)) __defNormalProp2(a, prop, b[prop])
    }
  return a
}
var _hoisted_1 = ['tabindex', 'aria-selected', 'onClick', 'onKeydown', 'onMouseenter']
var _hoisted_2 = ['onClick']
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      'div',
      {
        class: _normalizeClass($setup.tabsClass),
        style: _normalizeStyle($setup.tabsStyle)
      },
      [
        _createCommentVNode(' \u6807\u7B7E\u680F '),
        _createElementVNode(
          'div',
          {
            ref: 'navRef',
            class: _normalizeClass([$setup.ns.e('nav'), _ctx.navClass])
          },
          [
            _createElementVNode(
              'div',
              {
                class: _normalizeClass($setup.ns.e('nav-wrap'))
              },
              [
                _createElementVNode(
                  'div',
                  {
                    class: _normalizeClass($setup.ns.e('nav-list'))
                  },
                  [
                    (_openBlock(true),
                    _createElementBlock(
                      _Fragment,
                      null,
                      _renderList($setup.panes, (pane) => {
                        return (
                          _openBlock(),
                          _createElementBlock(
                            'div',
                            {
                              key: pane.name,
                              class: _normalizeClass([
                                $setup.ns.e('item'),
                                $setup.ns.is('active', $setup.activeTab === pane.name),
                                $setup.ns.is('disabled', pane.disabled),
                                $setup.ns.is(
                                  'closable',
                                  pane.closable !== false && $setup.isClosable
                                )
                              ]),
                              role: 'tab',
                              tabindex: pane.disabled ? -1 : 0,
                              'aria-selected': $setup.activeTab === pane.name,
                              onClick: ($event) => $setup.handleTabClick(pane, $event),
                              onKeydown: _withKeys(
                                ($event) => $setup.handleTabClick(pane, $event),
                                ['enter']
                              ),
                              onMouseenter: ($event) => $setup.handleTabHover(pane)
                            },
                            [
                              _createCommentVNode(' \u56FE\u6807 '),
                              pane.icon
                                ? (_openBlock(),
                                  _createElementBlock(
                                    'span',
                                    {
                                      key: 0,
                                      class: _normalizeClass([$setup.ns.e('icon'), pane.icon])
                                    },
                                    null,
                                    2
                                    /* CLASS */
                                  ))
                                : _createCommentVNode('v-if', true),
                              _createCommentVNode(' \u6807\u7B7E\u63D2\u69FD '),
                              _renderSlot(_ctx.$slots, 'label', { pane }, () => [
                                _createElementVNode(
                                  'span',
                                  {
                                    class: _normalizeClass($setup.ns.e('label'))
                                  },
                                  _toDisplayString(pane.label),
                                  3
                                  /* TEXT, CLASS */
                                )
                              ]),
                              _createCommentVNode(' \u5173\u95ED\u6309\u94AE '),
                              pane.closable !== false && $setup.isClosable && !pane.disabled
                                ? (_openBlock(),
                                  _createElementBlock(
                                    'span',
                                    {
                                      key: 1,
                                      class: _normalizeClass($setup.ns.e('close')),
                                      onClick: _withModifiers(
                                        ($event) => $setup.handleTabRemove(pane, $event),
                                        ['stop']
                                      )
                                    },
                                    [
                                      ...(_cache[0] ||
                                        (_cache[0] = [
                                          _createElementVNode(
                                            'svg',
                                            {
                                              viewBox: '0 0 1024 1024',
                                              width: '14',
                                              height: '14'
                                            },
                                            [
                                              _createElementVNode('path', {
                                                fill: 'currentColor',
                                                d: 'M764.3 260.3a32 32 0 0 0-45.3 0L512 467.2 305 260.3a32 32 0 0 0-45.3 45.2L466.8 512 259.7 718.5a32 32 0 0 0 45.3 45.3L512 556.7l207 207a32 32 0 0 0 45.3-45.2L557.2 512l207-206.5a32 32 0 0 0 0-45.2z'
                                              })
                                            ],
                                            -1
                                            /* CACHED */
                                          )
                                        ]))
                                    ],
                                    10,
                                    _hoisted_2
                                  ))
                                : _createCommentVNode('v-if', true)
                            ],
                            42,
                            _hoisted_1
                          )
                        )
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    )),
                    _createCommentVNode(' \u65B0\u589E\u6309\u94AE '),
                    $setup.isAddable
                      ? (_openBlock(),
                        _createElementBlock(
                          'div',
                          {
                            key: 0,
                            class: _normalizeClass($setup.ns.e('add')),
                            onClick: $setup.handleTabAdd
                          },
                          [
                            _renderSlot(_ctx.$slots, 'add-icon', {}, () => [
                              _cache[1] ||
                                (_cache[1] = _createElementVNode(
                                  'svg',
                                  {
                                    viewBox: '0 0 1024 1024',
                                    width: '16',
                                    height: '16'
                                  },
                                  [
                                    _createElementVNode('path', {
                                      fill: 'currentColor',
                                      d: 'M544 480V256a32 32 0 0 0-64 0v224H256a32 32 0 0 0 0 64h224v224a32 32 0 0 0 64 0V544h224a32 32 0 0 0 0-64H544z'
                                    })
                                  ],
                                  -1
                                  /* CACHED */
                                ))
                            ])
                          ],
                          2
                          /* CLASS */
                        ))
                      : _createCommentVNode('v-if', true)
                  ],
                  2
                  /* CLASS */
                ),
                _createCommentVNode(' Line \u7C7B\u578B\u6307\u793A\u5668 '),
                _ctx.type === 'line'
                  ? (_openBlock(),
                    _createElementBlock(
                      'div',
                      {
                        key: 0,
                        ref: 'indicatorRef',
                        class: _normalizeClass($setup.ns.e('indicator'))
                      },
                      null,
                      2
                      /* CLASS */
                    ))
                  : _createCommentVNode('v-if', true)
              ],
              2
              /* CLASS */
            )
          ],
          2
          /* CLASS */
        ),
        _createCommentVNode(' \u5185\u5BB9\u533A '),
        _createElementVNode(
          'div',
          {
            class: _normalizeClass([$setup.ns.e('content'), _ctx.contentClass])
          },
          [_renderSlot(_ctx.$slots, 'default')],
          2
          /* CLASS */
        )
      ],
      6
      /* CLASS, STYLE */
    )
  )
}
var __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhTabs'
  },
  {
    __name: 'tabs',
    props: tabsProps,
    emits: tabsEmits,
    setup(__props, { expose: __expose, emit: __emit }) {
      const props = __props
      const emit = __emit
      const ns = useNamespace('tabs')
      const { themeStyle } = useComponentTheme(
        'tabs',
        computed2(() => props.themeOverrides)
      )
      const panes = ref2([])
      const activeTab = ref2(props.modelValue)
      const navRef = ref2()
      const indicatorRef = ref2()
      watch(
        () => props.modelValue,
        (val) => {
          activeTab.value = val
        }
      )
      const registerPane = (pane) => {
        const index = panes.value.findIndex((p) => p.name === pane.name)
        if (index === -1) {
          panes.value.push(pane)
        } else {
          panes.value[index] = pane
        }
      }
      const unregisterPane = (name) => {
        const index = panes.value.findIndex((p) => p.name === name)
        if (index > -1) {
          panes.value.splice(index, 1)
        }
      }
      const activateTab = async (name) => {
        if (name === activeTab.value) return
        if (props.beforeLeave) {
          try {
            const result = await props.beforeLeave(name, activeTab.value)
            if (result === false) return
          } catch (e) {
            return
          }
        }
        activeTab.value = name
        emit('update:modelValue', name)
        emit('tab-change', name)
        nextTick(updateIndicator)
      }
      let hoverTimer = null
      const handleTabClick = (pane, ev) => {
        if (pane.disabled) return
        emit('tab-click', pane, ev)
        if (props.trigger === 'click') {
          activateTab(pane.name)
        }
      }
      const handleTabHover = (pane) => {
        if (pane.disabled || props.trigger !== 'hover') return
        if (hoverTimer) {
          clearTimeout(hoverTimer)
        }
        hoverTimer = setTimeout(() => {
          activateTab(pane.name)
        }, 100)
      }
      const handleTabRemove = (pane, ev) => {
        ev.stopPropagation()
        emit('tab-remove', pane.name)
      }
      const handleTabAdd = () => {
        emit('tab-add')
      }
      const updateIndicator = () => {
        if (!navRef.value || !indicatorRef.value || props.type !== 'line') return
        const activeEl = navRef.value.querySelector(`.${ns.e('item')}.${ns.is('active', true)}`)
        if (!activeEl) return
        const isVertical = props.tabPosition === 'left' || props.tabPosition === 'right'
        indicatorRef.value.style.width = ''
        indicatorRef.value.style.height = ''
        indicatorRef.value.style.transform = ''
        const computedStyle = getComputedStyle(navRef.value.closest(`.${ns.b()}`))
        const defaultIndicatorWidth =
          computedStyle.getPropertyValue('--yh-tabs-indicator-width').trim() || '40px'
        const defaultIndicatorHeight =
          computedStyle.getPropertyValue('--yh-tabs-indicator-height').trim() || '20px'
        const navRect = navRef.value.getBoundingClientRect()
        const activeRect = activeEl.getBoundingClientRect()
        if (isVertical) {
          const indicatorHeight = props.indicatorHeight || defaultIndicatorHeight
          const indicatorWidth = props.indicatorWidth || '2px'
          indicatorRef.value.style.width = indicatorWidth
          indicatorRef.value.style.height =
            indicatorHeight === 'auto' ? `${activeRect.height}px` : indicatorHeight
          indicatorRef.value.offsetHeight
          const indicatorActualHeight = indicatorRef.value.offsetHeight
          const relativeTop = activeRect.top - navRect.top
          const offset =
            indicatorHeight === 'auto'
              ? relativeTop
              : relativeTop + (activeRect.height - indicatorActualHeight) / 2
          indicatorRef.value.style.transform = `translateY(${offset}px)`
        } else {
          const indicatorWidth = props.indicatorWidth || defaultIndicatorWidth
          const indicatorHeight = props.indicatorHeight || '2px'
          indicatorRef.value.style.height = indicatorHeight
          indicatorRef.value.style.width =
            indicatorWidth === 'auto' ? `${activeRect.width}px` : indicatorWidth
          indicatorRef.value.offsetWidth
          const indicatorActualWidth = indicatorRef.value.offsetWidth
          const relativeLeft = activeRect.left - navRect.left
          const offset =
            indicatorWidth === 'auto'
              ? relativeLeft
              : relativeLeft + (activeRect.width - indicatorActualWidth) / 2
          indicatorRef.value.style.transform = `translateX(${offset}px)`
        }
      }
      onMounted(() => {
        if (!activeTab.value && panes.value.length > 0) {
          const firstEnabled = panes.value.find((p) => !p.disabled)
          if (firstEnabled) {
            activeTab.value = firstEnabled.name
            emit('update:modelValue', firstEnabled.name)
          }
        }
        nextTick(updateIndicator)
      })
      watch(panes, () => nextTick(updateIndicator), { deep: true })
      watch(
        () => props.tabPosition,
        () => {
          nextTick(() => {
            requestAnimationFrame(() => {
              updateIndicator()
            })
          })
        }
      )
      watch(
        () => [props.indicatorWidth, props.indicatorHeight],
        () => nextTick(updateIndicator)
      )
      provide2(TABS_INJECTION_KEY, {
        activeTab,
        registerPane,
        unregisterPane,
        activateTab
      })
      const isClosable = computed2(() => props.closable || props.editable)
      const isAddable = computed2(() => props.addable || props.editable)
      const tabsClass = computed2(() => [
        ns.b(),
        ns.m(props.type),
        ns.m(`${props.tabPosition}`),
        ns.is('stretch', props.stretch)
      ])
      const tabsStyle = computed2(() => {
        const style = __spreadValues2({}, themeStyle.value)
        if (props.activeColor) {
          style['--yh-tabs-active-color'] = props.activeColor
        }
        if (props.inactiveColor) {
          style['--yh-tabs-text-color'] = props.inactiveColor
        }
        return style
      })
      __expose({
        /** 触发添加标签页事件 */
        addTab: handleTabAdd,
        /** 激活指定标签 */
        setActiveTab: activateTab,
        /** 当前激活的标签名 */
        activeTab
      })
      const __returned__ = {
        props,
        emit,
        ns,
        themeStyle,
        panes,
        activeTab,
        navRef,
        indicatorRef,
        registerPane,
        unregisterPane,
        activateTab,
        get hoverTimer() {
          return hoverTimer
        },
        set hoverTimer(v) {
          hoverTimer = v
        },
        handleTabClick,
        handleTabHover,
        handleTabRemove,
        handleTabAdd,
        updateIndicator,
        isClosable,
        isAddable,
        tabsClass,
        tabsStyle,
        ref: ref2,
        computed: computed2,
        provide: provide2,
        watch,
        onMounted,
        nextTick,
        get useNamespace() {
          return useNamespace
        },
        get useComponentTheme() {
          return useComponentTheme
        },
        get tabsProps() {
          return tabsProps
        },
        get tabsEmits() {
          return tabsEmits
        },
        get TABS_INJECTION_KEY() {
          return TABS_INJECTION_KEY
        }
      }
      Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true })
      return __returned__
    }
  }
)
__sfc__.render = render
var stdin_default = __sfc__
export { stdin_default as default }
