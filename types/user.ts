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
