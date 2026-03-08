/**
 * 适配器接口定义
 * 适配器架构允许切换不同的 HTTP 实现
 */

import type { InternalRequestOptions, RequestResponse, HttpAdapter } from '../types'

/**
 * Fetch 适配器 - 浏览器/Node 18+ 环境
 */
export class FetchAdapter implements HttpAdapter {
  name = 'fetch'

  isSupported(): boolean {
    return typeof fetch !== 'undefined'
  }

  async request<T>(config: InternalRequestOptions): Promise<RequestResponse<T>> {
    const {
      fullPath,
      method = 'GET',
      headers = {},
      data,
      signal,
      credentials,
      responseType
    } = config

    const fetchOptions: RequestInit = {
      method,
      headers,
      credentials,
      signal
    }

    // 处理请求体
    if (data !== undefined && method !== 'GET') {
      if (data instanceof FormData) {
        fetchOptions.body = data
      } else if (data instanceof URLSearchParams) {
        fetchOptions.body = data
      } else {
        fetchOptions.body = JSON.stringify(data)
        if (!headers['Content-Type']) {
          headers['Content-Type'] = 'application/json'
        }
      }
    }

    const response = await fetch(fullPath!, fetchOptions)

    // 解析响应
    let responseData: T

    switch (responseType) {
      case 'text':
        responseData = (await response.text()) as T
        break
      case 'blob':
        responseData = (await response.blob()) as T
        break
      case 'arraybuffer':
        responseData = (await response.arrayBuffer()) as T
        break
      case 'formdata':
        responseData = (await response.formData()) as T
        break
      case 'json':
      default:
        const text = await response.text()
        responseData = text ? JSON.parse(text) : (null as T)
    }

    return {
      data: responseData,
      response,
      config,
      requestId: config.requestId!
    }
  }
}

/**
 * XHR 适配器 - 传统浏览器
 */
export class XHRAdapter implements HttpAdapter {
  name = 'xhr'

  isSupported(): boolean {
    return typeof XMLHttpRequest !== 'undefined'
  }

  async request<T>(config: InternalRequestOptions): Promise<RequestResponse<T>> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      const {
        fullPath,
        method = 'GET',
        headers = {},
        data,
        timeout,
        credentials,
        responseType
      } = config

      xhr.open(method, fullPath!, true)
      xhr.responseType = responseType as XMLHttpRequestResponseType

      // 设置请求头
      Object.entries(headers).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value)
      })

      // 设置凭证
      if (credentials) {
        xhr.withCredentials = credentials === 'include'
      }

      // 设置超时
      if (timeout) {
        xhr.timeout = timeout
      }

      // 超时处理
      xhr.ontimeout = () => {
        reject(new Error('Request timeout'))
      }

      // 完成处理
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          let responseData: T

          if (responseType === 'text') {
            responseData = xhr.responseText as T
          } else if (responseType === 'blob') {
            responseData = xhr.response as T
          } else if (responseType === 'arraybuffer') {
            responseData = xhr.response as T
          } else {
            try {
              responseData = xhr.responseText ? JSON.parse(xhr.responseText) : (null as T)
            } catch {
              responseData = xhr.responseText as T
            }
          }

          resolve({
            data: responseData,
            response: xhr as unknown as Response,
            config,
            requestId: config.requestId!
          })
        } else {
          reject(new Error(`Request failed with status ${xhr.status}`))
        }
      }

      // 错误处理
      xhr.onerror = () => {
        reject(new Error('Network error'))
      }

      // 发送请求
      if (data) {
        if (data instanceof FormData) {
          xhr.send(data)
        } else {
          xhr.setRequestHeader('Content-Type', 'application/json')
          xhr.send(JSON.stringify(data))
        }
      } else {
        xhr.send()
      }

      // 绑定 abort
      if (config.signal) {
        config.signal.addEventListener('abort', () => {
          xhr.abort()
        })
      }
    })
  }
}

/**
 * 获取默认适配器
 */
export function getDefaultAdapter(): HttpAdapter {
  if (typeof fetch !== 'undefined') {
    return new FetchAdapter()
  }
  if (typeof XMLHttpRequest !== 'undefined') {
    return new XHRAdapter()
  }
  throw new Error('No HTTP adapter available')
}
