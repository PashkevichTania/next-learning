export type Provider = "credentials" | "facebook"
export type Role = "USER" | "ADMIN"
export type Theme = "dark" | "light" | "retro"

export type Post = {
  id: string
  username: string
  media_url: string
  media_type: string
  permalink: string
  caption: string
  timestamp: string
}
