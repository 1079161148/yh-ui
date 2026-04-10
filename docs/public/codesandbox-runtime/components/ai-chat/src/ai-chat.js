import {
  createCommentVNode as _createCommentVNode,
  renderSlot as _renderSlot,
  createVNode as _createVNode,
  toDisplayString as _toDisplayString,
  createTextVNode as _createTextVNode,
  normalizeClass as _normalizeClass,
  withCtx as _withCtx,
  openBlock as _openBlock,
  createBlock as _createBlock,
  createElementVNode as _createElementVNode,
  createElementBlock as _createElementBlock,
  renderList as _renderList,
  Fragment as _Fragment,
  normalizeStyle as _normalizeStyle
} from 'vue'
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
        _createCommentVNode(' Header Tools (optional) '),
        _ctx.$slots.header || $setup.props.messages.length > 0
          ? (_openBlock(),
            _createElementBlock(
              'div',
              {
                key: 0,
                class: _normalizeClass($setup.ns.e('header'))
              },
              [
                _renderSlot(_ctx.$slots, 'header', {}, () => [
                  _createElementVNode(
                    'div',
                    {
                      class: _normalizeClass($setup.ns.e('header-tools'))
                    },
                    [
                      $setup.props.messages.length > 0
                        ? (_openBlock(),
                          _createBlock(
                            $setup['YhButton'],
                            {
                              key: 0,
                              size: 'small',
                              text: '',
                              class: _normalizeClass($setup.ns.e('clear-btn')),
                              onClick: $setup.handleClear
                            },
                            {
                              icon: _withCtx(() => [
                                _createVNode($setup['YhIcon'], { name: 'delete' })
                              ]),
                              default: _withCtx(() => [
                                _createTextVNode(
                                  ' ' + _toDisplayString($setup.t('common.clear')),
                                  1
                                  /* TEXT */
                                )
                              ]),
                              _: 1
                              /* STABLE */
                            },
                            8,
                            ['class']
                          ))
                        : _createCommentVNode('v-if', true)
                    ],
                    2
                    /* CLASS */
                  )
                ])
              ],
              2
              /* CLASS */
            ))
          : _createCommentVNode('v-if', true),
        _createCommentVNode(' Messages List '),
        _createElementVNode(
          'div',
          {
            class: _normalizeClass($setup.ns.e('content')),
            ref: 'contentRef',
            style: _normalizeStyle(
              $setup.virtualScrollEnabled
                ? {
                    height: $setup.props.virtualHeight + 'px',
                    overflow: 'auto'
                  }
                : {}
            ),
            onScroll:
              _cache[0] ||
              (_cache[0] = ($event) =>
                $setup.virtualScrollEnabled ? $setup.onScroll($event) : void 0)
          },
          [
            $setup.props.messages.length === 0 && $setup.props.suggestions.length > 0
              ? (_openBlock(),
                _createElementBlock(
                  'div',
                  {
                    key: 0,
                    class: _normalizeClass($setup.ns.e('suggestions'))
                  },
                  [
                    (_openBlock(true),
                    _createElementBlock(
                      _Fragment,
                      null,
                      _renderList($setup.props.suggestions, (suggestion, idx) => {
                        return (
                          _openBlock(),
                          _createBlock(
                            $setup['YhButton'],
                            {
                              key: idx,
                              plain: '',
                              round: '',
                              onClick: ($event) => $setup.handleSend(suggestion)
                            },
                            {
                              default: _withCtx(() => [
                                _createTextVNode(
                                  _toDisplayString(suggestion),
                                  1
                                  /* TEXT */
                                )
                              ]),
                              _: 2
                              /* DYNAMIC */
                            },
                            1032,
                            ['onClick']
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
            _createCommentVNode(' Virtual Scroll Mode '),
            $setup.virtualScrollEnabled
              ? (_openBlock(),
                _createElementBlock(
                  'div',
                  {
                    key: 1,
                    style: _normalizeStyle({
                      height: $setup.totalHeight + 'px',
                      position: 'relative'
                    })
                  },
                  [
                    _createElementVNode(
                      'div',
                      {
                        style: _normalizeStyle({
                          transform: `translateY(${$setup.offsetY}px)`
                        })
                      },
                      [
                        (_openBlock(true),
                        _createElementBlock(
                          _Fragment,
                          null,
                          _renderList($setup.visibleItems, (msg, index) => {
                            return _renderSlot(
                              _ctx.$slots,
                              'message',
                              {
                                key: msg.id || $setup.startIndex + index,
                                message: msg,
                                index: $setup.startIndex + index
                              },
                              () => [
                                _createVNode(
                                  $setup['YhAiBubble'],
                                  {
                                    content: msg.content,
                                    role: msg.role,
                                    loading:
                                      msg.status === 'generating' || msg.status === 'loading',
                                    variant: msg.role === 'assistant' ? 'borderless' : 'filled',
                                    time: msg.time,
                                    markdown: true
                                  },
                                  null,
                                  8,
                                  ['content', 'role', 'loading', 'variant', 'time']
                                )
                              ]
                            )
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ],
                      4
                      /* STYLE */
                    )
                  ],
                  4
                  /* STYLE */
                ))
              : (_openBlock(),
                _createElementBlock(
                  _Fragment,
                  { key: 2 },
                  [
                    _createCommentVNode(' Normal Mode '),
                    (_openBlock(true),
                    _createElementBlock(
                      _Fragment,
                      null,
                      _renderList($setup.props.messages, (msg, index) => {
                        return _renderSlot(
                          _ctx.$slots,
                          'message',
                          {
                            key: msg.id || index,
                            message: msg,
                            index
                          },
                          () => [
                            _createCommentVNode(
                              ' We use the powerful markdown rendering by default on the bubbles inside AiChat '
                            ),
                            _createVNode(
                              $setup['YhAiBubble'],
                              {
                                content: msg.content,
                                role: msg.role,
                                loading: msg.status === 'generating' || msg.status === 'loading',
                                variant: msg.role === 'assistant' ? 'borderless' : 'filled',
                                time: msg.time,
                                markdown: true
                              },
                              null,
                              8,
                              ['content', 'role', 'loading', 'variant', 'time']
                            )
                          ]
                        )
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ],
                  64
                  /* STABLE_FRAGMENT */
                )),
            _createCommentVNode(' Loading Placeholder '),
            $setup.props.loading &&
            (!$setup.props.messages.length ||
              $setup.props.messages[$setup.props.messages.length - 1].role !== 'assistant' ||
              ($setup.props.messages[$setup.props.messages.length - 1].status !== 'generating' &&
                $setup.props.messages[$setup.props.messages.length - 1].status !== 'loading'))
              ? _renderSlot(_ctx.$slots, 'loading', { key: 3 }, () => [
                  _createVNode($setup['YhAiBubble'], {
                    role: 'assistant',
                    loading: '',
                    typing: '',
                    variant: 'borderless'
                  })
                ])
              : _createCommentVNode('v-if', true)
          ],
          38
          /* CLASS, STYLE, NEED_HYDRATION */
        ),
        _createCommentVNode(' Footer Input Bar '),
        _createElementVNode(
          'div',
          {
            class: _normalizeClass($setup.ns.e('footer'))
          },
          [
            _renderSlot(_ctx.$slots, 'sender', {}, () => [
              _createVNode(
                $setup['YhAiSender'],
                {
                  loading: $setup.props.loading,
                  onSend: $setup.handleSend
                },
                null,
                8,
                ['loading']
              )
            ])
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
import { useLocale } from '../../../hooks/index.js'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { ref, watch, nextTick, computed } from 'vue'
import YhAiSender from '../../ai-sender/src/ai-sender.js'
import YhAiBubble from '../../ai-bubble/src/ai-bubble.js'
import { YhButton } from '../../button'
import { YhIcon } from '../../icon'
import { aiChatProps, aiChatEmits } from './ai-chat'
import { useComponentTheme } from '../../../theme/component-theme.js'
import { useVirtualScroll } from '../../../hooks/index.js'
const __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhAiChat'
  },
  {
    __name: 'ai-chat',
    props: aiChatProps,
    emits: aiChatEmits,
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose()
      const props = __props
      const emit = __emit
      const ns = useNamespace('ai-chat')
      const { t } = useLocale()
      const { themeStyle } = useComponentTheme('ai-chat', props.themeOverrides)
      const contentRef = ref()
      const virtualScrollEnabled = computed(() => props.virtualScroll && props.messages.length > 50)
      const { visibleItems, totalHeight, offsetY, startIndex, onScroll, scrollToIndex } =
        useVirtualScroll({
          items: computed(() => props.messages),
          itemHeight: props.estimatedItemHeight,
          containerHeight: props.virtualHeight,
          overscan: 5
        })
      const scrollToBottom = () => {
        nextTick(() => {
          if (virtualScrollEnabled.value && props.messages.length > 0) {
            scrollToIndex(props.messages.length - 1)
          } else if (contentRef.value) {
            contentRef.value.scrollTop = contentRef.value.scrollHeight
          }
        })
      }
      watch(() => props.messages, scrollToBottom, { deep: true })
      watch(() => props.loading, scrollToBottom)
      const handleSend = (text) => {
        emit('send', text)
      }
      const handleClear = () => {
        emit('update:messages', [])
        emit('clear')
      }
      const __returned__ = {
        props,
        emit,
        ns,
        t,
        themeStyle,
        contentRef,
        virtualScrollEnabled,
        visibleItems,
        totalHeight,
        offsetY,
        startIndex,
        onScroll,
        scrollToIndex,
        scrollToBottom,
        handleSend,
        handleClear,
        get useNamespace() {
          return useNamespace
        },
        get useLocale() {
          return useLocale
        },
        ref,
        watch,
        nextTick,
        computed,
        YhAiSender,
        YhAiBubble,
        get YhButton() {
          return YhButton
        },
        get YhIcon() {
          return YhIcon
        },
        get aiChatProps() {
          return aiChatProps
        },
        get aiChatEmits() {
          return aiChatEmits
        },
        get useComponentTheme() {
          return useComponentTheme
        },
        get useVirtualScroll() {
          return useVirtualScroll
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
