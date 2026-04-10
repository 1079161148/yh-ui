import {
  renderList as _renderList,
  Fragment as _Fragment,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  createCommentVNode as _createCommentVNode,
  createElementVNode as _createElementVNode,
  normalizeClass as _normalizeClass,
  withModifiers as _withModifiers,
  renderSlot as _renderSlot,
  toDisplayString as _toDisplayString,
  createTextVNode as _createTextVNode,
  normalizeStyle as _normalizeStyle,
  withCtx as _withCtx,
  createBlock as _createBlock
} from 'vue'
const _hoisted_1 = ['onClick', 'onMouseenter']
const _hoisted_2 = ['onClick']
const _hoisted_3 = {
  key: 0,
  viewBox: '0 0 1024 1024',
  width: '1em',
  height: '1em'
}
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      'div',
      {
        class: _normalizeClass($setup.ns.e('panel'))
      },
      [
        (_openBlock(true),
        _createElementBlock(
          _Fragment,
          null,
          _renderList($setup.menus, (colMenu, colLevel) => {
            return (
              _openBlock(),
              _createBlock(
                $setup['CascaderMenu'],
                {
                  key: colLevel,
                  menu: colMenu,
                  level: colLevel,
                  virtual: $props.virtual,
                  'item-height': $props.itemHeight
                },
                {
                  default: _withCtx(({ option, level: menuLevel, startIndex, idx }) => [
                    (_openBlock(),
                    _createElementBlock(
                      'div',
                      {
                        key: option[$props.config.value],
                        class: _normalizeClass([
                          $setup.ns.e('node'),
                          $setup.ns.is('expanded', $setup.isExpanded(option, menuLevel)),
                          $setup.ns.is(
                            'checked',
                            $props.isChecked($setup.getPath(option, menuLevel))
                          ),
                          $setup.ns.is('disabled', option[$props.config.disabled]),
                          $setup.ns.is('selectable', $setup.isSelectable(option))
                        ]),
                        style: _normalizeStyle(
                          $props.virtual
                            ? {
                                position: 'absolute',
                                top: `${(startIndex + idx) * $props.itemHeight}px`,
                                left: 0,
                                right: 0,
                                height: `${$props.itemHeight}px`
                              }
                            : {}
                        ),
                        onMousedown:
                          _cache[0] || (_cache[0] = _withModifiers(() => {}, ['prevent'])),
                        onClick: ($event) => $setup.handleClick(option, menuLevel, $event),
                        onMouseenter: ($event) => $setup.handleMouseEnter(option, menuLevel)
                      },
                      [
                        _createCommentVNode(' \u591A\u9009\u590D\u9009\u6846 '),
                        $props.isMultiple && $setup.isSelectable(option)
                          ? (_openBlock(),
                            _createElementBlock(
                              'span',
                              {
                                key: 0,
                                class: _normalizeClass($setup.ns.e('checkbox')),
                                onClick: _withModifiers(
                                  ($event) => $setup.handleCheckboxClick(option, menuLevel, $event),
                                  ['stop']
                                )
                              },
                              [
                                _createElementVNode(
                                  'span',
                                  {
                                    class: _normalizeClass([
                                      $setup.ns.e('checkbox-inner'),
                                      $setup.ns.is(
                                        'checked',
                                        $props.isChecked($setup.getPath(option, menuLevel))
                                      )
                                    ])
                                  },
                                  [
                                    $props.isChecked($setup.getPath(option, menuLevel))
                                      ? (_openBlock(),
                                        _createElementBlock('svg', _hoisted_3, [
                                          ...(_cache[1] ||
                                            (_cache[1] = [
                                              _createElementVNode(
                                                'path',
                                                {
                                                  fill: 'currentColor',
                                                  d: 'M406.656 706.944L195.84 496.256a32 32 0 1 0-45.248 45.248l256 256 512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z'
                                                },
                                                null,
                                                -1
                                                /* CACHED */
                                              )
                                            ]))
                                        ]))
                                      : _createCommentVNode('v-if', true)
                                  ],
                                  2
                                  /* CLASS */
                                )
                              ],
                              10,
                              _hoisted_2
                            ))
                          : _createCommentVNode('v-if', true),
                        _createCommentVNode(' \u6807\u7B7E\u5185\u5BB9 '),
                        _createElementVNode(
                          'span',
                          {
                            class: _normalizeClass($setup.ns.e('label'))
                          },
                          [
                            _renderSlot(
                              _ctx.$slots,
                              'default',
                              {
                                node: option,
                                data: option
                              },
                              () => [
                                _createTextVNode(
                                  _toDisplayString(option[$props.config.label]),
                                  1
                                  /* TEXT */
                                )
                              ]
                            )
                          ],
                          2
                          /* CLASS */
                        ),
                        _createCommentVNode(' \u5C55\u5F00\u56FE\u6807 '),
                        $setup.hasChildren(option)
                          ? (_openBlock(),
                            _createElementBlock(
                              'span',
                              {
                                key: 1,
                                class: _normalizeClass($setup.ns.e('expand-icon'))
                              },
                              [
                                ...(_cache[2] ||
                                  (_cache[2] = [
                                    _createElementVNode(
                                      'svg',
                                      {
                                        viewBox: '0 0 1024 1024',
                                        width: '1em',
                                        height: '1em'
                                      },
                                      [
                                        _createElementVNode('path', {
                                          fill: 'currentColor',
                                          d: 'M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z'
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
                      46,
                      _hoisted_1
                    ))
                  ]),
                  _: 3
                  /* FORWARDED */
                },
                8,
                ['menu', 'level', 'virtual', 'item-height']
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
import { computed, ref, watch, defineComponent, h } from 'vue'
import { useLocale } from '../../../hooks/index.js'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
const __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhCascaderPanel'
  },
  {
    __name: 'cascader-panel',
    props: {
      options: { type: Array, required: false, default: () => [] },
      expandedPath: { type: Array, required: true, default: () => [] },
      config: { type: Object, required: true },
      isMultiple: { type: Boolean, required: true, default: false },
      isChecked: { type: Function, required: true },
      virtual: { type: Boolean, required: false, default: false },
      itemHeight: { type: Number, required: false, default: 34 }
    },
    emits: ['expand', 'check'],
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose()
      const props = __props
      const emit = __emit
      const ns = useNamespace('cascader')
      const { t } = useLocale()
      const CascaderMenu = defineComponent({
        name: 'CascaderMenu',
        props: {
          menu: { type: Array, required: true },
          level: { type: Number, required: true },
          virtual: Boolean,
          itemHeight: { type: Number, default: 34 }
        },
        setup(menuProps, { slots }) {
          const scrollTop = ref(0)
          const visibleInfo = computed(() => {
            if (!menuProps.virtual) return { options: menuProps.menu, startIndex: 0 }
            const containerHeight = 274
            const visibleCount = Math.ceil(containerHeight / menuProps.itemHeight) + 2
            const st = scrollTop.value
            const maxStartIndex = Math.max(0, menuProps.menu.length - visibleCount)
            const startIndex = Math.min(
              Math.max(0, Math.floor(st / menuProps.itemHeight) - 1),
              maxStartIndex
            )
            return {
              options: menuProps.menu.slice(startIndex, startIndex + visibleCount + 2),
              startIndex
            }
          })
          const handleScroll = (e) => {
            scrollTop.value = e.target.scrollTop
          }
          watch(
            () => menuProps.menu,
            () => {
              scrollTop.value = 0
            }
          )
          return () =>
            h(
              'div',
              {
                class: [ns.e('menu'), menuProps.virtual && ns.is('virtual')],
                onScroll: handleScroll
              },
              [
                menuProps.virtual
                  ? h(
                      'div',
                      {
                        style: {
                          height: `${menuProps.menu.length * menuProps.itemHeight}px`,
                          position: 'relative'
                        }
                      },
                      visibleInfo.value.options.map((option, idx) => {
                        var _a
                        return (_a = slots.default) == null
                          ? void 0
                          : _a.call(slots, {
                              option,
                              level: menuProps.level,
                              startIndex: visibleInfo.value.startIndex,
                              idx
                            })
                      })
                    )
                  : menuProps.menu.map((option) => {
                      var _a
                      return (_a = slots.default) == null
                        ? void 0
                        : _a.call(slots, {
                            option,
                            level: menuProps.level
                          })
                    }),
                // 空状态处理
                menuProps.menu.length === 0
                  ? h('div', { class: ns.e('empty') }, t('cascader.noData'))
                  : null
              ]
            )
        }
      })
      const menus = computed(() => {
        const result = [props.options || []]
        let currentOptions = props.options || []
        for (const value of props.expandedPath) {
          const option = currentOptions.find((o) => o[props.config.value] === value)
          const children = option ? option[props.config.children] : void 0
          if (option && children && children.length) {
            result.push(children)
            currentOptions = children
          } else {
            break
          }
        }
        return result
      })
      const isExpanded = (option, level) => props.expandedPath[level] === option[props.config.value]
      const hasChildren = (option) => {
        const children = option[props.config.children]
        return !!(children && children.length > 0)
      }
      const isLeaf = (option) => {
        const leaf = option[props.config.leaf]
        if (leaf !== void 0) return leaf
        return !hasChildren(option)
      }
      const isSelectable = (option) => (props.config.checkStrictly ? true : isLeaf(option))
      const getPath = (option, level) => [
        ...props.expandedPath.slice(0, level),
        option[props.config.value]
      ]
      const handleCheckboxClick = (option, level, event) => {
        event.stopPropagation()
        if (option[props.config.disabled] || !isSelectable(option)) return
        emit('check', option, getPath(option, level))
      }
      const handleClick = (option, level, event) => {
        event.stopPropagation()
        if (option[props.config.disabled]) return
        const path = getPath(option, level)
        if (hasChildren(option)) emit('expand', option, level)
        if (!props.isMultiple && isSelectable(option)) {
          emit('check', option, path)
        } else if (props.isMultiple && props.config.checkStrictly && !hasChildren(option)) {
          emit('check', option, path)
        }
      }
      const handleMouseEnter = (option, level) => {
        if (props.config.expandTrigger !== 'hover' || option[props.config.disabled]) return
        if (hasChildren(option)) emit('expand', option, level)
      }
      const __returned__ = {
        props,
        emit,
        ns,
        t,
        CascaderMenu,
        menus,
        isExpanded,
        hasChildren,
        isLeaf,
        isSelectable,
        getPath,
        handleCheckboxClick,
        handleClick,
        handleMouseEnter,
        computed,
        ref,
        watch,
        defineComponent,
        h,
        get useNamespace() {
          return useNamespace
        },
        get useLocale() {
          return useLocale
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
