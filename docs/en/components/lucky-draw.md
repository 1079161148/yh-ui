# Lucky Draw

Interactive marketing component for e-commerce campaigns. It supports `wheel` and `grid` modes, custom prize rendering, and theme variable overrides.

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S, _St } from '../../.vitepress/theme/utils/demo-utils'

interface Prize {
  id: string
  name: string
  image?: string
}

const prizesIcons: Prize[] = [
  { id: '1', name: 'MacBook', image: 'MB' },
  { id: '2', name: 'iPhone 15', image: 'IP' },
  { id: '3', name: 'Gift Card', image: 'GC' },
  { id: '4', name: 'No Prize', image: 'NP' }, 
  { id: '5', name: '10 Points', image: '10P' },    
  { id: '6', name: 'Earphones', image: 'EP' },   
  { id: '7', name: 'JD Card', image: 'JD' }, 
  { id: '8', name: 'Powerbank', image: 'PB' } 
]

const prizesText: Prize[] = [
  { id: '1', name: 'Grand Prize' },
  { id: '2', name: '1st Prize' },
  { id: '3', name: '2nd Prize' },
  { id: '4', name: '3rd Prize' }, 
  { id: '5', name: 'No Prize' }, 
  { id: '6', name: 'Lucky Prize' }, 
  { id: '7', name: 'Try Again' },   
  { id: '8', name: 'Bonus Prize' }    
]

const targetWheelIcon = ref('')
const handleStartWheelIcon = () => {
  setTimeout(() => {
    targetWheelIcon.value = prizesIcons[Math.floor(Math.random() * 8)].id
  }, 300)
}
const handleFinishWheelIcon = (prize: Prize) => {
  alert('Winner: ' + prize.name)
  targetWheelIcon.value = ''
}

const targetWheelText = ref('')
const handleStartWheelText = () => {
  setTimeout(() => {
    targetWheelText.value = prizesText[Math.floor(Math.random() * 8)].id
  }, 300)
}
const handleFinishWheelText = (prize: Prize) => {
  alert('Winner: ' + prize.name)
  targetWheelText.value = ''
}

const targetGrid = ref('')
const handleStartGrid = () => {
  setTimeout(() => {
    targetGrid.value = prizesIcons[Math.floor(Math.random() * 8)].id
  }, 300)
}
const handleFinishGrid = (prize: Prize) => {
  alert('Grid Win: ' + prize.name)
  targetGrid.value = ''
}

const targetNuxtId = ref('')
const handleStartNuxt = () => {
  const randomId = prizesIcons[Math.floor(Math.random() * prizesIcons.length)].id
  targetNuxtId.value = randomId
}
const handleFinishNuxt = (prize: Prize) => {
  alert('🎉 Nuxt SSR Winner: ' + prize.name)
  targetNuxtId.value = ''
}

const tsWheelIcon = `<${_T}>
  <div style="width: 320px; margin: 0 auto;">
    <yh-lucky-draw
      type="wheel"
      :prizes="prizes"
      :target-id="targetId"
      @start="handleStart"
      @finish="handleFinish"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

interface Prize {
  id: string
  name: string
  image?: string
}

const prizes: Prize[] = [
  { id: '1', name: 'MacBook', image: 'MB' },
  { id: '2', name: 'iPhone 15', image: 'IP' },
  { id: '3', name: 'Gift Card', image: 'GC' },
  { id: '4', name: 'No Prize', image: 'NP' }, 
  { id: '5', name: '10 Points', image: '10P' },    
  { id: '6', name: 'Earphones', image: 'EP' },   
  { id: '7', name: 'JD Card', image: 'JD' }, 
  { id: '8', name: 'Powerbank', image: 'PB' } 
]

const targetId = ref<string>('')

const handleStart = () => {
  const randomId = prizes[Math.floor(Math.random() * prizes.length)].id
  targetId.value = randomId
}

const handleFinish = (prize: Prize) => {
  alert('Winner: ' + prize.name)
  targetId.value = '' 
}
</${_S}>`

const tsWheelText = `<${_T}>
  <div style="width: 300px; margin: 0 auto;">
    <yh-lucky-draw
      type="wheel"
      :prizes="prizes"
      :target-id="targetId"
      @start="handleStart"
      @finish="handleFinish"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

interface Prize {
  id: string
  name: string
}

const prizes: Prize[] = [
  { id: '1', name: 'Grand Prize' },
  { id: '2', name: '1st Prize' },
  { id: '3', name: '2nd Prize' },
  { id: '4', name: '3rd Prize' }, 
  { id: '5', name: 'No Prize' }, 
  { id: '6', name: 'Lucky Prize' }, 
  { id: '7', name: 'Try Again' },   
  { id: '8', name: 'Bonus Prize' } 
]

const targetId = ref<string>('')

const handleStart = () => {
  const randomId = prizes[Math.floor(Math.random() * prizes.length)].id
  targetId.value = randomId
}

const handleFinish = (prize: Prize) => {
  alert('Winner: ' + prize.name)
  targetId.value = '' 
}
</${_S}>`


const tsGrid = `<${_T}>
  <div style="width: 360px; margin: 0 auto;">
    <yh-lucky-draw
      type="grid"
      :prizes="prizes"
      :target-id="targetId"
      @start="handleStart"
      @finish="handleFinish"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

interface Prize {
  id: string
  name: string
  image?: string
}

const prizes: Prize[] = [
  { id: '1', name: 'MacBook', image: 'MB' },
  { id: '2', name: 'iPhone 15', image: 'IP' },
  { id: '3', name: 'Gift Card', image: 'GC' },
  { id: '4', name: 'No Prize', image: 'NP' }, 
  { id: '5', name: '10 Points', image: '10P' },    
  { id: '6', name: 'Earphones', image: 'EP' },   
  { id: '7', name: 'JD Card', image: 'JD' }, 
  { id: '8', name: 'Powerbank', image: 'PB' } 
]

const targetId = ref<string>('')

const handleStart = () => {
  const randomId = prizes[Math.floor(Math.random() * prizes.length)].id
  targetId.value = randomId
}

const handleFinish = (prize: Prize) => {
  alert('Grid Win: ' + prize.name)
  targetId.value = '' 
}
</${_S}>`

const tsNuxt = `<${_T}>
  <div style="width: 320px; margin: 0 auto;">
    <yh-lucky-draw
      type="wheel"
      :prizes="prizes"
      :target-id="targetNuxtId"
      @start="handleStartNuxt"
      @finish="handleFinishNuxt"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

interface Prize {
  id: string
  name: string
  image?: string
}

const prizes: Prize[] = [
  { id: '1', name: 'MacBook', image: 'MB' },
  { id: '2', name: 'iPhone 15', image: 'IP' },
  { id: '3', name: 'Gift Card', image: 'GC' },
  { id: '4', name: 'No Prize', image: 'NP' }, 
  { id: '5', name: '10 Points', image: '10P' },    
  { id: '6', name: 'Earphones', image: 'EP' },   
  { id: '7', name: 'JD Card', image: 'JD' }, 
  { id: '8', name: 'Powerbank', image: 'PB' } 
]

const targetNuxtId = ref<string>('')

const handleStartNuxt = () => {
  const randomId = prizes[Math.floor(Math.random() * prizes.length)].id
  targetNuxtId.value = randomId
}

const handleFinishNuxt = (prize: Prize) => {
  alert('🎉 Nuxt SSR Winner: ' + prize.name)
  targetNuxtId.value = '' 
}
</${_S}>`

const jsNuxt = toJs(tsNuxt)

</script>

## Wheel Mode

Use `type="wheel"` to render a spinning prize wheel. When all prizes are pure text, the component automatically switches to its pure-text layout.

<DemoBlock title="Icons + Text" :ts-code="tsWheelIcon" :js-code="toJs(tsWheelIcon)">
  <div style="width: 320px; margin: 0 auto;">
    <yh-lucky-draw
      type="wheel"
      :prizes="prizesIcons"
      :target-id="targetWheelIcon"
      @start="handleStartWheelIcon"
      @finish="handleFinishWheelIcon"
    />
  </div>
</DemoBlock>

<DemoBlock title="Pure Text Mode" :ts-code="tsWheelText" :js-code="toJs(tsWheelText)">
  <div style="width: 300px; margin: 0 auto;">
    <yh-lucky-draw
      type="wheel"
      :prizes="prizesText"
      :target-id="targetWheelText"
      @start="handleStartWheelText"
      @finish="handleFinishWheelText"
    />
  </div>
</DemoBlock>

## Grid Mode

Use `type="grid"` to render a 3x3 lottery grid. The center area is the start button, and surrounding cells highlight in sequence until the target prize is reached.

<DemoBlock title="Grid Example" :ts-code="tsGrid" :js-code="toJs(tsGrid)">
  <div style="width: 360px; margin: 0 auto;">
    <yh-lucky-draw
      type="grid"
      :prizes="prizesIcons"
      :target-id="targetGrid"
      @start="handleStartGrid"
      @finish="handleFinishGrid"
    />
  </div>
</DemoBlock>

## Usage in Nuxt

`YhLuckyDraw` can be used directly in Nuxt 3/4 projects. Static structure renders on the server, while the draw animation starts after the target prize id is provided on the client.

<DemoBlock title="Nuxt SSR Safety" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="width: 320px; margin: 0 auto;">
    <yh-lucky-draw
      type="wheel"
      :prizes="prizesIcons"
      :target-id="targetNuxtId"
      @start="handleStartNuxt"
      @finish="handleFinishNuxt"
    />
  </div>
</DemoBlock>

**SSR Notes**:

- The component's static layout can be rendered during SSR.
- The actual draw animation starts only after `target-id` receives a valid value.
- In normal usage, no extra `<ClientOnly>` wrapper is required.

## API

### Props

| Property        | Description                                              | Type                  | Default   |
| --------------- | -------------------------------------------------------- | --------------------- | --------- |
| type            | Draw mode                                                | `'wheel'` \| `'grid'` | `'wheel'` |
| prizes          | Prizes array                                             | `LuckyPrize[]`        | `[]`      |
| loading         | Async loading operation state mapping indicator          | `boolean`             | `false`   |
| target-id       | Outcome ID (starts animation sequentially when resolved) | `string` \| `number`  | `''`      |
| rounds          | Minimum rotations                                        | `number`              | `8`       |
| duration        | Animation time (ms)                                      | `number`              | `4000`    |
| size            | Container bounds mapping                                 | `number` \| `string`  | `300`     |
| action-text     | Action button text override                              | `string`              | `''`      |
| hide-btn        | Hide built-in button                                     | `boolean`             | `false`   |
| theme-overrides | Theme variables object dictionary                        | `Record<string, string>` | `{}`     |

### Events

| Event Name | Description                                                                         | Callback Parameters   |
| ---------- | ----------------------------------------------------------------------------------- | --------------------- |
| click      | Triggered on component interaction phase, optimal for silent backend request chains | `(e: MouseEvent)`     |
| start      | Triggered precisely at absolute rotation begin                                      | `()`                  |
| finish     | Fired when spinning concludes over resolved reward target                           | `(prize: LuckyPrize)` |

### Slots

| Slot   | Description              | Parameters |
| ------ | ------------------------ | ---------- |
| prize  | Custom prize cell        | `{ prize: LuckyPrize }` |
| action | Custom start button area | `-`          |

### Expose

This component does not expose public instance methods or properties.

## Theme Variables

Use the following theme variables to override the component's core visual styles:

| Variable Name          | Description                | Default Standard                                    |
| ---------------------- | -------------------------- | --------------------------------------------------- |
| `--yh-lucky-primary`   | Primary accent color       | `#ff4757`                                           |
| `--yh-lucky-border-bg` | Outer container background | `linear-gradient(180deg, #ff8a65 0%, #ff5252 100%)` |
| `--yh-lucky-shadow`    | Outer shadow               | `0 10px 25px rgba(255, 82, 82, 0.3)`                |

### Type Exports

| Name | Description |
| --- | --- |
| `YhLuckyDrawProps` | Component props type |
| `YhLuckyDrawEmits` | Component emits type |
| `YhLuckyDrawSlots` | Component slots type |
| `YhLuckyPrize` | Prize data type |
| `YhLuckyDrawType` | Draw mode union |
| `YhLuckyDrawInstance` | Component instance type |
