import { mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises'
import { dirname, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = resolve(fileURLToPath(new URL('.', import.meta.url)), '..')
const cacheDir = resolve(rootDir, 'docs/.vitepress/cache/runtime-build')

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

async function walkFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const absolutePath = resolve(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await walkFiles(absolutePath)))
      continue
    }

    if (entry.isFile()) {
      files.push(absolutePath)
    }
  }

  return files.sort()
}

async function expandInputFiles(inputs) {
  const files = new Set()

  for (const inputPath of inputs) {
    const absolutePath = resolve(inputPath)
    const fileStat = await stat(absolutePath)
    if (fileStat.isDirectory()) {
      for (const childFile of await walkFiles(absolutePath)) {
        files.add(childFile)
      }
      continue
    }

    files.add(absolutePath)
  }

  return [...files].sort()
}

export async function computeFingerprint(inputs) {
  const files = await expandInputFiles(inputs)
  const parts = []

  for (const filePath of files) {
    const fileStat = await stat(filePath)
    parts.push(
      JSON.stringify({
        path: relative(rootDir, filePath).replace(/\\/g, '/'),
        size: fileStat.size,
        mtimeMs: Math.trunc(fileStat.mtimeMs)
      })
    )
  }

  return parts.join('\n')
}

function getCacheFile(name) {
  return resolve(cacheDir, `${name}.json`)
}

export async function shouldSkipCachedBuild(name, fingerprint, outputs) {
  const cacheFile = getCacheFile(name)
  if (!(await exists(cacheFile))) {
    return false
  }

  for (const outputPath of outputs) {
    if (!(await exists(outputPath))) {
      return false
    }
  }

  try {
    const cached = JSON.parse(await readFile(cacheFile, 'utf8'))
    return cached.fingerprint === fingerprint
  } catch {
    return false
  }
}

export async function updateBuildCache(name, fingerprint, outputs) {
  const cacheFile = getCacheFile(name)
  await ensureDir(dirname(cacheFile))
  await writeFile(
    cacheFile,
    JSON.stringify(
      {
        fingerprint,
        outputs: outputs.map((outputPath) => relative(rootDir, outputPath).replace(/\\/g, '/'))
      },
      null,
      2
    ) + '\n',
    'utf8'
  )
}
