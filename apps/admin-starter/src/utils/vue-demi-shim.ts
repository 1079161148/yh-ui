/*
 * @File name:
 * @Author: 1079161148@qq.com
 * @Version: V1.0
 * @Date: 2026-05-22 23:52:39
 * @Description:
 * Copyright (C) 2024-{year} Tsing Micro Technology Inc All rights reserved.
 */
export * from 'vue'

export const isVue2 = false

export const isVue3 = true

export function set<T>(target: object, key: string | number | symbol, val: T): T {
  ;(target as Record<string | number | symbol, T>)[key] = val
  return val
}

export function del(target: object, key: string | number | symbol): void {
  delete (target as Record<string | number | symbol, unknown>)[key]
}
