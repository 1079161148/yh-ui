/**
 * GraphQL 支持
 * 提供 GraphQL 查询构建器和请求处理
 */

import type { RequestOptions, RequestResponse, RequestError } from './types'

// ==================== 类型定义 ====================

/** GraphQL 操作类型 */
export type GraphQLOperationType = 'query' | 'mutation' | 'subscription'

/** GraphQL 变量 */
export type GraphQLVariable =
  | string
  | number
  | boolean
  | null
  | GraphQLVariable[]
  | { [key: string]: GraphQLVariable }

/** GraphQL 请求配置 */
export interface GraphQLRequestOptions extends RequestOptions {
  /** GraphQL 操作名称 */
  operationName?: string
  /** 是否返回原始响应 */
  rawResponse?: boolean
}

/** GraphQL 错误 */
export interface GraphQLError {
  message: string
  locations?: Array<{ line: number; column: number }>
  path?: Array<string | number>
  extensions?: Record<string, unknown>
}

/** GraphQL 响应 */
export interface GraphQLResponse<T = unknown> {
  data?: T
  errors?: GraphQLError[]
  extensions?: Record<string, unknown>
}

// ==================== GraphQL 查询构建器 ====================

/**
 * GraphQL 查询构建器
 *
 * @example
 * const query = gql`
 *   query GetUser($id: ID!) {
 *     user(id: $id) {
 *       id
 *       name
 *       email
 *     }
 *   }
 * `
 */
export class GraphQLBuilder {
  private operationType: GraphQLOperationType = 'query'
  private operationName: string = ''
  private variables: Record<string, GraphQLVariable> = {}
  private fields: string[] = []
  private fragments: string[] = []
  private variablesDefinitions: string[] = []

  /**
   * 设置操作类型
   */
  operation(type: GraphQLOperationType): this {
    this.operationType = type
    return this
  }

  /**
   * 设置操作名称
   */
  name(name: string): this {
    this.operationName = name
    return this
  }

  /**
   * 添加变量定义
   */
  variable(name: string, type: string, defaultValue?: GraphQLVariable): this {
    const defaultStr = defaultValue !== undefined ? ` = ${JSON.stringify(defaultValue)}` : ''
    this.variablesDefinitions.push(`$${name}: ${type}${defaultStr}`)
    return this
  }

  /**
   * 设置变量
   */
  variables_(vars: Record<string, GraphQLVariable>): this {
    this.variables = vars
    return this
  }

  /**
   * 添加字段
   */
  field(field: string): this {
    this.fields.push(field)
    return this
  }

  /**
   * 添加多个字段
   */
  addFields(fieldsInput: string[]): this {
    this.fields.push(...fieldsInput)
    return this
  }

  /**
   * 添加内联片段
   */
  inlineFragment(type: string, fieldsInput: string[]): this {
    this.fields.push(`... on ${type} { ${fieldsInput.join(' ')} }`)
    return this
  }

  /**
   * 添加片段
   */
  fragment(name: string): this {
    this.fragments.push(`...${name}`)
    return this
  }

  /**
   * 构建 GraphQL 查询字符串
   */
  build(): string {
    const parts: string[] = []

    // 操作类型和名称
    const operationHeader = this.operationName
      ? `${this.operationType} ${this.operationName}`
      : this.operationType

    // 变量定义
    const variablesStr =
      this.variablesDefinitions.length > 0 ? `(${this.variablesDefinitions.join(', ')})` : ''

    // 字段
    const fieldsStr = this.fields.join('\n')

    // 构建完整查询
    parts.push(`${operationHeader}${variablesStr} {\n  ${fieldsStr}\n}`)

    return parts.join('\n')
  }

  /**
   * 转换为请求配置
   */
  toRequestOptions(
    options: GraphQLRequestOptions = {}
  ): GraphQLRequestOptions & {
    data: { query: string; variables?: Record<string, GraphQLVariable>; operationName?: string }
  } {
    return {
      ...options,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      data: {
        query: this.build(),
        variables: Object.keys(this.variables).length > 0 ? this.variables : undefined,
        operationName: this.operationName || undefined
      }
    }
  }

  /**
   * 重置构建器
   */
  reset(): void {
    this.operationType = 'query'
    this.operationName = ''
    this.variables = {}
    this.fields = []
    this.fragments = []
    this.variablesDefinitions = []
  }
}

// ==================== GraphQL 客户端 ====================

/**
 * GraphQL 客户端
 * 简化 GraphQL 请求的发送
 */
export class GraphQLClient {
  private endpoint: string
  private defaultHeaders: Record<string, string> = {}
  private defaultOptions: GraphQLRequestOptions = {}

  /**
   * 创建 GraphQL 客户端
   */
  constructor(
    endpoint: string,
    options: { headers?: Record<string, string>; credentials?: RequestCredentials } = {}
  ) {
    this.endpoint = endpoint
    this.defaultHeaders = options.headers || {}
    this.defaultOptions = {
      credentials: options.credentials || 'same-origin'
    }
  }

  /**
   * 发送查询
   */
  async query<T = unknown>(
    query: string | GraphQLBuilder,
    variables?: Record<string, GraphQLVariable>,
    options: GraphQLRequestOptions = {}
  ): Promise<RequestResponse<GraphQLResponse<T>>> {
    const queryStr = typeof query === 'string' ? query : query.build()

    return this.request<GraphQLResponse<T>>({
      ...this.defaultOptions,
      ...options,
      method: 'POST',
      url: this.endpoint,
      headers: {
        ...this.defaultHeaders,
        'Content-Type': 'application/json',
        ...options.headers
      },
      data: {
        query: queryStr,
        variables,
        operationName: typeof query !== 'string' ? query['operationName'] : undefined
      }
    })
  }

  /**
   * 发送 mutation
   */
  async mutate<T = unknown>(
    mutation: string | GraphQLBuilder,
    variables?: Record<string, GraphQLVariable>,
    options: GraphQLRequestOptions = {}
  ): Promise<RequestResponse<GraphQLResponse<T>>> {
    return this.query<T>(mutation, variables, options)
  }

  /**
   * 发送原始请求
   */
  async request<T>(
    options: GraphQLRequestOptions & { url?: string; data?: unknown }
  ): Promise<RequestResponse<T>> {
    // 这里需要动态导入 Request，实际使用时会通过参数传入
    // 或者使用全局的 request 实例
    const { request } = await import('./request')
    return request.request<T>({
      ...options,
      url: options.url || this.endpoint
    } as RequestOptions & { url: string })
  }

  /**
   * 创建查询构建器
   */
  createQuery(): GraphQLBuilder {
    return new GraphQLBuilder().operation('query')
  }

  /**
   * 创建 Mutation 构建器
   */
  createMutation(): GraphQLBuilder {
    return new GraphQLBuilder().operation('mutation')
  }

  /**
   * 设置默认请求头
   */
  setHeader(key: string, value: string): void {
    this.defaultHeaders[key] = value
  }

  /**
   * 设置认证 Token
   */
  setAuthToken(token: string): void {
    this.defaultHeaders['Authorization'] = `Bearer ${token}`
  }
}

// ==================== 便捷函数 ====================

/**
 * 创建 GraphQL 查询构建器
 */
export function createGraphQLBuilder(): GraphQLBuilder {
  return new GraphQLBuilder()
}

/**
 * 创建 GraphQL 客户端
 */
export function createGraphQLClient(
  endpoint: string,
  options?: { headers?: Record<string, string>; credentials?: RequestCredentials }
): GraphQLClient {
  return new GraphQLClient(endpoint, options)
}

/**
 * GraphQL 模板标签函数
 * 用于更方便地编写 GraphQL 查询
 *
 * @example
 * const query = gql`
 *   query GetUser($id: ID!) {
 *     user(id: $id) {
 *       id
 *       name
 *     }
 *   }
 * `
 */
export function gql(strings: TemplateStringsArray, ...values: unknown[]): string {
  let result = ''

  strings.forEach((str, i) => {
    result += str
    if (i < values.length) {
      // 处理变量
      const value = values[i]
      if (typeof value === 'string') {
        result += value
      } else if (value !== undefined) {
        result += JSON.stringify(value)
      }
    }
  })

  return result
}

/**
 * 创建分页 GraphQL 查询
 * @returns 包含 query 字符串和 getVariables 函数的分页查询配置
 */
export function createPaginatedQuery(
  queryName: string,
  itemType: string,
  pageSize: number = 10
): {
  query: string
  getVariables: (cursor?: string) => Record<string, GraphQLVariable>
} {
  const query = `
    query ${queryName}($first: Int!, $after: String) {
      ${queryName}(first: $first, after: $after) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            ${itemType}
          }
        }
      }
    }
  `

  const getVariables = (cursor?: string): Record<string, GraphQLVariable> => ({
    first: pageSize,
    ...(cursor ? { after: cursor } : {})
  })

  return { query, getVariables }
}

/**
 * 解析 GraphQL 响应
 * @returns 返回 data 字段，类型与 GraphQLResponse 的泛型参数一致
 */
export function parseGraphQLResponse<T>(response: GraphQLResponse<T>): typeof response.data {
  if (response.errors && response.errors.length > 0) {
    const error = new Error(response.errors.map((e) => e.message).join(', ')) as RequestError
    error.code = 'GRAPHQL_ERROR'
    throw error
  }
  return response.data!
}
