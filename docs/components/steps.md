# Steps 步骤条

引导用户按照流程完成任务的导航条。融合了 Element Plus、Naive UI、Ant Design 各家之长，并首创了导航风格与可点击切换功能。

<script setup lang="ts">
import { ref } from 'vue'

const active = ref(1)

const next = () => {
  if (active.value++ > 2) active.value = 0
}

const prev = () => {
  if (active.value-- < 1) active.value = 2
}

const handleChange = (index: number) => {
  active.value = index
}

// TS 版本示例代码
const tsBasic = `<template>
  <yh-steps :active="active">
    <yh-step title="步骤 1" description="这是一段描述文字" />
    <yh-step title="步骤 2" description="这是一段描述文字" />
    <yh-step title="步骤 3" description="这是一段描述文字" />
  </yh-steps>
  <div style="margin-top: 20px">
    <yh-button @click="prev" :disabled="active === 0">上一步</yh-button>
    <yh-button type="primary" @click="next">下一步</yh-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref<number>(1)

const next = () => {
  if (active.value++ > 2) active.value = 0
}

const prev = () => {
  if (active.value-- < 1) active.value = 2
}
<\/script>`

const jsBasic = `<template>
  <yh-steps :active="active">
    <yh-step title="步骤 1" description="这是一段描述文字" />
    <yh-step title="步骤 2" description="这是一段描述文字" />
    <yh-step title="步骤 3" description="这是一段描述文字" />
  </yh-steps>
  <div style="margin-top: 20px">
    <yh-button @click="prev" :disabled="active === 0">上一步</yh-button>
    <yh-button type="primary" @click="next">下一步</yh-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const active = ref(1)

const next = () => {
  if (active.value++ > 2) active.value = 0
}

const prev = () => {
  if (active.value-- < 1) active.value = 2
}
<\/script>`

const tsVertical = `<template>
  <yh-steps :active="1" direction="vertical" style="height: 200px">
    <yh-step title="步骤 1" description="这是一段描述文字" />
    <yh-step title="步骤 2" description="这是一段描述文字" />
    <yh-step title="步骤 3" description="这是一段描述文字" />
  </yh-steps>
</template>

<script setup lang="ts">
// 无需额外脚本
<\/script>`

const jsVertical = `<template>
  <yh-steps :active="1" direction="vertical" style="height: 200px">
    <yh-step title="步骤 1" description="这是一段描述文字" />
    <yh-step title="步骤 2" description="这是一段描述文字" />
    <yh-step title="步骤 3" description="这是一段描述文字" />
  </yh-steps>
</template>

<script setup>
// 无需额外脚本
<\/script>`

const tsSimple = `<template>
  <yh-steps :active="1" simple>
    <yh-step title="步骤 1" />
    <yh-step title="步骤 2" />
    <yh-step title="步骤 3" />
  </yh-steps>
</template>

<script setup lang="ts">
// 无需额外脚本
<\/script>`

const jsSimple = `<template>
  <yh-steps :active="1" simple>
    <yh-step title="步骤 1" />
    <yh-step title="步骤 2" />
    <yh-step title="步骤 3" />
  </yh-steps>
</template>

<script setup>
// 无需额外脚本
<\/script>`

const tsDot = `<template>
  <yh-steps :active="1" progress-dot>
    <yh-step title="步骤 1" description="这是一段描述文字" />
    <yh-step title="步骤 2" description="这是一段描述文字" />
    <yh-step title="步骤 3" description="这是一段描述文字" />
  </yh-steps>
</template>

<script setup lang="ts">
// 无需额外脚本
<\/script>`

const jsDot = `<template>
  <yh-steps :active="1" progress-dot>
    <yh-step title="步骤 1" description="这是一段描述文字" />
    <yh-step title="步骤 2" description="这是一段描述文字" />
    <yh-step title="步骤 3" description="这是一段描述文字" />
  </yh-steps>
</template>

<script setup>
// 无需额外脚本
<\/script>`

const tsNavigation = `<template>
  <yh-steps :active="1" progress-dot="navigation">
    <yh-step title="步骤 1" description="确认订单" />
    <yh-step title="步骤 2" description="支付订单" />
    <yh-step title="步骤 3" description="完成" />
  </yh-steps>
</template>

<script setup lang="ts">
// 无需额外脚本
<\/script>`

const jsNavigation = `<template>
  <yh-steps :active="1" progress-dot="navigation">
    <yh-step title="步骤 1" description="确认订单" />
    <yh-step title="步骤 2" description="支付订单" />
    <yh-step title="步骤 3" description="完成" />
  </yh-steps>
</template>

<script setup>
// 无需额外脚本
<\/script>`

const tsStatus = `<template>
  <yh-steps :active="1">
    <yh-step title="完成" status="finish" />
    <yh-step title="进行中" status="process" />
    <yh-step title="出错" status="error" />
    <yh-step title="待完成" status="wait" />
  </yh-steps>
  
  <yh-steps :active="1" style="margin-top: 20px">
    <yh-step title="成功" status="success" />
    <yh-step title="进行中" />
    <yh-step title="等待" />
  </yh-steps>
</template>

<script setup lang="ts">
// 无需额外脚本
<\/script>`

const jsStatus = `<template>
  <yh-steps :active="1">
    <yh-step title="完成" status="finish" />
    <yh-step title="进行中" status="process" />
    <yh-step title="出错" status="error" />
    <yh-step title="待完成" status="wait" />
  </yh-steps>
  
  <yh-steps :active="1" style="margin-top: 20px">
    <yh-step title="成功" status="success" />
    <yh-step title="进行中" />
    <yh-step title="等待" />
  </yh-steps>
</template>

<script setup>
// 无需额外脚本
<\/script>`

const tsCenter = `<template>
  <yh-steps :active="1" align-center>
    <yh-step title="步骤 1" description="这是一段描述文字" />
    <yh-step title="步骤 2" description="这是一段描述文字" />
    <yh-step title="步骤 3" description="这是一段描述文字" />
  </yh-steps>
</template>

<script setup lang="ts">
// 无需额外脚本
<\/script>`

const jsCenter = `<template>
  <yh-steps :active="1" align-center>
    <yh-step title="步骤 1" description="这是一段描述文字" />
    <yh-step title="步骤 2" description="这是一段描述文字" />
    <yh-step title="步骤 3" description="这是一段描述文字" />
  </yh-steps>
</template>

<script setup>
// 无需额外脚本
<\/script>`

const tsClickable = `<template>
  <yh-steps :active="active" clickable @change="handleChange">
    <yh-step title="步骤 1" />
    <yh-step title="步骤 2" />
    <yh-step title="步骤 3" />
  </yh-steps>
  <p style="margin-top: 12px; color: #666">当前步骤：{{ active }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref<number>(1)

const handleChange = (index: number) => {
  active.value = index
}
<\/script>`

const jsClickable = `<template>
  <yh-steps :active="active" clickable @change="handleChange">
    <yh-step title="步骤 1" />
    <yh-step title="步骤 2" />
    <yh-step title="步骤 3" />
  </yh-steps>
  <p style="margin-top: 12px; color: #666">当前步骤：{{ active }}</p>
</template>

<script setup>
import { ref } from 'vue'

const active = ref(1)

const handleChange = (index) => {
  active.value = index
}
<\/script>`

const tsSpace = `<template>
  <yh-steps :active="1" :space="200">
    <yh-step title="步骤 1" />
    <yh-step title="步骤 2" />
    <yh-step title="步骤 3" />
  </yh-steps>
  
  <yh-steps :active="1" space="30%" style="margin-top: 20px">
    <yh-step title="步骤 1" />
    <yh-step title="步骤 2" />
    <yh-step title="步骤 3" />
  </yh-steps>
</template>

<script setup lang="ts">
// 无需额外脚本
<\/script>`

const jsSpace = `<template>
  <yh-steps :active="1" :space="200">
    <yh-step title="步骤 1" />
    <yh-step title="步骤 2" />
    <yh-step title="步骤 3" />
  </yh-steps>
  
  <yh-steps :active="1" space="30%" style="margin-top: 20px">
    <yh-step title="步骤 1" />
    <yh-step title="步骤 2" />
    <yh-step title="步骤 3" />
  </yh-steps>
</template>

<script setup>
// 无需额外脚本
<\/script>`

const tsFinishStatus = `<template>
  <yh-steps :active="2" finish-status="success">
    <yh-step title="步骤 1" />
    <yh-step title="步骤 2" />
    <yh-step title="步骤 3" />
  </yh-steps>
</template>

<script setup lang="ts">
// 无需额外脚本
<\/script>`

const jsFinishStatus = `<template>
  <yh-steps :active="2" finish-status="success">
    <yh-step title="步骤 1" />
    <yh-step title="步骤 2" />
    <yh-step title="步骤 3" />
  </yh-steps>
</template>

<script setup>
// 无需额外脚本
<\/script>`

const tsSlots = `<template>
  <yh-steps :active="1">
    <yh-step>
      <template #icon>🎉</template>
      <template #title>自定义标题</template>
      <template #description>自定义描述内容</template>
    </yh-step>
    <yh-step title="步骤 2" description="普通步骤" />
    <yh-step>
      <template #icon>✅</template>
      <template #title>完成</template>
    </yh-step>
  </yh-steps>
</template>

<script setup lang="ts">
// 无需额外脚本
<\/script>`

const jsSlots = `<template>
  <yh-steps :active="1">
    <yh-step>
      <template #icon>🎉</template>
      <template #title>自定义标题</template>
      <template #description>自定义描述内容</template>
    </yh-step>
    <yh-step title="步骤 2" description="普通步骤" />
    <yh-step>
      <template #icon>✅</template>
      <template #title>完成</template>
    </yh-step>
  </yh-steps>
</template>

<script setup>
// 无需额外脚本
<\/script>`

const tsNuxt = `<template>
  <!-- 直接使用，支持自动导入 -->
  <YhSteps :active="1">
    <YhStep title="步骤 1" />
    <YhStep title="步骤 2" />
    <YhStep title="步骤 3" />
  </YhSteps>
</template>

<script setup lang="ts">
// Nuxt 3 自动导入，无需手动引入
<\/script>`

const jsNuxt = `<template>
  <!-- 直接使用，支持自动导入 -->
  <YhSteps :active="1">
    <YhStep title="步骤 1" />
    <YhStep title="步骤 2" />
    <YhStep title="步骤 3" />
  </YhSteps>
</template>

<script setup>
// Nuxt 3 自动导入，无需手动引入
<\/script>`

// ========== 新增功能示例 ==========
const activeSmall = ref(1)
const activeProgress = ref(1)
const progressValue = ref(50)

const tsSmall = `<template>
  <yh-steps :active="1" size="small">
    <yh-step title="步骤 1" description="描述" />
    <yh-step title="步骤 2" description="描述" />
    <yh-step title="步骤 3" description="描述" />
  </yh-steps>
</template>

<script setup lang="ts">
// 无需额外脚本
<\/script>`

const jsSmall = `<template>
  <yh-steps :active="1" size="small">
    <yh-step title="步骤 1" description="描述" />
    <yh-step title="步骤 2" description="描述" />
    <yh-step title="步骤 3" description="描述" />
  </yh-steps>
</template>

<script setup>
// 无需额外脚本
<\/script>`

const tsResponsive = `<template>
  <!-- 窗口宽度 < 768px 时自动切换为垂直布局 -->
  <yh-steps :active="1" responsive>
    <yh-step title="步骤 1" description="这是描述" />
    <yh-step title="步骤 2" description="这是描述" />
    <yh-step title="步骤 3" description="这是描述" />
  </yh-steps>
</template>

<script setup lang="ts">
// 无需额外脚本
<\/script>`

const jsResponsive = `<template>
  <!-- 窗口宽度 < 768px 时自动切换为垂直布局 -->
  <yh-steps :active="1" responsive>
    <yh-step title="步骤 1" description="这是描述" />
    <yh-step title="步骤 2" description="这是描述" />
    <yh-step title="步骤 3" description="这是描述" />
  </yh-steps>
</template>

<script setup>
// 无需额外脚本
<\/script>`

const tsProgress = `<template>
  <yh-steps :active="active" show-progress>
    <yh-step title="步骤 1" :progress="100" />
    <yh-step title="步骤 2" :progress="progressValue" />
    <yh-step title="步骤 3" :progress="0" />
  </yh-steps>
  <div style="margin-top: 16px">
    <span>当前步骤进度：</span>
    <yh-slider v-model="progressValue" :min="0" :max="100" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const active = ref<number>(1)
const progressValue = ref<number>(50)
<\/script>`

const jsProgress = `<template>
  <yh-steps :active="active" show-progress>
    <yh-step title="步骤 1" :progress="100" />
    <yh-step title="步骤 2" :progress="progressValue" />
    <yh-step title="步骤 3" :progress="0" />
  </yh-steps>
  <div style="margin-top: 16px">
    <span>当前步骤进度：</span>
    <yh-slider v-model="progressValue" :min="0" :max="100" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
const active = ref(1)
const progressValue = ref(50)
<\/script>`

const tsTimeline = `<template>
  <yh-steps :active="2" direction="vertical" show-timeline>
    <yh-step title="创建订单" description="订单已提交" time="2024-01-01 10:00" />
    <yh-step title="付款成功" description="支付完成" time="2024-01-01 10:05" />
    <yh-step title="商品发货" description="物流已揽收" time="2024-01-02 08:00" />
    <yh-step title="确认收货" description="等待签收" time="" />
  </yh-steps>
</template>

<script setup lang="ts">
// 无需额外脚本
<\/script>`

const jsTimeline = `<template>
  <yh-steps :active="2" direction="vertical" show-timeline>
    <yh-step title="创建订单" description="订单已提交" time="2024-01-01 10:00" />
    <yh-step title="付款成功" description="支付完成" time="2024-01-01 10:05" />
    <yh-step title="商品发货" description="物流已揽收" time="2024-01-02 08:00" />
    <yh-step title="确认收货" description="等待签收" time="" />
  </yh-steps>
</template>

<script setup>
// 无需额外脚本
<\/script>`

const tsDisabled = `<template>
  <yh-steps :active="active" clickable @change="handleChange">
    <yh-step title="步骤 1" />
    <yh-step title="步骤 2 (禁用)" disabled />
    <yh-step title="步骤 3" />
  </yh-steps>
  <p style="margin-top: 12px; color: #666">当前步骤：{{ active }}，第二步被禁用无法点击</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const active = ref<number>(0)
const handleChange = (index: number) => {
  active.value = index
}
<\/script>`

const jsDisabled = `<template>
  <yh-steps :active="active" clickable @change="handleChange">
    <yh-step title="步骤 1" />
    <yh-step title="步骤 2 (禁用)" disabled />
    <yh-step title="步骤 3" />
  </yh-steps>
  <p style="margin-top: 12px; color: #666">当前步骤：{{ active }}，第二步被禁用无法点击</p>
</template>

<script setup>
import { ref } from 'vue'
const active = ref(0)
const handleChange = (index) => {
  active.value = index
}
<\/script>`

const tsLabelPlacement = `<template>
  <yh-steps :active="1" label-placement="vertical">
    <yh-step title="步骤 1" description="这是描述" />
    <yh-step title="步骤 2" description="这是描述" />
    <yh-step title="步骤 3" description="这是描述" />
  </yh-steps>
</template>

<script setup lang="ts">
// 无需额外脚本
<\/script>`

const jsLabelPlacement = `<template>
  <yh-steps :active="1" label-placement="vertical">
    <yh-step title="步骤 1" description="这是描述" />
    <yh-step title="步骤 2" description="这是描述" />
    <yh-step title="步骤 3" description="这是描述" />
  </yh-steps>
</template>

<script setup>
// 无需额外脚本
<\/script>`

const activeLazy = ref(0)
const tsLazy = `<template>
  <yh-steps :active="active" direction="vertical">
    <yh-step title="步骤 1">
      <div>步骤 1 的详细内容（立即加载）</div>
    </yh-step>
    <yh-step title="步骤 2" lazy>
      <div>步骤 2 的详细内容（延迟加载，首次激活时才渲染）</div>
    </yh-step>
    <yh-step title="步骤 3" lazy>
      <div>步骤 3 的详细内容（延迟加载）</div>
    </yh-step>
  </yh-steps>
  <yh-button @click="active++" style="margin-top: 12px">下一步</yh-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const active = ref<number>(0)
<\/script>`

const jsLazy = `<template>
  <yh-steps :active="active" direction="vertical">
    <yh-step title="步骤 1">
      <div>步骤 1 的详细内容（立即加载）</div>
    </yh-step>
    <yh-step title="步骤 2" lazy>
      <div>步骤 2 的详细内容（延迟加载，首次激活时才渲染）</div>
    </yh-step>
    <yh-step title="步骤 3" lazy>
      <div>步骤 3 的详细内容（延迟加载）</div>
    </yh-step>
  </yh-steps>
  <yh-button @click="active++" style="margin-top: 12px">下一步</yh-button>
</template>

<script setup>
import { ref } from 'vue'
const active = ref(0)
<\/script>`

const activeDisabled = ref(0)
const handleDisabledChange = (index: number) => {
  activeDisabled.value = index
}
</script>

## 基础用法

简单的步骤条。设置 `active` 属性，接受一个 `number`，表示当前激活步骤的索引（从 0 开始）。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <yh-steps :active="active">
    <yh-step title="步骤 1" description="这是一段描述文字" />
    <yh-step title="步骤 2" description="这是一段描述文字" />
    <yh-step title="步骤 3" description="这是一段描述文字" />
  </yh-steps>
  <div style="margin-top: 20px">
    <yh-button @click="prev" :disabled="active === 0">上一步</yh-button>
    <yh-button type="primary" @click="next">下一步</yh-button>
  </div>
</DemoBlock>

## 竖式步骤条

设置 `direction="vertical"` 可以使步骤条垂直显示。

<DemoBlock title="竖式步骤条" :ts-code="tsVertical" :js-code="jsVertical">
  <yh-steps :active="1" direction="vertical" style="height: 200px">
    <yh-step title="步骤 1" description="这是一段描述文字" />
    <yh-step title="步骤 2" description="这是一段描述文字" />
    <yh-step title="步骤 3" description="这是一段描述文字" />
  </yh-steps>
</DemoBlock>

## 简洁风格

设置 `simple` 可以启用简洁风格的步骤条。

<DemoBlock title="简洁风格" :ts-code="tsSimple" :js-code="jsSimple">
  <yh-steps :active="1" simple>
    <yh-step title="步骤 1" />
    <yh-step title="步骤 2" />
    <yh-step title="步骤 3" />
  </yh-steps>
</DemoBlock>

## 点状步骤条

设置 `progress-dot` 可以启用点状风格。

<DemoBlock title="点状步骤条" :ts-code="tsDot" :js-code="jsDot">
  <yh-steps :active="1" progress-dot>
    <yh-step title="步骤 1" description="这是一段描述文字" />
    <yh-step title="步骤 2" description="这是一段描述文字" />
    <yh-step title="步骤 3" description="这是一段描述文字" />
  </yh-steps>
</DemoBlock>

## 导航风格

设置 `progress-dot="navigation"` 可以启用导航风格的步骤条，适合流程引导场景。

<DemoBlock title="导航风格" :ts-code="tsNavigation" :js-code="jsNavigation">
  <yh-steps :active="1" progress-dot="navigation">
    <yh-step title="步骤 1" description="确认订单" />
    <yh-step title="步骤 2" description="支付订单" />
    <yh-step title="步骤 3" description="完成" />
  </yh-steps>
</DemoBlock>

## 步骤状态

通过 `status` 属性可以自定义每个步骤的状态。支持 `wait`、`process`、`finish`、`error`、`success` 五种状态。

<DemoBlock title="步骤状态" :ts-code="tsStatus" :js-code="jsStatus">
  <yh-steps :active="1">
    <yh-step title="完成" status="finish" />
    <yh-step title="进行中" status="process" />
    <yh-step title="出错" status="error" />
    <yh-step title="待完成" status="wait" />
  </yh-steps>
  
  <yh-steps :active="1" style="margin-top: 20px">
    <yh-step title="成功" status="success" />
    <yh-step title="进行中" />
    <yh-step title="等待" />
  </yh-steps>
</DemoBlock>

## 居中对齐

设置 `align-center` 可以使步骤条内容居中对齐。

<DemoBlock title="居中对齐" :ts-code="tsCenter" :js-code="jsCenter">
  <yh-steps :active="1" align-center>
    <yh-step title="步骤 1" description="这是一段描述文字" />
    <yh-step title="步骤 2" description="这是一段描述文字" />
    <yh-step title="步骤 3" description="这是一段描述文字" />
  </yh-steps>
</DemoBlock>

## 可点击切换

设置 `clickable` 可以通过点击步骤来切换当前步骤。需要配合 `@change` 事件使用。

<DemoBlock title="可点击切换" :ts-code="tsClickable" :js-code="jsClickable">
  <yh-steps :active="active" clickable @change="handleChange">
    <yh-step title="步骤 1" />
    <yh-step title="步骤 2" />
    <yh-step title="步骤 3" />
  </yh-steps>
  <p style="margin-top: 12px; color: #666">当前步骤：{{ active }}</p>
</DemoBlock>

## 自定义间距

通过 `space` 属性可以设置每个步骤的间距，支持数字（px）或百分比字符串。

<DemoBlock title="自定义间距" :ts-code="tsSpace" :js-code="jsSpace">
  <yh-steps :active="1" :space="200">
    <yh-step title="步骤 1" />
    <yh-step title="步骤 2" />
    <yh-step title="步骤 3" />
  </yh-steps>
  
  <yh-steps :active="1" space="30%" style="margin-top: 20px">
    <yh-step title="步骤 1" />
    <yh-step title="步骤 2" />
    <yh-step title="步骤 3" />
  </yh-steps>
</DemoBlock>

## 结束步骤状态

通过 `finish-status` 可以设置结束步骤的状态，默认为 `finish`，可选值包括 `success`。

<DemoBlock title="结束步骤状态" :ts-code="tsFinishStatus" :js-code="jsFinishStatus">
  <yh-steps :active="2" finish-status="success">
    <yh-step title="步骤 1" />
    <yh-step title="步骤 2" />
    <yh-step title="步骤 3" />
  </yh-steps>
</DemoBlock>

## 自定义插槽

通过 `icon`、`title`、`description` 插槽可以自定义步骤内容。

<DemoBlock title="自定义插槽" :ts-code="tsSlots" :js-code="jsSlots">
  <yh-steps :active="1">
    <yh-step>
      <template #icon>🎉</template>
      <template #title>自定义标题</template>
      <template #description>自定义描述内容</template>
    </yh-step>
    <yh-step title="步骤 2" description="普通步骤" />
    <yh-step>
      <template #icon>✅</template>
      <template #title>完成</template>
    </yh-step>
  </yh-steps>
</DemoBlock>

## 在 Nuxt 中使用

组件已完美适配 Nuxt 3，支持自动导入与 SSR。

<DemoBlock title="Nuxt 适配" :ts-code="tsNuxt" :js-code="jsNuxt">
  <yh-steps :active="1">
    <yh-step title="步骤 1" />
    <yh-step title="步骤 2" />
    <yh-step title="步骤 3" />
  </yh-steps>
</DemoBlock>

## 迷你尺寸

设置 `size="small"` 可以使用更紧凑的小尺寸步骤条。

<DemoBlock title="迷你尺寸" :ts-code="tsSmall" :js-code="jsSmall">
  <yh-steps :active="1" size="small">
    <yh-step title="步骤 1" description="描述" />
    <yh-step title="步骤 2" description="描述" />
    <yh-step title="步骤 3" description="描述" />
  </yh-steps>
</DemoBlock>

## 响应式布局

设置 `responsive` 后，当窗口宽度小于断点（默认 768px）时自动切换为垂直布局。

<DemoBlock title="响应式布局" :ts-code="tsResponsive" :js-code="jsResponsive">
  <yh-steps :active="1" responsive>
    <yh-step title="步骤 1" description="这是描述" />
    <yh-step title="步骤 2" description="这是描述" />
    <yh-step title="步骤 3" description="这是描述" />
  </yh-steps>
</DemoBlock>

## 进度条连接线

设置 `show-progress` 后，连接线会显示为进度条样式。配合 Step 的 `progress` 属性可以显示当前步骤的完成进度。

<DemoBlock title="进度条连接线" :ts-code="tsProgress" :js-code="jsProgress">
  <yh-steps :active="activeProgress" show-progress>
    <yh-step title="步骤 1" :progress="100" />
    <yh-step title="步骤 2" :progress="progressValue" />
    <yh-step title="步骤 3" :progress="0" />
  </yh-steps>
  <div style="margin-top: 16px; display: flex; align-items: center; gap: 12px">
    <span>当前步骤进度：{{ progressValue }}%</span>
    <input type="range" v-model.number="progressValue" min="0" max="100" style="flex: 1" />
  </div>
</DemoBlock>

## 时间线模式

设置 `show-timeline` 后可以显示时间信息，适合物流追踪、历史记录等场景。

<DemoBlock title="时间线模式" :ts-code="tsTimeline" :js-code="jsTimeline">
  <yh-steps :active="2" direction="vertical" show-timeline>
    <yh-step title="创建订单" description="订单已提交" time="2024-01-01 10:00" />
    <yh-step title="付款成功" description="支付完成" time="2024-01-01 10:05" />
    <yh-step title="商品发货" description="物流已揽收" time="2024-01-02 08:00" />
    <yh-step title="确认收货" description="等待签收" time="" />
  </yh-steps>
</DemoBlock>

## 禁用步骤

设置 Step 的 `disabled` 属性可以禁止点击该步骤。

<DemoBlock title="禁用步骤" :ts-code="tsDisabled" :js-code="jsDisabled">
  <yh-steps :active="activeDisabled" clickable @change="handleDisabledChange">
    <yh-step title="步骤 1" />
    <yh-step title="步骤 2 (禁用)" disabled />
    <yh-step title="步骤 3" />
  </yh-steps>
  <p style="margin-top: 12px; color: #666">当前步骤：{{ activeDisabled }}，第二步被禁用无法点击</p>
</DemoBlock>

## 标签位置

设置 `label-placement="vertical"` 可以使标签垂直排列。

<DemoBlock title="标签位置" :ts-code="tsLabelPlacement" :js-code="jsLabelPlacement">
  <yh-steps :active="1" label-placement="vertical">
    <yh-step title="步骤 1" description="这是描述" />
    <yh-step title="步骤 2" description="这是描述" />
    <yh-step title="步骤 3" description="这是描述" />
  </yh-steps>
</DemoBlock>

## 延迟渲染

设置 Step 的 `lazy` 属性可以延迟渲染内容，首次激活时才会渲染，提升性能。

<DemoBlock title="延迟渲染" :ts-code="tsLazy" :js-code="jsLazy">
  <yh-steps :active="activeLazy" direction="vertical">
    <yh-step title="步骤 1">
      <div>步骤 1 的详细内容（立即加载）</div>
    </yh-step>
    <yh-step title="步骤 2" lazy>
      <div>步骤 2 的详细内容（延迟加载，首次激活时才渲染）</div>
    </yh-step>
    <yh-step title="步骤 3" lazy>
      <div>步骤 3 的详细内容（延迟加载）</div>
    </yh-step>
  </yh-steps>
  <yh-button @click="activeLazy < 2 && activeLazy++" style="margin-top: 12px">下一步</yh-button>
</DemoBlock>

## API

### Steps Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| active | 当前激活步骤（从 0 开始） | `number` | `0` |
| direction | 显示方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| align-center | 是否居中对齐 | `boolean` | `false` |
| simple | 是否启用简洁风格 | `boolean` | `false` |
| progress-dot | 点状/导航风格 | `boolean \| 'dot' \| 'navigation'` | `false` |
| finish-status | 结束步骤的状态 | `'wait' \| 'process' \| 'finish' \| 'error' \| 'success'` | `'finish'` |
| process-status | 当前步骤的状态 | `'wait' \| 'process' \| 'finish' \| 'error' \| 'success'` | `'process'` |
| space | 每个 step 的间距（支持 px 或百分比） | `number \| string` | — |
| clickable | 是否可点击切换步骤 | `boolean` | `false` |
| size | 尺寸 | `'default' \| 'small'` | `'default'` |
| responsive | 是否响应式（小屏幕自动切换为垂直） | `boolean` | `false` |
| responsive-breakpoint | 响应式断点（px） | `number` | `768` |
| label-placement | 标签位置 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| show-progress | 显示进度条连接线 | `boolean` | `false` |
| show-timeline | 显示时间线 | `boolean` | `false` |

### Steps Events

| 事件名 | 说明 | 类型 |
| --- | --- | --- |
| change | 点击步骤时触发（需开启 clickable） | `(index: number) => void` |

### Steps Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| default | Step 组件内容 | — |

### Step Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | `string` | `''` |
| description | 描述文字 | `string` | `''` |
| icon | 自定义图标类名 | `string` | `''` |
| status | 当前步骤状态（覆盖父组件设置） | `'wait' \| 'process' \| 'finish' \| 'error' \| 'success'` | `''` |
| disabled | 是否禁用该步骤 | `boolean` | `false` |
| time | 时间信息（用于时间线模式） | `string` | `''` |
| progress | 进度百分比（0-100，用于进度条模式） | `number` | `0` |
| lazy | 是否延迟渲染内容 | `boolean` | `false` |

### Step Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| default | 自定义内容区域 | — |
| icon | 自定义图标 | — |
| title | 自定义标题 | — |
| description | 自定义描述 | — |
| time | 自定义时间内容 | — |

## 主题变量

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-steps-icon-size` | 图标区域大小 | `28px` |
| `--yh-steps-line-color` | 连接线颜色 | `var(--yh-border-color-light)` |
| `--yh-steps-finish-color` | 完成状态颜色 | `var(--yh-color-primary)` |
| `--yh-steps-process-color` | 进行中状态颜色 | `var(--yh-color-primary)` |
| `--yh-steps-wait-color` | 等待状态颜色 | `var(--yh-text-color-placeholder)` |
| `--yh-steps-error-color` | 错误状态颜色 | `var(--yh-color-danger)` |
| `--yh-steps-success-color` | 成功状态颜色 | `var(--yh-color-success)` |

