import { defineComponent, h, computed, provide } from "vue";
import { useNamespace } from "@yh-ui/hooks";
import { useComponentTheme } from "@yh-ui/theme";
export const rowProps = {
  tag: {
    type: String,
    default: "div"
  },
  gutter: {
    type: Number,
    default: 0
  },
  justify: {
    type: String,
    default: "start"
  },
  align: {
    type: String,
    default: "top"
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
};
export const rowContextKey = Symbol("rowContextKey");
export default defineComponent({
  name: "YhRow",
  props: rowProps,
  setup(props, { slots }) {
    const ns = useNamespace("row");
    const gutter = computed(() => props.gutter);
    const { themeStyle } = useComponentTheme(
      "row",
      computed(() => props.themeOverrides)
    );
    provide(rowContextKey, {
      gutter
    });
    const style = computed(() => {
      const styles = {
        ...themeStyle.value
      };
      if (!props.gutter) {
        return styles;
      }
      styles.marginRight = styles.marginLeft = `-${props.gutter / 2}px`;
      return styles;
    });
    const classes = computed(() => [
      ns.b(),
      ns.is(`justify-${props.justify}`, props.justify !== "start"),
      ns.is(`align-${props.align}`, props.align !== "top")
    ]);
    return () => h(
      props.tag,
      {
        class: classes.value,
        style: style.value
      },
      slots.default?.()
    );
  }
});
