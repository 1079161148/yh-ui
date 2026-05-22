<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import {
  useAiChat,
  useAiConversations,
  type AiChatMessage as RuntimeChatMessage,
  type AiConversation
} from '@yh-ui/hooks'
import { dependencyModeMeta } from '../config/dependency-mode'
import {
  type StarterChatMessage,
  workspaceArtifact,
  workspaceConversations,
  workspaceMessages,
  workspacePrompts,
  workspaceSources
} from '../data/mock'

function cloneMessages(messages: StarterChatMessage[] = []) {
  return messages.map((message) => ({
    ...message,
    createAt: message.createAt ?? Date.now()
  }))
}

const conversationStore = ref<Record<string, StarterChatMessage[]>>(
  Object.fromEntries(
    Object.entries(workspaceMessages).map(([key, value]) => [key, cloneMessages(value)])
  )
)

const {
  conversations,
  createConversation,
  removeConversation,
  updateConversation,
  pinConversation
} = useAiConversations({
  initialConversations: workspaceConversations,
  storage: false
})

const activeConversationId = ref(workspaceConversations[0].id)
const artifactVisible = ref(false)

const { messages, isGenerating, sendMessage, stop, clear } = useAiChat({
  initialMessages: cloneMessages(
    conversationStore.value[activeConversationId.value]
  ) as RuntimeChatMessage[],
  systemPrompt: 'You are the operations copilot inside the YH-UI AI starter.',
  request: async function* (
    prompt: string,
    history: RuntimeChatMessage[],
    abortSignal: AbortSignal
  ) {
    const summary = [
      `Working on: ${prompt}.`,
      `I checked ${history.length} earlier message(s) in the active lane.`,
      'I would package the response as: release summary, open blockers, and next operator action.',
      dependencyModeMeta.workspaceFeedbackLine
    ].join('\n\n')

    for (const chunk of summary.split(' ')) {
      if (abortSignal.aborted) {
        throw new DOMException('Aborted', 'AbortError')
      }
      await new Promise((resolve) => setTimeout(resolve, 45))
      yield `${chunk} `
    }
  }
})

const activeConversation = computed(() =>
  conversations.value.find((item) => item.id === activeConversationId.value)
)

const reasoningItems = computed(() => [
  {
    title: 'Read route context',
    status: 'success',
    content: 'Determine whether the user is working in release, design partner, or workflow mode.',
    progress: 100
  },
  {
    title: 'Load shared knowledge',
    status: isGenerating.value ? 'thinking' : 'complete',
    content: 'Pull roadmap, support policy, and validation notes into the answer surface.',
    progress: isGenerating.value ? 68 : 100
  },
  {
    title: 'Assemble operator answer',
    status: isGenerating.value ? 'loading' : 'success',
    content: 'Produce short action items, not just a paragraph of explanation.',
    progress: isGenerating.value ? 42 : 100
  }
])

watch(activeConversationId, (id) => {
  stop()
  messages.value = cloneMessages(conversationStore.value[id] ?? []) as RuntimeChatMessage[]
})

watch(
  messages,
  (value) => {
    conversationStore.value[activeConversationId.value] = cloneMessages(value)
    const lastMessage = [...value]
      .reverse()
      .find((message) => message.role !== 'system' && message.content.trim().length > 0)

    void updateConversation(activeConversationId.value, {
      excerpt: lastMessage?.content.slice(0, 72) ?? 'No messages yet'
    })
  },
  { deep: true }
)

async function handleCreateConversation() {
  const next = await createConversation(`New lane ${conversations.value.length + 1}`)
  conversationStore.value[next.id] = [
    {
      id: `seed-${next.id}`,
      role: 'assistant',
      content: 'New lane created. Ask for a summary, rollout note, or implementation plan.',
      createAt: Date.now(),
      status: 'success'
    }
  ]
  activeConversationId.value = next.id
  messages.value = cloneMessages(conversationStore.value[next.id]) as RuntimeChatMessage[]
}

function handleActivateConversation(id: string) {
  activeConversationId.value = id
}

async function handleDeleteConversation(conversation: AiConversation) {
  await removeConversation(conversation.id)
  delete conversationStore.value[conversation.id]

  if (activeConversationId.value === conversation.id && conversations.value.length > 0) {
    activeConversationId.value = conversations.value[0].id
    messages.value = cloneMessages(
      conversationStore.value[activeConversationId.value] ?? []
    ) as RuntimeChatMessage[]
  }
}

function handleEditConversation(conversation: AiConversation, newTitle: string) {
  void updateConversation(conversation.id, { title: newTitle })
}

function handlePinConversation(conversation: AiConversation, pinned: boolean) {
  void pinConversation(conversation.id, pinned)
}

function clearCurrentConversation() {
  clear()
}

function runPrompt(prompt: string) {
  void sendMessage(prompt)
}
</script>

<template>
  <div class="workspace-layout">
    <section class="page-section workspace-pane conversations-pane">
      <header class="page-section-header">
        <div>
          <p class="eyebrow">Conversation Rail</p>
          <h2>Active work lanes</h2>
        </div>
        <YhButton type="primary" @click="handleCreateConversation">New lane</YhButton>
      </header>

      <YhAiConversations
        :data="conversations"
        :active-id="activeConversationId"
        grouped
        @update:active-id="handleActivateConversation"
        @create="handleCreateConversation"
        @delete="handleDeleteConversation"
        @edit="handleEditConversation"
        @pin="handlePinConversation"
      />
    </section>

    <section class="page-section workspace-pane chat-pane">
      <header class="page-section-header">
        <div>
          <p class="eyebrow">Generative Surface</p>
          <h2>{{ activeConversation?.title ?? 'Workspace lane' }}</h2>
          <p class="helper">
            This route wires
            <code>useAiChat</code>
            and
            <code>useAiConversations</code>
            into a product shell instead of a docs-only demo.
          </p>
        </div>

        <div class="page-actions">
          <YhButton @click="artifactVisible = true">Open artifact</YhButton>
          <YhButton :disabled="!messages.length" @click="clearCurrentConversation">Clear</YhButton>
          <YhButton type="danger" :disabled="!isGenerating" @click="stop">Stop</YhButton>
        </div>
      </header>

      <div class="prompt-row">
        <YhButton
          v-for="prompt in workspacePrompts"
          :key="prompt"
          size="small"
          @click="runPrompt(prompt)"
        >
          {{ prompt }}
        </YhButton>
      </div>

      <div class="chat-surface">
        <YhAiChat
          :messages="messages"
          :loading="isGenerating"
          :suggestions="workspacePrompts"
          virtual-scroll
          :virtual-height="560"
          @send="sendMessage"
          @clear="clearCurrentConversation"
        />
      </div>
    </section>

    <aside class="workspace-side">
      <section class="page-section workspace-pane">
        <header class="page-section-header">
          <div>
            <p class="eyebrow">Reasoning</p>
            <h2>Thought chain</h2>
          </div>
        </header>
        <YhAiThoughtChain :items="reasoningItems" show-progress line-gradient />
      </section>

      <section class="page-section workspace-pane">
        <header class="page-section-header">
          <div>
            <p class="eyebrow">Source context</p>
            <h2>Knowledge recall</h2>
          </div>
        </header>
        <YhAiSources :sources="workspaceSources" mode="card" :max-visible="3" />
      </section>
    </aside>

    <YhAiArtifacts v-model:visible="artifactVisible" :data="workspaceArtifact" width="44%" />
  </div>
</template>

<style scoped>
.workspace-layout {
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr) 340px;
  gap: 16px;
  align-items: start;
}

.workspace-pane {
  min-width: 0;
  align-self: start;
}

.conversations-pane,
.chat-pane {
  display: flex;
  flex-direction: column;
}

.prompt-row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 14px;
}

.chat-surface {
  min-height: 640px;
  display: flex;
  overflow: hidden;
  border: 1px solid var(--starter-border);
  border-radius: 8px;
  background: #fff;
}

.chat-pane .page-section-header > div:first-child {
  flex: 1 1 420px;
  min-width: 0;
}

.chat-pane .page-actions {
  flex: 0 0 auto;
  justify-content: flex-end;
}

.helper code {
  font-family:
    ui-monospace, SFMono-Regular, SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace;
  font-size: 0.95em;
  color: var(--starter-text);
  background: var(--starter-soft);
  padding: 0 4px;
  border-radius: 4px;
}

.conversations-pane :deep(.yh-ai-conversations) {
  height: auto;
  border-right: none;
  background: transparent;
}

.conversations-pane :deep(.yh-ai-conversations__list) {
  max-height: 720px;
}

.chat-surface :deep(.yh-ai-chat) {
  flex: 1;
  min-width: 0;
}

.workspace-side {
  display: grid;
  gap: 16px;
  align-content: start;
}

@media (max-width: 1380px) {
  .workspace-layout {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
