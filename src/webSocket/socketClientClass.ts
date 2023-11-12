import type { Socket } from "socket.io-client"
import { io } from "socket.io-client"
import type { DefaultEventsMap } from "@socket.io/component-emitter"

export default class SocketSingleton {
  private static instance: Socket<DefaultEventsMap, DefaultEventsMap>

  static getInstance() {
    console.log("Get instance", this.instance)
    if (!this.instance) {
      console.log("Connect to websocket server")
      // To create socket server
      fetch("/api/socket/io")
      this.instance = io(process.env.NEXT_PUBLIC_BASE_URL!, {
        path: "/api/socket/io",
        addTrailingSlash: false,
        // autoConnect: true,
        transports: ["websocket", "polling"],
      })

      this.instance.on("connect_error", (e) => {
        console.log(e)
      })
    }

    return this.instance
  }
}
