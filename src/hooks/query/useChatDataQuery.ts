import { useQuery } from "@tanstack/react-query"
import { getChatRequest } from "@/lib/serverRequests"
import { IChatResponse } from "@/types/socket"

const fetchData = async (roomId: string) => {
  const response = await getChatRequest(roomId)
  const { payload }: { payload: IChatResponse } = await response.json()
  return payload
}

export const useChatDataQuery = (roomId: string) =>
  useQuery({
    queryKey: ["chats", roomId],
    queryFn: () => fetchData(roomId),
  })
