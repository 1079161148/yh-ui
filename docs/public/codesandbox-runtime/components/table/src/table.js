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
  renderSlot as _renderSlot,
  normalizeClass as _normalizeClass,
  createElementVNode as _createElementVNode,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  normalizeStyle as _normalizeStyle,
  renderList as _renderList,
  Fragment as _Fragment,
  toDisplayString as _toDisplayString,
  resolveDynamicComponent as _resolveDynamicComponent,
  createBlock as _createBlock,
  createTextVNode as _createTextVNode,
  withModifiers as _withModifiers,
  mergeProps as _mergeProps,
  withCtx as _withCtx,
  createVNode as _createVNode
} from 'vue'
const _hoisted_1 = ['rowspan']
const _hoisted_2 = ['checked', 'indeterminate']
const _hoisted_3 = ['rowspan']
const _hoisted_4 = ['rowspan']
const _hoisted_5 = ['colspan', 'rowspan', 'onClick']
const _hoisted_6 = ['onPointerdown']
const _hoisted_7 = ['checked', 'indeterminate']
const _hoisted_8 = ['onClick']
const _hoisted_9 = ['onPointerdown']
const _hoisted_10 = ['src', 'alt']
const _hoisted_11 = ['onClick', 'onDblclick']
const _hoisted_12 = ['type', 'checked', 'disabled', 'onChange']
const _hoisted_13 = ['onClick']
const _hoisted_14 = ['colspan', 'rowspan', 'data-row-key', 'data-prop', 'onClick', 'onDblclick']
const _hoisted_15 = ['onClick']
const _hoisted_16 = ['colspan']
const _hoisted_17 = {
  key: 1,
  style: { display: 'none' },
  'aria-hidden': 'true'
}
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a, _b, _c, _d
  return (
    _openBlock(),
    _createElementBlock(
      'div',
      {
        ref: 'tableRef',
        class: _normalizeClass($setup.tableClasses),
        style: _normalizeStyle($setup.tableStyle)
      },
      [
        _createElementVNode(
          'div',
          {
            class: _normalizeClass($setup.innerWrapperClasses)
          },
          [
            _createCommentVNode(' \u5DE5\u5177\u680F '),
            $setup.showToolbar
              ? (_openBlock(),
                _createElementBlock(
                  'div',
                  {
                    key: 0,
                    class: _normalizeClass($setup.ns.e('toolbar'))
                  },
                  [
                    _renderSlot(_ctx.$slots, 'toolbar', {}, () => [
                      _createElementVNode(
                        'div',
                        {
                          class: _normalizeClass($setup.ns.e('toolbar-left'))
                        },
                        [
                          _renderSlot(_ctx.$slots, 'toolbar-left-prefix'),
                          _renderSlot(_ctx.$slots, 'toolbar-left'),
                          _renderSlot(_ctx.$slots, 'toolbar-left-suffix')
                        ],
                        2
                        /* CLASS */
                      ),
                      _createElementVNode(
                        'div',
                        {
                          class: _normalizeClass($setup.ns.e('toolbar-right'))
                        },
                        [
                          _renderSlot(_ctx.$slots, 'toolbar-right-prefix'),
                          _renderSlot(_ctx.$slots, 'toolbar-right'),
                          _renderSlot(_ctx.$slots, 'toolbar-right-suffix')
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
            _createCommentVNode(' \u8868\u5934 '),
            _ctx.showHeader
              ? (_openBlock(),
                _createElementBlock(
                  'div',
                  {
                    key: 1,
                    ref: 'headerRef',
                    class: _normalizeClass($setup.ns.e('header-wrapper'))
                  },
                  [
                    _createElementVNode(
                      'table',
                      {
                        class: _normalizeClass($setup.ns.e('header')),
                        style: _normalizeStyle({
                          tableLayout: _ctx.tableLayout
                        })
                      },
                      [
                        _createElementVNode('colgroup', null, [
                          $setup.selectionConfig
                            ? (_openBlock(),
                              _createElementBlock(
                                'col',
                                {
                                  key: 0,
                                  style: _normalizeStyle({
                                    width: $setup.formatSize(
                                      $setup.selectionConfig.columnWidth || 50
                                    )
                                  })
                                },
                                null,
                                4
                                /* STYLE */
                              ))
                            : _createCommentVNode('v-if', true),
                          _ctx.expandConfig
                            ? (_openBlock(),
                              _createElementBlock(
                                'col',
                                {
                                  key: 1,
                                  style: _normalizeStyle({
                                    width: $setup.formatSize(_ctx.expandConfig.columnWidth || 50)
                                  })
                                },
                                null,
                                4
                                /* STYLE */
                              ))
                            : _createCommentVNode('v-if', true),
                          _ctx.showIndex
                            ? (_openBlock(),
                              _createElementBlock(
                                'col',
                                {
                                  key: 2,
                                  style: _normalizeStyle({
                                    width: $setup.formatSize(
                                      ((_a = _ctx.indexConfig) == null ? void 0 : _a.width) || 50
                                    )
                                  })
                                },
                                null,
                                4
                                /* STYLE */
                              ))
                            : _createCommentVNode('v-if', true),
                          (_openBlock(true),
                          _createElementBlock(
                            _Fragment,
                            null,
                            _renderList($setup.visibleColumns, (column) => {
                              return (
                                _openBlock(),
                                _createElementBlock(
                                  'col',
                                  {
                                    key: column.prop || column.key,
                                    style: _normalizeStyle({
                                      width: $setup.formatSize(column.width)
                                    })
                                  },
                                  null,
                                  4
                                  /* STYLE */
                                )
                              )
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ]),
                        _createElementVNode('thead', null, [
                          _createCommentVNode(' \u591A\u7EA7\u8868\u5934 '),
                          $setup.headerRows.length > 0
                            ? (_openBlock(true),
                              _createElementBlock(
                                _Fragment,
                                { key: 0 },
                                _renderList($setup.headerRows, (hRow, rowIdx) => {
                                  var _a2, _b2
                                  return (
                                    _openBlock(),
                                    _createElementBlock(
                                      'tr',
                                      {
                                        key: rowIdx,
                                        class: _normalizeClass($setup.ns.e('header-row'))
                                      },
                                      [
                                        _createCommentVNode(
                                          ' \u9009\u62E9\u5217\uFF08\u4EC5\u7B2C\u4E00\u884C\uFF0C\u8DE8\u6240\u6709\u884C\uFF09 '
                                        ),
                                        $setup.selectionConfig && rowIdx === 0
                                          ? (_openBlock(),
                                            _createElementBlock(
                                              'th',
                                              {
                                                key: 0,
                                                rowspan: $setup.columnDepth,
                                                class: _normalizeClass([
                                                  $setup.ns.e('header-cell'),
                                                  $setup.isAnyColumnFixedLeft ? 'is-fixed-left' : ''
                                                ]),
                                                style: _normalizeStyle(
                                                  __spreadValues(
                                                    {
                                                      width: $setup.formatSize(
                                                        $setup.selectionConfig.columnWidth || 50
                                                      )
                                                    },
                                                    $setup.getSpecialFixedStyle('selection')
                                                  )
                                                )
                                              },
                                              [
                                                _createElementVNode(
                                                  'div',
                                                  {
                                                    class: _normalizeClass(
                                                      $setup.ns.e('selection-cell')
                                                    )
                                                  },
                                                  [
                                                    $setup.selectionType === 'checkbox' &&
                                                    $setup.selectionConfig.showSelectAll !== false
                                                      ? (_openBlock(),
                                                        _createElementBlock(
                                                          'input',
                                                          {
                                                            key: 0,
                                                            type: 'checkbox',
                                                            checked: $setup.isAllSelected,
                                                            indeterminate: $setup.isIndeterminate,
                                                            onChange:
                                                              _cache[0] ||
                                                              (_cache[0] = (...args) =>
                                                                $setup.toggleAllSelection &&
                                                                $setup.toggleAllSelection(...args))
                                                          },
                                                          null,
                                                          40,
                                                          _hoisted_2
                                                        ))
                                                      : _createCommentVNode('v-if', true)
                                                  ],
                                                  2
                                                  /* CLASS */
                                                )
                                              ],
                                              14,
                                              _hoisted_1
                                            ))
                                          : _createCommentVNode('v-if', true),
                                        _createCommentVNode(
                                          ' \u5C55\u5F00\u5217\uFF08\u4EC5\u7B2C\u4E00\u884C\uFF0C\u8DE8\u6240\u6709\u884C\uFF09 '
                                        ),
                                        _ctx.expandConfig && rowIdx === 0
                                          ? (_openBlock(),
                                            _createElementBlock(
                                              'th',
                                              {
                                                key: 1,
                                                rowspan: $setup.columnDepth,
                                                class: _normalizeClass([
                                                  $setup.ns.e('header-cell'),
                                                  $setup.isAnyColumnFixedLeft ? 'is-fixed-left' : ''
                                                ]),
                                                style: _normalizeStyle(
                                                  __spreadValues(
                                                    {
                                                      width: $setup.formatSize(
                                                        _ctx.expandConfig.columnWidth || 50
                                                      )
                                                    },
                                                    $setup.getSpecialFixedStyle('expand')
                                                  )
                                                )
                                              },
                                              [
                                                _createElementVNode(
                                                  'div',
                                                  {
                                                    class: _normalizeClass(
                                                      $setup.ns.e('expand-cell')
                                                    )
                                                  },
                                                  null,
                                                  2
                                                  /* CLASS */
                                                )
                                              ],
                                              14,
                                              _hoisted_3
                                            ))
                                          : _createCommentVNode('v-if', true),
                                        _createCommentVNode(
                                          ' \u5E8F\u53F7\u5217\uFF08\u4EC5\u7B2C\u4E00\u884C\uFF0C\u8DE8\u6240\u6709\u884C\uFF09 '
                                        ),
                                        _ctx.showIndex && rowIdx === 0
                                          ? (_openBlock(),
                                            _createElementBlock(
                                              'th',
                                              {
                                                key: 2,
                                                rowspan: $setup.columnDepth,
                                                class: _normalizeClass([
                                                  $setup.ns.e('header-cell'),
                                                  $setup.isAnyColumnFixedLeft ? 'is-fixed-left' : ''
                                                ]),
                                                style: _normalizeStyle(
                                                  __spreadValues(
                                                    {
                                                      width: $setup.formatSize(
                                                        ((_a2 = _ctx.indexConfig) == null
                                                          ? void 0
                                                          : _a2.width) || 50
                                                      )
                                                    },
                                                    $setup.getSpecialFixedStyle('index')
                                                  )
                                                )
                                              },
                                              [
                                                _createElementVNode(
                                                  'div',
                                                  {
                                                    class: _normalizeClass(
                                                      $setup.ns.e('index-cell')
                                                    )
                                                  },
                                                  _toDisplayString(
                                                    ((_b2 = _ctx.indexConfig) == null
                                                      ? void 0
                                                      : _b2.label) || $setup.t('table.index')
                                                  ),
                                                  3
                                                  /* TEXT, CLASS */
                                                )
                                              ],
                                              14,
                                              _hoisted_4
                                            ))
                                          : _createCommentVNode('v-if', true),
                                        _createCommentVNode(' \u6570\u636E\u5217 '),
                                        (_openBlock(true),
                                        _createElementBlock(
                                          _Fragment,
                                          null,
                                          _renderList(hRow, (cell, cellIdx) => {
                                            var _a3, _b3, _c2
                                            return (
                                              _openBlock(),
                                              _createElementBlock(
                                                'th',
                                                {
                                                  key:
                                                    cell.column.prop || cell.column.key || cellIdx,
                                                  colspan: cell.colspan > 1 ? cell.colspan : void 0,
                                                  rowspan: cell.rowspan > 1 ? cell.rowspan : void 0,
                                                  class: _normalizeClass([
                                                    $setup.ns.e('header-cell'),
                                                    cell.column.headerClassName,
                                                    cell.column.headerAlign
                                                      ? `is-${cell.column.headerAlign}`
                                                      : '',
                                                    cell.column.sortable ? 'is-sortable' : '',
                                                    cell.column.fixed
                                                      ? `is-fixed-${cell.column.fixed === true ? 'left' : cell.column.fixed}`
                                                      : '',
                                                    (
                                                      (_a3 = cell.column.children) == null
                                                        ? void 0
                                                        : _a3.length
                                                    )
                                                      ? 'is-group'
                                                      : '',
                                                    $setup.isColumnDraggable(cell.column)
                                                      ? 'is-column-draggable'
                                                      : ''
                                                  ]),
                                                  style: _normalizeStyle(
                                                    __spreadProps(
                                                      __spreadValues({}, cell.column.headerStyle),
                                                      {
                                                        textAlign:
                                                          cell.column.headerAlign ||
                                                          cell.column.align ||
                                                          ((
                                                            (_b3 = cell.column.children) == null
                                                              ? void 0
                                                              : _b3.length
                                                          )
                                                            ? 'center'
                                                            : 'left')
                                                      }
                                                    )
                                                  ),
                                                  onClick: ($event) =>
                                                    $setup.handleHeaderClick(cell.column, $event)
                                                },
                                                [
                                                  _createElementVNode(
                                                    'div',
                                                    {
                                                      class: _normalizeClass(
                                                        $setup.ns.e('cell-content')
                                                      )
                                                    },
                                                    [
                                                      _createCommentVNode(
                                                        ' \u8868\u5934\u524D\u7F00\u56FE\u6807 '
                                                      ),
                                                      cell.column.headerPrefixIcon &&
                                                      typeof cell.column.headerPrefixIcon !==
                                                        'string'
                                                        ? (_openBlock(),
                                                          _createBlock(
                                                            _resolveDynamicComponent(
                                                              cell.column.headerPrefixIcon
                                                            ),
                                                            {
                                                              key: 0,
                                                              class: _normalizeClass(
                                                                $setup.ns.e('header-icon-prefix')
                                                              )
                                                            },
                                                            null,
                                                            8,
                                                            ['class']
                                                          ))
                                                        : cell.column.headerPrefixIcon
                                                          ? (_openBlock(),
                                                            _createElementBlock(
                                                              'span',
                                                              {
                                                                key: 1,
                                                                class: _normalizeClass(
                                                                  $setup.ns.e('header-icon-prefix')
                                                                )
                                                              },
                                                              _toDisplayString(
                                                                cell.column.headerPrefixIcon
                                                              ),
                                                              3
                                                              /* TEXT, CLASS */
                                                            ))
                                                          : _createCommentVNode('v-if', true),
                                                      cell.column.prop &&
                                                      _ctx.$slots['header-' + cell.column.prop]
                                                        ? _renderSlot(
                                                            _ctx.$slots,
                                                            'header-' + cell.column.prop,
                                                            {
                                                              key: 2,
                                                              column: cell.column,
                                                              columnIndex: cellIdx
                                                            }
                                                          )
                                                        : cell.column.headerRender
                                                          ? (_openBlock(),
                                                            _createBlock(
                                                              $setup['RenderColumn'],
                                                              {
                                                                key: 3,
                                                                render: cell.column.headerRender,
                                                                params: {
                                                                  column: cell.column,
                                                                  columnIndex: cellIdx
                                                                }
                                                              },
                                                              null,
                                                              8,
                                                              ['render', 'params']
                                                            ))
                                                          : (_openBlock(),
                                                            _createElementBlock(
                                                              _Fragment,
                                                              { key: 4 },
                                                              [
                                                                _createTextVNode(
                                                                  _toDisplayString(
                                                                    cell.column.label
                                                                  ),
                                                                  1
                                                                  /* TEXT */
                                                                )
                                                              ],
                                                              64
                                                              /* STABLE_FRAGMENT */
                                                            )),
                                                      _createCommentVNode(
                                                        ' \u8868\u5934\u540E\u7F00\u56FE\u6807 '
                                                      ),
                                                      cell.column.headerSuffixIcon &&
                                                      typeof cell.column.headerSuffixIcon !==
                                                        'string'
                                                        ? (_openBlock(),
                                                          _createBlock(
                                                            _resolveDynamicComponent(
                                                              cell.column.headerSuffixIcon
                                                            ),
                                                            {
                                                              key: 5,
                                                              class: _normalizeClass(
                                                                $setup.ns.e('header-icon-suffix')
                                                              )
                                                            },
                                                            null,
                                                            8,
                                                            ['class']
                                                          ))
                                                        : cell.column.headerSuffixIcon
                                                          ? (_openBlock(),
                                                            _createElementBlock(
                                                              'span',
                                                              {
                                                                key: 6,
                                                                class: _normalizeClass(
                                                                  $setup.ns.e('header-icon-suffix')
                                                                )
                                                              },
                                                              _toDisplayString(
                                                                cell.column.headerSuffixIcon
                                                              ),
                                                              3
                                                              /* TEXT, CLASS */
                                                            ))
                                                          : _createCommentVNode('v-if', true),
                                                      cell.column.sortable
                                                        ? (_openBlock(),
                                                          _createElementBlock(
                                                            'span',
                                                            {
                                                              key: 7,
                                                              class: _normalizeClass(
                                                                $setup.ns.e('sort-icon')
                                                              )
                                                            },
                                                            [
                                                              _createElementVNode(
                                                                'span',
                                                                {
                                                                  class: _normalizeClass([
                                                                    'sort-caret',
                                                                    'ascending',
                                                                    $setup.getSortOrder(
                                                                      cell.column
                                                                    ) === 'asc'
                                                                      ? 'is-active'
                                                                      : ''
                                                                  ])
                                                                },
                                                                null,
                                                                2
                                                                /* CLASS */
                                                              ),
                                                              _createElementVNode(
                                                                'span',
                                                                {
                                                                  class: _normalizeClass([
                                                                    'sort-caret',
                                                                    'descending',
                                                                    $setup.getSortOrder(
                                                                      cell.column
                                                                    ) === 'desc'
                                                                      ? 'is-active'
                                                                      : ''
                                                                  ])
                                                                },
                                                                null,
                                                                2
                                                                /* CLASS */
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
                                                  _createCommentVNode(
                                                    ' \u5217\u5BBD\u8C03\u6574\u624B\u67C4\uFF08\u4EC5\u53F6\u5B50\u5217\uFF09 '
                                                  ),
                                                  !((_c2 = cell.column.children) == null
                                                    ? void 0
                                                    : _c2.length) &&
                                                  $setup.isColumnResizable(cell.column)
                                                    ? (_openBlock(),
                                                      _createElementBlock(
                                                        'span',
                                                        {
                                                          key: 0,
                                                          class: _normalizeClass(
                                                            $setup.ns.e('resize-handle')
                                                          ),
                                                          onPointerdown: _withModifiers(
                                                            ($event) =>
                                                              $setup.handleResizeStart(
                                                                $event,
                                                                cell.column,
                                                                $event.currentTarget.parentElement
                                                              ),
                                                            ['stop']
                                                          )
                                                        },
                                                        null,
                                                        42,
                                                        _hoisted_6
                                                      ))
                                                    : _createCommentVNode('v-if', true)
                                                ],
                                                14,
                                                _hoisted_5
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
                            : (_openBlock(),
                              _createElementBlock(
                                _Fragment,
                                { key: 1 },
                                [
                                  _createCommentVNode(
                                    ' \u5355\u5C42\u8868\u5934\uFF08\u539F\u6709\u903B\u8F91\uFF09 '
                                  ),
                                  _createElementVNode(
                                    'tr',
                                    {
                                      class: _normalizeClass($setup.ns.e('header-row'))
                                    },
                                    [
                                      _createCommentVNode(' \u9009\u62E9\u5217 '),
                                      $setup.selectionConfig
                                        ? (_openBlock(),
                                          _createElementBlock(
                                            'th',
                                            {
                                              key: 0,
                                              class: _normalizeClass([
                                                $setup.ns.e('header-cell'),
                                                $setup.isAnyColumnFixedLeft ? 'is-fixed-left' : ''
                                              ]),
                                              style: _normalizeStyle(
                                                __spreadValues(
                                                  {
                                                    width: $setup.formatSize(
                                                      $setup.selectionConfig.columnWidth || 50
                                                    )
                                                  },
                                                  $setup.getSpecialFixedStyle('selection')
                                                )
                                              )
                                            },
                                            [
                                              _createElementVNode(
                                                'div',
                                                {
                                                  class: _normalizeClass(
                                                    $setup.ns.e('selection-cell')
                                                  )
                                                },
                                                [
                                                  $setup.selectionType === 'checkbox' &&
                                                  $setup.selectionConfig.showSelectAll !== false
                                                    ? (_openBlock(),
                                                      _createElementBlock(
                                                        'input',
                                                        {
                                                          key: 0,
                                                          type: 'checkbox',
                                                          checked: $setup.isAllSelected,
                                                          indeterminate: $setup.isIndeterminate,
                                                          onChange:
                                                            _cache[1] ||
                                                            (_cache[1] = (...args) =>
                                                              $setup.toggleAllSelection &&
                                                              $setup.toggleAllSelection(...args))
                                                        },
                                                        null,
                                                        40,
                                                        _hoisted_7
                                                      ))
                                                    : _createCommentVNode('v-if', true)
                                                ],
                                                2
                                                /* CLASS */
                                              )
                                            ],
                                            6
                                            /* CLASS, STYLE */
                                          ))
                                        : _createCommentVNode('v-if', true),
                                      _createCommentVNode(' \u5C55\u5F00\u5217 '),
                                      _ctx.expandConfig
                                        ? (_openBlock(),
                                          _createElementBlock(
                                            'th',
                                            {
                                              key: 1,
                                              class: _normalizeClass([
                                                $setup.ns.e('header-cell'),
                                                $setup.isAnyColumnFixedLeft ? 'is-fixed-left' : ''
                                              ]),
                                              style: _normalizeStyle(
                                                __spreadValues(
                                                  {
                                                    width: $setup.formatSize(
                                                      _ctx.expandConfig.columnWidth || 50
                                                    )
                                                  },
                                                  $setup.getSpecialFixedStyle('expand')
                                                )
                                              )
                                            },
                                            [
                                              _createElementVNode(
                                                'div',
                                                {
                                                  class: _normalizeClass($setup.ns.e('expand-cell'))
                                                },
                                                null,
                                                2
                                                /* CLASS */
                                              )
                                            ],
                                            6
                                            /* CLASS, STYLE */
                                          ))
                                        : _createCommentVNode('v-if', true),
                                      _createCommentVNode(' \u5E8F\u53F7\u5217 '),
                                      _ctx.showIndex
                                        ? (_openBlock(),
                                          _createElementBlock(
                                            'th',
                                            {
                                              key: 2,
                                              class: _normalizeClass([
                                                $setup.ns.e('header-cell'),
                                                $setup.isAnyColumnFixedLeft ? 'is-fixed-left' : ''
                                              ]),
                                              style: _normalizeStyle(
                                                __spreadValues(
                                                  {
                                                    width: $setup.formatSize(
                                                      ((_b = _ctx.indexConfig) == null
                                                        ? void 0
                                                        : _b.width) || 50
                                                    )
                                                  },
                                                  $setup.getSpecialFixedStyle('index')
                                                )
                                              )
                                            },
                                            [
                                              _createElementVNode(
                                                'div',
                                                {
                                                  class: _normalizeClass($setup.ns.e('index-cell'))
                                                },
                                                _toDisplayString(
                                                  ((_c = _ctx.indexConfig) == null
                                                    ? void 0
                                                    : _c.label) || $setup.t('table.index')
                                                ),
                                                3
                                                /* TEXT, CLASS */
                                              )
                                            ],
                                            6
                                            /* CLASS, STYLE */
                                          ))
                                        : _createCommentVNode('v-if', true),
                                      _createCommentVNode(' \u6570\u636E\u5217 '),
                                      (_openBlock(true),
                                      _createElementBlock(
                                        _Fragment,
                                        null,
                                        _renderList(
                                          $setup.visibleColumns,
                                          (column, columnIndex) => {
                                            return (
                                              _openBlock(),
                                              _createElementBlock(
                                                'th',
                                                _mergeProps(
                                                  {
                                                    key: column.prop || column.key || columnIndex,
                                                    class: [
                                                      $setup.ns.e('header-cell'),
                                                      column.headerClassName,
                                                      column.headerAlign
                                                        ? `is-${column.headerAlign}`
                                                        : '',
                                                      column.sortable ? 'is-sortable' : '',
                                                      column.fixed
                                                        ? `is-fixed-${column.fixed === true ? 'left' : column.fixed}`
                                                        : '',
                                                      $setup.isColumnDragEnabled
                                                        ? $setup.getHeaderDragClass(columnIndex)
                                                        : '',
                                                      $setup.isColumnDraggable(column)
                                                        ? 'is-column-draggable'
                                                        : ''
                                                    ],
                                                    style: __spreadProps(
                                                      __spreadValues(
                                                        __spreadValues({}, column.headerStyle),
                                                        $setup.getFixedStyle(column, columnIndex)
                                                      ),
                                                      {
                                                        width: $setup.formatSize(column.width),
                                                        textAlign:
                                                          column.headerAlign ||
                                                          column.align ||
                                                          'left'
                                                      }
                                                    )
                                                  },
                                                  { ref_for: true },
                                                  $setup.getHeaderDragAttrs(column, columnIndex),
                                                  {
                                                    onClick: ($event) =>
                                                      $setup.handleHeaderClick(column, $event)
                                                  }
                                                ),
                                                [
                                                  _createElementVNode(
                                                    'div',
                                                    {
                                                      class: _normalizeClass(
                                                        $setup.ns.e('cell-content')
                                                      )
                                                    },
                                                    [
                                                      _createCommentVNode(
                                                        ' \u8868\u5934\u524D\u7F00\u56FE\u6807 '
                                                      ),
                                                      column.headerPrefixIcon &&
                                                      typeof column.headerPrefixIcon !== 'string'
                                                        ? (_openBlock(),
                                                          _createBlock(
                                                            _resolveDynamicComponent(
                                                              column.headerPrefixIcon
                                                            ),
                                                            {
                                                              key: 0,
                                                              class: _normalizeClass(
                                                                $setup.ns.e('header-icon-prefix')
                                                              )
                                                            },
                                                            null,
                                                            8,
                                                            ['class']
                                                          ))
                                                        : column.headerPrefixIcon
                                                          ? (_openBlock(),
                                                            _createElementBlock(
                                                              'span',
                                                              {
                                                                key: 1,
                                                                class: _normalizeClass(
                                                                  $setup.ns.e('header-icon-prefix')
                                                                )
                                                              },
                                                              _toDisplayString(
                                                                column.headerPrefixIcon
                                                              ),
                                                              3
                                                              /* TEXT, CLASS */
                                                            ))
                                                          : _createCommentVNode('v-if', true),
                                                      _createCommentVNode(
                                                        ' \u81EA\u5B9A\u4E49\u8868\u5934 '
                                                      ),
                                                      column.prop &&
                                                      _ctx.$slots['header-' + column.prop]
                                                        ? _renderSlot(
                                                            _ctx.$slots,
                                                            'header-' + column.prop,
                                                            {
                                                              key: 2,
                                                              column,
                                                              columnIndex
                                                            }
                                                          )
                                                        : column.headerRender
                                                          ? (_openBlock(),
                                                            _createBlock(
                                                              $setup['RenderColumn'],
                                                              {
                                                                key: 3,
                                                                render: column.headerRender,
                                                                params: {
                                                                  column,
                                                                  columnIndex
                                                                }
                                                              },
                                                              null,
                                                              8,
                                                              ['render', 'params']
                                                            ))
                                                          : (_openBlock(),
                                                            _createElementBlock(
                                                              _Fragment,
                                                              { key: 4 },
                                                              [
                                                                _createTextVNode(
                                                                  _toDisplayString(column.label),
                                                                  1
                                                                  /* TEXT */
                                                                )
                                                              ],
                                                              64
                                                              /* STABLE_FRAGMENT */
                                                            )),
                                                      _createCommentVNode(
                                                        ' \u8868\u5934\u540E\u7F00\u56FE\u6807 '
                                                      ),
                                                      column.headerSuffixIcon &&
                                                      typeof column.headerSuffixIcon !== 'string'
                                                        ? (_openBlock(),
                                                          _createBlock(
                                                            _resolveDynamicComponent(
                                                              column.headerSuffixIcon
                                                            ),
                                                            {
                                                              key: 5,
                                                              class: _normalizeClass(
                                                                $setup.ns.e('header-icon-suffix')
                                                              )
                                                            },
                                                            null,
                                                            8,
                                                            ['class']
                                                          ))
                                                        : column.headerSuffixIcon
                                                          ? (_openBlock(),
                                                            _createElementBlock(
                                                              'span',
                                                              {
                                                                key: 6,
                                                                class: _normalizeClass(
                                                                  $setup.ns.e('header-icon-suffix')
                                                                )
                                                              },
                                                              _toDisplayString(
                                                                column.headerSuffixIcon
                                                              ),
                                                              3
                                                              /* TEXT, CLASS */
                                                            ))
                                                          : _createCommentVNode('v-if', true),
                                                      _createCommentVNode(
                                                        ' \u6392\u5E8F\u56FE\u6807 '
                                                      ),
                                                      column.sortable
                                                        ? (_openBlock(),
                                                          _createElementBlock(
                                                            'span',
                                                            {
                                                              key: 7,
                                                              class: _normalizeClass(
                                                                $setup.ns.e('sort-icon')
                                                              )
                                                            },
                                                            [
                                                              _createElementVNode(
                                                                'span',
                                                                {
                                                                  class: _normalizeClass([
                                                                    'sort-caret',
                                                                    'ascending',
                                                                    $setup.getSortOrder(column) ===
                                                                    'asc'
                                                                      ? 'is-active'
                                                                      : ''
                                                                  ])
                                                                },
                                                                null,
                                                                2
                                                                /* CLASS */
                                                              ),
                                                              _createElementVNode(
                                                                'span',
                                                                {
                                                                  class: _normalizeClass([
                                                                    'sort-caret',
                                                                    'descending',
                                                                    $setup.getSortOrder(column) ===
                                                                    'desc'
                                                                      ? 'is-active'
                                                                      : ''
                                                                  ])
                                                                },
                                                                null,
                                                                2
                                                                /* CLASS */
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
                                                  _createCommentVNode(
                                                    ' \u5217\u5BBD\u8C03\u6574\u624B\u67C4 '
                                                  ),
                                                  $setup.isColumnResizable(column)
                                                    ? (_openBlock(),
                                                      _createElementBlock(
                                                        'span',
                                                        {
                                                          key: 0,
                                                          class: _normalizeClass(
                                                            $setup.ns.e('resize-handle')
                                                          ),
                                                          onPointerdown: _withModifiers(
                                                            ($event) =>
                                                              $setup.handleResizeStart(
                                                                $event,
                                                                column,
                                                                $event.currentTarget.parentElement
                                                              ),
                                                            ['stop']
                                                          )
                                                        },
                                                        null,
                                                        42,
                                                        _hoisted_9
                                                      ))
                                                    : _createCommentVNode('v-if', true)
                                                ],
                                                16,
                                                _hoisted_8
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
                                  )
                                ],
                                2112
                                /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                              ))
                        ])
                      ],
                      6
                      /* CLASS, STYLE */
                    )
                  ],
                  2
                  /* CLASS */
                ))
              : _createCommentVNode('v-if', true),
            _createCommentVNode(' \u8868\u4F53 '),
            _createElementVNode(
              'div',
              {
                ref: 'bodyRef',
                class: _normalizeClass([
                  $setup.ns.e('body-wrapper'),
                  $setup.isVirtual ? $setup.ns.em('body-wrapper', 'virtual') : ''
                ]),
                style: _normalizeStyle($setup.bodyStyle),
                onScroll:
                  _cache[3] ||
                  (_cache[3] = (...args) => $setup.handleScroll && $setup.handleScroll(...args))
              },
              [
                _createCommentVNode(
                  ' \u865A\u62DF\u6EDA\u52A8\uFF1A\u5355\u4E00 phantom div \u6491\u8D77\u6EDA\u52A8\u6761\u9AD8\u5EA6 '
                ),
                $setup.isVirtual
                  ? (_openBlock(),
                    _createElementBlock(
                      'div',
                      {
                        key: 0,
                        class: _normalizeClass($setup.ns.e('virtual-phantom')),
                        style: _normalizeStyle({
                          height: `${$setup.totalHeight}px`
                        })
                      },
                      null,
                      6
                      /* CLASS, STYLE */
                    ))
                  : _createCommentVNode('v-if', true),
                _createCommentVNode(' \u7A7A\u6570\u636E '),
                $setup.tableData.length === 0
                  ? (_openBlock(),
                    _createElementBlock(
                      'div',
                      {
                        key: 1,
                        class: _normalizeClass($setup.ns.e('empty'))
                      },
                      [
                        _renderSlot(_ctx.$slots, 'empty', {}, () => {
                          var _a2, _b2, _c2
                          return [
                            _createElementVNode(
                              'div',
                              {
                                class: _normalizeClass($setup.ns.e('empty-content'))
                              },
                              [
                                ((_a2 = _ctx.emptyConfig) == null ? void 0 : _a2.render)
                                  ? (_openBlock(),
                                    _createBlock(
                                      _resolveDynamicComponent(_ctx.emptyConfig.render()),
                                      { key: 0 }
                                    ))
                                  : (_openBlock(),
                                    _createElementBlock(
                                      _Fragment,
                                      { key: 1 },
                                      [
                                        ((_b2 = _ctx.emptyConfig) == null ? void 0 : _b2.image)
                                          ? (_openBlock(),
                                            _createElementBlock(
                                              'div',
                                              {
                                                key: 0,
                                                class: _normalizeClass($setup.ns.e('empty-image'))
                                              },
                                              [
                                                _createElementVNode(
                                                  'img',
                                                  {
                                                    src: _ctx.emptyConfig.image,
                                                    alt: $setup.t('common.noData')
                                                  },
                                                  null,
                                                  8,
                                                  _hoisted_10
                                                )
                                              ],
                                              2
                                              /* CLASS */
                                            ))
                                          : _createCommentVNode('v-if', true),
                                        _createElementVNode(
                                          'div',
                                          {
                                            class: _normalizeClass($setup.ns.e('empty-text'))
                                          },
                                          _toDisplayString(
                                            ((_c2 = _ctx.emptyConfig) == null
                                              ? void 0
                                              : _c2.description) ||
                                              _ctx.emptyText ||
                                              $setup.t('table.emptyText')
                                          ),
                                          3
                                          /* TEXT, CLASS */
                                        )
                                      ],
                                      64
                                      /* STABLE_FRAGMENT */
                                    ))
                              ],
                              2
                              /* CLASS */
                            )
                          ]
                        })
                      ],
                      2
                      /* CLASS */
                    ))
                  : (_openBlock(),
                    _createElementBlock(
                      _Fragment,
                      { key: 2 },
                      [
                        _createCommentVNode(
                          ' \u6570\u636E\u8868\u683C\uFF08\u865A\u62DF\u6A21\u5F0F\u4E0B\u901A\u8FC7 transform \u5B9A\u4F4D\uFF0CGPU \u52A0\u901F\u65E0\u91CD\u6392\uFF09 '
                        ),
                        _createElementVNode(
                          'table',
                          {
                            class: _normalizeClass([
                              $setup.ns.e('body'),
                              $setup.isVirtual ? $setup.ns.em('body', 'virtual') : ''
                            ]),
                            style: _normalizeStyle(
                              __spreadValues(
                                {
                                  tableLayout: _ctx.tableLayout
                                },
                                $setup.isVirtual
                                  ? {
                                      transform: `translate3d(0, ${$setup.offsetTop}px, 0)`
                                    }
                                  : {}
                              )
                            )
                          },
                          [
                            _createElementVNode('colgroup', null, [
                              $setup.selectionConfig
                                ? (_openBlock(),
                                  _createElementBlock(
                                    'col',
                                    {
                                      key: 0,
                                      style: _normalizeStyle({
                                        width: $setup.formatSize(
                                          $setup.selectionConfig.columnWidth || 50
                                        )
                                      })
                                    },
                                    null,
                                    4
                                    /* STYLE */
                                  ))
                                : _createCommentVNode('v-if', true),
                              _ctx.expandConfig
                                ? (_openBlock(),
                                  _createElementBlock(
                                    'col',
                                    {
                                      key: 1,
                                      style: _normalizeStyle({
                                        width: $setup.formatSize(
                                          _ctx.expandConfig.columnWidth || 50
                                        )
                                      })
                                    },
                                    null,
                                    4
                                    /* STYLE */
                                  ))
                                : _createCommentVNode('v-if', true),
                              _ctx.showIndex
                                ? (_openBlock(),
                                  _createElementBlock(
                                    'col',
                                    {
                                      key: 2,
                                      style: _normalizeStyle({
                                        width: $setup.formatSize(
                                          ((_d = _ctx.indexConfig) == null ? void 0 : _d.width) ||
                                            50
                                        )
                                      })
                                    },
                                    null,
                                    4
                                    /* STYLE */
                                  ))
                                : _createCommentVNode('v-if', true),
                              (_openBlock(true),
                              _createElementBlock(
                                _Fragment,
                                null,
                                _renderList($setup.visibleColumns, (column) => {
                                  return (
                                    _openBlock(),
                                    _createElementBlock(
                                      'col',
                                      {
                                        key: column.prop || column.key,
                                        style: _normalizeStyle({
                                          width: $setup.formatSize(column.width)
                                        })
                                      },
                                      null,
                                      4
                                      /* STYLE */
                                    )
                                  )
                                }),
                                128
                                /* KEYED_FRAGMENT */
                              ))
                            ]),
                            _createElementVNode('tbody', null, [
                              (_openBlock(true),
                              _createElementBlock(
                                _Fragment,
                                null,
                                _renderList($setup.renderData, (row, rowIndex) => {
                                  var _a2
                                  return (
                                    _openBlock(),
                                    _createElementBlock(
                                      _Fragment,
                                      {
                                        key: $setup.getRowKeyFn(row)
                                      },
                                      [
                                        _createElementVNode(
                                          'tr',
                                          _mergeProps(
                                            {
                                              class: $setup.getRowClass(row, rowIndex),
                                              style: $setup.getRowStyle(row, rowIndex)
                                            },
                                            { ref_for: true },
                                            $setup.getRowDragAttrs(rowIndex),
                                            {
                                              onClick: ($event) =>
                                                $setup.handleRowClick(
                                                  row,
                                                  $setup.visibleColumns[0],
                                                  $event
                                                ),
                                              onDblclick: ($event) =>
                                                $setup.handleRowDblclick(
                                                  row,
                                                  $setup.visibleColumns[0],
                                                  $event
                                                )
                                            }
                                          ),
                                          [
                                            _createCommentVNode(' \u9009\u62E9\u5217 '),
                                            $setup.selectionConfig
                                              ? (_openBlock(),
                                                _createElementBlock(
                                                  'td',
                                                  {
                                                    key: 0,
                                                    class: _normalizeClass([
                                                      $setup.ns.e('cell'),
                                                      $setup.ns.e('selection-cell'),
                                                      $setup.isAnyColumnFixedLeft
                                                        ? 'is-fixed-left'
                                                        : ''
                                                    ]),
                                                    style: _normalizeStyle(
                                                      $setup.getSpecialFixedStyle('selection')
                                                    ),
                                                    onClick:
                                                      _cache[2] ||
                                                      (_cache[2] = _withModifiers(() => {}, [
                                                        'stop'
                                                      ]))
                                                  },
                                                  [
                                                    _createElementVNode(
                                                      'input',
                                                      {
                                                        type:
                                                          $setup.selectionType === 'radio'
                                                            ? 'radio'
                                                            : 'checkbox',
                                                        checked: $setup.isRowSelected(row),
                                                        disabled: !$setup.isRowSelectable(
                                                          row,
                                                          rowIndex
                                                        ),
                                                        onChange: ($event) =>
                                                          $setup.toggleRowSelection(row)
                                                      },
                                                      null,
                                                      40,
                                                      _hoisted_12
                                                    )
                                                  ],
                                                  6
                                                  /* CLASS, STYLE */
                                                ))
                                              : _createCommentVNode('v-if', true),
                                            _createCommentVNode(' \u5C55\u5F00\u5217 '),
                                            _ctx.expandConfig
                                              ? (_openBlock(),
                                                _createElementBlock(
                                                  'td',
                                                  {
                                                    key: 1,
                                                    class: _normalizeClass([
                                                      $setup.ns.e('cell'),
                                                      $setup.ns.e('expand-cell'),
                                                      $setup.isAnyColumnFixedLeft
                                                        ? 'is-fixed-left'
                                                        : ''
                                                    ]),
                                                    style: _normalizeStyle(
                                                      $setup.getSpecialFixedStyle('expand')
                                                    ),
                                                    onClick: _withModifiers(
                                                      ($event) => $setup.handleToggleExpand(row),
                                                      ['stop']
                                                    )
                                                  },
                                                  [
                                                    _createElementVNode(
                                                      'span',
                                                      {
                                                        class: _normalizeClass([
                                                          $setup.ns.e('expand-icon'),
                                                          $setup.expandedRowKeys.has(
                                                            $setup.getRowKeyFn(row)
                                                          )
                                                            ? 'is-expanded'
                                                            : ''
                                                        ])
                                                      },
                                                      [
                                                        ...(_cache[6] ||
                                                          (_cache[6] = [
                                                            _createElementVNode(
                                                              'svg',
                                                              {
                                                                viewBox: '0 0 24 24',
                                                                width: '16',
                                                                height: '16'
                                                              },
                                                              [
                                                                _createElementVNode('path', {
                                                                  fill: 'currentColor',
                                                                  d: 'M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z'
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
                                                  14,
                                                  _hoisted_13
                                                ))
                                              : _createCommentVNode('v-if', true),
                                            _createCommentVNode(' \u5E8F\u53F7\u5217 '),
                                            _ctx.showIndex
                                              ? (_openBlock(),
                                                _createElementBlock(
                                                  'td',
                                                  {
                                                    key: 2,
                                                    class: _normalizeClass([
                                                      $setup.ns.e('cell'),
                                                      $setup.ns.e('index-cell'),
                                                      $setup.isAnyColumnFixedLeft
                                                        ? 'is-fixed-left'
                                                        : ''
                                                    ]),
                                                    style: _normalizeStyle(
                                                      $setup.getSpecialFixedStyle('index')
                                                    )
                                                  },
                                                  _toDisplayString(
                                                    (
                                                      (_a2 = _ctx.indexConfig) == null
                                                        ? void 0
                                                        : _a2.method
                                                    )
                                                      ? _ctx.indexConfig.method(rowIndex)
                                                      : rowIndex + 1
                                                  ),
                                                  7
                                                  /* TEXT, CLASS, STYLE */
                                                ))
                                              : _createCommentVNode('v-if', true),
                                            _createCommentVNode(
                                              ' \u6570\u636E\u5217 (\u5408\u5E76\u5355\u5143\u683C\u65F6\u8DF3\u8FC7 span=0 \u7684\u5355\u5143\u683C) '
                                            ),
                                            (_openBlock(true),
                                            _createElementBlock(
                                              _Fragment,
                                              null,
                                              _renderList(
                                                $setup.visibleColumns,
                                                (column, columnIndex) => {
                                                  return (
                                                    _openBlock(),
                                                    _createElementBlock(
                                                      _Fragment,
                                                      {
                                                        key:
                                                          column.prop || column.key || columnIndex
                                                      },
                                                      [
                                                        $setup.isSpanVisible(
                                                          row,
                                                          column,
                                                          rowIndex,
                                                          columnIndex
                                                        )
                                                          ? (_openBlock(),
                                                            _createElementBlock(
                                                              'td',
                                                              {
                                                                key: 0,
                                                                class: _normalizeClass([
                                                                  $setup.getCellClass(
                                                                    row,
                                                                    column,
                                                                    rowIndex,
                                                                    columnIndex
                                                                  )
                                                                ]),
                                                                style: _normalizeStyle(
                                                                  $setup.getCellStyle(
                                                                    row,
                                                                    column,
                                                                    rowIndex,
                                                                    columnIndex
                                                                  )
                                                                ),
                                                                colspan:
                                                                  $setup.calculateSpan(
                                                                    row,
                                                                    column,
                                                                    rowIndex,
                                                                    columnIndex,
                                                                    _ctx.spanMethod
                                                                  ).colspan || void 0,
                                                                rowspan:
                                                                  $setup.calculateSpan(
                                                                    row,
                                                                    column,
                                                                    rowIndex,
                                                                    columnIndex,
                                                                    _ctx.spanMethod
                                                                  ).rowspan || void 0,
                                                                'data-row-key':
                                                                  $setup.getRowKeyFn(row),
                                                                'data-prop': column.prop,
                                                                onClick: ($event) =>
                                                                  $setup.handleCellClick(
                                                                    row,
                                                                    column,
                                                                    $event.currentTarget,
                                                                    $event
                                                                  ),
                                                                onDblclick: ($event) =>
                                                                  $setup.handleCellDblclick(
                                                                    row,
                                                                    column,
                                                                    $event.currentTarget,
                                                                    $event
                                                                  )
                                                              },
                                                              [
                                                                _createElementVNode(
                                                                  'div',
                                                                  {
                                                                    class: _normalizeClass(
                                                                      $setup.ns.e('cell-content')
                                                                    )
                                                                  },
                                                                  [
                                                                    _createCommentVNode(
                                                                      ' \u6811\u5F62\u7F29\u8FDB '
                                                                    ),
                                                                    _ctx.treeConfig &&
                                                                    column.treeNode
                                                                      ? (_openBlock(),
                                                                        _createElementBlock(
                                                                          'span',
                                                                          {
                                                                            key: 0,
                                                                            class: _normalizeClass([
                                                                              $setup.ns.e(
                                                                                'tree-indent'
                                                                              )
                                                                            ]),
                                                                            style: _normalizeStyle({
                                                                              paddingLeft: `${(row._level || 0) * (_ctx.treeConfig.indent || 16)}px`
                                                                            })
                                                                          },
                                                                          [
                                                                            row._hasChildren
                                                                              ? (_openBlock(),
                                                                                _createElementBlock(
                                                                                  'span',
                                                                                  {
                                                                                    key: 0,
                                                                                    class:
                                                                                      _normalizeClass(
                                                                                        [
                                                                                          $setup.ns.e(
                                                                                            'tree-icon'
                                                                                          ),
                                                                                          row._isExpanded
                                                                                            ? 'is-expanded'
                                                                                            : ''
                                                                                        ]
                                                                                      ),
                                                                                    onClick:
                                                                                      _withModifiers(
                                                                                        ($event) =>
                                                                                          $setup.handleToggleTreeExpand(
                                                                                            row
                                                                                          ),
                                                                                        ['stop']
                                                                                      )
                                                                                  },
                                                                                  [
                                                                                    ...(_cache[7] ||
                                                                                      (_cache[7] = [
                                                                                        _createElementVNode(
                                                                                          'svg',
                                                                                          {
                                                                                            viewBox:
                                                                                              '0 0 24 24',
                                                                                            width:
                                                                                              '16',
                                                                                            height:
                                                                                              '16'
                                                                                          },
                                                                                          [
                                                                                            _createElementVNode(
                                                                                              'path',
                                                                                              {
                                                                                                fill: 'currentColor',
                                                                                                d: 'M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z'
                                                                                              }
                                                                                            )
                                                                                          ],
                                                                                          -1
                                                                                          /* CACHED */
                                                                                        )
                                                                                      ]))
                                                                                  ],
                                                                                  10,
                                                                                  _hoisted_15
                                                                                ))
                                                                              : (_openBlock(),
                                                                                _createElementBlock(
                                                                                  'span',
                                                                                  {
                                                                                    key: 1,
                                                                                    class:
                                                                                      _normalizeClass(
                                                                                        $setup.ns.e(
                                                                                          'tree-leaf-spacer'
                                                                                        )
                                                                                      )
                                                                                  },
                                                                                  null,
                                                                                  2
                                                                                  /* CLASS */
                                                                                ))
                                                                          ],
                                                                          6
                                                                          /* CLASS, STYLE */
                                                                        ))
                                                                      : _createCommentVNode(
                                                                          'v-if',
                                                                          true
                                                                        ),
                                                                    _createCommentVNode(
                                                                      ' \u5185\u5BB9\u5C55\u793A '
                                                                    ),
                                                                    row &&
                                                                    column.prop &&
                                                                    _ctx.$slots[column.prop]
                                                                      ? _renderSlot(
                                                                          _ctx.$slots,
                                                                          column.prop,
                                                                          {
                                                                            key: 1,
                                                                            row,
                                                                            column,
                                                                            rowIndex,
                                                                            cellValue: column.prop
                                                                              ? row[column.prop]
                                                                              : void 0
                                                                          }
                                                                        )
                                                                      : row && column.render
                                                                        ? (_openBlock(),
                                                                          _createBlock(
                                                                            $setup['RenderColumn'],
                                                                            {
                                                                              key: 2,
                                                                              render: column.render,
                                                                              params: {
                                                                                row,
                                                                                column,
                                                                                rowIndex,
                                                                                cellValue:
                                                                                  column.prop
                                                                                    ? row[
                                                                                        column.prop
                                                                                      ]
                                                                                    : void 0
                                                                              }
                                                                            },
                                                                            null,
                                                                            8,
                                                                            ['render', 'params']
                                                                          ))
                                                                        : (_openBlock(),
                                                                          _createElementBlock(
                                                                            _Fragment,
                                                                            { key: 3 },
                                                                            [
                                                                              column.showOverflowTooltip
                                                                                ? (_openBlock(),
                                                                                  _createBlock(
                                                                                    $setup[
                                                                                      'YhTooltip'
                                                                                    ],
                                                                                    {
                                                                                      key: 0,
                                                                                      content:
                                                                                        String(
                                                                                          $setup.getCellContent(
                                                                                            row,
                                                                                            column,
                                                                                            rowIndex
                                                                                          )
                                                                                        ),
                                                                                      effect:
                                                                                        typeof column.showOverflowTooltip ===
                                                                                        'object'
                                                                                          ? column
                                                                                              .showOverflowTooltip
                                                                                              .effect ||
                                                                                            _ctx.tooltipEffect
                                                                                          : _ctx.tooltipEffect,
                                                                                      placement:
                                                                                        typeof column.showOverflowTooltip ===
                                                                                        'object'
                                                                                          ? column
                                                                                              .showOverflowTooltip
                                                                                              .placement ||
                                                                                            'top'
                                                                                          : 'top'
                                                                                    },
                                                                                    {
                                                                                      default:
                                                                                        _withCtx(
                                                                                          () => [
                                                                                            _createElementVNode(
                                                                                              'div',
                                                                                              {
                                                                                                class:
                                                                                                  _normalizeClass(
                                                                                                    [
                                                                                                      $setup.ns.e(
                                                                                                        'cell-text'
                                                                                                      ),
                                                                                                      $setup.ns.is(
                                                                                                        'ellipsis',
                                                                                                        true
                                                                                                      )
                                                                                                    ]
                                                                                                  )
                                                                                              },
                                                                                              _toDisplayString(
                                                                                                $setup.getCellContent(
                                                                                                  row,
                                                                                                  column,
                                                                                                  rowIndex
                                                                                                )
                                                                                              ),
                                                                                              3
                                                                                              /* TEXT, CLASS */
                                                                                            )
                                                                                          ]
                                                                                        ),
                                                                                      _: 2
                                                                                      /* DYNAMIC */
                                                                                    },
                                                                                    1032,
                                                                                    [
                                                                                      'content',
                                                                                      'effect',
                                                                                      'placement'
                                                                                    ]
                                                                                  ))
                                                                                : (_openBlock(),
                                                                                  _createElementBlock(
                                                                                    _Fragment,
                                                                                    { key: 1 },
                                                                                    [
                                                                                      _createTextVNode(
                                                                                        _toDisplayString(
                                                                                          $setup.getCellContent(
                                                                                            row,
                                                                                            column,
                                                                                            rowIndex
                                                                                          )
                                                                                        ),
                                                                                        1
                                                                                        /* TEXT */
                                                                                      )
                                                                                    ],
                                                                                    64
                                                                                    /* STABLE_FRAGMENT */
                                                                                  ))
                                                                            ],
                                                                            64
                                                                            /* STABLE_FRAGMENT */
                                                                          ))
                                                                  ],
                                                                  2
                                                                  /* CLASS */
                                                                )
                                                              ],
                                                              46,
                                                              _hoisted_14
                                                            ))
                                                          : _createCommentVNode('v-if', true)
                                                      ],
                                                      64
                                                      /* STABLE_FRAGMENT */
                                                    )
                                                  )
                                                }
                                              ),
                                              128
                                              /* KEYED_FRAGMENT */
                                            ))
                                          ],
                                          16,
                                          _hoisted_11
                                        ),
                                        _createCommentVNode(' \u5C55\u5F00\u884C\u5185\u5BB9 '),
                                        _ctx.expandConfig &&
                                        $setup.expandedRowKeys.has($setup.getRowKeyFn(row))
                                          ? (_openBlock(),
                                            _createElementBlock(
                                              'tr',
                                              {
                                                key: 0,
                                                class: _normalizeClass($setup.ns.e('expanded-row'))
                                              },
                                              [
                                                _createElementVNode(
                                                  'td',
                                                  {
                                                    colspan:
                                                      $setup.visibleColumns.length +
                                                      ($setup.selectionConfig ? 1 : 0) +
                                                      (_ctx.showIndex ? 1 : 0) +
                                                      1
                                                  },
                                                  [
                                                    _renderSlot(
                                                      _ctx.$slots,
                                                      'expand',
                                                      {
                                                        row,
                                                        rowIndex
                                                      },
                                                      () => [
                                                        _ctx.expandConfig.render
                                                          ? (_openBlock(),
                                                            _createBlock(
                                                              _resolveDynamicComponent(
                                                                _ctx.expandConfig.render({
                                                                  row,
                                                                  rowIndex
                                                                })
                                                              ),
                                                              { key: 0 }
                                                            ))
                                                          : _createCommentVNode('v-if', true)
                                                      ]
                                                    )
                                                  ],
                                                  8,
                                                  _hoisted_16
                                                )
                                              ],
                                              2
                                              /* CLASS */
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
                            ])
                          ],
                          6
                          /* CLASS, STYLE */
                        )
                      ],
                      2112
                      /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                    ))
              ],
              38
              /* CLASS, STYLE, NEED_HYDRATION */
            ),
            _createCommentVNode(' \u6C47\u603B\u884C '),
            _ctx.summaryConfig
              ? (_openBlock(),
                _createElementBlock(
                  'div',
                  {
                    key: 2,
                    ref: 'footerRef',
                    class: _normalizeClass($setup.ns.e('footer-wrapper'))
                  },
                  [
                    _renderSlot(_ctx.$slots, 'summary', {}, () => {
                      var _a2
                      return [
                        _createElementVNode(
                          'table',
                          {
                            class: _normalizeClass($setup.ns.e('footer')),
                            style: _normalizeStyle({
                              tableLayout: _ctx.tableLayout
                            })
                          },
                          [
                            _createElementVNode('colgroup', null, [
                              $setup.selectionConfig
                                ? (_openBlock(),
                                  _createElementBlock(
                                    'col',
                                    {
                                      key: 0,
                                      style: _normalizeStyle({
                                        width: $setup.formatSize(
                                          $setup.selectionConfig.columnWidth || 50
                                        )
                                      })
                                    },
                                    null,
                                    4
                                    /* STYLE */
                                  ))
                                : _createCommentVNode('v-if', true),
                              _ctx.expandConfig
                                ? (_openBlock(),
                                  _createElementBlock(
                                    'col',
                                    {
                                      key: 1,
                                      style: _normalizeStyle({
                                        width: $setup.formatSize(
                                          _ctx.expandConfig.columnWidth || 50
                                        )
                                      })
                                    },
                                    null,
                                    4
                                    /* STYLE */
                                  ))
                                : _createCommentVNode('v-if', true),
                              _ctx.showIndex
                                ? (_openBlock(),
                                  _createElementBlock(
                                    'col',
                                    {
                                      key: 2,
                                      style: _normalizeStyle({
                                        width: $setup.formatSize(
                                          ((_a2 = _ctx.indexConfig) == null ? void 0 : _a2.width) ||
                                            50
                                        )
                                      })
                                    },
                                    null,
                                    4
                                    /* STYLE */
                                  ))
                                : _createCommentVNode('v-if', true),
                              (_openBlock(true),
                              _createElementBlock(
                                _Fragment,
                                null,
                                _renderList($setup.visibleColumns, (column) => {
                                  return (
                                    _openBlock(),
                                    _createElementBlock(
                                      'col',
                                      {
                                        key: column.prop || column.key,
                                        style: _normalizeStyle({
                                          width: $setup.formatSize(column.width)
                                        })
                                      },
                                      null,
                                      4
                                      /* STYLE */
                                    )
                                  )
                                }),
                                128
                                /* KEYED_FRAGMENT */
                              ))
                            ]),
                            _createElementVNode('tbody', null, [
                              _createElementVNode(
                                'tr',
                                {
                                  class: _normalizeClass([
                                    $setup.ns.e('row'),
                                    $setup.ns.e('summary-row'),
                                    _ctx.summaryConfig.className
                                  ])
                                },
                                [
                                  _createCommentVNode(' \u9009\u62E9\u5217\u5360\u4F4D '),
                                  $setup.selectionConfig
                                    ? (_openBlock(),
                                      _createElementBlock(
                                        'td',
                                        {
                                          key: 0,
                                          class: _normalizeClass([
                                            $setup.ns.e('cell'),
                                            $setup.ns.e('selection-cell')
                                          ]),
                                          style: _normalizeStyle(
                                            $setup.getSpecialFixedStyle('selection')
                                          )
                                        },
                                        null,
                                        6
                                        /* CLASS, STYLE */
                                      ))
                                    : _createCommentVNode('v-if', true),
                                  _createCommentVNode(' \u5C55\u5F00\u5217\u5360\u4F4D '),
                                  _ctx.expandConfig
                                    ? (_openBlock(),
                                      _createElementBlock(
                                        'td',
                                        {
                                          key: 1,
                                          class: _normalizeClass([
                                            $setup.ns.e('cell'),
                                            $setup.ns.e('expand-cell')
                                          ]),
                                          style: _normalizeStyle(
                                            $setup.getSpecialFixedStyle('expand')
                                          )
                                        },
                                        null,
                                        6
                                        /* CLASS, STYLE */
                                      ))
                                    : _createCommentVNode('v-if', true),
                                  _createCommentVNode(' \u5E8F\u53F7\u5217\u5360\u4F4D '),
                                  _ctx.showIndex
                                    ? (_openBlock(),
                                      _createElementBlock(
                                        'td',
                                        {
                                          key: 2,
                                          class: _normalizeClass([
                                            $setup.ns.e('cell'),
                                            $setup.ns.e('index-cell')
                                          ]),
                                          style: _normalizeStyle(
                                            $setup.getSpecialFixedStyle('index')
                                          )
                                        },
                                        null,
                                        6
                                        /* CLASS, STYLE */
                                      ))
                                    : _createCommentVNode('v-if', true),
                                  _createCommentVNode(' \u6570\u636E\u5217 '),
                                  (_openBlock(true),
                                  _createElementBlock(
                                    _Fragment,
                                    null,
                                    _renderList($setup.visibleColumns, (column, columnIndex) => {
                                      return (
                                        _openBlock(),
                                        _createElementBlock(
                                          'td',
                                          {
                                            key: column.prop || column.key || columnIndex,
                                            class: _normalizeClass(
                                              $setup.getCellClass({}, column, 0, columnIndex)
                                            ),
                                            style: _normalizeStyle(
                                              $setup.getCellStyle({}, column, 0, columnIndex)
                                            )
                                          },
                                          [
                                            _createElementVNode(
                                              'div',
                                              {
                                                class: _normalizeClass($setup.ns.e('cell-content'))
                                              },
                                              [
                                                _renderSlot(
                                                  _ctx.$slots,
                                                  `summary-${column.prop}`,
                                                  {
                                                    column,
                                                    columnIndex,
                                                    data: $setup.tableData
                                                  },
                                                  () => [
                                                    _createTextVNode(
                                                      _toDisplayString(
                                                        $setup.summaryValues.length > 0
                                                          ? $setup.summaryValues[columnIndex]
                                                          : columnIndex === 0
                                                            ? _ctx.summaryConfig.text ||
                                                              $setup.t('table.sumText')
                                                            : ''
                                                      ),
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
                                          6
                                          /* CLASS, STYLE */
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
                            ])
                          ],
                          6
                          /* CLASS, STYLE */
                        )
                      ]
                    })
                  ],
                  2
                  /* CLASS */
                ))
              : _createCommentVNode('v-if', true),
            _createCommentVNode(' \u5217\u5BBD\u8C03\u6574\u6307\u793A\u7EBF '),
            $setup.resizeLineVisible
              ? (_openBlock(),
                _createElementBlock(
                  'div',
                  {
                    key: 3,
                    class: _normalizeClass($setup.ns.e('resize-line')),
                    style: _normalizeStyle({
                      left: `${$setup.resizeLineLeft}px`
                    })
                  },
                  null,
                  6
                  /* CLASS, STYLE */
                ))
              : _createCommentVNode('v-if', true),
            _createCommentVNode(' \u52A0\u8F7D\u72B6\u6001 '),
            (typeof _ctx.loading === 'object' ? _ctx.loading.visible !== false : !!_ctx.loading)
              ? (_openBlock(),
                _createElementBlock(
                  'div',
                  {
                    key: 4,
                    class: _normalizeClass($setup.ns.e('loading')),
                    style: _normalizeStyle(
                      typeof _ctx.loading === 'object' && _ctx.loading.background
                        ? {
                            backgroundColor: _ctx.loading.background
                          }
                        : {}
                    )
                  },
                  [
                    _renderSlot(_ctx.$slots, 'loading', {}, () => [
                      _createElementVNode(
                        'div',
                        {
                          class: _normalizeClass($setup.ns.e('loading-content'))
                        },
                        [
                          _createElementVNode(
                            'span',
                            {
                              class: _normalizeClass($setup.ns.e('loading-spinner'))
                            },
                            null,
                            2
                            /* CLASS */
                          ),
                          typeof _ctx.loading === 'object' && _ctx.loading.text
                            ? (_openBlock(),
                              _createElementBlock(
                                'span',
                                {
                                  key: 0,
                                  class: _normalizeClass($setup.ns.e('loading-text'))
                                },
                                _toDisplayString(_ctx.loading.text),
                                3
                                /* TEXT, CLASS */
                              ))
                            : typeof _ctx.loading === 'boolean'
                              ? (_openBlock(),
                                _createElementBlock(
                                  'span',
                                  {
                                    key: 1,
                                    class: _normalizeClass($setup.ns.e('loading-text'))
                                  },
                                  _toDisplayString($setup.t('table.loading')),
                                  3
                                  /* TEXT, CLASS */
                                ))
                              : _createCommentVNode('v-if', true)
                        ],
                        2
                        /* CLASS */
                      )
                    ])
                  ],
                  6
                  /* CLASS, STYLE */
                ))
              : _createCommentVNode('v-if', true)
          ],
          2
          /* CLASS */
        ),
        _createCommentVNode(' \u5206\u9875 '),
        _ctx.pagination
          ? (_openBlock(),
            _createElementBlock(
              'div',
              {
                key: 0,
                class: _normalizeClass([
                  $setup.ns.e('pagination-wrapper'),
                  typeof _ctx.pagination === 'object' && _ctx.pagination.align
                    ? $setup.ns.is('align-' + _ctx.pagination.align)
                    : ''
                ])
              },
              [
                _createVNode(
                  $setup['YhPagination'],
                  _mergeProps(typeof _ctx.pagination === 'object' ? _ctx.pagination : {}, {
                    class: $setup.ns.e('pagination'),
                    'onUpdate:currentPage':
                      _cache[4] ||
                      (_cache[4] = (val) =>
                        $setup.emit('page-change', {
                          currentPage: val,
                          pageSize:
                            (typeof _ctx.pagination === 'object' ? _ctx.pagination.pageSize : 10) ||
                            10
                        })),
                    'onUpdate:pageSize':
                      _cache[5] ||
                      (_cache[5] = (val) =>
                        $setup.emit('page-change', {
                          currentPage:
                            (typeof _ctx.pagination === 'object'
                              ? _ctx.pagination.currentPage
                              : 1) || 1,
                          pageSize: val
                        }))
                  }),
                  null,
                  16,
                  ['class']
                )
              ],
              2
              /* CLASS */
            ))
          : _createCommentVNode('v-if', true),
        _createCommentVNode(
          ' \u6E32\u67D3\u9690\u85CF\u7684\u9ED8\u8BA4\u63D2\u69FD\uFF0C\u7528\u4E8E\u6536\u96C6\u5217\u914D\u7F6E(\u4EC5\u6E32\u67D3 YhTableColumn \u5B50\u7EC4\u4EF6) '
        ),
        _ctx.$slots.default && (!_ctx.columns || _ctx.columns.length === 0)
          ? (_openBlock(),
            _createElementBlock('div', _hoisted_17, [_renderSlot(_ctx.$slots, 'default')]))
          : _createCommentVNode('v-if', true)
      ],
      6
      /* CLASS, STYLE */
    )
  )
}
import { computed, ref, provide, watch, onMounted, nextTick, useSlots } from 'vue'
import { useLocale } from '../../../hooks/index.js'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { useComponentTheme } from '../../../theme/component-theme.js'
import { tableProps, tableEmits, tableContextKey } from './table-meta.js'
import {
  getRowKey,
  flattenColumns,
  getColumnDepth,
  buildHeaderRows,
  formatSize,
  defaultSortMethod,
  multiValueFilter,
  flattenTreeData,
  calculateSpan,
  throttle
} from './utils.js'
import { useVirtualScroll } from './use-virtual-scroll.js'
import { useTableSelection } from './use-table-selection.js'
import { useRowDrag } from './use-row-drag.js'
import { useColumnResize } from './use-column-resize.js'
import { useColumnDrag } from './use-column-drag.js'
import { useTableExport } from './use-table-export.js'
import { useTableImport } from './use-table-import.js'
import { useTablePrint } from './use-table-print.js'
import { YhTooltip } from '../../tooltip.js'
import { YhPagination } from '../../pagination.js'
const __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhTable'
  },
  {
    __name: 'table',
    props: tableProps,
    emits: tableEmits,
    setup(__props, { expose: __expose, emit: __emit }) {
      const props = __props
      const emit = __emit
      const slots = useSlots()
      const ns = useNamespace('table')
      const { t } = useLocale()
      const RenderColumn = (props2) => {
        return props2.render(props2.params)
      }
      const { themeStyle } = useComponentTheme(
        'table',
        computed(() => props.themeOverrides)
      )
      const tableRef = ref(null)
      const headerRef = ref(null)
      const bodyRef = ref(null)
      const footerRef = ref(null)
      const currentRowKey = ref(props.currentRowKey)
      const sortStates = ref([])
      const filterStates = ref({})
      const expandedRowKeys = ref(/* @__PURE__ */ new Set())
      const treeExpandedKeys = ref(/* @__PURE__ */ new Set())
      const isFullscreen = ref(false)
      const scrollState = ref('left')
      const collectedColumns = ref([])
      const getRowKeyFn = (row) => {
        if (!row) return Math.random().toString(36).slice(2)
        return getRowKey(row, props.rowKey)
      }
      const allColumns = computed(() => {
        if (props.columns && props.columns.length > 0) {
          return props.columns
        }
        return collectedColumns.value
      })
      const flatColumns = computed(() => flattenColumns(allColumns.value))
      const headerRows = computed(() => buildHeaderRows(allColumns.value))
      const columnDepth = computed(() => getColumnDepth(allColumns.value))
      const visibleColumns = computed(() => {
        return flatColumns.value.filter((col) => col.visible !== false)
      })
      const fixedLeftColumns = computed(() => {
        return visibleColumns.value.filter((col) => col.fixed === 'left' || col.fixed === true)
      })
      const fixedRightColumns = computed(() => {
        return visibleColumns.value.filter((col) => col.fixed === 'right')
      })
      const treeProcessedData = computed(() => {
        if (!props.treeConfig) return props.data
        const childrenKey = props.treeConfig.childrenKey || 'children'
        return flattenTreeData(props.data, childrenKey, treeExpandedKeys.value, props.rowKey)
      })
      watch(
        () => props.data,
        (newData) => {
          var _a
          if (
            ((_a = props.treeConfig) == null ? void 0 : _a.expandAll) &&
            treeExpandedKeys.value.size === 0
          ) {
            const childrenKey = props.treeConfig.childrenKey || 'children'
            const allKeys = /* @__PURE__ */ new Set()
            const collectKeys = (items) => {
              items.forEach((item) => {
                const children = item[childrenKey]
                if (children == null ? void 0 : children.length) {
                  allKeys.add(getRowKeyFn(item))
                  collectKeys(children)
                }
              })
            }
            collectKeys(newData)
            treeExpandedKeys.value = allKeys
          }
        },
        { immediate: true }
      )
      const sortedData = computed(() => {
        const data = treeProcessedData.value
        if (!sortStates.value.length) return data
        const activeSortStates = sortStates.value.filter((s) => s.order)
        if (!activeSortStates.length) return data
        return [...data].sort((a, b) => {
          for (const state of activeSortStates) {
            const column = flatColumns.value.find((col) => col.prop === state.prop)
            let result
            if (column == null ? void 0 : column.sortMethod) {
              result = column.sortMethod(a, b, state.order)
            } else {
              result = defaultSortMethod(a, b, state.prop, state.order)
            }
            if (result !== 0) return result
          }
          return 0
        })
      })
      const filteredData = computed(() => {
        return multiValueFilter(sortedData.value, filterStates.value, flatColumns.value)
      })
      const selectionWidth = computed(() =>
        props.selectionConfig ? parseInt(String(props.selectionConfig.columnWidth || 50)) : 0
      )
      const expandWidth = computed(() =>
        props.expandConfig ? parseInt(String(props.expandConfig.columnWidth || 50)) : 0
      )
      const indexWidth = computed(() => {
        var _a
        return props.showIndex
          ? parseInt(String(((_a = props.indexConfig) == null ? void 0 : _a.width) || 50))
          : 0
      })
      const isAnyColumnFixedLeft = computed(() =>
        visibleColumns.value.some((col) => col.fixed === 'left' || col.fixed === true)
      )
      const tableData = computed(() => {
        const data = filteredData.value
        if (
          !props.pagination ||
          (typeof props.pagination === 'object' && props.pagination.remote)
        ) {
          return data
        }
        const currentPage =
          typeof props.pagination === 'object' ? props.pagination.currentPage || 1 : 1
        const pageSize = typeof props.pagination === 'object' ? props.pagination.pageSize || 10 : 10
        const start = (currentPage - 1) * pageSize
        const end = start + pageSize
        return data.slice(start, end)
      })
      const virtualConfig = computed(() => props.virtualConfig)
      const {
        visibleData,
        offsetTop,
        totalHeight,
        handleScroll: handleVirtualScroll,
        scrollToIndex,
        scrollToRow,
        refresh: refreshVirtual,
        isVirtual
      } = useVirtualScroll({
        data: tableData,
        containerRef: bodyRef,
        config: virtualConfig,
        rowKey: getRowKeyFn
      })
      const renderData = computed(() => {
        return isVirtual.value ? visibleData.value : tableData.value
      })
      const selectionConfig = computed(() => props.selectionConfig)
      const {
        selectedRowKeys,
        selectedRows,
        isAllSelected,
        isIndeterminate,
        selectionType,
        toggleRowSelection,
        toggleAllSelection,
        clearSelection,
        // setSelection,
        // setSelectionByKeys,
        isRowSelected,
        isRowSelectable
      } = useTableSelection({
        data: tableData,
        rowKey: props.rowKey,
        config: selectionConfig
      })
      const dragConfigRef = computed(() => props.dragConfig)
      const {
        isRowDragEnabled,
        // isDraggingRow,
        getRowDragAttrs,
        getRowDragClass
      } = useRowDrag({
        data: tableData,
        rawData: computed(() => props.data),
        dragConfig: dragConfigRef,
        treeConfig: computed(() => props.treeConfig),
        rowKey: getRowKeyFn,
        emit
      })
      const resizableRef = computed(() => props.resizable)
      const {
        // isResizing,
        // resizingColumn: activeResizingColumn,
        resizeLineLeft,
        resizeLineVisible,
        isColumnResizable,
        handleResizeStart
      } = useColumnResize({
        resizable: resizableRef,
        columns: visibleColumns,
        tableRef,
        emit
      })
      const {
        isColumnDragEnabled,
        // isDraggingColumn,
        isColumnDraggable,
        getHeaderDragAttrs,
        getHeaderDragClass
      } = useColumnDrag({
        columns: allColumns,
        dragConfig: dragConfigRef,
        flatColumns: visibleColumns,
        emit
      })
      const {
        exportData: doExportData
        // toCSV,
        // toJSON: toJSONExport,
        // toTXT,
        // toXML,
        // toHTML: toHTMLExport,
        // getExportColumns
      } = useTableExport(tableData, visibleColumns)
      const {
        importFile,
        importData: doImportData,
        openImport
        // parseCSV,
        // parseTXT: parseTXTImport,
        // parseJSON: parseJSONImport,
        // parseXML: parseXMLImport,
        // parseHTML: parseHTMLImport,
        // parseContent,
        // applyImport
      } = useTableImport(
        computed({
          get: () => props.data,
          set: (val) => emit('update:data', val)
        }),
        visibleColumns
      )
      const {
        print: doPrint,
        printMultiple,
        printTemplate
        // getPrintColumns
      } = useTablePrint(tableData, visibleColumns)
      const toolbarSlotNames = [
        'toolbar',
        'toolbar-left',
        'toolbar-left-prefix',
        'toolbar-left-suffix',
        'toolbar-right',
        'toolbar-right-prefix',
        'toolbar-right-suffix'
      ]
      const showToolbar = computed(() => {
        var _a
        if ((_a = props.toolbarConfig) == null ? void 0 : _a.visible) return true
        return toolbarSlotNames.some((name) => !!slots[name])
      })
      const tableClasses = computed(() => [
        ns.b(),
        ns.m(props.size),
        ns.is('border', !!props.border),
        ns.is('stripe', props.stripe),
        ns.is('highlight-current-row', props.highlightCurrentRow),
        ns.is('fullscreen', isFullscreen.value),
        ns.is('fixed-header', !!(props.height || props.maxHeight)),
        ns.is(
          'fixed-column',
          fixedLeftColumns.value.length > 0 || fixedRightColumns.value.length > 0
        ),
        ns.is(`scrolling-${scrollState.value}`, true)
      ])
      const innerWrapperClasses = computed(() => [
        ns.e('inner-wrapper'),
        ns.is('border', !!props.border)
      ])
      const tableStyle = computed(() => {
        const style = __spreadValues({}, themeStyle.value)
        if (props.width) {
          style.width = formatSize(props.width)
        }
        if (props.height) {
          style.height = formatSize(props.height)
        }
        if (props.maxHeight) {
          style.maxHeight = formatSize(props.maxHeight)
        }
        return style
      })
      const bodyStyle = computed(() => {
        const style = {}
        if (props.height || props.maxHeight) {
          style.overflow = 'auto'
          style.flex = '1'
          style.minHeight = '0'
        }
        return style
      })
      const summaryValues = computed(() => {
        var _a
        if (!((_a = props.summaryConfig) == null ? void 0 : _a.method)) return []
        return props.summaryConfig.method({
          columns: visibleColumns.value,
          data: tableData.value
        })
      })
      const isSpanVisible = (row, column, rowIndex, columnIndex) => {
        if (!props.spanMethod) return true
        const result = calculateSpan(row, column, rowIndex, columnIndex, props.spanMethod)
        return result.rowspan !== 0 && result.colspan !== 0
      }
      const handleScroll = throttle((event) => {
        const target = event.target
        const { scrollLeft, scrollWidth, clientWidth } = target
        if (scrollWidth <= clientWidth) {
          scrollState.value = 'none'
        } else if (scrollLeft <= 0) {
          scrollState.value = 'left'
        } else if (scrollLeft + clientWidth >= scrollWidth - 1) {
          scrollState.value = 'right'
        } else {
          scrollState.value = 'middle'
        }
        if (headerRef.value && props.syncScroll) {
          headerRef.value.scrollLeft = scrollLeft
        }
        if (footerRef.value && props.syncScroll) {
          footerRef.value.scrollLeft = scrollLeft
        }
        if (isVirtual.value) {
          handleVirtualScroll(event)
        }
        emit('scroll', {
          scrollTop: target.scrollTop,
          scrollLeft,
          isEnd: target.scrollHeight - target.scrollTop <= target.clientHeight + 1
        })
      }, 10)
      const handleRowClick = (row, column, event) => {
        emit('row-click', row, column, event)
        if (props.highlightCurrentRow) {
          const key = getRowKeyFn(row)
          currentRowKey.value = key
          emit('current-change', row, null)
          emit('update:currentRowKey', key)
        }
      }
      const handleRowDblclick = (row, column, event) => {
        emit('row-dblclick', row, column, event)
      }
      const handleCellClick = (row, column, cell, event) => {
        emit('cell-click', row, column, cell, event)
      }
      const handleCellDblclick = (row, column, cell, event) => {
        emit('cell-dblclick', row, column, cell, event)
      }
      const handleHeaderClick = (column, event) => {
        emit('header-click', column, event)
        if (column.sortable) {
          handleSort(column)
        }
      }
      const handleSort = (column) => {
        var _a
        const prop = column.prop
        if (!prop) return
        const currentSort = sortStates.value.find((s) => s.prop === prop)
        let newOrder = 'asc'
        if (currentSort) {
          if (currentSort.order === 'asc') {
            newOrder = 'desc'
          } else if (currentSort.order === 'desc') {
            newOrder = null
          }
        }
        if ((_a = props.sortConfig) == null ? void 0 : _a.multiple) {
          const index = sortStates.value.findIndex((s) => s.prop === prop)
          if (index > -1) {
            if (newOrder) {
              sortStates.value[index].order = newOrder
            } else {
              sortStates.value.splice(index, 1)
            }
          } else if (newOrder) {
            sortStates.value.push({ prop, order: newOrder })
          }
        } else {
          if (newOrder) {
            sortStates.value = [{ prop, order: newOrder }]
          } else {
            sortStates.value = []
          }
        }
        emit('sort-change', { column, prop, order: newOrder })
      }
      const handleToggleExpand = (row) => {
        var _a
        const key = getRowKeyFn(row)
        if (expandedRowKeys.value.has(key)) {
          expandedRowKeys.value.delete(key)
        } else {
          if ((_a = props.expandConfig) == null ? void 0 : _a.accordion) {
            expandedRowKeys.value.clear()
          }
          expandedRowKeys.value.add(key)
        }
        emit(
          'expand-change',
          row,
          Array.from(expandedRowKeys.value)
            .map((k) => {
              return tableData.value.find((r) => getRowKeyFn(r) === k)
            })
            .filter(Boolean)
        )
      }
      const handleToggleTreeExpand = (row) => {
        var _a
        const key = getRowKeyFn(row)
        if (treeExpandedKeys.value.has(key)) {
          treeExpandedKeys.value.delete(key)
        } else {
          if ((_a = props.treeConfig) == null ? void 0 : _a.accordion) {
            treeExpandedKeys.value.clear()
          }
          treeExpandedKeys.value.add(key)
        }
      }
      const getRowClass = (row, rowIndex) => {
        const classes = [ns.e('row')]
        if (props.highlightCurrentRow && currentRowKey.value === getRowKeyFn(row)) {
          classes.push('is-current')
        }
        if (isRowSelected(row)) {
          classes.push('is-selected')
        }
        if (props.stripe && rowIndex % 2 === 1) {
          classes.push('is-striped')
        }
        if (isRowDragEnabled.value) {
          classes.push('is-row-draggable')
          const dragClass = getRowDragClass(rowIndex)
          if (dragClass) classes.push(dragClass)
        }
        if (props.rowClassName) {
          if (typeof props.rowClassName === 'function') {
            classes.push(props.rowClassName({ row, rowIndex }))
          } else {
            classes.push(props.rowClassName)
          }
        }
        return classes.join(' ')
      }
      const getRowStyle = (row, rowIndex) => {
        if (!props.rowStyle) return {}
        if (typeof props.rowStyle === 'function') {
          return props.rowStyle({ row, rowIndex })
        }
        return props.rowStyle
      }
      const getCellClass = (row, column, rowIndex, columnIndex) => {
        const classes = [ns.e('cell')]
        if (column.className) {
          classes.push(column.className)
        }
        if (column.align) {
          classes.push(`is-${column.align}`)
        }
        if (column.fixed) {
          const fixedPosition = column.fixed === true ? 'left' : column.fixed
          classes.push(`is-fixed-${fixedPosition}`)
          if (fixedPosition === 'left') {
            const fixedLeftIndices = visibleColumns.value
              .map((col, idx) => (col.fixed === 'left' || col.fixed === true ? idx : -1))
              .filter((idx) => idx !== -1)
            if (columnIndex === Math.max(...fixedLeftIndices)) {
              classes.push('is-last-fixed-left')
            }
          }
          if (fixedPosition === 'right') {
            const fixedRightIndices = visibleColumns.value
              .map((col, idx) => (col.fixed === 'right' ? idx : -1))
              .filter((idx) => idx !== -1)
            if (columnIndex === Math.min(...fixedRightIndices)) {
              classes.push('is-first-fixed-right')
            }
          }
          classes.push('is-fixed')
        }
        if (props.cellClassName) {
          if (typeof props.cellClassName === 'function') {
            classes.push(props.cellClassName({ row, column, rowIndex, columnIndex }))
          } else {
            classes.push(props.cellClassName)
          }
        }
        return classes.join(' ')
      }
      const getFixedStyle = (column, columnIndex) => {
        if (!column.fixed) return {}
        const style = {}
        let offset = 0
        if (column.fixed === 'left' || column.fixed === true) {
          offset = selectionWidth.value + expandWidth.value + indexWidth.value
          const prevColumns = visibleColumns.value.slice(0, columnIndex)
          offset += prevColumns.reduce((acc, col) => acc + (parseInt(String(col.width)) || 0), 0)
          style.left = `${offset}px`
        } else if (column.fixed === 'right') {
          const nextColumns = visibleColumns.value.slice(columnIndex + 1)
          offset = nextColumns.reduce((acc, col) => acc + (parseInt(String(col.width)) || 0), 0)
          style.right = `${offset}px`
        }
        return style
      }
      const getSpecialFixedStyle = (type) => {
        if (!isAnyColumnFixedLeft.value) return {}
        const style = { position: 'sticky' }
        if (type === 'selection') style.left = '0px'
        if (type === 'expand') style.left = `${selectionWidth.value}px`
        if (type === 'index') style.left = `${selectionWidth.value + expandWidth.value}px`
        return style
      }
      const getCellStyle = (row, column, rowIndex, columnIndex) => {
        const style = __spreadProps(
          __spreadValues(__spreadValues({}, column.style), getFixedStyle(column, columnIndex)),
          {
            textAlign: column.align || 'left'
          }
        )
        if (column.width) {
          style.width = formatSize(column.width)
        }
        if (column.minWidth) {
          style.minWidth = formatSize(column.minWidth)
        }
        if (props.cellStyle) {
          if (typeof props.cellStyle === 'function') {
            Object.assign(style, props.cellStyle({ row, column, rowIndex, columnIndex }))
          } else {
            Object.assign(style, props.cellStyle)
          }
        }
        return style
      }
      const getCellContent = (row, column, rowIndex) => {
        if (!row) return ''
        const prop = column.prop
        if (!prop) return ''
        const cellValue = row[prop]
        if (column.formatter) {
          return column.formatter(row, column, cellValue, rowIndex)
        }
        if (column.displayMap && cellValue !== void 0 && cellValue !== null) {
          const mappedValue = column.displayMap[String(cellValue)]
          if (mappedValue !== void 0) return mappedValue
        }
        if (typeof cellValue === 'boolean') {
          return cellValue ? t('table.yes') : t('table.no')
        }
        return cellValue !== void 0 && cellValue !== null ? String(cellValue) : ''
      }
      const getSortOrder = (column) => {
        const prop = column.prop
        if (!prop) return null
        const sort2 = sortStates.value.find((s) => s.prop === prop)
        return (sort2 == null ? void 0 : sort2.order) || null
      }
      const doLayout = () => {
        nextTick(() => {
          refreshVirtual()
        })
      }
      const refresh = () => {
        refreshVirtual()
      }
      const scrollTo = (options) => {
        const container = bodyRef.value
        if (!container) return
        if (options.row) {
          scrollToRow(options.row)
          return
        }
        if (options.rowIndex !== void 0) {
          scrollToIndex(options.rowIndex)
          return
        }
        container.scrollTo({
          left: options.left,
          top: options.top
        })
      }
      const sort = (prop, order) => {
        sortStates.value = order ? [{ prop, order }] : []
      }
      const clearSort = () => {
        sortStates.value = []
      }
      const filter = (prop, values) => {
        filterStates.value[prop] = values
        emit('filter-change', filterStates.value)
      }
      const clearFilter = (propOrProps) => {
        if (!propOrProps) {
          filterStates.value = {}
        } else if (typeof propOrProps === 'string') {
          delete filterStates.value[propOrProps]
        } else {
          propOrProps.forEach((p) => delete filterStates.value[p])
        }
        emit('filter-change', filterStates.value)
      }
      const setCurrentRow = (row) => {
        const oldKey = currentRowKey.value
        const oldRow = oldKey ? tableData.value.find((r) => getRowKeyFn(r) === oldKey) : null
        currentRowKey.value = row ? getRowKeyFn(row) : void 0
        emit('current-change', row, oldRow || null)
        emit('update:currentRowKey', currentRowKey.value)
      }
      const toggleRowExpansion = (row, expanded) => {
        const key = getRowKeyFn(row)
        const isExpanded = expandedRowKeys.value.has(key)
        const shouldExpand = expanded != null ? expanded : !isExpanded
        if (shouldExpand && !isExpanded) {
          expandedRowKeys.value.add(key)
        } else if (!shouldExpand && isExpanded) {
          expandedRowKeys.value.delete(key)
        }
      }
      const setExpandedRowKeys = (keys) => {
        expandedRowKeys.value = new Set(keys)
      }
      const getExpandedRowKeys = () => {
        return Array.from(expandedRowKeys.value)
      }
      const getTableData = () => ({
        fullData: props.data,
        tableData: tableData.value
      })
      const exportData = async (config) => {
        return doExportData(config)
      }
      const print = (config) => {
        return doPrint(config)
      }
      const toggleFullscreen = () => {
        isFullscreen.value = !isFullscreen.value
      }
      const getColumns = () => visibleColumns.value
      const setColumnVisible = (prop, visible) => {
        const column = flatColumns.value.find((col) => col.prop === prop)
        if (column) {
          column.visible = visible
          emit('column-visible-change', visibleColumns.value)
        }
      }
      const resetColumns = () => {
        flatColumns.value.forEach((col) => {
          col.visible = true
        })
        emit('column-visible-change', visibleColumns.value)
      }
      const insertRow = (row, index) => {
        const newData = [...props.data]
        if (index !== void 0) {
          newData.splice(index, 0, row)
        } else {
          newData.push(row)
        }
        emit('update:data', newData)
      }
      const removeRow = (row) => {
        const rows = Array.isArray(row) ? row : [row]
        const keysToRemove = new Set(rows.map((r) => getRowKeyFn(r)))
        const newData = props.data.filter((r) => !keysToRemove.has(getRowKeyFn(r)))
        emit('update:data', newData)
      }
      const updateRow = (row, newRow) => {
        const key = getRowKeyFn(row)
        const newData = props.data.map((r) => {
          if (getRowKeyFn(r) === key) {
            return __spreadValues(__spreadValues({}, r), newRow)
          }
          return r
        })
        emit('update:data', newData)
      }
      const expose = {
        getSelectionRows: () => selectedRows.value,
        getSelectionRowKeys: () => selectedRowKeys.value,
        toggleRowSelection,
        toggleAllSelection,
        clearSelection,
        setCurrentRow,
        toggleRowExpansion,
        setExpandedRowKeys,
        getExpandedRowKeys,
        sort,
        clearSort,
        filter,
        clearFilter,
        doLayout,
        refresh,
        scrollTo,
        getTableData,
        exportData,
        print,
        openImport,
        importFile,
        importData: doImportData,
        printMultiple,
        printTemplate,
        toggleFullscreen,
        getColumns,
        setColumnVisible,
        resetColumns,
        insertRow,
        removeRow,
        updateRow
      }
      __expose(expose)
      provide(tableContextKey, {
        props,
        slots,
        registerColumn: (column) => {
          if (!collectedColumns.value.includes(column)) {
            collectedColumns.value.push(column)
          }
        },
        unregisterColumn: (column) => {
          const index = collectedColumns.value.indexOf(column)
          if (index > -1) {
            collectedColumns.value.splice(index, 1)
          }
        }
      })
      onMounted(() => {
        doLayout()
      })
      watch(
        () => props.data,
        () => {
          nextTick(() => {
            doLayout()
          })
        }
      )
      watch(
        () => props.currentRowKey,
        (val) => {
          currentRowKey.value = val
        }
      )
      watch(selectedRowKeys, () => {
        emit('selection-change', selectedRows.value, selectedRowKeys.value)
      })
      const __returned__ = {
        props,
        emit,
        slots,
        ns,
        t,
        RenderColumn,
        themeStyle,
        tableRef,
        headerRef,
        bodyRef,
        footerRef,
        currentRowKey,
        sortStates,
        filterStates,
        expandedRowKeys,
        treeExpandedKeys,
        isFullscreen,
        scrollState,
        collectedColumns,
        getRowKeyFn,
        allColumns,
        flatColumns,
        headerRows,
        columnDepth,
        visibleColumns,
        fixedLeftColumns,
        fixedRightColumns,
        treeProcessedData,
        sortedData,
        filteredData,
        selectionWidth,
        expandWidth,
        indexWidth,
        isAnyColumnFixedLeft,
        tableData,
        virtualConfig,
        visibleData,
        offsetTop,
        totalHeight,
        handleVirtualScroll,
        scrollToIndex,
        scrollToRow,
        refreshVirtual,
        isVirtual,
        renderData,
        selectionConfig,
        selectedRowKeys,
        selectedRows,
        isAllSelected,
        isIndeterminate,
        selectionType,
        toggleRowSelection,
        toggleAllSelection,
        clearSelection,
        isRowSelected,
        isRowSelectable,
        dragConfigRef,
        isRowDragEnabled,
        getRowDragAttrs,
        getRowDragClass,
        resizableRef,
        resizeLineLeft,
        resizeLineVisible,
        isColumnResizable,
        handleResizeStart,
        isColumnDragEnabled,
        isColumnDraggable,
        getHeaderDragAttrs,
        getHeaderDragClass,
        doExportData,
        importFile,
        doImportData,
        openImport,
        doPrint,
        printMultiple,
        printTemplate,
        toolbarSlotNames,
        showToolbar,
        tableClasses,
        innerWrapperClasses,
        tableStyle,
        bodyStyle,
        summaryValues,
        isSpanVisible,
        handleScroll,
        handleRowClick,
        handleRowDblclick,
        handleCellClick,
        handleCellDblclick,
        handleHeaderClick,
        handleSort,
        handleToggleExpand,
        handleToggleTreeExpand,
        getRowClass,
        getRowStyle,
        getCellClass,
        getFixedStyle,
        getSpecialFixedStyle,
        getCellStyle,
        getCellContent,
        getSortOrder,
        doLayout,
        refresh,
        scrollTo,
        sort,
        clearSort,
        filter,
        clearFilter,
        setCurrentRow,
        toggleRowExpansion,
        setExpandedRowKeys,
        getExpandedRowKeys,
        getTableData,
        exportData,
        print,
        toggleFullscreen,
        getColumns,
        setColumnVisible,
        resetColumns,
        insertRow,
        removeRow,
        updateRow,
        expose,
        computed,
        ref,
        provide,
        watch,
        onMounted,
        nextTick,
        useSlots,
        get useNamespace() {
          return useNamespace
        },
        get useLocale() {
          return useLocale
        },
        get useComponentTheme() {
          return useComponentTheme
        },
        get tableProps() {
          return tableProps
        },
        get tableEmits() {
          return tableEmits
        },
        get tableContextKey() {
          return tableContextKey
        },
        get getRowKey() {
          return getRowKey
        },
        get flattenColumns() {
          return flattenColumns
        },
        get getColumnDepth() {
          return getColumnDepth
        },
        get buildHeaderRows() {
          return buildHeaderRows
        },
        get formatSize() {
          return formatSize
        },
        get defaultSortMethod() {
          return defaultSortMethod
        },
        get multiValueFilter() {
          return multiValueFilter
        },
        get flattenTreeData() {
          return flattenTreeData
        },
        get calculateSpan() {
          return calculateSpan
        },
        get throttle() {
          return throttle
        },
        get useVirtualScroll() {
          return useVirtualScroll
        },
        get useTableSelection() {
          return useTableSelection
        },
        get useRowDrag() {
          return useRowDrag
        },
        get useColumnResize() {
          return useColumnResize
        },
        get useColumnDrag() {
          return useColumnDrag
        },
        get useTableExport() {
          return useTableExport
        },
        get useTableImport() {
          return useTableImport
        },
        get useTablePrint() {
          return useTablePrint
        },
        get YhTooltip() {
          return YhTooltip
        },
        get YhPagination() {
          return YhPagination
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
