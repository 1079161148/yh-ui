import { access, readdir, readFile } from 'node:fs/promises'
import { dirname, extname, resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const skillDir = resolve(root, 'skills/yh-ui')
const skillPath = resolve(skillDir, 'SKILL.md')

const requiredReferences = [
  'references/component-map.md',
  'references/source-truth.md',
  'references/agent-workflows.md',
  'references/vue-component-practices.md',
  'references/usage-patterns.md',
  'references/api-cheatsheet.md',
  'references/nuxt.md',
  'references/ai-components.md',
  'references/request.md',
  'references/flow.md',
  'references/recipes-table.md',
  'references/recipes-form-schema.md',
  'references/recipes-ai.md',
  'references/recipes-flow.md',
  'references/codegen-rubric.md',
  'references/eval-scenarios.md'
]

const requiredRootFiles = ['llms.txt', 'llms-full.txt']

const requiredSkillSections = [
  '## When To Use',
  '## Core Rules',
  '## Agent Workflow',
  '## Progressive References',
  '## Common Failure Guards'
]

const requiredVuePracticeTerms = [
  'defineProps',
  'defineEmits',
  'defineModel',
  'v-model',
  'slots',
  'accessibility',
  'SSR',
  'hydration',
  'shallowRef',
  'useNamespace'
]

const forbiddenPatterns = [
  /createYhTheme\s*\(/,
  /createRequestInstance\s*\(/,
  /from\s+['"]@yh-ui\/yh-ui\/locale\/zh-CN['"]/,
  /from\s+['"]@yh-ui\/yh-ui\/locale\/zh-cn['"]/,
  /YhAiSuggestion/,
  /YhAiChatWindow/
]

const requiredSourceTruthNames = [
  'YhAiBubbleList',
  'YhAiFileCard',
  'YhAiMention',
  'YhAiMermaid',
  'YhCarousel',
  'YhScrollbar',
  'YhImageMagnifier',
  'createYHFunctionTool',
  'createProviderAdapter',
  'createMCPServerHTTPHandler',
  'BpmnStartEvent',
  'AiLlmNode',
  'DataFlowEdge',
  'useYhId'
]

async function pathExists(path) {
  try {
    await access(path)
    return true
  } catch {
    return false
  }
}

async function collectMarkdownFiles(dir, acc = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const fullPath = resolve(dir, entry.name)
    if (entry.isDirectory()) {
      await collectMarkdownFiles(fullPath, acc)
      continue
    }
    if (entry.isFile() && extname(entry.name) === '.md') {
      acc.push(fullPath)
    }
  }
  return acc
}

async function collectFiles(dir, predicate, acc = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const fullPath = resolve(dir, entry.name)
    if (entry.isDirectory()) {
      await collectFiles(fullPath, predicate, acc)
      continue
    }
    if (entry.isFile() && predicate(fullPath)) {
      acc.push(fullPath)
    }
  }
  return acc
}

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/)
  if (!match) return null

  const fields = {}
  for (const line of match[1].split(/\r?\n/)) {
    const field = line.match(/^([A-Za-z0-9_-]+):\s*(.+)$/)
    if (field) {
      fields[field[1]] = field[2].trim()
    }
  }
  return fields
}

function localMarkdownLinks(content) {
  const links = []
  const pattern = /\[[^\]]+\]\(([^)]+)\)/g
  let match
  while ((match = pattern.exec(content))) {
    const href = match[1].trim()
    if (
      href &&
      !href.startsWith('http://') &&
      !href.startsWith('https://') &&
      !href.startsWith('#') &&
      !href.startsWith('mailto:')
    ) {
      links.push(href.split('#')[0])
    }
  }
  return links
}

const failures = []

const skillContent = await readFile(skillPath, 'utf8').catch(() => null)
if (!skillContent) {
  failures.push('Missing skills/yh-ui/SKILL.md')
} else {
  const frontmatter = parseFrontmatter(skillContent)
  if (!frontmatter) {
    failures.push('SKILL.md must start with YAML frontmatter')
  } else {
    if (frontmatter.name !== 'yh-ui') failures.push('SKILL.md frontmatter name must be yh-ui')
    if (!frontmatter.description || frontmatter.description.length < 80) {
      failures.push('SKILL.md frontmatter description must be specific enough to trigger the skill')
    }
  }

  for (const section of requiredSkillSections) {
    if (!skillContent.includes(section)) {
      failures.push(`SKILL.md is missing best-practice section: ${section}`)
    }
  }
}

for (const rel of requiredReferences) {
  if (!(await pathExists(resolve(skillDir, rel)))) {
    failures.push(`Missing required reference: ${rel}`)
  }
}

for (const rel of requiredRootFiles) {
  if (!(await pathExists(resolve(root, rel)))) {
    failures.push(`Missing AI retrieval entry file: ${rel}`)
  }
}

const markdownFiles = await collectMarkdownFiles(skillDir).catch(() => [])
const sourceTruthContent = await readFile(
  resolve(skillDir, 'references/source-truth.md'),
  'utf8'
).catch(() => '')

const componentIndexFiles = await collectFiles(resolve(root, 'packages/components/src'), (file) =>
  file.endsWith('index.ts')
)
const exportedComponents = new Set()

for (const file of componentIndexFiles) {
  const content = await readFile(file, 'utf8')
  for (const match of content.matchAll(/export\s+const\s+(Yh[A-Za-z0-9_]+)/g)) {
    exportedComponents.add(match[1])
  }
}

for (const componentName of [...exportedComponents].sort()) {
  if (!sourceTruthContent.includes(componentName)) {
    failures.push(`source-truth.md is missing exported component: ${componentName}`)
  }
}

for (const name of requiredSourceTruthNames) {
  if (!sourceTruthContent.includes(name)) {
    failures.push(`source-truth.md is missing source-aligned export or nuance: ${name}`)
  }
}

const vuePracticesContent = await readFile(
  resolve(skillDir, 'references/vue-component-practices.md'),
  'utf8'
).catch(() => '')
const normalizedVuePracticesContent = vuePracticesContent.toLowerCase()

for (const term of requiredVuePracticeTerms) {
  if (!normalizedVuePracticesContent.includes(term.toLowerCase())) {
    failures.push(`vue-component-practices.md is missing Vue practice term: ${term}`)
  }
}

for (const file of markdownFiles) {
  const content = await readFile(file, 'utf8')
  const isNegativeEval = file.endsWith('eval-scenarios.md') || file.includes(`${skillDir}\\evals\\`)

  for (const pattern of forbiddenPatterns) {
    if (!isNegativeEval && pattern.test(content)) {
      failures.push(`Forbidden stale API mention in ${file}: ${pattern}`)
    }
  }

  for (const href of localMarkdownLinks(content)) {
    const target = resolve(dirname(file), href)
    if (!(await pathExists(target))) {
      failures.push(`Broken local link in ${file}: ${href}`)
    }
  }
}

if (failures.length) {
  throw new Error(`YH-UI skill verification failed:\n- ${failures.join('\n- ')}`)
}

console.log(`[yh-ui-skill] passed ${markdownFiles.length} markdown files.`)
