import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')
const packagesRoot = path.join(repoRoot, 'packages')
const registry = process.env.NPM_REGISTRY_URL || 'https://registry.npmjs.org'
const cdnProviders = [
  {
    name: 'jsDelivr',
    createUrl: (pkg, version, assetPath) =>
      `https://cdn.jsdelivr.net/npm/${pkg}@${version}/${assetPath}`
  },
  {
    name: 'unpkg',
    createUrl: (pkg, version, assetPath) => `https://unpkg.com/${pkg}@${version}/${assetPath}`
  }
]
const relevantAssetPattern = /\.(?:mjs|cjs|js|css)$/

function stripBom(source) {
  return source.charCodeAt(0) === 0xfeff ? source.slice(1) : source
}

async function readJson(filePath) {
  return JSON.parse(stripBom(await fs.readFile(filePath, 'utf8')))
}

async function getWorkspacePackages() {
  const entries = await fs.readdir(packagesRoot, { withFileTypes: true })
  const packages = []

  for (const entry of entries) {
    if (!entry.isDirectory()) continue

    const manifestPath = path.join(packagesRoot, entry.name, 'package.json')
    try {
      const manifest = await readJson(manifestPath)
      packages.push({ dirName: entry.name, manifest })
    } catch {
      // ignore invalid entries
    }
  }

  return packages.sort((a, b) => a.manifest.name.localeCompare(b.manifest.name))
}

function collectExportAssets(value, assets) {
  if (!value) return

  if (typeof value === 'string') {
    // Export map patterns like "./dist/*.mjs" are templates, not real CDN asset URLs.
    if (value.includes('*')) {
      return
    }

    if (relevantAssetPattern.test(value)) {
      assets.add(value.replace(/^\.\//, ''))
    }
    return
  }

  if (Array.isArray(value)) {
    for (const entry of value) {
      collectExportAssets(entry, assets)
    }
    return
  }

  if (typeof value === 'object') {
    for (const entry of Object.values(value)) {
      collectExportAssets(entry, assets)
    }
  }
}

function getRelevantAssets(manifest) {
  const assets = new Set()

  for (const field of ['main', 'module', 'style', 'unpkg', 'jsdelivr']) {
    const value = manifest[field]
    if (typeof value === 'string' && relevantAssetPattern.test(value)) {
      assets.add(value.replace(/^\.\//, ''))
    }
  }

  collectExportAssets(manifest.exports, assets)

  return [...assets].sort()
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json'
    }
  })

  if (!response.ok) {
    throw new Error(`GET ${url} failed with ${response.status}`)
  }

  return response.json()
}

async function assertPackageVersionVisible(pkg) {
  const encodedName = pkg.manifest.name.replace('/', '%2f')
  const versionUrl = `${registry.replace(/\/+$/, '')}/${encodedName}/${pkg.manifest.version}`
  const metadata = await fetchJson(versionUrl)

  if (metadata.version !== pkg.manifest.version) {
    throw new Error(
      `${pkg.manifest.name} registry metadata returned ${metadata.version}, expected ${pkg.manifest.version}`
    )
  }
}

async function assertCdnAssetAvailable(provider, pkg, assetPath) {
  const url = provider.createUrl(pkg.manifest.name, pkg.manifest.version, assetPath)
  const response = await fetch(url, {
    method: 'GET',
    redirect: 'follow',
    headers: {
      Accept: '*/*'
    }
  })

  if (!response.ok) {
    throw new Error(
      `${provider.name} returned ${response.status} for ${pkg.manifest.name}@${pkg.manifest.version} -> ${assetPath}`
    )
  }
}

async function main() {
  const packages = await getWorkspacePackages()
  const assetChecks = []

  for (const pkg of packages) {
    await assertPackageVersionVisible(pkg)

    const assets = getRelevantAssets(pkg.manifest)
    for (const assetPath of assets) {
      for (const provider of cdnProviders) {
        assetChecks.push(assertCdnAssetAvailable(provider, pkg, assetPath))
      }
    }
  }

  await Promise.all(assetChecks)

  const assetCount = packages.reduce(
    (count, pkg) => count + getRelevantAssets(pkg.manifest).length * cdnProviders.length,
    0
  )
  console.log(
    `[release-published] verified npm visibility for ${packages.length} packages and ${assetCount} CDN assets`
  )
}

await main()
