<script setup lang="ts">
import { ref } from 'vue'

interface StatItem {
  label: string
  value: string
  change: number
  icon: string
  color: string
}

interface ActivityItem {
  title: string
  time: string
  avatar: string
}

const stats = ref<StatItem[]>([
  { label: '总用户数', value: '12,846', change: 12.5, icon: 'user', color: '#1677ff' },
  { label: '订单总量', value: '8,234', change: -3.2, icon: 'star', color: '#52c41a' },
  { label: '销售额', value: '¥128,460', change: 8.1, icon: 'star', color: '#faad14' },
  { label: '访问量', value: '45,212', change: 15.3, icon: 'eye', color: '#eb2f96' }
])

const activities = ref<ActivityItem[]>([
  { title: '张三 提交了订单 #20240520001', time: '5 分钟前', avatar: 'Z' },
  { title: '李四 更新了用户信息', time: '12 分钟前', avatar: 'L' },
  { title: '王五 发布了新商品', time: '28 分钟前', avatar: 'W' },
  { title: '系统 完成了数据备份', time: '1 小时前', avatar: 'S' },
  { title: '赵六 修改了权限配置', time: '2 小时前', avatar: 'Z' }
])

const todoItems = ref([
  { title: '审核新注册用户（3人）', status: 'warning' },
  { title: '处理退款申请（2笔）', status: 'danger' },
  { title: '更新商品库存信息', status: 'info' },
  { title: '发布本周运营报告', status: 'info' },
  { title: '更新系统公告', status: 'info' }
])
</script>

<template>
  <div class="page-container">
    <div class="card-grid">
      <div v-for="item in stats" :key="item.label" class="stat-card">
        <div class="stat-card-header">
          <span class="stat-card-label">{{ item.label }}</span>
          <YhIcon :name="item.icon" :size="24" :color="item.color" />
        </div>
        <div class="stat-card-value">{{ item.value }}</div>
        <div class="stat-card-footer">
          <YhIcon
            :name="item.change > 0 ? 'upload' : 'download'"
            :size="12"
            :color="item.change > 0 ? '#52c41a' : '#ff4d4f'"
          />
          {{ Math.abs(item.change) }}% 较上周
        </div>
      </div>
    </div>

    <div class="chart-row">
      <div class="chart-card">
        <div class="chart-card-title">数据趋势</div>
        <div class="chart-placeholder">
          图表区域 — 接入 ECharts / Chart.js 后即可渲染折线图、柱状图等
        </div>
      </div>

      <div class="chart-card">
        <div class="chart-card-title">待办事项</div>
        <div style="display: grid; gap: 8px">
          <div
            v-for="(item, index) in todoItems"
            :key="index"
            style="
              display: flex;
              align-items: center;
              gap: 10px;
              padding: 10px;
              border-radius: 6px;
              background: var(--admin-bg);
            "
          >
            <div
              :style="{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background:
                  item.status === 'warning'
                    ? '#faad14'
                    : item.status === 'danger'
                      ? '#ff4d4f'
                      : '#1677ff',
                flexShrink: 0
              }"
            />
            <span style="font-size: 13px">{{ item.title }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="chart-card">
      <div class="chart-card-title">最近动态</div>
      <div style="display: grid; gap: 8px">
        <div
          v-for="(item, index) in activities"
          :key="index"
          style="
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 10px;
            border-radius: 6px;
            background: var(--admin-bg);
          "
        >
          <YhAvatar size="small" :style="{ backgroundColor: 'var(--admin-primary)' }">
            {{ item.avatar }}
          </YhAvatar>
          <span style="flex: 1; font-size: 13px">{{ item.title }}</span>
          <span style="font-size: 12px; color: var(--admin-text-secondary)">{{ item.time }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
