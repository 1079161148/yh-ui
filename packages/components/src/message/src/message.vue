<script setup lang="ts">
/**
 * YhMessage - 消息提示组件
 * @description 常用于主动操作后的反馈提示，轻量级，浮于页面之上
 */
import { computed, onMounted, ref, watch, toRef } from 'vue'
import type { CSSProperties } from 'vue'
import { useNamespace, useLocale } from '@yh-ui/hooks'
import type { MessageProps, MessageEmits } from './message'

defineOptions({
  name: 'YhMessage'
})

const props = withDefaults(defineProps<MessageProps>(), {
  type: 'info',
  duration: 3000,
  offset: 20,
  showClose: false,
  dangerouslyUseHTMLString: false,
  center: false,
  grouping: false,
  repeatNum: 1,
  placement: 'top'
})

const emit = defineEmits<MessageEmits>()

// 命名空间
const ns = useNamespace('message')
const { t } = useLocale()

// 可见状态
const visible = ref(false)

// 定时器
let timer: ReturnType<typeof setTimeout> | null = null

// 消息类名
const messageClasses = computed(() => [
  ns.b(),
  ns.m(props.type),
  ns.m(props.placement),
  ns.is('center', props.center),
  ns.is('closable', props.showClose),
  props.customClass
])

// 消息样式
const messageStyles = computed(() => {
  const styles: CSSProperties = {
    zIndex: props.zIndex
  }

  if (props.placement?.startsWith('top')) {
    styles.top = `${props.offset}px`
  } else {
    styles.bottom = `${props.offset}px`
  }

  return styles
})

// 图标名称（根据类型）
const iconName = computed(() => {
  if (props.icon) return props.icon

  const iconMap = {
    success: 'check-circle',
    warning: 'warning',
    info: 'info-circle',
    error: 'close-circle'
  }
  return iconMap[props.type || 'info']
})

// 是否显示重复次数（直接使用 props.repeatNum，它是 shallowReactive 的属性）
const showRepeatNum = computed(() => props.grouping && (props.repeatNum || 1) > 1)

// 开始定时器
const startTimer = () => {
  if (props.duration > 0) {
    timer = setTimeout(() => {
      close()
    }, props.duration)
  }
}

// 清除定时器
const clearTimer = () => {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
}

// 关闭消息
const close = () => {
  if (!visible.value) return
  visible.value = false
  props.onClose?.()
}

// 鼠标移入暂停
const handleMouseEnter = () => {
  clearTimer()
}

// 鼠标移出继续
const handleMouseLeave = () => {
  startTimer()
}

// 销毁后触发
const onDestroy = () => {
  emit('destroy')
}

// 监听 duration 变化
watch(
  () => props.duration,
  () => {
    clearTimer()
    startTimer()
  }
)

// 监听 repeatNum 变化 (合并消息时重置定时器)
// 由于 props 是 shallowReactive，这里可以正常监听
watch(
  () => props.repeatNum,
  () => {
    clearTimer()
    startTimer()
  }
)

// 挂载时显示
onMounted(() => {
  visible.value = true
  startTimer()
})

// 暴露方法
defineExpose({
  visible,
  close
})
</script>

<template>
  <transition :name="ns.b('fade')" @after-leave="onDestroy">
    <div v-show="visible" :class="messageClasses" :style="messageStyles" role="alert" @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave">
      <!-- 图标 -->
      <div :class="ns.e('icon')">
        <slot name="icon">
          <!-- 这里可以根据 iconName 渲染对应的图标 SVG -->
          <span :class="ns.em('icon', type)">
            <svg v-if="type === 'success'" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor"
                d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z" />
            </svg>
            <svg v-else-if="type === 'warning'" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor"
                d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 192a58.432 58.432 0 0 0-58.24 63.744l23.36 256.384a35.072 35.072 0 0 0 69.76 0l23.296-256.384A58.432 58.432 0 0 0 512 256zm0 512a51.2 51.2 0 1 0 0-102.4 51.2 51.2 0 0 0 0 102.4z" />
            </svg>
            <svg v-else-if="type === 'info'" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor"
                d="M512 64a448 448 0 1 1 0 896.064A448 448 0 0 1 512 64zm67.2 275.072c0-23.232-8.832-44.8-23.68-59.648-14.976-14.848-36.48-23.68-59.648-23.68-23.168 0-44.672 8.832-59.648 23.68-14.848 14.848-23.68 36.416-23.68 59.648 0 23.168 8.832 44.672 23.68 59.648 14.976 14.976 36.48 23.808 59.648 23.808 23.168 0 44.672-8.832 59.648-23.808 14.848-14.976 23.68-36.48 23.68-59.648zm-12.8 166.4h-128a32 32 0 0 0-32 32v256a32 32 0 0 0 32 32h128a32 32 0 0 0 32-32v-256a32 32 0 0 0-32-32z" />
            </svg>
            <svg v-else-if="type === 'error'" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor"
                d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336L512 457.664z" />
            </svg>
          </span>
        </slot>
      </div>

      <!-- 内容 -->
      <div :class="ns.e('content')">
        <slot>
          <p v-if="!dangerouslyUseHTMLString" :class="ns.e('text')">
            {{ message }}
          </p>
          <p v-else :class="ns.e('text')" v-html="message"></p>
        </slot>

        <!-- 重复次数标记 -->
        <div v-if="showRepeatNum" :class="ns.e('badge')">
          {{ repeatNum }}
        </div>
      </div>

      <!-- 关闭按钮 -->
      <div v-if="showClose" :class="ns.e('close')" :aria-label="t('message.close')" @click="close">
        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor"
            d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z" />
        </svg>
      </div>
    </div>
  </transition>
</template>

<style lang="scss">
@use './message.scss';
</style>
