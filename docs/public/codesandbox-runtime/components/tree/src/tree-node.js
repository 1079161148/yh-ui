import {
  createCommentVNode as _createCommentVNode,
  renderSlot as _renderSlot,
  createElementVNode as _createElementVNode,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  Fragment as _Fragment,
  normalizeClass as _normalizeClass,
  withModifiers as _withModifiers,
  createBlock as _createBlock,
  toDisplayString as _toDisplayString,
  createTextVNode as _createTextVNode,
  normalizeStyle as _normalizeStyle,
  renderList as _renderList,
  resolveComponent as _resolveComponent,
  withCtx as _withCtx,
  vShow as _vShow,
  withDirectives as _withDirectives
} from 'vue'
const _hoisted_1 = ['draggable']
const _hoisted_2 = {
  key: 0,
  class: 'loading-icon',
  viewBox: '0 0 1024 1024',
  width: '14',
  height: '14'
}
const _hoisted_3 = {
  key: 0,
  viewBox: '0 0 1024 1024',
  width: '12',
  height: '12'
}
const _hoisted_4 = {
  key: 1,
  viewBox: '0 0 1024 1024',
  width: '12',
  height: '12'
}
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_yh_tree_node = _resolveComponent('yh-tree-node')
  return _withDirectives(
    (_openBlock(),
    _createElementBlock(
      'div',
      {
        class: _normalizeClass($setup.nodeClass),
        role: 'treeitem'
      },
      [
        _createElementVNode(
          'div',
          {
            class: _normalizeClass($setup.ns.e('content')),
            style: _normalizeStyle($setup.nodeStyle),
            draggable: $setup.tree.props.draggable && !$props.node.disabled,
            onClick: $setup.handleContentClick,
            onDragstart: $setup.handleDragStart,
            onDragover: $setup.handleDragOver,
            onDragenter: $setup.handleDragEnter,
            onDragleave: $setup.handleDragLeave,
            onDragend: $setup.handleDragEnd,
            onDrop: $setup.handleDrop
          },
          [
            _createCommentVNode(' \u5C55\u5F00\u56FE\u6807 '),
            _createElementVNode(
              'span',
              {
                class: _normalizeClass([
                  $setup.ns.e('expand-icon'),
                  {
                    [$setup.ns.is('expanded')]: $props.node.expanded,
                    [$setup.ns.is('loading')]: $props.node.loading
                  }
                ]),
                onClick: $setup.handleExpandClick
              },
              [
                _renderSlot(
                  _ctx.$slots,
                  'icon',
                  {
                    node: $props.node,
                    data: $props.node.rawData
                  },
                  () => {
                    var _a
                    return [
                      $props.node.loading
                        ? (_openBlock(),
                          _createElementBlock('svg', _hoisted_2, [
                            ...(_cache[2] ||
                              (_cache[2] = [
                                _createElementVNode(
                                  'path',
                                  {
                                    d: 'M512 1024c-282.77 0-512-229.23-512-512s229.23-512 512-512c28.28 0 51.2 22.92 51.2 51.2s-22.92 51.2-51.2 51.2c-226.28 0-409.6 183.32-409.6 409.6s183.32 409.6 409.6 409.6 409.6-183.32 409.6-409.6c0-28.28 22.92-51.2 51.2-51.2s51.2 22.92 51.2 51.2c0 282.77-229.23 512-512 512z',
                                    fill: 'currentColor'
                                  },
                                  null,
                                  -1
                                  /* CACHED */
                                )
                              ]))
                          ]))
                        : !$props.node.isLeaf &&
                            (((_a = $props.node.children) == null ? void 0 : _a.length) ||
                              $setup.tree.props.lazy)
                          ? (_openBlock(),
                            _createElementBlock(
                              _Fragment,
                              { key: 1 },
                              [
                                $props.node.expanded
                                  ? (_openBlock(),
                                    _createElementBlock('svg', _hoisted_3, [
                                      ...(_cache[3] ||
                                        (_cache[3] = [
                                          _createElementVNode(
                                            'path',
                                            {
                                              d: 'M192 384l320 320 320-320z',
                                              fill: 'currentColor'
                                            },
                                            null,
                                            -1
                                            /* CACHED */
                                          )
                                        ]))
                                    ]))
                                  : (_openBlock(),
                                    _createElementBlock('svg', _hoisted_4, [
                                      ...(_cache[4] ||
                                        (_cache[4] = [
                                          _createElementVNode(
                                            'path',
                                            {
                                              d: 'M384 192l320 320-320 320z',
                                              fill: 'currentColor'
                                            },
                                            null,
                                            -1
                                            /* CACHED */
                                          )
                                        ]))
                                    ]))
                              ],
                              64
                              /* STABLE_FRAGMENT */
                            ))
                          : (_openBlock(),
                            _createElementBlock(
                              'span',
                              {
                                key: 2,
                                class: _normalizeClass($setup.ns.e('expand-placeholder'))
                              },
                              null,
                              2
                              /* CLASS */
                            ))
                    ]
                  }
                )
              ],
              2
              /* CLASS */
            ),
            _createCommentVNode(' \u5DE6\u4FA7\u590D\u9009\u6846 '),
            $setup.tree.props.showCheckbox && $setup.tree.props.checkboxPosition === 'left'
              ? (_openBlock(),
                _createBlock(
                  $setup['YhCheckbox'],
                  {
                    key: 0,
                    'model-value': $props.node.checked,
                    indeterminate: $props.node.indeterminate,
                    disabled: $props.node.disabled,
                    'onUpdate:modelValue': $setup.handleCheckChange,
                    onClick: _cache[0] || (_cache[0] = _withModifiers(() => {}, ['stop']))
                  },
                  null,
                  8,
                  ['model-value', 'indeterminate', 'disabled']
                ))
              : _createCommentVNode('v-if', true),
            _createCommentVNode(' \u524D\u7F00\u63D2\u69FD '),
            _renderSlot(_ctx.$slots, 'prefix', {
              node: $props.node,
              data: $props.node.rawData
            }),
            _createCommentVNode(
              ' \u5FEB\u6377\u56FE\u6807 (\u901A\u8FC7 rawData.icon \u6E32\u67D3) '
            ),
            $props.node.icon
              ? (_openBlock(),
                _createBlock(
                  $setup['YhIcon'],
                  {
                    key: 1,
                    name: $props.node.icon,
                    class: _normalizeClass($setup.ns.e('icon'))
                  },
                  null,
                  8,
                  ['name', 'class']
                ))
              : _createCommentVNode('v-if', true),
            _createCommentVNode(' \u8282\u70B9\u5185\u5BB9 '),
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
                    node: $props.node,
                    data: $props.node.rawData
                  },
                  () => [
                    _createTextVNode(
                      _toDisplayString($props.node.label),
                      1
                      /* TEXT */
                    )
                  ]
                )
              ],
              2
              /* CLASS */
            ),
            _createCommentVNode(' \u540E\u7F00\u63D2\u69FD '),
            _renderSlot(_ctx.$slots, 'suffix', {
              node: $props.node,
              data: $props.node.rawData
            }),
            _createCommentVNode(' \u53F3\u4FA7\u590D\u9009\u6846 '),
            $setup.tree.props.showCheckbox && $setup.tree.props.checkboxPosition === 'right'
              ? (_openBlock(),
                _createBlock(
                  $setup['YhCheckbox'],
                  {
                    key: 2,
                    'model-value': $props.node.checked,
                    indeterminate: $props.node.indeterminate,
                    disabled: $props.node.disabled,
                    'onUpdate:modelValue': $setup.handleCheckChange,
                    onClick: _cache[1] || (_cache[1] = _withModifiers(() => {}, ['stop']))
                  },
                  null,
                  8,
                  ['model-value', 'indeterminate', 'disabled']
                ))
              : _createCommentVNode('v-if', true)
          ],
          46,
          _hoisted_1
        ),
        _createCommentVNode(
          ' \u5B50\u8282\u70B9 (\u975E\u865A\u62DF\u6EDA\u52A8\u6A21\u5F0F\u4E0B\u9012\u5F52\u6E32\u67D3) '
        ),
        !$setup.tree.props.virtual && $props.node.children && $props.node.children.length > 0
          ? _withDirectives(
              (_openBlock(),
              _createElementBlock(
                'div',
                {
                  key: 0,
                  class: _normalizeClass($setup.ns.e('children')),
                  role: 'group'
                },
                [
                  (_openBlock(true),
                  _createElementBlock(
                    _Fragment,
                    null,
                    _renderList($props.node.children, (child) => {
                      return (
                        _openBlock(),
                        _createBlock(
                          _component_yh_tree_node,
                          {
                            key: child.key,
                            node: child
                          },
                          {
                            default: _withCtx(({ node: childNode, data: childData }) => [
                              _renderSlot(_ctx.$slots, 'default', {
                                node: childNode,
                                data: childData
                              })
                            ]),
                            icon: _withCtx(({ node: childNode, data: childData }) => [
                              _renderSlot(_ctx.$slots, 'icon', {
                                node: childNode,
                                data: childData
                              })
                            ]),
                            prefix: _withCtx(({ node: childNode, data: childData }) => [
                              _renderSlot(_ctx.$slots, 'prefix', {
                                node: childNode,
                                data: childData
                              })
                            ]),
                            suffix: _withCtx(({ node: childNode, data: childData }) => [
                              _renderSlot(_ctx.$slots, 'suffix', {
                                node: childNode,
                                data: childData
                              })
                            ]),
                            _: 3
                            /* FORWARDED */
                          },
                          8,
                          ['node']
                        )
                      )
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ],
                2
                /* CLASS */
              )),
              [[_vShow, $props.node.expanded]]
            )
          : _createCommentVNode('v-if', true)
      ],
      2
      /* CLASS */
    )),
    [[_vShow, $props.node.visible]]
  )
}
import { computed, inject } from 'vue'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { TREE_INJECTION_KEY } from './tree'
import { YhIcon } from '../../icon'
import { YhCheckbox } from '../../checkbox'
const __sfc__ = /* @__PURE__ */ Object.assign(
  { name: 'YhTreeNode' },
  {
    __name: 'tree-node',
    props: {
      node: { type: Object, required: true }
    },
    setup(__props, { expose: __expose }) {
      __expose()
      const props = __props
      const ns = useNamespace('tree')
      const tree = inject(TREE_INJECTION_KEY)
      const nodeStyle = computed(() => ({
        paddingLeft: `${props.node.level * tree.props.indent}px`
      }))
      const isCurrent = computed(() => tree.currentNodeKey.value === props.node.key)
      const nodeClass = computed(() => {
        var _a
        return [
          ns.e('node'),
          props.node.class,
          // 支持自定义类名
          {
            [ns.is('expanded')]: props.node.expanded,
            [ns.is('current')]: isCurrent.value && tree.props.highlightCurrent,
            [ns.is('disabled')]: props.node.disabled,
            [ns.is('checked')]: props.node.checked,
            [ns.is('leaf')]:
              props.node.isLeaf || !((_a = props.node.children) == null ? void 0 : _a.length),
            [ns.is('dragging')]: tree.draggingNodeKey.value === props.node.key,
            [ns.is('drop-inner')]:
              tree.dropTargetNodeKey.value === props.node.key &&
              tree.dropPosition.value === 'inner',
            [ns.is('drop-before')]:
              tree.dropTargetNodeKey.value === props.node.key &&
              tree.dropPosition.value === 'before',
            [ns.is('drop-after')]:
              tree.dropTargetNodeKey.value === props.node.key && tree.dropPosition.value === 'after'
          }
        ]
      })
      const handleDragStart = (e) => {
        if (!tree.props.draggable || props.node.disabled) return
        tree.handleDragStart(props.node, e)
      }
      const handleDragOver = (e) => {
        if (!tree.props.draggable) return
        e.preventDefault()
        tree.handleDragOver(props.node, e)
      }
      const handleDragEnter = (e) => {
        if (!tree.props.draggable) return
        e.preventDefault()
        tree.handleDragEnter(props.node, e)
      }
      const handleDragLeave = (e) => {
        if (!tree.props.draggable) return
        tree.handleDragLeave(props.node, e)
      }
      const handleDragEnd = (e) => {
        if (!tree.props.draggable) return
        tree.handleDragEnd(props.node, e)
      }
      const handleDrop = (e) => {
        if (!tree.props.draggable) return
        e.preventDefault()
        tree.handleDrop(props.node, e)
      }
      const handleExpandClick = (e) => {
        e.stopPropagation()
        tree.handleNodeExpand(props.node)
      }
      const handleContentClick = (e) => {
        tree.handleNodeClick(props.node, e)
      }
      const handleCheckChange = (checked) => {
        tree.handleNodeCheck(props.node, Boolean(checked))
      }
      const __returned__ = {
        props,
        ns,
        tree,
        nodeStyle,
        isCurrent,
        nodeClass,
        handleDragStart,
        handleDragOver,
        handleDragEnter,
        handleDragLeave,
        handleDragEnd,
        handleDrop,
        handleExpandClick,
        handleContentClick,
        handleCheckChange,
        computed,
        inject,
        get useNamespace() {
          return useNamespace
        },
        get TREE_INJECTION_KEY() {
          return TREE_INJECTION_KEY
        },
        get YhIcon() {
          return YhIcon
        },
        get YhCheckbox() {
          return YhCheckbox
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
