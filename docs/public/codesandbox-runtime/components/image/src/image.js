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
  renderSlot as _renderSlot,
  toDisplayString as _toDisplayString,
  normalizeClass as _normalizeClass,
  createElementVNode as _createElementVNode,
  createCommentVNode as _createCommentVNode,
  normalizeStyle as _normalizeStyle,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  createBlock as _createBlock
} from 'vue'
const _hoisted_1 = ['src', 'alt', 'crossorigin', 'loading']
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      'div',
      {
        ref: 'container',
        class: _normalizeClass($setup.ns.b()),
        style: _normalizeStyle($setup.themeStyle)
      },
      [
        $setup.isLoading
          ? _renderSlot(_ctx.$slots, 'placeholder', { key: 0 }, () => [
              _createElementVNode(
                'div',
                {
                  class: _normalizeClass($setup.ns.e('placeholder'))
                },
                _toDisplayString($setup.t('button.loading')),
                3
                /* TEXT, CLASS */
              )
            ])
          : $setup.error
            ? _renderSlot(_ctx.$slots, 'error', { key: 1 }, () => [
                _createElementVNode(
                  'div',
                  {
                    class: _normalizeClass($setup.ns.e('error'))
                  },
                  _toDisplayString($setup.t('image.error')),
                  3
                  /* TEXT, CLASS */
                )
              ])
            : (_openBlock(),
              _createElementBlock(
                'img',
                {
                  key: 2,
                  src: _ctx.src,
                  alt: _ctx.alt,
                  class: _normalizeClass([
                    $setup.ns.e('inner'),
                    $setup.preview && $setup.ns.is('preview')
                  ]),
                  style: _normalizeStyle($setup.imageStyle),
                  crossorigin: _ctx.crossorigin,
                  loading: $setup.props.loading,
                  onClick: $setup.clickHandler
                },
                null,
                14,
                _hoisted_1
              )),
        _createCommentVNode(' Viewer '),
        $setup.preview && $setup.showViewer
          ? (_openBlock(),
            _createBlock(
              $setup['YhImageViewer'],
              {
                key: 3,
                'url-list': _ctx.previewSrcList,
                'z-index': _ctx.zIndex,
                'initial-index': _ctx.initialIndex,
                infinite: _ctx.infinite,
                'hide-on-click-modal': _ctx.hideOnClickModal,
                'close-on-press-escape': _ctx.closeOnPressEscape,
                'show-progress': _ctx.showProgress,
                'zoom-rate': _ctx.zoomRate,
                teleported: _ctx.previewTeleported,
                onClose: $setup.closeViewer,
                onSwitch: $setup.handleSwitch
              },
              null,
              8,
              [
                'url-list',
                'z-index',
                'initial-index',
                'infinite',
                'hide-on-click-modal',
                'close-on-press-escape',
                'show-progress',
                'zoom-rate',
                'teleported'
              ]
            ))
          : _createCommentVNode('v-if', true)
      ],
      6
      /* CLASS, STYLE */
    )
  )
}
import { computed, ref, onMounted, onUnmounted, watch } from 'vue'
import { useLocale } from '../../../hooks/index.js'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { useComponentTheme } from '../../../theme/component-theme.js'
import { isClient, getScrollContainer } from '../../../utils/index.js'
import { imageProps } from './image-meta.js'
import YhImageViewer from './image-viewer.js'
import Viewer from '../../viewerjs.js'
import 'viewerjs/dist/viewer.css'
const __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhImage'
  },
  {
    __name: 'image',
    props: imageProps,
    emits: ['load', 'error', 'switch', 'close', 'show'],
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose()
      const props = __props
      const emit = __emit
      const ns = useNamespace('image')
      const { t } = useLocale()
      const { themeStyle } = useComponentTheme(
        'image',
        computed(() => props.themeOverrides)
      )
      const isLoading = ref(true)
      const error = ref(false)
      const showViewer = ref(false)
      const container = ref()
      const isLazy = ref(false)
      let viewer = null
      let viewerList = null
      const isSupportNativeLazy = isClient && 'loading' in HTMLImageElement.prototype
      const imageStyle = computed(() => {
        const { fit } = props
        if (fit) {
          return { 'object-fit': fit }
        }
        return {}
      })
      const preview = computed(() => {
        const { previewSrcList } = props
        return Array.isArray(previewSrcList) && previewSrcList.length > 0
      })
      const loadImage = () => {
        if (!isClient) return
        isLoading.value = true
        error.value = false
        const img = new Image()
        img.src = props.src
        if (props.crossorigin) img.crossOrigin = props.crossorigin
        img.onload = (e) => {
          isLoading.value = false
          emit('load', e)
        }
        img.onerror = (e) => {
          isLoading.value = false
          error.value = true
          emit('error', e)
        }
      }
      let observer = null
      const handleLazyLoad = () => {
        if (!isClient) return
        if (props.lazy) {
          if (isSupportNativeLazy && props.loading === 'lazy') {
            loadImage()
          } else {
            isLazy.value = true
            initLazyLoad()
          }
        } else {
          loadImage()
        }
      }
      const initLazyLoad = () => {
        if (!isClient || !container.value) return
        if (!isLoading.value && !error.value) return
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                loadImage()
                stopLazyLoad()
              }
            })
          },
          {
            root: getRoot(),
            rootMargin: '200px'
            // 提前 200px 开始加载
          }
        )
        observer.observe(container.value)
      }
      const getRoot = () => {
        if (!isClient || !container.value) return null
        if (typeof props.scrollContainer === 'string') {
          return document.querySelector(props.scrollContainer)
        } else if (props.scrollContainer instanceof HTMLElement) {
          return props.scrollContainer
        }
        const scrollContainer = getScrollContainer(container.value)
        return scrollContainer instanceof HTMLElement ? scrollContainer : null
      }
      const stopLazyLoad = () => {
        if (observer) {
          observer.disconnect()
          observer = null
        }
      }
      const initViewerJS = () => {
        if (!isClient || !container.value) return
        const imgElement = container.value.querySelector('img')
        if (!imgElement) return
        if (props.previewSrcList && props.previewSrcList.length > 0) {
          const list = document.createElement('div')
          list.style.display = 'none'
          props.previewSrcList.forEach((src) => {
            const img = document.createElement('img')
            img.src = src
            list.appendChild(img)
          })
          document.body.appendChild(list)
          viewerList = list
          const nextViewer = new Viewer(
            list,
            __spreadProps(__spreadValues({}, props.viewerOptions), {
              hidden: () => {
                if (viewerList) {
                  document.body.removeChild(viewerList)
                  viewerList = null
                }
                viewer == null ? void 0 : viewer.destroy()
                viewer = null
              }
            })
          )
          viewer = nextViewer
          nextViewer.view(props.initialIndex)
        } else {
          const nextViewer = new Viewer(imgElement, props.viewerOptions)
          viewer = nextViewer
          nextViewer.show()
        }
      }
      watch(
        () => props.src,
        () => {
          if (isLazy.value) {
            stopLazyLoad()
            initLazyLoad()
          } else {
            loadImage()
          }
        }
      )
      onMounted(() => {
        handleLazyLoad()
      })
      onUnmounted(() => {
        stopLazyLoad()
        if (viewer) {
          viewer.destroy()
          viewer = null
        }
        if (viewerList) {
          document.body.removeChild(viewerList)
          viewerList = null
        }
      })
      const clickHandler = () => {
        if (!preview.value) return
        if (props.viewerMode === 'viewerjs') {
          initViewerJS()
        } else {
          showViewer.value = true
        }
        emit('show')
      }
      const closeViewer = () => {
        showViewer.value = false
        emit('close')
      }
      const handleSwitch = (index) => {
        emit('switch', index)
      }
      const __returned__ = {
        props,
        emit,
        ns,
        t,
        themeStyle,
        isLoading,
        error,
        showViewer,
        container,
        isLazy,
        get viewer() {
          return viewer
        },
        set viewer(v) {
          viewer = v
        },
        get viewerList() {
          return viewerList
        },
        set viewerList(v) {
          viewerList = v
        },
        isSupportNativeLazy,
        imageStyle,
        preview,
        loadImage,
        get observer() {
          return observer
        },
        set observer(v) {
          observer = v
        },
        handleLazyLoad,
        initLazyLoad,
        getRoot,
        stopLazyLoad,
        initViewerJS,
        clickHandler,
        closeViewer,
        handleSwitch,
        computed,
        ref,
        onMounted,
        onUnmounted,
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
        get isClient() {
          return isClient
        },
        get getScrollContainer() {
          return getScrollContainer
        },
        get imageProps() {
          return imageProps
        },
        YhImageViewer,
        get Viewer() {
          return Viewer
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
