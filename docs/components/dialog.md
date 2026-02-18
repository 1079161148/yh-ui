<script setup lang="ts">
import { ref, h } from 'vue'
import { toJs, _T, _S, _St } from '../.vitepress/theme/utils/demo-utils'

const visibleBasic = ref(false)
const visibleAlignCenter = ref(false)
const visibleCenter = ref(false)
const visibleDraggable = ref(false)
const visibleGlass = ref(false)
const visibleFullscreen = ref(false)
const visibleOuter = ref(false)
const visibleInner = ref(false)
const visibleNuxt = ref(false)

// 新增功能
const visibleSuccess = ref(false)
const visibleWarning = ref(false)
const visibleError = ref(false)
const visibleInfo = ref(false)
const visibleLoading = ref(false)
const loadingState = ref(false)
const visibleRender = ref(false)
const visibleOrigin = ref(false)
const visibleSwap = ref(false)
const visibleFooterLeft = ref(false)
const visibleFooterCenter = ref(false)
const visibleFooterRight = ref(false)
const visibleContentAlign = ref(false)
const visibleDestroy = ref(false)
const visibleDestroyNormal = ref(false)
const visibleHeaderAlign = ref(false)

// 函数式调用示例
import { useDialog, YhDialogMethod, YhMessage } from '@yh-ui/components'
// 模拟文档环境下的调用
const { showDialog } = useDialog()

const handleHookCall = async () => {
  const { action } = await showDialog({
    title: 'Hook 方式调用',
    content: '这是通过 useDialog Hook 发起的弹窗，它会自动继承当前的应用上下文。',
    type: 'info'
  })
  console.log('Action:', action)
}

const handleMethodCall = () => {
  YhDialogMethod.success({
    title: '指令式调用',
    content: '这是通过 YhDialogMethod.success 直接发起的弹窗。',
    confirmText: '太棒了'
  })
}

const handleCallbackCall = async () => {
  const { action } = await showDialog({
    title: '动作确认',
    content: '请选择您的操作，我们将根据返回的 action 进行业务逻辑处理。',
    confirmText: '我要确定',
    cancelText: '我要取消'
  })
  
  if (action === 'confirm') {
    YhMessage.success('您点击了确定按钮')
  } else if (action === 'cancel') {
    YhMessage.warning('您点击了取消按钮')
  } else {
    YhMessage.info('您通过其他方式关闭了弹窗')
  }
}

const handleFunctionalSwap = () => {
  showDialog({
    title: '操作确认',
    content: '确认按钮现在位于左侧，取消按钮位于右侧。',
    swapFooterButtons: true
  })
}

const handleAsyncOpen = () => {
  visibleLoading.value = true
}

const simulateSubmit = () => {
  loadingState.value = true
  setTimeout(() => {
    loadingState.value = false
    visibleLoading.value = false
  }, 2000)
}

const renderTitle = () => h('div', { style: 'display:flex; align-items:center; color:#409eff' }, [
  h('span', '🚀 渲染函数标题')
])

const renderContent = () => h('div', { style: 'padding: 20px; background: #f0f7ff; border-radius: 8px;' }, [
  h('h4', '通过 h() 函数动态生成的内容'),
  h('p', { style: 'color: #666' }, '这种方式要针对不同业务场景提供极致的灵活性。')
])

const renderAction = () => h('div', { style: 'display: flex; gap: 8px; justify-content: flex-end' }, [
  h('button', { 
    onClick: () => { visibleRender.value = false },
    style: 'padding: 6px 16px; border-radius: 4px; border: 1px solid #dcdfe6; background: #fff; cursor: pointer'
  }, '我知道了')
])

const tsBasic = `<${_T}>
  <yh-button @click="visible = true">打开对话框</yh-button>

  <yh-dialog v-model="visible" title="标准设计预览">
    <span>YH-UI 的对话框采用了定制的贝塞尔动效，开启感极其轻盈，配合 16px 的大圆角设计，兼顾了现代感与亲和力。</span>
  </yh-dialog>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const visible = ref(false)
</${_S}>`

const jsBasic = toJs(tsBasic)

const tsCenter = `<${_T}>
  <div style="display: flex; gap: 16px;">
    <yh-button @click="visibleAlignCenter = true">垂直居中</yh-button>
    <yh-button @click="visibleCenter = true" type="primary">全居中模式</yh-button>
  </div>

  <!-- 仅垂直居中 (自带智能页脚) -->
  <yh-dialog 
    v-model="visibleAlignCenter" 
    title="内容垂直居中" 
    align-center 
  >
    <p>通过属性 <code>align-center</code>，对话框将忽略 <code>top</code> 设置并垂直居中。</p>
  </yh-dialog>

  <!-- 全居中模式 (Header, Body, Footer 全部垂直/水平均称) -->
  <yh-dialog v-model="visibleCenter" title="Center Mode" center align-center>
    <div style="text-align: center; padding: 20px 0;">
      <div style="width: 64px; height: 64px; border-radius: 50%; background: #f0f9eb; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
        <yh-icon name="check" style="color: #67c23a; font-size: 32px;" />
      </div>
      <h3 style="margin-bottom: 12px; font-weight: 700;">操作确认</h3>
      <p style="color: var(--yh-text-color-regular); font-size: 15px;">当 <code>center</code> 设为 true 时，弹窗的头部、底部以及主体内容会自动水平均中对齐。</p>
    </div>
    <template #footer>
      <yh-button @click="visibleCenter = false">取消</yh-button>
      <yh-button type="primary" @click="visibleCenter = false">立即提交</yh-button>
    </template>
  </yh-dialog>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const visibleAlignCenter = ref(false)
const visibleCenter = ref(false)
</${_S}>`

const jsCenter = toJs(tsCenter)

const tsFooterAlign = `<${_T}>
  <div style="display: flex; gap: 12px;">
    <yh-button @click="visibleLeft = true">居左对齐</yh-button>
    <yh-button @click="visibleCenter = true">居中对齐</yh-button>
    <yh-button @click="visibleRight = true">居右对齐 (默认)</yh-button>
  </div>

  <yh-dialog v-model="visibleLeft" title="居左对齐" footer-align="left">
    <span>底部按钮现在排列在左侧。</span>
  </yh-dialog>

  <yh-dialog v-model="visibleCenter" title="居中对齐" footer-align="center">
    <span>底部按钮现在排列在中间。</span>
  </yh-dialog>

  <yh-dialog v-model="visibleRight" title="居右对齐" footer-align="right">
    <span>这是默认的排列方式。</span>
  </yh-dialog>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const visibleLeft = ref(false)
const visibleCenter = ref(false)
const visibleRight = ref(false)
</${_S}>`

const jsFooterAlign = toJs(tsFooterAlign)

const tsHeaderAlign = `<${_T}>
  <yh-button @click="visible = true">标题居右对齐</yh-button>

  <yh-dialog v-model="visible" title="居右对齐标题" header-align="right">
    <span>通过 header-align 属性，你可以独立控制标题的排列位置。</span>
  </yh-dialog>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const visible = ref(false)
</${_S}>`

const jsHeaderAlign = toJs(tsHeaderAlign)

const tsContentAlign = `<${_T}>
  <yh-button @click="visible = true">内容居中对齐</yh-button>

  <yh-dialog v-model="visible" title="内容对齐" content-align="center">
    <div style="padding: 10px 0;">
      <p>这是居中对齐的内容区域。</p>
      <p>对于一些声明式或展示性的弹窗，居中对齐可以提供更好的阅读体验。</p>
    </div>
  </yh-dialog>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const visible = ref(false)
</${_S}>`

const jsContentAlign = toJs(tsContentAlign)

const tsTypes = `<${_T}>
  <div style="display: flex; gap: 12px; flex-wrap: wrap;">
    <yh-button type="success" plain @click="visibleSuccess = true">成功类型</yh-button>
    <yh-button type="warning" plain @click="visibleWarning = true">警告类型</yh-button>
    <yh-button type="danger" plain @click="visibleError = true">错误类型</yh-button>
    <yh-button type="info" plain @click="visibleInfo = true">信息类型</yh-button>
  </div>

  <yh-dialog v-model="visibleSuccess" type="success" title="提交成功" content="您的申请已提交，我们将于 24 小时内处理。" />
  <yh-dialog v-model="visibleWarning" type="warning" title="删除确认" content="删除后数据将无法恢复，请谨慎操作。" />
  <yh-dialog v-model="visibleError" type="error" title="系统错误" content="网络连接中断，请检查您的网络设置。" />
  <yh-dialog v-model="visibleInfo" type="info" title="系统通知" content="新版本已发布，点击下方按钮了解更多。" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const visibleSuccess = ref(false)
const visibleWarning = ref(false)
const visibleError = ref(false)
const visibleInfo = ref(false)
</${_S}>`

const jsTypes = toJs(tsTypes)

const tsLoading = `<${_T}>
  <yh-button @click="visible = true">演示异步提交</yh-button>

  <yh-dialog v-model="visible" title="数据处理中" :loading="loading" content="正在同步云端数据，请稍后...">
    <template #footer>
      <yh-button @click="visible = false">取消</yh-button>
      <yh-button type="primary" :loading="loading" @click="submit">确定提交</yh-button>
    </template>
  </yh-dialog>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const visible = ref(false)
const loading = ref(false)
const submit = () => {
  loading.value = true
  setTimeout(() => { loading.value = false; visible.value = false }, 2000)
}
</${_S}>`

const jsLoading = toJs(tsLoading)

const tsRender = `<${_T}>
  <yh-button type="primary" plain @click="visible = true">渲染函数 Demo</yh-button>

  <yh-dialog 
    v-model="visible" 
    :title="renderTitle"
    :content="renderContent"
    :action="renderAction"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref, h } from 'vue'
const visible = ref(false)

const renderTitle = () => h('div', { style: 'display:flex; align-items:center; color:#409eff' }, [
  h('span', '🚀 渲染函数标题')
])
const renderContent = () => h('div', { style: 'padding: 20px; background: #f0f7ff; border-radius: 8px;' }, [
  h('h4', '通过 h() 函数动态生成的内容'),
  h('p', { style: 'color: #666' }, '这种方式在需要极高动态性的业务配置场景下非常有用。')
])
const renderAction = () => h('div', { style: 'display: flex; gap: 8px; justify-content: flex-end' }, [
  h('yh-button', { onClick: () => { visible.value = false } }, '我知道了')
])
</${_S}>`

const jsRender = toJs(tsRender)

const tsOrigin = `<${_T}>
  <yh-button @click="visible = true">从点击位置展开</yh-button>

  <yh-dialog v-model="visible" transform-origin="mouse" title="动画体验" content="弹窗会基于鼠标点击的位置智能计算 origin，提供极致的视觉连贯性。" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const visible = ref(false)
</${_S}>`

const jsOrigin = toJs(tsOrigin)

const tsAdvanced = `<${_T}>
  <div style="display: flex; gap: 16px;">
    <yh-button @click="visibleDrag = true">智能拖拽</yh-button>
    <yh-button @click="visibleGlass = true" type="primary" plain>旗舰级玻璃态</yh-button>
  </div>

  <yh-dialog v-model="visibleDrag" title="可自由移动的头" draggable>
    <p>按住此对话框的头部区域即可进行移动。我们内部计算了物理安全区，防止用户误将关闭按钮移出屏幕导致无法操作。</p>
  </yh-dialog>

  <yh-dialog v-model="visibleGlass" title="Premium 亚克力材质" glass>
    <div style="min-height: 120px;">
      <p>亚克力玻璃（Glassmorphism）不仅是透明，它包含：</p>
      <ul style="margin-top: 15px; color: #4a4a4a; line-height: 2;">
        <li>💎 动态模糊：24px 的高级动态背景虚化。</li>
        <li>🎨 色彩保真：通过 saturate 增加 190% 饱和度，使背景模糊更明亮。</li>
        <li>🎯 暗色自适应：自动从磨砂白切换到极客黑材质。</li>
      </ul>
    </div>
  </yh-dialog>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const visibleDrag = ref(false)
const visibleGlass = ref(false)
</${_S}>`

const jsAdvanced = toJs(tsAdvanced)

const tsNested = `<${_T}>
  <yh-button @click="visibleOuter = true" type="primary" plain>打开外部弹窗</yh-button>
  
  <yh-dialog v-model="visibleOuter" title="分步操作 (1/2)">
    <p>在 YH-UI 中嵌套对话框是安全的。即便打开多层，锁定滚动条的补偿逻辑也能确保背景不跳动。</p>
    <div style="margin-top: 32px;">
      <yh-button type="primary" @click="visibleInner = true">确认提交数据</yh-button>
    </div>

    <yh-dialog v-model="visibleInner" title="分步操作 (2/2)" width="400px" align-center>
      <div style="padding: 10px 0;">
        您确定要提交当前变更吗？此操作无法撤销。
      </div>
      <template #footer>
        <yh-button @click="visibleInner = false">返回修改</yh-button>
        <yh-button type="danger" @click="visibleInner = false; visibleOuter = false">确定提交</yh-button>
      </template>
    </yh-dialog>
  </yh-dialog>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const visibleOuter = ref(false)
const visibleInner = ref(false)
</${_S}>`

const jsNested = toJs(tsNested)

const tsNuxt = `<${_T}>
  <yh-button @click="visible = true">Nuxt 弹窗</yh-button>
  <yh-dialog v-model="visible" title="Nuxt 适配力">
    100% 兼容 Nuxt 3 的 SSR 渲染。
  </yh-dialog>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const visible = ref(false)
</${_S}>`

const jsNuxt = toJs(tsNuxt)

const tsSwap = `<${_T}>
  <yh-button @click="visible = true">交换按钮位置</yh-button>

  <yh-dialog 
    v-model="visible" 
    title="操作确认" 
    swap-footer-buttons
    content="确认按钮现在位于左侧，取消按钮位于右侧。"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const visible = ref(false)
</${_S}>`

const jsSwap = toJs(tsSwap)

const tsFunctional = `<${_T}>
  <div style="display: flex; gap: 16px;">
    <yh-button @click="handleHookCall">useDialog Hook</yh-button>
    <yh-button type="primary" @click="handleMethodCall">YhDialogMethod</yh-button>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { useDialog, YhDialogMethod } from '@yh-ui/components'

const { showDialog } = useDialog()

const handleHookCall = async () => {
  const { action } = await showDialog({
    title: 'Hook 方式调用',
    content: '这是通过 useDialog Hook 发起的弹窗，它会自动继承当前的应用上下文。',
    type: 'info'
  })
  // action 有 confirm | cancel | close 三种状态可选
}

const handleMethodCall = () => {
  YhDialogMethod.success({
    title: '指令式调用',
    content: '这是通过 YhDialogMethod.success 直接发起的弹窗，无需 v-model。',
    confirmText: '太棒了'
  })
}
</${_S}>`

const jsFunctional = toJs(tsFunctional)

const tsCallback = `<${_T}>
  <yh-button type="primary" plain @click="handleCallbackCall">异步反馈演示</yh-button>
</${_T}>

<${_S} setup lang="ts">
import { useDialog, YhMessage } from '@yh-ui/components'

const { showDialog } = useDialog()

const handleCallbackCall = async () => {
  // 1. 基于 Promise 的 action 反馈
  const { action } = await showDialog({
    title: '动作确认',
    content: '请选择您的操作，我们将通过 Message 组件告知结果。',
    confirmText: '我要确定',
    cancelText: '我要取消'
  })
  
  // 2. 使用 Message 组件进行反馈
  if (action === 'confirm') {
    YhMessage.success('您点击了确定按钮')
  } else if (action === 'cancel') {
    YhMessage.warning('您点击了取消按钮')
  } else {
    YhMessage.info('您关闭了弹窗')
  }
}
</${_S}>`

const jsCallback = toJs(tsCallback)

const tsFunctionalSwap = `<${_T}>
  <yh-button type="primary" plain @click="handleFunctionalSwap">函数式按钮互换</yh-button>
</${_T}>

<${_S} setup lang="ts">
import { useDialog } from '@yh-ui/components'

const { showDialog } = useDialog()

const handleFunctionalSwap = () => {
  showDialog({
    title: '操作确认',
    content: '确认按钮现在位于左侧，取消按钮位于右侧。',
    swapFooterButtons: true
  })
}
</${_S}>`

const jsFunctionalSwap = toJs(tsFunctionalSwap)

const tsFullscreen = `<${_T}>
  <yh-button type="primary" @click="visible = true">打开全屏弹窗</yh-button>

  <yh-dialog v-model="visible" title="全屏视界" fullscreen>
    <div style="padding: 24px;">
      <h3>旗舰级全屏体验</h3>
      <p>在开启 <code>fullscreen</code> 属性后，对话框将占据整个屏幕视口。这适用于复杂表单、沉浸式预览或大型数据展示场景。</p>
    </div>
  </yh-dialog>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const visible = ref(false)
</${_S}>`

const jsFullscreen = toJs(tsFullscreen)

const tsDestroy = `<${_T}>
  <div style="display: flex; gap: 12px;">
    <yh-button @click="visibleNormal = true">常规模式</yh-button>
    <yh-button type="primary" plain @click="visibleDestroy = true">开启销毁模式</yh-button>
  </div>

  <!-- 常规模式：状态保留 -->
  <yh-dialog v-model="visibleNormal" title="状态保留中">
    <div style="padding: 10px 0;">
      <p style="margin-bottom: 12px;">在该输入框中输入任何内容，关闭后再打开，内容<strong>依然存在</strong>：</p>
      <input style="border: 1px solid #ddd; padding: 10px; border-radius: 8px; width: 100%; outline: none;" placeholder="我是持久状态..." />
    </div>
  </yh-dialog>

  <!-- 销毁模式：性能优化 -->
  <yh-dialog v-model="visibleDestroy" title="状态销毁演示" destroy-on-close>
    <div style="padding: 10px 0;">
      <p style="margin-bottom: 12px;">在该输入框中输入内容，关闭后再打开，由于 DOM 已被卸载，内容会<strong>清空重置</strong>：</p>
      <input style="border: 1px solid #ddd; padding: 10px; border-radius: 8px; width: 100%; outline: none;" placeholder="我是瞬时状态..." />
      <p style="margin-top: 20px; color: #909399; font-size: 14px; line-height: 1.6;">
        💡 <strong>性能贴士</strong>：<br/>
        当弹窗内包含重量级组件时，开启此项可确保页面处于极低内存负载。
      </p>
    </div>
  </yh-dialog>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const visibleNormal = ref(false)
const visibleDestroy = ref(false)
</${_S}>`

const jsDestroy = toJs(tsDestroy)

</script>

# Dialog 对话框

旗舰级弹窗解决方案。在兼容业内主流交互规范的基础上，针对**拖拽边界感**、**焦点捕获 (Focus Trap)** 以及**旗舰级亚克力视觉 (Glassmorphism)** 进行了深度增强，为生产环境提供极致的视觉与操作连贯性。

## 基础用法

最简单的对话框展示。得益于内置的**智能页脚 (Smart Footer)** 系统，组件默认会自动渲染标准的操作按钮（取消/确定），无需额外编写插槽即可实现开箱即用的交互体验。

<DemoBlock title="基础交互" :ts-code="tsBasic" :js-code="jsBasic">
<yh-button @click="visibleBasic = true">打开对话框</yh-button>
<YhDialog v-model="visibleBasic" title="标准设计预览" @confirm="visibleBasic = false" @cancel="visibleBasic = false">
<span>YH-UI 的对话框采用了定制的贝塞尔动效，开启感极其轻盈，配合 16px 的大圆角设计，兼顾了现代感与亲和力。</span>
</YhDialog>
</DemoBlock>

## 居中展示

除了常规的顶部偏移，我们提供了更灵活的视口对齐策略。通过 `align-center` 与 `center` 属性，可以针对不同业务场景实现垂直居中或全场景的水平对齐。

<DemoBlock title="居中对齐模式" :ts-code="tsCenter" :js-code="jsCenter">
<div style="display: flex; gap: 16px;">
<yh-button @click="visibleAlignCenter = true">垂直居中</yh-button>
<yh-button @click="visibleCenter = true" type="primary">全居中模式</yh-button>
</div>

<YhDialog v-model="visibleAlignCenter" title="内容垂直居中" align-center @confirm="visibleAlignCenter = false" @cancel="visibleAlignCenter = false">
<p>通过属性 <code>align-center</code>，对话框将忽略 <code>top</code> 设置并垂直居中。</p>
</YhDialog>

<YhDialog v-model="visibleCenter" title="Center Mode" center align-center>
<div style="text-align: center; padding: 20px 0;">
<div style="width: 64px; height: 64px; border-radius: 50%; background: #f0f9eb; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
<yh-icon name="check" style="color: #67c23a; font-size: 32px;" />
</div>
<h3 style="margin-bottom: 12px; font-weight: 700;">操作确认</h3>
<p style="color: var(--yh-text-color-regular); font-size: 15px;">当 <code>center</code> 设为 true 时，弹窗的头部、底部以及主体内容会自动水平均中对齐。</p>
</div>
<template #footer>
<yh-button @click="visibleCenter = false">取消</yh-button>
<yh-button type="primary" @click="visibleCenter = false">立即提交</yh-button>
</template>
</YhDialog>
</DemoBlock>

<DemoBlock title="全屏展示" :ts-code="tsFullscreen" :js-code="jsFullscreen">
  <yh-button type="primary" @click="visibleFullscreen = true">打开全屏弹窗</yh-button>
  <YhDialog v-model="visibleFullscreen" title="全屏视界" fullscreen @confirm="visibleFullscreen = false" @cancel="visibleFullscreen = false">
    <div style="padding: 24px;">
      <h3>旗舰级全屏体验</h3>
      <p>在开启 <code>fullscreen</code> 属性后，对话框将占据整个屏幕视口。这适用于复杂表单、沉浸式预览或大型数据展示场景。</p>
    </div>
  </YhDialog>
</DemoBlock>

## 底部对齐

你可以通过 `footer-align` 属性控制底部按钮的水平对齐方式。默认情况下，按钮组在右侧对齐。

<DemoBlock title="底部对齐方式" :ts-code="tsFooterAlign" :js-code="jsFooterAlign">
<div style="display: flex; gap: 12px;">
<yh-button @click="visibleFooterLeft = true">居左对齐</yh-button>
<yh-button @click="visibleFooterCenter = true">居中对齐</yh-button>
<yh-button @click="visibleFooterRight = true">居右对齐 (默认)</yh-button>
</div>

<YhDialog v-model="visibleFooterLeft" title="居左对齐" footer-align="left" @confirm="visibleFooterLeft = false" @cancel="visibleFooterLeft = false">
<span>底部按钮现在排列在左侧。</span>
</YhDialog>

<YhDialog v-model="visibleFooterCenter" title="居中对齐" footer-align="center" @confirm="visibleFooterCenter = false" @cancel="visibleFooterCenter = false">
<span>底部按钮现在排列在中间。</span>
</YhDialog>

<YhDialog v-model="visibleFooterRight" title="居右对齐" footer-align="right" @confirm="visibleFooterRight = false" @cancel="visibleFooterRight = false">
<span>这是默认的排列方式。</span>
</YhDialog>
</DemoBlock>

<DemoBlock title="标题对齐" :ts-code="tsHeaderAlign" :js-code="jsHeaderAlign">
  <yh-button @click="visibleHeaderAlign = true">标题居右</yh-button>
  <YhDialog v-model="visibleHeaderAlign" title="居右对齐标题" header-align="right" @confirm="visibleHeaderAlign = false" @cancel="visibleHeaderAlign = false">
    <span>通过 header-align 属性，你可以独立控制标题的排列位置。</span>
  </YhDialog>
</DemoBlock>

<DemoBlock title="内容主体对齐" :ts-code="tsContentAlign" :js-code="jsContentAlign">
  <yh-button @click="visibleContentAlign = true">主体居中</yh-button>
  <YhDialog v-model="visibleContentAlign" title="内容对齐" content-align="center" @confirm="visibleContentAlign = false" @cancel="visibleContentAlign = false">
    <div style="padding: 10px 0;">
      <p>这是居中对齐的内容区域。</p>
      <p>对于一些声明式或展示性的弹窗，居中对齐可以提供更好的阅读体验。</p>
    </div>
  </YhDialog>
</DemoBlock>

## 功能增强 (Premium Features)

YH-UI 提供了丰富的增强配置，支持语义化类型映射、原子级加载状态反馈以及全透明的自定义渲染控制器。

<DemoBlock title="语义化类型与图标" :ts-code="tsTypes" :js-code="jsTypes">
<div style="display: flex; gap: 12px; flex-wrap: wrap;">
<yh-button type="success" plain @click="visibleSuccess = true">成功类型</yh-button>
<yh-button type="warning" plain @click="visibleWarning = true">警告类型</yh-button>
<yh-button type="danger" plain @click="visibleError = true">错误类型</yh-button>
<yh-button type="info" plain @click="visibleInfo = true">信息类型</yh-button>
</div>

<YhDialog v-model="visibleSuccess" type="success" title="提交成功" content="您的申请已提交，我们将于 24 小时内处理。" />
<YhDialog v-model="visibleWarning" type="warning" title="删除确认" content="删除后数据将无法恢复，请谨慎操作。" />
<YhDialog v-model="visibleError" type="error" title="系统错误" content="网络连接中断，请检查您的网络设置。" />
<YhDialog v-model="visibleInfo" type="info" title="系统通知" content="新版本已发布，点击下方按钮了解更多。" />
</DemoBlock>


<DemoBlock title="加载状态与异步控制" :ts-code="tsLoading" :js-code="jsLoading">
<yh-button @click="handleAsyncOpen">演示异步提交</yh-button>

<YhDialog v-model="visibleLoading" title="数据处理中" :loading="loadingState" content="正在同步云端数据，请稍后...">
<template #footer>
<yh-button @click="visibleLoading = false">取消</yh-button>
<yh-button type="primary" :loading="loadingState" @click="simulateSubmit">确定提交</yh-button>
</template>
</YhDialog>
</DemoBlock>

<DemoBlock title="渲染函数支持" :ts-code="tsRender" :js-code="jsRender">
<yh-button type="primary" plain @click="visibleRender = true">渲染函数 Demo</yh-button>

<YhDialog 
  v-model="visibleRender" 
  :title="renderTitle"
  :content="renderContent"
  :action="renderAction"
/>
</DemoBlock>

<DemoBlock title="关闭销毁 (性能优化)" :ts-code="tsDestroy" :js-code="jsDestroy">
  <div style="display: flex; gap: 12px;">
    <yh-button @click="visibleDestroyNormal = true">常规模式</yh-button>
    <yh-button type="primary" plain @click="visibleDestroy = true">开启销毁模式</yh-button>
  </div>

  <!-- 常规模组 -->
  <YhDialog v-model="visibleDestroyNormal" title="状态保留中">
    <div style="padding: 10px 0;">
      <p style="margin-bottom: 12px;">在该输入框中输入任何内容，关闭后再打开，内容<strong>依然存在</strong>：</p>
      <input style="border: 1px solid var(--yh-border-color); padding: 10px; border-radius: 8px; width: 100%; outline: none;" placeholder="我是持久状态..." />
    </div>
  </YhDialog>

  <!-- 销毁模块 -->
  <YhDialog v-model="visibleDestroy" title="状态销毁演示" destroy-on-close>
    <div style="padding: 10px 0;">
      <p style="margin-bottom: 12px;">在该输入框中输入内容，关闭后再打开，由于 DOM 已被卸载，内容会<strong>清空重置</strong>：</p>
      <input style="border: 1px solid var(--yh-border-color); padding: 10px; border-radius: 8px; width: 100%; outline: none;" placeholder="我是瞬时状态..." />
      <p style="margin-top: 20px; color: #909399; font-size: 14px; line-height: 1.6;">
        💡 <strong>性能贴士</strong>：<br/>
        当弹窗内包含重量级组件时，开启此项可确保页面处于极低内存负载。
      </p>
    </div>
  </YhDialog>
</DemoBlock>

<DemoBlock title="鼠标起源动画" :ts-code="tsOrigin" :js-code="jsOrigin">
<div style="padding: 24px; border: 1px dashed var(--yh-border-color); text-align: center; border-radius: 12px;">
<yh-button @click="visibleOrigin = true">从点击位置展开</yh-button>
</div>
<YhDialog v-model="visibleOrigin" transform-origin="mouse" title="动画体验" content="开启 mouse 模式后，弹窗会基于鼠标点击的位置智能计算 origin，提供极致的视觉连贯性。" />
</DemoBlock>

## 高级交互特性

YH-UI 致力于打磨每一个像素级的交互反馈。这包括了基于视口物理安全边界的拖拽算法，以及旗舰级的玻璃态视觉渲染。

<DemoBlock title="顶级交互增强" :ts-code="tsAdvanced" :js-code="jsAdvanced">
<div style="display: flex; gap: 16px;">
<yh-button @click="visibleDraggable = true">智能拖拽</yh-button>
<yh-button @click="visibleGlass = true" type="primary" plain>旗舰级玻璃态</yh-button>
</div>

<YhDialog v-model="visibleDraggable" title="可自由移动的头" draggable>
<p>按住此对话框的头部区域即可进行移动。我们内部计算了物理安全区，防止用户误将关闭按钮移出屏幕导致无法操作。</p>
</YhDialog>

<YhDialog v-model="visibleGlass" title="Premium 亚克力材质" glass>
<div style="min-height: 120px;">
<p>亚克力玻璃（Glassmorphism）不仅是透明，它包含：</p>
<ul style="margin-top: 15px; color: #4a4a4a; line-height: 2;">
<li>💎 <strong>动态模糊</strong>：24px 的高级动态背景虚化。</li>
<li>🎨 <strong>色彩保真</strong>：通过 saturate 增加 190% 饱和度，使背景模糊更明亮。</li>
<li>🎯 <strong>暗色自适应</strong>：自动从磨砂白切换到极客黑材质。</li>
</ul>
</div>
</YhDialog>
</DemoBlock>

## 在 Nuxt 中使用

YH-UI 完美适配 Nuxt 3。你可以直接在 `app.vue` 或 any 页面中使用。

::: tip 自动导入
如果你使用了 `unplugin-vue-components/resolvers`，`YhDialog` 将会被自动按需加载并包含完整的样式。
:::

<DemoBlock title="Nuxt 适配" :ts-code="tsNuxt" :js-code="jsNuxt">
<yh-button @click="visibleNuxt = true">Nuxt 弹窗</yh-button>
<YhDialog v-model="visibleNuxt" title="Nuxt 适配力">
  100% 兼容 Nuxt 3 的 SSR 渲染。
</YhDialog>
</DemoBlock>

<DemoBlock title="按钮位置互换" :ts-code="tsSwap" :js-code="jsSwap">
  <yh-button @click="visibleSwap = true">演示按钮互换</yh-button>
  <YhDialog 
    v-model="visibleSwap" 
    title="操作确认" 
    swap-footer-buttons
    content="确认按钮现在位于左侧，取消按钮位于右侧。"
  />
</DemoBlock>

## 函数式调用

在某些场景下，你可能希望跳过 `v-model` 的模板声明，直接通过代码发起弹窗。YH-UI 提供了基于 Promise 的函数式调用方案，支持 Hook 形式与静态方法形式。

<DemoBlock title="函数式调用演示" :ts-code="tsFunctional" :js-code="jsFunctional">
<div style="display: flex; gap: 16px;">
<yh-button @click="handleHookCall">useDialog Hook</yh-button>
<yh-button type="primary" @click="handleMethodCall">YhDialogMethod</yh-button>
</div>
</DemoBlock>

<DemoBlock title="异步反馈与回调" :ts-code="tsCallback" :js-code="jsCallback">
<yh-button type="primary" plain @click="handleCallbackCall">异步反馈演示</yh-button>
</DemoBlock>

<DemoBlock title="函数式按钮互换" :ts-code="tsFunctionalSwap" :js-code="jsFunctionalSwap">
<yh-button type="primary" plain @click="handleFunctionalSwap">演示按钮互换</yh-button>
</DemoBlock>

## 调用方式

你可以根据业务复杂度选择最合适的调用方式。

### 组合式 API (推荐)
通过 `v-model` 双向绑定，这是最符合 Vue 3 设计心智的方式。

### 单独引用
在子组件中手动引入 `YhDialog` 使用。

```ts
import { YhDialog } from '@yh-ui/components'
```

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 是否显示对话框 | `boolean` | `false` |
| title | 对话框标题，支持渲染函数 | `string \| (() => VNode)` | - |
| type | 对话框类型 | `'success' \| 'warning' \| 'error' \| 'info' \| 'default'` | `'default'` |
| show-icon | 是否显示语义化图标 | `boolean` | `true` |
| loading | 是否显示主体加载状态 | `boolean` | `false` |
| content | 对话框内容，支持渲染函数 | `string \| (() => VNode)` | - |
| action | 底部操作区域内容，支持渲染函数 | `(() => VNode)` | - |
| transform-origin | 动画起源位置 | `'mouse' \| 'center'` | `'mouse'` |
| width | 对话框宽度 | `string \| number` | `'50%'` |
| top | 距离顶部的距离（非居中模式有效） | `string` | `'15vh'` |
| fullscreen | 是否全屏展示 | `boolean` | `false` |
| align-center | 是否在视口中垂直居中 | `boolean` | `false` |
| center | **全居中模式**：Header, Body, Footer 内容全部水平居中 | `boolean` | `false` |
| glass | 开启旗舰级亚克力（玻璃）材质 | `boolean` | `false` |
| draggable | 是否开启物理拖拽功能 | `boolean` | `false` |
| overflow | 是否允许拖拽超出视口边界 | `boolean` | `false` |
| modal | 是否显示遮罩层 | `boolean` | `true` |
| lock-scroll | 出现时锁定视口滚动 | `boolean` | `true` |
| close-on-click-modal | 点击背景遮罩层是否关闭弹窗 | `boolean` | `true` |
| close-on-press-escape | 按下 ESC 键是否关闭弹窗 | `boolean` | `true` |
| show-close | 是否显示关闭按钮 | `boolean` | `true` |
| close-icon | 自定义关闭图标 | `string` | `'close'` |
| destroy-on-close | 关闭时是否销毁 Dialog 中的内容 | `boolean` | `false` |
| show-footer | 是否显示默认页脚按钮 | `boolean` | `true` |
| cancel-text | 取消按钮文案 | `string` | `'取消'` |
| confirm-text | 确定按钮文案 | `string` | `'确定'` |
| before-close | 关闭前的钩子，参数为 `(done: () => void)` | `Function` | - |
| teleport-to | 挂载目标 DOM 节点 | `string \| HTMLElement` | `'body'` |
| header-align-center | 对话框标题是否水平居中 | `boolean` | `false` |
| footer-align-center | 对话框底部按钮是否水平居中 | `boolean` | `false` |
| style | 整体自定义样式 | `string \| CSSProperties` | - |
| title-class | 标题自定义类名 | `string` | - |
| title-style | 标题自定义样式 | `string \| CSSProperties` | - |
| content-class | 主体自定义类名 | `string` | - |
| content-style | 主体自定义样式 | `string \| CSSProperties` | - |
| action-class | 底部自定义类名 | `string` | - |
| action-style | 底部自定义样式 | `string \| CSSProperties` | - |
| modal-class | 遮罩层自定义类名 | `string` | - |
| custom-class | 根容器自定义类名 | `string` | - |
| z-index | 基础层级起点 | `number` | `2000` |
| auto-focus | 是否自动聚焦第一个可聚焦元素 | `boolean` | `true` |
| swap-footer-buttons | 是否交换底部“确认”与“取消”按钮的位置 | `boolean` | `false` |
| footer-align | 底部按钮对齐方式 | `'left' \| 'center' \| 'right'` | `'right'` |
| header-align | 标题对齐方式 | `'left' \| 'center' \| 'right'` | `'left'` |
| content-align | 内容对齐方式 | `'left' \| 'center' \| 'right'` | `'left'` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 对话框主体内容区域 |
| header | 自定义头部区域。若使用该插槽，`title` 属性将失效 |
| footer | 自定义底部操作按钮区域。若使用该插槽，内置按钮将失效 |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 显隐状态变更时触发 | `(value: boolean)` |
| open | 对话框显隐状态变为 true 时触发 | - |
| opened | 对话框打开动画播放完成时触发 | - |
| close | 对话框显隐状态变为 false 时触发 | - |
| closed | 对话框关闭动画播放完成且销毁后触发 | - |
| confirm | 点击默认页脚的“确定”按钮时触发 | - |
| cancel | 点击默认页脚的“取消”按钮时触发 | - |
| dragStart | 点击 header 开始拖移时触发 | `(e: MouseEvent)` |
| dragMove | 拖移过程中持续触发 | `(e: MouseEvent)` |
| dragEnd | 拖移结束时触发 | `(e: MouseEvent)` |

### Expose

| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| visible | 响应式显隐状态 | `Ref<boolean>` |
| dialogRef | 对话框 DOM 引用 | `Ref<HTMLElement>` |
| handleClose | 执行关闭逻辑（会触发 before-close） | `() => void` |
| handleCancel | 执行取消逻辑（触发 cancel 事件并关闭） | `() => void` |
| handleConfirm | 执行确定逻辑（触发 confirm 事件并关闭） | `() => void` |

### 主题变量 (CSS Variables)

你通过重写以下 CSS 变量来定制 Dialog 的全局视觉。

| 变量名 | 默认值 | 说明 |
| --- | --- | --- |
| `--yh-dialog-margin-top` | `15vh` | 对话框顶部边距 |
| `--yh-bg-color-overlay` | `#ffffff` | 对话框背景颜色 |
| `--yh-radius-lg` | `16px` | 对话框圆角大小 |
| `--yh-text-color-primary` | `#1a1a1a` | 标题颜色 |
| `--yh-color-success` | `#67c23a` | 成功态图标/按钮颜色 |
| `--yh-color-warning` | `#e6a23c` | 警告态图标/按钮颜色 |
| `--yh-color-danger` | `#f56c6c` | 错误态图标/按钮颜色 |
| `--yh-color-info` | `#909399` | 信息态图标/按钮颜色 |
| `--yh-text-color-secondary` | `#909399` | 关闭按钮颜色 |
| `--yh-text-color-regular` | `#4a4a4a` | 正文内容颜色 |
| `--yh-border-color-light` | `rgba(0,0,0,0.05)` | 关闭按钮悬浮背景 |
