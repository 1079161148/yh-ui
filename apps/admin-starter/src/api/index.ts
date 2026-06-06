import request from './request'
import type { RequestResponse } from '@yh-ui/request'

export interface UserRecord {
  id: number
  name: string
  email: string
  phone: string
  role: string
  status: string
  description: string
  createdAt: string
  updatedAt: string
}

export const userApi = {
  getList() {
    return request
      .get<UserRecord[]>('/mock/users.json')
      .then((res: RequestResponse<UserRecord[]>) => res.data)
  },
  getDetail(id: string) {
    return request
      .get<UserRecord[]>('/mock/users.json')
      .then((res: RequestResponse<UserRecord[]>) => {
        const users = res.data
        return users.find((u) => String(u.id) === id) || null
      })
  }
}

export interface DashboardStats {
  label: string
  value: string
  change: number
  icon: string
  color: string
}

export const dashboardApi = {
  getStats() {
    return Promise.resolve<DashboardStats[]>([
      { label: '总用户数', value: '12,846', change: 12.5, icon: 'user', color: '#1677ff' },
      { label: '订单总量', value: '8,234', change: -3.2, icon: 'star', color: '#52c41a' },
      { label: '销售额', value: '¥128,460', change: 8.1, icon: 'star', color: '#faad14' },
      { label: '访问量', value: '45,212', change: 15.3, icon: 'eye', color: '#eb2f96' }
    ])
  }
}
