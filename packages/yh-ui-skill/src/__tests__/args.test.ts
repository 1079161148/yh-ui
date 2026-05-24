/*
 * @File name:
 * @Author: 1079161148@qq.com
 * @Version: V1.0
 * @Date: 2026-05-23 11:17:17
 * @Description:
 * Copyright (C) 2024-{year} Tsing Micro Technology Inc All rights reserved.
 */
import { describe, expect, it } from 'vitest'
import { parseArgs } from '../args'
import { resolveInstallPlan } from '../targets'

describe('parseArgs', () => {
  it('parses install options', () => {
    expect(parseArgs(['install', '--target', 'cursor', '--force', '--dry-run'])).toMatchObject({
      command: 'install',
      target: 'cursor',
      force: true,
      dryRun: true
    })
  })

  it('parses doctor output options', () => {
    expect(parseArgs(['doctor', '--target', 'codex', '--json'])).toMatchObject({
      command: 'doctor',
      target: 'codex',
      json: true
    })
  })
})

describe('resolveInstallPlan', () => {
  it('uses the target default directory when outDir is omitted', () => {
    expect(resolveInstallPlan({ cwd: 'E:/demo', target: 'project' }).skillDir).toBe(
      'E:\\demo\\.yh-ui\\skills\\yh-ui'
    )
  })

  it('uses outDir as the base directory override', () => {
    const plan = resolveInstallPlan({ cwd: 'E:/demo', target: 'cursor', outDir: './custom-skill' })

    expect(plan.baseDir).toBe('E:\\demo\\custom-skill')
    expect(plan.manifestPath).toBe('E:\\demo\\custom-skill\\yh-ui-skill.manifest.json')
  })
})
