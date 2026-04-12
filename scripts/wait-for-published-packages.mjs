import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { spawn } from 'node:child_process'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')
const packagesRoot = path.join(repoRoot, 'packages')
const registry = process.env.NPM_REGISTRY_URL || 'https://registry.npmjs.org'
const timeoutMs = Number(process.env.PUBLISH_WAIT_TIMEOUT_MS || 10 * 60 * 1000)
const pollIntervalMs = Number(process.env.PUBLISH_WAIT_INTERVAL_MS || 15 * 1000)
const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm'

function stripBom(source) {
  return source.charCodeAt(0) === 0xfeff ? source.slice(1) : source
}

async function readJson(filePath) {
  return JSON.parse(stripBom(await fs.readFile(filePath, 'utf8')))
}

function run(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: options.cwd,
      env: options.env ?? process.env,
      stdio: options.stdio ?? 'inherit',
      shell: process.platform === 'win32'
    })

    let stdout = ''
    let stderr = ''

    if (options.captureOutput) {
      child.stdout?.on('data', (chunk) => {
        stdout += chunk.toString()
      })
      child.stderr?.on('data', (chunk) => {
        stderr += chunk.toString()
      })
    }

    child.on('error', reject)
    child.on('close', (code) => {
      if (code === 0) {
        resolve({ stdout, stderr })
        return
      }

      const error = new Error(`${command} ${args.join(' ')} exited with code ${code}`)
      error.code = code
      error.stdout = stdout
      error.stderr = stderr
      reject(error)
    })
  })
}

async function getWorkspacePackages() {
  const entries = await fs.readdir(packagesRoot, { withFileTypes: true })
  const packages = []

  for (const entry of entries) {
    if (!entry.isDirectory()) continue

    const manifestPath = path.join(packagesRoot, entry.name, 'package.json')
    try {
      const manifest = await readJson(manifestPath)
      if (manifest?.name && manifest?.version) {
        packages.push({ name: manifest.name, version: manifest.version })
      }
    } catch {
      // ignore
    }
  }

  return packages.sort((a, b) => a.name.localeCompare(b.name))
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
    const output = `${error.stderr ?? ''}${error.stdout ?? ''}`
    if (output.includes('E404') || output.includes('404') || output.includes('No match found')) {
      return false
    }

    throw error
  }
}

async function main() {
  const packages = await getWorkspacePackages()
  const deadline = Date.now() + timeoutMs

  while (Date.now() < deadline) {
    const pending = []

    for (const pkg of packages) {
      if (!(await isVersionPublished(pkg.name, pkg.version))) {
        pending.push(`${pkg.name}@${pkg.version}`)
      }
    }

    if (pending.length === 0) {
      console.log('[publish-wait] all workspace packages are visible on npm')
      return
    }

    console.log(`[publish-wait] waiting for npm visibility: ${pending.join(', ')}`)
    await new Promise((resolve) => setTimeout(resolve, pollIntervalMs))
  }

  throw new Error(`Timed out waiting for published workspace packages to appear on npm within ${timeoutMs}ms`)
}

await main()
