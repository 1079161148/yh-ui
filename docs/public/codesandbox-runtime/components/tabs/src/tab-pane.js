import {
  renderSlot as _renderSlot,
  vShow as _vShow,
  normalizeClass as _normalizeClass,
  normalizeStyle as _normalizeStyle,
  withDirectives as _withDirectives,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  createCommentVNode as _createCommentVNode
} from 'vue'
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return $setup.shouldRender
    ? _withDirectives(
        (_openBlock(),
        _createElementBlock(
          'div',
          {
            key: 0,
            class: _normalizeClass([$setup.ns.b(), $setup.ns.is('active', $setup.isActive)]),
            style: _normalizeStyle($setup.themeStyle),
            role: 'tabpanel'
          },
          [_renderSlot(_ctx.$slots, 'default')],
          6
          /* CLASS, STYLE */
        )),
        [[_vShow, $setup.isActive]]
      )
    : _createCommentVNode('v-if', true)
}
import { computed, inject, onMounted, onUnmounted, ref, watch } from 'vue'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { useComponentTheme } from '../../../theme/component-theme.js'
import { tabPaneProps } from './tab-pane-meta.js'
import { TABS_INJECTION_KEY } from './tabs-meta.js'
const __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhTabPane'
  },
  {
    __name: 'tab-pane',
    props: tabPaneProps,
    setup(__props, { expose: __expose }) {
      __expose()
      const props = __props
      const ns = useNamespace('tab-pane')
      const { themeStyle } = useComponentTheme(
        'tab-pane',
        computed(() => props.themeOverrides)
      )
      const tabsContext = inject(TABS_INJECTION_KEY)
      const hasRendered = ref(false)
      const isActive = computed(() => {
        return (tabsContext == null ? void 0 : tabsContext.activeTab.value) === props.name
      })
      const shouldRender = computed(() => {
        if (!props.lazy) return true
        return hasRendered.value || isActive.value
      })
      watch(isActive, (val) => {
        if (val && !hasRendered.value) {
          hasRendered.value = true
        }
      })
      onMounted(() => {
        tabsContext == null
          ? void 0
          : tabsContext.registerPane({
              name: String(props.name),
              label: props.label,
              disabled: props.disabled,
              closable: props.closable,
              lazy: props.lazy,
              icon: props.icon
            })
      })
      onUnmounted(() => {
        tabsContext == null ? void 0 : tabsContext.unregisterPane(String(props.name))
      })
      watch(
        () => ({
          name: props.name,
          label: props.label,
          disabled: props.disabled,
          closable: props.closable,
          lazy: props.lazy,
          icon: props.icon
        }),
        (config) => {
          tabsContext == null
            ? void 0
            : tabsContext.registerPane({
                name: String(config.name),
                label: config.label,
                disabled: config.disabled,
                closable: config.closable,
                lazy: config.lazy,
                icon: config.icon
              })
        }
      )
      const __returned__ = {
        props,
        ns,
        themeStyle,
        tabsContext,
        hasRendered,
        isActive,
        shouldRender,
        computed,
        inject,
        onMounted,
        onUnmounted,
        ref,
        watch,
        get useNamespace() {
          return useNamespace
        },
        get useComponentTheme() {
          return useComponentTheme
        },
        get tabPaneProps() {
          return tabPaneProps
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
