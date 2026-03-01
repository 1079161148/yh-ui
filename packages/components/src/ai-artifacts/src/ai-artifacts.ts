import type { ExtractPropTypes, PropType } from 'vue'

export type ArtifactType = 'code' | 'html' | 'markdown' | 'react' | 'vue' | 'diagram'

export interface ArtifactVersion {
  /**
   * 版本号或标识
   */
  version: number | string
  /**
   * 内容源码
   */
  content: string
  /**
   * 该版本的更新说明
   */
  description?: string
  /**
   * 时间戳
   */
  timestamp?: string | number
}

export interface ArtifactData {
  /**
   * 唯一标识
   */
  id: string
  /**
   * 文件名或标题
   */
  title: string
  /**
   * 类型
   */
  type: ArtifactType
  /**
   * 当前选中的版本号
   */
  currentVersion?: number | string
  /**
   * 版本历史
   */
  versions: ArtifactVersion[]
}

export const aiArtifactsProps = {
  /**
   * 是否显示侧边栏
   */
  visible: {
    type: Boolean,
    default: false
  },
  /**
   * 正在展示的 Artifact 数据
   */
  data: {
    type: Object as PropType<ArtifactData>
  },
  /**
   * 侧边栏宽度
   */
  width: {
    type: [String, Number] as PropType<string | number>,
    default: '50%'
  },
  /**
   * 是否全屏展示
   */
  fullscreen: {
    type: Boolean,
    default: false
  },
  /**
   * 渲染模式：preview (预览) | code (源码) | inline (行内/嵌入)
   */
  mode: {
    type: String as PropType<'preview' | 'code' | 'inline'>,
    default: 'preview'
  },
  /**
   * 主题覆盖变量
   */
  themeOverrides: {
    type: Object as PropType<import('@yh-ui/theme').ComponentThemeVars>,
    default: undefined
  }
} as const

export type AiArtifactsProps = ExtractPropTypes<typeof aiArtifactsProps>

export const aiArtifactsEmits = {
  'update:visible': (_val: boolean) => true,
  'update:mode': (_val: 'preview' | 'code' | 'inline') => true,
  'version-change': (_version: ArtifactVersion) => true,
  close: () => true
}

export type AiArtifactsEmits = typeof aiArtifactsEmits
