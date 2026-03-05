# AiArtifacts

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

const visible = ref(false)
const visible2 = ref(false)
const visibleChart = ref(false)
const visibleBar = ref(false)
const visiblePie = ref(false)
const visibleRadar = ref(false)

const artifactData = {
  id: 'artifact-1',
  title: 'Dashboard Preview',
  type: 'html',
  currentVersion: '1',
  versions: [
    { version: '1', content: '<h1>Initial Concept</h1><p>Basic layout...</p>', description: 'Initial draft' },
    { version: '2', content: '<h1 style="color: var(--yh-color-primary);">Styled Version</h1><p>Branding applied...</p>', description: 'Style optimization' }
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

// ECharts Line Chart
const lineChartData = {
  id: 'echarts-line-1',
  title: 'Monthly Sales Trend',
  type: 'echarts',
  versions: [{ version: '1', content: '', description: 'ECharts Line Chart' }],
  echartsOption: {
    chartType: 'line',
    dataZoom: true,
    toolbox: true,
    interactive: true,
    option: {
      title: { text: 'Monthly Sales Trend', left: 'center' },
      tooltip: { trigger: 'axis' },
      legend: { data: ['Revenue', 'Profit'], bottom: 0 },
      xAxis: {
        type: 'category',
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      yAxis: { type: 'value', axisLabel: { formatter: '{value}K' } },
      series: [
        {
          name: 'Revenue',
          type: 'line',
          smooth: true,
          data: [120, 132, 101, 134, 90, 230, 210, 182, 191, 234, 290, 330],
          areaStyle: { opacity: 0.3 }
        },
        {
          name: 'Profit',
          type: 'line',
          smooth: true,
          data: [45, 52, 38, 60, 35, 90, 85, 72, 78, 95, 115, 130]
        }
      ]
    }
  }
}

// ECharts Bar Chart
const barChartData = {
  id: 'echarts-bar-1',
  title: 'Quarterly Product Comparison',
  type: 'echarts',
  versions: [{ version: '1', content: '', description: 'ECharts Bar Chart' }],
  echartsOption: {
    chartType: 'bar',
    dataZoom: false,
    toolbox: true,
    interactive: true,
    option: {
      title: { text: 'Quarterly Product Sales', left: 'center' },
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      legend: { data: ['Product A', 'Product B', 'Product C'], bottom: 0 },
      xAxis: { type: 'category', data: ['Q1', 'Q2', 'Q3', 'Q4'] },
      yAxis: { type: 'value' },
      series: [
        { name: 'Product A', type: 'bar', data: [320, 302, 341, 374], itemStyle: { borderRadius: [4, 4, 0, 0] } },
        { name: 'Product B', type: 'bar', data: [220, 182, 191, 234], itemStyle: { borderRadius: [4, 4, 0, 0] } },
        { name: 'Product C', type: 'bar', data: [150, 212, 201, 154], itemStyle: { borderRadius: [4, 4, 0, 0] } }
      ]
    }
  }
}

// ECharts Pie Chart
const pieChartData = {
  id: 'echarts-pie-1',
  title: 'Market Share Analysis',
  type: 'echarts',
  versions: [{ version: '1', content: '', description: 'ECharts Pie Chart' }],
  echartsOption: {
    chartType: 'pie',
    dataZoom: false,
    toolbox: true,
    interactive: true,
    option: {
      title: { text: 'Market Share Analysis', left: 'center' },
      tooltip: { trigger: 'item', formatter: '{a} <br/>{b}: {c} ({d}%)' },
      legend: { orient: 'vertical', left: 'left' },
      series: [
        {
          name: 'Market Share',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: { borderRadius: 10, borderColor: '#fff', borderWidth: 2 },
          label: { show: false, position: 'center' },
          emphasis: { label: { show: true, fontSize: 20, fontWeight: 'bold' } },
          labelLine: { show: false },
          data: [
            { value: 1048, name: 'Brand A' },
            { value: 735, name: 'Brand B' },
            { value: 580, name: 'Brand C' },
            { value: 484, name: 'Brand D' },
            { value: 300, name: 'Others' }
          ]
        }
      ]
    }
  }
}

// ECharts Radar Chart
const radarChartData = {
  id: 'echarts-radar-1',
  title: 'Competency Assessment',
  type: 'echarts',
  versions: [{ version: '1', content: '', description: 'ECharts Radar Chart' }],
  echartsOption: {
    chartType: 'radar',
    dataZoom: false,
    toolbox: true,
    interactive: true,
    option: {
      title: { text: 'Competency Assessment', left: 'center' },
      tooltip: { trigger: 'item' },
      legend: { data: ['Candidate A', 'Candidate B'], bottom: 0 },
      radar: {
        indicator: [
          { name: 'Technical Skills', max: 100 },
          { name: 'Communication', max: 100 },
          { name: 'Business Acumen', max: 100 },
          { name: 'Innovation', max: 100 },
          { name: 'Leadership', max: 100 },
          { name: 'Learning Agility', max: 100 }
        ]
      },
      series: [
        {
          name: 'Skills Comparison',
          type: 'radar',
          data: [
            { value: [92, 75, 85, 78, 65, 95], name: 'Candidate A', areaStyle: { opacity: 0.3 } },
            { value: [70, 90, 72, 88, 82, 78], name: 'Candidate B', areaStyle: { opacity: 0.3 } }
          ]
        }
      ]
    }
  }
}

const tsBasic = `<${_T}>
  <yh-button @click="visible = true">Open Artifacts</yh-button>
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
  title: 'Dashboard Preview',
  type: 'html',
  currentVersion: '1',
  versions: [
    { version: '1', content: '<h1>Initial Concept</h1><p>Basic layout...</p>', description: 'Initial draft' },
    { version: '2', content: '<h1 style="color: var(--yh-color-primary);">Styled Version</h1><p>Branding applied...</p>', description: 'Style optimization' }
  ]
};
</${_S}>`

const tsVersional = `<${_T}>
  <yh-ai-artifacts 
    v-model:visible="visible"
    :data="artifactData"
    @version-change="onVersionChange"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue';
import type { ArtifactData, ArtifactVersion } from '@yh-ui/components';

const visible = ref(false);
const artifactData: ArtifactData = {
  id: 'artifact-1',
  title: 'Dashboard Preview',
  type: 'html',
  currentVersion: '1',
  versions: [
    { version: '1', content: '<h1>Initial Concept</h1><p>Basic layout...</p>', description: 'Initial draft' },
    { version: '2', content: '<h1 style="color: var(--yh-color-primary);">Styled Version</h1><p>Branding applied...</p>', description: 'Style optimization' }
  ]
};

const onVersionChange = (v: ArtifactVersion) => {
  console.log('Switching version:', v.version);
};
</${_S}>`

const tsModes = `<${_T}>
  <yh-button @click="visible2 = true">View Source Mode</yh-button>
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
    { version: '1', content: 'const a = 1;\\nconsole.log(a);', description: 'Example code' }
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
  title: 'Inline Preview',
  type: 'html',
  versions: [
    { version: '1', content: '<h3>Embedded Preview</h3><p>Displayed directly within the page stream.</p>' }
  ]
};
</${_S}>`

const tsLineChart = `<${_T}>
  <yh-button @click="visibleChart = true">Open Line Chart</yh-button>
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
  title: 'Monthly Sales Trend',
  type: 'echarts',
  versions: [{ version: '1', content: '', description: 'ECharts Line Chart' }],
  echartsOption: {
    chartType: 'line',
    dataZoom: true,
    toolbox: true,
    interactive: true,
    option: {
      title: { text: 'Monthly Sales Trend', left: 'center' },
      tooltip: { trigger: 'axis' },
      legend: { data: ['Revenue', 'Profit'], bottom: 0 },
      xAxis: {
        type: 'category',
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      yAxis: { type: 'value', axisLabel: { formatter: '{value}K' } },
      series: [
        {
          name: 'Revenue',
          type: 'line',
          smooth: true,
          data: [120, 132, 101, 134, 90, 230, 210, 182, 191, 234, 290, 330],
          areaStyle: { opacity: 0.3 }
        },
        {
          name: 'Profit',
          type: 'line',
          smooth: true,
          data: [45, 52, 38, 60, 35, 90, 85, 72, 78, 95, 115, 130]
        }
      ]
    }
  } as ArtifactEChartsOption
};

const onChartReady = (chart: unknown) => {
  console.log('Chart instance ready:', chart);
};

const onChartClick = (params: unknown) => {
  console.log('Chart data point clicked:', params);
};
</${_S}>`

const tsBarChart = `<${_T}>
  <yh-button @click="visibleBar = true">Open Bar Chart</yh-button>
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
  title: 'Quarterly Product Comparison',
  type: 'echarts',
  versions: [{ version: '1', content: '', description: 'ECharts Bar Chart' }],
  echartsOption: {
    chartType: 'bar',
    dataZoom: false,
    toolbox: true,
    interactive: true,
    option: {
      title: { text: 'Quarterly Product Sales', left: 'center' },
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      legend: { data: ['Product A', 'Product B', 'Product C'], bottom: 0 },
      xAxis: { type: 'category', data: ['Q1', 'Q2', 'Q3', 'Q4'] },
      yAxis: { type: 'value' },
      series: [
        { name: 'Product A', type: 'bar', data: [320, 302, 341, 374], itemStyle: { borderRadius: [4, 4, 0, 0] } },
        { name: 'Product B', type: 'bar', data: [220, 182, 191, 234], itemStyle: { borderRadius: [4, 4, 0, 0] } },
        { name: 'Product C', type: 'bar', data: [150, 212, 201, 154], itemStyle: { borderRadius: [4, 4, 0, 0] } }
      ]
    }
  }
};

const onChartError = (error: Error) => {
  console.error('Chart load error:', error.message);
};
</${_S}>`

const tsPieChart = `<${_T}>
  <yh-button @click="visiblePie = true">Open Pie Chart</yh-button>
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
  title: 'Market Share Analysis',
  type: 'echarts',
  versions: [{ version: '1', content: '', description: 'ECharts Pie Chart' }],
  echartsOption: {
    chartType: 'pie',
    dataZoom: false,
    toolbox: true,
    interactive: true,
    option: {
      title: { text: 'Market Share Analysis', left: 'center' },
      tooltip: { trigger: 'item', formatter: '{a} <br/>{b}: {c} ({d}%)' },
      legend: { orient: 'vertical', left: 'left' },
      series: [
        {
          name: 'Market Share',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: { borderRadius: 10, borderColor: '#fff', borderWidth: 2 },
          label: { show: false, position: 'center' },
          emphasis: { label: { show: true, fontSize: 20, fontWeight: 'bold' } },
          labelLine: { show: false },
          data: [
            { value: 1048, name: 'Brand A' },
            { value: 735, name: 'Brand B' },
            { value: 580, name: 'Brand C' },
            { value: 484, name: 'Brand D' },
            { value: 300, name: 'Others' }
          ]
        }
      ]
    }
  }
};
</${_S}>`

const tsRadarChart = `<${_T}>
  <yh-button @click="visibleRadar = true">Open Radar Chart</yh-button>
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
  title: 'Competency Assessment',
  type: 'echarts',
  versions: [{ version: '1', content: '', description: 'ECharts Radar Chart' }],
  echartsOption: {
    chartType: 'radar',
    dataZoom: false,
    toolbox: true,
    interactive: true,
    option: {
      title: { text: 'Competency Assessment', left: 'center' },
      tooltip: { trigger: 'item' },
      legend: { data: ['Candidate A', 'Candidate B'], bottom: 0 },
      radar: {
        indicator: [
          { name: 'Technical Skills', max: 100 },
          { name: 'Communication', max: 100 },
          { name: 'Business Acumen', max: 100 },
          { name: 'Innovation', max: 100 },
          { name: 'Leadership', max: 100 },
          { name: 'Learning Agility', max: 100 }
        ]
      },
      series: [
        {
          name: 'Skills Comparison',
          type: 'radar',
          data: [
            { value: [92, 75, 85, 78, 65, 95], name: 'Candidate A', areaStyle: { opacity: 0.3 } },
            { value: [70, 90, 72, 88, 82, 78], name: 'Candidate B', areaStyle: { opacity: 0.3 } }
          ]
        }
      ]
    }
  }
};

const onRadarClick = (params: unknown) => {
  console.log('Radar area clicked:', params);
};
</${_S}>`

const jsBasic = toJs(tsBasic)
const jsVersional = toJs(tsVersional)
const jsModes = toJs(tsModes)
const jsInline = toJs(tsInline)
const jsLineChart = toJs(tsLineChart)
const jsBarChart = toJs(tsBarChart)
const jsPieChart = toJs(tsPieChart)
const jsRadarChart = toJs(tsRadarChart)
</script>

`AiArtifacts` is an immersive side rendering panel designed to display complex AI-generated content, such as HTML pages, UI prototypes, large code modules, or **interactive ECharts charts**.

## Basic Usage

Control visibility via `v-model:visible` and pass artifact details through the `data` prop.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="height: 400px; position: relative; border: 1px solid var(--yh-border-color-lighter); overflow: hidden; border-radius: 8px;">
    <div style="padding: 20px;">
      <yh-button @click="visible = true">Open Artifacts</yh-button>
    </div>
    <yh-ai-artifacts 
       v-model:visible="visible"
       :data="artifactData"
    />
  </div>
</DemoBlock>

## Multi-version Support

Artifacts allow users to switch between different iterations. Use the `versions` array to provide history and the `version-change` event to monitor user selection.

<DemoBlock title="Version Switching" :ts-code="tsVersional" :js-code="jsVersional">
  <div style="padding: 16px; background: var(--yh-bg-color-page); border-radius: 8px;">
     Tip: Click v1/v2 at the top of the side panel to experience version switching.
  </div>
</DemoBlock>

## Rendering Modes

Supports `preview` (live rendering) and `code` (syntax highlighting) modes. Default mode is `preview` for HTML content.

<DemoBlock title="Source Mode" :ts-code="tsModes" :js-code="jsModes">
  <div style="height: 300px; position: relative; border: 1px solid var(--yh-border-color-lighter); overflow: hidden; border-radius: 8px;">
    <div style="padding: 20px;">
      <yh-button @click="visible2 = true">View Example Code</yh-button>
    </div>
    <yh-ai-artifacts 
       v-model:visible="visible2"
       mode="code"
       :data="codeData"
    />
  </div>
</DemoBlock>

## Inline Display Mode

By setting `mode="inline"`, the component will appear as a standard block element embedded in the page stream or chat bubbles.

<DemoBlock title="Inline Mode & Theme Overrides" :ts-code="tsInline" :js-code="jsInline">
  <yh-ai-artifacts 
    visible
    mode="inline"
    :data="artifactData"
    :theme-overrides="{
      bgColor: '#f8f9fa'
    }"
  />
</DemoBlock>

## ECharts Interactive Chart - Line Chart

When `data.type` is set to `'echarts'`, the component automatically loads ECharts and renders an interactive chart. Pass the chart type and ECharts configuration via `echartsOption`. Supports data zoom (`dataZoom`), toolbox (`toolbox`), and chart events like `chart-ready` and `chart-click`.

<DemoBlock title="Line Chart - Monthly Sales Trend" :ts-code="tsLineChart" :js-code="jsLineChart">
  <div style="height: 420px; position: relative; border: 1px solid var(--yh-border-color-lighter); overflow: hidden; border-radius: 8px;">
    <div style="padding: 20px;">
      <yh-button type="primary" @click="visibleChart = true">Open Line Chart</yh-button>
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

## ECharts Interactive Chart - Bar Chart

Bar charts are ideal for multi-dimensional category comparisons. Set `echartsOption.chartType` to `'bar'`. Use `@chart-error` to catch chart loading failures.

<DemoBlock title="Bar Chart - Quarterly Product Comparison" :ts-code="tsBarChart" :js-code="jsBarChart">
  <div style="height: 400px; position: relative; border: 1px solid var(--yh-border-color-lighter); overflow: hidden; border-radius: 8px;">
    <div style="padding: 20px;">
      <yh-button type="primary" @click="visibleBar = true">Open Bar Chart</yh-button>
    </div>
    <yh-ai-artifacts
      v-model:visible="visibleBar"
      :data="barChartData"
      :chart-height="380"
      :echarts-toolbox="true"
    />
  </div>
</DemoBlock>

## ECharts Interactive Chart - Pie Chart

Donut pie charts are ideal for showing proportional relationships. Set `chartType` to `'pie'` and configure inner/outer radius via `series[].radius`.

<DemoBlock title="Pie Chart - Market Share Analysis" :ts-code="tsPieChart" :js-code="jsPieChart">
  <div style="height: 420px; position: relative; border: 1px solid var(--yh-border-color-lighter); overflow: hidden; border-radius: 8px;">
    <div style="padding: 20px;">
      <yh-button type="primary" @click="visiblePie = true">Open Pie Chart</yh-button>
    </div>
    <yh-ai-artifacts
      v-model:visible="visiblePie"
      :data="pieChartData"
      :chart-height="400"
      echarts-theme="light"
    />
  </div>
</DemoBlock>

## ECharts Interactive Chart - Radar Chart

Radar charts are perfect for multi-dimensional competency or KPI assessments. Set `chartType` to `'radar'` and define your indicators in `radar.indicator`.

<DemoBlock title="Radar Chart - Competency Assessment" :ts-code="tsRadarChart" :js-code="jsRadarChart">
  <div style="height: 420px; position: relative; border: 1px solid var(--yh-border-color-lighter); overflow: hidden; border-radius: 8px;">
    <div style="padding: 20px;">
      <yh-button type="primary" @click="visibleRadar = true">Open Radar Chart</yh-button>
    </div>
    <yh-ai-artifacts
      v-model:visible="visibleRadar"
      :data="radarChartData"
      :chart-height="400"
    />
  </div>
</DemoBlock>

## API

### Props

| Property             | Description                                    | Type                              | Default           |
| -------------------- | ---------------------------------------------- | --------------------------------- | ----------------- |
| `visible`            | Whether visible (supports `v-model:visible`)   | `boolean`                         | `false`           |
| `data`               | Artifact data structure                        | `ArtifactData`                    | —                 |
| `width`              | Panel width                                    | `string \| number`                | `'50%'`           |
| `fullscreen`         | Whether fullscreen                             | `boolean`                         | `false`           |
| `mode`               | Rendering mode                                 | `'preview' \| 'code' \| 'inline'` | `'preview'`       |
| `theme-overrides`    | Theme variable overrides                       | `ComponentThemeVars`              | —                 |
| `echarts-option`     | ECharts chart options (for chart/echarts type) | `ArtifactEChartsOption`           | —                 |
| `auto-load-e-charts` | Auto load ECharts library                      | `boolean`                         | `true`            |
| `echarts-theme`      | ECharts theme                                  | `'light' \| 'dark' \| 'default'`  | `'light'`         |
| `echarts-data-zoom`  | Enable data zoom                               | `boolean`                         | `true`            |
| `echarts-toolbox`    | Show toolbox                                   | `boolean`                         | `true`            |
| `chart-height`       | Chart height                                   | `string \| number`                | `400`             |
| `responsive-width`   | Whether width is responsive                    | `boolean`                         | `true`            |
| `chart-loading-text` | Placeholder text while chart is loading        | `string`                          | `'加载图表中...'` |

### ArtifactData

| Property         | Description                               | Type                                                                                                               |
| ---------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `id`             | Unique ID                                 | `string`                                                                                                           |
| `title`          | Title / Filename                          | `string`                                                                                                           |
| `type`           | Content type                              | `'code' \| 'html' \| 'markdown' \| 'vue' \| 'react' \| 'diagram' \| 'chart' \| 'sandbox' \| 'canvas' \| 'echarts'` |
| `currentVersion` | Currently selected version label          | `string \| number`                                                                                                 |
| `versions`       | Version list                              | `ArtifactVersion[]`                                                                                                |
| `echartsOption`  | ECharts options (for chart/echarts types) | `ArtifactEChartsOption`                                                                                            |

### ArtifactVersion

| Property      | Description         | Type               |
| ------------- | ------------------- | ------------------ |
| `version`     | Version label       | `string \| number` |
| `content`     | Source code/content | `string`           |
| `description` | Changes description | `string`           |
| `timestamp`   | Version timestamp   | `string \| number` |

### ArtifactEChartsOption

| Property      | Description                        | Type                                                                                                                                                                                               | Default |
| ------------- | ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `chartType`   | Chart type                         | `'line' \| 'bar' \| 'pie' \| 'scatter' \| 'gauge' \| 'radar' \| 'funnel' \| 'treemap' \| 'sunburst' \| 'heatmap' \| 'candlestick' \| 'boxplot' \| 'sankey' \| 'themeRiver' \| 'graph' \| 'custom'` | —       |
| `option`      | Standard ECharts option object     | `Record<string, unknown>`                                                                                                                                                                          | —       |
| `theme`       | Chart theme (overrides global)     | `'light' \| 'dark' \| 'default'`                                                                                                                                                                   | —       |
| `dataZoom`    | Enable data zoom                   | `boolean`                                                                                                                                                                                          | —       |
| `toolbox`     | Show toolbox                       | `boolean`                                                                                                                                                                                          | —       |
| `interactive` | Enable interactions (click, hover) | `boolean`                                                                                                                                                                                          | —       |

### Events

| Name             | Description                          | Parameters                     |
| ---------------- | ------------------------------------ | ------------------------------ |
| `update:visible` | Emitted when visibility changes      | `(val: boolean) => void`       |
| `update:mode`    | Emitted when mode switches           | `(mode: string) => void`       |
| `version-change` | Triggered when switching version     | `(v: ArtifactVersion) => void` |
| `chart-ready`    | ECharts instance initialized         | `(chart: unknown) => void`     |
| `chart-click`    | Triggered when clicking a data point | `(params: unknown) => void`    |
| `chart-error`    | Triggered when chart fails to load   | `(error: Error) => void`       |
| `close`          | Emitted when closing the panel       | —                              |

### Slots

| Name     | Description                                 | Scope                                              |
| -------- | ------------------------------------------- | -------------------------------------------------- |
| `chart`  | Custom chart render area (`type='chart'`)   | `{ data: ArtifactVersion \| null, title: string }` |
| `canvas` | Custom canvas render area (`type='canvas'`) | `{ data: ArtifactVersion \| null }`                |

## Use in Nuxt

This component fully supports Nuxt 3/4. In Nuxt projects, the component will be automatically imported. Since ECharts is loaded via **dynamic import (lazy loading)**, it is SSR-friendly with no extra configuration needed.

For manual registration, see the [Nuxt Integration](/guide/nuxt) guide.

## Theme Variables

| Variable Name                     | Description            | Default Value                    |
| --------------------------------- | ---------------------- | -------------------------------- |
| `--yh-ai-artifacts-bg-color`      | Panel background color | `var(--yh-bg-color-overlay)`     |
| `--yh-ai-artifacts-header-height` | Header height          | `56px`                           |
| `--yh-ai-artifacts-border-color`  | Divider color          | `var(--yh-border-color-lighter)` |
| `--yh-ai-artifacts-shadow`        | Panel shadow           | `var(--yh-box-shadow-light)`     |
