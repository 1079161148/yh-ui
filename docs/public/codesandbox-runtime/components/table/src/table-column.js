import { openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode } from "vue";
const _hoisted_1 = { key: 0 };
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return false ? (_openBlock(), _createElementBlock("div", _hoisted_1)) : _createCommentVNode("v-if", true);
}
import { inject, onMounted, onUnmounted, useSlots } from "vue";
import { tableContextKey } from "./table-meta.js";
const __sfc__ = /* @__PURE__ */ Object.assign({
  name: "YhTableColumn"
}, {
  __name: "table-column",
  props: {
    columnKey: { type: String, required: false, default: "" },
    prop: { type: String, required: false, default: "" },
    label: { type: String, required: false, default: "" },
    width: { type: [Number, String], required: false, default: "auto" },
    minWidth: { type: [Number, String], required: false, default: 80 },
    maxWidth: { type: [Number, String], required: false, default: void 0 },
    align: { type: String, required: false, default: "left" },
    headerAlign: { type: String, required: false, default: void 0 },
    fixed: { type: [String, Boolean], required: false, default: false },
    sortable: { type: [Boolean, String], required: false, default: false },
    filterable: { type: Boolean, required: false, default: false },
    filters: { type: Array, required: false, default: () => [] },
    filterMultiple: { type: Boolean, required: false, default: true },
    resizable: { type: Boolean, required: false, default: true },
    showOverflowTooltip: { type: Boolean, required: false, default: false },
    className: { type: String, required: false, default: "" },
    headerClassName: { type: String, required: false, default: "" },
    type: { type: String, required: false, default: void 0 },
    visible: { type: Boolean, required: false, default: true },
    treeNode: { type: Boolean, required: false, default: false }
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const slots = useSlots();
    const tableContext = inject(tableContextKey, null);
    const columnConfig = {
      key: props.columnKey,
      prop: props.prop,
      label: props.label,
      width: props.width,
      minWidth: props.minWidth,
      maxWidth: props.maxWidth,
      align: props.align,
      headerAlign: props.headerAlign,
      fixed: props.fixed === false ? void 0 : props.fixed,
      sortable: props.sortable,
      filterable: props.filterable,
      filters: props.filters,
      filterMultiple: props.filterMultiple,
      resizable: props.resizable,
      showOverflowTooltip: props.showOverflowTooltip,
      className: props.className,
      headerClassName: props.headerClassName,
      type: props.type,
      visible: props.visible,
      treeNode: props.treeNode,
      // 注入插槽渲染函数
      render: slots.default ? (params) => slots.default(params) : void 0,
      headerRender: slots.header ? (params) => slots.header(params) : void 0
    };
    onMounted(() => {
      if (tableContext) {
        tableContext.registerColumn(columnConfig);
      }
    });
    onUnmounted(() => {
      if (tableContext) {
        tableContext.unregisterColumn(columnConfig);
      }
    });
    const __returned__ = { props, slots, tableContext, columnConfig, inject, onMounted, onUnmounted, useSlots, get tableContextKey() {
      return tableContextKey;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
__sfc__.render = render;
var stdin_default = __sfc__;
export {
  stdin_default as default
};
