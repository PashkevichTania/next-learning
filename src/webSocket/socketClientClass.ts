import type { Socket } from "socket.io-client"
import { io } from "socket.io-client"
import type { DefaultEventsMap } from "@socket.io/component-emitter"

export default class SocketSingleton {
  private static instance: Socket<DefaultEventsMap, DefaultEventsMap>

  private static ENDPOINT = process.env.NEXT_PUBLIC_SERVER_URL as string

  static getInstance() {
    if (!this.instance) {
      console.log("Connect to websocket server")
      this.instance = io(
          this.ENDPOINT,
          {
            // autoConnect: true,
            transports: ["websocket", "polling"]
          })
    }

    return this.instance
  }
}
