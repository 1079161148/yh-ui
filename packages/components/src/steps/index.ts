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
export type YhStepsInstance = StepsInstance
export type YhStepInstance = StepInstance
export type YhStepsProps = import('./src/steps').StepsProps
export type YhStepsEmits = import('./src/steps').StepsEmits
export type YhStepsSlots = import('./src/steps').StepsSlots
export type YhStepsDirection = import('./src/steps').StepsDirection
export type YhStepsStatus = import('./src/steps').StepsStatus
export type YhStepsProgressDot = import('./src/steps').StepsProgressDot
export type YhStepsSize = import('./src/steps').StepsSize
export type YhStepsLabelPlacement = import('./src/steps').StepsLabelPlacement
export type YhStepConfig = import('./src/steps').StepConfig
export type YhStepProps = import('./src/step').StepProps
export type YhStepSlots = import('./src/step').StepSlots
