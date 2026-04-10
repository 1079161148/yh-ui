import {
  createCommentVNode as _createCommentVNode,
  normalizeClass as _normalizeClass,
  createElementVNode as _createElementVNode,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  renderSlot as _renderSlot,
  toDisplayString as _toDisplayString,
  createTextVNode as _createTextVNode,
  normalizeStyle as _normalizeStyle,
  Fragment as _Fragment
} from 'vue'
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      'div',
      {
        class: _normalizeClass($setup.cardClasses),
        style: _normalizeStyle($setup.themeStyle)
      },
      [
        _createCommentVNode(' \u52A0\u8F7D\u72B6\u6001 '),
        $props.loading
          ? (_openBlock(),
            _createElementBlock(
              'div',
              {
                key: 0,
                class: _normalizeClass($setup.ns.e('loading'))
              },
              [
                _createElementVNode(
                  'div',
                  {
                    class: _normalizeClass($setup.ns.e('loading-content'))
                  },
                  [
                    _createElementVNode(
                      'div',
                      {
                        class: _normalizeClass($setup.ns.e('skeleton-header'))
                      },
                      null,
                      2
                      /* CLASS */
                    ),
                    _createElementVNode(
                      'div',
                      {
                        class: _normalizeClass($setup.ns.e('skeleton-paragraph'))
                      },
                      [
                        _createElementVNode(
                          'div',
                          {
                            class: _normalizeClass($setup.ns.e('skeleton-line'))
                          },
                          null,
                          2
                          /* CLASS */
                        ),
                        _createElementVNode(
                          'div',
                          {
                            class: _normalizeClass($setup.ns.e('skeleton-line'))
                          },
                          null,
                          2
                          /* CLASS */
                        ),
                        _createElementVNode(
                          'div',
                          {
                            class: _normalizeClass($setup.ns.e('skeleton-line'))
                          },
                          null,
                          2
                          /* CLASS */
                        )
                      ],
                      2
                      /* CLASS */
                    )
                  ],
                  2
                  /* CLASS */
                )
              ],
              2
              /* CLASS */
            ))
          : (_openBlock(),
            _createElementBlock(
              _Fragment,
              { key: 1 },
              [
                _createCommentVNode(' \u6B63\u5E38\u5185\u5BB9 '),
                _createCommentVNode(' \u5361\u7247\u5934\u90E8 '),
                _ctx.$slots.header || $props.header || _ctx.$slots.extra
                  ? (_openBlock(),
                    _createElementBlock(
                      'div',
                      {
                        key: 0,
                        class: _normalizeClass($setup.headerClasses),
                        style: _normalizeStyle($props.headerStyle)
                      },
                      [
                        _createElementVNode(
                          'div',
                          {
                            class: _normalizeClass($setup.ns.e('header-wrapper'))
                          },
                          [
                            _createElementVNode(
                              'div',
                              {
                                class: _normalizeClass($setup.ns.e('header-title'))
                              },
                              [
                                _renderSlot(_ctx.$slots, 'header', {}, () => [
                                  _createTextVNode(
                                    _toDisplayString($props.header),
                                    1
                                    /* TEXT */
                                  )
                                ])
                              ],
                              2
                              /* CLASS */
                            ),
                            _ctx.$slots.extra
                              ? (_openBlock(),
                                _createElementBlock(
                                  'div',
                                  {
                                    key: 0,
                                    class: _normalizeClass($setup.ns.e('header-extra'))
                                  },
                                  [_renderSlot(_ctx.$slots, 'extra')],
                                  2
                                  /* CLASS */
                                ))
                              : _createCommentVNode('v-if', true)
                          ],
                          2
                          /* CLASS */
                        )
                      ],
                      6
                      /* CLASS, STYLE */
                    ))
                  : _createCommentVNode('v-if', true),
                _createCommentVNode(' \u5361\u7247\u4E3B\u4F53 '),
                _createElementVNode(
                  'div',
                  {
                    class: _normalizeClass($setup.bodyClasses),
                    style: _normalizeStyle($props.bodyStyle)
                  },
                  [_renderSlot(_ctx.$slots, 'default')],
                  6
                  /* CLASS, STYLE */
                ),
                _createCommentVNode(' \u5361\u7247\u5E95\u90E8 '),
                _ctx.$slots.footer
                  ? (_openBlock(),
                    _createElementBlock(
                      'div',
                      {
                        key: 1,
                        class: _normalizeClass($setup.footerClasses)
                      },
                      [_renderSlot(_ctx.$slots, 'footer')],
                      2
                      /* CLASS */
                    ))
                  : _createCommentVNode('v-if', true)
              ],
              64
              /* STABLE_FRAGMENT */
            ))
      ],
      6
      /* CLASS, STYLE */
    )
  )
}
import { computed } from 'vue'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { useConfig } from '../../../hooks/use-config/index.js'
import { useComponentTheme } from '../../../theme/component-theme.js'
const __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhCard'
  },
  {
    __name: 'card',
    props: {
      header: { type: String, required: false },
      bodyStyle: { type: Object, required: false },
      headerStyle: { type: Object, required: false },
      shadow: { type: null, required: false, default: 'always' },
      bordered: { type: Boolean, required: false, default: true },
      hoverable: { type: Boolean, required: false, default: false },
      size: { type: String, required: false, default: 'default' },
      loading: { type: Boolean, required: false, default: false },
      bodyPadding: { type: Boolean, required: false, default: true },
      themeOverrides: { type: null, required: false }
    },
    setup(__props, { expose: __expose }) {
      __expose()
      const props = __props
      const ns = useNamespace('card')
      const { globalSize } = useConfig()
      const { themeStyle } = useComponentTheme(
        'card',
        computed(() => props.themeOverrides)
      )
      const cardClasses = computed(() => [
        ns.b(),
        ns.m(props.shadow),
        ns.m(props.size || globalSize.value || 'default'),
        ns.is('bordered', props.bordered),
        ns.is('hoverable', props.hoverable),
        ns.is('loading', props.loading)
      ])
      const headerClasses = computed(() => [ns.e('header')])
      const bodyClasses = computed(() => [
        ns.e('body'),
        !props.bodyPadding && ns.em('body', 'no-padding')
      ])
      const footerClasses = computed(() => [ns.e('footer')])
      const __returned__ = {
        props,
        ns,
        globalSize,
        themeStyle,
        cardClasses,
        headerClasses,
        bodyClasses,
        footerClasses,
        computed,
        get useNamespace() {
          return useNamespace
        },
        get useConfig() {
          return useConfig
        },
        get useComponentTheme() {
          return useComponentTheme
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
