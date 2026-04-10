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
  createVNode as _createVNode,
  normalizeClass as _normalizeClass,
  createElementVNode as _createElementVNode,
  vModelText as _vModelText,
  withDirectives as _withDirectives,
  createTextVNode as _createTextVNode,
  withCtx as _withCtx,
  renderList as _renderList,
  Fragment as _Fragment,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  toDisplayString as _toDisplayString,
  normalizeStyle as _normalizeStyle,
  createCommentVNode as _createCommentVNode,
  renderSlot as _renderSlot,
  withModifiers as _withModifiers,
  createBlock as _createBlock
} from 'vue'
const _hoisted_1 = ['min']
const _hoisted_2 = ['onClick']
const _hoisted_3 = {
  key: 1,
  style: { display: 'inline-block', width: '14px' }
}
const _hoisted_4 = {
  key: 0,
  style: { overflow: 'hidden', 'text-overflow': 'ellipsis', 'white-space': 'nowrap' }
}
const _hoisted_5 = ['d']
const _hoisted_6 = ['onClick', 'onDblclick', 'onMousedown']
const _hoisted_7 = ['onMousedown']
const _hoisted_8 = ['onMousedown']
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      'div',
      {
        ref: 'ganttRef',
        class: _normalizeClass([
          $setup.ns.b(),
          $setup.ns.is('bordered', $props.bordered),
          $setup.ns.is('loading', $props.loading)
        ]),
        style: _normalizeStyle($setup.themeStyle)
      },
      [
        _createElementVNode(
          'div',
          {
            class: _normalizeClass($setup.ns.e('toolbar'))
          },
          [
            _createElementVNode(
              'div',
              {
                class: _normalizeClass($setup.ns.e('toolbar-left'))
              },
              [
                _createVNode(
                  $setup['YhInput'],
                  {
                    id: 'gantt-search-input',
                    modelValue: $setup.searchKeyword,
                    'onUpdate:modelValue':
                      _cache[0] || (_cache[0] = ($event) => ($setup.searchKeyword = $event)),
                    placeholder: '\u641C\u7D22\u4EFB\u52A1...',
                    'prefix-icon': 'search',
                    size: 'small',
                    style: { width: '200px' }
                  },
                  null,
                  8,
                  ['modelValue']
                )
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
                _cache[7] ||
                  (_cache[7] = _createElementVNode(
                    'span',
                    { style: { 'font-size': '12px', color: 'var(--yh-text-color-secondary)' } },
                    '\u7F29\u653E',
                    -1
                    /* CACHED */
                  )),
                _withDirectives(
                  _createElementVNode(
                    'input',
                    {
                      type: 'range',
                      'onUpdate:modelValue':
                        _cache[1] || (_cache[1] = ($event) => ($setup.PIXELS_PER_DAY = $event)),
                      min: $setup.minPixelsPerDay,
                      max: '100',
                      step: '0.5',
                      style: { width: '80px' }
                    },
                    null,
                    8,
                    _hoisted_1
                  ),
                  [[_vModelText, $setup.PIXELS_PER_DAY, void 0, { number: true }]]
                ),
                _createVNode(
                  $setup['YhRadioGroup'],
                  {
                    modelValue: $setup.internalViewMode,
                    'onUpdate:modelValue':
                      _cache[2] || (_cache[2] = ($event) => ($setup.internalViewMode = $event)),
                    size: 'small',
                    type: 'button',
                    name: 'gantt-view-switcher'
                  },
                  {
                    default: _withCtx(() => [
                      _createVNode(
                        $setup['YhRadioButton'],
                        { value: 'day' },
                        {
                          default: _withCtx(() => [
                            ...(_cache[3] ||
                              (_cache[3] = [
                                _createTextVNode(
                                  '\u5929',
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
                        $setup['YhRadioButton'],
                        { value: 'week' },
                        {
                          default: _withCtx(() => [
                            ...(_cache[4] ||
                              (_cache[4] = [
                                _createTextVNode(
                                  '\u5468',
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
                        $setup['YhRadioButton'],
                        { value: 'month' },
                        {
                          default: _withCtx(() => [
                            ...(_cache[5] ||
                              (_cache[5] = [
                                _createTextVNode(
                                  '\u6708',
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
                        $setup['YhRadioButton'],
                        { value: 'year' },
                        {
                          default: _withCtx(() => [
                            ...(_cache[6] ||
                              (_cache[6] = [
                                _createTextVNode(
                                  '\u5E74',
                                  -1
                                  /* CACHED */
                                )
                              ]))
                          ]),
                          _: 1
                          /* STABLE */
                        }
                      )
                    ]),
                    _: 1
                    /* STABLE */
                  },
                  8,
                  ['modelValue']
                )
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
            class: _normalizeClass($setup.ns.e('main'))
          },
          [
            _createElementVNode(
              'div',
              {
                class: _normalizeClass($setup.ns.e('sidebar'))
              },
              [
                _createElementVNode(
                  'div',
                  {
                    ref: 'sidebarHeaderRef',
                    class: _normalizeClass($setup.ns.e('sidebar-header-wrapper')),
                    style: _normalizeStyle({
                      height: `${$props.headerHeight}px`
                    })
                  },
                  [
                    _createElementVNode(
                      'div',
                      {
                        class: _normalizeClass($setup.ns.e('sidebar-header'))
                      },
                      [
                        (_openBlock(true),
                        _createElementBlock(
                          _Fragment,
                          null,
                          _renderList($props.columns, (col) => {
                            return (
                              _openBlock(),
                              _createElementBlock(
                                'div',
                                {
                                  key: col.prop,
                                  class: _normalizeClass($setup.ns.e('sidebar-header-cell')),
                                  style: _normalizeStyle({
                                    width:
                                      typeof col.width === 'number' ? `${col.width}px` : col.width
                                  })
                                },
                                _toDisplayString(col.label),
                                7
                                /* TEXT, CLASS, STYLE */
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
                  6
                  /* CLASS, STYLE */
                ),
                _createElementVNode(
                  'div',
                  {
                    ref: 'sidebarBodyRef',
                    class: _normalizeClass($setup.ns.e('sidebar-body')),
                    onScroll: $setup.handleBodyScroll
                  },
                  [
                    $props.virtual
                      ? (_openBlock(),
                        _createElementBlock(
                          'div',
                          {
                            key: 0,
                            style: _normalizeStyle({
                              height: `${$setup.virtualState.offsetTop}px`
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
                      _renderList($setup.renderTasks, (task, index) => {
                        return (
                          _openBlock(),
                          _createElementBlock(
                            'div',
                            {
                              key: task.id,
                              class: _normalizeClass($setup.ns.e('row')),
                              style: _normalizeStyle({
                                height: `${$props.rowHeight}px`
                              })
                            },
                            [
                              (_openBlock(true),
                              _createElementBlock(
                                _Fragment,
                                null,
                                _renderList($props.columns, (col) => {
                                  return (
                                    _openBlock(),
                                    _createElementBlock(
                                      'div',
                                      {
                                        key: col.prop,
                                        class: _normalizeClass($setup.ns.e('cell')),
                                        style: _normalizeStyle({
                                          width:
                                            typeof col.width === 'number'
                                              ? `${col.width}px`
                                              : col.width
                                        })
                                      },
                                      [
                                        _renderSlot(
                                          _ctx.$slots,
                                          'table-cell',
                                          {
                                            row: task,
                                            column: col,
                                            index
                                          },
                                          () => [
                                            col.prop === $props.columns[0].prop
                                              ? (_openBlock(),
                                                _createElementBlock(
                                                  'span',
                                                  {
                                                    key: 0,
                                                    class: _normalizeClass($setup.ns.e('tree-node'))
                                                  },
                                                  [
                                                    (_openBlock(true),
                                                    _createElementBlock(
                                                      _Fragment,
                                                      null,
                                                      _renderList(
                                                        task._ancestorHasNext,
                                                        (hasNext, i) => {
                                                          return (
                                                            _openBlock(),
                                                            _createElementBlock(
                                                              'span',
                                                              {
                                                                key: i,
                                                                class: _normalizeClass([
                                                                  $setup.ns.e('tree-indent'),
                                                                  $setup.ns.is('last', !hasNext)
                                                                ])
                                                              },
                                                              null,
                                                              2
                                                              /* CLASS */
                                                            )
                                                          )
                                                        }
                                                      ),
                                                      128
                                                      /* KEYED_FRAGMENT */
                                                    )),
                                                    _createElementVNode(
                                                      'span',
                                                      {
                                                        class: _normalizeClass([
                                                          $setup.ns.e('tree-indent'),
                                                          $setup.ns.is('last', task._isLast)
                                                        ])
                                                      },
                                                      [
                                                        _createElementVNode(
                                                          'span',
                                                          {
                                                            class: _normalizeClass(
                                                              $setup.ns.e('tree-content')
                                                            )
                                                          },
                                                          [
                                                            task._hasChildren
                                                              ? (_openBlock(),
                                                                _createElementBlock(
                                                                  'span',
                                                                  {
                                                                    key: 0,
                                                                    class: _normalizeClass([
                                                                      $setup.ns.e('tree-arrow'),
                                                                      $setup.expandedTasks.has(
                                                                        task.id
                                                                      ) && 'is-expanded'
                                                                    ]),
                                                                    onClick: _withModifiers(
                                                                      ($event) =>
                                                                        $setup.toggleExpand(task),
                                                                      ['stop']
                                                                    )
                                                                  },
                                                                  [
                                                                    ...(_cache[8] ||
                                                                      (_cache[8] = [
                                                                        _createElementVNode(
                                                                          'svg',
                                                                          {
                                                                            viewBox:
                                                                              '0 0 1024 1024',
                                                                            width: '12',
                                                                            height: '12'
                                                                          },
                                                                          [
                                                                            _createElementVNode(
                                                                              'path',
                                                                              {
                                                                                d: 'M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.936a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 533.376a30.592 30.592 0 0 0 0-42.752L382.592 149.312a29.12 29.12 0 0 0-41.728 0z'
                                                                              }
                                                                            )
                                                                          ],
                                                                          -1
                                                                          /* CACHED */
                                                                        )
                                                                      ]))
                                                                  ],
                                                                  10,
                                                                  _hoisted_2
                                                                ))
                                                              : (_openBlock(),
                                                                _createElementBlock(
                                                                  'span',
                                                                  _hoisted_3
                                                                )),
                                                            _createElementVNode(
                                                              'span',
                                                              {
                                                                class: _normalizeClass(
                                                                  $setup.ns.e('tree-line')
                                                                )
                                                              },
                                                              null,
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
                                                    )
                                                  ],
                                                  2
                                                  /* CLASS */
                                                ))
                                              : _createCommentVNode('v-if', true),
                                            _createVNode(
                                              $setup['YhTooltip'],
                                              {
                                                content: String(task[col.prop]),
                                                placement: 'top'
                                              },
                                              {
                                                default: _withCtx(() => [
                                                  _createElementVNode(
                                                    'span',
                                                    {
                                                      class: _normalizeClass(
                                                        $setup.ns.e('cell-text')
                                                      )
                                                    },
                                                    _toDisplayString(task[col.prop]),
                                                    3
                                                    /* TEXT, CLASS */
                                                  )
                                                ]),
                                                _: 2
                                                /* DYNAMIC */
                                              },
                                              1032,
                                              ['content']
                                            )
                                          ]
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
                            6
                            /* CLASS, STYLE */
                          )
                        )
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    )),
                    $props.virtual
                      ? (_openBlock(),
                        _createElementBlock(
                          'div',
                          {
                            key: 1,
                            style: _normalizeStyle({
                              height: `${$setup.totalHeight - ($setup.virtualState.offsetTop + $setup.renderTasks.length * $props.rowHeight)}px`
                            })
                          },
                          null,
                          4
                          /* STYLE */
                        ))
                      : _createCommentVNode('v-if', true)
                  ],
                  34
                  /* CLASS, NEED_HYDRATION */
                )
              ],
              2
              /* CLASS */
            ),
            _createElementVNode(
              'div',
              {
                class: _normalizeClass($setup.ns.e('timeline'))
              },
              [
                _createElementVNode(
                  'div',
                  {
                    class: _normalizeClass($setup.ns.e('timeline-header')),
                    style: _normalizeStyle({
                      height: `${$props.headerHeight}px`
                    })
                  },
                  [
                    _createElementVNode(
                      'div',
                      {
                        class: _normalizeClass($setup.ns.e('timeline-header-top')),
                        style: _normalizeStyle({
                          height: `${$props.headerHeight / 2}px`,
                          width: `${$setup.timelineWidth}px`
                        })
                      },
                      [
                        (_openBlock(true),
                        _createElementBlock(
                          _Fragment,
                          null,
                          _renderList($setup.topHeaders, (th, i) => {
                            return (
                              _openBlock(),
                              _createElementBlock(
                                'div',
                                {
                                  key: i,
                                  class: _normalizeClass($setup.ns.e('timeline-unit')),
                                  style: _normalizeStyle({
                                    width: `${th.width}px`
                                  })
                                },
                                _toDisplayString(th.label),
                                7
                                /* TEXT, CLASS, STYLE */
                              )
                            )
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ],
                      6
                      /* CLASS, STYLE */
                    ),
                    _createElementVNode(
                      'div',
                      {
                        class: _normalizeClass($setup.ns.e('timeline-header-bottom')),
                        style: _normalizeStyle({
                          height: `${$props.headerHeight / 2}px`,
                          width: `${$setup.timelineWidth}px`
                        })
                      },
                      [
                        (_openBlock(true),
                        _createElementBlock(
                          _Fragment,
                          null,
                          _renderList($setup.bottomHeaders, (th, i) => {
                            return (
                              _openBlock(),
                              _createElementBlock(
                                'div',
                                {
                                  key: i,
                                  class: _normalizeClass([
                                    $setup.ns.e('timeline-unit'),
                                    th.isToday ? $setup.ns.em('timeline-unit', 'today') : ''
                                  ]),
                                  style: _normalizeStyle({
                                    width: `${th.width}px`
                                  })
                                },
                                [
                                  th.width > 20
                                    ? (_openBlock(),
                                      _createElementBlock(
                                        'span',
                                        _hoisted_4,
                                        _toDisplayString(th.label),
                                        1
                                        /* TEXT */
                                      ))
                                    : _createCommentVNode('v-if', true)
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
                      6
                      /* CLASS, STYLE */
                    )
                  ],
                  6
                  /* CLASS, STYLE */
                ),
                _createElementVNode(
                  'div',
                  {
                    ref: 'timelineBodyRef',
                    class: _normalizeClass($setup.ns.e('timeline-body')),
                    onScroll: $setup.handleBodyScroll
                  },
                  [
                    _createElementVNode(
                      'div',
                      {
                        style: _normalizeStyle({
                          width: `${$setup.timelineWidth}px`,
                          height: `${$setup.totalHeight}px`,
                          position: 'relative'
                        })
                      },
                      [
                        $props.virtual
                          ? (_openBlock(),
                            _createElementBlock(
                              'div',
                              {
                                key: 0,
                                style: _normalizeStyle({
                                  height: `${$setup.virtualState.offsetTop}px`
                                })
                              },
                              null,
                              4
                              /* STYLE */
                            ))
                          : _createCommentVNode('v-if', true),
                        _createElementVNode(
                          'div',
                          {
                            class: _normalizeClass($setup.ns.e('grid')),
                            style: _normalizeStyle({
                              width: `${$setup.timelineWidth}px`,
                              height: `${$setup.totalHeight}px`
                            })
                          },
                          [
                            (_openBlock(true),
                            _createElementBlock(
                              _Fragment,
                              null,
                              _renderList($setup.bottomHeaders, (th, i) => {
                                return (
                                  _openBlock(),
                                  _createElementBlock(
                                    'div',
                                    {
                                      key: i,
                                      class: _normalizeClass($setup.ns.e('grid-column')),
                                      style: _normalizeStyle({
                                        width: `${th.width}px`
                                      })
                                    },
                                    null,
                                    6
                                    /* CLASS, STYLE */
                                  )
                                )
                              }),
                              128
                              /* KEYED_FRAGMENT */
                            ))
                          ],
                          6
                          /* CLASS, STYLE */
                        ),
                        (_openBlock(true),
                        _createElementBlock(
                          _Fragment,
                          null,
                          _renderList($setup.renderTasks, (_, index) => {
                            return (
                              _openBlock(),
                              _createElementBlock(
                                'div',
                                {
                                  key: index,
                                  class: _normalizeClass($setup.ns.e('timeline-row')),
                                  style: _normalizeStyle({
                                    height: `${$props.rowHeight}px`,
                                    width: `${$setup.timelineWidth}px`
                                  })
                                },
                                null,
                                6
                                /* CLASS, STYLE */
                              )
                            )
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        )),
                        $props.showDependencies
                          ? (_openBlock(),
                            _createElementBlock(
                              'svg',
                              {
                                key: 1,
                                class: _normalizeClass($setup.ns.e('dependency-svg')),
                                style: _normalizeStyle({
                                  width: `${$setup.timelineWidth}px`,
                                  height: `${$setup.totalHeight}px`
                                })
                              },
                              [
                                (_openBlock(true),
                                _createElementBlock(
                                  _Fragment,
                                  null,
                                  _renderList($setup.dependenciesLinks, (link) => {
                                    return (
                                      _openBlock(),
                                      _createElementBlock(
                                        'path',
                                        {
                                          key: link.id,
                                          d: link.path,
                                          class: _normalizeClass($setup.ns.e('dependency-path'))
                                        },
                                        null,
                                        10,
                                        _hoisted_5
                                      )
                                    )
                                  }),
                                  128
                                  /* KEYED_FRAGMENT */
                                ))
                              ],
                              6
                              /* CLASS, STYLE */
                            ))
                          : _createCommentVNode('v-if', true),
                        (_openBlock(true),
                        _createElementBlock(
                          _Fragment,
                          null,
                          _renderList($setup.taskStyles, (ts) => {
                            return (
                              _openBlock(),
                              _createBlock(
                                $setup['YhTooltip'],
                                {
                                  key: ts.task.id,
                                  content: ts.isMilestone
                                    ? `${ts.task.name} (Milestone)`
                                    : ts.task.name,
                                  placement: 'top',
                                  class: _normalizeClass([
                                    $setup.ns.e('task-wrapper'),
                                    $setup.ns.is('milestone', ts.isMilestone),
                                    $setup.ns.is('summary', ts.isSummary),
                                    ts.task.status ? $setup.ns.e(`task-${ts.task.status}`) : ''
                                  ]),
                                  style: _normalizeStyle(ts.style),
                                  onMouseenter: ($event) => $setup.handleMouseEnter($event, ts.task)
                                },
                                {
                                  default: _withCtx(() => [
                                    _createElementVNode(
                                      'div',
                                      {
                                        class: _normalizeClass($setup.ns.e('task-inner')),
                                        style: {
                                          width: '100%',
                                          height: '100%',
                                          display: 'flex',
                                          'align-items': 'center'
                                        },
                                        onClick: ($event) =>
                                          $setup.handleTaskClick($event, ts.task),
                                        onDblclick: ($event) =>
                                          $setup.handleTaskDblClick($event, ts.task),
                                        onMousedown: ($event) =>
                                          $setup.onDragStart($event, ts.task, 'move')
                                      },
                                      [
                                        ts.isSummary
                                          ? (_openBlock(),
                                            _createElementBlock(
                                              'div',
                                              {
                                                key: 0,
                                                class: _normalizeClass($setup.ns.e('summary-bar'))
                                              },
                                              [
                                                _createElementVNode(
                                                  'div',
                                                  {
                                                    class: _normalizeClass(
                                                      $setup.ns.e('summary-left')
                                                    )
                                                  },
                                                  null,
                                                  2
                                                  /* CLASS */
                                                ),
                                                _createElementVNode(
                                                  'div',
                                                  {
                                                    class: _normalizeClass(
                                                      $setup.ns.e('summary-right')
                                                    )
                                                  },
                                                  null,
                                                  2
                                                  /* CLASS */
                                                )
                                              ],
                                              2
                                              /* CLASS */
                                            ))
                                          : ts.isMilestone
                                            ? (_openBlock(),
                                              _createElementBlock(
                                                'div',
                                                {
                                                  key: 1,
                                                  class: _normalizeClass(
                                                    $setup.ns.e('milestone-diamond')
                                                  ),
                                                  style: _normalizeStyle({
                                                    backgroundColor:
                                                      ts.task.color || 'var(--yh-color-primary)'
                                                  })
                                                },
                                                null,
                                                6
                                                /* CLASS, STYLE */
                                              ))
                                            : (_openBlock(),
                                              _createElementBlock(
                                                _Fragment,
                                                { key: 2 },
                                                [
                                                  ts.task.progress
                                                    ? (_openBlock(),
                                                      _createElementBlock(
                                                        'div',
                                                        {
                                                          key: 0,
                                                          class: _normalizeClass(
                                                            $setup.ns.e('task-progress')
                                                          ),
                                                          style: _normalizeStyle({
                                                            width: `${ts.task.progress}%`
                                                          })
                                                        },
                                                        null,
                                                        6
                                                        /* CLASS, STYLE */
                                                      ))
                                                    : _createCommentVNode('v-if', true),
                                                  _renderSlot(
                                                    _ctx.$slots,
                                                    'task-content',
                                                    {
                                                      task: ts.task
                                                    },
                                                    () => [
                                                      _createElementVNode(
                                                        'span',
                                                        {
                                                          class: _normalizeClass(
                                                            $setup.ns.e('task-label')
                                                          )
                                                        },
                                                        _toDisplayString(ts.task.name),
                                                        3
                                                        /* TEXT, CLASS */
                                                      )
                                                    ]
                                                  )
                                                ],
                                                64
                                                /* STABLE_FRAGMENT */
                                              )),
                                        !ts.isMilestone && $props.draggable
                                          ? (_openBlock(),
                                            _createElementBlock(
                                              _Fragment,
                                              { key: 3 },
                                              [
                                                _createElementVNode(
                                                  'div',
                                                  {
                                                    class: _normalizeClass(
                                                      $setup.ns.e('resizer-left')
                                                    ),
                                                    onMousedown: _withModifiers(
                                                      ($event) =>
                                                        $setup.onDragStart($event, ts.task, 'left'),
                                                      ['stop']
                                                    )
                                                  },
                                                  null,
                                                  42,
                                                  _hoisted_7
                                                ),
                                                _createElementVNode(
                                                  'div',
                                                  {
                                                    class: _normalizeClass(
                                                      $setup.ns.e('resizer-right')
                                                    ),
                                                    onMousedown: _withModifiers(
                                                      ($event) =>
                                                        $setup.onDragStart(
                                                          $event,
                                                          ts.task,
                                                          'right'
                                                        ),
                                                      ['stop']
                                                    )
                                                  },
                                                  null,
                                                  42,
                                                  _hoisted_8
                                                )
                                              ],
                                              64
                                              /* STABLE_FRAGMENT */
                                            ))
                                          : _createCommentVNode('v-if', true)
                                      ],
                                      42,
                                      _hoisted_6
                                    )
                                  ]),
                                  _: 2
                                  /* DYNAMIC */
                                },
                                1032,
                                ['content', 'class', 'style', 'onMouseenter']
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
                  34
                  /* CLASS, NEED_HYDRATION */
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
      6
      /* CLASS, STYLE */
    )
  )
}
import { ref, computed, watch } from 'vue'
import dayjs from '../../dayjs'
import isBetweenPlugin from 'dayjs/plugin/isBetween.js'
import isoWeekPlugin from 'dayjs/plugin/isoWeek.js'
import quarterOfYearPlugin from 'dayjs/plugin/quarterOfYear.js'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { useComponentTheme } from '../../../theme/component-theme.js'
import { YhTooltip } from '../../tooltip'
import { YhInput } from '../../input'
import { YhRadioGroup, YhRadioButton } from '../../radio'
const __sfc__ = /* @__PURE__ */ Object.assign(
  { name: 'YhGanttChart' },
  {
    __name: 'gantt-chart',
    props: {
      data: { type: Array, required: true, default: () => [] },
      columns: {
        type: Array,
        required: false,
        default: () => [{ prop: 'name', label: '\u4EFB\u52A1\u540D\u79F0', width: 200 }]
      },
      startDate: { type: [String, Number, Date], required: false },
      endDate: { type: [String, Number, Date], required: false },
      viewMode: { type: String, required: false, default: 'day' },
      showDependencies: { type: Boolean, required: false, default: true },
      draggable: { type: Boolean, required: false, default: false },
      progressDraggable: { type: Boolean, required: false, default: false },
      autoSchedule: { type: Boolean, required: false, default: true },
      virtual: { type: Boolean, required: false, default: false },
      showResourceLoad: { type: Boolean, required: false, default: true },
      rowHeight: { type: Number, required: false, default: 40 },
      headerHeight: { type: Number, required: false, default: 60 },
      bordered: { type: Boolean, required: false, default: true },
      loading: { type: Boolean, required: false, default: false },
      teleported: { type: Boolean, required: false },
      themeOverrides: { type: Object, required: false }
    },
    emits: [
      'update:data',
      'update:viewMode',
      'task-click',
      'task-dblclick',
      'task-drag-end',
      'progress-drag-end',
      'dependency-click'
    ],
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose()
      dayjs.extend(isBetweenPlugin)
      dayjs.extend(isoWeekPlugin)
      dayjs.extend(quarterOfYearPlugin)
      const props = __props
      const emit = __emit
      const ns = useNamespace('gantt-chart')
      const { themeStyle } = useComponentTheme(
        'gantt-chart',
        computed(() => props.themeOverrides)
      )
      const ganttRef = ref(null)
      const timelineBodyRef = ref(null)
      const sidebarBodyRef = ref(null)
      const sidebarHeaderRef = ref(null)
      const PIXELS_PER_DAY = ref(40)
      const internalViewModeState = ref(props.viewMode || 'day')
      const internalViewMode = computed({
        get: () => internalViewModeState.value,
        set: (val) => {
          internalViewModeState.value = val
          emit('update:viewMode', val)
        }
      })
      watch(
        () => props.viewMode,
        (val) => {
          if (val) internalViewModeState.value = val
        }
      )
      const minPixelsPerDay = computed(() => {
        if (internalViewMode.value === 'day') return 20
        if (internalViewMode.value === 'week') return 6
        if (internalViewMode.value === 'month') return 2
        return 0.5
      })
      watch(
        internalViewMode,
        (val) => {
          if (val === 'day') PIXELS_PER_DAY.value = Math.max(PIXELS_PER_DAY.value, 40)
          else if (val === 'week') PIXELS_PER_DAY.value = Math.max(PIXELS_PER_DAY.value, 10)
          else if (val === 'month') PIXELS_PER_DAY.value = Math.max(PIXELS_PER_DAY.value, 4)
          else if (val === 'year') PIXELS_PER_DAY.value = Math.max(PIXELS_PER_DAY.value, 1)
        },
        { immediate: true }
      )
      const minMaxDates = computed(() => {
        let minDate = dayjs('2099-12-31')
        let maxDate = dayjs('1970-01-01')
        if (props.data.length === 0) {
          minDate = dayjs().subtract(7, 'day')
          maxDate = dayjs().add(23, 'day')
        } else {
          const checkTasks = (tasks) => {
            tasks.forEach((task) => {
              const start = dayjs(task.startDate)
              const end = dayjs(task.endDate)
              if (start.isBefore(minDate)) minDate = start
              if (end.isAfter(maxDate)) maxDate = end
              if (task.children) checkTasks(task.children)
            })
          }
          checkTasks(props.data)
          minDate = minDate.subtract(7, 'day')
          maxDate = maxDate.add(7, 'day')
        }
        return {
          start: props.startDate ? dayjs(props.startDate) : minDate,
          end: props.endDate ? dayjs(props.endDate) : maxDate
        }
      })
      const timelineStart = computed(() =>
        minMaxDates.value.start.startOf(
          internalViewMode.value === 'day' ? 'day' : internalViewMode.value
        )
      )
      const timelineEnd = computed(() =>
        minMaxDates.value.end.endOf(
          internalViewMode.value === 'day' ? 'day' : internalViewMode.value
        )
      )
      const expandedTasks = ref(/* @__PURE__ */ new Set())
      const searchKeyword = ref('')
      const toggleExpand = (task) => {
        if (expandedTasks.value.has(task.id)) {
          expandedTasks.value.delete(task.id)
        } else {
          expandedTasks.value.add(task.id)
        }
      }
      const getFlattenedTasks = (tasks, parentId = null, level = 0, ancestorHasNext = []) => {
        let result = []
        tasks.forEach((task, index) => {
          var _a, _b, _c
          const matchesSearch =
            !searchKeyword.value ||
            task.name.toLowerCase().includes(searchKeyword.value.toLowerCase())
          let start = dayjs(task.startDate),
            end = dayjs(task.endDate)
          const isMilestone = start.isSame(end, 'day')
          if ((_a = task.children) == null ? void 0 : _a.length) {
            task.children.forEach((c) => {
              const cs = dayjs(c.startDate),
                ce = dayjs(c.endDate)
              if (cs.isBefore(start)) start = cs
              if (ce.isAfter(end)) end = ce
            })
          }
          const isLast = index === tasks.length - 1
          const flatTask = __spreadProps(__spreadValues({}, task), {
            _original: task,
            // 保持对原始对象的引用
            _level: level,
            _parentId: parentId,
            _isLast: isLast,
            _ancestorHasNext: [...ancestorHasNext],
            _hasChildren: !!((_b = task.children) == null ? void 0 : _b.length),
            _startDate: start.format('YYYY-MM-DD HH:mm:ss'),
            _endDate: end.format('YYYY-MM-DD HH:mm:ss'),
            _isMilestone: isMilestone,
            _matchesSearch: matchesSearch
          })
          result.push(flatTask)
          if (
            ((_c = task.children) == null ? void 0 : _c.length) &&
            (expandedTasks.value.has(task.id) || searchKeyword.value)
          ) {
            result = result.concat(
              getFlattenedTasks(task.children, task.id, level + 1, [...ancestorHasNext, !isLast])
            )
          }
        })
        return result
      }
      const visibleAllTasks = computed(() => {
        let list = getFlattenedTasks(props.data)
        if (searchKeyword.value) {
          return list.filter((t) => t._matchesSearch)
        }
        return list
      })
      const scrollTop = ref(0)
      const viewportHeight = ref(600)
      const virtualState = computed(() => {
        if (!props.virtual) return { start: 0, end: visibleAllTasks.value.length, offsetTop: 0 }
        const start = Math.floor(scrollTop.value / props.rowHeight)
        const end = Math.min(
          start + Math.ceil(viewportHeight.value / props.rowHeight) + 2,
          visibleAllTasks.value.length
        )
        return { start, end, offsetTop: start * props.rowHeight }
      })
      const renderTasks = computed(() =>
        visibleAllTasks.value.slice(virtualState.value.start, virtualState.value.end)
      )
      const totalHeight = computed(() => visibleAllTasks.value.length * props.rowHeight)
      const resourceLoadMap = computed(() => {
        const loadMap = {}
        visibleAllTasks.value.forEach((t) => {
          if (!t.assignees) return
          let current = dayjs(t._startDate || t.startDate)
          const end = dayjs(t._endDate || t.endDate)
          while (current.isBefore(end) || current.isSame(end, 'day')) {
            const dateStr = current.format('YYYY-MM-DD')
            t.assignees.forEach((resId) => {
              if (!loadMap[resId]) loadMap[resId] = {}
              loadMap[resId][dateStr] = (loadMap[resId][dateStr] || 0) + 1
            })
            current = current.add(1, 'day')
          }
        })
        return loadMap
      })
      const totalDays = computed(() =>
        Math.max(1, timelineEnd.value.diff(timelineStart.value, 'day') + 1)
      )
      const timelineWidth = computed(() => totalDays.value * PIXELS_PER_DAY.value)
      const topHeaders = computed(() => {
        const headers = []
        let current = timelineStart.value.clone()
        while (current.isBefore(timelineEnd.value) || current.isSame(timelineEnd.value, 'day')) {
          const nextCurrent =
            internalViewMode.value === 'day' || internalViewMode.value === 'week'
              ? current.add(1, 'month').startOf('month')
              : current.add(1, 'year').startOf('year')
          const actualEnd = nextCurrent.isAfter(timelineEnd.value) ? timelineEnd.value : nextCurrent
          const days = actualEnd.diff(current, 'day')
          if (days > 0) {
            headers.push({
              label:
                internalViewMode.value === 'year'
                  ? current.format('YYYY')
                  : current.format('YYYY-MM'),
              width: days * PIXELS_PER_DAY.value
            })
          }
          current = nextCurrent
        }
        return headers
      })
      const bottomHeaders = computed(() => {
        const headers = []
        let current = timelineStart.value.clone()
        while (current.isBefore(timelineEnd.value) || current.isSame(timelineEnd.value, 'day')) {
          let label = '',
            days = 1
          if (internalViewMode.value === 'day') {
            label = current.format('DD')
            days = 1
            current = current.add(1, 'day')
          } else if (internalViewMode.value === 'week') {
            label = `W${current.isoWeek()}`
            days = 7
            current = current.add(1, 'week')
          } else if (internalViewMode.value === 'month') {
            label = current.format('MMM')
            days = current.daysInMonth()
            current = current.add(1, 'month')
          } else if (internalViewMode.value === 'year') {
            label = `Q${current.quarter()}`
            days = current.add(1, 'quarter').diff(current, 'day')
            current = current.add(1, 'quarter')
          }
          headers.push({
            label,
            width: days * PIXELS_PER_DAY.value,
            isToday: current.subtract(1, 'day').isSame(dayjs(), 'day')
          })
        }
        return headers
      })
      const getTaskPosition = (task, index) => {
        const start = dayjs(task.startDate)
        const end = dayjs(task.endDate)
        const isMilestone = task._isMilestone || start.isSame(end, 'day')
        const daysFromStart = start.diff(timelineStart.value, 'day', true)
        let duration = Math.max(0.1, end.diff(start, 'day') + 1)
        let width = duration * PIXELS_PER_DAY.value
        let left = daysFromStart * PIXELS_PER_DAY.value
        if (isMilestone) width = 0
        return { left, width, top: index * props.rowHeight, isMilestone }
      }
      const taskStyles = computed(() => {
        return renderTasks.value.map((task, index) => {
          const realIndex = virtualState.value.start + index
          const pos = getTaskPosition(task, realIndex)
          let hasConflict = false
          if (props.showResourceLoad && task.assignees) {
            let current = dayjs(task.startDate)
            const end = dayjs(task.endDate)
            while (current.isBefore(end) || current.isSame(end, 'day')) {
              const ds = current.format('YYYY-MM-DD')
              if (
                task.assignees.some((rid) => {
                  var _a
                  return (((_a = resourceLoadMap.value[rid]) == null ? void 0 : _a[ds]) || 0) > 1
                })
              ) {
                hasConflict = true
                break
              }
              current = current.add(1, 'day')
            }
          }
          const isSummary = task._hasChildren
          return __spreadProps(__spreadValues({}, pos), {
            task,
            index: realIndex,
            hasConflict,
            isSummary,
            style: {
              left: `${pos.isMilestone ? pos.left + PIXELS_PER_DAY.value / 2 - 8 : pos.left}px`,
              width: `${pos.isMilestone ? 16 : pos.width}px`,
              top: `${pos.top + (isSummary ? 12 : 4)}px`,
              height: `${pos.isMilestone ? 16 : isSummary ? 8 : props.rowHeight - 8}px`,
              backgroundColor:
                pos.isMilestone || isSummary
                  ? 'transparent'
                  : hasConflict
                    ? 'var(--yh-color-danger)'
                    : task.color,
              color: task.textColor,
              margin: pos.isMilestone ? '4px 0' : '0'
            }
          })
        })
      })
      const dependenciesLinks = computed(() => {
        if (!props.showDependencies) return []
        const links = []
        const idToPos = /* @__PURE__ */ new Map()
        taskStyles.value.forEach((t) => idToPos.set(t.task.id, t))
        taskStyles.value.forEach((t) => {
          if (!t.task.dependencies) return
          t.task.dependencies.forEach((depId) => {
            const from = idToPos.get(depId)
            if (from) {
              const x1 = from.left + from.width,
                y1 = from.top + props.rowHeight / 2
              const x2 = t.left,
                y2 = t.top + props.rowHeight / 2
              links.push({
                id: `${depId}-${t.task.id}`,
                from: from.task,
                to: t.task,
                path: `M ${x1} ${y1} L ${x2} ${y2}`
              })
            }
          })
        })
        return links
      })
      const handleBodyScroll = (e) => {
        const target = e.target
        scrollTop.value = target.scrollTop
        if (sidebarBodyRef.value && target === timelineBodyRef.value) {
          sidebarBodyRef.value.scrollTop = target.scrollTop
        } else if (timelineBodyRef.value && target === sidebarBodyRef.value) {
          timelineBodyRef.value.scrollTop = target.scrollTop
        }
        if (sidebarHeaderRef.value && target === sidebarBodyRef.value) {
          sidebarHeaderRef.value.scrollLeft = target.scrollLeft
        }
      }
      const updateSuccessors = (taskId) => {
        const findTask = (id, list) => {
          for (const t of list) {
            if (t.id === id) return t
            if (t.children) {
              const found = findTask(id, t.children)
              if (found) return found
            }
          }
        }
        const findAffected = (predId, list) => {
          let affected2 = []
          list.forEach((t) => {
            var _a
            if ((_a = t.dependencies) == null ? void 0 : _a.includes(predId)) affected2.push(t)
            if (t.children) affected2 = affected2.concat(findAffected(predId, t.children))
          })
          return affected2
        }
        const pred = findTask(taskId, props.data)
        if (!pred) return
        const affected = findAffected(taskId, props.data)
        affected.forEach((task) => {
          const start = dayjs(task.startDate),
            end = dayjs(pred.endDate)
          if (start.isBefore(end)) {
            const dur = dayjs(task.endDate).diff(dayjs(task.startDate), 'day')
            const ns2 = end.add(1, 'day')
            task.startDate = ns2.format('YYYY-MM-DD HH:mm:ss')
            task.endDate = ns2.add(dur, 'day').format('YYYY-MM-DD HH:mm:ss')
            updateSuccessors(task.id)
          }
        })
      }
      const activeDragTask = ref(null)
      let dragType = null,
        dragStartX = 0,
        dragInitS = dayjs(),
        dragInitE = dayjs(),
        dragInitP = 0
      const onDragStart = (e, task, type) => {
        if (type === 'progress' && !props.progressDraggable) return
        if (type !== 'progress' && !props.draggable) return
        e.preventDefault()
        e.stopPropagation()
        activeDragTask.value = task
        dragType = type
        dragStartX = e.clientX
        dragInitS = dayjs(task.startDate)
        dragInitE = dayjs(task.endDate)
        dragInitP = task.progress || 0
        document.addEventListener('mousemove', onDragMove)
        document.addEventListener('mouseup', onDragEnd)
      }
      const onDragMove = (e) => {
        if (!activeDragTask.value) return
        const dx = e.clientX - dragStartX
        const msPerDay = 864e5
        const msOffset = (dx / PIXELS_PER_DAY.value) * msPerDay
        const currentTask = activeDragTask.value
        const originalTask = currentTask._original || currentTask
        if (dragType === 'move') {
          const newStart = dragInitS.add(msOffset, 'ms').format('YYYY-MM-DD HH:mm:ss')
          const newEnd = dragInitE.add(msOffset, 'ms').format('YYYY-MM-DD HH:mm:ss')
          currentTask.startDate = newStart
          currentTask.endDate = newEnd
          originalTask.startDate = newStart
          originalTask.endDate = newEnd
        } else if (dragType === 'left') {
          const ns2 = dragInitS.add(msOffset, 'ms')
          if (ns2.isBefore(dragInitE)) {
            const newStart = ns2.format('YYYY-MM-DD HH:mm:ss')
            currentTask.startDate = newStart
            originalTask.startDate = newStart
          }
        } else if (dragType === 'right') {
          const ne = dragInitE.add(msOffset, 'ms')
          if (ne.isAfter(dragInitS)) {
            const newEnd = ne.format('YYYY-MM-DD HH:mm:ss')
            currentTask.endDate = newEnd
            originalTask.endDate = newEnd
          }
        } else if (dragType === 'progress') {
          const pos = getTaskPosition(currentTask, 0)
          const newProgress = Math.round(
            Math.max(0, Math.min(100, dragInitP + (dx / pos.width) * 100))
          )
          currentTask.progress = newProgress
          originalTask.progress = newProgress
        }
      }
      const onDragEnd = () => {
        const draggedTask = activeDragTask.value
        if (draggedTask && props.autoSchedule) updateSuccessors(draggedTask.id)
        if (draggedTask) {
          if (dragType === 'progress') {
            emit('progress-drag-end', draggedTask)
          } else {
            emit('task-drag-end', draggedTask)
          }
        }
        emit('update:data', [...props.data])
        activeDragTask.value = null
        dragType = null
        document.removeEventListener('mousemove', onDragMove)
        document.removeEventListener('mouseup', onDragEnd)
      }
      const handleTaskClick = (e, task) => {
        if (dragType) return
        emit('task-click', task, e)
      }
      const handleTaskDblClick = (e, task) => {
        emit('task-dblclick', task, e)
      }
      const truncatedTasks = ref({})
      const handleMouseEnter = (e, task) => {
        const label = e.currentTarget.querySelector(`.${ns.e('task-label')}`)
        if (label) truncatedTasks.value[task.id] = label.scrollWidth > label.clientWidth
      }
      const __returned__ = {
        props,
        emit,
        ns,
        themeStyle,
        ganttRef,
        timelineBodyRef,
        sidebarBodyRef,
        sidebarHeaderRef,
        PIXELS_PER_DAY,
        internalViewModeState,
        internalViewMode,
        minPixelsPerDay,
        minMaxDates,
        timelineStart,
        timelineEnd,
        expandedTasks,
        searchKeyword,
        toggleExpand,
        getFlattenedTasks,
        visibleAllTasks,
        scrollTop,
        viewportHeight,
        virtualState,
        renderTasks,
        totalHeight,
        resourceLoadMap,
        totalDays,
        timelineWidth,
        topHeaders,
        bottomHeaders,
        getTaskPosition,
        taskStyles,
        dependenciesLinks,
        handleBodyScroll,
        updateSuccessors,
        activeDragTask,
        get dragType() {
          return dragType
        },
        set dragType(v) {
          dragType = v
        },
        get dragStartX() {
          return dragStartX
        },
        set dragStartX(v) {
          dragStartX = v
        },
        get dragInitS() {
          return dragInitS
        },
        set dragInitS(v) {
          dragInitS = v
        },
        get dragInitE() {
          return dragInitE
        },
        set dragInitE(v) {
          dragInitE = v
        },
        get dragInitP() {
          return dragInitP
        },
        set dragInitP(v) {
          dragInitP = v
        },
        onDragStart,
        onDragMove,
        onDragEnd,
        handleTaskClick,
        handleTaskDblClick,
        truncatedTasks,
        handleMouseEnter,
        ref,
        computed,
        watch,
        get dayjs() {
          return dayjs
        },
        get isBetweenPlugin() {
          return isBetweenPlugin
        },
        get isoWeekPlugin() {
          return isoWeekPlugin
        },
        get quarterOfYearPlugin() {
          return quarterOfYearPlugin
        },
        get useNamespace() {
          return useNamespace
        },
        get useComponentTheme() {
          return useComponentTheme
        },
        get YhTooltip() {
          return YhTooltip
        },
        get YhInput() {
          return YhInput
        },
        get YhRadioGroup() {
          return YhRadioGroup
        },
        get YhRadioButton() {
          return YhRadioButton
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
