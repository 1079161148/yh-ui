import {
  renderList as _renderList,
  Fragment as _Fragment,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  toDisplayString as _toDisplayString,
  createElementVNode as _createElementVNode,
  renderSlot as _renderSlot,
  normalizeClass as _normalizeClass,
  createCommentVNode as _createCommentVNode
} from 'vue'
const _hoisted_1 = ['onClick', 'onMouseenter']
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      'table',
      {
        class: _normalizeClass([
          $setup.ns.e('table'),
          $setup.ns.is('week-mode', $props.selectionMode === 'week')
        ]),
        onMouseleave: _cache[0] || (_cache[0] = ($event) => $setup.emit('hover', null))
      },
      [
        _createElementVNode('thead', null, [
          _createElementVNode('tr', null, [
            (_openBlock(true),
            _createElementBlock(
              _Fragment,
              null,
              _renderList($setup.weekDays, (day) => {
                return (
                  _openBlock(),
                  _createElementBlock(
                    'th',
                    { key: day },
                    _toDisplayString(day),
                    1
                    /* TEXT */
                  )
                )
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ]),
        _createElementVNode('tbody', null, [
          (_openBlock(true),
          _createElementBlock(
            _Fragment,
            null,
            _renderList($setup.rows, (row, i) => {
              return (
                _openBlock(),
                _createElementBlock(
                  'tr',
                  {
                    key: i,
                    class: _normalizeClass($setup.ns.e('table-row'))
                  },
                  [
                    (_openBlock(true),
                    _createElementBlock(
                      _Fragment,
                      null,
                      _renderList(row, (cell, j) => {
                        return (
                          _openBlock(),
                          _createElementBlock(
                            'td',
                            {
                              key: j,
                              class: _normalizeClass($setup.getCellClasses(cell)),
                              onClick: ($event) => $setup.handleClick(cell),
                              onMouseenter: ($event) => $setup.handleMouseEnter(cell)
                            },
                            [
                              _createElementVNode(
                                'div',
                                {
                                  class: _normalizeClass($setup.ns.e('cell-content'))
                                },
                                [
                                  _renderSlot(_ctx.$slots, 'date-cell', { cell }, () => {
                                    var _a, _b
                                    return [
                                      _createElementVNode(
                                        'span',
                                        {
                                          class: _normalizeClass($setup.ns.e('cell-date'))
                                        },
                                        _toDisplayString(cell.text),
                                        3
                                        /* TEXT, CLASS */
                                      ),
                                      $setup.getCellExtra(cell.date)
                                        ? (_openBlock(),
                                          _createElementBlock(
                                            'span',
                                            {
                                              key: 0,
                                              class: _normalizeClass([
                                                $setup.ns.e('cell-extra'),
                                                (_a = $setup.getCellExtra(cell.date)) == null
                                                  ? void 0
                                                  : _a.className
                                              ])
                                            },
                                            _toDisplayString(
                                              (_b = $setup.getCellExtra(cell.date)) == null
                                                ? void 0
                                                : _b.text
                                            ),
                                            3
                                            /* TEXT, CLASS */
                                          ))
                                        : _createCommentVNode('v-if', true)
                                    ]
                                  })
                                ],
                                2
                                /* CLASS */
                              )
                            ],
                            42,
                            _hoisted_1
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
        ])
      ],
      34
      /* CLASS, NEED_HYDRATION */
    )
  )
}
import { computed } from 'vue'
import { useLocale } from '../../../hooks/index.js'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { generateCalendar } from './panel-utils.js'
import dayjs from '../../dayjs.js'
const __sfc__ = {
  __name: 'date-table',
  props: {
    date: { type: Date, required: true },
    selectedDate: { type: [Date, Array, null], required: false },
    selectionMode: { type: String, required: false },
    rangeState: { type: Object, required: false },
    disabledDate: { type: Function, required: false },
    firstDayOfWeek: { type: Number, required: false },
    cellShape: { type: String, required: false },
    cellRender: { type: Function, required: false }
  },
  emits: ['select', 'hover'],
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose()
    const props = __props
    const emit = __emit
    const ns = useNamespace('date-picker')
    const { t } = useLocale()
    const getCellExtra = (date) => {
      if (!props.cellRender) return null
      const res = props.cellRender(date)
      return typeof res === 'string' ? { text: res } : res
    }
    const rows = computed(() => {
      return generateCalendar(props.date, props.firstDayOfWeek, props.disabledDate)
    })
    const weekDays = computed(() => {
      const days = [
        t('datepicker.weeks.sun'),
        t('datepicker.weeks.mon'),
        t('datepicker.weeks.tue'),
        t('datepicker.weeks.wed'),
        t('datepicker.weeks.thu'),
        t('datepicker.weeks.fri'),
        t('datepicker.weeks.sat')
      ]
      const start = props.firstDayOfWeek ? props.firstDayOfWeek % 7 : 0
      const result = []
      for (let i = 0; i < 7; i++) {
        result.push(days[(start + i) % 7])
      }
      return result
    })
    const getCellClasses = (cell) => {
      const classes = [ns.e('cell'), ns.is(cell.type), ns.is(props.cellShape || 'round')]
      if (cell.isToday) classes.push('is-today')
      if (cell.disabled) classes.push('is-disabled')
      const cellDay = cell.dayjs.startOf('day')
      if (props.selectedDate && !Array.isArray(props.selectedDate)) {
        const selectedDay = dayjs(props.selectedDate).startOf('day')
        if (props.selectionMode === 'week') {
          if (cell.dayjs.isSame(selectedDay, 'week')) {
            classes.push('is-selected')
            if (cell.dayjs.day() === (props.firstDayOfWeek || 7) % 7) classes.push('is-week-start')
            if (cell.dayjs.day() === ((props.firstDayOfWeek || 7) + 6) % 7)
              classes.push('is-week-end')
          }
        } else {
          if (cellDay.isSame(selectedDay)) {
            classes.push('is-selected')
          }
        }
      }
      if (props.rangeState) {
        const { from, to, hovering } = props.rangeState
        const start = from ? dayjs(from).startOf('day') : null
        const end = to ? dayjs(to).startOf('day') : null
        const hover = hovering ? dayjs(hovering).startOf('day') : null
        if (start && cellDay.isSame(start)) classes.push('is-range-start', 'is-selected')
        if (end && cellDay.isSame(end)) classes.push('is-range-end', 'is-selected')
        if (start && !end && hover) {
          const min = start.isBefore(hover) ? start : hover
          const max = start.isBefore(hover) ? hover : start
          if (cellDay.isAfter(min) && cellDay.isBefore(max)) {
            classes.push('is-in-range')
          }
          if (cellDay.isSame(hover) && !cellDay.isSame(start)) {
            classes.push('is-range-end', 'is-selected', 'is-hover-end')
          }
        } else if (start && end) {
          const min = start.isBefore(end) ? start : end
          const max = start.isBefore(end) ? end : start
          if (cellDay.isAfter(min) && cellDay.isBefore(max)) {
            classes.push('is-in-range')
          }
        }
      }
      return classes
    }
    const handleClick = (cell) => {
      if (cell.disabled) return
      if (props.selectionMode === 'week') {
        const firstDay = cell.dayjs.startOf('week').toDate()
        emit('select', firstDay)
      } else {
        emit('select', cell.date)
      }
    }
    const handleMouseEnter = (cell) => {
      if (cell.disabled) return
      emit('hover', cell.date)
    }
    const __returned__ = {
      props,
      emit,
      ns,
      t,
      getCellExtra,
      rows,
      weekDays,
      getCellClasses,
      handleClick,
      handleMouseEnter,
      computed,
      get useNamespace() {
        return useNamespace
      },
      get useLocale() {
        return useLocale
      },
      get generateCalendar() {
        return generateCalendar
      },
      get dayjs() {
        return dayjs
      }
    }
    Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true })
    return __returned__
  }
}
__sfc__.render = render
var stdin_default = __sfc__
export { stdin_default as default }
