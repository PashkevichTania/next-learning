import { io } from "socket.io-client"

import { toast } from "react-toastify"
import { IMessage } from "@/types/socket"

export default class Socket {
  public static ENDPOINT = process.env.NEXT_PUBLIC_SERVER_URL as string

  public static socket = io(this.ENDPOINT, { transports: ["websocket", "polling"] })

  public static notify = (text: string) =>
    toast.error(text, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })

  public static leaveRoom() {
    this.socket.emit("leavingRoom", {}, (error: any) => {
      if (error) {
        console.log(error)
        this.notify(JSON.stringify(error))
      }
    })
  }

  public static createRoom(roomName: string, user: any) {
    this.socket.emit("createRoom", { roomName, user }, (error: any) => {
      if (error) {
        console.log(error)
        this.notify(JSON.stringify(error))
      }
    })
  }

  public static joinRoom(roomId?: string) {
    const newRoomId = crypto.randomUUID()
    this.socket.emit("joinRoom", { roomId: roomId || newRoomId }, (error: any) => {
      if (error) {
        console.log(error)
        this.notify(JSON.stringify(error))
      }
    })
  }

  public static sendMessage(message: IMessage) {
    this.socket.emit("sendMessage", { message }, (error: any) => {
      if (error) {
        console.log(error)
        this.notify(JSON.stringify(error))
      }
    })
  }
}
