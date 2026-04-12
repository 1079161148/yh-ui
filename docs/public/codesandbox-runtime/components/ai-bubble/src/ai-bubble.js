var __defProp = Object.defineProperty
var __defProps = Object.defineProperties
var __getOwnPropDescs = Object.getOwnPropertyDescriptors
var __getOwnPropSymbols = Object.getOwnPropertySymbols
var __hasOwnProp = Object.prototype.hasOwnProperty
var __propIsEnum = Object.prototype.propertyIsEnumerable
var __knownSymbol = (name, symbol) =>
  (symbol = Symbol[name]) ? symbol : Symbol.for('Symbol.' + name)
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b))
var __forAwait = (obj, it, method) =>
  (it = obj[__knownSymbol('asyncIterator')])
    ? it.call(obj)
    : ((obj = obj[__knownSymbol('iterator')]()),
      (it = {}),
      (method = (key, fn) =>
        (fn = obj[key]) &&
        (it[key] = (arg) =>
          new Promise(
            (yes, no, done) => (
              (arg = fn.call(obj, arg)),
              (done = arg.done),
              Promise.resolve(arg.value).then((value) => yes({ value, done }), no)
            )
          ))),
      method('next'),
      method('return'),
      it)
import {
  createCommentVNode as _createCommentVNode,
  renderSlot as _renderSlot,
  openBlock as _openBlock,
  createBlock as _createBlock,
  createVNode as _createVNode,
  withCtx as _withCtx,
  normalizeClass as _normalizeClass,
  createElementBlock as _createElementBlock,
  toDisplayString as _toDisplayString,
  createElementVNode as _createElementVNode,
  renderList as _renderList,
  Fragment as _Fragment,
  normalizeStyle as _normalizeStyle,
  withModifiers as _withModifiers,
  Transition as _Transition,
  Teleport as _Teleport,
  vModelText as _vModelText,
  withDirectives as _withDirectives,
  createTextVNode as _createTextVNode
} from 'vue'
const _hoisted_1 = ['src', 'alt']
const _hoisted_2 = ['innerHTML']
const _hoisted_3 = { class: 'hljs json' }
const _hoisted_4 = ['innerHTML']
const _hoisted_5 = { key: 0 }
const _hoisted_6 = { key: 0 }
const _hoisted_7 = ['href', 'title', 'onClick']
const _hoisted_8 = { key: 0 }
const _hoisted_9 = {
  key: 1,
  class: 'publish-time'
}
const _hoisted_10 = { class: 'code-edit-modal' }
const _hoisted_11 = { class: 'code-edit-header' }
const _hoisted_12 = { class: 'code-edit-body' }
const _hoisted_13 = {
  ref: 'monacoContainer',
  class: 'code-edit-monaco'
}
const _hoisted_14 = { class: 'code-edit-footer' }
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      'div',
      {
        class: _normalizeClass($setup.classes),
        style: _normalizeStyle($setup.themeStyle)
      },
      [
        _createCommentVNode(' Avatar '),
        _ctx.role !== 'system'
          ? (_openBlock(),
            _createElementBlock(
              'div',
              {
                key: 0,
                class: _normalizeClass($setup.ns.e('avatar'))
              },
              [
                _renderSlot(_ctx.$slots, 'avatar', {}, () => [
                  _ctx.avatar
                    ? (_openBlock(),
                      _createBlock(
                        $setup['YhAvatar'],
                        {
                          key: 0,
                          src: _ctx.avatar,
                          crossorigin: 'anonymous'
                        },
                        null,
                        8,
                        ['src']
                      ))
                    : (_openBlock(),
                      _createBlock(
                        $setup['YhAvatar'],
                        { key: 1 },
                        {
                          default: _withCtx(() => [
                            _createVNode(
                              $setup['YhIcon'],
                              {
                                name: _ctx.role === 'user' ? 'user' : 'robot'
                              },
                              null,
                              8,
                              ['name']
                            )
                          ]),
                          _: 1
                          /* STABLE */
                        }
                      ))
                ])
              ],
              2
              /* CLASS */
            ))
          : _createCommentVNode('v-if', true),
        _createCommentVNode(' Content Wrapper '),
        _createElementVNode(
          'div',
          {
            class: _normalizeClass($setup.ns.e('content-wrapper'))
          },
          [
            _createCommentVNode(' Header '),
            _ctx.$slots.header || _ctx.time
              ? (_openBlock(),
                _createElementBlock(
                  'div',
                  {
                    key: 0,
                    class: _normalizeClass($setup.ns.e('header'))
                  },
                  [
                    _renderSlot(_ctx.$slots, 'header', {}, () => [
                      _ctx.time
                        ? (_openBlock(),
                          _createElementBlock(
                            'span',
                            {
                              key: 0,
                              class: _normalizeClass($setup.ns.e('time'))
                            },
                            _toDisplayString(_ctx.time),
                            3
                            /* TEXT, CLASS */
                          ))
                        : _createCommentVNode('v-if', true)
                    ])
                  ],
                  2
                  /* CLASS */
                ))
              : _createCommentVNode('v-if', true),
            _createCommentVNode(' Body '),
            _createElementVNode(
              'div',
              {
                class: _normalizeClass([$setup.ns.e('body'), $setup.ns.is('typing', _ctx.loading)])
              },
              [
                _ctx.loading && !_ctx.content
                  ? (_openBlock(),
                    _createElementBlock(
                      'span',
                      {
                        key: 0,
                        class: _normalizeClass($setup.ns.e('typing-indicator'))
                      },
                      [
                        ...(_cache[2] ||
                          (_cache[2] = [
                            _createElementVNode(
                              'span',
                              null,
                              null,
                              -1
                              /* CACHED */
                            ),
                            _createElementVNode(
                              'span',
                              null,
                              null,
                              -1
                              /* CACHED */
                            ),
                            _createElementVNode(
                              'span',
                              null,
                              null,
                              -1
                              /* CACHED */
                            )
                          ]))
                      ],
                      2
                      /* CLASS */
                    ))
                  : (_openBlock(),
                    _createElementBlock(
                      _Fragment,
                      { key: 1 },
                      [
                        _createCommentVNode(' Multimodal: Images (Above text) '),
                        _ctx.multimodal && _ctx.multimodal.some((m) => m.type === 'image')
                          ? (_openBlock(),
                            _createElementBlock(
                              'div',
                              {
                                key: 0,
                                class: _normalizeClass($setup.ns.e('image-grid'))
                              },
                              [
                                (_openBlock(true),
                                _createElementBlock(
                                  _Fragment,
                                  null,
                                  _renderList(
                                    _ctx.multimodal.filter((m) => m.type === 'image'),
                                    (img, idx) => {
                                      return (
                                        _openBlock(),
                                        _createElementBlock(
                                          'div',
                                          {
                                            key: idx,
                                            class: _normalizeClass($setup.ns.e('image-item'))
                                          },
                                          [
                                            _createElementVNode(
                                              'img',
                                              {
                                                src: img.url,
                                                alt: img.title,
                                                loading: 'lazy',
                                                crossorigin: 'anonymous'
                                              },
                                              null,
                                              8,
                                              _hoisted_1
                                            )
                                          ],
                                          2
                                          /* CLASS */
                                        )
                                      )
                                    }
                                  ),
                                  128
                                  /* KEYED_FRAGMENT */
                                ))
                              ],
                              2
                              /* CLASS */
                            ))
                          : _createCommentVNode('v-if', true),
                        _renderSlot(_ctx.$slots, 'default', {}, () => [
                          _createCommentVNode(' eslint-disable vue/no-v-html '),
                          _ctx.markdown
                            ? (_openBlock(),
                              _createElementBlock(
                                'div',
                                {
                                  key: 0,
                                  class: _normalizeClass([
                                    $setup.ns.e('text'),
                                    $setup.ns.e('markdown')
                                  ]),
                                  innerHTML: $setup.parsedContent,
                                  onMouseover: $setup.handleCitationHover,
                                  onMouseout: $setup.handleCitationLeave
                                },
                                null,
                                42,
                                _hoisted_2
                              ))
                            : (_openBlock(),
                              _createElementBlock(
                                _Fragment,
                                { key: 1 },
                                [
                                  _createCommentVNode(' eslint-enable vue/no-v-html '),
                                  _createElementVNode(
                                    'div',
                                    {
                                      class: _normalizeClass($setup.ns.e('text'))
                                    },
                                    _toDisplayString(_ctx.content),
                                    3
                                    /* TEXT, CLASS */
                                  )
                                ],
                                2112
                                /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                              ))
                        ]),
                        _createCommentVNode(' Structured Data Display (Below main text) '),
                        _ctx.structuredData
                          ? (_openBlock(),
                            _createElementBlock(
                              'div',
                              {
                                key: 1,
                                class: _normalizeClass($setup.ns.e('structured-data'))
                              },
                              [
                                _createCommentVNode(' JSON pretty view '),
                                _createCommentVNode(' eslint-disable vue/no-v-html '),
                                _ctx.structuredData.type === 'json'
                                  ? (_openBlock(),
                                    _createElementBlock(
                                      'div',
                                      {
                                        key: 0,
                                        class: _normalizeClass([$setup.ns.e('json-viewer')])
                                      },
                                      [
                                        _createElementVNode('pre', _hoisted_3, [
                                          _createElementVNode(
                                            'code',
                                            { innerHTML: $setup.jsonHtml },
                                            null,
                                            8,
                                            _hoisted_4
                                          )
                                        ])
                                      ],
                                      2
                                      /* CLASS */
                                    ))
                                  : _ctx.structuredData.type === 'table'
                                    ? (_openBlock(),
                                      _createElementBlock(
                                        _Fragment,
                                        { key: 1 },
                                        [
                                          _createCommentVNode(' eslint-enable vue/no-v-html '),
                                          _createCommentVNode(' Table view '),
                                          _createElementVNode(
                                            'div',
                                            {
                                              class: _normalizeClass([$setup.ns.e('table-viewer')])
                                            },
                                            [
                                              _createElementVNode('table', null, [
                                                _createElementVNode('thead', null, [
                                                  _ctx.structuredData.data &&
                                                  _ctx.structuredData.data.headers
                                                    ? (_openBlock(),
                                                      _createElementBlock('tr', _hoisted_5, [
                                                        (_openBlock(true),
                                                        _createElementBlock(
                                                          _Fragment,
                                                          null,
                                                          _renderList(
                                                            _ctx.structuredData.data.headers,
                                                            (h) => {
                                                              return (
                                                                _openBlock(),
                                                                _createElementBlock(
                                                                  'th',
                                                                  { key: h },
                                                                  _toDisplayString(h),
                                                                  1
                                                                  /* TEXT */
                                                                )
                                                              )
                                                            }
                                                          ),
                                                          128
                                                          /* KEYED_FRAGMENT */
                                                        ))
                                                      ]))
                                                    : _createCommentVNode('v-if', true)
                                                ]),
                                                _ctx.structuredData.data &&
                                                typeof _ctx.structuredData.data === 'object'
                                                  ? (_openBlock(),
                                                    _createElementBlock('tbody', _hoisted_6, [
                                                      (_openBlock(true),
                                                      _createElementBlock(
                                                        _Fragment,
                                                        null,
                                                        _renderList(
                                                          _ctx.structuredData.data.rows,
                                                          (row, idx) => {
                                                            return (
                                                              _openBlock(),
                                                              _createElementBlock(
                                                                'tr',
                                                                { key: idx },
                                                                [
                                                                  (_openBlock(true),
                                                                  _createElementBlock(
                                                                    _Fragment,
                                                                    null,
                                                                    _renderList(
                                                                      row,
                                                                      (cell, cIdx) => {
                                                                        return (
                                                                          _openBlock(),
                                                                          _createElementBlock(
                                                                            'td',
                                                                            { key: cIdx },
                                                                            _toDisplayString(cell),
                                                                            1
                                                                            /* TEXT */
                                                                          )
                                                                        )
                                                                      }
                                                                    ),
                                                                    128
                                                                    /* KEYED_FRAGMENT */
                                                                  ))
                                                                ]
                                                              )
                                                            )
                                                          }
                                                        ),
                                                        128
                                                        /* KEYED_FRAGMENT */
                                                      ))
                                                    ]))
                                                  : _createCommentVNode('v-if', true)
                                              ])
                                            ],
                                            2
                                            /* CLASS */
                                          )
                                        ],
                                        2112
                                        /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                                      ))
                                    : _ctx.structuredData.type === 'thought-chain' &&
                                        _ctx.structuredData.data
                                      ? (_openBlock(),
                                        _createElementBlock(
                                          _Fragment,
                                          { key: 2 },
                                          [
                                            _createCommentVNode(
                                              ' Thought chain: delegate to AiThoughtChain for consistent style '
                                            ),
                                            _createVNode(
                                              $setup['YhAiThoughtChain'],
                                              {
                                                items: _ctx.structuredData.data,
                                                title: _ctx.content || void 0,
                                                status: 'none',
                                                'dot-size': 'small',
                                                'auto-collapse': false,
                                                'line-gradient': ''
                                              },
                                              null,
                                              8,
                                              ['items', 'title']
                                            )
                                          ],
                                          2112
                                          /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                                        ))
                                      : (_openBlock(),
                                        _createElementBlock(
                                          _Fragment,
                                          { key: 3 },
                                          [
                                            _createCommentVNode(' Fallback: raw JSON '),
                                            _createElementVNode(
                                              'div',
                                              {
                                                class: _normalizeClass([
                                                  $setup.ns.e('chart-viewer')
                                                ])
                                              },
                                              [
                                                _createElementVNode(
                                                  'pre',
                                                  null,
                                                  _toDisplayString(
                                                    JSON.stringify(
                                                      _ctx.structuredData.data,
                                                      null,
                                                      2
                                                    )
                                                  ),
                                                  1
                                                  /* TEXT */
                                                )
                                              ],
                                              2
                                              /* CLASS */
                                            )
                                          ],
                                          2112
                                          /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                                        ))
                              ],
                              2
                              /* CLASS */
                            ))
                          : _createCommentVNode('v-if', true),
                        _createCommentVNode(' Multimodal: Audio/Files (Below text) '),
                        _ctx.multimodal && _ctx.multimodal.some((m) => m.type !== 'image')
                          ? (_openBlock(),
                            _createElementBlock(
                              'div',
                              {
                                key: 2,
                                class: _normalizeClass($setup.ns.e('multimodal-assets'))
                              },
                              [
                                (_openBlock(true),
                                _createElementBlock(
                                  _Fragment,
                                  null,
                                  _renderList(_ctx.multimodal, (asset, idx) => {
                                    var _a
                                    return (
                                      _openBlock(),
                                      _createElementBlock(
                                        _Fragment,
                                        { key: idx },
                                        [
                                          _createCommentVNode(' Audio Player '),
                                          asset.type === 'audio'
                                            ? (_openBlock(),
                                              _createElementBlock(
                                                'div',
                                                {
                                                  key: 0,
                                                  class: _normalizeClass([
                                                    $setup.ns.e('audio-player'),
                                                    {
                                                      'is-active': $setup.playingAsset === asset.url
                                                    }
                                                  ])
                                                },
                                                [
                                                  _createVNode(
                                                    $setup['YhButton'],
                                                    {
                                                      circle: '',
                                                      size: 'small',
                                                      type:
                                                        _ctx.role === 'user'
                                                          ? 'default'
                                                          : 'primary',
                                                      onClick: ($event) =>
                                                        $setup.handleAudioToggle(asset.url)
                                                    },
                                                    {
                                                      icon: _withCtx(() => [
                                                        _createVNode(
                                                          $setup['YhIcon'],
                                                          {
                                                            name:
                                                              $setup.playingAsset === asset.url
                                                                ? 'video-pause'
                                                                : 'video-play'
                                                          },
                                                          null,
                                                          8,
                                                          ['name']
                                                        )
                                                      ]),
                                                      _: 2
                                                      /* DYNAMIC */
                                                    },
                                                    1032,
                                                    ['type', 'onClick']
                                                  ),
                                                  _createElementVNode(
                                                    'div',
                                                    {
                                                      class: _normalizeClass([
                                                        $setup.ns.e('audio-waveform'),
                                                        {
                                                          'is-active':
                                                            $setup.playingAsset === asset.url
                                                        }
                                                      ])
                                                    },
                                                    [
                                                      (_openBlock(),
                                                      _createElementBlock(
                                                        _Fragment,
                                                        null,
                                                        _renderList(12, (i) => {
                                                          return _createElementVNode(
                                                            'span',
                                                            {
                                                              key: i,
                                                              style: _normalizeStyle({
                                                                '--delay': i * 0.1 + 's'
                                                              })
                                                            },
                                                            null,
                                                            4
                                                            /* STYLE */
                                                          )
                                                        }),
                                                        64
                                                        /* STABLE_FRAGMENT */
                                                      ))
                                                    ],
                                                    2
                                                    /* CLASS */
                                                  ),
                                                  _createElementVNode(
                                                    'span',
                                                    {
                                                      class: _normalizeClass(
                                                        $setup.ns.e('audio-duration')
                                                      )
                                                    },
                                                    _toDisplayString(
                                                      ((_a = asset.extra) == null
                                                        ? void 0
                                                        : _a.duration) || '0:00'
                                                    ),
                                                    3
                                                    /* TEXT, CLASS */
                                                  )
                                                ],
                                                2
                                                /* CLASS */
                                              ))
                                            : asset.type === 'file'
                                              ? (_openBlock(),
                                                _createElementBlock(
                                                  _Fragment,
                                                  { key: 1 },
                                                  [
                                                    _createCommentVNode(' File/Table Card '),
                                                    _createElementVNode(
                                                      'div',
                                                      {
                                                        class: _normalizeClass(
                                                          $setup.ns.e('file-card')
                                                        )
                                                      },
                                                      [
                                                        _createElementVNode(
                                                          'div',
                                                          {
                                                            class: _normalizeClass(
                                                              $setup.ns.e('file-icon')
                                                            )
                                                          },
                                                          [
                                                            _createVNode(
                                                              $setup['YhIcon'],
                                                              {
                                                                name: $setup.getFileIcon(asset.url)
                                                              },
                                                              null,
                                                              8,
                                                              ['name']
                                                            )
                                                          ],
                                                          2
                                                          /* CLASS */
                                                        ),
                                                        _createElementVNode(
                                                          'div',
                                                          {
                                                            class: _normalizeClass(
                                                              $setup.ns.e('file-info')
                                                            )
                                                          },
                                                          [
                                                            _createElementVNode(
                                                              'div',
                                                              {
                                                                class: _normalizeClass(
                                                                  $setup.ns.e('file-name')
                                                                )
                                                              },
                                                              _toDisplayString(asset.title),
                                                              3
                                                              /* TEXT, CLASS */
                                                            ),
                                                            _createElementVNode(
                                                              'div',
                                                              {
                                                                class: _normalizeClass(
                                                                  $setup.ns.e('file-meta')
                                                                )
                                                              },
                                                              _toDisplayString(asset.size),
                                                              3
                                                              /* TEXT, CLASS */
                                                            )
                                                          ],
                                                          2
                                                          /* CLASS */
                                                        ),
                                                        _createVNode(
                                                          $setup['YhButton'],
                                                          {
                                                            text: '',
                                                            circle: '',
                                                            onClick: ($event) =>
                                                              $setup.handleDownload(asset.url)
                                                          },
                                                          {
                                                            icon: _withCtx(() => [
                                                              _createVNode($setup['YhIcon'], {
                                                                name: 'download'
                                                              })
                                                            ]),
                                                            _: 1
                                                            /* STABLE */
                                                          },
                                                          8,
                                                          ['onClick']
                                                        )
                                                      ],
                                                      2
                                                      /* CLASS */
                                                    )
                                                  ],
                                                  2112
                                                  /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
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
                        _createCommentVNode(' Citations '),
                        _ctx.citations && _ctx.citations.length > 0
                          ? (_openBlock(),
                            _createElementBlock(
                              'div',
                              {
                                key: 3,
                                class: _normalizeClass($setup.ns.e('citations'))
                              },
                              [
                                _createElementVNode(
                                  'div',
                                  {
                                    class: _normalizeClass($setup.ns.e('citations-title'))
                                  },
                                  [
                                    _createVNode($setup['YhIcon'], { name: 'document' }),
                                    _createElementVNode(
                                      'span',
                                      null,
                                      _toDisplayString($setup.t('ai.bubble.citations')),
                                      1
                                      /* TEXT */
                                    ),
                                    _createElementVNode(
                                      'span',
                                      {
                                        class: _normalizeClass($setup.ns.e('citations-count'))
                                      },
                                      _toDisplayString(_ctx.citations.length),
                                      3
                                      /* TEXT, CLASS */
                                    )
                                  ],
                                  2
                                  /* CLASS */
                                ),
                                _createElementVNode(
                                  'div',
                                  {
                                    class: _normalizeClass($setup.ns.e('citations-list'))
                                  },
                                  [
                                    (_openBlock(true),
                                    _createElementBlock(
                                      _Fragment,
                                      null,
                                      _renderList(_ctx.citations, (cite, index) => {
                                        return (
                                          _openBlock(),
                                          _createElementBlock(
                                            'a',
                                            {
                                              key: index,
                                              href: cite.url,
                                              target: '_blank',
                                              class: _normalizeClass($setup.ns.e('citation-item')),
                                              title: cite.title,
                                              onClick: _withModifiers(
                                                ($event) => $setup.handleCitationClick(cite),
                                                ['prevent']
                                              )
                                            },
                                            [
                                              _createElementVNode(
                                                'span',
                                                {
                                                  class: _normalizeClass(
                                                    $setup.ns.e('citation-index')
                                                  )
                                                },
                                                _toDisplayString(cite.id || index + 1),
                                                3
                                                /* TEXT, CLASS */
                                              ),
                                              _createElementVNode(
                                                'span',
                                                {
                                                  class: _normalizeClass(
                                                    $setup.ns.e('citation-text')
                                                  )
                                                },
                                                _toDisplayString(cite.title),
                                                3
                                                /* TEXT, CLASS */
                                              ),
                                              cite.url
                                                ? (_openBlock(),
                                                  _createBlock(
                                                    $setup['YhIcon'],
                                                    {
                                                      key: 0,
                                                      name: 'arrow-right',
                                                      class: _normalizeClass(
                                                        $setup.ns.e('citation-link-icon')
                                                      )
                                                    },
                                                    null,
                                                    8,
                                                    ['class']
                                                  ))
                                                : _createCommentVNode('v-if', true)
                                            ],
                                            10,
                                            _hoisted_7
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
                              2
                              /* CLASS */
                            ))
                          : _createCommentVNode('v-if', true)
                      ],
                      64
                      /* STABLE_FRAGMENT */
                    ))
              ],
              2
              /* CLASS */
            ),
            _createCommentVNode(' Footer '),
            _ctx.$slots.footer
              ? (_openBlock(),
                _createElementBlock(
                  'div',
                  {
                    key: 1,
                    class: _normalizeClass($setup.ns.e('footer'))
                  },
                  [_renderSlot(_ctx.$slots, 'footer')],
                  2
                  /* CLASS */
                ))
              : _createCommentVNode('v-if', true)
          ],
          2
          /* CLASS */
        ),
        _createCommentVNode(' Floating Citation Tooltip '),
        (_openBlock(),
        _createBlock(_Teleport, { to: 'body' }, [
          _createVNode(
            _Transition,
            { name: 'yh-fade-in-scale-up' },
            {
              default: _withCtx(() => [
                $setup.hoveredCitation
                  ? (_openBlock(),
                    _createElementBlock(
                      'div',
                      {
                        key: 0,
                        class: _normalizeClass($setup.ns.e('citation-tooltip-wrapper')),
                        style: _normalizeStyle($setup.citationTooltipStyle),
                        onMouseenter: $setup.handleTooltipEnter,
                        onMouseleave: $setup.handleTooltipLeave
                      },
                      [
                        _createElementVNode(
                          'div',
                          {
                            class: _normalizeClass($setup.ns.e('citation-tooltip'))
                          },
                          [
                            _createElementVNode(
                              'div',
                              {
                                class: _normalizeClass($setup.ns.e('citation-tooltip-header'))
                              },
                              [
                                _createVNode(
                                  $setup['YhIcon'],
                                  {
                                    name: $setup.hoveredCitation.icon || 'document'
                                  },
                                  null,
                                  8,
                                  ['name']
                                ),
                                _createElementVNode(
                                  'span',
                                  null,
                                  _toDisplayString(
                                    $setup.hoveredCitation.source || $setup.hoveredCitation.title
                                  ),
                                  1
                                  /* TEXT */
                                )
                              ],
                              2
                              /* CLASS */
                            ),
                            _createElementVNode(
                              'div',
                              {
                                class: _normalizeClass($setup.ns.e('citation-tooltip-body'))
                              },
                              [
                                _createElementVNode(
                                  'h4',
                                  null,
                                  _toDisplayString($setup.hoveredCitation.title),
                                  1
                                  /* TEXT */
                                ),
                                $setup.hoveredCitation.abstract
                                  ? (_openBlock(),
                                    _createElementBlock(
                                      'p',
                                      _hoisted_8,
                                      _toDisplayString($setup.hoveredCitation.abstract),
                                      1
                                      /* TEXT */
                                    ))
                                  : _createCommentVNode('v-if', true),
                                $setup.hoveredCitation.publishTime
                                  ? (_openBlock(),
                                    _createElementBlock(
                                      'span',
                                      _hoisted_9,
                                      _toDisplayString($setup.hoveredCitation.publishTime),
                                      1
                                      /* TEXT */
                                    ))
                                  : _createCommentVNode('v-if', true)
                              ],
                              2
                              /* CLASS */
                            )
                          ],
                          2
                          /* CLASS */
                        )
                      ],
                      38
                      /* CLASS, STYLE, NEED_HYDRATION */
                    ))
                  : _createCommentVNode('v-if', true)
              ]),
              _: 1
              /* STABLE */
            }
          )
        ])),
        _createCommentVNode(' Code Edit Modal '),
        (_openBlock(),
        _createBlock(_Teleport, { to: 'body' }, [
          _createVNode(
            _Transition,
            { name: 'yh-fade-in' },
            {
              default: _withCtx(() => [
                $setup.editingCodeBlock
                  ? (_openBlock(),
                    _createElementBlock(
                      'div',
                      {
                        key: 0,
                        class: 'code-edit-modal-overlay',
                        onClick: _withModifiers($setup.cancelEditCode, ['self'])
                      },
                      [
                        _createElementVNode('div', _hoisted_10, [
                          _createElementVNode('div', _hoisted_11, [
                            _cache[3] ||
                              (_cache[3] = _createElementVNode(
                                'h3',
                                null,
                                'Edit Code',
                                -1
                                /* CACHED */
                              )),
                            _createVNode(
                              $setup['YhButton'],
                              {
                                text: '',
                                onClick: $setup.cancelEditCode
                              },
                              {
                                default: _withCtx(() => [
                                  _createVNode($setup['YhIcon'], { name: 'close' })
                                ]),
                                _: 1
                                /* STABLE */
                              }
                            )
                          ]),
                          _createElementVNode('div', _hoisted_12, [
                            _createElementVNode(
                              'div',
                              _hoisted_13,
                              null,
                              512
                              /* NEED_PATCH */
                            ),
                            !$setup.monaco
                              ? _withDirectives(
                                  (_openBlock(),
                                  _createElementBlock(
                                    'textarea',
                                    {
                                      key: 0,
                                      'onUpdate:modelValue':
                                        _cache[0] ||
                                        (_cache[0] = ($event) => ($setup.editCodeContent = $event)),
                                      rows: '20'
                                    },
                                    null,
                                    512
                                    /* NEED_PATCH */
                                  )),
                                  [[_vModelText, $setup.editCodeContent]]
                                )
                              : _createCommentVNode('v-if', true)
                          ]),
                          _createElementVNode('div', _hoisted_14, [
                            _createVNode(
                              $setup['YhButton'],
                              { onClick: $setup.cancelEditCode },
                              {
                                default: _withCtx(() => [
                                  ...(_cache[4] ||
                                    (_cache[4] = [
                                      _createTextVNode(
                                        'Cancel',
                                        -1
                                        /* CACHED */
                                      )
                                    ]))
                                ]),
                                _: 1
                                /* STABLE */
                              }
                            ),
                            _createVNode(
                              $setup['YhButton'],
                              {
                                type: 'primary',
                                onClick:
                                  _cache[1] ||
                                  (_cache[1] = ($event) =>
                                    $setup.saveEditCode($setup.editingCodeBlock))
                              },
                              {
                                default: _withCtx(() => [
                                  ...(_cache[5] ||
                                    (_cache[5] = [
                                      _createTextVNode(
                                        'Save',
                                        -1
                                        /* CACHED */
                                      )
                                    ]))
                                ]),
                                _: 1
                                /* STABLE */
                              }
                            )
                          ])
                        ])
                      ]
                    ))
                  : _createCommentVNode('v-if', true)
              ]),
              _: 1
              /* STABLE */
            }
          )
        ]))
      ],
      6
      /* CLASS, STYLE */
    )
  )
}
import { useLocale } from '../../../hooks/index.js'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { useComponentTheme } from '../../../theme/component-theme.js'
import {
  computed,
  ref,
  onBeforeUnmount,
  watchEffect,
  shallowRef,
  watch,
  onMounted,
  nextTick
} from 'vue'
import { aiBubbleProps } from './ai-bubble-meta.js'
import { YhAvatar } from '../../avatar.js'
import { YhButton } from '../../button.js'
import { YhIcon } from '../../icon.js'
import { YhAiThoughtChain } from '../../ai-thought-chain.js'
import MarkdownIt from '../../markdown-it.js'
import hljs from '../../highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
const __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhAiBubble'
  },
  {
    __name: 'ai-bubble',
    props: aiBubbleProps,
    setup(__props, { expose: __expose }) {
      __expose()
      const props = __props
      const ns = useNamespace('ai-bubble')
      const { t } = useLocale()
      const { themeStyle } = useComponentTheme(
        'ai-bubble',
        computed(() => props.themeOverrides)
      )
      const playingAsset = ref(null)
      let audioInstance = null
      const handleAudioToggle = (url) => {
        if (playingAsset.value === url) {
          audioInstance == null ? void 0 : audioInstance.pause()
          playingAsset.value = null
        } else {
          if (audioInstance) {
            audioInstance.pause()
          }
          playingAsset.value = url
          audioInstance = new Audio(url)
          audioInstance.play().catch((err) => {
            console.warn('Audio playback failed:', err)
            playingAsset.value = null
          })
          audioInstance.onended = () => {
            playingAsset.value = null
          }
        }
      }
      const handleDownload = (url) => {
        window.open(url, '_blank')
      }
      const escapeHtml = (str) => {
        const htmlEntities = {
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#39;'
        }
        return str.replace(/[&<>"']/g, (char) => htmlEntities[char])
      }
      const getFileIcon = (url = '') => {
        var _a
        const ext = ((_a = url.split('.').pop()) == null ? void 0 : _a.toLowerCase()) || ''
        switch (ext) {
          case 'pdf':
            return 'file-pdf'
          case 'xlsx':
          case 'xls':
          case 'csv':
            return 'file-excel'
          case 'doc':
          case 'docx':
            return 'file-word'
          case 'mp4':
          case 'webm':
          case 'mov':
            return 'file-video'
          case 'mp3':
          case 'wav':
          case 'ogg':
            return 'file-audio'
          case 'txt':
          case 'md':
            return 'file-txt'
          default:
            return 'document'
        }
      }
      const _mermaidContainer = ref(null)
      const mermaidLoading = ref(false)
      const mermaidError = ref(null)
      let mermaidModule = null
      const initMermaid = async () => {
        if (mermaidModule) return mermaidModule
        try {
          mermaidModule = await import('mermaid')
          mermaidModule.default.initialize({
            startOnLoad: false,
            theme: 'default',
            securityLevel: 'loose',
            flowchart: { curve: 'basis', padding: 15 },
            sequence: { actorMargin: 50, boxMargin: 10 }
          })
          return mermaidModule
        } catch (e) {
          console.warn('Mermaid not available:', e)
          return null
        }
      }
      const _renderMermaid = async (code) => {
        if (!mermaidModule) {
          await initMermaid()
        }
        if (!mermaidModule) return `<pre class="mermaid-error">${code}</pre>`
        mermaidLoading.value = true
        mermaidError.value = null
        try {
          const id = `mermaid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
          const { svg } = await mermaidModule.default.render(id, code)
          mermaidLoading.value = false
          return svg
        } catch (e) {
          mermaidLoading.value = false
          mermaidError.value = e instanceof Error ? e.message : 'Failed to render mermaid diagram'
          return `<pre class="mermaid-error">${code}</pre>`
        }
      }
      const expandedCodeBlocks = ref(/* @__PURE__ */ new Set())
      const copiedCodeBlocks = ref(/* @__PURE__ */ new Set())
      const editingCodeBlock = ref(null)
      const editCodeContent = ref('')
      const runningCodeBlock = ref(null)
      const codeOutput = ref({})
      let webContainerInstance = null
      const monaco = shallowRef(null)
      const monacoEditor = shallowRef(null)
      const monacoContainer = ref(null)
      const loadMonaco = async () => {
        if (monaco.value) return monaco.value
        try {
          const m = await import('monaco-editor')
          monaco.value = m
          return m
        } catch (e) {
          console.warn('Monaco editor failed to load:', e)
          return null
        }
      }
      const isWebContainerSupported = () => {
        if (typeof window === 'undefined') return false
        const isSecure = window.isSecureContext
        const hasSharedArrayBuffer = typeof SharedArrayBuffer !== 'undefined'
        const isCrossOriginIsolated = window.crossOriginIsolated
        if (!isSecure || !hasSharedArrayBuffer || !isCrossOriginIsolated) {
          console.warn(
            '[YhAiBubble] WebContainer requires secure context, SharedArrayBuffer and crossOriginIsolated. Falling back to browser runtime.'
          )
          return false
        }
        return true
      }
      const initWebContainer = async () => {
        if (webContainerInstance) return webContainerInstance
        if (!isWebContainerSupported()) {
          return null
        }
        try {
          const { WebContainer } = await import('@webcontainer/api')
          webContainerInstance = await WebContainer.boot()
          return webContainerInstance
        } catch (e) {
          console.warn('WebContainer not available, fallback to browser runtime:', e)
          return null
        }
      }
      const getCodeBlockId = (code, lang) => {
        const key = (code || '').slice(0, 50) + (lang || '')
        let hash = 0
        for (let i = 0; i < key.length; i++) {
          hash = (hash * 31 + key.charCodeAt(i)) >>> 0
        }
        return `cb-${hash.toString(16)}`
      }
      const toggleCodeBlock = (id) => {
        if (expandedCodeBlocks.value.has(id)) {
          expandedCodeBlocks.value.delete(id)
        } else {
          expandedCodeBlocks.value.add(id)
        }
      }
      const copyCode = async (code, id) => {
        try {
          await navigator.clipboard.writeText(code)
          copiedCodeBlocks.value.add(id)
          setTimeout(() => copiedCodeBlocks.value.delete(id), 2e3)
        } catch (e) {
          console.error('Copy failed:', e)
        }
      }
      const _editCode = (code, id) => {
        editingCodeBlock.value = id
        editCodeContent.value = code
      }
      const openCodeEditor = async (code, id, lang) => {
        editingCodeBlock.value = id
        editCodeContent.value = code
        await nextTick()
        const container = monacoContainer.value
        const m = await loadMonaco()
        if (!container || !m) return
        if (monacoEditor.value) {
          monacoEditor.value.dispose()
          monacoEditor.value = null
        }
        monacoEditor.value = m.editor.create(container, {
          value: code,
          language: lang || 'typescript',
          automaticLayout: true,
          minimap: { enabled: false },
          fontSize: 13,
          theme: 'vs-dark'
        })
      }
      const saveEditCode = async (id) => {
        if (monacoEditor.value) {
          editCodeContent.value = monacoEditor.value.getValue()
        }
        try {
          await navigator.clipboard.writeText(editCodeContent.value)
          copiedCodeBlocks.value.add(id)
          setTimeout(() => copiedCodeBlocks.value.delete(id), 2e3)
        } catch (e) {
          console.error('Copy edited code failed:', e)
        }
        editingCodeBlock.value = null
        editCodeContent.value = ''
      }
      const cancelEditCode = () => {
        editingCodeBlock.value = null
        editCodeContent.value = ''
        if (monacoEditor.value) {
          monacoEditor.value.dispose()
          monacoEditor.value = null
        }
      }
      const runCodeInBrowser = (code, id) => {
        codeOutput.value[id] = []
        codeOutput.value[id].push('> Running...\n')
        try {
          const logs = []
          const _customConsole = {
            log: (...args) => logs.push(args.map(String).join(' ')),
            error: (...args) => logs.push('Error: ' + args.map(String).join(' ')),
            warn: (...args) => logs.push('Warn: ' + args.map(String).join(' '))
          }
          const _originalConsole = __spreadValues({}, console)
          const streamLog = (type, ...args) => {
            const line = args.map(String).join(' ')
            const prefix = type === 'error' ? 'Error: ' : type === 'warn' ? 'Warn: ' : ''
            codeOutput.value[id].push(prefix + line)
          }
          const streamConsole = {
            log: (...args) => streamLog('log', ...args),
            error: (...args) => streamLog('error', ...args),
            warn: (...args) => streamLog('warn', ...args),
            info: (...args) => streamLog('log', ...args),
            debug: (...args) => streamLog('log', ...args)
          }
          const fn = new Function(
            'console',
            `
      return (function() {
        ${code}
      })()
    `
          )
          const result = fn(streamConsole)
          if (result !== void 0) {
            codeOutput.value[id].push(`\u2190 ${String(result)}`)
          }
          if (logs.length === 0) {
            codeOutput.value[id].push('\n\u2713 Executed successfully (no output)')
          } else {
            logs.forEach((log, index) => {
              setTimeout(() => {
                if (codeOutput.value[id]) {
                  codeOutput.value[id].push(log)
                }
              }, index * 50)
            })
          }
        } catch (e) {
          const message = e instanceof Error ? e.message : String(e)
          codeOutput.value[id].push(`
\u2717 Error: ${message}`)
        }
      }
      const runPythonInBrowser = async (code, id) => {
        codeOutput.value[id].push('> Initializing Pyodide (Python in browser)...')
        try {
          const win = window
          if (!win.loadPyodide) {
            await import(
              /* @vite-ignore */
              props.pyodideUrl
            )
          }
          if (!win.loadPyodide) {
            throw new Error('Pyodide failed to load.')
          }
          const pyodide = await win.loadPyodide({
            indexURL: props.pyodideUrl.substring(0, props.pyodideUrl.lastIndexOf('/'))
          })
          codeOutput.value[id].push('> Running Python code...\n')
          pyodide.setStdout({
            batched: (text) => {
              if (codeOutput.value[id]) {
                codeOutput.value[id].push(text)
              }
            }
          })
          const result = await pyodide.runPythonAsync(code)
          if (result !== void 0 && result !== null) {
            codeOutput.value[id].push(`
Result: ${result}`)
          }
          codeOutput.value[id].push('\n\u2713 Python execution complete')
        } catch (e) {
          const error = e instanceof Error ? e.message : String(e)
          codeOutput.value[id].push(`
Error: ${error}`)
        }
      }
      const runPythonRemote = async (code, id) => {
        codeOutput.value[id].push(`> Running Python via remote API: ${props.pythonApiUrl}...`)
        try {
          const response = await fetch(props.pythonApiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code, language: 'python' })
          })
          const result = await response.json()
          if (result.output) {
            codeOutput.value[id].push(`
${result.output}`)
          }
          if (result.error) {
            codeOutput.value[id].push(`
Error: ${result.error}`)
          }
          codeOutput.value[id].push('\n\u2713 Remote Python execution complete')
        } catch (e) {
          const error = e instanceof Error ? e.message : String(e)
          codeOutput.value[id].push(`
Remote Error: ${error}`)
        }
      }
      const runCode = async (code, lang, id) => {
        var _a
        runningCodeBlock.value = id
        codeOutput.value[id] = []
        if (props.onRunCode) {
          try {
            codeOutput.value[id].push('> Running...\n')
            const result = await props.onRunCode(code, lang)
            if (result && Symbol.asyncIterator in result) {
              const asyncResult = result
              try {
                for (
                  var iter = __forAwait(asyncResult), more, temp, error;
                  (more = !(temp = await iter.next()).done);
                  more = false
                ) {
                  const chunk = temp.value
                  codeOutput.value[id].push(chunk.output || chunk.error || '')
                }
              } catch (temp) {
                error = [temp]
              } finally {
                try {
                  more && (temp = iter.return) && (await temp.call(iter))
                } finally {
                  if (error) throw error[0]
                }
              }
            } else {
              const finalResult = result
              codeOutput.value[id] = finalResult.output
                ? finalResult.output.split('\n')
                : finalResult.error
                  ? [`Error: ${finalResult.error}`]
                  : []
            }
          } catch (e) {
            const message = e instanceof Error ? e.message : String(e)
            codeOutput.value[id].push(`Error: ${message}`)
          }
        } else if (lang === 'javascript' || lang === 'js') {
          const mdOptions = getMarkdownOptions()
          const runtime = ((_a = mdOptions.codeBlock) == null ? void 0 : _a.runtime) || 'browser'
          if (runtime === 'webcontainer') {
            try {
              const wc = await initWebContainer()
              if (!wc) {
                runCodeInBrowser(code, id)
              } else {
                codeOutput.value[id].push('> Running in WebContainer...\n')
                await wc.mount({
                  'index.js': {
                    file: {
                      contents: code
                    }
                  }
                })
                const process = await wc.spawn('node', ['index.js'])
                const reader = process.output.getReader()
                const decoder = new TextDecoder()
                while (true) {
                  const { done, value } = await reader.read()
                  if (done) break
                  const chunk = decoder.decode(value, { stream: true })
                  if (chunk) {
                    const lines = chunk.split('\n')
                    lines.forEach((line, index) => {
                      if (line || index < lines.length - 1) {
                        setTimeout(() => {
                          if (codeOutput.value[id]) {
                            codeOutput.value[id].push(line)
                          }
                        }, index * 30)
                      }
                    })
                  }
                }
                codeOutput.value[id].push('\n\u2713 WebContainer execution complete')
              }
            } catch (e) {
              console.warn('WebContainer execution failed, fallback to browser runtime:', e)
              codeOutput.value[id].push(
                '\n\u26A0 WebContainer not supported, falling back to browser...'
              )
              runCodeInBrowser(code, id)
            }
          } else {
            runCodeInBrowser(code, id)
          }
        } else if (lang === 'python' || lang === 'py') {
          if (props.enablePythonRuntime) {
            if (props.pythonRuntime === 'remote' && props.pythonApiUrl) {
              runPythonRemote(code, id)
            } else {
              runPythonInBrowser(code, id)
            }
          } else {
            codeOutput.value[id].push(
              'Python runtime is disabled. Please enable "enable-python-runtime" prop.'
            )
          }
        } else {
          codeOutput.value[id].push(`Language "${lang}" execution not supported in browser`)
        }
        const triggerRender = () => {
          if (props.markdown && mdi.value && props.content) {
            parsedContent.value = mdi.value.render(props.content)
          }
        }
        triggerRender()
        const renderInterval = setInterval(triggerRender, 100)
        setTimeout(() => {
          clearInterval(renderInterval)
          triggerRender()
          runningCodeBlock.value = null
        }, 5e3)
      }
      const explainCode = async (code, lang) => {
        if (props.onExplainCode) {
          return await props.onExplainCode(code, lang)
        }
        return ''
      }
      const parsedContent = ref(props.content)
      let renderRafId = null
      let streamTimer = null
      let streamPosition = 0
      let streamBuffer = ''
      const streamingCodeBlocks = ref(/* @__PURE__ */ new Set())
      const injectCodeStreamStyles = () => {
        if (typeof document === 'undefined') return
        const styleId = 'yh-ai-code-stream-styles'
        if (document.getElementById(styleId)) return
        const style = document.createElement('style')
        style.id = styleId
        style.textContent = `
    .code-block-wrapper.streaming .code-block-body code {
      display: block;
    }
    .code-block-wrapper.streaming .code-block-body code .line {
      display: block;
      opacity: 0;
      animation: code-line-fade-in 0.15s ease forwards;
    }
    .code-block-wrapper.streaming .code-block-body code .line:last-child {
      animation: none;
    }
    @keyframes code-line-fade-in {
      from { opacity: 0; transform: translateX(-8px); }
      to { opacity: 1; transform: translateX(0); }
    }
    /* \u5149\u6807\u95EA\u70C1\u6548\u679C */
    .code-block-wrapper.streaming .code-block-body code .line:last-child::after {
      content: '\u258B';
      animation: cursor-blink 0.8s infinite;
      margin-left: 2px;
      color: var(--yh-color-primary, #409eff);
    }
    @keyframes cursor-blink {
      0%, 50% { opacity: 1; }
      51%, 100% { opacity: 0; }
    }
  `
        document.head.appendChild(style)
      }
      const _markCodeLinesForStreaming = (codeBlockId) => {
        streamingCodeBlocks.value.add(codeBlockId)
        injectCodeStreamStyles()
      }
      watch(
        () => parsedContent.value,
        (_newContent) => {
          if (props.streaming && props.typing) {
            setTimeout(() => {
              const codeBlocks = document.querySelectorAll('.code-block-wrapper')
              codeBlocks.forEach((block) => {
                const id = block.getAttribute('data-id')
                if (id && !streamingCodeBlocks.value.has(id)) {
                  const code = block.querySelector('code')
                  if (code) {
                    const html = code.innerHTML
                    const lines = html.split('\n')
                    code.innerHTML = lines
                      .map(
                        (line, i) =>
                          `<span class="line" style="animation-delay: ${i * 30}ms">${line}</span>`
                      )
                      .join('\n')
                    block.classList.add('streaming')
                    streamingCodeBlocks.value.add(id)
                  }
                }
              })
            }, 100)
          }
        }
      )
      const _renderLatex = (text) => {
        text = text.replace(/\$\$([\s\S]+?)\$\$/g, (_, math) => {
          return `<div class="latex-block" data-latex="${encodeURIComponent(math.trim())}">${math.trim()}</div>`
        })
        text = text.replace(/\$([^\$\n]+?)\$/g, (_, math) => {
          return `<span class="latex-inline" data-latex="${encodeURIComponent(math.trim())}">${math.trim()}</span>`
        })
        return text
      }
      const _structuredDataRef = ref(null)
      const _renderStructuredData = computed(() => {
        if (!props.structuredData) return null
        const { type, data, options } = props.structuredData
        switch (type) {
          case 'json':
            return { type: 'json', data, options }
          case 'table':
            return { type: 'table', data, options }
          case 'chart':
            return { type: 'chart', data, options }
          case 'mindmap':
            return { type: 'mindmap', data, options }
          case 'thought-chain':
            return { type: 'thought-chain', data, options }
          default:
            return null
        }
      })
      const jsonHtml = computed(() => {
        if (!props.structuredData || props.structuredData.type !== 'json') return ''
        try {
          const rawData = props.structuredData.data
          const jsonString =
            typeof rawData === 'string' ? rawData : JSON.stringify(rawData, null, 2)
          if (hljs.getLanguage('json')) {
            return hljs.highlight(jsonString, {
              language: 'json',
              ignoreIllegals: true
            }).value
          }
          return jsonString
        } catch (e) {
          console.warn('Failed to render JSON structured data:', e)
          return ''
        }
      })
      const hoveredCitation = ref(null)
      const citationTooltipStyle = ref({
        top: '0px',
        left: '0px',
        position: 'fixed',
        transform: '',
        zIndex: '9999'
      })
      let citationHoverTimer = null
      const handleCitationHover = (e) => {
        var _a
        const target = e.target
        if (target && target.classList && target.classList.contains('yh-ai-citation')) {
          const id = target.getAttribute('data-id')
          const citation =
            (_a = props.citations) == null ? void 0 : _a.find((c) => String(c.id) === id)
          if (citation) {
            if (citationHoverTimer) clearTimeout(citationHoverTimer)
            hoveredCitation.value = citation
            const rect = target.getBoundingClientRect()
            citationTooltipStyle.value = {
              top: `${rect.top - 10}px`,
              left: `${rect.left + rect.width / 2}px`,
              transform: 'translate(-50%, -100%)',
              position: 'fixed',
              zIndex: '9999'
            }
          }
        }
      }
      const handleCitationLeave = (e) => {
        const target = e.target
        if (target && target.classList && target.classList.contains('yh-ai-citation')) {
          citationHoverTimer = setTimeout(() => {
            hoveredCitation.value = null
          }, 200)
        }
      }
      const handleCitationClick = (citation) => {
        if (props.onCitationClick) {
          props.onCitationClick(citation)
        } else if (citation.url) {
          window.open(citation.url, '_blank')
        }
      }
      const handleTooltipEnter = () => {
        if (citationHoverTimer) clearTimeout(citationHoverTimer)
      }
      const handleTooltipLeave = () => {
        citationHoverTimer = setTimeout(() => {
          hoveredCitation.value = null
        }, 200)
      }
      const getMarkdownOptions = () => {
        var _a
        return __spreadProps(
          __spreadValues(
            {
              mermaid: true,
              latex: true,
              filePreview: true,
              linkify: true,
              typographer: true
            },
            props.markdownOptions
          ),
          {
            codeBlock: __spreadValues(
              {
                copyable: true,
                languageTag: true,
                lineNumbers: false,
                editable: false,
                runnable: true,
                explainable: true,
                collapsible: true,
                collapseLinesThreshold: 10
              },
              ((_a = props.markdownOptions) == null ? void 0 : _a.codeBlock) || {}
            )
          }
        )
      }
      const getMarkdownInstance = () => {
        var _a, _b, _c
        const mdOptions = getMarkdownOptions()
        const md = new MarkdownIt({
          html: (_a = mdOptions.html) != null ? _a : false,
          linkify: (_b = mdOptions.linkify) != null ? _b : true,
          typographer: (_c = mdOptions.typographer) != null ? _c : true,
          highlight: function (str, lang) {
            var _a2
            const codeBlockId = getCodeBlockId(str, lang)
            const codeBlockOptions = mdOptions.codeBlock
            let result = ''
            const hlLang = lang === 'vue' ? 'xml' : lang
            if (hlLang && hljs.getLanguage(hlLang)) {
              try {
                result = hljs.highlight(str, { language: hlLang, ignoreIllegals: true }).value
              } catch (e) {}
            } else {
              result = md.utils.escapeHtml(str)
            }
            if (codeBlockOptions == null ? void 0 : codeBlockOptions.lineNumbers) {
              const lines = result.split('\n')
              const numberedLines = lines
                .map((line, i) => `<span class="line-number">${i + 1}</span>${line}`)
                .join('\n')
              result = numberedLines
            }
            const lineCount = str.split('\n').length
            const shouldCollapse =
              (codeBlockOptions == null ? void 0 : codeBlockOptions.collapsible) &&
              lineCount >
                ((_a2 =
                  codeBlockOptions == null ? void 0 : codeBlockOptions.collapseLinesThreshold) !=
                null
                  ? _a2
                  : 10)
            const isExpanded = expandedCodeBlocks.value.has(codeBlockId)
            let wrapperStart = `<div class="code-block-wrapper" data-lang="${lang}" data-id="${codeBlockId}">`
            wrapperStart += `<div class="code-block-header">`
            if (codeBlockOptions == null ? void 0 : codeBlockOptions.languageTag) {
              wrapperStart += `<span class="code-lang">${lang || 'text'}</span>`
            }
            wrapperStart += `<div class="code-actions">`
            if (codeBlockOptions == null ? void 0 : codeBlockOptions.copyable) {
              const copyText = copiedCodeBlocks.value.has(codeBlockId) ? 'Copied!' : 'Copy'
              wrapperStart += `<button class="code-action-btn copy-btn" data-code="${encodeURIComponent(str)}" data-id="${codeBlockId}">${copyText}</button>`
            }
            if (codeBlockOptions == null ? void 0 : codeBlockOptions.editable) {
              wrapperStart += `<button class="code-action-btn edit-btn" data-id="${codeBlockId}">Edit</button>`
            }
            const isRunnableLang =
              ['javascript', 'js'].includes(lang) ||
              (props.enablePythonRuntime && ['python', 'py'].includes(lang))
            if ((codeBlockOptions == null ? void 0 : codeBlockOptions.runnable) && isRunnableLang) {
              wrapperStart += `<button class="code-action-btn run-btn" data-code="${encodeURIComponent(str)}" data-lang="${lang}" data-id="${codeBlockId}">Run</button>`
            }
            if (codeBlockOptions == null ? void 0 : codeBlockOptions.explainable) {
              wrapperStart += `<button class="code-action-btn explain-btn" data-code="${encodeURIComponent(str)}" data-lang="${lang}" data-id="${codeBlockId}">Explain</button>`
            }
            if (shouldCollapse) {
              wrapperStart += `<button class="code-action-btn collapse-btn" data-id="${codeBlockId}">${isExpanded ? 'Collapse' : 'Expand'}</button>`
            }
            wrapperStart += `</div></div>`
            const _bodyClass = shouldCollapse
              ? isExpanded
                ? 'code-block-body expanded'
                : 'code-block-body collapsed'
              : 'code-block-body'
            let wrapperEnd = `</div>`
            if (codeOutput.value[codeBlockId]) {
              const outputLines = codeOutput.value[codeBlockId]
              const outputHtml = Array.isArray(outputLines)
                ? outputLines
                    .map((line) => {
                      if (line.startsWith('> '))
                        return `<span class="output-prefix">${escapeHtml(line)}</span>`
                      if (line.startsWith('\u2190 '))
                        return `<span class="output-return">${escapeHtml(line)}</span>`
                      if (line.startsWith('\u2713'))
                        return `<span class="output-success">${escapeHtml(line)}</span>`
                      if (line.startsWith('\u2717'))
                        return `<span class="output-error">${escapeHtml(line)}</span>`
                      if (line.startsWith('\u26A0'))
                        return `<span class="output-warning">${escapeHtml(line)}</span>`
                      if (line.startsWith('Error:'))
                        return `<span class="output-error">${escapeHtml(line)}</span>`
                      return escapeHtml(line)
                    })
                    .join('\n')
                : escapeHtml(outputLines)
              wrapperEnd += `<div class="code-output"><pre>${outputHtml}</pre></div>`
            }
            wrapperEnd += `</div>`
            return (
              wrapperStart +
              `<pre class="hljs ${lang || ''}"><code>${result}</code></pre>` +
              wrapperEnd
            )
          }
        })
        md.block.ruler.before('code', 'mermaid', (state, silent) => {
          const start = state.bMarks[state.line]
          const max = state.eMarks[state.line]
          const line = state.src.slice(start, max)
          if (!line.trim().startsWith('```mermaid')) return false
          if (!silent) {
            state.line++
            const lines = []
            while (state.line < state.lineMax) {
              const lineContent = state.src.slice(
                state.bMarks[state.line],
                state.eMarks[state.line]
              )
              if (lineContent.trim().startsWith('```')) break
              lines.push(lineContent)
              state.line++
            }
            let token = state.push('mermaid_open', 'div', 1)
            token.attrSet('class', 'mermaid-block')
            token = state.push('mermaid_code', '', 0)
            token.content = lines.join('\n')
            token = state.push('mermaid_close', 'div', -1)
          }
          return true
        })
        md.renderer.rules.mermaid_open = () => '<div class="mermaid-block">'
        md.renderer.rules.mermaid_code = (tokens, idx) => {
          const code = tokens[idx].content
          return `<pre class="mermaid">${md.utils.escapeHtml(code)}</pre>`
        }
        md.renderer.rules.mermaid_close = () => '</div>'
        md.inline.ruler.after('text', 'citation', (state, silent) => {
          const start = state.pos
          if (state.src.charCodeAt(start) !== 91) return false
          const match = state.src.slice(start).match(/^\[(\d+)\]/)
          if (!match) return false
          if (!silent) {
            const id = match[1]
            let token = state.push('citation_open', 'sup', 1)
            token.attrs = [
              ['class', 'yh-ai-citation'],
              ['data-id', id]
            ]
            token = state.push('text', '', 0)
            token.content = id
            state.push('citation_close', 'sup', -1)
          }
          state.pos += match[0].length
          return true
        })
        return md
      }
      const mdi = shallowRef(null)
      watchEffect(() => {
        if (props.markdown && !mdi.value) {
          mdi.value = getMarkdownInstance()
        }
      })
      onBeforeUnmount(() => {
        if (audioInstance) {
          audioInstance.pause()
          audioInstance = null
        }
        if (streamTimer) {
          clearInterval(streamTimer)
          streamTimer = null
        }
        if (monacoEditor.value) {
          monacoEditor.value.dispose()
          monacoEditor.value = null
        }
        mdi.value = null
      })
      const streamRender = (fullContent, mode, speed, interval) => {
        if (!fullContent) {
          parsedContent.value = ''
          return
        }
        if (streamTimer) {
          clearInterval(streamTimer)
          streamTimer = null
        }
        streamPosition = 0
        streamBuffer = ''
        const getChunks = () => {
          if (mode === 'paragraph') {
            return fullContent.split(/(?:\r?\n){2,}/)
          } else if (mode === 'sentence') {
            return fullContent.split(new RegExp('(?<=[.!?\u3002\uFF01\uFF1F])\\s+'))
          } else {
            const chunks2 = []
            for (let i = 0; i < fullContent.length; i += speed) {
              chunks2.push(fullContent.slice(i, i + speed))
            }
            return chunks2
          }
        }
        const chunks = getChunks()
        streamTimer = setInterval(() => {
          if (streamPosition < chunks.length) {
            streamBuffer += chunks[streamPosition]
            streamPosition++
            parsedContent.value =
              props.markdown && mdi.value ? mdi.value.render(streamBuffer) : streamBuffer
          } else {
            if (streamTimer) {
              clearInterval(streamTimer)
              streamTimer = null
            }
            parsedContent.value =
              props.markdown && mdi.value ? mdi.value.render(fullContent) : fullContent
            if (props.onStreamComplete) {
              props.onStreamComplete()
            }
          }
        }, interval)
      }
      watch(
        () => props.content,
        (newContent) => {
          if (streamTimer) {
            clearInterval(streamTimer)
            streamTimer = null
          }
          if (!props.markdown || !props.typing) {
            if (renderRafId && typeof cancelAnimationFrame !== 'undefined') {
              cancelAnimationFrame(renderRafId)
              renderRafId = null
            }
            parsedContent.value =
              props.markdown && mdi.value ? mdi.value.render(newContent || '') : newContent
            return
          }
          if (props.streaming && props.typing) {
            streamRender(newContent, props.streamMode, props.streamSpeed, props.streamInterval)
            return
          }
          if (typeof requestAnimationFrame === 'undefined') {
            parsedContent.value = mdi.value ? mdi.value.render(newContent || '') : newContent
            return
          }
          if (renderRafId) return
          renderRafId = requestAnimationFrame(() => {
            parsedContent.value = mdi.value ? mdi.value.render(newContent || '') : newContent
            renderRafId = null
          })
        },
        { immediate: true }
      )
      const computedPlacement = computed(() => {
        if (props.placement) return props.placement
        return props.role === 'user' ? 'end' : 'start'
      })
      const classes = computed(() => [
        ns.b(),
        ns.m(props.role),
        ns.m(`placement-${computedPlacement.value}`),
        ns.m(`shape-${props.shape}`),
        ns.m(`variant-${props.variant}`),
        ns.is('loading', props.loading),
        ns.is('typing', props.typing)
      ])
      const handleCodeBlockAction = async (e) => {
        const target = e.target
        if (!target.classList.contains('code-action-btn')) return
        const code = decodeURIComponent(target.getAttribute('data-code') || '')
        const lang = target.getAttribute('data-lang') || ''
        const id = target.getAttribute('data-id') || ''
        if (target.classList.contains('copy-btn')) {
          await copyCode(code, id)
        } else if (target.classList.contains('edit-btn')) {
          await openCodeEditor(code, id, lang)
        } else if (target.classList.contains('run-btn')) {
          await runCode(code, lang, id)
        } else if (target.classList.contains('explain-btn')) {
          const explanation = await explainCode(code, lang)
          if (explanation) {
            codeOutput.value[id] = explanation.split('\n')
          }
        } else if (target.classList.contains('collapse-btn')) {
          toggleCodeBlock(id)
        }
      }
      onMounted(() => {
        document.addEventListener('click', handleCodeBlockAction)
      })
      onBeforeUnmount(() => {
        document.removeEventListener('click', handleCodeBlockAction)
      })
      const __returned__ = {
        props,
        ns,
        t,
        themeStyle,
        playingAsset,
        get audioInstance() {
          return audioInstance
        },
        set audioInstance(v) {
          audioInstance = v
        },
        handleAudioToggle,
        handleDownload,
        escapeHtml,
        getFileIcon,
        _mermaidContainer,
        mermaidLoading,
        mermaidError,
        get mermaidModule() {
          return mermaidModule
        },
        set mermaidModule(v) {
          mermaidModule = v
        },
        initMermaid,
        _renderMermaid,
        expandedCodeBlocks,
        copiedCodeBlocks,
        editingCodeBlock,
        editCodeContent,
        runningCodeBlock,
        codeOutput,
        get webContainerInstance() {
          return webContainerInstance
        },
        set webContainerInstance(v) {
          webContainerInstance = v
        },
        monaco,
        monacoEditor,
        monacoContainer,
        loadMonaco,
        isWebContainerSupported,
        initWebContainer,
        getCodeBlockId,
        toggleCodeBlock,
        copyCode,
        _editCode,
        openCodeEditor,
        saveEditCode,
        cancelEditCode,
        runCodeInBrowser,
        runPythonInBrowser,
        runPythonRemote,
        runCode,
        explainCode,
        parsedContent,
        get renderRafId() {
          return renderRafId
        },
        set renderRafId(v) {
          renderRafId = v
        },
        get streamTimer() {
          return streamTimer
        },
        set streamTimer(v) {
          streamTimer = v
        },
        get streamPosition() {
          return streamPosition
        },
        set streamPosition(v) {
          streamPosition = v
        },
        get streamBuffer() {
          return streamBuffer
        },
        set streamBuffer(v) {
          streamBuffer = v
        },
        streamingCodeBlocks,
        injectCodeStreamStyles,
        _markCodeLinesForStreaming,
        _renderLatex,
        _structuredDataRef,
        _renderStructuredData,
        jsonHtml,
        hoveredCitation,
        citationTooltipStyle,
        get citationHoverTimer() {
          return citationHoverTimer
        },
        set citationHoverTimer(v) {
          citationHoverTimer = v
        },
        handleCitationHover,
        handleCitationLeave,
        handleCitationClick,
        handleTooltipEnter,
        handleTooltipLeave,
        getMarkdownOptions,
        getMarkdownInstance,
        mdi,
        streamRender,
        computedPlacement,
        classes,
        handleCodeBlockAction,
        get useNamespace() {
          return useNamespace
        },
        get useLocale() {
          return useLocale
        },
        get useComponentTheme() {
          return useComponentTheme
        },
        computed,
        ref,
        onBeforeUnmount,
        watchEffect,
        shallowRef,
        watch,
        onMounted,
        nextTick,
        get aiBubbleProps() {
          return aiBubbleProps
        },
        get YhAvatar() {
          return YhAvatar
        },
        get YhButton() {
          return YhButton
        },
        get YhIcon() {
          return YhIcon
        },
        get YhAiThoughtChain() {
          return YhAiThoughtChain
        },
        get MarkdownIt() {
          return MarkdownIt
        },
        get hljs() {
          return hljs
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
