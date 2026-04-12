import {
  createCommentVNode as _createCommentVNode,
  renderList as _renderList,
  Fragment as _Fragment,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  toDisplayString as _toDisplayString,
  createElementVNode as _createElementVNode,
  withModifiers as _withModifiers,
  normalizeClass as _normalizeClass,
  vModelText as _vModelText,
  withDirectives as _withDirectives,
  renderSlot as _renderSlot,
  createTextVNode as _createTextVNode,
  normalizeStyle as _normalizeStyle,
  Transition as _Transition,
  withCtx as _withCtx,
  createVNode as _createVNode,
  Teleport as _Teleport,
  createBlock as _createBlock
} from 'vue'
const _hoisted_1 = ['onClick']
const _hoisted_2 = ['placeholder', 'disabled', 'readonly']
const _hoisted_3 = ['onClick']
const _hoisted_4 = ['onClick']
const _hoisted_5 = {
  key: 0,
  viewBox: '0 0 1024 1024',
  width: '1em',
  height: '1em'
}
const _hoisted_6 = {
  key: 0,
  viewBox: '0 0 1024 1024',
  width: '1em',
  height: '1em'
}
const _hoisted_7 = {
  key: 1,
  viewBox: '0 0 1024 1024',
  width: '1em',
  height: '1em'
}
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      'div',
      {
        class: _normalizeClass([
          $setup.ns.b(),
          $setup.ns.is('disabled', _ctx.disabled),
          $setup.ns.is('multiple', _ctx.multiple)
        ]),
        style: _normalizeStyle($setup.themeStyle),
        ref: 'selectRef'
      },
      [
        _createElementVNode(
          'div',
          {
            class: _normalizeClass([
              $setup.ns.e('trigger'),
              $setup.ns.is('active', $setup.visible)
            ]),
            onClick: $setup.handleTriggerClick,
            onMouseenter: _cache[1] || (_cache[1] = ($event) => ($setup.showClear = true)),
            onMouseleave: _cache[2] || (_cache[2] = ($event) => ($setup.showClear = false))
          },
          [
            _createElementVNode(
              'div',
              {
                class: _normalizeClass($setup.ns.e('tags'))
              },
              [
                _ctx.multiple && Array.isArray(_ctx.modelValue)
                  ? (_openBlock(),
                    _createElementBlock(
                      _Fragment,
                      { key: 0 },
                      [
                        _createCommentVNode(
                          ' \u5982\u679C\u5F00\u542F\u6298\u53E0\uFF0C\u4EC5\u6E32\u67D3 maxCollapseTags \u6570\u91CF\u7684\u6807\u7B7E '
                        ),
                        (_openBlock(true),
                        _createElementBlock(
                          _Fragment,
                          null,
                          _renderList(
                            _ctx.collapseTags
                              ? $setup.selectedLabels.slice(0, _ctx.maxCollapseTags)
                              : $setup.selectedLabels,
                            (item) => {
                              return (
                                _openBlock(),
                                _createElementBlock(
                                  'div',
                                  {
                                    key: item.value,
                                    class: _normalizeClass($setup.ns.e('tag'))
                                  },
                                  [
                                    _createElementVNode(
                                      'span',
                                      null,
                                      _toDisplayString(item.label),
                                      1
                                      /* TEXT */
                                    ),
                                    _createElementVNode(
                                      'span',
                                      {
                                        class: _normalizeClass($setup.ns.e('tag-close')),
                                        onClick: _withModifiers(
                                          ($event) => $setup.removeTag(item.value),
                                          ['stop']
                                        )
                                      },
                                      [
                                        ...(_cache[3] ||
                                          (_cache[3] = [
                                            _createElementVNode(
                                              'svg',
                                              {
                                                viewBox: '0 0 1024 1024',
                                                width: '1em',
                                                height: '1em'
                                              },
                                              [
                                                _createElementVNode('path', {
                                                  fill: 'currentColor',
                                                  d: 'M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336L512 457.664z'
                                                })
                                              ],
                                              -1
                                              /* CACHED */
                                            )
                                          ]))
                                      ],
                                      10,
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
                        )),
                        _createCommentVNode(' \u6298\u53E0\u5360\u4F4D\u7B26 '),
                        _ctx.collapseTags && $setup.selectedLabels.length > _ctx.maxCollapseTags
                          ? (_openBlock(),
                            _createElementBlock(
                              'div',
                              {
                                key: 0,
                                class: _normalizeClass([$setup.ns.e('tag'), $setup.ns.m('info')])
                              },
                              [
                                _createElementVNode(
                                  'span',
                                  null,
                                  '+ ' +
                                    _toDisplayString(
                                      $setup.selectedLabels.length - _ctx.maxCollapseTags
                                    ),
                                  1
                                  /* TEXT */
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
                  : _createCommentVNode('v-if', true),
                _withDirectives(
                  _createElementVNode(
                    'input',
                    {
                      ref: 'inputRef',
                      'onUpdate:modelValue':
                        _cache[0] || (_cache[0] = ($event) => ($setup.query = $event)),
                      placeholder: $setup.inputPlaceholder,
                      disabled: _ctx.disabled,
                      readonly: !_ctx.filterable,
                      class: _normalizeClass([
                        $setup.ns.e('inner'),
                        $setup.ns.is(
                          'invisible',
                          !_ctx.multiple && $setup.hasValue && !$setup.visible && !$setup.query
                        )
                      ]),
                      autocomplete: 'off',
                      onInput: $setup.handleInput,
                      onFocus: $setup.handleInputFocus
                    },
                    null,
                    42,
                    _hoisted_2
                  ),
                  [[_vModelText, $setup.query]]
                ),
                _createElementVNode(
                  'span',
                  {
                    class: _normalizeClass($setup.ns.e('suffix'))
                  },
                  [
                    $setup.showClear && _ctx.clearable && $setup.hasValue
                      ? (_openBlock(),
                        _createElementBlock(
                          'span',
                          {
                            key: 0,
                            class: _normalizeClass($setup.ns.e('clear')),
                            onClick: _withModifiers($setup.handleClear, ['stop'])
                          },
                          [
                            ...(_cache[4] ||
                              (_cache[4] = [
                                _createElementVNode(
                                  'svg',
                                  {
                                    viewBox: '0 0 1024 1024',
                                    width: '1em',
                                    height: '1em'
                                  },
                                  [
                                    _createElementVNode('path', {
                                      fill: 'currentColor',
                                      d: 'M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336L512 457.664z'
                                    })
                                  ],
                                  -1
                                  /* CACHED */
                                )
                              ]))
                          ],
                          2
                          /* CLASS */
                        ))
                      : _createCommentVNode('v-if', true),
                    _createElementVNode(
                      'span',
                      {
                        class: _normalizeClass([
                          $setup.ns.e('caret'),
                          $setup.ns.is('reverse', $setup.visible)
                        ])
                      },
                      [
                        ...(_cache[5] ||
                          (_cache[5] = [
                            _createElementVNode(
                              'svg',
                              {
                                viewBox: '0 0 1024 1024',
                                width: '1em',
                                height: '1em'
                              },
                              [
                                _createElementVNode('path', {
                                  fill: 'currentColor',
                                  d: 'M831.872 340.864L512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z'
                                })
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
              ],
              2
              /* CLASS */
            ),
            !_ctx.multiple && $setup.hasValue && !$setup.visible && !$setup.query
              ? (_openBlock(),
                _createElementBlock(
                  'div',
                  {
                    key: 0,
                    class: _normalizeClass($setup.ns.e('selected-label'))
                  },
                  _toDisplayString($setup.singleLabel),
                  3
                  /* TEXT, CLASS */
                ))
              : _createCommentVNode('v-if', true)
          ],
          34
          /* CLASS, NEED_HYDRATION */
        ),
        _createCommentVNode(' Dropdown '),
        (_openBlock(),
        _createBlock(
          _Teleport,
          {
            to: 'body',
            disabled: !_ctx.teleported
          },
          [
            _createVNode(
              _Transition,
              { name: 'yh-zoom-in-top' },
              {
                default: _withCtx(() => [
                  $setup.visible
                    ? (_openBlock(),
                      _createElementBlock(
                        'div',
                        {
                          key: 0,
                          ref: 'popperRef',
                          class: _normalizeClass([$setup.ns.e('popper'), _ctx.popperClass]),
                          style: _normalizeStyle($setup.dropdownStyle)
                        },
                        [
                          _createElementVNode(
                            'div',
                            {
                              class: _normalizeClass($setup.ns.e('dropdown'))
                            },
                            [
                              _createElementVNode(
                                'div',
                                {
                                  ref: 'virtualWrapperRef',
                                  class: _normalizeClass($setup.ns.e('options-wrapper')),
                                  style: _normalizeStyle({
                                    maxHeight: $setup.heightNumber + 'px',
                                    overflow: 'auto'
                                  }),
                                  onScroll: $setup.handleScroll
                                },
                                [
                                  _createCommentVNode(' \u5217\u8868\u533A\u57DF '),
                                  $setup.flatData.length > 0
                                    ? (_openBlock(),
                                      _createElementBlock(
                                        'div',
                                        {
                                          key: 0,
                                          style: _normalizeStyle($setup.listContainerStyle)
                                        },
                                        [
                                          _createElementVNode(
                                            'div',
                                            {
                                              style: _normalizeStyle($setup.listShiftStyle)
                                            },
                                            [
                                              (_openBlock(true),
                                              _createElementBlock(
                                                _Fragment,
                                                null,
                                                _renderList($setup.renderedNodes, (node) => {
                                                  return (
                                                    _openBlock(),
                                                    _createElementBlock(
                                                      'div',
                                                      {
                                                        key: node.key,
                                                        class: _normalizeClass([
                                                          $setup.ns.e('node'),
                                                          $setup.ns.is('selected', node.checked),
                                                          $setup.ns.is('disabled', node.disabled)
                                                        ]),
                                                        style: _normalizeStyle({
                                                          paddingLeft: `${node.level * _ctx.indent + 8}px`,
                                                          height: _ctx.itemSize + 'px'
                                                        }),
                                                        onClick: _withModifiers(
                                                          ($event) =>
                                                            $setup.handleNodeClick(node, $event),
                                                          ['stop']
                                                        )
                                                      },
                                                      [
                                                        _createElementVNode(
                                                          'div',
                                                          {
                                                            class: _normalizeClass(
                                                              $setup.ns.e('node-content')
                                                            )
                                                          },
                                                          [
                                                            _createCommentVNode(
                                                              ' \u5C55\u5F00\u56FE\u6807 '
                                                            ),
                                                            _createElementVNode(
                                                              'span',
                                                              {
                                                                class: _normalizeClass([
                                                                  $setup.ns.e('expand-icon'),
                                                                  $setup.ns.is('leaf', node.isLeaf),
                                                                  $setup.ns.is(
                                                                    'expanded',
                                                                    node.expanded
                                                                  )
                                                                ]),
                                                                onClick: _withModifiers(
                                                                  ($event) =>
                                                                    $setup.toggleExpand(node),
                                                                  ['stop']
                                                                )
                                                              },
                                                              [
                                                                !node.loading
                                                                  ? (_openBlock(),
                                                                    _createElementBlock(
                                                                      'svg',
                                                                      _hoisted_5,
                                                                      [
                                                                        ...(_cache[6] ||
                                                                          (_cache[6] = [
                                                                            _createElementVNode(
                                                                              'path',
                                                                              {
                                                                                fill: 'currentColor',
                                                                                d: 'M340.864 149.312l470.4 362.688-470.4 362.688c-26.432 20.416-64 1.6-64-32V181.312c0-33.6 37.568-52.416 64-32z'
                                                                              },
                                                                              null,
                                                                              -1
                                                                              /* CACHED */
                                                                            )
                                                                          ]))
                                                                      ]
                                                                    ))
                                                                  : (_openBlock(),
                                                                    _createElementBlock(
                                                                      'svg',
                                                                      {
                                                                        key: 1,
                                                                        class: _normalizeClass(
                                                                          $setup.ns.is('loading')
                                                                        ),
                                                                        viewBox: '0 0 1024 1024',
                                                                        width: '1em',
                                                                        height: '1em'
                                                                      },
                                                                      [
                                                                        ...(_cache[7] ||
                                                                          (_cache[7] = [
                                                                            _createElementVNode(
                                                                              'path',
                                                                              {
                                                                                fill: 'currentColor',
                                                                                d: 'M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32zm448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zm-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32z'
                                                                              },
                                                                              null,
                                                                              -1
                                                                              /* CACHED */
                                                                            )
                                                                          ]))
                                                                      ],
                                                                      2
                                                                      /* CLASS */
                                                                    ))
                                                              ],
                                                              10,
                                                              _hoisted_4
                                                            ),
                                                            _createCommentVNode(
                                                              ' \u590D\u9009\u6846 '
                                                            ),
                                                            _ctx.showCheckbox
                                                              ? (_openBlock(),
                                                                _createElementBlock(
                                                                  'span',
                                                                  {
                                                                    key: 0,
                                                                    class: _normalizeClass([
                                                                      $setup.ns.e('checkbox'),
                                                                      $setup.ns.is(
                                                                        'checked',
                                                                        node.checked
                                                                      ),
                                                                      $setup.ns.is(
                                                                        'indeterminate',
                                                                        node.indeterminate
                                                                      ),
                                                                      $setup.ns.is(
                                                                        'disabled',
                                                                        node.disabled
                                                                      )
                                                                    ])
                                                                  },
                                                                  [
                                                                    _createElementVNode(
                                                                      'span',
                                                                      {
                                                                        class: _normalizeClass(
                                                                          $setup.ns.e(
                                                                            'checkbox-inner'
                                                                          )
                                                                        )
                                                                      },
                                                                      [
                                                                        node.checked &&
                                                                        !node.indeterminate
                                                                          ? (_openBlock(),
                                                                            _createElementBlock(
                                                                              'svg',
                                                                              _hoisted_6,
                                                                              [
                                                                                ...(_cache[8] ||
                                                                                  (_cache[8] = [
                                                                                    _createElementVNode(
                                                                                      'path',
                                                                                      {
                                                                                        fill: 'currentColor',
                                                                                        d: 'M406.656 706.944L195.84 496.256a32 32 0 1 0-45.248 45.248l256 256 512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z'
                                                                                      },
                                                                                      null,
                                                                                      -1
                                                                                      /* CACHED */
                                                                                    )
                                                                                  ]))
                                                                              ]
                                                                            ))
                                                                          : node.indeterminate
                                                                            ? (_openBlock(),
                                                                              _createElementBlock(
                                                                                'svg',
                                                                                _hoisted_7,
                                                                                [
                                                                                  ...(_cache[9] ||
                                                                                    (_cache[9] = [
                                                                                      _createElementVNode(
                                                                                        'path',
                                                                                        {
                                                                                          fill: 'currentColor',
                                                                                          d: 'M192 448h640v128H192z'
                                                                                        },
                                                                                        null,
                                                                                        -1
                                                                                        /* CACHED */
                                                                                      )
                                                                                    ]))
                                                                                ]
                                                                              ))
                                                                            : _createCommentVNode(
                                                                                'v-if',
                                                                                true
                                                                              )
                                                                      ],
                                                                      2
                                                                      /* CLASS */
                                                                    )
                                                                  ],
                                                                  2
                                                                  /* CLASS */
                                                                ))
                                                              : _createCommentVNode('v-if', true),
                                                            _createCommentVNode(' \u6587\u672C '),
                                                            _createElementVNode(
                                                              'span',
                                                              {
                                                                class: _normalizeClass(
                                                                  $setup.ns.e('node-label')
                                                                )
                                                              },
                                                              [
                                                                _renderSlot(
                                                                  _ctx.$slots,
                                                                  'default',
                                                                  {
                                                                    node,
                                                                    data: node.raw
                                                                  },
                                                                  () => [
                                                                    _createTextVNode(
                                                                      _toDisplayString(node.label),
                                                                      1
                                                                      /* TEXT */
                                                                    )
                                                                  ]
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
                                                      14,
                                                      _hoisted_3
                                                    )
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
                                        'div',
                                        {
                                          key: 1,
                                          class: _normalizeClass($setup.ns.e('empty'))
                                        },
                                        _toDisplayString(
                                          _ctx.emptyText || $setup.t('treeselect.emptyText')
                                        ),
                                        3
                                        /* TEXT, CLASS */
                                      ))
                                ],
                                38
                                /* CLASS, STYLE, NEED_HYDRATION */
                              )
                            ],
                            2
                            /* CLASS */
                          )
                        ],
                        6
                        /* CLASS, STYLE */
                      ))
                    : _createCommentVNode('v-if', true)
                ]),
                _: 3
                /* FORWARDED */
              }
            )
          ],
          8,
          ['disabled']
        ))
      ],
      6
      /* CLASS, STYLE */
    )
  )
}
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { useLocale } from '../../../hooks/index.js'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { useComponentTheme } from '../../../theme/component-theme.js'
import { treeSelectProps, treeSelectEmits } from './tree-select-meta.js'
import { useTree } from './use-tree.js'
const __sfc__ = /* @__PURE__ */ Object.assign(
  { name: 'YhTreeSelect' },
  {
    __name: 'tree-select',
    props: treeSelectProps,
    emits: treeSelectEmits,
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose()
      const props = __props
      const emit = __emit
      const ns = useNamespace('tree-select')
      const { t } = useLocale()
      const { themeStyle } = useComponentTheme(
        'tree-select',
        computed(() => props.themeOverrides)
      )
      const visible = ref(false)
      const query = ref('')
      const dropdownStyle = ref({})
      const inputRef = ref(null)
      const selectRef = ref(null)
      const popperRef = ref(null)
      const virtualWrapperRef = ref(null)
      const scrollTop = ref(0)
      const showClear = ref(false)
      const { flatData, nodeMap, mapVersion, checkNode, toggleExpand, filter, getNode } = useTree(
        props,
        emit
      )
      const heightNumber = computed(() => {
        if (typeof props.height === 'number') return props.height
        const parsed = parseInt(String(props.height))
        return isNaN(parsed) ? 274 : parsed
      })
      const renderedNodes = computed(() => {
        if (!props.virtual) return flatData.value
        const start = Math.max(0, Math.floor(scrollTop.value / props.itemSize) - 5)
        const end = Math.min(
          flatData.value.length,
          start + Math.ceil(heightNumber.value / props.itemSize) + 10
        )
        return flatData.value.slice(start, end)
      })
      const listContainerStyle = computed(() => {
        if (!props.virtual) return {}
        return {
          height: `${flatData.value.length * props.itemSize}px`,
          position: 'relative'
        }
      })
      const listShiftStyle = computed(() => {
        if (!props.virtual) return {}
        const start = Math.max(0, Math.floor(scrollTop.value / props.itemSize) - 5)
        return {
          transform: `translateY(${start * props.itemSize}px)`,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0
        }
      })
      const handleScroll = (e) => {
        if (props.virtual) {
          scrollTop.value = e.target.scrollTop
        }
      }
      const hasValue = computed(() => {
        if (props.multiple) return Array.isArray(props.modelValue) && props.modelValue.length > 0
        return props.modelValue !== void 0 && props.modelValue !== null && props.modelValue !== ''
      })
      const singleLabel = computed(() => {
        var _a
        void mapVersion.value
        if (props.multiple || !hasValue.value) return ''
        const node = getNode(props.modelValue)
        return node ? node.label : String((_a = props.modelValue) != null ? _a : '')
      })
      const inputPlaceholder = computed(() => {
        if (props.multiple)
          return hasValue.value ? '' : props.placeholder || t('treeselect.placeholder')
        if (hasValue.value && props.filterable && visible.value) return singleLabel.value
        return props.placeholder || t('treeselect.placeholder')
      })
      const selectedLabels = computed(() => {
        void mapVersion.value
        const value = props.modelValue
        const keys = Array.isArray(value)
          ? value
          : value !== void 0 && value !== null && value !== ''
            ? [value]
            : []
        return keys.map((k) => {
          const node = getNode(k)
          return { value: k, label: node ? node.label : String(k) }
        })
      })
      const handleTriggerClick = () => {
        if (props.disabled) return
        visible.value = !visible.value
      }
      const closeMenu = () => {
        visible.value = false
        query.value = ''
        filter('')
      }
      const handleOutsideClick = (e) => {
        const target = e.target
        if (
          visible.value &&
          selectRef.value &&
          !selectRef.value.contains(target) &&
          popperRef.value &&
          !popperRef.value.contains(target)
        ) {
          closeMenu()
        }
      }
      const handleNodeClick = (node, e) => {
        if (node.disabled) return
        emit('node-click', node.raw, node, e)
        if (props.lazy && !node.loaded && !node.isLeaf) {
          toggleExpand(node)
          return
        }
        if (props.showCheckbox || props.checkStrictly || props.checkOnClickNode) {
          checkNode(node, !node.checked)
          if (!props.multiple && !props.showCheckbox) {
            nextTick(() => closeMenu())
          }
        } else {
          if (node.isLeaf) {
            checkNode(node, !node.checked)
            if (!props.multiple) {
              nextTick(() => closeMenu())
            }
          } else if (props.expandOnClickNode) {
            toggleExpand(node)
          }
        }
      }
      const removeTag = (key) => {
        const node = getNode(key)
        if (node) checkNode(node, false)
        else if (Array.isArray(props.modelValue)) {
          emit(
            'update:modelValue',
            props.modelValue.filter((v) => v !== key)
          )
        }
      }
      const handleClear = () => {
        emit('update:modelValue', props.multiple ? [] : void 0)
        emit('clear')
        nextTick(() => {
          nodeMap.value.forEach((n) => {
            n.checked = false
            n.indeterminate = false
          })
          mapVersion.value++
        })
      }
      const handleInput = () => {
        if (!visible.value) visible.value = true
        filter(query.value)
      }
      const handleInputFocus = () => {
        if (!props.disabled && props.filterable) visible.value = true
      }
      const updatePopper = () => {
        nextTick(() => {
          if (selectRef.value) {
            const rect = selectRef.value.getBoundingClientRect()
            const styles = window.getComputedStyle(selectRef.value)
            const primary = styles.getPropertyValue('--yh-color-primary').trim()
            const primaryRgb = styles.getPropertyValue('--yh-color-primary-rgb').trim()
            dropdownStyle.value = {
              width: `${rect.width}px`,
              position: 'fixed',
              top: `${rect.bottom + 4}px`,
              left: `${rect.left}px`,
              zIndex: '2000',
              '--yh-color-primary': primary,
              '--yh-color-primary-rgb': primaryRgb
            }
          }
        })
      }
      watch(visible, (val) => {
        emit('visible-change', val)
        if (val) {
          scrollTop.value = 0
          updatePopper()
          window.addEventListener('click', handleOutsideClick, true)
          window.addEventListener('scroll', updatePopper, true)
          window.addEventListener('resize', updatePopper)
          nextTick(() => {
            if (virtualWrapperRef.value) virtualWrapperRef.value.scrollTop = 0
          })
        } else {
          window.removeEventListener('click', handleOutsideClick, true)
          window.removeEventListener('scroll', updatePopper, true)
          window.removeEventListener('resize', updatePopper)
        }
      })
      onMounted(() => {
        if (visible.value) updatePopper()
      })
      onBeforeUnmount(() => {
        window.removeEventListener('click', handleOutsideClick, true)
        window.removeEventListener('scroll', updatePopper, true)
        window.removeEventListener('resize', updatePopper)
      })
      const __returned__ = {
        props,
        emit,
        ns,
        t,
        themeStyle,
        visible,
        query,
        dropdownStyle,
        inputRef,
        selectRef,
        popperRef,
        virtualWrapperRef,
        scrollTop,
        showClear,
        flatData,
        nodeMap,
        mapVersion,
        checkNode,
        toggleExpand,
        filter,
        getNode,
        heightNumber,
        renderedNodes,
        listContainerStyle,
        listShiftStyle,
        handleScroll,
        hasValue,
        singleLabel,
        inputPlaceholder,
        selectedLabels,
        handleTriggerClick,
        closeMenu,
        handleOutsideClick,
        handleNodeClick,
        removeTag,
        handleClear,
        handleInput,
        handleInputFocus,
        updatePopper,
        ref,
        computed,
        watch,
        nextTick,
        onMounted,
        onBeforeUnmount,
        get useNamespace() {
          return useNamespace
        },
        get useLocale() {
          return useLocale
        },
        get useComponentTheme() {
          return useComponentTheme
        },
        get treeSelectProps() {
          return treeSelectProps
        },
        get treeSelectEmits() {
          return treeSelectEmits
        },
        get useTree() {
          return useTree
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
