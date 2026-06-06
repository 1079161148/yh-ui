import { INSTALL_TARGETS } from './types'
import { isInstallTarget } from './targets'
import type { ParsedArgs } from './types'

export function parseArgs(argv: string[]): ParsedArgs {
  const parsed: ParsedArgs = {
    command: 'install',
    force: false,
    dryRun: false,
    json: false,
    help: false,
    version: false
  }

  const args = [...argv]
  const first = args[0]

  if (first && !first.startsWith('-')) {
    if (first === 'install' || first === 'doctor' || first === 'help') {
      parsed.command = first
      args.shift()
    } else {
      throw new Error(`Unknown command "${first}".`)
    }
  }

  for (let index = 0; index < args.length; index += 1) {
    const current = args[index]

    switch (current) {
      case '--target':
      case '-t': {
        const value = args[index + 1]
        if (!value) {
          throw new Error(`Missing value for ${current}.`)
        }
        if (!isInstallTarget(value)) {
          throw new Error(
            `Invalid target "${value}". Expected one of: ${INSTALL_TARGETS.join(', ')}.`
          )
        }
        parsed.target = value
        index += 1
        break
      }
      case '--out-dir':
      case '-o': {
        const value = args[index + 1]
        if (!value) {
          throw new Error(`Missing value for ${current}.`)
        }
        parsed.outDir = value
        index += 1
        break
      }
      case '--force':
      case '-f':
        parsed.force = true
        break
      case '--dry-run':
        parsed.dryRun = true
        break
      case '--json':
        parsed.json = true
        break
      case '--help':
      case '-h':
        parsed.help = true
        break
      case '--version':
      case '-v':
        parsed.version = true
        break
      default:
        throw new Error(`Unknown option "${current}".`)
    }
  }

  if (parsed.help) {
    parsed.command = 'help'
  }

  return parsed
}
