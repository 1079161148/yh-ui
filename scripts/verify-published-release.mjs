import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')
const packagesRoot = path.join(repoRoot, 'packages')
const registry = process.env.NPM_REGISTRY_URL || 'https://registry.npmjs.org'
const requestTimeoutMs = Number(process.env.RELEASE_VERIFY_REQUEST_TIMEOUT_MS || 20 * 1000)
const cdnWaitTimeoutMs = Number(process.env.RELEASE_VERIFY_CDN_TIMEOUT_MS || 8 * 60 * 1000)
const cdnRetryIntervalMs = Number(process.env.RELEASE_VERIFY_CDN_RETRY_INTERVAL_MS || 5 * 1000)
const cdnConcurrency = Number(process.env.RELEASE_VERIFY_CDN_CONCURRENCY || 4)
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

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function formatErrorMessage(error) {
  if (!error) {
    return 'unknown error'
  }

  if (error instanceof Error) {
    return error.message
  }

  return String(error)
}

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), requestTimeoutMs)

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal
    })
  } finally {
    clearTimeout(timer)
  }
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
  const response = await fetchWithTimeout(url, {
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
  const deadline = Date.now() + cdnWaitTimeoutMs
  let attempt = 0
  let lastFailure = null

  while (Date.now() < deadline) {
    attempt += 1

    try {
      const response = await fetchWithTimeout(url, {
        method: 'GET',
        redirect: 'follow',
        headers: {
          Accept: '*/*'
        }
      })

      if (response.ok) {
        return
      }

      lastFailure = new Error(
        `${provider.name} returned ${response.status} for ${pkg.manifest.name}@${pkg.manifest.version} -> ${assetPath}`
      )
    } catch (error) {
      lastFailure = error
    }

    if (Date.now() + cdnRetryIntervalMs >= deadline) {
      break
    }

    if (attempt === 1 || attempt % 6 === 0) {
      console.warn(
        `[release-published] waiting for ${provider.name} asset ${pkg.manifest.name}@${pkg.manifest.version} -> ${assetPath}: ${formatErrorMessage(lastFailure)}`
      )
    }
    await sleep(cdnRetryIntervalMs)
  }

  throw new Error(
    `Timed out after ${cdnWaitTimeoutMs}ms waiting for ${provider.name} asset ${pkg.manifest.name}@${pkg.manifest.version} -> ${assetPath}${lastFailure ? ` (${formatErrorMessage(lastFailure)})` : ''}`
  )
}

async function runWithConcurrency(tasks, concurrency) {
  const queue = [...tasks]
  const workerCount = Math.max(1, Math.min(concurrency, queue.length || 1))
  const workers = Array.from({ length: workerCount }, async () => {
    while (queue.length > 0) {
      const task = queue.shift()
      await task()
    }
  })

  await Promise.all(workers)
}

async function main() {
  const packages = await getWorkspacePackages()
  const assetChecks = []

  for (const pkg of packages) {
    await assertPackageVersionVisible(pkg)

    const assets = getRelevantAssets(pkg.manifest)
    for (const assetPath of assets) {
      for (const provider of cdnProviders) {
        assetChecks.push(() => assertCdnAssetAvailable(provider, pkg, assetPath))
      }
    }
  }

  await runWithConcurrency(assetChecks, cdnConcurrency)

  const assetCount = packages.reduce(
    (count, pkg) => count + getRelevantAssets(pkg.manifest).length * cdnProviders.length,
    0
  )
  console.log(
    `[release-published] verified npm visibility for ${packages.length} packages and ${assetCount} CDN assets`
  )
}

await main()
