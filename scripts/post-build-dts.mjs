import { promises as fs } from 'node:fs'
import { join, relative, dirname } from 'node:path'

async function copyRecursive(src, dest) {
  const stats = await fs.stat(src)
  if (stats.isDirectory()) {
    await fs.mkdir(dest, { recursive: true })
    const files = await fs.readdir(src)
    for (const file of files) {
      await copyRecursive(join(src, file), join(dest, file))
    }
  } else {
    await fs.copyFile(src, dest)
  }
}

async function main() {
  const rootDir = process.cwd()
  const distDir = join(rootDir, 'dist')
  const nestedSrcDir = join(distDir, 'packages', 'components', 'src')

  try {
    // 检查嵌套目录是否存在
    const exists = await fs
      .access(nestedSrcDir)
      .then(() => true)
      .catch(() => false)

    if (exists) {
      console.log(`[post-build-dts] Flattening nested structure from ${nestedSrcDir}`)

      // 遍历嵌套目录下的所有内容
      const items = await fs.readdir(nestedSrcDir)
      for (const item of items) {
        const src = join(nestedSrcDir, item)
        const dest = join(distDir, item)
        await copyRecursive(src, dest)
      }

      // 清空嵌套的 packages 目录
      const packagesDir = join(distDir, 'packages')
      await fs.rm(packagesDir, { recursive: true, force: true })

      // 清空 __tests__ 文件夹（如果生成了的话）
      const testsDir = join(distDir, '__tests__')
      await fs.rm(testsDir, { recursive: true, force: true })

      console.log('[post-build-dts] Successfully flattened dist directory.')
    } else {
      console.log('[post-build-dts] No nested packages/components/src found. Skipping flattening.')
    }

    // 额外操作：拷贝根部的 .d.ts 文件（如果没被拷贝过去的话）
    const srcDir = join(rootDir, 'src')
    const files = await fs.readdir(srcDir)
    for (const file of files) {
      if (file.endsWith('.d.ts')) {
        await fs.copyFile(join(srcDir, file), join(distDir, file))
      }
    }
  } catch (error) {
    console.error('[post-build-dts] Error:', error)
    process.exit(1)
  }
}

main()
