# Future Features

The following features are experimental or planned and may be refined in subsequent versions.
They are documented so adopters can see the direction of the AI package without
mistaking the roadmap for a locked contract. Stable releases should continue to
prioritize predictable streaming, clear type surfaces, SSR safety, and small default
runtime cost.

Before enabling an experimental capability in a production app, verify three things:
the API has a fallback path, failures are observable, and optional dependencies do not
leak into the base component bundle. This keeps YH-UI useful for ordinary business apps
while still leaving room for advanced AI workflows.

## Multimodal Support

Support for image, audio, and video input/output.
The intended shape is provider-neutral content blocks, so applications can switch
between model vendors without rewriting UI state. Binary assets should remain in your
storage layer; SDK messages should carry URLs, references, metadata, or short inline
payloads only when that is safe for the transport.

```typescript
import { createImageContent, createAudioContent, createMultiModalMessage } from '@yh-ui/ai-sdk'

// Image input
const imageContent = createImageContent({
  url: 'https://example.com/image.jpg',
  detail: 'high' // 'low' | 'high' | 'auto'
})

// Multimodal message
const message = createMultiModalMessage({
  role: 'user',
  content: [imageContent, { type: 'text', text: 'Describe this image' }]
})
```

## Chain of Thought (CoT)

Reasoning helpers should expose structured progress without forcing applications to
display private chain-of-thought text. Prefer step summaries, confidence signals, and
trace identifiers. This makes the feature useful for debugging and review while keeping
end-user UI aligned with current safety expectations.

```typescript
import { createChainOfThought } from '@yh-ui/ai-sdk'

const cot = createChainOfThought({
  mode: 'chain', // standard | chain | tree | tabular
  maxDepth: 5,
  showConfidence: true
})

const result = await cot.run('Analyze the solution to this problem', llmCall)
console.log(result.steps) // Reasoning steps
console.log(result.answer) // Final answer
```

## Cost Control

Cost tracking belongs close to the model invocation boundary. The SDK roadmap keeps it
as a composable primitive so teams can combine monthly budgets, per-request token caps,
and product-tier limits. Production integrations should persist usage events outside
the browser and reconcile them with provider invoices.

```typescript
import { createCostTracker } from '@yh-ui/ai-sdk'

const costTracker = createCostTracker({
  monthlyBudget: 100, // $100/month
  maxTokensPerRequest: 4000, // Single request limit
  warningThreshold: 0.8, // Warning at 80%
  onBudgetExceeded: (budget) => {
    console.warn('Budget almost exhausted:', budget)
  }
})

// Record usage
costTracker.recordUsage({
  prompt: 100,
  completion: 200,
  model: 'gpt-4'
})

// Get tracking status
const tracking = costTracker.getTracking()
console.log(`Used this month: $${tracking.totalCost}`)
console.log(`Remaining budget: $${tracking.remaining}`)
```

## Safety Guardrails

Safety filters are not a replacement for provider-side moderation or product policy,
but they are useful as a local defense layer. A good deployment combines input checks,
tool permission checks, output checks, and human-readable audit logs. Rules should be
versioned together with prompts so behavior can be reviewed after incidents.

```typescript
import { createSafetyFilter } from '@yh-ui/ai-sdk'

const filter = createSafetyFilter({
  rules: [
    // Content filter: Block personal information
    {
      id: 'no-personal-info',
      name: 'No Personal Information',
      type: 'content_filter',
      pattern: /\b\d{3}-\d{4}-\d{4}\b/, // Phone number
      action: 'block'
    },
    // Output filter: Custom check
    {
      id: 'custom-check',
      name: 'Custom Check',
      type: 'output_filter',
      customCheck: (content) => !content.includes('sensitive word'),
      action: 'warn'
    }
  ]
})

// Check input
const inputResult = await filter.check('User input content')
if (!inputResult.passed) {
  console.log('Violation:', inputResult.violations)
}

// Check output
const outputResult = await filter.check(modelOutput)
```

## Document Loaders

Document loading is intentionally treated as an optional capability. PDF, DOCX, HTML,
and image extraction can be heavy, so loaders should live behind explicit imports and
server-side workflows when possible. Browser demos should use small fixtures and clear
limits to avoid surprising memory usage.

```typescript
import { createDocumentLoader } from '@yh-ui/ai-sdk'

// Support multiple formats
const loader = createDocumentLoader({
  type: 'pdf', // pdf | markdown | txt | docx | html
  extractImages: true,
  maxPages: 100
})

const docs = await loader.load('https://example.com/document.pdf')
```

::: tip
These features are under active development and APIs may change. Use with caution in production environments.
:::
