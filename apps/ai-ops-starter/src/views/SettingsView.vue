<script setup lang="ts">
import { reactive } from 'vue'
import { YhMessage } from '@yh-ui/yh-ui'
import { dependencyModeMeta } from '../config/dependency-mode'
import { settingsDefaults } from '../data/mock'

const localeOptions = [
  { value: 'zh-CN', label: 'zh-CN' },
  { value: 'en-US', label: 'en-US' }
]

const densityOptions = [
  { value: 'compact', label: 'Compact' },
  { value: 'comfortable', label: 'Comfortable' }
]

const channelOptions = [
  { value: 'canary', label: 'Canary' },
  { value: 'stable', label: 'Stable' }
]

const form = reactive({
  workspaceName: settingsDefaults.workspaceName,
  tenant: settingsDefaults.tenant,
  locale: settingsDefaults.locale,
  density: settingsDefaults.density,
  releaseChannel: settingsDefaults.releaseChannel,
  allowStreaming: settingsDefaults.allowStreaming,
  allowArtifacts: settingsDefaults.allowArtifacts,
  requireApproval: settingsDefaults.requireApproval,
  exposeShowcase: settingsDefaults.exposeShowcase,
  allowedModels: [...settingsDefaults.allowedModels],
  sourceConnectors: [...settingsDefaults.sourceConnectors]
})

function saveDraft() {
  YhMessage.success('Starter settings saved locally.')
}
</script>

<template>
  <div class="settings-layout">
    <section class="page-section">
      <header class="page-section-header">
        <div>
          <p class="eyebrow">Tenant defaults</p>
          <h2>Starter configuration</h2>
          <p class="helper">
            These switches define the starter behavior before this app is eventually extracted into
            a reusable template repository.
          </p>
        </div>

        <div class="page-actions">
          <YhButton type="primary" @click="saveDraft">Save draft</YhButton>
        </div>
      </header>

      <YhAlert :title="dependencyModeMeta.settingsAlertTitle" type="success" show-icon />

      <div class="settings-form">
        <YhForm :model="form" label-width="150px">
          <YhFormItem label="Workspace name">
            <YhInput v-model="form.workspaceName" />
          </YhFormItem>
          <YhFormItem label="Tenant key">
            <YhInput v-model="form.tenant" />
          </YhFormItem>
          <YhFormItem label="Locale">
            <YhSelect v-model="form.locale" :options="localeOptions" />
          </YhFormItem>
          <YhFormItem label="Density">
            <YhSelect v-model="form.density" :options="densityOptions" />
          </YhFormItem>
          <YhFormItem label="Release channel">
            <YhRadioGroup v-model="form.releaseChannel">
              <YhRadioButton v-for="item in channelOptions" :key="item.value" :value="item.value">
                {{ item.label }}
              </YhRadioButton>
            </YhRadioGroup>
          </YhFormItem>
          <YhFormItem label="Allowed models">
            <YhInputTag v-model="form.allowedModels" />
          </YhFormItem>
          <YhFormItem label="Source connectors">
            <YhInputTag v-model="form.sourceConnectors" />
          </YhFormItem>
          <YhFormItem label="Streaming">
            <YhSwitch v-model="form.allowStreaming" />
          </YhFormItem>
          <YhFormItem label="Artifacts">
            <YhSwitch v-model="form.allowArtifacts" />
          </YhFormItem>
          <YhFormItem label="Approval gate">
            <YhSwitch v-model="form.requireApproval" />
          </YhFormItem>
          <YhFormItem label="Expose showcase">
            <YhSwitch v-model="form.exposeShowcase" />
          </YhFormItem>
        </YhForm>
      </div>
    </section>

    <aside class="settings-side">
      <section class="page-section">
        <header class="page-section-header">
          <div>
            <p class="eyebrow">Snapshot</p>
            <h2>Current policy</h2>
          </div>
        </header>

        <YhDescriptions title="Starter policy" :column="1" direction="vertical" border>
          <YhDescriptionsItem label="Workspace">{{ form.workspaceName }}</YhDescriptionsItem>
          <YhDescriptionsItem label="Tenant">{{ form.tenant }}</YhDescriptionsItem>
          <YhDescriptionsItem label="Locale">{{ form.locale }}</YhDescriptionsItem>
          <YhDescriptionsItem label="Density">{{ form.density }}</YhDescriptionsItem>
          <YhDescriptionsItem label="Channel">{{ form.releaseChannel }}</YhDescriptionsItem>
        </YhDescriptions>
      </section>

      <section class="page-section">
        <header class="page-section-header">
          <div>
            <p class="eyebrow">Scope reminder</p>
            <h2>What comes next</h2>
          </div>
        </header>

        <div class="stack-list">
          <div class="stack-item">
            <strong>Route hardening</strong>
            <span>Replace mock data with tenant-aware adapters once the shells settle.</span>
          </div>
          <div class="stack-item">
            <strong>Starter extraction</strong>
            <span
              >Move to a standalone repo only after the layout, flows, and defaults stabilize.</span
            >
          </div>
        </div>
      </section>
    </aside>
  </div>
</template>

<style scoped>
.settings-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 340px;
  gap: 16px;
}

.settings-form {
  margin-top: 16px;
}

.settings-side {
  display: grid;
  gap: 16px;
  align-content: start;
}

@media (max-width: 1280px) {
  .settings-layout {
    grid-template-columns: 1fr;
  }
}
</style>
