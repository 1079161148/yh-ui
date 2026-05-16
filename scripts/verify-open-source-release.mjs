import { spawn } from 'node:child_process'
import process from 'node:process'

const isWin = process.platform === 'win32'
const pnpm = isWin ? 'pnpm.cmd' : 'pnpm'

const steps = [
  ['format:check'],
  ['typecheck'],
  ['lint'],
  ['test:ci'],
  ['build'],
  ['verify:package-size'],
  ['verify:release-versions'],
  ['changelog:check'],
  ['verify:component-quality'],
  ['verify:a11y'],
  ['verify:consumer-smoke'],
  ['verify:playgrounds'],
  ['verify:visual-regression'],
  ['docs:build'],
  ['verify:docs-i18n'],
  ['verify:stackblitz-local'],
  ['verify:docs-playground']
]

function runStep(args) {
  return new Promise((resolve, reject) => {
    const label = `pnpm ${args.join(' ')}`
    console.log(`\n[open-source-release] ${label}`)

    const child = spawn(pnpm, args, {
      cwd: process.cwd(),
      env: {
        ...process.env,
        NODE_OPTIONS: process.env.NODE_OPTIONS || '--max-old-space-size=6144'
      },
      shell: isWin,
      stdio: 'inherit',
      windowsHide: true
    })

    child.on('error', reject)
    child.on('close', (code) => {
      if (code === 0) {
        resolve()
        return
      }

      reject(new Error(`${label} failed with exit code ${code}`))
    })
  })
}

for (const step of steps) {
  await runStep(step)
}

console.log('\n[open-source-release] all local release gates passed')
