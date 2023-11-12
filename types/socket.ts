export interface IMessage {
  userId: string
  roomId: string | number
  msg: string
  time: Date | string
  uid: string
}

export interface IChatResponse {
  id: string
  userId: string
  roomId: string

  messages: IMessage[]
}
