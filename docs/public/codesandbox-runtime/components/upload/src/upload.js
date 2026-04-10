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
  createCommentVNode as _createCommentVNode,
  withModifiers as _withModifiers,
  mergeProps as _mergeProps,
  createElementVNode as _createElementVNode,
  renderSlot as _renderSlot,
  normalizeClass as _normalizeClass,
  createVNode as _createVNode,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  Fragment as _Fragment,
  renderList as _renderList,
  normalizeStyle as _normalizeStyle,
  createBlock as _createBlock,
  toDisplayString as _toDisplayString,
  TransitionGroup as _TransitionGroup,
  withCtx as _withCtx
} from 'vue'
const _hoisted_1 = ['accept', 'multiple']
const _hoisted_2 = ['innerHTML']
const _hoisted_3 = ['src', 'alt', 'crossorigin']
const _hoisted_4 = ['onClick']
const _hoisted_5 = ['onClick']
const _hoisted_6 = ['onClick']
const _hoisted_7 = ['src', 'crossorigin']
const _hoisted_8 = ['onClick']
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      'div',
      {
        class: _normalizeClass([
          $setup.ns.b(),
          $setup.ns.m(_ctx.listType),
          $setup.ns.m(`pos-${_ctx.triggerPosition}`),
          {
            [$setup.ns.is('disabled')]: _ctx.disabled
          }
        ]),
        style: _normalizeStyle($setup.themeStyle)
      },
      [
        _createCommentVNode(
          ' Hidden Input moved to top for better focus/click reliability in some browsers '
        ),
        _createElementVNode(
          'input',
          _mergeProps(
            {
              ref: 'inputRef',
              type: 'file',
              class: $setup.ns.e('input'),
              accept: _ctx.accept,
              multiple: _ctx.multiple || _ctx.directory
            },
            _ctx.directory
              ? {
                  webkitdirectory: '',
                  directory: '',
                  mozdirectory: ''
                }
              : {},
            {
              style: { display: 'none' },
              onChange: $setup.onInputChange,
              onClick: _cache[0] || (_cache[0] = _withModifiers(() => {}, ['stop']))
            }
          ),
          null,
          16,
          _hoisted_1
        ),
        _createElementVNode(
          'div',
          {
            class: _normalizeClass($setup.ns.e('header'))
          },
          [
            _createCommentVNode(' Trigger Area '),
            _ctx.drag
              ? (_openBlock(),
                _createElementBlock(
                  'div',
                  {
                    key: 0,
                    class: _normalizeClass([
                      $setup.ns.e('dragger'),
                      {
                        [$setup.ns.is('dragover')]: $setup.dragOver
                      }
                    ]),
                    onDrop: _withModifiers($setup.onDrop, ['prevent']),
                    onDragover: _withModifiers($setup.onDragOver, ['prevent']),
                    onDragenter: _withModifiers($setup.onDragOver, ['prevent']),
                    onDragleave:
                      _cache[1] ||
                      (_cache[1] = _withModifiers(
                        ($event) => ($setup.dragOver = false),
                        ['prevent']
                      )),
                    onClick: $setup.triggerInput
                  },
                  [
                    _renderSlot(_ctx.$slots, 'trigger', {}, () => [
                      _renderSlot(_ctx.$slots, 'default', {}, () => [
                        _createElementVNode(
                          'div',
                          {
                            class: _normalizeClass($setup.ns.e('content'))
                          },
                          [
                            _createVNode(
                              $setup['YhIcon'],
                              {
                                name: 'plus',
                                size: 32,
                                class: _normalizeClass($setup.ns.e('icon'))
                              },
                              null,
                              8,
                              ['class']
                            ),
                            _createCommentVNode(' eslint-disable-next-line vue/no-v-html '),
                            _createElementVNode(
                              'div',
                              {
                                class: _normalizeClass($setup.ns.e('text')),
                                innerHTML: $setup.t('upload.tip')
                              },
                              null,
                              10,
                              _hoisted_2
                            )
                          ],
                          2
                          /* CLASS */
                        )
                      ])
                    ])
                  ],
                  34
                  /* CLASS, NEED_HYDRATION */
                ))
              : (_openBlock(),
                _createElementBlock(
                  _Fragment,
                  { key: 1 },
                  [
                    _createCommentVNode(
                      ' If trigger slot exists, it always gets the click handler '
                    ),
                    _ctx.$slots.trigger
                      ? (_openBlock(),
                        _createElementBlock(
                          'div',
                          {
                            key: 0,
                            class: _normalizeClass($setup.ns.e('trigger')),
                            onClick: $setup.triggerInput
                          },
                          [_renderSlot(_ctx.$slots, 'trigger')],
                          2
                          /* CLASS */
                        ))
                      : _ctx.listType === 'picture-card'
                        ? (_openBlock(),
                          _createElementBlock(
                            _Fragment,
                            { key: 1 },
                            [
                              _createCommentVNode(
                                ' If picture-card and no trigger slot, use the plus button trigger '
                              ),
                              _createElementVNode(
                                'div',
                                {
                                  class: _normalizeClass($setup.ns.e('trigger')),
                                  onClick: $setup.triggerInput
                                },
                                [
                                  _createElementVNode(
                                    'div',
                                    {
                                      class: _normalizeClass($setup.ns.e('picture-card-plus'))
                                    },
                                    [
                                      _createVNode($setup['YhIcon'], {
                                        name: 'plus',
                                        size: 28
                                      })
                                    ],
                                    2
                                    /* CLASS */
                                  )
                                ],
                                2
                                /* CLASS */
                              )
                            ],
                            2112
                            /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                          ))
                        : (_openBlock(),
                          _createElementBlock(
                            _Fragment,
                            { key: 2 },
                            [
                              _createCommentVNode(' Default: the default slot is the trigger '),
                              _createElementVNode(
                                'div',
                                {
                                  class: _normalizeClass($setup.ns.e('trigger')),
                                  onClick: $setup.triggerInput
                                },
                                [_renderSlot(_ctx.$slots, 'default')],
                                2
                                /* CLASS */
                              )
                            ],
                            2112
                            /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                          ))
                  ],
                  64
                  /* STABLE_FRAGMENT */
                )),
            _createCommentVNode(' Tip Slot '),
            _ctx.$slots.tip
              ? (_openBlock(),
                _createElementBlock(
                  'div',
                  {
                    key: 2,
                    class: _normalizeClass($setup.ns.e('tip'))
                  },
                  [_renderSlot(_ctx.$slots, 'tip')],
                  2
                  /* CLASS */
                ))
              : _createCommentVNode('v-if', true),
            _createCommentVNode(
              ' If trigger slot is used, the default slot can be used for other elements like submit buttons '
            ),
            _ctx.$slots.trigger
              ? (_openBlock(),
                _createElementBlock(
                  'div',
                  {
                    key: 3,
                    class: _normalizeClass($setup.ns.e('extra'))
                  },
                  [_renderSlot(_ctx.$slots, 'default')],
                  2
                  /* CLASS */
                ))
              : _createCommentVNode('v-if', true)
          ],
          2
          /* CLASS */
        ),
        _createCommentVNode(' File List '),
        _ctx.showFileList
          ? (_openBlock(),
            _createBlock(
              _TransitionGroup,
              {
                key: 0,
                name: 'yh-list',
                tag: 'ul',
                class: _normalizeClass([$setup.ns.e('list'), $setup.ns.em('list', _ctx.listType)])
              },
              {
                default: _withCtx(() => [
                  (_openBlock(true),
                  _createElementBlock(
                    _Fragment,
                    null,
                    _renderList(_ctx.fileList, (file) => {
                      return (
                        _openBlock(),
                        _createElementBlock(
                          'li',
                          {
                            key: file.uid,
                            class: _normalizeClass([$setup.ns.e('item'), $setup.ns.is(file.status)])
                          },
                          [
                            _renderSlot(_ctx.$slots, 'file', { file }, () => [
                              _createCommentVNode(' Picture Card Layout '),
                              _ctx.listType === 'picture-card'
                                ? (_openBlock(),
                                  _createElementBlock(
                                    'div',
                                    {
                                      key: 0,
                                      class: _normalizeClass($setup.ns.e('thumbnail'))
                                    },
                                    [
                                      file.url
                                        ? (_openBlock(),
                                          _createElementBlock(
                                            'img',
                                            {
                                              key: 0,
                                              src: file.url,
                                              alt: file.name,
                                              crossorigin: _ctx.crossorigin
                                            },
                                            null,
                                            8,
                                            _hoisted_3
                                          ))
                                        : _createCommentVNode('v-if', true),
                                      _createElementVNode(
                                        'div',
                                        {
                                          class: _normalizeClass($setup.ns.e('actions'))
                                        },
                                        [
                                          _createElementVNode(
                                            'span',
                                            {
                                              onClick: _withModifiers(
                                                ($event) => $setup.handlePreview(file),
                                                ['stop']
                                              )
                                            },
                                            [
                                              _createVNode($setup['YhIcon'], {
                                                name: 'eye',
                                                size: 18
                                              })
                                            ],
                                            8,
                                            _hoisted_4
                                          ),
                                          _ctx.showDownload
                                            ? (_openBlock(),
                                              _createElementBlock(
                                                'span',
                                                {
                                                  key: 0,
                                                  onClick: _withModifiers(
                                                    ($event) => $setup.handleDownload(file),
                                                    ['stop']
                                                  )
                                                },
                                                [
                                                  _createVNode($setup['YhIcon'], {
                                                    name: 'download',
                                                    size: 18
                                                  })
                                                ],
                                                8,
                                                _hoisted_5
                                              ))
                                            : _createCommentVNode('v-if', true),
                                          !_ctx.disabled
                                            ? (_openBlock(),
                                              _createElementBlock(
                                                'span',
                                                {
                                                  key: 1,
                                                  onClick: _withModifiers(
                                                    ($event) => $setup.handleRemove(file),
                                                    ['stop']
                                                  )
                                                },
                                                [
                                                  _createVNode($setup['YhIcon'], {
                                                    name: 'delete',
                                                    size: 18
                                                  })
                                                ],
                                                8,
                                                _hoisted_6
                                              ))
                                            : _createCommentVNode('v-if', true)
                                        ],
                                        2
                                        /* CLASS */
                                      ),
                                      _createCommentVNode(' Progress Bar overlay '),
                                      file.status === 'uploading'
                                        ? (_openBlock(),
                                          _createElementBlock(
                                            'div',
                                            {
                                              key: 1,
                                              class: _normalizeClass(
                                                $setup.ns.e('progress-overlay')
                                              )
                                            },
                                            [
                                              _createElementVNode(
                                                'div',
                                                {
                                                  class: _normalizeClass(
                                                    $setup.ns.e('progress-inner')
                                                  ),
                                                  style: _normalizeStyle({
                                                    width: (file.percentage || 0) + '%'
                                                  })
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
                                    2
                                    /* CLASS */
                                  ))
                                : (_openBlock(),
                                  _createElementBlock(
                                    _Fragment,
                                    { key: 1 },
                                    [
                                      _createCommentVNode(' Text/Picture Layout '),
                                      _createElementVNode(
                                        'div',
                                        {
                                          class: _normalizeClass($setup.ns.e('info'))
                                        },
                                        [
                                          _ctx.listType === 'picture'
                                            ? (_openBlock(),
                                              _createElementBlock(
                                                'div',
                                                {
                                                  key: 0,
                                                  class: _normalizeClass(
                                                    $setup.ns.e('thumbnail-box')
                                                  )
                                                },
                                                [
                                                  file.url
                                                    ? (_openBlock(),
                                                      _createElementBlock(
                                                        'img',
                                                        {
                                                          key: 0,
                                                          src: file.url,
                                                          class: _normalizeClass(
                                                            $setup.ns.e('thumbnail-img')
                                                          ),
                                                          crossorigin: _ctx.crossorigin
                                                        },
                                                        null,
                                                        10,
                                                        _hoisted_7
                                                      ))
                                                    : (_openBlock(),
                                                      _createBlock(
                                                        $setup['YhIcon'],
                                                        {
                                                          key: 1,
                                                          name: 'image',
                                                          size: 24,
                                                          class: _normalizeClass(
                                                            $setup.ns.e('thumbnail-icon')
                                                          )
                                                        },
                                                        null,
                                                        8,
                                                        ['class']
                                                      ))
                                                ],
                                                2
                                                /* CLASS */
                                              ))
                                            : _createCommentVNode('v-if', true),
                                          _renderSlot(_ctx.$slots, 'file-icon', { file }, () => [
                                            _createVNode(
                                              $setup['YhIcon'],
                                              {
                                                name: $setup.getFileIcon(file),
                                                size: 20,
                                                class: _normalizeClass($setup.ns.e('file-icon'))
                                              },
                                              null,
                                              8,
                                              ['name', 'class']
                                            )
                                          ]),
                                          _createElementVNode(
                                            'div',
                                            {
                                              class: _normalizeClass($setup.ns.e('details'))
                                            },
                                            [
                                              _createElementVNode(
                                                'div',
                                                {
                                                  class: _normalizeClass($setup.ns.e('name')),
                                                  onClick: ($event) => $setup.handlePreview(file)
                                                },
                                                _toDisplayString(file.name),
                                                11,
                                                _hoisted_8
                                              )
                                            ],
                                            2
                                            /* CLASS */
                                          ),
                                          _createElementVNode(
                                            'div',
                                            {
                                              class: _normalizeClass(
                                                $setup.ns.e('status-icon-wrapper')
                                              )
                                            },
                                            [
                                              file.status === 'success'
                                                ? (_openBlock(),
                                                  _createBlock(
                                                    $setup['YhIcon'],
                                                    {
                                                      key: 0,
                                                      name: 'check',
                                                      size: 14,
                                                      class: _normalizeClass(
                                                        $setup.ns.e('status-icon')
                                                      ),
                                                      color: 'var(--yh-color-success)'
                                                    },
                                                    null,
                                                    8,
                                                    ['class']
                                                  ))
                                                : _createCommentVNode('v-if', true),
                                              file.status === 'fail'
                                                ? (_openBlock(),
                                                  _createBlock(
                                                    $setup['YhIcon'],
                                                    {
                                                      key: 1,
                                                      name: 'error',
                                                      size: 14,
                                                      class: _normalizeClass(
                                                        $setup.ns.e('status-icon')
                                                      ),
                                                      color: 'var(--yh-color-danger)'
                                                    },
                                                    null,
                                                    8,
                                                    ['class']
                                                  ))
                                                : _createCommentVNode('v-if', true),
                                              !_ctx.disabled
                                                ? (_openBlock(),
                                                  _createElementBlock(
                                                    'div',
                                                    {
                                                      key: 2,
                                                      class: _normalizeClass(
                                                        $setup.ns.e('actions-inline')
                                                      )
                                                    },
                                                    [
                                                      _ctx.showDownload
                                                        ? (_openBlock(),
                                                          _createBlock(
                                                            $setup['YhIcon'],
                                                            {
                                                              key: 0,
                                                              name: 'download',
                                                              size: 16,
                                                              class: _normalizeClass(
                                                                $setup.ns.e('download-btn')
                                                              ),
                                                              onClick: _withModifiers(
                                                                ($event) =>
                                                                  $setup.handleDownload(file),
                                                                ['stop']
                                                              )
                                                            },
                                                            null,
                                                            8,
                                                            ['class', 'onClick']
                                                          ))
                                                        : _createCommentVNode('v-if', true),
                                                      file.status === 'fail'
                                                        ? (_openBlock(),
                                                          _createBlock(
                                                            $setup['YhIcon'],
                                                            {
                                                              key: 1,
                                                              name: 'refresh',
                                                              size: 16,
                                                              class: _normalizeClass(
                                                                $setup.ns.e('retry-btn')
                                                              ),
                                                              onClick: _withModifiers(
                                                                ($event) =>
                                                                  $setup.startUpload(file),
                                                                ['stop']
                                                              )
                                                            },
                                                            null,
                                                            8,
                                                            ['class', 'onClick']
                                                          ))
                                                        : _createCommentVNode('v-if', true),
                                                      _createVNode(
                                                        $setup['YhIcon'],
                                                        {
                                                          name: 'delete',
                                                          size: 16,
                                                          class: _normalizeClass(
                                                            $setup.ns.e('delete-btn')
                                                          ),
                                                          onClick: _withModifiers(
                                                            ($event) => $setup.handleRemove(file),
                                                            ['stop']
                                                          )
                                                        },
                                                        null,
                                                        8,
                                                        ['class', 'onClick']
                                                      )
                                                    ],
                                                    2
                                                    /* CLASS */
                                                  ))
                                                : _createCommentVNode('v-if', true)
                                            ],
                                            2
                                            /* CLASS */
                                          ),
                                          _createCommentVNode(
                                            ' Full width bottom progress for non-card modes '
                                          ),
                                          file.status === 'uploading'
                                            ? (_openBlock(),
                                              _createElementBlock(
                                                'div',
                                                {
                                                  key: 1,
                                                  class: _normalizeClass(
                                                    $setup.ns.e('bottom-progress')
                                                  )
                                                },
                                                [
                                                  _createElementVNode(
                                                    'div',
                                                    {
                                                      class: _normalizeClass(
                                                        $setup.ns.e('bottom-progress-bar')
                                                      ),
                                                      style: _normalizeStyle({
                                                        width: (file.percentage || 0) + '%'
                                                      })
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
                                        2
                                        /* CLASS */
                                      )
                                    ],
                                    64
                                    /* STABLE_FRAGMENT */
                                  ))
                            ])
                          ],
                          2
                          /* CLASS */
                        )
                      )
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ]),
                _: 3
                /* FORWARDED */
              },
              8,
              ['class']
            ))
          : _createCommentVNode('v-if', true)
      ],
      6
      /* CLASS, STYLE */
    )
  )
}
import { ref, onBeforeUnmount, computed } from 'vue'
import { uploadProps, uploadEmits } from './upload'
import { useLocale } from '../../../hooks/index.js'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { useComponentTheme } from '../../../theme/component-theme.js'
import { YhIcon } from '../../icon'
import Viewer from '../../viewerjs'
import 'viewerjs/dist/viewer.css'
const __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhUpload'
  },
  {
    __name: 'upload',
    props: uploadProps,
    emits: uploadEmits,
    setup(__props, { expose: __expose, emit: __emit }) {
      const props = __props
      const emit = __emit
      const ns = useNamespace('upload')
      const { t } = useLocale()
      const { themeStyle } = useComponentTheme(
        'upload',
        computed(() => props.themeOverrides)
      )
      const inputRef = ref(null)
      const dragOver = ref(false)
      let viewer = null
      const triggerInput = () => {
        var _a
        if (props.disabled) return
        if (inputRef.value) {
          inputRef.value.value = ''
        }
        ;(_a = inputRef.value) == null ? void 0 : _a.click()
      }
      const getFileIcon = (file) => {
        var _a
        if (props.fileIcon) {
          if (typeof props.fileIcon === 'function') {
            return props.fileIcon(file)
          }
          return props.fileIcon
        }
        const fileName = file.name
        const ext = ((_a = fileName.split('.').pop()) == null ? void 0 : _a.toLowerCase()) || ''
        const map = {
          // 图片
          jpg: 'image',
          jpeg: 'image',
          png: 'image',
          gif: 'image',
          webp: 'image',
          svg: 'image',
          // 文档
          pdf: 'file-pdf',
          doc: 'file-word',
          docx: 'file-word',
          xls: 'file-excel',
          xlsx: 'file-excel',
          ppt: 'file-word',
          pptx: 'file-word',
          txt: 'file-txt',
          // 媒体
          mp4: 'file-video',
          mkv: 'file-video',
          avi: 'file-video',
          mov: 'file-video',
          mp3: 'file-audio',
          wav: 'file-audio',
          flac: 'file-audio'
        }
        return map[ext] || 'attachment'
      }
      const onInputChange = (e) => {
        if (props.disabled) return
        const files = e.target.files
        if (!files) return
        handleFiles(Array.from(files))
      }
      const onDragOver = () => {
        if (props.disabled || !props.drag) return
        dragOver.value = true
      }
      const onDrop = async (e) => {
        var _a, _b, _c
        if (props.disabled || !props.drag) return
        dragOver.value = false
        const items = (_a = e.dataTransfer) == null ? void 0 : _a.items
        if (!items) return
        const files = []
        const readEntry = async (entry, path = '') => {
          if (entry.isFile) {
            const fileEntry = entry
            const file = await new Promise((resolve) => fileEntry.file(resolve))
            if (path) {
              Object.defineProperty(file, 'webkitRelativePath', {
                value: `${path}${file.name}`,
                configurable: true
              })
            }
            files.push(file)
          } else if (entry.isDirectory) {
            const dirEntry = entry
            const reader = dirEntry.createReader()
            const entries = await new Promise((resolve) => reader.readEntries(resolve))
            for (const subEntry of entries) {
              await readEntry(subEntry, `${path}${entry.name}/`)
            }
          }
        }
        const entriesToRead = []
        for (const item of Array.from(items)) {
          const entry = (_b = item.webkitGetAsEntry) == null ? void 0 : _b.call(item)
          if (entry) {
            entriesToRead.push(readEntry(entry))
          }
        }
        if (entriesToRead.length > 0) {
          await Promise.all(entriesToRead)
          handleFiles(files)
        } else {
          const rawFiles = (_c = e.dataTransfer) == null ? void 0 : _c.files
          if (rawFiles) handleFiles(Array.from(rawFiles))
        }
      }
      const attrAccept = (file, accept) => {
        if (!accept) return true
        const acceptList = accept.split(',').map((item) => item.trim())
        if (acceptList.length === 0) return true
        const fileName = file.name
        const type = file.type
        return acceptList.some((item) => {
          if (item.startsWith('.')) {
            return fileName.toLowerCase().endsWith(item.toLowerCase())
          } else if (item.endsWith('/*')) {
            const baseType = item.replace('/*', '')
            return type.startsWith(baseType)
          }
          return type === item
        })
      }
      const handleFiles = async (files) => {
        if (props.limit && props.fileList.length + files.length > props.limit) {
          emit('exceed', files, props.fileList)
          return
        }
        const validFiles = []
        for (const file of files) {
          const rawFile = file
          if (props.accept && !attrAccept(rawFile, props.accept)) {
            console.warn(
              `[YhUpload] Auto Remove: File format does not match "${props.accept}" - ${rawFile.name}`
            )
            continue
          }
          if (props.maxSize && rawFile.size / 1024 > props.maxSize) {
            console.warn(`[YhUpload] Auto Remove: File size exceeds limit - ${rawFile.name}`)
            continue
          }
          if (props.beforeUpload) {
            try {
              const result = await props.beforeUpload(rawFile)
              if (result === false) continue
              if (result instanceof Blob) {
                const newRawFile = result
                if (!newRawFile.uid) newRawFile.uid = Date.now() + Math.random()
                Object.assign(rawFile, newRawFile)
              }
            } catch (e) {
              continue
            }
          }
          if (!rawFile.uid) rawFile.uid = Date.now() + Math.random()
          const uploadFile = {
            name:
              props.directory && rawFile.webkitRelativePath
                ? rawFile.webkitRelativePath
                : rawFile.name,
            percentage: 0,
            status: 'ready',
            size: rawFile.size,
            uid: rawFile.uid,
            raw: rawFile
          }
          if (props.listType.includes('picture')) {
            if (props.thumbnailRequest) {
              uploadFile.url = await props.thumbnailRequest(rawFile)
            } else if (rawFile.type && rawFile.type.startsWith('image/')) {
              uploadFile.url = URL.createObjectURL(rawFile)
            }
          }
          validFiles.push(uploadFile)
        }
        if (validFiles.length > 0) {
          const newFileList = [...props.fileList, ...validFiles]
          emit('update:fileList', newFileList)
          validFiles.forEach((file) => {
            emit('change', file, newFileList)
            if (props.autoUpload) {
              startUpload(file)
            }
          })
        }
      }
      const startUpload = async (file) => {
        file.status = 'uploading'
        const options = {
          action: props.action,
          method: props.method,
          file: file.raw,
          filename: props.name,
          name: file.name,
          data: props.data,
          headers: props.headers,
          withCredentials: props.withCredentials,
          onProgress: (evt) => {
            file.percentage = evt.percent
            emit('progress', evt, file, props.fileList)
          },
          onSuccess: (res) => {
            file.status = 'success'
            file.response = res
            emit('success', res, file, props.fileList)
          },
          onError: (err) => {
            file.status = 'fail'
            file.error = err
            emit('error', err, file, props.fileList)
          }
        }
        if (props.httpRequest) {
          props.httpRequest(options)
          return
        }
        ajaxUpload(options)
      }
      const ajaxUpload = (options) => {
        const xhr = new XMLHttpRequest()
        const formData = new FormData()
        if (options.data) {
          Object.keys(options.data).forEach((key) => {
            formData.append(key, options.data[key])
          })
        }
        formData.append(options.filename, options.file, options.name)
        xhr.upload.onprogress = (e) => {
          if (e.total > 0) {
            const percent = Math.round((e.loaded / e.total) * 100)
            options.onProgress(__spreadProps(__spreadValues({}, e), { percent }))
          }
        }
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            let response = xhr.responseText
            try {
              response = JSON.parse(response)
            } catch (e) {}
            options.onSuccess(response)
          } else {
            options.onError(new Error(`Upload failed with status ${xhr.status}`))
          }
        }
        xhr.onerror = () => {
          options.onError(new Error('Network Error'))
        }
        xhr.open(options.method, options.action, true)
        if (options.withCredentials) {
          xhr.withCredentials = true
        }
        if (options.headers) {
          Object.keys(options.headers).forEach((key) => {
            xhr.setRequestHeader(key, options.headers[key])
          })
        }
        xhr.send(formData)
      }
      const handleRemove = async (file) => {
        if (props.disabled) return
        if (props.beforeRemove) {
          const result = await props.beforeRemove(file, props.fileList)
          if (result === false) return
        }
        const newFileList = props.fileList.filter((f) => f.uid !== file.uid)
        emit('update:fileList', newFileList)
        emit('remove', file, newFileList)
        if (file.url && file.url.startsWith('blob:')) {
          URL.revokeObjectURL(file.url)
        }
      }
      const handlePreview = (file) => {
        emit('preview', file)
        const isImage =
          file.url &&
          (file.url.startsWith('blob:') ||
            file.url.startsWith('data:') ||
            /\.(jpg|jpeg|png|gif|webp|bmp)$/i.test(file.name))
        if (isImage) {
          const images = props.fileList
            .filter(
              (f) =>
                f.url &&
                (f.url.startsWith('blob:') ||
                  f.url.startsWith('data:') ||
                  /\.(jpg|jpeg|png|gif|webp|bmp)$/i.test(f.name))
            )
            .map((f) => f.url)
          if (images.length === 0) return
          const container = document.createElement('div')
          const imgList = images.map((src) => `<img src="${src}" style="display:none">`).join('')
          container.innerHTML = imgList
          const initialIndex = images.indexOf(file.url)
          if (viewer) viewer.destroy()
          const nextViewer = new Viewer(container, {
            hidden: () => {
              viewer == null ? void 0 : viewer.destroy()
              viewer = null
            },
            navbar: images.length > 1,
            toolbar: {
              zoomIn: 4,
              zoomOut: 4,
              oneToOne: 4,
              reset: 4,
              prev: images.length > 1 ? 4 : 0,
              play: {
                show: 4,
                size: 'large'
              },
              next: images.length > 1 ? 4 : 0,
              rotateLeft: 4,
              rotateRight: 4,
              flipHorizontal: 4,
              flipVertical: 4
            }
          })
          viewer = nextViewer
          nextViewer.view(initialIndex !== -1 ? initialIndex : 0)
          nextViewer.show()
        }
      }
      const handleDownload = async (file) => {
        emit('download', file)
        if (!file.url) return
        if (file.url.startsWith('blob:') || file.url.startsWith('data:')) {
          const link = document.createElement('a')
          link.href = file.url
          link.download = file.name || 'download'
          link.click()
          return
        }
        try {
          const response = await fetch(file.url, {
            method: 'GET',
            mode: 'cors'
            // 必须开启 CORS 模式
          })
          if (!response.ok) throw new Error('Network response was not ok')
          const blob = await response.blob()
          const blobUrl = URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = blobUrl
          link.download = file.name || 'download'
          link.style.display = 'none'
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          setTimeout(() => URL.revokeObjectURL(blobUrl), 1e3)
        } catch (err) {
          console.warn('[YhUpload] CORS download restricted, falling back to preview mode', err)
          const link = document.createElement('a')
          link.href = file.url
          link.target = '_blank'
          link.download = file.name || 'download'
          link.click()
        }
      }
      onBeforeUnmount(() => {
        if (viewer) {
          viewer.destroy()
          viewer = null
        }
      })
      __expose({
        triggerInput,
        handleRemove,
        handlePreview,
        handleDownload,
        handleFiles,
        submit: () => {
          props.fileList.filter((f) => f.status === 'ready').forEach(startUpload)
        }
      })
      const __returned__ = {
        props,
        emit,
        ns,
        t,
        themeStyle,
        inputRef,
        dragOver,
        get viewer() {
          return viewer
        },
        set viewer(v) {
          viewer = v
        },
        triggerInput,
        getFileIcon,
        onInputChange,
        onDragOver,
        onDrop,
        attrAccept,
        handleFiles,
        startUpload,
        ajaxUpload,
        handleRemove,
        handlePreview,
        handleDownload,
        ref,
        onBeforeUnmount,
        computed,
        get uploadProps() {
          return uploadProps
        },
        get uploadEmits() {
          return uploadEmits
        },
        get useNamespace() {
          return useNamespace
        },
        get useLocale() {
          return useLocale
        },
        get useComponentTheme() {
          return useComponentTheme
        },
        get YhIcon() {
          return YhIcon
        },
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
