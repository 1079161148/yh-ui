import {
  createCommentVNode as _createCommentVNode,
  normalizeClass as _normalizeClass,
  normalizeStyle as _normalizeStyle,
  createElementVNode as _createElementVNode,
  renderList as _renderList,
  Fragment as _Fragment,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  renderSlot as _renderSlot,
  mergeProps as _mergeProps,
  createVNode as _createVNode
} from 'vue'
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      'div',
      {
        class: _normalizeClass([$setup.ns.b(), $setup.ns.is('virtual', _ctx.virtualScroll)]),
        style: _normalizeStyle([
          $setup.themeStyle,
          {
            height: typeof _ctx.height === 'number' ? _ctx.height + 'px' : _ctx.height
          }
        ]),
        ref: 'scrollRef',
        onScroll:
          _cache[0] ||
          (_cache[0] = ($event) => (_ctx.virtualScroll ? $setup.onScroll($event) : void 0))
      },
      [
        _createCommentVNode(' \u865A\u62DF\u6EDA\u52A8\u6A21\u5F0F '),
        _ctx.virtualScroll
          ? (_openBlock(),
            _createElementBlock(
              _Fragment,
              { key: 0 },
              [
                _createElementVNode(
                  'div',
                  {
                    class: _normalizeClass($setup.ns.e('virtual-phantom')),
                    style: _normalizeStyle({
                      height: $setup.totalHeight + 'px'
                    })
                  },
                  null,
                  6
                  /* CLASS, STYLE */
                ),
                _createElementVNode(
                  'div',
                  {
                    class: _normalizeClass($setup.ns.e('virtual-content')),
                    style: _normalizeStyle({
                      transform: `translateY(${$setup.offsetY}px)`
                    })
                  },
                  [
                    (_openBlock(true),
                    _createElementBlock(
                      _Fragment,
                      null,
                      _renderList($setup.visibleItems, (item, index) => {
                        return (
                          _openBlock(),
                          _createElementBlock(
                            'div',
                            {
                              key: item.id || $setup.startIndex + index,
                              class: _normalizeClass($setup.ns.e('item'))
                            },
                            [
                              _renderSlot(
                                _ctx.$slots,
                                'bubble',
                                {
                                  item,
                                  index: $setup.startIndex + index
                                },
                                () => [
                                  _createVNode(
                                    $setup['YhAiBubble'],
                                    _mergeProps({ ref_for: true }, item),
                                    null,
                                    16
                                    /* FULL_PROPS */
                                  )
                                ]
                              )
                            ],
                            2
                            /* CLASS */
                          )
                        )
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ],
                  6
                  /* CLASS, STYLE */
                )
              ],
              64
              /* STABLE_FRAGMENT */
            ))
          : (_openBlock(),
            _createElementBlock(
              _Fragment,
              { key: 1 },
              [
                _createCommentVNode(' \u666E\u901A\u6EDA\u52A8\u6A21\u5F0F '),
                _createElementVNode(
                  'div',
                  {
                    class: _normalizeClass($setup.ns.e('content'))
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
                              key: item.id || index,
                              class: _normalizeClass($setup.ns.e('item'))
                            },
                            [
                              _renderSlot(
                                _ctx.$slots,
                                'bubble',
                                {
                                  item,
                                  index
                                },
                                () => [
                                  _createVNode(
                                    $setup['YhAiBubble'],
                                    _mergeProps({ ref_for: true }, item),
                                    null,
                                    16
                                    /* FULL_PROPS */
                                  )
                                ]
                              )
                            ],
                            2
                            /* CLASS */
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
              2112
              /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
            )),
        _createCommentVNode(' \u52A0\u8F7D\u4E2D\u72B6\u6001 '),
        _ctx.loading
          ? (_openBlock(),
            _createElementBlock(
              'div',
              {
                key: 2,
                class: _normalizeClass($setup.ns.e('loading'))
              },
              [
                _renderSlot(_ctx.$slots, 'loading', {}, () => [
                  _createVNode($setup['YhAiBubble'], {
                    role: 'assistant',
                    loading: '',
                    variant: 'borderless'
                  })
                ])
              ],
              2
              /* CLASS */
            ))
          : _createCommentVNode('v-if', true)
      ],
      38
      /* CLASS, STYLE, NEED_HYDRATION */
    )
  )
}
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import { useVirtualScroll } from '../../../hooks/index.js'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { useComponentTheme } from '../../../theme/component-theme.js'
import YhAiBubble from '../../ai-bubble/src/ai-bubble.js'
import { aiBubbleListProps } from './ai-bubble-list-meta.js'
const __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhAiBubbleList'
  },
  {
    __name: 'ai-bubble-list',
    props: aiBubbleListProps,
    setup(__props, { expose: __expose }) {
      const props = __props
      const ns = useNamespace('ai-bubble-list')
      const { themeStyle } = useComponentTheme(
        'ai-bubble-list',
        computed(() => props.themeOverrides)
      )
      const scrollRef = ref(null)
      const { visibleItems, totalHeight, offsetY, startIndex, onScroll, scrollToIndex } =
        useVirtualScroll({
          items: computed(() => props.items),
          itemHeight: props.itemHeight,
          containerHeight: typeof props.height === 'number' ? props.height : parseInt(props.height),
          overscan: 5
        })
      const scrollToBottom = () => {
        if (!props.autoScroll) return
        nextTick(() => {
          if (props.virtualScroll) {
            scrollToIndex(props.items.length - 1)
          } else if (scrollRef.value) {
            scrollRef.value.scrollTop = scrollRef.value.scrollHeight
          }
        })
      }
      watch(
        () => props.items,
        () => {
          scrollToBottom()
        },
        { deep: true }
      )
      onMounted(() => {
        if (props.items.length > 0) {
          scrollToBottom()
        }
      })
      __expose({
        scrollToBottom,
        scrollToIndex,
        scrollRef
      })
      const __returned__ = {
        props,
        ns,
        themeStyle,
        scrollRef,
        visibleItems,
        totalHeight,
        offsetY,
        startIndex,
        onScroll,
        scrollToIndex,
        scrollToBottom,
        ref,
        computed,
        watch,
        nextTick,
        onMounted,
        get useNamespace() {
          return useNamespace
        },
        get useVirtualScroll() {
          return useVirtualScroll
        },
        get useComponentTheme() {
          return useComponentTheme
        },
        YhAiBubble,
        get aiBubbleListProps() {
          return aiBubbleListProps
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
