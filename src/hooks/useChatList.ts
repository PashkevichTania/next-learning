import { useQuery } from "@tanstack/react-query"
import { getChatListRequest } from "@/lib/serverRequests"
import { IChatResponse } from "@/types/socket"

const fetchPosts = async (userId?: string) => {
  const response = await getChatListRequest({ userId })
  const { payload }: { payload: IChatResponse[] } = await response.json()
  return payload || []
}

export const useChatList = (userId?: string) =>
  useQuery({
    queryKey: userId ? ["chats"] : ["chats", userId],
    queryFn: () => fetchPosts(userId),
  })
