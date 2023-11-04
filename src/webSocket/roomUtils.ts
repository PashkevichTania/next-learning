const roomsMap = new Map()

export const createRoom = (roomName, admin) => {
  const id = crypto.randomUUID()
  const usersInRoom = new Map()
  const messages = []
  roomsMap.set(id, { id, usersInRoom, admin, messages })
  return { id }
}

export const getRoom = (id) => {
  if (roomsMap.has(id)) {
    return roomsMap.get(id)
  }
  return { error: "Room not found" }
}

export const getAllRooms = () => roomsMap

export const deleteRoom = (id) => {
  if (roomsMap.has(id)) {
    return roomsMap.delete(id)
  }
  return { error: "Room not found" }
}

export const addUserToRoom = (roomId, userId, user) => {
  if (roomsMap.has(roomId)) {
    return roomsMap.get(roomId).usersInRoom.set(userId, user)
  }
  return { error: "Room not found" }
}

export const addMessage = (roomId, message) => {
  if (roomsMap.has(roomId)) {
    return roomsMap.get(roomId).messages.push(message)
  }
  return { error: "Room not found" }
}

export const deleteUserFromRoom = (roomId, userId) => {
  if (roomsMap.has(roomId)) {
    return roomsMap.get(roomId).usersInRoom.delete(userId)
  }
  return { error: "Room not found" }
}
