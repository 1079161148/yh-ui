import { cp, mkdir, rm, stat } from 'node:fs/promises'
import { execFile } from 'node:child_process'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'
import { computeFingerprint, shouldSkipCachedBuild, updateBuildCache } from './build-cache.mjs'

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const docsPublicDir = resolve(rootDir, 'docs/public')
const execFileAsync = promisify(execFile)

const packageMappings = [
  ['components', 'components'],
  ['hooks', 'hooks'],
  ['icons', 'icons'],
  ['locale', 'locale'],
  ['theme', 'theme'],
  ['utils', 'utils'],
  ['yh-ui', 'yh-ui']
]

const pnpmExec = process.env.npm_execpath
  ? [process.execPath, [process.env.npm_execpath]]
  : [process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm', []]

async function run(command, args, label) {
  const [executable, baseArgs] = command
  const finalArgs = [...baseArgs, ...args]
  const { stdout, stderr } = await execFileAsync(executable, finalArgs, {
    cwd: rootDir,
    env: process.env,
    maxBuffer: 1024 * 1024 * 50
  })

  if (stdout.trim()) {
    process.stdout.write(stdout)
  }

  if (stderr.trim()) {
    process.stderr.write(stderr)
  }

  if (label) {
    console.log(`[docs-public] prepared ${label}`)
  }
}

async function ensureDir(path) {
  await mkdir(path, { recursive: true })
}

async function exists(path) {
  try {
    await stat(path)
    return true
  } catch {
    return false
  }
}

async function ensurePackageBuildOutput(packageDir) {
  const sourceDir = resolve(rootDir, 'packages', packageDir, 'dist')
  if (await exists(sourceDir)) {
    return sourceDir
  }

  if (packageDir === 'components') {
    await run(
      pnpmExec,
      ['-C', 'packages/components', 'exec', 'unbuild'],
      'packages/components/dist'
    )
    await run(
      [process.execPath, [resolve(rootDir, 'scripts/post-build-styles.mjs')]],
      ['components']
    )
    return sourceDir
  }

  if (packageDir === 'yh-ui') {
    await run(
      [process.execPath, [resolve(rootDir, 'scripts/prepare-build-artifacts.mjs')]],
      ['yh-ui'],
      'packages/yh-ui build artifacts'
    )
    await run(pnpmExec, ['-C', 'packages/yh-ui', 'exec', 'unbuild'], 'packages/yh-ui/dist')
    await run([process.execPath, [resolve(rootDir, 'scripts/post-build-styles.mjs')]], ['yh-ui'])
    return sourceDir
  }

  await run(pnpmExec, ['-C', `packages/${packageDir}`, 'build'], `packages/${packageDir}/dist`)
  return sourceDir
}

async function syncPackage(packageDir, publicDir) {
  const sourceDir = await ensurePackageBuildOutput(packageDir)
  const targetDir = resolve(docsPublicDir, publicDir)

  if (!(await exists(sourceDir))) {
    throw new Error(
      `Missing build output for packages/${packageDir}/dist. Run "pnpm build" before syncing docs public packages.`
    )
  }

  await ensureDir(dirname(targetDir))
  await rm(targetDir, {
    recursive: true,
    force: true,
    maxRetries: 5,
    retryDelay: 200
  })
  await cp(sourceDir, targetDir, { recursive: true, force: true })
  console.log(`[docs-public] synced packages/${packageDir}/dist -> docs/public/${publicDir}`)
}

async function main() {
  await ensureDir(docsPublicDir)

  const sourceDirs = []
  const targetDirs = []

  for (const [packageDir, publicDir] of packageMappings) {
    sourceDirs.push(await ensurePackageBuildOutput(packageDir))
    targetDirs.push(resolve(docsPublicDir, publicDir))
  }

  const fingerprint = await computeFingerprint([fileURLToPath(import.meta.url), ...sourceDirs])

  if (await shouldSkipCachedBuild('sync-docs-public-packages', fingerprint, targetDirs)) {
    console.log('[docs-public] skip sync (no package dist changes detected)')
    return
  }

  for (const [packageDir, publicDir] of packageMappings) {
    await syncPackage(packageDir, publicDir)
  }

  await updateBuildCache('sync-docs-public-packages', fingerprint, targetDirs)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
