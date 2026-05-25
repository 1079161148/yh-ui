import { spawn } from 'node:child_process'
import readline from 'node:readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
})

let hasRefs = false
let isTagPush = false
let isDeletePush = false

rl.on('line', (line) => {
  hasRefs = true
  const parts = line.split(' ')
  if (parts.length >= 4) {
    const [localRef, localSha, remoteRef, remoteSha] = parts
    // Check if it's a tag push
    if (localRef.startsWith('refs/tags/') || remoteRef.startsWith('refs/tags/')) {
      isTagPush = true
    }
    // Check if it's a delete operation (40 zeros or '(delete)')
    const zeroSha = '0000000000000000000000000000000000000000'
    if (localSha === zeroSha || localRef === '(delete)' || remoteSha === zeroSha) {
      isDeletePush = true
    }
  }
})

rl.on('close', async () => {
  // If run manually without stdin refs, run validation by default
  if (!hasRefs) {
    console.log('[pre-push] No refs received via stdin. Running default validation...')
    await runValidation()
    return
  }

  if (isDeletePush) {
    console.log('[pre-push] Delete action detected. Skipping local checks...')
    process.exit(0)
  }

  if (isTagPush) {
    console.log('[pre-push] Tag push detected. Skipping local checks...')
    process.exit(0)
  }

  console.log('[pre-push] Branch push detected. Running quick validation...')
  await runValidation()
})

function runCmd(cmd, args) {
  return new Promise((resolve) => {
    const child = spawn(cmd, args, { stdio: 'inherit', shell: true })
    child.on('close', (code) => {
      resolve(code)
    })
  })
}

async function runValidation() {
  console.log('[pre-push] Running typecheck...')
  const typecheckCode = await runCmd('pnpm', ['typecheck'])
  if (typecheckCode !== 0) {
    console.error('[pre-push] Typecheck failed!')
    process.exit(1)
  }

  console.log('[pre-push] Running lint...')
  const lintCode = await runCmd('pnpm', ['lint'])
  if (lintCode !== 0) {
    console.error('[pre-push] Lint failed!')
    process.exit(1)
  }

  console.log('[pre-push] All checks passed!')
  process.exit(0)
}
