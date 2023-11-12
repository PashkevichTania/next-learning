import { Server } from "socket.io"
import type { Server as HTTPServer } from "http"
import type { NextApiRequest, NextApiResponse } from "next"
import type { Socket as NetSocket } from "net"
import type { Server as IOServer } from "socket.io"
import { SocketEvents } from "@/types/enums"

interface SocketServer extends HTTPServer {
  io?: IOServer | undefined
}

interface SocketWithIO extends NetSocket {
  server: SocketServer
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO
}

export const config = {
  api: {
    bodyParser: false,
  },
}

function ioHandler(req: NextApiRequest, res: NextApiResponseWithSocket) {
  if (!res.socket.server.io) {
    console.log("Create Socket server")
    const path = "/api/socket/io"
    const httpServer = res.socket.server
    const io = new Server(httpServer, {
      path,
      addTrailingSlash: false,
    })
    res.socket.server.io = io

    // Event handler for client connections
    io.on("connection", (socket) => {
      const clientId = socket.id

      console.log("A user connected:", clientId)

      socket.on(SocketEvents.JoinRoom, (roomId) => {
        socket.join(roomId)
        console.log(`User with id-${clientId} joined room - ${roomId}`)
      })

      socket.on(SocketEvents.SendMessage, (data) => {
        console.log("Message send, data: ", data)
        // This will send a message to a specific room ID
        // to sends to all in room except sender
        // in sends to all in room including sender
        socket.to(data.roomId).emit(SocketEvents.ReceiveMessage, data)
      })

      socket.on(SocketEvents.Disconnect, () => {
        console.log("A user disconnected:", clientId)
      })
    })
  }

  res.end()
}

export default ioHandler
