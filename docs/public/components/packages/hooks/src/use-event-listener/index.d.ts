import type { MaybeRef } from 'vue'
export declare function useEventListener(
  target: MaybeRef<EventTarget | null | undefined> | (() => EventTarget | null | undefined),
  event: string,
  handler: (e: Event) => void,
  options?: boolean | AddEventListenerOptions
): void
