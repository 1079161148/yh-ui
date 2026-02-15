# 图标展示

丰富的图标效果展示，涵盖常用场景和多种图标集。

## 系统操作图标

常用的系统操作类图标，适用于工具栏、菜单等场景。

<DemoBlock title="系统操作图标" :ts-code="tsSystem" :js-code="jsSystem">
  <div class="icon-grid">
    <div class="icon-item" v-for="item in systemIcons" :key="item.name">
      <Icon :icon="item.name" :size="28" />
      <span class="icon-label">{{ item.label }}</span>
    </div>
  </div>
</DemoBlock>

## 箭头与方向

方向指示类图标，适用于导航、排序、展开收起等场景。

<DemoBlock title="箭头与方向" :ts-code="tsArrow" :js-code="jsArrow">
  <div class="icon-grid">
    <div class="icon-item" v-for="item in arrowIcons" :key="item.name">
      <Icon :icon="item.name" :size="28" />
      <span class="icon-label">{{ item.label }}</span>
    </div>
  </div>
</DemoBlock>

## 状态与提示

用于反馈状态的图标，如成功、警告、错误、信息等。

<DemoBlock title="状态与提示" :ts-code="tsStatus" :js-code="jsStatus">
  <div class="icon-grid">
    <div class="icon-item" v-for="item in statusIcons" :key="item.name">
      <Icon :icon="item.name" :size="28" :color="item.color" />
      <span class="icon-label">{{ item.label }}</span>
    </div>
  </div>
</DemoBlock>

## 文件与媒体

文件管理和多媒体相关的图标。

<DemoBlock title="文件与媒体" :ts-code="tsFile" :js-code="jsFile">
  <div class="icon-grid">
    <div class="icon-item" v-for="item in fileIcons" :key="item.name">
      <Icon :icon="item.name" :size="28" />
      <span class="icon-label">{{ item.label }}</span>
    </div>
  </div>
</DemoBlock>

## 社交与通讯

社交媒体和通讯类图标。

<DemoBlock title="社交与通讯" :ts-code="tsSocial" :js-code="jsSocial">
  <div class="icon-grid">
    <div class="icon-item" v-for="item in socialIcons" :key="item.name">
      <Icon :icon="item.name" :size="28" />
      <span class="icon-label">{{ item.label }}</span>
    </div>
  </div>
</DemoBlock>

## 天气与自然

天气和自然元素图标，适合天气应用或装饰用途。

<DemoBlock title="天气与自然" :ts-code="tsWeather" :js-code="jsWeather">
  <div class="icon-grid">
    <div class="icon-item" v-for="item in weatherIcons" :key="item.name">
      <Icon :icon="item.name" :size="28" />
      <span class="icon-label">{{ item.label }}</span>
    </div>
  </div>
</DemoBlock>

## 编辑器图标

富文本编辑器常用图标。

<DemoBlock title="编辑器图标" :ts-code="tsEditor" :js-code="jsEditor">
  <div class="icon-grid">
    <div class="icon-item" v-for="item in editorIcons" :key="item.name">
      <Icon :icon="item.name" :size="28" />
      <span class="icon-label">{{ item.label }}</span>
    </div>
  </div>
</DemoBlock>

## 多图标集对比

同一语义在不同图标集中的视觉对比。

<DemoBlock title="多图标集对比" :ts-code="tsCompare" :js-code="jsCompare">
  <div class="compare-section">
    <div class="compare-group" v-for="group in compareGroups" :key="group.label">
      <span class="compare-label">{{ group.label }}</span>
      <div class="compare-icons">
        <div class="compare-item" v-for="item in group.icons" :key="item.name">
          <Icon :icon="item.name" :size="24" />
          <span class="compare-prefix">{{ item.prefix }}</span>
        </div>
      </div>
    </div>
  </div>
</DemoBlock>

## 动画效果

图标的旋转、加载等动画效果。

<DemoBlock title="动画效果" :ts-code="tsAnimation" :js-code="jsAnimation">
  <div class="icon-grid">
    <div class="icon-item" v-for="item in animationIcons" :key="item.name">
      <Icon :icon="item.name" :size="28" spin />
      <span class="icon-label">{{ item.label }}</span>
    </div>
  </div>
</DemoBlock>

## 尺寸与颜色

图标的多种尺寸和颜色组合展示。

<DemoBlock title="尺寸与颜色" :ts-code="tsSizeColor" :js-code="jsSizeColor">
  <div style="display: flex; gap: 24px; align-items: flex-end; flex-wrap: wrap;">
    <div style="text-align: center;" v-for="item in sizeColorItems" :key="item.size">
      <Icon icon="mdi:heart" :size="item.size" :color="item.color" />
      <div style="margin-top: 8px; font-size: 12px; color: #999;">{{ item.size }}px</div>
    </div>
  </div>
</DemoBlock>

<script setup lang="ts">
import { Icon } from '@yh-ui/icons'

// ---- 图标数据 ----
const systemIcons = [
  { name: 'mdi:home', label: 'Home' },
  { name: 'mdi:magnify', label: 'Search' },
  { name: 'mdi:cog', label: 'Settings' },
  { name: 'mdi:account', label: 'User' },
  { name: 'mdi:bell', label: 'Bell' },
  { name: 'mdi:email', label: 'Email' },
  { name: 'mdi:lock', label: 'Lock' },
  { name: 'mdi:lock-open', label: 'Unlock' },
  { name: 'mdi:eye', label: 'Eye' },
  { name: 'mdi:eye-off', label: 'EyeOff' },
  { name: 'mdi:delete', label: 'Delete' },
  { name: 'mdi:pencil', label: 'Edit' },
  { name: 'mdi:plus', label: 'Plus' },
  { name: 'mdi:minus', label: 'Minus' },
  { name: 'mdi:close', label: 'Close' },
  { name: 'mdi:check', label: 'Check' },
  { name: 'mdi:download', label: 'Download' },
  { name: 'mdi:upload', label: 'Upload' },
  { name: 'mdi:share', label: 'Share' },
  { name: 'mdi:content-copy', label: 'Copy' },
  { name: 'mdi:content-paste', label: 'Paste' },
  { name: 'mdi:content-cut', label: 'Cut' },
  { name: 'mdi:refresh', label: 'Refresh' },
  { name: 'mdi:filter', label: 'Filter' },
]

const arrowIcons = [
  { name: 'mdi:arrow-up', label: 'ArrowUp' },
  { name: 'mdi:arrow-down', label: 'ArrowDown' },
  { name: 'mdi:arrow-left', label: 'ArrowLeft' },
  { name: 'mdi:arrow-right', label: 'ArrowRight' },
  { name: 'mdi:chevron-up', label: 'ChevronUp' },
  { name: 'mdi:chevron-down', label: 'ChevronDown' },
  { name: 'mdi:chevron-left', label: 'ChevronLeft' },
  { name: 'mdi:chevron-right', label: 'ChevronRight' },
  { name: 'mdi:arrow-expand', label: 'Expand' },
  { name: 'mdi:arrow-collapse', label: 'Collapse' },
  { name: 'mdi:swap-horizontal', label: 'SwapH' },
  { name: 'mdi:swap-vertical', label: 'SwapV' },
  { name: 'mdi:unfold-more-horizontal', label: 'UnfoldMore' },
  { name: 'mdi:unfold-less-horizontal', label: 'UnfoldLess' },
  { name: 'mdi:sort-ascending', label: 'SortAsc' },
  { name: 'mdi:sort-descending', label: 'SortDesc' },
]

const statusIcons = [
  { name: 'mdi:check-circle', label: 'Success', color: '#67c23a' },
  { name: 'mdi:alert-circle', label: 'Warning', color: '#e6a23c' },
  { name: 'mdi:close-circle', label: 'Error', color: '#f56c6c' },
  { name: 'mdi:information', label: 'Info', color: '#409eff' },
  { name: 'mdi:help-circle', label: 'Help', color: '#909399' },
  { name: 'mdi:alert', label: 'Alert', color: '#e6a23c' },
  { name: 'mdi:check-decagram', label: 'Verified', color: '#67c23a' },
  { name: 'mdi:shield-check', label: 'Secure', color: '#67c23a' },
  { name: 'mdi:clock-outline', label: 'Pending', color: '#909399' },
  { name: 'mdi:timer-sand', label: 'Waiting', color: '#e6a23c' },
  { name: 'mdi:cancel', label: 'Cancel', color: '#f56c6c' },
  { name: 'mdi:star', label: 'Star', color: '#e6a23c' },
]

const fileIcons = [
  { name: 'mdi:file', label: 'File' },
  { name: 'mdi:folder', label: 'Folder' },
  { name: 'mdi:folder-open', label: 'FolderOpen' },
  { name: 'mdi:file-document', label: 'Document' },
  { name: 'mdi:file-image', label: 'Image' },
  { name: 'mdi:file-music', label: 'Music' },
  { name: 'mdi:file-video', label: 'Video' },
  { name: 'mdi:file-pdf-box', label: 'PDF' },
  { name: 'mdi:file-excel', label: 'Excel' },
  { name: 'mdi:file-word', label: 'Word' },
  { name: 'mdi:file-code', label: 'Code' },
  { name: 'mdi:zip-box', label: 'Zip' },
  { name: 'mdi:cloud-upload', label: 'CloudUp' },
  { name: 'mdi:cloud-download', label: 'CloudDown' },
  { name: 'mdi:attachment', label: 'Attach' },
  { name: 'mdi:link', label: 'Link' },
]

const socialIcons = [
  { name: 'mdi:github', label: 'GitHub' },
  { name: 'mdi:wechat', label: 'WeChat' },
  { name: 'mdi:qqchat', label: 'QQ' },
  { name: 'mdi:twitter', label: 'Twitter' },
  { name: 'mdi:facebook', label: 'Facebook' },
  { name: 'mdi:instagram', label: 'Instagram' },
  { name: 'mdi:youtube', label: 'YouTube' },
  { name: 'mdi:linkedin', label: 'LinkedIn' },
  { name: 'mdi:whatsapp', label: 'WhatsApp' },
  { name: 'mdi:telegram', label: 'Telegram' },
  { name: 'mdi:discord', label: 'Discord' },
  { name: 'mdi:slack', label: 'Slack' },
  { name: 'mdi:reddit', label: 'Reddit' },
  { name: 'mdi:stackoverflow', label: 'StackOverflow' },
  { name: 'mdi:npm', label: 'NPM' },
  { name: 'mdi:google', label: 'Google' },
]

const weatherIcons = [
  { name: 'mdi:weather-sunny', label: 'Sunny' },
  { name: 'mdi:weather-night', label: 'Night' },
  { name: 'mdi:weather-cloudy', label: 'Cloudy' },
  { name: 'mdi:weather-partly-cloudy', label: 'PartlyCloudy' },
  { name: 'mdi:weather-rainy', label: 'Rainy' },
  { name: 'mdi:weather-snowy', label: 'Snowy' },
  { name: 'mdi:weather-lightning', label: 'Lightning' },
  { name: 'mdi:weather-windy', label: 'Windy' },
  { name: 'mdi:weather-fog', label: 'Fog' },
  { name: 'mdi:weather-hail', label: 'Hail' },
  { name: 'mdi:thermometer', label: 'Temp' },
  { name: 'mdi:water', label: 'Humidity' },
]

const editorIcons = [
  { name: 'mdi:format-bold', label: 'Bold' },
  { name: 'mdi:format-italic', label: 'Italic' },
  { name: 'mdi:format-underline', label: 'Underline' },
  { name: 'mdi:format-strikethrough', label: 'Strike' },
  { name: 'mdi:format-align-left', label: 'AlignLeft' },
  { name: 'mdi:format-align-center', label: 'AlignCenter' },
  { name: 'mdi:format-align-right', label: 'AlignRight' },
  { name: 'mdi:format-align-justify', label: 'Justify' },
  { name: 'mdi:format-list-bulleted', label: 'ListBullet' },
  { name: 'mdi:format-list-numbered', label: 'ListNumber' },
  { name: 'mdi:format-quote-close', label: 'Quote' },
  { name: 'mdi:code-tags', label: 'Code' },
  { name: 'mdi:image', label: 'Image' },
  { name: 'mdi:table', label: 'Table' },
  { name: 'mdi:undo', label: 'Undo' },
  { name: 'mdi:redo', label: 'Redo' },
]

const compareGroups = [
  { label: 'Home', icons: [
    { name: 'mdi:home', prefix: 'mdi' },
    { name: 'ep:house', prefix: 'ep' },
    { name: 'lucide:home', prefix: 'lucide' },
    { name: 'tabler:home', prefix: 'tabler' },
    { name: 'ri:home-line', prefix: 'ri' },
  ]},
  { label: 'Search', icons: [
    { name: 'mdi:magnify', prefix: 'mdi' },
    { name: 'ep:search', prefix: 'ep' },
    { name: 'lucide:search', prefix: 'lucide' },
    { name: 'tabler:search', prefix: 'tabler' },
    { name: 'ri:search-line', prefix: 'ri' },
  ]},
  { label: 'User', icons: [
    { name: 'mdi:account', prefix: 'mdi' },
    { name: 'ep:user', prefix: 'ep' },
    { name: 'lucide:user', prefix: 'lucide' },
    { name: 'tabler:user', prefix: 'tabler' },
    { name: 'ri:user-line', prefix: 'ri' },
  ]},
  { label: 'Settings', icons: [
    { name: 'mdi:cog', prefix: 'mdi' },
    { name: 'ep:setting', prefix: 'ep' },
    { name: 'lucide:settings', prefix: 'lucide' },
    { name: 'tabler:settings', prefix: 'tabler' },
    { name: 'ri:settings-3-line', prefix: 'ri' },
  ]},
  { label: 'Delete', icons: [
    { name: 'mdi:delete', prefix: 'mdi' },
    { name: 'ep:delete', prefix: 'ep' },
    { name: 'lucide:trash-2', prefix: 'lucide' },
    { name: 'tabler:trash', prefix: 'tabler' },
    { name: 'ri:delete-bin-line', prefix: 'ri' },
  ]},
  { label: 'Heart', icons: [
    { name: 'mdi:heart', prefix: 'mdi' },
    { name: 'lucide:heart', prefix: 'lucide' },
    { name: 'tabler:heart', prefix: 'tabler' },
    { name: 'ri:heart-line', prefix: 'ri' },
    { name: 'bi:heart', prefix: 'bi' },
  ]},
]

const animationIcons = [
  { name: 'mdi:loading', label: 'Loading' },
  { name: 'mdi:sync', label: 'Sync' },
  { name: 'mdi:refresh', label: 'Refresh' },
  { name: 'mdi:cog', label: 'Settings' },
  { name: 'mdi:star-four-points', label: 'Sparkle' },
  { name: 'mdi:fan', label: 'Fan' },
  { name: 'ep:loading', label: 'EP Loading' },
  { name: 'lucide:loader-2', label: 'Loader' },
  { name: 'tabler:loader', label: 'TabLoader' },
  { name: 'ri:loader-4-line', label: 'RI Loader' },
  { name: 'mdi:atom', label: 'Atom' },
  { name: 'mdi:circle-slice-3', label: 'Progress' },
]

const sizeColorItems = [
  { size: 16, color: '#409eff' },
  { size: 20, color: '#67c23a' },
  { size: 24, color: '#e6a23c' },
  { size: 32, color: '#f56c6c' },
  { size: 40, color: '#909399' },
  { size: 48, color: '#409eff' },
  { size: 56, color: '#b37feb' },
  { size: 64, color: '#f56c6c' },
]

// ---- 代码示例 ----
const tsSystem = `<template>
  <div class="icon-grid">
    <div class="icon-item" v-for="item in icons" :key="item.name">
      <Icon :icon="item.name" :size="28" />
      <span>{{ item.label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@yh-ui/icons'

interface IconItem {
  name: string
  label: string
}

const icons: IconItem[] = [
  { name: 'mdi:home', label: 'Home' },
  { name: 'mdi:magnify', label: 'Search' },
  { name: 'mdi:cog', label: 'Settings' },
  { name: 'mdi:account', label: 'User' },
  { name: 'mdi:bell', label: 'Bell' },
  { name: 'mdi:email', label: 'Email' },
  { name: 'mdi:lock', label: 'Lock' },
  { name: 'mdi:eye', label: 'Eye' },
  { name: 'mdi:delete', label: 'Delete' },
  { name: 'mdi:pencil', label: 'Edit' },
  { name: 'mdi:plus', label: 'Plus' },
  { name: 'mdi:close', label: 'Close' },
]
` + '<' + '/script>'

const jsSystem = `<template>
  <div class="icon-grid">
    <div class="icon-item" v-for="item in icons" :key="item.name">
      <Icon :icon="item.name" :size="28" />
      <span>{{ item.label }}</span>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@yh-ui/icons'

const icons = [
  { name: 'mdi:home', label: 'Home' },
  { name: 'mdi:magnify', label: 'Search' },
  { name: 'mdi:cog', label: 'Settings' },
  { name: 'mdi:account', label: 'User' },
  { name: 'mdi:bell', label: 'Bell' },
  { name: 'mdi:email', label: 'Email' },
  { name: 'mdi:lock', label: 'Lock' },
  { name: 'mdi:eye', label: 'Eye' },
  { name: 'mdi:delete', label: 'Delete' },
  { name: 'mdi:pencil', label: 'Edit' },
  { name: 'mdi:plus', label: 'Plus' },
  { name: 'mdi:close', label: 'Close' },
]
` + '<' + '/script>'

const tsArrow = `<template>
  <div class="icon-grid">
    <div class="icon-item" v-for="item in icons" :key="item.name">
      <Icon :icon="item.name" :size="28" />
      <span>{{ item.label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@yh-ui/icons'

const icons = [
  { name: 'mdi:arrow-up', label: 'ArrowUp' },
  { name: 'mdi:arrow-down', label: 'ArrowDown' },
  { name: 'mdi:arrow-left', label: 'ArrowLeft' },
  { name: 'mdi:arrow-right', label: 'ArrowRight' },
  { name: 'mdi:chevron-up', label: 'ChevronUp' },
  { name: 'mdi:chevron-down', label: 'ChevronDown' },
  { name: 'mdi:chevron-left', label: 'ChevronLeft' },
  { name: 'mdi:chevron-right', label: 'ChevronRight' },
]
` + '<' + '/script>'

const jsArrow = `<template>
  <div class="icon-grid">
    <div class="icon-item" v-for="item in icons" :key="item.name">
      <Icon :icon="item.name" :size="28" />
      <span>{{ item.label }}</span>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@yh-ui/icons'

const icons = [
  { name: 'mdi:arrow-up', label: 'ArrowUp' },
  { name: 'mdi:arrow-down', label: 'ArrowDown' },
  { name: 'mdi:arrow-left', label: 'ArrowLeft' },
  { name: 'mdi:arrow-right', label: 'ArrowRight' },
  { name: 'mdi:chevron-up', label: 'ChevronUp' },
  { name: 'mdi:chevron-down', label: 'ChevronDown' },
  { name: 'mdi:chevron-left', label: 'ChevronLeft' },
  { name: 'mdi:chevron-right', label: 'ChevronRight' },
]
` + '<' + '/script>'

const tsStatus = `<template>
  <div class="icon-grid">
    <div class="icon-item" v-for="item in icons" :key="item.name">
      <Icon :icon="item.name" :size="28" :color="item.color" />
      <span>{{ item.label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@yh-ui/icons'

const icons = [
  { name: 'mdi:check-circle', label: 'Success', color: '#67c23a' },
  { name: 'mdi:alert-circle', label: 'Warning', color: '#e6a23c' },
  { name: 'mdi:close-circle', label: 'Error', color: '#f56c6c' },
  { name: 'mdi:information', label: 'Info', color: '#409eff' },
  { name: 'mdi:help-circle', label: 'Help', color: '#909399' },
  { name: 'mdi:shield-check', label: 'Secure', color: '#67c23a' },
]
` + '<' + '/script>'

const jsStatus = `<template>
  <div class="icon-grid">
    <div class="icon-item" v-for="item in icons" :key="item.name">
      <Icon :icon="item.name" :size="28" :color="item.color" />
      <span>{{ item.label }}</span>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@yh-ui/icons'

const icons = [
  { name: 'mdi:check-circle', label: 'Success', color: '#67c23a' },
  { name: 'mdi:alert-circle', label: 'Warning', color: '#e6a23c' },
  { name: 'mdi:close-circle', label: 'Error', color: '#f56c6c' },
  { name: 'mdi:information', label: 'Info', color: '#409eff' },
  { name: 'mdi:help-circle', label: 'Help', color: '#909399' },
  { name: 'mdi:shield-check', label: 'Secure', color: '#67c23a' },
]
` + '<' + '/script>'

const tsFile = `<template>
  <div class="icon-grid">
    <div class="icon-item" v-for="item in icons" :key="item.name">
      <Icon :icon="item.name" :size="28" />
      <span>{{ item.label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@yh-ui/icons'

const icons = [
  { name: 'mdi:file', label: 'File' },
  { name: 'mdi:folder', label: 'Folder' },
  { name: 'mdi:folder-open', label: 'FolderOpen' },
  { name: 'mdi:file-document', label: 'Document' },
  { name: 'mdi:file-image', label: 'Image' },
  { name: 'mdi:file-music', label: 'Music' },
  { name: 'mdi:file-video', label: 'Video' },
  { name: 'mdi:file-pdf-box', label: 'PDF' },
]
` + '<' + '/script>'

const jsFile = `<template>
  <div class="icon-grid">
    <div class="icon-item" v-for="item in icons" :key="item.name">
      <Icon :icon="item.name" :size="28" />
      <span>{{ item.label }}</span>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@yh-ui/icons'

const icons = [
  { name: 'mdi:file', label: 'File' },
  { name: 'mdi:folder', label: 'Folder' },
  { name: 'mdi:folder-open', label: 'FolderOpen' },
  { name: 'mdi:file-document', label: 'Document' },
  { name: 'mdi:file-image', label: 'Image' },
  { name: 'mdi:file-music', label: 'Music' },
  { name: 'mdi:file-video', label: 'Video' },
  { name: 'mdi:file-pdf-box', label: 'PDF' },
]
` + '<' + '/script>'

const tsSocial = `<template>
  <div class="icon-grid">
    <div class="icon-item" v-for="item in icons" :key="item.name">
      <Icon :icon="item.name" :size="28" />
      <span>{{ item.label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@yh-ui/icons'

const icons = [
  { name: 'mdi:github', label: 'GitHub' },
  { name: 'mdi:wechat', label: 'WeChat' },
  { name: 'mdi:twitter', label: 'Twitter' },
  { name: 'mdi:facebook', label: 'Facebook' },
  { name: 'mdi:youtube', label: 'YouTube' },
  { name: 'mdi:discord', label: 'Discord' },
  { name: 'mdi:telegram', label: 'Telegram' },
  { name: 'mdi:google', label: 'Google' },
]
` + '<' + '/script>'

const jsSocial = `<template>
  <div class="icon-grid">
    <div class="icon-item" v-for="item in icons" :key="item.name">
      <Icon :icon="item.name" :size="28" />
      <span>{{ item.label }}</span>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@yh-ui/icons'

const icons = [
  { name: 'mdi:github', label: 'GitHub' },
  { name: 'mdi:wechat', label: 'WeChat' },
  { name: 'mdi:twitter', label: 'Twitter' },
  { name: 'mdi:facebook', label: 'Facebook' },
  { name: 'mdi:youtube', label: 'YouTube' },
  { name: 'mdi:discord', label: 'Discord' },
  { name: 'mdi:telegram', label: 'Telegram' },
  { name: 'mdi:google', label: 'Google' },
]
` + '<' + '/script>'

const tsWeather = `<template>
  <div class="icon-grid">
    <div class="icon-item" v-for="item in icons" :key="item.name">
      <Icon :icon="item.name" :size="28" />
      <span>{{ item.label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@yh-ui/icons'

const icons = [
  { name: 'mdi:weather-sunny', label: 'Sunny' },
  { name: 'mdi:weather-night', label: 'Night' },
  { name: 'mdi:weather-cloudy', label: 'Cloudy' },
  { name: 'mdi:weather-rainy', label: 'Rainy' },
  { name: 'mdi:weather-snowy', label: 'Snowy' },
  { name: 'mdi:weather-lightning', label: 'Lightning' },
]
` + '<' + '/script>'

const jsWeather = `<template>
  <div class="icon-grid">
    <div class="icon-item" v-for="item in icons" :key="item.name">
      <Icon :icon="item.name" :size="28" />
      <span>{{ item.label }}</span>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@yh-ui/icons'

const icons = [
  { name: 'mdi:weather-sunny', label: 'Sunny' },
  { name: 'mdi:weather-night', label: 'Night' },
  { name: 'mdi:weather-cloudy', label: 'Cloudy' },
  { name: 'mdi:weather-rainy', label: 'Rainy' },
  { name: 'mdi:weather-snowy', label: 'Snowy' },
  { name: 'mdi:weather-lightning', label: 'Lightning' },
]
` + '<' + '/script>'

const tsEditor = `<template>
  <div class="icon-grid">
    <div class="icon-item" v-for="item in icons" :key="item.name">
      <Icon :icon="item.name" :size="28" />
      <span>{{ item.label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@yh-ui/icons'

const icons = [
  { name: 'mdi:format-bold', label: 'Bold' },
  { name: 'mdi:format-italic', label: 'Italic' },
  { name: 'mdi:format-underline', label: 'Underline' },
  { name: 'mdi:format-align-left', label: 'AlignLeft' },
  { name: 'mdi:format-align-center', label: 'AlignCenter' },
  { name: 'mdi:format-align-right', label: 'AlignRight' },
  { name: 'mdi:format-list-bulleted', label: 'ListBullet' },
  { name: 'mdi:format-list-numbered', label: 'ListNumber' },
  { name: 'mdi:undo', label: 'Undo' },
  { name: 'mdi:redo', label: 'Redo' },
]
` + '<' + '/script>'

const jsEditor = `<template>
  <div class="icon-grid">
    <div class="icon-item" v-for="item in icons" :key="item.name">
      <Icon :icon="item.name" :size="28" />
      <span>{{ item.label }}</span>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@yh-ui/icons'

const icons = [
  { name: 'mdi:format-bold', label: 'Bold' },
  { name: 'mdi:format-italic', label: 'Italic' },
  { name: 'mdi:format-underline', label: 'Underline' },
  { name: 'mdi:format-align-left', label: 'AlignLeft' },
  { name: 'mdi:format-align-center', label: 'AlignCenter' },
  { name: 'mdi:format-align-right', label: 'AlignRight' },
  { name: 'mdi:format-list-bulleted', label: 'ListBullet' },
  { name: 'mdi:format-list-numbered', label: 'ListNumber' },
  { name: 'mdi:undo', label: 'Undo' },
  { name: 'mdi:redo', label: 'Redo' },
]
` + '<' + '/script>'

const tsCompare = `<template>
  <div class="compare-section">
    <div class="compare-group" v-for="group in groups" :key="group.label">
      <span class="compare-label">{{ group.label }}</span>
      <div class="compare-icons">
        <div class="compare-item" v-for="item in group.icons" :key="item.name">
          <Icon :icon="item.name" :size="24" />
          <span class="compare-prefix">{{ item.prefix }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@yh-ui/icons'

const groups = [
  { label: 'Home', icons: [
    { name: 'mdi:home', prefix: 'mdi' },
    { name: 'ep:house', prefix: 'ep' },
    { name: 'lucide:home', prefix: 'lucide' },
    { name: 'tabler:home', prefix: 'tabler' },
    { name: 'ri:home-line', prefix: 'ri' },
  ]},
  { label: 'Search', icons: [
    { name: 'mdi:magnify', prefix: 'mdi' },
    { name: 'ep:search', prefix: 'ep' },
    { name: 'lucide:search', prefix: 'lucide' },
    { name: 'tabler:search', prefix: 'tabler' },
    { name: 'ri:search-line', prefix: 'ri' },
  ]},
]
` + '<' + '/script>'

const jsCompare = `<template>
  <div class="compare-section">
    <div class="compare-group" v-for="group in groups" :key="group.label">
      <span class="compare-label">{{ group.label }}</span>
      <div class="compare-icons">
        <div class="compare-item" v-for="item in group.icons" :key="item.name">
          <Icon :icon="item.name" :size="24" />
          <span class="compare-prefix">{{ item.prefix }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@yh-ui/icons'

const groups = [
  { label: 'Home', icons: [
    { name: 'mdi:home', prefix: 'mdi' },
    { name: 'ep:house', prefix: 'ep' },
    { name: 'lucide:home', prefix: 'lucide' },
    { name: 'tabler:home', prefix: 'tabler' },
    { name: 'ri:home-line', prefix: 'ri' },
  ]},
  { label: 'Search', icons: [
    { name: 'mdi:magnify', prefix: 'mdi' },
    { name: 'ep:search', prefix: 'ep' },
    { name: 'lucide:search', prefix: 'lucide' },
    { name: 'tabler:search', prefix: 'tabler' },
    { name: 'ri:search-line', prefix: 'ri' },
  ]},
]
` + '<' + '/script>'

const tsAnimation = `<template>
  <div class="icon-grid">
    <div class="icon-item" v-for="item in icons" :key="item.name">
      <Icon :icon="item.name" :size="28" spin />
      <span>{{ item.label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@yh-ui/icons'

const icons = [
  { name: 'mdi:loading', label: 'Loading' },
  { name: 'mdi:sync', label: 'Sync' },
  { name: 'mdi:refresh', label: 'Refresh' },
  { name: 'mdi:cog', label: 'Settings' },
  { name: 'ep:loading', label: 'EP Loading' },
  { name: 'lucide:loader-2', label: 'Loader' },
]
` + '<' + '/script>'

const jsAnimation = `<template>
  <div class="icon-grid">
    <div class="icon-item" v-for="item in icons" :key="item.name">
      <Icon :icon="item.name" :size="28" spin />
      <span>{{ item.label }}</span>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@yh-ui/icons'

const icons = [
  { name: 'mdi:loading', label: 'Loading' },
  { name: 'mdi:sync', label: 'Sync' },
  { name: 'mdi:refresh', label: 'Refresh' },
  { name: 'mdi:cog', label: 'Settings' },
  { name: 'ep:loading', label: 'EP Loading' },
  { name: 'lucide:loader-2', label: 'Loader' },
]
` + '<' + '/script>'

const tsSizeColor = `<template>
  <div style="display: flex; gap: 24px; align-items: flex-end; flex-wrap: wrap;">
    <div style="text-align: center;" v-for="item in items" :key="item.size">
      <Icon icon="mdi:heart" :size="item.size" :color="item.color" />
      <div style="margin-top: 8px; font-size: 12px; color: #999;">{{ item.size }}px</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@yh-ui/icons'

const items = [
  { size: 16, color: '#409eff' },
  { size: 20, color: '#67c23a' },
  { size: 24, color: '#e6a23c' },
  { size: 32, color: '#f56c6c' },
  { size: 40, color: '#909399' },
  { size: 48, color: '#409eff' },
  { size: 56, color: '#b37feb' },
  { size: 64, color: '#f56c6c' },
]
` + '<' + '/script>'

const jsSizeColor = `<template>
  <div style="display: flex; gap: 24px; align-items: flex-end; flex-wrap: wrap;">
    <div style="text-align: center;" v-for="item in items" :key="item.size">
      <Icon icon="mdi:heart" :size="item.size" :color="item.color" />
      <div style="margin-top: 8px; font-size: 12px; color: #999;">{{ item.size }}px</div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@yh-ui/icons'

const items = [
  { size: 16, color: '#409eff' },
  { size: 20, color: '#67c23a' },
  { size: 24, color: '#e6a23c' },
  { size: 32, color: '#f56c6c' },
  { size: 40, color: '#909399' },
  { size: 48, color: '#409eff' },
  { size: 56, color: '#b37feb' },
  { size: 64, color: '#f56c6c' },
]
` + '<' + '/script>'
</script>

<style scoped>
.icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
  gap: 12px;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  color: var(--vp-c-text-1);
}

.icon-item:hover {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-brand);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.icon-label {
  font-size: 11px;
  color: var(--vp-c-text-3);
  text-align: center;
  word-break: break-all;
}

.icon-item:hover .icon-label {
  color: var(--vp-c-brand);
}

.compare-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.compare-group {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

.compare-label {
  min-width: 80px;
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.compare-icons {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.compare-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  color: var(--vp-c-text-1);
}

.compare-prefix {
  font-size: 10px;
  color: var(--vp-c-text-3);
  padding: 1px 6px;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
}
</style>
