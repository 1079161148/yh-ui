/**
 * Steps Component
 * @description 步骤条组件导出
 */

import { withInstall, withNoopInstall } from '@yh-ui/utils'
import Steps from './src/steps.vue'
import Step from './src/step.vue'

export const YhSteps = withInstall(Steps, { Step })
export const YhStep = withNoopInstall(Step)

export default YhSteps

export * from './src/steps'
export * from './src/step'

export type StepsInstance = InstanceType<typeof Steps>
export type StepInstance = InstanceType<typeof Step>
