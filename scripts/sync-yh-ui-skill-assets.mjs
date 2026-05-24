import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')
const packageRoot = path.resolve(repoRoot, 'packages/yh-ui-skill')
const assetsRoot = path.resolve(packageRoot, 'assets')
const sourceSkillDir = path.resolve(repoRoot, 'skills/yh-ui')
const sourceLlmsPath = path.resolve(repoRoot, 'llms.txt')
const sourceLlmsFullPath = path.resolve(repoRoot, 'llms-full.txt')

const packageJson = JSON.parse(
  await readFile(path.resolve(packageRoot, 'package.json'), 'utf8')
)

await rm(assetsRoot, { recursive: true, force: true })
await mkdir(path.resolve(assetsRoot, 'skills'), { recursive: true })
await cp(sourceSkillDir, path.resolve(assetsRoot, 'skills/yh-ui'), { recursive: true })
await cp(sourceLlmsPath, path.resolve(assetsRoot, 'llms.txt'))
await cp(sourceLlmsFullPath, path.resolve(assetsRoot, 'llms-full.txt'))
await writeFile(
  path.resolve(assetsRoot, 'metadata.json'),
  `${JSON.stringify(
    {
      packageName: packageJson.name,
      version: packageJson.version
    },
    null,
    2
  )}\n`,
  'utf8'
)

console.log('[yh-ui-skill] synchronized packaged assets')
