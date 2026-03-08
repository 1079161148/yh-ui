# Carousel

Carousel component for displaying images, cards, or any content. Equipped with premium built-in 3D visual effects rivaling top-tier carousel libraries like Splide Premium.

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

// Reactive state for interactive playground slot
const dotType = ref<'dot' | 'line'>('dot')
const dotPlacement = ref('bottom')
const direction = ref<'horizontal' | 'vertical'>('horizontal')
const showArrow = ref<'hover' | 'always' | 'never'>('hover')

const tsBasic = `<${_T}>
  <yh-carousel autoplay :interval="4000" style="height: 400px; border-radius: 16px;">
    <yh-carousel-item v-for="i in 4" :key="i">
      <img :src="\`https://picsum.photos/seed/\${i + 10}/800/400\`" style="width: 100%; height: 100%; object-fit: cover;" />
    </yh-carousel-item>
  </yh-carousel>
</${_T}>`

const tsFade = `<${_T}>
  <yh-carousel effect="fade" style="height: 400px; border-radius: 16px;">
    <yh-carousel-item v-for="i in 4" :key="i">
      <img :src="\`https://picsum.photos/seed/\${i + 20}/800/400\`" style="width: 100%; height: 100%; object-fit: cover;" />
    </yh-carousel-item>
  </yh-carousel>
</${_T}>`

const tsCard = `<${_T}>
  <yh-carousel effect="card" :autoplay="false" style="height: 300px;">
    <yh-carousel-item v-for="i in 5" :key="i">
      <div style="position: relative; height: 100%; box-shadow: var(--yh-box-shadow-dark); border-radius: 12px; overflow: hidden;">
        <img :src="\`https://picsum.photos/seed/\${i + 30}/400/300\`" style="width: 100%; height: 100%; object-fit: cover;" />
        <div style="position: absolute; bottom: 0; left: 0; right: 0; padding: 20px; background: linear-gradient(transparent, rgba(0,0,0,0.7)); color: #fff; font-size: 20px; font-weight: bold;">
          Card Focus {{ i }}
        </div>
      </div>
    </yh-carousel-item>
  </yh-carousel>
</${_T}>`

const tsCoverflow = `<${_T}>
  <yh-carousel effect="coverflow" :autoplay="false" style="height: 300px;">
    <yh-carousel-item v-for="i in 5" :key="i">
      <div style="position: relative; height: 100%; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
        <img :src="\`https://picsum.photos/seed/\${i + 40}/400/300\`" style="width: 100%; height: 100%; object-fit: cover;" />
      </div>
    </yh-carousel-item>
  </yh-carousel>
</${_T}>`

const tsZoom = `<${_T}>
  <yh-carousel effect="zoom" :autoplay="false" style="height: 300px;">
    <yh-carousel-item v-for="i in 5" :key="i">
      <div style="position: relative; height: 100%; border-radius: 16px; overflow: hidden;">
        <img :src="\`https://picsum.photos/seed/\${i + 50}/400/300\`" style="width: 100%; height: 100%; object-fit: cover;" />
      </div>
    </yh-carousel-item>
  </yh-carousel>
</${_T}>`

const tsPerspective = `<${_T}>
  <yh-carousel effect="perspective" :autoplay="false" style="height: 300px;">
    <yh-carousel-item v-for="i in 5" :key="i">
      <div style="position: relative; height: 100%; border-radius: 12px; overflow: hidden; box-shadow: 0 15px 35px rgba(0,0,0,0.3);">
        <img :src="\`https://picsum.photos/seed/\${i + 60}/400/300\`" style="width: 100%; height: 100%; object-fit: cover;" />
      </div>
    </yh-carousel-item>
  </yh-carousel>
</${_T}>`

const tsDissolve = `<${_T}>
  <yh-carousel effect="dissolve" :autoplay="false" style="height: 400px; border-radius: 16px; overflow: hidden;">
    <yh-carousel-item v-for="i in 4" :key="i">
      <img :src="\`https://picsum.photos/seed/\${i + 70}/800/400\`" style="width: 100%; height: 100%; object-fit: cover;" />
    </yh-carousel-item>
  </yh-carousel>
</${_T}>`

const tsFiber = `<${_T}>
  <yh-carousel effect="fiber" :autoplay="false" style="height: 400px; border-radius: 16px; overflow: hidden;">
    <yh-carousel-item v-for="i in 4" :key="i">
      <img :src="\`https://picsum.photos/seed/\${i + 80}/800/400\`" style="width: 100%; height: 100%; object-fit: cover;" />
    </yh-carousel-item>
  </yh-carousel>
</${_T}>`

const tsRadial = `<${_T}>
  <yh-carousel effect="radial" :autoplay="false" style="height: 400px; border-radius: 16px; overflow: hidden;">
    <yh-carousel-item v-for="i in 4" :key="i">
      <img :src="\`https://picsum.photos/seed/\${i + 90}/800/400\`" style="width: 100%; height: 100%; object-fit: cover;" />
    </yh-carousel-item>
  </yh-carousel>
</${_T}>`

const tsWave = `<${_T}>
  <yh-carousel effect="wave" :autoplay="false" style="height: 400px; border-radius: 16px; overflow: hidden;">
    <yh-carousel-item v-for="i in 4" :key="i">
      <img :src="\`https://picsum.photos/seed/\${i + 15}/800/400\`" style="width: 100%; height: 100%; object-fit: cover;" />
    </yh-carousel-item>
  </yh-carousel>
</${_T}>`

const tsCloud = `<${_T}>
  <yh-carousel effect="cloud" :autoplay="false" style="height: 400px; border-radius: 16px; overflow: hidden;">
    <yh-carousel-item v-for="i in 4" :key="i">
      <img :src="\`https://picsum.photos/seed/\${i + 25}/800/400\`" style="width: 100%; height: 100%; object-fit: cover;" />
    </yh-carousel-item>
  </yh-carousel>
</${_T}>`

const tsCube = `<${_T}>
  <yh-carousel effect="cube" :autoplay="false" style="height: 300px; border-radius: 12px; overflow: hidden;">
    <yh-carousel-item v-for="i in 5" :key="i">
      <img :src="\`https://picsum.photos/seed/\${i + 100}/400/300\`" style="width: 100%; height: 100%; object-fit: cover;" />
    </yh-carousel-item>
  </yh-carousel>
</${_T}>`
const tsFlip = `<${_T}>
  <yh-carousel effect="flip" :autoplay="false" style="height: 300px; border-radius: 12px; overflow: hidden;">
    <yh-carousel-item v-for="i in 5" :key="i">
      <img :src="\`https://picsum.photos/seed/\${i + 110}/400/300\`" style="width: 100%; height: 100%; object-fit: cover;" />
    </yh-carousel-item>
  </yh-carousel>
</${_T}>`
const tsCylinder = `<${_T}>
  <yh-carousel effect="cylinder" :autoplay="false" style="height: 300px; border-radius: 12px; overflow: hidden;">
    <yh-carousel-item v-for="i in 5" :key="i">
      <img :src="\`https://picsum.photos/seed/\${i + 120}/400/300\`" style="width: 100%; height: 100%; object-fit: cover;" />
    </yh-carousel-item>
  </yh-carousel>
</${_T}>`
const tsStack = `<${_T}>
  <yh-carousel effect="stack" :autoplay="false" style="height: 300px; border-radius: 12px; overflow: hidden;">
    <yh-carousel-item v-for="i in 5" :key="i">
      <img :src="\`https://picsum.photos/seed/\${i + 130}/400/300\`" style="width: 100%; height: 100%; object-fit: cover;" />
    </yh-carousel-item>
  </yh-carousel>
</${_T}>`
const tsParallax = `<${_T}>
  <yh-carousel effect="parallax" :autoplay="false" style="height: 300px; border-radius: 12px; overflow: hidden;">
    <yh-carousel-item v-for="i in 5" :key="i">
      <img :src="\`https://picsum.photos/seed/\${i + 140}/400/300\`" style="width: 100%; height: 100%; object-fit: cover;" />
    </yh-carousel-item>
  </yh-carousel>
</${_T}>`
const tsPopout = `<${_T}>
  <yh-carousel effect="popout" :autoplay="false" style="height: 300px; border-radius: 12px; overflow: hidden;">
    <yh-carousel-item v-for="i in 5" :key="i">
      <img :src="\`https://picsum.photos/seed/\${i + 150}/400/300\`" style="width: 100%; height: 100%; object-fit: cover;" />
    </yh-carousel-item>
  </yh-carousel>
</${_T}>`
const tsRotate3d = `<${_T}>
  <yh-carousel effect="rotate3d" :autoplay="false" style="height: 300px; border-radius: 12px; overflow: hidden;">
    <yh-carousel-item v-for="i in 5" :key="i">
      <img :src="\`https://picsum.photos/seed/\${i + 160}/400/300\`" style="width: 100%; height: 100%; object-fit: cover;" />
    </yh-carousel-item>
  </yh-carousel>
</${_T}>`
const tsCards = `<${_T}>
  <yh-carousel effect="cards" :autoplay="false" style="height: 300px; border-radius: 12px; overflow: hidden;">
    <yh-carousel-item v-for="i in 5" :key="i">
      <img :src="\`https://picsum.photos/seed/\${i + 170}/400/300\`" style="width: 100%; height: 100%; object-fit: cover;" />
    </yh-carousel-item>
  </yh-carousel>
</${_T}>`
const tsFold = `<${_T}>
  <yh-carousel effect="fold" :autoplay="false" style="height: 300px; border-radius: 12px; overflow: hidden;">
    <yh-carousel-item v-for="i in 5" :key="i">
      <img :src="\`https://picsum.photos/seed/\${i + 180}/400/300\`" style="width: 100%; height: 100%; object-fit: cover;" />
    </yh-carousel-item>
  </yh-carousel>
</${_T}>`
const tsNuxt = `<${_T}>
  <yh-carousel :autoplay="true" :interval="3000" style="height: 320px; border-radius: 12px; overflow: hidden;">
    <yh-carousel-item v-for="i in 4" :key="i">
      <img :src="\`https://picsum.photos/seed/\${i}/800/320\`" style="width: 100%; height: 100%; object-fit: cover;" />
    </yh-carousel-item>
  </yh-carousel>
</${_T}>`

const tsPerformance = `<${_T}>
  <yh-carousel 
    autoplay 
    :interval="2000"
    effect="fade"
    style="height: 300px; border-radius: 12px;"
  >
    <yh-carousel-item v-for="i in 12" :key="i">
      <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
        <span style="color: white; font-size: 48px; font-weight: bold;">{{ i }}</span>
      </div>
    </yh-carousel-item>
  </yh-carousel>
</${_T}>`

const tsConfig = `<${_T}>
  <yh-carousel 
    autoplay 
    dot-type="line" 
    dot-placement="right" 
    :space-between="20"
    :slides-pre-view="2"
    mousewheel 
    style="height: 300px; border-radius: 16px;"
  >
    <yh-carousel-item v-for="i in 5" :key="i">
      <img :src="\`https://picsum.photos/seed/\${i + 88}/400/300\`" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;" />
    </yh-carousel-item>
    
    <template #arrow="{ prev, next }">
       <div class="custom-arrow">
          <button type="button" class="custom-arrow--left" @click="prev">Prev</button>
          <button type="button" class="custom-arrow--right" @click="next">Next</button>
       </div>
    </template>
    
    <template #dots="{ total, currentIndex, to }">
      <ul class="custom-dots">
        <li
          v-for="index in total"
          :key="index"
          :class="{ ['is-active']: currentIndex === index - 1 }"
          @click="to(index - 1)"
        />
      </ul>
    </template>
  </yh-carousel>
</${_T}>

<${_S} setup lang="ts">
// No setup needed
</${_S}>

<${'style'} scoped>
.custom-arrow {
  display: flex;
  position: absolute;
  bottom: 25px;
  right: 10px;
}
.custom-arrow button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  margin-right: 12px;
  color: #fff;
  background-color: rgba(255, 255, 255, 0.1);
  border-width: 0;
  border-radius: 8px;
  transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  font-size: 10px;
}
.custom-arrow button:hover {
  background-color: rgba(255, 255, 255, 0.2);
}
.custom-dots {
  display: flex;
  margin: 0;
  padding: 0;
  position: absolute;
  bottom: 20px;
  left: 20px;
}
.custom-dots li {
  display: inline-block;
  width: 12px;
  height: 4px;
  margin: 0 3px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.4);
  transition: width 0.3s, background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}
.custom-dots li.is-active {
  width: 40px;
  background: #fff;
}
</${'style'}>`


const tsInteractive = `<${_T}>
  <div class="carousel-demo-panel">
    <div class="control-row">
      <span class="label">Dot type (dot-type):</span>
      <yh-radio-group v-model="dotType">
        <yh-radio-button value="dot" label="dot" />
        <yh-radio-button value="line" label="line" />
      </yh-radio-group>
    </div>
    <div class="control-row">
      <span class="label">Dot placement (dot-placement):</span>
      <yh-radio-group v-model="dotPlacement">
        <yh-radio-button v-for="p in ['top', 'bottom', 'left', 'right']" :key="p" :value="p" :label="p" />
      </yh-radio-group>
    </div>
    <div class="control-row">
      <span class="label">Direction (direction):</span>
      <yh-radio-group v-model="direction">
        <yh-radio-button value="horizontal" label="horizontal" />
        <yh-radio-button value="vertical" label="vertical" />
      </yh-radio-group>
    </div>
    <div class="control-row">
      <span class="label">Show arrow (show-arrow):</span>
      <yh-radio-group v-model="showArrow">
        <yh-radio-button value="hover" label="hover" />
        <yh-radio-button value="always" label="always" />
        <yh-radio-button value="never" label="never" />
      </yh-radio-group>
    </div>
  </div>
  <yh-carousel
    :dot-type="dotType"
    :dot-placement="dotPlacement"
    :direction="direction"
    :show-arrow="showArrow"
    style="height: 300px; border-radius: 16px; margin-top: 20px;"
  >
    <yh-carousel-item v-for="i in 4" :key="i">
      <img :src="\`https://picsum.photos/seed/\${i + 99}/800/400\`" style="width: 100%; height: 100%; object-fit: cover;" />
    </yh-carousel-item>
  </yh-carousel>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const dotType = ref<'dot' | 'line'>('dot')
const dotPlacement = ref('bottom')
const direction = ref<'horizontal' | 'vertical'>('horizontal')
const showArrow = ref<'hover' | 'always' | 'never'>('hover')
</${_S}>

<${'style'} scoped>
.carousel-demo-panel {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  background: var(--yh-bg-color-page, #f9f9f9);
  border-radius: 8px;
  margin-bottom: 24px;
}
.control-row { display: flex; align-items: center; }
.label {
  width: 200px;
  font-size: 14px;
  color: var(--yh-text-color-regular, #606266);
}
</${'style'}>`

</script>

## Standard Slide

Standard gallery scroll, featuring default `slide` transition.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="toJs(tsBasic)">
  <yh-carousel autoplay :interval="4000" style="height: 400px; border-radius: 16px;">
    <yh-carousel-item v-for="i in 4" :key="i">
      <img :src="`https://picsum.photos/seed/${i + 10}/800/400`" style="width: 100%; height: 100%; object-fit: cover;" />
    </yh-carousel-item>
  </yh-carousel>
</DemoBlock>

## 🚀 Performance Optimization

The component has been deeply optimized for smooth performance with large image sets.

<DemoBlock title="Large Dataset (Lazy Rendering + GPU Acceleration)" :ts-code="tsPerformance" :js-code="toJs(tsPerformance)">
  <yh-carousel 
    autoplay 
    :interval="2000"
    effect="fade"
    style="height: 300px; border-radius: 12px;"
  >
    <yh-carousel-item v-for="i in 12" :key="i">
      <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
        <span style="color: white; font-size: 48px; font-weight: bold;">{{ i }}</span>
      </div>
    </yh-carousel-item>
  </yh-carousel>
</DemoBlock>

**Performance Features:**

- **Lazy Rendering**: Only renders currently visible items ± 2, dramatically reducing DOM nodes
- **GPU Acceleration**: Uses `translate3d` + `willChange` to trigger GPU compositing layers
- **RAF Animation**: Uses `requestAnimationFrame` for smooth 60fps animations
- **Shallow Reactivity**: Uses `shallowRef` to reduce reactivity tracking overhead
- **Map Indexing**: O(1) complexity lookup, improving responsiveness with large datasets

## Advanced Configuration & Custom Slots

Fully matches mature frameworks, supporting controls like \`dot-type\` (dot/line), \`dot-placement\`, \`mousewheel\` support, \`space-between\` gap, and allows overriding navigations through named slots.

<DemoBlock title="Config and Slots Example" :ts-code="tsConfig" :js-code="toJs(tsConfig)">
  <yh-carousel 
    autoplay 
    dot-type="line" 
    dot-placement="right" 
    :space-between="20"
    :slides-pre-view="2"
    mousewheel 
    style="height: 300px; border-radius: 16px;"
  >
    <yh-carousel-item v-for="i in 5" :key="i">
      <img :src="`https://picsum.photos/seed/${i + 88}/400/300`" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;" />
    </yh-carousel-item>
    
    <template #arrow="{ prev, next }">
       <div style="display: flex; position: absolute; bottom: 25px; right: 10px;">
          <button type="button" @click="prev" style="display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; margin-right: 12px; color: #fff; background-color: rgba(255, 255, 255, 0.1); border-width: 0; border-radius: 8px; cursor: pointer; font-size: 10px; transition: background-color 0.3s;">Prev</button>
          <button type="button" @click="next" style="display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; margin-right: 12px; color: #fff; background-color: rgba(255, 255, 255, 0.1); border-width: 0; border-radius: 8px; cursor: pointer; font-size: 10px; transition: background-color 0.3s;">Next</button>
       </div>
    </template>
    
    <template #dots="{ total, currentIndex, to }">
      <ul style="display: flex; margin: 0; padding: 0; position: absolute; bottom: 20px; left: 20px; list-style: none;">
        <li
          v-for="index in total"
          :key="index"
          @click="to(index - 1)"
          :style="{ display: 'inline-block', width: currentIndex === index - 1 ? '40px' : '12px', height: '4px', margin: '0 3px', borderRadius: '4px', backgroundColor: currentIndex === index - 1 ? '#fff' : 'rgba(255, 255, 255, 0.4)', transition: 'width 0.3s, background-color 0.3s', cursor: 'pointer' }"
        />
      </ul>
    </template>
  </yh-carousel>
</DemoBlock>

## Interactive Configuration Playground

Use the controls below to change \`dot-type\`, \`dot-placement\`, \`direction\`, and \`show-arrow\` and see the carousel update in real time. This demo shows only the interactive preview, consistent with other component examples.

<DemoBlock title="Diverse configuration" :ts-code="tsInteractive" :js-code="toJs(tsInteractive)">
  <div class="carousel-demo-panel" style="display: flex; flex-direction: column; gap: 16px; padding: 16px; background: var(--yh-bg-color-page, #f9f9f9); border-radius: 8px; margin-bottom: 24px;">
    <div style="display: flex; align-items: center;">
      <span style="width: 200px; font-size: 14px; color: var(--yh-text-color-regular, #606266);">Dot type (dot-type):</span>
      <yh-radio-group v-model="dotType">
        <yh-radio-button value="dot" label="dot" />
        <yh-radio-button value="line" label="line" />
      </yh-radio-group>
    </div>
    <div style="display: flex; align-items: center;">
      <span style="width: 200px; font-size: 14px; color: var(--yh-text-color-regular, #606266);">Dot placement (dot-placement):</span>
      <yh-radio-group v-model="dotPlacement">
        <yh-radio-button v-for="p in ['top', 'bottom', 'left', 'right']" :key="p" :value="p" :label="p" />
      </yh-radio-group>
    </div>
    <div style="display: flex; align-items: center;">
      <span style="width: 200px; font-size: 14px; color: var(--yh-text-color-regular, #606266);">Direction (direction):</span>
      <yh-radio-group v-model="direction">
        <yh-radio-button value="horizontal" label="horizontal" />
        <yh-radio-button value="vertical" label="vertical" />
      </yh-radio-group>
    </div>
    <div style="display: flex; align-items: center;">
      <span style="width: 200px; font-size: 14px; color: var(--yh-text-color-regular, #606266);">Show arrow (show-arrow):</span>
      <yh-radio-group v-model="showArrow">
        <yh-radio-button value="hover" label="hover" />
        <yh-radio-button value="always" label="always" />
        <yh-radio-button value="never" label="never" />
      </yh-radio-group>
    </div>
  </div>
  <yh-carousel
    :dot-type="dotType"
    :dot-placement="dotPlacement"
    :direction="direction"
    :show-arrow="showArrow"
    style="height: 300px; border-radius: 16px; margin-top: 20px;"
  >
    <yh-carousel-item v-for="i in 4" :key="i">
      <img :src="`https://picsum.photos/seed/${i + 99}/800/400`" style="width: 100%; height: 100%; object-fit: cover;" />
    </yh-carousel-item>
  </yh-carousel>
</DemoBlock>

## Seamless Fade

Set `effect="fade"` to enable seamless fade-in and fade-out transition.

<DemoBlock title="Fade Transition" :ts-code="tsFade" :js-code="toJs(tsFade)">
  <yh-carousel effect="fade" style="height: 400px; border-radius: 16px;">
    <yh-carousel-item v-for="i in 4" :key="i">
      <img :src="`https://picsum.photos/seed/${i + 20}/800/400`" style="width: 100%; height: 100%; object-fit: cover;" />
    </yh-carousel-item>
  </yh-carousel>
</DemoBlock>

## 🚀 Splide Premium Array Showcase

Implements all top-tier visual arrays without WebGL(Three.js) weight by employing a highly optimized pure CSS 3D translation engine.

### 1. Depth Stacking (Card)

Use `effect="card"` to render a dimensional depth where inactive cards automatically stack backwards.

<DemoBlock title="Card Mode" :ts-code="tsCard" :js-code="toJs(tsCard)">
  <yh-carousel effect="card" :autoplay="false" style="height: 300px;">
    <yh-carousel-item v-for="i in 5" :key="i">
      <div style="position: relative; height: 100%; box-shadow: 0 12px 30px rgba(0,0,0,0.2); border-radius: 12px; overflow: hidden;">
        <img :src="`https://picsum.photos/seed/${i + 30}/400/300`" style="width: 100%; height: 100%; object-fit: cover;" />
        <div style="position: absolute; bottom: 0; left: 0; right: 0; padding: 20px; background: linear-gradient(transparent, rgba(0,0,0,0.7)); color: #fff; font-size: 20px; font-weight: bold;">
          Card Focus {{ i }}
        </div>
      </div>
    </yh-carousel-item>
  </yh-carousel>
</DemoBlock>

### 2. Classic iTunes (Coverflow)

Set `effect="coverflow"`. The gallery edges angle inward in a stunning 3D Coverflow presentation.

<DemoBlock title="Coverflow" :ts-code="tsCoverflow" :js-code="toJs(tsCoverflow)">
  <yh-carousel effect="coverflow" :autoplay="false" style="height: 300px;">
    <yh-carousel-item v-for="i in 5" :key="i">
      <div style="position: relative; height: 100%; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
        <img :src="`https://picsum.photos/seed/${i + 40}/400/300`" style="width: 100%; height: 100%; object-fit: cover;" />
      </div>
    </yh-carousel-item>
  </yh-carousel>
</DemoBlock>

### 3. Center Zoom (Zoom)

Set `effect="zoom"` to emphasize center scale without perspective tilting.

<DemoBlock title="Zoom Mode" :ts-code="tsZoom" :js-code="toJs(tsZoom)">
  <yh-carousel effect="zoom" :autoplay="false" style="height: 300px;">
    <yh-carousel-item v-for="i in 5" :key="i">
      <div style="position: relative; height: 100%; border-radius: 16px; overflow: hidden;">
        <img :src="`https://picsum.photos/seed/${i + 50}/400/300`" style="width: 100%; height: 100%; object-fit: cover;" />
      </div>
    </yh-carousel-item>
  </yh-carousel>
</DemoBlock>

### 4. Floating Perspective (Perspective)

Set `effect="perspective"` to produce a spatial step-down gallery layout.

<DemoBlock title="Perspective Scroll" :ts-code="tsPerspective" :js-code="toJs(tsPerspective)">
  <yh-carousel effect="perspective" :autoplay="false" style="height: 300px;">
    <yh-carousel-item v-for="i in 5" :key="i">
      <div style="position: relative; height: 100%; border-radius: 12px; overflow: hidden; box-shadow: 0 15px 35px rgba(0,0,0,0.3);">
        <img :src="`https://picsum.photos/seed/${i + 60}/400/300`" style="width: 100%; height: 100%; object-fit: cover;" />
      </div>
    </yh-carousel-item>
  </yh-carousel>
</DemoBlock>

## 🎭 Splide Premium Shader Masks

Incredible dynamic masks utilizing highly optimized CSS algorithms rather than bulky WebGL libraries, ensuring performance is smooth 60fps across all devices.

### 1. Dissolve (Smoke Filter)

Use `effect="dissolve"` to trigger an immersive smoke-like dissolve and contrast filter.

<DemoBlock title="Dissolve" :ts-code="tsDissolve" :js-code="toJs(tsDissolve)">
  <yh-carousel effect="dissolve" :autoplay="false" style="height: 400px; border-radius: 16px; overflow: hidden;">
    <yh-carousel-item v-for="i in 4" :key="i">
      <img :src="`https://picsum.photos/seed/${i + 70}/800/400`" style="width: 100%; height: 100%; object-fit: cover;" />
    </yh-carousel-item>
  </yh-carousel>
</DemoBlock>

### 2. Fiber Mask

Set `effect="fiber"` for a diagonal venetian blind wipe pattern perfectly simulating the fiber transitions.

<DemoBlock title="Fiber Mask" :ts-code="tsFiber" :js-code="toJs(tsFiber)">
  <yh-carousel effect="fiber" :autoplay="false" style="height: 400px; border-radius: 16px; overflow: hidden;">
    <yh-carousel-item v-for="i in 4" :key="i">
      <img :src="`https://picsum.photos/seed/${i + 80}/800/400`" style="width: 100%; height: 100%; object-fit: cover;" />
    </yh-carousel-item>
  </yh-carousel>
</DemoBlock>

### 3. Wave Mask

Set `effect="wave"`. Wraps the incoming view in an animated bezier curve utilizing dynamic SVG encoding.

<DemoBlock title="Wave Mask" :ts-code="tsWave" :js-code="toJs(tsWave)">
  <yh-carousel effect="wave" :autoplay="false" style="height: 400px; border-radius: 16px; overflow: hidden;">
    <yh-carousel-item v-for="i in 4" :key="i">
      <img :src="`https://picsum.photos/seed/${i + 15}/800/400`" style="width: 100%; height: 100%; object-fit: cover;" />
    </yh-carousel-item>
  </yh-carousel>
</DemoBlock>

### 4. Radial Gradient Mask

Set `effect="radial"` to zoom revealing contents from a centered focal hole.

<DemoBlock title="Radial Mask" :ts-code="tsRadial" :js-code="toJs(tsRadial)">
  <yh-carousel effect="radial" :autoplay="false" style="height: 400px; border-radius: 16px; overflow: hidden;">
    <yh-carousel-item v-for="i in 4" :key="i">
      <img :src="`https://picsum.photos/seed/${i + 90}/800/400`" style="width: 100%; height: 100%; object-fit: cover;" />
    </yh-carousel-item>
  </yh-carousel>
</DemoBlock>

### 5. Cloud Mask

Set `effect="cloud"` for a high magnitude cloud shaped mask wipe.

<DemoBlock title="Cloud Mask" :ts-code="tsCloud" :js-code="toJs(tsCloud)">
  <yh-carousel effect="cloud" :autoplay="false" style="height: 400px; border-radius: 16px; overflow: hidden;">
    <yh-carousel-item v-for="i in 4" :key="i">
      <img :src="`https://picsum.photos/seed/${i + 25}/800/400`" style="width: 100%; height: 100%; object-fit: cover;" />
    </yh-carousel-item>
  </yh-carousel>
</DemoBlock>

## 3D rotation and spatial effects

Seven additional 3D rotation, depth, and pop-out effects for an immersive carousel experience.

<DemoBlock title="Cube" :ts-code="tsCube" :js-code="toJs(tsCube)">
  <yh-carousel effect="cube" :autoplay="false" style="height: 300px; border-radius: 12px; overflow: hidden;">
    <yh-carousel-item v-for="i in 5" :key="i">
      <img :src="`https://picsum.photos/seed/${i + 100}/400/300`" style="width: 100%; height: 100%; object-fit: cover;" />
    </yh-carousel-item>
  </yh-carousel>
</DemoBlock>

Set `effect="cube"` for a cube-style 3D rotation between slides.

<DemoBlock title="Flip" :ts-code="tsFlip" :js-code="toJs(tsFlip)">
  <yh-carousel effect="flip" :autoplay="false" style="height: 300px; border-radius: 12px; overflow: hidden;">
    <yh-carousel-item v-for="i in 5" :key="i">
      <img :src="`https://picsum.photos/seed/${i + 110}/400/300`" style="width: 100%; height: 100%; object-fit: cover;" />
    </yh-carousel-item>
  </yh-carousel>
</DemoBlock>

Set `effect="flip"` for a horizontal page-flip effect.

<DemoBlock title="Cylinder" :ts-code="tsCylinder" :js-code="toJs(tsCylinder)">
  <yh-carousel effect="cylinder" :autoplay="false" style="height: 300px; border-radius: 12px; overflow: hidden;">
    <yh-carousel-item v-for="i in 5" :key="i">
      <img :src="`https://picsum.photos/seed/${i + 120}/400/300`" style="width: 100%; height: 100%; object-fit: cover;" />
    </yh-carousel-item>
  </yh-carousel>
</DemoBlock>

Set `effect="cylinder"` to arrange slides along a cylinder for a strong 3D wrap.

<DemoBlock title="Stack" :ts-code="tsStack" :js-code="toJs(tsStack)">
  <yh-carousel effect="stack" :autoplay="false" style="height: 300px; border-radius: 12px; overflow: hidden;">
    <yh-carousel-item v-for="i in 5" :key="i">
      <img :src="`https://picsum.photos/seed/${i + 130}/400/300`" style="width: 100%; height: 100%; object-fit: cover;" />
    </yh-carousel-item>
  </yh-carousel>
</DemoBlock>

Set `effect="stack"` so the current slide is in front and others stack behind.

<DemoBlock title="Parallax" :ts-code="tsParallax" :js-code="toJs(tsParallax)">
  <yh-carousel effect="parallax" :autoplay="false" style="height: 300px; border-radius: 12px; overflow: hidden;">
    <yh-carousel-item v-for="i in 5" :key="i">
      <img :src="`https://picsum.photos/seed/${i + 140}/400/300`" style="width: 100%; height: 100%; object-fit: cover;" />
    </yh-carousel-item>
  </yh-carousel>
</DemoBlock>

Set `effect="parallax"` for parallax-style depth between slides.

<DemoBlock title="Popout" :ts-code="tsPopout" :js-code="toJs(tsPopout)">
  <yh-carousel effect="popout" :autoplay="false" style="height: 300px; border-radius: 12px; overflow: hidden;">
    <yh-carousel-item v-for="i in 5" :key="i">
      <img :src="`https://picsum.photos/seed/${i + 150}/400/300`" style="width: 100%; height: 100%; object-fit: cover;" />
    </yh-carousel-item>
  </yh-carousel>
</DemoBlock>

Set `effect="popout"` so the active slide pops forward with perspective on neighbors.

<DemoBlock title="Rotate3D" :ts-code="tsRotate3d" :js-code="toJs(tsRotate3d)">
  <yh-carousel effect="rotate3d" :autoplay="false" style="height: 300px; border-radius: 12px; overflow: hidden;">
    <yh-carousel-item v-for="i in 5" :key="i">
      <img :src="`https://picsum.photos/seed/${i + 160}/400/300`" style="width: 100%; height: 100%; object-fit: cover;" />
    </yh-carousel-item>
  </yh-carousel>
</DemoBlock>

Set `effect="rotate3d"` for full XYZ rotation and maximum 3D depth.

<DemoBlock title="Effect / Cards (Swiper-style)" :ts-code="tsCards" :js-code="toJs(tsCards)">
  <yh-carousel effect="cards" :autoplay="false" style="height: 300px; border-radius: 12px; overflow: hidden;">
    <yh-carousel-item v-for="i in 5" :key="i">
      <img :src="`https://picsum.photos/seed/${i + 170}/400/300`" style="width: 100%; height: 100%; object-fit: cover;" />
    </yh-carousel-item>
  </yh-carousel>
</DemoBlock>

Set `effect="cards"` for a [Swiper effect-cards](https://www.swiper.com.cn/demo/index.html#effect-cards)–style layout: center slide prominent, neighbors visible and scaled/rotated for an irregular 3D stack.

<DemoBlock title="3D fold / stereoscopic focus" :ts-code="tsFold" :js-code="toJs(tsFold)">
  <yh-carousel effect="fold" :autoplay="false" style="height: 300px; border-radius: 12px; overflow: hidden;">
    <yh-carousel-item v-for="i in 5" :key="i">
      <img :src="`https://picsum.photos/seed/${i + 180}/400/300`" style="width: 100%; height: 100%; object-fit: cover;" />
    </yh-carousel-item>
  </yh-carousel>
</DemoBlock>

Set `effect="fold"` for a [3D fold stereoscopic focus](https://www.jq22.com/yanshi6049)–style effect with strong perspective and page-fold transitions.

## Usage in Nuxt

Carousel works with Nuxt 3/4 SSR. With the YH-UI Nuxt module, components are auto-imported. Below is a runnable demo.

<DemoBlock title="Usage in Nuxt" :ts-code="tsNuxt" :js-code="toJs(tsNuxt)">
  <yh-carousel :autoplay="true" :interval="3000" style="height: 320px; border-radius: 12px; overflow: hidden;">
    <yh-carousel-item v-for="i in 4" :key="i">
      <img :src="`https://picsum.photos/seed/${i}/800/320`" style="width: 100%; height: 100%; object-fit: cover;" />
    </yh-carousel-item>
  </yh-carousel>
</DemoBlock>

**SSR notes**: Props, slots, and events match on server and client; 3D effects render initial DOM on the server and animate after hydration; disable `autoplay` on first view if needed for SEO.

## API

### Carousel Props

| Name            | Description                                        | Type                                                                                                                                                                                                                                                    | Default        |
| --------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| current-index   | Current index (controlled)                         | `number`                                                                                                                                                                                                                                                | `0`            |
| default-index   | Default index (initial value for uncontrolled)     | `number`                                                                                                                                                                                                                                                | `0`            |
| autoplay        | Enable autoplay                                    | `boolean`                                                                                                                                                                                                                                               | `false`        |
| interval        | Autoplay interval (ms)                             | `number`                                                                                                                                                                                                                                                | `3000`         |
| loop            | Enable loop playback                               | `boolean`                                                                                                                                                                                                                                               | `true`         |
| effect          | Transition effect                                  | `'slide' \| 'fade' \| 'card' \| 'coverflow' \| 'zoom' \| 'perspective' \| 'dissolve' \| 'fiber' \| 'wave' \| 'radial' \| 'cloud' \| 'cube' \| 'flip' \| 'cylinder' \| 'stack' \| 'parallax' \| 'popout' \| 'rotate3d' \| 'cards' \| 'fold' \| 'custom'` | `'slide'`      |
| direction       | Carousel direction                                 | `'horizontal' \| 'vertical'`                                                                                                                                                                                                                            | `'horizontal'` |
| show-arrow      | Arrow display timing                               | `'always' \| 'hover' \| 'never'`                                                                                                                                                                                                                        | `'hover'`      |
| show-dots       | Show indicator dots                                | `boolean`                                                                                                                                                                                                                                               | `true`         |
| dot-trigger     | Indicator trigger method                           | `'click' \| 'hover'`                                                                                                                                                                                                                                    | `'click'`      |
| dot-placement   | Indicator position                                 | `'top' \| 'bottom' \| 'left' \| 'right' \| 'inner-top' \| 'inner-bottom' \| 'inner-left' \| 'inner-right'`                                                                                                                                              | `'bottom'`     |
| dot-type        | Indicator style                                    | `'dot' \| 'line'`                                                                                                                                                                                                                                       | `'dot'`        |
| keyboard        | Enable keyboard control (arrow keys)               | `boolean`                                                                                                                                                                                                                                               | `false`        |
| pause-on-hover  | Pause autoplay on hover                            | `boolean`                                                                                                                                                                                                                                               | `true`         |
| draggable       | Enable drag navigation                             | `boolean`                                                                                                                                                                                                                                               | `false`        |
| mousewheel      | Enable mousewheel navigation                       | `boolean`                                                                                                                                                                                                                                               | `false`        |
| space-between   | Item gap (slide mode, px)                          | `number`                                                                                                                                                                                                                                                | `0`            |
| card-gutter     | Gap between adjacent cards (card-like effects, px) | `number`                                                                                                                                                                                                                                                | `20`           |
| slides-pre-view | Number of items shown per view                     | `number \| 'auto'`                                                                                                                                                                                                                                      | `1`            |
| duration        | Transition duration (ms)                           | `number`                                                                                                                                                                                                                                                | `500`          |
| theme-overrides | Theme variable overrides                           | `ComponentThemeVars`                                                                                                                                                                                                                                    | —              |

### Carousel Slots

| Name       | Parameters                                | Description                               |
| ---------- | ----------------------------------------- | ----------------------------------------- |
| default    | —                                         | Carousel items; use with `YhCarouselItem` |
| arrow      | `{ total, currentIndex, to, prev, next }` | Custom left/right or top/bottom arrows    |
| dots       | `{ total, currentIndex, to }`             | Custom indicator dots                     |
| prev-arrow | —                                         | Custom previous arrow icon                |
| next-arrow | —                                         | Custom next arrow icon                    |

### Carousel Events

| Event               | Payload                              | Description                                         |
| ------------------- | ------------------------------------ | --------------------------------------------------- |
| update:currentIndex | `(index: number)`                    | Emitted when current index changes (v-model)        |
| change              | `(index: number, prevIndex: number)` | Emitted on slide change; current and previous index |

### Carousel Methods

Called via ref:

| Name              | Type                      | Description                    |
| ----------------- | ------------------------- | ------------------------------ |
| `to` / `jump`     | `(index: number) => void` | Scroll to specific slide index |
| `prev`            | `() => void`              | Previous slide                 |
| `next`            | `() => void`              | Next slide                     |
| `getCurrentIndex` | `() => number`            | Get current slide index        |

### CarouselItem Props

| Name | Description               | Type     | Default |
| ---- | ------------------------- | -------- | ------- |
| name | Name, for jumping by name | `string` | —       |

## Theme variables

Carousel supports customizing styles via these CSS variables (dots, arrows, transition):

| Variable                          | Description                  | Default                        |
| --------------------------------- | ---------------------------- | ------------------------------ |
| `--yh-carousel-dot-color`         | Dot default color            | `rgba(255, 255, 255, 0.4)`     |
| `--yh-carousel-dot-active-color`  | Dot active color             | `#ffffff`                      |
| `--yh-carousel-dot-size`          | Dot size (diameter)          | `8px`                          |
| `--yh-carousel-dot-active-width`  | Active dot width (line type) | `24px`                         |
| `--yh-carousel-arrow-bg`          | Arrow background             | `rgba(255, 255, 255, 0.2)`     |
| `--yh-carousel-arrow-hover-bg`    | Arrow hover background       | `rgba(255, 255, 255, 0.35)`    |
| `--yh-carousel-arrow-color`       | Arrow icon color             | `#ffffff`                      |
| `--yh-carousel-arrow-size`        | Arrow button size            | `36px`                         |
| `--yh-carousel-arrow-icon-size`   | Arrow icon size              | `20px`                         |
| `--yh-carousel-transition-timing` | Transition timing function   | `cubic-bezier(0.4, 0, 0.2, 1)` |
