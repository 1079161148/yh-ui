/**
 * 批量生成语言包脚本
 * 基于英文模板生成其他语言包的基础结构
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 需要创建的语言列表
const languages = [
  // 已存在的语言（保留用于参考）
  { code: 'zh-cn', name: 'Simplified Chinese' },
  { code: 'en', name: 'English' },
  { code: 'az', name: 'Azerbaijani' },
  { code: 'de', name: 'German' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'es', name: 'Spanish' },
  { code: 'da', name: 'Danish' },
  { code: 'fr', name: 'French' },
  { code: 'nb-NO', name: 'Norwegian Bokmål' },
  { code: 'zh-tw', name: 'Traditional Chinese' },
  { code: 'it', name: 'Italian' },
  { code: 'ko', name: 'Korean' },
  { code: 'ja', name: 'Japanese' },
  { code: 'nl', name: 'Dutch' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'ru', name: 'Russian' },
  { code: 'tr', name: 'Turkish' },
  { code: 'pt-br', name: 'Brazilian Portuguese' },
  { code: 'fa', name: 'Persian' },
  { code: 'th', name: 'Thai' },
  { code: 'id', name: 'Indonesian' },
  { code: 'bg', name: 'Bulgarian' },
  { code: 'pl', name: 'Polish' },
  { code: 'fi', name: 'Finnish' },
  { code: 'sv', name: 'Swedish' },
  { code: 'sk', name: 'Slovak' },
  { code: 'cs', name: 'Czech' },
  { code: 'uk', name: 'Ukrainian' },
  { code: 'hu', name: 'Hungarian' },
  { code: 'ro', name: 'Romanian' },
  { code: 'ar', name: 'Arabic' },
  { code: 'hi', name: 'Hindi' },
  { code: 'no', name: 'Norwegian' },
  { code: 'zh-hk', name: 'Hong Kong Chinese' },
  { code: 'zh-mo', name: 'Macau Chinese' },
  { code: 'ms', name: 'Malay' },
  
  // 新增语言
  { code: 'pa', name: 'Pashto' },
  { code: 'el', name: 'Greek' },
  { code: 'ca', name: 'Catalan' },
  { code: 'tk', name: 'Turkmen' },
  { code: 'ta', name: 'Tamil' },
  { code: 'lv', name: 'Latvian' },
  { code: 'af', name: 'Afrikaans' },
  { code: 'et', name: 'Estonian' },
  { code: 'sl', name: 'Slovenian' },
  { code: 'he', name: 'Hebrew' },
  { code: 'lo', name: 'Lao' },
  { code: 'lt', name: 'Lithuanian' },
  { code: 'mn', name: 'Mongolian' },
  { code: 'kk', name: 'Kazakh' },
  { code: 'ku', name: 'Kurdish' },
  { code: 'ckb', name: 'Central Kurdish' },
  { code: 'ug-cn', name: 'Uyghur (China)' },
  { code: 'km', name: 'Khmer' },
  { code: 'sr', name: 'Serbian' },
  { code: 'eu', name: 'Basque' },
  { code: 'ky', name: 'Kyrgyz' },
  { code: 'hy-am', name: 'Armenian' },
  { code: 'hr', name: 'Croatian' },
  { code: 'eo', name: 'Esperanto' },
  { code: 'bn', name: 'Bengali' },
  { code: 'mg', name: 'Malagasy' },
  { code: 'sw', name: 'Swahili' },
  { code: 'uz-uz', name: 'Uzbek' },
  { code: 'ar-eg', name: 'Egyptian Arabic' },
  { code: 'my', name: 'Myanmar' },
  { code: 'te', name: 'Telugu' }
]

// 读取英文模板
const enTemplate = fs.readFileSync(
  path.join(__dirname, '../packages/locale/src/lang/en.ts'),
  'utf-8'
)

// 语言包目录
const langDir = path.join(__dirname, '../packages/locale/src/lang')

// 将语言代码转换为有效的变量名（驼峰命名）
function codeToVarName(code) {
  return code.split('-').map((part, index) => {
    if (index === 0) {
      return part.toLowerCase()
    }
    return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
  }).join('')
}

// 为每个语言创建基础文件（暂时使用英文作为占位符）
languages.forEach(({ code, name }) => {
  const fileName = `${code}.ts`
  const filePath = path.join(langDir, fileName)
  const varName = codeToVarName(code)
  
  // 如果文件已存在，跳过
  if (fs.existsSync(filePath)) {
    console.log(`Skipping ${fileName} (already exists)`)
    return
  }
  
  // 替换语言代码和名称
  let content = enTemplate
    .replace(/export const en: Language = {/, `export const ${varName}: Language = {`)
    .replace(/name: 'en'/, `name: '${code}'`)
    .replace(/export default en/, `export default ${varName}`)
  
  // 写入文件
  fs.writeFileSync(filePath, content, 'utf-8')
  console.log(`Created ${fileName} (var: ${varName})`)
})

console.log('Language files generation completed!')
console.log('Note: These files contain English placeholders and need to be translated.')

