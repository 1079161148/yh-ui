import { access, cp, mkdir, rm } from 'node:fs/promises'
import { dirname } from 'node:path'

export async function pathExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath)
    return true
  } catch {
    return false
  }
}

export async function ensureParentDir(filePath: string): Promise<void> {
  await mkdir(dirname(filePath), { recursive: true })
}

export async function copyDirectory(sourceDir: string, targetDir: string): Promise<void> {
  await cp(sourceDir, targetDir, { recursive: true, force: true })
}

export async function copyFile(sourcePath: string, targetPath: string): Promise<void> {
  await ensureParentDir(targetPath)
  await cp(sourcePath, targetPath, { force: true })
}

export async function removePath(filePath: string): Promise<void> {
  await rm(filePath, { recursive: true, force: true })
}
