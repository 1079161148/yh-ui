import {
  renderSlot as _renderSlot,
  normalizeClass as _normalizeClass,
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
        class: _normalizeClass($setup.stepsClass),
        style: _normalizeStyle($setup.themeStyle)
      },
      [_renderSlot(_ctx.$slots, 'default')],
      6
      /* CLASS, STYLE */
    )
  )
}
import { computed, provide, ref, onMounted, onUnmounted } from 'vue'
import { useNamespace } from '../../../hooks/use-namespace/index.js'
import { useComponentTheme } from '../../../theme/component-theme.js'
import { stepsProps, stepsEmits, STEPS_INJECTION_KEY } from './steps'
const __sfc__ = /* @__PURE__ */ Object.assign(
  {
    name: 'YhSteps'
  },
  {
    __name: 'steps',
    props: stepsProps,
    emits: stepsEmits,
    setup(__props, { expose: __expose, emit: __emit }) {
      __expose()
      const props = __props
      const emit = __emit
      const ns = useNamespace('steps')
      const { themeStyle } = useComponentTheme(
        'steps',
        computed(() => props.themeOverrides)
      )
      const steps = ref([])
      const isResponsiveVertical = ref(false)
      const checkResponsive = () => {
        if (props.responsive) {
          isResponsiveVertical.value = window.innerWidth < props.responsiveBreakpoint
        } else {
          isResponsiveVertical.value = false
        }
      }
      onMounted(() => {
        if (props.responsive) {
          checkResponsive()
          window.addEventListener('resize', checkResponsive)
        }
      })
      onUnmounted(() => {
        if (props.responsive) {
          window.removeEventListener('resize', checkResponsive)
        }
      })
      const registerStep = (step) => {
        const index = steps.value.findIndex((s) => s.uid === step.uid)
        if (index === -1) {
          steps.value.push(step)
        } else {
          steps.value[index] = step
        }
        steps.value.sort((a, b) => a.uid - b.uid)
      }
      const unregisterStep = (uid) => {
        const index = steps.value.findIndex((s) => s.uid === uid)
        if (index > -1) {
          steps.value.splice(index, 1)
        }
      }
      const handleStepClick = (index, disabled) => {
        if (!props.clickable || disabled) return
        emit('change', index)
      }
      provide(STEPS_INJECTION_KEY, {
        props,
        steps,
        isResponsiveVertical,
        registerStep,
        unregisterStep,
        handleStepClick
      })
      const actualDirection = computed(() => {
        if (isResponsiveVertical.value) return 'vertical'
        return props.direction
      })
      const stepsClass = computed(() => [
        ns.b(),
        ns.m(actualDirection.value),
        ns.m(`size-${props.size}`),
        ns.m(`label-${props.labelPlacement}`),
        ns.is('simple', props.simple),
        ns.is('center', props.alignCenter),
        ns.is('dot', props.progressDot === true || props.progressDot === 'dot'),
        ns.is('navigation', props.progressDot === 'navigation'),
        ns.is('clickable', props.clickable),
        ns.is('progress', props.showProgress),
        ns.is('timeline', props.showTimeline),
        ns.is('responsive', props.responsive)
      ])
      const __returned__ = {
        props,
        emit,
        ns,
        themeStyle,
        steps,
        isResponsiveVertical,
        checkResponsive,
        registerStep,
        unregisterStep,
        handleStepClick,
        actualDirection,
        stepsClass,
        computed,
        provide,
        ref,
        onMounted,
        onUnmounted,
        get useNamespace() {
          return useNamespace
        },
        get useComponentTheme() {
          return useComponentTheme
        },
        get stepsProps() {
          return stepsProps
        },
        get stepsEmits() {
          return stepsEmits
        },
        get STEPS_INJECTION_KEY() {
          return STEPS_INJECTION_KEY
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
