import { type Ref } from 'vue'
/**
 * useScrollLock - 极致稳定的滚动锁定管理
 * @description 深度对标 市面组件库 / Naive UI，解决复杂环境（包括 VitePress 等文档站点）下的内容移位问题
 */
export declare const useScrollLock: (trigger: Ref<boolean>) => {
  isLocked: Ref<boolean, boolean>
}
