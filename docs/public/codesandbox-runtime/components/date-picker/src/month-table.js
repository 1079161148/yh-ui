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
        class: _normalizeClass([$setup.ns.e('table'), $setup.ns.em('table', 'month')])
      },
      [
        (_openBlock(true),
        _createElementBlock(
          _Fragment,
          null,
          _renderList($setup.months, (m, i) => {
            return (
              _openBlock(),
              _createElementBlock(
                'div',
                {
                  key: i,
                  class: _normalizeClass($setup.getCellClasses(i)),
                  onClick: ($event) => $setup.handleClick(i),
                  onMouseenter: ($event) =>
                    $setup.emit(
                      'hover',
                      $setup.dayjs($props.date).month(i).startOf('month').toDate()
                    )
                },
                [
                  _createElementVNode(
                    'span',
                    {
                      class: _normalizeClass($setup.ns.e('cell-content'))
                    },
                    _toDisplayString(m),
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
import dayjs from '../../dayjs.js'
const __sfc__ = {
  __name: 'month-table',
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
    const months = computed(() => [
      t('datepicker.months.jan'),
      t('datepicker.months.feb'),
      t('datepicker.months.mar'),
      t('datepicker.months.apr'),
      t('datepicker.months.may'),
      t('datepicker.months.jun'),
      t('datepicker.months.jul'),
      t('datepicker.months.aug'),
      t('datepicker.months.sep'),
      t('datepicker.months.oct'),
      t('datepicker.months.nov'),
      t('datepicker.months.dec')
    ])
    const getCellClasses = (month) => {
      const classes = [ns.e('cell'), ns.is(props.cellShape || 'round')]
      const cellDate = dayjs(props.date).month(month).startOf('month')
      const today = dayjs().startOf('month')
      if (cellDate.isSame(today, 'month')) classes.push('is-today')
      if (props.disabledDate && props.disabledDate(cellDate.toDate())) classes.push('is-disabled')
      const isSelected = (val) => {
        if (!val || Array.isArray(val)) return false
        const d = dayjs(val)
        return d.year() === dayjs(props.date).year() && d.month() === month
      }
      if (props.selectedDate && !Array.isArray(props.selectedDate)) {
        if (isSelected(props.selectedDate)) {
          classes.push('is-selected')
        }
      }
      if (props.rangeState) {
        const { from, to, hovering } = props.rangeState
        const start = from ? dayjs(from).startOf('month') : null
        const end = to
          ? dayjs(to).startOf('month')
          : hovering
            ? dayjs(hovering).startOf('month')
            : null
        if (start && cellDate.isSame(start, 'month')) classes.push('is-range-start', 'is-selected')
        if (end && cellDate.isSame(end, 'month')) classes.push('is-range-end', 'is-selected')
        if (start && end) {
          const min = start.isBefore(end) ? start : end
          const max = start.isBefore(end) ? end : start
          if (cellDate.isAfter(min, 'month') && cellDate.isBefore(max, 'month')) {
            classes.push('is-in-range')
          }
        }
      }
      return classes
    }
    const handleClick = (month) => {
      const cellDate = dayjs(props.date).month(month).startOf('month').toDate()
      if (props.disabledDate && props.disabledDate(cellDate)) return
      emit('select', month)
    }
    const __returned__ = {
      props,
      emit,
      ns,
      t,
      months,
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
