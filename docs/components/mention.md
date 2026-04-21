# Mention 提及

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { toJs, _T, _S, _St } from '../.vitepress/theme/utils/demo-utils'

// ─── 基础用法 ────────────────────────────────────────────────────────────────
const basicValue = ref('')
const basicOptions = [
  { value: 'alice', label: 'Alice Zhou', description: '前端工程师' },
  { value: 'bob', label: 'Bob Zhang', description: '后端工程师' },
  { value: 'carol', label: 'Carol Wang', description: '设计师' },
  { value: 'david', label: 'David Li', description: '产品经理' }
]

// ─── 头像模式 ────────────────────────────────────────────────────────────────
const avatarValue = ref('')
const avatarOptions = [
  { value: 'alice', label: 'Alice', avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=1', description: '前端工程师' },
  { value: 'bob', label: 'Bob', avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=2', description: '后端工程师' },
  { value: 'carol', label: 'Carol', avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=3', description: '设计师' }
]

// ─── 分组 ───────────────────────────────────────────────────────────────────
const groupValue = ref('')
const groupOptions = [
  { value: 'alice', label: 'Alice', group: '前端组' },
  { value: 'bob', label: 'Bob', group: '前端组' },
  { value: 'carol', label: 'Carol', group: '后端组' },
  { value: 'david', label: 'David', group: '后端组' },
  { value: 'evan', label: 'Evan', group: '设计组' }
]

// ─── 多触发符 ────────────────────────────────────────────────────────────────
const multiTrigValue = ref('')
const peopleOptions = [
  { value: 'alice', label: 'Alice' },
  { value: 'bob', label: 'Bob' }
]
const tagOptions = [
  { value: 'frontend', label: '前端' },
  { value: 'backend', label: '后端' },
  { value: 'design', label: '设计' }
]
const multiTrigOptions = ref(peopleOptions)
const handleSearch = (keyword: string, trigger: string) => {
  if (trigger === '@') {
    multiTrigOptions.value = peopleOptions.filter(o => o.label.toLowerCase().includes(keyword.toLowerCase()))
  } else {
    multiTrigOptions.value = tagOptions.filter(o => o.label.includes(keyword))
  }
}

// ─── 异步加载 ────────────────────────────────────────────────────────────────
const asyncValue = ref('')
const asyncLoading = ref(false)
const asyncOptions = ref<{ value: string; label: string; description: string }[]>([])
const handleAsyncSearch = (keyword: string) => {
  asyncLoading.value = true
  asyncOptions.value = []
  setTimeout(() => {
    asyncOptions.value = [
      { value: 'alice', label: 'Alice (' + keyword + ')', description: '远程加载' },
      { value: 'bob', label: 'Bob (' + keyword + ')', description: '远程加载' }
    ].filter(o => o.value.includes(keyword) || !keyword)
    asyncLoading.value = false
  }, 800)
}

// ─── Textarea 模式 ───────────────────────────────────────────────────────────
const textareaValue = ref('')

// ─── 禁用 ───────────────────────────────────────────────────────────────────
const disabledValue = ref('@Alice 你好')

// ─── 自定义过滤 ─────────────────────────────────────────────────────────────
const customFilterValue = ref('')
const pinyin = { alice: 'alice', bob: 'bob', carol: 'carol' }
const customOptions = [
  { value: 'alice', label: 'Alice（爱丽丝）' },
  { value: 'bob', label: 'Bob（鲍勃）' },
  { value: 'carol', label: 'Carol（卡罗尔）' }
]
const customFilter = (keyword: string, opt: { value: string; label: string }) => {
  const lower = keyword.toLowerCase()
  return (
    opt.label.toLowerCase().includes(lower) ||
    (pinyin[opt.value as keyof typeof pinyin] || '').toLowerCase().includes(lower)
  )
}

// ─── 字数统计 ────────────────────────────────────────────────────────────────
const countValue = ref('')

// ─── Nuxt 演示 ──────────────────────────────────────────────────────────────
const nuxtValue = ref('@Nuxt 你好')

// ─── 代码示例 ────────────────────────────────────────────────────────────────
const tsBasic = `<${_T}>
  <yh-mention
    v-model="value"
    :options="options"
    placeholder="输入 @ 提及某人"
    style="width: 400px;"
  />
  <p>当前值：{{ value }}</p>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const value = ref('')
const options = [
  { value: 'alice', label: 'Alice Zhou', description: '前端工程师' },
  { value: 'bob', label: 'Bob Zhang', description: '后端工程师' },
  { value: 'carol', label: 'Carol Wang', description: '设计师' },
  { value: 'david', label: 'David Li', description: '产品经理' }
]
</${_S}>`

const jsBasic = toJs(tsBasic)

const tsAvatar = `<${_T}>
  <yh-mention
    v-model="value"
    :options="options"
    placeholder="输入 @ 提及某人（带头像）"
    style="width: 400px;"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const value = ref('')
const options = [
  { value: 'alice', label: 'Alice', avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=1', description: '前端工程师' },
  { value: 'bob', label: 'Bob', avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=2', description: '后端工程师' },
  { value: 'carol', label: 'Carol', avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=3', description: '设计师' }
]
</${_S}>`

const jsAvatar = toJs(tsAvatar)

const tsGroup = `<${_T}>
  <yh-mention
    v-model="value"
    :options="options"
    placeholder="输入 @ 提及（分组展示）"
    style="width: 400px;"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const value = ref('')
const options = [
  { value: 'alice', label: 'Alice', group: '前端组' },
  { value: 'bob', label: 'Bob', group: '前端组' },
  { value: 'carol', label: 'Carol', group: '后端组' },
  { value: 'david', label: 'David', group: '后端组' },
  { value: 'evan', label: 'Evan', group: '设计组' }
]
</${_S}>`

const jsGroup = toJs(tsGroup)

const tsMultiTrig = `<${_T}>
  <yh-mention
    v-model="value"
    :options="options"
    :triggers="['@', '#']"
    @search="handleSearch"
    placeholder="输入 @ 提人，# 打标签"
    style="width: 400px;"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const value = ref('')
const peopleOptions = [{ value: 'alice', label: 'Alice' }, { value: 'bob', label: 'Bob' }]
const tagOptions = [{ value: 'frontend', label: '前端' }, { value: 'backend', label: '后端' }]
const options = ref(peopleOptions)

const handleSearch = (keyword: string, trigger: string) => {
  if (trigger === '@') {
    options.value = peopleOptions.filter(o => o.label.toLowerCase().includes(keyword.toLowerCase()))
  } else {
    options.value = tagOptions.filter(o => o.label.includes(keyword))
  }
}
</${_S}>`

const jsMultiTrig = toJs(tsMultiTrig)

const tsAsync = `<${_T}>
  <yh-mention
    v-model="value"
    :options="options"
    :loading="loading"
    @search="handleSearch"
    placeholder="输入 @ 并搜索（800ms 延迟）"
    style="width: 400px;"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const value = ref('')
const loading = ref(false)
const options = ref([])

const handleSearch = (keyword: string) => {
  loading.value = true
  options.value = []
  // 模拟异步请求
  setTimeout(() => {
    options.value = [
      { value: 'alice', label: 'Alice (' + keyword + ')', description: '远程加载' },
      { value: 'bob', label: 'Bob (' + keyword + ')', description: '远程加载' }
    ].filter(o => o.value.includes(keyword) || !keyword)
    loading.value = false
  }, 800)
}
</${_S}>`

const jsAsync = toJs(tsAsync)

const tsTextarea = `<${_T}>
  <yh-mention
    v-model="value"
    type="textarea"
    :options="options"
    :rows="4"
    placeholder="输入 @ 提及某人（文本域模式）"
    style="width: 100%;"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const value = ref('')
const options = [
  { value: 'alice', label: 'Alice Zhou', description: '前端工程师' },
  { value: 'bob', label: 'Bob Zhang', description: '后端工程师' },
  { value: 'carol', label: 'Carol Wang', description: '设计师' },
  { value: 'david', label: 'David Li', description: '产品经理' }
]
</${_S}>`

const jsTextarea = toJs(tsTextarea)

const tsCustomFilter = `<${_T}>
  <yh-mention
    v-model="value"
    :options="options"
    :filter-option="customFilter"
    placeholder="支持拼音搜索（如输入 alice）"
    style="width: 400px;"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const value = ref('')
const pinyin = { alice: 'alice', bob: 'bob', carol: 'carol' }
const options = [
  { value: 'alice', label: 'Alice（爱丽丝）' },
  { value: 'bob', label: 'Bob（鲍勃）' },
  { value: 'carol', label: 'Carol（卡罗尔）' }
]
const customFilter = (keyword: string, opt: MentionOption) => {
  const lower = keyword.toLowerCase()
  return (
    opt.label.toLowerCase().includes(lower) ||
    (pinyin[opt.value as keyof typeof pinyin] || '').toLowerCase().includes(lower)
  )
}
</${_S}>`

const jsCustomFilter = toJs(tsCustomFilter)

const tsSlot = `<${_T}>
  <yh-mention v-model="value" :options="options">
    <${_T} #option="{ option, keyword }">
      <div style="display: flex; align-items: center; gap: 8px;">
        <span style="font-weight: bold; color: var(--yh-color-primary);">{{ option.label }}</span>
        <span style="font-size: 12px; color: #999;" v-if="keyword">匹配词：{{ keyword }}</span>
      </div>
    </${_T}>
  </yh-mention>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const value = ref('')
const options = [
  { value: 'alice', label: 'Alice Zhou', description: '前端工程师' },
  { value: 'bob', label: 'Bob Zhang', description: '后端工程师' },
  { value: 'carol', label: 'Carol Wang', description: '设计师' },
  { value: 'david', label: 'David Li', description: '产品经理' }
]
</${_S}>`

const jsSlot = toJs(tsSlot)

const tsCount = `<${_T}>
  <yh-mention
    v-model="value"
    :options="[]"
    :maxlength="100"
    show-word-limit
    placeholder="最多输入 100 字"
    style="width: 400px;"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const value = ref('')
</${_S}>`

const jsCount = toJs(tsCount)

const tsNuxt = `<${_T}>
  <div style="max-width: 400px;">
    <!-- 组件自动导入，无需手动引入 -->
    <yh-mention
      v-model="value"
      :options="options"
      placeholder="Nuxt 自动导入演示"
      clearable
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value = ref('@Nuxt 你好')
const options = [{ value: 'nuxt', label: 'Nuxt 4', description: 'The Intuitive Vue Framework' }]
</${_S}>`

const jsNuxt = toJs(tsNuxt)

const tsDisabled = `<${_T}>
  <yh-mention v-model="value" disabled :options="options" style="width: 400px;" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const value = ref('@Alice 你好')
const options = [
  { value: 'alice', label: 'Alice Zhou', description: '前端工程师' },
  { value: 'bob', label: 'Bob Zhang', description: '后端工程师' },
  { value: 'carol', label: 'Carol Wang', description: '设计师' },
  { value: 'david', label: 'David Li', description: '产品经理' }
]
</${_S}>`
const jsDisabled = toJs(tsDisabled)
</script>

用于在输入框或文本域中通过触发符号（`@`、`#` 等）快速选择并插入提及内容，广泛应用于评论、私信、任务协作等场景。

## 基础用法

使用 `v-model` 绑定值，`options` 配置候选列表。在输入框内输入 `@` 即可触发选项面板。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="width: 400px;">
    <yh-mention
      v-model="basicValue"
      :options="basicOptions"
      placeholder="输入 @ 提及某人"
    />
    <p style="margin-top: 12px; color: var(--yh-text-color-secondary);">当前值：{{ basicValue }}</p>
  </div>
</DemoBlock>

## 头像选项

为 `options` 中的每个选项添加 `avatar` 字段，即可在下拉面板中展示头像，配合 `description` 展示描述信息。

<DemoBlock title="带头像的选项" :ts-code="tsAvatar" :js-code="jsAvatar">
  <div style="width: 400px;">
    <yh-mention
      v-model="avatarValue"
      :options="avatarOptions"
      placeholder="输入 @ 提及某人（带头像）"
    />
  </div>
</DemoBlock>

## 分组选项

设置 `group` 字段即可将选项按组归类展示，相同 `group` 值的选项自动合并到同一分组。

<DemoBlock title="分组选项" :ts-code="tsGroup" :js-code="jsGroup">
  <div style="width: 400px;">
    <yh-mention
      v-model="groupValue"
      :options="groupOptions"
      placeholder="输入 @ 提及（分组展示）"
    />
  </div>
</DemoBlock>

## 多触发符

通过 `triggers` 指定多个触发字符，如同时支持 `@` 提人和 `#` 打标签。配合 `search` 事件动态切换选项源。

<DemoBlock title="多触发符" :ts-code="tsMultiTrig" :js-code="jsMultiTrig">
  <div style="width: 400px;">
    <yh-mention
      v-model="multiTrigValue"
      :options="multiTrigOptions"
      :triggers="['@', '#']"
      @search="handleSearch"
      placeholder="输入 @ 提人，# 打标签"
    />
    <p style="margin-top: 12px; color: var(--yh-text-color-secondary);">当前值：{{ multiTrigValue }}</p>
  </div>
</DemoBlock>

## 异步加载

监听 `search` 事件发起网络请求，通过 `:loading="true"` 显示加载状态，数据返回后更新 `options`。

<DemoBlock title="异步加载" :ts-code="tsAsync" :js-code="jsAsync">
  <div style="width: 400px;">
    <yh-mention
      v-model="asyncValue"
      :options="asyncOptions"
      :loading="asyncLoading"
      @search="handleAsyncSearch"
      placeholder="输入 @ 并搜索（800ms 延迟）"
    />
  </div>
</DemoBlock>

## 文本域模式

设置 `type="textarea"` 即可在多行文本域中使用提及功能，支持所有提及特性。

<DemoBlock title="文本域模式" :ts-code="tsTextarea" :js-code="jsTextarea">
  <yh-mention
    v-model="textareaValue"
    type="textarea"
    :options="basicOptions"
    :rows="4"
    placeholder="输入 @ 提及某人（文本域模式）"
    style="width: 100%;"
  />
</DemoBlock>

## 自定义过滤

通过 `filter-option` 属性自定义过滤逻辑，例如支持拼音搜索。设为 `false` 则禁用过滤显示全部选项。

<DemoBlock title="自定义过滤（拼音支持）" :ts-code="tsCustomFilter" :js-code="jsCustomFilter">
  <div style="width: 400px;">
    <yh-mention
      v-model="customFilterValue"
      :options="customOptions"
      :filter-option="customFilter"
      placeholder="支持拼音搜索（如输入 alice）"
    />
  </div>
</DemoBlock>

## 自定义选项渲染

通过 `#option` 插槽自定义选项显示内容，插槽参数包含 `option` 和 `keyword`。

<DemoBlock title="自定义选项渲染" :ts-code="tsSlot" :js-code="jsSlot">
  <div style="width: 400px;">
    <yh-mention v-model="basicValue" :options="basicOptions">
      <template #option="{ option, keyword }">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-weight: bold; color: var(--yh-color-primary);">{{ option.label }}</span>
          <span style="font-size: 12px; color: #999;" v-if="keyword">匹配词：{{ keyword }}</span>
        </div>
      </template>
    </yh-mention>
  </div>
</DemoBlock>

## 字数统计

配合 `maxlength` 和 `show-word-limit` 属性，实时显示当前输入字数。

<DemoBlock title="字数统计" :ts-code="tsCount" :js-code="jsCount">
  <yh-mention
    v-model="countValue"
    :options="[]"
    :maxlength="100"
    show-word-limit
    placeholder="最多输入 100 字"
    style="width: 400px;"
  />
</DemoBlock>

## 禁用状态

设置 `disabled` 属性禁用组件，禁用状态下既不能输入也不会触发选项面板。

<DemoBlock title="禁用状态" :ts-code="tsDisabled" :js-code="jsDisabled">
  <yh-mention v-model="disabledValue" disabled :options="basicOptions" style="width: 400px;" />
</DemoBlock>

## 在 Nuxt 中使用

Mention 组件完全兼容 Nuxt 3/4，已在 SSR 环境中经过验证。初始值（`modelValue`）会在服务端直接渲染为静态文本，触发选项面板等交互在客户端激活后生效。

<DemoBlock title="Nuxt 中使用" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="max-width: 400px;">
    <yh-mention
      v-model="nuxtValue"
      :options="[{ value: 'nuxt', label: 'Nuxt 4', description: 'The Intuitive Vue Framework' }]"
      placeholder="Nuxt 自动导入演示"
      clearable
    />
  </div>
</DemoBlock>

**SSR 注意事项**：

- ✅ `modelValue` 绑定的初始文本在服务端正确渲染
- ✅ 禁用、只读状态在服务端即生效
- ✅ 多尺寸、自定义 class 在服务端渲染正常
- ⚠️ 下拉面板、触发选项等交互在客户端 Hydration 后生效
- 💡 配合 Nuxt 的 `<ClientOnly>` 可按需将交互部分降级为纯客户端渲染

::: tip SSR 性能建议
在 SSR 场景下，Mention 的初始渲染只包含输入框本身，下拉面板不会被服务端渲染（`v-show="false"`），因此对首屏性能影响极小。
:::

## API

### Props

| 属性名                | 说明                                  | 类型                                      | 默认值        |
| --------------------- | ------------------------------------- | ----------------------------------------- | ------------- |
| model-value / v-model | 绑定值                                | `string`                                  | `''`          |
| options               | 候选选项列表                          | `MentionOption[]`                         | `[]`          |
| triggers              | 触发字符（可多个）                    | `string[]`                                | `['@']`       |
| type                  | 输入框类型                            | `'input' \| 'textarea'`                   | `'input'`     |
| placement             | 下拉框弹出方向                        | `'top' \| 'bottom'`                       | `'bottom'`    |
| placeholder           | 占位文本                              | `string`                                  | —             |
| disabled              | 是否禁用                              | `boolean`                                 | `false`       |
| readonly              | 是否只读                              | `boolean`                                 | `false`       |
| size                  | 尺寸                                  | `'large' \| 'default' \| 'small'`         | `'default'`   |
| maxlength             | 最大输入长度                          | `number`                                  | —             |
| clearable             | 是否可清空                            | `boolean`                                 | `false`       |
| show-word-limit       | 是否显示字数统计                      | `boolean`                                 | `false`       |
| prefix-icon           | 前缀图标                              | `Component`                               | —             |
| suffix-icon           | 后缀图标                              | `Component`                               | —             |
| filter-option         | 自定义过滤函数，设为 `false` 禁用过滤 | `((keyword, option) => boolean) \| false` | —             |
| loading               | 是否显示加载状态                      | `boolean`                                 | `false`       |
| loading-text          | 加载中文字                            | `string`                                  | `'加载中...'` |
| no-data-text          | 无数据文字                            | `string`                                  | `'暂无数据'`  |
| teleported            | 是否挂载到 body                       | `boolean`                                 | `true`        |
| popper-class          | 下拉框自定义 class                    | `string`                                  | `''`          |
| split                 | 选中后追加的分隔符                    | `string`                                  | `' '`         |
| whole-word            | 是否以完整词写入                      | `boolean`                                 | `false`       |
| autofocus             | 是否自动聚焦                          | `boolean`                                 | `false`       |
| rows                  | 文本域行数（textarea 有效）           | `number`                                  | `3`           |
| debounce              | 防抖延迟（ms）                        | `number`                                  | `100`         |
| validate-event        | 是否触发表单校验                      | `boolean`                                 | `true`        |
| theme-overrides       | 主题覆盖变量                          | `ComponentThemeVars`                      | —             |

### MentionOption

| 字段        | 说明             | 类型      |
| ----------- | ---------------- | --------- |
| value       | 唯一标识（必填） | `string`  |
| label       | 显示标签         | `string`  |
| disabled    | 是否禁用         | `boolean` |
| avatar      | 头像 URL         | `string`  |
| description | 描述信息         | `string`  |
| group       | 分组名称         | `string`  |

### Events

| 事件名            | 说明             | 回调参数                                           |
| ----------------- | ---------------- | -------------------------------------------------- |
| update:modelValue | 值变化时触发     | `(value: string) => void`                          |
| input             | 输入时触发       | `(value: string) => void`                          |
| change            | 失焦时触发       | `(value: string) => void`                          |
| focus             | 聚焦时触发       | `(event: FocusEvent) => void`                      |
| blur              | 失焦时触发       | `(event: FocusEvent) => void`                      |
| clear             | 清空时触发       | `() => void`                                       |
| **search**        | 触发搜索时触发   | `(keyword: string, trigger: string) => void`       |
| **select**        | 选中选项时触发   | `(option: MentionOption, trigger: string) => void` |
| **open**          | 下拉框打开时触发 | `() => void`                                       |
| **close**         | 下拉框关闭时触发 | `() => void`                                       |
| keydown           | 键盘按下时触发   | `(event: KeyboardEvent) => void`                   |

### Slots

| 插槽名      | 说明             | 作用域参数                                   |
| ----------- | ---------------- | -------------------------------------------- |
| **option**  | 自定义选项渲染   | `{ option: MentionOption, keyword: string }` |
| **empty**   | 自定义无数据内容 | —                                            |
| **loading** | 自定义加载内容   | —                                            |
| prefix      | 自定义前缀内容   | —                                            |
| suffix      | 自定义后缀内容   | —                                            |

### Expose

| 属性/方法         | 说明            | 类型                                                |
| ----------------- | --------------- | --------------------------------------------------- |
| ref               | 输入框 DOM 元素 | `HTMLInputElement \| HTMLTextAreaElement`           |
| wrapperRef        | 包裹元素 DOM    | `HTMLElement`                                       |
| focus             | 获取焦点        | `() => void`                                        |
| blur              | 失去焦点        | `() => void`                                        |
| clear             | 清空内容        | `() => void`                                        |
| **insertMention** | 编程式插入提及  | `(option: MentionOption, trigger?: string) => void` |

## 键盘操作

| 按键      | 说明                           |
| --------- | ------------------------------ |
| `↑` / `↓` | 上下切换高亮选项               |
| `Enter`   | 选中当前高亮项                 |
| `Tab`     | 选中当前高亮项（无高亮则关闭） |
| `Escape`  | 关闭下拉面板                   |

## 主题变量

| 变量名                         | 说明     | 默认值                             |
| ------------------------------ | -------- | ---------------------------------- |
| `--yh-mention-font-size`       | 字体大小 | `var(--yh-font-size-base)`         |
| `--yh-mention-bg-color`        | 背景颜色 | `var(--yh-fill-color-blank)`       |
| `--yh-mention-border-color`    | 边框颜色 | `var(--yh-border-color)`           |
| `--yh-mention-border-radius`   | 圆角     | `var(--yh-border-radius-base)`     |
| `--yh-mention-height-default`  | 默认高度 | `var(--yh-component-size-default)` |
| `--yh-mention-dropdown-shadow` | 下拉阴影 | `var(--yh-box-shadow-light)`       |

### 类型导出

| 名称 | 说明 |
| --- | --- |
| `YhMentionProps` | 组件 Props 类型 |
| `YhMentionEmits` | 组件事件类型 |
| `YhMentionSlots` | 组件插槽类型 |
| `YhMentionExpose` | 组件 Expose 类型 |
| `YhMentionOption` | 提及选项类型 |
| `YhMentionTriggerPosition` | 触发位置类型 |
| `YhMentionPlacement` | 下拉方向类型 |
| `YhMentionSize` | 尺寸联合类型 |
| `YhMentionInstance` | 组件实例类型 |
