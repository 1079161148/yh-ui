# Scrollbar

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S, _St } from '../../.vitepress/theme/utils/demo-utils'

// --- Render Data ---
const scrollCount = ref(3)
const addScrollItem = () => scrollCount.value++
const removeScrollItem = () => {
  if (scrollCount.value > 0) scrollCount.value--
}

// --- Demo Code ---

const tsBasic = `<${_T}>
  <yh-scrollbar height="200px">
    <div v-for="item in 20" :key="item" class="scrollbar-demo-item">
      {{ item }}
    </div>
  </yh-scrollbar>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
</${_S}>

<${_St} scoped>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--yh-color-primary-light-9);
  color: var(--yh-color-primary);
}
</${_St}>`

const jsBasic = toJs(tsBasic)

const tsHorizontal = `<${_T}>
  <yh-scrollbar>
    <div class="scrollbar-flex-content">
      <div v-for="item in 50" :key="item" class="scrollbar-demo-item">
        {{ item }}
      </div>
    </div>
  </yh-scrollbar>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
</${_S}>

<${_St} scoped>
.scrollbar-flex-content {
  display: flex;
}
.scrollbar-demo-item {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--yh-color-success-light-9);
  color: var(--yh-color-success);
}
</${_St}>`

const jsHorizontal = toJs(tsHorizontal)

const tsMaxHeight = `<${_T}>
  <div style="margin-bottom: 16px">
    <yh-button @click="add">Add Item</yh-button>
    <yh-button @click="remove" style="margin-left: 12px">Remove Item</yh-button>
  </div>
  <yh-scrollbar max-height="200px">
    <div v-for="item in count" :key="item" class="scrollbar-demo-item">
      {{ item }}
    </div>
  </yh-scrollbar>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const count = ref(3)
const add = () => count.value++
const remove = () => {
  if (count.value > 0) count.value--
}
</${_S}>

<${_St} scoped>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  border-radius: 4px;
  background: var(--yh-color-warning-light-9);
  color: var(--yh-color-warning);
}
</${_St}>`

const jsMaxHeight = toJs(tsMaxHeight)
</script>

Used to replace the browser's native scrollbar, providing a more consistent visual experience and powerful interaction control.

## Basic Usage

Set the scrollbar height via the `height` attribute.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="border: 1px solid var(--yh-border-color-lighter); border-radius: 4px; padding: 20px;">
    <yh-scrollbar height="200px">
      <div v-for="item in 20" :key="item" style="display: flex; align-items: center; justify-content: center; height: 50px; margin: 10px; text-align: center; border-radius: 4px; background: var(--yh-color-primary-light-9); color: var(--yh-color-primary);">
        {{ item }}
      </div>
    </yh-scrollbar>
  </div>
</DemoBlock>

## Horizontal Scroll

When the content width exceeds the container width, a horizontal scrollbar will automatically appear.

<DemoBlock title="Horizontal Scroll" :ts-code="tsHorizontal" :js-code="jsHorizontal">
  <div style="border: 1px solid var(--yh-border-color-lighter); border-radius: 4px; padding: 20px;">
    <yh-scrollbar>
      <div style="display: flex;">
        <div v-for="item in 50" :key="item" style="flex-shrink: 0; display: flex; align-items: center; justify-content: center; width: 100px; height: 50px; margin: 10px; text-align: center; border-radius: 4px; background: var(--yh-color-success-light-9); color: var(--yh-color-success);">
          {{ item }}
        </div>
      </div>
    </yh-scrollbar>
  </div>
</DemoBlock>

## Max Height

Use `max-height` attribute to limit the maximum height.

<DemoBlock title="Max Height" :ts-code="tsMaxHeight" :js-code="jsMaxHeight">
  <div style="border: 1px solid var(--yh-border-color-lighter); border-radius: 4px; padding: 20px;">
    <div style="margin-bottom: 16px">
      <yh-button @click="addScrollItem">Add Item</yh-button>
      <yh-button @click="removeScrollItem" style="margin-left: 12px">Remove Item</yh-button>
    </div>
    <yh-scrollbar max-height="200px">
      <div v-for="item in scrollCount" :key="item" style="display: flex; align-items: center; justify-content: center; height: 50px; margin: 10px; border-radius: 4px; background: var(--yh-color-warning-light-9); color: var(--yh-color-warning);">
        {{ item }}
      </div>
    </yh-scrollbar>
  </div>
</DemoBlock>

## Use in Nuxt

The Scrollbar component fully supports Nuxt 3/4 SSR rendering. When used in a Nuxt project, the component is automatically imported and no manual registration is required.

<DemoBlock title="Nuxt Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="border: 1px solid var(--yh-border-color-lighter); border-radius: 4px; padding: 20px;">
    <yh-scrollbar height="150px">
      <div v-for="item in 10" :key="item" style="padding: 10px; margin-bottom: 5px; background: var(--yh-color-primary-light-9); border-radius: 4px; text-align: center;">
        Nuxt SSR Item {{ item }}
      </div>
    </yh-scrollbar>
  </div>
</DemoBlock>

**SSR Notes**:

- ✅ Supports dynamic display of `height` and `max-height`
- ✅ The custom scrollbar is activated on the client side without affecting the server-side first-screen rendering
- ✅ Native scrollbar fallback mode (native) perfectly supports SSR

## API

### Props

| Attribute       | Description                              | Type                      | Accepted Values | Default |
| --------------- | ---------------------------------------- | ------------------------- | --------------- | ------- |
| height          | Scrollbar height                         | `string / number`         | —               | —       |
| max-height      | Scrollbar max height                     | `string / number`         | —               | —       |
| native          | Whether to use native scrollbar          | `boolean`                 | —               | `false` |
| always          | Scrollbar is always displayed            | `boolean`                 | —               | `false` |
| min-size        | Minimum scrollbar size                   | `number`                  | —               | `20`    |
| view-class      | Custom class for view                    | `string`                  | —               | —       |
| view-style      | Custom style for view                    | `string / object / array` | —               | —       |
| noresize        | Do not respond to container size changes | `boolean`                 | —               | `false` |
| tag             | Element tag for view                     | `string`                  | —               | `div`   |
| theme-overrides | Theme overrides                          | `ComponentThemeVars`      | —               | —       |

### Events

| Event Name | Description  | Parameters                  |
| ---------- | ------------ | --------------------------- |
| scroll     | Scroll event | `{ scrollLeft, scrollTop }` |

### Methods

| Method Name   | Description                     | Parameters                                         |
| ------------- | ------------------------------- | -------------------------------------------------- |
| scrollTo      | Scroll to specified position    | `(options: ScrollToOptions \| number, y?: number)` |
| setScrollTop  | Set vertical scroll distance    | `(value: number)`                                  |
| setScrollLeft | Set horizontal scroll distance  | `(value: number)`                                  |
| update        | Manually update scrollbar state | —                                                  |

## Theme Variables

Scrollbar component supports customizing local styles by overriding the following CSS variables:

| Variable                           | Description       | Default       |
| ---------------------------------- | ----------------- | ------------- |
| `--yh-scrollbar-width`             | Scrollbar width   | `6px`         |
| `--yh-scrollbar-thumb-color`       | Thumb color       | `#c0c4cc`     |
| `--yh-scrollbar-thumb-hover-color` | Thumb hover color | `#909399`     |
| `--yh-scrollbar-track-color`       | Track color       | `transparent` |
| `--yh-scrollbar-thumb-radius`      | Thumb radius      | `3px`         |
