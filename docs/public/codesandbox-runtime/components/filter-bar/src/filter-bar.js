var __defProp = Object.defineProperty
var __defProps = Object.defineProperties
var __getOwnPropDescs = Object.getOwnPropertyDescriptors
var __getOwnPropSymbols = Object.getOwnPropertySymbols
var __hasOwnProp = Object.prototype.hasOwnProperty
var __propIsEnum = Object.prototype.propertyIsEnumerable
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
import {
  createCommentVNode as _createCommentVNode,
  toDisplayString as _toDisplayString,
  normalizeClass as _normalizeClass,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  renderList as _renderList,
  Fragment as _Fragment,
  createElementVNode as _createElementVNode,
  renderSlot as _renderSlot,
  Transition as _Transition,
  withCtx as _withCtx,
  createVNode as _createVNode,
  normalizeStyle as _normalizeStyle
} from 'vue'
const _hoisted_1 = ['onClick']
const _hoisted_2 = ['onClick']
const _hoisted_3 = ['onClick']
const _hoisted_4 = {
  key: 0,
  viewBox: '0 0 1024 1024',
  width: '1.2em',
  height: '1.2em',
  fill: 'currentColor'
}
const _hoisted_5 = {
  key: 1,
  viewBox: '0 0 1024 1024',
  width: '1.2em',
  height: '1.2em',
  fill: 'currentColor'
}
const _hoisted_6 = ['aria-label']
const _hoisted_7 = ['aria-label']
const _hoisted_8 = ['onClick']
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      'div',
      {
        ref: 'barRef',
        class: _normalizeClass([
          $setup.ns.b(),
          $setup.ns.is('sticky', _ctx.sticky),
          $setup.ns.is('stuck', $setup.isStuck)
        ]),
        style: _normalizeStyle([
          $setup.themeStyle,
          _ctx.sticky
            ? {
                top: `${_ctx.stickyOffset}px`
              }
            : {}
        ])
      },
      [
        _createCommentVNode(' \u7B5B\u9009/\u6392\u5E8F tab \u884C '),
        _createElementVNode(
          'div',
          {
            class: _normalizeClass($setup.ns.e('bar'))
          },
          [
            _createCommentVNode(' \u5168\u90E8 tab '),
            _ctx.showAll
              ? (_openBlock(),
                _createElementBlock(
                  'button',
                  {
                    key: 0,
                    class: _normalizeClass([
                      $setup.ns.e('tab'),
                      $setup.ns.is('active', !$setup.innerSort.key && !$setup.activeFilterCount)
                    ]),
                    onClick: $setup.resetAll
                  },
                  _toDisplayString($setup.t('filterbar.all')),
                  3
                  /* TEXT, CLASS */
                ))
              : _createCommentVNode('v-if', true),
            _createCommentVNode(' \u6392\u5E8F tabs '),
            (_openBlock(true),
            _createElementBlock(
              _Fragment,
              null,
              _renderList(_ctx.sorts, (sortItem) => {
                return (
                  _openBlock(),
                  _createElementBlock(
                    'button',
                    {
                      key: sortItem.key,
                      class: _normalizeClass([
                        $setup.ns.e('tab'),
                        $setup.ns.e('sort-tab'),
                        $setup.ns.is('active', $setup.innerSort.key === sortItem.key)
                      ]),
                      onClick: ($event) => $setup.handleSortClick(sortItem.key)
                    },
                    [
                      _createElementVNode(
                        'span',
                        null,
                        _toDisplayString(sortItem.label),
                        1
                        /* TEXT */
                      ),
                      _createElementVNode(
                        'span',
                        {
                          class: _normalizeClass([$setup.ns.e('sort-arrows')])
                        },
                        [
                          _createElementVNode(
                            'i',
                            {
                              class: _normalizeClass([
                                $setup.ns.e('arrow-up'),
                                $setup.ns.is(
                                  'active',
                                  $setup.innerSort.key === sortItem.key &&
                                    $setup.innerSort.order === 'asc'
                                )
                              ])
                            },
                            [
                              ...(_cache[1] ||
                                (_cache[1] = [
                                  _createElementVNode(
                                    'svg',
                                    {
                                      viewBox: '0 0 1024 1024',
                                      width: '1em',
                                      height: '1em',
                                      fill: 'currentColor'
                                    },
                                    [_createElementVNode('path', { d: 'M512 320L192 704h640z' })],
                                    -1
                                    /* CACHED */
                                  )
                                ]))
                            ],
                            2
                            /* CLASS */
                          ),
                          _createElementVNode(
                            'i',
                            {
                              class: _normalizeClass([
                                $setup.ns.e('arrow-down'),
                                $setup.ns.is(
                                  'active',
                                  $setup.innerSort.key === sortItem.key &&
                                    $setup.innerSort.order === 'desc'
                                )
                              ])
                            },
                            [
                              ...(_cache[2] ||
                                (_cache[2] = [
                                  _createElementVNode(
                                    'svg',
                                    {
                                      viewBox: '0 0 1024 1024',
                                      width: '1em',
                                      height: '1em',
                                      fill: 'currentColor'
                                    },
                                    [_createElementVNode('path', { d: 'M512 704L832 320H192z' })],
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
                    10,
                    _hoisted_1
                  )
                )
              }),
              128
              /* KEYED_FRAGMENT */
            )),
            _createCommentVNode(' \u7B5B\u9009 tabs '),
            _ctx.filterInPanel
              ? (_openBlock(),
                _createElementBlock(
                  _Fragment,
                  { key: 1 },
                  [
                    (_openBlock(true),
                    _createElementBlock(
                      _Fragment,
                      null,
                      _renderList(_ctx.filters, (filterItem) => {
                        return (
                          _openBlock(),
                          _createElementBlock(
                            'button',
                            {
                              key: filterItem.key,
                              class: _normalizeClass([
                                $setup.ns.e('tab'),
                                $setup.ns.e('filter-tab'),
                                $setup.ns.is(
                                  'active',
                                  !!$setup.innerFilterValue[filterItem.key] &&
                                    (Array.isArray($setup.innerFilterValue[filterItem.key])
                                      ? $setup.innerFilterValue[filterItem.key].length > 0
                                      : true)
                                )
                              ]),
                              onClick: ($event) => $setup.openFilterPanel(filterItem)
                            },
                            [
                              _createElementVNode(
                                'span',
                                null,
                                _toDisplayString(filterItem.label),
                                1
                                /* TEXT */
                              ),
                              _createElementVNode(
                                'i',
                                {
                                  class: _normalizeClass($setup.ns.e('arrow-icon'))
                                },
                                [
                                  ...(_cache[3] ||
                                    (_cache[3] = [
                                      _createElementVNode(
                                        'svg',
                                        {
                                          viewBox: '0 0 1024 1024',
                                          width: '1em',
                                          height: '1em',
                                          fill: 'currentColor'
                                        },
                                        [
                                          _createElementVNode('path', {
                                            d: 'M512 704L832 320H192z'
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
                            10,
                            _hoisted_2
                          )
                        )
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    )),
                    _createCommentVNode(' \u7EFC\u5408\u7B5B\u9009\u6309\u94AE '),
                    _ctx.showGlobalFilter
                      ? (_openBlock(),
                        _createElementBlock(
                          'button',
                          {
                            key: 0,
                            class: _normalizeClass([
                              $setup.ns.e('tab'),
                              $setup.ns.e('filter-btn'),
                              $setup.ns.is('active', $setup.activeFilterCount > 0)
                            ]),
                            onClick:
                              _cache[0] || (_cache[0] = ($event) => $setup.emit('openFilter'))
                          },
                          [
                            _createElementVNode(
                              'span',
                              null,
                              _toDisplayString($setup.t('filterbar.filter')),
                              1
                              /* TEXT */
                            ),
                            $setup.activeFilterCount
                              ? (_openBlock(),
                                _createElementBlock(
                                  'span',
                                  {
                                    key: 0,
                                    class: _normalizeClass($setup.ns.e('badge'))
                                  },
                                  _toDisplayString($setup.activeFilterCount),
                                  3
                                  /* TEXT, CLASS */
                                ))
                              : _createCommentVNode('v-if', true),
                            _renderSlot(_ctx.$slots, 'filter-icon', {}, () => [
                              _createElementVNode(
                                'i',
                                {
                                  class: _normalizeClass($setup.ns.e('filter-icon'))
                                },
                                [
                                  ...(_cache[4] ||
                                    (_cache[4] = [
                                      _createElementVNode(
                                        'svg',
                                        {
                                          viewBox: '0 0 1024 1024',
                                          width: '1em',
                                          height: '1em',
                                          fill: 'currentColor'
                                        },
                                        [
                                          _createElementVNode('path', {
                                            d: 'M880.005 224H143.995c-23.778 0-38.653 25.492-22.95 45.418L384 602.822v263.854c0 15.365 17.554 24.088 29.818 14.89l185.394-139.046c6.242-4.682 9.924-12.072 9.924-19.866V602.823l293.818-333.406c15.704-19.926.83-45.417-22.949-45.417z'
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
                            ])
                          ],
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
                  { key: 2 },
                  [
                    _createCommentVNode(' \u5185\u8054\u7B5B\u9009 '),
                    (_openBlock(true),
                    _createElementBlock(
                      _Fragment,
                      null,
                      _renderList(_ctx.filters, (filterItem) => {
                        return (
                          _openBlock(),
                          _createElementBlock(
                            'div',
                            {
                              key: filterItem.key,
                              class: _normalizeClass($setup.ns.e('inline-filter'))
                            },
                            [
                              _createElementVNode(
                                'span',
                                {
                                  class: _normalizeClass($setup.ns.e('inline-label'))
                                },
                                _toDisplayString(filterItem.label),
                                3
                                /* TEXT, CLASS */
                              ),
                              (_openBlock(true),
                              _createElementBlock(
                                _Fragment,
                                null,
                                _renderList(filterItem.options, (opt) => {
                                  return (
                                    _openBlock(),
                                    _createElementBlock(
                                      'button',
                                      {
                                        key: String(opt.value),
                                        class: _normalizeClass([
                                          $setup.ns.e('inline-opt'),
                                          $setup.ns.is(
                                            'active',
                                            $setup.isOptionSelected(filterItem, opt)
                                          )
                                        ]),
                                        onClick: ($event) => $setup.toggleOption(filterItem, opt)
                                      },
                                      _toDisplayString(opt.label),
                                      11,
                                      _hoisted_3
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
                        )
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ],
                  64
                  /* STABLE_FRAGMENT */
                )),
            _createCommentVNode(' \u89C6\u56FE\u5207\u6362\u6309\u94AE '),
            _ctx.showViewToggle
              ? (_openBlock(),
                _createElementBlock(
                  'button',
                  {
                    key: 3,
                    class: _normalizeClass([$setup.ns.e('tab'), $setup.ns.e('view-btn')]),
                    onClick: $setup.handleViewToggle
                  },
                  [
                    _renderSlot(_ctx.$slots, 'view-icon', { viewType: _ctx.viewType }, () => [
                      _ctx.viewType === 'list'
                        ? (_openBlock(),
                          _createElementBlock('svg', _hoisted_4, [
                            ...(_cache[5] ||
                              (_cache[5] = [
                                _createElementVNode(
                                  'path',
                                  {
                                    d: 'M128 320h768v85.333H128V320zM128 618.667h768V704H128v-85.333z'
                                  },
                                  null,
                                  -1
                                  /* CACHED */
                                )
                              ]))
                          ]))
                        : (_openBlock(),
                          _createElementBlock('svg', _hoisted_5, [
                            ...(_cache[6] ||
                              (_cache[6] = [
                                _createElementVNode(
                                  'path',
                                  {
                                    d: 'M213.333 213.333h256v256h-256v-256zM554.667 213.333h256v256h-256v-256zM213.333 554.667h256v256h-256v-256zM554.667 554.667h256v256h-256v-256z'
                                  },
                                  null,
                                  -1
                                  /* CACHED */
                                )
                              ]))
                          ]))
                    ])
                  ],
                  2
                  /* CLASS */
                ))
              : _createCommentVNode('v-if', true),
            _createCommentVNode(' \u81EA\u5B9A\u4E49\u6269\u5C55\u533A '),
            _renderSlot(_ctx.$slots, 'extra')
          ],
          2
          /* CLASS */
        ),
        _createCommentVNode(' \u7B5B\u9009\u9762\u677F\uFF08\u4E0B\u62C9\u6D6E\u5C42\uFF09 '),
        _createVNode(
          _Transition,
          {
            name: $setup.ns.b('panel')
          },
          {
            default: _withCtx(() => [
              $setup.isPanelOpen && _ctx.filterInPanel && $setup.panelFilter
                ? (_openBlock(),
                  _createElementBlock(
                    'div',
                    {
                      key: 0,
                      class: _normalizeClass($setup.ns.e('panel')),
                      role: 'dialog',
                      'aria-label': $setup.t('filterbar.filter')
                    },
                    [
                      _createCommentVNode(' \u9762\u677F\u906E\u7F69 '),
                      _createElementVNode(
                        'div',
                        {
                          class: _normalizeClass($setup.ns.e('overlay')),
                          onClick: $setup.closePanel
                        },
                        null,
                        2
                        /* CLASS */
                      ),
                      _createElementVNode(
                        'div',
                        {
                          class: _normalizeClass($setup.ns.e('panel-body'))
                        },
                        [
                          _createCommentVNode(' \u6807\u9898 '),
                          _createElementVNode(
                            'div',
                            {
                              class: _normalizeClass($setup.ns.e('panel-header'))
                            },
                            [
                              _createElementVNode(
                                'span',
                                {
                                  class: _normalizeClass($setup.ns.e('panel-title'))
                                },
                                _toDisplayString($setup.panelFilter.label),
                                3
                                /* TEXT, CLASS */
                              ),
                              _createElementVNode(
                                'button',
                                {
                                  class: _normalizeClass($setup.ns.e('panel-close')),
                                  'aria-label': $setup.t('filterbar.cancel'),
                                  onClick: $setup.closePanel
                                },
                                [
                                  ...(_cache[7] ||
                                    (_cache[7] = [
                                      _createElementVNode(
                                        'svg',
                                        {
                                          viewBox: '0 0 1024 1024',
                                          width: '14',
                                          height: '14',
                                          fill: 'currentColor'
                                        },
                                        [
                                          _createElementVNode('path', {
                                            d: 'M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9c-4.4 5.2-.7 13.1 6.1 13.1h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z'
                                          })
                                        ],
                                        -1
                                        /* CACHED */
                                      )
                                    ]))
                                ],
                                10,
                                _hoisted_7
                              )
                            ],
                            2
                            /* CLASS */
                          ),
                          _createCommentVNode(' \u5185\u5BB9 '),
                          _createElementVNode(
                            'div',
                            {
                              class: _normalizeClass($setup.ns.e('panel-content'))
                            },
                            [
                              _renderSlot(
                                _ctx.$slots,
                                'panel-content',
                                {
                                  filter: $setup.panelFilter,
                                  value: $setup.tempPanelValue,
                                  toggle: $setup.toggleOption
                                },
                                () => {
                                  var _a
                                  return [
                                    ((_a = $setup.panelFilter.options) == null ? void 0 : _a.length)
                                      ? (_openBlock(),
                                        _createElementBlock(
                                          'div',
                                          {
                                            key: 0,
                                            class: _normalizeClass($setup.ns.e('panel-options'))
                                          },
                                          [
                                            (_openBlock(true),
                                            _createElementBlock(
                                              _Fragment,
                                              null,
                                              _renderList($setup.panelFilter.options, (opt) => {
                                                return (
                                                  _openBlock(),
                                                  _createElementBlock(
                                                    'button',
                                                    {
                                                      key: String(opt.value),
                                                      class: _normalizeClass([
                                                        $setup.ns.e('panel-opt'),
                                                        $setup.ns.is(
                                                          'active',
                                                          $setup.isOptionSelected(
                                                            $setup.panelFilter,
                                                            opt
                                                          )
                                                        )
                                                      ]),
                                                      onClick: ($event) =>
                                                        $setup.toggleOption($setup.panelFilter, opt)
                                                    },
                                                    _toDisplayString(opt.label),
                                                    11,
                                                    _hoisted_8
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
                                      : (_openBlock(),
                                        _createElementBlock(
                                          'p',
                                          {
                                            key: 1,
                                            class: _normalizeClass($setup.ns.e('no-options'))
                                          },
                                          _toDisplayString($setup.t('filterbar.noOptions')),
                                          3
                                          /* TEXT, CLASS */
                                        ))
                                  ]
                                }
                              )
                            ],
                            2
                            /* CLASS */
                          ),
                          _createCommentVNode(' \u64CD\u4F5C\u533A '),
                          _createElementVNode(
                            'div',
                            {
                              class: _normalizeClass($setup.ns.e('panel-footer'))
                            },
                            [
                              _createElementVNode(
                                'button',
                                {
                                  class: _normalizeClass([
                                    $setup.ns.e('btn'),
                                    $setup.ns.e('btn-reset')
                                  ]),
                                  onClick: $setup.resetPanel
                                },
                                _toDisplayString($setup.t('filterbar.reset')),
                                3
                                /* TEXT, CLASS */
                              ),
                              _createElementVNode(
                                'button',
                                {
                                  class: _normalizeClass([
                                    $setup.ns.e('btn'),
                                    $setup.ns.e('btn-confirm')
                                  ]),
                                  onClick: $setup.confirmPanel
                                },
                                _toDisplayString($setup.t('filterbar.confirm')),
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
                      )
                    ],
                    10,
                    _hoisted_6
                  ))
                : _createCommentVNode('v-if', true)
            ]),
            _: 3
            /* FORWARDED */
          },
          8,
          ['name']
        )
      ],
      6
      /* CLASS, STYLE */
    )
  )
}
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { useComponentTheme } from '../../../theme/component-theme.js'
import { useLocale } from '../../../hooks/index.js'
import { filterBarProps, filterBarEmits } from './filter-bar'
const __sfc__ = /* @__PURE__ */ Object.assign(
  { name: 'YhFilterBar' },
  {
    __name: 'filter-bar',
    props: filterBarProps,
    emits: filterBarEmits,
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose()
      const props = __props
      const emit = __emit
      const ns = useNamespace('filter-bar')
      const { themeStyle } = useComponentTheme(
        'filter-bar',
        computed(() => props.themeOverrides)
      )
      const { t } = useLocale()
      const innerSort = ref(__spreadValues({}, props.sort))
      watch(
        () => props.sort,
        (v) => {
          innerSort.value = __spreadValues({}, v)
        },
        { deep: true }
      )
      function handleSortClick(key) {
        let order
        if (innerSort.value.key !== key) {
          order = 'desc'
        } else if (innerSort.value.order === 'desc') {
          order = 'asc'
        } else if (innerSort.value.order === 'asc') {
          order = null
        } else {
          order = 'desc'
        }
        const newSort = { key: order === null ? null : key, order }
        innerSort.value = newSort
        emit('update:sort', newSort)
        emit('sortChange', newSort)
      }
      const isPanelOpen = ref(false)
      const panelFilter = ref(null)
      const tempPanelValue = ref({})
      const innerFilterValue = ref(__spreadValues({}, props.filterValue))
      watch(
        () => props.filterValue,
        (v) => {
          innerFilterValue.value = __spreadValues({}, v)
        },
        { deep: true }
      )
      function openFilterPanel(item) {
        panelFilter.value = item
        tempPanelValue.value = __spreadValues({}, innerFilterValue.value)
        isPanelOpen.value = true
      }
      function closePanel() {
        isPanelOpen.value = false
        panelFilter.value = null
      }
      function confirmPanel() {
        innerFilterValue.value = __spreadValues({}, tempPanelValue.value)
        emit('update:filterValue', __spreadValues({}, innerFilterValue.value))
        emit('filterChange', __spreadValues({}, innerFilterValue.value))
        emit('confirm', __spreadValues({}, innerFilterValue.value))
        closePanel()
      }
      function resetPanel() {
        if (panelFilter.value) {
          const key = panelFilter.value.key
          tempPanelValue.value = __spreadProps(__spreadValues({}, tempPanelValue.value), {
            [key]: null
          })
          emit('resetPanel', panelFilter.value, tempPanelValue.value)
          confirmPanel()
        }
      }
      function resetAll() {
        innerFilterValue.value = {}
        innerSort.value = { key: null, order: null }
        emit('update:filterValue', {})
        emit('update:sort', { key: null, order: null })
        emit('reset')
      }
      function toggleOption(item, option) {
        const key = item.key
        const currentVal = tempPanelValue.value[key]
        if (item.type === 'checkbox') {
          const arr = Array.isArray(currentVal) ? [...currentVal] : []
          const idx = arr.indexOf(option.value)
          if (idx >= 0) arr.splice(idx, 1)
          else arr.push(option.value)
          tempPanelValue.value = __spreadProps(__spreadValues({}, tempPanelValue.value), {
            [key]: arr.length ? arr : null
          })
        } else {
          const newVal = currentVal === option.value ? null : option.value
          tempPanelValue.value = __spreadProps(__spreadValues({}, tempPanelValue.value), {
            [key]: newVal
          })
          if (!props.filterInPanel) {
            innerFilterValue.value = __spreadValues({}, tempPanelValue.value)
            emit('update:filterValue', __spreadValues({}, innerFilterValue.value))
            emit('filterChange', __spreadValues({}, innerFilterValue.value))
          }
        }
      }
      function isOptionSelected(item, option) {
        const val = props.filterInPanel
          ? tempPanelValue.value[item.key]
          : innerFilterValue.value[item.key]
        if (item.type === 'checkbox') {
          return Array.isArray(val) && val.includes(option.value)
        }
        return val === option.value
      }
      const activeFilterCount = computed(() => {
        return Object.values(innerFilterValue.value).filter((v) => {
          if (v === null || v === void 0) return false
          if (Array.isArray(v)) return v.length > 0
          return true
        }).length
      })
      const barRef = ref(null)
      const isStuck = ref(false)
      let observer = null
      onMounted(() => {
        if (!props.sticky || typeof IntersectionObserver === 'undefined') return
        observer = new IntersectionObserver(
          ([entry]) => {
            isStuck.value = !entry.isIntersecting
          },
          { rootMargin: `-${props.stickyOffset}px 0px 0px 0px`, threshold: 1 }
        )
        if (barRef.value) observer.observe(barRef.value)
      })
      onUnmounted(() => {
        observer == null ? void 0 : observer.disconnect()
      })
      function handleViewToggle() {
        const next = props.viewType === 'list' ? 'grid' : 'list'
        emit('update:viewType', next)
        emit('viewChange', next)
      }
      const __returned__ = {
        props,
        emit,
        ns,
        themeStyle,
        t,
        innerSort,
        handleSortClick,
        isPanelOpen,
        panelFilter,
        tempPanelValue,
        innerFilterValue,
        openFilterPanel,
        closePanel,
        confirmPanel,
        resetPanel,
        resetAll,
        toggleOption,
        isOptionSelected,
        activeFilterCount,
        barRef,
        isStuck,
        get observer() {
          return observer
        },
        set observer(v) {
          observer = v
        },
        handleViewToggle,
        ref,
        computed,
        watch,
        onMounted,
        onUnmounted,
        get useNamespace() {
          return useNamespace
        },
        get useComponentTheme() {
          return useComponentTheme
        },
        get useLocale() {
          return useLocale
        },
        get filterBarProps() {
          return filterBarProps
        },
        get filterBarEmits() {
          return filterBarEmits
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
