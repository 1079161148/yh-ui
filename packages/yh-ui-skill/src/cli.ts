#!/usr/bin/env node

import process from 'node:process'
import { createInterface } from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'
import { INSTALL_TARGETS, type InstallTarget } from './types'
import { parseArgs } from './args'
import {
  autoSelectTarget,
  defaultBaseDirForTarget,
  detectInstallTargetCandidates,
  resolveInstallPlan
} from './targets'
import { getPackageVersion, inspectInstallation, installSkill } from './install'

function printHelp(): void {
  console.log(`YH-UI skill installer

Usage:
  yh-ui-skill install [options]
  yh-ui-skill doctor [options]
  yh-ui-skill --version

Options:
  -t, --target <target>   project | cursor | claude | codex | markdown
  -o, --out-dir <path>    Override the default target directory
  -f, --force             Overwrite an existing installation
      --dry-run           Print the install plan without copying files
      --json              Print machine-readable output
  -h, --help              Show help
  -v, --version           Show package version
`)
}

function resolveTargetSelection(value: string, fallback: InstallTarget): InstallTarget {
  if (!value) {
    return fallback
  }

  const numericIndex = Number(value)
  if (!Number.isNaN(numericIndex) && numericIndex >= 1 && numericIndex <= INSTALL_TARGETS.length) {
    return INSTALL_TARGETS[numericIndex - 1]
  }

  if (INSTALL_TARGETS.includes(value as InstallTarget)) {
    return value as InstallTarget
  }

  throw new Error(`Invalid target "${value}".`)
}

async function promptForInstallOptions(
  cwd: string
): Promise<{ target: InstallTarget; outDir?: string }> {
  const candidates = await detectInstallTargetCandidates(cwd)
  const defaultTarget = candidates.find((candidate) => candidate.detected)?.target ?? 'project'
  const rl = createInterface({ input, output })

  try {
    console.log('Select an installation target:')
    INSTALL_TARGETS.forEach((target, index) => {
      const candidate = candidates.find((item) => item.target === target)
      const detectedLabel = candidate?.detected ? ' [detected]' : ''
      console.log(
        `  ${index + 1}. ${target} (${defaultBaseDirForTarget(target)})${detectedLabel} - ${candidate?.reason ?? ''}`
      )
    })

    const defaultIndex = INSTALL_TARGETS.indexOf(defaultTarget) + 1
    const answer = (await rl.question(`Target [${defaultIndex} ${defaultTarget}]: `)).trim()
    const target = resolveTargetSelection(answer, defaultTarget)
    const defaultDir = defaultBaseDirForTarget(target)
    const override = (
      await rl.question(
        `Directory override (leave blank to use ${defaultDir}, accepts relative or absolute paths): `
      )
    ).trim()

    if (!override) {
      return { target }
    }

    return { target, outDir: override }
  } finally {
    rl.close()
  }
}

async function main(): Promise<void> {
  const parsed = parseArgs(process.argv.slice(2))

  if (parsed.version) {
    console.log(await getPackageVersion())
    return
  }

  if (parsed.command === 'help') {
    printHelp()
    return
  }

  const cwd = process.cwd()
  const resolvedInput =
    parsed.target || parsed.outDir
      ? { target: parsed.target ?? (await autoSelectTarget(cwd)), outDir: parsed.outDir }
      : parsed.command === 'install' && process.stdin.isTTY && process.stdout.isTTY
        ? await promptForInstallOptions(cwd)
        : { target: await autoSelectTarget(cwd), outDir: undefined }

  const options = {
    cwd,
    target: resolvedInput.target,
    outDir: resolvedInput.outDir,
    force: parsed.force,
    dryRun: parsed.dryRun
  }

  if (parsed.command === 'doctor') {
    const result = await inspectInstallation(options)

    if (parsed.json) {
      console.log(JSON.stringify(result, null, 2))
      return
    }

    console.log(`Target: ${result.plan.target}`)
    console.log(`Base dir: ${result.plan.baseDir}`)
    console.log(`Current CLI version: ${result.currentVersion}`)
    console.log(`Installed version: ${result.version ?? 'not installed'}`)

    if (result.exists && result.upToDate) {
      console.log('Status: installed and up to date')
    } else if (result.exists) {
      console.log('Status: installed but needs refresh')
    } else {
      console.log('Status: missing files')
    }

    console.log('Checks:')
    result.checks.forEach((check) => {
      console.log(`- ${check.exists ? 'OK' : 'MISS'} ${check.label}: ${check.path}`)
    })

    const detectedTargets = result.detectedTargets.filter((candidate) => candidate.detected)
    if (detectedTargets.length > 0) {
      console.log('Detected targets:')
      detectedTargets.forEach((candidate) => {
        console.log(`- ${candidate.target}: ${candidate.baseDir} (${candidate.reason})`)
      })
    }

    if (result.exists && result.upToDate) {
      return
    }

    if (result.missingItems.length > 0) {
      console.log('Missing items:')
      result.missingItems.forEach((item) => {
        console.log(`- ${item}`)
      })
    }
    process.exitCode = 1
    return
  }

  const result = await installSkill(options)

  if (parsed.json) {
    console.log(JSON.stringify(result, null, 2))
    return
  }

  const plan = resolveInstallPlan(options)

  if (parsed.dryRun) {
    console.log(`Dry run complete for ${result.version}`)
  } else {
    console.log(`Installed YH-UI skill ${result.version}`)
  }

  console.log(`Target: ${plan.target}`)
  console.log(`Base dir: ${plan.baseDir}`)
  console.log(`Skill: ${plan.skillDir}`)
  console.log(`LLMS: ${plan.llmsPath}`)
  console.log(`LLMS Full: ${plan.llmsFullPath}`)
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error)
  console.error(`yh-ui-skill: ${message}`)
  process.exit(1)
})
