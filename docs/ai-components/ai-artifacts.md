# AiArtifacts 智能组件

<script setup lang="ts">
import { ref, computed } from 'vue'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

const visible = ref(false)
const visible2 = ref(false)
const visibleChart = ref(false)
const visibleBar = ref(false)
const visiblePie = ref(false)
const visibleRadar = ref(false)

const visibleVersional = ref(false)
const rateVal = ref(4)
const switchVal = ref(true)

const versionalData = {
  id: 'artifact-versional',
  title: '多版本组件与图片展示',
  type: 'vue',
  currentVersion: '1',
  versions: [
    { version: '1', content: '', description: '版本 v1: 示例图片预览' },
    { version: '2', content: '', description: '版本 v2: 内置组件预览' }
  ]
}

const onVersionChange = (v: any) => {
  console.log('切换版本:', v.version)
}

const visibleMedia = ref(false)
const mediaType = ref<'image' | 'video' | 'audio' | 'pdf' | 'text' | 'iframe'>('image')

const mediaData = computed(() => {
  const type = mediaType.value
  let content = ''
  let title = ''
  
  if (type === 'image') {
    title = '示例图片.png'
    content = '/yh-ui/logo.svg'
  } else if (type === 'video') {
    title = '示例视频.mp4'
    content = 'https://vjs.zencdn.net/v/oceans.mp4'
  } else if (type === 'audio') {
    title = '示例音频.mp3'
    content = 'https://www.w3schools.com/html/horse.mp3'
  } else if (type === 'pdf') {
    title = '示例文档.pdf'
    content = '/yh-ui/dummy.pdf'
  } else if (type === 'text') {
    title = '说明文档.txt'
    content = 'AiArtifacts 支持直接预览纯文本文件。\n\n特性：\n- 保留所有空格 and 换行\n- 等宽字体排版\n- 自动包含滚动条\n- 纯净的卡片展示风格'
  } else if (type === 'iframe') {
    title = '外部网页预览'
    content = '/yh-ui/iframe-test.html'
  }
  
  return {
    id: `media-${type}`,
    title,
    type,
    versions: [
      { version: '1', content, description: `预览 ${type} 资源` }
    ]
  }
})

const artifactData = {
  id: 'artifact-1',
  title: '控制台原型预览',
  type: 'html',
  currentVersion: '1',
  versions: [
    { version: '1', content: '<h1>初始草图</h1><p>这是基础布局...</p>', description: '初始版本' },
    { version: '2', content: '<h1 style="color: var(--yh-color-primary);">视觉强化版</h1><p>适配了主题色...</p>', description: '样式优化' }
  ]
}

const codeData = {
  id: 'code-1',
  title: 'demo.ts',
  type: 'code',
  versions: [
    { version: '1', content: 'const a = 1;\nconsole.log(a);', description: 'Basic logic' }
  ]
}

// ECharts 折线图数据
const lineChartData = {
  id: 'echarts-line-1',
  title: '月度销售趋势',
  type: 'echarts',
  versions: [{ version: '1', content: '', description: 'ECharts 折线图' }],
  echartsOption: {
    chartType: 'line',
    dataZoom: true,
    toolbox: true,
    interactive: true,
    option: {
      title: { text: '月度销售趋势', left: 'center' },
      tooltip: { trigger: 'axis' },
      legend: { data: ['销售额', '利润'], bottom: 0 },
      xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
      },
      yAxis: { type: 'value', axisLabel: { formatter: '{value} 万' } },
      series: [
        {
          name: '销售额',
          type: 'line',
          smooth: true,
          data: [120, 132, 101, 134, 90, 230, 210, 182, 191, 234, 290, 330],
          areaStyle: { opacity: 0.3 }
        },
        {
          name: '利润',
          type: 'line',
          smooth: true,
          data: [45, 52, 38, 60, 35, 90, 85, 72, 78, 95, 115, 130]
        }
      ]
    }
  }
}

// ECharts 柱状图数据
const barChartData = {
  id: 'echarts-bar-1',
  title: '季度产品对比',
  type: 'echarts',
  versions: [{ version: '1', content: '', description: 'ECharts 柱状图' }],
  echartsOption: {
    chartType: 'bar',
    dataZoom: false,
    toolbox: true,
    interactive: true,
    option: {
      title: { text: '季度产品销量对比', left: 'center' },
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      legend: { data: ['产品A', '产品B', '产品C'], bottom: 0 },
      xAxis: { type: 'category', data: ['Q1', 'Q2', 'Q3', 'Q4'] },
      yAxis: { type: 'value' },
      series: [
        { name: '产品A', type: 'bar', data: [320, 302, 341, 374], itemStyle: { borderRadius: [4, 4, 0, 0] } },
        { name: '产品B', type: 'bar', data: [220, 182, 191, 234], itemStyle: { borderRadius: [4, 4, 0, 0] } },
        { name: '产品C', type: 'bar', data: [150, 212, 201, 154], itemStyle: { borderRadius: [4, 4, 0, 0] } }
      ]
    }
  }
}

// ECharts 饼图数据
const pieChartData = {
  id: 'echarts-pie-1',
  title: '市场占有率分析',
  type: 'echarts',
  versions: [{ version: '1', content: '', description: 'ECharts 饼图' }],
  echartsOption: {
    chartType: 'pie',
    dataZoom: false,
    toolbox: true,
    interactive: true,
    option: {
      title: { text: '市场占有率分析', left: 'center' },
      tooltip: { trigger: 'item', formatter: '{a} <br/>{b}: {c} ({d}%)' },
      legend: { orient: 'vertical', left: 'left' },
      series: [
        {
          name: '市场份额',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: { borderRadius: 10, borderColor: '#fff', borderWidth: 2 },
          label: { show: false, position: 'center' },
          emphasis: { label: { show: true, fontSize: 20, fontWeight: 'bold' } },
          labelLine: { show: false },
          data: [
            { value: 1048, name: '品牌A' },
            { value: 735, name: '品牌B' },
            { value: 580, name: '品牌C' },
            { value: 484, name: '品牌D' },
            { value: 300, name: '其他' }
          ]
        }
      ]
    }
  }
}

// ECharts 雷达图数据
const radarChartData = {
  id: 'echarts-radar-1',
  title: '能力评估雷达图',
  type: 'echarts',
  versions: [{ version: '1', content: '', description: 'ECharts 雷达图' }],
  echartsOption: {
    chartType: 'radar',
    dataZoom: false,
    toolbox: true,
    interactive: true,
    option: {
      title: { text: '综合能力评估', left: 'center' },
      tooltip: { trigger: 'item' },
      legend: { data: ['候选人A', '候选人B'], bottom: 0 },
      radar: {
        indicator: [
          { name: '技术能力', max: 100 },
          { name: '沟通协作', max: 100 },
          { name: '业务理解', max: 100 },
          { name: '创新思维', max: 100 },
          { name: '领导力', max: 100 },
          { name: '学习能力', max: 100 }
        ]
      },
      series: [
        {
          name: '能力对比',
          type: 'radar',
          data: [
            {
              value: [92, 75, 85, 78, 65, 95],
              name: '候选人A',
              areaStyle: { opacity: 0.3 }
            },
            {
              value: [70, 90, 72, 88, 82, 78],
              name: '候选人B',
              areaStyle: { opacity: 0.3 }
            }
          ]
        }
      ]
    }
  }
}

// TS 代码示例字符串
const tsBasic = `<${_T}>
  <yh-button @click="visible = true">打开 Artifacts</yh-button>
  <yh-ai-artifacts 
    v-model:visible="visible"
    :data="artifactData"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue';
import type { ArtifactData } from '@yh-ui/components';

const visible = ref(false);
const artifactData: ArtifactData = {
  id: 'artifact-1',
  title: '控制台原型预览',
  type: 'html',
  currentVersion: '1',
  versions: [
    { version: '1', content: '<h1>初始草图</h1><p>这是基础布局...</p>', description: '初始版本' },
    { version: '2', content: '<h1 style="color: var(--yh-color-primary);">视觉强化版</h1><p>适配了主题色...</p>', description: '样式优化' }
  ]
};
</${_S}>`

const tsVersional = `<${_T}>
  <yh-button @click="visibleVersional = true">打开多版本 Artifacts</yh-button>
  <yh-ai-artifacts 
    v-model:visible="visibleVersional"
    :data="versionalData"
    @version-change="onVersionChange"
  >
    <!-- 使用 slot 自定义不同版本的内容渲染 -->
    <template #vue="{ data }">
      <div v-if="data?.version === '1'" style="padding: 20px; text-align: center;">
        <h3 style="margin-bottom: 12px; color: var(--yh-text-color-primary);">版本 v1: 图片预览</h3>
        <img src="/yh-ui/logo.svg" style="max-width: 100%; border-radius: 8px; box-shadow: var(--yh-box-shadow-light);" />
      </div>
      <div v-else-if="data?.version === '2'" style="padding: 20px;">
        <h3 style="margin-bottom: 16px; color: var(--yh-text-color-primary);">版本 v2: yh-ui 内置组件预览</h3>
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 14px; width: 120px; color: var(--yh-text-color-regular);">按钮组件 (YhButton):</span>
            <yh-button type="primary" size="small">主要按钮</yh-button>
            <yh-button type="success" size="small">成功按钮</yh-button>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 14px; width: 120px; color: var(--yh-text-color-regular);">评分组件 (YhRate):</span>
            <yh-rate v-model="rateVal" />
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 14px; width: 120px; color: var(--yh-text-color-regular);">开关组件 (YhSwitch):</span>
            <yh-switch v-model="switchVal" />
          </div>
          <div style="display: flex; align-items: center; gap: 8px; flex: 1;">
            <span style="font-size: 14px; width: 120px; color: var(--yh-text-color-regular);">进度条组件:</span>
            <div style="flex: 1; max-width: 200px;">
              <yh-progress :percentage="75" />
            </div>
          </div>
        </div>
      </div>
    </template>
  </yh-ai-artifacts>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue';
import type { ArtifactData, ArtifactVersion } from '@yh-ui/components';

const visibleVersional = ref(false);
const rateVal = ref(4);
const switchVal = ref(true);

const versionalData: ArtifactData = {
  id: 'artifact-versional',
  title: '多版本组件与图片展示',
  type: 'vue',
  currentVersion: '1',
  versions: [
    { version: '1', content: '', description: '版本 v1: 示例图片预览' },
    { version: '2', content: '', description: '版本 v2: 内置组件预览' }
  ]
};

const onVersionChange = (v: ArtifactVersion) => {
  console.log('切换版本:', v.version);
};
</${_S}>`

const tsModes = `<${_T}>
  <yh-button @click="visible2 = true">查看源码模式</yh-button>
  <yh-ai-artifacts 
    v-model:visible="visible2"
    mode="code"
    :data="codeData"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue';
import type { ArtifactData } from '@yh-ui/components';

const visible2 = ref(false);
const codeData: ArtifactData = {
  id: 'code-1',
  title: 'demo.ts',
  type: 'code',
  versions: [
    { version: '1', content: 'const a = 1;\\nconsole.log(a);', description: '示例代码' }
  ]
};
</${_S}>`

const tsInline = `<${_T}>
  <yh-ai-artifacts 
    visible
    mode="inline"
    :data="artifactData"
    :theme-overrides="{
      bgColor: '#f8f9fa'
    }"
  />
</${_T}>

<${_S} setup lang="ts">
import type { ArtifactData } from '@yh-ui/components';

const artifactData: ArtifactData = {
  id: 'artifact-1',
  title: '行内组件预览',
  type: 'html',
  versions: [
    { version: '1', content: '<h3>这是一个嵌入式预览</h3><p>它直接展示在页面流中。</p>' }
  ]
};
</${_S}>`

// ECharts 折线图 TS 示例
const tsLineChart = `<${_T}>
  <yh-button @click="visibleChart = true">打开折线图示例</yh-button>
  <yh-ai-artifacts
    v-model:visible="visibleChart"
    :data="lineChartData"
    :chart-height="420"
    :echarts-data-zoom="true"
    :echarts-toolbox="true"
    echarts-theme="light"
    @chart-ready="onChartReady"
    @chart-click="onChartClick"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue';
import type { ArtifactData, ArtifactEChartsOption } from '@yh-ui/components';

const visibleChart = ref(false);

const lineChartData: ArtifactData = {
  id: 'echarts-line-1',
  title: '月度销售趋势',
  type: 'echarts',
  versions: [{ version: '1', content: '', description: 'ECharts 折线图' }],
  echartsOption: {
    chartType: 'line',
    dataZoom: true,
    toolbox: true,
    interactive: true,
    option: {
      title: { text: '月度销售趋势', left: 'center' },
      tooltip: { trigger: 'axis' },
      legend: { data: ['销售额', '利润'], bottom: 0 },
      xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
      },
      yAxis: { type: 'value', axisLabel: { formatter: '{value} 万' } },
      series: [
        {
          name: '销售额',
          type: 'line',
          smooth: true,
          data: [120, 132, 101, 134, 90, 230, 210, 182, 191, 234, 290, 330],
          areaStyle: { opacity: 0.3 }
        },
        {
          name: '利润',
          type: 'line',
          smooth: true,
          data: [45, 52, 38, 60, 35, 90, 85, 72, 78, 95, 115, 130]
        }
      ]
    }
  } as ArtifactEChartsOption
};

const onChartReady = (chart: unknown) => {
  console.log('图表实例已就绪:', chart);
};

const onChartClick = (params: unknown) => {
  console.log('点击图表数据点:', params);
};
</${_S}>`

// ECharts 柱状图 TS 示例
const tsBarChart = `<${_T}>
  <yh-button @click="visibleBar = true">打开柱状图示例</yh-button>
  <yh-ai-artifacts
    v-model:visible="visibleBar"
    :data="barChartData"
    :chart-height="380"
    :echarts-toolbox="true"
    @chart-error="onChartError"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue';
import type { ArtifactData } from '@yh-ui/components';

const visibleBar = ref(false);

const barChartData: ArtifactData = {
  id: 'echarts-bar-1',
  title: '季度产品对比',
  type: 'echarts',
  versions: [{ version: '1', content: '', description: 'ECharts 柱状图' }],
  echartsOption: {
    chartType: 'bar',
    dataZoom: false,
    toolbox: true,
    interactive: true,
    option: {
      title: { text: '季度产品销量对比', left: 'center' },
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      legend: { data: ['产品A', '产品B', '产品C'], bottom: 0 },
      xAxis: { type: 'category', data: ['Q1', 'Q2', 'Q3', 'Q4'] },
      yAxis: { type: 'value' },
      series: [
        { name: '产品A', type: 'bar', data: [320, 302, 341, 374], itemStyle: { borderRadius: [4, 4, 0, 0] } },
        { name: '产品B', type: 'bar', data: [220, 182, 191, 234], itemStyle: { borderRadius: [4, 4, 0, 0] } },
        { name: '产品C', type: 'bar', data: [150, 212, 201, 154], itemStyle: { borderRadius: [4, 4, 0, 0] } }
      ]
    }
  }
};

const onChartError = (error: Error) => {
  console.error('图表加载失败:', error.message);
};
</${_S}>`

// ECharts 饼图 TS 示例
const tsPieChart = `<${_T}>
  <yh-button @click="visiblePie = true">打开饼图示例</yh-button>
  <yh-ai-artifacts
    v-model:visible="visiblePie"
    :data="pieChartData"
    :chart-height="400"
    echarts-theme="light"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue';
import type { ArtifactData } from '@yh-ui/components';

const visiblePie = ref(false);

const pieChartData: ArtifactData = {
  id: 'echarts-pie-1',
  title: '市场占有率分析',
  type: 'echarts',
  versions: [{ version: '1', content: '', description: 'ECharts 饼图' }],
  echartsOption: {
    chartType: 'pie',
    dataZoom: false,
    toolbox: true,
    interactive: true,
    option: {
      title: { text: '市场占有率分析', left: 'center' },
      tooltip: { trigger: 'item', formatter: '{a} <br/>{b}: {c} ({d}%)' },
      legend: { orient: 'vertical', left: 'left' },
      series: [
        {
          name: '市场份额',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: { borderRadius: 10, borderColor: '#fff', borderWidth: 2 },
          label: { show: false, position: 'center' },
          emphasis: { label: { show: true, fontSize: 20, fontWeight: 'bold' } },
          labelLine: { show: false },
          data: [
            { value: 1048, name: '品牌A' },
            { value: 735, name: '品牌B' },
            { value: 580, name: '品牌C' },
            { value: 484, name: '品牌D' },
            { value: 300, name: '其他' }
          ]
        }
      ]
    }
  }
};
</${_S}>`

// ECharts 雷达图 TS 示例
const tsRadarChart = `<${_T}>
  <yh-button @click="visibleRadar = true">打开雷达图示例</yh-button>
  <yh-ai-artifacts
    v-model:visible="visibleRadar"
    :data="radarChartData"
    :chart-height="400"
    @chart-click="onRadarClick"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue';
import type { ArtifactData } from '@yh-ui/components';

const visibleRadar = ref(false);

const radarChartData: ArtifactData = {
  id: 'echarts-radar-1',
  title: '能力评估雷达图',
  type: 'echarts',
  versions: [{ version: '1', content: '', description: 'ECharts 雷达图' }],
  echartsOption: {
    chartType: 'radar',
    dataZoom: false,
    toolbox: true,
    interactive: true,
    option: {
      title: { text: '综合能力评估', left: 'center' },
      tooltip: { trigger: 'item' },
      legend: { data: ['候选人A', '候选人B'], bottom: 0 },
      radar: {
        indicator: [
          { name: '技术能力', max: 100 },
          { name: '沟通协作', max: 100 },
          { name: '业务理解', max: 100 },
          { name: '创新思维', max: 100 },
          { name: '领导力', max: 100 },
          { name: '学习能力', max: 100 }
        ]
      },
      series: [
        {
          name: '能力对比',
          type: 'radar',
          data: [
            { value: [92, 75, 85, 78, 65, 95], name: '候选人A', areaStyle: { opacity: 0.3 } },
            { value: [70, 90, 72, 88, 82, 78], name: '候选人B', areaStyle: { opacity: 0.3 } }
          ]
        }
      ]
    }
  }
};

const onRadarClick = (params: unknown) => {
  console.log('点击雷达区域:', params);
};
</${_S}>`

const tsMedia = `<${_T}>
  <div style="padding: 20px; display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
    <span style="font-size: 14px; margin-right: 8px; color: var(--yh-text-color-regular);">选择预览类型：</span>
    <yh-button 
      v-for="t in ['image', 'video', 'audio', 'pdf', 'text', 'iframe']" 
      :key="t"
      :type="mediaType === t ? 'primary' : 'default'"
      size="small"
      @click="mediaType = t; visibleMedia = true"
    >
      {{ t }}
    </yh-button>
  </div>
  <div style="padding: 0 20px 20px;">
    <yh-button type="success" @click="visibleMedia = true">打开预览面板</yh-button>
  </div>
  <yh-ai-artifacts 
     v-model:visible="visibleMedia"
     :data="mediaData"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref, computed } from 'vue';
import type { ArtifactData } from '@yh-ui/components';

const visibleMedia = ref(false);
const mediaType = ref<'image' | 'video' | 'audio' | 'pdf' | 'text' | 'iframe'>('image');

const mediaData = computed(() => {
  const type = mediaType.value;
  let content = '';
  let title = '';
  
  if (type === 'image') {
    title = '示例图片.png';
    content = '/yh-ui/logo.svg';
  } else if (type === 'video') {
    title = '示例视频.mp4';
    content = 'https://vjs.zencdn.net/v/oceans.mp4';
  } else if (type === 'audio') {
    title = '示例音频.mp3';
    content = 'https://www.w3schools.com/html/horse.mp3';
  } else if (type === 'pdf') {
    title = '示例文档.pdf';
    content = '/yh-ui/dummy.pdf';
  } else if (type === 'text') {
    title = '说明文档.txt';
    content = 'AiArtifacts 支持直接预览纯文本文件。\\n\\n特性：\\n- 保留所有空格和换行\\n- 等宽字体排版\\n- 自动包含滚动条\\n- 纯净的卡片展示风格';
  } else if (type === 'iframe') {
    title = '外部网页预览';
    content = '/yh-ui/iframe-test.html';
  }
  
  return {
    id: \`media-\${type}\`,
    title,
    type,
    versions: [
      { version: '1', content, description: \`预览 \${type} 资源\` }
    ]
  };
});
</${_S}>`

const jsBasic = toJs(tsBasic)
const jsVersional = toJs(tsVersional)
const jsModes = toJs(tsModes)
const jsInline = toJs(tsInline)
const jsLineChart = toJs(tsLineChart)
const jsBarChart = toJs(tsBarChart)
const jsPieChart = toJs(tsPieChart)
const jsRadarChart = toJs(tsRadarChart)
const jsMedia = toJs(tsMedia)

const closeScript = ['<', '/script>'].join('')
const closeTemplate = ['<', '/template>'].join('')
const openScript = ['<', 'script setup>'].join('')
const openTemplate = ['<', 'template>'].join('')
const openScriptTs = ['<', 'script setup lang="ts">'].join('')
const openStyle = ['<', 'style scoped>'].join('')
const closeStyle = ['<', '/style>'].join('')

const visibleDynamicVue = ref(false)

const dynamicVueData = {
  id: 'artifact-dynamic-vue',
  title: '动态组件预览.vue',
  type: 'vue',
  versions: [
    {
      version: '1',
      content: `${openTemplate}
  <div class="dynamic-card">
    <h3 style="margin-top:0;color:#0284c7;">🚀 动态编译的 Vue 组件</h3>
    <p style="font-size:14px;color:#334155;">这是在沙箱中动态编译并渲染的组件，包含了 yh-ui 的内置组件！</p>
    <div style="margin: 16px 0; display: flex; gap: 8px; align-items: center;">
      <yh-tag type="success">编译成功</yh-tag>
      <yh-tag type="warning">沙箱隔离</yh-tag>
    </div>
    <div style="margin-bottom: 16px;">
      <yh-rate v-model="rate" />
    </div>
    <yh-button type="primary" size="small" @click="onClick">点击交互测试</yh-button>
  </div>
${closeTemplate}

${openScript}
import { ref } from 'vue'

const rate = ref(4)
const onClick = () => {
  alert('你点击了沙箱内部的按钮！当前评分: ' + rate.value)
}
${closeScript}

${openStyle}
.dynamic-card {
  padding: 20px;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border-radius: 12px;
  border: 1px solid #bae6fd;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
}
${closeStyle}`,
      description: '版本 v1: 动态编译 SFC'
    }
  ]
}

const tsDynamicVue = `${openTemplate}
  <yh-button type="primary" @click="visibleDynamicVue = true">打开动态编译预览</yh-button>
  <yh-ai-artifacts 
     v-model:visible="visibleDynamicVue"
     :data="dynamicVueData"
  />
${closeTemplate}

${openScriptTs}
import { ref } from 'vue';
import type { ArtifactData } from '@yh-ui/yh-ui';

// 用于构造内嵌 SFC 字符串的辅助变量（避免解析器误判标签）
const openTemplate = ['<', 'template>'].join('');
const closeTemplate = ['<', '/template>'].join('');
const openScript = ['<', 'script setup>'].join('');
const closeScript = ['<', '/script>'].join('');
const openStyle = ['<', 'style scoped>'].join('');
const closeStyle = ['<', '/style>'].join('');

const visibleDynamicVue = ref(false);
const dynamicVueData: ArtifactData = {
  id: 'artifact-dynamic-vue',
  title: '动态组件预览.vue',
  type: 'vue',
  versions: [
    {
      version: '1',
      content: \`\${openTemplate}
  <div class="dynamic-card">
    <h3 style="margin-top:0;color:#0284c7;">🚀 动态编译的 Vue 组件</h3>
    <p style="font-size:14px;color:#334155;">这是在沙箱中动态编译并渲染的组件，包含了 yh-ui 的内置组件！</p>
    <div style="margin: 16px 0; display: flex; gap: 8px; align-items: center;">
      <yh-tag type="success">编译成功</yh-tag>
      <yh-tag type="warning">沙箱隔离</yh-tag>
    </div>
    <div style="margin-bottom: 16px;">
      <yh-rate v-model="rate" />
    </div>
    <yh-button type="primary" size="small" @click="onClick">点击交互测试</yh-button>
  </div>
\${closeTemplate}

\${openScript}
import { ref } from 'vue';

const rate = ref(4);
const onClick = () => {
  alert('你点击了沙箱内部的按钮！当前评分: ' + rate.value);
};
\${closeScript}

\${openStyle}
.dynamic-card {
  padding: 20px;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border-radius: 12px;
  border: 1px solid #bae6fd;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
}
\${closeStyle}\`,
      description: '版本 v1: 动态编译 SFC'
    }
  ]
};
${closeScript}`

const jsDynamicVue = toJs(tsDynamicVue)
</script>

`AiArtifacts` 是一个沉浸式的侧边渲染面板，专门用于展示 AI 生成的复杂内容，如 HTML 页面、React/Vue 原型、长代码模块、结构化文档以及**交互式 ECharts 图表**。

## 基础用法

通过 `v-model:visible` 控制显示隐藏，并传入 `data` 结构描述内容及其版本。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="height: 450px; position: relative; border: 1px solid var(--yh-border-color-lighter); overflow: hidden; border-radius: 8px;">
    <div style="padding: 20px;">
      <yh-button @click="visible = true">打开 Artifacts</yh-button>
    </div>
    <yh-ai-artifacts 
       v-model:visible="visible"
       :data="artifactData"
    />
  </div>
</DemoBlock>

## 多版本支持

Artifact 允许用户在不同的迭代版本之间自由切换，通过 `versions` 数组提供历史记录。您可以通过 `version-change` 事件监听用户的切换行为。

<DemoBlock title="版本切换" :ts-code="tsVersional" :js-code="jsVersional">
  <div style="height: 450px; position: relative; border: 1px solid var(--yh-border-color-lighter); overflow: hidden; border-radius: 8px;">
    <div style="padding: 20px;">
      <yh-button @click="visibleVersional = true">打开多版本 Artifacts</yh-button>
    </div>
    <yh-ai-artifacts 
       v-model:visible="visibleVersional"
       :data="versionalData"
       @version-change="onVersionChange"
    >
      <template #vue="{ data }">
        <div v-if="data?.version === '1'" style="padding: 20px; text-align: center;">
          <h3 style="margin-bottom: 12px; color: var(--yh-text-color-primary);">版本 v1: 图片预览</h3>
          <img src="/logo.svg" style="max-width: 100%; border-radius: 8px; box-shadow: var(--yh-box-shadow-light);" />
        </div>
        <div v-else-if="data?.version === '2'" style="padding: 20px;">
          <h3 style="margin-bottom: 16px; color: var(--yh-text-color-primary);">版本 v2: yh-ui 内置组件预览</h3>
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 14px; width: 120px; color: var(--yh-text-color-regular);">按钮组件 (YhButton):</span>
              <yh-button type="primary" size="small">主要按钮</yh-button>
              <yh-button type="success" size="small">成功按钮</yh-button>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 14px; width: 120px; color: var(--yh-text-color-regular);">评分组件 (YhRate):</span>
              <yh-rate v-model="rateVal" />
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 14px; width: 120px; color: var(--yh-text-color-regular);">开关组件 (YhSwitch):</span>
              <yh-switch v-model="switchVal" />
            </div>
            <div style="display: flex; align-items: center; gap: 8px; flex: 1;">
              <span style="font-size: 14px; width: 120px; color: var(--yh-text-color-regular);">进度条组件:</span>
              <div style="flex: 1; max-width: 200px;">
                <yh-progress :percentage="75" />
              </div>
            </div>
          </div>
        </div>
      </template>
    </yh-ai-artifacts>
  </div>
</DemoBlock>

## 渲染模式

支持 `preview` (实时渲染) 和 `code` (源码高亮) 模式。目前预览模式支持标准的 HTML 结构沙盒。

<DemoBlock title="源码模式" :ts-code="tsModes" :js-code="jsModes">
  <div style="height: 300px; position: relative; border: 1px solid var(--yh-border-color-lighter); overflow: hidden; border-radius: 8px;">
    <div style="padding: 20px;">
      <yh-button @click="visible2 = true">查看示例代码</yh-button>
    </div>
    <yh-ai-artifacts 
       v-model:visible="visible2"
       mode="code"
       :data="codeData"
    />
  </div>
</DemoBlock>

## 行内展示模式

通过设置 `mode="inline"`，组件将不再作为固定侧边栏出现，而是作为普通的块级元素嵌入在页面流或对话气泡中。

<DemoBlock title="行内模式与主题自定义" :ts-code="tsInline" :js-code="jsInline">
  <yh-ai-artifacts 
    visible
    mode="inline"
    :data="artifactData"
    :theme-overrides="{
      bgColor: '#f8f9fa'
    }"
  />
</DemoBlock>

## ECharts 动态图表 - 折线图

当 `data.type` 设为 `'echarts'` 时，组件自动加载 ECharts 并渲染交互式图表。通过 `echartsOption` 传入图表类型与 ECharts 配置项。支持数据缩放（`dataZoom`）、工具栏（`toolbox`）以及 `chart-ready` / `chart-click` 等图表事件。

<DemoBlock title="折线图 - 月度销售趋势" :ts-code="tsLineChart" :js-code="jsLineChart">
  <div style="height: 520px; position: relative; border: 1px solid var(--yh-border-color-lighter); overflow: hidden; border-radius: 8px;">
    <div style="padding: 20px;">
      <yh-button type="primary" @click="visibleChart = true">打开折线图示例</yh-button>
    </div>
    <yh-ai-artifacts
      v-model:visible="visibleChart"
      :data="lineChartData"
      :chart-height="420"
      :echarts-data-zoom="true"
      :echarts-toolbox="true"
      echarts-theme="light"
    />
  </div>
</DemoBlock>

## ECharts 动态图表 - 柱状图

柱状图适合用于多维度类别对比。将 `echartsOption.chartType` 设为 `'bar'` 即可。同时可通过 `@chart-error` 捕获图表加载异常。

<DemoBlock title="柱状图 - 季度产品对比" :ts-code="tsBarChart" :js-code="jsBarChart">
  <div style="height: 480px; position: relative; border: 1px solid var(--yh-border-color-lighter); overflow: hidden; border-radius: 8px;">
    <div style="padding: 20px;">
      <yh-button type="primary" @click="visibleBar = true">打开柱状图示例</yh-button>
    </div>
    <yh-ai-artifacts
      v-model:visible="visibleBar"
      :data="barChartData"
      :chart-height="380"
      :echarts-toolbox="true"
    />
  </div>
</DemoBlock>

## ECharts 动态图表 - 饼图

环形饼图适合展示占比关系，将 `chartType` 设为 `'pie'`，并在 `series[].radius` 中配置内外半径即可实现环形效果。

<DemoBlock title="饼图 - 市场占有率分析" :ts-code="tsPieChart" :js-code="jsPieChart">
  <div style="height: 500px; position: relative; border: 1px solid var(--yh-border-color-lighter); overflow: hidden; border-radius: 8px;">
    <div style="padding: 20px;">
      <yh-button type="primary" @click="visiblePie = true">打开饼图示例</yh-button>
    </div>
    <yh-ai-artifacts
      v-model:visible="visiblePie"
      :data="pieChartData"
      :chart-height="400"
      echarts-theme="light"
    />
  </div>
</DemoBlock>

## ECharts 动态图表 - 雷达图

雷达图适合进行多维能力/指标评估分析，将 `chartType` 设为 `'radar'`，在 `radar.indicator` 中定义各维度的名称与最大值。

<DemoBlock title="雷达图 - 综合能力评估" :ts-code="tsRadarChart" :js-code="jsRadarChart">
  <div style="height: 500px; position: relative; border: 1px solid var(--yh-border-color-lighter); overflow: hidden; border-radius: 8px;">
    <div style="padding: 20px;">
      <yh-button type="primary" @click="visibleRadar = true">打开雷达图示例</yh-button>
    </div>
    <yh-ai-artifacts
      v-model:visible="visibleRadar"
      :data="radarChartData"
      :chart-height="400"
    />
  </div>
</DemoBlock>

## 多媒体与文件预览

组件支持图像、音视频、PDF、纯文本和 Iframe 网页的快速预览，并根据类型自动匹配渲染和操作交互。

<DemoBlock title="多媒体与文件预览" :ts-code="tsMedia" :js-code="jsMedia">
  <div style="height: 480px; position: relative; border: 1px solid var(--yh-border-color-lighter); overflow: hidden; border-radius: 8px;">
    <div style="padding: 20px; display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
      <span style="font-size: 14px; margin-right: 8px; color: var(--yh-text-color-regular);">选择预览类型：</span>
      <yh-button 
        v-for="t in ['image', 'video', 'audio', 'pdf', 'text', 'iframe']" 
        :key="t"
        :type="mediaType === t ? 'primary' : 'default'"
        size="small"
        @click="mediaType = t; visibleMedia = true"
      >
        {{ t }}
      </yh-button>
    </div>
    <div style="padding: 0 20px 20px;">
      <yh-button type="success" @click="visibleMedia = true">打开预览面板</yh-button>
    </div>
    <yh-ai-artifacts 
       v-model:visible="visibleMedia"
       :data="mediaData"
    />
  </div>
</DemoBlock>

## 动态 Vue 组件编译预览

当 `data.type` 设为 `'vue'` 时，如果主应用没有提供名为 `#vue` 的自定义插槽，组件会在沙箱 `iframe` 中使用本地内置的编译器和运行时包（如 `vue3-sfc-loader` 和 `yh-ui-bundle.js`）实时渲染编译传入的 Vue 单文件组件 (SFC) 源码。

这极大地简化了 AI 生成组件的沉浸式效果测试，提供了高度安全的沙箱隔离和完美的样式局部生效环境。

<DemoBlock title="动态 Vue 组件编译预览" :ts-code="tsDynamicVue" :js-code="jsDynamicVue">
  <div style="height: 480px; position: relative; border: 1px solid var(--yh-border-color-lighter); overflow: hidden; border-radius: 8px;">
    <div style="padding: 20px;">
      <yh-button type="primary" @click="visibleDynamicVue = true">打开动态编译预览</yh-button>
    </div>
    <yh-ai-artifacts 
       v-model:visible="visibleDynamicVue"
       :data="dynamicVueData"
    />
  </div>
</DemoBlock>

## API

### Props

| 属性名                  | 说明                                                                                                                                        | 类型                              | 默认值            |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ----------------- |
| `visible`               | 是否可见（支持 `v-model:visible`）                                                                                                          | `boolean`                         | `false`           |
| `data`                  | Artifact 数据结构                                                                                                                           | `ArtifactData`                    | —                 |
| `width`                 | 面板宽度                                                                                                                                    | `string \| number`                | `'50%'`           |
| `fullscreen`            | 是否全屏展示                                                                                                                                | `boolean`                         | `false`           |
| `mode`                  | 渲染模式                                                                                                                                    | `'preview' \| 'code' \| 'inline'` | `'preview'`       |
| `theme-overrides`       | 主题变量覆盖                                                                                                                                | `ComponentThemeVars`              | —                 |
| `echarts-option`        | ECharts 图表配置（chart/echarts 类型）                                                                                                      | `ArtifactEChartsOption`           | —                 |
| `auto-load-e-charts`    | 是否自动加载 ECharts 库                                                                                                                     | `boolean`                         | `true`            |
| `echarts-theme`         | ECharts 主题                                                                                                                                | `'light' \| 'dark' \| 'default'`  | `'light'`         |
| `echarts-data-zoom`     | 是否启用数据缩放                                                                                                                            | `boolean`                         | `true`            |
| `echarts-toolbox`       | 是否显示工具栏                                                                                                                              | `boolean`                         | `true`            |
| `chart-height`          | 图表高度                                                                                                                                    | `string \| number`                | `400`             |
| `responsive-width`      | 是否响应式宽度                                                                                                                              | `boolean`                         | `true`            |
| `chart-loading-text`    | 图表加载时的占位文案                                                                                                                        | `string`                          | `'加载图表中...'` |
| `sandbox-yh-ui-url`     | Vue SFC 沙箱渲染器使用的 yh-ui Bundle URL。未传时默认从 CDN（esm.sh）加载已发布版本；文档站通过 `provide('yhSandboxYhUiUrl', ...)` 全局覆盖 | `string`                          | CDN 自动          |
| `sandbox-yh-ui-css-url` | Vue SFC 沙箱渲染器使用的 yh-ui CSS URL                                                                                                      | `string`                          | CDN 自动          |

### ArtifactData

| 属性名           | 说明                                       | 类型                                                                                                                                                                               |
| ---------------- | ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`             | 唯一标识                                   | `string`                                                                                                                                                                           |
| `title`          | 标题/文件名                                | `string`                                                                                                                                                                           |
| `type`           | 类型                                       | `'code' \| 'html' \| 'markdown' \| 'vue' \| 'react' \| 'diagram' \| 'chart' \| 'sandbox' \| 'canvas' \| 'echarts' \| 'image' \| 'video' \| 'audio' \| 'pdf' \| 'text' \| 'iframe'` |
| `currentVersion` | 当前选中版本号                             | `string \| number`                                                                                                                                                                 |
| `versions`       | 版本列表                                   | `ArtifactVersion[]`                                                                                                                                                                |
| `echartsOption`  | ECharts 图表配置（chart/echarts 类型使用） | `ArtifactEChartsOption`                                                                                                                                                            |

### ArtifactVersion

| 属性名        | 说明       | 类型               |
| ------------- | ---------- | ------------------ |
| `version`     | 版本号     | `string \| number` |
| `content`     | 源代码内容 | `string`           |
| `description` | 更改说明   | `string`           |
| `timestamp`   | 版本时间戳 | `string \| number` |

### ArtifactEChartsOption

| 属性名        | 说明                       | 类型                                                                                                                                                                                               | 默认值 |
| ------------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `chartType`   | 图表类型                   | `'line' \| 'bar' \| 'pie' \| 'scatter' \| 'gauge' \| 'radar' \| 'funnel' \| 'treemap' \| 'sunburst' \| 'heatmap' \| 'candlestick' \| 'boxplot' \| 'sankey' \| 'themeRiver' \| 'graph' \| 'custom'` | —      |
| `option`      | 标准 ECharts 配置项对象    | `Record<string, unknown>`                                                                                                                                                                          | —      |
| `theme`       | 图表主题（覆盖全局主题）   | `'light' \| 'dark' \| 'default'`                                                                                                                                                                   | —      |
| `dataZoom`    | 是否启用数据缩放           | `boolean`                                                                                                                                                                                          | —      |
| `toolbox`     | 是否显示工具栏             | `boolean`                                                                                                                                                                                          | —      |
| `interactive` | 是否可交互（点击、悬浮等） | `boolean`                                                                                                                                                                                          | —      |

### Events

| 事件名           | 说明                   | 回调参数                       |
| ---------------- | ---------------------- | ------------------------------ |
| `update:visible` | 显示状态变更时触发     | `(val: boolean) => void`       |
| `update:mode`    | 渲染模式切换时触发     | `(mode: string) => void`       |
| `version-change` | 切换版本时触发         | `(v: ArtifactVersion) => void` |
| `chart-ready`    | ECharts 实例初始化完成 | `(chart: unknown) => void`     |
| `chart-click`    | 点击图表数据点时触发   | `(params: unknown) => void`    |
| `chart-error`    | 图表加载失败时触发     | `(error: Error) => void`       |
| `close`          | 关闭面板时触发         | —                              |

### Slots

| 插槽名   | 说明                                  | 作用域参数                                         |
| -------- | ------------------------------------- | -------------------------------------------------- |
| `chart`  | 自定义图表渲染区域（`type='chart'`）  | `{ data: ArtifactVersion \| null, title: string }` |
| `canvas` | 自定义画板渲染区域（`type='canvas'`） | `{ data: ArtifactVersion \| null }`                |

## 在 Nuxt 中使用

本组件完整支持 Nuxt 3/4。在 Nuxt 项目中，组件将被自动导入。由于 ECharts 采用**动态 import 懒加载**，对 SSR 友好，无需额外配置。

如需手动注册，请参考 [Nuxt 集成](/guide/nuxt) 文档。

## 主题变量

| 变量名                            | 说明       | 默认值                           |
| --------------------------------- | ---------- | -------------------------------- |
| `--yh-ai-artifacts-bg-color`      | 面板背景色 | `var(--yh-bg-color-overlay)`     |
| `--yh-ai-artifacts-header-height` | 顶部栏高度 | `56px`                           |
| `--yh-ai-artifacts-border-color`  | 分割线颜色 | `var(--yh-border-color-lighter)` |
| `--yh-ai-artifacts-shadow`        | 面板阴影   | `var(--yh-box-shadow-light)`     |
