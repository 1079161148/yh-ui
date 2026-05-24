export const INSTALL_TARGETS = ['project', 'cursor', 'claude', 'codex', 'markdown'] as const

export type InstallTarget = (typeof INSTALL_TARGETS)[number]

export interface ResolveInstallPlanOptions {
  cwd: string
  target: InstallTarget
  outDir?: string
}

export interface InstallPlan {
  target: InstallTarget
  baseDir: string
  skillDir: string
  llmsPath: string
  llmsFullPath: string
  manifestPath: string
}

export interface TargetCandidate {
  target: InstallTarget
  baseDir: string
  detected: boolean
  reason: string
}

export interface InstallOptions extends ResolveInstallPlanOptions {
  force?: boolean
  dryRun?: boolean
}

export interface InstallResult {
  plan: InstallPlan
  version: string
}

export interface DoctorResult {
  plan: InstallPlan
  version: string | null
  currentVersion: string
  exists: boolean
  upToDate: boolean
  missingItems: string[]
  checks: Array<{
    label: string
    path: string
    exists: boolean
  }>
  detectedTargets: TargetCandidate[]
}

export interface ParsedArgs {
  command: 'install' | 'doctor' | 'help'
  target?: InstallTarget
  outDir?: string
  force: boolean
  dryRun: boolean
  json: boolean
  help: boolean
  version: boolean
}
