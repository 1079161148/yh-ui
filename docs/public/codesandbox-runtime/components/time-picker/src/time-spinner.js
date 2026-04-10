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
  createElementVNode as _createElementVNode,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  normalizeClass as _normalizeClass,
  toDisplayString as _toDisplayString,
  Fragment as _Fragment,
  renderList as _renderList
} from 'vue'
const _hoisted_1 = ['onClick']
const _hoisted_2 = ['onClick']
const _hoisted_3 = ['onClick']
const _hoisted_4 = ['onClick']
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      'div',
      {
        class: _normalizeClass($setup.ns.b())
      },
      [
        _createCommentVNode(' \u5C0F\u65F6\u5217 '),
        _createElementVNode(
          'div',
          {
            class: _normalizeClass($setup.ns.e('column'))
          },
          [
            $props.arrowControl
              ? (_openBlock(),
                _createElementBlock(
                  _Fragment,
                  { key: 0 },
                  [
                    _createElementVNode(
                      'button',
                      {
                        class: _normalizeClass($setup.ns.e('arrow')),
                        type: 'button',
                        onClick:
                          _cache[0] ||
                          (_cache[0] = ($event) => $setup.handleArrowClick('hours', 'up'))
                      },
                      [
                        ...(_cache[10] ||
                          (_cache[10] = [
                            _createElementVNode(
                              'svg',
                              {
                                viewBox: '0 0 1024 1024',
                                width: '1em',
                                height: '1em'
                              },
                              [
                                _createElementVNode('path', {
                                  fill: 'currentColor',
                                  d: 'M831.872 683.136L512 371.328 192.128 683.136a30.592 30.592 0 0 1-42.752 0 29.12 29.12 0 0 1 0-41.6l340.288-331.712a32 32 0 0 1 44.672 0l340.288 331.776a29.12 29.12 0 0 1 0 41.6 30.592 30.592 0 0 1-42.752 0z'
                                })
                              ],
                              -1
                              /* CACHED */
                            )
                          ]))
                      ],
                      2
                      /* CLASS */
                    ),
                    _createElementVNode(
                      'div',
                      {
                        class: _normalizeClass($setup.ns.e('value'))
                      },
                      _toDisplayString(
                        $setup.formatNumber(
                          $props.use12Hours
                            ? $props.modelValue.hours % 12 || 12
                            : $props.modelValue.hours
                        )
                      ),
                      3
                      /* TEXT, CLASS */
                    ),
                    _createElementVNode(
                      'button',
                      {
                        class: _normalizeClass($setup.ns.e('arrow')),
                        type: 'button',
                        onClick:
                          _cache[1] ||
                          (_cache[1] = ($event) => $setup.handleArrowClick('hours', 'down'))
                      },
                      [
                        ...(_cache[11] ||
                          (_cache[11] = [
                            _createElementVNode(
                              'svg',
                              {
                                viewBox: '0 0 1024 1024',
                                width: '1em',
                                height: '1em'
                              },
                              [
                                _createElementVNode('path', {
                                  fill: 'currentColor',
                                  d: 'M831.872 340.864L512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z'
                                })
                              ],
                              -1
                              /* CACHED */
                            )
                          ]))
                      ],
                      2
                      /* CLASS */
                    )
                  ],
                  64
                  /* STABLE_FRAGMENT */
                ))
              : (_openBlock(),
                _createElementBlock(
                  'div',
                  {
                    key: 1,
                    ref: 'hoursRef',
                    class: _normalizeClass($setup.ns.e('list')),
                    onScroll:
                      _cache[2] || (_cache[2] = ($event) => $setup.handleScroll('hours', $event))
                  },
                  [
                    _createElementVNode(
                      'div',
                      {
                        class: _normalizeClass($setup.ns.e('list-inner'))
                      },
                      [
                        (_openBlock(true),
                        _createElementBlock(
                          _Fragment,
                          null,
                          _renderList($setup.hoursList, (item) => {
                            return (
                              _openBlock(),
                              _createElementBlock(
                                'div',
                                {
                                  key: item.value,
                                  class: _normalizeClass([
                                    $setup.ns.e('item'),
                                    $setup.ns.is(
                                      'selected',
                                      $props.use12Hours
                                        ? ($props.modelValue.hours % 12 || 12) === item.value
                                        : $props.modelValue.hours === item.value
                                    ),
                                    $setup.ns.is('disabled', item.disabled)
                                  ]),
                                  onClick: ($event) =>
                                    $setup.handleItemClick('hours', item.value, item.disabled)
                                },
                                _toDisplayString($setup.formatNumber(item.value)),
                                11,
                                _hoisted_1
                              )
                            )
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ],
                      2
                      /* CLASS */
                    )
                  ],
                  34
                  /* CLASS, NEED_HYDRATION */
                ))
          ],
          2
          /* CLASS */
        ),
        _createCommentVNode(' \u5206\u9694\u7B26 '),
        _createElementVNode(
          'div',
          {
            class: _normalizeClass($setup.ns.e('separator'))
          },
          ':',
          2
          /* CLASS */
        ),
        _createCommentVNode(' \u5206\u949F\u5217 '),
        _createElementVNode(
          'div',
          {
            class: _normalizeClass($setup.ns.e('column'))
          },
          [
            $props.arrowControl
              ? (_openBlock(),
                _createElementBlock(
                  _Fragment,
                  { key: 0 },
                  [
                    _createElementVNode(
                      'button',
                      {
                        class: _normalizeClass($setup.ns.e('arrow')),
                        type: 'button',
                        onClick:
                          _cache[3] ||
                          (_cache[3] = ($event) => $setup.handleArrowClick('minutes', 'up'))
                      },
                      [
                        ...(_cache[12] ||
                          (_cache[12] = [
                            _createElementVNode(
                              'svg',
                              {
                                viewBox: '0 0 1024 1024',
                                width: '1em',
                                height: '1em'
                              },
                              [
                                _createElementVNode('path', {
                                  fill: 'currentColor',
                                  d: 'M831.872 683.136L512 371.328 192.128 683.136a30.592 30.592 0 0 1-42.752 0 29.12 29.12 0 0 1 0-41.6l340.288-331.712a32 32 0 0 1 44.672 0l340.288 331.776a29.12 29.12 0 0 1 0 41.6 30.592 30.592 0 0 1-42.752 0z'
                                })
                              ],
                              -1
                              /* CACHED */
                            )
                          ]))
                      ],
                      2
                      /* CLASS */
                    ),
                    _createElementVNode(
                      'div',
                      {
                        class: _normalizeClass($setup.ns.e('value'))
                      },
                      _toDisplayString($setup.formatNumber($props.modelValue.minutes)),
                      3
                      /* TEXT, CLASS */
                    ),
                    _createElementVNode(
                      'button',
                      {
                        class: _normalizeClass($setup.ns.e('arrow')),
                        type: 'button',
                        onClick:
                          _cache[4] ||
                          (_cache[4] = ($event) => $setup.handleArrowClick('minutes', 'down'))
                      },
                      [
                        ...(_cache[13] ||
                          (_cache[13] = [
                            _createElementVNode(
                              'svg',
                              {
                                viewBox: '0 0 1024 1024',
                                width: '1em',
                                height: '1em'
                              },
                              [
                                _createElementVNode('path', {
                                  fill: 'currentColor',
                                  d: 'M831.872 340.864L512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z'
                                })
                              ],
                              -1
                              /* CACHED */
                            )
                          ]))
                      ],
                      2
                      /* CLASS */
                    )
                  ],
                  64
                  /* STABLE_FRAGMENT */
                ))
              : (_openBlock(),
                _createElementBlock(
                  'div',
                  {
                    key: 1,
                    ref: 'minutesRef',
                    class: _normalizeClass($setup.ns.e('list')),
                    onScroll:
                      _cache[5] || (_cache[5] = ($event) => $setup.handleScroll('minutes', $event))
                  },
                  [
                    _createElementVNode(
                      'div',
                      {
                        class: _normalizeClass($setup.ns.e('list-inner'))
                      },
                      [
                        (_openBlock(true),
                        _createElementBlock(
                          _Fragment,
                          null,
                          _renderList($setup.minutesList, (item) => {
                            return (
                              _openBlock(),
                              _createElementBlock(
                                'div',
                                {
                                  key: item.value,
                                  class: _normalizeClass([
                                    $setup.ns.e('item'),
                                    $setup.ns.is(
                                      'selected',
                                      $props.modelValue.minutes === item.value
                                    ),
                                    $setup.ns.is('disabled', item.disabled)
                                  ]),
                                  onClick: ($event) =>
                                    $setup.handleItemClick('minutes', item.value, item.disabled)
                                },
                                _toDisplayString($setup.formatNumber(item.value)),
                                11,
                                _hoisted_2
                              )
                            )
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ],
                      2
                      /* CLASS */
                    )
                  ],
                  34
                  /* CLASS, NEED_HYDRATION */
                ))
          ],
          2
          /* CLASS */
        ),
        _createCommentVNode(' \u79D2\u5206\u9694\u7B26 '),
        $props.showSeconds
          ? (_openBlock(),
            _createElementBlock(
              _Fragment,
              { key: 0 },
              [
                _createElementVNode(
                  'div',
                  {
                    class: _normalizeClass($setup.ns.e('separator'))
                  },
                  ':',
                  2
                  /* CLASS */
                ),
                _createCommentVNode(' \u79D2\u5217 '),
                _createElementVNode(
                  'div',
                  {
                    class: _normalizeClass($setup.ns.e('column'))
                  },
                  [
                    $props.arrowControl
                      ? (_openBlock(),
                        _createElementBlock(
                          _Fragment,
                          { key: 0 },
                          [
                            _createElementVNode(
                              'button',
                              {
                                class: _normalizeClass($setup.ns.e('arrow')),
                                type: 'button',
                                onClick:
                                  _cache[6] ||
                                  (_cache[6] = ($event) => $setup.handleArrowClick('seconds', 'up'))
                              },
                              [
                                ...(_cache[14] ||
                                  (_cache[14] = [
                                    _createElementVNode(
                                      'svg',
                                      {
                                        viewBox: '0 0 1024 1024',
                                        width: '1em',
                                        height: '1em'
                                      },
                                      [
                                        _createElementVNode('path', {
                                          fill: 'currentColor',
                                          d: 'M831.872 683.136L512 371.328 192.128 683.136a30.592 30.592 0 0 1-42.752 0 29.12 29.12 0 0 1 0-41.6l340.288-331.712a32 32 0 0 1 44.672 0l340.288 331.776a29.12 29.12 0 0 1 0 41.6 30.592 30.592 0 0 1-42.752 0z'
                                        })
                                      ],
                                      -1
                                      /* CACHED */
                                    )
                                  ]))
                              ],
                              2
                              /* CLASS */
                            ),
                            _createElementVNode(
                              'div',
                              {
                                class: _normalizeClass($setup.ns.e('value'))
                              },
                              _toDisplayString($setup.formatNumber($props.modelValue.seconds)),
                              3
                              /* TEXT, CLASS */
                            ),
                            _createElementVNode(
                              'button',
                              {
                                class: _normalizeClass($setup.ns.e('arrow')),
                                type: 'button',
                                onClick:
                                  _cache[7] ||
                                  (_cache[7] = ($event) =>
                                    $setup.handleArrowClick('seconds', 'down'))
                              },
                              [
                                ...(_cache[15] ||
                                  (_cache[15] = [
                                    _createElementVNode(
                                      'svg',
                                      {
                                        viewBox: '0 0 1024 1024',
                                        width: '1em',
                                        height: '1em'
                                      },
                                      [
                                        _createElementVNode('path', {
                                          fill: 'currentColor',
                                          d: 'M831.872 340.864L512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z'
                                        })
                                      ],
                                      -1
                                      /* CACHED */
                                    )
                                  ]))
                              ],
                              2
                              /* CLASS */
                            )
                          ],
                          64
                          /* STABLE_FRAGMENT */
                        ))
                      : (_openBlock(),
                        _createElementBlock(
                          'div',
                          {
                            key: 1,
                            ref: 'secondsRef',
                            class: _normalizeClass($setup.ns.e('list')),
                            onScroll:
                              _cache[8] ||
                              (_cache[8] = ($event) => $setup.handleScroll('seconds', $event))
                          },
                          [
                            _createElementVNode(
                              'div',
                              {
                                class: _normalizeClass($setup.ns.e('list-inner'))
                              },
                              [
                                (_openBlock(true),
                                _createElementBlock(
                                  _Fragment,
                                  null,
                                  _renderList($setup.secondsList, (item) => {
                                    return (
                                      _openBlock(),
                                      _createElementBlock(
                                        'div',
                                        {
                                          key: item.value,
                                          class: _normalizeClass([
                                            $setup.ns.e('item'),
                                            $setup.ns.is(
                                              'selected',
                                              $props.modelValue.seconds === item.value
                                            ),
                                            $setup.ns.is('disabled', item.disabled)
                                          ]),
                                          onClick: ($event) =>
                                            $setup.handleItemClick(
                                              'seconds',
                                              item.value,
                                              item.disabled
                                            )
                                        },
                                        _toDisplayString($setup.formatNumber(item.value)),
                                        11,
                                        _hoisted_3
                                      )
                                    )
                                  }),
                                  128
                                  /* KEYED_FRAGMENT */
                                ))
                              ],
                              2
                              /* CLASS */
                            )
                          ],
                          34
                          /* CLASS, NEED_HYDRATION */
                        ))
                  ],
                  2
                  /* CLASS */
                )
              ],
              64
              /* STABLE_FRAGMENT */
            ))
          : _createCommentVNode('v-if', true),
        _createCommentVNode(' AM/PM \u5217 (12\u5C0F\u65F6\u5236) '),
        $props.use12Hours && !$props.arrowControl
          ? (_openBlock(),
            _createElementBlock(
              'div',
              {
                key: 1,
                class: _normalizeClass($setup.ns.e('column'))
              },
              [
                _createElementVNode(
                  'div',
                  {
                    ref: 'ampmRef',
                    class: _normalizeClass($setup.ns.e('list')),
                    onScroll:
                      _cache[9] || (_cache[9] = ($event) => $setup.handleScroll('ampm', $event))
                  },
                  [
                    _createElementVNode(
                      'div',
                      {
                        class: _normalizeClass($setup.ns.e('list-inner'))
                      },
                      [
                        (_openBlock(true),
                        _createElementBlock(
                          _Fragment,
                          null,
                          _renderList($setup.ampmList, (item) => {
                            return (
                              _openBlock(),
                              _createElementBlock(
                                'div',
                                {
                                  key: item.value,
                                  class: _normalizeClass([
                                    $setup.ns.e('item'),
                                    $setup.ns.is('selected', $setup.currentAmpm === item.value),
                                    $setup.ns.is('disabled', item.disabled)
                                  ]),
                                  onClick: ($event) =>
                                    $setup.handleItemClick('ampm', item.value, item.disabled)
                                },
                                _toDisplayString(item.label),
                                11,
                                _hoisted_4
                              )
                            )
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ],
                      2
                      /* CLASS */
                    )
                  ],
                  34
                  /* CLASS, NEED_HYDRATION */
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
  )
}
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { generateNumberList } from './time-picker'
const ITEM_HEIGHT = 32
const __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhTimeSpinner'
  },
  {
    __name: 'time-spinner',
    props: {
      modelValue: { type: Object, required: true },
      showSeconds: { type: Boolean, required: false, default: true },
      arrowControl: { type: Boolean, required: false, default: false },
      hourStep: { type: Number, required: false, default: 1 },
      minuteStep: { type: Number, required: false, default: 1 },
      secondStep: { type: Number, required: false, default: 1 },
      disabledTime: { type: Object, required: false, default: void 0 },
      use12Hours: { type: Boolean, required: false, default: false },
      hourOptions: { type: Array, required: false, default: void 0 },
      minuteOptions: { type: Array, required: false, default: void 0 },
      secondOptions: { type: Array, required: false, default: void 0 }
    },
    emits: ['update:modelValue', 'change'],
    setup(__props, { expose: __expose, emit: __emit }) {
      const props = __props
      const emit = __emit
      const ns = useNamespace('time-spinner')
      const hoursRef = ref()
      const minutesRef = ref()
      const secondsRef = ref()
      const ampmRef = ref()
      const disabledHours = computed(() => {
        var _a, _b
        return (
          ((_b = (_a = props.disabledTime) == null ? void 0 : _a.disabledHours) == null
            ? void 0
            : _b.call(_a)) || []
        )
      })
      const disabledMinutes = computed(() => {
        var _a, _b
        return (
          ((_b = (_a = props.disabledTime) == null ? void 0 : _a.disabledMinutes) == null
            ? void 0
            : _b.call(_a, props.modelValue.hours)) || []
        )
      })
      const disabledSeconds = computed(() => {
        var _a, _b
        return (
          ((_b = (_a = props.disabledTime) == null ? void 0 : _a.disabledSeconds) == null
            ? void 0
            : _b.call(_a, props.modelValue.hours, props.modelValue.minutes)) || []
        )
      })
      const hoursList = computed(() => {
        const max = props.use12Hours ? 12 : 23
        const list = generateNumberList(max, props.hourStep, disabledHours.value, props.hourOptions)
        if (props.use12Hours) {
          return list.map((item) =>
            __spreadProps(__spreadValues({}, item), {
              value: item.value === 0 ? 12 : item.value
            })
          )
        }
        return list
      })
      const minutesList = computed(() => {
        return generateNumberList(59, props.minuteStep, disabledMinutes.value, props.minuteOptions)
      })
      const secondsList = computed(() => {
        return generateNumberList(59, props.secondStep, disabledSeconds.value, props.secondOptions)
      })
      const ampmList = computed(() => [
        { value: 'AM', label: 'AM', disabled: false },
        { value: 'PM', label: 'PM', disabled: false }
      ])
      const currentAmpm = computed(() => (props.modelValue.hours >= 12 ? 'PM' : 'AM'))
      const formatNumber = (n) => String(n).padStart(2, '0')
      const scrollToItem = (container, index, smooth = false) => {
        if (!container) return
        const scrollTop = index * ITEM_HEIGHT
        if (smooth && typeof container.scrollTo === 'function') {
          container.scrollTo({ top: scrollTop, behavior: 'smooth' })
        } else {
          container.scrollTop = scrollTop
        }
      }
      const adjustScrollPosition = (container) => {
        if (!container) return
        const scrollTop = container.scrollTop
        const index = Math.round(scrollTop / ITEM_HEIGHT)
        scrollToItem(container, index, true)
      }
      const handleScrollEnd = (type, container) => {
        if (!container) return
        const scrollTop = container.scrollTop
        const index = Math.round(scrollTop / ITEM_HEIGHT)
        if (type === 'ampm') {
          const isAM = index === 0
          const newHours = isAM
            ? props.modelValue.hours >= 12
              ? props.modelValue.hours - 12
              : props.modelValue.hours
            : props.modelValue.hours < 12
              ? props.modelValue.hours + 12
              : props.modelValue.hours
          if (newHours !== props.modelValue.hours) {
            const newState = __spreadProps(__spreadValues({}, props.modelValue), {
              hours: newHours
            })
            emit('update:modelValue', newState)
            emit('change', newState)
          }
        } else {
          const list =
            type === 'hours'
              ? hoursList.value
              : type === 'minutes'
                ? minutesList.value
                : secondsList.value
          if (index >= 0 && index < list.length) {
            const item = list[index]
            if (item && !item.disabled) {
              let value = item.value
              if (type === 'hours' && props.use12Hours) {
                const isPM = props.modelValue.hours >= 12
                value = value === 12 ? (isPM ? 12 : 0) : isPM ? value + 12 : value
              }
              if (props.modelValue[type] !== value) {
                const newState = __spreadProps(__spreadValues({}, props.modelValue), {
                  [type]: value
                })
                emit('update:modelValue', newState)
                emit('change', newState)
              }
            }
          }
        }
      }
      let scrollTimer = null
      const handleScroll = (type, event) => {
        const container = event.target
        if (scrollTimer) {
          clearTimeout(scrollTimer)
        }
        scrollTimer = setTimeout(() => {
          adjustScrollPosition(container)
          handleScrollEnd(type, container)
        }, 100)
      }
      const handleArrowClick = (type, direction) => {
        var _a, _b
        const list =
          type === 'hours'
            ? hoursList.value
            : type === 'minutes'
              ? minutesList.value
              : secondsList.value
        let currentValue = props.modelValue[type]
        if (type === 'hours' && props.use12Hours) {
          currentValue = currentValue % 12 || 12
        }
        const currentIndex = list.findIndex((item) => item.value === currentValue)
        let newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
        if (newIndex < 0) newIndex = list.length - 1
        if (newIndex >= list.length) newIndex = 0
        let attempts = 0
        while (((_a = list[newIndex]) == null ? void 0 : _a.disabled) && attempts < list.length) {
          newIndex = direction === 'up' ? newIndex - 1 : newIndex + 1
          if (newIndex < 0) newIndex = list.length - 1
          if (newIndex >= list.length) newIndex = 0
          attempts++
        }
        if (!((_b = list[newIndex]) == null ? void 0 : _b.disabled)) {
          let value = list[newIndex].value
          if (type === 'hours' && props.use12Hours) {
            const isPM = props.modelValue.hours >= 12
            value = value === 12 ? (isPM ? 12 : 0) : isPM ? value + 12 : value
          }
          const newState = __spreadProps(__spreadValues({}, props.modelValue), { [type]: value })
          emit('update:modelValue', newState)
          emit('change', newState)
        }
      }
      const handleItemClick = (type, value, disabled) => {
        if (disabled) return
        if (type === 'ampm') {
          const isAM = value === 'AM'
          const currentHours = props.modelValue.hours
          let newHours = currentHours
          if (isAM && currentHours >= 12) {
            newHours = currentHours - 12
          } else if (!isAM && currentHours < 12) {
            newHours = currentHours + 12
          }
          if (newHours !== currentHours) {
            const newState = __spreadProps(__spreadValues({}, props.modelValue), {
              hours: newHours
            })
            emit('update:modelValue', newState)
            emit('change', newState)
          }
        } else {
          let numValue = value
          if (type === 'hours' && props.use12Hours) {
            const isPM = props.modelValue.hours >= 12
            numValue = numValue === 12 ? (isPM ? 12 : 0) : isPM ? numValue + 12 : numValue
          }
          if (props.modelValue[type] !== numValue) {
            const newState = __spreadProps(__spreadValues({}, props.modelValue), {
              [type]: numValue
            })
            emit('update:modelValue', newState)
            emit('change', newState)
          }
        }
      }
      const getCurrentIndex = (type) => {
        const list =
          type === 'hours'
            ? hoursList.value
            : type === 'minutes'
              ? minutesList.value
              : secondsList.value
        let value = props.modelValue[type]
        if (type === 'hours' && props.use12Hours) {
          value = value % 12 || 12
        }
        return list.findIndex((item) => item.value === value)
      }
      const scrollToCurrentValues = (smooth = false) => {
        nextTick(() => {
          scrollToItem(hoursRef.value, getCurrentIndex('hours'), smooth)
          scrollToItem(minutesRef.value, getCurrentIndex('minutes'), smooth)
          if (props.showSeconds) {
            scrollToItem(secondsRef.value, getCurrentIndex('seconds'), smooth)
          }
          if (props.use12Hours) {
            scrollToItem(ampmRef.value, props.modelValue.hours >= 12 ? 1 : 0, smooth)
          }
        })
      }
      watch(
        () => props.modelValue,
        () => {
          scrollToCurrentValues(true)
        },
        { deep: true }
      )
      onMounted(() => {
        scrollToCurrentValues(false)
      })
      __expose({
        scrollToCurrentValues
      })
      const __returned__ = {
        props,
        emit,
        ns,
        hoursRef,
        minutesRef,
        secondsRef,
        ampmRef,
        ITEM_HEIGHT,
        disabledHours,
        disabledMinutes,
        disabledSeconds,
        hoursList,
        minutesList,
        secondsList,
        ampmList,
        currentAmpm,
        formatNumber,
        scrollToItem,
        adjustScrollPosition,
        handleScrollEnd,
        get scrollTimer() {
          return scrollTimer
        },
        set scrollTimer(v) {
          scrollTimer = v
        },
        handleScroll,
        handleArrowClick,
        handleItemClick,
        getCurrentIndex,
        scrollToCurrentValues,
        ref,
        computed,
        watch,
        nextTick,
        onMounted,
        get useNamespace() {
          return useNamespace
        },
        get generateNumberList() {
          return generateNumberList
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
