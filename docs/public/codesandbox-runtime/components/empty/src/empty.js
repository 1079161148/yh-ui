import {
  createCommentVNode as _createCommentVNode,
  renderSlot as _renderSlot,
  normalizeStyle as _normalizeStyle,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  resolveDynamicComponent as _resolveDynamicComponent,
  createBlock as _createBlock,
  createElementVNode as _createElementVNode,
  normalizeClass as _normalizeClass,
  Fragment as _Fragment,
  toDisplayString as _toDisplayString,
  createStaticVNode as _createStaticVNode
} from 'vue'
const _hoisted_1 = ['src', 'alt']
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      'div',
      {
        class: _normalizeClass($setup.ns.b()),
        style: _normalizeStyle($setup.themeStyle),
        role: 'status',
        'aria-label': 'empty'
      },
      [
        _createCommentVNode(' \u56FE\u50CF\u533A\u57DF '),
        _createElementVNode(
          'div',
          {
            class: _normalizeClass($setup.ns.e('image')),
            style: _normalizeStyle($setup.imageStyle)
          },
          [
            _renderSlot(_ctx.$slots, 'image', {}, () => [
              $props.image
                ? (_openBlock(),
                  _createElementBlock(
                    'img',
                    {
                      key: 0,
                      src: $props.image,
                      alt: $setup.description,
                      style: _normalizeStyle($setup.imageStyle)
                    },
                    null,
                    12,
                    _hoisted_1
                  ))
                : $props.icon
                  ? (_openBlock(),
                    _createBlock(
                      _resolveDynamicComponent($props.icon),
                      {
                        key: 1,
                        style: _normalizeStyle($setup.imageStyle)
                      },
                      null,
                      8,
                      ['style']
                    ))
                  : (_openBlock(),
                    _createElementBlock(
                      _Fragment,
                      { key: 2 },
                      [
                        _createCommentVNode(' \u5185\u7F6E\u9ED8\u8BA4 SVG \u63D2\u56FE '),
                        (_openBlock(),
                        _createElementBlock(
                          'svg',
                          {
                            class: _normalizeClass($setup.ns.e('svg')),
                            viewBox: '0 0 184 152',
                            xmlns: 'http://www.w3.org/2000/svg'
                          },
                          [
                            ...(_cache[0] ||
                              (_cache[0] = [
                                _createStaticVNode(
                                  '<g fill="none" fill-rule="evenodd"><g transform="translate(24 31.67)"><ellipse cx="67.797" cy="106.89" rx="67.797" ry="12.668" fill="var(--yh-empty-ellipse-color, #f5f5f7)"></ellipse><path d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z" fill="var(--yh-empty-image-fill, #aeb8c2)"></path><path d="M101.537 86.214L80.63 61.102c-1.001-1.207-2.507-1.867-4.048-1.867H31.724c-1.54 0-3.047.66-4.048 1.867L6.769 86.214v13.451h94.768V86.214z" fill="var(--yh-empty-image-fill2, #f5f5f7)" transform="translate(13.56)"></path><path d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z" fill="var(--yh-empty-plane-bg, #f5f5f7)"></path><path d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z" fill="var(--yh-empty-image-fill, #aeb8c2)"></path></g><path d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.013 146.92 0 156.99 0c10.07 0 18.188 8.013 18.188 17.097 0 9.083-8.118 17.097-18.188 17.097-3.028 0-5.875-.7-8.369-1.902z" fill="var(--yh-empty-comment-fill, #dce0e6)"></path><path d="M161.its 17.404c0-.588-.434-1.025-1.01-1.025h-5.883c-.578 0-1.01.437-1.01 1.025v1.05c0 .587.432 1.025 1.01 1.025h5.883c.576 0 1.01-.438 1.01-1.025v-1.05zM157.85 11.124c0-.588-.435-1.025-1.01-1.025h-1.008c-.576 0-1.01.437-1.01 1.025v1.049c0 .588.434 1.025 1.01 1.025h1.009c.576 0 1.009-.437 1.009-1.025v-1.05z" fill="#fff"></path></g>',
                                  1
                                )
                              ]))
                          ],
                          2
                          /* CLASS */
                        ))
                      ],
                      2112
                      /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                    ))
            ])
          ],
          6
          /* CLASS, STYLE */
        ),
        _createCommentVNode(' \u63CF\u8FF0\u533A\u57DF '),
        _createElementVNode(
          'div',
          {
            class: _normalizeClass($setup.ns.e('description'))
          },
          [
            _renderSlot(_ctx.$slots, 'description', {}, () => [
              _createElementVNode(
                'p',
                null,
                _toDisplayString($setup.description),
                1
                /* TEXT */
              )
            ])
          ],
          2
          /* CLASS */
        ),
        _createCommentVNode(' \u989D\u5916\u5185\u5BB9\uFF08\u64CD\u4F5C\u533A\uFF09 '),
        _ctx.$slots.default
          ? (_openBlock(),
            _createElementBlock(
              'div',
              {
                key: 0,
                class: _normalizeClass($setup.ns.e('bottom'))
              },
              [_renderSlot(_ctx.$slots, 'default')],
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
import { useLocale } from '../../../hooks/index.js'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { useComponentTheme } from '../../../theme/component-theme.js'
const __sfc__ = /* @__PURE__ */ Object.assign(
  { name: 'YhEmpty' },
  {
    __name: 'empty',
    props: {
      image: { type: String, required: false },
      imageSize: { type: Number, required: false, default: 100 },
      description: { type: String, required: false },
      icon: { type: null, required: false },
      themeOverrides: { type: null, required: false }
    },
    setup(__props, { expose: __expose }) {
      __expose()
      const { t } = useLocale()
      const props = __props
      const description = computed(() => props.description || t('empty.description'))
      const ns = useNamespace('empty')
      const { themeStyle } = useComponentTheme(
        'empty',
        computed(() => props.themeOverrides)
      )
      const imageStyle = computed(() => ({
        width: `${props.imageSize}px`,
        height: `${props.imageSize}px`
      }))
      const __returned__ = {
        t,
        props,
        description,
        ns,
        themeStyle,
        imageStyle,
        computed,
        get useNamespace() {
          return useNamespace
        },
        get useLocale() {
          return useLocale
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
