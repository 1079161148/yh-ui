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
  createVNode as _createVNode,
  normalizeClass as _normalizeClass,
  createElementVNode as _createElementVNode,
  toDisplayString as _toDisplayString,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  createCommentVNode as _createCommentVNode,
  normalizeProps as _normalizeProps,
  guardReactiveProps as _guardReactiveProps,
  renderSlot as _renderSlot,
  mergeProps as _mergeProps,
  withCtx as _withCtx,
  renderList as _renderList,
  createSlots as _createSlots,
  Fragment as _Fragment,
  withModifiers as _withModifiers,
  createBlock as _createBlock,
  normalizeStyle as _normalizeStyle,
  Transition as _Transition,
  Teleport as _Teleport
} from 'vue'
const _hoisted_1 = ['onClick']
const _hoisted_2 = ['onClick']
const _hoisted_3 = ['onClick']
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      'div',
      {
        class: _normalizeClass($setup.ns.b()),
        style: _normalizeStyle($setup.themeStyle)
      },
      [
        _createVNode(
          $setup['YhMention'],
          _mergeProps({ ref: 'mentionRef' }, _ctx.$attrs, {
            'model-value': _ctx.modelValue,
            options: $setup.filteredOptions,
            triggers: _ctx.triggers,
            type: _ctx.type,
            placeholder: _ctx.placeholder || $setup.t('ai.mention.placeholder'),
            disabled: _ctx.disabled,
            size: _ctx.size,
            loading: _ctx.loading || $setup.fileTreeLoading,
            'filter-option': _ctx.filterOption,
            maxlength: _ctx.maxLength,
            rows: _ctx.rows,
            'onUpdate:modelValue': $setup.handleUpdateValue,
            onSelect: $setup.handleSelect,
            onSearch: $setup.handleSearch,
            onFocus: _cache[0] || (_cache[0] = ($event) => $setup.emit('focus', $event)),
            onBlur: _cache[1] || (_cache[1] = ($event) => $setup.emit('blur', $event)),
            onInput: _cache[2] || (_cache[2] = ($event) => $setup.emit('input', $event)),
            onKeydown: _cache[3] || (_cache[3] = ($event) => $setup.emit('keydown', $event))
          }),
          _createSlots(
            {
              option: _withCtx(({ option }) => [
                _createElementVNode(
                  'div',
                  {
                    class: _normalizeClass($setup.ns.e('option-item'))
                  },
                  [
                    _createElementVNode(
                      'div',
                      {
                        class: _normalizeClass([
                          $setup.ns.e('option-icon'),
                          $setup.asAiMentionOption(option).type
                            ? $setup.ns.em('option-icon', $setup.asAiMentionOption(option).type)
                            : ''
                        ])
                      },
                      [
                        _createVNode(
                          $setup['YhIcon'],
                          {
                            name:
                              $setup.asAiMentionOption(option).icon ||
                              $setup.getOptionIcon($setup.asAiMentionOption(option).type)
                          },
                          null,
                          8,
                          ['name']
                        )
                      ],
                      2
                      /* CLASS */
                    ),
                    _createElementVNode(
                      'div',
                      {
                        class: _normalizeClass($setup.ns.e('option-info'))
                      },
                      [
                        _createElementVNode(
                          'div',
                          {
                            class: _normalizeClass($setup.ns.e('option-label'))
                          },
                          _toDisplayString(
                            $setup.asAiMentionOption(option).label ||
                              $setup.asAiMentionOption(option).value
                          ),
                          3
                          /* TEXT, CLASS */
                        ),
                        $setup.asAiMentionOption(option).description
                          ? (_openBlock(),
                            _createElementBlock(
                              'div',
                              {
                                key: 0,
                                class: _normalizeClass($setup.ns.e('option-desc'))
                              },
                              _toDisplayString($setup.asAiMentionOption(option).description),
                              3
                              /* TEXT, CLASS */
                            ))
                          : _createCommentVNode('v-if', true)
                      ],
                      2
                      /* CLASS */
                    ),
                    $setup.asAiMentionOption(option).type
                      ? (_openBlock(),
                        _createElementBlock(
                          'div',
                          {
                            key: 0,
                            class: _normalizeClass([
                              $setup.ns.e('option-tag'),
                              $setup.ns.em('option-tag', $setup.asAiMentionOption(option).type)
                            ])
                          },
                          _toDisplayString(
                            $setup.t(`ai.mention.${$setup.asAiMentionOption(option).type}`) ||
                              $setup.asAiMentionOption(option).type
                          ),
                          3
                          /* TEXT, CLASS */
                        ))
                      : _createCommentVNode('v-if', true)
                  ],
                  2
                  /* CLASS */
                )
              ]),
              _: 2
              /* DYNAMIC */
            },
            [
              _renderList($setup.forwardedSlotNames, (name) => {
                return {
                  name,
                  fn: _withCtx((slotProps) => [
                    _renderSlot(_ctx.$slots, name, _normalizeProps(_guardReactiveProps(slotProps)))
                  ])
                }
              })
            ]
          ),
          1040,
          [
            'model-value',
            'options',
            'triggers',
            'type',
            'placeholder',
            'disabled',
            'size',
            'loading',
            'filter-option',
            'maxlength',
            'rows'
          ]
        ),
        _createCommentVNode(' \u6587\u4EF6\u6811\u9762\u677F '),
        (_openBlock(),
        _createBlock(_Teleport, { to: 'body' }, [
          _createVNode(
            _Transition,
            { name: 'yh-fade-in-scale-up' },
            {
              default: _withCtx(() => [
                $setup.showFileTree
                  ? (_openBlock(),
                    _createElementBlock(
                      'div',
                      {
                        key: 0,
                        class: _normalizeClass($setup.ns.e('file-tree-panel')),
                        style: _normalizeStyle($setup.fileTreePanelStyle)
                      },
                      [
                        _createElementVNode(
                          'div',
                          {
                            class: _normalizeClass($setup.ns.e('file-tree-header'))
                          },
                          [
                            _createVNode(
                              $setup['YhIcon'],
                              {
                                name: $setup.getTypeIcon($setup.currentFileType)
                              },
                              null,
                              8,
                              ['name']
                            ),
                            _createElementVNode(
                              'span',
                              null,
                              _toDisplayString($setup.getTypeLabel($setup.currentFileType)),
                              1
                              /* TEXT */
                            ),
                            _createElementVNode(
                              'span',
                              {
                                class: _normalizeClass($setup.ns.e('file-tree-count'))
                              },
                              _toDisplayString($setup.fileTreeData.length),
                              3
                              /* TEXT, CLASS */
                            )
                          ],
                          2
                          /* CLASS */
                        ),
                        _createElementVNode(
                          'div',
                          {
                            class: _normalizeClass($setup.ns.e('file-tree-content'))
                          },
                          [
                            _createElementVNode(
                              'div',
                              {
                                class: _normalizeClass($setup.ns.e('file-tree-list'))
                              },
                              [
                                (_openBlock(true),
                                _createElementBlock(
                                  _Fragment,
                                  null,
                                  _renderList($setup.fileTreeData, (node) => {
                                    return (
                                      _openBlock(),
                                      _createElementBlock(
                                        _Fragment,
                                        {
                                          key: node.key
                                        },
                                        [
                                          _createElementVNode(
                                            'div',
                                            {
                                              class: _normalizeClass([
                                                $setup.ns.e('file-tree-node'),
                                                $setup.ns.is('folder', node.isFolder),
                                                $setup.ns.is(
                                                  'expanded',
                                                  $setup.isFolderExpanded(node.key)
                                                )
                                              ]),
                                              onClick: ($event) => $setup.handleFileSelect(node)
                                            },
                                            [
                                              node.isFolder
                                                ? (_openBlock(),
                                                  _createElementBlock(
                                                    'span',
                                                    {
                                                      key: 0,
                                                      class: _normalizeClass(
                                                        $setup.ns.e('folder-toggle')
                                                      ),
                                                      onClick: _withModifiers(
                                                        ($event) => $setup.toggleFolder(node.key),
                                                        ['stop']
                                                      )
                                                    },
                                                    [
                                                      _createVNode(
                                                        $setup['YhIcon'],
                                                        {
                                                          name: $setup.isFolderExpanded(node.key)
                                                            ? 'chevron-down'
                                                            : 'chevron-right'
                                                        },
                                                        null,
                                                        8,
                                                        ['name']
                                                      )
                                                    ],
                                                    10,
                                                    _hoisted_2
                                                  ))
                                                : (_openBlock(),
                                                  _createElementBlock(
                                                    'span',
                                                    {
                                                      key: 1,
                                                      class: _normalizeClass(
                                                        $setup.ns.e('file-tree-indent')
                                                      )
                                                    },
                                                    null,
                                                    2
                                                    /* CLASS */
                                                  )),
                                              _ctx.showFileIcon
                                                ? (_openBlock(),
                                                  _createBlock(
                                                    $setup['YhIcon'],
                                                    {
                                                      key: 2,
                                                      name: $setup.getFileIcon(node),
                                                      class: _normalizeClass(
                                                        $setup.ns.e('file-tree-icon')
                                                      )
                                                    },
                                                    null,
                                                    8,
                                                    ['name', 'class']
                                                  ))
                                                : _createCommentVNode('v-if', true),
                                              _createElementVNode(
                                                'span',
                                                {
                                                  class: _normalizeClass(
                                                    $setup.ns.e('file-tree-label')
                                                  )
                                                },
                                                _toDisplayString(node.label),
                                                3
                                                /* TEXT, CLASS */
                                              ),
                                              _ctx.showFileSize && !node.isFolder
                                                ? (_openBlock(),
                                                  _createElementBlock(
                                                    'span',
                                                    {
                                                      key: 3,
                                                      class: _normalizeClass(
                                                        $setup.ns.e('file-tree-size')
                                                      )
                                                    },
                                                    _toDisplayString(
                                                      $setup.formatFileSizeFn(node.size)
                                                    ),
                                                    3
                                                    /* TEXT, CLASS */
                                                  ))
                                                : _createCommentVNode('v-if', true),
                                              _ctx.showModifiedTime && !node.isFolder
                                                ? (_openBlock(),
                                                  _createElementBlock(
                                                    'span',
                                                    {
                                                      key: 4,
                                                      class: _normalizeClass(
                                                        $setup.ns.e('file-tree-time')
                                                      )
                                                    },
                                                    _toDisplayString(
                                                      $setup.formatTimeFn(node.modifiedAt)
                                                    ),
                                                    3
                                                    /* TEXT, CLASS */
                                                  ))
                                                : _createCommentVNode('v-if', true)
                                            ],
                                            10,
                                            _hoisted_1
                                          ),
                                          node.isFolder &&
                                          node.children &&
                                          $setup.isFolderExpanded(node.key)
                                            ? (_openBlock(true),
                                              _createElementBlock(
                                                _Fragment,
                                                { key: 0 },
                                                _renderList(node.children, (child) => {
                                                  return (
                                                    _openBlock(),
                                                    _createElementBlock(
                                                      'div',
                                                      {
                                                        key: child.key,
                                                        class: _normalizeClass([
                                                          $setup.ns.e('file-tree-node'),
                                                          $setup.ns.e('file-tree-child'),
                                                          $setup.ns.is('folder', child.isFolder)
                                                        ]),
                                                        onClick: ($event) =>
                                                          $setup.handleFileSelect(child)
                                                      },
                                                      [
                                                        _createElementVNode(
                                                          'span',
                                                          {
                                                            class: _normalizeClass(
                                                              $setup.ns.e('file-tree-indent')
                                                            )
                                                          },
                                                          null,
                                                          2
                                                          /* CLASS */
                                                        ),
                                                        _createElementVNode(
                                                          'span',
                                                          {
                                                            class: _normalizeClass(
                                                              $setup.ns.e('file-tree-indent')
                                                            )
                                                          },
                                                          null,
                                                          2
                                                          /* CLASS */
                                                        ),
                                                        _ctx.showFileIcon
                                                          ? (_openBlock(),
                                                            _createBlock(
                                                              $setup['YhIcon'],
                                                              {
                                                                key: 0,
                                                                name: $setup.getFileIcon(child),
                                                                class: _normalizeClass(
                                                                  $setup.ns.e('file-tree-icon')
                                                                )
                                                              },
                                                              null,
                                                              8,
                                                              ['name', 'class']
                                                            ))
                                                          : _createCommentVNode('v-if', true),
                                                        _createElementVNode(
                                                          'span',
                                                          {
                                                            class: _normalizeClass(
                                                              $setup.ns.e('file-tree-label')
                                                            )
                                                          },
                                                          _toDisplayString(child.label),
                                                          3
                                                          /* TEXT, CLASS */
                                                        ),
                                                        _ctx.showFileSize && !child.isFolder
                                                          ? (_openBlock(),
                                                            _createElementBlock(
                                                              'span',
                                                              {
                                                                key: 1,
                                                                class: _normalizeClass(
                                                                  $setup.ns.e('file-tree-size')
                                                                )
                                                              },
                                                              _toDisplayString(
                                                                $setup.formatFileSizeFn(child.size)
                                                              ),
                                                              3
                                                              /* TEXT, CLASS */
                                                            ))
                                                          : _createCommentVNode('v-if', true),
                                                        _ctx.showModifiedTime && !child.isFolder
                                                          ? (_openBlock(),
                                                            _createElementBlock(
                                                              'span',
                                                              {
                                                                key: 2,
                                                                class: _normalizeClass(
                                                                  $setup.ns.e('file-tree-time')
                                                                )
                                                              },
                                                              _toDisplayString(
                                                                $setup.formatTimeFn(
                                                                  child.modifiedAt
                                                                )
                                                              ),
                                                              3
                                                              /* TEXT, CLASS */
                                                            ))
                                                          : _createCommentVNode('v-if', true)
                                                      ],
                                                      10,
                                                      _hoisted_3
                                                    )
                                                  )
                                                }),
                                                128
                                                /* KEYED_FRAGMENT */
                                              ))
                                            : _createCommentVNode('v-if', true)
                                        ],
                                        64
                                        /* STABLE_FRAGMENT */
                                      )
                                    )
                                  }),
                                  128
                                  /* KEYED_FRAGMENT */
                                )),
                                $setup.fileTreeData.length === 0 && !$setup.fileTreeLoading
                                  ? (_openBlock(),
                                    _createElementBlock(
                                      'div',
                                      {
                                        key: 0,
                                        class: _normalizeClass($setup.ns.e('file-tree-empty'))
                                      },
                                      [
                                        _createVNode($setup['YhIcon'], { name: 'folder-opened' }),
                                        _createElementVNode(
                                          'span',
                                          null,
                                          _toDisplayString($setup.t('ai.mention.noFiles')),
                                          1
                                          /* TEXT */
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
                          2
                          /* CLASS */
                        )
                      ],
                      6
                      /* CLASS, STYLE */
                    ))
                  : _createCommentVNode('v-if', true)
              ]),
              _: 1
              /* STABLE */
            }
          )
        ]))
      ],
      6
      /* CLASS, STYLE */
    )
  )
}
import { useLocale } from '../../../hooks/index.js'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { computed, ref, useSlots } from 'vue'
import { aiMentionProps, aiMentionEmits } from './ai-mention-meta.js'
import { YhMention } from '../../mention.js'
import { YhIcon } from '../../icon.js'
import { useComponentTheme } from '../../../theme/component-theme.js'
const __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhAiMention'
  },
  {
    __name: 'ai-mention',
    props: aiMentionProps,
    emits: aiMentionEmits,
    setup(__props, { expose: __expose, emit: __emit }) {
      const props = __props
      const emit = __emit
      const slots = useSlots()
      const forwardedSlotNames = computed(() => Object.keys(slots))
      const ns = useNamespace('ai-mention')
      const { t } = useLocale()
      const { themeStyle } = useComponentTheme('ai-mention', props.themeOverrides)
      const mentionRef = ref(null)
      const fileTreeData = ref([])
      const fileTreeLoading = ref(false)
      const expandedFolders = ref(/* @__PURE__ */ new Set())
      const currentFileType = ref(null)
      let searchDebounceTimer = null
      const filteredOptions = computed(() => {
        if (!props.types || props.types.length === 0) return props.options
        return props.options.filter((option) => !option.type || props.types.includes(option.type))
      })
      const handleUpdateValue = (val) => {
        emit('update:modelValue', val)
      }
      const handleSelect = (option, trigger) => {
        emit('select', option, trigger)
      }
      const getTypeIcon = (type) => {
        const iconMap = {
          document: 'document',
          table: 'grid',
          file: 'folder',
          knowledge: 'book'
        }
        return iconMap[type] || 'document'
      }
      const getTypeLabel = (type) => {
        const labelMap = {
          document: '\u6587\u6863',
          table: '\u8868\u683C',
          file: '\u6587\u4EF6',
          knowledge: '\u77E5\u8BC6\u5E93'
        }
        return labelMap[type] || type
      }
      const getOptionIcon = (type) => {
        switch (type) {
          case 'agent':
            return 'robot'
          case 'document':
            return 'document'
          case 'table':
            return 'table'
          case 'knowledge':
            return 'book'
          case 'file':
            return 'folder'
          default:
            return 'sparkles'
        }
      }
      const asAiMentionOption = (option) => option
      const fileTreePanelStyle = computed(() => ({
        position: 'fixed',
        top: '200px',
        left: '100px',
        width: '320px',
        maxHeight: '400px',
        zIndex: 9999
      }))
      const loadFileTree = async (type, keyword = '') => {
        if (!props.enableFileTree) return
        fileTreeLoading.value = true
        currentFileType.value = type
        try {
          let nodes = []
          if (props.fileLoader) {
            nodes = await props.fileLoader(keyword, type)
          } else {
            nodes = generateMockFileTree(type, keyword)
          }
          fileTreeData.value = nodes
          emit('file-load', type, nodes)
          if (props.fileTreeExpandedLevel > 0) {
            nodes.forEach((node) => {
              var _a
              if (node.isFolder && ((_a = node.children) == null ? void 0 : _a.length)) {
                expandedFolders.value.add(node.key)
              }
            })
          }
        } catch (error) {
          console.error('Failed to load file tree:', error)
          fileTreeData.value = []
        } finally {
          fileTreeLoading.value = false
        }
      }
      const generateMockFileTree = (type, keyword) => {
        const mockData = {
          document: [
            {
              key: 'docs',
              label: '\u6587\u6863',
              isFolder: true,
              path: '/docs',
              children: [
                {
                  key: 'docs/readme',
                  label: 'README.md',
                  isFolder: false,
                  path: '/docs/README.md',
                  size: 2048,
                  modifiedAt: Date.now() - 864e5
                },
                {
                  key: 'docs/guide',
                  label: '\u4F7F\u7528\u6307\u5357.md',
                  isFolder: false,
                  path: '/docs/guide.md',
                  size: 5120,
                  modifiedAt: Date.now() - 1728e5
                },
                {
                  key: 'docs/api',
                  label: 'API \u6587\u6863.md',
                  isFolder: false,
                  path: '/docs/api.md',
                  size: 10240,
                  modifiedAt: Date.now() - 2592e5
                }
              ]
            },
            {
              key: 'contracts',
              label: '\u5408\u540C',
              isFolder: true,
              path: '/contracts',
              children: [
                {
                  key: 'contracts/2024',
                  label: '2024\u5408\u540C',
                  isFolder: true,
                  path: '/contracts/2024',
                  children: [
                    {
                      key: 'contracts/2024/a',
                      label: '\u5408\u540CA.pdf',
                      isFolder: false,
                      path: '/contracts/2024/a.pdf',
                      size: 1048576,
                      modifiedAt: Date.now() - 3456e5
                    }
                  ]
                }
              ]
            },
            {
              key: 'notes',
              label: '\u7B14\u8BB0.txt',
              isFolder: false,
              path: '/notes.txt',
              size: 1024,
              modifiedAt: Date.now()
            }
          ],
          table: [
            {
              key: 'excel',
              label: 'Excel \u6587\u4EF6',
              isFolder: true,
              path: '/excel',
              children: [
                {
                  key: 'excel/sales',
                  label: '\u9500\u552E\u62A5\u8868.xlsx',
                  isFolder: false,
                  path: '/excel/sales.xlsx',
                  size: 524288,
                  modifiedAt: Date.now() - 864e5
                },
                {
                  key: 'excel/inventory',
                  label: '\u5E93\u5B58\u8868.xlsx',
                  isFolder: false,
                  path: '/excel/inventory.xlsx',
                  size: 262144,
                  modifiedAt: Date.now() - 1728e5
                }
              ]
            },
            {
              key: 'csv',
              label: 'CSV \u6570\u636E',
              isFolder: true,
              path: '/csv',
              children: [
                {
                  key: 'csv/users',
                  label: '\u7528\u6237\u6570\u636E.csv',
                  isFolder: false,
                  path: '/csv/users.csv',
                  size: 4096,
                  modifiedAt: Date.now()
                }
              ]
            }
          ],
          knowledge: [
            {
              key: 'kb',
              label: '\u77E5\u8BC6\u5E93',
              isFolder: true,
              path: '/knowledge',
              children: [
                {
                  key: 'kb/faq',
                  label: '\u5E38\u89C1\u95EE\u9898',
                  isFolder: false,
                  path: '/knowledge/faq',
                  size: 8192,
                  modifiedAt: Date.now() - 2592e5
                },
                {
                  key: 'kb/product',
                  label: '\u4EA7\u54C1\u77E5\u8BC6',
                  isFolder: false,
                  path: '/knowledge/product',
                  size: 12288,
                  modifiedAt: Date.now() - 432e6
                }
              ]
            },
            {
              key: 'wiki',
              label: 'Wiki',
              isFolder: true,
              path: '/wiki',
              children: [
                {
                  key: 'wiki/tech',
                  label: '\u6280\u672F\u6587\u6863',
                  isFolder: false,
                  path: '/wiki/tech',
                  size: 20480,
                  modifiedAt: Date.now() - 6048e5
                }
              ]
            }
          ],
          file: [
            {
              key: 'root',
              label: '\u5168\u90E8\u6587\u4EF6',
              isFolder: true,
              path: '/',
              children: [
                {
                  key: 'images',
                  label: '\u56FE\u7247',
                  isFolder: true,
                  path: '/images',
                  children: [
                    {
                      key: 'images/logo',
                      label: 'logo.png',
                      isFolder: false,
                      path: '/images/logo.png',
                      size: 25600,
                      modifiedAt: Date.now() - 864e5
                    }
                  ]
                },
                {
                  key: 'videos',
                  label: '\u89C6\u9891',
                  isFolder: true,
                  path: '/videos',
                  children: [
                    {
                      key: 'videos/demo',
                      label: 'demo.mp4',
                      isFolder: false,
                      path: '/videos/demo.mp4',
                      size: 104857600,
                      modifiedAt: Date.now() - 1728e5
                    }
                  ]
                }
              ]
            }
          ]
        }
        let data = mockData[type] || []
        if (keyword) {
          const filterNodes = (nodes) => {
            const result = []
            for (const node of nodes) {
              if (node.label.toLowerCase().includes(keyword.toLowerCase())) {
                result.push(node)
              } else if (node.children) {
                const filteredChildren = filterNodes(node.children)
                if (filteredChildren.length > 0) {
                  result.push(
                    __spreadProps(__spreadValues({}, node), { children: filteredChildren })
                  )
                }
              }
            }
            return result
          }
          data = filterNodes(data)
        }
        return data
      }
      const handleSearch = (keyword, trigger) => {
        if (searchDebounceTimer) {
          clearTimeout(searchDebounceTimer)
        }
        if (trigger === '@' && props.enableFileTree) {
          const typeMap = {
            文档: 'document',
            文件: 'file',
            表格: 'table',
            知识库: 'knowledge'
          }
          const raw = (keyword || '').trimStart()
          for (const [key, type] of Object.entries(typeMap)) {
            if (raw.startsWith(key)) {
              const rest = raw.slice(key.length).trim()
              searchDebounceTimer = setTimeout(() => {
                loadFileTree(type, rest)
              }, props.searchDebounce)
              emit('search', keyword, trigger)
              return
            }
          }
          currentFileType.value = null
          fileTreeData.value = []
        }
        emit('search', keyword, trigger)
      }
      const toggleFolder = (key) => {
        if (expandedFolders.value.has(key)) {
          expandedFolders.value.delete(key)
        } else {
          expandedFolders.value.add(key)
        }
      }
      const isFolderExpanded = (key) => expandedFolders.value.has(key)
      const handleFileSelect = (node) => {
        if (node.isFolder) {
          toggleFolder(node.key)
          return
        }
        const option = {
          value: node.path,
          label: node.label,
          type: currentFileType.value,
          path: node.path,
          size: node.size,
          modifiedAt: node.modifiedAt,
          icon: getFileIcon(node)
        }
        emit('select', option, '@')
        emit('file-select', node, option)
      }
      const getFileIcon = (node) => {
        var _a
        if (node.isFolder) return 'folder'
        if (node.icon) return node.icon
        const ext = ((_a = node.path.split('.').pop()) == null ? void 0 : _a.toLowerCase()) || ''
        const iconMap = {
          pdf: 'file-pdf',
          doc: 'file-word',
          docx: 'file-word',
          xlsx: 'file-excel',
          xls: 'file-excel',
          csv: 'file-excel',
          txt: 'document',
          md: 'document',
          png: 'picture',
          jpg: 'picture',
          jpeg: 'picture',
          gif: 'picture',
          mp4: 'video-play',
          mp3: 'headset'
        }
        return iconMap[ext] || 'document'
      }
      const formatFileSizeFn = (size) => {
        if (!size) return ''
        return props.formatFileSize(size)
      }
      const formatTimeFn = (timestamp) => {
        if (!timestamp) return ''
        const date = new Date(timestamp)
        const now = /* @__PURE__ */ new Date()
        const diff = now.getTime() - date.getTime()
        if (diff < 864e5) {
          return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
        }
        if (diff < 6048e5) {
          return Math.floor(diff / 864e5) + '\u5929\u524D'
        }
        return date.toLocaleDateString('zh-CN')
      }
      const showFileTree = computed(() => {
        return (
          props.enableFileTree && currentFileType.value !== null && fileTreeData.value.length > 0
        )
      })
      const refreshFileTree = () => {
        if (currentFileType.value) {
          loadFileTree(currentFileType.value)
        }
      }
      __expose({
        focus: () => {
          var _a
          return (_a = mentionRef.value) == null ? void 0 : _a.focus()
        },
        blur: () => {
          var _a
          return (_a = mentionRef.value) == null ? void 0 : _a.blur()
        },
        clear: () => {
          var _a
          return (_a = mentionRef.value) == null ? void 0 : _a.clear()
        },
        getRef: () => {
          var _a
          return (_a = mentionRef.value) == null ? void 0 : _a.ref
        },
        insertMention: (option, trigger) => {
          var _a
          return (_a = mentionRef.value) == null ? void 0 : _a.insertMention(option, trigger)
        },
        refreshFileTree,
        toggleFolder: (key) => toggleFolder(key)
      })
      const __returned__ = {
        props,
        emit,
        slots,
        forwardedSlotNames,
        ns,
        t,
        themeStyle,
        mentionRef,
        fileTreeData,
        fileTreeLoading,
        expandedFolders,
        currentFileType,
        get searchDebounceTimer() {
          return searchDebounceTimer
        },
        set searchDebounceTimer(v) {
          searchDebounceTimer = v
        },
        filteredOptions,
        handleUpdateValue,
        handleSelect,
        getTypeIcon,
        getTypeLabel,
        getOptionIcon,
        asAiMentionOption,
        fileTreePanelStyle,
        loadFileTree,
        generateMockFileTree,
        handleSearch,
        toggleFolder,
        isFolderExpanded,
        handleFileSelect,
        getFileIcon,
        formatFileSizeFn,
        formatTimeFn,
        showFileTree,
        refreshFileTree,
        get useNamespace() {
          return useNamespace
        },
        get useLocale() {
          return useLocale
        },
        computed,
        ref,
        useSlots,
        get aiMentionProps() {
          return aiMentionProps
        },
        get aiMentionEmits() {
          return aiMentionEmits
        },
        get YhMention() {
          return YhMention
        },
        get YhIcon() {
          return YhIcon
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
