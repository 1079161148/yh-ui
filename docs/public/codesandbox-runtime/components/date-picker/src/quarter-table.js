import {
  renderList as _renderList,
  Fragment as _Fragment,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  toDisplayString as _toDisplayString,
  normalizeClass as _normalizeClass,
  createElementVNode as _createElementVNode
} from 'vue'
const _hoisted_1 = ['onClick', 'onMouseenter']
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      'div',
      {
        class: _normalizeClass([$setup.ns.e('table'), $setup.ns.em('table', 'quarter')])
      },
      [
        (_openBlock(true),
        _createElementBlock(
          _Fragment,
          null,
          _renderList($setup.quarters, (q) => {
            return (
              _openBlock(),
              _createElementBlock(
                'div',
                {
                  key: q.value,
                  class: _normalizeClass($setup.getCellClasses(q.value)),
                  onClick: ($event) => $setup.handleClick(q.value),
                  onMouseenter: ($event) =>
                    $setup.emit(
                      'hover',
                      $setup
                        .dayjs($props.date)
                        .month((q.value - 1) * 3)
                        .startOf('month')
                        .toDate()
                    )
                },
                [
                  _createElementVNode(
                    'span',
                    {
                      class: _normalizeClass($setup.ns.e('cell-content'))
                    },
                    _toDisplayString(q.text),
                    3
                    /* TEXT, CLASS */
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
}
import { computed } from 'vue'
import { useLocale } from '../../../hooks/index.js'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import dayjs from '../../dayjs'
const __sfc__ = {
  __name: 'quarter-table',
  props: {
    date: { type: Date, required: true },
    selectedDate: { type: [Date, Array, null], required: false },
    rangeState: { type: Object, required: false },
    disabledDate: { type: Function, required: false },
    cellShape: { type: String, required: false }
  },
  emits: ['select', 'hover'],
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose()
    const props = __props
    const emit = __emit
    const ns = useNamespace('date-picker')
    const { t } = useLocale()
    const quarters = computed(() => [
      { text: t('datepicker.quarters.q1'), value: 1 },
      { text: t('datepicker.quarters.q2'), value: 2 },
      { text: t('datepicker.quarters.q3'), value: 3 },
      { text: t('datepicker.quarters.q4'), value: 4 }
    ])
    const getCellClasses = (quarter) => {
      const classes = [ns.e('cell'), ns.is(props.cellShape || 'round')]
      const month = (quarter - 1) * 3
      const cellDate = dayjs(props.date).month(month).startOf('month')
      const today = dayjs().startOf('month')
      if (today.year() === cellDate.year() && Math.floor(today.month() / 3) === quarter - 1) {
        classes.push('is-today')
      }
      if (props.disabledDate && props.disabledDate(cellDate.toDate())) classes.push('is-disabled')
      const isSelected = (val) => {
        if (!val || Array.isArray(val)) return false
        const d = dayjs(val)
        return d.year() === dayjs(props.date).year() && Math.floor(d.month() / 3) === quarter - 1
      }
      if (props.selectedDate && !Array.isArray(props.selectedDate)) {
        if (isSelected(props.selectedDate)) {
          classes.push('is-selected')
        }
      }
      if (props.rangeState) {
        const { from, to, hovering } = props.rangeState
        const start = from
          ? dayjs(from)
              .startOf('month')
              .month(Math.floor(dayjs(from).month() / 3) * 3)
          : null
        const end = to
          ? dayjs(to)
              .startOf('month')
              .month(Math.floor(dayjs(to).month() / 3) * 3)
          : hovering
            ? dayjs(hovering)
                .startOf('month')
                .month(Math.floor(dayjs(hovering).month() / 3) * 3)
            : null
        const current = cellDate.startOf('month')
        if (start && current.isSame(start, 'month')) classes.push('is-range-start', 'is-selected')
        if (end && current.isSame(end, 'month')) classes.push('is-range-end', 'is-selected')
        if (start && end) {
          const min = start.isBefore(end) ? start : end
          const max = start.isBefore(end) ? end : start
          if (current.isAfter(min, 'month') && current.isBefore(max, 'month')) {
            classes.push('is-in-range')
          }
        }
      }
      return classes
    }
    const handleClick = (quarter) => {
      const month = (quarter - 1) * 3
      const cellDate = dayjs(props.date).month(month).startOf('month').toDate()
      if (props.disabledDate && props.disabledDate(cellDate)) return
      emit('select', quarter)
    }
    const __returned__ = {
      props,
      emit,
      ns,
      t,
      quarters,
      getCellClasses,
      handleClick,
      computed,
      get useNamespace() {
        return useNamespace
      },
      get useLocale() {
        return useLocale
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
