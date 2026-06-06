import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { packPackage, findProtocolLeaks, formatProtocolLeaks } from './packed-manifest-utils.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')
const packagesRoot = path.join(repoRoot, 'packages')

async function getWorkspacePackages() {
  const entries = await fs.readdir(packagesRoot, { withFileTypes: true })
  const packages = []

  for (const entry of entries) {
    if (!entry.isDirectory()) continue

    const packageDir = path.join(packagesRoot, entry.name)
    const packageJsonPath = path.join(packageDir, 'package.json')

    try {
      const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf8'))
      packages.push({
        dir: packageDir,
        name: packageJson.name
      })
    } catch {
      // ignore
    }
  }

  return packages.sort((left, right) => left.name.localeCompare(right.name))
}

async function main() {
  const packages = await getWorkspacePackages()
  const failures = []

  for (const pkg of packages) {
    let tarballPath = null

    try {
      const packed = await packPackage(pkg.dir)
      tarballPath = packed.tarballPath
      const leaks = findProtocolLeaks(packed.manifest)

      if (leaks.length > 0) {
        failures.push(`${pkg.name}\n${formatProtocolLeaks(leaks)}`)
      } else {
        console.log(`[packed-manifest] verified ${pkg.name}`)
      }
    } finally {
      if (tarballPath) {
        await fs.rm(tarballPath, { force: true })
      }
    }
  }

  if (failures.length > 0) {
    throw new Error(
      `Packed manifest validation failed. The following tarballs still contain workspace/catalog protocols:\n\n${failures.join('\n\n')}`
    )
  }
}

await main()
