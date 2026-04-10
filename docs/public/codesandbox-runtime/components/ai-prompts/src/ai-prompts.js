import {
  createCommentVNode as _createCommentVNode,
  renderSlot as _renderSlot,
  toDisplayString as _toDisplayString,
  normalizeClass as _normalizeClass,
  createElementVNode as _createElementVNode,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
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
        class: _normalizeClass([$setup.ns.b(), $setup.ns.m(_ctx.layout)]),
        style: _normalizeStyle($setup.themeStyle)
      },
      [
        _createCommentVNode(' Title Section '),
        _ctx.title || _ctx.$slots.title
          ? (_openBlock(),
            _createElementBlock(
              'div',
              {
                key: 0,
                class: _normalizeClass($setup.ns.e('header'))
              },
              [
                _renderSlot(_ctx.$slots, 'title', {}, () => [
                  _createElementVNode(
                    'span',
                    {
                      class: _normalizeClass($setup.ns.e('title'))
                    },
                    _toDisplayString(_ctx.title),
                    3
                    /* TEXT, CLASS */
                  )
                ])
              ],
              2
              /* CLASS */
            ))
          : _createCommentVNode('v-if', true),
        _createCommentVNode(' Prompts Grid/List '),
        _createElementVNode(
          'div',
          {
            class: _normalizeClass($setup.ns.e('list'))
          },
          [
            (_openBlock(true),
            _createElementBlock(
              _Fragment,
              null,
              _renderList(_ctx.items, (item, index) => {
                return (
                  _openBlock(),
                  _createElementBlock(
                    'div',
                    {
                      key: typeof item === 'string' ? index : item.id || index,
                      class: _normalizeClass($setup.ns.e('item')),
                      onClick: ($event) => $setup.handleClick(item)
                    },
                    [
                      _renderSlot(
                        _ctx.$slots,
                        'item',
                        {
                          item,
                          index
                        },
                        () => [
                          _createElementVNode(
                            'div',
                            {
                              class: _normalizeClass($setup.ns.e('item-inner'))
                            },
                            [
                              typeof item === 'object' && item.icon
                                ? (_openBlock(),
                                  _createElementBlock(
                                    'span',
                                    {
                                      key: 0,
                                      class: _normalizeClass($setup.ns.e('icon'))
                                    },
                                    [
                                      _renderSlot(
                                        _ctx.$slots,
                                        'icon',
                                        {
                                          icon: item.icon
                                        },
                                        () => [
                                          _createElementVNode(
                                            'i',
                                            {
                                              class: _normalizeClass(item.icon)
                                            },
                                            null,
                                            2
                                            /* CLASS */
                                          )
                                        ]
                                      )
                                    ],
                                    2
                                    /* CLASS */
                                  ))
                                : _createCommentVNode('v-if', true),
                              _createElementVNode(
                                'div',
                                {
                                  class: _normalizeClass($setup.ns.e('content'))
                                },
                                [
                                  _createElementVNode(
                                    'span',
                                    {
                                      class: _normalizeClass($setup.ns.e('text'))
                                    },
                                    _toDisplayString(
                                      typeof item === 'string' ? item : item.content
                                    ),
                                    3
                                    /* TEXT, CLASS */
                                  ),
                                  typeof item === 'object' && item.description
                                    ? (_openBlock(),
                                      _createElementBlock(
                                        'span',
                                        {
                                          key: 0,
                                          class: _normalizeClass($setup.ns.e('description'))
                                        },
                                        _toDisplayString(item.description),
                                        3
                                        /* TEXT, CLASS */
                                      ))
                                    : _createCommentVNode('v-if', true)
                                ],
                                2
                                /* CLASS */
                              ),
                              _createElementVNode(
                                'div',
                                {
                                  class: _normalizeClass($setup.ns.e('arrow'))
                                },
                                [
                                  ...(_cache[0] ||
                                    (_cache[0] = [
                                      _createElementVNode(
                                        'svg',
                                        {
                                          viewBox: '0 0 24 24',
                                          fill: 'none',
                                          stroke: 'currentColor',
                                          'stroke-width': '2',
                                          'stroke-linecap': 'round',
                                          'stroke-linejoin': 'round'
                                        },
                                        [
                                          _createElementVNode('path', { d: 'M5 12h14' }),
                                          _createElementVNode('path', { d: 'm12 5 7 7-7 7' })
                                        ],
                                        -1
                                        /* CACHED */
                                      )
                                    ]))
                                ],
                                2
                                /* CLASS */
                              )
                            ],
                            2
                            /* CLASS */
                          )
                        ]
                      )
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
        )
      ],
      6
      /* CLASS, STYLE */
    )
  )
}
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { useComponentTheme } from '../../../theme/component-theme.js'
import { aiPromptsProps, aiPromptsEmits } from './ai-prompts'
const __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhAiPrompts'
  },
  {
    __name: 'ai-prompts',
    props: aiPromptsProps,
    emits: aiPromptsEmits,
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose()
      const props = __props
      const emit = __emit
      const ns = useNamespace('ai-prompts')
      const { themeStyle } = useComponentTheme('ai-prompts', props.themeOverrides)
      const handleClick = (item) => {
        emit('click', item)
      }
      const __returned__ = {
        props,
        emit,
        ns,
        themeStyle,
        handleClick,
        get useNamespace() {
          return useNamespace
        },
        get useComponentTheme() {
          return useComponentTheme
        },
        get aiPromptsProps() {
          return aiPromptsProps
        },
        get aiPromptsEmits() {
          return aiPromptsEmits
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
