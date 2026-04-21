# Carousel 轮播

用于展示图片、卡片或任意内容的轮播组件。支持多种过渡效果、高度可定制的指示点和导航箭头，并内置对标市面顶级轮播库（如 Splide Premium）的所有硬核 3D 视觉和遮罩滤镜特效。

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

// 交互游乐场用到的响应式状态（供 slot 使用）
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
// 无需额外 setup
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


const tsInteractive = `<${_T}>
  <div class="carousel-demo-panel">
    <div class="control-row">
      <span class="label">指示点样式 (dot-type):</span>
      <yh-radio-group v-model="dotType">
        <yh-radio-button value="dot" label="dot" />
        <yh-radio-button value="line" label="line" />
      </yh-radio-group>
    </div>
    <div class="control-row">
      <span class="label">指示点位置 (dot-placement):</span>
      <yh-radio-group v-model="dotPlacement">
        <yh-radio-button v-for="p in ['top', 'bottom', 'left', 'right']" :key="p" :value="p" :label="p" />
      </yh-radio-group>
    </div>
    <div class="control-row">
      <span class="label">轮播方向 (direction):</span>
      <yh-radio-group v-model="direction">
        <yh-radio-button value="horizontal" label="horizontal" />
        <yh-radio-button value="vertical" label="vertical" />
      </yh-radio-group>
    </div>
    <div class="control-row">
      <span class="label">显示箭头 (show-arrow):</span>
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

## 基础划动 (Slide)

最标准的高清大图展示，默认 `slide` 效果。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="toJs(tsBasic)">
  <yh-carousel autoplay :interval="4000" style="height: 400px; border-radius: 16px;">
    <yh-carousel-item v-for="i in 4" :key="i">
      <img :src="`https://picsum.photos/seed/${i + 10}/800/400`" style="width: 100%; height: 100%; object-fit: cover;" />
    </yh-carousel-item>
  </yh-carousel>
</DemoBlock>

## 🚀 性能优化

组件已进行深度性能优化，支持大量图片场景下的流畅运行。

<DemoBlock title="大量图片场景（懒渲染 + GPU 加速）" :ts-code="tsPerformance" :js-code="toJs(tsPerformance)">
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

**性能特性：**

- **懒渲染**：只渲染当前可见项 ± 2 张图片，大幅减少 DOM 节点
- **GPU 加速**：使用 `translate3d` + `willChange` 触发 GPU 合成层
- **RAF 动画**：使用 `requestAnimationFrame` 实现平滑 60fps 动画
- **浅层响应**：使用 `shallowRef` 减少响应式追踪开销
- **Map 索引**：O(1) 复杂度查找，提升大数据量下的响应速度

## 多样化配置与自定义插槽

完全对标成熟架构，支持控制如 \`dot-type\` (圆点/线段)、\`dot-placement\`、\`mousewheel\` (鼠标滚轮操作)、\`space-between\` (网格间距)，并通过具名插槽重写自定义导航和指示器。

<DemoBlock title="配置与插槽示例" :ts-code="tsConfig" :js-code="toJs(tsConfig)">
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

## 🎮 指示点和方向交互游乐场

在下方操作面板中切换 \`dot-type\`、\`dot-placement\`、\`direction\`、\`show-arrow\` 等配置，即可实时观察轮播的视觉变化，与其他组件示例一致仅展示可交互预览。

<DemoBlock title="多样化配置" :ts-code="tsInteractive" :js-code="toJs(tsInteractive)">
  <div class="carousel-demo-panel" style="display: flex; flex-direction: column; gap: 16px; padding: 16px; background: var(--yh-bg-color-page, #f9f9f9); border-radius: 8px; margin-bottom: 24px;">
    <div style="display: flex; align-items: center;">
      <span style="width: 200px; font-size: 14px; color: var(--yh-text-color-regular, #606266);">指示点样式 (dot-type):</span>
      <yh-radio-group v-model="dotType">
        <yh-radio-button value="dot" label="dot" />
        <yh-radio-button value="line" label="line" />
      </yh-radio-group>
    </div>
    <div style="display: flex; align-items: center;">
      <span style="width: 200px; font-size: 14px; color: var(--yh-text-color-regular, #606266);">指示点位置 (dot-placement):</span>
      <yh-radio-group v-model="dotPlacement">
        <yh-radio-button v-for="p in ['top', 'bottom', 'left', 'right']" :key="p" :value="p" :label="p" />
      </yh-radio-group>
    </div>
    <div style="display: flex; align-items: center;">
      <span style="width: 200px; font-size: 14px; color: var(--yh-text-color-regular, #606266);">轮播方向 (direction):</span>
      <yh-radio-group v-model="direction">
        <yh-radio-button value="horizontal" label="horizontal" />
        <yh-radio-button value="vertical" label="vertical" />
      </yh-radio-group>
    </div>
    <div style="display: flex; align-items: center;">
      <span style="width: 200px; font-size: 14px; color: var(--yh-text-color-regular, #606266);">显示箭头 (show-arrow):</span>
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

## 淡入淡出 (Fade)

设置 `effect="fade"` 开启梦幻般的淡入淡出无缝切换。

<DemoBlock title="渐变切换" :ts-code="tsFade" :js-code="toJs(tsFade)">
  <yh-carousel effect="fade" style="height: 400px; border-radius: 16px;">
    <yh-carousel-item v-for="i in 4" :key="i">
      <img :src="`https://picsum.photos/seed/${i + 20}/800/400`" style="width: 100%; height: 100%; object-fit: cover;" />
    </yh-carousel-item>
  </yh-carousel>
</DemoBlock>

## 🚀 Splide Premium Array 阵列视效

内置世界级 3D 轮播阵列，全面对标国际顶级收费组件 (Splide Premium) 的底层视觉实现，且抛开了庞大的 WebGL(Three.js) 依赖，通过自研的纯 CSS 引擎还原。

### 1. 深度折叠卡片 (Card)

通过设置 `effect="card"`，让非焦点卡片自动后移并向焦点倾斜，制造 3D 叠放的景深焦点效应。

<DemoBlock title="卡片折叠效果" :ts-code="tsCard" :js-code="toJs(tsCard)">
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

### 2. iTunes 经典封面流 (Coverflow)

惊艳时代的 3D Coverflow，通过设置 `effect="coverflow"`，让两翼元素以更强烈的切角展示画廊级别的高级感。

<DemoBlock title="画廊封面流" :ts-code="tsCoverflow" :js-code="toJs(tsCoverflow)">
  <yh-carousel effect="coverflow" :autoplay="false" style="height: 300px;">
    <yh-carousel-item v-for="i in 5" :key="i">
      <div style="position: relative; height: 100%; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
        <img :src="`https://picsum.photos/seed/${i + 40}/400/300`" style="width: 100%; height: 100%; object-fit: cover;" />
      </div>
    </yh-carousel-item>
  </yh-carousel>
</DemoBlock>

### 3. 聚焦缩放 (Zoom)

通过设置 `effect="zoom"`，实现去 3D 旋转约束的纯量放大，聚焦视觉中心主位。

<DemoBlock title="聚焦缩放" :ts-code="tsZoom" :js-code="toJs(tsZoom)">
  <yh-carousel effect="zoom" :autoplay="false" style="height: 300px;">
    <yh-carousel-item v-for="i in 5" :key="i">
      <div style="position: relative; height: 100%; border-radius: 16px; overflow: hidden;">
        <img :src="`https://picsum.photos/seed/${i + 50}/400/300`" style="width: 100%; height: 100%; object-fit: cover;" />
      </div>
    </yh-carousel-item>
  </yh-carousel>
</DemoBlock>

### 4. 浮空透视画廊 (Perspective)

通过设置 `effect="perspective"`，开启结合空间落差与平铺滑跃的高定级 3D 画廊感。

<DemoBlock title="浮空透视画廊" :ts-code="tsPerspective" :js-code="toJs(tsPerspective)">
  <yh-carousel effect="perspective" :autoplay="false" style="height: 300px;">
    <yh-carousel-item v-for="i in 5" :key="i">
      <div style="position: relative; height: 100%; border-radius: 12px; overflow: hidden; box-shadow: 0 15px 35px rgba(0,0,0,0.3);">
        <img :src="`https://picsum.photos/seed/${i + 60}/400/300`" style="width: 100%; height: 100%; object-fit: cover;" />
      </div>
    </yh-carousel-item>
  </yh-carousel>
</DemoBlock>

## 🎭 Splide Premium Shader 遮罩动效

使用纯计算生成的高性能 CSS Shape Masks 模拟高级 WebGL 遮罩转换，创造震撼的过场画面。

### 1. 烟云消散 (Dissolve)

设置 `effect="dissolve"`，生成深空滤镜级的模糊显影与褪色消散。

<DemoBlock title="烟云消散" :ts-code="tsDissolve" :js-code="toJs(tsDissolve)">
  <yh-carousel effect="dissolve" :autoplay="false" style="height: 400px; border-radius: 16px; overflow: hidden;">
    <yh-carousel-item v-for="i in 4" :key="i">
      <img :src="`https://picsum.photos/seed/${i + 70}/800/400`" style="width: 100%; height: 100%; object-fit: cover;" />
    </yh-carousel-item>
  </yh-carousel>
</DemoBlock>

### 2. 对角光纤 (Fiber Mask)

设置 `effect="fiber"`，实现如光纤般的矢量百叶窗擦除特效，动感十足。

<DemoBlock title="对角光纤" :ts-code="tsFiber" :js-code="toJs(tsFiber)">
  <yh-carousel effect="fiber" :autoplay="false" style="height: 400px; border-radius: 16px; overflow: hidden;">
    <yh-carousel-item v-for="i in 4" :key="i">
      <img :src="`https://picsum.photos/seed/${i + 80}/800/400`" style="width: 100%; height: 100%; object-fit: cover;" />
    </yh-carousel-item>
  </yh-carousel>
</DemoBlock>

### 3. 波形涌动 (Wave Mask)

设置 `effect="wave"`，生成巨浪般的贝塞尔曲线吞噬过场（SVG Mask 无缝贴合）。

<DemoBlock title="波形涌动" :ts-code="tsWave" :js-code="toJs(tsWave)">
  <yh-carousel effect="wave" :autoplay="false" style="height: 400px; border-radius: 16px; overflow: hidden;">
    <yh-carousel-item v-for="i in 4" :key="i">
      <img :src="`https://picsum.photos/seed/${i + 15}/800/400`" style="width: 100%; height: 100%; object-fit: cover;" />
    </yh-carousel-item>
  </yh-carousel>
</DemoBlock>

### 4. 径向渐逝 (Radial Mask)

设置 `effect="radial"`，启动来自质心的原型拓展圈。

<DemoBlock title="径向渐逝" :ts-code="tsRadial" :js-code="toJs(tsRadial)">
  <yh-carousel effect="radial" :autoplay="false" style="height: 400px; border-radius: 16px; overflow: hidden;">
    <yh-carousel-item v-for="i in 4" :key="i">
      <img :src="`https://picsum.photos/seed/${i + 90}/800/400`" style="width: 100%; height: 100%; object-fit: cover;" />
    </yh-carousel-item>
  </yh-carousel>
</DemoBlock>

### 5. 心流云海 (Cloud Mask)

设置 `effect="cloud"`，运用超高放大率的云型遮罩爆炸覆盖视野。

<DemoBlock title="心流云海" :ts-code="tsCloud" :js-code="toJs(tsCloud)">
  <yh-carousel effect="cloud" :autoplay="false" style="height: 400px; border-radius: 16px; overflow: hidden;">
    <yh-carousel-item v-for="i in 4" :key="i">
      <img :src="`https://picsum.photos/seed/${i + 25}/800/400`" style="width: 100%; height: 100%; object-fit: cover;" />
    </yh-carousel-item>
  </yh-carousel>
</DemoBlock>

### 3D 立体旋转与空间感效果

新增 7 种立体旋转、空间感和凸出效果，打造沉浸式轮播体验。

<DemoBlock title="立方体旋转" :ts-code="tsCube" :js-code="toJs(tsCube)">
  <yh-carousel effect="cube" :autoplay="false" style="height: 300px; border-radius: 12px; overflow: hidden;">
    <yh-carousel-item v-for="i in 5" :key="i">
      <img :src="`https://picsum.photos/seed/${i + 100}/400/300`" style="width: 100%; height: 100%; object-fit: cover;" />
    </yh-carousel-item>
  </yh-carousel>
</DemoBlock>

设置 `effect="cube"`，页面像立方体一样旋转切换，具有强烈的 3D 空间感。

<DemoBlock title="翻页效果" :ts-code="tsFlip" :js-code="toJs(tsFlip)">
  <yh-carousel effect="flip" :autoplay="false" style="height: 300px; border-radius: 12px; overflow: hidden;">
    <yh-carousel-item v-for="i in 5" :key="i">
      <img :src="`https://picsum.photos/seed/${i + 110}/400/300`" style="width: 100%; height: 100%; object-fit: cover;" />
    </yh-carousel-item>
  </yh-carousel>
</DemoBlock>

设置 `effect="flip"`，模拟书页水平翻页效果。

<DemoBlock title="圆柱环绕" :ts-code="tsCylinder" :js-code="toJs(tsCylinder)">
  <yh-carousel effect="cylinder" :autoplay="false" style="height: 300px; border-radius: 12px; overflow: hidden;">
    <yh-carousel-item v-for="i in 5" :key="i">
      <img :src="`https://picsum.photos/seed/${i + 120}/400/300`" style="width: 100%; height: 100%; object-fit: cover;" />
    </yh-carousel-item>
  </yh-carousel>
</DemoBlock>

设置 `effect="cylinder"`，页面沿圆柱面排列，产生强烈的 3D 环绕感。

<DemoBlock title="堆叠效果" :ts-code="tsStack" :js-code="toJs(tsStack)">
  <yh-carousel effect="stack" :autoplay="false" style="height: 300px; border-radius: 12px; overflow: hidden;">
    <yh-carousel-item v-for="i in 5" :key="i">
      <img :src="`https://picsum.photos/seed/${i + 130}/400/300`" style="width: 100%; height: 100%; object-fit: cover;" />
    </yh-carousel-item>
  </yh-carousel>
</DemoBlock>

设置 `effect="stack"`，当前页在最前，后续页面在后方堆叠，呈现层叠视觉效果。

<DemoBlock title="视差效果" :ts-code="tsParallax" :js-code="toJs(tsParallax)">
  <yh-carousel effect="parallax" :autoplay="false" style="height: 300px; border-radius: 12px; overflow: hidden;">
    <yh-carousel-item v-for="i in 5" :key="i">
      <img :src="`https://picsum.photos/seed/${i + 140}/400/300`" style="width: 100%; height: 100%; object-fit: cover;" />
    </yh-carousel-item>
  </yh-carousel>
</DemoBlock>

设置 `effect="parallax"`，背景与内容有视差位移，增强空间层次感。

<DemoBlock title="凸出效果" :ts-code="tsPopout" :js-code="toJs(tsPopout)">
  <yh-carousel effect="popout" :autoplay="false" style="height: 300px; border-radius: 12px; overflow: hidden;">
    <yh-carousel-item v-for="i in 5" :key="i">
      <img :src="`https://picsum.photos/seed/${i + 150}/400/300`" style="width: 100%; height: 100%; object-fit: cover;" />
    </yh-carousel-item>
  </yh-carousel>
</DemoBlock>

设置 `effect="popout"`，当前页向前凸出，周围的页面有透视变形，极具视觉冲击力。

<DemoBlock title="三轴旋转" :ts-code="tsRotate3d" :js-code="toJs(tsRotate3d)">
  <yh-carousel effect="rotate3d" :autoplay="false" style="height: 300px; border-radius: 12px; overflow: hidden;">
    <yh-carousel-item v-for="i in 5" :key="i">
      <img :src="`https://picsum.photos/seed/${i + 160}/400/300`" style="width: 100%; height: 100%; object-fit: cover;" />
    </yh-carousel-item>
  </yh-carousel>
</DemoBlock>

设置 `effect="rotate3d"`，XYZ 三轴同时旋转，打造最强 3D 空间感。

<DemoBlock title="特效/卡片 (Swiper 风格)" :ts-code="tsCards" :js-code="toJs(tsCards)">
  <yh-carousel effect="cards" :autoplay="false" style="height: 300px; border-radius: 12px; overflow: hidden;">
    <yh-carousel-item v-for="i in 5" :key="i">
      <img :src="`https://picsum.photos/seed/${i + 170}/400/300`" style="width: 100%; height: 100%; object-fit: cover;" />
    </yh-carousel-item>
  </yh-carousel>
</DemoBlock>

设置 `effect="cards"`，对标 [Swiper 特效/卡片](https://www.swiper.com.cn/demo/index.html#effect-cards)：中间一张突出，左右两张可见且缩放旋转，异形 Slide 立体感。

<DemoBlock title="3D 折页立体焦点" :ts-code="tsFold" :js-code="toJs(tsFold)">
  <yh-carousel effect="fold" :autoplay="false" style="height: 300px; border-radius: 12px; overflow: hidden;">
    <yh-carousel-item v-for="i in 5" :key="i">
      <img :src="`https://picsum.photos/seed/${i + 180}/400/300`" style="width: 100%; height: 100%; object-fit: cover;" />
    </yh-carousel-item>
  </yh-carousel>
</DemoBlock>

设置 `effect="fold"`，实现 [3D 折页效果立体焦点图](https://www.jq22.com/yanshi6049) 风格：强烈透视与折叠感，像翻页一样切换。

## 在 Nuxt 中使用

Carousel 支持 Nuxt 3/4 的 SSR 渲染。使用 YH-UI 的 Nuxt 模块时组件会自动导入，无需手动注册。下方为可运行示例。

<DemoBlock title="在 Nuxt 中使用" :ts-code="tsNuxt" :js-code="toJs(tsNuxt)">
  <yh-carousel :autoplay="true" :interval="3000" style="height: 320px; border-radius: 12px; overflow: hidden;">
    <yh-carousel-item v-for="i in 4" :key="i">
      <img :src="`https://picsum.photos/seed/${i}/800/320`" style="width: 100%; height: 100%; object-fit: cover;" />
    </yh-carousel-item>
  </yh-carousel>
</DemoBlock>

**SSR 说明**：所有 Props、插槽和事件在服务端与客户端一致；3D 效果在服务端输出初始 DOM，水合后动画正常；若需 SEO 可首屏关闭 `autoplay`。

## API

### Carousel Props

| 属性名          | 说明                            | 类型                                                                                                                                                                                                                                                    | 默认值         |
| --------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| current-index   | 当前展示索引（受控）            | `number`                                                                                                                                                                                                                                                | `0`            |
| default-index   | 默认展示索引（非受控初始值）    | `number`                                                                                                                                                                                                                                                | `0`            |
| autoplay        | 是否自动播放                    | `boolean`                                                                                                                                                                                                                                               | `false`        |
| interval        | 自动播放间隔（ms）              | `number`                                                                                                                                                                                                                                                | `3000`         |
| loop            | 是否循环播放                    | `boolean`                                                                                                                                                                                                                                               | `true`         |
| effect          | 过渡效果                        | `'slide' \| 'fade' \| 'card' \| 'coverflow' \| 'zoom' \| 'perspective' \| 'dissolve' \| 'fiber' \| 'wave' \| 'radial' \| 'cloud' \| 'cube' \| 'flip' \| 'cylinder' \| 'stack' \| 'parallax' \| 'popout' \| 'rotate3d' \| 'cards' \| 'fold' \| 'custom'` | `'slide'`      |
| direction       | 轮播方向                        | `'horizontal' \| 'vertical'`                                                                                                                                                                                                                            | `'horizontal'` |
| show-arrow      | 箭头显示时机                    | `'always' \| 'hover' \| 'never'`                                                                                                                                                                                                                        | `'hover'`      |
| show-dots       | 是否显示指示点                  | `boolean`                                                                                                                                                                                                                                               | `true`         |
| dot-trigger     | 指示点触发方式                  | `'click' \| 'hover'`                                                                                                                                                                                                                                    | `'click'`      |
| dot-placement   | 指示点位置                      | `'top' \| 'bottom' \| 'left' \| 'right' \| 'inner-top' \| 'inner-bottom' \| 'inner-left' \| 'inner-right'`                                                                                                                                              | `'bottom'`     |
| dot-type        | 指示点样式                      | `'dot' \| 'line'`                                                                                                                                                                                                                                       | `'dot'`        |
| keyboard        | 是否开启键盘控制（方向键）      | `boolean`                                                                                                                                                                                                                                               | `false`        |
| pause-on-hover  | 鼠标悬浮时是否暂停自动播放      | `boolean`                                                                                                                                                                                                                                               | `true`         |
| draggable       | 是否支持拖拽切换                | `boolean`                                                                                                                                                                                                                                               | `false`        |
| mousewheel      | 是否支持鼠标滚轮切换            | `boolean`                                                                                                                                                                                                                                               | `false`        |
| space-between   | 轮播项间距（slide 模式，px）    | `number`                                                                                                                                                                                                                                                | `0`            |
| card-gutter     | 相邻卡片间距（card 类效果，px） | `number`                                                                                                                                                                                                                                                | `20`           |
| slides-pre-view | 每屏显示数量                    | `number \| 'auto'`                                                                                                                                                                                                                                      | `1`            |
| duration        | 切换动画时长 (ms)               | `number`                                                                                                                                                                                                                                                | `500`          |
| theme-overrides | 主题变量覆盖                    | `ComponentThemeVars`                                                                                                                                                                                                                                    | —              |

### Carousel 插槽

| 插槽名     | 参数                                      | 说明                                     |
| ---------- | ----------------------------------------- | ---------------------------------------- |
| default    | —                                         | 轮播项内容，需配合 `YhCarouselItem` 使用 |
| arrow      | `{ total, currentIndex, to, prev, next }` | 自定义左右/上下箭头                      |
| dots       | `{ total, currentIndex, to }`             | 自定义指示点                             |
| prev-arrow | —                                         | 自定义上一张箭头图标                     |
| next-arrow | —                                         | 自定义下一张箭头图标                     |

### Carousel 事件

| 事件名              | 参数                                 | 说明                           |
| ------------------- | ------------------------------------ | ------------------------------ |
| update:currentIndex | `(index: number)`                    | 当前索引变化时触发（v-model）  |
| change              | `(index: number, prevIndex: number)` | 切换时触发，当前索引与上一索引 |

### Carousel 方法

通过 ref 调用：

| 方法名            | 类型                      | 说明           |
| ----------------- | ------------------------- | -------------- |
| `to` / `jump`     | `(index: number) => void` | 跳转到指定索引 |
| `prev`            | `() => void`              | 上一张         |
| `next`            | `() => void`              | 下一张         |
| `getCurrentIndex` | `() => number`            | 获取当前索引   |

### CarouselItem Props

| 属性名 | 说明                 | 类型     | 默认值 |
| ------ | -------------------- | -------- | ------ |
| name   | 名称，用于按名称跳转 | `string` | —      |

### 主题变量

Carousel 支持通过覆盖以下 CSS 变量自定义局部样式（含指示点、箭头、过渡等）：

| 变量名                            | 说明                          | 默认值                         |
| --------------------------------- | ----------------------------- | ------------------------------ |
| `--yh-carousel-dot-color`         | 指示点默认颜色                | `rgba(255, 255, 255, 0.4)`     |
| `--yh-carousel-dot-active-color`  | 指示点激活颜色                | `#ffffff`                      |
| `--yh-carousel-dot-size`          | 指示点尺寸（圆点直径）        | `8px`                          |
| `--yh-carousel-dot-active-width`  | 激活态指示点宽度（line 类型） | `24px`                         |
| `--yh-carousel-arrow-bg`          | 箭头背景色                    | `rgba(255, 255, 255, 0.2)`     |
| `--yh-carousel-arrow-hover-bg`    | 箭头悬停背景色                | `rgba(255, 255, 255, 0.35)`    |
| `--yh-carousel-arrow-color`       | 箭头图标颜色                  | `#ffffff`                      |
| `--yh-carousel-arrow-size`        | 箭头按钮尺寸                  | `36px`                         |
| `--yh-carousel-arrow-icon-size`   | 箭头图标尺寸                  | `20px`                         |
| `--yh-carousel-transition-timing` | 过渡缓动函数                  | `cubic-bezier(0.4, 0, 0.2, 1)` |

### 类型导出

| 名称 | 说明 |
| --- | --- |
| `YhCarouselProps` | `YhCarousel` props 类型 |
| `YhCarouselEmits` | `YhCarousel` emits 类型 |
| `YhCarouselSlots` | `YhCarousel` slots 类型 |
| `YhCarouselExpose` | `YhCarousel` expose 类型 |
| `YhCarouselEffect` | 轮播特效联合类型 |
| `YhCarouselDirection` | 方向联合类型 |
| `YhCarouselArrow` | 箭头显示策略联合类型 |
| `YhCarouselTrigger` | 指示点触发方式联合类型 |
| `YhCarouselDotPlacement` | 指示点位置联合类型 |
| `YhCarouselItemProps` | `YhCarouselItem` props 类型 |
| `YhCarouselItemSlots` | `YhCarouselItem` slots 类型 |
| `YhCarouselInstance` | `YhCarousel` 实例类型 |
| `YhCarouselItemInstance` | `YhCarouselItem` 实例类型 |
