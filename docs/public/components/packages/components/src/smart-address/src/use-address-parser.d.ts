/**
 * 智能地址解析 Hook
 * 基于正则 + NLP 启发式算法解析中文地址字符串
 * 无外部依赖，纯前端实现，支持 SSR
 */
export interface ParsedAddress {
  name: string
  phone: string
  province: string
  city: string
  district: string
  street: string
  detail: string
  /** 原始输入 */
  raw: string
}
export interface ParseOptions {
  provinceKeywords?: string[]
  cityKeywords?: string[]
  districtKeywords?: string[]
  streetKeywords?: string[]
}
/**
 * parseAddress - 智能解析地址字符串
 */
export declare function parseAddress(raw: string, options?: ParseOptions): ParsedAddress
/** 格式化显示完整地址（不含姓名、手机） */
export declare function formatAddress(parsed: ParsedAddress): string
