import {
  createCommentVNode as _createCommentVNode,
  renderSlot as _renderSlot,
  renderList as _renderList,
  Fragment as _Fragment,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  normalizeClass as _normalizeClass,
  createVNode as _createVNode,
  toDisplayString as _toDisplayString,
  createElementVNode as _createElementVNode,
  vModelText as _vModelText,
  withDirectives as _withDirectives,
  withCtx as _withCtx,
  createBlock as _createBlock,
  normalizeStyle as _normalizeStyle,
  Transition as _Transition,
  Teleport as _Teleport
} from 'vue'
const _hoisted_1 = ['placeholder', 'disabled', 'maxlength', 'rows']
const _hoisted_2 = ['onClick', 'onMouseenter']
const _hoisted_3 = ['onClick', 'onMouseenter']
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      'div',
      {
        class: _normalizeClass([
          $setup.ns.b(),
          $setup.ns.is('disabled', _ctx.disabled),
          $setup.ns.is('loading', _ctx.loading),
          $setup.ns.is('focused', $setup.isFocused)
        ]),
        style: _normalizeStyle($setup.themeStyle)
      },
      [
        _createCommentVNode(' Header (Attachments bar) '),
        _ctx.attachments.length > 0 || _ctx.$slots.header
          ? (_openBlock(),
            _createElementBlock(
              'div',
              {
                key: 0,
                class: _normalizeClass([
                  $setup.ns.e('header'),
                  $setup.ns.is('empty', _ctx.attachments.length === 0 && !_ctx.$slots.header)
                ])
              },
              [
                _renderSlot(_ctx.$slots, 'header', {}, () => [
                  (_openBlock(true),
                  _createElementBlock(
                    _Fragment,
                    null,
                    _renderList(_ctx.attachments, (item, index) => {
                      return (
                        _openBlock(),
                        _createElementBlock(
                          'div',
                          {
                            key: index,
                            class: _normalizeClass($setup.ns.e('attachment'))
                          },
                          [
                            _createVNode(
                              $setup['YhIcon'],
                              {
                                name: item.url ? 'image' : 'document',
                                class: _normalizeClass($setup.ns.e('attachment-icon'))
                              },
                              null,
                              8,
                              ['name', 'class']
                            ),
                            _createElementVNode(
                              'span',
                              null,
                              _toDisplayString(item.name),
                              1
                              /* TEXT */
                            ),
                            _createVNode(
                              $setup['YhIcon'],
                              {
                                name: 'close',
                                class: _normalizeClass($setup.ns.e('attachment-remove')),
                                onClick: ($event) => $setup.handleRemoveAttachment(index, item)
                              },
                              null,
                              8,
                              ['class', 'onClick']
                            )
                          ],
                          2
                          /* CLASS */
                        )
                      )
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ])
              ],
              2
              /* CLASS */
            ))
          : _createCommentVNode('v-if', true),
        _createCommentVNode(' Body (Textarea) '),
        _createElementVNode(
          'div',
          {
            class: _normalizeClass($setup.ns.e('body'))
          },
          [
            _withDirectives(
              _createElementVNode(
                'textarea',
                {
                  ref: 'textareaRef',
                  'onUpdate:modelValue':
                    _cache[0] || (_cache[0] = ($event) => ($setup.innerValue = $event)),
                  class: _normalizeClass($setup.ns.e('textarea')),
                  placeholder: _ctx.placeholder,
                  disabled: _ctx.disabled || _ctx.loading,
                  maxlength: _ctx.maxLength,
                  rows: _ctx.rows,
                  onFocus: _cache[1] || (_cache[1] = ($event) => ($setup.isFocused = true)),
                  onBlur: _cache[2] || (_cache[2] = ($event) => ($setup.isFocused = false)),
                  onInput: $setup.handleInput,
                  onKeydown: $setup.handleKeyDown
                },
                null,
                42,
                _hoisted_1
              ),
              [[_vModelText, $setup.innerValue]]
            )
          ],
          2
          /* CLASS */
        ),
        _createCommentVNode(' Footer (Toolbar & Actions) '),
        _createElementVNode(
          'div',
          {
            class: _normalizeClass($setup.ns.e('footer'))
          },
          [
            _createCommentVNode(' Toolbar (Shortcuts) '),
            _createElementVNode(
              'div',
              {
                class: _normalizeClass($setup.ns.e('toolbar'))
              },
              [_renderSlot(_ctx.$slots, 'toolbar')],
              2
              /* CLASS */
            ),
            _createCommentVNode(' Actions '),
            _createElementVNode(
              'div',
              {
                class: _normalizeClass($setup.ns.e('actions'))
              },
              [
                _ctx.showWordLimit && _ctx.maxLength
                  ? (_openBlock(),
                    _createElementBlock(
                      'span',
                      {
                        key: 0,
                        class: _normalizeClass($setup.ns.e('word-limit'))
                      },
                      _toDisplayString($setup.innerValue.length) +
                        ' / ' +
                        _toDisplayString(_ctx.maxLength),
                      3
                      /* TEXT, CLASS */
                    ))
                  : _createCommentVNode('v-if', true),
                _renderSlot(_ctx.$slots, 'actions'),
                _renderSlot(
                  _ctx.$slots,
                  'submit',
                  {
                    submit: $setup.handleSend,
                    disabled: !$setup.innerValue.trim() || _ctx.disabled || _ctx.loading,
                    loading: _ctx.loading
                  },
                  () => [
                    _createVNode(
                      $setup['YhButton'],
                      {
                        type:
                          $setup.innerValue.trim() && !_ctx.disabled && !_ctx.loading
                            ? 'primary'
                            : 'default',
                        class: _normalizeClass($setup.ns.e('send-btn')),
                        disabled: !$setup.innerValue.trim() || _ctx.disabled,
                        loading: _ctx.loading,
                        circle: '',
                        onClick: $setup.handleSend
                      },
                      {
                        icon: _withCtx(() => [_createVNode($setup['YhIcon'], { name: 'send' })]),
                        _: 1
                        /* STABLE */
                      },
                      8,
                      ['type', 'class', 'disabled', 'loading']
                    )
                  ]
                )
              ],
              2
              /* CLASS */
            )
          ],
          2
          /* CLASS */
        ),
        _createCommentVNode(' Command Panel '),
        (_openBlock(),
        _createBlock(_Teleport, { to: 'body' }, [
          _createVNode(
            _Transition,
            { name: 'yh-fade-in-scale-up' },
            {
              default: _withCtx(() => [
                $setup.showCommandPanel && _ctx.enableCommands
                  ? (_openBlock(),
                    _createElementBlock(
                      'div',
                      {
                        key: 0,
                        class: _normalizeClass($setup.ns.e('command-panel-wrapper'))
                      },
                      [
                        _createElementVNode(
                          'div',
                          {
                            class: _normalizeClass($setup.ns.e('command-panel')),
                            style: _normalizeStyle($setup.commandPanelStyle)
                          },
                          [
                            $setup.commandSearchText
                              ? (_openBlock(),
                                _createElementBlock(
                                  'div',
                                  {
                                    key: 0,
                                    class: _normalizeClass($setup.ns.e('command-search'))
                                  },
                                  [
                                    _createVNode($setup['YhIcon'], { name: 'search' }),
                                    _createElementVNode(
                                      'span',
                                      null,
                                      _toDisplayString($setup.commandSearchText),
                                      1
                                      /* TEXT */
                                    )
                                  ],
                                  2
                                  /* CLASS */
                                ))
                              : _createCommentVNode('v-if', true),
                            _createElementVNode(
                              'div',
                              {
                                class: _normalizeClass($setup.ns.e('command-list'))
                              },
                              [
                                _createCommentVNode(' \u4E3B\u547D\u4EE4\u5217\u8868 '),
                                (_openBlock(true),
                                _createElementBlock(
                                  _Fragment,
                                  null,
                                  _renderList($setup.filteredCommands, (command, index) => {
                                    var _a, _b, _c
                                    return (
                                      _openBlock(),
                                      _createElementBlock(
                                        _Fragment,
                                        {
                                          key: command.id
                                        },
                                        [
                                          _createElementVNode(
                                            'div',
                                            {
                                              class: _normalizeClass([
                                                $setup.ns.e('command-item'),
                                                $setup.ns.is(
                                                  'selected',
                                                  $setup.selectedCommandIndex === index
                                                ),
                                                $setup.ns.is('disabled', command.disabled),
                                                $setup.ns.is(
                                                  'parent',
                                                  !!((_a = command.children) == null
                                                    ? void 0
                                                    : _a.length)
                                                )
                                              ]),
                                              onClick: ($event) => $setup.selectCommand(command),
                                              onMouseenter: ($event) =>
                                                ($setup.selectedCommandIndex = index)
                                            },
                                            [
                                              _ctx.showCommandIcon
                                                ? (_openBlock(),
                                                  _createBlock(
                                                    $setup['YhIcon'],
                                                    {
                                                      key: 0,
                                                      name: $setup.getCommandIcon(command),
                                                      class: _normalizeClass(
                                                        $setup.ns.e('command-icon')
                                                      )
                                                    },
                                                    null,
                                                    8,
                                                    ['name', 'class']
                                                  ))
                                                : _createCommentVNode('v-if', true),
                                              _createElementVNode(
                                                'div',
                                                {
                                                  class: _normalizeClass(
                                                    $setup.ns.e('command-content')
                                                  )
                                                },
                                                [
                                                  _createElementVNode(
                                                    'span',
                                                    {
                                                      class: _normalizeClass(
                                                        $setup.ns.e('command-label')
                                                      )
                                                    },
                                                    _toDisplayString(command.label),
                                                    3
                                                    /* TEXT, CLASS */
                                                  ),
                                                  _ctx.showCommandDescription && command.description
                                                    ? (_openBlock(),
                                                      _createElementBlock(
                                                        'span',
                                                        {
                                                          key: 0,
                                                          class: _normalizeClass(
                                                            $setup.ns.e('command-desc')
                                                          )
                                                        },
                                                        _toDisplayString(command.description),
                                                        3
                                                        /* TEXT, CLASS */
                                                      ))
                                                    : _createCommentVNode('v-if', true)
                                                ],
                                                2
                                                /* CLASS */
                                              ),
                                              ((_b = command.children) == null ? void 0 : _b.length)
                                                ? (_openBlock(),
                                                  _createBlock(
                                                    $setup['YhIcon'],
                                                    {
                                                      key: 1,
                                                      name: 'chevron-right',
                                                      class: _normalizeClass(
                                                        $setup.ns.e('command-arrow')
                                                      )
                                                    },
                                                    null,
                                                    8,
                                                    ['class']
                                                  ))
                                                : _createCommentVNode('v-if', true)
                                            ],
                                            42,
                                            _hoisted_2
                                          ),
                                          _createCommentVNode(' \u5D4C\u5957\u5B50\u547D\u4EE4 '),
                                          $setup.showCascadePanel &&
                                          ((_c = $setup.currentCascadeParent) == null
                                            ? void 0
                                            : _c.id) === command.id
                                            ? (_openBlock(true),
                                              _createElementBlock(
                                                _Fragment,
                                                { key: 0 },
                                                _renderList(
                                                  $setup.cascadeCommands,
                                                  (child, childIndex) => {
                                                    return (
                                                      _openBlock(),
                                                      _createElementBlock(
                                                        'div',
                                                        {
                                                          key: `${command.id}-${child.id}`,
                                                          class: _normalizeClass([
                                                            $setup.ns.e('command-item'),
                                                            $setup.ns.e('command-cascade-item'),
                                                            $setup.ns.is(
                                                              'selected',
                                                              $setup.selectedCommandIndex ===
                                                                $setup.filteredCommands.length +
                                                                  childIndex
                                                            ),
                                                            $setup.ns.is('disabled', child.disabled)
                                                          ]),
                                                          onClick: ($event) =>
                                                            $setup.selectCommand(child),
                                                          onMouseenter: ($event) =>
                                                            ($setup.selectedCommandIndex =
                                                              $setup.filteredCommands.length +
                                                              childIndex)
                                                        },
                                                        [
                                                          _ctx.showCommandIcon
                                                            ? (_openBlock(),
                                                              _createBlock(
                                                                $setup['YhIcon'],
                                                                {
                                                                  key: 0,
                                                                  name: $setup.getCommandIcon(
                                                                    child
                                                                  ),
                                                                  class: _normalizeClass(
                                                                    $setup.ns.e('command-icon')
                                                                  )
                                                                },
                                                                null,
                                                                8,
                                                                ['name', 'class']
                                                              ))
                                                            : _createCommentVNode('v-if', true),
                                                          _createElementVNode(
                                                            'div',
                                                            {
                                                              class: _normalizeClass(
                                                                $setup.ns.e('command-content')
                                                              )
                                                            },
                                                            [
                                                              _createElementVNode(
                                                                'span',
                                                                {
                                                                  class: _normalizeClass(
                                                                    $setup.ns.e('command-label')
                                                                  )
                                                                },
                                                                _toDisplayString(child.label),
                                                                3
                                                                /* TEXT, CLASS */
                                                              ),
                                                              _ctx.showCommandDescription &&
                                                              child.description
                                                                ? (_openBlock(),
                                                                  _createElementBlock(
                                                                    'span',
                                                                    {
                                                                      key: 0,
                                                                      class: _normalizeClass(
                                                                        $setup.ns.e('command-desc')
                                                                      )
                                                                    },
                                                                    _toDisplayString(
                                                                      child.description
                                                                    ),
                                                                    3
                                                                    /* TEXT, CLASS */
                                                                  ))
                                                                : _createCommentVNode('v-if', true)
                                                            ],
                                                            2
                                                            /* CLASS */
                                                          )
                                                        ],
                                                        42,
                                                        _hoisted_3
                                                      )
                                                    )
                                                  }
                                                ),
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
                                $setup.filteredCommands.length === 0
                                  ? (_openBlock(),
                                    _createElementBlock(
                                      'div',
                                      {
                                        key: 0,
                                        class: _normalizeClass($setup.ns.e('command-empty'))
                                      },
                                      [
                                        _createVNode($setup['YhIcon'], { name: 'search' }),
                                        _cache[3] ||
                                          (_cache[3] = _createElementVNode(
                                            'span',
                                            null,
                                            '\u6CA1\u6709\u627E\u5230\u5339\u914D\u7684\u547D\u4EE4',
                                            -1
                                            /* CACHED */
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
                          6
                          /* CLASS, STYLE */
                        )
                      ],
                      2
                      /* CLASS */
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
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { ref, computed, watch, nextTick } from 'vue'
import { aiEditorSenderProps, aiEditorSenderEmits } from './ai-editor-sender'
import { YhButton } from '../../button'
import { YhIcon } from '../../icon'
import { useComponentTheme } from '../../../theme/component-theme.js'
const __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhAiEditorSender'
  },
  {
    __name: 'ai-editor-sender',
    props: aiEditorSenderProps,
    emits: aiEditorSenderEmits,
    setup(__props, { expose: __expose, emit: __emit }) {
      const props = __props
      const emit = __emit
      const ns = useNamespace('ai-editor-sender')
      const { themeStyle } = useComponentTheme('ai-editor-sender', props.themeOverrides)
      const textareaRef = ref()
      const localValue = ref(props.modelValue)
      const isFocused = ref(false)
      const showCommandPanel = ref(false)
      const commandSearchText = ref('')
      const filteredCommands = ref([])
      const selectedCommandIndex = ref(0)
      const cascadeCommands = ref([])
      const currentCascadeParent = ref(null)
      const showCascadePanel = ref(false)
      const cascadePosition = ref({ top: 0, left: 0 })
      watch(
        () => props.modelValue,
        (val) => {
          localValue.value = val
        }
      )
      const innerValue = computed({
        get: () => localValue.value,
        set: (val) => {
          localValue.value = val
          emit('update:modelValue', val)
          emit('change', val)
          checkCommandTrigger(val)
        }
      })
      const autoResize = () => {
        const el = textareaRef.value
        if (!el) return
        el.style.height = 'auto'
        el.style.height = `${Math.min(el.scrollHeight, 200)}px`
      }
      const handleInput = (e) => {
        innerValue.value = e.target.value
        nextTick(autoResize)
      }
      const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          if (!innerValue.value.trim() || props.loading || props.disabled) {
            e.preventDefault()
          } else if (showCommandPanel.value) {
            e.preventDefault()
            const commands = getAllVisibleCommands()
            if (commands.length > 0 && selectedCommandIndex.value >= 0) {
              selectCommand(commands[selectedCommandIndex.value])
            }
          } else {
            e.preventDefault()
            handleSend()
          }
        } else if (e.key === 'ArrowDown' && showCommandPanel.value) {
          e.preventDefault()
          navigateCommands(1)
        } else if (e.key === 'ArrowUp' && showCommandPanel.value) {
          e.preventDefault()
          navigateCommands(-1)
        } else if (e.key === 'ArrowRight' && showCommandPanel.value && currentCascadeParent.value) {
          openCascadePanel(currentCascadeParent.value)
        } else if (e.key === 'Escape') {
          hideCommandPanel()
        } else if (e.key === 'Backspace' && !commandSearchText.value) {
          hideCommandPanel()
        }
      }
      const checkCommandTrigger = (value) => {
        if (!props.enableCommands) return
        const _cursorPos = value.length
        const lastSlashIndex = value.lastIndexOf(props.commandTrigger)
        if (lastSlashIndex !== -1) {
          const afterTrigger = value.slice(lastSlashIndex + 1)
          if (afterTrigger.includes(' ')) {
            hideCommandPanel()
            return
          }
          commandSearchText.value = afterTrigger
          filterCommands(afterTrigger)
          showCommandPanel.value = true
          emit('command-panel-show')
          selectedCommandIndex.value = 0
        } else {
          hideCommandPanel()
        }
      }
      const filterCommands = (keyword) => {
        if (!keyword) {
          filteredCommands.value = props.commands.filter((cmd) => !cmd.disabled)
          return
        }
        const lowerKeyword = keyword.toLowerCase()
        filteredCommands.value = props.commands.filter((cmd) => {
          var _a
          if (cmd.disabled) return false
          if (cmd.label.toLowerCase().includes(lowerKeyword)) return true
          if (
            (_a = cmd.keywords) == null
              ? void 0
              : _a.some((k) => k.toLowerCase().includes(lowerKeyword))
          )
            return true
          return false
        })
      }
      const getAllVisibleCommands = () => {
        var _a, _b
        const commands = [...filteredCommands.value]
        if (
          (_b = (_a = currentCascadeParent.value) == null ? void 0 : _a.children) == null
            ? void 0
            : _b.length
        ) {
          commands.push(...currentCascadeParent.value.children)
        }
        return commands
      }
      const navigateCommands = (direction) => {
        const commands = getAllVisibleCommands()
        if (commands.length === 0) return
        selectedCommandIndex.value =
          (selectedCommandIndex.value + direction + commands.length) % commands.length
      }
      const selectCommand = (command) => {
        var _a
        if (command.disabled) return
        if (((_a = command.children) == null ? void 0 : _a.length) && props.enableCommandCascade) {
          openCascadePanel(command)
          emit('command-cascade', command, currentCascadeParent.value)
          return
        }
        insertCommandToText(command)
        emit('command-select', command, currentCascadeParent.value || void 0)
        hideCommandPanel()
      }
      const openCascadePanel = (parent) => {
        currentCascadeParent.value = parent
        cascadeCommands.value = parent.children || []
        showCascadePanel.value = true
        nextTick(() => {
          const panel = document.querySelector(`.${ns.b()}-command-panel`)
          if (panel) {
            const rect = panel.getBoundingClientRect()
            cascadePosition.value = {
              left: rect.width + props.cascadeOffset,
              top: 0
            }
          }
        })
      }
      const insertCommandToText = (command) => {
        const cursorPos = localValue.value.lastIndexOf(props.commandTrigger)
        if (cursorPos !== -1) {
          const before = localValue.value.slice(0, cursorPos)
          const after = localValue.value
            .slice(cursorPos)
            .replace(props.commandTrigger + commandSearchText.value, '')
          localValue.value = before + command.label + after
          innerValue.value = localValue.value
        }
      }
      const hideCommandPanel = () => {
        showCommandPanel.value = false
        showCascadePanel.value = false
        commandSearchText.value = ''
        filteredCommands.value = []
        currentCascadeParent.value = null
        emit('command-panel-hide')
      }
      const handleSend = () => {
        if (!innerValue.value.trim() || props.loading || props.disabled) return
        emit('send', innerValue.value)
        innerValue.value = ''
        nextTick(() => {
          if (textareaRef.value) {
            textareaRef.value.style.height = 'auto'
          }
          hideCommandPanel()
        })
      }
      const handleRemoveAttachment = (index, item) => {
        emit('remove-attachment', index, item)
      }
      const commandPanelStyle = computed(() => ({
        width:
          typeof props.commandPanelWidth === 'number'
            ? props.commandPanelWidth + 'px'
            : props.commandPanelWidth,
        maxHeight: props.commandPanelMaxHeight + 'px'
      }))
      const getCommandIcon = (command) => {
        if (command.icon) return command.icon
        return 'command'
      }
      __expose({
        focus: () => {
          var _a
          return (_a = textareaRef.value) == null ? void 0 : _a.focus()
        },
        blur: () => {
          var _a
          return (_a = textareaRef.value) == null ? void 0 : _a.blur()
        },
        clear: () => {
          localValue.value = ''
          hideCommandPanel()
        }
      })
      const __returned__ = {
        props,
        emit,
        ns,
        themeStyle,
        textareaRef,
        localValue,
        isFocused,
        showCommandPanel,
        commandSearchText,
        filteredCommands,
        selectedCommandIndex,
        cascadeCommands,
        currentCascadeParent,
        showCascadePanel,
        cascadePosition,
        innerValue,
        autoResize,
        handleInput,
        handleKeyDown,
        checkCommandTrigger,
        filterCommands,
        getAllVisibleCommands,
        navigateCommands,
        selectCommand,
        openCascadePanel,
        insertCommandToText,
        hideCommandPanel,
        handleSend,
        handleRemoveAttachment,
        commandPanelStyle,
        getCommandIcon,
        get useNamespace() {
          return useNamespace
        },
        ref,
        computed,
        watch,
        nextTick,
        get aiEditorSenderProps() {
          return aiEditorSenderProps
        },
        get aiEditorSenderEmits() {
          return aiEditorSenderEmits
        },
        get YhButton() {
          return YhButton
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
