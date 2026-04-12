import {
  createCommentVNode as _createCommentVNode,
  renderSlot as _renderSlot,
  createElementVNode as _createElementVNode,
  normalizeClass as _normalizeClass,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  toDisplayString as _toDisplayString,
  vModelText as _vModelText,
  withDirectives as _withDirectives,
  renderList as _renderList,
  Fragment as _Fragment,
  createTextVNode as _createTextVNode,
  normalizeStyle as _normalizeStyle
} from 'vue'
const _hoisted_1 = ['placeholder', 'disabled']
const _hoisted_2 = ['onClick']
const _hoisted_3 = ['onClick']
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      'div',
      {
        class: _normalizeClass($setup.ns.b())
      },
      [
        _createCommentVNode(' \u5934\u90E8 '),
        _createElementVNode(
          'div',
          {
            class: _normalizeClass($setup.ns.e('header'))
          },
          [
            _renderSlot(_ctx.$slots, 'header', {}, () => [
              _createElementVNode(
                'div',
                {
                  class: _normalizeClass([
                    $setup.ns.e('check-all'),
                    {
                      'is-disabled': $props.disabled || $setup.checkableData.length === 0
                    }
                  ]),
                  onClick: $setup.handleCheckAll
                },
                [
                  _createElementVNode(
                    'span',
                    {
                      class: _normalizeClass([
                        $setup.ns.e('item-checkbox'),
                        {
                          'is-checked': $setup.isAllChecked,
                          'is-indeterminate': $setup.isIndeterminate
                        }
                      ])
                    },
                    [
                      _createCommentVNode(' \u9009\u4E2D\u56FE\u6807 '),
                      $setup.isAllChecked
                        ? (_openBlock(),
                          _createElementBlock(
                            'svg',
                            {
                              key: 0,
                              class: _normalizeClass($setup.ns.e('item-checkbox__icon')),
                              viewBox: '0 0 1024 1024'
                            },
                            [
                              ...(_cache[1] ||
                                (_cache[1] = [
                                  _createElementVNode(
                                    'path',
                                    {
                                      fill: 'currentColor',
                                      d: 'M406.4 726.4l-236.8-236.8 57.6-57.6 179.2 179.2 390.4-390.4 57.6 57.6z'
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
                        : _createCommentVNode('v-if', true),
                      _createCommentVNode(' \u534A\u9009\u56FE\u6807 '),
                      $setup.isIndeterminate && !$setup.isAllChecked
                        ? (_openBlock(),
                          _createElementBlock(
                            'svg',
                            {
                              key: 1,
                              class: _normalizeClass($setup.ns.e('item-checkbox__icon')),
                              viewBox: '0 0 1024 1024'
                            },
                            [
                              ...(_cache[2] ||
                                (_cache[2] = [
                                  _createElementVNode(
                                    'path',
                                    {
                                      fill: 'currentColor',
                                      d: 'M192 480h640v64H192z'
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
                'div',
                {
                  class: _normalizeClass($setup.ns.e('title'))
                },
                [
                  _createElementVNode(
                    'span',
                    null,
                    _toDisplayString($props.title),
                    1
                    /* TEXT */
                  ),
                  _createElementVNode(
                    'span',
                    {
                      class: _normalizeClass($setup.ns.e('count'))
                    },
                    _toDisplayString(
                      $setup.totalCheckedCount > 0
                        ? $setup.t('transfer.hasCheckedFormat', {
                            checked: $setup.totalCheckedCount,
                            total: $props.data.length
                          })
                        : $setup.t('transfer.noCheckedFormat', {
                            total: $props.data.length
                          })
                    ),
                    3
                    /* TEXT, CLASS */
                  )
                ],
                2
                /* CLASS */
              )
            ])
          ],
          2
          /* CLASS */
        ),
        _createCommentVNode(' \u641C\u7D22\u6846 '),
        $props.filterable
          ? (_openBlock(),
            _createElementBlock(
              'div',
              {
                key: 0,
                class: _normalizeClass($setup.ns.e('filter'))
              },
              [
                _withDirectives(
                  _createElementVNode(
                    'input',
                    {
                      'onUpdate:modelValue':
                        _cache[0] || (_cache[0] = ($event) => ($setup.query = $event)),
                      type: 'text',
                      class: _normalizeClass($setup.ns.e('filter-input')),
                      placeholder:
                        $props.filterPlaceholder || $setup.t('transfer.filterPlaceholder'),
                      disabled: $props.disabled
                    },
                    null,
                    10,
                    _hoisted_1
                  ),
                  [[_vModelText, $setup.query]]
                )
              ],
              2
              /* CLASS */
            ))
          : _createCommentVNode('v-if', true),
        _createCommentVNode(' \u5217\u8868\u533A\u57DF '),
        _createElementVNode(
          'div',
          {
            class: _normalizeClass($setup.ns.e('body'))
          },
          [
            _createCommentVNode(' \u7A7A\u72B6\u6001 '),
            $setup.filteredData.length === 0
              ? (_openBlock(),
                _createElementBlock(
                  'div',
                  {
                    key: 0,
                    class: _normalizeClass($setup.ns.e('empty'))
                  },
                  [
                    _renderSlot(_ctx.$slots, 'empty', {}, () => [
                      (_openBlock(),
                      _createElementBlock(
                        'svg',
                        {
                          class: _normalizeClass($setup.ns.e('empty-icon')),
                          viewBox: '0 0 1024 1024'
                        },
                        [
                          ...(_cache[3] ||
                            (_cache[3] = [
                              _createElementVNode(
                                'path',
                                {
                                  fill: 'currentColor',
                                  d: 'M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z'
                                },
                                null,
                                -1
                                /* CACHED */
                              ),
                              _createElementVNode(
                                'path',
                                {
                                  fill: 'currentColor',
                                  d: 'M464 336a48 48 0 1096 0 48 48 0 10-96 0zM464 512v176c0 8.8 7.2 16 16 16h64c8.8 0 16-7.2 16-16V512c0-8.8-7.2-16-16-16h-64c-8.8 0-16 7.2-16 16z'
                                },
                                null,
                                -1
                                /* CACHED */
                              )
                            ]))
                        ],
                        2
                        /* CLASS */
                      )),
                      _createElementVNode(
                        'span',
                        {
                          class: _normalizeClass($setup.ns.e('empty-text'))
                        },
                        _toDisplayString($props.emptyText || $setup.t('transfer.noData')),
                        3
                        /* TEXT, CLASS */
                      )
                    ])
                  ],
                  2
                  /* CLASS */
                ))
              : $props.virtual
                ? (_openBlock(),
                  _createElementBlock(
                    _Fragment,
                    { key: 1 },
                    [
                      _createCommentVNode(' \u865A\u62DF\u6EDA\u52A8\u5217\u8868 '),
                      _createElementVNode(
                        'div',
                        {
                          ref: 'virtualWrapperRef',
                          class: _normalizeClass($setup.ns.e('virtual-wrapper')),
                          style: _normalizeStyle({
                            height: $props.height + 'px'
                          }),
                          onScroll: $setup.handleVirtualScroll
                        },
                        [
                          _createElementVNode(
                            'div',
                            {
                              style: _normalizeStyle({
                                height: $setup.virtualConfig.totalHeight + 'px',
                                position: 'relative'
                              })
                            },
                            [
                              _createElementVNode(
                                'ul',
                                {
                                  class: _normalizeClass($setup.ns.e('list')),
                                  style: _normalizeStyle({
                                    transform: `translateY(${$setup.virtualConfig.offsetY}px)`
                                  })
                                },
                                [
                                  (_openBlock(true),
                                  _createElementBlock(
                                    _Fragment,
                                    null,
                                    _renderList($setup.displayItems, (item) => {
                                      return (
                                        _openBlock(),
                                        _createElementBlock(
                                          'li',
                                          {
                                            key: $setup.getKey(item),
                                            class: _normalizeClass([
                                              $setup.ns.e('item'),
                                              {
                                                'is-checked': $setup.isChecked($setup.getKey(item)),
                                                'is-disabled': $setup.isItemDisabled(item)
                                              }
                                            ]),
                                            style: _normalizeStyle({
                                              height: $props.itemHeight + 'px'
                                            }),
                                            onClick: ($event) => $setup.handleItemClick(item)
                                          },
                                          [
                                            _createElementVNode(
                                              'span',
                                              {
                                                class: _normalizeClass([
                                                  $setup.ns.e('item-checkbox'),
                                                  {
                                                    'is-checked': $setup.isChecked(
                                                      $setup.getKey(item)
                                                    )
                                                  }
                                                ])
                                              },
                                              [
                                                $setup.isChecked($setup.getKey(item))
                                                  ? (_openBlock(),
                                                    _createElementBlock(
                                                      'svg',
                                                      {
                                                        key: 0,
                                                        class: _normalizeClass(
                                                          $setup.ns.e('item-checkbox__icon')
                                                        ),
                                                        viewBox: '0 0 1024 1024'
                                                      },
                                                      [
                                                        ...(_cache[4] ||
                                                          (_cache[4] = [
                                                            _createElementVNode(
                                                              'path',
                                                              {
                                                                fill: 'currentColor',
                                                                d: 'M406.4 726.4l-236.8-236.8 57.6-57.6 179.2 179.2 390.4-390.4 57.6 57.6z'
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
                                                  : _createCommentVNode('v-if', true)
                                              ],
                                              2
                                              /* CLASS */
                                            ),
                                            _createElementVNode(
                                              'span',
                                              {
                                                class: _normalizeClass($setup.ns.e('item-label'))
                                              },
                                              [
                                                _renderSlot(
                                                  _ctx.$slots,
                                                  'default',
                                                  { option: item },
                                                  () => [
                                                    _createTextVNode(
                                                      _toDisplayString($setup.getLabel(item)),
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
                                          14,
                                          _hoisted_2
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
                            4
                            /* STYLE */
                          )
                        ],
                        38
                        /* CLASS, STYLE, NEED_HYDRATION */
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
                      _createCommentVNode(' \u666E\u901A\u5217\u8868 '),
                      _createElementVNode(
                        'ul',
                        {
                          class: _normalizeClass($setup.ns.e('list'))
                        },
                        [
                          (_openBlock(true),
                          _createElementBlock(
                            _Fragment,
                            null,
                            _renderList($setup.displayItems, (item) => {
                              return (
                                _openBlock(),
                                _createElementBlock(
                                  'li',
                                  {
                                    key: $setup.getKey(item),
                                    class: _normalizeClass([
                                      $setup.ns.e('item'),
                                      {
                                        'is-checked': $setup.isChecked($setup.getKey(item)),
                                        'is-disabled': $setup.isItemDisabled(item)
                                      }
                                    ]),
                                    onClick: ($event) => $setup.handleItemClick(item)
                                  },
                                  [
                                    _createElementVNode(
                                      'span',
                                      {
                                        class: _normalizeClass([
                                          $setup.ns.e('item-checkbox'),
                                          {
                                            'is-checked': $setup.isChecked($setup.getKey(item))
                                          }
                                        ])
                                      },
                                      [
                                        $setup.isChecked($setup.getKey(item))
                                          ? (_openBlock(),
                                            _createElementBlock(
                                              'svg',
                                              {
                                                key: 0,
                                                class: _normalizeClass(
                                                  $setup.ns.e('item-checkbox__icon')
                                                ),
                                                viewBox: '0 0 1024 1024'
                                              },
                                              [
                                                ...(_cache[5] ||
                                                  (_cache[5] = [
                                                    _createElementVNode(
                                                      'path',
                                                      {
                                                        fill: 'currentColor',
                                                        d: 'M406.4 726.4l-236.8-236.8 57.6-57.6 179.2 179.2 390.4-390.4 57.6 57.6z'
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
                                          : _createCommentVNode('v-if', true)
                                      ],
                                      2
                                      /* CLASS */
                                    ),
                                    _createElementVNode(
                                      'span',
                                      {
                                        class: _normalizeClass($setup.ns.e('item-label'))
                                      },
                                      [
                                        _renderSlot(
                                          _ctx.$slots,
                                          'default',
                                          { option: item },
                                          () => [
                                            _createTextVNode(
                                              _toDisplayString($setup.getLabel(item)),
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
                                  10,
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
                    ],
                    2112
                    /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                  ))
          ],
          2
          /* CLASS */
        ),
        _createCommentVNode(' \u5E95\u90E8\u63D2\u69FD '),
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
    )
  )
}
import { computed, ref, watch, provide } from 'vue'
import { useLocale } from '../../../hooks/index.js'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { transferPanelContextKey } from './transfer-meta.js'
const __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhTransferPanel'
  },
  {
    __name: 'transfer-panel',
    props: {
      data: { type: Array, required: true, default: () => [] },
      checked: { type: Array, required: true, default: () => [] },
      title: { type: String, required: false, default: '' },
      filterable: { type: Boolean, required: false, default: false },
      filterPlaceholder: { type: String, required: false },
      filterMethod: { type: Function, required: false },
      disabled: { type: Boolean, required: false, default: false },
      size: { type: null, required: false, default: 'default' },
      props: { type: Object, required: false },
      renderContent: { type: Function, required: false },
      virtual: { type: Boolean, required: false, default: false },
      itemHeight: { type: Number, required: false, default: 40 },
      height: { type: Number, required: false, default: 280 },
      showAllCheckbox: { type: Boolean, required: false, default: true },
      emptyText: { type: String, required: false }
    },
    emits: ['update:checked', 'checked-change'],
    setup(__props, { expose: __expose, emit: __emit }) {
      const props = __props
      const emit = __emit
      const ns = useNamespace('transfer-panel')
      const { t } = useLocale()
      const query = ref('')
      const scrollTop = ref(0)
      const virtualWrapperRef = ref()
      const keyProp = computed(() => {
        var _a
        return ((_a = props.props) == null ? void 0 : _a.key) || 'key'
      })
      const labelProp = computed(() => {
        var _a
        return ((_a = props.props) == null ? void 0 : _a.label) || 'label'
      })
      const disabledProp = computed(() => {
        var _a
        return ((_a = props.props) == null ? void 0 : _a.disabled) || 'disabled'
      })
      const getKey = (item) => {
        var _a
        return (_a = item[keyProp.value]) != null ? _a : ''
      }
      const getLabel = (item) => {
        return String(item[labelProp.value] || '')
      }
      const isItemDisabled = (item) => {
        var _a
        return Boolean(item[disabledProp.value]) || ((_a = props.disabled) != null ? _a : false)
      }
      const filteredData = computed(() => {
        if (!query.value) return props.data
        const q = query.value.toLowerCase()
        if (props.filterMethod) {
          return props.data.filter((item) => props.filterMethod(query.value, item))
        }
        return props.data.filter((item) => {
          const label = getLabel(item)
          return label.toLowerCase().includes(q)
        })
      })
      const checkableData = computed(() => {
        return filteredData.value.filter((item) => !isItemDisabled(item))
      })
      const checkedKeys = computed(() => props.checked)
      const isChecked = (key) => {
        return checkedKeys.value.includes(key)
      }
      const isAllChecked = computed(() => {
        if (checkableData.value.length === 0) return false
        return checkableData.value.every((item) => isChecked(getKey(item)))
      })
      const isIndeterminate = computed(() => {
        const checkedCount = checkableData.value.filter((item) => isChecked(getKey(item))).length
        return checkedCount > 0 && checkedCount < checkableData.value.length
      })
      const totalCheckedCount = computed(() => {
        return props.data.filter((item) => isChecked(getKey(item))).length
      })
      const virtualConfig = computed(() => {
        const itemHeight = props.itemHeight || 40
        const containerHeight = props.height || 280
        const overscan = 3
        const items = filteredData.value
        if (!props.virtual || items.length === 0) {
          return {
            visibleItems: items,
            totalHeight: items.length * itemHeight,
            offsetY: 0,
            startIndex: 0,
            endIndex: items.length
          }
        }
        const totalHeight = items.length * itemHeight
        const startIndex = Math.max(0, Math.floor(scrollTop.value / itemHeight) - overscan)
        const visibleCount = Math.ceil(containerHeight / itemHeight)
        const endIndex = Math.min(items.length, startIndex + visibleCount + overscan * 2)
        return {
          visibleItems: items.slice(startIndex, endIndex),
          totalHeight,
          offsetY: startIndex * itemHeight,
          startIndex,
          endIndex
        }
      })
      const displayItems = computed(() => {
        return props.virtual ? virtualConfig.value.visibleItems : filteredData.value
      })
      const handleVirtualScroll = (event) => {
        const target = event.target
        scrollTop.value = target.scrollTop
      }
      const handleCheck = (key, checked) => {
        if (props.disabled) return
        const newChecked = [...checkedKeys.value]
        const index = newChecked.indexOf(key)
        if (checked) {
          if (index === -1) {
            newChecked.push(key)
          }
        } else {
          if (index > -1) {
            newChecked.splice(index, 1)
          }
        }
        emit('update:checked', newChecked)
        emit('checked-change', newChecked, [key])
      }
      const handleItemClick = (item) => {
        if (isItemDisabled(item)) return
        const key = getKey(item)
        handleCheck(key, !isChecked(key))
      }
      const handleCheckAll = () => {
        if (props.disabled || checkableData.value.length === 0) return
        let newChecked
        if (isAllChecked.value) {
          const checkableKeys = new Set(checkableData.value.map((item) => getKey(item)))
          newChecked = checkedKeys.value.filter((key) => !checkableKeys.has(key))
        } else {
          const checkableKeys = checkableData.value.map((item) => getKey(item))
          newChecked = [.../* @__PURE__ */ new Set([...checkedKeys.value, ...checkableKeys])]
        }
        emit('update:checked', newChecked)
        emit('checked-change', newChecked)
      }
      const clearChecked = () => {
        emit('update:checked', [])
        emit('checked-change', [])
      }
      provide(transferPanelContextKey, {
        props,
        checked: checkedKeys.value,
        handleCheck
      })
      __expose({
        clearChecked,
        query: query.value
      })
      watch(query, () => {
        scrollTop.value = 0
        if (virtualWrapperRef.value) {
          virtualWrapperRef.value.scrollTop = 0
        }
      })
      const __returned__ = {
        props,
        emit,
        ns,
        t,
        query,
        scrollTop,
        virtualWrapperRef,
        keyProp,
        labelProp,
        disabledProp,
        getKey,
        getLabel,
        isItemDisabled,
        filteredData,
        checkableData,
        checkedKeys,
        isChecked,
        isAllChecked,
        isIndeterminate,
        totalCheckedCount,
        virtualConfig,
        displayItems,
        handleVirtualScroll,
        handleCheck,
        handleItemClick,
        handleCheckAll,
        clearChecked,
        computed,
        ref,
        watch,
        provide,
        get useNamespace() {
          return useNamespace
        },
        get useLocale() {
          return useLocale
        },
        get transferPanelContextKey() {
          return transferPanelContextKey
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
