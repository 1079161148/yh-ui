import {
  createCommentVNode as _createCommentVNode,
  mergeProps as _mergeProps,
  createElementVNode as _createElementVNode,
  createVNode as _createVNode,
  normalizeClass as _normalizeClass,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  toDisplayString as _toDisplayString,
  withCtx as _withCtx,
  Fragment as _Fragment,
  createBlock as _createBlock,
  renderSlot as _renderSlot,
  normalizeStyle as _normalizeStyle
} from 'vue'
const _hoisted_1 = ['src', 'alt']
const _hoisted_2 = ['src']
const _hoisted_3 = ['src']
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      _Fragment,
      null,
      [
        _createElementVNode(
          'div',
          {
            class: _normalizeClass([
              $setup.ns.b(),
              $setup.sizeClass,
              $setup.isHorizontalAudio && $setup.ns.is('horizontal-audio')
            ]),
            style: _normalizeStyle($setup.themeStyle),
            onClick: $setup.handleClick
          },
          [
            _createCommentVNode(
              ' \u56FE\u7247\u7C7B\u578B\uFF1A\u52A0\u8F7D\u65F6\u663E\u793A\u6A21\u7CCA\u56FE\uFF0C\u52A0\u8F7D\u5B8C\u6210\u540E\u8FC7\u6E21\u4E3A\u6E05\u6670 '
            ),
            $setup.showImagePreview
              ? (_openBlock(),
                _createElementBlock(
                  'div',
                  {
                    key: 0,
                    class: _normalizeClass([
                      $setup.ns.e('image-wrapper'),
                      $setup.ns.is('image-loading', _ctx.loading)
                    ])
                  },
                  [
                    _createElementVNode(
                      'img',
                      _mergeProps(
                        {
                          src: _ctx.src,
                          alt: _ctx.name,
                          class: $setup.ns.e('image')
                        },
                        _ctx.imageProps
                      ),
                      null,
                      16,
                      _hoisted_1
                    ),
                    _ctx.loading
                      ? (_openBlock(),
                        _createElementBlock(
                          'div',
                          {
                            key: 0,
                            class: _normalizeClass($setup.ns.e('image-loading-overlay'))
                          },
                          [_createVNode($setup['YhSpin'])],
                          2
                          /* CLASS */
                        ))
                      : _createCommentVNode('v-if', true),
                    _createCommentVNode(' \u906E\u7F69 '),
                    _ctx.mask
                      ? (_openBlock(),
                        _createElementBlock(
                          'div',
                          {
                            key: 1,
                            class: _normalizeClass($setup.ns.e('mask'))
                          },
                          [
                            _createElementVNode(
                              'span',
                              null,
                              _toDisplayString(_ctx.mask),
                              1
                              /* TEXT */
                            )
                          ],
                          2
                          /* CLASS */
                        ))
                      : _createCommentVNode('v-if', true)
                  ],
                  2
                  /* CLASS */
                ))
              : $setup.showVideoPreview
                ? (_openBlock(),
                  _createElementBlock(
                    _Fragment,
                    { key: 1 },
                    [
                      _createCommentVNode(
                        ' \u89C6\u9891\u7C7B\u578B\uFF1A\u4E0E Ant Design X \u4E00\u81F4\uFF0C\u4F7F\u7528\u539F\u751F <video> \u53EF\u76F4\u63A5\u64AD\u653E\uFF1B\u6709 src \u65F6\u5C55\u793A\u64AD\u653E\u5668 '
                      ),
                      _createElementVNode(
                        'div',
                        {
                          class: _normalizeClass($setup.ns.e('image-wrapper'))
                        },
                        [
                          _ctx.src
                            ? (_openBlock(),
                              _createElementBlock(
                                'video',
                                _mergeProps(
                                  {
                                    key: 0,
                                    src: _ctx.src,
                                    class: $setup.ns.e('media-video'),
                                    controls: '',
                                    preload: 'metadata',
                                    playsinline: ''
                                  },
                                  _ctx.videoProps
                                ),
                                null,
                                16,
                                _hoisted_2
                              ))
                            : (_openBlock(),
                              _createElementBlock(
                                'div',
                                {
                                  key: 1,
                                  class: _normalizeClass([
                                    $setup.ns.e('media-placeholder'),
                                    $setup.ns.e('media-placeholder--video')
                                  ])
                                },
                                [
                                  _createVNode(
                                    $setup['YhIcon'],
                                    {
                                      name: $setup.fileIcon,
                                      size:
                                        _ctx.size === 'small' ? 32 : _ctx.size === 'large' ? 64 : 48
                                    },
                                    null,
                                    8,
                                    ['name', 'size']
                                  )
                                ],
                                2
                                /* CLASS */
                              )),
                          _ctx.loading
                            ? (_openBlock(),
                              _createElementBlock(
                                'div',
                                {
                                  key: 2,
                                  class: _normalizeClass($setup.ns.e('image-loading-overlay'))
                                },
                                [_createVNode($setup['YhSpin'])],
                                2
                                /* CLASS */
                              ))
                            : _createCommentVNode('v-if', true),
                          _ctx.mask
                            ? (_openBlock(),
                              _createElementBlock(
                                'div',
                                {
                                  key: 3,
                                  class: _normalizeClass($setup.ns.e('mask'))
                                },
                                [
                                  _createElementVNode(
                                    'span',
                                    null,
                                    _toDisplayString(_ctx.mask),
                                    1
                                    /* TEXT */
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
                          class: _normalizeClass($setup.ns.e('info'))
                        },
                        [
                          _createElementVNode(
                            'div',
                            {
                              class: _normalizeClass($setup.ns.e('name-wrap'))
                            },
                            [
                              _createVNode(
                                $setup['YhTooltip'],
                                {
                                  content: _ctx.name,
                                  placement: 'bottom',
                                  'popper-class': $setup.ns.e('name-tooltip'),
                                  disabled: !$setup.showNameTooltip
                                },
                                {
                                  default: _withCtx(() => [
                                    _createElementVNode(
                                      'div',
                                      {
                                        ref: 'nameRef',
                                        class: _normalizeClass($setup.ns.e('name'))
                                      },
                                      _toDisplayString(_ctx.name),
                                      3
                                      /* TEXT, CLASS */
                                    )
                                  ]),
                                  _: 1
                                  /* STABLE */
                                },
                                8,
                                ['content', 'popper-class', 'disabled']
                              )
                            ],
                            2
                            /* CLASS */
                          ),
                          _ctx.byte !== void 0
                            ? (_openBlock(),
                              _createElementBlock(
                                'div',
                                {
                                  key: 0,
                                  class: _normalizeClass($setup.ns.e('size'))
                                },
                                _toDisplayString($setup.formatFileSize(_ctx.byte)),
                                3
                                /* TEXT, CLASS */
                              ))
                            : _createCommentVNode('v-if', true),
                          _ctx.description
                            ? (_openBlock(),
                              _createElementBlock(
                                'div',
                                {
                                  key: 1,
                                  class: _normalizeClass($setup.ns.e('description'))
                                },
                                _toDisplayString(_ctx.description),
                                3
                                /* TEXT, CLASS */
                              ))
                            : _createCommentVNode('v-if', true)
                        ],
                        2
                        /* CLASS */
                      )
                    ],
                    64
                    /* STABLE_FRAGMENT */
                  ))
                : $setup.showAudioPreview
                  ? (_openBlock(),
                    _createElementBlock(
                      _Fragment,
                      { key: 2 },
                      [
                        _createCommentVNode(
                          ' \u97F3\u9891\u7C7B\u578B\uFF1A\u6709 src \u65F6\u4F7F\u7528\u6A2A\u5411\u5E03\u5C40\uFF08\u5DE6\u56FE\u6807 + \u53F3\u5185\u5BB9 + \u64AD\u653E\u6761\uFF09\uFF0C\u65E0 src \u65F6\u65B9\u5F62\u5360\u4F4D\u5361\u7247 '
                        ),
                        _createCommentVNode(
                          ' \u6709 src\uFF1A\u7EB5\u5411\u5E03\u5C40\uFF08\u9876\u90E8\u6587\u4EF6\u4FE1\u606F\u884C + \u5E95\u90E8\u5168\u5BBD\u64AD\u653E\u5668\uFF09 '
                        ),
                        _ctx.src
                          ? (_openBlock(),
                            _createElementBlock(
                              _Fragment,
                              { key: 0 },
                              [
                                _createElementVNode(
                                  'div',
                                  {
                                    class: _normalizeClass($setup.ns.e('audio-header'))
                                  },
                                  [
                                    _createElementVNode(
                                      'div',
                                      {
                                        class: _normalizeClass($setup.ns.e('audio-thumb'))
                                      },
                                      [
                                        _createVNode(
                                          $setup['YhIcon'],
                                          {
                                            name: $setup.fileIcon,
                                            size: $setup.audioThumbIconSize
                                          },
                                          null,
                                          8,
                                          ['name', 'size']
                                        )
                                      ],
                                      2
                                      /* CLASS */
                                    ),
                                    _createElementVNode(
                                      'div',
                                      {
                                        class: _normalizeClass($setup.ns.e('audio-meta'))
                                      },
                                      [
                                        _createElementVNode(
                                          'div',
                                          {
                                            class: _normalizeClass($setup.ns.e('name-wrap'))
                                          },
                                          [
                                            _createVNode(
                                              $setup['YhTooltip'],
                                              {
                                                content: _ctx.name,
                                                placement: 'bottom',
                                                'popper-class': $setup.ns.e('name-tooltip'),
                                                disabled: !$setup.showNameTooltip
                                              },
                                              {
                                                default: _withCtx(() => [
                                                  _createElementVNode(
                                                    'div',
                                                    {
                                                      ref: 'nameRef',
                                                      class: _normalizeClass($setup.ns.e('name'))
                                                    },
                                                    _toDisplayString(_ctx.name),
                                                    3
                                                    /* TEXT, CLASS */
                                                  )
                                                ]),
                                                _: 1
                                                /* STABLE */
                                              },
                                              8,
                                              ['content', 'popper-class', 'disabled']
                                            )
                                          ],
                                          2
                                          /* CLASS */
                                        ),
                                        _ctx.byte !== void 0
                                          ? (_openBlock(),
                                            _createElementBlock(
                                              'div',
                                              {
                                                key: 0,
                                                class: _normalizeClass($setup.ns.e('size'))
                                              },
                                              _toDisplayString($setup.formatFileSize(_ctx.byte)),
                                              3
                                              /* TEXT, CLASS */
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
                                _createElementVNode(
                                  'audio',
                                  _mergeProps(
                                    {
                                      src: _ctx.src,
                                      class: $setup.ns.e('media-audio'),
                                      controls: ''
                                    },
                                    _ctx.audioProps
                                  ),
                                  null,
                                  16,
                                  _hoisted_3
                                ),
                                _ctx.loading
                                  ? (_openBlock(),
                                    _createElementBlock(
                                      'div',
                                      {
                                        key: 0,
                                        class: _normalizeClass($setup.ns.e('image-loading-overlay'))
                                      },
                                      [_createVNode($setup['YhSpin'])],
                                      2
                                      /* CLASS */
                                    ))
                                  : _createCommentVNode('v-if', true)
                              ],
                              64
                              /* STABLE_FRAGMENT */
                            ))
                          : (_openBlock(),
                            _createElementBlock(
                              _Fragment,
                              { key: 1 },
                              [
                                _createCommentVNode(
                                  ' \u65E0 src\uFF1A\u65B9\u5F62\u5360\u4F4D\u5361\u7247\uFF08\u4E0E\u4E4B\u524D\u4E00\u81F4\uFF09 '
                                ),
                                _createElementVNode(
                                  'div',
                                  {
                                    class: _normalizeClass($setup.ns.e('image-wrapper'))
                                  },
                                  [
                                    _createElementVNode(
                                      'div',
                                      {
                                        class: _normalizeClass([
                                          $setup.ns.e('media-placeholder'),
                                          $setup.ns.e('media-placeholder--audio')
                                        ])
                                      },
                                      [
                                        _createVNode(
                                          $setup['YhIcon'],
                                          {
                                            name: $setup.fileIcon,
                                            size:
                                              _ctx.size === 'small'
                                                ? 32
                                                : _ctx.size === 'large'
                                                  ? 64
                                                  : 48
                                          },
                                          null,
                                          8,
                                          ['name', 'size']
                                        )
                                      ],
                                      2
                                      /* CLASS */
                                    ),
                                    _ctx.loading
                                      ? (_openBlock(),
                                        _createElementBlock(
                                          'div',
                                          {
                                            key: 0,
                                            class: _normalizeClass(
                                              $setup.ns.e('image-loading-overlay')
                                            )
                                          },
                                          [_createVNode($setup['YhSpin'])],
                                          2
                                          /* CLASS */
                                        ))
                                      : _createCommentVNode('v-if', true),
                                    _ctx.mask
                                      ? (_openBlock(),
                                        _createElementBlock(
                                          'div',
                                          {
                                            key: 1,
                                            class: _normalizeClass($setup.ns.e('mask'))
                                          },
                                          [
                                            _createElementVNode(
                                              'span',
                                              null,
                                              _toDisplayString(_ctx.mask),
                                              1
                                              /* TEXT */
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
                                    class: _normalizeClass($setup.ns.e('info'))
                                  },
                                  [
                                    _createElementVNode(
                                      'div',
                                      {
                                        class: _normalizeClass($setup.ns.e('name-wrap'))
                                      },
                                      [
                                        _createVNode(
                                          $setup['YhTooltip'],
                                          {
                                            content: _ctx.name,
                                            placement: 'bottom',
                                            'popper-class': $setup.ns.e('name-tooltip'),
                                            disabled: !$setup.showNameTooltip
                                          },
                                          {
                                            default: _withCtx(() => [
                                              _createElementVNode(
                                                'div',
                                                {
                                                  ref: 'nameRef',
                                                  class: _normalizeClass($setup.ns.e('name'))
                                                },
                                                _toDisplayString(_ctx.name),
                                                3
                                                /* TEXT, CLASS */
                                              )
                                            ]),
                                            _: 1
                                            /* STABLE */
                                          },
                                          8,
                                          ['content', 'popper-class', 'disabled']
                                        )
                                      ],
                                      2
                                      /* CLASS */
                                    ),
                                    _ctx.byte !== void 0
                                      ? (_openBlock(),
                                        _createElementBlock(
                                          'div',
                                          {
                                            key: 0,
                                            class: _normalizeClass($setup.ns.e('size'))
                                          },
                                          _toDisplayString($setup.formatFileSize(_ctx.byte)),
                                          3
                                          /* TEXT, CLASS */
                                        ))
                                      : _createCommentVNode('v-if', true),
                                    _ctx.description
                                      ? (_openBlock(),
                                        _createElementBlock(
                                          'div',
                                          {
                                            key: 1,
                                            class: _normalizeClass($setup.ns.e('description'))
                                          },
                                          _toDisplayString(_ctx.description),
                                          3
                                          /* TEXT, CLASS */
                                        ))
                                      : _createCommentVNode('v-if', true)
                                  ],
                                  2
                                  /* CLASS */
                                )
                              ],
                              64
                              /* STABLE_FRAGMENT */
                            ))
                      ],
                      64
                      /* STABLE_FRAGMENT */
                    ))
                  : (_openBlock(),
                    _createElementBlock(
                      _Fragment,
                      { key: 3 },
                      [
                        _createCommentVNode(' \u6587\u4EF6\u7C7B\u578B '),
                        _createElementVNode(
                          'div',
                          {
                            class: _normalizeClass($setup.ns.e('icon-wrapper'))
                          },
                          [
                            _createCommentVNode(' \u52A0\u8F7D\u72B6\u6001 '),
                            _ctx.loading
                              ? (_openBlock(), _createBlock($setup['YhSpin'], { key: 0 }))
                              : (_openBlock(),
                                _createElementBlock(
                                  _Fragment,
                                  { key: 1 },
                                  [
                                    _createCommentVNode(' \u6587\u4EF6\u56FE\u6807 '),
                                    _createVNode(
                                      $setup['YhIcon'],
                                      {
                                        name: $setup.fileIcon,
                                        size:
                                          _ctx.size === 'small'
                                            ? 32
                                            : _ctx.size === 'large'
                                              ? 64
                                              : 48
                                      },
                                      null,
                                      8,
                                      ['name', 'size']
                                    )
                                  ],
                                  2112
                                  /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                                ))
                          ],
                          2
                          /* CLASS */
                        ),
                        _createElementVNode(
                          'div',
                          {
                            class: _normalizeClass($setup.ns.e('info'))
                          },
                          [
                            _createElementVNode(
                              'div',
                              {
                                class: _normalizeClass($setup.ns.e('name-wrap'))
                              },
                              [
                                _createVNode(
                                  $setup['YhTooltip'],
                                  {
                                    content: _ctx.name,
                                    placement: 'bottom',
                                    'popper-class': $setup.ns.e('name-tooltip'),
                                    disabled: !$setup.showNameTooltip
                                  },
                                  {
                                    default: _withCtx(() => [
                                      _createElementVNode(
                                        'div',
                                        {
                                          ref: 'nameRef',
                                          class: _normalizeClass($setup.ns.e('name'))
                                        },
                                        _toDisplayString(_ctx.name),
                                        3
                                        /* TEXT, CLASS */
                                      )
                                    ]),
                                    _: 1
                                    /* STABLE */
                                  },
                                  8,
                                  ['content', 'popper-class', 'disabled']
                                )
                              ],
                              2
                              /* CLASS */
                            ),
                            _ctx.byte !== void 0
                              ? (_openBlock(),
                                _createElementBlock(
                                  'div',
                                  {
                                    key: 0,
                                    class: _normalizeClass($setup.ns.e('size'))
                                  },
                                  _toDisplayString($setup.formatFileSize(_ctx.byte)),
                                  3
                                  /* TEXT, CLASS */
                                ))
                              : _createCommentVNode('v-if', true),
                            _ctx.description
                              ? (_openBlock(),
                                _createElementBlock(
                                  'div',
                                  {
                                    key: 1,
                                    class: _normalizeClass($setup.ns.e('description'))
                                  },
                                  _toDisplayString(_ctx.description),
                                  3
                                  /* TEXT, CLASS */
                                ))
                              : _createCommentVNode('v-if', true)
                          ],
                          2
                          /* CLASS */
                        )
                      ],
                      64
                      /* STABLE_FRAGMENT */
                    )),
            _createCommentVNode(' \u906E\u7F69\u5C42\uFF08\u975E\u56FE\u7247\u7C7B\u578B\uFF09 '),
            _ctx.mask && !$setup.showImagePreview
              ? (_openBlock(),
                _createElementBlock(
                  'div',
                  {
                    key: 4,
                    class: _normalizeClass($setup.ns.e('file-mask'))
                  },
                  [
                    _createElementVNode(
                      'span',
                      null,
                      _toDisplayString(_ctx.mask),
                      1
                      /* TEXT */
                    )
                  ],
                  2
                  /* CLASS */
                ))
              : _createCommentVNode('v-if', true),
            _createCommentVNode(
              ' \u6269\u5C55\u63D2\u69FD\uFF08\u7528\u4E8E AiAttachments \u4F20\u5165\u7684\u5220\u9664\u6309\u94AE\u3001\u8FDB\u5EA6\u6761\u7B49\uFF09 '
            ),
            _createElementVNode(
              'div',
              {
                class: _normalizeClass($setup.ns.e('actions'))
              },
              [_renderSlot(_ctx.$slots, 'default')],
              2
              /* CLASS */
            )
          ],
          6
          /* CLASS, STYLE */
        ),
        _createCommentVNode(' \u56FE\u7247\u9884\u89C8 '),
        $setup.showImagePreview && $setup.imageViewerVisible
          ? (_openBlock(),
            _createBlock(
              $setup['YhImageViewer'],
              {
                key: 0,
                'url-list': [_ctx.src || ''],
                onClose: _cache[0] || (_cache[0] = ($event) => ($setup.imageViewerVisible = false))
              },
              null,
              8,
              ['url-list']
            ))
          : _createCommentVNode('v-if', true)
      ],
      64
      /* STABLE_FRAGMENT */
    )
  )
}
import { computed, ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { useComponentTheme } from '../../../theme/component-theme.js'
import { aiFileCardProps, aiFileCardEmits } from './ai-file-card-meta.js'
import { YhIcon } from '../../icon.js'
import { YhSpin } from '../../spin.js'
import { YhImageViewer } from '../../image.js'
import { YhTooltip } from '../../tooltip.js'
const __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhAiFileCard'
  },
  {
    __name: 'ai-file-card',
    props: aiFileCardProps,
    emits: aiFileCardEmits,
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose()
      const props = __props
      const emit = __emit
      const ns = useNamespace('ai-file-card')
      const imageViewerVisible = ref(false)
      const { themeStyle } = useComponentTheme(
        'ai-file-card',
        computed(() => props.themeOverrides)
      )
      const formatFileSize = (bytes) => {
        if (!bytes) return '0 B'
        const units = ['B', 'KB', 'MB', 'GB', 'TB']
        let unitIndex = 0
        let size = bytes
        while (size >= 1024 && unitIndex < units.length - 1) {
          size /= 1024
          unitIndex++
        }
        return `${size.toFixed(1)} ${units[unitIndex]}`
      }
      const iconMap = {
        default: 'document',
        excel: 'file-excel',
        image: 'image',
        markdown: 'document',
        pdf: 'file-pdf',
        ppt: 'document',
        word: 'file-word',
        zip: 'folder',
        video: 'file-video',
        audio: 'file-audio',
        java: 'document',
        javascript: 'document',
        python: 'document',
        txt: 'file-txt'
      }
      const fileIcon = computed(() => {
        if (props.icon && iconMap[props.icon]) {
          return iconMap[props.icon]
        }
        if (props.type === 'image') return 'image'
        if (props.type === 'video') return 'file-video'
        if (props.type === 'audio') return 'file-audio'
        return iconMap.default
      })
      const showImagePreview = computed(() => {
        return props.type === 'image' && props.src
      })
      const showVideoPreview = computed(() => props.type === 'video')
      const showAudioPreview = computed(() => props.type === 'audio')
      const isHorizontalAudio = computed(() => props.type === 'audio' && !!props.src)
      const audioThumbIconSize = computed(() => {
        if (props.size === 'small') return 18
        if (props.size === 'large') return 32
        return 24
      })
      const nameRef = ref(null)
      const showNameTooltip = ref(false)
      const updateNameTooltip = () => {
        const el = nameRef.value
        if (!el) return
        showNameTooltip.value = el.scrollWidth > el.clientWidth + 1
      }
      const scheduleUpdate = () => {
        nextTick(() => {
          requestAnimationFrame(() => {
            requestAnimationFrame(updateNameTooltip)
          })
        })
      }
      let resizeObserver = null
      onMounted(() => {
        scheduleUpdate()
        const el = nameRef.value
        if (el && typeof ResizeObserver !== 'undefined') {
          resizeObserver = new ResizeObserver(scheduleUpdate)
          resizeObserver.observe(el)
        }
      })
      onUnmounted(() => {
        if (resizeObserver && nameRef.value) {
          resizeObserver.disconnect()
          resizeObserver = null
        }
      })
      watch(() => [props.name, props.size], scheduleUpdate)
      const sizeClass = computed(() => {
        return ns.m(props.size || 'default')
      })
      const handleClick = () => {
        if (!props.loading) {
          if (showImagePreview.value) {
            imageViewerVisible.value = true
          }
          emit('click')
        }
      }
      const __returned__ = {
        props,
        emit,
        ns,
        imageViewerVisible,
        themeStyle,
        formatFileSize,
        iconMap,
        fileIcon,
        showImagePreview,
        showVideoPreview,
        showAudioPreview,
        isHorizontalAudio,
        audioThumbIconSize,
        nameRef,
        showNameTooltip,
        updateNameTooltip,
        scheduleUpdate,
        get resizeObserver() {
          return resizeObserver
        },
        set resizeObserver(v) {
          resizeObserver = v
        },
        sizeClass,
        handleClick,
        computed,
        ref,
        onMounted,
        onUnmounted,
        nextTick,
        watch,
        get useNamespace() {
          return useNamespace
        },
        get useComponentTheme() {
          return useComponentTheme
        },
        get aiFileCardProps() {
          return aiFileCardProps
        },
        get aiFileCardEmits() {
          return aiFileCardEmits
        },
        get YhIcon() {
          return YhIcon
        },
        get YhSpin() {
          return YhSpin
        },
        get YhImageViewer() {
          return YhImageViewer
        },
        get YhTooltip() {
          return YhTooltip
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
