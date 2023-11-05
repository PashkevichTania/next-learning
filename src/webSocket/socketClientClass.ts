import { io } from "socket.io-client"

export default class Socket {
  // eslint-disable-next-line no-use-before-define
  private static instance: Socket

  private ENDPOINT = process.env.NEXT_PUBLIC_SERVER_URL as string

  private socket = io(this.ENDPOINT, { transports: ["websocket", "polling"] })

  static getInstance() {
    if (!this.instance) {
      this.instance = new Socket()
    }

    return this.instance.socket
  }
}
