import { message as Message } from 'ant-design-vue'

Message.config({
  maxCount: 1
})

export function useMessage() {
  return {
    createMessage: Message
  }
}
