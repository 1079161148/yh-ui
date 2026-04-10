import {
  createCommentVNode as _createCommentVNode,
  renderSlot as _renderSlot,
  toDisplayString as _toDisplayString,
  createTextVNode as _createTextVNode,
  normalizeClass as _normalizeClass,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  createElementVNode as _createElementVNode,
  normalizeStyle as _normalizeStyle
} from 'vue'
const _hoisted_1 = ['aria-checked']
const _hoisted_2 = ['checked', 'indeterminate']
const _hoisted_3 = ['disabled', 'aria-disabled', 'aria-busy']
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      'div',
      {
        class: _normalizeClass([
          $setup.ns.b(),
          $setup.ns.is('safe-area', _ctx.safeAreaInsetBottom)
        ]),
        style: _normalizeStyle($setup.themeStyle),
        role: 'toolbar'
      },
      [
        _createCommentVNode(' \u9876\u90E8\u63D0\u793A '),
        _ctx.tip || _ctx.$slots.tip
          ? (_openBlock(),
            _createElementBlock(
              'div',
              {
                key: 0,
                class: _normalizeClass($setup.ns.e('tip'))
              },
              [
                _renderSlot(_ctx.$slots, 'tip', {}, () => [
                  _createTextVNode(
                    _toDisplayString(_ctx.tip),
                    1
                    /* TEXT */
                  )
                ])
              ],
              2
              /* CLASS */
            ))
          : _createCommentVNode('v-if', true),
        _createElementVNode(
          'div',
          {
            class: _normalizeClass($setup.ns.e('inner'))
          },
          [
            _createCommentVNode(' \u5168\u9009\u533A '),
            _ctx.showCheckbox
              ? (_openBlock(),
                _createElementBlock(
                  'label',
                  {
                    key: 0,
                    class: _normalizeClass($setup.ns.e('check')),
                    role: 'checkbox',
                    'aria-checked': _ctx.indeterminate ? 'mixed' : _ctx.checked
                  },
                  [
                    _createElementVNode(
                      'input',
                      {
                        type: 'checkbox',
                        class: _normalizeClass($setup.ns.e('check-input')),
                        checked: _ctx.checked,
                        indeterminate: _ctx.indeterminate,
                        onChange: $setup.handleCheck
                      },
                      null,
                      42,
                      _hoisted_2
                    ),
                    _createElementVNode(
                      'span',
                      {
                        class: _normalizeClass($setup.ns.e('check-label'))
                      },
                      _toDisplayString($setup.t('submitbar.allSelect')),
                      3
                      /* TEXT, CLASS */
                    )
                  ],
                  10,
                  _hoisted_1
                ))
              : _createCommentVNode('v-if', true),
            _createCommentVNode(' \u5DE6\u4FA7\u81EA\u5B9A\u4E49 '),
            _renderSlot(_ctx.$slots, 'left'),
            _createCommentVNode(' \u4EF7\u683C\u533A '),
            _createElementVNode(
              'div',
              {
                class: _normalizeClass($setup.ns.e('price-area'))
              },
              [
                $setup.selectedText
                  ? (_openBlock(),
                    _createElementBlock(
                      'div',
                      {
                        key: 0,
                        class: _normalizeClass($setup.ns.e('selected-count'))
                      },
                      _toDisplayString($setup.selectedText),
                      3
                      /* TEXT, CLASS */
                    ))
                  : _createCommentVNode('v-if', true),
                _createElementVNode(
                  'div',
                  {
                    class: _normalizeClass($setup.ns.e('price-row'))
                  },
                  [
                    _createElementVNode(
                      'span',
                      {
                        class: _normalizeClass($setup.ns.e('label'))
                      },
                      _toDisplayString($setup.priceLabel),
                      3
                      /* TEXT, CLASS */
                    ),
                    _renderSlot(_ctx.$slots, 'price', {}, () => [
                      _createElementVNode(
                        'span',
                        {
                          class: _normalizeClass($setup.ns.e('price'))
                        },
                        [
                          _createElementVNode(
                            'span',
                            {
                              class: _normalizeClass($setup.ns.e('currency'))
                            },
                            _toDisplayString(_ctx.currency),
                            3
                            /* TEXT, CLASS */
                          ),
                          _createElementVNode(
                            'span',
                            {
                              class: _normalizeClass($setup.ns.e('price-int'))
                            },
                            _toDisplayString($setup.displayPrice.split('.')[0]),
                            3
                            /* TEXT, CLASS */
                          ),
                          _ctx.decimalLength > 0
                            ? (_openBlock(),
                              _createElementBlock(
                                'span',
                                {
                                  key: 0,
                                  class: _normalizeClass($setup.ns.e('price-dec'))
                                },
                                '.' + _toDisplayString($setup.displayPrice.split('.')[1]),
                                3
                                /* TEXT, CLASS */
                              ))
                            : _createCommentVNode('v-if', true)
                        ],
                        2
                        /* CLASS */
                      )
                    ])
                  ],
                  2
                  /* CLASS */
                )
              ],
              2
              /* CLASS */
            ),
            _createCommentVNode(' \u53F3\u4FA7\u81EA\u5B9A\u4E49 '),
            _renderSlot(_ctx.$slots, 'right'),
            _createCommentVNode(' \u63D0\u4EA4\u6309\u94AE '),
            _createElementVNode(
              'button',
              {
                class: _normalizeClass([
                  $setup.ns.e('btn'),
                  $setup.ns.em('btn', _ctx.buttonType),
                  $setup.ns.is('disabled', _ctx.disabled || _ctx.loading)
                ]),
                disabled: _ctx.disabled || _ctx.loading,
                'aria-disabled': _ctx.disabled || _ctx.loading,
                'aria-busy': _ctx.loading,
                onClick: $setup.handleSubmit
              },
              [
                _renderSlot(_ctx.$slots, 'button', {}, () => [
                  _ctx.loading
                    ? (_openBlock(),
                      _createElementBlock(
                        'span',
                        {
                          key: 0,
                          class: _normalizeClass($setup.ns.e('btn-loading')),
                          'aria-hidden': 'true'
                        },
                        null,
                        2
                        /* CLASS */
                      ))
                    : _createCommentVNode('v-if', true),
                  _createElementVNode(
                    'span',
                    null,
                    _toDisplayString($setup.btnText),
                    1
                    /* TEXT */
                  )
                ])
              ],
              10,
              _hoisted_3
            )
          ],
          2
          /* CLASS */
        ),
        _createCommentVNode(' \u5B89\u5168\u533A\u5E95\u90E8\u5360\u4F4D '),
        _ctx.safeAreaInsetBottom
          ? (_openBlock(),
            _createElementBlock(
              'div',
              {
                key: 1,
                class: _normalizeClass($setup.ns.e('safe'))
              },
              null,
              2
              /* CLASS */
            ))
          : _createCommentVNode('v-if', true)
      ],
      6
      /* CLASS, STYLE */
    )
  )
}
import { computed } from 'vue'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { useComponentTheme } from '../../../theme/component-theme.js'
import { useLocale } from '../../../hooks/index.js'
import { submitBarProps, submitBarEmits } from './submit-bar'
const __sfc__ = /* @__PURE__ */ Object.assign(
  { name: 'YhSubmitBar' },
  {
    __name: 'submit-bar',
    props: submitBarProps,
    emits: submitBarEmits,
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose()
      const props = __props
      const emit = __emit
      const ns = useNamespace('submit-bar')
      const { themeStyle } = useComponentTheme(
        'submit-bar',
        computed(() => props.themeOverrides)
      )
      const { t } = useLocale()
      const displayPrice = computed(() => {
        const raw = props.centUnit ? props.price / 100 : props.price
        return raw.toFixed(props.decimalLength)
      })
      const priceLabel = computed(() => props.label || t('submitbar.total'))
      const selectedText = computed(() => {
        if (!props.selectedCount) return ''
        return t('submitbar.selected').replace('{count}', String(props.selectedCount))
      })
      const btnText = computed(() => props.buttonText || t('submitbar.submit'))
      function handleSubmit(e) {
        if (props.disabled || props.loading) return
        emit('submit', e)
      }
      function handleCheck(e) {
        const val = e.target.checked
        emit('update:checked', val)
        emit('check-change', val)
      }
      const __returned__ = {
        props,
        emit,
        ns,
        themeStyle,
        t,
        displayPrice,
        priceLabel,
        selectedText,
        btnText,
        handleSubmit,
        handleCheck,
        computed,
        get useNamespace() {
          return useNamespace
        },
        get useComponentTheme() {
          return useComponentTheme
        },
        get useLocale() {
          return useLocale
        },
        get submitBarProps() {
          return submitBarProps
        },
        get submitBarEmits() {
          return submitBarEmits
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
