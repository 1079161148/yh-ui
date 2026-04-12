import {
  normalizeClass as _normalizeClass,
  createVNode as _createVNode,
  createElementVNode as _createElementVNode,
  toDisplayString as _toDisplayString,
  renderSlot as _renderSlot,
  createTextVNode as _createTextVNode,
  vShow as _vShow,
  withDirectives as _withDirectives,
  normalizeStyle as _normalizeStyle,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock
} from 'vue'
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      'div',
      {
        class: _normalizeClass([
          $setup.ns.b(),
          $setup.ns.m(_ctx.status),
          $setup.ns.is('expanded', $setup.isExpanded),
          _ctx.className
        ]),
        style: _normalizeStyle([$setup.themeStyle, _ctx.style])
      },
      [
        _createElementVNode(
          'div',
          {
            class: _normalizeClass($setup.ns.e('header')),
            onClick: $setup.toggleExpand
          },
          [
            _createElementVNode(
              'div',
              {
                class: _normalizeClass($setup.ns.e('icon-wrapper'))
              },
              [
                _createVNode(
                  $setup['YhIcon'],
                  {
                    name: $setup.statusIcon,
                    class: _normalizeClass([
                      $setup.ns.e('status-icon'),
                      { 'is-loading': _ctx.status === 'thinking' || _ctx.status === 'start' }
                    ])
                  },
                  null,
                  8,
                  ['name', 'class']
                )
              ],
              2
              /* CLASS */
            ),
            _createElementVNode(
              'div',
              {
                class: _normalizeClass($setup.ns.e('title'))
              },
              _toDisplayString($setup.displayTitle),
              3
              /* TEXT, CLASS */
            ),
            _createVNode(
              $setup['YhIcon'],
              {
                name: 'arrow-down',
                class: _normalizeClass([
                  $setup.ns.e('arrow'),
                  {
                    'is-expanded': $setup.isExpanded
                  }
                ])
              },
              null,
              8,
              ['class']
            )
          ],
          2
          /* CLASS */
        ),
        _withDirectives(
          _createElementVNode(
            'div',
            {
              class: _normalizeClass($setup.ns.e('body'))
            },
            [
              _createElementVNode(
                'div',
                {
                  class: _normalizeClass($setup.ns.e('content'))
                },
                [
                  _renderSlot(_ctx.$slots, 'default', {}, () => [
                    _createTextVNode(
                      _toDisplayString(_ctx.content),
                      1
                      /* TEXT */
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
          [[_vShow, $setup.isExpanded && (_ctx.$slots.default || _ctx.content)]]
        )
      ],
      6
      /* CLASS, STYLE */
    )
  )
}
import { useLocale } from '../../../hooks/index.js'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { computed, watch } from 'vue'
import { YhIcon } from '../../icon.js'
import { aiThinkingProps, aiThinkingEmits } from './ai-thinking-meta.js'
import { useComponentTheme } from '../../../theme/component-theme.js'
const __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhAiThinking'
  },
  {
    __name: 'ai-thinking',
    props: aiThinkingProps,
    emits: aiThinkingEmits,
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose()
      const props = __props
      const emit = __emit
      const ns = useNamespace('ai-thinking')
      const { t } = useLocale()
      const { themeStyle } = useComponentTheme('ai-thinking', props.themeOverrides)
      const isExpanded = computed({
        get: () => props.modelValue,
        set: (val) => emit('update:modelValue', val)
      })
      const displayTitle = computed(() => {
        if (props.title) return props.title
        switch (props.status) {
          case 'start':
            return t('ai.thinking.start')
          case 'thinking':
            return t('ai.thinking.thinking')
          case 'end':
            return t('ai.thinking.complete')
          case 'error':
            return t('ai.thinking.error')
          default:
            return t('ai.thinking.thinking')
        }
      })
      const statusIcon = computed(() => {
        switch (props.status) {
          case 'start':
            return 'loading'
          case 'thinking':
            return 'loading'
          case 'end':
            return 'check-circle'
          case 'error':
            return 'circle-close'
          default:
            return 'loading'
        }
      })
      watch(
        () => props.status,
        (newStatus) => {
          if (props.autoCollapse && newStatus === 'end') {
            isExpanded.value = false
          }
        }
      )
      const toggleExpand = () => {
        isExpanded.value = !isExpanded.value
      }
      const __returned__ = {
        props,
        emit,
        ns,
        t,
        themeStyle,
        isExpanded,
        displayTitle,
        statusIcon,
        toggleExpand,
        get useNamespace() {
          return useNamespace
        },
        get useLocale() {
          return useLocale
        },
        computed,
        watch,
        get YhIcon() {
          return YhIcon
        },
        get aiThinkingProps() {
          return aiThinkingProps
        },
        get aiThinkingEmits() {
          return aiThinkingEmits
        },
        get useComponentTheme() {
          return useComponentTheme
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
