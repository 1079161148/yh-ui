# Lucky Draw

Interactive marketing component for e-commerce. Features adaptive wheel topologies and flawlessly symmetrical grid items.

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S, _St } from '../../.vitepress/theme/utils/demo-utils'

interface Prize {
  id: string
  name: string
  image?: string
}

const prizesIcons: Prize[] = [
  { id: '1', name: 'MacBook', image: '💻' },
  { id: '2', name: 'iPhone 15', image: '📱' },
  { id: '3', name: 'Gift Card', image: '🎁' },
  { id: '4', name: 'No Prize', image: '😢' }, 
  { id: '5', name: '10 Points', image: '💰' },    
  { id: '6', name: 'Earphones', image: '🎧' },   
  { id: '7', name: 'JD Card', image: '🎫' }, 
  { id: '8', name: 'Powerbank', image: '🔋' } 
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
  { id: '1', name: 'MacBook', image: '💻' },
  { id: '2', name: 'iPhone 15', image: '📱' },
  { id: '3', name: 'Gift Card', image: '🎁' },
  { id: '4', name: 'No Prize', image: '😢' }, 
  { id: '5', name: '10 Points', image: '💰' },    
  { id: '6', name: 'Earphones', image: '🎧' },   
  { id: '7', name: 'JD Card', image: '🎫' }, 
  { id: '8', name: 'Powerbank', image: '🔋' } 
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
  { id: '1', name: 'MacBook', image: '💻' },
  { id: '2', name: 'iPhone 15', image: '📱' },
  { id: '3', name: 'Gift Card', image: '🎁' },
  { id: '4', name: 'No Prize', image: '😢' }, 
  { id: '5', name: '10 Points', image: '💰' },    
  { id: '6', name: 'Earphones', image: '🎧' },   
  { id: '7', name: 'JD Card', image: '🎫' }, 
  { id: '8', name: 'Powerbank', image: '🔋' } 
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
  { id: '1', name: 'MacBook', image: '💻' },
  { id: '2', name: 'iPhone 15', image: '📱' },
  { id: '3', name: 'Gift Card', image: '🎁' },
  { id: '4', name: 'No Prize', image: '😢' }, 
  { id: '5', name: '10 Points', image: '💰' },    
  { id: '6', name: 'Earphones', image: '🎧' },   
  { id: '7', name: 'JD Card', image: '🎫' }, 
  { id: '8', name: 'Powerbank', image: '🔋' } 
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

Premium wheel experience with jewel-like center button gradients. Intelligently pivots between Tangential layout for Text+Icon combinations and Radial layout for Pure Text strings for optimally balanced typography.

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

Soft icy-blue container layout mathematically bounding its icons to a distinct vertical flex constraint, ensuring textual word wraps never disalign horizontal icon trajectories among grid peers. Items illuminate with a luscious crimson background on draw completion.

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

The `YhLuckyDraw` component safely and efficiently mounts inside Nuxt 3/4 Server-Side Rendering (SSR) environments. All physical spinning coordinates and matrix-calculations are automatically relegated to client environments at hydration time. There is no need for `<ClientOnly>` wrappers.

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

**SSR Checklist**:

- ✅ **Pre-Rendered** HTML and texts correctly output to crawlers.
- ✅ **Secure Event Bubbling**: Safe mounting of high-velocity recursive animation frames logic.
- ✅ **No Mismatches**: CSS matrices and inline dynamic degree bindings reliably transfer DOM representations perfectly.

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
| theme-overrides | Theme variables object dictionary                        | `object`              | —         |

### Events

| Event Name | Description                                                                         | Callback Parameters   |
| ---------- | ----------------------------------------------------------------------------------- | --------------------- |
| click      | Triggered on component interaction phase, optimal for silent backend request chains | `(e: MouseEvent)`     |
| start      | Triggered precisely at absolute rotation begin                                      | `()`                  |
| finish     | Fired when spinning concludes over resolved reward target                           | `(prize: LuckyPrize)` |

## Theme Variables

The structural presentation of the component leverages cascading variables (CSS hooks), allowing fluid redesigning without modifying standard logic classes:

| Variable Name          | Description                                                       | Default Standard                                    |
| ---------------------- | ----------------------------------------------------------------- | --------------------------------------------------- |
| `--yh-lucky-primary`   | Main focus hue used for action indicator borders and hover states | `#ff4757`                                           |
| `--yh-lucky-border-bg` | Circular wheel housing bounding gradient mapping block colors     | `linear-gradient(180deg, #ff8a65 0%, #ff5252 100%)` |
| `--yh-lucky-shadow`    | Broad scale box-shadowing establishing outer depth of fields      | `0 10px 25px rgba(255, 82, 82, 0.3)`                |
