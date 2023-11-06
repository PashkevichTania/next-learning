import { Provider } from "@/types"
import { User } from "@/types/user"

export const refetchToken = async (oldToken: string) => {
  const url = `https://graph.facebook.com/v18.0/oauth/access_token
    ?grant_type=fb_exchange_token
    &client_id=${process.env.FACEBOOK_APP_ID}
    &client_secret=${process.env.FACEBOOK_APP_SECRET}
    &set_token_expires_in_60_days=true
    &fb_exchange_token=${oldToken}`.replace(/\s/g, "")
  const response = await fetch(url)
  const data = await response.json()

  console.log("refresh", data)

  return data
}

export const signInRequest = async (credentials: Record<"email" | "password", string>) =>
  fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/signIn`, {
    method: "POST",
    body: JSON.stringify(credentials),
  })

export const signUpRequest = ({ user, provider }: { user: User; provider: Provider }) =>
  fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/auth/signUp`, {
    method: "POST",
    body: JSON.stringify({ user, provider }),
  })

export const createChatRequest = ({ roomId, userId }: { roomId: string; userId: string }) =>
  fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/chat`, {
    method: "POST",
    body: JSON.stringify({ roomId, userId }),
  })
