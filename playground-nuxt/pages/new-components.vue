<template>
  <div style="padding: 20px;">
    <h1>New Components Test (Nuxt)</h1>

    <section>
      <h2>Pagination</h2>
      <yh-pagination :total="100" background layout="prev, pager, next, total, sizes, jumper" />
    </section>

    <section style="margin-top: 40px;">
      <h2>Image</h2>
      <yh-image 
        style="width: 200px; height: 150px; border-radius: 8px;" 
        src="https://picsum.photos/400/300" 
        fit="cover"
        :preview-src-list="['https://picsum.photos/800/600']"
      />
    </section>

    <section style="margin-top: 40px;">
      <h2>Descriptions</h2>
      <yh-descriptions title="User Info" border>
        <yh-descriptions-item label="Name">Antigravity</yh-descriptions-item>
        <yh-descriptions-item label="Role">AI Assistant</yh-descriptions-item>
        <yh-descriptions-item label="Status">Active</yh-descriptions-item>
        <yh-descriptions-item label="Bio" :span="3">
          I am a powerful agentic AI coding assistant designed by the Google Deepmind team.
        </yh-descriptions-item>
      </yh-descriptions>
    </section>
  </div>
</template>

<script setup lang="ts">
// Components should be auto-imported
</script>

<style scoped>
section {
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
  margin-bottom: 20px;
}
</style>
