import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import { basename, dirname, relative, resolve } from 'node:path'
import ts from 'typescript'

const root = resolve(import.meta.dirname, '..')
const skillDir = resolve(root, 'skills/yh-ui')
const referencesDir = resolve(skillDir, 'references')
const componentsDir = resolve(root, 'packages/components/src')
const flowDir = resolve(root, 'packages/flow/src')

const priorityComponents = new Set([
  'YhTable',
  'YhFormSchema',
  'YhAiChat',
  'YhAiBubble',
  'YhAiBubbleList',
  'YhAiSender',
  'YhAiSources',
  'YhAiAttachments',
  'YhAiFileCard',
  'YhAiThoughtChain',
  'YhAiCodeBlock',
  'YhAiCodeEditor',
  'YhAiCodeRunner',
  'YhAiMermaid'
])

const componentGroups = [
  {
    title: 'Base and form components',
    names: [
      'YhButton',
      'YhInput',
      'YhInputNumber',
      'YhInputTag',
      'YhAutocomplete',
      'YhCheckbox',
      'YhCheckboxGroup',
      'YhRadio',
      'YhRadioGroup',
      'YhRadioButton',
      'YhSwitch',
      'YhRate',
      'YhSelect',
      'YhOption',
      'YhCascader',
      'YhCascaderPanel',
      'YhSlider',
      'YhTimeSelect',
      'YhTimePicker',
      'YhDatePicker',
      'YhTransfer',
      'YhTransferPanel',
      'YhTreeSelect',
      'YhColorPicker',
      'YhUpload',
      'YhForm',
      'YhFormItem',
      'YhFormSchema',
      'YhMention'
    ]
  },
  {
    title: 'Layout, navigation, and typography',
    names: [
      'YhRow',
      'YhCol',
      'YhDivider',
      'YhSpace',
      'YhContainer',
      'YhHeader',
      'YhAside',
      'YhMain',
      'YhFooter',
      'YhGrid',
      'YhGridItem',
      'YhConfigProvider',
      'YhBreadcrumb',
      'YhBreadcrumbItem',
      'YhTabs',
      'YhTabPane',
      'YhSteps',
      'YhStep',
      'YhMenu',
      'YhMenuItem',
      'YhMenuItemGroup',
      'YhSubMenu',
      'YhDropdown',
      'YhDropdownItem',
      'YhDropdownMenu',
      'YhAffix',
      'YhBackTop',
      'YhInfiniteScroll',
      'YhTypographyTitle',
      'YhTypographyText',
      'YhTypographyParagraph',
      'YhTypographyLink'
    ]
  },
  {
    title: 'Data display and feedback',
    names: [
      'YhTag',
      'YhIcon',
      'YhBadge',
      'YhCard',
      'YhAvatar',
      'YhEmpty',
      'YhSkeleton',
      'YhSkeletonItem',
      'YhProgress',
      'YhAlert',
      'YhSpin',
      'YhLoading',
      'YhMessage',
      'YhNotification',
      'YhMessageBox',
      'YhTooltip',
      'YhPopconfirm',
      'YhPopover',
      'YhDialog',
      'YhDialogMethod',
      'YhDrawer',
      'YhWatermark',
      'YhMarquee',
      'YhPagination',
      'YhImage',
      'YhImageViewer',
      'YhDescriptions',
      'YhDescriptionsItem',
      'YhCalendar',
      'YhWaterfall',
      'YhTree',
      'YhTreeNode',
      'YhCountdown',
      'YhTable',
      'YhTableColumn',
      'YhCarousel',
      'YhCarouselItem',
      'YhScrollbar',
      'YhResult'
    ]
  },
  {
    title: 'Business components',
    names: [
      'YhGanttChart',
      'YhSkuSelector',
      'YhPrice',
      'YhProductCard',
      'YhImageMagnifier',
      'YhCouponCard',
      'YhLuckyDraw',
      'YhFilterBar',
      'YhSubmitBar',
      'YhCategoryNav',
      'YhSmartAddress'
    ]
  },
  {
    title: 'AI components',
    names: [
      'YhAiChat',
      'YhAiBubble',
      'YhAiSender',
      'YhAiThoughtChain',
      'YhAiCodeBlock',
      'YhAiCodeEditor',
      'YhAiCodeRunner',
      'YhAiThinking',
      'YhAiWelcome',
      'YhAiActionGroup',
      'YhAiEditorSender',
      'YhAiArtifacts',
      'YhAiVoiceTrigger',
      'YhAiConversations',
      'YhAiPrompts',
      'YhAiAgentCard',
      'YhAiSources',
      'YhAiProvider',
      'YhAiMention',
      'YhAiBubbleList',
      'YhAiFileCard',
      'YhAiAttachments',
      'YhAiMermaid'
    ]
  }
]

async function collectFiles(dir, predicate, acc = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const fullPath = resolve(dir, entry.name)
    if (entry.isDirectory()) {
      await collectFiles(fullPath, predicate, acc)
      continue
    }
    if (entry.isFile() && predicate(fullPath)) acc.push(fullPath)
  }
  return acc
}

function componentSourceStem(componentName) {
  return componentName
    .replace(/^Yh/, '')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase()
}

function vueBlockContent(source, blockName) {
  return [...source.matchAll(new RegExp(`<${blockName}[^>]*>([\\s\\S]*?)<\\/${blockName}>`, 'gi'))]
    .map((match) => match[1])
    .join('\n')
}

function scriptContent(source, file) {
  if (!file.endsWith('.vue')) return source
  return vueBlockContent(source, 'script')
}

function extractTemplateSlots(source) {
  const template = vueBlockContent(source, 'template')
  const slots = new Set()
  if (/<slot(?:\s|>)/.test(template)) slots.add('default')
  for (const match of template.matchAll(/<slot\s+name=["']([^"']+)["']/g)) {
    slots.add(match[1])
  }
  return [...slots]
}

function createSourceFile(source, file) {
  return ts.createSourceFile(
    file,
    scriptContent(source, file),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX
  )
}

function nodeNameText(name) {
  if (!name) return ''
  if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name))
    return name.text
  if (ts.isPrivateIdentifier?.(name)) return name.text
  return ''
}

function unwrapExpression(expression) {
  let current = expression
  while (
    ts.isAsExpression(current) ||
    ts.isSatisfiesExpression?.(current) ||
    ts.isTypeAssertionExpression(current) ||
    ts.isParenthesizedExpression(current)
  ) {
    current = current.expression
  }
  return current
}

function objectLiteralKeys(expression) {
  const node = unwrapExpression(expression)
  if (!ts.isObjectLiteralExpression(node)) return []

  const keys = []
  for (const property of node.properties) {
    if (
      ts.isPropertyAssignment(property) ||
      ts.isMethodDeclaration(property) ||
      ts.isShorthandPropertyAssignment(property)
    ) {
      const name = nodeNameText(property.name)
      if (name) keys.push(name)
    }
  }
  return keys
}

function variableInitializers(sourceFile) {
  const vars = new Map()
  const visit = (node) => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer) {
      vars.set(node.name.text, node.initializer)
    }
    ts.forEachChild(node, visit)
  }
  visit(sourceFile)
  return vars
}

function exportedConstInitializers(sourceFile, namePattern) {
  const initializers = []
  for (const statement of sourceFile.statements) {
    if (!ts.isVariableStatement(statement)) continue
    const isExported = statement.modifiers?.some(
      (modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword
    )
    if (!isExported) continue
    for (const declaration of statement.declarationList.declarations) {
      if (
        ts.isIdentifier(declaration.name) &&
        namePattern.test(declaration.name.text) &&
        declaration.initializer
      ) {
        initializers.push(declaration.initializer)
      }
    }
  }
  return initializers
}

function interfaceMemberKeys(sourceFile, namePattern) {
  const keys = []
  const visit = (node) => {
    if (ts.isInterfaceDeclaration(node) && namePattern.test(node.name.text)) {
      for (const member of node.members) {
        if ((ts.isPropertySignature(member) || ts.isMethodSignature(member)) && member.name) {
          const name = nodeNameText(member.name)
          if (name) keys.push(name)
        }
      }
    }
    ts.forEachChild(node, visit)
  }
  visit(sourceFile)
  return keys
}

function typeLiteralEventKeys(typeNode) {
  if (!typeNode || !ts.isTypeLiteralNode(typeNode)) return []
  const keys = []
  for (const member of typeNode.members) {
    if (ts.isCallSignatureDeclaration(member)) {
      const eventParam = member.parameters[0]
      const eventType = eventParam?.type
      if (eventType && ts.isLiteralTypeNode(eventType) && ts.isStringLiteral(eventType.literal)) {
        keys.push(eventType.literal.text)
      }
    } else if ((ts.isPropertySignature(member) || ts.isMethodSignature(member)) && member.name) {
      const name = nodeNameText(member.name)
      if (name) keys.push(name)
    }
  }
  return keys
}

function defineEmitsKeys(sourceFile) {
  const keys = []
  const visit = (node) => {
    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.expression.text === 'defineEmits'
    ) {
      const typeArg = node.typeArguments?.[0]
      keys.push(...typeLiteralEventKeys(typeArg))
      const firstArg = node.arguments[0]
      if (firstArg) keys.push(...objectLiteralKeys(firstArg))
    }
    ts.forEachChild(node, visit)
  }
  visit(sourceFile)
  return keys
}

function defineExposeKeys(sourceFile) {
  const keys = []
  const vars = variableInitializers(sourceFile)
  const visit = (node) => {
    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.expression.text === 'defineExpose'
    ) {
      const firstArg = node.arguments[0]
      if (firstArg) {
        if (ts.isIdentifier(firstArg) && vars.has(firstArg.text)) {
          keys.push(...objectLiteralKeys(vars.get(firstArg.text)))
        } else {
          keys.push(...objectLiteralKeys(firstArg))
        }
      }
    }
    ts.forEachChild(node, visit)
  }
  visit(sourceFile)
  return keys
}

function sourceApi(source, file) {
  const sourceFile = createSourceFile(source, file)
  return {
    props: exportedConstInitializers(sourceFile, /Props$/).flatMap(objectLiteralKeys),
    emits: [
      ...exportedConstInitializers(sourceFile, /Emits$/).flatMap(objectLiteralKeys),
      ...defineEmitsKeys(sourceFile)
    ],
    slots: [...interfaceMemberKeys(sourceFile, /Slots$/), ...extractTemplateSlots(source)],
    exposes: [
      ...interfaceMemberKeys(sourceFile, /(Expose|Instance)$/),
      ...defineExposeKeys(sourceFile)
    ]
  }
}

async function componentExports() {
  const indexFiles = await collectFiles(componentsDir, (file) => file.endsWith('index.ts'))
  const exports = []
  for (const file of indexFiles) {
    const content = await readFile(file, 'utf8')
    for (const match of content.matchAll(/export\s+const\s+(Yh[A-Za-z0-9_]+)/g)) {
      exports.push({
        name: match[1],
        dir: basename(dirname(file)),
        file
      })
    }
  }
  return exports.sort((a, b) => a.name.localeCompare(b.name))
}

async function componentApi(component) {
  const componentDir = resolve(componentsDir, component.dir, 'src')
  const stem = componentSourceStem(component.name)
  const allFiles = await collectFiles(
    componentDir,
    (file) => file.endsWith('.ts') || file.endsWith('.vue')
  ).catch(() => [])
  const primaryFiles = allFiles.filter((file) => basename(file) === `${stem}.ts`)
  const primaryVueFiles = allFiles.filter((file) => basename(file) === `${stem}.vue`)
  const fallbackFiles = allFiles.filter((file) => basename(file) === `${component.dir}.ts`)
  const candidateFiles = primaryFiles.length
    ? [...primaryFiles, ...primaryVueFiles]
    : [...fallbackFiles, ...primaryVueFiles]
  const sourceFiles = candidateFiles.length ? candidateFiles : allFiles
  const api = { props: [], emits: [], slots: [], exposes: [] }

  for (const file of sourceFiles) {
    const source = await readFile(file, 'utf8')
    const extracted = sourceApi(source, file)
    api.props.push(...extracted.props)
    api.emits.push(...extracted.emits)
    api.slots.push(...extracted.slots)
    api.exposes.push(...extracted.exposes)
  }

  return {
    ...component,
    props: [...new Set(api.props)].sort(),
    emits: [...new Set(api.emits)].sort(),
    slots: [...new Set(api.slots)].sort(),
    exposes: [...new Set(api.exposes)].sort()
  }
}

async function flowApi() {
  const source = await readFile(resolve(flowDir, 'flow.ts'), 'utf8')
  const extracted = sourceApi(source, resolve(flowDir, 'flow.ts'))
  return {
    props: extracted.props,
    emits: extracted.emits,
    slots: ['node', 'edge']
  }
}

function inlineList(items) {
  return items.length ? items.map((item) => `\`${item}\``).join(', ') : 'None detected'
}

function apiLine(api) {
  return [
    `Props: ${inlineList(api.props.slice(0, 32))}`,
    `Emits: ${inlineList(api.emits.slice(0, 24))}`,
    `Slots: ${inlineList(api.slots.slice(0, 16))}`,
    `Expose: ${inlineList(api.exposes.slice(0, 24))}`
  ].join('\n')
}

function sourceTruthContent(components, apiByName, flow) {
  const exported = new Set(components.map((item) => item.name))
  const missingGroups = components
    .filter((item) => !componentGroups.some((group) => group.names.includes(item.name)))
    .map((item) => item.name)

  return `# Source Truth

This file is generated by \`pnpm generate:yh-ui-skill\`. Edit \`scripts/generate-yh-ui-skill.mjs\` for durable source-truth changes.

This file is the compact source-aligned reference for AI agents. Prefer these names and package boundaries over guesses. It mirrors the public exports found in the current repository source.

## Package Boundaries

| Package | Source-aligned purpose |
| --- | --- |
| \`@yh-ui/yh-ui\` | All-in-one Vue plugin; re-exports components, hooks, utils, theme, and locale |
| \`@yh-ui/components\` | Vue components, business widgets, AI UI components, global methods |
| \`@yh-ui/hooks\` | Composition API utilities used by components and applications |
| \`@yh-ui/theme\` | Theme plugin, theme manager, tokens, CSS variables, dark mode and density |
| \`@yh-ui/locale\` | Locale files and \`Language\` type |
| \`@yh-ui/icons\` | Iconify runtime, icon helpers, preset collections, generated icon components |
| \`@yh-ui/request\` | Fetch-based request client, Vue hooks, SSE, AI stream, pagination, queues, GraphQL, WebSocket, HTTP cache |
| \`@yh-ui/flow\` | Flow canvas, built-in nodes/edges, BPMN nodes, AI workflow nodes, editor helpers |
| \`@yh-ui/ai-sdk\` | Vercel AI SDK re-exports, Vue AI hooks, provider adapters, tools, agents, RAG, MCP, observability |
| \`@yh-ui/nuxt\` | Nuxt module for component registration, composable imports, CSS injection, build transpile |

## \`@yh-ui/components\` Exports

${componentGroups
  .map((group) => {
    const names = group.names.filter((name) => exported.has(name))
    return `### ${group.title}\n\n${inlineList(names)}`
  })
  .join('\n\n')}

${missingGroups.length ? `### Ungrouped source exports\n\n${inlineList(missingGroups)}\n\n` : ''}Global methods from component install:

\`YhMessage\`, \`YhNotification\`, \`YhDialogMethod\`, \`YhMessageBox\`, and aliases on \`app.config.globalProperties\` such as \`$message\`, \`$notify\`, \`$dialog\`, \`$msgbox\`, \`$alert\`, \`$confirm\`, \`$prompt\`.

## Priority Component API Surface

${[...priorityComponents]
  .filter((name) => apiByName.has(name))
  .sort()
  .map((name) => `### ${name}\n\n${apiLine(apiByName.get(name))}`)
  .join('\n\n')}

## \`@yh-ui/hooks\` Exports

Use hooks from these source modules:

\`useNamespace\`, \`useZIndex\`, \`useSKU\`, \`useCountdown\`, \`useLocale\`, \`useId\`, \`useFormItem\`, \`useVirtualScroll\`, \`useCache\`, \`useEventListener\`, \`useScrollLock\`, \`useClickOutside\`, \`useConfig\`, AI hooks from \`use-ai\`, and reactive storage helpers from \`storage\`.

## \`@yh-ui/flow\` Exports

Canvas and helpers:

\`Flow\`, \`Minimap\`, \`Controls\`, \`FlowBackground\`, \`NodeEditPanel\`, \`EdgeEditPanel\`, \`AiNodeEditPanel\`.

Nodes:

\`BaseNode\`, \`InputNode\`, \`OutputNode\`, \`GroupNode\`, \`CustomNode\`, \`NodeResizer\`, \`NodeToolbar\`, \`DiamondNode\`, \`DatabaseNode\`.

BPMN nodes:

\`BpmnStartEvent\`, \`BpmnEndEvent\`, \`BpmnTask\`, \`BpmnServiceTask\`, \`BpmnUserTask\`, \`BpmnExclusiveGateway\`, \`BpmnParallelGateway\`, \`BpmnInclusiveGateway\`, \`BPMN_NODE_TYPES\`, \`registerBpmnNodes\`.

AI workflow nodes:

\`AiLlmNode\`, \`AiPromptNode\`, \`AiAgentNode\`, \`AiToolNode\`, \`AiConditionNode\`, \`AiStartNode\`, \`AiEndNode\`, \`AiMemoryNode\`, \`AI_WORKFLOW_NODE_TYPES\`, \`registerAiWorkflowNodes\`.

Edges:

\`BaseEdge\`, \`SmoothEdge\`, \`StepEdge\`, \`BezierEdge\`, \`DataFlowEdge\`.

Flow API:

Props: ${inlineList(flow.props.slice(0, 30))}

Emits: ${inlineList(flow.emits)}

Slots: ${inlineList(flow.slots)}

## \`@yh-ui/ai-sdk\` Capability Map

Use these real capabilities:

- Vercel AI SDK re-exports such as \`generateText\`, \`streamText\`, \`generateObject\`, \`streamObject\`, \`embed\`, \`tool\`, \`jsonSchema\`, \`zodSchema\`.
- Vue AI helpers: \`useAIChat\`, \`useAIStream\`, \`useConversation\`, \`useConversations\`, \`createStreamableValue\`, \`createYHFunctionTool\`, \`createProviderAdapter\`, \`getProviderPreset\`, \`PROVIDER_PRESETS\`, \`XRequest\`, \`createXRequest\`.
- Agents and workflows: \`useReActAgent\`, \`createPlanExecuteAgent\`, \`createEnhancedAgent\`, \`createReflexionAgent\`, \`createReWOOAgent\`, \`createChain\`, \`createParallelChain\`.
- RAG and vector helpers: \`createRAGSystem\`, \`createProductionRAG\`, \`createInMemoryVectorStore\`, loaders and chunking helpers.
- MCP: \`useMCPClient\`, \`useMCPTools\`, \`MCPServer\`, \`useMCPServer\`, \`createMCPServerHTTPHandler\`.
- Observability and safety: \`createTracer\`, \`createObservabilityManager\`, \`createSafetyFilter\`, rate limit and cache adapters.

## Nuxt Auto-Imports

The Nuxt module registers component names using the configured prefix, default \`Yh\`. It also auto-imports common hooks and globals from \`@yh-ui/hooks\` and \`@yh-ui/components\`.

Important nuance: native \`useId\` is not overridden. YH-UI's hook is imported as \`useYhId\`.

## Known Non-Goals

- Do not claim complete API coverage inside this skill. It is a compact agent guide.
- Do not include provider secrets in frontend examples.
- Do not use legacy or guessed APIs when a source export is listed here.
`
}

function cheatsheetContent(apiByName, flow) {
  const entries = [...priorityComponents].filter((name) => apiByName.has(name)).sort()
  return `# API Cheatsheet

This file is generated by \`pnpm generate:yh-ui-skill\` using the TypeScript AST for script APIs and template scanning for slots. It lists common and source-extracted APIs that coding agents usually need. Check source docs for complete behavioral details.

## Install Entries

\`\`\`ts
import YhUI from '@yh-ui/yh-ui'
import '@yh-ui/yh-ui/css'

import { YhButton, YhTable } from '@yh-ui/components'
import '@yh-ui/components/style.css'
\`\`\`

## Common Components

| Component | Common usage |
| --- | --- |
| \`YhButton\` | \`type\`, \`size\`, \`loading\`, click events |
| \`YhInput\` | \`v-model\`, \`clearable\`, \`placeholder\`, password/text input |
| \`YhForm\` | Form container; use with \`YhFormItem\` |
| \`YhFormItem\` | \`label\`, validation and field layout |
| \`YhTable\` | \`data\`, \`columns\`, selection, pagination, toolbar, export, print, virtual scrolling |
| \`YhDialog\` | \`v-model\`, \`title\`, default/footer content |
| \`YhDrawer\` | \`v-model\`, \`title\`, detail side panels |
| \`YhMessage\` | Global feedback: success/error/info/warning style calls |
| \`YhConfigProvider\` | Locale and configuration boundary |
| \`YhScrollbar\` | Custom scroll containers |
| \`YhCarousel\` | Image or content carousel; use with \`YhCarouselItem\` |
| \`YhImageMagnifier\` | Product/image inspection |

## Source-Extracted Priority APIs

${entries.map((name) => `### ${name}\n\n${apiLine(apiByName.get(name))}`).join('\n\n')}

### Flow

Props: ${inlineList(flow.props.slice(0, 30))}

Emits: ${inlineList(flow.emits)}

Slots: ${inlineList(flow.slots)}

## Table Columns

Use column objects with at least \`prop\` and \`label\` unless the existing app uses another local pattern.

\`\`\`ts
const columns = [
  { prop: 'name', label: 'Name' },
  { prop: 'status', label: 'Status' }
]
\`\`\`

## Theme

Use the real theme plugin and hooks:

\`\`\`ts
import { ThemePlugin, useTheme } from '@yh-ui/theme'

app.use(ThemePlugin, {
  preset: 'blue',
  followSystem: true,
  persist: true
})
\`\`\`

Common theme helpers include \`useTheme\`, \`setThemePreset\`, \`toggleDarkMode\`, \`checkContrast\`, and \`getTextColorForBackground\`.

## Locale

Use lowercase language package paths:

\`\`\`ts
import zhCn from '@yh-ui/locale/lang/zh-cn'
import en from '@yh-ui/locale/lang/en'
\`\`\`

## Hooks

| Hook | Use case |
| --- | --- |
| \`useNamespace\` | BEM-style class names |
| \`useZIndex\` | Overlay z-index allocation |
| \`useLocale\` | Component locale text |
| \`useVirtualScroll\` | Large lists |
| \`useCountdown\` | Countdown state |
| \`useSKU\` | SKU combinations |
| \`useAiChat\` | AI chat state from hooks package |

## AI SDK

Use \`@yh-ui/ai-sdk/vue\` when the example is Vue-specific:

\`\`\`ts
import { createProviderAdapter, getProviderPreset, useAIChat } from '@yh-ui/ai-sdk/vue'
\`\`\`

Use \`@yh-ui/ai-sdk\` for general AI SDK, Vercel AI SDK re-exports, agents, RAG, MCP, loaders, observability, and server utilities.

## Do Not Use

- \`createYhTheme\`
- \`createRequestInstance\`
- \`@yh-ui/yh-ui/locale/zh-CN\`
- Invented component names that are not exported by the package
`
}

const components = await componentExports()
const api = await Promise.all(components.map((component) => componentApi(component)))
const apiByName = new Map(api.map((item) => [item.name, item]))
const flow = await flowApi()

await mkdir(referencesDir, { recursive: true })
await writeFile(
  resolve(referencesDir, 'source-truth.md'),
  sourceTruthContent(components, apiByName, flow),
  'utf8'
)
await writeFile(
  resolve(referencesDir, 'api-cheatsheet.md'),
  cheatsheetContent(apiByName, flow),
  'utf8'
)

console.log(
  `[yh-ui-skill] generated ${relative(root, resolve(referencesDir, 'source-truth.md'))} and ${relative(root, resolve(referencesDir, 'api-cheatsheet.md'))}`
)
