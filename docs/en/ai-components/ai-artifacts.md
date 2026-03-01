# AiArtifacts

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

const visible = ref(false)
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

const visible2 = ref(false)
const codeData = {
  id: 'code-1',
  title: 'demo.ts',
  type: 'code',
  versions: [
    { version: '1', content: 'const a = 1;\nconsole.log(a);', description: 'Basic logic' }
  ]
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

const jsBasic = toJs(tsBasic)
const jsVersional = toJs(tsVersional)
const jsModes = toJs(tsModes)
const jsInline = toJs(tsInline)
</script>

`AiArtifacts` is an immersive side rendering panel designed to display complex AI-generated content, such as HTML pages, UI prototypes, or large code modules.

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

## API

### Props

| Property         | Description              | Type                              | Default     |
| ---------------- | ------------------------ | --------------------------------- | ----------- |
| `visible`        | Whether visible          | `boolean`                         | `false`     |
| `data`           | Artifact data structure  | `ArtifactData`                    | —           |
| `width`          | Panel width              | `string \| number`                | `'50%'`     |
| `mode`           | Initial display mode     | `'preview' \| 'code' \| 'inline'` | `'preview'` |
| `themeOverrides` | Theme variable overrides | `ComponentThemeVars`              | —           |

### ArtifactData

| Property   | Description    | Type                                                 |
| ---------- | -------------- | ---------------------------------------------------- |
| `id`       | Unique ID      | `string`                                             |
| `title`    | Title/Filename | `string`                                             |
| `type`     | Content type   | `'code' \| 'html' \| 'markdown' \| 'vue' \| 'react'` |
| `versions` | Version list   | `ArtifactVersion[]`                                  |

### ArtifactVersion

| Property      | Description         | Type               |
| ------------- | ------------------- | ------------------ |
| `version`     | Version label       | `string \| number` |
| `content`     | Source code/content | `string`           |
| `description` | Changes description | `string`           |

### Events

| Name             | Description                      | Parameters                     |
| ---------------- | -------------------------------- | ------------------------------ |
| `version-change` | Triggered when switching version | `(v: ArtifactVersion) => void` |
| `close`          | Emitted when closing the panel   | —                              |

## Use in Nuxt

This component fully supports Nuxt 3/4. In Nuxt projects, the component will be automatically imported.

For detailed configuration, please see [Nuxt Integration](/guide/nuxt).

## Theme Variables

| Variable Name                     | Description            | Default Value                    |
| --------------------------------- | ---------------------- | -------------------------------- |
| `--yh-ai-artifacts-bg`            | Panel background color | `var(--yh-bg-color)`             |
| `--yh-ai-artifacts-header-height` | Header height          | `56px`                           |
| `--yh-ai-artifacts-border-color`  | Divider color          | `var(--yh-border-color-lighter)` |
| `--yh-ai-artifacts-shadow`        | Panel shadow           | `var(--yh-box-shadow-light)`     |
