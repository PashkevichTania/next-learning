import { NextRequest } from "next/server"

// Get chats for user or all chats for admin
export async function GET(request: NextRequest) {
  return Response.json({ payload: [] })
}

// create new chat
export async function POST(request: NextRequest) {
  return Response.json({ payload: [] })
}

// add messages to chat
export async function PUT(request: NextRequest) {
  return Response.json({ payload: [] })
}

// delete chat
export async function DELETE(request: NextRequest) {
  return Response.json({ payload: [] })
}
