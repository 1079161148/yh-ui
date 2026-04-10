import {
  createCommentVNode as _createCommentVNode,
  renderSlot as _renderSlot,
  createVNode as _createVNode,
  normalizeClass as _normalizeClass,
  normalizeStyle as _normalizeStyle,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  toDisplayString as _toDisplayString,
  createTextVNode as _createTextVNode,
  createElementVNode as _createElementVNode,
  withCtx as _withCtx,
  withModifiers as _withModifiers,
  createBlock as _createBlock,
  Fragment as _Fragment
} from 'vue'
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createBlock(
      $setup['YhTooltip'],
      {
        visible: $setup.visible,
        'onUpdate:visible': _cache[2] || (_cache[2] = ($event) => ($setup.visible = $event)),
        class: _normalizeClass($setup.ns.b()),
        trigger: 'click',
        placement: _ctx.placement,
        disabled: _ctx.disabled,
        teleported: _ctx.teleported,
        offset: _ctx.offset,
        'z-index': _ctx.zIndex,
        'show-arrow': _ctx.showArrow,
        'show-after': 0,
        'hide-after': 0,
        'popper-class': `${$setup.ns.e('popper')} ${_ctx.popperClass}`,
        'popper-style': _ctx.popperStyle,
        persistent: '',
        interactive: ''
      },
      {
        content: _withCtx(() => [
          _createElementVNode(
            'div',
            {
              class: _normalizeClass($setup.ns.e('content')),
              style: _normalizeStyle([
                {
                  width: typeof _ctx.width === 'number' ? `${_ctx.width}px` : _ctx.width
                },
                $setup.themeStyle
              ])
            },
            [
              _createElementVNode(
                'div',
                {
                  class: _normalizeClass($setup.ns.e('main'))
                },
                [
                  !_ctx.hideIcon
                    ? (_openBlock(),
                      _createElementBlock(
                        'div',
                        {
                          key: 0,
                          class: _normalizeClass($setup.ns.e('icon')),
                          style: _normalizeStyle({
                            color: _ctx.iconColor
                          })
                        },
                        [
                          _renderSlot(_ctx.$slots, 'icon', {}, () => [
                            _createCommentVNode(
                              ' \u652F\u6301\u65E7\u7248\u56FE\u6807\u540D\u79F0 '
                            ),
                            _createVNode($setup['YhIcon'], { name: _ctx.icon }, null, 8, ['name'])
                          ])
                        ],
                        6
                        /* CLASS, STYLE */
                      ))
                    : _createCommentVNode('v-if', true),
                  _createElementVNode(
                    'div',
                    {
                      class: _normalizeClass($setup.ns.e('inner'))
                    },
                    [
                      _createElementVNode(
                        'div',
                        {
                          class: _normalizeClass($setup.ns.e('title'))
                        },
                        [
                          _renderSlot(_ctx.$slots, 'title', {}, () => [
                            _createTextVNode(
                              _toDisplayString(_ctx.title),
                              1
                              /* TEXT */
                            )
                          ])
                        ],
                        2
                        /* CLASS */
                      ),
                      _ctx.description || _ctx.$slots.description
                        ? (_openBlock(),
                          _createElementBlock(
                            'div',
                            {
                              key: 0,
                              class: _normalizeClass($setup.ns.e('description'))
                            },
                            [
                              _renderSlot(_ctx.$slots, 'description', {}, () => [
                                _createTextVNode(
                                  _toDisplayString(_ctx.description),
                                  1
                                  /* TEXT */
                                )
                              ])
                            ],
                            2
                            /* CLASS */
                          ))
                        : _createCommentVNode('v-if', true)
                    ],
                    2
                    /* CLASS */
                  )
                ],
                2
                /* CLASS */
              ),
              _createCommentVNode(
                ' YH-UI \u81EA\u521B\u9AD8\u7EA7\u529F\u80FD\uFF1A\u4E0D\u518D\u63D0\u793A '
              ),
              _ctx.showDontAskAgain
                ? (_openBlock(),
                  _createElementBlock(
                    'div',
                    {
                      key: 0,
                      class: _normalizeClass($setup.ns.e('extra'))
                    },
                    [
                      _createVNode(
                        $setup['YhCheckbox'],
                        {
                          modelValue: $setup.dontAskAgainChecked,
                          'onUpdate:modelValue':
                            _cache[0] ||
                            (_cache[0] = ($event) => ($setup.dontAskAgainChecked = $event))
                        },
                        {
                          default: _withCtx(() => [
                            _createTextVNode(
                              _toDisplayString(
                                _ctx.dontAskAgainText || $setup.t('popconfirm.dontAskAgain')
                              ),
                              1
                              /* TEXT */
                            )
                          ]),
                          _: 1
                          /* STABLE */
                        },
                        8,
                        ['modelValue']
                      )
                    ],
                    2
                    /* CLASS */
                  ))
                : _createCommentVNode('v-if', true),
              _createElementVNode(
                'div',
                {
                  class: _normalizeClass($setup.ns.e('footer')),
                  onClick: _cache[1] || (_cache[1] = _withModifiers(() => {}, ['stop']))
                },
                [
                  _createCommentVNode(
                    ' \u81EA\u521B\u9AD8\u7EA7\u529F\u80FD\uFF1A\u4EA4\u6362\u6309\u94AE\u4F4D\u7F6E '
                  ),
                  _ctx.swapButtons
                    ? (_openBlock(),
                      _createElementBlock(
                        _Fragment,
                        { key: 0 },
                        [
                          _createVNode(
                            $setup['YhButton'],
                            {
                              size: 'small',
                              type: _ctx.confirmButtonType,
                              loading: $setup.confirmLoading,
                              onClick: _withModifiers($setup.handleConfirm, ['stop'])
                            },
                            {
                              default: _withCtx(() => [
                                _createTextVNode(
                                  _toDisplayString(
                                    _ctx.confirmButtonText || $setup.t('popconfirm.confirm')
                                  ),
                                  1
                                  /* TEXT */
                                )
                              ]),
                              _: 1
                              /* STABLE */
                            },
                            8,
                            ['type', 'loading']
                          ),
                          !_ctx.hideCancel
                            ? (_openBlock(),
                              _createBlock(
                                $setup['YhButton'],
                                {
                                  key: 0,
                                  size: 'small',
                                  type: _ctx.cancelButtonType,
                                  disabled: $setup.confirmLoading,
                                  onClick: _withModifiers($setup.handleCancel, ['stop'])
                                },
                                {
                                  default: _withCtx(() => [
                                    _createTextVNode(
                                      _toDisplayString(
                                        _ctx.cancelButtonText || $setup.t('popconfirm.cancel')
                                      ),
                                      1
                                      /* TEXT */
                                    )
                                  ]),
                                  _: 1
                                  /* STABLE */
                                },
                                8,
                                ['type', 'disabled']
                              ))
                            : _createCommentVNode('v-if', true)
                        ],
                        64
                        /* STABLE_FRAGMENT */
                      ))
                    : (_openBlock(),
                      _createElementBlock(
                        _Fragment,
                        { key: 1 },
                        [
                          !_ctx.hideCancel
                            ? (_openBlock(),
                              _createBlock(
                                $setup['YhButton'],
                                {
                                  key: 0,
                                  size: 'small',
                                  type: _ctx.cancelButtonType,
                                  disabled: $setup.confirmLoading,
                                  onClick: _withModifiers($setup.handleCancel, ['stop'])
                                },
                                {
                                  default: _withCtx(() => [
                                    _createTextVNode(
                                      _toDisplayString(
                                        _ctx.cancelButtonText || $setup.t('popconfirm.cancel')
                                      ),
                                      1
                                      /* TEXT */
                                    )
                                  ]),
                                  _: 1
                                  /* STABLE */
                                },
                                8,
                                ['type', 'disabled']
                              ))
                            : _createCommentVNode('v-if', true),
                          _createVNode(
                            $setup['YhButton'],
                            {
                              size: 'small',
                              type: _ctx.confirmButtonType,
                              loading: $setup.confirmLoading,
                              onClick: _withModifiers($setup.handleConfirm, ['stop'])
                            },
                            {
                              default: _withCtx(() => [
                                _createTextVNode(
                                  _toDisplayString(
                                    _ctx.confirmButtonText || $setup.t('popconfirm.confirm')
                                  ),
                                  1
                                  /* TEXT */
                                )
                              ]),
                              _: 1
                              /* STABLE */
                            },
                            8,
                            ['type', 'loading']
                          )
                        ],
                        64
                        /* STABLE_FRAGMENT */
                      ))
                ],
                2
                /* CLASS */
              )
            ],
            6
            /* CLASS, STYLE */
          )
        ]),
        default: _withCtx(() => [_renderSlot(_ctx.$slots, 'default')]),
        _: 3
        /* FORWARDED */
      },
      8,
      [
        'visible',
        'class',
        'placement',
        'disabled',
        'teleported',
        'offset',
        'z-index',
        'show-arrow',
        'popper-class',
        'popper-style'
      ]
    )
  )
}
import { ref, computed } from 'vue'
import { useLocale } from '../../../hooks/index.js'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { YhButton } from '../../button'
import { YhCheckbox } from '../../checkbox'
import { YhIcon } from '../../icon'
import { YhTooltip } from '../../tooltip'
import { useComponentTheme } from '../../../theme/component-theme.js'
import { popconfirmProps, popconfirmEmits } from './popconfirm'
const __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhPopconfirm'
  },
  {
    __name: 'popconfirm',
    props: popconfirmProps,
    emits: popconfirmEmits,
    setup(__props, { expose: __expose, emit: __emit }) {
      const props = __props
      const emit = __emit
      const ns = useNamespace('popconfirm')
      const { themeStyle } = useComponentTheme(
        'popconfirm',
        computed(() => props.themeOverrides)
      )
      const { t } = useLocale()
      const internalVisible = ref(false)
      const visible = computed({
        get: () => (props.visible !== null ? props.visible : internalVisible.value),
        set: (val) => {
          internalVisible.value = val
          emit('update:visible', val)
        }
      })
      const confirmLoading = ref(false)
      const dontAskAgainChecked = ref(false)
      const handleConfirm = async () => {
        if (confirmLoading.value) return
        if (props.beforeConfirm) {
          confirmLoading.value = true
          try {
            const result = await props.beforeConfirm()
            if (result !== false) {
              visible.value = false
              emit('confirm', dontAskAgainChecked.value)
            }
          } catch (e) {
          } finally {
            confirmLoading.value = false
          }
        } else {
          visible.value = false
          emit('confirm', dontAskAgainChecked.value)
        }
      }
      const handleCancel = () => {
        if (confirmLoading.value) return
        visible.value = false
        emit('cancel')
      }
      __expose({
        visible,
        toggle: (val) => (visible.value = val)
      })
      const __returned__ = {
        props,
        emit,
        ns,
        themeStyle,
        t,
        internalVisible,
        visible,
        confirmLoading,
        dontAskAgainChecked,
        handleConfirm,
        handleCancel,
        ref,
        computed,
        get useNamespace() {
          return useNamespace
        },
        get useLocale() {
          return useLocale
        },
        get YhButton() {
          return YhButton
        },
        get YhCheckbox() {
          return YhCheckbox
        },
        get YhIcon() {
          return YhIcon
        },
        get YhTooltip() {
          return YhTooltip
        },
        get useComponentTheme() {
          return useComponentTheme
        },
        get popconfirmProps() {
          return popconfirmProps
        },
        get popconfirmEmits() {
          return popconfirmEmits
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
