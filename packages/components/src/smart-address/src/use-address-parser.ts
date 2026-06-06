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

// ─── 正则匹配规则 ─────────────────────────────────────────────────────────────

/** 手机号：通用匹配模式，支持国际号码与国内 11 位 */
const PHONE_RE = /(?:\+?\d{1,4}[-.\s]?)?1[3-9]\d{9}|(?:\+?\d{1,4}[-.\s]?)?\d{7,14}/

/** 中文姓名（2-5 字），英文姓名（2-3 个单词） */
const CN_NAME_RE = /[\u4e00-\u9fa5]{2,5}/
const EN_NAME_RE = /\b[A-Za-z]+(?:\s[A-Z a-z]+){1,2}\b/

/** 行政区关键词默认值（中英双语兜底） */
const DEFAULT_PROVINCE_KW = ['省', '自治区', '特别行政区', 'Province', 'State']
const DEFAULT_CITY_KW = ['市', '州', '盟', 'City', 'Prefecture']
const DEFAULT_DISTRICT_KW = ['区', '县', '旗', 'District', 'County', 'Township']
const DEFAULT_STREET_KW = ['街道', '镇', '乡', '村', 'Street', 'Road', 'Ave', 'Lane']

export interface ParseOptions {
  provinceKeywords?: string[]
  cityKeywords?: string[]
  districtKeywords?: string[]
  streetKeywords?: string[]
}

/**
 * parseAddress - 智能解析地址字符串
 */
export function parseAddress(raw: string, options: ParseOptions = {}): ParsedAddress {
  let text = raw
    .replace(/\r?\n/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim()

  const result: ParsedAddress = {
    name: '',
    phone: '',
    province: '',
    city: '',
    district: '',
    street: '',
    detail: '',
    raw
  }

  // 1. 提取手机号 (记录位置以辅助提取姓名)
  const phoneMatch = text.match(PHONE_RE)
  let textAfterPhone = text
  if (phoneMatch) {
    result.phone = phoneMatch[0]
    const phoneIdx = text.indexOf(phoneMatch[0])

    // 如果电话前有文字且长度适中，极大概率是姓名
    const textBeforePhone = text.slice(0, phoneIdx).trim()
    if (textBeforePhone && textBeforePhone.length <= 20) {
      // 进一步校验 textBeforePhone 是否包含数字（如果是，可能包含地址）
      if (!/\d/.test(textBeforePhone)) {
        result.name = textBeforePhone
      }
    }

    textAfterPhone = text.replace(phoneMatch[0], ' ').trim()
  }

  let remaining = textAfterPhone

  // 2. 如果姓名仍为空，提取首部文字
  if (!result.name) {
    const namePrefixMatch = remaining.match(
      /^([A-Za-z\s]{2,15}|[\u4e00-\u9fa5]{2,5})[,，\s:：\-_|]/
    )
    if (namePrefixMatch) {
      result.name = namePrefixMatch[1].trim()
      remaining = remaining.slice(namePrefixMatch[0].length).trim()
    }
  } else {
    // 如果已经由电话前置逻辑提取了名，需从 remaining 中移除重复部分
    if (remaining.startsWith(result.name)) {
      remaining = remaining.slice(result.name.length).trim()
      // 移除前导符号
      remaining = remaining.replace(/^[,，\s:：\-_|]+/, '').trim()
    }
  }

  // 3. 地址结构解析 (优先处理逗号分隔的结构化地址)
  if (remaining.includes(',') || remaining.includes('，')) {
    remaining = parseByDelimiter(remaining, result, options)
  } else {
    remaining = extractRegion(remaining, result, options)
  }

  // 4. 剩余内容视为详细地址
  result.detail = remaining.replace(/^[;；,，\s]+/, '').trim()

  // 5. 最终兜底：再次检查 detail 是否包含隐藏姓名
  if (!result.name) {
    const potentialName = remaining.match(EN_NAME_RE) || remaining.match(CN_NAME_RE)
    if (potentialName && remaining.indexOf(potentialName[0]) < 10) {
      result.name = potentialName[0]
    }
  }

  return result
}

/**
 * 基于分隔符解析（大幅增强针对 Comma-separated 格式的识别能力）
 */
function parseByDelimiter(text: string, result: ParsedAddress, options: ParseOptions): string {
  const segments = text
    .split(/[,，]/)
    .map((s) => s.trim())
    .filter(Boolean)
  const pK = options.provinceKeywords || DEFAULT_PROVINCE_KW
  const cK = options.cityKeywords || DEFAULT_CITY_KW
  const dK = options.districtKeywords || DEFAULT_DISTRICT_KW
  const sK = options.streetKeywords || DEFAULT_STREET_KW

  const matchedIndices = new Set<number>()

  // 第一遍：精准关键词识别
  segments.forEach((seg, idx) => {
    if (dK.some((k) => seg.includes(k)) && !result.district) {
      result.district = seg
      matchedIndices.add(idx)
    } else if (cK.some((k) => seg.includes(k)) && !result.city) {
      result.city = seg
      matchedIndices.add(idx)
    } else if (pK.some((k) => seg.includes(k)) && !result.province) {
      result.province = seg
      matchedIndices.add(idx)
    } else if (sK.some((k) => seg.includes(k)) && !result.street) {
      result.street = seg
      matchedIndices.add(idx)
    }
  })

  // 第二遍：基于位置启发式分配（主要针对英文中省略 City/Province 字样的情况）
  // 逻辑：如果识别到了 District，且相邻段落未匹配，则按 District -> City -> Province (Small to Large) 推断
  segments.forEach((seg, idx) => {
    if (matchedIndices.has(idx)) return

    // 如果当前 idx-1 是 District 且当前未匹配，则当前可能是 City
    if (
      idx > 0 &&
      matchedIndices.has(idx - 1) &&
      segments[idx - 1] === result.district &&
      !result.city
    ) {
      result.city = seg
      matchedIndices.add(idx)
    }
    // 如果当前 idx-1 是 City 且当前未匹配，则当前可能是 Province
    else if (
      idx > 0 &&
      matchedIndices.has(idx - 1) &&
      segments[idx - 1] === result.city &&
      !result.province
    ) {
      result.province = seg
      matchedIndices.add(idx)
    }
    // 特殊处理：如果只有两个段落，且后一个是 City 或 Province 关键词，前一个推断为 City
    else if (idx === 0 && segments.length >= 2 && matchedIndices.has(1) && !result.city) {
      // 例如 "Shenzhen, Guangdong" -> Guangdong 已被识为省，Shenzhen 识为市
      // This logic needs to be careful not to overwrite if city was already found by keywords
      if (pK.some((k) => segments[1].includes(k)) && !result.province && !result.city) {
        // if next is province, current is city
        result.city = seg
        matchedIndices.add(idx)
      } else if (cK.some((k) => segments[1].includes(k)) && !result.city) {
        // if next is city, current is district (less common for 2 segments)
        // This case is less likely for a simple "A, B" structure where B is city and A is district.
        // More likely A is city, B is province.
        // Let's refine this: if segments[1] is a province, then segments[0] is likely a city.
        // If segments[1] is a city, then segments[0] is likely a district.
        // For simplicity, focus on the most common "City, Province" pattern.
        // The original instruction implies "Shenzhen, Guangdong" -> Guangdong is province, Shenzhen is city.
        // So if segments[1] is a province, segments[0] is a city.
        if (pK.some((k) => segments[1].includes(k)) && !result.city) {
          result.city = seg
          matchedIndices.add(idx)
        }
      }
    }
  })

  const remainingSegments = segments.filter((_, idx) => !matchedIndices.has(idx))
  return remainingSegments.join(', ')
}

/**
 * 启发式关键词提取
 */
function extractRegion(text: string, result: ParsedAddress, options: ParseOptions): string {
  let remaining = text
  const pK = options.provinceKeywords || DEFAULT_PROVINCE_KW
  const cK = options.cityKeywords || DEFAULT_CITY_KW
  const dK = options.districtKeywords || DEFAULT_DISTRICT_KW
  const sK = options.streetKeywords || DEFAULT_STREET_KW

  const processSuffix = (field: keyof ParsedAddress, keywords: string[], maxWords: number) => {
    for (const kw of keywords) {
      const idx = remaining.indexOf(kw)
      if (idx >= 0 && idx <= maxWords) {
        result[field] = remaining.slice(0, idx + kw.length) as string
        remaining = remaining.slice(idx + kw.length).trim()
        return true
      }
    }
    return false
  }

  processSuffix('province', pK, 12)
  processSuffix('city', cK, 12)
  processSuffix('district', dK, 12)
  processSuffix('street', sK, 15)

  return remaining
}

/** 格式化显示完整地址（不含姓名、手机） */
export function formatAddress(parsed: ParsedAddress): string {
  return [parsed.province, parsed.city, parsed.district, parsed.street, parsed.detail]
    .filter(Boolean)
    .join('')
}
