import { renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, toDisplayString as _toDisplayString, normalizeClass as _normalizeClass, createElementVNode as _createElementVNode } from "vue";
const _hoisted_1 = ["onClick", "onMouseenter"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock(), _createElementBlock(
    "div",
    {
      class: _normalizeClass([$setup.ns.e("table"), $setup.ns.em("table", "year")])
    },
    [
      (_openBlock(true), _createElementBlock(
        _Fragment,
        null,
        _renderList($setup.years, (year) => {
          return _openBlock(), _createElementBlock("div", {
            key: year,
            class: _normalizeClass($setup.getCellClasses(year)),
            onClick: ($event) => $setup.handleClick(year),
            onMouseenter: ($event) => $setup.emit("hover", $setup.dayjs().year(year).startOf("year").toDate())
          }, [
            _createElementVNode(
              "span",
              {
                class: _normalizeClass($setup.ns.e("cell-content"))
              },
              _toDisplayString(year),
              3
              /* TEXT, CLASS */
            )
          ], 42, _hoisted_1);
        }),
        128
        /* KEYED_FRAGMENT */
      ))
    ],
    2
    /* CLASS */
  );
}
import { computed } from "vue";
import { useNamespace } from "../../../hooks/use-namespace/index.js";
import dayjs from "../../dayjs.js";
const __sfc__ = {
  __name: "year-table",
  props: {
    date: { type: Date, required: true },
    selectedDate: { type: [Date, Array, null], required: false },
    rangeState: { type: Object, required: false },
    disabledDate: { type: Function, required: false },
    cellShape: { type: String, required: false }
  },
  emits: ["select", "hover"],
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("date-picker");
    const startYear = computed(() => {
      return Math.floor(dayjs(props.date).year() / 10) * 10;
    });
    const years = computed(() => {
      const start = startYear.value;
      const res = [];
      for (let i = 0; i < 10; i++) {
        res.push(start + i);
      }
      return res;
    });
    const getCellClasses = (year) => {
      const classes = [ns.e("cell"), ns.is(props.cellShape || "round")];
      const cellDate = dayjs().year(year).startOf("year");
      const today = dayjs().startOf("year");
      if (cellDate.isSame(today, "year")) classes.push("is-today");
      if (props.disabledDate && props.disabledDate(cellDate.toDate())) classes.push("is-disabled");
      const isSelected = (val) => {
        if (!val || Array.isArray(val)) return false;
        const d = dayjs(val);
        return d.year() === year;
      };
      if (props.selectedDate && !Array.isArray(props.selectedDate)) {
        if (isSelected(props.selectedDate)) {
          classes.push("is-selected");
        }
      }
      if (props.rangeState) {
        const { from, to, hovering } = props.rangeState;
        const start = from ? dayjs(from).startOf("year") : null;
        const end = to ? dayjs(to).startOf("year") : hovering ? dayjs(hovering).startOf("year") : null;
        if (start && cellDate.isSame(start)) classes.push("is-range-start", "is-selected");
        if (end && cellDate.isSame(end)) classes.push("is-range-end", "is-selected");
        if (start && end) {
          const min = start.isBefore(end) ? start : end;
          const max = start.isBefore(end) ? end : start;
          if (cellDate.isAfter(min) && cellDate.isBefore(max)) {
            classes.push("is-in-range");
          }
        }
      }
      return classes;
    };
    const handleClick = (year) => {
      const cellDate = dayjs().year(year).startOf("year").toDate();
      if (props.disabledDate && props.disabledDate(cellDate)) return;
      emit("select", year);
    };
    const __returned__ = { props, emit, ns, startYear, years, getCellClasses, handleClick, computed, get useNamespace() {
      return useNamespace;
    }, get dayjs() {
      return dayjs;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
__sfc__.render = render;
var stdin_default = __sfc__;
export {
  stdin_default as default
};
