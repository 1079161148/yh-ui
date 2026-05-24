<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { FormInstance, FormRule } from '@yh-ui/components'
import { YhMessage } from '@yh-ui/yh-ui'

const route = useRoute()
const router = useRouter()

const isEdit = ref(false)
const formRef = ref<FormInstance>()
const loading = ref(false)

const formModel = reactive({
  name: '',
  email: '',
  phone: '',
  role: '',
  status: true,
  description: ''
})

const rules: Record<string, FormRule[]> = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
  role: [{ required: true, message: '请选择角色', trigger: 'change' }],
  description: [{ max: 200, message: '描述不能超过200字', trigger: 'blur' }]
}

onMounted(() => {
  const id = route.query.id as string
  if (id) {
    isEdit.value = true
    formModel.name = '用户001'
    formModel.email = 'user001@example.com'
    formModel.phone = '13800138000'
    formModel.role = '管理员'
    formModel.status = true
    formModel.description = '该用户为系统测试用户'
  }
})

async function handleSubmit() {
  const valid = await formRef.value?.validate()
  if (!valid) return

  loading.value = true
  try {
    await new Promise((resolve) => setTimeout(resolve, 800))
    YhMessage.success(isEdit.value ? '更新成功' : '创建成功')
    router.back()
  } finally {
    loading.value = false
  }
}

function handleCancel() {
  router.back()
}
</script>

<template>
  <div class="page-container">
    <div class="form-card">
      <h2 class="form-card-title">{{ isEdit ? '编辑用户' : '新增用户' }}</h2>

      <YhForm ref="formRef" :model="formModel" :rules="rules" label-width="100px">
        <YhFormItem label="姓名" prop="name">
          <YhInput v-model="formModel.name" placeholder="请输入姓名" />
        </YhFormItem>

        <YhFormItem label="邮箱" prop="email">
          <YhInput v-model="formModel.email" placeholder="请输入邮箱" />
        </YhFormItem>

        <YhFormItem label="手机号" prop="phone">
          <YhInput v-model="formModel.phone" placeholder="请输入手机号" />
        </YhFormItem>

        <YhFormItem label="角色" prop="role">
          <YhSelect v-model="formModel.role" placeholder="请选择角色" style="width: 100%">
            <YhOption label="管理员" value="管理员" />
            <YhOption label="编辑者" value="编辑者" />
            <YhOption label="查看者" value="查看者" />
          </YhSelect>
        </YhFormItem>

        <YhFormItem label="状态" prop="status">
          <YhSwitch v-model="formModel.status" active-text="启用" inactive-text="禁用" />
        </YhFormItem>

        <YhFormItem label="描述" prop="description">
          <YhInput
            v-model="formModel.description"
            type="textarea"
            :rows="4"
            placeholder="请输入描述信息"
            show-word-limit
            :maxlength="200"
          />
        </YhFormItem>

        <YhFormItem>
          <YhSpace>
            <YhButton type="primary" :loading="loading" @click="handleSubmit">
              {{ isEdit ? '保存修改' : '立即创建' }}
            </YhButton>
            <YhButton @click="handleCancel">取消</YhButton>
          </YhSpace>
        </YhFormItem>
      </YhForm>
    </div>
  </div>
</template>
