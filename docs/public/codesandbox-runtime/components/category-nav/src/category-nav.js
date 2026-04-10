import {
  createCommentVNode as _createCommentVNode,
  renderSlot as _renderSlot,
  toDisplayString as _toDisplayString,
  normalizeClass as _normalizeClass,
  createElementVNode as _createElementVNode,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
  renderList as _renderList,
  Fragment as _Fragment,
  normalizeStyle as _normalizeStyle
} from 'vue'
const _hoisted_1 = ['aria-label']
const _hoisted_2 = ['aria-selected']
const _hoisted_3 = ['aria-selected', 'onClick']
const _hoisted_4 = ['src', 'alt']
const _hoisted_5 = ['onClick']
const _hoisted_6 = ['src', 'alt']
const _hoisted_7 = ['data-id']
const _hoisted_8 = ['onClick']
const _hoisted_9 = ['src', 'alt']
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a
  return (
    _openBlock(),
    _createElementBlock(
      'div',
      {
        class: _normalizeClass($setup.ns.b()),
        style: _normalizeStyle([
          $setup.themeStyle,
          {
            '--yh-category-nav-side-width': _ctx.sideWidth,
            '--yh-category-nav-sub-image-size': `${_ctx.subImageSize}px`,
            '--yh-category-nav-columns': _ctx.columns
          }
        ])
      },
      [
        _createCommentVNode(' \u5DE6\u4FA7\u4E00\u7EA7\u83DC\u5355 '),
        _createElementVNode(
          'aside',
          {
            ref: 'sideRef',
            class: _normalizeClass($setup.ns.e('side')),
            role: 'tablist',
            'aria-label': $setup.t('categorynav.all')
          },
          [
            _createCommentVNode(' \u5168\u90E8 '),
            _ctx.showAll
              ? (_openBlock(),
                _createElementBlock(
                  'button',
                  {
                    key: 0,
                    class: _normalizeClass([
                      $setup.ns.e('side-item'),
                      $setup.ns.is('active', $setup.activeId === null)
                    ]),
                    role: 'tab',
                    'aria-selected': $setup.activeId === null,
                    onClick: _cache[0] || (_cache[0] = ($event) => $setup.selectCategory(null))
                  },
                  [
                    _renderSlot(_ctx.$slots, 'all-icon'),
                    _createElementVNode(
                      'span',
                      {
                        class: _normalizeClass($setup.ns.e('side-name'))
                      },
                      _toDisplayString($setup.t('categorynav.all')),
                      3
                      /* TEXT, CLASS */
                    )
                  ],
                  10,
                  _hoisted_2
                ))
              : _createCommentVNode('v-if', true),
            _createCommentVNode(' \u52A0\u8F7D\u9AA8\u67B6 '),
            _ctx.loading
              ? (_openBlock(),
                _createElementBlock(
                  _Fragment,
                  { key: 1 },
                  _renderList(8, (i) => {
                    return _createElementVNode(
                      'div',
                      {
                        key: i,
                        class: _normalizeClass([$setup.ns.e('side-item'), $setup.ns.e('skeleton')])
                      },
                      null,
                      2
                      /* CLASS */
                    )
                  }),
                  64
                  /* STABLE_FRAGMENT */
                ))
              : (_openBlock(true),
                _createElementBlock(
                  _Fragment,
                  { key: 2 },
                  _renderList(_ctx.categories, (cat) => {
                    return (
                      _openBlock(),
                      _createElementBlock(
                        'button',
                        {
                          key: cat.id,
                          class: _normalizeClass([
                            $setup.ns.e('side-item'),
                            $setup.ns.is('active', $setup.activeId === cat.id)
                          ]),
                          role: 'tab',
                          'aria-selected': $setup.activeId === cat.id,
                          onClick: ($event) => $setup.selectCategory(cat)
                        },
                        [
                          cat.badge
                            ? (_openBlock(),
                              _createElementBlock(
                                'span',
                                {
                                  key: 0,
                                  class: _normalizeClass($setup.ns.e('badge'))
                                },
                                _toDisplayString(cat.badge),
                                3
                                /* TEXT, CLASS */
                              ))
                            : _createCommentVNode('v-if', true),
                          cat.image
                            ? (_openBlock(),
                              _createElementBlock(
                                'img',
                                {
                                  key: 1,
                                  class: _normalizeClass($setup.ns.e('side-img')),
                                  src: cat.image,
                                  alt: cat.name,
                                  loading: 'lazy'
                                },
                                null,
                                10,
                                _hoisted_4
                              ))
                            : cat.icon
                              ? (_openBlock(),
                                _createElementBlock(
                                  'i',
                                  {
                                    key: 2,
                                    class: _normalizeClass([$setup.ns.e('side-icon'), cat.icon]),
                                    'aria-hidden': 'true'
                                  },
                                  null,
                                  2
                                  /* CLASS */
                                ))
                              : _createCommentVNode('v-if', true),
                          _createElementVNode(
                            'span',
                            {
                              class: _normalizeClass($setup.ns.e('side-name'))
                            },
                            _toDisplayString(cat.name),
                            3
                            /* TEXT, CLASS */
                          )
                        ],
                        10,
                        _hoisted_3
                      )
                    )
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
          ],
          10,
          _hoisted_1
        ),
        _createCommentVNode(' \u53F3\u4FA7\u5185\u5BB9\u533A '),
        _createElementVNode(
          'main',
          {
            ref: 'contentRef',
            class: _normalizeClass($setup.ns.e('content')),
            role: 'tabpanel',
            onScroll: $setup.onContentScroll
          },
          [
            _renderSlot(_ctx.$slots, 'header'),
            _createCommentVNode(' \u52A0\u8F7D\u9AA8\u67B6 '),
            _ctx.loading
              ? (_openBlock(),
                _createElementBlock(
                  'div',
                  {
                    key: 0,
                    class: _normalizeClass($setup.ns.e('section'))
                  },
                  [
                    _createElementVNode(
                      'div',
                      {
                        class: _normalizeClass($setup.ns.e('sub-grid'))
                      },
                      [
                        (_openBlock(),
                        _createElementBlock(
                          _Fragment,
                          null,
                          _renderList(9, (i) => {
                            return _createElementVNode(
                              'div',
                              {
                                key: i,
                                class: _normalizeClass([
                                  $setup.ns.e('sub-item'),
                                  $setup.ns.e('skeleton')
                                ])
                              },
                              null,
                              2
                              /* CLASS */
                            )
                          }),
                          64
                          /* STABLE_FRAGMENT */
                        ))
                      ],
                      2
                      /* CLASS */
                    )
                  ],
                  2
                  /* CLASS */
                ))
              : !_ctx.anchor
                ? (_openBlock(),
                  _createElementBlock(
                    _Fragment,
                    { key: 1 },
                    [
                      _createCommentVNode(
                        ' \u666E\u901A\u89C6\u56FE\uFF1A\u4EC5\u663E\u793A\u5F53\u524D\u6FC0\u6D3B\u7684\u5B50\u5206\u7C7B '
                      ),
                      $setup.activeCategory
                        ? (_openBlock(),
                          _createElementBlock(
                            'div',
                            {
                              key: 0,
                              class: _normalizeClass($setup.ns.e('section'))
                            },
                            [
                              _renderSlot(_ctx.$slots, 'section-header', {
                                category: $setup.activeCategory
                              }),
                              _createElementVNode(
                                'div',
                                {
                                  class: _normalizeClass($setup.ns.e('sub-grid'))
                                },
                                [
                                  (_openBlock(true),
                                  _createElementBlock(
                                    _Fragment,
                                    null,
                                    _renderList(
                                      (_a = $setup.activeCategory.children) != null ? _a : [],
                                      (sub) => {
                                        return (
                                          _openBlock(),
                                          _createElementBlock(
                                            'button',
                                            {
                                              key: sub.id,
                                              class: _normalizeClass([
                                                $setup.ns.e('sub-item'),
                                                $setup.ns.is(
                                                  'active',
                                                  $setup.activeSubId === sub.id
                                                )
                                              ]),
                                              onClick: ($event) =>
                                                $setup.selectSub(sub, $setup.activeCategory)
                                            },
                                            [
                                              sub.image
                                                ? (_openBlock(),
                                                  _createElementBlock(
                                                    'img',
                                                    {
                                                      key: 0,
                                                      class: _normalizeClass(
                                                        $setup.ns.e('sub-img')
                                                      ),
                                                      src: sub.image,
                                                      alt: sub.name,
                                                      loading: 'lazy'
                                                    },
                                                    null,
                                                    10,
                                                    _hoisted_6
                                                  ))
                                                : _createCommentVNode('v-if', true),
                                              _createElementVNode(
                                                'span',
                                                {
                                                  class: _normalizeClass($setup.ns.e('sub-name'))
                                                },
                                                _toDisplayString(sub.name),
                                                3
                                                /* TEXT, CLASS */
                                              ),
                                              sub.count
                                                ? (_openBlock(),
                                                  _createElementBlock(
                                                    'span',
                                                    {
                                                      key: 1,
                                                      class: _normalizeClass(
                                                        $setup.ns.e('sub-count')
                                                      )
                                                    },
                                                    _toDisplayString(sub.count),
                                                    3
                                                    /* TEXT, CLASS */
                                                  ))
                                                : _createCommentVNode('v-if', true)
                                            ],
                                            10,
                                            _hoisted_5
                                          )
                                        )
                                      }
                                    ),
                                    128
                                    /* KEYED_FRAGMENT */
                                  ))
                                ],
                                2
                                /* CLASS */
                              )
                            ],
                            2
                            /* CLASS */
                          ))
                        : (_openBlock(),
                          _createElementBlock(
                            'p',
                            {
                              key: 1,
                              class: _normalizeClass($setup.ns.e('empty'))
                            },
                            _toDisplayString($setup.t('categorynav.noData')),
                            3
                            /* TEXT, CLASS */
                          ))
                    ],
                    64
                    /* STABLE_FRAGMENT */
                  ))
                : (_openBlock(),
                  _createElementBlock(
                    _Fragment,
                    { key: 2 },
                    [
                      _createCommentVNode(
                        ' \u951A\u5B9A\u6A21\u5F0F\uFF1A\u6240\u6709\u5206\u7C7B\u7684\u5B50\u9879\u5168\u90E8\u6E32\u67D3\uFF0C\u6EDA\u52A8\u8054\u52A8 '
                      ),
                      (_openBlock(true),
                      _createElementBlock(
                        _Fragment,
                        null,
                        _renderList(_ctx.categories, (cat) => {
                          var _a2
                          return (
                            _openBlock(),
                            _createElementBlock(
                              'div',
                              {
                                key: cat.id,
                                ref_for: true,
                                ref: (el) => $setup.setSectionRef(el, cat.id),
                                class: _normalizeClass($setup.ns.e('section')),
                                'data-id': cat.id
                              },
                              [
                                _createElementVNode(
                                  'div',
                                  {
                                    class: _normalizeClass($setup.ns.e('section-title'))
                                  },
                                  [
                                    _renderSlot(
                                      _ctx.$slots,
                                      'section-header',
                                      { category: cat },
                                      () => [
                                        _createElementVNode(
                                          'span',
                                          null,
                                          _toDisplayString(cat.name),
                                          1
                                          /* TEXT */
                                        )
                                      ]
                                    )
                                  ],
                                  2
                                  /* CLASS */
                                ),
                                _createElementVNode(
                                  'div',
                                  {
                                    class: _normalizeClass($setup.ns.e('sub-grid'))
                                  },
                                  [
                                    (_openBlock(true),
                                    _createElementBlock(
                                      _Fragment,
                                      null,
                                      _renderList(
                                        (_a2 = cat.children) != null ? _a2 : [],
                                        (sub) => {
                                          return (
                                            _openBlock(),
                                            _createElementBlock(
                                              'button',
                                              {
                                                key: sub.id,
                                                class: _normalizeClass([
                                                  $setup.ns.e('sub-item'),
                                                  $setup.ns.is(
                                                    'active',
                                                    $setup.activeSubId === sub.id
                                                  )
                                                ]),
                                                onClick: ($event) => $setup.selectSub(sub, cat)
                                              },
                                              [
                                                _renderSlot(
                                                  _ctx.$slots,
                                                  'sub-item',
                                                  {
                                                    sub,
                                                    parent: cat
                                                  },
                                                  () => [
                                                    sub.image
                                                      ? (_openBlock(),
                                                        _createElementBlock(
                                                          'img',
                                                          {
                                                            key: 0,
                                                            class: _normalizeClass(
                                                              $setup.ns.e('sub-img')
                                                            ),
                                                            src: sub.image,
                                                            alt: sub.name,
                                                            loading: 'lazy'
                                                          },
                                                          null,
                                                          10,
                                                          _hoisted_9
                                                        ))
                                                      : _createCommentVNode('v-if', true),
                                                    _createElementVNode(
                                                      'span',
                                                      {
                                                        class: _normalizeClass(
                                                          $setup.ns.e('sub-name')
                                                        )
                                                      },
                                                      _toDisplayString(sub.name),
                                                      3
                                                      /* TEXT, CLASS */
                                                    ),
                                                    sub.count
                                                      ? (_openBlock(),
                                                        _createElementBlock(
                                                          'span',
                                                          {
                                                            key: 1,
                                                            class: _normalizeClass(
                                                              $setup.ns.e('sub-count')
                                                            )
                                                          },
                                                          _toDisplayString(sub.count),
                                                          3
                                                          /* TEXT, CLASS */
                                                        ))
                                                      : _createCommentVNode('v-if', true)
                                                  ]
                                                )
                                              ],
                                              10,
                                              _hoisted_8
                                            )
                                          )
                                        }
                                      ),
                                      128
                                      /* KEYED_FRAGMENT */
                                    ))
                                  ],
                                  2
                                  /* CLASS */
                                ),
                                _renderSlot(_ctx.$slots, 'section-footer', { category: cat })
                              ],
                              10,
                              _hoisted_7
                            )
                          )
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ],
                    64
                    /* STABLE_FRAGMENT */
                  )),
            _renderSlot(_ctx.$slots, 'footer')
          ],
          34
          /* CLASS, NEED_HYDRATION */
        )
      ],
      6
      /* CLASS, STYLE */
    )
  )
}
import { ref, computed, nextTick, watch, onMounted, onUnmounted } from 'vue'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { useComponentTheme } from '../../../theme/component-theme.js'
import { useLocale } from '../../../hooks/index.js'
import { categoryNavProps, categoryNavEmits } from './category-nav'
const __sfc__ = /* @__PURE__ */ Object.assign(
  { name: 'YhCategoryNav' },
  {
    __name: 'category-nav',
    props: categoryNavProps,
    emits: categoryNavEmits,
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose()
      const props = __props
      const emit = __emit
      const ns = useNamespace('category-nav')
      const { themeStyle } = useComponentTheme(
        'category-nav',
        computed(() => props.themeOverrides)
      )
      const { t } = useLocale()
      const activeId = ref(props.modelValue)
      const activeSubId = ref(props.subValue)
      watch(
        () => props.modelValue,
        (v) => {
          activeId.value = v
        }
      )
      watch(
        () => props.subValue,
        (v) => {
          activeSubId.value = v
        }
      )
      const sideRef = ref(null)
      const contentRef = ref(null)
      const sectionRefs = ref({})
      const activeCategory = computed(() => {
        var _a
        if (activeId.value === null) return null
        return (_a = props.categories.find((c) => c.id === activeId.value)) != null ? _a : null
      })
      let isScrollByClick = false
      let scrollTimer = null
      let rafId = null
      let observer = null
      function scrollSideToActive() {
        const sideEl = sideRef.value
        if (!sideEl) return
        nextTick(() => {
          const activeEl = sideEl.querySelector(`[role="tab"].${ns.is('active')}`)
          if (activeEl) {
            const { height: containerHeight } = sideEl.getBoundingClientRect()
            const { height: activeHeight, top: activeTop } = activeEl.getBoundingClientRect()
            const containerTop = sideEl.getBoundingClientRect().top
            const relativeTop = activeTop - containerTop + sideEl.scrollTop
            const targetTop = relativeTop - (containerHeight - activeHeight) / 2
            sideEl.scrollTo({
              top: Math.max(0, targetTop),
              behavior: 'smooth'
            })
          }
        })
      }
      async function selectCategory(item) {
        const id = item ? item.id : null
        if (activeId.value === id) return
        isScrollByClick = true
        activeId.value = id
        emit('update:modelValue', id)
        if (item) emit('categoryClick', item)
        if (props.anchor && contentRef.value) {
          await nextTick()
          const target = id !== null ? sectionRefs.value[id] : null
          if (target) {
            contentRef.value.scrollTo({
              top: target.offsetTop,
              behavior: 'smooth'
            })
          } else {
            contentRef.value.scrollTo({ top: 0, behavior: 'smooth' })
          }
        }
        scrollSideToActive()
        if (scrollTimer) clearTimeout(scrollTimer)
        scrollTimer = setTimeout(() => {
          isScrollByClick = false
        }, 1500)
      }
      function selectSub(subItem, parent) {
        activeSubId.value = subItem.id
        emit('update:subValue', subItem.id)
        emit('subCategoryClick', subItem, parent)
      }
      const intersectingMap = /* @__PURE__ */ new Map()
      function initObserver() {
        if (!props.anchor || !contentRef.value) return
        const options = {
          root: contentRef.value,
          rootMargin: '-5% 0px -80% 0px',
          threshold: 0
        }
        observer = new IntersectionObserver((entries) => {
          if (isScrollByClick) return
          entries.forEach((entry) => {
            const rawId = entry.target.getAttribute('data-id')
            if (rawId === null) return
            const matchedCat = props.categories.find((c) => String(c.id) === rawId)
            if (!matchedCat) return
            if (entry.isIntersecting) {
              intersectingMap.set(matchedCat.id, entry.target)
            } else {
              intersectingMap.delete(matchedCat.id)
            }
          })
          const candidates = Array.from(intersectingMap.entries()).map(([id, el]) => ({
            id,
            offsetTop: el.offsetTop
          }))
          if (candidates.length > 0) {
            const topmost = candidates.reduce((prev, curr) =>
              curr.offsetTop < prev.offsetTop ? curr : prev
            )
            if (activeId.value !== topmost.id) {
              activeId.value = topmost.id
              emit('update:modelValue', topmost.id)
              scrollSideToActive()
            }
          }
        }, options)
        Object.values(sectionRefs.value).forEach((el) =>
          observer == null ? void 0 : observer.observe(el)
        )
      }
      function onContentScroll() {
        if (isScrollByClick || !props.anchor || !contentRef.value) return
        if (rafId) cancelAnimationFrame(rafId)
        rafId = requestAnimationFrame(() => {
          const container = contentRef.value
          if (!container) return
          const scrollTop = container.scrollTop
          if (scrollTop < 10 && props.showAll) {
            if (activeId.value !== null) {
              activeId.value = null
              emit('update:modelValue', null)
              scrollSideToActive()
            }
          } else if (scrollTop + container.clientHeight >= container.scrollHeight - 2) {
            const last = props.categories[props.categories.length - 1]
            if (last && activeId.value !== last.id) {
              activeId.value = last.id
              emit('update:modelValue', last.id)
              scrollSideToActive()
            }
          }
        })
      }
      function setSectionRef(el, id) {
        if (el) sectionRefs.value[id] = el
      }
      onMounted(() => {
        if (activeId.value === null && props.categories.length > 0 && !props.showAll) {
          activeId.value = props.categories[0].id
        }
        nextTick(() => {
          initObserver()
          scrollSideToActive()
        })
      })
      onUnmounted(() => {
        if (scrollTimer) clearTimeout(scrollTimer)
        if (rafId) cancelAnimationFrame(rafId)
        if (observer) observer.disconnect()
      })
      const __returned__ = {
        props,
        emit,
        ns,
        themeStyle,
        t,
        activeId,
        activeSubId,
        sideRef,
        contentRef,
        sectionRefs,
        activeCategory,
        get isScrollByClick() {
          return isScrollByClick
        },
        set isScrollByClick(v) {
          isScrollByClick = v
        },
        get scrollTimer() {
          return scrollTimer
        },
        set scrollTimer(v) {
          scrollTimer = v
        },
        get rafId() {
          return rafId
        },
        set rafId(v) {
          rafId = v
        },
        get observer() {
          return observer
        },
        set observer(v) {
          observer = v
        },
        scrollSideToActive,
        selectCategory,
        selectSub,
        intersectingMap,
        initObserver,
        onContentScroll,
        setSectionRef,
        ref,
        computed,
        nextTick,
        watch,
        onMounted,
        onUnmounted,
        get useNamespace() {
          return useNamespace
        },
        get useComponentTheme() {
          return useComponentTheme
        },
        get useLocale() {
          return useLocale
        },
        get categoryNavProps() {
          return categoryNavProps
        },
        get categoryNavEmits() {
          return categoryNavEmits
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
