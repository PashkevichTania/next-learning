import { useQuery } from "@tanstack/react-query"
import { getUserRequest } from "@/lib/serverRequests"
import { User } from "@/types/user"

const fetchData = async (id: string) => {
  const response = await getUserRequest(id)
  const { payload }: { payload: Omit<User, "hashedPassword"> } = await response.json()
  return payload
}

export const useUserQuery = (userId: string) =>
  useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchData(userId),
  })
