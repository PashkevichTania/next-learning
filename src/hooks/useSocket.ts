import { useEffect, useRef } from "react"
import { Socket } from "socket.io-client"
import type { DefaultEventsMap } from "@socket.io/component-emitter"
import SocketSingleton from "@/src/webSocket/socketClientClass"

const useSocket = () => {
  const socketRef = useRef<Socket<DefaultEventsMap, DefaultEventsMap>>(
    SocketSingleton.getInstance()
  )

  useEffect(() => {
    console.log("Socket connection")
    // socketRef.current.connect()
    return () => {
      if (socketRef.current) socketRef.current.disconnect()
    }
  }, [])

  return { socket: socketRef.current }
}

export default useSocket
