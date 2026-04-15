import {
  renderSlot as _renderSlot,
  withCtx as _withCtx,
  createSlots as _createSlots,
  createVNode as _createVNode,
  createElementVNode as _createElementVNode,
  normalizeClass as _normalizeClass,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  toDisplayString as _toDisplayString,
  createCommentVNode as _createCommentVNode,
  normalizeStyle as _normalizeStyle
} from 'vue'
const _hoisted_1 = ['disabled']
const _hoisted_2 = ['disabled']
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      'div',
      {
        class: _normalizeClass($setup.containerClasses),
        style: _normalizeStyle($setup.themeStyle)
      },
      [
        _createVNode(
          $setup['TransferPanel'],
          {
            ref: 'leftPanelRef',
            data: $setup.leftData,
            checked: $setup.leftChecked,
            title: $setup.leftTitle,
            filterable: $props.filterable,
            'filter-placeholder': $setup.filterPlaceholder,
            'filter-method': $props.filterMethod,
            disabled: $props.disabled,
            size: $props.size,
            props: $setup.props.props,
            'render-content': $props.renderContent,
            virtual: $props.virtual,
            'item-height': $props.itemHeight,
            height: $props.height,
            'show-all-checkbox': $props.showAllCheckbox,
            'empty-text': $setup.leftEmptyText,
            'onUpdate:checked': $setup.handleLeftCheckedChange,
            onCheckedChange: $setup.handleLeftCheckedChange
          },
          _createSlots(
            {
              _: 2
              /* DYNAMIC */
            },
            [
              _ctx.$slots['left-header']
                ? {
                    name: 'header',
                    fn: _withCtx(() => [_renderSlot(_ctx.$slots, 'left-header')]),
                    key: '0'
                  }
                : void 0,
              _ctx.$slots.default
                ? {
                    name: 'default',
                    fn: _withCtx(({ option }) => [_renderSlot(_ctx.$slots, 'default', { option })]),
                    key: '1'
                  }
                : void 0,
              _ctx.$slots['left-empty']
                ? {
                    name: 'empty',
                    fn: _withCtx(() => [_renderSlot(_ctx.$slots, 'left-empty')]),
                    key: '2'
                  }
                : void 0,
              _ctx.$slots['left-footer']
                ? {
                    name: 'footer',
                    fn: _withCtx(() => [_renderSlot(_ctx.$slots, 'left-footer')]),
                    key: '3'
                  }
                : void 0
            ]
          ),
          1032,
          [
            'data',
            'checked',
            'title',
            'filterable',
            'filter-placeholder',
            'filter-method',
            'disabled',
            'size',
            'props',
            'render-content',
            'virtual',
            'item-height',
            'height',
            'show-all-checkbox',
            'empty-text'
          ]
        ),
        _createElementVNode(
          'div',
          {
            class: _normalizeClass($setup.ns.e('buttons'))
          },
          [
            _renderSlot(
              _ctx.$slots,
              'buttons',
              {
                moveToLeft: $setup.moveToLeft,
                moveToRight: $setup.moveToRight,
                leftChecked: $setup.leftChecked,
                rightChecked: $setup.rightChecked
              },
              () => [
                _createElementVNode(
                  'button',
                  {
                    type: 'button',
                    class: _normalizeClass([
                      $setup.ns.e('button'),
                      {
                        'is-disabled': !$setup.canMoveToRight || $props.disabled
                      }
                    ]),
                    disabled: !$setup.canMoveToRight || $props.disabled,
                    onClick: $setup.moveToRight
                  },
                  [
                    (_openBlock(),
                    _createElementBlock(
                      'svg',
                      {
                        class: _normalizeClass($setup.ns.e('button__icon')),
                        viewBox: '0 0 1024 1024'
                      },
                      [
                        ...(_cache[0] ||
                          (_cache[0] = [
                            _createElementVNode(
                              'path',
                              {
                                fill: 'currentColor',
                                d: 'M340.864 149.312a30.592 30.592 0 000 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0042.752 43.458l355.136-362.88a30.592 30.592 0 000-43.52L383.616 106.56a30.592 30.592 0 00-42.752 42.752z'
                              },
                              null,
                              -1
                              /* CACHED */
                            )
                          ]))
                      ],
                      2
                      /* CLASS */
                    )),
                    $props.buttonTexts && $props.buttonTexts[0]
                      ? (_openBlock(),
                        _createElementBlock(
                          'span',
                          {
                            key: 0,
                            class: _normalizeClass($setup.ns.e('button__text'))
                          },
                          _toDisplayString($props.buttonTexts[0]),
                          3
                          /* TEXT, CLASS */
                        ))
                      : _createCommentVNode('v-if', true)
                  ],
                  10,
                  _hoisted_1
                ),
                _createElementVNode(
                  'button',
                  {
                    type: 'button',
                    class: _normalizeClass([
                      $setup.ns.e('button'),
                      {
                        'is-disabled': !$setup.canMoveToLeft || $props.disabled
                      }
                    ]),
                    disabled: !$setup.canMoveToLeft || $props.disabled,
                    onClick: $setup.moveToLeft
                  },
                  [
                    (_openBlock(),
                    _createElementBlock(
                      'svg',
                      {
                        class: _normalizeClass($setup.ns.e('button__icon')),
                        viewBox: '0 0 1024 1024'
                      },
                      [
                        ...(_cache[1] ||
                          (_cache[1] = [
                            _createElementVNode(
                              'path',
                              {
                                fill: 'currentColor',
                                d: 'M685.248 104.256a30.592 30.592 0 010 42.752L373.376 512l311.872 364.992a30.592 30.592 0 11-42.752 43.458L287.38 555.52a30.592 30.592 0 010-43.52l355.136-364.93a30.592 30.592 0 0142.752 0z'
                              },
                              null,
                              -1
                              /* CACHED */
                            )
                          ]))
                      ],
                      2
                      /* CLASS */
                    )),
                    $props.buttonTexts && $props.buttonTexts[1]
                      ? (_openBlock(),
                        _createElementBlock(
                          'span',
                          {
                            key: 0,
                            class: _normalizeClass($setup.ns.e('button__text'))
                          },
                          _toDisplayString($props.buttonTexts[1]),
                          3
                          /* TEXT, CLASS */
                        ))
                      : _createCommentVNode('v-if', true)
                  ],
                  10,
                  _hoisted_2
                )
              ]
            )
          ],
          2
          /* CLASS */
        ),
        _createVNode(
          $setup['TransferPanel'],
          {
            ref: 'rightPanelRef',
            data: $setup.rightData,
            checked: $setup.rightChecked,
            title: $setup.rightTitle,
            filterable: $props.filterable,
            'filter-placeholder': $setup.filterPlaceholder,
            'filter-method': $props.filterMethod,
            disabled: $props.disabled,
            size: $props.size,
            props: $setup.props.props,
            'render-content': $props.renderContent,
            virtual: $props.virtual,
            'item-height': $props.itemHeight,
            height: $props.height,
            'show-all-checkbox': $props.showAllCheckbox,
            'empty-text': $setup.rightEmptyText,
            'onUpdate:checked': $setup.handleRightCheckedChange,
            onCheckedChange: $setup.handleRightCheckedChange
          },
          _createSlots(
            {
              _: 2
              /* DYNAMIC */
            },
            [
              _ctx.$slots['right-header']
                ? {
                    name: 'header',
                    fn: _withCtx(() => [_renderSlot(_ctx.$slots, 'right-header')]),
                    key: '0'
                  }
                : void 0,
              _ctx.$slots.default
                ? {
                    name: 'default',
                    fn: _withCtx(({ option }) => [_renderSlot(_ctx.$slots, 'default', { option })]),
                    key: '1'
                  }
                : void 0,
              _ctx.$slots['right-empty']
                ? {
                    name: 'empty',
                    fn: _withCtx(() => [_renderSlot(_ctx.$slots, 'right-empty')]),
                    key: '2'
                  }
                : void 0,
              _ctx.$slots['right-footer']
                ? {
                    name: 'footer',
                    fn: _withCtx(() => [_renderSlot(_ctx.$slots, 'right-footer')]),
                    key: '3'
                  }
                : void 0
            ]
          ),
          1032,
          [
            'data',
            'checked',
            'title',
            'filterable',
            'filter-placeholder',
            'filter-method',
            'disabled',
            'size',
            'props',
            'render-content',
            'virtual',
            'item-height',
            'height',
            'show-all-checkbox',
            'empty-text'
          ]
        )
      ],
      6
      /* CLASS, STYLE */
    )
  )
}
import { computed, ref, watch } from 'vue'
import { useLocale } from '../../../hooks/index.js'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { useComponentTheme } from '../../../theme/component-theme.js'
import { useConfig } from '../../../hooks/use-config/index.js'
import TransferPanel from './transfer-panel.js'
const __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhTransfer'
  },
  {
    __name: 'transfer',
    props: {
      modelValue: { type: Array, required: false, default: () => [] },
      data: { type: Array, required: false, default: () => [] },
      filterable: { type: Boolean, required: false, default: false },
      filterMethod: { type: Function, required: false },
      filterPlaceholder: { type: String, required: false },
      targetOrder: { type: String, required: false, default: 'original' },
      titles: { type: Array, required: false },
      buttonTexts: { type: Array, required: false, default: () => [] },
      renderContent: { type: Function, required: false },
      leftDefaultChecked: { type: Array, required: false, default: () => [] },
      rightDefaultChecked: { type: Array, required: false, default: () => [] },
      props: { type: Object, required: false },
      disabled: { type: Boolean, required: false, default: false },
      size: { type: null, required: false, default: 'default' },
      validateEvent: { type: Boolean, required: false, default: true },
      virtual: { type: Boolean, required: false, default: false },
      itemHeight: { type: Number, required: false, default: 40 },
      height: { type: Number, required: false, default: 280 },
      leftTitle: { type: String, required: false },
      rightTitle: { type: String, required: false },
      showAllCheckbox: { type: Boolean, required: false, default: true },
      emptyText: { type: String, required: false },
      leftEmptyText: { type: String, required: false },
      rightEmptyText: { type: String, required: false },
      themeOverrides: { type: null, required: false }
    },
    emits: ['update:modelValue', 'change', 'left-check-change', 'right-check-change'],
    setup(__props, { expose: __expose, emit: __emit }) {
      const props = __props
      const emit = __emit
      const ns = useNamespace('transfer')
      const { t } = useLocale()
      const { globalSize } = useConfig()
      const { themeStyle } = useComponentTheme(
        'transfer',
        computed(() => props.themeOverrides)
      )
      const leftPanelRef = ref()
      const rightPanelRef = ref()
      const leftChecked = ref([...props.leftDefaultChecked])
      const rightChecked = ref([...props.rightDefaultChecked])
      const keyProp = computed(() => {
        var _a
        return ((_a = props.props) == null ? void 0 : _a.key) || 'key'
      })
      const getKey = (item) => {
        var _a
        return (_a = item[keyProp.value]) != null ? _a : ''
      }
      const targetKeys = computed(() => new Set(props.modelValue))
      const leftData = computed(() => {
        return props.data.filter((item) => !targetKeys.value.has(getKey(item)))
      })
      const rightData = computed(() => {
        var _a
        if (props.targetOrder === 'original') {
          return props.data.filter((item) => targetKeys.value.has(getKey(item)))
        }
        const dataMap = new Map(props.data.map((item) => [getKey(item), item]))
        return ((_a = props.modelValue) != null ? _a : [])
          .map((key) => dataMap.get(key))
          .filter((item) => item !== void 0)
      })
      const leftTitle = computed(() => {
        var _a
        return (
          props.leftTitle ||
          ((_a = props.titles) == null ? void 0 : _a[0]) ||
          t('transfer.titles.0')
        )
      })
      const rightTitle = computed(() => {
        var _a
        return (
          props.rightTitle ||
          ((_a = props.titles) == null ? void 0 : _a[1]) ||
          t('transfer.titles.1')
        )
      })
      const leftEmptyText = computed(
        () => props.leftEmptyText || props.emptyText || t('transfer.noData')
      )
      const rightEmptyText = computed(
        () => props.rightEmptyText || props.emptyText || t('transfer.noData')
      )
      const filterPlaceholder = computed(
        () => props.filterPlaceholder || t('transfer.filterPlaceholder')
      )
      const canMoveToRight = computed(() => leftChecked.value.length > 0)
      const canMoveToLeft = computed(() => rightChecked.value.length > 0)
      const containerClasses = computed(() => [
        ns.b(),
        ns.m(props.size || globalSize.value || 'default'),
        ns.is('disabled', props.disabled)
      ])
      const moveToRight = () => {
        var _a, _b
        if (!canMoveToRight.value || props.disabled) return
        const movedKeys = [...leftChecked.value]
        let newValue
        if (props.targetOrder === 'unshift') {
          newValue = [...movedKeys, ...((_a = props.modelValue) != null ? _a : [])]
        } else {
          newValue = [...((_b = props.modelValue) != null ? _b : []), ...movedKeys]
        }
        if (props.targetOrder === 'original') {
          const keySet = new Set(newValue)
          newValue = props.data
            .filter((item) => keySet.has(getKey(item)))
            .map((item) => getKey(item))
        }
        emit('update:modelValue', newValue)
        emit('change', newValue, 'right', movedKeys)
        leftChecked.value = []
      }
      const moveToLeft = () => {
        var _a
        if (!canMoveToLeft.value || props.disabled) return
        const movedKeys = [...rightChecked.value]
        const movedKeysSet = new Set(movedKeys)
        const newValue = ((_a = props.modelValue) != null ? _a : []).filter(
          (key) => !movedKeysSet.has(key)
        )
        emit('update:modelValue', newValue)
        emit('change', newValue, 'left', movedKeys)
        rightChecked.value = []
      }
      const handleLeftCheckedChange = (value, movedKeys) => {
        leftChecked.value = value
        emit('left-check-change', value, movedKeys)
      }
      const handleRightCheckedChange = (value, movedKeys) => {
        rightChecked.value = value
        emit('right-check-change', value, movedKeys)
      }
      const clearLeftChecked = () => {
        leftChecked.value = []
      }
      const clearRightChecked = () => {
        rightChecked.value = []
      }
      watch(
        () => props.modelValue,
        () => {
          const leftDataKeys = new Set(leftData.value.map((item) => getKey(item)))
          leftChecked.value = leftChecked.value.filter((key) => leftDataKeys.has(key))
          const rightDataKeys = new Set(rightData.value.map((item) => getKey(item)))
          rightChecked.value = rightChecked.value.filter((key) => rightDataKeys.has(key))
        },
        { deep: true }
      )
      __expose({
        clearLeftChecked,
        clearRightChecked,
        leftPanel: leftPanelRef,
        rightPanel: rightPanelRef
      })
      const __returned__ = {
        props,
        emit,
        ns,
        t,
        globalSize,
        themeStyle,
        leftPanelRef,
        rightPanelRef,
        leftChecked,
        rightChecked,
        keyProp,
        getKey,
        targetKeys,
        leftData,
        rightData,
        leftTitle,
        rightTitle,
        leftEmptyText,
        rightEmptyText,
        filterPlaceholder,
        canMoveToRight,
        canMoveToLeft,
        containerClasses,
        moveToRight,
        moveToLeft,
        handleLeftCheckedChange,
        handleRightCheckedChange,
        clearLeftChecked,
        clearRightChecked,
        computed,
        ref,
        watch,
        get useNamespace() {
          return useNamespace
        },
        get useLocale() {
          return useLocale
        },
        get useComponentTheme() {
          return useComponentTheme
        },
        get useConfig() {
          return useConfig
        },
        TransferPanel
      }
      Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true })
      return __returned__
    }
  }
)
__sfc__.render = render
var stdin_default = __sfc__
export { stdin_default as default }
