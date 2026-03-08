/**
 * postinstall 脚本
 * 解决 Sass 编译时 @use '@yh-ui/theme/styles/...' 路径解析问题
 *
 * 原因：mkdist 的 Sass loader 使用 loadPaths: ['node_modules'] 解析包路径，
 * 但 Sass 不理解 package.json 的 exports 字段，只能通过物理目录结构查找文件。
 *
 * 解决方案：在 packages/theme/ 根目录下建立 styles/ 目录（指向 src/styles），
 * 使 SASS 能通过 node_modules/@yh-ui/theme/styles/... 路径访问到 scss 源文件。
 *
 * 注意：Windows 下两层 junction 嵌套（components/node_modules → packages/theme，
 * 再 packages/theme/styles → src/styles）会导致内层 junction 无法穿透访问。
 * 因此使用 cpSync 直接复制替代 junction，确保可靠性。
 */
import { existsSync, lstatSync, cpSync, rmSync, mkdirSync, readdirSync, symlinkSync } from 'fs'
import { execSync } from 'child_process'
import { resolve, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const themePkg = resolve(__dirname, '../packages/theme')
const stylesLink = join(themePkg, 'styles')
const stylesSrc = join(themePkg, 'src', 'styles')

/** 检查路径是否真正可访问（区分损坏的 junction） */
function isAccessible(p) {
  try {
    readdirSync(p)
    return true
  } catch {
    return false
  }
}

/** 强制删除已有的 styles 路径（junction 或目录） */
function forceRemove(p) {
  try {
    const stat = lstatSync(p)
    if (stat.isSymbolicLink()) {
      // 符号链接直接 unlink
      rmSync(p)
    } else {
      // Windows junction 或普通目录
      try {
        execSync(`rmdir "${p}"`, { stdio: 'ignore' })
      } catch {
        rmSync(p, { recursive: true, force: true })
      }
    }
  } catch {
    // 忽略删除失败
  }
}

try {
  // 1. 检查已存在且可访问 → 跳过
  if (existsSync(stylesLink) && isAccessible(stylesLink)) {
    console.log('[postinstall] theme/styles already exists and is accessible, skipping.')
    process.exit(0)
  }

  // 2. 存在但不可访问（损坏的 junction）→ 删除
  if (existsSync(stylesLink)) {
    console.log('[postinstall] theme/styles exists but is not accessible, cleaning up...')
    forceRemove(stylesLink)
  }

  // 3. 先尝试创建 junction（轻量级）
  let junctionOk = false
  try {
    symlinkSync(stylesSrc, stylesLink, 'junction')
    if (isAccessible(stylesLink)) {
      junctionOk = true
      console.log('[postinstall] Created junction: packages/theme/styles → src/styles')
    } else {
      // junction 创建成功但不可访问，移除后走复制方案
      forceRemove(stylesLink)
    }
  } catch {
    // junction 创建失败，走复制方案
  }

  // 4. junction 不可用时回退到 cpSync 复制
  if (!junctionOk) {
    mkdirSync(stylesLink, { recursive: true })
    cpSync(stylesSrc, stylesLink, { recursive: true, force: true })
    console.log('[postinstall] Copied src/styles → styles/ (cpSync fallback, junction unavailable)')
  }
} catch (err) {
  // 在 CI 或权限不足时不阻塞安装
  console.warn('[postinstall] Warning: Could not setup theme/styles:', err.message)
}
