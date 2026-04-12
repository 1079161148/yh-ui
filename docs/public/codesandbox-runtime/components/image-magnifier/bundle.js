// docs/public/codesandbox-runtime/components/image-magnifier/src/image-magnifier.js
import {
  createCommentVNode as _createCommentVNode,
  renderSlot as _renderSlot,
  normalizeClass as _normalizeClass,
  createElementVNode as _createElementVNode,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  normalizeStyle as _normalizeStyle,
  toDisplayString as _toDisplayString,
  createTextVNode as _createTextVNode,
  renderList as _renderList,
  Fragment as _Fragment,
  withModifiers as _withModifiers,
  Teleport as _Teleport,
  createBlock as _createBlock
} from 'vue'
import { ref as ref2, computed as computed2, reactive, watch, onUnmounted, nextTick } from 'vue'

// docs/public/codesandbox-runtime/hooks/use-namespace/index.js
import { inject, ref, unref } from 'vue'
var defaultNamespace = 'yh'
var statePrefix = 'is-'
var namespaceContextKey = Symbol('namespaceContextKey')
var useGlobalNamespace = () => {
  return inject(namespaceContextKey, ref(defaultNamespace))
}
var useNamespace = (block) => {
  const namespace = useGlobalNamespace()
  const b = (blockSuffix = '') => {
    const ns = unref(namespace)
    return blockSuffix ? `${ns}-${block}-${blockSuffix}` : `${ns}-${block}`
  }
  const e = (element) => {
    return element ? `${b()}__${element}` : ''
  }
  const m = (modifier) => {
    return modifier ? `${b()}--${modifier}` : ''
  }
  const bem = (blockSuffix, element, modifier) => {
    let cls = b(blockSuffix)
    if (element) cls += `__${element}`
    if (modifier) cls += `--${modifier}`
    return cls
  }
  const em = (element, modifier) => {
    return element && modifier ? `${b()}__${element}--${modifier}` : ''
  }
  function is(state, value) {
    if (arguments.length === 1) {
      return `${statePrefix}${state}`
    }
    return value ? `${statePrefix}${state}` : ''
  }
  const cssVar = (name) => {
    return `--${unref(namespace)}-${block}-${name}`
  }
  const cssVarObj = (vars) => {
    const obj = {}
    Object.entries(vars).forEach(([key, value]) => {
      obj[cssVar(key)] = value
    })
    return obj
  }
  const cssVarBlock = (name) => {
    return `--${unref(namespace)}-${name}`
  }
  const cssVarBlockObj = (vars) => {
    const obj = {}
    Object.entries(vars).forEach(([key, value]) => {
      obj[cssVarBlock(key)] = value
    })
    return obj
  }
  return {
    namespace,
    b,
    e,
    m,
    bem,
    em,
    is,
    cssVar,
    cssVarObj,
    cssVarBlock,
    cssVarBlockObj
  }
}

// docs/public/codesandbox-runtime/theme/component-theme.js
import { inject as inject2, provide, computed, unref as unref2 } from 'vue'
var __defProp = Object.defineProperty
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
var COMPONENT_THEME_KEY = Symbol('component-theme')
function useComponentTheme(componentName, localOverrides) {
  const globalThemes = inject2(COMPONENT_THEME_KEY, {})
  const mergedVars = computed(() => {
    const globalVars = globalThemes[componentName] || {}
    const local = unref2(localOverrides) || {}
    return __spreadValues(__spreadValues({}, globalVars), local)
  })
  const themeStyle = computed(() => {
    const vars = mergedVars.value
    const style = {}
    Object.entries(vars).forEach(([key, value]) => {
      if (value !== void 0) {
        const cssVarName = `--yh-${componentName}-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`
        style[cssVarName] = value
      }
    })
    return style
  })
  const hasCustomTheme = computed(() => {
    return Object.keys(mergedVars.value).length > 0
  })
  return {
    themeVars: mergedVars,
    themeStyle,
    hasCustomTheme
  }
}

// docs/public/codesandbox-runtime/components/image-magnifier/src/image-magnifier-meta.js
var imageMagnifierProps = {
  /** 图片地址 */
  src: {
    type: String,
    default: ''
  },
  /** 高清大图地址（可选，不填用 src） */
  zoomSrc: {
    type: String,
    default: ''
  },
  /** 图片库模式：传入数组时开启多图切换 */
  images: {
    type: Array,
    default: () => []
  },
  /** 当前激活图片索引（v-model） */
  modelValue: {
    type: Number,
    default: 0
  },
  /** 放大倍数 (初始) */
  scale: {
    type: Number,
    default: 2
  },
  /** 允许滚轮动态调整倍率 */
  wheelZoom: {
    type: Boolean,
    default: false
  },
  /** 滚轮缩放最小倍率 */
  minScale: {
    type: Number,
    default: 1.2
  },
  /** 滚轮缩放最大倍率 */
  maxScale: {
    type: Number,
    default: 5
  },
  /** 滚轮缩放步长 */
  scaleStep: {
    type: Number,
    default: 0.3
  },
  /** 整体显示宽度 */
  width: {
    type: [Number, String],
    default: '100%'
  },
  /** 整体显示高度 */
  height: {
    type: [Number, String],
    default: 'auto'
  },
  /** 放大区域显示模式（自动检测视口空间时传 'auto'） */
  position: {
    type: String,
    default: 'right'
  },
  /** 放大区域与主图的间距 (px) */
  offset: {
    type: Number,
    default: 10
  },
  /** 遮罩形状 */
  maskShape: {
    type: String,
    default: 'square'
  },
  /** 遮罩宽度 (px) */
  maskWidth: {
    type: Number,
    default: 150
  },
  /** 遮罩高度 (px) */
  maskHeight: {
    type: Number,
    default: 150
  },
  /** 遮罩颜色 */
  maskColor: {
    type: String,
    default: 'rgba(0, 0, 0, 0.3)'
  },
  /** 是否显示地图缩略导航 (Map Thumbnail) */
  showMinimap: {
    type: Boolean,
    default: false
  },
  /** 是否显示边框 */
  border: {
    type: Boolean,
    default: false
  },
  /** 是否显示阴影 */
  shadow: {
    type: Boolean,
    default: false
  },
  /** 底部提示说明 */
  title: {
    type: String,
    default: ''
  },
  /** 点击是否开启全屏预览 */
  clickToFullscreen: {
    type: Boolean,
    default: false
  },
  /** 图片 alt 属性 */
  alt: {
    type: String,
    default: ''
  },
  /** 加载状态颜色 */
  loadingColor: {
    type: String,
    default: ''
  },
  /** 主题覆盖 */
  themeOverrides: {
    type: Object,
    default: () => ({})
  }
}
var imageMagnifierEmits = {
  enter: () => true,
  leave: () => true,
  'zoom-start': () => true,
  'zoom-end': () => true,
  'scale-change': (scale) => typeof scale === 'number',
  'image-change': (index) => typeof index === 'number',
  'update:modelValue': (index) => typeof index === 'number'
}

// docs/public/codesandbox-runtime/components/image-magnifier/src/image-magnifier.js
var __defProp2 = Object.defineProperty
var __defProps = Object.defineProperties
var __getOwnPropDescs = Object.getOwnPropertyDescriptors
var __getOwnPropSymbols2 = Object.getOwnPropertySymbols
var __hasOwnProp2 = Object.prototype.hasOwnProperty
var __propIsEnum2 = Object.prototype.propertyIsEnumerable
var __defNormalProp2 = (obj, key, value) =>
  key in obj
    ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value })
    : (obj[key] = value)
var __spreadValues2 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp2.call(b, prop)) __defNormalProp2(a, prop, b[prop])
  if (__getOwnPropSymbols2)
    for (var prop of __getOwnPropSymbols2(b)) {
      if (__propIsEnum2.call(b, prop)) __defNormalProp2(a, prop, b[prop])
    }
  return a
}
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b))
var _hoisted_1 = ['src', 'alt']
var _hoisted_2 = ['src', 'alt']
var _hoisted_3 = ['src']
var _hoisted_4 = ['src', 'alt']
var _hoisted_5 = ['src', 'alt']
var _hoisted_6 = ['onClick', 'aria-label']
var _hoisted_7 = ['src', 'alt']
var _hoisted_8 = ['src', 'alt']
var _hoisted_9 = ['onClick']
var _hoisted_10 = ['src', 'alt']
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      'div',
      {
        class: _normalizeClass($setup.ns.b()),
        style: _normalizeStyle($setup.rootStyle),
        ref: 'containerRef',
        onMouseenter: $setup.handleMouseEnter,
        onMouseleave: $setup.handleMouseLeave,
        onMousemove: $setup.handleMouseMove
      },
      [
        _createCommentVNode(
          ' \u4E3B\u56FE\u533A\u57DF\uFF1A\u70B9\u51FB\u5168\u5C4F\u7ED1\u5B9A\u5728 wrapper \u4E0A\uFF0C\u907F\u514D img pointer-events:none \u5403\u6389\u4E8B\u4EF6 '
        ),
        _createElementVNode(
          'div',
          {
            class: _normalizeClass([
              $setup.ns.e('image-wrapper'),
              $setup.ns.is('bordered', $setup.props.border),
              $setup.ns.is('shadow', $setup.props.shadow)
            ]),
            style: _normalizeStyle($setup.props.clickToFullscreen ? 'cursor:zoom-in' : ''),
            onClick: $setup.openFullscreen
          },
          [
            _renderSlot(_ctx.$slots, 'default', {}, () => [
              _createElementVNode(
                'img',
                {
                  src: $setup.currentSrc,
                  alt: $setup.currentAlt,
                  class: _normalizeClass($setup.ns.e('image'))
                },
                null,
                10,
                _hoisted_1
              )
            ]),
            _createCommentVNode(' \u6E10\u8FDB\u52A0\u8F7D\u63D0\u793A '),
            $setup.visible && $setup.isHdLoading
              ? (_openBlock(),
                _createElementBlock(
                  'div',
                  {
                    key: 0,
                    class: _normalizeClass($setup.ns.e('loading'))
                  },
                  [
                    _createElementVNode(
                      'div',
                      {
                        class: _normalizeClass($setup.ns.e('loading-bar'))
                      },
                      null,
                      2
                      /* CLASS */
                    )
                  ],
                  2
                  /* CLASS */
                ))
              : _createCommentVNode('v-if', true),
            _createCommentVNode(' \u906E\u7F69 (\u5916\u90E8\u6A21\u5F0F) '),
            $setup.visible && $setup.resolvedPosition !== 'inside'
              ? (_openBlock(),
                _createElementBlock(
                  'div',
                  {
                    key: 1,
                    class: _normalizeClass([
                      $setup.ns.e('mask'),
                      $setup.ns.is($setup.props.maskShape)
                    ]),
                    style: _normalizeStyle($setup.maskStyle)
                  },
                  null,
                  6
                  /* CLASS, STYLE */
                ))
              : _createCommentVNode('v-if', true),
            _createCommentVNode(' \u5185\u90E8\u900F\u955C\u9884\u89C8 (inside) '),
            $setup.visible && $setup.resolvedPosition === 'inside'
              ? (_openBlock(),
                _createElementBlock(
                  'div',
                  {
                    key: 2,
                    class: _normalizeClass($setup.ns.e('preview')),
                    style: _normalizeStyle($setup.previewStyle)
                  },
                  [
                    _createElementVNode(
                      'img',
                      {
                        src: $setup.currentZoomSrc,
                        class: _normalizeClass($setup.ns.e('large-image')),
                        style: _normalizeStyle($setup.largeImageStyle),
                        alt: $setup.currentAlt
                      },
                      null,
                      14,
                      _hoisted_2
                    ),
                    _createCommentVNode(' \u5730\u56FE\u7F29\u7565\u5BFC\u822A '),
                    $setup.props.showMinimap
                      ? (_openBlock(),
                        _createElementBlock(
                          'div',
                          {
                            key: 0,
                            class: _normalizeClass($setup.ns.e('minimap'))
                          },
                          [
                            _createElementVNode(
                              'img',
                              {
                                src: $setup.currentSrc,
                                class: _normalizeClass($setup.ns.e('minimap-img'))
                              },
                              null,
                              10,
                              _hoisted_3
                            ),
                            _createElementVNode(
                              'div',
                              {
                                class: _normalizeClass($setup.ns.e('minimap-indicator')),
                                style: _normalizeStyle($setup.minimapIndicatorStyle)
                              },
                              null,
                              6
                              /* CLASS, STYLE */
                            )
                          ],
                          2
                          /* CLASS */
                        ))
                      : _createCommentVNode('v-if', true)
                  ],
                  6
                  /* CLASS, STYLE */
                ))
              : _createCommentVNode('v-if', true),
            _createCommentVNode(' \u63D0\u793A\u6587\u5B57 '),
            !$setup.visible && $setup.props.title
              ? (_openBlock(),
                _createElementBlock(
                  'div',
                  {
                    key: 3,
                    class: _normalizeClass($setup.ns.e('title'))
                  },
                  [
                    _renderSlot(_ctx.$slots, 'title', {}, () => [
                      _createTextVNode(
                        _toDisplayString($setup.props.title),
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
          6
          /* CLASS, STYLE */
        ),
        _createCommentVNode(' \u5916\u90E8\u9884\u89C8\u56FE (right/left) '),
        $setup.visible && $setup.resolvedPosition !== 'inside'
          ? (_openBlock(),
            _createElementBlock(
              'div',
              {
                key: 0,
                class: _normalizeClass($setup.ns.e('preview')),
                style: _normalizeStyle($setup.previewStyle)
              },
              [
                _createElementVNode(
                  'img',
                  {
                    src: $setup.currentZoomSrc,
                    class: _normalizeClass($setup.ns.e('large-image')),
                    style: _normalizeStyle($setup.largeImageStyle),
                    alt: $setup.currentAlt
                  },
                  null,
                  14,
                  _hoisted_4
                ),
                _createCommentVNode(' \u5730\u56FE\u7F29\u7565\u5BFC\u822A '),
                $setup.props.showMinimap
                  ? (_openBlock(),
                    _createElementBlock(
                      'div',
                      {
                        key: 0,
                        class: _normalizeClass($setup.ns.e('minimap'))
                      },
                      [
                        _createElementVNode(
                          'img',
                          {
                            src: $setup.currentSrc,
                            class: _normalizeClass($setup.ns.e('minimap-img')),
                            alt: $setup.currentAlt
                          },
                          null,
                          10,
                          _hoisted_5
                        ),
                        _createElementVNode(
                          'div',
                          {
                            class: _normalizeClass($setup.ns.e('minimap-indicator')),
                            style: _normalizeStyle($setup.minimapIndicatorStyle)
                          },
                          null,
                          6
                          /* CLASS, STYLE */
                        )
                      ],
                      2
                      /* CLASS */
                    ))
                  : _createCommentVNode('v-if', true)
              ],
              6
              /* CLASS, STYLE */
            ))
          : _createCommentVNode('v-if', true),
        _createCommentVNode(' \u56FE\u7247\u5E93\u7F29\u7565\u56FE '),
        $setup.galleryImages.length > 1
          ? (_openBlock(),
            _createElementBlock(
              'div',
              {
                key: 1,
                class: _normalizeClass($setup.ns.e('gallery'))
              },
              [
                (_openBlock(true),
                _createElementBlock(
                  _Fragment,
                  null,
                  _renderList($setup.galleryImages, (img, idx) => {
                    return (
                      _openBlock(),
                      _createElementBlock(
                        'button',
                        {
                          key: idx,
                          class: _normalizeClass([
                            $setup.ns.e('gallery-item'),
                            $setup.ns.is('active', idx === $setup.currentIndex)
                          ]),
                          onClick: ($event) => $setup.switchImage(idx),
                          type: 'button',
                          'aria-label': `Switch to image ${idx + 1}`
                        },
                        [
                          _createElementVNode(
                            'img',
                            {
                              src: img.src,
                              alt: img.alt || `Gallery ${idx + 1}`
                            },
                            null,
                            8,
                            _hoisted_7
                          )
                        ],
                        10,
                        _hoisted_6
                      )
                    )
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ],
              2
              /* CLASS */
            ))
          : _createCommentVNode('v-if', true),
        _createCommentVNode(
          ' \u5F53\u524D\u500D\u7387\u663E\u793A (wheelZoom \u5F00\u542F\u65F6) '
        ),
        $setup.props.wheelZoom && $setup.visible
          ? (_openBlock(),
            _createElementBlock(
              'div',
              {
                key: 2,
                class: _normalizeClass($setup.ns.e('scale-badge'))
              },
              _toDisplayString($setup.currentScale) + 'x ',
              3
              /* TEXT, CLASS */
            ))
          : _createCommentVNode('v-if', true),
        _createCommentVNode(
          ' \u5168\u5C4F\u5F39\u5C42\uFF1AEsc \u901A\u8FC7 document \u7EA7\u76D1\u542C\u5904\u7406\uFF0C\u4E0D\u4F9D\u8D56\u5143\u7D20\u7126\u70B9 '
        ),
        (_openBlock(),
        _createBlock(_Teleport, { to: 'body' }, [
          $setup.fullscreenVisible
            ? (_openBlock(),
              _createElementBlock(
                'div',
                {
                  key: 0,
                  class: _normalizeClass([$setup.ns.b(), $setup.ns.m('fullscreen-wrapper')])
                },
                [
                  _createElementVNode(
                    'div',
                    {
                      class: _normalizeClass($setup.ns.e('fullscreen-overlay')),
                      role: 'dialog',
                      'aria-modal': 'true',
                      onClick: _withModifiers($setup.closeFullscreen, ['self'])
                    },
                    [
                      _createElementVNode(
                        'button',
                        {
                          class: _normalizeClass($setup.ns.e('fullscreen-close')),
                          onClick: $setup.closeFullscreen,
                          type: 'button',
                          'aria-label': 'Close'
                        },
                        [
                          _renderSlot(_ctx.$slots, 'close-icon', {}, () => [
                            _cache[0] ||
                              (_cache[0] = _createTextVNode(
                                '\u2715',
                                -1
                                /* CACHED */
                              ))
                          ])
                        ],
                        2
                        /* CLASS */
                      ),
                      _createElementVNode(
                        'div',
                        {
                          class: _normalizeClass($setup.ns.e('fullscreen-body'))
                        },
                        [
                          _renderSlot(
                            _ctx.$slots,
                            'fullscreen',
                            {
                              src: $setup.currentZoomSrc,
                              alt: $setup.currentAlt
                            },
                            () => [
                              _createElementVNode(
                                'img',
                                {
                                  src: $setup.currentZoomSrc,
                                  alt: $setup.currentAlt,
                                  class: _normalizeClass($setup.ns.e('fullscreen-image'))
                                },
                                null,
                                10,
                                _hoisted_8
                              )
                            ]
                          )
                        ],
                        2
                        /* CLASS */
                      ),
                      $setup.galleryImages.length > 1
                        ? (_openBlock(),
                          _createElementBlock(
                            'div',
                            {
                              key: 0,
                              class: _normalizeClass($setup.ns.e('fullscreen-gallery'))
                            },
                            [
                              (_openBlock(true),
                              _createElementBlock(
                                _Fragment,
                                null,
                                _renderList($setup.galleryImages, (img, idx) => {
                                  return (
                                    _openBlock(),
                                    _createElementBlock(
                                      'button',
                                      {
                                        key: idx,
                                        class: _normalizeClass([
                                          $setup.ns.e('fullscreen-thumb'),
                                          $setup.ns.is('active', idx === $setup.currentIndex)
                                        ]),
                                        onClick: ($event) => $setup.switchImage(idx),
                                        type: 'button'
                                      },
                                      [
                                        _createElementVNode(
                                          'img',
                                          {
                                            src: img.src,
                                            alt: img.alt || `Gallery ${idx + 1}`
                                          },
                                          null,
                                          8,
                                          _hoisted_10
                                        )
                                      ],
                                      10,
                                      _hoisted_9
                                    )
                                  )
                                }),
                                128
                                /* KEYED_FRAGMENT */
                              ))
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
              ))
            : _createCommentVNode('v-if', true)
        ]))
      ],
      38
      /* CLASS, STYLE, NEED_HYDRATION */
    )
  )
}
var __sfc__ = /* @__PURE__ */ Object.assign(
  { name: 'YhImageMagnifier' },
  {
    __name: 'image-magnifier',
    props: imageMagnifierProps,
    emits: imageMagnifierEmits,
    setup(__props, { expose: __expose, emit: __emit }) {
      const props = __props
      const emit = __emit
      const ns = useNamespace('image-magnifier')
      const { themeStyle } = useComponentTheme(
        'image-magnifier',
        computed2(() => props.themeOverrides)
      )
      const rootStyle = computed2(() => {
        const { width, height } = props
        return __spreadProps(__spreadValues2({}, themeStyle.value), {
          width: typeof width === 'number' ? `${width}px` : width,
          height: typeof height === 'number' ? `${height}px` : height
        })
      })
      const currentIndex = ref2(props.modelValue)
      watch(
        () => props.modelValue,
        (val) => {
          currentIndex.value = val
        }
      )
      const galleryImages = computed2(() => {
        if (props.images.length > 0) return props.images
        return [{ src: props.src, zoomSrc: props.zoomSrc, alt: props.alt }]
      })
      const currentImage = computed2(() => {
        var _a
        return (_a = galleryImages.value[currentIndex.value]) != null ? _a : galleryImages.value[0]
      })
      const currentSrc = computed2(() => currentImage.value.src)
      const currentZoomSrc = computed2(() => currentImage.value.zoomSrc || currentImage.value.src)
      const currentAlt = computed2(() => currentImage.value.alt || props.alt)
      const switchImage = (index) => {
        currentIndex.value = index
        emit('update:modelValue', index)
        emit('image-change', index)
      }
      const isHdLoaded = ref2(false)
      const isHdLoading = ref2(false)
      const preloadHdImage = () => {
        if (isHdLoaded.value || isHdLoading.value) return
        const zoomUrl = currentZoomSrc.value
        if (!zoomUrl) return
        isHdLoading.value = true
        const img = new Image()
        img.onload = () => {
          isHdLoaded.value = true
          isHdLoading.value = false
        }
        img.onerror = () => {
          isHdLoading.value = false
        }
        img.src = zoomUrl
      }
      watch(currentIndex, () => {
        isHdLoaded.value = false
        isHdLoading.value = false
      })
      const visible = ref2(false)
      const maskPos = reactive({ top: 0, left: 0 })
      const largePos = reactive({ top: 0, left: 0 })
      const containerRef = ref2(null)
      const currentScale = ref2(props.scale)
      watch(
        () => props.scale,
        (val) => {
          currentScale.value = val
        }
      )
      const resolvedPosition = ref2('right')
      const computeSmartPosition = () => {
        if (
          props.position !== 'auto' &&
          props.position !== 'right' &&
          props.position !== 'left' &&
          props.position !== 'inside'
        )
          return
        if (props.position !== 'auto') {
          resolvedPosition.value = props.position
          return
        }
        if (!containerRef.value) {
          resolvedPosition.value = 'right'
          return
        }
        const rect = containerRef.value.getBoundingClientRect()
        const previewW = props.maskWidth * currentScale.value
        const rightSpace = window.innerWidth - rect.right
        const leftSpace = rect.left
        if (rightSpace >= previewW + props.offset) {
          resolvedPosition.value = 'right'
        } else if (leftSpace >= previewW + props.offset) {
          resolvedPosition.value = 'left'
        } else {
          resolvedPosition.value = 'inside'
        }
      }
      const handleMouseEnter = () => {
        visible.value = true
        computeSmartPosition()
        preloadHdImage()
        emit('enter')
        emit('zoom-start')
      }
      const handleMouseLeave = () => {
        visible.value = false
        emit('leave')
        emit('zoom-end')
      }
      const handleMouseMove = (e) => {
        if (!containerRef.value) return
        const rect = containerRef.value.getBoundingClientRect()
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top
        let left = mouseX - props.maskWidth / 2
        let top = mouseY - props.maskHeight / 2
        left = Math.max(0, Math.min(left, rect.width - props.maskWidth))
        top = Math.max(0, Math.min(top, rect.height - props.maskHeight))
        maskPos.left = left
        maskPos.top = top
        if (resolvedPosition.value === 'inside') {
          largePos.left = props.maskWidth / 2 - mouseX * currentScale.value
          largePos.top = props.maskHeight / 2 - mouseY * currentScale.value
        } else {
          largePos.left = -left * currentScale.value
          largePos.top = -top * currentScale.value
        }
      }
      const handleWheel = (e) => {
        if (!props.wheelZoom || !visible.value) return
        e.preventDefault()
        const delta = e.deltaY > 0 ? -props.scaleStep : props.scaleStep
        currentScale.value =
          Math.round(
            Math.min(props.maxScale, Math.max(props.minScale, currentScale.value + delta)) * 10
          ) / 10
        emit('scale-change', currentScale.value)
      }
      const addWheelListener = () => {
        var _a
        ;(_a = containerRef.value) == null
          ? void 0
          : _a.addEventListener('wheel', handleWheel, { passive: false })
      }
      const removeWheelListener = () => {
        var _a
        ;(_a = containerRef.value) == null ? void 0 : _a.removeEventListener('wheel', handleWheel)
      }
      watch(containerRef, (el) => {
        if (el) {
          nextTick(addWheelListener)
        }
      })
      const previewStyle = computed2(() => {
        const isInside = resolvedPosition.value === 'inside'
        const base = {
          position: 'absolute',
          overflow: 'hidden',
          zIndex: 100,
          pointerEvents: 'none'
        }
        if (isInside) {
          return __spreadProps(__spreadValues2({}, base), {
            left: `${maskPos.left}px`,
            top: `${maskPos.top}px`,
            width: `${props.maskWidth}px`,
            height: `${props.maskHeight}px`,
            borderRadius: props.maskShape === 'circle' ? '50%' : 'var(--yh-radius-base)',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.6), 0 4px 16px rgba(0,0,0,0.25)',
            zIndex: 10,
            backgroundColor: 'var(--yh-bg-color-overlay)'
          })
        }
        return __spreadValues2(
          __spreadValues2(
            __spreadProps(__spreadValues2({}, base), {
              top: '0',
              width: `${props.maskWidth * currentScale.value}px`,
              height: `${props.maskHeight * currentScale.value}px`
            }),
            resolvedPosition.value === 'right' ? { left: `calc(100% + ${props.offset}px)` } : {}
          ),
          resolvedPosition.value === 'left' ? { right: `calc(100% + ${props.offset}px)` } : {}
        )
      })
      const largeImageStyle = computed2(() => {
        var _a, _b, _c, _d
        const w =
          (_b = (_a = containerRef.value) == null ? void 0 : _a.offsetWidth) != null ? _b : 0
        const h =
          (_d = (_c = containerRef.value) == null ? void 0 : _c.offsetHeight) != null ? _d : 0
        return {
          width: `${w * currentScale.value}px`,
          height: `${h * currentScale.value}px`,
          transform: `translate(${largePos.left}px, ${largePos.top}px)`,
          position: 'absolute',
          top: '0',
          left: '0',
          opacity: isHdLoaded.value || !isHdLoading.value ? 1 : 0.5,
          transition: 'opacity 0.2s'
        }
      })
      const maskStyle = computed2(() => ({
        width: `${props.maskWidth}px`,
        height: `${props.maskHeight}px`,
        transform: `translate(${maskPos.left}px, ${maskPos.top}px)`,
        backgroundColor: props.maskColor,
        position: 'absolute',
        top: '0',
        left: '0'
      }))
      const minimapIndicatorStyle = computed2(() => {
        if (!containerRef.value) return {}
        const cW = containerRef.value.offsetWidth || 1
        const cH = containerRef.value.offsetHeight || 1
        const ratioX = maskPos.left / cW
        const ratioY = maskPos.top / cH
        const ratioW = props.maskWidth / cW
        const ratioH = props.maskHeight / cH
        return {
          left: `${ratioX * 100}%`,
          top: `${ratioY * 100}%`,
          width: `${ratioW * 100}%`,
          height: `${ratioH * 100}%`
        }
      })
      const fullscreenVisible = ref2(false)
      const openFullscreen = () => {
        if (!props.clickToFullscreen) return
        fullscreenVisible.value = true
      }
      const closeFullscreen = () => {
        fullscreenVisible.value = false
      }
      const handleFullscreenKeydown = (e) => {
        if (e.key === 'Escape') closeFullscreen()
      }
      watch(fullscreenVisible, (val) => {
        if (val) {
          document.addEventListener('keydown', handleFullscreenKeydown)
          document.documentElement.style.overflow = 'hidden'
          document.body.style.overflow = 'hidden'
        } else {
          document.removeEventListener('keydown', handleFullscreenKeydown)
          document.documentElement.style.overflow = ''
          document.body.style.overflow = ''
        }
      })
      onUnmounted(() => {
        removeWheelListener()
        document.removeEventListener('keydown', handleFullscreenKeydown)
      })
      __expose({ visible, currentScale, currentIndex, switchImage })
      const __returned__ = {
        props,
        emit,
        ns,
        themeStyle,
        rootStyle,
        currentIndex,
        galleryImages,
        currentImage,
        currentSrc,
        currentZoomSrc,
        currentAlt,
        switchImage,
        isHdLoaded,
        isHdLoading,
        preloadHdImage,
        visible,
        maskPos,
        largePos,
        containerRef,
        currentScale,
        resolvedPosition,
        computeSmartPosition,
        handleMouseEnter,
        handleMouseLeave,
        handleMouseMove,
        handleWheel,
        addWheelListener,
        removeWheelListener,
        previewStyle,
        largeImageStyle,
        maskStyle,
        minimapIndicatorStyle,
        fullscreenVisible,
        openFullscreen,
        closeFullscreen,
        handleFullscreenKeydown,
        ref: ref2,
        computed: computed2,
        reactive,
        watch,
        onUnmounted,
        nextTick,
        get useNamespace() {
          return useNamespace
        },
        get useComponentTheme() {
          return useComponentTheme
        },
        get imageMagnifierProps() {
          return imageMagnifierProps
        },
        get imageMagnifierEmits() {
          return imageMagnifierEmits
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
