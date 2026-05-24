import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')

const packageName = process.argv[2]

if (!packageName) {
  console.error('[prepare-build-artifacts] Missing package name argument.')
  process.exit(1)
}

const packageRoot = path.join(repoRoot, 'packages', packageName)
const manifestPath = path.join(packageRoot, 'package.json')
const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'))
const buildArtifacts = manifest.buildArtifacts ?? {}
const cleanTargets = Array.isArray(buildArtifacts.clean) ? buildArtifacts.clean : []
const placeholders = Array.isArray(buildArtifacts.placeholders) ? buildArtifacts.placeholders : []

for (const target of cleanTargets) {
  await fs.rm(path.join(packageRoot, target), { recursive: true, force: true })
}

for (const placeholder of placeholders) {
  if (!placeholder?.path) continue

  const outputPath = path.join(packageRoot, placeholder.path)
  await fs.mkdir(path.dirname(outputPath), { recursive: true })
  await fs.writeFile(outputPath, placeholder.contents ?? '', 'utf8')
}

console.log(`[prepare-build-artifacts] Prepared ${packageName}`)
