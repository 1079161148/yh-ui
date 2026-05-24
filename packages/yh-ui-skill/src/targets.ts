import { resolve } from 'node:path'
import { pathExists } from './fs'
import type {
  InstallPlan,
  InstallTarget,
  ResolveInstallPlanOptions,
  TargetCandidate
} from './types'

const TARGET_BASE_DIRS: Record<InstallTarget, string> = {
  project: '.yh-ui',
  cursor: '.cursor',
  claude: '.claude',
  codex: '.codex',
  markdown: 'yh-ui-skill'
}

export function isInstallTarget(value: string): value is InstallTarget {
  return Object.hasOwn(TARGET_BASE_DIRS, value)
}

export function defaultBaseDirForTarget(target: InstallTarget): string {
  return TARGET_BASE_DIRS[target]
}

export async function detectInstallTargetCandidates(cwd: string): Promise<TargetCandidate[]> {
  const packageJsonExists = await pathExists(resolve(cwd, 'package.json'))

  const candidates = await Promise.all(
    (['cursor', 'claude', 'codex', 'project', 'markdown'] as InstallTarget[]).map(
      async (target) => {
        const baseDir = resolve(cwd, defaultBaseDirForTarget(target))
        const baseDirExists = await pathExists(baseDir)

        if (target === 'project') {
          return {
            target,
            baseDir,
            detected: packageJsonExists || baseDirExists,
            reason: packageJsonExists
              ? 'Detected package.json in the current workspace'
              : 'Install into the default project knowledge directory'
          }
        }

        if (target === 'markdown') {
          return {
            target,
            baseDir,
            detected: false,
            reason: 'Export a portable Markdown knowledge bundle'
          }
        }

        return {
          target,
          baseDir,
          detected: baseDirExists,
          reason: baseDirExists
            ? `Detected an existing ${defaultBaseDirForTarget(target)} directory`
            : `Use the default ${defaultBaseDirForTarget(target)} directory`
        }
      }
    )
  )

  return candidates.sort((left, right) => Number(right.detected) - Number(left.detected))
}

export async function autoSelectTarget(cwd: string): Promise<InstallTarget> {
  const candidates = await detectInstallTargetCandidates(cwd)
  return candidates.find((candidate) => candidate.detected)?.target ?? 'project'
}

export function resolveInstallPlan(options: ResolveInstallPlanOptions): InstallPlan {
  const baseDir = resolve(options.cwd, options.outDir ?? defaultBaseDirForTarget(options.target))

  return {
    target: options.target,
    baseDir,
    skillDir: resolve(baseDir, 'skills', 'yh-ui'),
    llmsPath: resolve(baseDir, 'llms.txt'),
    llmsFullPath: resolve(baseDir, 'llms-full.txt'),
    manifestPath: resolve(baseDir, 'yh-ui-skill.manifest.json')
  }
}
