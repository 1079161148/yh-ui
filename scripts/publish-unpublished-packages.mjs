import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import {
  findProtocolLeaks,
  formatProtocolLeaks,
  packPackage,
  run
} from './packed-manifest-utils.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')
const packagesRoot = path.join(repoRoot, 'packages')
const registry = process.env.NPM_REGISTRY_URL || 'https://registry.npmjs.org'
const isDryRun = process.argv.includes('--dry-run')
function stripBom(source) {
  return source.charCodeAt(0) === 0xfeff ? source.slice(1) : source
}

const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm'

async function readJson(filePath) {
  return JSON.parse(stripBom(await fs.readFile(filePath, 'utf8')))
}

async function getWorkspacePackages() {
  const entries = await fs.readdir(packagesRoot, { withFileTypes: true })
  const packages = []

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue
    }

    const dir = path.join(packagesRoot, entry.name)
    const manifestPath = path.join(dir, 'package.json')

    try {
      const manifest = await readJson(manifestPath)
      packages.push({
        dir,
        manifest
      })
    } catch {
      continue
    }
  }

  return packages
}

function collectWorkspaceDeps(manifest, workspaceNames) {
  const dependencyFields = ['dependencies', 'optionalDependencies', 'peerDependencies']

  const deps = new Set()

  for (const field of dependencyFields) {
    for (const [name, version] of Object.entries(manifest[field] ?? {})) {
      if (version === 'workspace:*' && workspaceNames.has(name)) {
        deps.add(name)
      }
    }
  }

  return [...deps]
}

function topoSort(packages) {
  const packageMap = new Map(packages.map((pkg) => [pkg.manifest.name, pkg]))
  const workspaceNames = new Set(packageMap.keys())
  const incoming = new Map()
  const outgoing = new Map()

  for (const pkg of packages) {
    const deps = collectWorkspaceDeps(pkg.manifest, workspaceNames)
    incoming.set(pkg.manifest.name, new Set(deps))

    for (const dep of deps) {
      if (!outgoing.has(dep)) {
        outgoing.set(dep, new Set())
      }
      outgoing.get(dep).add(pkg.manifest.name)
    }
  }

  const queue = packages
    .map((pkg) => pkg.manifest.name)
    .filter((name) => incoming.get(name)?.size === 0)
    .sort()

  const result = []

  while (queue.length > 0) {
    const name = queue.shift()
    result.push(packageMap.get(name))

    for (const dependent of outgoing.get(name) ?? []) {
      const deps = incoming.get(dependent)
      deps.delete(name)
      if (deps.size === 0) {
        queue.push(dependent)
        queue.sort()
      }
    }
  }

  if (result.length !== packages.length) {
    throw new Error(
      'Unable to determine publish order because workspace dependencies contain a cycle.'
    )
  }

  return result
}

async function isVersionPublished(name, version) {
  try {
    const result = await run(
      npmCommand,
      ['view', `${name}@${version}`, 'version', '--registry', registry, '--json'],
      { captureOutput: true, stdio: ['ignore', 'pipe', 'pipe'] }
    )

    const value = result.stdout.trim()
    return value.length > 0 && value !== 'null'
  } catch (error) {
    const stderr = `${error.stderr ?? ''}${error.stdout ?? ''}`
    if (stderr.includes('E404') || stderr.includes('404') || stderr.includes('No match found')) {
      return false
    }

    throw error
  }
}

async function publishPackage(pkg) {
  const { name, version } = pkg.manifest
  const alreadyPublished = await isVersionPublished(name, version)

  if (alreadyPublished) {
    console.log(`[publish] skip ${name}@${version} (already exists on npm)`)
    return 'skipped'
  }

  if (isDryRun) {
    console.log(`[publish] would publish ${name}@${version}`)
    return 'planned'
  }

  console.log(`[publish] packing ${name}@${version}`)
  const packed = await packPackage(pkg.dir)
  const protocolLeaks = findProtocolLeaks(packed.manifest)
  if (protocolLeaks.length > 0) {
    await fs.rm(packed.tarballPath, { force: true })
    throw new Error(
      `[publish] Refusing to publish ${name}@${version} because packed manifest still contains workspace/catalog protocols:\n${formatProtocolLeaks(protocolLeaks)}`
    )
  }

  console.log(`[publish] publishing ${name}@${version}`)
  try {
    // Publish the verified tarball instead of the directory so the uploaded package
    // matches the exact output of npm pack / prepack manifest rewriting.
    await run(npmCommand, ['publish', packed.tarballPath, '--access', 'public'], { cwd: pkg.dir })
    return 'published'
  } finally {
    await fs.rm(packed.tarballPath, { force: true })
  }
}

async function main() {
  const workspacePackages = await getWorkspacePackages()
  const orderedPackages = topoSort(workspacePackages)
  let publishedCount = 0
  let skippedCount = 0

  for (const pkg of orderedPackages) {
    const status = await publishPackage(pkg)
    if (status === 'published') {
      publishedCount += 1
    } else if (status === 'skipped') {
      skippedCount += 1
    }
  }

  console.log(
    `[publish] done: ${publishedCount} published, ${skippedCount} skipped, ${orderedPackages.length} total`
  )
}

await main()
