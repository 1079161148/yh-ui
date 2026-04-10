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
  renderList as _renderList,
  Fragment as _Fragment,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  renderSlot as _renderSlot,
  withCtx as _withCtx,
  createBlock as _createBlock,
  normalizeStyle as _normalizeStyle,
  createElementVNode as _createElementVNode,
  createCommentVNode as _createCommentVNode,
  toDisplayString as _toDisplayString,
  createTextVNode as _createTextVNode,
  normalizeClass as _normalizeClass
} from 'vue'
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      'div',
      {
        class: _normalizeClass([$setup.ns.b(), _ctx.showLine && $setup.ns.m('show-line')]),
        style: _normalizeStyle($setup.themeStyle),
        role: 'tree'
      },
      [
        $setup.props.virtual
          ? (_openBlock(),
            _createElementBlock(
              'div',
              {
                key: 0,
                ref: 'innerScrollRef',
                style: _normalizeStyle({
                  height: $setup.props.height + 'px',
                  overflowY: 'auto'
                }),
                onScroll: $setup.handleScroll
              },
              [
                _createElementVNode(
                  'div',
                  {
                    style: _normalizeStyle({
                      height: $setup.totalHeight + 'px',
                      position: 'relative'
                    })
                  },
                  [
                    _createElementVNode(
                      'div',
                      {
                        style: _normalizeStyle({
                          transform: `translateY(${$setup.offset}px)`
                        })
                      },
                      [
                        (_openBlock(true),
                        _createElementBlock(
                          _Fragment,
                          null,
                          _renderList($setup.visibleNodes, (node) => {
                            return (
                              _openBlock(),
                              _createBlock(
                                $setup['TreeNodeComponent'],
                                {
                                  key: node.key,
                                  node
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
                      4
                      /* STYLE */
                    )
                  ],
                  4
                  /* STYLE */
                )
              ],
              36
              /* STYLE, NEED_HYDRATION */
            ))
          : $setup.treeNodes.length > 0
            ? (_openBlock(true),
              _createElementBlock(
                _Fragment,
                { key: 1 },
                _renderList($setup.treeNodes, (node) => {
                  return (
                    _openBlock(),
                    _createBlock(
                      $setup['TreeNodeComponent'],
                      {
                        key: node.key,
                        node
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
            : (_openBlock(),
              _createElementBlock(
                'div',
                {
                  key: 2,
                  class: _normalizeClass($setup.ns.e('empty'))
                },
                [
                  _renderSlot(_ctx.$slots, 'empty', {}, () => [
                    _createTextVNode(
                      _toDisplayString(_ctx.emptyText || $setup.t('tree.emptyText')),
                      1
                      /* TEXT */
                    )
                  ])
                ],
                2
                /* CLASS */
              ))
      ],
      6
      /* CLASS, STYLE */
    )
  )
}
import { ref, computed, provide, watch, shallowRef } from 'vue'
import { useLocale } from '../../../hooks/index.js'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { useComponentTheme } from '../../../theme/component-theme.js'
import { treeProps, treeEmits, TREE_INJECTION_KEY } from './tree'
import TreeNodeComponent from './tree-node.js'
const __sfc__ = /* @__PURE__ */ Object.assign(
  { name: 'YhTree' },
  {
    __name: 'tree',
    props: treeProps,
    emits: treeEmits,
    setup(__props, { expose: __expose, emit: __emit }) {
      const props = __props
      const emit = __emit
      const ns = useNamespace('tree')
      const { t } = useLocale()
      const { themeStyle } = useComponentTheme(
        'tree',
        computed(() => props.themeOverrides)
      )
      const expandedKeys = ref(new Set(props.defaultExpandedKeys))
      const checkedKeys = ref(new Set(props.defaultCheckedKeys))
      const currentNodeKey = ref(props.currentNodeKey)
      const nodeMap = shallowRef(/* @__PURE__ */ new Map())
      const treeNodes = ref([])
      const scrollTop = ref(0)
      const handleScroll = (e) => {
        scrollTop.value = e.target.scrollTop
      }
      const totalHeight = computed(() => flattenedNodes.value.length * props.itemHeight)
      const startIndex = computed(() => Math.floor(scrollTop.value / props.itemHeight))
      const visibleCount = computed(() => Math.ceil(props.height / props.itemHeight))
      const endIndex = computed(() => startIndex.value + visibleCount.value)
      const visibleNodes = computed(() =>
        flattenedNodes.value.slice(startIndex.value, endIndex.value + 1)
      )
      const offset = computed(() => startIndex.value * props.itemHeight)
      const buildTree = (data, parent = null, level = 0) => {
        const {
          label: labelKey = 'label',
          children: childrenKey = 'children',
          disabled: disabledKey = 'disabled'
        } = props.props || {}
        return data.map((item) => {
          var _a, _b, _c, _d
          const key =
            (_b = (_a = item[props.nodeKey]) != null ? _a : item.key) != null ? _b : item.id
          const node = __spreadProps(__spreadValues({}, item), {
            key,
            label: String((_d = (_c = item[labelKey]) != null ? _c : item.label) != null ? _d : ''),
            disabled: !!item[disabledKey] || !!item.disabled,
            level,
            parent,
            expanded: props.defaultExpandAll || expandedKeys.value.has(key),
            checked: checkedKeys.value.has(key),
            indeterminate: false,
            visible: true,
            loading: false,
            loaded: !props.lazy,
            rawData: item,
            children: void 0
          })
          nodeMap.value.set(key, node)
          const childrenData = item[childrenKey]
          if (childrenData && childrenData.length > 0) {
            node.children = buildTree(childrenData, node, level + 1)
          }
          return node
        })
      }
      watch(
        () => props.data,
        (newData) => {
          nodeMap.value.clear()
          treeNodes.value = buildTree(newData)
          if (currentNodeKey.value) {
            const node = nodeMap.value.get(currentNodeKey.value)
            if (node) {
            }
          }
        },
        { immediate: true, deep: true }
      )
      watch(
        () => props.currentNodeKey,
        (val) => {
          if (val !== currentNodeKey.value) {
            currentNodeKey.value = val
          }
        }
      )
      const flattenedNodes = computed(() => {
        const result = []
        const traverse = (nodes) => {
          nodes.forEach((node) => {
            if (!node.visible) return
            result.push(node)
            if (node.expanded && node.children) {
              traverse(node.children)
            }
          })
        }
        traverse(treeNodes.value)
        return result
      })
      const handleNodeClick = (node, e) => {
        var _a
        if (node.disabled) return
        currentNodeKey.value = node.key
        emit('update:currentNodeKey', node.key)
        emit('current-change', node)
        if (
          props.expandOnClickNode &&
          !node.isLeaf &&
          (((_a = node.children) == null ? void 0 : _a.length) || props.lazy)
        ) {
          handleNodeExpand(node)
        }
        if (props.checkOnClickNode && props.showCheckbox) {
          handleNodeCheck(node, !node.checked)
        }
        emit('node-click', node, e)
      }
      const handleNodeExpand = async (node) => {
        if (node.isLeaf) return
        if (props.lazy && !node.loaded && props.load) {
          if (node.loading) return
          node.loading = true
          try {
            const children = await props.load(node)
            node.children = buildTree(children, node, node.level + 1)
            node.loaded = true
          } finally {
            node.loading = false
          }
        }
        const newExpanded = !node.expanded
        node.expanded = newExpanded
        if (newExpanded) {
          expandedKeys.value.add(node.key)
          if (props.accordion) {
            const siblings = node.parent ? node.parent.children : treeNodes.value
            siblings == null
              ? void 0
              : siblings.forEach((sibling) => {
                  if (sibling.key !== node.key && sibling.expanded) {
                    sibling.expanded = false
                    expandedKeys.value.delete(sibling.key)
                  }
                })
          }
        } else {
          expandedKeys.value.delete(node.key)
        }
        emit('node-expand', node, newExpanded)
      }
      const handleNodeCheck = (node, checked) => {
        if (node.disabled) return
        node.checked = checked
        node.indeterminate = false
        if (checked) {
          checkedKeys.value.add(node.key)
        } else {
          checkedKeys.value.delete(node.key)
        }
        if (!props.checkStrictly) {
          const updateChildren = (children) => {
            children == null
              ? void 0
              : children.forEach((child) => {
                  if (!child.disabled) {
                    child.checked = checked
                    child.indeterminate = false
                    if (checked) {
                      checkedKeys.value.add(child.key)
                    } else {
                      checkedKeys.value.delete(child.key)
                    }
                    updateChildren(child.children)
                  }
                })
          }
          updateChildren(node.children)
          const updateParent = (parent) => {
            if (!parent) return
            const children = parent.children || []
            const checkedCount = children.filter((c) => c.checked).length
            const indeterminateCount = children.filter((c) => c.indeterminate).length
            if (checkedCount === children.length) {
              parent.checked = true
              parent.indeterminate = false
              checkedKeys.value.add(parent.key)
            } else if (checkedCount > 0 || indeterminateCount > 0) {
              parent.checked = false
              parent.indeterminate = true
              checkedKeys.value.delete(parent.key)
            } else {
              parent.checked = false
              parent.indeterminate = false
              checkedKeys.value.delete(parent.key)
            }
            updateParent(parent.parent)
          }
          updateParent(node.parent)
        }
        emit('check', node, checked, Array.from(checkedKeys.value))
      }
      const setCurrentKey = (key) => {
        currentNodeKey.value = key
        emit('update:currentNodeKey', key)
      }
      const filter = (query) => {
        const filterFn = props.filterMethod || ((q, node) => node.label.includes(q))
        const filterNodes = (nodes) => {
          let hasVisible = false
          nodes.forEach((node) => {
            let visible = filterFn(query, node)
            if (node.children) {
              const childVisible = filterNodes(node.children)
              visible = visible || childVisible
            }
            node.visible = visible
            if (visible) hasVisible = true
          })
          return hasVisible
        }
        if (query) {
          filterNodes(treeNodes.value)
        } else {
          const resetVisible = (nodes) => {
            nodes.forEach((node) => {
              node.visible = true
              if (node.children) resetVisible(node.children)
            })
          }
          resetVisible(treeNodes.value)
        }
      }
      const getCheckedNodes = () => {
        return flattenedNodes.value.filter((node) => node.checked)
      }
      const getCheckedKeys = () => {
        return Array.from(checkedKeys.value)
      }
      const setCheckedKeys = (keys) => {
        checkedKeys.value = new Set(keys)
        nodeMap.value.forEach((node, key) => {
          node.checked = keys.includes(key)
          node.indeterminate = false
        })
      }
      const dragNode = ref(null)
      const draggingNodeKey = ref(void 0)
      const dropTargetNodeKey = ref(void 0)
      const dropPosition = ref(void 0)
      const handleDragStart = (node, e) => {
        dragNode.value = node
        draggingNodeKey.value = node.key
        if (e.dataTransfer) {
          e.dataTransfer.effectAllowed = 'move'
          e.dataTransfer.setData('text/plain', '')
        }
        emit('node-drag-start', node, e)
      }
      const handleDragOver = (node, e) => {
        e.preventDefault()
        if (e.dataTransfer) e.dataTransfer.dropEffect = 'move'
        const el = e.currentTarget
        if (!el) return
        const rect = el.getBoundingClientRect()
        const offsetTop = e.clientY - rect.top
        let position = 'inner'
        if (offsetTop < rect.height * 0.25) {
          position = 'before'
        } else if (offsetTop > rect.height * 0.75) {
          position = 'after'
        }
        dropPosition.value = position
        dropTargetNodeKey.value = node.key
        emit('node-drag-over', node, e)
      }
      const handleDragEnter = (node, e) => {
        e.preventDefault()
        dropTargetNodeKey.value = node.key
        emit('node-drag-enter', node, e)
      }
      const handleDragLeave = (node, e) => {
        if (dropTargetNodeKey.value === node.key) {
        }
        emit('node-drag-leave', node, e)
      }
      const handleDragEnd = (_node, _e) => {
        dragNode.value = null
        draggingNodeKey.value = void 0
        dropTargetNodeKey.value = void 0
        dropPosition.value = void 0
      }
      const handleDrop = (node, e) => {
        e.preventDefault()
        if (!dragNode.value) return
        let curr = node.parent
        while (curr) {
          if (curr.key === dragNode.value.key) return
          curr = curr.parent
        }
        emit('node-drop', dragNode.value, node, dropPosition.value || 'inner', e)
        draggingNodeKey.value = void 0
        dropTargetNodeKey.value = void 0
        dropPosition.value = void 0
      }
      watch(
        () => props.currentNodeKey,
        (val) => {
          currentNodeKey.value = val
        }
      )
      provide(TREE_INJECTION_KEY, {
        props,
        currentNodeKey,
        expandedKeys,
        checkedKeys,
        draggingNodeKey,
        dropTargetNodeKey,
        dropPosition,
        handleNodeClick,
        handleNodeExpand,
        handleNodeCheck,
        setCurrentKey,
        handleDragStart,
        handleDragOver,
        handleDragEnter,
        handleDragLeave,
        handleDragEnd,
        handleDrop
      })
      const getNode = (key) => {
        return nodeMap.value.get(key)
      }
      const getHalfCheckedNodes = () => {
        const result = []
        nodeMap.value.forEach((node) => {
          if (node.indeterminate) result.push(node)
        })
        return result
      }
      const getHalfCheckedKeys = () => {
        return getHalfCheckedNodes().map((node) => node.key)
      }
      const getCurrentKey = () => currentNodeKey.value
      const getCurrentNode = () =>
        currentNodeKey.value ? nodeMap.value.get(currentNodeKey.value) : void 0
      const setExpandedKeys = (keys) => {
        expandedKeys.value = new Set(keys)
        nodeMap.value.forEach((node, key) => {
          node.expanded = keys.includes(key)
        })
      }
      const expandNode = (key) => {
        const node = nodeMap.value.get(key)
        if (node && !node.expanded) handleNodeExpand(node)
      }
      const collapseNode = (key) => {
        const node = nodeMap.value.get(key)
        if (node && node.expanded) handleNodeExpand(node)
      }
      const setChecked = (key, checked, deep = true) => {
        const node = nodeMap.value.get(key)
        if (!node || node.disabled) return
        if (deep && !props.checkStrictly) {
          handleNodeCheck(node, checked)
        } else {
          node.checked = checked
          if (checked) checkedKeys.value.add(key)
          else checkedKeys.value.delete(key)
          emit('check', node, checked, Array.from(checkedKeys.value))
        }
      }
      const innerScrollRef = ref()
      const scrollTo = (options) => {
        var _a
        if (props.virtual) {
          ;(_a = innerScrollRef.value) == null
            ? void 0
            : _a.scrollTo(typeof options === 'number' ? { top: options } : options)
        }
      }
      const scrollToNode = (key) => {
        if (!props.virtual) return
        const index = flattenedNodes.value.findIndex((n) => n.key === key)
        if (index !== -1) {
          scrollTo(index * props.itemHeight)
        }
      }
      const setCheckedNodes = (nodes) => {
        const keys = nodes.map((node) => {
          var _a, _b
          return (_b = (_a = node[props.nodeKey]) != null ? _a : node.key) != null ? _b : node.id
        })
        setCheckedKeys(keys)
      }
      const setData = (data) => {
        nodeMap.value.clear()
        treeNodes.value = buildTree(data)
      }
      __expose({
        filter,
        getNode,
        getCheckedNodes,
        getCheckedKeys,
        getHalfCheckedNodes,
        getHalfCheckedKeys,
        getCurrentKey,
        getCurrentNode,
        setChecked,
        setCheckedKeys,
        setCheckedNodes,
        setCurrentKey,
        setExpandedKeys,
        setData,
        expandNode,
        collapseNode,
        scrollTo,
        scrollToNode,
        expandedKeys,
        checkedKeys
      })
      const __returned__ = {
        props,
        emit,
        ns,
        t,
        themeStyle,
        expandedKeys,
        checkedKeys,
        currentNodeKey,
        nodeMap,
        treeNodes,
        scrollTop,
        handleScroll,
        totalHeight,
        startIndex,
        visibleCount,
        endIndex,
        visibleNodes,
        offset,
        buildTree,
        flattenedNodes,
        handleNodeClick,
        handleNodeExpand,
        handleNodeCheck,
        setCurrentKey,
        filter,
        getCheckedNodes,
        getCheckedKeys,
        setCheckedKeys,
        dragNode,
        draggingNodeKey,
        dropTargetNodeKey,
        dropPosition,
        handleDragStart,
        handleDragOver,
        handleDragEnter,
        handleDragLeave,
        handleDragEnd,
        handleDrop,
        getNode,
        getHalfCheckedNodes,
        getHalfCheckedKeys,
        getCurrentKey,
        getCurrentNode,
        setExpandedKeys,
        expandNode,
        collapseNode,
        setChecked,
        innerScrollRef,
        scrollTo,
        scrollToNode,
        setCheckedNodes,
        setData,
        ref,
        computed,
        provide,
        watch,
        shallowRef,
        get useNamespace() {
          return useNamespace
        },
        get useLocale() {
          return useLocale
        },
        get useComponentTheme() {
          return useComponentTheme
        },
        get treeProps() {
          return treeProps
        },
        get treeEmits() {
          return treeEmits
        },
        get TREE_INJECTION_KEY() {
          return TREE_INJECTION_KEY
        },
        TreeNodeComponent
      }
      Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true })
      return __returned__
    }
  }
)
__sfc__.render = render
var stdin_default = __sfc__
export { stdin_default as default }
