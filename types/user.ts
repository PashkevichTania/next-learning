import { Role } from "@/types/index"

type BasicUser = {
  id: string
  name: string
  email: string
  role: Role
  image?: string
}

export type CredentialsUser = BasicUser & {
  hashedPassword: string
}

export type FacebookUser = BasicUser & {
  facebookUserId: string
  image: string
  accessToken: string
}

export type User = CredentialsUser | FacebookUser
