import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import * as sass from 'sass'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')

const packageName = process.argv[2]

if (!packageName) {
  console.error('[post-build-styles] Missing package name argument.')
  process.exit(1)
}

const packageRoot = path.join(repoRoot, 'packages', packageName)
const distDir = path.join(packageRoot, 'dist')
const themeEntry = path.join(repoRoot, 'packages', 'theme', 'src', 'styles', 'index.scss')
const styleOutput = path.join(distDir, 'style.css')

async function exists(target) {
  try {
    await fs.access(target)
    return true
  } catch {
    return false
  }
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)))
    } else {
      files.push(fullPath)
    }
  }

  return files
}

function rewriteStyleImports(contents) {
  return contents.replace(/((?:import|require)\s*(?:\(|['"\s]).*?)(\.s[ac]ss)(['")])/g, '$1.css$3')
}

async function rewriteDistImports() {
  if (!(await exists(distDir))) {
    return
  }

  const files = await walk(distDir)
  const textFileRE = /\.(?:mjs|cjs|d\.ts|d\.mts|d\.cts|ts)$/

  await Promise.all(
    files
      .filter((file) => textFileRE.test(file))
      .map(async (file) => {
        const source = await fs.readFile(file, 'utf8')
        const rewritten = rewriteStyleImports(source)
        if (rewritten !== source) {
          await fs.writeFile(file, rewritten, 'utf8')
        }
      })
  )
}

async function emitBaseStyleBundle() {
  const css = sass.compile(themeEntry, {
    loadPaths: [path.join(repoRoot, 'node_modules')]
  }).css

  await fs.writeFile(styleOutput, `${css}\n`, 'utf8')
}

await rewriteDistImports()
await emitBaseStyleBundle()

console.log(`[post-build-styles] Processed ${packageName}`)
