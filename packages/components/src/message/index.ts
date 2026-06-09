import type { App } from 'vue'
import { withInstallFunction } from '@yh-ui/utils'
import Message, { setMessageDefaultAppContext } from './src/method'

export const YhMessage = withInstallFunction(Message, '$message')

YhMessage.install = (app: App) => {
  setMessageDefaultAppContext(app._context)
  app.config.globalProperties.$message = YhMessage
}

export default YhMessage

export * from './src/message'
export * from './src/use-message'

export type YhMessageProps = import('./src/message').MessageProps
export type YhMessageEmits = import('./src/message').MessageEmits
export type YhMessageSlots = import('./src/message').MessageSlots
export type YhMessageExpose = import('./src/message').MessageExpose
export type YhMessageInstance = import('./src/message').MessageInstance
export type YhMessageOptions = import('./src/message').MessageOptions
export type YhMessageHandler = import('./src/message').MessageHandler
export type YhMessageContext = import('./src/message').MessageContext
export type YhMessageFn = import('./src/message').MessageFn
export type YhMessageType = import('./src/message').MessageType
export type YhMessagePlacement = import('./src/message').MessagePlacement
