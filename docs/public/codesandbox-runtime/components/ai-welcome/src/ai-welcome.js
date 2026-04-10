import {
  createCommentVNode as _createCommentVNode,
  renderSlot as _renderSlot,
  createVNode as _createVNode,
  normalizeClass as _normalizeClass,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  toDisplayString as _toDisplayString,
  createTextVNode as _createTextVNode,
  createElementVNode as _createElementVNode,
  renderList as _renderList,
  Fragment as _Fragment,
  normalizeStyle as _normalizeStyle
} from 'vue'
const _hoisted_1 = ['onClick']
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      'div',
      {
        class: _normalizeClass($setup.ns.b()),
        style: _normalizeStyle($setup.themeStyle)
      },
      [
        _createCommentVNode(' Header '),
        _createElementVNode(
          'div',
          {
            class: _normalizeClass($setup.ns.e('header'))
          },
          [
            _createCommentVNode(' Icon/Logo Area '),
            _renderSlot(_ctx.$slots, 'icon', {}, () => [
              _ctx.showIcon
                ? (_openBlock(),
                  _createElementBlock(
                    'div',
                    {
                      key: 0,
                      class: _normalizeClass($setup.ns.e('icon-wrapper'))
                    },
                    [_createVNode($setup['YhIcon'], { name: _ctx.icon }, null, 8, ['name'])],
                    2
                    /* CLASS */
                  ))
                : _createCommentVNode('v-if', true)
            ]),
            _createCommentVNode(' Title '),
            _createElementVNode(
              'h1',
              {
                class: _normalizeClass($setup.ns.e('title'))
              },
              [
                _renderSlot(_ctx.$slots, 'title', {}, () => [
                  _createTextVNode(
                    _toDisplayString(_ctx.title),
                    1
                    /* TEXT */
                  )
                ])
              ],
              2
              /* CLASS */
            ),
            _createCommentVNode(' Description '),
            _ctx.description || _ctx.$slots.description
              ? (_openBlock(),
                _createElementBlock(
                  'p',
                  {
                    key: 0,
                    class: _normalizeClass($setup.ns.e('description'))
                  },
                  [
                    _renderSlot(_ctx.$slots, 'description', {}, () => [
                      _createTextVNode(
                        _toDisplayString(_ctx.description),
                        1
                        /* TEXT */
                      )
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
        _createCommentVNode(' Suggestions Grid '),
        _ctx.suggestions && _ctx.suggestions.length > 0
          ? (_openBlock(),
            _createElementBlock(
              'div',
              {
                key: 0,
                class: _normalizeClass($setup.ns.e('body'))
              },
              [
                (_openBlock(true),
                _createElementBlock(
                  _Fragment,
                  null,
                  _renderList(_ctx.suggestions, (item, index) => {
                    return (
                      _openBlock(),
                      _createElementBlock(
                        'div',
                        {
                          key: index,
                          class: _normalizeClass($setup.ns.e('card')),
                          onClick: ($event) => $setup.handleSelect(item)
                        },
                        [
                          item.icon
                            ? (_openBlock(),
                              _createElementBlock(
                                'div',
                                {
                                  key: 0,
                                  class: _normalizeClass($setup.ns.e('card-icon'))
                                },
                                [
                                  _createVNode(
                                    $setup['YhIcon'],
                                    {
                                      name: item.icon
                                    },
                                    null,
                                    8,
                                    ['name']
                                  )
                                ],
                                2
                                /* CLASS */
                              ))
                            : _createCommentVNode('v-if', true),
                          _createElementVNode(
                            'div',
                            {
                              class: _normalizeClass($setup.ns.e('card-title'))
                            },
                            _toDisplayString(item.title),
                            3
                            /* TEXT, CLASS */
                          ),
                          item.description
                            ? (_openBlock(),
                              _createElementBlock(
                                'div',
                                {
                                  key: 1,
                                  class: _normalizeClass($setup.ns.e('card-description'))
                                },
                                _toDisplayString(item.description),
                                3
                                /* TEXT, CLASS */
                              ))
                            : _createCommentVNode('v-if', true)
                        ],
                        10,
                        _hoisted_1
                      )
                    )
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ],
              2
              /* CLASS */
            ))
          : _createCommentVNode('v-if', true),
        _createCommentVNode(' Extra Content '),
        _ctx.$slots.default
          ? (_openBlock(),
            _createElementBlock(
              'div',
              {
                key: 1,
                class: _normalizeClass($setup.ns.e('footer'))
              },
              [_renderSlot(_ctx.$slots, 'default')],
              2
              /* CLASS */
            ))
          : _createCommentVNode('v-if', true)
      ],
      6
      /* CLASS, STYLE */
    )
  )
}
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { aiWelcomeProps, aiWelcomeEmits } from './ai-welcome'
import { YhIcon } from '../../icon'
import { useComponentTheme } from '../../../theme/component-theme.js'
const __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhAiWelcome'
  },
  {
    __name: 'ai-welcome',
    props: aiWelcomeProps,
    emits: aiWelcomeEmits,
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose()
      const props = __props
      const emit = __emit
      const ns = useNamespace('ai-welcome')
      const { themeStyle } = useComponentTheme('ai-welcome', props.themeOverrides)
      const handleSelect = (suggestion) => {
        emit('select', suggestion)
      }
      const __returned__ = {
        props,
        emit,
        ns,
        themeStyle,
        handleSelect,
        get useNamespace() {
          return useNamespace
        },
        get aiWelcomeProps() {
          return aiWelcomeProps
        },
        get aiWelcomeEmits() {
          return aiWelcomeEmits
        },
        get YhIcon() {
          return YhIcon
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
