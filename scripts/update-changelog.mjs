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

function getToday() {
  return new Date().toISOString().slice(0, 10)
}

function getCurrentVersionSection(source, version) {
  const escapedVersion = version.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const headingPattern = new RegExp(`^## \\[${escapedVersion}\\][^\\n]*`, 'm')
  const headingMatch = headingPattern.exec(source)

  if (!headingMatch) return ''

  const sectionStart = headingMatch.index
  const afterHeading = sectionStart + headingMatch[0].length
  const nextHeadingMatch = /^## \[/m.exec(source.slice(afterHeading))
  const sectionEnd = nextHeadingMatch ? afterHeading + nextHeadingMatch.index : source.length

  return source.slice(sectionStart, sectionEnd)
}

function createTemplate(version) {
  return `## [${version}] - ${getToday()}

> TODO: 发布前补充本版本面向用户的变更摘要，并删除这一行。

### Added

- TODO: 记录新增能力、组件、文档或公开 API。

### Changed

- TODO: 记录行为变化、体验优化、工程调整或文档重整。

### Fixed

- TODO: 记录 bug 修复、兼容性修复或发布流程修复。

### Notes

- TODO: 记录迁移提示、兼容性边界、验证结果或其他发布说明。

`
}

function insertVersionSection(source, version) {
  const firstVersionHeading = source.search(/^## \[/m)
  const section = createTemplate(version)

  if (firstVersionHeading === -1) {
    const normalized = source.endsWith('\n') ? source : `${source}\n`
    return `${normalized}\n${section}`
  }

  const before = source.slice(0, firstVersionHeading)
  const after = source.slice(firstVersionHeading)
  return `${before}${section}${after}`
}

async function main() {
  const isCheck = process.argv.includes('--check')
  const rootManifest = await readJson(rootManifestPath)
  const version = rootManifest.version

  if (!version) {
    throw new Error('Root package.json is missing a version field')
  }

  const source = stripBom(await fs.readFile(changelogPath, 'utf8'))
  const section = getCurrentVersionSection(source, version)

  if (!section) {
    if (isCheck) {
      throw new Error(
        `CHANGELOG.md is missing an entry for ${version}. Run "pnpm changelog:prepare" and fill it before release.`
      )
    }

    await fs.writeFile(changelogPath, insertVersionSection(source, version), 'utf8')
    console.log(`[changelog] inserted ${version} template into CHANGELOG.md`)
    return
  }

  if (isCheck && /\bTODO\b/.test(section)) {
    throw new Error(
      `CHANGELOG.md entry for ${version} still contains TODO placeholders. Fill them before release.`
    )
  }

  console.log(`[changelog] ${isCheck ? 'verified' : 'found'} ${version} in CHANGELOG.md`)
}

await main()
