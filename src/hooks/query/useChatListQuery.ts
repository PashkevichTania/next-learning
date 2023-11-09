import { useQuery } from "@tanstack/react-query"
import { getChatListRequest } from "@/lib/serverRequests"
import { IChatResponse } from "@/types/socket"

const fetchData = async (userId?: string) => {
  const response = await getChatListRequest({ userId })
  const { payload }: { payload: IChatResponse[] } = await response.json()
  return payload || []
}

export const useChatListQuery = (userId?: string) =>
  useQuery({
    queryKey: userId ? ["chats"] : ["chats", userId],
    queryFn: () => fetchData(userId),
  })
