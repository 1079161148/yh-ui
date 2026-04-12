import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')
const packagesRoot = path.join(repoRoot, 'packages')
const rootManifestPath = path.join(repoRoot, 'package.json')
const sandboxSourcePath = path.join(
  repoRoot,
  'docs',
  '.vitepress',
  'theme',
  'utils',
  'demo-sandbox.ts'
)

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
      packages.push({
        dirName: entry.name,
        manifestPath,
        manifest
      })
    } catch {
      // ignore non-package directories
    }
  }

  return packages.sort((a, b) => a.manifest.name.localeCompare(b.manifest.name))
}

function collectVersionMismatches(rootVersion, packages) {
  return packages
    .filter((pkg) => pkg.manifest.version !== rootVersion)
    .map(
      (pkg) =>
        `${pkg.manifest.name} uses ${pkg.manifest.version}, expected ${rootVersion} from root package.json`
    )
}

function collectWorkspaceDependencyMismatches(rootVersion, packages) {
  const packageNames = new Set(packages.map((pkg) => pkg.manifest.name))
  const mismatches = []
  const dependencyFields = ['dependencies', 'optionalDependencies', 'peerDependencies']

  for (const pkg of packages) {
    for (const field of dependencyFields) {
      for (const [name, value] of Object.entries(pkg.manifest[field] ?? {})) {
        if (!packageNames.has(name)) continue
        if (value === 'workspace:*') continue
        if (value === rootVersion || value === `^${rootVersion}` || value === `~${rootVersion}`) {
          continue
        }

        mismatches.push(
          `${pkg.manifest.name} -> ${field}.${name} is "${value}", expected "workspace:*" or ${rootVersion}`
        )
      }
    }
  }

  return mismatches
}

async function verifySandboxVersionConstant(expectedVersion) {
  const source = await fs.readFile(sandboxSourcePath, 'utf8')
  const dynamicPattern =
    /const\s+YH_UI_VERSION\s*=\s*yhUiPackage\.version\b|const\s*\{\s*version\s*:\s*YH_UI_VERSION\s*\}\s*=\s*yhUiPackage\b/
  if (dynamicPattern.test(source)) {
    return
  }

  const literalMatch = source.match(/const\s+YH_UI_VERSION\s*=\s*['"]([^'"]+)['"]/)
  if (!literalMatch) {
    throw new Error(`Could not resolve YH_UI_VERSION strategy in ${sandboxSourcePath}`)
  }

  const actualVersion = literalMatch[1]
  if (actualVersion !== expectedVersion) {
    throw new Error(
      `demo-sandbox.ts uses YH_UI_VERSION=${actualVersion}, expected ${expectedVersion}`
    )
  }
}

async function main() {
  const rootManifest = await readJson(rootManifestPath)
  const rootVersion = rootManifest.version
  const packages = await getWorkspacePackages()

  if (!rootVersion) {
    throw new Error('Root package.json is missing a version field')
  }

  const errors = [
    ...collectVersionMismatches(rootVersion, packages),
    ...collectWorkspaceDependencyMismatches(rootVersion, packages)
  ]

  await verifySandboxVersionConstant(rootVersion)

  if (errors.length > 0) {
    throw new Error(`Release version checks failed:\n- ${errors.join('\n- ')}`)
  }

  console.log(
    `[release-version] verified ${packages.length} workspace packages against version ${rootVersion}`
  )
}

await main()
