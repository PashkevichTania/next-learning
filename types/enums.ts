/* eslint-disable no-shadow */
enum UserRoles {
  Admin = "ADMIN",
  User = "USER",
}
enum Providers {
  Credential = "credentials",
  Facebook = "facebook",
}

enum SocketEvents {
  JoinRoom = "join_room",
  Disconnect = "disconnect",
  SendMessage = "send_message",
  ReceiveMessage = "receive_message",
}

export { UserRoles, Providers, SocketEvents }
