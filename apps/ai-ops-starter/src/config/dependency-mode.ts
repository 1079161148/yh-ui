import starterPackage from '../../package.json'
import flowPackage from '../../../../packages/flow/package.json'
import requestPackage from '../../../../packages/request/package.json'
import yhUiPackage from '../../../../packages/yh-ui/package.json'

type StarterDependencyMode = 'published' | 'workspace'

const TGZ_VERSION_RE = /(\d+\.\d+\.\d+)\.tgz(?:$|\?)/

const getPublishedVersion = (specifier: string | undefined, fallback: string) => {
  const match = specifier?.match(TGZ_VERSION_RE)
  return match?.[1] ?? fallback
}

export const publishedPackages = {
  ui: getPublishedVersion(starterPackage.dependencies['@yh-ui/yh-ui'], yhUiPackage.version),
  flow: getPublishedVersion(starterPackage.dependencies['@yh-ui/flow'], flowPackage.version),
  request: getPublishedVersion(
    starterPackage.dependencies['@yh-ui/request'],
    requestPackage.version
  )
}

export const workspacePackages = {
  ui: yhUiPackage.version,
  flow: flowPackage.version,
  request: requestPackage.version
}

export const starterDependencyMode: StarterDependencyMode =
  import.meta.env.MODE === 'workspace' ? 'workspace' : 'published'

export const isWorkspaceDependencyMode = starterDependencyMode === 'workspace'

export const dependencyPackages = isWorkspaceDependencyMode ? workspacePackages : publishedPackages

export const dependencyModeMeta = {
  id: starterDependencyMode,
  appKind: isWorkspaceDependencyMode
    ? 'Workspace-source consumer app'
    : 'Published-package consumer app',
  displayLabel: isWorkspaceDependencyMode ? 'local workspace source' : 'npm published tarballs',
  versionLine: isWorkspaceDependencyMode
    ? `UI ${dependencyPackages.ui} / Flow ${dependencyPackages.flow} / Request ${dependencyPackages.request} via workspace aliases`
    : `UI ${dependencyPackages.ui} / Flow ${dependencyPackages.flow} / Request ${dependencyPackages.request}`,
  headerTag: isWorkspaceDependencyMode ? 'workspace dependencies' : 'published dependencies',
  routerDescription: isWorkspaceDependencyMode
    ? 'A workspace-source consumer shell for AI workspace, flow studio, and operations.'
    : 'A published-package consumer shell for AI workspace, flow studio, and operations.',
  controlTowerLead: isWorkspaceDependencyMode
    ? 'This page proves the starter can read like a real product shell while consuming live workspace source.'
    : 'This page proves the first starter can read like a real product shell while consuming only published package artifacts.',
  settingsAlertTitle: isWorkspaceDependencyMode
    ? 'This starter is consuming local workspace packages through Vite aliases, so component-source fixes appear immediately.'
    : 'This starter is consuming published package builds, not local workspace source aliases.',
  evidenceSource: isWorkspaceDependencyMode
    ? 'workspace-source starter'
    : 'published-package starter',
  releaseRingDetail: isWorkspaceDependencyMode
    ? 'Consumer app linked to local workspace packages'
    : 'Consumer app pinned to published package tarballs',
  readinessTitle: isWorkspaceDependencyMode
    ? 'Workspace dependency mode'
    : 'Published dependency mode',
  readinessSummary: isWorkspaceDependencyMode
    ? 'Starter resolves local workspace source so component fixes show up immediately during product-shell validation.'
    : 'Starter installs released tarballs so the app behaves like an external consumer.',
  dashboardEventDetail: isWorkspaceDependencyMode
    ? 'Added apps/* workspace and enabled a workspace-source consumer mode beside published-package verification.'
    : 'Added apps/* workspace and isolated a published-package consumer app.',
  workspaceFeedbackLine: isWorkspaceDependencyMode
    ? 'The starter is now a real consumer app on workspace-linked packages, so feedback from this route reflects local source changes immediately.'
    : 'The starter is now a real consumer app on published packages, so feedback from this route directly reflects external usage.',
  releaseSurfaceMode: isWorkspaceDependencyMode ? 'Workspace source' : 'Published consumer'
} as const
