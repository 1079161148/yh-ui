import { readdir, readFile, writeFile } from 'node:fs/promises'
import { resolve, relative, join, dirname } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const docsDir = resolve(root, 'docs')
const reportPath = resolve(root, 'test-results', 'docs-i18n-report.json')

const ignoredDirs = new Set(['.vitepress', 'en', 'node_modules', 'public', 'playground'])
const ignoredFiles = new Set(['I18N_GUIDE.md'])
const minEnglishChars = 400

async function collectMarkdownFiles(dir, acc = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!ignoredDirs.has(entry.name)) {
        await collectMarkdownFiles(resolve(dir, entry.name), acc)
      }
      continue
    }

    if (entry.isFile() && entry.name.endsWith('.md') && !ignoredFiles.has(entry.name)) {
      acc.push(resolve(dir, entry.name))
    }
  }

  return acc
}

async function readText(path) {
  try {
    return await readFile(path, 'utf8')
  } catch {
    return null
  }
}

function hasMeaningfulEnglish(content) {
  if (!content) return false
  const text = content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/[#|`>*_~\-[\](){}:;,.!?/\\]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  const latinChars = (text.match(/[A-Za-z]/g) || []).length
  return text.length >= minEnglishChars && latinChars / Math.max(text.length, 1) > 0.35
}

const sourceFiles = await collectMarkdownFiles(docsDir)
const missing = []
const tooShort = []

for (const sourceFile of sourceFiles) {
  const rel = relative(docsDir, sourceFile).replace(/\\/g, '/')
  const target = resolve(docsDir, 'en', rel)
  const content = await readText(target)

  if (content === null) {
    missing.push(rel)
    continue
  }

  if (!hasMeaningfulEnglish(content)) {
    tooShort.push(rel)
  }
}

await writeFile(
  reportPath,
  `${JSON.stringify(
    {
      checked: sourceFiles.length,
      missing,
      tooShort,
      minEnglishChars
    },
    null,
    2
  )}\n`,
  'utf8'
).catch(async (error) => {
  if (error.code !== 'ENOENT') throw error
  await import('node:fs/promises').then(({ mkdir }) =>
    mkdir(dirname(reportPath), { recursive: true })
  )
  await writeFile(
    reportPath,
    `${JSON.stringify({ checked: sourceFiles.length, missing, tooShort, minEnglishChars }, null, 2)}\n`,
    'utf8'
  )
})

const failures = []
if (missing.length) failures.push(`Missing English docs:\n- ${missing.join('\n- ')}`)
if (tooShort.length) failures.push(`English docs need fuller content:\n- ${tooShort.join('\n- ')}`)

if (failures.length) {
  throw new Error(`${failures.join('\n\n')}\nReport: ${reportPath}`)
}

console.log(`[docs-i18n] passed ${sourceFiles.length} source pages. Report: ${reportPath}`)
