import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { spawn } from 'node:child_process'
import { gunzipSync } from 'node:zlib'

const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm'

function stripBom(source) {
  return source.charCodeAt(0) === 0xfeff ? source.slice(1) : source
}

function readCString(buffer) {
  const nulIndex = buffer.indexOf(0)
  const slice = nulIndex === -1 ? buffer : buffer.subarray(0, nulIndex)
  return slice.toString('utf8').trim()
}

function parseTarOctal(buffer) {
  const raw = readCString(buffer).replace(/\0/g, '').trim()
  return raw ? Number.parseInt(raw, 8) : 0
}

function extractPackJson(stdout) {
  const trimmed = stdout.trim()
  if (!trimmed) {
    throw new Error('npm pack produced no JSON output')
  }

  const arrayStart = trimmed.lastIndexOf('\n[')
  const jsonText = arrayStart >= 0 ? trimmed.slice(arrayStart + 1) : trimmed
  return JSON.parse(jsonText)
}

export function findProtocolLeaks(manifest) {
  const leaks = []

  for (const field of [
    'dependencies',
    'peerDependencies',
    'optionalDependencies',
    'devDependencies'
  ]) {
    for (const [name, version] of Object.entries(manifest[field] ?? {})) {
      if (typeof version !== 'string') continue
      if (!version.includes('workspace:') && !version.includes('catalog:')) continue
      leaks.push(`${field}.${name}=${version}`)
    }
  }

  return leaks
}

export function formatProtocolLeaks(leaks) {
  return leaks.map((item) => `- ${item}`).join('\n')
}

export function run(command, args, options = {}) {
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

export async function readPackagedManifest(tarballPath) {
  const archiveBuffer = gunzipSync(await fs.readFile(tarballPath))
  let offset = 0

  while (offset + 512 <= archiveBuffer.length) {
    const header = archiveBuffer.subarray(offset, offset + 512)
    if (header.every((byte) => byte === 0)) {
      break
    }

    const name = readCString(header.subarray(0, 100))
    const prefix = readCString(header.subarray(345, 500))
    const fullName = prefix ? `${prefix}/${name}` : name
    const size = parseTarOctal(header.subarray(124, 136))
    const contentStart = offset + 512
    const contentEnd = contentStart + size

    if (fullName === 'package/package.json') {
      return JSON.parse(stripBom(archiveBuffer.subarray(contentStart, contentEnd).toString('utf8')))
    }

    offset = contentStart + Math.ceil(size / 512) * 512
  }

  throw new Error(`Unable to find package/package.json inside ${tarballPath}`)
}

export async function packPackage(packageDir) {
  const packed = await run(npmCommand, ['pack', '--json'], {
    cwd: packageDir,
    captureOutput: true,
    stdio: ['ignore', 'pipe', 'pipe']
  })
  const packEntries = extractPackJson(packed.stdout)
  const tarballName = packEntries[0]?.filename

  if (!tarballName) {
    throw new Error(`Unable to determine tarball filename for ${packageDir}`)
  }

  const tarballPath = path.join(packageDir, tarballName)
  const manifest = await readPackagedManifest(tarballPath)

  return {
    tarballName,
    tarballPath,
    manifest,
    packEntries
  }
}
