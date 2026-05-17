import { spawn } from 'node:child_process'
import process from 'node:process'

const isWin = process.platform === 'win32'
const pnpm = isWin ? 'pnpm.cmd' : 'pnpm'
const heartbeatIntervalMs = 60_000

const steps = [
  { id: 'format', args: ['format:check'], timeoutMinutes: 5 },
  { id: 'typecheck', args: ['typecheck'], timeoutMinutes: 10 },
  { id: 'lint', args: ['lint'], timeoutMinutes: 10 },
  { id: 'tests', args: ['test:ci'], timeoutMinutes: 20 },
  { id: 'build', args: ['build'], timeoutMinutes: 20 },
  { id: 'package-size', args: ['verify:package-size'], timeoutMinutes: 5 },
  { id: 'release-versions', args: ['verify:release-versions'], timeoutMinutes: 5 },
  { id: 'changelog', args: ['changelog:check'], timeoutMinutes: 5 },
  { id: 'component-quality', args: ['verify:component-quality'], timeoutMinutes: 5 },
  { id: 'a11y', args: ['verify:a11y'], timeoutMinutes: 15 },
  { id: 'consumer-smoke', args: ['verify:consumer-smoke'], timeoutMinutes: 10 },
  { id: 'playgrounds', args: ['verify:playgrounds'], timeoutMinutes: 15 },
  { id: 'visual-regression', args: ['verify:visual-regression'], timeoutMinutes: 15 },
  { id: 'docs-build', args: ['docs:build'], timeoutMinutes: 15 },
  { id: 'docs-i18n', args: ['verify:docs-i18n'], timeoutMinutes: 5 },
  { id: 'stackblitz-local', args: ['verify:stackblitz-local'], timeoutMinutes: 10 },
  { id: 'docs-sandboxes', args: ['verify:docs-sandboxes'], timeoutMinutes: 20 },
  { id: 'codesandbox-local', args: ['verify:codesandbox-local'], timeoutMinutes: 20 },
  { id: 'docs-playground', args: ['verify:docs-playground'], timeoutMinutes: 10 }
]

function formatDuration(ms) {
  const totalSeconds = Math.max(0, Math.round(ms / 1000))
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  if (hours > 0) {
    return `${hours}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`
  }

  return `${minutes}m ${String(seconds).padStart(2, '0')}s`
}

function printStepList() {
  console.log('[open-source-release] available steps:')
  for (const step of steps) {
    console.log(`- ${step.id}: pnpm ${step.args.join(' ')}`)
  }
}

function selectSteps(allSteps, filters) {
  if (filters.length === 0) {
    return allSteps
  }

  const normalizedFilters = filters.map((filter) => filter.trim().toLowerCase()).filter(Boolean)

  const selected = allSteps.filter((step) => {
    const command = step.args.join(' ').toLowerCase()
    return normalizedFilters.some((filter) => step.id.includes(filter) || command.includes(filter))
  })

  if (selected.length === 0) {
    throw new Error(
      `No release validation steps matched: ${filters.join(', ')}. Use --list to inspect available steps.`
    )
  }

  return selected
}

function createHeartbeat(label, startedAt) {
  const timer = setInterval(() => {
    console.log(
      `[open-source-release] still running ${label} (${formatDuration(Date.now() - startedAt)})`
    )
  }, heartbeatIntervalMs)
  timer.unref?.()
  return timer
}

async function terminateChild(child) {
  if (!child.pid || child.exitCode !== null) {
    return
  }

  if (isWin) {
    await new Promise((resolve) => {
      const killer = spawn('taskkill', ['/pid', String(child.pid), '/t', '/f'], {
        stdio: 'ignore',
        windowsHide: true
      })
      killer.on('close', resolve)
      killer.on('error', resolve)
    })
    return
  }

  try {
    process.kill(-child.pid, 'SIGTERM')
  } catch {}

  await new Promise((resolve) => setTimeout(resolve, 5_000))

  if (child.exitCode === null) {
    try {
      process.kill(-child.pid, 'SIGKILL')
    } catch {}
  }
}

function runStep(step, index, total) {
  return new Promise((resolve, reject) => {
    const label = `pnpm ${step.args.join(' ')}`
    const startedAt = Date.now()
    const prefix = `[open-source-release] (${index + 1}/${total})`
    console.log(`\n${prefix} starting ${step.id}: ${label}`)

    const child = spawn(pnpm, step.args, {
      cwd: process.cwd(),
      env: {
        ...process.env,
        NODE_OPTIONS: process.env.NODE_OPTIONS || '--max-old-space-size=6144'
      },
      detached: !isWin,
      shell: isWin,
      stdio: 'inherit',
      windowsHide: true
    })

    const heartbeat = createHeartbeat(label, startedAt)
    let settled = false
    const timeoutHandle = setTimeout(async () => {
      if (settled) return

      settled = true
      clearInterval(heartbeat)
      console.error(`${prefix} timed out after ${step.timeoutMinutes}m: ${label}`)
      await terminateChild(child)
      reject(new Error(`${label} timed out after ${step.timeoutMinutes} minutes`))
    }, step.timeoutMinutes * 60_000)
    timeoutHandle.unref?.()

    child.on('error', (error) => {
      if (settled) return

      settled = true
      clearTimeout(timeoutHandle)
      clearInterval(heartbeat)
      reject(error)
    })
    child.on('close', (code) => {
      if (settled) return

      settled = true
      clearTimeout(timeoutHandle)
      clearInterval(heartbeat)

      if (code === 0) {
        console.log(`${prefix} completed ${step.id} in ${formatDuration(Date.now() - startedAt)}`)
        resolve()
        return
      }

      reject(new Error(`${label} failed with exit code ${code}`))
    })
  })
}

const cliArgs = process.argv.slice(2)
if (cliArgs.includes('--list')) {
  printStepList()
  process.exit(0)
}

const selectedSteps = selectSteps(
  steps,
  cliArgs.flatMap((arg) => arg.split(','))
)
const startedAt = Date.now()

for (const [index, step] of selectedSteps.entries()) {
  await runStep(step, index, selectedSteps.length)
}

console.log(
  `\n[open-source-release] all selected release gates passed in ${formatDuration(Date.now() - startedAt)}`
)
