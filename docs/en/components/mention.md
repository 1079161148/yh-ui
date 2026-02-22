# Mention

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { toJs, _T, _S, _St } from '../../.vitepress/theme/utils/demo-utils'

// ─── Basic Usage ────────────────────────────────────────────────────────────
const basicValue = ref('')
const basicOptions = [
  { value: 'alice', label: 'Alice Zhou', description: 'Frontend Engineer' },
  { value: 'bob', label: 'Bob Zhang', description: 'Backend Engineer' },
  { value: 'carol', label: 'Carol Wang', description: 'Designer' },
  { value: 'david', label: 'David Li', description: 'Product Manager' }
]

// ─── Avatar Mode ────────────────────────────────────────────────────────────
const avatarValue = ref('')
const avatarOptions = [
  { value: 'alice', label: 'Alice', avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=1', description: 'Frontend Engineer' },
  { value: 'bob', label: 'Bob', avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=2', description: 'Backend Engineer' },
  { value: 'carol', label: 'Carol', avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=3', description: 'Designer' }
]

// ─── Grouped ─────────────────────────────────────────────────────────────────
const groupValue = ref('')
const groupOptions = [
  { value: 'alice', label: 'Alice', group: 'Frontend Team' },
  { value: 'bob', label: 'Bob', group: 'Frontend Team' },
  { value: 'carol', label: 'Carol', group: 'Backend Team' },
  { value: 'david', label: 'David', group: 'Backend Team' },
  { value: 'evan', label: 'Evan', group: 'Design Team' }
]

// ─── Multiple Triggers ───────────────────────────────────────────────────────
const multiTrigValue = ref('')
const peopleOptions = [
  { value: 'alice', label: 'Alice' },
  { value: 'bob', label: 'Bob' }
]
const tagOptions = [
  { value: 'frontend', label: 'Frontend' },
  { value: 'backend', label: 'Backend' },
  { value: 'design', label: 'Design' }
]
const multiTrigOptions = ref(peopleOptions)
const handleSearch = (keyword: string, trigger: string) => {
  if (trigger === '@') {
    multiTrigOptions.value = peopleOptions.filter(o => o.label.toLowerCase().includes(keyword.toLowerCase()))
  } else {
    multiTrigOptions.value = tagOptions.filter(o => o.label.includes(keyword))
  }
}

// ─── Async Loading ───────────────────────────────────────────────────────────
const asyncValue = ref('')
const asyncLoading = ref(false)
const asyncOptions = ref<{ value: string; label: string; description: string }[]>([])
const handleAsyncSearch = (keyword: string) => {
  asyncLoading.value = true
  asyncOptions.value = []
  setTimeout(() => {
    asyncOptions.value = [
      { value: 'alice', label: 'Alice (' + keyword + ')', description: 'Remote loaded' },
      { value: 'bob', label: 'Bob (' + keyword + ')', description: 'Remote loaded' }
    ].filter(o => o.value.includes(keyword) || !keyword)
    asyncLoading.value = false
  }, 800)
}

// ─── Textarea Mode ───────────────────────────────────────────────────────────
const textareaValue = ref('')

// ─── Disabled ───────────────────────────────────────────────────────────────
const disabledValue = ref('@Alice Hello')

// ─── Custom Filter ───────────────────────────────────────────────────────────
const customFilterValue = ref('')
const pinyin = { alice: 'alice', bob: 'bob', carol: 'carol' }
const customOptions = [
  { value: 'alice', label: 'Alice' },
  { value: 'bob', label: 'Bob' },
  { value: 'carol', label: 'Carol' }
]
const customFilter = (keyword: string, opt: { value: string; label: string }) => {
  const lower = keyword.toLowerCase()
  return (
    opt.label.toLowerCase().includes(lower) ||
    (pinyin[opt.value as keyof typeof pinyin] || '').toLowerCase().includes(lower)
  )
}

// ─── Word Count ──────────────────────────────────────────────────────────────
const countValue = ref('')

// ─── Nuxt Demo ───────────────────────────────────────────────────────────────
const nuxtValue = ref('@Nuxt Hello')

// ─── Code Snippets ──────────────────────────────────────────────────────────
const tsBasic = `<${_T}>
  <yh-mention
    v-model="value"
    :options="options"
    placeholder="Type @ to mention someone"
    style="width: 400px;"
  />
  <p>Current value: {{ value }}</p>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const value = ref('')
const options = [
  { value: 'alice', label: 'Alice Zhou', description: 'Frontend Engineer' },
  { value: 'bob', label: 'Bob Zhang', description: 'Backend Engineer' },
  { value: 'carol', label: 'Carol Wang', description: 'Designer' },
  { value: 'david', label: 'David Li', description: 'Product Manager' }
]
</${_S}>`

const jsBasic = toJs(tsBasic)

const tsAvatar = `<${_T}>
  <yh-mention
    v-model="value"
    :options="options"
    placeholder="Type @ to mention someone (with avatars)"
    style="width: 400px;"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const value = ref('')
const options = [
  { value: 'alice', label: 'Alice', avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=1', description: 'Frontend Engineer' },
  { value: 'bob', label: 'Bob', avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=2', description: 'Backend Engineer' },
  { value: 'carol', label: 'Carol', avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=3', description: 'Designer' }
]
</${_S}>`

const jsAvatar = toJs(tsAvatar)

const tsGroup = `<${_T}>
  <yh-mention
    v-model="value"
    :options="options"
    placeholder="Type @ to mention (grouped)"
    style="width: 400px;"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const value = ref('')
const options = [
  { value: 'alice', label: 'Alice', group: 'Frontend Team' },
  { value: 'bob', label: 'Bob', group: 'Frontend Team' },
  { value: 'carol', label: 'Carol', group: 'Backend Team' },
  { value: 'david', label: 'David', group: 'Backend Team' },
  { value: 'evan', label: 'Evan', group: 'Design Team' }
]
</${_S}>`

const jsGroup = toJs(tsGroup)

const tsMultiTrig = `<${_T}>
  <yh-mention
    v-model="value"
    :options="options"
    :triggers="['@', '#']"
    @search="handleSearch"
    placeholder="Type @ for people, # for tags"
    style="width: 400px;"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const value = ref('')
const peopleOptions = [{ value: 'alice', label: 'Alice' }, { value: 'bob', label: 'Bob' }]
const tagOptions = [{ value: 'frontend', label: 'Frontend' }, { value: 'backend', label: 'Backend' }]
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
    placeholder="Type @ and search (800ms delay)"
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
  // Simulate async request
  setTimeout(() => {
    options.value = [
      { value: 'alice', label: 'Alice (' + keyword + ')', description: 'Remote loaded' },
      { value: 'bob', label: 'Bob (' + keyword + ')', description: 'Remote loaded' }
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
    placeholder="Type @ to mention someone (textarea mode)"
    style="width: 100%;"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const value = ref('')
const options = [
  { value: 'alice', label: 'Alice Zhou', description: 'Frontend Engineer' },
  { value: 'bob', label: 'Bob Zhang', description: 'Backend Engineer' },
  { value: 'carol', label: 'Carol Wang', description: 'Designer' },
  { value: 'david', label: 'David Li', description: 'Product Manager' }
]
</${_S}>`

const jsTextarea = toJs(tsTextarea)

const tsCustomFilter = `<${_T}>
  <yh-mention
    v-model="value"
    :options="options"
    :filter-option="customFilter"
    placeholder="Support search (e.g., type alice)"
    style="width: 400px;"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const value = ref('')
const pinyin = { alice: 'alice', bob: 'bob', carol: 'carol' }
const options = [
  { value: 'alice', label: 'Alice' },
  { value: 'bob', label: 'Bob' },
  { value: 'carol', label: 'Carol' }
]
const customFilter = (keyword: string, opt: any) => {
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
        <span style="font-size: 12px; color: #999;" v-if="keyword">Match: {{ keyword }}</span>
      </div>
    </${_T}>
  </yh-mention>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const value = ref('')
const options = [
  { value: 'alice', label: 'Alice Zhou', description: 'Frontend Engineer' },
  { value: 'bob', label: 'Bob Zhang', description: 'Backend Engineer' },
  { value: 'carol', label: 'Carol Wang', description: 'Designer' },
  { value: 'david', label: 'David Li', description: 'Product Manager' }
]
</${_S}>`

const jsSlot = toJs(tsSlot)

const tsCount = `<${_T}>
  <yh-mention
    v-model="value"
    :options="[]"
    :maxlength="100"
    show-word-limit
    placeholder="Max 100 characters"
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
    <!-- Component auto-imported, no manual import needed -->
    <yh-mention
      v-model="value"
      :options="options"
      placeholder="Nuxt auto-import demo"
      clearable
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value = ref('@Nuxt Hello')
const options = [{ value: 'nuxt', label: 'Nuxt 4', description: 'The Intuitive Vue Framework' }]
</${_S}>`

const jsNuxt = toJs(tsNuxt)

const tsDisabled = `<${_T}>
  <yh-mention v-model="value" disabled :options="options" style="width: 400px;" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const value = ref('@Alice Hello')
const options = [
  { value: 'alice', label: 'Alice Zhou', description: 'Frontend Engineer' },
  { value: 'bob', label: 'Bob Zhang', description: 'Backend Engineer' },
  { value: 'carol', label: 'Carol Wang', description: 'Designer' },
  { value: 'david', label: 'David Li', description: 'Product Manager' }
]
</${_S}>`
const jsDisabled = toJs(tsDisabled)
</script>

Used to quickly select and insert mention content via trigger characters (`@`, `#`, etc.) in inputs or textareas. Widely used in comments, private messages, and task collaboration scenarios.

## Basic Usage

Bind values using `v-model` and configure candidate lists with `options`. Type `@` in the input to trigger the suggestion panel.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="width: 400px;">
    <yh-mention
      v-model="basicValue"
      :options="basicOptions"
      placeholder="Type @ to mention someone"
    />
    <p style="margin-top: 12px; color: var(--yh-text-color-secondary);">Current value: {{ basicValue }}</p>
  </div>
</DemoBlock>

## Avatar Options

Add an `avatar` field to each option to display user avatars in the dropdown, combined with `description` to show additional info.

<DemoBlock title="Options with Avatars" :ts-code="tsAvatar" :js-code="jsAvatar">
  <div style="width: 400px;">
    <yh-mention
      v-model="avatarValue"
      :options="avatarOptions"
      placeholder="Type @ to mention (with avatars)"
    />
  </div>
</DemoBlock>

## Grouped Options

Set the `group` field to categorize options into groups. Options with the same `group` value are automatically merged into the same section.

<DemoBlock title="Grouped Options" :ts-code="tsGroup" :js-code="jsGroup">
  <div style="width: 400px;">
    <yh-mention
      v-model="groupValue"
      :options="groupOptions"
      placeholder="Type @ to mention (grouped)"
    />
  </div>
</DemoBlock>

## Multiple Triggers

Specify multiple trigger characters via `triggers`, such as supporting both `@` for people and `#` for tags. Switch option sources dynamically using the `search` event.

<DemoBlock title="Multiple Triggers" :ts-code="tsMultiTrig" :js-code="jsMultiTrig">
  <div style="width: 400px;">
    <yh-mention
      v-model="multiTrigValue"
      :options="multiTrigOptions"
      :triggers="['@', '#']"
      @search="handleSearch"
      placeholder="@ for people, # for tags"
    />
    <p style="margin-top: 12px; color: var(--yh-text-color-secondary);">Current value: {{ multiTrigValue }}</p>
  </div>
</DemoBlock>

## Async Loading

Listen to the `search` event to initiate network requests. Use `:loading="true"` to show a loading indicator, then update `options` when data returns.

<DemoBlock title="Async Loading" :ts-code="tsAsync" :js-code="jsAsync">
  <div style="width: 400px;">
    <yh-mention
      v-model="asyncValue"
      :options="asyncOptions"
      :loading="asyncLoading"
      @search="handleAsyncSearch"
      placeholder="Type @ and search (800ms delay)"
    />
  </div>
</DemoBlock>

## Textarea Mode

Set `type="textarea"` to use mention functionality in a multi-line textarea, supporting all mention features.

<DemoBlock title="Textarea Mode" :ts-code="tsTextarea" :js-code="jsTextarea">
  <yh-mention
    v-model="textareaValue"
    type="textarea"
    :options="basicOptions"
    :rows="4"
    placeholder="Type @ to mention (textarea mode)"
    style="width: 100%;"
  />
</DemoBlock>

## Custom Filter

Customize filtering logic via the `filter-option` prop, for example to support Pinyin search. Set to `false` to disable filtering and display all options.

<DemoBlock title="Custom Filter (Pinyin Support)" :ts-code="tsCustomFilter" :js-code="jsCustomFilter">
  <div style="width: 400px;">
    <yh-mention
      v-model="customFilterValue"
      :options="customOptions"
      :filter-option="customFilter"
      placeholder="Support Pinyin search (e.g., type alice)"
    />
  </div>
</DemoBlock>

## Custom Option Rendering

Customize option display content using the `#option` slot. Slot parameters include `option` and `keyword`.

<DemoBlock title="Custom Option Rendering" :ts-code="tsSlot" :js-code="jsSlot">
  <div style="width: 400px;">
    <yh-mention v-model="basicValue" :options="basicOptions">
      <template #option="{ option, keyword }">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-weight: bold; color: var(--yh-color-primary);">{{ option.label }}</span>
          <span style="font-size: 12px; color: #999;" v-if="keyword">Match: {{ keyword }}</span>
        </div>
      </template>
    </yh-mention>
  </div>
</DemoBlock>

## Word Count

Display character count in real-time when used with `maxlength` and `show-word-limit`.

<DemoBlock title="Word Count" :ts-code="tsCount" :js-code="jsCount">
  <yh-mention
    v-model="countValue"
    :options="[]"
    :maxlength="100"
    show-word-limit
    placeholder="Max 100 characters"
    style="width: 400px;"
  />
</DemoBlock>

## Disabled

Set `disabled` to disable the component. Actions are prevented and the suggestion panel won't trigger.

<DemoBlock title="Disabled" :ts-code="tsDisabled" :js-code="jsDisabled">
  <yh-mention v-model="disabledValue" disabled :options="basicOptions" style="width: 400px;" />
</DemoBlock>

## Usage in Nuxt

Mention is fully compatible with Nuxt 3/4 and has been verified in SSR environments. The initial `modelValue` renders as static text on the server, and interactions activate after client-side hydration.

<DemoBlock title="Nuxt Usage" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="max-width: 400px;">
    <yh-mention
      v-model="nuxtValue"
      :options="[{ value: 'nuxt', label: 'Nuxt 4', description: 'The Intuitive Vue Framework' }]"
      placeholder="Nuxt auto-import demo"
      clearable
    />
  </div>
</DemoBlock>

**SSR Considerations**:

- ✅ `modelValue` initial text renders correctly on server
- ✅ Disabled and Readonly states effect on server
- ✅ Multi-size and custom classes render correctly on server
- ⚠️ Dropdown and triggers activate after client-side Hydration
- 💡 Use Nuxt's `<ClientOnly>` to downgrade interactions to client-side only if needed

::: tip SSR Performance
In SSR scenarios, Mention's initial render only includes the input itself. The dropdown panel is not server-rendered (`v-show="false"`), minimizing impact on first-paint performance.
:::

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| model-value / v-model | Binding value | `string` | `''` |
| options | Candidate options list | `MentionOption[]` | `[]` |
| triggers | Trigger characters | `string[]` | `['@']` |
| type | Input type | `'input' \| 'textarea'` | `'input'` |
| placement | Dropdown direction | `'top' \| 'bottom'` | `'bottom'` |
| placeholder | Placeholder text | `string` | — |
| disabled | Whether disabled | `boolean` | `false` |
| readonly | Whether readonly | `boolean` | `false` |
| size | Size | `'large' \| 'default' \| 'small'` | `'default'` |
| maxlength | Max input length | `number` | — |
| clearable | Whether clearable | `boolean` | `false` |
| show-word-limit | Whether to show word limit | `boolean` | `false` |
| prefix-icon | Prefix icon | `Component` | — |
| suffix-icon | Suffix icon | `Component` | — |
| filter-option | Custom filter function, set to `false` to disable | `((keyword, option) => boolean) \| false` | — |
| loading | Whether loading | `boolean` | `false` |
| loading-text | Loading text | `string` | `'Loading...'` |
| no-data-text | No data text | `string` | `'No Data'` |
| teleported | Mount dropdown to body | `boolean` | `true` |
| popper-class | Custom dropdown class | `string` | `''` |
| split | Separator appended after selection | `string` | `' '` |
| whole-word | Whether to insert as whole word | `boolean` | `false` |
| autofocus | Auto focus | `boolean` | `false` |
| rows | Textarea rows | `number` | `3` |
| debounce | Search debounce delay (ms) | `number` | `100` |
| validate-event | Whether to trigger form validation | `boolean` | `true` |
| theme-overrides | Theme override variables | `ComponentThemeVars` | — |

### MentionOption

| Field | Description | Type |
| --- | --- | --- |
| value | Unique identifier (required) | `string` |
| label | Display label | `string` |
| disabled | Whether disabled | `boolean` |
| avatar | Avatar URL | `string` |
| description | Description info | `string` |
| group | Group name | `string` |

### Events

| Event | Description | Parameters |
| --- | --- | --- |
| update:modelValue | Triggered on value change | `(value: string) => void` |
| input | Triggered on input | `(value: string) => void` |
| change | Triggered on blur | `(value: string) => void` |
| focus | Triggered on focus | `(event: FocusEvent) => void` |
| blur | Triggered on blur | `(event: FocusEvent) => void` |
| clear | Triggered on clear | `() => void` |
| **search** | Triggered on search | `(keyword: string, trigger: string) => void` |
| **select** | Triggered on selecting an option | `(option: MentionOption, trigger: string) => void` |
| **open** | Triggered when opening dropdown | `() => void` |
| **close** | Triggered when closing dropdown | `() => void` |
| keydown | Triggered on keydown | `(event: KeyboardEvent) => void` |

### Slots

| Slot | Description | Scope |
| --- | --- | --- |
| **option** | Custom option rendering | `{ option: MentionOption, keyword: string }` |
| **empty** | Custom no data content | — |
| **loading** | Custom loading content | — |
| prefix | Custom prefix content | — |
| suffix | Custom suffix content | — |

### Expose

| Prop/Method | Description | Type |
| --- | --- | --- |
| ref | Input/Textarea DOM element | `HTMLInputElement \| HTMLTextAreaElement` |
| wrapperRef | Wrapper DOM element | `HTMLElement` |
| focus | Focus the input | `() => void` |
| blur | Blur the input | `() => void` |
| clear | Clear the input | `() => void` |
| **insertMention** | Programmatically insert mention | `(option: MentionOption, trigger?: string) => void` |

## Keyboard Operations

| Key | Description |
| --- | --- |
| `↑` / `↓` | Navigate highlight options |
| `Enter` | Select highlighted option |
| `Tab` | Select highlighted option (closes if none) |
| `Escape` | Close dropdown panel |

## Theme Variables

| Variable | Description | Default |
| --- | --- | --- |
| `--yh-mention-font-size` | Font size | `var(--yh-font-size-base)` |
| `--yh-mention-bg-color` | Background color | `var(--yh-fill-color-blank)` |
| `--yh-mention-border-color` | Border color | `var(--yh-border-color)` |
| `--yh-mention-border-radius` | Border radius | `var(--yh-border-radius-base)` |
| `--yh-mention-height-default` | Default height | `var(--yh-component-size-default)` |
| `--yh-mention-dropdown-shadow` | Dropdown shadow | `var(--yh-box-shadow-light)` |
