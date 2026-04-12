var __defProp = Object.defineProperty
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
import {
  renderList as _renderList,
  Fragment as _Fragment,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  createCommentVNode as _createCommentVNode,
  toDisplayString as _toDisplayString,
  createElementVNode as _createElementVNode,
  normalizeClass as _normalizeClass,
  mergeProps as _mergeProps,
  withCtx as _withCtx,
  createVNode as _createVNode,
  renderSlot as _renderSlot,
  resolveDynamicComponent as _resolveDynamicComponent,
  createBlock as _createBlock,
  createSlots as _createSlots,
  normalizeStyle as _normalizeStyle,
  vShow as _vShow,
  withDirectives as _withDirectives,
  createTextVNode as _createTextVNode,
  withModifiers as _withModifiers
} from 'vue'
const _hoisted_1 = { class: 'yh-form--grid' }
const _hoisted_2 = {
  key: 0,
  class: 'yh-form-col yh-form-col--24'
}
const _hoisted_3 = ['onClick']
const _hoisted_4 = { class: 'yh-form-schema__group-title-text' }
const _hoisted_5 = { class: 'yh-form--grid' }
const _hoisted_6 = ['title']
const _hoisted_7 = {
  class: 'yh-form--grid',
  style: { flex: '1' }
}
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createBlock(
      $setup['YhForm'],
      _mergeProps(_ctx.formProps, {
        model: $setup.localModel,
        ref: 'formRef',
        class: [$setup.ns.b()],
        onSubmit: _withModifiers($setup.handleSubmit, ['prevent'])
      }),
      {
        default: _withCtx(() => [
          _createElementVNode('div', _hoisted_1, [
            (_openBlock(true),
            _createElementBlock(
              _Fragment,
              null,
              _renderList(_ctx.schema, (item, index) => {
                var _a
                return (
                  _openBlock(),
                  _createElementBlock(
                    _Fragment,
                    { key: index },
                    [
                      _createCommentVNode(' ===== \u5206\u7EC4\u6E32\u67D3 ===== '),
                      $setup.isGroup(item)
                        ? (_openBlock(),
                          _createElementBlock('div', _hoisted_2, [
                            _createElementVNode(
                              'fieldset',
                              _mergeProps(
                                {
                                  class: [
                                    $setup.ns.e('group'),
                                    {
                                      'is-collapsed':
                                        $setup.collapsedMap[$setup.getGroupTitle(item)]
                                    }
                                  ]
                                },
                                { ref_for: true },
                                $setup.getGroupProps(item)
                              ),
                              [
                                $setup.getGroupTitle(item)
                                  ? (_openBlock(),
                                    _createElementBlock(
                                      'legend',
                                      {
                                        key: 0,
                                        class: _normalizeClass($setup.ns.e('group-title')),
                                        onClick: ($event) =>
                                          $setup.isGroupCollapsible(item) &&
                                          $setup.toggleCollapse($setup.getGroupTitle(item))
                                      },
                                      [
                                        _createElementVNode(
                                          'span',
                                          _hoisted_4,
                                          _toDisplayString($setup.getGroupTitle(item)),
                                          1
                                          /* TEXT */
                                        ),
                                        $setup.isGroupCollapsible(item)
                                          ? (_openBlock(),
                                            _createElementBlock(
                                              'span',
                                              {
                                                key: 0,
                                                class: _normalizeClass([
                                                  'yh-form-schema__collapse-icon',
                                                  {
                                                    'is-collapsed':
                                                      $setup.collapsedMap[
                                                        $setup.getGroupTitle(item)
                                                      ]
                                                  }
                                                ])
                                              },
                                              [
                                                ...(_cache[0] ||
                                                  (_cache[0] = [
                                                    _createElementVNode(
                                                      'svg',
                                                      {
                                                        viewBox: '0 0 1024 1024',
                                                        width: '12',
                                                        height: '12'
                                                      },
                                                      [
                                                        _createElementVNode('path', {
                                                          fill: 'currentColor',
                                                          d: 'M512 714.667L85.333 288l60.267-60.267L512 594.133l366.4-366.4L938.667 288z'
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
                                          : _createCommentVNode('v-if', true)
                                      ],
                                      10,
                                      _hoisted_3
                                    ))
                                  : _createCommentVNode('v-if', true),
                                _withDirectives(
                                  _createElementVNode(
                                    'div',
                                    _hoisted_5,
                                    [
                                      (_openBlock(true),
                                      _createElementBlock(
                                        _Fragment,
                                        null,
                                        _renderList($setup.getGroupItems(item), (subItem) => {
                                          var _a2
                                          return (
                                            _openBlock(),
                                            _createElementBlock(
                                              _Fragment,
                                              {
                                                key: subItem.field
                                              },
                                              [
                                                !$setup.isItemHidden(subItem)
                                                  ? (_openBlock(),
                                                    _createElementBlock(
                                                      'div',
                                                      {
                                                        key: 0,
                                                        class: _normalizeClass([
                                                          'yh-form-col',
                                                          subItem.col
                                                            ? `yh-form-col--${subItem.col}`
                                                            : 'yh-form-col--24'
                                                        ]),
                                                        style: _normalizeStyle(
                                                          subItem.span
                                                            ? {
                                                                gridColumn: `span ${subItem.span}`
                                                              }
                                                            : void 0
                                                        )
                                                      },
                                                      [
                                                        _createCommentVNode(
                                                          ' \u5206\u9694\u7EBF\u7C7B\u578B '
                                                        ),
                                                        subItem.type === 'divider'
                                                          ? (_openBlock(),
                                                            _createElementBlock(
                                                              'div',
                                                              {
                                                                key: 0,
                                                                class: _normalizeClass(
                                                                  $setup.ns.e('divider')
                                                                )
                                                              },
                                                              [
                                                                subItem.label
                                                                  ? (_openBlock(),
                                                                    _createElementBlock(
                                                                      'span',
                                                                      {
                                                                        key: 0,
                                                                        class: _normalizeClass(
                                                                          $setup.ns.e(
                                                                            'divider-label'
                                                                          )
                                                                        )
                                                                      },
                                                                      _toDisplayString(
                                                                        subItem.label
                                                                      ),
                                                                      3
                                                                      /* TEXT, CLASS */
                                                                    ))
                                                                  : _createCommentVNode(
                                                                      'v-if',
                                                                      true
                                                                    )
                                                              ],
                                                              2
                                                              /* CLASS */
                                                            ))
                                                          : subItem.type === 'text'
                                                            ? (_openBlock(),
                                                              _createElementBlock(
                                                                _Fragment,
                                                                { key: 1 },
                                                                [
                                                                  _createCommentVNode(
                                                                    ' \u7EAF\u6587\u672C\u5C55\u793A '
                                                                  ),
                                                                  _createVNode(
                                                                    $setup['YhFormItem'],
                                                                    _mergeProps(
                                                                      {
                                                                        label: subItem.label
                                                                      },
                                                                      { ref_for: true },
                                                                      subItem.formItemProps
                                                                    ),
                                                                    {
                                                                      default: _withCtx(() => [
                                                                        _createElementVNode(
                                                                          'span',
                                                                          {
                                                                            class: _normalizeClass(
                                                                              $setup.ns.e(
                                                                                'text-value'
                                                                              )
                                                                            )
                                                                          },
                                                                          _toDisplayString(
                                                                            $setup.get(
                                                                              $setup.localModel,
                                                                              subItem.field
                                                                            )
                                                                          ),
                                                                          3
                                                                          /* TEXT, CLASS */
                                                                        )
                                                                      ]),
                                                                      _: 2
                                                                      /* DYNAMIC */
                                                                    },
                                                                    1040,
                                                                    ['label']
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
                                                                    ' \u666E\u901A\u5B57\u6BB5 '
                                                                  ),
                                                                  _createVNode(
                                                                    $setup['YhFormItem'],
                                                                    _mergeProps(
                                                                      { ref_for: true },
                                                                      subItem.formItemProps,
                                                                      {
                                                                        label: subItem.label,
                                                                        prop: subItem.field,
                                                                        required:
                                                                          $setup.resolveRequired(
                                                                            subItem
                                                                          ),
                                                                        rules:
                                                                          $setup.resolveRules(
                                                                            subItem
                                                                          )
                                                                      }
                                                                    ),
                                                                    _createSlots(
                                                                      {
                                                                        default: _withCtx(() => [
                                                                          _ctx.$slots[
                                                                            `field-${subItem.field}`
                                                                          ]
                                                                            ? _renderSlot(
                                                                                _ctx.$slots,
                                                                                `field-${subItem.field}`,
                                                                                {
                                                                                  key: 0,
                                                                                  model:
                                                                                    $setup.localModel,
                                                                                  item: subItem,
                                                                                  handleUpdate:
                                                                                    $setup.handleUpdate
                                                                                }
                                                                              )
                                                                            : subItem.render
                                                                              ? (_openBlock(),
                                                                                _createElementBlock(
                                                                                  _Fragment,
                                                                                  { key: 1 },
                                                                                  [
                                                                                    _createCommentVNode(
                                                                                      ' render \u51FD\u6570 '
                                                                                    ),
                                                                                    (_openBlock(),
                                                                                    _createBlock(
                                                                                      _resolveDynamicComponent(
                                                                                        () =>
                                                                                          subItem.render(
                                                                                            $setup.localModel
                                                                                          )
                                                                                      )
                                                                                    ))
                                                                                  ],
                                                                                  64
                                                                                  /* STABLE_FRAGMENT */
                                                                                ))
                                                                              : subItem.component
                                                                                ? (_openBlock(),
                                                                                  _createElementBlock(
                                                                                    _Fragment,
                                                                                    { key: 2 },
                                                                                    [
                                                                                      _createCommentVNode(
                                                                                        ' \u9ED8\u8BA4\u7EC4\u4EF6\u6E32\u67D3 '
                                                                                      ),
                                                                                      (_openBlock(),
                                                                                      _createBlock(
                                                                                        _resolveDynamicComponent(
                                                                                          $setup.getComponent(
                                                                                            subItem.component
                                                                                          )
                                                                                        ),
                                                                                        _mergeProps(
                                                                                          {
                                                                                            ref_for: true
                                                                                          },
                                                                                          $setup.resolveProps(
                                                                                            subItem
                                                                                          ),
                                                                                          {
                                                                                            'model-value':
                                                                                              $setup.get(
                                                                                                $setup.localModel,
                                                                                                subItem.field
                                                                                              ),
                                                                                            'onUpdate:modelValue':
                                                                                              (
                                                                                                val
                                                                                              ) =>
                                                                                                $setup.handleUpdate(
                                                                                                  subItem.field,
                                                                                                  val
                                                                                                )
                                                                                          }
                                                                                        ),
                                                                                        _createSlots(
                                                                                          {
                                                                                            _: 2
                                                                                            /* DYNAMIC */
                                                                                          },
                                                                                          [
                                                                                            _renderList(
                                                                                              subItem.slots,
                                                                                              (
                                                                                                slotContent,
                                                                                                slotName
                                                                                              ) => {
                                                                                                return {
                                                                                                  name: slotName,
                                                                                                  fn: _withCtx(
                                                                                                    (
                                                                                                      slotProps
                                                                                                    ) => [
                                                                                                      String(
                                                                                                        slotName
                                                                                                      ) !==
                                                                                                      'label'
                                                                                                        ? (_openBlock(),
                                                                                                          _createBlock(
                                                                                                            _resolveDynamicComponent(
                                                                                                              slotContent
                                                                                                            ),
                                                                                                            _mergeProps(
                                                                                                              {
                                                                                                                key: 0,
                                                                                                                ref_for: true
                                                                                                              },
                                                                                                              slotProps
                                                                                                            ),
                                                                                                            null,
                                                                                                            16
                                                                                                            /* FULL_PROPS */
                                                                                                          ))
                                                                                                        : _createCommentVNode(
                                                                                                            'v-if',
                                                                                                            true
                                                                                                          )
                                                                                                    ]
                                                                                                  )
                                                                                                }
                                                                                              }
                                                                                            )
                                                                                          ]
                                                                                        ),
                                                                                        1040,
                                                                                        [
                                                                                          'model-value',
                                                                                          'onUpdate:modelValue'
                                                                                        ]
                                                                                      ))
                                                                                    ],
                                                                                    64
                                                                                    /* STABLE_FRAGMENT */
                                                                                  ))
                                                                                : _createCommentVNode(
                                                                                    'v-if',
                                                                                    true
                                                                                  )
                                                                        ]),
                                                                        _: 2
                                                                        /* DYNAMIC */
                                                                      },
                                                                      [
                                                                        !_ctx.$slots[
                                                                          `field-${subItem.field}`
                                                                        ] &&
                                                                        (((_a2 = subItem.slots) ==
                                                                        null
                                                                          ? void 0
                                                                          : _a2.label) ||
                                                                          _ctx.$slots[
                                                                            `label-${subItem.field}`
                                                                          ])
                                                                          ? {
                                                                              name: 'label',
                                                                              fn: _withCtx(() => [
                                                                                _renderSlot(
                                                                                  _ctx.$slots,
                                                                                  `label-${subItem.field}`,
                                                                                  {
                                                                                    model:
                                                                                      $setup.localModel,
                                                                                    item: subItem
                                                                                  },
                                                                                  () => {
                                                                                    var _a3
                                                                                    return [
                                                                                      (_openBlock(),
                                                                                      _createBlock(
                                                                                        _resolveDynamicComponent(
                                                                                          (_a3 =
                                                                                            subItem.slots) ==
                                                                                            null
                                                                                            ? void 0
                                                                                            : _a3.label
                                                                                        ),
                                                                                        {
                                                                                          model:
                                                                                            $setup.localModel,
                                                                                          field:
                                                                                            subItem.field
                                                                                        },
                                                                                        null,
                                                                                        8,
                                                                                        [
                                                                                          'model',
                                                                                          'field'
                                                                                        ]
                                                                                      ))
                                                                                    ]
                                                                                  }
                                                                                ),
                                                                                subItem.tooltip
                                                                                  ? (_openBlock(),
                                                                                    _createElementBlock(
                                                                                      'span',
                                                                                      {
                                                                                        key: 0,
                                                                                        class:
                                                                                          _normalizeClass(
                                                                                            $setup.ns.e(
                                                                                              'tooltip'
                                                                                            )
                                                                                          ),
                                                                                        title:
                                                                                          subItem.tooltip
                                                                                      },
                                                                                      '?',
                                                                                      10,
                                                                                      _hoisted_6
                                                                                    ))
                                                                                  : _createCommentVNode(
                                                                                      'v-if',
                                                                                      true
                                                                                    )
                                                                              ]),
                                                                              key: '0'
                                                                            }
                                                                          : void 0
                                                                      ]
                                                                    ),
                                                                    1040,
                                                                    [
                                                                      'label',
                                                                      'prop',
                                                                      'required',
                                                                      'rules'
                                                                    ]
                                                                  )
                                                                ],
                                                                64
                                                                /* STABLE_FRAGMENT */
                                                              ))
                                                      ],
                                                      6
                                                      /* CLASS, STYLE */
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
                                    512
                                    /* NEED_PATCH */
                                  ),
                                  [[_vShow, !$setup.collapsedMap[$setup.getGroupTitle(item)]]]
                                )
                              ],
                              16
                              /* FULL_PROPS */
                            )
                          ]))
                        : (_openBlock(),
                          _createElementBlock(
                            _Fragment,
                            { key: 1 },
                            [
                              _createCommentVNode(
                                ' ===== \u9876\u5C42\u666E\u901A\u9879\u6E32\u67D3 ===== '
                              ),
                              !$setup.isItemHidden(item)
                                ? (_openBlock(),
                                  _createElementBlock(
                                    'div',
                                    {
                                      key: 0,
                                      class: _normalizeClass([
                                        'yh-form-col',
                                        item.col ? `yh-form-col--${item.col}` : 'yh-form-col--24'
                                      ])
                                    },
                                    [
                                      _createCommentVNode(' \u5206\u9694\u7EBF\u7C7B\u578B '),
                                      item.type === 'divider'
                                        ? (_openBlock(),
                                          _createElementBlock(
                                            'div',
                                            {
                                              key: 0,
                                              class: _normalizeClass($setup.ns.e('divider'))
                                            },
                                            [
                                              item.label
                                                ? (_openBlock(),
                                                  _createElementBlock(
                                                    'span',
                                                    {
                                                      key: 0,
                                                      class: _normalizeClass(
                                                        $setup.ns.e('divider-label')
                                                      )
                                                    },
                                                    _toDisplayString(item.label),
                                                    3
                                                    /* TEXT, CLASS */
                                                  ))
                                                : _createCommentVNode('v-if', true)
                                            ],
                                            2
                                            /* CLASS */
                                          ))
                                        : item.type === 'text'
                                          ? (_openBlock(),
                                            _createElementBlock(
                                              _Fragment,
                                              { key: 1 },
                                              [
                                                _createCommentVNode(
                                                  ' \u7EAF\u6587\u672C\u5C55\u793A '
                                                ),
                                                _createVNode(
                                                  $setup['YhFormItem'],
                                                  _mergeProps(
                                                    {
                                                      label: item.label
                                                    },
                                                    { ref_for: true },
                                                    item.formItemProps
                                                  ),
                                                  {
                                                    default: _withCtx(() => [
                                                      _createElementVNode(
                                                        'span',
                                                        {
                                                          class: _normalizeClass(
                                                            $setup.ns.e('text-value')
                                                          )
                                                        },
                                                        _toDisplayString(
                                                          $setup.getEmptyValue(item)
                                                        ),
                                                        3
                                                        /* TEXT, CLASS */
                                                      )
                                                    ]),
                                                    _: 2
                                                    /* DYNAMIC */
                                                  },
                                                  1040,
                                                  ['label']
                                                )
                                              ],
                                              64
                                              /* STABLE_FRAGMENT */
                                            ))
                                          : item.type === 'list'
                                            ? (_openBlock(),
                                              _createElementBlock(
                                                _Fragment,
                                                { key: 2 },
                                                [
                                                  _createCommentVNode(' \u52A8\u6001\u5217\u8868 '),
                                                  _createVNode(
                                                    $setup['YhFormItem'],
                                                    _mergeProps(
                                                      {
                                                        label: item.label
                                                      },
                                                      { ref_for: true },
                                                      item.formItemProps
                                                    ),
                                                    {
                                                      default: _withCtx(() => {
                                                        var _a2
                                                        return [
                                                          _createElementVNode(
                                                            'div',
                                                            {
                                                              class: _normalizeClass(
                                                                $setup.ns.e('list')
                                                              )
                                                            },
                                                            [
                                                              (_openBlock(true),
                                                              _createElementBlock(
                                                                _Fragment,
                                                                null,
                                                                _renderList(
                                                                  $setup.get(
                                                                    $setup.localModel,
                                                                    item.field
                                                                  ) || [],
                                                                  (row, rowIdx) => {
                                                                    var _a3
                                                                    return (
                                                                      _openBlock(),
                                                                      _createElementBlock(
                                                                        'div',
                                                                        {
                                                                          key: rowIdx,
                                                                          class: _normalizeClass(
                                                                            $setup.ns.e('list-row')
                                                                          )
                                                                        },
                                                                        [
                                                                          _createElementVNode(
                                                                            'div',
                                                                            _hoisted_7,
                                                                            [
                                                                              (_openBlock(true),
                                                                              _createElementBlock(
                                                                                _Fragment,
                                                                                null,
                                                                                _renderList(
                                                                                  item.listSchema,
                                                                                  (sub) => {
                                                                                    return (
                                                                                      _openBlock(),
                                                                                      _createElementBlock(
                                                                                        'div',
                                                                                        {
                                                                                          key: sub.field,
                                                                                          class:
                                                                                            _normalizeClass(
                                                                                              [
                                                                                                'yh-form-col',
                                                                                                sub.col
                                                                                                  ? `yh-form-col--${sub.col}`
                                                                                                  : 'yh-form-col--24'
                                                                                              ]
                                                                                            )
                                                                                        },
                                                                                        [
                                                                                          _createVNode(
                                                                                            $setup[
                                                                                              'YhFormItem'
                                                                                            ],
                                                                                            {
                                                                                              label:
                                                                                                sub.label,
                                                                                              prop: `${item.field}.${rowIdx}.${sub.field}`,
                                                                                              required:
                                                                                                $setup.resolveRequired(
                                                                                                  sub
                                                                                                ),
                                                                                              rules:
                                                                                                $setup.resolveRules(
                                                                                                  sub
                                                                                                )
                                                                                            },
                                                                                            {
                                                                                              default:
                                                                                                _withCtx(
                                                                                                  () => [
                                                                                                    sub.component
                                                                                                      ? (_openBlock(),
                                                                                                        _createBlock(
                                                                                                          _resolveDynamicComponent(
                                                                                                            $setup.getComponent(
                                                                                                              sub.component
                                                                                                            )
                                                                                                          ),
                                                                                                          _mergeProps(
                                                                                                            {
                                                                                                              key: 0,
                                                                                                              ref_for: true
                                                                                                            },
                                                                                                            $setup.resolveProps(
                                                                                                              sub
                                                                                                            ),
                                                                                                            {
                                                                                                              'model-value':
                                                                                                                row[
                                                                                                                  sub
                                                                                                                    .field
                                                                                                                ],
                                                                                                              'onUpdate:modelValue':
                                                                                                                (
                                                                                                                  val
                                                                                                                ) =>
                                                                                                                  $setup.handleUpdate(
                                                                                                                    `${item.field}.${rowIdx}.${sub.field}`,
                                                                                                                    val
                                                                                                                  )
                                                                                                            }
                                                                                                          ),
                                                                                                          null,
                                                                                                          16,
                                                                                                          [
                                                                                                            'model-value',
                                                                                                            'onUpdate:modelValue'
                                                                                                          ]
                                                                                                        ))
                                                                                                      : _renderSlot(
                                                                                                          _ctx.$slots,
                                                                                                          `field-${item.field}-${sub.field}`,
                                                                                                          {
                                                                                                            key: 1,
                                                                                                            row,
                                                                                                            index:
                                                                                                              rowIdx,
                                                                                                            item: sub
                                                                                                          }
                                                                                                        )
                                                                                                  ]
                                                                                                ),
                                                                                              _: 2
                                                                                              /* DYNAMIC */
                                                                                            },
                                                                                            1032,
                                                                                            [
                                                                                              'label',
                                                                                              'prop',
                                                                                              'required',
                                                                                              'rules'
                                                                                            ]
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
                                                                            ]
                                                                          ),
                                                                          _createVNode(
                                                                            $setup['YhButton'],
                                                                            {
                                                                              type: 'danger',
                                                                              text: '',
                                                                              class:
                                                                                _normalizeClass(
                                                                                  $setup.ns.e(
                                                                                    'list-delete'
                                                                                  )
                                                                                ),
                                                                              disabled:
                                                                                ((_a3 =
                                                                                  item.listProps) ==
                                                                                null
                                                                                  ? void 0
                                                                                  : _a3.min) !==
                                                                                  void 0 &&
                                                                                (
                                                                                  $setup.get(
                                                                                    $setup.localModel,
                                                                                    item.field
                                                                                  ) || []
                                                                                ).length <=
                                                                                  item.listProps
                                                                                    .min,
                                                                              onClick: ($event) =>
                                                                                $setup.handleDeleteListItem(
                                                                                  item,
                                                                                  rowIdx
                                                                                )
                                                                            },
                                                                            {
                                                                              default: _withCtx(
                                                                                () => {
                                                                                  var _a4
                                                                                  return [
                                                                                    _createTextVNode(
                                                                                      _toDisplayString(
                                                                                        (
                                                                                          (_a4 =
                                                                                            item.listProps) ==
                                                                                          null
                                                                                            ? void 0
                                                                                            : _a4.addButtonText
                                                                                        )
                                                                                          ? '\u5220\u9664'
                                                                                          : '\u5220\u9664'
                                                                                      ),
                                                                                      1
                                                                                      /* TEXT */
                                                                                    )
                                                                                  ]
                                                                                }
                                                                              ),
                                                                              _: 2
                                                                              /* DYNAMIC */
                                                                            },
                                                                            1032,
                                                                            [
                                                                              'class',
                                                                              'disabled',
                                                                              'onClick'
                                                                            ]
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
                                                              _createVNode(
                                                                $setup['YhButton'],
                                                                {
                                                                  class: _normalizeClass(
                                                                    $setup.ns.e('list-add')
                                                                  ),
                                                                  disabled:
                                                                    ((_a2 = item.listProps) == null
                                                                      ? void 0
                                                                      : _a2.max) !== void 0 &&
                                                                    (
                                                                      $setup.get(
                                                                        $setup.localModel,
                                                                        item.field
                                                                      ) || []
                                                                    ).length >= item.listProps.max,
                                                                  onClick: ($event) =>
                                                                    $setup.handleAddListItem(item)
                                                                },
                                                                {
                                                                  default: _withCtx(() => {
                                                                    var _a3, _b
                                                                    return [
                                                                      _createTextVNode(
                                                                        ' + ' +
                                                                          _toDisplayString(
                                                                            (_b =
                                                                              (_a3 =
                                                                                item.listProps) ==
                                                                              null
                                                                                ? void 0
                                                                                : _a3.addButtonText) !=
                                                                              null
                                                                              ? _b
                                                                              : '\u6DFB\u52A0\u4E00\u9879'
                                                                          ),
                                                                        1
                                                                        /* TEXT */
                                                                      )
                                                                    ]
                                                                  }),
                                                                  _: 2
                                                                  /* DYNAMIC */
                                                                },
                                                                1032,
                                                                ['class', 'disabled', 'onClick']
                                                              ),
                                                              _renderSlot(
                                                                _ctx.$slots,
                                                                `list-footer-${item.field}`,
                                                                {
                                                                  model: $setup.localModel,
                                                                  item
                                                                }
                                                              )
                                                            ],
                                                            2
                                                            /* CLASS */
                                                          )
                                                        ]
                                                      }),
                                                      _: 2
                                                      /* DYNAMIC */
                                                    },
                                                    1040,
                                                    ['label']
                                                  )
                                                ],
                                                64
                                                /* STABLE_FRAGMENT */
                                              ))
                                            : (_openBlock(),
                                              _createElementBlock(
                                                _Fragment,
                                                { key: 3 },
                                                [
                                                  _createCommentVNode(' \u666E\u901A\u5B57\u6BB5 '),
                                                  _createVNode(
                                                    $setup['YhFormItem'],
                                                    _mergeProps(
                                                      { ref_for: true },
                                                      item.formItemProps,
                                                      {
                                                        label: item.label,
                                                        prop: item.field,
                                                        required: $setup.resolveRequired(item),
                                                        rules: $setup.resolveRules(item)
                                                      }
                                                    ),
                                                    _createSlots(
                                                      {
                                                        default: _withCtx(() => [
                                                          _ctx.$slots[`field-${item.field}`]
                                                            ? _renderSlot(
                                                                _ctx.$slots,
                                                                `field-${item.field}`,
                                                                {
                                                                  key: 0,
                                                                  model: $setup.localModel,
                                                                  item,
                                                                  handleUpdate: $setup.handleUpdate
                                                                }
                                                              )
                                                            : item.render
                                                              ? (_openBlock(),
                                                                _createElementBlock(
                                                                  _Fragment,
                                                                  { key: 1 },
                                                                  [
                                                                    _createCommentVNode(
                                                                      ' render \u51FD\u6570 '
                                                                    ),
                                                                    (_openBlock(),
                                                                    _createBlock(
                                                                      _resolveDynamicComponent(() =>
                                                                        item.render(
                                                                          $setup.localModel
                                                                        )
                                                                      )
                                                                    ))
                                                                  ],
                                                                  64
                                                                  /* STABLE_FRAGMENT */
                                                                ))
                                                              : item.component
                                                                ? (_openBlock(),
                                                                  _createElementBlock(
                                                                    _Fragment,
                                                                    { key: 2 },
                                                                    [
                                                                      _createCommentVNode(
                                                                        ' \u9ED8\u8BA4\u7EC4\u4EF6\u6E32\u67D3 '
                                                                      ),
                                                                      (_openBlock(),
                                                                      _createBlock(
                                                                        _resolveDynamicComponent(
                                                                          $setup.getComponent(
                                                                            item.component
                                                                          )
                                                                        ),
                                                                        _mergeProps(
                                                                          { ref_for: true },
                                                                          $setup.resolveProps(item),
                                                                          {
                                                                            'model-value':
                                                                              $setup.get(
                                                                                $setup.localModel,
                                                                                item.field
                                                                              ),
                                                                            'onUpdate:modelValue': (
                                                                              val
                                                                            ) =>
                                                                              $setup.handleUpdate(
                                                                                item.field,
                                                                                val
                                                                              )
                                                                          }
                                                                        ),
                                                                        _createSlots(
                                                                          {
                                                                            _: 2
                                                                            /* DYNAMIC */
                                                                          },
                                                                          [
                                                                            _renderList(
                                                                              item.slots,
                                                                              (
                                                                                slotContent,
                                                                                slotName
                                                                              ) => {
                                                                                return {
                                                                                  name: slotName,
                                                                                  fn: _withCtx(
                                                                                    (slotProps) => [
                                                                                      String(
                                                                                        slotName
                                                                                      ) !== 'label'
                                                                                        ? (_openBlock(),
                                                                                          _createBlock(
                                                                                            _resolveDynamicComponent(
                                                                                              slotContent
                                                                                            ),
                                                                                            _mergeProps(
                                                                                              {
                                                                                                key: 0,
                                                                                                ref_for: true
                                                                                              },
                                                                                              slotProps
                                                                                            ),
                                                                                            null,
                                                                                            16
                                                                                            /* FULL_PROPS */
                                                                                          ))
                                                                                        : _createCommentVNode(
                                                                                            'v-if',
                                                                                            true
                                                                                          )
                                                                                    ]
                                                                                  )
                                                                                }
                                                                              }
                                                                            )
                                                                          ]
                                                                        ),
                                                                        1040,
                                                                        [
                                                                          'model-value',
                                                                          'onUpdate:modelValue'
                                                                        ]
                                                                      ))
                                                                    ],
                                                                    64
                                                                    /* STABLE_FRAGMENT */
                                                                  ))
                                                                : _createCommentVNode('v-if', true)
                                                        ]),
                                                        _: 2
                                                        /* DYNAMIC */
                                                      },
                                                      [
                                                        !_ctx.$slots[`field-${item.field}`] &&
                                                        (((_a = item.slots) == null
                                                          ? void 0
                                                          : _a.label) ||
                                                          _ctx.$slots[`label-${item.field}`])
                                                          ? {
                                                              name: 'label',
                                                              fn: _withCtx(() => [
                                                                _renderSlot(
                                                                  _ctx.$slots,
                                                                  `label-${item.field}`,
                                                                  {
                                                                    model: $setup.localModel,
                                                                    item
                                                                  },
                                                                  () => {
                                                                    var _a2
                                                                    return [
                                                                      (_openBlock(),
                                                                      _createBlock(
                                                                        _resolveDynamicComponent(
                                                                          (_a2 = item.slots) == null
                                                                            ? void 0
                                                                            : _a2.label
                                                                        ),
                                                                        {
                                                                          model: $setup.localModel,
                                                                          field: item.field
                                                                        },
                                                                        null,
                                                                        8,
                                                                        ['model', 'field']
                                                                      ))
                                                                    ]
                                                                  }
                                                                )
                                                              ]),
                                                              key: '0'
                                                            }
                                                          : void 0
                                                      ]
                                                    ),
                                                    1040,
                                                    ['label', 'prop', 'required', 'rules']
                                                  )
                                                ],
                                                64
                                                /* STABLE_FRAGMENT */
                                              ))
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
                    64
                    /* STABLE_FRAGMENT */
                  )
                )
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ]),
          _createCommentVNode(' Footer \u63D2\u69FD '),
          _ctx.$slots.footer
            ? (_openBlock(),
              _createElementBlock(
                'div',
                {
                  key: 0,
                  class: _normalizeClass($setup.ns.e('footer'))
                },
                [
                  _renderSlot(_ctx.$slots, 'footer', {
                    model: $setup.localModel,
                    formRef: $setup.footerFormRef
                  })
                ],
                2
                /* CLASS */
              ))
            : _createCommentVNode('v-if', true)
        ]),
        _: 3
        /* FORWARDED */
      },
      16,
      ['model', 'class']
    )
  )
}
import { ref, watch, reactive, toRaw } from 'vue'
import YhForm from './form.js'
import YhFormItem from './form-item.js'
import YhButton from '../../button/src/button.js'
import { formSchemaProps } from './form-schema-meta.js'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { get, set } from '../../../utils/index.js'
const __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhFormSchema'
  },
  {
    __name: 'form-schema',
    props: formSchemaProps,
    emits: ['update:modelValue', 'submit', 'change', 'validate'],
    setup(__props, { expose: __expose, emit: __emit }) {
      const props = __props
      const emit = __emit
      const ns = useNamespace('form-schema')
      const formRef = ref()
      const localModel = reactive(__spreadValues({}, props.modelValue))
      watch(
        () => props.modelValue,
        (val) => {
          if (!val) return
          for (const key of Object.keys(val)) {
            if (localModel[key] !== val[key]) {
              localModel[key] = val[key]
            }
          }
          for (const key of Object.keys(localModel)) {
            if (!(key in val)) {
              delete localModel[key]
            }
          }
        },
        { deep: true }
      )
      const isGroup = (item) => {
        return 'items' in item && Array.isArray(item.items)
      }
      const getGroupTitle = (item) => (isGroup(item) ? item.title || '' : '')
      const getGroupProps = (item) => (isGroup(item) ? item.props : void 0)
      const isGroupCollapsible = (item) => (isGroup(item) ? !!item.collapsible : false)
      const getGroupItems = (item) => (isGroup(item) ? item.items : [])
      const optionMap = reactive({})
      const collapsedMap = reactive({})
      const loadingMap = reactive({})
      const initDefaultValues = () => {
        const traverse = (items) => {
          for (const item of items) {
            if (isGroup(item)) {
              traverse(item.items)
            } else {
              const schemaItem = item
              if (
                schemaItem.defaultValue !== void 0 &&
                get(localModel, schemaItem.field) === void 0
              ) {
                set(localModel, schemaItem.field, schemaItem.defaultValue)
                emit('update:modelValue', __spreadValues({}, toRaw(localModel)))
              }
            }
          }
        }
        traverse(props.schema)
      }
      const initAsyncOptions = async () => {
        const traverse = async (items) => {
          for (const item of items) {
            if (isGroup(item)) {
              await traverse(item.items)
            } else {
              const schemaItem = item
              if (schemaItem.asyncOptions && !optionMap[schemaItem.field]) {
                try {
                  loadingMap[schemaItem.field] = true
                  optionMap[schemaItem.field] = await schemaItem.asyncOptions()
                } catch (e) {
                  console.error(`[YhFormSchema] Failed to load options for ${schemaItem.field}`, e)
                } finally {
                  loadingMap[schemaItem.field] = false
                }
              }
            }
          }
        }
        await traverse(props.schema)
      }
      watch(
        () => props.schema,
        (val) => {
          val.forEach((item) => {
            var _a
            if (isGroup(item) && item.title) {
              if (collapsedMap[item.title] === void 0) {
                collapsedMap[item.title] = (_a = item.collapsed) != null ? _a : false
              }
            }
          })
          initDefaultValues()
          initAsyncOptions()
        },
        { immediate: true, deep: true }
      )
      const toggleCollapse = (title) => {
        if (title) {
          collapsedMap[title] = !collapsedMap[title]
        }
      }
      const resolveProps = (item) => {
        var _a, _b
        let finalProps = {}
        if (typeof item.props === 'function') {
          finalProps = __spreadValues({}, item.props(localModel))
        } else {
          finalProps = __spreadValues({}, item.props || {})
        }
        if (item.asyncOptions && optionMap[item.field]) {
          const propName = item.optionProp || 'options'
          finalProps[propName] = optionMap[item.field]
        }
        if (item.asyncOptions) {
          finalProps.loading = (_a = loadingMap[item.field]) != null ? _a : false
        }
        if (item.disabled !== void 0) {
          finalProps.disabled =
            typeof item.disabled === 'function' ? item.disabled(localModel) : item.disabled
        }
        if ((_b = props.formProps) == null ? void 0 : _b.disabled) {
          finalProps.disabled = true
        }
        return finalProps
      }
      const resolveRequired = (item) => {
        if (typeof item.required === 'function') {
          return !!item.required(localModel)
        }
        return !!item.required
      }
      const resolveRules = (item) => {
        let sourceRules = []
        if (typeof item.rules === 'function') {
          sourceRules = item.rules(localModel) || []
        } else {
          sourceRules = item.rules || []
        }
        const rules = [...sourceRules]
        const isRequired = resolveRequired(item)
        if (isRequired && !rules.some((r) => r.required)) {
          const isBoolean = typeof item.defaultValue === 'boolean' || item.component === 'switch'
          rules.unshift({
            required: true,
            type: isBoolean ? 'boolean' : void 0,
            message: `${item.label || item.field} \u4E0D\u80FD\u4E3A\u7A7A`,
            trigger: ['blur', 'change']
          })
        }
        return rules.length > 0 ? rules : void 0
      }
      const getComponent = (comp) => {
        if (typeof comp === 'string') {
          const map = {
            input: 'yh-input',
            'input-number': 'yh-input-number',
            'input-tag': 'yh-input-tag',
            autocomplete: 'yh-autocomplete',
            checkbox: 'yh-checkbox',
            'checkbox-group': 'yh-checkbox-group',
            radio: 'yh-radio',
            'radio-group': 'yh-radio-group',
            select: 'yh-select',
            cascader: 'yh-cascader',
            switch: 'yh-switch',
            slider: 'yh-slider',
            rate: 'yh-rate',
            'date-picker': 'yh-date-picker',
            'time-picker': 'yh-time-picker',
            'color-picker': 'yh-color-picker',
            'time-select': 'yh-time-select',
            transfer: 'yh-transfer',
            'tree-select': 'yh-tree-select',
            mention: 'yh-mention',
            tag: 'yh-tag',
            upload: 'yh-upload'
          }
          return map[comp] || comp
        }
        return comp
      }
      const isItemHidden = (item) => {
        if (typeof item.hidden === 'function') {
          return item.hidden(localModel)
        }
        return item.hidden === true
      }
      const getEmptyValue = (item) => {
        var _a
        const val = get(localModel, item.field)
        if (val === null || val === void 0 || val === '') {
          return (_a = item.emptyValue) != null ? _a : '-'
        }
        return val
      }
      const handleAddListItem = (item) => {
        var _a, _b, _c
        const currentList = get(localModel, item.field) || []
        const max = (_a = item.listProps) == null ? void 0 : _a.max
        if (max !== void 0 && currentList.length >= max) return
        const canAdd = (_b = item.listProps) == null ? void 0 : _b.allowAdd
        if (canAdd !== void 0) {
          const allow = typeof canAdd === 'function' ? canAdd(localModel) : canAdd
          if (!allow) return
        }
        const newItem = {}
        ;(_c = item.listSchema) == null
          ? void 0
          : _c.forEach((sub) => {
              if (sub.defaultValue !== void 0) {
                newItem[sub.field] = sub.defaultValue
              }
            })
        const newList = [...currentList, newItem]
        handleUpdate(item.field, newList)
      }
      const handleDeleteListItem = (item, index) => {
        var _a, _b
        const currentList = get(localModel, item.field) || []
        const min = (_a = item.listProps) == null ? void 0 : _a.min
        if (min !== void 0 && currentList.length <= min) return
        const canDelete = (_b = item.listProps) == null ? void 0 : _b.allowDelete
        if (canDelete !== void 0) {
          const allow = typeof canDelete === 'function' ? canDelete(localModel, index) : canDelete
          if (!allow) return
        }
        const newList = [...currentList]
        newList.splice(index, 1)
        handleUpdate(item.field, newList)
      }
      const handleUpdate = (field, val) => {
        set(localModel, field, val)
        const snapshot = __spreadValues({}, toRaw(localModel))
        emit('update:modelValue', snapshot)
        emit('change', field, val, snapshot)
      }
      const handleSubmit = () => {
        emit('submit', __spreadValues({}, toRaw(localModel)))
      }
      const footerFormRef = {
        validate: (...args) => {
          var _a
          return (_a = formRef.value) == null ? void 0 : _a.validate(...args)
        },
        resetFields: (...args) => {
          var _a
          return (_a = formRef.value) == null ? void 0 : _a.resetFields(...args)
        },
        clearValidate: (...args) => {
          var _a
          return (_a = formRef.value) == null ? void 0 : _a.clearValidate(...args)
        },
        scrollToField: (field) => {
          var _a
          return (_a = formRef.value) == null ? void 0 : _a.scrollToField(field)
        }
      }
      __expose({
        /** 触发校验，支持指定字段 */
        validate: (fields, callback) => {
          var _a
          return (_a = formRef.value) == null ? void 0 : _a.validate(fields, callback)
        },
        /** 重置字段（恢复初始值并清除校验），支持指定字段 */
        resetFields: (fields) => {
          var _a
          return (_a = formRef.value) == null ? void 0 : _a.resetFields(fields)
        },
        /** 清除指定字段校验结果 */
        clearValidate: (fields) => {
          var _a
          return (_a = formRef.value) == null ? void 0 : _a.clearValidate(fields)
        },
        /** 滚动到指定字段 */
        scrollToField: (field) => {
          var _a
          return (_a = formRef.value) == null ? void 0 : _a.scrollToField(field)
        },
        /** 获取当前表单数据快照 */
        getModel: () => __spreadValues({}, toRaw(localModel)),
        /** 动态更新单个字段值 */
        setFieldValue: (field, val) => handleUpdate(field, val),
        /** 底层 form 实例 */
        formRef
      })
      const __returned__ = {
        props,
        emit,
        ns,
        formRef,
        localModel,
        isGroup,
        getGroupTitle,
        getGroupProps,
        isGroupCollapsible,
        getGroupItems,
        optionMap,
        collapsedMap,
        loadingMap,
        initDefaultValues,
        initAsyncOptions,
        toggleCollapse,
        resolveProps,
        resolveRequired,
        resolveRules,
        getComponent,
        isItemHidden,
        getEmptyValue,
        handleAddListItem,
        handleDeleteListItem,
        handleUpdate,
        handleSubmit,
        footerFormRef,
        ref,
        watch,
        reactive,
        toRaw,
        YhForm,
        YhFormItem,
        YhButton,
        get formSchemaProps() {
          return formSchemaProps
        },
        get useNamespace() {
          return useNamespace
        },
        get get() {
          return get
        },
        get set() {
          return set
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
