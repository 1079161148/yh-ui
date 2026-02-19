/**
 * postinstall 脚本
 * 在 packages/theme 下创建 styles → src/styles 的符号链接
 * 解决 Sass 编译时 @use '@yh-ui/theme/styles/...' 路径解析问题
 *
 * 原因：mkdist 的 Sass loader 使用 loadPaths: ['node_modules'] 解析包路径，
 * 但 Sass 不理解 package.json 的 exports 字段，只能通过物理目录结构查找文件。
 * 此符号链接使 node_modules/@yh-ui/theme/styles → node_modules/@yh-ui/theme/src/styles，
 * 从而让 Sass 直接找到样式文件。
 */
import { existsSync, symlinkSync, unlinkSync, lstatSync } from 'fs'
import { resolve, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const themePkg = resolve(__dirname, '../packages/theme')
const link = join(themePkg, 'styles')
const target = join(themePkg, 'src', 'styles')

try {
  if (existsSync(link)) {
    const stat = lstatSync(link)
    if (stat.isSymbolicLink() || stat.isDirectory()) {
      // 已存在，跳过
      console.log('[postinstall] theme/styles link already exists, skipping.')
      process.exit(0)
    }
  }

  symlinkSync(target, link, 'junction')
  console.log('[postinstall] Created junction: packages/theme/styles → src/styles')
} catch (err) {
  // 在 CI 或权限不足时不阻塞安装
  console.warn('[postinstall] Warning: Could not create theme/styles junction:', err.message)
}
