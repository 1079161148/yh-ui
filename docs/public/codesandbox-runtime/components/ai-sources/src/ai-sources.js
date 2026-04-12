import {
  createCommentVNode as _createCommentVNode,
  renderList as _renderList,
  Fragment as _Fragment,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  createBlock as _createBlock,
  toDisplayString as _toDisplayString,
  createTextVNode as _createTextVNode,
  normalizeClass as _normalizeClass,
  createElementVNode as _createElementVNode,
  createVNode as _createVNode,
  withCtx as _withCtx,
  normalizeStyle as _normalizeStyle,
  withModifiers as _withModifiers,
  renderSlot as _renderSlot
} from 'vue'
const _hoisted_1 = ['onClick']
const _hoisted_2 = ['onClick']
const _hoisted_3 = ['onClick']
const _hoisted_4 = ['onClick']
const _hoisted_5 = ['onClick']
const _hoisted_6 = ['onClick']
const _hoisted_7 = ['onClick']
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      'div',
      {
        class: _normalizeClass([$setup.ns.b(), $setup.ns.m(_ctx.mode)]),
        style: _normalizeStyle($setup.themeStyle)
      },
      [
        _createCommentVNode(
          ' \u2500\u2500 badge \u6A21\u5F0F\uFF1A\u4EC5\u663E\u793A\u89D2\u6807 \u2500\u2500 '
        ),
        _ctx.mode === 'badge'
          ? (_openBlock(),
            _createElementBlock(
              _Fragment,
              { key: 0 },
              [
                _createElementVNode(
                  'div',
                  {
                    class: _normalizeClass($setup.ns.e('badge-row'))
                  },
                  [
                    (_openBlock(true),
                    _createElementBlock(
                      _Fragment,
                      null,
                      _renderList(_ctx.sources, (source) => {
                        return (
                          _openBlock(),
                          _createBlock(
                            $setup['YhTooltip'],
                            {
                              key: source.id,
                              placement: 'top',
                              effect: 'light',
                              'popper-class': 'yh-ai-sources__tooltip-popper'
                            },
                            {
                              content: _withCtx(() => [
                                _createElementVNode(
                                  'div',
                                  {
                                    class: _normalizeClass($setup.ns.e('tooltip-content'))
                                  },
                                  [
                                    _createElementVNode(
                                      'div',
                                      {
                                        class: _normalizeClass($setup.ns.e('tooltip-header'))
                                      },
                                      [
                                        _createElementVNode(
                                          'div',
                                          {
                                            class: _normalizeClass(
                                              $setup.ns.e('tooltip-title-wrap')
                                            )
                                          },
                                          [
                                            _createVNode(
                                              $setup['YhIcon'],
                                              {
                                                name: $setup.getFileIcon(source.fileType)
                                              },
                                              null,
                                              8,
                                              ['name']
                                            ),
                                            _createElementVNode(
                                              'span',
                                              {
                                                class: _normalizeClass($setup.ns.e('tooltip-title'))
                                              },
                                              _toDisplayString(source.title),
                                              3
                                              /* TEXT, CLASS */
                                            )
                                          ],
                                          2
                                          /* CLASS */
                                        )
                                      ],
                                      2
                                      /* CLASS */
                                    ),
                                    source.excerpt
                                      ? (_openBlock(),
                                        _createElementBlock(
                                          'p',
                                          {
                                            key: 0,
                                            class: _normalizeClass($setup.ns.e('tooltip-excerpt'))
                                          },
                                          _toDisplayString(source.excerpt),
                                          3
                                          /* TEXT, CLASS */
                                        ))
                                      : _createCommentVNode('v-if', true),
                                    source.source
                                      ? (_openBlock(),
                                        _createElementBlock(
                                          'div',
                                          {
                                            key: 1,
                                            class: _normalizeClass($setup.ns.e('tooltip-source'))
                                          },
                                          [
                                            _createVNode($setup['YhIcon'], { name: 'globe' }),
                                            _createTextVNode(
                                              ' ' + _toDisplayString(source.source),
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
                                )
                              ]),
                              default: _withCtx(() => [
                                _createElementVNode(
                                  'button',
                                  {
                                    class: _normalizeClass($setup.ns.e('badge')),
                                    onClick: ($event) => $setup.openDrawer(source)
                                  },
                                  [
                                    _ctx.showFileType
                                      ? (_openBlock(),
                                        _createBlock(
                                          $setup['YhIcon'],
                                          {
                                            key: 0,
                                            name: $setup.getFileIcon(source.fileType)
                                          },
                                          null,
                                          8,
                                          ['name']
                                        ))
                                      : _createCommentVNode('v-if', true),
                                    _createTextVNode(
                                      ' ' + _toDisplayString(source.id),
                                      1
                                      /* TEXT */
                                    )
                                  ],
                                  10,
                                  _hoisted_1
                                )
                              ]),
                              _: 2
                              /* DYNAMIC */
                            },
                            1024
                            /* DYNAMIC_SLOTS */
                          )
                        )
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ],
                  2
                  /* CLASS */
                ),
                _createCommentVNode(' \u62BD\u5C49\uFF1A\u6765\u6E90\u8BE6\u60C5 '),
                _createVNode(
                  $setup['YhDrawer'],
                  {
                    modelValue: $setup.drawerVisible,
                    'onUpdate:modelValue':
                      _cache[0] || (_cache[0] = ($event) => ($setup.drawerVisible = $event)),
                    title: $setup.t('ai.sources.drawerTitle'),
                    size: '40%',
                    'theme-overrides': _ctx.themeOverrides
                  },
                  {
                    title: _withCtx(() => [
                      _createElementVNode(
                        'div',
                        {
                          class: _normalizeClass($setup.ns.e('drawer-title-wrap'))
                        },
                        [
                          _createVNode($setup['YhIcon'], { name: 'document' }),
                          _createElementVNode(
                            'span',
                            null,
                            _toDisplayString($setup.t('ai.sources.drawerTitle')),
                            1
                            /* TEXT */
                          )
                        ],
                        2
                        /* CLASS */
                      )
                    ]),
                    default: _withCtx(() => [
                      _createElementVNode(
                        'div',
                        {
                          class: _normalizeClass($setup.ns.e('drawer-content'))
                        },
                        [
                          (_openBlock(true),
                          _createElementBlock(
                            _Fragment,
                            null,
                            _renderList(_ctx.sources, (source) => {
                              var _a
                              return (
                                _openBlock(),
                                _createElementBlock(
                                  'div',
                                  {
                                    key: source.id,
                                    ref_for: true,
                                    ref: (el) => ($setup.sourceRefs[source.id] = el),
                                    class: _normalizeClass([
                                      $setup.ns.e('source-card'),
                                      $setup.ns.is(
                                        'active',
                                        ((_a = $setup.activeSource) == null ? void 0 : _a.id) ===
                                          source.id
                                      ),
                                      $setup.ns.is(
                                        'highlighted',
                                        $setup.highlightedSourceId === source.id
                                      )
                                    ]),
                                    onClick: ($event) => $setup.handleClick(source)
                                  },
                                  [
                                    _createElementVNode(
                                      'div',
                                      {
                                        class: _normalizeClass($setup.ns.e('card-header'))
                                      },
                                      [
                                        _createElementVNode(
                                          'div',
                                          {
                                            class: _normalizeClass($setup.ns.e('card-title-row'))
                                          },
                                          [
                                            _createVNode(
                                              $setup['YhIcon'],
                                              {
                                                name: $setup.getFileIcon(source.fileType),
                                                class: _normalizeClass($setup.ns.e('file-icon'))
                                              },
                                              null,
                                              8,
                                              ['name', 'class']
                                            ),
                                            _createElementVNode(
                                              'span',
                                              {
                                                class: _normalizeClass($setup.ns.e('card-title'))
                                              },
                                              _toDisplayString(source.title),
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
                                            class: _normalizeClass($setup.ns.e('card-meta'))
                                          },
                                          [
                                            source.source
                                              ? (_openBlock(),
                                                _createElementBlock(
                                                  'span',
                                                  {
                                                    key: 0,
                                                    class: _normalizeClass(
                                                      $setup.ns.e('source-name')
                                                    )
                                                  },
                                                  _toDisplayString(source.source),
                                                  3
                                                  /* TEXT, CLASS */
                                                ))
                                              : _createCommentVNode('v-if', true),
                                            _ctx.showScore && source.score !== void 0
                                              ? (_openBlock(),
                                                _createElementBlock(
                                                  'span',
                                                  {
                                                    key: 1,
                                                    class: _normalizeClass(
                                                      $setup.ns.e('score-badge')
                                                    ),
                                                    style: _normalizeStyle({
                                                      color: $setup.scoreColor(source.score)
                                                    })
                                                  },
                                                  _toDisplayString(Math.round(source.score * 100)) +
                                                    '% ' +
                                                    _toDisplayString(
                                                      $setup.t('ai.sources.relevant')
                                                    ),
                                                  7
                                                  /* TEXT, CLASS, STYLE */
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
                                    source.excerpt
                                      ? (_openBlock(),
                                        _createElementBlock(
                                          'p',
                                          {
                                            key: 0,
                                            class: _normalizeClass($setup.ns.e('excerpt'))
                                          },
                                          _toDisplayString(source.excerpt),
                                          3
                                          /* TEXT, CLASS */
                                        ))
                                      : _createCommentVNode('v-if', true),
                                    source.url
                                      ? (_openBlock(),
                                        _createElementBlock(
                                          'button',
                                          {
                                            key: 1,
                                            class: _normalizeClass($setup.ns.e('open-btn')),
                                            onClick: ($event) => $setup.handleOpen($event, source)
                                          },
                                          [
                                            _createVNode($setup['YhIcon'], { name: 'arrow-right' }),
                                            _createTextVNode(
                                              ' ' +
                                                _toDisplayString(
                                                  $setup.t('ai.sources.viewOriginal')
                                                ),
                                              1
                                              /* TEXT */
                                            )
                                          ],
                                          10,
                                          _hoisted_3
                                        ))
                                      : _createCommentVNode('v-if', true)
                                  ],
                                  10,
                                  _hoisted_2
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
                    ]),
                    _: 1
                    /* STABLE */
                  },
                  8,
                  ['modelValue', 'title', 'theme-overrides']
                )
              ],
              64
              /* STABLE_FRAGMENT */
            ))
          : _ctx.mode === 'inline'
            ? (_openBlock(),
              _createElementBlock(
                _Fragment,
                { key: 1 },
                [
                  _createCommentVNode(
                    ' \u2500\u2500 inline \u6A21\u5F0F\uFF1A\u5185\u8054\u6C14\u6CE1\u5217\u8868 \u2500\u2500 '
                  ),
                  _createElementVNode(
                    'div',
                    {
                      class: _normalizeClass($setup.ns.e('inline-header'))
                    },
                    [
                      _createVNode($setup['YhIcon'], { name: 'document' }),
                      _createElementVNode(
                        'span',
                        null,
                        _toDisplayString(_ctx.sources.length) +
                          ' ' +
                          _toDisplayString($setup.t('ai.sources.references')),
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
                      class: _normalizeClass($setup.ns.e('inline-list'))
                    },
                    [
                      (_openBlock(true),
                      _createElementBlock(
                        _Fragment,
                        null,
                        _renderList($setup.visibleSources, (source) => {
                          return (
                            _openBlock(),
                            _createBlock(
                              $setup['YhTooltip'],
                              {
                                key: source.id,
                                placement: 'top',
                                effect: 'light',
                                disabled: !source.excerpt,
                                tabindex: '-1',
                                'popper-class': 'yh-ai-sources__tooltip-popper'
                              },
                              {
                                content: _withCtx(() => [
                                  _createElementVNode(
                                    'div',
                                    {
                                      class: _normalizeClass($setup.ns.e('tooltip-content'))
                                    },
                                    [
                                      _createElementVNode(
                                        'div',
                                        {
                                          class: _normalizeClass($setup.ns.e('tooltip-header'))
                                        },
                                        [
                                          _createElementVNode(
                                            'div',
                                            {
                                              class: _normalizeClass(
                                                $setup.ns.e('tooltip-title-wrap')
                                              )
                                            },
                                            [
                                              _createVNode(
                                                $setup['YhIcon'],
                                                {
                                                  name: $setup.getFileIcon(source.fileType)
                                                },
                                                null,
                                                8,
                                                ['name']
                                              ),
                                              _createElementVNode(
                                                'span',
                                                {
                                                  class: _normalizeClass(
                                                    $setup.ns.e('tooltip-title')
                                                  )
                                                },
                                                _toDisplayString(source.title),
                                                3
                                                /* TEXT, CLASS */
                                              )
                                            ],
                                            2
                                            /* CLASS */
                                          ),
                                          _ctx.showScore && source.score !== void 0
                                            ? (_openBlock(),
                                              _createElementBlock(
                                                'span',
                                                {
                                                  key: 0,
                                                  class: _normalizeClass(
                                                    $setup.ns.e('tooltip-score')
                                                  ),
                                                  style: _normalizeStyle({
                                                    color: $setup.scoreColor(source.score)
                                                  })
                                                },
                                                _toDisplayString(Math.round(source.score * 100)) +
                                                  '% ',
                                                7
                                                /* TEXT, CLASS, STYLE */
                                              ))
                                            : _createCommentVNode('v-if', true)
                                        ],
                                        2
                                        /* CLASS */
                                      ),
                                      source.excerpt
                                        ? (_openBlock(),
                                          _createElementBlock(
                                            'p',
                                            {
                                              key: 0,
                                              class: _normalizeClass($setup.ns.e('tooltip-excerpt'))
                                            },
                                            _toDisplayString(source.excerpt),
                                            3
                                            /* TEXT, CLASS */
                                          ))
                                        : _createCommentVNode('v-if', true),
                                      source.source
                                        ? (_openBlock(),
                                          _createElementBlock(
                                            'div',
                                            {
                                              key: 1,
                                              class: _normalizeClass($setup.ns.e('tooltip-source'))
                                            },
                                            [
                                              _createVNode($setup['YhIcon'], { name: 'globe' }),
                                              _createTextVNode(
                                                ' ' + _toDisplayString(source.source),
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
                                  )
                                ]),
                                default: _withCtx(() => [
                                  _createElementVNode(
                                    'div',
                                    {
                                      class: _normalizeClass([
                                        $setup.ns.e('inline-item'),
                                        $setup.ns.is(
                                          'highlighted',
                                          $setup.highlightedSourceId === source.id
                                        )
                                      ]),
                                      ref_for: true,
                                      ref: (el) => ($setup.sourceRefs[source.id] = el),
                                      onClick: ($event) => $setup.handleClick(source)
                                    },
                                    [
                                      _createElementVNode(
                                        'span',
                                        {
                                          class: _normalizeClass($setup.ns.e('inline-index'))
                                        },
                                        _toDisplayString(source.id),
                                        3
                                        /* TEXT, CLASS */
                                      ),
                                      _ctx.showFileType
                                        ? (_openBlock(),
                                          _createBlock(
                                            $setup['YhIcon'],
                                            {
                                              key: 0,
                                              name: $setup.getFileIcon(source.fileType),
                                              class: _normalizeClass($setup.ns.e('file-icon'))
                                            },
                                            null,
                                            8,
                                            ['name', 'class']
                                          ))
                                        : _createCommentVNode('v-if', true),
                                      _createElementVNode(
                                        'span',
                                        {
                                          class: _normalizeClass($setup.ns.e('inline-title'))
                                        },
                                        _toDisplayString(source.title),
                                        3
                                        /* TEXT, CLASS */
                                      ),
                                      _ctx.showScore && source.score !== void 0
                                        ? (_openBlock(),
                                          _createElementBlock(
                                            'span',
                                            {
                                              key: 1,
                                              class: _normalizeClass($setup.ns.e('inline-score')),
                                              style: _normalizeStyle({
                                                color: $setup.scoreColor(source.score)
                                              })
                                            },
                                            _toDisplayString(Math.round(source.score * 100)) + '% ',
                                            7
                                            /* TEXT, CLASS, STYLE */
                                          ))
                                        : _createCommentVNode('v-if', true),
                                      source.url
                                        ? (_openBlock(),
                                          _createElementBlock(
                                            'button',
                                            {
                                              key: 2,
                                              class: _normalizeClass($setup.ns.e('inline-open')),
                                              onClick: _withModifiers(
                                                ($event) => $setup.handleOpen($event, source),
                                                ['stop']
                                              )
                                            },
                                            [_createVNode($setup['YhIcon'], { name: 'launch' })],
                                            10,
                                            _hoisted_5
                                          ))
                                        : _createCommentVNode('v-if', true)
                                    ],
                                    10,
                                    _hoisted_4
                                  )
                                ]),
                                _: 2
                                /* DYNAMIC */
                              },
                              1032,
                              ['disabled']
                            )
                          )
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      )),
                      _createCommentVNode(' \u5C55\u5F00\u66F4\u591A '),
                      !$setup.isExpanded && _ctx.sources.length > _ctx.maxVisible
                        ? (_openBlock(),
                          _createElementBlock(
                            'button',
                            {
                              key: 0,
                              class: _normalizeClass($setup.ns.e('expand-btn')),
                              onClick:
                                _cache[1] || (_cache[1] = ($event) => ($setup.isExpanded = true))
                            },
                            [
                              _createTextVNode(
                                ' +' +
                                  _toDisplayString(_ctx.sources.length - _ctx.maxVisible) +
                                  ' ' +
                                  _toDisplayString($setup.t('ai.sources.more')) +
                                  ' ',
                                1
                                /* TEXT */
                              ),
                              _createVNode($setup['YhIcon'], { name: 'arrow-down' })
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
                64
                /* STABLE_FRAGMENT */
              ))
            : (_openBlock(),
              _createElementBlock(
                _Fragment,
                { key: 2 },
                [
                  _createCommentVNode(
                    ' \u2500\u2500 card \u6A21\u5F0F\uFF1A\u5B8C\u6574\u5361\u7247\u5217\u8868 \u2500\u2500 '
                  ),
                  _createElementVNode(
                    'div',
                    {
                      class: _normalizeClass($setup.ns.e('card-list-header'))
                    },
                    [
                      _createVNode($setup['YhIcon'], { name: 'document' }),
                      _createElementVNode(
                        'span',
                        null,
                        _toDisplayString($setup.t('ai.sources.referencedSources')),
                        1
                        /* TEXT */
                      ),
                      _createElementVNode(
                        'span',
                        {
                          class: _normalizeClass($setup.ns.e('count-badge'))
                        },
                        _toDisplayString(_ctx.sources.length),
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
                      class: _normalizeClass($setup.ns.e('card-list'))
                    },
                    [
                      (_openBlock(true),
                      _createElementBlock(
                        _Fragment,
                        null,
                        _renderList($setup.visibleSources, (source) => {
                          return (
                            _openBlock(),
                            _createElementBlock(
                              'div',
                              {
                                key: source.id,
                                ref_for: true,
                                ref: (el) => ($setup.sourceRefs[source.id] = el),
                                class: _normalizeClass([
                                  $setup.ns.e('source-card'),
                                  $setup.ns.is(
                                    'highlighted',
                                    $setup.highlightedSourceId === source.id
                                  )
                                ]),
                                onClick: ($event) => $setup.handleClick(source)
                              },
                              [
                                _createElementVNode(
                                  'div',
                                  {
                                    class: _normalizeClass($setup.ns.e('card-header'))
                                  },
                                  [
                                    _createElementVNode(
                                      'div',
                                      {
                                        class: _normalizeClass($setup.ns.e('card-title-row'))
                                      },
                                      [
                                        _createVNode(
                                          $setup['YhIcon'],
                                          {
                                            name: $setup.getFileIcon(source.fileType),
                                            class: _normalizeClass($setup.ns.e('file-icon'))
                                          },
                                          null,
                                          8,
                                          ['name', 'class']
                                        ),
                                        _createElementVNode(
                                          'span',
                                          {
                                            class: _normalizeClass($setup.ns.e('card-title'))
                                          },
                                          _toDisplayString(source.title),
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
                                        class: _normalizeClass($setup.ns.e('card-meta'))
                                      },
                                      [
                                        source.source
                                          ? (_openBlock(),
                                            _createElementBlock(
                                              'span',
                                              {
                                                key: 0,
                                                class: _normalizeClass($setup.ns.e('source-name'))
                                              },
                                              _toDisplayString(source.source),
                                              3
                                              /* TEXT, CLASS */
                                            ))
                                          : _createCommentVNode('v-if', true),
                                        _ctx.showScore && source.score !== void 0
                                          ? (_openBlock(),
                                            _createElementBlock(
                                              'span',
                                              {
                                                key: 1,
                                                class: _normalizeClass($setup.ns.e('score-badge')),
                                                style: _normalizeStyle({
                                                  color: $setup.scoreColor(source.score)
                                                })
                                              },
                                              _toDisplayString(Math.round(source.score * 100)) +
                                                '% ' +
                                                _toDisplayString($setup.t('ai.sources.relevant')),
                                              7
                                              /* TEXT, CLASS, STYLE */
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
                                source.excerpt
                                  ? (_openBlock(),
                                    _createElementBlock(
                                      'p',
                                      {
                                        key: 0,
                                        class: _normalizeClass($setup.ns.e('excerpt'))
                                      },
                                      _toDisplayString(source.excerpt),
                                      3
                                      /* TEXT, CLASS */
                                    ))
                                  : _createCommentVNode('v-if', true),
                                source.url
                                  ? (_openBlock(),
                                    _createElementBlock(
                                      'button',
                                      {
                                        key: 1,
                                        class: _normalizeClass($setup.ns.e('open-btn')),
                                        onClick: ($event) => $setup.handleOpen($event, source)
                                      },
                                      [
                                        _createVNode($setup['YhIcon'], { name: 'arrow-right' }),
                                        _createTextVNode(
                                          ' ' +
                                            _toDisplayString($setup.t('ai.sources.viewOriginal')),
                                          1
                                          /* TEXT */
                                        )
                                      ],
                                      10,
                                      _hoisted_7
                                    ))
                                  : _createCommentVNode('v-if', true)
                              ],
                              10,
                              _hoisted_6
                            )
                          )
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      )),
                      !$setup.isExpanded && _ctx.sources.length > _ctx.maxVisible
                        ? (_openBlock(),
                          _createElementBlock(
                            'button',
                            {
                              key: 0,
                              class: _normalizeClass($setup.ns.e('expand-btn')),
                              onClick:
                                _cache[2] || (_cache[2] = ($event) => ($setup.isExpanded = true))
                            },
                            [
                              _createTextVNode(
                                _toDisplayString($setup.t('ai.sources.showAll')) +
                                  ' (' +
                                  _toDisplayString(_ctx.sources.length) +
                                  ') ',
                                1
                                /* TEXT */
                              ),
                              _createVNode($setup['YhIcon'], { name: 'arrow-down' })
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
                64
                /* STABLE_FRAGMENT */
              )),
        _createCommentVNode(' \u989D\u5916\u63D2\u69FD '),
        _renderSlot(_ctx.$slots, 'default')
      ],
      6
      /* CLASS, STYLE */
    )
  )
}
import { useLocale } from '../../../hooks/index.js'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { ref, computed } from 'vue'
import { aiSourcesProps, aiSourcesEmits } from './ai-sources-meta.js'
import { YhIcon } from '../../icon.js'
import { YhTooltip } from '../../tooltip.js'
import { YhDrawer } from '../../drawer.js'
import { useComponentTheme } from '../../../theme/component-theme.js'
const __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhAiSources'
  },
  {
    __name: 'ai-sources',
    props: aiSourcesProps,
    emits: aiSourcesEmits,
    setup(__props, { expose: __expose, emit: __emit }) {
      const props = __props
      const emit = __emit
      const ns = useNamespace('ai-sources')
      const { t } = useLocale()
      const { themeStyle } = useComponentTheme('ai-sources', props.themeOverrides)
      const isExpanded = ref(false)
      const drawerVisible = ref(false)
      const activeSource = ref(null)
      const highlightedSourceId = ref(null)
      const sourceRefs = ref({})
      const fileTypeIcons = {
        web: 'globe',
        pdf: 'file-pdf',
        doc: 'file-word',
        xlsx: 'file-excel',
        ppt: 'presentation',
        txt: 'file-txt',
        code: 'code',
        default: 'document'
      }
      const getFileIcon = (type) => {
        var _a
        return (_a = fileTypeIcons[type != null ? type : 'default']) != null
          ? _a
          : fileTypeIcons.default
      }
      const scoreColor = (score) => {
        if (!score) return 'var(--yh-text-color-disabled)'
        if (score >= 0.8) return 'var(--yh-color-success)'
        if (score >= 0.6) return 'var(--yh-color-primary)'
        if (score >= 0.4) return 'var(--yh-color-warning)'
        return 'var(--yh-color-danger)'
      }
      const visibleSources = computed(() => {
        if (isExpanded.value || props.sources.length <= props.maxVisible) {
          return props.sources
        }
        return props.sources.slice(0, props.maxVisible)
      })
      const handleClick = (source) => {
        emit('click', source)
        if (props.mode === 'badge') {
          activeSource.value = source
          drawerVisible.value = true
        }
      }
      const handleOpen = (e, source) => {
        e.stopPropagation()
        emit('open', source)
        if (source.url) window.open(source.url, '_blank', 'noopener')
      }
      const openDrawer = (source) => {
        activeSource.value = source
        drawerVisible.value = true
      }
      const scrollToSource = (id) => {
        highlightedSourceId.value = id
        const el = sourceRefs.value[id]
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' })
          el.classList.add(ns.is('highlighted'))
          setTimeout(() => {
            el.classList.remove(ns.is('highlighted'))
            highlightedSourceId.value = null
          }, 2e3)
        }
      }
      __expose({
        scrollToSource
      })
      const __returned__ = {
        props,
        emit,
        ns,
        t,
        themeStyle,
        isExpanded,
        drawerVisible,
        activeSource,
        highlightedSourceId,
        sourceRefs,
        fileTypeIcons,
        getFileIcon,
        scoreColor,
        visibleSources,
        handleClick,
        handleOpen,
        openDrawer,
        scrollToSource,
        get useNamespace() {
          return useNamespace
        },
        get useLocale() {
          return useLocale
        },
        ref,
        computed,
        get aiSourcesProps() {
          return aiSourcesProps
        },
        get aiSourcesEmits() {
          return aiSourcesEmits
        },
        get YhIcon() {
          return YhIcon
        },
        get YhTooltip() {
          return YhTooltip
        },
        get YhDrawer() {
          return YhDrawer
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
