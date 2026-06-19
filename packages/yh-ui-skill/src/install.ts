import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { join, relative } from 'node:path'
import { copyDirectory, copyFile, ensureParentDir, pathExists, removePath } from './fs'
import { detectInstallTargetCandidates, resolveInstallPlan } from './targets'
import type { DoctorResult, InstallOptions, InstallResult } from './types'

const PACKAGE_ROOT = fileURLToPath(new URL('..', import.meta.url))
const ASSETS_ROOT = join(PACKAGE_ROOT, 'assets')
const SKILL_ASSET_DIR = join(ASSETS_ROOT, 'skills', 'yh-ui')
const LLMS_ASSET_PATH = join(ASSETS_ROOT, 'llms.txt')
const LLMS_FULL_ASSET_PATH = join(ASSETS_ROOT, 'llms-full.txt')

interface InstalledManifest {
  packageName: string
  version: string
  target: string
  baseDir: string
  installedAt: string
  files: string[]
}

export async function getPackageVersion(): Promise<string> {
  const packageJson = JSON.parse(await readFile(join(PACKAGE_ROOT, 'package.json'), 'utf8')) as {
    version: string
  }
  return packageJson.version
}

async function assertAssetsAvailable(): Promise<void> {
  const requiredPaths = [SKILL_ASSET_DIR, LLMS_ASSET_PATH, LLMS_FULL_ASSET_PATH]

  for (const requiredPath of requiredPaths) {
    if (!(await pathExists(requiredPath))) {
      throw new Error(
        `Skill assets are missing at "${requiredPath}". Run the package build before publishing or using the CLI.`
      )
    }
  }
}

export async function installSkill(options: InstallOptions): Promise<InstallResult> {
  await assertAssetsAvailable()

  const plan = resolveInstallPlan(options)
  const version = await getPackageVersion()
  const alreadyInstalled = await pathExists(plan.skillDir)

  if (alreadyInstalled && !options.force) {
    throw new Error(
      `Destination "${plan.skillDir}" already exists. Re-run with --force to overwrite the previous installation.`
    )
  }

  if (!options.dryRun && options.force) {
    const pathsToRemove = [plan.skillDir, plan.llmsPath, plan.llmsFullPath, plan.manifestPath]
    if (plan.target === 'cursor') {
      pathsToRemove.push(join(plan.baseDir, 'rules', 'yh-ui.mdc'))
      pathsToRemove.push(join(options.cwd, '.cursorrules'))
    }
    await Promise.all(pathsToRemove.map((p) => removePath(p)))
  }

  if (!options.dryRun) {
    await ensureParentDir(plan.skillDir)
    await copyDirectory(SKILL_ASSET_DIR, plan.skillDir)
    await copyFile(LLMS_ASSET_PATH, plan.llmsPath)
    await copyFile(LLMS_FULL_ASSET_PATH, plan.llmsFullPath)

    const manifestFiles = [
      'skills/yh-ui',
      'skills/yh-ui/SKILL.md',
      'llms.txt',
      'llms-full.txt',
      'yh-ui-skill.manifest.json'
    ]

    if (plan.target === 'cursor') {
      const rawSkillContent = await readFile(join(SKILL_ASSET_DIR, 'SKILL.md'), 'utf8')
      const bodyContent = rawSkillContent.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '')

      // Write Cursor MDC rule
      const mdcPath = join(plan.baseDir, 'rules', 'yh-ui.mdc')
      const mdcFrontmatter = `---\ndescription: Guidelines for Vue, Nuxt, and TypeScript files using YH-UI components, hooks, request, theme, locale, flow, and AI SDK.\nglobs: **/*.vue, **/*.ts, **/*.tsx, **/*.js, **/*.jsx\n---\n\n`
      await ensureParentDir(mdcPath)
      await writeFile(mdcPath, mdcFrontmatter + bodyContent, 'utf8')
      manifestFiles.push('rules/yh-ui.mdc')

      // Write root .cursorrules
      const cursorrulesPath = join(options.cwd, '.cursorrules')
      await writeFile(cursorrulesPath, rawSkillContent, 'utf8')
      manifestFiles.push('../.cursorrules')
    }

    const manifest: InstalledManifest = {
      packageName: '@yh-ui/yh-ui-skill',
      version,
      target: plan.target,
      baseDir: plan.baseDir,
      installedAt: new Date().toISOString(),
      files: manifestFiles
    }

    await ensureParentDir(plan.manifestPath)
    await writeFile(plan.manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8')
  }

  return { plan, version }
}

export async function inspectInstallation(options: InstallOptions): Promise<DoctorResult> {
  const plan = resolveInstallPlan(options)
  const currentVersion = await getPackageVersion()
  const missingItems: string[] = []
  const checks = [
    {
      label: 'Skill directory',
      path: plan.skillDir,
      exists: await pathExists(plan.skillDir)
    },
    {
      label: 'Skill entry',
      path: join(plan.skillDir, 'SKILL.md'),
      exists: await pathExists(join(plan.skillDir, 'SKILL.md'))
    },
    {
      label: 'llms.txt',
      path: plan.llmsPath,
      exists: await pathExists(plan.llmsPath)
    },
    {
      label: 'llms-full.txt',
      path: plan.llmsFullPath,
      exists: await pathExists(plan.llmsFullPath)
    },
    {
      label: 'Install manifest',
      path: plan.manifestPath,
      exists: await pathExists(plan.manifestPath)
    }
  ]

  if (plan.target === 'cursor') {
    checks.push(
      {
        label: 'Cursor MDC rule',
        path: join(plan.baseDir, 'rules', 'yh-ui.mdc'),
        exists: await pathExists(join(plan.baseDir, 'rules', 'yh-ui.mdc'))
      },
      {
        label: '.cursorrules',
        path: join(options.cwd, '.cursorrules'),
        exists: await pathExists(join(options.cwd, '.cursorrules'))
      }
    )
  }

  checks
    .filter((check) => !check.exists)
    .forEach((check) => missingItems.push(relative(plan.baseDir, check.path).replace(/\\/g, '/')))

  let version: string | null = null

  if (checks.find((c) => c.label === 'Install manifest')?.exists) {
    const manifest = JSON.parse(await readFile(plan.manifestPath, 'utf8')) as InstalledManifest
    version = manifest.version
  }

  const exists = missingItems.length === 0
  const upToDate = exists && version === currentVersion

  return {
    plan,
    version,
    currentVersion,
    exists,
    upToDate,
    missingItems,
    checks,
    detectedTargets: await detectInstallTargetCandidates(options.cwd)
  }
}
