import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')
const rootManifestPath = path.join(repoRoot, 'package.json')
const changelogPath = path.join(repoRoot, 'CHANGELOG.md')

function stripBom(source) {
  return source.charCodeAt(0) === 0xfeff ? source.slice(1) : source
}

async function readJson(filePath) {
  return JSON.parse(stripBom(await fs.readFile(filePath, 'utf8')))
}

function getSection(source, version) {
  const escapedVersion = version.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const headingPattern = new RegExp(`^## \\[${escapedVersion}\\][^\\n]*`, 'm')
  const headingMatch = headingPattern.exec(source)

  if (!headingMatch) return ''

  const sectionStart = headingMatch.index
  const afterHeading = sectionStart + headingMatch[0].length
  const nextHeadingMatch = /^## \[/m.exec(source.slice(afterHeading))
  const sectionEnd = nextHeadingMatch ? afterHeading + nextHeadingMatch.index : source.length
  const body = source.slice(afterHeading, sectionEnd).trim()

  return `## YH-UI v${version}\n\n${body}\n\n---\n\n- npm: https://www.npmjs.com/package/@yh-ui/yh-ui\n- Documentation: https://1079161148.github.io/yh-ui/\n`
}

async function main() {
  const outputIndex = process.argv.indexOf('--output')
  const outputPath =
    outputIndex === -1 ? '' : path.resolve(process.cwd(), process.argv[outputIndex + 1] ?? '')

  const rootManifest = await readJson(rootManifestPath)
  const version = rootManifest.version

  if (!version) {
    throw new Error('Root package.json is missing a version field')
  }

  const changelog = stripBom(await fs.readFile(changelogPath, 'utf8'))
  const notes = getSection(changelog, version)

  if (!notes) {
    throw new Error(`CHANGELOG.md is missing an entry for ${version}`)
  }

  if (/\bTODO\b/.test(notes)) {
    throw new Error(`CHANGELOG.md entry for ${version} still contains TODO placeholders`)
  }

  if (outputPath) {
    await fs.writeFile(outputPath, notes, 'utf8')
    console.log(`[release-notes] wrote ${outputPath}`)
    return
  }

  process.stdout.write(notes)
}

await main()
