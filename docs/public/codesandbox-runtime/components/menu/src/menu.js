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
import {
  renderSlot as _renderSlot,
  renderList as _renderList,
  Fragment as _Fragment,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  createBlock as _createBlock,
  normalizeClass as _normalizeClass,
  normalizeStyle as _normalizeStyle
} from 'vue'
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      'ul',
      {
        class: _normalizeClass($setup.menuClass),
        style: _normalizeStyle($setup.menuStyle),
        role: 'menu'
      },
      [
        _renderSlot(_ctx.$slots, 'default', {}, () => [
          (_openBlock(true),
          _createElementBlock(
            _Fragment,
            null,
            _renderList(_ctx.options, (item) => {
              return (
                _openBlock(),
                _createBlock(
                  $setup['YhMenuRecursiveItem'],
                  {
                    key: $setup.getMenuItemKey(item),
                    item
                  },
                  null,
                  8,
                  ['item']
                )
              )
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ],
      6
      /* CLASS, STYLE */
    )
  )
}
import { ref, computed, provide, toRef, watch } from 'vue'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { useComponentTheme } from '../../../theme/component-theme.js'
import { menuProps, menuEmits, MENU_INJECTION_KEY } from './menu'
import YhMenuRecursiveItem from './menu-recursive-item.js'
const __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhMenu'
  },
  {
    __name: 'menu',
    props: menuProps,
    emits: menuEmits,
    setup(__props, { expose: __expose, emit: __emit }) {
      var _a
      const props = __props
      const emit = __emit
      const ns = useNamespace('menu')
      const { themeStyle } = useComponentTheme(
        'menu',
        computed(() => props.themeOverrides)
      )
      const activeIndex = ref((_a = props.value) != null ? _a : props.defaultActive)
      const openedMenus = ref([...(props.defaultOpeneds || [])])
      const menuStyle = computed(() => {
        const styles = {}
        if (props.backgroundColor) {
          styles['--yh-menu-bg-color'] = props.backgroundColor
        }
        if (props.textColor) {
          styles['--yh-menu-text-color'] = props.textColor
        }
        if (props.activeTextColor) {
          styles['--yh-menu-active-text-color'] = props.activeTextColor
        }
        if (props.iconSize) {
          styles['--yh-menu-icon-size'] =
            typeof props.iconSize === 'number' ? `${props.iconSize}px` : props.iconSize
        }
        return __spreadValues(__spreadValues({}, styles), themeStyle.value)
      })
      const getMenuItemKey = (item) => {
        var _a2, _b
        const value =
          (_b = (_a2 = item[props.keyField || 'key']) != null ? _a2 : item.index) != null
            ? _b
            : item.key
        return value == null ? '' : String(value)
      }
      const menuClass = computed(() => [
        ns.b(),
        ns.m(props.mode),
        {
          [ns.m('collapse')]: props.collapse && props.mode === 'vertical',
          [ns.is('ellipsis')]: props.ellipsis && props.mode === 'horizontal',
          [ns.m('inverted')]: props.inverted
        }
      ])
      const handleSelect = (index, indexPath) => {
        activeIndex.value = index
        emit('update:value', index)
        emit('select', index, indexPath, void 0)
      }
      const handleOpen = (index, indexPath) => {
        if (props.uniqueOpened) {
          openedMenus.value = openedMenus.value.filter(
            (openedIndex) =>
              indexPath.includes(openedIndex) || openedMenus.value.indexOf(openedIndex) === -1
          )
        }
        if (!openedMenus.value.includes(index)) {
          openedMenus.value.push(index)
        }
        emit('open', index, indexPath)
      }
      const handleClose = (index, indexPath) => {
        const i = openedMenus.value.indexOf(index)
        if (i !== -1) {
          openedMenus.value.splice(i, 1)
        }
        emit('close', index, indexPath)
      }
      provide(MENU_INJECTION_KEY, {
        mode: toRef(props, 'mode'),
        activeIndex,
        openedMenus,
        collapse: toRef(props, 'collapse'),
        backgroundColor: toRef(props, 'backgroundColor'),
        textColor: toRef(props, 'textColor'),
        activeTextColor: toRef(props, 'activeTextColor'),
        uniqueOpened: toRef(props, 'uniqueOpened'),
        menuTrigger: toRef(props, 'menuTrigger'),
        popperZIndex: toRef(props, 'popperZIndex'),
        teleported: toRef(props, 'teleported'),
        gap: toRef(props, 'gap'),
        iconSize: toRef(props, 'iconSize'),
        indent: toRef(props, 'indent'),
        inverted: toRef(props, 'inverted'),
        keyField: toRef(props, 'keyField'),
        labelField: toRef(props, 'labelField'),
        popperOffset: toRef(props, 'popperOffset'),
        popperEffect: toRef(props, 'popperEffect'),
        popperClass: toRef(props, 'popperClass'),
        popperStyle: toRef(props, 'popperStyle'),
        showTimeout: toRef(props, 'showTimeout'),
        hideTimeout: toRef(props, 'hideTimeout'),
        persistent: toRef(props, 'persistent'),
        ellipsisIcon: toRef(props, 'ellipsisIcon'),
        closeOnClickOutside: toRef(props, 'closeOnClickOutside'),
        expandAll: toRef(props, 'expandAll'),
        rootIndent: toRef(props, 'rootIndent'),
        renderExtra: toRef(props, 'renderExtra'),
        renderIcon: toRef(props, 'renderIcon'),
        renderLabel: toRef(props, 'renderLabel'),
        responsive: toRef(props, 'responsive'),
        value: toRef(props, 'value'),
        options: toRef(props, 'options'),
        handleSelect,
        handleOpen,
        handleClose
      })
      watch(
        () => props.value,
        (val) => {
          if (val !== void 0) {
            activeIndex.value = val != null ? val : ''
          }
        }
      )
      watch(
        () => props.defaultActive,
        (val) => {
          activeIndex.value = val
        }
      )
      __expose({
        open: (index) => handleOpen(index, [index]),
        close: (index) => handleClose(index, [index]),
        activeIndex,
        openedMenus
      })
      const __returned__ = {
        props,
        emit,
        ns,
        themeStyle,
        activeIndex,
        openedMenus,
        menuStyle,
        getMenuItemKey,
        menuClass,
        handleSelect,
        handleOpen,
        handleClose,
        ref,
        computed,
        provide,
        toRef,
        watch,
        get useNamespace() {
          return useNamespace
        },
        get useComponentTheme() {
          return useComponentTheme
        },
        get menuProps() {
          return menuProps
        },
        get menuEmits() {
          return menuEmits
        },
        get MENU_INJECTION_KEY() {
          return MENU_INJECTION_KEY
        },
        YhMenuRecursiveItem
      }
      Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true })
      return __returned__
    }
  }
)
__sfc__.render = render
var stdin_default = __sfc__
export { stdin_default as default }
