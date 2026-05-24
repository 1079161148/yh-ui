<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { DEFAULT_ADMIN_AVATAR, useUserStore } from '@/stores/user'
import type { FormInstance, FormRule } from '@yh-ui/components'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const loginForm = reactive({
  username: 'admin',
  password: '',
  remember: true
})

const rules: Record<string, FormRule[]> = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

const formRef = ref<FormInstance>()
const loading = ref(false)
const errorMsg = ref('')

async function handleLogin() {
  const valid = await formRef.value?.validate()
  if (!valid) return

  loading.value = true
  errorMsg.value = ''

  try {
    await new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (loginForm.username === 'admin' && loginForm.password === 'admin') {
          resolve()
        } else {
          reject(new Error('用户名或密码错误'))
        }
      }, 800)
    })

    userStore.setToken('mock_token_admin_2024')
    userStore.setUserInfo({
      id: 1,
      username: 'admin',
      nickname: '管理员',
      avatar: DEFAULT_ADMIN_AVATAR,
      email: 'admin@example.com',
      role: 'admin',
      permissions: ['user:list', 'user:edit', 'user:delete', 'system:config']
    })

    const redirect = (route.query.redirect as string) || '/dashboard'
    router.replace(redirect)
  } catch (e: any) {
    errorMsg.value = e.message || '登录失败，请重试'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-background" aria-hidden="true">
      <div class="login-aurora aurora-left"></div>
      <div class="login-aurora aurora-right"></div>
      <div class="login-aurora aurora-bottom"></div>
      <div class="login-grid"></div>
      <span class="login-particle particle-1"></span>
      <span class="login-particle particle-2"></span>
      <span class="login-particle particle-3"></span>
      <span class="login-particle particle-4"></span>
      <span class="login-particle particle-5"></span>
      <span class="login-particle particle-6"></span>
    </div>

    <div class="login-shell">
      <div class="login-brand">
        <div class="brand-badge">YH-UI</div>
        <h2 class="brand-title">构建更现代的后台体验</h2>
        <p class="brand-description">
          统一设计语言、主题能力与工程化基建，让管理系统开箱即用，同时保持足够灵活的扩展空间。
        </p>
        <div class="brand-metrics">
          <div class="metric-item">
            <strong>80 + 23</strong>
            <span>80 个基础组件 + 23 个 AI 组件</span>
          </div>
          <div class="metric-item">
            <strong>Vue 3</strong>
            <span>组合式架构</span>
          </div>
          <div class="metric-item">
            <strong>TypeScript</strong>
            <span>类型友好</span>
          </div>
        </div>
      </div>

      <div class="login-card">
        <div class="login-card-glow" aria-hidden="true"></div>
        <div class="login-header">
          <div class="login-logo">YH</div>
          <h1 class="login-title">Admin Pro</h1>
          <p class="login-subtitle">基于 YH-UI 的通用后台管理系统模板</p>
        </div>

        <YhForm ref="formRef" :model="loginForm" :rules="rules" label-position="top">
          <YhFormItem label="用户名" prop="username">
            <YhInput v-model="loginForm.username" placeholder="请输入用户名" size="large">
              <template #prefix>
                <YhIcon name="user" :size="16" />
              </template>
            </YhInput>
          </YhFormItem>

          <YhFormItem label="密码" prop="password">
            <YhInput
              v-model="loginForm.password"
              type="password"
              placeholder="请输入密码"
              size="large"
              show-password
              @keyup.enter="handleLogin"
            >
              <template #prefix>
                <YhIcon name="lock" :size="16" />
              </template>
            </YhInput>
          </YhFormItem>

          <div class="login-extra">
            <YhFormItem prop="remember">
              <YhCheckbox v-model="loginForm.remember">记住密码</YhCheckbox>
            </YhFormItem>
            <a class="login-link" href="javascript:;">忘记密码？</a>
          </div>

          <div v-if="errorMsg" class="login-error">{{ errorMsg }}</div>

          <YhButton
            class="login-submit"
            type="primary"
            :loading="loading"
            size="large"
            long
            @click="handleLogin"
          >
            登录
          </YhButton>
        </YhForm>

        <div class="login-footer">
          <p>提示：用户名 admin / 密码 admin</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 32px;
  overflow: hidden;
  background:
    radial-gradient(circle at top, rgba(63, 94, 251, 0.22), transparent 38%),
    radial-gradient(circle at bottom right, rgba(34, 211, 238, 0.18), transparent 30%),
    linear-gradient(135deg, #050816 0%, #0b1125 35%, #111a37 65%, #060914 100%);
}

.login-background {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.login-aurora {
  position: absolute;
  border-radius: 999px;
  filter: blur(18px);
  opacity: 0.7;
  animation: auroraFloat 16s ease-in-out infinite;
}

.aurora-left {
  top: 8%;
  left: -8%;
  width: 28vw;
  height: 28vw;
  min-width: 240px;
  min-height: 240px;
  background: radial-gradient(circle, rgba(89, 94, 255, 0.72), rgba(89, 94, 255, 0.02) 72%);
}

.aurora-right {
  top: 12%;
  right: -10%;
  width: 30vw;
  height: 30vw;
  min-width: 280px;
  min-height: 280px;
  background: radial-gradient(circle, rgba(34, 211, 238, 0.52), rgba(34, 211, 238, 0.02) 70%);
  animation-duration: 20s;
}

.aurora-bottom {
  bottom: -14%;
  left: 35%;
  width: 34vw;
  height: 34vw;
  min-width: 300px;
  min-height: 300px;
  background: radial-gradient(circle, rgba(168, 85, 247, 0.45), rgba(168, 85, 247, 0.02) 70%);
  animation-duration: 18s;
}

.login-grid {
  position: absolute;
  inset: -20%;
  background-image:
    linear-gradient(rgba(148, 163, 184, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(148, 163, 184, 0.08) 1px, transparent 1px);
  background-size: 72px 72px;
  mask-image: radial-gradient(circle at center, rgba(0, 0, 0, 0.92), transparent 78%);
  transform: perspective(900px) rotateX(72deg) translateY(20%);
  transform-origin: center;
  opacity: 0.42;
}

.login-particle {
  position: absolute;
  display: block;
  width: 180px;
  height: 2px;
  border-radius: 999px;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0),
    rgba(125, 211, 252, 0.9),
    rgba(255, 255, 255, 0)
  );
  box-shadow: 0 0 18px rgba(96, 165, 250, 0.55);
  opacity: 0;
  transform: rotate(-28deg);
  animation: shooting 8s linear infinite;
}

.particle-1 {
  top: 12%;
  left: 8%;
  animation-delay: 0s;
}

.particle-2 {
  top: 24%;
  left: 56%;
  width: 140px;
  animation-delay: 1.8s;
}

.particle-3 {
  top: 44%;
  left: 14%;
  width: 220px;
  animation-delay: 3.2s;
}

.particle-4 {
  top: 58%;
  left: 62%;
  width: 160px;
  animation-delay: 4.8s;
}

.particle-5 {
  top: 74%;
  left: 24%;
  width: 200px;
  animation-delay: 5.7s;
}

.particle-6 {
  top: 18%;
  left: 76%;
  width: 120px;
  animation-delay: 6.6s;
}

.login-shell {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(360px, 420px);
  gap: 48px;
  align-items: center;
  width: min(1120px, 100%);
  min-width: 0;
}

.login-brand {
  min-width: 0;
  color: rgba(255, 255, 255, 0.96);
  animation: fadeUp 0.9s ease-out both;
}

.brand-badge {
  display: inline-flex;
  align-items: center;
  padding: 6px 14px;
  border: 1px solid rgba(148, 163, 184, 0.24);
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.45);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(14px);
  font-size: 13px;
  letter-spacing: 0.12em;
}

.brand-title {
  margin: 24px 0 16px;
  font-size: clamp(36px, 4vw, 56px);
  line-height: 1.08;
  letter-spacing: -0.03em;
}

.brand-description {
  max-width: 560px;
  margin: 0;
  color: rgba(226, 232, 240, 0.78);
  font-size: 16px;
  line-height: 1.75;
}

.brand-metrics {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin-top: 36px;
  min-width: 0;
}

.metric-item {
  min-width: 0;
  padding: 18px 20px;
  border: 1px solid rgba(148, 163, 184, 0.16);
  border-radius: 20px;
  background: rgba(15, 23, 42, 0.4);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    0 20px 40px rgba(15, 23, 42, 0.2);
  backdrop-filter: blur(16px);
}

.metric-item strong {
  display: block;
  color: #fff;
  font-size: 24px;
  font-weight: 700;
}

.metric-item span {
  display: block;
  margin-top: 8px;
  color: rgba(226, 232, 240, 0.72);
  font-size: 13px;
}

.login-card {
  position: relative;
  width: 100%;
  max-width: 420px;
  min-width: 0;
  padding: 40px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 28px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.08)),
    rgba(10, 15, 30, 0.72);
  box-shadow:
    0 24px 80px rgba(2, 6, 23, 0.48),
    inset 0 1px 0 rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(24px);
  animation:
    cardFloat 7s ease-in-out infinite,
    fadeUp 0.9s ease-out both;
}

.login-card-glow {
  position: absolute;
  inset: -1px;
  z-index: -1;
  border-radius: inherit;
  background: linear-gradient(
    135deg,
    rgba(96, 165, 250, 0.35),
    rgba(168, 85, 247, 0.22),
    rgba(34, 211, 238, 0.32)
  );
  filter: blur(20px);
  opacity: 0.9;
}

.login-header {
  position: relative;
  text-align: center;
  margin-bottom: 32px;
}

.login-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  margin: 0 auto 16px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 18px;
  background:
    linear-gradient(135deg, rgba(59, 130, 246, 0.95), rgba(14, 165, 233, 0.9)),
    rgba(255, 255, 255, 0.12);
  box-shadow:
    0 12px 30px rgba(37, 99, 235, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.18);
  color: #fff;
  font-size: 20px;
  font-weight: 700;
}

.login-title {
  margin: 0 0 8px;
  color: #f8fafc;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 0.01em;
}

.login-subtitle {
  margin: 0;
  font-size: 14px;
  color: rgba(226, 232, 240, 0.72);
}

.login-extra {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  gap: 12px;
  min-width: 0;
}

.login-link {
  font-size: 13px;
  color: #7dd3fc;
  text-decoration: none;
  transition:
    color 0.25s ease,
    text-shadow 0.25s ease;
}

.login-link:hover {
  color: #bae6fd;
  text-shadow: 0 0 12px rgba(125, 211, 252, 0.4);
}

.login-error {
  padding: 8px 12px;
  margin-bottom: 16px;
  border: 1px solid rgba(248, 113, 113, 0.28);
  border-radius: 12px;
  background: rgba(127, 29, 29, 0.22);
  color: #fecaca;
  font-size: 13px;
  backdrop-filter: blur(10px);
}

.login-footer {
  margin-top: 24px;
  text-align: center;
}

.login-footer p {
  font-size: 12px;
  color: rgba(226, 232, 240, 0.6);
  margin: 0;
}

:deep(.yh-form-item__label) {
  color: rgba(241, 245, 249, 0.92);
}

:deep(.yh-input__wrapper) {
  border-color: rgba(148, 163, 184, 0.18);
  background: rgba(15, 23, 42, 0.44);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

:deep(.yh-input__wrapper:hover) {
  border-color: rgba(125, 211, 252, 0.42);
}

:deep(.yh-input.is-focus .yh-input__wrapper) {
  border-color: rgba(96, 165, 250, 0.66);
  box-shadow:
    0 0 0 3px rgba(59, 130, 246, 0.14),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

:deep(.yh-input__inner) {
  color: #f8fafc;
}

:deep(.yh-input__inner::placeholder) {
  color: rgba(148, 163, 184, 0.82);
}

:deep(.yh-input__prefix) {
  color: rgba(186, 230, 253, 0.88);
}

:deep(.yh-input__icon) {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

:deep(.yh-checkbox__label) {
  color: rgba(226, 232, 240, 0.74);
}

:deep(.yh-button--primary) {
  box-shadow: 0 16px 36px rgba(37, 99, 235, 0.34);
}

.login-submit {
  width: 100%;
}

@keyframes auroraFloat {
  0%,
  100% {
    transform: translate3d(0, 0, 0) scale(1);
  }

  50% {
    transform: translate3d(18px, -24px, 0) scale(1.08);
  }
}

@keyframes shooting {
  0% {
    opacity: 0;
    transform: translate3d(-10vw, -4vh, 0) rotate(-28deg);
  }

  8% {
    opacity: 1;
  }

  28% {
    opacity: 0;
    transform: translate3d(18vw, 12vh, 0) rotate(-28deg);
  }

  100% {
    opacity: 0;
    transform: translate3d(18vw, 12vh, 0) rotate(-28deg);
  }
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translate3d(0, 20px, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes cardFloat {
  0%,
  100% {
    transform: translate3d(0, 0, 0);
  }

  50% {
    transform: translate3d(0, -8px, 0);
  }
}

@media (max-width: 980px) {
  .login-page {
    padding: 24px;
  }

  .login-shell {
    grid-template-columns: minmax(0, 1fr);
    gap: 28px;
    width: min(480px, 100%);
  }

  .login-brand {
    text-align: center;
  }

  .brand-description {
    max-width: none;
  }
}

@media (max-width: 640px) {
  .login-page {
    padding: 16px;
  }

  .login-card {
    padding: 28px 20px;
    border-radius: 24px;
  }

  .brand-title {
    margin-top: 18px;
    font-size: 34px;
  }

  .brand-metrics {
    grid-template-columns: minmax(0, 1fr);
  }

  .login-extra {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
