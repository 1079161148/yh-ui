import { execSync } from 'child_process'

const packages = [
  'packages/utils',
  'packages/hooks',
  'packages/locale',
  'packages/theme',
  'packages/components',
  'packages/yh-ui',
  'packages/nuxt'
]

console.log('Starting full project type check...')

let allPassed = true

for (const pkg of packages) {
  process.stdout.write(`Checking ${pkg}... `)
  try {
    execSync(`npx vue-tsc --noEmit -p ${pkg}/tsconfig.json`, { stdio: 'pipe' })
    console.log('✅ Passed')
  } catch (error) {
    console.log('❌ Failed')
    console.error(error.stdout.toString())
    allPassed = false
  }
}

if (allPassed) {
  console.log('\n✨ All packages passed type check!')
  process.exit(0)
} else {
  console.log('\n❌ Type check failed for some packages.')
  process.exit(1)
}
