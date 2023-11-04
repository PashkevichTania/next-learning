export type Provider = "credentials" | "facebook"
export type Role = "USER" | "ADMIN"

export type Post = {
  id: string
  username: string
  media_url: string
  media_type: string
  permalink: string
  caption: string
  timestamp: string
}

export type BasicUser = {
  name: string
  email: string
  password: string
}

export type FacebookUser = {
  id: string
  name: string
  email: string
  image: string
  accessToken: string
}

export type User = BasicUser | FacebookUser
