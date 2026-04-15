import {
  toDisplayString as _toDisplayString,
  normalizeClass as _normalizeClass,
  normalizeStyle as _normalizeStyle,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  createCommentVNode as _createCommentVNode,
  createElementVNode as _createElementVNode,
  Transition as _Transition,
  withCtx as _withCtx,
  createVNode as _createVNode,
  renderList as _renderList,
  Fragment as _Fragment,
  renderSlot as _renderSlot,
  createTextVNode as _createTextVNode,
  withModifiers as _withModifiers
} from 'vue'
const _hoisted_1 = ['src', 'alt', 'loading']
const _hoisted_2 = ['src']
const _hoisted_3 = ['src', 'onError']
const _hoisted_4 = ['title']
const _hoisted_5 = ['src', 'onError']
const _hoisted_6 = ['title']
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      'div',
      {
        ref: 'cardRef',
        class: _normalizeClass([
          $setup.ns.b(),
          $setup.ns.m($setup.props.layout),
          $setup.ns.is('border', $setup.props.border),
          $setup.ns.is('shadow', $setup.props.shadow),
          $setup.ns.is('sold-out', $setup.props.soldOut)
        ]),
        style: _normalizeStyle([
          $setup.themeStyle,
          {
            '--yh-product-card-title-lines': $setup.props.titleLines,
            '--yh-product-card-desc-lines': $setup.props.descriptionLines
          }
        ]),
        onClick: $setup.handleClick,
        onMouseenter: $setup.handleMouseEnter,
        onMouseleave: $setup.handleMouseLeave
      },
      [
        $setup.props.ribbon
          ? (_openBlock(),
            _createElementBlock(
              'div',
              {
                key: 0,
                class: _normalizeClass($setup.ns.e('ribbon')),
                style: _normalizeStyle({
                  backgroundColor: $setup.props.ribbonColor
                })
              },
              _toDisplayString($setup.props.ribbon),
              7
              /* TEXT, CLASS, STYLE */
            ))
          : _createCommentVNode('v-if', true),
        _createElementVNode(
          'div',
          {
            class: _normalizeClass($setup.ns.e('image-wrapper'))
          },
          [
            _createElementVNode(
              'img',
              {
                src: $setup.currentImage,
                alt: $setup.props.title,
                class: _normalizeClass($setup.ns.e('image')),
                loading: $setup.props.lazy ? 'lazy' : 'eager'
              },
              null,
              10,
              _hoisted_1
            ),
            _createVNode(
              _Transition,
              { name: 'yh-fade' },
              {
                default: _withCtx(() => [
                  $setup.videoActive && $setup.props.videoSrc
                    ? (_openBlock(),
                      _createElementBlock(
                        'div',
                        {
                          key: 0,
                          class: _normalizeClass($setup.ns.e('video-overlay'))
                        },
                        [
                          _createElementVNode(
                            'video',
                            {
                              src: $setup.props.videoSrc,
                              autoplay: '',
                              muted: '',
                              loop: '',
                              playsinline: '',
                              class: _normalizeClass($setup.ns.e('video'))
                            },
                            null,
                            10,
                            _hoisted_2
                          )
                        ],
                        2
                        /* CLASS */
                      ))
                    : _createCommentVNode('v-if', true)
                ]),
                _: 1
                /* STABLE */
              }
            ),
            $setup.props.soldOut
              ? (_openBlock(),
                _createElementBlock(
                  'div',
                  {
                    key: 0,
                    class: _normalizeClass($setup.ns.e('sold-out-mask'))
                  },
                  [
                    _createElementVNode(
                      'span',
                      {
                        class: _normalizeClass($setup.ns.e('sold-out-text'))
                      },
                      _toDisplayString($setup.soldOutText),
                      3
                      /* TEXT, CLASS */
                    )
                  ],
                  2
                  /* CLASS */
                ))
              : _createCommentVNode('v-if', true)
          ],
          2
          /* CLASS */
        ),
        _createElementVNode(
          'div',
          {
            class: _normalizeClass($setup.ns.e('content'))
          },
          [
            ($setup.props.tag || $setup.props.badges.length) && $setup.props.badgePosition === 'top'
              ? (_openBlock(),
                _createElementBlock(
                  'div',
                  {
                    key: 0,
                    class: _normalizeClass($setup.ns.e('badges'))
                  },
                  [
                    $setup.props.tag
                      ? (_openBlock(),
                        _createElementBlock(
                          'span',
                          {
                            key: 0,
                            class: _normalizeClass([
                              $setup.ns.e('badge-tag'),
                              $setup.ns.is($setup.props.tagType)
                            ])
                          },
                          _toDisplayString($setup.props.tag),
                          3
                          /* TEXT, CLASS */
                        ))
                      : _createCommentVNode('v-if', true),
                    (_openBlock(true),
                    _createElementBlock(
                      _Fragment,
                      null,
                      _renderList($setup.props.badges, (badge, idx) => {
                        return (
                          _openBlock(),
                          _createElementBlock(
                            _Fragment,
                            { key: idx },
                            [
                              badge.image && !$setup.badgeImageErrors[idx]
                                ? (_openBlock(),
                                  _createElementBlock(
                                    'span',
                                    {
                                      key: 0,
                                      class: _normalizeClass($setup.ns.e('badge-img-wrap'))
                                    },
                                    [
                                      _createElementVNode(
                                        'img',
                                        {
                                          src: badge.image,
                                          class: _normalizeClass($setup.ns.e('badge-img')),
                                          alt: 'badge',
                                          onError: ($event) => $setup.handleBadgeImageError(idx)
                                        },
                                        null,
                                        42,
                                        _hoisted_3
                                      )
                                    ],
                                    2
                                    /* CLASS */
                                  ))
                                : _createCommentVNode('v-if', true),
                              badge.text
                                ? (_openBlock(),
                                  _createElementBlock(
                                    'span',
                                    {
                                      key: 1,
                                      class: _normalizeClass([
                                        $setup.ns.e('badge-tag'),
                                        $setup.ns.is(badge.type || 'primary')
                                      ]),
                                      style: _normalizeStyle({
                                        backgroundColor: badge.color
                                      })
                                    },
                                    _toDisplayString(badge.text),
                                    7
                                    /* TEXT, CLASS, STYLE */
                                  ))
                                : _createCommentVNode('v-if', true)
                            ],
                            64
                            /* STABLE_FRAGMENT */
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
            _createElementVNode(
              'h3',
              {
                class: _normalizeClass($setup.ns.e('title')),
                title: $setup.props.title
              },
              [
                ($setup.props.tag || $setup.props.badges.length) &&
                $setup.props.badgePosition === 'inline'
                  ? (_openBlock(),
                    _createElementBlock(
                      'span',
                      {
                        key: 0,
                        class: _normalizeClass([$setup.ns.e('badges'), $setup.ns.is('inline')])
                      },
                      [
                        $setup.props.tag
                          ? (_openBlock(),
                            _createElementBlock(
                              'span',
                              {
                                key: 0,
                                class: _normalizeClass([
                                  $setup.ns.e('badge-tag'),
                                  $setup.ns.is($setup.props.tagType)
                                ])
                              },
                              _toDisplayString($setup.props.tag),
                              3
                              /* TEXT, CLASS */
                            ))
                          : _createCommentVNode('v-if', true),
                        (_openBlock(true),
                        _createElementBlock(
                          _Fragment,
                          null,
                          _renderList($setup.props.badges, (badge, idx) => {
                            return (
                              _openBlock(),
                              _createElementBlock(
                                _Fragment,
                                { key: idx },
                                [
                                  badge.image && !$setup.badgeImageErrors[idx]
                                    ? (_openBlock(),
                                      _createElementBlock(
                                        'span',
                                        {
                                          key: 0,
                                          class: _normalizeClass($setup.ns.e('badge-img-wrap'))
                                        },
                                        [
                                          _createElementVNode(
                                            'img',
                                            {
                                              src: badge.image,
                                              class: _normalizeClass($setup.ns.e('badge-img')),
                                              alt: 'badge',
                                              onError: ($event) => $setup.handleBadgeImageError(idx)
                                            },
                                            null,
                                            42,
                                            _hoisted_5
                                          )
                                        ],
                                        2
                                        /* CLASS */
                                      ))
                                    : _createCommentVNode('v-if', true),
                                  badge.text
                                    ? (_openBlock(),
                                      _createElementBlock(
                                        'span',
                                        {
                                          key: 1,
                                          class: _normalizeClass([
                                            $setup.ns.e('badge-tag'),
                                            $setup.ns.is(badge.type || 'primary')
                                          ]),
                                          style: _normalizeStyle({
                                            backgroundColor: badge.color
                                          })
                                        },
                                        _toDisplayString(badge.text),
                                        7
                                        /* TEXT, CLASS, STYLE */
                                      ))
                                    : _createCommentVNode('v-if', true)
                                ],
                                64
                                /* STABLE_FRAGMENT */
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
                _renderSlot(_ctx.$slots, 'title', {}, () => [
                  _createTextVNode(
                    _toDisplayString($setup.props.title),
                    1
                    /* TEXT */
                  )
                ])
              ],
              10,
              _hoisted_4
            ),
            $setup.props.description || _ctx.$slots.description
              ? (_openBlock(),
                _createElementBlock(
                  'div',
                  {
                    key: 1,
                    class: _normalizeClass($setup.ns.e('description')),
                    title: $setup.props.description
                  },
                  [
                    _renderSlot(_ctx.$slots, 'description', {}, () => [
                      _createTextVNode(
                        _toDisplayString($setup.props.description),
                        1
                        /* TEXT */
                      )
                    ])
                  ],
                  10,
                  _hoisted_6
                ))
              : _createCommentVNode('v-if', true),
            _createElementVNode(
              'div',
              {
                class: _normalizeClass($setup.ns.e('price-row'))
              },
              [
                _createElementVNode(
                  'div',
                  {
                    class: _normalizeClass($setup.ns.e('main-price'))
                  },
                  [
                    _createElementVNode(
                      'span',
                      {
                        class: _normalizeClass($setup.ns.e('currency'))
                      },
                      _toDisplayString($setup.props.currency),
                      3
                      /* TEXT, CLASS */
                    ),
                    _createElementVNode(
                      'span',
                      {
                        class: _normalizeClass($setup.ns.e('price-val'))
                      },
                      _toDisplayString($setup.displayPrice),
                      3
                      /* TEXT, CLASS */
                    ),
                    $setup.props.unit
                      ? (_openBlock(),
                        _createElementBlock(
                          'span',
                          {
                            key: 0,
                            class: _normalizeClass($setup.ns.e('unit'))
                          },
                          _toDisplayString($setup.props.unit),
                          3
                          /* TEXT, CLASS */
                        ))
                      : _createCommentVNode('v-if', true)
                  ],
                  2
                  /* CLASS */
                ),
                $setup.props.vipPrice
                  ? (_openBlock(),
                    _createElementBlock(
                      'div',
                      {
                        key: 0,
                        class: _normalizeClass($setup.ns.e('vip-row'))
                      },
                      [
                        _createElementVNode(
                          'span',
                          {
                            class: _normalizeClass($setup.ns.e('vip-label'))
                          },
                          _toDisplayString($setup.vipLabelText),
                          3
                          /* TEXT, CLASS */
                        ),
                        _createElementVNode(
                          'span',
                          {
                            class: _normalizeClass($setup.ns.e('currency'))
                          },
                          _toDisplayString($setup.props.currency),
                          3
                          /* TEXT, CLASS */
                        ),
                        _createElementVNode(
                          'span',
                          {
                            class: _normalizeClass($setup.ns.e('vip-price'))
                          },
                          _toDisplayString($setup.displayVipPrice),
                          3
                          /* TEXT, CLASS */
                        )
                      ],
                      2
                      /* CLASS */
                    ))
                  : _createCommentVNode('v-if', true),
                $setup.props.marketPrice
                  ? (_openBlock(),
                    _createElementBlock(
                      'div',
                      {
                        key: 1,
                        class: _normalizeClass($setup.ns.e('market-price'))
                      },
                      _toDisplayString($setup.props.currency) +
                        _toDisplayString($setup.displayMarketPrice),
                      3
                      /* TEXT, CLASS */
                    ))
                  : _createCommentVNode('v-if', true)
              ],
              2
              /* CLASS */
            ),
            $setup.props.stockProgress
              ? (_openBlock(),
                _createElementBlock(
                  'div',
                  {
                    key: 2,
                    class: _normalizeClass($setup.ns.e('stock-area'))
                  },
                  [
                    _createElementVNode(
                      'div',
                      {
                        class: _normalizeClass($setup.ns.e('stock-bar-bg'))
                      },
                      [
                        _createElementVNode(
                          'div',
                          {
                            class: _normalizeClass($setup.ns.e('stock-bar-inner')),
                            style: _normalizeStyle($setup.stockStyle)
                          },
                          null,
                          6
                          /* CLASS, STYLE */
                        )
                      ],
                      2
                      /* CLASS */
                    ),
                    $setup.props.stockText
                      ? (_openBlock(),
                        _createElementBlock(
                          'span',
                          {
                            key: 0,
                            class: _normalizeClass($setup.ns.e('stock-text'))
                          },
                          _toDisplayString($setup.props.stockText),
                          3
                          /* TEXT, CLASS */
                        ))
                      : _createCommentVNode('v-if', true)
                  ],
                  2
                  /* CLASS */
                ))
              : _createCommentVNode('v-if', true),
            !$setup.props.readonly
              ? (_openBlock(),
                _createElementBlock(
                  'div',
                  {
                    key: 3,
                    class: _normalizeClass($setup.ns.e('footer'))
                  },
                  [
                    _renderSlot(_ctx.$slots, 'footer', {}, () => [
                      _createElementVNode(
                        'button',
                        {
                          class: _normalizeClass([
                            $setup.ns.e('action-btn'),
                            $setup.ns.is('loading', $setup.props.actionLoading),
                            $setup.ns.is('disabled', $setup.props.soldOut)
                          ]),
                          onClick: _withModifiers($setup.handleAction, ['stop'])
                        },
                        [
                          $setup.props.actionLoading
                            ? (_openBlock(),
                              _createElementBlock(
                                'span',
                                {
                                  key: 0,
                                  class: _normalizeClass($setup.ns.e('loading-spinner'))
                                },
                                null,
                                2
                                /* CLASS */
                              ))
                            : _createCommentVNode('v-if', true),
                          _createTextVNode(
                            ' ' + _toDisplayString($setup.actionText),
                            1
                            /* TEXT */
                          )
                        ],
                        2
                        /* CLASS */
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
        )
      ],
      38
      /* CLASS, STYLE, NEED_HYDRATION */
    )
  )
}
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useLocale } from '../../../hooks/index.js'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { useComponentTheme } from '../../../theme/component-theme.js'
import { productCardProps, productCardEmits } from './product-card-meta.js'
const __sfc__ = /* @__PURE__ */ Object.assign(
  { name: 'YhProductCard' },
  {
    __name: 'product-card',
    props: productCardProps,
    emits: productCardEmits,
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose()
      const props = __props
      const emit = __emit
      const ns = useNamespace('product-card')
      const { t } = useLocale()
      const { themeStyle } = useComponentTheme(
        'product-card',
        computed(() => props.themeOverrides)
      )
      const cardRef = ref(null)
      let observer = null
      const hasExposed = ref(false)
      const setupObserver = () => {
        if (!props.exposure || hasExposed.value) return
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting && entry.intersectionRatio >= props.exposureThreshold) {
                emit('expose')
                hasExposed.value = true
                if (props.exposureOnce) observer == null ? void 0 : observer.disconnect()
              }
            })
          },
          { threshold: [props.exposureThreshold] }
        )
        if (cardRef.value) observer.observe(cardRef.value)
      }
      onMounted(setupObserver)
      onUnmounted(() => (observer == null ? void 0 : observer.disconnect()))
      const currentImage = ref(props.image)
      const isHovering = ref(false)
      const videoActive = ref(false)
      watch(
        () => props.image,
        (val) => {
          currentImage.value = val
        }
      )
      const handleMouseEnter = () => {
        isHovering.value = true
        if (props.hoverImage) currentImage.value = props.hoverImage
        if (props.videoSrc) videoActive.value = true
      }
      const handleMouseLeave = () => {
        isHovering.value = false
        currentImage.value = props.image
        if (props.videoSrc) videoActive.value = false
      }
      const displayPrice = computed(() => {
        const p = Number(props.price)
        return isNaN(p) ? props.price : p.toFixed(2)
      })
      const displayMarketPrice = computed(() => {
        const p = Number(props.marketPrice)
        return isNaN(p) ? props.marketPrice : p.toFixed(2)
      })
      const displayVipPrice = computed(() => {
        const p = Number(props.vipPrice)
        return isNaN(p) ? props.vipPrice : p.toFixed(2)
      })
      const vipLabelText = computed(() => props.vipLabel || t('productcard.vip'))
      const soldOutText = computed(() => t('productcard.soldOut'))
      const actionText = computed(() => props.actionText || t('productcard.buyNow'))
      const stockStyle = computed(() => ({
        width: `${Math.min(100, Math.max(0, props.stockProgress))}%`,
        background: props.stockColor || 'var(--yh-color-primary)'
      }))
      const handleAction = (e) => {
        if (props.soldOut || props.actionLoading) return
        emit('action', e)
      }
      const handleClick = (e) => {
        emit('click', e)
      }
      const badgeImageErrors = ref({})
      const handleBadgeImageError = (idx) => {
        badgeImageErrors.value[idx] = true
      }
      const __returned__ = {
        props,
        emit,
        ns,
        t,
        themeStyle,
        cardRef,
        get observer() {
          return observer
        },
        set observer(v) {
          observer = v
        },
        hasExposed,
        setupObserver,
        currentImage,
        isHovering,
        videoActive,
        handleMouseEnter,
        handleMouseLeave,
        displayPrice,
        displayMarketPrice,
        displayVipPrice,
        vipLabelText,
        soldOutText,
        actionText,
        stockStyle,
        handleAction,
        handleClick,
        badgeImageErrors,
        handleBadgeImageError,
        ref,
        computed,
        onMounted,
        onUnmounted,
        watch,
        get useNamespace() {
          return useNamespace
        },
        get useLocale() {
          return useLocale
        },
        get useComponentTheme() {
          return useComponentTheme
        },
        get productCardProps() {
          return productCardProps
        },
        get productCardEmits() {
          return productCardEmits
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
