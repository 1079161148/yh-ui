import { cp, mkdir, rm, stat } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const docsPublicDir = resolve(rootDir, 'docs/public')

const packageMappings = [
  ['components', 'components'],
  ['hooks', 'hooks'],
  ['icons', 'icons'],
  ['locale', 'locale'],
  ['theme', 'theme'],
  ['utils', 'utils'],
  ['yh-ui', 'yh-ui']
]

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

async function syncPackage(packageDir, publicDir) {
  const sourceDir = resolve(rootDir, 'packages', packageDir, 'dist')
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

  for (const [packageDir, publicDir] of packageMappings) {
    await syncPackage(packageDir, publicDir)
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
