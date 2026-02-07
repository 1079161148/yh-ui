/**
 * Demo 工具函数
 * 统一处理文档示例代码中 TypeScript → JavaScript 的转换
 *
 * 使用方式 (在 .md 文件的 <script setup> 中):
 *   import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'
 */

/** 标签辅助变量（避免 Vue 模板解析冲突） */
export const _T = 'template'
export const _S = 'script'

/**
 * toJs - 将 TypeScript 示例代码转换为 JavaScript
 *
 * 支持移除:
 * - `lang="ts"` 属性
 * - `import type` 语句 (纯类型导入 & 混合导入中的 type 前缀)
 * - `interface` / `type` 声明块
 * - 泛型参数 (支持嵌套: `ref<Record<string, unknown>[]>()`)
 * - `as` / `satisfies` 类型断言
 * - 参数 / 变量 / 返回值类型标注
 * - 解构参数类型标注: `({ a, b }: Props)` → `({ a, b })`
 * - 可选参数: `(x?: string)` → `(x)`
 * - 确定赋值断言: `let x!: Type` → `let x`
 * - 非空断言: `obj!.prop` → `obj.prop`
 * - `typeof` / `keyof` 类型操作符
 * - 对象字面量类型 `{ key: Type }`
 * - 元组类型 `[Type1, Type2]`
 * - 字符串 / 数字字面量类型 `'a' | 'b'` / `0 | 1`
 * - 函数类型 `(x: number) => void`
 */
export function toJs(tsCode: string): string {
  let code = tsCode

  // 1. 移除 lang="ts"
  code = code.replace(/\s*lang="ts"/g, '')

  // 2. 移除 import type 语句
  code = code.replace(/^import\s+type\s+[^\n]+\n?/gm, '')
  // 混合 import 中的 type 前缀: import { X, type Y } → import { X }
  code = code.replace(/,\s*type\s+\w+/g, '')
  code = code.replace(/\{\s*type\s+\w+,\s*/g, '{ ')

  // 3. 移除 interface 块（支持 extends、泛型、多行）
  code = code.replace(/\n*(?:export\s+)?interface\s+\w+\s*(?:<[^>]*>\s*)?(?:extends\s+[\w,\s<>]+)?\s*\{[\s\S]*?\}\n*/g, '\n')

  // 4. 移除 type 别名（先处理多行 {}，再处理单行）
  code = code.replace(/\n*(?:export\s+)?type\s+\w+(?:<[^>]*>)?\s*=\s*\{[\s\S]*?\}\n*/g, '\n')
  code = code.replace(/\n*(?:export\s+)?type\s+\w+(?:<[^>]*>)?\s*=\s*[^\n]+\n/g, '\n')

  // 5. 移除 export type { ... } 语句
  code = code.replace(/^export\s+type\s*\{[^}]*\}\s*;?\s*\n?/gm, '')

  // 6. 移除泛型参数: word<...>( → word(
  code = removeGenerics(code)

  // 7. 移除 as / satisfies 类型断言
  code = removeAsCasts(code)

  // 8. 移除类型标注（参数/变量/返回值/解构）
  code = removeTypeAnnotations(code)

  // 9. 移除非空断言: expr!. → expr.  expr!) → expr)
  code = code.replace(/(\w)!(?=[.)\],;\s}])/g, '$1')

  // 10. 移除确定赋值断言残留: let x! = → let x =（!: 已在步骤8处理，这里兜底）
  code = code.replace(/(\b(?:let|var)\s+\w+)!\s*=/g, '$1 =')

  // 11. 清理多余空行
  code = code.replace(/\n{3,}/g, '\n\n')

  return code.trim()
}

// ======================== 内部工具函数 ========================

/**
 * 找到匹配的闭合括号位置（支持嵌套，跳过字符串）
 * @returns 闭合字符位置，未找到返回 -1
 */
function findBalancedEnd(
  code: string,
  start: number,
  open: string,
  close: string
): number {
  let depth = 0
  let i = start

  while (i < code.length) {
    const ch = code[i]

    // 跳过字符串内容
    if (ch === "'" || ch === '"' || ch === '`') {
      i = skipString(code, i)
      continue
    }

    if (ch === open) depth++
    else if (ch === close) {
      depth--
      if (depth === 0) return i
    }
    i++
  }

  return -1
}

/**
 * 跳过字符串（单引号/双引号/模板字符串），返回跳过后的下一个位置
 */
function skipString(code: string, start: number): number {
  const q = code[start]
  let i = start + 1
  if (q === '`') {
    // 模板字符串：需处理 ${...} 嵌套
    while (i < code.length) {
      if (code[i] === '\\') { i += 2; continue }
      if (code[i] === '`') return i + 1
      if (code[i] === '$' && code[i + 1] === '{') {
        // 跳过模板表达式
        const end = findBalancedEnd(code, i + 1, '{', '}')
        if (end !== -1) { i = end + 1; continue }
      }
      i++
    }
  } else {
    while (i < code.length && code[i] !== q) {
      if (code[i] === '\\') i++
      i++
    }
    if (i < code.length) i++ // 跳过闭合引号
  }
  return i
}

/**
 * 将字符串追加到 result（跳过字符串内容）
 * @returns [新的 result, 新的 i]
 */
function copyString(code: string, i: number, result: string): [string, number] {
  const q = code[i]
  result += code[i]
  i++
  if (q === '`') {
    while (i < code.length) {
      if (code[i] === '\\') { result += code[i]; i++; if (i < code.length) { result += code[i]; i++ }; continue }
      if (code[i] === '`') { result += code[i]; i++; return [result, i] }
      result += code[i]
      i++
    }
  } else {
    while (i < code.length && code[i] !== q) {
      if (code[i] === '\\') { result += code[i]; i++ }
      result += code[i]
      i++
    }
    if (i < code.length) { result += code[i]; i++ }
  }
  return [result, i]
}

/**
 * 消费一段类型表达式，返回结束位置
 *
 * 覆盖类型:
 * - 标识符类型: number, string, MyType, Record<K,V>, Array<T>
 * - typeof / keyof 操作符: typeof X, keyof T
 * - 函数类型: (...) => ReturnType
 * - 对象字面量类型: { key: Type; ... }
 * - 元组类型: [Type1, Type2]
 * - 字符串字面量类型: 'value1' | 'value2'
 * - 数字字面量类型: 0 | 1
 * - 数组后缀: Type[]
 * - 联合 / 交叉: A | B, A & B
 */
function consumeType(code: string, start: number): number {
  let i = start

  // 跳过前导空白
  while (i < code.length && /\s/.test(code[i])) i++

  const consumeOne = (): void => {
    while (i < code.length && /\s/.test(code[i])) i++

    // (A) 函数类型 / 括号包裹: (...) => Type  或  (Type)
    if (code[i] === '(') {
      const end = findBalancedEnd(code, i, '(', ')')
      if (end !== -1) {
        i = end + 1
        const rest = code.slice(i)
        const arrow = rest.match(/^\s*=>/)
        if (arrow) {
          i += arrow[0].length
          consumeOne()
        }
        return
      }
    }

    // (B) 对象字面量类型: { key: Type; ... }
    if (code[i] === '{') {
      const end = findBalancedEnd(code, i, '{', '}')
      if (end !== -1) {
        i = end + 1
        // 数组后缀 []
        while (i < code.length && code[i] === '[' && code[i + 1] === ']') i += 2
        return
      }
    }

    // (C) 元组类型: [Type1, Type2, ...]
    if (code[i] === '[') {
      const end = findBalancedEnd(code, i, '[', ']')
      if (end !== -1) {
        i = end + 1
        return
      }
    }

    // (D) 字符串字面量类型: 'value' | "value"
    if (code[i] === "'" || code[i] === '"') {
      i = skipString(code, i)
      return
    }

    // (E) 模板字面量类型: `prefix${Type}suffix`
    if (code[i] === '`') {
      i = skipString(code, i)
      return
    }

    // (F) 数字字面量类型: 0, 1, -1
    if (/\d/.test(code[i] || '')) {
      while (i < code.length && /[\d.]/.test(code[i])) i++
      return
    }
    // 负数字面量
    if (code[i] === '-' && /\d/.test(code[i + 1] || '')) {
      i++
      while (i < code.length && /[\d.]/.test(code[i])) i++
      return
    }

    // (G) 标识符类型名 (包含 typeof, keyof, infer, readonly 等关键字)
    if (/[A-Za-z_$]/.test(code[i] || '')) {
      const identStart = i
      while (i < code.length && /[\w.$]/.test(code[i])) i++
      const ident = code.slice(identStart, i)

      // typeof / keyof / infer / readonly — 后跟空白 + 下一个类型
      if (ident === 'typeof' || ident === 'keyof' || ident === 'infer' || ident === 'readonly') {
        const beforeNext = i
        while (i < code.length && /\s/.test(code[i])) i++
        if (i > beforeNext && i < code.length && /[A-Za-z_$({['"\d`]/.test(code[i])) {
          consumeOne()
        }
        return
      }
    }

    // (H) 泛型参数 <...>
    if (code[i] === '<') {
      const end = findBalancedEnd(code, i, '<', '>')
      if (end !== -1) i = end + 1
    }

    // (I) 数组后缀 []（可连续: Type[][]）
    while (i < code.length && code[i] === '[' && code[i + 1] === ']') {
      i += 2
    }
  }

  // 消费第一个类型
  consumeOne()

  // 联合 | 或交叉 & 类型
  while (i < code.length) {
    const rest = code.slice(i)
    const unionMatch = rest.match(/^\s*[|&]\s*/)
    if (unionMatch) {
      i += unionMatch[0].length
      consumeOne()
    } else {
      break
    }
  }

  return i
}

/**
 * 移除泛型参数: identifier<...>( → identifier(
 * 支持任意标识符 (ref, computed, Map, Set, Array, Promise 等) 和任意深度嵌套
 * 同时支持 new Map<K,V>() 模式
 */
function removeGenerics(code: string): string {
  let result = ''
  let i = 0

  while (i < code.length) {
    const ch = code[i]

    // 跳过字符串
    if (ch === "'" || ch === '"' || ch === '`') {
      ;[result, i] = copyString(code, i, result)
      continue
    }

    // 检测 word< 模式
    if (ch === '<' && i > 0 && /\w/.test(code[i - 1])) {
      const end = findBalancedEnd(code, i, '<', '>')
      if (end !== -1) {
        // 检查 > 后面是否跟 ( —— 泛型函数调用 / 构造器
        const afterClose = code.slice(end + 1).match(/^\s*\(/)
        if (afterClose) {
          // 是泛型参数，跳过 <...> 部分
          i = end + 1
          continue
        }
      }
    }

    result += code[i]
    i++
  }

  return result
}

/**
 * 移除 as / satisfies 类型断言:
 *   expr as Type       → expr
 *   expr satisfies Type → expr
 * 支持复杂类型: as Record<string, unknown>[], as string | null
 */
function removeAsCasts(code: string): string {
  let result = ''
  let i = 0

  while (i < code.length) {
    const ch = code[i]

    // 跳过字符串
    if (ch === "'" || ch === '"' || ch === '`') {
      ;[result, i] = copyString(code, i, result)
      continue
    }

    // 检测 ` as Type` 或 ` satisfies Type` 模式
    if (i > 0 && /[\w)\]!}'"\x60]/.test(code[i - 1])) {
      const slice = code.slice(i)
      const castMatch = slice.match(/^(\s+(?:as|satisfies)\s+)/)
      if (castMatch) {
        // 确认后面跟的是类型（不是变量名等）
        const typeStart = i + castMatch[0].length
        const typeEnd = consumeType(code, typeStart)
        if (typeEnd > typeStart) {
          i = typeEnd
          continue
        }
      }
    }

    result += code[i]
    i++
  }

  return result
}

/**
 * 移除类型标注: `: Type`
 * 通过括号栈区分函数参数 vs 对象字面量属性
 *
 * 处理场景:
 * A. 返回类型:     ): string =>       → () =>
 *                  ): string {        → () {
 * B. 解构参数类型: ({ a, b }: Props)  → ({ a, b })
 *                  ([a, b]: Type)     → ([a, b])
 * C. 可选参数类型: (x?: string)       → (x)
 * D. 参数类型:     (x: number, y: string) → (x, y)
 * E. 变量类型:     const x: string = → const x =
 * F. 确定赋值断言: let x!: string =  → let x =
 */
function removeTypeAnnotations(code: string): string {
  let result = ''
  let i = 0
  const stack: string[] = [] // 括号栈: '(' | '{' | '['

  while (i < code.length) {
    const ch = code[i]

    // 跳过字符串（不追踪内部括号和冒号）
    if (ch === "'" || ch === '"' || ch === '`') {
      ;[result, i] = copyString(code, i, result)
      continue
    }

    // 跳过单行注释
    if (ch === '/' && code[i + 1] === '/') {
      while (i < code.length && code[i] !== '\n') {
        result += code[i]
        i++
      }
      continue
    }

    // 跳过多行注释
    if (ch === '/' && code[i + 1] === '*') {
      while (i < code.length && !(code[i] === '*' && code[i + 1] === '/')) {
        result += code[i]
        i++
      }
      if (i < code.length) { result += code[i]; i++; result += code[i]; i++ } // */
      continue
    }

    // 追踪括号深度
    if (ch === '(' || ch === '{' || ch === '[') {
      stack.push(ch)
    } else if (ch === ')' || ch === '}' || ch === ']') {
      stack.pop()
    }

    // 检测冒号是否为类型标注
    if (ch === ':') {
      const before = result.trimEnd()
      const lastChar = before[before.length - 1]

      // ——— 场景 A: 返回类型 ): Type => 或 ): Type { ———
      if (lastChar === ')') {
        let j = i + 1
        while (j < code.length && /\s/.test(code[j])) j++
        const typeEnd = consumeType(code, j)
        if (typeEnd > j) {
          const afterType = code.slice(typeEnd).trimStart()
          if (afterType.startsWith('=>') || afterType.startsWith('{')) {
            i = typeEnd
            continue
          }
        }
      }

      // ——— 场景 B: 解构参数类型 }: Type 或 ]: Type（在函数参数内） ———
      if ((lastChar === '}' || lastChar === ']') && stack.length > 0 && stack[stack.length - 1] === '(') {
        const closeBracket = lastChar
        const openBracket = closeBracket === '}' ? '{' : '['
        // 在 result 中向前找到匹配的开括号
        let depth = 0
        let k = before.length - 1
        for (; k >= 0; k--) {
          if (before[k] === closeBracket) depth++
          else if (before[k] === openBracket) {
            depth--
            if (depth === 0) break
          }
        }
        if (k >= 0) {
          const beforeBracket = before.slice(0, k).trimEnd()
          const charBeforeBracket = beforeBracket[beforeBracket.length - 1]
          // 如果开括号前是 ( 或 ,  → 解构参数上下文
          if (charBeforeBracket === '(' || charBeforeBracket === ',') {
            let j = i + 1
            while (j < code.length && /\s/.test(code[j])) j++
            const typeEnd = consumeType(code, j)
            if (typeEnd > j) {
              i = typeEnd
              continue
            }
          }
        }
      }

      // ——— 场景 C: 可选参数 identifier?: Type → identifier ———
      if (lastChar === '?') {
        const beforeQuestion = before.slice(0, -1).trimEnd()
        const identMatch = beforeQuestion.match(/\w+$/)
        if (identMatch) {
          const beforeIdent = beforeQuestion.slice(0, beforeQuestion.length - identMatch[0].length).trimEnd()
          const precedingChar = beforeIdent[beforeIdent.length - 1]
          const inParens = stack.length > 0 && stack[stack.length - 1] === '('
          const isParam = precedingChar === '(' || (precedingChar === ',' && inParens)

          if (isParam) {
            // 回退 result 中的 '?' 字符
            const qIdx = result.lastIndexOf('?')
            if (qIdx !== -1) result = result.slice(0, qIdx)
            // 跳过 ': Type'
            let j = i + 1
            while (j < code.length && /\s/.test(code[j])) j++
            const typeEnd = consumeType(code, j)
            if (typeEnd > j) {
              i = typeEnd
              continue
            }
          }
        }
      }

      // ——— 场景 D/E: 参数类型 (x: Type) 或变量类型 const x: Type = ———
      {
        const identMatch = before.match(/\w+$/)
        if (identMatch) {
          const beforeIdent = before.slice(0, before.length - identMatch[0].length).trimEnd()
          const precedingChar = beforeIdent[beforeIdent.length - 1]

          // 参数上下文: 前面是 ( 或 (在括号内的 ,)
          const inParens = stack.length > 0 && stack[stack.length - 1] === '('
          const isParam = precedingChar === '(' || (precedingChar === ',' && inParens)
          // 变量声明上下文
          const isVarDecl = /\b(?:const|let|var)\s*$/.test(beforeIdent)

          if (isParam || isVarDecl) {
            let j = i + 1
            while (j < code.length && /\s/.test(code[j])) j++
            const typeEnd = consumeType(code, j)
            if (typeEnd > j) {
              i = typeEnd
              continue
            }
          }
        }
      }

      // ——— 场景 F: 确定赋值断言 let x!: Type → let x ———
      if (lastChar === '!') {
        const beforeBang = before.slice(0, -1).trimEnd()
        const identMatch = beforeBang.match(/\w+$/)
        if (identMatch) {
          const beforeIdent = beforeBang.slice(0, beforeBang.length - identMatch[0].length).trimEnd()
          const isVarDecl = /\b(?:let|var)\s*$/.test(beforeIdent)
          if (isVarDecl) {
            // 回退 result 中的 '!' 字符
            const bangIdx = result.lastIndexOf('!')
            if (bangIdx !== -1) result = result.slice(0, bangIdx)
            let j = i + 1
            while (j < code.length && /\s/.test(code[j])) j++
            const typeEnd = consumeType(code, j)
            if (typeEnd > j) {
              i = typeEnd
              continue
            }
          }
        }
      }
    }

    result += code[i]
    i++
  }

  return result
}
