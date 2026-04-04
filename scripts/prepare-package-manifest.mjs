import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')

const mode = process.argv[2]

if (!['prepare', 'restore'].includes(mode)) {
  console.error('[prepare-package-manifest] Usage: node scripts/prepare-package-manifest.mjs <prepare|restore>')
  process.exit(1)
}

const packageRoot = process.cwd()
const packageJsonPath = path.join(packageRoot, 'package.json')
const backupPath = path.join(packageRoot, '.pack-package.json.bak')
const rootPackageJsonPath = path.join(repoRoot, 'package.json')
const workspaceConfigPath = path.join(repoRoot, 'pnpm-workspace.yaml')

async function fileExists(target) {
  try {
    await fs.access(target)
    return true
  } catch {
    return false
  }
}

function stripBom(source) {
  return source.charCodeAt(0) === 0xfeff ? source.slice(1) : source
}

function parseCatalogVersions(source) {
  const versions = {}
  const lines = source.split(/\r?\n/)
  let inCatalog = false

  for (const line of lines) {
    if (!inCatalog) {
      if (/^catalog:\s*$/.test(line)) {
        inCatalog = true
      }
      continue
    }

    if (/^\S/.test(line)) {
      break
    }

    const match = line.match(/^\s{2}['"]?([^'":]+)['"]?:\s*(.+?)\s*$/)
    if (!match) {
      continue
    }

    const [, rawName, rawVersion] = match
    versions[rawName] = rawVersion.replace(/^['"]|['"]$/g, '')
  }

  return versions
}

async function loadVersionMaps() {
  const [rootPackageRaw, workspaceConfigRaw, packageDirs] = await Promise.all([
    fs.readFile(rootPackageJsonPath, 'utf8'),
    fs.readFile(workspaceConfigPath, 'utf8'),
    fs.readdir(path.join(repoRoot, 'packages'), { withFileTypes: true })
  ])

  const rootPackage = JSON.parse(stripBom(rootPackageRaw))
  const catalogVersions = {
    ...parseCatalogVersions(workspaceConfigRaw),
    ...(rootPackage.pnpm?.overrides ?? {})
  }

  const workspaceVersions = {}

  await Promise.all(
    packageDirs
      .filter((entry) => entry.isDirectory())
      .map(async (entry) => {
        const workspacePackagePath = path.join(repoRoot, 'packages', entry.name, 'package.json')
        if (!(await fileExists(workspacePackagePath))) {
          return
        }

        const workspacePackage = JSON.parse(stripBom(await fs.readFile(workspacePackagePath, 'utf8')))
        if (workspacePackage.name && workspacePackage.version) {
          workspaceVersions[workspacePackage.name] = workspacePackage.version
        }
      })
  )

  return { catalogVersions, workspaceVersions }
}

function replaceProtocols(deps, versions, sourceLabel) {
  if (!deps) {
    return deps
  }

  const nextDeps = {}

  for (const [name, version] of Object.entries(deps)) {
    if (version === 'workspace:*') {
      const resolvedVersion = versions.workspaceVersions[name]
      if (!resolvedVersion) {
        throw new Error(`Missing workspace version for ${name} in ${sourceLabel}`)
      }
      nextDeps[name] = `^${resolvedVersion}`
      continue
    }

    if (version === 'catalog:') {
      const resolvedVersion = versions.catalogVersions[name]
      if (!resolvedVersion) {
        throw new Error(`Missing catalog version for ${name} in ${sourceLabel}`)
      }
      nextDeps[name] = resolvedVersion
      continue
    }

    nextDeps[name] = version
  }

  return nextDeps
}

async function prepareManifest() {
  if (await fileExists(backupPath)) {
    console.log(`[prepare-package-manifest] Backup already exists for ${packageRoot}, skipping prepare.`)
    return
  }

  const versions = await loadVersionMaps()
  const originalRaw = await fs.readFile(packageJsonPath, 'utf8')
  const manifest = JSON.parse(stripBom(originalRaw))

  await fs.writeFile(backupPath, originalRaw, 'utf8')

  for (const field of ['dependencies', 'peerDependencies', 'optionalDependencies', 'devDependencies']) {
    manifest[field] = replaceProtocols(manifest[field], versions, `${manifest.name}:${field}`)
  }

  await fs.writeFile(packageJsonPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8')
  console.log(`[prepare-package-manifest] Prepared ${manifest.name}`)
}

async function restoreManifest() {
  if (!(await fileExists(backupPath))) {
    console.log(`[prepare-package-manifest] No backup found for ${packageRoot}, skipping restore.`)
    return
  }

  const backup = await fs.readFile(backupPath, 'utf8')
  await fs.writeFile(packageJsonPath, backup, 'utf8')
  await fs.unlink(backupPath)
  console.log(`[prepare-package-manifest] Restored ${packageRoot}`)
}

if (mode === 'prepare') {
  await prepareManifest()
} else {
  await restoreManifest()
}
